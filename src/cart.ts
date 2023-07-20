const priceElements = document.querySelectorAll('.cart-item-retail-price');
const quantityElements = document.querySelectorAll('.cart-item-quantity');
const totalPriceElement = document.querySelector('#cart-total-price');
const totalQuantityElement = document.querySelector('#cart-total-quantity');
const tableCartItems = document.querySelectorAll('.table-cart-item');

tableCartItems.forEach((item) => {
  console.log('item', item);
});


countTotalsPriceQuantity();

// priceElements.forEach((priceElement) => {
//   const price = parseFloat(priceElement.textContent);
//   totalPrice += price;
// });

quantityElements.forEach((quantityElement: HTMLInputElement) => {
  quantityElement.addEventListener('change', (e) => {
    console.log(e.target);
    console.log('changed');
    countTotalsPriceQuantity();
  });
});

function countTotalsPriceQuantity() {
  let totalPrice = 0;
  let totalQuantity = 0;
  
  quantityElements.forEach((quantityElement: HTMLInputElement) => {
    console.log('value quantity', quantityElement.value);
    const quantity = parseInt(quantityElement.value);
    totalQuantity += quantity;
  });
  
  priceElements.forEach((priceElement) => {
    const price = parseFloat(priceElement.textContent);
    totalPrice += price;
  });

  totalPriceElement.textContent = `${totalPrice.toFixed(2)}$`;
  totalQuantityElement.textContent = totalQuantity.toString();
}





const deliverToStoreBtn = document.querySelector('#cart-deliver-to-store-btn');
const createStoreRequestContainer = document.querySelector(
  '#cart-create-store-request-container',
) as HTMLDivElement;

deliverToStoreBtn.addEventListener('click', () => {
  // createStoreRequestContainer.classList.remove('dropdown-close');
  // createStoreRequestContainer.classList.add('dropdown-open');
  createStoreRequestContainer.style.display = 'block';
});

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
