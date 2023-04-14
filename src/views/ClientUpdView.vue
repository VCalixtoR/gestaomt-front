<template>

  <div class="pageContent" v-show="this.loadedClient">

    <div class="pageSection">
      
      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Informações Cadastrais
      </TextC>

      <div class="pageSectionRow">
        
        <div class="topRowLeft">
          <LabelC for="nameInput"
            labelText="Nome"
            useRequiredChar
            class="plabel leftLabel"
          />
          <InputC id="nameInput"
            ref="nameInput"
            class="pinput nameInput"
            type="text"
            name="name"
            maxlength="50"
            :onlyLetters="true"
          />
        </div>

        <div class="topRowRight">
          <LabelC for="clientId"
            labelText="Id de cadastro"
            class="plabel"
          />
          <InputC id="clientId"
            ref="clientId"
            class="pinput clientId"
            type="text"
            name="client_id"
            disabled
          />
        </div>
      
      </div>

      <div class="pageSectionRow">

        <div class="topRow2Left">
          <LabelC for="cpfInput"
            labelText="CPF"
            class="plabel leftLabel"
          />
          <InputC id="cpfInput"
            ref="cpfInput"
            class="pinput cpfInput"
            type="text"
            name="cpf"
            mask='###.###.###-##'
          />
        </div>

        <div class="topRow2Center">
          <LabelC for="birthInput"
            labelText="Data de Nascimento"
            class="plabel"
          />
          <InputC id="birthInput"
            ref="birthInput"
            class="pinput birthInput"
            type="date"
            name="birth"
          />
        </div>

        <div class="topRow2Right">
          <LabelC for="genderSelect"
            labelText="Sexo"
            class="plabel"
          />
          <SelectC id="genderSelect"
            ref='genderSelect'
            class="pselect genderSelect"
            colorClass="pink3"
            name="gender"
            :items="this.genderSelectI"
          />
        </div>
         
      </div>
    </div>

    <div class="pageSection">
      
      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Endereço
      </TextC>

      <div class="pageSectionRow">

        <div class="midRow1Left">
          <LabelC for="cepInput"
            labelText="CEP"
            class="plabel leftLabel"
          />
          <InputC id="cepInput"
            ref="cepInput"
            class="pinput cepInput"
            type="text"
            name="cep"
            mask='#####-###'
          />
        </div>

        <div class="midRow1Right">
          <LabelC for="adressInput"
            labelText="Endereço"
            class="plabel"
          />
          <InputC id="adressInput"
            ref="adressInput"
            class="pinput adressInput"
            type="text"
            name="adress"
            maxlength="50"
          />
        </div>
      
      </div>

      <div class="pageSectionRow">

        <div class="midRow2Left">
          <LabelC for="cityInput"
            labelText="Cidade"
            class="plabel leftLabel"
          />
          <InputC id="cityInput"
            ref="cityInput"
            class="pinput cityInput"
            type="text"
            name="city"
            maxlength="20"
          />
        </div>

        <div class="midRow2Center">
          <LabelC for="neighborhoodInput"
            labelText="Bairro"
            class="plabel"
          />
          <InputC id="neighborhoodInput"
            ref="neighborhoodInput"
            class="pinput neighborhoodInput"
            type="text"
            name="neighborhood"
            maxlength="20"
          />
        </div>
        
        <div class="midRow2Right">
          <LabelC for="stateSelect"
            labelText="Estado"
            class="plabel"
          />
          <SelectC id="stateSelect"
            ref='stateSelect'
            class="pselect stateSelect"
            colorClass="pink3"
            name="state"
            :items="this.stateSelectI"
          />
        </div>
         
      </div>

      <div class="pageSectionRow">

        <div class="midRow3Left">
          <LabelC for="houseNumberInput"
            labelText="Número"
            class="plabel leftLabel"
          />
          <InputC id="houseNumberInput"
            ref="houseNumberInput"
            class="pinput houseNumberInput"
            type="text"
            name="houseNumber"
            mask='######'
          />
        </div>

        <div class="midRow3Right">
          <LabelC for="complementInput"
            labelText="Complemento"
            class="plabel"
          />
          <InputC id="complementInput"
            ref="complementInput"
            class="pinput complementInput"
            type="text"
            name="houseNumber"
            inputMaxlength="50"
          />
        </div>

      </div>
    </div>

    <div class="pageSection">

      <div class="pageContactSection">
        
        <TextC colorClass="black1" fontSize='var(--text-title)'>
          Contatos
        </TextC>

        <div class="pageSectionRow">

          <div class="tableContactsWrapper" v-show="this.tableContactItems['content'].length > 0">
            <TablePink :key="contactkeyToReRender"
              ref="tableContacts"
              class="tableContacts"
              :tableData="this.tableContactItems"
              @optClicked="(optValue, rowN, colN) => this.changeContactType(optValue, rowN)"
              @reject="(rowN, colN) => this.cleanContactR(rowN)"
            />
          </div>

          <div class="btnplusWrapper">
            <ButtonPlusC
              id='btnpluscontacts'
              @click="this.addContact()"
            />
          </div>
        
        </div>

      </div>

      <div class="pageChildrenSection">
        
        <TextC colorClass="black1" fontSize='var(--text-title)'>
          Filhos
        </TextC>

        <div class="pageSectionRow">

          <div class="tableChildrenWrapper" v-show="this.tableChildrenItems['content'].length > 0">
            <TablePink :key="childrenKeyToReRender"
              ref="tableChildren"
              class="tableChildren"
              :tableData="this.tableChildrenItems"
              @reject="(rowN, colN) => this.cleanChildrenR(rowN)"
            />
          </div>

          <div class="btnplusWrapper">
            <ButtonPlusC
              id='btnpluschildren'
              @click="this.addChildren()"
            />
          </div>
          
        </div>

      </div>

    </div>

    <div class="buttonsWrapper">
      <div class="buttonUpdateWrapper">
        <ButtonC colorClass="pink3"
          :id="'btnUpdate'"
          class="btnP"
          label="Salvar edição"
          width="100%"
          padding="3px 0px"
          @click="this.update()"
        />
      </div>

      <div class="buttonRestoreWrapper">
        <ButtonC colorClass="black1"
          :id="'btnRestoreFields'"
          class="btnP"
          label="Restaurar"
          width="100%"
          padding="3px 0px"
          @click="this.restoreFields()"
        />
      </div>
    </div>

  </div>

</template>

<script>

import ButtonC from '../components/ButtonC.vue'
import ButtonPlusC from '../components/ButtonPlusC.vue'
import InputC from '../components/InputC.vue'
import LabelC from '../components/LabelC.vue'
import Requests from '../js/requests.js'
import SelectC from '../components/SelectC.vue'
import TablePink from '../components/TablePink.vue'
import TextC from '../components/TextC.vue'

export default {
  
  name: 'ClientUpdView',

  components: {
    ButtonC,
    ButtonPlusC,
    InputC,
    LabelC,
    SelectC,
    TablePink,
    TextC
  },

  data() {
    return {
      loadedClient: null,
      genderSelectI: [
        { label: 'Feminino', value: 'F' },
        { label: 'Masculino', value: 'M' }
      ],
      stateSelectI: [
        { label: 'MG', value: 'MG'},
        { label: 'AC', value: 'AC'},
        { label: 'AL', value: 'AL'},
        { label: 'AP', value: 'AP'},
        { label: 'AM', value: 'AM'},
        { label: 'BA', value: 'BA'},
        { label: 'CE', value: 'CE'},
        { label: 'DF', value: 'DF'},
        { label: 'ES', value: 'ES'},
        { label: 'GO', value: 'GO'},
        { label: 'MA', value: 'MA'},
        { label: 'MT', value: 'MT'},
        { label: 'MS', value: 'MS'},
        { label: 'PA', value: 'PA'},
        { label: 'PB', value: 'PB'},
        { label: 'PR', value: 'PR'},
        { label: 'PE', value: 'PE'},
        { label: 'PI', value: 'PI'},
        { label: 'RJ', value: 'RJ'},
        { label: 'RN', value: 'RN'},
        { label: 'RS', value: 'RS'},
        { label: 'RO', value: 'RO'},
        { label: 'RR', value: 'RR'},
        { label: 'SC', value: 'SC'},
        { label: 'SP', value: 'SP'},
        { label: 'SE', value: 'SE'},
        { label: 'TO', value: 'TO'}
      ],
      tableContactItems: {
        'titles': [ 'Tipo', 'Contato', 'Remover' ],
        'colTypes': [ 'select', 'input', 'acceptReject' ],
        'colWidths': [ '25%', '55%', '20%' ],
        'content': []
      },
      tableChildrenItems: {
        'titles': [ 'Nome', 'Data de Nascimento', 'Tamanho Usado', 'Remover' ],
        'colTypes': [ 'input', 'input', 'select', 'acceptReject' ],
        'colWidths': [ '40%', '25%', '20%', '15%' ],
        'content': []
      },
      contactkeyToReRender: 0,
      childrenKeyToReRender: 0
    }
  },

  created() {
    this.$root.setPageLoggedName('Edição de Clientes');
  },
  async mounted() {

    if(!this.$root.pageParams || !this.$root.pageParams['client_id']){
      this.$root.renderView('home');
      return;
    }

    let clientId = this.$root.pageParams['client_id'];
    let vreturn = await this.$root.doRequest( Requests.getClient, [clientId] );

    if(vreturn && vreturn['ok'] && vreturn['response'] && vreturn['response']['client_id']){
      this.loadedClient = vreturn['response'];
      this.restoreFields();
    }
    else{
      this.$root.renderRequestErrorMsg(vreturn, ['Cliente não econtrado!']);
      this.$root.renderView('home');
    }
  },

  methods:{

    addContact(){
      this.tableContactItems['content'].push(this.getContactArr());
    },
    getContactArr(type="W", value=''){

      switch(type){
        
        case "W":
          return [
            { 'initialOptValue': "W", 'items': [{ label: 'WhatsApp', value: 'W' }, { label: 'Telefone', value: 'T' }, { label: 'Instagram', value: 'I' }, { label: 'Email', value: 'E' }] },
            { 'type': 'text', 'mask': ['(##) ####-####', '(##) #####-####'], 'value': value},
            { 'showAccept': false, 'showReject': true }
          ];

        case "T":
          return [
            { 'initialOptValue': "T", 'items': [{ label: 'WhatsApp', value: 'W' }, { label: 'Telefone', value: 'T' }, { label: 'Instagram', value: 'I' }, { label: 'Email', value: 'E' }] },
            { 'type': 'text', 'mask': ['(##) ####-####', '(##) #####-####'], 'value': value},
            { 'showAccept': false, 'showReject': true }
          ];

        case "I":
          return [
            { 'initialOptValue': "I", 'items': [{ label: 'WhatsApp', value: 'W' }, { label: 'Telefone', value: 'T' }, { label: 'Instagram', value: 'I' }, { label: 'Email', value: 'E' }] },
            { 'type': 'text', 'maxlength': '25', 'value': value},
            { 'showAccept': false, 'showReject': true }
          ];

        case "E":
          return [
            { 'initialOptValue': "E", 'items': [{ label: 'WhatsApp', value: 'W' }, { label: 'Telefone', value: 'T' }, { label: 'Instagram', value: 'I' }, { label: 'Email', value: 'E' }] },
            { 'type': 'text', 'maxlength': '25', 'value': value},
            { 'showAccept': false, 'showReject': true }
          ];
      }
    },
    changeContactType(optValue, row){

      let tableContactsV = this.$refs.tableContacts.getV();

      this.tableContactItems['content'] = [];
      tableContactsV.forEach((tableContactV, cIndex) => {
        this.tableContactItems['content'].push(this.getContactArr( (cIndex != row ? tableContactV[0] : optValue) , (cIndex != row ? tableContactV[1] : '') ));
      });

      // forces component to rerender to resolve not updating issues
      this.contactkeyToReRender = this.contactkeyToReRender + 1;
    },
    cleanContactR(row){

      let tableContactsV = this.$refs.tableContacts.getV();
      
      this.tableContactItems['content'] = [];
      tableContactsV.forEach((tableContactV, cIndex) => {
        if(cIndex != row){
          this.tableContactItems['content'].push(this.getContactArr(tableContactV[0], tableContactV[1]));
        }
      });
      
      // forces component to rerender to resolve not updating issues
      this.contactkeyToReRender = this.contactkeyToReRender + 1;
    },

    addChildren(){
      this.tableChildrenItems['content'].push(this.getChildrenArr());
    },
    getChildrenArr(nameValue='', dateValue='',sizeValue=1){
      
      return [
        { 'type': 'text', 'maxlength': '50', 'onlyLetters': true, 'placeholder': '---', 'value': nameValue },
        { 'type': 'date', 'value': dateValue },
        { 'initialOptValue': sizeValue, 'items': [ 
          { label: '32', value: 1 },
          { label: '34', value: 2 },
          { label: '36', value: 3 },
          { label: '38', value: 4 },
          { label: '40', value: 5 },
          { label: '42', value: 6 }
        ]},
        { 'showAccept': false, 'showReject': true } ]
    },
    cleanChildrenR(row){

      let tableChildrenV = this.$refs.tableChildren.getV();
      
      this.tableChildrenItems['content'] = [];
      tableChildrenV.forEach((tableChildV, cIndex) => {
        if(cIndex != row){
          this.tableChildrenItems['content'].push(this.getChildrenArr(tableChildV[0], tableChildV[1], tableChildV[2]));
        }
      });
      
      // forces component to rerender to resolve not updating issues
      this.childrenKeyToReRender = this.childrenKeyToReRender + 1;
    },
    async update(){
      
      let tableContactsV = this.$refs.tableContacts.getV()
      let tableChildrenV = this.$refs.tableChildren.getV()
      
      let nameV = this.$refs.nameInput.getV();
      let birthV = this.$refs.birthInput.getV();
      let cpfV = this.$refs.cpfInput.getV().replaceAll(/\.|\-/g, '');
      let genderV = this.$refs.genderSelect.getV();
      let cepV = this.$refs.cepInput.getV().replaceAll(/\-/g, '');
      let adressV = this.$refs.adressInput.getV();
      let cityV = this.$refs.cityInput.getV();
      let neighborhoodV = this.$refs.neighborhoodInput.getV();
      let stateV = this.$refs.stateSelect.getV();
      let numberV = this.$refs.houseNumberInput.getV();
      let complementV = this.$refs.complementInput.getV();
      let contactsV = [];
      let childrenV = [];

      let curDate = new Date();
      let minDateMs = new Date().setFullYear( curDate.getFullYear() - 100 );
      let maxDateMs = new Date().setFullYear( curDate.getFullYear() - 10 );
      let maxDateChildMs = new Date().setFullYear( curDate.getFullYear() - 5 );

      if(nameV.length < 10 || nameV.split(' ').length < 2 || nameV.length > 50){
        this.$root.renderMsg('warn', 'Nome inválido!', 'Necessário de 10 a 50 caracteres com um sobrenome no mínimo.');
        return;
      }

      if(birthV != null && birthV != ''){

        let clientBirthVMs = new Date(birthV).getTime();

        if(minDateMs > clientBirthVMs || clientBirthVMs > maxDateMs){
          this.$root.renderMsg('warn', 'Data de Nascimento do cliente inválida!',
            'A data deve estar no formato dd/mm/aaaa e estar no intervalo de 10 a 100 anos anteriores, O campo é opcional e deve estar completo ou sem nenhum valor');
          return;
        }
      }

      if(cpfV.length > 0 && cpfV.length != 11){
        this.$root.renderMsg('warn', 'Cpf inválido!', 'O campo é opcional e deve estar completo ou sem nenhum valor');
        return;
      }

      if(cepV.length > 0 && cepV.length != 8){
        this.$root.renderMsg('warn', 'Cep inválido!', 'O campo é opcional e deve estar completo ou sem nenhum valor');
        return;
      }

      for(let i = 0; i < tableContactsV.length; i++){
        let contact = tableContactsV[i];

        switch(contact[0]){
          case 'W':
            if(contact[1].length >= 0 && contact[1].length < 10){
              this.$root.renderMsg('warn', 'WhatsApp inválido!', 'O contado da posição ' + (i+1) + ' está preenchido parcialmente.');
              return;
            }
            contactsV.push({ "contact_type": "W", "contact_value": contact[1] });
            break;
          case 'T':
            if(contact[1].length >= 0 && contact[1].length < 10){
              this.$root.renderMsg('warn', 'Telefone inválido!', 'O contado da posição ' + (i+1) + ' está preenchido parcialmente.');
              return;
            }
            contactsV.push({ "contact_type": "T", "contact_value": contact[1] });
            break;
          case 'I':
            if(!/^\S*$/.test(contact[1])){
              this.$root.renderMsg('warn', 'Conta do instagram inválida!', 'O nome da conta do instagram na posição ' + (i+1) + ' não pode conter espaços.');
              return;
            }
            contactsV.push({ "contact_type": "I", "contact_value": contact[1] });
            break;
          case 'E':
            if(!contact[1].match(/.+@.+/) || !/^\S*$/.test(contact[1])){
              this.$root.renderMsg('warn', 'Email inválido!', 'O email na posição ' + (i+1) + ' deve conter @ e não conter espaços.');
              return;
            }
            contactsV.push({ "contact_type": "E", "contact_value": contact[1] });
            break;
        }
      }
      
      for(let i = 0; i < tableChildrenV.length; i++){
        let child = tableChildrenV[i];

        if(child[0].length < 3){
          this.$root.renderMsg('warn', 'Nome inválido!', 'O nome do filho na posição ' + (i+1) + ' deve conter no mínimo 3 letras.');
          return;
        }

        if(child[1] == null || child[1] == ''){
          this.$root.renderMsg('warn', 'Data de Nascimento do filho ' + (i+1) + ' inválida!',
            'A data deve estar no formato dd/mm/aaaa e estar no intervalo de 5 a 100 anos anteriores, O campo é obrigatório');
          return;
        }

        let childBirthVMs = new Date(child[1]).getTime();

        if(minDateMs > childBirthVMs || childBirthVMs > maxDateChildMs){
          this.$root.renderMsg('warn', 'Data de Nascimento do filho ' + (i+1) + ' inválida!',
            'A data deve estar no formato dd/mm/aaaa e estar no intervalo de 5 a 100 anos anteriores, O campo é obrigatório');
          return;
        }

        childrenV.push({ "children_name": child[0], "children_birth_date": child[1], "children_product_size_id": child[2] });
      };

      let vreturn = await this.$root.doRequest(
        Requests.updateClient,
        [this.loadedClient['client_id'], nameV, cpfV, genderV, birthV, cepV, adressV, cityV, neighborhoodV, stateV, numberV, complementV, contactsV, childrenV]
      );

      if(vreturn && vreturn['ok']){
        let self = this;
        this.$root.renderMsg('ok', 'Sucesso!', 'Cliente atualizado.', function () { self.$router.go(); });
      }
      else{
        this.$root.renderRequestErrorMsg(vreturn, ['Cliente não econtrado!', 'Cpf já utilizado!']);
      }
    },
    restoreFields(){
      
      this.$refs.clientId.setV('CLI-'+this.loadedClient['client_id']);
      this.$refs.nameInput.setV(this.loadedClient['client_name']);
      this.$refs.birthInput.setV(this.loadedClient['client_birth_date']);
      this.$refs.cpfInput.setV(this.loadedClient['client_cpf']);
      this.$refs.genderSelect.setV(this.loadedClient['client_gender']);
      this.$refs.cepInput.setV(this.loadedClient['client_cep']);
      this.$refs.adressInput.setV(this.loadedClient['client_adress']);
      this.$refs.cityInput.setV(this.loadedClient['client_city']);
      this.$refs.neighborhoodInput.setV(this.loadedClient['client_neighborhood']);
      this.$refs.stateSelect.setV(this.loadedClient['client_state']);
      this.$refs.houseNumberInput.setV(this.loadedClient['client_number']);
      this.$refs.complementInput.setV(this.loadedClient['client_complement']);
      
      this.tableContactItems['content'] = [];
      this.tableChildrenItems['content'] = [];

      if(this.loadedClient['contacts']){
        for(let i = 0; i < this.loadedClient['contacts'].length; i++){
          let contact = this.loadedClient['contacts'][i];
          this.tableContactItems['content'].push(this.getContactArr(contact['contact_type'], contact['contact_value']));
        }
      }

      if(this.loadedClient['children']){
        for(let i = 0; i < this.loadedClient['children'].length; i++){
          let child = this.loadedClient['children'][i];
          this.tableChildrenItems['content'].push(this.getChildrenArr(child['children_name'], child['children_birth_date'], child['children_product_size_id']));
        }
      }

      this.contactkeyToReRender = this.contactkeyToReRender + 1;
      this.childrenKeyToReRender = this.childrenKeyToReRender + 1;
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
.btnplusWrapper{
  text-align: center;
  margin: 10px;
}
@media (max-width: 1200px) {
  .pageSectionRow{
    margin: 5px 10px;
  }
  .plabel, .pinput, .pselect{
    display: block;
    width: 100%;
  }
  .plabel{
    margin-top: 7px;
  }
  .pageContactSection, .pageChildrenSection{
    width: 100%;
    display: block;
  }
  .tableContactsWrapper, .tableChildrenWrapper{
    width: 100%;
    text-align: center;
  }
  .buttonsWrapper{
    text-align: center;
    width: 100%;
  }
  .buttonUpdateWrapper, .buttonRestoreWrapper{
    width: 80%;
    display: inline-block;
    margin: 10px;
    text-align: center;
  }
  .btnP{
    display: inline-block;
  }
}
@media (min-width: 1201px) {
  .pageSectionRow{
    margin: 10px 20px;
  }
  .topRowLeft, .topRowRight, .topRow2Left, .topRow2Center, .topRow2Right, .midRow1Left, .midRow1Right, .midRow2Left, .midRow2Center, .midRow2Right, .midRow3Left, .midRow3Right{
    display: inline-block;
  }
  .topRowLeft, .topRow2Left, .midRow1Left, .midRow2Left, .midRow3Left{
    text-align: left;
  }
  .topRow2Center, .midRow2Center, .midRow2Right{
    text-align: center;
  }
  .topRowRight, .topRow2Right, .midRow1Right, .midRow3Right{
    text-align: right;
  }
  .topRowLeft, .topRowRight{
    width: 50%;
  }
  .topRow2Center{
    width: 40%;
  }
  .topRow2Left, .topRow2Right{
    width: 30%;
  }
  .midRow1Left{
    width: 40%;
  }
  .midRow1Right{
    width: 60%;
  }
  .midRow2Left{
    width: 40%;
  }
  .midRow2Center{
    width: 40%;
  }
  .midRow2Right{
    width: 20%;
  }
  .midRow3Left{
    width: 30%;
  }
  .midRow3Right{
    width: 70%;
  }
  .plabel{
    display: inline-block;
    margin-right: 10px;
  }
  .leftLabel{
    width: 65px;
  }
  .nameInput{
    width: calc(100% - 80px);
  }
  .clientId, .genderSelect, .birthInput{
    width: 150px;
    text-align: center;
  }
  .cpfInput{
    width: calc(90% - 80px);
  }
  .cepInput{
    width: calc(60% - 80px);
  }
  .adressInput{
    width: calc(80% - 200px);
  }
  .cityInput, .neighborhoodInput{
    width: calc(80% - 60px);
  }
  .stateSelect{
    width: calc(100% - 70px);
  }
  .houseNumberInput{
    width: calc(60% - 70px);
  }
  .complementInput{
    width: calc(70% - 200px);
  }
  .pageContactSection {
    width: 43%;
    display: inline-block;
    margin-right: 1%;
    vertical-align: top;
  }
  .pageChildrenSection{
    display: inline-block;
    width: 56%;
    vertical-align: top;
  }
  .tableContactsWrapper, .tableChildrenWrapper{
    width: 98%;
  }
  .tableContacts, .tableChildren{
    display: inline-block;
  }
  .buttonsWrapper{
    text-align: left;
    width: 100%;
  }
  .buttonUpdateWrapper, .buttonRestoreWrapper{
    width: 20%;
    display: inline-block;
    margin-left: 20px;
  }
}

</style>