/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/event.ts":
/*!**********************!*\
  !*** ./src/event.ts ***!
  \**********************/
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
function getFilterValues() {
    var url = new URL(window.location.href);
    var searchEventInput = document.querySelector('#table-search-event');
    var dateEventStartFromInput = document.querySelector('#product-event-sort-start-from-datepicker');
    var dateEventStartToInput = document.querySelector('#product-event-sort-start-to-datepicker');
    var dateEventEndFromInput = document.querySelector('#product-event-sort-end-from-datepicker');
    var dateEventEndToInput = document.querySelector('#product-event-sort-end-to-datepicker');
    url.searchParams.set('q', searchEventInput.value);
    url.searchParams.set('start_from', dateEventStartFromInput.value);
    url.searchParams.set('start_to', dateEventStartToInput.value);
    url.searchParams.set('end_from', dateEventEndFromInput.value);
    url.searchParams.set('end_to', dateEventEndToInput.value);
    window.location.href = "".concat(url.href);
}
function setFilterValues() {
    var searchEventInput = document.querySelector('#table-search-event');
    var dateEventStartFromInput = document.querySelector('#product-event-sort-start-from-datepicker');
    var dateEventStartToInput = document.querySelector('#product-event-sort-start-to-datepicker');
    var dateEventEndFromInput = document.querySelector('#product-event-sort-end-from-datepicker');
    var dateEventEndToInput = document.querySelector('#product-event-sort-end-to-datepicker');
    var url = new URL(window.location.href);
    url.searchParams.get('q');
    var q = url.searchParams.get('q');
    if (q) {
        console.log(q);
        searchEventInput.value = q;
    }
}
// clear datepicker search inputs
function clearSearchDateInput() {
    var datepickerEventInputs = document.querySelectorAll('.product-event-sort-datepicker');
    datepickerEventInputs.forEach(function (datepicker) {
        datepicker.value = '';
        getFilterValues();
    });
}
var clearDateSearchButton = document.querySelector('#product-event-clear-button');
clearDateSearchButton.addEventListener('click', clearSearchDateInput);
var downloadCSV = function () {
    return __awaiter(this, void 0, void 0, function () {
        var searchEventInput, dateEventStartFromInput, dateEventStartToInput, dateEventEndFromInput, dateEventEndToInput, filtersMap, filterQuery, _i, _a, _b, queryKey, queryInput, csvData, pages, queryTail, page, url_1, res, data, blob, url, a;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    searchEventInput = document.querySelector('#table-search-event');
                    dateEventStartFromInput = document.querySelector('#product-event-sort-start-from-datepicker');
                    dateEventStartToInput = document.querySelector('#product-event-sort-start-to-datepicker');
                    dateEventEndFromInput = document.querySelector('#product-event-sort-end-from-datepicker');
                    dateEventEndToInput = document.querySelector('#product-event-sort-end-to-datepicker');
                    filtersMap = {
                        q: searchEventInput,
                        start_from: dateEventStartFromInput,
                        start_to: dateEventStartToInput,
                        end_from: dateEventEndFromInput,
                        end_to: dateEventEndToInput,
                    };
                    filterQuery = [];
                    for (_i = 0, _a = Object.entries(filtersMap); _i < _a.length; _i++) {
                        _b = _a[_i], queryKey = _b[0], queryInput = _b[1];
                        filterQuery.push("".concat(queryKey, "=").concat(queryInput.value));
                    }
                    csvData = ['id,product_name,sku,date_start,date_end,comment'];
                    pages = 1;
                    queryTail = filterQuery.join('&');
                    page = 1;
                    _c.label = 1;
                case 1:
                    if (!(page <= pages)) return [3 /*break*/, 5];
                    url_1 = ["api?page={page}", queryTail].join('&');
                    return [4 /*yield*/, fetch(url_1)];
                case 2:
                    res = _c.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _c.sent();
                    data.events.forEach(function (event) {
                        csvData.push([event.id, event.product.name, event.product.SKU, event.dateFrom, event.dateTo, event.comment].join(','));
                    });
                    pages = data.pagination.pages;
                    _c.label = 4;
                case 4:
                    page++;
                    return [3 /*break*/, 1];
                case 5:
                    blob = new Blob([csvData.join('\n')], { type: 'text/csv' });
                    url = window.URL.createObjectURL(blob);
                    a = document.createElement('a');
                    a.setAttribute('href', url);
                    a.setAttribute('download', 'events.csv');
                    a.click();
                    a.remove();
                    return [2 /*return*/];
            }
        });
    });
};
// search flow
document.addEventListener('DOMContentLoaded', function () {
    var searchEventInput = document.querySelector('#table-search-event');
    var searchEventInputButton = document.querySelector('#table-search-event-button');
    if (searchEventInputButton && searchEventInput) {
        searchEventInputButton.addEventListener('click', function () {
            getFilterValues();
        });
    }
    var datepickerEventInputs = document.querySelectorAll('.product-event-sort-datepicker');
    datepickerEventInputs.forEach(function (datepicker) {
        datepicker.addEventListener('changeDate', function (e) {
            getFilterValues();
        });
    });
    var buttonDownloadCSV = document.getElementById('button-csv-download');
    buttonDownloadCSV.addEventListener('click', downloadCSV);
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/event.ts"]();
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7WUFDN0MsZUFBZSxFQUFFO1FBQ3JCLENBQUMsQ0FBQztLQUNMO0lBRUQsSUFBTSxxQkFBcUIsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsZ0NBQWdDLENBQUM7SUFDekYscUJBQXFCLENBQUMsT0FBTyxDQUFDLFVBQUMsVUFBVTtRQUNyQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLFVBQUMsQ0FBQztZQUN4QyxlQUFlLEVBQUU7UUFDckIsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDO0lBRUYsSUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUFDO0lBQ3hFLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUM7QUFDNUQsQ0FBQyxDQUFDOzs7Ozs7OztVRTFJRjtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RhdGljLy4vc3JjL2V2ZW50LnRzIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbnRlcmZhY2UgSVBhZ2luYXRpb24ge1xuICAgIHBhZ2VzOiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIElQcm9kdWN0IHtcbiAgICBuYW1lOiBzdHJpbmdcbiAgICBTS1U6IHN0cmluZ1xufVxuXG5pbnRlcmZhY2UgSUV2ZW50cyB7XG4gICAgaWQ6IG51bWJlclxuICAgIHByb2R1Y3Q6IElQcm9kdWN0XG4gICAgZGF0ZUZyb206IHN0cmluZ1xuICAgIGRhdGVUbzogc3RyaW5nXG4gICAgY29tbWVudDogc3RyaW5nXG59XG5cbmludGVyZmFjZSBJRXZlbnRzUmVzcG9uc2Uge1xuICAgIHBhZ2luYXRpb246IElQYWdpbmF0aW9uXG4gICAgZXZlbnRzOiBJRXZlbnRzW11cbn1cblxuZnVuY3Rpb24gZ2V0RmlsdGVyVmFsdWVzKCkge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpXG4gICAgY29uc3Qgc2VhcmNoRXZlbnRJbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YWJsZS1zZWFyY2gtZXZlbnQnKVxuICAgIGNvbnN0IGRhdGVFdmVudFN0YXJ0RnJvbUlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJyNwcm9kdWN0LWV2ZW50LXNvcnQtc3RhcnQtZnJvbS1kYXRlcGlja2VyJ1xuICAgIClcbiAgICBjb25zdCBkYXRlRXZlbnRTdGFydFRvSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ldmVudC1zb3J0LXN0YXJ0LXRvLWRhdGVwaWNrZXInKVxuICAgIGNvbnN0IGRhdGVFdmVudEVuZEZyb21JbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWV2ZW50LXNvcnQtZW5kLWZyb20tZGF0ZXBpY2tlcicpXG4gICAgY29uc3QgZGF0ZUV2ZW50RW5kVG9JbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWV2ZW50LXNvcnQtZW5kLXRvLWRhdGVwaWNrZXInKVxuXG4gICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoJ3EnLCBzZWFyY2hFdmVudElucHV0LnZhbHVlKVxuICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KCdzdGFydF9mcm9tJywgZGF0ZUV2ZW50U3RhcnRGcm9tSW5wdXQudmFsdWUpXG4gICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoJ3N0YXJ0X3RvJywgZGF0ZUV2ZW50U3RhcnRUb0lucHV0LnZhbHVlKVxuICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KCdlbmRfZnJvbScsIGRhdGVFdmVudEVuZEZyb21JbnB1dC52YWx1ZSlcbiAgICB1cmwuc2VhcmNoUGFyYW1zLnNldCgnZW5kX3RvJywgZGF0ZUV2ZW50RW5kVG9JbnB1dC52YWx1ZSlcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAke3VybC5ocmVmfWBcbn1cblxuZnVuY3Rpb24gc2V0RmlsdGVyVmFsdWVzKCkge1xuICAgIGNvbnN0IHNlYXJjaEV2ZW50SW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFibGUtc2VhcmNoLWV2ZW50JylcbiAgICBjb25zdCBkYXRlRXZlbnRTdGFydEZyb21JbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICcjcHJvZHVjdC1ldmVudC1zb3J0LXN0YXJ0LWZyb20tZGF0ZXBpY2tlcidcbiAgICApXG4gICAgY29uc3QgZGF0ZUV2ZW50U3RhcnRUb0lucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZXZlbnQtc29ydC1zdGFydC10by1kYXRlcGlja2VyJylcbiAgICBjb25zdCBkYXRlRXZlbnRFbmRGcm9tSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ldmVudC1zb3J0LWVuZC1mcm9tLWRhdGVwaWNrZXInKVxuICAgIGNvbnN0IGRhdGVFdmVudEVuZFRvSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ldmVudC1zb3J0LWVuZC10by1kYXRlcGlja2VyJylcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxuICAgIHVybC5zZWFyY2hQYXJhbXMuZ2V0KCdxJylcbiAgICBjb25zdCBxID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoJ3EnKVxuICAgIGlmIChxKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHEpXG4gICAgICAgIHNlYXJjaEV2ZW50SW5wdXQudmFsdWUgPSBxXG4gICAgfVxufVxuXG4vLyBjbGVhciBkYXRlcGlja2VyIHNlYXJjaCBpbnB1dHNcbmZ1bmN0aW9uIGNsZWFyU2VhcmNoRGF0ZUlucHV0KCkge1xuICAgIGNvbnN0IGRhdGVwaWNrZXJFdmVudElucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0LWV2ZW50LXNvcnQtZGF0ZXBpY2tlcicpXG4gICAgZGF0ZXBpY2tlckV2ZW50SW5wdXRzLmZvckVhY2goKGRhdGVwaWNrZXI6IEhUTUxJbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgICAgZGF0ZXBpY2tlci52YWx1ZSA9ICcnXG4gICAgICAgIGdldEZpbHRlclZhbHVlcygpXG4gICAgfSlcbn1cblxuY29uc3QgY2xlYXJEYXRlU2VhcmNoQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZXZlbnQtY2xlYXItYnV0dG9uJylcbmNsZWFyRGF0ZVNlYXJjaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsZWFyU2VhcmNoRGF0ZUlucHV0KVxuXG5jb25zdCBkb3dubG9hZENTViA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAvLyBGaWx0ZXJzXG4gICAgY29uc3Qgc2VhcmNoRXZlbnRJbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YWJsZS1zZWFyY2gtZXZlbnQnKVxuICAgIGNvbnN0IGRhdGVFdmVudFN0YXJ0RnJvbUlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJyNwcm9kdWN0LWV2ZW50LXNvcnQtc3RhcnQtZnJvbS1kYXRlcGlja2VyJ1xuICAgIClcbiAgICBjb25zdCBkYXRlRXZlbnRTdGFydFRvSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ldmVudC1zb3J0LXN0YXJ0LXRvLWRhdGVwaWNrZXInKVxuICAgIGNvbnN0IGRhdGVFdmVudEVuZEZyb21JbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWV2ZW50LXNvcnQtZW5kLWZyb20tZGF0ZXBpY2tlcicpXG4gICAgY29uc3QgZGF0ZUV2ZW50RW5kVG9JbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWV2ZW50LXNvcnQtZW5kLXRvLWRhdGVwaWNrZXInKVxuXG4gICAgY29uc3QgZmlsdGVyc01hcCA9IHtcbiAgICAgICAgcTogc2VhcmNoRXZlbnRJbnB1dCxcbiAgICAgICAgc3RhcnRfZnJvbTogZGF0ZUV2ZW50U3RhcnRGcm9tSW5wdXQsXG4gICAgICAgIHN0YXJ0X3RvOiBkYXRlRXZlbnRTdGFydFRvSW5wdXQsXG4gICAgICAgIGVuZF9mcm9tOiBkYXRlRXZlbnRFbmRGcm9tSW5wdXQsXG4gICAgICAgIGVuZF90bzogZGF0ZUV2ZW50RW5kVG9JbnB1dCxcbiAgICB9XG5cbiAgICBjb25zdCBmaWx0ZXJRdWVyeSA9IFtdXG4gICAgZm9yIChjb25zdCBbcXVlcnlLZXksIHF1ZXJ5SW5wdXRdIG9mIE9iamVjdC5lbnRyaWVzKGZpbHRlcnNNYXApKSB7XG4gICAgICAgIGZpbHRlclF1ZXJ5LnB1c2goYCR7cXVlcnlLZXl9PSR7cXVlcnlJbnB1dC52YWx1ZX1gKVxuICAgIH1cblxuICAgIC8vIENTViBIZWFkZXJzXG4gICAgY29uc3QgY3N2RGF0YSA9IFsnaWQscHJvZHVjdF9uYW1lLHNrdSxkYXRlX3N0YXJ0LGRhdGVfZW5kLGNvbW1lbnQnXVxuICAgIGxldCBwYWdlcyA9IDFcbiAgICBjb25zdCBxdWVyeVRhaWwgPSBmaWx0ZXJRdWVyeS5qb2luKCcmJylcblxuICAgIGZvciAobGV0IHBhZ2UgPSAxOyBwYWdlIDw9IHBhZ2VzOyBwYWdlKyspIHtcbiAgICAgICAgY29uc3QgdXJsID0gW2BhcGk/cGFnZT17cGFnZX1gLCBxdWVyeVRhaWxdLmpvaW4oJyYnKVxuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwpXG4gICAgICAgIGNvbnN0IGRhdGE6IElFdmVudHNSZXNwb25zZSA9IGF3YWl0IHJlcy5qc29uKClcbiAgICAgICAgZGF0YS5ldmVudHMuZm9yRWFjaCgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNzdkRhdGEucHVzaChcbiAgICAgICAgICAgICAgICBbZXZlbnQuaWQsIGV2ZW50LnByb2R1Y3QubmFtZSwgZXZlbnQucHJvZHVjdC5TS1UsIGV2ZW50LmRhdGVGcm9tLCBldmVudC5kYXRlVG8sIGV2ZW50LmNvbW1lbnRdLmpvaW4oJywnKVxuICAgICAgICAgICAgKVxuICAgICAgICB9KVxuICAgICAgICBwYWdlcyA9IGRhdGEucGFnaW5hdGlvbi5wYWdlc1xuICAgIH1cblxuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbY3N2RGF0YS5qb2luKCdcXG4nKV0sIHsgdHlwZTogJ3RleHQvY3N2JyB9KVxuICAgIGNvbnN0IHVybCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpXG4gICAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuICAgIGEuc2V0QXR0cmlidXRlKCdocmVmJywgdXJsKVxuICAgIGEuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsICdldmVudHMuY3N2JylcbiAgICBhLmNsaWNrKClcbiAgICBhLnJlbW92ZSgpXG59XG5cbi8vIHNlYXJjaCBmbG93XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIGNvbnN0IHNlYXJjaEV2ZW50SW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFibGUtc2VhcmNoLWV2ZW50JylcbiAgICBjb25zdCBzZWFyY2hFdmVudElucHV0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RhYmxlLXNlYXJjaC1ldmVudC1idXR0b24nKVxuXG4gICAgaWYgKHNlYXJjaEV2ZW50SW5wdXRCdXR0b24gJiYgc2VhcmNoRXZlbnRJbnB1dCkge1xuICAgICAgICBzZWFyY2hFdmVudElucHV0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgZ2V0RmlsdGVyVmFsdWVzKClcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBkYXRlcGlja2VyRXZlbnRJbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdC1ldmVudC1zb3J0LWRhdGVwaWNrZXInKVxuICAgIGRhdGVwaWNrZXJFdmVudElucHV0cy5mb3JFYWNoKChkYXRlcGlja2VyKSA9PiB7XG4gICAgICAgIGRhdGVwaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlRGF0ZScsIChlKSA9PiB7XG4gICAgICAgICAgICBnZXRGaWx0ZXJWYWx1ZXMoKVxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICBjb25zdCBidXR0b25Eb3dubG9hZENTViA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidXR0b24tY3N2LWRvd25sb2FkJylcbiAgICBidXR0b25Eb3dubG9hZENTVi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRvd25sb2FkQ1NWKVxufSlcbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG5fX3dlYnBhY2tfbW9kdWxlc19fW1wiLi9zcmMvZXZlbnQudHNcIl0oKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==