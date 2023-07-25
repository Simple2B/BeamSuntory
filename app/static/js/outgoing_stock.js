/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/outgoing_stock.ts":
/*!*******************************!*\
  !*** ./src/outgoing_stock.ts ***!
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
var searchOutgoingInput = document.querySelector('#table-search-outgoing-stocks');
var searchOutgoingInputButton = document.querySelector('#table-search-outgoing-stock-button');
if (searchOutgoingInputButton && searchOutgoingInput) {
    searchOutgoingInputButton.addEventListener('click', function () {
        var url = new URL(window.location.href);
        url.searchParams.set('q', searchOutgoingInput.value);
        window.location.href = "".concat(url.href);
    });
}
var dispatchButtons = document.querySelectorAll('.dispatch-outgoing-stock-btn');
dispatchButtons.forEach(function (e) {
    e.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
        var id, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm('Are sure?')) return [3 /*break*/, 2];
                    id = e.getAttribute('data-outgoing-stock-id');
                    return [4 /*yield*/, fetch("/outgoing_stock/dispatch/".concat(id), {
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
/******/ 	__webpack_modules__["./src/outgoing_stock.ts"]();
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvb3V0Z29pbmdfc3RvY2suanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUJBd0VBO0FBL0JBLGNBQWM7QUFDZCxJQUFNLG1CQUFtQixHQUFxQixRQUFRLENBQUMsYUFBYSxDQUNsRSwrQkFBK0IsQ0FDaEMsQ0FBQztBQUNGLElBQU0seUJBQXlCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDdEQscUNBQXFDLENBQ3RDLENBQUM7QUFDRixJQUFJLHlCQUF5QixJQUFJLG1CQUFtQixFQUFFO0lBQ3BELHlCQUF5QixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtRQUNsRCxJQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxVQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUUsQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQztDQUNKO0FBQ0QsSUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUMvQyw4QkFBOEIsQ0FDL0IsQ0FBQztBQUVGLGVBQWUsQ0FBQyxPQUFPLENBQUMsV0FBQztJQUN2QixDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFOzs7Ozt5QkFDdEIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFwQix3QkFBb0I7b0JBQ2xCLEVBQUUsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLHdCQUF3QixDQUFDLENBQUM7b0JBQ2pDLHFCQUFNLEtBQUssQ0FBQyxtQ0FBNEIsRUFBRSxDQUFFLEVBQUU7NEJBQzdELE1BQU0sRUFBRSxLQUFLO3lCQUNkLENBQUM7O29CQUZJLFFBQVEsR0FBRyxTQUVmO29CQUNGLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUU7d0JBQzFCLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztxQkFDbkI7Ozs7O1NBRUosQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7O1VFdkVIO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGF0aWMvLi9zcmMvb3V0Z29pbmdfc3RvY2sudHMiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImludGVyZmFjZSBJU2hpcFJlcXVlc3Qge1xuICBpZDogbnVtYmVyO1xuICBvcmRlcl9udW1iOiBzdHJpbmc7XG4gIHN0YXR1czogc3RyaW5nO1xuICBvcmRlcl90eXBlOiBzdHJpbmc7XG4gIHN0b3JlX2lkOiBudW1iZXI7XG4gIHdhcmVob3VzZV9pZDogbnVtYmVyO1xuICB3YXJlaG91c2VfbmFtZTogc3RyaW5nO1xuICBjcmVhdGVkX2F0OiBzdHJpbmc7XG4gIHF1YW50aXR5OiBudW1iZXI7XG4gIGN1cnJlbnRfb3JkZXJfY2FydHM6IElQcm9kdWN0W107XG4gIGNvbW1lbnQ6IHN0cmluZztcbiAgd2FyZWhvdXNlczogSVdhcmVob3VzZVtdO1xufVxuXG5pbnRlcmZhY2UgSVByb2R1Y3Qge1xuICBpZDogbnVtYmVyO1xuICBuYW1lOiBzdHJpbmc7XG4gIHF1YW50aXR5OiBzdHJpbmc7XG4gIHByaWNlOiBudW1iZXI7XG4gIGltYWdlOiBzdHJpbmc7XG4gIFNLVTogc3RyaW5nO1xuICBjb21tZW50OiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBJU3RvcmUge1xuICBpZDogbnVtYmVyO1xuICBzdG9yZV9uYW1lOiBzdHJpbmc7XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgcGhvbmVfbnVtYjogc3RyaW5nO1xuICBjb3VudHJ5OiBzdHJpbmc7XG4gIHJlZ2lvbjogc3RyaW5nO1xuICBjaXR5OiBzdHJpbmc7XG4gIHppcDogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgSVdhcmVob3VzZSB7XG4gIGlkOiBudW1iZXI7XG4gIG5hbWU6IHN0cmluZztcbn1cblxuLy8gc2VhcmNoIGZsb3dcbmNvbnN0IHNlYXJjaE91dGdvaW5nSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAnI3RhYmxlLXNlYXJjaC1vdXRnb2luZy1zdG9ja3MnLFxuKTtcbmNvbnN0IHNlYXJjaE91dGdvaW5nSW5wdXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAnI3RhYmxlLXNlYXJjaC1vdXRnb2luZy1zdG9jay1idXR0b24nLFxuKTtcbmlmIChzZWFyY2hPdXRnb2luZ0lucHV0QnV0dG9uICYmIHNlYXJjaE91dGdvaW5nSW5wdXQpIHtcbiAgc2VhcmNoT3V0Z29pbmdJbnB1dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLnNldCgncScsIHNlYXJjaE91dGdvaW5nSW5wdXQudmFsdWUpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYCR7dXJsLmhyZWZ9YDtcbiAgfSk7XG59XG5jb25zdCBkaXNwYXRjaEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAnLmRpc3BhdGNoLW91dGdvaW5nLXN0b2NrLWJ0bicsXG4pO1xuXG5kaXNwYXRjaEJ1dHRvbnMuZm9yRWFjaChlID0+IHtcbiAgZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICBpZiAoY29uZmlybSgnQXJlIHN1cmU/JykpIHtcbiAgICAgIGxldCBpZCA9IGUuZ2V0QXR0cmlidXRlKCdkYXRhLW91dGdvaW5nLXN0b2NrLWlkJyk7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvb3V0Z29pbmdfc3RvY2svZGlzcGF0Y2gvJHtpZH1gLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB9KTtcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59KTtcbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG5fX3dlYnBhY2tfbW9kdWxlc19fW1wiLi9zcmMvb3V0Z29pbmdfc3RvY2sudHNcIl0oKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==