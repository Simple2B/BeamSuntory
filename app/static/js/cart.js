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
var priceElements = document.querySelectorAll('.cart-item-retail-price');
var quantityElements = document.querySelectorAll('.cart-item-quantity');
var totalPriceElement = document.querySelector('#cart-total-price');
var totalQuantityElement = document.querySelector('#cart-total-quantity');
var tableCartItems = document.querySelectorAll('.table-cart-item');
tableCartItems.forEach(function (item) {
    console.log('item', item);
});
countTotalsPriceQuantity();
// priceElements.forEach((priceElement) => {
//   const price = parseFloat(priceElement.textContent);
//   totalPrice += price;
// });
quantityElements.forEach(function (quantityElement) {
    quantityElement.addEventListener('change', function (e) {
        console.log(e.target);
        console.log('changed');
        countTotalsPriceQuantity();
    });
});
function countTotalsPriceQuantity() {
    var totalPrice = 0;
    var totalQuantity = 0;
    quantityElements.forEach(function (quantityElement) {
        console.log('value quantity', quantityElement.value);
        var quantity = parseInt(quantityElement.value);
        totalQuantity += quantity;
    });
    priceElements.forEach(function (priceElement) {
        var price = parseFloat(priceElement.textContent);
        totalPrice += price;
    });
    totalPriceElement.textContent = "".concat(totalPrice.toFixed(2), "$");
    totalQuantityElement.textContent = totalQuantity.toString();
}
var deliverToStoreBtn = document.querySelector('#cart-deliver-to-store-btn');
var createStoreRequestContainer = document.querySelector('#cart-create-store-request-container');
deliverToStoreBtn.addEventListener('click', function () {
    // createStoreRequestContainer.classList.remove('dropdown-close');
    // createStoreRequestContainer.classList.add('dropdown-open');
    createStoreRequestContainer.style.display = 'block';
});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFwQix3QkFBb0I7b0JBQ2xCLEVBQUUsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLENBQUM7b0JBQzVCLHFCQUFNLEtBQUssQ0FBQyx1QkFBZ0IsRUFBRSxDQUFFLEVBQUU7NEJBQ2pELE1BQU0sRUFBRSxRQUFRO3lCQUNqQixDQUFDOztvQkFGSSxRQUFRLEdBQUcsU0FFZjtvQkFDRixJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFO3dCQUMxQixRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7cUJBQ25COzs7OztTQUVKLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDOzs7Ozs7OztVRTFFSDtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RhdGljLy4vc3JjL2NhcnQudHMiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHByaWNlRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FydC1pdGVtLXJldGFpbC1wcmljZScpO1xuY29uc3QgcXVhbnRpdHlFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJ0LWl0ZW0tcXVhbnRpdHknKTtcbmNvbnN0IHRvdGFsUHJpY2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcnQtdG90YWwtcHJpY2UnKTtcbmNvbnN0IHRvdGFsUXVhbnRpdHlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcnQtdG90YWwtcXVhbnRpdHknKTtcbmNvbnN0IHRhYmxlQ2FydEl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlLWNhcnQtaXRlbScpO1xuXG50YWJsZUNhcnRJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gIGNvbnNvbGUubG9nKCdpdGVtJywgaXRlbSk7XG59KTtcblxuXG5jb3VudFRvdGFsc1ByaWNlUXVhbnRpdHkoKTtcblxuLy8gcHJpY2VFbGVtZW50cy5mb3JFYWNoKChwcmljZUVsZW1lbnQpID0+IHtcbi8vICAgY29uc3QgcHJpY2UgPSBwYXJzZUZsb2F0KHByaWNlRWxlbWVudC50ZXh0Q29udGVudCk7XG4vLyAgIHRvdGFsUHJpY2UgKz0gcHJpY2U7XG4vLyB9KTtcblxucXVhbnRpdHlFbGVtZW50cy5mb3JFYWNoKChxdWFudGl0eUVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQpID0+IHtcbiAgcXVhbnRpdHlFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XG4gICAgY29uc29sZS5sb2coZS50YXJnZXQpO1xuICAgIGNvbnNvbGUubG9nKCdjaGFuZ2VkJyk7XG4gICAgY291bnRUb3RhbHNQcmljZVF1YW50aXR5KCk7XG4gIH0pO1xufSk7XG5cbmZ1bmN0aW9uIGNvdW50VG90YWxzUHJpY2VRdWFudGl0eSgpIHtcbiAgbGV0IHRvdGFsUHJpY2UgPSAwO1xuICBsZXQgdG90YWxRdWFudGl0eSA9IDA7XG4gIFxuICBxdWFudGl0eUVsZW1lbnRzLmZvckVhY2goKHF1YW50aXR5RWxlbWVudDogSFRNTElucHV0RWxlbWVudCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCd2YWx1ZSBxdWFudGl0eScsIHF1YW50aXR5RWxlbWVudC52YWx1ZSk7XG4gICAgY29uc3QgcXVhbnRpdHkgPSBwYXJzZUludChxdWFudGl0eUVsZW1lbnQudmFsdWUpO1xuICAgIHRvdGFsUXVhbnRpdHkgKz0gcXVhbnRpdHk7XG4gIH0pO1xuICBcbiAgcHJpY2VFbGVtZW50cy5mb3JFYWNoKChwcmljZUVsZW1lbnQpID0+IHtcbiAgICBjb25zdCBwcmljZSA9IHBhcnNlRmxvYXQocHJpY2VFbGVtZW50LnRleHRDb250ZW50KTtcbiAgICB0b3RhbFByaWNlICs9IHByaWNlO1xuICB9KTtcblxuICB0b3RhbFByaWNlRWxlbWVudC50ZXh0Q29udGVudCA9IGAke3RvdGFsUHJpY2UudG9GaXhlZCgyKX0kYDtcbiAgdG90YWxRdWFudGl0eUVsZW1lbnQudGV4dENvbnRlbnQgPSB0b3RhbFF1YW50aXR5LnRvU3RyaW5nKCk7XG59XG5cblxuXG5cblxuY29uc3QgZGVsaXZlclRvU3RvcmVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FydC1kZWxpdmVyLXRvLXN0b3JlLWJ0bicpO1xuY29uc3QgY3JlYXRlU3RvcmVSZXF1ZXN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgJyNjYXJ0LWNyZWF0ZS1zdG9yZS1yZXF1ZXN0LWNvbnRhaW5lcicsXG4pIGFzIEhUTUxEaXZFbGVtZW50O1xuXG5kZWxpdmVyVG9TdG9yZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgLy8gY3JlYXRlU3RvcmVSZXF1ZXN0Q29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3Bkb3duLWNsb3NlJyk7XG4gIC8vIGNyZWF0ZVN0b3JlUmVxdWVzdENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdkcm9wZG93bi1vcGVuJyk7XG4gIGNyZWF0ZVN0b3JlUmVxdWVzdENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbn0pO1xuXG5jb25zdCBkZWxldGVCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRlbGV0ZS1jYXJ0LWl0ZW0tYnRuJyk7XG5cbmRlbGV0ZUJ1dHRvbnMuZm9yRWFjaChlID0+IHtcbiAgZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICBpZiAoY29uZmlybSgnQXJlIHN1cmU/JykpIHtcbiAgICAgIGxldCBpZCA9IGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNhcnQtaXRlbS1pZCcpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL2NhcnQvZGVsZXRlLyR7aWR9YCwge1xuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgfSk7XG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufSk7XG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IHt9O1xuX193ZWJwYWNrX21vZHVsZXNfX1tcIi4vc3JjL2NhcnQudHNcIl0oKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==