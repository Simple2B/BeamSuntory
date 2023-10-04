/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/report.ts":
/*!***********************!*\
  !*** ./src/report.ts ***!
  \***********************/
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
var utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
var filtersMap = {
    'events': ['user-select', 'filter-start-date', 'filter-start-date-to', 'filter-end-date', 'filter-end-date-to',],
    'request_share': ['user-select', 'filter-start-date', 'filter-end-date',],
    'inventories': [
        'user-select', 'filter-start-date', 'filter-end-date', 'master-group', 'target-group', 'filter-group-brand', 'filter-group-language', 'filter-group-premises', 'filter-group-category', 'filter-group-events',
    ],
    'adjustment': [
        'user-select', 'filter-start-date', 'filter-end-date', 'master-group', 'target-group', 'filter-group-brand', 'filter-group-language', 'filter-group-premises', 'filter-group-category', 'filter-group-events',
    ],
    'assign': ['user-select', 'group-from', 'group-to', 'filter-start-date', 'filter-end-date', 'filter-group-brand', 'filter-group-language', 'filter-group-premises', 'filter-group-category',],
    'inbound_order': ['filter-start-date', 'filter-end-date', 'filter-group-brand', 'filter-group-premises', 'filter-group-category',],
    'shipping': ['division-select', 'target-group', 'filter-start-date', 'filter-end-date', 'filter-group-brand', 'filter-group-language', 'filter-group-category', 'filter-group-premises',],
};
var fetchReportAPI = function (queryParams, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var pages, urlWithoutQueryParams, page, url, res, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                pages = 1;
                urlWithoutQueryParams = location.origin + location.pathname;
                page = 1;
                _c.label = 1;
            case 1:
                if (!(page <= pages)) return [3 /*break*/, 5];
                url = ["api?page=".concat(page), queryParams.toString()].join('&');
                return [4 /*yield*/, fetch("".concat(urlWithoutQueryParams).concat(url))];
            case 2:
                res = _c.sent();
                _b = (_a = JSON).parse;
                return [4 /*yield*/, res.json()];
            case 3:
                data = _b.apply(_a, [_c.sent()]);
                callback(data);
                pages = data.pagination.pages;
                _c.label = 4;
            case 4:
                page++;
                return [3 /*break*/, 1];
            case 5: return [2 /*return*/];
        }
    });
}); };
var generateCSVEvents = function (queryParams) { return __awaiter(void 0, void 0, void 0, function () {
    var csvData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                csvData = ['action_type,user,created_at,event_date_from,event_date_to,sku,product_name'];
                return [4 /*yield*/, fetchReportAPI(queryParams, function (data) {
                        data.reports.forEach(function (report) {
                            report.shipRequest.carts.forEach(function (cart) {
                                csvData.push([
                                    report.createdAt,
                                    report.shipRequest.store.storeName,
                                    report.type,
                                    report.user.username,
                                    cart.event.dateFrom,
                                    cart.event.dateTo,
                                    cart.product.SKU,
                                    cart.product.name,
                                ].join(','));
                            });
                        });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, csvData];
        }
    });
}); };
var generateCSVRequestShare = function (queryParams) { return __awaiter(void 0, void 0, void 0, function () {
    var csvData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                csvData = ['action_type,user,created_at,current_share_request_status,group,desired_quantity,sku,product_name'];
                return [4 /*yield*/, fetchReportAPI(queryParams, function (data) {
                        data.reports.forEach(function (report) {
                            csvData.push([
                                report.type,
                                report.user.username,
                                report.createdAt,
                                report.requestShare.status,
                                report.requestShare.group.name,
                                report.requestShare.desireQuantity,
                                report.requestShare.product.SKU,
                                report.requestShare.product.name,
                            ].join(','));
                        });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, csvData];
        }
    });
}); };
var generateCSVInventories = function (queryParams) { return __awaiter(void 0, void 0, void 0, function () {
    var csvData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                csvData = ['created_at,store_name,type,username,qty_before,qty_after,sku,product_name'];
                return [4 /*yield*/, fetchReportAPI(queryParams, function (data) {
                        data.reports.forEach(function (report) {
                            var reportTarget;
                            if (report.store) {
                                reportTarget = report.store.storeName;
                            }
                            else if (report.warehouse) {
                                reportTarget = report.warehouse.name;
                            }
                            else {
                                reportTarget = 'Internal action';
                            }
                            report.reportInventories.forEach(function (inventory) {
                                csvData.push([
                                    (0, utils_1.formatDate)(report.createdAt),
                                    reportTarget,
                                    report.type,
                                    report.user.username,
                                    inventory.qtyBefore.toString(),
                                    inventory.qtyAfter.toString(),
                                    inventory.product.SKU,
                                    inventory.product.name,
                                ].join(','));
                            });
                        });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, csvData];
        }
    });
}); };
var generateCSVAdjustments = function (queryParams) { return __awaiter(void 0, void 0, void 0, function () {
    var csvData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                csvData = ['created_at,product_name,sku,username,master_group,group,warehouse,quantity_before,quantity_after'];
                return [4 /*yield*/, fetchReportAPI(queryParams, function (data) {
                        console.log(data);
                        data.reports.forEach(function (adjust) {
                            adjust.adjustGroupQty.forEach(function (reportAdjust) {
                                csvData.push([
                                    (0, utils_1.formatDate)(adjust.createdAt),
                                    adjust.product.name,
                                    adjust.product.SKU,
                                    adjust.user.username,
                                    reportAdjust.group.masterGroup.name,
                                    reportAdjust.group.name,
                                    reportAdjust.warehouse.name,
                                    reportAdjust.quantityBefore,
                                    reportAdjust.quantityAfter,
                                ].join(','));
                            });
                        });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, csvData];
        }
    });
}); };
var generateCSVInboundOrder = function (queryParams) { return __awaiter(void 0, void 0, void 0, function () {
    var csvData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                csvData = ['created_at,username,type,order_title,allocated_product,sku,group,quantity'];
                return [4 /*yield*/, fetchReportAPI(queryParams, function (data) {
                        data.reports.forEach(function (report) {
                            report.inboundOrder.productsAllocated.forEach(function (productsAllocated) {
                                productsAllocated.productQuantityGroups.forEach(function (productQuantityGroup) {
                                    csvData.push([
                                        (0, utils_1.formatDate)(report.createdAt),
                                        report.user.username,
                                        report.type,
                                        report.inboundOrder.title,
                                        productsAllocated.product.name,
                                        productsAllocated.product.SKU,
                                        productQuantityGroup.group.name,
                                        productQuantityGroup.quantity
                                    ].join(','));
                                });
                            });
                        });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, csvData];
        }
    });
}); };
var generateCSVShipping = function (queryParams) { return __awaiter(void 0, void 0, void 0, function () {
    var csvData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                csvData = ['action_type,user,created_at,history,current_ship_request_status,order_number,store_name,sku,product_name,group,quantity'];
                return [4 /*yield*/, fetchReportAPI(queryParams, function (data) {
                        data.reports.forEach(function (report) {
                            report.shipRequest.carts.forEach(function (cart) {
                                csvData.push([
                                    report.type,
                                    report.user.username,
                                    report.createdAt,
                                    report.history,
                                    report.shipRequest.status,
                                    report.shipRequest.orderNumb,
                                    report.shipRequest.store.storeName,
                                    cart.product.SKU,
                                    cart.product.name,
                                    cart.group.name,
                                    cart.quantity,
                                ].join(','));
                            });
                        });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, csvData];
        }
    });
}); };
var generateCSVAssign = function (queryParams) { return __awaiter(void 0, void 0, void 0, function () {
    var csvData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                csvData = ['created_at,username,type,from_group,to_group,sku,product_name,quantity'];
                return [4 /*yield*/, fetchReportAPI(queryParams, function (data) {
                        console.log(data);
                        data.reports.forEach(function (report) {
                            csvData.push([
                                (0, utils_1.formatDate)(report.createdAt),
                                report.user.username,
                                report.type,
                                report.fromGroup.name,
                                report.group.name,
                                report.product.SKU,
                                report.product.name,
                                report.quantity,
                            ].join(','));
                        });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, csvData];
        }
    });
}); };
var csvDownloadMap = {
    'events': generateCSVEvents,
    'request_share': generateCSVRequestShare,
    'inventories': generateCSVInventories,
    'adjustment': generateCSVAdjustments,
    'assign': generateCSVAssign,
    'inbound_order': generateCSVInboundOrder,
    'shipping': generateCSVShipping,
};
var filtersIds = [
    'request-share-type',
    'shipping-type',
    'user-select',
    'filter-start-date',
    'filter-start-date-to',
    'filter-end-date',
    'filter-end-date-to',
    'master-group',
    'target-group',
    'filter-group-brand',
    'filter-group-language',
    'filter-group-premises',
    'filter-group-category',
    'filter-group-events',
    'group-from',
    'group-to',
    'division-select',
];
document.addEventListener('DOMContentLoaded', function () {
    // DOM nodes
    var reportTypeSelectHTML = document.getElementById('report-type-select');
    var allFiltersHTML = filtersIds.map(function (id) { return document.getElementById(id); });
    var tableLoader = document.getElementById('table-report-loader');
    var clearFiltersButton = document.getElementById('filter-clear-button');
    var searchQueryHTML = document.getElementById('search-query');
    var downloadCSVButton = document.getElementById('button-csv-download');
    for (var _i = 0, _a = Object.entries(filtersMap); _i < _a.length; _i++) {
        var _b = _a[_i], reportType = _b[0], filters = _b[1];
        filtersMap[reportType] = filters.map(function (id) { return document.getElementById(id); });
    }
    // Show/remove filters when choose event report type
    reportTypeSelectHTML.addEventListener('change', function (e) {
        var selectHTML = e.target;
        allFiltersHTML.forEach(function (filterHTML) { return filterHTML.classList.add('hidden'); });
        var visibleFilters = filtersMap[selectHTML.value];
        visibleFilters.forEach(function (filterHTML) { return filterHTML.classList.remove('hidden'); });
    });
    tableLoader.click();
    clearFiltersButton.addEventListener('click', function () {
        allFiltersHTML.forEach(function (filterHTML) {
            var input = filterHTML.querySelector('input, select');
            input.value = '';
        });
        searchQueryHTML.value = '';
        tableLoader.click();
    });
    // Download csv button
    downloadCSVButton.addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
        var filtersQueryParams, csvData, blob, url, a;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filtersQueryParams = new URLSearchParams();
                    allFiltersHTML.forEach(function (filterHTML) {
                        var input = filterHTML.querySelector('input, select');
                        filtersQueryParams.append(input.getAttribute('name'), input.value);
                    });
                    filtersQueryParams.append('q', searchQueryHTML.value);
                    filtersQueryParams.append('report_type', reportTypeSelectHTML.value);
                    console.log('report_type', reportTypeSelectHTML.value);
                    return [4 /*yield*/, csvDownloadMap[reportTypeSelectHTML.value](filtersQueryParams)];
                case 1:
                    csvData = _a.sent();
                    blob = new Blob([csvData.join('\n')], { type: 'text/csv' });
                    url = window.URL.createObjectURL(blob);
                    a = document.createElement('a');
                    a.setAttribute('href', url);
                    a.setAttribute('download', 'report.csv');
                    a.click();
                    a.remove();
                    return [2 /*return*/];
            }
        });
    }); });
});


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.formatDate = void 0;
var formatDate = function (date) {
    var createAt = new Date(date);
    var year = createAt.getFullYear();
    var month = String(createAt.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    var day = String(createAt.getDate()).padStart(2, '0');
    var hours = String(createAt.getHours()).padStart(2, '0');
    var minutes = String(createAt.getMinutes()).padStart(2, '0');
    return "".concat(month, "/").concat(day, "/").concat(year, " ").concat(hours, ":").concat(minutes);
};
exports.formatDate = formatDate;


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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/report.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQVk7SUFDckMsSUFBTSxRQUFRLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3BDLElBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLG1CQUFtQjtJQUNuRixJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN4RCxJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMzRCxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMvRCxPQUFPLFVBQUcsS0FBSyxjQUFJLEdBQUcsY0FBSSxJQUFJLGNBQUksS0FBSyxjQUFJLE9BQU8sQ0FBRSxDQUFDO0FBQ3ZELENBQUMsQ0FBQztBQVJXLGtCQUFVLGNBUXJCOzs7Ozs7O1VDUkY7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3N0YXRpYy8uL3NyYy9yZXBvcnQudHMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vc3JjL3V0aWxzLnRzIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgXG4gIElSZXBvcnRSZXF1ZXN0U2hhcmVSZXNwb25zZSxcbiAgSUV2ZW50c1JlcG9ydFJlc3BvbnNlLFxuICBJSW52ZW50b3JpZXNSZXBvcnRSZXNwb25zZSxcbiAgSVJlcG9ydEFkanVzdFJlc3BvbnNlLFxuICBJUmVwb3J0SW5ib3VuZE9yZGVyUmVzcG9uc2UsXG4gIElSZXBvcnRTaGlwcGluZ1Jlc3BvbnNlLFxuICBJUmVwb3J0QXNzaWduUmVzcG9uc2UsXG59IGZyb20gXCIuL3R5cGVzXCJcbmltcG9ydCB7IGZvcm1hdERhdGUgfSBmcm9tIFwiLi91dGlsc1wiXG5cbmludGVyZmFjZSBJRmlsdGVyTWFwIHtcbiAgW2luZGV4OiBzdHJpbmddOiBzdHJpbmdbXSB8IEhUTUxFbGVtZW50W11cbn1cblxuaW50ZXJmYWNlIElDU1ZEb3dubG9hZE1hcCB7XG4gIFtpbmRleDogc3RyaW5nXTogKHF1ZXJ5OiBVUkxTZWFyY2hQYXJhbXMpID0+IFByb21pc2U8c3RyaW5nW10+XG59XG5cbmNvbnN0IGZpbHRlcnNNYXA6IElGaWx0ZXJNYXAgPSB7XG4gICAgJ2V2ZW50cyc6IFsndXNlci1zZWxlY3QnLCAnZmlsdGVyLXN0YXJ0LWRhdGUnLCAnZmlsdGVyLXN0YXJ0LWRhdGUtdG8nLCAnZmlsdGVyLWVuZC1kYXRlJywgJ2ZpbHRlci1lbmQtZGF0ZS10bycsXSxcbiAgICAncmVxdWVzdF9zaGFyZSc6IFsndXNlci1zZWxlY3QnLCAnZmlsdGVyLXN0YXJ0LWRhdGUnLCAnZmlsdGVyLWVuZC1kYXRlJyxdLFxuICAgICdpbnZlbnRvcmllcyc6IFtcbiAgICAgICAgJ3VzZXItc2VsZWN0JywgJ2ZpbHRlci1zdGFydC1kYXRlJywgJ2ZpbHRlci1lbmQtZGF0ZScsICdtYXN0ZXItZ3JvdXAnLCAndGFyZ2V0LWdyb3VwJywgJ2ZpbHRlci1ncm91cC1icmFuZCcsICdmaWx0ZXItZ3JvdXAtbGFuZ3VhZ2UnLCAnZmlsdGVyLWdyb3VwLXByZW1pc2VzJywgJ2ZpbHRlci1ncm91cC1jYXRlZ29yeScsICdmaWx0ZXItZ3JvdXAtZXZlbnRzJyxcbiAgICBdLFxuICAgICdhZGp1c3RtZW50JzogW1xuICAgICAgICAndXNlci1zZWxlY3QnLCAnZmlsdGVyLXN0YXJ0LWRhdGUnLCAnZmlsdGVyLWVuZC1kYXRlJywgJ21hc3Rlci1ncm91cCcsICd0YXJnZXQtZ3JvdXAnLCAnZmlsdGVyLWdyb3VwLWJyYW5kJywgJ2ZpbHRlci1ncm91cC1sYW5ndWFnZScsICdmaWx0ZXItZ3JvdXAtcHJlbWlzZXMnLCAnZmlsdGVyLWdyb3VwLWNhdGVnb3J5JywgJ2ZpbHRlci1ncm91cC1ldmVudHMnLFxuICAgIF0sXG4gICAgJ2Fzc2lnbic6IFsndXNlci1zZWxlY3QnLCAnZ3JvdXAtZnJvbScsICdncm91cC10bycsICdmaWx0ZXItc3RhcnQtZGF0ZScsICdmaWx0ZXItZW5kLWRhdGUnLCAnZmlsdGVyLWdyb3VwLWJyYW5kJywgJ2ZpbHRlci1ncm91cC1sYW5ndWFnZScsICdmaWx0ZXItZ3JvdXAtcHJlbWlzZXMnLCAnZmlsdGVyLWdyb3VwLWNhdGVnb3J5JyxdLFxuICAgICdpbmJvdW5kX29yZGVyJzogWydmaWx0ZXItc3RhcnQtZGF0ZScsICdmaWx0ZXItZW5kLWRhdGUnLCAgJ2ZpbHRlci1ncm91cC1icmFuZCcsICdmaWx0ZXItZ3JvdXAtcHJlbWlzZXMnLCAnZmlsdGVyLWdyb3VwLWNhdGVnb3J5JyxdLFxuICAgICdzaGlwcGluZyc6IFsnZGl2aXNpb24tc2VsZWN0JywgJ3RhcmdldC1ncm91cCcsICdmaWx0ZXItc3RhcnQtZGF0ZScsICdmaWx0ZXItZW5kLWRhdGUnLCAgJ2ZpbHRlci1ncm91cC1icmFuZCcsICdmaWx0ZXItZ3JvdXAtbGFuZ3VhZ2UnLCAnZmlsdGVyLWdyb3VwLWNhdGVnb3J5JywgJ2ZpbHRlci1ncm91cC1wcmVtaXNlcycsXSxcbn1cblxuY29uc3QgZmV0Y2hSZXBvcnRBUEkgPSBhc3luYyAocXVlcnlQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcywgY2FsbGJhY2s6IChkYXRhOiBPYmplY3QpID0+IHZvaWQpID0+IHtcbiAgbGV0IHBhZ2VzID0gMTtcblxuICBjb25zdCB1cmxXaXRob3V0UXVlcnlQYXJhbXMgPSBsb2NhdGlvbi5vcmlnaW4gKyBsb2NhdGlvbi5wYXRobmFtZTtcbiAgZm9yIChsZXQgcGFnZSA9IDE7IHBhZ2UgPD0gcGFnZXM7IHBhZ2UrKykge1xuICAgIGNvbnN0IHVybCA9IFtgYXBpP3BhZ2U9JHtwYWdlfWAsIHF1ZXJ5UGFyYW1zLnRvU3RyaW5nKCldLmpvaW4oJyYnKTtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHt1cmxXaXRob3V0UXVlcnlQYXJhbXN9JHt1cmx9YCk7XG4gICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoYXdhaXQgcmVzLmpzb24oKSk7XG5cbiAgICBjYWxsYmFjayhkYXRhKTtcbiAgICBwYWdlcyA9IGRhdGEucGFnaW5hdGlvbi5wYWdlcztcbiAgfVxufVxuXG5jb25zdCBnZW5lcmF0ZUNTVkV2ZW50cyA9IGFzeW5jIChxdWVyeVBhcmFtczogVVJMU2VhcmNoUGFyYW1zKSA9PiB7XG4gIGNvbnN0IGNzdkRhdGEgPSBbJ2FjdGlvbl90eXBlLHVzZXIsY3JlYXRlZF9hdCxldmVudF9kYXRlX2Zyb20sZXZlbnRfZGF0ZV90byxza3UscHJvZHVjdF9uYW1lJ107XG4gIGF3YWl0IGZldGNoUmVwb3J0QVBJKHF1ZXJ5UGFyYW1zLCAoZGF0YTogSUV2ZW50c1JlcG9ydFJlc3BvbnNlKSA9PiB7XG4gICAgZGF0YS5yZXBvcnRzLmZvckVhY2gocmVwb3J0ID0+IHtcbiAgICAgIHJlcG9ydC5zaGlwUmVxdWVzdC5jYXJ0cy5mb3JFYWNoKGNhcnQgPT4ge1xuICAgICAgICBjc3ZEYXRhLnB1c2goXG4gICAgICAgICAgW1xuICAgICAgICAgICAgcmVwb3J0LmNyZWF0ZWRBdCxcbiAgICAgICAgICAgIHJlcG9ydC5zaGlwUmVxdWVzdC5zdG9yZS5zdG9yZU5hbWUsXG4gICAgICAgICAgICByZXBvcnQudHlwZSxcbiAgICAgICAgICAgIHJlcG9ydC51c2VyLnVzZXJuYW1lLFxuICAgICAgICAgICAgY2FydC5ldmVudC5kYXRlRnJvbSxcbiAgICAgICAgICAgIGNhcnQuZXZlbnQuZGF0ZVRvLFxuICAgICAgICAgICAgY2FydC5wcm9kdWN0LlNLVSxcbiAgICAgICAgICAgIGNhcnQucHJvZHVjdC5uYW1lLFxuICAgICAgICAgIF0uam9pbignLCcpXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBjc3ZEYXRhO1xufVxuXG5cbmNvbnN0IGdlbmVyYXRlQ1NWUmVxdWVzdFNoYXJlID0gYXN5bmMgKHF1ZXJ5UGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMpID0+IHtcbiAgY29uc3QgY3N2RGF0YSA9IFsnYWN0aW9uX3R5cGUsdXNlcixjcmVhdGVkX2F0LGN1cnJlbnRfc2hhcmVfcmVxdWVzdF9zdGF0dXMsZ3JvdXAsZGVzaXJlZF9xdWFudGl0eSxza3UscHJvZHVjdF9uYW1lJ107XG4gIGF3YWl0IGZldGNoUmVwb3J0QVBJKHF1ZXJ5UGFyYW1zLCAoZGF0YTogSVJlcG9ydFJlcXVlc3RTaGFyZVJlc3BvbnNlKSA9PiB7XG4gICAgZGF0YS5yZXBvcnRzLmZvckVhY2gocmVwb3J0ID0+IHtcbiAgICAgIGNzdkRhdGEucHVzaChcbiAgICAgICAgW1xuICAgICAgICAgIHJlcG9ydC50eXBlLFxuICAgICAgICAgIHJlcG9ydC51c2VyLnVzZXJuYW1lLFxuICAgICAgICAgIHJlcG9ydC5jcmVhdGVkQXQsXG4gICAgICAgICAgcmVwb3J0LnJlcXVlc3RTaGFyZS5zdGF0dXMsXG4gICAgICAgICAgcmVwb3J0LnJlcXVlc3RTaGFyZS5ncm91cC5uYW1lLFxuICAgICAgICAgIHJlcG9ydC5yZXF1ZXN0U2hhcmUuZGVzaXJlUXVhbnRpdHksXG4gICAgICAgICAgcmVwb3J0LnJlcXVlc3RTaGFyZS5wcm9kdWN0LlNLVSxcbiAgICAgICAgICByZXBvcnQucmVxdWVzdFNoYXJlLnByb2R1Y3QubmFtZSxcbiAgICAgICAgXS5qb2luKCcsJylcbiAgICAgIClcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBjc3ZEYXRhO1xufVxuXG5jb25zdCBnZW5lcmF0ZUNTVkludmVudG9yaWVzID0gYXN5bmMgKHF1ZXJ5UGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMpID0+IHtcbiAgLy8gQ1NWIEhlYWRlcnNcbiAgY29uc3QgY3N2RGF0YSA9IFsnY3JlYXRlZF9hdCxzdG9yZV9uYW1lLHR5cGUsdXNlcm5hbWUscXR5X2JlZm9yZSxxdHlfYWZ0ZXIsc2t1LHByb2R1Y3RfbmFtZSddO1xuICBhd2FpdCBmZXRjaFJlcG9ydEFQSShxdWVyeVBhcmFtcywgKGRhdGE6IElJbnZlbnRvcmllc1JlcG9ydFJlc3BvbnNlKSA9PiB7XG4gICAgZGF0YS5yZXBvcnRzLmZvckVhY2gocmVwb3J0ID0+IHtcbiAgICAgIGxldCByZXBvcnRUYXJnZXQ6IHN0cmluZztcbiAgICAgIGlmIChyZXBvcnQuc3RvcmUpIHtcbiAgICAgICAgcmVwb3J0VGFyZ2V0ID0gcmVwb3J0LnN0b3JlLnN0b3JlTmFtZTtcbiAgICAgIH0gZWxzZSBpZiAocmVwb3J0LndhcmVob3VzZSkge1xuICAgICAgICByZXBvcnRUYXJnZXQgPSByZXBvcnQud2FyZWhvdXNlLm5hbWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXBvcnRUYXJnZXQgPSAnSW50ZXJuYWwgYWN0aW9uJztcbiAgICAgIH1cbiAgICAgIFxuICAgICAgcmVwb3J0LnJlcG9ydEludmVudG9yaWVzLmZvckVhY2goaW52ZW50b3J5ID0+IHtcbiAgICAgICAgY3N2RGF0YS5wdXNoKFtcbiAgICAgICAgICBmb3JtYXREYXRlKHJlcG9ydC5jcmVhdGVkQXQpLFxuICAgICAgICAgIHJlcG9ydFRhcmdldCxcbiAgICAgICAgICByZXBvcnQudHlwZSxcbiAgICAgICAgICByZXBvcnQudXNlci51c2VybmFtZSxcbiAgICAgICAgICBpbnZlbnRvcnkucXR5QmVmb3JlLnRvU3RyaW5nKCksXG4gICAgICAgICAgaW52ZW50b3J5LnF0eUFmdGVyLnRvU3RyaW5nKCksXG4gICAgICAgICAgaW52ZW50b3J5LnByb2R1Y3QuU0tVLFxuICAgICAgICAgIGludmVudG9yeS5wcm9kdWN0Lm5hbWUsXG4gICAgICAgIF0uam9pbignLCcpKTtcbiAgICAgIH0pXG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gY3N2RGF0YTtcbn1cblxuXG5jb25zdCBnZW5lcmF0ZUNTVkFkanVzdG1lbnRzID0gYXN5bmMgKHF1ZXJ5UGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMpID0+IHtcbiAgLy8gQ1NWIEhlYWRlcnNcbiAgY29uc3QgY3N2RGF0YSA9IFsnY3JlYXRlZF9hdCxwcm9kdWN0X25hbWUsc2t1LHVzZXJuYW1lLG1hc3Rlcl9ncm91cCxncm91cCx3YXJlaG91c2UscXVhbnRpdHlfYmVmb3JlLHF1YW50aXR5X2FmdGVyJ107XG4gIGF3YWl0IGZldGNoUmVwb3J0QVBJKHF1ZXJ5UGFyYW1zLCAoZGF0YTogSVJlcG9ydEFkanVzdFJlc3BvbnNlKSA9PiB7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgZGF0YS5yZXBvcnRzLmZvckVhY2goKGFkanVzdCkgPT4ge1xuICAgICAgYWRqdXN0LmFkanVzdEdyb3VwUXR5LmZvckVhY2goKHJlcG9ydEFkanVzdCkgPT4ge1xuICAgICAgICBjc3ZEYXRhLnB1c2goXG4gICAgICAgICAgW1xuICAgICAgICAgICAgZm9ybWF0RGF0ZShhZGp1c3QuY3JlYXRlZEF0KSxcbiAgICAgICAgICAgIGFkanVzdC5wcm9kdWN0Lm5hbWUsXG4gICAgICAgICAgICBhZGp1c3QucHJvZHVjdC5TS1UsXG4gICAgICAgICAgICBhZGp1c3QudXNlci51c2VybmFtZSxcbiAgICAgICAgICAgIHJlcG9ydEFkanVzdC5ncm91cC5tYXN0ZXJHcm91cC5uYW1lLFxuICAgICAgICAgICAgcmVwb3J0QWRqdXN0Lmdyb3VwLm5hbWUsXG4gICAgICAgICAgICByZXBvcnRBZGp1c3Qud2FyZWhvdXNlLm5hbWUsXG4gICAgICAgICAgICByZXBvcnRBZGp1c3QucXVhbnRpdHlCZWZvcmUsXG4gICAgICAgICAgICByZXBvcnRBZGp1c3QucXVhbnRpdHlBZnRlcixcbiAgICAgICAgICBdLmpvaW4oJywnKVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gY3N2RGF0YTtcbn1cblxuXG5jb25zdCBnZW5lcmF0ZUNTVkluYm91bmRPcmRlciA9IGFzeW5jIChxdWVyeVBhcmFtczogVVJMU2VhcmNoUGFyYW1zKSA9PiB7XG4gIGNvbnN0IGNzdkRhdGEgPSBbJ2NyZWF0ZWRfYXQsdXNlcm5hbWUsdHlwZSxvcmRlcl90aXRsZSxhbGxvY2F0ZWRfcHJvZHVjdCxza3UsZ3JvdXAscXVhbnRpdHknXVxuICBhd2FpdCBmZXRjaFJlcG9ydEFQSShxdWVyeVBhcmFtcywgKGRhdGE6IElSZXBvcnRJbmJvdW5kT3JkZXJSZXNwb25zZSkgPT4geyAgXG5cbiAgICBkYXRhLnJlcG9ydHMuZm9yRWFjaChyZXBvcnQgPT4ge1xuICAgICAgcmVwb3J0LmluYm91bmRPcmRlci5wcm9kdWN0c0FsbG9jYXRlZC5mb3JFYWNoKHByb2R1Y3RzQWxsb2NhdGVkID0+IHtcbiAgICAgICAgcHJvZHVjdHNBbGxvY2F0ZWQucHJvZHVjdFF1YW50aXR5R3JvdXBzLmZvckVhY2gocHJvZHVjdFF1YW50aXR5R3JvdXAgPT4ge1xuICAgICAgICAgIGNzdkRhdGEucHVzaChcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgZm9ybWF0RGF0ZShyZXBvcnQuY3JlYXRlZEF0KSxcbiAgICAgICAgICAgICAgcmVwb3J0LnVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgICAgIHJlcG9ydC50eXBlLCAgICAgXG4gICAgICAgICAgICAgIHJlcG9ydC5pbmJvdW5kT3JkZXIudGl0bGUsICAgIFxuICAgICAgICAgICAgICBwcm9kdWN0c0FsbG9jYXRlZC5wcm9kdWN0Lm5hbWUsXG4gICAgICAgICAgICAgIHByb2R1Y3RzQWxsb2NhdGVkLnByb2R1Y3QuU0tVLFxuICAgICAgICAgICAgICBwcm9kdWN0UXVhbnRpdHlHcm91cC5ncm91cC5uYW1lLFxuICAgICAgICAgICAgICBwcm9kdWN0UXVhbnRpdHlHcm91cC5xdWFudGl0eVxuICAgICAgICAgICAgXS5qb2luKCcsJylcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGNzdkRhdGE7XG59XG5cbmNvbnN0IGdlbmVyYXRlQ1NWU2hpcHBpbmcgPSBhc3luYyAocXVlcnlQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcykgPT4ge1xuICAvLyBDU1YgSGVhZGVyc1xuICBjb25zdCBjc3ZEYXRhID0gWydhY3Rpb25fdHlwZSx1c2VyLGNyZWF0ZWRfYXQsaGlzdG9yeSxjdXJyZW50X3NoaXBfcmVxdWVzdF9zdGF0dXMsb3JkZXJfbnVtYmVyLHN0b3JlX25hbWUsc2t1LHByb2R1Y3RfbmFtZSxncm91cCxxdWFudGl0eSddO1xuICBhd2FpdCBmZXRjaFJlcG9ydEFQSShxdWVyeVBhcmFtcywgKGRhdGE6IElSZXBvcnRTaGlwcGluZ1Jlc3BvbnNlKSA9PiB7XG4gICAgZGF0YS5yZXBvcnRzLmZvckVhY2gocmVwb3J0ID0+IHtcbiAgICAgIHJlcG9ydC5zaGlwUmVxdWVzdC5jYXJ0cy5mb3JFYWNoKGNhcnQgPT4ge1xuICAgICAgICBjc3ZEYXRhLnB1c2goXG4gICAgICAgIFtcbiAgICAgICAgICByZXBvcnQudHlwZSxcbiAgICAgICAgICByZXBvcnQudXNlci51c2VybmFtZSxcbiAgICAgICAgICByZXBvcnQuY3JlYXRlZEF0LFxuICAgICAgICAgIHJlcG9ydC5oaXN0b3J5LFxuICAgICAgICAgIHJlcG9ydC5zaGlwUmVxdWVzdC5zdGF0dXMsXG4gICAgICAgICAgcmVwb3J0LnNoaXBSZXF1ZXN0Lm9yZGVyTnVtYixcbiAgICAgICAgICByZXBvcnQuc2hpcFJlcXVlc3Quc3RvcmUuc3RvcmVOYW1lLFxuICAgICAgICAgIGNhcnQucHJvZHVjdC5TS1UsXG4gICAgICAgICAgY2FydC5wcm9kdWN0Lm5hbWUsXG4gICAgICAgICAgY2FydC5ncm91cC5uYW1lLFxuICAgICAgICAgIGNhcnQucXVhbnRpdHksXG4gICAgICAgIF0uam9pbignLCcpXG4gICAgICApXG4gICAgICB9KVxuICAgICBcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNzdkRhdGE7XG59XG5cblxuY29uc3QgZ2VuZXJhdGVDU1ZBc3NpZ24gPSBhc3luYyAocXVlcnlQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcykgPT4ge1xuICAvLyBDU1YgSGVhZGVyc1xuICBjb25zdCBjc3ZEYXRhID0gWydjcmVhdGVkX2F0LHVzZXJuYW1lLHR5cGUsZnJvbV9ncm91cCx0b19ncm91cCxza3UscHJvZHVjdF9uYW1lLHF1YW50aXR5J11cbiAgXG4gIGF3YWl0IGZldGNoUmVwb3J0QVBJKHF1ZXJ5UGFyYW1zLCAoZGF0YTogSVJlcG9ydEFzc2lnblJlc3BvbnNlKSA9PiB7XG4gICAgY29uc29sZS5sb2coZGF0YSlcbiAgICBkYXRhLnJlcG9ydHMuZm9yRWFjaChyZXBvcnQgPT4ge1xuICAgICAgY3N2RGF0YS5wdXNoKFxuICAgICAgICBbXG4gICAgICAgICAgZm9ybWF0RGF0ZShyZXBvcnQuY3JlYXRlZEF0KSxcbiAgICAgICAgICByZXBvcnQudXNlci51c2VybmFtZSxcbiAgICAgICAgICByZXBvcnQudHlwZSxcbiAgICAgICAgICByZXBvcnQuZnJvbUdyb3VwLm5hbWUsXG4gICAgICAgICAgcmVwb3J0Lmdyb3VwLm5hbWUsXG4gICAgICAgICAgcmVwb3J0LnByb2R1Y3QuU0tVLFxuICAgICAgICAgIHJlcG9ydC5wcm9kdWN0Lm5hbWUsXG4gICAgICAgICAgcmVwb3J0LnF1YW50aXR5LFxuICAgICAgICBdLmpvaW4oJywnKVxuICAgICAgKVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGNzdkRhdGE7XG59XG5cbmNvbnN0IGNzdkRvd25sb2FkTWFwOiBJQ1NWRG93bmxvYWRNYXAgPSB7XG4gICdldmVudHMnOiBnZW5lcmF0ZUNTVkV2ZW50cyxcbiAgJ3JlcXVlc3Rfc2hhcmUnOiBnZW5lcmF0ZUNTVlJlcXVlc3RTaGFyZSxcbiAgJ2ludmVudG9yaWVzJzogZ2VuZXJhdGVDU1ZJbnZlbnRvcmllcyxcbiAgJ2FkanVzdG1lbnQnOiBnZW5lcmF0ZUNTVkFkanVzdG1lbnRzLFxuICAnYXNzaWduJzogZ2VuZXJhdGVDU1ZBc3NpZ24sXG4gICdpbmJvdW5kX29yZGVyJzogZ2VuZXJhdGVDU1ZJbmJvdW5kT3JkZXIsXG4gICdzaGlwcGluZyc6IGdlbmVyYXRlQ1NWU2hpcHBpbmcsXG59XG5cbmNvbnN0IGZpbHRlcnNJZHMgPSBbXG4gICdyZXF1ZXN0LXNoYXJlLXR5cGUnLFxuICAnc2hpcHBpbmctdHlwZScsXG4gICd1c2VyLXNlbGVjdCcsXG4gICdmaWx0ZXItc3RhcnQtZGF0ZScsXG4gICdmaWx0ZXItc3RhcnQtZGF0ZS10bycsXG4gICdmaWx0ZXItZW5kLWRhdGUnLFxuICAnZmlsdGVyLWVuZC1kYXRlLXRvJywgIFxuICAnbWFzdGVyLWdyb3VwJyxcbiAgJ3RhcmdldC1ncm91cCcsXG4gICdmaWx0ZXItZ3JvdXAtYnJhbmQnLFxuICAnZmlsdGVyLWdyb3VwLWxhbmd1YWdlJyxcbiAgJ2ZpbHRlci1ncm91cC1wcmVtaXNlcycsXG4gICdmaWx0ZXItZ3JvdXAtY2F0ZWdvcnknLFxuICAnZmlsdGVyLWdyb3VwLWV2ZW50cycsXG4gICdncm91cC1mcm9tJyxcbiAgJ2dyb3VwLXRvJyxcbiAgJ2RpdmlzaW9uLXNlbGVjdCcsXG5dO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAvLyBET00gbm9kZXNcbiAgY29uc3QgcmVwb3J0VHlwZVNlbGVjdEhUTUwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVwb3J0LXR5cGUtc2VsZWN0JykgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XG4gIGNvbnN0IGFsbEZpbHRlcnNIVE1MID0gZmlsdGVyc0lkcy5tYXAoaWQgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpKTtcbiAgY29uc3QgdGFibGVMb2FkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFibGUtcmVwb3J0LWxvYWRlcicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuICBjb25zdCBjbGVhckZpbHRlcnNCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsdGVyLWNsZWFyLWJ1dHRvbicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuICBjb25zdCBzZWFyY2hRdWVyeUhUTUwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoLXF1ZXJ5JykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgY29uc3QgZG93bmxvYWRDU1ZCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnV0dG9uLWNzdi1kb3dubG9hZCcpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuXG4gIGZvciAoY29uc3QgW3JlcG9ydFR5cGUsIGZpbHRlcnNdIG9mIE9iamVjdC5lbnRyaWVzKGZpbHRlcnNNYXApKSB7XG4gICAgICBmaWx0ZXJzTWFwW3JlcG9ydFR5cGVdID0gZmlsdGVycy5tYXAoaWQgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQgYXMgc3RyaW5nKSkgYXMgSFRNTEVsZW1lbnRbXTtcbiAgfVxuXG4gIC8vIFNob3cvcmVtb3ZlIGZpbHRlcnMgd2hlbiBjaG9vc2UgZXZlbnQgcmVwb3J0IHR5cGVcbiAgcmVwb3J0VHlwZVNlbGVjdEhUTUwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IHNlbGVjdEhUTUwgPSBlLnRhcmdldCBhcyBIVE1MU2VsZWN0RWxlbWVudDtcbiAgICAgIGFsbEZpbHRlcnNIVE1MLmZvckVhY2goZmlsdGVySFRNTCA9PiBmaWx0ZXJIVE1MLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpKTtcbiAgICAgIGNvbnN0IHZpc2libGVGaWx0ZXJzID0gZmlsdGVyc01hcFtzZWxlY3RIVE1MLnZhbHVlXSBhcyBIVE1MRWxlbWVudFtdO1xuICAgICAgdmlzaWJsZUZpbHRlcnMuZm9yRWFjaChmaWx0ZXJIVE1MID0+IGZpbHRlckhUTUwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJykpO1xuICB9KTtcblxuICB0YWJsZUxvYWRlci5jbGljaygpO1xuICBjbGVhckZpbHRlcnNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgYWxsRmlsdGVyc0hUTUwuZm9yRWFjaChmaWx0ZXJIVE1MID0+IHtcbiAgICAgIGNvbnN0IGlucHV0ID0gZmlsdGVySFRNTC5xdWVyeVNlbGVjdG9yKCdpbnB1dCwgc2VsZWN0JykgYXMgSFRNTFNlbGVjdEVsZW1lbnQgfCBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgaW5wdXQudmFsdWUgPSAnJztcbiAgICB9KTtcbiAgICBzZWFyY2hRdWVyeUhUTUwudmFsdWUgPSAnJztcbiAgICB0YWJsZUxvYWRlci5jbGljaygpO1xuICB9KTtcbiAgLy8gRG93bmxvYWQgY3N2IGJ1dHRvblxuICBkb3dubG9hZENTVkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBmaWx0ZXJzUXVlcnlQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgYWxsRmlsdGVyc0hUTUwuZm9yRWFjaChmaWx0ZXJIVE1MID0+IHtcbiAgICAgIGNvbnN0IGlucHV0ID0gZmlsdGVySFRNTC5xdWVyeVNlbGVjdG9yKCdpbnB1dCwgc2VsZWN0JykgYXMgSFRNTFNlbGVjdEVsZW1lbnQgfCBIVE1MSW5wdXRFbGVtZW50XG4gICAgICBmaWx0ZXJzUXVlcnlQYXJhbXMuYXBwZW5kKGlucHV0LmdldEF0dHJpYnV0ZSgnbmFtZScpLCBpbnB1dC52YWx1ZSk7XG4gICAgfSlcbiAgICBmaWx0ZXJzUXVlcnlQYXJhbXMuYXBwZW5kKCdxJywgc2VhcmNoUXVlcnlIVE1MLnZhbHVlKTtcbiAgICBmaWx0ZXJzUXVlcnlQYXJhbXMuYXBwZW5kKCdyZXBvcnRfdHlwZScsIHJlcG9ydFR5cGVTZWxlY3RIVE1MLnZhbHVlKTtcbiAgICBjb25zb2xlLmxvZygncmVwb3J0X3R5cGUnLCByZXBvcnRUeXBlU2VsZWN0SFRNTC52YWx1ZSk7XG4gICAgY29uc3QgY3N2RGF0YSA9IGF3YWl0IGNzdkRvd25sb2FkTWFwW3JlcG9ydFR5cGVTZWxlY3RIVE1MLnZhbHVlXShmaWx0ZXJzUXVlcnlQYXJhbXMpO1xuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbY3N2RGF0YS5qb2luKCdcXG4nKV0sIHsgdHlwZTogJ3RleHQvY3N2JyB9KTtcbiAgICBjb25zdCB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGEuc2V0QXR0cmlidXRlKCdocmVmJywgdXJsKTtcbiAgICBhLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCAncmVwb3J0LmNzdicpO1xuICAgIGEuY2xpY2soKTtcbiAgICBhLnJlbW92ZSgpO1xuICB9KTtcbn0pOyIsImV4cG9ydCBjb25zdCBmb3JtYXREYXRlID0gKGRhdGU6IHN0cmluZykgPT4ge1xuICBjb25zdCBjcmVhdGVBdCA9IG5ldyBEYXRlKGRhdGUpO1xuICBjb25zdCB5ZWFyID0gY3JlYXRlQXQuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgbW9udGggPSBTdHJpbmcoY3JlYXRlQXQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsICcwJyk7IC8vIE1vbnRoIGlzIDAtYmFzZWRcbiAgY29uc3QgZGF5ID0gU3RyaW5nKGNyZWF0ZUF0LmdldERhdGUoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgY29uc3QgaG91cnMgPSBTdHJpbmcoY3JlYXRlQXQuZ2V0SG91cnMoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgY29uc3QgbWludXRlcyA9IFN0cmluZyhjcmVhdGVBdC5nZXRNaW51dGVzKCkpLnBhZFN0YXJ0KDIsICcwJyk7XG4gIHJldHVybiBgJHttb250aH0vJHtkYXl9LyR7eWVhcn0gJHtob3Vyc306JHttaW51dGVzfWA7XG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9yZXBvcnQudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=