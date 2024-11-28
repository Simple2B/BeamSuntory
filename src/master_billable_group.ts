import { Modal } from 'flowbite';
import type { ModalInterface } from 'flowbite';
import { modalOptions } from './utils';

interface IMasterGroup {
  id: number;
  name: string;
}

const $modalElement: HTMLElement = document.querySelector('#editMasterBillableGroupModal');
const addMasterBillableGroupModalElement: HTMLElement = document.querySelector('#add-master-billable-group-modal');

const modal: ModalInterface = new Modal($modalElement, modalOptions);
const addModal: ModalInterface = new Modal(addMasterBillableGroupModalElement, modalOptions);

const editMasterBillableGroupCloseModalButton: HTMLButtonElement = document.querySelector(
  '#edit-master-billable-group-modal-close-btn'
);
editMasterBillableGroupCloseModalButton.addEventListener('click', () => {
  modal.hide();
});

const $buttonElements = document.querySelectorAll('.master-billable-group-edit-button');
$buttonElements.forEach((e) =>
  e.addEventListener('click', () => {
    modal.show();
    console.log('edit button clicked');
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
const searchInput: HTMLInputElement = document.querySelector('#table-search-master-billable-groups');
const searchInputButton = document.querySelector('#table-search-master-billable-group-button');
if (searchInputButton && searchInput) {
  searchInputButton.addEventListener('click', () => {
    window.location.href = `${window.location.origin}${window.location.pathname}?q=${searchInput.value}`;
  });
}
const deleteButtons = document.querySelectorAll('.delete-master-billable-group-btn');

deleteButtons.forEach((e) => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-master-billable-group-id');
      const response = await fetch(`/master_billable_group/delete/${id}`, {
        method: 'DELETE',
      });
      if ([200, 202, 404].includes(response.status)) {
        location.reload();
      }
    }
  });
});

function editMasterGroup(masterGroupProduct: IMasterGroup) {
  let input: HTMLInputElement = document.querySelector('#master-billable-group-edit-name');
  input.value = masterGroupProduct.name;
  input = document.querySelector('#master-billable-group-edit-id');
  input.value = masterGroupProduct.id.toString();
  modal.show();
}
