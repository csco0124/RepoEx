import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    addCount(state, action) {
      const id = action.payload;
      state.map((a, i) => {
        if(a.id === id){
          a.count++;
        }
      })
    },
  },
});
export let { addCount } = cart.actions;

export default cart;