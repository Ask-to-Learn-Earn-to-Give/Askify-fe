import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// import cacheReducer from "./cache/slice";
import chainReducer from './chain/slice';

const chainPersistConfig = {
  key: 'chain',
  storage,
};

const chainPersist = persistReducer(chainPersistConfig, chainReducer);

export const store = configureStore({
  reducer: {
    // cache: cacheReducer,
    chain: chainPersist,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
