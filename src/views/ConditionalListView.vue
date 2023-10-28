<template>

  <div class="pageContent" v-if="this.mountedDone">

    <div class="filterSection">
      
      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Filtrar
      </TextC>
      <TextC colorClass="pink" fontSize='var(--text-warn)' fontWeight="bold" v-if="this.filtered">
        Atenção: Filtros aplicados
      </TextC>

      <div class="filterRow">
        <div class="row1Left">
          <LabelC for="conditionalIdInput"
            labelText="Código"
            class="plabel"
          />
          <InputC id="conditionalIdInput"
            ref="conditionalIdInput"
            class="pinput conditionalIdInput"
            type="text"
            name="conditionalcode"
            value="COND-"
            :mask="[ 'COND-####' ]"
            :initialValue="this.initialConditionalId"
          />
        </div>

        <div class="row1Right">
          <LabelC for="creationDateTimeStartInput"
            labelText="Data de geração: De"
            class="plabel"
          />
          <InputC id="creationDateTimeStartInput"
            ref="creationDateTimeStartInput"
            class="pinput creationDateTimeStartInput"
            type="datetime-local"
            name="creationStart"
            :initialValue="this.initialCreationStart"
          />

          <LabelC for="creationDateTimeEndInput"
            labelText="até"
            class="plabel"
          />
          <InputC id="creationDateTimeEndInput"
            ref="creationDateTimeEndInput"
            class="pinput creationDateTimeEndInput"
            type="datetime-local"
            name="creationEnd"
            :initialValue="this.initialCreationEnd"
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
            :initialOptLabel="this.initialCliName"
          />
        </div>
        <div class="row2Right">
          <LabelC for="statusSelect"
            labelText="Status"
            class="plabel"
          />
          <SelectWithFilter
            id="statusSelect" 
            ref="statusSelect"
            class="pselect statusSelect"
            colorClass="pink3"
            name="status"
            :items="this.statusItems"
            :initialOptLabel="this.initialConditionalStatus"
          />
        </div>
      </div>

      <div class="filterRow">
        <div class="row3Left">
          <LabelC for="orderBySelect"
            labelText="Ordenar por:"
            class="plabel"
          />
          <SelectC id="orderBySelect"
            ref="orderBySelect"
            class="orderBySelect"
            name="orderBy"
            colorClass="pink3"
            :items="this.orderBySelectI"
            :initialOptValue="this.initialOrderBy"
          />
          <SelectC id="orderByAscSelect"
            ref="orderByAscSelect"
            class="orderByAscSelect"
            name="orderByAsc"
            colorClass="pink3"
            :items="this.orderByAscSelectI"
            :initialOptValue="this.initialOrderByAsc"
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
      
      <!--
      <div class='filterButton'>
        <ButtonC colorClass="pink3"
          :id="'btnGeneratePDF'"
          label="Gerar PDF com Filtros"
          width="100%"
          padding="3px 0px"
          @click="this.filter(true)"
        />
      </div>
      -->

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

    <div class="tableConditionalRow">

      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Tabela de Condicionais
      </TextC>
      
      <div class="tableConditionalsWrapper">
        <TablePink
          class="tableConditionals"
          ref="tableConditionals"
          :tableData="this.tableConditionalsData"
          :showPrevNextButtons="true"
          :actualPage="this.actualPage"
          :maxPages="this.maxPages"
          @previousClick="this.previousConditionalPage()"
          @nextClick="this.nextConditionalPage()"
          @optClicked="(itemValue, indexCR, indexC) => this.changeConditionalStatus(itemValue, indexCR)"
          @visualize="(rowN, colN) => this.visualizeConditional(rowN)"
          @pdf="(rowN, colN) => this.generatePDF(rowN)"
        />
      </div>

    </div>

    <div class="tableSummaryRow">

      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Resumo de Condicionais
      </TextC>

      <div class="tableSummaryWrapper">
        <TablePink
          class="tableSummary"
          :tableData="this.tableSummaryData"
        />
      </div>

    </div>

  </div>

</template>

<script>

import ButtonC from '../components/ButtonC.vue'
import ClientStorage from '../js/clientStorage.js'
import InputC from '../components/InputC.vue'
import LabelC from '../components/LabelC.vue'
import Requests from '../js/requests.js'
import SelectC from '../components/SelectC.vue'
import SelectWithFilter from '../components/SelectWithFilter.vue'
import TablePink from '../components/TablePink.vue'
import TextC from '../components/TextC.vue'
import Utils from '../js/utils'

export default {
  
  name: 'ConditionalListView',

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
      statusItems:[
        { label: 'Pendente', value: 'Pendente' },
        { label: 'Devolvido', value: 'Devolvido' },
        { label: 'Cancelado', value: 'Cancelado' }
      ],
      tableConditionalsData: {
        'titles': [ 'Código', 'Nome do cliente', 'Data e hora de geração', 'Mudar Status', 'Visualizar', 'Gerar pdf' ],
        'colTypes': [ 'string', 'string', 'string', 'select', 'visualize', 'pdf' ],
        'colWidths': [ '10%', '25%', '20%', '19%', '13%', '13%' ],
        'content': []
      },
      tableSummaryData: {
        'titles': [ '', 'Cancelada', 'Devolvida', 'Pendente', 'Total' ],
        'colTypes': [ 'string', 'string', 'string', 'string', 'string' ],
        'colWidths': [ '24%', '19%', '19%', '19%', '19%' ],
        'content': []
      },
      orderBySelectI: [
        { label: 'Código' , value: 'conditional_id' },
        { label: 'Data e Hora de Geração' , value: 'conditional_creation_date_time' },
        { label: 'Nome do Cliente' , value: 'conditional_client_name' },
        { label: 'Status' , value: 'conditional_status' }
      ],
      orderByAscSelectI: [
        { label: '▲' , value: 1 },
        { label: '▼' , value: 0 }
      ],

      initialConditionalId: null,
      initialCreationStart: null,
      initialCreationEnd: null,
      initialCliName: null,
      initialConditionalStatus: null,
      initialOrderBy: null,
      initialOrderByAsc: null,

      actualPage: 1,
      maxPages: 1,
      defLimit: 10,
      conditionalId: null,
      clientName: null,
      conditionalStatus: null,
      creationDateTimeStart: null,
      creationDateTimeEnd: null,
      orderBy: 'conditional_creation_date_time',
      orderByAsc: 0,

      conditionalIds: [],
      conditionalStatusTmp: [],
      filtered: false,
      mountedDone: false
    }
  },

  created() {
    this.$root.setPageLoggedName('Visualizar Condicionais');
  },
  async mounted() {
    // clients names
    let vreturn = await this.$root.doRequest(
      Requests.getClients,
      [ true, null, null, null, null, null, null, null, null, null, null ]
    );

    if(vreturn && vreturn['ok'] && vreturn['response']){
      let loadedClients = vreturn['response']['clients'];
      this.cliNameSelectItems = loadedClients.map(x => ({'label': x['client_name'], 'value': x['client_id'], 'cpf': x['client_cpf']}));
    }
    else{
      this.$root.renderRequestErrorMsg(vreturn, []);
      this.$root.renderView('home');
    }

    let params = this.loadSessionParams();
    if(params == null){
      await this.loadConditionals(this.defLimit, 0, 'conditional_creation_date_time', 0);
    }
    else{
      // set initial element values before async rendering
      this.defLimit = params['defLimit'];
      this.actualPage = params['actualPage'];
      this.initialConditionalId = `COND-${params['conditionalId'] ? String(params['conditionalId']) : ''}`;
      this.initialCliName = params['clientName'];
      this.initialConditionalStatus = params['conditionalStatus'];
      this.initialCreationStart = params['creationDateTimeStart'];
      this.initialCreationEnd = params['creationDateTimeEnd'];
      this.initialOrderBy = params['orderBy'];
      this.initialOrderByAsc = params['orderByAsc'];

      // load conditionals
      await this.loadConditionals( 
        params['defLimit'], 
        params['actualPage']*10,
        params['orderBy'],
        params['orderByAsc'],
        params['conditionalId'],
        params['clientName'],
        params['conditionalStatus'],
        params['creationDateTimeStart'],
        params['creationDateTimeEnd']
      );
    }
    this.mountedDone = true;
  },

  methods:{

    async loadConditionals(limit, offset,  orderBy, orderByAsc, conditionalId=null, clientName=null, conditionalStatus=null, creationDateTimeStart=null, creationDateTimeEnd=null, generatePDF=false){

      if(generatePDF){
        await this.$root.doRequest(
          Requests.getConditionals,
          [ null, null, orderBy, orderByAsc, conditionalId, clientName, conditionalStatus, creationDateTimeStart, creationDateTimeEnd, generatePDF ],
          true, true
        );
      }
      else{

        this.clientIds = [];
        this.tableConditionalsData['content'] = [];
        this.tableSummaryData['content'] = [];
        
        let vreturn = await this.$root.doRequest(
          Requests.getConditionals, 
          [ limit, offset, orderBy, orderByAsc, conditionalId, clientName, conditionalStatus, creationDateTimeStart, creationDateTimeEnd, generatePDF ]
        );

        if(vreturn && vreturn['ok'] && vreturn['response'] && vreturn['response']['conditionals']){
          this.conditionalIds = [];
          this.conditionalStatusTmp = [];

          vreturn['response']['conditionals'].forEach(conditional => {
            this.conditionalIds.push(conditional['conditional_id']);
            this.conditionalStatusTmp.push(conditional['conditional_status']);
            this.tableConditionalsData['content'].push([
              `COND-${conditional['conditional_id']}`,
              conditional['conditional_client_name'],
              Utils.getDateTimeString(conditional['conditional_creation_date_time'], '/', ':', false),
              {
                'disabled': conditional['conditional_status'] == 'Cancelado' || conditional['conditional_status'] == 'Devolvido',
                'customFontColor': (conditional['conditional_status'] == 'Cancelado' ? 'fontred' : conditional['conditional_status'] == 'Devolvido' ? 'fontpink3' : null),
                'initialOptValue': conditional['conditional_status'],
                'items': [
                  { label: 'Pendente', value: 'Pendente' }, 
                  { label: 'Devolvido', value: 'Devolvido' }, 
                  { label: 'Cancelado', value: 'Cancelado', color: 'red' }
                ]
              },
              { 'showVisualize': true },
              { 'showPdf': true },
            ]);
          });

          if(vreturn['response']['summary']){
            
            let totalQuantity1P = vreturn['response']['summary']['total_quantity']/100;

            this.tableSummaryData['content'].push([
              'Quantidade',
              vreturn['response']['summary']['canceled_quantity'],
              vreturn['response']['summary']['returned_quantity'],
              vreturn['response']['summary']['pending_quantity'],
              vreturn['response']['summary']['total_quantity']
            ]);
            this.tableSummaryData['content'].push([
              'Percentual da quantidade',
              `${Math.round(vreturn['response']['summary']['canceled_quantity']/totalQuantity1P)}%`,
              `${Math.round(vreturn['response']['summary']['returned_quantity']/totalQuantity1P)}%`,
              `${Math.round(vreturn['response']['summary']['pending_quantity']/totalQuantity1P)}%`,
              `${Math.round(vreturn['response']['summary']['total_quantity']/totalQuantity1P)}%`
            ]);
          }

          this.actualPage = Math.ceil((offset+1)/this.defLimit);
          this.maxPages = Math.max(Math.ceil(vreturn['response']['total_quantity']/this.defLimit), 1);
          this.conditionalId = conditionalId;
          this.clientName = clientName;
          this.conditionalStatus = conditionalStatus;
          this.creationDateTimeStart = creationDateTimeStart;
          this.creationDateTimeEnd = creationDateTimeEnd;
          this.orderBy = orderBy;
          this.orderByAsc = orderByAsc;

          // checks if it was filtered
          if(this.conditionalId || 
            this.clientName ||
            this.conditionalStatus ||
            this.creationDateTimeStart ||
            this.creationDateTimeEnd ||
            this.orderBy != 'conditional_creation_date_time' ||
            this.orderByAsc != 0
          ){
            this.filtered = true;
          }
          else{
            this.filtered = false;
          }

          this.setSessionParams();
        }
        else{
          this.$root.renderRequestErrorMsg(vreturn, ['Data e hora de início inválida', 'Data e hora de fim inválida']);
        }
      }
    },

    async filter(generatePDF=false){
      
      let conditionalId = this.$refs.conditionalIdInput.getV();
      let clientName = this.$refs.cliNameSelect.getL();
      let conditionalStatus = this.$refs.statusSelect.getV();
      let creationDateTimeStart = this.$refs.creationDateTimeStartInput.getV();
      let creationDateTimeEnd = this.$refs.creationDateTimeEndInput.getV();
      let orderBy = this.$refs.orderBySelect.getV();
      let orderByAsc = this.$refs.orderByAscSelect.getV();
      
      conditionalId = conditionalId.replace('COND-', '');

      await this.loadConditionals(this.defLimit, 0, orderBy, orderByAsc, conditionalId, clientName, conditionalStatus, creationDateTimeStart, creationDateTimeEnd, generatePDF);
    },

    async cleanFilter(){

      this.$refs.conditionalIdInput.setV('COND-');
      this.$refs.cliNameSelect.setV('');
      this.$refs.statusSelect.setV('');
      this.$refs.creationDateTimeStartInput.setV('');
      this.$refs.creationDateTimeEndInput.setV('');
      this.$refs.orderBySelect.setV('conditional_creation_date_time');
      this.$refs.orderByAscSelect.setV(1);
      
      await this.loadConditionals(this.defLimit, 0, 'conditional_creation_date_time', 0);
    },

    async previousConditionalPage(){

      await this.loadConditionals( 
        this.defLimit,
        (this.actualPage-2)*10,
        this.orderBy,
        this.orderByAsc,
        this.conditionalId,
        this.clientName,
        this.conditionalStatus,
        this.creationDateTimeStart,
        this.creationDateTimeEnd
      );
    },

    async nextConditionalPage(){

      await this.loadConditionals( 
        this.defLimit, 
        this.actualPage*10,
        this.orderBy,
        this.orderByAsc,
        this.conditionalId,
        this.clientName,
        this.conditionalStatus,
        this.creationDateTimeStart,
        this.creationDateTimeEnd
      );
    },

    async changeConditionalStatus(statusValue, conditionalPos){
      
      if(statusValue == this.conditionalStatusTmp[conditionalPos]){
        return;
      }

      let vreturn = await this.$root.doRequest(Requests.updateConditionalStatus, [this.conditionalIds[conditionalPos], statusValue]);

      if(!vreturn || !vreturn['ok']){
        this.$root.renderRequestErrorMsg(vreturn, ['Status inválido', 'A condicional está cancelada e não pode ser alterada']);
      }
      else{
        await this.loadConditionals( 
          this.defLimit,
          (this.actualPage-1)*10,
          this.orderBy,
          this.orderByAsc,
          this.conditionalId,
          this.clientName,
          this.conditionalStatus,
          this.creationDateTimeStart,
          this.creationDateTimeEnd
        );
        this.$root.renderMsg('ok', 'Status alterado!', '');
      }
    },

    visualizeConditional(conditionalPos){
      this.$root.renderView('vercondicional', { 'conditional_id' : this.conditionalIds[conditionalPos] });
    },

    generatePDF(conditionalPos){
      this.$root.renderMsg('warn', 'Recurso em desenvolvimento!', '');
      //console.log('generate pdf ' + this.conditionalIds[conditionalPos]);
    },

    loadSessionParams(){
      let params = ClientStorage.getSessionItem('conditionalListParams');
      if(params != null){
        return JSON.parse(params);
      }
      return null;
    },
    setSessionParams(){
      let params = {
        'defLimit': this.defLimit,
        'actualPage': this.actualPage-1,
        'conditionalId': this.conditionalId,
        'clientName': this.clientName,
        'conditionalStatus': this.conditionalStatus,
        'creationDateTimeStart': this.creationDateTimeStart,
        'creationDateTimeEnd': this.creationDateTimeEnd,
        'orderBy': this.orderBy,
        'orderByAsc': this.orderByAsc
      };
      ClientStorage.setSessionItem('conditionalListParams', JSON.stringify(params));
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
.tableConditionalRow, .tableSummaryRow{
  margin-top: 20px;
}
.tableConditionalsWrapper, .tableSummaryWrapper{
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
  .row1Left, .row2Left, .row3Left{
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
  .conditionalIdInput {
    width: 115px;
  }
  .creationDateTimeStartInput, .creationDateTimeEndInput{
    width: 205px;
  }
  .statusSelect{
    width: 200px;
  }
  .orderBySelect{
    width: 260px;
  }
  .orderByAscSelect{
    width: 50px;
  }
  .filterButton, .clearFilterButton{
    display: inline-block;
    width: 20%;
    padding: 0px;
    margin-right: 20px;
  }
  .tableConditionalsWrapper, .tableSummaryWrapper{
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
  .orderBySelect{
    display: inline-block;
    width: 85%;
  }
  .orderByAscSelect{
    display: inline-block;
    width: 15%;
  }
  .filterButton, .clearFilterButton{
    display: block;
    margin: auto;
    width: 80%;
    margin-top: 10px;
  }
}

</style>