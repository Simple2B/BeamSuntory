import { IGroup } from "../types"

export interface IProductAllocatedGroup {
  groupId: number
  quantity: number
}

export interface IProductGroupCreate {
  productAllocatedId: number
  productAllocatedGroups: IProductAllocatedGroup[]
}

export interface IProduct {
  id: number
  name: string
  image: string
  SKU: string
  regularPrice?: number
  retailPrice?: number
  warehouseProducts?: IWarehouseProduct[]
}

export interface IWarehouseProduct {
  id: number
  product_id: number
  warehouse_id: number
  product_quantity: number
  warehouse: IWarehouse
  group: IGroup
}


export interface IProductAllocatedBase {
  id: number
  quantity: number
  shelfLifeStart: string
  shelfLifeEnd: string
}

export interface IProductQuantityGroupOut {
  id: number
  quantity: number
  group: IGroup
}

export interface IAllocatedProductOut extends IProductAllocatedBase {
  product: IProduct
  productQuantityGroups: IProductQuantityGroupOut[]
}



export interface IInboundOrderOut extends IInboundOrderBase {
  id: number
  uuid: string
  productsAllocated: IAllocatedProductOut[]
}
