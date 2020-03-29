<template>
  <div id="app">
    <DefaultCard
      :content="content"
      :list="list"
      :masterDuration="masterDuration"
      :size="size"
      progressColor="red"
      :expandable="expandi"
      fill
      display="left"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DefaultCard from "./components/Whoosh/DefaultCard.vue";
@Component({
  components: {
    DefaultCard
  }
})
export default class App extends Vue {
  pro = 20;
  list = [];
  masterDuration = 5;
  size = { height: 200 };
  content = {
    title: "My name is go sgi sisd sidsoiosdvosdin wefewuifewfiun ",
    message: "This is my message ",
    status: "error"
  };
  expandi = {
    data: "Just us",
    noBackground: true
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
