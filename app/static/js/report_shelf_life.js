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
    return "".concat(month, "/").concat(day, "/").concat(year, " ").concat(hours, ":").concat(minutes);
};
var downloadCSV = function () {
    return __awaiter(this, void 0, void 0, function () {
        var searchSKUInput, dateSKUCreatedFromInput, dateSKUCreatedToInput, filtersMap, filterQuery, _i, _a, _b, queryKey, queryInput, csvData, pages, queryTail, page, currentURL, urlWithoutQueryParams, url_1, res, data, blob, url, a;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    searchSKUInput = document.querySelector('#table-search-shelf-life');
                    dateSKUCreatedFromInput = document.querySelector('#product-shelf-life-sort-created-from-datepicker');
                    dateSKUCreatedToInput = document.querySelector('#product-shelf-life-sort-created-to-datepicker');
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
    var filtersHTML = document.querySelectorAll("[name='q'], [name='username'], [name='created_from'], [name='created_to'], [name='master_group'], [name='group'], [name='group_brand'],  [name='group_category'], [name='group_language'], [name='group_premises'], [name='group_event']");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUcsUUFBUSxDQUFDLGdCQUFnQixDQUMzQywwT0FBME8sQ0FDM08sQ0FBQztJQUNGLElBQU0sMEJBQTBCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBc0IsQ0FBQztJQUV2RyxJQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0NBQWtDLENBQUMsQ0FBQztJQUNyRixpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDMUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU07WUFDeEIsTUFBMkIsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsMEJBQTBCLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckMsQ0FBQyxDQUFDLENBQUM7SUFDSCxhQUFhO0lBQ2IsMEJBQTBCLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDckMsQ0FBQyxDQUFDLENBQUM7QUFFSCxlQUFlO0FBQ2YsSUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUFzQixDQUFDO0FBQzlGLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQzs7Ozs7OztVQ3RMekQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3N0YXRpYy8uL3NyYy9odG14LnRzIiwid2VicGFjazovL3N0YXRpYy8uL3NyYy9yZXBvcnRfc2hlbGZfbGlmZS50cyIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbInR5cGUgRGlzcGF0Y2hlckNhbGxiYWNrID0gKHRhcmdldDogSFRNTEVsZW1lbnQpID0+IHZvaWRcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFRNWERpc3BhdGNoZXIge1xuICAgIG9ubG9hZENhbGxiYWNrczogeyBbbmFtZTogc3RyaW5nXTogRGlzcGF0Y2hlckNhbGxiYWNrIH1cblxuICAgIGNvbnN0cnVjdG9yICgpICB7XG4gICAgICAgIHRoaXMub25sb2FkQ2FsbGJhY2tzID0ge31cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaHRteDpsb2FkJywgKGV2dCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZ0LnRhcmdldCBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldElkID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMub25sb2FkQ2FsbGJhY2tzLmhhc093blByb3BlcnR5KHRhcmdldElkKSl7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSB0aGlzLm9ubG9hZENhbGxiYWNrc1t0YXJnZXRJZF07XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBvbkxvYWQodGFyZ2V0SWQ6IHN0cmluZywgY2FsbGJhY2s6IERpc3BhdGNoZXJDYWxsYmFjaykge1xuICAgICAgICB0aGlzLm9ubG9hZENhbGxiYWNrc1t0YXJnZXRJZF0gPSBjYWxsYmFjaztcbiAgICB9XG59IiwiaW1wb3J0IHsgTW9kYWxPcHRpb25zLCBNb2RhbCB9IGZyb20gJ2Zsb3diaXRlJztcbmltcG9ydCB7IElQcm9kdWN0LCBJV2FyZWhvdXNlLCBJSW5ib3VuZE9yZGVyQmFzZSB9IGZyb20gJy4vaW5ib3VuZF9vcmRlci90eXBlcyc7XG5pbXBvcnQgSFRNWERpc3BhdGNoZXIgZnJvbSAnLi9odG14JztcblxuaW50ZXJmYWNlIElVc2VyIHtcbiAgdXNlcm5hbWU6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIElDYXJ0IHtcbiAgZ3JvdXA6IHN0cmluZztcbiAgcHJvZHVjdDogSVByb2R1Y3Q7XG59XG5cbmludGVyZmFjZSBJQWRqdXN0IHtcbiAgZ3JvdXA6IHN0cmluZztcbiAgcHJvZHVjdDogSVByb2R1Y3Q7XG59XG5cbmludGVyZmFjZSBJQXNzaWduIHtcbiAgZ3JvdXA6IHN0cmluZztcbiAgcHJvZHVjdDogSVByb2R1Y3Q7XG59XG5cbmludGVyZmFjZSBJUmVxdWVzdFNoYXJlIHtcbiAgZ3JvdXA6IHN0cmluZztcbiAgcHJvZHVjdDogSVByb2R1Y3Q7XG59XG5cbmludGVyZmFjZSBJV2FyZWhvdXNlUHJvZHVjdCB7XG4gIGdyb3VwOiBzdHJpbmc7XG4gIHByb2R1Y3Q6IElQcm9kdWN0O1xufVxuXG5pbnRlcmZhY2UgSVJlcG9ydFNLVSB7XG4gIHF0eUJlZm9yZTogbnVtYmVyO1xuICBxdHlBZnRlcjogbnVtYmVyO1xuICB0eXBlOiBzdHJpbmc7XG4gIHN0YXR1czogc3RyaW5nO1xuICBwcm9kdWN0OiBJUHJvZHVjdDtcbiAgaW5ib3VuZE9yZGVyczogSUluYm91bmRPcmRlckJhc2VbXTtcbiAgc2hpcFJlcXVlc3RzOiBJU2hpcFJlcXVlc3RbXTtcbiAgYWRqdXN0bWVudHM6IElBZGp1c3RbXTtcbiAgYXNzaWduczogSUFzc2lnbltdO1xuICBzaGFyZXM6IElSZXF1ZXN0U2hhcmVbXTtcbiAgd2FyZWhvdXNlUHJvZHVjdDogSVdhcmVob3VzZVByb2R1Y3Q7XG4gIGNyZWF0ZWRBdDogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgSVNoaXBSZXF1ZXN0IHtcbiAgaWQ6IG51bWJlcjtcbiAgY2FydHM6IElDYXJ0W107XG4gIGNvbW1lbnQ6IHN0cmluZztcbiAgY3JlYXRlZEF0OiBzdHJpbmc7XG4gIGRhTm90ZXM6IHN0cmluZztcbiAgb3JkZXJOdW1iOiBzdHJpbmc7XG4gIG9yZGVyU3RhdHVzOiBzdHJpbmc7XG4gIHN0b3JlOiBJU3RvcmU7XG4gIHN0b3JlSWQ6IG51bWJlcjtcbiAgd21Ob3Rlczogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgSVN0b3JlIHtcbiAgYWN0aXZlOiBib29sZWFuO1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIGNpdHk6IHN0cmluZztcbiAgY29udGFjdFBlcnNvbjogc3RyaW5nO1xuICBjb3VudHJ5OiBzdHJpbmc7XG4gIGNyZWF0ZWRBdDogc3RyaW5nO1xuICBlbWFpbDogc3RyaW5nO1xuICBpZDogbnVtYmVyO1xuICBwaG9uZU51bWI6IHN0cmluZztcbiAgcmVnaW9uOiBzdHJpbmc7XG4gIHN0b3JlQ2F0ZWdvcnlJZDogbnVtYmVyO1xuICBzdG9yZU5hbWU6IHN0cmluZztcbiAgemlwOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBJUmVwb3J0U0tVUmVzcG9uc2Uge1xuICBwYWdpbmF0aW9uOiBJUGFnaW5hdGlvbjtcbiAgcmVwb3J0U0tVTGlzdDogSVJlcG9ydFNLVVtdO1xufVxuXG4vLyBpbml0aWFsaXplIGh0bXggbGlzdGVuZXJcbmNvbnN0IGh0bXhEaXNwYXRjaGVyID0gbmV3IEhUTVhEaXNwYXRjaGVyKCk7XG5cbmNvbnN0IGRlZmF1bHRCcmFuZEltYWdlID1cbiAgJ2h0dHBzOi8vZnVua28uY29tL29uL2RlbWFuZHdhcmUuc3RhdGljLy0vU2l0ZXMtZnVua28tbWFzdGVyLWNhdGFsb2cvZGVmYXVsdC9kd2JiMzhhMTExL2ltYWdlcy9mdW5rby91cGxvYWQvNTU5OThfQ29jYUNvbGFfUzJfU3ByaXRlQm90dGxlQ2FwX1BPUF9HTEFNLVdFQi5wbmcnO1xuXG5jb25zdCBmb3JtYXREYXRlID0gKGRhdGU6IHN0cmluZykgPT4ge1xuICBjb25zdCBjcmVhdGVBdCA9IG5ldyBEYXRlKGRhdGUpO1xuICBjb25zdCB5ZWFyID0gY3JlYXRlQXQuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgbW9udGggPSBTdHJpbmcoY3JlYXRlQXQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsICcwJyk7IC8vIE1vbnRoIGlzIDAtYmFzZWRcbiAgY29uc3QgZGF5ID0gU3RyaW5nKGNyZWF0ZUF0LmdldERhdGUoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgY29uc3QgaG91cnMgPSBTdHJpbmcoY3JlYXRlQXQuZ2V0SG91cnMoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgY29uc3QgbWludXRlcyA9IFN0cmluZyhjcmVhdGVBdC5nZXRNaW51dGVzKCkpLnBhZFN0YXJ0KDIsICcwJyk7XG4gIHJldHVybiBgJHttb250aH0vJHtkYXl9LyR7eWVhcn0gJHtob3Vyc306JHttaW51dGVzfWA7XG59O1xuXG5jb25zdCBkb3dubG9hZENTViA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgLy8gRmlsdGVyc1xuICBjb25zdCBzZWFyY2hTS1VJbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YWJsZS1zZWFyY2gtc2hlbGYtbGlmZScpO1xuICBjb25zdCBkYXRlU0tVQ3JlYXRlZEZyb21JbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgJyNwcm9kdWN0LXNoZWxmLWxpZmUtc29ydC1jcmVhdGVkLWZyb20tZGF0ZXBpY2tlcidcbiAgKTtcbiAgY29uc3QgZGF0ZVNLVUNyZWF0ZWRUb0lucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAnI3Byb2R1Y3Qtc2hlbGYtbGlmZS1zb3J0LWNyZWF0ZWQtdG8tZGF0ZXBpY2tlcidcbiAgKTtcblxuICBjb25zdCBmaWx0ZXJzTWFwID0ge1xuICAgIHE6IHNlYXJjaFNLVUlucHV0LFxuICAgIGNyZWF0ZWRfZnJvbTogZGF0ZVNLVUNyZWF0ZWRGcm9tSW5wdXQsXG4gICAgY3JlYXRlZF90bzogZGF0ZVNLVUNyZWF0ZWRUb0lucHV0LFxuICB9O1xuXG4gIGNvbnN0IGZpbHRlclF1ZXJ5ID0gW107XG4gIGZvciAoY29uc3QgW3F1ZXJ5S2V5LCBxdWVyeUlucHV0XSBvZiBPYmplY3QuZW50cmllcyhmaWx0ZXJzTWFwKSkge1xuICAgIGZpbHRlclF1ZXJ5LnB1c2goYCR7cXVlcnlLZXl9PSR7cXVlcnlJbnB1dC52YWx1ZX1gKTtcbiAgfVxuXG4gIC8vIENTViBIZWFkZXJzXG4gIGNvbnN0IGNzdkRhdGEgPSBbJ1NLVSwgUmVwb3J0IFR5cGUsIFN0YXR1cywgUXR5IEJlZm9yZSwgUXR5IEFmdGVyLCBDcmVhdGVkIGF0J107XG4gIGxldCBwYWdlcyA9IDE7XG4gIGNvbnN0IHF1ZXJ5VGFpbCA9IGZpbHRlclF1ZXJ5ID8gZmlsdGVyUXVlcnkuam9pbignJicpIDogJyc7XG5cbiAgZm9yIChsZXQgcGFnZSA9IDE7IHBhZ2UgPD0gcGFnZXM7IHBhZ2UrKykge1xuICAgIGNvbnN0IGN1cnJlbnRVUkwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICBjb25zdCB1cmxXaXRob3V0UXVlcnlQYXJhbXMgPSBjdXJyZW50VVJMLnNwbGl0KCc/JylbMF07XG4gICAgY29uc3QgdXJsID0gW2BhcGk/cGFnZT0ke3BhZ2V9YCwgcXVlcnlUYWlsXS5qb2luKCcmJyk7XG5cbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHt1cmxXaXRob3V0UXVlcnlQYXJhbXN9LyR7dXJsfWApO1xuICAgIGNvbnN0IGRhdGE6IElSZXBvcnRTS1VSZXNwb25zZSA9IGF3YWl0IHJlcy5qc29uKCk7XG5cbiAgICBkYXRhLnJlcG9ydFNLVUxpc3QuZm9yRWFjaCgocmVwb3J0OiBJUmVwb3J0U0tVKSA9PiB7XG4gICAgICBsZXQgcXR5QmVmb3JlO1xuICAgICAgbGV0IHF0eUFmdGVyO1xuICAgICAgaWYgKCFxdHlCZWZvcmUgJiYgIXF0eUJlZm9yZSkge1xuICAgICAgICBxdHlCZWZvcmUgPSAnLSc7XG4gICAgICAgIHF0eUFmdGVyID0gJy0nO1xuICAgICAgICBjb25zb2xlLmxvZyhxdHlCZWZvcmUsIHF0eUFmdGVyKTtcbiAgICAgIH0gZWxzZSBpZiAoIXF0eUJlZm9yZSkge1xuICAgICAgICBxdHlCZWZvcmUgPSAnLSc7XG4gICAgICAgIHF0eUFmdGVyID0gcmVwb3J0LnF0eUFmdGVyLnRvU3RyaW5nKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBxdHlCZWZvcmUgPSByZXBvcnQucXR5QmVmb3JlLnRvU3RyaW5nKCk7XG4gICAgICAgIHF0eUFmdGVyID0gcmVwb3J0LnF0eUFmdGVyLnRvU3RyaW5nKCk7XG4gICAgICB9XG5cbiAgICAgIGNzdkRhdGEucHVzaChcbiAgICAgICAgW3JlcG9ydC5wcm9kdWN0LlNLVSwgcmVwb3J0LnR5cGUsIHJlcG9ydC5zdGF0dXMsIHF0eUJlZm9yZSwgcXR5QWZ0ZXIsIGZvcm1hdERhdGUocmVwb3J0LmNyZWF0ZWRBdCldLmpvaW4oJywnKVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHBhZ2VzID0gZGF0YS5wYWdpbmF0aW9uLnBhZ2VzO1xuICB9XG4gIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbY3N2RGF0YS5qb2luKCdcXG4nKV0sIHsgdHlwZTogJ3RleHQvY3N2JyB9KTtcbiAgY29uc3QgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gIGEuc2V0QXR0cmlidXRlKCdocmVmJywgdXJsKTtcbiAgYS5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgJ2ludmVudG9yaWVzLmNzdicpO1xuICBhLmNsaWNrKCk7XG4gIGEucmVtb3ZlKCk7XG59O1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICBjb25zdCBmaWx0ZXJzSFRNTCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgXCJbbmFtZT0ncSddLCBbbmFtZT0ndXNlcm5hbWUnXSwgW25hbWU9J2NyZWF0ZWRfZnJvbSddLCBbbmFtZT0nY3JlYXRlZF90byddLCBbbmFtZT0nbWFzdGVyX2dyb3VwJ10sIFtuYW1lPSdncm91cCddLCBbbmFtZT0nZ3JvdXBfYnJhbmQnXSwgIFtuYW1lPSdncm91cF9jYXRlZ29yeSddLCBbbmFtZT0nZ3JvdXBfbGFuZ3VhZ2UnXSwgW25hbWU9J2dyb3VwX3ByZW1pc2VzJ10sIFtuYW1lPSdncm91cF9ldmVudCddXCJcbiAgKTtcbiAgY29uc3QgYnV0dG9uTG9hZEludmVudG9yaWVzVGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFibGUtcmVwb3J0LWxvYWRlcicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuXG4gIGNvbnN0IGNsZWFyRmlsdGVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtc2hlbGYtbGlmZS1jbGVhci1idXR0b24nKTtcbiAgY2xlYXJGaWx0ZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZmlsdGVyc0hUTUwuZm9yRWFjaCgoZmlsdGVyKSA9PiB7XG4gICAgICAoZmlsdGVyIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gJyc7XG4gICAgfSk7XG4gICAgYnV0dG9uTG9hZEludmVudG9yaWVzVGFibGUuY2xpY2soKTtcbiAgfSk7XG4gIC8vIGxvYWQgdGFibGVcbiAgYnV0dG9uTG9hZEludmVudG9yaWVzVGFibGUuY2xpY2soKTtcbn0pO1xuXG4vLyBEb3dubG9hZCBjc3ZcbmNvbnN0IGRvd25sb2FkQ3N2QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1dHRvbi1jc3YtZG93bmxvYWQnKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbmRvd25sb2FkQ3N2QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZG93bmxvYWRDU1YpO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3JlcG9ydF9zaGVsZl9saWZlLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9