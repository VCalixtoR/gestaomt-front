<template>

  <div id="dashContent">
    
    <div id=dashTextWrapper>

      <div class="dashText">
        <TextC colorClass="black1" fontSize='var(--text-normal)'>
          Bem vindo {{$root.userLoggedData['name']}}.
        </TextC>
      </div>

      <div class="dashText">
        <TextC colorClass="black1" fontSize='var(--text-normal)'>
          Aqui você pode realizar a gestão de clientes, produtos,
          condicionais e vendas, o sistema foi planejado para facilitar
          a gestão das etapas descritas.
        </TextC>
      </div>

    </div>
    <div class="wrapperMtLogo shownOnlyOnNotMobile"
      :style="{
        'height': this.wrapperMtLogoHeight,
        'line-height': this.wrapperMtLogoHeight
      }">

      <ImgLogoBig class="imgLogo"
        width="60%"
      />

    </div>

    <div class="wrapperMtLogoMobyle shownOnlyOnMobile">
      <ImgLogoBig class="imgLogo"
        width="75%"
      />
    </div> 

  </div>

</template>

<script>

import ImgLogoBig from '../components/ImgLogoBig.vue'
import TextC from '../components/TextC.vue'

export default {
  
  name: 'HomeView',

  props: {
  },

  components: {
    ImgLogoBig,
    TextC
  },

  data() {
    return {
      wrapperMtLogoHeight: '10px'
    }
  },

  created() {
    this.$root.setPageLoggedName('Home');
  },

  mounted() {
    window.addEventListener('resize', this.setWrapperMtLogoHeight);
    this.setWrapperMtLogoHeight();
  },
  
  unmounted() {
    window.removeEventListener('resize', this.setWrapperMtLogoHeight);
  },

  methods:{
    setWrapperMtLogoHeight(){
      var dashCH = document.getElementById('dashContent').clientHeight;
      var dashTH = document.getElementById('dashTextWrapper').clientHeight;
      this.wrapperMtLogoHeight = dashCH - dashTH + 'px';
    }
  }
}
</script>

<!-- style applies only to this component -->
<style scoped>

#dashContent{
  width: 100%;
  height: calc(100% - 8px);
}
.dashText{
  margin: 5px;
}
.wrapperMtLogo, .wrapperMtLogoMobyle{
  display: inline-block;
  width: 100%;
  text-align: center;
}
.wrapperMtLogo > *, .wrapperMtLogoMobyle > *{
  vertical-align: middle;
}
.wrapperMtLogoMobyle{
  margin: 50px 0px;
}
.imgLogo{
  display: inline-block;
}

</style>