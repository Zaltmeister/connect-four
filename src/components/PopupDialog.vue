<template>
  <div class="popup-dialog">
    <h2>{{ dialogAlert }}</h2>
    <button v-if="gameEnd" @click="emitReset()">Play another game</button>
  </div>
</template>

<script>
export default {
  props: {
    dialogAlert: {
      default: '',
      type: String
    },
    gameEnd: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    emitReset() {
      this.$emit('resetGame', this.col);
    }
  }
};
</script>

<style lang="scss" scoped>
.popup-dialog {
  position: absolute;
  z-index: 12;
  background: white;
  border: 1px solid black;
  padding: 20px;
  -webkit-box-shadow: 2px 2px 50px 40px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 2px 2px 50px 40px rgba(0, 0, 0, 0.75);
  box-shadow: 2px 2px 50px 40px rgba(0, 0, 0, 0.75);
}
</style>
