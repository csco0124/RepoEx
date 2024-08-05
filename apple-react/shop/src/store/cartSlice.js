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
      // state.forEach((a, i) => {
      //   if(a.id === id){
      //     a.count++;
      //   }
      // })
      let idx = state.findIndex((a) => {
        return a.id === id;
      }); // 사용시 주의 : 배열 안에 족너에 만족하는 객체가 두개 이상 있는경우에도 첫번째 값의 인덱스만 가져옴, 그러나 ID는 고유값이므로 큰 문제는 없음
      state[idx].count++;
    },
  },
});
export let { addCount } = cart.actions;

export default cart;
