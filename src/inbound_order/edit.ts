import { ModalOptions, Modal } from "flowbite";
import { IInboundOrderOut, IProductGroupCreate } from "./types";
import { getDatepickerDateFormat } from "./utils";



const setNewQuantityView = (quantityGroupContainer: HTMLDivElement) => {
  const quantitiesPerGroup = quantityGroupContainer.querySelectorAll('.inbound-order-edit-add-quantity') as NodeListOf<HTMLInputElement>;
  const quantityView = quantityGroupContainer.querySelector('.inbound-order-edit-check-quantity') as HTMLDivElement;
  let quantityAvailable = parseInt(quantityView.getAttribute('data-quantity'));


  let quantityTotal = 0;

  quantitiesPerGroup.forEach(quantityPerGroup => {
    if (quantityPerGroup.value){
      quantityTotal += parseInt(quantityPerGroup.value);
    }
  });

  quantityView.innerHTML = (quantityAvailable - quantityTotal).toString();
}

const createProductGroup = (allocatedProductContainer: HTMLDivElement) => {
    const groupItemTemplate = document.querySelector('.group-quantity-item') as HTMLDivElement;
    const groupQuantityItemNew = groupItemTemplate.cloneNode(true) as HTMLDivElement;
    groupQuantityItemNew.classList.remove('invisible');

    const buttonDeleteQuantityGroup = groupQuantityItemNew.querySelector('.quantity-group-delete-button') as HTMLButtonElement;

    buttonDeleteQuantityGroup.addEventListener('click', (e) => {
      groupQuantityItemNew.remove();
      setNewQuantityView(allocatedProductContainer);
    })

    const quantityInput = groupQuantityItemNew.querySelector('.inbound-order-edit-add-quantity') as HTMLInputElement;
    const quantityView = allocatedProductContainer.querySelector('.inbound-order-edit-check-quantity');
    const quantitiesGroupInputs = allocatedProductContainer.querySelectorAll('.inbound-order-edit-add-quantity') as NodeListOf<HTMLInputElement>;

    let quantityLeft = parseInt(quantityView.getAttribute('data-quantity'))
    quantitiesGroupInputs.forEach(quantityGroupInput => {
      if(quantityGroupInput.value) {
        quantityLeft -= parseInt(quantityGroupInput.value);
      }
    })
    quantityInput.value = quantityLeft.toString();
    (allocatedProductContainer.querySelector('.inbound-order-add-product-group-btn') as HTMLButtonElement).before(groupQuantityItemNew);

    quantityInput.addEventListener('input', (e) => {
      setNewQuantityView(allocatedProductContainer);
    })
    setNewQuantityView(allocatedProductContainer);
    return groupQuantityItemNew;
}


export const initEditOrderModal = () => {
    // Nodes
    const orderEditProductsAllocatedContainer = document.querySelector('#inbound-order-edit-check-container') as HTMLElement;
    const orderEditModalHTML = document.querySelector('#edit-inbound-order-modal') as HTMLDivElement;
    const orderEditButtons = document.querySelectorAll('.inbound-order-edit-button') as NodeListOf<HTMLButtonElement>;
    const orderUuidInput = document.querySelector('#inbound-order-uuid') as HTMLInputElement;
    const orderStatusSelect = document.querySelector('#inbound-order-edit-status') as HTMLSelectElement;
    const orderTitleInput = document.querySelector('#inbound-order-edit-order-title') as HTMLInputElement;
    const orderActiveDateInput = document.querySelector('#inbound-order-edit-active-date') as HTMLInputElement;
    const orderActiveTimeInput = document.querySelector('#inbound-order-edit-active-time') as HTMLInputElement;
    const orderDeliveryDateInput = document.querySelector('#inbound-order-edit-delivery-date') as HTMLInputElement;
    const orderSupplierIdSelect = document.querySelector('#inbound-order-edit-supplier-id') as HTMLSelectElement;
    const orderWarehouseIdSelect = document.querySelector('#inbound-order-edit-warehouse-id') as HTMLSelectElement;
    const orderEditAddGroupButtonTemplate = document.querySelector('.inbound-order-add-product-group-btn');

    const modalEditOptions: ModalOptions = {
        placement: 'bottom-right',
        backdrop: 'dynamic',
        backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
        closable: true,
        onHide: () => {
          console.log(orderEditProductsAllocatedContainer);
          while (orderEditProductsAllocatedContainer.children.length > 1) {
            orderEditProductsAllocatedContainer.removeChild(orderEditProductsAllocatedContainer.lastElementChild);
          }

          const groupsQuantity = orderEditProductsAllocatedContainer.querySelectorAll('.group-quantity-item') as NodeListOf<HTMLDivElement>;
          groupsQuantity.forEach(group => group.remove());

          const buttonsAddGroupQuantity = orderEditProductsAllocatedContainer.querySelectorAll('.inbound-order-add-product-group-btn') as NodeListOf<HTMLButtonElement>;
          buttonsAddGroupQuantity.forEach(button => button.remove());
        },
    }
    const orderEditModal = new Modal(orderEditModalHTML, modalEditOptions);

    const editModalCloseButton = document.querySelector('#edit-modal-btn-hide') as HTMLButtonElement;
    editModalCloseButton.addEventListener('click', () => {
      orderEditModal.hide();
    })

    orderEditButtons.forEach(orderEditButton => {
      const inboundOrderData = JSON.parse(orderEditButton.getAttribute('data-target')) as IInboundOrderOut;
      orderEditButton.addEventListener('click', () => {
        // Set order edit modal values
        orderUuidInput.value = inboundOrderData.uuid;
        orderStatusSelect.value = inboundOrderData.status;
        orderTitleInput.value = inboundOrderData.title;
        orderActiveDateInput.value = getDatepickerDateFormat(inboundOrderData.activeDate);
        orderActiveTimeInput.value = inboundOrderData.activeTime;
        orderDeliveryDateInput.value = getDatepickerDateFormat(inboundOrderData.deliveryDate);
        orderSupplierIdSelect.value = inboundOrderData.supplier.id.toString();
        orderWarehouseIdSelect.value = inboundOrderData.warehouse.id.toString();

        for (let i = 0; i < inboundOrderData.productsAllocated.length - 1; i++){
          const productAllocatedEditView = orderEditProductsAllocatedContainer.children[0].cloneNode(true);
          orderEditProductsAllocatedContainer.appendChild(productAllocatedEditView);
        }

        inboundOrderData.productsAllocated.forEach((productAllocated, i) => {
          const currentProductAllocatedContainer = orderEditProductsAllocatedContainer.children[i];
          const productAllocatedIdInput = currentProductAllocatedContainer.querySelector('.product-allocated-id') as HTMLInputElement;
          const productAllocatedNameDiv = currentProductAllocatedContainer.querySelector('.inbound-order-edit-check-product') as HTMLDivElement;
          const productAllocatedQuantityDiv = currentProductAllocatedContainer.querySelector('.inbound-order-edit-check-quantity') as HTMLDivElement;
          const productAllocatedShelfLifeFromDiv = currentProductAllocatedContainer.querySelector('.inbound-order-edit-shelf-life-from') as HTMLDivElement;
          const productAllocatedShelfLifeToDiv = currentProductAllocatedContainer.querySelector('.inbound-order-edit-shelf-life-to') as HTMLDivElement;
          const productAllocatedTotalQuantityDiv = currentProductAllocatedContainer.querySelector('.inbound-order-edit-total-quantity') as HTMLDivElement;

          productAllocatedIdInput.value = productAllocated.id.toString();

          productAllocatedNameDiv.innerHTML = productAllocated.product.name;
          productAllocatedQuantityDiv.innerHTML = productAllocated.quantity.toString();
          productAllocatedQuantityDiv.setAttribute('data-quantity', productAllocated.quantity.toString());
          productAllocatedTotalQuantityDiv.innerHTML = productAllocated.quantity.toString();
          productAllocatedShelfLifeFromDiv.innerHTML = getDatepickerDateFormat(productAllocated.shelfLifeStart);
          productAllocatedShelfLifeToDiv.innerHTML = getDatepickerDateFormat(productAllocated.shelfLifeEnd);

          const buttonAddNewGroup = orderEditAddGroupButtonTemplate.cloneNode(true) as HTMLButtonElement;
          // current point
          buttonAddNewGroup.addEventListener('click', () => createProductGroup(currentProductAllocatedContainer as HTMLDivElement));

          (productAllocatedShelfLifeToDiv.parentNode.parentNode as HTMLDivElement).after(buttonAddNewGroup);
          buttonAddNewGroup.classList.remove('invisible');

          productAllocated.productQuantityGroups.forEach(quantityGroup => {
            const quantityGroupContainer = createProductGroup(currentProductAllocatedContainer as HTMLDivElement);
            const groupSelect = quantityGroupContainer.querySelector('.inbound-order-edit-add-group') as HTMLSelectElement;
            const groupQuantityInput = quantityGroupContainer.querySelector('.inbound-order-edit-add-quantity') as HTMLInputElement;

            groupSelect.value = quantityGroup.group.id.toString();
            groupQuantityInput.value = quantityGroup.quantity.toString();
          });
          setNewQuantityView(currentProductAllocatedContainer as HTMLDivElement);
        });

        orderEditModal.show();
      });
    });

    // submit update order
    const buttonSave = document.querySelector('#inbound-order-save-products-btn') as HTMLButtonElement;
    buttonSave.addEventListener('click', () => {
      const orderStatusSelect = document.querySelector('#inbound-order-edit-status') as HTMLSelectElement;

      if (orderStatusSelect.value === 'Assigned to pickup') {
        const isValid = validateAssignedToPickUpForm();
        if (!isValid) {
          alert('Available Quantity is not valid');
          return; 
        }                
      }     

      const productAllocatedGroupsContainers = document.querySelectorAll('.product-allocated-groups-container') as NodeListOf<HTMLDivElement>;
      const productGroups: IProductGroupCreate[] = [];

      productAllocatedGroupsContainers.forEach(productGroupContainer => {
        const productAllocatedIdInput = productGroupContainer.querySelector('.product-allocated-id') as HTMLInputElement;
  
        const productGroupCreate: IProductGroupCreate = {
          productAllocatedId: parseInt(productAllocatedIdInput.value),
          productAllocatedGroups: [],
        }
        
        const groupQuantityItems = productGroupContainer.querySelectorAll('.group-quantity-item') as NodeListOf<HTMLDivElement>;
        groupQuantityItems.forEach(quantityItem => {
          const groupIdSelect = quantityItem.querySelector('.inbound-order-edit-add-group') as HTMLSelectElement;
          const groupQuantityInput = quantityItem.querySelector('.inbound-order-edit-add-quantity') as HTMLInputElement;

          if (groupIdSelect.value && groupQuantityInput.value) {
            const groupId = parseInt(groupIdSelect.value);
            const groupQuantity = parseInt(groupQuantityInput.value)

            productGroupCreate.productAllocatedGroups.push({
              groupId: groupId,
              quantity: groupQuantity,
            })

          }

        });
        productGroups.push(productGroupCreate);
      })

      const productGroupsQuantitiesInput = document.querySelector('#inbound-order-edit-product-quantities') as HTMLInputElement;
      productGroupsQuantitiesInput.value = JSON.stringify(productGroups);

      const buttonSubmit = document.querySelector('#inbound-order-submit-btn') as HTMLButtonElement;
      buttonSubmit.click();
    });
}

const validateAssignedToPickUpForm = () => {  
  const productAllocatedQuantity = document.querySelectorAll('.inbound-order-edit-check-quantity')

  const isUsedAllProducts = Array.from(productAllocatedQuantity).every(quantityNode => {
    const quantity = parseInt(quantityNode.innerHTML);
    return quantity === 0;
  });
  return isUsedAllProducts;
}