export interface ProductType {
  _id: string;
  skuID: string;
  title: string;
  price: number;
  description: string;
  category: string;
  images: [string];
  brand: string;
  size: [string];
  color: [string];
  gender: [string];
  stock: number;
  createdAt: string;
  updatedAt: string;
}
