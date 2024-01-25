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

/***/ "./src/report_sku.ts":
/*!***************************!*\
  !*** ./src/report_sku.ts ***!
  \***************************/
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
var formatDate = function (date) {
    var createAt = new Date(date);
    var year = createAt.getFullYear();
    var month = String(createAt.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    var day = String(createAt.getDate()).padStart(2, '0');
    var hours = String(createAt.getHours()).padStart(2, '0');
    var minutes = String(createAt.getMinutes()).padStart(2, '0');
    return "".concat(month, "/").concat(day, "/").concat(year, " ").concat(hours, ":").concat(minutes);
};
var downloadCSV = function () {
    return __awaiter(this, void 0, void 0, function () {
        var searchSKUInput, dateSKUCreatedFromInput, dateSKUCreatedToInput, filtersMap, filterQuery, _i, _a, _b, queryKey, queryInput, csvData, pages, queryTail, page, currentURL, urlWithoutQueryParams, url_1, res, data, blob, url, a;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    searchSKUInput = document.querySelector('#table-search-sku');
                    dateSKUCreatedFromInput = document.querySelector('#product-sku-sort-created-from-datepicker');
                    dateSKUCreatedToInput = document.querySelector('#product-sku-sort-created-to-datepicker');
                    filtersMap = {
                        q: searchSKUInput,
                        created_from: dateSKUCreatedFromInput,
                        created_to: dateSKUCreatedToInput,
                    };
                    filterQuery = [];
                    for (_i = 0, _a = Object.entries(filtersMap); _i < _a.length; _i++) {
                        _b = _a[_i], queryKey = _b[0], queryInput = _b[1];
                        filterQuery.push("".concat(queryKey, "=").concat(queryInput.value));
                    }
                    csvData = ['SKU, Report Type, Status, Qty Before, Qty After, Created at'];
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
                    data.reportSKUList.forEach(function (report) {
                        var qtyBefore;
                        var qtyAfter;
                        if (!qtyBefore && !qtyBefore) {
                            qtyBefore = '-';
                            qtyAfter = '-';
                            console.log(qtyBefore, qtyAfter);
                        }
                        else if (!qtyBefore) {
                            qtyBefore = '-';
                            qtyAfter = report.qtyAfter.toString();
                        }
                        else {
                            qtyBefore = report.qtyBefore.toString();
                            qtyAfter = report.qtyAfter.toString();
                        }
                        csvData.push([report.product.SKU, report.type, report.status, qtyBefore, qtyAfter, formatDate(report.createdAt)].join(','));
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
    var filtersHTML = document.querySelectorAll("[name='q'], [name='username'], [name='created_from'], [name='created_to'], [name='master_group'], [name='group'], [name='group_brand'],  [name='group_categories'], [name='group_language'], [name='group_premises'], [name='group_event']");
    var buttonLoadInventoriesTable = document.querySelector('#table-report-loader');
    var clearFilterButton = document.querySelector('#product-sku-clear-button');
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/report_sku.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QzdPLENBQUM7SUFDRixJQUFNLDBCQUEwQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQXNCLENBQUM7SUFFdkcsSUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDOUUsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO1FBQzFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNO1lBQ3hCLE1BQTJCLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztRQUNILDBCQUEwQixDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsYUFBYTtJQUNiLDBCQUEwQixDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ3JDLENBQUMsQ0FBQyxDQUFDO0FBRUgsZUFBZTtBQUNmLElBQU0saUJBQWlCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBc0IsQ0FBQztBQUM5RixpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7Ozs7Ozs7VUMvS3pEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGF0aWMvLi9zcmMvaHRteC50cyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9zcmMvcmVwb3J0X3NrdS50cyIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbInR5cGUgRGlzcGF0Y2hlckNhbGxiYWNrID0gKHRhcmdldDogSFRNTEVsZW1lbnQpID0+IHZvaWQ7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhUTVhEaXNwYXRjaGVyIHtcbiAgb25sb2FkQ2FsbGJhY2tzOiB7IFtuYW1lOiBzdHJpbmddOiBEaXNwYXRjaGVyQ2FsbGJhY2sgfTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm9ubG9hZENhbGxiYWNrcyA9IHt9O1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2h0bXg6bG9hZCcsIChldnQpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2dC50YXJnZXQgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgICBjb25zdCB0YXJnZXRJZCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG5cbiAgICAgIGlmICh0aGlzLm9ubG9hZENhbGxiYWNrcy5oYXNPd25Qcm9wZXJ0eSh0YXJnZXRJZCkpIHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2sgPSB0aGlzLm9ubG9hZENhbGxiYWNrc1t0YXJnZXRJZF07XG4gICAgICAgIGNhbGxiYWNrKHRhcmdldCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBvbkxvYWQodGFyZ2V0SWQ6IHN0cmluZywgY2FsbGJhY2s6IERpc3BhdGNoZXJDYWxsYmFjaykge1xuICAgIHRoaXMub25sb2FkQ2FsbGJhY2tzW3RhcmdldElkXSA9IGNhbGxiYWNrO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2RhbE9wdGlvbnMsIE1vZGFsIH0gZnJvbSAnZmxvd2JpdGUnO1xuaW1wb3J0IEhUTVhEaXNwYXRjaGVyIGZyb20gJy4vaHRteCc7XG5pbXBvcnQgeyBJUHJvZHVjdCB9IGZyb20gJy4vaW5ib3VuZF9vcmRlci90eXBlcyc7XG5pbXBvcnQgeyBJSW5ib3VuZE9yZGVyQmFzZSB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgSVBhZ2luYXRpb24gfSBmcm9tICcuL2luYm91bmRfb3JkZXIvdHlwZXMnO1xuaW1wb3J0IHsgZGVmYXVsdEJyYW5kSW1hZ2UgfSBmcm9tICcuL2Jhc2UnO1xuXG5cbmludGVyZmFjZSBJQ2FydCB7XG4gIGdyb3VwOiBzdHJpbmc7XG4gIHByb2R1Y3Q6IElQcm9kdWN0O1xufVxuXG5pbnRlcmZhY2UgSUFkanVzdCB7XG4gIGdyb3VwOiBzdHJpbmc7XG4gIHByb2R1Y3Q6IElQcm9kdWN0O1xufVxuXG5pbnRlcmZhY2UgSUFzc2lnbiB7XG4gIGdyb3VwOiBzdHJpbmc7XG4gIHByb2R1Y3Q6IElQcm9kdWN0O1xufVxuXG5pbnRlcmZhY2UgSVJlcXVlc3RTaGFyZSB7XG4gIGdyb3VwOiBzdHJpbmc7XG4gIHByb2R1Y3Q6IElQcm9kdWN0O1xufVxuXG5pbnRlcmZhY2UgSVdhcmVob3VzZVByb2R1Y3Qge1xuICBncm91cDogc3RyaW5nO1xuICBwcm9kdWN0OiBJUHJvZHVjdDtcbn1cblxuaW50ZXJmYWNlIElSZXBvcnRTS1Uge1xuICBxdHlCZWZvcmU6IG51bWJlcjtcbiAgcXR5QWZ0ZXI6IG51bWJlcjtcbiAgdHlwZTogc3RyaW5nO1xuICBzdGF0dXM6IHN0cmluZztcbiAgcHJvZHVjdDogSVByb2R1Y3Q7XG4gIGluYm91bmRPcmRlcnM6IElJbmJvdW5kT3JkZXJCYXNlW107XG4gIHNoaXBSZXF1ZXN0czogSVNoaXBSZXF1ZXN0W107XG4gIGFkanVzdG1lbnRzOiBJQWRqdXN0W107XG4gIGFzc2lnbnM6IElBc3NpZ25bXTtcbiAgc2hhcmVzOiBJUmVxdWVzdFNoYXJlW107XG4gIHdhcmVob3VzZVByb2R1Y3Q6IElXYXJlaG91c2VQcm9kdWN0O1xuICBjcmVhdGVkQXQ6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIElTaGlwUmVxdWVzdCB7XG4gIGlkOiBudW1iZXI7XG4gIGNhcnRzOiBJQ2FydFtdO1xuICBjb21tZW50OiBzdHJpbmc7XG4gIGNyZWF0ZWRBdDogc3RyaW5nO1xuICBkYU5vdGVzOiBzdHJpbmc7XG4gIG9yZGVyTnVtYjogc3RyaW5nO1xuICBvcmRlclN0YXR1czogc3RyaW5nO1xuICBzdG9yZTogSVN0b3JlO1xuICBzdG9yZUlkOiBudW1iZXI7XG4gIHdtTm90ZXM6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIElTdG9yZSB7XG4gIGFjdGl2ZTogYm9vbGVhbjtcbiAgYWRkcmVzczogc3RyaW5nO1xuICBjaXR5OiBzdHJpbmc7XG4gIGNvbnRhY3RQZXJzb246IHN0cmluZztcbiAgY291bnRyeTogc3RyaW5nO1xuICBjcmVhdGVkQXQ6IHN0cmluZztcbiAgZW1haWw6IHN0cmluZztcbiAgaWQ6IG51bWJlcjtcbiAgcGhvbmVOdW1iOiBzdHJpbmc7XG4gIHJlZ2lvbjogc3RyaW5nO1xuICBzdG9yZUNhdGVnb3J5SWQ6IG51bWJlcjtcbiAgc3RvcmVOYW1lOiBzdHJpbmc7XG4gIHppcDogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgSVJlcG9ydFNLVVJlc3BvbnNlIHtcbiAgcGFnaW5hdGlvbjogSVBhZ2luYXRpb247XG4gIHJlcG9ydFNLVUxpc3Q6IElSZXBvcnRTS1VbXTtcbn1cblxuLy8gaW5pdGlhbGl6ZSBodG14IGxpc3RlbmVyXG5jb25zdCBodG14RGlzcGF0Y2hlciA9IG5ldyBIVE1YRGlzcGF0Y2hlcigpO1xuXG5jb25zdCBmb3JtYXREYXRlID0gKGRhdGU6IHN0cmluZykgPT4ge1xuICBjb25zdCBjcmVhdGVBdCA9IG5ldyBEYXRlKGRhdGUpO1xuICBjb25zdCB5ZWFyID0gY3JlYXRlQXQuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgbW9udGggPSBTdHJpbmcoY3JlYXRlQXQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsICcwJyk7IC8vIE1vbnRoIGlzIDAtYmFzZWRcbiAgY29uc3QgZGF5ID0gU3RyaW5nKGNyZWF0ZUF0LmdldERhdGUoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgY29uc3QgaG91cnMgPSBTdHJpbmcoY3JlYXRlQXQuZ2V0SG91cnMoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgY29uc3QgbWludXRlcyA9IFN0cmluZyhjcmVhdGVBdC5nZXRNaW51dGVzKCkpLnBhZFN0YXJ0KDIsICcwJyk7XG4gIHJldHVybiBgJHttb250aH0vJHtkYXl9LyR7eWVhcn0gJHtob3Vyc306JHttaW51dGVzfWA7XG59O1xuXG5jb25zdCBkb3dubG9hZENTViA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgLy8gRmlsdGVyc1xuICBjb25zdCBzZWFyY2hTS1VJbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YWJsZS1zZWFyY2gtc2t1Jyk7XG4gIGNvbnN0IGRhdGVTS1VDcmVhdGVkRnJvbUlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtc2t1LXNvcnQtY3JlYXRlZC1mcm9tLWRhdGVwaWNrZXInKTtcbiAgY29uc3QgZGF0ZVNLVUNyZWF0ZWRUb0lucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtc2t1LXNvcnQtY3JlYXRlZC10by1kYXRlcGlja2VyJyk7XG5cbiAgY29uc3QgZmlsdGVyc01hcCA9IHtcbiAgICBxOiBzZWFyY2hTS1VJbnB1dCxcbiAgICBjcmVhdGVkX2Zyb206IGRhdGVTS1VDcmVhdGVkRnJvbUlucHV0LFxuICAgIGNyZWF0ZWRfdG86IGRhdGVTS1VDcmVhdGVkVG9JbnB1dCxcbiAgfTtcblxuICBjb25zdCBmaWx0ZXJRdWVyeSA9IFtdO1xuICBmb3IgKGNvbnN0IFtxdWVyeUtleSwgcXVlcnlJbnB1dF0gb2YgT2JqZWN0LmVudHJpZXMoZmlsdGVyc01hcCkpIHtcbiAgICBmaWx0ZXJRdWVyeS5wdXNoKGAke3F1ZXJ5S2V5fT0ke3F1ZXJ5SW5wdXQudmFsdWV9YCk7XG4gIH1cblxuICAvLyBDU1YgSGVhZGVyc1xuICBjb25zdCBjc3ZEYXRhID0gWydTS1UsIFJlcG9ydCBUeXBlLCBTdGF0dXMsIFF0eSBCZWZvcmUsIFF0eSBBZnRlciwgQ3JlYXRlZCBhdCddO1xuICBsZXQgcGFnZXMgPSAxO1xuICBjb25zdCBxdWVyeVRhaWwgPSBmaWx0ZXJRdWVyeSA/IGZpbHRlclF1ZXJ5LmpvaW4oJyYnKSA6ICcnO1xuXG4gIGZvciAobGV0IHBhZ2UgPSAxOyBwYWdlIDw9IHBhZ2VzOyBwYWdlKyspIHtcbiAgICBjb25zdCBjdXJyZW50VVJMID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgY29uc3QgdXJsV2l0aG91dFF1ZXJ5UGFyYW1zID0gY3VycmVudFVSTC5zcGxpdCgnPycpWzBdO1xuICAgIGNvbnN0IHVybCA9IFtgYXBpP3BhZ2U9JHtwYWdlfWAsIHF1ZXJ5VGFpbF0uam9pbignJicpO1xuXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYCR7dXJsV2l0aG91dFF1ZXJ5UGFyYW1zfS8ke3VybH1gKTtcbiAgICBjb25zdCBkYXRhOiBJUmVwb3J0U0tVUmVzcG9uc2UgPSBhd2FpdCByZXMuanNvbigpO1xuXG4gICAgZGF0YS5yZXBvcnRTS1VMaXN0LmZvckVhY2goKHJlcG9ydDogSVJlcG9ydFNLVSkgPT4ge1xuICAgICAgbGV0IHF0eUJlZm9yZTtcbiAgICAgIGxldCBxdHlBZnRlcjtcbiAgICAgIGlmICghcXR5QmVmb3JlICYmICFxdHlCZWZvcmUpIHtcbiAgICAgICAgcXR5QmVmb3JlID0gJy0nO1xuICAgICAgICBxdHlBZnRlciA9ICctJztcbiAgICAgICAgY29uc29sZS5sb2cocXR5QmVmb3JlLCBxdHlBZnRlcik7XG4gICAgICB9IGVsc2UgaWYgKCFxdHlCZWZvcmUpIHtcbiAgICAgICAgcXR5QmVmb3JlID0gJy0nO1xuICAgICAgICBxdHlBZnRlciA9IHJlcG9ydC5xdHlBZnRlci50b1N0cmluZygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcXR5QmVmb3JlID0gcmVwb3J0LnF0eUJlZm9yZS50b1N0cmluZygpO1xuICAgICAgICBxdHlBZnRlciA9IHJlcG9ydC5xdHlBZnRlci50b1N0cmluZygpO1xuICAgICAgfVxuXG4gICAgICBjc3ZEYXRhLnB1c2goXG4gICAgICAgIFtyZXBvcnQucHJvZHVjdC5TS1UsIHJlcG9ydC50eXBlLCByZXBvcnQuc3RhdHVzLCBxdHlCZWZvcmUsIHF0eUFmdGVyLCBmb3JtYXREYXRlKHJlcG9ydC5jcmVhdGVkQXQpXS5qb2luKCcsJylcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBwYWdlcyA9IGRhdGEucGFnaW5hdGlvbi5wYWdlcztcbiAgfVxuICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2NzdkRhdGEuam9pbignXFxuJyldLCB7IHR5cGU6ICd0ZXh0L2NzdicgfSk7XG4gIGNvbnN0IHVybCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICBhLnNldEF0dHJpYnV0ZSgnaHJlZicsIHVybCk7XG4gIGEuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsICdpbnZlbnRvcmllcy5jc3YnKTtcbiAgYS5jbGljaygpO1xuICBhLnJlbW92ZSgpO1xufTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgY29uc3QgZmlsdGVyc0hUTUwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgIFwiW25hbWU9J3EnXSwgW25hbWU9J3VzZXJuYW1lJ10sIFtuYW1lPSdjcmVhdGVkX2Zyb20nXSwgW25hbWU9J2NyZWF0ZWRfdG8nXSwgW25hbWU9J21hc3Rlcl9ncm91cCddLCBbbmFtZT0nZ3JvdXAnXSwgW25hbWU9J2dyb3VwX2JyYW5kJ10sICBbbmFtZT0nZ3JvdXBfY2F0ZWdvcmllcyddLCBbbmFtZT0nZ3JvdXBfbGFuZ3VhZ2UnXSwgW25hbWU9J2dyb3VwX3ByZW1pc2VzJ10sIFtuYW1lPSdncm91cF9ldmVudCddXCJcbiAgKTtcbiAgY29uc3QgYnV0dG9uTG9hZEludmVudG9yaWVzVGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFibGUtcmVwb3J0LWxvYWRlcicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuXG4gIGNvbnN0IGNsZWFyRmlsdGVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtc2t1LWNsZWFyLWJ1dHRvbicpO1xuICBjbGVhckZpbHRlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBmaWx0ZXJzSFRNTC5mb3JFYWNoKChmaWx0ZXIpID0+IHtcbiAgICAgIChmaWx0ZXIgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSAnJztcbiAgICB9KTtcbiAgICBidXR0b25Mb2FkSW52ZW50b3JpZXNUYWJsZS5jbGljaygpO1xuICB9KTtcbiAgLy8gbG9hZCB0YWJsZVxuICBidXR0b25Mb2FkSW52ZW50b3JpZXNUYWJsZS5jbGljaygpO1xufSk7XG5cbi8vIERvd25sb2FkIGNzdlxuY29uc3QgZG93bmxvYWRDc3ZCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnV0dG9uLWNzdi1kb3dubG9hZCcpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuZG93bmxvYWRDc3ZCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkb3dubG9hZENTVik7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvcmVwb3J0X3NrdS50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==