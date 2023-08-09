interface IShipRequest {
  id: number;
  order_numb: string;
  status: string;
  order_type: string;
  store_id: number;
  warehouse_id: number;
  warehouse_name: string;
  created_at: string;
  quantity: number;
  current_order_carts: IProduct[];
  comment: string;
  warehouses: IWarehouse[];
}

interface IProduct {
  id: number;
  name: string;
  quantity: string;
  price: number;
  image: string;
  SKU: string;
  comment: string;
}

interface IStore {
  id: number;
  store_name: string;
  address: string;
  phone_numb: string;
  country: string;
  region: string;
  city: string;
  zip: string;
}

interface IWarehouse {
  id: number;
  name: string;
}

// search flow
const searchPickupInput: HTMLInputElement = document.querySelector(
  '#table-search-pickup-orders',
);
const searchPickupInputButton = document.querySelector(
  '#table-search-pickup-order-button',
);
if (searchPickupInputButton && searchPickupInput) {
  searchPickupInputButton.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.set('q', searchPickupInput.value);
    window.location.href = `${url.href}`;
  });
}
const pickupButtons = document.querySelectorAll('.pickup-order-btn');

pickupButtons.forEach(e => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-pickup-order-id');
      const response = await fetch(`/pickup_order/pickup/${id}`, {
        method: 'GET',
      });
      if (response.status == 200) {
        location.reload();
      }
    }
  });
});

const deliverButtons = document.querySelectorAll('.deliver-order-btn');

deliverButtons.forEach(e => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-deliver-order-id');
      const response = await fetch(`/pickup_order/deliver/${id}`, {
        method: 'GET',
      });
      if (response.status == 200) {
        location.reload();
      }
    }
  });
});

// function to filter order by status
const orderFilterInputs = document.querySelectorAll(
  '.pickup_order-filter-input',
);
const sortByNamePickupOrderStorage = JSON.parse(
  sessionStorage.getItem('sortByNamePickupOrder'),
);

if (sortByNamePickupOrderStorage) {
  const filterDropdownContainer = document.querySelector(
    '#dropdownRadioButton-pickup_order-status',
  );
  filterDropdownContainer.innerHTML = `${sortByNamePickupOrderStorage}
          <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m1 1 4 4 4-4" />
        </svg>`;
}

orderFilterInputs.forEach((input: HTMLInputElement) => {
  const hiddenInput = document.querySelector('#sort_by') as HTMLInputElement;
  input.addEventListener('change', () => {
    console.log('input changed', input.checked);
    if (input.checked) {
      hiddenInput.value = input.value;
      sessionStorage.setItem(
        'sortByNamePickupOrder',
        JSON.stringify(input.value),
      );
    }
  });
});
