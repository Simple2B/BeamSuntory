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
        'filter-product-group',
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
                csvData = ['action_type,user,created_at,current_share_request_status,group_from,group_to,desired_quantity,sku,product_name'];
                return [4 /*yield*/, fetchReportAPI(queryParams, function (data) {
                        data.reports.forEach(function (report) {
                            console.log(report.requestShare);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMvRCxPQUFPLFVBQUcsS0FBSyxjQUFJLEdBQUcsY0FBSSxJQUFJLGNBQUksS0FBSyxjQUFJLE9BQU8sQ0FBRSxDQUFDO0FBQ3ZELENBQUMsQ0FBQztBQVJXLGtCQUFVLGNBUXJCOzs7Ozs7O1VDUkY7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3N0YXRpYy8uL3NyYy9yZXBvcnQudHMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vc3JjL3V0aWxzLnRzIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSVJlcG9ydFJlcXVlc3RTaGFyZVJlc3BvbnNlLFxuICBJRXZlbnRzUmVwb3J0UmVzcG9uc2UsXG4gIElJbnZlbnRvcmllc1JlcG9ydFJlc3BvbnNlLFxuICBJUmVwb3J0QWRqdXN0UmVzcG9uc2UsXG4gIElSZXBvcnRJbmJvdW5kT3JkZXJSZXNwb25zZSxcbiAgSVJlcG9ydFNoaXBwaW5nUmVzcG9uc2UsXG4gIElSZXBvcnRBc3NpZ25SZXNwb25zZSxcbiAgSVJlcG9ydFNoZWxmTGlmZVJlc3BvbnNlLFxufSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IGZvcm1hdERhdGUgfSBmcm9tICcuL3V0aWxzJztcblxuaW50ZXJmYWNlIElGaWx0ZXJNYXAge1xuICBbaW5kZXg6IHN0cmluZ106IHN0cmluZ1tdIHwgSFRNTEVsZW1lbnRbXTtcbn1cblxuaW50ZXJmYWNlIElDU1ZEb3dubG9hZE1hcCB7XG4gIFtpbmRleDogc3RyaW5nXTogKHF1ZXJ5OiBVUkxTZWFyY2hQYXJhbXMpID0+IFByb21pc2U8c3RyaW5nW10+O1xufVxuXG5jb25zdCBmaWx0ZXJzTWFwOiBJRmlsdGVyTWFwID0ge1xuICBldmVudHM6IFsndXNlci1zZWxlY3QnLCAnZmlsdGVyLXN0YXJ0LWRhdGUnLCAnZmlsdGVyLXN0YXJ0LWRhdGUtdG8nLCAnZmlsdGVyLWVuZC1kYXRlJywgJ2ZpbHRlci1lbmQtZGF0ZS10byddLFxuICByZXF1ZXN0X3NoYXJlOiBbJ3VzZXItc2VsZWN0JywgJ2ZpbHRlci1zdGFydC1kYXRlJywgJ2ZpbHRlci1lbmQtZGF0ZSddLFxuICBpbnZlbnRvcmllczogW1xuICAgICd1c2VyLXNlbGVjdCcsXG4gICAgJ2ZpbHRlci1zdGFydC1kYXRlJyxcbiAgICAnZmlsdGVyLWVuZC1kYXRlJyxcbiAgICAnbWFzdGVyLWdyb3VwJyxcbiAgICAndGFyZ2V0LWdyb3VwJyxcbiAgICAnZmlsdGVyLWdyb3VwLWJyYW5kJyxcbiAgICAnZmlsdGVyLWdyb3VwLWxhbmd1YWdlJyxcbiAgICAnZmlsdGVyLWdyb3VwLXByZW1pc2VzJyxcbiAgICAnZmlsdGVyLWdyb3VwLWNhdGVnb3J5JyxcbiAgICAnZmlsdGVyLWdyb3VwLWV2ZW50cycsXG4gIF0sXG4gIGFkanVzdG1lbnQ6IFtcbiAgICAndXNlci1zZWxlY3QnLFxuICAgICdmaWx0ZXItc3RhcnQtZGF0ZScsXG4gICAgJ2ZpbHRlci1lbmQtZGF0ZScsXG4gICAgJ21hc3Rlci1ncm91cCcsXG4gICAgJ3RhcmdldC1ncm91cCcsXG4gICAgJ2ZpbHRlci1ncm91cC1icmFuZCcsXG4gICAgJ2ZpbHRlci1ncm91cC1sYW5ndWFnZScsXG4gICAgJ2ZpbHRlci1ncm91cC1wcmVtaXNlcycsXG4gICAgJ2ZpbHRlci1ncm91cC1jYXRlZ29yeScsXG4gICAgJ2ZpbHRlci1ncm91cC1ldmVudHMnLFxuICBdLFxuICBhc3NpZ246IFtcbiAgICAndXNlci1zZWxlY3QnLFxuICAgICdncm91cC1mcm9tJyxcbiAgICAnZ3JvdXAtdG8nLFxuICAgICdmaWx0ZXItc3RhcnQtZGF0ZScsXG4gICAgJ2ZpbHRlci1lbmQtZGF0ZScsXG4gICAgJ2ZpbHRlci1ncm91cC1icmFuZCcsXG4gICAgJ2ZpbHRlci1ncm91cC1sYW5ndWFnZScsXG4gICAgJ2ZpbHRlci1ncm91cC1wcmVtaXNlcycsXG4gICAgJ2ZpbHRlci1ncm91cC1jYXRlZ29yeScsXG4gIF0sXG4gIGluYm91bmRfb3JkZXI6IFtcbiAgICAnZmlsdGVyLXN0YXJ0LWRhdGUnLFxuICAgICdmaWx0ZXItZW5kLWRhdGUnLFxuICAgICdmaWx0ZXItZ3JvdXAtYnJhbmQnLFxuICAgICdmaWx0ZXItZ3JvdXAtcHJlbWlzZXMnLFxuICAgICdmaWx0ZXItZ3JvdXAtY2F0ZWdvcnknLFxuICAgICdmaWx0ZXItcHJvZHVjdC1ncm91cCcsXG4gIF0sXG4gIHNoaXBwaW5nOiBbXG4gICAgJ2RpdmlzaW9uLXNlbGVjdCcsXG4gICAgJ3RhcmdldC1ncm91cCcsXG4gICAgJ2ZpbHRlci1zdGFydC1kYXRlJyxcbiAgICAnZmlsdGVyLWVuZC1kYXRlJyxcbiAgICAnZmlsdGVyLWdyb3VwLWJyYW5kJyxcbiAgICAnZmlsdGVyLWdyb3VwLWxhbmd1YWdlJyxcbiAgICAnZmlsdGVyLWdyb3VwLWNhdGVnb3J5JyxcbiAgICAnZmlsdGVyLWdyb3VwLXByZW1pc2VzJyxcbiAgXSxcbiAgc2hlbGZfbGlmZTogW1xuICAgICdmaWx0ZXItc3RhcnQtZGF0ZScsXG4gICAgJ2ZpbHRlci1lbmQtZGF0ZScsXG4gICAgJ21hc3Rlci1ncm91cCcsXG4gICAgJ3RhcmdldC1ncm91cCcsXG4gICAgJ2ZpbHRlci1ncm91cC1icmFuZCcsXG4gICAgJ2ZpbHRlci1ncm91cC1sYW5ndWFnZScsXG4gICAgJ2ZpbHRlci1ncm91cC1wcmVtaXNlcycsXG4gICAgJ2ZpbHRlci1ncm91cC1jYXRlZ29yeScsXG4gICAgJ3NoZWxmLWxpZmUtZmlsdGVyLWV4cGlyZS1pbicsXG4gIF0sXG59O1xuXG5jb25zdCBmZXRjaFJlcG9ydEFQSSA9IGFzeW5jIChxdWVyeVBhcmFtczogVVJMU2VhcmNoUGFyYW1zLCBjYWxsYmFjazogKGRhdGE6IE9iamVjdCkgPT4gdm9pZCkgPT4ge1xuICBsZXQgcGFnZXMgPSAxO1xuXG4gIGNvbnN0IHVybFdpdGhvdXRRdWVyeVBhcmFtcyA9IGxvY2F0aW9uLm9yaWdpbiArIGxvY2F0aW9uLnBhdGhuYW1lO1xuICBmb3IgKGxldCBwYWdlID0gMTsgcGFnZSA8PSBwYWdlczsgcGFnZSsrKSB7XG4gICAgY29uc3QgdXJsID0gW2BhcGk/cGFnZT0ke3BhZ2V9YCwgcXVlcnlQYXJhbXMudG9TdHJpbmcoKV0uam9pbignJicpO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke3VybFdpdGhvdXRRdWVyeVBhcmFtc30ke3VybH1gKTtcbiAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShhd2FpdCByZXMuanNvbigpKTtcblxuICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgIHBhZ2VzID0gZGF0YS5wYWdpbmF0aW9uLnBhZ2VzO1xuICB9XG59O1xuXG5jb25zdCBnZW5lcmF0ZUNTVkV2ZW50cyA9IGFzeW5jIChxdWVyeVBhcmFtczogVVJMU2VhcmNoUGFyYW1zKSA9PiB7XG4gIGNvbnN0IGNzdkRhdGEgPSBbJ2FjdGlvbl90eXBlLHVzZXIsY3JlYXRlZF9hdCxzdG9yZSxldmVudF9kYXRlX2Zyb20sZXZlbnRfZGF0ZV90byxza3UscHJvZHVjdF9uYW1lJyxdO1xuICBhd2FpdCBmZXRjaFJlcG9ydEFQSShxdWVyeVBhcmFtcywgKGRhdGE6IElFdmVudHNSZXBvcnRSZXNwb25zZSkgPT4ge1xuICAgIGRhdGEucmVwb3J0cy5mb3JFYWNoKChyZXBvcnQpID0+IHtcbiAgICAgIHJlcG9ydC5zaGlwUmVxdWVzdC5jYXJ0cy5mb3JFYWNoKChjYXJ0KSA9PiB7XG4gICAgICAgIGNzdkRhdGEucHVzaChcbiAgICAgICAgICBbXG4gICAgICAgICAgICByZXBvcnQudHlwZSxcbiAgICAgICAgICAgIHJlcG9ydC51c2VyLnVzZXJuYW1lLFxuICAgICAgICAgICAgcmVwb3J0LmNyZWF0ZWRBdCxcbiAgICAgICAgICAgIHJlcG9ydC5zaGlwUmVxdWVzdC5zdG9yZS5zdG9yZU5hbWUsXG4gICAgICAgICAgICBjYXJ0LmV2ZW50LmRhdGVGcm9tLFxuICAgICAgICAgICAgY2FydC5ldmVudC5kYXRlVG8sXG4gICAgICAgICAgICBjYXJ0LnByb2R1Y3QuU0tVLFxuICAgICAgICAgICAgY2FydC5wcm9kdWN0Lm5hbWUsXG4gICAgICAgICAgXS5qb2luKCcsJylcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGNzdkRhdGE7XG59O1xuXG5jb25zdCBnZW5lcmF0ZUNTVlJlcXVlc3RTaGFyZSA9IGFzeW5jIChxdWVyeVBhcmFtczogVVJMU2VhcmNoUGFyYW1zKSA9PiB7XG4gIGNvbnN0IGNzdkRhdGEgPSBbJ2FjdGlvbl90eXBlLHVzZXIsY3JlYXRlZF9hdCxjdXJyZW50X3NoYXJlX3JlcXVlc3Rfc3RhdHVzLGdyb3VwX2Zyb20sZ3JvdXBfdG8sZGVzaXJlZF9xdWFudGl0eSxza3UscHJvZHVjdF9uYW1lJ107XG4gIGF3YWl0IGZldGNoUmVwb3J0QVBJKHF1ZXJ5UGFyYW1zLCAoZGF0YTogSVJlcG9ydFJlcXVlc3RTaGFyZVJlc3BvbnNlKSA9PiB7XG4gICAgZGF0YS5yZXBvcnRzLmZvckVhY2goKHJlcG9ydCkgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVwb3J0LnJlcXVlc3RTaGFyZSlcbiAgICAgIGNzdkRhdGEucHVzaChcbiAgICAgICAgW1xuICAgICAgICAgIHJlcG9ydC50eXBlLFxuICAgICAgICAgIHJlcG9ydC51c2VyLnVzZXJuYW1lLFxuICAgICAgICAgIHJlcG9ydC5jcmVhdGVkQXQsXG4gICAgICAgICAgcmVwb3J0LnJlcXVlc3RTaGFyZS5zdGF0dXMsXG4gICAgICAgICAgcmVwb3J0LnJlcXVlc3RTaGFyZS5mcm9tR3JvdXAubmFtZSxcbiAgICAgICAgICByZXBvcnQucmVxdWVzdFNoYXJlLmdyb3VwLm5hbWUsXG4gICAgICAgICAgcmVwb3J0LnJlcXVlc3RTaGFyZS5kZXNpcmVRdWFudGl0eSxcbiAgICAgICAgICByZXBvcnQucmVxdWVzdFNoYXJlLnByb2R1Y3QuU0tVLFxuICAgICAgICAgIHJlcG9ydC5yZXF1ZXN0U2hhcmUucHJvZHVjdC5uYW1lLFxuICAgICAgICBdLmpvaW4oJywnKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBjc3ZEYXRhO1xufTtcblxuY29uc3QgZ2VuZXJhdGVDU1ZJbnZlbnRvcmllcyA9IGFzeW5jIChxdWVyeVBhcmFtczogVVJMU2VhcmNoUGFyYW1zKSA9PiB7XG4gIC8vIENTViBIZWFkZXJzXG4gIGNvbnN0IGNzdkRhdGEgPSBbJ2NyZWF0ZWRfYXQsc3RvcmVfbmFtZSx0eXBlLHVzZXJuYW1lLHF0eV9iZWZvcmUscXR5X2FmdGVyLHNrdSxwcm9kdWN0X25hbWUnXTtcbiAgYXdhaXQgZmV0Y2hSZXBvcnRBUEkocXVlcnlQYXJhbXMsIChkYXRhOiBJSW52ZW50b3JpZXNSZXBvcnRSZXNwb25zZSkgPT4ge1xuICAgIGRhdGEucmVwb3J0cy5mb3JFYWNoKChyZXBvcnQpID0+IHtcbiAgICAgIGxldCByZXBvcnRUYXJnZXQ6IHN0cmluZztcbiAgICAgIGlmIChyZXBvcnQuc3RvcmUpIHtcbiAgICAgICAgcmVwb3J0VGFyZ2V0ID0gcmVwb3J0LnN0b3JlLnN0b3JlTmFtZTtcbiAgICAgIH0gZWxzZSBpZiAocmVwb3J0LndhcmVob3VzZSkge1xuICAgICAgICByZXBvcnRUYXJnZXQgPSByZXBvcnQud2FyZWhvdXNlLm5hbWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXBvcnRUYXJnZXQgPSAnSW50ZXJuYWwgYWN0aW9uJztcbiAgICAgIH1cblxuICAgICAgcmVwb3J0LnJlcG9ydEludmVudG9yaWVzLmZvckVhY2goKGludmVudG9yeSkgPT4ge1xuICAgICAgICBjc3ZEYXRhLnB1c2goXG4gICAgICAgICAgW1xuICAgICAgICAgICAgZm9ybWF0RGF0ZShyZXBvcnQuY3JlYXRlZEF0KSxcbiAgICAgICAgICAgIHJlcG9ydFRhcmdldCxcbiAgICAgICAgICAgIHJlcG9ydC50eXBlLFxuICAgICAgICAgICAgcmVwb3J0LnVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgICBpbnZlbnRvcnkucXR5QmVmb3JlLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBpbnZlbnRvcnkucXR5QWZ0ZXIudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIGludmVudG9yeS5wcm9kdWN0LlNLVSxcbiAgICAgICAgICAgIGludmVudG9yeS5wcm9kdWN0Lm5hbWUsXG4gICAgICAgICAgXS5qb2luKCcsJylcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGNzdkRhdGE7XG59O1xuXG5jb25zdCBnZW5lcmF0ZUNTVkFkanVzdG1lbnRzID0gYXN5bmMgKHF1ZXJ5UGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMpID0+IHtcbiAgLy8gQ1NWIEhlYWRlcnNcbiAgY29uc3QgY3N2RGF0YSA9IFtcbiAgICAnY3JlYXRlZF9hdCxwcm9kdWN0X25hbWUsc2t1LHVzZXJuYW1lLG1hc3Rlcl9ncm91cCxncm91cCx3YXJlaG91c2UscXVhbnRpdHlfYmVmb3JlLHF1YW50aXR5X2FmdGVyLG5vdGUnLFxuICBdO1xuICBhd2FpdCBmZXRjaFJlcG9ydEFQSShxdWVyeVBhcmFtcywgKGRhdGE6IElSZXBvcnRBZGp1c3RSZXNwb25zZSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIGRhdGEucmVwb3J0cy5mb3JFYWNoKChhZGp1c3QpID0+IHtcbiAgICAgIGFkanVzdC5hZGp1c3RHcm91cFF0eS5mb3JFYWNoKChyZXBvcnRBZGp1c3QpID0+IHtcbiAgICAgICAgY3N2RGF0YS5wdXNoKFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIGZvcm1hdERhdGUoYWRqdXN0LmNyZWF0ZWRBdCksXG4gICAgICAgICAgICBhZGp1c3QucHJvZHVjdC5uYW1lLFxuICAgICAgICAgICAgYWRqdXN0LnByb2R1Y3QuU0tVLFxuICAgICAgICAgICAgYWRqdXN0LnVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgICByZXBvcnRBZGp1c3QuZ3JvdXAubWFzdGVyR3JvdXAubmFtZSxcbiAgICAgICAgICAgIHJlcG9ydEFkanVzdC5ncm91cC5uYW1lLFxuICAgICAgICAgICAgcmVwb3J0QWRqdXN0LndhcmVob3VzZS5uYW1lLFxuICAgICAgICAgICAgcmVwb3J0QWRqdXN0LnF1YW50aXR5QmVmb3JlLFxuICAgICAgICAgICAgcmVwb3J0QWRqdXN0LnF1YW50aXR5QWZ0ZXIsXG4gICAgICAgICAgICBhZGp1c3Qubm90ZSxcbiAgICAgICAgICBdLmpvaW4oJywnKVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gY3N2RGF0YTtcbn07XG5cbmNvbnN0IGdlbmVyYXRlQ1NWSW5ib3VuZE9yZGVyID0gYXN5bmMgKHF1ZXJ5UGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMpID0+IHtcbiAgY29uc3QgY3N2RGF0YSA9IFsnY3JlYXRlZF9hdCx1c2VybmFtZSx0eXBlLG9yZGVyX3RpdGxlLGFsbG9jYXRlZF9wcm9kdWN0LHNrdSxncm91cCxxdWFudGl0eSddO1xuICBhd2FpdCBmZXRjaFJlcG9ydEFQSShxdWVyeVBhcmFtcywgKGRhdGE6IElSZXBvcnRJbmJvdW5kT3JkZXJSZXNwb25zZSkgPT4ge1xuICAgIGRhdGEucmVwb3J0cy5mb3JFYWNoKChyZXBvcnQpID0+IHtcbiAgICAgIHJlcG9ydC5pbmJvdW5kT3JkZXIucHJvZHVjdHNBbGxvY2F0ZWQuZm9yRWFjaCgocHJvZHVjdHNBbGxvY2F0ZWQpID0+IHtcbiAgICAgICAgcHJvZHVjdHNBbGxvY2F0ZWQucHJvZHVjdFF1YW50aXR5R3JvdXBzLmZvckVhY2goKHByb2R1Y3RRdWFudGl0eUdyb3VwKSA9PiB7XG4gICAgICAgICAgY3N2RGF0YS5wdXNoKFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBmb3JtYXREYXRlKHJlcG9ydC5jcmVhdGVkQXQpLFxuICAgICAgICAgICAgICByZXBvcnQudXNlci51c2VybmFtZSxcbiAgICAgICAgICAgICAgcmVwb3J0LnR5cGUsXG4gICAgICAgICAgICAgIHJlcG9ydC5pbmJvdW5kT3JkZXIudGl0bGUsXG4gICAgICAgICAgICAgIHByb2R1Y3RzQWxsb2NhdGVkLnByb2R1Y3QubmFtZSxcbiAgICAgICAgICAgICAgcHJvZHVjdHNBbGxvY2F0ZWQucHJvZHVjdC5TS1UsXG4gICAgICAgICAgICAgIHByb2R1Y3RRdWFudGl0eUdyb3VwLmdyb3VwLm5hbWUsXG4gICAgICAgICAgICAgIHByb2R1Y3RRdWFudGl0eUdyb3VwLnF1YW50aXR5LFxuICAgICAgICAgICAgXS5qb2luKCcsJylcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFwcm9kdWN0c0FsbG9jYXRlZC5wcm9kdWN0UXVhbnRpdHlHcm91cHMubGVuZ3RoKSB7XG4gICAgICAgICAgY3N2RGF0YS5wdXNoKFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBmb3JtYXREYXRlKHJlcG9ydC5jcmVhdGVkQXQpLFxuICAgICAgICAgICAgICByZXBvcnQudXNlci51c2VybmFtZSxcbiAgICAgICAgICAgICAgcmVwb3J0LnR5cGUsXG4gICAgICAgICAgICAgIHJlcG9ydC5pbmJvdW5kT3JkZXIudGl0bGUsXG4gICAgICAgICAgICAgIHByb2R1Y3RzQWxsb2NhdGVkLnByb2R1Y3QubmFtZSxcbiAgICAgICAgICAgICAgcHJvZHVjdHNBbGxvY2F0ZWQucHJvZHVjdC5TS1UsXG4gICAgICAgICAgICBdLmpvaW4oJywnKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGNzdkRhdGE7XG59O1xuXG5jb25zdCBnZW5lcmF0ZUNTVlNoaXBwaW5nID0gYXN5bmMgKHF1ZXJ5UGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMpID0+IHtcbiAgLy8gQ1NWIEhlYWRlcnNcbiAgY29uc3QgY3N2RGF0YSA9IFtcbiAgICAnYWN0aW9uX3R5cGUsdXNlcixjcmVhdGVkX2F0LGN1cnJlbnRfc2hpcF9yZXF1ZXN0X3N0YXR1cyxzdG9yZV9uYW1lLHNrdSxwcm9kdWN0X25hbWUsZ3JvdXAscXVhbnRpdHknLFxuICBdO1xuICBhd2FpdCBmZXRjaFJlcG9ydEFQSShxdWVyeVBhcmFtcywgKGRhdGE6IElSZXBvcnRTaGlwcGluZ1Jlc3BvbnNlKSA9PiB7XG4gICAgZGF0YS5yZXBvcnRzLmZvckVhY2goKHJlcG9ydCkgPT4ge1xuICAgICAgcmVwb3J0LnNoaXBSZXF1ZXN0LmNhcnRzLmZvckVhY2goKGNhcnQpID0+IHtcbiAgICAgICAgY3N2RGF0YS5wdXNoKFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIHJlcG9ydC50eXBlLFxuICAgICAgICAgICAgcmVwb3J0LnVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgICByZXBvcnQuY3JlYXRlZEF0LFxuICAgICAgICAgICAgcmVwb3J0LnNoaXBSZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgICAgIHJlcG9ydC5zaGlwUmVxdWVzdC5zdG9yZS5zdG9yZU5hbWUsXG4gICAgICAgICAgICBjYXJ0LnByb2R1Y3QuU0tVLFxuICAgICAgICAgICAgY2FydC5wcm9kdWN0Lm5hbWUsXG4gICAgICAgICAgICBjYXJ0Lmdyb3VwLm5hbWUsXG4gICAgICAgICAgICBjYXJ0LnF1YW50aXR5LFxuICAgICAgICAgIF0uam9pbignLCcpXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNzdkRhdGE7XG59O1xuXG5jb25zdCBnZW5lcmF0ZUNTVkFzc2lnbiA9IGFzeW5jIChxdWVyeVBhcmFtczogVVJMU2VhcmNoUGFyYW1zKSA9PiB7XG4gIC8vIENTViBIZWFkZXJzXG4gIGNvbnN0IGNzdkRhdGEgPSBbJ2NyZWF0ZWRfYXQsdXNlcm5hbWUsdHlwZSxmcm9tX2dyb3VwLHRvX2dyb3VwLHNrdSxwcm9kdWN0X25hbWUscXVhbnRpdHknXTtcblxuICBhd2FpdCBmZXRjaFJlcG9ydEFQSShxdWVyeVBhcmFtcywgKGRhdGE6IElSZXBvcnRBc3NpZ25SZXNwb25zZSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIGRhdGEucmVwb3J0cy5mb3JFYWNoKChyZXBvcnQpID0+IHtcbiAgICAgIGNzdkRhdGEucHVzaChcbiAgICAgICAgW1xuICAgICAgICAgIGZvcm1hdERhdGUocmVwb3J0LmNyZWF0ZWRBdCksXG4gICAgICAgICAgcmVwb3J0LnVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgcmVwb3J0LnR5cGUsXG4gICAgICAgICAgcmVwb3J0LmZyb21Hcm91cC5uYW1lLFxuICAgICAgICAgIHJlcG9ydC5ncm91cC5uYW1lLFxuICAgICAgICAgIHJlcG9ydC5wcm9kdWN0LlNLVSxcbiAgICAgICAgICByZXBvcnQucHJvZHVjdC5uYW1lLFxuICAgICAgICAgIHJlcG9ydC5xdWFudGl0eSxcbiAgICAgICAgXS5qb2luKCcsJylcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gY3N2RGF0YTtcbn07XG5cbmNvbnN0IGdlbmVyYXRlQ1NWU2hlbGZMaWZlID0gYXN5bmMgKHF1ZXJ5UGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMpID0+IHtcbiAgLy8gQ1NWIEhlYWRlcnNcbiAgY29uc3QgY3N2RGF0YSA9IFsnU2hlbGZMaWZlLCBzaGVsZkxpZmVTdGFydCwgc2hlbGZMaWZlRW5kLCBxdWFudGl0eU9yZGVyZWQsIHF1YW50aXR5UmVjZWl2ZWQnXTtcblxuICBhd2FpdCBmZXRjaFJlcG9ydEFQSShxdWVyeVBhcmFtcywgKGRhdGE6IElSZXBvcnRTaGVsZkxpZmVSZXNwb25zZSkgPT4ge1xuICAgIGRhdGEucmVwb3J0U2hlbGZMaWZlTGlzdC5mb3JFYWNoKChyZXBvcnQpID0+IHtcbiAgICAgIGxldCByZWNlaXZlZDtcbiAgICAgIGlmICghcmVwb3J0LnF1YW50aXR5UmVjZWl2ZWQpIHtcbiAgICAgICAgcmVjZWl2ZWQgPSAnLSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWNlaXZlZCA9IHJlcG9ydC5xdWFudGl0eVJlY2VpdmVkLnRvU3RyaW5nKCk7XG4gICAgICB9XG5cbiAgICAgIGNzdkRhdGEucHVzaChcbiAgICAgICAgW1xuICAgICAgICAgIHJlcG9ydC5wcm9kdWN0LlNLVSxcbiAgICAgICAgICBmb3JtYXREYXRlKHJlcG9ydC5zaGVsZkxpZmVTdGFydCksXG4gICAgICAgICAgZm9ybWF0RGF0ZShyZXBvcnQuc2hlbGZMaWZlU3RhcnQpLFxuICAgICAgICAgIHJlcG9ydC5xdWFudGl0eSxcbiAgICAgICAgICByZWNlaXZlZCxcbiAgICAgICAgXS5qb2luKCcsJylcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gY3N2RGF0YTtcbn07XG5cbmNvbnN0IGNzdkRvd25sb2FkTWFwOiBJQ1NWRG93bmxvYWRNYXAgPSB7XG4gIGV2ZW50czogZ2VuZXJhdGVDU1ZFdmVudHMsXG4gIHJlcXVlc3Rfc2hhcmU6IGdlbmVyYXRlQ1NWUmVxdWVzdFNoYXJlLFxuICBpbnZlbnRvcmllczogZ2VuZXJhdGVDU1ZJbnZlbnRvcmllcyxcbiAgYWRqdXN0bWVudDogZ2VuZXJhdGVDU1ZBZGp1c3RtZW50cyxcbiAgYXNzaWduOiBnZW5lcmF0ZUNTVkFzc2lnbixcbiAgaW5ib3VuZF9vcmRlcjogZ2VuZXJhdGVDU1ZJbmJvdW5kT3JkZXIsXG4gIHNoaXBwaW5nOiBnZW5lcmF0ZUNTVlNoaXBwaW5nLFxuICBzaGVsZl9saWZlOiBnZW5lcmF0ZUNTVlNoZWxmTGlmZSxcbn07XG5cbmNvbnN0IGZpbHRlcnNJZHMgPSBbXG4gICdyZXF1ZXN0LXNoYXJlLXR5cGUnLFxuICAnc2hpcHBpbmctdHlwZScsXG4gICd1c2VyLXNlbGVjdCcsXG4gICdmaWx0ZXItc3RhcnQtZGF0ZScsXG4gICdmaWx0ZXItc3RhcnQtZGF0ZS10bycsXG4gICdmaWx0ZXItZW5kLWRhdGUnLFxuICAnZmlsdGVyLWVuZC1kYXRlLXRvJyxcbiAgJ21hc3Rlci1ncm91cCcsXG4gICd0YXJnZXQtZ3JvdXAnLFxuICAnZmlsdGVyLWdyb3VwLWJyYW5kJyxcbiAgJ2ZpbHRlci1ncm91cC1sYW5ndWFnZScsXG4gICdmaWx0ZXItZ3JvdXAtcHJlbWlzZXMnLFxuICAnZmlsdGVyLWdyb3VwLWNhdGVnb3J5JyxcbiAgJ2ZpbHRlci1ncm91cC1ldmVudHMnLFxuICAnZmlsdGVyLXByb2R1Y3QtZ3JvdXAnLFxuICAnZ3JvdXAtZnJvbScsXG4gICdncm91cC10bycsXG4gICdkaXZpc2lvbi1zZWxlY3QnLFxuICAnc2hlbGYtbGlmZS1maWx0ZXItZXhwaXJlLWluJyxcbl07XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIC8vIERPTSBub2Rlc1xuICBjb25zdCByZXBvcnRUeXBlU2VsZWN0SFRNTCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXBvcnQtdHlwZS1zZWxlY3QnKSBhcyBIVE1MU2VsZWN0RWxlbWVudDtcbiAgY29uc3QgYWxsRmlsdGVyc0hUTUwgPSBmaWx0ZXJzSWRzLm1hcCgoaWQpID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSk7XG4gIGNvbnN0IHRhYmxlTG9hZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RhYmxlLXJlcG9ydC1sb2FkZXInKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgY29uc3QgY2xlYXJGaWx0ZXJzQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbHRlci1jbGVhci1idXR0b24nKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgY29uc3Qgc2VhcmNoUXVlcnlIVE1MID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaC1xdWVyeScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIGNvbnN0IGRvd25sb2FkQ1NWQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1dHRvbi1jc3YtZG93bmxvYWQnKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcblxuICBmb3IgKGNvbnN0IFtyZXBvcnRUeXBlLCBmaWx0ZXJzXSBvZiBPYmplY3QuZW50cmllcyhmaWx0ZXJzTWFwKSkge1xuICAgIGZpbHRlcnNNYXBbcmVwb3J0VHlwZV0gPSBmaWx0ZXJzLm1hcCgoaWQpID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkIGFzIHN0cmluZykpIGFzIEhUTUxFbGVtZW50W107XG4gIH1cblxuICAvLyBTaG93L3JlbW92ZSBmaWx0ZXJzIHdoZW4gY2hvb3NlIGV2ZW50IHJlcG9ydCB0eXBlXG4gIHJlcG9ydFR5cGVTZWxlY3RIVE1MLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0SFRNTCA9IGUudGFyZ2V0IGFzIEhUTUxTZWxlY3RFbGVtZW50O1xuXG4gICAgYWxsRmlsdGVyc0hUTUwuZm9yRWFjaCgoZmlsdGVySFRNTCkgPT4gZmlsdGVySFRNTC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKSk7XG4gICAgY29uc3QgdmlzaWJsZUZpbHRlcnMgPSBmaWx0ZXJzTWFwW3NlbGVjdEhUTUwudmFsdWVdIGFzIEhUTUxFbGVtZW50W107XG5cbiAgICB2aXNpYmxlRmlsdGVycy5mb3JFYWNoKChmaWx0ZXJIVE1MKSA9PiBmaWx0ZXJIVE1MLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpKTtcbiAgfSk7XG5cbiAgdGFibGVMb2FkZXIuY2xpY2soKTtcbiAgY2xlYXJGaWx0ZXJzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGFsbEZpbHRlcnNIVE1MLmZvckVhY2goKGZpbHRlckhUTUwpID0+IHtcbiAgICAgIGNvbnN0IGlucHV0ID0gZmlsdGVySFRNTC5xdWVyeVNlbGVjdG9yKCdpbnB1dCwgc2VsZWN0JykgYXMgSFRNTFNlbGVjdEVsZW1lbnQgfCBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgaW5wdXQudmFsdWUgPSAnJztcbiAgICB9KTtcbiAgICBzZWFyY2hRdWVyeUhUTUwudmFsdWUgPSAnJztcbiAgICB0YWJsZUxvYWRlci5jbGljaygpO1xuICB9KTtcbiAgLy8gRG93bmxvYWQgY3N2IGJ1dHRvblxuICBkb3dubG9hZENTVkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBmaWx0ZXJzUXVlcnlQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgYWxsRmlsdGVyc0hUTUwuZm9yRWFjaCgoZmlsdGVySFRNTCkgPT4ge1xuICAgICAgY29uc3QgaW5wdXQgPSBmaWx0ZXJIVE1MLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LCBzZWxlY3QnKSBhcyBIVE1MU2VsZWN0RWxlbWVudCB8IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICBmaWx0ZXJzUXVlcnlQYXJhbXMuYXBwZW5kKGlucHV0LmdldEF0dHJpYnV0ZSgnbmFtZScpLCBpbnB1dC52YWx1ZSk7XG4gICAgfSk7XG5cbiAgICBmaWx0ZXJzUXVlcnlQYXJhbXMuYXBwZW5kKCdxJywgc2VhcmNoUXVlcnlIVE1MLnZhbHVlKTtcbiAgICBmaWx0ZXJzUXVlcnlQYXJhbXMuYXBwZW5kKCdyZXBvcnRfdHlwZScsIHJlcG9ydFR5cGVTZWxlY3RIVE1MLnZhbHVlKTtcblxuICAgIGNvbnN0IGNzdkRhdGEgPSBhd2FpdCBjc3ZEb3dubG9hZE1hcFtyZXBvcnRUeXBlU2VsZWN0SFRNTC52YWx1ZV0oZmlsdGVyc1F1ZXJ5UGFyYW1zKTtcbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2NzdkRhdGEuam9pbignXFxuJyldLCB7IHR5cGU6ICd0ZXh0L2NzdicgfSk7XG4gICAgY29uc3QgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBhLnNldEF0dHJpYnV0ZSgnaHJlZicsIHVybCk7XG4gICAgYS5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgJ3JlcG9ydC5jc3YnKTtcbiAgICBhLmNsaWNrKCk7XG4gICAgYS5yZW1vdmUoKTtcbiAgfSk7XG59KTtcbiIsImV4cG9ydCBjb25zdCBmb3JtYXREYXRlID0gKGRhdGU6IHN0cmluZykgPT4ge1xuICBjb25zdCBjcmVhdGVBdCA9IG5ldyBEYXRlKGRhdGUpO1xuICBjb25zdCB5ZWFyID0gY3JlYXRlQXQuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgbW9udGggPSBTdHJpbmcoY3JlYXRlQXQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsICcwJyk7IC8vIE1vbnRoIGlzIDAtYmFzZWRcbiAgY29uc3QgZGF5ID0gU3RyaW5nKGNyZWF0ZUF0LmdldERhdGUoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgY29uc3QgaG91cnMgPSBTdHJpbmcoY3JlYXRlQXQuZ2V0SG91cnMoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgY29uc3QgbWludXRlcyA9IFN0cmluZyhjcmVhdGVBdC5nZXRNaW51dGVzKCkpLnBhZFN0YXJ0KDIsICcwJyk7XG4gIHJldHVybiBgJHttb250aH0vJHtkYXl9LyR7eWVhcn0gJHtob3Vyc306JHttaW51dGVzfWA7XG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9yZXBvcnQudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=