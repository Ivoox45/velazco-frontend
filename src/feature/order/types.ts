export type Category = {
  id: number
  name: string
}

export type Product = {
  id: number
  name: string
  description: string
  price: number
  stock: number
  active: boolean
  image?: string
  category?: Category 
}


export type ProductOrder = {
  id: number
  name: string
}

export type DetailOrder = {
  quantity: number
  unitPrice: string 
  product: ProductOrder
}

export type OrderStartRequest = {
  clientName: string
  details: {
    productId: number
    quantity: number
  }[]
}

export type OrderStartResponse = {
  id: number
  date: string 
  clientName: string
  status: string
  attendedBy: {
    id: number
    name: string
  }
  details: DetailOrder[]
}

export type OrderConfirmSaleRequest = {
  paymentMethod: string
}

export type OrderConfirmSaleResponse = {
  id: number
  date: string
  clientName: string
  status: string
  sale: {
    id: number
    saleDate: string
    paymentMethod: string
    totalAmount: string
    cashier: {
      id: number
      name: string
    }
  }
}

export type OrderListResponse = {
  id: number
  date: string
  clientName: string
  status: string
  attendedBy: {
    id: number
    name: string
  }
  details: DetailOrder[]
}

export type PaginatedResponse<T> = {
  content: T[]
  totalPages: number
  totalElements: number
  pageNumber: number
  pageSize: number
}
