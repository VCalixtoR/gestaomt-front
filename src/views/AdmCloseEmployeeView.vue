<template>

  <div class="pageWrapper">

    <div class="pageContent">

      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Fechamento de Vendas - {{ this.selectedEmployee['name']  }}
      </TextC>

      <div class="pageFilter">

        <div class="pageLeftF">

          <TextC colorClass="black2" display="block">
            Período de fechamento:
          </TextC>
          
          <div class="pageLeftFContent">
            <LabelC for="closePeriodStartDatetimeInput" 
              labelText="De"
              class="closePLabel"
            />
            <InputC id="closePeriodStartDatetimeInput" 
              ref="closePeriodStartDatetimeInput"
              class="closePeriodStartDatetimeInput"
              name="closePSDT"
              type="date"
            />

            <LabelC for="closePeriodEndDatetimeInput" 
              labelText="até" 
              class="closePLabel"
            />
            <InputC id="closePeriodEndDatetimeInput" 
              ref="closePeriodEndDatetimeInput"
              class="closePeriodEndDatetimeInput"
              name="closePEDT"
              type="date"
            />
          </div>
        
        </div>

        <div class='pageRightF'>
          <ButtonC colorClass="pink3"
            :id="'btnApplyFilter'"
            label="Filtrar"
            width="100%"
            padding="3px 0px"
            @click="this.filter()"
          />
        </div>
        

      </div>

      <div class="summaryTotalsWrapper">
        <div class="summaryWrapper">
          <TextC colorClass="black1" fontSize='var(--text-title)' margin='0px 0px 10px 10px'>
            Resumo
          </TextC>
          <TablePink
            class="tableSummary"
            :tableData="this.tableSummary"
          />
        </div>

        <div class="totalsWrapper">
          <TextC colorClass="black1" fontSize='var(--text-title)' margin='0px 0px 10px 10px'>
            Totais
          </TextC>
          <TablePink
            class="tableTotals"
            :tableData="this.tableTotals"
          />
        </div>
      </div>
      
      <div class="salesWrapper" v-if="this.tableSales['content'].length > 0">
        <TextC colorClass="black1" fontSize='var(--text-title)' margin='0px 0px 10px 10px'>
          Vendas
        </TextC>
        <TablePink
          class="tableSales"
          :tableData="this.tableSales"
          :showPrevNextButtons="true"
          :actualPage="this.actualSalesPage"
          :maxPages="this.maxSalesPage"
          @previousClick="this.previousEventPage()"
          @nextClick="this.nextEventPage()"
        />

      </div>

    </div>

  </div>

</template>

<script>

import ButtonC from '../components/ButtonC.vue'
import LabelC from '../components/LabelC.vue'
import InputC from '../components/InputC.vue'
import Requests from '../js/requests.js'
import TablePink from '../components/TablePink.vue'
import TextC from '../components/TextC.vue'
import Utils from '../js/utils'

export default {
  
  name: 'AdmCloseEmployeeView',

  props: {
  },

  components: {
    ButtonC,
    LabelC,
    InputC,
    TablePink,
    TextC
  },

  data() {
    return {
      selectedEmployee: [],
      tableSummary: {
        'titles': [ 'Forma de pagamento', 'Participação em vendas', 'Valor total', 'Comissão total' ],
        'colTypes': [ 'string', 'string', 'string', 'string' ],
        'colWidths': [ '30%', '18%', '26%', '26%' ],
        'content': []
      },
      tableTotals: {
        'titles': [ 'Nº vendas', 'Valor total vendas', 'Valor total comissão' ],
        'colTypes': [ 'string', 'string', 'string' ],
        'colWidths': [ '26%', '37%', '37%'],
        'content': []
      },
      tableSales: {
        'titles': [ 'Código', 'Nome do Cliente', 'Formas de pagamento', 'Data e Hora  de Geração', 'Valor Final', 'Comissão' ],
        'colTypes': [ 'string', 'string', 'string-list', 'string', 'string', 'string' ],
        'colWidths': [ '12%', '29%', '23%', '14%', '11%', '11%'],
        'content': []
      },
      defLimit: 10,
      actualSalesPage: 1,
      maxSalesPage: 1,

      startDate: null,
      endDate: null
    }
  },

  async created() {
    this.$root.setPageLoggedName('Fechamento de Vendas');
    
    if(!this.$root.pageParams || !this.$root.pageParams['employee']){
      this.$root.renderView('home');
      return;
    }

    this.selectedEmployee = this.$root.pageParams['employee'];
    await this.loadTablesSummaryTotals(this.selectedEmployee['id'], null, null);
    await this.loadTableSales(this.selectedEmployee['id'], this.defLimit, 0, null, null);
  },

  methods:{

    async loadTablesSummaryTotals(employeeId, startDate = null, endDate = null){

      this.tableSummary['content'] = [];
      this.tableTotals['content'] = [];

      let vreturnSummary = await this.$root.doRequest(
        Requests.getEmployeeSalesSummary,
        [ employeeId, startDate, endDate ]
      );

      if(vreturnSummary && vreturnSummary['ok'] && vreturnSummary['response'] && vreturnSummary['response']['payments']){

        vreturnSummary['response']['payments'].forEach(payment => {

          // fills table summary
          this.tableSummary['content'].push([
            payment['payment_method_name'],
            payment['payment_methods_count'],
            Utils.getCurrencyFormat(payment['payment_methods_value']),
            Utils.getCurrencyFormat(payment['payment_methods_comission_value'])
          ]);
        });

        // fills table total
        this.tableTotals['content'].push([
          vreturnSummary['response']['sales']['sales_count'],
          Utils.getCurrencyFormat(vreturnSummary['response']['sales']['sales_value']),
          Utils.getCurrencyFormat(vreturnSummary['response']['sales']['sales_comission']),
        ]);
      }
      else{
        this.$root.renderRequestErrorMsg(vreturnSummary, []);
      }
    },

    async loadTableSales(employeeId, limit, offset, startDate = null, endDate = null){

      this.tableSales['content'] = [];

      let vreturnSales = await this.$root.doRequest(
        Requests.getEmployeeSales,
        [ employeeId, limit, offset, startDate, endDate ]
      );

      if(vreturnSales && vreturnSales['ok'] && vreturnSales['response'] && vreturnSales['response']['sales']){

        vreturnSales['response']['sales'].forEach(sale => {

          let saleCreationDate = sale['sale_creation_date_time'] != null ? 
            Utils.getDateTimeString(new Date(Date.parse(sale['sale_creation_date_time']))) :
            '';

          let payment_method_names = sale['payment_method_names'].split(',');
          let payment_method_numbers = sale['payment_method_installment_numbers'].split(',');
          let payment_method_values = sale['payment_method_values'].split(',');
          let payment_methods = payment_method_names.map((payment_method_name, index) => (
            `${payment_method_name} (${payment_method_numbers[index]} x ${Utils.getCurrencyFormat(Number(payment_method_values[index])/Number(payment_method_numbers[index]))})`
          ));

          this.tableSales['content'].push([
            'VEND-' + sale['sale_id'],
            sale['client_name'],
            payment_methods,
            saleCreationDate,
            Utils.getCurrencyFormat(sale['sale_total_value']),
            Utils.getCurrencyFormat(sale['sale_employee_comission'])
          ]);
        });

        this.actualSalesPage = Math.ceil((offset+1)/this.defLimit);
        this.maxSalesPage = Math.max(Math.ceil(vreturnSales['response']['count_sales']/this.defLimit), 1);
      }
      else{
        this.$root.renderRequestErrorMsg(vreturnSales, []);
      }
    },
    async filter(){
      
      // html elements values
      let startdateV = this.$refs.closePeriodStartDatetimeInput.getV();
      let enddateV = this.$refs.closePeriodEndDatetimeInput.getV();

      // saves filter request params
      this.startDate = null;
      this.endDate = null;

      if(startdateV && enddateV){
        if(startdateV > enddateV){
          this.$root.renderMsg('warn', 'Datas inválidas!', 'Data inicial deve ser menor ou igual à final.');
          return;
        }
        this.startDate = startdateV;
        this.endDate = enddateV;
      }
      else{
        this.startDate = startdateV ? startdateV : null;
        this.endDate = enddateV ? enddateV : null;
      }

      await this.loadTablesSummaryTotals(this.selectedEmployee['id'], this.startDate, this.endDate);
      await this.loadTableSales(this.selectedEmployee['id'], this.defLimit, 0, this.startDate, this.endDate);
    },

    async previousEventPage(){
      await this.loadTableSales(this.selectedEmployee['id'], this.defLimit, (this.actualSalesPage-2)*10, this.startDate, this.endDate);
    },
    async nextEventPage(){
      await this.loadTableSales(this.selectedEmployee['id'], this.defLimit, this.actualSalesPage*10, this.startDate, this.endDate);
    }
  }
}
</script>

<!-- style applies only to this component -->
<style scoped>

.pageWrapper{
  width: 100%;
  height: 100%;
}
.pageContent{
  margin: 0px 5px;
}
.pageFilter{
  margin: 15px 10px;
}
.summaryTotalsWrapper, .salesWrapper{
  width: 100%;
  margin: 15px 10px;
}
.pageLeftF, .pageRightF{
  padding: 0px;
  margin: 0px;
}
.pageLeftFContent{
  margin: 10px;
}
.tableSummary, .tableTotals, .tableSales{
  margin-top: 10px;
}
.summaryTotalsWrapper{
  width: 100%;
}
@media (max-width: 1200px) {
  .pageLeftF, .pageRightF{
    display: block;
    width: 100%;
  }
  .closePLabel{
    display: block;
    margin: 3px 0px;
    text-align: left;
  }
  .closePeriodStartDatetimeInput, .closePeriodEndDatetimeInput{
    display: block;
    width: 100%;
  }
  .summaryWrapper, .totalsWrapper{
    display: block;
    margin: 15px 0px 0px 0px;
  }
}
@media (min-width: 1201px) {
  .pageLeftF, .pageRightF{
    display: inline-block;
  }
  .pageLeftF{
    width: 80%;
  }
  .pageRightF{
    width: 20%;
  }
  .closePLabel{
    display: inline;
    margin: 5px 10px;
  }
  .closePeriodStartDatetimeInput, .closePeriodEndDatetimeInput{
    display: inline;
    width: 150px;
  }
  .summaryWrapper, .totalsWrapper{
    display: inline-block;
  }
  .summaryWrapper{
    margin-right: 20px;
    width: calc(60% - 40px);
  }
  .totalsWrapper{
    width: 40%;
    vertical-align: top;
  }
}

</style>