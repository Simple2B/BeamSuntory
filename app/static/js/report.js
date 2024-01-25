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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RhdGljLy4vc3JjL3JlcG9ydC50cyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9zcmMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBJUmVwb3J0UmVxdWVzdFNoYXJlUmVzcG9uc2UsXG4gIElFdmVudHNSZXBvcnRSZXNwb25zZSxcbiAgSUludmVudG9yaWVzUmVwb3J0UmVzcG9uc2UsXG4gIElSZXBvcnRBZGp1c3RSZXNwb25zZSxcbiAgSVJlcG9ydEluYm91bmRPcmRlclJlc3BvbnNlLFxuICBJUmVwb3J0U2hpcHBpbmdSZXNwb25zZSxcbiAgSVJlcG9ydEFzc2lnblJlc3BvbnNlLFxuICBJUmVwb3J0U2hlbGZMaWZlUmVzcG9uc2UsXG59IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgZm9ybWF0RGF0ZSB9IGZyb20gJy4vdXRpbHMnO1xuXG5pbnRlcmZhY2UgSUZpbHRlck1hcCB7XG4gIFtpbmRleDogc3RyaW5nXTogc3RyaW5nW10gfCBIVE1MRWxlbWVudFtdO1xufVxuXG5pbnRlcmZhY2UgSUNTVkRvd25sb2FkTWFwIHtcbiAgW2luZGV4OiBzdHJpbmddOiAocXVlcnk6IFVSTFNlYXJjaFBhcmFtcykgPT4gUHJvbWlzZTxzdHJpbmdbXT47XG59XG5cbmNvbnN0IGZpbHRlcnNNYXA6IElGaWx0ZXJNYXAgPSB7XG4gIGV2ZW50czogWyd1c2VyLXNlbGVjdCcsICdmaWx0ZXItc3RhcnQtZGF0ZScsICdmaWx0ZXItc3RhcnQtZGF0ZS10bycsICdmaWx0ZXItZW5kLWRhdGUnLCAnZmlsdGVyLWVuZC1kYXRlLXRvJ10sXG4gIHJlcXVlc3Rfc2hhcmU6IFsndXNlci1zZWxlY3QnLCAnZmlsdGVyLXN0YXJ0LWRhdGUnLCAnZmlsdGVyLWVuZC1kYXRlJ10sXG4gIGludmVudG9yaWVzOiBbXG4gICAgJ3VzZXItc2VsZWN0JyxcbiAgICAnZmlsdGVyLXN0YXJ0LWRhdGUnLFxuICAgICdmaWx0ZXItZW5kLWRhdGUnLFxuICAgICdtYXN0ZXItZ3JvdXAnLFxuICAgICd0YXJnZXQtZ3JvdXAnLFxuICAgICd0YXJnZXQtc3ViLWdyb3VwJyxcbiAgICAnZmlsdGVyLWdyb3VwLWJyYW5kJyxcbiAgICAnZmlsdGVyLWdyb3VwLWxhbmd1YWdlJyxcbiAgICAnZmlsdGVyLWdyb3VwLXByZW1pc2VzJyxcbiAgICAnZmlsdGVyLWdyb3VwLWNhdGVnb3JpZXMnLFxuICAgICdmaWx0ZXItZ3JvdXAtZXZlbnRzJyxcbiAgXSxcbiAgYWRqdXN0bWVudDogW1xuICAgICd1c2VyLXNlbGVjdCcsXG4gICAgJ2ZpbHRlci1zdGFydC1kYXRlJyxcbiAgICAnZmlsdGVyLWVuZC1kYXRlJyxcbiAgICAnbWFzdGVyLWdyb3VwJyxcbiAgICAndGFyZ2V0LWdyb3VwJyxcbiAgICAndGFyZ2V0LXN1Yi1ncm91cCcsXG4gICAgJ2ZpbHRlci1ncm91cC1icmFuZCcsXG4gICAgJ2ZpbHRlci1ncm91cC1sYW5ndWFnZScsXG4gICAgJ2ZpbHRlci1ncm91cC1wcmVtaXNlcycsXG4gICAgJ2ZpbHRlci1ncm91cC1jYXRlZ29yaWVzJyxcbiAgICAnZmlsdGVyLWdyb3VwLWV2ZW50cycsXG4gIF0sXG4gIGFzc2lnbjogW1xuICAgICd1c2VyLXNlbGVjdCcsXG4gICAgJ2dyb3VwLWZyb20nLFxuICAgICdncm91cC10bycsXG4gICAgJ2ZpbHRlci1zdGFydC1kYXRlJyxcbiAgICAnZmlsdGVyLWVuZC1kYXRlJyxcbiAgICAnZmlsdGVyLWdyb3VwLWJyYW5kJyxcbiAgICAnZmlsdGVyLWdyb3VwLWxhbmd1YWdlJyxcbiAgICAnZmlsdGVyLWdyb3VwLXByZW1pc2VzJyxcbiAgICAnZmlsdGVyLWdyb3VwLWNhdGVnb3JpZXMnLFxuICBdLFxuICBpbmJvdW5kX29yZGVyOiBbXG4gICAgJ2ZpbHRlci1zdGFydC1kYXRlJyxcbiAgICAnZmlsdGVyLWVuZC1kYXRlJyxcbiAgICAnZmlsdGVyLWdyb3VwLWJyYW5kJyxcbiAgICAnZmlsdGVyLWdyb3VwLXByZW1pc2VzJyxcbiAgICAnZmlsdGVyLWdyb3VwLWNhdGVnb3JpZXMnLFxuICAgICdmaWx0ZXItcHJvZHVjdC1ncm91cCcsXG4gIF0sXG4gIHNoaXBwaW5nOiBbXG4gICAgJ2RpdmlzaW9uLXNlbGVjdCcsXG4gICAgJ3RhcmdldC1ncm91cCcsXG4gICAgJ3RhcmdldC1zdWItZ3JvdXAnLFxuICAgICdmaWx0ZXItc3RhcnQtZGF0ZScsXG4gICAgJ2ZpbHRlci1lbmQtZGF0ZScsXG4gICAgJ2ZpbHRlci1ncm91cC1icmFuZCcsXG4gICAgJ2ZpbHRlci1ncm91cC1sYW5ndWFnZScsXG4gICAgJ2ZpbHRlci1ncm91cC1jYXRlZ29yaWVzJyxcbiAgICAnZmlsdGVyLWdyb3VwLXByZW1pc2VzJyxcbiAgXSxcbiAgc2hlbGZfbGlmZTogW1xuICAgICdmaWx0ZXItc3RhcnQtZGF0ZScsXG4gICAgJ2ZpbHRlci1lbmQtZGF0ZScsXG4gICAgJ21hc3Rlci1ncm91cCcsXG4gICAgJ3RhcmdldC1ncm91cCcsXG4gICAgJ3RhcmdldC1zdWItZ3JvdXAnLFxuICAgICdmaWx0ZXItZ3JvdXAtYnJhbmQnLFxuICAgICdmaWx0ZXItZ3JvdXAtbGFuZ3VhZ2UnLFxuICAgICdmaWx0ZXItZ3JvdXAtcHJlbWlzZXMnLFxuICAgICdmaWx0ZXItZ3JvdXAtY2F0ZWdvcmllcycsXG4gICAgJ3NoZWxmLWxpZmUtZmlsdGVyLWV4cGlyZS1pbicsXG4gIF0sXG59O1xuXG5jb25zdCBzZWFyY2hTS1VJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gtc2t1JykgYXMgSFRNTElucHV0RWxlbWVudDtcblxuY29uc3QgZmV0Y2hSZXBvcnRBUEkgPSBhc3luYyAocXVlcnlQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcywgY2FsbGJhY2s6IChkYXRhOiBPYmplY3QpID0+IHZvaWQpID0+IHtcbiAgbGV0IHBhZ2VzID0gMTtcblxuICBjb25zdCB1cmxXaXRob3V0UXVlcnlQYXJhbXMgPSBsb2NhdGlvbi5vcmlnaW4gKyBsb2NhdGlvbi5wYXRobmFtZTtcbiAgZm9yIChsZXQgcGFnZSA9IDE7IHBhZ2UgPD0gcGFnZXM7IHBhZ2UrKykge1xuICAgIGNvbnN0IHVybCA9IFtgYXBpP3BhZ2U9JHtwYWdlfWAsIHF1ZXJ5UGFyYW1zLnRvU3RyaW5nKCldLmpvaW4oJyYnKTtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHt1cmxXaXRob3V0UXVlcnlQYXJhbXN9JHt1cmx9YCk7XG4gICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoYXdhaXQgcmVzLmpzb24oKSk7XG5cbiAgICBjYWxsYmFjayhkYXRhKTtcbiAgICBwYWdlcyA9IGRhdGEucGFnaW5hdGlvbi5wYWdlcztcbiAgfVxufTtcblxuY29uc3QgZ2VuZXJhdGVDU1ZFdmVudHMgPSBhc3luYyAocXVlcnlQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcykgPT4ge1xuICBjb25zdCBjc3ZEYXRhID0gWydhY3Rpb25fdHlwZSx1c2VyLGNyZWF0ZWRfYXQsc3RvcmUsZXZlbnRfZGF0ZV9mcm9tLGV2ZW50X2RhdGVfdG8sc2t1LHByb2R1Y3RfbmFtZSddO1xuICBhd2FpdCBmZXRjaFJlcG9ydEFQSShxdWVyeVBhcmFtcywgKGRhdGE6IElFdmVudHNSZXBvcnRSZXNwb25zZSkgPT4ge1xuICAgIGRhdGEucmVwb3J0cy5mb3JFYWNoKChyZXBvcnQpID0+IHtcbiAgICAgIHJlcG9ydC5zaGlwUmVxdWVzdC5jYXJ0cy5mb3JFYWNoKChjYXJ0KSA9PiB7XG4gICAgICAgIGlmIChzZWFyY2hTS1VJbnB1dC52YWx1ZSAmJiAhY2FydC5wcm9kdWN0LlNLVS5pbmNsdWRlcyhzZWFyY2hTS1VJbnB1dC52YWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjc3ZEYXRhLnB1c2goXG4gICAgICAgICAgW1xuICAgICAgICAgICAgcmVwb3J0LnR5cGUsXG4gICAgICAgICAgICByZXBvcnQudXNlci51c2VybmFtZSxcbiAgICAgICAgICAgIHJlcG9ydC5jcmVhdGVkQXQsXG4gICAgICAgICAgICByZXBvcnQuc2hpcFJlcXVlc3Quc3RvcmUuc3RvcmVOYW1lLFxuICAgICAgICAgICAgY2FydC5ldmVudC5kYXRlRnJvbSxcbiAgICAgICAgICAgIGNhcnQuZXZlbnQuZGF0ZVRvLFxuICAgICAgICAgICAgY2FydC5wcm9kdWN0LlNLVSxcbiAgICAgICAgICAgIGNhcnQucHJvZHVjdC5uYW1lLFxuICAgICAgICAgIF0uam9pbignLCcpXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBjc3ZEYXRhO1xufTtcblxuY29uc3QgZ2VuZXJhdGVDU1ZSZXF1ZXN0U2hhcmUgPSBhc3luYyAocXVlcnlQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcykgPT4ge1xuICBjb25zdCBjc3ZEYXRhID0gW1xuICAgICdhY3Rpb25fdHlwZSx1c2VyLGNyZWF0ZWRfYXQsY3VycmVudF9zaGFyZV9yZXF1ZXN0X3N0YXR1cyxncm91cF9mcm9tLGdyb3VwX3RvLGRlc2lyZWRfcXVhbnRpdHksc2t1LHByb2R1Y3RfbmFtZScsXG4gIF07XG4gIGF3YWl0IGZldGNoUmVwb3J0QVBJKHF1ZXJ5UGFyYW1zLCAoZGF0YTogSVJlcG9ydFJlcXVlc3RTaGFyZVJlc3BvbnNlKSA9PiB7XG4gICAgZGF0YS5yZXBvcnRzLmZvckVhY2goKHJlcG9ydCkgPT4ge1xuICAgICAgaWYgKHNlYXJjaFNLVUlucHV0LnZhbHVlICYmICFyZXBvcnQucmVxdWVzdFNoYXJlLnByb2R1Y3QuU0tVLmluY2x1ZGVzKHNlYXJjaFNLVUlucHV0LnZhbHVlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNzdkRhdGEucHVzaChcbiAgICAgICAgW1xuICAgICAgICAgIHJlcG9ydC50eXBlLFxuICAgICAgICAgIHJlcG9ydC51c2VyLnVzZXJuYW1lLFxuICAgICAgICAgIHJlcG9ydC5jcmVhdGVkQXQsXG4gICAgICAgICAgcmVwb3J0LnJlcXVlc3RTaGFyZS5zdGF0dXMsXG4gICAgICAgICAgcmVwb3J0LnJlcXVlc3RTaGFyZS5mcm9tR3JvdXAubmFtZSxcbiAgICAgICAgICByZXBvcnQucmVxdWVzdFNoYXJlLmdyb3VwLm5hbWUsXG4gICAgICAgICAgcmVwb3J0LnJlcXVlc3RTaGFyZS5kZXNpcmVRdWFudGl0eSxcbiAgICAgICAgICByZXBvcnQucmVxdWVzdFNoYXJlLnByb2R1Y3QuU0tVLFxuICAgICAgICAgIHJlcG9ydC5yZXF1ZXN0U2hhcmUucHJvZHVjdC5uYW1lLFxuICAgICAgICBdLmpvaW4oJywnKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBjc3ZEYXRhO1xufTtcblxuY29uc3QgZ2VuZXJhdGVDU1ZJbnZlbnRvcmllcyA9IGFzeW5jIChxdWVyeVBhcmFtczogVVJMU2VhcmNoUGFyYW1zKSA9PiB7XG4gIC8vIENTViBIZWFkZXJzXG4gIGNvbnN0IGNzdkRhdGEgPSBbJ3Byb2R1Y3RfbmFtZSxza3UsZ3JvdXAscXVhbnRpdHksY3JlYXRlZF9hdCddO1xuICBhd2FpdCBmZXRjaFJlcG9ydEFQSShxdWVyeVBhcmFtcywgKGRhdGE6IElJbnZlbnRvcmllc1JlcG9ydFJlc3BvbnNlKSA9PiB7XG4gICAgZGF0YS5yZXBvcnRzLmZvckVhY2goKHJlcG9ydCkgPT4ge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXBvcnQucHJvZHVjdC53YXJlaG91c2VQcm9kdWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCB3YXJlaG91c2VQcm9kdWN0ID0gcmVwb3J0LnByb2R1Y3Qud2FyZWhvdXNlUHJvZHVjdHNbaV07XG5cbiAgICAgICAgaWYgKHdhcmVob3VzZVByb2R1Y3QuZ3JvdXAubmFtZSA9PT0gcmVwb3J0Lmdyb3VwLm5hbWUpIHtcbiAgICAgICAgICBjc3ZEYXRhLnB1c2goXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIHJlcG9ydC5wcm9kdWN0Lm5hbWUsXG4gICAgICAgICAgICAgIHJlcG9ydC5wcm9kdWN0LlNLVSxcbiAgICAgICAgICAgICAgcmVwb3J0Lmdyb3VwLm5hbWUsXG4gICAgICAgICAgICAgIHdhcmVob3VzZVByb2R1Y3QucHJvZHVjdFF1YW50aXR5LFxuICAgICAgICAgICAgICBmb3JtYXREYXRlKHJlcG9ydC5jcmVhdGVkQXQpLFxuICAgICAgICAgICAgXS5qb2luKCcsJylcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gY3N2RGF0YTtcbn07XG5cbmNvbnN0IGdlbmVyYXRlQ1NWQWRqdXN0bWVudHMgPSBhc3luYyAocXVlcnlQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcykgPT4ge1xuICAvLyBDU1YgSGVhZGVyc1xuICBjb25zdCBjc3ZEYXRhID0gW1xuICAgICdjcmVhdGVkX2F0LHByb2R1Y3RfbmFtZSxza3UsdXNlcm5hbWUsbWFzdGVyX2dyb3VwLGdyb3VwLHdhcmVob3VzZSxxdWFudGl0eV9iZWZvcmUscXVhbnRpdHlfYWZ0ZXIscXVhbnRpdHlfZGVsdGEsbm90ZScsXG4gIF07XG4gIGF3YWl0IGZldGNoUmVwb3J0QVBJKHF1ZXJ5UGFyYW1zLCAoZGF0YTogSVJlcG9ydEFkanVzdFJlc3BvbnNlKSA9PiB7XG4gICAgZGF0YS5yZXBvcnRzLmZvckVhY2goKGFkanVzdCkgPT4ge1xuICAgICAgYWRqdXN0LmFkanVzdEdyb3VwUXR5LmZvckVhY2goKHJlcG9ydEFkanVzdCkgPT4ge1xuICAgICAgICBpZiAoc2VhcmNoU0tVSW5wdXQudmFsdWUgJiYgIWFkanVzdC5wcm9kdWN0LlNLVS5pbmNsdWRlcyhzZWFyY2hTS1VJbnB1dC52YWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY3N2RGF0YS5wdXNoKFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIGZvcm1hdERhdGUoYWRqdXN0LmNyZWF0ZWRBdCksXG4gICAgICAgICAgICBhZGp1c3QucHJvZHVjdC5uYW1lLFxuICAgICAgICAgICAgYWRqdXN0LnByb2R1Y3QuU0tVLFxuICAgICAgICAgICAgYWRqdXN0LnVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgICByZXBvcnRBZGp1c3QuZ3JvdXAubWFzdGVyR3JvdXAubmFtZSxcbiAgICAgICAgICAgIHJlcG9ydEFkanVzdC5ncm91cC5uYW1lLFxuICAgICAgICAgICAgcmVwb3J0QWRqdXN0LndhcmVob3VzZS5uYW1lLFxuICAgICAgICAgICAgcmVwb3J0QWRqdXN0LnF1YW50aXR5QmVmb3JlLFxuICAgICAgICAgICAgcmVwb3J0QWRqdXN0LnF1YW50aXR5QWZ0ZXIsXG4gICAgICAgICAgICByZXBvcnRBZGp1c3QuZGVsdGEsXG4gICAgICAgICAgICBhZGp1c3Qubm90ZSxcbiAgICAgICAgICBdLmpvaW4oJywnKVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gY3N2RGF0YTtcbn07XG5cbmNvbnN0IGdlbmVyYXRlQ1NWSW5ib3VuZE9yZGVyID0gYXN5bmMgKHF1ZXJ5UGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMpID0+IHtcbiAgY29uc3QgY3N2RGF0YSA9IFsnY3JlYXRlZF9hdCx1c2VybmFtZSx0eXBlLG9yZGVyX3RpdGxlLGFsbG9jYXRlZF9wcm9kdWN0LHNrdSxncm91cCxxdWFudGl0eSddO1xuICBhd2FpdCBmZXRjaFJlcG9ydEFQSShxdWVyeVBhcmFtcywgKGRhdGE6IElSZXBvcnRJbmJvdW5kT3JkZXJSZXNwb25zZSkgPT4ge1xuICAgIGNvbnN0IHNlYXJjaGluZ0dyb3VwID0gcXVlcnlQYXJhbXMuZ2V0KCdwcm9kdWN0X2dyb3VwJyk7XG4gICAgZGF0YS5yZXBvcnRzLmZvckVhY2goKHJlcG9ydCkgPT4ge1xuICAgICAgcmVwb3J0LmluYm91bmRPcmRlci5wcm9kdWN0c0FsbG9jYXRlZC5mb3JFYWNoKChwcm9kdWN0c0FsbG9jYXRlZCkgPT4ge1xuICAgICAgICBwcm9kdWN0c0FsbG9jYXRlZC5wcm9kdWN0UXVhbnRpdHlHcm91cHMuZm9yRWFjaCgocHJvZHVjdFF1YW50aXR5R3JvdXApID0+IHtcbiAgICAgICAgICBpZiAoc2VhcmNoU0tVSW5wdXQudmFsdWUgJiYgIXByb2R1Y3RzQWxsb2NhdGVkLnByb2R1Y3QuU0tVLmluY2x1ZGVzKHNlYXJjaFNLVUlucHV0LnZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2VhcmNoaW5nR3JvdXAgJiYgIXByb2R1Y3RRdWFudGl0eUdyb3VwLmdyb3VwLm5hbWUuaW5jbHVkZXMoc2VhcmNoaW5nR3JvdXApKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGNzdkRhdGEucHVzaChcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgZm9ybWF0RGF0ZShyZXBvcnQuY3JlYXRlZEF0KSxcbiAgICAgICAgICAgICAgcmVwb3J0LnVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgICAgIHJlcG9ydC50eXBlLFxuICAgICAgICAgICAgICByZXBvcnQuaW5ib3VuZE9yZGVyLnRpdGxlLFxuICAgICAgICAgICAgICBwcm9kdWN0c0FsbG9jYXRlZC5wcm9kdWN0Lm5hbWUsXG4gICAgICAgICAgICAgIHByb2R1Y3RzQWxsb2NhdGVkLnByb2R1Y3QuU0tVLFxuICAgICAgICAgICAgICBwcm9kdWN0UXVhbnRpdHlHcm91cC5ncm91cC5uYW1lLFxuICAgICAgICAgICAgICBwcm9kdWN0UXVhbnRpdHlHcm91cC5xdWFudGl0eSxcbiAgICAgICAgICAgIF0uam9pbignLCcpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghcHJvZHVjdHNBbGxvY2F0ZWQucHJvZHVjdFF1YW50aXR5R3JvdXBzLmxlbmd0aCkge1xuICAgICAgICAgIGNzdkRhdGEucHVzaChcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgZm9ybWF0RGF0ZShyZXBvcnQuY3JlYXRlZEF0KSxcbiAgICAgICAgICAgICAgcmVwb3J0LnVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgICAgIHJlcG9ydC50eXBlLFxuICAgICAgICAgICAgICByZXBvcnQuaW5ib3VuZE9yZGVyLnRpdGxlLFxuICAgICAgICAgICAgICBwcm9kdWN0c0FsbG9jYXRlZC5wcm9kdWN0Lm5hbWUsXG4gICAgICAgICAgICAgIHByb2R1Y3RzQWxsb2NhdGVkLnByb2R1Y3QuU0tVLFxuICAgICAgICAgICAgXS5qb2luKCcsJylcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBjc3ZEYXRhO1xufTtcblxuY29uc3QgZ2VuZXJhdGVDU1ZTaGlwcGluZyA9IGFzeW5jIChxdWVyeVBhcmFtczogVVJMU2VhcmNoUGFyYW1zKSA9PiB7XG4gIC8vIENTViBIZWFkZXJzXG4gIGNvbnN0IGNzdkRhdGEgPSBbXG4gICAgJ2FjdGlvbl90eXBlLHVzZXIsY3JlYXRlZF9hdCxjdXJyZW50X3NoaXBfcmVxdWVzdF9zdGF0dXMsc3RvcmVfbmFtZSxza3UscHJvZHVjdF9uYW1lLGdyb3VwLHF1YW50aXR5JyxcbiAgXTtcbiAgYXdhaXQgZmV0Y2hSZXBvcnRBUEkocXVlcnlQYXJhbXMsIChkYXRhOiBJUmVwb3J0U2hpcHBpbmdSZXNwb25zZSkgPT4ge1xuICAgIGRhdGEucmVwb3J0cy5mb3JFYWNoKChyZXBvcnQpID0+IHtcbiAgICAgIHJlcG9ydC5zaGlwUmVxdWVzdC5jYXJ0cy5mb3JFYWNoKChjYXJ0KSA9PiB7XG4gICAgICAgIGlmIChzZWFyY2hTS1VJbnB1dC52YWx1ZSAmJiAhY2FydC5wcm9kdWN0LlNLVS5pbmNsdWRlcyhzZWFyY2hTS1VJbnB1dC52YWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY3N2RGF0YS5wdXNoKFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIHJlcG9ydC50eXBlLFxuICAgICAgICAgICAgcmVwb3J0LnVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgICByZXBvcnQuY3JlYXRlZEF0LFxuICAgICAgICAgICAgcmVwb3J0LnNoaXBSZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgICAgIHJlcG9ydC5zaGlwUmVxdWVzdC5zdG9yZS5zdG9yZU5hbWUsXG4gICAgICAgICAgICBjYXJ0LnByb2R1Y3QuU0tVLFxuICAgICAgICAgICAgY2FydC5wcm9kdWN0Lm5hbWUsXG4gICAgICAgICAgICBjYXJ0Lmdyb3VwLm5hbWUsXG4gICAgICAgICAgICBjYXJ0LnF1YW50aXR5LFxuICAgICAgICAgIF0uam9pbignLCcpXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNzdkRhdGE7XG59O1xuXG5jb25zdCBnZW5lcmF0ZUNTVkFzc2lnbiA9IGFzeW5jIChxdWVyeVBhcmFtczogVVJMU2VhcmNoUGFyYW1zKSA9PiB7XG4gIC8vIENTViBIZWFkZXJzXG4gIGNvbnN0IGNzdkRhdGEgPSBbJ2NyZWF0ZWRfYXQsdXNlcm5hbWUsdHlwZSxmcm9tX2dyb3VwLHRvX2dyb3VwLHNrdSxwcm9kdWN0X25hbWUscXVhbnRpdHknXTtcblxuICBhd2FpdCBmZXRjaFJlcG9ydEFQSShxdWVyeVBhcmFtcywgKGRhdGE6IElSZXBvcnRBc3NpZ25SZXNwb25zZSkgPT4ge1xuICAgIGRhdGEucmVwb3J0cy5mb3JFYWNoKChyZXBvcnQpID0+IHtcbiAgICAgIGlmIChzZWFyY2hTS1VJbnB1dC52YWx1ZSAmJiAhcmVwb3J0LnByb2R1Y3QuU0tVLmluY2x1ZGVzKHNlYXJjaFNLVUlucHV0LnZhbHVlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjc3ZEYXRhLnB1c2goXG4gICAgICAgIFtcbiAgICAgICAgICBmb3JtYXREYXRlKHJlcG9ydC5jcmVhdGVkQXQpLFxuICAgICAgICAgIHJlcG9ydC51c2VyLnVzZXJuYW1lLFxuICAgICAgICAgIHJlcG9ydC50eXBlLFxuICAgICAgICAgIHJlcG9ydC5mcm9tR3JvdXAubmFtZSxcbiAgICAgICAgICByZXBvcnQuZ3JvdXAubmFtZSxcbiAgICAgICAgICByZXBvcnQucHJvZHVjdC5TS1UsXG4gICAgICAgICAgcmVwb3J0LnByb2R1Y3QubmFtZSxcbiAgICAgICAgICByZXBvcnQucXVhbnRpdHksXG4gICAgICAgIF0uam9pbignLCcpXG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGNzdkRhdGE7XG59O1xuXG5jb25zdCBnZW5lcmF0ZUNTVlNoZWxmTGlmZSA9IGFzeW5jIChxdWVyeVBhcmFtczogVVJMU2VhcmNoUGFyYW1zKSA9PiB7XG4gIC8vIENTViBIZWFkZXJzXG4gIGNvbnN0IGNzdkRhdGEgPSBbJ1NLVSwgc2hlbGZMaWZlU3RhcnQsIHNoZWxmTGlmZUVuZCwgcXVhbnRpdHlPcmRlcmVkLCBxdWFudGl0eVJlY2VpdmVkJ107XG5cbiAgYXdhaXQgZmV0Y2hSZXBvcnRBUEkocXVlcnlQYXJhbXMsIChkYXRhOiBJUmVwb3J0U2hlbGZMaWZlUmVzcG9uc2UpID0+IHtcbiAgICBkYXRhLnJlcG9ydFNoZWxmTGlmZUxpc3QuZm9yRWFjaCgocmVwb3J0KSA9PiB7XG4gICAgICBsZXQgcmVjZWl2ZWQ7XG4gICAgICBpZiAoIXJlcG9ydC5xdWFudGl0eVJlY2VpdmVkKSB7XG4gICAgICAgIHJlY2VpdmVkID0gJy0nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVjZWl2ZWQgPSByZXBvcnQucXVhbnRpdHlSZWNlaXZlZC50b1N0cmluZygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2VhcmNoU0tVSW5wdXQudmFsdWUubGVuZ3RoICYmICFyZXBvcnQucHJvZHVjdC5TS1UuaW5jbHVkZXMoc2VhcmNoU0tVSW5wdXQudmFsdWUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY3N2RGF0YS5wdXNoKFxuICAgICAgICBbXG4gICAgICAgICAgcmVwb3J0LnByb2R1Y3QuU0tVLFxuICAgICAgICAgIGZvcm1hdERhdGUocmVwb3J0LnNoZWxmTGlmZVN0YXJ0KSxcbiAgICAgICAgICBmb3JtYXREYXRlKHJlcG9ydC5zaGVsZkxpZmVTdGFydCksXG4gICAgICAgICAgcmVwb3J0LnF1YW50aXR5LFxuICAgICAgICAgIHJlY2VpdmVkLFxuICAgICAgICBdLmpvaW4oJywnKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBjc3ZEYXRhO1xufTtcblxuY29uc3QgY3N2RG93bmxvYWRNYXA6IElDU1ZEb3dubG9hZE1hcCA9IHtcbiAgZXZlbnRzOiBnZW5lcmF0ZUNTVkV2ZW50cyxcbiAgcmVxdWVzdF9zaGFyZTogZ2VuZXJhdGVDU1ZSZXF1ZXN0U2hhcmUsXG4gIGludmVudG9yaWVzOiBnZW5lcmF0ZUNTVkludmVudG9yaWVzLFxuICBhZGp1c3RtZW50OiBnZW5lcmF0ZUNTVkFkanVzdG1lbnRzLFxuICBhc3NpZ246IGdlbmVyYXRlQ1NWQXNzaWduLFxuICBpbmJvdW5kX29yZGVyOiBnZW5lcmF0ZUNTVkluYm91bmRPcmRlcixcbiAgc2hpcHBpbmc6IGdlbmVyYXRlQ1NWU2hpcHBpbmcsXG4gIHNoZWxmX2xpZmU6IGdlbmVyYXRlQ1NWU2hlbGZMaWZlLFxufTtcblxuY29uc3QgZmlsdGVyc0lkcyA9IFtcbiAgJ3JlcXVlc3Qtc2hhcmUtdHlwZScsXG4gICdzaGlwcGluZy10eXBlJyxcbiAgJ3VzZXItc2VsZWN0JyxcbiAgJ2ZpbHRlci1zdGFydC1kYXRlJyxcbiAgJ2ZpbHRlci1zdGFydC1kYXRlLXRvJyxcbiAgJ2ZpbHRlci1lbmQtZGF0ZScsXG4gICdmaWx0ZXItZW5kLWRhdGUtdG8nLFxuICAnbWFzdGVyLWdyb3VwJyxcbiAgJ3RhcmdldC1ncm91cCcsXG4gICd0YXJnZXQtc3ViLWdyb3VwJyxcbiAgJ2ZpbHRlci1ncm91cC1icmFuZCcsXG4gICdmaWx0ZXItZ3JvdXAtbGFuZ3VhZ2UnLFxuICAnZmlsdGVyLWdyb3VwLXByZW1pc2VzJyxcbiAgJ2ZpbHRlci1ncm91cC1jYXRlZ29yaWVzJyxcbiAgJ2ZpbHRlci1ncm91cC1ldmVudHMnLFxuICAnZmlsdGVyLXByb2R1Y3QtZ3JvdXAnLFxuICAnZ3JvdXAtZnJvbScsXG4gICdncm91cC10bycsXG4gICdkaXZpc2lvbi1zZWxlY3QnLFxuICAnc2hlbGYtbGlmZS1maWx0ZXItZXhwaXJlLWluJyxcbl07XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIC8vIERPTSBub2Rlc1xuICBjb25zdCByZXBvcnRUeXBlU2VsZWN0SFRNTCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXBvcnQtdHlwZS1zZWxlY3QnKSBhcyBIVE1MU2VsZWN0RWxlbWVudDtcbiAgY29uc3QgYWxsRmlsdGVyc0hUTUwgPSBmaWx0ZXJzSWRzLm1hcCgoaWQpID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSk7XG4gIGNvbnN0IHRhYmxlTG9hZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RhYmxlLXJlcG9ydC1sb2FkZXInKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgY29uc3QgY2xlYXJGaWx0ZXJzQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbHRlci1jbGVhci1idXR0b24nKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgY29uc3Qgc2VhcmNoUXVlcnlIVE1MID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaC1xdWVyeScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIGNvbnN0IHNlYXJjaFNrdUhUTUwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoLXNrdScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIGNvbnN0IGRvd25sb2FkQ1NWQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1dHRvbi1jc3YtZG93bmxvYWQnKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcblxuICBmb3IgKGNvbnN0IFtyZXBvcnRUeXBlLCBmaWx0ZXJzXSBvZiBPYmplY3QuZW50cmllcyhmaWx0ZXJzTWFwKSkge1xuICAgIGZpbHRlcnNNYXBbcmVwb3J0VHlwZV0gPSBmaWx0ZXJzLm1hcCgoaWQpID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkIGFzIHN0cmluZykpIGFzIEhUTUxFbGVtZW50W107XG4gIH1cblxuICAvLyBTaG93L3JlbW92ZSBmaWx0ZXJzIHdoZW4gY2hvb3NlIGV2ZW50IHJlcG9ydCB0eXBlXG4gIHJlcG9ydFR5cGVTZWxlY3RIVE1MLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0SFRNTCA9IGUudGFyZ2V0IGFzIEhUTUxTZWxlY3RFbGVtZW50O1xuXG4gICAgYWxsRmlsdGVyc0hUTUwuZm9yRWFjaCgoZmlsdGVySFRNTCkgPT4gZmlsdGVySFRNTC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKSk7XG4gICAgY29uc3QgdmlzaWJsZUZpbHRlcnMgPSBmaWx0ZXJzTWFwW3NlbGVjdEhUTUwudmFsdWVdIGFzIEhUTUxFbGVtZW50W107XG4gICAgY29uc29sZS5sb2coJ3Zpc2libGVGaWx0ZXJzJywgdmlzaWJsZUZpbHRlcnMpO1xuICAgIGNvbnNvbGUubG9nKCdmaWx0ZXJzTWFwJywgZmlsdGVyc01hcCk7XG4gICAgY29uc29sZS5sb2coJ2FsbEZpbHRlcnNIVE1MJywgYWxsRmlsdGVyc0hUTUwpO1xuXG4gICAgdmlzaWJsZUZpbHRlcnMuZm9yRWFjaCgoZmlsdGVySFRNTCkgPT4gZmlsdGVySFRNTC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKSk7XG4gIH0pO1xuXG4gIHRhYmxlTG9hZGVyLmNsaWNrKCk7XG4gIGNsZWFyRmlsdGVyc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBhbGxGaWx0ZXJzSFRNTC5mb3JFYWNoKChmaWx0ZXJIVE1MKSA9PiB7XG4gICAgICBjb25zdCBpbnB1dCA9IGZpbHRlckhUTUwucXVlcnlTZWxlY3RvcignaW5wdXQsIHNlbGVjdCcpIGFzIEhUTUxTZWxlY3RFbGVtZW50IHwgSFRNTElucHV0RWxlbWVudDtcbiAgICAgIGlucHV0LnZhbHVlID0gJyc7XG4gICAgfSk7XG4gICAgc2VhcmNoUXVlcnlIVE1MLnZhbHVlID0gJyc7XG4gICAgc2VhcmNoU2t1SFRNTC52YWx1ZSA9ICcnO1xuICAgIHRhYmxlTG9hZGVyLmNsaWNrKCk7XG4gIH0pO1xuICAvLyBEb3dubG9hZCBjc3YgYnV0dG9uXG4gIGRvd25sb2FkQ1NWQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGZpbHRlcnNRdWVyeVBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgICBhbGxGaWx0ZXJzSFRNTC5mb3JFYWNoKChmaWx0ZXJIVE1MKSA9PiB7XG4gICAgICBjb25zdCBpbnB1dCA9IGZpbHRlckhUTUwucXVlcnlTZWxlY3RvcignaW5wdXQsIHNlbGVjdCcpIGFzIEhUTUxTZWxlY3RFbGVtZW50IHwgSFRNTElucHV0RWxlbWVudDtcbiAgICAgIGZpbHRlcnNRdWVyeVBhcmFtcy5hcHBlbmQoaW5wdXQuZ2V0QXR0cmlidXRlKCduYW1lJyksIGlucHV0LnZhbHVlKTtcbiAgICB9KTtcblxuICAgIGZpbHRlcnNRdWVyeVBhcmFtcy5hcHBlbmQoJ3EnLCBzZWFyY2hRdWVyeUhUTUwudmFsdWUpO1xuICAgIGZpbHRlcnNRdWVyeVBhcmFtcy5hcHBlbmQoJ3JlcG9ydF90eXBlJywgcmVwb3J0VHlwZVNlbGVjdEhUTUwudmFsdWUpO1xuXG4gICAgY29uc3QgY3N2RGF0YSA9IGF3YWl0IGNzdkRvd25sb2FkTWFwW3JlcG9ydFR5cGVTZWxlY3RIVE1MLnZhbHVlXShmaWx0ZXJzUXVlcnlQYXJhbXMpO1xuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbY3N2RGF0YS5qb2luKCdcXG4nKV0sIHsgdHlwZTogJ3RleHQvY3N2JyB9KTtcbiAgICBjb25zdCB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGEuc2V0QXR0cmlidXRlKCdocmVmJywgdXJsKTtcbiAgICBhLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCAncmVwb3J0LmNzdicpO1xuICAgIGEuY2xpY2soKTtcbiAgICBhLnJlbW92ZSgpO1xuICB9KTtcblxuICBjb25zdCBncm91cFNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXBvcnQtdGFyZ2V0LWdyb3VwLXNlbGVjdCcpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xuICBjb25zdCBncm91cElkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVwb3J0LWdyb3VwLWlkLWhpZGRlbicpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIGdyb3VwU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XG4gICAgY29uc3Qgb3B0aW9uID0gZ3JvdXBTZWxlY3QucXVlcnlTZWxlY3Rvcihgb3B0aW9uW3ZhbHVlPVwiJHtncm91cFNlbGVjdC52YWx1ZX1cIl1gKTtcbiAgICBpZiAoIW9wdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBncm91cElkSW5wdXQudmFsdWUgPSBvcHRpb24uZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldC1ncm91cC1pZCcpO1xuICAgIGdyb3VwSWRJbnB1dC5jbGljaygpO1xuICB9KTtcbn0pO1xuIiwiZXhwb3J0IGNvbnN0IGZvcm1hdERhdGUgPSAoZGF0ZTogc3RyaW5nKSA9PiB7XG4gIGlmKCFkYXRlKSB7XG4gICAgcmV0dXJuICdOb25lJztcbiAgfVxuXG4gIGNvbnN0IGNyZWF0ZUF0ID0gbmV3IERhdGUoZGF0ZSk7XG4gIGNvbnN0IHllYXIgPSBjcmVhdGVBdC5nZXRGdWxsWWVhcigpO1xuICBjb25zdCBtb250aCA9IFN0cmluZyhjcmVhdGVBdC5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgJzAnKTsgLy8gTW9udGggaXMgMC1iYXNlZFxuICBjb25zdCBkYXkgPSBTdHJpbmcoY3JlYXRlQXQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCAnMCcpO1xuICBjb25zdCBob3VycyA9IFN0cmluZyhjcmVhdGVBdC5nZXRIb3VycygpKS5wYWRTdGFydCgyLCAnMCcpO1xuICBjb25zdCBtaW51dGVzID0gU3RyaW5nKGNyZWF0ZUF0LmdldE1pbnV0ZXMoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgcmV0dXJuIGAke21vbnRofS8ke2RheX0vJHt5ZWFyfSAke2hvdXJzfToke21pbnV0ZXN9YDtcbn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3JlcG9ydC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==