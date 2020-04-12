import { Component, Watch, Emit, Mixins } from 'vue-property-decorator';
import { isCustomStatusesDefined } from "../helpers/Util";
import { status } from "../helpers/Constant";
import { TimerCup } from "../helpers/Util";
import SharerMixin from "./SharerMixin"

@Component
export default class WhooshMixIn extends Mixins(SharerMixin) {
  public now = 0;
  public paused = false;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public timer: any = {
    getTimeLeft: () => {
      return 0;
    }
  };

  mounted() {
    if (!this.closeOnClick && this.skin !== 'launch') {
      this.startTimer();
    }
  }

  get moveProgress() {
    const total = this.useDuration() * 1000; //1000 = 1 seconds;
    return ((total - this.now) / total) * 100;
  }

  useDuration(): number {
    return this.content.duration ? this.content.duration : this.masterDuration;
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

  @Emit()
  close() {
    return this.content;
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

}