import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { httpDelete, httpGet, httpPost, httpPut } from "../utils";
import { baseUrl } from '../baseUrl'

const funcionariosAdapter = createEntityAdapter();

const initialState = funcionariosAdapter.getInitialState({
    status: 'not_loaded',
    error: null
});

export const fetchFuncionarios = createAsyncThunk('funcionarios/fetchFuncionarios', async (_, {getState}) => {
    console.log(getState());
        return await httpGet(`${baseUrl}/staff`);
    // return await httpGet(`${baseUrl}/funcionarios`, {headers: {Authorization: 'Bearer ' + getState().logins.currentToken}});
});

export const deleteFuncionarioServer = createAsyncThunk('funcionarios/deleteFuncionarioServer', async (idFuncionario, {getState}) => {
    await httpDelete(`${baseUrl}/staff/${idFuncionario}`);
    return idFuncionario;
});

export const addFuncionarioServer = createAsyncThunk('funcionarios/addFuncionarioServer', async (funcionario, {getState}) => {
    return await httpPost(`${baseUrl}/staff`, funcionario);
});

export const updateFuncionarioServer = createAsyncThunk('funcionarios/updateFuncionarioServer', async (funcionario, {getState}) => {
    return await httpPut(`${baseUrl}/staff/${funcionario.id}`, funcionario);
});

export const funcionariosSlice = createSlice({
    name: 'funcionarios',
    initialState: initialState,
    extraReducers: {
       [fetchFuncionarios.pending]: (state, action) => {state.status = 'loading'},
       [fetchFuncionarios.fulfilled]: (state, action) => {state.status = 'loaded'; funcionariosAdapter.setAll(state, action.payload);},
       [fetchFuncionarios.rejected]: (state, action) => {state.status = 'failed'; state.error = action.error.message},
       [deleteFuncionarioServer.pending]: (state, action) => {state.status = 'loading'},
       [deleteFuncionarioServer.fulfilled]: (state, action) => {state.status = 'deleted'; funcionariosAdapter.removeOne(state, action.payload);},
       [addFuncionarioServer.pending]: (state, action) => {state.status = 'loading'},
       [addFuncionarioServer.fulfilled]: (state, action) => {state.status = 'saved'; funcionariosAdapter.addOne(state, action.payload);},
       [updateFuncionarioServer.pending]: (state, action) => {state.status = 'loading'},
       [updateFuncionarioServer.fulfilled]: (state, action) => {state.status = 'saved'; funcionariosAdapter.upsertOne(state, action.payload);},
    }
});

export default funcionariosSlice.reducer

export const {
    selectAll: selectAllFuncionarios,
    selectById: selectFuncionariosById,
    selectIds: selectFuncionariosIds
} = funcionariosAdapter.getSelectors(state => state.funcionarios)