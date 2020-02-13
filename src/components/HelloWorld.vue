<template>
  <div>
    <Card :content="content"/>
  </div>
</template>

<script>
import Card from './Whoosh/Card'
export default {
  name: 'HelloWorld',
  components: { Card },
  props: {
    msg: String
  },
  data(){
    return{
      content:{title:"My name is "+this.id,
               message:"This is my message "
           }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
