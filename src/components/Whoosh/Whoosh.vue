<template>
  <div>
    <Card
      v-for="(whooshes,index) in whooshList"
      :key="index"
      :position="index"
    />
  </div>
</template>

<script>
import Card from './Card'
import { events } from './events.js'
export default {
  name: 'Whoosh',
  components: { Card },
  data() {
    return {
      show: false,
      whooshList: []
    }
  },
  mounted() {
    console.log("Mounted Whoosh")
    events.$on('startWhoosh', this.makeAWhooshList);
  },
  methods: {
    makeAWhooshList(event) {
      this.whooshList.push(event)
    }

  }
}
</script>