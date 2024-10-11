declare enum UserRole {
    admin = "admin",
    sales_rep = "sales_rep",
    warehouse_manager = "warehouse_manager"
}
declare const salesAddRepContainer: HTMLDivElement;
declare const salesAddRepBody: HTMLInputElement;
declare const salesRepAddUserCheckbox: HTMLInputElement;
declare const userSelectRole: HTMLSelectElement;
declare const userAddDropdownBtn: Element;
declare const optionItems: NodeListOf<Element>;
declare let selectedOptions: string[];
declare const options: Element;
declare function setRequiredLockerAddress(): void;
declare function removeRequiredLockerAddress(): void;
declare const handlerSaleRepAddressInputs: () => void;
declare function handleUserAddDropdownBtnClick(): void;
