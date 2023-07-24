<template>

  <input v-if="this.mask != null && this.mask.length > 0"
    :class="'inputc ' + this.colorClass"
    :id="this.id"
    :name="this.name"
    :ref="this.id + '_IC'"
    :type="this.type"
    :maxlength="this.maxlength"
    :placeholder="this.placeholderTmp"
    :autocomplete="this.autocomplete"
    :style="{
      'padding': this.padding,
      'font-weight': this.fontWeight,
      'font-size': this.fontSize,
      'display': this.display
    }"
    v-mask="this.mask"
    @input="$emit('inputChange', this.getV())"
  >

  <input v-else
    :class="'inputc ' + this.colorClass"
    :id="this.id"
    :name="this.name"
    :ref="this.id + '_IC'"
    :type="this.type"
    :maxlength="this.maxlength"
    :placeholder="this.placeholderTmp"
    :autocomplete="this.autocomplete"
    :style="{
      'padding': this.padding,
      'font-weight': this.fontWeight,
      'font-size': this.fontSize,
      'display': this.display
    }"
    v-on:keypress="isLetter($event)"
    @input="$emit('inputChange', this.getV())"
  >

</template>

<script>

export default {

  name: 'InputC',

  props: {
    id: String,
    name: String,
    initialValue: String,
    mask: [ Array, String ],
    maxlength: String,
    autocomplete: {
      default: 'off',
      type: String
    },
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
    onlyLetters: {
      default: false,
      type: Boolean
    },
    padding: {
      default: '3px 7px',
      type: String
    },
    placeholder: {
      default: '',
      type: String
    },
    type: {
      default: 'text',
      type: String
    }
  },

  data() {
    return {
      placeholderTmp: ''
    }
  },

  mounted(){
    if(this.initialValue){
      this.setV(this.initialValue);
    }
    if(this.placeholder){
      this.setPlaceholder(this.placeholder);
    }
  },

  methods: {
    isLetter(e) {
      if(this.onlyLetters){
        let char = String.fromCharCode(e.keyCode);
        if(/^[A-Z a-z]+$/.test(char)) {
          return true;
        }
        else {
          e.preventDefault();
        }
      }
    },
    getV(){
      return this.$refs[this.id + '_IC'] ? this.$refs[this.id + '_IC'].value : null;
    },
    setV(value){
      this.$refs[this.id + '_IC'].value = value;
    },
    setPlaceholder(value){
      this.placeholderTmp = value;
    }
  }
}

</script>

<!-- style applies only to this component -->
<style scoped>

.inputc{
  border-radius: 5px;
  text-align: center;
}
.inputc:focus{
  outline-width: 0;
}
.inputc:disabled {
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