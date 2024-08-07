<template>

  <!-- I created my own multiple select to set css correctly -->
  <div :id="'selectMWrapper' + this.id"
    class='selectMWrapper' 
    @focusout='this.handleOutClick()'
    tabindex="0">

    <div :class="'selectMBox ' + this.colorClass"
      :id="this.id"
      :name="this.name"
      ref='selectMBox'
      :style="{
        'width': '100%',
        'padding': this.selectMBoxPadding,
        'font-weight': this.fontWeight,
        'font-size': this.fontSize,
      }"
      @click="this.handleSelClick()">

      {{ this.items && this.items.length > 0 ? this.selectedOptsLabels : '---' }}
      <font-awesome-icon v-if="this.items && this.items.length && this.iconVisible"
        class='selchevron'
        icon='fa-solid fa-chevron-down'
      />
    
    </div>

    <div :class="'selectOpts ' + this.colorClass" v-if="this.items && this.items.length > 0" v-show="this.showOptsT"
      ref='selectOpts'
      :style="{
        'min-width': this.selectOptsWidth,
        'max-height': '100px',
        'font-weight': this.fontWeight,
        'font-size': this.fontSize,
        'overflow': 'auto'
        }"
      @click.prevent>
      <ul ref='selectUl'>
        <li v-for="(item, index) in this.items" :key="index" ref='opts'
          :class="'selectOpt ' + this.colorClass"
          :value="item.value"
          @click="this.handleOptClick(index)">

          {{item.label}}

          <CheckboxC
            :id="this.id + 'optCheck' + index"
            :name="this.id + 'optCheck' + index"
            ref='optCheck'
            style="float: right;"
          />

        </li>
      </ul>
    </div>
  </div>

</template>

<script>

import CheckboxC from '../components/CheckboxC.vue'

export default {

  name: 'SelectMultipleC',

  components: {
    CheckboxC
  },

  props: {
    id: String,
    name: String,
    items: Array,
    initialOptsValues: Array,
    colorClass: {
      default: 'pink3',
      type: String
    },
    selectMBoxPadding: {
      default: '3px 7px',
      type: String
    },
    fontWeight: {
      default: 'normal',
      type: String
    },
    fontSize: {
      default: 'var(--text-normal)',
      type: String
    },
    display: {
      default: 'inner-block',
      type: String
    },
    iconVisible: {
      default: true,
      type: Boolean
    }
  },

  data() {
    return {
      actualOptsSelected: [],
      selectedOptsLabels: '',
      showOptsT: false,
      selectOptsWidth: 'auto'
    }
  },

  mounted(){
    this.setV(this.initialOptsValues, true);
  },

  methods:{
    showOpts(show){
      this.showOptsT = show;
      document.getElementById('selectMWrapper' + this.id).focus();
    },
    getL(){
      let labels = '';
      let started = false;

      if(this.actualOptsSelected.length == 0){
        return '---'
      }

      for(let i = 0; i < this.actualOptsSelected.length; i++){
        labels = labels + (started ? ', ' : '') + this.items[this.actualOptsSelected[i]].label;
        started = true;
      }
      return labels;
    },
    getV(getItemObj=false){
      let values = [];

      for(let i = 0; i < this.actualOptsSelected.length; i++){
        if(getItemObj){
          values.push(this.items[this.actualOptsSelected[i]]);
        }
        else{
          values.push(this.items[this.actualOptsSelected[i]].value);
        }
      }
      return values;
    },
    setV(values, testByLabel=false){
      this.actualOptsSelected = [];

      if(values){
        this.items.forEach( (item, indexI) => {
          this.$refs.optCheck[indexI].setV(false);

          values.forEach( (value, indexV) => {

            if(!testByLabel){
              if(item.value == value){
                this.actualOptsSelected.push(indexI);
                this.$refs.optCheck[indexI].setV(true);
              }
            }
            else if(item.label == value){
              this.actualOptsSelected.push(indexI);
              this.$refs.optCheck[indexI].setV(true);
            }

          })
        });
      }
      this.selectedOptsLabels = this.getL();
    },
    handleSelClick(){
      this.selectOptsWidth = this.$refs.selectMBox.offsetWidth + 'px';
      this.showOptsT = !this.showOptsT;
    },
    handleOptClick(index){
      let tmpArray = [];
      let found = false;

      for(let i = 0; i < this.actualOptsSelected.length; i++){
        if(this.actualOptsSelected[i] < index){
          tmpArray.push(this.items[this.actualOptsSelected[i]].value);
        }
        else if(this.actualOptsSelected[i] == index){
          found = true;
        }
        else{
          if(!found){
            tmpArray.push(this.items[index].value);
            found = true;
          }
          tmpArray.push(this.items[this.actualOptsSelected[i]].value);
        }
      }
      if(!found){
        tmpArray.push(this.items[index].value);
        found = true;
      }
      this.setV(tmpArray);
      this.selectedOptsLabels = this.getL();

      this.$emit('optClicked',this.items[index]['value']);
    },
    handleOutClick(){
      this.showOptsT = false;
    }
  }
}

</script>

<!-- style applies only to this component -->
<style scoped>
.selectMWrapper{
  position: relative;
  display: inline-block;
  text-align: center;
}
.selectMBox{
  display: block;
}
.selchevron{
  font-size: 11px;
  font-weight: bold;
  float: right;
  margin: 4px 2px 0px 2px;
  clear: both;
}
.selectOpts{
  position: absolute;
  border: 1px solid;
  border-radius: 1px;
  z-index: 50;
  overflow: visible;
}
.selectOpts ul{
  margin: 0px;
  padding: 0px;
  list-style: none;
  text-align: center;
}
.selectOpts ul li{
  padding: 3px 7px;
  cursor: default;
}

/* class colors */
.selectMBox.pink3{
  background-color: var(--color-pink1);
  border: 1px solid var(--color-pink3);
  border-radius: 5px;
  color: var(--color-black2);
}
.selectMBox.pink3NoBorder{
  background-color: var(--color-pink1);
  border: none;
  color: var(--color-black2);
}
.selectOpts.pink3, .selectOpts.pink3NoBorder{
  background-color: var(--color-pink1);
  border-color: var(--color-pink3);
}
.selectOpt.pink3, .selectOpt.pink3NoBorder{
  background-color: var(--color-pink1);
  color: var(--color-black2);
}
.selectOpt.pink3:hover, .selectOpt.pink3NoBorder:hover{
  background-color: var(--color-pink3);
  color: var(--color-white);
}


</style>