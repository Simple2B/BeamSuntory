import { addDeleteEvent, initModal } from './utils';

interface IMasterGroup {
  id: number;
  name: string;
}

const $modalElement: HTMLElement = document.querySelector('#editMasterGroupProductModal');
const $addMasterGroupModalElement: HTMLElement = document.querySelector('#add-master-group-product-modal');

const modal = initModal($modalElement);
const addModal = initModal($addMasterGroupModalElement);

const editMasterGroupCloseModalButton: HTMLButtonElement = document.querySelector(
  '#edit-product-master-group-modal-close-btn'
);
editMasterGroupCloseModalButton.addEventListener('click', () => {
  modal.hide();
});

const $buttonElements = document.querySelectorAll('.master-group-product-edit-button');
$buttonElements.forEach((e) =>
  e.addEventListener('click', () => {
    editMasterGroup(JSON.parse(e.getAttribute('data-target')));
  })
);

// closing add edit modal
const $buttonClose = document.querySelector('#modalCloseButton');
if ($buttonClose) {
  $buttonClose.addEventListener('click', () => {
    modal.hide();
  });
}

// closing add group-product modal
const addModalCloseBtn = document.querySelector('#modalAddCloseButton');
if (addModalCloseBtn) {
  addModalCloseBtn.addEventListener('click', () => {
    addModal.hide();
  });
}

// search flow
const searchInput: HTMLInputElement = document.querySelector('#table-search-master-groups-product');
const searchInputButton = document.querySelector('#table-search-master-group-product-button');
if (searchInputButton && searchInput) {
  searchInputButton.addEventListener('click', () => {
    window.location.href = `${window.location.origin}${window.location.pathname}?q=${searchInput.value}`;
  });
}
const deleteButtons = document.querySelectorAll('.delete-master-group-product-btn');

deleteButtons.forEach((e) => {
  addDeleteEvent(e, `/master_group_for_product/delete/${e.getAttribute('data-master-group-product-id')}`);
});

function editMasterGroup(masterGroupProduct: IMasterGroup) {
  let input: HTMLInputElement = document.querySelector('#master-group-product-edit-name');
  input.value = masterGroupProduct.name;
  input = document.querySelector('#master-group-product-edit-id');
  input.value = masterGroupProduct.id.toString();
  input = document.querySelector('#master-group-product-edit-next_url');
  input.value = window.location.href;
  modal.show();
}
