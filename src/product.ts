import { Modal } from 'flowbite'
import type { ModalOptions, ModalInterface } from 'flowbite'
import Datepicker from 'flowbite-datepicker/Datepicker'
import { easepick } from '@easepick/bundle'

interface IProduct {
    id: number
    name: string
    supplier_id: number
    currency: string
    regular_price: number
    retail_price: number
    image: string
    description: string
    // General Info ->
    SKU: string
    low_stock_level: number
    program_year: number
    package_qty: number
    numb_of_items_per_case: number
    numb_of_cases_per_outer_case: number
    comments: string
    // shipping
    weight: number
    length: number
    width: number
    height: number
    mstr_groups_groups: object
    current_user_groups: object
    groups_ids: {
        [index: string]: number
    }
    available_quantity: {
        [index: string]: number
    }
    total_available_items: {
        [index: string]: number
    }
    all_warehouses: [
        {
            [index: string]: number | string
        }
    ]
    mstr_prod_grps_prod_grps_names: { [index: string]: { group_name: string; group_id: number }[] }
    mstr_grps_grps_names_in_prod: { [index: string]: { group_name: string; group_id: number }[] }
    warehouse_product_qty: number
    product_in_warehouses: { [index: string]: { [index: string]: number } }
}
interface FilterJsonData {
    [key: string]: string
}

interface IProductMasterGroupGroup {
    [index: string]: { group_name: string; group_id: number }[]
}

interface IMasterGroup {
    name: string
    master_groups_list_groups: { [index: string]: { group_name: string; group_id: number }[] }
}

const eventMasterGroup = 'Events'

// variable to set default image to brand dynamically in modal window. Can we get link from the internet?
const defaultBrandImage =
    'https://funko.com/on/demandware.static/-/Sites-funko-master-catalog/default/dwbb38a111/images/funko/upload/55998_CocaCola_S2_SpriteBottleCap_POP_GLAM-WEB.png'

// check if product has filter and display it
let filterJsonData: FilterJsonData = {}
const filterJsonObject = sessionStorage.getItem('filterJsonData')
const filterData = JSON.parse(filterJsonObject)
if (filterData !== null || filterData !== undefined) {
    const isVisibleFilterJson = sessionStorage.getItem('isVisibleFilter')
    let isVisibleFilter = JSON.parse(isVisibleFilterJson)
    if (isVisibleFilter) {
        const referenceTh = document.querySelector('#product-table-th-product-type')
        const productItemTrs = document.querySelectorAll('.table-product-item-tr')

        for (const key in filterData) {
            const productFilterTh = document.createElement('th')
            productFilterTh.setAttribute('id', `product-table-filter-master-group-${key.replace(/ /g, '_')}`)
            productFilterTh.classList.add('px-6', 'py-3', 'max-width-100')
            productFilterTh.setAttribute('scope', 'col')
            productFilterTh.innerHTML = key
            referenceTh.parentNode.insertBefore(productFilterTh, referenceTh.nextSibling)
        }

        productItemTrs.forEach((product: HTMLTableRowElement) => {
            const referenceTd = product.cells[4]
            const productSKU = product.cells[3].innerText

            for (const key in filterData) {
                const productFilterName = filterData[key]
                const productFilterTd = document.createElement('td')
                productFilterTd.setAttribute(
                    'id',
                    `product-table-filter-${key}-${productFilterName.replace(/ /g, '_')}-${productSKU.replace(
                        / /g,
                        '_'
                    )}`
                )
                productFilterTd.classList.add(
                    'p-4',
                    'text-base',
                    'font-normal',
                    'text-gray-900',
                    'whitespace-nowrap',
                    'dark:text-white',
                    'max-width-100'
                )
                productFilterTd.innerHTML = `
        <div class="pl-3">
          <div class="text-sm">${productFilterName}</div>
        </div>
      `
                referenceTd.parentNode.insertBefore(productFilterTd, referenceTd.nextSibling)
            }
        })
        isVisibleFilter = false
        sessionStorage.setItem('isVisibleFilter', JSON.stringify(isVisibleFilter))
    }
}

//function to display filter by master group on load page
const globalFilterMasterGroup = JSON.parse(sessionStorage.getItem('globalFilterMasterGroup'))
const productMgGGlobal = JSON.parse(sessionStorage.getItem('productMgG'))

if (globalFilterMasterGroup && globalFilterMasterGroup.length !== 0) {
    const filterProductMasterGroupCheckboxes = document.querySelectorAll(
        '.products-filter-product-master-group-checkbox'
    )
    filterProductMasterGroupCheckboxes.forEach((checkbox: HTMLInputElement) => {
        if (globalFilterMasterGroup.includes(checkbox.value)) {
            checkbox.checked = true
        }
    })
    for (const masterGroupName of globalFilterMasterGroup) {
        const referenceTh = document.querySelector('#product-table-th-product-type')
        const isGroupExist = document.querySelector(`#product-table-filter-master-group-${masterGroupName}`)
        if (!isGroupExist) {
            const productFilterTh = document.createElement('th')
            productFilterTh.setAttribute('id', `product-table-filter-master-group-${masterGroupName}`)
            const productItemTrs = document.querySelectorAll('.table-product-item-tr')
            productFilterTh.classList.add('px-6', 'py-3', 'max-width-100')
            productFilterTh.setAttribute('scope', 'col')
            productFilterTh.innerHTML = masterGroupName.replace(/_/g, ' ')
            referenceTh.parentNode.insertBefore(productFilterTh, referenceTh.nextSibling)

            productItemTrs.forEach((productItem: HTMLTableRowElement) => {
                const referenceTd = productItem.cells[4]
                const productSKU = productItem.cells[3].innerText.replace("'", '')

                const productFilterName = productMgGGlobal[productSKU][masterGroupName] || '-'
                const productFilterTd = document.createElement('td')
                productFilterTd.setAttribute(
                    'id',
                    `product-table-filter-${masterGroupName}-${productFilterName.replace(
                        / /g,
                        '_'
                    )}-${productSKU.replace(/ /g, '_')}`
                )
                productFilterTd.classList.add(
                    'p-4',
                    'text-base',
                    'font-normal',
                    'text-gray-900',
                    'whitespace-nowrap',
                    'dark:text-white',
                    'max-width-100'
                )
                productFilterTd.innerHTML = `
            <div class="pl-3">
              <div class="text-sm">${productFilterName}</div>
            </div>
          `
                referenceTd.parentNode.insertBefore(productFilterTd, referenceTd.nextSibling)
            })
        }
    }
}

// function to display product master group in product table
const checkboxFilterProductMasterGroups = document.querySelectorAll('.products-filter-product-master-group-checkbox')
checkboxFilterProductMasterGroups.forEach((checkbox) => {
    checkbox.addEventListener('change', (e) => {
        const masterGroupName = checkbox.getAttribute('data-target-group-name')
        const productMgG = JSON.parse(checkbox.getAttribute('data-target-product-mg-g'))
        const referenceTh = document.querySelector('#product-table-th-product-type')
        const productItemTrs = document.querySelectorAll('.table-product-item-tr')

        let isActive = (e.target as HTMLInputElement).checked
        const globalFilterMasterGroup = JSON.parse(sessionStorage.getItem('globalFilterMasterGroup'))

        if (isActive) {
            const filterMasterGroup: string[] = []
            filterMasterGroup.push(masterGroupName)
            if (globalFilterMasterGroup) {
                globalFilterMasterGroup.forEach((element: string) => {
                    if (!filterMasterGroup.includes(element)) {
                        filterMasterGroup.push(element)
                    }
                })
            }
            sessionStorage.setItem('globalFilterMasterGroup', JSON.stringify(filterMasterGroup))
            const isGroupExist = document.querySelector(`#product-table-filter-master-group-${masterGroupName}`)
            if (!isGroupExist) {
                const productFilterTh = document.createElement('th')
                productFilterTh.setAttribute('id', `product-table-filter-master-group-${masterGroupName}`)
                productFilterTh.classList.add('px-6', 'py-3', 'max-width-100')
                productFilterTh.setAttribute('scope', 'col')
                productFilterTh.innerHTML = masterGroupName.replace(/_/g, ' ')
                referenceTh.parentNode.insertBefore(productFilterTh, referenceTh.nextSibling)
                productItemTrs.forEach((productItem: HTMLTableRowElement) => {
                    const referenceTd = productItem.cells[4]
                    const productSKU = productItem.cells[3].innerText

                    const productFilterName = productMgG[productSKU][masterGroupName] || '-'
                    const productFilterTd = document.createElement('td')
                    productFilterTd.setAttribute(
                        'id',
                        `product-table-filter-${masterGroupName}-${productFilterName.replace(
                            / /g,
                            '_'
                        )}-${productSKU.replace(/ /g, '_')}`
                    )
                    productFilterTd.classList.add(
                        'p-4',
                        'text-base',
                        'font-normal',
                        'text-gray-900',
                        'whitespace-nowrap',
                        'dark:text-white',
                        'max-width-100'
                    )
                    productFilterTd.innerHTML = `
            <div class="pl-3">
              <div class="text-sm">${productFilterName}</div>
            </div>
          `
                    referenceTd.parentNode.insertBefore(productFilterTd, referenceTd.nextSibling)
                })
            }
        }
        if (!isActive) {
            const index = globalFilterMasterGroup.indexOf(masterGroupName)
            if (index !== -1) {
                globalFilterMasterGroup.splice(index, 1)
            }
            sessionStorage.setItem('globalFilterMasterGroup', JSON.stringify(globalFilterMasterGroup))
            const isMasterGroupExist = document.querySelector(`#product-table-filter-master-group-${masterGroupName}`)
            if (isMasterGroupExist) {
                isMasterGroupExist.remove()
                productItemTrs.forEach((productItem: HTMLTableRowElement) => {
                    const productSKU = productItem.cells[3].innerText
                    const productFilterName = productMgG[productSKU][masterGroupName] || '-'
                    const isProductFilterExist = document.querySelector(
                        `#product-table-filter-${masterGroupName}-${productFilterName.replace(
                            / /g,
                            '_'
                        )}-${productSKU.replace(/ /g, '_')}`
                    )
                    if (isProductFilterExist) {
                        isProductFilterExist.remove()
                    }
                })
            }
        }
    })
})

const $requestShareModalElement: HTMLElement = document.querySelector('#request-share-product-modal')
const $shipModalElement: HTMLElement = document.querySelector('#ship-product-modal')
const $assignModalElement: HTMLElement = document.querySelector('#assign-product-modal')
const $addProductModalElement: HTMLElement = document.querySelector('#add-product-modal')
const $viewProductModalElement: HTMLElement = document.querySelector('#view-product-modal')
const $adjustProductModalElement: HTMLElement = document.querySelector('#adjust-product-modal')
const $editProductModalElement: HTMLElement = document.querySelector('#editProductModal')
const $eventProductModalElement: HTMLElement = document.querySelector('#event-product-modal')

const modalOptions: ModalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
        const product = JSON.parse(sessionStorage.product)
        const mstrGroupsEntries = Object.entries(product.mstr_groups_groups)

        mstrGroupsEntries.forEach(([key, value]: [string, string]) => {
            deleteShipAssignButton(value.replace(/\s/g, '_'), key)
        })
        clearProductGroupContainer()
    },
    onShow: () => {},
    onToggle: () => {
        console.log('modal has been toggled')
    },
}

const adjustModalOptions: ModalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
        const product = JSON.parse(sessionStorage.product)
        const mstrGroupsEntries = Object.entries(product.mstr_groups_groups)

        mstrGroupsEntries.forEach(([key, value]: [string, string]) => {
            deleteAdjustContainer(value.replace(/\s/g, '_'), key)
        })
        sessionStorage.removeItem('productInWarehouses')
    },
    onShow: () => {},
    onToggle: () => {
        console.log('modal has been toggled')
    },
}

const modalShipAssignOptions: ModalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
        sessionStorage.removeItem('product')
    },
    onShow: () => {},
    onToggle: () => {
        console.log('modal has been toggled')
    },
}

const modalEventOptions: ModalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-51',
    closable: true,
    onHide: () => {
        sessionStorage.removeItem('product')
    },
    onShow: () => {},
    onToggle: () => {
        console.log('modal has been toggled')
    },
}

const eventModalOptions: ModalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-51',
    closable: true,
    onHide: () => {
        const product = JSON.parse(sessionStorage.product)
        const mstrGroupsEntries = Object.entries(product.mstr_groups_groups)

        mstrGroupsEntries.forEach(([key, value]: [string, string]) => {
            deleteShipAssignButton(value.replace(/\s/g, '_'), key)
        })
        clearProductGroupContainer()
        picker.destroy()
    },
    onShow: () => {
        console.log('modal has been shown')
    },
    onToggle: () => {
        console.log('modal has been toggled')
    },
}

const addModal: ModalInterface = new Modal($addProductModalElement, modalOptions)
const viewModal: ModalInterface = new Modal($viewProductModalElement, modalOptions)
const adjustModal: ModalInterface = new Modal($adjustProductModalElement, adjustModalOptions)
const editModal: ModalInterface = new Modal($editProductModalElement, modalOptions)
const requestShareModal: ModalInterface = new Modal($requestShareModalElement, modalShipAssignOptions)
const shipModal: ModalInterface = new Modal($shipModalElement, modalShipAssignOptions)
const assignModal: ModalInterface = new Modal($assignModalElement, modalShipAssignOptions)
const eventModal: ModalInterface = new Modal($eventProductModalElement, eventModalOptions)

const closingAddModalButton = document.getElementById('add-product-modal-close-btn')
closingAddModalButton.addEventListener('click', () => {
    addModal.hide()
})
const closingAdjustModalButton = document.getElementById('adjust-product-modal-close-btn')
closingAdjustModalButton.addEventListener('click', () => {
    adjustModal.hide()
})
const closingEditModalButton = document.getElementById('edit-product-modal-close-btn')
closingEditModalButton.addEventListener('click', () => {
    editModal.hide()
})
const closingViewModalButton = document.getElementById('view-product-modal-close-btn')
closingViewModalButton.addEventListener('click', () => {
    viewModal.hide()
})
const closingEventModalButton = document.getElementById('event-product-modal-close-btn')
closingEventModalButton.addEventListener('click', () => {
    eventModal.hide()
})

const $buttonElements = document.querySelectorAll('.product-edit-button')
$buttonElements.forEach((e) =>
    e.addEventListener('click', () => {
        editProduct(JSON.parse(e.getAttribute('data-target')))
    })
)

const $addButtonElements = document.querySelectorAll('.product-add-button')
$addButtonElements.forEach((e) =>
    e.addEventListener('click', () => {
        const groups = JSON.parse(e.getAttribute('data-target-groups'))
        sessionStorage.setItem('groups', JSON.stringify(groups))
        addProduct(groups)
    })
)

// pick date range
const { DateTime } = easepick
function formatDate(date: Date): string {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString()
    const day = date.getDate().toString()
    return `${year}-${month}-${day}`
}

function getFirstAndLastDate() {
    const today = new Date()
    const fifthDayBefore = new Date(today)
    fifthDayBefore.setDate(today.getDate() - 5)
    const fifthDayAfter = new Date(today)
    fifthDayAfter.setDate(today.getDate() + 6)
    return [formatDate(fifthDayBefore), formatDate(fifthDayAfter)]
}

const bookedDates = [getFirstAndLastDate()].map((d) => {
    if (d instanceof Array) {
        const start = new Date(d[0])
        const end = new Date(d[1])
        return [start, end]
    }
    return new DateTime(d, 'YYYY-MM-DD')
})

let fetchedAmountByDate = [] as { date: string; quantity: number }[]

async function getEventAvailableQuantity(product_id: number, group: string, month: number, year: number) {
    const response = await fetch(
        `/event/get_available_quantity?month_from=${
            month + 1
        }&year_from=${year}&group_name=${group}&product_id=${product_id}`
    )
    const data = await response.json()
    fetchedAmountByDate = data

    return data
}

// search flow
const searchInput: HTMLInputElement = document.querySelector('#table-search-products')
const searchInputButton = document.querySelector('#table-search-product-button')
if (searchInputButton && searchInput) {
    searchInputButton.addEventListener('click', () => {
        const url = new URL(window.location.href)
        url.searchParams.set('q', searchInput.value)
        window.location.href = `${url.href}`
    })
}
const deleteButtons = document.querySelectorAll('.delete-product-btn')

deleteButtons.forEach((e) => {
    e.addEventListener('click', async () => {
        if (confirm('Are sure?')) {
            let id = e.getAttribute('data-product-id')
            const response = await fetch(`/product/delete/${id}`, {
                method: 'DELETE',
            })
            if (response.status == 200) {
                location.reload()
            }
        }
    })
})

function addProduct(groups: IProductMasterGroupGroup) {
    addModal.show()
    const productMasterGroupAddSelect: HTMLSelectElement = document.querySelector(
        '#product-master-group-add-add-product-1'
    )
    const options = productMasterGroupAddSelect.querySelectorAll('option')

    productMasterGroupAddSelect.addEventListener('change', () => {
        options.forEach((e) => {
            if (e.textContent === productMasterGroupAddSelect.options[productMasterGroupAddSelect.selectedIndex].text) {
                const groupSelect = document.querySelector('#product-group-add-item-1')
                const optionCategory =
                    groups[productMasterGroupAddSelect.options[productMasterGroupAddSelect.selectedIndex].text]

                groupSelect.innerHTML = ''
                if (optionCategory) {
                    optionCategory.forEach((group: { group_name: string; group_id: number }) => {
                        const storeSelectOption = document.createElement('option')
                        storeSelectOption.setAttribute('value', group.group_id.toString())
                        storeSelectOption.textContent = group.group_name
                        groupSelect.appendChild(storeSelectOption)
                    })
                }
            }
        })
    })
}

function editProduct(product: IProduct) {
    sessionStorage.setItem('product', JSON.stringify(product))

    const img: HTMLImageElement = document.querySelector('#product-edit-show-image')
    const fullImageAnchor = img.closest('.product-full-image-anchor')
    fullImageAnchor.setAttribute('data-target-product-id', product.id.toString())
    product.image.length > 100 ? (img.src = `data:image/png;base64, ${product.image}`) : (img.src = defaultBrandImage)
    let input: HTMLInputElement = document.querySelector('#product-edit-name')
    input.value = product.name
    input = document.querySelector('#product-edit-id')
    input.value = product.id.toString()
    // a loop that adds additional fields
    input = document.querySelector('#product-edit-currency')
    product.currency ? (input.value = product.currency) : (input.value = 'Choose Currency')
    input = document.querySelector('#product-edit-regular_price')
    input.value = product.regular_price?.toString() ?? '0'
    input = document.querySelector('#product-edit-retail_price')
    input.value = product.retail_price?.toString() ?? '0'
    input = document.querySelector('#product-edit-description')
    input.value = product.description
    // General Info ->
    input = document.querySelector('#product-edit-SKU')
    input.value = product.SKU
    input = document.querySelector('#product-edit-low_stock_level')
    product.low_stock_level ? (input.value = product.low_stock_level.toString()) : (input.value = '0')

    input = document.querySelector('#product-edit-program_year')
    product.program_year ? (input.value = product.program_year.toString()) : (input.value = '0')
    input = document.querySelector('#product-edit-package_qty')
    product.package_qty ? (input.value = product.package_qty.toString()) : (input.value = '0')
    input = document.querySelector('#product-edit-numb_of_items_per_case')
    product.numb_of_items_per_case ? (input.value = product.numb_of_items_per_case.toString()) : (input.value = '0')
    input = document.querySelector('#product-edit-numb_of_cases_per_outer_case')
    product.numb_of_cases_per_outer_case
        ? (input.value = product.numb_of_cases_per_outer_case.toString())
        : (input.value = '0')
    input = document.querySelector('#product-edit-comments')
    product.comments ? (input.value = product.comments) : (input.value = 'No comments')
    // shipping
    input = document.querySelector('#product-edit-weight')
    product.weight ? (input.value = product.weight.toString()) : (input.value = '0')
    input = document.querySelector('#product-edit-length')
    product.length ? (input.value = product.length.toString()) : (input.value = '0')
    input = document.querySelector('#product-edit-width')
    product.width ? (input.value = product.width.toString()) : (input.value = '0')
    input = document.querySelector('#product-edit-height')
    product.height ? (input.value = product.height.toString()) : (input.value = '0')
    input = document.querySelector('#product-edit-next_url')
    input.value = window.location.href

    const productMasterGroupEditSelect: HTMLSelectElement = document.querySelector(
        '#product-master-group-edit-add-product-1'
    )
    const options = productMasterGroupEditSelect.querySelectorAll('option')
    const productMasterGroups = Object.keys(product.mstr_grps_grps_names_in_prod)

    if (productMasterGroups.length > 0) {
        const productGroupsEditSelects = document.querySelectorAll<HTMLSelectElement>('.product-group-edit-item')

        for (let i = 0; i < productMasterGroups.length; i++) {
            if (i === 0) {
                const productGroupsEditSelect = productGroupsEditSelects[i]

                productMasterGroupEditSelect.value = productMasterGroups[i]

                product.mstr_prod_grps_prod_grps_names[productMasterGroups[i]].forEach(
                    (group: { group_name: string; group_id: number }) => {
                        const storeSelectOption = document.createElement('option')
                        storeSelectOption.setAttribute('value', group.group_id.toString())
                        storeSelectOption.textContent = group.group_name
                        productGroupsEditSelect.appendChild(storeSelectOption)
                    }
                )
                // TODO: always select first option
                productGroupsEditSelect.value =
                    product.mstr_grps_grps_names_in_prod[productMasterGroups[i]][0].group_id.toString()
                productMasterGroupEditSelect.addEventListener('change', () => {
                    options.forEach((e) => {
                        if (
                            e.textContent ===
                            productMasterGroupEditSelect.options[productMasterGroupEditSelect.selectedIndex].text
                        ) {
                            const groupSelect = document.querySelector('#product-group-edit-item-1')
                            const optionCategory =
                                product.mstr_prod_grps_prod_grps_names[
                                    productMasterGroupEditSelect.options[productMasterGroupEditSelect.selectedIndex]
                                        .text
                                ]
                            groupSelect.innerHTML = ''
                            if (optionCategory) {
                                optionCategory.forEach((group: { group_name: string; group_id: number }) => {
                                    const storeSelectOption = document.createElement('option')
                                    storeSelectOption.setAttribute('value', group.group_id.toString())
                                    storeSelectOption.textContent = group.group_name
                                    groupSelect.appendChild(storeSelectOption)
                                })
                            }
                        }
                    })
                })

                if (product.mstr_grps_grps_names_in_prod[productMasterGroups[i]].length > 1) {
                    for (let j = 1; j < product.mstr_grps_grps_names_in_prod[productMasterGroups[i]].length; j++) {
                        createProductGroupEditItem(null, productMasterGroups[i], j)
                    }
                    continue
                } else {
                    continue
                }
            }

            if (product.mstr_grps_grps_names_in_prod[productMasterGroups[i]].length > 0) {
                for (let j = 0; j < product.mstr_grps_grps_names_in_prod[productMasterGroups[i]].length; j++) {
                    createProductGroupEditItem(null, productMasterGroups[i], j)
                }
            } else {
                createProductGroupEditItem(null, productMasterGroups[i])
            }
        }
    }

    editModal.show()

    productMasterGroupEditSelect.addEventListener('change', () => {
        options.forEach((e) => {
            if (
                e.textContent === productMasterGroupEditSelect.options[productMasterGroupEditSelect.selectedIndex].text
            ) {
                const groupSelect = document.querySelector('#product-group-edit-item-1')
                const optionCategory =
                    product.mstr_prod_grps_prod_grps_names[
                        productMasterGroupEditSelect.options[productMasterGroupEditSelect.selectedIndex].text
                    ]

                groupSelect.innerHTML = ''
                if (optionCategory) {
                    optionCategory.forEach((group: { group_name: string; group_id: number }) => {
                        const storeSelectOption = document.createElement('option')
                        storeSelectOption.setAttribute('value', group.group_id.toString())
                        storeSelectOption.textContent = group.group_name
                        groupSelect.appendChild(storeSelectOption)
                    })
                }
            }
        })
    })
}

const viewProductButtonElements = document.querySelectorAll('.product-view-button')
viewProductButtonElements.forEach((e) =>
    e.addEventListener('click', () => {
        const bookingButton = document.querySelector('.product-booking-button')
        if (bookingButton) {
            bookingButton.setAttribute('data-target', e.getAttribute('data-target'))
        }
        const product = JSON.parse(e.getAttribute('data-target'))
        sessionStorage.setItem('product', JSON.stringify(product))
        const prodGroups = Object.keys(product.mstr_groups_groups)
        const eventCheckbox: HTMLInputElement = document.querySelector('#product-show-events-toggle-btn')
        const isEvent = eventCheckbox.checked

        prodGroups.forEach((groupName) => {
            let isEqual = false

            const mstrGroupName = product.mstr_groups_groups[groupName]
            if (product.current_user_groups.hasOwnProperty(mstrGroupName)) {
                const currentUserValue = product.current_user_groups[mstrGroupName]
                if (currentUserValue.includes(groupName)) {
                    isEqual = true
                }
            }
            if (mstrGroupName !== eventMasterGroup || isEvent) {
                addShipAssignShareButton(isEqual, mstrGroupName, groupName, product)
            }
        })

        let div: HTMLDivElement = document.querySelector('#product-view-name')
        div.innerHTML = product.name
        div = document.querySelector('#product-view-id')
        div.innerHTML = product.id.toString()
        const img: HTMLImageElement = document.querySelector('#product-view-image')
        const fullImageAnchor = img.closest('.product-full-image-anchor')
        fullImageAnchor.setAttribute('data-target-product-id', product.id.toString())
        product.image.length > 100
            ? (img.src = `data:image/png;base64, ${product.image}`)
            : (img.src = defaultBrandImage)
        div = document.querySelector('#product-view-regular_price')
        div.innerHTML = product.regular_price?.toString() ?? '0'
        div = document.querySelector('#product-view-retail_price')
        div.innerHTML = product.retail_price?.toString() ?? '0'
        div = document.querySelector('#product-view-warehouse-qty')
        div.innerHTML = product.warehouse_product_qty.toString()
        // General Info ->
        div = document.querySelector('#product-view-SKU')
        div.innerHTML = product.SKU
        div = document.querySelector('#product-view-package_qty')
        product.package_qty ? (div.innerHTML = product.package_qty.toString()) : (div.innerHTML = '0')
        div = document.querySelector('#product-view-numb_of_items_per_case')
        product.numb_of_items_per_case
            ? (div.innerHTML = product.numb_of_items_per_case.toString())
            : (div.innerHTML = '0')
        div = document.querySelector('#product-view-numb_of_cases_per_outer_case')
        product.numb_of_cases_per_outer_case
            ? (div.innerHTML = product.numb_of_cases_per_outer_case.toString())
            : (div.innerHTML = '0')
        div = document.querySelector('#product-view-comments')
        product.comments ? (div.innerHTML = product.comments.toString()) : (div.innerHTML = 'No comments')
        div = document.querySelector('#product-view-next_url')
        div.innerHTML = window.location.href
        viewModal.show()
    })
)

const adjustProductButtonElements = document.querySelectorAll('.product-adjust-button')
adjustProductButtonElements.forEach((e) =>
    e.addEventListener('click', () => {
        const product = JSON.parse(e.getAttribute('data-target'))
        sessionStorage.setItem('product', JSON.stringify(product))
        const prodGroups = Object.keys(product.mstr_groups_groups)

        prodGroups.forEach((groupName) => {
            let isEqual = false

            const mstrGroupName = product.mstr_groups_groups[groupName]
            if (product.current_user_groups.hasOwnProperty(mstrGroupName)) {
                const currentUserValue = product.current_user_groups[mstrGroupName]
                if (currentUserValue.includes(groupName)) {
                    isEqual = true
                }
            }
            createAdjustAction(isEqual, mstrGroupName, groupName, product)
        })

        let div: HTMLDivElement = document.querySelector('#product-adjust-name')
        div.innerHTML = product.name
        div = document.querySelector('#product-adjust-id')
        div.innerHTML = product.id.toString()
        div = document.querySelector('#product-adjust-SKU')
        div.innerHTML = product.SKU
        const img: HTMLImageElement = document.querySelector('#product-adjust-image')
        const fullImageAnchor = img.closest('.product-full-image-anchor')
        fullImageAnchor.setAttribute('data-target-product-id', product.id.toString())
        product.image.length > 100
            ? (img.src = `data:image/png;base64, ${product.image}`)
            : (img.src = defaultBrandImage)
        div = document.querySelector('#product-adjust-next_url')
        div.innerHTML = window.location.href
        adjustModal.show()
    })
)

// function to request share
function requestShare(product: IProduct, group: string) {
    const img: HTMLImageElement = document.querySelector('#product-request-share-image')
    const fullImageAnchor = img.closest('.product-full-image-anchor')
    fullImageAnchor.setAttribute('data-target-product-id', product.id.toString())
    product.image.length > 100 ? (img.src = `data:image/png;base64, ${product.image}`) : (img.src = defaultBrandImage)
    let div: HTMLDivElement = document.querySelector('#product-request-share-name')
    div.innerHTML = product.name
    div = document.querySelector('#product-request-share-sku')
    div.innerHTML = product.SKU
    div = document.querySelector('#product-request-share-available-quantity')
    div.innerHTML = product.available_quantity[group.replace('_', ' ')].toString()
    div = document.querySelector('#product-request-share-owner')
    // TODO change to something not hardcoded here and in rest funcs
    div.innerHTML = 'Mike'
    div = document.querySelector('#product-request-share-role')
    div.innerHTML = 'ADMIN'
    div = document.querySelector('#product-request-share-total-available-items')
    div.innerHTML = product.total_available_items[group.replace('_', ' ')].toString()
    let input: HTMLInputElement = document.querySelector('#product-request-share-quantity')
    input.max = product.available_quantity[group.replace('_', ' ')].toString()
    input.min = '1'
    input = document.querySelector('#product-request-share-name-hidden-input')
    input.value = product.name
    input = document.querySelector('#product-request-share-SKU-hidden-input')
    input.value = product.SKU
    input = document.querySelector('#product-request-share-available-quantity-hidden-input')
    input.value = product.available_quantity[group.replace('_', ' ')].toString()
    input = document.querySelector('#product-request-share-from-group')
    input.value = group.replace('_', ' ')
    requestShareModal.show()
}

// function to ship
function ship(product: IProduct, group: string) {
    const img: HTMLImageElement = document.querySelector('#product-ship-image')
    const fullImageAnchor = img.closest('.product-full-image-anchor')
    fullImageAnchor.setAttribute('data-target-product-id', product.id.toString())
    product.image.length > 100 ? (img.src = `data:image/png;base64, ${product.image}`) : (img.src = defaultBrandImage)
    let div: HTMLDivElement = document.querySelector('#product-ship-name')
    div.innerHTML = product.name
    div = document.querySelector('#product-ship-sku')
    div.innerHTML = product.SKU
    div = document.querySelector('#product-ship-available-quantity')
    div.innerHTML = product.available_quantity[group.replace('_', ' ')].toString()
    div = document.querySelector('#product-ship-total-available-items')
    div.innerHTML = product.total_available_items[group.replace('_', ' ')].toString()

    let input: HTMLInputElement = document.querySelector('#product-ship-product-id')
    input.value = product.id.toString()
    input = document.querySelector('#product-ship-desire-quantity')
    input.max = product.available_quantity[group.replace('_', ' ')].toString()
    input.min = '1'
    input = document.querySelector('#product-ship-group')
    input.value = group.replace('_', ' ')

    shipModal.show()

    // -----count rest quantity in ship request product modal------
    const desiredQuantityInput: HTMLInputElement = document.querySelector('#product-ship-desire-quantity')
    desiredQuantityInput.addEventListener('change', () => {
        const availableQuantityDiv = document.querySelector('#product-ship-available-quantity')
        availableQuantityDiv.textContent = product.available_quantity[group.replace('_', ' ')].toString()
        let desiredQuantity = Number(desiredQuantityInput.value)
        const availableQuantity = Number(availableQuantityDiv.textContent)
        if (desiredQuantity > availableQuantity) {
            desiredQuantityInput.value = availableQuantity.toString()
        }
        availableQuantityDiv.textContent = (availableQuantity - desiredQuantity).toString()
    })
}

let picker: Datepicker

// function to booking
function booking(product: IProduct, group: string) {
    const img: HTMLImageElement = document.querySelector('#product-event-image')
    const fullImageAnchor = img.closest('.product-full-image-anchor')
    fullImageAnchor.setAttribute('data-target-product-id', product.id.toString())
    product.image.length > 100 ? (img.src = `data:image/png;base64, ${product.image}`) : (img.src = defaultBrandImage)
    let div: HTMLDivElement = document.querySelector('#product-event-name')
    div.innerHTML = product.name
    div = document.querySelector('#product-event-SKU')
    div.innerHTML = product.SKU

    let input: HTMLInputElement = document.querySelector('#product-event-group-hidden')
    input.value = group.replace('_', ' ')
    input = document.querySelector('#product-event-product-id')
    input.value = product.id.toString()

    const currentDate = new Date()

    async function createDatepicker() {
        const fetchedAmountByDate = (await getEventAvailableQuantity(
            product.id,
            group,
            currentDate.getMonth(),
            currentDate.getFullYear()
        )) as {
            date: string
            quantity: number
        }[]
        picker = new easepick.create({
            element: document.getElementById('datepicker'),
            css: [
                'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
                'https://easepick.com/css/demo_prices.css',
            ],
            autoApply: true,
            inline: true,
            plugins: ['LockPlugin'],
            LockPlugin: {
                filter(date: any) {
                    return date.inArray(bookedDates, '[)')
                },
            },

            setup(picker: any) {
                const randomInt = (min: number, max: number) => {
                    return Math.floor(Math.random() * (max - min + 1) + min)
                }
                const quantities: { [key: string]: string } = {}

                fetchedAmountByDate.forEach(({ date, quantity }) => {
                    quantities[date] = quantity.toString()
                })

                picker.on('view', async (evt: any) => {
                    const { view, date, target } = evt.detail

                    if ((view as string).toLowerCase() !== 'main') {
                        return
                    }

                    date.setMonth(date.getMonth() - 1)

                    const chosenMonth = date.getMonth()
                    const chosenYear = date.getFullYear()

                    const fetchedAmountByDate = (await getEventAvailableQuantity(
                        product.id,
                        group,
                        chosenMonth,
                        chosenYear
                    )) as {
                        date: string
                        quantity: number
                    }[]

                    fetchedAmountByDate.forEach(({ date, quantity }) => {
                        const splittedDate = date.split('-')
                        splittedDate[1] = (parseInt(splittedDate[1]) - 1).toString()

                        const jsDateString = splittedDate.join('-')

                        const jsDate = new Date(date)

                        jsDate.setHours(0, 0, 0)

                        const dayContainer = document
                            .querySelector('.easepick-wrapper')

                        const dayContainerShadow = dayContainer
                            .shadowRoot.querySelector(`div[data-time='${jsDate.getTime()}']`)

                        if(!dayContainerShadow) {
                            return
                        }

                        const span = dayContainerShadow.querySelector('.day-price') ?? document.createElement('span')
                        span.className = 'day-price'
                        span.innerHTML = quantity.toString()
                        dayContainerShadow.append(span)
                    })
                })
            },
        })
    }

    createDatepicker()

    viewModal.hide()
    eventModal.show()
}

// function to assign
function assign(product: IProduct, group: string) {
    let input: HTMLInputElement = document.querySelector('#product-assign-name')
    input.value = product.name
    input = document.querySelector('#product-assign-amount')
    input.max = product.available_quantity[group.replace('_', ' ')].toString()
    input.min = '1'
    const groupName = group.replace('_', ' ')
    input = document.querySelector('#product-assign-from-group')
    input.value = groupName

    const group_id=product.groups_ids[groupName]  
    input = document.querySelector('#product-assign-from-group_id')
    input.value = group_id.toString()
    assignModal.show()
}

// function to delete ship assign share button
function deleteShipAssignButton(nameGroup: string, nameGroupValue: string) {
    const shipAssignShareContainer = document.querySelector(
        `#product-ship-assign-share-container-${nameGroup.replace(/ /g, '_')}`
    )
    const groupContainer = document.querySelector(
        `#product-view-product_group-container-${nameGroupValue.replace(/ /g, '_')}`
    )
    if (shipAssignShareContainer) {
        shipAssignShareContainer.remove()
    }
    if (groupContainer) {
        groupContainer.remove()
    }
}

// function to add ship, assign, button to view product modal
function addShipAssignShareButton(isEqual: boolean, masterGroup: string, group: string, productParam: IProduct) {
    const eventCheckbox: HTMLInputElement = document.querySelector('#product-show-events-toggle-btn')
    const isEvent = eventCheckbox.checked && masterGroup === eventMasterGroup
    const groupUnderScore = group.replace(/ /g, '_')
    const groupProductIds = productParam.groups_ids
    const productTypeContainer = document.querySelector(`#product-view-product-name-container`)
    const shipAssignContainer = document.createElement('div')
    shipAssignContainer.classList.add('sm:col-span-3', 'flex', 'gap-4')
    shipAssignContainer.setAttribute('id', `product-ship-assign-share-container-${masterGroup.replace(/ /g, '_')}`)
    const shipAssignContainerDiv = `
    <div>
      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Available</label>
        <div id="ship-product-quantity"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      ${productParam.available_quantity[group] || 0}</div>
    </div>
    <div>
      <label for="product_group" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Action</label >
      <button ship-group-data=${groupUnderScore} type="button" id="ship-product-button-${groupUnderScore}" class="ship-product-button inline-flex items-center mr-2 px-3 py-2.5 text-sm font-medium text-center text-white rounded-lg bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
        Ship
      </button>
      <button assign-group-data=${groupUnderScore} type="button" id="assign-product-button-${groupUnderScore}" class="assign-product-button inline-flex items-center px-3 py-2.5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
        Assign
      </button>
    </div>
  `
    const bookingContainerDiv = `
        <div>
        <label for="product_group" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Action</label >
        <button ship-group-data=${groupUnderScore} type="button" id="booking-product-button-${groupUnderScore}" class="booking-product-button inline-flex items-center mr-2 px-3 py-2.5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M128 0c13.3 0 24 10.7 24 24V64H296V24c0-13.3 10.7-24 24-24s24 10.7 24 24V64h40c35.3 0 64 28.7 64 64v16 48V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192 144 128C0 92.7 28.7 64 64 64h40V24c0-13.3 10.7-24 24-24zM400 192H48V448c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V192zM329 297L217 409c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47 95-95c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                clip-rule="evenodd"></path>
            </svg>
            Booking
        </button>
        </div>
    `
    isEvent
        ? (shipAssignContainer.innerHTML = bookingContainerDiv)
        : (shipAssignContainer.innerHTML = shipAssignContainerDiv)
    const shareContainer = document.createElement('div')
    const shipProductBtn = shipAssignContainer.querySelector(`#ship-product-button-${groupUnderScore}`)
    const assignProductBtn = shipAssignContainer.querySelector(`#assign-product-button-${groupUnderScore}`)

    shareContainer.classList.add('sm:col-span-3', 'flex', 'gap-4')
    shareContainer.setAttribute('id', `product-ship-assign-share-container-${masterGroup.replace(/ /g, '_')}`)
    shareContainer.innerHTML = `
    <div>
      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Available</label>
        <div id="ship-product-quantity"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      ${productParam.available_quantity[group] || 0}</div>
    </div>
    <div>
      <label for="product_group" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Action</label >
      <button share-group-data=${groupUnderScore} type="button" id="share-product-button-${groupUnderScore}" class="request-share-product-button inline-flex items-center px-3 py-2.5 text-sm font-medium text-center text-white rounded-lg bg-yellow-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
        Request Share
      </button>
    </div>
  `

    const shareProductBtn = shareContainer.querySelector(`#share-product-button-${groupUnderScore}`)

    if (productParam.available_quantity[group] === 0 || !productParam.available_quantity[group]) {
        shipProductBtn.classList.add('invisible')
        assignProductBtn.classList.add('invisible')
        shareProductBtn.classList.add('invisible')
    }

    if (isEqual) {
        productTypeContainer.parentNode.insertBefore(shipAssignContainer, productTypeContainer.nextSibling)
    } else {
        productTypeContainer.parentNode.insertBefore(shareContainer, productTypeContainer.nextSibling)
    }

    if (isEvent) {
        const bookingButtons = document.querySelectorAll('.booking-product-button')
        bookingButtons.forEach((e) =>
            e.addEventListener('click', () => {
                let shipGroup = e.getAttribute('ship-group-data')
                const product = JSON.parse(sessionStorage.product)
                booking(product, shipGroup)
            })
        )
    }

    const shipButtons = document.querySelectorAll('.ship-product-button')
    shipButtons.forEach((e) =>
        e.addEventListener('click', () => {
            viewModal.hide()
            editModal.hide()
            let shipGroup = e.getAttribute('ship-group-data')
            const product = JSON.parse(sessionStorage.product)
            ship(product, shipGroup)
        })
    )

    const assignButtons = document.querySelectorAll('.assign-product-button')
    assignButtons.forEach((e) =>
        e.addEventListener('click', () => {
            viewModal.hide()
            editModal.hide()
            let assignGroup = e.getAttribute('assign-group-data')
            const product = JSON.parse(sessionStorage.product)
            assign(product, assignGroup)
        })
    )

    const requestShareButtons = document.querySelectorAll('.request-share-product-button')
    requestShareButtons.forEach((e) =>
        e.addEventListener('click', () => {
            viewModal.hide()
            editModal.hide()
            let shareGroup = e.getAttribute('share-group-data')
            const product = JSON.parse(sessionStorage.product)
            requestShare(product, shareGroup)
        })
    )
    const productViewTypeContainer = document.querySelector('#product-view-product-name-container')
    const productMasterGroupContainer = document.createElement('div')
    productMasterGroupContainer.classList.add('sm:col-span-3')
    productMasterGroupContainer.setAttribute('id', `product-view-product_group-container-${groupUnderScore}`)

    productMasterGroupContainer.innerHTML = `
    <label for="for-group-${groupUnderScore}"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${masterGroup}</label>
    <select type="text" name="group-${groupUnderScore}" id="product-view-${groupUnderScore}"
      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Some Group" required
    >
      <option value="${groupProductIds[group]}">${group}</option>
    </select>
    `
    productViewTypeContainer.parentNode.insertBefore(productMasterGroupContainer, productViewTypeContainer.nextSibling)
}

// function to filter products by group
const productFilterInputs = document.querySelectorAll('.product-filter-input')
const filterProductButton = document.querySelector('#product-filter-button')
const filterRadioButtons = document.querySelectorAll('.product-filter-radio-button')

filterRadioButtons.forEach((btn) => {
    const filterButtonId = btn.getAttribute('id')
    const filterJsonDataStorage = sessionStorage.getItem('filterJsonData')
    const filterJsonDataObject = JSON.parse(filterJsonDataStorage)

    for (const key in filterJsonDataObject) {
        if (filterButtonId.includes(key)) {
            btn.innerHTML = `
        ${filterJsonDataObject[key]}
        <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m1 1 4 4 4-4" />
        </svg>`
        }
    }
})

productFilterInputs.forEach((input: HTMLInputElement) => {
    input.addEventListener('change', () => {
        const filterInputDataTarget = input.getAttribute('data-target')
        const masterGroup = filterInputDataTarget
            .split(',')[1]
            .replace(/[^a-zA-Z0-9\s\_]/g, '')
            .trim()
        const filterInputId = filterInputDataTarget.split(',')[0].replace(/[^a-zA-Z0-9\s\_]/g, '')
        const filterInputIdString = `#product-filter-input-${filterInputId}`
        const filterButtonId = filterInputDataTarget
            .split(',')[1]
            .trim()
            .replace(/[^a-zA-Z0-9\s\_]/g, '')
        const filterInput = document.querySelector(filterInputIdString) as HTMLInputElement
        const filterRadioBtn = document.querySelector(`#dropdownRadioButton-${filterButtonId}`)

        if (filterInputIdString.includes(filterButtonId) && input.value === masterGroup) {
            filterRadioBtn.innerHTML = `
        ${filterButtonId.split('_').join(' ')}
        <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m1 1 4 4 4-4" />
        </svg>
      `
            getSessionStorageObject(filterJsonData, 'filterJsonData', 'remove', filterButtonId)
            return
        }

        filterRadioBtn.innerHTML = `
      ${filterInput.value.split('_').join(' ')}
      <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="m1 1 4 4 4-4" />
      </svg>
      `
        filterJsonData[filterButtonId] = filterInput.value.split('_').join(' ')
        getSessionStorageObject(filterJsonData, 'filterJsonData', 'add')
    })
})

filterProductButton.addEventListener('click', (e) => {
    const hiddenInput = document.querySelector('#sort_by') as HTMLInputElement
    const filterJsonDataStorage = sessionStorage.getItem('filterJsonData')
    const filterDataObject = JSON.parse(filterJsonDataStorage)
    filterJsonData = filterDataObject
    hiddenInput.value = JSON.stringify(filterJsonData)
    sessionStorage.setItem('filterJsonData', JSON.stringify(filterJsonData))
    const isVisibleFilter = true
    sessionStorage.setItem('isVisibleFilter', JSON.stringify(isVisibleFilter))
})

function getSessionStorageObject(
    localObject: FilterJsonData,
    sessionObject: string,
    method = 'none',
    objectKey = 'none'
) {
    const jsonDataObject = sessionStorage.getItem(sessionObject)
    const dataObject = JSON.parse(jsonDataObject)
    switch (method) {
        case 'add':
            const newDataObject = { ...dataObject, ...localObject }
            const newJsonData = JSON.stringify(newDataObject)
            sessionStorage.setItem(sessionObject, newJsonData)
            break
        case 'remove':
            delete dataObject[objectKey]
            const newJsonDataObject = JSON.stringify(dataObject)
            sessionStorage.setItem(sessionObject, newJsonDataObject)
            break
        default:
            break
    }
}

function createAdjustAction(isEqual: boolean, masterGroup: string, group: string, productParam: IProduct) {
    const productInWarehouses = sessionStorage.setItem(
        'productInWarehouses',
        JSON.stringify(productParam.product_in_warehouses)
    )
    const groupUnderScore = group.replace(/ /g, '_')
    const groupProductIds = productParam.groups_ids
    const productTypeContainer = document.querySelector(`#product-adjust-product-name-container`)
    const adjustContainer = document.createElement('div')
    adjustContainer.classList.add('sm:col-span-2', 'flex', 'gap-4')
    adjustContainer.setAttribute('id', `product-adjust-container-${groupUnderScore}`)
    adjustContainer.innerHTML = `
    <div>
      <label for="adjust-product-quantity-${groupUnderScore}" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Available</label>
        <input id="adjust-product-quantity-${groupUnderScore}"
          class="product-adjust-group-quantity shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    </div>

  `

    productTypeContainer.parentNode.insertBefore(adjustContainer, productTypeContainer.nextSibling)

    const productViewTypeContainer = document.querySelector('#product-adjust-product-name-container')
    const masterGroupWarehouseContainer = document.createElement('div')
    masterGroupWarehouseContainer.classList.add('sm:col-span-4')
    masterGroupWarehouseContainer.setAttribute('id', `product-adjust-product_group-container-${groupUnderScore}`)

    masterGroupWarehouseContainer.innerHTML = `
  <div class="flex gap-4">
    <div class="w-1/2">
      <label for="for-group-${groupUnderScore}"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${masterGroup}</label>
      <select type="text" name="group-${groupUnderScore}" id="master-group-adjust-${groupUnderScore}"
        class="product-adjust-group shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Some Group" required
      >
        <option value="${groupProductIds[group]}">${group}</option>
      </select>
    </div>
    <div class="w-1/2">
      <label for="for-warehouse-${groupUnderScore}"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Warehouse</label>
      <select type="text" name="group-${groupUnderScore}" id="warehouse-adjust-${groupUnderScore}" data-target-group="${group}"
        class="product-adjust-warehouse-select shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Some Group" required
      >
      </select>
    </div>
  </div>
    `
    const selectWarehouse: HTMLInputElement = masterGroupWarehouseContainer.querySelector(
        `#warehouse-adjust-${groupUnderScore}`
    )
    const productQuantity: HTMLInputElement = adjustContainer.querySelector(
        `#adjust-product-quantity-${groupUnderScore}`
    )

    for (const warehouse of productParam.all_warehouses) {
        const option = document.createElement('option')

        option.value = warehouse.id.toString()
        option.text = warehouse.name.toString()
        selectWarehouse.appendChild(option)
    }

    const productQuantityValue = productParam.product_in_warehouses[group][selectWarehouse.value] || 0

    productQuantity.value = String(productQuantityValue)

    productViewTypeContainer.parentNode.insertBefore(
        masterGroupWarehouseContainer,
        productViewTypeContainer.nextSibling
    )

    selectWarehouse.addEventListener('change', () => {
        const productInWarehouses = JSON.parse(sessionStorage.getItem('productInWarehouses'))
        const availableQuantity = productInWarehouses[group][selectWarehouse.value] || 0
        productQuantity.value = String(availableQuantity)
        productInWarehouses[group][selectWarehouse.value] = Number(productQuantity.value)
        sessionStorage.setItem('productInWarehouses', JSON.stringify(productInWarehouses))
    })

    productQuantity.addEventListener('change', () => {
        const productInWarehouses = JSON.parse(sessionStorage.getItem('productInWarehouses'))
        productInWarehouses[group][selectWarehouse.value] = Number(productQuantity.value)
        sessionStorage.setItem('productInWarehouses', JSON.stringify(productInWarehouses))
    })
}

const adjustButton = document.querySelector(`#product-adjust-submit-btn`)
adjustButton.addEventListener('click', () => {
    const product = JSON.parse(sessionStorage.getItem('product'))
    const csrfTokenInput = document.querySelector<HTMLInputElement>('#csrf_token')
    const csrfToken = csrfTokenInput ? csrfTokenInput.value : ''
    adjustProduct(product, csrfToken)
})

async function adjustProduct(productParam: IProduct, csrfToken: string) {
    const adjustNote: HTMLInputElement = document.querySelector('#product-adjust-note')
    const productInWarehouses = JSON.parse(sessionStorage.getItem('productInWarehouses'))

    const data = {
        product_id: productParam.id,
        groups_quantity: JSON.stringify(productInWarehouses),
        note: adjustNote.value,
        csrf_token: csrfToken,
    }

    const base_url = window.location.origin

    const response = await fetch(`/product/adjust`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    // NOTE: If we do not notify user about adjust, delete if else statement
    if (response.status === 201) {
        location.reload()
        sessionStorage.removeItem('productInWarehouses')
    } else {
        location.reload()
        sessionStorage.removeItem('productInWarehouses')
    }
}

function deleteAdjustContainer(nameGroup: string, nameGroupValue: string) {
    const adjustContainer = document.querySelector(`#product-adjust-container-${nameGroupValue.replace(/ /g, '_')}`)
    const masterGroupWarehouseContainer = document.querySelector(
        `#product-adjust-product_group-container-${nameGroupValue.replace(/ /g, '_')}`
    )
    if (adjustContainer) {
        adjustContainer.remove()
    }
    if (masterGroupWarehouseContainer) {
        masterGroupWarehouseContainer.remove()
    }
}

// ----add inbound order item for edit modal----
function createProductGroupEditItem(
    productParam: IProduct = null,
    masterGroup: string = null,
    itemIndex: number = null
) {
    if (!productParam) {
        const product: IProduct = JSON.parse(sessionStorage.getItem('product'))
        productParam = product
    }

    const productGroupEditContainer = document.querySelector('#product-group-edit-add-container')
    const productGroupEditAllItems = document.querySelectorAll('.product-group-edit-add-item')
    const index = productGroupEditAllItems.length + 1
    const productGroupEditItem = document.createElement('div')

    productGroupEditItem.classList.add(
        'p-6',
        'space-y-6',
        'border-t',
        'product-group-edit-add-item',
        `delete-id-${index}`
    )
    productGroupEditItem.innerHTML = `
  <div class="grid grid-cols-12 gap-5">
    <div class="col-span-6 sm:col-span-4">
      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Master
        Group</label>
      <select type="text" name="add_product" id="product-master-group-edit-item-${index}"
        class="product-master-group-edit-item shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Master
        Group" required>
        <option value="" disabled selected>Select master group</option>
      </select>
    </div>
    <div class="col-span-6 sm:col-span-4">
      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group</label>
      <select type="text" name="add_group" id="product-group-edit-item-${index}"
        class="product-group-edit-item shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Group" required>
        <option value="" disabled selected>Select group</option>
      </select>
    </div>
    <div class="col-span-6 sm:col-span-4">
      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Action</label>
      <button type="button" data-target=""
        class="product-group-edit-delete-item-btn inline-flex items-center px-3 py-2 mr-3 text-sm font-medium text-center text-white rounded-lg bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z">
          </path>
        </svg>
      </button>
      <button type="button" id="product-group-edit-add-item-btn-${index}"
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-red-300">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z">
          </path>
        </svg>
      </button>
    </div>
  </div>
  `

    const productGroupEditSelect: HTMLSelectElement = productGroupEditItem.querySelector('.product-group-edit-item')
    const availableMasterGroups = Object.keys(productParam.mstr_prod_grps_prod_grps_names)
    const productMasterGroupEditSelect: HTMLSelectElement = productGroupEditItem.querySelector(
        `#product-master-group-edit-item-${index}`
    )
    availableMasterGroups.forEach((masterGroup) => {
        const option = document.createElement('option')
        option.setAttribute('value', masterGroup)
        option.innerHTML = masterGroup
        productMasterGroupEditSelect.appendChild(option)
    })
    if (masterGroup) {
        productMasterGroupEditSelect.value = masterGroup
        productParam.mstr_prod_grps_prod_grps_names[masterGroup].forEach(
            (group: { group_name: string; group_id: number }) => {
                const productGroupSelectOption = document.createElement('option')
                productGroupSelectOption.setAttribute('value', group.group_id.toString())
                productGroupSelectOption.textContent = group.group_name
                productGroupEditSelect.appendChild(productGroupSelectOption)
            }
        )
        // TODO: always select first option
        if (!itemIndex) {
            itemIndex = 0
        }
        productGroupEditSelect.value =
            productParam.mstr_grps_grps_names_in_prod[masterGroup][itemIndex].group_id.toString()
    }

    const options = productMasterGroupEditSelect.querySelectorAll('option')
    productMasterGroupEditSelect.addEventListener('change', () => {
        options.forEach((e) => {
            if (
                e.textContent === productMasterGroupEditSelect.options[productMasterGroupEditSelect.selectedIndex].text
            ) {
                const optionCategory =
                    productParam.mstr_prod_grps_prod_grps_names[
                        productMasterGroupEditSelect.options[productMasterGroupEditSelect.selectedIndex].text
                    ]

                document.getElementById(`product-group-edit-item-${index}`).innerHTML = ''
                if (optionCategory) {
                    optionCategory.forEach((group: { group_name: string; group_id: number }) => {
                        const storeSelectOption = document.createElement('option')
                        storeSelectOption.setAttribute('value', group.group_id.toString())
                        storeSelectOption.textContent = group.group_name
                        productGroupEditSelect.appendChild(storeSelectOption)
                    })
                }
            }
        })
    })
    productGroupEditContainer.appendChild(productGroupEditItem)

    const addButton = productGroupEditItem.querySelector(`#product-group-edit-add-item-btn-${index}`)

    addButton.addEventListener('click', () => {
        createProductGroupEditItem()
    })

    const deleteButton = productGroupEditItem.querySelector('.product-group-edit-delete-item-btn')
    deleteButton.addEventListener('click', () => {
        const inboundOrderItem = document.querySelector(`.delete-id-${index}`)
        if (inboundOrderItem) {
            inboundOrderItem.remove()
        }
    })
}

// this button need to add first item from template
const productGroupEditBtnById = document.querySelector('#product-group-edit-add-item-btn')
productGroupEditBtnById.addEventListener('click', () => {
    createProductGroupEditItem()
})

// ----set product to JSON hidden input in inbound-order-edit-form----
function setProducts(typeModal: string) {
    const productGroupItems = document.querySelectorAll(`.product-group-${typeModal}-add-item`)

    const products = []

    for (let i = 0; i < productGroupItems.length; i++) {
        const productGroupItem: HTMLSelectElement = productGroupItems[i].querySelector(
            `.product-group-${typeModal}-item`
        )

        const product = Number(productGroupItem.value)
        products.push(product)
    }

    const inputProducts: HTMLInputElement = document.querySelector(`#product-${typeModal}-product-groups`)
    inputProducts.value = JSON.stringify(products)

    return true
}

// ----submit edit form through hidden submit button----
const productEditSubmitButton: HTMLButtonElement = document.querySelector('#product-edit-submit-btn')
const productEditSaveButton = document.querySelector('#product-edit-save-products-btn')

productEditSaveButton.addEventListener('click', () => {
    const result = setProducts('edit')
    if (result) {
        productEditSubmitButton.click()
    }
})

// ----add product group item for edit modal----
function createProductGroupAddItem(groups: IProductMasterGroupGroup = null) {
    if (!groups) {
        groups = JSON.parse(sessionStorage.getItem('groups'))
    }
    const productGroupAddContainer = document.querySelector('#product-group-add-add-container')
    const productGroupEditOriginal = document.querySelector('#product-group-add-item')
    const productGroupAddAllItems = document.querySelectorAll('.product-group-add-add-item')
    const index = productGroupAddAllItems.length + 1
    const productGroupAddItem = document.createElement('div')

    productGroupAddItem.classList.add(
        'p-6',
        'space-y-6',
        'border-t',
        'product-group-add-add-item',
        `delete-id-${index}`
    )
    productGroupAddItem.innerHTML = `
  <div class="grid grid-cols-12 gap-5">
    <div class="col-span-6 sm:col-span-4">
      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Master
        Group</label>
      <select type="text" name="add_product" id="product-master-group-add-item-${index}"
        class="product-master-group-add-item shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Master
        Group" required>
        <option value="" disabled selected>Select master group</option>
      </select>
    </div>
    <div class="col-span-6 sm:col-span-4">
      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group</label>
      <select type="text" name="add_group" id="product-group-add-item-${index}"
        class="product-group-add-item shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Group" required>
        <option value="" disabled selected>Select group</option>
      </select>
    </div>
    <div class="col-span-6 sm:col-span-4">
      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Action</label>
      <button type="button" data-target=""
        class="product-group-add-delete-item-btn inline-flex items-center px-3 py-2 mr-3 text-sm font-medium text-center text-white rounded-lg bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z">
          </path>
        </svg>
      </button>
      <button type="button" id="product-group-add-add-item-btn-${index}"
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-red-300">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z">
          </path>
        </svg>
      </button>
    </div>
  </div>
  `

    const productMasterGroupAddSelect: HTMLSelectElement = productGroupAddItem.querySelector(
        `#product-master-group-add-item-${index}`
    )
    const productGroupAddSelect: HTMLSelectElement = productGroupAddItem.querySelector('.product-group-add-item')
    const availableMasterGroups = Object.keys(groups)

    availableMasterGroups.forEach((masterGroup) => {
        const option = document.createElement('option')
        option.setAttribute('value', masterGroup)
        option.innerHTML = masterGroup
        productMasterGroupAddSelect.appendChild(option)
    })
    const options = productMasterGroupAddSelect.querySelectorAll('option')

    productMasterGroupAddSelect.addEventListener('change', () => {
        options.forEach((e) => {
            if (e.textContent === productMasterGroupAddSelect.options[productMasterGroupAddSelect.selectedIndex].text) {
                const optionCategory =
                    groups[productMasterGroupAddSelect.options[productMasterGroupAddSelect.selectedIndex].text]

                document.getElementById(`product-group-add-item-${index}`).innerHTML = ''
                if (optionCategory) {
                    optionCategory.forEach((group: { group_name: string; group_id: number }) => {
                        const storeSelectOption = document.createElement('option')
                        storeSelectOption.setAttribute('value', group.group_id.toString())
                        storeSelectOption.textContent = group.group_name
                        productGroupAddSelect.appendChild(storeSelectOption)
                    })
                }
            }
        })
    })

    productGroupAddContainer.appendChild(productGroupAddItem)

    const addButton = productGroupAddItem.querySelector(`#product-group-add-add-item-btn-${index}`)

    addButton.addEventListener('click', () => {
        createProductGroupAddItem()
    })

    const deleteButton = productGroupAddItem.querySelector('.product-group-add-delete-item-btn')
    deleteButton.addEventListener('click', () => {
        const inboundOrderItem = document.querySelector(`.delete-id-${index}`)
        if (inboundOrderItem) {
            inboundOrderItem.remove()
        }
    })
}

// this button need to add first item from template
const productGroupAddBtnById = document.querySelector('#product-group-add-add-item-btn')
productGroupAddBtnById.addEventListener('click', () => {
    createProductGroupAddItem()
})

// ----submit add form through hidden submit button----
const productAddSubmitButton: HTMLButtonElement = document.querySelector('#product-add-submit-btn')
const productAddSaveButton = document.querySelector('#product-add-save-products-btn')

productAddSaveButton.addEventListener('click', () => {
    const result = setProducts('add')
    if (result) {
        productAddSubmitButton.click()
    }
})

// ----clear product group container----
function clearProductGroupContainer() {
    const productGroupEditContainer = document.querySelector('#product-group-edit-add-container')
    const productGroupEditItems = document.querySelectorAll('.product-group-edit-add-item')
    for (let i = 1; i < productGroupEditItems.length; i++) {
        productGroupEditContainer.removeChild(productGroupEditItems[i])
    }
    const productGroupEditSelects = document.querySelectorAll('.product-group-edit-add-item')
}

// ----product show stocks own by me----
const showProductByUserGroupCheckbox: HTMLInputElement = document.querySelector('#product-show-stocks-own-by-me-btn')
if (window.location.pathname + window.location.hash === '/product/stocks_owned_by_me') {
    window.onload = (event) => {
        showProductByUserGroupCheckbox.setAttribute('checked', 'checked')
    }
}
showProductByUserGroupCheckbox.addEventListener('change', async () => {
    if (showProductByUserGroupCheckbox.checked) {
        try {
            const response = await fetch('/product/stocks_owned_by_me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.status === 200) {
                window.location.href = response.url
            }
        } catch (error) {
            console.log(error)
        }
    } else {
        try {
            const response = await fetch(`/product/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.status === 200) {
                window.location.href = response.url
            }
        } catch (error) {
            console.log(error)
        }
    }
})

document.querySelector('#product-assign-master-group').addEventListener('change', () => {
    const productAssignMasterGroupSelect: HTMLSelectElement = document.querySelector('#product-assign-master-group')
    const productAssignGroupSelect: HTMLSelectElement = document.querySelector('#product-assign-group')
    const groups: IMasterGroup = JSON.parse(
        productAssignMasterGroupSelect[productAssignMasterGroupSelect.selectedIndex].getAttribute('data-target')
    )
    const availableMasterGroups = Object.keys(groups.master_groups_list_groups)

    productAssignGroupSelect.innerHTML = ''

    availableMasterGroups.forEach((masterGroup) => {
        if (masterGroup === productAssignMasterGroupSelect.options[productAssignMasterGroupSelect.selectedIndex].text) {
            const optionCategory = groups.master_groups_list_groups[masterGroup]

            if (optionCategory) {
                optionCategory.forEach((group: { group_name: string; group_id: number }) => {
                    const storeSelectOption = document.createElement('option')
                    storeSelectOption.setAttribute('value', group.group_id.toString())
                    storeSelectOption.textContent = group.group_name
                    productAssignGroupSelect.appendChild(storeSelectOption)
                })
            }
        }
    })
})

// ---image compressor----
document.getElementById('product-add-image').addEventListener('change', async (e) => {
    const desiredImageSize = 300 * 1024
    const lowImageInput = document.querySelector<HTMLInputElement>('#product-add-low-image')
    const initialImage = (e.target as HTMLInputElement).files[0]

    if (initialImage.size > desiredImageSize) {
        const compressedImage = await compressImage(initialImage)
        const compressedImageFile = new File([compressedImage], `low_${initialImage.name}`, {
            type: initialImage.type,
        })

        lowImageInput.files = setFileInput(compressedImageFile)
    } else {
        lowImageInput.files = setFileInput(initialImage)
    }

    async function compressImage(file: File) {
        const maxFileSize = desiredImageSize
        let quality = 0.6

        while (quality > 0) {
            const compressedFile = await compressQualityImage(file, quality)
            if ((compressedFile as File).size < maxFileSize) {
                return compressedFile
            }
            quality -= 0.1
            if (quality < 0.1) {
                return compressedFile
            }
        }
    }

    async function compressQualityImage(file: File, quality: number) {
        return new Promise<Blob>((resolve, reject) => {
            const image = new Image()
            image.src = URL.createObjectURL(file)
            image.onload = () => {
                const canvas = document.createElement('canvas')
                const context = canvas.getContext('2d')
                canvas.width = 300
                canvas.height = 300

                context.drawImage(image, 0, 0, 300, 300)

                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            resolve(blob)
                        } else {
                            reject(new Error('Failed to convert'))
                        }
                    },
                    file.type,
                    quality
                )
            }

            image.onerror = (err) => {
                reject(err)
            }
        })
    }

    function setFileInput(file: File) {
        const fileList = new DataTransfer()
        fileList.items.add(file)
        return fileList.files
    }
})

// productBookingButtons.forEach((button) =>
//     button.addEventListener('click', () => {
//         const product = JSON.parse(button.getAttribute('data-target'))
//         console.log(product)

//         let div: HTMLDivElement = document.querySelector('#product-event-name')
//         div.innerHTML = product.name
//         const img: HTMLImageElement = document.querySelector('#product-event-image')
//         const fullImageAnchor = img.closest('.product-full-image-anchor')
//         fullImageAnchor.setAttribute('data-target-product-id', product.id.toString())
//         product.image.length > 100
//             ? (img.src = `data:image/png;base64, ${product.image}`)
//             : (img.src = defaultBrandImage)
//         div = document.querySelector('#product-event-SKU')
//         div.innerHTML = product.SKU
//         div = document.querySelector('#product-event-next_url')
//         div.innerHTML = window.location.href

//         const productIdInput: HTMLInputElement = document.querySelector('#product-event-product-id')
//         productIdInput.value = product.id.toString()

//         // datepicker
//         const eventDatepickers = document.querySelectorAll('.product-event-datepicker')
//         const dateCurrent = new Date()
//         const dateEvent = new Date(dateCurrent.getFullYear(), dateCurrent.getMonth(), dateCurrent.getDate() + 5)

//         const option = {
//             todayHighlight: true,
//             minDate: dateEvent,
//         }

//         eventDatepickers.forEach((datepicker: HTMLDivElement, index) => {
//             const eventDatePicker = new Datepicker(datepicker)
//             eventDatePicker.setOptions(option)
//             if (index === 0) {
//                 eventDatePicker.setDate(dateEvent)
//             }
//         })
//     })
// )

function getFilterValues(isChecked: boolean) {
    const url = new URL(window.location.href)
    const eventSortToggleButton = document.querySelector('#product-show-events-toggle-btn')

    isChecked ? url.searchParams.set('events', 'true') : url.searchParams.delete('events')
    window.location.href = `${url.href}`
}

const eventSortToggleButton: HTMLInputElement = document.querySelector('#product-show-events-toggle-btn')
eventSortToggleButton.addEventListener('change', () => {
    getFilterValues(eventSortToggleButton.checked)
})
