import { Modal } from 'flowbite'
import type { ModalOptions, ModalInterface } from 'flowbite'
import { IShipRequest } from './outgoing_stock'

interface IProduct {
  id: number
  name: string
  quantity: string
  regular_price: number
  retail_price: number
  image: string
  SKU: string
  comment: string
  group: string
}

interface IStore {
  id: number
  store_name: string
  address: string
  phone_numb: string
  country: string
  region: string
  city: string
  zip: string
}

enum OrderStatus {
  assigned = 'Assigned to pickup',
  inTransit = 'In transit',
  delivered = 'Delivered',
  cancelled = 'Cancelled',
  waitingForWarehouse = 'Waiting for warehouse manager',
}

const $modalViewElement: HTMLElement = document.querySelector('#view-pickup-order-modal')

const $modalEditElement: HTMLElement = document.querySelector('#edit-pickup-order-modal')

const modalViewOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {
    console.log('modal is hidden')
    const tableShipRequestBody = document.querySelector('#table-pickup-order-body-view')
    while (tableShipRequestBody.firstChild) {
      tableShipRequestBody.removeChild(tableShipRequestBody.firstChild)
    }
    const orderActionsButtons = document.querySelectorAll('.pickup-order-actions-btn')
    orderActionsButtons.forEach((btn) => {
      btn.classList.remove('inline-flex')
      btn.classList.add('hidden')
    })
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
    const tableShipRequestBody = document.querySelector('#table-pickup-order-body-edit')
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
const viewPickupOrderButtonElements = document.querySelectorAll('.pickup-order-view-button')
viewPickupOrderButtonElements.forEach((e) =>
  e.addEventListener('click', () => {
    const shipRequest: IShipRequest = JSON.parse(e.getAttribute('data-target'))
    console.log(shipRequest)
    const store = JSON.parse(e.getAttribute('data-target-store'))
    let div: HTMLDivElement = document.querySelector('#pickup-order-view-order-number')
    div.innerHTML = shipRequest.orderNumb
    div = document.querySelector('#pickup-order-view-status')
    div.innerHTML = shipRequest.status
    div = document.querySelector('#pickup-order-view-created-date')
    div.innerHTML = shipRequest.createdAt.slice(0, 10)
    div = document.querySelector('#pickup-order-view-type')
    div.innerHTML = shipRequest.orderType
    div = document.querySelector('#pickup-order-view-warehouse-name')
    div.innerHTML = shipRequest.warehouseName || 'No warehouse'
    div = document.querySelector('#pickup-order-view-comment')
    div.innerHTML = shipRequest.comment
    div = document.querySelector('#pickup-order-view-wm_notes')
    shipRequest.wmNotes ? (div.innerHTML = shipRequest.wmNotes) : (div.innerHTML = 'No comments')
    div = document.querySelector('#pickup-order-view-store')
    div.innerHTML = shipRequest.store.storeName
    div = document.querySelector('#pickup-order-view-store_address')
    div.innerHTML = shipRequest.store.address
    div = document.querySelector('#pickup-order-view-store_phone')
    div.innerHTML = shipRequest.store.phoneNumb
    div = document.querySelector('#pickup-order-view-store_country')
    div.innerHTML = shipRequest.store.country
    div = document.querySelector('#pickup-order-view-store_province')
    div.innerHTML = shipRequest.store.region
    div = document.querySelector('#pickup-order-view-store_city')
    div.innerHTML = shipRequest.store.city
    div = document.querySelector('#pickup-order-view-store_zip_code')
    div.innerHTML = shipRequest.store.zip

    let input: HTMLInputElement = document.querySelector('#pickup-order-edit-id')
    input.value = shipRequest.id.toString()
    input = document.querySelector('#pickup-order-view-da_notes')
    input.value = shipRequest.daNotes

    switch (shipRequest.status) {
      case OrderStatus.assigned:
        const pickupOrderButton = document.querySelector('.pickup-order-view-pickup-order-btn')

        pickupOrderButton.classList.remove('hidden')
        pickupOrderButton.classList.add('inline-flex')
        break
      case OrderStatus.inTransit:
        console.log('in transit')

        const deliverButton = document.querySelector('.pickup-order-view-confirm-delivery-btn')

        deliverButton.classList.remove('hidden')
        deliverButton.classList.add('inline-flex')
        break
      default:
        break
    }

    createPickupOrderItemTable(shipRequest, 'view')
    viewModal.show()
  })
)

// -----edit modal------
const $buttonEditElements = document.querySelectorAll('.pickup-order-edit-button')
$buttonEditElements.forEach((e) =>
  e.addEventListener('click', () => {
    editShipRequest(JSON.parse(e.getAttribute('data-target')), JSON.parse(e.getAttribute('data-target-store')))
  })
)

function editShipRequest(shipRequest: IShipRequest, store: IStore) {
  let input: HTMLInputElement = document.querySelector('#pickup-order-edit-status')
  input.value = shipRequest.status
  input = document.querySelector('#pickup-order-edit-id')
  input.value = shipRequest.id.toString()
  input = document.querySelector('#pickup-order-edit-store')
  input.value = shipRequest.storeId.toString()
  input = document.querySelector('#pickup-order-edit-status')
  input.value = shipRequest.status
  input = document.querySelector('#pickup-order-edit-wm_notes')
  shipRequest.wmNotes ? (input.value = shipRequest.wmNotes) : (input.value = '')
  input = document.querySelector('#pickup-order-edit-da_notes')
  shipRequest.daNotes ? (input.value = shipRequest.daNotes) : (input.value = '')

  let div: HTMLDivElement = document.querySelector('#pickup-order-edit-order-number')
  div.innerHTML = shipRequest.orderNumb
  div = document.querySelector('#pickup-order-edit-store')
  div.innerHTML = store.store_name
  div = document.querySelector('#pickup-order-edit-type')
  div.innerHTML = shipRequest.orderType
  div = document.querySelector('#pickup-order-edit-created-date')
  div.innerHTML = shipRequest.createdAt.slice(0, 10)
  div = document.querySelector('#pickup-order-edit-comment')
  div.innerHTML = shipRequest.comment
  div = document.querySelector('#pickup-order-edit-store')
  div.innerHTML = store.store_name
  div = document.querySelector('#pickup-order-edit-store_address')
  div.innerHTML = store.address
  div = document.querySelector('#pickup-order-edit-store_phone')
  div.innerHTML = store.phone_numb
  div = document.querySelector('#pickup-order-edit-store_country')
  div.innerHTML = store.country
  div = document.querySelector('#pickup-order-edit-store_province')
  div.innerHTML = store.region
  div = document.querySelector('#pickup-order-edit-store_city')
  div.innerHTML = store.city
  div = document.querySelector('#pickup-order-edit-store_zip_code')
  div.innerHTML = store.zip

  createPickupOrderItemTable(shipRequest, 'edit')
  console.log('shipRequest: ', shipRequest)

  editModal.show()
}

// -----create ship request item table-----
function createPickupOrderItemTable(shipRequest: IShipRequest, typeModal: string) {
  const tableShipRequestBody = document.querySelector(`#table-pickup-order-body-${typeModal}`)

  shipRequest.carts.forEach((cart, index) => {
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
        <td scope="row" class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
          <div class="pl-3">
            <div class="text-base font-semibold">${cart.product.name}</div>
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
            <div class="cart-item-retail-retail_price text-base font-semibold">${cart.product.retailPrice}</div>
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
            <div
              class="shadow-sm h-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              ${cart.quantity}
            </div>
          </div>
        </td>
      `

    const warehouseEditElement = document.createElement('td')
    warehouseEditElement.classList.add('p-4', 'space-x-2', 'whitespace-nowrap')
    warehouseEditElement.innerHTML = `
      <td class="p-4 space-x-2 whitespace-nowrap">
            <select type="text" name="store" id="pickup-order-${typeModal}-warehouse-name"
              class="pickup-order-${typeModal}-warehouse-name shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required>
            </select>
      </td>
    `

    const warehouseViewElement = document.createElement('td')
    warehouseViewElement.classList.add('p-4', 'space-x-2', 'whitespace-nowrap')

    let warehouseNameView
    cart.warehouse ? (warehouseNameView = cart.warehouse.name) : (warehouseNameView = 'No warehouse')
    warehouseViewElement.innerHTML = `
      <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
        <div class="pl-3">
          <div class="text-base text-gray-900 dark:text-white font-semibold">${warehouseNameView}</div>
        </div>
      </td>
    `

    if (typeModal === 'edit') {
      // tableShipRequestItem.appendChild(warehouseEditElement)
      // const selectWarehouse = tableShipRequestItem.querySelector(`#pickup-order-${typeModal}-warehouse-name`)
      // for (const warehouse of shipRequest.warehouses) {
      //   const option = document.createElement('option')
      //   if (warehouse.products_ids.includes(product.id)) {
      //     option.value = warehouse.id.toString()
      //     option.text = warehouse.name
      //     selectWarehouse.appendChild(option)
      //   }
      // }
    } else {
      tableShipRequestItem.appendChild(warehouseViewElement)
    }

    tableShipRequestBody.appendChild(tableShipRequestItem)
  })
}

// search flow
const searchPickupInput: HTMLInputElement = document.querySelector('#table-search-pickup-order')
const searchPickupInputButton = document.querySelector('#table-search-pickup-order-button')
if (searchPickupInputButton && searchPickupInput) {
  searchPickupInputButton.addEventListener('click', () => {
    const url = new URL(window.location.href)
    url.searchParams.set('q', searchPickupInput.value)
    window.location.href = `${url.href}`
  })
}
const updateNotesButtons = document.querySelectorAll('.pickup-order-view-notes-btn')

updateNotesButtons.forEach((e) => {
  e.addEventListener('click', async () => {
    const shipRequestId = document.querySelector('#pickup-order-edit-id').getAttribute('value')
    const daNotes: HTMLInputElement = document.querySelector('#pickup-order-view-da_notes')
    const csrfTokenInput = document.querySelector<HTMLInputElement>('#csrf_token')

    const data = {
      csrf_token: csrfTokenInput.value,
      da_notes: daNotes.value,
      ship_request_id: shipRequestId,
    }
    const response = await fetch(`/pickup_order/update_notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (response.status == 200) {
      location.reload()
    }
  })
})

const deliverButtons = document.querySelectorAll('.pickup-order-view-confirm-delivery-btn')

deliverButtons.forEach((e) => {
  e.addEventListener('click', async () => {
    const shipRequestId = document.querySelector('#pickup-order-edit-id').getAttribute('value')

    const response = await fetch(`/pickup_order/deliver/${shipRequestId}`, {
      method: 'GET',
    })
    if (response.status == 200) {
      location.reload()
    }
  })
})

// function to filter order by status
const orderFilterPickupOrderInputs = document.querySelectorAll('.pickup-order-filter-input')
const sortByNamePickupOrderStorage = JSON.parse(sessionStorage.getItem('sortByNamePickupOrder'))

if (sortByNamePickupOrderStorage) {
  const filterDropdownContainer = document.querySelector('#dropdownRadioButton-pickup-order-status')
  filterDropdownContainer.innerHTML = `${sortByNamePickupOrderStorage}
          <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m1 1 4 4 4-4" />
        </svg>`
}

orderFilterPickupOrderInputs.forEach((input: HTMLInputElement) => {
  const hiddenInput = document.querySelector('#sort_by') as HTMLInputElement
  input.addEventListener('change', () => {
    console.log('input changed', input.checked)
    if (input.checked) {
      hiddenInput.value = input.value
      sessionStorage.setItem('sortByNamePickupOrder', JSON.stringify(input.value))
    }
  })
})
