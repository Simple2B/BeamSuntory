import { addSearchEvent } from './utils';

// search flow
const searchInput: HTMLInputElement = document.querySelector('#table-search-incoming-stocks');
const searchInputButton = document.querySelector('#table-search-incoming-stock-button');
addSearchEvent(searchInput, searchInputButton);

const cancelOrderButtons = document.querySelectorAll('.cancel-incoming-stock-btn');

cancelOrderButtons.forEach((e) => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-cancel-incoming-stock-id');
      const response = await fetch(`/incoming_stock/cancel/${id}`, {
        method: 'GET',
      });
      if (response.status == 200 || response.status == 404) {
        location.reload();
      }
    }
  });
});

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
