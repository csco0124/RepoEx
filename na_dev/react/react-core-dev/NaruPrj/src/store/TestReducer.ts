import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export interface TestState {
  name: string;
  num: number;
};

const initialState = { name: "", num: 0 } as TestState;

export const TestReducer = createSlice({
  name: "test",
  initialState,
  reducers: {
    setTestState(state, action: PayloadAction<TestState>) {
      state.name = action.payload.name;
      state.num = action.payload.num;
    },
  },
});

export const { setTestState } = TestReducer.actions;
export default TestReducer.reducer;
