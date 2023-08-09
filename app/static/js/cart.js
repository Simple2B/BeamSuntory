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
var priceElements = document.querySelectorAll('.cart-item-retail-price');
var quantityElements = document.querySelectorAll('.cart-item-quantity');
var totalPriceElement = document.querySelector('#cart-total-price');
var totalQuantityElement = document.querySelector('#cart-total-quantity');
var tableCartItems = document.querySelectorAll('.table-cart-item');
var totalPrice = 0;
var totalQuantity = 0;
tableCartItems.forEach(function (item) {
    var priceElement = item.querySelector('.cart-item-retail-price');
    var quantityElement = item.querySelector('.cart-item-quantity');
    var price = parseFloat(priceElement.textContent);
    var quantity = parseInt(quantityElement.value);
    var totalPriceOneElement = price * quantity;
    totalPrice += totalPriceOneElement;
    totalQuantity += quantity;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LG9CQUFvQixDQUFDLENBQUM7QUFDakUsSUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDckUsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFO0lBQzFDLElBQU0saUJBQWlCLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDO0lBRW5ELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzVDLElBQU0sVUFBVSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUV4RSxJQUFJLGlCQUFpQixJQUFJLFVBQVUsS0FBSyxNQUFNLEVBQUU7WUFDN0MsWUFBWSxDQUFDLENBQUMsQ0FBdUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztTQUMvRDthQUFNO1lBQ0osWUFBWSxDQUFDLENBQUMsQ0FBdUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztTQUNoRTtLQUNGO0FBQ0gsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7O1VFckVIO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGF0aWMvLi9zcmMvY2FydC50cyIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gLS1jb3VudCB0b3RhbCBxdWFudGl0eSBhbmQgcHJpY2UtLVxuY29uc3QgcHJpY2VFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJ0LWl0ZW0tcmV0YWlsLXByaWNlJyk7XG5jb25zdCBxdWFudGl0eUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcnQtaXRlbS1xdWFudGl0eScpO1xuY29uc3QgdG90YWxQcmljZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FydC10b3RhbC1wcmljZScpO1xuY29uc3QgdG90YWxRdWFudGl0eUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FydC10b3RhbC1xdWFudGl0eScpO1xuY29uc3QgdGFibGVDYXJ0SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGUtY2FydC1pdGVtJyk7XG5sZXQgdG90YWxQcmljZSA9IDA7XG5sZXQgdG90YWxRdWFudGl0eSA9IDA7XG5cbnRhYmxlQ2FydEl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gIGNvbnN0IHByaWNlRWxlbWVudCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmNhcnQtaXRlbS1yZXRhaWwtcHJpY2UnKTtcbiAgY29uc3QgcXVhbnRpdHlFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50ID0gaXRlbS5xdWVyeVNlbGVjdG9yKFxuICAgICcuY2FydC1pdGVtLXF1YW50aXR5JyxcbiAgKTtcbiAgY29uc3QgcHJpY2UgPSBwYXJzZUZsb2F0KHByaWNlRWxlbWVudC50ZXh0Q29udGVudCk7XG4gIGNvbnN0IHF1YW50aXR5ID0gcGFyc2VJbnQocXVhbnRpdHlFbGVtZW50LnZhbHVlKTtcbiAgY29uc3QgdG90YWxQcmljZU9uZUVsZW1lbnQgPSBwcmljZSAqIHF1YW50aXR5O1xuICB0b3RhbFByaWNlICs9IHRvdGFsUHJpY2VPbmVFbGVtZW50O1xuICB0b3RhbFF1YW50aXR5ICs9IHF1YW50aXR5O1xufSk7XG5cbnRvdGFsUHJpY2VFbGVtZW50LnRleHRDb250ZW50ID0gYCR7dG90YWxQcmljZS50b0ZpeGVkKDIpfSRgO1xudG90YWxRdWFudGl0eUVsZW1lbnQudGV4dENvbnRlbnQgPSB0b3RhbFF1YW50aXR5LnRvU3RyaW5nKCk7XG5cbi8vIC0tYWRkIGRlbGl2ZXJ5IGZvcm0gd2hlbiBjcmVhdGUgc2hpcCByZXF1ZXN0LS1cbmNvbnN0IGRlbGl2ZXJUb1N0b3JlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcnQtZGVsaXZlci10by1zdG9yZS1idG4nKTtcbmNvbnN0IGNyZWF0ZVN0b3JlUmVxdWVzdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICcjY2FydC1jcmVhdGUtc3RvcmUtcmVxdWVzdC1jb250YWluZXInLFxuKSBhcyBIVE1MRGl2RWxlbWVudDtcblxuZGVsaXZlclRvU3RvcmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGNyZWF0ZVN0b3JlUmVxdWVzdENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbn0pO1xuXG4vLyAtLWRlbGV0ZSBjYXJ0IGl0ZW0tLVxuY29uc3QgZGVsZXRlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZWxldGUtY2FydC1pdGVtLWJ0bicpO1xuXG5kZWxldGVCdXR0b25zLmZvckVhY2goZSA9PiB7XG4gIGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgaWYgKGNvbmZpcm0oJ0FyZSBzdXJlPycpKSB7XG4gICAgICBsZXQgaWQgPSBlLmdldEF0dHJpYnV0ZSgnZGF0YS1jYXJ0LWl0ZW0taWQnKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9jYXJ0L2RlbGV0ZS8ke2lkfWAsIHtcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgIH0pO1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn0pO1xuXG4vLyAtLXNob3cvaGlkZSBmYXZvcml0ZSBzdG9yZSBpbiBkcm9wZG93bi0tXG5jb25zdCBmYXZvcml0ZUNoZWNrYm94OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgJyNjYXJ0LWZhdm9yaXRlLXN0b3JlLWNoZWNrYm94Jyxcbik7XG5jb25zdCBzZWxlY3RTdG9yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJ0LXN0b3JlLXNlbGVjdCcpO1xuY29uc3Qgb3B0aW9uc1N0b3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcnQtc3RvcmUtb3B0aW9uJyk7XG5mYXZvcml0ZUNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgY29uc3Qgc2hvd0Zhdm9yaXRlU3RvcmUgPSBmYXZvcml0ZUNoZWNrYm94LmNoZWNrZWQ7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRpb25zU3RvcmUubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBpc0Zhdm9yaXRlID0gb3B0aW9uc1N0b3JlW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtZmF2b3JpdGUnKTtcblxuICAgIGlmIChzaG93RmF2b3JpdGVTdG9yZSAmJiBpc0Zhdm9yaXRlICE9PSAnVHJ1ZScpIHtcbiAgICAgIChvcHRpb25zU3RvcmVbaV0gYXMgSFRNTE9wdGlvbkVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIChvcHRpb25zU3RvcmVbaV0gYXMgSFRNTE9wdGlvbkVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH1cbiAgfVxufSk7XG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IHt9O1xuX193ZWJwYWNrX21vZHVsZXNfX1tcIi4vc3JjL2NhcnQudHNcIl0oKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==