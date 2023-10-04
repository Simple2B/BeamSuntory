import { ModalOptions, Modal } from 'flowbite'
import { formatDate } from './utils'
import { defaultBrandImage, htmxLoader } from './base'
import { IReportInboundOrder } from './types'


// initialize modal
const viewReportEventsModal = document.getElementById('view-report-inbound-order-modal') as HTMLDivElement
const viewModalOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {
    const productItems = document.querySelectorAll('.report-inbound-order-product-item-view') as NodeListOf<HTMLTableColElement>
    productItems.forEach((productItem) => productItem.remove());
  },
}
const viewModal = new Modal(viewReportEventsModal, viewModalOptions);
const closingViewModalButton = document.querySelector('#button-closing-report-inbound-order-modal') as HTMLButtonElement; 
closingViewModalButton.addEventListener('click', () => {
  viewModal.hide()
})

// DOMS
const reportViewUser = document.getElementById('report-inbound-order-user') as HTMLDivElement
const reportViewAction = document.getElementById('report-inbound-order-action') as HTMLDivElement
const reportViewDate = document.getElementById('report-inbound-order-date') as HTMLDivElement
const reportViewOrderTitle = document.getElementById('report-inbound-order-title') as HTMLDivElement

const reportViewProductTbody = document.querySelector('#report-inbound-order-table-products') as HTMLTableElement;
const productItemTemplate = document.querySelector('#report-inbound-order-view-product-item-template') as HTMLTableRowElement;


htmxLoader.onLoad('report-inbound-order-table', (target) => {
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
          'report-inbound-order-product-item-view',
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
})