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

let controller = null;

const getFullImageAbortController = async (url) => {
  if (controller) {
    controller.abort();
  }
  controller = new AbortController();

  try {
    const response = await fetch(url, { signal: controller.signal });
    console.log('response abort controller', response);

    if (controller.signal.aborted) {
      console.log('aborted');

      return null;
    }

    const data = await response.json();

    console.log('data abort controller', data);

    return data;
  } catch (error) {
    if (controller.signal.aborted) {
      console.log('aborted');
      return null;
    } else {
      console.log(error);
      throw error;
    }
  }
};

export async function getFullImage(id: string) {
  try {
    console.log('show modal');

    const response = await fetch(`/product/full_image/${id}`);
    console.log(response);

    console.log(response);

    const data = await response.json();
    viewModal.show();
    console.log(data);

    const image = document.querySelector('#product-image-full-img');
    const productName = document.querySelector('#product-image-name');
    console.log(productName);

    image.setAttribute('src', `data:image/${data.imageType};base64, ${data.image}`);
    productName.innerHTML = data.name;
    document.querySelector('#product-image-spinner').classList.add('hidden');
    document.querySelector('#product-image-full-img').classList.remove('hidden');
    console.log('full image');
  } catch (error) {
    console.log(error);
    document.querySelector('#product-image-spinner').classList.add('hidden');
    document.querySelector('#product-image-not-found-img').classList.remove('hidden');
  }
}

export const htmxLoader = new HTMXDispatcher();
