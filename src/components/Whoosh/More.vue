<template>
  <div 
  class="more" 
  :class="{ 'more-left': display === 'left','more-right': display === 'right' }" 
  @click="$emit('click')" :style="{'background-color':color}"
  >
    <svg
      class="svg-more svg-more-size"
      aria-hidden="true"
      focusable="false"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path
        v-if="!expand"
        fill="currentColor"
        d="M212.686 315.314L120 408l32.922 31.029c15.12 15.12 4.412 40.971-16.97 40.971h-112C10.697 480 0 469.255 0 456V344c0-21.382 25.803-32.09 40.922-16.971L72 360l92.686-92.686c6.248-6.248 16.379-6.248 22.627 0l25.373 25.373c6.249 6.248 6.249 16.378 0 22.627zm22.628-118.628L328 104l-32.922-31.029C279.958 57.851 290.666 32 312.048 32h112C437.303 32 448 42.745 448 56v112c0 21.382-25.803 32.09-40.922 16.971L376 152l-92.686 92.686c-6.248 6.248-16.379 6.248-22.627 0l-25.373-25.373c-6.249-6.248-6.249-16.378 0-22.627z"
      />
      <path
        v-else
        fill="currentColor"
        d="M4.686 427.314L104 328l-32.922-31.029C55.958 281.851 66.666 256 88.048 256h112C213.303 256 224 266.745 224 280v112c0 21.382-25.803 32.09-40.922 16.971L152 376l-99.314 99.314c-6.248 6.248-16.379 6.248-22.627 0L4.686 449.941c-6.248-6.248-6.248-16.379 0-22.627zM443.314 84.686L344 184l32.922 31.029c15.12 15.12 4.412 40.971-16.97 40.971h-112C234.697 256 224 245.255 224 232V120c0-21.382 25.803-32.09 40.922-16.971L296 136l99.314-99.314c6.248-6.248 16.379-6.248 22.627 0l25.373 25.373c6.248 6.248 6.248 16.379 0 22.627z"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class More extends Vue {
  @Prop({ type: Boolean, required: false }) private expand!: boolean;
  @Prop({ type: String, required: false }) private color!: string;
  @Prop({ type: String, required: false , default:"left"}) private display!: string;
}
</script>

<style scoped>
.more {
  position: absolute;
  background-color: white;
  margin-top: 20px;
  width: 25px;
  text-align: center;
  padding-bottom: 5px;
  padding-top: 5px;
  cursor: pointer;
  padding: 5px;
}
.more-left{
  right: -25px;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.2);
}
.more-right{
  left: -25px;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
  box-shadow: -2px 1px 3px 0px rgba(0, 0, 0, 0.2);
}
.more-left:hover {
  right: -30px;
  width: 30px;
}
.more-right:hover {
  left: -30px;
  width: 30px;
}
.svg-more.svg-more-size {
  width: 0.875em;
}
.svg-more {
  display: inline-block;
  font-size: inherit;
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
</style>
