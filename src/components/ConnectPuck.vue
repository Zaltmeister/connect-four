<template>
  <div class="connect-puck">
    <div :class="'player ' + playerColor" />
  </div>
</template>

<script>
export default {
  props: {
    filledWith: {
      default: 0,
      type: Number
    }
  },
  computed: {
    playerColor() {
      let color;
      if (this.filledWith === 1) {
        color = 'human';
      } else if (this.filledWith === 2) {
        color = 'computer';
      } else {
        color = 'empty';
      }
      return color;
    }
  }
};
</script>

<style lang="scss" scoped>
.connect-puck {
  .player {
    width: 50px;
    height: 50px;
    margin: 0 auto;
    border: 1px solid black;
    border-radius: 25px;
    -webkit-box-shadow: inset 2px 2px 12px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: inset 2px 2px 12px 0px rgba(0,0,0,0.75);
    box-shadow: inset 2px 2px 12px 0px rgba(0,0,0,0.75);
    &.human {
      background: red;
    }
    &.computer {
      background: blue;
    }
    &empty {
      background: white;
    }
  }
}
</style>
