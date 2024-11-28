import { addDeleteEvent, initModal } from './utils';

interface IMasterGroup {
  id: number;
  name: string;
}

const $modalElement: HTMLElement = document.querySelector('#editMasterGroupModal');
const $addMasterGroupModalElement: HTMLElement = document.querySelector('#add-master-group-modal');

const modal = initModal($modalElement);
const addModal = initModal($addMasterGroupModalElement);

const editMasterGroupCloseModalButton: HTMLButtonElement = document.querySelector('#edit-master-group-modal-close-btn');
editMasterGroupCloseModalButton.addEventListener('click', () => {
  modal.hide();
});

const $buttonElements = document.querySelectorAll('.master-group-edit-button');
$buttonElements.forEach((e) =>
  e.addEventListener('click', () => {
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

// closing add group modal
const addModalCloseBtn = document.querySelector('#modalAddCloseButton');
if (addModalCloseBtn) {
  addModalCloseBtn.addEventListener('click', () => {
    addModal.hide();
  });
}

// search flow
const searchInput: HTMLInputElement = document.querySelector('#table-search-master-groups');
const searchInputButton = document.querySelector('#table-search-master-group-button');
if (searchInputButton && searchInput) {
  searchInputButton.addEventListener('click', () => {
    window.location.href = `${window.location.origin}${window.location.pathname}?q=${searchInput.value}`;
  });
}
const deleteButtons = document.querySelectorAll('.delete-master-group-btn');

deleteButtons.forEach((e) => {
  addDeleteEvent(e, `/master_group/delete/${e.getAttribute('data-master-group-id')}`);
});

function editMasterGroup(master_group: IMasterGroup) {
  let input: HTMLInputElement = document.querySelector('#master-group-edit-name');
  input.value = master_group.name;
  input = document.querySelector('#master-group-edit-id');
  input.value = master_group.id.toString();
  input = document.querySelector('#master-group-edit-next_url');
  input.value = window.location.href;
  modal.show();
}
