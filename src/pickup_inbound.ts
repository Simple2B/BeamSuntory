import {Modal} from 'flowbite';
import type {ModalOptions, ModalInterface} from 'flowbite';

interface SupDAWhProd {
  supplier: string;
  delivery_agent: string;
  warehouse: string;
  product: string;
}

interface IInboundOrder {
  id: number;
  order_id: string;
  active_date: number;
  active_time: string;
  order_title: string;
  quantity: number;
  delivery_date: string;
  status: string;
  supplier_id: number;
  delivery_agent_id: number;
  warehouse_id: number;
  product_id: number;
  sup_da_wh_prod_objs: SupDAWhProd;
  inbound_order_prods: {
    [index: string]: IInboundOrderProd[];
  };
  package_info: IPackageInfo;
}

interface IInboundOrderProd {
  product: {id: number; name: string; SKU: string; image: string};
  group: {id: number; name: string};
  quantity: number;
}

interface IPackageInfo {
  quantity_carton_master: number;
  quantity_per_wrap: number;
  quantity_wrap_carton: number;
}

const $modalElement: HTMLElement = document.querySelector(
  '#editPickupInboundModal',
);

const modalOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses:
    'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {
    const pickupInboundItems = document.querySelectorAll(
      '.pickup-inbound-edit-add-item',
    );
    pickupInboundItems.forEach(item => {
      item.remove();
    });
    sessionStorage.removeItem('inboundOrder');
  },
  onShow: () => {
    console.log('inbound-order id: ');
  },
  onToggle: () => {
    console.log('modal has been toggled');
  },
};

const modal: ModalInterface = new Modal($modalElement, modalOptions);

const $buttonElements = document.querySelectorAll(
  '.pickup-inbound-edit-button',
);
$buttonElements.forEach(e =>
  e.addEventListener('click', () => {
    const inboundOrder: IInboundOrder = JSON.parse(
      e.getAttribute('data-target'),
    );
    editPickupInbound(inboundOrder);
    sessionStorage.setItem('inboundOrder', JSON.stringify(inboundOrder));
  }),
);

function editPickupInbound(inboundOrder: IInboundOrder) {
  console.log('inboundOrder:', inboundOrder);
  let input: HTMLInputElement = document.querySelector(
    '#pickup-inbound-edit-id',
  );
  input.value = inboundOrder.id.toString();

  if (Object.keys(inboundOrder.inbound_order_prods).length > 0) {
    const currentInboundOrder =
      inboundOrder.inbound_order_prods[inboundOrder.order_id];

    if (currentInboundOrder) {
      for (let i = 0; i < currentInboundOrder.length; i++) {
        createInboundOrderItems(currentInboundOrder[i]);
      }
    }
  }
  modal.show();
}

function createInboundOrderItems(curInbOrder: IInboundOrderProd) {
  const pickupInboundAddContainer = document.querySelector(
    '#pickup-inbound-edit-add-container',
  );
  const pickupInboundAddItem = document.createElement('div');
  pickupInboundAddItem.classList.add(
    'p-6',
    'space-y-6',
    'border-t',
    'pickup-inbound-edit-add-item',
  );
  pickupInboundAddItem.innerHTML = `
  <div class="pickup-inbound-product-item grid grid-cols-12 gap-4" data-target-product-id="${curInbOrder.product.id}" >
    <div class="col-span-6 sm:col-span-4 sm:row-span-2 max-height-image-container">
      <img src="data:image/png;base64, ${curInbOrder.product.image}" class="pickup-inbound-edit-product-image w-full h-full object-cover">
    </div>
    <div class="col-span-6 sm:col-span-8">
      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
      <div
        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      ${curInbOrder.product.name}
      </div>
    </div>
    <div class="col-span-6 sm:col-span-8">
      <label for="SKU" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SKU</label>
      <div
        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      ${curInbOrder.product.SKU}
      </div>
    </div>
    <div class="col-span-6 sm:col-span-6">
      <label for="package_qty" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Qty. Ordered</label>
      <div
        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      ${curInbOrder.quantity}
      </div>
    </div>
    <div class="col-span-6 sm:col-span-6">
      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Qty. Recieved</label>
      <input type="text" name="recieved_quantity"
        class="pickup-inbound-edit-recieved-quantity shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Quantity" required>
    </div>
  </div>
`;
  const productImage: HTMLImageElement = pickupInboundAddItem.querySelector(
    '.pickup-inbound-edit-product-image',
  );
  if (productImage.src.length < 100) {
    const defaultBrandImage =
      'https://funko.com/on/demandware.static/-/Sites-funko-master-catalog/default/dwbb38a111/images/funko/upload/55998_CocaCola_S2_SpriteBottleCap_POP_GLAM-WEB.png';
    productImage.src = defaultBrandImage;
  }

  pickupInboundAddContainer.appendChild(pickupInboundAddItem);
}

// search flow
const searchPickupInboundInput: HTMLInputElement = document.querySelector(
  '#table-search-pickup-inbounds',
);
const searchPickupInboundInputButton = document.querySelector(
  '#table-search-pickup-inbound-button',
);
if (searchPickupInboundInputButton && searchPickupInboundInput) {
  searchPickupInboundInputButton.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.set('q', searchPickupInboundInput.value);
    window.location.href = `${url.href}`;
  });
}
const pickupInboundButtons = document.querySelectorAll('.pickup-inbound-btn');

function setProducts() {
  const pickupInboundProducts = document.querySelectorAll(
    '.pickup-inbound-product-item',
  );
  const pickupInboundProductsQuantity = document.querySelectorAll(
    '.pickup-inbound-edit-recieved-quantity',
  );
  const products = [];

  for (let i = 0; i < pickupInboundProducts.length; i++) {
    const pickupInboundProduct = pickupInboundProducts[i] as HTMLDivElement;
    const pickupInboundQuantity = pickupInboundProductsQuantity[
      i
    ] as HTMLInputElement;
    const productId = pickupInboundProduct.getAttribute(
      'data-target-product-id',
    );
    const product = {
      product_id: productId,
      quantity: pickupInboundQuantity.value,
    };
    products.push(product);
  }

  const inputRecievedProducts: HTMLInputElement = document.querySelector(
    '#pickup-inbound-edit-recieved-products',
  );
  inputRecievedProducts.value = JSON.stringify(products);
}

// ----submit form through hidden submit button----
const inboundOrderSubmitButton: HTMLButtonElement = document.querySelector(
  '#pickup-inbound-submit-btn',
);
const inboundOrderSaveProductsButton = document.querySelector(
  '#pickup-inbound-save-products-btn',
);

inboundOrderSaveProductsButton.addEventListener('click', async () => {
  setProducts();
  if (confirm('Are sure?')) {
    const inboundOrder: IInboundOrder = JSON.parse(
      sessionStorage.getItem('inboundOrder'),
    );
    const response = await fetch(`/pickup_inbound/pickup/${inboundOrder.id}`, {
      method: 'GET',
    });
    if (response.status == 200) {
      inboundOrderSubmitButton.click();
    }
  }
});

// ----view modal----
const viewPickupInboundButtons = document.querySelectorAll(
  '.pickup-inbound-view-button',
);
viewPickupInboundButtons.forEach(e =>
  e.addEventListener('click', () => {
    const inboundOrder: IInboundOrder = JSON.parse(
      e.getAttribute('data-target'),
    );
    const packageInfo: IPackageInfo = inboundOrder.package_info;

    let div: HTMLDivElement = document.querySelector(
      '#pickup-inbound-view-quantity-wrap',
    );
    div.innerHTML = packageInfo.quantity_per_wrap.toString();
    div = document.querySelector('#pickup-inbound-view-quantity-wrap-carton');
    div.innerHTML = packageInfo.quantity_wrap_carton.toString();
    div = document.querySelector('#pickup-inbound-view-quantity-carton-master');
    div.innerHTML = packageInfo.quantity_carton_master.toString();
  }),
);
