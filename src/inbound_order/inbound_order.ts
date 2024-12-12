import { Input, Timepicker, initTE } from 'tw-elements';
import { IInboundOrderBase } from '../types';
import { initAddInboundOrderModal } from './add';
import { initEditOrderModal } from './edit';
import { easepick } from '@easepick/bundle';
import Datepicker from 'flowbite-datepicker/Datepicker';
import { addDeleteEvent, addSearchEvent } from '../utils';

//global variables for datepicker
const currentDate = new Date();
const fiveDays = 5 * 24 * 60 * 60 * 1000;

initTE({ Input, Timepicker });

const $buttonElements = document.querySelectorAll('.inbound-order-edit-button');
$buttonElements.forEach((e) =>
  e.addEventListener('click', () => {
    const inboundOrder: IInboundOrderBase = JSON.parse(e.getAttribute('data-target'));
  })
);

const pickerInline = document.querySelector('#timepicker-inline-12');
const timepickerMaxMin = new Timepicker(pickerInline, {
  format12: true,
  inline: true,
});

// search flow
const searchInput: HTMLInputElement = document.querySelector('#table-search-inbound-orders');
const searchInputButton = document.querySelector('#table-search-inbound-order-button');
addSearchEvent(searchInput, searchInputButton);

const deleteButtons = document.querySelectorAll('.delete-inbound-order-btn');

deleteButtons.forEach((e) => {
  addDeleteEvent(e, `/inbound_order/delete/${e.getAttribute('data-inbound-order-id')}`);
});

const openCurrentOrder = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const orderUuid = urlParams.get('current_order_uuid');
  if (!orderUuid) {
    return;
  }

  const orderColumn = document.querySelector(`#inbound-order-${orderUuid}`);

  if (!orderColumn) {
    return;
  }

  const orderEditButton = orderColumn.querySelector('.inbound-order-edit-button') as HTMLButtonElement;
  orderEditButton.click();
};

const deleteAllocatedProduct = (e: MouseEvent) => {
  const productAllocatedContainer = (e.currentTarget as HTMLSpanElement).parentNode as HTMLDivElement;
  const productsAllocatedContainer = productAllocatedContainer.parentNode as HTMLDivElement;

  productAllocatedContainer.remove();
  if (productsAllocatedContainer.children.length == 2) {
    const productAllocatedDeleteButton = productsAllocatedContainer.querySelector('.product-allocated-delete-button');
    productAllocatedDeleteButton.classList.add('invisible');
  }
};

const createAllocationProductContainer = (e: MouseEvent) => {
  const btn = e.currentTarget as HTMLButtonElement;
  const productAllocatedContainer = document.querySelector('.product-allocated').parentNode as HTMLDivElement;

  if (productAllocatedContainer.parentNode.children.length == 2) {
    const buttonRemoveProductAllocated = productAllocatedContainer.querySelector('.product-allocated-delete-button');
    buttonRemoveProductAllocated.classList.remove('invisible');
  }

  const productAllocatedNew = productAllocatedContainer.cloneNode(true) as HTMLDivElement;
  // Clear inputs
  productAllocatedNew.querySelectorAll('input').forEach((input) => {
    input.value = '';
  });

  const buttonDeleteAllocatedProduct = productAllocatedNew.querySelector('.product-allocated-delete-button');
  buttonDeleteAllocatedProduct.addEventListener('click', deleteAllocatedProduct);

  const productsAllocatedContainer = btn.parentNode.parentNode as HTMLDivElement;

  productsAllocatedContainer.insertBefore(productAllocatedNew, btn.parentNode);
  addDateRangePicker();
};

// # NOTE: depends on flash from create route on inbound_order_blueprint
document.addEventListener('DOMContentLoaded', () => {
  // Add new inbound order handler
  initAddInboundOrderModal();
  // Add edit inbound order handler
  initEditOrderModal();

  const buttonAllocateProduct = document.getElementById('inbound-order-allocate-product-btn') as HTMLButtonElement;
  buttonAllocateProduct.addEventListener('click', createAllocationProductContainer);

  const buttonDeleteAllocatedProduct = document.querySelector('.product-allocated-delete-button');
  buttonDeleteAllocatedProduct.addEventListener('click', deleteAllocatedProduct);

  // Open current order
  openCurrentOrder();
});

const addDateRangePicker = () => {
  const shelfLifeStartElements = document.querySelectorAll('#datepickerEl-start-add-1');
  const shelfLifeEndElements = document.querySelectorAll('#datepickerEl-end-add-1');
  const currentShelfLifeStart = shelfLifeStartElements[shelfLifeStartElements.length - 1] as HTMLInputElement;
  const currentShelfLifeEnd = shelfLifeEndElements[shelfLifeEndElements.length - 1] as HTMLInputElement;

  const datepickerStart = new Datepicker(currentShelfLifeStart, {});
  const datepickerEnd = new Datepicker(currentShelfLifeEnd, {});
};

// filter flow
const filterButton = document.querySelector('#inbound-order-filter-button') as HTMLButtonElement;
const orderFilterInputs = document.querySelectorAll('.inbound-order-filter-input');
const hiddenInput = document.querySelector('#sort_by') as HTMLInputElement;

filterButton.addEventListener('click', () => {
  orderFilterInputs.forEach((input: HTMLInputElement) => {
    if (input.checked && input.nextElementSibling.textContent.trim() != 'Default Value') {
      hiddenInput.value = input.nextElementSibling.textContent.trim();
    }
  });
});

const todayDateTime = new Date().toISOString();
const activeTimeInput = document.querySelector('#inbound-order-add-active_time') as HTMLInputElement;

const currentTime = new Date().toLocaleTimeString();
const hours = parseInt(currentTime.split(':')[0]);
const minutes = parseInt(currentTime.split(':')[1]);
const amOrPm = hours >= 12 ? 'PM' : 'AM';
const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
const formattedMinutes = minutes.toString().padStart(2, '0');
activeTimeInput.value = `${formattedHours}:${formattedMinutes} ${amOrPm}`;

const datePickers = document.querySelectorAll('.inbound-order-datepicker');
datePickers.forEach((datePicker: HTMLInputElement) => {
  datePicker.value = todayDateTime.split('T')[0];
  const picker = new easepick.create({
    element: datePicker,
    css: [
      'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
      'https://easepick.com/css/demo_hotelcal.css',
    ],
    plugins: ['LockPlugin'],
    LockPlugin: {
      minDate: new Date(),
      minDays: 1,
      inseparable: true,
    },
    zIndex: 4,
  });
});
