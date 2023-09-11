/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/cart.ts":
/*!*********************!*\
  !*** ./src/cart.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var bundle_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@easepick/bundle'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
// variable to set default image to brand dynamically in modal window. Can we get link from the internet?
var defaultImage = 'https://funko.com/on/demandware.static/-/Sites-funko-master-catalog/default/dwbb38a111/images/funko/upload/55998_CocaCola_S2_SpriteBottleCap_POP_GLAM-WEB.png';
// --count total quantity and price--
var priceElements = document.querySelectorAll('.cart-item-retail_price');
var quantityElements = document.querySelectorAll('.cart-item-quantity');
var totalPriceElement = document.querySelector('#cart-total-price');
var totalQuantityElement = document.querySelector('#cart-total-quantity');
var tableCartItems = document.querySelectorAll('.table-cart-item');
var totalPrice = 0;
var totalQuantity = 0;
tableCartItems.forEach(function (item) {
    var priceElement = item.querySelector('.cart-item-retail_price');
    var quantityElement = item.querySelector('.cart-item-quantity');
    var availableProductQuantity = quantityElement.getAttribute('data-target-available-quantity');
    var price = parseFloat(priceElement.textContent);
    var quantity = parseInt(quantityElement.value);
    var totalPriceOneElement = price * quantity;
    totalPrice += totalPriceOneElement;
    totalQuantity += quantity;
    quantityElement.max = availableProductQuantity;
});
totalPriceElement.textContent = "$".concat(totalPrice.toFixed(2));
totalQuantityElement.textContent = totalQuantity.toString();
// --add delivery form when create ship request--
var deliverToStoreBtn = document.querySelector('#cart-deliver-to-store-btn');
var createStoreRequestContainer = document.querySelector('#cart-create-store-request-container');
deliverToStoreBtn.addEventListener('click', function () {
    createStoreRequestContainer.style.display = 'block';
});
// --delete cart item--
var deleteButtons = document.querySelectorAll('.delete-cart-item-btn');
deleteButtons.forEach(function (e) {
    e.addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
        var id, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm('Are sure?')) return [3 /*break*/, 2];
                    id = e.getAttribute('data-cart-item-id');
                    return [4 /*yield*/, fetch("/cart/delete/".concat(id), {
                            method: 'DELETE',
                        })];
                case 1:
                    response = _a.sent();
                    if (response.status == 200) {
                        location.reload();
                    }
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); });
});
// --show/hide favorite store in dropdown--
var favoriteCheckbox = document.querySelector('#cart-favorite-store-checkbox');
var storeSelect = document.querySelector('#cart-store-select');
var optionsStore = document.querySelectorAll('.cart-store-option');
favoriteCheckbox.addEventListener('change', function () {
    var showFavoriteStore = favoriteCheckbox.checked;
    for (var i = 0; i < optionsStore.length; i++) {
        var isFavorite = optionsStore[i].getAttribute('data-target-favorite');
        if (showFavoriteStore && isFavorite !== 'True') {
            ;
            optionsStore[i].style.display = 'none';
        }
        else {
            ;
            optionsStore[i].style.display = 'block';
        }
    }
});
var storeCategorySelect = document.querySelector('#cart-store-request-category-select');
var options = storeCategorySelect.querySelectorAll('option');
storeCategorySelect.addEventListener('change', function () {
    options.forEach(function (e) {
        if (e.textContent === storeCategorySelect.options[storeCategorySelect.selectedIndex].text) {
            var storeSelect_1 = document.querySelector('#cart-store-select');
            var optionCategory = JSON.parse(e.getAttribute('data-target-store-category-store'));
            document.getElementById('cart-store-select').innerHTML = '';
            if (optionCategory) {
                optionCategory.store_category_store.forEach(function (e) {
                    var storeSelectOption = document.createElement('option');
                    console.log('e.id', e.store_id);
                    console.log('storeSelect', storeSelect_1);
                    storeSelectOption.setAttribute('value', e.store_id.toString());
                    storeSelectOption.textContent = e.store_name;
                    storeSelect_1.appendChild(storeSelectOption);
                });
            }
        }
    });
});
// --display only sales rep locker--
var salesRepLockerCheckbox = document.querySelector('#cart-sales-rep-locker-checkbox');
if (salesRepLockerCheckbox) {
    salesRepLockerCheckbox.addEventListener('change', function () {
        var favoriteStoreContainer = document.querySelector('#cart-store-container');
        var lockerStoreCategoryIds = JSON.parse(salesRepLockerCheckbox.getAttribute('data-target-locker-store-category-ids'));
        var oldStoreCategoryOptions = storeCategorySelect.querySelectorAll('option');
        var oldStoreOptions = storeSelect.querySelectorAll('option');
        if (salesRepLockerCheckbox.checked) {
            var newStoreCategoryOption = new Option('Locker', lockerStoreCategoryIds[1], true, true);
            var newStoreOption = new Option(' Locker Store', lockerStoreCategoryIds[0], true, true);
            favoriteStoreContainer.classList.add('invisible');
            oldStoreCategoryOptions.forEach(function (e) {
                e.disabled = true;
            });
            storeSelect.appendChild(newStoreOption);
            storeSelect.value = lockerStoreCategoryIds[0].toString();
            storeCategorySelect.appendChild(newStoreCategoryOption);
        }
        else {
            favoriteStoreContainer.classList.remove('invisible');
            storeSelect.removeChild(oldStoreOptions[oldStoreOptions.length - 1]);
            storeCategorySelect.removeChild(oldStoreCategoryOptions[oldStoreCategoryOptions.length - 1]);
            oldStoreCategoryOptions.forEach(function (e, i) {
                if (i !== 0) {
                    e.disabled = false;
                }
            });
            storeSelect.selectedIndex = 0;
            storeCategorySelect.selectedIndex = 0;
        }
    });
}
var eventButtons = document.querySelectorAll('.cart-item-event-button');
eventButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
        var cart = JSON.parse(btn.getAttribute('data-target-cart'));
        console.log('cart', cart);
        var div = document.querySelector('#product-event-name');
        div.innerHTML = cart.product.name;
        div = document.querySelector('#product-event-SKU');
        div.innerHTML = cart.product.SKU;
        var img = document.querySelector('#product-event-image');
        cart.product.image.length > 100
            ? (img.src = "data:image/png;base64, ".concat(cart.product.image))
            : (img.src = defaultImage);
        var input = document.querySelector('#product-event-quantity');
        input.value = cart.quantity.toString();
        input = document.querySelector('#product-event-cart-id-hidden');
        input.value = cart.id.toString();
        input = document.querySelector('#product-event-product-id');
        input.value = cart.product.id.toString();
    });
});
var DateTime = bundle_1.easepick.DateTime;
function formatDate(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    return "".concat(year, "-").concat(month, "-").concat(day);
}
function getFirstAndLastDate() {
    var today = new Date();
    var fifthDayBefore = new Date(today);
    fifthDayBefore.setDate(today.getDate() - 5);
    var fifthDayAfter = new Date(today);
    fifthDayAfter.setDate(today.getDate() + 6);
    return [formatDate(fifthDayBefore), formatDate(fifthDayAfter)];
}
var bookedDates = [getFirstAndLastDate()].map(function (d) {
    if (d instanceof Array) {
        var start = new Date(d[0]);
        var end = new Date(d[1]);
        return [start, end];
    }
    return new DateTime(d, 'YYYY-MM-DD');
});
var DATA_FROM_BE = {
    '2023-09-03': '25',
    '2023-09-04': '26',
    '2023-09-05': '27',
    '2023-09-06': '28',
    '2023-09-07': '29',
    '2023-09-11': '28',
};
var picker = new bundle_1.easepick.create({
    element: document.getElementById('datepicker'),
    css: [
        'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
        'https://easepick.com/css/demo_hotelcal.css',
    ],
    plugins: ['RangePlugin', 'LockPlugin'],
    RangePlugin: {
        tooltipNumber: function (num) {
            return num - 1;
        },
    },
    LockPlugin: {
        minDate: new Date(),
        minDays: 2,
        inseparable: true,
        filter: function (date, picked) {
            if (picked.length === 1) {
                var incl = date.isBefore(picked[0]) ? '[)' : '(]';
                return !picked[0].isSame(date, 'day') && date.inArray(bookedDates, incl);
            }
            return date.inArray(bookedDates, '[)');
        },
    },
    setup: function (picker) {
        picker.on('view', function (evt) {
            //
        });
    },
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/cart.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUk7Z0JBQ25ELE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUM7YUFDM0U7WUFDRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQztRQUMxQyxDQUFDO0tBQ0o7SUFDRCxLQUFLLFlBQUMsTUFBVztRQUNiLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUMsR0FBUTtZQUN2QixFQUFFO1FBQ04sQ0FBQyxDQUFDO0lBQ04sQ0FBQztDQUNKLENBQUM7Ozs7Ozs7VUM5T0Y7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3N0YXRpYy8uL3NyYy9jYXJ0LnRzIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZWFzZXBpY2sgfSBmcm9tICdAZWFzZXBpY2svYnVuZGxlJ1xuXG5pbnRlcmZhY2UgSUNhcnQge1xuICAgIGlkOiBudW1iZXJcbiAgICBwcm9kdWN0OiBJUHJvZHVjdFxuICAgIHF1YW50aXR5OiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIElQcm9kdWN0IHtcbiAgICBpZDogbnVtYmVyXG4gICAgU0tVOiBzdHJpbmdcbiAgICBuYW1lOiBzdHJpbmdcbiAgICByZXRhaWxfcHJpY2U6IG51bWJlclxuICAgIGltYWdlOiBzdHJpbmdcbn1cblxuLy8gdmFyaWFibGUgdG8gc2V0IGRlZmF1bHQgaW1hZ2UgdG8gYnJhbmQgZHluYW1pY2FsbHkgaW4gbW9kYWwgd2luZG93LiBDYW4gd2UgZ2V0IGxpbmsgZnJvbSB0aGUgaW50ZXJuZXQ/XG5jb25zdCBkZWZhdWx0SW1hZ2UgPVxuICAgICdodHRwczovL2Z1bmtvLmNvbS9vbi9kZW1hbmR3YXJlLnN0YXRpYy8tL1NpdGVzLWZ1bmtvLW1hc3Rlci1jYXRhbG9nL2RlZmF1bHQvZHdiYjM4YTExMS9pbWFnZXMvZnVua28vdXBsb2FkLzU1OTk4X0NvY2FDb2xhX1MyX1Nwcml0ZUJvdHRsZUNhcF9QT1BfR0xBTS1XRUIucG5nJ1xuXG4vLyAtLWNvdW50IHRvdGFsIHF1YW50aXR5IGFuZCBwcmljZS0tXG5jb25zdCBwcmljZUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcnQtaXRlbS1yZXRhaWxfcHJpY2UnKVxuY29uc3QgcXVhbnRpdHlFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJ0LWl0ZW0tcXVhbnRpdHknKVxuY29uc3QgdG90YWxQcmljZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FydC10b3RhbC1wcmljZScpXG5jb25zdCB0b3RhbFF1YW50aXR5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJ0LXRvdGFsLXF1YW50aXR5JylcbmNvbnN0IHRhYmxlQ2FydEl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlLWNhcnQtaXRlbScpXG5cbmxldCB0b3RhbFByaWNlID0gMFxubGV0IHRvdGFsUXVhbnRpdHkgPSAwXG5cbnRhYmxlQ2FydEl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICBjb25zdCBwcmljZUVsZW1lbnQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5jYXJ0LWl0ZW0tcmV0YWlsX3ByaWNlJylcbiAgICBjb25zdCBxdWFudGl0eUVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5jYXJ0LWl0ZW0tcXVhbnRpdHknKVxuICAgIGNvbnN0IGF2YWlsYWJsZVByb2R1Y3RRdWFudGl0eSA9IHF1YW50aXR5RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0LWF2YWlsYWJsZS1xdWFudGl0eScpXG5cbiAgICBjb25zdCBwcmljZSA9IHBhcnNlRmxvYXQocHJpY2VFbGVtZW50LnRleHRDb250ZW50KVxuICAgIGNvbnN0IHF1YW50aXR5ID0gcGFyc2VJbnQocXVhbnRpdHlFbGVtZW50LnZhbHVlKVxuICAgIGNvbnN0IHRvdGFsUHJpY2VPbmVFbGVtZW50ID0gcHJpY2UgKiBxdWFudGl0eVxuICAgIHRvdGFsUHJpY2UgKz0gdG90YWxQcmljZU9uZUVsZW1lbnRcbiAgICB0b3RhbFF1YW50aXR5ICs9IHF1YW50aXR5XG4gICAgcXVhbnRpdHlFbGVtZW50Lm1heCA9IGF2YWlsYWJsZVByb2R1Y3RRdWFudGl0eVxufSlcblxudG90YWxQcmljZUVsZW1lbnQudGV4dENvbnRlbnQgPSBgJCR7dG90YWxQcmljZS50b0ZpeGVkKDIpfWBcbnRvdGFsUXVhbnRpdHlFbGVtZW50LnRleHRDb250ZW50ID0gdG90YWxRdWFudGl0eS50b1N0cmluZygpXG5cbi8vIC0tYWRkIGRlbGl2ZXJ5IGZvcm0gd2hlbiBjcmVhdGUgc2hpcCByZXF1ZXN0LS1cbmNvbnN0IGRlbGl2ZXJUb1N0b3JlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcnQtZGVsaXZlci10by1zdG9yZS1idG4nKVxuY29uc3QgY3JlYXRlU3RvcmVSZXF1ZXN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcnQtY3JlYXRlLXN0b3JlLXJlcXVlc3QtY29udGFpbmVyJykgYXMgSFRNTERpdkVsZW1lbnRcblxuZGVsaXZlclRvU3RvcmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY3JlYXRlU3RvcmVSZXF1ZXN0Q29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG59KVxuXG4vLyAtLWRlbGV0ZSBjYXJ0IGl0ZW0tLVxuY29uc3QgZGVsZXRlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZWxldGUtY2FydC1pdGVtLWJ0bicpXG5cbmRlbGV0ZUJ1dHRvbnMuZm9yRWFjaCgoZSkgPT4ge1xuICAgIGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmIChjb25maXJtKCdBcmUgc3VyZT8nKSkge1xuICAgICAgICAgICAgbGV0IGlkID0gZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2FydC1pdGVtLWlkJylcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9jYXJ0L2RlbGV0ZS8ke2lkfWAsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG59KVxuXG4vLyAtLXNob3cvaGlkZSBmYXZvcml0ZSBzdG9yZSBpbiBkcm9wZG93bi0tXG5jb25zdCBmYXZvcml0ZUNoZWNrYm94OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcnQtZmF2b3JpdGUtc3RvcmUtY2hlY2tib3gnKVxuY29uc3Qgc3RvcmVTZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcnQtc3RvcmUtc2VsZWN0JylcbmNvbnN0IG9wdGlvbnNTdG9yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJ0LXN0b3JlLW9wdGlvbicpXG5mYXZvcml0ZUNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICBjb25zdCBzaG93RmF2b3JpdGVTdG9yZSA9IGZhdm9yaXRlQ2hlY2tib3guY2hlY2tlZFxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRpb25zU3RvcmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgaXNGYXZvcml0ZSA9IG9wdGlvbnNTdG9yZVtpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0LWZhdm9yaXRlJylcblxuICAgICAgICBpZiAoc2hvd0Zhdm9yaXRlU3RvcmUgJiYgaXNGYXZvcml0ZSAhPT0gJ1RydWUnKSB7XG4gICAgICAgICAgICA7KG9wdGlvbnNTdG9yZVtpXSBhcyBIVE1MT3B0aW9uRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgOyhvcHRpb25zU3RvcmVbaV0gYXMgSFRNTE9wdGlvbkVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gICAgICAgIH1cbiAgICB9XG59KVxuXG5jb25zdCBzdG9yZUNhdGVnb3J5U2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJ0LXN0b3JlLXJlcXVlc3QtY2F0ZWdvcnktc2VsZWN0JylcbmNvbnN0IG9wdGlvbnMgPSBzdG9yZUNhdGVnb3J5U2VsZWN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ29wdGlvbicpXG5cbnN0b3JlQ2F0ZWdvcnlTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgIG9wdGlvbnMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICBpZiAoZS50ZXh0Q29udGVudCA9PT0gc3RvcmVDYXRlZ29yeVNlbGVjdC5vcHRpb25zW3N0b3JlQ2F0ZWdvcnlTZWxlY3Quc2VsZWN0ZWRJbmRleF0udGV4dCkge1xuICAgICAgICAgICAgY29uc3Qgc3RvcmVTZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FydC1zdG9yZS1zZWxlY3QnKVxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uQ2F0ZWdvcnkgPSBKU09OLnBhcnNlKGUuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldC1zdG9yZS1jYXRlZ29yeS1zdG9yZScpKVxuXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FydC1zdG9yZS1zZWxlY3QnKS5pbm5lckhUTUwgPSAnJ1xuICAgICAgICAgICAgaWYgKG9wdGlvbkNhdGVnb3J5KSB7XG4gICAgICAgICAgICAgICAgb3B0aW9uQ2F0ZWdvcnkuc3RvcmVfY2F0ZWdvcnlfc3RvcmUuZm9yRWFjaCgoZTogeyBzdG9yZV9pZDogbnVtYmVyOyBzdG9yZV9uYW1lOiBzdHJpbmcgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdG9yZVNlbGVjdE9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlLmlkJywgZS5zdG9yZV9pZClcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3N0b3JlU2VsZWN0Jywgc3RvcmVTZWxlY3QpXG5cbiAgICAgICAgICAgICAgICAgICAgc3RvcmVTZWxlY3RPcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsIGUuc3RvcmVfaWQudG9TdHJpbmcoKSlcbiAgICAgICAgICAgICAgICAgICAgc3RvcmVTZWxlY3RPcHRpb24udGV4dENvbnRlbnQgPSBlLnN0b3JlX25hbWVcbiAgICAgICAgICAgICAgICAgICAgc3RvcmVTZWxlY3QuYXBwZW5kQ2hpbGQoc3RvcmVTZWxlY3RPcHRpb24pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG59KVxuXG4vLyAtLWRpc3BsYXkgb25seSBzYWxlcyByZXAgbG9ja2VyLS1cbmNvbnN0IHNhbGVzUmVwTG9ja2VyQ2hlY2tib3g6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FydC1zYWxlcy1yZXAtbG9ja2VyLWNoZWNrYm94JylcbmlmIChzYWxlc1JlcExvY2tlckNoZWNrYm94KSB7XG4gICAgc2FsZXNSZXBMb2NrZXJDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGZhdm9yaXRlU3RvcmVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FydC1zdG9yZS1jb250YWluZXInKVxuICAgICAgICBjb25zdCBsb2NrZXJTdG9yZUNhdGVnb3J5SWRzID0gSlNPTi5wYXJzZShcbiAgICAgICAgICAgIHNhbGVzUmVwTG9ja2VyQ2hlY2tib3guZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldC1sb2NrZXItc3RvcmUtY2F0ZWdvcnktaWRzJylcbiAgICAgICAgKVxuXG4gICAgICAgIGNvbnN0IG9sZFN0b3JlQ2F0ZWdvcnlPcHRpb25zID0gc3RvcmVDYXRlZ29yeVNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKCdvcHRpb24nKVxuICAgICAgICBjb25zdCBvbGRTdG9yZU9wdGlvbnMgPSBzdG9yZVNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKCdvcHRpb24nKVxuXG4gICAgICAgIGlmIChzYWxlc1JlcExvY2tlckNoZWNrYm94LmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1N0b3JlQ2F0ZWdvcnlPcHRpb24gPSBuZXcgT3B0aW9uKCdMb2NrZXInLCBsb2NrZXJTdG9yZUNhdGVnb3J5SWRzWzFdLCB0cnVlLCB0cnVlKVxuICAgICAgICAgICAgY29uc3QgbmV3U3RvcmVPcHRpb24gPSBuZXcgT3B0aW9uKCcgTG9ja2VyIFN0b3JlJywgbG9ja2VyU3RvcmVDYXRlZ29yeUlkc1swXSwgdHJ1ZSwgdHJ1ZSlcbiAgICAgICAgICAgIGZhdm9yaXRlU3RvcmVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJylcbiAgICAgICAgICAgIG9sZFN0b3JlQ2F0ZWdvcnlPcHRpb25zLmZvckVhY2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICBlLmRpc2FibGVkID0gdHJ1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHN0b3JlU2VsZWN0LmFwcGVuZENoaWxkKG5ld1N0b3JlT3B0aW9uKVxuICAgICAgICAgICAgc3RvcmVTZWxlY3QudmFsdWUgPSBsb2NrZXJTdG9yZUNhdGVnb3J5SWRzWzBdLnRvU3RyaW5nKClcbiAgICAgICAgICAgIHN0b3JlQ2F0ZWdvcnlTZWxlY3QuYXBwZW5kQ2hpbGQobmV3U3RvcmVDYXRlZ29yeU9wdGlvbilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZhdm9yaXRlU3RvcmVDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaW52aXNpYmxlJylcbiAgICAgICAgICAgIHN0b3JlU2VsZWN0LnJlbW92ZUNoaWxkKG9sZFN0b3JlT3B0aW9uc1tvbGRTdG9yZU9wdGlvbnMubGVuZ3RoIC0gMV0pXG4gICAgICAgICAgICBzdG9yZUNhdGVnb3J5U2VsZWN0LnJlbW92ZUNoaWxkKG9sZFN0b3JlQ2F0ZWdvcnlPcHRpb25zW29sZFN0b3JlQ2F0ZWdvcnlPcHRpb25zLmxlbmd0aCAtIDFdKVxuICAgICAgICAgICAgb2xkU3RvcmVDYXRlZ29yeU9wdGlvbnMuZm9yRWFjaCgoZSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGUuZGlzYWJsZWQgPSBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBzdG9yZVNlbGVjdC5zZWxlY3RlZEluZGV4ID0gMFxuICAgICAgICAgICAgc3RvcmVDYXRlZ29yeVNlbGVjdC5zZWxlY3RlZEluZGV4ID0gMFxuICAgICAgICB9XG4gICAgfSlcbn1cblxuY29uc3QgZXZlbnRCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcnQtaXRlbS1ldmVudC1idXR0b24nKVxuZXZlbnRCdXR0b25zLmZvckVhY2goKGJ0bikgPT4ge1xuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgY2FydCA9IEpTT04ucGFyc2UoYnRuLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtY2FydCcpKSBhcyBJQ2FydFxuICAgICAgICBjb25zb2xlLmxvZygnY2FydCcsIGNhcnQpXG5cbiAgICAgICAgbGV0IGRpdjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ldmVudC1uYW1lJylcbiAgICAgICAgZGl2LmlubmVySFRNTCA9IGNhcnQucHJvZHVjdC5uYW1lXG4gICAgICAgIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWV2ZW50LVNLVScpXG4gICAgICAgIGRpdi5pbm5lckhUTUwgPSBjYXJ0LnByb2R1Y3QuU0tVXG4gICAgICAgIGNvbnN0IGltZzogSFRNTEltYWdlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWV2ZW50LWltYWdlJylcbiAgICAgICAgY2FydC5wcm9kdWN0LmltYWdlLmxlbmd0aCA+IDEwMFxuICAgICAgICAgICAgPyAoaW1nLnNyYyA9IGBkYXRhOmltYWdlL3BuZztiYXNlNjQsICR7Y2FydC5wcm9kdWN0LmltYWdlfWApXG4gICAgICAgICAgICA6IChpbWcuc3JjID0gZGVmYXVsdEltYWdlKVxuICAgICAgICBsZXQgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ldmVudC1xdWFudGl0eScpXG4gICAgICAgIGlucHV0LnZhbHVlID0gY2FydC5xdWFudGl0eS50b1N0cmluZygpXG4gICAgICAgIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZXZlbnQtY2FydC1pZC1oaWRkZW4nKVxuICAgICAgICBpbnB1dC52YWx1ZSA9IGNhcnQuaWQudG9TdHJpbmcoKVxuICAgICAgICBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWV2ZW50LXByb2R1Y3QtaWQnKVxuICAgICAgICBpbnB1dC52YWx1ZSA9IGNhcnQucHJvZHVjdC5pZC50b1N0cmluZygpXG4gICAgfSlcbn0pXG5cbmNvbnN0IHsgRGF0ZVRpbWUgfSA9IGVhc2VwaWNrXG5mdW5jdGlvbiBmb3JtYXREYXRlKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKClcbiAgICBjb25zdCBtb250aCA9IChkYXRlLmdldE1vbnRoKCkgKyAxKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJylcbiAgICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJylcbiAgICByZXR1cm4gYCR7eWVhcn0tJHttb250aH0tJHtkYXl9YFxufVxuXG5mdW5jdGlvbiBnZXRGaXJzdEFuZExhc3REYXRlKCkge1xuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKVxuICAgIGNvbnN0IGZpZnRoRGF5QmVmb3JlID0gbmV3IERhdGUodG9kYXkpXG4gICAgZmlmdGhEYXlCZWZvcmUuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSA1KVxuICAgIGNvbnN0IGZpZnRoRGF5QWZ0ZXIgPSBuZXcgRGF0ZSh0b2RheSlcbiAgICBmaWZ0aERheUFmdGVyLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpICsgNilcbiAgICByZXR1cm4gW2Zvcm1hdERhdGUoZmlmdGhEYXlCZWZvcmUpLCBmb3JtYXREYXRlKGZpZnRoRGF5QWZ0ZXIpXVxufVxuXG5jb25zdCBib29rZWREYXRlcyA9IFtnZXRGaXJzdEFuZExhc3REYXRlKCldLm1hcCgoZCkgPT4ge1xuICAgIGlmIChkIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZShkWzBdKVxuICAgICAgICBjb25zdCBlbmQgPSBuZXcgRGF0ZShkWzFdKVxuICAgICAgICByZXR1cm4gW3N0YXJ0LCBlbmRdXG4gICAgfVxuICAgIHJldHVybiBuZXcgRGF0ZVRpbWUoZCwgJ1lZWVktTU0tREQnKVxufSlcblxuY29uc3QgREFUQV9GUk9NX0JFID0ge1xuICAgICcyMDIzLTA5LTAzJzogJzI1JyxcbiAgICAnMjAyMy0wOS0wNCc6ICcyNicsXG4gICAgJzIwMjMtMDktMDUnOiAnMjcnLFxuICAgICcyMDIzLTA5LTA2JzogJzI4JyxcbiAgICAnMjAyMy0wOS0wNyc6ICcyOScsXG4gICAgJzIwMjMtMDktMTEnOiAnMjgnLFxufVxuXG5jb25zdCBwaWNrZXIgPSBuZXcgZWFzZXBpY2suY3JlYXRlKHtcbiAgICBlbGVtZW50OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0ZXBpY2tlcicpLFxuICAgIGNzczogW1xuICAgICAgICAnaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9AZWFzZXBpY2svYnVuZGxlQDEuMi4xL2Rpc3QvaW5kZXguY3NzJyxcbiAgICAgICAgJ2h0dHBzOi8vZWFzZXBpY2suY29tL2Nzcy9kZW1vX2hvdGVsY2FsLmNzcycsXG4gICAgXSxcbiAgICBwbHVnaW5zOiBbJ1JhbmdlUGx1Z2luJywgJ0xvY2tQbHVnaW4nXSxcbiAgICBSYW5nZVBsdWdpbjoge1xuICAgICAgICB0b29sdGlwTnVtYmVyKG51bTogYW55KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVtIC0gMVxuICAgICAgICB9LFxuICAgIH0sXG4gICAgTG9ja1BsdWdpbjoge1xuICAgICAgICBtaW5EYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgICBtaW5EYXlzOiAyLFxuICAgICAgICBpbnNlcGFyYWJsZTogdHJ1ZSxcbiAgICAgICAgZmlsdGVyKGRhdGU6IGFueSwgcGlja2VkOiBhbnkpIHtcbiAgICAgICAgICAgIGlmIChwaWNrZWQubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5jbCA9IGRhdGUuaXNCZWZvcmUocGlja2VkWzBdKSA/ICdbKScgOiAnKF0nXG4gICAgICAgICAgICAgICAgcmV0dXJuICFwaWNrZWRbMF0uaXNTYW1lKGRhdGUsICdkYXknKSAmJiBkYXRlLmluQXJyYXkoYm9va2VkRGF0ZXMsIGluY2wpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGF0ZS5pbkFycmF5KGJvb2tlZERhdGVzLCAnWyknKVxuICAgICAgICB9LFxuICAgIH0sXG4gICAgc2V0dXAocGlja2VyOiBhbnkpIHtcbiAgICAgICAgcGlja2VyLm9uKCd2aWV3JywgKGV2dDogYW55KSA9PiB7XG4gICAgICAgICAgICAvL1xuICAgICAgICB9KVxuICAgIH0sXG59KVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2NhcnQudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=