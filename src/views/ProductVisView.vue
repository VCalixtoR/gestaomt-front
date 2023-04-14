<template>

  <div class="pageContent" v-if="this.createdDone">

    <div class="filter">
      
      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Filtrar
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
          />

          <LabelC for="endQuantityInput"
            labelText="até"
            class="priceQuantityLabel"
          />
          <InputC id="endQuantityInput"
            ref="endQuantityInput"
            class="endQuantityInput priceQuantityInput"
            type='text'
            name="endquantity"
            mask="####"
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
          />

          <LabelC for="endPriceInput"
            labelText="até"
            class="priceQuantityLabel"
          />
          <InputC id="endPriceInput"
            ref="endPriceInput"
            class="endPriceInput priceQuantityInput"
            type='text'
            name="endprice"
            :mask="[ 'R$ #,##', 'R$ ##,##', 'R$ ###,##', 'R$ ####,##', 'R$ #####,##' ]"
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
      productIds: [],
      tableProducts: {
        'titles': [ 'Código', 'Nome', 'Tipos', 'Coleções', 'Estoque', 'Preços', 'Editar' ],
        'colTypes': [ 'string', 'string', 'string-list', 'string-list', 'string-list', 'string-list', 'edit' ],
        'colWidths': [ '10%', '20%', '17%', '17%', '20%', '10%', '6%' ],
        'content': []
      },

      typeSelectItems: [],
      colorSelectItems: [],
      collectionSelectItems: [],
      otherSelectItems: [],
      sizeSelectItems: [],

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

      createdDone: false
    }
  },

  async created() {
    this.$root.setPageLoggedName('Visualizar e Alterar Produtos');

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

    await this.loadProducts(this.defLimit, 0);

    this.createdDone = true;
  },

  methods:{

    async loadProducts(limit, offset, code=null, name=null, colorId=null, otherId=null, sizeId=null, collectionId=null, typeId=null,  
      quantityStart=null, quantityEnd=null, priceStart=null, priceEnd=null){

      this.productIds = [];
      this.tableProducts['content'] = [];

      let vreturn = await this.$root.doRequest(
        Requests.getProducts,
        [ limit, offset, code, name, colorId, otherId, sizeId, collectionId, typeId, quantityStart, quantityEnd, priceStart, priceEnd ]
      );

      if(vreturn && vreturn['ok'] && vreturn['response'] && vreturn['response']['products']){

        vreturn['response']['products'].forEach(product => {

          this.productIds.push(product['product_id']);

          // splits before to avoid splitting in map several times
          let productSizeNames = product['product_size_names'].split(',');

          let productColorNames = product['product_color_names'] && product['product_color_names'].length > 0 ? 
            product['product_color_names'].split(',') : null;

          let productOtherNames = product['product_other_names'] && product['product_other_names'].length > 0 ? 
            product['product_other_names'].split(',') : null;

          let productQuantityes = product['customized_product_quantityes'].split(',');

          let productsResume = [];
          productSizeNames.forEach((size, i) => {
            productsResume.push(
              size + ' ' + 
              (productColorNames ? productColorNames[i] : '') + ' ' + 
              (productOtherNames ? productOtherNames[i] : '') + ' : ' + 
              productQuantityes[i]
            );
          })
          
          // inserts to table
          this.tableProducts['content'].push([
            product['product_code'],
            product['product_name'],
            product['product_type_names'] && product['product_type_names'].length > 0 ? product['product_type_names'].split(',') : ['---'],
            product['product_collection_names'] && product['product_collection_names'].length > 0 ? product['product_collection_names'].split(',') : ['---'],
            
            productsResume,

            product['customized_product_prices'] && product['customized_product_prices'].length > 0 ? 
              (product['customized_product_prices'].split(',')).map(x => Utils.getCurrencyFormat(x)) : ['---'],
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
      }
      else{
        this.$root.renderRequestErrorMsg(vreturn, []);
      }
    },

    async filter(){
      
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

      await this.loadProducts(this.defLimit, 0, code, name, colorId, otherId, sizeId, collectionId, typeId, 
        startQuantity, endQuantity, startPrice, endPrice);
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

      await this.loadProducts(this.defLimit, 0);
    },

    async previousProductPage(){

      await this.loadProducts(
        this.defLimit,
        (this.actualProductsPage-2)*10,
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
      //this.$root.renderView('alterarproduto', { 'product_id' : this.productIds[rowNumber] });
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
  .priceQuantityLabel{
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
  .ilabel{
    margin: 5px 0px;
    display: block;
  }
  .filterButton, .clearFilterButton{
    display: block;
    margin: auto;
    width: 80%;
    margin-top: 10px;
  }
}

</style>