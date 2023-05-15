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
        <div class="classSelectWrapper">
          <LabelC for="classSelect"
            labelText="Classificação"
            class="ilabel"
          />
          <SelectC id="classSelect"
            ref="classSelect"
            class="classSelect"
            name="classification"
            colorClass="pink3"
            :items="this.classSelectI"
          />
        </div>

        <div class="whatsappInputWrapper">
          <LabelC for="whatsappInput"
            labelText="Whatsapp"
            class="ilabel"
          />
          <InputC id="whatsappInput"
            ref="whatsappInput"
            class="whatsappInput"
            type="text"
            name="whatsapp"
            :mask="['(##) ####-####', '(##) #####-####']"
          />
        </div>
      </div>

      <div class="clientFiltersRow">
        <LabelC for="birthStartDayInput"
          labelText="Aniversário(Filhos): De"
          class="ilabel"
        />
        <InputC id="birthStartDayInput"
          ref="birthStartDayInput"
          class="birthStartDayInput"
          type="number"
          name="birthStartDay"
          min="1"
          max="31"
        />
        <SelectC id="birthStartMonthInput"
          ref="birthStartMonthInput"
          class="birthStartMonthInput"
          name="birthStartMonth"
          colorClass="pink3"
          :items="this.monthSelectI"
        />

        <LabelC for="birthEndDayInput"
          labelText="até"
          class="ilabel"
        />
        <InputC id="birthEndDayInput"
          ref="birthEndDayInput"
          class="birthEndDayInput"
          type="number"
          name="birthEndDay"
          min="1"
          max="31"
        />
        <SelectC id="birthEndMonthInput"
          ref="birthEndMonthInput"
          class="birthEndMonthInput"
          name="birthEndMonth"
          colorClass="pink3"
          :items="this.monthSelectI"
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
import SelectC from '../components/SelectC.vue'
import TablePink from '../components/TablePink.vue'
import TextC from '../components/TextC.vue'
import Utils from '../js/utils'

export default {
  
  name: 'ClientVisView',

  components: {
    ButtonC,
    InputC,
    LabelC,
    SelectC,
    TablePink,
    TextC
  },

  data() {
    return {
      clientIds: [],
      tableClients: {
        'titles': [ 'Nome', 'Data ultima compra', 'Valor ultima compra', 'Nomes(Filhos)', 'WhatsApp', 'Classificação', 'Editar' ],
        'colTypes': [ 'string', 'string', 'string', 'string-list', 'string', 'string', 'edit' ],
        'colWidths': [ '20%', '15%', '15%', '20%', '15%', '10%', '5%' ],
        'content': []
      },
      classSelectI: [
        { label: '---' , value: '' },
        { label: 'Ruim', value: 'Ruim' },
        { label: 'Boa', value: 'Boa' },
        { label: 'Excelente', value: 'Excelente' }
      ],
      monthSelectI: [
        { label: '---' , value: '' },
        { label: 'janeiro' , value: '1' },
        { label: 'fevereiro' , value: '2' },
        { label: 'março' , value: '3' },
        { label: 'abril' , value: '4' },
        { label: 'maio' , value: '5' },
        { label: 'junho' , value: '6' },
        { label: 'julho' , value: '7' },
        { label: 'agosto' , value: '8' },
        { label: 'setembro' , value: '9' },
        { label: 'outubro' , value: '10' },
        { label: 'novembro' , value: '11' },
        { label: 'dezembro' , value: '12' }
      ],
      actualClientsPage: 1,
      maxClientsPages: 1,
      defLimit: 10,
      clientName: '',
      childName: '',
      clientClassification: '',
      clientWhatsapp: '',
      birthStartDayMonth: '',
      birthEndDayMonth: '',
      lastBuyStartT: '',
      lastBuyEndT: ''
    }
  },

  async created() {
    this.$root.setPageLoggedName('Visualizar e Alterar Clientes');
    await this.loadClients(this.defLimit, 0);
  },

  methods:{

    async loadClients(limit, offset, clientName=null, childrenName=null, clientClassification=null, clientWhatsapp=null, startChildrenBirthDayMonth=null, endChildrenBirthDayMonth=null, startLastSaleDate=null, endLastSaleDate=null){

      this.clientIds = [];
      this.tableClients['content'] = [];

      let vreturn = await this.$root.doRequest(
        Requests.getClients,
        [ false, limit, offset, clientName, childrenName, clientClassification, clientWhatsapp, startChildrenBirthDayMonth, endChildrenBirthDayMonth, startLastSaleDate, endLastSaleDate ]
      );

      if(vreturn && vreturn['ok'] && vreturn['response'] && vreturn['response']['clients']){

        vreturn['response']['clients'].forEach(client => {
          this.clientIds.push(client['client_id']);
          this.tableClients['content'].push([
            client['client_name'],
            client['last_sale_date'] ? client['last_sale_date'] : '---',
            Utils.getCurrencyFormat(client['last_sale_total_value']),
            client['children'] && client['children'].length > 0 ? client['children'].map(x => x['children_name']) : ['---'],
            client['contacts'].find(x => x['contact_type'] == 'W') ? client['contacts'].find(x => x['contact_type'] == 'W')['contact_value'] : '---',
            client['client_classification'],
            { 'showEdit': true }]);
        });

        this.actualClientsPage = Math.ceil((offset+1)/this.defLimit);
        this.maxClientsPages = Math.max(Math.ceil(vreturn['response']['count_clients']/this.defLimit), 1);

        this.clientName = clientName;
        this.childName = childrenName;
        this.clientClassification = clientClassification;
        this.clientWhatsapp = clientWhatsapp;

        this.birthStartDayMonth = startChildrenBirthDayMonth;
        this.birthEndDayMonth = endChildrenBirthDayMonth;

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
      let clientClassification = this.$refs.classSelect.getV();
      let clientWhatsapp = this.$refs.whatsappInput.getV();
      let birthStartDay = this.$refs.birthStartDayInput.getV();
      let birthStartMonth = this.$refs.birthStartMonthInput.getV();
      let birthEndDay = this.$refs.birthEndDayInput.getV();
      let birthEndMonth = this.$refs.birthEndMonthInput.getV();
      let lastBuyStartT = this.$refs.lastBuyStartInput.getV();
      let lastBuyEndT = this.$refs.lastBuyEndInput.getV();

      let birthStartDayMonth = birthStartMonth && birthStartDay ? String(birthStartMonth) + '-' + String(birthStartDay) : null;
      let birthEndDayMonth = birthEndMonth && birthEndDay ? String(birthEndMonth) + '-' + String(birthEndDay) : null;

      await this.loadClients(this.defLimit, 0, clientName, childName, clientClassification, clientWhatsapp, birthStartDayMonth, birthEndDayMonth, lastBuyStartT, lastBuyEndT);
    },

    async cleanFilter(){

      this.$refs.nameInput.setV('');
      this.$refs.childnameInput.setV('');
      this.$refs.classSelect.setV('');
      this.$refs.whatsappInput.setV('');
      this.$refs.birthStartDayInput.setV('');
      this.$refs.birthStartMonthInput.setV('');
      this.$refs.birthEndDayInput.setV('');
      this.$refs.birthEndMonthInput.setV('');
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
        this.clientClassification,
        this.clientWhatsapp,
        this.birthStartDayMonth,
        this.birthEndDayMonth,
        this.lastBuyStartT,
        this.lastBuyEndT)
    },

    async nextClientPage(){

      await this.loadClients( 
        this.defLimit, 
        this.actualClientsPage*10,
        this.clientName,
        this.childName,
        this.clientClassification,
        this.clientWhatsapp,
        this.birthStartDayMonth,
        this.birthEndDayMonth,
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
  .nameInputWrapper, .childNameInputWrapper, .classSelectWrapper, .whatsappInputWrapper{
    display: inline-block;
    width: 50%;
  }
  .nameInputWrapper, .classSelectWrapper{
    text-align: left;
  }
  .childNameInputWrapper, .whatsappInputWrapper{
    text-align: right;
  }
  .nameInput, .childnameInput{
    width: calc(90% - 100px);
  }
  .classSelect{
    width: 160px;
  }
  .birthStartDayInput, .birthEndDayInput{
    width: 55px;
  }
  .birthStartMonthInput, .birthEndMonthInput{
    width: 138px;
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
  .clientFiltersRow > *, .nameInputWrapper > *, .childNameInputWrapper > *, .classSelectWrapper > *, .whatsappInputWrapper > *{
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
  .birthStartDayInput, .birthEndDayInput{
    display: inline-block;
    width: 30%;
  }
  .birthStartMonthInput, .birthEndMonthInput{
    display: inline-block;
    width: 70%;
  }
  .filterButton, .clearFilterButton{
    display: block;
    margin: auto;
    width: 80%;
    margin-top: 10px;
  }
}

</style>