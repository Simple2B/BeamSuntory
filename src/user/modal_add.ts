enum UserRole {
  admin = 'admin',
  sales_rep = 'sales_rep',
  warehouse_manager = 'warehouse_manager',
}
const salesAddRepContainer: HTMLDivElement = document.querySelector('#user-add-locker-address-container-div');
const salesAddRepBody: HTMLInputElement = document.querySelector('#user-add-locker-address-container-body');
const salesRepAddUserCheckbox: HTMLInputElement = document.querySelector('#user-add-sales-rep-checkbox');
const userSelectRole: HTMLSelectElement = document.querySelector('#user-select-role');

// groups select
const userAddDropdownBtn = document.querySelector('#user-add-dropdown-btn');
const optionItems = document.querySelectorAll('.user-add-dropdown-option');
let selectedOptions: string[] = [];
const options = document.querySelector('#user-add-dropdown-options');

function setRequiredLockerAddress() {
  salesAddRepBody.querySelectorAll('input').forEach((input: HTMLInputElement) => {
    input.setAttribute('required', '');
  });
}

function removeRequiredLockerAddress() {
  salesAddRepBody.querySelectorAll('input').forEach((input: HTMLInputElement) => {
    input.removeAttribute('required');
  });
}

const handlerSaleRepAddressInputs = () => {
  if (salesRepAddUserCheckbox.checked) {
    salesAddRepBody.classList.add('hidden');
    removeRequiredLockerAddress();
  } else {
    salesAddRepBody.classList.remove('hidden');
    setRequiredLockerAddress();
  }
};
salesRepAddUserCheckbox.addEventListener('change', handlerSaleRepAddressInputs);

userSelectRole.addEventListener('change', (e: Event) => {
  const currentRole = e.target as HTMLSelectElement;
  const name = currentRole.options[currentRole.selectedIndex].text;

  switch (name) {
    case UserRole.sales_rep:
      salesAddRepContainer.classList.remove('hidden');
      break;

    default:
      if (!salesAddRepContainer.classList.contains('hidden')) {
        salesAddRepContainer.classList.add('hidden');
        removeRequiredLockerAddress();
      }
      break;
  }

  if (name === UserRole.admin) {
    let input: HTMLInputElement = document.getElementById('user-add-group') as HTMLInputElement;
    selectedOptions = [];
    optionItems.forEach((item) => {
      selectedOptions.push(item.textContent.trim());
    });
    const joinedOptions = selectedOptions.join(', ');
    input.value = joinedOptions;
    userAddDropdownBtn.innerHTML = joinedOptions;
  }
});

function handleUserAddDropdownBtnClick() {
  options.classList.toggle('hidden');
}

userAddDropdownBtn.addEventListener('click', handleUserAddDropdownBtnClick);

optionItems.forEach((optionItem: HTMLElement) => {
  optionItem.addEventListener('click', (event) => {
    const option: HTMLElement = event.target as HTMLElement;
    const value = option.textContent;
    let input: HTMLInputElement = document.getElementById('user-add-group') as HTMLInputElement;

    window.addEventListener('mouseup', (event: MouseEvent) => {
      if (event.target !== options && !options.contains(event.target as Node)) {
        options.classList.add('hidden');
      }
    });

    if (selectedOptions.includes(value)) {
      const index = selectedOptions.indexOf(value);
      if (index > -1) {
        selectedOptions.splice(index, 1);
      }
      option.classList.remove('bg-blue-600');
    } else {
      selectedOptions.push(value);
      option.classList.add('bg-blue-600');
    }

    const joinedOptions = selectedOptions.join(', ');
    input.value = joinedOptions;
    userAddDropdownBtn.innerHTML = joinedOptions;
  });
});
