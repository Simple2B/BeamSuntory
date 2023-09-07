import { Input, Timepicker, initTE } from 'tw-elements'
import { IInboundOrderBase } from './types';
import { initAddInboundOrderModal } from './add';
import { initViewInboundOrderModal } from './view';
import {initEditOrderModal} from './edit';
import Datepicker from 'flowbite-datepicker/Datepicker';

initTE({ Input, Timepicker })

const $buttonElements = document.querySelectorAll('.inbound-order-edit-button');
$buttonElements.forEach((e) =>
    e.addEventListener('click', () => {
        const inboundOrder: IInboundOrderBase = JSON.parse(e.getAttribute('data-target'))
    })
);

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