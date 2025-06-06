    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
    import axios from 'axios';

    const initialState = {
        stores: [],
        isLoading: false,
        error: null,
        selectedStore: null,
    };

    export const fetchStores = createAsyncThunk(
        'stores/fetchStores',
        async (params = {}, { rejectWithValue }) => {
            try {
                const { category } = params; 
                let url = 'https://localhost:3000/api/stores'; 

                if (category && category !== 'All') { 
                    url += `?category=${category}`; 
                }

                const response = await axios.get(url);
                if (response.data.success) {
                    return response.data.stores;
                } else {
                    return rejectWithValue(response.data.message || 'Failed to fetch stores.');
                }
            } catch (error) {
                return rejectWithValue(error.response?.data?.message || error.message || 'An unknown error occurred.');
            }
        }
    );


    const storeSlice = createSlice({
        name: 'stores',
        initialState,
        reducers: {
            setSelectedStore: (state, action) => {
                state.selectedStore = action.payload;
            },
            clearStores: (state) => {
                state.stores = [];
                state.isLoading = false;
                state.error = null;
                state.selectedStore = null;
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchStores.pending, (state) => {
                    state.isLoading = true;
                    state.error = null;
                })
                .addCase(fetchStores.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.stores = action.payload; 
                    state.error = null;
                })
                .addCase(fetchStores.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload; 
                })
        },
    });

    export const { setSelectedStore, clearStores } = storeSlice.actions;
    export default storeSlice.reducer;
    