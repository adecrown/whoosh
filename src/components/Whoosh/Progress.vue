<template>
  <div class="progress">
    <div class="progress__indicator" :style="{'width':progress+'%'}">
  </div>
  </div>
</template>

<script>
  export default {
    name:'Progress',
    props:{
      progress:{
        type:Number,
        required:true
      }
    }
  }
</script>

<style scoped>
.progress{
  width: 100%;
  height: 10px;
  background-color: red
}
.progress__indicator{
  width: 0%;
  max-width: 100%;
  height: 10px;
  background-color: aquamarine
}
</style>