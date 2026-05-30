export type cartProductType = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  thumbnail: string;
};

export type cartType = {
  id: number;
  userId: number;
  total: number;
  totalProducts: number;
  totalQuantity: number;
  products: cartProductType[];
};

export type addCartType = {
  userId: number;
  products: { id: number; quantity: number }[];
};

export type updateCartType = {
  id: number;
  merge?: boolean;
  products?: { id: number; quantity: number }[];
};

export type deleteCartType = {
  id: number;
};

export type cartResponse = {
  carts: cartType[];
  total: number;
  skip: number;
  limit: number;
};
