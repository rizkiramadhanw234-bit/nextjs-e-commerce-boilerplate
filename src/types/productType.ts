export type productType = {
  id: number;
  title: string;
  price: number;
  stock: number;
  category: string;
  thumbnail: string;
  description?: string;
};

export type productsResponse = {
  products: productType[];
  total: number;
  skip: number;
  limit: number;
};

export type categoryType = {
  slug: string;
  name: string;
  url: string;
};

export type categoriesResponse = categoryType[];
