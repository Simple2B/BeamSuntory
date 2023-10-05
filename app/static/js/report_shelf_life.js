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
var defaultBrandImage = 'https://funko.com/on/demandware.static/-/Sites-funko-master-catalog/default/dwbb38a111/images/funko/upload/55998_CocaCola_S2_SpriteBottleCap_POP_GLAM-WEB.png';
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
                    dateShelfLifeCreatedFromInput = document.querySelector('#product-shelf-life-sort-created-from-datepicker');
                    dateShelfLifeCreatedToInput = document.querySelector('#product-shelf-life-sort-created-to-datepicker');
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
                    console.log(data);
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
    var filtersHTML = document.querySelectorAll("[name='q'], [name='username'], [name='created_from'], [name='created_to'], [name='master_group'], [name='group'], [name='group_brand'],  [name='group_category'], [name='group_language'], [name='group_premises'], [name='expire_in']");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TyxDQUFDLFVBQUMsTUFBTTtZQUN4QixNQUEyQixDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7UUFDSCwwQkFBMEIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNyQyxDQUFDLENBQUMsQ0FBQztJQUNILGFBQWE7SUFDYiwwQkFBMEIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNyQyxDQUFDLENBQUMsQ0FBQztBQUVILGVBQWU7QUFDZixJQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQXNCLENBQUM7QUFDOUYsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDOzs7Ozs7O1VDbEl6RDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RhdGljLy4vc3JjL2h0bXgudHMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vc3JjL3JlcG9ydF9zaGVsZl9saWZlLnRzIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsidHlwZSBEaXNwYXRjaGVyQ2FsbGJhY2sgPSAodGFyZ2V0OiBIVE1MRWxlbWVudCkgPT4gdm9pZFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIVE1YRGlzcGF0Y2hlciB7XG4gICAgb25sb2FkQ2FsbGJhY2tzOiB7IFtuYW1lOiBzdHJpbmddOiBEaXNwYXRjaGVyQ2FsbGJhY2sgfVxuXG4gICAgY29uc3RydWN0b3IgKCkgIHtcbiAgICAgICAgdGhpcy5vbmxvYWRDYWxsYmFja3MgPSB7fVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdodG14OmxvYWQnLCAoZXZ0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0IGFzIEhUTUxEaXZFbGVtZW50O1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0SWQgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdpZCcpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5vbmxvYWRDYWxsYmFja3MuaGFzT3duUHJvcGVydHkodGFyZ2V0SWQpKXtcbiAgICAgICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IHRoaXMub25sb2FkQ2FsbGJhY2tzW3RhcmdldElkXTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIG9uTG9hZCh0YXJnZXRJZDogc3RyaW5nLCBjYWxsYmFjazogRGlzcGF0Y2hlckNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMub25sb2FkQ2FsbGJhY2tzW3RhcmdldElkXSA9IGNhbGxiYWNrO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBJUHJvZHVjdCB9IGZyb20gJy4vaW5ib3VuZF9vcmRlci90eXBlcyc7XG5pbXBvcnQgeyBJUGFnaW5hdGlvbiB9IGZyb20gJy4vaW5ib3VuZF9vcmRlci90eXBlcyc7XG5pbXBvcnQgSFRNWERpc3BhdGNoZXIgZnJvbSAnLi9odG14JztcblxuaW50ZXJmYWNlIElVc2VyIHtcbiAgdXNlcm5hbWU6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIElXYXJlaG91c2VQcm9kdWN0IHtcbiAgZ3JvdXA6IHN0cmluZztcbiAgcHJvZHVjdDogSVByb2R1Y3Q7XG59XG5cbmludGVyZmFjZSBJUmVwb3J0U2hlbGZMaWZlIHtcbiAgcXVhbnRpdHk6IG51bWJlcjtcbiAgcXVhbnRpdHlSZWNlaXZlZDogbnVtYmVyO1xuICBzaGVsZkxpZmVTdGFydDogc3RyaW5nO1xuICBzaGVsZkxpZmVFbmQ6IHN0cmluZztcbiAgcHJvZHVjdDogSVByb2R1Y3Q7XG4gIC8vIFRPRE8gZG8gd2UgbmVlZCB0aGlzP1xuICAvLyBwcm9kdWN0UXVhbnRpdHlHcm91cHM6IGxpc3RbUHJvZHVjdEdyb3VwT3V0XSA9IEZpZWxkKFxuICAvLyAgICAgYWxpYXM9XCJwcm9kdWN0UXVhbnRpdHlHcm91cHNcIlxuICAvLyApXG59XG5cbmludGVyZmFjZSBJUmVwb3J0U2hlbGZMaWZlUmVzcG9uc2Uge1xuICBwYWdpbmF0aW9uOiBJUGFnaW5hdGlvbjtcbiAgcmVwb3J0U2hlbGZMaWZlTGlzdDogSVJlcG9ydFNoZWxmTGlmZVtdO1xufVxuXG4vLyBpbml0aWFsaXplIGh0bXggbGlzdGVuZXJcbmNvbnN0IGh0bXhEaXNwYXRjaGVyID0gbmV3IEhUTVhEaXNwYXRjaGVyKCk7XG5cbmNvbnN0IGRlZmF1bHRCcmFuZEltYWdlID1cbiAgJ2h0dHBzOi8vZnVua28uY29tL29uL2RlbWFuZHdhcmUuc3RhdGljLy0vU2l0ZXMtZnVua28tbWFzdGVyLWNhdGFsb2cvZGVmYXVsdC9kd2JiMzhhMTExL2ltYWdlcy9mdW5rby91cGxvYWQvNTU5OThfQ29jYUNvbGFfUzJfU3ByaXRlQm90dGxlQ2FwX1BPUF9HTEFNLVdFQi5wbmcnO1xuXG5jb25zdCBmb3JtYXREYXRlID0gKGRhdGU6IHN0cmluZykgPT4ge1xuICBjb25zdCBjcmVhdGVBdCA9IG5ldyBEYXRlKGRhdGUpO1xuICBjb25zdCB5ZWFyID0gY3JlYXRlQXQuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgbW9udGggPSBTdHJpbmcoY3JlYXRlQXQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsICcwJyk7IC8vIE1vbnRoIGlzIDAtYmFzZWRcbiAgY29uc3QgZGF5ID0gU3RyaW5nKGNyZWF0ZUF0LmdldERhdGUoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgY29uc3QgaG91cnMgPSBTdHJpbmcoY3JlYXRlQXQuZ2V0SG91cnMoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgY29uc3QgbWludXRlcyA9IFN0cmluZyhjcmVhdGVBdC5nZXRNaW51dGVzKCkpLnBhZFN0YXJ0KDIsICcwJyk7XG4gIHJldHVybiBgJHttb250aH0vJHtkYXl9LyR7eWVhcn1gO1xufTtcblxuY29uc3QgZG93bmxvYWRDU1YgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIC8vIEZpbHRlcnNcbiAgY29uc3Qgc2VhcmNoU2hlbGZMaWZlSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFibGUtc2VhcmNoLXNoZWxmLWxpZmUnKTtcbiAgY29uc3QgZGF0ZVNoZWxmTGlmZUNyZWF0ZWRGcm9tSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICcjcHJvZHVjdC1zaGVsZi1saWZlLXNvcnQtY3JlYXRlZC1mcm9tLWRhdGVwaWNrZXInXG4gICk7XG4gIGNvbnN0IGRhdGVTaGVsZkxpZmVDcmVhdGVkVG9JbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgJyNwcm9kdWN0LXNoZWxmLWxpZmUtc29ydC1jcmVhdGVkLXRvLWRhdGVwaWNrZXInXG4gICk7XG5cbiAgY29uc3QgZmlsdGVyc01hcCA9IHtcbiAgICBxOiBzZWFyY2hTaGVsZkxpZmVJbnB1dCxcbiAgICBjcmVhdGVkX2Zyb206IGRhdGVTaGVsZkxpZmVDcmVhdGVkRnJvbUlucHV0LFxuICAgIGNyZWF0ZWRfdG86IGRhdGVTaGVsZkxpZmVDcmVhdGVkVG9JbnB1dCxcbiAgfTtcblxuICBjb25zdCBmaWx0ZXJRdWVyeSA9IFtdO1xuICBmb3IgKGNvbnN0IFtxdWVyeUtleSwgcXVlcnlJbnB1dF0gb2YgT2JqZWN0LmVudHJpZXMoZmlsdGVyc01hcCkpIHtcbiAgICBmaWx0ZXJRdWVyeS5wdXNoKGAke3F1ZXJ5S2V5fT0ke3F1ZXJ5SW5wdXQudmFsdWV9YCk7XG4gIH1cblxuICAvLyBDU1YgSGVhZGVyc1xuICBjb25zdCBjc3ZEYXRhID0gWydTaGVsZkxpZmUsIHNoZWxmTGlmZVN0YXJ0LCBzaGVsZkxpZmVFbmQsIHF1YW50aXR5T3JkZXJlZCwgcXVhbnRpdHlSZWNlaXZlZCddO1xuICBsZXQgcGFnZXMgPSAxO1xuICBjb25zdCBxdWVyeVRhaWwgPSBmaWx0ZXJRdWVyeSA/IGZpbHRlclF1ZXJ5LmpvaW4oJyYnKSA6ICcnO1xuXG4gIGZvciAobGV0IHBhZ2UgPSAxOyBwYWdlIDw9IHBhZ2VzOyBwYWdlKyspIHtcbiAgICBjb25zdCBjdXJyZW50VVJMID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgY29uc3QgdXJsV2l0aG91dFF1ZXJ5UGFyYW1zID0gY3VycmVudFVSTC5zcGxpdCgnPycpWzBdO1xuICAgIGNvbnN0IHVybCA9IFtgYXBpP3BhZ2U9JHtwYWdlfWAsIHF1ZXJ5VGFpbF0uam9pbignJicpO1xuXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYCR7dXJsV2l0aG91dFF1ZXJ5UGFyYW1zfS8ke3VybH1gKTtcbiAgICBjb25zdCBkYXRhOiBJUmVwb3J0U2hlbGZMaWZlUmVzcG9uc2UgPSBhd2FpdCByZXMuanNvbigpO1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuXG4gICAgZGF0YS5yZXBvcnRTaGVsZkxpZmVMaXN0LmZvckVhY2goKHJlcG9ydDogSVJlcG9ydFNoZWxmTGlmZSkgPT4ge1xuICAgICAgbGV0IHJlY2VpdmVkO1xuICAgICAgaWYgKCFyZXBvcnQucXVhbnRpdHlSZWNlaXZlZCkge1xuICAgICAgICByZWNlaXZlZCA9ICctJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlY2VpdmVkID0gcmVwb3J0LnF1YW50aXR5UmVjZWl2ZWQudG9TdHJpbmcoKTtcbiAgICAgIH1cblxuICAgICAgY3N2RGF0YS5wdXNoKFxuICAgICAgICBbXG4gICAgICAgICAgcmVwb3J0LnByb2R1Y3QuU0tVLFxuICAgICAgICAgIGZvcm1hdERhdGUocmVwb3J0LnNoZWxmTGlmZVN0YXJ0KSxcbiAgICAgICAgICBmb3JtYXREYXRlKHJlcG9ydC5zaGVsZkxpZmVTdGFydCksXG4gICAgICAgICAgcmVwb3J0LnF1YW50aXR5LFxuICAgICAgICAgIHJlY2VpdmVkLFxuICAgICAgICBdLmpvaW4oJywnKVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHBhZ2VzID0gZGF0YS5wYWdpbmF0aW9uLnBhZ2VzO1xuICB9XG4gIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbY3N2RGF0YS5qb2luKCdcXG4nKV0sIHsgdHlwZTogJ3RleHQvY3N2JyB9KTtcbiAgY29uc3QgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gIGEuc2V0QXR0cmlidXRlKCdocmVmJywgdXJsKTtcbiAgYS5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgJ2ludmVudG9yaWVzLmNzdicpO1xuICBhLmNsaWNrKCk7XG4gIGEucmVtb3ZlKCk7XG59O1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICBjb25zdCBmaWx0ZXJzSFRNTCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgXCJbbmFtZT0ncSddLCBbbmFtZT0ndXNlcm5hbWUnXSwgW25hbWU9J2NyZWF0ZWRfZnJvbSddLCBbbmFtZT0nY3JlYXRlZF90byddLCBbbmFtZT0nbWFzdGVyX2dyb3VwJ10sIFtuYW1lPSdncm91cCddLCBbbmFtZT0nZ3JvdXBfYnJhbmQnXSwgIFtuYW1lPSdncm91cF9jYXRlZ29yeSddLCBbbmFtZT0nZ3JvdXBfbGFuZ3VhZ2UnXSwgW25hbWU9J2dyb3VwX3ByZW1pc2VzJ10sIFtuYW1lPSdleHBpcmVfaW4nXVwiXG4gICk7XG4gIGNvbnN0IGJ1dHRvbkxvYWRJbnZlbnRvcmllc1RhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RhYmxlLXJlcG9ydC1sb2FkZXInKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcblxuICBjb25zdCBjbGVhckZpbHRlckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXNoZWxmLWxpZmUtY2xlYXItYnV0dG9uJyk7XG4gIGNsZWFyRmlsdGVyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGZpbHRlcnNIVE1MLmZvckVhY2goKGZpbHRlcikgPT4ge1xuICAgICAgKGZpbHRlciBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9ICcnO1xuICAgIH0pO1xuICAgIGJ1dHRvbkxvYWRJbnZlbnRvcmllc1RhYmxlLmNsaWNrKCk7XG4gIH0pO1xuICAvLyBsb2FkIHRhYmxlXG4gIGJ1dHRvbkxvYWRJbnZlbnRvcmllc1RhYmxlLmNsaWNrKCk7XG59KTtcblxuLy8gRG93bmxvYWQgY3N2XG5jb25zdCBkb3dubG9hZENzdkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidXR0b24tY3N2LWRvd25sb2FkJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG5kb3dubG9hZENzdkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRvd25sb2FkQ1NWKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9yZXBvcnRfc2hlbGZfbGlmZS50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==