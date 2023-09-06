import {Modal, ModalInterface, ModalOptions } from "flowbite";
import { IProductAllocatedBase } from "./types";

const createInboundOrderHandler = () => {
  const createInboundOrderBtn = document.getElementById('inbound-order-create-btn') as HTMLButtonElement;
  const createInboundOrderBtnSubmit = document.getElementById('inbound-order-add-submit-btn') as HTMLButtonElement;
  if(!createInboundOrderBtn) {
    console.log("Error: no create inbound order button");
    return;
  }

  createInboundOrderBtn.addEventListener('click', () => {
    const allocatedProductsData: IProductAllocatedBase[] = []
    // Set products as JSON to field
    const productsAllocatedContainers = document.querySelectorAll('.product-allocated');

    productsAllocatedContainers.forEach((productContainer) => {
      // Get HTML nodes with product values
      const productAllocatedSelectHTML = productContainer.querySelector('.product-allocated-add') as HTMLSelectElement;
      const productAllocatedQuantityInput = productContainer.querySelector('.product-allocated-quantity') as HTMLInputElement;
      const productAllocatedShelfLifeStartInput = productContainer.querySelector('.product-allocated-shelf-life-start') as HTMLInputElement;
      const productAllocatedShelfLifeEndInput = productContainer.querySelector('.product-allocated-shelf-life-end') as HTMLInputElement;

      // Retrieve values from Nodes
      const productAllocatedId = parseInt(productAllocatedSelectHTML.value);
      const productAllocatedQuantity = parseInt(productAllocatedQuantityInput.value);
      const productAllocatedShelfLifeStart = productAllocatedShelfLifeStartInput.value;
      const productAllocatedShelfLifeEnd = productAllocatedShelfLifeEndInput.value;

      allocatedProductsData.push({
        id: productAllocatedId,
        quantity: productAllocatedQuantity,
        shelfLifeStart: productAllocatedShelfLifeStart,
        shelfLifeEnd: productAllocatedShelfLifeEnd,
      })
    });

    const inputProducts: HTMLInputElement = document.querySelector(`#inbound-order-add-products`)
    inputProducts.value = JSON.stringify(allocatedProductsData)
    createInboundOrderBtnSubmit.click()
  });
}

export const initAddInboundOrderModal = () => {
  const addModalButton = document.querySelector('#inbound-order-add-modal-button');
  const addInboundOrderModalElement: HTMLElement = document.querySelector('#add-inbound-order-modal')
  const addModalOptions: ModalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
      console.log('inbound-order id: ')
    },
    onShow: () => {
      console.log('inbound-order id: ')
    },
    onToggle: () => {
      console.log('modal has been toggled')
    },
  }

  const addModal: ModalInterface = new Modal(addInboundOrderModalElement, addModalOptions);
  addModalButton.addEventListener('click', () => {    
    addModal.show();
  });

  createInboundOrderHandler();
}