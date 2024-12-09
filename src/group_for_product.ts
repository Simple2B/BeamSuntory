import { addDeleteEvent, addSearchEvent, initModal } from './utils';

interface IGroupProduct {
  id: number;
  name: string;
  master_group_id: number;
}

const $modalElement: HTMLElement = document.querySelector('#editGroupProductModal');
const $addGroupProductModalElement: HTMLElement = document.querySelector('#add-group-product-modal');

const modal = initModal($modalElement);
const addModal = initModal($addGroupProductModalElement);

const editGroupProductCloseModalButton: HTMLButtonElement = document.querySelector(
  '#edit-groop-product-modal-close-btn'
);
editGroupProductCloseModalButton.addEventListener('click', () => {
  modal.hide();
});

const $buttonElements = document.querySelectorAll('.group-product-edit-button');
$buttonElements.forEach((e) =>
  e.addEventListener('click', () => {
    editGroupProduct(JSON.parse(e.getAttribute('data-target')));
  })
);

// search flow
const searchInput: HTMLInputElement = document.querySelector('#table-search-groups-product');
const searchInputButton = document.querySelector('#table-search-group-product-button');
addSearchEvent(searchInput, searchInputButton);

const deleteButtons = document.querySelectorAll('.delete-group-product-btn');

deleteButtons.forEach((e) => {
  addDeleteEvent(e, `/group_product/delete/${e.getAttribute('data-group-product-id')}`);
});

function editGroupProduct(groupProduct: IGroupProduct) {
  let input: HTMLInputElement = document.querySelector('#group-product-edit-name');
  input.value = groupProduct.name;
  input = document.querySelector('#group-product-edit-id');
  input.value = groupProduct.id.toString();
  input = document.querySelector('#group-product-edit-master_group');
  input.value = groupProduct.master_group_id.toString();
  input = document.querySelector('#group-product-edit-next_url');
  input.value = window.location.href;
  modal.show();
}
