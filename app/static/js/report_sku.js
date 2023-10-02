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
                    csvData = ['created_at,store_name,type,username,qty_before,qty_after,sku,product_name'];
                    pages = 1;
                    queryTail = filterQuery ? filterQuery.join('&') : '';
                    page = 1;
                    _c.label = 1;
                case 1:
                    if (!(page <= pages)) return [3 /*break*/, 5];
                    currentURL = window.location.href;
                    urlWithoutQueryParams = currentURL.split('?')[0];
                    url_1 = queryTail ? ['api', queryTail].join('?') : 'api';
                    return [4 /*yield*/, fetch("".concat(urlWithoutQueryParams, "/").concat(url_1))];
                case 2:
                    res = _c.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _c.sent();
                    data.reportSKUList.forEach(function (reportInventories) {
                        reportInventories.reportInventories.forEach(function (report) {
                            var reportTarget;
                            if (reportInventories.store) {
                                reportTarget = reportInventories.store.storeName;
                            }
                            else if (reportInventories.warehouse) {
                                reportTarget = reportInventories.warehouse.name;
                            }
                            else {
                                reportTarget = 'Internal action';
                            }
                            csvData.push([
                                formatDate(report.createdAt),
                                reportTarget,
                                reportInventories.type,
                                reportInventories.user.username,
                                report.qtyBefore.toString(),
                                report.qtyAfter.toString(),
                                report.product.SKU,
                                report.product.name,
                            ].join(','));
                        });
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
    // const tableRow = document.querySelectorAll('.table-sku-item-tr');
    // tableRow.forEach((row: HTMLDivElement) => {
    //   const viewReportInventoriesModal = row.querySelector('.report-sku-view-btn');
    //   const data = JSON.parse(viewReportInventoriesModal.getAttribute('data-target'));
    //   const reportStore = data.shipRequest.store.storeName;
    //   const reportSKUStoreDiv = row.querySelector('.report-sku-store') as HTMLDivElement;
    //   reportSKUStoreDiv.innerHTML = reportStore;
    // });
    var clearFilterButton = document.querySelector('#product-sku-clear-button');
    clearFilterButton.addEventListener('click', function () {
        filtersHTML.forEach(function (filter) {
            filter.value = '';
        });
        buttonLoadInventoriesTable.click();
    });
    // load table
    buttonLoadInventoriesTable.click();
    // initialize modal
    // const viewReportInventoriesModal = document.getElementById('view-report-inventories-modal') as HTMLDivElement;
    // const viewModalOptions: ModalOptions = {
    //   placement: 'bottom-right',
    //   backdrop: 'dynamic',
    //   backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    //   closable: true,
    //   onHide: () => {
    //     const productItems = document.querySelectorAll('.product-item-view') as NodeListOf<HTMLTableColElement>;
    //     productItems.forEach((productItem) => productItem.remove());
    //   },
    // };
    // const viewModal = new Modal(viewReportInventoriesModal, viewModalOptions);
    // const reportViewProductTbody = document.querySelector('#table-products') as HTMLTableElement;
    // const productItemTemplate = document.querySelector('#view-product-item-template') as HTMLTableRowElement;
    // const closingViewModalButton = document.querySelector('#button-closing-report-sku-modal') as HTMLButtonElement;
    // closingViewModalButton.addEventListener('click', () => {
    //   viewModal.hide();
    // });
    // view buttons click
    // const reportViewUser = document.getElementById('report-sku-user') as HTMLDivElement;
    // const reportViewAction = document.getElementById('report-sku-action') as HTMLDivElement;
    // const reportViewDate = document.getElementById('report-sku-date') as HTMLDivElement;
    // const reportStoreName = document.getElementById('report-store-name') as HTMLDivElement;
    // onload element with inventories-table id
    // htmxDispatcher.onLoad('inventories-table', (target) => {
    //   const reportViewButtons: NodeListOf<HTMLButtonElement> = target.querySelectorAll('.report-sku-view-btn');
    //   reportViewButtons.forEach((btn) => {
    //     btn.addEventListener('click', () => {
    //       const reportSKU: IReportSKUList = JSON.parse(btn.getAttribute('data-target'));
    //       reportViewUser.innerHTML = reportSKU.user.username;
    //       reportViewAction.innerHTML = reportSKU.type;
    //       reportViewDate.innerHTML = formatDate(reportSKU.createdAt);
    //       if (reportSKU.store) {
    //         reportStoreName.innerHTML = reportSKU.store.storeName;
    //       } else if (reportSKU.warehouse) {
    //         reportStoreName.innerHTML = reportSKU.warehouse.name;
    //       } else {
    //         reportStoreName.innerHTML = 'Internal action';
    //       }
    //       reportSKU.reportInventories.forEach((sku, i) => {
    //         // Render sku
    //         const newProductItem = productItemTemplate.cloneNode(true) as HTMLElement;
    //         newProductItem.removeAttribute('id');
    //         newProductItem.classList.remove('hidden');
    //         newProductItem.classList.add(
    //           'product-item-view',
    //           'text-base',
    //           'font-semibold',
    //           'text-gray-900',
    //           'dark:text-white'
    //         );
    //         const productIndex = newProductItem.querySelector('.product-index') as HTMLDivElement;
    //         const productName = newProductItem.querySelector('.product-name') as HTMLDivElement;
    //         const productSku = newProductItem.querySelector('.product-sku') as HTMLDivElement;
    //         const productRegularPrice = newProductItem.querySelector('.product-regular-price') as HTMLDivElement;
    //         const productRetailPrice = newProductItem.querySelector('.product-retail-price') as HTMLDivElement;
    //         const productGroup = newProductItem.querySelector('.product-group') as HTMLDivElement;
    //         const productWarehouse = newProductItem.querySelector('.product-warehouse') as HTMLDivElement;
    //         const img: HTMLImageElement = newProductItem.querySelector('.product-image');
    //         sku.product.image.length > 100
    //           ? (img.src = `data:image/png;base64, ${sku.product.image}`)
    //           : (img.src = defaultBrandImage);
    //         productIndex.innerHTML = (i + 1).toString();
    //         productName.innerHTML = sku.product.name;
    //         productSku.innerHTML = sku.product.SKU;
    //         // TODO do we need to show price or qty or both?
    //         // if (sku.product.regularPrice) {
    //         //   productRegularPrice.innerHTML = sku.product.regularPrice.toString()
    //         // } else {
    //         //   productRegularPrice.innerHTML = 'No price'
    //         //
    //         // }
    //         // if (sku.product.retailPrice) {
    //         //   productRetailPrice.innerHTML = sku.product.retailPrice.toString()
    //         // } else {
    //         //   productRetailPrice.innerHTML = 'No price'
    //         // }
    //         if (sku.qtyBefore) {
    //           productRegularPrice.innerHTML = sku.qtyBefore.toString();
    //         } else {
    //           productRegularPrice.innerHTML = '0';
    //         }
    //         if (sku.qtyAfter) {
    //           productRetailPrice.innerHTML = sku.qtyAfter.toString();
    //         } else {
    //           productRetailPrice.innerHTML = '0';
    //         }
    //         sku.product.warehouseProducts.forEach((warehouseProduct) => {
    //           if (warehouseProduct.id === sku.warehouseProductId) {
    //             productGroup.innerHTML = warehouseProduct.group.name;
    //             productWarehouse.innerHTML = warehouseProduct.warehouse.name;
    //           }
    //         });
    //         reportViewProductTbody.appendChild(newProductItem);
    //         viewModal.show();
    //       });
    //     });
    //   });
    // });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0gsZUFBZTtBQUNmLElBQU0saUJBQWlCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBc0IsQ0FBQztBQUM5RixpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7Ozs7Ozs7VUNuU3pEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGF0aWMvLi9zcmMvaHRteC50cyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9zcmMvcmVwb3J0X3NrdS50cyIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbInR5cGUgRGlzcGF0Y2hlckNhbGxiYWNrID0gKHRhcmdldDogSFRNTEVsZW1lbnQpID0+IHZvaWRcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFRNWERpc3BhdGNoZXIge1xuICAgIG9ubG9hZENhbGxiYWNrczogeyBbbmFtZTogc3RyaW5nXTogRGlzcGF0Y2hlckNhbGxiYWNrIH1cblxuICAgIGNvbnN0cnVjdG9yICgpICB7XG4gICAgICAgIHRoaXMub25sb2FkQ2FsbGJhY2tzID0ge31cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaHRteDpsb2FkJywgKGV2dCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZ0LnRhcmdldCBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldElkID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMub25sb2FkQ2FsbGJhY2tzLmhhc093blByb3BlcnR5KHRhcmdldElkKSl7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSB0aGlzLm9ubG9hZENhbGxiYWNrc1t0YXJnZXRJZF07XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBvbkxvYWQodGFyZ2V0SWQ6IHN0cmluZywgY2FsbGJhY2s6IERpc3BhdGNoZXJDYWxsYmFjaykge1xuICAgICAgICB0aGlzLm9ubG9hZENhbGxiYWNrc1t0YXJnZXRJZF0gPSBjYWxsYmFjaztcbiAgICB9XG59IiwiaW1wb3J0IHsgTW9kYWxPcHRpb25zLCBNb2RhbCB9IGZyb20gJ2Zsb3diaXRlJztcbmltcG9ydCB7IElQcm9kdWN0LCBJV2FyZWhvdXNlLCBJSW5ib3VuZE9yZGVyQmFzZSB9IGZyb20gJy4vaW5ib3VuZF9vcmRlci90eXBlcyc7XG5pbXBvcnQgSFRNWERpc3BhdGNoZXIgZnJvbSAnLi9odG14JztcblxuaW50ZXJmYWNlIElVc2VyIHtcbiAgdXNlcm5hbWU6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIElDYXJ0IHtcbiAgZ3JvdXA6IHN0cmluZztcbiAgcHJvZHVjdDogSVByb2R1Y3Q7XG59XG5cbmludGVyZmFjZSBJUmVwb3J0U0tVIHtcbiAgcXR5QmVmb3JlOiBudW1iZXI7XG4gIHF0eUFmdGVyOiBudW1iZXI7XG4gIHByb2R1Y3Q6IElQcm9kdWN0O1xuICB3YXJlaG91c2VQcm9kdWN0SWQ6IG51bWJlcjtcbiAgY3JlYXRlZEF0OiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBJUmVwb3J0U0tVTGlzdCB7XG4gIHR5cGU6IHN0cmluZztcbiAgdXNlcjogSVVzZXI7XG4gIGNyZWF0ZWRBdDogc3RyaW5nO1xuICBzaGlwUmVxdWVzdDogSVNoaXBSZXF1ZXN0O1xuICBpbmJvdW5kX29yZGVyOiBJSW5ib3VuZE9yZGVyQmFzZTtcbiAgd2FyZWhvdXNlOiBJV2FyZWhvdXNlO1xuICBzdG9yZTogSVN0b3JlO1xuICByZXBvcnRJbnZlbnRvcmllczogSVJlcG9ydFNLVVtdO1xufVxuXG5pbnRlcmZhY2UgSVNoaXBSZXF1ZXN0IHtcbiAgaWQ6IG51bWJlcjtcbiAgY2FydHM6IElDYXJ0W107XG4gIGNvbW1lbnQ6IHN0cmluZztcbiAgY3JlYXRlZEF0OiBzdHJpbmc7XG4gIGRhTm90ZXM6IHN0cmluZztcbiAgb3JkZXJOdW1iOiBzdHJpbmc7XG4gIG9yZGVyU3RhdHVzOiBzdHJpbmc7XG4gIHN0b3JlOiBJU3RvcmU7XG4gIHN0b3JlSWQ6IG51bWJlcjtcbiAgd21Ob3Rlczogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgSVN0b3JlIHtcbiAgYWN0aXZlOiBib29sZWFuO1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIGNpdHk6IHN0cmluZztcbiAgY29udGFjdFBlcnNvbjogc3RyaW5nO1xuICBjb3VudHJ5OiBzdHJpbmc7XG4gIGNyZWF0ZWRBdDogc3RyaW5nO1xuICBlbWFpbDogc3RyaW5nO1xuICBpZDogbnVtYmVyO1xuICBwaG9uZU51bWI6IHN0cmluZztcbiAgcmVnaW9uOiBzdHJpbmc7XG4gIHN0b3JlQ2F0ZWdvcnlJZDogbnVtYmVyO1xuICBzdG9yZU5hbWU6IHN0cmluZztcbiAgemlwOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBJSW52ZW50b3JpZXNSZXBvcnRSZXNwb25zZSB7XG4gIHBhZ2luYXRpb246IElQYWdpbmF0aW9uO1xuICByZXBvcnRTS1VMaXN0OiBJUmVwb3J0U0tVTGlzdFtdO1xufVxuXG4vLyBpbml0aWFsaXplIGh0bXggbGlzdGVuZXJcbmNvbnN0IGh0bXhEaXNwYXRjaGVyID0gbmV3IEhUTVhEaXNwYXRjaGVyKCk7XG5cbmNvbnN0IGRlZmF1bHRCcmFuZEltYWdlID1cbiAgJ2h0dHBzOi8vZnVua28uY29tL29uL2RlbWFuZHdhcmUuc3RhdGljLy0vU2l0ZXMtZnVua28tbWFzdGVyLWNhdGFsb2cvZGVmYXVsdC9kd2JiMzhhMTExL2ltYWdlcy9mdW5rby91cGxvYWQvNTU5OThfQ29jYUNvbGFfUzJfU3ByaXRlQm90dGxlQ2FwX1BPUF9HTEFNLVdFQi5wbmcnO1xuXG5jb25zdCBmb3JtYXREYXRlID0gKGRhdGU6IHN0cmluZykgPT4ge1xuICBjb25zdCBjcmVhdGVBdCA9IG5ldyBEYXRlKGRhdGUpO1xuICBjb25zdCB5ZWFyID0gY3JlYXRlQXQuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgbW9udGggPSBTdHJpbmcoY3JlYXRlQXQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsICcwJyk7IC8vIE1vbnRoIGlzIDAtYmFzZWRcbiAgY29uc3QgZGF5ID0gU3RyaW5nKGNyZWF0ZUF0LmdldERhdGUoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgY29uc3QgaG91cnMgPSBTdHJpbmcoY3JlYXRlQXQuZ2V0SG91cnMoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgY29uc3QgbWludXRlcyA9IFN0cmluZyhjcmVhdGVBdC5nZXRNaW51dGVzKCkpLnBhZFN0YXJ0KDIsICcwJyk7XG4gIHJldHVybiBgJHttb250aH0vJHtkYXl9LyR7eWVhcn0gJHtob3Vyc306JHttaW51dGVzfWA7XG59O1xuXG5jb25zdCBkb3dubG9hZENTViA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgLy8gRmlsdGVyc1xuICBjb25zdCBzZWFyY2hTS1VJbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YWJsZS1zZWFyY2gtc2t1Jyk7XG4gIGNvbnN0IGRhdGVTS1VDcmVhdGVkRnJvbUlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtc2t1LXNvcnQtY3JlYXRlZC1mcm9tLWRhdGVwaWNrZXInKTtcbiAgY29uc3QgZGF0ZVNLVUNyZWF0ZWRUb0lucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtc2t1LXNvcnQtY3JlYXRlZC10by1kYXRlcGlja2VyJyk7XG5cbiAgY29uc3QgZmlsdGVyc01hcCA9IHtcbiAgICBxOiBzZWFyY2hTS1VJbnB1dCxcbiAgICBjcmVhdGVkX2Zyb206IGRhdGVTS1VDcmVhdGVkRnJvbUlucHV0LFxuICAgIGNyZWF0ZWRfdG86IGRhdGVTS1VDcmVhdGVkVG9JbnB1dCxcbiAgfTtcblxuICBjb25zdCBmaWx0ZXJRdWVyeSA9IFtdO1xuICBmb3IgKGNvbnN0IFtxdWVyeUtleSwgcXVlcnlJbnB1dF0gb2YgT2JqZWN0LmVudHJpZXMoZmlsdGVyc01hcCkpIHtcbiAgICBmaWx0ZXJRdWVyeS5wdXNoKGAke3F1ZXJ5S2V5fT0ke3F1ZXJ5SW5wdXQudmFsdWV9YCk7XG4gIH1cblxuICAvLyBDU1YgSGVhZGVyc1xuICBjb25zdCBjc3ZEYXRhID0gWydjcmVhdGVkX2F0LHN0b3JlX25hbWUsdHlwZSx1c2VybmFtZSxxdHlfYmVmb3JlLHF0eV9hZnRlcixza3UscHJvZHVjdF9uYW1lJ107XG4gIGxldCBwYWdlcyA9IDE7XG4gIGNvbnN0IHF1ZXJ5VGFpbCA9IGZpbHRlclF1ZXJ5ID8gZmlsdGVyUXVlcnkuam9pbignJicpIDogJyc7XG5cbiAgZm9yIChsZXQgcGFnZSA9IDE7IHBhZ2UgPD0gcGFnZXM7IHBhZ2UrKykge1xuICAgIGNvbnN0IGN1cnJlbnRVUkwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICBjb25zdCB1cmxXaXRob3V0UXVlcnlQYXJhbXMgPSBjdXJyZW50VVJMLnNwbGl0KCc/JylbMF07XG4gICAgLy8gVE9ETyBkbyB3ZSBuZWVkIHRvIGxvYWRzIG9ubHkgb25lIHBhZ2UgY3N2Pz8/XG4gICAgLy8gY29uc3QgdXJsID0gW2BhcGk/cGFnZT0ke3BhZ2V9YCwgcXVlcnlUYWlsXS5qb2luKCcmJylcbiAgICAvLyBjb25zdCB1cmwgPSBbJ2FwaScsIHF1ZXJ5VGFpbF0uam9pbignJicpXG4gICAgY29uc3QgdXJsID0gcXVlcnlUYWlsID8gWydhcGknLCBxdWVyeVRhaWxdLmpvaW4oJz8nKSA6ICdhcGknO1xuXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYCR7dXJsV2l0aG91dFF1ZXJ5UGFyYW1zfS8ke3VybH1gKTtcbiAgICBjb25zdCBkYXRhOiBJSW52ZW50b3JpZXNSZXBvcnRSZXNwb25zZSA9IGF3YWl0IHJlcy5qc29uKCk7XG5cbiAgICBkYXRhLnJlcG9ydFNLVUxpc3QuZm9yRWFjaCgocmVwb3J0SW52ZW50b3JpZXMpID0+IHtcbiAgICAgIHJlcG9ydEludmVudG9yaWVzLnJlcG9ydEludmVudG9yaWVzLmZvckVhY2goKHJlcG9ydDogSVJlcG9ydFNLVSkgPT4ge1xuICAgICAgICBsZXQgcmVwb3J0VGFyZ2V0O1xuICAgICAgICBpZiAocmVwb3J0SW52ZW50b3JpZXMuc3RvcmUpIHtcbiAgICAgICAgICByZXBvcnRUYXJnZXQgPSByZXBvcnRJbnZlbnRvcmllcy5zdG9yZS5zdG9yZU5hbWU7XG4gICAgICAgIH0gZWxzZSBpZiAocmVwb3J0SW52ZW50b3JpZXMud2FyZWhvdXNlKSB7XG4gICAgICAgICAgcmVwb3J0VGFyZ2V0ID0gcmVwb3J0SW52ZW50b3JpZXMud2FyZWhvdXNlLm5hbWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVwb3J0VGFyZ2V0ID0gJ0ludGVybmFsIGFjdGlvbic7XG4gICAgICAgIH1cblxuICAgICAgICBjc3ZEYXRhLnB1c2goXG4gICAgICAgICAgW1xuICAgICAgICAgICAgZm9ybWF0RGF0ZShyZXBvcnQuY3JlYXRlZEF0KSxcbiAgICAgICAgICAgIHJlcG9ydFRhcmdldCxcbiAgICAgICAgICAgIHJlcG9ydEludmVudG9yaWVzLnR5cGUsXG4gICAgICAgICAgICByZXBvcnRJbnZlbnRvcmllcy51c2VyLnVzZXJuYW1lLFxuICAgICAgICAgICAgcmVwb3J0LnF0eUJlZm9yZS50b1N0cmluZygpLFxuICAgICAgICAgICAgcmVwb3J0LnF0eUFmdGVyLnRvU3RyaW5nKCksXG4gICAgICAgICAgICByZXBvcnQucHJvZHVjdC5TS1UsXG4gICAgICAgICAgICByZXBvcnQucHJvZHVjdC5uYW1lLFxuICAgICAgICAgIF0uam9pbignLCcpXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHBhZ2VzID0gZGF0YS5wYWdpbmF0aW9uLnBhZ2VzO1xuICB9XG4gIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbY3N2RGF0YS5qb2luKCdcXG4nKV0sIHsgdHlwZTogJ3RleHQvY3N2JyB9KTtcbiAgY29uc3QgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gIGEuc2V0QXR0cmlidXRlKCdocmVmJywgdXJsKTtcbiAgYS5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgJ2ludmVudG9yaWVzLmNzdicpO1xuICBhLmNsaWNrKCk7XG4gIGEucmVtb3ZlKCk7XG59O1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICBjb25zdCBmaWx0ZXJzSFRNTCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgXCJbbmFtZT0ncSddLCBbbmFtZT0ndXNlcm5hbWUnXSwgW25hbWU9J2NyZWF0ZWRfZnJvbSddLCBbbmFtZT0nY3JlYXRlZF90byddLCBbbmFtZT0nbWFzdGVyX2dyb3VwJ10sIFtuYW1lPSdncm91cCddLCBbbmFtZT0nZ3JvdXBfYnJhbmQnXSwgIFtuYW1lPSdncm91cF9jYXRlZ29yeSddLCBbbmFtZT0nZ3JvdXBfbGFuZ3VhZ2UnXSwgW25hbWU9J2dyb3VwX3ByZW1pc2VzJ10sIFtuYW1lPSdncm91cF9ldmVudCddXCJcbiAgKTtcbiAgY29uc3QgYnV0dG9uTG9hZEludmVudG9yaWVzVGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFibGUtcmVwb3J0LWxvYWRlcicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuXG4gIC8vIGNvbnN0IHRhYmxlUm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlLXNrdS1pdGVtLXRyJyk7XG4gIC8vIHRhYmxlUm93LmZvckVhY2goKHJvdzogSFRNTERpdkVsZW1lbnQpID0+IHtcbiAgLy8gICBjb25zdCB2aWV3UmVwb3J0SW52ZW50b3JpZXNNb2RhbCA9IHJvdy5xdWVyeVNlbGVjdG9yKCcucmVwb3J0LXNrdS12aWV3LWJ0bicpO1xuICAvLyAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHZpZXdSZXBvcnRJbnZlbnRvcmllc01vZGFsLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKSk7XG4gIC8vICAgY29uc3QgcmVwb3J0U3RvcmUgPSBkYXRhLnNoaXBSZXF1ZXN0LnN0b3JlLnN0b3JlTmFtZTtcbiAgLy8gICBjb25zdCByZXBvcnRTS1VTdG9yZURpdiA9IHJvdy5xdWVyeVNlbGVjdG9yKCcucmVwb3J0LXNrdS1zdG9yZScpIGFzIEhUTUxEaXZFbGVtZW50O1xuICAvLyAgIHJlcG9ydFNLVVN0b3JlRGl2LmlubmVySFRNTCA9IHJlcG9ydFN0b3JlO1xuICAvLyB9KTtcblxuICBjb25zdCBjbGVhckZpbHRlckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXNrdS1jbGVhci1idXR0b24nKTtcbiAgY2xlYXJGaWx0ZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZmlsdGVyc0hUTUwuZm9yRWFjaCgoZmlsdGVyKSA9PiB7XG4gICAgICAoZmlsdGVyIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gJyc7XG4gICAgfSk7XG4gICAgYnV0dG9uTG9hZEludmVudG9yaWVzVGFibGUuY2xpY2soKTtcbiAgfSk7XG4gIC8vIGxvYWQgdGFibGVcbiAgYnV0dG9uTG9hZEludmVudG9yaWVzVGFibGUuY2xpY2soKTtcblxuICAvLyBpbml0aWFsaXplIG1vZGFsXG4gIC8vIGNvbnN0IHZpZXdSZXBvcnRJbnZlbnRvcmllc01vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXctcmVwb3J0LWludmVudG9yaWVzLW1vZGFsJykgYXMgSFRNTERpdkVsZW1lbnQ7XG4gIC8vIGNvbnN0IHZpZXdNb2RhbE9wdGlvbnM6IE1vZGFsT3B0aW9ucyA9IHtcbiAgLy8gICBwbGFjZW1lbnQ6ICdib3R0b20tcmlnaHQnLFxuICAvLyAgIGJhY2tkcm9wOiAnZHluYW1pYycsXG4gIC8vICAgYmFja2Ryb3BDbGFzc2VzOiAnYmctZ3JheS05MDAgYmctb3BhY2l0eS01MCBkYXJrOmJnLW9wYWNpdHktODAgZml4ZWQgaW5zZXQtMCB6LTQwJyxcbiAgLy8gICBjbG9zYWJsZTogdHJ1ZSxcbiAgLy8gICBvbkhpZGU6ICgpID0+IHtcbiAgLy8gICAgIGNvbnN0IHByb2R1Y3RJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0LWl0ZW0tdmlldycpIGFzIE5vZGVMaXN0T2Y8SFRNTFRhYmxlQ29sRWxlbWVudD47XG4gIC8vICAgICBwcm9kdWN0SXRlbXMuZm9yRWFjaCgocHJvZHVjdEl0ZW0pID0+IHByb2R1Y3RJdGVtLnJlbW92ZSgpKTtcbiAgLy8gICB9LFxuICAvLyB9O1xuXG4gIC8vIGNvbnN0IHZpZXdNb2RhbCA9IG5ldyBNb2RhbCh2aWV3UmVwb3J0SW52ZW50b3JpZXNNb2RhbCwgdmlld01vZGFsT3B0aW9ucyk7XG4gIC8vIGNvbnN0IHJlcG9ydFZpZXdQcm9kdWN0VGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFibGUtcHJvZHVjdHMnKSBhcyBIVE1MVGFibGVFbGVtZW50O1xuICAvLyBjb25zdCBwcm9kdWN0SXRlbVRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ZpZXctcHJvZHVjdC1pdGVtLXRlbXBsYXRlJykgYXMgSFRNTFRhYmxlUm93RWxlbWVudDtcbiAgLy8gY29uc3QgY2xvc2luZ1ZpZXdNb2RhbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidXR0b24tY2xvc2luZy1yZXBvcnQtc2t1LW1vZGFsJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gIC8vIGNsb3NpbmdWaWV3TW9kYWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIC8vICAgdmlld01vZGFsLmhpZGUoKTtcbiAgLy8gfSk7XG5cbiAgLy8gdmlldyBidXR0b25zIGNsaWNrXG4gIC8vIGNvbnN0IHJlcG9ydFZpZXdVc2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlcG9ydC1za3UtdXNlcicpIGFzIEhUTUxEaXZFbGVtZW50O1xuICAvLyBjb25zdCByZXBvcnRWaWV3QWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlcG9ydC1za3UtYWN0aW9uJykgYXMgSFRNTERpdkVsZW1lbnQ7XG4gIC8vIGNvbnN0IHJlcG9ydFZpZXdEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlcG9ydC1za3UtZGF0ZScpIGFzIEhUTUxEaXZFbGVtZW50O1xuICAvLyBjb25zdCByZXBvcnRTdG9yZU5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVwb3J0LXN0b3JlLW5hbWUnKSBhcyBIVE1MRGl2RWxlbWVudDtcblxuICAvLyBvbmxvYWQgZWxlbWVudCB3aXRoIGludmVudG9yaWVzLXRhYmxlIGlkXG4gIC8vIGh0bXhEaXNwYXRjaGVyLm9uTG9hZCgnaW52ZW50b3JpZXMtdGFibGUnLCAodGFyZ2V0KSA9PiB7XG4gIC8vICAgY29uc3QgcmVwb3J0Vmlld0J1dHRvbnM6IE5vZGVMaXN0T2Y8SFRNTEJ1dHRvbkVsZW1lbnQ+ID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZXBvcnQtc2t1LXZpZXctYnRuJyk7XG4gIC8vICAgcmVwb3J0Vmlld0J1dHRvbnMuZm9yRWFjaCgoYnRuKSA9PiB7XG4gIC8vICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIC8vICAgICAgIGNvbnN0IHJlcG9ydFNLVTogSVJlcG9ydFNLVUxpc3QgPSBKU09OLnBhcnNlKGJ0bi5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0JykpO1xuXG4gIC8vICAgICAgIHJlcG9ydFZpZXdVc2VyLmlubmVySFRNTCA9IHJlcG9ydFNLVS51c2VyLnVzZXJuYW1lO1xuICAvLyAgICAgICByZXBvcnRWaWV3QWN0aW9uLmlubmVySFRNTCA9IHJlcG9ydFNLVS50eXBlO1xuICAvLyAgICAgICByZXBvcnRWaWV3RGF0ZS5pbm5lckhUTUwgPSBmb3JtYXREYXRlKHJlcG9ydFNLVS5jcmVhdGVkQXQpO1xuICAvLyAgICAgICBpZiAocmVwb3J0U0tVLnN0b3JlKSB7XG4gIC8vICAgICAgICAgcmVwb3J0U3RvcmVOYW1lLmlubmVySFRNTCA9IHJlcG9ydFNLVS5zdG9yZS5zdG9yZU5hbWU7XG4gIC8vICAgICAgIH0gZWxzZSBpZiAocmVwb3J0U0tVLndhcmVob3VzZSkge1xuICAvLyAgICAgICAgIHJlcG9ydFN0b3JlTmFtZS5pbm5lckhUTUwgPSByZXBvcnRTS1Uud2FyZWhvdXNlLm5hbWU7XG4gIC8vICAgICAgIH0gZWxzZSB7XG4gIC8vICAgICAgICAgcmVwb3J0U3RvcmVOYW1lLmlubmVySFRNTCA9ICdJbnRlcm5hbCBhY3Rpb24nO1xuICAvLyAgICAgICB9XG5cbiAgLy8gICAgICAgcmVwb3J0U0tVLnJlcG9ydEludmVudG9yaWVzLmZvckVhY2goKHNrdSwgaSkgPT4ge1xuICAvLyAgICAgICAgIC8vIFJlbmRlciBza3VcbiAgLy8gICAgICAgICBjb25zdCBuZXdQcm9kdWN0SXRlbSA9IHByb2R1Y3RJdGVtVGVtcGxhdGUuY2xvbmVOb2RlKHRydWUpIGFzIEhUTUxFbGVtZW50O1xuICAvLyAgICAgICAgIG5ld1Byb2R1Y3RJdGVtLnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTtcbiAgLy8gICAgICAgICBuZXdQcm9kdWN0SXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgLy8gICAgICAgICBuZXdQcm9kdWN0SXRlbS5jbGFzc0xpc3QuYWRkKFxuICAvLyAgICAgICAgICAgJ3Byb2R1Y3QtaXRlbS12aWV3JyxcbiAgLy8gICAgICAgICAgICd0ZXh0LWJhc2UnLFxuICAvLyAgICAgICAgICAgJ2ZvbnQtc2VtaWJvbGQnLFxuICAvLyAgICAgICAgICAgJ3RleHQtZ3JheS05MDAnLFxuICAvLyAgICAgICAgICAgJ2Rhcms6dGV4dC13aGl0ZSdcbiAgLy8gICAgICAgICApO1xuICAvLyAgICAgICAgIGNvbnN0IHByb2R1Y3RJbmRleCA9IG5ld1Byb2R1Y3RJdGVtLnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0LWluZGV4JykgYXMgSFRNTERpdkVsZW1lbnQ7XG4gIC8vICAgICAgICAgY29uc3QgcHJvZHVjdE5hbWUgPSBuZXdQcm9kdWN0SXRlbS5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdC1uYW1lJykgYXMgSFRNTERpdkVsZW1lbnQ7XG4gIC8vICAgICAgICAgY29uc3QgcHJvZHVjdFNrdSA9IG5ld1Byb2R1Y3RJdGVtLnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0LXNrdScpIGFzIEhUTUxEaXZFbGVtZW50O1xuICAvLyAgICAgICAgIGNvbnN0IHByb2R1Y3RSZWd1bGFyUHJpY2UgPSBuZXdQcm9kdWN0SXRlbS5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdC1yZWd1bGFyLXByaWNlJykgYXMgSFRNTERpdkVsZW1lbnQ7XG4gIC8vICAgICAgICAgY29uc3QgcHJvZHVjdFJldGFpbFByaWNlID0gbmV3UHJvZHVjdEl0ZW0ucXVlcnlTZWxlY3RvcignLnByb2R1Y3QtcmV0YWlsLXByaWNlJykgYXMgSFRNTERpdkVsZW1lbnQ7XG4gIC8vICAgICAgICAgY29uc3QgcHJvZHVjdEdyb3VwID0gbmV3UHJvZHVjdEl0ZW0ucXVlcnlTZWxlY3RvcignLnByb2R1Y3QtZ3JvdXAnKSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgLy8gICAgICAgICBjb25zdCBwcm9kdWN0V2FyZWhvdXNlID0gbmV3UHJvZHVjdEl0ZW0ucXVlcnlTZWxlY3RvcignLnByb2R1Y3Qtd2FyZWhvdXNlJykgYXMgSFRNTERpdkVsZW1lbnQ7XG4gIC8vICAgICAgICAgY29uc3QgaW1nOiBIVE1MSW1hZ2VFbGVtZW50ID0gbmV3UHJvZHVjdEl0ZW0ucXVlcnlTZWxlY3RvcignLnByb2R1Y3QtaW1hZ2UnKTtcblxuICAvLyAgICAgICAgIHNrdS5wcm9kdWN0LmltYWdlLmxlbmd0aCA+IDEwMFxuICAvLyAgICAgICAgICAgPyAoaW1nLnNyYyA9IGBkYXRhOmltYWdlL3BuZztiYXNlNjQsICR7c2t1LnByb2R1Y3QuaW1hZ2V9YClcbiAgLy8gICAgICAgICAgIDogKGltZy5zcmMgPSBkZWZhdWx0QnJhbmRJbWFnZSk7XG5cbiAgLy8gICAgICAgICBwcm9kdWN0SW5kZXguaW5uZXJIVE1MID0gKGkgKyAxKS50b1N0cmluZygpO1xuICAvLyAgICAgICAgIHByb2R1Y3ROYW1lLmlubmVySFRNTCA9IHNrdS5wcm9kdWN0Lm5hbWU7XG4gIC8vICAgICAgICAgcHJvZHVjdFNrdS5pbm5lckhUTUwgPSBza3UucHJvZHVjdC5TS1U7XG5cbiAgLy8gICAgICAgICAvLyBUT0RPIGRvIHdlIG5lZWQgdG8gc2hvdyBwcmljZSBvciBxdHkgb3IgYm90aD9cbiAgLy8gICAgICAgICAvLyBpZiAoc2t1LnByb2R1Y3QucmVndWxhclByaWNlKSB7XG4gIC8vICAgICAgICAgLy8gICBwcm9kdWN0UmVndWxhclByaWNlLmlubmVySFRNTCA9IHNrdS5wcm9kdWN0LnJlZ3VsYXJQcmljZS50b1N0cmluZygpXG4gIC8vICAgICAgICAgLy8gfSBlbHNlIHtcbiAgLy8gICAgICAgICAvLyAgIHByb2R1Y3RSZWd1bGFyUHJpY2UuaW5uZXJIVE1MID0gJ05vIHByaWNlJ1xuICAvLyAgICAgICAgIC8vXG4gIC8vICAgICAgICAgLy8gfVxuXG4gIC8vICAgICAgICAgLy8gaWYgKHNrdS5wcm9kdWN0LnJldGFpbFByaWNlKSB7XG4gIC8vICAgICAgICAgLy8gICBwcm9kdWN0UmV0YWlsUHJpY2UuaW5uZXJIVE1MID0gc2t1LnByb2R1Y3QucmV0YWlsUHJpY2UudG9TdHJpbmcoKVxuICAvLyAgICAgICAgIC8vIH0gZWxzZSB7XG4gIC8vICAgICAgICAgLy8gICBwcm9kdWN0UmV0YWlsUHJpY2UuaW5uZXJIVE1MID0gJ05vIHByaWNlJ1xuICAvLyAgICAgICAgIC8vIH1cblxuICAvLyAgICAgICAgIGlmIChza3UucXR5QmVmb3JlKSB7XG4gIC8vICAgICAgICAgICBwcm9kdWN0UmVndWxhclByaWNlLmlubmVySFRNTCA9IHNrdS5xdHlCZWZvcmUudG9TdHJpbmcoKTtcbiAgLy8gICAgICAgICB9IGVsc2Uge1xuICAvLyAgICAgICAgICAgcHJvZHVjdFJlZ3VsYXJQcmljZS5pbm5lckhUTUwgPSAnMCc7XG4gIC8vICAgICAgICAgfVxuXG4gIC8vICAgICAgICAgaWYgKHNrdS5xdHlBZnRlcikge1xuICAvLyAgICAgICAgICAgcHJvZHVjdFJldGFpbFByaWNlLmlubmVySFRNTCA9IHNrdS5xdHlBZnRlci50b1N0cmluZygpO1xuICAvLyAgICAgICAgIH0gZWxzZSB7XG4gIC8vICAgICAgICAgICBwcm9kdWN0UmV0YWlsUHJpY2UuaW5uZXJIVE1MID0gJzAnO1xuICAvLyAgICAgICAgIH1cbiAgLy8gICAgICAgICBza3UucHJvZHVjdC53YXJlaG91c2VQcm9kdWN0cy5mb3JFYWNoKCh3YXJlaG91c2VQcm9kdWN0KSA9PiB7XG4gIC8vICAgICAgICAgICBpZiAod2FyZWhvdXNlUHJvZHVjdC5pZCA9PT0gc2t1LndhcmVob3VzZVByb2R1Y3RJZCkge1xuICAvLyAgICAgICAgICAgICBwcm9kdWN0R3JvdXAuaW5uZXJIVE1MID0gd2FyZWhvdXNlUHJvZHVjdC5ncm91cC5uYW1lO1xuICAvLyAgICAgICAgICAgICBwcm9kdWN0V2FyZWhvdXNlLmlubmVySFRNTCA9IHdhcmVob3VzZVByb2R1Y3Qud2FyZWhvdXNlLm5hbWU7XG4gIC8vICAgICAgICAgICB9XG4gIC8vICAgICAgICAgfSk7XG4gIC8vICAgICAgICAgcmVwb3J0Vmlld1Byb2R1Y3RUYm9keS5hcHBlbmRDaGlsZChuZXdQcm9kdWN0SXRlbSk7XG4gIC8vICAgICAgICAgdmlld01vZGFsLnNob3coKTtcbiAgLy8gICAgICAgfSk7XG4gIC8vICAgICB9KTtcbiAgLy8gICB9KTtcbiAgLy8gfSk7XG59KTtcbi8vIERvd25sb2FkIGNzdlxuY29uc3QgZG93bmxvYWRDc3ZCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnV0dG9uLWNzdi1kb3dubG9hZCcpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuZG93bmxvYWRDc3ZCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkb3dubG9hZENTVik7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvcmVwb3J0X3NrdS50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==