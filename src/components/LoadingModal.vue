<template>

  <div class="transparentWrapper">
    <div class="lds-ring">
      <div></div><div></div><div></div><div></div>
    </div>
  </div>

</template>

<script>

export default {
  name: 'LoadingModal'
}

</script>

<style scoped>

.transparentWrapper{
  position: fixed;
  top: 50%;
  left: 50%;
  -ms-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  z-index: 100;
  width: 100vw;
  line-height: 100vh;
  text-align: center;
  background-color: var(--color-pink1-hover);
}
.transparentWrapper > *{
  vertical-align: middle;
}

/** This css is based on https://loading.io/ a web app with Open source css animations **/
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid;
  border-color: var(--color-pink3) transparent transparent transparent;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
/**  **/

</style>