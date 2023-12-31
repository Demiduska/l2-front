import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AvatarType, ResponseUser } from "../../utils/api/types";
import { RootState } from "../store";
import { HYDRATE } from "next-redux-wrapper";

export interface UserState {
  data?: ResponseUser | null;
}

const initialState: UserState = {
  data: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<ResponseUser | null>) => {
      state.data = action.payload;
    },
    deleteAvatar: (state) => {
      if (state.data) {
        state.data.avatar = null;
      }
    },
  },
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     return {
  //       ...state,
  //       ...action.payload.user,
  //     };
  //   },
  // },
  extraReducers(builder) {
    builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(
      HYDRATE,
      (state, { payload }) => ({ ...state, ...payload.user })
    );
  },
});

export const { setUserData, deleteAvatar } = userSlice.actions;

export const selectUserData = (state: RootState) => state.user.data;

export const userReducer = userSlice.reducer;
