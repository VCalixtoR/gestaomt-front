<template>

  <!-- I created my own select to set css correctly -->

  <div :id="'selectWFWrapper' + this.id"
    class='selectWFWrapper'>

    <div :class="'selectBox ' + this.colorClass + (this.inputDisabled ? ' disabled' : '')"
      ref='selectBox'
      :style="{
        'padding': this.selectBoxPadding,
        'font-weight': this.fontWeight,
        'font-size': this.fontSize,
      }">

      <input class="selectBoxInput"
        :id="this.id"
        :ref="'input' + this.id"
        :name="this.name"
        :type="this.type"
        :disabled="this.inputDisabled"
        :style="{
          'font-weight': this.fontWeight,
          'font-size': this.fontSize,
        }"
        @click="this.handleInputClick()"
        @input="this.handleInputChange()"
        @focusout="this.handleInputOutClick()"
        autocomplete="off"
      />
      
      <font-awesome-icon v-if="this.items && this.items.length && this.iconVisible"
        class='selchevron'
        icon='fa-solid fa-chevron-down'
        @click="this.handleChevronClick()"
      />
    </div>

    <div :class="'selectOpts ' + this.colorClass" v-if="this.selectedItems && this.selectedItems.length > 0" v-show="this.showOptsT"
      ref='selectOpts'
      :style="{
        'min-width': this.selectOptsWidth,
        'max-height': '100px',
        'font-weight': this.fontWeight,
        'font-size': this.fontSize,
        'overflow': 'auto'
        }">
      <ul ref='selectUl'>
        <li v-for="(item, index) in this.selectedItems" :key="index" ref='opts'
          :class="'selectOpt ' + this.colorClass"
          :value="item.value"
          @click="this.handleOptionClick(item.label)">

          {{item.label}}

        </li>
      </ul>
    </div>
  </div>

</template>

<script>

export default {

  name: 'SelectWithFilter',

  props: {
    id: String,
    name: String,
    items: Array,
    initialOptValue: {
      default: null,
      type: [String, Number]
    },
    colorClass: {
      default: 'pink3',
      type: String
    },
    selectBoxPadding: {
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
    },
    type: {
      default: 'text',
      type: String
    },
    inputDisabled: {
      default: false,
      type: Boolean
    }
  },

  data() {
    return {
      selectedItems: null,
      actualOptSelected: null,
      doInputClear: true,
      showOptsT: false,
      selectOptsWidth: 'auto'
    }
  },

  mounted(){
    this.selectedItems = this.items;
    this.$refs['input' + this.id].value = '---';

    if(this.initialOptValue != null && this.initialOptValue != undefined){
      for(let i = 0; i < this.items.length; i++){
        if(this.items[i].value == this.initialOptValue){
          this.actualOptSelected = i;
          this.$refs['input' + this.id].value = this.items[i].label;
        }
      }
    }
  },

  methods:{
    showOpts(show){
      this.showOptsT = show;
      document.getElementById('selectWFWrapper' + this.id).focus();
    },
    getV(){
      return this.actualOptSelected != null && this.actualOptSelected != undefined ? this.items[this.actualOptSelected].value : null;
    },
    getL(){
      return this.actualOptSelected != null && this.actualOptSelected != undefined ? this.items[this.actualOptSelected].label : null;
    },
    getObj(){
      return this.actualOptSelected != null && this.actualOptSelected != undefined ? this.items[this.actualOptSelected] : null;
    },
    setV(value){
      if(value == '' || value == null || value == undefined){
        this.actualOptSelected = null;
        this.$refs['input' + this.id].value = '---';
      }
      else{
        this.items.forEach( (item, index) => {
          if(item.value == value){
            this.$refs['input' + this.id].value = this.items[index].label;
            this.actualOptSelected = index;
          }
        });
      }
      this.selectedItems = this.items;
    },
    // On chevron click resets selectedItems showopts with input focused or hideopts
    handleChevronClick(){

      if(this.inputDisabled){
        return;
      }

      this.selectedItems = this.items;
      this.selectOptsWidth = this.$refs.selectBox.offsetWidth + 'px';
      if(!this.showOptsT){
        this.doInputClear = true;
        this.$refs['input' + this.id].focus();
        this.$refs['input' + this.id].click();
      }
      else{
        this.showOptsT = false;
      }
    },
    // On input click conditionally clears input and show opts
    handleInputClick(){

      if(this.inputDisabled){
        return;
      }

      if(this.doInputClear){
        this.doInputClear = false;
        this.selectedItems = this.items;
        this.$refs['input' + this.id].value = '';
      }
      this.selectOptsWidth = this.$refs.selectBox.offsetWidth + 'px';
      this.showOptsT = true;
    },
    // On input change selectedItems not case sensitive
    handleInputChange(){
      let tmpSelectedItems = [];
      let inputV = this.$refs['input' + this.id].value;

      for(let i = 0; i < this.items.length; i++){
        if(this.items[i]['label'].toLowerCase().includes(inputV.toLowerCase())){
          tmpSelectedItems.push(this.items[i]);
        }
      }
      this.selectedItems = tmpSelectedItems;
    },
    // On option click sets option based on its label and emit optClicked event
    handleOptionClick(label){
      for(let i = 0; i < this.items.length; i++){
        if(this.items[i].label == label){
          this.actualOptSelected = i;
          this.$refs['input' + this.id].value = this.items[i].label;
          this.showOptsT = !this.showOptsT;
          this.$emit('optClicked',this.items[i].value);
          return;
        }
      }
    },
    // On outclick, waits 500 ms to close options, needed to wait handleOptionClick event
    async handleInputOutClick(){
      let pageContext = this;
      setTimeout(function() {
        pageContext.$refs['input' + pageContext.id].value = pageContext.actualOptSelected != null ? pageContext.items[pageContext.actualOptSelected].label : '---';
        pageContext.showOptsT = false;
        pageContext.doInputClear = true;
      }, 500);
    }
  }
}

</script>

<!-- style applies only to this component -->
<style scoped>
.selectWFWrapper{
  position: relative;
  display: inline-block;
  text-align: center;
}
.selectBox{
  display: block;
}
.selectBoxInput{
  display: inline-block;
  width: calc(100% - 20px);
  text-align: center;
  margin: 0px;
  padding: 0px;
  border: none;
  outline: none;
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
.selectBox.pink3{
  background-color: var(--color-pink1);
  border: 1px solid var(--color-pink3);
  border-radius: 5px;
  color: var(--color-black2);
}
.selectBox.pink3NoBorder{
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
.selectBox.pink3.disabled, .selectBox.pink3NoBorder.disabled {
  color: var(--color-gray3);
  background-color: var(--color-pink2);
}

</style>