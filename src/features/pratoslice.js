import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchALLPratos = createAsyncThunk("pratos/getAPI", async () => {
    const response = await axios.get("http://localhost:4000/pratos");
    return response.data;
  });
  
  export const saveNewPrato = createAsyncThunk(
    "mesas/createAPI",
    async (payload) => {
      const response = await axios.post("http://localhost:4000/pratos", payload);
      return response.data;
    }
  );
  
  export const updatePrato = createAsyncThunk("pratos/updateAPI", async (payload) => {
    const response = await axios.put(
      `http://localhost:4000/pratos/${payload.id}`,
      payload
    );
    return response.data;
  });
  
  export const deletePrato = createAsyncThunk("pratos/deleteAPI", async (id) => {
    const response = await axios.delete(`http://localhost:4000/pratos/${id}`);
    return id;
  });
  
  const initialState = {
    pratosData: [],
    loading: "idle",
  };
  
  const pratoslice = createSlice({
    name: "pratos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchALLPratos.pending, (state, action) => {
        state.loading = "pending";
      });
      builder.addCase(fetchALLPratos.fulfilled, (state, action) => {
        state.loading = "idle";
        state.pratosData = action.payload;
      });
      builder.addCase(saveNewPrato.pending, (state, action) => {
        state.loading = "pending";
      });
      builder.addCase(saveNewPrato.fulfilled, (state, action) => {
        state.loading = "idle";
        state.pratosData.unshift(action.payload);
      });
      builder.addCase(updatePrato.pending, (state) => {
        state.loading = "pending";
      });
      builder.addCase(updatePrato.fulfilled, (state, action) => {
        state.loading = "idle";
        state.pratosData = state.pratosData.filter((_) => _.id !== action.payload.id);
        state.pratosData.unshift(action.payload);
      });
      builder.addCase(deletePrato.pending, (state) => {
        state.loading = "pending";
      });
      builder.addCase(deletePrato.fulfilled, (state, action) => {
        state.loading = "idle";
        state.pratosData = state.pratosData.filter((_) => _.id !== action.payload);
      });
    },
  });
  
  export const getAllPratos = (state) => state.prato.pratosData;
  export const getLoading = (state) => state.prato.loading;
  export const getPratoById = (id) => {
    return (state) => state.prato.pratosData.filter((_) => _.id === id)[0];
  };
  export default pratoslice.reducer;
  