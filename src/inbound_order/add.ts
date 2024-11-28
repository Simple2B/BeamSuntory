import { IProductAllocatedBase } from './types';
import { initModal } from '../utils';

const createInboundOrderHandler = () => {
  const createInboundOrderBtn = document.getElementById('inbound-order-create-btn') as HTMLButtonElement;
  const createInboundOrderBtnSubmit = document.getElementById('inbound-order-add-submit-btn') as HTMLButtonElement;
  if (!createInboundOrderBtn) {
    console.log('Error: no create inbound order button');
    return;
  }
  createInboundOrderBtn.addEventListener('click', () => {
    const allocatedProductsData: IProductAllocatedBase[] = [];
    // Set products as JSON to field
    const productsAllocatedContainers = document.querySelectorAll('.product-allocated');

    productsAllocatedContainers.forEach((productContainer) => {
      // Get HTML nodes with product values
      const productAllocatedQuantityInput = productContainer.querySelector(
        '.product-allocated-quantity'
      ) as HTMLInputElement;
      const productAllocatedShelfLifeStartInput = productContainer.querySelector(
        '.product-allocated-shelf-life-start'
      ) as HTMLInputElement;
      const productAllocatedShelfLifeEndInput = productContainer.querySelector(
        '.product-allocated-shelf-life-end'
      ) as HTMLInputElement;

      let productId;
      const inputField = productContainer.querySelector('#inbound-order-add-add-product-select') as HTMLInputElement;
      const selectedOption = productContainer.querySelector(`#product-list option[value="${inputField.value}"]`);

      if (!selectedOption) {
        event.preventDefault();
        alert('Please select a valid product from the list');
      }
      productId = parseInt(selectedOption.getAttribute('data-product-id')) ?? 0;
      // Retrieve values from Nodes
      const productAllocatedQuantity = parseInt(productAllocatedQuantityInput.value);
      const productAllocatedShelfLifeStart = productAllocatedShelfLifeStartInput.value;
      const productAllocatedShelfLifeEnd = productAllocatedShelfLifeEndInput.value;

      allocatedProductsData.push({
        id: productId,
        quantity: productAllocatedQuantity,
        shelfLifeStart: productAllocatedShelfLifeStart,
        shelfLifeEnd: productAllocatedShelfLifeEnd,
      });
    });

    const inputProducts: HTMLInputElement = document.querySelector(`#inbound-order-add-products`);
    inputProducts.value = JSON.stringify(allocatedProductsData);
    createInboundOrderBtnSubmit.click();
  });
};

export const initAddInboundOrderModal = () => {
  const addModalButton = document.querySelector('#inbound-order-add-modal-button');
  const addInboundOrderModalElement: HTMLElement = document.querySelector('#add-inbound-order-modal');

  const addModal = initModal(addInboundOrderModalElement);
  addModalButton.addEventListener('click', () => {
    addModal.show();
  });

  const addModalCloseButton = document.querySelector('#add-modal-btn-hide') as HTMLButtonElement;
  addModalCloseButton.addEventListener('click', () => {
    addModal.hide();
  });

  createInboundOrderHandler();
};
