import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface Branch {
    name: string,
    currency: string,
  }

const initialState: Branch[] = [{name:'Argentina', currency:'AR'}, {name:'Chile', currency:'CLP'}, {name:'Perú', currency:'PEN'}, {name:'Colombia', currency:'COP'}]

export const branchSlice = createSlice({
    name: "branch",
    initialState,
    reducers:{
        addBranch: (state, action: PayloadAction<Branch>) =>{
            state.push(action.payload)
        }
    }
})

export const {addBranch} = branchSlice.actions

export default branchSlice.reducer