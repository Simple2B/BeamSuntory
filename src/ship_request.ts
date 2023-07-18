import {Modal} from 'flowbite';
import type {ModalOptions, ModalInterface} from 'flowbite';

interface IShipRequest {
  id: number;
  order_numb: string;
  status: string;
  order_type: string;
  supplier_id: number;
  created_at: string;
  quantity: number;
}

const modalOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses:
    'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {
    console.log('modal is hidden');
  },
  onShow: () => {
    console.log('user id: ');
  },
  onToggle: () => {
    console.log('modal has been toggled');
  },
};

// search flow
const searchInput: HTMLInputElement = document.querySelector(
  '#table-search-ship-request',
);
const searchInputButton = document.querySelector(
  '#table-search-ship-request-button',
);
if (searchInputButton && searchInput) {
  searchInputButton.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.set('q', searchInput.value);
    window.location.href = `${url.href}`;
  });
}

const deleteButtons = document.querySelectorAll('.delete-ship-request-btn');

deleteButtons.forEach(e => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-ship-request-id');
      const response = await fetch(`/ship_request/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.status == 200) {
        location.reload();
      }
    }
  });
});

const viewShipRequestButtonElements = document.querySelectorAll(
  '.ship-request-view-button',
);
viewShipRequestButtonElements.forEach(e =>
  e.addEventListener('click', () => {
    const shipRequest: IShipRequest = JSON.parse(e.getAttribute('data-target'));

    let div: HTMLDivElement = document.querySelector(
      '#ship-request-view-order-number',
    );
    div.innerHTML = shipRequest.order_numb;
    div = document.querySelector('#ship-request-view-status');
    div.innerHTML = shipRequest.status;
    div = document.querySelector('#ship-request-view-created-date');
    div.innerHTML = shipRequest.created_at.slice(0, 10);
    div = document.querySelector('#ship-request-view-quantity');
    div.innerHTML = shipRequest.quantity.toString();
  }),
);

