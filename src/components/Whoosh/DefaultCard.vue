<template>
  <transition name="slide-fade">
    <ExpandedCard 
      v-if="expand" 
      @expandDefault="expandDefault" 
      :data="expandable" 
      :defaultContent="content" 
      :defStyle="mainStyle"
      :fill="fill" 
      :statusColor="statusColor"
      :display="display"
    />
    <Card
      v-else
      :mainStyle="mainStyle"
    >
      <More 
        @click="expandDefault" 
        :display="display" 
        :expand="expand" 
        :color="buttonColor" 
        v-if="expandable"
      />
      <Progress
        class="progressdefault"
        :progress="moveProgress"
        v-if="!closeOnClick"
        :color="progressColor"
      />
      <div class="default-noti" @click="$emit('click')" 
      @mouseover="paused = true"
      @mouseleave="paused = false">
        <Status :display="display" :height="setStatusHeight" :fill="fill" :statusColor="statusColor"/>
        <div
          class="default__body"
          :class="{ 'default__body-left': display === 'left' && !fill }"
        >
          <div class="default__title" v-if="content.title" :style="titleStyle">
            {{ content.title }}
          </div>
          <div
            class="default__message"
            v-if="content.message"
            :style="messageStyle"
          >
            {{ content.message }}
          </div>
        </div>
      </div>
    </Card>
  </transition>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import { isCustomStatusesDefined, TimerCup } from "./Util";
import { DEFAULT_HEIGHT, MARGIN_GAP, status } from "./Constant";
import { CardContent,expandData } from "../types/index";
import Progress from "./Progress.vue";
import More from "./More.vue";
import Card from "./Card.vue";
import ExpandedCard from "./ExpandedCard.vue";
import Status from "./Status.vue";

@Component({
  components: {
    Progress,
    Card,
    ExpandedCard,
    More,
    Status
  }
})
export default class DefaultCard extends Vue {
  @Prop({ type: Number, default: 0 }) private position!: number;
  @Prop({ type: Array, required: true }) private list!: Array<CardContent>;
  @Prop({ type: Object, required: true }) private content!: CardContent;
  @Prop({ type: Number, required: true }) private masterDuration!: number;
  @Prop({ type: Boolean, required: false }) private closeOnClick!: boolean;
  @Prop({ type: Boolean, required: false }) private fill!: boolean;
  @Prop({ type: Object, required: false }) private expandable!: expandData;
  @Prop({ type: String, required: false }) private textColor!: string;
  @Prop({ type: Object, required: false }) private messageStyle!: object;
  @Prop({ type: Object, required: false }) private titleStyle!: object;
  @Prop({ type: String, required: false }) private progressColor!: string;
  @Prop({ type: Object, required: true }) private size!: CardContent["size"];
  @Prop({
    type: String,
    required: true,
    validator: value => {
      return value === "right" || value === "left";
    }
  })
  private display!: "right" | "left";

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  timer: any = {
    getTimeLeft: () => {
      return 0;
    }
  };
  paused = false;
  now = 0;
  expand = false;

  get mainStyle() {
    return {
      "margin-bottom": this.setMargin,
      color: this.textColor,
      "background-color": this.fill ? this.statusColor : "white",
      width: this.setWidth,
      height: this.setHeight,
      [this.display]: "10px"
    };
  }

  get moveProgress() {
    const total = this.useDuration() * 1000; //1000 = 1 seconds;
    return ((total - this.now) / total) * 100;
  }

 get buttonColor(){
    return this.expandable.buttonColor ? this.expandable.buttonColor : this.mainStyle['background-color']
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
      marg = whatsBelowSize + MARGIN_GAP * this.position;
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
      return (
        this.isProgressVisible(this.content.size.height - MARGIN_GAP) + "px"
      );
    }
    return this.isProgressVisible(this.size!.height - MARGIN_GAP) + "px";
  }

  get statusColor() {
    if (isCustomStatusesDefined(this.content.statuses)) {
      const isCustom = this.content.statuses!.find(
        element => element.name === this.content.status
      );
      if (isCustom) {
        return isCustom.color;
      }
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
  useDuration(): number {
    return this.content.duration ? this.content.duration : this.masterDuration;
  }

  isProgressVisible(height: number) {
    return this.closeOnClick ? height : height - 5;
  }

  expandDefault() {
    this.expand = !this.expand;
    this.$emit("expand", this.expand);
  }

  startTimer() {
    this.timer = new TimerCup(() => {
      this.close();
    }, this.useDuration() * 1000);
    this.getSetTimeOutTimeLeft();
  }
  getSetTimeOutTimeLeft() {
    const setIntervalTRef = setInterval(() => {
      this.now = this.timer.getTimeLeft();
      if (this.now <= 0) {
        clearInterval(setIntervalTRef);
      }
    }, 17);
  }
  add(whatsBelow: CardContent) {
    let whatsBelowSize: number;
    whatsBelowSize = this.size!.height;
    whatsBelow.size && whatsBelow.size.height
      ? (whatsBelowSize = whatsBelow.size.height)
      : null;
    return whatsBelowSize;
  }
}
</script>

<style scoped>
.default {
  width: 500px;
  height: 200px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.2);
  background-color: white;
  display: inline-block;
}
.default__body {
  width: 100%;
  margin: 10px;
  text-align: left;
  font-weight: 500;
}
.default__body-left {
  margin-right: 20px;
}
.default__title {
  border-bottom: #0000001a 1px solid;
  padding-bottom: 8px;
}
.default__message {
  padding-top: 10px;
}
.progressdefault {
  position: relative;
  float: left;
}
.default-noti {
  display: flex;
  position: relative;
  float: left;
  width: 100%;
}
</style>
