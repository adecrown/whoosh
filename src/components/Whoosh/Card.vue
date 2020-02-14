<template>
  <transition name="slide-fade">
    <div
      class="card"
      :style="{'margin-bottom':setMargin}"
      @mouseover="paused = true"
      @mouseleave="paused = false"
      @click="$emit('click')"
    >
      <div
        class="card__status"
        :style="{'background-color': statusColor}"
      ></div>
      <div class="card__body">
        <div class="card__title">{{content.title}}</div>
        <div class="card__message">{{content.message}}</div>
      </div>
    </div>
  </transition>
</template>

<script>
import { TimerCup } from './Util'
import { status } from './Constant'
import { thistle } from 'color-name';
export default {
  props: {
    position: {
      type: Number,
      required: false,
      default: 0
    },
    content: {
      type: Object,
      required: true
    },
    masterDuration: {
      type: Number,
      required: false,
      default: 0
    },
    closeOnClick: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    setMargin() {
      const marg = this.position * 210
      return this.position > 0 ? marg + 'px' : '0px'
    },
    statusColor() {
      switch (this.content.status) {
        case status.success:
          return "green";
        case status.warning:
          return "blue";
        case status.error:
          return "red";
        default:
          return "yellow";
      }
    }
  },
  data() {
    return {
      timer: {},
      paused: false,
      duration: 5, // 5 seconds
    }
  },
  mounted() {
    console.log(this.content)
    if (!this.closeOnClick) {
      this.close()
    }
  },
  watch: {
    paused(newVal, old) {
      if (!this.closeOnClick) {
        if (newVal) {
          console.log('pausedW')
          this.timer.pause()
        } else {
          console.log('resumeW')
          this.timer.resume()
        }
      }
    }
  },
  methods: {
    close() {
      const useDuration = this.content.duration ?
        this.content.duration
        :
        this.masterDuration > 0 ? this.masterDuration : this.duration
      console.log(useDuration);
      this.timer = new TimerCup(() => {
        this.$emit('close', this.content);
      }, useDuration * 1000);
    },
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
  display: flex;
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
}
.card__title {
  border-bottom: black 1px solid;
  padding-bottom: 8px;
}
.card__message {
  padding-top: 10px;
}
</style>

