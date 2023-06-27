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
  approval: boolean;
  full_name: string;
  country: string;
  region: string;
  city: string;
  zip_code: string;
  street_address: string;
}

const $modalElement: HTMLElement = document.querySelector('#editUserModal');
const $addUserModalElement: HTMLElement =
  document.querySelector('#add-user-modal');
const $viewUserModalElement: HTMLElement = document.querySelector('#viewUserModal');

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
const viewModal: ModalInterface = new Modal($viewUserModalElement, modalOptions);

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

const resetPasswordButtons = document.querySelectorAll('.reset-password-user-btn');

resetPasswordButtons.forEach(e => {
  e.addEventListener('click', async function() {
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
  let input: HTMLInputElement = document.querySelector('#user-edit-username');
  input.value = user.username;
  input = document.querySelector('#user-edit-id');
  input.value = user.id.toString();
  input = document.querySelector('#user-edit-email');
  input.value = user.email;
  input = document.querySelector('#user-edit-full_name');
  input.value = user.full_name;
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
  input = document.querySelector('#user-edit-activated');
  input.checked = user.activated;
  input = document.querySelector('#user-edit-next_url');
  input.value = window.location.href;
  modal.show();
}

//view modal window

// const viewUserButtons = document.querySelectorAll('.user-view-button');

// function viewUser() {
//   viewModal.show()
// }

// viewUserButtons.forEach(e => {
//   e.addEventListener('click', () => {
//     console.log('click view')
//     viewUser()
//   })
// })
const viewUserButtonElements = document.querySelectorAll('.user-view-button');
viewUserButtonElements.forEach(e =>
  e.addEventListener('click', () => {
    const user = JSON.parse(e.getAttribute('data-target'))
    // editUser(JSON.parse(e.getAttribute('data-target')));
    console.log(user)
    // viewModal.show()
    let input: HTMLInputElement = document.querySelector('#user-view-username');
  input.value = user.username;
  input = document.querySelector('#user-view-id');
  input.value = user.id.toString();
  input = document.querySelector('#user-view-email');
  input.value = user.email;
  input = document.querySelector('#user-view-full_name');
  input.value = user.full_name;
  input = document.querySelector('#user-view-password');
  input.value = '*******';
  input = document.querySelector('#user-view-country');
  input.value = user.country;
  input = document.querySelector('#user-view-region');
  input.value = user.region;
  input = document.querySelector('#user-view-city');
  input.value = user.city;
  input = document.querySelector('#user-view-zip_code');
  input.value = user.zip_code;
  input = document.querySelector('#user-view-street_address');
  input.value = user.street_address;
  input = document.querySelector('#user-view-activated');
  input.checked = user.activated;
  input = document.querySelector('#user-view-next_url');
  input.value = window.location.href;
  }),
);