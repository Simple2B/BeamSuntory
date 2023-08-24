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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvY2FydC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxpQkFnSUE7QUFqSUEscUNBQXFDO0FBQ3JDLElBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyx5QkFBeUIsQ0FBQztBQUMxRSxJQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQztBQUN6RSxJQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUM7QUFDckUsSUFBTSxvQkFBb0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDO0FBQzNFLElBQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQztBQUVwRSxJQUFJLFVBQVUsR0FBRyxDQUFDO0FBQ2xCLElBQUksYUFBYSxHQUFHLENBQUM7QUFFckIsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7SUFDeEIsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQztJQUNsRSxJQUFNLGVBQWUsR0FBcUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQztJQUNuRixJQUFNLHdCQUF3QixHQUFHLGVBQWUsQ0FBQyxZQUFZLENBQUMsZ0NBQWdDLENBQUM7SUFFL0YsSUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUM7SUFDbEQsSUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUM7SUFDaEQsSUFBTSxvQkFBb0IsR0FBRyxLQUFLLEdBQUcsUUFBUTtJQUM3QyxVQUFVLElBQUksb0JBQW9CO0lBQ2xDLGFBQWEsSUFBSSxRQUFRO0lBQ3pCLGVBQWUsQ0FBQyxHQUFHLEdBQUcsd0JBQXdCO0FBQ2xELENBQUMsQ0FBQztBQUVGLGlCQUFpQixDQUFDLFdBQVcsR0FBRyxVQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQUc7QUFDM0Qsb0JBQW9CLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQyxRQUFRLEVBQUU7QUFFM0QsaURBQWlEO0FBQ2pELElBQU0saUJBQWlCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyw0QkFBNEIsQ0FBQztBQUM5RSxJQUFNLDJCQUEyQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsc0NBQXNDLENBQW1CO0FBRXBILGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtJQUN4QywyQkFBMkIsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU87QUFDdkQsQ0FBQyxDQUFDO0FBRUYsdUJBQXVCO0FBQ3ZCLElBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyx1QkFBdUIsQ0FBQztBQUV4RSxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQztJQUNwQixDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFOzs7Ozt5QkFDcEIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFwQix3QkFBb0I7b0JBQ2hCLEVBQUUsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDO29CQUMzQixxQkFBTSxLQUFLLENBQUMsdUJBQWdCLEVBQUUsQ0FBRSxFQUFFOzRCQUMvQyxNQUFNLEVBQUUsUUFBUTt5QkFDbkIsQ0FBQzs7b0JBRkksUUFBUSxHQUFHLFNBRWY7b0JBQ0YsSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJLEdBQUcsRUFBRTt3QkFDeEIsUUFBUSxDQUFDLE1BQU0sRUFBRTtxQkFDcEI7Ozs7O1NBRVIsQ0FBQztBQUNOLENBQUMsQ0FBQztBQUVGLDJDQUEyQztBQUMzQyxJQUFNLGdCQUFnQixHQUFxQixRQUFRLENBQUMsYUFBYSxDQUFDLCtCQUErQixDQUFDO0FBQ2xHLElBQU0sV0FBVyxHQUFzQixRQUFRLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDO0FBQ25GLElBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQztBQUNwRSxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUU7SUFDeEMsSUFBTSxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPO0lBRWxELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzFDLElBQU0sVUFBVSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQUM7UUFFdkUsSUFBSSxpQkFBaUIsSUFBSSxVQUFVLEtBQUssTUFBTSxFQUFFO1lBQzVDLENBQUM7WUFBQyxZQUFZLENBQUMsQ0FBQyxDQUF1QixDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTTtTQUNqRTthQUFNO1lBQ0gsQ0FBQztZQUFDLFlBQVksQ0FBQyxDQUFDLENBQXVCLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPO1NBQ2xFO0tBQ0o7QUFDTCxDQUFDLENBQUM7QUFFRixJQUFNLG1CQUFtQixHQUFzQixRQUFRLENBQUMsYUFBYSxDQUFDLHFDQUFxQyxDQUFDO0FBQzVHLElBQU0sT0FBTyxHQUFHLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQztBQUU5RCxtQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUU7SUFDM0MsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUM7UUFDZCxJQUFJLENBQUMsQ0FBQyxXQUFXLEtBQUssbUJBQW1CLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksRUFBRTtZQUN2RixJQUFNLGFBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDO1lBQ2hFLElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1lBRXJGLFFBQVEsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxTQUFTLEdBQUcsRUFBRTtZQUMzRCxJQUFJLGNBQWMsRUFBRTtnQkFDaEIsY0FBYyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQTJDO29CQUNwRixJQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO29CQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO29CQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxhQUFXLENBQUM7b0JBRXZDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDOUQsaUJBQWlCLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxVQUFVO29CQUM1QyxhQUFXLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDO2dCQUM5QyxDQUFDLENBQUM7YUFDTDtTQUNKO0lBQ0wsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDO0FBRUYsb0NBQW9DO0FBQ3BDLElBQU0sc0JBQXNCLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUNBQWlDLENBQUM7QUFFMUcsc0JBQXNCLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFO0lBQzlDLElBQU0sc0JBQXNCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQztJQUM5RSxJQUFNLHNCQUFzQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQ3JDLHNCQUFzQixDQUFDLFlBQVksQ0FBQyx1Q0FBdUMsQ0FBQyxDQUMvRTtJQUVELElBQU0sdUJBQXVCLEdBQUcsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDO0lBQzlFLElBQU0sZUFBZSxHQUFHLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUM7SUFFOUQsSUFBSSxzQkFBc0IsQ0FBQyxPQUFPLEVBQUU7UUFDaEMsSUFBTSxzQkFBc0IsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUUsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztRQUMxRixJQUFNLGNBQWMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxlQUFlLEVBQUUsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztRQUN6RixzQkFBc0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztRQUNqRCx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSTtRQUNyQixDQUFDLENBQUM7UUFDRixXQUFXLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQztRQUN2QyxXQUFXLENBQUMsS0FBSyxHQUFHLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtRQUN4RCxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUM7S0FDMUQ7U0FBTTtRQUNILHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ3BELFdBQVcsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDcEUsbUJBQW1CLENBQUMsV0FBVyxDQUFDLHVCQUF1QixDQUFDLHVCQUF1QixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM1Rix1QkFBdUIsQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ1QsQ0FBQyxDQUFDLFFBQVEsR0FBRyxLQUFLO2FBQ3JCO1FBQ0wsQ0FBQyxDQUFDO1FBQ0YsV0FBVyxDQUFDLGFBQWEsR0FBRyxDQUFDO1FBQzdCLG1CQUFtQixDQUFDLGFBQWEsR0FBRyxDQUFDO0tBQ3hDO0FBQ0wsQ0FBQyxDQUFDOzs7Ozs7OztVRWhJRjtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RhdGljLy4vc3JjL2NhcnQudHMiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIC0tY291bnQgdG90YWwgcXVhbnRpdHkgYW5kIHByaWNlLS1cbmNvbnN0IHByaWNlRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FydC1pdGVtLXJldGFpbF9wcmljZScpXG5jb25zdCBxdWFudGl0eUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcnQtaXRlbS1xdWFudGl0eScpXG5jb25zdCB0b3RhbFByaWNlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJ0LXRvdGFsLXByaWNlJylcbmNvbnN0IHRvdGFsUXVhbnRpdHlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcnQtdG90YWwtcXVhbnRpdHknKVxuY29uc3QgdGFibGVDYXJ0SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGUtY2FydC1pdGVtJylcblxubGV0IHRvdGFsUHJpY2UgPSAwXG5sZXQgdG90YWxRdWFudGl0eSA9IDBcblxudGFibGVDYXJ0SXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGNvbnN0IHByaWNlRWxlbWVudCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmNhcnQtaXRlbS1yZXRhaWxfcHJpY2UnKVxuICAgIGNvbnN0IHF1YW50aXR5RWxlbWVudDogSFRNTElucHV0RWxlbWVudCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmNhcnQtaXRlbS1xdWFudGl0eScpXG4gICAgY29uc3QgYXZhaWxhYmxlUHJvZHVjdFF1YW50aXR5ID0gcXVhbnRpdHlFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtYXZhaWxhYmxlLXF1YW50aXR5JylcblxuICAgIGNvbnN0IHByaWNlID0gcGFyc2VGbG9hdChwcmljZUVsZW1lbnQudGV4dENvbnRlbnQpXG4gICAgY29uc3QgcXVhbnRpdHkgPSBwYXJzZUludChxdWFudGl0eUVsZW1lbnQudmFsdWUpXG4gICAgY29uc3QgdG90YWxQcmljZU9uZUVsZW1lbnQgPSBwcmljZSAqIHF1YW50aXR5XG4gICAgdG90YWxQcmljZSArPSB0b3RhbFByaWNlT25lRWxlbWVudFxuICAgIHRvdGFsUXVhbnRpdHkgKz0gcXVhbnRpdHlcbiAgICBxdWFudGl0eUVsZW1lbnQubWF4ID0gYXZhaWxhYmxlUHJvZHVjdFF1YW50aXR5XG59KVxuXG50b3RhbFByaWNlRWxlbWVudC50ZXh0Q29udGVudCA9IGAke3RvdGFsUHJpY2UudG9GaXhlZCgyKX0kYFxudG90YWxRdWFudGl0eUVsZW1lbnQudGV4dENvbnRlbnQgPSB0b3RhbFF1YW50aXR5LnRvU3RyaW5nKClcblxuLy8gLS1hZGQgZGVsaXZlcnkgZm9ybSB3aGVuIGNyZWF0ZSBzaGlwIHJlcXVlc3QtLVxuY29uc3QgZGVsaXZlclRvU3RvcmVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FydC1kZWxpdmVyLXRvLXN0b3JlLWJ0bicpXG5jb25zdCBjcmVhdGVTdG9yZVJlcXVlc3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FydC1jcmVhdGUtc3RvcmUtcmVxdWVzdC1jb250YWluZXInKSBhcyBIVE1MRGl2RWxlbWVudFxuXG5kZWxpdmVyVG9TdG9yZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjcmVhdGVTdG9yZVJlcXVlc3RDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbn0pXG5cbi8vIC0tZGVsZXRlIGNhcnQgaXRlbS0tXG5jb25zdCBkZWxldGVCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRlbGV0ZS1jYXJ0LWl0ZW0tYnRuJylcblxuZGVsZXRlQnV0dG9ucy5mb3JFYWNoKChlKSA9PiB7XG4gICAgZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKGNvbmZpcm0oJ0FyZSBzdXJlPycpKSB7XG4gICAgICAgICAgICBsZXQgaWQgPSBlLmdldEF0dHJpYnV0ZSgnZGF0YS1jYXJ0LWl0ZW0taWQnKVxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL2NhcnQvZGVsZXRlLyR7aWR9YCwge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbn0pXG5cbi8vIC0tc2hvdy9oaWRlIGZhdm9yaXRlIHN0b3JlIGluIGRyb3Bkb3duLS1cbmNvbnN0IGZhdm9yaXRlQ2hlY2tib3g6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FydC1mYXZvcml0ZS1zdG9yZS1jaGVja2JveCcpXG5jb25zdCBzdG9yZVNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FydC1zdG9yZS1zZWxlY3QnKVxuY29uc3Qgb3B0aW9uc1N0b3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcnQtc3RvcmUtb3B0aW9uJylcbmZhdm9yaXRlQ2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgIGNvbnN0IHNob3dGYXZvcml0ZVN0b3JlID0gZmF2b3JpdGVDaGVja2JveC5jaGVja2VkXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnNTdG9yZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBpc0Zhdm9yaXRlID0gb3B0aW9uc1N0b3JlW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtZmF2b3JpdGUnKVxuXG4gICAgICAgIGlmIChzaG93RmF2b3JpdGVTdG9yZSAmJiBpc0Zhdm9yaXRlICE9PSAnVHJ1ZScpIHtcbiAgICAgICAgICAgIDsob3B0aW9uc1N0b3JlW2ldIGFzIEhUTUxPcHRpb25FbGVtZW50KS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICA7KG9wdGlvbnNTdG9yZVtpXSBhcyBIVE1MT3B0aW9uRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgICAgICAgfVxuICAgIH1cbn0pXG5cbmNvbnN0IHN0b3JlQ2F0ZWdvcnlTZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcnQtc3RvcmUtcmVxdWVzdC1jYXRlZ29yeS1zZWxlY3QnKVxuY29uc3Qgb3B0aW9ucyA9IHN0b3JlQ2F0ZWdvcnlTZWxlY3QucXVlcnlTZWxlY3RvckFsbCgnb3B0aW9uJylcblxuc3RvcmVDYXRlZ29yeVNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgb3B0aW9ucy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgIGlmIChlLnRleHRDb250ZW50ID09PSBzdG9yZUNhdGVnb3J5U2VsZWN0Lm9wdGlvbnNbc3RvcmVDYXRlZ29yeVNlbGVjdC5zZWxlY3RlZEluZGV4XS50ZXh0KSB7XG4gICAgICAgICAgICBjb25zdCBzdG9yZVNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJ0LXN0b3JlLXNlbGVjdCcpXG4gICAgICAgICAgICBjb25zdCBvcHRpb25DYXRlZ29yeSA9IEpTT04ucGFyc2UoZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0LXN0b3JlLWNhdGVnb3J5LXN0b3JlJykpXG5cbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXJ0LXN0b3JlLXNlbGVjdCcpLmlubmVySFRNTCA9ICcnXG4gICAgICAgICAgICBpZiAob3B0aW9uQ2F0ZWdvcnkpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25DYXRlZ29yeS5zdG9yZV9jYXRlZ29yeV9zdG9yZS5mb3JFYWNoKChlOiB7IHN0b3JlX2lkOiBudW1iZXI7IHN0b3JlX25hbWU6IHN0cmluZyB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0b3JlU2VsZWN0T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJylcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2UuaWQnLCBlLnN0b3JlX2lkKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc3RvcmVTZWxlY3QnLCBzdG9yZVNlbGVjdClcblxuICAgICAgICAgICAgICAgICAgICBzdG9yZVNlbGVjdE9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgZS5zdG9yZV9pZC50b1N0cmluZygpKVxuICAgICAgICAgICAgICAgICAgICBzdG9yZVNlbGVjdE9wdGlvbi50ZXh0Q29udGVudCA9IGUuc3RvcmVfbmFtZVxuICAgICAgICAgICAgICAgICAgICBzdG9yZVNlbGVjdC5hcHBlbmRDaGlsZChzdG9yZVNlbGVjdE9wdGlvbilcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbn0pXG5cbi8vIC0tZGlzcGxheSBvbmx5IHNhbGVzIHJlcCBsb2NrZXItLVxuY29uc3Qgc2FsZXNSZXBMb2NrZXJDaGVja2JveDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJ0LXNhbGVzLXJlcC1sb2NrZXItY2hlY2tib3gnKVxuXG5zYWxlc1JlcExvY2tlckNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICBjb25zdCBmYXZvcml0ZVN0b3JlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcnQtc3RvcmUtY29udGFpbmVyJylcbiAgICBjb25zdCBsb2NrZXJTdG9yZUNhdGVnb3J5SWRzID0gSlNPTi5wYXJzZShcbiAgICAgICAgc2FsZXNSZXBMb2NrZXJDaGVja2JveC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0LWxvY2tlci1zdG9yZS1jYXRlZ29yeS1pZHMnKVxuICAgIClcblxuICAgIGNvbnN0IG9sZFN0b3JlQ2F0ZWdvcnlPcHRpb25zID0gc3RvcmVDYXRlZ29yeVNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKCdvcHRpb24nKVxuICAgIGNvbnN0IG9sZFN0b3JlT3B0aW9ucyA9IHN0b3JlU2VsZWN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ29wdGlvbicpXG5cbiAgICBpZiAoc2FsZXNSZXBMb2NrZXJDaGVja2JveC5jaGVja2VkKSB7XG4gICAgICAgIGNvbnN0IG5ld1N0b3JlQ2F0ZWdvcnlPcHRpb24gPSBuZXcgT3B0aW9uKCdMb2NrZXInLCBsb2NrZXJTdG9yZUNhdGVnb3J5SWRzWzFdLCB0cnVlLCB0cnVlKVxuICAgICAgICBjb25zdCBuZXdTdG9yZU9wdGlvbiA9IG5ldyBPcHRpb24oJyBMb2NrZXIgU3RvcmUnLCBsb2NrZXJTdG9yZUNhdGVnb3J5SWRzWzBdLCB0cnVlLCB0cnVlKVxuICAgICAgICBmYXZvcml0ZVN0b3JlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZScpXG4gICAgICAgIG9sZFN0b3JlQ2F0ZWdvcnlPcHRpb25zLmZvckVhY2goKGUpID0+IHtcbiAgICAgICAgICAgIGUuZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgIH0pXG4gICAgICAgIHN0b3JlU2VsZWN0LmFwcGVuZENoaWxkKG5ld1N0b3JlT3B0aW9uKVxuICAgICAgICBzdG9yZVNlbGVjdC52YWx1ZSA9IGxvY2tlclN0b3JlQ2F0ZWdvcnlJZHNbMF0udG9TdHJpbmcoKVxuICAgICAgICBzdG9yZUNhdGVnb3J5U2VsZWN0LmFwcGVuZENoaWxkKG5ld1N0b3JlQ2F0ZWdvcnlPcHRpb24pXG4gICAgfSBlbHNlIHtcbiAgICAgICAgZmF2b3JpdGVTdG9yZUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKVxuICAgICAgICBzdG9yZVNlbGVjdC5yZW1vdmVDaGlsZChvbGRTdG9yZU9wdGlvbnNbb2xkU3RvcmVPcHRpb25zLmxlbmd0aCAtIDFdKVxuICAgICAgICBzdG9yZUNhdGVnb3J5U2VsZWN0LnJlbW92ZUNoaWxkKG9sZFN0b3JlQ2F0ZWdvcnlPcHRpb25zW29sZFN0b3JlQ2F0ZWdvcnlPcHRpb25zLmxlbmd0aCAtIDFdKVxuICAgICAgICBvbGRTdG9yZUNhdGVnb3J5T3B0aW9ucy5mb3JFYWNoKChlLCBpKSA9PiB7XG4gICAgICAgICAgICBpZiAoaSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGUuZGlzYWJsZWQgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBzdG9yZVNlbGVjdC5zZWxlY3RlZEluZGV4ID0gMFxuICAgICAgICBzdG9yZUNhdGVnb3J5U2VsZWN0LnNlbGVjdGVkSW5kZXggPSAwXG4gICAgfVxufSlcbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG5fX3dlYnBhY2tfbW9kdWxlc19fW1wiLi9zcmMvY2FydC50c1wiXSgpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9