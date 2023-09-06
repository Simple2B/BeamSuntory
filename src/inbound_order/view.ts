import { Modal } from 'flowbite'
import type { ModalOptions } from 'flowbite'
import { IInboundOrderOut } from './types';
import { getDatepickerDateFormat } from './utils';

export const initViewInboundOrderModal = () => {
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
    // create modal
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
}