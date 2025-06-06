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
    async (category = 'All', { rejectWithValue }) => {
        try {
            let apiUrl = 'https://localhost:3000/api/stores';

            if (category !== 'All') {
                apiUrl += `?category=${category}`;
            }

            console.log("Fetching stores from:", apiUrl);

            const response = await axios.get(apiUrl);

            if (response.data.success) {
                return response.data.stores; 
            } else {
                return rejectWithValue(response.data.message || 'Failed to fetch stores: Unknown error from server.');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred while fetching stores.';
            console.error("Error in fetchStores thunk:", error); 
            return rejectWithValue(errorMessage); 
        }
    }
);

export const fetchStoreById = createAsyncThunk(
    'stores/fetchStoreById',
    async (storeId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://localhost:3000/api/stores/${storeId}`); 
            if (response.data.success) {
                return response.data.store; 
            } else {
                return rejectWithValue(response.data.message || `Failed to fetch store with ID ${storeId}: Unknown error.`);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || `An unknown error occurred while fetching store ${storeId}.`;
            return rejectWithValue(errorMessage);
        }
    }
);

export const addStore = createAsyncThunk(
    'stores/addStore',
    async (newStoreData, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://localhost:3000/api/stores', newStoreData);
            if (response.data.success) {
                return response.data.store; 
            } else {
                return rejectWithValue(response.data.message || 'Failed to add store: Unknown error.');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred while adding store.';
            return rejectWithValue(errorMessage);
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
                state.stores = [];          
            })

            .addCase(fetchStoreById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.selectedStore = null; 
            })
            .addCase(fetchStoreById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedStore = action.payload; 
                state.error = null;
            })
            .addCase(fetchStoreById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.selectedStore = null;
            })

            .addCase(addStore.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addStore.fulfilled, (state, action) => {
                state.isLoading = false;
                state.stores.push(action.payload);
                state.error = null;
            })
            .addCase(addStore.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { setSelectedStore, clearStores } = storeSlice.actions;

export default storeSlice.reducer;