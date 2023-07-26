import {Modal} from 'flowbite';
import type {ModalOptions, ModalInterface} from 'flowbite';
import {Input, Timepicker, initTE} from 'tw-elements';

initTE({Input, Timepicker});

const pickerInline = document.querySelector('#timepicker-inline-12');
const timepickerMaxMin = new Timepicker(pickerInline, {
  format12: true,
  inline: true,
});
// /*
//  * $editInboundOrderModal: required
//  * options: optional
//  */

// // For your js code

interface SupDAWhProd {
  supplier: string;
  delivery_agent: string;
  warehouse: string;
  product: string;
}

interface IInboundOrder {
  id: number;
  order_id: string;
  active_date: number;
  active_time: string;
  order_title: string;
  delivery_date: string;
  status: string;
  supplier_id: number;
  delivery_agent_id: number;
  warehouse_id: number;
  product_id: number;
  sup_da_wh_prod_objs: SupDAWhProd;
  products: IProduct[];
  groups: IGroup[];
}

interface IProduct {
  id: number;
  name: string;
}

interface IGroup {
  id: number;
  name: string;
}

function convertDate(date: string) {
  const inputDate = date.split('T')[0];
  const dateParts = inputDate.split('-');
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];
  return `${month}/${day}/${year}`;
}

const $modalElement: HTMLElement = document.querySelector(
  '#editInboundOrderModal',
);
const $addInboundOrderModalElement: HTMLElement = document.querySelector(
  '#add-inbound-order-modal',
);

const modalOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses:
    'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {
    const inboundOrderAddItems = document.querySelectorAll(
      '.inbound-order-edit-add-item',
    );
    inboundOrderAddItems.forEach(item => {
      item.remove();
    });
    sessionStorage.removeItem('inboundOrder');
  },
  onShow: () => {
    console.log('inbound-order id: ');
  },
  onToggle: () => {
    console.log('modal has been toggled');
  },
};

const modal: ModalInterface = new Modal($modalElement, modalOptions);
const addModal: ModalInterface = new Modal(
  $addInboundOrderModalElement,
  modalOptions,
);

const $buttonElements = document.querySelectorAll('.inbound-order-edit-button');
$buttonElements.forEach(e =>
  e.addEventListener('click', () => {
    const inboundOrder: IInboundOrder = JSON.parse(
      e.getAttribute('data-target'),
    );
    editInboundOrder(inboundOrder);
    sessionStorage.setItem('inboundOrder', JSON.stringify(inboundOrder));
  }),
);

// search flow
const searchInput: HTMLInputElement = document.querySelector(
  '#table-search-inbound-orders',
);
const searchInputButton = document.querySelector(
  '#table-search-inbound-order-button',
);
if (searchInputButton && searchInput) {
  searchInputButton.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.set('q', searchInput.value);
    window.location.href = `${url.href}`;
  });
}
const deleteButtons = document.querySelectorAll('.delete-inbound-order-btn');

deleteButtons.forEach(e => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-inbound-order-id');
      const response = await fetch(`/inbound_order/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.status == 200) {
        location.reload();
      }
    }
  });
});

function editInboundOrder(inboundOrder: IInboundOrder) {
  let input: HTMLInputElement = document.querySelector(
    '#inbound-order-edit-id',
  );
  input.value = inboundOrder.id.toString();
  input = document.querySelector('#inbound-order-edit-active_date');
  input.value = convertDate(inboundOrder.active_date.toString());
  input = document.querySelector('#inbound-order-edit-active_time');
  input.value = inboundOrder.active_time;
  input = document.querySelector('#inbound-order-edit-order_title');
  input.value = inboundOrder.order_title;
  input = document.querySelector('#inbound-order-edit-delivery_date');
  input.value = convertDate(inboundOrder.delivery_date.toString());
  input = document.querySelector('#inbound-order-edit-status');
  input.value = inboundOrder.status;
  input = document.querySelector('#inbound-order-edit-supplier_id');
  input.value = inboundOrder.supplier_id.toString();
  input = document.querySelector('#inbound-order-edit-delivery_agent_id');
  input.value = inboundOrder.delivery_agent_id.toString();
  input = document.querySelector('#inbound-order-edit-warehouse_id');
  input.value = inboundOrder.warehouse_id.toString();
  input = document.querySelector('#inbound-order-edit-product_id');
  input.value = inboundOrder.product_id.toString();
  input = document.querySelector('#inbound-order-edit-next_url');
  input.value = window.location.href;
  modal.show();
}

// ----view inbound order modal window----
const viewInboundOrderButtonElements = document.querySelectorAll(
  '.inbound-order-view-button',
);
viewInboundOrderButtonElements.forEach(e =>
  e.addEventListener('click', () => {
    const inboundOrder: IInboundOrder = JSON.parse(
      e.getAttribute('data-target'),
    );
    let div: HTMLDivElement = document.querySelector(
      '#inbound-order-view-order_id',
    );
    div.innerHTML = inboundOrder.order_id;
    div = document.querySelector('#inbound-order-view-id');
    div.innerHTML = inboundOrder.id.toString();
    div = document.querySelector('#inbound-order-view-active_date');
    div.innerHTML = convertDate(inboundOrder.active_date.toString());
    div = document.querySelector('#inbound-order-view-active_time');
    div.innerHTML = inboundOrder.active_time;
    div = document.querySelector('#inbound-order-view-order_title');
    div.innerHTML = inboundOrder.order_title;
    div = document.querySelector('#inbound-order-view-delivery_date');
    div.innerHTML = convertDate(inboundOrder.delivery_date.toString());
    div = document.querySelector('#inbound-order-view-status');
    div.innerHTML = inboundOrder.status;
    div = document.querySelector('#inbound-order-view-supplier_id');
    div.innerHTML = inboundOrder.sup_da_wh_prod_objs.supplier;
    div = document.querySelector('#inbound-order-view-delivery_agent_id');
    div.innerHTML = inboundOrder.sup_da_wh_prod_objs.delivery_agent;
    div = document.querySelector('#inbound-order-view-warehouse_id');
    div.innerHTML = inboundOrder.sup_da_wh_prod_objs.warehouse;
    div = document.querySelector('#inbound-order-view-product_id');
    div.innerHTML = inboundOrder.sup_da_wh_prod_objs.product;
  }),
);

// ----add inbound order item----
function createInboundOrderItems() {
  const inboundOrder: IInboundOrder = JSON.parse(
    sessionStorage.getItem('inboundOrder'),
  );
  const inboundOrderAddContainer = document.querySelector(
    '#inbound-order-edit-add-container',
  );
  const inboundOrderAddItem = document.createElement('div');
  inboundOrderAddItem.classList.add(
    'p-6',
    'space-y-6',
    'border-t',
    'inbound-order-edit-add-item',
  );
  inboundOrderAddItem.innerHTML = `
    <div class="grid grid-cols-12 gap-5">
    <div class="col-span-6 sm:col-span-3">
      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product</label>
      <select type="text" name="add_product"
        class="inbound-order-edit-add-product shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Product" required>
      </select>
    </div>
    <div class="col-span-6 sm:col-span-3">
      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group</label>
      <select type="text" name="add_group"
        class="inbound-order-edit-add-group shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Group" required>
      </select>
    </div>
    <div class="col-span-6 sm:col-span-3">
      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
      <input type="text" name="add_quantity"
        class="inbound-order-edit-add-quantity shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Quantity" required>
    </div>
    <div class="col-span-6 sm:col-span-3">
      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Action</label>
      <button type="button" data-target=""
        class="inbound-order-edit-delete-item-btn inline-flex items-center px-3 py-2 mr-3 text-sm font-medium text-center text-white rounded-lg bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"></path>
        </svg>
      </button>
      <button type="button" data-target=""
        class="inbound-order-edit-add-item-btn inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-red-300">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>
        </svg>
      </button>
    </div>
  </div>
  `;

  const inboundOrderAddProductSelect = inboundOrderAddItem.querySelector(
    '.inbound-order-edit-add-product',
  );
  const inboundOrderAddGroupSelect = inboundOrderAddItem.querySelector(
    '.inbound-order-edit-add-group',
  );
  inboundOrder.products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.id.toString();
    option.innerHTML = product.name;
    inboundOrderAddProductSelect.appendChild(option);
  });
  inboundOrder.groups.forEach(group => {
    const option = document.createElement('option');
    option.value = group.id.toString();
    option.innerHTML = group.name;
    inboundOrderAddGroupSelect.appendChild(option);
  });

  inboundOrderAddContainer.appendChild(inboundOrderAddItem);

  const addButton = inboundOrderAddItem.querySelector(
    '.inbound-order-edit-add-item-btn',
  );
  addButton.addEventListener('click', () => {
    createInboundOrderItems();
  });

  const deleteButtons = document.querySelectorAll(
    '.inbound-order-edit-delete-item-btn',
  );
  deleteButtons.forEach(button =>
    button.addEventListener('click', () => {
      const inboundOrderItem = button.closest('.inbound-order-edit-add-item');
      if (inboundOrderItem) {
        inboundOrderItem.remove();
      }
    }),
  );
}

// this button need to add first item from template
const addInboundOrderItemBtnById = document.querySelector(
  '#inbound-order-edit-add-item-btn',
);
addInboundOrderItemBtnById.addEventListener('click', () => {
  createInboundOrderItems();
});

// ----set product to JSON hidden input in inbound-order-edit-form----
function setProducts() {
  const inboundOrderAddProductSelects = document.querySelectorAll(
    '.inbound-order-edit-add-product',
  );
  const inboundOrderAddGroupSelects = document.querySelectorAll(
    '.inbound-order-edit-add-group',
  );
  const inboundOrderAddQuantityInputs = document.querySelectorAll(
    '.inbound-order-edit-add-quantity',
  );
  const products = [];

  for (let i = 0; i < inboundOrderAddProductSelects.length; i++) {
    const inboundOrderAddProductSelect = inboundOrderAddProductSelects[
      i
    ] as HTMLSelectElement;
    const inboundOrderAddGroupSelect = inboundOrderAddGroupSelects[
      i
    ] as HTMLSelectElement;
    const inboundOrderAddQuantityInput = inboundOrderAddQuantityInputs[
      i
    ] as HTMLSelectElement;
    const product = {
      product_id: inboundOrderAddProductSelect.value,
      group_id: inboundOrderAddGroupSelect.value,
      quantity: inboundOrderAddQuantityInput.value,
    };
    products.push(product);
  }

  const inputProducts: HTMLInputElement = document.querySelector(
    '#inbound-order-edit-products',
  );
  inputProducts.value = JSON.stringify(products);
}

// ----submit form through hidden submit button----
const inboundOrderSubmitButton: HTMLButtonElement = document.querySelector(
  '#inbound-order-submit-btn',
);
const inboundOrderSaveProductsButton = document.querySelector(
  '#inbound-order-save-products-btn',
);

inboundOrderSaveProductsButton.addEventListener('click', () => {
  setProducts();
  inboundOrderSubmitButton.click();
});
