import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  CreateServerDto,
  OrderItemType,
  ServerStatusType,
} from "../../utils/api/types";
import { calcTotalPrice } from "../../utils/helpers/calcTotalPrice";
import { HYDRATE } from "next-redux-wrapper";

export interface ServerState {
  server: CreateServerDto;
  editServer: CreateServerDto | null;
  services: OrderItemType[];
  totalAmount: number;
}

const initialState: ServerState = {
  server: {
    link: "",
    name: "",
    rates: 1,
    server_type: ServerStatusType.default,
    chronic: "interlude",
    serverTags: [],
    banners: [],
    open_date: new Date().toISOString(),
  },
  editServer: null,
  services: [],
  totalAmount: 0,
};

export const serverSlice = createSlice({
  name: "server",
  initialState,
  reducers: {
    setEditServerData: (state, action: PayloadAction<CreateServerDto>) => {
      state.editServer = action.payload;
    },
    setServerData: (state, action: PayloadAction<CreateServerDto>) => {
      state.server = action.payload;
    },
    setServerType: (state, action: PayloadAction<ServerStatusType>) => {
      state.server.server_type = action.payload;
    },
    setBanners: (state, action: PayloadAction<string[]>) => {
      state.server.banners = action.payload;
    },
    addBannerItem: (state, action: PayloadAction<OrderItemType>) => {
      const findItem = state.services.find(
        (obj) => obj.order_service_type === action.payload.order_service_type
      );
      if (findItem) {
        if (findItem.days !== action.payload.days) {
          findItem.days = action.payload.days;
          findItem.price = action.payload.price;
          findItem.id = action.payload.id;
          findItem.end_date = action.payload.end_date;
        }
      } else {
        state.services = [...state.services, action.payload];
      }
      state.totalAmount = calcTotalPrice(state.services);
    },
    removeBannerItem: (state, action: PayloadAction<string>) => {
      state.services = state.services.filter(
        (obj) => obj.order_service_type !== action.payload
      );
      state.totalAmount = calcTotalPrice(state.services);
    },
    addServiceItem(state, action: PayloadAction<OrderItemType>) {
      const findItem = state.services.find(
        (obj) => obj.order_service_type === action.payload.order_service_type
      );
      if (findItem) {
        if (findItem.server_type === action.payload.server_type) {
          findItem.days = action.payload.days;
          findItem.price = action.payload.price;
          findItem.id = action.payload.id;
          findItem.end_date = action.payload.end_date;
        } else {
          if (state.services.length > 0) {
            state.services = state.services.map((service) =>
              service.order_service_type === action.payload.order_service_type
                ? action.payload
                : service
            );
          } else {
            state.services = [action.payload];
          }
        }
      } else {
        state.services = [...state.services, action.payload];
      }
      state.totalAmount = calcTotalPrice(state.services);
    },
  },
  extraReducers(builder) {
    builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(
      HYDRATE,
      (state, { payload }) => ({ ...state, ...payload.server })
    );
  },
});

export const {
  setServerData,
  setEditServerData,
  addServiceItem,
  setServerType,
  setBanners,
  addBannerItem,
  removeBannerItem,
} = serverSlice.actions;

export const selectServerData = (state: RootState) => state.server.server;
export const selectEditServerData = (state: RootState) =>
  state.server.editServer;
export const selectServerServices = (state: RootState) => state.server.services;

export const selectOpenDate = (state: RootState) =>
  state.server.server.open_date;
export const selectServerType = (state: RootState) =>
  state.server.server.server_type;

export const selectBanners = (state: RootState) => state.server.server.banners;

export const selectTotalAmount = (state: RootState) => state.server.totalAmount;

export const serverReducer = serverSlice.reducer;
