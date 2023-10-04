import { easepick } from '@easepick/bundle';

interface ICart {
  id: number;
  product: IProduct;
  quantity: number;
}

interface IProduct {
  id: number;
  SKU: string;
  name: string;
  retail_price: number;
  image: string;
}

interface ICartItem {
  id: number;
  product_id: number;
  quantity: number;
  group: string;
}

interface IEventCart {
  cartId: number;
  error?: string;
  status: boolean;
}

//global variables for datepicker
const currentDate = new Date();
const fiveDays = 5 * 24 * 60 * 60 * 1000;

// --get cart items from hidden input for datepicker--
const cartEventsHiddenInput = document.querySelector('#carts-events-hidden-input') as HTMLInputElement;
const carts = JSON.parse(cartEventsHiddenInput.value) as ICartItem[];

// variable to set default image to brand dynamically in modal window. Can we get link from the internet?
const defaultImage =
  'https://funko.com/on/demandware.static/-/Sites-funko-master-catalog/default/dwbb38a111/images/funko/upload/55998_CocaCola_S2_SpriteBottleCap_POP_GLAM-WEB.png';

// --count total quantity and price--
const totalPriceElement = document.querySelector('#cart-total-price');
const totalQuantityElement = document.querySelector('#cart-total-quantity');
const tableCartItems = document.querySelectorAll('.table-cart-item');
const submitBtn = document.querySelector('#cart-ship-request-submit-btn') as HTMLButtonElement;

let totalPrice = 0;
let totalQuantity = 0;
let hasEventGroup = false;

// check if cart has event group
tableCartItems.forEach((item) => {
  console.log('item', item);
  const group = item.getAttribute('data-target-group');
  if (group === 'Events') {
    hasEventGroup = true;
  }

  const priceElement = item.querySelector('.cart-item-retail_price');
  const quantityElement: HTMLInputElement = item.querySelector('.cart-item-quantity');
  const availableProductQuantity = quantityElement.getAttribute('data-target-available-quantity');

  const price = parseFloat(priceElement.textContent);
  const quantity = parseInt(quantityElement.value);

  const totalPriceOneElement = price * quantity;
  totalPrice += totalPriceOneElement;
  totalQuantity += quantity;
  quantityElement.max = availableProductQuantity;
});

totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
totalQuantityElement.textContent = totalQuantity.toString();

// add event date range, disable submit button if cart has event group
if (hasEventGroup) {
  const eventContainer = document.querySelector('#cart-event-container') as HTMLDivElement;
  eventContainer.classList.remove('hidden');
  eventContainer.classList.add('flex');
} else {
  submitBtn.removeAttribute('disabled');
}

// --add delivery form when create ship request--
const deliverToStoreBtn = document.querySelector('#cart-deliver-to-store-btn') as HTMLButtonElement;
const createStoreRequestContainer = document.querySelector('#cart-create-store-request-container') as HTMLDivElement;

deliverToStoreBtn.addEventListener('click', () => {
  createStoreRequestContainer.style.display = 'block';
});

// --delete cart item--
const deleteButtons = document.querySelectorAll('.delete-cart-item-btn');

deleteButtons.forEach((e) => {
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
const favoriteCheckbox: HTMLInputElement = document.querySelector('#cart-favorite-store-checkbox');
const storeSelect: HTMLSelectElement = document.querySelector('#cart-store-select');
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

const storeCategorySelect: HTMLSelectElement = document.querySelector('#cart-store-request-category-select');
const options = storeCategorySelect.querySelectorAll('option');

storeCategorySelect.addEventListener('change', () => {
  options.forEach((e) => {
    if (e.textContent === storeCategorySelect.options[storeCategorySelect.selectedIndex].text) {
      const storeSelect = document.querySelector('#cart-store-select');
      const optionCategory = JSON.parse(e.getAttribute('data-target-store-category-store'));

      document.getElementById('cart-store-select').innerHTML = '';
      if (optionCategory) {
        optionCategory.store_category_store.forEach((e: { store_id: number; store_name: string }) => {
          const storeSelectOption = document.createElement('option');
          console.log('e.id', e.store_id);
          console.log('storeSelect', storeSelect);

          storeSelectOption.setAttribute('value', e.store_id.toString());
          storeSelectOption.textContent = e.store_name;
          storeSelect.appendChild(storeSelectOption);
        });
      }
    }
  });
});

// --display only sales rep locker--
const salesRepLockerCheckbox: HTMLInputElement = document.querySelector('#cart-sales-rep-locker-checkbox');
if (salesRepLockerCheckbox) {
  salesRepLockerCheckbox.addEventListener('change', () => {
    const favoriteStoreContainer = document.querySelector('#cart-store-container');
    const lockerStoreCategoryIds = JSON.parse(
      salesRepLockerCheckbox.getAttribute('data-target-locker-store-category-ids')
    );

    const oldStoreCategoryOptions = storeCategorySelect.querySelectorAll('option');
    const oldStoreOptions = storeSelect.querySelectorAll('option');

    if (salesRepLockerCheckbox.checked) {
      const newStoreCategoryOption = new Option('Locker', lockerStoreCategoryIds[1], true, true);
      const newStoreOption = new Option(' Locker Store', lockerStoreCategoryIds[0], true, true);
      favoriteStoreContainer.classList.add('invisible');
      oldStoreCategoryOptions.forEach((e) => {
        e.disabled = true;
      });
      storeSelect.appendChild(newStoreOption);
      storeSelect.value = lockerStoreCategoryIds[0].toString();
      storeCategorySelect.appendChild(newStoreCategoryOption);
    } else {
      favoriteStoreContainer.classList.remove('invisible');
      storeSelect.removeChild(oldStoreOptions[oldStoreOptions.length - 1]);
      storeCategorySelect.removeChild(oldStoreCategoryOptions[oldStoreCategoryOptions.length - 1]);
      oldStoreCategoryOptions.forEach((e, i) => {
        if (i !== 0) {
          e.disabled = false;
        }
      });
      storeSelect.selectedIndex = 0;
      storeCategorySelect.selectedIndex = 0;
    }
  });
}

const eventButtons = document.querySelectorAll('.cart-item-event-button');
eventButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const cart = JSON.parse(btn.getAttribute('data-target-cart')) as ICart;
    console.log('cart', cart);

    let div: HTMLDivElement = document.querySelector('#product-event-name');
    div.innerHTML = cart.product.name;
    div = document.querySelector('#product-event-SKU');
    div.innerHTML = cart.product.SKU;
    const img: HTMLImageElement = document.querySelector('#product-event-image');
    cart.product.image.length > 100
      ? (img.src = `data:image/png;base64, ${cart.product.image}`)
      : (img.src = defaultImage);
    let input: HTMLInputElement = document.querySelector('#product-event-quantity');
    input.value = cart.quantity.toString();
    input.min = '1';
    input = document.querySelector('#product-event-cart-id-hidden');
    input.value = cart.id.toString();
    input = document.querySelector('#product-event-product-id');
    input.value = cart.product.id.toString();
  });
});

const { DateTime } = easepick;
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();
  return `${year}-${month}-${day}`;
}

function getFirstAndLastDate() {
  const today = new Date();
  const fifthDayBefore = new Date(today);
  fifthDayBefore.setDate(today.getDate() - 5);
  const fifthDayAfter = new Date(today);
  fifthDayAfter.setDate(today.getDate() + 6);
  return [formatDate(fifthDayBefore), formatDate(fifthDayAfter)];
}

const bookedDates = [getFirstAndLastDate()].map((d) => {
  if (d instanceof Array) {
    const start = new Date(d[0]);
    const end = new Date(d[1]);
    return [start, end];
  }
  return new DateTime(d, 'YYYY-MM-DD');
});

const picker = new easepick.create({
  element: document.getElementById('datepicker'),
  css: [
    'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
    'https://easepick.com/css/demo_hotelcal.css',
  ],
  plugins: ['RangePlugin', 'LockPlugin'],
  RangePlugin: {
    tooltipNumber(num: any) {
      return num - 1;
    },
  },
  LockPlugin: {
    minDate: new Date(),
    minDays: 1,
    inseparable: true,
    filter(date: any) {
      if (date - +currentDate > fiveDays) {
        return false;
      } else {
        return true;
      }
    },
  },
  zIndex: 4,
  setup(picker: any) {
    picker.on('select', async (evt: any) => {
      const { view, date, target } = evt.detail;
      const startDate =
        evt.detail.start.getFullYear() + '_' + (evt.detail.start.getMonth() + 1) + '_' + evt.detail.start.getDate();
      const endDate =
        evt.detail.end.getFullYear() + '_' + (evt.detail.end.getMonth() + 1) + '_' + evt.detail.end.getDate();

      const availableEventQuantity = await getEventAvailableQuantityByDate(carts, startDate, endDate);

      if (availableEventQuantity.length !== 0) {
        const errorMessages = availableEventQuantity.map((e) => e.error);
        alert('Maximum quantity exceeded!' + '\n' + errorMessages.join('\n'));
        return;
      } else {
        submitBtn.removeAttribute('disabled');
      }
    });
  },
});

async function getEventAvailableQuantityByDate(carts: ICartItem[], dateFrom: string, dateTo: string) {
  const uniqCarts = carts.reduce((accCartItem, cart) => {
    const foundedCart = accCartItem.find(
      (cartItem) => cartItem.product_id === cart.product_id && cartItem.group === cart.group
    );
    if (foundedCart) {
      foundedCart.quantity += cart.quantity;
    } else {
      accCartItem.push(cart);
    }
    return accCartItem;
  }, [] as ICartItem[]);

  const fetchPromises = uniqCarts.map(async (cart) => {
    const response = await fetch(
      `/event/get_available_quantity_by_date?date_from=${dateFrom}&date_to=${dateTo}&group_name=${cart.group}&product_id=${cart.product_id}&quantity=${cart.quantity}`
    );

    if (response.status !== 200) {
      const message = await response.json();

      const data = {
        cartId: cart.id,
        error: message,
        status: false,
      };
      return data;
    }
    const data = {
      cartId: cart.id,
      status: true,
    };

    return data;
  });
  const resultAllPromises: IEventCart[] = [];

  const results = await Promise.all(fetchPromises);
  results.forEach((result) => {
    if (result.status !== true) {
      return resultAllPromises.push(result);
    }
  });

  return resultAllPromises;
}
