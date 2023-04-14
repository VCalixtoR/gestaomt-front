<template>

  <div class="center boxLogin">

    <div class="top horCenter">

      <div>
        <ImgCrown width="70px" height="32px"/>
      </div>

      <div>
        <TextC colorClass="black1" fontSize="var(--text-page-title)" fontWeight="bold">
          Login
        </TextC>
      </div>
    
      <div class="divLine">
        <LineC colorClass="pink3" width="70%"/>
      </div>

      <FormC class="divForm">
        <div>
          <LabelC for="emailInput" 
            labelText="E-mail" 
            class="labelLogin"
          />
          <InputC id="emailInput" 
            ref="emailInput"
            class="inputLogin"
            name="email"
            autocomplete="on"
            @keyup.enter="doLogin"
          />
        </div>

        <div>
          <LabelC for="passInput"
            labelText="Senha"
            class="labelLogin"
          />
          <InputC id="passInput"
            ref="passInput"
            class="inputLogin"
            type="password"
            name="password"
            inputAutocomplete='on'
            @keyup.enter="doLogin"
          />
        </div>

        <div class="keepLogin alignLeft">
          <CheckboxC id="keepLog"
            name="keepLog"
            ref="keepLog"
          />
          <TextC colorClass="black2" fontSize="var(--text-small)" display="inline-block" margin="10px 10px">
            Manter login
          </TextC>
        </div>
          
        <div class="btnLogar horCenter">
          <ButtonC colorClass="pink3"
            id="btnLogin"
            label="Logar"
            width="100%"
            padding="3px 20px"
            @click="doLogin"
          />
        </div>

      </FormC>
    </div>

    <div class="bottom horCenter">
      <TextC colorClass="white" fontSize="var(--text-small)" margin="0px 10px 0px 0px">
        Ainda não possui conta?
      </TextC>
      <ButtonC colorClass="pink1"
        id="btnSign"
        fontSize="var(--text-small)"
        label="Cadastrar"
        padding="2px 20px"
        @click="this.$root.renderView('cadastro')"
      />
    </div>
  </div>

</template>

<script>

import ButtonC from '../components/ButtonC.vue'
import CheckboxC from '../components/CheckboxC.vue'
import ClientStorage from '../js/clientStorage.js'
import FormC from '../components/FormC.vue'
import ImgCrown from '../components/ImgCrown.vue'
import InputC from '../components/InputC.vue'
import LabelC from '../components/LabelC.vue'
import LineC from '../components/LineC.vue'
import TextC from '../components/TextC.vue'

export default {

  name: 'LoginView',

  components: { 
    ButtonC,
    CheckboxC,
    FormC,
    ImgCrown,
    InputC,
    LabelC,
    LineC,
    TextC
  },

  data(){
    return {}
  },

  methods: {
    async doLogin(){
      let emailV = this.$refs.emailInput.getV();
      let passV = this.$refs.passInput.getV();
      let keepV = this.$refs.keepLog.getV();

      if(!emailV.match(/.+@.+/)){
        this.$root.renderMsg('warn', 'Email inválido!', '');
        ClientStorage.removeJwtToken();
        return;
      }

      let vreturn = await this.$root.doLoginRequest(emailV, passV, keepV);

      if(vreturn && vreturn['ok']){
        this.$root.renderView('home');
      }
      else{
        ClientStorage.removeJwtToken();
        this.$root.renderRequestErrorMsg(vreturn, ['Usuário não encontrado!', 'Senha incorreta!']);
      }
    }
  }
}
</script>

<!-- style applies only to this component -->
<style scoped>

.boxLogin{
  border: 5px solid var(--color-pink3);
  border-radius: 40px;
  overflow: hidden;
  padding: 0px;
}
.center{
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
}
.labelLogin{
  display: block;
  text-align: left;
}
.inputLogin{
  display: block;
  width: 100%;
}
.top, .bottom{
  padding: 13px 30px;
  margin: 0px;
}
.top{
  background-color: var(--color-white);
}
.bottom{
  background-color: var(--color-black1);
}
.horCenter{
  text-align: center;
}
.divLine{
  margin-top: 3px;
}
.divForm div{
  margin-top: 15px;
}
.alignLeft{
  text-align: left;
}
.keepLogin{
  vertical-align: middle;
}
.keepLogin > *{
  display: inline;
  vertical-align: middle;
}
.btnLogar{
  margin-bottom: 10px;
}
@media (max-width: 1200px) {
  .boxLogin{  
    width: calc(100% - 10px);
  }
  .labelLogin{
    margin-top: 20px;
  }
  .btnLogar{
    margin-top: 30px;
  }
  .bottom{
    padding: 15px;
  }
}
@media (min-width: 1201px) {
  .boxLogin{
    width: 30%;
  }
}


</style>