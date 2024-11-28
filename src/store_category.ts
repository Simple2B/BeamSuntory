import { addDeleteEvent, initModal } from './utils';

interface IStoreCategory {
  id: number;
  name: string;
  parent_category: string;
  image: string;
  active: boolean;
}

const $modalElement: HTMLElement = document.querySelector('#editStoreCategoryModal');
const $addStoreCategoryModalElement: HTMLElement = document.querySelector('#add-store-category-modal');

const modal = initModal($modalElement);
const addModal = initModal($addStoreCategoryModalElement);

const $buttonElements = document.querySelectorAll('.store-category-edit-button');
$buttonElements.forEach((e) =>
  e.addEventListener('click', () => {
    editStoreCategory(JSON.parse(e.getAttribute('data-target')));
  })
);

// search flow
const searchInput: HTMLInputElement = document.querySelector('#table-search-store-categories');
const searchInputButton = document.querySelector('#table-search-store-category-button');
if (searchInputButton && searchInput) {
  searchInputButton.addEventListener('click', () => {
    window.location.href = `${window.location.origin}${window.location.pathname}?q=${searchInput.value}`;
  });
}
const deleteButtons = document.querySelectorAll('.delete-store-category-btn');

deleteButtons.forEach((e) => {
  addDeleteEvent(e, `/store_category/delete/${e.getAttribute('data-store-category-id')}`);
});

const defaultCategoryImage =
  'https://github.com/Simple2B/BeamSuntory/blob/develop/app/static/img/logo-mini.png?raw=true';

function editStoreCategory(storeCategory: IStoreCategory) {
  const img: HTMLImageElement = document.querySelector('#store-category-edit-image');
  storeCategory.image.length > 100
    ? (img.src = `data:image/png;base64, ${storeCategory.image}`)
    : (img.src = defaultCategoryImage);
  let input: HTMLInputElement = document.querySelector('#store-category-edit-name');
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
