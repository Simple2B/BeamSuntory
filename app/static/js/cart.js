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
        console.log('optionsStore[i]: ', optionsStore[i]);
        var isFavorite = optionsStore[i].getAttribute('data-target-favorite');
        console.log('isFavorite: ', isFavorite);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LG9CQUFvQixDQUFDLENBQUM7QUFDakUsSUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDckUsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFO0lBQzFDLElBQU0saUJBQWlCLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDO0lBRW5ELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEQsSUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRXhDLElBQUksaUJBQWlCLElBQUksVUFBVSxLQUFLLE1BQU0sRUFBRTtZQUM3QyxZQUFZLENBQUMsQ0FBQyxDQUF1QixDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1NBQy9EO2FBQU07WUFDSixZQUFZLENBQUMsQ0FBQyxDQUF1QixDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1NBQ2hFO0tBQ0Y7QUFDSCxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7VUV2RUg7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3N0YXRpYy8uL3NyYy9jYXJ0LnRzIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyAtLWNvdW50IHRvdGFsIHF1YW50aXR5IGFuZCBwcmljZS0tXG5jb25zdCBwcmljZUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcnQtaXRlbS1yZXRhaWwtcHJpY2UnKTtcbmNvbnN0IHF1YW50aXR5RWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FydC1pdGVtLXF1YW50aXR5Jyk7XG5jb25zdCB0b3RhbFByaWNlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJ0LXRvdGFsLXByaWNlJyk7XG5jb25zdCB0b3RhbFF1YW50aXR5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJ0LXRvdGFsLXF1YW50aXR5Jyk7XG5jb25zdCB0YWJsZUNhcnRJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZS1jYXJ0LWl0ZW0nKTtcbmxldCB0b3RhbFByaWNlID0gMDtcbmxldCB0b3RhbFF1YW50aXR5ID0gMDtcblxudGFibGVDYXJ0SXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgY29uc3QgcHJpY2VFbGVtZW50ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuY2FydC1pdGVtLXJldGFpbC1wcmljZScpO1xuICBjb25zdCBxdWFudGl0eUVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoXG4gICAgJy5jYXJ0LWl0ZW0tcXVhbnRpdHknLFxuICApO1xuICBjb25zdCBwcmljZSA9IHBhcnNlRmxvYXQocHJpY2VFbGVtZW50LnRleHRDb250ZW50KTtcbiAgY29uc3QgcXVhbnRpdHkgPSBwYXJzZUludChxdWFudGl0eUVsZW1lbnQudmFsdWUpO1xuICBjb25zdCB0b3RhbFByaWNlT25lRWxlbWVudCA9IHByaWNlICogcXVhbnRpdHk7XG4gIHRvdGFsUHJpY2UgKz0gdG90YWxQcmljZU9uZUVsZW1lbnQ7XG4gIHRvdGFsUXVhbnRpdHkgKz0gcXVhbnRpdHk7XG59KTtcblxudG90YWxQcmljZUVsZW1lbnQudGV4dENvbnRlbnQgPSBgJHt0b3RhbFByaWNlLnRvRml4ZWQoMil9JGA7XG50b3RhbFF1YW50aXR5RWxlbWVudC50ZXh0Q29udGVudCA9IHRvdGFsUXVhbnRpdHkudG9TdHJpbmcoKTtcblxuLy8gLS1hZGQgZGVsaXZlcnkgZm9ybSB3aGVuIGNyZWF0ZSBzaGlwIHJlcXVlc3QtLVxuY29uc3QgZGVsaXZlclRvU3RvcmVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FydC1kZWxpdmVyLXRvLXN0b3JlLWJ0bicpO1xuY29uc3QgY3JlYXRlU3RvcmVSZXF1ZXN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgJyNjYXJ0LWNyZWF0ZS1zdG9yZS1yZXF1ZXN0LWNvbnRhaW5lcicsXG4pIGFzIEhUTUxEaXZFbGVtZW50O1xuXG5kZWxpdmVyVG9TdG9yZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgY3JlYXRlU3RvcmVSZXF1ZXN0Q29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xufSk7XG5cbi8vIC0tZGVsZXRlIGNhcnQgaXRlbS0tXG5jb25zdCBkZWxldGVCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRlbGV0ZS1jYXJ0LWl0ZW0tYnRuJyk7XG5cbmRlbGV0ZUJ1dHRvbnMuZm9yRWFjaChlID0+IHtcbiAgZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICBpZiAoY29uZmlybSgnQXJlIHN1cmU/JykpIHtcbiAgICAgIGxldCBpZCA9IGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNhcnQtaXRlbS1pZCcpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL2NhcnQvZGVsZXRlLyR7aWR9YCwge1xuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgfSk7XG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufSk7XG5cbi8vIC0tc2hvdy9oaWRlIGZhdm9yaXRlIHN0b3JlIGluIGRyb3Bkb3duLS1cbmNvbnN0IGZhdm9yaXRlQ2hlY2tib3g6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAnI2NhcnQtZmF2b3JpdGUtc3RvcmUtY2hlY2tib3gnLFxuKTtcbmNvbnN0IHNlbGVjdFN0b3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcnQtc3RvcmUtc2VsZWN0Jyk7XG5jb25zdCBvcHRpb25zU3RvcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FydC1zdG9yZS1vcHRpb24nKTtcbmZhdm9yaXRlQ2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICBjb25zdCBzaG93RmF2b3JpdGVTdG9yZSA9IGZhdm9yaXRlQ2hlY2tib3guY2hlY2tlZDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnNTdG9yZS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnNvbGUubG9nKCdvcHRpb25zU3RvcmVbaV06ICcsIG9wdGlvbnNTdG9yZVtpXSk7XG4gICAgY29uc3QgaXNGYXZvcml0ZSA9IG9wdGlvbnNTdG9yZVtpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0LWZhdm9yaXRlJyk7XG4gICAgY29uc29sZS5sb2coJ2lzRmF2b3JpdGU6ICcsIGlzRmF2b3JpdGUpO1xuXG4gICAgaWYgKHNob3dGYXZvcml0ZVN0b3JlICYmIGlzRmF2b3JpdGUgIT09ICdUcnVlJykge1xuICAgICAgKG9wdGlvbnNTdG9yZVtpXSBhcyBIVE1MT3B0aW9uRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9IGVsc2Uge1xuICAgICAgKG9wdGlvbnNTdG9yZVtpXSBhcyBIVE1MT3B0aW9uRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxuICB9XG59KTtcbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG5fX3dlYnBhY2tfbW9kdWxlc19fW1wiLi9zcmMvY2FydC50c1wiXSgpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9