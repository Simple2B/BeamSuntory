import { Modal } from 'flowbite'
import type { ModalOptions, ModalInterface } from 'flowbite'
import { IRequestShare } from './types'
// /*
//  * $editRequestShareModal: required
//  * options: optional
//  */

// TODO need refactoring
interface IRequestShareDepricated extends IRequestShare {
    id: number
    desire_quantity: number
    status: string;
}

// search flow
const searchShareInput: HTMLInputElement = document.querySelector('#table-search-request-share')
const searchShareInputButton = document.querySelector('#table-search-request-share-button')
const searchByStatusSelector = document.getElementById('filter-by-status-request-share') as HTMLSelectElement
searchShareInputButton.addEventListener('click', () => {
    const url = new URL(window.location.href)
    url.searchParams.set('q', searchShareInput.value)
    url.searchParams.set('status', searchByStatusSelector.value)
    window.location.href = `${url.href}`
})

const shareButtons = document.querySelectorAll('.request-share-share-button')

shareButtons.forEach((e) => {
    e.addEventListener('click', async () => {
        if (confirm('Are sure?')) {
            let id = e.getAttribute('data-request-share-id')
            const response = await fetch(`/request_share/share/${id}`, {
                method: 'GET',
            })
            if ([200, 404].includes(response.status) ) {
                location.reload()
            }
        }
    })
})

const removeButtons = document.querySelectorAll('.delete-request-share-btn')

removeButtons.forEach((e) => {
    e.addEventListener('click', async () => {
        if (confirm('Are sure?')) {
            let id = e.getAttribute('data-request-share-id')
            const response = await fetch(`/request_share/delete/${id}`, {
                method: 'GET',
            })
            if (response.status == 200) {
                location.reload()
            }
        }
    })
})

const declineButtons = document.querySelectorAll('.decline-request-share-btn')

declineButtons.forEach((e) => {
    e.addEventListener('click', async () => {
        if (confirm('Are sure?')) {
            let id = e.getAttribute('data-request-share-id')
            const response = await fetch(`/request_share/decline/${id}`, {
                method: 'GET',
            })
            if (response.status == 200) {
                location.reload()
            }
        }
    })
})

const $buttonEditElements = document.querySelectorAll('.request-share-edit-button')

const modalEditOptions: ModalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
        console.log('modal is hidden')
    },
    onShow: () => {
        console.log('request_share id: ')
    },
    onToggle: () => {
        console.log('modal has been toggled')
    },
}

$buttonEditElements.forEach((e) =>
    e.addEventListener('click', () => {
        editShareRequest(JSON.parse(e.getAttribute('data-target')))
    })
)

const $modalEditElement: HTMLElement = document.querySelector('#editRequestShareModal')

const editModal: ModalInterface = new Modal($modalEditElement, modalEditOptions)

function editShareRequest(requestShare: IRequestShareDepricated) {
    let input: HTMLInputElement = document.querySelector('#request-share-edit-quantity')
    input.value = requestShare.desire_quantity.toString()
    input = document.querySelector('#request-share-edit-id')
    input.value = requestShare.id.toString()

    let div: HTMLDivElement = document.querySelector('#request-share-edit-status')
    div.innerHTML = requestShare.status
    div = document.querySelector('#request-share-edit-group')
    div.innerHTML = requestShare.group.name
    div = document.querySelector('#request-share-edit-product')
    div.innerHTML = requestShare.product.name

    input = document.querySelector('#request-share-edit-next_url')
    input.value = window.location.href
    editModal.show()
}
