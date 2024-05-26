import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedItem {
    id: number;
    name: string;
    [key: string]: any;
}

interface SelectedState {
    selectedItems: SelectedItem[];
}

const initialState: SelectedState = {
    selectedItems: [],
};

const selectedSlice = createSlice({
    name: 'selected',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<SelectedItem>) => {
            state.selectedItems.push(action.payload);
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.selectedItems = state.selectedItems.filter(item => item.name !== action.payload.name);
        },
        clearItems: (state) => {
            state.selectedItems = [];
        }
    },
});

export const { addItem, removeItem, clearItems } = selectedSlice.actions;
export default selectedSlice.reducer;
