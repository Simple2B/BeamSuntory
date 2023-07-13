import {Modal} from 'flowbite';
import type {ModalOptions, ModalInterface} from 'flowbite';

// check if product has filter and display it
const filterJsonObject = sessionStorage.getItem('filterJsonData');
const filterData = JSON.parse(filterJsonObject);
if (filterData !== null || filterData !== undefined) {
  console.log("filterData", filterData);
  const referenceTh = document.querySelector('#product-table-th-product-type');
  const productItemTrs = document.querySelectorAll('.table-product-item-tr');

  for (const key in filterData) {
    const productFilterTh = document.createElement('th');
    productFilterTh.classList.add('px-6', 'py-3');
    productFilterTh.setAttribute('scope', 'col');
    productFilterTh.innerHTML = key;
    referenceTh.parentNode.insertBefore(
      productFilterTh,
      referenceTh.nextSibling,
    );
  }

  productItemTrs.forEach((product: HTMLTableRowElement) => {
    const referenceTd = product.cells[2];
    for (const key in filterData) {
      const productFilterName = filterData[key];
      const productFilterTd = document.createElement('td');
      productFilterTd.classList.add(
        'p-4',
        'text-base',
        'font-normal',
        'text-gray-900',
        'whitespace-nowrap',
        'dark:text-white',
      );
      productFilterTd.innerHTML = `
      <div class="pl-3">
        <div class="text-base font-semibold">${productFilterName}</div>
      </div>
    `;
      referenceTd.parentNode.insertBefore(
        productFilterTd,
        referenceTd.nextSibling,
      );
    }
  });
}

// function to show all groups in product
const showAllGroupsProductBtn = document.querySelector(
  '#table-show-all-group-product-button',
);
showAllGroupsProductBtn.addEventListener('click', () => {
  const products = JSON.parse(
    showAllGroupsProductBtn.getAttribute('data-target'),
  );
  console.log("products", products);
  const referenceTh = document.querySelector('#product-table-th-product-type');
  const productItemTrs = document.querySelectorAll('.table-product-item-tr');

  if (
    showAllGroupsProductBtn.classList.contains('show-all-groups-in-product')
  ) {
    showAllGroupsProductBtn.innerHTML = 'Hide all groups in products';
    for (const product in products) {
      for (const key in products[product]) {
        const productFilterTh = document.querySelector(
          `#product-table-filter-master-group-${key.replace(/ /g, '_')}`,
        );
        if (productFilterTh) {
          productFilterTh.remove();
        }
      }
      break;
    }

    productItemTrs.forEach((product: HTMLTableRowElement) => {
      const productName = product.cells[1].innerText;
      for (const key in products[productName]) {
        const productFilterName = products[productName][key];
        const productFilterTd = document.querySelector(
          `#product-table-filter-${productFilterName.replace(
            / /g,
            '_',
          )}-${productName.replace(/ /g, '_')}`,
        );
        if (productFilterTd) {
          productFilterTd.remove();
        }
      }
    });
    showAllGroupsProductBtn.classList.remove('show-all-groups-in-product');
    showAllGroupsProductBtn.innerHTML = `
      <svg
        class="w-5 h-5 text-white-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 576 512"
        stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-0 mr-1">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
        </svg>
      Show all groups in products
    `;
  } else {
    for (const product in products) {
      for (const key in products[product]) {
        const productFilterTh = document.createElement('th');
        productFilterTh.setAttribute(
          'id',
          `product-table-filter-master-group-${key.replace(/ /g, '_')}`,
        );
        productFilterTh.classList.add('px-6', 'py-3');
        productFilterTh.setAttribute('scope', 'col');
        productFilterTh.innerHTML = key;
        referenceTh.parentNode.insertBefore(
          productFilterTh,
          referenceTh.nextSibling,
        );
      }
      break;
    }

    productItemTrs.forEach((product: HTMLTableRowElement) => {
      const referenceTd = product.cells[2];
      const productName = product.cells[1].innerText;
      for (const key in products[productName]) {
        const productFilterName = products[productName][key];
        const productFilterTd = document.createElement('td');
        productFilterTd.setAttribute(
          'id',
          `product-table-filter-${productFilterName.replace(
            / /g,
            '_',
          )}-${productName.replace(/ /g, '_')}`,
        );
        productFilterTd.classList.add(
          'p-4',
          'text-base',
          'font-normal',
          'text-gray-900',
          'whitespace-nowrap',
          'dark:text-white',
        );
        productFilterTd.innerHTML = `
          <div class="pl-3">
            <div class="text-base font-semibold">${
              productFilterName || '-'
            }</div>
          </div>
        `;
        referenceTd.parentNode.insertBefore(
          productFilterTd,
          referenceTd.nextSibling,
        );
      }
    });
    showAllGroupsProductBtn.innerHTML = `
      <svg
        class="w-5 h-5 text-white-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 512"
        stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-0 mr-1">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z" />
        </svg>
      Hide all groups in products
    `;
    showAllGroupsProductBtn.classList.add('show-all-groups-in-product');
  }
});

// /*
//  * $editProductModal: required
//  * options: optional
//  */

// // For your js code

interface IProduct {
  id: number;
  name: string;
  product_type: string;
  supplier_id: number;
  currency: string;
  regular_price: number;
  retail_price: number;
  image: string;
  description: string;
  // General Info ->
  SKU: string;
  low_stock_level: number;
  shelf_life_start: number;
  shelf_life_end: number;
  program_year: number;
  premises: string;
  package_qty: number;
  numb_of_items_per_case: number;
  numb_of_cases_per_outer_case: number;
  comments: string;
  // shipping
  weight: number;
  length: number;
  width: number;
  height: number;
  mstr_groups_groups: object;
  current_user_groups: object;
  groups_ids: object;
}

const $requestShareModalElement: HTMLElement = document.querySelector(
  '#request-share-product-modal',
);
const $shipModalElement: HTMLElement = document.querySelector(
  '#ship-product-modal',
);
const $assignModalElement: HTMLElement = document.querySelector(
  '#assign-product-modal',
);
const $addProductModalElement: HTMLElement =
  document.querySelector('#add-product-modal');
const $viewProductModalElement: HTMLElement = document.querySelector(
  '#view-product-modal',
);
const $editProductModalElement: HTMLElement =
  document.querySelector('#editProductModal');

const modalOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses:
    'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {
    const product = JSON.parse(sessionStorage.product);
    const mstrGroupsEntries = Object.entries(product.mstr_groups_groups);

    mstrGroupsEntries.forEach(([key, value]: [string, string]) => {
      deleteShipAssignButton(key.replace(/\s/g, '_'), value);
    });
  },
  onShow: () => {},
  onToggle: () => {
    console.log('modal has been toggled');
  },
};

const modalShipAssignOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses:
    'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {
    sessionStorage.removeItem('product');
  },
  onShow: () => {},
  onToggle: () => {
    console.log('modal has been toggled');
  },
};

const addModal: ModalInterface = new Modal(
  $addProductModalElement,
  modalOptions,
);
const viewModal: ModalInterface = new Modal(
  $viewProductModalElement,
  modalOptions,
);
const editModal: ModalInterface = new Modal(
  $editProductModalElement,
  modalOptions,
);
const requestShareModal: ModalInterface = new Modal(
  $requestShareModalElement,
  modalShipAssignOptions,
);
const shipModal: ModalInterface = new Modal(
  $shipModalElement,
  modalShipAssignOptions,
);
const assignModal: ModalInterface = new Modal(
  $assignModalElement,
  modalShipAssignOptions,
);

const $buttonElements = document.querySelectorAll('.product-edit-button');
$buttonElements.forEach(e =>
  e.addEventListener('click', () => {
    editProduct(JSON.parse(e.getAttribute('data-target')));
  }),
);

// search flow
const searchInput: HTMLInputElement = document.querySelector(
  '#table-search-products',
);
const searchInputButton = document.querySelector(
  '#table-search-product-button',
);
if (searchInputButton && searchInput) {
  searchInputButton.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.set('q', searchInput.value);
    window.location.href = `${url.href}`;
  });
}
const deleteButtons = document.querySelectorAll('.delete-product-btn');

deleteButtons.forEach(e => {
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

function convertDate(date: string) {
  const inputDate = date.split('T')[0];
  const dateParts = inputDate.split('-');
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];
  return `${month}/${day}/${year}`;
}

function editProduct(product: IProduct) {
  console.log('product in edit modal', product);
  let input: HTMLInputElement = document.querySelector('#product-edit-name');
  input.value = product.name;
  input = document.querySelector('#product-edit-id');
  input.value = product.id.toString();
  input = document.querySelector('#product-edit-product_type');
  input.value = product.product_type.toUpperCase().split(' ').join('_');
  // a loop that adds additional fields
  // input = document.querySelector('#product-edit-supplier');
  // input.value = product.supplier_id.toString();
  input = document.querySelector('#product-edit-currency');
  input.value = product.currency;
  input = document.querySelector('#product-edit-regular_price');
  input.value = product.regular_price.toString();
  input = document.querySelector('#product-edit-retail_price');
  input.value = product.retail_price.toString();
  input = document.querySelector('#product-edit-image');
  input.value = product.image;
  input = document.querySelector('#product-edit-description');
  input.value = product.description;
  // General Info ->
  input = document.querySelector('#product-edit-SKU');
  input.value = product.SKU;
  input = document.querySelector('#product-edit-low_stock_level');
  input.value = product.low_stock_level.toString();
  input = document.querySelector('#product-edit-shelf_life_start');
  input.value = convertDate(product.shelf_life_start.toString());
  input = document.querySelector('#product-edit-shelf_life_end');
  input.value = convertDate(product.shelf_life_end.toString());
  input = document.querySelector('#product-edit-program_year');
  input.value = product.program_year.toString();
  input = document.querySelector('#product-edit-premises');
  input.value = product.premises.toUpperCase().split(' ').join('_');
  input = document.querySelector('#product-edit-package_qty');
  input.value = product.package_qty.toString();
  input = document.querySelector('#product-edit-numb_of_items_per_case');
  input.value = product.numb_of_items_per_case.toString();
  input = document.querySelector('#product-edit-numb_of_cases_per_outer_case');
  input.value = product.numb_of_cases_per_outer_case.toString();
  input = document.querySelector('#product-edit-comments');
  input.value = product.comments;
  // shipping
  input = document.querySelector('#product-edit-weight');
  input.value = product.weight.toString();
  input = document.querySelector('#product-edit-length');
  input.value = product.length.toString();
  input = document.querySelector('#product-edit-width');
  input.value = product.width.toString();
  input = document.querySelector('#product-edit-height');
  input.value = product.height.toString();
  input = document.querySelector('#product-edit-next_url');
  input.value = window.location.href;
  editModal.show();
}

const viewProductButtonElements = document.querySelectorAll(
  '.product-view-button',
);
viewProductButtonElements.forEach(e =>
  e.addEventListener('click', () => {
    const product = JSON.parse(e.getAttribute('data-target'));
    sessionStorage.setItem('product', JSON.stringify(product));
    const mstrGroups = Object.keys(product.mstr_groups_groups);

    mstrGroups.forEach(groupName => {
      let isEqual = false;
      if (product.current_user_groups.hasOwnProperty(groupName)) {
        const currentUserValue = product.current_user_groups[groupName];
        const mstrGroupsValue = product.mstr_groups_groups[groupName];
        if (currentUserValue.includes(mstrGroupsValue)) {
          isEqual = true;
        }
      }
      addShipAssignShareButton(
        isEqual,
        groupName,
        product.mstr_groups_groups[groupName],
        product,
      );
    });

    let div: HTMLDivElement = document.querySelector('#product-view-name');
    div.innerHTML = product.name;
    div = document.querySelector('#product-view-id');
    div.innerHTML = product.id.toString();
    div = document.querySelector('#product-view-product_type');
    div.innerHTML = product.product_type.toUpperCase().split(' ').join('_');
    div = document.querySelector('#product-view-regular_price');
    div.innerHTML = product.regular_price.toString();
    div = document.querySelector('#product-view-retail_price');
    div.innerHTML = product.retail_price.toString();
    // General Info ->
    div = document.querySelector('#product-view-SKU');
    div.innerHTML = product.SKU;
    div = document.querySelector('#product-view-shelf_life_start');
    div.innerHTML = convertDate(product.shelf_life_start.toString());
    div = document.querySelector('#product-view-shelf_life_end');
    div.innerHTML = convertDate(product.shelf_life_end.toString());
    div = document.querySelector('#product-view-premises');
    div.innerHTML = product.premises;
    div = document.querySelector('#product-view-package_qty');
    div.innerHTML = product.package_qty.toString();
    div = document.querySelector('#product-view-numb_of_items_per_case');
    div.innerHTML = product.numb_of_items_per_case.toString();
    div = document.querySelector('#product-view-numb_of_cases_per_outer_case');
    div.innerHTML = product.numb_of_cases_per_outer_case.toString();
    div = document.querySelector('#product-view-comments');
    div.innerHTML = product.comments;
    div = document.querySelector('#product-view-next_url');
    div.innerHTML = window.location.href;
    viewModal.show();
  }),
);

// function to request share
function requestShare(product: IProduct) {
  let div: HTMLDivElement = document.querySelector(
    '#product-request-share-name',
  );
  div.innerHTML = product.name;
  div = document.querySelector('#product-request-share-sku');
  div.innerHTML = product.SKU;
  div = document.querySelector('#product-request-share-available-quantity');
  div.innerHTML = '600';
  div = document.querySelector('#product-request-share-owner');
  div.innerHTML = 'Mike';
  div = document.querySelector('#product-request-share-role');
  div.innerHTML = 'ADMIN';
  div = document.querySelector('#product-request-share-total-available-items');
  div.innerHTML = '600';
  requestShareModal.show();
}

// function to ship
function ship(product: IProduct) {
  let div: HTMLDivElement = document.querySelector('#product-ship-name');
  div.innerHTML = product.name;
  div = document.querySelector('#product-ship-sku');
  div.innerHTML = product.SKU;
  div = document.querySelector('#product-ship-available-quantity');
  div.innerHTML = '600';
  div = document.querySelector('#product-ship-total-available-items');
  div.innerHTML = '600';
  shipModal.show();
}

// function to assign
function assign(product: IProduct) {
  let div: HTMLDivElement = document.querySelector('#product-assign-name');
  div.innerHTML = product.name;
  // NOTE It will be need when we create master group in assign modal
  // let input: HTMLInputElement = document.querySelector('#product-assign-master-group');
  // input.value = product.mstr_groups_groups;
  assignModal.show();
}

// function to delete ship assign share button
function deleteShipAssignButton(nameGroup: string, nameGroupValue: string) {
  const shipAssignShareContainer = document.querySelector(
    `#product-ship-assign-share-container-${nameGroup}`,
  );
  const groupContainer = document.querySelector(
    `#product-view-product_group-container-${nameGroupValue}`,
  );
  if (shipAssignShareContainer) {
    shipAssignShareContainer.remove();
  }
  if (groupContainer) {
    groupContainer.remove();
  }
}

// function to add ship, assign, button to view product modal
function addShipAssignShareButton(
  isEqual: boolean,
  masterGroup: string,
  group: string,
  productParam: IProduct,
) {
  const groupProductIds = productParam.groups_ids as {[index: string]: string};
  const productTypeContainer = document.querySelector(
    `#product-view-product_type-container`,
  );
  const shipAssignContainer = document.createElement('div');
  shipAssignContainer.classList.add('sm:col-span-3');
  shipAssignContainer.setAttribute(
    'id',
    `product-ship-assign-share-container-${masterGroup}`,
  );
  shipAssignContainer.innerHTML = `
    <label for="product_group" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Action</label >
    <button type="button"  class="ship-product-button inline-flex items-center mr-2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
      <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
      Ship
    </button>
    <button type="button" class="assign-product-button inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
      Assign
    </button>
  `;

  const shareContainer = document.createElement('div');
  shareContainer.classList.add('sm:col-span-3');
  shareContainer.setAttribute(
    'id',
    `product-ship-assign-share-container-${masterGroup}`,
  );
  shareContainer.innerHTML = `
    <label for="product_group" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Action</label >
    <button type="button" class="request-share-product-button inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-yellow-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
      Request Share
    </button>
  `;

  if (isEqual) {
    productTypeContainer.parentNode.insertBefore(
      shipAssignContainer,
      productTypeContainer.nextSibling,
    );
  } else {
    productTypeContainer.parentNode.insertBefore(
      shareContainer,
      productTypeContainer.nextSibling,
    );
  }

  const shipButtons = document.querySelectorAll('.ship-product-button');
  shipButtons.forEach(e =>
    e.addEventListener('click', () => {
      viewModal.hide();
      editModal.hide();
      const product = JSON.parse(sessionStorage.product);
      ship(product);
    }),
  );

  const assignButtons = document.querySelectorAll('.assign-product-button');
  assignButtons.forEach(e =>
    e.addEventListener('click', () => {
      viewModal.hide();
      editModal.hide();
      const product = JSON.parse(sessionStorage.product);
      assign(product);
    }),
  );

  const requestShareButtons = document.querySelectorAll(
    '.request-share-product-button',
  );
  requestShareButtons.forEach(e =>
    e.addEventListener('click', () => {
      viewModal.hide();
      editModal.hide();
      const product = JSON.parse(sessionStorage.product);
      requestShare(product);
    }),
  );
  const productViewTypeContainer = document.querySelector(
    '#product-view-product_type-container',
  );
  const productMasterGroupContainer = document.createElement('div');
  productMasterGroupContainer.classList.add('sm:col-span-3');
  productMasterGroupContainer.setAttribute(
    'id',
    `product-view-product_group-container-${group}`,
  );

  productMasterGroupContainer.innerHTML = `
    <label for="for-group-${group}"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${group}</label>
    <select type="text" name="group-${group}" id="product-view-${group}"
      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Some Group" required
    >
      <option value="${groupProductIds[group]}">${group}</option>
    </select>
    `;
  productViewTypeContainer.parentNode.insertBefore(
    productMasterGroupContainer,
    productViewTypeContainer.nextSibling,
  );
}

// function to filter products by group
interface FilterJsonData {
  [key: string]: string;
}

const productFilterInputs = document.querySelectorAll('.product-filter-input');
const filterProductButton = document.querySelector('#product-filter-button');
let filterJsonData: FilterJsonData = {};
const filterRadioButtons = document.querySelectorAll(
  '.product-filter-radio-button',
);

filterRadioButtons.forEach(btn => {
  const filterButtonId = btn.getAttribute('id');
  const filterJsonDataStorage = sessionStorage.getItem('filterJsonData');
  const filterJsonDataObject = JSON.parse(filterJsonDataStorage);

  for (const key in filterJsonDataObject) {
    if (filterButtonId.includes(key)) {
      btn.innerHTML = `
        ${filterJsonDataObject[key]}
        <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m1 1 4 4 4-4" />
        </svg>`;
    }
  }
});

productFilterInputs.forEach(input => {
  input.addEventListener('change', () => {
    const filterInputDataTarget = input.getAttribute('data-target');
    const filterInputId = filterInputDataTarget
      .split(',')[0]
      .replace(/[^a-zA-Z0-9\s\_]/g, '');
    const filterInputIdString = `#product-filter-input-${filterInputId}`;
    const filterButtonId = filterInputDataTarget
      .split(',')[1]
      .trim()
      .replace(/[^a-zA-Z0-9\s\_]/g, '');
    const filterInput = document.querySelector(
      filterInputIdString,
    ) as HTMLInputElement;
    const filterRadioBtn = document.querySelector(
      `#dropdownRadioButton-${filterButtonId}`,
    );
    if (filterInputIdString.includes(filterButtonId)) {
      filterRadioBtn.innerHTML = `
        ${filterButtonId.split('_').join(' ')}
        <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m1 1 4 4 4-4" />
        </svg>
      `;
      getSessionStorageObject(
        filterJsonData,
        'filterJsonData',
        'remove',
        filterButtonId,
      );
      return;
    }
    filterRadioBtn.innerHTML = `
      ${filterInput.value.split('_').join(' ')}
      <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="m1 1 4 4 4-4" />
      </svg>
      `;
    filterJsonData[filterButtonId] = filterInput.value;
    getSessionStorageObject(filterJsonData, 'filterJsonData', 'add');
  });
});

filterProductButton.addEventListener('click', e => {
  const hiddenInput = document.querySelector('#sort_by') as HTMLInputElement;
  const filterJsonDataStorage = sessionStorage.getItem('filterJsonData');
  const filterDataObject = JSON.parse(filterJsonDataStorage);
  filterJsonData = filterDataObject;
  hiddenInput.value = JSON.stringify(filterJsonData);
  sessionStorage.setItem('filterJsonData', JSON.stringify(filterJsonData));
});

function getSessionStorageObject(
  localObject: FilterJsonData,
  sessionObject: string,
  method = 'none',
  objectKey = 'none',
) {
  const jsonDataObject = sessionStorage.getItem(sessionObject);
  const dataObject = JSON.parse(jsonDataObject);
  switch (method) {
    case 'add':
      const newDataObject = {...dataObject, ...localObject};
      const newJsonData = JSON.stringify(newDataObject);
      sessionStorage.setItem(sessionObject, newJsonData);
      break;
    case 'remove':
      delete dataObject[objectKey];
      const newJsonDataObject = JSON.stringify(dataObject);
      sessionStorage.setItem(sessionObject, newJsonDataObject);
      break;
    default:
      break;
  }
}
