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
}

interface IInboundOrderProd {
  product: {id: number; name: string; SKU: string; image: string};
  group: {id: number; name: string};
  quantity: number;
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

pickupInboundButtons.forEach(e => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-pickup-inbound-id');
      const response = await fetch(`/pickup_inbound/pickup/${id}`, {
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
  '.pickup_inbound-filter-input',
);
const sortByNamePickupInboundStorage = JSON.parse(
  sessionStorage.getItem('sortByNamePickupInbound'),
);

if (sortByNamePickupInboundStorage) {
  const filterDropdownContainer = document.querySelector(
    '#dropdownRadioButton-pickup_inbound-status',
  );
  filterDropdownContainer.innerHTML = `${sortByNamePickupInboundStorage}
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
        'sortByNamePickupInbound',
        JSON.stringify(input.value),
      );
    }
  });
});
