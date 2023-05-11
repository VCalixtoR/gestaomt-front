<template>

  <div class="pageContent">

    <div class="pageSection">

      <div class="tableClientSectionCol">
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

      <div class="tableConditionalSectionCol">
        <TextC colorClass="black1" fontSize='var(--text-title)'>
          Condicional
        </TextC>
        <div class="pageSectionRow">
          <div class="tableConditionalWrapper">
            <TablePink
              ref="tableConditional"
              class="tableConditional"
              :tableData="this.tableConditionalData"
              @optClicked="(itemValue, indexCR, indexC) => this.changeConditionalStatus(itemValue)" 
            />
          </div>
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
          @click="this.reutilizeConditional()"
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
  
  name: 'ConditionalVisView',

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
      tableConditionalData: {
        'titles': [ 'Código', 'Data e hora de geração', 'Status' ],
        'colTypes': [ 'string', 'string', 'select' ],
        'colWidths': [ '30%', '40%', '30%' ],
        'content': []
      },
      tableProductsData: {
        'titles': [ 'Código', 'Nome', 'Tamanho', 'Cor', 'Outro', 'Quantidade' ],
        'colTypes': [ 'string', 'string', 'string', 'string', 'string', 'string' ],
        'colWidths': [ '14%', '30%', '14%', '14%', '14%', '14%'],
        'content': []
      },
      conditionalStatus: []
    }
  },

  async created() {
    this.$root.setPageLoggedName('Visualizar Condicional');
    if(!this.$root.pageParams || !this.$root.pageParams['conditional_id']){
      this.$root.renderView('home');
      return;
    }
    this.loadConditional(this.$root.pageParams['conditional_id']);
  },

  methods:{

    // load conditional
    async loadConditional(conditionalId){

      let vreturn = await this.$root.doRequest(
        Requests.getConditional,
        [ conditionalId ]
      );

      if(vreturn && vreturn['ok'] && vreturn['response'] && vreturn['response']['conditional_client'] && vreturn['response']['conditional_products']){
        this.loadClientData(vreturn['response']['conditional_client']);
        this.loadConditionalData(vreturn['response']);
        this.loadProductsData(vreturn['response']['conditional_products']);
      }
      else{
        this.$root.renderRequestErrorMsg(vreturn, []);
        this.$root.renderView('home');
      }
    },
    loadClientData(clientData){
      this.tableClientData['content'] = [[clientData['client_name'], clientData['client_cpf']]];
    },
    loadConditionalData(conditionalData){
      this.conditionalStatus = conditionalData['conditional_status'];
      this.tableConditionalData['content'] = [[
        `COND-${conditionalData['conditional_id']}`,
        Utils.getDateTimeString(conditionalData['conditional_creation_date_time'], '/', ':', false),
        {
          'disabled': conditionalData['conditional_status'] == 'Cancelado' || conditionalData['conditional_status'] == 'Devolvido',
          'customFontColor': (conditionalData['conditional_status'] == 'Cancelado' ? 'fontred' : conditionalData['conditional_status'] == 'Devolvido' ? 'fontpink3' : null),
          'initialOptValue': conditionalData['conditional_status'],
          'items': [
            { label: 'Pendente', value: 'Pendente' },
            { label: 'Devolvido', value: 'Devolvido' },
            { label: 'Cancelado', value: 'Cancelado', color: 'red' }
          ]
        }
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
          p['conditional_has_product_quantity']
        ]);
      });
    },
    async changeConditionalStatus(statusValue){
      
      if(statusValue == this.conditionalStatus){
        return;
      }

      let conditionalId = this.$root.pageParams['conditional_id'];
      let vreturn = await this.$root.doRequest(Requests.updateConditionalStatus, [conditionalId, statusValue]);

      if(!vreturn || !vreturn['ok']){
        this.$root.renderRequestErrorMsg(vreturn, ['Status inválido', 'A condicional está cancelada e não pode ser alterada']);
      }
      else{
        await this.loadConditional(conditionalId);
        this.$root.renderMsg('ok', 'Status alterado!', '');
      }
    },
    generatePDF(){
      this.$root.renderMsg('warn', 'Recurso em desenvolvimento!', '');
      //console.log('generate pdf');
    },
    reutilizeConditional(){
      this.$root.renderMsg('warn', 'Recurso em desenvolvimento!', '');
      //console.log('reutilize conditional');
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
  .tableClientSectionCol, .tableConditionalSectionCol{
    display: inline-block;
  }
  .tableClientSectionCol{
    width: 40%;
  }
  .tableConditionalSectionCol{
    width: 50%;
  }
  .tableClientWrapper, .tableConditionalWrapper, .tableProductsWrapper{
    width: 98%;
  }
  .tableProducts, .tableConditional, .tableClient{
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
  .tableClientWrapper, .tableConditionalWrapper, .tableProductsWrapper{
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