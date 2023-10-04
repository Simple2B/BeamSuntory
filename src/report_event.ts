import { ModalOptions, Modal } from 'flowbite';
import { defaultBrandImage, htmxLoader } from './base';
import { IReportEvent } from './types';

// initialize modal
const viewReportEventsModal = document.getElementById('view-report-events-modal') as HTMLDivElement;
const viewModalOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {
    const productItems = document.querySelectorAll('.product-item-view') as NodeListOf<HTMLTableColElement>;
    productItems.forEach((productItem) => productItem.remove());
  },
};

const viewModal = new Modal(viewReportEventsModal, viewModalOptions);
const viewReportEventsModalCloseButton = document.querySelector('#buttonClosingReportEventModal') as HTMLButtonElement
viewReportEventsModalCloseButton.addEventListener('click', () => {
  viewModal.hide();
})

// DOM
const reportViewUser = document.getElementById('report-event-user') as HTMLDivElement;
const reportViewAction = document.getElementById('report-event-action') as HTMLDivElement;
const reportViewDate = document.getElementById('report-event-date') as HTMLDivElement;
const reportStoreName = document.getElementById('report-event-store-name') as HTMLDivElement;
const productItemTemplate = document.querySelector('#report-event-view-product-item-template') as HTMLTableRowElement;
const reportViewProductTbody = document.querySelector('#report-event-table-products') as HTMLTableElement;

htmxLoader.onLoad('events-table', (target) => {
  const reportViewButtons: NodeListOf<HTMLButtonElement> = target.querySelectorAll('.report-event-view-btn');
    reportViewButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        console.log('click');
        const reportEvent: IReportEvent = JSON.parse(btn.getAttribute('data-target'));
        const createAt = new Date(reportEvent.createdAt);
        const year = createAt.getFullYear();
        const month = String(createAt.getMonth() + 1).padStart(2, '0'); // Month is 0-based
        const day = String(createAt.getDate()).padStart(2, '0');
        const hours = String(createAt.getHours()).padStart(2, '0');
        const minutes = String(createAt.getMinutes()).padStart(2, '0');

        reportViewUser.innerHTML = reportEvent.user.username;
        reportViewAction.innerHTML = reportEvent.type;
        reportViewDate.innerHTML = `${month}/${day}/${year} ${hours}:${minutes}`;
        reportStoreName.innerHTML = reportEvent.shipRequest.store.storeName;

        reportViewUser.innerHTML = reportEvent.user.username;
        reportViewAction.innerHTML = reportEvent.type;
        reportViewDate.innerHTML = `${month}/${day}/${year} ${hours}:${minutes}`;
        reportEvent.shipRequest.carts.forEach((event, i) => {
          // Render event
          const newProductItem = productItemTemplate.cloneNode(true) as HTMLElement;
          newProductItem.removeAttribute('id');
          newProductItem.classList.remove('hidden');
          newProductItem.classList.add(
            'product-item-view',
            'text-base',
            'font-semibold',
            'text-gray-900',
            'dark:text-white'
          );
          const productIndex = newProductItem.querySelector('.product-index') as HTMLDivElement;
          const productName = newProductItem.querySelector('.product-name') as HTMLDivElement;
          const productSku = newProductItem.querySelector('.product-sku') as HTMLDivElement;
          const productRegularPrice = newProductItem.querySelector('.product-regular-price') as HTMLDivElement;
          const productRetailPrice = newProductItem.querySelector('.product-retail-price') as HTMLDivElement;
          const productGroup = newProductItem.querySelector('.product-group') as HTMLDivElement;
          const productQuantity = newProductItem.querySelector('.product-quantity') as HTMLDivElement;
          const img: HTMLImageElement = newProductItem.querySelector('.product-image');

          event.product.image.length > 100
            ? (img.src = `data:image/png;base64, ${event.product.image}`)
            : (img.src = defaultBrandImage);

          productIndex.innerHTML = (i + 1).toString();
          productName.innerHTML = event.product.name;
          productSku.innerHTML = event.product.SKU;
          productQuantity.innerHTML = event.quantity.toString();

          if (event.product.regularPrice) {
            productRegularPrice.innerHTML = event.product.regularPrice.toString();
          } else {
            productRegularPrice.innerHTML = 'No price';
          }

          if (event.product.retailPrice) {
            productRetailPrice.innerHTML = event.product.retailPrice.toString();
          } else {
            productRetailPrice.innerHTML = 'No price';
          }

          productGroup.innerHTML = event.group;
          reportViewProductTbody.appendChild(newProductItem);
          viewModal.show();
        });
      });
    });
});
