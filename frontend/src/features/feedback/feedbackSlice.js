import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: []
}

const slice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    setAll(state, action) {
      state.items = action.payload;
    },
    addOptimistic(state, action) {
    
      state.items = [action.payload, ...state.items];
    },
    replaceTemp(state, action) {
      const { tempId, item } = action.payload;
      state.items = state.items.map(i => (i.id === tempId ? item : i));
    },
    removeById(state, action) {
      const id = action.payload;
      state.items = state.items.filter(i => i.id !== id);
    }
  }
});

export const { setAll, addOptimistic, replaceTemp, removeById } = slice.actions;
export default slice.reducer;
