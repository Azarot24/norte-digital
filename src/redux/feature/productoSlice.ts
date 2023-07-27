import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface Producto {
    id: number,
    name: string,
    precio: number,
    stock: number,
    idBranch: number,
  }

const initialState: Producto[] = [{id: 0,name:'Cerveza Duff', idBranch: 0, precio:10, stock: 1000}]

export const productoSlice = createSlice({
    name: "producto",
    initialState,
    reducers:{
        addProducto: (state, action: PayloadAction<Producto>) =>{
            state.push(action.payload)
        }
    }
})

export const {addProducto} = productoSlice.actions

export default productoSlice.reducer