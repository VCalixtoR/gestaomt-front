<template>

  <div id="pageWrapper">

    <router-view v-if="this.createdDone && this.mountedDone && (this.$route.path == '/login' || this.$route.path == '/cadastro')"/>

    <PageLoggedLayout v-else-if="this.createdDone && this.mountedDone && (this.userLoggedData != null)">
      <router-view/>
    </PageLoggedLayout>

    <LoadingModal v-show="this.mountedDone && !this.isMessageModalEnabled && (!this.createdDone || this.isLoadingModalEnabled)"/>

    <MsgModal ref='warningMsg' v-show="this.mountedDone && this.isMessageModalEnabled"
      :msgType="this.msgType"
      :msgInfo="this.msgInfo"
      :msgTitle="this.msgTitle"
      :msgAccept="this.msgAccept"
      :msgReject="this.msgReject"
      @ok="this.msgOkFunction"
      @accept="this.msgAcceptFunction"
      @reject="this.msgRejectFunction"
    />

  </div>

</template>

<script>

import ClientStorage from './js/clientStorage.js'
import Cst from './js/constants.js'
import jwt_decode from 'jwt-decode'
import LoadingModal from './components/LoadingModal.vue'
import PageLoggedLayout from './components/PageLoggedLayout.vue'
import Requests from './js/requests.js'
import MsgModal from './components/MsgModal.vue'
import Utils from './js/utils.js'

export default {

  name: 'App',
  
  components: {
    LoadingModal,
    PageLoggedLayout,
    MsgModal
  },

  data() {
    return {
      isLoadingModalEnabled: false,
      msgType: 'ok',
      msgTitle: 'Title',
      msgInfo: 'Message',
      msgAccept: false,
      msgReject: false,
      msgOkFunction: null,
      msgAcceptFunction: null,
      msgRejectFunction: null,
      isMessageModalEnabled: false,
      createdDone: false,
      mountedDone: false,
      userLoggedData: null,
      pageLoggedName: 'Home',
      pageParams: null,
      isJwtExpired: true,
      jwt: null
    }
  },

  async created(){
    
    await this.getOrUpdateGetJwt();
    this.setJwtExpiresInterval();
    
    await this.setUserLogged();
    if(this.userLoggedData != null){
      this.$router.push({ name: 'home' });
    }

    this.createdDone = true;
  },

  mounted(){
    this.startCssDynamicVars();
    this.mountedDone = true;
  },

  watch:{
    $route(to, from){
      let viewName = to.name;
      if( (this.userLoggedData == null || ClientStorage.getJwtToken() == null) && viewName != 'login' && viewName != 'cadastro'){
        this.$router.push({ name: 'login' });
      }
    }
  },

  methods: {

    /** Render methods **/
    renderView(viewName, viewParams = null){
      this.pageParams = null;
      if(this.userLoggedData == null && viewName != 'login' && viewName != 'cadastro'){
        this.$router.push({ name: 'login' });
      }
      else{
        if(viewParams != null){
          this.pageParams = viewParams;
          this.$router.push({ name: viewName });
        }
        else{
          this.$router.push({ name: viewName });
        }
      }
    },
    renderMsg(msgType, msgTitle, msgInfo, msgOkFunction = null, msgAcceptFunction = null, msgRejectFunction = null){
      this.msgType = msgType;
      this.msgTitle = msgTitle;
      this.msgInfo = msgInfo;
      this.msgAccept = msgAcceptFunction == null ? false : true;
      this.msgReject = msgRejectFunction == null ? false : true;
      this.msgOkFunction = msgOkFunction;
      this.msgAcceptFunction = msgAcceptFunction;
      this.msgRejectFunction = msgRejectFunction;
      
      this.isMessageModalEnabled = true;
    },
    renderRequestErrorMsg(vreturn, knownMsgs){

      var isKnownMsg = false;

      if(vreturn && vreturn['response']){
        knownMsgs.forEach(knownMsg => {
          if(!isKnownMsg && vreturn['response']['message'] == knownMsg){
            this.renderMsg('warn', '', vreturn['response']['message']);
            isKnownMsg = true;
          }
        });
      }
      
      if(!isKnownMsg){

        if(vreturn && vreturn['response'] && vreturn['status'] == 401){
          let self = this;
          this.renderMsg('warn', 'Login Expirado', ['Por favor realize o login novamente'], function () { self.$root.renderView('login'); });
        }
        else{
          var errorMsgs = ['Um erro ocorreu, notificar a equipe técnica as informações abaixo:'];

          if(typeof vreturn === 'string'){
            errorMsgs.push(vreturn);
          }
          else{
            if(vreturn['location']){
              errorMsgs.push(vreturn['location']);
            }
            if(vreturn['response']){
              if(vreturn['response']['message']){
                errorMsgs.push(vreturn['response']['message']);
              }
              else{
                errorMsgs.push( Utils.getJsonKeyTree(vreturn['response']) );
              }
            }
            if(vreturn['message']){
              errorMsgs.push(vreturn['message']);
            }
            if(vreturn['method']){
              errorMsgs.push(vreturn['method']);
            }
          }
          this.renderMsg('error', '', errorMsgs);
        }
      }
    },
    /**  **/

    /** set global variables methods **/
    startCssDynamicVars(){
      let pageWrapper = document.getElementById('pageWrapper');
      let viewportWidth = document.documentElement.clientWidth;
      
      /* Css colors */
      Cst.DYNAMIC_CSS_COLORS.forEach(cssColor => {
        pageWrapper.style.setProperty(cssColor['label'], cssColor['value']);
      });
      
      /* Desktop css font sizes */
      if(viewportWidth >= Cst.VIEWPORT_CHANGE_SIZE){
        Cst.DYNAMIC_TEXT_SIZES_DESKTOP.forEach(cssSize => {
          pageWrapper.style.setProperty(cssSize['label'], cssSize['value']);
        });
      }
      /* Mobile css font sizes */
      else{
        Cst.DYNAMIC_TEXT_SIZES_MOBILE.forEach(cssSize => {
          pageWrapper.style.setProperty(cssSize['label'], cssSize['value']);
        });
      }
    },
    async setUserLogged(){

      if(this.jwt != null && this.userLoggedData == null){

        let decoded = jwt_decode(this.jwt);
        let vreturn = await this.doRequest(Requests.getUser, [ decoded['token_user_id'] ]);
        let user = vreturn['response'];

        if(user && user['id']){
          this.userLoggedData = user;
        }
      }
    },
    setPageLoggedName(name){
      this.pageLoggedName = name;
    },
    /**  **/

    /** JWT control methods **/
    async getOrUpdateGetJwt(){

      this.jwt = ClientStorage.getJwtToken();

      if(this.jwt != null && this.isJwtExpired){

        let vreturn = await this.doTokenUpdateRequest(this.jwt);
        if( vreturn && vreturn['ok'] ) {
          this.isJwtExpired = false;
          this.jwt = ClientStorage.getJwtToken();
        }
        else{
          this.jwt = null;
        }
      }
      return this.jwt;
    },
    setJwtExpiresInterval() {
      var self = this;
      setTimeout( function(){ self.setJwtExpired(); }, 100000 );
    },
    setJwtExpired() {
      this.isJwtExpired = true;
      var self = this;
      setTimeout( function(){ self.setJwtExpired(); }, 10000 );
    },
    /** **/

    /** Requests methods **/
    async doLoginRequest(user_mail, user_password, keep_jwt_local){

      try{
        this.isLoadingModalEnabled = true;

        var vreturn = await Requests.doLoginAuthentication(user_mail, user_password);
        
        if( vreturn && vreturn['response'] && vreturn['response']['token_jwt'] ){
          
          ClientStorage.setJwtToken( vreturn['response']['token_jwt'], keep_jwt_local );
          this.jwt = ClientStorage.getJwtToken();
          this.isJwtExpired = false;

          await this.setUserLogged();

          return vreturn;
        }
        else{
          ClientStorage.removeJwtToken();
          vreturn['method'] = 'Return in doLoginRequest: data null'
          return vreturn;
        }
      }
      catch(error){
        ClientStorage.removeJwtToken();
        vreturn['method'] = 'Exception in doLoginRequest method: ' + error.message;
        return vreturn;
      }
      finally{
        this.isLoadingModalEnabled = false;
      }
    },
    async doTokenUpdateRequest(old_jwt){
      
      try{
        this.isLoadingModalEnabled = true;

        let vreturn = await Requests.doTokenAuthentication(old_jwt);
        
        if(vreturn && vreturn['response'] && vreturn['response']['token_jwt']){
          
          ClientStorage.updateJwtToken( vreturn['response']['token_jwt'] );
          this.jwt = ClientStorage.getJwtToken();
          this.isJwtExpired = false;
          
          return vreturn;
        }
        else{
          ClientStorage.removeJwtToken();
          
          vreturn['method'] = 'Return in doTokenUpdateRequest: data null';
          return vreturn;
        }
      }
      catch(error){
        vreturn['method'] = 'Exception in doTokenUpdateRequest method: ' + error.message;
        return vreturn;
      }
      finally{
        this.isLoadingModalEnabled = false;
      }
    },
    async doRequest(requestF, requestArgs, doAuth = true){

      var vreturn = {};

      try{
        this.isLoadingModalEnabled = true;

        // if the token expires before request is send, update token
        if(doAuth && this.isJwtExpired){
          let tmp = await this.getOrUpdateGetJwt();
          if(tmp == null){
            throw 'Error trying to authenticate first in doRequest!';
          }
        }

        vreturn = await requestF(this.jwt, requestArgs);

        // if the token expires in same moment of an failed request, update token and redo request
        if( doAuth && this.isJwtExpired && ( !vreturn || !vreturn['ok'])){
          let tmp = await this.getOrUpdateGetJwt();
          if(tmp != null){
            vreturn = await requestF(this.jwt, requestArgs);
          }
          else{
            throw 'Error trying to authenticate second in doRequest!';
          }
        }

        return vreturn;
      }
      catch(error){
        vreturn['method'] = 'Exception in doRequest method: ' + error.message;
        return vreturn;
      }
      finally{
        this.isLoadingModalEnabled = false;
      }
    }
    /** **/
  }
}
</script>

<style>

#pageWrapper {
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 500;
  font-size: 18px;
}
@media (min-width: 1201px) {
  .shownOnlyOnMobile{
    display: none !important;
  }
}
@media (max-width: 1200px) {
  .shownOnlyOnNotMobile{
    display: none !important;
  }
}

</style>

<style scoped>

#pageWrapper {
  margin: 0px;
  padding: 0px;
  min-width: (100% - 10px);
  min-height: 100vh;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: var(--color-gray1);
}

</style>