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
                csvData = ['action_type,user,created_at,store,event_date_from,event_date_to,sku,product_name',];
                return [4 /*yield*/, fetchReportAPI(queryParams, function (data) {
                        data.reports.forEach(function (report) {
                            report.shipRequest.carts.forEach(function (cart) {
                                console.log(searchSKUInput.value, cart.product.SKU);
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
                csvData = ['action_type,user,created_at,current_share_request_status,group_from,group_to,desired_quantity,sku,product_name'];
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
                                if (searchSKUInput.value && !inventory.product.SKU.includes(searchSKUInput.value)) {
                                    return;
                                }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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USxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxtQkFBbUI7SUFDbkYsSUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDeEQsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDM0QsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDL0QsT0FBTyxVQUFHLEtBQUssY0FBSSxHQUFHLGNBQUksSUFBSSxjQUFJLEtBQUssY0FBSSxPQUFPLENBQUUsQ0FBQztBQUN2RCxDQUFDLENBQUM7QUFSVyxrQkFBVSxjQVFyQjs7Ozs7OztVQ1JGO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGF0aWMvLi9zcmMvcmVwb3J0LnRzIiwid2VicGFjazovL3N0YXRpYy8uL3NyYy91dGlscy50cyIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIElSZXBvcnRSZXF1ZXN0U2hhcmVSZXNwb25zZSxcbiAgSUV2ZW50c1JlcG9ydFJlc3BvbnNlLFxuICBJSW52ZW50b3JpZXNSZXBvcnRSZXNwb25zZSxcbiAgSVJlcG9ydEFkanVzdFJlc3BvbnNlLFxuICBJUmVwb3J0SW5ib3VuZE9yZGVyUmVzcG9uc2UsXG4gIElSZXBvcnRTaGlwcGluZ1Jlc3BvbnNlLFxuICBJUmVwb3J0QXNzaWduUmVzcG9uc2UsXG4gIElSZXBvcnRTaGVsZkxpZmVSZXNwb25zZSxcbn0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBmb3JtYXREYXRlIH0gZnJvbSAnLi91dGlscyc7XG5cbmludGVyZmFjZSBJRmlsdGVyTWFwIHtcbiAgW2luZGV4OiBzdHJpbmddOiBzdHJpbmdbXSB8IEhUTUxFbGVtZW50W107XG59XG5cbmludGVyZmFjZSBJQ1NWRG93bmxvYWRNYXAge1xuICBbaW5kZXg6IHN0cmluZ106IChxdWVyeTogVVJMU2VhcmNoUGFyYW1zKSA9PiBQcm9taXNlPHN0cmluZ1tdPjtcbn1cblxuY29uc3QgZmlsdGVyc01hcDogSUZpbHRlck1hcCA9IHtcbiAgZXZlbnRzOiBbJ3VzZXItc2VsZWN0JywgJ2ZpbHRlci1zdGFydC1kYXRlJywgJ2ZpbHRlci1zdGFydC1kYXRlLXRvJywgJ2ZpbHRlci1lbmQtZGF0ZScsICdmaWx0ZXItZW5kLWRhdGUtdG8nXSxcbiAgcmVxdWVzdF9zaGFyZTogWyd1c2VyLXNlbGVjdCcsICdmaWx0ZXItc3RhcnQtZGF0ZScsICdmaWx0ZXItZW5kLWRhdGUnXSxcbiAgaW52ZW50b3JpZXM6IFtcbiAgICAndXNlci1zZWxlY3QnLFxuICAgICdmaWx0ZXItc3RhcnQtZGF0ZScsXG4gICAgJ2ZpbHRlci1lbmQtZGF0ZScsXG4gICAgJ21hc3Rlci1ncm91cCcsXG4gICAgJ3RhcmdldC1ncm91cCcsXG4gICAgJ2ZpbHRlci1ncm91cC1icmFuZCcsXG4gICAgJ2ZpbHRlci1ncm91cC1sYW5ndWFnZScsXG4gICAgJ2ZpbHRlci1ncm91cC1wcmVtaXNlcycsXG4gICAgJ2ZpbHRlci1ncm91cC1jYXRlZ29yeScsXG4gICAgJ2ZpbHRlci1ncm91cC1ldmVudHMnLFxuICBdLFxuICBhZGp1c3RtZW50OiBbXG4gICAgJ3VzZXItc2VsZWN0JyxcbiAgICAnZmlsdGVyLXN0YXJ0LWRhdGUnLFxuICAgICdmaWx0ZXItZW5kLWRhdGUnLFxuICAgICdtYXN0ZXItZ3JvdXAnLFxuICAgICd0YXJnZXQtZ3JvdXAnLFxuICAgICdmaWx0ZXItZ3JvdXAtYnJhbmQnLFxuICAgICdmaWx0ZXItZ3JvdXAtbGFuZ3VhZ2UnLFxuICAgICdmaWx0ZXItZ3JvdXAtcHJlbWlzZXMnLFxuICAgICdmaWx0ZXItZ3JvdXAtY2F0ZWdvcnknLFxuICAgICdmaWx0ZXItZ3JvdXAtZXZlbnRzJyxcbiAgXSxcbiAgYXNzaWduOiBbXG4gICAgJ3VzZXItc2VsZWN0JyxcbiAgICAnZ3JvdXAtZnJvbScsXG4gICAgJ2dyb3VwLXRvJyxcbiAgICAnZmlsdGVyLXN0YXJ0LWRhdGUnLFxuICAgICdmaWx0ZXItZW5kLWRhdGUnLFxuICAgICdmaWx0ZXItZ3JvdXAtYnJhbmQnLFxuICAgICdmaWx0ZXItZ3JvdXAtbGFuZ3VhZ2UnLFxuICAgICdmaWx0ZXItZ3JvdXAtcHJlbWlzZXMnLFxuICAgICdmaWx0ZXItZ3JvdXAtY2F0ZWdvcnknLFxuICBdLFxuICBpbmJvdW5kX29yZGVyOiBbXG4gICAgJ2ZpbHRlci1zdGFydC1kYXRlJyxcbiAgICAnZmlsdGVyLWVuZC1kYXRlJyxcbiAgICAnZmlsdGVyLWdyb3VwLWJyYW5kJyxcbiAgICAnZmlsdGVyLWdyb3VwLXByZW1pc2VzJyxcbiAgICAnZmlsdGVyLWdyb3VwLWNhdGVnb3J5JyxcbiAgICAnZmlsdGVyLXByb2R1Y3QtZ3JvdXAnLFxuICBdLFxuICBzaGlwcGluZzogW1xuICAgICdkaXZpc2lvbi1zZWxlY3QnLFxuICAgICd0YXJnZXQtZ3JvdXAnLFxuICAgICdmaWx0ZXItc3RhcnQtZGF0ZScsXG4gICAgJ2ZpbHRlci1lbmQtZGF0ZScsXG4gICAgJ2ZpbHRlci1ncm91cC1icmFuZCcsXG4gICAgJ2ZpbHRlci1ncm91cC1sYW5ndWFnZScsXG4gICAgJ2ZpbHRlci1ncm91cC1jYXRlZ29yeScsXG4gICAgJ2ZpbHRlci1ncm91cC1wcmVtaXNlcycsXG4gIF0sXG4gIHNoZWxmX2xpZmU6IFtcbiAgICAnZmlsdGVyLXN0YXJ0LWRhdGUnLFxuICAgICdmaWx0ZXItZW5kLWRhdGUnLFxuICAgICdtYXN0ZXItZ3JvdXAnLFxuICAgICd0YXJnZXQtZ3JvdXAnLFxuICAgICdmaWx0ZXItZ3JvdXAtYnJhbmQnLFxuICAgICdmaWx0ZXItZ3JvdXAtbGFuZ3VhZ2UnLFxuICAgICdmaWx0ZXItZ3JvdXAtcHJlbWlzZXMnLFxuICAgICdmaWx0ZXItZ3JvdXAtY2F0ZWdvcnknLFxuICAgICdzaGVsZi1saWZlLWZpbHRlci1leHBpcmUtaW4nLFxuICBdLFxufTtcblxuY29uc3Qgc2VhcmNoU0tVSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoLXNrdScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5cbmNvbnN0IGZldGNoUmVwb3J0QVBJID0gYXN5bmMgKHF1ZXJ5UGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMsIGNhbGxiYWNrOiAoZGF0YTogT2JqZWN0KSA9PiB2b2lkKSA9PiB7XG4gIGxldCBwYWdlcyA9IDE7XG5cbiAgY29uc3QgdXJsV2l0aG91dFF1ZXJ5UGFyYW1zID0gbG9jYXRpb24ub3JpZ2luICsgbG9jYXRpb24ucGF0aG5hbWU7XG4gIGZvciAobGV0IHBhZ2UgPSAxOyBwYWdlIDw9IHBhZ2VzOyBwYWdlKyspIHtcbiAgICBjb25zdCB1cmwgPSBbYGFwaT9wYWdlPSR7cGFnZX1gLCBxdWVyeVBhcmFtcy50b1N0cmluZygpXS5qb2luKCcmJyk7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYCR7dXJsV2l0aG91dFF1ZXJ5UGFyYW1zfSR7dXJsfWApO1xuICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGF3YWl0IHJlcy5qc29uKCkpO1xuXG4gICAgY2FsbGJhY2soZGF0YSk7XG4gICAgcGFnZXMgPSBkYXRhLnBhZ2luYXRpb24ucGFnZXM7XG4gIH1cbn07XG5cbmNvbnN0IGdlbmVyYXRlQ1NWRXZlbnRzID0gYXN5bmMgKHF1ZXJ5UGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMpID0+IHtcbiAgY29uc3QgY3N2RGF0YSA9IFsnYWN0aW9uX3R5cGUsdXNlcixjcmVhdGVkX2F0LHN0b3JlLGV2ZW50X2RhdGVfZnJvbSxldmVudF9kYXRlX3RvLHNrdSxwcm9kdWN0X25hbWUnLF07XG4gIGF3YWl0IGZldGNoUmVwb3J0QVBJKHF1ZXJ5UGFyYW1zLCAoZGF0YTogSUV2ZW50c1JlcG9ydFJlc3BvbnNlKSA9PiB7XG4gICAgZGF0YS5yZXBvcnRzLmZvckVhY2goKHJlcG9ydCkgPT4ge1xuICAgICAgXG5cbiAgICAgIHJlcG9ydC5zaGlwUmVxdWVzdC5jYXJ0cy5mb3JFYWNoKChjYXJ0KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHNlYXJjaFNLVUlucHV0LnZhbHVlLCBjYXJ0LnByb2R1Y3QuU0tVKVxuICAgICAgICBpZiAoc2VhcmNoU0tVSW5wdXQudmFsdWUgJiYgIWNhcnQucHJvZHVjdC5TS1UuaW5jbHVkZXMoc2VhcmNoU0tVSW5wdXQudmFsdWUpICl7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY3N2RGF0YS5wdXNoKFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIHJlcG9ydC50eXBlLFxuICAgICAgICAgICAgcmVwb3J0LnVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgICByZXBvcnQuY3JlYXRlZEF0LFxuICAgICAgICAgICAgcmVwb3J0LnNoaXBSZXF1ZXN0LnN0b3JlLnN0b3JlTmFtZSxcbiAgICAgICAgICAgIGNhcnQuZXZlbnQuZGF0ZUZyb20sXG4gICAgICAgICAgICBjYXJ0LmV2ZW50LmRhdGVUbyxcbiAgICAgICAgICAgIGNhcnQucHJvZHVjdC5TS1UsXG4gICAgICAgICAgICBjYXJ0LnByb2R1Y3QubmFtZSxcbiAgICAgICAgICBdLmpvaW4oJywnKVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gY3N2RGF0YTtcbn07XG5cbmNvbnN0IGdlbmVyYXRlQ1NWUmVxdWVzdFNoYXJlID0gYXN5bmMgKHF1ZXJ5UGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMpID0+IHtcbiAgY29uc3QgY3N2RGF0YSA9IFsnYWN0aW9uX3R5cGUsdXNlcixjcmVhdGVkX2F0LGN1cnJlbnRfc2hhcmVfcmVxdWVzdF9zdGF0dXMsZ3JvdXBfZnJvbSxncm91cF90byxkZXNpcmVkX3F1YW50aXR5LHNrdSxwcm9kdWN0X25hbWUnXTtcbiAgYXdhaXQgZmV0Y2hSZXBvcnRBUEkocXVlcnlQYXJhbXMsIChkYXRhOiBJUmVwb3J0UmVxdWVzdFNoYXJlUmVzcG9uc2UpID0+IHtcbiAgICBkYXRhLnJlcG9ydHMuZm9yRWFjaCgocmVwb3J0KSA9PiB7XG4gICAgICBpZiAoc2VhcmNoU0tVSW5wdXQudmFsdWUgJiYgIXJlcG9ydC5yZXF1ZXN0U2hhcmUucHJvZHVjdC5TS1UuaW5jbHVkZXMoc2VhcmNoU0tVSW5wdXQudmFsdWUpICl7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjc3ZEYXRhLnB1c2goXG4gICAgICAgIFtcbiAgICAgICAgICByZXBvcnQudHlwZSxcbiAgICAgICAgICByZXBvcnQudXNlci51c2VybmFtZSxcbiAgICAgICAgICByZXBvcnQuY3JlYXRlZEF0LFxuICAgICAgICAgIHJlcG9ydC5yZXF1ZXN0U2hhcmUuc3RhdHVzLFxuICAgICAgICAgIHJlcG9ydC5yZXF1ZXN0U2hhcmUuZnJvbUdyb3VwLm5hbWUsXG4gICAgICAgICAgcmVwb3J0LnJlcXVlc3RTaGFyZS5ncm91cC5uYW1lLFxuICAgICAgICAgIHJlcG9ydC5yZXF1ZXN0U2hhcmUuZGVzaXJlUXVhbnRpdHksXG4gICAgICAgICAgcmVwb3J0LnJlcXVlc3RTaGFyZS5wcm9kdWN0LlNLVSxcbiAgICAgICAgICByZXBvcnQucmVxdWVzdFNoYXJlLnByb2R1Y3QubmFtZSxcbiAgICAgICAgXS5qb2luKCcsJylcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gY3N2RGF0YTtcbn07XG5cbmNvbnN0IGdlbmVyYXRlQ1NWSW52ZW50b3JpZXMgPSBhc3luYyAocXVlcnlQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcykgPT4ge1xuICAvLyBDU1YgSGVhZGVyc1xuICBjb25zdCBjc3ZEYXRhID0gWydjcmVhdGVkX2F0LHN0b3JlX25hbWUsdHlwZSx1c2VybmFtZSxxdHlfYmVmb3JlLHF0eV9hZnRlcixza3UscHJvZHVjdF9uYW1lJ107XG4gIGF3YWl0IGZldGNoUmVwb3J0QVBJKHF1ZXJ5UGFyYW1zLCAoZGF0YTogSUludmVudG9yaWVzUmVwb3J0UmVzcG9uc2UpID0+IHtcbiAgICBkYXRhLnJlcG9ydHMuZm9yRWFjaCgocmVwb3J0KSA9PiB7XG4gICAgICBsZXQgcmVwb3J0VGFyZ2V0OiBzdHJpbmc7XG4gICAgICBpZiAocmVwb3J0LnN0b3JlKSB7XG4gICAgICAgIHJlcG9ydFRhcmdldCA9IHJlcG9ydC5zdG9yZS5zdG9yZU5hbWU7XG4gICAgICB9IGVsc2UgaWYgKHJlcG9ydC53YXJlaG91c2UpIHtcbiAgICAgICAgcmVwb3J0VGFyZ2V0ID0gcmVwb3J0LndhcmVob3VzZS5uYW1lO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVwb3J0VGFyZ2V0ID0gJ0ludGVybmFsIGFjdGlvbic7XG4gICAgICB9XG5cbiAgICAgIHJlcG9ydC5yZXBvcnRJbnZlbnRvcmllcy5mb3JFYWNoKChpbnZlbnRvcnkpID0+IHtcbiAgICAgICAgICBpZiAoc2VhcmNoU0tVSW5wdXQudmFsdWUgJiYgIWludmVudG9yeS5wcm9kdWN0LlNLVS5pbmNsdWRlcyhzZWFyY2hTS1VJbnB1dC52YWx1ZSkgKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjc3ZEYXRhLnB1c2goXG4gICAgICAgICAgW1xuICAgICAgICAgICAgZm9ybWF0RGF0ZShyZXBvcnQuY3JlYXRlZEF0KSxcbiAgICAgICAgICAgIHJlcG9ydFRhcmdldCxcbiAgICAgICAgICAgIHJlcG9ydC50eXBlLFxuICAgICAgICAgICAgcmVwb3J0LnVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgICBpbnZlbnRvcnkucXR5QmVmb3JlLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBpbnZlbnRvcnkucXR5QWZ0ZXIudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIGludmVudG9yeS5wcm9kdWN0LlNLVSxcbiAgICAgICAgICAgIGludmVudG9yeS5wcm9kdWN0Lm5hbWUsXG4gICAgICAgICAgXS5qb2luKCcsJylcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGNzdkRhdGE7XG59O1xuXG5jb25zdCBnZW5lcmF0ZUNTVkFkanVzdG1lbnRzID0gYXN5bmMgKHF1ZXJ5UGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMpID0+IHtcbiAgLy8gQ1NWIEhlYWRlcnNcbiAgY29uc3QgY3N2RGF0YSA9IFtcbiAgICAnY3JlYXRlZF9hdCxwcm9kdWN0X25hbWUsc2t1LHVzZXJuYW1lLG1hc3Rlcl9ncm91cCxncm91cCx3YXJlaG91c2UscXVhbnRpdHlfYmVmb3JlLHF1YW50aXR5X2FmdGVyLG5vdGUnLFxuICBdO1xuICBhd2FpdCBmZXRjaFJlcG9ydEFQSShxdWVyeVBhcmFtcywgKGRhdGE6IElSZXBvcnRBZGp1c3RSZXNwb25zZSkgPT4ge1xuICAgIGRhdGEucmVwb3J0cy5mb3JFYWNoKChhZGp1c3QpID0+IHtcbiAgICAgIGFkanVzdC5hZGp1c3RHcm91cFF0eS5mb3JFYWNoKChyZXBvcnRBZGp1c3QpID0+IHtcbiAgICAgICAgaWYgKHNlYXJjaFNLVUlucHV0LnZhbHVlICYmICFhZGp1c3QucHJvZHVjdC5TS1UuaW5jbHVkZXMoc2VhcmNoU0tVSW5wdXQudmFsdWUpICl7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNzdkRhdGEucHVzaChcbiAgICAgICAgICBbXG4gICAgICAgICAgICBmb3JtYXREYXRlKGFkanVzdC5jcmVhdGVkQXQpLFxuICAgICAgICAgICAgYWRqdXN0LnByb2R1Y3QubmFtZSxcbiAgICAgICAgICAgIGFkanVzdC5wcm9kdWN0LlNLVSxcbiAgICAgICAgICAgIGFkanVzdC51c2VyLnVzZXJuYW1lLFxuICAgICAgICAgICAgcmVwb3J0QWRqdXN0Lmdyb3VwLm1hc3Rlckdyb3VwLm5hbWUsXG4gICAgICAgICAgICByZXBvcnRBZGp1c3QuZ3JvdXAubmFtZSxcbiAgICAgICAgICAgIHJlcG9ydEFkanVzdC53YXJlaG91c2UubmFtZSxcbiAgICAgICAgICAgIHJlcG9ydEFkanVzdC5xdWFudGl0eUJlZm9yZSxcbiAgICAgICAgICAgIHJlcG9ydEFkanVzdC5xdWFudGl0eUFmdGVyLFxuICAgICAgICAgICAgYWRqdXN0Lm5vdGUsXG4gICAgICAgICAgXS5qb2luKCcsJylcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGNzdkRhdGE7XG59O1xuXG5jb25zdCBnZW5lcmF0ZUNTVkluYm91bmRPcmRlciA9IGFzeW5jIChxdWVyeVBhcmFtczogVVJMU2VhcmNoUGFyYW1zKSA9PiB7XG4gIGNvbnN0IGNzdkRhdGEgPSBbJ2NyZWF0ZWRfYXQsdXNlcm5hbWUsdHlwZSxvcmRlcl90aXRsZSxhbGxvY2F0ZWRfcHJvZHVjdCxza3UsZ3JvdXAscXVhbnRpdHknXTtcbiAgYXdhaXQgZmV0Y2hSZXBvcnRBUEkocXVlcnlQYXJhbXMsIChkYXRhOiBJUmVwb3J0SW5ib3VuZE9yZGVyUmVzcG9uc2UpID0+IHtcbiAgICBjb25zdCBzZWFyY2hpbmdHcm91cCA9IHF1ZXJ5UGFyYW1zLmdldCgncHJvZHVjdF9ncm91cCcpO1xuICAgIGRhdGEucmVwb3J0cy5mb3JFYWNoKChyZXBvcnQpID0+IHtcbiAgICAgIHJlcG9ydC5pbmJvdW5kT3JkZXIucHJvZHVjdHNBbGxvY2F0ZWQuZm9yRWFjaCgocHJvZHVjdHNBbGxvY2F0ZWQpID0+IHtcbiAgICAgICAgcHJvZHVjdHNBbGxvY2F0ZWQucHJvZHVjdFF1YW50aXR5R3JvdXBzLmZvckVhY2goKHByb2R1Y3RRdWFudGl0eUdyb3VwKSA9PiB7XG4gICAgICAgICAgaWYgKHNlYXJjaFNLVUlucHV0LnZhbHVlICYmICFwcm9kdWN0c0FsbG9jYXRlZC5wcm9kdWN0LlNLVS5pbmNsdWRlcyhzZWFyY2hTS1VJbnB1dC52YWx1ZSkgKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNlYXJjaGluZ0dyb3VwICYmICFwcm9kdWN0UXVhbnRpdHlHcm91cC5ncm91cC5uYW1lLmluY2x1ZGVzKHNlYXJjaGluZ0dyb3VwKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjc3ZEYXRhLnB1c2goXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIGZvcm1hdERhdGUocmVwb3J0LmNyZWF0ZWRBdCksXG4gICAgICAgICAgICAgIHJlcG9ydC51c2VyLnVzZXJuYW1lLFxuICAgICAgICAgICAgICByZXBvcnQudHlwZSxcbiAgICAgICAgICAgICAgcmVwb3J0LmluYm91bmRPcmRlci50aXRsZSxcbiAgICAgICAgICAgICAgcHJvZHVjdHNBbGxvY2F0ZWQucHJvZHVjdC5uYW1lLFxuICAgICAgICAgICAgICBwcm9kdWN0c0FsbG9jYXRlZC5wcm9kdWN0LlNLVSxcbiAgICAgICAgICAgICAgcHJvZHVjdFF1YW50aXR5R3JvdXAuZ3JvdXAubmFtZSxcbiAgICAgICAgICAgICAgcHJvZHVjdFF1YW50aXR5R3JvdXAucXVhbnRpdHksXG4gICAgICAgICAgICBdLmpvaW4oJywnKVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXByb2R1Y3RzQWxsb2NhdGVkLnByb2R1Y3RRdWFudGl0eUdyb3Vwcy5sZW5ndGgpIHtcbiAgICAgICAgICBjc3ZEYXRhLnB1c2goXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIGZvcm1hdERhdGUocmVwb3J0LmNyZWF0ZWRBdCksXG4gICAgICAgICAgICAgIHJlcG9ydC51c2VyLnVzZXJuYW1lLFxuICAgICAgICAgICAgICByZXBvcnQudHlwZSxcbiAgICAgICAgICAgICAgcmVwb3J0LmluYm91bmRPcmRlci50aXRsZSxcbiAgICAgICAgICAgICAgcHJvZHVjdHNBbGxvY2F0ZWQucHJvZHVjdC5uYW1lLFxuICAgICAgICAgICAgICBwcm9kdWN0c0FsbG9jYXRlZC5wcm9kdWN0LlNLVSxcbiAgICAgICAgICAgIF0uam9pbignLCcpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gY3N2RGF0YTtcbn07XG5cbmNvbnN0IGdlbmVyYXRlQ1NWU2hpcHBpbmcgPSBhc3luYyAocXVlcnlQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcykgPT4ge1xuICAvLyBDU1YgSGVhZGVyc1xuICBjb25zdCBjc3ZEYXRhID0gW1xuICAgICdhY3Rpb25fdHlwZSx1c2VyLGNyZWF0ZWRfYXQsY3VycmVudF9zaGlwX3JlcXVlc3Rfc3RhdHVzLHN0b3JlX25hbWUsc2t1LHByb2R1Y3RfbmFtZSxncm91cCxxdWFudGl0eScsXG4gIF07XG4gIGF3YWl0IGZldGNoUmVwb3J0QVBJKHF1ZXJ5UGFyYW1zLCAoZGF0YTogSVJlcG9ydFNoaXBwaW5nUmVzcG9uc2UpID0+IHtcbiAgICBkYXRhLnJlcG9ydHMuZm9yRWFjaCgocmVwb3J0KSA9PiB7XG4gICAgICByZXBvcnQuc2hpcFJlcXVlc3QuY2FydHMuZm9yRWFjaCgoY2FydCkgPT4ge1xuICAgICAgICBpZiAoc2VhcmNoU0tVSW5wdXQudmFsdWUgJiYgIWNhcnQucHJvZHVjdC5TS1UuaW5jbHVkZXMoc2VhcmNoU0tVSW5wdXQudmFsdWUpICl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY3N2RGF0YS5wdXNoKFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIHJlcG9ydC50eXBlLFxuICAgICAgICAgICAgcmVwb3J0LnVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgICByZXBvcnQuY3JlYXRlZEF0LFxuICAgICAgICAgICAgcmVwb3J0LnNoaXBSZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgICAgIHJlcG9ydC5zaGlwUmVxdWVzdC5zdG9yZS5zdG9yZU5hbWUsXG4gICAgICAgICAgICBjYXJ0LnByb2R1Y3QuU0tVLFxuICAgICAgICAgICAgY2FydC5wcm9kdWN0Lm5hbWUsXG4gICAgICAgICAgICBjYXJ0Lmdyb3VwLm5hbWUsXG4gICAgICAgICAgICBjYXJ0LnF1YW50aXR5LFxuICAgICAgICAgIF0uam9pbignLCcpXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNzdkRhdGE7XG59O1xuXG5jb25zdCBnZW5lcmF0ZUNTVkFzc2lnbiA9IGFzeW5jIChxdWVyeVBhcmFtczogVVJMU2VhcmNoUGFyYW1zKSA9PiB7XG4gIC8vIENTViBIZWFkZXJzXG4gIGNvbnN0IGNzdkRhdGEgPSBbJ2NyZWF0ZWRfYXQsdXNlcm5hbWUsdHlwZSxmcm9tX2dyb3VwLHRvX2dyb3VwLHNrdSxwcm9kdWN0X25hbWUscXVhbnRpdHknXTtcblxuICBhd2FpdCBmZXRjaFJlcG9ydEFQSShxdWVyeVBhcmFtcywgKGRhdGE6IElSZXBvcnRBc3NpZ25SZXNwb25zZSkgPT4ge1xuICAgIGRhdGEucmVwb3J0cy5mb3JFYWNoKChyZXBvcnQpID0+IHtcbiAgICAgIGlmIChzZWFyY2hTS1VJbnB1dC52YWx1ZSAmJiAhcmVwb3J0LnByb2R1Y3QuU0tVLmluY2x1ZGVzKHNlYXJjaFNLVUlucHV0LnZhbHVlKSApe1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjc3ZEYXRhLnB1c2goXG4gICAgICAgIFtcbiAgICAgICAgICBmb3JtYXREYXRlKHJlcG9ydC5jcmVhdGVkQXQpLFxuICAgICAgICAgIHJlcG9ydC51c2VyLnVzZXJuYW1lLFxuICAgICAgICAgIHJlcG9ydC50eXBlLFxuICAgICAgICAgIHJlcG9ydC5mcm9tR3JvdXAubmFtZSxcbiAgICAgICAgICByZXBvcnQuZ3JvdXAubmFtZSxcbiAgICAgICAgICByZXBvcnQucHJvZHVjdC5TS1UsXG4gICAgICAgICAgcmVwb3J0LnByb2R1Y3QubmFtZSxcbiAgICAgICAgICByZXBvcnQucXVhbnRpdHksXG4gICAgICAgIF0uam9pbignLCcpXG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGNzdkRhdGE7XG59O1xuXG5jb25zdCBnZW5lcmF0ZUNTVlNoZWxmTGlmZSA9IGFzeW5jIChxdWVyeVBhcmFtczogVVJMU2VhcmNoUGFyYW1zKSA9PiB7XG4gIC8vIENTViBIZWFkZXJzXG4gIGNvbnN0IGNzdkRhdGEgPSBbJ1NLVSwgc2hlbGZMaWZlU3RhcnQsIHNoZWxmTGlmZUVuZCwgcXVhbnRpdHlPcmRlcmVkLCBxdWFudGl0eVJlY2VpdmVkJ107XG5cbiAgYXdhaXQgZmV0Y2hSZXBvcnRBUEkocXVlcnlQYXJhbXMsIChkYXRhOiBJUmVwb3J0U2hlbGZMaWZlUmVzcG9uc2UpID0+IHtcbiAgICBkYXRhLnJlcG9ydFNoZWxmTGlmZUxpc3QuZm9yRWFjaCgocmVwb3J0KSA9PiB7XG4gICAgICBsZXQgcmVjZWl2ZWQ7XG4gICAgICBpZiAoIXJlcG9ydC5xdWFudGl0eVJlY2VpdmVkKSB7XG4gICAgICAgIHJlY2VpdmVkID0gJy0nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVjZWl2ZWQgPSByZXBvcnQucXVhbnRpdHlSZWNlaXZlZC50b1N0cmluZygpO1xuICAgICAgfVxuXG4gICAgICBcblxuICAgICAgaWYgKHNlYXJjaFNLVUlucHV0LnZhbHVlLmxlbmd0aCAmJiAhcmVwb3J0LnByb2R1Y3QuU0tVLmluY2x1ZGVzKHNlYXJjaFNLVUlucHV0LnZhbHVlKSApe1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNzdkRhdGEucHVzaChcbiAgICAgICAgW1xuICAgICAgICAgIHJlcG9ydC5wcm9kdWN0LlNLVSxcbiAgICAgICAgICBmb3JtYXREYXRlKHJlcG9ydC5zaGVsZkxpZmVTdGFydCksXG4gICAgICAgICAgZm9ybWF0RGF0ZShyZXBvcnQuc2hlbGZMaWZlU3RhcnQpLFxuICAgICAgICAgIHJlcG9ydC5xdWFudGl0eSxcbiAgICAgICAgICByZWNlaXZlZCxcbiAgICAgICAgXS5qb2luKCcsJylcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gY3N2RGF0YTtcbn07XG5cbmNvbnN0IGNzdkRvd25sb2FkTWFwOiBJQ1NWRG93bmxvYWRNYXAgPSB7XG4gIGV2ZW50czogZ2VuZXJhdGVDU1ZFdmVudHMsXG4gIHJlcXVlc3Rfc2hhcmU6IGdlbmVyYXRlQ1NWUmVxdWVzdFNoYXJlLFxuICBpbnZlbnRvcmllczogZ2VuZXJhdGVDU1ZJbnZlbnRvcmllcyxcbiAgYWRqdXN0bWVudDogZ2VuZXJhdGVDU1ZBZGp1c3RtZW50cyxcbiAgYXNzaWduOiBnZW5lcmF0ZUNTVkFzc2lnbixcbiAgaW5ib3VuZF9vcmRlcjogZ2VuZXJhdGVDU1ZJbmJvdW5kT3JkZXIsXG4gIHNoaXBwaW5nOiBnZW5lcmF0ZUNTVlNoaXBwaW5nLFxuICBzaGVsZl9saWZlOiBnZW5lcmF0ZUNTVlNoZWxmTGlmZSxcbn07XG5cbmNvbnN0IGZpbHRlcnNJZHMgPSBbXG4gICdyZXF1ZXN0LXNoYXJlLXR5cGUnLFxuICAnc2hpcHBpbmctdHlwZScsXG4gICd1c2VyLXNlbGVjdCcsXG4gICdmaWx0ZXItc3RhcnQtZGF0ZScsXG4gICdmaWx0ZXItc3RhcnQtZGF0ZS10bycsXG4gICdmaWx0ZXItZW5kLWRhdGUnLFxuICAnZmlsdGVyLWVuZC1kYXRlLXRvJyxcbiAgJ21hc3Rlci1ncm91cCcsXG4gICd0YXJnZXQtZ3JvdXAnLFxuICAnZmlsdGVyLWdyb3VwLWJyYW5kJyxcbiAgJ2ZpbHRlci1ncm91cC1sYW5ndWFnZScsXG4gICdmaWx0ZXItZ3JvdXAtcHJlbWlzZXMnLFxuICAnZmlsdGVyLWdyb3VwLWNhdGVnb3J5JyxcbiAgJ2ZpbHRlci1ncm91cC1ldmVudHMnLFxuICAnZmlsdGVyLXByb2R1Y3QtZ3JvdXAnLFxuICAnZ3JvdXAtZnJvbScsXG4gICdncm91cC10bycsXG4gICdkaXZpc2lvbi1zZWxlY3QnLFxuICAnc2hlbGYtbGlmZS1maWx0ZXItZXhwaXJlLWluJyxcbl07XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIC8vIERPTSBub2Rlc1xuICBjb25zdCByZXBvcnRUeXBlU2VsZWN0SFRNTCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXBvcnQtdHlwZS1zZWxlY3QnKSBhcyBIVE1MU2VsZWN0RWxlbWVudDtcbiAgY29uc3QgYWxsRmlsdGVyc0hUTUwgPSBmaWx0ZXJzSWRzLm1hcCgoaWQpID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSk7XG4gIGNvbnN0IHRhYmxlTG9hZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RhYmxlLXJlcG9ydC1sb2FkZXInKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgY29uc3QgY2xlYXJGaWx0ZXJzQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbHRlci1jbGVhci1idXR0b24nKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgY29uc3Qgc2VhcmNoUXVlcnlIVE1MID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaC1xdWVyeScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIGNvbnN0IHNlYXJjaFNrdUhUTUwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoLXNrdScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIGNvbnN0IGRvd25sb2FkQ1NWQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1dHRvbi1jc3YtZG93bmxvYWQnKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcblxuICBmb3IgKGNvbnN0IFtyZXBvcnRUeXBlLCBmaWx0ZXJzXSBvZiBPYmplY3QuZW50cmllcyhmaWx0ZXJzTWFwKSkge1xuICAgIGZpbHRlcnNNYXBbcmVwb3J0VHlwZV0gPSBmaWx0ZXJzLm1hcCgoaWQpID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkIGFzIHN0cmluZykpIGFzIEhUTUxFbGVtZW50W107XG4gIH1cblxuICAvLyBTaG93L3JlbW92ZSBmaWx0ZXJzIHdoZW4gY2hvb3NlIGV2ZW50IHJlcG9ydCB0eXBlXG4gIHJlcG9ydFR5cGVTZWxlY3RIVE1MLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0SFRNTCA9IGUudGFyZ2V0IGFzIEhUTUxTZWxlY3RFbGVtZW50O1xuXG4gICAgYWxsRmlsdGVyc0hUTUwuZm9yRWFjaCgoZmlsdGVySFRNTCkgPT4gZmlsdGVySFRNTC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKSk7XG4gICAgY29uc3QgdmlzaWJsZUZpbHRlcnMgPSBmaWx0ZXJzTWFwW3NlbGVjdEhUTUwudmFsdWVdIGFzIEhUTUxFbGVtZW50W107XG5cbiAgICB2aXNpYmxlRmlsdGVycy5mb3JFYWNoKChmaWx0ZXJIVE1MKSA9PiBmaWx0ZXJIVE1MLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpKTtcbiAgfSk7XG5cbiAgdGFibGVMb2FkZXIuY2xpY2soKTtcbiAgY2xlYXJGaWx0ZXJzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGFsbEZpbHRlcnNIVE1MLmZvckVhY2goKGZpbHRlckhUTUwpID0+IHtcbiAgICAgIGNvbnN0IGlucHV0ID0gZmlsdGVySFRNTC5xdWVyeVNlbGVjdG9yKCdpbnB1dCwgc2VsZWN0JykgYXMgSFRNTFNlbGVjdEVsZW1lbnQgfCBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgaW5wdXQudmFsdWUgPSAnJztcbiAgICB9KTtcbiAgICBzZWFyY2hRdWVyeUhUTUwudmFsdWUgPSAnJztcbiAgICBzZWFyY2hTa3VIVE1MLnZhbHVlID0gJyc7XG4gICAgdGFibGVMb2FkZXIuY2xpY2soKTtcbiAgfSk7XG4gIC8vIERvd25sb2FkIGNzdiBidXR0b25cbiAgZG93bmxvYWRDU1ZCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgZmlsdGVyc1F1ZXJ5UGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICAgIGFsbEZpbHRlcnNIVE1MLmZvckVhY2goKGZpbHRlckhUTUwpID0+IHtcbiAgICAgIGNvbnN0IGlucHV0ID0gZmlsdGVySFRNTC5xdWVyeVNlbGVjdG9yKCdpbnB1dCwgc2VsZWN0JykgYXMgSFRNTFNlbGVjdEVsZW1lbnQgfCBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgZmlsdGVyc1F1ZXJ5UGFyYW1zLmFwcGVuZChpbnB1dC5nZXRBdHRyaWJ1dGUoJ25hbWUnKSwgaW5wdXQudmFsdWUpO1xuICAgIH0pO1xuXG4gICAgZmlsdGVyc1F1ZXJ5UGFyYW1zLmFwcGVuZCgncScsIHNlYXJjaFF1ZXJ5SFRNTC52YWx1ZSk7XG4gICAgZmlsdGVyc1F1ZXJ5UGFyYW1zLmFwcGVuZCgncmVwb3J0X3R5cGUnLCByZXBvcnRUeXBlU2VsZWN0SFRNTC52YWx1ZSk7XG5cbiAgICBjb25zdCBjc3ZEYXRhID0gYXdhaXQgY3N2RG93bmxvYWRNYXBbcmVwb3J0VHlwZVNlbGVjdEhUTUwudmFsdWVdKGZpbHRlcnNRdWVyeVBhcmFtcyk7XG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtjc3ZEYXRhLmpvaW4oJ1xcbicpXSwgeyB0eXBlOiAndGV4dC9jc3YnIH0pO1xuICAgIGNvbnN0IHVybCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB1cmwpO1xuICAgIGEuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsICdyZXBvcnQuY3N2Jyk7XG4gICAgYS5jbGljaygpO1xuICAgIGEucmVtb3ZlKCk7XG4gIH0pO1xufSk7XG4iLCJleHBvcnQgY29uc3QgZm9ybWF0RGF0ZSA9IChkYXRlOiBzdHJpbmcpID0+IHtcbiAgY29uc3QgY3JlYXRlQXQgPSBuZXcgRGF0ZShkYXRlKTtcbiAgY29uc3QgeWVhciA9IGNyZWF0ZUF0LmdldEZ1bGxZZWFyKCk7XG4gIGNvbnN0IG1vbnRoID0gU3RyaW5nKGNyZWF0ZUF0LmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCAnMCcpOyAvLyBNb250aCBpcyAwLWJhc2VkXG4gIGNvbnN0IGRheSA9IFN0cmluZyhjcmVhdGVBdC5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsICcwJyk7XG4gIGNvbnN0IGhvdXJzID0gU3RyaW5nKGNyZWF0ZUF0LmdldEhvdXJzKCkpLnBhZFN0YXJ0KDIsICcwJyk7XG4gIGNvbnN0IG1pbnV0ZXMgPSBTdHJpbmcoY3JlYXRlQXQuZ2V0TWludXRlcygpKS5wYWRTdGFydCgyLCAnMCcpO1xuICByZXR1cm4gYCR7bW9udGh9LyR7ZGF5fS8ke3llYXJ9ICR7aG91cnN9OiR7bWludXRlc31gO1xufTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvcmVwb3J0LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9