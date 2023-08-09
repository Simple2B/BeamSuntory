interface SupDAWhProd {
    supplier: string;
    delivery_agent: string;
    warehouse: string;
    product: string;
}
interface IInboundOrder {
    id: number;
    order_id: string;
    active_date: number;
    active_time: string;
    order_title: string;
    quantity: number;
    delivery_date: string;
    status: string;
    supplier_id: number;
    delivery_agent_id: number;
    warehouse_id: number;
    product_id: number;
    sup_da_wh_prod_objs: SupDAWhProd;
    inbound_order_prods: {
        [index: string]: IInboundOrderProd[];
    };
}
interface IInboundOrderProd {
    product: {
        id: number;
        name: string;
        SKU: string;
        image: string;
    };
    group: {
        id: number;
        name: string;
    };
    quantity: number;
}
declare const searchPickupInboundInput: HTMLInputElement;
declare const searchPickupInboundInputButton: Element;
declare const pickupInboundButtons: NodeListOf<Element>;
declare const orderFilterPickupInboundInputs: NodeListOf<Element>;
declare const sortByNamePickupInboundStorage: any;
