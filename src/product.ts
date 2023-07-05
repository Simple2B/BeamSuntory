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
  brand: number;
  category: string;
  language: number;
  // vendor: str # TODO do we need it
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
}

const $modalElement: HTMLElement = document.querySelector('#editProductModal');
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
  input = document.querySelector('#product-edit-brand');
  input.value = product.brand.toString();
  input = document.querySelector('#product-edit-category');
  switch (product.category) {
    case 'Barware':
      input.value = '1'
      break;
    case 'Drink':
      input.value = '2'
      break;
    case 'Other':
      input.value = '3'
      break;
    default:
      break;
  }
  input = document.querySelector('#product-edit-language');
  input.value = product.language.toString();
  // vendor: str # TODO do we need it
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
    let div: HTMLDivElement = document.querySelector('#product-view-name');
    div.innerHTML = product.name;
    div = document.querySelector('#product-view-id');
    div.innerHTML = product.id.toString();
    div = document.querySelector('#product-view-product_type');
    div.innerHTML = product.product_type;
    div = document.querySelector('#product-view-brand');
    div.innerHTML = product.brand.toString();
    div = document.querySelector('#product-view-category');
    div.innerHTML = product.category;
    div = document.querySelector('#product-view-language');
    div.innerHTML = product.language.toString();
    // vendor: str # TODO do we need it
    div = document.querySelector('#product-view-currency');
    div.innerHTML = product.currency;
    div = document.querySelector('#product-view-regular_price');
    div.innerHTML = product.regular_price.toString();
    div = document.querySelector('#product-view-retail_price');
    div.innerHTML = product.retail_price.toString();
    div = document.querySelector('#product-view-image');
    div.innerHTML = product.image;
    div = document.querySelector('#product-view-description');
    div.innerHTML = product.description;
    // General Info ->
    div = document.querySelector('#product-view-SKU');
    div.innerHTML = product.SKU;
    div = document.querySelector('#product-view-low_stock_level');
    div.innerHTML = product.low_stock_level.toString();
    div = document.querySelector('#product-view-shelf_life_start');
    div.innerHTML = convertDate(product.shelf_life_start.toString());
    div = document.querySelector('#product-view-shelf_life_end');
    div.innerHTML = convertDate(product.shelf_life_end.toString());
    div = document.querySelector('#product-view-program_year');
    div.innerHTML = product.program_year.toString();
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
    // shipping
    div = document.querySelector('#product-view-weight');
    div.innerHTML = product.weight.toString();
    div = document.querySelector('#product-view-length');
    div.innerHTML = product.length.toString();
    div = document.querySelector('#product-view-width');
    div.innerHTML = product.width.toString();
    div = document.querySelector('#product-view-height');
    div.innerHTML = product.height.toString();
    div = document.querySelector('#product-view-next_url');
    div.innerHTML = window.location.href;
  }),
);
