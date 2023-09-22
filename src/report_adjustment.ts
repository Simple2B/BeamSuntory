import { ModalOptions, Modal } from 'flowbite';
import { IProduct } from './inbound_order/types';
import HTMXDispatcher from './htmx';

interface IUser {
  username: string;
}

interface IProductEvent {
  dateFrom: string;
  dateTo: string;
  product: IProduct;
  quantity: number;
  group: string;
}

interface IAdjustResponse {
  pagination: IPagination;
  events: IEvents[];
  adjusts: IAdjust[];
}

interface IAdjust {
  id: number;
  product: IProduct;
  note: string;
  user: IUser;
  createdAt: string;
}

// initialize htmx listener
const htmxDispatcher = new HTMXDispatcher();

const defaultBrandImage =
  'https://funko.com/on/demandware.static/-/Sites-funko-master-catalog/default/dwbb38a111/images/funko/upload/55998_CocaCola_S2_SpriteBottleCap_POP_GLAM-WEB.png';

const downloadCSV = async function () {
  // Filters
  const searchEventInput: HTMLInputElement = document.querySelector('#table-search-adjustment');
  const dateEventStartFromInput: HTMLInputElement = document.querySelector(
    '#product-adjustment-sort-start-from-datepicker'
  );
  const dateEventStartToInput: HTMLInputElement = document.querySelector(
    '#product-adjustment-sort-start-to-datepicker'
  );
  const dateEventEndFromInput: HTMLInputElement = document.querySelector(
    '#product-adjustment-sort-end-from-datepicker'
  );
  const dateEventEndToInput: HTMLInputElement = document.querySelector('#product-adjustment-sort-end-to-datepicker');

  const filtersMap = {
    q: searchEventInput,
    start_from: dateEventStartFromInput,
    start_to: dateEventStartToInput,
    end_from: dateEventEndFromInput,
    end_to: dateEventEndToInput,
  };

  const filterQuery = [];
  for (const [queryKey, queryInput] of Object.entries(filtersMap)) {
    filterQuery.push(`${queryKey}=${queryInput.value}`);
  }

  // CSV Headers
  const csvData = ['created_at,store_name,type,username,date_from,date_to,sku,product_name'];
  let pages = 1;
  const queryTail = '';

  for (let page = 1; page <= pages; page++) {
    const currentURL = window.location.href;
    const urlWithoutQueryParams = currentURL.split('?')[0];
    const url = [`api?page=${page}`, queryTail].join('&');
    const res = await fetch(`${urlWithoutQueryParams}/${url}`);
    const data: IEventsReportResponse = await res.json();

    data.report_events.forEach((reportEvent) => {
      reportEvent.shipRequest.carts.forEach((cart: IProductEvent) => {
        csvData.push(
          [
            reportEvent.createdAt,
            reportEvent.shipRequest.store.storeName,
            reportEvent.type,
            reportEvent.user.username,
            cart.event.dateFrom,
            cart.event.dateTo,
            cart.product.SKU,
            cart.product.name,
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
  a.setAttribute('download', 'adjustment.csv');
  a.click();
  a.remove();
};

document.addEventListener('DOMContentLoaded', () => {
  const filtersHTML = document.querySelectorAll(
    "[name='q'], [name='username'], [name='sort-start-from'], [name='sort-start-to'], [name='sort-end-from'], [name='sort-end-from']"
  );
  const buttonLoadEventsTable = document.querySelector('#table-report-loader') as HTMLButtonElement;

  const tableRow = document.querySelectorAll('.table-adjustment-item-tr');
  tableRow.forEach((row: HTMLDivElement) => {
    const viewReportEventsModal = row.querySelector('.report-adjustment-view-btn');
    const data = JSON.parse(viewReportEventsModal.getAttribute('data-target'));
    const reportStore = data.shipRequest.store.storeName;
    const reportEventStoreDiv = row.querySelector('.report-adjustment-store') as HTMLDivElement;
    reportEventStoreDiv.innerHTML = reportStore;
  });

  const clearFilterButton = document.querySelector('#product-adjustment-clear-button');
  clearFilterButton.addEventListener('click', () => {
    filtersHTML.forEach((filter) => {
      (filter as HTMLInputElement).value = '';
    });
    buttonLoadEventsTable.click();
  });
  // load table
  buttonLoadEventsTable.click();

  // initialize modal
  const viewReportEventsModal = document.getElementById('view-report-adjustment-modal') as HTMLDivElement;
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

  const viewModal = new Modal(viewReportEventsModal, viewModalOptions);
  const reportViewProductTbody = document.querySelector('#table-products') as HTMLTableElement;
  const productItemTemplate = document.querySelector('#view-product-item-template') as HTMLTableRowElement;
  // view buttons click
  const reportViewUser = document.getElementById('report-adjustment-user') as HTMLDivElement;
  const reportViewAction = document.getElementById('report-adjustment-action') as HTMLDivElement;
  const reportViewDate = document.getElementById('report-adjustment-date') as HTMLDivElement;
  const reportStoreName = document.getElementById('report-store-name') as HTMLDivElement;

  // onload element with adjustment-table id
  htmxDispatcher.onLoad('adjustment-table', (target) => {
    const reportViewButtons: NodeListOf<HTMLButtonElement> = target.querySelectorAll('.report-event-view-btn');

    reportViewButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const reportAdjust: IAdjust = JSON.parse(btn.getAttribute('data-target'));
        const createAt = new Date(reportAdjust.createdAt);
        const year = createAt.getFullYear();
        const month = String(createAt.getMonth() + 1).padStart(2, '0'); // Month is 0-based
        const day = String(createAt.getDate()).padStart(2, '0');
        const hours = String(createAt.getHours()).padStart(2, '0');
        const minutes = String(createAt.getMinutes()).padStart(2, '0');

        reportViewUser.innerHTML = reportAdjust.user.username;
        reportViewAction.innerHTML = reportAdjust.type;
        reportViewDate.innerHTML = `${month}/${day}/${year} ${hours}:${minutes}`;
        // reportStoreName.innerHTML = reportAdjust.shipRequest.store.storeName;

        reportViewUser.innerHTML = reportAdjust.user.username;
        reportViewAction.innerHTML = reportAdjust.type;
        reportViewDate.innerHTML = `${month}/${day}/${year} ${hours}:${minutes}`;
        reportAdjust.shipRequest.carts.forEach((event, i) => {
          // Render event
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
          const productQuantity = newProductItem.querySelector('.product-quantity') as HTMLDivElement;
          const img: HTMLImageElement = newProductItem.querySelector('.product-image');

          event.product.image.length > 100
            ? (img.src = `data:image/png;base64, ${event.product.image}`)
            : (img.src = defaultBrandImage);

          productIndex.innerHTML = (i + 1).toString();
          productName.innerHTML = event.product.name;
          productSku.innerHTML = event.product.SKU;
          productQuantity.innerHTML = event.quantity.toString();

          if (event.product.regularPrice) {
            productRegularPrice.innerHTML = event.product.regularPrice.toString();
          } else {
            productRegularPrice.innerHTML = 'No price';
          }

          if (event.product.regularPrice) {
            productRegularPrice.innerHTML = event.product.regularPrice.toString();
          } else {
            productRegularPrice.innerHTML = 'No price';
          }

          if (event.product.retailPrice) {
            productRetailPrice.innerHTML = event.product.retailPrice.toString();
          } else {
            productRetailPrice.innerHTML = 'No price';
          }

          productGroup.innerHTML = event.group;
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
