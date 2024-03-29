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
  request_share: ['user-select', 'filter-start-date', 'filter-end-date'],
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

const generateCSVEvents = async (queryParams: URLSearchParams) => {
  const csvData = ['action_type,user,created_at,store,event_date_from,event_date_to,sku,product_name'];
  await fetchReportAPI(queryParams, (data: IEventsReportResponse) => {
    data.reports.forEach((report) => {
      report.shipRequest.carts.forEach((cart) => {
        if (searchSKUInput.value && !cart.product.SKU.includes(searchSKUInput.value)) {
          return;
        }

        csvData.push(
          [
            report.type,
            report.user.username,
            report.createdAt,
            report.shipRequest.store.storeName,
            cart.event.dateFrom,
            cart.event.dateTo,
            cart.product.SKU,
            cart.product.name,
          ].join(',')
        );
      });
    });
  });
  return csvData;
};

const generateCSVRequestShare = async (queryParams: URLSearchParams) => {
  const csvData = [
    'action_type,user,created_at,current_share_request_status,group_from,group_to,desired_quantity,sku,product_name',
  ];
  await fetchReportAPI(queryParams, (data: IReportRequestShareResponse) => {
    data.reports.forEach((report) => {
      if (searchSKUInput.value && !report.requestShare.product.SKU.includes(searchSKUInput.value)) {
        return;
      }

      csvData.push(
        [
          report.type,
          report.user.username,
          report.createdAt,
          report.requestShare.status,
          report.requestShare.fromGroup.name,
          report.requestShare.group.name,
          report.requestShare.desireQuantity,
          report.requestShare.product.SKU,
          report.requestShare.product.name,
        ].join(',')
      );
    });
  });
  return csvData;
};

const generateCSVInventories = async (queryParams: URLSearchParams) => {
  // CSV Headers
  const csvData = ['product_name,sku,group,quantity,created_at'];
  await fetchReportAPI(queryParams, (data: IInventoriesReportResponse) => {
    data.reports.forEach((report) => {
      for (let i = 0; i < report.product.warehouseProducts.length; i++) {
        const warehouseProduct = report.product.warehouseProducts[i];

        if (warehouseProduct.group.name === report.group.name) {
          csvData.push(
            [
              report.product.name,
              report.product.SKU,
              report.group.name,
              warehouseProduct.productQuantity,
              formatDate(report.createdAt),
            ].join(',')
          );
        }
      }
    });
  });
  return csvData;
};

const generateCSVAdjustments = async (queryParams: URLSearchParams) => {
  // CSV Headers
  const csvData = [
    'created_at,product_name,sku,username,master_group,group,warehouse,quantity_before,quantity_after,quantity_delta,note',
  ];
  await fetchReportAPI(queryParams, (data: IReportAdjustResponse) => {
    data.reports.forEach((adjust) => {
      adjust.adjustGroupQty.forEach((reportAdjust) => {
        if (searchSKUInput.value && !adjust.product.SKU.includes(searchSKUInput.value)) {
          return;
        }
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
            reportAdjust.delta,
            adjust.note,
          ].join(',')
        );
      });
    });
  });
  return csvData;
};

const generateCSVInboundOrder = async (queryParams: URLSearchParams) => {
  const csvData = ['created_at,username,type,order_title,allocated_product,sku,group,quantity'];
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
              formatDate(report.createdAt),
              report.user.username,
              report.type,
              report.inboundOrder.title,
              productsAllocated.product.name,
              productsAllocated.product.SKU,
              productQuantityGroup.group.name,
              productQuantityGroup.quantity,
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

const generateCSVShipping = async (queryParams: URLSearchParams) => {
  // CSV Headers
  const csvData = [
    'action_type,user,created_at,current_ship_request_status,store_name,sku,product_name,group,quantity',
  ];
  await fetchReportAPI(queryParams, (data: IReportShippingResponse) => {
    data.reports.forEach((report) => {
      report.shipRequest.carts.forEach((cart) => {
        if (searchSKUInput.value && !cart.product.SKU.includes(searchSKUInput.value)) {
          return;
        }
        csvData.push(
          [
            report.type,
            report.user.username,
            report.createdAt,
            report.shipRequest.status,
            report.shipRequest.store.storeName,
            cart.product.SKU,
            cart.product.name,
            cart.group.name,
            cart.quantity,
          ].join(',')
        );
      });
    });
  });

  return csvData;
};

const generateCSVAssign = async (queryParams: URLSearchParams) => {
  // CSV Headers
  const csvData = ['created_at,username,type,from_group,to_group,sku,product_name,quantity'];

  await fetchReportAPI(queryParams, (data: IReportAssignResponse) => {
    data.reports.forEach((report) => {
      if (searchSKUInput.value && !report.product.SKU.includes(searchSKUInput.value)) {
        return;
      }
      csvData.push(
        [
          formatDate(report.createdAt),
          report.user.username,
          report.type,
          report.fromGroup.name,
          report.group.name,
          report.product.SKU,
          report.product.name,
          report.quantity,
        ].join(',')
      );
    });
  });
  return csvData;
};

const generateCSVShelfLife = async (queryParams: URLSearchParams) => {
  // CSV Headers
  const csvData = ['SKU, shelfLifeStart, shelfLifeEnd, quantityOrdered, quantityReceived'];

  await fetchReportAPI(queryParams, (data: IReportShelfLifeResponse) => {
    data.reportShelfLifeList.forEach((report) => {
      let received;
      if (!report.quantityReceived) {
        received = '-';
      } else {
        received = report.quantityReceived.toString();
      }

      if (searchSKUInput.value.length && !report.product.SKU.includes(searchSKUInput.value)) {
        return;
      }

      csvData.push(
        [
          report.product.SKU,
          formatDate(report.shelfLifeStart),
          formatDate(report.shelfLifeStart),
          report.quantity,
          received,
        ].join(',')
      );
    });
  });
  return csvData;
};

const csvDownloadMap: ICSVDownloadMap = {
  events: generateCSVEvents,
  request_share: generateCSVRequestShare,
  inventories: generateCSVInventories,
  adjustment: generateCSVAdjustments,
  assign: generateCSVAssign,
  inbound_order: generateCSVInboundOrder,
  shipping: generateCSVShipping,
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

  for (const [reportType, filters] of Object.entries(filtersMap)) {
    filtersMap[reportType] = filters.map((id) => document.getElementById(id as string)) as HTMLElement[];
  }

  // Show/remove filters when choose event report type
  reportTypeSelectHTML.addEventListener('change', (e) => {
    const selectHTML = e.target as HTMLSelectElement;

    allFiltersHTML.forEach((filterHTML) => filterHTML.classList.add('hidden'));
    const visibleFilters = filtersMap[selectHTML.value] as HTMLElement[];
    console.log('visibleFilters', visibleFilters);
    console.log('filtersMap', filtersMap);
    console.log('allFiltersHTML', allFiltersHTML);

    visibleFilters.forEach((filterHTML) => filterHTML.classList.remove('hidden'));
  });

  tableLoader.click();
  clearFiltersButton.addEventListener('click', () => {
    allFiltersHTML.forEach((filterHTML) => {
      const input = filterHTML.querySelector('input, select') as HTMLSelectElement | HTMLInputElement;
      input.value = '';
    });
    searchQueryHTML.value = '';
    searchSkuHTML.value = '';
    tableLoader.click();
  });
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
        return
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
