import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {name : "kim", age : 20},
  reducers: {
    changeName(state, action) {
      console.log("state, action", state.name, action);
      state.name = action.payload;
    },
    increase(state, action){
      state.age += action.payload;
    },
  },
});
export let { changeName, increase } = user.actions;

export default user;