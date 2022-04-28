export interface IProduct{
    id?:string,
    productId: string,
    name: string,
    image: string,
    price: number,
    type: string,
    hide?: boolean,
    subtotal?: number
}