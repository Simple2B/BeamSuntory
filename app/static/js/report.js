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
    events: ['user-select', 'filter-start-date', 'filter-start-date-to', 'filter-end-date', 'filter-end-date-to'],
    request_share: ['user-select', 'filter-start-date', 'filter-end-date'],
    inventories: [
        'user-select',
        'filter-start-date',
        'filter-end-date',
        'master-group',
        'target-group',
        'filter-group-brand',
        'filter-group-language',
        'filter-group-premises',
        'filter-group-categories',
        'filter-group-events',
    ],
    adjustment: [
        'user-select',
        'filter-start-date',
        'filter-end-date',
        'master-group',
        'target-group',
        'filter-group-brand',
        'filter-group-language',
        'filter-group-premises',
        'filter-group-categories',
        'filter-group-events',
    ],
    assign: [
        'user-select',
        'group-from',
        'group-to',
        'filter-start-date',
        'filter-end-date',
        'filter-group-brand',
        'filter-group-language',
        'filter-group-premises',
        'filter-group-categories',
    ],
    inbound_order: [
        'filter-start-date',
        'filter-end-date',
        'filter-group-brand',
        'filter-group-premises',
        'filter-group-categories',
        'filter-product-group',
    ],
    shipping: [
        'division-select',
        'target-group',
        'filter-start-date',
        'filter-end-date',
        'filter-group-brand',
        'filter-group-language',
        'filter-group-categories',
        'filter-group-premises',
    ],
    shelf_life: [
        'filter-start-date',
        'filter-end-date',
        'master-group',
        'target-group',
        'filter-group-brand',
        'filter-group-language',
        'filter-group-premises',
        'filter-group-categories',
        'shelf-life-filter-expire-in',
    ],
};
var searchSKUInput = document.getElementById('search-sku');
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
                csvData = ['action_type,user,created_at,store,event_date_from,event_date_to,sku,product_name'];
                return [4 /*yield*/, fetchReportAPI(queryParams, function (data) {
                        data.reports.forEach(function (report) {
                            report.shipRequest.carts.forEach(function (cart) {
                                if (searchSKUInput.value && !cart.product.SKU.includes(searchSKUInput.value)) {
                                    return;
                                }
                                csvData.push([
                                    report.type,
                                    report.user.username,
                                    report.createdAt,
                                    report.shipRequest.store.storeName,
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
                csvData = [
                    'action_type,user,created_at,current_share_request_status,group_from,group_to,desired_quantity,sku,product_name',
                ];
                return [4 /*yield*/, fetchReportAPI(queryParams, function (data) {
                        data.reports.forEach(function (report) {
                            if (searchSKUInput.value && !report.requestShare.product.SKU.includes(searchSKUInput.value)) {
                                return;
                            }
                            csvData.push([
                                report.type,
                                report.user.username,
                                report.createdAt,
                                report.requestShare.status,
                                report.requestShare.fromGroup.name,
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
                csvData = ['product_name,sku,group,quantity,created_at'];
                return [4 /*yield*/, fetchReportAPI(queryParams, function (data) {
                        data.reports.forEach(function (report) {
                            for (var i = 0; i < report.product.warehouseProducts.length; i++) {
                                var warehouseProduct = report.product.warehouseProducts[i];
                                if (warehouseProduct.group.name === report.group.name) {
                                    csvData.push([
                                        report.product.name,
                                        report.product.SKU,
                                        report.group.name,
                                        warehouseProduct.productQuantity,
                                        (0, utils_1.formatDate)(report.createdAt),
                                    ].join(','));
                                }
                            }
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
                csvData = [
                    'created_at,product_name,sku,username,master_group,group,warehouse,quantity_before,quantity_after,quantity_delta,note',
                ];
                return [4 /*yield*/, fetchReportAPI(queryParams, function (data) {
                        data.reports.forEach(function (adjust) {
                            adjust.adjustGroupQty.forEach(function (reportAdjust) {
                                if (searchSKUInput.value && !adjust.product.SKU.includes(searchSKUInput.value)) {
                                    return;
                                }
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
                                    reportAdjust.delta,
                                    adjust.note,
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
                        var searchingGroup = queryParams.get('product_group');
                        data.reports.forEach(function (report) {
                            report.inboundOrder.productsAllocated.forEach(function (productsAllocated) {
                                productsAllocated.productQuantityGroups.forEach(function (productQuantityGroup) {
                                    if (searchSKUInput.value && !productsAllocated.product.SKU.includes(searchSKUInput.value)) {
                                        return;
                                    }
                                    if (searchingGroup && !productQuantityGroup.group.name.includes(searchingGroup)) {
                                        return;
                                    }
                                    csvData.push([
                                        (0, utils_1.formatDate)(report.createdAt),
                                        report.user.username,
                                        report.type,
                                        report.inboundOrder.title,
                                        productsAllocated.product.name,
                                        productsAllocated.product.SKU,
                                        productQuantityGroup.group.name,
                                        productQuantityGroup.quantity,
                                    ].join(','));
                                });
                                if (!productsAllocated.productQuantityGroups.length) {
                                    csvData.push([
                                        (0, utils_1.formatDate)(report.createdAt),
                                        report.user.username,
                                        report.type,
                                        report.inboundOrder.title,
                                        productsAllocated.product.name,
                                        productsAllocated.product.SKU,
                                    ].join(','));
                                }
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
                csvData = [
                    'action_type,user,created_at,current_ship_request_status,store_name,sku,product_name,group,quantity',
                ];
                return [4 /*yield*/, fetchReportAPI(queryParams, function (data) {
                        data.reports.forEach(function (report) {
                            report.shipRequest.carts.forEach(function (cart) {
                                if (searchSKUInput.value && !cart.product.SKU.includes(searchSKUInput.value)) {
                                    return;
                                }
                                csvData.push([
                                    report.type,
                                    report.user.username,
                                    report.createdAt,
                                    report.shipRequest.status,
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
                        data.reports.forEach(function (report) {
                            if (searchSKUInput.value && !report.product.SKU.includes(searchSKUInput.value)) {
                                return;
                            }
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
var generateCSVShelfLife = function (queryParams) { return __awaiter(void 0, void 0, void 0, function () {
    var csvData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                csvData = ['SKU, shelfLifeStart, shelfLifeEnd, quantityOrdered, quantityReceived'];
                return [4 /*yield*/, fetchReportAPI(queryParams, function (data) {
                        data.reportShelfLifeList.forEach(function (report) {
                            var received;
                            if (!report.quantityReceived) {
                                received = '-';
                            }
                            else {
                                received = report.quantityReceived.toString();
                            }
                            if (searchSKUInput.value.length && !report.product.SKU.includes(searchSKUInput.value)) {
                                return;
                            }
                            csvData.push([
                                report.product.SKU,
                                (0, utils_1.formatDate)(report.shelfLifeStart),
                                (0, utils_1.formatDate)(report.shelfLifeStart),
                                report.quantity,
                                received,
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
    events: generateCSVEvents,
    request_share: generateCSVRequestShare,
    inventories: generateCSVInventories,
    adjustment: generateCSVAdjustments,
    assign: generateCSVAssign,
    inbound_order: generateCSVInboundOrder,
    shipping: generateCSVShipping,
    shelf_life: generateCSVShelfLife,
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
    'filter-group-categories',
    'filter-group-events',
    'filter-product-group',
    'group-from',
    'group-to',
    'division-select',
    'shelf-life-filter-expire-in',
];
document.addEventListener('DOMContentLoaded', function () {
    // DOM nodes
    var reportTypeSelectHTML = document.getElementById('report-type-select');
    var allFiltersHTML = filtersIds.map(function (id) { return document.getElementById(id); });
    var tableLoader = document.getElementById('table-report-loader');
    var clearFiltersButton = document.getElementById('filter-clear-button');
    var searchQueryHTML = document.getElementById('search-query');
    var searchSkuHTML = document.getElementById('search-sku');
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
        searchSkuHTML.value = '';
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
    if (!date) {
        return 'None';
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMzRCxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMvRCxPQUFPLFVBQUcsS0FBSyxjQUFJLEdBQUcsY0FBSSxJQUFJLGNBQUksS0FBSyxjQUFJLE9BQU8sQ0FBRSxDQUFDO0FBQ3ZELENBQUMsQ0FBQztBQVpXLGtCQUFVLGNBWXJCOzs7Ozs7O1VDWkY7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3N0YXRpYy8uL3NyYy9yZXBvcnQudHMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vc3JjL3V0aWxzLnRzIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSVJlcG9ydFJlcXVlc3RTaGFyZVJlc3BvbnNlLFxuICBJRXZlbnRzUmVwb3J0UmVzcG9uc2UsXG4gIElJbnZlbnRvcmllc1JlcG9ydFJlc3BvbnNlLFxuICBJUmVwb3J0QWRqdXN0UmVzcG9uc2UsXG4gIElSZXBvcnRJbmJvdW5kT3JkZXJSZXNwb25zZSxcbiAgSVJlcG9ydFNoaXBwaW5nUmVzcG9uc2UsXG4gIElSZXBvcnRBc3NpZ25SZXNwb25zZSxcbiAgSVJlcG9ydFNoZWxmTGlmZVJlc3BvbnNlLFxufSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IGZvcm1hdERhdGUgfSBmcm9tICcuL3V0aWxzJztcblxuaW50ZXJmYWNlIElGaWx0ZXJNYXAge1xuICBbaW5kZXg6IHN0cmluZ106IHN0cmluZ1tdIHwgSFRNTEVsZW1lbnRbXTtcbn1cblxuaW50ZXJmYWNlIElDU1ZEb3dubG9hZE1hcCB7XG4gIFtpbmRleDogc3RyaW5nXTogKHF1ZXJ5OiBVUkxTZWFyY2hQYXJhbXMpID0+IFByb21pc2U8c3RyaW5nW10+O1xufVxuXG5jb25zdCBmaWx0ZXJzTWFwOiBJRmlsdGVyTWFwID0ge1xuICBldmVudHM6IFsndXNlci1zZWxlY3QnLCAnZmlsdGVyLXN0YXJ0LWRhdGUnLCAnZmlsdGVyLXN0YXJ0LWRhdGUtdG8nLCAnZmlsdGVyLWVuZC1kYXRlJywgJ2ZpbHRlci1lbmQtZGF0ZS10byddLFxuICByZXF1ZXN0X3NoYXJlOiBbJ3VzZXItc2VsZWN0JywgJ2ZpbHRlci1zdGFydC1kYXRlJywgJ2ZpbHRlci1lbmQtZGF0ZSddLFxuICBpbnZlbnRvcmllczogW1xuICAgICd1c2VyLXNlbGVjdCcsXG4gICAgJ2ZpbHRlci1zdGFydC1kYXRlJyxcbiAgICAnZmlsdGVyLWVuZC1kYXRlJyxcbiAgICAnbWFzdGVyLWdyb3VwJyxcbiAgICAndGFyZ2V0LWdyb3VwJyxcbiAgICAnZmlsdGVyLWdyb3VwLWJyYW5kJyxcbiAgICAnZmlsdGVyLWdyb3VwLWxhbmd1YWdlJyxcbiAgICAnZmlsdGVyLWdyb3VwLXByZW1pc2VzJyxcbiAgICAnZmlsdGVyLWdyb3VwLWNhdGVnb3JpZXMnLFxuICAgICdmaWx0ZXItZ3JvdXAtZXZlbnRzJyxcbiAgXSxcbiAgYWRqdXN0bWVudDogW1xuICAgICd1c2VyLXNlbGVjdCcsXG4gICAgJ2ZpbHRlci1zdGFydC1kYXRlJyxcbiAgICAnZmlsdGVyLWVuZC1kYXRlJyxcbiAgICAnbWFzdGVyLWdyb3VwJyxcbiAgICAndGFyZ2V0LWdyb3VwJyxcbiAgICAnZmlsdGVyLWdyb3VwLWJyYW5kJyxcbiAgICAnZmlsdGVyLWdyb3VwLWxhbmd1YWdlJyxcbiAgICAnZmlsdGVyLWdyb3VwLXByZW1pc2VzJyxcbiAgICAnZmlsdGVyLWdyb3VwLWNhdGVnb3JpZXMnLFxuICAgICdmaWx0ZXItZ3JvdXAtZXZlbnRzJyxcbiAgXSxcbiAgYXNzaWduOiBbXG4gICAgJ3VzZXItc2VsZWN0JyxcbiAgICAnZ3JvdXAtZnJvbScsXG4gICAgJ2dyb3VwLXRvJyxcbiAgICAnZmlsdGVyLXN0YXJ0LWRhdGUnLFxuICAgICdmaWx0ZXItZW5kLWRhdGUnLFxuICAgICdmaWx0ZXItZ3JvdXAtYnJhbmQnLFxuICAgICdmaWx0ZXItZ3JvdXAtbGFuZ3VhZ2UnLFxuICAgICdmaWx0ZXItZ3JvdXAtcHJlbWlzZXMnLFxuICAgICdmaWx0ZXItZ3JvdXAtY2F0ZWdvcmllcycsXG4gIF0sXG4gIGluYm91bmRfb3JkZXI6IFtcbiAgICAnZmlsdGVyLXN0YXJ0LWRhdGUnLFxuICAgICdmaWx0ZXItZW5kLWRhdGUnLFxuICAgICdmaWx0ZXItZ3JvdXAtYnJhbmQnLFxuICAgICdmaWx0ZXItZ3JvdXAtcHJlbWlzZXMnLFxuICAgICdmaWx0ZXItZ3JvdXAtY2F0ZWdvcmllcycsXG4gICAgJ2ZpbHRlci1wcm9kdWN0LWdyb3VwJyxcbiAgXSxcbiAgc2hpcHBpbmc6IFtcbiAgICAnZGl2aXNpb24tc2VsZWN0JyxcbiAgICAndGFyZ2V0LWdyb3VwJyxcbiAgICAnZmlsdGVyLXN0YXJ0LWRhdGUnLFxuICAgICdmaWx0ZXItZW5kLWRhdGUnLFxuICAgICdmaWx0ZXItZ3JvdXAtYnJhbmQnLFxuICAgICdmaWx0ZXItZ3JvdXAtbGFuZ3VhZ2UnLFxuICAgICdmaWx0ZXItZ3JvdXAtY2F0ZWdvcmllcycsXG4gICAgJ2ZpbHRlci1ncm91cC1wcmVtaXNlcycsXG4gIF0sXG4gIHNoZWxmX2xpZmU6IFtcbiAgICAnZmlsdGVyLXN0YXJ0LWRhdGUnLFxuICAgICdmaWx0ZXItZW5kLWRhdGUnLFxuICAgICdtYXN0ZXItZ3JvdXAnLFxuICAgICd0YXJnZXQtZ3JvdXAnLFxuICAgICdmaWx0ZXItZ3JvdXAtYnJhbmQnLFxuICAgICdmaWx0ZXItZ3JvdXAtbGFuZ3VhZ2UnLFxuICAgICdmaWx0ZXItZ3JvdXAtcHJlbWlzZXMnLFxuICAgICdmaWx0ZXItZ3JvdXAtY2F0ZWdvcmllcycsXG4gICAgJ3NoZWxmLWxpZmUtZmlsdGVyLWV4cGlyZS1pbicsXG4gIF0sXG59O1xuXG5jb25zdCBzZWFyY2hTS1VJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gtc2t1JykgYXMgSFRNTElucHV0RWxlbWVudDtcblxuY29uc3QgZmV0Y2hSZXBvcnRBUEkgPSBhc3luYyAocXVlcnlQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcywgY2FsbGJhY2s6IChkYXRhOiBPYmplY3QpID0+IHZvaWQpID0+IHtcbiAgbGV0IHBhZ2VzID0gMTtcblxuICBjb25zdCB1cmxXaXRob3V0UXVlcnlQYXJhbXMgPSBsb2NhdGlvbi5vcmlnaW4gKyBsb2NhdGlvbi5wYXRobmFtZTtcbiAgZm9yIChsZXQgcGFnZSA9IDE7IHBhZ2UgPD0gcGFnZXM7IHBhZ2UrKykge1xuICAgIGNvbnN0IHVybCA9IFtgYXBpP3BhZ2U9JHtwYWdlfWAsIHF1ZXJ5UGFyYW1zLnRvU3RyaW5nKCldLmpvaW4oJyYnKTtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHt1cmxXaXRob3V0UXVlcnlQYXJhbXN9JHt1cmx9YCk7XG4gICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoYXdhaXQgcmVzLmpzb24oKSk7XG5cbiAgICBjYWxsYmFjayhkYXRhKTtcbiAgICBwYWdlcyA9IGRhdGEucGFnaW5hdGlvbi5wYWdlcztcbiAgfVxufTtcblxuY29uc3QgZ2VuZXJhdGVDU1ZFdmVudHMgPSBhc3luYyAocXVlcnlQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcykgPT4ge1xuICBjb25zdCBjc3ZEYXRhID0gWydhY3Rpb25fdHlwZSx1c2VyLGNyZWF0ZWRfYXQsc3RvcmUsZXZlbnRfZGF0ZV9mcm9tLGV2ZW50X2RhdGVfdG8sc2t1LHByb2R1Y3RfbmFtZSddO1xuICBhd2FpdCBmZXRjaFJlcG9ydEFQSShxdWVyeVBhcmFtcywgKGRhdGE6IElFdmVudHNSZXBvcnRSZXNwb25zZSkgPT4ge1xuICAgIGRhdGEucmVwb3J0cy5mb3JFYWNoKChyZXBvcnQpID0+IHtcbiAgICAgIHJlcG9ydC5zaGlwUmVxdWVzdC5jYXJ0cy5mb3JFYWNoKChjYXJ0KSA9PiB7XG4gICAgICAgIGlmIChzZWFyY2hTS1VJbnB1dC52YWx1ZSAmJiAhY2FydC5wcm9kdWN0LlNLVS5pbmNsdWRlcyhzZWFyY2hTS1VJbnB1dC52YWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjc3ZEYXRhLnB1c2goXG4gICAgICAgICAgW1xuICAgICAgICAgICAgcmVwb3J0LnR5cGUsXG4gICAgICAgICAgICByZXBvcnQudXNlci51c2VybmFtZSxcbiAgICAgICAgICAgIHJlcG9ydC5jcmVhdGVkQXQsXG4gICAgICAgICAgICByZXBvcnQuc2hpcFJlcXVlc3Quc3RvcmUuc3RvcmVOYW1lLFxuICAgICAgICAgICAgY2FydC5ldmVudC5kYXRlRnJvbSxcbiAgICAgICAgICAgIGNhcnQuZXZlbnQuZGF0ZVRvLFxuICAgICAgICAgICAgY2FydC5wcm9kdWN0LlNLVSxcbiAgICAgICAgICAgIGNhcnQucHJvZHVjdC5uYW1lLFxuICAgICAgICAgIF0uam9pbignLCcpXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBjc3ZEYXRhO1xufTtcblxuY29uc3QgZ2VuZXJhdGVDU1ZSZXF1ZXN0U2hhcmUgPSBhc3luYyAocXVlcnlQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcykgPT4ge1xuICBjb25zdCBjc3ZEYXRhID0gW1xuICAgICdhY3Rpb25fdHlwZSx1c2VyLGNyZWF0ZWRfYXQsY3VycmVudF9zaGFyZV9yZXF1ZXN0X3N0YXR1cyxncm91cF9mcm9tLGdyb3VwX3RvLGRlc2lyZWRfcXVhbnRpdHksc2t1LHByb2R1Y3RfbmFtZScsXG4gIF07XG4gIGF3YWl0IGZldGNoUmVwb3J0QVBJKHF1ZXJ5UGFyYW1zLCAoZGF0YTogSVJlcG9ydFJlcXVlc3RTaGFyZVJlc3BvbnNlKSA9PiB7XG4gICAgZGF0YS5yZXBvcnRzLmZvckVhY2goKHJlcG9ydCkgPT4ge1xuICAgICAgaWYgKHNlYXJjaFNLVUlucHV0LnZhbHVlICYmICFyZXBvcnQucmVxdWVzdFNoYXJlLnByb2R1Y3QuU0tVLmluY2x1ZGVzKHNlYXJjaFNLVUlucHV0LnZhbHVlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNzdkRhdGEucHVzaChcbiAgICAgICAgW1xuICAgICAgICAgIHJlcG9ydC50eXBlLFxuICAgICAgICAgIHJlcG9ydC51c2VyLnVzZXJuYW1lLFxuICAgICAgICAgIHJlcG9ydC5jcmVhdGVkQXQsXG4gICAgICAgICAgcmVwb3J0LnJlcXVlc3RTaGFyZS5zdGF0dXMsXG4gICAgICAgICAgcmVwb3J0LnJlcXVlc3RTaGFyZS5mcm9tR3JvdXAubmFtZSxcbiAgICAgICAgICByZXBvcnQucmVxdWVzdFNoYXJlLmdyb3VwLm5hbWUsXG4gICAgICAgICAgcmVwb3J0LnJlcXVlc3RTaGFyZS5kZXNpcmVRdWFudGl0eSxcbiAgICAgICAgICByZXBvcnQucmVxdWVzdFNoYXJlLnByb2R1Y3QuU0tVLFxuICAgICAgICAgIHJlcG9ydC5yZXF1ZXN0U2hhcmUucHJvZHVjdC5uYW1lLFxuICAgICAgICBdLmpvaW4oJywnKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBjc3ZEYXRhO1xufTtcblxuY29uc3QgZ2VuZXJhdGVDU1ZJbnZlbnRvcmllcyA9IGFzeW5jIChxdWVyeVBhcmFtczogVVJMU2VhcmNoUGFyYW1zKSA9PiB7XG4gIC8vIENTViBIZWFkZXJzXG4gIGNvbnN0IGNzdkRhdGEgPSBbJ3Byb2R1Y3RfbmFtZSxza3UsZ3JvdXAscXVhbnRpdHksY3JlYXRlZF9hdCddO1xuICBhd2FpdCBmZXRjaFJlcG9ydEFQSShxdWVyeVBhcmFtcywgKGRhdGE6IElJbnZlbnRvcmllc1JlcG9ydFJlc3BvbnNlKSA9PiB7XG4gICAgZGF0YS5yZXBvcnRzLmZvckVhY2goKHJlcG9ydCkgPT4ge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXBvcnQucHJvZHVjdC53YXJlaG91c2VQcm9kdWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCB3YXJlaG91c2VQcm9kdWN0ID0gcmVwb3J0LnByb2R1Y3Qud2FyZWhvdXNlUHJvZHVjdHNbaV07XG5cbiAgICAgICAgaWYgKHdhcmVob3VzZVByb2R1Y3QuZ3JvdXAubmFtZSA9PT0gcmVwb3J0Lmdyb3VwLm5hbWUpIHtcbiAgICAgICAgICBjc3ZEYXRhLnB1c2goXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIHJlcG9ydC5wcm9kdWN0Lm5hbWUsXG4gICAgICAgICAgICAgIHJlcG9ydC5wcm9kdWN0LlNLVSxcbiAgICAgICAgICAgICAgcmVwb3J0Lmdyb3VwLm5hbWUsXG4gICAgICAgICAgICAgIHdhcmVob3VzZVByb2R1Y3QucHJvZHVjdFF1YW50aXR5LFxuICAgICAgICAgICAgICBmb3JtYXREYXRlKHJlcG9ydC5jcmVhdGVkQXQpLFxuICAgICAgICAgICAgXS5qb2luKCcsJylcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gY3N2RGF0YTtcbn07XG5cbmNvbnN0IGdlbmVyYXRlQ1NWQWRqdXN0bWVudHMgPSBhc3luYyAocXVlcnlQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcykgPT4ge1xuICAvLyBDU1YgSGVhZGVyc1xuICBjb25zdCBjc3ZEYXRhID0gW1xuICAgICdjcmVhdGVkX2F0LHByb2R1Y3RfbmFtZSxza3UsdXNlcm5hbWUsbWFzdGVyX2dyb3VwLGdyb3VwLHdhcmVob3VzZSxxdWFudGl0eV9iZWZvcmUscXVhbnRpdHlfYWZ0ZXIscXVhbnRpdHlfZGVsdGEsbm90ZScsXG4gIF07XG4gIGF3YWl0IGZldGNoUmVwb3J0QVBJKHF1ZXJ5UGFyYW1zLCAoZGF0YTogSVJlcG9ydEFkanVzdFJlc3BvbnNlKSA9PiB7XG4gICAgZGF0YS5yZXBvcnRzLmZvckVhY2goKGFkanVzdCkgPT4ge1xuICAgICAgYWRqdXN0LmFkanVzdEdyb3VwUXR5LmZvckVhY2goKHJlcG9ydEFkanVzdCkgPT4ge1xuICAgICAgICBpZiAoc2VhcmNoU0tVSW5wdXQudmFsdWUgJiYgIWFkanVzdC5wcm9kdWN0LlNLVS5pbmNsdWRlcyhzZWFyY2hTS1VJbnB1dC52YWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY3N2RGF0YS5wdXNoKFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIGZvcm1hdERhdGUoYWRqdXN0LmNyZWF0ZWRBdCksXG4gICAgICAgICAgICBhZGp1c3QucHJvZHVjdC5uYW1lLFxuICAgICAgICAgICAgYWRqdXN0LnByb2R1Y3QuU0tVLFxuICAgICAgICAgICAgYWRqdXN0LnVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgICByZXBvcnRBZGp1c3QuZ3JvdXAubWFzdGVyR3JvdXAubmFtZSxcbiAgICAgICAgICAgIHJlcG9ydEFkanVzdC5ncm91cC5uYW1lLFxuICAgICAgICAgICAgcmVwb3J0QWRqdXN0LndhcmVob3VzZS5uYW1lLFxuICAgICAgICAgICAgcmVwb3J0QWRqdXN0LnF1YW50aXR5QmVmb3JlLFxuICAgICAgICAgICAgcmVwb3J0QWRqdXN0LnF1YW50aXR5QWZ0ZXIsXG4gICAgICAgICAgICByZXBvcnRBZGp1c3QuZGVsdGEsXG4gICAgICAgICAgICBhZGp1c3Qubm90ZSxcbiAgICAgICAgICBdLmpvaW4oJywnKVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gY3N2RGF0YTtcbn07XG5cbmNvbnN0IGdlbmVyYXRlQ1NWSW5ib3VuZE9yZGVyID0gYXN5bmMgKHF1ZXJ5UGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMpID0+IHtcbiAgY29uc3QgY3N2RGF0YSA9IFsnY3JlYXRlZF9hdCx1c2VybmFtZSx0eXBlLG9yZGVyX3RpdGxlLGFsbG9jYXRlZF9wcm9kdWN0LHNrdSxncm91cCxxdWFudGl0eSddO1xuICBhd2FpdCBmZXRjaFJlcG9ydEFQSShxdWVyeVBhcmFtcywgKGRhdGE6IElSZXBvcnRJbmJvdW5kT3JkZXJSZXNwb25zZSkgPT4ge1xuICAgIGNvbnN0IHNlYXJjaGluZ0dyb3VwID0gcXVlcnlQYXJhbXMuZ2V0KCdwcm9kdWN0X2dyb3VwJyk7XG4gICAgZGF0YS5yZXBvcnRzLmZvckVhY2goKHJlcG9ydCkgPT4ge1xuICAgICAgcmVwb3J0LmluYm91bmRPcmRlci5wcm9kdWN0c0FsbG9jYXRlZC5mb3JFYWNoKChwcm9kdWN0c0FsbG9jYXRlZCkgPT4ge1xuICAgICAgICBwcm9kdWN0c0FsbG9jYXRlZC5wcm9kdWN0UXVhbnRpdHlHcm91cHMuZm9yRWFjaCgocHJvZHVjdFF1YW50aXR5R3JvdXApID0+IHtcbiAgICAgICAgICBpZiAoc2VhcmNoU0tVSW5wdXQudmFsdWUgJiYgIXByb2R1Y3RzQWxsb2NhdGVkLnByb2R1Y3QuU0tVLmluY2x1ZGVzKHNlYXJjaFNLVUlucHV0LnZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2VhcmNoaW5nR3JvdXAgJiYgIXByb2R1Y3RRdWFudGl0eUdyb3VwLmdyb3VwLm5hbWUuaW5jbHVkZXMoc2VhcmNoaW5nR3JvdXApKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGNzdkRhdGEucHVzaChcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgZm9ybWF0RGF0ZShyZXBvcnQuY3JlYXRlZEF0KSxcbiAgICAgICAgICAgICAgcmVwb3J0LnVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgICAgIHJlcG9ydC50eXBlLFxuICAgICAgICAgICAgICByZXBvcnQuaW5ib3VuZE9yZGVyLnRpdGxlLFxuICAgICAgICAgICAgICBwcm9kdWN0c0FsbG9jYXRlZC5wcm9kdWN0Lm5hbWUsXG4gICAgICAgICAgICAgIHByb2R1Y3RzQWxsb2NhdGVkLnByb2R1Y3QuU0tVLFxuICAgICAgICAgICAgICBwcm9kdWN0UXVhbnRpdHlHcm91cC5ncm91cC5uYW1lLFxuICAgICAgICAgICAgICBwcm9kdWN0UXVhbnRpdHlHcm91cC5xdWFudGl0eSxcbiAgICAgICAgICAgIF0uam9pbignLCcpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghcHJvZHVjdHNBbGxvY2F0ZWQucHJvZHVjdFF1YW50aXR5R3JvdXBzLmxlbmd0aCkge1xuICAgICAgICAgIGNzdkRhdGEucHVzaChcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgZm9ybWF0RGF0ZShyZXBvcnQuY3JlYXRlZEF0KSxcbiAgICAgICAgICAgICAgcmVwb3J0LnVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgICAgIHJlcG9ydC50eXBlLFxuICAgICAgICAgICAgICByZXBvcnQuaW5ib3VuZE9yZGVyLnRpdGxlLFxuICAgICAgICAgICAgICBwcm9kdWN0c0FsbG9jYXRlZC5wcm9kdWN0Lm5hbWUsXG4gICAgICAgICAgICAgIHByb2R1Y3RzQWxsb2NhdGVkLnByb2R1Y3QuU0tVLFxuICAgICAgICAgICAgXS5qb2luKCcsJylcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBjc3ZEYXRhO1xufTtcblxuY29uc3QgZ2VuZXJhdGVDU1ZTaGlwcGluZyA9IGFzeW5jIChxdWVyeVBhcmFtczogVVJMU2VhcmNoUGFyYW1zKSA9PiB7XG4gIC8vIENTViBIZWFkZXJzXG4gIGNvbnN0IGNzdkRhdGEgPSBbXG4gICAgJ2FjdGlvbl90eXBlLHVzZXIsY3JlYXRlZF9hdCxjdXJyZW50X3NoaXBfcmVxdWVzdF9zdGF0dXMsc3RvcmVfbmFtZSxza3UscHJvZHVjdF9uYW1lLGdyb3VwLHF1YW50aXR5JyxcbiAgXTtcbiAgYXdhaXQgZmV0Y2hSZXBvcnRBUEkocXVlcnlQYXJhbXMsIChkYXRhOiBJUmVwb3J0U2hpcHBpbmdSZXNwb25zZSkgPT4ge1xuICAgIGRhdGEucmVwb3J0cy5mb3JFYWNoKChyZXBvcnQpID0+IHtcbiAgICAgIHJlcG9ydC5zaGlwUmVxdWVzdC5jYXJ0cy5mb3JFYWNoKChjYXJ0KSA9PiB7XG4gICAgICAgIGlmIChzZWFyY2hTS1VJbnB1dC52YWx1ZSAmJiAhY2FydC5wcm9kdWN0LlNLVS5pbmNsdWRlcyhzZWFyY2hTS1VJbnB1dC52YWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY3N2RGF0YS5wdXNoKFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIHJlcG9ydC50eXBlLFxuICAgICAgICAgICAgcmVwb3J0LnVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgICByZXBvcnQuY3JlYXRlZEF0LFxuICAgICAgICAgICAgcmVwb3J0LnNoaXBSZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgICAgIHJlcG9ydC5zaGlwUmVxdWVzdC5zdG9yZS5zdG9yZU5hbWUsXG4gICAgICAgICAgICBjYXJ0LnByb2R1Y3QuU0tVLFxuICAgICAgICAgICAgY2FydC5wcm9kdWN0Lm5hbWUsXG4gICAgICAgICAgICBjYXJ0Lmdyb3VwLm5hbWUsXG4gICAgICAgICAgICBjYXJ0LnF1YW50aXR5LFxuICAgICAgICAgIF0uam9pbignLCcpXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNzdkRhdGE7XG59O1xuXG5jb25zdCBnZW5lcmF0ZUNTVkFzc2lnbiA9IGFzeW5jIChxdWVyeVBhcmFtczogVVJMU2VhcmNoUGFyYW1zKSA9PiB7XG4gIC8vIENTViBIZWFkZXJzXG4gIGNvbnN0IGNzdkRhdGEgPSBbJ2NyZWF0ZWRfYXQsdXNlcm5hbWUsdHlwZSxmcm9tX2dyb3VwLHRvX2dyb3VwLHNrdSxwcm9kdWN0X25hbWUscXVhbnRpdHknXTtcblxuICBhd2FpdCBmZXRjaFJlcG9ydEFQSShxdWVyeVBhcmFtcywgKGRhdGE6IElSZXBvcnRBc3NpZ25SZXNwb25zZSkgPT4ge1xuICAgIGRhdGEucmVwb3J0cy5mb3JFYWNoKChyZXBvcnQpID0+IHtcbiAgICAgIGlmIChzZWFyY2hTS1VJbnB1dC52YWx1ZSAmJiAhcmVwb3J0LnByb2R1Y3QuU0tVLmluY2x1ZGVzKHNlYXJjaFNLVUlucHV0LnZhbHVlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjc3ZEYXRhLnB1c2goXG4gICAgICAgIFtcbiAgICAgICAgICBmb3JtYXREYXRlKHJlcG9ydC5jcmVhdGVkQXQpLFxuICAgICAgICAgIHJlcG9ydC51c2VyLnVzZXJuYW1lLFxuICAgICAgICAgIHJlcG9ydC50eXBlLFxuICAgICAgICAgIHJlcG9ydC5mcm9tR3JvdXAubmFtZSxcbiAgICAgICAgICByZXBvcnQuZ3JvdXAubmFtZSxcbiAgICAgICAgICByZXBvcnQucHJvZHVjdC5TS1UsXG4gICAgICAgICAgcmVwb3J0LnByb2R1Y3QubmFtZSxcbiAgICAgICAgICByZXBvcnQucXVhbnRpdHksXG4gICAgICAgIF0uam9pbignLCcpXG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGNzdkRhdGE7XG59O1xuXG5jb25zdCBnZW5lcmF0ZUNTVlNoZWxmTGlmZSA9IGFzeW5jIChxdWVyeVBhcmFtczogVVJMU2VhcmNoUGFyYW1zKSA9PiB7XG4gIC8vIENTViBIZWFkZXJzXG4gIGNvbnN0IGNzdkRhdGEgPSBbJ1NLVSwgc2hlbGZMaWZlU3RhcnQsIHNoZWxmTGlmZUVuZCwgcXVhbnRpdHlPcmRlcmVkLCBxdWFudGl0eVJlY2VpdmVkJ107XG5cbiAgYXdhaXQgZmV0Y2hSZXBvcnRBUEkocXVlcnlQYXJhbXMsIChkYXRhOiBJUmVwb3J0U2hlbGZMaWZlUmVzcG9uc2UpID0+IHtcbiAgICBkYXRhLnJlcG9ydFNoZWxmTGlmZUxpc3QuZm9yRWFjaCgocmVwb3J0KSA9PiB7XG4gICAgICBsZXQgcmVjZWl2ZWQ7XG4gICAgICBpZiAoIXJlcG9ydC5xdWFudGl0eVJlY2VpdmVkKSB7XG4gICAgICAgIHJlY2VpdmVkID0gJy0nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVjZWl2ZWQgPSByZXBvcnQucXVhbnRpdHlSZWNlaXZlZC50b1N0cmluZygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2VhcmNoU0tVSW5wdXQudmFsdWUubGVuZ3RoICYmICFyZXBvcnQucHJvZHVjdC5TS1UuaW5jbHVkZXMoc2VhcmNoU0tVSW5wdXQudmFsdWUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY3N2RGF0YS5wdXNoKFxuICAgICAgICBbXG4gICAgICAgICAgcmVwb3J0LnByb2R1Y3QuU0tVLFxuICAgICAgICAgIGZvcm1hdERhdGUocmVwb3J0LnNoZWxmTGlmZVN0YXJ0KSxcbiAgICAgICAgICBmb3JtYXREYXRlKHJlcG9ydC5zaGVsZkxpZmVTdGFydCksXG4gICAgICAgICAgcmVwb3J0LnF1YW50aXR5LFxuICAgICAgICAgIHJlY2VpdmVkLFxuICAgICAgICBdLmpvaW4oJywnKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBjc3ZEYXRhO1xufTtcblxuY29uc3QgY3N2RG93bmxvYWRNYXA6IElDU1ZEb3dubG9hZE1hcCA9IHtcbiAgZXZlbnRzOiBnZW5lcmF0ZUNTVkV2ZW50cyxcbiAgcmVxdWVzdF9zaGFyZTogZ2VuZXJhdGVDU1ZSZXF1ZXN0U2hhcmUsXG4gIGludmVudG9yaWVzOiBnZW5lcmF0ZUNTVkludmVudG9yaWVzLFxuICBhZGp1c3RtZW50OiBnZW5lcmF0ZUNTVkFkanVzdG1lbnRzLFxuICBhc3NpZ246IGdlbmVyYXRlQ1NWQXNzaWduLFxuICBpbmJvdW5kX29yZGVyOiBnZW5lcmF0ZUNTVkluYm91bmRPcmRlcixcbiAgc2hpcHBpbmc6IGdlbmVyYXRlQ1NWU2hpcHBpbmcsXG4gIHNoZWxmX2xpZmU6IGdlbmVyYXRlQ1NWU2hlbGZMaWZlLFxufTtcblxuY29uc3QgZmlsdGVyc0lkcyA9IFtcbiAgJ3JlcXVlc3Qtc2hhcmUtdHlwZScsXG4gICdzaGlwcGluZy10eXBlJyxcbiAgJ3VzZXItc2VsZWN0JyxcbiAgJ2ZpbHRlci1zdGFydC1kYXRlJyxcbiAgJ2ZpbHRlci1zdGFydC1kYXRlLXRvJyxcbiAgJ2ZpbHRlci1lbmQtZGF0ZScsXG4gICdmaWx0ZXItZW5kLWRhdGUtdG8nLFxuICAnbWFzdGVyLWdyb3VwJyxcbiAgJ3RhcmdldC1ncm91cCcsXG4gICdmaWx0ZXItZ3JvdXAtYnJhbmQnLFxuICAnZmlsdGVyLWdyb3VwLWxhbmd1YWdlJyxcbiAgJ2ZpbHRlci1ncm91cC1wcmVtaXNlcycsXG4gICdmaWx0ZXItZ3JvdXAtY2F0ZWdvcmllcycsXG4gICdmaWx0ZXItZ3JvdXAtZXZlbnRzJyxcbiAgJ2ZpbHRlci1wcm9kdWN0LWdyb3VwJyxcbiAgJ2dyb3VwLWZyb20nLFxuICAnZ3JvdXAtdG8nLFxuICAnZGl2aXNpb24tc2VsZWN0JyxcbiAgJ3NoZWxmLWxpZmUtZmlsdGVyLWV4cGlyZS1pbicsXG5dO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAvLyBET00gbm9kZXNcbiAgY29uc3QgcmVwb3J0VHlwZVNlbGVjdEhUTUwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVwb3J0LXR5cGUtc2VsZWN0JykgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XG4gIGNvbnN0IGFsbEZpbHRlcnNIVE1MID0gZmlsdGVyc0lkcy5tYXAoKGlkKSA9PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkpO1xuICBjb25zdCB0YWJsZUxvYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YWJsZS1yZXBvcnQtbG9hZGVyJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gIGNvbnN0IGNsZWFyRmlsdGVyc0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWx0ZXItY2xlYXItYnV0dG9uJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gIGNvbnN0IHNlYXJjaFF1ZXJ5SFRNTCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gtcXVlcnknKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICBjb25zdCBzZWFyY2hTa3VIVE1MID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaC1za3UnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICBjb25zdCBkb3dubG9hZENTVkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidXR0b24tY3N2LWRvd25sb2FkJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG5cbiAgZm9yIChjb25zdCBbcmVwb3J0VHlwZSwgZmlsdGVyc10gb2YgT2JqZWN0LmVudHJpZXMoZmlsdGVyc01hcCkpIHtcbiAgICBmaWx0ZXJzTWFwW3JlcG9ydFR5cGVdID0gZmlsdGVycy5tYXAoKGlkKSA9PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCBhcyBzdHJpbmcpKSBhcyBIVE1MRWxlbWVudFtdO1xuICB9XG5cbiAgLy8gU2hvdy9yZW1vdmUgZmlsdGVycyB3aGVuIGNob29zZSBldmVudCByZXBvcnQgdHlwZVxuICByZXBvcnRUeXBlU2VsZWN0SFRNTC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdEhUTUwgPSBlLnRhcmdldCBhcyBIVE1MU2VsZWN0RWxlbWVudDtcblxuICAgIGFsbEZpbHRlcnNIVE1MLmZvckVhY2goKGZpbHRlckhUTUwpID0+IGZpbHRlckhUTUwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJykpO1xuICAgIGNvbnN0IHZpc2libGVGaWx0ZXJzID0gZmlsdGVyc01hcFtzZWxlY3RIVE1MLnZhbHVlXSBhcyBIVE1MRWxlbWVudFtdO1xuXG4gICAgdmlzaWJsZUZpbHRlcnMuZm9yRWFjaCgoZmlsdGVySFRNTCkgPT4gZmlsdGVySFRNTC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKSk7XG4gIH0pO1xuXG4gIHRhYmxlTG9hZGVyLmNsaWNrKCk7XG4gIGNsZWFyRmlsdGVyc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBhbGxGaWx0ZXJzSFRNTC5mb3JFYWNoKChmaWx0ZXJIVE1MKSA9PiB7XG4gICAgICBjb25zdCBpbnB1dCA9IGZpbHRlckhUTUwucXVlcnlTZWxlY3RvcignaW5wdXQsIHNlbGVjdCcpIGFzIEhUTUxTZWxlY3RFbGVtZW50IHwgSFRNTElucHV0RWxlbWVudDtcbiAgICAgIGlucHV0LnZhbHVlID0gJyc7XG4gICAgfSk7XG4gICAgc2VhcmNoUXVlcnlIVE1MLnZhbHVlID0gJyc7XG4gICAgc2VhcmNoU2t1SFRNTC52YWx1ZSA9ICcnO1xuICAgIHRhYmxlTG9hZGVyLmNsaWNrKCk7XG4gIH0pO1xuICAvLyBEb3dubG9hZCBjc3YgYnV0dG9uXG4gIGRvd25sb2FkQ1NWQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGZpbHRlcnNRdWVyeVBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgICBhbGxGaWx0ZXJzSFRNTC5mb3JFYWNoKChmaWx0ZXJIVE1MKSA9PiB7XG4gICAgICBjb25zdCBpbnB1dCA9IGZpbHRlckhUTUwucXVlcnlTZWxlY3RvcignaW5wdXQsIHNlbGVjdCcpIGFzIEhUTUxTZWxlY3RFbGVtZW50IHwgSFRNTElucHV0RWxlbWVudDtcbiAgICAgIGZpbHRlcnNRdWVyeVBhcmFtcy5hcHBlbmQoaW5wdXQuZ2V0QXR0cmlidXRlKCduYW1lJyksIGlucHV0LnZhbHVlKTtcbiAgICB9KTtcblxuICAgIGZpbHRlcnNRdWVyeVBhcmFtcy5hcHBlbmQoJ3EnLCBzZWFyY2hRdWVyeUhUTUwudmFsdWUpO1xuICAgIGZpbHRlcnNRdWVyeVBhcmFtcy5hcHBlbmQoJ3JlcG9ydF90eXBlJywgcmVwb3J0VHlwZVNlbGVjdEhUTUwudmFsdWUpO1xuXG4gICAgY29uc3QgY3N2RGF0YSA9IGF3YWl0IGNzdkRvd25sb2FkTWFwW3JlcG9ydFR5cGVTZWxlY3RIVE1MLnZhbHVlXShmaWx0ZXJzUXVlcnlQYXJhbXMpO1xuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbY3N2RGF0YS5qb2luKCdcXG4nKV0sIHsgdHlwZTogJ3RleHQvY3N2JyB9KTtcbiAgICBjb25zdCB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGEuc2V0QXR0cmlidXRlKCdocmVmJywgdXJsKTtcbiAgICBhLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCAncmVwb3J0LmNzdicpO1xuICAgIGEuY2xpY2soKTtcbiAgICBhLnJlbW92ZSgpO1xuICB9KTtcbn0pO1xuIiwiZXhwb3J0IGNvbnN0IGZvcm1hdERhdGUgPSAoZGF0ZTogc3RyaW5nKSA9PiB7XG4gIGlmKCFkYXRlKSB7XG4gICAgcmV0dXJuICdOb25lJztcbiAgfVxuXG4gIGNvbnN0IGNyZWF0ZUF0ID0gbmV3IERhdGUoZGF0ZSk7XG4gIGNvbnN0IHllYXIgPSBjcmVhdGVBdC5nZXRGdWxsWWVhcigpO1xuICBjb25zdCBtb250aCA9IFN0cmluZyhjcmVhdGVBdC5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgJzAnKTsgLy8gTW9udGggaXMgMC1iYXNlZFxuICBjb25zdCBkYXkgPSBTdHJpbmcoY3JlYXRlQXQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCAnMCcpO1xuICBjb25zdCBob3VycyA9IFN0cmluZyhjcmVhdGVBdC5nZXRIb3VycygpKS5wYWRTdGFydCgyLCAnMCcpO1xuICBjb25zdCBtaW51dGVzID0gU3RyaW5nKGNyZWF0ZUF0LmdldE1pbnV0ZXMoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgcmV0dXJuIGAke21vbnRofS8ke2RheX0vJHt5ZWFyfSAke2hvdXJzfToke21pbnV0ZXN9YDtcbn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3JlcG9ydC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==