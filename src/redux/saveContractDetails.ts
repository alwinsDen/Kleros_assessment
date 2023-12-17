import { createSlice } from "@reduxjs/toolkit";

export const renderSlice = createSlice({
  name: "saveContractDetails",
  initialState: {
    web3Instance: null,
    contractId: null,
    accountId: null,
    deterMineMove: 0,
    playerMode: null,
  },
  reducers: {
    assignPlayerMode: (state, data) => {
      state.playerMode = data.payload;
    },
    assignContId: (state, data) => {
      state.contractId = data.payload;
    },
    assignWeb3Instance: (state, data) => {
      state.web3Instance = data.payload;
    },
    assignCurrId: (state, data) => {
      state.accountId = data.payload;
    },
    assignMove: (state, data) => {
      state.deterMineMove = data.payload;
    },
  },
});
export const {
  assignPlayerMode,
  assignContId,
  assignMove,
  assignWeb3Instance,
  assignCurrId,
} = renderSlice.actions;
export default renderSlice.reducer;
