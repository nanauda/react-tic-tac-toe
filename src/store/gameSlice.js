import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    history: [Array(9).fill(null)],
    currentMove: 0,
  },
  reducers: {
    playMove(state, action) {
      const nextHistory = [
        ...state.history.slice(0, state.currentMove + 1),
        action.payload,
      ];
      state.history = nextHistory;
      state.currentMove = nextHistory.length - 1;
    },
    jumpTo(state, action) {
      state.currentMove = action.payload;
    },
  },
});

export const { playMove, jumpTo } = gameSlice.actions;
export default gameSlice.reducer;
