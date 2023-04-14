<template>

  <h3
    :class="'textc ' + this.colorClass"
    :style="{
      'display': this.display,
      'font-size': this.fontSize,
      'font-weight': this.fontWeight,
      'margin': this.margin,
      'text-decoration': this.textDecoration
    }">

    <slot></slot>

  </h3>

</template>

<script>

export default {

  name: 'TextC',

  props: {
    colorClass: {
      default: 'black1',
      type: String
    },
    fontSize: {
      default: 'var(--text-normal)',
      type: String
    },
    fontWeight: {
      default: 'normal',
      type: String
    },
    textDecoration: {
      default: 'none',
      type: String
    },
    margin: {
      default: '0px',
      type: String
    },
    display: {
      default: 'inline',
      type: String
    }
  }

}
</script>

<!-- style applies only to this component -->
<style scoped>

.textc{
  margin: auto;
  padding: 0px;
  overflow-wrap: break-word;
}

/* color classes */
.black1{
  color: var(--color-black1);
}
.black2{
  color: var(--color-black2);
}
.white{
  color: var(--color-white);
}
.inherit{
  color: inherit;
}

</style>