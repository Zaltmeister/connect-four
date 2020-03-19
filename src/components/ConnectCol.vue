<template>
  <div
    :class="'connect-col ' + hover"
    @mouseover="isHovering = true"
    @mouseout="isHovering = false"
    @click="emitColAdd"
  >
    <connect-row
      v-for="(row, index) in displayRows"
      :key="index"
      :filled-with="row"
      :col="col"
    />
  </div>
</template>

<script>
import ConnectRow from './ConnectRow.vue';
export default {
  components: {
    ConnectRow
  },
  props: {
    rows: {
      default: () => [],
      type: Array
    },
    col: {
      default: 0,
      type: Number
    },
    currentPlayer: {
      default: 1,
      type: Number
    },
    colState: {
      default: () => [],
      type: Array
    }
  },
  data() {
    return { isHovering: false, displayRows: [] };
  },
  computed: {
    hover() {
      return this.isHovering ? 'hover' : '';
    }
  },
  watch: {
    rows: function() {
      this.resetRows();
    }
  },
  mounted() {
    this.resetRows();
  },
  methods: {
    resetRows() {
      let i;
      const displayRowsArray = [];
      for (i = 0; i < this.rows.length; i += 1) {
        displayRowsArray.push(0);
      }
      console.log('test');
      console.log(displayRowsArray);
      this.displayRows = displayRowsArray;
    },
    emitColAdd() {
      if (this.checkRowNotFull()) {
        const nextPosition = this.rows.length - this.colState.length - 1;
        this.$set(this.displayRows, nextPosition, this.currentPlayer);
        this.$emit('addToCol', this.col);
      }
    },
    checkRowNotFull() {
      if (this.colState.length < this.rows.length) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.connect-col {
  display: grid;
  grid-gap: 15px;
  &.hover {
    background: #aaa;
  }
}
</style>
