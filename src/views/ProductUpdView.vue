<template>

  <div class="pageContent" v-if="this.createdDone">

    <div class="pageSection">
      
      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Informações Principais
      </TextC>

      <div class="pageSectionRow">
        <div class="rowTopLeft">
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

        <div class="rowTopMid">
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

        <div class="rowTopRight">
          <LabelC for="idInput"
            labelText="Id de cadastro"
            class="plabel"
          />
          <InputC id="idInput"
            ref="idInput"
            class="pinput idInput"
            type="text"
            name="prodid"
            disabled
          />
        </div>
      </div>

      <div class="pageSectionRow">
        <div class="rowHalf colLeft">
          <LabelC for="typeSelect"
            labelText="Tipos"
            class="plabel leftLabel"
            useRequiredChar
          />
          <SelectMultipleC id="typeSelect"
            ref='typeSelect'
            class="pselect typeSelect"
            colorClass="pink3"
            name="types"
            :items="this.typeSelectItems"
          />
        </div>

        <div class="rowHalf colRight">
          <LabelC for="collectionSelect"
            labelText="Coleções"
            class="plabel"
          />
          <SelectMultipleC id="collectionSelect"
            ref='collectionSelect'
            class="pselect collectionSelect"
            colorClass="pink3"
            name="collections"
            :items="this.collectionSelectItems"
          />
        </div>
      </div>

    </div>

    <div class="pageSection">
      
      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Personalização
      </TextC>

      <div class="pageSectionRow">
        <div class="rowHalf colLeft">
          <LabelC for="sizeSelect"
            labelText="Tamanhos"
            class="plabel leftLabel"
            useRequiredChar
          />
          <SelectMultipleC id="sizeSelect"
            ref='sizeSelect'
            class="pselect sizeSelect"
            colorClass="pink3"
            name="sizes"
            :items="this.sizeSelectItems"
            :initialOptsValues="[ '32', '34', '36', '38', '40', '42' ]"
            @optClicked="(itemValue) => this.updateTbls()"
          />
        </div>

        <div class="rowHalf colRight">
          <LabelC for="colorSelect"
            labelText="Cores"
            class="plabel"
          />
          <SelectMultipleC id="colorSelect"
            ref='colorSelect'
            class="pselect colorSelect"
            colorClass="pink3"
            name="colors"
            :items="this.colorSelectItems"
            @optClicked="(itemValue) => this.updateTbls()"
          />
        </div>
      </div>

      <div class="pageSectionRow">
        <div class="rowHalf colLeft">
          <LabelC for="othersSelect"
            labelText="Outros"
            class="plabel leftLabel"
          />
          <SelectMultipleC id="othersSelect"
            ref='othersSelect'
            class="pselect othersSelect"
            colorClass="pink3"
            name="others"
            :items="this.othersSelectItems"
            @optClicked="(itemValue) => this.updateTbls()"
          />
        </div>
      </div>

    </div>

    <div class="pageSection">

      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Preços e Estoque
      </TextC>
      
      <div class="tblsWrapper">
        <div class="tblPriceStockWrapper">
          <TablePink :key="tblPriceStockKey"
            ref="tblPriceStock"
            class="tblPriceStock"
            :tableData="this.tblPriceStock"
            @checkBoxClicked="(bValue) => this.selectAllPriceStock(bValue)"
          />
        </div>
        
        <div class="tblBatchChangeWrapper">
          <TablePink :key="tblBatchChangeKey"
            ref="tblBatchChange"
            class="tblBatchChange"
            :tableData="this.tblBatchChange"
            @accept="(rowN, colN) => this.doBatchChange(rowN)"
          />
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
      <div class="buttonUpdateWrapper">
        <ButtonC colorClass="pink3"
          :id="'updateButton'"
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
import InputC from '../components/InputC.vue'
import LabelC from '../components/LabelC.vue'
import Requests from '../js/requests.js'
import SelectC from '../components/SelectC.vue'
import SelectMultipleC from '../components/SelectMultipleC.vue'
import TablePink from '../components/TablePink.vue'
import TextAreaC from '../components/TextAreaC.vue'
import TextC from '../components/TextC.vue'
import Utils from '../js/utils'

export default {
  
  name: 'ProductUpdView',

  components: {
    ButtonC,
    InputC,
    LabelC,
    SelectC,
    SelectMultipleC,
    TablePink,
    TextAreaC,
    TextC
  },

  data() {
    return {
      productId: '',
      productCode: '',
      collectionSelectItems: [],
      typeSelectItems: [],
      sizeSelectItems: [],
      colorSelectItems: [],
      othersSelectItems: [],
      tblPriceStock: {
        'titles': [ 'Tamanho', 'Cor', 'Outros', 'Preço', 'Estoque', 'Selecionar' ],
        'colOperations': ['', '', '', '', '', 'checkbox'],
        'colTypes': [ 'string', 'string', 'string', 'input', 'input', 'checkbox' ],
        'colWidths': [ '10%', '25%', '25%', '10%', '10%', '20%' ],
        'content': []
      },
      tblBatchChange: {
        'single-title': 'Alterações em lote',
        'colTypes': [ 'string', 'input', 'acceptReject' ],
        'colWidths': [ '60%', '30%', '20%' ],
        'content': [ 
          ['Alterar preços para:', { 'type': 'text', 'mask': [ 'R$ #,##', 'R$ ##,##', 'R$ ###,##', 'R$ ####,##', 'R$ #####,##' ] }, { 'showAccept': true, 'showReject': false } ],
          ['Alterar estoques para:', { 'type': 'text', 'mask': '####' }, { 'showAccept': true, 'showReject': false } ]
        ]
      },
      tblPriceStockKey: 0,
      tblBatchChangeKey: 0,
      createdDone: false
    }
  },

  async created() {
    this.$root.setPageLoggedName('Edição de Produtos');

    if(!this.$root.pageParams || !this.$root.pageParams['product_code']){
      this.$root.renderView('home');
      return;
    }
    this.productCode = this.$root.pageParams['product_code'];

    let vreturn = await this.$root.doRequest( Requests.getProductInfo, [] );

    if(vreturn && vreturn['ok'] && vreturn['response']){
      let loadedInfo = vreturn['response'];
      this.collectionSelectItems = loadedInfo['collections'].map(x => ({'label': x['product_collection_name'], 'value': x['product_collection_id']}));
      this.typeSelectItems = loadedInfo['types'].map(x => ({'label': x['product_type_name'], 'value': x['product_type_id']}));
      this.sizeSelectItems = loadedInfo['sizes'].map(x => ({'label': x['product_size_name'], 'value': x['product_size_id']}));
      this.colorSelectItems = loadedInfo['colors'].map(x => ({'label': x['product_color_name'], 'value': x['product_color_id']}));
      this.othersSelectItems = loadedInfo['others'].map(x => ({'label': x['product_other_name'], 'value': x['product_other_id']}));
    }
    else{
      this.$root.renderRequestErrorMsg(vreturn, ['Produto não encontrado']);
      this.$root.renderView('home');
    }

    this.createdDone = true;
    await this.loadTbls();
  },

  methods:{

    async loadTbls(){

      let vreturn = await this.$root.doRequest( Requests.getProduct, [this.productCode] );
      
      if(!vreturn || !vreturn['ok'] || !vreturn['response']){
        this.$root.renderRequestErrorMsg(vreturn, []);
        this.$root.renderView('home');
      }
      let productData = vreturn['response'];
      this.productId = productData['product_id'];
      
      // set name, code and id
      this.$refs.nameInput.setV(productData['product_name']);
      this.$refs.codeInput.setV(productData['product_code']);
      this.$refs.idInput.setV(`PROD-${productData['product_id']}`);
      
      // sets types and collections
      this.$refs.typeSelect.setV(productData['types'], true);
      this.$refs.collectionSelect.setV(productData['collections'], true);
      
      // sets sizes, colors and others
      let sizeNamesTmp = [];
      let colorNamesTmp = [];
      let otherNamesTmp = [];
      productData['customized_products'].forEach((customP) => {
        if(!sizeNamesTmp.includes(customP['product_size_name'])){
          sizeNamesTmp.push(customP['product_size_name']);
        }
        if(customP['product_color_name'] && !colorNamesTmp.includes(customP['product_color_name'])){
          colorNamesTmp.push(customP['product_color_name']);
        }
        if(customP['product_other_name'] && !otherNamesTmp.includes(customP['product_other_name'])){
          otherNamesTmp.push(customP['product_other_name']);
        }
      });
      this.$refs.sizeSelect.setV(sizeNamesTmp, true);
      this.$refs.colorSelect.setV(colorNamesTmp, true);
      this.$refs.othersSelect.setV(otherNamesTmp, true);

      // set product observations
      this.$refs.textAreaObservations.setV(productData['product_observations']);

      // add product data
      this.tblPriceStock['content'] = [];
      for(let i = 0; i < productData['customized_products'].length; i++){
        let product = productData['customized_products'][i];
        this.addtblPriceStock(
          {'label': product['product_size_name']},
          {'label': product['product_color_name'] ? product['product_color_name'] : '---'},
          {'label': product['product_other_name'] ? product['product_other_name'] : '---'},
          {'label': String(product['product_price'])},
          {'label': String(product['product_quantity'])}
        );
      }
      this.tblPriceStockKey = this.tblPriceStockKey + 1;
    },
    updateTbls(){
      
      // copy old array
      let oldContent = this.$refs.tblPriceStock ? this.$refs.tblPriceStock.getV() : null;
      let sizeSelectV = this.$refs.sizeSelect.getV(true);
      let colorSelectV = this.$refs.colorSelect.getV(true);
      let othersSelectV = this.$refs.othersSelect.getV(true);
      
      this.tblPriceStock['content'] = [];
      for(let i = 0; i < sizeSelectV.length; i++){

        if(colorSelectV && colorSelectV.length > 0){
          for(let j = 0; j < colorSelectV.length; j++){

            if(othersSelectV && othersSelectV.length > 0){
              for(let k = 0; k < othersSelectV.length; k++){
                this.addtblPriceStock(sizeSelectV[i], colorSelectV[j], othersSelectV[k], null, null, oldContent);
              }
            }
            else{
              this.addtblPriceStock(sizeSelectV[i], colorSelectV[j], null, null, null, oldContent);
            }
          }
        }
        else if(othersSelectV && othersSelectV.length > 0){
          for(let k = 0; k < othersSelectV.length; k++){
            this.addtblPriceStock(sizeSelectV[i], null, othersSelectV[k], null, null, oldContent);
          }
        }
        else{
          this.addtblPriceStock(sizeSelectV[i], null, null, null, null, oldContent);
        }
      }
      this.tblPriceStockKey = this.tblPriceStockKey + 1;
    },
    addtblPriceStock(size, color, other, price=null, quantity=null, oldContentValues=null){

      let priceQuantity = null;
      if(oldContentValues){
        priceQuantity = this.getOldPriceQuantity(oldContentValues, size['label'], color ? color['label'] : null, other ? other['label'] : null);
      }

      this.tblPriceStock['content'].push([
        size['label'],
        color ? color['label'] : '---',
        other ? other['label'] : '---',
        { 'type': 'text', 
          'mask': [ 'R$ #,##', 'R$ ##,##', 'R$ ###,##', 'R$ ####,##', 'R$ #####,##' ],
          'value': (price ? Utils.getCurrencyFormat(Number(price['label'])) : (priceQuantity ? priceQuantity['price'] : 'R$ '))
        },
        { 'type': 'text', 'mask': '####', 'value': (quantity ? Number(quantity['label']) : (priceQuantity ? priceQuantity['quantity'] : 0)) },
        ''
      ]);
    },
    getOldPriceQuantity(oldContentValues, size, color, other){
      if(color == null){
        color = '---';
      }
      if(other == null){
        other = '---';
      }
      for(let i = 0; i < oldContentValues.length; i++){
        let contentRow = oldContentValues[i];
        if(size == contentRow[0] && color == contentRow[1] && other == contentRow[2]){
          return { 'price': contentRow[3], 'quantity': contentRow[4] }
        }
      }
      return null;
    },
    selectAllPriceStock(bValue){
      this.tblPriceStock['content'].forEach((_, rowIndex) => {
        this.$refs.tblPriceStock.setV(rowIndex, 5, bValue)
      });
    },
    doBatchChange(rowNum){
      let tblBatchChangeV = this.$refs.tblBatchChange.getV();
      let newPrice = tblBatchChangeV[0][1];
      let newQuantity = tblBatchChangeV[1][1];

      // alter prices
      if(rowNum == 0){
        this.tblPriceStock['content'].forEach((_, rowIndex) => {
          if(this.$refs.tblPriceStock.getV(rowIndex, 5)){
            this.$refs.tblPriceStock.setV(rowIndex, 3, newPrice);
          }
        });
      }
      // alter quantity
      else{
        this.tblPriceStock['content'].forEach((_, rowIndex) => {
          if(this.$refs.tblPriceStock.getV(rowIndex, 5)){
            this.$refs.tblPriceStock.setV(rowIndex, 4, newQuantity);
          }
        });
      }
    },
    async update(){
      
      let nameInputV = this.$refs.nameInput.getV();
      let codeInputV = this.$refs.codeInput.getV();
      let typeSelectIds = this.$refs.typeSelect.getV();
      let collectionSelectIds = this.$refs.collectionSelect.getV();
      let tblPriceStockV = this.$refs.tblPriceStock.getV();
      let parsedCustomProducts = [];
      let observationsV = this.$refs.textAreaObservations.getV().trim();

      if(nameInputV.length < 5 || nameInputV.length > 50){
        this.$root.renderMsg('warn', 'Nome inválido!', 'Necessário de 5 a 50 caracteres.');
        return;
      }

      if(codeInputV.length < 3 || codeInputV.length > 20){
        this.$root.renderMsg('warn', 'Código inválido!', 'Necessário de 3 a 20 caracteres.');
        return;
      }

      if(!typeSelectIds || typeSelectIds.length <= 0){
        this.$root.renderMsg('warn', 'Tipos inválidos!', 'Necessário associar pelo menos um tipo ao produto.');
        return;
      }

      if(!tblPriceStockV || tblPriceStockV.length == 0){
        this.$root.renderMsg('warn', 'Produtos inválidos!', 'Pelo menos um produto customizado deve ser associado ao produto geral.');
        return;
      }

      for(let i = 0; i < tblPriceStockV.length; i++){
        if(!tblPriceStockV[i][0]){
          this.$root.renderMsg('warn', 'Produtos inválidos!', 'Pelo menos um produto customizado deve ser associado ao produto geral.');
          return;
        }

        // size id
        let sizeId = this.sizeSelectItems.find(x => x['label'] == tblPriceStockV[i][0])['value'];
        let colorId = null;
        let otherId = null;
        let price = null;
        let quantity = null;

        // color id
        if(tblPriceStockV[i][1] != '---'){
          colorId = this.colorSelectItems.find(x => x['label'] == tblPriceStockV[i][1]);
          colorId = colorId ? colorId['value'] : null; 
        }
        
        // other id
        if(tblPriceStockV[i][2] != '---'){
          otherId = this.othersSelectItems.find(x => x['label'] == tblPriceStockV[i][2]);
          otherId = otherId ? otherId['value'] : null;
        }

        // price
        price = Utils.getNumberFormatFromCurrency(tblPriceStockV[i][3]);
        if(price <= 0){
          this.$root.renderMsg('warn', 'Preço dos produtos inválidos!', 'Os preços devem ser maiores que 0.');
          return;
        }

        // quantity
        quantity = Number(tblPriceStockV[i][4]);
        if(quantity < 0){
          this.$root.renderMsg('warn', 'Quantidade dos produtos inválidos!', 'A quanitdade dos produtos não pode ser menor que 0.');
          return;
        }

        parsedCustomProducts.push({
          'product_color_id': colorId,
          'product_other_id': otherId,
          'product_size_id': sizeId,
          'product_price': price,
          'product_quantity': quantity
        });
      }

      let vreturn = await this.$root.doRequest(
        Requests.updateProduct,
        [this.productId, codeInputV, nameInputV, collectionSelectIds, typeSelectIds, parsedCustomProducts, observationsV]
      );

      if(vreturn && vreturn['ok']){
        let self = this;
        this.$root.renderMsg('ok', 'Sucesso!', 'Produtos atualizados.', function () { self.$router.go(-1); });
      }
      else{
        this.$root.renderRequestErrorMsg(vreturn, [
          'Id do produto a ser atualizado inválido',
          'Existe um produto ativo com o mesmo código, escolha um novo código ou desative o outro produto',
          'Existe um produto ativo com o mesmo nome, escolha um novo nome ou desative o outro produto',
          'Produtos customizados inexistentes',
          'Produtos customizaveis inválidos',
          'Existe duplicatas nos produtos',
          'Preço do produto inválido para uma das variações',
          'Quantidade do produto inválida para uma das variações',
          'Tamanho do produto inválido para uma das variações'
        ]);
      }
    },
    restoreFields(){
      this.$refs.nameInput.setV('');
      this.$refs.codeInput.setV('');
      this.$refs.typeSelect.setV('');
      this.$refs.collectionSelect.setV('');
      this.$refs.sizeSelect.setV('');
      this.$refs.colorSelect.setV('');
      this.$refs.othersSelect.setV('');

      this.loadTbls();
      this.$refs.tblBatchChange.setV(0, 1, '');
      this.$refs.tblBatchChange.setV(1, 1, '');
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
@media (max-width: 1200px) {
  .pageSectionRow{
    margin: 5px 10px;
  }
  .plabel, .pinput, .pselect{
    display: block;
    width: 100%;
  }
  .tblBatchChangeWrapper{
    margin: 15px 0px;
    vertical-align: top;
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
  .rowHalf{
    display: inline-block;
    margin: 0px;
    padding: 0px;
    width: 50%;
  }
  .colLeft, .rowTopLeft{
    text-align: left;
  }
  .rowTopMid{
    text-align: center;
  }
  .colRight, .rowTopRight{
    text-align: right;
  }
  .rowTopLeft, .rowTopMid, .rowTopRight{
    display: inline-block;
  }
  .rowTopLeft{
    width: 40%;
  }
  .rowTopMid, .rowTopRight{
    width: 30%;
  }
  .plabel{
    display: inline-block;
    margin-right: 10px;
  }
  .leftLabel{
    text-align: right;
    width: 100px;
  }
  .nameInput, .typeSelect, .collectionSelect, .sizeSelect, .colorSelect, .othersSelect{
    width: calc(95% - 115px);
  }
  .codeInput, .idInput{
    width: 40%;
  }
  .tblsWrapper{
    width: 100%;
    text-align: center;
    padding: 0px;
    margin: 10px 0px 5px 0px;
  }
  .tblPriceStockWrapper, .tblBatchChangeWrapper{
    display: inline-block;
    text-align: center;
    padding: 0px;
    margin: 0px;
  }
  .tblPriceStockWrapper{
    width: 70%;
  }
  .tblBatchChangeWrapper{
    width: 27%;
    margin: 0px 1%;
    vertical-align: top;
  }
  .buttonsWrapper{
    text-align: left;
    width: 100%;
  }
  .buttonUpdateWrapper, .buttonRestoreWrapper{
    display: inline-block;
    margin-left: 20px;
  }
  .buttonUpdateWrapper{
    width: 30%;
  }
  .buttonRestoreWrapper{
    width: 20%;
  }
}

</style>