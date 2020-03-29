<template>
  <Card :mainStyle="mainStyle" @click="$emit('click')">
    <Progress
      :class="{'mobile_progress': mobileDisplay === 'bottom'}"
      :progress="moveProgress"
      v-if="!closeOnClick"
      :color="progressColor"
    />
    <div class="mobile">
      <div class="mobile_title" v-if="content.title">{{content.title}}</div>
      <div 
        class="mobile_message" 
        :style="{'padding-top':content.title ? '10px': 0 }" 
        v-if="content.message"
      >
        {{content.message}}
      </div>
    </div>
  </Card>
</template>

<script lang="ts">
import Card from "./Card.vue"
import { Component, Vue, Prop } from "vue-property-decorator";
import { CardContent } from "../types/index";
import Progress from "./Progress.vue";

@Component({
  components: {
    Card,
    Progress
  }
})
export default class Mobile extends Vue {
  @Prop({ type: Object, required: true }) private content!: CardContent;
  @Prop({ type: String, required: false }) private textColor!: string;
  @Prop({ type: String, required: false }) private statusColor!: string;
  @Prop({ type: Boolean, required: false }) private closeOnClick!: boolean;
  @Prop({ type: String, required: false }) private progressColor!: string;
  @Prop({ type: Number, required: false }) private moveProgress!: number;
  @Prop({ type: String, required: false }) private mobileDisplay!: string;

   get mainStyle() {
    const style: any = {
      color: this.textColor,
      "background-color": this.statusColor,
      width: "100%",
      height: "max-content",
      right:0
    };
    this.mobileDisplay === "bottom" ? style.bottom = 0 : style.top = 0;
    return style;
  }

}
</script>

<style scoped>
.mobile{
  text-align: left;
  padding: 10px;
  font-family: sans-serif;
}
.mobile_title {
  font-weight: bold;
}
.mobile_message {
}
.mobile_progress{
  position: absolute;
  bottom: 0;
}
</style>
