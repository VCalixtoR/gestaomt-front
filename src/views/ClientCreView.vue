<template>

  <div class="pageContent">

    <div class="pageSection">
      
      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Informações Cadastrais
      </TextC>

      <div class="pageSectionRow">
        
        <div class="topRow1Left">
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

        <div class="topRow1Right">
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
          <LabelC for="classSelect"
            labelText="Classificação"
            class="plabel"
          />
          <SelectC id="classSelect"
            ref='classSelect'
            class="pselect classSelect"
            colorClass="pink3"
            name="class"
            :items="this.classSelectI"
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

    <div class="pageSection">
      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Observações
      </TextC>

      <div class="pageSectionRow">
        <TextAreaC
          id="textAreaObservations"
          name="textAreaObservations"
          ref="textAreaObservations"
          class="textAreaObservations"
          :rows="5" :cols="200"
        />
      </div>
    </div>

    <div class="buttonsWrapper">
      <div class="buttonSaveWrapper">
        <ButtonC colorClass="pink3"
          :id="'btnsaveButton'"
          class="btnP"
          label="Salvar"
          width="100%"
          padding="3px 0px"
          @click="this.save()"
        />
      </div>

      <div class="buttonCleanWrapper">
        <ButtonC colorClass="black1"
          :id="'btnCleanFields'"
          class="btnP"
          label="Limpar"
          width="100%"
          padding="3px 0px"
          @click="this.cleanFields()"
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
import TextAreaC from '../components/TextAreaC.vue'
import TextC from '../components/TextC.vue'

export default {
  
  name: 'ClientCreView',

  components: {
    ButtonC,
    ButtonPlusC,
    InputC,
    LabelC,
    SelectC,
    TablePink,
    TextAreaC,
    TextC
  },

  data() {
    return {
      classSelectI: [
        { label: 'Ruim', value: 'Ruim' },
        { label: 'Boa', value: 'Boa' },
        { label: 'Excelente', value: 'Excelente' }
      ],
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

  async created() {
    this.$root.setPageLoggedName('Cadastro de Clientes');
    this.addContact(true);
  },

  methods:{

    addContact(updateKey=false){
      this.tableContactItems['content'].push(this.getContactArr());
      if(updateKey){
        this.contactkeyToReRender = this.contactkeyToReRender + 1;
      }
    },
    getContactArr(type="W", value=''){

      switch(type){
        
        case "W":
          return [
            { 'initialOptValue': "W", 'items': [{ label: 'WhatsApp', value: 'W' }, { label: 'TikTok', value: 'T' }, { label: 'Instagram', value: 'I' }, { label: 'Email', value: 'E' }] },
            { 'type': 'text', 'mask': ['(##) ####-####', '(##) #####-####'], 'value': value},
            { 'showAccept': false, 'showReject': true }
          ];

        case "T":
          return [
            { 'initialOptValue': "T", 'items': [{ label: 'WhatsApp', value: 'W' }, { label: 'TikTok', value: 'T' }, { label: 'Instagram', value: 'I' }, { label: 'Email', value: 'E' }] },
            { 'type': 'text', 'maxlength': '50', 'value': value },
            { 'showAccept': false, 'showReject': true }
          ];

        case "I":
          return [
            { 'initialOptValue': "I", 'items': [{ label: 'WhatsApp', value: 'W' }, { label: 'TikTok', value: 'T' }, { label: 'Instagram', value: 'I' }, { label: 'Email', value: 'E' }] },
            { 'type': 'text', 'maxlength': '50', 'value': value},
            { 'showAccept': false, 'showReject': true }
          ];

        case "E":
          return [
            { 'initialOptValue': "E", 'items': [{ label: 'WhatsApp', value: 'W' }, { label: 'TikTok', value: 'T' }, { label: 'Instagram', value: 'I' }, { label: 'Email', value: 'E' }] },
            { 'type': 'text', 'maxlength': '50', 'value': value},
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
          { label: '30', value: 1 }, 
          { label: '32', value: 2 },
          { label: '34', value: 3 },
          { label: '36', value: 4 },
          { label: '38', value: 5 },
          { label: '40', value: 6 },
          { label: '42', value: 7 },
          { label: '44', value: 8 },
          { label: 'PP', value: 9 },
          { label: 'P', value: 10 },
          { label: 'M', value: 11 },
          { label: 'G', value: 12 },
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
    async save(){
      
      let tableContactsV = this.$refs.tableContacts.getV()
      let tableChildrenV = this.$refs.tableChildren.getV()
      
      let nameV = this.$refs.nameInput.getV();
      let birthV = this.$refs.birthInput.getV();
      let cpfV = this.$refs.cpfInput.getV().replaceAll(/\.|\-/g, '');
      let classificationV = this.$refs.classSelect.getV();
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
      let observationsV = this.$refs.textAreaObservations.getV().trim();

      let curDate = new Date();
      let minDateMs = new Date().setFullYear( curDate.getFullYear() - 100 );
      let maxDateMs = new Date().setFullYear( curDate.getFullYear() - 10 );
      let maxDateChildMs = new Date().setFullYear( curDate.getFullYear() - 5 );

      if(nameV.length < 5 || nameV.length > 50){
        this.$root.renderMsg('warn', 'Nome inválido!', 'Necessário de 5 a 50 caracteres com um sobrenome no mínimo.');
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

      if(tableContactsV.length == 0){
        this.$root.renderMsg('warn', 'Contato inválido!', 'É obrigatório a adição de pelo menos o número de whatsapp como contato do cliente.');
        return;
      }
      else{
        let foundWhats = false;
        for(let i = 0; i < tableContactsV.length; i++){
          if(tableContactsV[i] && tableContactsV[i][0] == 'W' && tableContactsV[i][1].length > 0){
            foundWhats = true;
            break;
          }
        }
        if(!foundWhats){
          this.$root.renderMsg('warn', 'Contato inválido!', 'É obrigatório a adição de pelo menos o número de whatsapp como contato do cliente.');
          return;
        }
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
            if(contact[1].length <= 0 || contact[1].length > 50){
              this.$root.renderMsg('warn', 'TikTok inválido!', 'O contado tiktok da posição ' + (i+1) + ' deve possuir de 1 a 50 caracteres.');
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
        
        if(child[1]){
          let childBirthVMs = new Date(child[1]).getTime();

          if(minDateMs > childBirthVMs || childBirthVMs > maxDateChildMs){
            this.$root.renderMsg('warn', 'Data de Nascimento do filho ' + (i+1) + ' inválida!',
              'A data deve estar no formato dd/mm/aaaa e estar no intervalo de 5 a 100 anos anteriores, O campo é opcional');
            return;
          }
        }
        
        childrenV.push({ "children_name": child[0], "children_birth_date": child[1], "children_product_size_id": child[2] });
      };

      let vreturn = await this.$root.doRequest(
        Requests.createClient,
        [nameV, cpfV, genderV, birthV, cepV, adressV, cityV, neighborhoodV, stateV, numberV, complementV, contactsV, childrenV, classificationV, observationsV]
      );

      if(vreturn && vreturn['ok']){
        let self = this;
        this.$root.renderMsg('ok', 'Sucesso!', 'Cliente cadastrado.', function () { self.$router.go(); });
      }
      else{
        this.$root.renderRequestErrorMsg(vreturn, ['Nome já utilizado!', 'Cliente não econtrado!', 'Cpf já utilizado!', 'Classificação inválida',
          'Um dos contatos associados não possui o tipo', 'Um dos contatos associados está sem o valor', 'Uma das crianças associadas não possui o nome',
          'Uma das crianças associadas não possui o aniversário', 'Uma das crianças associadas não possui o tamanho de produtos']);
      }
    },
    cleanFields(){
      this.$refs.nameInput.setV('');
      this.$refs.birthInput.setV('');
      this.$refs.cpfInput.setV('');
      this.$refs.classSelect.setV('Ruim');
      this.$refs.genderSelect.setV('');
      this.$refs.cepInput.setV('');
      this.$refs.adressInput.setV('');
      this.$refs.cityInput.setV('');
      this.$refs.neighborhoodInput.setV('');
      this.$refs.stateSelect.setV('');
      this.$refs.houseNumberInput.setV('');
      this.$refs.complementInput.setV('');
      this.tableContactItems['content'] = [];
      this.tableChildrenItems['content'] = [];
      this.addContact(true);
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
.textAreaObservations{
  height: 80px;
  width: 100%;
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
  .buttonSaveWrapper, .buttonCleanWrapper{
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
  .topRow1Left, .topRow2Left, .topRow1Right, .topRow2Center, .topRow2Right, .midRow1Left, .midRow1Right, .midRow2Left, .midRow2Center, .midRow2Right, .midRow3Left, .midRow3Right{
    display: inline-block;
  }
  .topRow1Left, .topRow2Left, .midRow1Left, .midRow2Left, .midRow3Left{
    text-align: left;
  }
  .topRow2Center, .midRow2Center, .midRow2Right{
    text-align: center;
  }
  .topRow1Right, .topRow2Right, .midRow1Right, .midRow3Right{
    text-align: right;
  }
  .topRow1Left, .topRow1Right{
    width: 50%;
  }
  .topRow2Left, .topRow2Right{
    width: 30%;
  }
  .topRow2Center{
    width: 40%;
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
  .birthInput, .classSelect, .genderSelect{
    width: 160px;
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
  .buttonSaveWrapper, .buttonCleanWrapper{
    width: 20%;
    display: inline-block;
    margin-left: 20px;
  }
}

</style>