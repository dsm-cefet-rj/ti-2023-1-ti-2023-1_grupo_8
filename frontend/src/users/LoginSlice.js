import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
// import { httpPost } from '../utils';

const loginAdapter = createEntityAdapter();

const initialState = loginAdapter.getInitialState({
    status: 'not_loaded',
    error: null,
    currentToken: null
});

export const loginServer = createAsyncThunk(
    'users/loginServer', 
    async (login) => {
        const response = await axios.post("http://localhost:4000/users/login", login);
        return response.data;
});

export const signupUser = createAsyncThunk(
    'users/loginServer', 
    async (user) => {
        const response = await axios.post("http://localhost:4000/users/signup", user);
        return response;
});

export const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    extraReducers: {
        [loginServer.pending]: (state, action) => {state.status = 'trying_login'},
        [loginServer.fulfilled]: (state, action) => {
            state.status = 'logged_in'; 
            loginAdapter.addOne(state, action.payload); 
            state.currentToken = action.payload.token;
        },
        [signupUser.pending]: (state, action) => {state.status = 'trying_signup'},
        [signupUser.fulfilled]: (state, action) => {
            state.status = 'signup_successful';
            loginAdapter.addOne(state, action.payload);
            state.currentToken = action.payload.token;
        },
    },
});

export default loginSlice.reducer;

export const {
    selectAll: selectAllLogin,
} = loginAdapter.getSelectors(state => state.login);