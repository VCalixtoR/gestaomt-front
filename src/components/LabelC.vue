<template>

  <label :class="this.colorClass"
    :for="this.for"
    :fontWeight="this.fontWeight"
    :fontSize="this.fontSize">

    {{ this.labelText }}

    <span class="requiredChar" v-if="this.useRequiredChar">*</span>
  
  </label>

</template>

<script>

export default {

  name: 'LabelC',

  props: {
    colorClass: {
      default: 'black2',
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
    for:{
      type: String,
      required: true
    },
    labelText: {
      type: String,
      required: true
    },
    useRequiredChar: {
      default: false,
      type: Boolean
    }
  }
}
</script>

<style scoped>
.requiredChar{
  display: inline;
  color: var(--color-pink3);
}
/* color classes */
.black2{
  color: var(--color-black2);
}
</style>