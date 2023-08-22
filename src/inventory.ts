// search flow
const searchInput: HTMLInputElement = document.querySelector('#table-search-inventory')
const searchInputButton = document.querySelector('#table-search-inventory-button')
if (searchAssignInputButton && searchAssignInput) {
    searchAssignInputButton.addEventListener('click', () => {
        const url = new URL(window.location.href)
        url.searchParams.set('q', searchAssignInput.value)
        window.location.href = `${url.href}`
    })
}
