<template>

  <div class="wrapper">
    
    <div class="menuBox">
      <PLLMenu
        @modifyUserInfo="this.modifyUserInfo()"
        @userSignOut="this.userSignOut()"
      />
    </div>
    
    <div class="contentBox">

      <div>

        <div class="pageTitle">
          <TextC colorClass='inherit' fontSize="var(--text-page-title)">
            {{ this.$root.pageLoggedName }}
          </TextC>
        </div>

        <div class="userConfigButtom shownOnlyOnNotMobile">
          <TextC colorClass="black1" fontSize="var(--text-page-title)">
            {{ this.userName }}
          </TextC>
          <div class="faIconUserListDiv">
            <font-awesome-icon 
              class="faIconUserList" 
              icon="fa-solid fa-list"
              @click="this.modifyUserInfo()"
            />
          </div>

          <div class="faIconUserSignOutDiv">
            <font-awesome-icon 
              class="faIconUserSignOut" 
              icon="fa-solid fa-right-from-bracket"
              @click="this.userSignOut()"
            />
          </div>
        </div>
      </div>

      <div class="pageContent">
        <slot></slot>
      </div>
    
    </div>
    
  </div>

</template>

<script>

import ClientStorage from '../js/clientStorage.js'
import ImgCrown from './ImgCrown.vue'
import PLLMenu from './PLLMenu.vue'
import Requests from '../js/requests.js'
import TextC from './TextC.vue'
import Utils from '../js/utils.js'

export default {

  name: 'PageLoggedLayout',

  components: {
    ImgCrown,
    PLLMenu,
    TextC
  },

  created() {
    this.userName = Utils.getNameFormated(this.$root.userLoggedData['name']);
  },

  methods: {
    modifyUserInfo(){
      console.log('modify');
    },
    async userSignOut(){
      await this.$root.doRequest(Requests.deleteAuthToken, []);
      ClientStorage.removeJwtToken();
      this.$root.userLoggedData = null;
      this.$root.renderView('login');
    }
  }

}
</script>

<style scoped>

@media (min-width: 1201px) {
  .wrapper{
    width: 100%;
    line-height: 100vh;
    text-align: center;
  }
  .wrapper > *{
    vertical-align: middle;
  }
  .menuBox, .contentBox{
    padding: 0px;
    margin: 0px;
    display: inline-block;
    min-height: 620px;
    height: 95vh;
    line-height: normal;
  }
  .menuBox{
    width: 210px;
    margin-right: 1%;
    border-radius: 20px;
    text-align: center;
  }
  .contentBox{
    width: calc(100% - 210px - 2%);
    text-align: left;
  }
  .pageContent{
    height: calc(100% - 41.2px);
    padding: 40px;
    overflow: auto;
    overflow-x: hidden;
    clear: both;
  }
}
@media (max-width: 1200px) {
  .contentBox{
    margin: 10px 0px 0px 0px;
  }
  .pageContent{
    padding: 20px;
  }
}
.pageTitle, .userConfigButtom{
  font-size: var(--text-page-title);
}
.pageTitle{
  border-radius: 10px 10px 0px 0px;
  padding: 5px 10px;
  margin-left: 12px;
  display: inline-block;
  background-color: var(--color-pink3);
  color: var(--color-black1);
}
.userConfigButtom{
  float: right;
  border-radius: 15px;
  padding: 3px 10px;
  background-color: var(--color-gray2);
  color: var(--color-black1);
}
.faIconUserList{
  margin: 0px 8px;
}
.faIconUserSignOut{
  margin: 0px 11px;
}
.faIconUserListDiv, .faIconUserSignOutDiv{
  display: inline-block;
  width: 30px;
  text-align: center;
}
.faIconUserList, .faIconUserSignOut{
  font-weight: 500;
  cursor: pointer;
  font-size: calc(var(--text-title));
}
.faIconUserList:hover, .faIconUserSignOut:hover{
  font-size: calc(var(--text-title) + 1px);
}
.faIconUserList{
  margin-right: 10px;
}
.pageContent{
  border: 4px solid var(--color-pink3);
  background-color: var(--color-white);
  border-radius: 10px;
}

</style>