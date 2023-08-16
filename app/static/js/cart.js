/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/cart.ts":
/*!*********************!*\
  !*** ./src/cart.ts ***!
  \*********************/
/***/ (function() {

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
var _this = this;
// --count total quantity and price--
var priceElements = document.querySelectorAll('.cart-item-price');
var quantityElements = document.querySelectorAll('.cart-item-quantity');
var totalPriceElement = document.querySelector('#cart-total-price');
var totalQuantityElement = document.querySelector('#cart-total-quantity');
var tableCartItems = document.querySelectorAll('.table-cart-item');
var totalPrice = 0;
var totalQuantity = 0;
tableCartItems.forEach(function (item) {
    var priceElement = item.querySelector('.cart-item-price');
    var quantityElement = item.querySelector('.cart-item-quantity');
    var availableProductQuantity = quantityElement.getAttribute('data-target-available-quantity');
    var price = parseFloat(priceElement.textContent);
    var quantity = parseInt(quantityElement.value);
    var totalPriceOneElement = price * quantity;
    totalPrice += totalPriceOneElement;
    totalQuantity += quantity;
    quantityElement.max = availableProductQuantity;
});
totalPriceElement.textContent = "".concat(totalPrice.toFixed(2), "$");
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
    e.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
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
var selectStore = document.querySelector('#cart-store-select');
var optionsStore = document.querySelectorAll('.cart-store-option');
favoriteCheckbox.addEventListener('change', function () {
    var showFavoriteStore = favoriteCheckbox.checked;
    for (var i = 0; i < optionsStore.length; i++) {
        var isFavorite = optionsStore[i].getAttribute('data-target-favorite');
        if (showFavoriteStore && isFavorite !== 'True') {
            optionsStore[i].style.display = 'none';
        }
        else {
            optionsStore[i].style.display = 'block';
        }
    }
});
var storeCategorySelect = document.querySelector('#cart-store-request-category');
var options = storeCategorySelect.querySelectorAll('option');
console.log('options', options);
storeCategorySelect.addEventListener('change', function () {
    console.log('click', storeCategorySelect.options[storeCategorySelect.selectedIndex].text);
    options.forEach(function (e) {
        if (e.textContent ===
            storeCategorySelect.options[storeCategorySelect.selectedIndex].text) {
            var storeSelect_1 = document.querySelector('#cart-store-select');
            var optionCategory = JSON.parse(e.getAttribute('data-target-store-category-store'));
            console.log('before', document.getElementById('cart-store-select'));
            document.getElementById('cart-store-select').innerHTML = '';
            console.log('after', document.getElementById('cart-store-select'));
            console.log('optionCategory', optionCategory);
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/cart.ts"]();
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGlCQUFpQixDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDO29CQUM3QyxhQUFXLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQzdDLENBQUMsQ0FDRixDQUFDO2FBQ0g7U0FDRjtJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7O1VFdkhIO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGF0aWMvLi9zcmMvY2FydC50cyIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gLS1jb3VudCB0b3RhbCBxdWFudGl0eSBhbmQgcHJpY2UtLVxuY29uc3QgcHJpY2VFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJ0LWl0ZW0tcHJpY2UnKTtcbmNvbnN0IHF1YW50aXR5RWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FydC1pdGVtLXF1YW50aXR5Jyk7XG5jb25zdCB0b3RhbFByaWNlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJ0LXRvdGFsLXByaWNlJyk7XG5jb25zdCB0b3RhbFF1YW50aXR5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJ0LXRvdGFsLXF1YW50aXR5Jyk7XG5jb25zdCB0YWJsZUNhcnRJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZS1jYXJ0LWl0ZW0nKTtcblxubGV0IHRvdGFsUHJpY2UgPSAwO1xubGV0IHRvdGFsUXVhbnRpdHkgPSAwO1xuXG50YWJsZUNhcnRJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICBjb25zdCBwcmljZUVsZW1lbnQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5jYXJ0LWl0ZW0tcHJpY2UnKTtcbiAgY29uc3QgcXVhbnRpdHlFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50ID0gaXRlbS5xdWVyeVNlbGVjdG9yKFxuICAgICcuY2FydC1pdGVtLXF1YW50aXR5JyxcbiAgKTtcbiAgY29uc3QgYXZhaWxhYmxlUHJvZHVjdFF1YW50aXR5ID0gcXVhbnRpdHlFbGVtZW50LmdldEF0dHJpYnV0ZShcbiAgICAnZGF0YS10YXJnZXQtYXZhaWxhYmxlLXF1YW50aXR5JyxcbiAgKTtcblxuICBjb25zdCBwcmljZSA9IHBhcnNlRmxvYXQocHJpY2VFbGVtZW50LnRleHRDb250ZW50KTtcbiAgY29uc3QgcXVhbnRpdHkgPSBwYXJzZUludChxdWFudGl0eUVsZW1lbnQudmFsdWUpO1xuICBjb25zdCB0b3RhbFByaWNlT25lRWxlbWVudCA9IHByaWNlICogcXVhbnRpdHk7XG4gIHRvdGFsUHJpY2UgKz0gdG90YWxQcmljZU9uZUVsZW1lbnQ7XG4gIHRvdGFsUXVhbnRpdHkgKz0gcXVhbnRpdHk7XG4gIHF1YW50aXR5RWxlbWVudC5tYXggPSBhdmFpbGFibGVQcm9kdWN0UXVhbnRpdHk7XG59KTtcblxudG90YWxQcmljZUVsZW1lbnQudGV4dENvbnRlbnQgPSBgJHt0b3RhbFByaWNlLnRvRml4ZWQoMil9JGA7XG50b3RhbFF1YW50aXR5RWxlbWVudC50ZXh0Q29udGVudCA9IHRvdGFsUXVhbnRpdHkudG9TdHJpbmcoKTtcblxuLy8gLS1hZGQgZGVsaXZlcnkgZm9ybSB3aGVuIGNyZWF0ZSBzaGlwIHJlcXVlc3QtLVxuY29uc3QgZGVsaXZlclRvU3RvcmVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FydC1kZWxpdmVyLXRvLXN0b3JlLWJ0bicpO1xuY29uc3QgY3JlYXRlU3RvcmVSZXF1ZXN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgJyNjYXJ0LWNyZWF0ZS1zdG9yZS1yZXF1ZXN0LWNvbnRhaW5lcicsXG4pIGFzIEhUTUxEaXZFbGVtZW50O1xuXG5kZWxpdmVyVG9TdG9yZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgY3JlYXRlU3RvcmVSZXF1ZXN0Q29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xufSk7XG5cbi8vIC0tZGVsZXRlIGNhcnQgaXRlbS0tXG5jb25zdCBkZWxldGVCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRlbGV0ZS1jYXJ0LWl0ZW0tYnRuJyk7XG5cbmRlbGV0ZUJ1dHRvbnMuZm9yRWFjaChlID0+IHtcbiAgZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICBpZiAoY29uZmlybSgnQXJlIHN1cmU/JykpIHtcbiAgICAgIGxldCBpZCA9IGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNhcnQtaXRlbS1pZCcpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL2NhcnQvZGVsZXRlLyR7aWR9YCwge1xuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgfSk7XG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufSk7XG5cbi8vIC0tc2hvdy9oaWRlIGZhdm9yaXRlIHN0b3JlIGluIGRyb3Bkb3duLS1cbmNvbnN0IGZhdm9yaXRlQ2hlY2tib3g6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAnI2NhcnQtZmF2b3JpdGUtc3RvcmUtY2hlY2tib3gnLFxuKTtcbmNvbnN0IHNlbGVjdFN0b3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcnQtc3RvcmUtc2VsZWN0Jyk7XG5jb25zdCBvcHRpb25zU3RvcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FydC1zdG9yZS1vcHRpb24nKTtcbmZhdm9yaXRlQ2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICBjb25zdCBzaG93RmF2b3JpdGVTdG9yZSA9IGZhdm9yaXRlQ2hlY2tib3guY2hlY2tlZDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnNTdG9yZS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGlzRmF2b3JpdGUgPSBvcHRpb25zU3RvcmVbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldC1mYXZvcml0ZScpO1xuXG4gICAgaWYgKHNob3dGYXZvcml0ZVN0b3JlICYmIGlzRmF2b3JpdGUgIT09ICdUcnVlJykge1xuICAgICAgKG9wdGlvbnNTdG9yZVtpXSBhcyBIVE1MT3B0aW9uRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9IGVsc2Uge1xuICAgICAgKG9wdGlvbnNTdG9yZVtpXSBhcyBIVE1MT3B0aW9uRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxuICB9XG59KTtcblxuY29uc3Qgc3RvcmVDYXRlZ29yeVNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAnI2NhcnQtc3RvcmUtcmVxdWVzdC1jYXRlZ29yeScsXG4pO1xuY29uc3Qgb3B0aW9ucyA9IHN0b3JlQ2F0ZWdvcnlTZWxlY3QucXVlcnlTZWxlY3RvckFsbCgnb3B0aW9uJyk7XG5jb25zb2xlLmxvZygnb3B0aW9ucycsIG9wdGlvbnMpO1xuXG5zdG9yZUNhdGVnb3J5U2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgY29uc29sZS5sb2coXG4gICAgJ2NsaWNrJyxcbiAgICBzdG9yZUNhdGVnb3J5U2VsZWN0Lm9wdGlvbnNbc3RvcmVDYXRlZ29yeVNlbGVjdC5zZWxlY3RlZEluZGV4XS50ZXh0LFxuICApO1xuXG4gIG9wdGlvbnMuZm9yRWFjaChlID0+IHtcbiAgICBpZiAoXG4gICAgICBlLnRleHRDb250ZW50ID09PVxuICAgICAgc3RvcmVDYXRlZ29yeVNlbGVjdC5vcHRpb25zW3N0b3JlQ2F0ZWdvcnlTZWxlY3Quc2VsZWN0ZWRJbmRleF0udGV4dFxuICAgICkge1xuICAgICAgY29uc3Qgc3RvcmVTZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FydC1zdG9yZS1zZWxlY3QnKTtcbiAgICAgIGNvbnN0IG9wdGlvbkNhdGVnb3J5ID0gSlNPTi5wYXJzZShcbiAgICAgICAgZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0LXN0b3JlLWNhdGVnb3J5LXN0b3JlJyksXG4gICAgICApO1xuICAgICAgY29uc29sZS5sb2coJ2JlZm9yZScsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXJ0LXN0b3JlLXNlbGVjdCcpKTtcblxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhcnQtc3RvcmUtc2VsZWN0JykuaW5uZXJIVE1MID0gJyc7XG4gICAgICBjb25zb2xlLmxvZygnYWZ0ZXInLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FydC1zdG9yZS1zZWxlY3QnKSk7XG5cbiAgICAgIGNvbnNvbGUubG9nKCdvcHRpb25DYXRlZ29yeScsIG9wdGlvbkNhdGVnb3J5KTtcbiAgICAgIGlmIChvcHRpb25DYXRlZ29yeSkge1xuICAgICAgICBvcHRpb25DYXRlZ29yeS5zdG9yZV9jYXRlZ29yeV9zdG9yZS5mb3JFYWNoKFxuICAgICAgICAgIChlOiB7c3RvcmVfaWQ6IG51bWJlcjsgc3RvcmVfbmFtZTogc3RyaW5nfSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3RvcmVTZWxlY3RPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlLmlkJywgZS5zdG9yZV9pZCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc3RvcmVTZWxlY3QnLCBzdG9yZVNlbGVjdCk7XG5cbiAgICAgICAgICAgIHN0b3JlU2VsZWN0T3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBlLnN0b3JlX2lkLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgc3RvcmVTZWxlY3RPcHRpb24udGV4dENvbnRlbnQgPSBlLnN0b3JlX25hbWU7XG4gICAgICAgICAgICBzdG9yZVNlbGVjdC5hcHBlbmRDaGlsZChzdG9yZVNlbGVjdE9wdGlvbik7XG4gICAgICAgICAgfSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufSk7XG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IHt9O1xuX193ZWJwYWNrX21vZHVsZXNfX1tcIi4vc3JjL2NhcnQudHNcIl0oKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==