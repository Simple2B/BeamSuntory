// TODO need finish this
// enum UserRole {
//     admin = 'admin',
//     sales_rep = 'sales_rep',
//     warehouse_manager = 'warehouse_manager',
// }
// const salesAddRepContainer: HTMLDivElement = document.querySelector('#user-add-locker-address-container');
// const salesAddRepBody: HTMLInputElement = document.querySelector('#user-add-locker-address-container-body');
// const salesRepAddUserCheckbox: HTMLInputElement = document.querySelector('#user-add-sales-rep-checkbox');
// const userSelectRole: HTMLSelectElement = document.querySelector('#user-select-role');

// function setRequiredLockerAddress() {
//     salesAddRepBody.querySelectorAll('input').forEach((input: HTMLInputElement) => {
//         input.setAttribute('required', '');
//     });
// }

// function removeRequiredLockerAddress() {
//     salesAddRepBody.querySelectorAll('input').forEach((input: HTMLInputElement) => {
//         input.removeAttribute('required');
//     });
// }

// const handlerSaleRepAddressInputs = () => {
//     console.log(salesRepAddUserCheckbox.checked);
//     if (salesRepAddUserCheckbox.checked) {
//         salesAddRepBody.classList.add('hidden');
//         removeRequiredLockerAddress();
//     } else {
//         salesAddRepBody.classList.remove('hidden');
//         setRequiredLockerAddress();
//     }
// }
// salesRepAddUserCheckbox.addEventListener('change', handlerSaleRepAddressInputs);

// userSelectRole.addEventListener('change', (e: Event) => {
//     const currentRole = e.target as HTMLSelectElement;
//     const name = currentRole.options[currentRole.selectedIndex].text;

//     switch (name) {
//         case UserRole.sales_rep:
//             salesAddRepContainer.classList.remove('hidden');
//             break;
//         default:
//             if (!salesAddRepContainer.classList.contains('hidden')) {
//                 salesAddRepContainer.classList.add('hidden');
//                 removeRequiredLockerAddress();
//             }
//             break;
//     }

// });










