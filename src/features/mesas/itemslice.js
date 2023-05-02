




import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchALLItens = createAsyncThunk("itens/getAPI", async () => {
  const response = await axios.get("http://localhost:4000/itens");
  return response.data;
});

export const saveNewItem = createAsyncThunk(
  "itens/createAPI",
  async (payload) => {
    const response = await axios.post("http://localhost:4000/cardapio", payload);
    return response.data;
  }
);

export const updateItem = createAsyncThunk("itens/updateAPI", async (payload) => {
  const response = await axios.put(
    `http://localhost:4000/cardapio/${payload.id}`,
    payload
  );
  return response.data;
});

export const deleteItem = createAsyncThunk("itens/deleteAPI", async (id) => {
  const response = await axios.delete(`http://localhost:4000/cardapio/${id}`);
  return id;
});

const initialState = {
  itensData: [],
  loading: "idle",
};

const itemslice = createSlice({
  name: "itens",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchALLItens.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(fetchALLItens.fulfilled, (state, action) => {
      state.loading = "idle";
      state.itensData = action.payload;
    });
    builder.addCase(saveNewItem.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(saveNewItem.fulfilled, (state, action) => {
      state.loading = "idle";
      state.itensData.unshift(action.payload);
    });
    builder.addCase(updateItem.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(updateItem.fulfilled, (state, action) => {
      state.loading = "idle";
      state.itensData = state.itensData.filter((_) => _.id !== action.payload.id);
      state.itensData.unshift(action.payload);
    });

    builder.addCase(deleteItem.pending, (state) => {
        state.loading = "pending";
      });
      builder.addCase(deleteItem.fulfilled, (state, action) => {
        state.loading = "idle";
        state.itensData = state.itensData.filter((item) => item.id !== action.payload);
      });
      builder.addCase(deleteItem.rejected, (state) => {
        state.loading = "idle";
      });
      
  },
});

export const getAllItens = (state) => state.item.itensData;
export const getLoading = (state) => state.item.loading;
export const getItemById = (id) => {
  return (state) => state.item.itensData.filter((_) => _.id === id)[0];
};
export default itemslice.reducer;
