import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { httpDelete, httpGet, httpPost, httpPut } from "../utils";
import { baseUrl } from '../baseUrl'

const pratosAdapter = createEntityAdapter();

const initialState = pratosAdapter.getInitialState({
    status: 'not_loaded',
    error: null
});

export const fetchPratos = createAsyncThunk('pratos/fetchPratos', async (_, {getState}) => {
    console.log(getState());
        return await httpGet(`${baseUrl}/cardapio`);
    // return await httpGet(`${baseUrl}/pratos`, {headers: {Authorization: 'Bearer ' + getState().logins.currentToken}});
});

export const deletePratoServer = createAsyncThunk('pratos/deletePratoServer', async (idPrato, {getState}) => {
    await httpDelete(`${baseUrl}/cardapio/${idPrato}`);
    return idPrato;
});

export const addPratoServer = createAsyncThunk('pratos/addPratoServer', async (prato, {getState}) => {
    return await httpPost(`${baseUrl}/cardapio`, prato);
});

export const updatePratoServer = createAsyncThunk('pratos/updatePratoServer', async (prato, {getState}) => {
    return await httpPut(`${baseUrl}/cardapio/${prato.id}`, prato);
});

export const pratosSlice = createSlice({
    name: 'pratos',
    initialState: initialState,
    extraReducers: {
       [fetchPratos.pending]: (state, action) => {state.status = 'loading'},
       [fetchPratos.fulfilled]: (state, action) => {state.status = 'loaded'; pratosAdapter.setAll(state, action.payload);},
       [fetchPratos.rejected]: (state, action) => {state.status = 'failed'; state.error = action.error.message},
       [deletePratoServer.pending]: (state, action) => {state.status = 'loading'},
       [deletePratoServer.fulfilled]: (state, action) => {state.status = 'deleted'; pratosAdapter.removeOne(state, action.payload);},
       [addPratoServer.pending]: (state, action) => {state.status = 'loading'},
       [addPratoServer.fulfilled]: (state, action) => {state.status = 'saved'; pratosAdapter.addOne(state, action.payload);},
       [updatePratoServer.pending]: (state, action) => {state.status = 'loading'},
       [updatePratoServer.fulfilled]: (state, action) => {state.status = 'saved'; pratosAdapter.upsertOne(state, action.payload);},
    }
});

export default pratosSlice.reducer

export const {
    selectAll: selectAllPratos,
    selectById: selectPratosById,
    selectIds: selectPratosIds
} = pratosAdapter.getSelectors(state => state.pratos)