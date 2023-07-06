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

const $modalElement: HTMLElement = document.querySelector('#editProductModal');
const $requestShareModalElement: HTMLElement = document.querySelector('#request-share-product-modal');
const $shipModalElement: HTMLElement = document.querySelector('#ship-product-modal');
const $assignModalElement: HTMLElement = document.querySelector('#assign-product-modal');
const $addProductModalElement: HTMLElement =
  document.querySelector('#add-product-modal');

const modalOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses:
    'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {
    console.log('modal is hidden');
  },
  onShow: () => {
    console.log('product id: ');
  },
  onToggle: () => {
    console.log('modal has been toggled');
  },
};

const modal: ModalInterface = new Modal($modalElement, modalOptions);
const addModal: ModalInterface = new Modal(
  $addProductModalElement,
  modalOptions,
);
const requestShareModal: ModalInterface = new Modal(
  $requestShareModalElement,
  modalOptions,
);
const shipModal: ModalInterface = new Modal(
  $shipModalElement,
  modalOptions,
);
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

// closing add edit modal
const $buttonClose = document.querySelector('#modalCloseButton');
if ($buttonClose) {
  $buttonClose.addEventListener('click', () => {
    modal.hide();
  });
}

// closing add product modal
const addModalCloseBtn = document.querySelector('#modalAddCloseButton');
if (addModalCloseBtn) {
  addModalCloseBtn.addEventListener('click', () => {
    addModal.hide();
  });
}

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
  let input: HTMLInputElement = document.querySelector('#product-edit-name');
  input.value = product.name;
  input = document.querySelector('#product-edit-id');
  input.value = product.id.toString();
  input = document.querySelector('#product-edit-product_type');
  input.value = product.product_type.toUpperCase().split(' ').join('_');
  // a loop that adds additional fields
  input = document.querySelector('#product-edit-supplier');
  input.value = product.supplier_id.toString();
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
  modal.show();
}

const viewProductButtonElements = document.querySelectorAll(
  '.product-view-button',
);
viewProductButtonElements.forEach(e =>
  e.addEventListener('click', () => {
    const product = JSON.parse(e.getAttribute('data-target'));
    sessionStorage.setItem('product', JSON.stringify(product));
    console.log(product);

    let div: HTMLDivElement = document.querySelector('#product-view-name');
    div.innerHTML = product.name;
    div = document.querySelector('#product-view-id');
    div.innerHTML = product.id.toString();
    div = document.querySelector('#product-edit-product_type');
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
  }),
);

// request share functionality
const requestShareButtons = document.querySelectorAll('.request-share-product-button');
requestShareButtons.forEach(e =>
  e.addEventListener('click', () => {
    const product = JSON.parse(sessionStorage.product);
    requestShare(product);
  }),
);

function requestShare(product: IProduct) {
  console.log("product from storage", product);

  let div: HTMLDivElement = document.querySelector('#product-request-share-name');
  div.innerHTML = product.name;
  div = document.querySelector('#product-request-share-sku');
  div.innerHTML = product.SKU;
  div = document.querySelector('#product-request-share-available-quantity');
  div.innerHTML = '600';
  div = document.querySelector('#product-request-share-owner');
  div.innerHTML = 'Mike';
  div = document.querySelector('#product-request-share-role');
  div.innerHTML = 'ADMIN';
  div = document.querySelector('#product-request-share-batch-no');
  div.innerHTML = 'BEAM-964-493';
  // NOTE should we add previous value in this input?
  // let input: HTMLInputElement = document.querySelector('#product-request-share-batch-no-quantity');
  // input.value = product.name;
  div = document.querySelector('#product-request-share-total-available-items');
  div.innerHTML = '600';
  sessionStorage.removeItem('product');
  requestShareModal.show();
}

// ship functionality
const shipButtons = document.querySelectorAll('.ship-product-button');
shipButtons.forEach(e =>
  e.addEventListener('click', () => {
    console.log("ship button clicked");
    const product = JSON.parse(sessionStorage.product);
    ship(product);
  }),
);

function ship(product: IProduct) {
  console.log("product from storage", product);

  let div: HTMLDivElement = document.querySelector('#product-ship-name');
  div.innerHTML = product.name;
  div = document.querySelector('#product-ship-sku');
  div.innerHTML = product.SKU;
  div = document.querySelector('#product-ship-available-quantity');
  div.innerHTML = '600';
  div = document.querySelector('#product-ship-batch-no');
  div.innerHTML = 'BEAM-964-493';
  // NOTE should we add previous value in this input?
  // let input: HTMLInputElement = document.querySelector('#product-ship-batch-no-quantity');
  // input.value = product.name;
  div = document.querySelector('#product-ship-total-available-items');
  div.innerHTML = '600';
  sessionStorage.removeItem('product');
  shipModal.show();
}

// assign functionality
const assignButtons = document.querySelectorAll('.assign-product-button');
assignButtons.forEach(e =>
  e.addEventListener('click', () => {
    console.log("assign button clicked");
    const product = JSON.parse(sessionStorage.product);
    assign(product);
  }),
);

function assign(product: IProduct) {
  console.log("product from storage", product);

  let div: HTMLDivElement = document.querySelector('#product-assign-name');
  div.innerHTML = product.name;
  // NOTE should we add previous value in this input?
  // let input: HTMLInputElement = document.querySelector('#product-assign-batch-no-quantity');
  // input.value = product.name;
  sessionStorage.removeItem('product');
  assignModal.show();
}
