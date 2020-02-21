<template>
  <div class="progress">
    <div class="progress__indicator" :style="{'width':progress+'%','background-color':color}"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class Progress extends Vue {
  @Prop({ type: Number, required: false, default: 0 })
  private progress!: number;
  @Prop({ type: String, required: false, default: "#dcd9d9" })
  private color!: string;
}
</script>

<style scoped>
.progress {
  width: 100%;
  height: 5px;
  background-color: transparent;
}
.progress__indicator {
  width: 0%;
  max-width: 100%;
  height: 5px;
  border-radius: 20px;
}
</style>