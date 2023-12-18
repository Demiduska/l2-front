import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CommonState {
  formType: string | null;
  isVisibleForm: boolean;
}

const initialState: CommonState = {
  formType: null,
  isVisibleForm: false,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setFormType: (state, action: PayloadAction<string | null>) => {
      state.formType = action.payload;
    },
    setVisibleForm: (state, action: PayloadAction<boolean>) => {
      state.isVisibleForm = action.payload;
    },
  },
});

export const { setFormType, setVisibleForm } = commonSlice.actions;

export const selectFormType = (state: RootState) => state.common.formType;
export const selectIsVisibleForm = (state: RootState) =>
  state.common.isVisibleForm;

export const commonReducer = commonSlice.reducer;
