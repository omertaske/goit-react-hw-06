

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import contactsReducer from "./contactsSlice";
import filtersReducer from "./filtersSlice";

// reducers birleşimi
const rootReducer = combineReducers({
  contacts: contactsReducer,
  filters: filtersReducer,
});

// persist config
const persistConfig = {
  key: "root",
  storage,
};

// persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // non-serializable warning kapat
    }),
});

// persistor
export const persistor = persistStore(store);
