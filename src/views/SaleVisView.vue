<template>

  <div class="pageContent">

    <div class="pageSection">
      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Cliente
      </TextC>
      <div class="pageSectionRow">
        <div class="tableClientWrapper">
          <TablePink
            ref="tableClient"
            class="tableClient"
            :tableData="this.tableClientData"
          />
        </div>
      </div>
    </div>

    <div class="pageSection">
      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Venda
      </TextC>
      <div class="pageSectionRow">
        <div class="tableSaleWrapper">
          <TablePink
            ref="tableSale"
            class="tableSale"
            :tableData="this.tableSaleData"
          />
        </div>
      </div>
    </div>

    <div class="pageSection">
      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Produtos
      </TextC>
      <div class="pageSectionRow">
        <div class="tableProductsWrapper">
          <TablePink
            ref="tableProducts"
            class="tableProducts"
            :tableData="this.tableProductsData"
          />
        </div>
      </div>
    </div>

    <div class="buttonsWrapper">
      <div class="buttonGeneratePDFWrapper">
        <ButtonC colorClass="pink3"
          id="generatePdfButton"
          class="btnP"
          label="Gerar PDF"
          width="100%"
          padding="3px 0px"
          @click="this.generatePDF()"
        />
      </div>

      <div class="buttonReutilizeWrapper">
        <ButtonC colorClass="pink3"
          id="btnReutilize"
          class="btnP"
          label="Reaproveitar"
          width="100%"
          padding="3px 0px"
          @click="this.reutilizeSale()"
        />
      </div>
    </div>

  </div>
</template>

<script>

import ButtonC from '../components/ButtonC.vue'
import Requests from '../js/requests.js'
import TablePink from '../components/TablePink.vue'
import TextC from '../components/TextC.vue'
import Utils from '../js/utils.js'

export default {
  
  name: 'SaleVisView',

  components: {
    ButtonC,
    TablePink,
    TextC
  },

  data() {
    return {
      tableClientData:{
        'titles': [ 'Nome', 'CPF' ],
        'colTypes': [ 'string', 'string' ],
        'colWidths': [ '60%', '40%' ],
        'content': []
      },
      tableSaleData: {
        'titles': [ 'Código', 'Data e hora', 'Percentual de desconto', 'Valor de desconto', 'Valor total', 'Valor total com desconto', 'Formas de pagamento e Parcelas' ],
        'colTypes': [ 'string', 'string', 'string', 'string', 'string', 'string', 'string-list' ],
        'colWidths': [ '12%', '12%', '12%', '10%', '13%', '13%', '28%' ],
        'content': []
      },
      tableProductsData: {
        'titles': [ 'Código', 'Nome', 'Tamanho', 'Cor', 'Outro', 'Valor', 'Quantidade' ],
        'colTypes': [ 'string', 'string', 'string', 'string', 'string', 'string', 'string' ],
        'colWidths': [ '10%', '30%', '10%', '10%', '15%', '15%', '10%'],
        'content': []
      }
    }
  },

  async created() {
    this.$root.setPageLoggedName('Visualizar Venda');
    if(!this.$root.pageParams || !this.$root.pageParams['sale_id']){
      this.$root.renderView('home');
      return;
    }
    this.loadSale(this.$root.pageParams['sale_id']);
  },

  methods:{

    // load sale
    async loadSale(saleId){

      let vreturn = await this.$root.doRequest(
        Requests.getSale,
        [ saleId ]
      );

      if(vreturn && vreturn['ok'] && vreturn['response'] && vreturn['response']['sale_client'] && vreturn['response']['sale_products']){
        this.loadClientData(vreturn['response']['sale_client']);
        this.loadSaleData(vreturn['response']);
        this.loadProductsData(vreturn['response']['sale_products']);
      }
      else{
        this.$root.renderRequestErrorMsg(vreturn, []);
        this.$root.renderView('home');
      }
    },
    loadClientData(clientData){
      this.tableClientData['content'] = [[clientData['client_name'], clientData['client_cpf']]];
    },
    loadSaleData(saleData){
      let saleRawValue = saleData['sale_total_value']/(1-saleData['sale_total_discount_percentage']);

      let payment_method_names = saleData['payment_method_names'].split(',');
      let payment_method_numbers = saleData['payment_method_installment_numbers'].split(',');
      let payment_method_values = saleData['payment_method_values'].split(',');
      let payment_methods = payment_method_names.map((payment_method_name, index) => (
        `${payment_method_name} (${payment_method_numbers[index]} x ${Utils.getCurrencyFormat(Number(payment_method_values[index])/Number(payment_method_numbers[index]))})`
      ));

      this.tableSaleData['content'] = [[
        `VEND-${saleData['sale_id']}`,
        Utils.getDateTimeString(saleData['sale_creation_date_time'], '/', ':', false),
        `${Math.trunc(Number(saleData['sale_total_discount_percentage'])*100)}%`,
        Utils.getCurrencyFormat(saleRawValue-saleData['sale_total_value']),
        Utils.getCurrencyFormat(saleRawValue),
        Utils.getCurrencyFormat(saleData['sale_total_value']),
        payment_methods,
      ]];
    },
    loadProductsData(productsData){
      productsData.forEach(p => {
        this.tableProductsData['content'].push([
          p['product_id'],
          p['product_name'],
          p['product_size_name'],
          p['product_color_name'] ? p['product_color_name'] : '---',
          p['product_other_name'] ? p['product_other_name'] : '---',
          Utils.getCurrencyFormat(p['sale_has_product_price']),
          p['sale_has_product_quantity']
        ]);
      });
    },
    generatePDF(){
      this.$root.renderMsg('warn', 'Recurso em desenvolvimento!', '');
      //console.log('generate pdf');
    },
    reutilizeSale(){
      this.$root.renderMsg('warn', 'Recurso em desenvolvimento!', '');
      //console.log('reutilize sale');
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
.pageSection{
  width: 100%;
  padding: 10px;
}
@media (min-width: 1201px) {
  .pageSectionRow{
    margin: 10px 20px;
  }
  .tableClientWrapper, .tableSaleWrapper, .tableProductsWrapper{
    width: 98%;
  }
  .tableProducts, .tableSale, .tableClient{
    display: inline-block;
  }
  .buttonsWrapper{
    text-align: left;
    width: 100%;
  }
  .buttonGeneratePDFWrapper, .buttonReutilizeWrapper{
    width: 20%;
    display: inline-block;
    margin-left: 20px;
  }
}
@media (max-width: 1200px) {
  .pageSectionRow{
    margin: 5px 10px;
  }
  .tableClientWrapper, .tableSaleWrapper, .tableProductsWrapper{
    width: 100%;
    text-align: center;
  }
  .buttonsWrapper{
    text-align: center;
    width: 100%;
  }
  .buttonGeneratePDFWrapper, .buttonReutilizeWrapper{
    width: 80%;
    display: inline-block;
    margin: 10px;
    text-align: center;
  }
  .btnP{
    display: inline-block;
  }
}

</style>