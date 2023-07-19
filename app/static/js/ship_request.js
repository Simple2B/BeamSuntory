/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ship_request.ts":
/*!*****************************!*\
  !*** ./src/ship_request.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports) {


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
var modalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: true,
    onHide: function () {
        console.log('modal is hidden');
    },
    onShow: function () {
        console.log('user id: ');
    },
    onToggle: function () {
        console.log('modal has been toggled');
    },
};
// search flow
var searchInput = document.querySelector('#table-search-ship-request');
var searchInputButton = document.querySelector('#table-search-ship-request-button');
if (searchInputButton && searchInput) {
    searchInputButton.addEventListener('click', function () {
        var url = new URL(window.location.href);
        url.searchParams.set('q', searchInput.value);
        window.location.href = "".concat(url.href);
    });
}
var deleteButtons = document.querySelectorAll('.delete-ship-request-btn');
deleteButtons.forEach(function (e) {
    e.addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
        var id, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm('Are sure?')) return [3 /*break*/, 2];
                    id = e.getAttribute('data-ship-request-id');
                    return [4 /*yield*/, fetch("/ship_request/delete/".concat(id), {
                            method: 'DELETE',
                        })];
                case 1:
                    response = _a.sent();
                    if (response.status == 200) {
                        location.reload();
                    }
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); });
});
var viewShipRequestButtonElements = document.querySelectorAll('.ship-request-view-button');
viewShipRequestButtonElements.forEach(function (e) {
    return e.addEventListener('click', function () {
        var shipRequest = JSON.parse(e.getAttribute('data-target'));
        var div = document.querySelector('#ship-request-view-order-number');
        div.innerHTML = shipRequest.order_numb;
        div = document.querySelector('#ship-request-view-status');
        div.innerHTML = shipRequest.status;
        div = document.querySelector('#ship-request-view-created-date');
        div.innerHTML = shipRequest.created_at.slice(0, 10);
        div = document.querySelector('#ship-request-view-quantity');
        div.innerHTML = shipRequest.quantity.toString();
    });
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/ship_request.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RyxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDcEQsR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUM1RCxHQUFHLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEQsQ0FBQyxDQUFDO0FBYkYsQ0FhRSxDQUNILENBQUM7Ozs7Ozs7O1VFL0VGO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGF0aWMvLi9zcmMvc2hpcF9yZXF1ZXN0LnRzIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZGFsfSBmcm9tICdmbG93Yml0ZSc7XG5pbXBvcnQgdHlwZSB7TW9kYWxPcHRpb25zLCBNb2RhbEludGVyZmFjZX0gZnJvbSAnZmxvd2JpdGUnO1xuXG5pbnRlcmZhY2UgSVNoaXBSZXF1ZXN0IHtcbiAgaWQ6IG51bWJlcjtcbiAgb3JkZXJfbnVtYjogc3RyaW5nO1xuICBzdGF0dXM6IHN0cmluZztcbiAgb3JkZXJfdHlwZTogc3RyaW5nO1xuICBzdXBwbGllcl9pZDogbnVtYmVyO1xuICBjcmVhdGVkX2F0OiBzdHJpbmc7XG4gIHF1YW50aXR5OiBudW1iZXI7XG59XG5cbmNvbnN0IG1vZGFsT3B0aW9uczogTW9kYWxPcHRpb25zID0ge1xuICBwbGFjZW1lbnQ6ICdib3R0b20tcmlnaHQnLFxuICBiYWNrZHJvcDogJ2R5bmFtaWMnLFxuICBiYWNrZHJvcENsYXNzZXM6XG4gICAgJ2JnLWdyYXktOTAwIGJnLW9wYWNpdHktNTAgZGFyazpiZy1vcGFjaXR5LTgwIGZpeGVkIGluc2V0LTAgei00MCcsXG4gIGNsb3NhYmxlOiB0cnVlLFxuICBvbkhpZGU6ICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnbW9kYWwgaXMgaGlkZGVuJyk7XG4gIH0sXG4gIG9uU2hvdzogKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCd1c2VyIGlkOiAnKTtcbiAgfSxcbiAgb25Ub2dnbGU6ICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnbW9kYWwgaGFzIGJlZW4gdG9nZ2xlZCcpO1xuICB9LFxufTtcblxuLy8gc2VhcmNoIGZsb3dcbmNvbnN0IHNlYXJjaElucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgJyN0YWJsZS1zZWFyY2gtc2hpcC1yZXF1ZXN0Jyxcbik7XG5jb25zdCBzZWFyY2hJbnB1dEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICcjdGFibGUtc2VhcmNoLXNoaXAtcmVxdWVzdC1idXR0b24nLFxuKTtcbmlmIChzZWFyY2hJbnB1dEJ1dHRvbiAmJiBzZWFyY2hJbnB1dCkge1xuICBzZWFyY2hJbnB1dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLnNldCgncScsIHNlYXJjaElucHV0LnZhbHVlKTtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAke3VybC5ocmVmfWA7XG4gIH0pO1xufVxuXG5jb25zdCBkZWxldGVCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRlbGV0ZS1zaGlwLXJlcXVlc3QtYnRuJyk7XG5cbmRlbGV0ZUJ1dHRvbnMuZm9yRWFjaChlID0+IHtcbiAgZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICBpZiAoY29uZmlybSgnQXJlIHN1cmU/JykpIHtcbiAgICAgIGxldCBpZCA9IGUuZ2V0QXR0cmlidXRlKCdkYXRhLXNoaXAtcmVxdWVzdC1pZCcpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL3NoaXBfcmVxdWVzdC9kZWxldGUvJHtpZH1gLCB7XG4gICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICB9KTtcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59KTtcblxuY29uc3Qgdmlld1NoaXBSZXF1ZXN0QnV0dG9uRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAnLnNoaXAtcmVxdWVzdC12aWV3LWJ1dHRvbicsXG4pO1xudmlld1NoaXBSZXF1ZXN0QnV0dG9uRWxlbWVudHMuZm9yRWFjaChlID0+XG4gIGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3Qgc2hpcFJlcXVlc3Q6IElTaGlwUmVxdWVzdCA9IEpTT04ucGFyc2UoZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0JykpO1xuXG4gICAgbGV0IGRpdjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgJyNzaGlwLXJlcXVlc3Qtdmlldy1vcmRlci1udW1iZXInLFxuICAgICk7XG4gICAgZGl2LmlubmVySFRNTCA9IHNoaXBSZXF1ZXN0Lm9yZGVyX251bWI7XG4gICAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NoaXAtcmVxdWVzdC12aWV3LXN0YXR1cycpO1xuICAgIGRpdi5pbm5lckhUTUwgPSBzaGlwUmVxdWVzdC5zdGF0dXM7XG4gICAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NoaXAtcmVxdWVzdC12aWV3LWNyZWF0ZWQtZGF0ZScpO1xuICAgIGRpdi5pbm5lckhUTUwgPSBzaGlwUmVxdWVzdC5jcmVhdGVkX2F0LnNsaWNlKDAsIDEwKTtcbiAgICBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2hpcC1yZXF1ZXN0LXZpZXctcXVhbnRpdHknKTtcbiAgICBkaXYuaW5uZXJIVE1MID0gc2hpcFJlcXVlc3QucXVhbnRpdHkudG9TdHJpbmcoKTtcbiAgfSksXG4pO1xuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IHt9O1xuX193ZWJwYWNrX21vZHVsZXNfX1tcIi4vc3JjL3NoaXBfcmVxdWVzdC50c1wiXSgwLCBfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==