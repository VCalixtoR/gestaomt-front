<template>

  <button
    :id="this.id"
    class="btnPlus"
    type="button">
    <font-awesome-icon 
      class="plusIcon"
      icon="fa-solid fa-plus"
    />
  </button>

</template>

<script>

export default {

  name: 'ButtonPlusC',

  props: {
    id: String,
    fontSize: {
      default: 'var(--text-normal)',
      type: String
    }
  }
}
</script>

<!-- style applies only to this component -->
<style scoped>

.btnPlus{
  background-color: var(--color-pink3);
  border: 2px solid var(--color-pink3);
  border-radius: 50%;
  color: var(--color-black1);
  cursor: pointer;
  margin: 0px;
  padding: 6px 8px 4px 8px;
  text-align: center;
  vertical-align: middle;
}
.btnPlus:hover{
  background-color: var(--color-pink2-hover);
  border: 2px solid var(--color-pink3-hover);
}
.plusIcon{
  font-size: var(--text-normal);
}

</style>