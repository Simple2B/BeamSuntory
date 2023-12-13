import { ModalOptions, Modal } from 'flowbite';
import { defaultBrandImage, htmxLoader } from './base';
import { formatDate } from './utils';
import { IAdjust } from './types';

// initialize modal
const viewReportEventsModal = document.getElementById('view-report-adjustment-modal') as HTMLDivElement;
const viewModalOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {
    const productItems = document.querySelectorAll(
      '.report-adjustment-product-item-view'
    ) as NodeListOf<HTMLTableColElement>;
    productItems.forEach((productItem) => productItem.remove());
  },
};

const viewModal = new Modal(viewReportEventsModal, viewModalOptions);
const closingViewModalButton = document.querySelector('#button-closing-report-adjustment-modal') as HTMLButtonElement;
closingViewModalButton.addEventListener('click', () => {
  viewModal.hide();
});

// DOM
const reportViewProductTbody = document.querySelector('#report-adjustment-table-products') as HTMLTableElement;
const productItemTemplate = document.querySelector(
  '#report-adjustment-view-product-item-template'
) as HTMLTableRowElement;
const reportViewUser = document.getElementById('report-adjustment-user') as HTMLDivElement;
const reportProductName = document.getElementById('report-adjustment-product-name') as HTMLDivElement;
const reportProductSKU = document.getElementById('report-adjustment-product-sku') as HTMLDivElement;
const reportProductImage = document.getElementById('report-adjustment-product-image') as HTMLImageElement;
const reportViewDate = document.getElementById('report-adjustment-date') as HTMLDivElement;
const reportAdjustNote = document.getElementById('report-adjustment-note') as HTMLDivElement;

htmxLoader.onLoad('adjustment-table', (target) => {
  const reportViewButtons: NodeListOf<HTMLButtonElement> = target.querySelectorAll('.report-adjustment-view-btn');
  reportViewButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const reportAdjust: IAdjust = JSON.parse(btn.getAttribute('data-target'));
      // Render event
      reportViewUser.innerHTML = reportAdjust.user.username;
      reportProductName.innerHTML = reportAdjust.product.name;
      reportViewDate.innerHTML = formatDate(reportAdjust.createdAt);
      reportProductSKU.innerHTML = reportAdjust.product.SKU;
      reportAdjustNote.innerHTML = reportAdjust.note ? reportAdjust.note : 'No notes';

      reportAdjust.product.image.length > 100
        ? (reportProductImage.src = `data:image/png;base64, ${reportAdjust.product.image}`)
        : (reportProductImage.src = defaultBrandImage);

      reportAdjust.adjustGroupQty.forEach((adjust, i) => {
        console.log('adjust', adjust);

        // Render event
        const newAdjustItem = productItemTemplate.cloneNode(true) as HTMLElement;
        newAdjustItem.removeAttribute('id');
        newAdjustItem.classList.remove('hidden');
        newAdjustItem.classList.add(
          'report-adjustment-product-item-view',
          'text-base',
          'font-semibold',
          'text-gray-900',
          'dark:text-white'
        );
        const productIndex = newAdjustItem.querySelector('.product-index') as HTMLDivElement;
        const productMasterGroup = newAdjustItem.querySelector('.product-master-group') as HTMLDivElement;
        const productGroup = newAdjustItem.querySelector('.product-group') as HTMLDivElement;
        const productQuantityBefore = newAdjustItem.querySelector('.product-quantity-before') as HTMLDivElement;
        const productQuantityAfter = newAdjustItem.querySelector('.product-quantity-after') as HTMLDivElement;
        const productWarehouse = newAdjustItem.querySelector('.product-warehouse') as HTMLDivElement;

        productIndex.innerHTML = (i + 1).toString();
        productMasterGroup.innerHTML = adjust.group.masterGroup.name;
        productGroup.innerHTML = adjust.group.name;
        productWarehouse.innerHTML = adjust.warehouse.name;
        productQuantityBefore.innerHTML = adjust.quantityBefore.toString();
        productQuantityAfter.innerHTML = adjust.quantityAfter.toString();

        reportViewProductTbody.appendChild(newAdjustItem);
        viewModal.show();
      });
    });
  });
});
