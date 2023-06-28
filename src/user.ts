import {Modal} from 'flowbite';
import type {ModalOptions, ModalInterface} from 'flowbite';

// /*
//  * $editUserModal: required
//  * options: optional
//  */

// // For your js code

interface IUser {
  id: number;
  username: string;
  email: string;
  activated: boolean;
  approval_permission: boolean;
  role: string;
  country: string;
  region: string;
  city: string;
  zip_code: string;
  street_address: string;
  sales_rep: boolean;
  locker_address: string;
  office_address: string;
  group: string;
}

const $modalElement: HTMLElement = document.querySelector('#editUserModal');
const $addUserModalElement: HTMLElement =
  document.querySelector('#add-user-modal');
const $viewUserModalElement: HTMLElement =
  document.querySelector('#viewUserModal');

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
    console.log('user id: ');
  },
  onToggle: () => {
    console.log('modal has been toggled');
  },
};

const modal: ModalInterface = new Modal($modalElement, modalOptions);
const addModal: ModalInterface = new Modal($addUserModalElement, modalOptions);

const $buttonElements = document.querySelectorAll('.user-edit-button');
$buttonElements.forEach(e =>
  e.addEventListener('click', () => {
    editUser(JSON.parse(e.getAttribute('data-target')));
  }),
);

// closing add edit modal
const $buttonClose = document.querySelector('#modalCloseButton');
if ($buttonClose) {
  $buttonClose.addEventListener('click', () => {
    modal.hide();
  });
}

// closing add user modal
const addModalCloseBtn = document.querySelector('#modalAddCloseButton');
if (addModalCloseBtn) {
  addModalCloseBtn.addEventListener('click', () => {
    addModal.hide();
  });
}

// search flow
const searchInput: HTMLInputElement = document.querySelector(
  '#table-search-users',
);
const searchInputButton = document.querySelector('#table-search-user-button');
if (searchInputButton && searchInput) {
  searchInputButton.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.set('q', searchInput.value);
    window.location.href = `${url.href}`;
  });
}
const deleteButtons = document.querySelectorAll('.delete-user-btn');

deleteButtons.forEach(e => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-user-id');
      const response = await fetch(`/user/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.status == 200) {
        location.reload();
      }
    }
  });
});

const resetPasswordButtons = document.querySelectorAll(
  '.reset-password-user-btn',
);

resetPasswordButtons.forEach(e => {
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

function editUser(user: IUser) {
  const lockerAddressContainer = document.querySelector('#user-edit-locker-address-container');
  const officeAddressContainer = document.querySelector('#user-edit-office-address-container');
  const sales_rep = document.querySelector('#user-edit-sales_rep');

  sales_rep.addEventListener('click', () => {
    console.log("click");
    lockerAddressContainer.classList.toggle('invisible')
    officeAddressContainer.classList.toggle('invisible')
  })

  const userAddDropdownBtn = document.querySelector('#user-edit-dropdown-btn');
const options = document.querySelector('#user-edit-dropdown-options');
const optionItems = document.querySelectorAll('.user-edit-dropdown-option');
const selectedOptions = [];


userAddDropdownBtn.addEventListener('click', () => {
  console.log("click");
  options.classList.toggle('hidden');
})

function selectOption(event) {
  const option = event.target;
  const value = option.textContent;
  let input = document.getElementById("user-edit-group");

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

  const joinedOptions = selectedOptions.join(",")
  const joinedOptionsBtn = selectedOptions.join(", ")
  input.value = joinedOptions
  userAddDropdownBtn.innerHTML = joinedOptionsBtn;
}

optionItems.forEach((optionItem) => {
  optionItem.addEventListener('click', selectOption);
});

  let input: HTMLInputElement = document.querySelector('#user-edit-username');
  input.value = user.username;
  input = document.querySelector('#user-edit-id');
  input.value = user.id.toString();
  input = document.querySelector('#user-edit-email');
  input.value = user.email;
  input = document.querySelector('#user-edit-group');
  input.value = user.group;
  input = document.querySelector('#user-edit-role');
  input.value = user.role.toUpperCase();
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
  let div: HTMLDivElement = document.querySelector('#user-edit-dropdown-btn');
    div.innerHTML = user.group;

  if (user.sales_rep) {
    lockerAddressContainer.classList.remove('invisible')
    officeAddressContainer.classList.remove('invisible')
    input = document.querySelector('#user-edit-locker-address');
    input.value = user.locker_address;
    input.required = true;
    input = document.querySelector('#user-edit-office-address');
    input.value = user.office_address;
    input.required = true;
  } else {
    input = document.querySelector('#user-edit-locker-address');
    input.value = '';
    input.required = false;
    input = document.querySelector('#user-edit-office-address');
    input.value = '';
    input.required = false;
  }

  input = document.querySelector('#user-edit-activated');
  input.checked = user.activated;
  input = document.querySelector('#user-edit-sales_rep');
  input.checked = user.sales_rep;
  input = document.querySelector('#user-edit-approval_permission');
  input.checked = user.approval_permission;
  input = document.querySelector('#user-edit-next_url');
  input.value = window.location.href;
  modal.show();
}

const viewUserButtonElements = document.querySelectorAll('.user-view-button');
viewUserButtonElements.forEach(e =>
  e.addEventListener('click', () => {
    const user = JSON.parse(e.getAttribute('data-target'));
    const lockerAddressContainer = document.querySelector('#user-view-locker-address-container');
    const officeAddressContainer = document.querySelector('#user-view-office-address-container');

    if (user.sales_rep) {
      lockerAddressContainer.classList.remove('hidden')
      officeAddressContainer.classList.remove('hidden')
    } else {
      lockerAddressContainer.classList.add('hidden');
      officeAddressContainer.classList.add('hidden');
    }

    console.log(user);
    user.sales_rep
    let div: HTMLDivElement = document.querySelector('#user-view-username');
    div.innerHTML = user.username;
    div = document.querySelector('#user-view-id');
    div.innerHTML = user.id.toString();
    div = document.querySelector('#user-view-email');
    div.innerHTML = user.email;
    div = document.querySelector('#user-view-role');
    div.innerHTML = user.role.toUpperCase();
    div = document.querySelector('#user-view-status');

    user.activated
      ? div.innerHTML = "Active"
      : div.innerHTML = "Offline";

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

    if(user.sales_rep) {
      div = document.querySelector('#user-view-locker-address');
      div.innerHTML = user.locker_address;
      div = document.querySelector('#user-view-office-address');
      div.innerHTML = user.office_address;
    }

    div = document.querySelector('#user-view-group');
    div.innerHTML = user.group;
  }),
);

const lockerAddressContainer = document.querySelector('#user-add-locker-address-container');
const officeAddressContainer = document.querySelector('#user-add-office-address-container');
const salesRepAddUser = document.querySelector('#user-add-sales_rep');

salesRepAddUser.addEventListener('click', () => {
  console.log("click");
  lockerAddressContainer.classList.toggle('invisible')
  officeAddressContainer.classList.toggle('invisible')
})


const userAddDropdownBtn = document.querySelector('#user-add-dropdown-btn');
const options = document.querySelector('#user-add-dropdown-options');
const optionItems = document.querySelectorAll('.user-add-dropdown-option');
const selectedOptions = [];

userAddDropdownBtn.addEventListener('click', () => {
  console.log("click");
  options.classList.toggle('hidden');
})

function selectOption(event) {
  const option = event.target;
  const value = option.textContent;
  let input = document.getElementById("user-add-group");

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

  const joinedOptions = selectedOptions.join(",")
  const joinedOptionsBtn = selectedOptions.join(", ")
  input.value = joinedOptions
  userAddDropdownBtn.innerHTML = joinedOptionsBtn;
}

optionItems.forEach((optionItem) => {
  optionItem.addEventListener('click', selectOption);
});
