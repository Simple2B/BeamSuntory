import {Modal} from 'flowbite';
import type {ModalOptions, ModalInterface} from 'flowbite';
import {Input, Timepicker, initTE} from 'tw-elements';
import Datepicker from 'flowbite-datepicker/Datepicker';

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
  warehouse_id: number;
  sup_da_wh_prod_objs: SupDAWhProd;
  products: IProduct[];
  groups: IGroup[];
  inbound_order_prods: {
    [index: string]: IInboundOrderProd[];
  };
  io_allocate_product: {
    [index: string]: IOAllocateProduct[];
  };
}

interface IInboundOrderProd {
  product: {id: number; name: string; SKU: string; image: string};
  group: {id: number; name: string};
  quantity: number;
  shelf_life_start: number;
  shelf_life_end: number;
}

interface IProduct {
  id: number;
  name: string;
}

interface IGroup {
  id: number;
  name: string;
}

interface IOAllocateProduct {
  product: {id: number; name: string};
  quantity: number;
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
const $viewInboundOrderModalElement: HTMLElement = document.querySelector(
  '#view-inbound-order-modal',
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
    console.log('inbound-order modal Show ');
  },
  onToggle: () => {
    console.log('modal has been toggled');
  },
};

const addModalOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses:
    'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {
    console.log('inbound-order id: ');
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
  addModalOptions,
);
const viewModal: ModalInterface = new Modal(
  $viewInboundOrderModalElement,
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

const addModalButton = document.querySelector(
  '#inbound-order-add-modal-button',
);

addModalButton.addEventListener('click', () => {
  const createdInboundOrderId = `IO-BEAM-${Math.floor(Date.now() / 1000)}`;
  const inboundOrderIdInput: HTMLInputElement = document.querySelector(
    '#inbound-order-add-id',
  );
  inboundOrderIdInput.value = createdInboundOrderId;
  sessionStorage.setItem('inboundOrderId', createdInboundOrderId);
  addModal.show();
});

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

// # NOTE: depends on flash from create route on inbound_order_blueprint
document.addEventListener('DOMContentLoaded', () => {
  const successFlash = document.querySelector('#toast-success');
  if (successFlash) {
    const successMessage = successFlash.children[1] as HTMLDivElement;
    if (successMessage.innerText === 'Inbound order added!') {
      const inboundOrders = JSON.parse(sessionStorage.getItem('inboundOrders'));
      const inboundOrderId = sessionStorage.getItem('inboundOrderId');
      for (const inboundOrder of inboundOrders) {
        if (inboundOrder.order_id === inboundOrderId) {
          sessionStorage.setItem('inboundOrder', JSON.stringify(inboundOrder));
          editInboundOrder(inboundOrder);
          break;
        }
      }
    }
    sessionStorage.removeItem('inboundOrders');
    sessionStorage.removeItem('inboundOrderId');
  }
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
  input = document.querySelector('#inbound-order-edit-warehouse_id');
  input.value = inboundOrder.warehouse_id.toString();
  input = document.querySelector('#inbound-order-edit-next_url');
  input.value = window.location.href;

  if (Object.keys(inboundOrder.inbound_order_prods).length > 0) {
    const currentInboundOrder =
      inboundOrder.inbound_order_prods[inboundOrder.order_id];
    // console.log('currentInboundOrder', currentInboundOrder);
    const inboundOrderProductsInputs =
      document.querySelectorAll<HTMLSelectElement>(
        '.inbound-order-edit-add-product',
      );
    // TODO inboundOrderProductsInputs BECOMES EMPTY AFTER FIRST ITERATION. Can't open edit modal again
    // console.log('inboundOrderProductsInputs', inboundOrderProductsInputs);
    const inboundOrderGroupsInputs =
      document.querySelectorAll<HTMLSelectElement>(
        '.inbound-order-edit-add-group',
      );
    const inboundOrderQuantityInputs =
      document.querySelectorAll<HTMLInputElement>(
        '.inbound-order-edit-add-quantity',
      );

    const shelfLifeStartInputs = document.querySelectorAll<HTMLInputElement>(
      '.inbound-order-edit-add-shelf_life_start',
    );
    const shelfLifeEndInputs = document.querySelectorAll<HTMLInputElement>(
      '.inbound-order-edit-add-shelf_life_end',
    );

    if (currentInboundOrder) {
      for (let i = 0; i < currentInboundOrder.length; i++) {
        if (i === 0) {
          const inboundOrderProductInput = inboundOrderProductsInputs[i];
          const inboundOrderGroupInput = inboundOrderGroupsInputs[i];
          const inboundOrderQuantityInput = inboundOrderQuantityInputs[i];
          const shelfLifeStartInput = shelfLifeStartInputs[i];
          const shelfLifeEndInput = shelfLifeEndInputs[i];
          inboundOrderProductInput.value = String(
            currentInboundOrder[i].product.id,
          );
          inboundOrderGroupInput.value = String(
            currentInboundOrder[i].group.id,
          );
          inboundOrderQuantityInput.value = String(
            currentInboundOrder[i].quantity,
          );
          shelfLifeStartInput.value =
            currentInboundOrder[i].shelf_life_start.toString();
          shelfLifeEndInput.value =
            currentInboundOrder[i].shelf_life_end.toString();
          continue;
        }
        createInboundOrderItems(inboundOrder, currentInboundOrder[i]);
      }
    }

    const selectedProduct =
      inboundOrderProductsInputs[0].options[
        inboundOrderProductsInputs[0].selectedIndex
      ].text;

    const selectedProductQtyId = `io-product-input-qty-${selectedProduct}`;

    const selectedProductAllocateId = `#inbound-order-edit-check-quantity-${selectedProduct}`;

    inboundOrderQuantityInputs[0].addEventListener('change', () => {
      const allocateQtyInput: HTMLDivElement = document.querySelector(
        selectedProductAllocateId,
      );

      const inboundOrderCheckQuantityInputHidden: HTMLDivElement =
        document.querySelector(
          `#inbound-order-edit-check-quantity-${selectedProduct}-hidden`,
        );

      const changedQuantityInputs = document.querySelectorAll<HTMLInputElement>(
        `#${selectedProductQtyId}`,
      );

      let totalProductChangedQty = 0;

      changedQuantityInputs.forEach((input: HTMLInputElement) => {
        totalProductChangedQty += Number(input.value);
        allocateQtyInput.innerHTML = (
          Number(inboundOrderCheckQuantityInputHidden.innerHTML) -
          totalProductChangedQty
        ).toString();
      });
    });

    inboundOrderQuantityInputs[0].setAttribute('id', selectedProductQtyId);

    inboundOrderProductsInputs[0].addEventListener('change', () => {
      inboundOrderQuantityInputs[0].setAttribute('id', selectedProductQtyId);
    });
  }

  if (Object.keys(inboundOrder.io_allocate_product).length > 0) {
    const currentInboundOrderCheck =
      inboundOrder.io_allocate_product[inboundOrder.id];
    const inboundOrderProductsCheckInputs =
      document.querySelectorAll<HTMLInputElement>(
        '.inbound-order-edit-check-product',
      );
    const inboundOrderQuantityCheckInputs =
      document.querySelectorAll<HTMLInputElement>(
        '.inbound-order-edit-check-quantity',
      );
    const inboundOrderQuantityCheckInputsHidden =
      document.querySelectorAll<HTMLInputElement>(
        '.inbound-order-edit-check-quantity-hidden',
      );
    // console.log('currentInboundOrderCheck', currentInboundOrderCheck);

    if (currentInboundOrderCheck) {
      for (let i = 0; i < currentInboundOrderCheck.length; i++) {
        if (i === 0) {
          const inboundOrderProductCheckInput =
            inboundOrderProductsCheckInputs[i];
          const inboundOrderQuantityCheckInput =
            inboundOrderQuantityCheckInputs[i];
          const inboundOrderQuantityCheckInputHidden =
            inboundOrderQuantityCheckInputsHidden[i];

          const ioProdQtyCheckInput =
            document.querySelectorAll<HTMLInputElement>(
              `io-product-input-qty-${currentInboundOrderCheck[i].product.name}`,
            );
          // console.log(
          //   'ioProdQtyCheckInput',
          //   `io-product-input-qty-${currentInboundOrderCheck[i].product.name}`,
          //   ioProdQtyCheckInput,
          // );
          // TODO ioProdQtyCheckInput is empty on modal open. Can't calculate total qty - selected products

          inboundOrderProductCheckInput.innerHTML = String(
            currentInboundOrderCheck[i].product.name,
          );
          if (ioProdQtyCheckInput) {
            let preselectedQty = 0;
            ioProdQtyCheckInput.forEach((input: HTMLInputElement) => {
              preselectedQty += Number(input.value);
            });
            inboundOrderQuantityCheckInput.innerHTML = String(
              Number(currentInboundOrderCheck[i].quantity) - preselectedQty,
            );
          } else {
            inboundOrderQuantityCheckInput.innerHTML = String(
              currentInboundOrderCheck[i].quantity,
            );
          }
          inboundOrderQuantityCheckInputHidden.innerHTML = String(
            currentInboundOrderCheck[i].quantity,
          );

          inboundOrderQuantityCheckInput.setAttribute(
            'id',
            `inbound-order-edit-check-quantity-${currentInboundOrderCheck[i].product.name}`,
          );
          inboundOrderQuantityCheckInputHidden.setAttribute(
            'id',
            `inbound-order-edit-check-quantity-${currentInboundOrderCheck[i].product.name}-hidden`,
          );

          continue;
        }
        createInboundOrderCheckItems(inboundOrder, currentInboundOrderCheck[i]);
      }
    }
  }
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
    div = document.querySelector('#inbound-order-view-warehouse_id');
    div.innerHTML = inboundOrder.sup_da_wh_prod_objs.warehouse;
  }),
);

// ----add inbound order check item for edit modal----
function createInboundOrderCheckItems(
  inbOrder: IInboundOrder = null,
  curInbOrder: IOAllocateProduct = null,
) {
  if (!inbOrder) {
    const inboundOrder: IInboundOrder = JSON.parse(
      sessionStorage.getItem('inboundOrder'),
    );
    inbOrder = inboundOrder;
  }

  const inboundOrderCheckContainer = document.querySelector(
    '#inbound-order-edit-check-container',
  );
  const inboundOrderCheckItem = document.createElement('div');
  inboundOrderCheckItem.classList.add('grid', 'grid-cols-12', 'gap-5');
  inboundOrderCheckItem.innerHTML = `
      <div class="col-span-6 sm:col-span-3">
        <div type="text" name="check_product"
          class="inbound-order-edit-check-product shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Product">
        </div>
      </div>
      <div class="col-span-6 sm:col-span-3">
        <div type="text" name="check_quantity" id="inbound-order-edit-check-quantity-${String(
          curInbOrder.product.name,
        )}-hidden" class="inbound-order-edit-check-quantity-hidden" hidden></div>
        <div type="text" name="check_quantity_display" id="inbound-order-edit-check-quantity-${String(
          curInbOrder.product.name,
        )}"
          class="inbound-order-edit-check-quantity shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Quantity">
        </div>
      </div>
  `;

  const inboundOrderCheckProductInput: HTMLDivElement =
    inboundOrderCheckItem.querySelector('.inbound-order-edit-check-product');
  const inboundOrderCheckQuantityInput: HTMLDivElement =
    inboundOrderCheckItem.querySelector('.inbound-order-edit-check-quantity');
  const inboundOrderCheckQuantityInputHidden: HTMLDivElement =
    inboundOrderCheckItem.querySelector(
      '.inbound-order-edit-check-quantity-hidden',
    );

  if (curInbOrder) {
    inboundOrderCheckProductInput.innerHTML = String(curInbOrder.product.name);
    inboundOrderCheckQuantityInput.innerHTML = String(curInbOrder.quantity);
    inboundOrderCheckQuantityInputHidden.innerHTML = String(
      curInbOrder.quantity,
    );
  }

  inboundOrderCheckContainer.appendChild(inboundOrderCheckItem);
}

// ----add inbound order item for edit modal----
function createInboundOrderItems(
  inbOrder: IInboundOrder = null,
  curInbOrder: IInboundOrderProd = null,
) {
  if (!inbOrder) {
    const inboundOrder: IInboundOrder = JSON.parse(
      sessionStorage.getItem('inboundOrder'),
    );
    inbOrder = inboundOrder;
  }

  const inboundOrderAddContainer = document.querySelector(
    '#inbound-order-edit-add-container',
  );
  const inboundOrderAddItemOriginal = document.querySelector(
    '#inbound-order-edit-item',
  );
  const allInboundOrderItems = document.querySelectorAll(
    '.inbound-order-edit-add-item',
  );
  const index = allInboundOrderItems.length + 1;
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
        <option value="" disabled selected>Select product</option>
      </select>
    </div>
    <div class="col-span-6 sm:col-span-3">
      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group</label>
      <select type="text" name="add_group"
        class="inbound-order-edit-add-group shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Group" required>
        <option value="" disabled selected>Select group</option>
      </select>
    </div>
    <div class="col-span-6 sm:col-span-3">
      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
      <input type="text" name="add_quantity"
        class="inbound-order-edit-add-quantity shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Quantity" min="1" required>
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
    <div class="col-span-6 sm:col-span-6">
      <label for="shelf_life_start" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Shelf life</label >
      <div   class="flex items-center">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
          </div>
          <input id="datepickerEl-start-${index}" datepicker name="shelf_life_start" type="text" class="inbound-order-edit-add-shelf_life_start bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start">
        </div>
        <span class="mx-4 text-gray-500">to</span>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
          </div>
          <input name="shelf_life_end" id="datepickerEl-end-${index}" datepicker type="text" class="inbound-order-edit-add-shelf_life_end bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end">
        </div>
      </div>
    </div>
  </div>
  `;

  const inboundOrderAddProductSelect: HTMLSelectElement =
    inboundOrderAddItem.querySelector('.inbound-order-edit-add-product');
  const inboundOrderAddGroupSelect: HTMLSelectElement =
    inboundOrderAddItem.querySelector('.inbound-order-edit-add-group');
  const inboundOrderAddQuantityInput: HTMLInputElement =
    inboundOrderAddItem.querySelector('.inbound-order-edit-add-quantity');
  const shelfLifeStartInput: HTMLInputElement =
    inboundOrderAddItem.querySelector(
      '.inbound-order-edit-add-shelf_life_start',
    );
  const shelfLifeEndInput: HTMLInputElement = inboundOrderAddItem.querySelector(
    '.inbound-order-edit-add-shelf_life_end',
  );

  inbOrder.products.forEach(product => {
    const option = document.createElement('option');
    curInbOrder;
    if (curInbOrder) {
      option.value = curInbOrder.product.id.toString();
      option.innerHTML = curInbOrder.product.name;
    } else {
      option.value = product.id.toString();
      option.innerHTML = product.name;
    }
    if (curInbOrder) {
      inboundOrderAddProductSelect.value = option.value;
      inboundOrderAddProductSelect.setAttribute('disabled', 'disabled');
    }
    inboundOrderAddProductSelect.appendChild(option);
  });

  inbOrder.groups.forEach(group => {
    const option = document.createElement('option');
    if (curInbOrder) {
      option.value = curInbOrder.group.id.toString();
      option.innerHTML = curInbOrder.group.name;
    } else {
      option.value = group.id.toString();
      option.innerHTML = group.name;
    }
    inboundOrderAddGroupSelect.appendChild(option);

    if (curInbOrder) {
      inboundOrderAddGroupSelect.value = option.value;
      inboundOrderAddGroupSelect.setAttribute('disabled', 'disabled');
    }
  });

  if (curInbOrder) {
    inboundOrderAddQuantityInput.value = String(curInbOrder.quantity);
    inboundOrderAddQuantityInput.setAttribute(
      'id',
      `io-product-input-qty-${
        inboundOrderAddProductSelect.options[
          inboundOrderAddProductSelect.selectedIndex
        ].text
      }`,
    );
    shelfLifeStartInput.value = curInbOrder.shelf_life_start.toString();
    shelfLifeEndInput.value = curInbOrder.shelf_life_end.toString();
  }

  inboundOrderAddContainer.appendChild(inboundOrderAddItem);

  inboundOrderAddQuantityInput.addEventListener('change', () => {
    const inboundOrderAddQuantityInputsAll = document.querySelectorAll(
      `#io-product-input-qty-${
        inboundOrderAddProductSelect.options[
          inboundOrderAddProductSelect.selectedIndex
        ].text
      }`,
    );
    const inboundOrderCheckQuantityInput: HTMLDivElement =
      document.querySelector(
        `#inbound-order-edit-check-quantity-${
          inboundOrderAddProductSelect.options[
            inboundOrderAddProductSelect.selectedIndex
          ].text
        }`,
      );
    const inboundOrderCheckQuantityInputHidden: HTMLDivElement =
      document.querySelector(
        `#inbound-order-edit-check-quantity-${
          inboundOrderAddProductSelect.options[
            inboundOrderAddProductSelect.selectedIndex
          ].text
        }-hidden`,
      );

    inboundOrderCheckQuantityInput.innerHTML =
      inboundOrderCheckQuantityInputHidden.innerHTML;

    inboundOrderAddQuantityInputsAll.forEach((input: HTMLInputElement) => {
      inboundOrderCheckQuantityInput.innerHTML = (
        Number(inboundOrderCheckQuantityInput.innerHTML) - Number(input.value)
      ).toString();
    });
  });

  inboundOrderAddProductSelect.addEventListener('change', () => {
    inboundOrderAddQuantityInput.setAttribute(
      'id',
      `io-product-input-qty-${
        inboundOrderAddProductSelect.options[
          inboundOrderAddProductSelect.selectedIndex
        ].text
      }`,
    );
  });

  const addButton = inboundOrderAddItem.querySelector(
    '.inbound-order-edit-add-item-btn',
  );
  addButton.addEventListener('click', () => {
    createInboundOrderItems();
    new Datepicker(document.querySelector(`#datepickerEl-start-${index + 1}`));
    new Datepicker(document.querySelector(`#datepickerEl-end-${index + 1}`));
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
  const allInboundOrderItems = document.querySelectorAll(
    '.inbound-order-edit-add-item',
  );
  const index = allInboundOrderItems.length;
  new Datepicker(document.querySelector(`#datepickerEl-start-${index}`));
  new Datepicker(document.querySelector(`#datepickerEl-end-${index}`));
});

// ----add inbound order item for add modal----
function createInboundOrderAddItems(
  inbOrder: IInboundOrder = null,
  curInbOrder: IInboundOrderProd = null,
) {
  if (!inbOrder) {
    const inboundOrder: IInboundOrder = JSON.parse(
      sessionStorage.getItem('inboundOrder'),
    );
    inbOrder = inboundOrder;
  }
  const inboundOrderAddContainer = document.querySelector(
    '#inbound-order-add-add-container',
  );
  const inboundOrderAddItem = document.createElement('div');
  inboundOrderAddItem.classList.add(
    'p-6',
    'space-y-6',
    'border-t',
    'inbound-order-add-add-item',
  );
  inboundOrderAddItem.innerHTML = `
    <div class="grid grid-cols-12 gap-5">
    <div class="col-span-6 sm:col-span-3">
      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product</label>
      <select type="text" name="add_product"
        class="inbound-order-add-add-product shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Product" required>
        <option value="" disabled selected>Select product</option>
      </select>
    </div>
    <div class="col-span-6 sm:col-span-3">
      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
      <input type="text" name="add_quantity"
        class="inbound-order-add-add-quantity shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Quantity" min="1" required>
    </div>
    <div class="col-span-6 sm:col-span-3">
      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Action</label>
      <button type="button" data-target=""
        class="inbound-order-add-delete-item-btn inline-flex items-center px-3 py-2 mr-3 text-sm font-medium text-center text-white rounded-lg bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"></path>
        </svg>
      </button>
      <button type="button" data-target="" id="inbound-order-add-add-item-btn"
        class="inbound-order-add-add-item-btn inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-red-300">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>
        </svg>
      </button>
    </div>
  </div>
  `;

  const inboundOrderAddProductSelect: HTMLInputElement =
    inboundOrderAddItem.querySelector('.inbound-order-add-add-product');
  const inboundOrderAddFirstSelect: HTMLSelectElement = document.querySelector(
    '#inbound-order-add-add-product-select',
  );

  inboundOrderAddProductSelect.innerHTML = inboundOrderAddFirstSelect.innerHTML;
  inboundOrderAddContainer.appendChild(inboundOrderAddItem);

  const addButton = inboundOrderAddItem.querySelector(
    '.inbound-order-add-add-item-btn',
  );
  addButton.addEventListener('click', () => {
    createInboundOrderAddItems();
  });

  const deleteButtons = document.querySelectorAll(
    '.inbound-order-add-delete-item-btn',
  );
  deleteButtons.forEach(button =>
    button.addEventListener('click', () => {
      const inboundOrderItem = button.closest('.inbound-order-add-add-item');
      if (inboundOrderItem) {
        inboundOrderItem.remove();
      }
    }),
  );
}

// this button need to add first item from template
const createAddInboundOrderItemBtnById = document.querySelector(
  '#inbound-order-add-add-item-btn',
);
createAddInboundOrderItemBtnById.addEventListener('click', () => {
  createInboundOrderAddItems();
});

// ----set product to JSON hidden input in inbound-order-edit-form----
function setProducts(actionType: string) {
  let inboundOrderAddGroupSelects: any;
  if (actionType === 'edit') {
    inboundOrderAddGroupSelects = document.querySelectorAll(
      '.inbound-order-edit-add-group',
    );
  }
  const inboundOrderAddProductSelects = document.querySelectorAll(
    `.inbound-order-${actionType}-add-product`,
  );
  const inboundOrderAddQuantityInputs = document.querySelectorAll(
    `.inbound-order-${actionType}-add-quantity`,
  );
  const shelfLifeStartInputs = document.querySelectorAll(
    '.inbound-order-edit-add-shelf_life_start',
  );
  const shelfLifeEndInputs = document.querySelectorAll(
    '.inbound-order-edit-add-shelf_life_end',
  );

  const products = [];
  const productsQuantities: {[index: string]: number} = {};

  for (let i = 0; i < inboundOrderAddProductSelects.length; i++) {
    const inboundOrderAddProductSelect = inboundOrderAddProductSelects[
      i
    ] as HTMLSelectElement;
    const inboundOrderAddQuantityInput = inboundOrderAddQuantityInputs[
      i
    ] as HTMLSelectElement;

    const product = {
      product_id: inboundOrderAddProductSelect.value,
      quantity: inboundOrderAddQuantityInput.value,
    };
    if (actionType === 'edit') {
      const inboundOrderAddGroupSelect = inboundOrderAddGroupSelects[
        i
      ] as HTMLSelectElement;
      const shelfLifeStartInput = shelfLifeStartInputs[i] as HTMLSelectElement;
      const shelfLifeEndInput = shelfLifeEndInputs[i] as HTMLSelectElement;
      Object.assign(product, {group_id: inboundOrderAddGroupSelect.value});
      Object.assign(product, {
        shelf_life_start: shelfLifeStartInput.value.toString(),
      });
      Object.assign(product, {
        shelf_life_end: shelfLifeEndInput.value.toString(),
      });

      // NOTE sum qty of the same product and check if it is not more or less than available qty
      const prodId = inboundOrderAddProductSelect.value.toString();

      if (inboundOrderAddProductSelect.value in productsQuantities) {
        productsQuantities[prodId] += Number(
          inboundOrderAddQuantityInput.value,
        );
      } else {
        productsQuantities[prodId] = Number(inboundOrderAddQuantityInput.value);
      }

      const ProductQuantityCheck = document.querySelector(
        `#inbound-order-edit-check-quantity-${
          inboundOrderAddProductSelect.options[
            inboundOrderAddProductSelect.selectedIndex
          ].text
        }-hidden`,
      );

      if (!ProductQuantityCheck) {
        alert(
          `Product ${
            inboundOrderAddProductSelect.options[
              inboundOrderAddProductSelect.selectedIndex
            ].text
          } can't be allocated for this order. Please, choose another product`,
        );
        return false;
      }
    }
    products.push(product);
  }

  if (actionType === 'edit') {
    for (let i = 0; i < inboundOrderAddProductSelects.length; i++) {
      const inboundOrderAddProductSelect = inboundOrderAddProductSelects[
        i
      ] as HTMLSelectElement;
      const prodId = inboundOrderAddProductSelect.value.toString();

      const ProductQuantityCheck = document.querySelector(
        `#inbound-order-edit-check-quantity-${
          inboundOrderAddProductSelect.options[
            inboundOrderAddProductSelect.selectedIndex
          ].text
        }-hidden`,
      );

      console.log(
        'ProductQuantityCheck',
        ProductQuantityCheck.innerHTML,
        prodId,
        productsQuantities[prodId],
      );

      if (productsQuantities[prodId] > Number(ProductQuantityCheck.innerHTML)) {
        alert(
          `Quantity of product ${
            inboundOrderAddProductSelect.options[
              inboundOrderAddProductSelect.selectedIndex
            ].text
          } in orders can not be more than ${Number(
            ProductQuantityCheck.innerHTML,
          )}`,
        );
        return false;
      } else if (
        productsQuantities[prodId] < Number(ProductQuantityCheck.innerHTML)
      ) {
        alert(
          `Quantity of product ${
            inboundOrderAddProductSelect.options[
              inboundOrderAddProductSelect.selectedIndex
            ].text
          } in orders can not be less than ${Number(
            ProductQuantityCheck.innerHTML,
          )}. Please, allocate all products`,
        );
        return false;
      }
    }
  }

  console.log('productsQuantities', productsQuantities);

  const inputProducts: HTMLInputElement = document.querySelector(
    `#inbound-order-${actionType}-products`,
  );
  inputProducts.value = JSON.stringify(products);
  return true;
}

// ----submit edit form through hidden submit button----
const inboundOrderSubmitButton: HTMLButtonElement = document.querySelector(
  '#inbound-order-submit-btn',
);
const inboundOrderSaveProductsButton = document.querySelector(
  '#inbound-order-save-products-btn',
);

inboundOrderSaveProductsButton.addEventListener('click', () => {
  const result = setProducts('edit');
  if (result) {
    inboundOrderSubmitButton.click();
  }
});

// ----submit add through hidden submit button----
const inboundOrderSubmitAddButton: HTMLButtonElement = document.querySelector(
  '#inbound-order-add-submit-btn',
);
const inboundOrderSaveProductsAddButton = document.querySelector(
  '#inbound-order-save-add-products-btn',
);

inboundOrderSaveProductsAddButton.addEventListener('click', () => {
  setProducts('add');
  inboundOrderSubmitAddButton.click();
});
