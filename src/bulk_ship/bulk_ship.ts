
async function downloadBulkTemplate(e: Event) {
    const target = e.target as HTMLElement
    const spinner = target.querySelector('svg');
    console.log(spinner);
    if (!spinner) {
        return

    }
    spinner.classList.remove("hidden");

    let url = "/bulk-ship/download-template";
    const bulkShipUuid = target.getAttribute("bulk-ship-uuid");
    if (bulkShipUuid) {
        console.log(bulkShipUuid);
        url = `/bulk-ship/${bulkShipUuid}/download-template`;
    }

    console.log(url);
    const response = await fetch(url)
    if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'bulk_ship_template.xlsx'; // Set the desired filename
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);

    } else {
        location.reload();
    }
    spinner.classList.add("hidden");
}


window.addEventListener('DOMContentLoaded', () => {
    const downloadButtons = document.querySelectorAll('.download-bulk-ship-template');
    downloadButtons.forEach((button) => {
        console.log(button);
        button.addEventListener('click', downloadBulkTemplate);
    });
});