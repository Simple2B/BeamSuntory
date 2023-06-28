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
  const sales_rep = document.querySelector('#user-edit-sales_rep');

  sales_rep.addEventListener('click', () => {
    console.log("click");
    lockerAddressContainer.classList.toggle('invisible')
  })

  let input: HTMLInputElement = document.querySelector('#user-edit-username');
  input.value = user.username;
  input = document.querySelector('#user-edit-id');
  input.value = user.id.toString();
  input = document.querySelector('#user-edit-email');
  input.value = user.email;
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

  if (user.sales_rep) {
    lockerAddressContainer.classList.remove('invisible')
    input = document.querySelector('#user-edit-locker-address');
    input.value = user.locker_address;
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

    user.sales_rep
      ? lockerAddressContainer.classList.remove('hidden')
      : lockerAddressContainer.classList.add('hidden');

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
    }

    div = document.querySelector('#user-view-group');
    div.innerHTML = user.group;
  }),
);

const lockerAddressContainer = document.querySelector('#user-add-locker-address-container');
const salesRepAddUser = document.querySelector('#user-add-sales_rep');

salesRepAddUser.addEventListener('click', () => {
  console.log("click");
  lockerAddressContainer.classList.toggle('invisible')
})
