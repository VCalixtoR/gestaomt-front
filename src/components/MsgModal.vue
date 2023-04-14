<template>

  <div class='transparentWrapper'>

    <div class='msgBox'>

      <div class='msgTitle'>

        <div class='msgIconDiv'>

          <font-awesome-icon v-if="this.msgType == 'ok'"
            class="boxIcon"
            icon="fa-solid fa-check"
            :style="{
              'color': 'green'
            }"
          />

          <font-awesome-icon v-if="this.msgType == 'warn'"
            class="boxIcon boxIconPink"
            icon="fa-solid fa-triangle-exclamation"
          />

          <font-awesome-icon v-if="this.msgType == 'error'"
            class="boxIcon"
            icon="fa-solid fa-triangle-exclamation"
            :style="{
              'color': 'red'
            }"
          />

        </div>

        <div class='msgTitleDiv'>
          <TextC colorClass="black1" fontSize='var(--text-title)' display='inline-block'>
            {{ this.msgTitle }}
          </TextC>
        </div>
        
      </div>

      <div class="msgLine">
        <LineC colorClass="pink3" width="70%"/>
      </div>

      <div class='msgInfo' v-if="typeof this.msgInfo == 'string'">
        <TextC colorClass="black2">
          {{ this.msgInfo }}
        </TextC>
      </div>

      <div class='msgInfo' v-else v-for="(item, index) in msgInfo" :key="index">
        <TextC colorClass="black2">
          {{ item }}
        </TextC>
      </div>

      <div class='msgOkButton'>
        <ButtonC colorClass="pink3" v-if="this.msgAccept"
          id="btnmsgacc"
          label="Sim"
          padding="2px 20px"
          margin="0px 5px"
          @click="this.$root.isMessageModalEnabled = false; this.$emit('accept')"
        />
        <ButtonC colorClass="pink3" v-if="this.msgReject"
          id="btnmsgrej"
          label="Não"
          padding="2px 20px"
          margin="0px 5px"
          @click="this.$root.isMessageModalEnabled = false; this.$emit('reject')"
        />
        <ButtonC colorClass="pink3" v-if="!this.msgAccept && !this.msgReject"
          id="btnmsgok"
          label="OK"
          padding="2px 20px"
          margin="0px 5px"
          @click="this.$root.isMessageModalEnabled = false; this.$emit('ok')"
        />
      </div>

    </div>

  </div>

</template>

<script>

import ButtonC from './ButtonC.vue'
import LineC from './LineC.vue'
import TextC from './TextC.vue'

export default {

  name: 'MsgModal',

  components: {
    ButtonC,
    LineC,
    TextC
  },

  props: {
    msgType: String,
    msgTitle: String,
    msgInfo: [ Array, String ],
    msgAccept: Boolean,
    msgReject: Boolean
  }
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
  line-height: normal;
}
.msgBox{
  display: inline-block;
  margin: auto;
  border: 5px solid;
  border-radius: 40px;
  padding: 0px 20px;
  background-color: var(--color-white);
  border-color: var(--color-pink3);
}
.boxIcon{
  font-size: var(--text-title);
}
.boxIconPink{
  color: var(--color-pink3);
}
@media (max-width: 1200px) {
  .msgBox{
    max-width: 80%;
  }
}
@media (min-width: 1201px) {
  .msgBox{
    max-width: 40%;
  }
}
.msgTitle{
  margin: 20px 30px 5px 30px;
  text-align: center;
}
.msgIconDiv, .msgTitleDiv{
  display: inline-block;
}
.msgIconDiv{
  margin-right: 10px;
}
.msgLine{
  margin: 0px 0px 20px 0px;
}
.msgInfo{
  word-break: break-word;
  margin: 20px 0px;
}
.msgOkButton{
  margin: 0px 0px 20px 0px;
}

</style>