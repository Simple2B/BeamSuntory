import 'flowbite';
import { Dismiss } from 'flowbite';
import type { DismissOptions, DismissInterface } from 'flowbite';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';

const themeToggleDarkIcons = document.querySelectorAll('#theme-toggle-dark-icon');
const themeToggleLightIcons = document.querySelectorAll('#theme-toggle-light-icon');
export const defaultBrandImage =
  'https://raw.githubusercontent.com/Simple2B/BeamSuntory/develop/app/static/img/no_picture_default.png';
import HTMXDispatcher from './htmx';

// Change the icons inside the button based on previous settings
if (
  localStorage.getItem('color-theme') === 'dark' ||
  (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  themeToggleLightIcons.forEach(function (el) {
    el.classList.remove('hidden');
  });
  document.documentElement.classList.add('dark');
} else {
  themeToggleDarkIcons.forEach(function (el) {
    el.classList.remove('hidden');
  });
  document.documentElement.classList.remove('dark');
}

const themeToggleButtons = document.querySelectorAll('#theme-toggle');

themeToggleButtons.forEach(function (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', function () {
    // toggle icons inside button
    themeToggleDarkIcons.forEach(function (themeToggleDarkIcon) {
      themeToggleDarkIcon.classList.toggle('hidden');
    });

    themeToggleLightIcons.forEach(function (themeToggleLightIcon) {
      themeToggleLightIcon.classList.toggle('hidden');
    });

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === 'light') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      }

      // if NOT set via local storage previously
    } else {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      }
    }
  });
});

//----auto hide toast----
// target element that will be dismissed
const $targetEl: HTMLElement = document.querySelector('[id^=toast-success]');

// optional trigger element
const $triggerEl: HTMLElement = document.getElementById('close-toast-btn');

// options object
const options: DismissOptions = {
  transition: 'transition-opacity',
  duration: 5000,
  timing: 'ease-out',

  // callback functions
  onHide: (context, targetEl) => {
    console.log('element has been dismissed');
  },
};

/*
 * targetEl: required
 * triggerEl: optional
 * options: optional
 */
const dismiss: DismissInterface = new Dismiss($targetEl, $triggerEl, options);

// programmatically hide it
if ($targetEl && $triggerEl) {
  $triggerEl.addEventListener('click', () => {
    dismiss.hide();
  });
  setTimeout(() => {
    dismiss.hide();
  }, 20000);
}

// -------full product image modal-------
const $viewImageModalElement: HTMLElement = document.querySelector('#product-image-modal');
const $spinnerModalElement: HTMLElement = document.querySelector('#spinner-modal');
const modalOptions: ModalOptions = {
  placement: 'bottom-right',
  backdrop: 'dynamic',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  closable: true,
  onHide: () => {
    console.log('modal has been hidden');
  },
  onShow: () => {},
  onToggle: () => {
    console.log('modal has been toggled');
  },
};
const viewModal: ModalInterface = new Modal($viewImageModalElement, modalOptions);
const spinnerModal: ModalInterface = new Modal($spinnerModalElement, modalOptions);

const productImageAnchors = document.querySelectorAll('.product-full-image-anchor');
productImageAnchors.forEach((e) => {
  e.addEventListener('click', () => {
    const productId = e.getAttribute('data-target-product-id');
    getFullImage(productId);
  });
});

export async function getFullImage(id: string) {
  spinnerModal.show();
  try {
    const image = document.querySelector('#product-image-full-img');

    image.classList.add('hidden');

    const response = await fetch(`/product/full_image/${id}`);
    const data = await response.json();

    spinnerModal.hide();
    viewModal.show();

    const productName = document.querySelector('#product-image-name');

    image.setAttribute('src', `data:image/${data.imageType};base64, ${data.image}`);
    image.classList.remove('hidden');
    productName.innerHTML = data.name;
    document.querySelector('#product-image-full-img').classList.remove('hidden');
    document.querySelector('#product-image-not-found-img').classList.add('hidden');
  } catch (error) {
    spinnerModal.hide();
    viewModal.show();
    document.querySelector('#product-image-not-found-img').classList.remove('hidden');
  }
}

export const htmxLoader = new HTMXDispatcher();

document.querySelector('#product-upload-save-products-btn').addEventListener('click', () => {
  const uploadGroupInput = document.querySelector('#product-target-group-upload') as HTMLInputElement;
  const option = uploadGroupInput.list.querySelector('option[value="' + uploadGroupInput.value + '"]') as HTMLElement;
  // NOTE Use large number if no group selected. Impossible to reach that number in prod.
  // Used to avoid wrong validation in backend wtform when pass 0 and get None
  let groupId;
  if (uploadGroupInput.value) {
    groupId = option.getAttribute('data-group-id') ?? 999999999;
  } else {
    groupId = 999999999;
  }

  const hiddenInput = document.getElementById('product-target-group-upload-hidden') as HTMLInputElement;
  hiddenInput.value = groupId.toString();
});

const dropdownSidebar = document.querySelectorAll('.dropdown-btn');

dropdownSidebar.forEach((btn) => {
  const btnElement = btn as HTMLElement;

  btnElement.addEventListener('click', () => {
    const dropdownContent = btnElement.nextElementSibling as HTMLElement;
    const dropdownArrow = btnElement.lastElementChild as HTMLElement;
    const isClose = dropdownContent.classList.contains('dropdown-close');

    btnElement.classList.toggle('bg-red-600');

    dropdownSidebar.forEach((otherBtn) => {
      const otherBtnElement = otherBtn as HTMLElement;

      if (otherBtn !== btn) {
        const otherContent = otherBtnElement.nextElementSibling as HTMLElement;
        const otherArrow = otherBtnElement.lastElementChild as HTMLElement;

        otherContent.classList.remove('dropdown-open');
        otherContent.classList.add('dropdown-close');
        otherBtnElement.classList.add('dark:hover:bg-gray-700');
        otherBtnElement.classList.add('hover:bg-gray-100');
        otherBtnElement.classList.remove('bg-red-600');
        otherArrow.style.transform = 'rotate(0)';
      }
    });

    if (isClose) {
      dropdownContent.classList.remove('dropdown-close');
      dropdownContent.classList.add('dropdown-open');
      btnElement.classList.remove('dark:hover:bg-gray-700');
      btnElement.classList.remove('hover:bg-gray-100');
      dropdownArrow.style.transition = 'all 0.5s';
      dropdownArrow.style.transform = 'rotate(90deg)';
    } else {
      dropdownContent.classList.remove('dropdown-open');
      dropdownContent.classList.add('dropdown-close');
      btnElement.classList.add('dark:hover:bg-gray-700');
      btnElement.classList.add('hover:bg-gray-100');
      dropdownArrow.style.transform = 'rotate(0)';
    }
  });
});
