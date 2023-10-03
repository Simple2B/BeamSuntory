import { Modal } from 'flowbite'
import type { ModalOptions, ModalInterface } from 'flowbite'

interface IPagination {
    pages: number
}

interface IProduct {
    name: string
    SKU: string
}

interface IEvents {
    id: number
    product: IProduct
    dateFrom: string
    dateTo: string
    comment: string
    user: IUser
}

interface IUser {
    username: string
}

interface IEventsResponse {
    pagination: IPagination
    events: IEvents[]
}


const formatDate = (date: string) => {
    const createAt = new Date(date);
    const year = createAt.getFullYear();
    const month = String(createAt.getMonth() + 1).padStart(2, '0');
    const day = String(createAt.getDate()).padStart(2, '0');
    return `${month}/${day}/${year}`;
  }

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
clearDateSearchButton.addEventListener('click', clearSearchDateInput)

const downloadCSV = async function () {
    // Filters
    const searchEventInput: HTMLInputElement = document.querySelector('#table-search-event')
    const dateEventStartFromInput: HTMLInputElement = document.querySelector(
        '#product-event-sort-start-from-datepicker'
    )
    const dateEventStartToInput: HTMLInputElement = document.querySelector('#product-event-sort-start-to-datepicker')
    const dateEventEndFromInput: HTMLInputElement = document.querySelector('#product-event-sort-end-from-datepicker')
    const dateEventEndToInput: HTMLInputElement = document.querySelector('#product-event-sort-end-to-datepicker')

    const filtersMap = {
        q: searchEventInput,
        start_from: dateEventStartFromInput,
        start_to: dateEventStartToInput,
        end_from: dateEventEndFromInput,
        end_to: dateEventEndToInput,
    }

    const filterQuery = []
    for (const [queryKey, queryInput] of Object.entries(filtersMap)) {
        filterQuery.push(`${queryKey}=${queryInput.value}`)
    }

    // CSV Headers
    const csvData = ['id,product_name,sku,username,date_start,date_end,comment',]
    let pages = 1
    const queryTail = filterQuery.join('&')

    for (let page = 1; page <= pages; page++) {
        const url = [`api?page={page}`, queryTail].join('&')
        const res = await fetch(url)
        const data: IEventsResponse = await res.json()
        console.log(data.events)

        data.events.forEach((event) => {
            csvData.push(
                [
                    event.id,
                    event.product.name,
                    event.product.SKU,
                    event.user.username,
                    event.dateFrom,
                    event.dateTo,
                    event.comment,
                ].join(',')
            )
        })
        pages = data.pagination.pages
    }

    const blob = new Blob([csvData.join('\n')], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('download', 'events.csv')
    a.click()
    a.remove()
}

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

    const buttonDownloadCSV = document.getElementById('button-csv-download')
    buttonDownloadCSV.addEventListener('click', downloadCSV);
})

// edit modal
const modalEditOptions: ModalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {},
    onShow: () => {},
    onToggle: () => {
      console.log('modal has been toggled')
    },
  }

const $modalEditElement: HTMLElement = document.querySelector('#event-edit-modal');
const editModal: ModalInterface = new Modal($modalEditElement, modalEditOptions);

const editModalCloseButton = document.querySelector('#edit-event-modal-close-btn')
editModalCloseButton.addEventListener('click', () => {
    editModal.hide();
});

const editModalButtons = document.querySelectorAll('#event-edit-button');
editModalButtons.forEach((e) =>
  e.addEventListener('click', () => {
    const eventData = JSON.parse(e.getAttribute('data-target'));
    const reservedDaysAmountBefore = document.querySelector('#event-edit-reserve-date-to-before');
    const eventId = document.querySelector('#event-edit-id') as HTMLInputElement;
    reservedDaysAmountBefore.innerHTML = formatDate(eventData.dateReserveTo);
    eventId.value = eventData.id;

    editModal.show();
  })
)
