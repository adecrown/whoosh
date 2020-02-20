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
    },
    data() { 
      return{
       // progress:0,
        completed: false,
        tempo: 250,
      }
    },
    created() {
      //this.timer(this.tempo)
    },
    methods: 
    {
      timer(tempo) {
       // const vm = this;
        const setIntervalRef = setInterval(() =>{
          this.progress++;
          if (this.progress == 100) {
            clearInterval(setIntervalRef);
            this.completed = true;
          }
        }, tempo);
      },
      restart() {
        this.completed = false;
        this.progress = 0;
        this.timer(this.tempo);
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