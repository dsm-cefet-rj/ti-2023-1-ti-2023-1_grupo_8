import axios from "axios";
import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

export const fetchALLPedidos = createAsyncThunk("pedidos/getAPI", async () => {
  const response = await axios.get("http://localhost:4000/pedidos");
  return response.data;
});

export const fetchPedidosByMesaId = createAsyncThunk("pedidos/getByMesaIdAPI", async (mesaId) => {
  const response = await axios.get(`http://localhost:4000/pedidos`);
  return response.data.filter((pedido) => pedido.idmesa === mesaId);
});


export const saveNewPedido = createAsyncThunk(
  "pedidos/createAPI",
  async (payload) => {
    const response = await axios.post("http://localhost:4000/pedidos", payload);
    return response.data;
  }
);

export const updatePedido = createAsyncThunk("pedidos/updateAPI", async (payload) => {
  const response = await axios.put(
    `http://localhost:4000/pedidos/${payload.id}`,
    payload
  );
  return response.data;
});

export const deletePedido = createAsyncThunk("pedidos/deleteAPI", async (id) => {
  const response = await axios.delete(`http://localhost:4000/pedidos/${id}`);
  return id;
});

const initialState = {
  pedidosData: [],
  loading: "idle",
};

const pedido = createSlice({
  name: "pedido",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchALLPedidos.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(fetchALLPedidos.fulfilled, (state, action) => {
      state.loading = "idle";
      state.pedidosData = action.payload;
    });
    builder.addCase(fetchPedidosByMesaId.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(fetchPedidosByMesaId.fulfilled, (state, action) => {
      state.loading = "idle";
      state.pedidosData = action.payload;
    });
    builder.addCase(saveNewPedido.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(saveNewPedido.fulfilled, (state, action) => {
      state.loading = "idle";
      state.pedidosData.unshift(action.payload);
    });
    builder.addCase(updatePedido.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(updatePedido.fulfilled, (state, action) => {
      state.loading = "idle";
      state.pedidosData = state.pedidosData.filter((_) => _.id !== action.payload.id);
      state.pedidosData.unshift(action.payload);
    });
    builder.addCase(deletePedido.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(deletePedido.fulfilled, (state, action) => {
      state.loading = "idle";
      state.pedidosData = state.pedidosData.filter((_) => _.id !== action.payload);
    });
  },
});

export const getAllPedidos = (state) => state.pedido.pedidosData;
export const getLoading = (state) => state.pedido.loading;
export const getPedidoById = (id) => {
  return (state) => state.pedido.pedidosData.filter((_) => _.id === id)[0];
};

export default pedido.reducer;
