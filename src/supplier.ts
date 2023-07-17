import {Modal} from 'flowbite';
import type {ModalOptions, ModalInterface} from 'flowbite';

// /*
//  * $editSupplierModal: required
//  * options: optional
//  */

// // For your js code

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
const $addSupplierModalElement: HTMLElement = document.querySelector(
  '#add-supplier-modal',
);

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
    console.log('supplier id: ');
  },
  onToggle: () => {
    console.log('modal has been toggled');
  },
};

const modal: ModalInterface = new Modal($modalElement, modalOptions);
const addModal: ModalInterface = new Modal(
  $addSupplierModalElement,
  modalOptions,
);

const $buttonElements = document.querySelectorAll('.supplier-edit-button');
$buttonElements.forEach(e =>
  e.addEventListener('click', () => {
    editSupplier(JSON.parse(e.getAttribute('data-target')));
  }),
);

// search flow
const searchInput: HTMLInputElement = document.querySelector(
  '#table-search-suppliers',
);
const searchInputButton = document.querySelector(
  '#table-search-supplier-button',
);
if (searchInputButton && searchInput) {
  searchInputButton.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.set('q', searchInput.value);
    window.location.href = `${url.href}`;
  });
}
const deleteButtons = document.querySelectorAll('.delete-supplier-btn');

deleteButtons.forEach(e => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-supplier-id');
      const response = await fetch(`/supplier/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.status == 200) {
        location.reload();
      }
    }
  });
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
