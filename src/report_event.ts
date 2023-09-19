import { ModalOptions, Modal } from "flowbite"
import { IProduct } from "./inbound_order/types"

interface IUser {
  username: string
}

interface ICart {
  group: string;
}

interface IProductEvent {
  dateFrom: string
  dateTo: string
  product: IProduct
  quantity: number;
  cart: ICart;
}

interface IReportEvent {
  user: IUser
  quantity: number
  type: string
  createdAt: string
  history: string
  events: IProductEvent[]
}

document.addEventListener('DOMContentLoaded', () => {
  // initialize modal
  const viewReportEventsModal = document.getElementById('view-report-events-modal') as HTMLDivElement;
  const viewModalOptions: ModalOptions = {
      placement: 'bottom-right',
      backdrop: 'dynamic',
      backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
      closable: true,
      onHide: () => {
        const productItems = document.querySelectorAll('.product-item-view') as NodeListOf<HTMLTableColElement>;
        productItems.forEach(productItem => productItem.remove());
      },
  }

  const viewModal = new Modal(viewReportEventsModal, viewModalOptions);

  // view buttons click
  const reportViewButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.report-event-view-btn');
  const reportViewUser = document.getElementById('report-event-user') as HTMLDivElement;
  const reportViewAction = document.getElementById('report-event-action') as HTMLDivElement;
  const reportViewDate = document.getElementById('report-event-date') as HTMLDivElement;
  const reportViewHistory = document.getElementById('report-event-history') as HTMLDivElement;
  
  const reportViewProductTbody = document.getElementById('table-products') as HTMLTableElement;
  const productItemTemplate = document.getElementById('view-product-item-template') as HTMLTableRowElement;

  reportViewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const reportEvent: IReportEvent = JSON.parse(btn.getAttribute('data-target'));
      console.log(reportEvent);

      reportViewUser.innerHTML = reportEvent.user.username;
      reportViewAction.innerHTML = reportEvent.type;
      reportViewDate.innerHTML = reportEvent.createdAt;
      reportViewHistory.innerHTML = reportEvent.history;

      reportEvent.events.forEach((event, i) => {
        // Render event
        const newProductItem = productItemTemplate.cloneNode(true) as HTMLElement;
        newProductItem.removeAttribute('id');
        newProductItem.classList.remove('hidden');
        newProductItem.classList.add('product-item-view');
  
        const productIndex = newProductItem.querySelector('.product-index') as HTMLDivElement;
        // TODO add image
        const productName = newProductItem.querySelector('.product-name') as HTMLDivElement;
        const productSku = newProductItem.querySelector('.product-sku') as HTMLDivElement;
        const productRegularPrice = newProductItem.querySelector('.product-regular-price') as HTMLDivElement;
        const productRetailPrice = newProductItem.querySelector('.product-retail-price') as HTMLDivElement;
        const productGroup = newProductItem.querySelector('.product-group') as HTMLDivElement;
        const productQuantity = newProductItem.querySelector('.product-quantity') as HTMLDivElement;
        
        productIndex.innerHTML = (i + 1).toString();
        productName.innerHTML = event.product.name;
        productSku.innerHTML = event.product.SKU;
        productQuantity.innerHTML = event.quantity.toString();

        if (event.product.regularPrice){
          productRegularPrice.innerHTML = event.product.regularPrice.toString();
        } else {
          productRegularPrice.innerHTML = 'No price';
        }

        if (event.product.retailPrice) {
          productRetailPrice.innerHTML = event.product.retailPrice.toString();
        } else {
          productRetailPrice.innerHTML = 'No price';
        }

        productGroup.innerHTML = event.cart.group;

        reportViewProductTbody.appendChild(newProductItem);

        viewModal.show();
      });
    })
  })
});