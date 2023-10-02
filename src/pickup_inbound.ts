import { ModalOptions, Modal } from 'flowbite'
import { IInboundOrderBase } from './inbound_order/types'
import HTMXDispatcher from './htmx'


// initialize htmx listener
const htmxDispatcher = new HTMXDispatcher();


document.addEventListener('DOMContentLoaded', () => {
  const buttonLoadEventsTable = document.querySelector('#table-report-loader') as HTMLButtonElement;

  // load table
  buttonLoadEventsTable.click();

  // initialize modal
  const viewReportEventsModal = document.getElementById('viewPickupInboundModal') as HTMLDivElement;
  const viewModalOptions: ModalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
      const productItems = document.querySelectorAll('.product-item-view') as NodeListOf<HTMLTableColElement>
      productItems.forEach((productItem) => productItem.remove());
    },
  }

  const viewModal = new Modal(viewReportEventsModal, viewModalOptions);
  const closingViewModalButton = document.querySelector('#buttonClosingViewPickupInboundModal') as HTMLButtonElement;
  closingViewModalButton.addEventListener('click', () => {
    viewModal.hide();
  })

  // view buttons click
  const orderTitleId = document.getElementById('pickup-inbound-view-order-id') as HTMLDivElement;
  const orderTitle = document.getElementById('pickup-inbound-view-order-title') as HTMLDivElement;
  const orderStatus = document.getElementById('pickup-inbound-view-status') as HTMLDivElement;
  const orderWarehouse = document.getElementById('pickup-inbound-view-warehouse-id') as HTMLDivElement;
  const orderActiveDate = document.getElementById('pickup-inbound-view-active-date') as HTMLDivElement;
  const orderActiveTime = document.getElementById('pickup-inbound-view-active-time') as HTMLDivElement;
  const orderDeliveryDate = document.getElementById('pickup-inbound-view-delivery-date') as HTMLDivElement;
  const supplierName = document.getElementById('pickup-inbound-view-supplier-id') as HTMLDivElement;
  const supplierAddress = document.getElementById('pickup-inbound-view-supplier-address') as HTMLDivElement;
  const orderId= document.getElementById('pickup-inbound-view-inbound-order-id') as HTMLInputElement;
  const pickupInboundButton = document.querySelector('.pickup-inbound-btn') as HTMLButtonElement;
  const  deliverAgentNotes = document.getElementById('pickup-inbound-view-da-notes') as HTMLDivElement;
  const warehouseManagerNotes = document.getElementById('pickup-inbound-view-wm-notes') as HTMLDivElement;

  // onload element with events-table id
  htmxDispatcher.onLoad('events-table', (target) => {
    const reportViewButtons: NodeListOf<HTMLButtonElement> = target.querySelectorAll('.pickup-inbound-view-button');
    reportViewButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const reportAssign: IInboundOrderBase = JSON.parse(btn.getAttribute('data-target'));

        orderId.value = reportAssign.id.toString();
        orderTitleId.innerHTML = reportAssign.orderId;
        orderTitle.innerHTML = reportAssign.title;
        orderStatus.innerHTML = reportAssign.status;
        orderWarehouse.innerHTML = reportAssign.warehouse.name;
        orderActiveDate.innerHTML = reportAssign.activeDate;
        orderActiveTime.innerHTML = reportAssign.activeTime;
        orderDeliveryDate.innerHTML = reportAssign.deliveryDate;
        supplierName.innerHTML = reportAssign.supplier.name;
        supplierAddress.innerHTML = reportAssign.supplier.address;

        deliverAgentNotes.innerHTML = reportAssign.daNotes;
        warehouseManagerNotes.innerHTML = reportAssign.wmNotes;
        
        pickupInboundButton.classList.add('hidden');

        if (reportAssign.status == 'Assigned to pickup') {
          pickupInboundButton.classList.remove('hidden');
        }

        viewModal.show();
      })
    });
  });
})
