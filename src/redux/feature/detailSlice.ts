import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface Detail {
    idSale: number,
    idProducto: number,
    cantidad: number,
    precio: number,
    subtotal: number,
  }

const initialState: Detail[] = [{idProducto: 0, cantidad: 10, idSale: 0, precio: 10, subtotal: 100}, {idProducto: 0, cantidad: 100, idSale: 1, precio: 10, subtotal: 1000}]

export const detailSlice = createSlice({
    name: "detail",
    initialState,
    reducers:{
        addDetail: (state, action: PayloadAction<Detail>) =>{
            state.push(action.payload)
        }
    }
})

export const {addDetail} = detailSlice.actions

export default detailSlice.reducer