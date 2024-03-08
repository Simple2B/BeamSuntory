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

// function to get groups object from product
function getGroupsMasterGroups(product: IProduct) {
  const groupsMasterGroups = {} as { [group: string]: string };

  product.warehouseProducts.forEach((warehouseProduct: IWarehouseProduct) => {
    const group = warehouseProduct.group.name;
    const masterGroup = warehouseProduct.group.masterGroup.name;
    if (!groupsMasterGroups.hasOwnProperty(group)) {
      groupsMasterGroups[group] = masterGroup;
    }
  });

  return groupsMasterGroups;
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

const productRequestShareBrandSelector = document.querySelector('#product-request-share-define-brand');
const productRequestShareBrandSelectorOptions = productRequestShareBrandSelector.querySelectorAll('option');
const productRequestShareBrandSelectorOptionsAmount = productRequestShareBrandSelectorOptions.length;
if (!productRequestShareBrandSelectorOptionsAmount) {
  productRequestShareBrandSelector.classList.add('border-error-red');

  const messageParagraph = document.createElement('p');
  messageParagraph.classList.add('text-sm', 'text-red');
  messageParagraph.innerHTML =
    "You have no group! Please, define your group <a href='/user/' class='underlined'>here</a>";
  productRequestShareBrandSelector.parentNode.appendChild(messageParagraph);
}

const $requestShareModalElement: HTMLElement = document.querySelector('#request-share-product-modal');
const $shipModalElement: HTMLElement = document.querySelector('#ship-product-modal');
const $assignModalElement: HTMLElement = document.querySelector('#assign-product-modal');
const $addProductModalElement: HTMLElement = document.querySelector('#add-product-modal');
const $viewProductModalElement: HTMLElement = document.querySelector('#view-product-modal');
const $adjustProductModalElement: HTMLElement = document.querySelector('#adjust-product-modal');
const $editProductModalElement: HTMLElement = document.querySelector('#editProductModal');
const $eventProductModalElement: HTMLElement = document.querySelector('#event-product-modal');

const modalOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {
    const product = JSON.parse(sessionStorage.product);
    const groupsMasterGroups = getGroupsMasterGroups(product);
    const mstrGroupsEntries = Object.entries(groupsMasterGroups);

    mstrGroupsEntries.forEach(([key, value]: [string, string]) => {
      deleteShipAssignButton(value.replace(/\s/g, '_'), key);
    });
    clearProductGroupContainer();
    const productViewContainer = document.querySelector('#product-view-grid-container');
    productViewContainer.innerHTML = '';
  },
  onShow: () => {},
  onToggle: () => {
    console.log('modal has been toggled');
  },
};

const adjustModalOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {
    const product = JSON.parse(sessionStorage.product);
    const groupsMasterGroups = getGroupsMasterGroups(product);
    const mstrGroupsEntries = Object.entries(groupsMasterGroups);
    const adjustButtons = document.querySelectorAll('.product-adjust-button');
    adjustButtons.forEach((e) => {
      e.removeAttribute('disabled');
    });

    mstrGroupsEntries.forEach(([key, value]: [string, string]) => {
      deleteAdjustContainer(value.replace(/\s/g, '_'), key);
    });
    sessionStorage.removeItem('productInWarehouses');
  },
  onShow: () => {},
  onToggle: () => {
    console.log('modal has been toggled');
  },
};

const modalShipAssignOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {
    sessionStorage.removeItem('product');
  },
  onShow: () => {},
  onToggle: () => {
    console.log('modal has been toggled');
  },
};

const modalEventOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-51',
  closable: true,
  onHide: () => {
    sessionStorage.removeItem('product');
  },
  onShow: () => {},
  onToggle: () => {
    console.log('modal has been toggled');
  },
};

const eventModalOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-51',
  closable: true,
  onHide: () => {
    const product = JSON.parse(sessionStorage.product);
    const groupsMasterGroups = getGroupsMasterGroups(product);
    const mstrGroupsEntries = Object.entries(groupsMasterGroups);

    mstrGroupsEntries.forEach(([key, value]: [string, string]) => {
      deleteShipAssignButton(value.replace(/\s/g, '_'), key);
    });
    clearProductGroupContainer();
    picker.destroy();
  },
  onShow: () => {
    console.log('modal has been shown');
  },
  onToggle: () => {
    console.log('modal has been toggled');
  },
};

const addModal: ModalInterface = new Modal($addProductModalElement, modalOptions);
const viewModal: ModalInterface = new Modal($viewProductModalElement, modalOptions);
const adjustModal: ModalInterface = new Modal($adjustProductModalElement, adjustModalOptions);
const editModal: ModalInterface = new Modal($editProductModalElement, modalOptions);
const requestShareModal: ModalInterface = new Modal($requestShareModalElement, modalShipAssignOptions);
const shipModal: ModalInterface = new Modal($shipModalElement, modalShipAssignOptions);
const assignModal: ModalInterface = new Modal($assignModalElement, modalShipAssignOptions);
const eventModal: ModalInterface = new Modal($eventProductModalElement, eventModalOptions);

const closingAddModalButton = document.getElementById('add-product-modal-close-btn');
closingAddModalButton.addEventListener('click', () => {
  addModal.hide();
});
const closingAdjustModalButton = document.getElementById('adjust-product-modal-close-btn');
closingAdjustModalButton.addEventListener('click', () => {
  adjustModal.hide();
});
const closingEditModalButton = document.getElementById('edit-product-modal-close-btn');
closingEditModalButton.addEventListener('click', () => {
  editModal.hide();
});
const closingViewModalButton = document.getElementById('view-product-modal-close-btn');
closingViewModalButton.addEventListener('click', () => {
  viewModal.hide();
});
const closingEventModalButton = document.getElementById('event-product-modal-close-btn');
closingEventModalButton.addEventListener('click', () => {
  eventModal.hide();
});

const $buttonElements = document.querySelectorAll('.product-edit-button');
$buttonElements.forEach((e) =>
  e.addEventListener('click', () => {
    editProduct(JSON.parse(e.getAttribute('data-target')));
  })
);

const $addButtonElements = document.querySelectorAll('.product-add-button');
$addButtonElements.forEach((e) =>
  e.addEventListener('click', () => {
    const groups = JSON.parse(e.getAttribute('data-target-groups'));
    sessionStorage.setItem('groups', JSON.stringify(groups));
    addProduct(groups);
  })
);

// pick date range
const { DateTime } = easepick;
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();
  return `${year}-${month}-${day}`;
}

// TODO remove if not used
// function getFirstAndLastDate() {
//   const today = new Date();
//   const fifthDayBefore = new Date(today);
//   fifthDayBefore.setDate(today.getDate() - 5);
//   const fifthDayAfter = new Date(today);
//   fifthDayAfter.setDate(today.getDate() + 6);
//   return [formatDate(fifthDayBefore), formatDate(fifthDayAfter)];
// }

// const bookedDates = [getFirstAndLastDate()].map((d) => {
//   if (d instanceof Array) {
//     const start = new Date(d[0]);
//     const end = new Date(d[1]);
//     return [start, end];
//   }
//   return new DateTime(d, 'YYYY-MM-DD');
// });

let fetchedAmountByDate = [] as { date: string; quantity: number }[];

async function getEventAvailableQuantity(product_id: number, group: string, calendarFilter: string[]) {
  const response = await fetch(
    `/event/get_available_quantity?group_name=${group.replace(
      /_/g,
      ' '
    )}&product_id=${product_id}&dates=${JSON.stringify(calendarFilter)}`
  );
  const data = await response.json();
  fetchedAmountByDate = data;

  return data;
}

// search flow
const searchInput: HTMLInputElement = document.querySelector('#table-search-products');
const searchInputButton = document.querySelector('#table-search-product-button') as HTMLButtonElement;

searchInputButton.addEventListener('click', () => {
  const url = new URL(window.location.href);
  const searchParamsToDelete = [
    'q',
    'is_all_stocks_in_inventory',
    'is_stocks_own_by_me',
    'is_events_stocks_own_by_me',
    'is_events',
    'master_groups',
  ];
  searchParamsToDelete.forEach((param) => url.searchParams.delete(param));

  url.searchParams.set('q', searchInput.value);
  allStocksInInventoryToggle.checked && url.searchParams.set('is_all_stocks_in_inventory', 'true');
  stocksByMeToggle.checked && url.searchParams.set('is_stocks_own_by_me', 'true');
  eventStocksOwnByMeToggle.checked && url.searchParams.set('is_events_stocks_own_by_me', 'true');

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
      if (response.status == 200) {
        location.reload();
      }
    }
  });
});

async function getAdditionalProductInfo(product_id: number) {
  try {
    const response = await fetch(`/product/get_additional_info/${product_id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function addProduct(groups: IProductMasterGroupGroup) {
  addModal.show();
  const productMasterGroupAddSelect: HTMLSelectElement = document.querySelector(
    '#product-master-group-add-add-product-1'
  );
  const options = productMasterGroupAddSelect.querySelectorAll('option');

  productMasterGroupAddSelect.addEventListener('change', () => {
    options.forEach((e) => {
      if (e.textContent === productMasterGroupAddSelect.options[productMasterGroupAddSelect.selectedIndex].text) {
        const groupSelect = document.querySelector('#product-group-add-item-1');
        const optionCategory =
          groups[productMasterGroupAddSelect.options[productMasterGroupAddSelect.selectedIndex].text];

        groupSelect.innerHTML = '';
        if (optionCategory) {
          optionCategory.forEach((group: { group_name: string; group_id: number }) => {
            const storeSelectOption = document.createElement('option');
            storeSelectOption.setAttribute('value', group.group_id.toString());
            storeSelectOption.textContent = group.group_name;
            groupSelect.appendChild(storeSelectOption);
          });
        }
      }
    });
  });
}

async function editProduct(product: IProduct) {
  sessionStorage.setItem('product', JSON.stringify(product));
  const productAdditionalInfo: IProductAdditionalInfo = await getAdditionalProductInfo(product.id);

  const img: HTMLImageElement = document.querySelector('#product-edit-show-image');
  const fullImageAnchor = img.closest('.product-full-image-anchor');
  fullImageAnchor.setAttribute('data-target-product-id', product.id.toString());
  product.image.length > 100 ? (img.src = `data:image/png;base64, ${product.image}`) : (img.src = defaultBrandImage);
  let input: HTMLInputElement = document.querySelector('#product-edit-name');
  input.value = product.name;
  input = document.querySelector('#product-edit-id');
  input.value = product.id.toString();
  // a loop that adds additional fields
  input = document.querySelector('#product-edit-currency');
  product.currency ? (input.value = product.currency) : (input.value = 'Choose Currency');
  input = document.querySelector('#product-edit-regular_price');
  input.value = product.regularPrice?.toString() ?? '0';
  input = document.querySelector('#product-edit-retail_price');
  console.log('input', input);
  console.log('product', product);
  input.value = product.retailPrice?.toString() ?? '0';
  input = document.querySelector('#product-edit-description');
  input.value = product.description;
  // General Info ->
  input = document.querySelector('#product-edit-SKU');
  input.value = product.SKU;
  input = document.querySelector('#product-edit-low_stock_level');
  product.lowStockLevel ? (input.value = product.lowStockLevel.toString()) : (input.value = '0');

  input = document.querySelector('#product-edit-program_year');
  product.programYear ? (input.value = product.programYear.toString()) : (input.value = '0');
  input = document.querySelector('#product-edit-package_qty');
  product.packageQty ? (input.value = product.packageQty.toString()) : (input.value = '0');
  input = document.querySelector('#product-edit-numb_of_items_per_case');
  product.numbOfItemsPerCase ? (input.value = product.numbOfItemsPerCase.toString()) : (input.value = '0');
  input = document.querySelector('#product-edit-numb_of_cases_per_outer_case');
  product.numbOfCasesPerOuterCase ? (input.value = product.numbOfCasesPerOuterCase.toString()) : (input.value = '0');
  input = document.querySelector('#product-edit-comments');
  product.comments ? (input.value = product.comments) : (input.value = 'No comments');
  input = document.querySelector('#product-edit-notes-location');
  input.value = product.notes_location;
  // shipping
  input = document.querySelector('#product-edit-weight');
  product.weight ? (input.value = product.weight.toString()) : (input.value = '0');
  input = document.querySelector('#product-edit-length');
  product.length ? (input.value = product.length.toString()) : (input.value = '0');
  input = document.querySelector('#product-edit-width');
  product.width ? (input.value = product.width.toString()) : (input.value = '0');
  input = document.querySelector('#product-edit-height');
  product.height ? (input.value = product.height.toString()) : (input.value = '0');
  input = document.querySelector('#product-edit-next_url');
  input.value = window.location.href;

  const productMasterGroupEditSelect: HTMLSelectElement = document.querySelector(
    '#product-master-group-edit-add-product-1'
  );
  const options = productMasterGroupEditSelect.querySelectorAll('option');
  const productMasterGroups = product.productGroups.map(
    (group: IProductGroup) => group.parent.masterGroup.name as string
  );

  if (productMasterGroups.length > 0) {
    const productGroupsEditSelects = document.querySelectorAll<HTMLSelectElement>('.product-group-edit-item');

    for (let i = 0; i < productMasterGroups.length; i++) {
      const currentProductMasterGroup = productAdditionalInfo.currentMasterProductGroups.find(
        (masterGroupItem: IMasterGroupGroup) => masterGroupItem.masterGroup === productMasterGroups[i]
      );
      if (i === 0) {
        const productGroupsEditSelect = productGroupsEditSelects[i];

        productMasterGroupEditSelect.value = productMasterGroups[i];

        const masterGroupGroup = productAdditionalInfo.masterGroupsGroups.find(
          (masterGroup: IMasterGroupGroup) => masterGroup.masterGroup === productMasterGroups[i]
        );

        masterGroupGroup.groups.forEach((group: IGroupAdditionalInfo) => {
          const storeSelectOption = document.createElement('option');
          storeSelectOption.setAttribute('value', group.groupId.toString());
          storeSelectOption.textContent = group.groupName;
          productGroupsEditSelect.appendChild(storeSelectOption);
        });
        // TODO: always select first option
        const currentProductGroup = product.productGroups.find(
          (group: IProductGroup) => group.parent.masterGroup.name === productMasterGroups[i]
        );

        productGroupsEditSelect.value = currentProductGroup.groupId.toString();
        productMasterGroupEditSelect.addEventListener('change', () => {
          options.forEach((e) => {
            if (
              e.textContent === productMasterGroupEditSelect.options[productMasterGroupEditSelect.selectedIndex].text
            ) {
              const groupSelect = document.querySelector('#product-group-edit-item-1');
              const optionCategory = productAdditionalInfo.masterGroupsGroups.find(
                (masteGroup: IMasterGroupGroup) =>
                  masteGroup.masterGroup ===
                  productMasterGroupEditSelect.options[productMasterGroupEditSelect.selectedIndex].text
              )?.groups;

              groupSelect.innerHTML = '';
              if (optionCategory) {
                optionCategory.forEach((group: IGroupAdditionalInfo) => {
                  const storeSelectOption = document.createElement('option');
                  storeSelectOption.setAttribute('value', group.groupId.toString());
                  storeSelectOption.textContent = group.groupName;
                  groupSelect.appendChild(storeSelectOption);
                });
              }
            }
          });
        });

        if (currentProductMasterGroup.groups.length > 1) {
          for (let j = 1; j < currentProductMasterGroup.groups.length; j++) {
            createProductGroupEditItem(null, productAdditionalInfo, productMasterGroups[i], j);
          }
          continue;
        } else {
          continue;
        }
      }

      if (currentProductMasterGroup.groups.length > 0) {
        for (let j = 0; j < currentProductMasterGroup.groups.length; j++) {
          createProductGroupEditItem(null, productAdditionalInfo, productMasterGroups[i], j);
        }
      } else {
        createProductGroupEditItem(null, productAdditionalInfo, productMasterGroups[i]);
      }
    }
  }

  editModal.show();

  productMasterGroupEditSelect.addEventListener('change', () => {
    options.forEach((e) => {
      if (e.textContent === productMasterGroupEditSelect.options[productMasterGroupEditSelect.selectedIndex].text) {
        const groupSelect = document.querySelector('#product-group-edit-item-1');
        const optionCategory = productAdditionalInfo.masterGroupsGroups.find(
          (masterGroup: IMasterGroupGroup) =>
            masterGroup.masterGroup ===
            productMasterGroupEditSelect.options[productMasterGroupEditSelect.selectedIndex].text
        )?.groups;

        groupSelect.innerHTML = '';
        if (optionCategory) {
          optionCategory.forEach((group: IGroupAdditionalInfo) => {
            const storeSelectOption = document.createElement('option');
            storeSelectOption.setAttribute('value', group.groupId.toString());
            storeSelectOption.textContent = group.groupName;
            groupSelect.appendChild(storeSelectOption);
          });
        }
      }
    });
  });
}

const viewProductButtonElements = document.querySelectorAll('.product-view-button');
viewProductButtonElements.forEach((e) =>
  e.addEventListener('click', async () => {
    const bookingButton = document.querySelector('.product-booking-button');
    if (bookingButton) {
      bookingButton.setAttribute('data-target', e.getAttribute('data-target'));
    }
    const product: IProduct = JSON.parse(e.getAttribute('data-target'));
    const groupsMasterGroups = getGroupsMasterGroups(product);

    let totalWarehouseQty = 0;
    if (product.warehouseProducts) {
      const warehouseQuantity = product.warehouseProducts.map(
        (warehouseQty: IWarehouseProduct) => warehouseQty.productQuantity
      );

      totalWarehouseQty = warehouseQuantity.reduce((acc: number, quantity: number) => acc + quantity, 0);
    }

    const productInfo: IProductAdditionalInfo = await getAdditionalProductInfo(product.id);
    sessionStorage.setItem('product', JSON.stringify(product));
    const prodGroups = Object.keys(groupsMasterGroups);

    prodGroups.forEach((groupName: string) => {
      let isEqual = false;
      const mstrGroupName = groupsMasterGroups[groupName];

      const currentUserGroup = productInfo.currentUserGroups.find(
        (userGroup: IMasterGroupGroupUser) => userGroup.masterGroupName === mstrGroupName
      );

      console.log('currentUserGroup', currentUserGroup);
      console.log('adminRole', productInfo.currentUserRole);

      if (currentUserGroup) {
        const isExistGroup = currentUserGroup.groups.find((group: IGroupAdditionalInfo) => {
          return group.groupName === groupName;
        });

        if (isExistGroup) {
          isEqual = true;
        }
      }
      // NOTE: If user is admin, allow ship/assign for every group
      if (productInfo.currentUserRole === adminRole) {
        isEqual = true;
      }
      if (mstrGroupName !== eventMasterGroup || isEvent) {
        addShipAssignShareButton(isEqual, mstrGroupName, groupName, product);
      }
    });

    let div: HTMLDivElement = document.querySelector('#product-view-name');
    div.innerHTML = product.name;
    div = document.querySelector('#product-view-id');
    div.innerHTML = product.id.toString();
    const img: HTMLImageElement = document.querySelector('#product-view-image');
    const fullImageAnchor = img.closest('.product-full-image-anchor');
    fullImageAnchor.setAttribute('data-target-product-id', product.id.toString());
    product.image.length > 100 ? (img.src = `data:image/png;base64, ${product.image}`) : (img.src = defaultBrandImage);
    div = document.querySelector('#product-view-regular_price');
    div.innerHTML = product.regularPrice?.toString() ?? '0';
    div = document.querySelector('#product-view-retail_price');
    div.innerHTML = product.retailPrice?.toString() ?? '0';
    div = document.querySelector('#product-view-warehouse-qty');
    div.innerHTML = totalWarehouseQty.toString();
    // General Info ->
    div = document.querySelector('#product-view-SKU');
    div.innerHTML = product.SKU;
    div = document.querySelector('#product-view-package_qty');
    product.packageQty ? (div.innerHTML = product.packageQty.toString()) : (div.innerHTML = '0');
    div = document.querySelector('#product-view-numb_of_items_per_case');
    product.numbOfItemsPerCase ? (div.innerHTML = product.numbOfItemsPerCase.toString()) : (div.innerHTML = '0');
    div = document.querySelector('#product-view-numb_of_cases_per_outer_case');
    product.numbOfCasesPerOuterCase
      ? (div.innerHTML = product.numbOfCasesPerOuterCase.toString())
      : (div.innerHTML = '0');
    div = document.querySelector('#product-view-comments');
    product.comments ? (div.innerHTML = product.comments.toString()) : (div.innerHTML = 'No comments');
    div = document.querySelector('#product-view-notes-location');
    product.notes_location ? (div.innerHTML = product.notes_location) : (div.innerHTML = 'No notes');
    div = document.querySelector('#product-view-next_url');
    div.innerHTML = window.location.href;

    product.warehouseProducts.forEach((warehouseProduct: IWarehouseProduct) => {
      const productViewContainer = document.querySelector('#product-view-grid-container');
      const warehouseTemplate = document.querySelector('#product-view-warehouse-template');
      const availableQuantityTemplate = document.querySelector('#product-view-available-quantity-template');

      const warehouseDiv = warehouseTemplate.cloneNode(true) as HTMLDivElement;
      const availableQuantityDiv = availableQuantityTemplate.cloneNode(true) as HTMLDivElement;

      warehouseDiv.classList.remove('hidden');
      availableQuantityDiv.classList.remove('hidden');

      const warehouseName = warehouseDiv.querySelector('.product-view-warehouse-name');
      const warehouseAvailableQuantity = availableQuantityDiv.querySelector(
        '.product-view-warehouse-available-quantity'
      );

      warehouseName.innerHTML = warehouseProduct.warehouse.name;
      warehouseAvailableQuantity.innerHTML = warehouseProduct.productQuantity.toString();

      productViewContainer.appendChild(warehouseDiv);
      productViewContainer.appendChild(availableQuantityDiv);
    });

    viewModal.show();
  })
);

const adjustProductButtonElements = document.querySelectorAll('.product-adjust-button');
adjustProductButtonElements.forEach((e) => {
  e.addEventListener('click', async () => {
    e.setAttribute('disabled', 'true');
    const product = JSON.parse(e.getAttribute('data-target'));
    sessionStorage.setItem('product', JSON.stringify(product));
    const groupsMasterGroups = getGroupsMasterGroups(product);
    const productInfo: IProductAdditionalInfo = await getAdditionalProductInfo(product.id);
    const mstrGroupsEntries = Object.entries(groupsMasterGroups);

    const prodGroups = Object.keys(groupsMasterGroups);

    prodGroups.forEach((groupName) => {
      let isEqual = false;
      const currentUserGroup = productInfo.currentUserGroups.find(
        (userGroup: IMasterGroupGroupUser) => userGroup.masterGroupName === mstrGroupName
      );

      const mstrGroupName = groupsMasterGroups[groupName];
      if (currentUserGroup) {
        const currentUserValue = currentUserGroup.groups[0].groupName;
        if (currentUserValue.includes(groupName)) {
          isEqual = true;
        }
      }

      if (isEvent) {
        if (mstrGroupName === eventMasterGroup) {
          mstrGroupsEntries.forEach(([key, value]: [string, string]) => {
            deleteAdjustContainer(value.replace(/\s/g, '_'), key);
          });
          createAdjustAction(isEqual, mstrGroupName, groupName, product);
        }
      } else {
        if (mstrGroupName !== eventMasterGroup) {
          mstrGroupsEntries.forEach(([key, value]: [string, string]) => {
            deleteAdjustContainer(value.replace(/\s/g, '_'), key);
          });
          createAdjustAction(isEqual, mstrGroupName, groupName, product);
        }
      }
    });

    let div: HTMLDivElement = document.querySelector('#product-adjust-name');
    div.innerHTML = product.name;
    div = document.querySelector('#product-adjust-id');
    div.innerHTML = product.id.toString();
    div = document.querySelector('#product-adjust-SKU');
    div.innerHTML = product.SKU;
    const img: HTMLImageElement = document.querySelector('#product-adjust-image');
    const fullImageAnchor = img.closest('.product-full-image-anchor');
    fullImageAnchor.setAttribute('data-target-product-id', product.id.toString());
    product.image.length > 100 ? (img.src = `data:image/png;base64, ${product.image}`) : (img.src = defaultBrandImage);
    div = document.querySelector('#product-adjust-next_url');
    div.innerHTML = window.location.href;
    adjustModal.show();
  });
});

// function to request share
// TODO refactor !!!
function requestShare(product: IProduct, group: string) {
  const warehouseGroupProduct = product.warehouseProducts.find(
    (warehouseProduct) => warehouseProduct.group.name === group.replace(/_/g, ' ')
  );
  const img: HTMLImageElement = document.querySelector('#product-request-share-image');
  const fullImageAnchor = img.closest('.product-full-image-anchor');
  fullImageAnchor.setAttribute('data-target-product-id', product.id.toString());
  product.image.length > 100 ? (img.src = `data:image/png;base64, ${product.image}`) : (img.src = defaultBrandImage);
  let div: HTMLDivElement = document.querySelector('#product-request-share-name');
  div.innerHTML = product.name;
  div = document.querySelector('#product-request-share-sku');
  div.innerHTML = product.SKU;

  const productSKUInput = document.querySelector('#product-sku') as HTMLInputElement;
  productSKUInput.value = product.SKU;

  div = document.querySelector('#product-request-share-available-quantity');
  div.innerHTML = warehouseGroupProduct.productQuantity.toString();
  div = document.querySelector('#product-request-share-owner');
  // TODO change to something not hardcoded here and in rest funcs
  div.innerHTML = 'Mike';
  div = document.querySelector('#product-request-share-role');
  div.innerHTML = 'ADMIN';
  div = document.querySelector('#product-request-share-total-available-items');
  div.innerHTML = warehouseGroupProduct.productQuantity.toString();
  let input: HTMLInputElement = document.querySelector('#product-request-share-quantity');
  input.max = warehouseGroupProduct.productQuantity.toString();
  input.min = '1';
  input = document.querySelector('#product-request-share-name-hidden-input');
  input.value = product.name;
  input = document.querySelector('#product-request-share-SKU-hidden-input');
  input.value = product.SKU;
  input = document.querySelector('#product-request-share-available-quantity-hidden-input');
  input.value = warehouseGroupProduct.productQuantity.toString();

  const groupNameView = document.querySelector('#product-request-share-from-group');
  groupNameView.innerHTML = group.replace(/_/g, ' ');

  const fromGroupId = document.querySelector('#from-group-id') as HTMLInputElement;
  const groupsIds = getGroupsIds(product);

  fromGroupId.value = groupsIds[group.replace(/_/g, ' ')].toString();

  requestShareModal.show();
}

function getGroupsIds(product: IProduct) {
  const groupsIds = {} as { [group: string]: number };

  product.warehouseProducts.forEach((warehouseProduct: IWarehouseProduct) => {
    const group = warehouseProduct.group.name;
    const id = warehouseProduct.group.id;
    if (!groupsIds.hasOwnProperty(group)) {
      groupsIds[group] = id;
    }
  });

  return groupsIds;
}

// function to ship
function ship(product: IProduct, group: string) {
  const warehouseGroupProduct = product.warehouseProducts.find(
    (warehouseProduct) => warehouseProduct.group.name === group.replace(/_/g, ' ')
  );
  const img: HTMLImageElement = document.querySelector('#product-ship-image');
  const fullImageAnchor = img.closest('.product-full-image-anchor');
  fullImageAnchor.setAttribute('data-target-product-id', product.id.toString());
  product.image.length > 100 ? (img.src = `data:image/png;base64, ${product.image}`) : (img.src = defaultBrandImage);
  let div: HTMLDivElement = document.querySelector('#product-ship-name');
  div.innerHTML = product.name;
  div = document.querySelector('#product-ship-sku');
  div.innerHTML = product.SKU;
  div = document.querySelector('#product-ship-available-quantity');
  div.innerHTML = warehouseGroupProduct.productQuantity.toString();
  div = document.querySelector('#product-ship-total-available-items');
  div.innerHTML = warehouseGroupProduct.productQuantity.toString();

  let input: HTMLInputElement = document.querySelector('#product-ship-product-id');
  input.value = product.id.toString();
  input = document.querySelector('#product-ship-desire-quantity');
  input.max = warehouseGroupProduct.productQuantity.toString();
  input.min = '1';
  input = document.querySelector('#product-ship-group');
  input.value = group.replace(/_/g, ' ');

  shipModal.show();

  // -----count rest quantity in ship request product modal------
  const desiredQuantityInput: HTMLInputElement = document.querySelector('#product-ship-desire-quantity');
  desiredQuantityInput.setAttribute('max', warehouseGroupProduct.productQuantity.toString());
  desiredQuantityInput.addEventListener('change', () => {
    const availableQuantityDiv = document.querySelector('#product-ship-available-quantity');
    availableQuantityDiv.textContent = warehouseGroupProduct.productQuantity.toString();
    let desiredQuantity = parseInt(desiredQuantityInput.value);
    const availableQuantity = parseInt(availableQuantityDiv.textContent);
    if (desiredQuantity < 0) {
      desiredQuantityInput.value = '0';
    } else if (desiredQuantity > availableQuantity) {
      desiredQuantityInput.value = warehouseGroupProduct.productQuantity.toString();
      availableQuantityDiv.textContent = '0';
    } else if (desiredQuantity) {
      availableQuantityDiv.textContent = (availableQuantity - desiredQuantity).toString();
    }
  });
}

let picker: Datepicker;

let calendarFilter: string[] = [];

// function to booking
function booking(product: IProduct, group: string) {
  const warehouseGroupProduct = product.warehouseProducts.find((warehouseProduct) => {
    return warehouseProduct.group.name === group.replace(/_/g, ' ');
  });
  const img: HTMLImageElement = document.querySelector('#product-event-image');
  const fullImageAnchor = img.closest('.product-full-image-anchor');
  fullImageAnchor.setAttribute('data-target-product-id', product.id.toString());
  product.image.length > 100 ? (img.src = `data:image/png;base64, ${product.image}`) : (img.src = defaultBrandImage);
  let div: HTMLDivElement = document.querySelector('#product-event-name');
  div.innerHTML = product.name;
  div = document.querySelector('#product-event-SKU');
  div.innerHTML = product.SKU;

  let input: HTMLInputElement = document.querySelector('#product-event-group-hidden');
  input.value = group.replace(/_/g, ' ');
  input = document.querySelector('#product-event-product-id');
  input.value = product.id.toString();
  input = document.querySelector('#product-event-quantity');
  input.min = '1';
  input.max = warehouseGroupProduct.productQuantity.toString();

  const currentDate = new Date();

  async function createDatepicker() {
    picker = new easepick.create({
      element: document.getElementById('datepicker'),
      css: [
        'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
        'https://easepick.com/css/demo_prices.css',
        'https://easepick.com/css/demo_hotelcal.css',
      ],
      autoApply: true,
      inline: true,
      plugins: ['LockPlugin'],
      LockPlugin: {
        filter(date: any) {
          if (date - +currentDate > fiveDays) {
            return false;
          } else {
            return true;
          }
        },
      },

      setup(picker: any) {
        picker.on('view', async (evt: any) => {
          const { view, date, target } = evt.detail;
          if (view === 'CalendarDay') {
            const day = parseInt(target.innerHTML);
            if (day === 1) {
              calendarFilter = [target.getAttribute('data-time')];
              return;
            }

            if (!calendarFilter.includes(target.getAttribute('data-time'))) {
              calendarFilter.push(target.getAttribute('data-time'));
            }
          }

          if ((view as string).toLowerCase() !== 'main') {
            return;
          }

          const fetchedAmountByDate = (await getEventAvailableQuantity(product.id, group, calendarFilter)) as {
            date: number;
            quantity: number;
          }[];

          fetchedAmountByDate.forEach(({ date, quantity }, i) => {
            const dayContainer = document.querySelector('.easepick-wrapper');

            const dayContainerShadow = dayContainer.shadowRoot.querySelector(`div[data-time='${date}']`);

            if (!dayContainerShadow) {
              return;
            }

            const span = dayContainerShadow.querySelector('.day-price') ?? document.createElement('span');
            span.className = 'day-price';
            span.innerHTML = quantity.toString();
            if (quantity <= 0) {
              dayContainerShadow.classList.add('locked');
            }
            dayContainerShadow.append(span);
          });
        });
      },
    });
  }

  createDatepicker();

  viewModal.hide();
  eventModal.show();
}

// function to assign
function assign(product: IProduct, group: string) {
  const warehouseGroupProduct = product.warehouseProducts.find(
    (warehouseProduct) => warehouseProduct.group.name === group.replace(/_/g, ' ')
  );
  let div: HTMLDivElement = document.querySelector('#product-assign-available-quantity');
  div.innerHTML = warehouseGroupProduct.productQuantity.toString();
  let input: HTMLInputElement = document.querySelector('#product-assign-name');
  input.value = product.name;
  input = document.querySelector('#product-assign-amount');
  input.max = warehouseGroupProduct.productQuantity.toString();
  input.min = '1';
  const groupName = group.replace(/_/g, ' ');
  const groupIds = getGroupsIds(product);
  const group_id = groupIds[groupName];
  input = document.querySelector('#product-assign-from-group');
  input.value = groupName;

  input = document.querySelector('#product-assign-from-group_id');
  input.value = group_id.toString();

  const assignProductGroupOptions = document.querySelectorAll('.product-assign-to-group');
  assignProductGroupOptions.forEach((option) => {
    if (option.textContent === group) {
      option.classList.add('hidden');
    }
  });

  assignModal.show();
}

// function to delete ship assign share button
function deleteShipAssignButton(nameGroup: string, nameGroupValue: string) {
  const shipAssignShareContainer = document.querySelector(
    `#product-ship-assign-share-container-${nameGroup.replace(/ /g, '_')}`
  );
  const groupContainer = document.querySelector(
    `#product-view-product_group-container-${nameGroupValue.replace(/ /g, '_')}`
  );
  if (shipAssignShareContainer) {
    shipAssignShareContainer.remove();
  }
  if (groupContainer) {
    groupContainer.remove();
  }
}

// function to add ship, assign, button to view product modal
function addShipAssignShareButton(isEqual: boolean, masterGroup: string, group: string, productParam: IProduct) {
  const warehouseGroupProduct = productParam.warehouseProducts.find(
    (warehouseProduct) => warehouseProduct.group.name === group
  );
  const isEventItem = isEvent && masterGroup === eventMasterGroup;
  const groupUnderScore = group.replace(/ /g, '_');
  const groupIds = getGroupsIds(productParam);
  const groupProductIds = groupIds;
  const productTypeContainer = document.querySelector(`#product-view-product-name-container`);
  const shipAssignContainer = document.createElement('div');

  shipAssignContainer.classList.add('sm:col-span-3', 'flex', 'gap-4');
  shipAssignContainer.setAttribute('id', `product-ship-assign-share-container-${masterGroup.replace(/ /g, '_')}`);
  const shipAssignContainerDiv = `
    <div>
      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Available</label>
        <div id="ship-product-quantity"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      ${warehouseGroupProduct.productQuantity || 0}</div>
    </div>
    <div>
      <label for="product_group" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Action</label >
      <button ship-group-data=${groupUnderScore} type="button" id="ship-product-button-${groupUnderScore}" class="ship-product-button inline-flex items-center mr-2 px-3 py-2.5 text-sm font-medium text-center text-white rounded-lg bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
        Ship
      </button>
      <button assign-group-data=${groupUnderScore} type="button" id="assign-product-button-${groupUnderScore}" class="assign-product-button inline-flex items-center px-3 py-2.5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
        Assign
      </button>
    </div>
  `;

  const bookingContainerDiv = `
        <div>
        <label for="product_group" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Action</label >
        <button ship-group-data=${groupUnderScore} type="button" id="booking-product-button-${groupUnderScore}" class="booking-product-button inline-flex items-center mr-2 px-3 py-2.5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M128 0c13.3 0 24 10.7 24 24V64H296V24c0-13.3 10.7-24 24-24s24 10.7 24 24V64h40c35.3 0 64 28.7 64 64v16 48V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192 144 128C0 92.7 28.7 64 64 64h40V24c0-13.3 10.7-24 24-24zM400 192H48V448c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V192zM329 297L217 409c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47 95-95c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                clip-rule="evenodd"></path>
            </svg>
            Booking
        </button>
        </div>
    `;
  isEventItem
    ? (shipAssignContainer.innerHTML = bookingContainerDiv)
    : (shipAssignContainer.innerHTML = shipAssignContainerDiv);

  const shareContainer = document.createElement('div');
  const shipProductBtn = shipAssignContainer.querySelector(`#ship-product-button-${groupUnderScore}`);
  const assignProductBtn = shipAssignContainer.querySelector(`#assign-product-button-${groupUnderScore}`);

  shareContainer.classList.add('sm:col-span-3', 'flex', 'gap-4');
  shareContainer.setAttribute('id', `product-ship-assign-share-container-${masterGroup.replace(/ /g, '_')}`);
  shareContainer.innerHTML = `
    <div>
      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Available</label>
        <div id="ship-product-quantity"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      ${warehouseGroupProduct.productQuantity || 0}</div>
    </div>
    <div>
      <label for="product_group" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Action</label >
      <button share-group-data=${groupUnderScore} type="button" id="share-product-button-${groupUnderScore}" class="request-share-product-button inline-flex items-center px-3 py-2.5 text-sm font-medium text-center text-white rounded-lg bg-yellow-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
        Request Share
      </button>
    </div>
  `;

  const shareProductBtn = shareContainer.querySelector(`#share-product-button-${groupUnderScore}`);

  if (warehouseGroupProduct.productQuantity === 0 || !warehouseGroupProduct) {
    if (shipProductBtn && assignProductBtn) {
      shipProductBtn.classList.add('invisible');
      assignProductBtn.classList.add('invisible');
    }
    // TODO: Ask client about share request when === 0
    shareProductBtn.classList.add('invisible');
  }

  if (isEqual) {
    productTypeContainer.parentNode.insertBefore(shipAssignContainer, productTypeContainer.nextSibling);
  } else {
    productTypeContainer.parentNode.insertBefore(shareContainer, productTypeContainer.nextSibling);
  }

  if (isEventItem) {
    const bookingButtons = shipAssignContainer.querySelectorAll('.booking-product-button');

    bookingButtons.forEach((e) =>
      e.addEventListener('click', () => {
        let shipGroup = e.getAttribute('ship-group-data');
        const product = JSON.parse(sessionStorage.product);
        booking(product, shipGroup);
      })
    );
  }

  const shipButtons = document.querySelectorAll('.ship-product-button');
  shipButtons.forEach((e) =>
    e.addEventListener('click', () => {
      viewModal.hide();
      editModal.hide();
      let shipGroup = e.getAttribute('ship-group-data');
      const product = JSON.parse(sessionStorage.product);
      ship(product, shipGroup);
    })
  );

  const assignButtons = document.querySelectorAll('.assign-product-button');
  assignButtons.forEach((e) =>
    e.addEventListener('click', () => {
      viewModal.hide();
      editModal.hide();
      let assignGroup = e.getAttribute('assign-group-data');
      const product = JSON.parse(sessionStorage.product);
      assign(product, assignGroup);
    })
  );

  const requestShareButtons = document.querySelectorAll('.request-share-product-button');
  requestShareButtons.forEach((e) =>
    e.addEventListener('click', () => {
      viewModal.hide();
      editModal.hide();
      let shareGroup = e.getAttribute('share-group-data');
      const product = JSON.parse(sessionStorage.product);

      requestShare(product, shareGroup);
    })
  );
  const productViewTypeContainer = document.querySelector('#product-view-product-name-container');
  const productMasterGroupContainer = document.createElement('div');
  productMasterGroupContainer.classList.add('sm:col-span-3');
  productMasterGroupContainer.setAttribute('id', `product-view-product_group-container-${groupUnderScore}`);

  productMasterGroupContainer.innerHTML = `
    <label for="for-group-${groupUnderScore}"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${masterGroup}</label>
    <select type="text" name="group-${groupUnderScore}" id="product-view-${groupUnderScore}"
      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Some Group" required
    >
      <option value="${groupProductIds[group]}">${group}</option>
    </select>
    `;
  productViewTypeContainer.parentNode.insertBefore(productMasterGroupContainer, productViewTypeContainer.nextSibling);
}

const filterProductButton = document.querySelector('#product-filter-button') as HTMLButtonElement;

filterProductButton.addEventListener('click', (e) => {
  searchInputButton.click();
});

async function createAdjustAction(isEqual: boolean, masterGroup: string, group: string, productParam: IProduct) {
  sessionStorage.setItem('productInWarehousesSchema', JSON.stringify(productParam.warehouseProducts));

  const productInfo: IProductAdditionalInfo = await getAdditionalProductInfo(productParam.id);
  const groupUnderScore = group.replace(/ /g, '_');
  const groupProductIds = getGroupsIds(productParam);

  const productTypeContainer = document.querySelector(`#product-adjust-product-name-container`);
  const adjustContainer = document.createElement('div');
  adjustContainer.classList.add('sm:col-span-2', 'flex', 'gap-4');
  adjustContainer.setAttribute('id', `product-adjust-container-${groupUnderScore}`);
  adjustContainer.innerHTML = `
    <div>
      <label for="adjust-product-quantity-${groupUnderScore}" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Available</label>
        <input id="adjust-product-quantity-${groupUnderScore}"
          class="product-adjust-group-quantity shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    </div>

  `;

  productTypeContainer.parentNode.insertBefore(adjustContainer, productTypeContainer.nextSibling);

  const productViewTypeContainer = document.querySelector('#product-adjust-product-name-container');
  const masterGroupWarehouseContainer = document.createElement('div');
  masterGroupWarehouseContainer.classList.add('sm:col-span-4');
  masterGroupWarehouseContainer.setAttribute('id', `product-adjust-product_group-container-${groupUnderScore}`);

  masterGroupWarehouseContainer.innerHTML = `
  <div class="flex gap-4">
    <div class="">
      <label for="for-group-${groupUnderScore}"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${masterGroup}</label>
      <select type="text" name="group-${groupUnderScore}" id="master-group-adjust-${groupUnderScore}"
        class="product-adjust-group shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Some Group" required
      >
        <option value="${groupProductIds[group]}">${group}</option>
      </select>
    </div>
    <div class="">
      <label for="for-warehouse-${groupUnderScore}"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Warehouse</label>
      <select type="text" name="group-${groupUnderScore}" id="warehouse-adjust-${groupUnderScore}" data-target-group="${group}"
        class="product-adjust-warehouse-select shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Some Group" required
      >
      </select>
    </div>
  </div>
    `;
  const selectWarehouse: HTMLInputElement = masterGroupWarehouseContainer.querySelector(
    `#warehouse-adjust-${groupUnderScore}`
  );
  const productQuantity: HTMLInputElement = adjustContainer.querySelector(
    `#adjust-product-quantity-${groupUnderScore}`
  );

  for (const warehouse of productInfo.allWarehouses) {
    if (isEvent && warehouse.name !== eventsWarehouse) {
      continue;
    }
    if (!isEvent && warehouse.name === eventsWarehouse) {
      continue;
    }
    const option = document.createElement('option');
    option.value = warehouse.id.toString();
    option.text = warehouse.name.toString();
    selectWarehouse.appendChild(option);
  }

  const warehouseProduct = productParam.warehouseProducts.find((item: IWarehouseProduct) => {
    return item.group.name === group && item.warehouse.id === Number(selectWarehouse.value);
  });

  if (!warehouseProduct) {
    console.log('warehouseProduct product not found', warehouseProduct);
    return;
  }

  productQuantity.value = warehouseProduct.productQuantity.toString();

  productViewTypeContainer.parentNode.insertBefore(masterGroupWarehouseContainer, productViewTypeContainer.nextSibling);

  selectWarehouse.addEventListener('change', () => {
    const productInWarehousesSchema = JSON.parse(sessionStorage.getItem('productInWarehousesSchema'));
    if (!productInWarehousesSchema) {
      console.log('productInWarehousesSchema not found', productInWarehousesSchema);
      return;
    }
    const warehouseProduct: IWarehouseProduct = productInWarehousesSchema.find((item: IWarehouseProduct) => {
      return item.group.name === group && item.warehouse.id === Number(selectWarehouse.value);
    });

    if (!warehouseProduct) {
      console.log('warehouseProduct product not found', warehouseProduct);
      return;
    }

    const availableQuantity = warehouseProduct.productQuantity.toString();
    productQuantity.value = String(availableQuantity);

    warehouseProduct.productQuantity = Number(productQuantity.value);
    sessionStorage.setItem('productInWarehousesSchema', JSON.stringify(productInWarehousesSchema));
  });

  productQuantity.addEventListener('change', () => {
    const productInWarehousesSchema = JSON.parse(sessionStorage.getItem('productInWarehousesSchema'));
    const warehouseProduct: IWarehouseProduct = productInWarehousesSchema.find((item: IWarehouseProduct) => {
      return item.group.name === group && item.warehouse.id === Number(selectWarehouse.value);
    });

    if (!warehouseProduct) {
      console.log('warehouseProduct product not found', warehouseProduct);
      return;
    }

    warehouseProduct.productQuantity = Number(productQuantity.value);
    sessionStorage.setItem('productInWarehousesSchema', JSON.stringify(productInWarehousesSchema));
  });
}

async function checkAdjustEventQuantity(warehouseProducts: IWarehouseProduct[]) {
  const fetchPromises = warehouseProducts.map(async (product: IWarehouseProduct) => {
    const response = await fetch(
      `/event/get_adjust_available_quantity?group_id=${product.group.id}&product_id=${product.productId}&quantity=${product.productQuantity}`
    );

    if (response.status !== 200) {
      const message = await response.json();

      const data = {
        productId: product.productId,
        error: message,
        status: false,
      };
      return data;
    }
    const data = {
      productId: product.productId,
      status: true,
    };

    return data;
  });

  const resultAllPromises: IEventProductPromise[] = [];

  const results = await Promise.all(fetchPromises);
  results.forEach((result) => {
    if (result.status !== true) {
      return resultAllPromises.push(result);
    }
  });

  return resultAllPromises;
}

// add dom content loaded event listener
const adjustButton = document.querySelector(`#product-adjust-submit-btn`);
adjustButton.addEventListener(
  'click',
  () => {
    adjustButton.setAttribute('disabled', 'true');
    const product = JSON.parse(sessionStorage.getItem('product'));
    const csrfTokenInput = document.querySelector<HTMLInputElement>('#csrf_token');
    const csrfToken = csrfTokenInput ? csrfTokenInput.value : '';
    adjustProduct(product, csrfToken);
  },
  { once: true }
);

async function adjustProduct(productParam: IProduct, csrfToken: string) {
  const adjustNote: HTMLInputElement = document.querySelector('#product-adjust-note');
  const productInWarehousesSchema = JSON.parse(sessionStorage.getItem('productInWarehousesSchema'));

  const data = {
    product_id: productParam.id,
    warehouses_groups_quantity: JSON.stringify(productInWarehousesSchema),
    note: adjustNote.value,
    csrf_token: csrfToken,
  };

  const adjustProductQuantity = async () => {
    const response = await fetch(`/product/adjust`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      location.reload();
      sessionStorage.removeItem('productInWarehouses');
    } else {
      location.reload();
      alert('Something went wrong, the product was not adjusted. Please try again.');
      sessionStorage.removeItem('productInWarehouses');
    }
  };

  if (isEvent) {
    const eventsProducts = productInWarehousesSchema.filter((product: IWarehouseProduct) => {
      return product.group.masterGroup.name === eventMasterGroup;
    });
    const availableEventQuantity = await checkAdjustEventQuantity(eventsProducts);

    if (availableEventQuantity.length !== 0) {
      const errorMessages = availableEventQuantity.map((e) => e.error);
      alert('Maximum quantity exceeded!' + '\n' + errorMessages.join('\n'));
    } else {
      adjustProductQuantity();
    }
  } else {
    adjustProductQuantity();
  }
}

function deleteAdjustContainer(nameGroup: string, nameGroupValue: string) {
  const adjustContainer = document.querySelector(`#product-adjust-container-${nameGroupValue.replace(/ /g, '_')}`);
  const masterGroupWarehouseContainer = document.querySelector(
    `#product-adjust-product_group-container-${nameGroupValue.replace(/ /g, '_')}`
  );
  if (adjustContainer) {
    adjustContainer.remove();
  }
  if (masterGroupWarehouseContainer) {
    masterGroupWarehouseContainer.remove();
  }
}

// ----add inbound order item for edit modal----
async function createProductGroupEditItem(
  productParam: IProduct = null,
  productInfo: IProductAdditionalInfo = null,
  masterGroup: string = null,
  itemIndex: number = null
) {
  if (!productParam) {
    const product: IProduct = JSON.parse(sessionStorage.getItem('product'));
    productParam = product;
  }

  if (!productInfo) {
    productInfo = await getAdditionalProductInfo(productParam.id);
  }

  const productGroupEditContainer = document.querySelector('#product-group-edit-add-container');
  const productGroupEditAllItems = document.querySelectorAll('.product-group-edit-add-item');
  const index = productGroupEditAllItems.length + 1;
  const productGroupEditItem = document.createElement('div');

  productGroupEditItem.classList.add(
    'p-6',
    'space-y-6',
    'border-t',
    'product-group-edit-add-item',
    `delete-id-${index}`
  );
  productGroupEditItem.innerHTML = `
  <div class="grid grid-cols-12 gap-5">
    <div class="col-span-6 sm:col-span-4">
      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Master
        Group</label>
      <select type="text" name="add_product" id="product-master-group-edit-item-${index}"
        class="product-master-group-edit-item shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Master
        Group" required>
        <option value="" disabled selected>Select master group</option>
      </select>
    </div>
    <div class="col-span-6 sm:col-span-4">
      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group</label>
      <select type="text" name="add_group" id="product-group-edit-item-${index}"
        class="product-group-edit-item shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Group" required>
        <option value="" disabled selected>Select group</option>
      </select>
    </div>
    <div class="col-span-6 sm:col-span-4">
      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Action</label>
      <button type="button" data-target=""
        class="product-group-edit-delete-item-btn inline-flex items-center px-3 py-2 mr-3 text-sm font-medium text-center text-white rounded-lg bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z">
          </path>
        </svg>
      </button>
      <button type="button" id="product-group-edit-add-item-btn-${index}"
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-red-300">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z">
          </path>
        </svg>
      </button>
    </div>
  </div>
  `;

  const productGroupEditSelect: HTMLSelectElement = productGroupEditItem.querySelector('.product-group-edit-item');
  const availableMasterGroups = [...productInfo.masterGroupsGroups.map((e) => e.masterGroup)];
  const productMasterGroupEditSelect: HTMLSelectElement = productGroupEditItem.querySelector(
    `#product-master-group-edit-item-${index}`
  );

  availableMasterGroups.forEach((masterGroup: string) => {
    const option = document.createElement('option');
    option.setAttribute('value', masterGroup);
    option.innerHTML = masterGroup;
    productMasterGroupEditSelect.appendChild(option);
  });
  if (masterGroup) {
    productMasterGroupEditSelect.value = masterGroup;
    const currentMasterGroup = productInfo.masterGroupsGroups.find(
      (masterGroupItem) => masterGroupItem.masterGroup === masterGroup
    );

    currentMasterGroup.groups.forEach((group: IGroupAdditionalInfo) => {
      const productGroupSelectOption = document.createElement('option');
      productGroupSelectOption.setAttribute('value', group.groupId.toString());
      productGroupSelectOption.textContent = group.groupName;
      productGroupEditSelect.appendChild(productGroupSelectOption);
    });
    // TODO: always select first option
    if (!itemIndex) {
      itemIndex = 0;
    }
    const currentProductMasterGroup = productInfo.currentMasterProductGroups.find(
      (masterGroupItem) => masterGroupItem.masterGroup === masterGroup
    );

    productGroupEditSelect.value = currentProductMasterGroup.groups[itemIndex].groupId.toString();
  }

  const options = productMasterGroupEditSelect.querySelectorAll('option');
  productMasterGroupEditSelect.addEventListener('change', () => {
    options.forEach((e) => {
      if (e.textContent === productMasterGroupEditSelect.options[productMasterGroupEditSelect.selectedIndex].text) {
        const optionCategory = productInfo.masterGroupsGroups.find(
          (masterGroup) =>
            masterGroup.masterGroup ===
            productMasterGroupEditSelect.options[productMasterGroupEditSelect.selectedIndex].text
        )?.groups;

        document.getElementById(`product-group-edit-item-${index}`).innerHTML = '';
        if (optionCategory) {
          optionCategory.forEach((group: IGroupAdditionalInfo) => {
            const storeSelectOption = document.createElement('option');
            storeSelectOption.setAttribute('value', group.groupId.toString());
            storeSelectOption.textContent = group.groupName;
            productGroupEditSelect.appendChild(storeSelectOption);
          });
        }
      }
    });
  });
  productGroupEditContainer.appendChild(productGroupEditItem);

  const addButton = productGroupEditItem.querySelector(`#product-group-edit-add-item-btn-${index}`);

  addButton.addEventListener('click', () => {
    createProductGroupEditItem();
  });

  const deleteButton = productGroupEditItem.querySelector('.product-group-edit-delete-item-btn');
  deleteButton.addEventListener('click', () => {
    const inboundOrderItem = document.querySelector(`.delete-id-${index}`);
    if (inboundOrderItem) {
      inboundOrderItem.remove();
    }
  });
}

// this button need to add first item from template
const productGroupEditBtnById = document.querySelector('#product-group-edit-add-item-btn');
productGroupEditBtnById.addEventListener('click', () => {
  createProductGroupEditItem();
});

// ----set product to JSON hidden input in inbound-order-edit-form----
function setProducts(typeModal: string) {
  const productGroupItems = document.querySelectorAll(`.product-group-${typeModal}-add-item`);

  const products = [];

  for (let i = 0; i < productGroupItems.length; i++) {
    const productGroupItem: HTMLSelectElement = productGroupItems[i].querySelector(`.product-group-${typeModal}-item`);

    const product = Number(productGroupItem.value);
    products.push(product);
  }

  const inputProducts: HTMLInputElement = document.querySelector(`#product-${typeModal}-product-groups`);
  inputProducts.value = JSON.stringify(products);

  return true;
}

// ----submit edit form through hidden submit button----
const productEditSubmitButton: HTMLButtonElement = document.querySelector('#product-edit-submit-btn');
const productEditSaveButton = document.querySelector('#product-edit-save-products-btn');

productEditSaveButton.addEventListener('click', () => {
  const result = setProducts('edit');
  if (result) {
    productEditSubmitButton.click();
  }
});

// ----add product group item for edit modal----
function createProductGroupAddItem(groups: IProductMasterGroupGroup = null) {
  if (!groups) {
    groups = JSON.parse(sessionStorage.getItem('groups'));
  }
  const productGroupAddContainer = document.querySelector('#product-group-add-add-container');
  const productGroupEditOriginal = document.querySelector('#product-group-add-item');
  const productGroupAddAllItems = document.querySelectorAll('.product-group-add-add-item');
  const index = productGroupAddAllItems.length + 1;
  const productGroupAddItem = document.createElement('div');

  productGroupAddItem.classList.add('p-6', 'space-y-6', 'border-t', 'product-group-add-add-item', `delete-id-${index}`);
  productGroupAddItem.innerHTML = `
  <div class="grid grid-cols-12 gap-5">
    <div class="col-span-6 sm:col-span-4">
      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Master
        Group</label>
      <select type="text" name="add_product" id="product-master-group-add-item-${index}"
        class="product-master-group-add-item shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Master
        Group" required>
        <option value="" disabled selected>Select master group</option>
      </select>
    </div>
    <div class="col-span-6 sm:col-span-4">
      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group</label>
      <select type="text" name="add_group" id="product-group-add-item-${index}"
        class="product-group-add-item shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Group" required>
        <option value="" disabled selected>Select group</option>
      </select>
    </div>
    <div class="col-span-6 sm:col-span-4">
      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Action</label>
      <button type="button" data-target=""
        class="product-group-add-delete-item-btn inline-flex items-center px-3 py-2 mr-3 text-sm font-medium text-center text-white rounded-lg bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z">
          </path>
        </svg>
      </button>
      <button type="button" id="product-group-add-add-item-btn-${index}"
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-red-300">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z">
          </path>
        </svg>
      </button>
    </div>
  </div>
  `;

  const productMasterGroupAddSelect: HTMLSelectElement = productGroupAddItem.querySelector(
    `#product-master-group-add-item-${index}`
  );
  const productGroupAddSelect: HTMLSelectElement = productGroupAddItem.querySelector('.product-group-add-item');
  const availableMasterGroups = Object.keys(groups);

  availableMasterGroups.forEach((masterGroup) => {
    const option = document.createElement('option');
    option.setAttribute('value', masterGroup);
    option.innerHTML = masterGroup;
    productMasterGroupAddSelect.appendChild(option);
  });
  const options = productMasterGroupAddSelect.querySelectorAll('option');

  productMasterGroupAddSelect.addEventListener('change', () => {
    options.forEach((e) => {
      if (e.textContent === productMasterGroupAddSelect.options[productMasterGroupAddSelect.selectedIndex].text) {
        const optionCategory =
          groups[productMasterGroupAddSelect.options[productMasterGroupAddSelect.selectedIndex].text];

        document.getElementById(`product-group-add-item-${index}`).innerHTML = '';
        if (optionCategory) {
          optionCategory.forEach((group: { group_name: string; group_id: number }) => {
            const storeSelectOption = document.createElement('option');
            storeSelectOption.setAttribute('value', group.group_id.toString());
            storeSelectOption.textContent = group.group_name;
            productGroupAddSelect.appendChild(storeSelectOption);
          });
        }
      }
    });
  });

  productGroupAddContainer.appendChild(productGroupAddItem);

  const addButton = productGroupAddItem.querySelector(`#product-group-add-add-item-btn-${index}`);

  addButton.addEventListener('click', () => {
    createProductGroupAddItem();
  });

  const deleteButton = productGroupAddItem.querySelector('.product-group-add-delete-item-btn');
  deleteButton.addEventListener('click', () => {
    const inboundOrderItem = document.querySelector(`.delete-id-${index}`);
    if (inboundOrderItem) {
      inboundOrderItem.remove();
    }
  });
}

// this button need to add first item from template
const productGroupAddBtnById = document.querySelector('#product-group-add-add-item-btn');
productGroupAddBtnById.addEventListener('click', () => {
  createProductGroupAddItem();
});

// ----submit add form through hidden submit button----
const productAddSubmitButton: HTMLButtonElement = document.querySelector('#product-add-submit-btn');
const productAddSaveButton = document.querySelector('#product-add-save-products-btn');

productAddSaveButton.addEventListener('click', () => {
  const result = setProducts('add');
  if (result) {
    productAddSubmitButton.click();
  }
});

// ----clear product group container----
function clearProductGroupContainer() {
  const productGroupEditContainer = document.querySelector('#product-group-edit-add-container');
  const productGroupEditItems = document.querySelectorAll('.product-group-edit-add-item');
  for (let i = 1; i < productGroupEditItems.length; i++) {
    productGroupEditContainer.removeChild(productGroupEditItems[i]);
  }
  const productGroupEditSelects = document.querySelectorAll('.product-group-edit-add-item');
}

document.querySelector('#product-assign-master-group').addEventListener('change', () => {
  const productAssignMasterGroupSelect: HTMLSelectElement = document.querySelector('#product-assign-master-group');
  const productAssignGroupSelect: HTMLDataListElement = document.querySelector('#assign-group-list');
  const groups: IMasterGroup = JSON.parse(
    productAssignMasterGroupSelect[productAssignMasterGroupSelect.selectedIndex].getAttribute('data-target')
  );
  const availableMasterGroups = Object.keys(groups.master_groups_list_groups);

  productAssignGroupSelect.innerHTML = '';

  availableMasterGroups.forEach((masterGroup) => {
    if (masterGroup === productAssignMasterGroupSelect.options[productAssignMasterGroupSelect.selectedIndex].text) {
      const optionCategory = groups.master_groups_list_groups[masterGroup];

      if (optionCategory) {
        optionCategory.forEach((group: { group_name: string; group_id: number }) => {
          const storeSelectOption = document.createElement('option');
          storeSelectOption.setAttribute('value', group.group_name);
          storeSelectOption.setAttribute('assign-data-group-id', group.group_id.toString());
          storeSelectOption.textContent = group.group_name;
          productAssignGroupSelect.appendChild(storeSelectOption);
        });
      }
    }
  });
});

const uploadGroupInput = document.querySelector('#product-assign-group') as HTMLInputElement;
const uploadSubGroupSelect = document.querySelector('#product-assign-sub-group') as HTMLInputElement;
const uploadGroupIdInputHidden = document.querySelector('#product-assign-group-id-hidden') as HTMLInputElement;
if (uploadGroupInput) {
  uploadGroupInput.addEventListener('change', () => {
    const option = uploadGroupInput.list.querySelector('option[value="' + uploadGroupInput.value + '"]') as HTMLElement;
    uploadGroupIdInputHidden.value = option.getAttribute('assign-data-group-id');
  });
}

document.querySelector('#product-assign-group-submit-btn').addEventListener('click', () => {
  const optionGroup = uploadGroupInput.list.querySelector(
    'option[value="' + uploadGroupInput.value + '"]'
  ) as HTMLElement;
  // NOTE Use large number if no group selected. Impossible to reach that number in prod.
  // Used to avoid wrong validation in backend wtform when pass 0 and get None
  console.log('uploadSubGroupSelect', uploadSubGroupSelect.value);

  let groupId;
  if (uploadSubGroupSelect.value) {
    groupId = uploadSubGroupSelect.value;
  } else if (uploadGroupInput.value) {
    groupId = optionGroup.getAttribute('assign-data-group-id');
  } else {
    groupId = '';
  }

  const hiddenInput = document.getElementById('product-assign-group-hidden') as HTMLInputElement;
  hiddenInput.value = groupId.toString();
});

// ---image compressor----
async function imageCompressor(action: string, element: Event) {
  const desiredImageSize = 300 * 1024;
  const lowImageInput = document.querySelector<HTMLInputElement>(`#product-${action}-low-image`);
  const highImageInput = document.querySelector<HTMLInputElement>(`#product-${action}-high-image`);
  const initialImage = (element.target as HTMLInputElement).files[0];

  if (initialImage.size > desiredImageSize) {
    const compressedImage = await compressImage(initialImage);
    const compressedImageFile = new File([compressedImage], `low_${initialImage.name}`, {
      type: initialImage.type,
    });

    lowImageInput.files = setFileInput(compressedImageFile);
  } else {
    lowImageInput.files = setFileInput(initialImage);
  }
  highImageInput.files = setFileInput(initialImage);

  async function compressImage(file: File) {
    const maxFileSize = desiredImageSize;
    let quality = 0.6;

    while (quality > 0) {
      const compressedFile = await compressQualityImage(file, quality);
      if ((compressedFile as File).size < maxFileSize) {
        return compressedFile;
      }
      quality -= 0.1;
      if (quality < 0.1) {
        return compressedFile;
      }
    }
  }

  async function compressQualityImage(file: File, quality: number) {
    return new Promise<Blob>((resolve, reject) => {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 300;
        canvas.height = 300;

        context.drawImage(image, 0, 0, 300, 300);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to convert'));
            }
          },
          file.type,
          quality
        );
      };

      image.onerror = (err) => {
        reject(err);
      };
    });
  }

  function setFileInput(file: File) {
    const fileList = new DataTransfer();
    fileList.items.add(file);
    return fileList.files;
  }
}

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
