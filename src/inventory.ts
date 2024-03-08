// search flow
const searchInput: HTMLInputElement = document.querySelector('#table-search-inventory')
const searchInputButton = document.querySelector('#table-search-inventory-button')
if (searchInputButton && searchInput) {
    searchInputButton.addEventListener('click', () => {
        const url = new URL(window.location.href)
        url.searchParams.set('q', searchInput.value)
        window.location.href = `${url.href}`
    })
}
