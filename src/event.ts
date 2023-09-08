function getFilterValues() {
    const url = new URL(window.location.href)
    const searchEventInput: HTMLInputElement = document.querySelector('#table-search-event')
    const dateEventStartFromInput: HTMLInputElement = document.querySelector(
        '#product-event-sort-start-from-datepicker'
    )
    const dateEventStartToInput: HTMLInputElement = document.querySelector('#product-event-sort-start-to-datepicker')
    const dateEventEndFromInput: HTMLInputElement = document.querySelector('#product-event-sort-end-from-datepicker')
    const dateEventEndToInput: HTMLInputElement = document.querySelector('#product-event-sort-end-to-datepicker')

    url.searchParams.set('q', searchEventInput.value)

    url.searchParams.set('start_from', dateEventStartFromInput.value)

    url.searchParams.set('start_to', dateEventStartToInput.value)

    url.searchParams.set('end_from', dateEventEndFromInput.value)

    url.searchParams.set('end_to', dateEventEndToInput.value)
    window.location.href = `${url.href}`

    console.log(url.href)
}

function setFilterValues() {
    const searchEventInput: HTMLInputElement = document.querySelector('#table-search-event')
    const dateEventStartFromInput: HTMLInputElement = document.querySelector(
        '#product-event-sort-start-from-datepicker'
    )
    const dateEventStartToInput: HTMLInputElement = document.querySelector('#product-event-sort-start-to-datepicker')
    const dateEventEndFromInput: HTMLInputElement = document.querySelector('#product-event-sort-end-from-datepicker')
    const dateEventEndToInput: HTMLInputElement = document.querySelector('#product-event-sort-end-to-datepicker')
    const url = new URL(window.location.href)
    url.searchParams.get('q')
    const q = url.searchParams.get('q')
    if (q) {
        console.log(q)
        searchEventInput.value = q
    }
}

// clear datepicker search inputs
function clearSearchDateInput() {
    const datepickerEventInputs = document.querySelectorAll('.product-event-sort-datepicker')
    datepickerEventInputs.forEach((datepicker: HTMLInputElement) => {
        datepicker.value = ''
        getFilterValues()
    })
}

const clearDateSearchButton = document.querySelector('#product-event-clear-button')
clearDateSearchButton.addEventListener('click', () => {
    console.log('clear date search button clicked')

    clearSearchDateInput()
})

// search flow
document.addEventListener('DOMContentLoaded', () => {
    const searchEventInput: HTMLInputElement = document.querySelector('#table-search-event')
    const searchEventInputButton = document.querySelector('#table-search-event-button')

    if (searchEventInputButton && searchEventInput) {
        searchEventInputButton.addEventListener('click', () => {
            getFilterValues()
        })
    }

    const datepickerEventInputs = document.querySelectorAll('.product-event-sort-datepicker')
    datepickerEventInputs.forEach((datepicker) => {
        datepicker.addEventListener('changeDate', (e) => {
            getFilterValues()
        })
    })
})
