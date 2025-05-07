import useGetProducts from "@/feature/products/hooks/useGetProducts";

export default function Home() {
    const { data, isLoading, error } = useGetProducts();
    return <div> {JSON.stringify(data)} </div>;
}
