import { Modal } from 'flowbite'
import type { ModalOptions, ModalInterface } from 'flowbite'
import { Input, Timepicker, initTE } from 'tw-elements'
import Datepicker from 'flowbite-datepicker/Datepicker'

initTE({ Input, Timepicker })

const pickerInline = document.querySelector('#timepicker-inline-12')
const timepickerMaxMin = new Timepicker(pickerInline, {
    format12: true,
    inline: true,
})
// /*
//  * $editInboundOrderModal: required
//  * options: optional
//  */

// // For your js code

interface IProductGroupCreate {
  productId: number
  groupId: number
  quantity: number
}

interface ISupplier {
  id: number
  name: string
  address: string
}

interface IWarehouse {
  id: number
  name: string
}

interface IProduct {
    id: number
    name: string
}

interface IGroup {
    id: number
    name: string
}

interface IProductAllocatedBase {
  id: number
  quantity: number
  shelfLifeStart: string
  shelfLifeEnd: string
}

interface IGroup {
  name: string
}

interface IProductQuantityGroupOut {
  quantity: number
  group: IGroup  
}

interface IAllocatedProductOut extends IProductAllocatedBase {
  product: IProduct
  productQuantityGroups: IProductQuantityGroupOut
}

interface IInboundOrderBase {
  orderId: string
  status: string
  title: string
  activeDate: string
  activeTime: string
  deliveryDate: string
  supplier: ISupplier
  warehouse: IWarehouse
}

interface IInboundOrderOut extends IInboundOrderBase {
  uuid: string
  productsAllocated: IAllocatedProductOut[]
}

function convertDate(date: string) {
    const inputDate = date.split('T')[0]
    const dateParts = inputDate.split('-')
    const year = dateParts[0]
    const month = dateParts[1]
    const day = dateParts[2]
    return `${month}/${day}/${year}`
}

const $modalElement: HTMLElement = document.querySelector('#editInboundOrderModal')
const $addInboundOrderModalElement: HTMLElement = document.querySelector('#add-inbound-order-modal')


const modalOptions: ModalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: true,
}

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

const modal: ModalInterface = new Modal($modalElement, modalOptions)
const addModal: ModalInterface = new Modal($addInboundOrderModalElement, addModalOptions)

const $buttonElements = document.querySelectorAll('.inbound-order-edit-button');
$buttonElements.forEach((e) =>
    e.addEventListener('click', () => {
        const inboundOrder: IInboundOrderBase = JSON.parse(e.getAttribute('data-target'))
    })
);

const addModalButton = document.querySelector('#inbound-order-add-modal-button')


addModalButton.addEventListener('click', () => {    
    addModal.show();
})

// search flow
const searchInput: HTMLInputElement = document.querySelector('#table-search-inbound-orders')
const searchInputButton = document.querySelector('#table-search-inbound-order-button')
if (searchInputButton && searchInput) {
    searchInputButton.addEventListener('click', () => {
        const url = new URL(window.location.href)
        url.searchParams.set('q', searchInput.value)
        window.location.href = `${url.href}`
    })
}
const deleteButtons = document.querySelectorAll('.delete-inbound-order-btn')

deleteButtons.forEach((e) => {
    e.addEventListener('click', async () => {
        if (confirm('Are sure?')) {
            let id = e.getAttribute('data-inbound-order-id')
            const response = await fetch(`/inbound_order/delete/${id}`, {
                method: 'DELETE',
            })
            if (response.status == 200) {
                location.reload()
            }
        }
    })
})



const openCurrentOrder = () =>{
  const urlParams = new URLSearchParams(window.location.search);
  const orderUuid = urlParams.get('current_inbound_uuid');

  if(!orderUuid){
    return;
  }

  const orderColumn = document.querySelector(`#inbound-order-${orderUuid}`);

  if (!orderColumn) {
    return;
  }

  const orderEditButton = orderColumn.querySelector('.inbound-order-edit-button') as HTMLButtonElement;
  orderEditButton.click();  
}

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

const deleteAllocatedProduct = (e: MouseEvent) => {
    const productAllocatedContainer = (e.currentTarget as HTMLSpanElement).parentNode as HTMLDivElement;
    const productsAllocatedContainer = productAllocatedContainer.parentNode as HTMLDivElement;

    productAllocatedContainer.remove()
    console.log(productsAllocatedContainer.children.length)
    if (productsAllocatedContainer.children.length == 2) {
        const productAllocatedDeleteButton = productsAllocatedContainer.querySelector('.product-allocated-delete-button');
        console.log(productAllocatedDeleteButton)
        productAllocatedDeleteButton.classList.add('invisible');
    }
}

const createAllocationProductContainer = (e: MouseEvent) => {
    const btn = e.currentTarget as HTMLButtonElement;
    const productAllocatedContainer = document.querySelector('.product-allocated').parentNode as HTMLDivElement;

    if(productAllocatedContainer.parentNode.children.length == 2){
        const buttonRemoveProductAllocated = productAllocatedContainer.querySelector('.product-allocated-delete-button');
        buttonRemoveProductAllocated.classList.remove('invisible');
    }

    const productAllocatedNew = productAllocatedContainer.cloneNode(true) as HTMLDivElement;
    // Clear inputs
    productAllocatedNew.querySelectorAll('input').forEach(input => {
        input.value = '';
    })

    const buttonDeleteAllocatedProduct = productAllocatedNew.querySelector('.product-allocated-delete-button');
    buttonDeleteAllocatedProduct.addEventListener('click', deleteAllocatedProduct);

    const productsAllocatedContainer = btn.parentNode.parentNode as HTMLDivElement;

    productsAllocatedContainer.insertBefore(productAllocatedNew, btn.parentNode);
}


const deleteProductGroup = (e: MouseEvent) => {
  const btn = e.currentTarget as HTMLButtonElement;

  const productGroupsContainer = btn.parentNode.parentNode;

  (btn.parentNode as HTMLDivElement).remove();

  if(productGroupsContainer.children.length === 2) {
    productGroupsContainer.querySelector('.product-group-delete-button').classList.add('invisible');
  }

}


const createProductGroup = (e: MouseEvent) => {
  const btn = e.currentTarget as HTMLButtonElement;
  const productGroupContainer = document.querySelector('.inbound-order-edit-add-item') as HTMLDivElement;

  if(productGroupContainer.parentNode.children.length === 2) {
    productGroupContainer.querySelector('.product-group-delete-button').classList.remove('invisible');
  }

  const productGroupContainerNew = productGroupContainer.cloneNode(true) as HTMLDivElement;

  // Clear fields
  (productGroupContainerNew.querySelector('.inbound-order-edit-add-quantity') as HTMLInputElement).value = '';

  const buttonGroupDelete = productGroupContainerNew.querySelector('.product-group-delete-button');
  buttonGroupDelete.addEventListener('click', deleteProductGroup);

  buttonGroupDelete.classList.remove('invisible')

  btn.parentNode.parentNode.insertBefore(productGroupContainerNew, btn.parentNode);
}

const getDatepickerDateFormat = (dateString: string) => {
  const date = new Date(dateString);
  const dateParts = date.toLocaleDateString().split('/');

  const tmp = dateParts[0];
  dateParts[0] = dateParts[1];
  dateParts[1] = tmp;

  return dateParts.join('/');
}


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

// # NOTE: depends on flash from create route on inbound_order_blueprint
document.addEventListener('DOMContentLoaded', () => {
    // Create order
    createInboundOrderHandler();

    const buttonAllocateProduct = document.getElementById('inbound-order-allocate-product-btn') as HTMLButtonElement;
    buttonAllocateProduct.addEventListener('click', createAllocationProductContainer);

    const buttonDeleteAllocatedProduct = document.querySelector('.product-allocated-delete-button');
    buttonDeleteAllocatedProduct.addEventListener('click', deleteAllocatedProduct);

    // Order view
    // modal Nodes
    const viewInboundOrderModalElement: HTMLDivElement = document.querySelector('#view-inbound-order-modal') as HTMLDivElement;
    const orderIdView = viewInboundOrderModalElement.querySelector('#inbound-order-view-order_id') as HTMLDivElement;
    const orderStatus = viewInboundOrderModalElement.querySelector('#inbound-order-view-status') as HTMLDivElement;
    const orderActiveDate = viewInboundOrderModalElement.querySelector('#inbound-order-view-active_date') as HTMLDivElement;
    const orderActiveTime = viewInboundOrderModalElement.querySelector('#inbound-order-view-active_time') as HTMLDivElement;
    const orderTitle = viewInboundOrderModalElement.querySelector('#inbound-order-view-order_title') as HTMLDivElement;
    const orderDeliveryDate = viewInboundOrderModalElement.querySelector('#inbound-order-view-delivery_date') as HTMLDivElement;
    const orderWarehouseName = viewInboundOrderModalElement.querySelector('#inbound-order-view-warehouse-name') as HTMLDivElement;

    const orderSupplierName = viewInboundOrderModalElement.querySelector('#inbound-order-view-supplier-name')
    const orderSupplierAddress = viewInboundOrderModalElement.querySelector('#inbound-order-view-supplier-address')

    const modalViewDivs = [orderIdView, orderStatus, orderActiveDate, orderActiveTime, orderTitle, orderDeliveryDate, orderWarehouseName, orderSupplierName, orderSupplierAddress];

    const viewModalOptions: ModalOptions = {
        placement: 'bottom-right',
        backdrop: 'dynamic',
        backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
        closable: true,
        onHide: () => {
            modalViewDivs.forEach(modalDiv => {
              modalDiv.innerHTML = '';
            });
        },
    }

    const viewModal = new Modal(viewInboundOrderModalElement, viewModalOptions);
    const orderViewButtons = document.querySelectorAll('.inbound-order-view-button');

    orderViewButtons.forEach((viewButton) => {
      const inboundOrderData = JSON.parse(viewButton.getAttribute('data-target')) as IInboundOrderOut;
      // Nodes
      viewButton.addEventListener('click', () => {
        // Fill order view modal data
        orderIdView.innerHTML = inboundOrderData.orderId;
        orderStatus.innerHTML = inboundOrderData.status;
        orderActiveDate.innerHTML = getDatepickerDateFormat(inboundOrderData.activeDate);
        orderActiveTime.innerHTML = inboundOrderData.activeTime;
        orderTitle.innerHTML = inboundOrderData.title;
        orderDeliveryDate.innerHTML = getDatepickerDateFormat(inboundOrderData.deliveryDate);
        orderWarehouseName.innerHTML = inboundOrderData.warehouse.name;
        orderSupplierName.innerHTML = inboundOrderData.supplier.name;
        orderSupplierAddress.innerHTML = inboundOrderData.supplier.address;

        viewModal.show();
      });
    });

    // Edit order
    // Nodes
    const orderEditButtons = document.querySelectorAll('.inbound-order-edit-button') as NodeListOf<HTMLButtonElement>;
    const orderEditModalHTML = document.querySelector('#edit-inbound-order-modal') as HTMLDivElement;
    const orderUuidInput = document.querySelector('#inbound-order-uuid') as HTMLInputElement;
    const orderStatusSelect = document.querySelector('#inbound-order-edit-status') as HTMLSelectElement;
    const orderTitleInput = document.querySelector('#inbound-order-edit-order-title') as HTMLInputElement;
    const orderActiveDateInput = document.querySelector('#inbound-order-edit-active-date') as HTMLInputElement;
    const orderActiveTimeInput = document.querySelector('#inbound-order-edit-active-time') as HTMLInputElement;
    const orderDeliveryDateInput = document.querySelector('#inbound-order-edit-delivery-date') as HTMLInputElement;
    const orderSupplierIdSelect = document.querySelector('#inbound-order-edit-supplier-id') as HTMLSelectElement;
    const orderWarehouseIdSelect = document.querySelector('#inbound-order-edit-warehouse-id') as HTMLSelectElement;
    const orderEditProductsAllocatedContainer = document.querySelector('#inbound-order-edit-check-container') as HTMLElement;
    const orderEditAddGroupButtonTemplate = document.querySelector('.inbound-order-add-product-group-btn');
    const groupItemTemplate = document.querySelector('.group-quantity-item') as HTMLDivElement;

    const modalEditOptions: ModalOptions = {
        placement: 'bottom-right',
        backdrop: 'dynamic',
        backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
        closable: true,
        onHide: () => {
              while (orderEditProductsAllocatedContainer.children.length > 1) {
                orderEditProductsAllocatedContainer.removeChild(orderEditProductsAllocatedContainer.lastElementChild);
              }

              const groupsQuantity = document.querySelectorAll('.group-quantity-item') as NodeListOf<HTMLDivElement>;
              groupsQuantity.forEach(group => group.remove());

              const buttonsAddGroupQuantity = document.querySelectorAll('.inbound-order-add-product-group-btn') as NodeListOf<HTMLButtonElement>;
              buttonsAddGroupQuantity.forEach(button => button.remove());
        },
    }
    // Create modal
    const orderEditModal = new Modal(orderEditModalHTML, modalEditOptions);

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
          const productAllocatedNameDiv = currentProductAllocatedContainer.querySelector('.inbound-order-edit-check-product') as HTMLDivElement;
          const productAllocatedQuantityDiv = currentProductAllocatedContainer.querySelector('.inbound-order-edit-check-quantity') as HTMLDivElement;
          const productAllocatedShelfLifeFromDiv = currentProductAllocatedContainer.querySelector('.inbound-order-edit-shelf-life-from') as HTMLDivElement;
          const productAllocatedShelfLifeToDiv = currentProductAllocatedContainer.querySelector('.inbound-order-edit-shelf-life-to') as HTMLDivElement;

          productAllocatedNameDiv.innerHTML = productAllocated.product.name;
          productAllocatedQuantityDiv.innerHTML = productAllocated.quantity.toString();
          productAllocatedQuantityDiv.setAttribute('data-quantity', productAllocated.quantity.toString());
          productAllocatedShelfLifeFromDiv.innerHTML = getDatepickerDateFormat(productAllocated.shelfLifeStart);
          productAllocatedShelfLifeToDiv.innerHTML = getDatepickerDateFormat(productAllocated.shelfLifeEnd);

          const buttonAddNewGroup = orderEditAddGroupButtonTemplate.cloneNode(true) as HTMLButtonElement;
      
          buttonAddNewGroup.addEventListener('click', () => {
            const groupQuantityItemNew = groupItemTemplate.cloneNode(true) as HTMLDivElement;
            groupQuantityItemNew.classList.remove('invisible');

            const buttonDeleteQuantityGroup = groupQuantityItemNew.querySelector('.quantity-group-delete-button') as HTMLButtonElement;
            
            buttonDeleteQuantityGroup.addEventListener('click', (e) => {
              groupQuantityItemNew.remove();
              setNewQuantityView(buttonAddNewGroup.parentNode as HTMLDivElement);
            })

            const quantityInput = groupQuantityItemNew.querySelector('.inbound-order-edit-add-quantity') as HTMLInputElement;
            const quantityView = buttonAddNewGroup.parentNode.querySelector('.inbound-order-edit-check-quantity');
            const quantitiesGroupInputs = buttonAddNewGroup.parentNode.querySelectorAll('.inbound-order-edit-add-quantity') as NodeListOf<HTMLInputElement>;
            
            let quantityLeft = parseInt(quantityView.getAttribute('data-quantity'))
            quantitiesGroupInputs.forEach(quantityGroupInput => {
              if(quantityGroupInput.value) {
                quantityLeft -= parseInt(quantityGroupInput.value);
              }
            })
            quantityInput.value = quantityLeft.toString();
            buttonAddNewGroup.before(groupQuantityItemNew);

            quantityInput.addEventListener('input', (e) => {
              setNewQuantityView(buttonAddNewGroup.parentNode as HTMLDivElement);
            })
            setNewQuantityView(buttonAddNewGroup.parentNode as HTMLDivElement);
          });

          (productAllocatedShelfLifeToDiv.parentNode.parentNode as HTMLDivElement).after(buttonAddNewGroup);
          buttonAddNewGroup.classList.remove('invisible');
        });

        orderEditModal.show();
      });
    });

    // Open current order
    openCurrentOrder();

    // submit
    const buttonSave = document.querySelector('#inbound-order-save-products-btn') as HTMLButtonElement;
    buttonSave.addEventListener('click', () => {
      const productGroupContainers = document.querySelectorAll('.inbound-order-edit-add-item');
      const productGroups: IProductGroupCreate[] = [];

      productGroupContainers.forEach(productGroupContainer => {
        const productIdSelect = productGroupContainer.querySelector('.inbound-order-edit-add-product') as HTMLSelectElement;
        const productGroupIdSelect = productGroupContainer.querySelector('.inbound-order-edit-add-group') as HTMLSelectElement;
        const groupQuantityInput = productGroupContainer.querySelector('.inbound-order-edit-add-quantity') as HTMLInputElement;

        productGroups.push({
          productId: parseInt(productIdSelect.value),
          groupId: parseInt(productGroupIdSelect.value),
          quantity: parseInt(groupQuantityInput.value),
        })
      })

      const productGroupsQuantitiesInput = document.querySelector('#inbound-order-edit-product-quantities') as HTMLInputElement;
      productGroupsQuantitiesInput.value = JSON.stringify(productGroups);

      const buttonSubmit = document.querySelector('#inbound-order-submit-btn') as HTMLButtonElement;
      buttonSubmit.click();
    })
});