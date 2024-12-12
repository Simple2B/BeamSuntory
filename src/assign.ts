import { addSearchEvent } from './utils';

window.addEventListener('DOMContentLoaded', () => {
  // search flow
  const searchAssignInput: HTMLInputElement = document.querySelector('#table-search-assign');
  const searchAssignInputButton = document.querySelector('#table-search-assign-button');
  addSearchEvent(searchAssignInput, searchAssignInputButton);
});
