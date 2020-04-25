<template>
  <Card :mainStyle="mainStyle" :id="content.id + 'whooshHeight'"  :ref="content.id + 'whooshHeight'">
    <div 
      class="simple" 
      @mouseover="paused = true"
      @mouseleave="paused = false"
    >
      <Progress
        v-if="!closeOnClick"
        class="progressdefault"
        :progress="moveProgress"
        :color="statusColor"
        :height="0.5"
      />
     <Status
      :statusStyles="statusClass"
      :display="display" 
      :statusColor="statusColor"/>
     <div class="simple-data">
       <div :class="{'simple-message__align': !heightChanged}" class="simple-message">
         <div class="simple-message__icon">
         <svg
            class="svg-more svg-more-size"
            aria-hidden="true"
            :style="{color:statusColor}"
            focusable="false"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
              <path
              fill="currentColor"
              :d="svgIcon"
            />
            </svg>
           </div>
         <div class="simple-message__text">{{content.message}}</div>
       </div>
        <div class="simple-close" @click="$emit('click')">
          <span>
            <svg
            class="svg-more svg-more-size"
            aria-hidden="true"
            focusable="false"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 352 512">
              <path
              fill="currentColor"
              :d="cancelIcon"
            />
            </svg>
          </span>
        </div>
     </div>
    </div>
  </Card>
</template>

<script lang="ts">
import { Component, Mixins, Watch,Emit} from "vue-property-decorator";
import WhooshMixIn from "../mixins/whooshMixin"
import Card from "../Card.vue"
import Status from "../Status.vue";
import {info, error,  success, cancelX} from "../helpers/svg";
import { status, MARGIN_GAP } from "../helpers/Constant";
import Progress from "../Progress.vue";
import { CardContent } from '../../types';

@Component({
  components: {
    Card,
    Status,
    Progress
  }
})
export default class Simple extends Mixins(WhooshMixIn) {

  cardStatusHeight = 0;
  cancelIcon = cancelX;
  whatsMyMargin = 0;

 
  mounted() {
    this.$nextTick(()=>{
      const myHeight = ((this.$refs[`${this.content.id}whooshHeight`] as Vue).$el as HTMLElement).offsetHeight;
      this.cardStatusHeight = myHeight;
      this.mySpace({id:this.content.id, space:myHeight})
      this.setMargin()
    })
  }

  @Emit()
  mySpace(data: object) {
    return data;
  }

  @Watch("list")
  listChanged(newVal: Array<CardContent>, old: Array<CardContent>) {
    if(newVal.length < old.length){
     //  this.setMargin()
    }
  }

  setMargin() {
       const notMe = this.list.filter((x, index) => index < this.position);
    const totalHeight = notMe.reduce((a, {id}) =>  a + this.findElement(id) , 0);
    this.whatsMyMargin = totalHeight ;
    
  }

  findElement(id: number | undefined){
   const noti =  document.getElementById(`${id}whooshHeight`);
   if(noti){
      const height = noti.getBoundingClientRect().height;
      return this.position === 0 ? height : height + MARGIN_GAP;
   }
    return 0
  }
  
  get heightChanged(){
    return this.cardStatusHeight > 70
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

  get mainStyle() {
    return {
     "margin-bottom": `${this.whatsMyMargin}px`,
      width: this.isMobile ? "80%" : "400px",
      height: "auto",
      'border-radius':'10px',
      [this.display]: "10px"
    };
  }

  get statusClass(){
    return{
      width:'5px',
      'border-radius': 0, 
      'margin-top': '0',
      'margin-left': '0px',
      'border-bottom-left-radius': '10px',
      'border-top-left-radius': '10px'
    }
  }
}
</script>

<style scoped>
.simple{
  display: flex;
  position: relative;
  float: left;
  width: 100%;
  height: 100%;
  min-height: 70px;
}

.simple-data {
  width: 100%;
  display: flex;
  background-color: #f9f7f7;
}
.simple-message {
  width: 100%;
  display: flex;
  background-color: #f9f7f7;
  padding:10px 10px 10px 15px;;
  font-family: arial;
}
.simple-message__align {
  justify-content: center;
  align-items: center;
}
.simple-close {
  width: 70px;
  background-color: #f9f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
}
.simple-close:hover {
  background-color: #F0F0F0;
  cursor: pointer;
}
.simple-message__icon {
    width: 20px;
    padding-right: 15px;
}
.simple-message__text {
    width: 100%;
    text-align: left;
}
.progressdefault {
  position: absolute;
}
.svg-more.svg-more-size {
  width: 1em;
}
.svg-more {
  display: inline-block;
  font-size: inherit;
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
</style>
