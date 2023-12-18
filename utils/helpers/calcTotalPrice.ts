import { OrderItemType } from "../api/types";

export const calcTotalPrice = (items: OrderItemType[]) => {
  return items.reduce((sum, obj) => obj.price + sum, 0);
};
