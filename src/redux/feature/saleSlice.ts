import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface Sale {
    date: string,
    idVendedor: number,
    idCliente: number,
    idBranch: number,
    total: number,
  }

const initialState: Sale[] = [
    {date: '12/05/2020', idBranch: 0, idCliente: 0, idVendedor: 0, total: 100},
    {date: '15/05/2012', idBranch: 0, idCliente: 0, idVendedor: 0, total: 1000}]

export const saleSlice = createSlice({
    name: "sale",
    initialState,
    reducers:{
        addSale: (state, action: PayloadAction<Sale>) =>{
            state.push(action.payload)
        }
    }
})

export const {addSale} = saleSlice.actions

export default saleSlice.reducer