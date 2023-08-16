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
            ;
            optionsStore[i].style.display = 'none';
        }
        else {
            ;
            optionsStore[i].style.display = 'block';
        }
    }
});
var storeCategorySelect = document.querySelector('#cart-store-request-category');
var options = storeCategorySelect.querySelectorAll('option');
console.log('options', options);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1lBRXJGLFFBQVEsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxTQUFTLEdBQUcsRUFBRTtZQUMzRCxJQUFJLGNBQWMsRUFBRTtnQkFDaEIsY0FBYyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQTJDO29CQUNwRixJQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO29CQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO29CQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxhQUFXLENBQUM7b0JBRXZDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDOUQsaUJBQWlCLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxVQUFVO29CQUM1QyxhQUFXLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDO2dCQUM5QyxDQUFDLENBQUM7YUFDTDtTQUNKO0lBQ0wsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDOzs7Ozs7OztVRTdGRjtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RhdGljLy4vc3JjL2NhcnQudHMiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIC0tY291bnQgdG90YWwgcXVhbnRpdHkgYW5kIHByaWNlLS1cbmNvbnN0IHByaWNlRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FydC1pdGVtLXByaWNlJylcbmNvbnN0IHF1YW50aXR5RWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FydC1pdGVtLXF1YW50aXR5JylcbmNvbnN0IHRvdGFsUHJpY2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcnQtdG90YWwtcHJpY2UnKVxuY29uc3QgdG90YWxRdWFudGl0eUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FydC10b3RhbC1xdWFudGl0eScpXG5jb25zdCB0YWJsZUNhcnRJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZS1jYXJ0LWl0ZW0nKVxuXG5sZXQgdG90YWxQcmljZSA9IDBcbmxldCB0b3RhbFF1YW50aXR5ID0gMFxuXG50YWJsZUNhcnRJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgY29uc3QgcHJpY2VFbGVtZW50ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuY2FydC1pdGVtLXByaWNlJylcbiAgICBjb25zdCBxdWFudGl0eUVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5jYXJ0LWl0ZW0tcXVhbnRpdHknKVxuICAgIGNvbnN0IGF2YWlsYWJsZVByb2R1Y3RRdWFudGl0eSA9IHF1YW50aXR5RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0LWF2YWlsYWJsZS1xdWFudGl0eScpXG5cbiAgICBjb25zdCBwcmljZSA9IHBhcnNlRmxvYXQocHJpY2VFbGVtZW50LnRleHRDb250ZW50KVxuICAgIGNvbnN0IHF1YW50aXR5ID0gcGFyc2VJbnQocXVhbnRpdHlFbGVtZW50LnZhbHVlKVxuICAgIGNvbnN0IHRvdGFsUHJpY2VPbmVFbGVtZW50ID0gcHJpY2UgKiBxdWFudGl0eVxuICAgIHRvdGFsUHJpY2UgKz0gdG90YWxQcmljZU9uZUVsZW1lbnRcbiAgICB0b3RhbFF1YW50aXR5ICs9IHF1YW50aXR5XG4gICAgcXVhbnRpdHlFbGVtZW50Lm1heCA9IGF2YWlsYWJsZVByb2R1Y3RRdWFudGl0eVxufSlcblxudG90YWxQcmljZUVsZW1lbnQudGV4dENvbnRlbnQgPSBgJHt0b3RhbFByaWNlLnRvRml4ZWQoMil9JGBcbnRvdGFsUXVhbnRpdHlFbGVtZW50LnRleHRDb250ZW50ID0gdG90YWxRdWFudGl0eS50b1N0cmluZygpXG5cbi8vIC0tYWRkIGRlbGl2ZXJ5IGZvcm0gd2hlbiBjcmVhdGUgc2hpcCByZXF1ZXN0LS1cbmNvbnN0IGRlbGl2ZXJUb1N0b3JlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcnQtZGVsaXZlci10by1zdG9yZS1idG4nKVxuY29uc3QgY3JlYXRlU3RvcmVSZXF1ZXN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcnQtY3JlYXRlLXN0b3JlLXJlcXVlc3QtY29udGFpbmVyJykgYXMgSFRNTERpdkVsZW1lbnRcblxuZGVsaXZlclRvU3RvcmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY3JlYXRlU3RvcmVSZXF1ZXN0Q29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG59KVxuXG4vLyAtLWRlbGV0ZSBjYXJ0IGl0ZW0tLVxuY29uc3QgZGVsZXRlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZWxldGUtY2FydC1pdGVtLWJ0bicpXG5cbmRlbGV0ZUJ1dHRvbnMuZm9yRWFjaCgoZSkgPT4ge1xuICAgIGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmIChjb25maXJtKCdBcmUgc3VyZT8nKSkge1xuICAgICAgICAgICAgbGV0IGlkID0gZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2FydC1pdGVtLWlkJylcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9jYXJ0L2RlbGV0ZS8ke2lkfWAsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG59KVxuXG4vLyAtLXNob3cvaGlkZSBmYXZvcml0ZSBzdG9yZSBpbiBkcm9wZG93bi0tXG5jb25zdCBmYXZvcml0ZUNoZWNrYm94OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcnQtZmF2b3JpdGUtc3RvcmUtY2hlY2tib3gnKVxuY29uc3Qgc2VsZWN0U3RvcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FydC1zdG9yZS1zZWxlY3QnKVxuY29uc3Qgb3B0aW9uc1N0b3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcnQtc3RvcmUtb3B0aW9uJylcbmZhdm9yaXRlQ2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgIGNvbnN0IHNob3dGYXZvcml0ZVN0b3JlID0gZmF2b3JpdGVDaGVja2JveC5jaGVja2VkXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnNTdG9yZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBpc0Zhdm9yaXRlID0gb3B0aW9uc1N0b3JlW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtZmF2b3JpdGUnKVxuXG4gICAgICAgIGlmIChzaG93RmF2b3JpdGVTdG9yZSAmJiBpc0Zhdm9yaXRlICE9PSAnVHJ1ZScpIHtcbiAgICAgICAgICAgIDsob3B0aW9uc1N0b3JlW2ldIGFzIEhUTUxPcHRpb25FbGVtZW50KS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICA7KG9wdGlvbnNTdG9yZVtpXSBhcyBIVE1MT3B0aW9uRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgICAgICAgfVxuICAgIH1cbn0pXG5cbmNvbnN0IHN0b3JlQ2F0ZWdvcnlTZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcnQtc3RvcmUtcmVxdWVzdC1jYXRlZ29yeScpXG5jb25zdCBvcHRpb25zID0gc3RvcmVDYXRlZ29yeVNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKCdvcHRpb24nKVxuY29uc29sZS5sb2coJ29wdGlvbnMnLCBvcHRpb25zKVxuXG5zdG9yZUNhdGVnb3J5U2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICBvcHRpb25zLmZvckVhY2goKGUpID0+IHtcbiAgICAgICAgaWYgKGUudGV4dENvbnRlbnQgPT09IHN0b3JlQ2F0ZWdvcnlTZWxlY3Qub3B0aW9uc1tzdG9yZUNhdGVnb3J5U2VsZWN0LnNlbGVjdGVkSW5kZXhdLnRleHQpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0b3JlU2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcnQtc3RvcmUtc2VsZWN0JylcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbkNhdGVnb3J5ID0gSlNPTi5wYXJzZShlLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtc3RvcmUtY2F0ZWdvcnktc3RvcmUnKSlcblxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhcnQtc3RvcmUtc2VsZWN0JykuaW5uZXJIVE1MID0gJydcbiAgICAgICAgICAgIGlmIChvcHRpb25DYXRlZ29yeSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbkNhdGVnb3J5LnN0b3JlX2NhdGVnb3J5X3N0b3JlLmZvckVhY2goKGU6IHsgc3RvcmVfaWQ6IG51bWJlcjsgc3RvcmVfbmFtZTogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RvcmVTZWxlY3RPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZS5pZCcsIGUuc3RvcmVfaWQpXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdG9yZVNlbGVjdCcsIHN0b3JlU2VsZWN0KVxuXG4gICAgICAgICAgICAgICAgICAgIHN0b3JlU2VsZWN0T3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBlLnN0b3JlX2lkLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICAgICAgICAgIHN0b3JlU2VsZWN0T3B0aW9uLnRleHRDb250ZW50ID0gZS5zdG9yZV9uYW1lXG4gICAgICAgICAgICAgICAgICAgIHN0b3JlU2VsZWN0LmFwcGVuZENoaWxkKHN0b3JlU2VsZWN0T3B0aW9uKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxufSlcbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG5fX3dlYnBhY2tfbW9kdWxlc19fW1wiLi9zcmMvY2FydC50c1wiXSgpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9