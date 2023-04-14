<template>

  <img
    src="../assets/LogoMtBig.png"
    alt="Logo Completo MissTeen"
    :style="{
      width: this.width
    }"
  >

</template>

<script>

export default {

  name: 'ImgLogoBig',

  props: {
    width: {
      default: 'auto',
      type: String
    }
  }
}

</script>