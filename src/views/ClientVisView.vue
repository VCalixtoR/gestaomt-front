<template>

  <div class="pageContent">

    <div class="clientFilters">
      
      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Filtrar
      </TextC>

      <div class="clientFiltersRow">

        <div class="nameInputWrapper">
          <LabelC for="nameInput"
            labelText="Nome"
            class="ilabel"
          />
          <InputC id="nameInput"
            ref="nameInput"
            class="nameInput"
            type="text"
            name="name"
            maxlength="50"
            :onlyLetters="true"
          />
        </div>

        <div class="childNameInputWrapper">
          <LabelC for="childnameInput"
            labelText="Nome(Filho)"
            class="ilabel"
          />
          <InputC id="childnameInput"
            ref="childnameInput"
            class="childnameInput"
            type="text"
            name="childname"
            maxlength="50"
            :onlyLetters="true"
          />
        </div>
         
      </div>

      <div class="clientFiltersRow">

        <LabelC for="birthStartInput"
          labelText="Aniversário(Filhos): De"
          class="ilabel"
        />
        <InputC id="birthStartInput"
          ref="birthStartInput"
          class="birthStartInput"
          type="date"
          name="birthStart"
        />

        <LabelC for="birthEndInput"
          labelText="até"
          class="ilabel"
        />
        <InputC id="birthEndInput"
          ref="birthEndInput"
          class="birthEndInput"
          type="date"
          name="birthEnd"
        />
      </div>

      <div class="clientFiltersRow">
        
        <LabelC for="lastBuyStartInput"
          labelText="Ultima compra: De"
          class="ilabel"
        />
        <InputC id="lastBuyStartInput"
          ref="lastBuyStartInput"
          class="lastBuyStartInput"
          type="datetime-local"
          name="lastBuyStart"
        />

        <LabelC for="lastBuyEndInput"
          labelText="até"
          class="ilabel"
        />
        <InputC id="lastBuyEndInput"
          ref="lastBuyEndInput"
          class="lastBuyEndInput"
          type="datetime-local"
          name="lastBuyEnd"
        />

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

    <div class="tableClientRow">

      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Tabela de Clientes
      </TextC>
      
      <div class="tableClientsWrapper">
        <TablePink
          class="tableClients"
          :tableData="this.tableClients"
          :showPrevNextButtons="true"
          :actualPage="this.actualClientsPage"
          :maxPages="this.maxClientsPages"
          @previousClick="this.previousClientPage()"
          @nextClick="this.nextClientPage()"
          @edit="(rowN, colN) => this.editClient(rowN)"
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
import TablePink from '../components/TablePink.vue'
import TextC from '../components/TextC.vue'
import Utils from '../js/utils'

export default {
  
  name: 'ClientVisView',

  components: {
    ButtonC,
    InputC,
    LabelC,
    TablePink,
    TextC
  },

  data() {
    return {
      clientIds: [],
      tableClients: {
        'titles': [ 'Nome', 'Data ultima compra', 'Valor ultima compra', 'Nomes(Filhos)', 'Aniversário(Filhos)', 'Editar' ],
        'colTypes': [ 'string', 'string', 'string', 'string-list', 'string-list', 'edit' ],
        'colWidths': [ '25%', '15%', '15%', '25%', '15%', '5%' ],
        'content': []
      },
      actualClientsPage: 1,
      maxClientsPages: 1,
      defLimit: 10,
      clientName: '',
      childName: '',
      birthStartT: '',
      birthEndT: '',
      lastBuyStartT: '',
      lastBuyEndT: ''
    }
  },

  async created() {
    this.$root.setPageLoggedName('Visualizar e Alterar Clientes');
    await this.loadClients(this.defLimit, 0);
  },

  methods:{

    async loadClients(limit, offset, clientName=null, childrenName=null, startChildrenBirthDate=null, endChildrenBirthDate=null, startLastSaleDate=null, endLastSaleDate=null){

      this.clientIds = [];
      this.tableClients['content'] = [];

      let vreturn = await this.$root.doRequest(
        Requests.getClients,
        [ limit, offset, clientName, childrenName, startChildrenBirthDate, endChildrenBirthDate, startLastSaleDate, endLastSaleDate ]
      );

      if(vreturn && vreturn['ok'] && vreturn['response'] && vreturn['response']['clients']){

        vreturn['response']['clients'].forEach(client => {
          this.clientIds.push(client['client_id']);
          this.tableClients['content'].push([
            client['client_name'],
            client['last_sale_date'] ? client['last_sale_date'] : '---',
            Utils.getCurrencyFormat(client['last_sale_total_value']),
            client['children'] && client['children'].length > 0 ? client['children'].map(x => x['children_name']) : ['---'],
            client['children'] && client['children'].length > 0 ? 
              client['children'].map(x => Utils.getDateString( x['children_birth_date'])): 
              ['---'],
            { 'showEdit': true }]);
        });

        this.actualClientsPage = Math.ceil((offset+1)/this.defLimit);
        this.maxClientsPages = Math.max(Math.ceil(vreturn['response']['count_clients']/this.defLimit), 1);

        this.clientName = clientName;
        this.childName = childrenName;
        this.birthStartT = startChildrenBirthDate;
        this.birthEndT = endChildrenBirthDate;
        this.lastBuyStartT = startLastSaleDate;
        this.lastBuyEndT = endLastSaleDate;
      }
      else{
        this.$root.renderRequestErrorMsg(vreturn, []);
      }
    },

    async filter(){
      
      let clientName = this.$refs.nameInput.getV();
      let childName = this.$refs.childnameInput.getV();
      let birthStartT = this.$refs.birthStartInput.getV();
      let birthEndT = this.$refs.birthEndInput.getV();
      let lastBuyStartT = this.$refs.lastBuyStartInput.getV();
      let lastBuyEndT = this.$refs.lastBuyEndInput.getV();

      await this.loadClients(this.defLimit, 0, clientName, childName, birthStartT, birthEndT, lastBuyStartT, lastBuyEndT);
    },

    async cleanFilter(){

      this.$refs.nameInput.setV('');
      this.$refs.childnameInput.setV('');
      this.$refs.birthStartInput.setV('');
      this.$refs.birthEndInput.setV('');
      this.$refs.lastBuyStartInput.setV('');
      this.$refs.lastBuyEndInput.setV('');

      await this.loadClients(this.defLimit, 0);
    },

    async previousClientPage(){

      await this.loadClients( 
        this.defLimit,
        (this.actualClientsPage-2)*10,
        this.clientName,
        this.childName,
        this.birthStartT,
        this.birthEndT,
        this.lastBuyStartT,
        this.lastBuyEndT)
    },

    async nextClientPage(){

      await this.loadClients( 
        this.defLimit, 
        this.actualClientsPage*10,
        this.clientName,
        this.childName,
        this.birthStartT,
        this.birthEndT,
        this.lastBuyStartT,
        this.lastBuyEndT)
    },

    editClient(rowNumber){
      this.$root.renderView('alterarcliente', { 'client_id' : this.clientIds[rowNumber] })
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
.clientFiltersRow{
  margin: 10px 20px;
}
.ilabel{
  margin: 0px 10px;
}
.tableClientRow{
  margin-top: 20px;
}
.tableClientsWrapper{
  margin-top: 20px;
}
.buttonsWrapper{
  text-align: left;
  margin-left: 20px;
}
@media (min-width: 1201px) {
  .nameInputWrapper, .childNameInputWrapper{
    display: inline-block;
    width: 50%;
  }
  .nameInputWrapper{
    text-align: left;
  }
  .childNameInputWrapper{
    text-align: right;
  }
  .nameInput, .childnameInput{
    width: calc(90% - 100px);
  }
  .filterButton, .clearFilterButton{
    display: inline-block;
    width: 20%;
    padding: 0px;
    margin-right: 20px;
  }
  .tableClientsWrapper{
    text-align: center;
  }
}
@media (max-width: 1200px) {
  .clientFiltersRow > *, .nameInputWrapper > *, .childNameInputWrapper > *{
    width: 100%;
    margin-left: 0px;
  }
  .ilabel{
    margin: 5px 0px;
    display: block;
  }
  .nameInputWrapper, .childNameInputWrapper{
    display: block;
    margin-top: 10px;
  }
  .filterButton, .clearFilterButton{
    display: block;
    margin: auto;
    width: 80%;
    margin-top: 10px;
  }
}

</style>