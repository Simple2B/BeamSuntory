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

function convertDate(date: string) {
  const inputDate = date.split('T')[0];
  const dateParts = inputDate.split('-');
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];
  return `${month}/${day}/${year}`;
}

// search flow
const searchInput: HTMLInputElement = document.querySelector(
  '#table-search-incoming-stocks',
);
const searchInputButton = document.querySelector(
  '#table-search-incoming-stock-button',
);
if (searchInputButton && searchInput) {
  searchInputButton.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.set('q', searchInput.value);
    window.location.href = `${url.href}`;
  });
}
const acceptButtons = document.querySelectorAll('.accept-incoming-stock-btn');

acceptButtons.forEach(e => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-incoming-stock-id');
      const response = await fetch(`/incoming_stock/accept/${id}`, {
        method: 'GET',
      });
      if (response.status == 200) {
        location.reload();
      }
    }
  });
});
