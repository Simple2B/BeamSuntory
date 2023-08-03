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
        var response, userRequests, bellContainer_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("user/notification", {
                        method: 'GET',
                    })];
                case 1:
                    response = _a.sent();
                    console.log('response', response);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDO0lBQ3ZCLGlCQUFpQixFQUFFLENBQUM7QUFDdEIsQ0FBQyxDQUFDLENBQUM7QUFFSCxTQUFTLGFBQWEsQ0FBQyxVQUFrQjtJQUN2QyxJQUFNLFFBQVEsR0FBRyxVQUFVLEVBQ3pCLE9BQU8sR0FBK0I7UUFDcEMsSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsT0FBTztRQUNkLEdBQUcsRUFBRSxTQUFTO1FBQ2QsSUFBSSxFQUFFLFNBQVM7UUFDZixNQUFNLEVBQUUsU0FBUztRQUNqQixNQUFNLEVBQUUsU0FBUztLQUNsQixFQUNELFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEVBQ25FLFVBQVUsR0FBRyxTQUFTO1NBQ25CLFNBQVMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNwQyxLQUFLLENBQUMsR0FBRyxDQUFDO1NBQ1YsT0FBTyxFQUFFO1NBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsSUFBTSxjQUFjLEdBQ2xCLFVBQVUsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFNUQsT0FBTyxjQUFjLENBQUM7QUFDeEIsQ0FBQzs7Ozs7Ozs7VUVuSEQ7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3N0YXRpYy8uL3NyYy9iZWxsLnRzIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkZWZhdWx0QnJhbmRJbWFnZSA9XG4gICdodHRwczovL2Z1bmtvLmNvbS9vbi9kZW1hbmR3YXJlLnN0YXRpYy8tL1NpdGVzLWZ1bmtvLW1hc3Rlci1jYXRhbG9nL2RlZmF1bHQvZHdiYjM4YTExMS9pbWFnZXMvZnVua28vdXBsb2FkLzU1OTk4X0NvY2FDb2xhX1MyX1Nwcml0ZUJvdHRsZUNhcF9QT1BfR0xBTS1XRUIucG5nJztcblxuYXN5bmMgZnVuY3Rpb24gZ2V0Tm90aWZpY2F0aW9uKCkge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGB1c2VyL25vdGlmaWNhdGlvbmAsIHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICB9KTtcbiAgY29uc29sZS5sb2coJ3Jlc3BvbnNlJywgcmVzcG9uc2UpO1xuICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xuICAgIGNvbnN0IHVzZXJSZXF1ZXN0cyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBjb25zdCBiZWxsQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICAnYmVsbC1ub3RpZmljYXRpb24tY29udGFpbmVyJyxcbiAgICApO1xuICAgIHVzZXJSZXF1ZXN0cy5mb3JFYWNoKChyZXF1ZXN0OiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IG5vdGlmaWNhdGlvbkl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIG5vdGlmaWNhdGlvbkl0ZW0uY2xhc3NMaXN0LmFkZCgnYmVsbC1ub3RpZmljYXRpb24taXRlbScpO1xuICAgICAgbm90aWZpY2F0aW9uSXRlbS5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJmbGV4IHB4LTQgcHktMyBob3ZlcjpiZy1ncmF5LTEwMCBkYXJrOmhvdmVyOmJnLWdyYXktNzAwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXgtc2hyaW5rLTBcIj5cbiAgICAgICAgICAgIDxpbWcgaWQ9XCJiZWxsLW5vdGlmaWNhdGlvbi1wcm9kdWN0LWltYWdlXCIgY2xhc3M9XCJyb3VuZGVkLWZ1bGwgdy0xMSBoLTExXCIgc3JjPVwiL2RvY3MvaW1hZ2VzL3Blb3BsZS9wcm9maWxlLXBpY3R1cmUtMS5qcGdcIlxuICAgICAgICAgICAgICBhbHQ9XCJKXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInctZnVsbCBwbC0zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1ncmF5LTUwMCB0ZXh0LXNtIG1iLTEuNSBkYXJrOnRleHQtZ3JheS00MDBcIj5cbiAgICAgICAgICAgICAgTmV3XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktOTAwIGRhcms6dGV4dC13aGl0ZVwiPnJlcXVlc3Qgc2hhcmU8L3NwYW4+OiBwcm9kdWN0IC0gPHNwYW5cbiAgICAgICAgICAgICAgICBjbGFzcz1cImZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtd2hpdGVcIj5cIiR7XG4gICAgICAgICAgICAgICAgICByZXF1ZXN0LnByb2R1Y3RfbmFtZVxuICAgICAgICAgICAgICAgIH1cIjwvc3Bhbj4sXG4gICAgICAgICAgICAgIFNLVSAtIDxzcGFuIGNsYXNzPVwiZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktOTAwIGRhcms6dGV4dC13aGl0ZVwiPlwiJHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0LlNLVVxuICAgICAgICAgICAgICB9XCI8L3NwYW4+LCBkZXNpcmVkIHF1YW50aXR5IC1cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDAgZGFyazp0ZXh0LXdoaXRlXCI+XCIke1xuICAgICAgICAgICAgICAgIHJlcXVlc3QuZGVzaXJlX3F1YW50aXR5XG4gICAgICAgICAgICAgIH1cIjwvc3Bhbj4sIHRhcmdldF9ncm91cCAtIDxzcGFuXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDAgZGFyazp0ZXh0LXdoaXRlXCI+XCIke1xuICAgICAgICAgICAgICAgICAgcmVxdWVzdC50YXJnZXRfZ3JvdXBcbiAgICAgICAgICAgICAgICB9XCI8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXhzIHRleHQtYmx1ZS02MDAgZGFyazp0ZXh0LWJsdWUtNTAwXCI+XG4gICAgICAgICAgICAgICR7Z2V0VGltZUZvcm1hdChyZXF1ZXN0LmNyZWF0ZWRfYXQpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvYT5cbiAgICAgIGA7XG5cbiAgICAgIGNvbnN0IHByb2R1Y3RJbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IG5vdGlmaWNhdGlvbkl0ZW0ucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJyNiZWxsLW5vdGlmaWNhdGlvbi1wcm9kdWN0LWltYWdlJyxcbiAgICAgICk7XG5cbiAgICAgIHJlcXVlc3QucHJvZHVjdF9pbWFnZS5sZW5ndGggPiAxMDBcbiAgICAgICAgPyAocHJvZHVjdEltYWdlLnNyYyA9IGBkYXRhOmltYWdlL3BuZztiYXNlNjQsICR7cmVxdWVzdC5wcm9kdWN0X2ltYWdlfWApXG4gICAgICAgIDogKHByb2R1Y3RJbWFnZS5zcmMgPSBkZWZhdWx0QnJhbmRJbWFnZSk7XG5cbiAgICAgIGNvbnN0IGZpcnN0Tm90aWZpY2F0aW9uID0gYmVsbENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAnLmJlbGwtbm90aWZpY2F0aW9uLWl0ZW0nLFxuICAgICAgKTtcblxuICAgICAgaWYgKGZpcnN0Tm90aWZpY2F0aW9uKSB7XG4gICAgICAgIGZpcnN0Tm90aWZpY2F0aW9uLmluc2VydEFkamFjZW50RWxlbWVudChcbiAgICAgICAgICAnYmVmb3JlYmVnaW4nLFxuICAgICAgICAgIG5vdGlmaWNhdGlvbkl0ZW0sXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBiZWxsQ29udGFpbmVyLmFwcGVuZENoaWxkKG5vdGlmaWNhdGlvbkl0ZW0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxpbWl0Tm90aWZpY2F0aW9uKCkge1xuICBhd2FpdCBnZXROb3RpZmljYXRpb24oKTtcbiAgY29uc3QgYmVsbE5vdGlmaWNhdGlvbkl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAnLmJlbGwtbm90aWZpY2F0aW9uLWl0ZW0nLFxuICApO1xuXG4gIGlmIChiZWxsTm90aWZpY2F0aW9uSXRlbXMubGVuZ3RoID4gOCkge1xuICAgIGZvciAobGV0IGkgPSA4OyBpIDwgYmVsbE5vdGlmaWNhdGlvbkl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBiZWxsTm90aWZpY2F0aW9uSXRlbXNbaV0uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGJlbGxOb3RpZmljYXRpb25JdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgYmVsbFJlZERvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiZWxsLW5vdGlmaWNhdGlvbi1yZWQtZG90Jyk7XG4gICAgYmVsbFJlZERvdC5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcbiAgfVxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICBjb25zb2xlLmxvZygnYmVsbC50cycpO1xuICBsaW1pdE5vdGlmaWNhdGlvbigpO1xufSk7XG5cbmZ1bmN0aW9uIGdldFRpbWVGb3JtYXQoY3JlYXRlZF9hdDogc3RyaW5nKSB7XG4gIGNvbnN0IGRhdGVfc3RyID0gY3JlYXRlZF9hdCxcbiAgICBvcHRpb25zOiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucyA9IHtcbiAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgIG1vbnRoOiAnc2hvcnQnLFxuICAgICAgZGF5OiAnbnVtZXJpYycsXG4gICAgICBob3VyOiAnMi1kaWdpdCcsXG4gICAgICBtaW51dGU6ICcyLWRpZ2l0JyxcbiAgICAgIHNlY29uZDogJzItZGlnaXQnLFxuICAgIH0sXG4gICAgZm9ybWF0dGVkID0gbmV3IERhdGUoZGF0ZV9zdHIpLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tVVMnLCBvcHRpb25zKSxcbiAgICBkYXRlX3BhcnRzID0gZm9ybWF0dGVkXG4gICAgICAuc3Vic3RyaW5nKDAsIGZvcm1hdHRlZC5pbmRleE9mKCcsJykpXG4gICAgICAuc3BsaXQoJyAnKVxuICAgICAgLnJldmVyc2UoKVxuICAgICAgLmpvaW4oJyAnKTtcblxuICBjb25zdCBmb3JtYXR0ZWRfZGF0ZSA9XG4gICAgZGF0ZV9wYXJ0cyArIGZvcm1hdHRlZC5zdWJzdHIoZm9ybWF0dGVkLmluZGV4T2YoJywnKSArIDEpO1xuXG4gIHJldHVybiBmb3JtYXR0ZWRfZGF0ZTtcbn1cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG5fX3dlYnBhY2tfbW9kdWxlc19fW1wiLi9zcmMvYmVsbC50c1wiXSgpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9