import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';
import HTMXDispatcher from './htmx';
import { IShipRequest } from './outgoing_stock';

// initialize htmx listener
const htmxDispatcher = new HTMXDispatcher();

interface IProduct {
  id: number;
  name: string;
  quantity: string;
  regular_price: number;
  retail_price: number;
  image: string;
  SKU: string;
  comment: string;
  group: string;
  warehouse: { id: number; name: string };
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

document.addEventListener('DOMContentLoaded', () => {
  const buttonLoadEventsTable = document.querySelector('#table-ship-request-loader') as HTMLButtonElement;
  // load table
  buttonLoadEventsTable.click();
  // initialize modal
  const $modalViewElement: HTMLElement = document.querySelector('#view-ship-request-modal');

  const modalViewOptions: ModalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
      console.log('modal is hidden');
      const tableShipRequestBody = document.querySelector('#table-ship-request-body-view');
      while (tableShipRequestBody.firstChild) {
        tableShipRequestBody.removeChild(tableShipRequestBody.firstChild);
      }
    },
    onShow: () => {},
    onToggle: () => {
      console.log('modal has been toggled');
    },
  };

  const viewModal: ModalInterface = new Modal($modalViewElement, modalViewOptions);

  const modalCloserButton = document.querySelector('#button-close-view-ship-request-modal');
  modalCloserButton.addEventListener('click', () => {
    viewModal.hide();
  });

  // view divs
  const orderTitleId = document.getElementById('ship-request-view-order-number') as HTMLDivElement;
  const orderType = document.getElementById('ship-request-view-type') as HTMLDivElement;
  const orderStatus = document.getElementById('ship-request-view-status') as HTMLDivElement;
  const orderCreatedDate = document.getElementById('ship-request-view-created-date') as HTMLDivElement;
  const orderWarehouseName = document.getElementById('ship-request-view-warehouse-name') as HTMLDivElement;
  const orderComment = document.getElementById('ship-request-view-comment') as HTMLDivElement;
  const orderStore = document.getElementById('ship-request-view-store') as HTMLDivElement;
  const orderStoreAddress = document.getElementById('ship-request-view-store_address') as HTMLDivElement;
  const orderStorePhone = document.getElementById('ship-request-view-store_phone') as HTMLDivElement;
  const orderStoreCountry = document.getElementById('ship-request-view-store_country') as HTMLDivElement;
  const orderStoreProvince = document.getElementById('ship-request-view-store_province') as HTMLDivElement;
  const orderStoreCity = document.getElementById('ship-request-view-store_city') as HTMLDivElement;
  const orderStoreZipCode = document.getElementById('ship-request-view-store_zip_code') as HTMLDivElement;

  // onload element with events-table id
  htmxDispatcher.onLoad('ship-request-table', (target) => {
    const shipRequestViewButtons: NodeListOf<HTMLButtonElement> = target.querySelectorAll('.ship-request-view-button');
    shipRequestViewButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const shipRequest: IShipRequest = JSON.parse(btn.getAttribute('data-target'));
        const store = JSON.parse(btn.getAttribute('data-target-store'));

        // orderId.value = reportAssign.id.toString();
        orderTitleId.innerHTML = shipRequest.orderNumb;
        orderStatus.innerHTML = shipRequest.status;
        orderType.innerHTML = shipRequest.orderType;
        orderCreatedDate.innerHTML = shipRequest.createdAt.slice(0, 10);
        orderComment.innerHTML = shipRequest.comment;
        orderStore.innerHTML = shipRequest.store.storeName;
        console.log(shipRequest.warehouseName);

        orderWarehouseName.innerHTML = shipRequest.warehouseName || '-';
        orderStoreAddress.innerHTML = shipRequest.store.address;
        orderStorePhone.innerHTML = shipRequest.store.phoneNumb;
        orderStoreCountry.innerHTML = shipRequest.store.country;
        orderStoreProvince.innerHTML = shipRequest.store.region;
        orderStoreCity.innerHTML = shipRequest.store.city;
        orderStoreZipCode.innerHTML = shipRequest.store.zip;

        createShipRequestItemTable(shipRequest, 'view');

        viewModal.show();
      });
    });
  });
});

// -----create ship request item table-----
function createShipRequestItemTable(shipRequest: IShipRequest, typeModal: string) {
  const tableShipRequestBody = document.querySelector(`#table-ship-request-body-${typeModal}`);
  console.log(shipRequest);
  shipRequest.carts.forEach((cart, index) => {
    const tableShipRequestItem = document.createElement('tr');
    console.log('cart', cart);

    tableShipRequestItem.classList.add(
      'table-product-item-tr',
      'bg-white',
      'border-b',
      'dark:bg-gray-800',
      'dark:border-gray-700',
      'hover:bg-gray-50',
      'dark:hover:bg-gray-600'
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
              cart.product.image.length > 100
                ? `<img src="data:image/png;base64, ${cart.product.image}" alt="${cart.product.name}" class="w-14 h-14">`
                : `<img src="/static/img/default_image_brand.png" alt="${cart.product.name}" class="w-14 h-14">`
            }
          </div>
        </td>
        <td scope="row" class="max-w-xs  p-4 text-base font-normal text-gray-900 dark:text-white">
          <div class="pl-3">
            <div class="text-base font-semibold">${cart.product.name}</div>
          </div>
        </td>
        <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
          <div class="pl-3">
            <div class="text-base font-semibold">${cart.product.SKU}</div>
          </div>
        </td>
        <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
          <div class="pl-3">
            <div class="text-base font-semibold">some date</div>
          </div>
        </td>
        <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
          <div class="pl-3">
            <div class="cart-item-retail-regular_price text-base font-semibold">${cart.product.regularPrice}</div>
          </div>
        </td>
        <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
          <div class="pl-3">
            <div class="cart-item-retail-retail_price text-base font-semibold">${cart.product.retailPrice}</div>
          </div>
        </td>
        <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
          <div class="pl-3">
            <div class="cart-item-start-date text-base font-semibold">${cart.event ? cart.event.dateFrom : '-'}</div>
          </div>
        </td>
        <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
          <div class="pl-3">
            <div class="cart-item-end-date text-base font-semibold">${cart.event ? cart.event.dateTo : '-'}</div>
          </div>
        </td>
        <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
          <div class="pl-3">
            <div class="cart-item-quantity text-base font-semibold">${cart.quantity}</div>
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
    const warehouseName = cart.warehouse ? cart.warehouse.name : 'No Warehouse';
    const warehouseViewElement = document.createElement('td');
    warehouseViewElement.classList.add('p-4', 'space-x-2', 'whitespace-nowrap');
    warehouseViewElement.innerHTML = `
      <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
        <div class="pl-3">
          <div class="text-base text-gray-900 dark:text-white font-semibold">${warehouseName}</div>
        </div>
      </td>
    `;

    // if (typeModal === 'edit') {
    //   tableShipRequestItem.appendChild(warehouseEditElement)
    //   const selectWarehouse = tableShipRequestItem.querySelector(`#ship-request-${typeModal}-warehouse-name`)
    //   for (const warehouse of shipRequest.warehouses) {
    //     const option = document.createElement('option')

    //     if (warehouse.products_ids.includes(product.id)) {
    //       option.value = warehouse.id.toString()
    //       option.text = warehouse.name
    //       selectWarehouse.appendChild(option)
    //     }
    //   }
    // } else {

    // }
    tableShipRequestItem.appendChild(warehouseViewElement);
    tableShipRequestBody.appendChild(tableShipRequestItem);
  });
}
