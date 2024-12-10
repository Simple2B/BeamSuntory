interface IFilterMap {
  [index: string]: string[] | HTMLElement[];
}

const filtersMap: IFilterMap = {
  events: [
    'user-select',
    'filter-start-date',
    'filter-start-date-to',
    'filter-end-date',
    'filter-end-date-to',
    'filter-group-brand',
  ],
  request_share: [
    'user-select',
    'filter-start-date',
    'filter-end-date',
    'master-group',
    'target-group',
    'target-sub-group',
    'filter-group-brand',
  ],
  inventories: [
    'user-select',
    'filter-start-date',
    'filter-end-date',
    'master-group',
    'target-group',
    'target-sub-group',
    'filter-group-brand',
    'filter-group-language',
    'filter-group-premises',
    'filter-group-categories',
    'filter-group-events',
  ],
  adjustment: [
    'user-select',
    'filter-start-date',
    'filter-end-date',
    'master-group',
    'target-group',
    'target-sub-group',
    'filter-group-brand',
    'filter-group-language',
    'filter-group-premises',
    'filter-group-categories',
    'filter-group-events',
  ],
  assign: [
    'user-select',
    'group-from',
    'group-to',
    'filter-start-date',
    'filter-end-date',
    'filter-group-brand',
    'filter-group-language',
    'filter-group-premises',
    'filter-group-categories',
  ],
  inbound_order: [
    'master-group',
    'target-group',
    'target-sub-group',
    'filter-start-date',
    'filter-end-date',
    'filter-group-brand',
    'filter-group-premises',
    'filter-group-categories',
  ],
  shipping: [
    'division-select',
    'master-group',
    'target-group',
    'target-sub-group',
    'filter-start-date',
    'filter-end-date',
    'filter-group-brand',
    'filter-group-language',
    'filter-group-categories',
    'filter-group-premises',
  ],
  shelf_life: [
    'filter-start-date',
    'filter-end-date',
    'master-group',
    'target-group',
    'target-sub-group',
    'filter-group-brand',
    'filter-group-language',
    'filter-group-premises',
    'filter-group-categories',
    'shelf-life-filter-expire-in',
  ],
  inbound_billable: ['filter-start-date', 'filter-end-date', 'filter-group-brand'],
  outbound_billable: ['filter-start-date', 'filter-end-date', 'filter-group-brand'],
};

const filtersIds = [
  'request-share-type',
  'shipping-type',
  'user-select',
  'filter-start-date',
  'filter-start-date-to',
  'filter-end-date',
  'filter-end-date-to',
  'master-group',
  'target-group',
  'target-sub-group',
  'filter-group-brand',
  'filter-group-language',
  'filter-group-premises',
  'filter-group-categories',
  'filter-group-events',
  'filter-product-group',
  'group-from',
  'group-to',
  'division-select',
  'shelf-life-filter-expire-in',
];

document.addEventListener('DOMContentLoaded', () => {
  // DOM nodes
  const reportTypeSelectHTML = document.getElementById('report-type-select') as HTMLSelectElement;
  const allFiltersHTML = filtersIds.map((id) => document.getElementById(id));
  const tableLoader = document.getElementById('table-report-loader') as HTMLButtonElement;
  const clearFiltersButton = document.getElementById('filter-clear-button') as HTMLButtonElement;
  const groupSelect = document.getElementById('report-target-group-select') as HTMLSelectElement;
  const groupIdInput = document.getElementById('report-group-id-hidden') as HTMLInputElement;
  const searchQueryHTML = document.getElementById('search-query') as HTMLInputElement;
  const searchSkuHTML = document.getElementById('search-sku') as HTMLInputElement;

  for (const [reportType, filters] of Object.entries(filtersMap)) {
    filtersMap[reportType] = filters.map((id) => document.getElementById(id as string)) as HTMLElement[];
  }

  // Show/remove filters when choose event report type
  function changeReportType(e: Event) {
    // clearFilters();
    const selectHTML = e.target as HTMLSelectElement;

    allFiltersHTML.forEach(
      (filterHTML) => !filterHTML.classList.contains('hidden') && filterHTML.classList.add('hidden')
    );
    const visibleFilters = filtersMap[selectHTML.value] as HTMLElement[];
    visibleFilters.forEach((filterHTML) => filterHTML.classList.remove('hidden'));
  }
  reportTypeSelectHTML.addEventListener('change', changeReportType);
  allFiltersHTML.forEach(
    (filterHTML) => !filterHTML.classList.contains('hidden') && filterHTML.classList.add('hidden')
  );
  const visibleFilters = filtersMap[reportTypeSelectHTML.value] as HTMLElement[];
  visibleFilters.forEach((filterHTML) => filterHTML.classList.remove('hidden'));

  function getSubGroups() {
    const option = groupSelect.querySelector(`option[value="${groupSelect.value}"]`);
    if (!option) {
      return;
    }
    groupIdInput.value = option.getAttribute('data-target-group-id');
    groupIdInput.click();
  }
  groupSelect.addEventListener('change', getSubGroups);

  function clearFilters() {
    const allInputs = filtersIds.map((id) => document.getElementById(id));
    allInputs.forEach((filterHTML) => {
      if (!filterHTML) {
        return;
      }
      const inputs = filterHTML.querySelectorAll('input, select') as
        | NodeListOf<HTMLInputElement>
        | NodeListOf<HTMLSelectElement>;
      inputs.forEach((input) => {
        input.value = '';
      });
    });
    searchQueryHTML.value = '';
    searchSkuHTML.value = '';
    tableLoader.click();
  }
  clearFiltersButton.addEventListener('click', clearFilters);
  tableLoader.click();
});
