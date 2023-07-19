const priceElements = document.querySelectorAll('.cart-item-retail-price');
const quantityElements = document.querySelectorAll('.cart-item-quantity');
let totalPrice = 0;
let totalQuantity = 0;

priceElements.forEach((priceElement) => {
  const price = parseFloat(priceElement.textContent);
  totalPrice += price;
});

quantityElements.forEach((quantityElement) => {
  console.log(quantity);
  const quantity = parseInt(quantityElement.textContent);
  totalQuantity += quantity;
});

const totalPriceElement = document.querySelector('#cart-total-price');
const totalQuantityElement = document.querySelector('#cart-total-quantity');

totalPriceElement.textContent = `${totalPrice.toFixed(2)}$`;
totalQuantityElement.textContent = totalQuantity.toString();

const deliverToStoreBtn = document.querySelector('#cart-deliver-to-store-btn');
const createStoreRequestContainer = document.querySelector(
  '#cart-create-store-request-container',
);

deliverToStoreBtn.addEventListener('click', () => {
  // createStoreRequestContainer.classList.remove('dropdown-close');
  // createStoreRequestContainer.classList.add('dropdown-open');
  createStoreRequestContainer.style.display = 'block';
  console.log('clicked');
});
