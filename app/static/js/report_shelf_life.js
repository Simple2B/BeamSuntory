/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/htmx.ts":
/*!*********************!*\
  !*** ./src/htmx.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var HTMXDispatcher = /** @class */ (function () {
    function HTMXDispatcher() {
        var _this = this;
        this.onloadCallbacks = {};
        document.addEventListener('htmx:load', function (evt) {
            var target = evt.target;
            var targetId = target.getAttribute('id');
            if (_this.onloadCallbacks.hasOwnProperty(targetId)) {
                var callback = _this.onloadCallbacks[targetId];
                callback(target);
            }
        });
    }
    HTMXDispatcher.prototype.onLoad = function (targetId, callback) {
        this.onloadCallbacks[targetId] = callback;
    };
    return HTMXDispatcher;
}());
exports["default"] = HTMXDispatcher;


/***/ }),

/***/ "./src/report_shelf_life.ts":
/*!**********************************!*\
  !*** ./src/report_shelf_life.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
var htmx_1 = __webpack_require__(/*! ./htmx */ "./src/htmx.ts");
// initialize htmx listener
var htmxDispatcher = new htmx_1.default();
var defaultBrandImage = 'https://raw.githubusercontent.com/Simple2B/BeamSuntory/develop/app/static/img/no_picture_default.png';
var formatDate = function (date) {
    var createAt = new Date(date);
    var year = createAt.getFullYear();
    var month = String(createAt.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    var day = String(createAt.getDate()).padStart(2, '0');
    var hours = String(createAt.getHours()).padStart(2, '0');
    var minutes = String(createAt.getMinutes()).padStart(2, '0');
    return "".concat(month, "/").concat(day, "/").concat(year);
};
var downloadCSV = function () {
    return __awaiter(this, void 0, void 0, function () {
        var searchShelfLifeInput, dateShelfLifeCreatedFromInput, dateShelfLifeCreatedToInput, filtersMap, filterQuery, _i, _a, _b, queryKey, queryInput, csvData, pages, queryTail, page, currentURL, urlWithoutQueryParams, url_1, res, data, blob, url, a;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    searchShelfLifeInput = document.querySelector('#table-search-shelf-life');
                    dateShelfLifeCreatedFromInput = document.querySelector('#filter-start-date');
                    dateShelfLifeCreatedToInput = document.querySelector('#filter-end-date');
                    filtersMap = {
                        q: searchShelfLifeInput,
                        created_from: dateShelfLifeCreatedFromInput,
                        created_to: dateShelfLifeCreatedToInput,
                    };
                    filterQuery = [];
                    for (_i = 0, _a = Object.entries(filtersMap); _i < _a.length; _i++) {
                        _b = _a[_i], queryKey = _b[0], queryInput = _b[1];
                        filterQuery.push("".concat(queryKey, "=").concat(queryInput.value));
                    }
                    csvData = ['ShelfLife, shelfLifeStart, shelfLifeEnd, quantityOrdered, quantityReceived'];
                    pages = 1;
                    queryTail = filterQuery ? filterQuery.join('&') : '';
                    page = 1;
                    _c.label = 1;
                case 1:
                    if (!(page <= pages)) return [3 /*break*/, 5];
                    currentURL = window.location.href;
                    urlWithoutQueryParams = currentURL.split('?')[0];
                    url_1 = ["api?page=".concat(page), queryTail].join('&');
                    return [4 /*yield*/, fetch("".concat(urlWithoutQueryParams, "/").concat(url_1))];
                case 2:
                    res = _c.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _c.sent();
                    data.reportShelfLifeList.forEach(function (report) {
                        var received;
                        if (!report.quantityReceived) {
                            received = '-';
                        }
                        else {
                            received = report.quantityReceived.toString();
                        }
                        csvData.push([
                            report.product.SKU,
                            formatDate(report.shelfLifeStart),
                            formatDate(report.shelfLifeStart),
                            report.quantity,
                            received,
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
                    a.setAttribute('download', 'inventories.csv');
                    a.click();
                    a.remove();
                    return [2 /*return*/];
            }
        });
    });
};
document.addEventListener('DOMContentLoaded', function () {
    var filtersHTML = document.querySelectorAll("[name='q'], [name='username'], [name='created_from'], [name='created_to'], [name='master_group'], [name='group'], [name='group_brand'],  [name='group_categories'], [name='group_language'], [name='group_premises'], [name='expire_in']");
    var buttonLoadInventoriesTable = document.querySelector('#table-report-loader');
    var clearFilterButton = document.querySelector('#product-shelf-life-clear-button');
    clearFilterButton.addEventListener('click', function () {
        filtersHTML.forEach(function (filter) {
            filter.value = '';
        });
        buttonLoadInventoriesTable.click();
    });
    // load table
    buttonLoadInventoriesTable.click();
});
// Download csv
var downloadCsvButton = document.getElementById('button-csv-download');
downloadCsvButton.addEventListener('click', downloadCSV);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/report_shelf_life.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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S0FBSyxHQUFHLEVBQUUsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztRQUNILDBCQUEwQixDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsYUFBYTtJQUNiLDBCQUEwQixDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ3JDLENBQUMsQ0FBQyxDQUFDO0FBRUgsZUFBZTtBQUNmLElBQU0saUJBQWlCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBc0IsQ0FBQztBQUM5RixpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7Ozs7Ozs7VUM3SHpEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGF0aWMvLi9zcmMvaHRteC50cyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9zcmMvcmVwb3J0X3NoZWxmX2xpZmUudHMiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJ0eXBlIERpc3BhdGNoZXJDYWxsYmFjayA9ICh0YXJnZXQ6IEhUTUxFbGVtZW50KSA9PiB2b2lkO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIVE1YRGlzcGF0Y2hlciB7XG4gIG9ubG9hZENhbGxiYWNrczogeyBbbmFtZTogc3RyaW5nXTogRGlzcGF0Y2hlckNhbGxiYWNrIH07XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5vbmxvYWRDYWxsYmFja3MgPSB7fTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdodG14OmxvYWQnLCAoZXZ0KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0IGFzIEhUTUxEaXZFbGVtZW50O1xuICAgICAgY29uc3QgdGFyZ2V0SWQgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdpZCcpO1xuXG4gICAgICBpZiAodGhpcy5vbmxvYWRDYWxsYmFja3MuaGFzT3duUHJvcGVydHkodGFyZ2V0SWQpKSB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrID0gdGhpcy5vbmxvYWRDYWxsYmFja3NbdGFyZ2V0SWRdO1xuICAgICAgICBjYWxsYmFjayh0YXJnZXQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgb25Mb2FkKHRhcmdldElkOiBzdHJpbmcsIGNhbGxiYWNrOiBEaXNwYXRjaGVyQ2FsbGJhY2spIHtcbiAgICB0aGlzLm9ubG9hZENhbGxiYWNrc1t0YXJnZXRJZF0gPSBjYWxsYmFjaztcbiAgfVxufVxuIiwiaW1wb3J0IHsgSVByb2R1Y3QgfSBmcm9tICcuL2luYm91bmRfb3JkZXIvdHlwZXMnO1xuaW1wb3J0IHsgSVBhZ2luYXRpb24gfSBmcm9tICcuL2luYm91bmRfb3JkZXIvdHlwZXMnO1xuaW1wb3J0IEhUTVhEaXNwYXRjaGVyIGZyb20gJy4vaHRteCc7XG5cbmludGVyZmFjZSBJVXNlciB7XG4gIHVzZXJuYW1lOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBJV2FyZWhvdXNlUHJvZHVjdCB7XG4gIGdyb3VwOiBzdHJpbmc7XG4gIHByb2R1Y3Q6IElQcm9kdWN0O1xufVxuXG5pbnRlcmZhY2UgSVJlcG9ydFNoZWxmTGlmZSB7XG4gIHF1YW50aXR5OiBudW1iZXI7XG4gIHF1YW50aXR5UmVjZWl2ZWQ6IG51bWJlcjtcbiAgc2hlbGZMaWZlU3RhcnQ6IHN0cmluZztcbiAgc2hlbGZMaWZlRW5kOiBzdHJpbmc7XG4gIHByb2R1Y3Q6IElQcm9kdWN0O1xuICAvLyBUT0RPIGRvIHdlIG5lZWQgdGhpcz9cbiAgLy8gcHJvZHVjdFF1YW50aXR5R3JvdXBzOiBsaXN0W1Byb2R1Y3RHcm91cE91dF0gPSBGaWVsZChcbiAgLy8gICAgIGFsaWFzPVwicHJvZHVjdFF1YW50aXR5R3JvdXBzXCJcbiAgLy8gKVxufVxuXG5pbnRlcmZhY2UgSVJlcG9ydFNoZWxmTGlmZVJlc3BvbnNlIHtcbiAgcGFnaW5hdGlvbjogSVBhZ2luYXRpb247XG4gIHJlcG9ydFNoZWxmTGlmZUxpc3Q6IElSZXBvcnRTaGVsZkxpZmVbXTtcbn1cblxuLy8gaW5pdGlhbGl6ZSBodG14IGxpc3RlbmVyXG5jb25zdCBodG14RGlzcGF0Y2hlciA9IG5ldyBIVE1YRGlzcGF0Y2hlcigpO1xuXG5jb25zdCBkZWZhdWx0QnJhbmRJbWFnZSA9XG4gICdodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vU2ltcGxlMkIvQmVhbVN1bnRvcnkvZGV2ZWxvcC9hcHAvc3RhdGljL2ltZy9ub19waWN0dXJlX2RlZmF1bHQucG5nJztcblxuY29uc3QgZm9ybWF0RGF0ZSA9IChkYXRlOiBzdHJpbmcpID0+IHtcbiAgY29uc3QgY3JlYXRlQXQgPSBuZXcgRGF0ZShkYXRlKTtcbiAgY29uc3QgeWVhciA9IGNyZWF0ZUF0LmdldEZ1bGxZZWFyKCk7XG4gIGNvbnN0IG1vbnRoID0gU3RyaW5nKGNyZWF0ZUF0LmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCAnMCcpOyAvLyBNb250aCBpcyAwLWJhc2VkXG4gIGNvbnN0IGRheSA9IFN0cmluZyhjcmVhdGVBdC5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsICcwJyk7XG4gIGNvbnN0IGhvdXJzID0gU3RyaW5nKGNyZWF0ZUF0LmdldEhvdXJzKCkpLnBhZFN0YXJ0KDIsICcwJyk7XG4gIGNvbnN0IG1pbnV0ZXMgPSBTdHJpbmcoY3JlYXRlQXQuZ2V0TWludXRlcygpKS5wYWRTdGFydCgyLCAnMCcpO1xuICByZXR1cm4gYCR7bW9udGh9LyR7ZGF5fS8ke3llYXJ9YDtcbn07XG5cbmNvbnN0IGRvd25sb2FkQ1NWID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICAvLyBGaWx0ZXJzXG4gIGNvbnN0IHNlYXJjaFNoZWxmTGlmZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RhYmxlLXNlYXJjaC1zaGVsZi1saWZlJyk7XG4gIGNvbnN0IGRhdGVTaGVsZkxpZmVDcmVhdGVkRnJvbUlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbHRlci1zdGFydC1kYXRlJyk7XG4gIGNvbnN0IGRhdGVTaGVsZkxpZmVDcmVhdGVkVG9JbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWx0ZXItZW5kLWRhdGUnKTtcblxuICBjb25zdCBmaWx0ZXJzTWFwID0ge1xuICAgIHE6IHNlYXJjaFNoZWxmTGlmZUlucHV0LFxuICAgIGNyZWF0ZWRfZnJvbTogZGF0ZVNoZWxmTGlmZUNyZWF0ZWRGcm9tSW5wdXQsXG4gICAgY3JlYXRlZF90bzogZGF0ZVNoZWxmTGlmZUNyZWF0ZWRUb0lucHV0LFxuICB9O1xuXG4gIGNvbnN0IGZpbHRlclF1ZXJ5ID0gW107XG4gIGZvciAoY29uc3QgW3F1ZXJ5S2V5LCBxdWVyeUlucHV0XSBvZiBPYmplY3QuZW50cmllcyhmaWx0ZXJzTWFwKSkge1xuICAgIGZpbHRlclF1ZXJ5LnB1c2goYCR7cXVlcnlLZXl9PSR7cXVlcnlJbnB1dC52YWx1ZX1gKTtcbiAgfVxuXG4gIC8vIENTViBIZWFkZXJzXG4gIGNvbnN0IGNzdkRhdGEgPSBbJ1NoZWxmTGlmZSwgc2hlbGZMaWZlU3RhcnQsIHNoZWxmTGlmZUVuZCwgcXVhbnRpdHlPcmRlcmVkLCBxdWFudGl0eVJlY2VpdmVkJ107XG4gIGxldCBwYWdlcyA9IDE7XG4gIGNvbnN0IHF1ZXJ5VGFpbCA9IGZpbHRlclF1ZXJ5ID8gZmlsdGVyUXVlcnkuam9pbignJicpIDogJyc7XG5cbiAgZm9yIChsZXQgcGFnZSA9IDE7IHBhZ2UgPD0gcGFnZXM7IHBhZ2UrKykge1xuICAgIGNvbnN0IGN1cnJlbnRVUkwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICBjb25zdCB1cmxXaXRob3V0UXVlcnlQYXJhbXMgPSBjdXJyZW50VVJMLnNwbGl0KCc/JylbMF07XG4gICAgY29uc3QgdXJsID0gW2BhcGk/cGFnZT0ke3BhZ2V9YCwgcXVlcnlUYWlsXS5qb2luKCcmJyk7XG5cbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHt1cmxXaXRob3V0UXVlcnlQYXJhbXN9LyR7dXJsfWApO1xuICAgIGNvbnN0IGRhdGE6IElSZXBvcnRTaGVsZkxpZmVSZXNwb25zZSA9IGF3YWl0IHJlcy5qc29uKCk7XG5cbiAgICBkYXRhLnJlcG9ydFNoZWxmTGlmZUxpc3QuZm9yRWFjaCgocmVwb3J0OiBJUmVwb3J0U2hlbGZMaWZlKSA9PiB7XG4gICAgICBsZXQgcmVjZWl2ZWQ7XG4gICAgICBpZiAoIXJlcG9ydC5xdWFudGl0eVJlY2VpdmVkKSB7XG4gICAgICAgIHJlY2VpdmVkID0gJy0nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVjZWl2ZWQgPSByZXBvcnQucXVhbnRpdHlSZWNlaXZlZC50b1N0cmluZygpO1xuICAgICAgfVxuXG4gICAgICBjc3ZEYXRhLnB1c2goXG4gICAgICAgIFtcbiAgICAgICAgICByZXBvcnQucHJvZHVjdC5TS1UsXG4gICAgICAgICAgZm9ybWF0RGF0ZShyZXBvcnQuc2hlbGZMaWZlU3RhcnQpLFxuICAgICAgICAgIGZvcm1hdERhdGUocmVwb3J0LnNoZWxmTGlmZVN0YXJ0KSxcbiAgICAgICAgICByZXBvcnQucXVhbnRpdHksXG4gICAgICAgICAgcmVjZWl2ZWQsXG4gICAgICAgIF0uam9pbignLCcpXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgcGFnZXMgPSBkYXRhLnBhZ2luYXRpb24ucGFnZXM7XG4gIH1cbiAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtjc3ZEYXRhLmpvaW4oJ1xcbicpXSwgeyB0eXBlOiAndGV4dC9jc3YnIH0pO1xuICBjb25zdCB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgYS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB1cmwpO1xuICBhLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCAnaW52ZW50b3JpZXMuY3N2Jyk7XG4gIGEuY2xpY2soKTtcbiAgYS5yZW1vdmUoKTtcbn07XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIGNvbnN0IGZpbHRlcnNIVE1MID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICBcIltuYW1lPSdxJ10sIFtuYW1lPSd1c2VybmFtZSddLCBbbmFtZT0nY3JlYXRlZF9mcm9tJ10sIFtuYW1lPSdjcmVhdGVkX3RvJ10sIFtuYW1lPSdtYXN0ZXJfZ3JvdXAnXSwgW25hbWU9J2dyb3VwJ10sIFtuYW1lPSdncm91cF9icmFuZCddLCAgW25hbWU9J2dyb3VwX2NhdGVnb3JpZXMnXSwgW25hbWU9J2dyb3VwX2xhbmd1YWdlJ10sIFtuYW1lPSdncm91cF9wcmVtaXNlcyddLCBbbmFtZT0nZXhwaXJlX2luJ11cIlxuICApO1xuICBjb25zdCBidXR0b25Mb2FkSW52ZW50b3JpZXNUYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YWJsZS1yZXBvcnQtbG9hZGVyJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG5cbiAgY29uc3QgY2xlYXJGaWx0ZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1zaGVsZi1saWZlLWNsZWFyLWJ1dHRvbicpO1xuICBjbGVhckZpbHRlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBmaWx0ZXJzSFRNTC5mb3JFYWNoKChmaWx0ZXIpID0+IHtcbiAgICAgIChmaWx0ZXIgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSAnJztcbiAgICB9KTtcbiAgICBidXR0b25Mb2FkSW52ZW50b3JpZXNUYWJsZS5jbGljaygpO1xuICB9KTtcbiAgLy8gbG9hZCB0YWJsZVxuICBidXR0b25Mb2FkSW52ZW50b3JpZXNUYWJsZS5jbGljaygpO1xufSk7XG5cbi8vIERvd25sb2FkIGNzdlxuY29uc3QgZG93bmxvYWRDc3ZCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnV0dG9uLWNzdi1kb3dubG9hZCcpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuZG93bmxvYWRDc3ZCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkb3dubG9hZENTVik7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvcmVwb3J0X3NoZWxmX2xpZmUudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=