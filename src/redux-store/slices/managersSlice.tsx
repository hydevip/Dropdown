import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ManagersState, ManagerInterface } from '../../types/types';


const initialState: ManagersState = { managersList: [], selectedManager:null }

export const managersSlice = createSlice({
    name: 'managers',
    initialState,
    reducers: {
        newSelection: (state, action: PayloadAction<ManagerInterface>) => {
            state.selectedManager = action.payload
        },
        addManagersList: (state, action:PayloadAction<ManagerInterface[]>) => {
            state.managersList = action.payload
        }
    }
})

export const { newSelection, addManagersList } = managersSlice.actions

export default managersSlice.reducer