
document.addEventListener('DOMContentLoaded', () => {
    const groupSelect = document.getElementById('report-target-group-select') as HTMLSelectElement;
    const groupIdInput = document.getElementById('report-group-id-hidden') as HTMLInputElement;

    function getSubGroups() {
        const option = groupSelect.querySelector(`option[value="${groupSelect.value}"]`);
        if (!option) {
            return;
        }
        groupIdInput.value = option.getAttribute('data-target-group-id');
        groupIdInput.click();
    }
    groupSelect.addEventListener('change', getSubGroups);
});