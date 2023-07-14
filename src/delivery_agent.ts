import {Modal} from 'flowbite';
import type {ModalOptions, ModalInterface} from 'flowbite';

// /*
//  * $editDeliveryAgentModal: required
//  * options: optional
//  */

// // For your js code

interface IDeliveryAgent {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  contact_number: string;
  street_address: string;
  active: boolean;
}

const $modalElement: HTMLElement = document.querySelector(
  '#editDeliveryAgentModal',
);
const $addDeliveryAgentModalElement: HTMLElement = document.querySelector(
  '#add-delivery-agent-modal',
);

const modalOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses:
    'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {
    console.log('modal is hidden');
  },
  onShow: () => {
    console.log('delivery-agent id: ');
  },
  onToggle: () => {
    console.log('modal has been toggled');
  },
};

const modal: ModalInterface = new Modal($modalElement, modalOptions);
const addModal: ModalInterface = new Modal(
  $addDeliveryAgentModalElement,
  modalOptions,
);

const $buttonElements = document.querySelectorAll(
  '.delivery-agent-edit-button',
);
$buttonElements.forEach(e =>
  e.addEventListener('click', () => {
    editDeliveryAgent(JSON.parse(e.getAttribute('data-target')));
  }),
);

// search flow
const searchInput: HTMLInputElement = document.querySelector(
  '#table-search-delivery-agents',
);
const searchInputButton = document.querySelector(
  '#table-search-delivery-agent-button',
);
if (searchInputButton && searchInput) {
  searchInputButton.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.set('q', searchInput.value);
    window.location.href = `${url.href}`;
  });
}
const deleteButtons = document.querySelectorAll('.delete-delivery-agent-btn');

deleteButtons.forEach(e => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      let id = e.getAttribute('data-delivery-agent-id');
      const response = await fetch(`/delivery_agent/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.status == 200) {
        location.reload();
      }
    }
  });
});

function editDeliveryAgent(deliveryAgent: IDeliveryAgent) {
  let input: HTMLInputElement = document.querySelector(
    '#delivery-agent-edit-username',
  );
  input.value = deliveryAgent.username;
  input = document.querySelector('#delivery-agent-edit-id');
  input.value = deliveryAgent.id.toString();
  input = document.querySelector('#delivery-agent-edit-first_name');
  input.value = deliveryAgent.first_name;
  input = document.querySelector('#delivery-agent-edit-last_name');
  input.value = deliveryAgent.last_name;
  input = document.querySelector('#delivery-agent-edit-email');
  input.value = deliveryAgent.email;
  input = document.querySelector('#delivery-agent-edit-contact_number');
  input.value = deliveryAgent.contact_number;
  input = document.querySelector('#delivery-agent-edit-street_address');
  input.value = deliveryAgent.street_address;
  input = document.querySelector('#delivery-agent-edit-active');
  input.checked = deliveryAgent.active;
  input = document.querySelector('#delivery-agent-edit-next_url');
  input.value = window.location.href;
  modal.show();
}
