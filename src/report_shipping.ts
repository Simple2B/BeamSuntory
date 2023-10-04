import { Modal, ModalOptions } from "flowbite";
import { defaultBrandImage, htmxLoader } from "./base";
import { IReportShipping } from "./types";

// Dom
const viewModalHTML = document.getElementById('report-shipping-view-modal') as HTMLDivElement;
const viewUserHTML = viewModalHTML.querySelector('#report-shipping-view-user') as HTMLDivElement;
const viewActionHTML = viewModalHTML.querySelector('#report-shipping-view-action') as HTMLDivElement;
const viewCreatedDateHTML = viewModalHTML.querySelector('#report-shipping-view-created-date') as HTMLDivElement;
const viewShipRequestStatusHTML = viewModalHTML.querySelector('#report-shipping-view-ship-request-status') as HTMLDivElement;
const viewOrderNumberHTML = viewModalHTML.querySelector('#report-shipping-view-order-number') as HTMLDivElement;
const viewStoreHTML = viewModalHTML.querySelector('#report-shipping-view-store') as HTMLDivElement;
const viewHistoryHTML = viewModalHTML.querySelector('#report-shipping-view-history') as HTMLDivElement;

const cartsTable = document.querySelector('#report-shipping-table-carts') as HTMLTableElement;
const cartItemTemplate = document.querySelector('#report-shipping-view-cart-template') as HTMLTableRowElement;

// init modal
const viewModalOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {
    (viewHistoryHTML.parentNode as HTMLDivElement).classList.add('hidden');
    cartsTable.querySelectorAll('.cart-item-view').forEach(cartItem => cartItem.remove());
  },
}
const viewModal = new Modal(viewModalHTML, viewModalOptions);

document.addEventListener('DOMContentLoaded', () => {
  htmxLoader.onLoad('report-shipping-table', () => {
    const viewButtons = document.querySelectorAll('.report-shipping-table-report-view-btn') as NodeListOf<HTMLButtonElement>;
    viewButtons.forEach((button) => {
      const report: IReportShipping = JSON.parse(button.getAttribute('data-target'));

      // view click
      button.addEventListener('click', () => {
        viewUserHTML.innerHTML = report.user.username;
        viewActionHTML.innerHTML = report.type;
        viewCreatedDateHTML.innerHTML = formatDate(new Date(report.createdAt));
        viewShipRequestStatusHTML.innerHTML = report.shipRequest.status;
        viewOrderNumberHTML.innerHTML = report.shipRequest.orderNumb;
        viewStoreHTML.innerHTML = report.shipRequest.store.storeName;

        if (report.history) {
          viewHistoryHTML.innerHTML = report.history;
          (viewHistoryHTML.parentNode as HTMLDivElement).classList.remove('hidden');
        }

        // Carts render
        report.shipRequest.carts.forEach((cart, i) => {
          const cartTemplateClone = cartItemTemplate.cloneNode(true) as HTMLTableRowElement;
          cartTemplateClone.classList.add('cart-item-view');
          cartTemplateClone.classList.remove('hidden');
          cartTemplateClone.removeAttribute('id');

          const cartIndexHTML = cartTemplateClone.querySelector('.cart-index') as HTMLDivElement;
          const cartItemImageHTML = cartTemplateClone.querySelector('.cart-product-image') as HTMLImageElement;
          const cartProductNameHTML = cartTemplateClone.querySelector('.product-name') as HTMLImageElement;
          const cartProductSKUHTML = cartTemplateClone.querySelector('.product-sku') as HTMLImageElement;
          const cartGroupHTML = cartTemplateClone.querySelector('.view-group') as HTMLDivElement;
          const cartQuantityHTML = cartTemplateClone.querySelector('.view-quantity') as HTMLDivElement;
          const cartStatusHTML = cartTemplateClone.querySelector('.view-status') as HTMLDivElement;

          cartIndexHTML.innerHTML = (i + 1).toString();
          cartItemImageHTML.setAttribute(
            'src',
            cart.product.image !== 'default' ? cart.product.image : defaultBrandImage
          );

          cartProductNameHTML.innerHTML = cart.product.name;
          cartProductSKUHTML.innerHTML = cart.product.SKU;
          cartGroupHTML.innerHTML = cart.group;
          cartQuantityHTML.innerHTML = cart.quantity.toString();
          cartStatusHTML.innerHTML = cart.status;

          cartsTable.appendChild(cartTemplateClone);
        })
        viewModal.show();
      });
    });
  });
});

function formatDate(date: Date) {
  let result = null;
  let now = new Date();
  let differSec = (+now - +date) / 1000;

  if (differSec < 1) return (result = 'right now');
  if (differSec < 60) return (result = `${Math.floor(differSec)} sec. ago`);
  if (differSec < 3600) return (result = `${Math.floor(differSec / 60)} min. ago`);
  if (differSec >= 3600) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let [hours, minutes] = date.toLocaleTimeString().split(':');
    return (result = `${month}.${day}.${year} ${hours}:${minutes}`);
  }

  return result;
}
