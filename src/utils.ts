import { ModalOptions } from 'flowbite';
import { Modal } from 'flowbite';
import type { ModalInterface } from 'flowbite';

export const formatDate = (date: string) => {
  if (!date) {
    return 'None';
  }

  const createAt = new Date(date);
  const year = createAt.getFullYear();
  const month = String(createAt.getMonth() + 1).padStart(2, '0'); // Month is 0-based
  const day = String(createAt.getDate()).padStart(2, '0');
  const hours = String(createAt.getHours()).padStart(2, '0');
  const minutes = String(createAt.getMinutes()).padStart(2, '0');
  return `${month}/${day}/${year} ${hours}:${minutes}`;
};

export const modalOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {},
  onShow: () => {},
  onToggle: () => {},
};

export const initModal = (el: HTMLElement) => {
  const modal: ModalInterface = new Modal(el, modalOptions);
  return modal;
};

export const addDeleteEvent = (e: Element, url: string) => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      const response = await fetch(url, {
        method: 'DELETE',
      });
      if ([200, 202, 404].includes(response.status)) {
        location.reload();
      }
    }
  });
};

export const addSearchEvent = (searchInput: HTMLInputElement, searchButton: Element) => {
  if (searchButton && searchInput) {
    searchButton.addEventListener('click', () => {
      const url = new URL(window.location.href);
      url.searchParams.set('q', searchInput.value);
      window.location.href = `${url.href}`;
    });
  }
};

export async function generateHtml() {
  let masterBillableGroups: any[] = [];
  await fetch('/outgoing_stock/get_master_billable_groups')
    .then((res) => res.json())
    .then((data) => {
      masterBillableGroups = data;
    });
  const masterBillableGroupOptions = masterBillableGroups
    .map((group) => `<option value="${group.id}">${group.name}</option>`)
    .join('');

  return `
    <div class="p-6 border relative group-container">
      <div  class="group-allocated-delete-button absolute top-[15%] left-[97%] bg-red-600 hover:bg-red-800 rounded-lg cursor-pointer">
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#ffffff"></path>
        </svg>
      </div>
      <div class="flex gap-6">
        <!--billable selectors  -->
        <select onchange="masterGroupChange(this)" name="master_billable_group_id" class="master_billable_group_selector w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="">Select Master Billable Group</option>
          ${masterBillableGroupOptions}
        </select>
        <select onchange="billableGroupChange(this)" name="billable_group_id" class="billable_group_selector w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="">Select Billable Group</option>
          <!--billable groups  -->
        </select>
        <!--billable selectors  -->
        <input type="number" class="w-1/6 quantity bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Quantity" min="1" step="1" disabled />
        <input type="text" class="total w-1/6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Total" disabled />
      </div>
    </div>
  `;
}

export function deleteAllocatedGroup(e: MouseEvent) {
  const groupAllocatedContainer = (e.currentTarget as HTMLDivElement).closest('.group-container') as HTMLDivElement;
  groupAllocatedContainer.remove();
  const groupsDiv = document.querySelector('.group-allocated') as HTMLDivElement;
  if (groupsDiv.children.length === 0) {
    const grandTotal = document.querySelector('#grand-total');
    grandTotal.classList.add('invisible');
  }
  recalculateGrandTotal();
}

export function recalculateGrandTotal() {
  const totalInputs = document.querySelectorAll('.total') as NodeListOf<HTMLInputElement>;
  let grandTotal = 0;
  totalInputs.forEach((totalInput) => {
    grandTotal += parseFloat(totalInput.value);
  });
  const grandTotalElement = document.querySelector('#grand-total') as HTMLInputElement;
  grandTotalElement.value = `${grandTotal.toFixed(2).toString()} $`;
}
