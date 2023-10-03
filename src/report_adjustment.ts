import { ModalOptions, Modal } from 'flowbite';
import { IProduct, IPagination } from './inbound_order/types';
import HTMXDispatcher from './htmx';

interface IUser {
  username: string;
}

interface IAdjustResponse {
  pagination: IPagination;
  adjusts: IAdjust[];
}

interface IAdjust {
  id: number;
  product: IProduct;
  note: string;
  user: IUser;
  createdAt: string;
  adjustGroupQty: IAdjustGroupQty[];
}

interface IAdjustGroupQty {
  id: number;
  group: IGroup;
  warehouse: IWarehouse;
  quantityAfter: number;
  quantityBefore: number;
}

interface IGroup {
  id: number;
  name: string;
  masterGroup: IMasterGroup;
}

interface IMasterGroup {
  id: number;
  name: string;
}

interface IWarehouse {
  id: number;
  name: string;
}

// initialize htmx listener
const htmxDispatcher = new HTMXDispatcher();

const defaultBrandImage =
  'https://funko.com/on/demandware.static/-/Sites-funko-master-catalog/default/dwbb38a111/images/funko/upload/55998_CocaCola_S2_SpriteBottleCap_POP_GLAM-WEB.png';

const downloadCSV = async function () {
  // Filters
  const filterParamsInput = document.querySelector('#adjustment-filter-params-input') as HTMLInputElement;
  const filterParams = JSON.parse(filterParamsInput.value);
  const filterQuery = [];

  for (const [queryKey, queryValue] of Object.entries(filterParams)) {
    if (queryValue) {
      filterQuery.push(`${queryKey}=${queryValue}`);
    }
  }

  // CSV Headers
  const csvData = ['created_at,product_name,sku,username,master_group,group,warehouse,quantity_before,quantity_after'];
  let pages = 1;
  const queryTail = filterQuery.join('&');

  for (let page = 1; page <= pages; page++) {
    const currentURL = window.location.href.replace(/#/g, '');
    const urlWithoutQueryParams = currentURL.split('?')[0];
    const url = [`api?page=${page}`, queryTail].join('&');
    const res = await fetch(`${urlWithoutQueryParams}/${url}`);
    const data: IAdjustResponse = await res.json();

    data.adjusts.forEach((adjust) => {
      adjust.adjustGroupQty.forEach((reportAdjust) => {
        csvData.push(
          [
            formatDate(adjust.createdAt),
            adjust.product.name,
            adjust.product.SKU,
            adjust.user.username,
            reportAdjust.group.masterGroup.name,
            reportAdjust.group.name,
            reportAdjust.warehouse.name,
            reportAdjust.quantityBefore,
            reportAdjust.quantityAfter,
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
  a.setAttribute('download', 'report_adjustment.csv');
  a.click();
  a.remove();
};

const formatDate = (date: string) => {
  const createAt = new Date(date);
  const year = createAt.getFullYear();
  const month = String(createAt.getMonth() + 1).padStart(2, '0');
  const day = String(createAt.getDate()).padStart(2, '0');
  const hours = String(createAt.getHours()).padStart(2, '0');
  const minutes = String(createAt.getMinutes()).padStart(2, '0');
  return `${month}/${day}/${year} ${hours}:${minutes}`;
};

document.addEventListener('DOMContentLoaded', () => {
  const filtersHTML = document.querySelectorAll(
    "[name='q'], [name='username'], [name='created-from'], [name='created-to'], [name='master_group'], [name='group'], [name='group_brand'], [name='group_category'], [name='group_premises'], [name='group_language'], [name='group_event']"
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

  const masterGroupHidden = document.querySelector('#adjustment-master-group-hidden') as HTMLInputElement;
  console.log(masterGroupHidden.value);

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
  const closingViewModalButton = document.querySelector('#button-closing-report-adjustment-modal') as HTMLButtonElement;
  closingViewModalButton.addEventListener('click', () => {
    viewModal.hide();
  });

  // view buttons click
  const reportViewUser = document.getElementById('report-adjustment-user') as HTMLDivElement;
  const reportProductName = document.getElementById('report-adjustment-product-name') as HTMLDivElement;
  const reportProductSKU = document.getElementById('report-adjustment-product-sku') as HTMLDivElement;
  const reportProductImage = document.getElementById('report-adjustment-product-image') as HTMLImageElement;
  const reportViewDate = document.getElementById('report-adjustment-date') as HTMLDivElement;
  const reportAdjustNote = document.getElementById('report-adjustment-note') as HTMLDivElement;

  // onload element with adjustment-table id
  htmxDispatcher.onLoad('adjustment-table', (target) => {
    const reportViewButtons: NodeListOf<HTMLButtonElement> = target.querySelectorAll('.report-event-view-btn');

    reportViewButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const reportAdjust: IAdjust = JSON.parse(btn.getAttribute('data-target'));

        // Render event
        reportViewUser.innerHTML = reportAdjust.user.username;
        reportProductName.innerHTML = reportAdjust.product.name;
        reportViewDate.innerHTML = formatDate(reportAdjust.createdAt);
        reportProductSKU.innerHTML = reportAdjust.product.SKU;
        reportAdjustNote.innerHTML = reportAdjust.note ? reportAdjust.note : 'No notes';

        reportAdjust.product.image.length > 100
          ? (reportProductImage.src = `data:image/png;base64, ${reportAdjust.product.image}`)
          : (reportProductImage.src = defaultBrandImage);

        reportAdjust.adjustGroupQty.forEach((adjust, i) => {
          // Render event
          const newAdjustItem = productItemTemplate.cloneNode(true) as HTMLElement;
          newAdjustItem.removeAttribute('id');
          newAdjustItem.classList.remove('hidden');
          newAdjustItem.classList.add(
            'product-item-view',
            'text-base',
            'font-semibold',
            'text-gray-900',
            'dark:text-white'
          );
          const productIndex = newAdjustItem.querySelector('.product-index') as HTMLDivElement;
          const productMasterGroup = newAdjustItem.querySelector('.product-master-group') as HTMLDivElement;
          const productGroup = newAdjustItem.querySelector('.product-group') as HTMLDivElement;
          const productQuantityBefore = newAdjustItem.querySelector('.product-quantity-before') as HTMLDivElement;
          const productQuantityAfter = newAdjustItem.querySelector('.product-quantity-after') as HTMLDivElement;
          const productWarehouse = newAdjustItem.querySelector('.product-warehouse') as HTMLDivElement;

          productIndex.innerHTML = (i + 1).toString();
          productMasterGroup.innerHTML = adjust.group.masterGroup.name;
          productGroup.innerHTML = adjust.group.name;
          productWarehouse.innerHTML = adjust.warehouse.name;
          productQuantityBefore.innerHTML = adjust.quantityBefore.toString();
          productQuantityAfter.innerHTML = adjust.quantityAfter.toString();

          reportViewProductTbody.appendChild(newAdjustItem);
          viewModal.show();
        });
      });
    });
  });
});
// Download csv
const downloadCsvButton = document.getElementById('button-csv-download') as HTMLButtonElement;
downloadCsvButton.addEventListener('click', downloadCSV);
