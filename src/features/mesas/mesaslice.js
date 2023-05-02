import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchALLMesas = createAsyncThunk("mesas/getAPI", async () => {
  const response = await axios.get("http://localhost:4000/mesas");
  return response.data;
});

export const saveNewMesa = createAsyncThunk(
  "mesas/createAPI",
  async (payload) => {
    const response = await axios.post("http://localhost:4000/mesas", payload);
    return response.data;
  }
);

export const updateMesa = createAsyncThunk("mesas/updateAPI", async (payload) => {
  const response = await axios.put(
    `http://localhost:4000/mesas/${payload.id}`,
    payload
  );
  return response.data;
});

export const deleteMesa = createAsyncThunk("mesas/deleteAPI", async (id) => {
  const response = await axios.delete(`http://localhost:4000/mesas/${id}`);
  return id;
});

const initialState = {
  mesasData: [],
  loading: "idle",
};

const mesaslice = createSlice({
  name: "mesas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchALLMesas.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(fetchALLMesas.fulfilled, (state, action) => {
      state.loading = "idle";
      state.mesasData = action.payload;
    });
    builder.addCase(saveNewMesa.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(saveNewMesa.fulfilled, (state, action) => {
      state.loading = "idle";
      state.mesasData.unshift(action.payload);
    });
    builder.addCase(updateMesa.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(updateMesa.fulfilled, (state, action) => {
      state.loading = "idle";
      state.mesasData = state.mesasData.filter((_) => _.id !== action.payload.id);
      state.mesasData.unshift(action.payload);
    });
    builder.addCase(deleteMesa.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(deleteMesa.fulfilled, (state, action) => {
      state.loading = "idle";
      state.mesasData = state.mesasData.filter((_) => _.id !== action.payload);
    });
  },
});

export const getAllMesas = (state) => state.mesa.mesasData;
export const getLoading = (state) => state.mesa.loading;
export const getMesaById = (id) => {
  return (state) => state.mesa.mesasData.filter((_) => _.id === id)[0];
};
export default mesaslice.reducer;
