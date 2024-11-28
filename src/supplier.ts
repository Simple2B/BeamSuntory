import { addDeleteEvent, addSearchEvent, initModal } from './utils';

interface ISupplier {
  id: number;
  name: string;
  email: string;
  contact_number: string;
  country: string;
  region: string;
  city: string;
  address: string;
  zip: string;
  active: boolean;
}

const $modalElement: HTMLElement = document.querySelector('#editSupplierModal');
const $addSupplierModalElement: HTMLElement = document.querySelector('#add-supplier-modal');

const modal = initModal($modalElement);
const addModal = initModal($addSupplierModalElement);

const closingEditModalButton = document.getElementById('edit-suppler-modal-close-btn');
closingEditModalButton.addEventListener('click', () => {
  modal.hide();
});

const $buttonElements = document.querySelectorAll('.supplier-edit-button');
$buttonElements.forEach((e) =>
  e.addEventListener('click', () => {
    editSupplier(JSON.parse(e.getAttribute('data-target')));
  })
);

// search flow
const searchInput: HTMLInputElement = document.querySelector('#table-search-suppliers');
const searchInputButton = document.querySelector('#table-search-supplier-button');
addSearchEvent(searchInput, searchInputButton);

const deleteButtons = document.querySelectorAll('.delete-supplier-btn');

deleteButtons.forEach((e) => {
  addDeleteEvent(e, `/supplier/delete/${e.getAttribute('data-supplier-id')}`);
});

function editSupplier(supplier: ISupplier) {
  let input: HTMLInputElement = document.querySelector('#supplier-edit-name');
  input.value = supplier.name;
  input = document.querySelector('#supplier-edit-id');
  input.value = supplier.id.toString();
  input = document.querySelector('#supplier-edit-email');
  input.value = supplier.email;
  input = document.querySelector('#supplier-edit-contact_number');
  input.value = supplier.contact_number;
  input = document.querySelector('#supplier-edit-country');
  input.value = supplier.country;
  input = document.querySelector('#supplier-edit-region');
  input.value = supplier.region;
  input = document.querySelector('#supplier-edit-city');
  input.value = supplier.city;
  input = document.querySelector('#supplier-edit-address');
  input.value = supplier.address;
  input = document.querySelector('#supplier-edit-zip');
  input.value = supplier.zip;
  input = document.querySelector('#supplier-edit-active');
  input.checked = supplier.active;
  input = document.querySelector('#supplier-edit-next_url');
  input.value = window.location.href;
  modal.show();
}
