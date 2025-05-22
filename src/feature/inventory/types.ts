// ✅ Tipo para crear un producto (request)
export type CreateProduct = {
    name: string;
    price: number;
    stock: number;
    active: boolean;
    categoryId: number;
    image?: File; // FormData file (opcional)
};

// ✅ Tipo para actualizar un producto (request)
export type UpdateProduct = {
    name: string;
    price: number;
    stock: number;
    active: boolean;
    categoryId: number;
    image?: File; // FormData file (opcional)
};

// ✅ Tipo para actualizar solo el estado activo
export type UpdateProductActive = {
    active: boolean;
};

// ✅ Tipo de categoría en respuestas de producto
export type CategoryProductResponse = {
    id: number;
    name: string;
};

// ✅ Tipo de respuesta al crear un producto
export type ProductCreateResponse = {
    id: number;
    name: string;
    price: number;
    stock: number;
    image: string | null;
    active: boolean;
    category: CategoryProductResponse;
};

// ✅ Tipo de respuesta al actualizar un producto
export type ProductUpdateResponse = {
    id: number;
    name: string;
    price: number;
    stock: number;
    image: string | null;
    active: boolean;
    category: CategoryProductResponse;
};

// ✅ Tipo de respuesta al actualizar solo el estado activo
export type ProductUpdateActiveResponse = {
    id: number;
    active: boolean;
};

// ✅ Tipo de producto para listados (GET /products)
export type ProductListResponse = {
    id: number;
    name: string;
    price: number;
    stock: number;
    image: string | null;
    active: boolean;
    category: CategoryProductResponse;
};

// ✅ Tipo para crear una categoría (request)
export type CreateCategory = {
    name: string;
};

// ✅ Tipo para actualizar una categoría (request)
export type UpdateCategory = {
    name: string;
};

// ✅ Tipo de respuesta al crear una categoría
export type CategoryCreateResponse = {
    id: number;
    name: string;
};

// ✅ Tipo de respuesta al actualizar una categoría
export type CategoryUpdateResponse = {
    id: number;
    name: string;
};

// ✅ Tipo de categoría en listas (GET /categories)
export type Category = {
    id: number;
    name: string;
};