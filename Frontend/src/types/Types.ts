export interface MobileType {
  _id: string;
  countryCode: string;
  number: string;
}

export interface OrderType {}

export interface UserDataType {
  _id: string;
  username: string;
  email: string;
  mobile: MobileType;
  orders: OrderType[];
  role: string;
  status: string;
  address: [];
  createdAt: string;
  updatedAt: string;
  cart: string;
}

export interface InitialStateType {
  status: boolean;
  userData: UserDataType | null;
  isOpen: boolean;
}
