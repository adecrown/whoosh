<template>
  <div>
    <transition-group name="card">
    <Card
      v-for="(whoosh,index) in whooshList"
      :content="whoosh"
      :key="whoosh.id"
      :position="index"
      @close="removeCard"
    />
    </transition-group>
  </div>
</template>

<script>
import Card from './Card'
import { events } from './events.js'
import {generateId} from './Util'
export default {
  name: 'Whoosh',
  components: { Card },
  data() {
    return {
      show: false,
      whooshList: [],
      id:0
    }
  },
  mounted() {
    console.log("Mounted Whoosh")
    events.$on('startWhoosh', this.makeAWhooshList);
  },
  methods: {
    makeAWhooshList(event) {
      event.id = generateId();
      this.whooshList.push(event)
    },
    removeCard(event){
      console.log(event)
      this.whooshList = this.whooshList.filter(x => x.id !== event.id)
      //this.whooshList.splice(event,1)
    
    }
  }
}
</script>

<style scoped>


.card {
  transition: all 0.5s;

}
.card-enter, .card-leave-to
/* .card-leave-active for <2.1.8 */ {
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