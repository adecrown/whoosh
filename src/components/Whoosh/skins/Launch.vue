<template>
 <Card  :mainStyle="mainStyle" class="launch" :class="{'show': show}">
   <div class="icon" :style="IconStyle"> 
       <span>
            <svg
            class="svg-more svg-more-size"
            aria-hidden="true"
            focusable="false"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
              <path
              fill="currentColor"
              :d="svgIcon"
            />
            </svg> 
        </span>
    </div>
   <div class="message">{{content.message}}</div>
  </Card>
</template>

<script lang="ts">
import { Component, Mixins} from "vue-property-decorator";
import WhooshMixIn from "../mixins/whooshMixin"
import Card from "../Card.vue"
import {info, error,  success} from "../helpers/svg";
import { status } from "../helpers/Constant";

@Component({
  components: {
    Card
  }
})
export default class Launch extends Mixins(WhooshMixIn) {
   show = true;

   mounted(){ 
       setTimeout(this.setFalse, 4950);
   }
   get IconStyle(){
       return {
       'background-color': this.statusColor
       }
   }
   get mainStyle(){
       return{
           width:"fit-content"
       }
   }

    get svgIcon(){
      switch (this.content.status) {
      case status.success:
        return success;
      case status.error:
        return error;
      default:
        return info;
    }
  }

   setFalse(){
       this.show = false;
       this.close()
   }
  }
</script>

<style scoped>
.launch {
    visibility: hidden;
    max-width: 50px;
    height: 50px;
    margin: auto;
    background-color: #f9f7f7;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    position: fixed;
    z-index: 9999;
    left: 0;right:0;
    bottom: 30px;
    font-size: 17px;
    white-space: nowrap;
    overflow: hidden;
}
.launch .icon{
	width: 50px;
	height: 50px;
    float: left;
    padding-top: 16px;
    padding-bottom: 16px;
    box-sizing: border-box;
}
.launch .message{
    color: #545252;
    padding: 16px;
    overflow:hidden;
	white-space: nowrap;
    text-overflow: ellipsis;
    background-color: #f9f7f7;
}

.launch.show {
    visibility: visible;
    -webkit-animation: fadein 0.5s, expand 0.5s 0.5s,stay 3s 1s, shrink 0.5s 2s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, expand 0.5s 0.5s,stay 3s 1s, shrink 0.5s 4s, fadeout 0.5s 4.5s;
}

.svg-more.svg-more-size {
   width: 1em;
}
.svg-more {
  display: inline-block;
  font-size: inherit;
  height: 1em;
  overflow: visible;
  vertical-align: -.125em;
}

@-webkit-keyframes fadein {
    from {bottom: 0; opacity: 0;} 
    to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes expand {
    from {min-width: 50px} 
    to {max-width: 70%}
}

@keyframes expand {
    from {min-width: 50px}
    to {max-width: 70%}
}
@-webkit-keyframes stay {
    from {max-width: 70%} 
    to {max-width: 70%}
}

@keyframes stay {
    from {max-width:70%}
    to {max-width: 70%}
}
@-webkit-keyframes shrink {
    from {max-width: 70%;} 
    to {min-width: 50px;}
}

@keyframes shrink {
    from {max-width:70%;} 
    to {min-width: 50px;}
}

@-webkit-keyframes fadeout {
    from {bottom: 30px; opacity: 1;} 
    to {bottom: 60px; opacity: 0;}
}

@keyframes fadeout {
    from {bottom: 30px; opacity: 1;}
    to {bottom: 60px; opacity: 0;}
}
</style>