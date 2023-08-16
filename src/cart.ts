// --count total quantity and price--
const priceElements = document.querySelectorAll('.cart-item-price');
const quantityElements = document.querySelectorAll('.cart-item-quantity');
const totalPriceElement = document.querySelector('#cart-total-price');
const totalQuantityElement = document.querySelector('#cart-total-quantity');
const tableCartItems = document.querySelectorAll('.table-cart-item');

let totalPrice = 0;
let totalQuantity = 0;

tableCartItems.forEach(item => {
  const priceElement = item.querySelector('.cart-item-price');
  const quantityElement: HTMLInputElement = item.querySelector(
    '.cart-item-quantity',
  );
  const availableProductQuantity = quantityElement.getAttribute(
    'data-target-available-quantity',
  );

  const price = parseFloat(priceElement.textContent);
  const quantity = parseInt(quantityElement.value);
  const totalPriceOneElement = price * quantity;
  totalPrice += totalPriceOneElement;
  totalQuantity += quantity;
  quantityElement.max = availableProductQuantity;
});

totalPriceElement.textContent = `${totalPrice.toFixed(2)}$`;
totalQuantityElement.textContent = totalQuantity.toString();

// --add delivery form when create ship request--
const deliverToStoreBtn = document.querySelector('#cart-deliver-to-store-btn');
const createStoreRequestContainer = document.querySelector(
  '#cart-create-store-request-container',
) as HTMLDivElement;

deliverToStoreBtn.addEventListener('click', () => {
  createStoreRequestContainer.style.display = 'block';
});

// --delete cart item--
const deleteButtons = document.querySelectorAll('.delete-cart-item-btn');

deleteButtons.forEach(e => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-cart-item-id');
      const response = await fetch(`/cart/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.status == 200) {
        location.reload();
      }
    }
  });
});

// --show/hide favorite store in dropdown--
const favoriteCheckbox: HTMLInputElement = document.querySelector(
  '#cart-favorite-store-checkbox',
);
const selectStore = document.querySelector('#cart-store-select');
const optionsStore = document.querySelectorAll('.cart-store-option');
favoriteCheckbox.addEventListener('change', () => {
  const showFavoriteStore = favoriteCheckbox.checked;

  for (let i = 0; i < optionsStore.length; i++) {
    const isFavorite = optionsStore[i].getAttribute('data-target-favorite');

    if (showFavoriteStore && isFavorite !== 'True') {
      (optionsStore[i] as HTMLOptionElement).style.display = 'none';
    } else {
      (optionsStore[i] as HTMLOptionElement).style.display = 'block';
    }
  }
});

const storeCategorySelect: HTMLSelectElement = document.querySelector(
  '#cart-store-request-category',
);
const options = storeCategorySelect.querySelectorAll('option');
console.log('options', options);

storeCategorySelect.addEventListener('change', () => {
  console.log(
    'click',
    storeCategorySelect.options[storeCategorySelect.selectedIndex].text,
  );

  options.forEach(e => {
    if (
      e.textContent ===
      storeCategorySelect.options[storeCategorySelect.selectedIndex].text
    ) {
      const storeSelect = document.querySelector('#cart-store-select');
      const optionCategory = JSON.parse(
        e.getAttribute('data-target-store-category-store'),
      );
      console.log('before', document.getElementById('cart-store-select'));

      document.getElementById('cart-store-select').innerHTML = '';
      console.log('after', document.getElementById('cart-store-select'));

      console.log('optionCategory', optionCategory);
      if (optionCategory) {
        optionCategory.store_category_store.forEach(
          (e: {store_id: number; store_name: string}) => {
            const storeSelectOption = document.createElement('option');
            console.log('e.id', e.store_id);
            console.log('storeSelect', storeSelect);

            storeSelectOption.setAttribute('value', e.store_id.toString());
            storeSelectOption.textContent = e.store_name;
            storeSelect.appendChild(storeSelectOption);
          },
        );
      }
    }
  });
});
