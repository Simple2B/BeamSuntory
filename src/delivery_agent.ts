import { addDeleteEvent, addSearchEvent, initModal } from './utils';

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

const $modalElement: HTMLElement = document.querySelector('#editDeliveryAgentModal');
const $addDeliveryAgentModalElement: HTMLElement = document.querySelector('#add-delivery-agent-modal');

const modal = initModal($modalElement);
const addModal = initModal($addDeliveryAgentModalElement);

const editDeliveryAgentCloseModalButton: HTMLButtonElement = document.querySelector(
  '#edit-delivery-agent-modal-close-btn'
);
editDeliveryAgentCloseModalButton.addEventListener('click', () => {
  modal.hide();
});

const $buttonElements = document.querySelectorAll('.delivery-agent-edit-button');
$buttonElements.forEach((e) =>
  e.addEventListener('click', () => {
    editDeliveryAgent(JSON.parse(e.getAttribute('data-target')));
  })
);

// search flow
const searchInput: HTMLInputElement = document.querySelector('#table-search-delivery-agents');
const searchInputButton = document.querySelector('#table-search-delivery-agent-button');
addSearchEvent(searchInput, searchInputButton);

const deleteButtons = document.querySelectorAll('.delete-delivery-agent-btn');

deleteButtons.forEach((e) => {
  addDeleteEvent(e, `/delivery_agent/delete/${e.getAttribute('data-delivery-agent-id')}`);
});

function editDeliveryAgent(deliveryAgent: IDeliveryAgent) {
  let input: HTMLInputElement = document.querySelector('#delivery-agent-edit-username');
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
