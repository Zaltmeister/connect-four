<template>
  <div class="field-container">
    <div>
      <h2 v-if="noComputerAlert">
        No AI available, you have to entertain yourself now.
      </h2>
      <div class="connect-field">
        <connect-col
          v-for="col in cols"
          :key="col"
          :col="col"
          :current-player="currentPlayer"
          :col-state="colStates[col]"
          :rows="rows"
          @addToCol="addHumanToCol(col)"
        />
      </div>
    </div>
    <PopupDialog
      v-if="computerThinking"
      :dialog-alert="'calculating computer move'"
      :game-end="false"
    />
  </div>
</template>

<script>
import axios from 'axios';
import ConnectCol from './ConnectCol.vue';
import PopupDialog from './PopupDialog.vue';

export default {
  components: {
    ConnectCol,
    PopupDialog
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
    paused: {
      default: false,
      type: Boolean
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
      computerMove: 0,
      currentPlayer: 1,
      noComputerAlert: false,
      computerThinking: false
    };
  },
  computed: {
    cols() {
      return this.range(this.colCount);
    }
  },
  watch: {
    currentPlayer: async function() {
      await this.doComputerMove();
    },
    paused: async function() {
      await this.doComputerMove();
    }
  },
  mounted() {
    this.currentPlayer = 1;
  },
  methods: {
    setComputerThinking() {
      if (this.noComputerAlert === false) {
        this.computerThinking = true;
      }
    },
    async doComputerMove() {
      let timer;
      if (this.currentPlayer === 2 && this.paused === false) {
        //only show dialog after 0.5 seconds to prevent dialog flashing
        timer = setTimeout(this.setComputerThinking, 500);
        const computerMove = await this.getComputerMove();
        if (computerMove === false) {
          this.noComputerAlert = true;
        } else {
          this.noComputerAlert = false;
          this.addToCol(computerMove);
        }
      }
      clearTimeout(timer);
      this.computerThinking = false;
    },
    async getComputerMove() {
      try {
        const response = await axios.post('http://localhost:3080/move', {
          colStates: this.colStates,
          rows: this.rows.length
        });
        return response.data.move;
      } catch {
        return false;
      }
    },
    range(num) {
      return [...Array(num).keys()];
    },
    switchPlayer() {
      if (this.currentPlayer === 1) {
        this.currentPlayer = 2;
      } else {
        this.currentPlayer = 1;
      }
    },
    addHumanToCol(col) {
      if (this.currentPlayer === 1) {
        this.addToCol(col);
      } else if (this.currentPlayer === 2 && this.noComputerAlert === true) {
        this.addToCol(col);
      }
    },
    addToCol(col) {
      if (this.checkRowNotFull(this.colStates[col]) && !this.paused) {
        this.colStates[col].push(this.currentPlayer);
        const colData = {
          colStates: this.colStates,
          player: this.currentPlayer,
          currentCol: col
        };
        this.$emit('checkWinner', colData);
        this.switchPlayer();
      }
    },
    checkRowNotFull(colState) {
      if (colState.length < this.rows.length) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.field-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.connect-field {
  max-width: 600px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 15px;
}
</style>
