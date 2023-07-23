<template>

  <div class="pageContent" v-if="this.mountedDone">

    <div class="filterSection">
      
      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Filtrar
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

      initialConditionalId: null,
      initialCreationStart: null,
      initialCreationEnd: null,
      initialCliName: null,
      initialConditionalStatus: null,

      actualPage: 1,
      maxPages: 1,
      defLimit: 10,
      conditionalId: null,
      clientName: null,
      conditionalStatus: null,
      creationDateTimeStart: null,
      creationDateTimeEnd: null,

      conditionalIds: [],
      conditionalStatusTmp: [],

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

    let params = this.loadSessionParams();
    if(params == null){
      await this.loadConditionals(this.defLimit, 0);
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

      // load conditionals
      await this.loadConditionals( 
        params['defLimit'], 
        params['actualPage']*10,
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

    async loadConditionals(limit, offset, conditionalId=null, clientName=null, conditionalStatus=null, creationDateTimeStart=null, creationDateTimeEnd=null){

      this.clientIds = [];
      this.tableConditionalsData['content'] = [];
      
      let vreturn = await this.$root.doRequest(
        Requests.getConditionals,
        [ limit, offset, conditionalId, clientName, conditionalStatus, creationDateTimeStart, creationDateTimeEnd ]
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

        this.actualPage = Math.ceil((offset+1)/this.defLimit);
        this.maxPages = Math.max(Math.ceil(vreturn['response']['count']/this.defLimit), 1);
        this.conditionalId = conditionalId;
        this.clientName = clientName;
        this.conditionalStatus = conditionalStatus;
        this.creationDateTimeStart = creationDateTimeStart;
        this.creationDateTimeEnd = creationDateTimeEnd;

        this.setSessionParams();
      }
      else{
        this.$root.renderRequestErrorMsg(vreturn, ['Data e hora de início inválida', 'Data e hora de fim inválida']);
      }
    },

    async filter(){
      
      let conditionalId = this.$refs.conditionalIdInput.getV();
      let clientName = this.$refs.cliNameSelect.getL();
      let conditionalStatus = this.$refs.statusSelect.getV();
      let creationDateTimeStart = this.$refs.creationDateTimeStartInput.getV();
      let creationDateTimeEnd = this.$refs.creationDateTimeEndInput.getV();
      
      conditionalId = conditionalId.replace('COND-', '');

      await this.loadConditionals(this.defLimit, 0, conditionalId, clientName, conditionalStatus, creationDateTimeStart, creationDateTimeEnd);
    },

    async cleanFilter(){

      this.$refs.conditionalIdInput.setV('COND-');
      this.$refs.cliNameSelect.setV('');
      this.$refs.statusSelect.setV('');
      this.$refs.creationDateTimeStartInput.setV('');
      this.$refs.creationDateTimeEndInput.setV('');
      
      await this.loadConditionals(this.defLimit, 0);
    },

    async previousConditionalPage(){

      await this.loadConditionals( 
        this.defLimit,
        (this.actualPage-2)*10,
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
.tableConditionalRow{
  margin-top: 20px;
}
.tableConditionalsWrapper{
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
  .conditionalIdInput {
    width: 115px;
  }
  .creationDateTimeStartInput, .creationDateTimeEndInput{
    width: 205px;
  }
  .statusSelect{
    width: 200px;
  }
  .filterButton, .clearFilterButton{
    display: inline-block;
    width: 20%;
    padding: 0px;
    margin-right: 20px;
  }
  .tableConditionalsWrapper{
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