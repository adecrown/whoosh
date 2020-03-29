<template>
  <div>
    <transition-group name="card">
      <DefaultCard
        v-for="(whoosh, index) in whooshList"
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
        :progressColor="progressColor"
        :messageStyle="messageStyle"
        :titleStyle="titleStyle"
        :display="display"
        :expandable="whoosh.expandable"
        @expand="removeOthers($event, whoosh)"
        :isMobile="displayMobile"
        :mobileDisplay="mobileDisplay"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import DefaultCard from "./DefaultCard.vue";
import { events } from "./helpers/events";
import { generateId } from "./helpers/Util";
import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from "./helpers/Constant";
import { Component, Prop, Vue } from "vue-property-decorator";
import { CardContent } from "../types/index";
import { isMobile } from "./helpers/Screen"

@Component({
  components: {
    DefaultCard
  }
})
export default class Whoosh extends Vue {
  show = false;
  whooshList: Array<CardContent> = [];
  pendingWhooshList: Array<CardContent> = [];
  activatePending = false;
  id = 0;
  displayMobile=false;

  @Prop({ type: Number, required: false, default: 5 })
  private duration!: number;
  @Prop({ type: Boolean, default: false }) private closeOnClick!: boolean;
  @Prop({ type: Boolean, required:false, default: false }) private fill!: boolean;
  @Prop({ type: String, required:false, default: "black" }) private textColor!: string;
  @Prop({ type: Object, required: false }) private messageStyle!: object;
  @Prop({ type: Object, required: false }) private titleStyle!: object;
  @Prop({ type: String, required: false }) private progressColor!: string;
  @Prop({
    type: Object,
    required: false,
    default: () => ({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT })
  })
  private size!: CardContent["size"];
  @Prop({
    type: String,
    required: false,
    default: "right",
    validator: value => {
      return value === "right" || value === "left";
    }
  })
  private display!: "right" | "left";
  @Prop({
    type: String,
    required: false,
    default: "top",
    validator: value => {
      return value === "top" || value === "bottom";
    }
  })
  private mobileDisplay!: "top" | "bottom";
  @Prop({ type: Boolean,required:false, default: true }) private isResponsive!: boolean;

  mounted() {
    if(this.isResponsive){
      this.displayMobile = isMobile();
      window.addEventListener('resize',this.displayMobileScreen);
    }
    events.$on("startWhoosh", this.makeAWhooshList);
  }

  beforeDestroy(){
    if(this.isResponsive) window.removeEventListener('resize',this.displayMobileScreen);
  }

  displayMobileScreen(){
    this.displayMobile = isMobile();
  }

  makeAWhooshList(event: CardContent) {
    event.id = generateId();
    (this.activatePending || this.displayMobile) && this.whooshList.length
    ? this.pendingWhooshList.push(event)
    : this.whooshList.push(event);
  }

  removeCard(event: CardContent) {
    this.whooshList = this.whooshList.filter(x => x.id !== event.id);
    event.onClose ? event.onClose() : null;
    if(this.displayMobile){
      this.whooshList = [...this.pendingWhooshList.splice(0, 1)];
    }
  }

  removeOthers(expanded: boolean, content: CardContent) {
    if (expanded) {
      this.activatePending = true;
      this.whooshList = this.whooshList.filter(x => x.id === content.id);
    } else {
      this.activatePending = false;
      this.whooshList.push(...this.pendingWhooshList);
      this.pendingWhooshList = [];
    }
  }

  actionOnClick(data: CardContent) {
    if (this.closeOnClick) {
      this.removeCard(data);
    }
  }
}
</script>

<style scoped>
.card {
  transition: all 0.5s;
}
.card-enter,
.card-leave-to {
  opacity: 0;
  transform: scale(0);
}
.card-enter-to {
  opacity: 1;
  transform: scale(1);
}
.card-move {
  opacity: 1;
  transition: all 0.5s;
}
</style>
