import { createSlice } from "@reduxjs/toolkit";

const exibePedidoSlice = createSlice({
  name: "exibePedidos",
  initialState: {
    exibePedidosData: [], // Defina o estado inicial para um array vazio
    loading: false,
    error: null,
  },
  reducers: {
    setExibePedidosData: (state, action) => {
      state.exibePedidosData = action.payload;
      state.loading = false;
      state.error = null;
    },
    setExibePedidosLoading: (state, action) => {
      state.loading = action.payload;
      state.error = null;
    },
    setExibePedidosError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setExibePedidosData,
  setExibePedidosLoading,
  setExibePedidosError,
} = exibePedidoSlice.actions;

// Define a função getExibePedidosData para obter o estado exibePedidosData
export const getExibePedidosData = (state) => state.exibePedidos.exibePedidosData;
export const getExibePedidosLoading = (state) => state.exibePedidos.loading;
export const getExibePedidosError = (state) => state.exibePedidos.error;

export default exibePedidoSlice.reducer;

