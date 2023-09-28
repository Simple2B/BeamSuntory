interface IEvent {
    dateFrom: string;
    dateTo: string;
}
interface IStore {
    id: number;
    storeName: string;
    address: string;
    phoneNumb: string;
    country: string;
    region: string;
    city: string;
    zip: string;
}
interface ICart {
    product: IProduct;
    group: string;
    quantity: number;
    event?: IEvent;
    warehouse?: IWarehouse;
    status: string;
}
export interface IShipRequest {
    id: number;
    orderNumb: string;
    status: string;
    orderType: string;
    storeId: number;
    warehouseId: number;
    warehouseName: string;
    createdAt: string;
    quantity: number;
    current_order_carts: IProduct[];
    comment: string;
    wmNotes: string;
    daNotes: string;
    carts: ICart[];
    store: IStore;
}
interface IProduct {
    id: number;
    name: string;
    quantity: string;
    regularPrice: number;
    retailPrice: number;
    image: string;
    SKU: string;
    comment: string;
    notes_location: string;
    group: string;
    warehouse: {
        id: number;
        name: string;
    };
    warehouses: IWarehouse[];
}
interface IWarehouse {
    id: number;
    name: string;
    products_ids: number[];
}
export {};
