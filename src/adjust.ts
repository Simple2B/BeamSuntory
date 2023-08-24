// search flow
const searchAdjustInput: HTMLInputElement = document.querySelector('#table-search-adjust')
const searchAdjustInputButton = document.querySelector('#table-search-adjust-button')
if (searchAssignInputButton && searchAssignInput) {
    searchAssignInputButton.addEventListener('click', () => {
        const url = new URL(window.location.href)
        url.searchParams.set('q', searchAssignInput.value)
        window.location.href = `${url.href}`
    })
}
