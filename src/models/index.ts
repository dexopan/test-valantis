export interface IParam {
	offset?: number
	limit?: number
	ids?: string[]
	field?: string
	brand?: string
	price?: number
	product?: string
}

export interface IItem {
	brand: string
	id: string
	price: number
	product: string
}