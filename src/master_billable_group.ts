import { addDeleteEvent, addSearchEvent, initModal } from './utils';

interface IMasterGroup {
  id: number;
  name: string;
}

const $modalElement: HTMLElement = document.querySelector('#editMasterBillableGroupModal');
const addMasterBillableGroupModalElement: HTMLElement = document.querySelector('#add-master-billable-group-modal');

const modal = initModal($modalElement);
const addModal = initModal(addMasterBillableGroupModalElement);

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
addSearchEvent(searchInput, searchInputButton);

const deleteButtons = document.querySelectorAll('.delete-master-billable-group-btn');

deleteButtons.forEach((e) => {
  addDeleteEvent(e, `/master_billable_group/delete/${e.getAttribute('data-master-billable-group-id')}`);
});

function editMasterGroup(masterGroupProduct: IMasterGroup) {
  let input: HTMLInputElement = document.querySelector('#master-billable-group-edit-name');
  input.value = masterGroupProduct.name;
  input = document.querySelector('#master-billable-group-edit-id');
  input.value = masterGroupProduct.id.toString();
  modal.show();
}
