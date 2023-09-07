
export interface IProductAllocatedGroup {
  groupId: number
  quantity: number
}

export interface IProductGroupCreate {
  productAllocatedId: number
  productAllocatedGroups: IProductAllocatedGroup[]
}

export interface ISupplier {
  id: number
  name: string
  address: string
}

export interface IWarehouse {
  id: number
  name: string
}

export interface IProduct {
    id: number
    name: string
}

export interface IGroup {
    id: number
    name: string
}

export interface IProductAllocatedBase {
  id: number
  quantity: number
  shelfLifeStart: string
  shelfLifeEnd: string
}

export interface IProductQuantityGroupOut {
  quantity: number
  group: IGroup  
}

export interface IAllocatedProductOut extends IProductAllocatedBase {
  product: IProduct
  productQuantityGroups: IProductQuantityGroupOut[]
}

export interface IInboundOrderBase {
  orderId: string
  status: string
  title: string
  activeDate: string
  activeTime: string
  deliveryDate: string
  supplier: ISupplier
  warehouse: IWarehouse
}

export interface IInboundOrderOut extends IInboundOrderBase {
  uuid: string
  productsAllocated: IAllocatedProductOut[]
}