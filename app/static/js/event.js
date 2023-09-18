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
                    csvData = ['id,product_name,sku,username,date_start,date_end,comment'];
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
                    console.log(data.events);
                    data.events.forEach(function (event) {
                        csvData.push([
                            event.id,
                            event.product.name,
                            event.product.SKU,
                            event.user.username,
                            event.dateFrom,
                            event.dateTo,
                            event.comment,
                        ].join(','));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFNLHNCQUFzQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQUM7SUFFbkYsSUFBSSxzQkFBc0IsSUFBSSxnQkFBZ0IsRUFBRTtRQUM1QyxzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7WUFDN0MsZUFBZSxFQUFFO1FBQ3JCLENBQUMsQ0FBQztLQUNMO0lBRUQsSUFBTSxxQkFBcUIsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsZ0NBQWdDLENBQUM7SUFDekYscUJBQXFCLENBQUMsT0FBTyxDQUFDLFVBQUMsVUFBVTtRQUNyQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLFVBQUMsQ0FBQztZQUN4QyxlQUFlLEVBQUU7UUFDckIsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDO0lBRUYsSUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUFDO0lBQ3hFLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztBQUM3RCxDQUFDLENBQUM7Ozs7Ozs7O1VFekpGO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGF0aWMvLi9zcmMvZXZlbnQudHMiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImludGVyZmFjZSBJUGFnaW5hdGlvbiB7XG4gICAgcGFnZXM6IG51bWJlclxufVxuXG5pbnRlcmZhY2UgSVByb2R1Y3Qge1xuICAgIG5hbWU6IHN0cmluZ1xuICAgIFNLVTogc3RyaW5nXG59XG5cbmludGVyZmFjZSBJRXZlbnRzIHtcbiAgICBpZDogbnVtYmVyXG4gICAgcHJvZHVjdDogSVByb2R1Y3RcbiAgICBkYXRlRnJvbTogc3RyaW5nXG4gICAgZGF0ZVRvOiBzdHJpbmdcbiAgICBjb21tZW50OiBzdHJpbmdcbiAgICB1c2VyOiBJVXNlclxufVxuXG5pbnRlcmZhY2UgSVVzZXIge1xuICAgIHVzZXJuYW1lOiBzdHJpbmdcbn1cblxuaW50ZXJmYWNlIElFdmVudHNSZXNwb25zZSB7XG4gICAgcGFnaW5hdGlvbjogSVBhZ2luYXRpb25cbiAgICBldmVudHM6IElFdmVudHNbXVxufVxuXG5mdW5jdGlvbiBnZXRGaWx0ZXJWYWx1ZXMoKSB7XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZilcbiAgICBjb25zdCBzZWFyY2hFdmVudElucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RhYmxlLXNlYXJjaC1ldmVudCcpXG4gICAgY29uc3QgZGF0ZUV2ZW50U3RhcnRGcm9tSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAnI3Byb2R1Y3QtZXZlbnQtc29ydC1zdGFydC1mcm9tLWRhdGVwaWNrZXInXG4gICAgKVxuICAgIGNvbnN0IGRhdGVFdmVudFN0YXJ0VG9JbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWV2ZW50LXNvcnQtc3RhcnQtdG8tZGF0ZXBpY2tlcicpXG4gICAgY29uc3QgZGF0ZUV2ZW50RW5kRnJvbUlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZXZlbnQtc29ydC1lbmQtZnJvbS1kYXRlcGlja2VyJylcbiAgICBjb25zdCBkYXRlRXZlbnRFbmRUb0lucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZXZlbnQtc29ydC1lbmQtdG8tZGF0ZXBpY2tlcicpXG5cbiAgICB1cmwuc2VhcmNoUGFyYW1zLnNldCgncScsIHNlYXJjaEV2ZW50SW5wdXQudmFsdWUpXG4gICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoJ3N0YXJ0X2Zyb20nLCBkYXRlRXZlbnRTdGFydEZyb21JbnB1dC52YWx1ZSlcbiAgICB1cmwuc2VhcmNoUGFyYW1zLnNldCgnc3RhcnRfdG8nLCBkYXRlRXZlbnRTdGFydFRvSW5wdXQudmFsdWUpXG4gICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoJ2VuZF9mcm9tJywgZGF0ZUV2ZW50RW5kRnJvbUlucHV0LnZhbHVlKVxuICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KCdlbmRfdG8nLCBkYXRlRXZlbnRFbmRUb0lucHV0LnZhbHVlKVxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYCR7dXJsLmhyZWZ9YFxufVxuXG5mdW5jdGlvbiBzZXRGaWx0ZXJWYWx1ZXMoKSB7XG4gICAgY29uc3Qgc2VhcmNoRXZlbnRJbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YWJsZS1zZWFyY2gtZXZlbnQnKVxuICAgIGNvbnN0IGRhdGVFdmVudFN0YXJ0RnJvbUlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJyNwcm9kdWN0LWV2ZW50LXNvcnQtc3RhcnQtZnJvbS1kYXRlcGlja2VyJ1xuICAgIClcbiAgICBjb25zdCBkYXRlRXZlbnRTdGFydFRvSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ldmVudC1zb3J0LXN0YXJ0LXRvLWRhdGVwaWNrZXInKVxuICAgIGNvbnN0IGRhdGVFdmVudEVuZEZyb21JbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWV2ZW50LXNvcnQtZW5kLWZyb20tZGF0ZXBpY2tlcicpXG4gICAgY29uc3QgZGF0ZUV2ZW50RW5kVG9JbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWV2ZW50LXNvcnQtZW5kLXRvLWRhdGVwaWNrZXInKVxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpXG4gICAgdXJsLnNlYXJjaFBhcmFtcy5nZXQoJ3EnKVxuICAgIGNvbnN0IHEgPSB1cmwuc2VhcmNoUGFyYW1zLmdldCgncScpXG4gICAgaWYgKHEpIHtcbiAgICAgICAgY29uc29sZS5sb2cocSlcbiAgICAgICAgc2VhcmNoRXZlbnRJbnB1dC52YWx1ZSA9IHFcbiAgICB9XG59XG5cbi8vIGNsZWFyIGRhdGVwaWNrZXIgc2VhcmNoIGlucHV0c1xuZnVuY3Rpb24gY2xlYXJTZWFyY2hEYXRlSW5wdXQoKSB7XG4gICAgY29uc3QgZGF0ZXBpY2tlckV2ZW50SW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3QtZXZlbnQtc29ydC1kYXRlcGlja2VyJylcbiAgICBkYXRlcGlja2VyRXZlbnRJbnB1dHMuZm9yRWFjaCgoZGF0ZXBpY2tlcjogSFRNTElucHV0RWxlbWVudCkgPT4ge1xuICAgICAgICBkYXRlcGlja2VyLnZhbHVlID0gJydcbiAgICAgICAgZ2V0RmlsdGVyVmFsdWVzKClcbiAgICB9KVxufVxuXG5jb25zdCBjbGVhckRhdGVTZWFyY2hCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ldmVudC1jbGVhci1idXR0b24nKVxuY2xlYXJEYXRlU2VhcmNoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xlYXJTZWFyY2hEYXRlSW5wdXQpXG5cbmNvbnN0IGRvd25sb2FkQ1NWID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIC8vIEZpbHRlcnNcbiAgICBjb25zdCBzZWFyY2hFdmVudElucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RhYmxlLXNlYXJjaC1ldmVudCcpXG4gICAgY29uc3QgZGF0ZUV2ZW50U3RhcnRGcm9tSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAnI3Byb2R1Y3QtZXZlbnQtc29ydC1zdGFydC1mcm9tLWRhdGVwaWNrZXInXG4gICAgKVxuICAgIGNvbnN0IGRhdGVFdmVudFN0YXJ0VG9JbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWV2ZW50LXNvcnQtc3RhcnQtdG8tZGF0ZXBpY2tlcicpXG4gICAgY29uc3QgZGF0ZUV2ZW50RW5kRnJvbUlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZXZlbnQtc29ydC1lbmQtZnJvbS1kYXRlcGlja2VyJylcbiAgICBjb25zdCBkYXRlRXZlbnRFbmRUb0lucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZXZlbnQtc29ydC1lbmQtdG8tZGF0ZXBpY2tlcicpXG5cbiAgICBjb25zdCBmaWx0ZXJzTWFwID0ge1xuICAgICAgICBxOiBzZWFyY2hFdmVudElucHV0LFxuICAgICAgICBzdGFydF9mcm9tOiBkYXRlRXZlbnRTdGFydEZyb21JbnB1dCxcbiAgICAgICAgc3RhcnRfdG86IGRhdGVFdmVudFN0YXJ0VG9JbnB1dCxcbiAgICAgICAgZW5kX2Zyb206IGRhdGVFdmVudEVuZEZyb21JbnB1dCxcbiAgICAgICAgZW5kX3RvOiBkYXRlRXZlbnRFbmRUb0lucHV0LFxuICAgIH1cblxuICAgIGNvbnN0IGZpbHRlclF1ZXJ5ID0gW11cbiAgICBmb3IgKGNvbnN0IFtxdWVyeUtleSwgcXVlcnlJbnB1dF0gb2YgT2JqZWN0LmVudHJpZXMoZmlsdGVyc01hcCkpIHtcbiAgICAgICAgZmlsdGVyUXVlcnkucHVzaChgJHtxdWVyeUtleX09JHtxdWVyeUlucHV0LnZhbHVlfWApXG4gICAgfVxuXG4gICAgLy8gQ1NWIEhlYWRlcnNcbiAgICBjb25zdCBjc3ZEYXRhID0gWydpZCxwcm9kdWN0X25hbWUsc2t1LHVzZXJuYW1lLGRhdGVfc3RhcnQsZGF0ZV9lbmQsY29tbWVudCddXG4gICAgbGV0IHBhZ2VzID0gMVxuICAgIGNvbnN0IHF1ZXJ5VGFpbCA9IGZpbHRlclF1ZXJ5LmpvaW4oJyYnKVxuXG4gICAgZm9yIChsZXQgcGFnZSA9IDE7IHBhZ2UgPD0gcGFnZXM7IHBhZ2UrKykge1xuICAgICAgICBjb25zdCB1cmwgPSBbYGFwaT9wYWdlPXtwYWdlfWAsIHF1ZXJ5VGFpbF0uam9pbignJicpXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHVybClcbiAgICAgICAgY29uc3QgZGF0YTogSUV2ZW50c1Jlc3BvbnNlID0gYXdhaXQgcmVzLmpzb24oKVxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmV2ZW50cylcblxuICAgICAgICBkYXRhLmV2ZW50cy5mb3JFYWNoKChldmVudCkgPT4ge1xuICAgICAgICAgICAgY3N2RGF0YS5wdXNoKFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuaWQsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByb2R1Y3QubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJvZHVjdC5TS1UsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmRhdGVGcm9tLFxuICAgICAgICAgICAgICAgICAgICBldmVudC5kYXRlVG8sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmNvbW1lbnQsXG4gICAgICAgICAgICAgICAgXS5qb2luKCcsJylcbiAgICAgICAgICAgIClcbiAgICAgICAgfSlcbiAgICAgICAgcGFnZXMgPSBkYXRhLnBhZ2luYXRpb24ucGFnZXNcbiAgICB9XG5cbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2NzdkRhdGEuam9pbignXFxuJyldLCB7IHR5cGU6ICd0ZXh0L2NzdicgfSlcbiAgICBjb25zdCB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKVxuICAgIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgICBhLnNldEF0dHJpYnV0ZSgnaHJlZicsIHVybClcbiAgICBhLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCAnZXZlbnRzLmNzdicpXG4gICAgYS5jbGljaygpXG4gICAgYS5yZW1vdmUoKVxufVxuXG4vLyBzZWFyY2ggZmxvd1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBjb25zdCBzZWFyY2hFdmVudElucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RhYmxlLXNlYXJjaC1ldmVudCcpXG4gICAgY29uc3Qgc2VhcmNoRXZlbnRJbnB1dEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YWJsZS1zZWFyY2gtZXZlbnQtYnV0dG9uJylcblxuICAgIGlmIChzZWFyY2hFdmVudElucHV0QnV0dG9uICYmIHNlYXJjaEV2ZW50SW5wdXQpIHtcbiAgICAgICAgc2VhcmNoRXZlbnRJbnB1dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGdldEZpbHRlclZhbHVlcygpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgZGF0ZXBpY2tlckV2ZW50SW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3QtZXZlbnQtc29ydC1kYXRlcGlja2VyJylcbiAgICBkYXRlcGlja2VyRXZlbnRJbnB1dHMuZm9yRWFjaCgoZGF0ZXBpY2tlcikgPT4ge1xuICAgICAgICBkYXRlcGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZURhdGUnLCAoZSkgPT4ge1xuICAgICAgICAgICAgZ2V0RmlsdGVyVmFsdWVzKClcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgY29uc3QgYnV0dG9uRG93bmxvYWRDU1YgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnV0dG9uLWNzdi1kb3dubG9hZCcpXG4gICAgYnV0dG9uRG93bmxvYWRDU1YuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkb3dubG9hZENTVik7XG59KVxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbl9fd2VicGFja19tb2R1bGVzX19bXCIuL3NyYy9ldmVudC50c1wiXSgpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9