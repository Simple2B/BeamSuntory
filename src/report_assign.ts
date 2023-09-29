import { ModalOptions, Modal } from 'flowbite'
import { IProduct } from './inbound_order/types'
import HTMXDispatcher from './htmx'

interface IUser {
  username: string
}

interface IReportAssignCSV {
  product: IProduct
  createdAt: string
  group: IGroup
  fromGroup: IGroup
  type: string
  user: IUser
}

interface IReportAssign {
  product: IProduct
  quantity: number
  created_at: string
  group: IGroup
  from_group: IGroup
  type: string
  user: IUser
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

  const filterFromGroup: HTMLInputElement = document.querySelector('#report-assigns-group-from')
  const filterToGroup: HTMLInputElement = document.querySelector('#report-assigns-group-to')  
  const filterBrand: HTMLInputElement = document.querySelector('#report-assigns-brand')
  const filterCategory: HTMLInputElement = document.querySelector('#report-assigns-category')
  const filterLanguage: HTMLInputElement = document.querySelector('#report-assigns-language')
  const filterPremises: HTMLInputElement = document.querySelector('#report-assigns-premises')

  const filterDateStartInput: HTMLInputElement = document.querySelector('#report-assigns-start-date')
  const filterDateEndInput: HTMLInputElement = document.querySelector('#report-assigns-end-date')
  const filterUsernameInput: HTMLInputElement = document.querySelector('#report-assigns-filter-user')

  const filtersMap = {
    q: searchInput,
    to_group: filterToGroup,
    from_group: filterFromGroup,
    brand: filterBrand,
    category: filterCategory,
    language: filterLanguage,
    premises: filterPremises,
    username: filterUsernameInput,
    start_date: filterDateStartInput,
    end_date: filterDateEndInput,
  }

  const filterQuery = []
  for (const [queryKey, queryInput] of Object.entries(filtersMap)) {
    filterQuery.push(`${queryKey}=${queryInput.value}`)
  }

  // CSV Headers
  const csvData = ['created_at,username,type,from_group,to_group,sku,product_name']
  let pages = 1
  const queryTail = filterQuery ? filterQuery.join('&') : ''

  for (let page = 1; page <= pages; page++) {
    const currentURL = window.location.href.replace(/#/g, '');
    const url = [`api?page=${page}`, queryTail].join('&')
    const res = await fetch(`${currentURL}/${url}`)
    const data = await res.json()    

    data.report_events.forEach((report: IReportAssignCSV) => {
      csvData.push(
        [
          formatDate(report.createdAt),
          report.user.username,
          report.type,          
          report.fromGroup.name,
          report.group.name,
          report.product.SKU,
          report.product.name,
        ].join(',')
      )
    });

    
    pages = data.pagination.pages
  }
  const blob = new Blob([csvData.join('\n')], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('download', 'assigns.csv')
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
  const filtersHTML = document.querySelectorAll("[name='q'], [name='start_date'], [name='end_date'], [name='username'], [name='language'], [name='category'], [name='premises'], [name='from_group'], [name='to_group'], [name='brand']");
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
  const viewReportEventsModal = document.getElementById('view-report-events-modal') as HTMLDivElement
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
  const closingViewModalButton = document.querySelector('#button-closing-report-assign-modal') as HTMLButtonElement;
  closingViewModalButton.addEventListener('click', () => {
    viewModal.hide();
  })

  // view buttons click
  const reportViewUser = document.getElementById('report-event-user') as HTMLDivElement
  const reportViewAction = document.getElementById('report-event-action') as HTMLDivElement
  const reportViewDate = document.getElementById('report-event-date') as HTMLDivElement

  // onload element with events-table id
  htmxDispatcher.onLoad('events-table', (target) => {
    const reportViewButtons: NodeListOf<HTMLButtonElement> = target.querySelectorAll('.report-event-view-btn');
    reportViewButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const reportAssign: IReportAssign = JSON.parse(btn.getAttribute('data-target'));
        
        reportViewUser.innerHTML = reportAssign.user.username
        reportViewAction.innerHTML = reportAssign.type
        reportViewDate.innerHTML = formatDate(reportAssign.created_at) 


        const productName =  document.querySelector('.product-name') as HTMLDivElement
        const productSku = document.querySelector('.product-sku') as HTMLDivElement
        const productGroup = document.querySelector('.product-group') as HTMLDivElement
        const productGroupFrom = document.querySelector('.product-group-from') as HTMLDivElement
        const productQuantity = document.querySelector('.product-quantity') as HTMLDivElement
        const productSupplierName = document.querySelector('.supplier-name') as HTMLDivElement
        const productSupplierAddress = document.querySelector('.supplier-address') as HTMLDivElement
        const productSupplierPhone = document.querySelector('.supplier-number') as HTMLDivElement
        const productWarehouse = document.querySelector('.product-warehouse') as HTMLDivElement
        const img: HTMLImageElement = document.querySelector('.product-image')

          reportAssign.product.image.length > 100
          ? (img.src = `data:image/png;base64, ${reportAssign.product.image}`)
          : (img.src = defaultBrandImage)

        productName.innerHTML = reportAssign.product.name
        productSku.innerHTML = reportAssign.product.SKU
        productQuantity.innerHTML = reportAssign.quantity.toString()        

        productGroup.innerHTML = reportAssign.group.name;
        productGroupFrom.innerHTML = reportAssign.from_group.name;

        productSupplierName.innerHTML = reportAssign.product.supplier.name
        productSupplierAddress.innerHTML = reportAssign.product.supplier.address
        productSupplierPhone.innerHTML = reportAssign.product.supplier.contact_number ?? '-'

        const warehousesAmount = reportAssign.product.warehouses.length        
        const warehouses = reportAssign.product.warehouses.reduce((acc, warehouseProduct, index) => {
          acc += warehouseProduct.name
          if(index < warehousesAmount - 1) acc += ', '

          return acc
        },'')  
        productWarehouse.innerHTML = warehouses

        viewModal.show();
      })
    });
  });
})
// Download csv
const downloadCsvButton = document.getElementById('button-csv-download') as HTMLButtonElement
downloadCsvButton.addEventListener('click', downloadCSV)
