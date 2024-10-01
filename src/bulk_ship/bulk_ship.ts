

// interface IAvailableQtyRes {
//     avaivableQty: number;
// }


// async function getAvaivableQty(
//     product_id: number,
//     group_id: number
// ): Promise<IAvailableQtyRes> {
//     const res = await fetch(`/bulk-ship/available-qty?product_id=${product_id}&group_id=${group_id}`);

//     if (res.ok) {
//         const data: IAvailableQtyRes = await res.json();
//         return data;
//     }
//     return { avaivableQty: 0 };

// }


const handlerOnSubmit = (e: Event) => {
    const form = document.getElementById('bulk-ship-form') as HTMLFormElement;
    if (!form) {
        console.error('Form not found');
        return;
    }

    if (!form.checkValidity()) {
        form.reportValidity();
        console.error('Form is not valid');
        return;
    }

    const itemsData: HTMLInputElement = form.querySelector('input[name="items_data"]');
    if (!itemsData) {
        console.error('Items data not found');
        return;
    }


    const items = Array.from(form.querySelectorAll('.bulk_ship_item_input')).map((div) => {
        const groups: NodeListOf<HTMLSelectElement> = div.querySelectorAll('select[name="group_id"]');
        const group_id = groups.length > 1 && groups[1].value !== "Select group" ? groups[1] : groups[0];
        const productSKU: HTMLInputElement = div.querySelector('input[name="product_sku"]');
        const quantity: HTMLInputElement = div.querySelector('input[name="qty"]');
        const store_id: HTMLSelectElement = div.querySelector('select[name="store_id"]');

        if (group_id.value === "Select group" || store_id.value === "Select store") {
            throw new Error("Invalid group_id or store_id");
        }

        return {
            groupId: group_id.value,
            productSKU: productSKU.value,
            qty: quantity.value,
            storeId: store_id.value
        };

    });

    itemsData.value = JSON.stringify(items);

    form.submit();
    const btn = e.target as HTMLButtonElement;
    btn.disabled = true;
};


function main() {
    const submitBtn = document.getElementById('bulk-ship-submit');
    if (!submitBtn) {
        console.error('Submit button not found');
        return;
    }
    submitBtn.addEventListener('click', handlerOnSubmit);
}

main();
