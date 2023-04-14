<template>

  <hr 
    :class="'linec ' + this.colorClass"
    :style="{
      'width': this.width
    }"
  >

</template>

<script>

export default {

  name: 'LineC',

  props: {
    colorClass: {
      default: 'black2',
      type: String
    },
    width: {
      default: '100%',
      type: String
    }
  }
}

</script>

<!-- style applies only to this component -->
<style scoped>

.linec{
  border: none;
  border-top: 3px solid;
  margin: auto;
  padding: 0px;
}

/* color classes */
.black2{
  border-top-color: var(--color-black2);
}
.pink3{
  border-top-color: var(--color-pink3);
}

</style>