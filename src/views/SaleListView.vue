<template>

  <div class="pageContent" v-if="this.mountedDone">

    <div class="filterSection">
      
      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Filtrar
      </TextC>
      <TextC colorClass="pink" fontSize='var(--text-warn)' fontWeight="bold" v-if="this.filtered">
        Atenção: Filtros aplicados
      </TextC>

      <div class="filterRow">
        <div class="row1Left">
          <LabelC for="saleIdInput"
            labelText="Código"
            class="plabel"
          />
          <InputC id="saleIdInput"
            ref="saleIdInput"
            class="pinput saleIdInput"
            type="text"
            name="salecode"
            value="VENDA-"
            :mask="[ 'VENDA-####' ]"
            :initialValue="this.initialSaleId"
          />
        </div>

        <div class="row1Right">
          <LabelC for="creationDateTimeStartInput"
            labelText="Data de geração: De"
            class="plabel"
          />
          <InputC id="creationDateTimeStartInput"
            ref="creationDateTimeStartInput"
            class="pinput creationDateTimeStartInput"
            type="datetime-local"
            name="creationStart"
            :initialValue="this.initialCreationStart"
          />

          <LabelC for="creationDateTimeEndInput"
            labelText="até"
            class="plabel"
          />
          <InputC id="creationDateTimeEndInput"
            ref="creationDateTimeEndInput"
            class="pinput creationDateTimeEndInput"
            type="datetime-local"
            name="creationEnd"
            :initialValue="this.initialCreationEnd"
          />
        </div>
      </div>

      <div class="filterRow">
        <div class="row2Left">
          <LabelC for="cliNameSelect"
            labelText="Nome do cliente"
            class="plabel"
          />
          <SelectWithFilter
            id="cliNameSelect" 
            ref="cliNameSelect"
            class="pselect cliNameSelect"
            colorClass="pink3"
            name="cliname"
            :items="this.cliNameSelectItems"
            :initialOptLabel="initialCliName"
          />
        </div>
        <div class="row2Right">
          <LabelC for="startTotalPriceInput"
            labelText="Valor final: De"
            class="plabel"
          />
          <InputC id="startTotalPriceInput"
            ref="startTotalPriceInput"
            class="pinput startTotalPriceInput"
            type="text"
            name="starttotalprice"
            :mask="[ 'R$ #,##', 'R$ ##,##', 'R$ ###,##', 'R$ ####,##', 'R$ #####,##' ]"
            :initialValue="this.initialTotalValueStart"
          />

          <LabelC for="endTotalPriceInput"
            labelText="até"
            class="plabel endTotalPriceInput"
          />
          <InputC id="endTotalPriceInput"
            ref="endTotalPriceInput"
            class="pinput endTotalPriceInput"
            type="text"
            name="endtotalprice"
            :mask="[ 'R$ #,##', 'R$ ##,##', 'R$ ###,##', 'R$ ####,##', 'R$ #####,##' ]"
            :initialValue="this.initialTotalValueEnd"
          />
        </div>
      </div>

      <div class="filterRow">
        <div class="row3Left">
          <LabelC for="orderBySelect"
            labelText="Ordenar por:"
            class="plabel"
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

    <div class="tableSaleRow">

      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Tabela de Vendas
      </TextC>
      
      <div class="tableSalesWrapper">
        <TablePink
          class="tableSales"
          :tableData="this.tableSalesData"
          :showPrevNextButtons="true"
          :actualPage="this.actualPage"
          :maxPages="this.maxPages"
          @previousClick="this.previousSalePage()"
          @nextClick="this.nextSalePage()"
          @optClicked="(itemValue, indexCR, indexC) => this.changeSaleStatus(itemValue, indexCR)"
          @visualize="(rowN, colN) => this.visualizeSale(rowN)"
          @pdf="(rowN, colN) => this.generatePDF(rowN)"
        />
      </div>

    </div>

    <div class="tableSummaryRow">

      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Resumo de vendas
      </TextC>

      <div class="tableSummaryWrapper">
        <TablePink
          class="tableSummary"
          :tableData="this.tableSummaryData"
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
import SelectWithFilter from '../components/SelectWithFilter.vue'
import TablePink from '../components/TablePink.vue'
import TextC from '../components/TextC.vue'
import Utils from '../js/utils'

export default {
  
  name: 'SaleListView',

  components: {
    ButtonC,
    InputC,
    LabelC,
    SelectC,
    SelectWithFilter,
    TablePink,
    TextC
  },

  data() {
    return {
      cliNameSelectItems: [],
      tableSalesData: {
        'titles': [ 'Código', 'Nome do cliente', 'Forma de pagamento', 'Data e hora de geração', 'Valor final', 'Mudar Status', 'Visualizar', 'Gerar pdf' ],
        'colTypes': [ 'string', 'string', 'string', 'string', 'string', 'select', 'visualize', 'pdf' ],
        'colWidths': [ '10%', '22%', '18%', '18%', '10%', '10%', '6%', '6%' ],
        'content': []
      },
      tableSummaryData: {
        'single-title': 'Alterações em lote',
        'titles': [ 'Crédito', 'Débito', 'Cheque', 'Dinheiro', 'Pix', 'Total de vendas', 'Valor total' ],
        'colTypes': [ 'string', 'string', 'string', 'string', 'string', 'string', 'string' ],
        'colWidths': [ '15%', '14%', '14%', '14%', '14%', '14%', '15%' ],
        'content': []
      },
      orderBySelectI: [
        { label: 'Código' , value: 'sale_id' },
        { label: 'Data e Hora de Geração' , value: 'sale_creation_date_time' },
        { label: 'Forma de Pagamento' , value: 'payment_method_name' },
        { label: 'Nome do Cliente' , value: 'sale_client_name' },
        { label: 'Status' , value: 'sale_status' },
        { label: 'Valor Final' , value: 'sale_total_value' },
      ],
      orderByAscSelectI: [
        { label: '▲' , value: 1 },
        { label: '▼' , value: 0 }
      ],

      initialSaleId: null,
      initialCreationStart: null,
      initialCreationEnd: null,
      initialCliName: null,
      initialSaleStatus: null,
      initialTotalValueStart: null,
      initialTotalValueEnd: null,
      initialOrderBy: null,
      initialOrderByAsc: null,
      
      actualPage: 1,
      maxPages: 1,
      defLimit: 10,
      saleId: null,
      clientName: null,
      creationDateTimeStart: null,
      creationDateTimeEnd: null,
      saleStatus: null,
      totalValueStart: null,
      totalValueEnd: null,
      orderBy: 'sale_creation_date_time',
      orderByAsc: 0,

      salesIds: [],
      filtered: false,
      mountedDone: false
    }
  },

  created() {
    this.$root.setPageLoggedName('Visualizar Vendas');
  },
  async mounted() {
    // clients names
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

    let params = this.loadSessionParams();
    if(params == null){
      await this.loadSales(this.defLimit, 0, 'sale_creation_date_time', 0);
    }
    else{
      // set initial element values before async rendering
      this.defLimit = params['defLimit'];
      this.actualPage = params['actualPage'];
      this.initialSaleId = `VENDA-${params['saleId'] ? String(params['saleId']) : ''}`;
      this.initialCliName = params['clientName'];
      this.initialCreationStart = params['creationDateTimeStart'];
      this.initialCreationEnd = params['creationDateTimeEnd'];
      this.initialSaleStatus = params['saleStatus'];
      this.initialTotalValueStart = params['totalValueStart'] ? Utils.getCurrencyFormat(params['totalValueStart']) : null;
      this.initialTotalValueEnd = params['totalValueEnd'] ? Utils.getCurrencyFormat(params['totalValueEnd']) : null;
      this.initialOrderBy = params['orderBy'];
      this.initialOrderByAsc = params['orderByAsc'];

      // load sales
      await this.loadSales( 
        params['defLimit'],
        params['actualPage']*10,
        params['orderBy'],
        params['orderByAsc'],
        params['saleId'],
        params['clientName'],
        params['creationDateTimeStart'],
        params['creationDateTimeEnd'],
        params['saleStatus'],
        params['totalValueStart'],
        params['totalValueEnd']
      );
    }
    this.mountedDone = true;
  },

  methods:{

    async loadSales(limit, offset,  orderBy, orderByAsc, saleId=null, clientName=null, creationDateTimeStart=null, creationDateTimeEnd=null, saleStatus=null, totalValueStart=null, totalValueEnd=null){

      this.clientIds = [];
      this.tableSalesData['content'] = [];
      
      let vreturn = await this.$root.doRequest(
        Requests.getSales,
        [ limit, offset, orderBy, orderByAsc, saleId, clientName, creationDateTimeStart, creationDateTimeEnd, saleStatus, totalValueStart, totalValueEnd ]
      );

      if(vreturn && vreturn['ok'] && vreturn['response'] && vreturn['response']['sales']){
        this.salesIds = [];

        vreturn['response']['sales'].forEach(sale => {
          this.salesIds.push(sale['sale_id']);
          this.tableSalesData['content'].push([
            `VENDA-${sale['sale_id']}`,
            sale['sale_client_name'],
            `${sale['payment_method_name']} (${sale['payment_method_Installment_number']} x ${Utils.getCurrencyFormat(Number(sale['sale_total_value'])/Number(sale['payment_method_Installment_number']))})`,
            Utils.getDateTimeString(sale['sale_creation_date_time'], '/', ':', false),
            Utils.getCurrencyFormat(sale['sale_total_value']),
            {
              'disabled': sale['sale_status'] == 'Cancelado',
              'customFontColor': (sale['sale_status'] == 'Cancelado' ? 'fontred' : null),
              'initialOptValue': sale['sale_status'],
              'items': [
                { label: 'Confirmado', value: 'Confirmado' },
                { label: 'Cancelado', value: 'Cancelado', color: 'red' }
              ]
            },
            { 'showVisualize': true },
            { 'showPdf': true }]);
        });
        this.tableSummaryData['content'].push([
          vreturn['response']['summary']['credito'],
          vreturn['response']['summary']['debito'],
          vreturn['response']['summary']['cheque'],
          vreturn['response']['summary']['dinheiro'],
          vreturn['response']['summary']['pix'],
          vreturn['response']['summary']['counts'],
          Utils.getCurrencyFormat(vreturn['response']['summary']['total_value'])
        ]);

        this.actualPage = Math.ceil((offset+1)/this.defLimit);
        this.maxPages = Math.max(Math.ceil(vreturn['response']['count']/this.defLimit), 1);
        this.saleId = saleId;
        this.clientName = clientName;
        this.creationDateTimeStart = creationDateTimeStart;
        this.creationDateTimeEnd = creationDateTimeEnd;
        this.saleStatus = saleStatus;
        this.totalValueStart = totalValueStart;
        this.totalValueEnd = totalValueEnd;
        this.orderBy = orderBy;
        this.orderByAsc = orderByAsc;

        // checks if it was filtered
        if(this.saleId ||
          this.clientName ||
          this.creationDateTimeStart ||
          this.creationDateTimeEnd ||
          this.saleStatus ||
          this.totalValueStart ||
          this.totalValueEnd ||
          this.orderBy != 'sale_creation_date_time' ||
          this.orderByAsc != 0
        ){
          this.filtered = true;
        }
        else{
          this.filtered = false;
        }

        this.setSessionParams();
      }
      else{
        this.$root.renderRequestErrorMsg(vreturn, ['Data e hora de início inválida', 'Data e hora de fim inválida']);
      }
    },

    async filter(){
      
      let saleId = this.$refs.saleIdInput.getV();
      let clientName = this.$refs.cliNameSelect.getL();
      let creationDateTimeStart = this.$refs.creationDateTimeStartInput.getV();
      let creationDateTimeEnd = this.$refs.creationDateTimeEndInput.getV();
      let totalValueStart = Utils.getNumberFormatFromCurrency(this.$refs.startTotalPriceInput.getV());
      let totalValueEnd = Utils.getNumberFormatFromCurrency(this.$refs.endTotalPriceInput.getV());
      let orderBy = this.$refs.orderBySelect.getV();
      let orderByAsc = this.$refs.orderByAscSelect.getV();

      saleId = saleId.replace('VENDA-', '');
      totalValueStart = totalValueStart ? totalValueStart : null;
      totalValueEnd = totalValueEnd ? totalValueEnd : null;

      await this.loadSales(this.defLimit, 0, orderBy, orderByAsc, saleId, clientName, creationDateTimeStart, creationDateTimeEnd, null, totalValueStart, totalValueEnd);
    },

    async cleanFilter(){

      this.$refs.saleIdInput.setV('VENDA-');
      this.$refs.cliNameSelect.setV('');
      this.$refs.creationDateTimeStartInput.setV('');
      this.$refs.creationDateTimeEndInput.setV('');
      this.$refs.startTotalPriceInput.setV('');
      this.$refs.endTotalPriceInput.setV('');
      this.$refs.orderBySelect.setV('sale_creation_date_time');
      this.$refs.orderByAscSelect.setV(0);

      await this.loadSales(this.defLimit, 0, 'sale_creation_date_time', 0);
    },

    async previousSalePage(){

      await this.loadSales( 
        this.defLimit,
        (this.actualPage-2)*10,
        this.orderBy,
        this.orderByAsc,
        this.saleId,
        this.clientName,
        this.creationDateTimeStart,
        this.creationDateTimeEnd,
        this.saleStatus,
        this.totalValueStart,
        this.totalValueEnd)
    },

    async nextSalePage(){

      await this.loadSales( 
        this.defLimit, 
        this.actualPage*10,
        this.orderBy,
        this.orderByAsc,
        this.saleId,
        this.clientName,
        this.creationDateTimeStart,
        this.creationDateTimeEnd,
        this.saleStatus,
        this.totalValueStart,
        this.totalValueEnd
      );
    },

    async changeSaleStatus(statusValue, salePos){
      
      if(statusValue != 'Cancelado'){
        return;
      }

      let vreturn = await this.$root.doRequest(Requests.cancelSale, [this.salesIds[salePos]]);

      if(!vreturn || !vreturn['ok']){
        this.$root.renderRequestErrorMsg(vreturn, ['A venda já está cancelada']);
      }
      else{
        await this.loadSales( 
          this.defLimit,
          (this.actualPage-1)*10,
          this.orderBy,
          this.orderByAsc,
          this.saleId,
          this.clientName,
          this.creationDateTimeStart,
          this.creationDateTimeEnd,
          this.saleStatus,
          this.totalValueStart,
          this.totalValueEnd
        );
        this.$root.renderMsg('ok', 'Venda cancelada!', '');
      }
    },

    visualizeSale(salePos){
      this.$root.renderView('vervenda', { 'sale_id' : this.salesIds[salePos] });
    },

    generatePDF(salePos){
      this.$root.renderMsg('warn', 'Recurso em desenvolvimento!', '');
      //console.log('generate pdf ' + this.salesIds[salePos]);
    },

    loadSessionParams(){
      let params = ClientStorage.getSessionItem('saleListParams');
      if(params != null){
        return JSON.parse(params);
      }
      return null;
    },
    setSessionParams(){
      let params = {
        'defLimit': this.defLimit,
        'actualPage': this.actualPage-1,
        'saleId': this.saleId,
        'clientName': this.clientName,
        'creationDateTimeStart': this.creationDateTimeStart,
        'creationDateTimeEnd': this.creationDateTimeEnd,
        'saleStatus': this.saleStatus,
        'totalValueStart': this.totalValueStart,
        'totalValueEnd': this.totalValueEnd,
        'orderBy': this.orderBy,
        'orderByAsc': this.orderByAsc
      };
      ClientStorage.setSessionItem('saleListParams', JSON.stringify(params));
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
.filterRow{
  margin: 10px 20px;
}
.plabel{
  margin: 0px 5px;
}
.tableSaleRow, .tableSummaryRow{
  margin-top: 20px;
}
.tableSalesWrapper, .tableSummaryWrapper{
  margin-top: 20px;
}
.buttonsWrapper{
  text-align: left;
  margin-left: 20px;
}
@media (min-width: 1201px) {
  .row1Left, .row2Left, .row1Right, .row2Right{
    display: inline-block;
    margin: 0px;
  }
  .row1Left, .row2Left, .row3Left{
    text-align: left;
  }
  .row1Right, .row2Right{
    text-align: right;
  }
  .row1Left{
    width: 190px;
  }
  .row1Right{
    width: calc(100% - 190px);
  }
  .row2Left, .row2Right{
    width: 50%;
  }
  .saleIdInput {
    width: 115px;
  }
  .creationDateTimeStartInput, .creationDateTimeEndInput{
    width: 205px;
  }
  .startTotalPriceInput, .endTotalPriceInput{
    width: 100px;
  }
  .orderBySelect{
    width: 260px;
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
  .tableSalesWrapper, .tableSummaryWrapper{
    text-align: center;
  }
}
@media (max-width: 1200px) {
  .plabel{
    margin: 5px 0px;
    display: block;
  }
  .pinput, .pselect{
    display: block;
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