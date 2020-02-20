<template>
  <transition name="slide-fade">
    <div
      class="card"
      :style="{
        'margin-bottom': setMargin,
        color: textColor,
        'background-color': fill ? statusColor : 'white',
        width: setWidth,
        height: setHeight
      }"
      @mouseover="paused = true"
      @mouseleave="paused = false"
      @click="$emit('click')"
    >
    
    <Progress class="progressCard" :progress="moveProgress"/>
    <div class="card-noti">
      <div
        class="card__status"
        :style="{ 'background-color': statusColor, height: setStatusHeight }"
        v-if="!fill"
      ></div>
      <div class="card__body">
        <div class="card__title" v-if="content.title">{{ content.title }}</div>
        <div class="card__message" v-if="content.message">
          {{ content.message }}
        </div>
      </div>
    </div>
      
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { TimerCup, isCustomStatusesDefined } from "./Util";
import { status, DEFAULT_HEIGHT, MARGIN_GAP } from "./Constant";
import { CardContent, TimerType } from "../types/index";
import Progress from "./Progress.vue"
@Component({
  components:{
    Progress
  }
})
export default class Card extends Vue {
  @Prop({ default: 0 }) private position!: number;
  @Prop({ required: true }) private list!: Array<CardContent>;
  @Prop({ required: true }) private content!: CardContent;
  @Prop({ required: true }) private masterDuration!: number;
  @Prop({ required: false }) private closeOnClick!: boolean;
  @Prop({ required: false }) private fill!: boolean;
  @Prop({ required: false }) private textColor!: string;
  @Prop({ required: true }) private size!: CardContent["size"];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  timer: any = {getTimeLeft:() =>{return 6}};
  paused = false;
  now = 0;

  get moveProgress(){
    const total = this.useDuration() * 1000;
    const completed = ((total - this.now ) / total) * 100
    return completed
  }

  get heightWasDefined() {
    return this.content.size && this.content.size.height;
  }
  get setMargin() {
    let marg = this.position * (DEFAULT_HEIGHT + MARGIN_GAP);
    let whatsBelowSize = 0;
    const notMe = this.list.filter((x, index) => index < this.position);
    whatsBelowSize = notMe.reduce(
      (a: any, b: any) => a + (this.add(b) || 0),
      0
    );
    if (whatsBelowSize > 0) {
      marg = whatsBelowSize + MARGIN_GAP;
    }

    return this.position > 0 ? marg + "px" : "0px";
  }

  get setWidth() {
    if (this.content.size && this.content.size.width) {
      return this.content.size.width + "px";
    }
    return this.size!.width + "px";
  }
  get setHeight() {
    if (this.content.size && this.content.size.height) {
      return this.content.size.height + "px";
    }
    return this.size!.height + "px";
  }
  get setStatusHeight() {
    if (this.content.size && this.content.size.height) {
      return this.content.size.height - MARGIN_GAP + "px";
    }

    return this.size!.height - MARGIN_GAP + "px";
  }
  get statusColor() {
    if (isCustomStatusesDefined(this.content.statuses)) {
      return this.content.statuses!.find(
        element => element.name === this.content.status
      )!.color;
    }
    switch (this.content.status) {
      case status.success:
        return "#4caf50ad";
      case status.warning:
        return "#00bcd4b0";
      case status.error:
        return "#ff0000";
      default:
        return "#f7a104b5";
    }
  }

  @Emit()
  close() {
    return this.content;
  }

  mounted() {
    if (!this.closeOnClick) {
      this.startTimer();
    }
  }
  @Watch("paused")
  pausedChanged(newVal: boolean, old: boolean) {
    if (!this.closeOnClick) {
      if (newVal) {
        this.timer.pause();
      } else {
        this.timer.resume();
      }
    }
  }
  useDuration(): number{
    return this.content.duration
      ? this.content.duration
      : this.masterDuration;

  }

  startTimer() {
    this.timer = new TimerCup(() => {
      this.close();
    }, (this.useDuration() * 1000));
    this.timerP();
  }
  timerP() {
       // const vm = this;
        const setIntervalRef2 = setInterval(() =>{
          this.now = this.timer.getTimeLeft();
          if (this.now <= 0) {
            clearInterval(setIntervalRef2);
            //this.completed = true;
          }
        }, 17);
    }
  add(whatsBelow: CardContent) {
    let whatsBelowSize = 0;
    whatsBelowSize = this.size!.height;
    whatsBelow.size && whatsBelow.size.height
      ? (whatsBelowSize = whatsBelow.size.height)
      : null;
    return whatsBelowSize;
  }
}
</script>

<style scoped>
.card {
  width: 500px;
  height: 210px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.07);
  background-color: white;
  display: inline-block;
}
.card__status {
  width: 10px;
  height: 190px;
  border-radius: 20px;
  margin-top: 5px;
  margin-left: 5px;
}
.card__body {
  width: 100%;
  margin: 10px;
  text-align: left;
  font-weight: 500;
}
.card__title {
  border-bottom: #0000001a 1px solid;
  padding-bottom: 8px;
}
.card__message {
  padding-top: 10px;
}
.progressCard{
position: relative;
float: left;
}
.card-noti{
display: flex;
position: relative;
float: left;
width: 100%;
}
</style>
