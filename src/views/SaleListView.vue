<template>

  <div class="pageContent">

    <div class="filterSection">
      
      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Filtrar
      </TextC>

      <div class="filterRow">
        <div class="row1Left">
          <LabelC for="saleCodeInput"
            labelText="Código"
            class="plabel"
          />
          <InputC id="saleCodeInput"
            ref="saleCodeInput"
            class="pinput saleCodeInput"
            type="text"
            name="salecode"
            value="VENDA-"
            :mask="[ 'VENDA-####' ]"
          />
        </div>

        <div class="row1Right">
          <LabelC for="lastSaleDateStartInput"
            labelText="Data de geração: De"
            class="plabel"
          />
          <InputC id="lastSaleDateStartInput"
            ref="lastSaleDateStartInput"
            class="pinput lastSaleDateStartInput"
            type="datetime-local"
            name="lastBuyStart"
          />

          <LabelC for="lastSaleDateEndInput"
            labelText="até"
            class="plabel"
          />
          <InputC id="lastSaleDateEndInput"
            ref="lastSaleDateEndInput"
            class="pinput lastSaleDateEndInput"
            type="datetime-local"
            name="lastBuyEnd"
          />
        </div>
      </div>

      <div class="filterRow">
        <div class="row2Left">
          <LabelC for="cliNameSelect"
            labelText="Nome do cliente"
            class="plabel"
          />
          <SelectWithFilter
            id="cliNameSelect" 
            ref="cliNameSelect"
            class="pselect cliNameSelect"
            colorClass="pink3"
            name="cliname"
            :items="this.cliNameSelectItems"
          />
        </div>
        <div class="row2Right">
          <LabelC for="startTotalPriceInput"
            labelText="Valor final: De"
            class="plabel"
          />
          <InputC id="startTotalPriceInput"
            ref="startTotalPriceInput"
            class="pinput startTotalPriceInput"
            type="text"
            name="starttotalprice"
            :mask="[ 'R$ #,##', 'R$ ##,##', 'R$ ###,##', 'R$ ####,##', 'R$ #####,##' ]"
          />

          <LabelC for="endTotalPriceInput"
            labelText="até"
            class="plabel endTotalPriceInput"
          />
          <InputC id="endTotalPriceInput"
            ref="endTotalPriceInput"
            class="pinput endTotalPriceInput"
            type="text"
            name="endtotalprice"
            :mask="[ 'R$ #,##', 'R$ ##,##', 'R$ ###,##', 'R$ ####,##', 'R$ #####,##' ]"
          />
        </div>
      </div>
    </div>

    <div class='buttonsWrapper'>
      <div class='filterButton'>
        <ButtonC colorClass="pink3"
          :id="'btnApplyFilter'"
          label="Filtrar"
          width="100%"
          padding="3px 0px"
          @click="this.filter()"
        />
      </div>

      <div class='clearFilterButton'>
        <ButtonC colorClass="black1"
          :id="'btnCleanFilter'"
          label="Limpar Filtro"
          width="100%"
          padding="3px 0px"
          @click="this.cleanFilter()"
        />
      </div>
    </div>

    <div class="tableSaleRow">

      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Tabela de Vendas
      </TextC>
      
      <div class="tableSalesWrapper">
        <TablePink
          class="tableSales"
          :tableData="this.tableSalesData"
          :showPrevNextButtons="true"
          :actualPage="this.actualPage"
          :maxPages="this.maxPages"
          @previousClick="this.previousSalePage()"
          @nextClick="this.nextSalePage()"
          @visualize="(rowN, colN) => this.visualizeSale(rowN)"
          @pdf="(rowN, colN) => this.generatePDF(rowN)"
        />
      </div>

    </div>

  </div>

</template>

<script>

import ButtonC from '../components/ButtonC.vue'
import InputC from '../components/InputC.vue'
import LabelC from '../components/LabelC.vue'
import Requests from '../js/requests.js'
import SelectC from '../components/SelectC.vue'
import SelectWithFilter from '../components/SelectWithFilter.vue'
import TablePink from '../components/TablePink.vue'
import TextC from '../components/TextC.vue'
import Utils from '../js/utils'

export default {
  
  name: 'SaleListView',

  components: {
    ButtonC,
    InputC,
    LabelC,
    SelectC,
    SelectWithFilter,
    TablePink,
    TextC
  },

  data() {
    return {
      cliNameSelectItems: [],

      tableSalesData: {
        'titles': [ 'Código', 'Nome do cliente', 'Forma de pagamento', 'Data e hora de geração', 'Valor final', 'Visualizar', 'Gerar pdf' ],
        'colTypes': [ 'string', 'string', 'string', 'string', 'string', 'visualize', 'pdf' ],
        'colWidths': [ '10%', '24%', '20%', '20%', '10%', '8%', '8%' ],
        'content': []
      },

      actualPage: 1,
      maxPages: 1,
      defLimit: 10,

      saleId: null,
      clientName: null,
      creationDateTimeStart: null,
      creationDateTimeEnd: null,
      saleStatus: null,
      totalValueStart: null,
      totalValueEnd: null,

      salesIds: []
    }
  },

  async created() {
    this.$root.setPageLoggedName('Visualizar Vendas');

    // clients names
    let vreturn = await this.$root.doRequest(
      Requests.getClients,
      [ true, null, null, null, null, null, null, null, null ]
    );

    if(vreturn && vreturn['ok'] && vreturn['response']){
      let loadedClients = vreturn['response']['clients'];
      this.cliNameSelectItems = loadedClients.map(x => ({'label': x['client_name'], 'value': x['client_id'], 'cpf': x['client_cpf']}));
    }
    else{
      this.$root.renderRequestErrorMsg(vreturn, []);
      this.$root.renderView('home');
    }

    await this.loadSales(this.defLimit, 0);
  },

  methods:{

    async loadSales(limit, offset, saleId=null, clientName=null, creationDateTimeStart=null, creationDateTimeEnd=null, saleStatus=null, totalValueStart=null, totalValueEnd=null){

      this.clientIds = [];
      this.tableSalesData['content'] = [];
      
      let vreturn = await this.$root.doRequest(
        Requests.getSales,
        [ limit, offset, saleId, clientName, creationDateTimeStart, creationDateTimeEnd, saleStatus, totalValueStart, totalValueEnd ]
      );

      if(vreturn && vreturn['ok'] && vreturn['response'] && vreturn['response']['sales']){
        this.salesIds = [];

        vreturn['response']['sales'].forEach(sale => {
          this.salesIds.push(sale['sale_id']);
          this.tableSalesData['content'].push([
            `VENDA-${sale['sale_id']}`,
            sale['sale_client_name'],
            `${sale['payment_method_name']} (${sale['payment_method_Installment_number']} x ${Utils.getCurrencyFormat(Number(sale['sale_total_value'])/Number(sale['payment_method_Installment_number']))})`,
            Utils.getDateTimeString(sale['sale_creation_date_time'], '/', ':', false),
            Utils.getCurrencyFormat(sale['sale_total_value']),
            { 'showVisualize': true },
            { 'showPdf': true }]);
        });

        this.actualPage = Math.ceil((offset+1)/this.defLimit);
        this.maxPages = Math.max(Math.ceil(vreturn['response']['count']/this.defLimit), 1);

        this.saleId = saleId;
        this.clientName = clientName;
        this.creationDateTimeStart = creationDateTimeStart;
        this.creationDateTimeEnd = creationDateTimeEnd;
        this.saleStatus = saleStatus;
        this.totalValueStart = totalValueStart;
        this.totalValueEnd = totalValueEnd;
      }
      else{
        this.$root.renderRequestErrorMsg(vreturn, []);
      }
    },

    async filter(){
      
      let saleId = this.$refs.saleCodeInput.getV();
      let clientName = this.$refs.cliNameSelect.getL();
      let creationDateTimeStart = this.$refs.lastSaleDateStartInput.getV();
      let creationDateTimeEnd = this.$refs.lastSaleDateEndInput.getV();
      let totalValueStart = this.$refs.startTotalPriceInput.getV();
      let totalValueEnd = this.$refs.endTotalPriceInput.getV();

      saleId = saleId.replace('VENDA-', '');
      totalValueStart = Utils.getNumberFormatFromCurrency(totalValueStart);
      totalValueEnd = Utils.getNumberFormatFromCurrency(totalValueEnd);

      await this.loadSales(this.defLimit, 0, saleId, clientName, creationDateTimeStart, creationDateTimeEnd, null, totalValueStart, totalValueEnd);
    },

    async cleanFilter(){

      this.$refs.saleCodeInput.setV('VENDA-');
      this.$refs.cliNameSelect.setV('');
      this.$refs.lastSaleDateStartInput.setV('');
      this.$refs.lastSaleDateEndInput.setV('');
      this.$refs.startTotalPriceInput.setV('');
      this.$refs.endTotalPriceInput.setV('');

      await this.loadSales(this.defLimit, 0);
    },

    async previousSalePage(){

      await this.loadSales( 
        this.defLimit,
        (this.actualPage-2)*10,
        this.saleId,
        this.clientName,
        this.creationDateTimeStart,
        this.creationDateTimeEnd,
        this.saleStatus,
        this.totalValueStart,
        this.totalValueEnd)
    },

    async nextSalePage(){

      await this.loadSales( 
        this.defLimit, 
        this.actualPage*10,
        this.saleId,
        this.clientName,
        this.creationDateTimeStart,
        this.creationDateTimeEnd,
        this.saleStatus,
        this.totalValueStart,
        this.totalValueEnd)
    },

    visualizeSale(salePos){
      this.$root.renderView('vervenda', { 'sale_id' : this.salesIds[salePos] });
    },

    generatePDF(salePos){
      this.$root.renderMsg('warn', 'Recurso em desenvolvimento!', '');
      //console.log('generate pdf ' + this.salesIds[salePos]);
    }
  }
}
</script>

<!-- style applies only to this component -->
<style scoped>

.pageContent{
  width: 100%;
  height: 100%;
}
.filterRow{
  margin: 10px 20px;
}
.plabel{
  margin: 0px 5px;
}
.tableSaleRow{
  margin-top: 20px;
}
.tableSalesWrapper{
  margin-top: 20px;
}
.buttonsWrapper{
  text-align: left;
  margin-left: 20px;
}
@media (min-width: 1201px) {
  .row1Left, .row2Left, .row1Right, .row2Right{
    display: inline-block;
    margin: 0px;
  }
  .row1Left, .row2Left{
    text-align: left;
  }
  .row1Right, .row2Right{
    text-align: right;
  }
  .row1Left{
    width: 190px;
  }
  .row1Right{
    width: calc(100% - 190px);
  }
  .row2Left, .row2Right{
    width: 50%;
  }
  .saleCodeInput {
    width: 115px;
  }
  .lastSaleDateStartInput, .lastSaleDateEndInput{
    width: 205px;
  }
  .startTotalPriceInput, .endTotalPriceInput{
    width: 100px;
  }
  .filterButton, .clearFilterButton{
    display: inline-block;
    width: 20%;
    padding: 0px;
    margin-right: 20px;
  }
  .tableSalesWrapper{
    text-align: center;
  }
}
@media (max-width: 1200px) {
  .plabel{
    margin: 5px 0px;
    display: block;
  }
  .pinput, .pselect{
    display: block;
    width: 100%;
  }
  .filterButton, .clearFilterButton{
    display: block;
    margin: auto;
    width: 80%;
    margin-top: 10px;
  }
}

</style>