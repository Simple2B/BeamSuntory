// search flow
const searchAssignInput: HTMLInputElement = document.querySelector('#table-search-assign')
const searchAssignInputButton = document.querySelector('#table-search-assign-button')
if (searchAssignInputButton && searchAssignInput) {
    searchAssignInputButton.addEventListener('click', () => {
        const url = new URL(window.location.href)
        url.searchParams.set('q', searchAssignInput.value)
        window.location.href = `${url.href}`
    })
}
