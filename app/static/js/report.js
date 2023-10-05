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
        'filter-group-category',
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
        'filter-group-category',
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
        'filter-group-category',
    ],
    inbound_order: [
        'filter-start-date',
        'filter-end-date',
        'filter-group-brand',
        'filter-group-premises',
        'filter-group-category',
    ],
    shipping: [
        'division-select',
        'target-group',
        'filter-start-date',
        'filter-end-date',
        'filter-group-brand',
        'filter-group-language',
        'filter-group-category',
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
        'filter-group-category',
        'shelf-life-filter-expire-in',
    ],
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
                csvData = ['action_type,user,created_at,store,event_date_from,event_date_to,sku,product_name',];
                return [4 /*yield*/, fetchReportAPI(queryParams, function (data) {
                        data.reports.forEach(function (report) {
                            report.shipRequest.carts.forEach(function (cart) {
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
                csvData = [
                    'created_at,product_name,sku,username,master_group,group,warehouse,quantity_before,quantity_after,note',
                ];
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
var generateCSVShelfLife = function (queryParams) { return __awaiter(void 0, void 0, void 0, function () {
    var csvData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                csvData = ['ShelfLife, shelfLifeStart, shelfLifeEnd, quantityOrdered, quantityReceived'];
                return [4 /*yield*/, fetchReportAPI(queryParams, function (data) {
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
    'filter-group-category',
    'filter-group-events',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q3ZELENBQUMsQ0FBQztBQVJXLGtCQUFVLGNBUXJCOzs7Ozs7O1VDUkY7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3N0YXRpYy8uL3NyYy9yZXBvcnQudHMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vc3JjL3V0aWxzLnRzIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSVJlcG9ydFJlcXVlc3RTaGFyZVJlc3BvbnNlLFxuICBJRXZlbnRzUmVwb3J0UmVzcG9uc2UsXG4gIElJbnZlbnRvcmllc1JlcG9ydFJlc3BvbnNlLFxuICBJUmVwb3J0QWRqdXN0UmVzcG9uc2UsXG4gIElSZXBvcnRJbmJvdW5kT3JkZXJSZXNwb25zZSxcbiAgSVJlcG9ydFNoaXBwaW5nUmVzcG9uc2UsXG4gIElSZXBvcnRBc3NpZ25SZXNwb25zZSxcbiAgSVJlcG9ydFNoZWxmTGlmZVJlc3BvbnNlLFxufSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IGZvcm1hdERhdGUgfSBmcm9tICcuL3V0aWxzJztcblxuaW50ZXJmYWNlIElGaWx0ZXJNYXAge1xuICBbaW5kZXg6IHN0cmluZ106IHN0cmluZ1tdIHwgSFRNTEVsZW1lbnRbXTtcbn1cblxuaW50ZXJmYWNlIElDU1ZEb3dubG9hZE1hcCB7XG4gIFtpbmRleDogc3RyaW5nXTogKHF1ZXJ5OiBVUkxTZWFyY2hQYXJhbXMpID0+IFByb21pc2U8c3RyaW5nW10+O1xufVxuXG5jb25zdCBmaWx0ZXJzTWFwOiBJRmlsdGVyTWFwID0ge1xuICBldmVudHM6IFsndXNlci1zZWxlY3QnLCAnZmlsdGVyLXN0YXJ0LWRhdGUnLCAnZmlsdGVyLXN0YXJ0LWRhdGUtdG8nLCAnZmlsdGVyLWVuZC1kYXRlJywgJ2ZpbHRlci1lbmQtZGF0ZS10byddLFxuICByZXF1ZXN0X3NoYXJlOiBbJ3VzZXItc2VsZWN0JywgJ2ZpbHRlci1zdGFydC1kYXRlJywgJ2ZpbHRlci1lbmQtZGF0ZSddLFxuICBpbnZlbnRvcmllczogW1xuICAgICd1c2VyLXNlbGVjdCcsXG4gICAgJ2ZpbHRlci1zdGFydC1kYXRlJyxcbiAgICAnZmlsdGVyLWVuZC1kYXRlJyxcbiAgICAnbWFzdGVyLWdyb3VwJyxcbiAgICAndGFyZ2V0LWdyb3VwJyxcbiAgICAnZmlsdGVyLWdyb3VwLWJyYW5kJyxcbiAgICAnZmlsdGVyLWdyb3VwLWxhbmd1YWdlJyxcbiAgICAnZmlsdGVyLWdyb3VwLXByZW1pc2VzJyxcbiAgICAnZmlsdGVyLWdyb3VwLWNhdGVnb3J5JyxcbiAgICAnZmlsdGVyLWdyb3VwLWV2ZW50cycsXG4gIF0sXG4gIGFkanVzdG1lbnQ6IFtcbiAgICAndXNlci1zZWxlY3QnLFxuICAgICdmaWx0ZXItc3RhcnQtZGF0ZScsXG4gICAgJ2ZpbHRlci1lbmQtZGF0ZScsXG4gICAgJ21hc3Rlci1ncm91cCcsXG4gICAgJ3RhcmdldC1ncm91cCcsXG4gICAgJ2ZpbHRlci1ncm91cC1icmFuZCcsXG4gICAgJ2ZpbHRlci1ncm91cC1sYW5ndWFnZScsXG4gICAgJ2ZpbHRlci1ncm91cC1wcmVtaXNlcycsXG4gICAgJ2ZpbHRlci1ncm91cC1jYXRlZ29yeScsXG4gICAgJ2ZpbHRlci1ncm91cC1ldmVudHMnLFxuICBdLFxuICBhc3NpZ246IFtcbiAgICAndXNlci1zZWxlY3QnLFxuICAgICdncm91cC1mcm9tJyxcbiAgICAnZ3JvdXAtdG8nLFxuICAgICdmaWx0ZXItc3RhcnQtZGF0ZScsXG4gICAgJ2ZpbHRlci1lbmQtZGF0ZScsXG4gICAgJ2ZpbHRlci1ncm91cC1icmFuZCcsXG4gICAgJ2ZpbHRlci1ncm91cC1sYW5ndWFnZScsXG4gICAgJ2ZpbHRlci1ncm91cC1wcmVtaXNlcycsXG4gICAgJ2ZpbHRlci1ncm91cC1jYXRlZ29yeScsXG4gIF0sXG4gIGluYm91bmRfb3JkZXI6IFtcbiAgICAnZmlsdGVyLXN0YXJ0LWRhdGUnLFxuICAgICdmaWx0ZXItZW5kLWRhdGUnLFxuICAgICdmaWx0ZXItZ3JvdXAtYnJhbmQnLFxuICAgICdmaWx0ZXItZ3JvdXAtcHJlbWlzZXMnLFxuICAgICdmaWx0ZXItZ3JvdXAtY2F0ZWdvcnknLFxuICBdLFxuICBzaGlwcGluZzogW1xuICAgICdkaXZpc2lvbi1zZWxlY3QnLFxuICAgICd0YXJnZXQtZ3JvdXAnLFxuICAgICdmaWx0ZXItc3RhcnQtZGF0ZScsXG4gICAgJ2ZpbHRlci1lbmQtZGF0ZScsXG4gICAgJ2ZpbHRlci1ncm91cC1icmFuZCcsXG4gICAgJ2ZpbHRlci1ncm91cC1sYW5ndWFnZScsXG4gICAgJ2ZpbHRlci1ncm91cC1jYXRlZ29yeScsXG4gICAgJ2ZpbHRlci1ncm91cC1wcmVtaXNlcycsXG4gIF0sXG4gIHNoZWxmX2xpZmU6IFtcbiAgICAnZmlsdGVyLXN0YXJ0LWRhdGUnLFxuICAgICdmaWx0ZXItZW5kLWRhdGUnLFxuICAgICdtYXN0ZXItZ3JvdXAnLFxuICAgICd0YXJnZXQtZ3JvdXAnLFxuICAgICdmaWx0ZXItZ3JvdXAtYnJhbmQnLFxuICAgICdmaWx0ZXItZ3JvdXAtbGFuZ3VhZ2UnLFxuICAgICdmaWx0ZXItZ3JvdXAtcHJlbWlzZXMnLFxuICAgICdmaWx0ZXItZ3JvdXAtY2F0ZWdvcnknLFxuICAgICdzaGVsZi1saWZlLWZpbHRlci1leHBpcmUtaW4nLFxuICBdLFxufTtcblxuY29uc3QgZmV0Y2hSZXBvcnRBUEkgPSBhc3luYyAocXVlcnlQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcywgY2FsbGJhY2s6IChkYXRhOiBPYmplY3QpID0+IHZvaWQpID0+IHtcbiAgbGV0IHBhZ2VzID0gMTtcblxuICBjb25zdCB1cmxXaXRob3V0UXVlcnlQYXJhbXMgPSBsb2NhdGlvbi5vcmlnaW4gKyBsb2NhdGlvbi5wYXRobmFtZTtcbiAgZm9yIChsZXQgcGFnZSA9IDE7IHBhZ2UgPD0gcGFnZXM7IHBhZ2UrKykge1xuICAgIGNvbnN0IHVybCA9IFtgYXBpP3BhZ2U9JHtwYWdlfWAsIHF1ZXJ5UGFyYW1zLnRvU3RyaW5nKCldLmpvaW4oJyYnKTtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHt1cmxXaXRob3V0UXVlcnlQYXJhbXN9JHt1cmx9YCk7XG4gICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoYXdhaXQgcmVzLmpzb24oKSk7XG5cbiAgICBjYWxsYmFjayhkYXRhKTtcbiAgICBwYWdlcyA9IGRhdGEucGFnaW5hdGlvbi5wYWdlcztcbiAgfVxufTtcblxuY29uc3QgZ2VuZXJhdGVDU1ZFdmVudHMgPSBhc3luYyAocXVlcnlQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcykgPT4ge1xuICBjb25zdCBjc3ZEYXRhID0gWydhY3Rpb25fdHlwZSx1c2VyLGNyZWF0ZWRfYXQsc3RvcmUsZXZlbnRfZGF0ZV9mcm9tLGV2ZW50X2RhdGVfdG8sc2t1LHByb2R1Y3RfbmFtZScsXTtcbiAgYXdhaXQgZmV0Y2hSZXBvcnRBUEkocXVlcnlQYXJhbXMsIChkYXRhOiBJRXZlbnRzUmVwb3J0UmVzcG9uc2UpID0+IHtcbiAgICBkYXRhLnJlcG9ydHMuZm9yRWFjaCgocmVwb3J0KSA9PiB7XG4gICAgICByZXBvcnQuc2hpcFJlcXVlc3QuY2FydHMuZm9yRWFjaCgoY2FydCkgPT4ge1xuICAgICAgICBjc3ZEYXRhLnB1c2goXG4gICAgICAgICAgW1xuICAgICAgICAgICAgcmVwb3J0LnR5cGUsXG4gICAgICAgICAgICByZXBvcnQudXNlci51c2VybmFtZSxcbiAgICAgICAgICAgIHJlcG9ydC5jcmVhdGVkQXQsXG4gICAgICAgICAgICByZXBvcnQuc2hpcFJlcXVlc3Quc3RvcmUuc3RvcmVOYW1lLFxuICAgICAgICAgICAgY2FydC5ldmVudC5kYXRlRnJvbSxcbiAgICAgICAgICAgIGNhcnQuZXZlbnQuZGF0ZVRvLFxuICAgICAgICAgICAgY2FydC5wcm9kdWN0LlNLVSxcbiAgICAgICAgICAgIGNhcnQucHJvZHVjdC5uYW1lLFxuICAgICAgICAgIF0uam9pbignLCcpXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBjc3ZEYXRhO1xufTtcblxuY29uc3QgZ2VuZXJhdGVDU1ZSZXF1ZXN0U2hhcmUgPSBhc3luYyAocXVlcnlQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcykgPT4ge1xuICBjb25zdCBjc3ZEYXRhID0gWydhY3Rpb25fdHlwZSx1c2VyLGNyZWF0ZWRfYXQsY3VycmVudF9zaGFyZV9yZXF1ZXN0X3N0YXR1cyxncm91cCxkZXNpcmVkX3F1YW50aXR5LHNrdSxwcm9kdWN0X25hbWUnXTtcbiAgYXdhaXQgZmV0Y2hSZXBvcnRBUEkocXVlcnlQYXJhbXMsIChkYXRhOiBJUmVwb3J0UmVxdWVzdFNoYXJlUmVzcG9uc2UpID0+IHtcbiAgICBkYXRhLnJlcG9ydHMuZm9yRWFjaCgocmVwb3J0KSA9PiB7XG4gICAgICBjc3ZEYXRhLnB1c2goXG4gICAgICAgIFtcbiAgICAgICAgICByZXBvcnQudHlwZSxcbiAgICAgICAgICByZXBvcnQudXNlci51c2VybmFtZSxcbiAgICAgICAgICByZXBvcnQuY3JlYXRlZEF0LFxuICAgICAgICAgIHJlcG9ydC5yZXF1ZXN0U2hhcmUuc3RhdHVzLFxuICAgICAgICAgIHJlcG9ydC5yZXF1ZXN0U2hhcmUuZ3JvdXAubmFtZSxcbiAgICAgICAgICByZXBvcnQucmVxdWVzdFNoYXJlLmRlc2lyZVF1YW50aXR5LFxuICAgICAgICAgIHJlcG9ydC5yZXF1ZXN0U2hhcmUucHJvZHVjdC5TS1UsXG4gICAgICAgICAgcmVwb3J0LnJlcXVlc3RTaGFyZS5wcm9kdWN0Lm5hbWUsXG4gICAgICAgIF0uam9pbignLCcpXG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGNzdkRhdGE7XG59O1xuXG5jb25zdCBnZW5lcmF0ZUNTVkludmVudG9yaWVzID0gYXN5bmMgKHF1ZXJ5UGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMpID0+IHtcbiAgLy8gQ1NWIEhlYWRlcnNcbiAgY29uc3QgY3N2RGF0YSA9IFsnY3JlYXRlZF9hdCxzdG9yZV9uYW1lLHR5cGUsdXNlcm5hbWUscXR5X2JlZm9yZSxxdHlfYWZ0ZXIsc2t1LHByb2R1Y3RfbmFtZSddO1xuICBhd2FpdCBmZXRjaFJlcG9ydEFQSShxdWVyeVBhcmFtcywgKGRhdGE6IElJbnZlbnRvcmllc1JlcG9ydFJlc3BvbnNlKSA9PiB7XG4gICAgZGF0YS5yZXBvcnRzLmZvckVhY2goKHJlcG9ydCkgPT4ge1xuICAgICAgbGV0IHJlcG9ydFRhcmdldDogc3RyaW5nO1xuICAgICAgaWYgKHJlcG9ydC5zdG9yZSkge1xuICAgICAgICByZXBvcnRUYXJnZXQgPSByZXBvcnQuc3RvcmUuc3RvcmVOYW1lO1xuICAgICAgfSBlbHNlIGlmIChyZXBvcnQud2FyZWhvdXNlKSB7XG4gICAgICAgIHJlcG9ydFRhcmdldCA9IHJlcG9ydC53YXJlaG91c2UubmFtZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcG9ydFRhcmdldCA9ICdJbnRlcm5hbCBhY3Rpb24nO1xuICAgICAgfVxuXG4gICAgICByZXBvcnQucmVwb3J0SW52ZW50b3JpZXMuZm9yRWFjaCgoaW52ZW50b3J5KSA9PiB7XG4gICAgICAgIGNzdkRhdGEucHVzaChcbiAgICAgICAgICBbXG4gICAgICAgICAgICBmb3JtYXREYXRlKHJlcG9ydC5jcmVhdGVkQXQpLFxuICAgICAgICAgICAgcmVwb3J0VGFyZ2V0LFxuICAgICAgICAgICAgcmVwb3J0LnR5cGUsXG4gICAgICAgICAgICByZXBvcnQudXNlci51c2VybmFtZSxcbiAgICAgICAgICAgIGludmVudG9yeS5xdHlCZWZvcmUudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIGludmVudG9yeS5xdHlBZnRlci50b1N0cmluZygpLFxuICAgICAgICAgICAgaW52ZW50b3J5LnByb2R1Y3QuU0tVLFxuICAgICAgICAgICAgaW52ZW50b3J5LnByb2R1Y3QubmFtZSxcbiAgICAgICAgICBdLmpvaW4oJywnKVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gY3N2RGF0YTtcbn07XG5cbmNvbnN0IGdlbmVyYXRlQ1NWQWRqdXN0bWVudHMgPSBhc3luYyAocXVlcnlQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcykgPT4ge1xuICAvLyBDU1YgSGVhZGVyc1xuICBjb25zdCBjc3ZEYXRhID0gW1xuICAgICdjcmVhdGVkX2F0LHByb2R1Y3RfbmFtZSxza3UsdXNlcm5hbWUsbWFzdGVyX2dyb3VwLGdyb3VwLHdhcmVob3VzZSxxdWFudGl0eV9iZWZvcmUscXVhbnRpdHlfYWZ0ZXIsbm90ZScsXG4gIF07XG4gIGF3YWl0IGZldGNoUmVwb3J0QVBJKHF1ZXJ5UGFyYW1zLCAoZGF0YTogSVJlcG9ydEFkanVzdFJlc3BvbnNlKSA9PiB7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgZGF0YS5yZXBvcnRzLmZvckVhY2goKGFkanVzdCkgPT4ge1xuICAgICAgYWRqdXN0LmFkanVzdEdyb3VwUXR5LmZvckVhY2goKHJlcG9ydEFkanVzdCkgPT4ge1xuICAgICAgICBjc3ZEYXRhLnB1c2goXG4gICAgICAgICAgW1xuICAgICAgICAgICAgZm9ybWF0RGF0ZShhZGp1c3QuY3JlYXRlZEF0KSxcbiAgICAgICAgICAgIGFkanVzdC5wcm9kdWN0Lm5hbWUsXG4gICAgICAgICAgICBhZGp1c3QucHJvZHVjdC5TS1UsXG4gICAgICAgICAgICBhZGp1c3QudXNlci51c2VybmFtZSxcbiAgICAgICAgICAgIHJlcG9ydEFkanVzdC5ncm91cC5tYXN0ZXJHcm91cC5uYW1lLFxuICAgICAgICAgICAgcmVwb3J0QWRqdXN0Lmdyb3VwLm5hbWUsXG4gICAgICAgICAgICByZXBvcnRBZGp1c3Qud2FyZWhvdXNlLm5hbWUsXG4gICAgICAgICAgICByZXBvcnRBZGp1c3QucXVhbnRpdHlCZWZvcmUsXG4gICAgICAgICAgICByZXBvcnRBZGp1c3QucXVhbnRpdHlBZnRlcixcbiAgICAgICAgICAgIGFkanVzdC5ub3RlLFxuICAgICAgICAgIF0uam9pbignLCcpXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBjc3ZEYXRhO1xufTtcblxuY29uc3QgZ2VuZXJhdGVDU1ZJbmJvdW5kT3JkZXIgPSBhc3luYyAocXVlcnlQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcykgPT4ge1xuICBjb25zdCBjc3ZEYXRhID0gWydjcmVhdGVkX2F0LHVzZXJuYW1lLHR5cGUsb3JkZXJfdGl0bGUsYWxsb2NhdGVkX3Byb2R1Y3Qsc2t1LGdyb3VwLHF1YW50aXR5J107XG4gIGF3YWl0IGZldGNoUmVwb3J0QVBJKHF1ZXJ5UGFyYW1zLCAoZGF0YTogSVJlcG9ydEluYm91bmRPcmRlclJlc3BvbnNlKSA9PiB7XG4gICAgZGF0YS5yZXBvcnRzLmZvckVhY2goKHJlcG9ydCkgPT4ge1xuICAgICAgcmVwb3J0LmluYm91bmRPcmRlci5wcm9kdWN0c0FsbG9jYXRlZC5mb3JFYWNoKChwcm9kdWN0c0FsbG9jYXRlZCkgPT4ge1xuICAgICAgICBwcm9kdWN0c0FsbG9jYXRlZC5wcm9kdWN0UXVhbnRpdHlHcm91cHMuZm9yRWFjaCgocHJvZHVjdFF1YW50aXR5R3JvdXApID0+IHtcbiAgICAgICAgICBjc3ZEYXRhLnB1c2goXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIGZvcm1hdERhdGUocmVwb3J0LmNyZWF0ZWRBdCksXG4gICAgICAgICAgICAgIHJlcG9ydC51c2VyLnVzZXJuYW1lLFxuICAgICAgICAgICAgICByZXBvcnQudHlwZSxcbiAgICAgICAgICAgICAgcmVwb3J0LmluYm91bmRPcmRlci50aXRsZSxcbiAgICAgICAgICAgICAgcHJvZHVjdHNBbGxvY2F0ZWQucHJvZHVjdC5uYW1lLFxuICAgICAgICAgICAgICBwcm9kdWN0c0FsbG9jYXRlZC5wcm9kdWN0LlNLVSxcbiAgICAgICAgICAgICAgcHJvZHVjdFF1YW50aXR5R3JvdXAuZ3JvdXAubmFtZSxcbiAgICAgICAgICAgICAgcHJvZHVjdFF1YW50aXR5R3JvdXAucXVhbnRpdHksXG4gICAgICAgICAgICBdLmpvaW4oJywnKVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXByb2R1Y3RzQWxsb2NhdGVkLnByb2R1Y3RRdWFudGl0eUdyb3Vwcy5sZW5ndGgpIHtcbiAgICAgICAgICBjc3ZEYXRhLnB1c2goXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIGZvcm1hdERhdGUocmVwb3J0LmNyZWF0ZWRBdCksXG4gICAgICAgICAgICAgIHJlcG9ydC51c2VyLnVzZXJuYW1lLFxuICAgICAgICAgICAgICByZXBvcnQudHlwZSxcbiAgICAgICAgICAgICAgcmVwb3J0LmluYm91bmRPcmRlci50aXRsZSxcbiAgICAgICAgICAgICAgcHJvZHVjdHNBbGxvY2F0ZWQucHJvZHVjdC5uYW1lLFxuICAgICAgICAgICAgICBwcm9kdWN0c0FsbG9jYXRlZC5wcm9kdWN0LlNLVSxcbiAgICAgICAgICAgIF0uam9pbignLCcpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gY3N2RGF0YTtcbn07XG5cbmNvbnN0IGdlbmVyYXRlQ1NWU2hpcHBpbmcgPSBhc3luYyAocXVlcnlQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcykgPT4ge1xuICAvLyBDU1YgSGVhZGVyc1xuICBjb25zdCBjc3ZEYXRhID0gW1xuICAgICdhY3Rpb25fdHlwZSx1c2VyLGNyZWF0ZWRfYXQsY3VycmVudF9zaGlwX3JlcXVlc3Rfc3RhdHVzLHN0b3JlX25hbWUsc2t1LHByb2R1Y3RfbmFtZSxncm91cCxxdWFudGl0eScsXG4gIF07XG4gIGF3YWl0IGZldGNoUmVwb3J0QVBJKHF1ZXJ5UGFyYW1zLCAoZGF0YTogSVJlcG9ydFNoaXBwaW5nUmVzcG9uc2UpID0+IHtcbiAgICBkYXRhLnJlcG9ydHMuZm9yRWFjaCgocmVwb3J0KSA9PiB7XG4gICAgICByZXBvcnQuc2hpcFJlcXVlc3QuY2FydHMuZm9yRWFjaCgoY2FydCkgPT4ge1xuICAgICAgICBjc3ZEYXRhLnB1c2goXG4gICAgICAgICAgW1xuICAgICAgICAgICAgcmVwb3J0LnR5cGUsXG4gICAgICAgICAgICByZXBvcnQudXNlci51c2VybmFtZSxcbiAgICAgICAgICAgIHJlcG9ydC5jcmVhdGVkQXQsXG4gICAgICAgICAgICByZXBvcnQuc2hpcFJlcXVlc3Quc3RhdHVzLFxuICAgICAgICAgICAgcmVwb3J0LnNoaXBSZXF1ZXN0LnN0b3JlLnN0b3JlTmFtZSxcbiAgICAgICAgICAgIGNhcnQucHJvZHVjdC5TS1UsXG4gICAgICAgICAgICBjYXJ0LnByb2R1Y3QubmFtZSxcbiAgICAgICAgICAgIGNhcnQuZ3JvdXAubmFtZSxcbiAgICAgICAgICAgIGNhcnQucXVhbnRpdHksXG4gICAgICAgICAgXS5qb2luKCcsJylcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gY3N2RGF0YTtcbn07XG5cbmNvbnN0IGdlbmVyYXRlQ1NWQXNzaWduID0gYXN5bmMgKHF1ZXJ5UGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMpID0+IHtcbiAgLy8gQ1NWIEhlYWRlcnNcbiAgY29uc3QgY3N2RGF0YSA9IFsnY3JlYXRlZF9hdCx1c2VybmFtZSx0eXBlLGZyb21fZ3JvdXAsdG9fZ3JvdXAsc2t1LHByb2R1Y3RfbmFtZSxxdWFudGl0eSddO1xuXG4gIGF3YWl0IGZldGNoUmVwb3J0QVBJKHF1ZXJ5UGFyYW1zLCAoZGF0YTogSVJlcG9ydEFzc2lnblJlc3BvbnNlKSA9PiB7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgZGF0YS5yZXBvcnRzLmZvckVhY2goKHJlcG9ydCkgPT4ge1xuICAgICAgY3N2RGF0YS5wdXNoKFxuICAgICAgICBbXG4gICAgICAgICAgZm9ybWF0RGF0ZShyZXBvcnQuY3JlYXRlZEF0KSxcbiAgICAgICAgICByZXBvcnQudXNlci51c2VybmFtZSxcbiAgICAgICAgICByZXBvcnQudHlwZSxcbiAgICAgICAgICByZXBvcnQuZnJvbUdyb3VwLm5hbWUsXG4gICAgICAgICAgcmVwb3J0Lmdyb3VwLm5hbWUsXG4gICAgICAgICAgcmVwb3J0LnByb2R1Y3QuU0tVLFxuICAgICAgICAgIHJlcG9ydC5wcm9kdWN0Lm5hbWUsXG4gICAgICAgICAgcmVwb3J0LnF1YW50aXR5LFxuICAgICAgICBdLmpvaW4oJywnKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBjc3ZEYXRhO1xufTtcblxuY29uc3QgZ2VuZXJhdGVDU1ZTaGVsZkxpZmUgPSBhc3luYyAocXVlcnlQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcykgPT4ge1xuICAvLyBDU1YgSGVhZGVyc1xuICBjb25zdCBjc3ZEYXRhID0gWydTaGVsZkxpZmUsIHNoZWxmTGlmZVN0YXJ0LCBzaGVsZkxpZmVFbmQsIHF1YW50aXR5T3JkZXJlZCwgcXVhbnRpdHlSZWNlaXZlZCddO1xuXG4gIGF3YWl0IGZldGNoUmVwb3J0QVBJKHF1ZXJ5UGFyYW1zLCAoZGF0YTogSVJlcG9ydFNoZWxmTGlmZVJlc3BvbnNlKSA9PiB7XG4gICAgZGF0YS5yZXBvcnRTaGVsZkxpZmVMaXN0LmZvckVhY2goKHJlcG9ydCkgPT4ge1xuICAgICAgbGV0IHJlY2VpdmVkO1xuICAgICAgaWYgKCFyZXBvcnQucXVhbnRpdHlSZWNlaXZlZCkge1xuICAgICAgICByZWNlaXZlZCA9ICctJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlY2VpdmVkID0gcmVwb3J0LnF1YW50aXR5UmVjZWl2ZWQudG9TdHJpbmcoKTtcbiAgICAgIH1cblxuICAgICAgY3N2RGF0YS5wdXNoKFxuICAgICAgICBbXG4gICAgICAgICAgcmVwb3J0LnByb2R1Y3QuU0tVLFxuICAgICAgICAgIGZvcm1hdERhdGUocmVwb3J0LnNoZWxmTGlmZVN0YXJ0KSxcbiAgICAgICAgICBmb3JtYXREYXRlKHJlcG9ydC5zaGVsZkxpZmVTdGFydCksXG4gICAgICAgICAgcmVwb3J0LnF1YW50aXR5LFxuICAgICAgICAgIHJlY2VpdmVkLFxuICAgICAgICBdLmpvaW4oJywnKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBjc3ZEYXRhO1xufTtcblxuY29uc3QgY3N2RG93bmxvYWRNYXA6IElDU1ZEb3dubG9hZE1hcCA9IHtcbiAgZXZlbnRzOiBnZW5lcmF0ZUNTVkV2ZW50cyxcbiAgcmVxdWVzdF9zaGFyZTogZ2VuZXJhdGVDU1ZSZXF1ZXN0U2hhcmUsXG4gIGludmVudG9yaWVzOiBnZW5lcmF0ZUNTVkludmVudG9yaWVzLFxuICBhZGp1c3RtZW50OiBnZW5lcmF0ZUNTVkFkanVzdG1lbnRzLFxuICBhc3NpZ246IGdlbmVyYXRlQ1NWQXNzaWduLFxuICBpbmJvdW5kX29yZGVyOiBnZW5lcmF0ZUNTVkluYm91bmRPcmRlcixcbiAgc2hpcHBpbmc6IGdlbmVyYXRlQ1NWU2hpcHBpbmcsXG4gIHNoZWxmX2xpZmU6IGdlbmVyYXRlQ1NWU2hlbGZMaWZlLFxufTtcblxuY29uc3QgZmlsdGVyc0lkcyA9IFtcbiAgJ3JlcXVlc3Qtc2hhcmUtdHlwZScsXG4gICdzaGlwcGluZy10eXBlJyxcbiAgJ3VzZXItc2VsZWN0JyxcbiAgJ2ZpbHRlci1zdGFydC1kYXRlJyxcbiAgJ2ZpbHRlci1zdGFydC1kYXRlLXRvJyxcbiAgJ2ZpbHRlci1lbmQtZGF0ZScsXG4gICdmaWx0ZXItZW5kLWRhdGUtdG8nLFxuICAnbWFzdGVyLWdyb3VwJyxcbiAgJ3RhcmdldC1ncm91cCcsXG4gICdmaWx0ZXItZ3JvdXAtYnJhbmQnLFxuICAnZmlsdGVyLWdyb3VwLWxhbmd1YWdlJyxcbiAgJ2ZpbHRlci1ncm91cC1wcmVtaXNlcycsXG4gICdmaWx0ZXItZ3JvdXAtY2F0ZWdvcnknLFxuICAnZmlsdGVyLWdyb3VwLWV2ZW50cycsXG4gICdncm91cC1mcm9tJyxcbiAgJ2dyb3VwLXRvJyxcbiAgJ2RpdmlzaW9uLXNlbGVjdCcsXG4gICdzaGVsZi1saWZlLWZpbHRlci1leHBpcmUtaW4nLFxuXTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgLy8gRE9NIG5vZGVzXG4gIGNvbnN0IHJlcG9ydFR5cGVTZWxlY3RIVE1MID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlcG9ydC10eXBlLXNlbGVjdCcpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xuICBjb25zdCBhbGxGaWx0ZXJzSFRNTCA9IGZpbHRlcnNJZHMubWFwKChpZCkgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpKTtcbiAgY29uc3QgdGFibGVMb2FkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFibGUtcmVwb3J0LWxvYWRlcicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuICBjb25zdCBjbGVhckZpbHRlcnNCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsdGVyLWNsZWFyLWJ1dHRvbicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuICBjb25zdCBzZWFyY2hRdWVyeUhUTUwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoLXF1ZXJ5JykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgY29uc3QgZG93bmxvYWRDU1ZCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnV0dG9uLWNzdi1kb3dubG9hZCcpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuXG4gIGZvciAoY29uc3QgW3JlcG9ydFR5cGUsIGZpbHRlcnNdIG9mIE9iamVjdC5lbnRyaWVzKGZpbHRlcnNNYXApKSB7XG4gICAgZmlsdGVyc01hcFtyZXBvcnRUeXBlXSA9IGZpbHRlcnMubWFwKChpZCkgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQgYXMgc3RyaW5nKSkgYXMgSFRNTEVsZW1lbnRbXTtcbiAgfVxuXG4gIC8vIFNob3cvcmVtb3ZlIGZpbHRlcnMgd2hlbiBjaG9vc2UgZXZlbnQgcmVwb3J0IHR5cGVcbiAgcmVwb3J0VHlwZVNlbGVjdEhUTUwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcbiAgICBjb25zdCBzZWxlY3RIVE1MID0gZS50YXJnZXQgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XG5cbiAgICBhbGxGaWx0ZXJzSFRNTC5mb3JFYWNoKChmaWx0ZXJIVE1MKSA9PiBmaWx0ZXJIVE1MLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpKTtcbiAgICBjb25zdCB2aXNpYmxlRmlsdGVycyA9IGZpbHRlcnNNYXBbc2VsZWN0SFRNTC52YWx1ZV0gYXMgSFRNTEVsZW1lbnRbXTtcblxuICAgIHZpc2libGVGaWx0ZXJzLmZvckVhY2goKGZpbHRlckhUTUwpID0+IGZpbHRlckhUTUwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJykpO1xuICB9KTtcblxuICB0YWJsZUxvYWRlci5jbGljaygpO1xuICBjbGVhckZpbHRlcnNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgYWxsRmlsdGVyc0hUTUwuZm9yRWFjaCgoZmlsdGVySFRNTCkgPT4ge1xuICAgICAgY29uc3QgaW5wdXQgPSBmaWx0ZXJIVE1MLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LCBzZWxlY3QnKSBhcyBIVE1MU2VsZWN0RWxlbWVudCB8IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICBpbnB1dC52YWx1ZSA9ICcnO1xuICAgIH0pO1xuICAgIHNlYXJjaFF1ZXJ5SFRNTC52YWx1ZSA9ICcnO1xuICAgIHRhYmxlTG9hZGVyLmNsaWNrKCk7XG4gIH0pO1xuICAvLyBEb3dubG9hZCBjc3YgYnV0dG9uXG4gIGRvd25sb2FkQ1NWQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGZpbHRlcnNRdWVyeVBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgICBhbGxGaWx0ZXJzSFRNTC5mb3JFYWNoKChmaWx0ZXJIVE1MKSA9PiB7XG4gICAgICBjb25zdCBpbnB1dCA9IGZpbHRlckhUTUwucXVlcnlTZWxlY3RvcignaW5wdXQsIHNlbGVjdCcpIGFzIEhUTUxTZWxlY3RFbGVtZW50IHwgSFRNTElucHV0RWxlbWVudDtcbiAgICAgIGZpbHRlcnNRdWVyeVBhcmFtcy5hcHBlbmQoaW5wdXQuZ2V0QXR0cmlidXRlKCduYW1lJyksIGlucHV0LnZhbHVlKTtcbiAgICB9KTtcblxuICAgIGZpbHRlcnNRdWVyeVBhcmFtcy5hcHBlbmQoJ3EnLCBzZWFyY2hRdWVyeUhUTUwudmFsdWUpO1xuICAgIGZpbHRlcnNRdWVyeVBhcmFtcy5hcHBlbmQoJ3JlcG9ydF90eXBlJywgcmVwb3J0VHlwZVNlbGVjdEhUTUwudmFsdWUpO1xuXG4gICAgY29uc3QgY3N2RGF0YSA9IGF3YWl0IGNzdkRvd25sb2FkTWFwW3JlcG9ydFR5cGVTZWxlY3RIVE1MLnZhbHVlXShmaWx0ZXJzUXVlcnlQYXJhbXMpO1xuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbY3N2RGF0YS5qb2luKCdcXG4nKV0sIHsgdHlwZTogJ3RleHQvY3N2JyB9KTtcbiAgICBjb25zdCB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGEuc2V0QXR0cmlidXRlKCdocmVmJywgdXJsKTtcbiAgICBhLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCAncmVwb3J0LmNzdicpO1xuICAgIGEuY2xpY2soKTtcbiAgICBhLnJlbW92ZSgpO1xuICB9KTtcbn0pO1xuIiwiZXhwb3J0IGNvbnN0IGZvcm1hdERhdGUgPSAoZGF0ZTogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IGNyZWF0ZUF0ID0gbmV3IERhdGUoZGF0ZSk7XG4gIGNvbnN0IHllYXIgPSBjcmVhdGVBdC5nZXRGdWxsWWVhcigpO1xuICBjb25zdCBtb250aCA9IFN0cmluZyhjcmVhdGVBdC5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgJzAnKTsgLy8gTW9udGggaXMgMC1iYXNlZFxuICBjb25zdCBkYXkgPSBTdHJpbmcoY3JlYXRlQXQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCAnMCcpO1xuICBjb25zdCBob3VycyA9IFN0cmluZyhjcmVhdGVBdC5nZXRIb3VycygpKS5wYWRTdGFydCgyLCAnMCcpO1xuICBjb25zdCBtaW51dGVzID0gU3RyaW5nKGNyZWF0ZUF0LmdldE1pbnV0ZXMoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgcmV0dXJuIGAke21vbnRofS8ke2RheX0vJHt5ZWFyfSAke2hvdXJzfToke21pbnV0ZXN9YDtcbn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3JlcG9ydC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==