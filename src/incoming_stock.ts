import { Modal } from 'flowbite'
import type { ModalOptions, ModalInterface } from 'flowbite'
import { getFullImage } from './base'
import { IInboundOrderOut, IAllocatedProductOut } from './inbound_order/types'

interface SupDAWhProd {
    supplier: string
    delivery_agent: string
    warehouse: string
    product: string
}

interface IPackageInfo {
    quantity_carton_master: number
    quantity_per_wrap: number
    quantity_wrap_carton: number
}

interface IIncomingStockProduct{
    product_id: number,
    quantity_received: number,
    quantity_per_wrap: number,
    quantity_wrap_carton: number,
    quantity_carton_master: number,
    group_id: number,
}
let productGroupQuantity = {} as { [index: string]: number }
let i = 0

const $editModalElement: HTMLElement = document.querySelector('#editIncomingStockModal');
const $viewModalElement: HTMLElement = document.querySelector('#viewIncomingStockModal');
const inputReceivedProducts: HTMLInputElement = document.querySelector('#incoming-stock-edit-received-products');

const editModalOptions: ModalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
        const incomingStocksContainer = document.getElementById('incoming-stock-edit-add-container') as HTMLDivElement;
        console.log(incomingStocksContainer);
        const incomingStockItems = incomingStocksContainer.querySelectorAll('.incoming-stock-product-item');
        console.log(incomingStockItems);
        incomingStockItems.forEach((item) => {
            item.remove()
        });
    },
    onShow: () => {
        console.log('incoming-stock id: ')
    },
    onToggle: () => {
        console.log('modal has been toggled')
    },
}

const viewModalOptions: ModalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
        // const incomingStocksContainer = document.getElementById('incoming-stock-edit-add-container') as HTMLDivElement;
        // const incomingStockItems = incomingStocksContainer.querySelectorAll('.product-incoming-stock-edit-template');
        // console.log(incomingStockItems);
        // incomingStockItems.forEach((item) => {
        //     item.remove()
        // });
    },
    onShow: () => {
        console.log('incoming-stock id: ')
    },
    onToggle: () => {
        console.log('modal has been toggled')
    },
}

const editModal: ModalInterface = new Modal($editModalElement, editModalOptions)
const viewModal: ModalInterface = new Modal($viewModalElement, viewModalOptions)

const $buttonElements = document.querySelectorAll('.accept-incoming-stock-edit-button')
$buttonElements.forEach((e) =>
    e.addEventListener('click', () => {
        const inboundOrder: IInboundOrderOut = JSON.parse(e.getAttribute('data-target'))
        editIncomingStock(inboundOrder)
        //sessionStorage.setItem('inboundOrder', JSON.stringify(inboundOrder))
    })
)

function editIncomingStock(inboundOrder: IInboundOrderOut) {
    let input: HTMLInputElement = document.querySelector('#incoming-stock-edit-id')
    input.value = inboundOrder.orderId;

    inboundOrder.productsAllocated.forEach(productAllocated => {
        createIncomingStockOrderItems(productAllocated);
    })

    editModal.show()
}

function createIncomingStockOrderItems(productAllocated: IAllocatedProductOut) {
    const incomingStockAddContainer = document.querySelector('#incoming-stock-edit-add-container')
    // const incomingStockAddItem = document.createElement('div')
    // incomingStockAddItem.classList.add('p-6', 'space-y-6', 'border-t', 'incoming-stock-edit-add-item')

    const productAllocatedContainer = document.getElementById('product-incoming-stock-edit-template').cloneNode(true) as HTMLDivElement;
    productAllocatedContainer.classList.remove('hidden');
    productAllocatedContainer.classList.add('grid');
    productAllocatedContainer.removeAttribute('id');

    // Set image
    const imageURL = productAllocated.product.image ? `data:image/png;base64, ${productAllocated.product.image}`: 'https://funko.com/on/demandware.static/-/Sites-funko-master-catalog/default/dwbb38a111/images/funko/upload/55998_CocaCola_S2_SpriteBottleCap_POP_GLAM-WEB.png';

    const productImage: HTMLImageElement = productAllocatedContainer.querySelector('.product-incoming-stock-image');
    productImage.setAttribute('src', imageURL);
    productImage.addEventListener('click', () => {
        getFullImage(productAllocated.product.id.toString())
    })

    const productNameDiv = productAllocatedContainer.querySelector('.product-incoming-stock-edit-product-name');
    productNameDiv.innerHTML = productAllocated.product.name;

    const productSKUDiv = productAllocatedContainer.querySelector('.product-incoming-stock-edit-product-sku');
    productSKUDiv.innerHTML = productAllocated.product.SKU;

    const totalAllocatedQuantityDiv = productAllocatedContainer.querySelector('.product-incoming-stock-edit-total-quantity');
    totalAllocatedQuantityDiv.innerHTML = productAllocated.quantity.toString();



    const groupQuantityContainerTemplate = document.getElementById('product-allocated-quantity-container-template') as HTMLDivElement;
    productAllocated.productQuantityGroups.forEach(quantityGroup => {
        const groupQuantityContainer = groupQuantityContainerTemplate.cloneNode(true) as HTMLDivElement;
        groupQuantityContainer.removeAttribute('id');
        groupQuantityContainer.classList.remove('hidden');

        const groupQuantityNameDiv = groupQuantityContainer.querySelector('.product-quantity-group-name');
        groupQuantityNameDiv.innerHTML = quantityGroup.group.name;

        const groupQuantityTotalDiv = groupQuantityContainer.querySelector('.group-ordered-quantity');
        groupQuantityTotalDiv.innerHTML = quantityGroup.quantity.toString();

        const groupQuantityReceivedInput = groupQuantityContainer.querySelector('.group-received-quantity') as HTMLInputElement;
        groupQuantityReceivedInput.value = quantityGroup.quantity.toString();

        productAllocatedContainer.appendChild(groupQuantityNameDiv.parentNode);
        productAllocatedContainer.appendChild(groupQuantityTotalDiv.parentNode);
        productAllocatedContainer.appendChild(groupQuantityReceivedInput.parentNode);
    });

    incomingStockAddContainer.appendChild(productAllocatedContainer);
}

// search flow
const searchInput: HTMLInputElement = document.querySelector('#table-search-incoming-stocks')
const searchInputButton = document.querySelector('#table-search-incoming-stock-button')
if (searchInputButton && searchInput) {
    searchInputButton.addEventListener('click', () => {
        const url = new URL(window.location.href)
        url.searchParams.set('q', searchInput.value)
        window.location.href = `${url.href}`
    })
}
const cancelOrderButtons = document.querySelectorAll('.cancel-incoming-stock-btn')

cancelOrderButtons.forEach((e) => {
    e.addEventListener('click', async () => {
        if (confirm('Are sure?')) {
            let id = e.getAttribute('data-cancel-incoming-stock-id')
            const response = await fetch(`/incoming_stock/cancel/${id}`, {
                method: 'GET',
            })
            if (response.status == 200) {
                location.reload()
            }
        }
    })
})

function setProducts() {
    const incomingStockProducts = document.querySelectorAll('.incoming-stock-product-item')
    const incomingStockProductsQuantity = document.querySelectorAll('.incoming-stock-edit-received-quantity')
    const products: IIncomingStockProduct[] = []

    incomingStockProducts.forEach((incomingStockProduct, i) => {
        const incomingStockQuantity = incomingStockProductsQuantity[i] as HTMLInputElement
        const productId = incomingStockProduct.getAttribute('data-target-product-id')
        const quantityPerWrap = incomingStockProduct.querySelector('.quantity-per-wrap') as HTMLInputElement
        const quantityWrapCarton = incomingStockProduct.querySelector('.quantity-wrap-carton') as HTMLInputElement
        const quantityCartonMaster = incomingStockProduct.querySelector('.quantity-carton-master') as HTMLInputElement

        const product: IIncomingStockProduct = {
            product_id: parseInt(productId),
            quantity_received: parseInt(incomingStockQuantity.value),
            quantity_per_wrap: parseInt(quantityPerWrap.value),
            quantity_wrap_carton: parseInt(quantityWrapCarton.value),
            quantity_carton_master: parseInt(quantityCartonMaster.value),
            group_id: productGroupQuantity[`group_id-${i}`],
        }
        products.push(product)
    })

    inputReceivedProducts.value = JSON.stringify(products)
}

// ----submit form through hidden submit button----
const inboundOrderSubmitButton: HTMLButtonElement = document.querySelector('#incoming-stock-submit-btn')
const inboundOrderSaveProductsButton = document.querySelector('#incoming-stock-save-products-btn')

inboundOrderSaveProductsButton.addEventListener('click', () => {
    setProducts();
    inboundOrderSubmitButton.click()
})

document.addEventListener('DOMContentLoaded', () => {
    // ----accept goods---
    const acceptGoodsSubmitButton: HTMLButtonElement = document.querySelector('#incoming-stock-save-products-btn')
    // ----view modal----
    const viewIncomingStockButtons = document.querySelectorAll('.incoming-stock-view-button') as NodeListOf<HTMLButtonElement>;
    const viewModalOrderId: HTMLDivElement = document.querySelector('#incoming-stock-view-order-id');
    const viewModalOrderTitle: HTMLDivElement = document.querySelector('#incoming-stock-view-order-title');
    const viewModalOrderStatus: HTMLDivElement = document.querySelector('#incoming-stock-view-status');
    const viewModalSupplier: HTMLDivElement = document.querySelector('#incoming-stock-view-supplier-id');
    const viewModalWarehouse: HTMLDivElement = document.querySelector('#incoming-stock-view-warehouse-id');
    const viewModalActiveDate: HTMLDivElement = document.querySelector('#incoming-stock-view-active-date');
    const viewModalActiveTime: HTMLDivElement = document.querySelector('#incoming-stock-view-active-time');
    const viewModalDeliveryDate: HTMLDivElement = document.querySelector('#incoming-stock-view-delivery-date');

    viewIncomingStockButtons.forEach(viewButton =>
        viewButton.addEventListener('click', () => {
            const inboundOrder: IInboundOrderOut = JSON.parse(viewButton.getAttribute('data-target'));
            viewModalOrderId.innerHTML = inboundOrder.orderId;
            viewModalOrderTitle.innerHTML = inboundOrder.title;
            viewModalOrderStatus.innerHTML = inboundOrder.status;
            viewModalSupplier.innerHTML = inboundOrder.supplier.name;
            viewModalWarehouse.innerHTML = inboundOrder.warehouse.name;
            viewModalActiveDate.innerHTML = inboundOrder.activeDate;
            viewModalActiveTime.innerHTML = inboundOrder.activeTime;
            viewModalDeliveryDate.innerHTML = inboundOrder.deliveryDate;
            viewModal.show();
        })
    )
    
    // accept goods submit
    acceptGoodsSubmitButton.addEventListener('click', () => {
        console.log('click');
    })
})


// function viewIncomingStock(inboundOrder: IInboundOrder) {
//     const packageInfo: IPackageInfo = inboundOrder.package_info
//     console.log(inboundOrder)

//     let div: HTMLDivElement = document.querySelector('#incoming-stock-view-order-id')
//     div.innerHTML = inboundOrder.order_id
//     div = document.querySelector('#incoming-stock-view-order-title')
//     div.innerHTML = inboundOrder.order_title
//     div = document.querySelector('#incoming-stock-view-active-date')
//     div.innerHTML = convertDate(inboundOrder.active_date.toString())
//     div = document.querySelector('#incoming-stock-view-active-time')
//     div.innerHTML = inboundOrder.active_time
//     div = document.querySelector('#incoming-stock-view-delivery-date')
//     div.innerHTML = convertDate(inboundOrder.delivery_date.toString())
//     div = document.querySelector('#incoming-stock-view-status')
//     div.innerHTML = inboundOrder.status
//     div = document.querySelector('#incoming-stock-view-supplier-id')
//     div.innerHTML = inboundOrder.sup_da_wh_prod_objs.supplier
//     div = document.querySelector('#incoming-stock-view-warehouse-id')
//     div.innerHTML = inboundOrder.sup_da_wh_prod_objs.warehouse

//     if (Object.keys(inboundOrder.inbound_order_prods).length > 0) {
//         const currentInboundOrder = inboundOrder.inbound_order_prods[inboundOrder.order_id]

//         if (currentInboundOrder) {
//             for (let i = 0; i < currentInboundOrder.length; i++) {
//                 createViewIncomingStockItems(inboundOrder, currentInboundOrder[i])
//             }
//         }
//     }

//     viewModal.show()
// }

// function convertDate(date: string) {
//     const inputDate = date.split('T')[0]
//     const dateParts = inputDate.split('-')
//     const year = dateParts[0]
//     const month = dateParts[1]
//     const day = dateParts[2]
//     return `${month}/${day}/${year}`
// }

// ----add inbound order item----
// function createViewIncomingStockItems(inbOrder: IInboundOrder = null, curInbOrder: IInboundOrderProd = null) {
//     console.log(inbOrder)

//     if (!inbOrder) {
//         const inboundOrder: IInboundOrder = JSON.parse(sessionStorage.getItem('inboundOrder'))
//         inbOrder = inboundOrder
//     }
//     const inboundOrderAddContainer = document.querySelector('#incoming-stock-view-add-container')
//     const inboundOrderAddItem = document.createElement('div')
//     inboundOrderAddItem.classList.add('p-6', 'space-y-6', 'border-t', 'incoming-stock-view-add-item')
//     inboundOrderAddItem.innerHTML = `
//     <div class="grid grid-cols-12 gap-5">
//         <div class="col-span-6 sm:col-span-4">
//             <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product</label>
//             <div
//                 class="incoming-stock-view-add-product shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
//             </div>
//         </div>
//         <div class="col-span-6 sm:col-span-3">
//             <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SKU</label>
//             <div
//                 class="incoming-stock-view-add-SKU shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
//             </div>
//         </div>
//         <div class="col-span-6 sm:col-span-3">
//         <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group</label>
//         <div
//             class="incoming-stock-view-add-group shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
//         </div>
//         </div>
//         <div class="col-span-6 sm:col-span-2">
//         <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
//         <div
//             class="incoming-stock-view-add-quantity shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
//         </div>
//         </div>
//     </div>
//   `

//     const inboundOrderAddProduct: HTMLInputElement = inboundOrderAddItem.querySelector(
//         '.incoming-stock-view-add-product'
//     )
//     const inboundOrderAddSKU: HTMLInputElement = inboundOrderAddItem.querySelector('.incoming-stock-view-add-SKU')
//     const inboundOrderAddGroup: HTMLInputElement = inboundOrderAddItem.querySelector('.incoming-stock-view-add-group')
//     const inboundOrderAddQuantity: HTMLInputElement = inboundOrderAddItem.querySelector(
//         '.incoming-stock-view-add-quantity'
//     )

//     inboundOrderAddProduct.innerHTML = curInbOrder.product.name
//     inboundOrderAddSKU.innerHTML = curInbOrder.product.SKU
//     inboundOrderAddGroup.innerHTML = curInbOrder.group.name
//     inboundOrderAddQuantity.innerHTML = curInbOrder.quantity.toString()

//     inboundOrderAddContainer.appendChild(inboundOrderAddItem)
// }

// // function to filter order by status
// const orderFilterInputs = document.querySelectorAll('.incoming-stock-filter-input')
// const sortByNameIncomingStockStorage = JSON.parse(sessionStorage.getItem('sortByNameIncomingStock'))

// if (sortByNameIncomingStockStorage) {
//     const filterDropdownContainer = document.querySelector('#dropdownRadioButton-incoming-stock-status')
//     filterDropdownContainer.innerHTML = `${sortByNameIncomingStockStorage}
//           <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
//           viewBox="0 0 10 6">
//           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//             d="m1 1 4 4 4-4" />
//         </svg>`
// }

// orderFilterInputs.forEach((input: HTMLInputElement) => {
//     const hiddenInput = document.querySelector('#sort_by') as HTMLInputElement
//     input.addEventListener('change', () => {
//         if (input.checked) {
//             hiddenInput.value = input.value
//             sessionStorage.setItem('sortByNameIncomingStock', JSON.stringify(input.value))
//         }
//     })
// })
