<template>
<transition name="slide-fade">
  <div
    class="card"
    :style="{'margin-bottom':setMargin}"
    @mouseover="paused = true"
    @mouseleave="paused = false"
  >
    <div class="card__status"></div>
    <div class="card__title">{{content.title}}</div>
    <div class="card__message">{{content.message}}</div>
  </div>
</transition>
</template>

<script>
import {TimerCup} from './Util'
export default {
  props: {
    position: {
      type: Number,
      required: false,
      default: 0
    },
    content:{
      type: Object,
      required: true
    }
  },
  computed: {
    setMargin() {
      const marg = this.position * 210
      return this.position > 0 ? marg + 'px' : '0px'
    }
  },
  data(){
    return{
      timer:{},
      paused:false
    }
  },
  mounted(){
    console.log(this.content)
    this.close()
  },
  watch:{
    paused(newVal,old){
      if(newVal){
        console.log('pausedW')
        this.timer.pause()
      }else{
        console.log('resumeW')
        this.timer.resume()
      }

    }
  },
  methods:{
    close(){
      const vThis = this;
      this.timer = new TimerCup(function() {
       console.log(vThis.content)
        vThis.$emit('close',vThis.content)
        }, 2000);
     /*  setTimeout(function() { 
        console.log(vThis.content)
        vThis.$emit('close',vThis.content)
      }, 5000); */
    }
  }
}
</script>

<style scoped>
.card {
  width: 500px;
  height: 200px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.07);
  background-color: white;
}
.card__status {
  background-color: green;
  width: 10px;
  height: 190px;
  border-radius: 20px;
}
</style>

