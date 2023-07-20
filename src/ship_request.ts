import {Modal} from 'flowbite';
import type {ModalOptions, ModalInterface} from 'flowbite';

interface IShipRequest {
  id: number;
  order_numb: string;
  status: string;
  order_type: string;
  supplier_id: number;
  created_at: string;
  quantity: number;
  current_order_carts: object[];
}

const $modalViewElement: HTMLElement = document.querySelector(
  '#view-ship-request-modal',
);

const modalOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses:
    'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {
    console.log('modal is hidden');
    const tableShipRequestBody = document.querySelector(
      '#table-ship-request-body',
    );
    while(tableShipRequestBody.firstChild) {
      tableShipRequestBody.removeChild(tableShipRequestBody.firstChild);
    }
  },
  onShow: () => {
    console.log('user id: ');
  },
  onToggle: () => {
    console.log('modal has been toggled');
  },
};

const viewModal: ModalInterface = new Modal($modalViewElement, modalOptions);

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

const viewShipRequestButtonElements = document.querySelectorAll(
  '.ship-request-view-button',
);
viewShipRequestButtonElements.forEach(e =>
  e.addEventListener('click', () => {
    const shipRequest: IShipRequest = JSON.parse(e.getAttribute('data-target'));
    // const supplier = JSON.parse(e.getAttribute('data-target-supplier'));
    const order_numb = e.getAttribute('data-target-current-order');

    console.log('ship_request', shipRequest);

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
    // div = document.querySelector('#ship-request-view-quantity');
    // div.innerHTML = shipRequest.quantity.toString();
    const tableShipRequestBody = document.querySelector(
      '#table-ship-request-body',
    );
    const currentCartItems = shipRequest.current_order_carts;
    console.log('currentCartItems', currentCartItems);
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
            <div id="product-view-regular_price"
              class="shadow-sm h-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              ${product.comment
                ? product.comment
                : `<span class="text-gray-400">No comment</span>`
              }
            </div>
          </div>
        </td>
        <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
          <div class="pl-3">
            <div id="product-view-regular_price"
              class="shadow-sm h-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              ${product.quantity}
            </div>
          </div>
        </td>
      `;
      tableShipRequestBody.appendChild(tableShipRequestItem);
    });
    viewModal.show();
  }),
);
