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
const searchOutgoingInput: HTMLInputElement = document.querySelector(
  '#table-search-outgoing-stocks',
);
const searchOutgoingInputButton = document.querySelector(
  '#table-search-outgoing-stock-button',
);
if (searchOutgoingInputButton && searchOutgoingInput) {
  searchOutgoingInputButton.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.set('q', searchOutgoingInput.value);
    window.location.href = `${url.href}`;
  });
}
const dispatchButtons = document.querySelectorAll(
  '.dispatch-outgoing-stock-btn',
);

dispatchButtons.forEach(e => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-outgoing-stock-id');
      const response = await fetch(`/outgoing_stock/dispatch/${id}`, {
        method: 'GET',
      });
      if (response.status == 200) {
        location.reload();
      }
    }
  });
});

const cancelButtons = document.querySelectorAll('.cancel-outgoing-stock-btn');

cancelButtons.forEach(e => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-outgoing-stock-id');
      const response = await fetch(`/outgoing_stock/cancel/${id}`, {
        method: 'GET',
      });
      if (response.status == 200) {
        location.reload();
      }
    }
  });
});
