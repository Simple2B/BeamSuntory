import {Modal} from 'flowbite';
import type {ModalOptions, ModalInterface} from 'flowbite';

interface IShipRequest {
  id: number;
  order_numb: string;
  status: string;
  order_type: string;
  store_id: number;
  warehouse_id: number;
  warehouse_name: string;
  created_at: string;
  quantity: number;
  current_order_carts: IProduct[];
  comment: string;
  warehouses: IWarehouse[];
}

interface IProduct {
  id: number;
  name: string;
  quantity: string;
  price: number;
  image: string;
  SKU: string;
  comment: string;
  group: string;
  warehouse: {id: number; name: string};
}

interface IStore {
  id: number;
  store_name: string;
  address: string;
  phone_numb: string;
  country: string;
  region: string;
  city: string;
  zip: string;
}

interface IWarehouse {
  id: number;
  name: string;
  products_ids: number[];
}

const $modalViewElement: HTMLElement = document.querySelector(
  '#view-ship-request-modal',
);

const modalViewOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses:
    'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {
    console.log('modal is hidden');
    const tableShipRequestBody = document.querySelector(
      '#table-ship-request-body-view',
    );
    while (tableShipRequestBody.firstChild) {
      tableShipRequestBody.removeChild(tableShipRequestBody.firstChild);
    }
  },
  onShow: () => {},
  onToggle: () => {
    console.log('modal has been toggled');
  },
};

const viewModal: ModalInterface = new Modal(
  $modalViewElement,
  modalViewOptions,
);

// search flow
const searchInput: HTMLInputElement = document.querySelector(
  '#table-search-ship-request',
);
const searchInputButton = document.querySelector(
  '#table-search-ship-request-button',
);
if (searchInputButton && searchInput) {
  searchInputButton.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.set('q', searchInput.value);
    window.location.href = `${url.href}`;
  });
}

// --delete ship request item--
const deleteButtons = document.querySelectorAll('.delete-ship-request-btn');

deleteButtons.forEach(e => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-ship-request-id');
      const response = await fetch(`/ship_request/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.status == 200) {
        location.reload();
      }
    }
  });
});

// ----view modal-----
const viewShipRequestButtonElements = document.querySelectorAll(
  '.ship-request-view-button',
);
viewShipRequestButtonElements.forEach(e =>
  e.addEventListener('click', () => {
    const shipRequest: IShipRequest = JSON.parse(e.getAttribute('data-target'));
    const store = JSON.parse(e.getAttribute('data-target-store'));

    let div: HTMLDivElement = document.querySelector(
      '#ship-request-view-order-number',
    );
    div.innerHTML = shipRequest.order_numb;
    div = document.querySelector('#ship-request-view-status');
    div.innerHTML = shipRequest.status;
    div = document.querySelector('#ship-request-view-created-date');
    div.innerHTML = shipRequest.created_at.slice(0, 10);
    div = document.querySelector('#ship-request-view-type');
    div.innerHTML = shipRequest.order_type;
    div = document.querySelector('#ship-request-view-warehouse-name');
    div.innerHTML = shipRequest.warehouse_name;
    div = document.querySelector('#ship-request-view-comment');
    div.innerHTML = shipRequest.comment;
    div = document.querySelector('#ship-request-view-store');
    div.innerHTML = store.store_name;
    div = document.querySelector('#ship-request-view-store_address');
    div.innerHTML = store.address;
    div = document.querySelector('#ship-request-view-store_phone');
    div.innerHTML = store.phone_numb;
    div = document.querySelector('#ship-request-view-store_country');
    div.innerHTML = store.country;
    div = document.querySelector('#ship-request-view-store_province');
    div.innerHTML = store.region;
    div = document.querySelector('#ship-request-view-store_city');
    div.innerHTML = store.city;
    div = document.querySelector('#ship-request-view-store_zip_code');
    div.innerHTML = store.zip;

    createShipRequestItemTable(shipRequest, 'view');
    viewModal.show();
  }),
);

// -----create ship request item table-----
function createShipRequestItemTable(shipRqst: IShipRequest, typeModal: string) {
  const tableShipRequestBody = document.querySelector(
    `#table-ship-request-body-${typeModal}`,
  );

  const currentCartItems = shipRqst.current_order_carts;
  currentCartItems.forEach((product, index) => {
    const tableShipRequestItem = document.createElement('tr');

    tableShipRequestItem.classList.add(
      'table-product-item-tr',
      'bg-white',
      'border-b',
      'dark:bg-gray-800',
      'dark:border-gray-700',
      'hover:bg-gray-50',
      'dark:hover:bg-gray-600',
    );
    tableShipRequestItem.innerHTML = `
        <td class="w-4 p-4">
          <div class="flex items-center">
            ${index + 1}
          </div>
        </td>
        <td scope="row" class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
          <div class="pl-3">
            ${
              product.image.length > 100
                ? `<img src="data:image/png;base64, ${product.image}" alt="${product.name}" class="w-14 h-14">`
                : `<img src="/static/img/default_image_brand.png" alt="${product.name}" class="w-14 h-14">`
            }
          </div>
        </td>
        <td scope="row" class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
          <div class="pl-3">
            <div class="text-base font-semibold">${product.name}</div>
          </div>
        </td>
        <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
          <div class="pl-3">
            <div class="text-base font-semibold">${product.SKU}</div>
          </div>
        </td>
        <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
          <div class="pl-3">
            <div class="text-base font-semibold">some date</div>
          </div>
        </td>
        <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
          <div class="pl-3">
            <div class="cart-item-retail-price text-base font-semibold">${
              product.price
            }</div>
          </div>
        </td>
        <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
          <div class="pl-3">
            <div class="cart-item-retail-price text-base font-semibold">${
              product.quantity
            }</div>
          </div>
        </td>
      `;

    const warehouseEditElement = document.createElement('td');
    warehouseEditElement.classList.add('p-4', 'space-x-2', 'whitespace-nowrap');
    warehouseEditElement.innerHTML = `
      <td class="p-4 space-x-2 whitespace-nowrap">
            <select type="text" name="store" id="ship-request-${typeModal}-warehouse-name"
              class="ship-request-${typeModal}-warehouse-name shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required>
            </select>
      </td>
    `;
    const warehouseName = product.warehouse
      ? product.warehouse.name
      : 'No Warehouse';
    const warehouseViewElement = document.createElement('td');
    warehouseViewElement.classList.add('p-4', 'space-x-2', 'whitespace-nowrap');
    warehouseViewElement.innerHTML = `
      <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
        <div class="pl-3">
          <div class="text-base text-gray-900 dark:text-white font-semibold">${warehouseName}</div>
        </div>
      </td>
    `;

    if (typeModal === 'edit') {
      tableShipRequestItem.appendChild(warehouseEditElement);
      const selectWarehouse = tableShipRequestItem.querySelector(
        `#ship-request-${typeModal}-warehouse-name`,
      );
      for (const warehouse of shipRqst.warehouses) {
        const option = document.createElement('option');

        if (warehouse.products_ids.includes(product.id)) {
          option.value = warehouse.id.toString();
          option.text = warehouse.name;
          selectWarehouse.appendChild(option);
        }
      }
    } else {
      tableShipRequestItem.appendChild(warehouseViewElement);
    }

    tableShipRequestBody.appendChild(tableShipRequestItem);
  });
}
