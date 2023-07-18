import {Modal} from 'flowbite';
import type {ModalOptions, ModalInterface} from 'flowbite';

// /*
//  * $editInboundOrderModal: required
//  * options: optional
//  */

// // For your js code

interface IInboundOrder {
  id: number;
  order_id: string;
  active_date: string;
  active_time: string;
  order_title: string;
  quantity: number;
  delivery_date: string;
  status: string;
  supplier_id: number;
  delivery_agent_id: number;
  warehouse_id: number;
  product_id: number;
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
    console.log('modal is hidden');
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
    editInboundOrder(JSON.parse(e.getAttribute('data-target')));
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
    '#inbound-order-edit-order_id',
  );
  input.value = inboundOrder.order_id;
  input = document.querySelector('#inbound-order-edit-id');
  input.value = inboundOrder.id.toString();
  input = document.querySelector('#inbound-order-edit-active_date');
  input.value = inboundOrder.active_date;
  input = document.querySelector('#inbound-order-edit-active_time');
  input.value = inboundOrder.active_time;
  input = document.querySelector('#inbound-order-edit-order_title');
  input.value = inboundOrder.order_title;
  input = document.querySelector('#inbound-order-edit-quantity');
  input.value = inboundOrder.quantity.toString();
  input = document.querySelector('#inbound-order-edit-delivery_date');
  input.value = inboundOrder.delivery_date;
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
    div.innerHTML = inboundOrder.active_date;
    div = document.querySelector('#inbound-order-view-active_time');
    div.innerHTML = inboundOrder.active_time;
    div = document.querySelector('#inbound-order-view-order_title');
    div.innerHTML = inboundOrder.order_title;
    div = document.querySelector('#inbound-order-view-quantity');
    div.innerHTML = inboundOrder.quantity.toString();
    div = document.querySelector('#inbound-order-view-delivery_date');
    div.innerHTML = inboundOrder.delivery_date;
    div = document.querySelector('#inbound-order-view-status');
    div.innerHTML = inboundOrder.status;
    div = document.querySelector('#inbound-order-view-supplier_id');
    div.innerHTML = inboundOrder.supplier_id.toString();
    div = document.querySelector('#inbound-order-view-delivery_agent_id');
    div.innerHTML = inboundOrder.delivery_agent_id.toString();
    div = document.querySelector('#inbound-order-view-warehouse_id');
    div.innerHTML = inboundOrder.warehouse_id.toString();
    div = document.querySelector('#inbound-order-view-product_id');
    div.innerHTML = inboundOrder.product_id.toString();
  }),
);
