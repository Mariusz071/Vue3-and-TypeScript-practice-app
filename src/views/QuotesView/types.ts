export interface Quote {
  id: number
  amount: string
  created: string
  title: string
  supplierId: string
}

export interface QuotesResponse {
  count: string
  next: string
  previous: string
  results: Quote[]
}
