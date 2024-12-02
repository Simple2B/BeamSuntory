import { deleteAllocatedGroup, generateHtml, recalculateGrandTotal } from './utils';

const createAddInboundGroupContainer = async (e: MouseEvent) => {
  const btn = e.currentTarget as HTMLButtonElement;
  const groupAllocatedContainer = document.querySelector('.group-allocated') as HTMLDivElement;
  const grandTotal = document.querySelector('#grand-total');
  grandTotal.classList.remove('invisible');
  const html = await generateHtml();
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  const newGroupContainer = tempDiv.firstElementChild as HTMLDivElement;
  groupAllocatedContainer.appendChild(newGroupContainer);

  const deleteButtons = newGroupContainer.querySelectorAll('.group-allocated-delete-button');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', deleteAllocatedGroup);
  });

  const quantityInputs = newGroupContainer.querySelectorAll('.quantity') as NodeListOf<HTMLInputElement>;
  quantityInputs.forEach((quantityInput) => {
    const totalInput = quantityInput.closest('.group-container').querySelector('.total') as HTMLInputElement;

    quantityInput.addEventListener('input', (e) => {
      const qty = e.currentTarget as HTMLInputElement;
      const rate = parseFloat(totalInput.getAttribute('data-rate'))
        ? parseFloat(totalInput.getAttribute('data-rate'))
        : 0;
      const quantity = parseFloat(qty.value);
      if (quantity > 0) {
        totalInput.value = `${(quantity * rate).toFixed(2).toString()} $`;
      }
      recalculateGrandTotal();
    });
  });
};

const buttonAllocateAddGroups = document.getElementById(
  'inbound-order-billable-groups-adding-btn'
) as HTMLButtonElement;
if (buttonAllocateAddGroups) {
  buttonAllocateAddGroups.addEventListener('click', createAddInboundGroupContainer);
}
