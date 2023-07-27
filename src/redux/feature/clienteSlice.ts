import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface Cliente {
    name: string,
    lastname: string,
    idDirection: number,
    tel: string,
  }

const initialState: Cliente[] = [{name:'Homero', lastname:'Simpson', tel:'4262584', idDirection: 0}]

export const clienteSlice = createSlice({
    name: "cliente",
    initialState,
    reducers:{
        addCliente: (state, action: PayloadAction<Cliente>) =>{
            state.push(action.payload)
        }
    }
})

export const {addCliente} = clienteSlice.actions

export default clienteSlice.reducer