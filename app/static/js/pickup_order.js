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
var deliverButtons = document.querySelectorAll('.deliver-order-btn');
deliverButtons.forEach(function (e) {
    e.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
        var id, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm('Are sure?')) return [3 /*break*/, 2];
                    id = e.getAttribute('data-deliver-order-id');
                    return [4 /*yield*/, fetch("/pickup_order/deliver/".concat(id), {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcGlja3VwX29yZGVyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlCQXNGQTtBQTdDQSxjQUFjO0FBQ2QsSUFBTSxpQkFBaUIsR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FDaEUsNkJBQTZCLENBQzlCLENBQUM7QUFDRixJQUFNLHVCQUF1QixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3BELG1DQUFtQyxDQUNwQyxDQUFDO0FBQ0YsSUFBSSx1QkFBdUIsSUFBSSxpQkFBaUIsRUFBRTtJQUNoRCx1QkFBdUIsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDaEQsSUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxHQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsVUFBRyxHQUFHLENBQUMsSUFBSSxDQUFFLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUM7Q0FDSjtBQUNELElBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBRXJFLGFBQWEsQ0FBQyxPQUFPLENBQUMsV0FBQztJQUNyQixDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFOzs7Ozt5QkFDdEIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFwQix3QkFBb0I7b0JBQ2xCLEVBQUUsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDLENBQUM7b0JBQy9CLHFCQUFNLEtBQUssQ0FBQywrQkFBd0IsRUFBRSxDQUFFLEVBQUU7NEJBQ3pELE1BQU0sRUFBRSxLQUFLO3lCQUNkLENBQUM7O29CQUZJLFFBQVEsR0FBRyxTQUVmO29CQUNGLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUU7d0JBQzFCLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztxQkFDbkI7Ozs7O1NBRUosQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUV2RSxjQUFjLENBQUMsT0FBTyxDQUFDLFdBQUM7SUFDdEIsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTs7Ozs7eUJBQ3RCLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBcEIsd0JBQW9CO29CQUNsQixFQUFFLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO29CQUNoQyxxQkFBTSxLQUFLLENBQUMsZ0NBQXlCLEVBQUUsQ0FBRSxFQUFFOzRCQUMxRCxNQUFNLEVBQUUsS0FBSzt5QkFDZCxDQUFDOztvQkFGSSxRQUFRLEdBQUcsU0FFZjtvQkFDRixJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFO3dCQUMxQixRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7cUJBQ25COzs7OztTQUVKLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDOzs7Ozs7OztVRXJGSDtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RhdGljLy4vc3JjL3BpY2t1cF9vcmRlci50cyIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW50ZXJmYWNlIElTaGlwUmVxdWVzdCB7XG4gIGlkOiBudW1iZXI7XG4gIG9yZGVyX251bWI6IHN0cmluZztcbiAgc3RhdHVzOiBzdHJpbmc7XG4gIG9yZGVyX3R5cGU6IHN0cmluZztcbiAgc3RvcmVfaWQ6IG51bWJlcjtcbiAgd2FyZWhvdXNlX2lkOiBudW1iZXI7XG4gIHdhcmVob3VzZV9uYW1lOiBzdHJpbmc7XG4gIGNyZWF0ZWRfYXQ6IHN0cmluZztcbiAgcXVhbnRpdHk6IG51bWJlcjtcbiAgY3VycmVudF9vcmRlcl9jYXJ0czogSVByb2R1Y3RbXTtcbiAgY29tbWVudDogc3RyaW5nO1xuICB3YXJlaG91c2VzOiBJV2FyZWhvdXNlW107XG59XG5cbmludGVyZmFjZSBJUHJvZHVjdCB7XG4gIGlkOiBudW1iZXI7XG4gIG5hbWU6IHN0cmluZztcbiAgcXVhbnRpdHk6IHN0cmluZztcbiAgcHJpY2U6IG51bWJlcjtcbiAgaW1hZ2U6IHN0cmluZztcbiAgU0tVOiBzdHJpbmc7XG4gIGNvbW1lbnQ6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIElTdG9yZSB7XG4gIGlkOiBudW1iZXI7XG4gIHN0b3JlX25hbWU6IHN0cmluZztcbiAgYWRkcmVzczogc3RyaW5nO1xuICBwaG9uZV9udW1iOiBzdHJpbmc7XG4gIGNvdW50cnk6IHN0cmluZztcbiAgcmVnaW9uOiBzdHJpbmc7XG4gIGNpdHk6IHN0cmluZztcbiAgemlwOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBJV2FyZWhvdXNlIHtcbiAgaWQ6IG51bWJlcjtcbiAgbmFtZTogc3RyaW5nO1xufVxuXG4vLyBzZWFyY2ggZmxvd1xuY29uc3Qgc2VhcmNoUGlja3VwSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAnI3RhYmxlLXNlYXJjaC1waWNrdXAtb3JkZXJzJyxcbik7XG5jb25zdCBzZWFyY2hQaWNrdXBJbnB1dEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICcjdGFibGUtc2VhcmNoLXBpY2t1cC1vcmRlci1idXR0b24nLFxuKTtcbmlmIChzZWFyY2hQaWNrdXBJbnB1dEJ1dHRvbiAmJiBzZWFyY2hQaWNrdXBJbnB1dCkge1xuICBzZWFyY2hQaWNrdXBJbnB1dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLnNldCgncScsIHNlYXJjaFBpY2t1cElucHV0LnZhbHVlKTtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAke3VybC5ocmVmfWA7XG4gIH0pO1xufVxuY29uc3QgcGlja3VwQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5waWNrdXAtb3JkZXItYnRuJyk7XG5cbnBpY2t1cEJ1dHRvbnMuZm9yRWFjaChlID0+IHtcbiAgZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICBpZiAoY29uZmlybSgnQXJlIHN1cmU/JykpIHtcbiAgICAgIGxldCBpZCA9IGUuZ2V0QXR0cmlidXRlKCdkYXRhLXBpY2t1cC1vcmRlci1pZCcpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL3BpY2t1cF9vcmRlci9waWNrdXAvJHtpZH1gLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB9KTtcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59KTtcblxuY29uc3QgZGVsaXZlckJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGVsaXZlci1vcmRlci1idG4nKTtcblxuZGVsaXZlckJ1dHRvbnMuZm9yRWFjaChlID0+IHtcbiAgZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICBpZiAoY29uZmlybSgnQXJlIHN1cmU/JykpIHtcbiAgICAgIGxldCBpZCA9IGUuZ2V0QXR0cmlidXRlKCdkYXRhLWRlbGl2ZXItb3JkZXItaWQnKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9waWNrdXBfb3JkZXIvZGVsaXZlci8ke2lkfWAsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIH0pO1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn0pO1xuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbl9fd2VicGFja19tb2R1bGVzX19bXCIuL3NyYy9waWNrdXBfb3JkZXIudHNcIl0oKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==