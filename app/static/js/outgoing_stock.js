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
var cancelButtons = document.querySelectorAll('.cancel-outgoing-stock-btn');
cancelButtons.forEach(function (e) {
    e.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
        var id, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm('Are sure?')) return [3 /*break*/, 2];
                    id = e.getAttribute('data-outgoing-stock-id');
                    return [4 /*yield*/, fetch("/outgoing_stock/cancel/".concat(id), {
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
// function to filter order by status
var orderFilterInputs = document.querySelectorAll('.outgoing-stock-filter-input');
var sortByNameOutgoingStockStorage = JSON.parse(sessionStorage.getItem('sortByNameOutgoingStock'));
if (sortByNameOutgoingStockStorage) {
    var filterDropdownContainer = document.querySelector('#dropdownRadioButton-outgoing-stock-status');
    filterDropdownContainer.innerHTML = "".concat(sortByNameOutgoingStockStorage, "\n          <svg class=\"w-2.5 h-2.5 ml-2.5\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\"\n          viewBox=\"0 0 10 6\">\n          <path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"\n            d=\"m1 1 4 4 4-4\" />\n        </svg>");
}
orderFilterInputs.forEach(function (input) {
    var hiddenInput = document.querySelector('#sort_by');
    input.addEventListener('change', function () {
        console.log('input changed', input.checked);
        if (input.checked) {
            hiddenInput.value = input.value;
            sessionStorage.setItem('sortByNameOutgoingStock', JSON.stringify(input.value));
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
/******/ 	__webpack_modules__["./src/outgoing_stock.ts"]();
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBcUIsQ0FBQztJQUMzRSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFO1FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDakIsV0FBVyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ2hDLGNBQWMsQ0FBQyxPQUFPLENBQ3BCLHlCQUF5QixFQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FDNUIsQ0FBQztTQUNIO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7VUV6SEg7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3N0YXRpYy8uL3NyYy9vdXRnb2luZ19zdG9jay50cyIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW50ZXJmYWNlIElTaGlwUmVxdWVzdCB7XG4gIGlkOiBudW1iZXI7XG4gIG9yZGVyX251bWI6IHN0cmluZztcbiAgc3RhdHVzOiBzdHJpbmc7XG4gIG9yZGVyX3R5cGU6IHN0cmluZztcbiAgc3RvcmVfaWQ6IG51bWJlcjtcbiAgd2FyZWhvdXNlX2lkOiBudW1iZXI7XG4gIHdhcmVob3VzZV9uYW1lOiBzdHJpbmc7XG4gIGNyZWF0ZWRfYXQ6IHN0cmluZztcbiAgcXVhbnRpdHk6IG51bWJlcjtcbiAgY3VycmVudF9vcmRlcl9jYXJ0czogSVByb2R1Y3RbXTtcbiAgY29tbWVudDogc3RyaW5nO1xuICB3YXJlaG91c2VzOiBJV2FyZWhvdXNlW107XG59XG5cbmludGVyZmFjZSBJUHJvZHVjdCB7XG4gIGlkOiBudW1iZXI7XG4gIG5hbWU6IHN0cmluZztcbiAgcXVhbnRpdHk6IHN0cmluZztcbiAgcHJpY2U6IG51bWJlcjtcbiAgaW1hZ2U6IHN0cmluZztcbiAgU0tVOiBzdHJpbmc7XG4gIGNvbW1lbnQ6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIElTdG9yZSB7XG4gIGlkOiBudW1iZXI7XG4gIHN0b3JlX25hbWU6IHN0cmluZztcbiAgYWRkcmVzczogc3RyaW5nO1xuICBwaG9uZV9udW1iOiBzdHJpbmc7XG4gIGNvdW50cnk6IHN0cmluZztcbiAgcmVnaW9uOiBzdHJpbmc7XG4gIGNpdHk6IHN0cmluZztcbiAgemlwOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBJV2FyZWhvdXNlIHtcbiAgaWQ6IG51bWJlcjtcbiAgbmFtZTogc3RyaW5nO1xufVxuXG4vLyBzZWFyY2ggZmxvd1xuY29uc3Qgc2VhcmNoT3V0Z29pbmdJbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICcjdGFibGUtc2VhcmNoLW91dGdvaW5nLXN0b2NrcycsXG4pO1xuY29uc3Qgc2VhcmNoT3V0Z29pbmdJbnB1dEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICcjdGFibGUtc2VhcmNoLW91dGdvaW5nLXN0b2NrLWJ1dHRvbicsXG4pO1xuaWYgKHNlYXJjaE91dGdvaW5nSW5wdXRCdXR0b24gJiYgc2VhcmNoT3V0Z29pbmdJbnB1dCkge1xuICBzZWFyY2hPdXRnb2luZ0lucHV0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KCdxJywgc2VhcmNoT3V0Z29pbmdJbnB1dC52YWx1ZSk7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgJHt1cmwuaHJlZn1gO1xuICB9KTtcbn1cbmNvbnN0IGRpc3BhdGNoQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICcuZGlzcGF0Y2gtb3V0Z29pbmctc3RvY2stYnRuJyxcbik7XG5cbmRpc3BhdGNoQnV0dG9ucy5mb3JFYWNoKGUgPT4ge1xuICBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgIGlmIChjb25maXJtKCdBcmUgc3VyZT8nKSkge1xuICAgICAgbGV0IGlkID0gZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtb3V0Z29pbmctc3RvY2staWQnKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9vdXRnb2luZ19zdG9jay9kaXNwYXRjaC8ke2lkfWAsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIH0pO1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn0pO1xuXG5jb25zdCBjYW5jZWxCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhbmNlbC1vdXRnb2luZy1zdG9jay1idG4nKTtcblxuY2FuY2VsQnV0dG9ucy5mb3JFYWNoKGUgPT4ge1xuICBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgIGlmIChjb25maXJtKCdBcmUgc3VyZT8nKSkge1xuICAgICAgbGV0IGlkID0gZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtb3V0Z29pbmctc3RvY2staWQnKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9vdXRnb2luZ19zdG9jay9jYW5jZWwvJHtpZH1gLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB9KTtcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59KTtcblxuLy8gZnVuY3Rpb24gdG8gZmlsdGVyIG9yZGVyIGJ5IHN0YXR1c1xuY29uc3Qgb3JkZXJGaWx0ZXJJbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAnLm91dGdvaW5nLXN0b2NrLWZpbHRlci1pbnB1dCcsXG4pO1xuY29uc3Qgc29ydEJ5TmFtZU91dGdvaW5nU3RvY2tTdG9yYWdlID0gSlNPTi5wYXJzZShcbiAgc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnc29ydEJ5TmFtZU91dGdvaW5nU3RvY2snKSxcbik7XG5cbmlmIChzb3J0QnlOYW1lT3V0Z29pbmdTdG9ja1N0b3JhZ2UpIHtcbiAgY29uc3QgZmlsdGVyRHJvcGRvd25Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICcjZHJvcGRvd25SYWRpb0J1dHRvbi1vdXRnb2luZy1zdG9jay1zdGF0dXMnLFxuICApO1xuICBmaWx0ZXJEcm9wZG93bkNvbnRhaW5lci5pbm5lckhUTUwgPSBgJHtzb3J0QnlOYW1lT3V0Z29pbmdTdG9ja1N0b3JhZ2V9XG4gICAgICAgICAgPHN2ZyBjbGFzcz1cInctMi41IGgtMi41IG1sLTIuNVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiXG4gICAgICAgICAgdmlld0JveD1cIjAgMCAxMCA2XCI+XG4gICAgICAgICAgPHBhdGggc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlLXdpZHRoPVwiMlwiXG4gICAgICAgICAgICBkPVwibTEgMSA0IDQgNC00XCIgLz5cbiAgICAgICAgPC9zdmc+YDtcbn1cblxub3JkZXJGaWx0ZXJJbnB1dHMuZm9yRWFjaCgoaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpID0+IHtcbiAgY29uc3QgaGlkZGVuSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc29ydF9ieScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnaW5wdXQgY2hhbmdlZCcsIGlucHV0LmNoZWNrZWQpO1xuICAgIGlmIChpbnB1dC5jaGVja2VkKSB7XG4gICAgICBoaWRkZW5JbnB1dC52YWx1ZSA9IGlucHV0LnZhbHVlO1xuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcbiAgICAgICAgJ3NvcnRCeU5hbWVPdXRnb2luZ1N0b2NrJyxcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkoaW5wdXQudmFsdWUpLFxuICAgICAgKTtcbiAgICB9XG4gIH0pO1xufSk7XG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IHt9O1xuX193ZWJwYWNrX21vZHVsZXNfX1tcIi4vc3JjL291dGdvaW5nX3N0b2NrLnRzXCJdKCk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=