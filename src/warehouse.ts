import {Modal} from 'flowbite';
import type {ModalOptions, ModalInterface} from 'flowbite';

// /*
//  * $editWarehouseModal: required
//  * options: optional
//  */

// // For your js code

interface IWarehouse {
  id: number;
  name: string;
  phone_number: string;
  city: string;
  zip: string;
  address: string;
  manager_id: number;
}

const $modalElement: HTMLElement = document.querySelector(
  '#editWarehouseModal',
);
const $addWarehouseModalElement: HTMLElement = document.querySelector(
  '#add-warehouse-modal',
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
    console.log('warehouse id: ');
  },
  onToggle: () => {
    console.log('modal has been toggled');
  },
};

const modal: ModalInterface = new Modal($modalElement, modalOptions);
const addModal: ModalInterface = new Modal(
  $addWarehouseModalElement,
  modalOptions,
);

const $buttonElements = document.querySelectorAll('.warehouse-edit-button');
$buttonElements.forEach(e =>
  e.addEventListener('click', () => {
    editWarehouse(JSON.parse(e.getAttribute('data-target')));
  }),
);

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
const searchInput: HTMLInputElement = document.querySelector(
  '#table-search-warehouses',
);
const searchInputButton = document.querySelector(
  '#table-search-warehouse-button',
);
if (searchInputButton && searchInput) {
  searchInputButton.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.set('q', searchInput.value);
    window.location.href = `${url.href}`;
  });
}
const deleteButtons = document.querySelectorAll('.delete-warehouse-btn');

deleteButtons.forEach(e => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-warehouse-id');
      const response = await fetch(`/warehouse/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.status == 200) {
        location.reload();
      }
    }
  });
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
