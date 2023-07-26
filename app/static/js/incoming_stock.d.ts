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
}
declare const searchInput: HTMLInputElement;
declare const searchInputButton: Element;
declare const acceptButtons: NodeListOf<Element>;
declare const cancelOrderButtons: NodeListOf<Element>;
