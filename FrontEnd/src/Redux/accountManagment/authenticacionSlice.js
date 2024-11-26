import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'http://localhost:4002/api/v1/auth/authenticate';


export const authenticate = createAsyncThunk('auth/authenticate', async (userData) => {
    const { data } = await axios.post(URL, userData); //envia los datos del usuario
    return data; // Respuesta del back
});

const authenticateSlice = createSlice({
    name: 'auth', //nombre del estado global
    initialState: {
        authToken: null,
        loading: false,
        error: null,
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(authenticate.pending, (state) => {
                state.loading = true;
                state.error = null; //cargando
            })
            .addCase(authenticate.fulfilled, (state, action) => {
                state.loading = false;
                state.authToken = action.payload.acces_token; // Asi api da un token
                localStorage.acces_token = action.payload.acces_token
            })
            .addCase(authenticate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // errores
            });
    },
});


export default authenticateSlice.reducer;
