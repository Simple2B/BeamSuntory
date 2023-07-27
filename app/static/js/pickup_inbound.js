/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/pickup_inbound.ts":
/*!*******************************!*\
  !*** ./src/pickup_inbound.ts ***!
  \*******************************/
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
var searchPickupInboundInput = document.querySelector('#table-search-pickup-inbounds');
var searchPickupInboundInputButton = document.querySelector('#table-search-pickup-inbound-button');
if (searchPickupInboundInputButton && searchPickupInboundInput) {
    searchPickupInboundInputButton.addEventListener('click', function () {
        var url = new URL(window.location.href);
        url.searchParams.set('q', searchPickupInboundInput.value);
        window.location.href = "".concat(url.href);
    });
}
var pickupInboundButtons = document.querySelectorAll('.pickup-inbound-btn');
pickupInboundButtons.forEach(function (e) {
    e.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
        var id, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm('Are sure?')) return [3 /*break*/, 2];
                    id = e.getAttribute('data-pickup-inbound-id');
                    return [4 /*yield*/, fetch("/pickup_inbound/pickup/".concat(id), {
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
/******/ 	__webpack_modules__["./src/pickup_inbound.ts"]();
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcGlja3VwX2luYm91bmQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUJBb0RBO0FBN0JBLGNBQWM7QUFDZCxJQUFNLHdCQUF3QixHQUFxQixRQUFRLENBQUMsYUFBYSxDQUN2RSwrQkFBK0IsQ0FDaEMsQ0FBQztBQUNGLElBQU0sOEJBQThCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDM0QscUNBQXFDLENBQ3RDLENBQUM7QUFDRixJQUFJLDhCQUE4QixJQUFJLHdCQUF3QixFQUFFO0lBQzlELDhCQUE4QixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtRQUN2RCxJQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxRCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxVQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUUsQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQztDQUNKO0FBQ0QsSUFBTSxvQkFBb0IsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUU5RSxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsV0FBQztJQUM1QixDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFOzs7Ozt5QkFDdEIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFwQix3QkFBb0I7b0JBQ2xCLEVBQUUsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLHdCQUF3QixDQUFDLENBQUM7b0JBQ2pDLHFCQUFNLEtBQUssQ0FBQyxpQ0FBMEIsRUFBRSxDQUFFLEVBQUU7NEJBQzNELE1BQU0sRUFBRSxLQUFLO3lCQUNkLENBQUM7O29CQUZJLFFBQVEsR0FBRyxTQUVmO29CQUNGLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUU7d0JBQzFCLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztxQkFDbkI7Ozs7O1NBRUosQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7O1VFbkRIO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGF0aWMvLi9zcmMvcGlja3VwX2luYm91bmQudHMiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImludGVyZmFjZSBTdXBEQVdoUHJvZCB7XG4gIHN1cHBsaWVyOiBzdHJpbmc7XG4gIGRlbGl2ZXJ5X2FnZW50OiBzdHJpbmc7XG4gIHdhcmVob3VzZTogc3RyaW5nO1xuICBwcm9kdWN0OiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBJSW5ib3VuZE9yZGVyIHtcbiAgaWQ6IG51bWJlcjtcbiAgb3JkZXJfaWQ6IHN0cmluZztcbiAgYWN0aXZlX2RhdGU6IG51bWJlcjtcbiAgYWN0aXZlX3RpbWU6IHN0cmluZztcbiAgb3JkZXJfdGl0bGU6IHN0cmluZztcbiAgcXVhbnRpdHk6IG51bWJlcjtcbiAgZGVsaXZlcnlfZGF0ZTogc3RyaW5nO1xuICBzdGF0dXM6IHN0cmluZztcbiAgc3VwcGxpZXJfaWQ6IG51bWJlcjtcbiAgZGVsaXZlcnlfYWdlbnRfaWQ6IG51bWJlcjtcbiAgd2FyZWhvdXNlX2lkOiBudW1iZXI7XG4gIHByb2R1Y3RfaWQ6IG51bWJlcjtcbiAgc3VwX2RhX3doX3Byb2Rfb2JqczogU3VwREFXaFByb2Q7XG59XG5cbi8vIHNlYXJjaCBmbG93XG5jb25zdCBzZWFyY2hQaWNrdXBJbmJvdW5kSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAnI3RhYmxlLXNlYXJjaC1waWNrdXAtaW5ib3VuZHMnLFxuKTtcbmNvbnN0IHNlYXJjaFBpY2t1cEluYm91bmRJbnB1dEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICcjdGFibGUtc2VhcmNoLXBpY2t1cC1pbmJvdW5kLWJ1dHRvbicsXG4pO1xuaWYgKHNlYXJjaFBpY2t1cEluYm91bmRJbnB1dEJ1dHRvbiAmJiBzZWFyY2hQaWNrdXBJbmJvdW5kSW5wdXQpIHtcbiAgc2VhcmNoUGlja3VwSW5ib3VuZElucHV0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KCdxJywgc2VhcmNoUGlja3VwSW5ib3VuZElucHV0LnZhbHVlKTtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAke3VybC5ocmVmfWA7XG4gIH0pO1xufVxuY29uc3QgcGlja3VwSW5ib3VuZEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGlja3VwLWluYm91bmQtYnRuJyk7XG5cbnBpY2t1cEluYm91bmRCdXR0b25zLmZvckVhY2goZSA9PiB7XG4gIGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgaWYgKGNvbmZpcm0oJ0FyZSBzdXJlPycpKSB7XG4gICAgICBsZXQgaWQgPSBlLmdldEF0dHJpYnV0ZSgnZGF0YS1waWNrdXAtaW5ib3VuZC1pZCcpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL3BpY2t1cF9pbmJvdW5kL3BpY2t1cC8ke2lkfWAsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIH0pO1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn0pO1xuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbl9fd2VicGFja19tb2R1bGVzX19bXCIuL3NyYy9waWNrdXBfaW5ib3VuZC50c1wiXSgpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9