<template>

  <form class="formc"
    action="return false;"
    onsubmit="return false;">

    <slot></slot>
    
  </form>

</template>

<script>

export default {
  name: 'FormC',
}

</script>

<!-- style applies only to this component -->
<style scoped>

.formc{
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
}

</style>