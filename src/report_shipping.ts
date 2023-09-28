import { Modal, ModalOptions } from "flowbite";
import HTMXDispatcher from "./htmx";
import { IGroup } from "./inbound_order/types";
import { IShipRequest } from "./outgoing_stock";
import { defaultBrandImage } from "./base";

export interface IRequestShare {
  status: string;
  desireQuantity: number;

  product: IProduct;
  group: IGroup;
}

interface IReportShipping {
  type: string
  createdAt: string;
  history: string;

  shipRequest: IShipRequest;
  user: IUser;
}

interface IReportShippingResponse {
  pagination: IPagination;
  reports: IReportShipping[];
}

const downloadCSV = async function () {
  // Filters
  const filterReportTypeHTML = document.querySelector('#report-type-select') as HTMLSelectElement;
  const filterCreatedFromHTML = document.querySelector('#created-from-datepicker') as HTMLInputElement;
  const filterCreatedToHTML = document.querySelector('#created-to-datepicker') as HTMLInputElement;
  const filterSearchQueryHTML = document.querySelector('#search-query') as HTMLInputElement;

  const filtersMap = {
    report_type: filterReportTypeHTML,
    created_from: filterCreatedFromHTML,
    created_to: filterCreatedToHTML,
    q: filterSearchQueryHTML,
  }

  const filterQuery = []
  for (const [queryKey, queryInput] of Object.entries(filtersMap)) {
    filterQuery.push(`${queryKey}=${queryInput.value}`);
  }

  // CSV Headers
  const csvData = ['action_type,user,created_at,history,current_ship_request_status,order_number,store_name,sku,product_name,group,quantity'];
  let pages = 1;

  const urlWithoutQueryParams = location.origin + location.pathname;
  for (let page = 1; page <= pages; page++) {
    const url = [`api?page=${page}`, filterQuery.join('&')].join('&');
    const res = await fetch(`${urlWithoutQueryParams}${url}`);
    const data: IReportShippingResponse = JSON.parse(await res.json());

    data.reports.forEach(report => {
      report.shipRequest.carts.forEach(cart => {
        csvData.push(
        [
          report.type,
          report.user.username,
          report.createdAt,
          report.history,
          report.shipRequest.status,
          report.shipRequest.orderNumb,
          report.shipRequest.store.storeName,
          cart.product.SKU,
          cart.product.name,
          cart.group,
          cart.quantity,
        ].join(',')
      )
      })
     
    });

    pages = data.pagination.pages;
  }
  const blob = new Blob([csvData.join('\n')], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', 'report_shipping.csv');
  a.click();
  a.remove();
}

document.addEventListener('DOMContentLoaded', () => {
  // init view modal
  const viewModalHTML = document.getElementById('view-modal') as HTMLDivElement;
  const viewUserHTML = viewModalHTML.querySelector('#view-user') as HTMLDivElement;
  const viewActionHTML = viewModalHTML.querySelector('#view-action') as HTMLDivElement;
  const viewCreatedDateHTML = viewModalHTML.querySelector('#view-created-date') as HTMLDivElement;
  const viewShipRequestStatusHTML = viewModalHTML.querySelector('#view-ship-request-status') as HTMLDivElement;
  const viewOrderNumberHTML = viewModalHTML.querySelector('#view-order-number') as HTMLDivElement;
  const viewStoreHTML = viewModalHTML.querySelector('#view-store') as HTMLDivElement;
  const viewHistoryHTML = viewModalHTML.querySelector('#view-history') as HTMLDivElement;

  const cartsTable = document.querySelector('#table-carts') as HTMLTableElement;
  const cartItemTemplate = document.querySelector('#view-cart-template') as HTMLTableRowElement;
  
  const viewModalOptions: ModalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
      (viewHistoryHTML.parentNode as HTMLDivElement).classList.add('hidden');
      cartsTable.querySelectorAll('.cart-item-view').forEach(cartItem => cartItem.remove());
    },
  }
  const viewModal = new Modal(viewModalHTML, viewModalOptions);

  // Init loader
  const reportShareRequestLoader = document.querySelector('#table-report-loader') as HTMLButtonElement;
  reportShareRequestLoader.click();

  const htmxDispatcher = new HTMXDispatcher();
  htmxDispatcher.onLoad('request-shares-table', () => {
    const viewButtons = document.querySelectorAll('.report-view-btn') as NodeListOf<HTMLButtonElement>;
    viewButtons.forEach((button) => {
      const report: IReportShipping = JSON.parse(button.getAttribute('data-target'));

      // view click
      button.addEventListener('click', () => {
        viewUserHTML.innerHTML = report.user.username;
        viewActionHTML.innerHTML = report.type;
        viewCreatedDateHTML.innerHTML = formatDate(new Date(report.createdAt));
        viewShipRequestStatusHTML.innerHTML = report.shipRequest.status;
        viewOrderNumberHTML.innerHTML = report.shipRequest.orderNumb;
        viewStoreHTML.innerHTML = report.shipRequest.store.storeName;

        if (report.history) {
          viewHistoryHTML.innerHTML = report.history;
          (viewHistoryHTML.parentNode as HTMLDivElement).classList.remove('hidden');
        }

        // Carts render
        report.shipRequest.carts.forEach((cart, i) => {
          const cartTemplateClone = cartItemTemplate.cloneNode(true) as HTMLTableRowElement;
          cartTemplateClone.classList.add('cart-item-view');
          cartTemplateClone.classList.remove('hidden');
          cartTemplateClone.removeAttribute('id');

          const cartIndexHTML = cartTemplateClone.querySelector('.cart-index') as HTMLDivElement;
          const cartItemImageHTML = cartTemplateClone.querySelector('.cart-product-image') as HTMLImageElement;
          const cartProductNameHTML = cartTemplateClone.querySelector('.product-name') as HTMLImageElement;
          const cartProductSKUHTML = cartTemplateClone.querySelector('.product-sku') as HTMLImageElement;
          const cartGroupHTML = cartTemplateClone.querySelector('.view-group') as HTMLDivElement;
          const cartQuantityHTML = cartTemplateClone.querySelector('.view-quantity') as HTMLDivElement;
          const cartStatusHTML = cartTemplateClone.querySelector('.view-status') as HTMLDivElement;

          cartIndexHTML.innerHTML = (i + 1).toString();
          cartItemImageHTML.setAttribute('src', cart.product.image !== 'default' ? cart.product.image : defaultBrandImage);
          

          cartProductNameHTML.innerHTML = cart.product.name;
          cartProductSKUHTML.innerHTML = cart.product.SKU;
          cartGroupHTML.innerHTML = cart.group;
          cartQuantityHTML.innerHTML = cart.quantity.toString();
          cartStatusHTML.innerHTML = cart.status;

          cartsTable.appendChild(cartTemplateClone);
        })

        viewModal.show();
      })
    });
  });

  // clear button
  const clearFilterButton = document.querySelector('#report-filter-clear-button') as HTMLButtonElement;
  const filtersHTML = document.querySelectorAll('.report-filter') as NodeListOf<HTMLInputElement | HTMLSelectElement>
  clearFilterButton.addEventListener('click', () => {
    filtersHTML.forEach(filter => {
      (filter as HTMLInputElement).value = "";
    })
    reportShareRequestLoader.click();
  });

  // Download csv
  const downloadCSVButton = document.querySelector('#button-csv-download');
  downloadCSVButton.addEventListener('click', downloadCSV);
});

function formatDate(date: Date) {
  let result = null;
  let now = new Date();
  let differSec = (+now - +date) / 1000;

  if (differSec < 1) return result = "right now";
  if (differSec < 60) return result = `${Math.floor(differSec)} sec. ago`;
  if (differSec < 3600) return result = `${Math.floor(differSec / 60)} min. ago`;
  if (differSec >= 3600) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let [hours, minutes] = date.toLocaleTimeString().split(":");
    return result = `${month}.${day}.${year} ${hours}:${minutes}`;
  };

  return result;
}
