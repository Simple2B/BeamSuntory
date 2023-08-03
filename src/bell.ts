const defaultBrandImage =
  'https://funko.com/on/demandware.static/-/Sites-funko-master-catalog/default/dwbb38a111/images/funko/upload/55998_CocaCola_S2_SpriteBottleCap_POP_GLAM-WEB.png';

async function getNotification() {
  const baseURL = window.location.origin;
  const response = await fetch(`${baseURL}/user/notification`, {
    method: 'GET',
  });
  if (response.status == 200) {
    const userRequests = await response.json();
    const bellContainer = document.getElementById(
      'bell-notification-container',
    );
    userRequests.forEach((request: any) => {
      const notificationItem = document.createElement('div');
      notificationItem.classList.add('bell-notification-item');
      notificationItem.innerHTML = `
        <a href="#" class="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
          <div class="flex-shrink-0">
            <img id="bell-notification-product-image" class="rounded-full w-11 h-11" src="/docs/images/people/profile-picture-1.jpg"
              alt="J"
            />
          </div>
          <div class="w-full pl-3">
            <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
              New
              <span class="font-semibold text-gray-900 dark:text-white">request share</span>: product - <span
                class="font-semibold text-gray-900 dark:text-white">"${
                  request.product_name
                }"</span>,
              SKU - <span class="font-semibold text-gray-900 dark:text-white">"${
                request.SKU
              }"</span>, desired quantity -
              <span class="font-semibold text-gray-900 dark:text-white">"${
                request.desire_quantity
              }"</span>, target_group - <span
                class="font-semibold text-gray-900 dark:text-white">"${
                  request.target_group
                }"</span>
            </div>
            <div class="text-xs text-blue-600 dark:text-blue-500">
              ${getTimeFormat(request.created_at)}
            </div>
          </div>
        </a>
      `;

      const productImage: HTMLImageElement = notificationItem.querySelector(
        '#bell-notification-product-image',
      );

      request.product_image.length > 100
        ? (productImage.src = `data:image/png;base64, ${request.product_image}`)
        : (productImage.src = defaultBrandImage);

      const firstNotification = bellContainer.querySelector(
        '.bell-notification-item',
      );

      if (firstNotification) {
        firstNotification.insertAdjacentElement(
          'beforebegin',
          notificationItem,
        );
      } else {
        bellContainer.appendChild(notificationItem);
      }
    });
  }
}

async function limitNotification() {
  await getNotification();
  const bellNotificationItems = document.querySelectorAll(
    '.bell-notification-item',
  );

  if (bellNotificationItems.length > 8) {
    for (let i = 8; i < bellNotificationItems.length; i++) {
      bellNotificationItems[i].classList.add('hidden');
    }
  }

  if (bellNotificationItems.length > 0) {
    const bellRedDot = document.getElementById('bell-notification-red-dot');
    bellRedDot.classList.remove('invisible');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('bell.ts');
  limitNotification();
});

function getTimeFormat(created_at: string) {
  const date_str = created_at,
    options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    },
    formatted = new Date(date_str).toLocaleDateString('en-US', options),
    date_parts = formatted
      .substring(0, formatted.indexOf(','))
      .split(' ')
      .reverse()
      .join(' ');

  const formatted_date =
    date_parts + formatted.substr(formatted.indexOf(',') + 1);

  return formatted_date;
}
