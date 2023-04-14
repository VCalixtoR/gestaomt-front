<template>

  <div v-if="this.tableData != null"
    class="tableWrapper">

    <div v-if="this.showPrevNextButtons" class="prevNextWrapper">

      <font-awesome-icon v-if="this.actualPage > 1"
        icon="fa-solid fa-chevron-left" 
        class="prevNextIcon"
        @click="$emit('previousClick')"
      />

      <span>{{ this.actualPage }}/{{ this.maxPages }}</span>

      <font-awesome-icon v-if="this.actualPage < this.maxPages"
        icon="fa-solid fa-chevron-right"
        class="prevNextIcon"
        @click="$emit('nextClick')"
      />

    </div>

    <div v-if="!this.isOnMobyle">

      <div class="titleWrapper">

        <div v-if="this.tableData['single-title']" class="title" :style="{'width': '100%'}">
          {{ this.tableData['single-title'] }}
        </div>

        <div v-if="this.tableData['titles']" v-for="(title, indexT) in this.tableData['titles']" :key="indexT"
          class="title"
          :style="{
            'width': this.tableData['colWidths'][indexT]
          }">
          {{ title }}
          
          <CheckboxC v-if="this.tableData['colOperations'] && this.tableData['colOperations'][indexT] && this.tableData['colOperations'][indexT] == 'checkbox'"
            ref='colCheckbox'
            class="colCheckbox"
            :id="'colCheckbox' + indexT"
            :name="'colCheckbox' + indexT"
            @checkBoxClicked="(bValue) => this.$emit('checkBoxClicked', bValue)"
          />

        </div>
      </div>

      <div class="contentWrapper" v-if="this.tableData['content'].length > 0">

        <div v-for="(contentRow, indexCR) in this.tableData['content']" :key="indexCR"
          class="contentRow">

          <div v-for="(content, indexC) in contentRow" :key="indexC"
            class="content"
            :style="{
              'width': this.tableData['colWidths'][indexC]
            }">

            <span v-if="this.tableData['colTypes'][indexC] == 'string'">
              <TextC colorClass="black2" :ref="'tableContent' + indexCR" display='inline'>
                {{ content }}
              </TextC>
            </span>

            <div v-if="this.tableData['colTypes'][indexC] == 'string-list'">
              <div v-for="(strLContent, indexStrL) in content" :key="indexStrL" class="strLContent">
                <TextC colorClass="black2" :ref="'tableContent' + indexCR" display='inline'>
                  {{ strLContent }}
                </TextC>
              </div>
            </div>

            <SelectC v-if="this.tableData['colTypes'][indexC] == 'select'"
              :ref="'tableContent' + indexCR"
              :id="'tableSelect' + indexCR + '_' + indexC"
              colorClass="pink3NoBorder"
              :name="'tableSelect' + indexCR + '_' + indexC"
              :items="content['items']"
              :initialOptValue="content['initialOptValue'] ? content['initialOptValue'] : null"
              display='inline-block'
              @optClicked="(itemValue) => this.$emit('optClicked', itemValue, indexCR, indexC)"
              :style="{
                'width': '100%'
              }"
            />

            <InputC v-if="this.tableData['colTypes'][indexC] == 'input'"
              :ref="'tableContent' + indexCR"
              class="tableInput"
              :id="'tableInput' + indexCR + '_' + indexC"
              :name="'tableInput' + indexCR + '_' + indexC"
              colorClass="pink3NoBorder"
              :type="content['type'] ? content['type'] : 'text'"
              :maxlength="content['maxlength'] ? content['maxlength'] : '524288'"
              :mask="content['mask'] ? content['mask'] : null "
              :onlyLetters="content['onlyLetters'] ? content['onlyLetters'] : false "
              :placeholder="content['placeholder'] ? content['placeholder'] : '' "
              :autocomplete="content['autocomplete'] ? content['autocomplete'] : 'off' "
              display='inline-block'
              :style="{
                'width': '100%'
              }"
              :value="content['value']"
            />

            <CheckboxC v-if="this.tableData['colTypes'][indexC] == 'checkbox'"
              :ref="'tableContent' + indexCR"
              class="tableCheckBox"
              :id="'tableCheckBox' + indexCR + '_' + indexC"
              :name="'tableCheckBox' + indexCR + '_' + indexC"
            />

            <div v-if="this.tableData['colTypes'][indexC] == 'edit'" :ref="'tableContent' + indexCR" class="wrapperEdit">
              <font-awesome-icon v-if="content['showEdit']"
                class="iconPencil"
                icon="fa-solid fa-pencil"
                :style="{
                  'font-size': 'var(--text-small)',
                  'color': 'var(--color-pink3)'
                }"
                @click="$emit('edit', indexCR, indexC)"
              />
            </div>

            <div v-if="this.tableData['colTypes'][indexC] == 'acceptReject'"
              :ref="'tableContent' + indexCR"
              class="wrapperAcceptReject">

              <div class="iconAcceptRejectWrapper" v-if="content['showAccept']">
                <font-awesome-icon
                  class="iconAcceptReject"
                  color="green"
                  icon="fa-solid fa-check"
                  @click="$emit('accept', indexCR, indexC)"/>
              </div>
              <div class="iconAcceptRejectWrapper" v-if="content['showReject']">
                <font-awesome-icon
                  class="iconAcceptReject"
                  color="red"
                  icon="fa-solid fa-xmark"
                  @click="$emit('reject', indexCR, indexC)"/>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>

    <div v-else>

      <div v-if="this.tableData['content'].length > 0"
        class="contentWrapperMobile">

        <TextC v-if="this.tableData['single-title']" colorClass="black2" fontWeight="bold" display='inline'>
          {{ this.tableData['single-title'] }}
        </TextC>

        <div v-for="(contentBox, indexCR) in this.tableData['content']" :key="indexCR" class="contentBox">

          <div v-for="(content, indexC) in contentBox" :key="indexC"
            class="contentBoxItem" :style="{'text-align' : this.tableData['single-title'] ? 'center': 'left' }">

            <TextC v-if="this.tableData['titles']" colorClass="black2" fontWeight="bold" display='inline'>
              {{ this.tableData['titles'][indexC] }}:
            </TextC>

            <span v-if="this.tableData['colTypes'][indexC] == 'string'">
              <TextC colorClass="black2" :ref="'tableContent' + indexCR" display='inline'>
                {{ content }}
              </TextC>
            </span>

            <div v-if="this.tableData['colTypes'][indexC] == 'string-list'">
              <div v-for="(strLContent, indexStrL) in content" :key="indexStrL" class="strLContent">
                <TextC colorClass="black2" :ref="'tableContent' + indexCR" display='inline'>
                  {{ strLContent }}
                </TextC>
              </div>
            </div>

            <SelectC v-if="this.tableData['colTypes'][indexC] == 'select'"
              :ref="'tableContent' + indexCR"
              :id="'tableSelect' + indexCR + '_' + indexC"
              colorClass="pink3"
              :name="'tableSelect' + indexCR + '_' + indexC"
              :items="content['items']"
              :initialOptValue="content['initialOptValue'] ? content['initialOptValue'] : null"
              display='inline-block'
              @optClicked="(itemValue) => this.$emit('optClicked', itemValue, indexCR, indexC)"
              :style="{
                'width': this.tableData['single-title'] ? '100%' : this.calcInputWidthOnMobile(this.tableData['titles'][indexC])
              }"
            />

            <InputC v-if="this.tableData['colTypes'][indexC] == 'input'"
              :ref="'tableContent' + indexCR"
              class="tableInput"
              :id="'tableInput' + indexCR + '_' + indexC"
              :name="'tableInput' + indexCR + '_' + indexC"
              colorClass="pink3"
              :type="content['type'] ? content['type'] : 'text'"
              :maxlength="content['maxlength'] ? content['maxlength'] : '524288'"
              :mask="content['mask'] ? content['mask'] : null "
              :onlyLetters="content['onlyLetters'] ? content['onlyLetters'] : false "
              :placeholder="content['placeholder'] ? content['placeholder'] : '' "
              :autocomplete="content['autocomplete'] ? content['autocomplete'] : 'off' "
              display='inline-block'
              :style="{
                'width': this.tableData['single-title'] ? '100%' : this.calcInputWidthOnMobile(this.tableData['titles'][indexC])
              }"
              :value="content['value']"
            />

            <CheckboxC v-if="this.tableData['colTypes'][indexC] == 'checkbox'"
              :ref="'tableContent' + indexCR"
              class="tableCheckBox"
              :id="'tableCheckBox' + indexCR + '_' + indexC"
              :name="'tableCheckBox' + indexCR + '_' + indexC"
            />

            <div v-if="this.tableData['colTypes'][indexC] == 'edit'" :ref="'tableContent' + indexCR" class="wrapperEdit">
              <font-awesome-icon v-if="content['showEdit']"
                class="iconPencil"
                icon="fa-solid fa-pencil"
                :style="{
                  'font-size': 'var(--text-small)',
                  'color': 'var(--color-pink3)'
                }"
                @click="$emit('edit', indexCR, indexC)"
              />
            </div>

            <div v-if="this.tableData['colTypes'][indexC] == 'acceptReject'"
              :ref="'tableContent' + indexCR"
              :name="content['showAccept'] ? 'Acc' : '' + content['showReject'] ? 'Rej' : ''"
              class="wrapperAcceptReject">

              <div class="iconAcceptRejectWrapper" v-if="content['showAccept']">
                <font-awesome-icon
                  class="iconAcceptReject"
                  color="green"
                  icon="fa-solid fa-check"
                  @click="$emit('accept', indexCR, indexC)"/>
              </div>
              <div class="iconAcceptRejectWrapper" v-if="content['showReject']">
                <font-awesome-icon
                  class="iconAcceptReject"
                  color="red"
                  icon="fa-solid fa-xmark"
                  @click="$emit('reject', indexCR, indexC)"/>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
    
  </div>

</template>

<script>

import CheckboxC from '../components/CheckboxC.vue'
import Cst from '../js/constants.js'
import InputC from '../components/InputC.vue'
import SelectC from '../components/SelectC.vue'
import TextC from '../components/TextC.vue'
import Utils from '../js/utils.js'

export default {

  name: 'TablePink',

  components: {
    CheckboxC,
    InputC,
    SelectC,
    TextC
  },

  props: {
    tableData: {
      default: null,
      type: Object
    },
    width: String,
    showPrevNextButtons: {
      default: false,
      type: Boolean
    },
    actualPage: {
      default: 1,
      type: Number
    },
    maxPages: {
      default: 1,
      type: Number
    }
  },

  data(){
    return{
      isOnMobyle: false
    }
  },

  mounted() {
    window.addEventListener('resize', this.verifyOnMobile);
    this.verifyOnMobile();
  },
  unmounted() {
    window.removeEventListener('resize', this.verifyOnMobile);
  },

  methods: {
    verifyOnMobile(){
      this.isOnMobyle = Utils.isPageOnMobile();
    },
    parseTableCell(cell, row, col){
      
      if(cell.name && (cell.name.includes('tableInput') || cell.name.includes('tableSelect') || cell.name.includes('tableCheckBox')) ){
        return cell.getV();
      }

      if(this.tableData['colTypes'][col] == 'string'){
        return this.tableData['content'][row][col];
      }

      if(cell.innerHTML){
        let ret = '';

        if(cell.innerHTML.includes('fa-check')){
          ret += 'A'
        }
        if(cell.innerHTML.includes('fa-xmark')){
          ret += 'R'
        }
        if(ret != ''){
          return '<' + ret + '>';
        }
      }

      return '';
    },
    calcInputWidthOnMobile(titleStr){
    
      let cssTsmRule = Cst.DYNAMIC_TEXT_SIZES_MOBILE.find(ts => ts['label'] == '--text-normal');
      let fontNormalSizeHelvetica = cssTsmRule ? cssTsmRule['value'] + ' Helvetica' : 'Helvetica'
      let titleWidth = Utils.getTextWidth(titleStr, fontNormalSizeHelvetica );

      let ret = 'calc(100% - ' + titleWidth.toString() + 'px - 25px)';
      return ret;
    },
    getV(row=null, col=null){

      let tableV = [];

      if(row!=null && col!=null){
        return this.parseTableCell(this.$refs['tableContent' + row][col], row, col);
      }

      for(let i = 0; i < this.tableData['content'].length; i++){

        let line = [];
        for(let j = 0; j < this.tableData['colTypes'].length; j++){
          line.push( this.parseTableCell(this.$refs['tableContent' + i][j], i, j) );
        }
        
        tableV.push(line);
      }

      return tableV;
    },
    setV(row, col, value){
      this.$refs['tableContent' + row][col].setV(value);
    }
  }
}

</script>

<!-- style applies only to this component -->
<style scoped>

.tableWrapper, .prevNextWrapper{
  display: block;
  width: 100%;
  margin: 0px;
  padding: 0px;
}
.prevNextWrapper{
  text-align: center;
  margin-bottom: 5px;
}
.prevNextWrapper > *{
  text-align: center;
  margin-right: 20px;
}
.prevNextIcon{
  color: var(--color-pink3);
  cursor: pointer;
  font-size: var(--text-normal);
  font-weight: 'normal';
}
.titleWrapper, .contentWrapper{
  width: 100%;
  text-align: center;
}
.titleWrapper{
  background-color: var(--color-pink3);
  border: solid 1px var(--color-pink3);
  border-radius: 5px 5px 0px 0px;
  font-size: var(--text-normal);
  font-weight: 'bold';
  margin: 0px;
  padding: 4px 0px;
}
.titleWrapper > *{
  vertical-align: middle;
}
.contentWrapper{
  background-color: var(--color-pink1);
  border: solid 1px var(--color-pink3);
  font-size: var(--text-normal);
  font-weight: 'normal';
  margin: 0px;
  padding: 0px;
}
.contentRow{
  display: flex;
  text-align: center;
}
.contentRow > * {
  align-items: stretch;
  padding: 5px 0px;
}
.title, .content{
  display: inline-block;
  font-size: inherit;
  word-wrap: break-word;
}
.content{
  border: solid 1px var(--color-pink3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.tableInput, .tableCheckBox{
  text-align: center;
}
.tableCheckBox > *{
  text-align: center;
}
@media (min-width: 1201px) {
  .strLContent{
    margin: 3px;
  }
  .wrapperAcceptReject{
    width: 100%;
    margin: 0px;
    padding: 0px;
  }
  .iconAcceptRejectWrapper{
    display: inline-block;
    width: 50%;
    font-size: inherit;
    word-wrap: break-word;
    margin: auto;
  }
}
@media (max-width: 1200px) {
  .tableInput{
    display: inline-block;
  }
  .strLContent{
    margin: 3px 20px;
  }
  .wrapperAcceptReject{
    display: inline-block;
    margin: 0px;
    padding: 0px;
  }
  .iconAcceptRejectWrapper{
    display: inline-block;
    font-size: inherit;
    word-wrap: break-word;
    margin: 0px 10px;
  }
}
.wrapperEdit{
  display: inline-block;
  margin: 0px 10px;
}
.iconAcceptReject, .iconPencil{
  cursor: pointer;
}
.iconPencil{
  display: inline-block;
}
.contentBox{
  background-color: var(--color-pink1);
  border: solid 1px var(--color-pink3);
  font-size: var(--text-normal);
  font-weight: 'normal';
  padding: 10px 20px;
}
.contentBoxItem{
  display: block;
  width: 100%;
  margin-top: 7px;
}

</style>