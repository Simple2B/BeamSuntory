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
      console.log('id: ', id);
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
  console.log('store: ', store);
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

const addFavoriteCheckboxes = document.querySelectorAll(
  '.store-add-favorite-btn',
);
addFavoriteCheckboxes.forEach((checkbox: HTMLInputElement, index) => {
  checkbox.addEventListener('change', async () => {
    const favoriteContainer = checkbox.closest('.favorite-container');
    const imageStar = favoriteContainer.querySelector(
      '.store-add-favorite-star',
    );
    const storeId = checkbox.getAttribute('data-store-id');
    const userId = checkbox.getAttribute('data-user-id');
    const favStore = {
      store_id: storeId,
      user_id: userId,
    };
    const response = await fetch('/store/add-favorite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(favStore),
    });
    if (response.status == 200 && checkbox.checked) {
      imageStar.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">              <svg class="store-add-favorite-star w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
          clip-rule="evenodd"></path>
      </svg>
      `;
    }
    if (response.status == 200 && !checkbox.checked) {
      imageStar.innerHTML = `
        <svg class="store-add-favorite-star w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"
            clip-rule="evenodd"></path>
        </svg>
      `;
    }
    if (response.status == 400) {
      return;
    }
  });
});
