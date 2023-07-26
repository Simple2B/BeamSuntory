interface IShipRequest {
    id: number;
    order_numb: string;
    status: string;
    order_type: string;
    store_id: number;
    warehouse_id: number;
    warehouse_name: string;
    created_at: string;
    quantity: number;
    current_order_carts: IProduct[];
    comment: string;
    warehouses: IWarehouse[];
}
interface IProduct {
    id: number;
    name: string;
    quantity: string;
    price: number;
    image: string;
    SKU: string;
    comment: string;
}
interface IStore {
    id: number;
    store_name: string;
    address: string;
    phone_numb: string;
    country: string;
    region: string;
    city: string;
    zip: string;
}
interface IWarehouse {
    id: number;
    name: string;
}
declare const searchOutgoingInput: HTMLInputElement;
declare const searchOutgoingInputButton: Element;
declare const dispatchButtons: NodeListOf<Element>;
declare const cancelButtons: NodeListOf<Element>;
