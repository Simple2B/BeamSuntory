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
var defaultBrandImage = 'https://funko.com/on/demandware.static/-/Sites-funko-master-catalog/default/dwbb38a111/images/funko/upload/55998_CocaCola_S2_SpriteBottleCap_POP_GLAM-WEB.png';
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
                        notificationItem.innerHTML = "\n        <a href=\"#\" class=\"flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700\">\n          <div class=\"flex-shrink-0\">\n            <img id=\"bell-notification-product-image\" class=\"rounded-full w-11 h-11\" src=\"/docs/images/people/profile-picture-1.jpg\"\n              alt=\"J\"\n            />\n          </div>\n          <div class=\"w-full pl-3\">\n            <div class=\"text-gray-500 text-sm mb-1.5 dark:text-gray-400\">\n              New\n              <span class=\"font-semibold text-gray-900 dark:text-white\">request share</span>: product - <span\n                class=\"font-semibold text-gray-900 dark:text-white\">\"".concat(request.product_name, "\"</span>,\n              SKU - <span class=\"font-semibold text-gray-900 dark:text-white\">\"").concat(request.SKU, "\"</span>, desired quantity -\n              <span class=\"font-semibold text-gray-900 dark:text-white\">\"").concat(request.desire_quantity, "\"</span>, target_group - <span\n                class=\"font-semibold text-gray-900 dark:text-white\">\"").concat(request.target_group, "\"</span>\n            </div>\n            <div class=\"text-xs text-blue-600 dark:text-blue-500\">\n              ").concat(getTimeFormat(request.created_at), "\n            </div>\n          </div>\n        </a>\n      ");
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
    console.log('bell.ts');
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
    }, formatted = new Date(date_str).toLocaleDateString('en-US', options), date_parts = formatted
        .substring(0, formatted.indexOf(','))
        .split(' ')
        .reverse()
        .join(' ');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsQ0FBQztJQUN2QixpQkFBaUIsRUFBRSxDQUFDO0FBQ3RCLENBQUMsQ0FBQyxDQUFDO0FBRUgsU0FBUyxhQUFhLENBQUMsVUFBa0I7SUFDdkMsSUFBTSxRQUFRLEdBQUcsVUFBVSxFQUN6QixPQUFPLEdBQStCO1FBQ3BDLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLE9BQU87UUFDZCxHQUFHLEVBQUUsU0FBUztRQUNkLElBQUksRUFBRSxTQUFTO1FBQ2YsTUFBTSxFQUFFLFNBQVM7UUFDakIsTUFBTSxFQUFFLFNBQVM7S0FDbEIsRUFDRCxTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxFQUNuRSxVQUFVLEdBQUcsU0FBUztTQUNuQixTQUFTLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDcEMsS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUNWLE9BQU8sRUFBRTtTQUNULElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLElBQU0sY0FBYyxHQUNsQixVQUFVLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRTVELE9BQU8sY0FBYyxDQUFDO0FBQ3hCLENBQUM7Ozs7Ozs7O1VFbkhEO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGF0aWMvLi9zcmMvYmVsbC50cyIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZGVmYXVsdEJyYW5kSW1hZ2UgPVxuICAnaHR0cHM6Ly9mdW5rby5jb20vb24vZGVtYW5kd2FyZS5zdGF0aWMvLS9TaXRlcy1mdW5rby1tYXN0ZXItY2F0YWxvZy9kZWZhdWx0L2R3YmIzOGExMTEvaW1hZ2VzL2Z1bmtvL3VwbG9hZC81NTk5OF9Db2NhQ29sYV9TMl9TcHJpdGVCb3R0bGVDYXBfUE9QX0dMQU0tV0VCLnBuZyc7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldE5vdGlmaWNhdGlvbigpIHtcbiAgY29uc3QgYmFzZVVSTCA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW47XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7YmFzZVVSTH0vdXNlci9ub3RpZmljYXRpb25gLCB7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgfSk7XG4gIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XG4gICAgY29uc3QgdXNlclJlcXVlc3RzID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIGNvbnN0IGJlbGxDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICdiZWxsLW5vdGlmaWNhdGlvbi1jb250YWluZXInLFxuICAgICk7XG4gICAgdXNlclJlcXVlc3RzLmZvckVhY2goKHJlcXVlc3Q6IGFueSkgPT4ge1xuICAgICAgY29uc3Qgbm90aWZpY2F0aW9uSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgbm90aWZpY2F0aW9uSXRlbS5jbGFzc0xpc3QuYWRkKCdiZWxsLW5vdGlmaWNhdGlvbi1pdGVtJyk7XG4gICAgICBub3RpZmljYXRpb25JdGVtLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cImZsZXggcHgtNCBweS0zIGhvdmVyOmJnLWdyYXktMTAwIGRhcms6aG92ZXI6YmctZ3JheS03MDBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleC1zaHJpbmstMFwiPlxuICAgICAgICAgICAgPGltZyBpZD1cImJlbGwtbm90aWZpY2F0aW9uLXByb2R1Y3QtaW1hZ2VcIiBjbGFzcz1cInJvdW5kZWQtZnVsbCB3LTExIGgtMTFcIiBzcmM9XCIvZG9jcy9pbWFnZXMvcGVvcGxlL3Byb2ZpbGUtcGljdHVyZS0xLmpwZ1wiXG4gICAgICAgICAgICAgIGFsdD1cIkpcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidy1mdWxsIHBsLTNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWdyYXktNTAwIHRleHQtc20gbWItMS41IGRhcms6dGV4dC1ncmF5LTQwMFwiPlxuICAgICAgICAgICAgICBOZXdcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDAgZGFyazp0ZXh0LXdoaXRlXCI+cmVxdWVzdCBzaGFyZTwvc3Bhbj46IHByb2R1Y3QgLSA8c3BhblxuICAgICAgICAgICAgICAgIGNsYXNzPVwiZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktOTAwIGRhcms6dGV4dC13aGl0ZVwiPlwiJHtcbiAgICAgICAgICAgICAgICAgIHJlcXVlc3QucHJvZHVjdF9uYW1lXG4gICAgICAgICAgICAgICAgfVwiPC9zcGFuPixcbiAgICAgICAgICAgICAgU0tVIC0gPHNwYW4gY2xhc3M9XCJmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDAgZGFyazp0ZXh0LXdoaXRlXCI+XCIke1xuICAgICAgICAgICAgICAgIHJlcXVlc3QuU0tVXG4gICAgICAgICAgICAgIH1cIjwvc3Bhbj4sIGRlc2lyZWQgcXVhbnRpdHkgLVxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtd2hpdGVcIj5cIiR7XG4gICAgICAgICAgICAgICAgcmVxdWVzdC5kZXNpcmVfcXVhbnRpdHlcbiAgICAgICAgICAgICAgfVwiPC9zcGFuPiwgdGFyZ2V0X2dyb3VwIC0gPHNwYW5cbiAgICAgICAgICAgICAgICBjbGFzcz1cImZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtd2hpdGVcIj5cIiR7XG4gICAgICAgICAgICAgICAgICByZXF1ZXN0LnRhcmdldF9ncm91cFxuICAgICAgICAgICAgICAgIH1cIjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQteHMgdGV4dC1ibHVlLTYwMCBkYXJrOnRleHQtYmx1ZS01MDBcIj5cbiAgICAgICAgICAgICAgJHtnZXRUaW1lRm9ybWF0KHJlcXVlc3QuY3JlYXRlZF9hdCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9hPlxuICAgICAgYDtcblxuICAgICAgY29uc3QgcHJvZHVjdEltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gbm90aWZpY2F0aW9uSXRlbS5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAnI2JlbGwtbm90aWZpY2F0aW9uLXByb2R1Y3QtaW1hZ2UnLFxuICAgICAgKTtcblxuICAgICAgcmVxdWVzdC5wcm9kdWN0X2ltYWdlLmxlbmd0aCA+IDEwMFxuICAgICAgICA/IChwcm9kdWN0SW1hZ2Uuc3JjID0gYGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCwgJHtyZXF1ZXN0LnByb2R1Y3RfaW1hZ2V9YClcbiAgICAgICAgOiAocHJvZHVjdEltYWdlLnNyYyA9IGRlZmF1bHRCcmFuZEltYWdlKTtcblxuICAgICAgY29uc3QgZmlyc3ROb3RpZmljYXRpb24gPSBiZWxsQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICcuYmVsbC1ub3RpZmljYXRpb24taXRlbScsXG4gICAgICApO1xuXG4gICAgICBpZiAoZmlyc3ROb3RpZmljYXRpb24pIHtcbiAgICAgICAgZmlyc3ROb3RpZmljYXRpb24uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxuICAgICAgICAgICdiZWZvcmViZWdpbicsXG4gICAgICAgICAgbm90aWZpY2F0aW9uSXRlbSxcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJlbGxDb250YWluZXIuYXBwZW5kQ2hpbGQobm90aWZpY2F0aW9uSXRlbSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gbGltaXROb3RpZmljYXRpb24oKSB7XG4gIGF3YWl0IGdldE5vdGlmaWNhdGlvbigpO1xuICBjb25zdCBiZWxsTm90aWZpY2F0aW9uSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICcuYmVsbC1ub3RpZmljYXRpb24taXRlbScsXG4gICk7XG5cbiAgaWYgKGJlbGxOb3RpZmljYXRpb25JdGVtcy5sZW5ndGggPiA4KSB7XG4gICAgZm9yIChsZXQgaSA9IDg7IGkgPCBiZWxsTm90aWZpY2F0aW9uSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGJlbGxOb3RpZmljYXRpb25JdGVtc1tpXS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9XG4gIH1cblxuICBpZiAoYmVsbE5vdGlmaWNhdGlvbkl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBiZWxsUmVkRG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JlbGwtbm90aWZpY2F0aW9uLXJlZC1kb3QnKTtcbiAgICBiZWxsUmVkRG90LmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpO1xuICB9XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKCdiZWxsLnRzJyk7XG4gIGxpbWl0Tm90aWZpY2F0aW9uKCk7XG59KTtcblxuZnVuY3Rpb24gZ2V0VGltZUZvcm1hdChjcmVhdGVkX2F0OiBzdHJpbmcpIHtcbiAgY29uc3QgZGF0ZV9zdHIgPSBjcmVhdGVkX2F0LFxuICAgIG9wdGlvbnM6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zID0ge1xuICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgbW9udGg6ICdzaG9ydCcsXG4gICAgICBkYXk6ICdudW1lcmljJyxcbiAgICAgIGhvdXI6ICcyLWRpZ2l0JyxcbiAgICAgIG1pbnV0ZTogJzItZGlnaXQnLFxuICAgICAgc2Vjb25kOiAnMi1kaWdpdCcsXG4gICAgfSxcbiAgICBmb3JtYXR0ZWQgPSBuZXcgRGF0ZShkYXRlX3N0cikudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1VUycsIG9wdGlvbnMpLFxuICAgIGRhdGVfcGFydHMgPSBmb3JtYXR0ZWRcbiAgICAgIC5zdWJzdHJpbmcoMCwgZm9ybWF0dGVkLmluZGV4T2YoJywnKSlcbiAgICAgIC5zcGxpdCgnICcpXG4gICAgICAucmV2ZXJzZSgpXG4gICAgICAuam9pbignICcpO1xuXG4gIGNvbnN0IGZvcm1hdHRlZF9kYXRlID1cbiAgICBkYXRlX3BhcnRzICsgZm9ybWF0dGVkLnN1YnN0cihmb3JtYXR0ZWQuaW5kZXhPZignLCcpICsgMSk7XG5cbiAgcmV0dXJuIGZvcm1hdHRlZF9kYXRlO1xufVxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbl9fd2VicGFja19tb2R1bGVzX19bXCIuL3NyYy9iZWxsLnRzXCJdKCk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=