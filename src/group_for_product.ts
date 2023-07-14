import {Modal} from 'flowbite';
import type {ModalOptions, ModalInterface} from 'flowbite';

// /*
//  * $editGroupProductModal: required
//  * options: optional
//  */

// // For your js code

interface IGroupProduct {
  id: number;
  name: string;
  master_group_id: number;
}

const $modalElement: HTMLElement = document.querySelector(
  '#editGroupProductModal',
);
const $addGroupProductModalElement: HTMLElement = document.querySelector(
  '#add-group-product-modal',
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
    console.log('groupProduct id: ');
  },
  onToggle: () => {
    console.log('modal has been toggled');
  },
};

const modal: ModalInterface = new Modal($modalElement, modalOptions);
const addModal: ModalInterface = new Modal(
  $addGroupProductModalElement,
  modalOptions,
);

const $buttonElements = document.querySelectorAll('.group-product-edit-button');
$buttonElements.forEach(e =>
  e.addEventListener('click', () => {
    editGroupProduct(JSON.parse(e.getAttribute('data-target')));
  }),
);

// search flow
const searchInput: HTMLInputElement = document.querySelector(
  '#table-search-groups-product',
);
const searchInputButton = document.querySelector(
  '#table-search-group-product-button',
);
if (searchInputButton && searchInput) {
  searchInputButton.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.set('q', searchInput.value);
    window.location.href = `${url.href}`;
  });
}
const deleteButtons = document.querySelectorAll('.delete-group-product-btn');

deleteButtons.forEach(e => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-group-product-id');
      const response = await fetch(`/group_for_product/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.status == 200) {
        location.reload();
      }
    }
  });
});

function editGroupProduct(groupProduct: IGroupProduct) {
  let input: HTMLInputElement = document.querySelector(
    '#group-product-edit-name',
  );
  input.value = groupProduct.name;
  input = document.querySelector('#group-product-edit-id');
  input.value = groupProduct.id.toString();
  input = document.querySelector('#group-product-edit-master_group');
  input.value = groupProduct.master_group_id.toString();
  input = document.querySelector('#group-product-edit-next_url');
  input.value = window.location.href;
  modal.show();
}
