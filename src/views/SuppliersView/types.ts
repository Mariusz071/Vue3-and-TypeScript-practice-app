export interface Supplier {
  id: number
  name: string
  description: string
}

export interface SuppliersResponse {
  count: number
  next: string
  previous?: string
  results: Supplier[]
}

export interface VDataTableItem extends Object {
  value: number
}
