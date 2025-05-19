import useGetProducts from "@/feature/products/hooks/useGetProducts";

export default function Home() {
    const { data, isLoading, error } = useGetProducts();

    if (isLoading) return <p>Cargando productos...</p>;
    if (error) return <p>Error al cargar productos</p>;

    return (
        <div>
            <h2>Productos (desde Home)</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
