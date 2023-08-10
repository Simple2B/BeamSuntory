import {Modal} from 'flowbite';
import type {ModalOptions, ModalInterface} from 'flowbite';

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
  quantity: number;
  delivery_date: string;
  status: string;
  supplier_id: number;
  delivery_agent_id: number;
  warehouse_id: number;
  product_id: number;
  sup_da_wh_prod_objs: SupDAWhProd;
  inbound_order_prods: {
    [index: string]: IInboundOrderProd[];
  };
  package_info: IPackageInfo;
}

interface IPackageInfo {
  quantity_carton_master: number;
  quantity_per_wrap: number;
  quantity_wrap_carton: number;
}

interface IInboundOrderProd {
  product: {id: number; name: string; SKU: string; image: string};
  group: {id: number; name: string};
  quantity: number;
}

// search flow
const searchPickupInboundInput: HTMLInputElement = document.querySelector(
  '#table-search-pickup-inbounds',
);
const searchPickupInboundInputButton = document.querySelector(
  '#table-search-pickup-inbound-button',
);
if (searchPickupInboundInputButton && searchPickupInboundInput) {
  searchPickupInboundInputButton.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.set('q', searchPickupInboundInput.value);
    window.location.href = `${url.href}`;
  });
}
const pickupInboundButtons = document.querySelectorAll('.pickup-inbound-btn');

pickupInboundButtons.forEach(e => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-pickup-inbound-id');
      const response = await fetch(`/pickup_inbound/pickup/${id}`, {
        method: 'GET',
      });
      if (response.status == 200) {
        location.reload();
      }
    }
  });
});

// ----view modal----
const $viewModalElement: HTMLElement = document.querySelector(
  '#viewPickupInboundModal',
);

const viewModalOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses:
    'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {
    const productItems = document.querySelectorAll(
      '.pickup-inbound-view-add-item',
    );
    productItems.forEach(item => {
      item.remove();
    });
    sessionStorage.removeItem('inboundOrder');
  },
  onShow: () => {
    console.log('pickup-inbound id: ');
  },
  onToggle: () => {
    console.log('modal has been toggled');
  },
};

const viewModal: ModalInterface = new Modal(
  $viewModalElement,
  viewModalOptions,
);

const viewPickupInboundButtons = document.querySelectorAll(
  '.pickup-inbound-view-button',
);
viewPickupInboundButtons.forEach(e =>
  e.addEventListener('click', () => {
    const inboundOrder: IInboundOrder = JSON.parse(
      e.getAttribute('data-target'),
    );
    viewPickupInbound(inboundOrder);
  }),
);

function viewPickupInbound(inboundOrder: IInboundOrder) {
  const packageInfo: IPackageInfo = inboundOrder.package_info;

  let div: HTMLDivElement = document.querySelector(
    '#pickup-inbound-view-order-id',
  );
  div.innerHTML = inboundOrder.order_id;
  div = document.querySelector('#pickup-inbound-view-order-title');
  div.innerHTML = inboundOrder.order_title;
  div = document.querySelector('#pickup-inbound-view-active-date');
  div.innerHTML = convertDate(inboundOrder.active_date.toString());
  div = document.querySelector('#pickup-inbound-view-active-time');
  div.innerHTML = inboundOrder.active_time;
  div = document.querySelector('#pickup-inbound-view-delivery-date');
  div.innerHTML = convertDate(inboundOrder.delivery_date.toString());
  div = document.querySelector('#pickup-inbound-view-status');
  div.innerHTML = inboundOrder.status;
  div = document.querySelector('#pickup-inbound-view-supplier-id');
  div.innerHTML = inboundOrder.sup_da_wh_prod_objs.supplier;
  div = document.querySelector('#pickup-inbound-view-delivery-agent-id');
  div.innerHTML = inboundOrder.sup_da_wh_prod_objs.delivery_agent;
  div = document.querySelector('#pickup-inbound-view-warehouse-id');
  div.innerHTML = inboundOrder.sup_da_wh_prod_objs.warehouse;

  div = document.querySelector('#pickup-inbound-view-quantity-wrap');
  div.innerHTML = packageInfo.quantity_per_wrap.toString();
  div = document.querySelector('#pickup-inbound-view-quantity-wrap-carton');
  div.innerHTML = packageInfo.quantity_wrap_carton.toString();
  div = document.querySelector('#pickup-inbound-view-quantity-carton-master');
  div.innerHTML = packageInfo.quantity_carton_master.toString();

  if (Object.keys(inboundOrder.inbound_order_prods).length > 0) {
    const currentInboundOrder =
      inboundOrder.inbound_order_prods[inboundOrder.order_id];

    if (currentInboundOrder) {
      for (let i = 0; i < currentInboundOrder.length; i++) {
        createViewPickupInboundOrderItems(inboundOrder, currentInboundOrder[i]);
      }
    }
  }

  viewModal.show();
}

function convertDate(date: string) {
  const inputDate = date.split('T')[0];
  const dateParts = inputDate.split('-');
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];
  return `${month}/${day}/${year}`;
}

// ----add inbound order item----
function createViewPickupInboundOrderItems(
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
    '#pickup-inbound-view-add-container',
  );
  const inboundOrderAddItem = document.createElement('div');
  inboundOrderAddItem.classList.add(
    'p-6',
    'space-y-6',
    'border-t',
    'pickup-inbound-view-add-item',
  );
  inboundOrderAddItem.innerHTML = `
    <div class="grid grid-cols-12 gap-5">
    <div class="col-span-6 sm:col-span-4">
      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product</label>
      <div
        class="pickup-inbound-view-add-product shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>
    </div>
    <div class="col-span-6 sm:col-span-4">
      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group</label>
      <div
        class="pickup-inbound-view-add-group shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>
    </div>
    <div class="col-span-6 sm:col-span-4">
      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
      <div
        class="pickup-inbound-view-add-quantity shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>
    </div>
  </div>
  `;

  const inboundOrderAddProduct: HTMLInputElement =
    inboundOrderAddItem.querySelector('.pickup-inbound-view-add-product');
  const inboundOrderAddGroup: HTMLInputElement =
    inboundOrderAddItem.querySelector('.pickup-inbound-view-add-group');
  const inboundOrderAddQuantity: HTMLInputElement =
    inboundOrderAddItem.querySelector('.pickup-inbound-view-add-quantity');

  inboundOrderAddProduct.innerHTML = curInbOrder.product.name;
  inboundOrderAddGroup.innerHTML = curInbOrder.group.name;
  inboundOrderAddQuantity.innerHTML = curInbOrder.quantity.toString();

  inboundOrderAddContainer.appendChild(inboundOrderAddItem);
}

// function to filter order by status
const orderFilterPickupInboundInputs = document.querySelectorAll(
  '.pickup-inbound-filter-input',
);
const sortByNamePickupInboundStorage = JSON.parse(
  sessionStorage.getItem('sortByNamePickupInbound'),
);

if (sortByNamePickupInboundStorage) {
  const filterDropdownContainer = document.querySelector(
    '#dropdownRadioButton-pickup-inbound-status',
  );
  filterDropdownContainer.innerHTML = `${sortByNamePickupInboundStorage}
          <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m1 1 4 4 4-4" />
        </svg>`;
}

orderFilterPickupInboundInputs.forEach((input: HTMLInputElement) => {
  const hiddenInput = document.querySelector('#sort_by') as HTMLInputElement;
  input.addEventListener('change', () => {
    if (input.checked) {
      hiddenInput.value = input.value;
      sessionStorage.setItem(
        'sortByNamePickupInbound',
        JSON.stringify(input.value),
      );
    }
  });
});
