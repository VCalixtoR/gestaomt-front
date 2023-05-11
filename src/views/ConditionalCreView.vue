<template>

  <div class="pageContent">

    <div class="pageSection">
      
      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Seleção do Cliente
      </TextC>

      <div class="pageSectionRow">
        <div class="row1Left">
          <LabelC for="cliNameSelect"
            labelText="Nome"
            useRequiredChar
            class="plabel leftLabel"
          />
          <SelectWithFilter
            id="cliNameSelect" 
            ref="cliNameSelect"
            class="pselect cliNameSelect"
            colorClass="pink3"
            name="cliname"
            :items="this.cliNameSelectItems"
            @optClicked="(itemValue) => this.updateCpf(itemValue)"
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
            disabled
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
          <LabelC for="nameSelect"
            labelText="Nome"
            class="plabel leftLabel"
            useRequiredChar
          />
          <SelectWithFilter
            id="nameSelect"
            ref="nameSelect"
            class="pselect nameSelect"
            colorClass="pink3"
            name="name"
            :items="this.nameSelectItems"
            @optClicked="(itemValue) => this.updateProduct(itemValue)"
          />
        </div>

        <div class="row2Right">
          <LabelC for="codeSelect"
            labelText="Código"
            class="plabel"
            useRequiredChar
          />
          <SelectWithFilter
            id="codeSelect" 
            ref="codeSelect"
            class="pselect codeSelect"
            colorClass="pink3"
            name="code"
            :items="this.codeSelectItems"
            @optClicked="(itemValue) => this.updateProduct(itemValue)"
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
          <SelectWithFilter :key="sizeSelectKeyToReRender"
            id="sizeSelect"
            ref="sizeSelect"
            class="pselect sizeSelect"
            colorClass="pink3"
            name="size"
            :items="this.sizeSelectItems"
            @optClicked="() => this.updateProductQuantity()"
          />
        </div>

        <div class="row3Center">
          <LabelC for="colorSelect"
            labelText="Cores"
            class="plabel"
            useRequiredChar
          />
          <SelectWithFilter :key="colorSelectKeyToReRender"
            id="colorSelect" 
            ref="colorSelect"
            class="pselect colorSelect"
            colorClass="pink3"
            name="color"
            :inputDisabled="this.colorSelectItems.length == 0"
            :items="this.colorSelectItems"
            @optClicked="() => this.updateProductQuantity()"
          />
        </div>

        <div class="row3Right">
          <LabelC for="othersSelect"
            labelText="Outros"
            class="plabel"
            useRequiredChar
          />
          <SelectWithFilter :key="othersSelectKeyToReRender"
            id="othersSelect" 
            ref="othersSelect"
            class="pselect othersSelect"
            colorClass="pink3"
            name="others"
            :inputDisabled="this.othersSelectItems.length == 0"
            :items="this.othersSelectItems"
            @optClicked="() => this.updateProductQuantity()"
          />
        </div>
      </div>

      <div class="pageSectionRow">
        <div class="row4Left">
          <LabelC for="quantitySelect"
            labelText="Quantidade"
            class="plabel leftLabel"
            useRequiredChar
          />
          <SelectWithFilter :key="quantitySelectKeyToReRender"
            id="quantitySelect"
            ref="quantitySelect"
            class="pselect quantitySelect"
            colorClass="pink3"
            name="quantity"
            :inputDisabled="this.quantityDisabled"
            :items="this.quantitySelectItems"
            :initialOptValue="0"
          />
        </div>

        <div class="row4Right">
          <ButtonC id="addProductButton"
            colorClass="pink3"
            class="btnP"
            label="Adicionar"
            width="40%"
            padding="3px 0px"
            :disabled="this.quantityDisabled"
            @click="this.addProduct()"
          />
        </div>
      </div>
    </div>

    <div class="pageSection">

      <div class="pageProductSection" v-show="this.tableProductsData['content'].length > 0">
        
        <TextC colorClass="black1" fontSize='var(--text-title)'>
          Produtos
        </TextC>

        <div class="pageSectionRow">

          <div class="tableProductsWrapper">
            <TablePink :key="productkeyToReRender"
              ref="tableProducts"
              class="tableProducts"
              :tableData="this.tableProductsData"
              @reject="(rowN, colN) => this.removeProductFromTable(rowN)"
            />
          </div>
        
        </div>
      </div>

      <div class="pageConditionalSection">
        
        <TextC colorClass="black1" fontSize='var(--text-title)'>
          Condicional
        </TextC>

        <div class="pageSectionRow">

          <div class="tableConditionalWrapper">
            <TablePink
              ref="tableConditional"
              class="tableConditional"
              :tableData="this.tableConditionalData"
            />
          </div>
          
        </div>
      </div>
    </div>

    <div class="buttonsWrapper">
      <div class="buttoncreateConditionalWrapper">
        <ButtonC colorClass="pink3"
          id="createConditionalButton"
          class="btnP"
          label="Salvar"
          width="100%"
          padding="3px 0px"
          @click="this.createConditional()"
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
import SelectWithFilter from '../components/SelectWithFilter.vue'
import TablePink from '../components/TablePink.vue'
import TextC from '../components/TextC.vue'

export default {
  
  name: 'ConditionalCreView',

  components: {
    ButtonC,
    ButtonPlusC,
    InputC,
    LabelC,
    SelectWithFilter,
    TablePink,
    TextC
  },

  data() {
    return {
      cliNameSelectItems: [],
      nameSelectItems: [],
      codeSelectItems: [],
      sizeSelectItems: [],
      colorSelectItems: [],
      othersSelectItems: [],
      quantitySelectItems: [],

      tableProductsData: {
        'titles': [ 'Código', 'Nome', 'Tamanho', 'Cor', 'Outros', 'Quantidade', 'Remover' ],
        'colTypes': [ 'string', 'string', 'string', 'string', 'string', 'string', 'acceptReject' ],
        'colWidths': [ '10%', '30%', '13%', '13%', '14%', '10%', '10%' ],
        'content': []
      },
      tableConditionalData: {
        'titles': [ 'Código' ],
        'colTypes': [ 'string' ],
        'colWidths': [ '100%' ],
        'content': []
      },

      sizeSelectKeyToReRender: 3000,
      colorSelectKeyToReRender: 4000,
      othersSelectKeyToReRender: 5000,
      productkeyToReRender: 6000,
      quantitySelectKeyToReRender: 8000,

      loadedProdInfo: null,
      conditionalCustomizedProducts: {},
      actualCustomizedProducts: null,
      quantityDisabled: true
    }
  },

  async created() {
    this.$root.setPageLoggedName('Geração de Condicionais');
    await this.loadPageInfo();
    if(this.$root.pageParams && this.$root.pageParams['conditional_id']){
      await this.reutilizeConditional(this.$root.pageParams['conditional_id']);
    }
  },

  methods:{

    // loads clients products and conditional infos
    async loadPageInfo(){

      // clients
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

      // products
      vreturn = await this.$root.doRequest( Requests.getProductInfo, [] );

      if(vreturn && vreturn['ok'] && vreturn['response']){
        this.loadedProdInfo = vreturn['response'];
        this.nameSelectItems = this.loadedProdInfo['products'].map(x => ({'label': x['product_name'], 'value': x['product_id']}));
        this.codeSelectItems = this.loadedProdInfo['products'].map(x => ({'label': x['product_code'], 'value': x['product_id']}));
      }
      else{
        this.$root.renderRequestErrorMsg(vreturn, []);
        this.$root.renderView('home');
      }

      // conditional
      vreturn = await this.$root.doRequest( Requests.getConditionalInfo, [] );

      if(vreturn && vreturn['ok'] && vreturn['response']){
        this.tableConditionalData['content'][0] = [`COND-${vreturn['response']['next_conditional_id']}`];
      }
      else{
        this.$root.renderRequestErrorMsg(vreturn, []);
        this.$root.renderView('home');
      }
    },

    // reutilize conditional
    async reutilizeConditional(conditionalId){
      console.log(conditionalId);
    },

    // on client name selected updates its cpf
    updateCpf(clientId){
      this.$refs['cliCpfInput'].setV(this.cliNameSelectItems.find(x => x['value'] == clientId)['cpf']);
    },
    // on product name or code selected updates each and its personalization
    updateProduct(productId){
      this.$refs['nameSelect'].setV(productId);
      this.$refs['codeSelect'].setV(productId);
      this.updateProductPersonalization(this.$refs['codeSelect'].getL());
    },
    // get product personalization data and load selects with the data
    async updateProductPersonalization(productCode){

      let vreturn = await this.$root.doRequest(
        Requests.getProduct,
        [ productCode ]
      );

      if(vreturn && vreturn['ok'] && vreturn['response']){
        let tmpSizeItems = [];
        let tmpColorItems = [];
        let tmpOthersItems = [];
        this.sizeSelectItems = [];
        this.colorSelectItems = [];
        this.othersSelectItems = [];
        
        // used at save to parse product data
        this.conditionalCustomizedProducts[vreturn['response']['product_code']] = vreturn['response'];

        // foreach personalized info
        this.actualCustomizedProducts = vreturn['response']['customized_products'];
        this.actualCustomizedProducts.forEach(perInfo => {
          
          // includes only once each size attribute
          if(!tmpSizeItems.includes(perInfo['product_size_name'])){
            let sizeObject = this.loadedProdInfo['sizes'].find(x => x['product_size_name'] == perInfo['product_size_name']);
            
            tmpSizeItems.push(sizeObject['product_size_name']);
            this.sizeSelectItems.push({
              'label': sizeObject['product_size_name'],
              'value': sizeObject['product_size_id'],
              'pos': sizeObject['product_size_pos']
            });
          }

          // includes only once each color attribute
          if(perInfo['product_color_name'] && !tmpColorItems.includes(perInfo['product_color_name'])){
            let colorObject = this.loadedProdInfo['colors'].find(x => x['product_color_name'] == perInfo['product_color_name']);

            tmpColorItems.push(colorObject['product_color_name']);
            this.colorSelectItems.push({
              'label': colorObject['product_color_name'],
              'value': colorObject['product_color_id'],
              'pos': colorObject['product_color_pos']
            });
          }

          // includes only once each other attribute
          if(perInfo['product_other_name'] && !tmpOthersItems.includes(perInfo['product_other_name'])){
            let otherObject = this.loadedProdInfo['others'].find(x => x['product_other_name'] == perInfo['product_other_name']);

            tmpOthersItems.push(otherObject['product_other_name']);
            this.othersSelectItems.push({
              'label': otherObject['product_other_name'],
              'value': otherObject['product_other_id'],
              'pos': otherObject['product_other_pos']
            });
          }
        });

        // update keys to render objects correctly
        this.sizeSelectKeyToReRender++;
        this.colorSelectKeyToReRender++;
        this.othersSelectKeyToReRender++;
      }
      else{
        this.$root.renderRequestErrorMsg(vreturn, []);
        this.$root.renderView('home');
      }
      this.resetProductQuantity();
    },
    // update quantity field
    updateProductQuantity(){
      let sizeLabel = this.$refs['sizeSelect'].getL();
      let colorLabel = this.$refs['colorSelect'].getL();
      let otherLabel = this.$refs['othersSelect'].getL();
      this.quantityDisabled = true;

      // checks size
      if(this.sizeSelectItems && this.sizeSelectItems.length > 0 && (sizeLabel == null || sizeLabel == undefined)){
        this.quantitySelectItems = [{ 'label': 'Campo tamanho vazio', 'value': 0 }];
      }
      // checks color
      else if(this.colorSelectItems && this.colorSelectItems.length > 0 && (colorLabel == null || colorLabel == undefined)){
        this.quantitySelectItems = [{ 'label': 'Campo cor vazio', 'value': 0 }];
      }
      // checks other
      else if(this.othersSelectItems && this.othersSelectItems.length > 0 && (otherLabel == null || otherLabel == undefined)){
        this.quantitySelectItems = [{ 'label': 'Campo outro vazio', 'value': 0 }];
      }
      // set quantity searching in actualCustomizedProducts
      else{
        let foundCP = false;
        for(let i = 0; i < this.actualCustomizedProducts.length; i++){
          if(this.actualCustomizedProducts[i]['product_size_name'] == sizeLabel && 
            this.actualCustomizedProducts[i]['product_color_name'] == colorLabel && 
            this.actualCustomizedProducts[i]['product_other_name'] == otherLabel){
            
            foundCP = true;

            if(this.actualCustomizedProducts[i]['product_quantity'] <= 0){
              this.quantitySelectItems = [{ 'label': 'Variação sem estoque', 'value': 0 }];
            }
            else{
              // quantity
              this.quantitySelectItems = [];
              for (let j = 1; j <= this.actualCustomizedProducts[i]['product_quantity']; j++) {
                this.quantitySelectItems.push({ 'label': j.toString(), 'value': j });
              };
              this.quantityDisabled = false;
            }
          }
        }
        if(!foundCP){
          this.quantitySelectItems = [{ 'label': 'Variação não encontrada', 'value': 0 }];
        }
      }
      this.quantitySelectKeyToReRender++;
    },
    resetProductQuantity(){
      this.quantitySelectItems = [];
      this.quantityDisabled = true;
      this.quantitySelectKeyToReRender++;
    },
    addProduct(){
      let nameObj = this.$refs['nameSelect'].getObj();
      let codeObj = this.$refs['codeSelect'].getObj();
      let sizeObj = this.$refs['sizeSelect'].getObj();
      let colorObj = this.$refs['colorSelect'].getObj();
      let otherObj = this.$refs['othersSelect'].getObj();
      let quantityObj = this.$refs['quantitySelect'].getObj();

      if(!quantityObj || !quantityObj['value'] || quantityObj['value'] <= 0){
        this.$root.renderMsg('warn', 'Quantidade inválida!', 'Quantidade deve ser maior que 0');
        return;
      }

      this.addProductToTable(
        nameObj['label'], codeObj['label'], sizeObj['label'], (colorObj ? colorObj['label'] : ''), 
        (otherObj ? otherObj['label'] : ''), quantityObj['label']);
    },
    addProductToTable(name, code, size, color, other, quantity){

      // updates if has duplicants
      let foundDuplicate = false;
      for(let i = 0; i < this.tableProductsData['content'].length; i++){
        let content = this.tableProductsData['content'][i];
        
        if(content[0] == code && 
          content[1] == name && 
          content[2] == size && 
          content[3] == color && 
          content[4] == other
        ){
          foundDuplicate = true;
          this.tableProductsData['content'][i][6] = quantity;
          this.$root.renderMsg('warn', 'Variação adicionada duplicada!', 'Quantidade foi substituída pelo valor novo');
        }
      }

      // add and sort products if not has duplicants
      if(!foundDuplicate){
        this.tableProductsData['content'].push([
          code, name, size, color, other, quantity, { 'showAccept': false, 'showReject': true }
        ]);
        this.tableProductsData['content'].sort(function(x, y){
          if(x[0] != y[0]){ return x[0].localeCompare(y[0]); }
          if(x[2] != y[2]){ return x[2].localeCompare(y[2]); }
          if(x[3] != y[3]){ return x[3].localeCompare(y[3]); } 
          return x[4].localeCompare(y[4]);
        })
      }

      // rerender product table
      this.productkeyToReRender++;
    },
    removeProductFromTable(rowN){
      // remove item, rerender product table and updates conditional table
      this.tableProductsData['content'].splice(rowN, 1);
      this.productkeyToReRender++;
    },

    async createConditional(){
      
      let clientId = this.$refs.cliNameSelect.getV();
      let employeeId = this.$root.userLoggedData['id'];
      let productsData = this.tableProductsData['content'];

      if(clientId == null || clientId == undefined){
        this.$root.renderMsg('warn', 'Cliente inválido!', 'É preciso selecionar o cliente');
        return;
      }
      if(employeeId == null || employeeId == undefined){
        this.$root.renderMsg('warn', 'Funcionário inválido!', 'Este erro não deveria ocorrer, contatar suporte técnico');
        return;
      }

      let conditionalHasProducts = [];
      let conditionalProductsTmp = {};
      // get product data from conditionalCustomizedProducts by code as key and find personalized product
      productsData.forEach((productFromTable) => {

        let productData = this.conditionalCustomizedProducts[productFromTable[0]];
        let productId = productData['product_id'];
        for(let i = 0; i < productData['customized_products'].length; i++){
          let customProductData = productData['customized_products'][i];

          if(
            productFromTable[2] == customProductData['product_size_name'] &&
            productFromTable[3] == (customProductData['product_color_name'] ? customProductData['product_color_name'] : '') &&
            productFromTable[4] == (customProductData['product_other_name'] ? customProductData['product_other_name'] : '')
          ){
            if(!conditionalProductsTmp[productId]){
              conditionalProductsTmp[productId] = {};
            }
            conditionalProductsTmp[productId][customProductData['customized_product_id']] = {
              'customized_product_id': customProductData['customized_product_id'],
              'customized_product_conditional_quantity': Number(productFromTable[5])
            }
          }
        }
      });

      // converts to api format
      Object.keys(conditionalProductsTmp).forEach((productId) => {

        let customizedProducts = [];
        Object.keys(conditionalProductsTmp[productId]).forEach((customProductId) => {
          customizedProducts.push(conditionalProductsTmp[productId][customProductId]);
        });

        conditionalHasProducts.push({
          'product_id': productId,
          'customized_products': customizedProducts
        });

      });

      let vreturn = await this.$root.doRequest(
        Requests.createConditional,
        [clientId, employeeId, conditionalHasProducts]
      );

      if(vreturn && vreturn['ok']){
        let self = this;
        this.$root.renderMsg('ok', 'Sucesso!', 'Condicional cadastrada.', function () { self.$router.go(); });
      }
      else{
        this.$root.renderRequestErrorMsg(vreturn, [
          'O cliente associado à condicional não existe no sistema',
          'O funcionario associado à condicional não existe no sistema',
          'O funcionario associado à condicional não esta habilitado no sistema',
          'A condicional deve possuir pelo menos um produto associado',
          'Um dos produtos associados foi enviado sem o product_id',
          'Um dos produtos associados não foi encontrado no sistema',
          'Um dos produtos associados está inativo',
          'Um dos produtos associados foi enviado sem produtos customizados',
          'Um dos produtos customizaveis associados foi enviado sem o campo customized_product_id',
          'Um dos produtos customizaveis associados foi enviado sem o campo customized_product_conditional_quantity',
          'Um dos produtos associados possui quantidade de produtos 0 ou menor',
          'Um dos produtos customizaveis associados não foi encontrado no sistema',
          'Um dos produtos customizaveis associados está inativo',
          'Um dos produtos customizaveis associados está com quantidade maior que o estoque disponível'
        ]);
      }
    },
    cleanFields(){

      this.$refs.cliNameSelect.setV('');
      this.$refs.cliCpfInput.setV('');
      this.$refs.nameSelect.setV('');
      this.$refs.codeSelect.setV('');
      this.$refs.sizeSelect.setV('');
      this.$refs.colorSelect.setV('');
      this.$refs.othersSelect.setV('');
      this.$refs.quantitySelect.setV('');
      
      this.tableProductsData['content'] = [];
      this.productkeyToReRender++;

      this.resetProductQuantity();

      this.conditionalCustomizedProducts = {};
      this.actualCustomizedProducts = null;
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
  .row1Left,  .row1Right, .row2Left, .row2Right, .row3Left, .row3Center, .row3Right, .row4Left, .row4Right{
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
  .row3Center{
    text-align: right;
    width: 30%;
  }
  .row1Right, .row2Right, .row3Right, .row4Right{
    text-align: right;
  }
  .row1Right, .row2Right, .row3Right{
    width: 40%;
  }
  .row4Right{
    width: 70%;
  }
  .plabel{
    display: inline-block;
    margin-right: 10px;
    text-align: right;
  }
  .leftLabel{
    width: 115px;
  }
  .cliNameSelect, .nameSelect{
    width: 60%;
  }
  .cliCpfInput, .codeSelect{
    width: 50%;
  }
  .sizeSelect, .quantitySelect{
    width: 40%;
  }
  .colorSelect, .othersSelect{
    width: 50%;
  }
  .tableProductsWrapper {
    width: 98%;
  }
  .tableConditionalWrapper{
    width: 30%;
  }
  .tableProducts, .tableConditional{
    display: inline-block;
  }
  .buttonsWrapper{
    text-align: left;
    width: 100%;
  }
  .buttoncreateConditionalWrapper, .buttonCleanWrapper{
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
  .pageProductSection, .pageConditionalSection{
    width: 100%;
    display: block;
  }
  .tableProductsWrapper, .tableConditionalWrapper{
    width: 100%;
    text-align: center;
  }
  .buttonsWrapper{
    text-align: center;
    width: 100%;
  }
  .buttoncreateConditionalWrapper, .buttonCleanWrapper{
    width: 80%;
    display: inline-block;
    margin: 10px;
    text-align: center;
  }
  .row4Right{
    margin: 10px;
    text-align: center;
  }
  .btnP{
    display: inline-block;
  }
}

</style>