<template>
<div v-if="!fill" style="display:flex">
  <div v-if="top" class="status" :style="{ 'background-color': statusColor}"/>
  <div
    v-else
    class="status-side"
    :class="{ 'status-left': display === 'left' }"
    :style="[{ 'background-color': statusColor, height },statusStyles]"
  />
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class Status extends Vue {
  @Prop({ type: Boolean, required: false }) private fill!: boolean;
  @Prop({ type: String, required: false }) private display!: string;
  @Prop({ type: String, required: false }) private height!: string;
  @Prop({ type: String, required: false }) private width!: string;
  @Prop({ type: String, required: false }) private statusColor!: string;
  @Prop({ type: Object, required: false }) private statusStyles!: object;
  @Prop({ type: Boolean, required: false,default:false }) private top!: boolean;
}
</script>

<style scoped>
.status {
  height: 5px;
}
.status-side {
  width: 10px;
  border-radius: 20px;
  margin-top: 5px;
  margin-left: 5px;
}
.status-left {
  position: absolute;
  right: 5px;
}
</style>
