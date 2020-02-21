<template>
  <div id="app">
    <Card
      :content="content"
      :list="list"
      :masterDuration="masterDuration"
      :size="size"
      progressColor="red"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Card from "./components/Whoosh/Card.vue";
@Component({
  components: {
    Card
  }
})
export default class App extends Vue {
  pro = 20;
  list = [];
  masterDuration = 5;
  size = {};
  content = {
    title: "My name is go sgi sisd sidsoiosdvosdin wefewuifewfiun ",
    message: "This is my message ",
    status: "error"
  };
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
