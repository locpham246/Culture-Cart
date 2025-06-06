
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {persistStore,persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER,} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './userSlice';
import storeReducer from './storeSlice';
import cartReducer from './cartSlice';
import productReducer from './productSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['user', 'cart'],
  blacklist: ['stores', 'product'],
};

const rootReducer = combineReducers({
  user: userReducer,
  stores: storeReducer,
  cart: cartReducer,
  product: productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
