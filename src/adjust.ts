import { addSearchEvent, initModal } from './utils';

interface IAdjust {
  id: number;
  note: string;
  product_id: number;
  product: IProduct;
  adjustGroupQty: IAdjustGroupQty[];
}

interface IProduct {
  id: number;
  name: string;
  image: string;
  SKU: string;
}

interface IAdjustGroupQty {
  group: IGroup;
  warehouse: IWarehouse;
  quantityBefore: number;
  quantityAfter: number;
  delta: number;
}

interface IGroup {
  id: number;
  name: string;
}

interface IWarehouse {
  id: number;
  name: string;
}

const defaultBrandImage =
  'https://raw.githubusercontent.com/Simple2B/BeamSuntory/develop/app/static/img/no_picture_default.png';

// adjust modals
const $viewAdjustModalElement: HTMLElement = document.querySelector('#view-adjust-modal');

const viewModal = initModal($viewAdjustModalElement);

const $viewButtonElements = document.querySelectorAll('.adjust-view-button');
$viewButtonElements.forEach((e) =>
  e.addEventListener('click', () => {
    viewAdjust(JSON.parse(e.getAttribute('data-target')));
  })
);

// ----view adjust modal-----
function viewAdjust(adjust: IAdjust) {
  let div: HTMLDivElement = document.querySelector('#adjust-view-product-name');
  div.innerHTML = adjust.product.name;
  div = document.querySelector('#adjust-view-product-SKU');
  div.innerHTML = adjust.product.SKU;
  div = document.querySelector('#adjust-view-comment');
  div.innerHTML = adjust.note || 'No comment';
  const img: HTMLImageElement = document.querySelector('#adjust-view-product-image');
  const fullImageAnchor = img.closest('.product-full-image-anchor');
  fullImageAnchor.setAttribute('data-target-product-id', adjust.product.id.toString());
  adjust.product.image.length > 100
    ? (img.src = `data:image/png;base64, ${adjust.product.image}`)
    : (img.src = defaultBrandImage);

  adjust.adjustGroupQty.forEach((adjust) => {
    createGroupQtyItem(adjust);
  });
  viewModal.show();
}

// ----create group qty item-----
function createGroupQtyItem(groupQty: IAdjustGroupQty) {
  const GroupQtyContainer = document.querySelector('#adjust-view-group-quantity-container');
  const groupQtyItem = document.createElement('div');
  groupQtyItem.classList.add('grid', 'grid-cols-6', 'gap-6', 'mb-4');
  groupQtyItem.innerHTML = `
    <div class="col-span-6 sm:col-span-3">
      <label for="group" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group Name</label>
      <div
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          ${groupQty.group.name}
      </div>
    </div>
    <div class="col-span-6 sm:col-span-3">
      <label for="group"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Warehouse</label>
      <div
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          ${groupQty.warehouse.name}
      </div>
    </div>
    <div class="col-span-6 sm:col-span-2">
      <label for="group" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity Before</label>
      <div
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          ${groupQty.quantityBefore}
      </div>
    </div>
    <div class="col-span-6 sm:col-span-2">
      <label for="group" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity After</label>
      <div
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          ${groupQty.quantityAfter}
      </div>
    </div>
    <div class="col-span-6 sm:col-span-2">
      <label for="group" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity Delta</label>
      <div
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          ${groupQty.delta}
      </div>
    </div>
  `;
  GroupQtyContainer.appendChild(groupQtyItem);
}

// search flow
const searchAdjustInput: HTMLInputElement = document.querySelector('#table-search-adjust');
const searchAdjustInputButton = document.querySelector('#table-search-adjust-button');
addSearchEvent(searchAdjustInput, searchAdjustInputButton);
