<template>
  <div class="connect-field">
    <connect-col
      v-for="col in cols"
      :key="col"
      :col="col"
      :current-player="currentPlayer"
      :col-state="colStates[col]"
      :rows="rows"
      @addToCol="addToCol(col)"
    />
    current player: {{ currentPlayer }}
  </div>
</template>

<script>
import ConnectCol from './ConnectCol.vue';

export default {
  components: {
    ConnectCol
  },
  props: {
    rows: {
      default: () => {
        return [];
      },
      type: Array
    },
    colCount: {
      default: 7,
      type: Number
    },
    colStates: {
      default: () => {
        return [];
      },
      type: Array
    }
  },
  data() {
    return {
      currentPlayer: 1
    };
  },
  computed: {
    cols() {
      return this.range(this.colCount);
    }
  },
  mounted() {
    this.currentPlayer = 1;
  },
  methods: {
    range: num => [...Array(num).keys()],
    switchPlayer() {
      if (this.currentPlayer === 1) {
        this.currentPlayer = 2;
      } else {
        this.currentPlayer = 1;
      }
    },
    addToCol(col) {
      this.colStates[col].push(this.currentPlayer);
      const colData = {
        colStates: this.colStates,
        player: this.currentPlayer,
        currentCol: col
      };
      this.$emit('checkWinner', colData);
      this.switchPlayer();
    }
  }
};
</script>

<style lang="scss" scoped>
.connect-field {
  max-width: 600px;
  display: grid;
  grid-template-columns: repeat(9999, 1fr);
  grid-gap: 15px;
}
</style>
