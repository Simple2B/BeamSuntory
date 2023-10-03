import { IGroup, IProduct } from './inbound_order/types';
export interface IRequestShare {
    status: string;
    desireQuantity: number;
    product: IProduct;
    group: IGroup;
}
