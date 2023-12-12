import { IWarehouseProduct } from './inbound_order/types';
interface IPagination {
    pages: number;
}
interface IProduct {
    name: string;
    SKU: string;
    image: string;
    regularPrice: number;
    retailPrice: number;
    warehouseProducts: IWarehouseProduct[];
}
interface IEvents {
    id: number;
    product: IProduct;
    dateFrom: string;
    dateTo: string;
    comment: string;
    user: IUser;
}
interface IUser {
    username: string;
}
export interface IEventsResponse {
    pagination: IPagination;
    events: IEvents[];
}
interface IStore {
    active: boolean;
    address: string;
    city: string;
    contactPerson: string;
    country: string;
    createdAt: string;
    email: string;
    id: number;
    phoneNumb: string;
    region: string;
    storeCategoryId: number;
    storeName: string;
    zip: string;
}
interface IEvent {
    dateFrom: string;
    dateTo: string;
}
interface IProductEvent {
    dateFrom: string;
    dateTo: string;
    product: IProduct;
    quantity: number;
    event: IEvent;
    group: IGroup;
    status: string;
}
interface IShipRequest {
    id: number;
    carts: IProductEvent[];
    comment: string;
    createdAt: string;
    daNotes: string;
    orderNumb: string;
    orderStatus: string;
    store: IStore;
    storeId: number;
    wmNotes: string;
    status: string;
}
export interface IReportEvent {
    user: IUser;
    quantity: number;
    type: string;
    createdAt: string;
    history: string;
    shipRequest: IShipRequest;
}
export interface IEventsReportResponse {
    pagination: IPagination;
    reports: IReportEvent[];
}
interface IMasterGroup {
    id: number;
    name: string;
}
export interface IGroup {
    id: number;
    name: string;
    masterGroup: IMasterGroup;
}
export interface IRequestShare {
    status: string;
    desireQuantity: number;
    product: IProduct;
    fromGroup: IGroup;
    group: IGroup;
}
export interface IReportRequestShare {
    type: string;
    createdAt: string;
    history: string;
    requestShare: IRequestShare;
    user: IUser;
}
export interface IReportRequestShareResponse {
    pagination: IPagination;
    reports: IReportRequestShare[];
}
export interface ISupplier {
    id: number;
    name: string;
    address: string;
}
export interface IWarehouse {
    id: number;
    name: string;
}
export interface IInboundOrderBase {
    id: number;
    orderId: string;
    status: string;
    title: string;
    activeDate: string;
    activeTime: string;
    deliveryDate: string;
    supplier: ISupplier;
    warehouse: IWarehouse;
    wmNotes: string;
    daNotes: string;
}
interface IReportInventory {
    qtyBefore: number;
    qtyAfter: number;
    product: IProduct;
    group: IGroup;
    warehouse: IWarehouse;
    warehouseProductId: number;
    createdAt: string;
}
export interface IReportInventoryList {
    type: string;
    user: IUser;
    createdAt: string;
    shipRequest: IShipRequest;
    inbound_order: IInboundOrderBase;
    warehouse: IWarehouse;
    store: IStore;
    reportInventories: IReportInventory[];
}
export interface IInventoriesReportResponse {
    pagination: IPagination;
    reports: IReportInventory[];
}
export interface IReportAdjustResponse {
    pagination: IPagination;
    reports: IAdjust[];
}
export interface IAdjust {
    id: number;
    product: IProduct;
    note: string;
    user: IUser;
    createdAt: string;
    adjustGroupQty: IAdjustGroupQty[];
}
interface IAdjustGroupQty {
    id: number;
    group: IGroup;
    warehouse: IWarehouse;
    quantityAfter: number;
    quantityBefore: number;
}
export interface IReportInboundOrder {
    createdAt: string;
    history: string;
    inboundOrder: IInboundOrder;
    user: IUser;
    type: string;
}
interface IProductQuantityGroup {
    group: IGroup;
    quantity: number;
}
interface IProductsAllocated {
    product: IProduct;
    quantity: number;
    productQuantityGroups: IProductQuantityGroup[];
}
interface IInboundOrder {
    productsAllocated: IProductsAllocated[];
    warehouse: IWarehouse;
    title: string;
}
export interface IReportInboundOrderResponse {
    pagination: IPagination;
    reports: IReportInboundOrder[];
}
export interface IReportShipping {
    type: string;
    createdAt: string;
    history: string;
    shipRequest: IShipRequest;
    user: IUser;
}
export interface IReportShippingResponse {
    pagination: IPagination;
    reports: IReportShipping[];
}
export interface IReportAssign {
    id: number;
    createdAt: string;
    fromGroup: IGroup;
    group: IGroup;
    groupId: number;
    productId: number;
    product: IProduct;
    quantity: number;
    type: string;
    user: IUser;
}
export interface IReportAssignResponse {
    pagination: IPagination;
    reports: IReportAssign[];
}
export interface IReportShelfLife {
    quantity: number;
    quantityReceived: number;
    shelfLifeStart: string;
    shelfLifeEnd: string;
    product: IProduct;
}
export interface IReportShelfLifeResponse {
    pagination: IPagination;
    reportShelfLifeList: IReportShelfLife[];
}
export {};
