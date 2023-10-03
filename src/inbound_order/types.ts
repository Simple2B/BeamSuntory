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
  contact_number: string
}

export interface IWarehouse {
  id: number
  name: string
}

export interface IProduct {
  id: number
  name: string
  image: string
  SKU: string
  regularPrice?: number
  retailPrice?: number
  warehouseProducts?: IWarehouseProduct[]
  supplier: ISupplier
  warehouses: IWarehouse[]
}

export interface IWarehouseProduct {
  id: number
  product_id: number
  warehouse_id: number
  product_quantity: number
  warehouse: IWarehouse
  group: IGroup
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
  id: number
  quantity: number
  group: IGroup
}

export interface IAllocatedProductOut extends IProductAllocatedBase {
  product: IProduct
  productQuantityGroups: IProductQuantityGroupOut[]
}

export interface IInboundOrderBase {
  id: number
  orderId: string
  status: string
  title: string
  activeDate: string
  activeTime: string
  deliveryDate: string
  supplier: ISupplier
  warehouse: IWarehouse
  wmNotes: string
  daNotes: string
}

export interface IInboundOrderOut extends IInboundOrderBase {
  id: number
  uuid: string
  productsAllocated: IAllocatedProductOut[]
}
