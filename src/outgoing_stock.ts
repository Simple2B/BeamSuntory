import { IGroup } from './types';
import { addSearchEvent } from './utils';

interface IEvent {
  dateFrom: string;
  dateTo: string;
}

interface IStore {
  id: number;
  storeName: string;
  address: string;
  phoneNumb: string;
  country: string;
  region: string;
  city: string;
  zip: string;
}
interface ICart {
  product: IProduct;
  group: IGroup;
  quantity: number;
  event?: IEvent;
  warehouse?: IWarehouse;
  status: string;
}

interface ShipRequestUser {
  username: string;
  streetAddress: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  zipCode: string | null;
}

export interface IShipRequest {
  id: number;
  orderNumb: string;
  status: string;
  orderType: string;
  storeId: number;
  warehouseId: number;
  warehouseName: string;
  createdAt: string;
  quantity: number;
  current_order_carts: IProduct[];
  comment: string;
  wmNotes: string;
  daNotes: string;
  proofOfDelivery: string | null;
  tracking: string | null;
  carts: ICart[];
  store: IStore;
  user: ShipRequestUser | null;
}

interface IProduct {
  id: number;
  name: string;
  quantity: string;
  regularPrice: number;
  retailPrice: number;
  image: string;
  SKU: string;
  comment: string;
  notes_location: string;
  group: string;
  warehouse: { id: number; name: string };
  warehouses: IWarehouse[];
}

interface IWarehouse {
  id: number;
  name: string;
  products_ids: number[];
}
// search flow
const searchOutgoingInput: HTMLInputElement = document.querySelector('#table-search-outgoing-stock');
const searchOutgoingInputButton = document.querySelector('#table-search-outgoing-stock-button');
addSearchEvent(searchOutgoingInput, searchOutgoingInputButton);

const printBtn = document.querySelector('#print-outgoing-stock');
printBtn.addEventListener('click', async (e) => {
  const url = new URL(window.location.origin + '/outgoing_stock/print');
  url.searchParams.set('q', searchOutgoingInput.value);
  url.searchParams.set('status', JSON.parse(sessionStorage.getItem('sortByNameOutgoingStock')));
  const res = await fetch(url);
  const resData = await res.text();
  window.document.body.innerHTML = resData;
  window.print();
  location.reload();
});

const cancelButtons = document.querySelectorAll('.cancel-outgoing-stock-btn');

cancelButtons.forEach((e) => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-outgoing-stock-id');
      const response = await fetch(`/outgoing_stock/cancel/${id}`, {
        method: 'GET',
      });
      if (response.status == 200 || response.status == 404) {
        location.reload();
      }
    }
  });
});

// function to filter order by status
const orderFilterInputs = document.querySelectorAll('.outgoing-stock-filter-input');
const sortByNameOutgoingStockStorage = JSON.parse(sessionStorage.getItem('sortByNameOutgoingStock'));

if (sortByNameOutgoingStockStorage) {
  const filterDropdownContainer = document.querySelector('#dropdownRadioButton-outgoing-stock-status');
  filterDropdownContainer.innerHTML = `${sortByNameOutgoingStockStorage}
          <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m1 1 4 4 4-4" />
        </svg>`;
}

orderFilterInputs.forEach((input: HTMLInputElement) => {
  const hiddenInput = document.querySelector('#sort_by') as HTMLInputElement;
  input.addEventListener('change', () => {
    if (input.checked) {
      hiddenInput.value = input.value;
      sessionStorage.setItem('sortByNameOutgoingStock', JSON.stringify(input.value));
    }
  });
});

// observer for outgoing stock view, edit modal
const body = document.querySelector('body');

const handleOrderView = () => {
  const orderView = document.querySelector('#outgoing-stock-ship-request-edit') as HTMLDivElement;
  if (orderView) {
    selectAllWarehouseHandler(orderView);
  }
};
const observer = new MutationObserver(handleOrderView);
const config: MutationObserverInit = { childList: true, subtree: true };
observer.observe(body, config);

function setWarehouseIdsForInputs(div: HTMLDivElement, id: number) {
  const warehouseInputs = div.querySelectorAll('select[name="warehouse_id"]') as NodeListOf<HTMLSelectElement>;
  warehouseInputs.forEach((selectElement) => {
    const options = selectElement.options;
    for (let i = 0; i < options.length; i++) {
      if (parseInt(options[i].value) === id) {
        options[i].selected = true;
      }
    }
  });
}

function selectAllWarehouseHandler(div: HTMLDivElement) {
  const selectWarehouse: HTMLSelectElement = div.querySelector('#outgoing-stock-edit-warehouse-name');
  const chechboxSelectAll: HTMLInputElement = div.querySelector('#outgoing-stock-edit-warehouse-set-all');
  if (!selectWarehouse || !chechboxSelectAll) return;

  selectWarehouse.addEventListener('change', () => {
    if (!chechboxSelectAll.checked || !selectWarehouse.value) return;
    setWarehouseIdsForInputs(div, parseInt(selectWarehouse.value));
  });
  chechboxSelectAll.addEventListener('change', () => {
    if (!chechboxSelectAll.checked || !selectWarehouse.value) return;
    setWarehouseIdsForInputs(div, parseInt(selectWarehouse.value));
  });
}
