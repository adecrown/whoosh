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

<script lang="ts">
import Card from './Card.vue'
import { events } from './events'
import { generateId } from './Util'
import {DEFAULT_WIDTH,DEFAULT_HEIGHT} from './Constant'
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import {CardContent} from '../types/index' ;
@Component({
  components: {
    Card
  }
})
export default class Whoosh extends Vue{

      show = false;
      whooshList: Array<CardContent> = [];
      id = 0;

  @Prop({ required: false,default:5 }) private duration!: number; 
  @Prop({ default: false }) private closeOnClick!: boolean ;
  @Prop({ default: false }) private fill!: boolean;
  @Prop({ default: 'black' }) private textColor!: string;
  @Prop({ required: false ,default:{width:DEFAULT_WIDTH,
          height:DEFAULT_HEIGHT}}) private size!: CardContent["size"];
  
  mounted() {
    events.$on('startWhoosh', this.makeAWhooshList);
  }

    makeAWhooshList(event: CardContent) {
      event.id = generateId();
      this.whooshList.push(event)
    }
    removeCard(event: CardContent) {
      this.whooshList = this.whooshList.filter(x => x.id !== event.id)
    }
    actionOnClick(data: CardContent) {
      if (this.closeOnClick) {
        this.removeCard(data)
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