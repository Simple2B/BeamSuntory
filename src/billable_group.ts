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

export interface IGroupAllocatedBase {
  name: string;
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

// for multiple creating

const deleteAllocatedGroup = (e: MouseEvent) => {
  const groupAllocatedContainer = (e.currentTarget as HTMLSpanElement).parentNode as HTMLDivElement;
  const groupsAllocatedContainer = groupAllocatedContainer.parentNode as HTMLDivElement;

  groupAllocatedContainer.remove();
  if (groupsAllocatedContainer.children.length == 2) {
    const productAllocatedDeleteButton = groupsAllocatedContainer.querySelector('.group-allocated-delete-button');
    productAllocatedDeleteButton.classList.add('invisible');
  }
};

const createAllocationBillableGroupContainer = (e: MouseEvent) => {
  const btn = e.currentTarget as HTMLButtonElement;
  const groupAllocatedContainer = document.querySelector('.group-allocated').parentNode as HTMLDivElement;

  if (groupAllocatedContainer.parentNode.children.length == 2) {
    const buttonRemoveGroupAllocated = groupAllocatedContainer.querySelector('.group-allocated-delete-button');
    buttonRemoveGroupAllocated.classList.remove('invisible');
  }

  const groupAllocatedNew = groupAllocatedContainer.cloneNode(true) as HTMLDivElement;
  // Clear inputs
  groupAllocatedNew.querySelectorAll('input').forEach((input) => {
    input.value = '';
  });

  const buttonDeleteAllocatedGroup = groupAllocatedNew.querySelector('.group-allocated-delete-button');
  buttonDeleteAllocatedGroup.addEventListener('click', deleteAllocatedGroup);

  const productsAllocatedContainer = btn.parentNode.parentNode as HTMLDivElement;

  productsAllocatedContainer.insertBefore(groupAllocatedNew, btn.parentNode);
};

const createMultipleBillableGroupsHandler = () => {
  const createBillableGroupsBtn = document.getElementById('billable-groups-create-btn') as HTMLButtonElement;
  const createBillableGroupsBtnSubmit = document.getElementById('billable-groups-add-submit-btn') as HTMLButtonElement;
  if (!createBillableGroupsBtn) {
    console.log('Error: no create inbound order button');
    return;
  }
  createBillableGroupsBtn.addEventListener('click', () => {
    const allocatedGroupsData: IGroupAllocatedBase[] = [];
    // Set products as JSON to field
    const groupsAllocatedContainers = document.querySelectorAll('.group-allocated');

    groupsAllocatedContainers.forEach((groupContainer) => {
      // Get HTML nodes with product values
      const groupAllocatedNameInput = groupContainer.querySelector('.group-allocated-name') as HTMLInputElement;
      const groupAllocatedRateInput = groupContainer.querySelector('.group-allocated-rate') as HTMLInputElement;
      const groupAllocatedAssignToInboundCheckbox = groupContainer.querySelector(
        '.group-allocated-assign-to-inbound'
      ) as HTMLInputElement;
      const groupAllocatedAssignToOutboundCheckbox = groupContainer.querySelector(
        '.group-allocated-assign-to-outbound'
      ) as HTMLInputElement;

      console.log(groupAllocatedAssignToInboundCheckbox, groupAllocatedAssignToOutboundCheckbox);

      // Retrieve values from Nodes
      const groupAllocatedName = groupAllocatedNameInput.value;
      const groupAllocatedRate = parseFloat(groupAllocatedRateInput.value);
      const groupAllocatedAssignToInbound = groupAllocatedAssignToInboundCheckbox.checked;
      const groupAllocatedAssignToOutbound = groupAllocatedAssignToOutboundCheckbox.checked;

      console.log(
        groupAllocatedName,
        groupAllocatedRate,
        groupAllocatedAssignToInbound,
        groupAllocatedAssignToOutbound
      );

      allocatedGroupsData.push({
        name: groupAllocatedName,
        rate: groupAllocatedRate,
        assigned_to_inbound: groupAllocatedAssignToInbound,
        assigned_to_outbound: groupAllocatedAssignToOutbound,
      });
    });

    const inputGroups: HTMLInputElement = document.querySelector(`#billable-add-many-add-groups`);
    inputGroups.value = JSON.stringify(allocatedGroupsData);
    createBillableGroupsBtnSubmit.click();
  });
};

// # NOTE: depends on flash from create route on inbound_order_blueprint
document.addEventListener('DOMContentLoaded', () => {
  const buttonAllocateProduct = document.getElementById('billable-groups-allocate-btn') as HTMLButtonElement;
  buttonAllocateProduct.addEventListener('click', createAllocationBillableGroupContainer);

  const buttonDeleteAllocatedProduct = document.querySelector('.group-allocated-delete-button');
  buttonDeleteAllocatedProduct.addEventListener('click', deleteAllocatedGroup);

  createMultipleBillableGroupsHandler();
});
