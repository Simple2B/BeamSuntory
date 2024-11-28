import { addDeleteEvent, initModal } from './utils';

interface IGroup {
  id: number;
  name: string;
  master_group_id: number;
  parent_group: IGroup;
}

const $modalElement: HTMLElement = document.querySelector('#edit-sub-group-modal');

const modal = initModal($modalElement);

const closingEditModalButton = document.getElementById('edit-stock-target-group-modal-close-btn');
closingEditModalButton.addEventListener('click', () => {
  modal.hide();
});

const $buttonElements = document.querySelectorAll('.group-edit-button');
$buttonElements.forEach((e) =>
  e.addEventListener('click', () => {
    editGroup(JSON.parse(e.getAttribute('data-target')));
  })
);

// search flow
const searchInput: HTMLInputElement = document.querySelector('#table-search-groups');
const searchInputButton = document.querySelector('#table-search-group-button');
if (searchInputButton && searchInput) {
  searchInputButton.addEventListener('click', () => {
    window.location.href = `${window.location.origin}${window.location.pathname}?q=${searchInput.value}`;
  });
}
const deleteButtons = document.querySelectorAll('.delete-group-btn');

deleteButtons.forEach((e) => {
  addDeleteEvent(e, `/sub_stock_target_group/delete/${e.getAttribute('data-group-id')}`);
});

function editGroup(group: IGroup) {
  let input: HTMLInputElement = document.querySelector('#sub-group-edit');
  input.value = group.id.toString();
  input = document.querySelector('#group-edit-id');
  input.value = group.id.toString();
  input = document.querySelector('#group-edit-master_group');
  input.value = group.parent_group.id.toString();
  input = document.querySelector('#group-edit-next_url');
  input.value = window.location.href;
  modal.show();
}
