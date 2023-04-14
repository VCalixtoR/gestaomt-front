<template>

  <div style="display: inline">
    <input
      :id="this.id"
      :name="this.name"
      type="checkbox"
    >
    <label 
      :id="this.id + '_LBL'"
      :for="this.id"
      @click="this.$emit('checkBoxClicked', !this.getV());">
    </label>
  </div>

</template>

<script>

export default {

  name: 'CheckboxC',

  props: {
    id: String,
    name: String,
  },

  methods: {
    getV(){
      return document.getElementById(this.id).checked;
    },
    setV(value){
      document.getElementById(this.id).checked = value;
    }
  }
}
</script>

<!-- style applies only to this component -->
<style scoped>

input + label {
  background-color: var(--color-pink1);
  border: 1px solid var(--color-pink3);
  border-radius: 5px;
  color: var(--color-black2);
  cursor: pointer;
  display: inline;
  font-size: 14px;
  padding: 0px 3px 0px 3px;
  height: 10px;
  width: 12px;
}
input + label:after, input:checked + label:after {
  left: 0px;
  position: relative;
  top: 0px;
}
input + label:after {
  content: '\2004\2004\2004';
  font-size: 10px;
}
input:checked + label:after {
  content: '\2714';
  font-size: 12px;
}
input {
  display: none;
}

</style>