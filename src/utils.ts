import { ModalOptions } from 'flowbite';
import { Modal } from 'flowbite';
import type { ModalInterface } from 'flowbite';

export const formatDate = (date: string) => {
  if (!date) {
    return 'None';
  }

  const createAt = new Date(date);
  const year = createAt.getFullYear();
  const month = String(createAt.getMonth() + 1).padStart(2, '0'); // Month is 0-based
  const day = String(createAt.getDate()).padStart(2, '0');
  const hours = String(createAt.getHours()).padStart(2, '0');
  const minutes = String(createAt.getMinutes()).padStart(2, '0');
  return `${month}/${day}/${year} ${hours}:${minutes}`;
};

export const modalOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {},
  onShow: () => {},
  onToggle: () => {},
};

export const initModal = (el: HTMLElement) => {
  const modal: ModalInterface = new Modal(el, modalOptions);
  return modal;
};

export const addDeleteEvent = (e: Element, url: string) => {
  e.addEventListener('click', async () => {
    if (confirm('Are sure?')) {
      const response = await fetch(url, {
        method: 'DELETE',
      });
      if ([200, 202, 404].includes(response.status)) {
        location.reload();
      }
    }
  });
};

export const addSearchEvent = (searchInput: HTMLInputElement, searchButton: Element) => {
  if (searchButton && searchInput) {
    searchButton.addEventListener('click', () => {
      const url = new URL(window.location.href);
      url.searchParams.set('q', searchInput.value);
      window.location.href = `${url.href}`;
    });
  }
};
