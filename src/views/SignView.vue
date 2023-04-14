<template>

  <div class='center boxSign'>

    <div class='top'>

      <div class='horCenter'>
        <div>
          <ImgCrown/>
        </div>

        <div>
          <TextC colorClass='black1' fontWeight='500' fontSize="var(--text-page-title)">
            Cadastro
          </TextC>
        </div>
      
        <div class='divLine'>
          <LineC colorClass="pink3" width='70%'/>
        </div>
      </div>

      <FormC>

        <div class='divForm'>

          <div class='formTitle'>
            <TextC colorClass="black1" fontSize='var(--text-title)'>
              Informações Cadastrais
            </TextC>
          </div>

          <div class='divInnerForm'>

            <div class="leftDiv1">
              <LabelC for="nameInput"
                labelText="Nome"
                class="leftDivLabel"
              />
              <InputC id="nameInput"
                ref="nameInput"
                class="nameInput"
                type="text"
                name="name"
                :onlyLetters="true"
                maxlength="50"
              />
            </div>
            
            <div class="rightDiv1">
              <LabelC for="birthInput"
                labelText="Data de Nascimento"
                class="rightDivLabel"
              />
              <InputC id="birthInput"
                ref="birthInput"
                class="birthInput"
                type="date"
                name="birth"
              />
            </div>
            
          </div>

          <div class='divInnerForm'>

            <div class="leftDiv1">
              <LabelC for="cpfInput"
                labelText="CPF"
                class="leftDivLabel"
              />
              <InputC id="cpfInput"
                ref="cpfInput"
                class="cpfInput"
                type="text"
                name="cpf"
                mask='###.###.###-##'
              />
            </div>

            <div class="rightDiv1">
              <LabelC for="genderSelect"
                labelText="Sexo"
                class="rightDivLabel"
              />
              <SelectC id="genderSelect"
                ref='genderSelect'
                class="genderSelect"
                colorClass="pink3"
                name="gender"
                :items="this.genderOpts"
              />
            </div>
            
          </div>

        </div>

        <div class='divForm'>

          <div class='formTitle'>
            <TextC colorClass="black1" fontSize='var(--text-title)'>
              Informações de Login
            </TextC>
          </div>

          <div class='divInnerForm'>

            <div class="leftDiv1">
              <LabelC for="emailInput"
                labelText="Email"
                class="leftDivLabel"
              />
              <InputC id="emailInput"
                ref="emailInput"
                class="emailInput"
                type="email"
                name="email"
                maxlength="50"
              />
            </div>

            <div class="rightDiv1">
              <LabelC for="phoneInput"
                labelText="Telefone"
                class="rightDivLabel"
              />
              <InputC id="phoneInput"
                ref="phoneInput"
                class="phoneInput"
                type="text"
                name="phone"
                :mask="['(##) ####-####', '(##) #####-####']"
              />
            </div>

          </div>

          <div class='divInnerForm'>

            <div class="leftDiv2">
              <LabelC for="passInput"
                labelText="Senha"
                class="leftDivLabel"
              />
              <InputC id="passInput"
                ref="passInput"
                class="passInput"
                type="password"
                name="pass"
                maxlength="18"
              />
            </div>

            <div class="rightDiv2">
              <LabelC for="passConfirmInput"
                labelText="Confirmar Senha"
                class="rightDivLabel"
              />
              <InputC id="passConfirmInput"
                ref="passConfirmInput"
                class="passConfirmInput"
                type="password"
                name="passConfirm"
                maxlength="18"
              />
            </div>

          </div>
        </div>

        <div class='btnSign horCenter'>
          <ButtonC colorClass="pink3"
            id="btnSign"
            label="Cadastrar"
            width="70%"
            padding="3px 20px"
            @click="doSign"
          />
        </div>

      </FormC>
        
    </div>

    <div class='bottom horCenter'>
      <TextC colorClass="white" fontSize='var(--text-small)' margin='0px 10px 0px 0px'>
        Já possui conta?
      </TextC>
      <ButtonC colorClass="pink1"
        id='btnLogin'
        label='Login'
        padding='2px 20px'
        fontSize='var(--text-small)'
        @click="this.$root.renderView('login')"
      />
    </div>
  </div>

</template>

<script>

import ButtonC from '../components/ButtonC.vue'
import FormC from '../components/FormC.vue'
import ImgCrown from '../components/ImgCrown.vue'
import InputC from '../components/InputC.vue'
import LabelC from '../components/LabelC.vue'
import LineC from '../components/LineC.vue'
import Requests from '../js/requests.js'
import SelectC from '../components/SelectC.vue'
import TextC from '../components/TextC.vue'

export default {

  name: 'SignView',

  components: {
    ButtonC,
    FormC,
    ImgCrown,
    InputC,
    LabelC,
    LineC,
    SelectC,
    TextC
  },

  data() {
    return {
      genderOpts: [
        { label: 'Feminino', value: 'F' },
        { label: 'Masculino', value: 'M' }
      ]
    }
  },

  methods: {
    async doSign(){
      
      let name = this.$refs.nameInput.getV();
      let birth = this.$refs.birthInput.getV();
      let cpf = this.$refs.cpfInput.getV().replaceAll(/\.|\-/g, '');
      let cgender = this.$refs.genderSelect.getV();
      let email = this.$refs.emailInput.getV();
      let phone = this.$refs.phoneInput.getV().replaceAll(/\(|\)|\-|\s/g, '');
      let pass = this.$refs.passInput.getV();
      let passConfirm = this.$refs.passConfirmInput.getV();
      
      if(name.length < 10 || name.split(' ').length < 2 || name.length > 50){
        this.$root.renderMsg('warn', 'Nome inválido!', 'Necessário de 10 a 50 caracteres com um sobrenome no mínimo.');
        return;
      }

      if(birth == null || birth == ''){
        this.$root.renderMsg('warn', 'Data de Nascimento inválida!',
          'A data deve estar no formato dd/mm/aaaa e estar no intervalo de 18 a 100 anos anteriores.');
        return;
      }

      var curDate = new Date();
      var minDateMs = new Date().setFullYear( curDate.getFullYear() - 100 );
      var maxDateMs = new Date().setFullYear( curDate.getFullYear() - 18 );
      var birthMs = new Date(birth).getTime();

      if(minDateMs > birthMs || birthMs > maxDateMs){
        this.$root.renderMsg('warn', 'Data de Nascimento inválida!',
          'A data deve estar no formato dd/mm/aaaa e estar no intervalo de 18 a 100 anos anteriores.');
        return;
      }
      
      if(cpf.length != 11){
        this.$root.renderMsg('warn', 'Cpf inválido!', '');
        return;
      }

      if(!email.match(/.+@.+/) || !/^\S*$/.test(email)){
        this.$root.renderMsg('warn', 'Email inválido!', 'O email deve conter @ e não conter espaços.');
        return;
      }
      
      if(phone.length > 0 && phone.length < 10){
        this.$root.renderMsg('warn', 'Telefone inválido!', 'O campo é opcional e está preenchido parcialmente.');
        return;
      }
      
      let passErrMsg = [];

      if(!/^\S*$/.test(pass))
        passErrMsg.push('Nao conter espaços.');
      if(!/^(?=.*[A-Z]).*$/.test(pass))
        passErrMsg.push('Conter no mínimo um caractere maiúsculo.');
      if(!/^(?=.*[a-z]).*$/.test(pass))
        passErrMsg.push('Conter no mínimo um caractere minúsculo.');
      if(!/^(?=.*[0-9]).*$/.test(pass))
        passErrMsg.push('Conter no mínimo um dígito.');
      if(!/^.{8,18}$/.test(pass))
        passErrMsg.push('Conter de 8 a 18 caracteres.');
      
      if(passErrMsg.length > 0){
        passErrMsg = ['A senha deve seguir a' + (passErrMsg.length > 1 ? 's regras:' : ' regra')].concat(passErrMsg);
        this.$root.renderMsg('warn', 'Senha inválida!', passErrMsg);
        return;
      }

      if(pass != passConfirm){
        this.$root.renderMsg('warn', 'Confirmação de senha inválida!', 'Campos senha e confirmar senha devem ser iguais.');
        return;
      }

      let vreturn = await this.$root.doRequest(
        Requests.createUser,
        [name, 'E', birth, cpf, cgender, email, phone, pass],
        false
      );

      if(vreturn && vreturn['ok']){
        let self = this;
        this.$root.renderMsg('ok', 'Sucesso!', 'Para acessar o sistema um administrador deve aprovar seu cadastro.', function () { self.$root.renderView('login'); });
      }
      else{
        this.$root.renderRequestErrorMsg(vreturn, ['Cpf já utilizado!', 'Email já utilizado!']);
      }
    }
  }
}
</script>

<!-- style applies only to this component -->
<style scoped>

.center{
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
}
.boxSign{
  border: 5px solid var(--color-pink3);
  border-radius: 40px;
  overflow: hidden;
  padding: 0px;
}
@media (max-width: 1200px) {
  .divInnerForm {
    padding: 0px 10px;
    margin: 0px;
  }
  .divInnerForm > *{
    margin: 10px 0px;
  }
  .boxSign{  
    width: calc(100% - 10px);
  }
  .leftDiv1, .leftDiv2, .rightDiv1, .rightDiv2{
    display: block;
    text-align: left;
  }
  .leftDiv1 > *, .leftDiv2 > *, .rightDiv1 > *, .rightDiv2 > *{
    display: block;
    width: 100%;
  }
}
@media (min-width: 1201px) {
  .boxSign{
    width: 80%;
  }
  .divInnerForm{
    margin: 17px 0px;
  }
  .leftDiv1, .leftDiv2, .rightDiv1, .rightDiv2{
    display: inline-block;
  }
  .leftDiv1 > *, .leftDiv2 > *, .rightDiv1 > *, .rightDiv2 > *{
    display: inline-block;
  }
  .leftDiv1, .leftDiv2{
    text-align: left;
  }
  .rightDiv1, .rightDiv2{
    text-align: right;
  }
  .leftDiv1{
    width: 60%;
  }
  .leftDiv2{
    width: 45%;
  }
  .rightDiv1{
    width: 40%;
  }
  .rightDiv2{
    width: 55%;
  }
  .leftDivLabel{
    min-width: 60px;
  }
  .rightDivLabel{
    margin-right: 10px;
  }
  .nameInput, .emailInput{
    width: 70%;
  }
  .birthInput, .genderSelect, .cpfInput, .phoneInput{
    width: 150px;
  }
  .passInput, .passConfirmInput{
    width: 250px;
  }
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
.formTitle{
  margin-bottom: 10px;
}
.divForm{
  clear: both;
  padding: 0px 5px;
  margin: 15px 0px;
}
.divInnerForm{
  padding: 0px 10px;
}
.btnSign{
  margin: 15px 0px;
}

</style>