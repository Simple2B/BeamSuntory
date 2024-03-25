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
        'target-sub-group',
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
        'target-sub-group',
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
        'target-sub-group',
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
        'target-sub-group',
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
    'target-sub-group',
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
        console.log('visibleFilters', visibleFilters);
        console.log('filtersMap', filtersMap);
        console.log('allFiltersHTML', allFiltersHTML);
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
    var groupSelect = document.getElementById('report-target-group-select');
    var groupIdInput = document.getElementById('report-group-id-hidden');
    groupSelect.addEventListener('change', function (e) {
        var option = groupSelect.querySelector("option[value=\"".concat(groupSelect.value, "\"]"));
        if (!option) {
            return;
        }
        groupIdInput.value = option.getAttribute('data-target-group-id');
        groupIdInput.click();
    });
    downloadCSVButton.addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
        var filtersQueryParams, csvData, blob, url, a;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filtersQueryParams = new URLSearchParams();
                    allFiltersHTML.forEach(function (filterHTML) {
                        var input = filterHTML.querySelector('input, select');
                        if (input.getAttribute('name') === 'group_id' && groupSelect) {
                            filtersQueryParams.append('target_group', groupSelect.value);
                            return;
                        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcmVwb3J0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVVBLG1FQUFxQztBQVVyQyxJQUFNLFVBQVUsR0FBZTtJQUM3QixNQUFNLEVBQUUsQ0FBQyxhQUFhLEVBQUUsbUJBQW1CLEVBQUUsc0JBQXNCLEVBQUUsaUJBQWlCLEVBQUUsb0JBQW9CLENBQUM7SUFDN0csYUFBYSxFQUFFLENBQUMsYUFBYSxFQUFFLG1CQUFtQixFQUFFLGlCQUFpQixDQUFDO0lBQ3RFLFdBQVcsRUFBRTtRQUNYLGFBQWE7UUFDYixtQkFBbUI7UUFDbkIsaUJBQWlCO1FBQ2pCLGNBQWM7UUFDZCxjQUFjO1FBQ2Qsa0JBQWtCO1FBQ2xCLG9CQUFvQjtRQUNwQix1QkFBdUI7UUFDdkIsdUJBQXVCO1FBQ3ZCLHlCQUF5QjtRQUN6QixxQkFBcUI7S0FDdEI7SUFDRCxVQUFVLEVBQUU7UUFDVixhQUFhO1FBQ2IsbUJBQW1CO1FBQ25CLGlCQUFpQjtRQUNqQixjQUFjO1FBQ2QsY0FBYztRQUNkLGtCQUFrQjtRQUNsQixvQkFBb0I7UUFDcEIsdUJBQXVCO1FBQ3ZCLHVCQUF1QjtRQUN2Qix5QkFBeUI7UUFDekIscUJBQXFCO0tBQ3RCO0lBQ0QsTUFBTSxFQUFFO1FBQ04sYUFBYTtRQUNiLFlBQVk7UUFDWixVQUFVO1FBQ1YsbUJBQW1CO1FBQ25CLGlCQUFpQjtRQUNqQixvQkFBb0I7UUFDcEIsdUJBQXVCO1FBQ3ZCLHVCQUF1QjtRQUN2Qix5QkFBeUI7S0FDMUI7SUFDRCxhQUFhLEVBQUU7UUFDYixtQkFBbUI7UUFDbkIsaUJBQWlCO1FBQ2pCLG9CQUFvQjtRQUNwQix1QkFBdUI7UUFDdkIseUJBQXlCO1FBQ3pCLHNCQUFzQjtLQUN2QjtJQUNELFFBQVEsRUFBRTtRQUNSLGlCQUFpQjtRQUNqQixjQUFjO1FBQ2Qsa0JBQWtCO1FBQ2xCLG1CQUFtQjtRQUNuQixpQkFBaUI7UUFDakIsb0JBQW9CO1FBQ3BCLHVCQUF1QjtRQUN2Qix5QkFBeUI7UUFDekIsdUJBQXVCO0tBQ3hCO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsbUJBQW1CO1FBQ25CLGlCQUFpQjtRQUNqQixjQUFjO1FBQ2QsY0FBYztRQUNkLGtCQUFrQjtRQUNsQixvQkFBb0I7UUFDcEIsdUJBQXVCO1FBQ3ZCLHVCQUF1QjtRQUN2Qix5QkFBeUI7UUFDekIsNkJBQTZCO0tBQzlCO0NBQ0YsQ0FBQztBQUVGLElBQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFxQixDQUFDO0FBRWpGLElBQU0sY0FBYyxHQUFHLFVBQU8sV0FBNEIsRUFBRSxRQUFnQzs7Ozs7Z0JBQ3RGLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBRVIscUJBQXFCLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO2dCQUN6RCxJQUFJLEdBQUcsQ0FBQzs7O3FCQUFFLEtBQUksSUFBSSxLQUFLO2dCQUN4QixHQUFHLEdBQUcsQ0FBQyxtQkFBWSxJQUFJLENBQUUsRUFBRSxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZELHFCQUFNLEtBQUssQ0FBQyxVQUFHLHFCQUFxQixTQUFHLEdBQUcsQ0FBRSxDQUFDOztnQkFBbkQsR0FBRyxHQUFHLFNBQTZDO2dCQUM1QyxlQUFJLEVBQUMsS0FBSztnQkFBQyxxQkFBTSxHQUFHLENBQUMsSUFBSSxFQUFFOztnQkFBbEMsSUFBSSxHQUFHLGNBQVcsU0FBZ0IsRUFBQztnQkFFekMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNmLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQzs7O2dCQU5FLElBQUksRUFBRTs7Ozs7S0FRekMsQ0FBQztBQUVGLElBQU0saUJBQWlCLEdBQUcsVUFBTyxXQUE0Qjs7Ozs7Z0JBQ3JELE9BQU8sR0FBRyxDQUFDLGtGQUFrRixDQUFDLENBQUM7Z0JBQ3JHLHFCQUFNLGNBQWMsQ0FBQyxXQUFXLEVBQUUsVUFBQyxJQUEyQjt3QkFDNUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNOzRCQUMxQixNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO2dDQUNwQyxJQUFJLGNBQWMsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFO29DQUM1RSxPQUFPO2lDQUNSO2dDQUVELE9BQU8sQ0FBQyxJQUFJLENBQ1Y7b0NBQ0UsTUFBTSxDQUFDLElBQUk7b0NBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRO29DQUNwQixNQUFNLENBQUMsU0FBUztvQ0FDaEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUztvQ0FDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO29DQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07b0NBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRztvQ0FDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJO2lDQUNsQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FDWixDQUFDOzRCQUNKLENBQUMsQ0FBQyxDQUFDO3dCQUNMLENBQUMsQ0FBQyxDQUFDO29CQUNMLENBQUMsQ0FBQzs7Z0JBckJGLFNBcUJFLENBQUM7Z0JBQ0gsc0JBQU8sT0FBTyxFQUFDOzs7S0FDaEIsQ0FBQztBQUVGLElBQU0sdUJBQXVCLEdBQUcsVUFBTyxXQUE0Qjs7Ozs7Z0JBQzNELE9BQU8sR0FBRztvQkFDZCxnSEFBZ0g7aUJBQ2pILENBQUM7Z0JBQ0YscUJBQU0sY0FBYyxDQUFDLFdBQVcsRUFBRSxVQUFDLElBQWlDO3dCQUNsRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU07NEJBQzFCLElBQUksY0FBYyxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dDQUMzRixPQUFPOzZCQUNSOzRCQUVELE9BQU8sQ0FBQyxJQUFJLENBQ1Y7Z0NBQ0UsTUFBTSxDQUFDLElBQUk7Z0NBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRO2dDQUNwQixNQUFNLENBQUMsU0FBUztnQ0FDaEIsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNO2dDQUMxQixNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJO2dDQUNsQyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJO2dDQUM5QixNQUFNLENBQUMsWUFBWSxDQUFDLGNBQWM7Z0NBQ2xDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUc7Z0NBQy9CLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUk7NkJBQ2pDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUNaLENBQUM7d0JBQ0osQ0FBQyxDQUFDLENBQUM7b0JBQ0wsQ0FBQyxDQUFDOztnQkFwQkYsU0FvQkUsQ0FBQztnQkFDSCxzQkFBTyxPQUFPLEVBQUM7OztLQUNoQixDQUFDO0FBRUYsSUFBTSxzQkFBc0IsR0FBRyxVQUFPLFdBQTRCOzs7OztnQkFFMUQsT0FBTyxHQUFHLENBQUMsNENBQTRDLENBQUMsQ0FBQztnQkFDL0QscUJBQU0sY0FBYyxDQUFDLFdBQVcsRUFBRSxVQUFDLElBQWdDO3dCQUNqRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU07NEJBQzFCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQ0FDaEUsSUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUU3RCxJQUFJLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7b0NBQ3JELE9BQU8sQ0FBQyxJQUFJLENBQ1Y7d0NBQ0UsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJO3dDQUNuQixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUc7d0NBQ2xCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSTt3Q0FDakIsZ0JBQWdCLENBQUMsZUFBZTt3Q0FDaEMsc0JBQVUsRUFBQyxNQUFNLENBQUMsU0FBUyxDQUFDO3FDQUM3QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FDWixDQUFDO2lDQUNIOzZCQUNGO3dCQUNILENBQUMsQ0FBQyxDQUFDO29CQUNMLENBQUMsQ0FBQzs7Z0JBbEJGLFNBa0JFLENBQUM7Z0JBQ0gsc0JBQU8sT0FBTyxFQUFDOzs7S0FDaEIsQ0FBQztBQUVGLElBQU0sc0JBQXNCLEdBQUcsVUFBTyxXQUE0Qjs7Ozs7Z0JBRTFELE9BQU8sR0FBRztvQkFDZCxzSEFBc0g7aUJBQ3ZILENBQUM7Z0JBQ0YscUJBQU0sY0FBYyxDQUFDLFdBQVcsRUFBRSxVQUFDLElBQTJCO3dCQUM1RCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU07NEJBQzFCLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQUMsWUFBWTtnQ0FDekMsSUFBSSxjQUFjLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQ0FDOUUsT0FBTztpQ0FDUjtnQ0FDRCxPQUFPLENBQUMsSUFBSSxDQUNWO29DQUNFLHNCQUFVLEVBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztvQ0FDNUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJO29DQUNuQixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUc7b0NBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUTtvQ0FDcEIsWUFBWSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSTtvQ0FDbkMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJO29DQUN2QixZQUFZLENBQUMsU0FBUyxDQUFDLElBQUk7b0NBQzNCLFlBQVksQ0FBQyxjQUFjO29DQUMzQixZQUFZLENBQUMsYUFBYTtvQ0FDMUIsWUFBWSxDQUFDLEtBQUs7b0NBQ2xCLE1BQU0sQ0FBQyxJQUFJO2lDQUNaLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUNaLENBQUM7NEJBQ0osQ0FBQyxDQUFDLENBQUM7d0JBQ0wsQ0FBQyxDQUFDLENBQUM7b0JBQ0wsQ0FBQyxDQUFDOztnQkF2QkYsU0F1QkUsQ0FBQztnQkFDSCxzQkFBTyxPQUFPLEVBQUM7OztLQUNoQixDQUFDO0FBRUYsSUFBTSx1QkFBdUIsR0FBRyxVQUFPLFdBQTRCOzs7OztnQkFDM0QsT0FBTyxHQUFHLENBQUMsMkVBQTJFLENBQUMsQ0FBQztnQkFDOUYscUJBQU0sY0FBYyxDQUFDLFdBQVcsRUFBRSxVQUFDLElBQWlDO3dCQUNsRSxJQUFNLGNBQWMsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO3dCQUN4RCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU07NEJBQzFCLE1BQU0sQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFVBQUMsaUJBQWlCO2dDQUM5RCxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsVUFBQyxvQkFBb0I7b0NBQ25FLElBQUksY0FBYyxDQUFDLEtBQUssSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRTt3Q0FDekYsT0FBTztxQ0FDUjtvQ0FDRCxJQUFJLGNBQWMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFO3dDQUMvRSxPQUFPO3FDQUNSO29DQUNELE9BQU8sQ0FBQyxJQUFJLENBQ1Y7d0NBQ0Usc0JBQVUsRUFBQyxNQUFNLENBQUMsU0FBUyxDQUFDO3dDQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVE7d0NBQ3BCLE1BQU0sQ0FBQyxJQUFJO3dDQUNYLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSzt3Q0FDekIsaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUk7d0NBQzlCLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxHQUFHO3dDQUM3QixvQkFBb0IsQ0FBQyxLQUFLLENBQUMsSUFBSTt3Q0FDL0Isb0JBQW9CLENBQUMsUUFBUTtxQ0FDOUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQ1osQ0FBQztnQ0FDSixDQUFDLENBQUMsQ0FBQztnQ0FDSCxJQUFJLENBQUMsaUJBQWlCLENBQUMscUJBQXFCLENBQUMsTUFBTSxFQUFFO29DQUNuRCxPQUFPLENBQUMsSUFBSSxDQUNWO3dDQUNFLHNCQUFVLEVBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQzt3Q0FDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRO3dDQUNwQixNQUFNLENBQUMsSUFBSTt3Q0FDWCxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUs7d0NBQ3pCLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJO3dDQUM5QixpQkFBaUIsQ0FBQyxPQUFPLENBQUMsR0FBRztxQ0FDOUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQ1osQ0FBQztpQ0FDSDs0QkFDSCxDQUFDLENBQUMsQ0FBQzt3QkFDTCxDQUFDLENBQUMsQ0FBQztvQkFDTCxDQUFDLENBQUM7O2dCQXRDRixTQXNDRSxDQUFDO2dCQUNILHNCQUFPLE9BQU8sRUFBQzs7O0tBQ2hCLENBQUM7QUFFRixJQUFNLG1CQUFtQixHQUFHLFVBQU8sV0FBNEI7Ozs7O2dCQUV2RCxPQUFPLEdBQUc7b0JBQ2Qsb0dBQW9HO2lCQUNyRyxDQUFDO2dCQUNGLHFCQUFNLGNBQWMsQ0FBQyxXQUFXLEVBQUUsVUFBQyxJQUE2Qjt3QkFDOUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNOzRCQUMxQixNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO2dDQUNwQyxJQUFJLGNBQWMsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFO29DQUM1RSxPQUFPO2lDQUNSO2dDQUNELE9BQU8sQ0FBQyxJQUFJLENBQ1Y7b0NBQ0UsTUFBTSxDQUFDLElBQUk7b0NBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRO29DQUNwQixNQUFNLENBQUMsU0FBUztvQ0FDaEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNO29DQUN6QixNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTO29DQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7b0NBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSTtvQ0FDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJO29DQUNmLElBQUksQ0FBQyxRQUFRO2lDQUNkLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUNaLENBQUM7NEJBQ0osQ0FBQyxDQUFDLENBQUM7d0JBQ0wsQ0FBQyxDQUFDLENBQUM7b0JBQ0wsQ0FBQyxDQUFDOztnQkFyQkYsU0FxQkUsQ0FBQztnQkFFSCxzQkFBTyxPQUFPLEVBQUM7OztLQUNoQixDQUFDO0FBRUYsSUFBTSxpQkFBaUIsR0FBRyxVQUFPLFdBQTRCOzs7OztnQkFFckQsT0FBTyxHQUFHLENBQUMsd0VBQXdFLENBQUMsQ0FBQztnQkFFM0YscUJBQU0sY0FBYyxDQUFDLFdBQVcsRUFBRSxVQUFDLElBQTJCO3dCQUM1RCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU07NEJBQzFCLElBQUksY0FBYyxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0NBQzlFLE9BQU87NkJBQ1I7NEJBQ0QsT0FBTyxDQUFDLElBQUksQ0FDVjtnQ0FDRSxzQkFBVSxFQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7Z0NBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUTtnQ0FDcEIsTUFBTSxDQUFDLElBQUk7Z0NBQ1gsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJO2dDQUNyQixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUk7Z0NBQ2pCLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRztnQ0FDbEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJO2dDQUNuQixNQUFNLENBQUMsUUFBUTs2QkFDaEIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQ1osQ0FBQzt3QkFDSixDQUFDLENBQUMsQ0FBQztvQkFDTCxDQUFDLENBQUM7O2dCQWxCRixTQWtCRSxDQUFDO2dCQUNILHNCQUFPLE9BQU8sRUFBQzs7O0tBQ2hCLENBQUM7QUFFRixJQUFNLG9CQUFvQixHQUFHLFVBQU8sV0FBNEI7Ozs7O2dCQUV4RCxPQUFPLEdBQUcsQ0FBQyxzRUFBc0UsQ0FBQyxDQUFDO2dCQUV6RixxQkFBTSxjQUFjLENBQUMsV0FBVyxFQUFFLFVBQUMsSUFBOEI7d0JBQy9ELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNOzRCQUN0QyxJQUFJLFFBQVEsQ0FBQzs0QkFDYixJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFO2dDQUM1QixRQUFRLEdBQUcsR0FBRyxDQUFDOzZCQUNoQjtpQ0FBTTtnQ0FDTCxRQUFRLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDOzZCQUMvQzs0QkFFRCxJQUFJLGNBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQ0FDckYsT0FBTzs2QkFDUjs0QkFFRCxPQUFPLENBQUMsSUFBSSxDQUNWO2dDQUNFLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRztnQ0FDbEIsc0JBQVUsRUFBQyxNQUFNLENBQUMsY0FBYyxDQUFDO2dDQUNqQyxzQkFBVSxFQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUM7Z0NBQ2pDLE1BQU0sQ0FBQyxRQUFRO2dDQUNmLFFBQVE7NkJBQ1QsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQ1osQ0FBQzt3QkFDSixDQUFDLENBQUMsQ0FBQztvQkFDTCxDQUFDLENBQUM7O2dCQXZCRixTQXVCRSxDQUFDO2dCQUNILHNCQUFPLE9BQU8sRUFBQzs7O0tBQ2hCLENBQUM7QUFFRixJQUFNLGNBQWMsR0FBb0I7SUFDdEMsTUFBTSxFQUFFLGlCQUFpQjtJQUN6QixhQUFhLEVBQUUsdUJBQXVCO0lBQ3RDLFdBQVcsRUFBRSxzQkFBc0I7SUFDbkMsVUFBVSxFQUFFLHNCQUFzQjtJQUNsQyxNQUFNLEVBQUUsaUJBQWlCO0lBQ3pCLGFBQWEsRUFBRSx1QkFBdUI7SUFDdEMsUUFBUSxFQUFFLG1CQUFtQjtJQUM3QixVQUFVLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUM7QUFFRixJQUFNLFVBQVUsR0FBRztJQUNqQixvQkFBb0I7SUFDcEIsZUFBZTtJQUNmLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsc0JBQXNCO0lBQ3RCLGlCQUFpQjtJQUNqQixvQkFBb0I7SUFDcEIsY0FBYztJQUNkLGNBQWM7SUFDZCxrQkFBa0I7SUFDbEIsb0JBQW9CO0lBQ3BCLHVCQUF1QjtJQUN2Qix1QkFBdUI7SUFDdkIseUJBQXlCO0lBQ3pCLHFCQUFxQjtJQUNyQixzQkFBc0I7SUFDdEIsWUFBWTtJQUNaLFVBQVU7SUFDVixpQkFBaUI7SUFDakIsNkJBQTZCO0NBQzlCLENBQUM7QUFFRixRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUU7SUFDNUMsWUFBWTtJQUNaLElBQU0sb0JBQW9CLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBc0IsQ0FBQztJQUNoRyxJQUFNLGNBQWMsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQUMsRUFBRSxJQUFLLGVBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEVBQTNCLENBQTJCLENBQUMsQ0FBQztJQUMzRSxJQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUFzQixDQUFDO0lBQ3hGLElBQU0sa0JBQWtCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBc0IsQ0FBQztJQUMvRixJQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBcUIsQ0FBQztJQUNwRixJQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBcUIsQ0FBQztJQUNoRixJQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQXNCLENBQUM7SUFFOUYsS0FBb0MsVUFBMEIsRUFBMUIsV0FBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBMUIsY0FBMEIsRUFBMUIsSUFBMEIsRUFBRTtRQUFyRCxlQUFxQixFQUFwQixVQUFVLFVBQUUsT0FBTztRQUM3QixVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEVBQUUsSUFBSyxlQUFRLENBQUMsY0FBYyxDQUFDLEVBQVksQ0FBQyxFQUFyQyxDQUFxQyxDQUFrQixDQUFDO0tBQ3RHO0lBRUQsb0RBQW9EO0lBQ3BELG9CQUFvQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxVQUFDLENBQUM7UUFDaEQsSUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFDLE1BQTJCLENBQUM7UUFFakQsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFVBQVUsSUFBSyxpQkFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQWxDLENBQWtDLENBQUMsQ0FBQztRQUMzRSxJQUFNLGNBQWMsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBa0IsQ0FBQztRQUNyRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFFOUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFVBQVUsSUFBSyxpQkFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQXJDLENBQXFDLENBQUMsQ0FBQztJQUNoRixDQUFDLENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNwQixrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDM0MsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFVBQVU7WUFDaEMsSUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQXlDLENBQUM7WUFDaEcsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDSCxlQUFlLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUMzQixhQUFhLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUN6QixXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFDSCxzQkFBc0I7SUFDdEIsSUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyw0QkFBNEIsQ0FBc0IsQ0FBQztJQUMvRixJQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHdCQUF3QixDQUFxQixDQUFDO0lBQzNGLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsVUFBQyxDQUFDO1FBQ3ZDLElBQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUMseUJBQWlCLFdBQVcsQ0FBQyxLQUFLLFFBQUksQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxPQUFPO1NBQ1I7UUFDRCxZQUFZLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNqRSxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFDSCxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7Ozs7O29CQUNwQyxrQkFBa0IsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO29CQUNqRCxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQUMsVUFBVTt3QkFDaEMsSUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQXlDLENBQUM7d0JBQ2hHLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksV0FBVyxFQUFFOzRCQUM1RCxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDN0QsT0FBTTt5QkFDUDt3QkFDRCxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3JFLENBQUMsQ0FBQyxDQUFDO29CQUVILGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN0RCxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUVyRCxxQkFBTSxjQUFjLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsa0JBQWtCLENBQUM7O29CQUE5RSxPQUFPLEdBQUcsU0FBb0U7b0JBQzlFLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO29CQUM1RCxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3ZDLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN0QyxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDNUIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7b0JBQ3pDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDVixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7U0FDWixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUMxY0ksSUFBTSxVQUFVLEdBQUcsVUFBQyxJQUFZO0lBQ3JDLElBQUcsQ0FBQyxJQUFJLEVBQUU7UUFDUixPQUFPLE1BQU0sQ0FBQztLQUNmO0lBRUQsSUFBTSxRQUFRLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3BDLElBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLG1CQUFtQjtJQUNuRixJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN4RCxJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMzRCxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMvRCxPQUFPLFVBQUcsS0FBSyxjQUFJLEdBQUcsY0FBSSxJQUFJLGNBQUksS0FBSyxjQUFJLE9BQU8sQ0FBRSxDQUFDO0FBQ3ZELENBQUMsQ0FBQztBQVpXLGtCQUFVLGNBWXJCOzs7Ozs7O1VDWkY7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3N0YXRpYy8uL3NyYy9yZXBvcnQudHMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vc3JjL3V0aWxzLnRzIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSVJlcG9ydFJlcXVlc3RTaGFyZVJlc3BvbnNlLFxuICBJRXZlbnRzUmVwb3J0UmVzcG9uc2UsXG4gIElJbnZlbnRvcmllc1JlcG9ydFJlc3BvbnNlLFxuICBJUmVwb3J0QWRqdXN0UmVzcG9uc2UsXG4gIElSZXBvcnRJbmJvdW5kT3JkZXJSZXNwb25zZSxcbiAgSVJlcG9ydFNoaXBwaW5nUmVzcG9uc2UsXG4gIElSZXBvcnRBc3NpZ25SZXNwb25zZSxcbiAgSVJlcG9ydFNoZWxmTGlmZVJlc3BvbnNlLFxufSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IGZvcm1hdERhdGUgfSBmcm9tICcuL3V0aWxzJztcblxuaW50ZXJmYWNlIElGaWx0ZXJNYXAge1xuICBbaW5kZXg6IHN0cmluZ106IHN0cmluZ1tdIHwgSFRNTEVsZW1lbnRbXTtcbn1cblxuaW50ZXJmYWNlIElDU1ZEb3dubG9hZE1hcCB7XG4gIFtpbmRleDogc3RyaW5nXTogKHF1ZXJ5OiBVUkxTZWFyY2hQYXJhbXMpID0+IFByb21pc2U8c3RyaW5nW10+O1xufVxuXG5jb25zdCBmaWx0ZXJzTWFwOiBJRmlsdGVyTWFwID0ge1xuICBldmVudHM6IFsndXNlci1zZWxlY3QnLCAnZmlsdGVyLXN0YXJ0LWRhdGUnLCAnZmlsdGVyLXN0YXJ0LWRhdGUtdG8nLCAnZmlsdGVyLWVuZC1kYXRlJywgJ2ZpbHRlci1lbmQtZGF0ZS10byddLFxuICByZXF1ZXN0X3NoYXJlOiBbJ3VzZXItc2VsZWN0JywgJ2ZpbHRlci1zdGFydC1kYXRlJywgJ2ZpbHRlci1lbmQtZGF0ZSddLFxuICBpbnZlbnRvcmllczogW1xuICAgICd1c2VyLXNlbGVjdCcsXG4gICAgJ2ZpbHRlci1zdGFydC1kYXRlJyxcbiAgICAnZmlsdGVyLWVuZC1kYXRlJyxcbiAgICAnbWFzdGVyLWdyb3VwJyxcbiAgICAndGFyZ2V0LWdyb3VwJyxcbiAgICAndGFyZ2V0LXN1Yi1ncm91cCcsXG4gICAgJ2ZpbHRlci1ncm91cC1icmFuZCcsXG4gICAgJ2ZpbHRlci1ncm91cC1sYW5ndWFnZScsXG4gICAgJ2ZpbHRlci1ncm91cC1wcmVtaXNlcycsXG4gICAgJ2ZpbHRlci1ncm91cC1jYXRlZ29yaWVzJyxcbiAgICAnZmlsdGVyLWdyb3VwLWV2ZW50cycsXG4gIF0sXG4gIGFkanVzdG1lbnQ6IFtcbiAgICAndXNlci1zZWxlY3QnLFxuICAgICdmaWx0ZXItc3RhcnQtZGF0ZScsXG4gICAgJ2ZpbHRlci1lbmQtZGF0ZScsXG4gICAgJ21hc3Rlci1ncm91cCcsXG4gICAgJ3RhcmdldC1ncm91cCcsXG4gICAgJ3RhcmdldC1zdWItZ3JvdXAnLFxuICAgICdmaWx0ZXItZ3JvdXAtYnJhbmQnLFxuICAgICdmaWx0ZXItZ3JvdXAtbGFuZ3VhZ2UnLFxuICAgICdmaWx0ZXItZ3JvdXAtcHJlbWlzZXMnLFxuICAgICdmaWx0ZXItZ3JvdXAtY2F0ZWdvcmllcycsXG4gICAgJ2ZpbHRlci1ncm91cC1ldmVudHMnLFxuICBdLFxuICBhc3NpZ246IFtcbiAgICAndXNlci1zZWxlY3QnLFxuICAgICdncm91cC1mcm9tJyxcbiAgICAnZ3JvdXAtdG8nLFxuICAgICdmaWx0ZXItc3RhcnQtZGF0ZScsXG4gICAgJ2ZpbHRlci1lbmQtZGF0ZScsXG4gICAgJ2ZpbHRlci1ncm91cC1icmFuZCcsXG4gICAgJ2ZpbHRlci1ncm91cC1sYW5ndWFnZScsXG4gICAgJ2ZpbHRlci1ncm91cC1wcmVtaXNlcycsXG4gICAgJ2ZpbHRlci1ncm91cC1jYXRlZ29yaWVzJyxcbiAgXSxcbiAgaW5ib3VuZF9vcmRlcjogW1xuICAgICdmaWx0ZXItc3RhcnQtZGF0ZScsXG4gICAgJ2ZpbHRlci1lbmQtZGF0ZScsXG4gICAgJ2ZpbHRlci1ncm91cC1icmFuZCcsXG4gICAgJ2ZpbHRlci1ncm91cC1wcmVtaXNlcycsXG4gICAgJ2ZpbHRlci1ncm91cC1jYXRlZ29yaWVzJyxcbiAgICAnZmlsdGVyLXByb2R1Y3QtZ3JvdXAnLFxuICBdLFxuICBzaGlwcGluZzogW1xuICAgICdkaXZpc2lvbi1zZWxlY3QnLFxuICAgICd0YXJnZXQtZ3JvdXAnLFxuICAgICd0YXJnZXQtc3ViLWdyb3VwJyxcbiAgICAnZmlsdGVyLXN0YXJ0LWRhdGUnLFxuICAgICdmaWx0ZXItZW5kLWRhdGUnLFxuICAgICdmaWx0ZXItZ3JvdXAtYnJhbmQnLFxuICAgICdmaWx0ZXItZ3JvdXAtbGFuZ3VhZ2UnLFxuICAgICdmaWx0ZXItZ3JvdXAtY2F0ZWdvcmllcycsXG4gICAgJ2ZpbHRlci1ncm91cC1wcmVtaXNlcycsXG4gIF0sXG4gIHNoZWxmX2xpZmU6IFtcbiAgICAnZmlsdGVyLXN0YXJ0LWRhdGUnLFxuICAgICdmaWx0ZXItZW5kLWRhdGUnLFxuICAgICdtYXN0ZXItZ3JvdXAnLFxuICAgICd0YXJnZXQtZ3JvdXAnLFxuICAgICd0YXJnZXQtc3ViLWdyb3VwJyxcbiAgICAnZmlsdGVyLWdyb3VwLWJyYW5kJyxcbiAgICAnZmlsdGVyLWdyb3VwLWxhbmd1YWdlJyxcbiAgICAnZmlsdGVyLWdyb3VwLXByZW1pc2VzJyxcbiAgICAnZmlsdGVyLWdyb3VwLWNhdGVnb3JpZXMnLFxuICAgICdzaGVsZi1saWZlLWZpbHRlci1leHBpcmUtaW4nLFxuICBdLFxufTtcblxuY29uc3Qgc2VhcmNoU0tVSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoLXNrdScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5cbmNvbnN0IGZldGNoUmVwb3J0QVBJID0gYXN5bmMgKHF1ZXJ5UGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMsIGNhbGxiYWNrOiAoZGF0YTogT2JqZWN0KSA9PiB2b2lkKSA9PiB7XG4gIGxldCBwYWdlcyA9IDE7XG5cbiAgY29uc3QgdXJsV2l0aG91dFF1ZXJ5UGFyYW1zID0gbG9jYXRpb24ub3JpZ2luICsgbG9jYXRpb24ucGF0aG5hbWU7XG4gIGZvciAobGV0IHBhZ2UgPSAxOyBwYWdlIDw9IHBhZ2VzOyBwYWdlKyspIHtcbiAgICBjb25zdCB1cmwgPSBbYGFwaT9wYWdlPSR7cGFnZX1gLCBxdWVyeVBhcmFtcy50b1N0cmluZygpXS5qb2luKCcmJyk7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYCR7dXJsV2l0aG91dFF1ZXJ5UGFyYW1zfSR7dXJsfWApO1xuICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGF3YWl0IHJlcy5qc29uKCkpO1xuXG4gICAgY2FsbGJhY2soZGF0YSk7XG4gICAgcGFnZXMgPSBkYXRhLnBhZ2luYXRpb24ucGFnZXM7XG4gIH1cbn07XG5cbmNvbnN0IGdlbmVyYXRlQ1NWRXZlbnRzID0gYXN5bmMgKHF1ZXJ5UGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMpID0+IHtcbiAgY29uc3QgY3N2RGF0YSA9IFsnYWN0aW9uX3R5cGUsdXNlcixjcmVhdGVkX2F0LHN0b3JlLGV2ZW50X2RhdGVfZnJvbSxldmVudF9kYXRlX3RvLHNrdSxwcm9kdWN0X25hbWUnXTtcbiAgYXdhaXQgZmV0Y2hSZXBvcnRBUEkocXVlcnlQYXJhbXMsIChkYXRhOiBJRXZlbnRzUmVwb3J0UmVzcG9uc2UpID0+IHtcbiAgICBkYXRhLnJlcG9ydHMuZm9yRWFjaCgocmVwb3J0KSA9PiB7XG4gICAgICByZXBvcnQuc2hpcFJlcXVlc3QuY2FydHMuZm9yRWFjaCgoY2FydCkgPT4ge1xuICAgICAgICBpZiAoc2VhcmNoU0tVSW5wdXQudmFsdWUgJiYgIWNhcnQucHJvZHVjdC5TS1UuaW5jbHVkZXMoc2VhcmNoU0tVSW5wdXQudmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY3N2RGF0YS5wdXNoKFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIHJlcG9ydC50eXBlLFxuICAgICAgICAgICAgcmVwb3J0LnVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgICByZXBvcnQuY3JlYXRlZEF0LFxuICAgICAgICAgICAgcmVwb3J0LnNoaXBSZXF1ZXN0LnN0b3JlLnN0b3JlTmFtZSxcbiAgICAgICAgICAgIGNhcnQuZXZlbnQuZGF0ZUZyb20sXG4gICAgICAgICAgICBjYXJ0LmV2ZW50LmRhdGVUbyxcbiAgICAgICAgICAgIGNhcnQucHJvZHVjdC5TS1UsXG4gICAgICAgICAgICBjYXJ0LnByb2R1Y3QubmFtZSxcbiAgICAgICAgICBdLmpvaW4oJywnKVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gY3N2RGF0YTtcbn07XG5cbmNvbnN0IGdlbmVyYXRlQ1NWUmVxdWVzdFNoYXJlID0gYXN5bmMgKHF1ZXJ5UGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMpID0+IHtcbiAgY29uc3QgY3N2RGF0YSA9IFtcbiAgICAnYWN0aW9uX3R5cGUsdXNlcixjcmVhdGVkX2F0LGN1cnJlbnRfc2hhcmVfcmVxdWVzdF9zdGF0dXMsZ3JvdXBfZnJvbSxncm91cF90byxkZXNpcmVkX3F1YW50aXR5LHNrdSxwcm9kdWN0X25hbWUnLFxuICBdO1xuICBhd2FpdCBmZXRjaFJlcG9ydEFQSShxdWVyeVBhcmFtcywgKGRhdGE6IElSZXBvcnRSZXF1ZXN0U2hhcmVSZXNwb25zZSkgPT4ge1xuICAgIGRhdGEucmVwb3J0cy5mb3JFYWNoKChyZXBvcnQpID0+IHtcbiAgICAgIGlmIChzZWFyY2hTS1VJbnB1dC52YWx1ZSAmJiAhcmVwb3J0LnJlcXVlc3RTaGFyZS5wcm9kdWN0LlNLVS5pbmNsdWRlcyhzZWFyY2hTS1VJbnB1dC52YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjc3ZEYXRhLnB1c2goXG4gICAgICAgIFtcbiAgICAgICAgICByZXBvcnQudHlwZSxcbiAgICAgICAgICByZXBvcnQudXNlci51c2VybmFtZSxcbiAgICAgICAgICByZXBvcnQuY3JlYXRlZEF0LFxuICAgICAgICAgIHJlcG9ydC5yZXF1ZXN0U2hhcmUuc3RhdHVzLFxuICAgICAgICAgIHJlcG9ydC5yZXF1ZXN0U2hhcmUuZnJvbUdyb3VwLm5hbWUsXG4gICAgICAgICAgcmVwb3J0LnJlcXVlc3RTaGFyZS5ncm91cC5uYW1lLFxuICAgICAgICAgIHJlcG9ydC5yZXF1ZXN0U2hhcmUuZGVzaXJlUXVhbnRpdHksXG4gICAgICAgICAgcmVwb3J0LnJlcXVlc3RTaGFyZS5wcm9kdWN0LlNLVSxcbiAgICAgICAgICByZXBvcnQucmVxdWVzdFNoYXJlLnByb2R1Y3QubmFtZSxcbiAgICAgICAgXS5qb2luKCcsJylcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gY3N2RGF0YTtcbn07XG5cbmNvbnN0IGdlbmVyYXRlQ1NWSW52ZW50b3JpZXMgPSBhc3luYyAocXVlcnlQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcykgPT4ge1xuICAvLyBDU1YgSGVhZGVyc1xuICBjb25zdCBjc3ZEYXRhID0gWydwcm9kdWN0X25hbWUsc2t1LGdyb3VwLHF1YW50aXR5LGNyZWF0ZWRfYXQnXTtcbiAgYXdhaXQgZmV0Y2hSZXBvcnRBUEkocXVlcnlQYXJhbXMsIChkYXRhOiBJSW52ZW50b3JpZXNSZXBvcnRSZXNwb25zZSkgPT4ge1xuICAgIGRhdGEucmVwb3J0cy5mb3JFYWNoKChyZXBvcnQpID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVwb3J0LnByb2R1Y3Qud2FyZWhvdXNlUHJvZHVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgd2FyZWhvdXNlUHJvZHVjdCA9IHJlcG9ydC5wcm9kdWN0LndhcmVob3VzZVByb2R1Y3RzW2ldO1xuXG4gICAgICAgIGlmICh3YXJlaG91c2VQcm9kdWN0Lmdyb3VwLm5hbWUgPT09IHJlcG9ydC5ncm91cC5uYW1lKSB7XG4gICAgICAgICAgY3N2RGF0YS5wdXNoKFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICByZXBvcnQucHJvZHVjdC5uYW1lLFxuICAgICAgICAgICAgICByZXBvcnQucHJvZHVjdC5TS1UsXG4gICAgICAgICAgICAgIHJlcG9ydC5ncm91cC5uYW1lLFxuICAgICAgICAgICAgICB3YXJlaG91c2VQcm9kdWN0LnByb2R1Y3RRdWFudGl0eSxcbiAgICAgICAgICAgICAgZm9ybWF0RGF0ZShyZXBvcnQuY3JlYXRlZEF0KSxcbiAgICAgICAgICAgIF0uam9pbignLCcpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGNzdkRhdGE7XG59O1xuXG5jb25zdCBnZW5lcmF0ZUNTVkFkanVzdG1lbnRzID0gYXN5bmMgKHF1ZXJ5UGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMpID0+IHtcbiAgLy8gQ1NWIEhlYWRlcnNcbiAgY29uc3QgY3N2RGF0YSA9IFtcbiAgICAnY3JlYXRlZF9hdCxwcm9kdWN0X25hbWUsc2t1LHVzZXJuYW1lLG1hc3Rlcl9ncm91cCxncm91cCx3YXJlaG91c2UscXVhbnRpdHlfYmVmb3JlLHF1YW50aXR5X2FmdGVyLHF1YW50aXR5X2RlbHRhLG5vdGUnLFxuICBdO1xuICBhd2FpdCBmZXRjaFJlcG9ydEFQSShxdWVyeVBhcmFtcywgKGRhdGE6IElSZXBvcnRBZGp1c3RSZXNwb25zZSkgPT4ge1xuICAgIGRhdGEucmVwb3J0cy5mb3JFYWNoKChhZGp1c3QpID0+IHtcbiAgICAgIGFkanVzdC5hZGp1c3RHcm91cFF0eS5mb3JFYWNoKChyZXBvcnRBZGp1c3QpID0+IHtcbiAgICAgICAgaWYgKHNlYXJjaFNLVUlucHV0LnZhbHVlICYmICFhZGp1c3QucHJvZHVjdC5TS1UuaW5jbHVkZXMoc2VhcmNoU0tVSW5wdXQudmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNzdkRhdGEucHVzaChcbiAgICAgICAgICBbXG4gICAgICAgICAgICBmb3JtYXREYXRlKGFkanVzdC5jcmVhdGVkQXQpLFxuICAgICAgICAgICAgYWRqdXN0LnByb2R1Y3QubmFtZSxcbiAgICAgICAgICAgIGFkanVzdC5wcm9kdWN0LlNLVSxcbiAgICAgICAgICAgIGFkanVzdC51c2VyLnVzZXJuYW1lLFxuICAgICAgICAgICAgcmVwb3J0QWRqdXN0Lmdyb3VwLm1hc3Rlckdyb3VwLm5hbWUsXG4gICAgICAgICAgICByZXBvcnRBZGp1c3QuZ3JvdXAubmFtZSxcbiAgICAgICAgICAgIHJlcG9ydEFkanVzdC53YXJlaG91c2UubmFtZSxcbiAgICAgICAgICAgIHJlcG9ydEFkanVzdC5xdWFudGl0eUJlZm9yZSxcbiAgICAgICAgICAgIHJlcG9ydEFkanVzdC5xdWFudGl0eUFmdGVyLFxuICAgICAgICAgICAgcmVwb3J0QWRqdXN0LmRlbHRhLFxuICAgICAgICAgICAgYWRqdXN0Lm5vdGUsXG4gICAgICAgICAgXS5qb2luKCcsJylcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGNzdkRhdGE7XG59O1xuXG5jb25zdCBnZW5lcmF0ZUNTVkluYm91bmRPcmRlciA9IGFzeW5jIChxdWVyeVBhcmFtczogVVJMU2VhcmNoUGFyYW1zKSA9PiB7XG4gIGNvbnN0IGNzdkRhdGEgPSBbJ2NyZWF0ZWRfYXQsdXNlcm5hbWUsdHlwZSxvcmRlcl90aXRsZSxhbGxvY2F0ZWRfcHJvZHVjdCxza3UsZ3JvdXAscXVhbnRpdHknXTtcbiAgYXdhaXQgZmV0Y2hSZXBvcnRBUEkocXVlcnlQYXJhbXMsIChkYXRhOiBJUmVwb3J0SW5ib3VuZE9yZGVyUmVzcG9uc2UpID0+IHtcbiAgICBjb25zdCBzZWFyY2hpbmdHcm91cCA9IHF1ZXJ5UGFyYW1zLmdldCgncHJvZHVjdF9ncm91cCcpO1xuICAgIGRhdGEucmVwb3J0cy5mb3JFYWNoKChyZXBvcnQpID0+IHtcbiAgICAgIHJlcG9ydC5pbmJvdW5kT3JkZXIucHJvZHVjdHNBbGxvY2F0ZWQuZm9yRWFjaCgocHJvZHVjdHNBbGxvY2F0ZWQpID0+IHtcbiAgICAgICAgcHJvZHVjdHNBbGxvY2F0ZWQucHJvZHVjdFF1YW50aXR5R3JvdXBzLmZvckVhY2goKHByb2R1Y3RRdWFudGl0eUdyb3VwKSA9PiB7XG4gICAgICAgICAgaWYgKHNlYXJjaFNLVUlucHV0LnZhbHVlICYmICFwcm9kdWN0c0FsbG9jYXRlZC5wcm9kdWN0LlNLVS5pbmNsdWRlcyhzZWFyY2hTS1VJbnB1dC52YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNlYXJjaGluZ0dyb3VwICYmICFwcm9kdWN0UXVhbnRpdHlHcm91cC5ncm91cC5uYW1lLmluY2x1ZGVzKHNlYXJjaGluZ0dyb3VwKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjc3ZEYXRhLnB1c2goXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIGZvcm1hdERhdGUocmVwb3J0LmNyZWF0ZWRBdCksXG4gICAgICAgICAgICAgIHJlcG9ydC51c2VyLnVzZXJuYW1lLFxuICAgICAgICAgICAgICByZXBvcnQudHlwZSxcbiAgICAgICAgICAgICAgcmVwb3J0LmluYm91bmRPcmRlci50aXRsZSxcbiAgICAgICAgICAgICAgcHJvZHVjdHNBbGxvY2F0ZWQucHJvZHVjdC5uYW1lLFxuICAgICAgICAgICAgICBwcm9kdWN0c0FsbG9jYXRlZC5wcm9kdWN0LlNLVSxcbiAgICAgICAgICAgICAgcHJvZHVjdFF1YW50aXR5R3JvdXAuZ3JvdXAubmFtZSxcbiAgICAgICAgICAgICAgcHJvZHVjdFF1YW50aXR5R3JvdXAucXVhbnRpdHksXG4gICAgICAgICAgICBdLmpvaW4oJywnKVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXByb2R1Y3RzQWxsb2NhdGVkLnByb2R1Y3RRdWFudGl0eUdyb3Vwcy5sZW5ndGgpIHtcbiAgICAgICAgICBjc3ZEYXRhLnB1c2goXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIGZvcm1hdERhdGUocmVwb3J0LmNyZWF0ZWRBdCksXG4gICAgICAgICAgICAgIHJlcG9ydC51c2VyLnVzZXJuYW1lLFxuICAgICAgICAgICAgICByZXBvcnQudHlwZSxcbiAgICAgICAgICAgICAgcmVwb3J0LmluYm91bmRPcmRlci50aXRsZSxcbiAgICAgICAgICAgICAgcHJvZHVjdHNBbGxvY2F0ZWQucHJvZHVjdC5uYW1lLFxuICAgICAgICAgICAgICBwcm9kdWN0c0FsbG9jYXRlZC5wcm9kdWN0LlNLVSxcbiAgICAgICAgICAgIF0uam9pbignLCcpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gY3N2RGF0YTtcbn07XG5cbmNvbnN0IGdlbmVyYXRlQ1NWU2hpcHBpbmcgPSBhc3luYyAocXVlcnlQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcykgPT4ge1xuICAvLyBDU1YgSGVhZGVyc1xuICBjb25zdCBjc3ZEYXRhID0gW1xuICAgICdhY3Rpb25fdHlwZSx1c2VyLGNyZWF0ZWRfYXQsY3VycmVudF9zaGlwX3JlcXVlc3Rfc3RhdHVzLHN0b3JlX25hbWUsc2t1LHByb2R1Y3RfbmFtZSxncm91cCxxdWFudGl0eScsXG4gIF07XG4gIGF3YWl0IGZldGNoUmVwb3J0QVBJKHF1ZXJ5UGFyYW1zLCAoZGF0YTogSVJlcG9ydFNoaXBwaW5nUmVzcG9uc2UpID0+IHtcbiAgICBkYXRhLnJlcG9ydHMuZm9yRWFjaCgocmVwb3J0KSA9PiB7XG4gICAgICByZXBvcnQuc2hpcFJlcXVlc3QuY2FydHMuZm9yRWFjaCgoY2FydCkgPT4ge1xuICAgICAgICBpZiAoc2VhcmNoU0tVSW5wdXQudmFsdWUgJiYgIWNhcnQucHJvZHVjdC5TS1UuaW5jbHVkZXMoc2VhcmNoU0tVSW5wdXQudmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNzdkRhdGEucHVzaChcbiAgICAgICAgICBbXG4gICAgICAgICAgICByZXBvcnQudHlwZSxcbiAgICAgICAgICAgIHJlcG9ydC51c2VyLnVzZXJuYW1lLFxuICAgICAgICAgICAgcmVwb3J0LmNyZWF0ZWRBdCxcbiAgICAgICAgICAgIHJlcG9ydC5zaGlwUmVxdWVzdC5zdGF0dXMsXG4gICAgICAgICAgICByZXBvcnQuc2hpcFJlcXVlc3Quc3RvcmUuc3RvcmVOYW1lLFxuICAgICAgICAgICAgY2FydC5wcm9kdWN0LlNLVSxcbiAgICAgICAgICAgIGNhcnQucHJvZHVjdC5uYW1lLFxuICAgICAgICAgICAgY2FydC5ncm91cC5uYW1lLFxuICAgICAgICAgICAgY2FydC5xdWFudGl0eSxcbiAgICAgICAgICBdLmpvaW4oJywnKVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBjc3ZEYXRhO1xufTtcblxuY29uc3QgZ2VuZXJhdGVDU1ZBc3NpZ24gPSBhc3luYyAocXVlcnlQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcykgPT4ge1xuICAvLyBDU1YgSGVhZGVyc1xuICBjb25zdCBjc3ZEYXRhID0gWydjcmVhdGVkX2F0LHVzZXJuYW1lLHR5cGUsZnJvbV9ncm91cCx0b19ncm91cCxza3UscHJvZHVjdF9uYW1lLHF1YW50aXR5J107XG5cbiAgYXdhaXQgZmV0Y2hSZXBvcnRBUEkocXVlcnlQYXJhbXMsIChkYXRhOiBJUmVwb3J0QXNzaWduUmVzcG9uc2UpID0+IHtcbiAgICBkYXRhLnJlcG9ydHMuZm9yRWFjaCgocmVwb3J0KSA9PiB7XG4gICAgICBpZiAoc2VhcmNoU0tVSW5wdXQudmFsdWUgJiYgIXJlcG9ydC5wcm9kdWN0LlNLVS5pbmNsdWRlcyhzZWFyY2hTS1VJbnB1dC52YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY3N2RGF0YS5wdXNoKFxuICAgICAgICBbXG4gICAgICAgICAgZm9ybWF0RGF0ZShyZXBvcnQuY3JlYXRlZEF0KSxcbiAgICAgICAgICByZXBvcnQudXNlci51c2VybmFtZSxcbiAgICAgICAgICByZXBvcnQudHlwZSxcbiAgICAgICAgICByZXBvcnQuZnJvbUdyb3VwLm5hbWUsXG4gICAgICAgICAgcmVwb3J0Lmdyb3VwLm5hbWUsXG4gICAgICAgICAgcmVwb3J0LnByb2R1Y3QuU0tVLFxuICAgICAgICAgIHJlcG9ydC5wcm9kdWN0Lm5hbWUsXG4gICAgICAgICAgcmVwb3J0LnF1YW50aXR5LFxuICAgICAgICBdLmpvaW4oJywnKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBjc3ZEYXRhO1xufTtcblxuY29uc3QgZ2VuZXJhdGVDU1ZTaGVsZkxpZmUgPSBhc3luYyAocXVlcnlQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcykgPT4ge1xuICAvLyBDU1YgSGVhZGVyc1xuICBjb25zdCBjc3ZEYXRhID0gWydTS1UsIHNoZWxmTGlmZVN0YXJ0LCBzaGVsZkxpZmVFbmQsIHF1YW50aXR5T3JkZXJlZCwgcXVhbnRpdHlSZWNlaXZlZCddO1xuXG4gIGF3YWl0IGZldGNoUmVwb3J0QVBJKHF1ZXJ5UGFyYW1zLCAoZGF0YTogSVJlcG9ydFNoZWxmTGlmZVJlc3BvbnNlKSA9PiB7XG4gICAgZGF0YS5yZXBvcnRTaGVsZkxpZmVMaXN0LmZvckVhY2goKHJlcG9ydCkgPT4ge1xuICAgICAgbGV0IHJlY2VpdmVkO1xuICAgICAgaWYgKCFyZXBvcnQucXVhbnRpdHlSZWNlaXZlZCkge1xuICAgICAgICByZWNlaXZlZCA9ICctJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlY2VpdmVkID0gcmVwb3J0LnF1YW50aXR5UmVjZWl2ZWQudG9TdHJpbmcoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNlYXJjaFNLVUlucHV0LnZhbHVlLmxlbmd0aCAmJiAhcmVwb3J0LnByb2R1Y3QuU0tVLmluY2x1ZGVzKHNlYXJjaFNLVUlucHV0LnZhbHVlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNzdkRhdGEucHVzaChcbiAgICAgICAgW1xuICAgICAgICAgIHJlcG9ydC5wcm9kdWN0LlNLVSxcbiAgICAgICAgICBmb3JtYXREYXRlKHJlcG9ydC5zaGVsZkxpZmVTdGFydCksXG4gICAgICAgICAgZm9ybWF0RGF0ZShyZXBvcnQuc2hlbGZMaWZlU3RhcnQpLFxuICAgICAgICAgIHJlcG9ydC5xdWFudGl0eSxcbiAgICAgICAgICByZWNlaXZlZCxcbiAgICAgICAgXS5qb2luKCcsJylcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gY3N2RGF0YTtcbn07XG5cbmNvbnN0IGNzdkRvd25sb2FkTWFwOiBJQ1NWRG93bmxvYWRNYXAgPSB7XG4gIGV2ZW50czogZ2VuZXJhdGVDU1ZFdmVudHMsXG4gIHJlcXVlc3Rfc2hhcmU6IGdlbmVyYXRlQ1NWUmVxdWVzdFNoYXJlLFxuICBpbnZlbnRvcmllczogZ2VuZXJhdGVDU1ZJbnZlbnRvcmllcyxcbiAgYWRqdXN0bWVudDogZ2VuZXJhdGVDU1ZBZGp1c3RtZW50cyxcbiAgYXNzaWduOiBnZW5lcmF0ZUNTVkFzc2lnbixcbiAgaW5ib3VuZF9vcmRlcjogZ2VuZXJhdGVDU1ZJbmJvdW5kT3JkZXIsXG4gIHNoaXBwaW5nOiBnZW5lcmF0ZUNTVlNoaXBwaW5nLFxuICBzaGVsZl9saWZlOiBnZW5lcmF0ZUNTVlNoZWxmTGlmZSxcbn07XG5cbmNvbnN0IGZpbHRlcnNJZHMgPSBbXG4gICdyZXF1ZXN0LXNoYXJlLXR5cGUnLFxuICAnc2hpcHBpbmctdHlwZScsXG4gICd1c2VyLXNlbGVjdCcsXG4gICdmaWx0ZXItc3RhcnQtZGF0ZScsXG4gICdmaWx0ZXItc3RhcnQtZGF0ZS10bycsXG4gICdmaWx0ZXItZW5kLWRhdGUnLFxuICAnZmlsdGVyLWVuZC1kYXRlLXRvJyxcbiAgJ21hc3Rlci1ncm91cCcsXG4gICd0YXJnZXQtZ3JvdXAnLFxuICAndGFyZ2V0LXN1Yi1ncm91cCcsXG4gICdmaWx0ZXItZ3JvdXAtYnJhbmQnLFxuICAnZmlsdGVyLWdyb3VwLWxhbmd1YWdlJyxcbiAgJ2ZpbHRlci1ncm91cC1wcmVtaXNlcycsXG4gICdmaWx0ZXItZ3JvdXAtY2F0ZWdvcmllcycsXG4gICdmaWx0ZXItZ3JvdXAtZXZlbnRzJyxcbiAgJ2ZpbHRlci1wcm9kdWN0LWdyb3VwJyxcbiAgJ2dyb3VwLWZyb20nLFxuICAnZ3JvdXAtdG8nLFxuICAnZGl2aXNpb24tc2VsZWN0JyxcbiAgJ3NoZWxmLWxpZmUtZmlsdGVyLWV4cGlyZS1pbicsXG5dO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAvLyBET00gbm9kZXNcbiAgY29uc3QgcmVwb3J0VHlwZVNlbGVjdEhUTUwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVwb3J0LXR5cGUtc2VsZWN0JykgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XG4gIGNvbnN0IGFsbEZpbHRlcnNIVE1MID0gZmlsdGVyc0lkcy5tYXAoKGlkKSA9PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkpO1xuICBjb25zdCB0YWJsZUxvYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YWJsZS1yZXBvcnQtbG9hZGVyJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gIGNvbnN0IGNsZWFyRmlsdGVyc0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWx0ZXItY2xlYXItYnV0dG9uJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gIGNvbnN0IHNlYXJjaFF1ZXJ5SFRNTCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gtcXVlcnknKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICBjb25zdCBzZWFyY2hTa3VIVE1MID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaC1za3UnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICBjb25zdCBkb3dubG9hZENTVkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidXR0b24tY3N2LWRvd25sb2FkJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG5cbiAgZm9yIChjb25zdCBbcmVwb3J0VHlwZSwgZmlsdGVyc10gb2YgT2JqZWN0LmVudHJpZXMoZmlsdGVyc01hcCkpIHtcbiAgICBmaWx0ZXJzTWFwW3JlcG9ydFR5cGVdID0gZmlsdGVycy5tYXAoKGlkKSA9PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCBhcyBzdHJpbmcpKSBhcyBIVE1MRWxlbWVudFtdO1xuICB9XG5cbiAgLy8gU2hvdy9yZW1vdmUgZmlsdGVycyB3aGVuIGNob29zZSBldmVudCByZXBvcnQgdHlwZVxuICByZXBvcnRUeXBlU2VsZWN0SFRNTC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdEhUTUwgPSBlLnRhcmdldCBhcyBIVE1MU2VsZWN0RWxlbWVudDtcblxuICAgIGFsbEZpbHRlcnNIVE1MLmZvckVhY2goKGZpbHRlckhUTUwpID0+IGZpbHRlckhUTUwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJykpO1xuICAgIGNvbnN0IHZpc2libGVGaWx0ZXJzID0gZmlsdGVyc01hcFtzZWxlY3RIVE1MLnZhbHVlXSBhcyBIVE1MRWxlbWVudFtdO1xuICAgIGNvbnNvbGUubG9nKCd2aXNpYmxlRmlsdGVycycsIHZpc2libGVGaWx0ZXJzKTtcbiAgICBjb25zb2xlLmxvZygnZmlsdGVyc01hcCcsIGZpbHRlcnNNYXApO1xuICAgIGNvbnNvbGUubG9nKCdhbGxGaWx0ZXJzSFRNTCcsIGFsbEZpbHRlcnNIVE1MKTtcblxuICAgIHZpc2libGVGaWx0ZXJzLmZvckVhY2goKGZpbHRlckhUTUwpID0+IGZpbHRlckhUTUwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJykpO1xuICB9KTtcblxuICB0YWJsZUxvYWRlci5jbGljaygpO1xuICBjbGVhckZpbHRlcnNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgYWxsRmlsdGVyc0hUTUwuZm9yRWFjaCgoZmlsdGVySFRNTCkgPT4ge1xuICAgICAgY29uc3QgaW5wdXQgPSBmaWx0ZXJIVE1MLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LCBzZWxlY3QnKSBhcyBIVE1MU2VsZWN0RWxlbWVudCB8IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICBpbnB1dC52YWx1ZSA9ICcnO1xuICAgIH0pO1xuICAgIHNlYXJjaFF1ZXJ5SFRNTC52YWx1ZSA9ICcnO1xuICAgIHNlYXJjaFNrdUhUTUwudmFsdWUgPSAnJztcbiAgICB0YWJsZUxvYWRlci5jbGljaygpO1xuICB9KTtcbiAgLy8gRG93bmxvYWQgY3N2IGJ1dHRvblxuICBjb25zdCBncm91cFNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXBvcnQtdGFyZ2V0LWdyb3VwLXNlbGVjdCcpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xuICBjb25zdCBncm91cElkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVwb3J0LWdyb3VwLWlkLWhpZGRlbicpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIGdyb3VwU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XG4gICAgY29uc3Qgb3B0aW9uID0gZ3JvdXBTZWxlY3QucXVlcnlTZWxlY3Rvcihgb3B0aW9uW3ZhbHVlPVwiJHtncm91cFNlbGVjdC52YWx1ZX1cIl1gKTtcbiAgICBpZiAoIW9wdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBncm91cElkSW5wdXQudmFsdWUgPSBvcHRpb24uZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldC1ncm91cC1pZCcpO1xuICAgIGdyb3VwSWRJbnB1dC5jbGljaygpO1xuICB9KTtcbiAgZG93bmxvYWRDU1ZCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgZmlsdGVyc1F1ZXJ5UGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICAgIGFsbEZpbHRlcnNIVE1MLmZvckVhY2goKGZpbHRlckhUTUwpID0+IHtcbiAgICAgIGNvbnN0IGlucHV0ID0gZmlsdGVySFRNTC5xdWVyeVNlbGVjdG9yKCdpbnB1dCwgc2VsZWN0JykgYXMgSFRNTFNlbGVjdEVsZW1lbnQgfCBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgaWYgKGlucHV0LmdldEF0dHJpYnV0ZSgnbmFtZScpID09PSAnZ3JvdXBfaWQnICYmIGdyb3VwU2VsZWN0KSB7XG4gICAgICAgIGZpbHRlcnNRdWVyeVBhcmFtcy5hcHBlbmQoJ3RhcmdldF9ncm91cCcsIGdyb3VwU2VsZWN0LnZhbHVlKTtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBmaWx0ZXJzUXVlcnlQYXJhbXMuYXBwZW5kKGlucHV0LmdldEF0dHJpYnV0ZSgnbmFtZScpLCBpbnB1dC52YWx1ZSk7XG4gICAgfSk7XG5cbiAgICBmaWx0ZXJzUXVlcnlQYXJhbXMuYXBwZW5kKCdxJywgc2VhcmNoUXVlcnlIVE1MLnZhbHVlKTtcbiAgICBmaWx0ZXJzUXVlcnlQYXJhbXMuYXBwZW5kKCdyZXBvcnRfdHlwZScsIHJlcG9ydFR5cGVTZWxlY3RIVE1MLnZhbHVlKTtcblxuICAgIGNvbnN0IGNzdkRhdGEgPSBhd2FpdCBjc3ZEb3dubG9hZE1hcFtyZXBvcnRUeXBlU2VsZWN0SFRNTC52YWx1ZV0oZmlsdGVyc1F1ZXJ5UGFyYW1zKTtcbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2NzdkRhdGEuam9pbignXFxuJyldLCB7IHR5cGU6ICd0ZXh0L2NzdicgfSk7XG4gICAgY29uc3QgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBhLnNldEF0dHJpYnV0ZSgnaHJlZicsIHVybCk7XG4gICAgYS5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgJ3JlcG9ydC5jc3YnKTtcbiAgICBhLmNsaWNrKCk7XG4gICAgYS5yZW1vdmUoKTtcbiAgfSk7XG59KTtcbiIsImV4cG9ydCBjb25zdCBmb3JtYXREYXRlID0gKGRhdGU6IHN0cmluZykgPT4ge1xuICBpZighZGF0ZSkge1xuICAgIHJldHVybiAnTm9uZSc7XG4gIH1cblxuICBjb25zdCBjcmVhdGVBdCA9IG5ldyBEYXRlKGRhdGUpO1xuICBjb25zdCB5ZWFyID0gY3JlYXRlQXQuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgbW9udGggPSBTdHJpbmcoY3JlYXRlQXQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsICcwJyk7IC8vIE1vbnRoIGlzIDAtYmFzZWRcbiAgY29uc3QgZGF5ID0gU3RyaW5nKGNyZWF0ZUF0LmdldERhdGUoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgY29uc3QgaG91cnMgPSBTdHJpbmcoY3JlYXRlQXQuZ2V0SG91cnMoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgY29uc3QgbWludXRlcyA9IFN0cmluZyhjcmVhdGVBdC5nZXRNaW51dGVzKCkpLnBhZFN0YXJ0KDIsICcwJyk7XG4gIHJldHVybiBgJHttb250aH0vJHtkYXl9LyR7eWVhcn0gJHtob3Vyc306JHttaW51dGVzfWA7XG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9yZXBvcnQudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=