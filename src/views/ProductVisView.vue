<template>

  <div class="pageContent" v-if="this.mountedDone">

    <div class="filter">
      
      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Filtrar
      </TextC>
      <TextC colorClass="pink" fontSize='var(--text-warn)' fontWeight="bold" v-if="this.filtered">
        Atenção: Filtros aplicados
      </TextC>

      <div class="filtersRow">
        <div class="filterColLeft">
          <LabelC for="codeInput"
            labelText="Código"
            class="leftLabel"
          />
          <InputC id="codeInput"
            ref="codeInput"
            class="codeInput leftInput"
            type="text"
            name="code"
            maxlength="20"
            :initialValue="this.initialCodeInput"
          />
        </div>

        <div class="filterColRight">
          <TextC colorClass="black2" class="labelInterval">
            Estoque:
          </TextC>

          <LabelC for="startQuantityInput"
            labelText="De"
            class="priceQuantityLabel"
          />
          <InputC id="startQuantityInput"
            ref="startQuantityInput"
            class="startQuantityInput priceQuantityInput"
            type='text'
            name="startquantity"
            mask="####"
            :initialValue="this.initialStartQuantity"
          />

          <LabelC for="endQuantityInput"
            labelText="até"
            class="priceQuantityLabel priceQuantityLabel2"
          />
          <InputC id="endQuantityInput"
            ref="endQuantityInput"
            class="endQuantityInput priceQuantityInput"
            type='text'
            name="endquantity"
            mask="####"
            :initialValue="this.initialEndQuantity"
          />
        </div>
      </div>

      <div class="filtersRow">
        <div class="filterColLeft">
          <LabelC for="nameInput"
            labelText="Nome"
            class="leftLabel"
          />
          <InputC id="nameInput"
            ref="nameInput"
            class="nameInput leftInput"
            type="text"
            name="name"
            maxlength="50"
            :initialValue="this.initialName"
          />
        </div>

        <div class="filterColRight">
          <TextC colorClass="black2" class="labelInterval">
            Preço:
          </TextC>

          <LabelC for="startPriceInput"
            labelText="De"
            class="priceQuantityLabel"
          />
          <InputC id="startPriceInput"
            ref="startPriceInput"
            class="startPriceInput priceQuantityInput"
            type='text'
            name="startprice"
            :mask="[ 'R$ #,##', 'R$ ##,##', 'R$ ###,##', 'R$ ####,##', 'R$ #####,##' ]"
            :initialValue="this.initialStartPrice"
          />

          <LabelC for="endPriceInput"
            labelText="até"
            class="priceQuantityLabel priceQuantityLabel2"
          />
          <InputC id="endPriceInput"
            ref="endPriceInput"
            class="endPriceInput priceQuantityInput"
            type='text'
            name="endprice"
            :mask="[ 'R$ #,##', 'R$ ##,##', 'R$ ###,##', 'R$ ####,##', 'R$ #####,##' ]"
            :initialValue="this.initialEndPrice"
          />
        </div>
      </div>

      <div class="filtersRow">
        <div class="filterColLeft">
          <LabelC for="typeSelect"
            labelText="Tipo"
            class="leftLabel"
          />
          <SelectC id="typeSelect"
            ref='typeSelect'
            class="typeSelect leftSelect"
            colorClass="pink3"
            name="type"
            :items="this.typeSelectItems"
            :initialOptValue="this.initialTypeSelectItem"
          />
        </div>

        <div class="filterColRight">
          <LabelC for="colorSelect"
            labelText="Cor"
            class="colorOtherLabel"
          />
          <SelectC id="colorSelect"
            ref='colorSelect'
            class="colorSelect colorOtherSelect"
            colorClass="pink3"
            name="color"
            :items="this.colorSelectItems"
            :initialOptValue="this.initialColorSelectItem"
          />
        </div>
      </div>

      <div class="filtersRow">
        <div class="filterColLeft">
          <LabelC for="collectionSelect"
            labelText="Coleção"
            class="leftLabel"
          />
          <SelectC id="collectionSelect"
            ref='collectionSelect'
            class="collectionSelect leftSelect"
            colorClass="pink3"
            name="collection"
            :items="this.collectionSelectItems"
            :initialOptValue="this.initialCollectionSelectItem"
          />
        </div>

        <div class="filterColRight">
          <LabelC for="otherSelect"
            labelText="Outro"
            class="colorOtherLabel"
          />
          <SelectC id="otherSelect"
            ref='otherSelect'
            class="otherSelect colorOtherSelect"
            colorClass="pink3"
            name="other"
            :items="this.otherSelectItems"
            :initialOptValue="this.initialOtherSelectItem"
          />
        </div>
      </div>

      <div class="filtersRow">
        <div class="filterColLeft">
          <LabelC for="sizeSelect"
            labelText="Tamanho"
            class="leftLabel"
          />
          <SelectC id="sizeSelect"
            ref='sizeSelect'
            class="sizeSelect leftSelect"
            colorClass="pink3"
            name="size"
            :items="this.sizeSelectItems"
            :initialOptValue="this.initialSizeSelectItem"
          />
        </div>

        <div class="filterColRight">
          <LabelC for="orderBySelect"
            labelText="Ordenar por:"
            class="orderByLabel"
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

    <div class="tableProductRow">

      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Tabela de Produtos
      </TextC>
      
      <div class="tableProductWrapper">
        <TablePink
          class="tableClients"
          :tableData="this.tableProducts"
          :showPrevNextButtons="true"
          :actualPage="this.actualProductsPage"
          :maxPages="this.maxProductsPages"
          @previousClick="this.previousProductPage()"
          @nextClick="this.nextProductPage()"
          @edit="(rowN, colN) => this.editProduct(rowN)"
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
import TablePink from '../components/TablePink.vue'
import TextC from '../components/TextC.vue'
import Utils from '../js/utils'

export default {
  
  name: 'ProductVisView',

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
      productCodes: [],
      tableProducts: {
        'titles': [ 'Código', 'Nome', 'Tipos', 'Estoque e Preço', 'Editar' ],
        'colTypes': [ 'string', 'string', 'string-list', 'string-list', 'edit' ],
        'colWidths': [ '15%', '25%', '20%', '35%', '5%' ],
        'content': []
      },
      orderBySelectI: [
        { label: 'Código' , value: 'product_code' },
        { label: 'Nome' , value: 'product_name' }
      ],
      orderByAscSelectI: [
        { label: '▲' , value: 1 },
        { label: '▼' , value: 0 }
      ],
      typeSelectItems: [],
      colorSelectItems: [],
      collectionSelectItems: [],
      otherSelectItems: [],
      sizeSelectItems: [],
      
      initialCodeInput: null,
      initialName: null,
      initialStartQuantity: null,
      initialEndQuantity: null,
      initialStartPrice: null,
      initialEndPrice: null,
      initialCollectionSelectItem: null,
      initialColorSelectItem: null,
      initialTypeSelectItem: null,
      initialOtherSelectItem: null,
      initialSizeSelectItem: null,
      initialOrderBy: null,
      initialOrderByAsc: null,

      actualProductsPage: 1,
      maxProductsPages: 1,
      defLimit: 10,
      code: '',
      name: '',
      colorId: '',
      otherId: '',
      sizeId: '',
      collectionId: '',
      typeId: '',
      quantityStart: '',
      quantityEnd: '',
      priceStart: '',
      priceEnd: '',
      orderBy: 'product_code',
      orderByAsc: 1,

      showColorsInProductName: true,
      showOthersInProductName: true,
      filtered: false,
      mountedDone: false
    }
  },

  created() {
    this.$root.setPageLoggedName('Visualizar e Alterar Produtos');
  },
  async mounted() {

    let vreturn = await this.$root.doRequest( Requests.getProductInfo, [] );

    if(vreturn && vreturn['ok'] && vreturn['response']){
      let loadedInfo = vreturn['response'];
      this.collectionSelectItems = loadedInfo['collections'].map(x => ({'label': x['product_collection_name'], 'value': x['product_collection_id']}));
      this.typeSelectItems = loadedInfo['types'].map(x => ({'label': x['product_type_name'], 'value': x['product_type_id']}));
      this.sizeSelectItems = loadedInfo['sizes'].map(x => ({'label': x['product_size_name'], 'value': x['product_size_id']}));
      this.colorSelectItems = loadedInfo['colors'].map(x => ({'label': x['product_color_name'], 'value': x['product_color_id']}));
      this.otherSelectItems = loadedInfo['others'].map(x => ({'label': x['product_other_name'], 'value': x['product_other_id']}));

      this.collectionSelectItems.unshift({ label: '_', value: '' });
      this.typeSelectItems.unshift({ label: '_', value: '' });
      this.sizeSelectItems.unshift({ label: '_', value: '' });
      this.colorSelectItems.unshift({ label: '_', value: '' });
      this.otherSelectItems.unshift({ label: '_', value: '' });
    }
    else{
      this.$root.renderRequestErrorMsg(vreturn, []);
      this.$root.renderView('home');
    }

    let params = this.loadSessionParams();
    if(params == null){
      await this.loadProducts(this.defLimit, 0, 'product_code', 1);
    }
    else{
      // set initial element values before async rendering
      this.defLimit = params['defLimit'];
      this.actualProductsPage = params['actualProductsPage'];
      this.initialCodeInput = params['code'];
      this.initialName = params['name'];
      this.initialStartQuantity = params['quantityStart'];
      this.initialEndQuantity = params['quantityEnd'];
      this.initialStartPrice = params['priceStart'] ? Utils.getCurrencyFormat(params['priceStart']) : null;
      this.initialEndPrice = params['priceEnd'] ? Utils.getCurrencyFormat(params['priceEnd']) : null;
      this.initialColorSelectItem = params['colorId'];
      this.initialOtherSelectItem = params['otherId'];
      this.initialSizeSelectItem = params['sizeId'];
      this.initialCollectionSelectItem = params['collectionId'];
      this.initialTypeSelectItem = params['typeId'];
      this.initialOrderBy = params['orderBy'];
      this.initialOrderByAsc = params['orderByAsc'];

      // load products
      await this.loadProducts(
        params['defLimit'],
        params['actualProductsPage']*10,
        params['orderBy'],
        params['orderByAsc'],
        params['code'],
        params['name'],
        params['colorId'],
        params['otherId'],
        params['sizeId'],
        params['collectionId'],
        params['typeId'],
        params['quantityStart'],
        params['quantityEnd'],
        params['priceStart'],
        params['priceEnd']
      );
    }

    this.mountedDone = true;
  },

  methods:{

    async loadProducts(limit, offset, orderBy, orderByAsc, code=null, name=null, colorId=null, otherId=null, sizeId=null, 
      collectionId=null, typeId=null, quantityStart=null, quantityEnd=null, priceStart=null, priceEnd=null, generatePDF=false){
      
      if(generatePDF){
        await this.$root.doRequest(
          Requests.getProducts,
          [ null, null, orderBy, orderByAsc, code, name, colorId, otherId, sizeId, collectionId, typeId, quantityStart, quantityEnd, priceStart, priceEnd, generatePDF ],
          true, true
        );
      }
      else{
        this.productCodes = [];
        this.tableProducts['content'] = [];

        let vreturn = await this.$root.doRequest(
          Requests.getProducts,
          [ limit, offset, orderBy, orderByAsc, code, name, colorId, otherId, sizeId, collectionId, typeId, quantityStart, quantityEnd, priceStart, priceEnd, generatePDF ]
        );

        if(vreturn && vreturn['ok'] && vreturn['response'] && vreturn['response']['products']){

          vreturn['response']['products'].forEach(product => {

            this.productCodes.push(product['product_code']);

            // splits before to avoid splitting in map several times
            // size
            let productSizeNames = product['product_size_names'].split(',');
            // colors
            let productColorNames = product['product_color_names'] && product['product_color_names'].length > 0 ? 
              product['product_color_names'].split(',') : null;
            // others
              let productOtherNames = product['product_other_names'] && product['product_other_names'].length > 0 ? 
              product['product_other_names'].split(',') : null;
            // quantitys
            let productQuantityes = product['customized_product_quantityes'].split(',');
            // prices
            let productPrices = product['customized_product_prices'].split(',').map(x => Utils.getCurrencyFormat(x));

            let productsResume = [];

            productSizeNames.forEach((size, i) => {
              if(productQuantityes > 0){
                productsResume.push(
                  size + ' ' + 
                  (productColorNames && this.showColorsInProductName ? productColorNames[i] : '') + ' ' + 
                  (productOtherNames && this.showOthersInProductName ? productOtherNames[i] : '') + ' : ' + 
                  productQuantityes[i] + ' : ' +
                  productPrices[i]
                );
              }
            })
            
            // inserts to table
            this.tableProducts['content'].push([
              product['product_code'],
              product['product_name'],
              product['product_type_names'] && product['product_type_names'].length > 0 ? product['product_type_names'].split(',') : ['---'],

              //product['product_collection_names'] && product['product_collection_names'].length > 0 ? product['product_collection_names'].split(',') : ['---'],
              
              productsResume && productsResume.length > 0 ? productsResume : ['---'],

              { 'showEdit': true }]);
          });

          // actual and page for paginator
          this.actualProductsPage = Math.ceil((offset+1)/this.defLimit);
          this.maxProductsPages = Math.max(Math.ceil(vreturn['response']['count']/this.defLimit), 1);

          // stores filter values
          this.code = code;
          this.name = name;
          this.colorId = colorId;
          this.otherId = otherId;
          this.sizeId = sizeId;
          this.collectionId = collectionId;
          this.typeId = typeId;
          this.quantityStart = quantityStart;
          this.quantityEnd = quantityEnd;
          this.priceStart = priceStart;
          this.priceEnd = priceEnd;
          this.orderBy = orderBy;
          this.orderByAsc = orderByAsc;

          // checks if it was filtered
          if(this.code ||
            this.name ||
            this.colorId ||
            this.otherId ||
            this.sizeId ||
            this.collectionId ||
            this.typeId ||
            this.quantityStart ||
            this.quantityEnd ||
            this.priceStart ||
            this.priceEnd ||
            this.orderBy != 'product_code' ||
            this.orderByAsc != 1
          ){
            this.filtered = true;
          }
          else{
            this.filtered = false;
          }

          this.setSessionParams();
        }
        else{
          this.$root.renderRequestErrorMsg(vreturn, []);
        }
      }
    },

    async filter(generatePDF=false){
      
      let code = this.$refs.codeInput.getV();
      let name = this.$refs.nameInput.getV();
      let colorId = this.$refs.colorSelect.getV();
      let otherId = this.$refs.otherSelect.getV();
      let sizeId = this.$refs.sizeSelect.getV();
      let collectionId = this.$refs.collectionSelect.getV(); 
      let typeId = this.$refs.typeSelect.getV();
      let startQuantity = this.$refs.startQuantityInput.getV();
      let endQuantity = this.$refs.endQuantityInput.getV();
      let startPrice = Utils.getNumberFormatFromCurrency(this.$refs.startPriceInput.getV());
      let endPrice = Utils.getNumberFormatFromCurrency(this.$refs.endPriceInput.getV());
      let orderBy = this.$refs.orderBySelect.getV();
      let orderByAsc = this.$refs.orderByAscSelect.getV();

      await this.loadProducts(this.defLimit, 0, orderBy, orderByAsc, code, name, colorId, otherId, sizeId, collectionId, typeId, 
        startQuantity, endQuantity, startPrice, endPrice, generatePDF);
    },

    async cleanFilter(){

      this.$refs.codeInput.setV('');
      this.$refs.nameInput.setV('');
      this.$refs.colorSelect.setV('');
      this.$refs.otherSelect.setV('');
      this.$refs.sizeSelect.setV('');
      this.$refs.collectionSelect.setV('');
      this.$refs.typeSelect.setV('');
      this.$refs.startQuantityInput.setV('');
      this.$refs.endQuantityInput.setV('');
      this.$refs.startPriceInput.setV('');
      this.$refs.endPriceInput.setV('');
      this.$refs.orderBySelect.setV('product_code');
      this.$refs.orderByAscSelect.setV(1);

      await this.loadProducts(this.defLimit, 0, 'product_code', 1);
    },

    async previousProductPage(){

      await this.loadProducts(
        this.defLimit,
        (this.actualProductsPage-2)*10,
        this.orderBy,
        this.orderByAsc,
        this.code,
        this.name,
        this.colorId,
        this.otherId,
        this.sizeId,
        this.collectionId,
        this.typeId,
        this.quantityStart,
        this.quantityEnd,
        this.priceStart,
        this.priceEnd
      )
    },

    async nextProductPage(){

      await this.loadProducts(
        this.defLimit,
        this.actualProductsPage*10,
        this.orderBy,
        this.orderByAsc,
        this.code,
        this.name,
        this.colorId,
        this.otherId,
        this.sizeId,
        this.collectionId,
        this.typeId,
        this.quantityStart,
        this.quantityEnd,
        this.priceStart,
        this.priceEnd
      )
    },

    editProduct(rowNumber){
      this.$root.renderView('alterarproduto', { 'product_code' : this.productCodes[rowNumber] });
    },

    loadSessionParams(){
      let params = ClientStorage.getSessionItem('prodVisParams');
      if(params != null){
        return JSON.parse(params);
      }
      return null;
    },
    setSessionParams(){
      let params = {
        'defLimit': this.defLimit,
        'actualProductsPage': this.actualProductsPage-1,
        'code': this.code,
        'name': this.name,
        'colorId': this.colorId,
        'otherId': this.otherId,
        'sizeId': this.sizeId,
        'collectionId': this.collectionId,
        'typeId': this.typeId,
        'quantityStart': this.quantityStart,
        'quantityEnd': this.quantityEnd,
        'priceStart': this.priceStart,
        'priceEnd': this.priceEnd,
        'orderBy': this.orderBy,
        'orderByAsc': this.orderByAsc
      };
      ClientStorage.setSessionItem('prodVisParams', JSON.stringify(params));
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
.tableProductRow{
  margin-top: 20px;
}
.tableProductWrapper{
  margin-top: 20px;
}
.buttonsWrapper{
  text-align: left;
  margin: 20px;
}
@media (min-width: 1201px) {
  .filtersRow{
    margin: 10px 20px;
  }
  .filterColLeft, .filterColRight{
    display: inline-block;
    margin: 0px;
    padding: 0px;
  }
  .filterColLeft{
    text-align: left;
    width: 40%;
  }
  .filterColRight{
    text-align: right;
    width: 60%;
  }
  .leftLabel, .colorOtherLabel{
    display: inline-block;
    margin-right: 10px;
    text-align: right;
    width: 70px;
  }
  .priceQuantityLabel, .orderByLabel{
    margin: 0px 7px;
  }
  .leftInput, .leftSelect{
    width: calc(80% - 80px);
  }
  .priceQuantityInput{
    width: 150px;
  }
  .colorOtherSelect{
    width: calc(70% - 80px);
  }
  .orderBySelect{
    width: 210px;
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
  .tableProductWrapper{
    text-align: center;
  }
}
@media (max-width: 1200px) {
  .filtersRow > *{
    width: 100%;
    margin-left: 0px;
  }
  .leftLabel, .colorOtherLabel, .orderByLabel{
    margin-top: 10px;
    display: block;
  }
  .labelInterval{
    display: block;
    margin-top: 10px;
  }
  .priceQuantityLabel{
    display: inline-block;
    margin: 5px 0px;
  }
  .priceQuantityLabel2{
    margin: 5px 7px;
  }
  .labelInterval{
    display: inline-block;
    margin-top: 10px;
  }
  .priceQuantityInput{
    display: block;
    width: calc(100% - 20px);
    margin: 0px 10px;
  }
  .codeInput, .nameInput, .typeSelect, .colorSelect, .collectionSelect, .otherSelect, .sizeSelect{
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