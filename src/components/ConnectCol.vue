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
      //reset visible rows if rows change
      this.resetRows();
    },
    colState: function() {
      //update the field with colors
      if (this.colState.length != 0) {
        const nextPosition = this.rows.length - this.colState.length;
        this.$set(
          this.displayRows,
          nextPosition,
          this.colState[this.colState.length - 1]
        );
      }
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
      this.displayRows = displayRowsArray;
    },
    emitColAdd() {
      this.$emit('addToCol', this.col);
    }
  }
};
</script>

<style lang="scss" scoped>
.connect-col {
  display: grid;
  cursor: pointer;
  grid-gap: 15px;
  &.hover {
    background: #aaa;
  }
}
</style>
