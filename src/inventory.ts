// search flow
const searchInput: HTMLInputElement = document.querySelector('#table-search-inventory')
const searchInputButton = document.querySelector('#table-search-inventory-button')
if (searchInputButton && searchInput) {
    searchInputButton.addEventListener('click', () => {
        window.location.href = `${window.location.origin}${window.location.pathname}?q=${searchInput.value}`;
    })
}
