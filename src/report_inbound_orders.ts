import { ModalOptions, Modal } from 'flowbite'
import { IProduct } from './inbound_order/types'
import HTMXDispatcher from './htmx'

interface IUser {
  username: string
}

interface IReportInboundOrder {
  createdAt: string
  history: string
  inboundOrder: IInboundOrder
  user: IUser
  type: string 
}

interface IInboundOrder {
  productsAllocated: IProductsAllocated[]
  warehouse: IWarehouse
  title: string  
}

interface IWarehouse {
  name: string
}

interface IProductsAllocated {
  product: IProduct
  quantity: number
  productQuantityGroups: IProductQuantityGroup[]
}

interface IProductQuantityGroup {
  group: IGroup
}

interface IGroup {
  name: string
}

// initialize htmx listener
const htmxDispatcher = new HTMXDispatcher();

const defaultBrandImage =
  'https://funko.com/on/demandware.static/-/Sites-funko-master-catalog/default/dwbb38a111/images/funko/upload/55998_CocaCola_S2_SpriteBottleCap_POP_GLAM-WEB.png'

const downloadCSV = async function () {
  // Filters
  const searchInput: HTMLInputElement = document.querySelector('#table-search-assign')
  
  const filterBrand: HTMLInputElement = document.querySelector('#report-assigns-brand')
  const filterCategory: HTMLInputElement = document.querySelector('#report-assigns-category')
  const filterPremises: HTMLInputElement = document.querySelector('#report-assigns-premises')
  const filterDateStartInput: HTMLInputElement = document.querySelector('#report-assigns-start-date')
  const filterDateEndInput: HTMLInputElement = document.querySelector('#report-assigns-end-date')

  const filtersMap = {
    q: searchInput,
    brand: filterBrand,
    category: filterCategory,
    premises: filterPremises,
    start_date: filterDateStartInput,
    end_date: filterDateEndInput,
  }

  const filterQuery = []
  for (const [queryKey, queryInput] of Object.entries(filtersMap)) {
    filterQuery.push(`${queryKey}=${queryInput.value}`)
  }

  // CSV Headers

  const csvData = ['created_at,username,type,order_title,history']
  let pages = 1
  const queryTail = filterQuery ? filterQuery.join('&') : ''

  for (let page = 1; page <= pages; page++) {
    const currentURL = window.location.href;
    const url = [`api?page=${page}`, queryTail].join('&')
    const res = await fetch(`${currentURL}/${url}`)
    const data = await res.json()

    data.report_inbound_orders.forEach((report: IReportInboundOrder) => {
      csvData.push(
        [
          formatDate(report.createdAt),
          report.user.username,
          report.type,     
          report.inboundOrder.title,    
          report.history        
        ].join(',')
      )
    });

    
    pages = data.pagination.pages
  }
  const blob = new Blob([csvData.join('\n')], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('download', 'inbound_order.csv')
  a.click()
  a.remove()
}


const formatDate = (date: string) => {
  const createAt = new Date(date)
  const year = createAt.getFullYear()
  const month = String(createAt.getMonth() + 1).padStart(2, '0') 
  const day = String(createAt.getDate()).padStart(2, '0')
  const hours = String(createAt.getHours()).padStart(2, '0')
  const minutes = String(createAt.getMinutes()).padStart(2, '0')
  return `${month}/${day}/${year} ${hours}:${minutes}`
}

document.addEventListener('DOMContentLoaded', () => {
  const filtersHTML = document.querySelectorAll("[name='q'], [name='start_date'], [name='end_date'], [name='category'], [name='premises'], [name='brand']");
  const buttonLoadEventsTable = document.querySelector('#table-report-loader') as HTMLButtonElement;

  
  const clearFilterButton = document.querySelector('#product-event-clear-button')
  clearFilterButton.addEventListener('click', () => {
    filtersHTML.forEach(filter => {
      (filter as HTMLInputElement).value = "";
    })
    buttonLoadEventsTable.click();
  })
  // load table
  buttonLoadEventsTable.click();

  // initialize modal
  const viewReportEventsModal = document.getElementById('view-report-inbound-order-modal') as HTMLDivElement
  const viewModalOptions: ModalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
      const productItems = document.querySelectorAll('.product-item-view') as NodeListOf<HTMLTableColElement>
      productItems.forEach((productItem) => productItem.remove());
    },
  }

  const viewModal = new Modal(viewReportEventsModal, viewModalOptions);
  const reportViewProductTbody = document.querySelector('#table-products') as HTMLTableElement;
  const productItemTemplate = document.querySelector('#view-product-item-template') as HTMLTableRowElement;


  // view buttons click
  const reportViewUser = document.getElementById('report-inbound-order-user') as HTMLDivElement
  const reportViewAction = document.getElementById('report-inbound-order-action') as HTMLDivElement
  const reportViewDate = document.getElementById('report-inbound-order-date') as HTMLDivElement
  const reportViewOrderTitle = document.getElementById('report-inbound-order-title') as HTMLDivElement


  // onload element with events-table id
  htmxDispatcher.onLoad('events-table', (target) => {
    const reportViewButtons: NodeListOf<HTMLButtonElement> = target.querySelectorAll('.report-inbound-order-view-btn');
    reportViewButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const reportInboundOrder: IReportInboundOrder = JSON.parse(btn.getAttribute('data-target'));

        reportViewUser.innerHTML = reportInboundOrder.user.username
        reportViewAction.innerHTML = reportInboundOrder.type
        reportViewDate.innerHTML = formatDate(reportInboundOrder.createdAt)
        reportViewOrderTitle.innerHTML = reportInboundOrder.inboundOrder.title

        const productList = reportInboundOrder.inboundOrder.productsAllocated  
         
        productList.forEach((productOrder, i) => {
          const product = productOrder.product
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
          const productName = newProductItem.querySelector('.product-name') as HTMLDivElement
          const productSku = newProductItem.querySelector('.product-sku') as HTMLDivElement
          const productRegularPrice = newProductItem.querySelector('.product-regular-price') as HTMLDivElement
          const productRetailPrice = newProductItem.querySelector('.product-retail-price') as HTMLDivElement
          const productGroup = newProductItem.querySelector('.product-group') as HTMLDivElement
          const productQuantity = newProductItem.querySelector('.product-quantity') as HTMLDivElement
          const productWarehouse = newProductItem.querySelector('.product-warehouse') as HTMLDivElement
          const img: HTMLImageElement = newProductItem.querySelector('.product-image')          

          product.image.length > 100
            ? (img.src = `data:image/png;base64, ${product.image}`)
            : (img.src = defaultBrandImage)

          productIndex.innerHTML = (i + 1).toString()
          productName.innerHTML = product.name
          productSku.innerHTML = product.SKU
          productQuantity.innerHTML = productOrder.quantity.toString()

          if (product.regularPrice) {
            productRegularPrice.innerHTML = product.regularPrice.toString()
          } else {
            productRegularPrice.innerHTML = 'No price'
          }
          if (product.retailPrice) {
            productRetailPrice.innerHTML = product.retailPrice.toString()
          } else {
            productRetailPrice.innerHTML = 'No price'
          }

          if(productOrder.productQuantityGroups.length > 0) {
            const groups = productOrder.productQuantityGroups[0].group.name  
            productGroup.innerHTML = groups;
          }else{
            productGroup.innerHTML = 'No group'
          }

          const warehouse = reportInboundOrder.inboundOrder.warehouse.name
          if(warehouse){
            productWarehouse.innerHTML = warehouse
          }else{
            productWarehouse.innerHTML = '-'
          }

          reportViewProductTbody.appendChild(newProductItem);
          viewModal.show();
        });
      })
    });
  });
})
// Download csv
const downloadCsvButton = document.getElementById('button-csv-download') as HTMLButtonElement
downloadCsvButton.addEventListener('click', downloadCSV)
