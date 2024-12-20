import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';
import { addDeleteEvent, addSearchEvent } from './utils';

interface IUser {
  id: number;
  username: string;
  email: string;
  activated: boolean;
  approval_permission: boolean;
  role: string;
  role_obj: IDivision;
  role_name: string;
  country: string;
  region: string;
  city: string;
  zip_code: string;
  street_address: string;
  phone_number: string;
  sales_rep: boolean;
  group_name: string;
  has_access_bulk_ship: boolean;
  has_access_bulk_assign: boolean;
}

interface IDivision {
  id: number;
  name: string;
}

// TODO: consider better solution
// enum for 3 main roles [Admin, Sales Rep, Warehouse Manager]
enum UserRole {
  Admin = '1',
  SalesRep = '2',
  WarehouseManager = '3',
}

const $modalElement: HTMLElement = document.querySelector('#editUserModal');
const $addUserModalElement: HTMLElement = document.querySelector('#add-user-modal');

const modalOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {
    document.querySelector('#user-edit-dropdown-btn').removeEventListener('click', showHideGroupUserOptions);
  },
  onShow: () => {},
  onToggle: () => {},
};

const modal: ModalInterface = new Modal($modalElement, modalOptions);
const addModal: ModalInterface = new Modal($addUserModalElement, modalOptions);

const $buttonElements = document.querySelectorAll('.user-edit-button');
$buttonElements.forEach((e) =>
  e.addEventListener('click', () => {
    editUser(JSON.parse(e.getAttribute('data-target')));
  })
);

// closing add edit modal
const $buttonClose = document.querySelector('#modalCloseButton');
if ($buttonClose) {
  $buttonClose.addEventListener('click', () => {
    modal.hide();
  });
}

const closingEditModalButton = document.querySelector('#edit-current-user-modal-close-btn');
closingEditModalButton.addEventListener('click', () => {
  modal.hide();
});

// closing add user modal
const addModalCloseBtn = document.querySelector('#modalAddCloseButton');
if (addModalCloseBtn) {
  addModalCloseBtn.addEventListener('click', () => {
    addModal.hide();
  });
}

// search flow
const searchInput: HTMLInputElement = document.querySelector('#table-search-users');
const searchInputButton = document.querySelector('#table-search-user-button');
addSearchEvent(searchInput, searchInputButton);

const deleteButtons = document.querySelectorAll('.delete-user-btn');

deleteButtons.forEach((e) => {
  addDeleteEvent(e, `/user/delete/${e.getAttribute('data-user-id')}`);
});

const resetPasswordButtons = document.querySelectorAll('.reset-password-user-btn');

resetPasswordButtons.forEach((e) => {
  e.addEventListener('click', async function () {
    if (confirm('Are sure?')) {
      let unique_id = e.getAttribute('data-user-unique-id');
      const response = await fetch(`/password_reset/${unique_id}`, {
        method: 'GET',
      });
      if (response.status == 200) {
        location.reload();
      }
    }
  });
});

function showHideGroupUserOptions() {
  document.querySelector('#user-edit-dropdown-options').classList.toggle('hidden');
}

// -----user edit modal window----
function editUser(user: IUser) {
  const lockerAddressContainer = document.querySelector('#user-edit-locker-address-container');
  const userRole: HTMLInputElement = document.querySelector('#user-edit-role');
  const salesRep: HTMLInputElement = document.querySelector('#user-edit-sales_rep');
  const salesRepContainer = document.querySelector('#user-edit-sales_rep-container');
  const userAddDropdownBtn = document.querySelector('#user-edit-dropdown-btn');
  const optionItems = document.querySelectorAll('.user-edit-dropdown-option');
  const options = document.querySelector('#user-edit-dropdown-options');
  const selectedOptions: string[] = [];

  if (user.group_name) {
    const groupNames = user.group_name.split(', ');
    selectedOptions.push(...groupNames);
  }

  // function to show locker address only for sales rep
  if (userRole.value !== UserRole.SalesRep) {
    lockerAddressContainer.classList.add('hidden');
    salesRepContainer.classList.add('hidden');
  } else {
    lockerAddressContainer.classList.remove('hidden');
    salesRepContainer.classList.remove('hidden');
  }

  userAddDropdownBtn.addEventListener('click', showHideGroupUserOptions);

  optionItems.forEach((optionItem: HTMLElement) => {
    optionItem.addEventListener('click', (event) => {
      const option: HTMLElement = event.target as HTMLElement;
      const value = option.textContent;
      let input: HTMLInputElement = document.getElementById('user-edit-group') as HTMLInputElement;

      window.addEventListener('mouseup', (event: MouseEvent) => {
        if (event.target !== options && !options.contains(event.target as Node)) {
          options.classList.add('hidden');
        }
      });

      if (selectedOptions.includes(value)) {
        const index = selectedOptions.indexOf(value);
        if (index > -1) {
          selectedOptions.splice(index, 1);
        }
        option.classList.remove('bg-blue-600');
      } else {
        selectedOptions.push(value);
        option.classList.add('bg-blue-600');
      }

      const joinedOptions = selectedOptions.join(', ');
      input.value = joinedOptions;
      userAddDropdownBtn.innerHTML = joinedOptions;
    });
  });

  userRole.addEventListener('change', () => {
    const role = userRole.value;

    if (role !== UserRole.SalesRep) {
      lockerAddressContainer.classList.add('hidden');
      salesRepContainer.classList.add('hidden');
    } else {
      lockerAddressContainer.classList.remove('hidden');
      salesRepContainer.classList.remove('hidden');
    }

    if (role === UserRole.Admin) {
      let input: HTMLInputElement = document.getElementById('user-edit-group') as HTMLInputElement;
      optionItems.forEach((item) => {
        const group = item.textContent.trim();
        if (!selectedOptions.includes(group)) {
          selectedOptions.push(group);
        }
      });
      const joinedValues = selectedOptions.join(', ');
      input.value = joinedValues;
      userAddDropdownBtn.innerHTML = joinedValues;
    }
  });

  salesRep.addEventListener('click', () => {
    lockerAddressContainer.classList.toggle('dropdown-close');
  });

  let input: HTMLInputElement = document.querySelector('#user-edit-username');
  input.value = user.username;
  input = document.querySelector('#user-edit-id');
  input.value = user.id.toString();
  input = document.querySelector('#user-edit-email');
  input.value = user.email;
  input = document.querySelector('#user-edit-group');
  input.value = user.group_name;
  input = document.querySelector('#user-edit-role');
  input.value = user.role;
  input = document.querySelector('#user-edit-password');
  input.value = '*******';
  input = document.querySelector('#user-edit-password_confirmation');
  input.value = '*******';
  input = document.querySelector('#user-edit-country');
  input.value = user.country;
  input = document.querySelector('#user-edit-region');
  input.value = user.region;
  input = document.querySelector('#user-edit-city');
  input.value = user.city;
  input = document.querySelector('#user-edit-zip_code');
  input.value = user.zip_code;
  input = document.querySelector('#user-edit-street_address');
  input.value = user.street_address;
  input = document.querySelector('#user-edit-phone_number');
  input.value = user.phone_number;
  let div: HTMLDivElement = document.querySelector('#user-edit-dropdown-btn');
  div.innerHTML = user.group_name;

  if (user.sales_rep) {
    lockerAddressContainer.classList.add('hidden');
  }

  input = document.querySelector('#user-edit-activated');
  input.checked = user.activated;
  input = document.querySelector('#user-edit-sales_rep');
  input.checked = user.sales_rep;
  input = document.querySelector('#user-edit-approval_permission');
  input.checked = user.approval_permission;

  input = document.querySelector('#edit-checkbox-access-bulk-ship');
  input.checked = user.has_access_bulk_ship;
  input = document.querySelector('#edit-checkbox-access-bulk-assign');
  input.checked = user.has_access_bulk_assign;

  input = document.querySelector('#user-edit-next_url');
  input.value = window.location.href;
  modal.show();
}

// ----view user modal window----
const viewUserButtonElements = document.querySelectorAll('.user-view-button');
viewUserButtonElements.forEach((e) =>
  e.addEventListener('click', () => {
    const user: IUser = JSON.parse(e.getAttribute('data-target'));
    const lockerAddressContainer = document.querySelector('#user-view-locker-address-container');

    if (user.role !== 'sales_rep') {
      lockerAddressContainer.classList.add('hidden');
    } else {
      lockerAddressContainer.classList.remove('hidden');
    }

    user.sales_rep;
    let div: HTMLDivElement = document.querySelector('#user-view-username');
    div.innerHTML = user.username;
    div = document.querySelector('#user-view-id');
    div.innerHTML = user.id.toString();
    div = document.querySelector('#user-view-email');
    div.innerHTML = user.email;
    div = document.querySelector('#user-view-role');
    div.innerHTML = user.role_name;
    div = document.querySelector('#user-view-status');

    user.activated ? (div.innerHTML = 'Active') : (div.innerHTML = 'Offline');

    div = document.querySelector('#user-view-country');
    div.innerHTML = user.country;
    div = document.querySelector('#user-view-region');
    div.innerHTML = user.region;
    div = document.querySelector('#user-view-city');
    div.innerHTML = user.city;
    div = document.querySelector('#user-view-zip_code');
    div.innerHTML = user.zip_code;
    div = document.querySelector('#user-view-street_address');
    div.innerHTML = user.street_address;
    div = document.querySelector('#user-view-phone_number');
    div.innerHTML = user.phone_number;
    div = document.querySelector('#user-view-group');
    div.innerHTML = user.group_name;
  })
);

//   ---add user modal window----
// function to show additional locker address only for sales rep
const salesRepAddUserCheckbox: HTMLInputElement = document.querySelector('#user-add-sales_rep-checkbox');
const salesRepAddUserContainer = document.querySelector('#user-add-sales_rep-container');
const salesAddRepContainer = document.querySelector('#user-add-locker-address-container');
const userRoleSelect: HTMLSelectElement = document.querySelector('#user-add-role');

function setRequiredLockerAddress() {
  document.querySelector('#user-add-locker-country').setAttribute('required', '');
  document.querySelector('#user-add-locker-region').setAttribute('required', '');
  document.querySelector('#user-add-locker-city').setAttribute('required', '');
  document.querySelector('#user-add-locker-zip_code').setAttribute('required', '');
  document.querySelector('#user-add-locker-street_address').setAttribute('required', '');
}

function removeRequiredLockerAddress() {
  document.querySelector('#user-add-locker-country').removeAttribute('required');
  document.querySelector('#user-add-locker-region').removeAttribute('required');
  document.querySelector('#user-add-locker-city').removeAttribute('required');
  document.querySelector('#user-add-locker-zip_code').removeAttribute('required');
  document.querySelector('#user-add-locker-street_address').removeAttribute('required');
}

salesRepAddUserCheckbox.addEventListener('change', () => {
  if (salesRepAddUserCheckbox.checked) {
    salesAddRepContainer.classList.add('hidden');
    removeRequiredLockerAddress();
  } else {
    salesAddRepContainer.classList.remove('hidden');
    setRequiredLockerAddress();
  }
});

userRoleSelect.addEventListener('change', () => {
  salesRepAddUserCheckbox.checked = false;
  const selectedRole = userRoleSelect.options[userRoleSelect.selectedIndex].value;

  const selectingGroupsContainer = document.querySelector('#user-add-dropdown-btn');
  const allGroups = document.querySelector('#user-add-dropdown-options');
  const listItems = allGroups.querySelectorAll('li');
  let selectedValues: string[] = [];

  listItems.forEach((item) => {
    selectedValues.push(item.textContent.trim());
  });

  const joinedValues = selectedValues.join(', ');

  if (selectedRole == UserRole.Admin) {
    selectingGroupsContainer.innerHTML = joinedValues;
    userAddDropdownBtn.removeEventListener('click', handleUserAddDropdownBtnClick);
  } else {
    userAddDropdownBtn.addEventListener('click', handleUserAddDropdownBtnClick);
  }

  if (selectedRole !== UserRole.SalesRep) {
    salesAddRepContainer.classList.add('hidden');
    salesRepAddUserContainer.classList.add('hidden');
    removeRequiredLockerAddress();
  } else {
    salesAddRepContainer.classList.remove('hidden');
    salesRepAddUserContainer.classList.remove('hidden');
    setRequiredLockerAddress();
  }
});

// function to select and add group in dropdown list
const userAddDropdownBtn = document.querySelector('#user-add-dropdown-btn');
const optionItems = document.querySelectorAll('.user-add-dropdown-option');
const selectedOptions: string[] = [];
const options = document.querySelector('#user-add-dropdown-options');

function handleUserAddDropdownBtnClick() {
  options.classList.toggle('hidden');
}

userAddDropdownBtn.addEventListener('click', handleUserAddDropdownBtnClick);

optionItems.forEach((optionItem: HTMLElement) => {
  optionItem.addEventListener('click', (event) => {
    const option: HTMLElement = event.target as HTMLElement;
    const value = option.textContent;
    let input: HTMLInputElement = document.getElementById('user-add-group') as HTMLInputElement;

    window.addEventListener('mouseup', (event: MouseEvent) => {
      if (event.target !== options && !options.contains(event.target as Node)) {
        options.classList.add('hidden');
      }
    });

    if (selectedOptions.includes(value)) {
      const index = selectedOptions.indexOf(value);
      if (index > -1) {
        selectedOptions.splice(index, 1);
      }
      option.classList.remove('bg-blue-600');
    } else {
      selectedOptions.push(value);
      option.classList.add('bg-blue-600');
    }

    const joinedOptions = selectedOptions.join(', ');
    input.value = joinedOptions;
    userAddDropdownBtn.innerHTML = joinedOptions;
  });
});
