<template>
  <Card :mainStyle="mainStyle">
    <Status :fill="fill" :statusColor="statusColor" top/>
    <More @click="$emit('expandDefault')" :display="display" :color="buttonColor" expand/>
    <div v-if="!data.hideHeader">
      <div class="expandedCard-header" :style="defaultContent.headerStyle">
        {{defaultContent.title}}
      </div>
    </div>
    <component v-if="data.isComponent" :is="data.data"></component> 
    <div v-else>{{data.data}}</div>
  </Card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Card from "./Card.vue";
import More from "./More.vue";
import {expandStyle,expandData,CardContent} from "../types/index"
import Status from "./Status.vue";

@Component({
  components: {
    Card,
    More,
    Status
  }
})
export default class ExpandedCard extends Vue {
  @Prop({ type: Object, required: false }) private data!: expandData;
  @Prop({ type: Object, required: false }) private defaultContent!: CardContent;
  @Prop({ type: Object, required: false }) private defStyle!: expandStyle;
  @Prop({ type: String, required: false }) private statusColor!: string;
  @Prop({ type: Boolean, required: false }) private fill!: boolean;
  @Prop({ type: String, required: false }) private display!: string;

  get mainStyle() {
    return {
      ...this.defStyle,
      "background-color": this.data.noBackground ? "" : this.defStyle['background-color'],
      height: this.setHeight+"px",
    };
  }

  get setHeight(){
    return this.data.height? this.data.height : parseInt(this.defStyle.height.split('px')[0]) * 2;
  }

  get buttonColor(){
    return this.data.buttonColor ? this.data.buttonColor : this.mainStyle['background-color']
  }
}
</script>

<style scoped>
.expandedCard-header{
  background: #eee;
  border: 1px solid #ddd;
  padding: .5em 1rem;
  font-weight: 700;
}
</style>
