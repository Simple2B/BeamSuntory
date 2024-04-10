


window.addEventListener('DOMContentLoaded', () => {
    const searchInput: HTMLInputElement = document.querySelector(
      '#table-search-stores',
    );
    const searchInputButton = document.querySelector('#table-search-store-button');
    if (searchInputButton && searchInput) {
      searchInputButton.addEventListener('click', () => {
        window.location.href = `${window.location.origin}${window.location.pathname}?q=${searchInput.value}`;
      });
    }

    const favoriteAllStoresBtn: HTMLInputElement = document.querySelector('#store-show-favorite-all-btn');

    favoriteAllStoresBtn.addEventListener('change', () => {
      if (favoriteAllStoresBtn.checked) {
        window.location.href = `${window.location.origin}${window.location.pathname}?q=${searchInput.value}&is_favorite=true`;
      } else {
        window.location.href = `${window.location.origin}${window.location.pathname}?q=${searchInput.value}`
      }
    });
});


