<template>
  <div id="app">
    <Launch
      :content="content"
      :list="list"
      :masterDuration="masterDuration"
      :size="size"
      progressColor="red"
      :expandable="expandi"
      fill
      skin="simple"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DefaultCard from "./components/Whoosh/DefaultCard.vue";
import Launch from "./components/Whoosh/skins/Launch.vue";
@Component({
  components: {
    DefaultCard,
    Launch
  }
})
export default class App extends Vue {
  pro = 20;
  list = [{id:1},{id:2},{id:3}];
  masterDuration = 5;
  size = { height: 200 };
  content = {
    id:2,
    title: "My name is go sgi sisd sidsoiosdvosdin wefewuifewfiun ",
    message: "This is my message",
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
