<template>
  <div>
    <transition-group name="card">
      <Card
        v-for="(whoosh,index) in whooshList"
        :content="whoosh"
        :key="whoosh.id"
        :position="index"
        :list="whooshList"
        @close="removeCard"
        :masterDuration="duration"
        :closeOnClick="closeOnClick"
        @click="actionOnClick(whoosh)"
        :size="size"
        :fill="fill"
        :textColor="textColor"
      />
    </transition-group>
  </div>
</template>

<script>
import Card from './Card'
import { events } from './events.js'
import { generateId } from './Util'
import {DEFAULT_WIDTH,DEFAULT_HEIGHT} from './Constant'
export default {
  name: 'Whoosh',
  components: { Card },
  data() {
    return {
      show: false,
      whooshList: [],
      id: 0
    }
  },
  props: {
    duration: {
      type: Number,
      required: false,
      default: 5 // 5 seconds
    },
    closeOnClick: {
      type: Boolean,
      required: false,
      default: false
    },
    fill: {
      type: Boolean,
      required: false,
      default: false
    },
    textColor: {
      type: String,
      required: false,
      default: 'black'
    },
    size:{
      type: Object,
      required: false,
      default: () => {
        return{
          width:DEFAULT_WIDTH,
          height:DEFAULT_HEIGHT
        }
      }
    }
  },
  mounted() {
    events.$on('startWhoosh', this.makeAWhooshList);
  },
  methods: {
    makeAWhooshList(event) {
      event.id = generateId();
      this.whooshList.push(event)
    },
    removeCard(event) {
      this.whooshList = this.whooshList.filter(x => x.id !== event.id)
    },
    actionOnClick(data) {
      if (this.closeOnClick) {
        this.removeCard(data)
      }
    }
  }
}
</script>

<style scoped>
.card {
  transition: all 0.5s;
}
.card-enter, .card-leave-to {
  opacity: 0;
  transform: scale(0);
}
.card-enter-to {
  opacity: 1;
  transform: scale(1);
}
.card-leave-active {	
  /*position: absolute;*/	
}
.card-move {
  opacity: 1;
  transition: all 0.5s;
}
</style>