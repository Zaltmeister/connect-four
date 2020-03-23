<template>
  <div class="grid">
    <connect-field
      :rows="rows"
      :paused="paused"
      :col-count="colsCount"
      :col-states="colStates"
      @checkWinner="doWeHaveAWinner"
    />
    <PopupDialog
      v-if="paused"
      :dialog-alert="dialogAlert"
      :game-end="true"
      @resetGame="resetGame()"
    />
  </div>
</template>

<script>
import ConnectField from './ConnectField.vue';
import PopupDialog from './PopupDialog.vue';
export default {
  name: 'TheGame', // You just lost it || Nooooooo! -TK
  components: {
    ConnectField,
    PopupDialog
  },
  props: {
    winCheckStrategy: {
      default: () => {
        return false;
      },
      type: Function
    }
  },
  data: () => ({
    rowCount: 6,
    colsCount: 7,
    colStates: [],
    rows: [],
    computerMove: 0,
    paused: false,
    dialogAlert: 'no one has won yet'
  }),
  created() {
    this.resetGame();
  },
  methods: {
    resetGame() {
      this.paused = false;
      this.colStates = this.prepareColStates();
      this.rows = this.prepareRows();
    },
    prepareRows() {
      const rowArray = [];
      let i;
      for (i = 0; i < this.rowCount; i += 1) {
        rowArray.push(0);
      }
      return rowArray;
    },
    prepareColStates() {
      const cleanField = [];
      let i;
      for (i = 0; i < this.colsCount; i += 1) {
        cleanField.push([]);
      }

      return cleanField;
    },
    doWeHaveAWinner(colData) {
      const winner = this.winCheckStrategy(
        colData.colStates,
        colData.player,
        colData.currentCol,
        this.colsCount,
        this.rowCount
      );

      if (winner === 1) {
        this.paused = true;
        this.dialogAlert = 'Player ' + colData.player + ' won';
      } else if (winner === 3) {
        //alert('Board is full, please retry');
        this.dialogAlert = 'Board is full, please retry';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.grid {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem auto;
  padding-top: 1rem; // space for indicator
  position: relative;
}
</style>
