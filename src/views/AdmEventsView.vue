<template>

  <div class="pageContent">

    <div class="eventFilters">
      
      <TextC colorClass="black1" fontSize='var(--text-title)' display="block">
        Filtros
      </TextC>

      <div class="eventFiltersBox">
        
        <div class="eventFiltersRow">

          <LabelC for="actionSelect"
            labelText="Ação"
          />
          <SelectC id="actionSelect"
            ref='actionSelect'
            class="actionSelect"
            colorClass="pink3"
            name="action"
            :items="this.actionItems"
          />

          <LabelC for="userSelect"
            labelText="Usuário"
          />
          <SelectC id="userSelect"
            ref='userSelect'
            class="userSelect"
            colorClass="pink3"
            name="user"
            :items="this.userItems"
          />

        </div>

        <div class="eventFiltersRow">
          
          <TextC colorClass="black2" display="block">
            Data e hora do evento:
          </TextC>

          <div class="eventDataFiltersBox">
            <LabelC for="startDatetimeInput"
              labelText="De"
              class="eventDataFilterLabel"
            />
            <InputC id="startDatetimeInput"
              ref="startDatetimeInput"
              class="startDatetimeInput"
              type='datetime-local'
              name="startDatetime"
            />

            <LabelC for="endDatetimeInput"
              labelText="até"
              class="eventDataFilterLabel"
            />
            <InputC id="endDatetimeInput"
              ref="endDatetimeInput"
              class="endDatetimeInput"
              type='datetime-local'
              name="endDatetime"
            />
          </div>

        </div>
         
      </div>

      <div class="eventFiltersButtonBox">

        <div>
          <ButtonC colorClass="pink3"
            :id="'btnApplyFilter'"
            label="Filtrar"
            width="100%"
            padding="3px 0px"
            @click="this.filter()"
          />
        </div>

        <div>
          <ButtonC colorClass="black1"
            :id="'btnCleanFilter'"
            label="Limpar Filtro"
            width="100%"
            padding="3px 0px"
            @click="this.cleanFilter()"
          />
        </div>

      </div>
    
    </div>

    <div class='filterButtonMobile'>
      <ButtonC colorClass="pink3"
        :id="'btnApplyFilterMobile'"
        label="Filtrar"
        width="100%"
        padding="3px 0px"
        @click="this.filter()"
      />
    </div>

    <div class='clearFilterButtonMobile'>
      <ButtonC colorClass="black1"
        :id="'btnCleanFilterMobile'"
        label="Limpar Filtro"
        width="100%"
        padding="3px 0px"
        @click="this.cleanFilter()"
      />
    </div>

    <div class="tableEventsRow">

      <TextC colorClass="black1" fontSize='var(--text-title)'>
        Tabela de histórico
      </TextC>
      
      <div class="tableEventsWrapper">
        <TablePink
          class="tableEvents"
          :tableData="this.tableEvents"
          :showPrevNextButtons="true"
          :actualPage="this.actualEventPage"
          :maxPages="this.maxEventPages"
          @previousClick="this.previousEventPage()"
          @nextClick="this.nextEventPage()"
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
import Utils from '../js/utils.js'

export default {
  
  name: 'AdmEventsView',

  props: {
  },

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
      actionItems: [
        { label: '_', value: '' }
      ],
      userItems: [
        { label: '_', value: '' }
      ],
      tableEvents: {
        'titles': [ 'Ação', 'Usuário', 'Data e hora', 'Descrição' ],
        'colTypes': [ 'string', 'string', 'string', 'string' ],
        'colWidths': [ '20%', '18%', '22%', '40%' ],
        'content': []
      },
      actualEventPage: 1,
      maxEventPages: 1,
      defLimit: 10,

      userId: null, 
      actionId: null, 
      startDateTime: null, 
      endDateTime: null
    }
  },

  async created() {
    this.$root.setPageLoggedName('Histórico');

    await this.loadPageContent();
  },

  methods:{

    async loadPageContent(){

      this.actionItems = [
        { label: '_', value: '' }
      ];
      this.userItems = [
        { label: '_', value: '' }
      ];
      this.tableEvents['content'] = [];

      let vreturnEvents = await this.$root.doRequest(
        Requests.getEvents,
        [ this.defLimit, 0, null, null, null, null ]
      );
      if(vreturnEvents && vreturnEvents['ok'] && vreturnEvents['response'] && vreturnEvents['response']['event_names']){

        // event names
        vreturnEvents['response']['event_names'].forEach(eventNameRow => {
          this.actionItems.push({ label: eventNameRow['event_name'], value: eventNameRow['event_name_id'] });
        });

        // event table data
        vreturnEvents['response']['events'].forEach(eventRow => {
          this.tableEvents['content'].push([
            eventRow['event_name'],
            Utils.getNameFormated(eventRow['event_user_name']),
            Utils.getDateTimeString(new Date(Date.parse(eventRow['event_date_time']))),
            eventRow['event_description_args']
          ]);
        });
        this.actualEventPage = 1;
        this.maxEventPages = Math.ceil(vreturnEvents['response']['count_events']/this.defLimit);

      }
      else{
        this.$root.renderRequestErrorMsg(vreturnEvents, []);
      }

      // users
      let vreturnUsers = await this.$root.doRequest(Requests.getUsers, []);
      if(vreturnUsers  && vreturnUsers ['ok'] && vreturnUsers ['response'] && vreturnUsers ['response']['users']){
        vreturnUsers['response']['users'].forEach(userRow => {
          this.userItems.push({ label: Utils.getNameFormated(userRow['name']), value: userRow['id'] });
        });
      }
      else{
        this.$root.renderRequestErrorMsg(vreturnUsers, []);
      }
    },

    async loadEvents(limit, offset, userId, actionId, startDateTime, endDateTime){

      this.tableEvents['content'] = [];

      let vreturnEvents = await this.$root.doRequest(
        Requests.getEvents,
        [ limit, offset , userId, actionId, startDateTime, endDateTime ]
      );

      if(vreturnEvents && vreturnEvents['ok'] && vreturnEvents['response'] && vreturnEvents['response']['event_names']){

        vreturnEvents['response']['events'].forEach(eventRow => {
          this.tableEvents['content'].push([
            eventRow['event_name'],
            eventRow['event_user_name'],
            eventRow['event_date_time'],
            eventRow['event_description_args']
          ]);
        });

        this.actualEventPage = Math.ceil((offset+1)/this.defLimit);
        this.maxEventPages = Math.max(Math.ceil(vreturnEvents['response']['count_events']/this.defLimit), 1);
      }
      else{
        this.$root.renderRequestErrorMsg(vreturnEvents, []);
      }
    },

    async filter(){
      
      // html elements values
      let actionV = this.$refs.actionSelect.getV();
      let userV = this.$refs.userSelect.getV();
      let starttimeV = this.$refs.startDatetimeInput.getV();
      let endtimeV = this.$refs.endDatetimeInput.getV();

      // saves filter request params
      this.userId = userV ? userV: null;
      this.actionId = actionV ? actionV : null;
      this.startDateTime = null;
      this.endDateTime = null;

      if(starttimeV && endtimeV){
        if(starttimeV > endtimeV){
          this.$root.renderMsg('warn', 'Datas inválidas!', 'Data e hora inicial deve ser menor ou igual à final.');
          return;
        }
        this.startDateTime = starttimeV;
        this.endDateTime = endtimeV;
      }
      else{
        this.startDateTime = starttimeV ? starttimeV : null;
        this.endDateTime = endtimeV ? endtimeV : null;
      }

      await this.loadEvents(this.defLimit, 0, this.userId, this.actionId, this.startDateTime, this.endDateTime);
    },
    async cleanFilter(){
      this.$refs.actionSelect.setV('');
      this.$refs.userSelect.setV('');
      this.$refs.startDatetimeInput.setV('');
      this.$refs.endDatetimeInput.setV('');

      this.userId = null;
      this.actionId = null;
      this.startDateTime = null;
      this.endDateTime = null;

      await this.loadEvents( this.defLimit, 0, null, null, null, null);
    },

    async previousEventPage(){
      await this.loadEvents( this.defLimit, (this.actualEventPage-2)*10, this.userId, this.actionId, this.startDateTime, this.endDateTime );
    },
    async nextEventPage(){
      await this.loadEvents( this.defLimit, this.actualEventPage*10, this.userId, this.actionId, this.startDateTime, this.endDateTime );
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
.eventFilters{
  width: 100%;
}
.eventFiltersRow{
  margin: 10px 20px;
}
.tableEventsRow{
  margin-top: 20px;
}
.tableEventsWrapper{
  margin-top: 20px;
}
@media (max-width: 1200px) {
  .eventFiltersButtonBox{
    display: none;
  }
  .filterButtonMobile, .clearFilterButtonMobile{
    display: block;
    margin: auto;
    width: 50%;
    margin-top: 10px;
  }
  .actionSelect, .userSelect{
    display: block;
    width: 100%;
    margin-bottom: 7px;
  }
  .eventDataFiltersBox{
    margin: 7px 0px 0px 14px;
  }
  .startDatetimeInput, .endDatetimeInput{
    display: block;
    width: 100%;
  }
}
@media (min-width: 1201px) {
  .filterButtonMobile, .clearFilterButtonMobile{
    display: none;
  }
  .startDatetimeInput, .endDatetimeInput{
    margin: 0px;
  }
  .eventFiltersBox{
    display: inline-block;
    width: 80%;
    padding: 0px;
    margin: 0px;
  }
  .eventFiltersButtonBox{
    display: inline-block;
    width: 20%;
    padding: 0px;
  }
  .eventFiltersButtonBox > div{
    margin-top: 10px;
  }
  .actionSelect, .userSelect{
    width: 35%;
    margin-left: 10px;
  }
  .actionSelect{
    margin-right: 10px;
  }
  .eventDataFiltersBox{
    margin: 7px 0px 0px 14px;
  }
  .eventDataFilterLabel{
    margin: 0px 10px;
  }
  .tableEventsWrapper{
    text-align: center;
  }
  .tableEvents{
    display: inline-block;
    margin: auto;
    width: 95%;
    text-align: center;
  }
}

</style>