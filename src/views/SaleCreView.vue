<template>

  <div class="pageContent">

    <div class="pageSection">
      
      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Seleção do Cliente
      </TextC>

      <div class="pageSectionRow">
        <div class="row1Left">
          <LabelC for="cliNameInput"
            labelText="Nome"
            useRequiredChar
            class="plabel leftLabel"
          />
          <InputC id="cliNameInput"
            ref="cliNameInput"
            class="pinput cliNameInput"
            type="text"
            name="cliname"
            maxlength="50"
            :onlyLetters="true"
          />
        </div>

        <div class="row1Right">
          <LabelC for="cliCpfInput"
            labelText="CPF"
            class="plabel"
          />
          <InputC id="cliCpfInput"
            ref="cliCpfInput"
            class="pinput cliCpfInput"
            type="text"
            name="clicpf"
            mask='###.###.###-##'
          />
        </div>
      </div>
    </div>

    <div class="pageSection">
      
      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Adição de Produtos
      </TextC>

      <div class="pageSectionRow">
        <div class="row2Left">
          <LabelC for="nameInput"
            labelText="Nome"
            class="plabel leftLabel"
            useRequiredChar
          />
          <InputC id="nameInput"
            ref="nameInput"
            class="pinput nameInput"
            type="text"
            name="name"
            maxlength="50"
          />
        </div>

        <div class="row2Right">
          <LabelC for="codeInput"
            labelText="Código"
            class="plabel"
            useRequiredChar
          />
          <InputC id="codeInput"
            ref="codeInput"
            class="pinput codeInput"
            type="text"
            name="code"
            maxlength="20"
          />
        </div>
      </div>

      <div class="pageSectionRow">
        <div class="row3Left">
          <LabelC for="sizeSelect"
            labelText="Tamanho"
            class="plabel leftLabel"
            useRequiredChar
          />
          <SelectC id="sizeSelect"
            ref='sizeSelect'
            class="pselect sizeSelect"
            colorClass="pink3"
            name="size"
            :items="this.sizeSelectItems"
          />
        </div>

        <div class="row3Center">
          <LabelC for="colorSelect"
            labelText="Cores"
            class="plabel"
          />
          <SelectC id="colorSelect"
            ref='colorSelect'
            class="pselect colorSelect"
            colorClass="pink3"
            name="color"
            :items="this.colorSelectItems"
          />
        </div>

        <div class="row3Right">
          <LabelC for="othersSelect"
            labelText="Outros"
            class="plabel"
          />
          <SelectC id="othersSelect"
            ref='othersSelect'
            class="pselect othersSelect"
            colorClass="pink3"
            name="others"
            :items="this.othersSelectItems"
          />
        </div>
      </div>

      <div class="pageSectionRow">
        <div class="row4Left">
          <LabelC for="quantitySelect"
            labelText="Quantidade"
            class="plabel leftLabel"
          />
          <SelectC id="quantitySelect"
            ref='quantitySelect'
            class="pselect quantitySelect"
            colorClass="pink3"
            name="quantity"
            :items="this.quantitySelectItems"
          />
        </div>

        <div class="row4Center">
          <LabelC for="priceInput"
            labelText="Preço"
            class="plabel"
          />
          <InputC id="priceInput"
            ref="priceInput"
            class="pinput priceInput"
            type='text'
            name="price"
            :mask="[ 'R$ #,##', 'R$ ##,##', 'R$ ###,##', 'R$ ####,##', 'R$ #####,##' ]"
          />
        </div>
      </div>
    </div>

    <div class="pageSection">

      <div class="pageProductSection">
        
        <TextC colorClass="black1" fontSize='var(--text-title)'>
          Produtos
        </TextC>

        <div class="pageSectionRow">

          <div class="tableProductsWrapper">
            <TablePink :key="productkeyToReRender"
              ref="tableProducts"
              class="tableProducts"
              :tableData="this.tableProductsData"
              @optClicked="(optValue, rowN, colN) => this.changeContactType(optValue, rowN)"
              @reject="(rowN, colN) => this.cleanContactR(rowN)"
            />
          </div>
        
        </div>
      </div>

      <div class="pageSaleSection">
        
        <TextC colorClass="black1" fontSize='var(--text-title)'>
          Venda
        </TextC>

        <div class="pageSectionRow">

          <div class="tableSaleWrapper">
            <TablePink :key="saleKeyToReRender"
              ref="tableSale"
              class="tableSale"
              :tableData="this.tableSaleData"
              @reject="(rowN, colN) => this.cleanChildrenR(rowN)"
            />
          </div>
          
        </div>
      </div>
    </div>

    <div class="buttonsWrapper">
      <div class="buttonSaveWrapper">
        <ButtonC colorClass="pink3"
          id="btnsaveButton"
          class="btnP"
          label="Salvar"
          width="100%"
          padding="3px 0px"
          @click="this.save()"
        />
      </div>

      <div class="buttonCleanWrapper">
        <ButtonC colorClass="black1"
          id="btnCleanFields"
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
import TextC from '../components/TextC.vue'

export default {
  
  name: 'SaleCreView',

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
      sizeSelectItems: [],
      colorSelectItems: [],
      othersSelectItems: [],
      quantitySelectItems: [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 }
      ],

      tableProductsData: {
        'titles': [ 'Código', 'Nome', 'Tamanho', 'Cor', 'Outros', 'Valor', 'Quantidade', 'Remover' ],
        'colTypes': [ 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'acceptReject' ],
        'colWidths': [ '10%', '30%', '10%', '10%', '10%', '10%', '10%', '10%' ],
        'content': []
      },
      tableSaleData: {
        'titles': [ 'Código', 'Percentual de desconto', 'Valor de desconto', 'Valor total', 'Valor total com desconto', 'Forma de pagamento' ],
        'colTypes': [ 'string', 'input', 'input', 'string', 'string', 'input' ],
        'colWidths': [ '15%', '15%', '15%', '15%', '15%', '25%' ],
        'content': []
      },

      productkeyToReRender: 0,
      saleKeyToReRender: 0
    }
  },

  async created() {
    this.$root.setPageLoggedName('Geração de Vendas');

    let vreturn = await this.$root.doRequest( Requests.getProductInfo, [] );

    if(vreturn && vreturn['ok'] && vreturn['response']){
      let loadedInfo = vreturn['response'];
      this.sizeSelectItems = loadedInfo['sizes'].map(x => ({'label': x['product_size_name'], 'value': x['product_size_id']}));
      this.colorSelectItems = loadedInfo['colors'].map(x => ({'label': x['product_color_name'], 'value': x['product_color_id']}));
      this.othersSelectItems = loadedInfo['others'].map(x => ({'label': x['product_other_name'], 'value': x['product_other_id']}));
    }
    else{
      this.$root.renderRequestErrorMsg(vreturn, ['Produto não encontrado']);
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
    async save(){
      
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
        [nameV, cpfV, genderV, birthV, cepV, adressV, cityV, neighborhoodV, stateV, numberV, complementV, contactsV, childrenV]
      );

      if(vreturn && vreturn['ok']){
        let self = this;
        this.$root.renderMsg('ok', 'Sucesso!', 'Cliente cadastrado.', function () { self.$router.go(); });
      }
      else{
        this.$root.renderRequestErrorMsg(vreturn, ['Nome já utilizado!', 'Cliente não econtrado!', 'Cpf já utilizado!', 
          'Um dos contatos associados não possui o tipo', 'Um dos contatos associados está sem o valor', 'Uma das crianças associadas não possui o nome', 
          'Uma das crianças associadas não possui o aniversário', 'Uma das crianças associadas não possui o tamanho de produtos']);
      }
    },
    cleanFields(){

      this.$refs.nameInput.setV('');
      this.$refs.birthInput.setV('');
      this.$refs.cpfInput.setV('');
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
  .row1Left, .row2Left, .row1Right, .row2Right, .row3Left, .row3Center, .row3Right, .row4Left, .row4Center{
    display: inline-block;
  }
  .row1Left, .row2Left, .row3Left, .row4Left{
    text-align: left;
  }
  .row1Left, .row2Left{
    width: 60%;
  }
  .row3Left, .row4Left{
    width: 30%;
  }
  .row3Center, .row4Center{
    text-align: right;
    width: 30%;
  }
  .row1Right, .row2Right, .row3Right{
    text-align: right;
  }
  .row1Right, .row2Right, .row3Right{
    width: 40%;
  }
  .plabel{
    display: inline-block;
    margin-right: 10px;
    text-align: right;
  }
  .leftLabel{
    width: 95px;
  }
  .cliNameInput, .nameInput{
    width: 60%;
  }
  .cliCpfInput, .codeInput{
    width: 50%;
  }
  .sizeSelect, .quantitySelect{
    width: 40%;
  }
  .colorSelect, .othersSelect, .priceInput{
    width: 50%;
  }
  .tableProductsWrapper, .tableSaleWrapper{
    width: 98%;
  }
  .tableProducts, .tableSale{
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
@media (max-width: 1200px) {
  .pageSectionRow{
    margin: 5px 10px;
  }
  .plabel, .pinput, .pselect{
    display: block;
    width: 100%;
  }
  .pageProductSection, .pageSaleSection{
    width: 100%;
    display: block;
  }
  .tableProductsWrapper, .tableSaleWrapper{
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

</style>