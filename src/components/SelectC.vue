<template>

  <!-- I created my own select to set css correctly -->

  <div :id="'selectWrapper' + this.id"
    class='selectWrapper' 
    @focusout='this.handleOutClick()'
    tabindex="0">

    <div :class="'selectBox ' + this.colorClass + (this.selectDisabled ? ' disabled ' : '') + (this.customFontColor ? this.customFontColor : '')"
      :id="this.id"
      :name="this.name"
      ref='selectBox'
      :style="{
        'width': '100%',
        'padding': this.selectBoxPadding,
        'font-weight': this.fontWeight,
        'font-size': this.fontSize,
      }"
      @click="this.handleSelClick()">

      {{ this.items && this.items.length > 0 ? this.items[this.actualOptSelected].label : '---' }}
      <font-awesome-icon v-if="this.items && this.items.length && this.iconVisible"
        class='selchevron'
        icon='fa-solid fa-chevron-down'
        :visibility="(this.selectDisabled ? 'hidden' : 'visible')"
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
        }">
      <ul ref='selectUl'>
        <li v-for="(item, index) in this.items" :key="index" ref='opts'
          :class="'selectOpt ' + this.colorClass"
          :value="item.value"
          @click="this.handleOptClick(index)">

          {{item.label}}

        </li>
      </ul>
    </div>
  </div>

</template>

<script>

export default {

  name: 'SelectC',

  props: {
    id: String,
    name: String,
    items: Array,
    initialOptValue: [String, Number],
    colorClass: {
      default: 'pink3',
      type: String
    },
    customFontColor: {
      default: null,
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
    selectDisabled: {
      default: false,
      type: Boolean
    }
  },

  data() {
    return {
      actualOptSelected: 0,
      showOptsT: false,
      selectOptsWidth: 'auto'
    }
  },

  mounted(){
    if(this.initialOptValue != null && this.initialOptValue != undefined){
      for(let i = 0; i < this.items.length; i++){
        if(this.items[i].value == this.initialOptValue){
          this.actualOptSelected = i;
        }
      }
    }
  },

  methods:{
    showOpts(show){
      if(this.selectDisabled){
        return;
      }
      this.showOptsT = show;
      document.getElementById('selectWrapper' + this.id).focus();
    },
    getV(){
      return this.items[this.actualOptSelected].value;
    },
    setV(value){

      if(value == null || value == undefined){
        this.actualOptSelected = 0;
      }
      else{
        this.items.forEach( (item, index) => {
          if(item.value == value){
            this.actualOptSelected = index;
          }
        });
      }
    },
    handleSelClick(){
      if(this.selectDisabled){
        return;
      }
      this.selectOptsWidth = this.$refs.selectBox.offsetWidth + 'px';
      this.showOptsT = !this.showOptsT;
    },
    handleOptClick(index){
      if(this.selectDisabled){
        return;
      }
      this.actualOptSelected = index;
      this.showOptsT = !this.showOptsT;
      this.$emit('optClicked',this.items[index]['value']);
    },
    handleOutClick(){
      if(this.selectDisabled){
        return;
      }
      this.showOptsT = false;
    }
  }
}

</script>

<!-- style applies only to this component -->
<style scoped>
.selectWrapper{
  position: relative;
  display: inline-block;
  text-align: center;
}
.selectBox{
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
.selectBox.pink3{
  background-color: var(--color-pink1);
  border: 1px solid var(--color-pink3);
  border-radius: 5px;
  color: var(--color-black2);
}
.selectBox.pink3NoBorder{
  background-color: var(--color-pink1);
  border: none;
  color: var(--color-black1);
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
.selectBox.fontred {
  color: red;
}
.selectBox.fontpink3 {
  color: var(--color-pink3);
  font-weight: bold;
}


</style>