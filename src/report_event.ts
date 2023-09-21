import { ModalOptions, Modal } from 'flowbite'
import { IProduct } from './inbound_order/types'

interface IUser {
  username: string
}

interface ICart {
  group: string
}

interface IProductEvent {
  dateFrom: string
  dateTo: string
  product: IProduct
  quantity: number
  cart: ICart
}

interface IReportEvent {
  user: IUser
  quantity: number
  type: string
  createdAt: string
  history: string
  ship_request: IShipRequest
}

interface IShipRequest {
  id: number
  carts: IProductEvent[]
  comment: string
  createdAt: string
  daNotes: string
  orderNumb: string
  orderStatus: string
  store: IStore
  storeId: number
  wmNotes: string
}

interface IStore{
  active: boolean
  address: string
  city: string
  contactPerson: string
  country: string
  createdAt: string
  email: string
  id: number
  phoneNumb: string
  region: string
  storeCategoryId: number
  storeName: string
  zip: string
}

interface IEventsReportResponse {
  pagination: IPagination
  events: IEvents[]
  report_events: IReportEvent[]
}

const defaultBrandImage =
  'https://funko.com/on/demandware.static/-/Sites-funko-master-catalog/default/dwbb38a111/images/funko/upload/55998_CocaCola_S2_SpriteBottleCap_POP_GLAM-WEB.png'

const downloadCSV = async function () {
  // Filters
  const searchEventInput: HTMLInputElement = document.querySelector('#table-search-event')
  const dateEventStartFromInput: HTMLInputElement = document.querySelector('#product-event-sort-start-from-datepicker')
  const dateEventStartToInput: HTMLInputElement = document.querySelector('#product-event-sort-start-to-datepicker')
  const dateEventEndFromInput: HTMLInputElement = document.querySelector('#product-event-sort-end-from-datepicker')
  const dateEventEndToInput: HTMLInputElement = document.querySelector('#product-event-sort-end-to-datepicker')

  const filtersMap = {
    q: searchEventInput,
    start_from: dateEventStartFromInput,
    start_to: dateEventStartToInput,
    end_from: dateEventEndFromInput,
    end_to: dateEventEndToInput,
  }

  const filterQuery = []
  for (const [queryKey, queryInput] of Object.entries(filtersMap)) {
    filterQuery.push(`${queryKey}=${queryInput.value}`)
  }

  // CSV Headers
  const csvData = ['created_at,history,type,username,date_from,date_to,sku,product_name']
  let pages = 1
  // const queryTail = filterQuery.join('&')
  // TODO add filters
  const queryTail = ''

  for (let page = 1; page <= pages; page++) {
    const url = [`api?page={page}`, queryTail].join('&')
    const res = await fetch(`${location.href}/${url}`)
    const data: IEventsReportResponse = await res.json()
    const reportEvents = data.report_events[0] as IReportEvent
    reportEvents.events.forEach((event: IProductEvent) => {
      csvData.push(
        [
          reportEvents.createdAt,
          reportEvents.history,
          reportEvents.type,
          reportEvents.user.username,
          event.dateFrom,
          event.dateTo,
          event.product.SKU,
          event.product.name,
        ].join(',')
      )
    })
    pages = data.pagination.pages
  }

  const blob = new Blob([csvData.join('\n')], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('download', 'events.csv')
  a.click()
  a.remove()
}

function getFilterValues() {
  const url = new URL(window.location.href)
  const searchEventInput: HTMLInputElement = document.querySelector('#table-search-event')
  const dateEventStartFromInput: HTMLInputElement = document.querySelector(
      '#product-event-sort-start-from-datepicker'
  )
  const usernameSelect: HTMLInputElement = document.querySelector('#events-filter-status')
  const dateEventStartToInput: HTMLInputElement = document.querySelector('#product-event-sort-start-to-datepicker')
  const dateEventEndFromInput: HTMLInputElement = document.querySelector('#product-event-sort-end-from-datepicker')
  const dateEventEndToInput: HTMLInputElement = document.querySelector('#product-event-sort-end-to-datepicker')

  url.searchParams.set('q', searchEventInput.value)
  url.searchParams.set('start_from', dateEventStartFromInput.value)
  url.searchParams.set('start_to', dateEventStartToInput.value)
  url.searchParams.set('end_from', dateEventEndFromInput.value)
  url.searchParams.set('end_to', dateEventEndToInput.value)
  url.searchParams.set('username', usernameSelect.value)
  window.location.href = `${url.href}`
}


document.addEventListener('DOMContentLoaded', () => {
  const tableRow = document.querySelectorAll('.table-event-item-tr')
  tableRow.forEach((row: HTMLDivElement) => {    
    const viewReportEventsModal = row.querySelector('.report-event-view-btn')
    const data = JSON.parse(viewReportEventsModal.getAttribute('data-target'))
    const reportStore = data.ship_request.store.storeName    
    const reportEventStoreDiv = row.querySelector('.report-event-store') as HTMLDivElement
    reportEventStoreDiv.innerHTML = reportStore
  })

  const eventFilterButton = document.querySelector('#event-filter-button')
  eventFilterButton.addEventListener('click', () => {
    getFilterValues()
  })
  
  const clearFilterButton = document.querySelector('#product-event-clear-button')
  clearFilterButton.addEventListener('click', () => {
    const url = new URL(window.location.href)
    url.searchParams.delete('q')
    url.searchParams.delete('start_from')
    url.searchParams.delete('start_to')
    url.searchParams.delete('end_from')
    url.searchParams.delete('end_to')
    url.searchParams.delete('username')
    window.location.href = `${url.href}`
  })

  // initialize modal
  const viewReportEventsModal = document.getElementById('view-report-events-modal') as HTMLDivElement
  const viewModalOptions: ModalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
      const productItems = document.querySelectorAll('.product-item-view') as NodeListOf<HTMLTableColElement>
      productItems.forEach((productItem) => productItem.remove())
    },
  }

  const viewModal = new Modal(viewReportEventsModal, viewModalOptions)

  // view buttons click
  const reportViewButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.report-event-view-btn')
  const reportViewUser = document.getElementById('report-event-user') as HTMLDivElement
  const reportViewAction = document.getElementById('report-event-action') as HTMLDivElement
  const reportViewDate = document.getElementById('report-event-date') as HTMLDivElement

  const reportViewProductTbody = document.getElementById('table-products') as HTMLTableElement
  const productItemTemplate = document.getElementById('view-product-item-template') as HTMLTableRowElement

  reportViewButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const reportEvent: IReportEvent = JSON.parse(btn.getAttribute('data-target'))

      const createAt = new Date(reportEvent.createdAt)
      const year = createAt.getFullYear()
      const month = String(createAt.getMonth() + 1).padStart(2, '0') // Month is 0-based
      const day = String(createAt.getDate()).padStart(2, '0')
      const hours = String(createAt.getHours()).padStart(2, '0')
      const minutes = String(createAt.getMinutes()).padStart(2, '0')

      reportViewUser.innerHTML = reportEvent.user.username
      reportViewAction.innerHTML = reportEvent.type
      reportViewDate.innerHTML = `${month}/${day}/${year} ${hours}:${minutes}`


      reportEvent.ship_request.carts.forEach((event, i) => {
        // Render event
        const newProductItem = productItemTemplate.cloneNode(true) as HTMLElement
        newProductItem.removeAttribute('id')
        newProductItem.classList.remove('hidden')
        newProductItem.classList.add(
          'product-item-view',
          'text-base',
          'font-semibold',
          'text-gray-900',
          'dark:text-white'
        )

        const productIndex = newProductItem.querySelector('.product-index') as HTMLDivElement
        // TODO add image
        const productName = newProductItem.querySelector('.product-name') as HTMLDivElement
        const productSku = newProductItem.querySelector('.product-sku') as HTMLDivElement
        const productRegularPrice = newProductItem.querySelector('.product-regular-price') as HTMLDivElement
        const productRetailPrice = newProductItem.querySelector('.product-retail-price') as HTMLDivElement
        const productGroup = newProductItem.querySelector('.product-group') as HTMLDivElement
        const productQuantity = newProductItem.querySelector('.product-quantity') as HTMLDivElement

        const img: HTMLImageElement = newProductItem.querySelector('.product-image')
        event.product.image.length > 100
          ? (img.src = `data:image/png;base64, ${event.product.image}`)
          : (img.src = defaultBrandImage)

        productIndex.innerHTML = (i + 1).toString()
        productName.innerHTML = event.product.name
        productSku.innerHTML = event.product.SKU
        productQuantity.innerHTML = event.quantity.toString()

        if (event.product.regularPrice) {
          productRegularPrice.innerHTML = event.product.regularPrice.toString()
        } else {
          productRegularPrice.innerHTML = 'No price'
        }

        if (event.product.retailPrice) {
          productRetailPrice.innerHTML = event.product.retailPrice.toString()
        } else {
          productRetailPrice.innerHTML = 'No price'
        }
        
        productGroup.innerHTML = event.group

        reportViewProductTbody.appendChild(newProductItem)

        viewModal.show()
      })
    })
  })

  // Download csv
  const downloadCsvButton = document.getElementById('button-csv-download') as HTMLButtonElement
  downloadCsvButton.addEventListener('click', downloadCSV)
})
