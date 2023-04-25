<template>

  <!-- I created my own select to set css correctly -->

  <div :id="'selectWFWrapper' + this.id"
    class='selectWFWrapper'
    @focusout='this.handleOutClick()'
    tabindex="0">

    <div :class="'selectBox ' + this.colorClass"
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
        :value="this.items && this.items.length > 0 ? this.items[this.actualOptSelected].label : '---'"
        :style="{
          'font-weight': this.fontWeight,
          'font-size': this.fontSize,
        }"
        @click="this.handleSelClick(true)"
        @input="this.handleInputChange()"
      />
      
      <font-awesome-icon v-if="this.items && this.items.length && this.iconVisible"
        class='selchevron'
        icon='fa-solid fa-chevron-down'
        @click="this.handleSelClick()"
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

  name: 'SelectWithFilter',

  props: {
    id: String,
    name: String,
    items: Array,
    initialOptValue: [String, Number],
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
    if(this.initialOptValue){
      for(let i = 0; i < this.items.length; i++){
        if(this.items[i].value == this.initialOptValue){
          this.actualOptSelected = i;
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
      return this.items[this.actualOptSelected].value;
    },
    setV(value){

      if(!value){
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
    handleSelClick(fromInput=false){
      this.selectOptsWidth = this.$refs.selectBox.offsetWidth + 'px';
      if(fromInput){
        this.showOptsT = true;
      }
      else{
        this.showOptsT = !this.showOptsT;
      }
    },
    handleOptClick(index){
      this.actualOptSelected = index;
      this.showOptsT = !this.showOptsT;
      this.$emit('optClicked',this.items[index]['value']);
    },
    handleInputChange(){
      // filtrar e gg
      console.log(this.$refs['input' + this.id].value);
    },
    handleOutClick(){
      this.showOptsT = false;
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


</style>