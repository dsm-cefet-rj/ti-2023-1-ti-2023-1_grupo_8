import axios from "axios";
import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

export const fetchALLPedidos = createAsyncThunk("pedidos/getAPI", async (_, {getState}) => {
  const response = await axios.get(
    "http://localhost:4000/pedidos", 
    {headers: {Authorization: 'Bearer ' + getState().login.currentToken}});
  return response.data;
});

export const fetchPedidosByMesaId = createAsyncThunk(
  "pedidos/getByMesaIdAPI",
  async (mesaId, {getState}) => {
    const response = await axios.get(
      "http://localhost:4000/pedidos", 
      {headers: {Authorization: 'Bearer ' + getState().login.currentToken}});
    return response.data.filter((pedido) => pedido.idmesa === mesaId);
  }
);

export const saveNewPedido = createAsyncThunk(
  "pedidos/createAPI",
  async (payload, {getState}) => {
    const response = await axios.post(
      "http://localhost:4000/pedidos", payload, 
      {headers: {Authorization: 'Bearer ' + getState().login.currentToken}});
    return response.data;
  }
);

export const updatePedido = createAsyncThunk(
  "pedidos/updateAPI",
  async (payload, {getState}) => {
    const response = await axios.put(
      `http://localhost:4000/pedidos/${payload.id}`, payload, 
      {headers: {Authorization: 'Bearer ' + getState().login.currentToken}}
    );
    return response.data;
  }
);

export const deletePedido = createAsyncThunk(
  "pedidos/deleteAPI",
  async (id, {getState}) => {
    const response = await axios.delete(
      `http://localhost:4000/pedidos/${id}`, 
      {headers: {Authorization: 'Bearer ' + getState().login.currentToken}}
    );
    return id;
  }
);

// PODE QUEBRAR
export const atualizarStatusPedido = createAsyncThunk(
  "pedidos/atualizarStatusAPI",
  async ({ id, status }, {getState}) => {
    const response = await axios.put(
      `http://localhost:4000/pedidos/${id}`,
      { status }, 
      {headers: {Authorization: 'Bearer ' + getState().login.currentToken}}
    );
    return response.data;
  }
);

const initialState = {
  pedidosData: [],
  loading: "idle",
};

const pedido = createSlice({
  name: "pedido",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchALLPedidos.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchALLPedidos.fulfilled, (state, action) => {
        state.loading = "idle";
        state.pedidosData = action.payload;
      })
      .addCase(fetchPedidosByMesaId.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchPedidosByMesaId.fulfilled, (state, action) => {
        state.loading = "idle";
        state.pedidosData = action.payload;
      })
      .addCase(saveNewPedido.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(saveNewPedido.fulfilled, (state, action) => {
        state.loading = "idle";
        state.pedidosData.unshift(action.payload);
      })
      .addCase(updatePedido.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(updatePedido.fulfilled, (state, action) => {
        state.loading = "idle";
        state.pedidosData = state.pedidosData.filter((_) => _.id !== action.payload.id);
        state.pedidosData.unshift(action.payload);
      })
      .addCase(deletePedido.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(deletePedido.fulfilled, (state, action) => {
        state.loading = "idle";
        state.pedidosData = state.pedidosData.filter((_) => _.id !== action.payload);
      })
      .addCase(atualizarStatusPedido.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(atualizarStatusPedido.fulfilled, (state, action) => {
        state.loading = "idle";
        const pedidoAtualizado = action.payload;
        const index = state.pedidosData.findIndex((pedido) => pedido.id === pedidoAtualizado.id);
        if (index !== -1) {
          state.pedidosData[index] = pedidoAtualizado;
        }
      });
  },
});

export const getAllPedidos = (state) => state.pedido.pedidosData;
export const getLoading = (state) => state.pedido.loading;
export const getPedidoById = (id) => {
  return (state) => state.pedido.pedidosData.filter((_) => _.id === id)[0];
};

export const getPedidoByIdmesa = (idmesa) => {
  return createSelector(
    [getAllPedidos],
    (pedidos) => pedidos.filter((pedido) => pedido.idmesa === idmesa)
  );
};

export default pedido.reducer;

