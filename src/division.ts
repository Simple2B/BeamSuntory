import { addDeleteEvent, initModal } from './utils';

interface IDivision {
  role_name: string;
  id: number;
  type: string;
  parent_role: string;
  activated: boolean;
  label_role_name: string | null;
  possible_parent_roles: Array<string>;
}

const $modalElement: HTMLElement = document.querySelector('#editDivisionModal');

const modal = initModal($modalElement);

const editDivisionCloseModalButton: HTMLButtonElement = document.querySelector('#edit-division-modal-close-btn');
editDivisionCloseModalButton.addEventListener('click', () => {
  modal.hide();
});

const $buttonElements = document.querySelectorAll('.division-edit-button');
$buttonElements.forEach((e) =>
  e.addEventListener('click', () => {
    editDivision(JSON.parse(e.getAttribute('data-target')));
  })
);

// search flow
const searchInput: HTMLInputElement = document.querySelector('#table-search-divisions');
const searchInputButton = document.querySelector('#table-search-division-button');

if (searchInputButton && searchInput) {
  searchInputButton.addEventListener('click', () => {
    window.location.href = `${window.location.origin}${window.location.pathname}?q=${searchInput.value}`;
  });
}
const deleteButtons = document.querySelectorAll('.delete-division-btn');

deleteButtons.forEach((e) => {
  addDeleteEvent(e, `/division/delete/${e.getAttribute('data-division-id')}`);
});

// -----user edit modal window----
function editDivision(division: IDivision) {
  let input: HTMLInputElement = document.querySelector('#division-edit-role-name');
  input.value = division.label_role_name || '';
  input = document.querySelector('#division-edit-id');
  input.value = division.id.toString();

  input = document.querySelector('#division-edit-activated');
  input.checked = division.activated;

  modal.show();
}
