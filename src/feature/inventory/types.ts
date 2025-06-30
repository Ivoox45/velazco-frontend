export type CreateProduct = {
  name: string;
  price: number;
  stock: number;
  active: boolean;
  categoryId: number;
  image?: File;
};

export type UpdateProduct = {
  name: string;
  price: number;
  stock: number;
  active: boolean;
  categoryId: number;
  image?: File;
};

export type UpdateProductActive = {
  active: boolean;
};

export type CategoryProductResponse = {
  id: number;
  name: string;
};

export type ProductCreateResponse = {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string | null;
  active: boolean;
  category: CategoryProductResponse;
};

export type ProductUpdateResponse = {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string | null;
  active: boolean;
  category: CategoryProductResponse;
};

export type ProductUpdateActiveResponse = {
  id: number;
  active: boolean;
};

export type ProductListResponse = {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string | null;
  active: boolean;
  category: CategoryProductResponse;
};

export type CreateCategory = {
  name: string;
};

export type UpdateCategory = {
  name: string;
};

export type CategoryCreateResponse = {
  id: number;
  name: string;
};

export type CategoryUpdateResponse = {
  id: number;
  name: string;
};

export type Category = {
  id: number;
  name: string;
};
