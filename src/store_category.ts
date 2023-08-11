import {Modal} from 'flowbite';
import type {ModalOptions, ModalInterface} from 'flowbite';

// /*
//  * $editStoreCategoryModal: required
//  * options: optional
//  */

// // For your js code

interface IStoreCategory {
  id: number;
  name: string;
  parent_category: string;
  image: string;
  active: boolean;
}

const $modalElement: HTMLElement = document.querySelector(
  '#editStoreCategoryModal',
);
const $addStoreCategoryModalElement: HTMLElement = document.querySelector(
  '#add-store-category-modal',
);

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
    console.log('store-category id: ');
  },
  onToggle: () => {
    console.log('modal has been toggled');
  },
};

const modal: ModalInterface = new Modal($modalElement, modalOptions);
const addModal: ModalInterface = new Modal(
  $addStoreCategoryModalElement,
  modalOptions,
);

const $buttonElements = document.querySelectorAll(
  '.store-category-edit-button',
);
$buttonElements.forEach(e =>
  e.addEventListener('click', () => {
    editStoreCategory(JSON.parse(e.getAttribute('data-target')));
  }),
);

// search flow
const searchInput: HTMLInputElement = document.querySelector(
  '#table-search-store-categories',
);
const searchInputButton = document.querySelector(
  '#table-search-store-category-button',
);
if (searchInputButton && searchInput) {
  searchInputButton.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.set('q', searchInput.value);
    window.location.href = `${url.href}`;
  });
}
const deleteButtons = document.querySelectorAll('.delete-store-category-btn');

deleteButtons.forEach(e => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-store-category-id');
      const response = await fetch(`/store_category/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.status == 200) {
        location.reload();
      }
    }
  });
});

const defaultCategoryImage =
  'https://github.com/Simple2B/BeamSuntory/blob/develop/app/static/img/logo-mini.png?raw=true';

function editStoreCategory(storeCategory: IStoreCategory) {
  const img: HTMLImageElement = document.querySelector(
    '#store-category-edit-image',
  );
  storeCategory.image.length > 100
    ? (img.src = `data:image/png;base64, ${storeCategory.image}`)
    : (img.src = defaultCategoryImage);
  let input: HTMLInputElement = document.querySelector(
    '#store-category-edit-name',
  );
  input.value = storeCategory.name;
  input = document.querySelector('#store-category-edit-id');
  input.value = storeCategory.id.toString();
  input = document.querySelector('#store-category-edit-parent_category');
  input.value = storeCategory.parent_category;
  input = document.querySelector('#store-category-edit-active');
  input.checked = storeCategory.active;
  input = document.querySelector('#store-category-edit-next_url');
  input.value = window.location.href;
  modal.show();
}
