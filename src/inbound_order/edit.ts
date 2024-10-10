import { ModalOptions, Modal } from 'flowbite';
import { IInboundOrderOut, IProductGroupCreate } from './types';
import { getDatepickerDateFormat } from './utils';
import { IGroup } from '../types';

const setNewQuantityView = (quantityGroupContainer: HTMLDivElement) => {
  const quantitiesPerGroup = quantityGroupContainer.querySelectorAll(
    '.inbound-order-edit-add-quantity'
  ) as NodeListOf<HTMLInputElement>;
  const quantityView = quantityGroupContainer.querySelector('.inbound-order-edit-check-quantity') as HTMLDivElement;
  let quantityAvailable = parseInt(quantityView.getAttribute('data-quantity'));

  let quantityTotal = 0;

  quantitiesPerGroup.forEach((quantityPerGroup) => {
    if (quantityPerGroup.value) {
      quantityTotal += parseInt(quantityPerGroup.value);
    }
  });

  quantityView.innerHTML = (quantityAvailable - quantityTotal).toString();
};

async function fetchSubGroups(selectElement: HTMLSelectElement, groupId: string) {
  const response = await fetch(`/sub_stock_target_group/get_sub_group?group_id=${groupId}&inbound_order=True`, {
    method: 'GET',
  });

  if (response.status == 200) {
    const groups = await response.json();
    selectElement.innerHTML = '';
    const option = document.createElement('option');
    option.value = '';
    option.innerHTML = 'Sub Group';
    selectElement.appendChild(option);
    groups.forEach((group: IGroup) => {
      const option = document.createElement('option');
      option.value = group.id.toString();
      option.innerHTML = group.name;

      selectElement.appendChild(option);
    });
  }
}

const createProductGroup = (allocatedProductContainer: HTMLDivElement) => {
  const groupItemTemplate = document.querySelector('.group-quantity-item') as HTMLDivElement;
  const groupQuantityItemNew = groupItemTemplate.cloneNode(true) as HTMLDivElement;
  groupQuantityItemNew.classList.remove('invisible');

  groupQuantityItemNew.querySelector('#inbound-order-edit-add-group').addEventListener('change', async (e) => {
    const uploadGroupIdInputHidden = document.querySelector('#inbound-order-edit-group-id-hidden') as HTMLInputElement;
    const subGroupInput = groupQuantityItemNew.querySelector(
      '#inbound-order-edit-add-sub-group-list'
    ) as HTMLInputElement;
    const subGroupList = groupQuantityItemNew.querySelector('#inbound-order-edit-add-sub-group-list');

    subGroupInput.value = '';
    const uploadGroupInput = e.target as HTMLInputElement;
    const option = uploadGroupInput.list.querySelector('option[value="' + uploadGroupInput.value + '"]') as HTMLElement;
    // NOTE Use large number if no group selected. Impossible to reach that number in prod.
    // Used to avoid wrong validation in backend wtform when pass 0 and get None

    uploadGroupIdInputHidden.value = option.getAttribute('inbound-order-edit-add-group-id');
    uploadGroupIdInputHidden.click();
    let groupId;
    if (uploadGroupInput.value) {
      groupId = option.getAttribute('inbound-order-edit-add-group-id');
      await fetchSubGroups(subGroupList as HTMLSelectElement, groupId);
    } else {
      groupId = '';
    }

    const hiddenInput = groupQuantityItemNew.querySelector('#inbound-order-edit-add-group-hidden') as HTMLInputElement;
    hiddenInput.value = groupId.toString();
  });

  const subGroupList = groupQuantityItemNew.querySelector(
    '#inbound-order-edit-add-sub-group-list'
  ) as HTMLSelectElement;

  subGroupList.addEventListener('change', () => {
    const hiddenInput = groupQuantityItemNew.querySelector('#inbound-order-edit-add-group-hidden') as HTMLInputElement;

    if (!subGroupList.value) {
      const groupInputList = groupQuantityItemNew.querySelector('#inbound-order-edit-add-group') as HTMLInputElement;
      const option = groupInputList.list.querySelector('option[value="' + groupInputList.value + '"]') as HTMLElement;
      hiddenInput.value = option.getAttribute('inbound-order-edit-add-group-id');
      return;
    }

    hiddenInput.value = subGroupList.value;
  });

  const buttonDeleteQuantityGroup = groupQuantityItemNew.querySelector(
    '.quantity-group-delete-button'
  ) as HTMLButtonElement;

  buttonDeleteQuantityGroup.addEventListener('click', (e) => {
    groupQuantityItemNew.remove();
    setNewQuantityView(allocatedProductContainer);
  });

  const quantityInput = groupQuantityItemNew.querySelector('.inbound-order-edit-add-quantity') as HTMLInputElement;
  const quantityView = allocatedProductContainer.querySelector('.inbound-order-edit-check-quantity');
  const quantitiesGroupInputs = allocatedProductContainer.querySelectorAll(
    '.inbound-order-edit-add-quantity'
  ) as NodeListOf<HTMLInputElement>;

  let quantityLeft = parseInt(quantityView.getAttribute('data-quantity'));
  quantitiesGroupInputs.forEach((quantityGroupInput) => {
    if (quantityGroupInput.value) {
      quantityLeft -= parseInt(quantityGroupInput.value);
    }
  });
  quantityInput.value = quantityLeft.toString();
  (allocatedProductContainer.querySelector('.inbound-order-add-product-group-btn') as HTMLButtonElement).before(
    groupQuantityItemNew
  );

  quantityInput.addEventListener('input', (e) => {
    setNewQuantityView(allocatedProductContainer);
  });
  setNewQuantityView(allocatedProductContainer);
  return groupQuantityItemNew;
};

export const initEditOrderModal = () => {
  // Nodes
  const orderEditProductsAllocatedContainer = document.querySelector(
    '#inbound-order-edit-check-container'
  ) as HTMLElement;
  const orderEditModalHTML = document.querySelector('#edit-inbound-order-modal') as HTMLDivElement;
  const orderEditButtons = document.querySelectorAll('.inbound-order-edit-button') as NodeListOf<HTMLButtonElement>;
  const orderUuidInput = document.querySelector('#inbound-order-uuid') as HTMLInputElement;
  const orderStatusSelect = document.querySelector('#inbound-order-edit-status') as HTMLSelectElement;
  const orderStatusDiv = document.querySelector('#inbound-order-edit-status-div') as HTMLDivElement;
  const orderTitleInput = document.querySelector('#inbound-order-edit-order-title') as HTMLInputElement;
  const orderActiveDateInput = document.querySelector('#inbound-order-edit-active-date') as HTMLInputElement;
  const orderActiveTimeInput = document.querySelector('#inbound-order-edit-active-time') as HTMLInputElement;
  const orderDeliveryDateInput = document.querySelector('#inbound-order-edit-delivery-date') as HTMLInputElement;
  const orderSupplierIdSelect = document.querySelector('#inbound-order-edit-supplier-id') as HTMLSelectElement;
  const orderWarehouseIdSelect = document.querySelector('#inbound-order-edit-warehouse-id') as HTMLSelectElement;
  const orderEditAddGroupButtonTemplate = document.querySelector('.inbound-order-add-product-group-btn');
  const saveButton = document.querySelector('#inbound-order-save-products-btn') as HTMLButtonElement;

  const modalEditOptions: ModalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
      while (orderEditProductsAllocatedContainer.children.length > 1) {
        orderEditProductsAllocatedContainer.removeChild(orderEditProductsAllocatedContainer.lastElementChild);
      }

      const groupsQuantity = orderEditProductsAllocatedContainer.querySelectorAll(
        '.group-quantity-item'
      ) as NodeListOf<HTMLDivElement>;
      groupsQuantity.forEach((group) => group.remove());

      const buttonsAddGroupQuantity = orderEditProductsAllocatedContainer.querySelectorAll(
        '.inbound-order-add-product-group-btn'
      ) as NodeListOf<HTMLButtonElement>;
      buttonsAddGroupQuantity.forEach((button) => button.remove());
    },
  };
  const orderEditModal = new Modal(orderEditModalHTML, modalEditOptions);

  const editModalCloseButton = document.querySelector('#edit-modal-btn-hide') as HTMLButtonElement;
  editModalCloseButton.addEventListener('click', () => {
    orderEditModal.hide();
  });

  orderEditButtons.forEach((orderEditButton) => {
    const inboundOrderData = JSON.parse(orderEditButton.getAttribute('data-target')) as IInboundOrderOut;
    orderEditButton.addEventListener('click', () => {
      // Set order edit modal values
      const currentDate = new Date();
      orderUuidInput.value = inboundOrderData.uuid;
      orderStatusSelect.value = inboundOrderData.status;
      orderTitleInput.value = inboundOrderData.title;
      orderActiveDateInput.value = getDatepickerDateFormat(inboundOrderData.activeDate, currentDate);
      orderActiveTimeInput.value = inboundOrderData.activeTime;
      orderDeliveryDateInput.value = getDatepickerDateFormat(inboundOrderData.deliveryDate, currentDate);
      orderSupplierIdSelect.value = inboundOrderData.supplier.id.toString();
      orderWarehouseIdSelect.value = inboundOrderData.warehouse.id.toString();

      for (let i = 0; i < inboundOrderData.productsAllocated.length - 1; i++) {
        const productAllocatedEditView = orderEditProductsAllocatedContainer.children[0].cloneNode(true);
        orderEditProductsAllocatedContainer.appendChild(productAllocatedEditView);
      }

      inboundOrderData.productsAllocated.forEach((productAllocated, i) => {
        const currentProductAllocatedContainer = orderEditProductsAllocatedContainer.children[i];
        const productAllocatedIdInput = currentProductAllocatedContainer.querySelector(
          '.product-allocated-id'
        ) as HTMLInputElement;
        const productAllocatedNameDiv = currentProductAllocatedContainer.querySelector(
          '.inbound-order-edit-check-product'
        ) as HTMLDivElement;
        const productAllocatedDescription= currentProductAllocatedContainer.querySelector(
          '.inbound-order-edit-product-description'
        ) as HTMLDivElement;
        const productAllocatedSKUDiv = currentProductAllocatedContainer.querySelector(
          '.inbound-order-edit-check-product-sku'
        ) as HTMLDivElement;
        const productAllocatedQuantityDiv = currentProductAllocatedContainer.querySelector(
          '.inbound-order-edit-check-quantity'
        ) as HTMLDivElement;
        const productAllocatedShelfLifeFromDiv = currentProductAllocatedContainer.querySelector(
          '.inbound-order-edit-shelf-life-from'
        ) as HTMLDivElement;
        const productAllocatedShelfLifeToDiv = currentProductAllocatedContainer.querySelector(
          '.inbound-order-edit-shelf-life-to'
        ) as HTMLDivElement;
        const productAllocatedTotalQuantityInput = currentProductAllocatedContainer.querySelector(
          '.inbound-order-edit-total-quantity'
        ) as HTMLInputElement;

        productAllocatedIdInput.value = productAllocated.id.toString();

        productAllocatedNameDiv.innerHTML = `<p title='${productAllocated.product.name}' class='cropped-text'>${productAllocated.product.name}</p>`;
        productAllocatedSKUDiv.innerHTML = `<p title='${productAllocated.product.SKU}'>${productAllocated.product.SKU}</p>`;
        productAllocatedDescription.innerHTML = `<p title='${productAllocated.product.description}' class='cropped-text'>${productAllocated.product.description}</p>`;
        productAllocatedQuantityDiv.innerHTML = productAllocated.quantity.toString();

        productAllocatedQuantityDiv.setAttribute('data-quantity', productAllocated.quantity.toString());
        productAllocatedTotalQuantityInput.value = productAllocated.quantity.toString();
        productAllocatedShelfLifeFromDiv.innerHTML = getDatepickerDateFormat(productAllocated.shelfLifeStart);
        productAllocatedShelfLifeToDiv.innerHTML = getDatepickerDateFormat(productAllocated.shelfLifeEnd);


        const buttonAddNewGroup = orderEditAddGroupButtonTemplate.cloneNode(true) as HTMLButtonElement;
        // current point
        buttonAddNewGroup.addEventListener('click', () =>
          createProductGroup(currentProductAllocatedContainer as HTMLDivElement)
        );

        (productAllocatedShelfLifeToDiv.parentNode.parentNode as HTMLDivElement).after(buttonAddNewGroup);
        buttonAddNewGroup.classList.remove('invisible');

        productAllocated.productQuantityGroups.forEach(async (quantityGroup) => {
          const quantityGroupContainer = createProductGroup(currentProductAllocatedContainer as HTMLDivElement);
          const groupSelect = quantityGroupContainer.querySelector('#inbound-order-edit-add-group') as HTMLInputElement;
          const groupIdHidden = quantityGroupContainer.querySelector(
            '#inbound-order-edit-add-group-hidden'
          ) as HTMLInputElement;
          const subGroupSelect = quantityGroupContainer.querySelector(
            '#inbound-order-edit-add-sub-group'
          ) as HTMLInputElement;
          const subGroupList = quantityGroupContainer.querySelector(
            '#inbound-order-edit-add-sub-group-list'
          ) as HTMLSelectElement;
          const groupQuantityInput = quantityGroupContainer.querySelector(
            '.inbound-order-edit-add-quantity'
          ) as HTMLInputElement;

          if (quantityGroup.group.parentGroup) {
            const groupId = quantityGroup.group.parentGroup.id;
            await fetchSubGroups(subGroupList as HTMLSelectElement, groupId.toString());

            subGroupList.value = quantityGroup.group.id.toString();
            groupSelect.value = quantityGroup.group.parentGroup.name.toString();
            groupIdHidden.value = quantityGroup.group.id.toString();
          } else {
            groupSelect.value = quantityGroup.group.name.toString();
            groupIdHidden.value = quantityGroup.group.id.toString();
          }
          groupQuantityInput.value = quantityGroup.quantity.toString();
        });

        const groupsItems = document.querySelectorAll('.group-quantity-item') as NodeListOf<HTMLDivElement>;

        if (groupsItems.length < 2) {
          buttonAddNewGroup.click();
        }

        setNewQuantityView(currentProductAllocatedContainer as HTMLDivElement);
        productAllocatedTotalQuantityInput.addEventListener('input', (e: Event) => {
          const newQuantity = (e.target as HTMLInputElement).value;

          productAllocatedQuantityDiv.innerHTML = newQuantity;
          productAllocatedQuantityDiv.setAttribute('data-quantity', newQuantity);
          setNewQuantityView(currentProductAllocatedContainer as HTMLDivElement);
        })
      });

      if (inboundOrderData.status !== 'Assigned to pickup' && inboundOrderData.status !== 'Draft') {
        saveButton.classList.add('hidden');
        orderStatusDiv.classList.remove('hidden');
        orderStatusDiv.innerHTML = inboundOrderData.status;
        orderStatusSelect.classList.add('hidden');
      } else {
        saveButton.classList.remove('hidden');
        orderStatusDiv.classList.add('hidden');
        orderStatusSelect.classList.remove('hidden');
      }
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

    const productAllocatedGroupsContainers = document.querySelectorAll(
      '.product-allocated-groups-container'
    ) as NodeListOf<HTMLDivElement>;
    const productGroups: IProductGroupCreate[] = [];

    productAllocatedGroupsContainers.forEach((productGroupContainer) => {
      const productAllocatedIdInput = productGroupContainer.querySelector('.product-allocated-id') as HTMLInputElement;
      const productAllocatedQuantityInput = productGroupContainer.querySelector('.inbound-order-edit-total-quantity') as HTMLInputElement;

      const productAllocatedQuantity = parseInt(productAllocatedQuantityInput.value);

      const productGroupCreate: IProductGroupCreate = {
        productAllocatedId: parseInt(productAllocatedIdInput.value),
        productAllocatedQuantity: productAllocatedQuantity,
        productAllocatedGroups: [],
      };

      const groupQuantityItems = productGroupContainer.querySelectorAll(
        '.group-quantity-item'
      ) as NodeListOf<HTMLDivElement>;
      groupQuantityItems.forEach((quantityItem) => {
        const groupIdSelect = quantityItem.querySelector('#inbound-order-edit-add-group') as HTMLSelectElement;
        const groupIdSelectHidden = quantityItem.querySelector(
          '#inbound-order-edit-add-group-hidden'
        ) as HTMLSelectElement;
        const groupQuantityInput = quantityItem.querySelector('.inbound-order-edit-add-quantity') as HTMLInputElement;

        if (groupIdSelectHidden.value && groupQuantityInput.value) {
          const groupId = parseInt(groupIdSelectHidden.value);
          const groupQuantity = parseInt(groupQuantityInput.value);

          productGroupCreate.productAllocatedGroups.push({
            groupId: groupId,
            quantity: groupQuantity,
          });
        }
      });
      productGroups.push(productGroupCreate);
    });

    const productGroupsQuantitiesInput = document.querySelector(
      '#inbound-order-edit-product-quantities'
    ) as HTMLInputElement;
    productGroupsQuantitiesInput.value = JSON.stringify(productGroups);

    const buttonSubmit = document.querySelector('#inbound-order-submit-btn') as HTMLButtonElement;
    buttonSubmit.click();
  });
};

const validateAssignedToPickUpForm = () => {
  const productAllocatedQuantity = document.querySelectorAll('.inbound-order-edit-check-quantity');

  const isUsedAllProducts = Array.from(productAllocatedQuantity).every((quantityNode) => {
    const quantity = parseInt(quantityNode.innerHTML);
    return quantity === 0;
  });
  return isUsedAllProducts;
};
