import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface Vendedor {
    name: string,
    lastname: string,
    idDirection: number,
    tel: string,
    date: string,
    email: string,
  }

const initialState: Vendedor[] = [{name:'Moe',email:'MoeSzyslak@gmail.com', tel:'76484377', date: '28/05/1960', idDirection:0, lastname: 'Szyslak'}]

export const vendedorSlice = createSlice({
    name: "vendedor",
    initialState,
    reducers:{
        addVendedor: (state, action: PayloadAction<Vendedor>) =>{
            state.push(action.payload)
        }
    }
})

export const {addVendedor} = vendedorSlice.actions

export default vendedorSlice.reducer