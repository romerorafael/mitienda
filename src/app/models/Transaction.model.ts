export interface ITransiction{
    id?: string,
    clientId?: string,
    total: number,
    products: IItem[]
}

export interface IItem{
    productId: string,
    quantity: number
}