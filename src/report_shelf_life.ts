import { IProduct } from './inbound_order/types';
import { IPagination } from './inbound_order/types';
import HTMXDispatcher from './htmx';

interface IUser {
  username: string;
}

interface IWarehouseProduct {
  group: string;
  product: IProduct;
}

interface IReportShelfLife {
  quantity: number;
  quantityReceived: number;
  shelfLifeStart: string;
  shelfLifeEnd: string;
  product: IProduct;
  // TODO do we need this?
  // productQuantityGroups: list[ProductGroupOut] = Field(
  //     alias="productQuantityGroups"
  // )
}

interface IReportShelfLifeResponse {
  pagination: IPagination;
  reportShelfLifeList: IReportShelfLife[];
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
  return `${month}/${day}/${year}`;
};

const downloadCSV = async function () {
  // Filters
  const searchShelfLifeInput: HTMLInputElement = document.querySelector('#table-search-shelf-life');
  const dateShelfLifeCreatedFromInput: HTMLInputElement = document.querySelector(
    '#product-shelf-life-sort-created-from-datepicker'
  );
  const dateShelfLifeCreatedToInput: HTMLInputElement = document.querySelector(
    '#product-shelf-life-sort-created-to-datepicker'
  );

  const filtersMap = {
    q: searchShelfLifeInput,
    created_from: dateShelfLifeCreatedFromInput,
    created_to: dateShelfLifeCreatedToInput,
  };

  const filterQuery = [];
  for (const [queryKey, queryInput] of Object.entries(filtersMap)) {
    filterQuery.push(`${queryKey}=${queryInput.value}`);
  }

  // CSV Headers
  const csvData = ['ShelfLife, shelfLifeStart, shelfLifeEnd, quantityOrdered, quantityReceived'];
  let pages = 1;
  const queryTail = filterQuery ? filterQuery.join('&') : '';

  for (let page = 1; page <= pages; page++) {
    const currentURL = window.location.href;
    const urlWithoutQueryParams = currentURL.split('?')[0];
    const url = [`api?page=${page}`, queryTail].join('&');

    const res = await fetch(`${urlWithoutQueryParams}/${url}`);
    const data: IReportShelfLifeResponse = await res.json();
    console.log(data);

    data.reportShelfLifeList.forEach((report: IReportShelfLife) => {
      let received;
      if (!report.quantityReceived) {
        received = '-';
      } else {
        received = report.quantityReceived.toString();
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
    "[name='q'], [name='username'], [name='created_from'], [name='created_to'], [name='master_group'], [name='group'], [name='group_brand'],  [name='group_category'], [name='group_language'], [name='group_premises'], [name='expire_in']"
  );
  const buttonLoadInventoriesTable = document.querySelector('#table-report-loader') as HTMLButtonElement;

  const clearFilterButton = document.querySelector('#product-shelf-life-clear-button');
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
