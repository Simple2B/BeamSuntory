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
      const response = await fetch(`/incoming_stock/pickup/${id}`, {
        method: 'GET',
      });
      if (response.status == 200) {
        location.reload();
      }
    }
  });
});
