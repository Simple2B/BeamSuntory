import { IGroup, IInboundOrderBase, ISupplier, IWarehouse } from "../types"

export interface IProductAllocatedGroup {
  groupId: number;
  quantity: number;
}

export interface IProductGroupCreate {
  productAllocatedId: number;
  productAllocatedGroups: IProductAllocatedGroup[];
}

export interface IProduct {
  id: number;
  name: string;
  image: string;
  SKU: string;
  regularPrice?: number;
  retailPrice?: number;
  warehouseProducts?: IWarehouseProduct[];
  supplier: ISupplier;
  description: string;
  warehouses: IWarehouse[];
}

export interface IWarehouseProduct {
  id: number;
  productId: number;
  warehouseId: number;
  productQuantity: number;
  warehouse: IWarehouse;
  group: IGroup;
}


export interface IProductAllocatedBase {
  id: number;
  quantity: number;
  shelfLifeStart: string;
  shelfLifeEnd: string;
}

export interface IProductQuantityGroupOut {
  id: number;
  quantity: number;
  group: IGroup;
}

export interface IAllocatedProductOut extends IProductAllocatedBase {
  product: IProduct;
  productQuantityGroups: IProductQuantityGroupOut[];
}


export interface IInboundOrderOut extends IInboundOrderBase {
  id: number;
  uuid: string;
  productsAllocated: IAllocatedProductOut[];
}

export interface IPagination {
  pages: number;
}

export interface IUser {
  username: string;
}
