/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/pickup_order.ts":
/*!*****************************!*\
  !*** ./src/pickup_order.ts ***!
  \*****************************/
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
// search flow
var searchPickupInput = document.querySelector('#table-search-pickup-orders');
var searchPickupInputButton = document.querySelector('#table-search-pickup-order-button');
if (searchPickupInputButton && searchPickupInput) {
    searchPickupInputButton.addEventListener('click', function () {
        var url = new URL(window.location.href);
        url.searchParams.set('q', searchPickupInput.value);
        window.location.href = "".concat(url.href);
    });
}
var pickupButtons = document.querySelectorAll('.pickup-order-btn');
pickupButtons.forEach(function (e) {
    e.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
        var id, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm('Are sure?')) return [3 /*break*/, 2];
                    id = e.getAttribute('data-pickup-order-id');
                    return [4 /*yield*/, fetch("/pickup_order/pickup/".concat(id), {
                            method: 'GET',
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
/******/ 	__webpack_modules__["./src/pickup_order.ts"]();
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcGlja3VwX29yZGVyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlCQXNFQTtBQTdCQSxjQUFjO0FBQ2QsSUFBTSxpQkFBaUIsR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FDaEUsNkJBQTZCLENBQzlCLENBQUM7QUFDRixJQUFNLHVCQUF1QixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3BELG1DQUFtQyxDQUNwQyxDQUFDO0FBQ0YsSUFBSSx1QkFBdUIsSUFBSSxpQkFBaUIsRUFBRTtJQUNoRCx1QkFBdUIsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDaEQsSUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxHQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsVUFBRyxHQUFHLENBQUMsSUFBSSxDQUFFLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUM7Q0FDSjtBQUNELElBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBRXJFLGFBQWEsQ0FBQyxPQUFPLENBQUMsV0FBQztJQUNyQixDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFOzs7Ozt5QkFDdEIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFwQix3QkFBb0I7b0JBQ2xCLEVBQUUsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDLENBQUM7b0JBQy9CLHFCQUFNLEtBQUssQ0FBQywrQkFBd0IsRUFBRSxDQUFFLEVBQUU7NEJBQ3pELE1BQU0sRUFBRSxLQUFLO3lCQUNkLENBQUM7O29CQUZJLFFBQVEsR0FBRyxTQUVmO29CQUNGLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUU7d0JBQzFCLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztxQkFDbkI7Ozs7O1NBRUosQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7O1VFckVIO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGF0aWMvLi9zcmMvcGlja3VwX29yZGVyLnRzIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbnRlcmZhY2UgSVNoaXBSZXF1ZXN0IHtcbiAgaWQ6IG51bWJlcjtcbiAgb3JkZXJfbnVtYjogc3RyaW5nO1xuICBzdGF0dXM6IHN0cmluZztcbiAgb3JkZXJfdHlwZTogc3RyaW5nO1xuICBzdG9yZV9pZDogbnVtYmVyO1xuICB3YXJlaG91c2VfaWQ6IG51bWJlcjtcbiAgd2FyZWhvdXNlX25hbWU6IHN0cmluZztcbiAgY3JlYXRlZF9hdDogc3RyaW5nO1xuICBxdWFudGl0eTogbnVtYmVyO1xuICBjdXJyZW50X29yZGVyX2NhcnRzOiBJUHJvZHVjdFtdO1xuICBjb21tZW50OiBzdHJpbmc7XG4gIHdhcmVob3VzZXM6IElXYXJlaG91c2VbXTtcbn1cblxuaW50ZXJmYWNlIElQcm9kdWN0IHtcbiAgaWQ6IG51bWJlcjtcbiAgbmFtZTogc3RyaW5nO1xuICBxdWFudGl0eTogc3RyaW5nO1xuICBwcmljZTogbnVtYmVyO1xuICBpbWFnZTogc3RyaW5nO1xuICBTS1U6IHN0cmluZztcbiAgY29tbWVudDogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgSVN0b3JlIHtcbiAgaWQ6IG51bWJlcjtcbiAgc3RvcmVfbmFtZTogc3RyaW5nO1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIHBob25lX251bWI6IHN0cmluZztcbiAgY291bnRyeTogc3RyaW5nO1xuICByZWdpb246IHN0cmluZztcbiAgY2l0eTogc3RyaW5nO1xuICB6aXA6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIElXYXJlaG91c2Uge1xuICBpZDogbnVtYmVyO1xuICBuYW1lOiBzdHJpbmc7XG59XG5cbi8vIHNlYXJjaCBmbG93XG5jb25zdCBzZWFyY2hQaWNrdXBJbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICcjdGFibGUtc2VhcmNoLXBpY2t1cC1vcmRlcnMnLFxuKTtcbmNvbnN0IHNlYXJjaFBpY2t1cElucHV0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgJyN0YWJsZS1zZWFyY2gtcGlja3VwLW9yZGVyLWJ1dHRvbicsXG4pO1xuaWYgKHNlYXJjaFBpY2t1cElucHV0QnV0dG9uICYmIHNlYXJjaFBpY2t1cElucHV0KSB7XG4gIHNlYXJjaFBpY2t1cElucHV0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KCdxJywgc2VhcmNoUGlja3VwSW5wdXQudmFsdWUpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYCR7dXJsLmhyZWZ9YDtcbiAgfSk7XG59XG5jb25zdCBwaWNrdXBCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBpY2t1cC1vcmRlci1idG4nKTtcblxucGlja3VwQnV0dG9ucy5mb3JFYWNoKGUgPT4ge1xuICBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgIGlmIChjb25maXJtKCdBcmUgc3VyZT8nKSkge1xuICAgICAgbGV0IGlkID0gZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGlja3VwLW9yZGVyLWlkJyk7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvcGlja3VwX29yZGVyL3BpY2t1cC8ke2lkfWAsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIH0pO1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn0pO1xuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbl9fd2VicGFja19tb2R1bGVzX19bXCIuL3NyYy9waWNrdXBfb3JkZXIudHNcIl0oKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==