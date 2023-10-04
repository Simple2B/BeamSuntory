import { Modal, ModalOptions } from "flowbite";
import { htmxLoader } from "./base";
import { IReportRequestShare } from "./types";

htmxLoader.onLoad('share-request-table', (target) => {
  // init view modal
  const viewModalHTML = document.getElementById('report-request-share-view-modal') as HTMLDivElement;
  const viewUserHTML = viewModalHTML.querySelector('#report-request-share-view-user') as HTMLDivElement;
  const viewActionHTML = viewModalHTML.querySelector('#report-request-share-view-action') as HTMLDivElement;
  const viewCreatedDateHTML = viewModalHTML.querySelector('#report-request-share-view-created-date') as HTMLDivElement;
  const viewShareRequestStatusHTML = viewModalHTML.querySelector('#report-request-share-view-share-request-status') as HTMLDivElement;
  const viewGroupHTML = viewModalHTML.querySelector('#report-request-share-view-group') as HTMLDivElement;
  const viewDesiredQuantityHTML = viewModalHTML.querySelector('#report-request-share-view-desired-quantity') as HTMLDivElement;
  const viewProductSkuHTML = viewModalHTML.querySelector('#report-request-share-view-product-sku') as HTMLDivElement;
  const viewProductNameHTML = viewModalHTML.querySelector('#report-request-share-view-product-name') as HTMLDivElement;
  const viewHistoryHTML = viewModalHTML.querySelector('#report-request-share-view-history') as HTMLDivElement;
  
  const viewModalOptions: ModalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
      (viewHistoryHTML.parentNode as HTMLDivElement).classList.add('hidden');
    },
  }
  const viewModal = new Modal(viewModalHTML, viewModalOptions);

  const viewButtons = document.querySelectorAll('.report-view-btn') as NodeListOf<HTMLButtonElement>;
  viewButtons.forEach((button) => {

    const reportRequestShare: IReportRequestShare = JSON.parse(button.getAttribute('data-target'));

    // view click
    button.addEventListener('click', () => {
      viewUserHTML.innerHTML = reportRequestShare.user.username;
      viewActionHTML.innerHTML = reportRequestShare.type;
      viewCreatedDateHTML.innerHTML = formatDate(new Date(reportRequestShare.createdAt));
      viewShareRequestStatusHTML.innerHTML = reportRequestShare.requestShare.status;
      viewGroupHTML.innerHTML = reportRequestShare.requestShare.group.name;
      viewDesiredQuantityHTML.innerHTML = reportRequestShare.requestShare.desireQuantity.toString();
      viewProductSkuHTML.innerHTML = reportRequestShare.requestShare.product.SKU;
      viewProductNameHTML.innerHTML = reportRequestShare.requestShare.product.name;

      if (reportRequestShare.history) {
        viewHistoryHTML.innerHTML = reportRequestShare.history;
        (viewHistoryHTML.parentNode as HTMLDivElement).classList.remove('hidden');
      }
      viewModal.show();
    })
  });
});

function formatDate(date: Date) {
  let result = null;
  let now = new Date();
  let differSec = (+now - +date) / 1000;

  if (differSec < 1) return result = "right now";
  if (differSec < 60) return result = `${Math.floor(differSec)} sec. ago`;
  if (differSec < 3600) return result = `${Math.floor(differSec / 60)} min. ago`;
  if (differSec >= 3600) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let [hours, minutes] = date.toLocaleTimeString().split(":");
    return result = `${month}.${day}.${year} ${hours}:${minutes}`;
  };

  return result;
}
