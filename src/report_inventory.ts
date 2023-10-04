import { ModalOptions, Modal } from 'flowbite';
import { IProduct, IWarehouse, IInboundOrderBase } from './inbound_order/types';
import HTMXDispatcher from './htmx';

interface IUser {
  username: string;
}

interface ICart {
  group: string;
  product: IProduct;
}

interface IReportInventory {
  qtyBefore: number;
  qtyAfter: number;
  product: IProduct;
  warehouseProductId: number;
  createdAt: string;
}

interface IReportInventoryList {
  type: string;
  user: IUser;
  createdAt: string;
  shipRequest: IShipRequest;
  inbound_order: IInboundOrderBase;
  warehouse: IWarehouse;
  store: IStore;
  reportInventories: IReportInventory[];
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

interface IInventoriesReportResponse {
  pagination: IPagination;
  reportInventoryList: IReportInventoryList[];
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
  const searchInventoryInput: HTMLInputElement = document.querySelector('#table-search-inventory');
  const dateInventoryCreatedFromInput: HTMLInputElement = document.querySelector(
    '#product-inventory-sort-created-from-datepicker'
  );
  const dateInventoryCreatedToInput: HTMLInputElement = document.querySelector(
    '#product-inventory-sort-created-to-datepicker'
  );

  const filtersMap = {
    q: searchInventoryInput,
    created_from: dateInventoryCreatedFromInput,
    created_to: dateInventoryCreatedToInput,
  };

  const filterQuery = [];
  for (const [queryKey, queryInput] of Object.entries(filtersMap)) {
    filterQuery.push(`${queryKey}=${queryInput.value}`);
  }

  // CSV Headers
  const csvData = ['created_at,store_name,type,username,qty_before,qty_after,sku,product_name'];
  let pages = 1;
  const queryTail = filterQuery ? filterQuery.join('&') : '';

  for (let page = 1; page <= pages; page++) {
    const currentURL = window.location.href.replace(/#/g, '');
    const urlWithoutQueryParams = currentURL.split('?')[0];
    const url = [`api?page=${page}`, queryTail].join('&');

    const res = await fetch(`${urlWithoutQueryParams}/${url}`);
    const data: IInventoriesReportResponse = await res.json();

    data.reportInventoryList.forEach((reportInventories) => {
      reportInventories.reportInventories.forEach((report: IReportInventory) => {
        let reportTarget;
        if (reportInventories.store) {
          reportTarget = reportInventories.store.storeName;
        } else if (reportInventories.warehouse) {
          reportTarget = reportInventories.warehouse.name;
        } else {
          reportTarget = 'Internal action';
        }

        csvData.push(
          [
            formatDate(report.createdAt),
            reportTarget,
            reportInventories.type,
            reportInventories.user.username,
            report.qtyBefore.toString(),
            report.qtyAfter.toString(),
            report.product.SKU,
            report.product.name,
          ].join(',')
        );
      });
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
    "[name='q'], [name='username'], [name='created_from'], [name='created_to'], [name='master_group'], [name='group'], [name='group_brand'],  [name='group_category'], [name='group_language'], [name='group_premises'], [name='report_type']"
  );
  const buttonLoadInventoriesTable = document.querySelector('#table-report-loader') as HTMLButtonElement;

  const tableRow = document.querySelectorAll('.table-inventory-item-tr');
  tableRow.forEach((row: HTMLDivElement) => {
    const viewReportInventoriesModal = row.querySelector('.report-inventory-view-btn');
    const data = JSON.parse(viewReportInventoriesModal.getAttribute('data-target'));
    const reportStore = data.shipRequest.store.storeName;
    const reportInventoryStoreDiv = row.querySelector('.report-inventory-store') as HTMLDivElement;
    reportInventoryStoreDiv.innerHTML = reportStore;
  });

  const clearFilterButton = document.querySelector('#product-inventory-clear-button');
  clearFilterButton.addEventListener('click', () => {
    filtersHTML.forEach((filter) => {
      (filter as HTMLInputElement).value = '';
    });
    buttonLoadInventoriesTable.click();
  });
  // load table
  buttonLoadInventoriesTable.click();

  // initialize modal
  const viewReportInventoriesModal = document.getElementById('view-report-inventories-modal') as HTMLDivElement;
  const viewModalOptions: ModalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
      const productItems = document.querySelectorAll('.product-item-view') as NodeListOf<HTMLTableColElement>;
      productItems.forEach((productItem) => productItem.remove());
    },
  };

  const viewModal = new Modal(viewReportInventoriesModal, viewModalOptions);
  const reportViewProductTbody = document.querySelector('#table-products') as HTMLTableElement;
  const productItemTemplate = document.querySelector('#view-product-item-template') as HTMLTableRowElement;
  const closingViewModalButton = document.querySelector('#button-closing-report-inventory-modal') as HTMLButtonElement;
  closingViewModalButton.addEventListener('click', () => {
    viewModal.hide();
  });

  // view buttons click
  const reportViewUser = document.getElementById('report-inventory-user') as HTMLDivElement;
  const reportViewAction = document.getElementById('report-inventory-action') as HTMLDivElement;
  const reportViewDate = document.getElementById('report-inventory-date') as HTMLDivElement;
  const reportStoreName = document.getElementById('report-store-name') as HTMLDivElement;

  // onload element with inventories-table id
  htmxDispatcher.onLoad('inventories-table', (target) => {
    const reportViewButtons: NodeListOf<HTMLButtonElement> = target.querySelectorAll('.report-inventory-view-btn');
    reportViewButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const reportInventory: IReportInventoryList = JSON.parse(btn.getAttribute('data-target'));

        reportViewUser.innerHTML = reportInventory.user.username;
        reportViewAction.innerHTML = reportInventory.type;
        reportViewDate.innerHTML = formatDate(reportInventory.createdAt);
        if (reportInventory.store) {
          reportStoreName.innerHTML = reportInventory.store.storeName;
        } else if (reportInventory.warehouse) {
          reportStoreName.innerHTML = reportInventory.warehouse.name;
        } else {
          reportStoreName.innerHTML = 'Internal action';
        }

        reportInventory.reportInventories.forEach((inventory, i) => {
          // Render inventory
          const newProductItem = productItemTemplate.cloneNode(true) as HTMLElement;
          newProductItem.removeAttribute('id');
          newProductItem.classList.remove('hidden');
          newProductItem.classList.add(
            'product-item-view',
            'text-base',
            'font-semibold',
            'text-gray-900',
            'dark:text-white'
          );
          const productIndex = newProductItem.querySelector('.product-index') as HTMLDivElement;
          const productName = newProductItem.querySelector('.product-name') as HTMLDivElement;
          const productSku = newProductItem.querySelector('.product-sku') as HTMLDivElement;
          const productRegularPrice = newProductItem.querySelector('.product-regular-price') as HTMLDivElement;
          const productRetailPrice = newProductItem.querySelector('.product-retail-price') as HTMLDivElement;
          const productGroup = newProductItem.querySelector('.product-group') as HTMLDivElement;
          const productWarehouse = newProductItem.querySelector('.product-warehouse') as HTMLDivElement;
          const img: HTMLImageElement = newProductItem.querySelector('.product-image');

          inventory.product.image.length > 100
            ? (img.src = `data:image/png;base64, ${inventory.product.image}`)
            : (img.src = defaultBrandImage);

          productIndex.innerHTML = (i + 1).toString();
          productName.innerHTML = inventory.product.name;
          productSku.innerHTML = inventory.product.SKU;

          // TODO do we need to show price or qty or both?
          // if (inventory.product.regularPrice) {
          //   productRegularPrice.innerHTML = inventory.product.regularPrice.toString()
          // } else {
          //   productRegularPrice.innerHTML = 'No price'
          //
          // }

          // if (inventory.product.retailPrice) {
          //   productRetailPrice.innerHTML = inventory.product.retailPrice.toString()
          // } else {
          //   productRetailPrice.innerHTML = 'No price'
          // }

          if (inventory.qtyBefore) {
            productRegularPrice.innerHTML = inventory.qtyBefore.toString();
          } else {
            productRegularPrice.innerHTML = '0';
          }

          if (inventory.qtyAfter) {
            productRetailPrice.innerHTML = inventory.qtyAfter.toString();
          } else {
            productRetailPrice.innerHTML = '0';
          }
          inventory.product.warehouseProducts.forEach((warehouseProduct) => {
            if (warehouseProduct.id === inventory.warehouseProductId) {
              productGroup.innerHTML = warehouseProduct.group.name;
              productWarehouse.innerHTML = warehouseProduct.warehouse.name;
            }
          });
          reportViewProductTbody.appendChild(newProductItem);
          viewModal.show();
        });
      });
    });
  });
});
// Download csv
const downloadCsvButton = document.getElementById('button-csv-download') as HTMLButtonElement;
downloadCsvButton.addEventListener('click', downloadCSV);
