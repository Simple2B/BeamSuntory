import { addSearchEvent } from './utils';

// search flow
const searchInput: HTMLInputElement = document.querySelector('#table-search-inventory');
const searchInputButton = document.querySelector('#table-search-inventory-button');
addSearchEvent(searchInput, searchInputButton);
