import { Filter } from "../../components/filter/Filter";
import { StaticImageData } from "next/image";
import * as yup from "yup";
import { Stream } from "stream";

export type LoginDto = {
  email: string;
  password: string;
};

export type CreateUserDto = {
  confirmPassword: string;
} & LoginDto;

export type UpdateUserDto = {
  email: string;
  nickName?: string;
  telegram?: string;
  file?: File[];
};

export type ForgotPasswordDto = {
  email: string;
};

export type SetNewPasswordDto = {
  password: string;
  confirmPassword: string;
  token: string | string[] | undefined;
};
export type UpdatePasswordDto = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};

export type ConfirmEmailDto = {
  token: string;
};

export type ServerTagFormType = {
  id: number;
};

export type ChronicFormType = {
  id: number;
  slug: string;
};

export type ResponseEmail = {
  text: string;
};

export type ResponseUser = {
  registeredAt: string;
  updatedAt: string;
  isEmailConfirmed: boolean;
  email: string;
  nickName?: string;
  telegram?: string;
  firstName?: string;
  lastName?: string;
  balance: number;
  id?: number;
  avatarId?: number;
  avatar?: AvatarType | null;
  servers?: ServerResponseType[];
  // commentsCount?: number;
};

export type AvatarType = {
  id: number;
  filename: string;
  path: string;
  mimetype: string;
};

export type ChronicType = {
  id: number;
  name?: string;
  slug?: string;
};

export type CreateServerDto = {
  id?: number;
  name: string;
  link: string;
  rates: number;
  chronic: string;
  open_date: Date | string | undefined;
  serverTags: string[];
  server_type: ServerStatusType;
  banners?: string[];
  cash_reward_text?: string;
  promotion_bonus_text?: string;
  bonus_for_newbies_text?: string;
  orders?: ResponseOrderType[];
};

export type ServerResponseType = {
  id: number;
  name: string;
  link: string;
  rates: number;
  chronic: ChronicType;
  open_date: Date;
  server_type: ServerStatusType;
  registeredAt?: Date;
  updatedAt?: Date;
  views?: 0;
  status?: ServerModerationStatusType;
  serverTags: ServerTagType[];
  userId?: number;
  cash_reward_text: string;
  bonus_for_newbies_text: string;
  promotion_bonus_text: string;
  orders?: ResponseOrderType[];
};

export type ServerType = {
  id: number;
  name: string | undefined;
  server_type: ServerStatusType;
  status?: ServerModerationStatusType;
  serverTags?: ServerTagType[];
  open_date: Date | string | undefined;
  rates: number | undefined;
  chronic: ChronicType | undefined;
  link: string | undefined;
  cash_reward_text?: string;
  promotion_bonus_text?: string;
  bonus_for_newbies_text?: string;
};

export type ResponseServers = {
  items: ServerResponseType[];
  count: number;
};

export type ResponseServices = {
  packages: PackageItemType[];
  banners: PackageItemType[];
};

export type ResponseOrderType = {
  id: number;
  registeredAt: string;
  updateAt: string;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  userId: number;
  serverId: number;
  orderItems?: ResponseOrderItemType[];
};

export type ResponseOrderItemType = {
  id: number;
  orderId: number;
  unitPrice: number;
  days: number;
  start_date: string;
  end_date: string;
  status: ServerModerationStatusType;
  serviceId: number;
  serviceGroup: ServerStatusType | BannerStatusType;
  serviceType: OrderServiceType;
};

export type FormType = {
  type: "popup" | "page";
  setStep?: (step: number) => void;
  status?: string;
};

export type FiltersType = {
  filters: FilterType[];
};

export type FilterType = {
  title: string;
  nameField: string;
  itemWidth: number;
  showItems?: number;
  showAllText?: string;
  items: FilterItemType[];
};

export type FilterItemType = {
  title: string;
  value: number;
  count?: number;
  name?: string;
};

export type BannerType = {
  link: string;
  image: StaticImageData;
  type: "default" | "user";
  view: number;
  buttonText: string;
};

export type ServerTagType = {
  id?: number;
  icon?: any;
  name: string;
  slug: string;
  content?: string;
};

export type ServersType = {
  title: string;
  items: ServerResponseType[];
  withIcons?: boolean;
};

export type AllServersType = {
  openedVip: ServersType;
  openSoonVip: ServersType;
  today: ServersType;
  tomorrow: ServersType;
  last10Days: ServersType;
  next10Days: ServersType;
  days10Less: ServersType;
  days10More: ServersType;
};

export enum ServerStatusType {
  default = "default",
  vip = "vip",
  super_vip = "super_vip",
}

export enum ServerModerationStatusType {
  success = "success",
  pending = "pending",
  reject = "reject",
}

export enum BannerStatusType {
  banner_1 = "banner_1",
  banner_2 = "banner_2",
}

export enum OrderServiceType {
  banner_1 = "banner_1",
  banner_2 = "banner_2",
  server_type = "server_type",
}
interface IObjectKeys {
  [key: string]: any;
}

export interface PackageItemType extends IObjectKeys {
  available: number;
  days: number;
  group: ServerStatusType | BannerStatusType;
  id: number;
  unitPrice: number;
  maxCount: number;
  start_date: string;
  end_date: string;
  title: string;
  type: OrderItemType;
  content?: string;
  serverId?: number | undefined | null;
}

export type PackageType = {
  // title: string;
  // package_items: PackageItemType[];
  // server_type: ServerStatusType;
  // content?: string;
  // available?: number;
  [key: string]: PackageItemType[];
};

export type PackageBannerType = {
  title: string;
  package_items: PackageItemType[];
  banner_type: BannerStatusType;
  content?: string;
  available?: number;
};

export type OrderItemType = {
  id: number;
  title: string;
  order_service_type: OrderServiceType | string;
  days: number;
  server_type?: ServerStatusType;
  price: number;
  start_date: string;
  end_date: string;
};

export type SelectServer = {
  dateFrom?: string;
  dateEnd?: string;
  limit: number;
  vip?: boolean;
};

export enum PaymentStatus {
  Created = "Created",
  Processing = "Processing",
  Succeeded = "Succeeded",
  Failed = "Failed",
}

export type ServiceType = {
  service: {
    id: number;
    title: string;
    group: string;
    content: string;
    unitPrice: number;
    days: number;
    maxCount: number;
    registeredAt: string;
    updatedAt: string;
    type: OrderServiceType;
  };
  available: number;
  start_date: string;
  end_date: string;
};

export type SelectServiceType = {
  id: number;
  date?: string;
};

export type FileType = {
  file: Stream;
};

export type SelectFileType = {
  id: number;
};

export type DiscountType = {
  id: number;
  title: string;
  content: string;
  discount: number;
  min: number;
  max: number;
  level: number;
};
