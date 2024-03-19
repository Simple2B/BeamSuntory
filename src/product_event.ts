import { easepick } from '@easepick/bundle';

let datepicker = document.getElementById('datepicker-event');
const fiveDays = 5 * 24 * 60 * 60 * 1000;
let calendarFilter: string[] = [];

async function getEventAvailableQuantity(product_id: number, group_name: string, calendarFilter: string[]) {
    try {
        const response = await fetch(
            `/event/get_available_quantity?group_name=${group_name}&product_id=${product_id}&dates=${JSON.stringify(calendarFilter)}`
          );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return []
    }
  }


async function createDatepicker() {;
    const product_id = Number(datepicker.getAttribute('data-product-id'));
    const group_name = datepicker.getAttribute('data-group-name');
    const currentDate = new Date();
    const picker = new easepick.create({
      element: datepicker,
      css: [
        'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
        'https://cdn.jsdelivr.net/npm/@easepick/core@1.2.1/dist/index.css',
        'https://cdn.jsdelivr.net/npm/@easepick/lock-plugin@1.2.1/dist/index.css',
        'https://easepick.com/css/demo_prices.css',
        'https://easepick.com/css/demo_hotelcal.css',
      ],
      autoApply: true,
      inline: true,
      plugins: ['LockPlugin'],
      LockPlugin: {
        filter(date: any) {
          if (date - +currentDate > fiveDays) {
            return false;
          } else {
            return true;
          }
        },
      },

      setup(picker: any) {
        picker.on('view', async (evt: any) => {
          const { view, date, target } = evt.detail;
          if (view === 'CalendarDay') {
            const day = parseInt(target.innerHTML);
            if (day === 1) {
              calendarFilter = [target.getAttribute('data-time')];
              return;
            }

            if (!calendarFilter.includes(target.getAttribute('data-time'))) {
              calendarFilter.push(target.getAttribute('data-time'));
            }
          }

          if (view && view.toLowerCase() !== 'main') {
            return;
          }
          const fetchedAmountByDate = await getEventAvailableQuantity(product_id, group_name, calendarFilter)as {
                date: number;
                quantity: number;
              }[];  
          

          fetchedAmountByDate.forEach(({ date, quantity }) => {
            const dayContainer = document.querySelector('.easepick-wrapper');
            if (!dayContainer) {
              return;
            }

            const dayContainerShadow = dayContainer.shadowRoot.querySelector(`div[data-time='${date}']`);

            if (!dayContainerShadow) {
              return;
            }

            const span = dayContainerShadow.querySelector('.day-price') ?? document.createElement('span');
            span.className = 'day-price';
            span.innerHTML = quantity.toString();
            if (quantity <= 0) {
              dayContainerShadow.classList.add('locked');
            }
            dayContainerShadow.append(span);
          });
        }
        );
      },
    });
    // TODO update delete picker when modal is closed
    const modalBackground = document.querySelector('#custom-modal-content').parentElement;

    const observer = new MutationObserver(function (event) {
        picker.destroy();  
        this.disconnect();
    })
    observer.observe(modalBackground, {
        attributes: true, 
        attributeFilter: ['class'],
        childList: false, 
        characterData: false
    })
    

  }

createDatepicker();

