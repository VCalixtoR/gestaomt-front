<template>

  <textarea 
    :id="this.id"
    :name="this.name"
    :ref="this.id + '_TA'"
    :class="'textareac ' + this.colorClass"
    :rows="this.rows" :cols="this.cols"
    :style="{
      'padding': this.padding,
      'font-weight': this.fontWeight,
      'font-size': this.fontSize,
      'display': this.display
    }">
  </textarea>

</template>

<script>

export default {

  name: 'TextAreaC',

  props: {
    id: String,
    name: String,
    rows: Number,
    cols: Number,
    colorClass: {
      default: 'pink3',
      type: String
    },
    display: {
      default: 'inline-block',
      type: String
    },
    fontSize: {
      default: 'inherit',
      type: String
    },
    fontWeight: {
      default: 'normal',
      type: String
    },
    padding: {
      default: '3px 7px',
      type: String
    }
  },

  methods: {
    getV(){
      return this.$refs[this.id + '_TA'].value;
    },
    setV(value){
      this.$refs[this.id + '_TA'].value = value;
    }
  }
}

</script>

<!-- style applies only to this component -->
<style scoped>

.textareac{
  border-radius: 5px;
}
.textareac:focus{
  outline-width: 0;
}
.textareac:disabled {
  color: var(--color-gray3);
  background-color: var(--color-pink2);
}

/* color classes */
.pink3{
  color: var(--color-black2);
  background-color: var(--color-pink1);
  border: 1px solid var(--color-pink3);
}
.pink3NoBorder{
  color: var(--color-black2);
  background-color: var(--color-pink1);
  border: none;
}

</style>