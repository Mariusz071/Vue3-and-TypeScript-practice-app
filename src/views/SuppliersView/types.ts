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

export interface VDataTableHeader {
  title: string
  align: string
  sortable: boolean
  key: string
}
