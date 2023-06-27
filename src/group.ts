import {Modal} from 'flowbite';
import type {ModalOptions, ModalInterface} from 'flowbite';

// /*
//  * $editGroupModal: required
//  * options: optional
//  */

// // For your js code

interface IGroup {
  id: number;
  name: string;
  master_group_id: number;
}

const $modalElement: HTMLElement = document.querySelector('#editGroupModal');
const $addGroupModalElement: HTMLElement =
  document.querySelector('#add-group-modal');

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
    console.log('group id: ');
  },
  onToggle: () => {
    console.log('modal has been toggled');
  },
};

const modal: ModalInterface = new Modal($modalElement, modalOptions);
const addModal: ModalInterface = new Modal($addGroupModalElement, modalOptions);

const $buttonElements = document.querySelectorAll('.group-edit-button');
$buttonElements.forEach(e =>
  e.addEventListener('click', () => {
    editGroup(JSON.parse(e.getAttribute('data-target')));
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
  '#table-search-groups',
);
const searchInputButton = document.querySelector('#table-search-group-button');
if (searchInputButton && searchInput) {
  searchInputButton.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.set('q', searchInput.value);
    window.location.href = `${url.href}`;
  });
}
const deleteButtons = document.querySelectorAll('.delete-group-btn');

deleteButtons.forEach(e => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-group-id');
      const response = await fetch(`/group/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.status == 200) {
        location.reload();
      }
    }
  });
});

function editGroup(group: IGroup) {
  let input: HTMLInputElement = document.querySelector('#group-edit-name');
  input.value = group.name;
  input = document.querySelector('#group-edit-id');
  input.value = group.id.toString();
  input = document.querySelector('#group-edit-master_group');
  input.value = group.master_group_id.toString();
  input = document.querySelector('#group-edit-next_url');
  input.value = window.location.href;
  modal.show();
}
