import { Input, Timepicker, initTE } from 'tw-elements'
import { IInboundOrderBase } from './types';
import { initAddInboundOrderModal } from './add';
import { initViewInboundOrderModal } from './view';
import {initEditOrderModal} from './edit';
import Datepicker from 'flowbite-datepicker/Datepicker';
import { easepick } from '@easepick/bundle';

initTE({ Input, Timepicker })

const $buttonElements = document.querySelectorAll('.inbound-order-edit-button');
$buttonElements.forEach((e) =>
    e.addEventListener('click', () => {
        const inboundOrder: IInboundOrderBase = JSON.parse(e.getAttribute('data-target'))
    })
);

const pickerInline = document.querySelector('#timepicker-inline-12')
const timepickerMaxMin = new Timepicker(pickerInline, {
    format12: true,
    inline: true,
})

// search flow
const searchInput: HTMLInputElement = document.querySelector('#table-search-inbound-orders');
const searchInputButton = document.querySelector('#table-search-inbound-order-button');
if (searchInputButton && searchInput) {
    searchInputButton.addEventListener('click', () => {
        const url = new URL(window.location.href);
        url.searchParams.set('q', searchInput.value);
        window.location.href = `${url.href}`;
    })
}
const deleteButtons = document.querySelectorAll('.delete-inbound-order-btn');

deleteButtons.forEach((e) => {
    e.addEventListener('click', async () => {
        if (confirm('Are sure?')) {
            let id = e.getAttribute('data-inbound-order-id')
            const response = await fetch(`/inbound_order/delete/${id}`, {
                method: 'DELETE',
            })
            if (response.status == 200) {
                location.reload()
            }
        }
    })
})


const { DateTime } = easepick;
function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  function getFirstAndLastDate() {
    const today = new Date();
    const dateArray = [];
  
    for (let i = -5; i <= 5; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      dateArray.push(formatDate(currentDate));
    }
  
    const firstDate = dateArray[0];
    const lastDate = dateArray[dateArray.length - 1];
  
    return [firstDate, lastDate];
  }
  
  const bookedDates = [getFirstAndLastDate()].map(d => {
    if (d instanceof Array) {
      const start = new Date(d[0]);
      const end = new Date(d[1]);
      return [start, end];
    }
    return new DateTime(d, 'YYYY-MM-DD');
  });
  
  // Create the datepicker using easepick
  const picker = new easepick.create({
    element: document.getElementById('datepicker'),
    css: [
      'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
      'https://easepick.com/css/demo_hotelcal.css',
    ],
    plugins: ['RangePlugin', 'LockPlugin'],
    RangePlugin: {
      tooltipNumber(num: number) {
        return num - 1;
      },
    },
    LockPlugin: {
      minDate: new Date(),
      minDays: 2,
      inseparable: true,
      filter(date: any, picked: any) {
        if (picked.length === 1) {
          const incl = date.isBefore(picked[0]) ? '[)' : '(]';
          return !picked[0].isSame(date, 'day') && date.inArray(bookedDates, incl);
        }
        return date.inArray(bookedDates, '[)');
      },
    },
  });


















const openCurrentOrder = () =>{
  const urlParams = new URLSearchParams(window.location.search);
  const orderUuid = urlParams.get('current_order_uuid');
  console.log(orderUuid);
  if(!orderUuid){
    return;
  }

  const orderColumn = document.querySelector(`#inbound-order-${orderUuid}`);

  if (!orderColumn) {
    return;
  }

  const orderEditButton = orderColumn.querySelector('.inbound-order-edit-button') as HTMLButtonElement;
  orderEditButton.click();  
}

const deleteAllocatedProduct = (e: MouseEvent) => {
    const productAllocatedContainer = (e.currentTarget as HTMLSpanElement).parentNode as HTMLDivElement;
    const productsAllocatedContainer = productAllocatedContainer.parentNode as HTMLDivElement;

    productAllocatedContainer.remove()
    console.log(productsAllocatedContainer.children.length)
    if (productsAllocatedContainer.children.length == 2) {
        const productAllocatedDeleteButton = productsAllocatedContainer.querySelector('.product-allocated-delete-button');
        console.log(productAllocatedDeleteButton)
        productAllocatedDeleteButton.classList.add('invisible');
    }
}

const createAllocationProductContainer = (e: MouseEvent) => {
    const btn = e.currentTarget as HTMLButtonElement;
    const productAllocatedContainer = document.querySelector('.product-allocated').parentNode as HTMLDivElement;

    if(productAllocatedContainer.parentNode.children.length == 2){
        const buttonRemoveProductAllocated = productAllocatedContainer.querySelector('.product-allocated-delete-button');
        buttonRemoveProductAllocated.classList.remove('invisible');
    }

    const productAllocatedNew = productAllocatedContainer.cloneNode(true) as HTMLDivElement;
    // Clear inputs
    productAllocatedNew.querySelectorAll('input').forEach(input => {
        input.value = '';
    })

    const buttonDeleteAllocatedProduct = productAllocatedNew.querySelector('.product-allocated-delete-button');
    buttonDeleteAllocatedProduct.addEventListener('click', deleteAllocatedProduct);

    const productsAllocatedContainer = btn.parentNode.parentNode as HTMLDivElement;

    productsAllocatedContainer.insertBefore(productAllocatedNew, btn.parentNode);
    addDateRangePicker();
}

// # NOTE: depends on flash from create route on inbound_order_blueprint
document.addEventListener('DOMContentLoaded', () => {
    // view order
    initViewInboundOrderModal();
    // Add new inbound order handler
    initAddInboundOrderModal();
    // Add edit inbound order handler
    initEditOrderModal()
  
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

    const datepickerStart = new Datepicker(currentShelfLifeStart, {})
    const datepickerEnd = new Datepicker(currentShelfLifeEnd, {})
}  