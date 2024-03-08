/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/bell.ts":
/*!*********************!*\
  !*** ./src/bell.ts ***!
  \*********************/
/***/ (function() {

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
var defaultBrandImage = 'https://raw.githubusercontent.com/Simple2B/BeamSuntory/develop/app/static/img/no_picture_default.png';
function getNotification() {
    return __awaiter(this, void 0, void 0, function () {
        var baseURL, response, userRequests, bellContainer_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    baseURL = window.location.origin;
                    return [4 /*yield*/, fetch("".concat(baseURL, "/user/notification"), {
                            method: 'GET',
                        })];
                case 1:
                    response = _a.sent();
                    if (!(response.status == 200)) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    userRequests = _a.sent();
                    bellContainer_1 = document.getElementById('bell-notification-container');
                    userRequests.forEach(function (request) {
                        var notificationItem = document.createElement('div');
                        notificationItem.classList.add('bell-notification-item');
                        var shareRequestLink = "/request_share/?q=".concat(request.order_number);
                        notificationItem.innerHTML = "\n        <a href=\"".concat(shareRequestLink, "\" class=\"flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700\">\n          <div class=\"flex-shrink-0\">\n            <img id=\"bell-notification-product-image\" class=\"rounded-full bell-notification-product-image\" src=\"/docs/images/people/profile-picture-1.jpg\"\n              alt=\"J\"\n            />\n          </div>\n          <div class=\"w-full pl-3\">\n            <div class=\"text-gray-500 text-sm mb-1.5 dark:text-gray-400\">\n              New\n              <span class=\"font-semibold text-gray-900 dark:text-white\">request share</span>: product - <span\n                class=\"font-semibold text-gray-900 dark:text-white\">\"").concat(request.product_name, "\"</span>,\n              SKU - <span class=\"font-semibold text-gray-900 dark:text-white\">\"").concat(request.SKU, "\"</span>, desired quantity -\n              <span class=\"font-semibold text-gray-900 dark:text-white\">\"").concat(request.desire_quantity, "\"</span>, target_group - <span\n                class=\"font-semibold text-gray-900 dark:text-white\">\"").concat(request.target_group, "\"</span>\n            </div>\n            <div class=\"text-xs text-blue-600 dark:text-blue-500\">\n              ").concat(getTimeFormat(request.created_at), "\n            </div>\n          </div>\n        </a>\n      ");
                        var productImage = notificationItem.querySelector('#bell-notification-product-image');
                        request.product_image.length > 100
                            ? (productImage.src = "data:image/png;base64, ".concat(request.product_image))
                            : (productImage.src = defaultBrandImage);
                        var firstNotification = bellContainer_1.querySelector('.bell-notification-item');
                        if (firstNotification) {
                            firstNotification.insertAdjacentElement('beforebegin', notificationItem);
                        }
                        else {
                            bellContainer_1.appendChild(notificationItem);
                        }
                    });
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function limitNotification() {
    return __awaiter(this, void 0, void 0, function () {
        var bellNotificationItems, i, bellRedDot;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getNotification()];
                case 1:
                    _a.sent();
                    bellNotificationItems = document.querySelectorAll('.bell-notification-item');
                    if (bellNotificationItems.length > 8) {
                        for (i = 8; i < bellNotificationItems.length; i++) {
                            bellNotificationItems[i].classList.add('hidden');
                        }
                    }
                    if (bellNotificationItems.length > 0) {
                        bellRedDot = document.getElementById('bell-notification-red-dot');
                        bellRedDot.classList.remove('invisible');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
document.addEventListener('DOMContentLoaded', function () {
    limitNotification();
});
function getTimeFormat(created_at) {
    var date_str = created_at, options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }, formatted = new Date(date_str).toLocaleDateString('en-US', options), date_parts = formatted.substring(0, formatted.indexOf(',')).split(' ').reverse().join(' ');
    var formatted_date = date_parts + formatted.substr(formatted.indexOf(',') + 1);
    return formatted_date;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/bell.ts"]();
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRTtJQUM1QyxpQkFBaUIsRUFBRSxDQUFDO0FBQ3RCLENBQUMsQ0FBQyxDQUFDO0FBRUgsU0FBUyxhQUFhLENBQUMsVUFBa0I7SUFDdkMsSUFBTSxRQUFRLEdBQUcsVUFBVSxFQUN6QixPQUFPLEdBQStCO1FBQ3BDLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLE9BQU87UUFDZCxHQUFHLEVBQUUsU0FBUztRQUNkLElBQUksRUFBRSxTQUFTO1FBQ2YsTUFBTSxFQUFFLFNBQVM7UUFDakIsTUFBTSxFQUFFLFNBQVM7S0FDbEIsRUFDRCxTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxFQUNuRSxVQUFVLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFN0YsSUFBTSxjQUFjLEdBQUcsVUFBVSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUVqRixPQUFPLGNBQWMsQ0FBQztBQUN4QixDQUFDOzs7Ozs7OztVRS9GRDtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RhdGljLy4vc3JjL2JlbGwudHMiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGRlZmF1bHRCcmFuZEltYWdlID1cbiAgJ2h0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9TaW1wbGUyQi9CZWFtU3VudG9yeS9kZXZlbG9wL2FwcC9zdGF0aWMvaW1nL25vX3BpY3R1cmVfZGVmYXVsdC5wbmcnO1xuXG5hc3luYyBmdW5jdGlvbiBnZXROb3RpZmljYXRpb24oKSB7XG4gIGNvbnN0IGJhc2VVUkwgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke2Jhc2VVUkx9L3VzZXIvbm90aWZpY2F0aW9uYCwge1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gIH0pO1xuICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xuICAgIGNvbnN0IHVzZXJSZXF1ZXN0cyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBjb25zdCBiZWxsQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JlbGwtbm90aWZpY2F0aW9uLWNvbnRhaW5lcicpO1xuICAgIHVzZXJSZXF1ZXN0cy5mb3JFYWNoKChyZXF1ZXN0OiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IG5vdGlmaWNhdGlvbkl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIG5vdGlmaWNhdGlvbkl0ZW0uY2xhc3NMaXN0LmFkZCgnYmVsbC1ub3RpZmljYXRpb24taXRlbScpO1xuICAgICAgY29uc3Qgc2hhcmVSZXF1ZXN0TGluayA9IGAvcmVxdWVzdF9zaGFyZS8/cT0ke3JlcXVlc3Qub3JkZXJfbnVtYmVyfWA7XG4gICAgICBub3RpZmljYXRpb25JdGVtLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGEgaHJlZj1cIiR7c2hhcmVSZXF1ZXN0TGlua31cIiBjbGFzcz1cImZsZXggcHgtNCBweS0zIGhvdmVyOmJnLWdyYXktMTAwIGRhcms6aG92ZXI6YmctZ3JheS03MDBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleC1zaHJpbmstMFwiPlxuICAgICAgICAgICAgPGltZyBpZD1cImJlbGwtbm90aWZpY2F0aW9uLXByb2R1Y3QtaW1hZ2VcIiBjbGFzcz1cInJvdW5kZWQtZnVsbCBiZWxsLW5vdGlmaWNhdGlvbi1wcm9kdWN0LWltYWdlXCIgc3JjPVwiL2RvY3MvaW1hZ2VzL3Blb3BsZS9wcm9maWxlLXBpY3R1cmUtMS5qcGdcIlxuICAgICAgICAgICAgICBhbHQ9XCJKXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInctZnVsbCBwbC0zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1ncmF5LTUwMCB0ZXh0LXNtIG1iLTEuNSBkYXJrOnRleHQtZ3JheS00MDBcIj5cbiAgICAgICAgICAgICAgTmV3XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktOTAwIGRhcms6dGV4dC13aGl0ZVwiPnJlcXVlc3Qgc2hhcmU8L3NwYW4+OiBwcm9kdWN0IC0gPHNwYW5cbiAgICAgICAgICAgICAgICBjbGFzcz1cImZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtd2hpdGVcIj5cIiR7cmVxdWVzdC5wcm9kdWN0X25hbWV9XCI8L3NwYW4+LFxuICAgICAgICAgICAgICBTS1UgLSA8c3BhbiBjbGFzcz1cImZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtd2hpdGVcIj5cIiR7XG4gICAgICAgICAgICAgICAgcmVxdWVzdC5TS1VcbiAgICAgICAgICAgICAgfVwiPC9zcGFuPiwgZGVzaXJlZCBxdWFudGl0eSAtXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktOTAwIGRhcms6dGV4dC13aGl0ZVwiPlwiJHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0LmRlc2lyZV9xdWFudGl0eVxuICAgICAgICAgICAgICB9XCI8L3NwYW4+LCB0YXJnZXRfZ3JvdXAgLSA8c3BhblxuICAgICAgICAgICAgICAgIGNsYXNzPVwiZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktOTAwIGRhcms6dGV4dC13aGl0ZVwiPlwiJHtyZXF1ZXN0LnRhcmdldF9ncm91cH1cIjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQteHMgdGV4dC1ibHVlLTYwMCBkYXJrOnRleHQtYmx1ZS01MDBcIj5cbiAgICAgICAgICAgICAgJHtnZXRUaW1lRm9ybWF0KHJlcXVlc3QuY3JlYXRlZF9hdCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9hPlxuICAgICAgYDtcblxuICAgICAgY29uc3QgcHJvZHVjdEltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gbm90aWZpY2F0aW9uSXRlbS5xdWVyeVNlbGVjdG9yKCcjYmVsbC1ub3RpZmljYXRpb24tcHJvZHVjdC1pbWFnZScpO1xuXG4gICAgICByZXF1ZXN0LnByb2R1Y3RfaW1hZ2UubGVuZ3RoID4gMTAwXG4gICAgICAgID8gKHByb2R1Y3RJbWFnZS5zcmMgPSBgZGF0YTppbWFnZS9wbmc7YmFzZTY0LCAke3JlcXVlc3QucHJvZHVjdF9pbWFnZX1gKVxuICAgICAgICA6IChwcm9kdWN0SW1hZ2Uuc3JjID0gZGVmYXVsdEJyYW5kSW1hZ2UpO1xuXG4gICAgICBjb25zdCBmaXJzdE5vdGlmaWNhdGlvbiA9IGJlbGxDb250YWluZXIucXVlcnlTZWxlY3RvcignLmJlbGwtbm90aWZpY2F0aW9uLWl0ZW0nKTtcblxuICAgICAgaWYgKGZpcnN0Tm90aWZpY2F0aW9uKSB7XG4gICAgICAgIGZpcnN0Tm90aWZpY2F0aW9uLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlYmVnaW4nLCBub3RpZmljYXRpb25JdGVtKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJlbGxDb250YWluZXIuYXBwZW5kQ2hpbGQobm90aWZpY2F0aW9uSXRlbSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gbGltaXROb3RpZmljYXRpb24oKSB7XG4gIGF3YWl0IGdldE5vdGlmaWNhdGlvbigpO1xuICBjb25zdCBiZWxsTm90aWZpY2F0aW9uSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmVsbC1ub3RpZmljYXRpb24taXRlbScpO1xuXG4gIGlmIChiZWxsTm90aWZpY2F0aW9uSXRlbXMubGVuZ3RoID4gOCkge1xuICAgIGZvciAobGV0IGkgPSA4OyBpIDwgYmVsbE5vdGlmaWNhdGlvbkl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBiZWxsTm90aWZpY2F0aW9uSXRlbXNbaV0uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGJlbGxOb3RpZmljYXRpb25JdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgYmVsbFJlZERvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiZWxsLW5vdGlmaWNhdGlvbi1yZWQtZG90Jyk7XG4gICAgYmVsbFJlZERvdC5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcbiAgfVxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICBsaW1pdE5vdGlmaWNhdGlvbigpO1xufSk7XG5cbmZ1bmN0aW9uIGdldFRpbWVGb3JtYXQoY3JlYXRlZF9hdDogc3RyaW5nKSB7XG4gIGNvbnN0IGRhdGVfc3RyID0gY3JlYXRlZF9hdCxcbiAgICBvcHRpb25zOiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucyA9IHtcbiAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgIG1vbnRoOiAnc2hvcnQnLFxuICAgICAgZGF5OiAnbnVtZXJpYycsXG4gICAgICBob3VyOiAnMi1kaWdpdCcsXG4gICAgICBtaW51dGU6ICcyLWRpZ2l0JyxcbiAgICAgIHNlY29uZDogJzItZGlnaXQnLFxuICAgIH0sXG4gICAgZm9ybWF0dGVkID0gbmV3IERhdGUoZGF0ZV9zdHIpLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tVVMnLCBvcHRpb25zKSxcbiAgICBkYXRlX3BhcnRzID0gZm9ybWF0dGVkLnN1YnN0cmluZygwLCBmb3JtYXR0ZWQuaW5kZXhPZignLCcpKS5zcGxpdCgnICcpLnJldmVyc2UoKS5qb2luKCcgJyk7XG5cbiAgY29uc3QgZm9ybWF0dGVkX2RhdGUgPSBkYXRlX3BhcnRzICsgZm9ybWF0dGVkLnN1YnN0cihmb3JtYXR0ZWQuaW5kZXhPZignLCcpICsgMSk7XG5cbiAgcmV0dXJuIGZvcm1hdHRlZF9kYXRlO1xufVxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbl9fd2VicGFja19tb2R1bGVzX19bXCIuL3NyYy9iZWxsLnRzXCJdKCk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=