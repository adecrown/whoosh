<template>
  <div class="card" :style="mainStyle">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class Card extends Vue {
  @Prop({ type: Object, required: false }) private mainStyle!: object;
}
</script>

<style scoped>
.card {
  width: 500px;
  height: 200px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.2);
  background-color: white;
  display: inline-block;
  z-index: 9999;
}
</style>
