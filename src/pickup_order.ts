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
