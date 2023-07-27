import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface  Direction {
    calle: string,
    numero: string,
    comuna: string,
    ciudad: string,
  }

const initialState: Direction[] = [{calle:'siempreviva', numero: '742', ciudad: 'Springfield', comuna: 'Springfield'}]

export const directionSlice = createSlice({
    name: "direction",
    initialState,
    reducers:{
        addDirection: (state, action: PayloadAction<Direction>) =>{
            state.push(action.payload)
        }
    }
})

export const {addDirection} = directionSlice.actions

export default directionSlice.reducer