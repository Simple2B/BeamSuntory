import { Modal, ModalOptions } from 'flowbite';
import HTMXDispatcher from './htmx';
import { IGroup, IPagination, IProduct, IUser } from './inbound_order/types';

export interface IRequestShare {
  status: string;
  desireQuantity: number;

  product: IProduct;
  group: IGroup;
}

interface IReportRequestShare {
  type: string;
  createdAt: string;
  history: string;

  requestShare: IRequestShare;
  user: IUser;
}

interface IReportRequestShareResponse {
  pagination: IPagination;
  reports: IReportRequestShare[];
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
  };

  const filterQuery = [];
  for (const [queryKey, queryInput] of Object.entries(filtersMap)) {
    filterQuery.push(`${queryKey}=${queryInput.value}`);
  }

  // CSV Headers
  const csvData = ['action_type,user,created_at,current_share_request_status,group,desired_quantity,sku,product_name'];
  let pages = 1;

  const urlWithoutQueryParams = location.origin + location.pathname;
  for (let page = 1; page <= pages; page++) {
    const url = [`api?page=${page}`, filterQuery.join('&')].join('&');
    const res = await fetch(`${urlWithoutQueryParams}${url}`);
    const data: IReportRequestShareResponse = JSON.parse(await res.json());

    console.log(data);

    data.reports.forEach((report) => {
      csvData.push(
        [
          report.type,
          report.user.username,
          report.createdAt,
          report.requestShare.status,
          report.requestShare.group.name,
          report.requestShare.desireQuantity,
          report.requestShare.product.SKU,
          report.requestShare.product.name,
        ].join(',')
      );
    });

    pages = data.pagination.pages;
  }
  const blob = new Blob([csvData.join('\n')], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', 'events.csv');
  a.click();
  a.remove();
};

document.addEventListener('DOMContentLoaded', () => {
  // init view modal
  const viewModalHTML = document.getElementById('view-modal') as HTMLDivElement;
  const viewUserHTML = viewModalHTML.querySelector('#view-user') as HTMLDivElement;
  const viewActionHTML = viewModalHTML.querySelector('#view-action') as HTMLDivElement;
  const viewCreatedDateHTML = viewModalHTML.querySelector('#view-created-date') as HTMLDivElement;
  const viewShareRequestStatusHTML = viewModalHTML.querySelector('#view-share-request-status') as HTMLDivElement;
  const viewGroupHTML = viewModalHTML.querySelector('#view-group') as HTMLDivElement;
  const viewDesiredQuantityHTML = viewModalHTML.querySelector('#view-desired-quantity') as HTMLDivElement;
  const viewProductSkuHTML = viewModalHTML.querySelector('#view-product-sku') as HTMLDivElement;
  const viewProductNameHTML = viewModalHTML.querySelector('#view-product-name') as HTMLDivElement;
  const viewHistoryHTML = viewModalHTML.querySelector('#view-history') as HTMLDivElement;

  const viewModalOptions: ModalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
      (viewHistoryHTML.parentNode as HTMLDivElement).classList.add('hidden');
    },
  };
  const viewModal = new Modal(viewModalHTML, viewModalOptions);

  // Init loader
  const reportShareRequestLoader = document.querySelector('#table-report-loader') as HTMLButtonElement;
  reportShareRequestLoader.click();

  const htmxDispatcher = new HTMXDispatcher();
  htmxDispatcher.onLoad('request-shares-table', () => {
    const viewButtons = document.querySelectorAll('.report-view-btn') as NodeListOf<HTMLButtonElement>;
    viewButtons.forEach((button) => {
      const reportRequestShare: IReportRequestShare = JSON.parse(button.getAttribute('data-target'));

      // view click
      button.addEventListener('click', () => {
        viewUserHTML.innerHTML = reportRequestShare.user.username;
        viewActionHTML.innerHTML = reportRequestShare.type;
        viewCreatedDateHTML.innerHTML = formatDate(new Date(reportRequestShare.createdAt));
        viewShareRequestStatusHTML.innerHTML = reportRequestShare.requestShare.status;
        viewGroupHTML.innerHTML = reportRequestShare.requestShare.group.name;
        viewDesiredQuantityHTML.innerHTML = reportRequestShare.requestShare.desireQuantity.toString();
        viewProductSkuHTML.innerHTML = reportRequestShare.requestShare.product.SKU;
        viewProductNameHTML.innerHTML = reportRequestShare.requestShare.product.name;

        if (reportRequestShare.history) {
          viewHistoryHTML.innerHTML = reportRequestShare.history;
          (viewHistoryHTML.parentNode as HTMLDivElement).classList.remove('hidden');
        }

        viewModal.show();
      });
    });
  });

  // clear button
  const clearFilterButton = document.querySelector('#report-filter-clear-button') as HTMLButtonElement;
  const filtersHTML = document.querySelectorAll('.report-filter') as NodeListOf<HTMLInputElement | HTMLSelectElement>;
  clearFilterButton.addEventListener('click', () => {
    filtersHTML.forEach((filter) => {
      (filter as HTMLInputElement).value = '';
    });
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

  if (differSec < 1) return (result = 'right now');
  if (differSec < 60) return (result = `${Math.floor(differSec)} sec. ago`);
  if (differSec < 3600) return (result = `${Math.floor(differSec / 60)} min. ago`);
  if (differSec >= 3600) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let [hours, minutes] = date.toLocaleTimeString().split(':');
    return (result = `${month}.${day}.${year} ${hours}:${minutes}`);
  }

  return result;
}
