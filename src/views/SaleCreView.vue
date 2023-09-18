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
            @optClicked="() => this.updateProductQuantityPrice()"
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
            @optClicked="() => this.updateProductQuantityPrice()"
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
            @optClicked="() => this.updateProductQuantityPrice()"
          />
        </div>
      </div>

      <div class="pageSectionRow">
        <div class="row4Left">
          <LabelC for="quantityInput"
            labelText="Quantidade"
            class="plabel leftLabel"
            useRequiredChar
          />
          <InputC
            id="quantityInput"
            ref="quantityInput"
            class="pinput quantityInput"
            name="quantity"
            type="number"
            min="1"
            colorClass="pink3"
            :disabled="this.quantityDisabled"
          />
        </div>

        <div class="row4Center">
          <LabelC for="priceInput"
            labelText="Preço"
            class="plabel"
            useRequiredChar
          />
          <InputC id="priceInput"
            ref="priceInput"
            class="pinput priceInput"
            type='text'
            name="price"
            :disabled="this.quantityDisabled"
            :mask="[ 'R$ #,##', 'R$ ##,##', 'R$ ###,##', 'R$ ####,##', 'R$ #####,##' ]"
          />
        </div>

        <div class="row4Right">
          <ButtonC id="addProductButton"
            colorClass="pink3"
            class="btnP"
            label="Adicionar"
            width="60%"
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
              @optClicked="(optValue, rowN, colN) => this.updateSaleTable(optValue, rowN, colN)"
              @tableInputChange="(inputValue, rowN, colN) => this.updateSaleTable(inputValue, rowN, colN)"
            />
          </div>
          
        </div>
      </div>

      <div class="pageSaleSection" v-show="this.tableProductsData['content'].length > 0">
        
        <TextC colorClass="black1" fontSize='var(--text-title)'>
          Formas de Pagamento
        </TextC>

        <div class="pageSectionRow">

          <div class="tableSalePaymentsWrapper">
            <TablePink :key="salePaymentsKeyToReRender"
              ref="tableSalePayments"
              class="tableSalePayments"
              :tableData="this.tableSalePaymentsData"
              @optClicked="(optValue, rowN, colN) => this.updateSalePaymentsTable(optValue, rowN, colN)"
              @tableInputChange="(inputValue, rowN, colN) => this.updateSalePaymentsTable(inputValue, rowN, colN)"
              @reject="(rowN, colN) => this.cleanSalePaymentsR(rowN)"
            />
          </div>

          <div class="btnplusWrapper">
            <ButtonPlusC
              id='btnPlusSalePayments'
              @click="this.addSalePayment()"
            />
          </div>
        
        </div>
      </div>
    </div>

    <div class="buttonsWrapper">
      <div class="buttonCreateSaleWrapper">
        <ButtonC colorClass="pink3"
          id="createSaleButton"
          class="btnP"
          label="Salvar"
          width="100%"
          padding="3px 0px"
          @click="this.createSale()"
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
import Utils from '../js/utils'

export default {
  
  name: 'SaleCreView',

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

      tableProductsData: {
        'titles': [ 'Código', 'Nome', 'Tamanho', 'Cor', 'Outros', 'Valor', 'Quantidade', 'Remover' ],
        'colTypes': [ 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'acceptReject' ],
        'colWidths': [ '10%', '30%', '10%', '10%', '10%', '10%', '10%', '10%' ],
        'content': []
      },
      tableSaleData: {
        'titles': [ 'Código', 'Percentual de desconto', 'Valor de desconto', 'Valor total', 'Valor total com desconto' ],
        'colTypes': [ 'string', 'input', 'input', 'string', 'string' ],
        'colWidths': [ '10%', '15%', '15%', '30%', '30%'],
        'content': [[
          '---',
          { 'type': 'text', 'mask': ['#%', '##%'], value: '0%' },
          { 'type': 'text', 'mask': [ 'R$ #,##', 'R$ ##,##', 'R$ ###,##', 'R$ ####,##' ], value: 'R$ ' },
          'R$ 00,0',
          'R$ 00,0'
        ]]
      },
      tableSalePaymentsData: {
        'titles': [ 'Valor', 'Forma de pagamento', 'Parcelas', 'Remover'],
        'colTypes': [ 'input', 'select', 'select', 'acceptReject' ],
        'colWidths': [ '20%', '30%', '35%', '15%' ],
        'content': []
      },

      sizeSelectKeyToReRender: 3000,
      colorSelectKeyToReRender: 4000,
      othersSelectKeyToReRender: 5000,
      productkeyToReRender: 6000,
      saleKeyToReRender: 7000,
      salePaymentsKeyToReRender: 8000,

      loadedProdInfo: null,
      loadedSaleInfo: null,
      saleCustomizedProducts: {},
      actualCustomizedProducts: null,
      quantityDisabled: true,
      stopNextCol1Update: false,
      stopNextCol2Update: false
    }
  },

  async created() {
    this.$root.setPageLoggedName('Geração de Vendas');
    await this.loadPageInfo();
    if(this.$root.pageParams && this.$root.pageParams['sale_id']){
      await this.reutilizeSale(this.$root.pageParams['sale_id']);
    }
  },

  methods:{

    // loads clients products and sale infos
    async loadPageInfo(){

      // clients
      let vreturn = await this.$root.doRequest(
        Requests.getClients,
        [ true, null, null, null, null, null, null, null, null, null, null ]
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

      // sale
      vreturn = await this.$root.doRequest( Requests.getSaleInfo, [] );

      if(vreturn && vreturn['ok'] && vreturn['response']){
        this.loadedSaleInfo = vreturn['response'];

        // set paymentMethods without duplicants in list
        this.paymentMethods = [];
        this.loadedSaleInfo['payment_methods'].forEach((payment) => {
          if(!this.paymentMethods.find(x => x['label'] == payment['payment_method_name'])){
            this.paymentMethods.push({'label': payment['payment_method_name'], 'value': payment['payment_method_id']});
          }
        });
      }
      else{
        this.$root.renderRequestErrorMsg(vreturn, []);
        this.$root.renderView('home');
      }
      //this.loadSaleTablePaymentMethods();
      this.updateSaleTable();
    },

    // reutilize sale
    async reutilizeSale(saleId){
      console.log(saleId);
    },

    // on client name selected updates its cpf
    updateCpf(clientId){
      this.$refs['cliCpfInput'].setV(this.cliNameSelectItems.find(x => x['value'] == clientId)['cpf']);
    },
    // on product name or code selected updates each and its personalization
    async updateProduct(productId){
      this.$refs['nameSelect'].setV(productId);
      this.$refs['codeSelect'].setV(productId);
      await this.updateProductPersonalization(this.$refs['codeSelect'].getL());
      this.updateProductQuantityPrice();
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
        this.saleCustomizedProducts[vreturn['response']['product_code']] = vreturn['response'];

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
      this.resetProductQuantityPrice();
    },
    // update quantity and price fields
    updateProductQuantityPrice(){
      let sizeLabel = this.$refs['sizeSelect'].getL();
      let colorLabel = this.$refs['colorSelect'].getL();
      let otherLabel = this.$refs['othersSelect'].getL();
      this.quantityDisabled = true;

      // checks size
      if(this.sizeSelectItems && this.sizeSelectItems.length > 0 && (sizeLabel == null || sizeLabel == undefined)){
        this.$refs['quantityInput'].setPlaceholder('Campo tamanho vazio');
      }
      // checks color
      else if(this.colorSelectItems && this.colorSelectItems.length > 0 && (colorLabel == null || colorLabel == undefined)){
        this.$refs['quantityInput'].setPlaceholder('Campo cor vazio', 'value');
      }
      // checks other
      else if(this.othersSelectItems && this.othersSelectItems.length > 0 && (otherLabel == null || otherLabel == undefined)){
        this.$refs['quantityInput'].setPlaceholder('Campo outro vazio', 'value');
      }
      // set quantity and price searching in actualCustomizedProducts
      else{
        let foundCP = false;
        for(let i = 0; i < this.actualCustomizedProducts.length; i++){
          if(this.actualCustomizedProducts[i]['product_size_name'] == sizeLabel && 
            this.actualCustomizedProducts[i]['product_color_name'] == colorLabel && 
            this.actualCustomizedProducts[i]['product_other_name'] == otherLabel){
            
            foundCP = true;
            let actualQuantity = this.actualCustomizedProducts[i]['product_quantity'];

            // quantity
            this.$refs['quantityInput'].setPlaceholder( `${actualQuantity == 0 ? 'Nenhuma' : actualQuantity} ${actualQuantity <= 1 ? 'peça' : 'peças'} em estoque`);
            this.quantityDisabled = false;
            
            // price
            this.$refs['priceInput'].setV(Utils.getCurrencyFormat(this.actualCustomizedProducts[i]['product_price']));
          }
        }
        if(!foundCP){
          this.$refs['quantityInput'].setPlaceholder('Variação não encontrada');
        }
      }
    },
    resetProductQuantityPrice(){
      this.$refs['quantityInput'].setPlaceholder('');
      this.$refs['quantityInput'].setV('');
      this.quantityDisabled = true;
      this.$refs['priceInput'].setV('');
    },
    addProduct(){
      let nameObj = this.$refs['nameSelect'].getObj();
      let codeObj = this.$refs['codeSelect'].getObj();
      let sizeObj = this.$refs['sizeSelect'].getObj();
      let colorObj = this.$refs['colorSelect'].getObj();
      let otherObj = this.$refs['othersSelect'].getObj();
      let quantity = this.$refs['quantityInput'].getV();
      let price = this.$refs['priceInput'].getV();

      if(quantity == null || isNaN(quantity) || quantity <= 0){
        this.$root.renderMsg('warn', 'Quantidade inválida!', 'Quantidade deve ser um número maior que 0');
        return;
      }
      if(!price || Utils.getNumberFormatFromCurrency(price) <= 0){
        this.$root.renderMsg('warn', 'Preço inválido!', 'Preço deve ser maior que 0');
        return;
      }

      this.addProductToTable(
        nameObj['label'], codeObj['label'], sizeObj['label'], (colorObj ? colorObj['label'] : ''), 
        (otherObj ? otherObj['label'] : ''), quantity, price);
    },
    addProductToTable(name, code, size, color, other, quantity, price){

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
          this.tableProductsData['content'][i][5] = price;
          this.tableProductsData['content'][i][6] = quantity;
          this.$root.renderMsg('warn', 'Variação adicionada duplicada!', 'Quantidade e preço foram substituídos pelos valores novos');
        }
      }

      // add and sort products if not has duplicants
      if(!foundDuplicate){
        this.tableProductsData['content'].push([
          code, name, size, color, other, price, quantity, { 'showAccept': false, 'showReject': true }
        ]);
        this.tableProductsData['content'].sort(function(x, y){
          if(x[0] != y[0]){ return x[0].localeCompare(y[0]); }
          if(x[2] != y[2]){ return x[2].localeCompare(y[2]); }
          if(x[3] != y[3]){ return x[3].localeCompare(y[3]); } 
          return x[4].localeCompare(y[4]);
        })
      }

      // rerender product table and updates sale table
      this.productkeyToReRender++;
      this.updateSaleTable();
    },
    removeProductFromTable(rowN){
      // remove item, rerender product table and updates sale table
      this.tableProductsData['content'].splice(rowN, 1);
      this.productkeyToReRender++;
      this.updateSaleTable();
    },
    updateSaleTable(changeValue = null, rowN = null, colN = null){

      // stops updates from percent and price to avoid loops
      if(this.stopNextCol1Update && colN == 1){
        this.stopNextCol1Update = false;
        return;
      }
      if(this.stopNextCol2Update && colN == 2){
        this.stopNextCol2Update = false;
        return;
      }

      let saleRow = this.tableSaleData['content'][0];
 
      // calculates total sale raw value
      let totalSaleRawValue = 0;
      let totalSaleValue = 0;
      for(let i = 0; i < this.tableProductsData['content'].length; i++){
        let content = this.tableProductsData['content'][i];
        totalSaleRawValue += Utils.getNumberFormatFromCurrency(content[5]) * Number(content[6]);
      }
      
      let discountPercentRow = this.$refs.tableSale.getV(0, 1);
      let discountValueRow = this.$refs.tableSale.getV(0, 2);
      // changes in discount or value select
      if(colN == 1 || colN == 2){

        // avoids 100 or more percentages
        if(colN == 1){
          discountPercentRow = Number(changeValue.replace('%','')) >= 100 ? '99%' : changeValue;
          discountValueRow = Utils.getCurrencyFormat(totalSaleRawValue > 0 ? (totalSaleRawValue*Number(discountPercentRow.replace('%','')))/100 : 0);
        }
        // avoid discounts equal to or greater than the raw sales value
        else{
          discountValueRow = Utils.getNumberFormatFromCurrency(changeValue) >= totalSaleRawValue ? Utils.getCurrencyFormat(totalSaleRawValue-1) : changeValue;
          discountPercentRow = totalSaleRawValue > 0 ? 
            String(Math.trunc((Utils.getNumberFormatFromCurrency(discountValueRow)*100)/totalSaleRawValue)) + '%' : 
            '0%';
        }

        this.stopNextCol1Update = true;
        this.stopNextCol2Update = true;
        saleRow[1] = { 'type': 'text', 'mask': ['#%', '##%'], value: discountPercentRow },
        saleRow[2] = { 
          'type': 'text', 
          'mask': [ 'R$ #,##', 'R$ ##,##', 'R$ ###,##', 'R$ ####,##' ], 
          value: discountValueRow
        }
      }
      saleRow[0] = `VENDA-${this.loadedSaleInfo['next_sale_id']}`;
      saleRow[3] = Utils.getCurrencyFormat(totalSaleRawValue);
      totalSaleValue = totalSaleRawValue - (discountValueRow ? Utils.getNumberFormatFromCurrency(discountValueRow) : 0);
      saleRow[4] = Utils.getCurrencyFormat(totalSaleValue);

      this.updateDefaultSingleSalePayment(Utils.getCurrencyFormat(totalSaleValue));
    },

    // sale payment handling
    updateDefaultSingleSalePayment(totalSaleValue){
      this.tableSalePaymentsData['content'] = [];
      this.tableSalePaymentsData['content'].push(this.getSalePayment(totalSaleValue));

      // forces component to rerender to resolve not updating issues
      this.salePaymentsKeyToReRender = this.salePaymentsKeyToReRender + 1;
    },
    updateSalePaymentsTable(fieldValue, rowN, colN){
      if(colN == 0 || colN == 1){
        
        let tableSalePaymentsV = this.$refs.tableSalePayments.getV();
        
        if(colN == 0){
          this.tableSalePaymentsData['content'][rowN] = this.getSalePayment(fieldValue, tableSalePaymentsV[rowN][1]);
        }
        else{
          let tableSalePaymentsV = this.$refs.tableSalePayments.getV();
      
          this.tableSalePaymentsData['content'] = [];
          tableSalePaymentsV.forEach((tableSalePaymentsV, rowIndex) => {
            if(rowIndex != rowN){
              this.tableSalePaymentsData['content'].push(this.getSalePayment(tableSalePaymentsV[0], tableSalePaymentsV[1], tableSalePaymentsV[2]));
            }
            else{
              this.tableSalePaymentsData['content'].push(this.getSalePayment(tableSalePaymentsV[0], fieldValue));
            }
          });
          
          // forces component to rerender to resolve not updating issues
          this.salePaymentsKeyToReRender = this.salePaymentsKeyToReRender + 1;
        }
      }
    },
    getSalePayment(inputValue = null, paymentMethodId = null, paymentMethodInstallmentId = null){

      let selectedValue = inputValue ? inputValue : 'R$ 0,00';
      let selectedPaymentMethodId = paymentMethodId ? paymentMethodId : 1;
      let selectedPaymentMethodInstallmentId = paymentMethodInstallmentId ? paymentMethodInstallmentId : 1
      let paymentMethodInstallments = [];
      
      this.loadedSaleInfo['payment_methods'].forEach(payment => {
        if(payment['payment_method_id'] == selectedPaymentMethodId){
          let singleInstallmentValue = Utils.getNumberFormatFromCurrency(selectedValue) / Number(payment['payment_method_installment_number']);
          paymentMethodInstallments.push({
            'label': `${payment['payment_method_installment_number']} x ${Utils.getCurrencyFormat(singleInstallmentValue)}`,
            'value': payment['payment_method_installment_id']
          });
        }
      });

      return [
        { 'type': 'text', 'mask': [ 'R$ #,##', 'R$ ##,##', 'R$ ###,##', 'R$ ####,##' ], value: selectedValue },
        { 'initialOptValue': selectedPaymentMethodId, 'items': this.paymentMethods },
        { 'initialOptValue': selectedPaymentMethodInstallmentId, 'items': paymentMethodInstallments },
        { 'showAccept': false, 'showReject': true }
      ];
    },
    addSalePayment(){
      if(this.tableSalePaymentsData['content'].length == 0){
        this.tableSalePaymentsData['content'].push(this.getSalePayment());
      }
      // the value needs to be set to avoid rendering problems with the value
      else{
        
        let tableSalePaymentsV = this.$refs.tableSalePayments.getV();

        this.tableSalePaymentsData['content'] = [];
        tableSalePaymentsV.forEach(tableSalePaymentsV => {
          this.tableSalePaymentsData['content'].push(
            this.getSalePayment(tableSalePaymentsV[0], tableSalePaymentsV[1], tableSalePaymentsV[2])
          );
        });
        this.tableSalePaymentsData['content'].push(this.getSalePayment());
      }
    },
    cleanSalePaymentsR(row){

      let tableSalePaymentsV = this.$refs.tableSalePayments.getV();
      
      this.tableSalePaymentsData['content'] = [];
      tableSalePaymentsV.forEach((tableSalePaymentsV, rowIndex) => {
        if(rowIndex != row){
          this.tableSalePaymentsData['content'].push(this.getSalePayment(tableSalePaymentsV[0], tableSalePaymentsV[1], tableSalePaymentsV[2]));
        }
      });
      
      // forces component to rerender to resolve not updating issues
      this.salePaymentsKeyToReRender = this.salePaymentsKeyToReRender + 1;
    },

    async createSale(){
      
      let saleRow = this.tableSaleData['content'][0];
      let productsData = this.tableProductsData['content'];
      let clientId = this.$refs.cliNameSelect.getV();
      let employeeId = this.$root.userLoggedData['id'];
      let discountPercentage = this.$refs.tableSale.getV(0, 1) ? (Number(this.$refs.tableSale.getV(0, 1).replace('%',''))/100) : null;
      let totalDiscountValue = Utils.getNumberFormatFromCurrency(this.$refs.tableSale.getV(0, 4));

      if(!this.$refs.tableSalePayments || !this.$refs.tableSalePayments.getV() || this.$refs.tableSalePayments.getV().length == 0){
        this.$root.renderMsg('warn', 'Forma de pagamento inválida!', 'Certifique de estar preenchendo a forma de pagamento');
        return;
      }

      let paymentMethodInstallments = [];
      let totalPaymentMethodValue = 0;
      
      this.$refs.tableSalePayments.getV().forEach(payment => {
        paymentMethodInstallments.push({'id': payment[2], 'value': Utils.getNumberFormatFromCurrency(payment[0])});
        totalPaymentMethodValue += Utils.getNumberFormatFromCurrency(payment[0]);
      });
      if(totalPaymentMethodValue != totalDiscountValue){
        let diff = totalDiscountValue - totalPaymentMethodValue;
        this.$root.renderMsg(
          'warn', 
          'Forma de pagamento inválida!', 
          `Certifique de que o valor total com desconto seja exatamente igual a soma total das formas de pagamento. ` +
          `O total com desconto está com ${diff > 0 ? Utils.getCurrencyFormat(diff) + ' a mais que ' : Utils.getCurrencyFormat(diff*-1) + ' a menos que '}` + 
          `as formas de pagamento!`);
        return;
      }

      if(clientId == null || clientId == undefined){
        this.$root.renderMsg('warn', 'Cliente inválido!', 'É preciso selecionar o cliente');
        return;
      }
      if(employeeId == null || employeeId == undefined){
        this.$root.renderMsg('warn', 'Funcionário inválido!', 'Este erro não deveria ocorrer, contatar suporte técnico');
        return;
      }
      if(discountPercentage == null || discountPercentage == undefined){
        this.$root.renderMsg('warn', 'Percentual de disconto inválido!', 'Este erro não deveria ocorrer, contatar suporte técnico');
        return;
      }
      if(totalDiscountValue == 0 || productsData.length == 0){
        this.$root.renderMsg('warn', 'Valor da venda inválido!', 'Favor incluir pelo menos um produto e certificar que a venda não vale R$ 0,00');
        return;
      }

      let saleHasProducts = [];
      let saleProductsTmp = {};
      let missingProductMsgs = [];
      // get product data from saleCustomizedProducts by code as key and find personalized product
      productsData.forEach((productFromTable) => {

        let productData = this.saleCustomizedProducts[productFromTable[0]];
        let productId = productData['product_id'];
        for(let i = 0; i < productData['customized_products'].length; i++){
          let customProductData = productData['customized_products'][i];

          // find specific personalization
          if(
            productFromTable[2] == customProductData['product_size_name'] &&
            productFromTable[3] == (customProductData['product_color_name'] ? customProductData['product_color_name'] : '') &&
            productFromTable[4] == (customProductData['product_other_name'] ? customProductData['product_other_name'] : '')
          ){
            if(!saleProductsTmp[productId]){
              saleProductsTmp[productId] = {};
            }
            saleProductsTmp[productId][customProductData['customized_product_id']] = {
              'customized_product_id': customProductData['customized_product_id'],
              'customized_product_price': Utils.getNumberFormatFromCurrency(productFromTable[5]),
              'customized_product_sale_quantity': Number(productFromTable[6])
            }
            // check and creates messages if is missing products in stock
            if(Number(productFromTable[6]) > customProductData['product_quantity']){
              let missingQuantity = Number(productFromTable[6])-customProductData['product_quantity'];
              missingProductMsgs.push(
                '   ' + String(missingQuantity) + ' ' + String(productFromTable[1]) + 
                ', tamanho: ' + productFromTable[2] +
                (productFromTable[3] ? ', cor: ' + productFromTable[3] : '') +
                (productFromTable[4] ? ', outro: ' + productFromTable[4] : '')
              );
            }
          }
        }
      });

      // converts to api format
      Object.keys(saleProductsTmp).forEach((productId) => {

        let customizedProducts = [];
        Object.keys(saleProductsTmp[productId]).forEach((customProductId) => {
          customizedProducts.push(saleProductsTmp[productId][customProductId]);
        });

        saleHasProducts.push({
          'product_id': productId,
          'customized_products': customizedProducts
        });

      });

      let forceProductAddition = false;
      if(missingProductMsgs.length > 0){
        missingProductMsgs.unshift('Ao confirmar será efetuado a venda após ser adicionado estes produtos que estão faltando no estoque:');
        forceProductAddition = await this.$root.renderMsg('warn', 'Confirmar adição de produtos?', missingProductMsgs, null, function(){}, function(){}, true);
        if(!forceProductAddition){
          return;
        }
      }

      let vreturn = await this.$root.doRequest(
        Requests.createSale,
        [clientId, employeeId, paymentMethodInstallments, discountPercentage, totalDiscountValue, saleHasProducts, forceProductAddition]
      );

      if(vreturn && vreturn['ok']){
        let self = this;
        this.$root.renderMsg('ok', 'Sucesso!', (forceProductAddition ? 'Produtos adicionados e venda cadastrada.' : 'Venda cadastrada.'), function () { self.$router.go(); });
      }
      else{
        this.$root.renderRequestErrorMsg(vreturn, [
          'O cliente associado à venda não existe no sistema',
          'O funcionario associado à venda não existe no sistema',
          'O funcionario associado à venda não esta habilitado no sistema',
          'A forma de pagamento associado à venda está com formato inválido',
          'A forma de pagamento associado à venda não existe no sistema',
          'O desconto na venda não pode ser menor que 0',
          'O desconto na venda não pode ser maior ou igual a 100',
          'A venda deve possuir pelo menos um produto associado',
          'Um dos produtos associados foi enviado sem o product_id',
          'Um dos produtos associados não foi encontrado no sistema',
          'Um dos produtos associados está inativo',
          'Um dos produtos associados foi enviado sem produtos customizados',
          'Um dos produtos customizaveis associados foi enviado sem o campo customized_product_id',
          'Um dos produtos customizaveis associados foi enviado sem o campo customized_product_sale_quantity',
          'Um dos produtos associados possui quantidade de produtos a venda 0 ou menor',
          'Um dos produtos customizaveis associados não foi encontrado no sistema',
          'Um dos produtos customizaveis associados está inativo',
          'Um dos produtos customizaveis associados está com quantidade maior de vendas que o estoque disponível',
          'Preço esperado diferente do preço calculado no sistema'
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
      this.$refs.quantityInput.setV('');
      this.$refs.priceInput.setV('');
      
      this.tableProductsData['content'] = [];
      this.productkeyToReRender++;

      this.resetProductQuantityPrice();
      this.updateSaleTable();

      this.saleCustomizedProducts = {};
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
.btnplusWrapper{
  text-align: center;
  margin: 10px;
}
@media (min-width: 1201px) {
  .pageSectionRow{
    margin: 10px 20px;
  }
  .row1Left,  .row1Right, .row2Left, .row2Right, .row3Left, .row3Center, .row3Right, .row4Left, .row4Center, .row4Right{
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
  .row1Right, .row2Right, .row3Right, .row4Right{
    text-align: right;
  }
  .row1Right, .row2Right, .row3Right, .row4Right{
    width: 40%;
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
  .quantityInput{
    width: calc(90% - 115px);
  }
  .cliCpfInput, .codeSelect{
    width: 50%;
  }
  .sizeSelect{
    width: 40%;
  }
  .colorSelect, .othersSelect, .priceInput{
    width: 50%;
  }
  .tableProductsWrapper, .tableSaleWrapper{
    width: 98%;
  }
  .tableSalePaymentsWrapper, .btnplusWrapper{
    width: 60%;
  }
  .tableProducts, .tableSale{
    display: inline-block;
  }
  .buttonsWrapper{
    text-align: left;
    width: 100%;
  }
  .buttonCreateSaleWrapper, .buttonCleanWrapper{
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
  .tableProductsWrapper, .tableSaleWrapper, .tableSalePaymentsWrapper, .btnplusWrapper{
    width: 100%;
    text-align: center;
  }
  .buttonsWrapper{
    text-align: center;
    width: 100%;
  }
  .buttonCreateSaleWrapper, .buttonCleanWrapper{
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