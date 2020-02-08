<template>
  <button 
  @click="$emit('click')" 
  class="button" 
  :class="{button__transparent:transparent,button__fullWidth:fullWidth}"
  >
    <slot/>
</button>
</template>

<script>
export default {
  name: 'ButtonField',
  props:{
      transparent:{
          type:Boolean,
          required:false,
          default:false
      },
      fullWidth:{
          type:Boolean,
          required:false,
          default:false
      }
  }
 
}
</script>


<style scoped>
.button{
    background-color: red;
  border: 1px solid red;
  color: white;
  padding: 10px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  width: 190px;
  margin: 4px 2px;
  cursor: pointer;
      outline-color: #00c4a3;
    outline: none;
}
.button__transparent{
    background-color: transparent;
    border: 1px solid white;
}
.button__fullWidth{
    width: 100%
}

</style>
