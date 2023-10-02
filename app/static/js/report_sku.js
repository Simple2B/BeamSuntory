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
    var filtersHTML = document.querySelectorAll("[name='q'], [name='username'], [name='created_from'], [name='created_to'], [name='master_group'], [name='group'], [name='group_brand'],  [name='group_category'], [name='group_language'], [name='group_premises'], [name='group_event']");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLGdCQUFnQixDQUMzQywwT0FBME8sQ0FDM08sQ0FBQztJQUNGLElBQU0sMEJBQTBCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBc0IsQ0FBQztJQUV2RyxJQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUM5RSxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDMUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU07WUFDeEIsTUFBMkIsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsMEJBQTBCLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckMsQ0FBQyxDQUFDLENBQUM7SUFDSCxhQUFhO0lBQ2IsMEJBQTBCLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDckMsQ0FBQyxDQUFDLENBQUM7QUFFSCxlQUFlO0FBQ2YsSUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUFzQixDQUFDO0FBQzlGLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQzs7Ozs7OztVQ2xMekQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3N0YXRpYy8uL3NyYy9odG14LnRzIiwid2VicGFjazovL3N0YXRpYy8uL3NyYy9yZXBvcnRfc2t1LnRzIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsidHlwZSBEaXNwYXRjaGVyQ2FsbGJhY2sgPSAodGFyZ2V0OiBIVE1MRWxlbWVudCkgPT4gdm9pZFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIVE1YRGlzcGF0Y2hlciB7XG4gICAgb25sb2FkQ2FsbGJhY2tzOiB7IFtuYW1lOiBzdHJpbmddOiBEaXNwYXRjaGVyQ2FsbGJhY2sgfVxuXG4gICAgY29uc3RydWN0b3IgKCkgIHtcbiAgICAgICAgdGhpcy5vbmxvYWRDYWxsYmFja3MgPSB7fVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdodG14OmxvYWQnLCAoZXZ0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0IGFzIEhUTUxEaXZFbGVtZW50O1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0SWQgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdpZCcpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5vbmxvYWRDYWxsYmFja3MuaGFzT3duUHJvcGVydHkodGFyZ2V0SWQpKXtcbiAgICAgICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IHRoaXMub25sb2FkQ2FsbGJhY2tzW3RhcmdldElkXTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIG9uTG9hZCh0YXJnZXRJZDogc3RyaW5nLCBjYWxsYmFjazogRGlzcGF0Y2hlckNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMub25sb2FkQ2FsbGJhY2tzW3RhcmdldElkXSA9IGNhbGxiYWNrO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBNb2RhbE9wdGlvbnMsIE1vZGFsIH0gZnJvbSAnZmxvd2JpdGUnO1xuaW1wb3J0IHsgSVByb2R1Y3QsIElXYXJlaG91c2UsIElJbmJvdW5kT3JkZXJCYXNlIH0gZnJvbSAnLi9pbmJvdW5kX29yZGVyL3R5cGVzJztcbmltcG9ydCBIVE1YRGlzcGF0Y2hlciBmcm9tICcuL2h0bXgnO1xuXG5pbnRlcmZhY2UgSVVzZXIge1xuICB1c2VybmFtZTogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgSUNhcnQge1xuICBncm91cDogc3RyaW5nO1xuICBwcm9kdWN0OiBJUHJvZHVjdDtcbn1cblxuaW50ZXJmYWNlIElBZGp1c3Qge1xuICBncm91cDogc3RyaW5nO1xuICBwcm9kdWN0OiBJUHJvZHVjdDtcbn1cblxuaW50ZXJmYWNlIElBc3NpZ24ge1xuICBncm91cDogc3RyaW5nO1xuICBwcm9kdWN0OiBJUHJvZHVjdDtcbn1cblxuaW50ZXJmYWNlIElSZXF1ZXN0U2hhcmUge1xuICBncm91cDogc3RyaW5nO1xuICBwcm9kdWN0OiBJUHJvZHVjdDtcbn1cblxuaW50ZXJmYWNlIElXYXJlaG91c2VQcm9kdWN0IHtcbiAgZ3JvdXA6IHN0cmluZztcbiAgcHJvZHVjdDogSVByb2R1Y3Q7XG59XG5cbmludGVyZmFjZSBJUmVwb3J0U0tVIHtcbiAgcXR5QmVmb3JlOiBudW1iZXI7XG4gIHF0eUFmdGVyOiBudW1iZXI7XG4gIHR5cGU6IHN0cmluZztcbiAgc3RhdHVzOiBzdHJpbmc7XG4gIHByb2R1Y3Q6IElQcm9kdWN0O1xuICBpbmJvdW5kT3JkZXJzOiBJSW5ib3VuZE9yZGVyQmFzZVtdO1xuICBzaGlwUmVxdWVzdHM6IElTaGlwUmVxdWVzdFtdO1xuICBhZGp1c3RtZW50czogSUFkanVzdFtdO1xuICBhc3NpZ25zOiBJQXNzaWduW107XG4gIHNoYXJlczogSVJlcXVlc3RTaGFyZVtdO1xuICB3YXJlaG91c2VQcm9kdWN0OiBJV2FyZWhvdXNlUHJvZHVjdDtcbiAgY3JlYXRlZEF0OiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBJU2hpcFJlcXVlc3Qge1xuICBpZDogbnVtYmVyO1xuICBjYXJ0czogSUNhcnRbXTtcbiAgY29tbWVudDogc3RyaW5nO1xuICBjcmVhdGVkQXQ6IHN0cmluZztcbiAgZGFOb3Rlczogc3RyaW5nO1xuICBvcmRlck51bWI6IHN0cmluZztcbiAgb3JkZXJTdGF0dXM6IHN0cmluZztcbiAgc3RvcmU6IElTdG9yZTtcbiAgc3RvcmVJZDogbnVtYmVyO1xuICB3bU5vdGVzOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBJU3RvcmUge1xuICBhY3RpdmU6IGJvb2xlYW47XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgY2l0eTogc3RyaW5nO1xuICBjb250YWN0UGVyc29uOiBzdHJpbmc7XG4gIGNvdW50cnk6IHN0cmluZztcbiAgY3JlYXRlZEF0OiBzdHJpbmc7XG4gIGVtYWlsOiBzdHJpbmc7XG4gIGlkOiBudW1iZXI7XG4gIHBob25lTnVtYjogc3RyaW5nO1xuICByZWdpb246IHN0cmluZztcbiAgc3RvcmVDYXRlZ29yeUlkOiBudW1iZXI7XG4gIHN0b3JlTmFtZTogc3RyaW5nO1xuICB6aXA6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIElSZXBvcnRTS1VSZXNwb25zZSB7XG4gIHBhZ2luYXRpb246IElQYWdpbmF0aW9uO1xuICByZXBvcnRTS1VMaXN0OiBJUmVwb3J0U0tVW107XG59XG5cbi8vIGluaXRpYWxpemUgaHRteCBsaXN0ZW5lclxuY29uc3QgaHRteERpc3BhdGNoZXIgPSBuZXcgSFRNWERpc3BhdGNoZXIoKTtcblxuY29uc3QgZGVmYXVsdEJyYW5kSW1hZ2UgPVxuICAnaHR0cHM6Ly9mdW5rby5jb20vb24vZGVtYW5kd2FyZS5zdGF0aWMvLS9TaXRlcy1mdW5rby1tYXN0ZXItY2F0YWxvZy9kZWZhdWx0L2R3YmIzOGExMTEvaW1hZ2VzL2Z1bmtvL3VwbG9hZC81NTk5OF9Db2NhQ29sYV9TMl9TcHJpdGVCb3R0bGVDYXBfUE9QX0dMQU0tV0VCLnBuZyc7XG5cbmNvbnN0IGZvcm1hdERhdGUgPSAoZGF0ZTogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IGNyZWF0ZUF0ID0gbmV3IERhdGUoZGF0ZSk7XG4gIGNvbnN0IHllYXIgPSBjcmVhdGVBdC5nZXRGdWxsWWVhcigpO1xuICBjb25zdCBtb250aCA9IFN0cmluZyhjcmVhdGVBdC5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgJzAnKTsgLy8gTW9udGggaXMgMC1iYXNlZFxuICBjb25zdCBkYXkgPSBTdHJpbmcoY3JlYXRlQXQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCAnMCcpO1xuICBjb25zdCBob3VycyA9IFN0cmluZyhjcmVhdGVBdC5nZXRIb3VycygpKS5wYWRTdGFydCgyLCAnMCcpO1xuICBjb25zdCBtaW51dGVzID0gU3RyaW5nKGNyZWF0ZUF0LmdldE1pbnV0ZXMoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgcmV0dXJuIGAke21vbnRofS8ke2RheX0vJHt5ZWFyfSAke2hvdXJzfToke21pbnV0ZXN9YDtcbn07XG5cbmNvbnN0IGRvd25sb2FkQ1NWID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICAvLyBGaWx0ZXJzXG4gIGNvbnN0IHNlYXJjaFNLVUlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RhYmxlLXNlYXJjaC1za3UnKTtcbiAgY29uc3QgZGF0ZVNLVUNyZWF0ZWRGcm9tSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1za3Utc29ydC1jcmVhdGVkLWZyb20tZGF0ZXBpY2tlcicpO1xuICBjb25zdCBkYXRlU0tVQ3JlYXRlZFRvSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1za3Utc29ydC1jcmVhdGVkLXRvLWRhdGVwaWNrZXInKTtcblxuICBjb25zdCBmaWx0ZXJzTWFwID0ge1xuICAgIHE6IHNlYXJjaFNLVUlucHV0LFxuICAgIGNyZWF0ZWRfZnJvbTogZGF0ZVNLVUNyZWF0ZWRGcm9tSW5wdXQsXG4gICAgY3JlYXRlZF90bzogZGF0ZVNLVUNyZWF0ZWRUb0lucHV0LFxuICB9O1xuXG4gIGNvbnN0IGZpbHRlclF1ZXJ5ID0gW107XG4gIGZvciAoY29uc3QgW3F1ZXJ5S2V5LCBxdWVyeUlucHV0XSBvZiBPYmplY3QuZW50cmllcyhmaWx0ZXJzTWFwKSkge1xuICAgIGZpbHRlclF1ZXJ5LnB1c2goYCR7cXVlcnlLZXl9PSR7cXVlcnlJbnB1dC52YWx1ZX1gKTtcbiAgfVxuXG4gIC8vIENTViBIZWFkZXJzXG4gIGNvbnN0IGNzdkRhdGEgPSBbJ1NLVSwgUmVwb3J0IFR5cGUsIFN0YXR1cywgUXR5IEJlZm9yZSwgUXR5IEFmdGVyLCBDcmVhdGVkIGF0J107XG4gIGxldCBwYWdlcyA9IDE7XG4gIGNvbnN0IHF1ZXJ5VGFpbCA9IGZpbHRlclF1ZXJ5ID8gZmlsdGVyUXVlcnkuam9pbignJicpIDogJyc7XG5cbiAgZm9yIChsZXQgcGFnZSA9IDE7IHBhZ2UgPD0gcGFnZXM7IHBhZ2UrKykge1xuICAgIGNvbnN0IGN1cnJlbnRVUkwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICBjb25zdCB1cmxXaXRob3V0UXVlcnlQYXJhbXMgPSBjdXJyZW50VVJMLnNwbGl0KCc/JylbMF07XG4gICAgY29uc3QgdXJsID0gW2BhcGk/cGFnZT0ke3BhZ2V9YCwgcXVlcnlUYWlsXS5qb2luKCcmJyk7XG5cbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHt1cmxXaXRob3V0UXVlcnlQYXJhbXN9LyR7dXJsfWApO1xuICAgIGNvbnN0IGRhdGE6IElSZXBvcnRTS1VSZXNwb25zZSA9IGF3YWl0IHJlcy5qc29uKCk7XG5cbiAgICBkYXRhLnJlcG9ydFNLVUxpc3QuZm9yRWFjaCgocmVwb3J0OiBJUmVwb3J0U0tVKSA9PiB7XG4gICAgICBsZXQgcXR5QmVmb3JlO1xuICAgICAgbGV0IHF0eUFmdGVyO1xuICAgICAgaWYgKCFxdHlCZWZvcmUgJiYgIXF0eUJlZm9yZSkge1xuICAgICAgICBxdHlCZWZvcmUgPSAnLSc7XG4gICAgICAgIHF0eUFmdGVyID0gJy0nO1xuICAgICAgICBjb25zb2xlLmxvZyhxdHlCZWZvcmUsIHF0eUFmdGVyKTtcbiAgICAgIH0gZWxzZSBpZiAoIXF0eUJlZm9yZSkge1xuICAgICAgICBxdHlCZWZvcmUgPSAnLSc7XG4gICAgICAgIHF0eUFmdGVyID0gcmVwb3J0LnF0eUFmdGVyLnRvU3RyaW5nKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBxdHlCZWZvcmUgPSByZXBvcnQucXR5QmVmb3JlLnRvU3RyaW5nKCk7XG4gICAgICAgIHF0eUFmdGVyID0gcmVwb3J0LnF0eUFmdGVyLnRvU3RyaW5nKCk7XG4gICAgICB9XG5cbiAgICAgIGNzdkRhdGEucHVzaChcbiAgICAgICAgW3JlcG9ydC5wcm9kdWN0LlNLVSwgcmVwb3J0LnR5cGUsIHJlcG9ydC5zdGF0dXMsIHF0eUJlZm9yZSwgcXR5QWZ0ZXIsIGZvcm1hdERhdGUocmVwb3J0LmNyZWF0ZWRBdCldLmpvaW4oJywnKVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHBhZ2VzID0gZGF0YS5wYWdpbmF0aW9uLnBhZ2VzO1xuICB9XG4gIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbY3N2RGF0YS5qb2luKCdcXG4nKV0sIHsgdHlwZTogJ3RleHQvY3N2JyB9KTtcbiAgY29uc3QgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gIGEuc2V0QXR0cmlidXRlKCdocmVmJywgdXJsKTtcbiAgYS5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgJ2ludmVudG9yaWVzLmNzdicpO1xuICBhLmNsaWNrKCk7XG4gIGEucmVtb3ZlKCk7XG59O1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICBjb25zdCBmaWx0ZXJzSFRNTCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgXCJbbmFtZT0ncSddLCBbbmFtZT0ndXNlcm5hbWUnXSwgW25hbWU9J2NyZWF0ZWRfZnJvbSddLCBbbmFtZT0nY3JlYXRlZF90byddLCBbbmFtZT0nbWFzdGVyX2dyb3VwJ10sIFtuYW1lPSdncm91cCddLCBbbmFtZT0nZ3JvdXBfYnJhbmQnXSwgIFtuYW1lPSdncm91cF9jYXRlZ29yeSddLCBbbmFtZT0nZ3JvdXBfbGFuZ3VhZ2UnXSwgW25hbWU9J2dyb3VwX3ByZW1pc2VzJ10sIFtuYW1lPSdncm91cF9ldmVudCddXCJcbiAgKTtcbiAgY29uc3QgYnV0dG9uTG9hZEludmVudG9yaWVzVGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFibGUtcmVwb3J0LWxvYWRlcicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuXG4gIGNvbnN0IGNsZWFyRmlsdGVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtc2t1LWNsZWFyLWJ1dHRvbicpO1xuICBjbGVhckZpbHRlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBmaWx0ZXJzSFRNTC5mb3JFYWNoKChmaWx0ZXIpID0+IHtcbiAgICAgIChmaWx0ZXIgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSAnJztcbiAgICB9KTtcbiAgICBidXR0b25Mb2FkSW52ZW50b3JpZXNUYWJsZS5jbGljaygpO1xuICB9KTtcbiAgLy8gbG9hZCB0YWJsZVxuICBidXR0b25Mb2FkSW52ZW50b3JpZXNUYWJsZS5jbGljaygpO1xufSk7XG5cbi8vIERvd25sb2FkIGNzdlxuY29uc3QgZG93bmxvYWRDc3ZCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnV0dG9uLWNzdi1kb3dubG9hZCcpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuZG93bmxvYWRDc3ZCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkb3dubG9hZENTVik7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvcmVwb3J0X3NrdS50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==