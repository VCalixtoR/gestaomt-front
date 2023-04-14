<template>

  <img v-if="this.colorClass=='black'" 
    class="mtIconLogo"
    src="../assets/LogoMtSmall.png"
    alt="Logo Coroa MissTeen Preta"
    :style="{
      'width': this.width,
      'height': this.height
    }"
  >
  
  <img v-else
    class="mtIconLogo"
    src="../assets/LogoMtSmallWhite.png"
    alt="Logo Coroa MissTeen Branca"
    :style="{
      'width': this.width,
      'height': this.height
    }"
  >

</template>

<script>

export default {

  name: 'ImgCrown',

  props: {
    colorClass:{
      default: 'black',
      type: String
    },
    width: {
      default: '51px',
      type: String
    },
    height: {
      default: '21px',
      type: String
    }
  }
}

</script>

<!-- style applies only to this component -->
<style scoped>

.mtIconLogo{
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

</style>