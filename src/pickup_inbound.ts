import { Modal } from 'flowbite'
import type { ModalOptions, ModalInterface } from 'flowbite'
import { IInboundOrderOut, IProductAllocatedBase } from './inbound_order/types'

// ----view modal----
const $viewModalElement: HTMLElement = document.querySelector('#viewPickupInboundModal')

const viewModalClosingButton: HTMLButtonElement = document.querySelector('#buttonClosingViewPickupInboundModal')
viewModalClosingButton.addEventListener('click', () => {
    viewModal.hide()
})

const viewModalOptions: ModalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
        const productItems = document.querySelectorAll('.pickup-inbound-view-add-item')
        productItems.forEach((item) => {
            item.remove()
        })
        sessionStorage.removeItem('inboundOrder')
    },
    onShow: () => {
        console.log('pickup-inbound id: ')
    },
    onToggle: () => {
        console.log('modal has been toggled')
    },
}

const viewModal: ModalInterface = new Modal($viewModalElement, viewModalOptions)

// function to filter order by status
const orderFilterPickupInboundInputs = document.querySelectorAll('.pickup-inbound-filter-input')
const sortByNamePickupInboundStorage = JSON.parse(sessionStorage.getItem('sortByNamePickupInbound'))

if (sortByNamePickupInboundStorage) {
    const filterDropdownContainer = document.querySelector('#dropdownRadioButton-pickup-inbound-status')
    const [entityName , filteredStatusValue] = sortByNamePickupInboundStorage.split('.')
    filterDropdownContainer.innerHTML = `${filteredStatusValue}
          <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m1 1 4 4 4-4" />
        </svg>`
}

orderFilterPickupInboundInputs.forEach((input: HTMLInputElement) => {
    const hiddenInput = document.querySelector('#sort_by') as HTMLInputElement
    input.addEventListener('change', () => {
        if (input.checked) {
            hiddenInput.value = input.value
            sessionStorage.setItem('sortByNamePickupInbound', JSON.stringify(input.value))
        }
    })
})

const pickupInboundSearchButton= document.querySelector('#table-search-pickup-inbound-button')
pickupInboundSearchButton.addEventListener('click', () => {
    const searchInput = document.querySelector('#table-search-pickup-inbounds') as HTMLInputElement
    console.log(searchInput.value)
    const url = new URL(window.location.href)
    const params = new URLSearchParams(url.search)
    params.set('q', searchInput.value)
    window.location.href = `${url.origin}${url.pathname}?${params.toString()}`    
})

document.addEventListener('DOMContentLoaded', () => {
    // open view modal
    const buttonsOpenViewModal: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.pickup-inbound-view-button')
    const inboundOrderId: HTMLInputElement = document.querySelector('#pickup-inbound-view-inbound-order-id')
    const orderIdView: HTMLDivElement = document.querySelector('#pickup-inbound-view-order-id')
    const orderTitleView: HTMLDivElement = document.querySelector('#pickup-inbound-view-order-title')
    const orderStatusView: HTMLDivElement = document.querySelector('#pickup-inbound-view-status')
    const orderSupplierNameView: HTMLDivElement = document.querySelector('#pickup-inbound-view-supplier-id')
    const orderSupplierAddressView: HTMLDivElement = document.querySelector('#pickup-inbound-view-supplier-address')
    const orderWarehouseView: HTMLDivElement = document.querySelector('#pickup-inbound-view-warehouse-id')
    const orderActiveDateView: HTMLDivElement = document.querySelector('#pickup-inbound-view-active-date')
    const orderActiveTimeView: HTMLDivElement = document.querySelector('#pickup-inbound-view-active-time')
    const orderDeliveryDateView: HTMLDivElement = document.querySelector('#pickup-inbound-view-delivery-date')
    const wmNotesView: HTMLInputElement = document.querySelector('#pickup-inbound-view-wm-notes')
    const daNotesView: HTMLInputElement = document.querySelector('#pickup-inbound-view-da-notes')
    const pickupInboundButton: HTMLDivElement = document.querySelector('.pickup-inbound-btn')

    const orderProductAllocatedBaseView: HTMLDivElement = document.querySelector('#product-allocated-container');
    const orderProductContainerView: HTMLDivElement = document.querySelector('#pickup-inbound-product-container');

    buttonsOpenViewModal.forEach((button) => {
        button.addEventListener('click', () => {
            const inboundOrder: IInboundOrderOut = JSON.parse(button.getAttribute('data-target'))
            inboundOrderId.value = inboundOrder.id.toString()
            orderIdView.innerHTML = inboundOrder.orderId
            orderTitleView.innerHTML = inboundOrder.title
            orderStatusView.innerHTML = inboundOrder.status
            orderSupplierNameView.innerHTML = inboundOrder.supplier.name
            orderSupplierAddressView.innerHTML = inboundOrder.supplier.address
            orderWarehouseView.innerHTML = inboundOrder.warehouse.name
            orderActiveDateView.innerHTML = inboundOrder.activeDate
            orderActiveTimeView.innerHTML = inboundOrder.activeTime
            orderDeliveryDateView.innerHTML = inboundOrder.deliveryDate
            wmNotesView.value = inboundOrder.wmNotes
            daNotesView.value = inboundOrder.daNotes

            const previousProducts = orderProductContainerView.querySelectorAll('#product-allocated-container');
            previousProducts.forEach((previousProduct) => {
                previousProduct.remove();
            })

            inboundOrder.productsAllocated.forEach((productsAllocated) => {
                const productAllocatedContainer = orderProductAllocatedBaseView.cloneNode(true) as HTMLDivElement;
                productAllocatedContainer.classList.remove('hidden');
                productAllocatedContainer.classList.add('grid');
                 
                const orderProductNamesView: HTMLDivElement = productAllocatedContainer.querySelector('#pickup-inbound-view-product-name');
                const orderProductQuantitiesView: HTMLDivElement = productAllocatedContainer.querySelector('#pickup-inbound-view-product-quantity');
                const orderProductSkuView: HTMLDivElement = productAllocatedContainer.querySelector('#pickup-inbound-view-product-sku');

                orderProductNamesView.innerHTML = productsAllocated.product.name;
                orderProductQuantitiesView.innerHTML = productsAllocated.quantity.toString();
                orderProductSkuView.innerHTML = productsAllocated.product.SKU;
                
                orderProductContainerView.appendChild(productAllocatedContainer);                           
            })
            

            if (inboundOrder.status !== 'Assigned to pickup') {
                pickupInboundButton.classList.add('invisible')
            } else {
                // Pickup order
                pickupInboundButton.classList.remove('invisible')
                pickupInboundButton.setAttribute('data-target', inboundOrder.id.toString())
            }
            viewModal.show()
        })
    })
})
