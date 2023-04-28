<template>

  <button
    :id="this.id"
    :class="'buttonC ' + this.colorClass"
    type="button"
    :style="{
      'width': this.width,
      'padding': this.padding,
      'margin': this.margin,
      'font-size': this.fontSize
    }">
    {{ this.label }}
  </button>

</template>

<script>

export default {

  name: 'ButtonC',

  props: {
    id: String,
    label: String,
    colorClass: {
      default: 'black1',
      type: String
    },
    width: {
      default: 'auto',
      type: String
    },
    padding: {
      default: '0px 0px 0px 0px',
      type: String
    },
    margin: {
      default: '0px 0px 0px 0px',
      type: String
    },
    fontSize: {
      default: 'var(--text-normal)',
      type: String
    }
  }
}
</script>

<style scoped>

.buttonC{
  border: 2px solid;
  border-radius: 25px;
  cursor: pointer;
  font-weight: normal;
}
.buttonC:hover{
  border: 2px solid;
  font-weight: bold;
}
.buttonC:focus, .buttonC:active {
  font-weight: bold;
}
.buttonC:disabled{
  font-weight: normal;
}

/* color classes */
.black1{
  background-color: var(--color-black1);
  border-color: var(--color-black1);
  color: var(--color-white);
}
.black1:hover{
  background-color: var(--color-black2-hover);
  border-color: var(--color-black1-hover);
}

.pink1{
  background-color: var(--color-pink2);
  border-color: var(--color-pink2);
  color: var(--color-black1);
}
.pink1:hover{
  background-color: var(--color-pink3);
  border-color: var(--color-pink2-hover);
}

.pink3{
  background-color: var(--color-pink3);
  border-color: var(--color-pink3);
  color: var(--color-black1);
}
.pink3:hover, .pink3:disabled{
  background-color: var(--color-pink2-hover);
  border-color: var(--color-pink3-hover);
}
.pink3:disabled{
  cursor: auto;
}

</style>