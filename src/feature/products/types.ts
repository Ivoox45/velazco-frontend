export type CreateProduct = {
    name: string;
    price: number;
    stock: number;
    active: boolean;
    categoryId: number;
};
export type Category = {
    id: number;
    name: string;
};

export type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
    active: boolean;
    category: Category;
};
