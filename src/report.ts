import {
  IReportRequestShareResponse,
  IEventsReportResponse,
  IInventoriesReportResponse,
  IReportAdjustResponse,
  IReportInboundOrderResponse,
  IReportShippingResponse,
  IReportAssignResponse,
  IReportShelfLifeResponse,
} from './types';
import { formatDate } from './utils';

interface IFilterMap {
  [index: string]: string[] | HTMLElement[];
}

interface ICSVDownloadMap {
  [index: string]: (query: URLSearchParams) => Promise<string[]>;
}

const filtersMap: IFilterMap = {
  events: ['user-select', 'filter-start-date', 'filter-start-date-to', 'filter-end-date', 'filter-end-date-to'],
  request_share: [
    'user-select',
    'filter-start-date',
    'filter-end-date',
    'master-group',
    'target-group',
    'target-sub-group',
  ],
  inventories: [
    'user-select',
    'filter-start-date',
    'filter-end-date',
    'master-group',
    'target-group',
    'target-sub-group',
    'filter-group-brand',
    'filter-group-language',
    'filter-group-premises',
    'filter-group-categories',
    'filter-group-events',
  ],
  adjustment: [
    'user-select',
    'filter-start-date',
    'filter-end-date',
    'master-group',
    'target-group',
    'target-sub-group',
    'filter-group-brand',
    'filter-group-language',
    'filter-group-premises',
    'filter-group-categories',
    'filter-group-events',
  ],
  assign: [
    'user-select',
    'group-from',
    'group-to',
    'filter-start-date',
    'filter-end-date',
    'filter-group-brand',
    'filter-group-language',
    'filter-group-premises',
    'filter-group-categories',
  ],
  inbound_order: [
    'filter-start-date',
    'filter-end-date',
    'filter-group-brand',
    'filter-group-premises',
    'filter-group-categories',
    'filter-product-group',
  ],
  shipping: [
    'division-select',
    'master-group',
    'target-group',
    'target-sub-group',
    'filter-start-date',
    'filter-end-date',
    'filter-group-brand',
    'filter-group-language',
    'filter-group-categories',
    'filter-group-premises',
  ],
  shelf_life: [
    'filter-start-date',
    'filter-end-date',
    'master-group',
    'target-group',
    'target-sub-group',
    'filter-group-brand',
    'filter-group-language',
    'filter-group-premises',
    'filter-group-categories',
    'shelf-life-filter-expire-in',
  ],
};

const searchSKUInput = document.getElementById('search-sku') as HTMLInputElement;

const fetchReportAPI = async (queryParams: URLSearchParams, callback: (data: Object) => void) => {
  let pages = 1;

  const urlWithoutQueryParams = location.origin + location.pathname;
  for (let page = 1; page <= pages; page++) {
    const url = [`api?page=${page}`, queryParams.toString()].join('&');
    const res = await fetch(`${urlWithoutQueryParams}${url}`);
    const data = JSON.parse(await res.json());

    callback(data);
    pages = data.pagination.pages;
  }
};


const generateCSVInboundOrder = async (queryParams: URLSearchParams) => {
  const csvData = ['Name,SKU,Quantity,Group,Created At,Supplier,Arrived,Warehouse'];
  await fetchReportAPI(queryParams, (data: IReportInboundOrderResponse) => {
    const searchingGroup = queryParams.get('product_group');
    data.reports.forEach((report) => {
      report.inboundOrder.productsAllocated.forEach((productsAllocated) => {
        productsAllocated.productQuantityGroups.forEach((productQuantityGroup) => {
          if (searchSKUInput.value && !productsAllocated.product.SKU.includes(searchSKUInput.value)) {
            return;
          }
          if (searchingGroup && !productQuantityGroup.group.name.includes(searchingGroup)) {
            return;
          }
          csvData.push(
            [
              productsAllocated.product.name,
              productsAllocated.product.SKU,
              productQuantityGroup.quantity,
              productQuantityGroup.group.name,
              formatDate(report.createdAt),
              report.inboundOrder.supplier.name,
              report.inboundOrder.finishedDate,
              report.inboundOrder.warehouse.name,
            ].join(',')
          );
        });
        if (!productsAllocated.productQuantityGroups.length) {
          csvData.push(
            [
              formatDate(report.createdAt),
              report.user.username,
              report.type,
              report.inboundOrder.title,
              productsAllocated.product.name,
              productsAllocated.product.SKU,
            ].join(',')
          );
        }
      });
    });
  });
  return csvData;
};



const generateCSVShelfLife = async (queryParams: URLSearchParams) => {
  // CSV Headers
  const csvData = ['Numb Of Day Left, SKU, Name, Qty, Expire Date'];

  await fetchReportAPI(queryParams, (data: IReportShelfLifeResponse) => {
    data.reportShelfLifeList.forEach((report) => {
      csvData.push([report.numbOfDayLeft, report.SKU, report.name, report.qty, report.expiry_date].join(','));
    });
  });
  return csvData;
};

const csvDownloadMap: ICSVDownloadMap = {
  inbound_order: generateCSVInboundOrder,
  shelf_life: generateCSVShelfLife,
};

const filtersIds = [
  'request-share-type',
  'shipping-type',
  'user-select',
  'filter-start-date',
  'filter-start-date-to',
  'filter-end-date',
  'filter-end-date-to',
  'master-group',
  'target-group',
  'target-sub-group',
  'filter-group-brand',
  'filter-group-language',
  'filter-group-premises',
  'filter-group-categories',
  'filter-group-events',
  'filter-product-group',
  'group-from',
  'group-to',
  'division-select',
  'shelf-life-filter-expire-in',
];

document.addEventListener('DOMContentLoaded', () => {
  // DOM nodes
  const reportTypeSelectHTML = document.getElementById('report-type-select') as HTMLSelectElement;
  const allFiltersHTML = filtersIds.map((id) => document.getElementById(id));
  const tableLoader = document.getElementById('table-report-loader') as HTMLButtonElement;
  const clearFiltersButton = document.getElementById('filter-clear-button') as HTMLButtonElement;
  const searchQueryHTML = document.getElementById('search-query') as HTMLInputElement;
  const searchSkuHTML = document.getElementById('search-sku') as HTMLInputElement;
  const downloadCSVButton = document.getElementById('button-csv-download') as HTMLButtonElement;

  function clearFilters() {
    const allInputs = filtersIds.map((id) => document.getElementById(id));
    console.log('allInputs', allInputs);
    allInputs.forEach((filterHTML) => {
      if (!filterHTML) {
        return;
      }
      const inputs = filterHTML.querySelectorAll('input, select') as
        | NodeListOf<HTMLInputElement>
        | NodeListOf<HTMLSelectElement>;
      inputs.forEach((input) => {
        input.value = '';
      });
    });
    searchQueryHTML.value = '';
    searchSkuHTML.value = '';
    tableLoader.click();
  }

  for (const [reportType, filters] of Object.entries(filtersMap)) {
    filtersMap[reportType] = filters.map((id) => document.getElementById(id as string)) as HTMLElement[];
  }

  // Show/remove filters when choose event report type
  reportTypeSelectHTML.addEventListener('change', (e) => {
    clearFilters();
    const selectHTML = e.target as HTMLSelectElement;

    allFiltersHTML.forEach((filterHTML) => filterHTML.classList.add('hidden'));
    const visibleFilters = filtersMap[selectHTML.value] as HTMLElement[];
    visibleFilters.forEach((filterHTML) => filterHTML.classList.remove('hidden'));
  });

  tableLoader.click();
  clearFiltersButton.addEventListener('click', clearFilters);
  // Download csv button
  const groupSelect = document.getElementById('report-target-group-select') as HTMLSelectElement;
  const groupIdInput = document.getElementById('report-group-id-hidden') as HTMLInputElement;
  groupSelect.addEventListener('change', (e) => {
    const option = groupSelect.querySelector(`option[value="${groupSelect.value}"]`);
    if (!option) {
      return;
    }
    groupIdInput.value = option.getAttribute('data-target-group-id');
    groupIdInput.click();
  });
  downloadCSVButton.addEventListener('click', async () => {
    const filtersQueryParams = new URLSearchParams();
    allFiltersHTML.forEach((filterHTML) => {
      const input = filterHTML.querySelector('input, select') as HTMLSelectElement | HTMLInputElement;
      if (input.getAttribute('name') === 'group_id' && groupSelect) {
        filtersQueryParams.append('target_group', groupSelect.value);
        return;
      }
      filtersQueryParams.append(input.getAttribute('name'), input.value);
    });

    filtersQueryParams.append('q', searchQueryHTML.value);
    filtersQueryParams.append('report_type', reportTypeSelectHTML.value);
    const csvData = await csvDownloadMap[reportTypeSelectHTML.value](filtersQueryParams);
    const blob = new Blob([csvData.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'report.csv');
    a.click();
    a.remove();
  });
});
