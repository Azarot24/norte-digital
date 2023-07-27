import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface Proveedor {
    name: string,
    web: string,
    idDirection: number,
    tel: string,
  }

const initialState: Proveedor[] = [{name: 'cristal',tel:'3001232',web:'cristal.com', idDirection: 0}]

export const proveedorSlice = createSlice({
    name: "proveedor",
    initialState,
    reducers:{
        addProveedor: (state, action: PayloadAction<Proveedor>) =>{
            state.push(action.payload)
        }
    }
})

export const {addProveedor} = proveedorSlice.actions

export default proveedorSlice.reducer