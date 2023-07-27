import { combineReducers, configureStore } from "@reduxjs/toolkit";
import branchReducer from './feature/branchSlice'
import clienteReducer from './feature/clienteSlice'
import detailReducer from './feature/detailSlice'
import directionReducer from './feature/directionSlice'
import productoReducer from './feature/productoSlice'
import proveedorReducer from './feature/proveedorSlice'
import saleReducer from './feature/saleSlice'
import vendedorReducer from './feature/vendedorSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    // whitelist: ['branchState']
}

const rootReducer = combineReducers({
    branchState : branchReducer,
    clienteState: clienteReducer,
    detailState: detailReducer,
    directionState: directionReducer,
    productoState: productoReducer,
    proveedorState: proveedorReducer,
    saleState: saleReducer,
    vendedorState: vendedorReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: {
        persistedReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch