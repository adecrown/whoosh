<template>
  <transition>
    <transition name="mobile-fade" v-if="isMobile">
      <Mobile 
        @click="$emit('click')" 
        :textColor="textColor" 
        :content="content" 
        :statusColor="statusColor"
        :position="position"
        :closeOnClick="closeOnClick"
        :progressColor="progressColor"
        :moveProgress="moveProgress"
        :mobileDisplay="mobileDisplay"
      />
    </transition>
    <transition name="slide-fade" v-else>
      <ExpandedCard 
        v-if="expand" 
        @expandDefault="expandDefault" 
        :data="expandable" 
        :defaultContent="content" 
        :defStyle="mainStyle"
        :fill="fill" 
        :statusColor="statusColor"
        :display="display"
      />
      <Card
        v-else
        :mainStyle="mainStyle"
      >
        <More 
          @click="expandDefault" 
          :display="display" 
          :expand="expand" 
          :color="buttonColor" 
          v-if="expandable"
        />
        <Progress
          class="progressdefault"
          :progress="moveProgress"
          v-if="!closeOnClick"
          :color="progressColor"
        />
        <div class="default-noti"  :id="content.id+'whooshHeight'" @click="$emit('click')" 
        @mouseover="paused = true"
        @mouseleave="paused = false">
          <Status :display="display" :height="setStatusHeight" :fill="fill" :statusColor="statusColor"/>
          <div
            class="default__body"
            :class="{ 'default__body-left': display === 'left' && !fill }"
          >
            <div class="default__title" v-if="content.title" :style="titleStyle">
              {{ content.title }}
            </div>
            <div
              class="default__message"
              v-if="content.message"
              :style="messageStyle"
            >
              {{ content.message }}
            </div>
          </div>
        </div>
      </Card>
    </transition>
  </transition>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { DEFAULT_HEIGHT, MARGIN_GAP } from "./helpers/Constant";
import { CardContent } from "../types/index";
import Progress from "./Progress.vue";
import More from "./More.vue";
import Card from "./Card.vue";
import ExpandedCard from "./ExpandedCard.vue";
import Status from "./Status.vue";
import Mobile from "./Mobile.vue";
import WhooshMixIn from "./mixins/whooshMixin"

@Component({
  components: {
    Progress,
    Card,
    ExpandedCard,
    More,
    Status,
    Mobile
  }
})
export default class DefaultCard extends Mixins(WhooshMixIn) {
  
  expand = false;

  get mainStyle() {
    return {
      "margin-bottom": this.setMargin,
      color: this.textColor,
      "background-color": this.fill ? this.statusColor : "white",
      width: this.setWidth,
      height: this.setHeight,
      [this.display]: "10px"
    };
  }

  get buttonColor(){
    return this.expandable.buttonColor ? this.expandable.buttonColor : this.mainStyle['background-color']
  }

  get setMargin() {
    let marg = this.position * (DEFAULT_HEIGHT + MARGIN_GAP);
    let whatsBelowSize = 0;
    const notMe = this.list.filter((x, index) => index < this.position);
    whatsBelowSize = notMe.reduce(
      (a: any, b: any) => a + (this.add(b) || 0),
      0
    );
    if (whatsBelowSize > 0) {
      marg = whatsBelowSize + MARGIN_GAP * this.position;
    }
    return this.position > 0 ? marg + "px" : "0px";
  }

  get setWidth() {
    if (this.content.size && this.content.size.width) {
      return this.content.size.width + "px";
    }
    return this.size!.width + "px";
  }

  get setHeight() {
    if (this.content.size && this.content.size.height) {
      return this.content.size.height + "px";
    }
    return this.size!.height + "px";
  }

  get setStatusHeight() {
    if (this.content.size && this.content.size.height) {
      return (
        this.isProgressVisible(this.content.size.height - MARGIN_GAP) + "px"
      );
    }
    return this.isProgressVisible(this.size!.height - MARGIN_GAP) + "px";
  }

  isProgressVisible(height: number) {
    return this.closeOnClick ? height : height - 5;
  }

  expandDefault() {
    this.expand = !this.expand;
    this.$emit("expand", this.expand);
  }

 
  add(whatsBelow: CardContent) {
    let whatsBelowSize: number;
    whatsBelowSize = this.size!.height;
    whatsBelow.size && whatsBelow.size.height
      ? (whatsBelowSize = whatsBelow.size.height)
      : null;
    return whatsBelowSize;
  }
}
</script>

<style scoped>
.default {
  width: 500px;
  height: 200px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.2);
  background-color: white;
  display: inline-block;
}
.default__body {
  width: 100%;
  margin: 10px;
  text-align: left;
  font-weight: 500;
}
.default__body-left {
  margin-right: 20px;
}
.default__title {
  border-bottom: #0000001a 1px solid;
  padding-bottom: 8px;
}
.default__message {
  padding-top: 10px;
}
.progressdefault {
  position: relative;
  float: left;
}
.default-noti {
  display: flex;
  position: relative;
  float: left;
  width: 100%;
  height: 100%;
}
</style>
