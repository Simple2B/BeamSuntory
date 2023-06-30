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
  shelf_life: number;
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

function editProduct(product: IProduct) {
  let input: HTMLInputElement = document.querySelector('#product-edit-name');
  input.value = product.name;
  input = document.querySelector('#product-edit-id');
  input.value = product.id.toString();
  input = document.querySelector('#product-edit-product_type');
  input.value = product.product_type;
  input = document.querySelector('#product-edit-brand');
  input.value = product.brand.toString();
  input = document.querySelector('#product-edit-category');
  input.value = product.category.toString();
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
  input = document.querySelector('#product-edit-shelf_life');
  input.value = product.shelf_life.toString();
  input = document.querySelector('#product-edit-program_year');
  input.value = product.program_year.toString();
  input = document.querySelector('#product-edit-premises');
  input.value = product.premises;
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
