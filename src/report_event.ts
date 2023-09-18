import { IProduct } from "./inbound_order/types"

interface IProductEvent {
  dateFrom: string 
  dateTo: string
  product: IProduct
}

interface IReportEvent {
  quantity: number
  type: string
  event: IProductEvent
}

document.addEventListener('DOMContentLoaded', () => {
  // view buttons click
  const reportViewButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.report-event-view-btn');
  reportViewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const reportEvent = JSON.parse(btn.getAttribute('data-target'));
      console.log({reportEvent});
    })
  })
});