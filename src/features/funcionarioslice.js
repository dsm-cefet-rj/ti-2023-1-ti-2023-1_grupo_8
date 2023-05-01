import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchALLFuncionarios = createAsyncThunk("funcionarios/getAPI", async () => {
    const response = await axios.get("http://localhost:4000/funcionarios");
    return response.data;
  });
  
  export const saveNewFuncionario = createAsyncThunk(
    "mesas/createAPI",
    async (payload) => {
      const response = await axios.post("http://localhost:4000/funcionarios", payload);
      return response.data;
    }
  );
  
  export const updateFuncionario = createAsyncThunk("funcionarios/updateAPI", async (payload) => {
    const response = await axios.put(
      `http://localhost:4000/funcionarios/${payload.id}`,
      payload
    );
    return response.data;
  });
  
  export const deleteFuncionario = createAsyncThunk("funcionarios/deleteAPI", async (id) => {
    const response = await axios.delete(`http://localhost:4000/funcionarios/${id}`);
    return id;
  });
  
  const initialState = {
    funcionariosData: [],
    loading: "idle",
  };
  
  const funcionarioslice = createSlice({
    name: "funcionarios",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchALLFuncionarios.pending, (state, action) => {
        state.loading = "pending";
      });
      builder.addCase(fetchALLFuncionarios.fulfilled, (state, action) => {
        state.loading = "idle";
        state.funcionariosData = action.payload;
      });
      builder.addCase(saveNewFuncionario.pending, (state, action) => {
        state.loading = "pending";
      });
      builder.addCase(saveNewFuncionario.fulfilled, (state, action) => {
        state.loading = "idle";
        state.funcionariosData.unshift(action.payload);
      });
      builder.addCase(updateFuncionario.pending, (state) => {
        state.loading = "pending";
      });
      builder.addCase(updateFuncionario.fulfilled, (state, action) => {
        state.loading = "idle";
        state.funcionariosData = state.funcionariosData.filter((_) => _.id !== action.payload.id);
        state.funcionariosData.unshift(action.payload);
      });
      builder.addCase(deleteFuncionario.pending, (state) => {
        state.loading = "pending";
      });
      builder.addCase(deleteFuncionario.fulfilled, (state, action) => {
        state.loading = "idle";
        state.funcionariosData = state.funcionariosData.filter((_) => _.id !== action.payload);
      });
    },
  });
  
  export const getAllFuncionarios = (state) => state.funcionario.funcionariosData;
  export const getLoading = (state) => state.funcionario.loading;
  export const getFuncionarioById = (id) => {
    return (state) => state.funcionario.funcionariosData.filter((_) => _.id === id)[0];
  };
  export default funcionarioslice.reducer;
  