<template>

  <div class="pageContent">

    <div class="pageSection">
      
      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Title 1
      </TextC>

      <div class="pageSectionRow">

        some text
         
      </div>
    
    </div>

    <div class="pageSection">
      
      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Title 2
      </TextC>

      <div class="pageSectionRow">

      </div>
    
    </div>

    <div class="pageSection">
      
      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Title 3
      </TextC>

      <div class="pageSectionRow">

        <!--TablePink
          class="tableEvents"
          :tableData="this.tableEvents"
          :showPrevNextButtons="true"
          :actualPage="this.actualEventPage"
          :maxPages="this.maxEventPages"
          @previousClick="this.previousEventPage()"
          @nextClick="this.nextEventPage()"
        /-->
        
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
import Requests from '../js/requests.js'
import TablePink from '../components/TablePink.vue'
import TextC from '../components/TextC.vue'

export default {
  
  name: 'TemplateView',

  props: {
  },

  components: {
    ButtonC,
    TablePink,
    TextC
  },

  data() {
    return {
      /*
      selectItems: [
        { label: '_', value: '' },
        { label: '_', value: '' }
      ],
      tableItems: {
        'titles': [ 'Ação', 'Usuário', 'Data e hora', 'Descrição' ],
        'colTypes': [ 'string', 'string', 'string', 'string' ],
        'colWidths': [ '20%', '18%', '22%', '40%' ],
        'content': []
      },
      id: null
      */
    }
  },

  async created() {
    this.$root.setPageLoggedName('');

    await this.loadPageContent();
  },

  methods:{

    async loadPageContent(){

      /*
      this.tableItems['content'] = [];

      let vreturn = await this.$root.doRequest(
        Requests.get...,
        [ args... ]
      );
      if(vreturn && vreturn['ok'] && vreturn['response'] && vreturn['response']['']){

        // event names
        vreturn['response'][''].forEach(some => {
          ...;
        });

      }
      else{
        this.$root.renderRequestErrorMsg(vreturn, []);
      }
      */
    },
    async save(){

      console.log('save');
      
      /*
      let nameV = this.$refs.cname.getV();
      let birthV = this.$refs.cbirth.getV();
      
      if(nameV.length < 10 || nameV.split(' ').length < 2 || nameV.length > 50){
        this.$root.renderMsg('warn', 'Nome inválido!', 'Necessário de 10 a 50 caracteres com um sobrenome no mínimo.');
        return;
      }

      var curDate = new Date();
      var minDateMs = new Date().setFullYear( curDate.getFullYear() - 80 );
      var maxDateMs = new Date().setFullYear( curDate.getFullYear() - 18 );
      var birthVMs = new Date(birthV).getTime();

      if(minDateMs > birthVMs || birthVMs > maxDateMs){
        this.$root.renderMsg('warn', 'Data de Nascimento inválida!',
          'A data deve estar no formato dd/mm/aaaa e estar no intervalo de 18 a 80 anos anteriores.');
        return;
      }

      if(!cmail.match(/.+@.+/) || !/^\S*$/.test(cmail)){
        this.$root.renderMsg('warn', 'Email inválido!', 'O email deve conter @ e não conter espaços.');
        return;
      }

      let vreturn = await this.$root.doRequest(
        Requests.createUser,
        [nameV, ...],
        false
      );

      if(vreturn && vreturn['ok']){
        let self = this;
        this.$root.renderMsg('ok', 'Sucesso!', 'Para acessar o sistema um administrador deve aprovar seu cadastro.', function () { self.$root.renderView('login'); });
      }
      else{
        this.$root.renderRequestErrorMsg(vreturn, ['Cpf já utilizado!', 'Email já utilizado!']);
      }
      */
    },
    cleanFields(){

      console.log('clean');

      /*
      this.$refs.faction.setV('');
      this.$refs.fuser.setV('');
      this.$refs.fstarttime.setV('');
      this.$refs.fendtime.setV('');
      

      this.userId = null;
      this.actionId = null;
      this.startDateTime = null;
      this.endDateTime = null;
      */

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
.pageSection, .pageSectionRow{
  padding: 10px;
}
@media (max-width: 1200px) {
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