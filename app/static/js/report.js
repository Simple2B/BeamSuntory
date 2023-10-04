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
                csvData = ['created_at,username,type,order_title,history'];
                return [4 /*yield*/, fetchReportAPI(queryParams, function (data) {
                        data.reports.forEach(function (report) {
                            csvData.push([
                                (0, utils_1.formatDate)(report.createdAt),
                                report.user.username,
                                report.type,
                                report.inboundOrder.title,
                                report.history
                            ].join(','));
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
                                    cart.group,
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
                csvData = ['created_at,username,type,from_group,to_group,sku,product_name'];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcmVwb3J0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVNBLG1FQUFvQztBQVVwQyxJQUFNLFVBQVUsR0FBZTtJQUMzQixRQUFRLEVBQUUsQ0FBQyxhQUFhLEVBQUUsbUJBQW1CLEVBQUUsc0JBQXNCLEVBQUUsaUJBQWlCLEVBQUUsb0JBQW9CLEVBQUU7SUFDaEgsZUFBZSxFQUFFLENBQUMsYUFBYSxFQUFFLG1CQUFtQixFQUFFLGlCQUFpQixFQUFFO0lBQ3pFLGFBQWEsRUFBRTtRQUNYLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLG9CQUFvQixFQUFFLHVCQUF1QixFQUFFLHVCQUF1QixFQUFFLHVCQUF1QixFQUFFLHFCQUFxQjtLQUNoTjtJQUNELFlBQVksRUFBRTtRQUNWLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLG9CQUFvQixFQUFFLHVCQUF1QixFQUFFLHVCQUF1QixFQUFFLHVCQUF1QixFQUFFLHFCQUFxQjtLQUNoTjtJQUNELFFBQVEsRUFBRSxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixFQUFFLGlCQUFpQixFQUFFLG9CQUFvQixFQUFFLHVCQUF1QixFQUFFLHVCQUF1QixFQUFFLHVCQUF1QixFQUFFO0lBQzdMLGVBQWUsRUFBRSxDQUFDLG1CQUFtQixFQUFFLGlCQUFpQixFQUFHLG9CQUFvQixFQUFFLHVCQUF1QixFQUFFLHVCQUF1QixFQUFFO0lBQ25JLFVBQVUsRUFBRSxDQUFDLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxtQkFBbUIsRUFBRSxpQkFBaUIsRUFBRyxvQkFBb0IsRUFBRSx1QkFBdUIsRUFBRSx1QkFBdUIsRUFBRSx1QkFBdUIsRUFBRTtDQUM3TDtBQUVELElBQU0sY0FBYyxHQUFHLFVBQU8sV0FBNEIsRUFBRSxRQUFnQzs7Ozs7Z0JBQ3RGLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBRVIscUJBQXFCLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO2dCQUN6RCxJQUFJLEdBQUcsQ0FBQzs7O3FCQUFFLEtBQUksSUFBSSxLQUFLO2dCQUN4QixHQUFHLEdBQUcsQ0FBQyxtQkFBWSxJQUFJLENBQUUsRUFBRSxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZELHFCQUFNLEtBQUssQ0FBQyxVQUFHLHFCQUFxQixTQUFHLEdBQUcsQ0FBRSxDQUFDOztnQkFBbkQsR0FBRyxHQUFHLFNBQTZDO2dCQUM1QyxlQUFJLEVBQUMsS0FBSztnQkFBQyxxQkFBTSxHQUFHLENBQUMsSUFBSSxFQUFFOztnQkFBbEMsSUFBSSxHQUFHLGNBQVcsU0FBZ0IsRUFBQztnQkFFekMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNmLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQzs7O2dCQU5FLElBQUksRUFBRTs7Ozs7S0FRekM7QUFFRCxJQUFNLGlCQUFpQixHQUFHLFVBQU8sV0FBNEI7Ozs7O2dCQUNyRCxPQUFPLEdBQUcsQ0FBQyw0RUFBNEUsQ0FBQyxDQUFDO2dCQUMvRixxQkFBTSxjQUFjLENBQUMsV0FBVyxFQUFFLFVBQUMsSUFBMkI7d0JBQzVELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGdCQUFNOzRCQUN6QixNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBSTtnQ0FDbkMsT0FBTyxDQUFDLElBQUksQ0FDVjtvQ0FDRSxNQUFNLENBQUMsU0FBUztvQ0FDaEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUztvQ0FDbEMsTUFBTSxDQUFDLElBQUk7b0NBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRO29DQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7b0NBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtvQ0FDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHO29DQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUk7aUNBQ2xCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUNaLENBQUM7NEJBQ0osQ0FBQyxDQUFDLENBQUM7d0JBQ0wsQ0FBQyxDQUFDLENBQUM7b0JBQ0wsQ0FBQyxDQUFDOztnQkFqQkYsU0FpQkUsQ0FBQztnQkFDSCxzQkFBTyxPQUFPLEVBQUM7OztLQUNoQjtBQUdELElBQU0sdUJBQXVCLEdBQUcsVUFBTyxXQUE0Qjs7Ozs7Z0JBQzNELE9BQU8sR0FBRyxDQUFDLGtHQUFrRyxDQUFDLENBQUM7Z0JBQ3JILHFCQUFNLGNBQWMsQ0FBQyxXQUFXLEVBQUUsVUFBQyxJQUFpQzt3QkFDbEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsZ0JBQU07NEJBQ3pCLE9BQU8sQ0FBQyxJQUFJLENBQ1Y7Z0NBQ0UsTUFBTSxDQUFDLElBQUk7Z0NBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRO2dDQUNwQixNQUFNLENBQUMsU0FBUztnQ0FDaEIsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNO2dDQUMxQixNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJO2dDQUM5QixNQUFNLENBQUMsWUFBWSxDQUFDLGNBQWM7Z0NBQ2xDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUc7Z0NBQy9CLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUk7NkJBQ2pDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUNaO3dCQUNILENBQUMsQ0FBQyxDQUFDO29CQUNMLENBQUMsQ0FBQzs7Z0JBZkYsU0FlRSxDQUFDO2dCQUNILHNCQUFPLE9BQU8sRUFBQzs7O0tBQ2hCO0FBRUQsSUFBTSxzQkFBc0IsR0FBRyxVQUFPLFdBQTRCOzs7OztnQkFFMUQsT0FBTyxHQUFHLENBQUMsMkVBQTJFLENBQUMsQ0FBQztnQkFDOUYscUJBQU0sY0FBYyxDQUFDLFdBQVcsRUFBRSxVQUFDLElBQWdDO3dCQUNqRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxnQkFBTTs0QkFDekIsSUFBSSxZQUFvQixDQUFDOzRCQUN6QixJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7Z0NBQ2hCLFlBQVksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQzs2QkFDdkM7aUNBQU0sSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFO2dDQUMzQixZQUFZLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7NkJBQ3RDO2lDQUFNO2dDQUNMLFlBQVksR0FBRyxpQkFBaUIsQ0FBQzs2QkFDbEM7NEJBRUQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxtQkFBUztnQ0FDeEMsT0FBTyxDQUFDLElBQUksQ0FBQztvQ0FDWCxzQkFBVSxFQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7b0NBQzVCLFlBQVk7b0NBQ1osTUFBTSxDQUFDLElBQUk7b0NBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRO29DQUNwQixTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRTtvQ0FDOUIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7b0NBQzdCLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRztvQ0FDckIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJO2lDQUN2QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUNmLENBQUMsQ0FBQzt3QkFDSixDQUFDLENBQUMsQ0FBQztvQkFDTCxDQUFDLENBQUM7O2dCQXhCRixTQXdCRSxDQUFDO2dCQUNILHNCQUFPLE9BQU8sRUFBQzs7O0tBQ2hCO0FBR0QsSUFBTSxzQkFBc0IsR0FBRyxVQUFPLFdBQTRCOzs7OztnQkFFMUQsT0FBTyxHQUFHLENBQUMsa0dBQWtHLENBQUMsQ0FBQztnQkFDckgscUJBQU0sY0FBYyxDQUFDLFdBQVcsRUFBRSxVQUFDLElBQTJCO3dCQUM1RCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU07NEJBQzFCLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQUMsWUFBWTtnQ0FDekMsT0FBTyxDQUFDLElBQUksQ0FDVjtvQ0FDRSxzQkFBVSxFQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7b0NBQzVCLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSTtvQ0FDbkIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHO29DQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVE7b0NBQ3BCLFlBQVksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUk7b0NBQ25DLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSTtvQ0FDdkIsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJO29DQUMzQixZQUFZLENBQUMsY0FBYztvQ0FDM0IsWUFBWSxDQUFDLGFBQWE7aUNBQzNCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUNaLENBQUM7NEJBQ0osQ0FBQyxDQUFDLENBQUM7d0JBQ0wsQ0FBQyxDQUFDLENBQUM7b0JBQ0wsQ0FBQyxDQUFDOztnQkFuQkYsU0FtQkUsQ0FBQztnQkFDSCxzQkFBTyxPQUFPLEVBQUM7OztLQUNoQjtBQUdELElBQU0sdUJBQXVCLEdBQUcsVUFBTyxXQUE0Qjs7Ozs7Z0JBQzNELE9BQU8sR0FBRyxDQUFDLDhDQUE4QyxDQUFDO2dCQUNoRSxxQkFBTSxjQUFjLENBQUMsV0FBVyxFQUFFLFVBQUMsSUFBaUM7d0JBQ2xFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGdCQUFNOzRCQUN6QixPQUFPLENBQUMsSUFBSSxDQUNWO2dDQUNFLHNCQUFVLEVBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztnQ0FDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRO2dDQUNwQixNQUFNLENBQUMsSUFBSTtnQ0FDWCxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUs7Z0NBQ3pCLE1BQU0sQ0FBQyxPQUFPOzZCQUNmLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUNaO3dCQUNILENBQUMsQ0FBQyxDQUFDO29CQUNMLENBQUMsQ0FBQzs7Z0JBWkYsU0FZRSxDQUFDO2dCQUNILHNCQUFPLE9BQU8sRUFBQzs7O0tBQ2hCO0FBRUQsSUFBTSxtQkFBbUIsR0FBRyxVQUFPLFdBQTRCOzs7OztnQkFFdkQsT0FBTyxHQUFHLENBQUMseUhBQXlILENBQUMsQ0FBQztnQkFDNUkscUJBQU0sY0FBYyxDQUFDLFdBQVcsRUFBRSxVQUFDLElBQTZCO3dCQUM5RCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxnQkFBTTs0QkFDekIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGNBQUk7Z0NBQ25DLE9BQU8sQ0FBQyxJQUFJLENBQ1o7b0NBQ0UsTUFBTSxDQUFDLElBQUk7b0NBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRO29DQUNwQixNQUFNLENBQUMsU0FBUztvQ0FDaEIsTUFBTSxDQUFDLE9BQU87b0NBQ2QsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNO29DQUN6QixNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVM7b0NBQzVCLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVM7b0NBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRztvQ0FDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJO29DQUNqQixJQUFJLENBQUMsS0FBSztvQ0FDVixJQUFJLENBQUMsUUFBUTtpQ0FDZCxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FDWjs0QkFDRCxDQUFDLENBQUM7d0JBRUosQ0FBQyxDQUFDLENBQUM7b0JBQ0wsQ0FBQyxDQUFDOztnQkFyQkYsU0FxQkUsQ0FBQztnQkFFSCxzQkFBTyxPQUFPLEVBQUM7OztLQUNoQjtBQUdELElBQU0saUJBQWlCLEdBQUcsVUFBTyxXQUE0Qjs7Ozs7Z0JBRXJELE9BQU8sR0FBRyxDQUFDLCtEQUErRCxDQUFDO2dCQUVqRixxQkFBTSxjQUFjLENBQUMsV0FBVyxFQUFFLFVBQUMsSUFBMkI7d0JBQzVELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO3dCQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxnQkFBTTs0QkFDekIsT0FBTyxDQUFDLElBQUksQ0FDVjtnQ0FDRSxzQkFBVSxFQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7Z0NBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUTtnQ0FDcEIsTUFBTSxDQUFDLElBQUk7Z0NBQ1gsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJO2dDQUNyQixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUk7Z0NBQ2pCLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRztnQ0FDbEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJOzZCQUNwQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FDWjt3QkFDSCxDQUFDLENBQUMsQ0FBQztvQkFDTCxDQUFDLENBQUM7O2dCQWZGLFNBZUUsQ0FBQztnQkFDSCxzQkFBTyxPQUFPLEVBQUM7OztLQUNoQjtBQUVELElBQU0sY0FBYyxHQUFvQjtJQUN0QyxRQUFRLEVBQUUsaUJBQWlCO0lBQzNCLGVBQWUsRUFBRSx1QkFBdUI7SUFDeEMsYUFBYSxFQUFFLHNCQUFzQjtJQUNyQyxZQUFZLEVBQUUsc0JBQXNCO0lBQ3BDLFFBQVEsRUFBRSxpQkFBaUI7SUFDM0IsZUFBZSxFQUFFLHVCQUF1QjtJQUN4QyxVQUFVLEVBQUUsbUJBQW1CO0NBQ2hDO0FBRUQsSUFBTSxVQUFVLEdBQUc7SUFDakIsb0JBQW9CO0lBQ3BCLGVBQWU7SUFDZixhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLHNCQUFzQjtJQUN0QixpQkFBaUI7SUFDakIsb0JBQW9CO0lBQ3BCLGNBQWM7SUFDZCxjQUFjO0lBQ2Qsb0JBQW9CO0lBQ3BCLHVCQUF1QjtJQUN2Qix1QkFBdUI7SUFDdkIsdUJBQXVCO0lBQ3ZCLHFCQUFxQjtJQUNyQixZQUFZO0lBQ1osVUFBVTtJQUNWLGlCQUFpQjtDQUNsQixDQUFDO0FBRUYsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFO0lBQzVDLFlBQVk7SUFDWixJQUFNLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQXNCLENBQUM7SUFDaEcsSUFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxZQUFFLElBQUksZUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDO0lBQ3pFLElBQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQXNCLENBQUM7SUFDeEYsSUFBTSxrQkFBa0IsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUFzQixDQUFDO0lBQy9GLElBQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFxQixDQUFDO0lBQ3BGLElBQU0saUJBQWlCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBc0IsQ0FBQztJQUU5RixLQUFvQyxVQUEwQixFQUExQixXQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUExQixjQUEwQixFQUExQixJQUEwQixFQUFFO1FBQXJELGVBQXFCLEVBQXBCLFVBQVUsVUFBRSxPQUFPO1FBQzNCLFVBQVUsQ0FBQyxVQUFVLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQUUsSUFBSSxlQUFRLENBQUMsY0FBYyxDQUFDLEVBQVksQ0FBQyxFQUFyQyxDQUFxQyxDQUFrQixDQUFDO0tBQ3RHO0lBRUQsb0RBQW9EO0lBQ3BELG9CQUFvQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxVQUFDLENBQUM7UUFDOUMsSUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFDLE1BQTJCLENBQUM7UUFDakQsY0FBYyxDQUFDLE9BQU8sQ0FBQyxvQkFBVSxJQUFJLGlCQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBbEMsQ0FBa0MsQ0FBQyxDQUFDO1FBQ3pFLElBQU0sY0FBYyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFrQixDQUFDO1FBQ3JFLGNBQWMsQ0FBQyxPQUFPLENBQUMsb0JBQVUsSUFBSSxpQkFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQXJDLENBQXFDLENBQUMsQ0FBQztJQUNoRixDQUFDLENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNwQixrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDM0MsY0FBYyxDQUFDLE9BQU8sQ0FBQyxvQkFBVTtZQUMvQixJQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBeUMsQ0FBQztZQUNoRyxLQUFLLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztRQUNILGVBQWUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQzNCLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN0QixDQUFDLENBQUMsQ0FBQztJQUNILHNCQUFzQjtJQUN0QixpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7Ozs7O29CQUNwQyxrQkFBa0IsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO29CQUNqRCxjQUFjLENBQUMsT0FBTyxDQUFDLG9CQUFVO3dCQUMvQixJQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBeUM7d0JBQy9GLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDckUsQ0FBQyxDQUFDO29CQUNGLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN0RCxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNyRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDdkMscUJBQU0sY0FBYyxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDLGtCQUFrQixDQUFDOztvQkFBOUUsT0FBTyxHQUFHLFNBQW9FO29CQUM5RSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztvQkFDNUQsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN2QyxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdEMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQzVCLENBQUMsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDO29CQUN6QyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ1YsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7O1NBQ1osQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDN1NJLElBQU0sVUFBVSxHQUFHLFVBQUMsSUFBWTtJQUNyQyxJQUFNLFFBQVEsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDcEMsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsbUJBQW1CO0lBQ25GLElBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3hELElBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzNELElBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQy9ELE9BQU8sVUFBRyxLQUFLLGNBQUksR0FBRyxjQUFJLElBQUksY0FBSSxLQUFLLGNBQUksT0FBTyxDQUFFLENBQUM7QUFDdkQsQ0FBQyxDQUFDO0FBUlcsa0JBQVUsY0FRckI7Ozs7Ozs7VUNSRjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RhdGljLy4vc3JjL3JlcG9ydC50cyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9zcmMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBcbiAgSVJlcG9ydFJlcXVlc3RTaGFyZVJlc3BvbnNlLFxuICBJRXZlbnRzUmVwb3J0UmVzcG9uc2UsXG4gIElJbnZlbnRvcmllc1JlcG9ydFJlc3BvbnNlLFxuICBJUmVwb3J0QWRqdXN0UmVzcG9uc2UsXG4gIElSZXBvcnRJbmJvdW5kT3JkZXJSZXNwb25zZSxcbiAgSVJlcG9ydFNoaXBwaW5nUmVzcG9uc2UsXG4gIElSZXBvcnRBc3NpZ25SZXNwb25zZSxcbn0gZnJvbSBcIi4vdHlwZXNcIlxuaW1wb3J0IHsgZm9ybWF0RGF0ZSB9IGZyb20gXCIuL3V0aWxzXCJcblxuaW50ZXJmYWNlIElGaWx0ZXJNYXAge1xuICBbaW5kZXg6IHN0cmluZ106IHN0cmluZ1tdIHwgSFRNTEVsZW1lbnRbXVxufVxuXG5pbnRlcmZhY2UgSUNTVkRvd25sb2FkTWFwIHtcbiAgW2luZGV4OiBzdHJpbmddOiAocXVlcnk6IFVSTFNlYXJjaFBhcmFtcykgPT4gUHJvbWlzZTxzdHJpbmdbXT5cbn1cblxuY29uc3QgZmlsdGVyc01hcDogSUZpbHRlck1hcCA9IHtcbiAgICAnZXZlbnRzJzogWyd1c2VyLXNlbGVjdCcsICdmaWx0ZXItc3RhcnQtZGF0ZScsICdmaWx0ZXItc3RhcnQtZGF0ZS10bycsICdmaWx0ZXItZW5kLWRhdGUnLCAnZmlsdGVyLWVuZC1kYXRlLXRvJyxdLFxuICAgICdyZXF1ZXN0X3NoYXJlJzogWyd1c2VyLXNlbGVjdCcsICdmaWx0ZXItc3RhcnQtZGF0ZScsICdmaWx0ZXItZW5kLWRhdGUnLF0sXG4gICAgJ2ludmVudG9yaWVzJzogW1xuICAgICAgICAndXNlci1zZWxlY3QnLCAnZmlsdGVyLXN0YXJ0LWRhdGUnLCAnZmlsdGVyLWVuZC1kYXRlJywgJ21hc3Rlci1ncm91cCcsICd0YXJnZXQtZ3JvdXAnLCAnZmlsdGVyLWdyb3VwLWJyYW5kJywgJ2ZpbHRlci1ncm91cC1sYW5ndWFnZScsICdmaWx0ZXItZ3JvdXAtcHJlbWlzZXMnLCAnZmlsdGVyLWdyb3VwLWNhdGVnb3J5JywgJ2ZpbHRlci1ncm91cC1ldmVudHMnLFxuICAgIF0sXG4gICAgJ2FkanVzdG1lbnQnOiBbXG4gICAgICAgICd1c2VyLXNlbGVjdCcsICdmaWx0ZXItc3RhcnQtZGF0ZScsICdmaWx0ZXItZW5kLWRhdGUnLCAnbWFzdGVyLWdyb3VwJywgJ3RhcmdldC1ncm91cCcsICdmaWx0ZXItZ3JvdXAtYnJhbmQnLCAnZmlsdGVyLWdyb3VwLWxhbmd1YWdlJywgJ2ZpbHRlci1ncm91cC1wcmVtaXNlcycsICdmaWx0ZXItZ3JvdXAtY2F0ZWdvcnknLCAnZmlsdGVyLWdyb3VwLWV2ZW50cycsXG4gICAgXSxcbiAgICAnYXNzaWduJzogWyd1c2VyLXNlbGVjdCcsICdncm91cC1mcm9tJywgJ2dyb3VwLXRvJywgJ2ZpbHRlci1zdGFydC1kYXRlJywgJ2ZpbHRlci1lbmQtZGF0ZScsICdmaWx0ZXItZ3JvdXAtYnJhbmQnLCAnZmlsdGVyLWdyb3VwLWxhbmd1YWdlJywgJ2ZpbHRlci1ncm91cC1wcmVtaXNlcycsICdmaWx0ZXItZ3JvdXAtY2F0ZWdvcnknLF0sXG4gICAgJ2luYm91bmRfb3JkZXInOiBbJ2ZpbHRlci1zdGFydC1kYXRlJywgJ2ZpbHRlci1lbmQtZGF0ZScsICAnZmlsdGVyLWdyb3VwLWJyYW5kJywgJ2ZpbHRlci1ncm91cC1wcmVtaXNlcycsICdmaWx0ZXItZ3JvdXAtY2F0ZWdvcnknLF0sXG4gICAgJ3NoaXBwaW5nJzogWydkaXZpc2lvbi1zZWxlY3QnLCAndGFyZ2V0LWdyb3VwJywgJ2ZpbHRlci1zdGFydC1kYXRlJywgJ2ZpbHRlci1lbmQtZGF0ZScsICAnZmlsdGVyLWdyb3VwLWJyYW5kJywgJ2ZpbHRlci1ncm91cC1sYW5ndWFnZScsICdmaWx0ZXItZ3JvdXAtY2F0ZWdvcnknLCAnZmlsdGVyLWdyb3VwLXByZW1pc2VzJyxdLFxufVxuXG5jb25zdCBmZXRjaFJlcG9ydEFQSSA9IGFzeW5jIChxdWVyeVBhcmFtczogVVJMU2VhcmNoUGFyYW1zLCBjYWxsYmFjazogKGRhdGE6IE9iamVjdCkgPT4gdm9pZCkgPT4ge1xuICBsZXQgcGFnZXMgPSAxO1xuXG4gIGNvbnN0IHVybFdpdGhvdXRRdWVyeVBhcmFtcyA9IGxvY2F0aW9uLm9yaWdpbiArIGxvY2F0aW9uLnBhdGhuYW1lO1xuICBmb3IgKGxldCBwYWdlID0gMTsgcGFnZSA8PSBwYWdlczsgcGFnZSsrKSB7XG4gICAgY29uc3QgdXJsID0gW2BhcGk/cGFnZT0ke3BhZ2V9YCwgcXVlcnlQYXJhbXMudG9TdHJpbmcoKV0uam9pbignJicpO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke3VybFdpdGhvdXRRdWVyeVBhcmFtc30ke3VybH1gKTtcbiAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShhd2FpdCByZXMuanNvbigpKTtcblxuICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgIHBhZ2VzID0gZGF0YS5wYWdpbmF0aW9uLnBhZ2VzO1xuICB9XG59XG5cbmNvbnN0IGdlbmVyYXRlQ1NWRXZlbnRzID0gYXN5bmMgKHF1ZXJ5UGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMpID0+IHtcbiAgY29uc3QgY3N2RGF0YSA9IFsnYWN0aW9uX3R5cGUsdXNlcixjcmVhdGVkX2F0LGV2ZW50X2RhdGVfZnJvbSxldmVudF9kYXRlX3RvLHNrdSxwcm9kdWN0X25hbWUnXTtcbiAgYXdhaXQgZmV0Y2hSZXBvcnRBUEkocXVlcnlQYXJhbXMsIChkYXRhOiBJRXZlbnRzUmVwb3J0UmVzcG9uc2UpID0+IHtcbiAgICBkYXRhLnJlcG9ydHMuZm9yRWFjaChyZXBvcnQgPT4ge1xuICAgICAgcmVwb3J0LnNoaXBSZXF1ZXN0LmNhcnRzLmZvckVhY2goY2FydCA9PiB7XG4gICAgICAgIGNzdkRhdGEucHVzaChcbiAgICAgICAgICBbXG4gICAgICAgICAgICByZXBvcnQuY3JlYXRlZEF0LFxuICAgICAgICAgICAgcmVwb3J0LnNoaXBSZXF1ZXN0LnN0b3JlLnN0b3JlTmFtZSxcbiAgICAgICAgICAgIHJlcG9ydC50eXBlLFxuICAgICAgICAgICAgcmVwb3J0LnVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgICBjYXJ0LmV2ZW50LmRhdGVGcm9tLFxuICAgICAgICAgICAgY2FydC5ldmVudC5kYXRlVG8sXG4gICAgICAgICAgICBjYXJ0LnByb2R1Y3QuU0tVLFxuICAgICAgICAgICAgY2FydC5wcm9kdWN0Lm5hbWUsXG4gICAgICAgICAgXS5qb2luKCcsJylcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGNzdkRhdGE7XG59XG5cblxuY29uc3QgZ2VuZXJhdGVDU1ZSZXF1ZXN0U2hhcmUgPSBhc3luYyAocXVlcnlQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcykgPT4ge1xuICBjb25zdCBjc3ZEYXRhID0gWydhY3Rpb25fdHlwZSx1c2VyLGNyZWF0ZWRfYXQsY3VycmVudF9zaGFyZV9yZXF1ZXN0X3N0YXR1cyxncm91cCxkZXNpcmVkX3F1YW50aXR5LHNrdSxwcm9kdWN0X25hbWUnXTtcbiAgYXdhaXQgZmV0Y2hSZXBvcnRBUEkocXVlcnlQYXJhbXMsIChkYXRhOiBJUmVwb3J0UmVxdWVzdFNoYXJlUmVzcG9uc2UpID0+IHtcbiAgICBkYXRhLnJlcG9ydHMuZm9yRWFjaChyZXBvcnQgPT4ge1xuICAgICAgY3N2RGF0YS5wdXNoKFxuICAgICAgICBbXG4gICAgICAgICAgcmVwb3J0LnR5cGUsXG4gICAgICAgICAgcmVwb3J0LnVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgcmVwb3J0LmNyZWF0ZWRBdCxcbiAgICAgICAgICByZXBvcnQucmVxdWVzdFNoYXJlLnN0YXR1cyxcbiAgICAgICAgICByZXBvcnQucmVxdWVzdFNoYXJlLmdyb3VwLm5hbWUsXG4gICAgICAgICAgcmVwb3J0LnJlcXVlc3RTaGFyZS5kZXNpcmVRdWFudGl0eSxcbiAgICAgICAgICByZXBvcnQucmVxdWVzdFNoYXJlLnByb2R1Y3QuU0tVLFxuICAgICAgICAgIHJlcG9ydC5yZXF1ZXN0U2hhcmUucHJvZHVjdC5uYW1lLFxuICAgICAgICBdLmpvaW4oJywnKVxuICAgICAgKVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGNzdkRhdGE7XG59XG5cbmNvbnN0IGdlbmVyYXRlQ1NWSW52ZW50b3JpZXMgPSBhc3luYyAocXVlcnlQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcykgPT4ge1xuICAvLyBDU1YgSGVhZGVyc1xuICBjb25zdCBjc3ZEYXRhID0gWydjcmVhdGVkX2F0LHN0b3JlX25hbWUsdHlwZSx1c2VybmFtZSxxdHlfYmVmb3JlLHF0eV9hZnRlcixza3UscHJvZHVjdF9uYW1lJ107XG4gIGF3YWl0IGZldGNoUmVwb3J0QVBJKHF1ZXJ5UGFyYW1zLCAoZGF0YTogSUludmVudG9yaWVzUmVwb3J0UmVzcG9uc2UpID0+IHtcbiAgICBkYXRhLnJlcG9ydHMuZm9yRWFjaChyZXBvcnQgPT4ge1xuICAgICAgbGV0IHJlcG9ydFRhcmdldDogc3RyaW5nO1xuICAgICAgaWYgKHJlcG9ydC5zdG9yZSkge1xuICAgICAgICByZXBvcnRUYXJnZXQgPSByZXBvcnQuc3RvcmUuc3RvcmVOYW1lO1xuICAgICAgfSBlbHNlIGlmIChyZXBvcnQud2FyZWhvdXNlKSB7XG4gICAgICAgIHJlcG9ydFRhcmdldCA9IHJlcG9ydC53YXJlaG91c2UubmFtZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcG9ydFRhcmdldCA9ICdJbnRlcm5hbCBhY3Rpb24nO1xuICAgICAgfVxuICAgICAgXG4gICAgICByZXBvcnQucmVwb3J0SW52ZW50b3JpZXMuZm9yRWFjaChpbnZlbnRvcnkgPT4ge1xuICAgICAgICBjc3ZEYXRhLnB1c2goW1xuICAgICAgICAgIGZvcm1hdERhdGUocmVwb3J0LmNyZWF0ZWRBdCksXG4gICAgICAgICAgcmVwb3J0VGFyZ2V0LFxuICAgICAgICAgIHJlcG9ydC50eXBlLFxuICAgICAgICAgIHJlcG9ydC51c2VyLnVzZXJuYW1lLFxuICAgICAgICAgIGludmVudG9yeS5xdHlCZWZvcmUudG9TdHJpbmcoKSxcbiAgICAgICAgICBpbnZlbnRvcnkucXR5QWZ0ZXIudG9TdHJpbmcoKSxcbiAgICAgICAgICBpbnZlbnRvcnkucHJvZHVjdC5TS1UsXG4gICAgICAgICAgaW52ZW50b3J5LnByb2R1Y3QubmFtZSxcbiAgICAgICAgXS5qb2luKCcsJykpO1xuICAgICAgfSlcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBjc3ZEYXRhO1xufVxuXG5cbmNvbnN0IGdlbmVyYXRlQ1NWQWRqdXN0bWVudHMgPSBhc3luYyAocXVlcnlQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcykgPT4ge1xuICAvLyBDU1YgSGVhZGVyc1xuICBjb25zdCBjc3ZEYXRhID0gWydjcmVhdGVkX2F0LHByb2R1Y3RfbmFtZSxza3UsdXNlcm5hbWUsbWFzdGVyX2dyb3VwLGdyb3VwLHdhcmVob3VzZSxxdWFudGl0eV9iZWZvcmUscXVhbnRpdHlfYWZ0ZXInXTtcbiAgYXdhaXQgZmV0Y2hSZXBvcnRBUEkocXVlcnlQYXJhbXMsIChkYXRhOiBJUmVwb3J0QWRqdXN0UmVzcG9uc2UpID0+IHtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICBkYXRhLnJlcG9ydHMuZm9yRWFjaCgoYWRqdXN0KSA9PiB7XG4gICAgICBhZGp1c3QuYWRqdXN0R3JvdXBRdHkuZm9yRWFjaCgocmVwb3J0QWRqdXN0KSA9PiB7XG4gICAgICAgIGNzdkRhdGEucHVzaChcbiAgICAgICAgICBbXG4gICAgICAgICAgICBmb3JtYXREYXRlKGFkanVzdC5jcmVhdGVkQXQpLFxuICAgICAgICAgICAgYWRqdXN0LnByb2R1Y3QubmFtZSxcbiAgICAgICAgICAgIGFkanVzdC5wcm9kdWN0LlNLVSxcbiAgICAgICAgICAgIGFkanVzdC51c2VyLnVzZXJuYW1lLFxuICAgICAgICAgICAgcmVwb3J0QWRqdXN0Lmdyb3VwLm1hc3Rlckdyb3VwLm5hbWUsXG4gICAgICAgICAgICByZXBvcnRBZGp1c3QuZ3JvdXAubmFtZSxcbiAgICAgICAgICAgIHJlcG9ydEFkanVzdC53YXJlaG91c2UubmFtZSxcbiAgICAgICAgICAgIHJlcG9ydEFkanVzdC5xdWFudGl0eUJlZm9yZSxcbiAgICAgICAgICAgIHJlcG9ydEFkanVzdC5xdWFudGl0eUFmdGVyLFxuICAgICAgICAgIF0uam9pbignLCcpXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBjc3ZEYXRhO1xufVxuXG5cbmNvbnN0IGdlbmVyYXRlQ1NWSW5ib3VuZE9yZGVyID0gYXN5bmMgKHF1ZXJ5UGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMpID0+IHtcbiAgY29uc3QgY3N2RGF0YSA9IFsnY3JlYXRlZF9hdCx1c2VybmFtZSx0eXBlLG9yZGVyX3RpdGxlLGhpc3RvcnknXVxuICBhd2FpdCBmZXRjaFJlcG9ydEFQSShxdWVyeVBhcmFtcywgKGRhdGE6IElSZXBvcnRJbmJvdW5kT3JkZXJSZXNwb25zZSkgPT4geyAgICBcbiAgICBkYXRhLnJlcG9ydHMuZm9yRWFjaChyZXBvcnQgPT4ge1xuICAgICAgY3N2RGF0YS5wdXNoKFxuICAgICAgICBbXG4gICAgICAgICAgZm9ybWF0RGF0ZShyZXBvcnQuY3JlYXRlZEF0KSxcbiAgICAgICAgICByZXBvcnQudXNlci51c2VybmFtZSxcbiAgICAgICAgICByZXBvcnQudHlwZSwgICAgIFxuICAgICAgICAgIHJlcG9ydC5pbmJvdW5kT3JkZXIudGl0bGUsICAgIFxuICAgICAgICAgIHJlcG9ydC5oaXN0b3J5ICAgICAgICBcbiAgICAgICAgXS5qb2luKCcsJylcbiAgICAgIClcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBjc3ZEYXRhO1xufVxuXG5jb25zdCBnZW5lcmF0ZUNTVlNoaXBwaW5nID0gYXN5bmMgKHF1ZXJ5UGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMpID0+IHtcbiAgLy8gQ1NWIEhlYWRlcnNcbiAgY29uc3QgY3N2RGF0YSA9IFsnYWN0aW9uX3R5cGUsdXNlcixjcmVhdGVkX2F0LGhpc3RvcnksY3VycmVudF9zaGlwX3JlcXVlc3Rfc3RhdHVzLG9yZGVyX251bWJlcixzdG9yZV9uYW1lLHNrdSxwcm9kdWN0X25hbWUsZ3JvdXAscXVhbnRpdHknXTtcbiAgYXdhaXQgZmV0Y2hSZXBvcnRBUEkocXVlcnlQYXJhbXMsIChkYXRhOiBJUmVwb3J0U2hpcHBpbmdSZXNwb25zZSkgPT4ge1xuICAgIGRhdGEucmVwb3J0cy5mb3JFYWNoKHJlcG9ydCA9PiB7XG4gICAgICByZXBvcnQuc2hpcFJlcXVlc3QuY2FydHMuZm9yRWFjaChjYXJ0ID0+IHtcbiAgICAgICAgY3N2RGF0YS5wdXNoKFxuICAgICAgICBbXG4gICAgICAgICAgcmVwb3J0LnR5cGUsXG4gICAgICAgICAgcmVwb3J0LnVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgcmVwb3J0LmNyZWF0ZWRBdCxcbiAgICAgICAgICByZXBvcnQuaGlzdG9yeSxcbiAgICAgICAgICByZXBvcnQuc2hpcFJlcXVlc3Quc3RhdHVzLFxuICAgICAgICAgIHJlcG9ydC5zaGlwUmVxdWVzdC5vcmRlck51bWIsXG4gICAgICAgICAgcmVwb3J0LnNoaXBSZXF1ZXN0LnN0b3JlLnN0b3JlTmFtZSxcbiAgICAgICAgICBjYXJ0LnByb2R1Y3QuU0tVLFxuICAgICAgICAgIGNhcnQucHJvZHVjdC5uYW1lLFxuICAgICAgICAgIGNhcnQuZ3JvdXAsXG4gICAgICAgICAgY2FydC5xdWFudGl0eSxcbiAgICAgICAgXS5qb2luKCcsJylcbiAgICAgIClcbiAgICAgIH0pXG4gICAgIFxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gY3N2RGF0YTtcbn1cblxuXG5jb25zdCBnZW5lcmF0ZUNTVkFzc2lnbiA9IGFzeW5jIChxdWVyeVBhcmFtczogVVJMU2VhcmNoUGFyYW1zKSA9PiB7XG4gIC8vIENTViBIZWFkZXJzXG4gIGNvbnN0IGNzdkRhdGEgPSBbJ2NyZWF0ZWRfYXQsdXNlcm5hbWUsdHlwZSxmcm9tX2dyb3VwLHRvX2dyb3VwLHNrdSxwcm9kdWN0X25hbWUnXVxuICBcbiAgYXdhaXQgZmV0Y2hSZXBvcnRBUEkocXVlcnlQYXJhbXMsIChkYXRhOiBJUmVwb3J0QXNzaWduUmVzcG9uc2UpID0+IHtcbiAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgIGRhdGEucmVwb3J0cy5mb3JFYWNoKHJlcG9ydCA9PiB7XG4gICAgICBjc3ZEYXRhLnB1c2goXG4gICAgICAgIFtcbiAgICAgICAgICBmb3JtYXREYXRlKHJlcG9ydC5jcmVhdGVkQXQpLFxuICAgICAgICAgIHJlcG9ydC51c2VyLnVzZXJuYW1lLFxuICAgICAgICAgIHJlcG9ydC50eXBlLFxuICAgICAgICAgIHJlcG9ydC5mcm9tR3JvdXAubmFtZSxcbiAgICAgICAgICByZXBvcnQuZ3JvdXAubmFtZSxcbiAgICAgICAgICByZXBvcnQucHJvZHVjdC5TS1UsXG4gICAgICAgICAgcmVwb3J0LnByb2R1Y3QubmFtZSxcbiAgICAgICAgXS5qb2luKCcsJylcbiAgICAgIClcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBjc3ZEYXRhO1xufVxuXG5jb25zdCBjc3ZEb3dubG9hZE1hcDogSUNTVkRvd25sb2FkTWFwID0ge1xuICAnZXZlbnRzJzogZ2VuZXJhdGVDU1ZFdmVudHMsXG4gICdyZXF1ZXN0X3NoYXJlJzogZ2VuZXJhdGVDU1ZSZXF1ZXN0U2hhcmUsXG4gICdpbnZlbnRvcmllcyc6IGdlbmVyYXRlQ1NWSW52ZW50b3JpZXMsXG4gICdhZGp1c3RtZW50JzogZ2VuZXJhdGVDU1ZBZGp1c3RtZW50cyxcbiAgJ2Fzc2lnbic6IGdlbmVyYXRlQ1NWQXNzaWduLFxuICAnaW5ib3VuZF9vcmRlcic6IGdlbmVyYXRlQ1NWSW5ib3VuZE9yZGVyLFxuICAnc2hpcHBpbmcnOiBnZW5lcmF0ZUNTVlNoaXBwaW5nLFxufVxuXG5jb25zdCBmaWx0ZXJzSWRzID0gW1xuICAncmVxdWVzdC1zaGFyZS10eXBlJyxcbiAgJ3NoaXBwaW5nLXR5cGUnLFxuICAndXNlci1zZWxlY3QnLFxuICAnZmlsdGVyLXN0YXJ0LWRhdGUnLFxuICAnZmlsdGVyLXN0YXJ0LWRhdGUtdG8nLFxuICAnZmlsdGVyLWVuZC1kYXRlJyxcbiAgJ2ZpbHRlci1lbmQtZGF0ZS10bycsICBcbiAgJ21hc3Rlci1ncm91cCcsXG4gICd0YXJnZXQtZ3JvdXAnLFxuICAnZmlsdGVyLWdyb3VwLWJyYW5kJyxcbiAgJ2ZpbHRlci1ncm91cC1sYW5ndWFnZScsXG4gICdmaWx0ZXItZ3JvdXAtcHJlbWlzZXMnLFxuICAnZmlsdGVyLWdyb3VwLWNhdGVnb3J5JyxcbiAgJ2ZpbHRlci1ncm91cC1ldmVudHMnLFxuICAnZ3JvdXAtZnJvbScsXG4gICdncm91cC10bycsXG4gICdkaXZpc2lvbi1zZWxlY3QnLFxuXTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgLy8gRE9NIG5vZGVzXG4gIGNvbnN0IHJlcG9ydFR5cGVTZWxlY3RIVE1MID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlcG9ydC10eXBlLXNlbGVjdCcpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xuICBjb25zdCBhbGxGaWx0ZXJzSFRNTCA9IGZpbHRlcnNJZHMubWFwKGlkID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSk7XG4gIGNvbnN0IHRhYmxlTG9hZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RhYmxlLXJlcG9ydC1sb2FkZXInKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgY29uc3QgY2xlYXJGaWx0ZXJzQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbHRlci1jbGVhci1idXR0b24nKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgY29uc3Qgc2VhcmNoUXVlcnlIVE1MID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaC1xdWVyeScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIGNvbnN0IGRvd25sb2FkQ1NWQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1dHRvbi1jc3YtZG93bmxvYWQnKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcblxuICBmb3IgKGNvbnN0IFtyZXBvcnRUeXBlLCBmaWx0ZXJzXSBvZiBPYmplY3QuZW50cmllcyhmaWx0ZXJzTWFwKSkge1xuICAgICAgZmlsdGVyc01hcFtyZXBvcnRUeXBlXSA9IGZpbHRlcnMubWFwKGlkID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkIGFzIHN0cmluZykpIGFzIEhUTUxFbGVtZW50W107XG4gIH1cblxuICAvLyBTaG93L3JlbW92ZSBmaWx0ZXJzIHdoZW4gY2hvb3NlIGV2ZW50IHJlcG9ydCB0eXBlXG4gIHJlcG9ydFR5cGVTZWxlY3RIVE1MLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XG4gICAgICBjb25zdCBzZWxlY3RIVE1MID0gZS50YXJnZXQgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgICBhbGxGaWx0ZXJzSFRNTC5mb3JFYWNoKGZpbHRlckhUTUwgPT4gZmlsdGVySFRNTC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKSk7XG4gICAgICBjb25zdCB2aXNpYmxlRmlsdGVycyA9IGZpbHRlcnNNYXBbc2VsZWN0SFRNTC52YWx1ZV0gYXMgSFRNTEVsZW1lbnRbXTtcbiAgICAgIHZpc2libGVGaWx0ZXJzLmZvckVhY2goZmlsdGVySFRNTCA9PiBmaWx0ZXJIVE1MLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpKTtcbiAgfSk7XG5cbiAgdGFibGVMb2FkZXIuY2xpY2soKTtcbiAgY2xlYXJGaWx0ZXJzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGFsbEZpbHRlcnNIVE1MLmZvckVhY2goZmlsdGVySFRNTCA9PiB7XG4gICAgICBjb25zdCBpbnB1dCA9IGZpbHRlckhUTUwucXVlcnlTZWxlY3RvcignaW5wdXQsIHNlbGVjdCcpIGFzIEhUTUxTZWxlY3RFbGVtZW50IHwgSFRNTElucHV0RWxlbWVudDtcbiAgICAgIGlucHV0LnZhbHVlID0gJyc7XG4gICAgfSk7XG4gICAgc2VhcmNoUXVlcnlIVE1MLnZhbHVlID0gJyc7XG4gICAgdGFibGVMb2FkZXIuY2xpY2soKTtcbiAgfSk7XG4gIC8vIERvd25sb2FkIGNzdiBidXR0b25cbiAgZG93bmxvYWRDU1ZCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgZmlsdGVyc1F1ZXJ5UGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICAgIGFsbEZpbHRlcnNIVE1MLmZvckVhY2goZmlsdGVySFRNTCA9PiB7XG4gICAgICBjb25zdCBpbnB1dCA9IGZpbHRlckhUTUwucXVlcnlTZWxlY3RvcignaW5wdXQsIHNlbGVjdCcpIGFzIEhUTUxTZWxlY3RFbGVtZW50IHwgSFRNTElucHV0RWxlbWVudFxuICAgICAgZmlsdGVyc1F1ZXJ5UGFyYW1zLmFwcGVuZChpbnB1dC5nZXRBdHRyaWJ1dGUoJ25hbWUnKSwgaW5wdXQudmFsdWUpO1xuICAgIH0pXG4gICAgZmlsdGVyc1F1ZXJ5UGFyYW1zLmFwcGVuZCgncScsIHNlYXJjaFF1ZXJ5SFRNTC52YWx1ZSk7XG4gICAgZmlsdGVyc1F1ZXJ5UGFyYW1zLmFwcGVuZCgncmVwb3J0X3R5cGUnLCByZXBvcnRUeXBlU2VsZWN0SFRNTC52YWx1ZSk7XG4gICAgY29uc29sZS5sb2coJ3JlcG9ydF90eXBlJywgcmVwb3J0VHlwZVNlbGVjdEhUTUwudmFsdWUpO1xuICAgIGNvbnN0IGNzdkRhdGEgPSBhd2FpdCBjc3ZEb3dubG9hZE1hcFtyZXBvcnRUeXBlU2VsZWN0SFRNTC52YWx1ZV0oZmlsdGVyc1F1ZXJ5UGFyYW1zKTtcbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2NzdkRhdGEuam9pbignXFxuJyldLCB7IHR5cGU6ICd0ZXh0L2NzdicgfSk7XG4gICAgY29uc3QgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBhLnNldEF0dHJpYnV0ZSgnaHJlZicsIHVybCk7XG4gICAgYS5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgJ3JlcG9ydC5jc3YnKTtcbiAgICBhLmNsaWNrKCk7XG4gICAgYS5yZW1vdmUoKTtcbiAgfSk7XG59KTsiLCJleHBvcnQgY29uc3QgZm9ybWF0RGF0ZSA9IChkYXRlOiBzdHJpbmcpID0+IHtcbiAgY29uc3QgY3JlYXRlQXQgPSBuZXcgRGF0ZShkYXRlKTtcbiAgY29uc3QgeWVhciA9IGNyZWF0ZUF0LmdldEZ1bGxZZWFyKCk7XG4gIGNvbnN0IG1vbnRoID0gU3RyaW5nKGNyZWF0ZUF0LmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCAnMCcpOyAvLyBNb250aCBpcyAwLWJhc2VkXG4gIGNvbnN0IGRheSA9IFN0cmluZyhjcmVhdGVBdC5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsICcwJyk7XG4gIGNvbnN0IGhvdXJzID0gU3RyaW5nKGNyZWF0ZUF0LmdldEhvdXJzKCkpLnBhZFN0YXJ0KDIsICcwJyk7XG4gIGNvbnN0IG1pbnV0ZXMgPSBTdHJpbmcoY3JlYXRlQXQuZ2V0TWludXRlcygpKS5wYWRTdGFydCgyLCAnMCcpO1xuICByZXR1cm4gYCR7bW9udGh9LyR7ZGF5fS8ke3llYXJ9ICR7aG91cnN9OiR7bWludXRlc31gO1xufTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvcmVwb3J0LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9