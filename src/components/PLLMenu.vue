<template>

  <div class="menuWrapper"
    @mouseleave='this.handleMouseOut()'
    tabindex="0">

    <div>

      <div class="menuTitleWrapper">

        <div class="menuBarsWrapper">
          <font-awesome-icon class="shownOnlyOnMobile menuBars"
            icon="fa-solid fa-bars"
            @click="this.showMenuOnMobile = !this.showMenuOnMobile"
          />
        </div>

        <ImgCrown class="imgCrown" colorClass='white'/>

        <div class="shownOnlyOnMobile userConfigDiv">
          
          <div>
            <TextC colorClass='inherit' class='userConfigName' fontSize='var(--text-normal)' display='inline'>
              {{ this.userName }}
            </TextC>
          </div>
          
          <div class="userConfigIconDiv">
            <font-awesome-icon class="userConfigIcon" 
              icon="fa-solid fa-list"
              @click="this.$emit('modifyUserInfo')"
            />
          </div>

          <div class="userConfigIconDiv">
            <font-awesome-icon class="userConfigIcon" 
              icon="fa-solid fa-right-from-bracket"
              @click="this.$emit('userSignOut')"
            />
          </div>
        
        </div>
        
        <div class="shownOnlyOnNotMobile menuTitle">
          <TextC colorClass="white">
            Gestão<br>MissTeen
          </TextC>
        </div>
      </div>

      <div class="shownOnlyOnNotMobile">
        <LineC colorClass="pink3" width="70%"/>
      </div>
      
      <div class="iMenuWrapper" v-show="!this.isOnMobyle || (this.isOnMobyle && this.showMenuOnMobile)">

        <div v-for="(item, index) in items" :key="index">
          <div class="itemContainer" v-show="!item.admAcessOnly || this.$root.userLoggedData['type'] == 'A'"
            :id="item.label"
            :style="{
              'background-color': item.iSelected ? 'var(--color-pink2)' : 'var(--color-black1)',
              'color': item.iSelected ? 'var(--color-black1)' : 'var(--color-white)',
              'text-decoration': item.iSelected && item.subItems.length == 0 ? 'underline' : 'none'
            }">

            <div class="itemLabelContainer"
              @mouseover="item.iHover=true"
              @mouseleave="item.iHover=false"
              @click="setItemSelected(index);"
              :style="{
                'text-decoration': item.iSelected && item.subItems.length == 0 ? 'underline' : 'none',
                'font-weight': item.iHover || item.iSelected ? '600' : '500'
              }">

              <div class="itemIconDiv">
                <font-awesome-icon :icon="'fa-solid fa-' + item.faIconName"/>
              </div>
              <TextC colorClass='inherit' fontWeight='inherit' fontSize='var(--text-normal)' margin='10px' display='inline'>
                {{ item.label }}
              </TextC>
              <font-awesome-icon v-if="item.subItems.length > 0"
                :icon=" item.subItemsShow ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'"
                class="iconChevron"
              />
            </div>

            <div v-if="item.subItemsShow">
              <div v-for="(subItem, indexS) in item.subItems" :key="indexS"
                class="subItemContainer"
                :id="item.label + indexS"
                @click="setSubItemSelected(index, indexS);"
                @mouseover="subItem.sHover=true"
                @mouseleave="subItem.sHover=false"
                :style="{
                  'text-decoration': item.iSelected && subItem.sSelected ? 'underline' : 'none',
                  'font-weight': subItem.sHover || (item.iSelected && subItem.sSelected) ? '600' : '500'
                }">
                <TextC colorClass='inherit' fontWeight='inherit' fontSize='var(--text-small)' margin='10px' display='inline'>
                  {{ subItem.subLabel }}
                </TextC>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import ImgCrown from './ImgCrown.vue'
import LineC from './LineC.vue'
import TextC from './TextC.vue'
import Utils from '../js/utils.js'

export default {

  name: 'PLLMenu',

  components: {
    ImgCrown,
    LineC,
    TextC
  },

  props: {
    backgroundColor: String
  },

  data() {
    return {
      items: [
        { label: "Home", faIconName: "home", view: 'home', admAcessOnly: false, iSelected: true, iHover: false, subItemsShow: false, subItems: [] },
        { label: "Clientes", faIconName: "user", view: '', admAcessOnly: false, iSelected: false, iHover: false, subItemsShow: false, subItems: [ 
          { subLabel: "Cadastrar", view: 'cadastrocliente', sSelected: false, sHover: false }, 
          { subLabel: "Visualizar/Alterar", view: 'vercliente', sSelected: false, sHover: false } 
        ] },
        { label: "Produtos", faIconName: "suitcase", view: '', admAcessOnly: false, iSelected: false, iHover: false, subItemsShow: false, subItems: [
          { subLabel: "Cadastrar", view: 'cadastrarproduto', sSelected: false, sHover: false }, 
          { subLabel: "Visualizar/Alterar", view: 'verproduto', sSelected: false, sHover: false } 
        ] },
        { label: "Condicionais", faIconName: "arrow-right-arrow-left", view: '', admAcessOnly: false, iSelected: false, iHover: false, subItemsShow: false, subItems: [
          { subLabel: "Gerar", view: '', sSelected: false, sHover: false },
          { subLabel: "Visualizar", view: '', sSelected: false, sHover: false }
        ] },
        { label: "Vendas", faIconName: "money-bill", view: '', admAcessOnly: false, iSelected: false, iHover: false, subItemsShow: false, subItems: [
          { subLabel: "Gerar", view: '', sSelected: false, sHover: false }, 
          { subLabel: "Visualizar", view: '', sSelected: false, sHover: false }
        ] },
        { label: "Funcionários", faIconName: "users", view: 'admfuncionarios', admAcessOnly: true, iSelected: false, iHover: false, subItemsShow: false, subItems: [] },
        { label: "Histórico", faIconName: "clock-rotate-left", view: 'admeventos', admAcessOnly: true, iSelected: false, iHover: false, subItemsShow: false, subItems: [] }
      ],
      itemSelected: 0,
      subItemSelected: 0,
      isOnMobyle: false,
      showMenuOnMobile: false,
      barsHover: false
    }
  },

  created() {
    this.userName = Utils.getNameFormated(this.$root.userLoggedData['name']);
  },

  mounted() {
    window.addEventListener('resize', this.verifyOnMobile);
    this.verifyOnMobile();
  },
  unmounted() {
    window.removeEventListener('resize', this.verifyOnMobile);
  },

  methods: {

    verifyOnMobile(){
      this.isOnMobyle = Utils.isPageOnMobile();
    },
    handleMouseOut(){
      this.showMenuOnMobile = false;
    },
    setItemSelected(itemIndex){

      if(this.items[itemIndex].subItems.length == 0){

        this.items[this.itemSelected].iSelected = false;
        if(this.items[this.itemSelected].subItems.length > 0){
          this.items[this.itemSelected].subItems.forEach(subItem => {
            subItem.sSelected = false;
          });
        }

        this.itemSelected=itemIndex;
        this.items[this.itemSelected].iSelected = true;

        this.renderView(itemIndex, null);
      }
      else{
        this.items[itemIndex].subItemsShow = !this.items[itemIndex].subItemsShow;
      }
    },
    setSubItemSelected(itemIndex, subItemIndex){

      this.items[this.itemSelected].iSelected = false;
      if(this.items[this.itemSelected].subItems.length > 0){
        this.items[this.itemSelected].subItems.forEach(subItem => {
          subItem.sSelected = false;
        });
      }
      
      this.itemSelected=itemIndex;
      this.subItemSelected=subItemIndex;

      this.items[this.itemSelected].iSelected = true;
      this.items[this.itemSelected].subItems[this.subItemSelected].sSelected = true;

      this.renderView(itemIndex, subItemIndex);
    },
    renderView(itemIndex, subItemIndex){

      let viewName = subItemIndex == null ? this.items[itemIndex].view : this.items[itemIndex].subItems[subItemIndex].view;

      if(viewName != ''){
        this.$root.renderView(viewName);
      }
      
    }
  }
}
</script>

<style scoped>

@media (min-width: 1201px) {
  .menuWrapper{
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
  .menuWrapper > div{
    padding: 3%;
  }
  .iMenuWrapper{
    margin: 15px 0px 0px 0px;
  }
}
@media (max-width: 1200px) {
  .menuWrapper{
    border-radius: 0px 0px 20px 20px;
    padding: 5px 20px ;
  }
  .menuTitleWrapper{
    padding: 12px 0px;
  }
  .menuTitleWrapper > *{
    vertical-align: middle;
  }
  .menuBarsWrapper{
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  .menuBars{
    display: inline-block;
    cursor: pointer;
    color: var(--color-white);
    font-size: calc(var(--text-normal) + 3px);
  }
  .menuBars:hover{
    font-size: calc(var(--text-normal) + 4px);
  }
  .userConfigDiv{
    float: right;
    color: var(--color-white);
    width: 125px;
    height: 30px;
  }
  .userConfigDiv > *{
    display: inline-block;
    text-align: center;
    vertical-align: middle;
  }
  .userConfigIconDiv{
    margin-left: 10px;
    width: 25px;
    height: 25px;
  }
  .userConfigIcon{
    display: block;
    cursor: pointer;
    font-size: calc(var(--text-normal) + 2px);
  }
  .userConfigIcon:hover{
    cursor: pointer;
    font-size: calc(var(--text-normal) + 3px);
  }
  .iMenuWrapper{
    padding-bottom: 10px;
  }
}

.menuWrapper{
  background-color: var(--color-black1);
}
.menuTitle{
  margin: 3px 0px 12px 0px;
}
.imgCrown{
  display: inline;
}
.itemContainer{
  border-radius: 10px;
  padding: 5px 0px 5px 12px;
  margin: 7px 0px;
  line-height: calc(var(--text-normal) + 2px);
  font-size: var(--text-normal);
  text-align: left;
  cursor: pointer
}
.itemContainer > *{
  display: inline;
  vertical-align: middle;
}
.itemLabelContainer{
  display: inline-block;
  width: 100%;
}
.itemIconDiv{
  display: inline-block;
  margin: 0px;
  padding: 0px;
  text-align: center;
  width: 23px;
}
.iconChevron{
  font-size: 10px;
  float: right;
  margin: 4px 6px 0px 0px;
}
.subItemContainer{
  padding: 2px;
  margin: 5px 0px 0px 15px;
  font-size: 15px;
}

</style>