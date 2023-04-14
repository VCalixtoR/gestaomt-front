<template>

  <div class="wrapper">
    <SelectC
      :id="this.id"
      colorClass="pink3NoBorder"
      :name="this.name"
      :items="this.items"
      :initialOptValue="this.initialOptValue"
      :ref="this.id + '_WP'"
      :width="this.width"
      :selectBoxPadding="this.selectBoxPadding"
      :display="this.display"
      :fontWeight="this.fontWeight"
      :fontSize="this.fontSize"
      :iconVisible="false"
      @optClicked="(itemValue) => this.$emit('optClicked', itemValue)"
    />
    <font-awesome-icon class="iconPencil"
      icon="fa-solid fa-pencil" 
      :style="{
        'font-size': 'var(--text-small)',
        'color': 'var(--color-pink3)'
      }"
      @click="this.$emit('pencilClicked')"
    />
  </div>

</template>

<script>

import SelectC from './SelectC.vue'

export default {

  name: 'SelectWithPencil',

  components: {
    SelectC
  },

  props: {
    id: String,
    name: String,
    items: Array,
    initialOptValue: [String, Number],
    width: String,
    fontWeight: {
      default: 'normal',
      type: String
    },
    fontSize: {
      default: 'var(--text-normal)',
      type: String
    },
    selectBoxPadding: {
      default: '0px',
      type: String
    },
    display: {
      default: 'inner-block',
      type: String
    }
  },

  methods: {
    showOpts(show){
      this.$refs[this.id + '_WP'].showOpts(show);
    },
    getV(){
      return this.$refs[this.id + '_WP'].getV();
    }
  }
}

</script>

<style scoped>

.wrapper{
  display: inline-block;
}
.iconPencil{
  margin-left: 5px;
}

</style>