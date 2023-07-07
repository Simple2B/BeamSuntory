import {Modal} from 'flowbite';
import type {ModalOptions, ModalInterface} from 'flowbite';

// /*
//  * $editMasterGroupProductModal: required
//  * options: optional
//  */

// // For your js code

interface IMasterGroup {
  id: number;
  name: string;
}

const $modalElement: HTMLElement = document.querySelector(
  '#editMasterGroupProductModal',
);
const $addMasterGroupModalElement: HTMLElement = document.querySelector(
  '#add-master-group-product-modal',
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
    console.log('master group-product id: ');
  },
  onToggle: () => {
    console.log('modal has been toggled');
  },
};

const modal: ModalInterface = new Modal($modalElement, modalOptions);
const addModal: ModalInterface = new Modal(
  $addMasterGroupModalElement,
  modalOptions,
);

const $buttonElements = document.querySelectorAll(
  '.master-group-product-edit-button',
);
$buttonElements.forEach(e =>
  e.addEventListener('click', () => {
    editMasterGroup(JSON.parse(e.getAttribute('data-target')));
  }),
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
const searchInput: HTMLInputElement = document.querySelector(
  '#table-search-master-groups-product',
);
const searchInputButton = document.querySelector(
  '#table-search-master-group-product-button',
);
if (searchInputButton && searchInput) {
  searchInputButton.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.set('q', searchInput.value);
    window.location.href = `${url.href}`;
  });
}
const deleteButtons = document.querySelectorAll(
  '.delete-master-group-product-btn',
);

deleteButtons.forEach(e => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-master-group-product-id');
      const response = await fetch(`/master_group_product/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.status == 200) {
        location.reload();
      }
    }
  });
});

function editMasterGroup(masterGroupProduct: IMasterGroup) {
  let input: HTMLInputElement = document.querySelector(
    '#master-group-product-edit-name',
  );
  input.value = masterGroupProduct.name;
  input = document.querySelector('#master-group-product-edit-id');
  input.value = masterGroupProduct.id.toString();
  input = document.querySelector('#master-group-product-edit-next_url');
  input.value = window.location.href;
  modal.show();
}
