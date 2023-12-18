import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import { userReducer } from "./slices/user";
import { commonReducer } from "./slices/common";

import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from "next-redux-cookie-wrapper";
import { serverReducer } from "./slices/server";
import { cartReducer } from "./slices/cart";

export function makeStore() {
  return configureStore({
    reducer: {
      user: userReducer,
      common: commonReducer,
      server: serverReducer,
      cart: cartReducer,
    },
  });
}

// const makeStore = wrapMakeStore(() =>
//   configureStore({
//     reducer: {
//       user: userReducer,
//       common: commonReducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().prepend(
//         nextReduxCookieMiddleware({
//           subtrees: [{ subtree: "user.data", maxAge: 900 }],
//         })
//       ),
//   })
// );

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore["getState"]>;
export type AppDispatch = RootStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper<RootStore>(makeStore, { debug: true });
