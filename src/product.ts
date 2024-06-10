import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';
import Datepicker from 'flowbite-datepicker/Datepicker';
import { easepick } from '@easepick/bundle';
import { log } from 'console';

interface IProduct {
  id: number;
  name: string;
  supplier_id: number;
  currency: string;
  regularPrice: number;
  retailPrice: number;
  image: string;
  description: string;
  // General Info ->
  SKU: string;
  lowStockLevel: number;
  programYear: number;
  packageQty: number;
  numbOfItemsPerCase: number;
  numbOfCasesPerOuterCase: number;
  comments: string;
  notes_location: string;
  // shipping
  weight: number;
  length: number;
  width: number;
  height: number;
  current_user_groups: object;
  total_available_items: {
    [index: string]: number;
  };
  all_warehouses: [
    {
      [index: string]: number | string;
    }
  ];
  warehouseProducts: IWarehouseProduct[];
  productGroups: IProductGroup[];
}

interface IProductAdditionalInfo {
  allWarehouses: IWarehouse[];
  currentMasterProductGroups: IMasterGroupGroup[];
  currentUserGroups: IMasterGroupGroupUser[];
  masterGroupsGroups: IMasterGroupGroup[];
  currentUserRole: string;
}

interface IMasterGroupGroup {
  masterGroup: string;
  groups: { groupName: string; groupId: number }[];
}

interface IMasterGroupGroupUser {
  masterGroupName: string;
  groups: { groupName: string; groupId?: number }[];
}

interface IProductGroup {
  id: number;
  productId: number;
  groupId: number;
  parent: IGroup;
}
interface FilterJsonData {
  [key: string]: string;
}

interface IProductMasterGroupGroup {
  [index: string]: { group_name: string; group_id: number }[];
}

interface IGroup {
  id: number;
  name: string;
  masterGroup: IMasterGroup;
  masterGroupId: number;
}

interface IGroupAdditionalInfo {
  groupId?: number;
  groupName: string;
}

interface IMasterGroup {
  id: number;
  name: string;
  master_groups_list_groups: { [index: string]: { group_name: string; group_id: number }[] };
}

interface IWarehouseProduct {
  id: number;
  productId: number;
  warehouseId: number;
  productQuantity: number;
  warehouse: IWarehouse;
  group: IGroup;
}

interface IWarehouse {
  id: number;
  name: string;
}

interface IEventProductPromise {
  productId: number;
  error?: string;
  status: boolean;
}

// global variable for mandatory event instance
const adminRole = 'admin';
const eventCheckbox: HTMLInputElement = document.querySelector('#product-show-events-toggle-btn');
const eventStockOwnByMeCheckbox: HTMLInputElement = document.querySelector('#product-show-events-stocks-own-by-me-btn');

const allStocksToggle = document.querySelector('#product-show-all-stocks') as HTMLInputElement;
const allStocksInInventoryToggle = document.querySelector('#product-show-all-stocks-inventory') as HTMLInputElement;
const stocksByMeToggle = document.querySelector('#product-show-stocks-own-by-me-btn') as HTMLInputElement;
const eventStocksOwnByMeToggle = document.querySelector(
  '#product-show-events-stocks-own-by-me-btn'
) as HTMLInputElement;
const eventToggle = document.querySelector('#product-show-events-toggle-btn') as HTMLInputElement;

const isEvent = eventCheckbox.checked || eventStockOwnByMeCheckbox.checked;
const eventsWarehouse = 'Warehouse Events';
const eventMasterGroup = 'Events';
const fiveDays = 5 * 24 * 60 * 60 * 1000;

// variable to set default image to brand dynamically in modal window. Can we get link from the internet?
const defaultBrandImage =
  'https://raw.githubusercontent.com/Simple2B/BeamSuntory/develop/app/static/img/no_picture_default.png';

// check if product has filter and display it
let filterJsonData: FilterJsonData = {};
const filterJsonObject = sessionStorage.getItem('filterJsonData');
const filterData = JSON.parse(filterJsonObject);
if (filterData !== null || filterData !== undefined) {
  const isVisibleFilterJson = sessionStorage.getItem('isVisibleFilter');
  let isVisibleFilter = JSON.parse(isVisibleFilterJson);
  if (isVisibleFilter) {
    const referenceTh = document.querySelector('#product-table-th-product-type');
    const productItemTrs = document.querySelectorAll('.table-product-item-tr');

    for (const key in filterData) {
      const productFilterTh = document.createElement('th');
      productFilterTh.setAttribute('id', `product-table-filter-master-group-${key.replace(/ /g, '_')}`);
      productFilterTh.classList.add('px-6', 'py-3', 'max-width-100');
      productFilterTh.setAttribute('scope', 'col');
      productFilterTh.innerHTML = key;
      referenceTh.parentNode.insertBefore(productFilterTh, referenceTh.nextSibling);
    }

    productItemTrs.forEach((product: HTMLTableRowElement) => {
      const referenceTd = product.cells[4];
      const productSKU = product.cells[3].innerText;

      for (const key in filterData) {
        const productFilterName = filterData[key];
        const productFilterTd = document.createElement('td');
        productFilterTd.setAttribute(
          'id',
          `product-table-filter-${key}-${productFilterName.replace(/ /g, '_')}-${productSKU.replace(/ /g, '_')}`
        );
        productFilterTd.classList.add(
          'text-base',
          'font-normal',
          'text-gray-900',
          'whitespace-nowrap',
          'dark:text-white',
          'max-width-100'
        );
        productFilterTd.innerHTML = `
        <div class="pl-3">
          <div class="text-sm">${productFilterName}</div>
        </div>
      `;
        referenceTd.parentNode.insertBefore(productFilterTd, referenceTd.nextSibling);
      }
    });
    isVisibleFilter = false;
    sessionStorage.setItem('isVisibleFilter', JSON.stringify(isVisibleFilter));
  }
}


// function to add column by filter
function createCustomizeViewColumn(masterGroupName: string) {
  //choose position in table
  const positionInTable = 4;
  const productTableHeader = document.querySelector('#product-table-header-tr');
  const productItemTrs = document.querySelectorAll('.table-product-item-tr');

  const productItemHeaderReference = productTableHeader.children[positionInTable];
  const productItemHeader = productItemHeaderReference.cloneNode(true) as HTMLElement;
  productItemHeader.setAttribute('id', `product-table-filter-master-group-${masterGroupName}`);
  productItemHeader.innerHTML = masterGroupName.replace(/_/g, ' ');
  productTableHeader.insertBefore(productItemHeader, productItemHeaderReference.nextSibling);

  productItemTrs.forEach((productItem: HTMLTableRowElement) => {
    const productItemReference = productItem.children[positionInTable];
    const productItemTd = productItemReference.cloneNode(true) as HTMLElement;
    productItemTd.classList.add(`px-3`);
    productItemTd.classList.add(`product-table-item-td-${masterGroupName}`);
    const product: IProduct = JSON.parse(productItem.getAttribute('data-target-product'));

    const group = product.productGroups.find(
      (group: IProductGroup) => group.parent.masterGroup.name === masterGroupName
    );
    group ? (productItemTd.innerHTML = group.parent.name) : (productItemTd.innerHTML = '-');

    productItem.insertBefore(productItemTd, productItemReference.nextSibling);
  });
}

//function to display filter by master group on load page
const groupBrand = 'Brand';
let globalFilterMasterGroup = JSON.parse(sessionStorage.getItem('globalFilterMasterGroup'));

if (!globalFilterMasterGroup) {
  globalFilterMasterGroup = [groupBrand];
  sessionStorage.setItem('globalFilterMasterGroup', JSON.stringify(globalFilterMasterGroup));
}

// add brand to default global filter
if (!globalFilterMasterGroup.includes(groupBrand)) {
  globalFilterMasterGroup.push(groupBrand);
}

if (globalFilterMasterGroup && globalFilterMasterGroup.length !== 0) {
  const filterProductMasterGroupCheckboxes = document.querySelectorAll(
    '.products-filter-product-master-group-checkbox'
  );
  filterProductMasterGroupCheckboxes.forEach((checkbox: HTMLInputElement) => {
    if (globalFilterMasterGroup.includes(checkbox.value)) {
      checkbox.checked = true;
    }
  });
  for (const masterGroupName of globalFilterMasterGroup) {
    const isGroupExist = document.querySelector(`#product-table-filter-master-group-${masterGroupName}`);

    if (!isGroupExist) {
      createCustomizeViewColumn(masterGroupName);
    }
  }
}

// function to display product master group in product table
const checkboxFilterProductMasterGroups = document.querySelectorAll('.products-filter-product-master-group-checkbox');
checkboxFilterProductMasterGroups.forEach((checkbox) => {
  checkbox.addEventListener('change', (e) => {
    const globalFilterMasterGroup = JSON.parse(sessionStorage.getItem('globalFilterMasterGroup'));

    const masterGroupName = checkbox.getAttribute('data-target-group-name');
    const productItemTrs = document.querySelectorAll('.table-product-item-tr');

    let isActive = (e.target as HTMLInputElement).checked;

    if (isActive) {
      if (!globalFilterMasterGroup.includes(masterGroupName)) {
        globalFilterMasterGroup.push(masterGroupName);
      }
      sessionStorage.setItem('globalFilterMasterGroup', JSON.stringify(globalFilterMasterGroup));
      const isGroupExist = document.querySelector(`#product-table-filter-master-group-${masterGroupName}`);

      if (!isGroupExist) {
        createCustomizeViewColumn(masterGroupName);
      }
    }
    if (!isActive) {
      const index = globalFilterMasterGroup.indexOf(masterGroupName);

      if (index !== -1) {
        globalFilterMasterGroup.splice(index, 1);
      }
      sessionStorage.setItem('globalFilterMasterGroup', JSON.stringify(globalFilterMasterGroup));
      const isMasterGroupExist = document.querySelector(`#product-table-filter-master-group-${masterGroupName}`);
      if (isMasterGroupExist) {
        isMasterGroupExist.remove();
        productItemTrs.forEach((productItem: HTMLTableRowElement) => {
          const isProductFilterExist = productItem.querySelector(`.product-table-item-td-${masterGroupName}`);
          if (isProductFilterExist) {
            isProductFilterExist.remove();
          }
        });
      }
    }
  });
});


let fetchedAmountByDate = [] as { date: string; quantity: number }[];

// search flow
const searchInput: HTMLInputElement = document.querySelector('#table-search-products');
const searchInputButton = document.querySelector('#table-search-product-button') as HTMLButtonElement;
const selectUserGroup = document.querySelector('#select-user-group-for-product') as HTMLSelectElement;

searchInputButton.addEventListener('click', () => {
  const url = new URL(window.location.href);
  const searchParamsToDelete = [
    'q',
    'is_all_stocks_in_inventory',
    'is_stocks_own_by_me',
    'is_events_stocks_own_by_me',
    'is_events',
    'user_group_id',
    'master_groups',
  ];
  searchParamsToDelete.forEach((param) => url.searchParams.delete(param));

  url.searchParams.set('q', searchInput.value);
  url.searchParams.delete("page")
  allStocksInInventoryToggle.checked && url.searchParams.set('is_all_stocks_in_inventory', 'true');
  stocksByMeToggle.checked && url.searchParams.set('is_stocks_own_by_me', 'true');
  eventStocksOwnByMeToggle.checked && url.searchParams.set('is_events_stocks_own_by_me', 'true');
  selectUserGroup && selectUserGroup.value && url.searchParams.set('user_group_id', selectUserGroup.value);

  const masterGroupsVales: string[] = [];
  filters.forEach((selector: HTMLSelectElement) => {
    if (selector.value) {
      masterGroupsVales.push(selector.value);
    }
  });
  const masterGroupValues: { [key: string]: string } = {};
  filters.forEach((selector: HTMLSelectElement) => {
    if (selector.value) {
      masterGroupValues[selector.id] = selector.value;
    }
  });
  sessionStorage.setItem('masterGroupValues', JSON.stringify(masterGroupValues));

  eventToggle.checked && url.searchParams.set('is_events', 'true');
  masterGroupsVales.length && url.searchParams.set('master_groups', masterGroupsVales.join(','));

  window.location.href = `${url.origin}${url.pathname}${url.search}`;
});

//set filter values from sessionStorage
if (sessionStorage.getItem('masterGroupValues')) {
  const masterGroupValues = JSON.parse(sessionStorage.getItem('masterGroupValues')) as { [key: string]: string };
  for (const [key, value] of Object.entries(masterGroupValues)) {
    const selector = document.querySelector(`#${key}`) as HTMLSelectElement as HTMLSelectElement;
    selector.value = value;
  }
}

const filters = document.querySelectorAll('[id^="product-search-master-group"]');

function changeFilterColor(filter: HTMLSelectElement) {
  const filterOptions = filter.querySelectorAll('option');
  if (!filter.value) {
    filter.classList.add('text-gray-500');
    filter.classList.remove('text-gray-900');
    filterOptions.forEach((option) => {
      option.classList.add('text-gray-900');
    });
  } else {
    filter.classList.remove('text-gray-500');
    filter.classList.add('text-gray-900');
  }
}

filters.forEach((filter: HTMLSelectElement) => {
  changeFilterColor(filter);
  filter.addEventListener('change', () => {
    changeFilterColor(filter);
  });
});

const clearFilterButton = document.getElementById('product-clear-button');

clearFilterButton.addEventListener('click', () => {
  filters.forEach((filterHTML: HTMLSelectElement) => {
    filterHTML.value = '';
    changeFilterColor(filterHTML);
  });
  searchInput.value = '';
  allStocksToggle.checked = true;
  allStocksInInventoryToggle.checked = false;
  stocksByMeToggle.checked = false;
  eventStocksOwnByMeToggle.checked = false;
  eventToggle.checked = false;
  selectUserGroup.value = '';
  sessionStorage.removeItem('masterGroupValues');
  let url = new URL(window.location.href);
  url.search = '';
  window.history.pushState({}, '', url.toString());
  searchInputButton.click();
});

const deleteButtons = document.querySelectorAll('.delete-product-btn');

deleteButtons.forEach((e) => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-product-id');
      const response = await fetch(`/product/delete/${id}`, {
        method: 'DELETE',
      });
      if ([200, 404, 409].includes(response.status)) {
        location.reload();
      }
    }
  });
});




const filterProductButton = document.querySelector('#product-filter-button') as HTMLButtonElement;

filterProductButton.addEventListener('click', (e) => {
  searchInputButton.click();
});



const autoswitchAllStocksToggle = () => {
  if (!allStocksInInventoryToggle.checked && !stocksByMeToggle.checked && !eventStocksOwnByMeToggle.checked) {
    allStocksInInventoryToggle.checked = false;
    stocksByMeToggle.checked = false;
    eventStocksOwnByMeToggle.checked = false;
    eventToggle.checked = false;
    allStocksToggle.checked = true;
    searchInputButton.click();
  }
};

allStocksInInventoryToggle.addEventListener('change', () => {
  if (allStocksInInventoryToggle.checked) {
    stocksByMeToggle.checked = false;
    eventStocksOwnByMeToggle.checked = false;
    allStocksToggle.checked = false;
    eventToggle.checked = false;
    searchInputButton.click();
  }
  autoswitchAllStocksToggle();
});

stocksByMeToggle.addEventListener('change', () => {
  if (stocksByMeToggle.checked) {
    allStocksInInventoryToggle.checked = false;
    eventStocksOwnByMeToggle.checked = false;
    allStocksToggle.checked = false;
    eventToggle.checked = false;
    searchInputButton.click();
  }
  autoswitchAllStocksToggle();
});

eventStocksOwnByMeToggle.addEventListener('change', () => {
  if (eventStocksOwnByMeToggle.checked) {
    allStocksInInventoryToggle.checked = false;
    stocksByMeToggle.checked = false;
    allStocksToggle.checked = false;
    eventToggle.checked = false;
    searchInputButton.click();
  }
  autoswitchAllStocksToggle();
});

allStocksToggle.addEventListener('change', () => {
  if (allStocksToggle.checked) {
    allStocksInInventoryToggle.checked = false;
    stocksByMeToggle.checked = false;
    eventStocksOwnByMeToggle.checked = false;
    searchInputButton.click();
  }
  autoswitchAllStocksToggle();
});

eventToggle.addEventListener('change', () => {
  if (eventToggle.checked) {
    allStocksInInventoryToggle.checked = false;
    stocksByMeToggle.checked = false;
    eventStocksOwnByMeToggle.checked = false;
    allStocksToggle.checked = false;
  }
  searchInputButton.click();
});
