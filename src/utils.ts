import { ModalOptions } from 'flowbite';

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
  onHide: () => {
    console.log('modal is hidden');
  },
  onShow: () => {
    console.log('warehouse id: ');
  },
  onToggle: () => {
    console.log('modal has been toggled');
  },
};
