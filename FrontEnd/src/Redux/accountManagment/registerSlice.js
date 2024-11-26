import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'http://localhost:4002/api/v1/auth/register';


export const register = createAsyncThunk('auth/register', async (userData) => {
    const { data } = await axios.post(URL, userData); //envia los datos del usuario
    return data; // Respuesta del back
});

const registerSlice = createSlice({
    name: 'register',
    initialState: {
        authToken: null,
        loading: false,
        error: null,
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null; //cargando
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.authToken = action.payload.acces_token; // Asi api da un token
                localStorage = action.payload.acces_token;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // errores
            });
    },
});


export default registerSlice.reducer;
