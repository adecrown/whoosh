<template>
  <div
    class="card"
    :style="{'margin-bottom':setMargin}"
  >
    <div class="card__status"></div>
    Testings
  </div>
</template>
<script>
export default {
  props: {
    position: {
      type: Number,
      required: false,
      default: 0
    }
  },
  computed: {
    setMargin() {
      const marg = this.position * 210
      return this.position > 0 ? marg + 'px' : '0px'
    }
  },
}
</script>

<style scoped>
.card {
  width: 500px;
  height: 200px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.07);
  background-color: white;
}
.card__status {
  background-color: green;
  width: 95%;
  height: 10px;
  border-radius: 20px;
}
</style>

