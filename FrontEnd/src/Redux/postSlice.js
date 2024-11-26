import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'http://localhost:4002/products';

export const fetchPosts = createAsyncThunk('posts/fetchposts', async() => {
    const {data} = await axios(URL) //peticion de data
    return data
})

export const createPosts = createAsyncThunk('posts/createposts', async() => {
    const {data} = await axios.post(URL) //peticion de data
    return data
})

const postSlice = createSlice({
    name: 'posts', //Define el nombre del estado global
    initalState: {
        items:[],
        loading: true,
        error: null, 
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchPosts.pending, (state) =>{
            state.loading = true,
            state.error = null
        })
        .addCase(fetchPosts.fulfilled, (state, action) =>{
            state.loading = false,
            state.items = action.payload
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.loading = false,
            state.error = action.error.message 
        })
    }
});

export default postSlice.reducer;