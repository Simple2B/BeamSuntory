interface IPagination {
    pages: number;
}
interface IProduct {
    name: string;
    SKU: string;
}
interface IEvents {
    id: number;
    product: IProduct;
    dateFrom: string;
    dateTo: string;
    comment: string;
}
interface IEventsResponse {
    pagination: IPagination;
    events: IEvents[];
}
declare function getFilterValues(): void;
declare function setFilterValues(): void;
declare function clearSearchDateInput(): void;
declare const clearDateSearchButton: Element;
declare const downloadCSV: () => Promise<void>;
