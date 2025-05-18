import useCreateProduct from "../hooks/useCreateProduct"

export default function ProductCreateForm() {
    const {mutate} = useCreateProduct()

    const handleSubmit  = (e: React.FormEvent) => {
        e.preventDefault()
        mutate(Object.fromEntries(new FormData(e.currentTarget)))
    }

    return <form action="" onSubmit={handleSubmit}>
        <input type="text" />
        <button type="submit">Vrear</button>
    </form>
}