import {Modal} from 'flowbite';
import type {ModalOptions, ModalInterface} from 'flowbite';

// /*
//  * $editStoreModal: required
//  * options: optional
//  */

// // For your js code

interface IStore {
  id: number;
  store_category: string;
  store_name: string;
  contact_person: string;
  email: string;
  phone_numb: string;
  country: string;
  region: string;
  city: string;
  address: string;
  zip: string;
  active: boolean;
}

const $modalElement: HTMLElement = document.querySelector('#editStoreModal');
const $addStoreModalElement: HTMLElement =
  document.querySelector('#add-store-modal');

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
    console.log('store id: ');
  },
  onToggle: () => {
    console.log('modal has been toggled');
  },
};

const modal: ModalInterface = new Modal($modalElement, modalOptions);
const addModal: ModalInterface = new Modal($addStoreModalElement, modalOptions);

const $buttonElements = document.querySelectorAll('.store-edit-button');
$buttonElements.forEach(e =>
  e.addEventListener('click', () => {
    editStore(JSON.parse(e.getAttribute('data-target')));
  }),
);

// search flow
const searchInput: HTMLInputElement = document.querySelector(
  '#table-search-stores',
);
const searchInputButton = document.querySelector('#table-search-store-button');
if (searchInputButton && searchInput) {
  searchInputButton.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.set('q', searchInput.value);
    window.location.href = `${url.href}`;
  });
}
const deleteButtons = document.querySelectorAll('.delete-store-btn');

deleteButtons.forEach(e => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-store-id');
      const response = await fetch(`/store/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.status == 200) {
        location.reload();
      }
    }
  });
});

function editStore(store: IStore) {
  let input: HTMLInputElement = document.querySelector(
    '#store-edit-store_name',
  );
  input.value = store.store_name;
  input = document.querySelector('#store-edit-id');
  input.value = store.id.toString();
  input = document.querySelector('#store-edit-store_category');
  input.value = store.store_category;
  input = document.querySelector('#store-edit-contact_person');
  input.value = store.contact_person;
  input = document.querySelector('#store-edit-email');
  input.value = store.email;
  input = document.querySelector('#store-edit-phone_numb');
  input.value = store.phone_numb;
  input = document.querySelector('#store-edit-country');
  input.value = store.country;
  input = document.querySelector('#store-edit-region');
  input.value = store.region;
  input = document.querySelector('#store-edit-city');
  input.value = store.city;
  input = document.querySelector('#store-edit-address');
  input.value = store.address;
  input = document.querySelector('#store-edit-zip');
  input.value = store.zip;
  input = document.querySelector('#store-edit-active');
  input.checked = store.active;
  input = document.querySelector('#store-edit-next_url');
  input.value = window.location.href;
  modal.show();
}
