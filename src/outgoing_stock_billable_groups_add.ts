import { deleteAllocatedGroup, generateHtml, recalculateGrandTotal } from './utils';

const createAllocationBillableGroupContainer = async (e: MouseEvent) => {
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

const buttonAllocateProduct = document.getElementById(
  'outgoing-stock-billable-groups-allocate-btn'
) as HTMLButtonElement;
if (buttonAllocateProduct) {
  buttonAllocateProduct.addEventListener('click', createAllocationBillableGroupContainer);
}
