import { ModalOptions, Modal } from 'flowbite';
import { IReportInventoryList } from './types';
import { htmxLoader, defaultBrandImage } from './base';
import { formatDate } from './utils';

// Nodes
const reportViewUser = document.getElementById('report-inventory-user') as HTMLDivElement;
const reportViewAction = document.getElementById('report-inventory-action') as HTMLDivElement;
const reportViewDate = document.getElementById('report-inventory-date') as HTMLDivElement;
const reportStoreName = document.getElementById('report-inventory-store-name') as HTMLDivElement;
const productItemTemplate = document.querySelector('#report-inventory-view-product-item-template') as HTMLTableRowElement;
const reportViewProductTbody = document.querySelector('#report-inventory-table-products') as HTMLTableElement;
// initialize modal
const viewReportInventoriesModal = document.getElementById('view-report-inventories-modal') as HTMLDivElement;
const viewModalOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {
    const productItems = document.querySelectorAll('.report-inventory-product-item-view') as NodeListOf<HTMLTableColElement>;
    productItems.forEach((productItem) => productItem.remove());
  },
};

const viewModal = new Modal(viewReportInventoriesModal, viewModalOptions);
const closingViewModalButton = document.querySelector('#button-closing-report-inventory-modal') as HTMLButtonElement;
closingViewModalButton.addEventListener('click', () => {
  viewModal.hide();
});

htmxLoader.onLoad('inventories-table', (target) => {
  const reportViewButtons: NodeListOf<HTMLButtonElement> = target.querySelectorAll('.report-inventory-view-btn');
  reportViewButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const reportInventory: IReportInventoryList = JSON.parse(btn.getAttribute('data-target'));
      reportViewUser.innerHTML = reportInventory.user.username;
      reportViewAction.innerHTML = reportInventory.type;
      reportViewDate.innerHTML = formatDate(reportInventory.createdAt);
      if (reportInventory.store) {
        reportStoreName.innerHTML = reportInventory.store.storeName;
      } else if (reportInventory.warehouse) {
        reportStoreName.innerHTML = reportInventory.warehouse.name;
      } else {
        reportStoreName.innerHTML = 'Internal action';
      }

      reportInventory.reportInventories.forEach((inventory, i) => {
        // Render inventory
        const newProductItem = productItemTemplate.cloneNode(true) as HTMLElement;
        newProductItem.removeAttribute('id');
        newProductItem.classList.remove('hidden');
        newProductItem.classList.add(
          'report-inventory-product-item-view',
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
        const productWarehouse = newProductItem.querySelector('.product-warehouse') as HTMLDivElement;
        const img: HTMLImageElement = newProductItem.querySelector('.product-image');

        inventory.product.image.length > 100
          ? (img.src = `data:image/png;base64, ${inventory.product.image}`)
          : (img.src = defaultBrandImage);

        productIndex.innerHTML = (i + 1).toString();
        productName.innerHTML = inventory.product.name;
        productSku.innerHTML = inventory.product.SKU;

        if (inventory.qtyBefore) {
          productRegularPrice.innerHTML = inventory.qtyBefore.toString();
        } else {
          productRegularPrice.innerHTML = '0';
        }

        if (inventory.qtyAfter) {
          productRetailPrice.innerHTML = inventory.qtyAfter.toString();
        } else {
          productRetailPrice.innerHTML = '0';
        }
        inventory.product.warehouseProducts.forEach((warehouseProduct) => {
          if (warehouseProduct.id === inventory.warehouseProductId) {
            productGroup.innerHTML = warehouseProduct.group.name;
            productWarehouse.innerHTML = warehouseProduct.warehouse.name;
          }
        });
        reportViewProductTbody.appendChild(newProductItem);
        viewModal.show();
      });
    });
  });
});
