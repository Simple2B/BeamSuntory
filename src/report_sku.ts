import { ModalOptions, Modal } from 'flowbite';
import { IProduct, IWarehouse, IInboundOrderBase, IPagination } from './inbound_order/types';
import HTMXDispatcher from './htmx';

interface IUser {
  username: string;
}

interface ICart {
  group: string;
  product: IProduct;
}

interface IAdjust {
  group: string;
  product: IProduct;
}

interface IAssign {
  group: string;
  product: IProduct;
}

interface IRequestShare {
  group: string;
  product: IProduct;
}

interface IWarehouseProduct {
  group: string;
  product: IProduct;
}

interface IReportSKU {
  qtyBefore: number;
  qtyAfter: number;
  type: string;
  status: string;
  product: IProduct;
  inboundOrders: IInboundOrderBase[];
  shipRequests: IShipRequest[];
  adjustments: IAdjust[];
  assigns: IAssign[];
  shares: IRequestShare[];
  warehouseProduct: IWarehouseProduct;
  createdAt: string;
}

interface IShipRequest {
  id: number;
  carts: ICart[];
  comment: string;
  createdAt: string;
  daNotes: string;
  orderNumb: string;
  orderStatus: string;
  store: IStore;
  storeId: number;
  wmNotes: string;
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

interface IReportSKUResponse {
  pagination: IPagination;
  reportSKUList: IReportSKU[];
}

// initialize htmx listener
const htmxDispatcher = new HTMXDispatcher();

const defaultBrandImage =
  'https://funko.com/on/demandware.static/-/Sites-funko-master-catalog/default/dwbb38a111/images/funko/upload/55998_CocaCola_S2_SpriteBottleCap_POP_GLAM-WEB.png';

const formatDate = (date: string) => {
  const createAt = new Date(date);
  const year = createAt.getFullYear();
  const month = String(createAt.getMonth() + 1).padStart(2, '0'); // Month is 0-based
  const day = String(createAt.getDate()).padStart(2, '0');
  const hours = String(createAt.getHours()).padStart(2, '0');
  const minutes = String(createAt.getMinutes()).padStart(2, '0');
  return `${month}/${day}/${year} ${hours}:${minutes}`;
};

const downloadCSV = async function () {
  // Filters
  const searchSKUInput: HTMLInputElement = document.querySelector('#table-search-sku');
  const dateSKUCreatedFromInput: HTMLInputElement = document.querySelector('#product-sku-sort-created-from-datepicker');
  const dateSKUCreatedToInput: HTMLInputElement = document.querySelector('#product-sku-sort-created-to-datepicker');

  const filtersMap = {
    q: searchSKUInput,
    created_from: dateSKUCreatedFromInput,
    created_to: dateSKUCreatedToInput,
  };

  const filterQuery = [];
  for (const [queryKey, queryInput] of Object.entries(filtersMap)) {
    filterQuery.push(`${queryKey}=${queryInput.value}`);
  }

  // CSV Headers
  const csvData = ['SKU, Report Type, Status, Qty Before, Qty After, Created at'];
  let pages = 1;
  const queryTail = filterQuery ? filterQuery.join('&') : '';

  for (let page = 1; page <= pages; page++) {
    const currentURL = window.location.href;
    const urlWithoutQueryParams = currentURL.split('?')[0];
    const url = [`api?page=${page}`, queryTail].join('&');

    const res = await fetch(`${urlWithoutQueryParams}/${url}`);
    const data: IReportSKUResponse = await res.json();

    data.reportSKUList.forEach((report: IReportSKU) => {
      let qtyBefore;
      let qtyAfter;
      if (!qtyBefore && !qtyBefore) {
        qtyBefore = '-';
        qtyAfter = '-';
        console.log(qtyBefore, qtyAfter);
      } else if (!qtyBefore) {
        qtyBefore = '-';
        qtyAfter = report.qtyAfter.toString();
      } else {
        qtyBefore = report.qtyBefore.toString();
        qtyAfter = report.qtyAfter.toString();
      }

      csvData.push(
        [report.product.SKU, report.type, report.status, qtyBefore, qtyAfter, formatDate(report.createdAt)].join(',')
      );
    });

    pages = data.pagination.pages;
  }
  const blob = new Blob([csvData.join('\n')], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', 'inventories.csv');
  a.click();
  a.remove();
};

document.addEventListener('DOMContentLoaded', () => {
  const filtersHTML = document.querySelectorAll(
    "[name='q'], [name='username'], [name='created_from'], [name='created_to'], [name='master_group'], [name='group'], [name='group_brand'],  [name='group_category'], [name='group_language'], [name='group_premises'], [name='group_event']"
  );
  const buttonLoadInventoriesTable = document.querySelector('#table-report-loader') as HTMLButtonElement;

  const clearFilterButton = document.querySelector('#product-sku-clear-button');
  clearFilterButton.addEventListener('click', () => {
    filtersHTML.forEach((filter) => {
      (filter as HTMLInputElement).value = '';
    });
    buttonLoadInventoriesTable.click();
  });
  // load table
  buttonLoadInventoriesTable.click();
});

// Download csv
const downloadCsvButton = document.getElementById('button-csv-download') as HTMLButtonElement;
downloadCsvButton.addEventListener('click', downloadCSV);
