import { Modal } from 'flowbite'
import type { ModalOptions, ModalInterface } from 'flowbite'

const EventsGroup = 'Events'

interface IEvent {
  dateFrom: string
  dateTo: string
}

interface IStore {
  id: number
  storeName: string
  address: string
  phoneNumb: string
  country: string
  region: string
  city: string
  zip: string
}
interface ICart {
  product: IProduct
  group: string
  quantity: number
  event?: IEvent
  warehouse?: IWarehouse
}

export interface IShipRequest {
  id: number
  orderNumb: string
  status: string
  orderType: string
  storeId: number
  warehouseId: number
  warehouseName: string
  createdAt: string
  quantity: number
  current_order_carts: IProduct[]
  comment: string
  wmNotes: string
  daNotes: string
  carts: ICart[]
  store: IStore
}

interface IProduct {
  id: number
  name: string
  quantity: string
  regularPrice: number
  retailPrice: number
  image: string
  SKU: string
  comment: string
  group: string
  warehouse: { id: number; name: string }
  warehouses: IWarehouse[]
}

interface IWarehouse {
  id: number
  name: string
  products_ids: number[]
}

// search flow
const searchOutgoingInput: HTMLInputElement = document.querySelector('#table-search-outgoing-stock')
const searchOutgoingInputButton = document.querySelector('#table-search-outgoing-stock-button')
if (searchOutgoingInputButton && searchOutgoingInput) {
  searchOutgoingInputButton.addEventListener('click', () => {
    const url = new URL(window.location.href)
    url.searchParams.set('q', searchOutgoingInput.value)
    window.location.href = `${url.href}`
  })
}
const dispatchButtons = document.querySelectorAll('.dispatch-outgoing-stock-btn')

dispatchButtons.forEach((e) => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-outgoing-stock-id')
      const response = await fetch(`/outgoing_stock/dispatch/${id}`, {
        method: 'GET',
      })
      if (response.status == 200) {
        location.reload()
      }
    }
  })
})

const cancelButtons = document.querySelectorAll('.cancel-outgoing-stock-btn')

cancelButtons.forEach((e) => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-outgoing-stock-id')
      const response = await fetch(`/outgoing_stock/cancel/${id}`, {
        method: 'GET',
      })
      if (response.status == 200) {
        location.reload()
      }
    }
  })
})

const $modalViewElement: HTMLElement = document.querySelector('#view-outgoing-stock-modal')

const $modalEditElement: HTMLElement = document.querySelector('#edit-outgoing-stock-modal')

const modalViewOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {
    console.log('modal is hidden')
    const tableShipRequestBody = document.querySelector('#table-outgoing-stock-body-view')
    while (tableShipRequestBody.firstChild) {
      tableShipRequestBody.removeChild(tableShipRequestBody.firstChild)
    }
  },
  onShow: () => {},
  onToggle: () => {
    console.log('modal has been toggled')
  },
}

const modalEditOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {
    console.log('modal is hidden')
    const tableShipRequestBody = document.querySelector('#table-outgoing-stock-body-edit')
    while (tableShipRequestBody.firstChild) {
      tableShipRequestBody.removeChild(tableShipRequestBody.firstChild)
    }
  },
  onShow: () => {},
  onToggle: () => {
    console.log('modal has been toggled')
  },
}

const viewModal: ModalInterface = new Modal($modalViewElement, modalViewOptions)

const editModal: ModalInterface = new Modal($modalEditElement, modalEditOptions)

// ----view modal-----
const viewOutgoingStockButtonElements = document.querySelectorAll('.outgoing-stock-view-button')
viewOutgoingStockButtonElements.forEach((e) =>
  e.addEventListener('click', () => {
    const shipRequest: IShipRequest = JSON.parse(e.getAttribute('data-target'))

    let div: HTMLDivElement = document.querySelector('#outgoing-stock-view-order-number')
    div.innerHTML = shipRequest.orderNumb
    div = document.querySelector('#outgoing-stock-view-status')
    div.innerHTML = shipRequest.status
    div = document.querySelector('#outgoing-stock-view-created-date')
    div.innerHTML = shipRequest.createdAt.slice(0, 10)
    div = document.querySelector('#outgoing-stock-view-type')
    div.innerHTML = shipRequest.orderType
    div = document.querySelector('#outgoing-stock-view-warehouse-name')
    div.innerHTML = shipRequest.warehouseName || 'No Warehouse'
    div = document.querySelector('#outgoing-stock-view-comment')
    div.innerHTML = shipRequest.comment
    div = document.querySelector('#outgoing-stock-view-da_notes')
    shipRequest.daNotes ? (div.innerHTML = shipRequest.daNotes) : (div.innerHTML = 'No notes')
    div = document.querySelector('#outgoing-stock-view-store')
    div.innerHTML = shipRequest.store.storeName
    div = document.querySelector('#outgoing-stock-view-store_address')
    div.innerHTML = shipRequest.store.address
    div = document.querySelector('#outgoing-stock-view-store_phone')
    div.innerHTML = shipRequest.store.phoneNumb
    div = document.querySelector('#outgoing-stock-view-store_country')
    div.innerHTML = shipRequest.store.country
    div = document.querySelector('#outgoing-stock-view-store_province')
    div.innerHTML = shipRequest.store.region
    div = document.querySelector('#outgoing-stock-view-store_city')
    div.innerHTML = shipRequest.store.city
    div = document.querySelector('#outgoing-stock-view-store_zip_code')
    div.innerHTML = shipRequest.store.zip

    let input: HTMLInputElement = document.querySelector('#outgoing-stock-view-id')
    input.value = shipRequest.id.toString()
    input = document.querySelector('#outgoing-stock-view-wm_notes')
    input.value = shipRequest.wmNotes

    createOutgoingStockItemTable(shipRequest, 'view')
    viewModal.show()
  })
)

// -----edit modal------
const $buttonEditElements = document.querySelectorAll('.outgoing-stock-edit-button')
$buttonEditElements.forEach((e) =>
  e.addEventListener('click', () => {
    editShipRequest(JSON.parse(e.getAttribute('data-target')), JSON.parse(e.getAttribute('data-target-store')))
  })
)

function editShipRequest(shipRequest: IShipRequest, store: IStore) {
  let input: HTMLInputElement = document.querySelector('#outgoing-stock-edit-status')
  input.value = shipRequest.status
  input = document.querySelector('#outgoing-stock-edit-id')
  input.value = shipRequest.id.toString()
  input = document.querySelector('#outgoing-stock-edit-store')
  input.value = shipRequest.storeId.toString()
  input = document.querySelector('#outgoing-stock-edit-status')
  input.value = shipRequest.status
  input = document.querySelector('#outgoing-stock-edit-wm_notes')
  shipRequest.wmNotes ? (input.value = shipRequest.wmNotes) : (input.value = '')
  input = document.querySelector('#outgoing-stock-edit-da_notes')
  shipRequest.daNotes ? (input.value = shipRequest.daNotes) : (input.value = '')

  let div: HTMLDivElement = document.querySelector('#outgoing-stock-edit-order-number')
  div.innerHTML = shipRequest.orderNumb
  div = document.querySelector('#outgoing-stock-edit-store')
  div.innerHTML = shipRequest.store.storeName
  div = document.querySelector('#outgoing-stock-edit-type')
  div.innerHTML = shipRequest.orderType
  div = document.querySelector('#outgoing-stock-edit-created-date')
  div.innerHTML = shipRequest.createdAt.slice(0, 10)
  div = document.querySelector('#outgoing-stock-edit-comment')
  div.innerHTML = shipRequest.comment
  div = document.querySelector('#outgoing-stock-edit-store_address')
  div.innerHTML = store.address
  div = document.querySelector('#outgoing-stock-edit-store_phone')
  div.innerHTML = shipRequest.store.phoneNumb
  div = document.querySelector('#outgoing-stock-edit-store_country')
  div.innerHTML = store.country
  div = document.querySelector('#outgoing-stock-edit-store_province')
  div.innerHTML = store.region
  div = document.querySelector('#outgoing-stock-edit-store_city')
  div.innerHTML = store.city
  div = document.querySelector('#outgoing-stock-edit-store_zip_code')
  div.innerHTML = store.zip

  createOutgoingStockItemTable(shipRequest, 'edit')
  console.log('shipRequest: ', shipRequest)

  editModal.show()
}

// -----create outgoing stock item table-----
function createOutgoingStockItemTable(shipRqst: IShipRequest, typeModal: string) {
  const warehousesJSONInput = document.getElementById('warehouses-json-input') as HTMLInputElement
  const warehousesEventsJSONInput = document.getElementById('warehouses-events-json-input') as HTMLInputElement

  const warehouses: IWarehouse[] = JSON.parse(warehousesJSONInput.value)
  const warehousesEvents: IWarehouse[] = JSON.parse(warehousesEventsJSONInput.value)

  const tableShipRequestBody = document.querySelector(`#table-outgoing-stock-body-${typeModal}`)
  shipRqst.carts.forEach((cart, index) => {
    const tableShipRequestItem = document.createElement('tr')

    tableShipRequestItem.classList.add(
      'table-product-item-tr',
      'bg-white',
      'border-b',
      'dark:bg-gray-800',
      'dark:border-gray-700',
      'hover:bg-gray-50',
      'dark:hover:bg-gray-600'
    )
    tableShipRequestItem.innerHTML = `
        <td class="w-4 p-4">
          <div class="flex items-center">
            ${index + 1}
          </div>
        </td>
        <td scope="row" class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
          <div class="pl-3">
            ${
              cart.product.image.length > 100
                ? `<img src="data:image/png;base64, ${cart.product.image}" alt="${cart.product.name}" class="w-14 h-14">`
                : `<img src="/static/img/default_image_brand.png" alt="${cart.product.name}" class="w-14 h-14">`
            }
          </div>
        </td>
        <td scope="row" class="max-w-xs p-4 text-base font-normal text-gray-900 dark:text-white">
          <div class="pl-3">
            <div class="cart-item-product-name text-base font-semibold" data-target-product-id="${cart.product.id}">${
      cart.product.name
    }</div>
          </div>
        </td>
        <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
          <div class="pl-3">
            <div class="text-base font-semibold">${cart.product.SKU}</div>
          </div>
        </td>
        <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
          <div class="pl-3">
            <div class="text-base font-semibold">some date</div>
          </div>
        </td>
        <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
          <div class="pl-3">
            <div class="cart-item-retail-regular_price text-base font-semibold">${cart.product.regularPrice}</div>
          </div>
        </td>
        <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
          <div class="pl-3">
            <div class="cart-item-retail-retail_price text-base font-semibold">${cart.product.regularPrice}</div>
          </div>
        </td>
        <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
          <div class="pl-3">
            <div class="cart-item-start-date text-base font-semibold">${cart.event ? cart.event.dateFrom : '-'}</div>
          </div>
        </td>
        <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
          <div class="pl-3">
            <div class="cart-item-end-date text-base font-semibold">${cart.event ? cart.event.dateTo : '-'}</div>
          </div>
        </td>
        <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
          <div class="pl-3">
            <div class="cart-item-group text-base font-semibold">${cart.group}</div>
          </div>
        </td>
        <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
          <div class="pl-3">
            <div class="cart-item-quantity text-base font-semibold">${cart.quantity}</div>
        </div>
        </td>
      `

    const warehouseEditElement = document.createElement('td')
    warehouseEditElement.classList.add('p-4', 'space-x-2', 'whitespace-nowrap')
    // Select warehouse
    warehouseEditElement.innerHTML = `
      <td class="p-4 space-x-2 whitespace-nowrap">
            <select type="text" name="store" id="outgoing-stock-${typeModal}-warehouse-name"
              class="outgoing-stock-${typeModal}-warehouse-name shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required>
                <option selected="selected" value="" disabled>Select Warehouse</option>
            </select>
      </td>
    `

    const warehouseName = cart.product.warehouse ? cart.product.warehouse.name : 'No Warehouse'
    const warehouseViewElement = document.createElement('td')
    warehouseViewElement.classList.add('p-4', 'space-x-2', 'whitespace-nowrap')
    warehouseViewElement.innerHTML = `
      <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
        <div class="pl-3">
          <div class="text-base text-gray-900 dark:text-white font-semibold">${warehouseName}</div>
        </div>
      </td>
    `

    if (typeModal === 'edit') {
      tableShipRequestItem.appendChild(warehouseEditElement)
      const selectWarehouse: HTMLSelectElement = tableShipRequestItem.querySelector(
        `#outgoing-stock-${typeModal}-warehouse-name`
      )

      let includeWarehouses: IWarehouse[]

      if (cart.group === EventsGroup) {
        includeWarehouses = warehousesEvents
      } else {
        includeWarehouses = warehouses
      }

      cart.product.warehouses.forEach((productWarehouse) => {
        if (includeWarehouses.some((warehouse) => warehouse.name == productWarehouse.name)) {
          const option = document.createElement('option')
          option.value = productWarehouse.id.toString()
          option.text = productWarehouse.name
          selectWarehouse.appendChild(option)
        }
      })
      if (selectWarehouse.options.length === 2) {
        selectWarehouse.options[1].selected = true
      }

      if (cart.product.warehouse) {
        selectWarehouse.value = cart.product.warehouse.id.toString()
      }
      if (shipRqst.status !== 'Waiting for warehouse manager') {
        const allWarehousesSelect: HTMLInputElement = document.querySelector('#outgoing-stock-edit-warehouse-name')
        const allWarehousesCheckbox: HTMLInputElement = document.querySelector('#outgoing-stock-edit-warehouse-set-all')
        allWarehousesSelect.disabled = true
        selectWarehouse.disabled = true
        allWarehousesCheckbox.disabled = true
      }
    } else {
      tableShipRequestItem.appendChild(warehouseViewElement)
    }

    tableShipRequestBody.appendChild(tableShipRequestItem)
  })
}

// -----set one warehouse to all items-----
function setWarehouseAllItems(warehouseId: number, typeModal: string) {
  const warehousesSelect = document.querySelectorAll(`.outgoing-stock-${typeModal}-warehouse-name`)
  const warehousesJSONInput = document.getElementById('warehouses-json-input') as HTMLInputElement
  const warehouses: IWarehouse[] = JSON.parse(warehousesJSONInput.value)
  if (warehouses.some((warehouse) => warehouse.id === warehouseId)) {
    // Non event warehouse
    warehousesSelect.forEach((select: HTMLSelectElement) => {
      if (select.parentElement.parentElement.querySelector('.cart-item-group').innerHTML !== EventsGroup) {
        select.value = warehouseId.toString()
      }
    })
  }
}

const isWarehouseSetAll: HTMLInputElement = document.querySelector('#outgoing-stock-edit-warehouse-set-all')

isWarehouseSetAll.addEventListener('change', () => {
  if (isWarehouseSetAll.checked) {
    const warehouseInput = document.querySelector('#outgoing-stock-edit-warehouse-name') as HTMLInputElement
    const warehouseId = parseInt(warehouseInput.value)
    setWarehouseAllItems(warehouseId, 'edit')
  }
})

const warehouseNameSelect = document.querySelector('#outgoing-stock-edit-warehouse-name') as HTMLInputElement
warehouseNameSelect.addEventListener('change', () => {
  isWarehouseSetAll.checked = false
})

// function to filter order by status
const orderFilterInputs = document.querySelectorAll('.outgoing-stock-filter-input')
const sortByNameOutgoingStockStorage = JSON.parse(sessionStorage.getItem('sortByNameOutgoingStock'))

if (sortByNameOutgoingStockStorage) {
  const filterDropdownContainer = document.querySelector('#dropdownRadioButton-outgoing-stock-status')
  filterDropdownContainer.innerHTML = `${sortByNameOutgoingStockStorage}
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
      sessionStorage.setItem('sortByNameOutgoingStock', JSON.stringify(input.value))
    }
  })
})

// ----set product to JSON hidden input in inbound-order-edit-form----
function setProducts() {
  const outgoingStockGroupItems = document.querySelectorAll('.cart-item-group')
  const outgoingStockProductItem = document.querySelectorAll('.cart-item-product-name')
  const outgoingStockQuantityItems = document.querySelectorAll('.cart-item-quantity')
  const outgoingStockWarehouses = document.querySelectorAll('.outgoing-stock-edit-warehouse-name')

  const products = []

  for (let i = 0; i < outgoingStockProductItem.length; i++) {
    const outgoingStockProductNameItem = outgoingStockProductItem[i] as HTMLSelectElement
    const inboundOrderAddQuantity = outgoingStockQuantityItems[i] as HTMLSelectElement
    const outgoingStockGroupName = outgoingStockGroupItems[i] as HTMLSelectElement
    const outgoingStockWarehouse = outgoingStockWarehouses[i] as HTMLSelectElement

    const product = {
      product_id: Number(outgoingStockProductNameItem.getAttribute('data-target-product-id')),
      quantity: Number(inboundOrderAddQuantity.innerHTML),
      group_name: outgoingStockGroupName.innerHTML,
      warehouse_id: Number(outgoingStockWarehouse.value),
    }
    products.push(product)
  }

  const inputProducts: HTMLInputElement = document.querySelector('#outgoing-stock-edit-products')
  inputProducts.value = JSON.stringify(products)
  return true
}

// ----submit edit form through hidden submit button----
const inboundOrderSubmitButton: HTMLButtonElement = document.querySelector('#outgoing-stock-submit-btn')
const inboundOrderSaveProductsButton = document.querySelector('#outgoing-stock-save-products-btn')

inboundOrderSaveProductsButton.addEventListener('click', () => {
  const result = setProducts()
  if (result) {
    inboundOrderSubmitButton.click()
  }
})
