import {Modal} from 'flowbite';
import type {ModalOptions, ModalInterface} from 'flowbite';

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
    const mstrGroups = Object.keys(product.mstr_groups_groups);
    console.log('mstrGroups', mstrGroups);

    mstrGroups.forEach(e => {
      console.log('e', e.replace(/\s/g, '_'));
      deleteShipAssignButton(e.replace(/\s/g, '_'));
    });
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
  modalOptions,
);
const shipModal: ModalInterface = new Modal($shipModalElement, modalOptions);
const assignModal: ModalInterface = new Modal(
  $assignModalElement,
  modalOptions,
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
  sessionStorage.setItem('product', JSON.stringify(product));
  console.log('product', product);
  const mstrGroups = Object.keys(product.mstr_groups_groups);
  const mstrGroupsValues = Object.values(product.mstr_groups_groups);
  mstrGroups.forEach(groupName => {
    // console.log('mstr', groupName);
    // console.log('curUser', product.current_user_groups);
    // const isKey= product.current_user_groups.hasOwnProperty(groupName);
    // const isValue = product.current_user_groups
    function isEqualGrp() {
      for (groupName in product.current_user_groups) {
        if (product.mstr_groups_groups[groupName]) {
          if (
            product.mstr_groups_groups[groupName] ===
            product.current_user_groups[groupName]
          ) {
            return true;
          }
        }
      }
      return false;
    }

    const isEqual = isEqualGrp();
    addShipAssignShareButton(isEqual, 'edit', groupName);
  });

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
      const isEqualGroup =
        product.current_user_groups.hasOwnProperty(groupName);
      addShipAssignShareButton(isEqualGroup, 'view', groupName);
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
  // NOTE should we add previous value in this input?
  // let input: HTMLInputElement = document.querySelector('#product-request-share-batch-no-quantity');
  // input.value = product.name;
  div = document.querySelector('#product-request-share-total-available-items');
  div.innerHTML = '600';
  sessionStorage.removeItem('product');
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
  // NOTE should we add previous value in this input?
  // let input: HTMLInputElement = document.querySelector('#product-ship-batch-no-quantity');
  // input.value = product.name;
  div = document.querySelector('#product-ship-total-available-items');
  div.innerHTML = '600';
  // should we delete this object from session storage?
  sessionStorage.removeItem('product');
  shipModal.show();
}

// function to assign
function assign(product: IProduct) {
  let div: HTMLDivElement = document.querySelector('#product-assign-name');
  div.innerHTML = product.name;
  // let input: HTMLInputElement = document.querySelector('#product-assign-master-group');
  // input.value = product.mstr_groups_groups;
  // NOTE should we add previous value in this input?
  // let input: HTMLInputElement = document.querySelector('#product-assign-batch-no-quantity');
  // input.value = product.name;
  // should we delete this object from session storage?
  sessionStorage.removeItem('product');
  assignModal.show();
}

// function to delete ship assign share button
function deleteShipAssignButton(nameGroup: string) {
  const shipAssignShareContainer = document.querySelector(
    `#product-ship-assign-share-container-${nameGroup}`,
  );
  console.log(
    'shareQuery',
    `#product-ship-assign-share-container-${nameGroup}`,
  );
  console.log('deleteShipAssignButton', shipAssignShareContainer);
  if (shipAssignShareContainer) {
    shipAssignShareContainer.remove();
  }
}

// function to add ship, assign, button to view product modal
function addShipAssignShareButton(
  isEqual: boolean,
  modal: string,
  masterGroup: string,
) {
  console.log(
    'productTypeContainer',
    `#product-${modal}-product_group-container-${masterGroup}`,
  );

  const productTypeContainer = document.querySelector(
    `#product-${modal}-product_group-container-${masterGroup}`,
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

  console.log('productTypeContainer', productTypeContainer);

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
}
