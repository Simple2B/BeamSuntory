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

const closingEditModalButton = document.getElementById('edit-stock-target-group-modal-close-btn')
closingEditModalButton.addEventListener('click', () => {
  modal.hide();
})

const $buttonElements = document.querySelectorAll('.group-edit-button');
$buttonElements.forEach(e =>
  e.addEventListener('click', () => {
    editGroup(JSON.parse(e.getAttribute('data-target')));
  }),
);

// search flow
const searchInput: HTMLInputElement = document.querySelector(
  '#table-search-groups',
);
const searchInputButton = document.querySelector('#table-search-group-button');
if (searchInputButton && searchInput) {
  searchInputButton.addEventListener('click', () => {
    window.location.href = `${window.location.origin}${window.location.pathname}?q=${searchInput.value}`;
  });
}
const deleteButtons = document.querySelectorAll('.delete-group-btn');

deleteButtons.forEach(e => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-group-id');
      const response = await fetch(`/stock_target_group/delete/${id}`, {
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
