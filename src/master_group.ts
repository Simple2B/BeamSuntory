import {Modal} from 'flowbite';
import type {ModalOptions, ModalInterface} from 'flowbite';

// /*
//  * $editMasterGroupModal: required
//  * options: optional
//  */

// // For your js code

interface IMasterGroup {
  id: number;
  name: string;
}

const $modalElement: HTMLElement = document.querySelector(
  '#editMasterGroupModal',
);
const $addMasterGroupModalElement: HTMLElement = document.querySelector(
  '#add-master-group-modal',
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
    console.log('master group id: ');
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

const editMasterGroupCloseModalButton: HTMLButtonElement = document.querySelector('#edit-master-group-modal-close-btn');
editMasterGroupCloseModalButton.addEventListener('click', () => {
  modal.hide();
});

const $buttonElements = document.querySelectorAll('.master-group-edit-button');
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

// closing add group modal
const addModalCloseBtn = document.querySelector('#modalAddCloseButton');
if (addModalCloseBtn) {
  addModalCloseBtn.addEventListener('click', () => {
    addModal.hide();
  });
}

// search flow
const searchInput: HTMLInputElement = document.querySelector(
  '#table-search-master-groups',
);
const searchInputButton = document.querySelector(
  '#table-search-master-group-button',
);
if (searchInputButton && searchInput) {
  searchInputButton.addEventListener('click', () => {
    window.location.href = `${window.location.origin}${window.location.pathname}?q=${searchInput.value}`;
  });
}
const deleteButtons = document.querySelectorAll('.delete-master-group-btn');

deleteButtons.forEach(e => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-master-group-id');
      const response = await fetch(`/master_group/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.status == 200) {
        location.reload();
      }
    }
  });
});

function editMasterGroup(master_group: IMasterGroup) {
  let input: HTMLInputElement = document.querySelector(
    '#master-group-edit-name',
  );
  input.value = master_group.name;
  input = document.querySelector('#master-group-edit-id');
  input.value = master_group.id.toString();
  input = document.querySelector('#master-group-edit-next_url');
  input.value = window.location.href;
  modal.show();
}
