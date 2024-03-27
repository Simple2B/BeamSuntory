import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';
import { getFullImage } from './base';
import { IInboundOrderOut, IAllocatedProductOut } from './inbound_order/types';

interface SupDAWhProd {
  supplier: string;
  delivery_agent: string;
  warehouse: string;
  product: string;
}

interface IPackageInfo {
  productQuantityGroupId: number;
  quantityCartonMaster: number;
  quantityPerWrap: number;
  quantityWrapCarton: number;
  quantityReceived: number;
}

interface IIncomingStockProduct {
  allocatedProductId: number;
  packages: IPackageInfo[];
}
let productGroupQuantity = {} as { [index: string]: number };
let i = 0;

const $acceptModalElement: HTMLElement = document.querySelector('#editIncomingStockModal');
const $viewModalElement: HTMLElement = document.querySelector('#viewIncomingStockModal');
const inputReceivedProducts: HTMLInputElement = document.querySelector('#incoming-stock-edit-received-products');

const modalClosingButton = document.querySelector('#buttonClosingViewIncomingStockModal');
modalClosingButton.addEventListener('click', () => {
  viewModal.hide();
});

const acceptModalOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {
    const incomingStocksContainer = document.getElementById('incoming-stock-edit-add-container') as HTMLDivElement;
    const incomingStockItems = incomingStocksContainer.querySelectorAll('.incoming-stock-product-item');
    incomingStockItems.forEach((item) => {
      item.remove();
    });
  },
  onShow: () => {
    console.log('incoming-stock id: ');
  },
  onToggle: () => {
    console.log('modal has been toggled');
  },
};

const viewModalOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {
    const incomingStocksContainer = document.getElementById('incoming-stock-edit-add-container') as HTMLDivElement;
    const incomingStockItems = incomingStocksContainer.querySelectorAll('.incoming-stock-product-item');
    incomingStockItems.forEach((item) => {
      item.remove();
    });
  },
  onShow: () => {
    console.log('incoming-stock id: ');
  },
  onToggle: () => {
    console.log('modal has been toggled');
  },
};

const acceptModal: ModalInterface = new Modal($acceptModalElement, acceptModalOptions);
const viewModal: ModalInterface = new Modal($viewModalElement, viewModalOptions);

const $buttonElements = document.querySelectorAll('.accept-incoming-stock-edit-button');
$buttonElements.forEach((e) =>
  e.addEventListener('click', () => {
    const inboundOrder: IInboundOrderOut = JSON.parse(e.getAttribute('data-target'));
    editIncomingStock(inboundOrder);
    //sessionStorage.setItem('inboundOrder', JSON.stringify(inboundOrder))
  })
);

function editIncomingStock(inboundOrder: IInboundOrderOut) {
  let input: HTMLInputElement = document.querySelector('#incoming-stock-edit-id');
  input.value = inboundOrder.id.toString();

  inboundOrder.productsAllocated.forEach((productAllocated) => {
    createIncomingStockOrderItems(productAllocated);
  });

  acceptModal.show();
}

function createIncomingStockOrderItems(productAllocated: IAllocatedProductOut) {
  const incomingStockAddContainer = document.querySelector('#incoming-stock-edit-add-container');
  // const incomingStockAddItem = document.createElement('div')
  // incomingStockAddItem.classList.add('p-6', 'space-y-6', 'border-t', 'incoming-stock-edit-add-item')

  const productAllocatedContainer = document
    .getElementById('product-incoming-stock-edit-template')
    .cloneNode(true) as HTMLDivElement;
  productAllocatedContainer.classList.remove('hidden');
  productAllocatedContainer.classList.add('grid');
  productAllocatedContainer.removeAttribute('id');

  // Set image
  const imageURL = productAllocated.product.image
    ? `data:image/png;base64, ${productAllocated.product.image}`
    : 'https://raw.githubusercontent.com/Simple2B/BeamSuntory/develop/app/static/img/no_picture_default.png';

  const productImage: HTMLImageElement = productAllocatedContainer.querySelector('.product-incoming-stock-image');
  productImage.setAttribute('src', imageURL);
  productImage.addEventListener('click', () => {
    getFullImage(productAllocated.product.id.toString());
  });

  const productNameDiv = productAllocatedContainer.querySelector('.product-incoming-stock-edit-product-name');
  productNameDiv.innerHTML = productAllocated.product.name;

  const productSKUDiv = productAllocatedContainer.querySelector('.product-incoming-stock-edit-product-sku');
  productSKUDiv.innerHTML = productAllocated.product.SKU;

  const totalAllocatedQuantityDiv = productAllocatedContainer.querySelector(
    '.product-incoming-stock-edit-total-quantity'
  );
  totalAllocatedQuantityDiv.innerHTML = productAllocated.quantity.toString();

  const groupQuantityContainerTemplate = document.getElementById(
    'product-allocated-quantity-container-template'
  ) as HTMLDivElement;

  const productQuantityGroupsLength = productAllocated.productQuantityGroups.length;
  productAllocated.productQuantityGroups.forEach((quantityGroup, index) => {
    const groupQuantityContainer = groupQuantityContainerTemplate.cloneNode(true) as HTMLDivElement;
    groupQuantityContainer.removeAttribute('id');
    groupQuantityContainer.classList.remove('hidden');

    const groupQuantityNameDiv = groupQuantityContainer.querySelector('.product-quantity-group-name');
    groupQuantityNameDiv.innerHTML = quantityGroup.group.name;
    groupQuantityNameDiv.setAttribute('data-target', quantityGroup.group.id.toString());

    const groupQuantityNameIdInput = document.createElement('input');
    groupQuantityNameIdInput.classList.add('group-quantity-name-id-input', 'hidden');
    groupQuantityNameIdInput.value = quantityGroup.group.id.toString();

    const groupQuantityTotalDiv = groupQuantityContainer.querySelector('.group-ordered-quantity');
    groupQuantityTotalDiv.innerHTML = quantityGroup.quantity.toString();

    const groupQuantityReceivedInput = groupQuantityContainer.querySelector(
      '.group-received-quantity'
    ) as HTMLInputElement;
    groupQuantityReceivedInput.value = quantityGroup.quantity.toString();
    groupQuantityReceivedInput.classList.add(
      `product-${productAllocated.id}-group-${quantityGroup.group.id}-received-quantity`
    );

    productAllocatedContainer.appendChild(groupQuantityNameDiv.parentNode);
    productAllocatedContainer.appendChild(groupQuantityTotalDiv.parentNode);
    productAllocatedContainer.appendChild(groupQuantityReceivedInput.parentNode);

    const packageInfoContainer = document.createElement('div');
    packageInfoContainer.classList.add('grid', 'grid-cols-12', 'col-span-12', 'gap-4', 'package-info-container');
    if (index !== productQuantityGroupsLength - 1) {
      packageInfoContainer.classList.add('packageInfoContainer-border', 'pb-4');
    } else {
      packageInfoContainer.classList.add('margin-b-5');
    }
    packageInfoContainer.appendChild(groupQuantityNameIdInput);

    const productGroupQuantityPackageInfoContainer = document
      .getElementById('product-package-info-container-template')
      .cloneNode(true) as HTMLDivElement;
    productGroupQuantityPackageInfoContainer.classList.remove('hidden');
    productGroupQuantityPackageInfoContainer.removeAttribute('id');
    const packageInfoFields: NodeListOf<HTMLDivElement> =
      productGroupQuantityPackageInfoContainer.querySelectorAll('.quantity-container');

    const quantityPerWrapDiv = productGroupQuantityPackageInfoContainer.querySelector(
      '.quantity-per-wrap'
    ) as HTMLInputElement;
    quantityPerWrapDiv.classList.add(`product-${productAllocated.id}-group-${quantityGroup.group.id}-per-wrap`);
    quantityPerWrapDiv.setAttribute('required', 'true');
    quantityPerWrapDiv.placeholder = 'Quantity';

    const quantityWrapCartonDiv = productGroupQuantityPackageInfoContainer.querySelector(
      '.quantity-wrap-carton'
    ) as HTMLInputElement;
    quantityWrapCartonDiv.classList.add(`product-${productAllocated.id}-group-${quantityGroup.group.id}-wrap-carton`);
    quantityWrapCartonDiv.setAttribute('required', 'true');
    quantityWrapCartonDiv.placeholder = 'Quantity';

    const quantityCartonMasterDiv = productGroupQuantityPackageInfoContainer.querySelector(
      '.quantity-carton-master'
    ) as HTMLInputElement;
    quantityCartonMasterDiv.classList.add(
      `product-${productAllocated.id}-group-${quantityGroup.group.id}-carton-master`
    );
    quantityCartonMasterDiv.placeholder = 'Quantity';

    packageInfoFields.forEach((packageInfoField) => {
      // packageInfoField.classList.add()

      packageInfoContainer.appendChild(packageInfoField);
    });
    productAllocatedContainer.appendChild(packageInfoContainer);
  });

  incomingStockAddContainer.appendChild(productAllocatedContainer);
}

// search flow
const searchInput: HTMLInputElement = document.querySelector('#table-search-incoming-stocks');
const searchInputButton = document.querySelector('#table-search-incoming-stock-button');
if (searchInputButton && searchInput) {
  searchInputButton.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.set('q', searchInput.value);
    window.location.href = `${url.href}`;
  });
}
const cancelOrderButtons = document.querySelectorAll('.cancel-incoming-stock-btn');

cancelOrderButtons.forEach((e) => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-cancel-incoming-stock-id');
      const response = await fetch(`/incoming_stock/cancel/${id}`, {
        method: 'GET',
      });
      if (response.status == 200) {
        location.reload();
      }
    }
  });
});

// function setProducts() {
//     const incomingStockProducts = document.querySelectorAll('.incoming-stock-product-item')
//     const incomingStockProductsQuantity = document.querySelectorAll('.incoming-stock-edit-received-quantity')
//     const products: IIncomingStockProduct[] = []

//     incomingStockProducts.forEach((incomingStockProduct, i) => {
//         const incomingStockQuantity = incomingStockProductsQuantity[i] as HTMLInputElement
//         const productId = incomingStockProduct.getAttribute('data-target-product-id')
//         const quantityPerWrap = incomingStockProduct.querySelector('.quantity-per-wrap') as HTMLInputElement
//         const quantityWrapCarton = incomingStockProduct.querySelector('.quantity-wrap-carton') as HTMLInputElement
//         const quantityCartonMaster = incomingStockProduct.querySelector('.quantity-carton-master') as HTMLInputElement

//         const product: IIncomingStockProduct = {
//             product_id: parseInt(productId),
//             quantity_received: parseInt(incomingStockQuantity.value),
//             quantity_per_wrap: parseInt(quantityPerWrap.value),
//             quantity_wrap_carton: parseInt(quantityWrapCarton.value),
//             quantity_carton_master: parseInt(quantityCartonMaster.value),
//             group_id: productGroupQuantity[`group_id-${i}`],
//         }
//         products.push(product)
//     })

//     inputReceivedProducts.value = JSON.stringify(products)
// }

// ----submit form through hidden submit button----
const inboundOrderSubmitButton: HTMLButtonElement = document.querySelector('#incoming-stock-submit-btn');

const filterButton = document.querySelector('#incoming-stock-filter-button') as HTMLButtonElement;
const orderFilterInputs = document.querySelectorAll('.incoming-stock-filter-input');
const hiddenInput = document.querySelector('#sort_by') as HTMLInputElement;

filterButton.addEventListener('click', () => {
  orderFilterInputs.forEach((input: HTMLInputElement) => {
    if (input.checked && input.nextElementSibling.textContent.trim() != 'Default Value') {
      hiddenInput.value = input.nextElementSibling.textContent.trim();
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // ----accept goods---
  const acceptGoodsSubmitButton: HTMLButtonElement = document.querySelector('#incoming-stock-save-products-btn');
  // ----view modal----
  const viewIncomingStockButtons = document.querySelectorAll(
    '.incoming-stock-view-button'
  ) as NodeListOf<HTMLButtonElement>;
  const viewModalInboundOrderId: HTMLInputElement = document.querySelector('#incoming-stock-view-inbound-order-id');
  const viewModalOrderId: HTMLDivElement = document.querySelector('#incoming-stock-view-order-id');
  const viewModalOrderTitle: HTMLDivElement = document.querySelector('#incoming-stock-view-order-title');
  const viewModalOrderStatus: HTMLDivElement = document.querySelector('#incoming-stock-view-status');
  const viewModalSupplierName: HTMLDivElement = document.querySelector('#incoming-stock-view-supplier-id');
  const viewModalSupplierAddress: HTMLDivElement = document.querySelector('#incoming-stock-view-supplier-address');
  const viewModalWarehouse: HTMLDivElement = document.querySelector('#incoming-stock-view-warehouse-id');
  const viewModalActiveDate: HTMLDivElement = document.querySelector('#incoming-stock-view-active-date');
  const viewModalActiveTime: HTMLDivElement = document.querySelector('#incoming-stock-view-active-time');
  const viewModalDeliveryDate: HTMLDivElement = document.querySelector('#incoming-stock-view-delivery-date');
  const viewModalAcceptButton: HTMLButtonElement = document.querySelector('#accept-incoming-stock-edit-button');
  const wmNotesView: HTMLInputElement = document.querySelector('#incoming-stock-view-wm-notes');
  const daNotesView: HTMLInputElement = document.querySelector('#incoming-stock-view-da-notes');
  const orderIdInput: HTMLInputElement = document.querySelector('#incoming-stock-edit-id');
  const proofOfDelivery: HTMLInputElement = document.querySelector('#incoming-stock-view-proof-of-delivery');
  const tracking: HTMLInputElement = document.querySelector('#incoming-stock-view-tracking');

  const orderProductAllocatedBaseView: HTMLDivElement = document.querySelector('#product-allocated-container');
  const orderProductContainerView: HTMLDivElement = document.querySelector('#incoming-stock-product-container');

  viewModalAcceptButton.addEventListener('click', (e: MouseEvent) => {
    const inboundOrder: IInboundOrderOut = JSON.parse(
      (e.currentTarget as HTMLButtonElement).getAttribute('data-target')
    );
    orderIdInput.value = inboundOrder.id.toString();

    inboundOrder.productsAllocated.forEach((productAllocated) => {
      createIncomingStockOrderItems(productAllocated);
    });

    acceptModal.show();
  });

  viewIncomingStockButtons.forEach((viewButton) =>
    viewButton.addEventListener('click', () => {
      const inboundOrder: IInboundOrderOut = JSON.parse(viewButton.getAttribute('data-target'));
      viewModalInboundOrderId.value = inboundOrder.id.toString();
      viewModalOrderId.innerHTML = inboundOrder.orderId;
      viewModalOrderTitle.innerHTML = inboundOrder.title;
      viewModalOrderStatus.innerHTML = inboundOrder.status;
      viewModalSupplierName.innerHTML = inboundOrder.supplier.name;
      viewModalSupplierAddress.innerHTML = inboundOrder.supplier.address;
      viewModalWarehouse.innerHTML = inboundOrder.warehouse.name;
      viewModalActiveDate.innerHTML = inboundOrder.activeDate;
      viewModalActiveTime.innerHTML = inboundOrder.activeTime;
      viewModalDeliveryDate.innerHTML = inboundOrder.deliveryDate;
      wmNotesView.value = inboundOrder.wmNotes;
      daNotesView.value = inboundOrder.daNotes;
      proofOfDelivery.value = inboundOrder.proofOfDelivery ?? '';
      tracking.value = inboundOrder.tracking ?? '';
      if (inboundOrder.status !== 'In transit') {
        viewModalAcceptButton.classList.add('invisible');
      } else {
        // Pickup order
        viewModalAcceptButton.classList.remove('invisible');
        viewModalAcceptButton.setAttribute('data-target', viewButton.getAttribute('data-target'));
      }

      const previousProducts = orderProductContainerView.querySelectorAll('#product-allocated-container');
      previousProducts.forEach((previousProduct) => {
        previousProduct.remove();
      });

      inboundOrder.productsAllocated.forEach((productsAllocated) => {
        const productAllocatedContainer = orderProductAllocatedBaseView.cloneNode(true) as HTMLDivElement;
        productAllocatedContainer.classList.remove('hidden');
        productAllocatedContainer.classList.add('grid');

        const orderProductNamesView: HTMLDivElement = productAllocatedContainer.querySelector(
          '#incoming-stock-view-product-name'
        );
        const orderProductQuantitiesView: HTMLDivElement = productAllocatedContainer.querySelector(
          '#incoming-stock-view-product-quantity'
        );
        const orderProductSkuView: HTMLDivElement = productAllocatedContainer.querySelector(
          '#incoming-stock-view-product-sku'
        );

        orderProductNamesView.innerHTML = productsAllocated.product.name;
        orderProductQuantitiesView.innerHTML = productsAllocated.quantity.toString();
        orderProductSkuView.innerHTML = productsAllocated.product.SKU;

        orderProductContainerView.appendChild(productAllocatedContainer);
      });

      viewModal.show();
    })
  );

  // accept goods submit
  acceptGoodsSubmitButton.addEventListener('click', () => {
    console.log('click');
  });

  const inboundOrderSaveProductsButton = document.querySelector('#incoming-stock-save-products-btn');
  inboundOrderSaveProductsButton.addEventListener('click', () => {
    // setProducts()
    const products: IIncomingStockProduct[] = [];
    const inboundOrder: IInboundOrderOut = JSON.parse(viewModalAcceptButton.getAttribute('data-target'));
    inboundOrder.productsAllocated.forEach((productAllocated) => {
      const stock: IIncomingStockProduct = {
        allocatedProductId: productAllocated.id,
        packages: [],
      };
      console.log('productAllocated', productAllocated);

      productAllocated.productQuantityGroups.forEach((productQuantityGroup) => {
        const receivedQtyInput: HTMLInputElement = document.querySelector(
          `.product-${productAllocated.id}-group-${productQuantityGroup.group.id}-received-quantity`
        );
        const perWrapInput: HTMLInputElement = document.querySelector(
          `.product-${productAllocated.id}-group-${productQuantityGroup.group.id}-per-wrap`
        );
        const wrapCartonInput: HTMLInputElement = document.querySelector(
          `.product-${productAllocated.id}-group-${productQuantityGroup.group.id}-wrap-carton`
        );
        const cartonMasterInput: HTMLInputElement = document.querySelector(
          `.product-${productAllocated.id}-group-${productQuantityGroup.group.id}-carton-master`
        );
        const packageInfoData: IPackageInfo = {
          productQuantityGroupId: productQuantityGroup.id,
          quantityPerWrap: parseInt(perWrapInput.value),
          quantityWrapCarton: parseInt(wrapCartonInput.value),
          quantityCartonMaster: parseInt(cartonMasterInput.value),
          quantityReceived: parseInt(receivedQtyInput.value),
        };

        stock.packages.push(packageInfoData);
      });
      products.push(stock);
    });

    inputReceivedProducts.value = JSON.stringify(products);

    inboundOrderSubmitButton.click();
  });
});

// function viewIncomingStock(inboundOrder: IInboundOrder) {
//     const packageInfo: IPackageInfo = inboundOrder.package_info
//     console.log(inboundOrder)

//     let div: HTMLDivElement = document.querySelector('#incoming-stock-view-order-id')
//     div.innerHTML = inboundOrder.order_id
//     div = document.querySelector('#incoming-stock-view-order-title')
//     div.innerHTML = inboundOrder.order_title
//     div = document.querySelector('#incoming-stock-view-active-date')
//     div.innerHTML = convertDate(inboundOrder.active_date.toString())
//     div = document.querySelector('#incoming-stock-view-active-time')
//     div.innerHTML = inboundOrder.active_time
//     div = document.querySelector('#incoming-stock-view-delivery-date')
//     div.innerHTML = convertDate(inboundOrder.delivery_date.toString())
//     div = document.querySelector('#incoming-stock-view-status')
//     div.innerHTML = inboundOrder.status
//     div = document.querySelector('#incoming-stock-view-supplier-id')
//     div.innerHTML = inboundOrder.sup_da_wh_prod_objs.supplier
//     div = document.querySelector('#incoming-stock-view-warehouse-id')
//     div.innerHTML = inboundOrder.sup_da_wh_prod_objs.warehouse

//     if (Object.keys(inboundOrder.inbound_order_prods).length > 0) {
//         const currentInboundOrder = inboundOrder.inbound_order_prods[inboundOrder.order_id]

//         if (currentInboundOrder) {
//             for (let i = 0; i < currentInboundOrder.length; i++) {
//                 createViewIncomingStockItems(inboundOrder, currentInboundOrder[i])
//             }
//         }
//     }

//     viewModal.show()
// }

// function convertDate(date: string) {
//     const inputDate = date.split('T')[0]
//     const dateParts = inputDate.split('-')
//     const year = dateParts[0]
//     const month = dateParts[1]
//     const day = dateParts[2]
//     return `${month}/${day}/${year}`
// }

// ----add inbound order item----
// function createViewIncomingStockItems(inbOrder: IInboundOrder = null, curInbOrder: IInboundOrderProd = null) {
//     console.log(inbOrder)

//     if (!inbOrder) {
//         const inboundOrder: IInboundOrder = JSON.parse(sessionStorage.getItem('inboundOrder'))
//         inbOrder = inboundOrder
//     }
//     const inboundOrderAddContainer = document.querySelector('#incoming-stock-view-add-container')
//     const inboundOrderAddItem = document.createElement('div')
//     inboundOrderAddItem.classList.add('p-6', 'space-y-6', 'border-t', 'incoming-stock-view-add-item')
//     inboundOrderAddItem.innerHTML = `
//     <div class="grid grid-cols-12 gap-5">
//         <div class="col-span-6 sm:col-span-4">
//             <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product</label>
//             <div
//                 class="incoming-stock-view-add-product shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
//             </div>
//         </div>
//         <div class="col-span-6 sm:col-span-3">
//             <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SKU</label>
//             <div
//                 class="incoming-stock-view-add-SKU shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
//             </div>
//         </div>
//         <div class="col-span-6 sm:col-span-3">
//         <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group</label>
//         <div
//             class="incoming-stock-view-add-group shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
//         </div>
//         </div>
//         <div class="col-span-6 sm:col-span-2">
//         <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
//         <div
//             class="incoming-stock-view-add-quantity shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
//         </div>
//         </div>
//     </div>
//   `

//     const inboundOrderAddProduct: HTMLInputElement = inboundOrderAddItem.querySelector(
//         '.incoming-stock-view-add-product'
//     )
//     const inboundOrderAddSKU: HTMLInputElement = inboundOrderAddItem.querySelector('.incoming-stock-view-add-SKU')
//     const inboundOrderAddGroup: HTMLInputElement = inboundOrderAddItem.querySelector('.incoming-stock-view-add-group')
//     const inboundOrderAddQuantity: HTMLInputElement = inboundOrderAddItem.querySelector(
//         '.incoming-stock-view-add-quantity'
//     )

//     inboundOrderAddProduct.innerHTML = curInbOrder.product.name
//     inboundOrderAddSKU.innerHTML = curInbOrder.product.SKU
//     inboundOrderAddGroup.innerHTML = curInbOrder.group.name
//     inboundOrderAddQuantity.innerHTML = curInbOrder.quantity.toString()

//     inboundOrderAddContainer.appendChild(inboundOrderAddItem)
// }

// // function to filter order by status
// const orderFilterInputs = document.querySelectorAll('.incoming-stock-filter-input')
// const sortByNameIncomingStockStorage = JSON.parse(sessionStorage.getItem('sortByNameIncomingStock'))

// if (sortByNameIncomingStockStorage) {
//     const filterDropdownContainer = document.querySelector('#dropdownRadioButton-incoming-stock-status')
//     filterDropdownContainer.innerHTML = `${sortByNameIncomingStockStorage}
//           <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
//           viewBox="0 0 10 6">
//           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//             d="m1 1 4 4 4-4" />
//         </svg>`
// }
