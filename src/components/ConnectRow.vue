<template>
  <div class="connect-row">
    <ConnectPuck :filled-with="filledWith" />
  </div>
</template>

<script>
import ConnectPuck from './ConnectPuck.vue';
export default {
  components: {
    ConnectPuck
  },
  props: {
    filledWith: {
      default: 0,
      type: Number
    }
  }
};
</script>
