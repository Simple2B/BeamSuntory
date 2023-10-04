import { ModalOptions, Modal } from 'flowbite'
import { defaultBrandImage, htmxLoader } from './base'
import { formatDate } from './utils'
import { IReportAssign } from './types'

// initialize modal
const viewReportEventsModal = document.getElementById('report-assign-view-modal') as HTMLDivElement
const viewModalOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {
    const productItems = document.querySelectorAll('.report-assign-product-item-view') as NodeListOf<HTMLTableColElement>
    productItems.forEach((productItem) => productItem.remove());
  },
}

const viewModal = new Modal(viewReportEventsModal, viewModalOptions);
const reportViewProductTbody = document.querySelector('#report-assign-table-products') as HTMLTableElement;
const productItemTemplate = document.querySelector('#report-assign-view-product-item-template') as HTMLTableRowElement;
const closingViewModalButton = document.querySelector('#button-closing-report-assign-modal') as HTMLButtonElement;
closingViewModalButton.addEventListener('click', () => {
  viewModal.hide();
})

// DOM
const reportViewUser = document.getElementById('report-assign-user') as HTMLDivElement
const reportViewAction = document.getElementById('report-assign-action') as HTMLDivElement
const reportViewDate = document.getElementById('report-assign-date') as HTMLDivElement

htmxLoader.onLoad('report-assign-table', (target) => {
  // onload element with events-table id
  const reportViewButtons: NodeListOf<HTMLButtonElement> = target.querySelectorAll('.report-event-view-btn');
  reportViewButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const reportAssign: IReportAssign = JSON.parse(btn.getAttribute('data-target'));
      console.log(reportAssign);
      
      reportViewUser.innerHTML = reportAssign.user.username
      reportViewAction.innerHTML = reportAssign.type

      reportViewDate.innerHTML = formatDate(reportAssign.createdAt);

      const newProductItem = productItemTemplate
      newProductItem.removeAttribute('id')
      newProductItem.classList.remove('hidden')
      newProductItem.classList.add(
        'report-assign-product-item-view',
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

      if (reportAssign.product.retailPrice) {
        productRetailPrice.innerHTML = reportAssign.product.retailPrice.toString()
      } else {
        productRetailPrice.innerHTML = 'No price'
      }

      productGroup.innerHTML = reportAssign.group.name;
      productGroupFrom.innerHTML = reportAssign.fromGroup.name;
      reportViewProductTbody.appendChild(newProductItem);
      viewModal.show();
    })
  });
});