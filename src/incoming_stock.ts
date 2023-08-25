import { Modal } from 'flowbite'
import type { ModalOptions, ModalInterface } from 'flowbite'

interface SupDAWhProd {
    supplier: string
    delivery_agent: string
    warehouse: string
    product: string
}

interface IInboundOrder {
    id: number
    order_id: string
    active_date: number
    active_time: string
    order_title: string
    quantity: number
    delivery_date: string
    status: string
    supplier_id: number
    delivery_agent_id: number
    warehouse_id: number
    product_id: number
    sup_da_wh_prod_objs: SupDAWhProd
    inbound_order_prods: {
        [index: string]: IInboundOrderProd[]
    }
    package_info: IPackageInfo
}

interface IPackageInfo {
    quantity_carton_master: number
    quantity_per_wrap: number
    quantity_wrap_carton: number
}

interface IInboundOrderProd {
    product: { id: number; name: string; SKU: string; image: string }
    group: { id: number; name: string }
    quantity: number
}

let productGroupQuantity = {} as { [index: string]: number }
let i = 0

const $editModalElement: HTMLElement = document.querySelector('#editIncomingStockModal')
const $viewModalElement: HTMLElement = document.querySelector('#viewIncomingStockModal')

const editModalOptions: ModalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
        const incomingStockItems = document.querySelectorAll('.incoming-stock-edit-add-item')
        incomingStockItems.forEach((item) => {
            item.remove()
        })
        sessionStorage.removeItem('inboundOrder')
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
        const incomingStockItems = document.querySelectorAll('.incoming-stock-view-add-item')
        incomingStockItems.forEach((item) => {
            item.remove()
        })
        sessionStorage.removeItem('inboundOrder')
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
        const inboundOrder: IInboundOrder = JSON.parse(e.getAttribute('data-target'))
        editIncomingStock(inboundOrder)
        sessionStorage.setItem('inboundOrder', JSON.stringify(inboundOrder))
    })
)

function editIncomingStock(inboundOrder: IInboundOrder) {
    let input: HTMLInputElement = document.querySelector('#incoming-stock-edit-id')
    input.value = inboundOrder.id.toString()

    if (Object.keys(inboundOrder.inbound_order_prods).length > 0) {
        const currentInboundOrder = inboundOrder.inbound_order_prods[inboundOrder.order_id]

        if (currentInboundOrder) {
            for (let i = 0; i < currentInboundOrder.length; i++) {
                createIncomingStockOrderItems(currentInboundOrder[i])
            }
        }
    }
    editModal.show()
}

function createIncomingStockOrderItems(curInbOrder: IInboundOrderProd) {
    const incomingStockAddContainer = document.querySelector('#incoming-stock-edit-add-container')
    const incomingStockAddItem = document.createElement('div')
    incomingStockAddItem.classList.add('p-6', 'space-y-6', 'border-t', 'incoming-stock-edit-add-item')
    incomingStockAddItem.innerHTML = `
    <div class="incoming-stock-product-item grid grid-cols-12 gap-4" data-target-product-id="${curInbOrder.product.id}" >
      <div class="product-full-image-anchor col-span-6 sm:col-span-4 sm:row-span-2 max-height-image-container">
        <img src="data:image/png;base64, ${curInbOrder.product.image}" class="incoming-stock-edit-product-image w-full h-full object-cover">
      </div>
      <div class="col-span-6 sm:col-span-8">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
        <div
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        ${curInbOrder.product.name}
        </div>
      </div>
      <div class="col-span-6 sm:col-span-8">
        <label for="SKU" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SKU</label>
        <div
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        ${curInbOrder.product.SKU}
        </div>
      </div>
      <div class="col-span-6 sm:col-span-6">
        <label for="package_qty" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Qty. Ordered</label>
        <div
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        ${curInbOrder.quantity}
        </div>
      </div>
      <div class="col-span-6 sm:col-span-6">
        <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Qty. received</label>
        <input type="text" name="received_quantity"
          class="incoming-stock-edit-received-quantity shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Quantity" required>
      </div>
    </div>
  `
    const img: HTMLImageElement = incomingStockAddItem.querySelector('.incoming-stock-edit-product-image')
    const fullImageAnchor = img.closest('.product-full-image-anchor')
    fullImageAnchor.setAttribute('data-target-product-id', product.id.toString())
    if (img.src.length < 100) {
        const defaultBrandImage =
            'https://funko.com/on/demandware.static/-/Sites-funko-master-catalog/default/dwbb38a111/images/funko/upload/55998_CocaCola_S2_SpriteBottleCap_POP_GLAM-WEB.png'
        img.src = defaultBrandImage
    }

    // NOTE: this counter needs to identify group id
    productGroupQuantity[`group_id-${i}`] = curInbOrder.group.id
    i++

    incomingStockAddContainer.appendChild(incomingStockAddItem)
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
    const products = []

    for (let i = 0; i < incomingStockProducts.length; i++) {
        const incomingStockProduct = incomingStockProducts[i] as HTMLDivElement
        const incomingStockQuantity = incomingStockProductsQuantity[i] as HTMLInputElement
        const productId = incomingStockProduct.getAttribute('data-target-product-id')

        const product = {
            product_id: productId,
            quantity_received: incomingStockQuantity.value,
            group_id: productGroupQuantity[`group_id-${i}`],
        }
        products.push(product)
    }

    const inputReceivedProducts: HTMLInputElement = document.querySelector('#incoming-stock-edit-received-products')

    inputReceivedProducts.value = JSON.stringify(products)
}

// ----submit form through hidden submit button----
const inboundOrderSubmitButton: HTMLButtonElement = document.querySelector('#incoming-stock-submit-btn')
const inboundOrderSaveProductsButton = document.querySelector('#incoming-stock-save-products-btn')

inboundOrderSaveProductsButton.addEventListener('click', () => {
    setProducts()
    inboundOrderSubmitButton.click()
})

// ----view modal----
const viewIncomingStockButtons = document.querySelectorAll('.incoming-stock-view-button')
viewIncomingStockButtons.forEach((e) =>
    e.addEventListener('click', () => {
        const inboundOrder: IInboundOrder = JSON.parse(e.getAttribute('data-target'))
        viewIncomingStock(inboundOrder)
    })
)

function viewIncomingStock(inboundOrder: IInboundOrder) {
    const packageInfo: IPackageInfo = inboundOrder.package_info

    let div: HTMLDivElement = document.querySelector('#incoming-stock-view-order-id')
    div.innerHTML = inboundOrder.order_id
    div = document.querySelector('#incoming-stock-view-order-title')
    div.innerHTML = inboundOrder.order_title
    div = document.querySelector('#incoming-stock-view-active-date')
    div.innerHTML = convertDate(inboundOrder.active_date.toString())
    div = document.querySelector('#incoming-stock-view-active-time')
    div.innerHTML = inboundOrder.active_time
    div = document.querySelector('#incoming-stock-view-delivery-date')
    div.innerHTML = convertDate(inboundOrder.delivery_date.toString())
    div = document.querySelector('#incoming-stock-view-status')
    div.innerHTML = inboundOrder.status
    div = document.querySelector('#incoming-stock-view-supplier-id')
    div.innerHTML = inboundOrder.sup_da_wh_prod_objs.supplier
    div = document.querySelector('#incoming-stock-view-delivery-agent-id')
    div.innerHTML = inboundOrder.sup_da_wh_prod_objs.delivery_agent
    div = document.querySelector('#incoming-stock-view-warehouse-id')
    div.innerHTML = inboundOrder.sup_da_wh_prod_objs.warehouse

    div = document.querySelector('#incoming-stock-view-quantity-wrap')
    div.innerHTML = packageInfo.quantity_per_wrap.toString()
    div = document.querySelector('#incoming-stock-view-quantity-wrap-carton')
    div.innerHTML = packageInfo.quantity_wrap_carton.toString()
    div = document.querySelector('#incoming-stock-view-quantity-carton-master')
    div.innerHTML = packageInfo.quantity_carton_master.toString()

    if (Object.keys(inboundOrder.inbound_order_prods).length > 0) {
        const currentInboundOrder = inboundOrder.inbound_order_prods[inboundOrder.order_id]

        if (currentInboundOrder) {
            for (let i = 0; i < currentInboundOrder.length; i++) {
                createViewIncomingStockItems(inboundOrder, currentInboundOrder[i])
            }
        }
    }

    viewModal.show()
}

function convertDate(date: string) {
    const inputDate = date.split('T')[0]
    const dateParts = inputDate.split('-')
    const year = dateParts[0]
    const month = dateParts[1]
    const day = dateParts[2]
    return `${month}/${day}/${year}`
}

// ----add inbound order item----
function createViewIncomingStockItems(inbOrder: IInboundOrder = null, curInbOrder: IInboundOrderProd = null) {
    if (!inbOrder) {
        const inboundOrder: IInboundOrder = JSON.parse(sessionStorage.getItem('inboundOrder'))
        inbOrder = inboundOrder
    }
    const inboundOrderAddContainer = document.querySelector('#incoming-stock-view-add-container')
    const inboundOrderAddItem = document.createElement('div')
    inboundOrderAddItem.classList.add('p-6', 'space-y-6', 'border-t', 'incoming-stock-view-add-item')
    inboundOrderAddItem.innerHTML = `
    <div class="grid grid-cols-12 gap-5">
    <div class="col-span-6 sm:col-span-4">
      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product</label>
      <div
        class="incoming-stock-view-add-product shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>
    </div>
    <div class="col-span-6 sm:col-span-4">
      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group</label>
      <div
        class="incoming-stock-view-add-group shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>
    </div>
    <div class="col-span-6 sm:col-span-4">
      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
      <div
        class="incoming-stock-view-add-quantity shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>
    </div>
  </div>
  `

    const inboundOrderAddProduct: HTMLInputElement = inboundOrderAddItem.querySelector(
        '.incoming-stock-view-add-product'
    )
    const inboundOrderAddGroup: HTMLInputElement = inboundOrderAddItem.querySelector('.incoming-stock-view-add-group')
    const inboundOrderAddQuantity: HTMLInputElement = inboundOrderAddItem.querySelector(
        '.incoming-stock-view-add-quantity'
    )

    inboundOrderAddProduct.innerHTML = curInbOrder.product.name
    inboundOrderAddGroup.innerHTML = curInbOrder.group.name
    inboundOrderAddQuantity.innerHTML = curInbOrder.quantity.toString()

    inboundOrderAddContainer.appendChild(inboundOrderAddItem)
}

// function to filter order by status
const orderFilterInputs = document.querySelectorAll('.incoming-stock-filter-input')
const sortByNameIncomingStockStorage = JSON.parse(sessionStorage.getItem('sortByNameIncomingStock'))

if (sortByNameIncomingStockStorage) {
    const filterDropdownContainer = document.querySelector('#dropdownRadioButton-incoming-stock-status')
    filterDropdownContainer.innerHTML = `${sortByNameIncomingStockStorage}
          <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m1 1 4 4 4-4" />
        </svg>`
}

orderFilterInputs.forEach((input: HTMLInputElement) => {
    const hiddenInput = document.querySelector('#sort_by') as HTMLInputElement
    input.addEventListener('change', () => {
        if (input.checked) {
            hiddenInput.value = input.value
            sessionStorage.setItem('sortByNameIncomingStock', JSON.stringify(input.value))
        }
    })
})
