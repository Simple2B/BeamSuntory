import { addDeleteEvent, initModal } from './utils';

interface IWarehouse {
  id: number;
  name: string;
  phone_number: string;
  city: string;
  zip: string;
  address: string;
  manager_id: number;
}

const $modalElement: HTMLElement = document.querySelector('#editWarehouseModal');
const $addWarehouseModalElement: HTMLElement = document.querySelector('#add-warehouse-modal');

const modal = initModal($modalElement);
const addModal = initModal($addWarehouseModalElement);

const $buttonElements = document.querySelectorAll('.warehouse-edit-button');
$buttonElements.forEach((e) =>
  e.addEventListener('click', () => {
    editWarehouse(JSON.parse(e.getAttribute('data-target')));
  })
);

const closingEditModalButton = document.getElementById('edit-warehouse-modal-close-btn');
closingEditModalButton.addEventListener('click', () => {
  modal.hide();
});

// closing add edit modal
const $buttonClose = document.querySelector('#modalCloseButton');
if ($buttonClose) {
  $buttonClose.addEventListener('click', () => {
    modal.hide();
  });
}

// closing add group modal
const addModalCloseBtn = document.querySelector('#modalAddCloseButton');
if (addModalCloseBtn) {
  addModalCloseBtn.addEventListener('click', () => {
    addModal.hide();
  });
}

// search flow
const searchInput: HTMLInputElement = document.querySelector('#table-search-warehouses');
const searchInputButton = document.querySelector('#table-search-warehouse-button');
if (searchInputButton && searchInput) {
  searchInputButton.addEventListener('click', () => {
    window.location.href = `${window.location.origin}${window.location.pathname}?q=${searchInput.value}`;
  });
}
const deleteButtons = document.querySelectorAll('.delete-warehouse-btn');

deleteButtons.forEach((e) => {
  addDeleteEvent(e, `/warehouse/delete/${e.getAttribute('data-warehouse-id')}`);
});

function editWarehouse(warehouse: IWarehouse) {
  console.log(warehouse);
  let input: HTMLInputElement = document.querySelector('#warehouse-edit-name');
  input.value = warehouse.name;
  input = document.querySelector('#warehouse-edit-id');
  input.value = warehouse.id.toString();
  input = document.querySelector('#warehouse-edit-next_url');
  input.value = window.location.href;
  input = document.querySelector('#warehouse-edit-phone_number');
  input.value = warehouse.phone_number;
  input = document.querySelector('#warehouse-edit-city');
  input.value = warehouse.city;
  input = document.querySelector('#warehouse-edit-zip');
  input.value = warehouse.zip;
  input = document.querySelector('#warehouse-edit-address');
  input.value = warehouse.address;
  console.log(document.querySelector('#warehouse-edit-manager_id'));
  input = document.querySelector('#warehouse-edit-manager_id');
  console.log(input, warehouse.manager_id.toString());
  input.value = warehouse.manager_id.toString();
  modal.show();
}
