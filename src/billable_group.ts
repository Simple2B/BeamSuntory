import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';

// /*
//  * $editGroupProductModal: required
//  * options: optional
//  */

// // For your js code

interface IBillableGroup {
  id: number;
  name: string;
  master_billable_group_id: number;
  rate: number;
  assigned_to_inbound: boolean;
  assigned_to_outbound: boolean;
}

const $modalElement: HTMLElement = document.querySelector('#editBillableGroupModal');
const addBillableGroupModalElement: HTMLElement = document.querySelector('#add-billable-group-modal');

const modalOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {
    console.log('modal is hidden');
  },
  onShow: () => {
    console.log('groupProduct id: ');
  },
  onToggle: () => {
    console.log('modal has been toggled');
  },
};

const modal: ModalInterface = new Modal($modalElement, modalOptions);
const addModal: ModalInterface = new Modal(addBillableGroupModalElement, modalOptions);

const editGroupProductCloseModalButton: HTMLButtonElement = document.querySelector(
  '#edit-billable-group-modal-close-btn'
);
editGroupProductCloseModalButton.addEventListener('click', () => {
  modal.hide();
});

const $buttonElements = document.querySelectorAll('.billable-group-edit-button');
$buttonElements.forEach((e) => {
  console.log('CLICKED');
  e.addEventListener('click', () => {
    editBillableGroup(JSON.parse(e.getAttribute('data-target')));
  });
});

// search flow
const searchInput: HTMLInputElement = document.querySelector('#table-search-billable-groups');
const searchInputButton = document.querySelector('#table-search-billable-group-button');
if (searchInputButton && searchInput) {
  searchInputButton.addEventListener('click', () => {
    window.location.href = `${window.location.origin}${window.location.pathname}?q=${searchInput.value}`;
  });
}
const deleteButtons = document.querySelectorAll('.delete-billable-group-btn');

deleteButtons.forEach((e) => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-billable-group-id');
      const response = await fetch(`/billable_group/delete/${id}`, {
        method: 'DELETE',
      });
      if ([200, 404, 409].includes(response.status)) {
        location.reload();
      }
    }
  });
});

function editBillableGroup(billableGroup: IBillableGroup) {
  console.log('groupProduct: ', billableGroup);
  let input: HTMLInputElement = document.querySelector('#billable-group-edit-name');
  input.value = billableGroup.name;
  input = document.querySelector('#billable-group-edit-id');
  input.value = billableGroup.id.toString();
  input = document.querySelector('#billable-group-edit-rate');
  input.value = billableGroup.rate.toString();
  input = document.querySelector('#billable-group-edit-assigned-to-inbound');
  input.checked = billableGroup.assigned_to_inbound;
  input = document.querySelector('#billable-group-edit-assigned-to-outbound');
  input.checked = billableGroup.assigned_to_outbound;
  let select: HTMLSelectElement = document.querySelector('#master_billable_group_id');
  select.value = billableGroup.master_billable_group_id.toString();
  modal.show();
}
