import { Modal } from 'flowbite'
import type { ModalOptions, ModalInterface } from 'flowbite'

interface IAdjust {
    id: number
    note: string
    product_id: number
    product: IProduct
    groups_qty: IGroupQty[]
}

interface IProduct {
    name: string
    image: string
    SKU: string
}

interface IGroupQty {
    group: string
    warehouse: string
    quantity: number
}

const defaultBrandImage =
    'https://funko.com/on/demandware.static/-/Sites-funko-master-catalog/default/dwbb38a111/images/funko/upload/55998_CocaCola_S2_SpriteBottleCap_POP_GLAM-WEB.png'

// adjust modals
const $viewAdjustModalElement: HTMLElement = document.querySelector('#view-adjust-modal')

const modalOptions: ModalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
        const GroupQtyContainer = document.querySelector('#adjust-view-group-quantity-container')
        GroupQtyContainer.innerHTML = ''
    },
    onShow: () => {},
    onToggle: () => {
        console.log('modal has been toggled')
    },
}
const viewModal: ModalInterface = new Modal($viewAdjustModalElement, modalOptions)

const $viewButtonElements = document.querySelectorAll('.adjust-view-button')
$viewButtonElements.forEach((e) =>
    e.addEventListener('click', () => {
        viewAdjust(JSON.parse(e.getAttribute('data-target')))
    })
)

// ----view adjust modal-----
function viewAdjust(adjust: IAdjust) {
    let div: HTMLDivElement = document.querySelector('#adjust-view-product-name')
    div.innerHTML = adjust.product.name
    div = document.querySelector('#adjust-view-product-SKU')
    div.innerHTML = adjust.product.SKU
    div = document.querySelector('#adjust-view-comment')
    div.innerHTML = adjust.note || 'No comment'
    const img: HTMLImageElement = document.querySelector('#adjust-view-product-image')
    const fullImageAnchor = img.closest('.product-full-image-anchor')
    fullImageAnchor.setAttribute('data-target-product-id', adjust.product_id.toString())
    adjust.product.image.length > 100
        ? (img.src = `data:image/png;base64, ${adjust.product.image}`)
        : (img.src = defaultBrandImage)

    for (let i = 0; i < adjust.groups_qty.length; i++) {
        createGroupQtyItem(adjust.groups_qty[i])
    }
    viewModal.show()
}

// ----create group qty item-----
function createGroupQtyItem(groupQty: IGroupQty) {
    const GroupQtyContainer = document.querySelector('#adjust-view-group-quantity-container')
    const groupQtyItem = document.createElement('div')
    groupQtyItem.classList.add('grid', 'grid-cols-6', 'gap-6', 'mb-4')
    groupQtyItem.innerHTML = `
        <div class="col-span-6 sm:col-span-2">
            <label for="group" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group Name</label>
            <div
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                ${groupQty.group}
            </div>
            </div>
            <div class="col-span-6 sm:col-span-2">
            <label for="group"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Warehouse</label>
            <div
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                ${groupQty.warehouse}
            </div>
            </div>
            <div class="col-span-6 sm:col-span-2">
            <label for="group" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
            <div
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                ${groupQty.quantity}
            </div>
        </div>
    `
    GroupQtyContainer.appendChild(groupQtyItem)
}

// search flow
const searchAdjustInput: HTMLInputElement = document.querySelector('#table-search-adjust')
const searchAdjustInputButton = document.querySelector('#table-search-adjust-button')
if (searchAdjustInputButton && searchAdjustInput) {
    searchAdjustInputButton.addEventListener('click', () => {
        const url = new URL(window.location.href)
        url.searchParams.set('q', searchAdjustInput.value)
        window.location.href = `${url.href}`
    })
}
