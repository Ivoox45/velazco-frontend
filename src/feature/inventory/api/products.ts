import axios from "@/lib/axios";
import type {
    CreateProduct,
    UpdateProduct,
    UpdateProductActive,
    ProductListResponse,
    ProductCreateResponse,
    ProductUpdateResponse,
    ProductUpdateActiveResponse,
} from "../types";

// ✅ Obtener todos los productos
export async function getProducts(): Promise<ProductListResponse[]> {
    const response = await axios.get("/products");
    return response.data;
}

// ✅ Crear producto (con imagen opcional)
export async function createProduct(
    product: CreateProduct
): Promise<ProductCreateResponse> {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price.toString());
    formData.append("stock", product.stock.toString());
    formData.append("active", product.active.toString());
    formData.append("categoryId", product.categoryId.toString());
    if (product.image) {
        formData.append("image", product.image);
    }

    const response = await axios.post("/products", formData);
    return response.data;
}

// ✅ Actualizar producto completo (con imagen opcional)
export async function updateProduct(
    id: number,
    product: UpdateProduct
): Promise<ProductUpdateResponse> {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price.toString());
    formData.append("stock", product.stock.toString());
    formData.append("active", product.active.toString());
    formData.append("categoryId", product.categoryId.toString());
    if (product.image) {
        formData.append("image", product.image);
    }

    const response = await axios.put(`/products/${id}`, formData);
    return response.data;
}

// ✅ Cambiar solo el estado "activo" del producto
export async function updateProductActive(
    id: number,
    activeStatus: UpdateProductActive
): Promise<ProductUpdateActiveResponse> {
    const response = await axios.patch(`/products/${id}/active`, activeStatus);
    return response.data;
}

// ✅ Eliminar producto
export async function deleteProduct(id: number): Promise<void> {
    await axios.delete(`/products/${id}`);
}
