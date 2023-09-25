import { ModalOptions, Modal } from 'flowbite'
import { IProduct } from './inbound_order/types'
import HTMXDispatcher from './htmx'

interface IUser {
  username: string
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
  
  const filterBrand: HTMLInputElement = document.querySelector('#report-assigns-brand')
  const filterCategory: HTMLInputElement = document.querySelector('#report-assigns-category')
  const filterLanguage: HTMLInputElement = document.querySelector('#report-assigns-language')
  const filterPremises: HTMLInputElement = document.querySelector('#report-assigns-premises')

  const filterDateStartInput: HTMLInputElement = document.querySelector('#report-assigns-start-date')
  const filterDateEndInput: HTMLInputElement = document.querySelector('#report-assigns-end-date')
  const filterUsernameInput: HTMLInputElement = document.querySelector('#report-assigns-filter-user')

  const filtersMap = {
    q: searchInput,
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
  const queryTail = ''

  for (let page = 1; page <= pages; page++) {
    const currentURL = window.location.href;
    const urlWithoutQueryParams = currentURL.split('?')[0];
    const url = [`api?page=${page}`, queryTail].join('&')
    const res = await fetch(`${urlWithoutQueryParams}/${url}`)
    const data = await res.json()    

    data.report_events.forEach((report: IReportAssign) => {
      csvData.push(
        [
          report.created_at,
          report.user.username,
          report.type,          
          report.from_group.name,
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


document.addEventListener('DOMContentLoaded', () => {
  const filtersHTML = document.querySelectorAll("[name='q'], [name='start_date'], [name='end_date'], [name='username'], [name='language'], [name='category'], [name='premises'], [name='brand'");
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
  const reportViewProductTbody = document.querySelector('#table-products') as HTMLTableElement;
  const productItemTemplate = document.querySelector('#view-product-item-template') as HTMLTableRowElement;


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
        const createAt = new Date(reportAssign.created_at)
        const year = createAt.getFullYear()
        const month = String(createAt.getMonth() + 1).padStart(2, '0') // Month is 0-based
        const day = String(createAt.getDate()).padStart(2, '0')
        const hours = String(createAt.getHours()).padStart(2, '0')
        const minutes = String(createAt.getMinutes()).padStart(2, '0')

        reportViewUser.innerHTML = reportAssign.user.username
        reportViewAction.innerHTML = reportAssign.type



        reportViewDate.innerHTML = `${month}/${day}/${year} ${hours}:${minutes}`

        const newProductItem = productItemTemplate
        newProductItem.removeAttribute('id')
        newProductItem.classList.remove('hidden')
        newProductItem.classList.add(
          'product-item-view',
          'text-base',
          'font-semibold',
          'text-gray-900',
          'dark:text-white'
        )
        const productName = newProductItem.querySelector('.product-name') as HTMLDivElement
        const productSku = newProductItem.querySelector('.product-sku') as HTMLDivElement
        const productRegularPrice = newProductItem.querySelector('.product-regular-price') as HTMLDivElement
        const productRetailPrice = newProductItem.querySelector('.product-retail-price') as HTMLDivElement
        const productGroup = newProductItem.querySelector('.product-group') as HTMLDivElement
        const productGroupFrom = newProductItem.querySelector('.product-group-from') as HTMLDivElement
        const productQuantity = newProductItem.querySelector('.product-quantity') as HTMLDivElement
        const img: HTMLImageElement = newProductItem.querySelector('.product-image')


          reportAssign.product.image.length > 100
          ? (img.src = `data:image/png;base64, ${reportAssign.product.image}`)
          : (img.src = defaultBrandImage)

        productName.innerHTML = reportAssign.product.name
        productSku.innerHTML = reportAssign.product.SKU
        productQuantity.innerHTML = reportAssign.quantity.toString()

        if (reportAssign.product.regularPrice) {
          productRegularPrice.innerHTML = reportAssign.product.regularPrice.toString()
        } else {
          productRegularPrice.innerHTML = 'No price'
        }

        if (reportAssign.product.regularPrice) {
          productRegularPrice.innerHTML = reportAssign.product.regularPrice.toString()
        } else {
          productRegularPrice.innerHTML = 'No price'
        }

        if (reportAssign.product.retailPrice) {
          productRetailPrice.innerHTML = reportAssign.product.retailPrice.toString()
        } else {
          productRetailPrice.innerHTML = 'No price'
        }

        productGroup.innerHTML = reportAssign.group.name;
        productGroupFrom.innerHTML = reportAssign.from_group.name;
        reportViewProductTbody.appendChild(newProductItem);
        viewModal.show();

      })
    });
  });
})
// Download csv
const downloadCsvButton = document.getElementById('button-csv-download') as HTMLButtonElement
downloadCsvButton.addEventListener('click', downloadCSV)
