import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from './accountManagment/axiosInstance';

const URL = 'http://localhost:4002/images';

// Fetch a single image by ID
export const fetchImages = createAsyncThunk('images/fetchImage', async (imageId, { getState }) => {
    const token = getState().auth.token; // Adjust according to your state structure
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const { data } = await axiosInstance.get(`${URL}/${imageId}`, config);
    return { imageId, file: data.file }; // Assuming file is the base64 string
});


// Create a new image
export const createImage = createAsyncThunk('images/createImage', async (newImage) => {
    const { data } = await axiosInstance.post(URL, newImage);
    return data;
});

const imageSlice = createSlice({
    name: 'images',
    initialState: {
        items: {}, // Store images by ID
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchImages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchImages.fulfilled, (state, action) => {
                const { imageId, file } = action.payload;
                state.loading = false;
                state.items[imageId] = file;
            })
            .addCase(fetchImages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Handle createImage
            .addCase(createImage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createImage.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createImage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default imageSlice.reducer;
