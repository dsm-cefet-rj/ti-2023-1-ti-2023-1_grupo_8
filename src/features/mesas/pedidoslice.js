import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchALLPedidos = createAsyncThunk("pedidos/getAPI", async () => {
  const response = await axios.get("http://localhost:4000/pedidos");
  return response.data;
});



const initialState = {
  pedidosData: [],
  loading: "idle",
};

const pedidoslice = createSlice({
  name: "pedidos",
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
   
  },
});

export const getAllPedidos = (state) => state.pedido.pedidosData;
export const getLoading = (state) => state.pedido.loading;
export const getPedidoById = (id) => {
  return (state) => state.pedido.pedidosData.filter((_) => _.idmesa === id)[0];
};
export default pedidoslice.reducer;