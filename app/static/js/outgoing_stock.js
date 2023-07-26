/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/outgoing_stock.ts":
/*!*******************************!*\
  !*** ./src/outgoing_stock.ts ***!
  \*******************************/
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
var _this = this;
// search flow
var searchOutgoingInput = document.querySelector('#table-search-outgoing-stocks');
var searchOutgoingInputButton = document.querySelector('#table-search-outgoing-stock-button');
if (searchOutgoingInputButton && searchOutgoingInput) {
    searchOutgoingInputButton.addEventListener('click', function () {
        var url = new URL(window.location.href);
        url.searchParams.set('q', searchOutgoingInput.value);
        window.location.href = "".concat(url.href);
    });
}
var dispatchButtons = document.querySelectorAll('.dispatch-outgoing-stock-btn');
dispatchButtons.forEach(function (e) {
    e.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
        var id, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm('Are sure?')) return [3 /*break*/, 2];
                    id = e.getAttribute('data-outgoing-stock-id');
                    return [4 /*yield*/, fetch("/outgoing_stock/dispatch/".concat(id), {
                            method: 'GET',
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
var cancelButtons = document.querySelectorAll('.cancel-outgoing-stock-btn');
cancelButtons.forEach(function (e) {
    e.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
        var id, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm('Are sure?')) return [3 /*break*/, 2];
                    id = e.getAttribute('data-outgoing-stock-id');
                    return [4 /*yield*/, fetch("/outgoing_stock/cancel/".concat(id), {
                            method: 'GET',
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/outgoing_stock.ts"]();
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvb3V0Z29pbmdfc3RvY2suanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUJBd0ZBO0FBL0NBLGNBQWM7QUFDZCxJQUFNLG1CQUFtQixHQUFxQixRQUFRLENBQUMsYUFBYSxDQUNsRSwrQkFBK0IsQ0FDaEMsQ0FBQztBQUNGLElBQU0seUJBQXlCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDdEQscUNBQXFDLENBQ3RDLENBQUM7QUFDRixJQUFJLHlCQUF5QixJQUFJLG1CQUFtQixFQUFFO0lBQ3BELHlCQUF5QixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtRQUNsRCxJQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxVQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUUsQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQztDQUNKO0FBQ0QsSUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUMvQyw4QkFBOEIsQ0FDL0IsQ0FBQztBQUVGLGVBQWUsQ0FBQyxPQUFPLENBQUMsV0FBQztJQUN2QixDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFOzs7Ozt5QkFDdEIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFwQix3QkFBb0I7b0JBQ2xCLEVBQUUsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLHdCQUF3QixDQUFDLENBQUM7b0JBQ2pDLHFCQUFNLEtBQUssQ0FBQyxtQ0FBNEIsRUFBRSxDQUFFLEVBQUU7NEJBQzdELE1BQU0sRUFBRSxLQUFLO3lCQUNkLENBQUM7O29CQUZJLFFBQVEsR0FBRyxTQUVmO29CQUNGLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUU7d0JBQzFCLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztxQkFDbkI7Ozs7O1NBRUosQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsNEJBQTRCLENBQUMsQ0FBQztBQUU5RSxhQUFhLENBQUMsT0FBTyxDQUFDLFdBQUM7SUFDckIsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTs7Ozs7eUJBQ3RCLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBcEIsd0JBQW9CO29CQUNsQixFQUFFLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO29CQUNqQyxxQkFBTSxLQUFLLENBQUMsaUNBQTBCLEVBQUUsQ0FBRSxFQUFFOzRCQUMzRCxNQUFNLEVBQUUsS0FBSzt5QkFDZCxDQUFDOztvQkFGSSxRQUFRLEdBQUcsU0FFZjtvQkFDRixJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFO3dCQUMxQixRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7cUJBQ25COzs7OztTQUVKLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDOzs7Ozs7OztVRXZGSDtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RhdGljLy4vc3JjL291dGdvaW5nX3N0b2NrLnRzIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbnRlcmZhY2UgSVNoaXBSZXF1ZXN0IHtcbiAgaWQ6IG51bWJlcjtcbiAgb3JkZXJfbnVtYjogc3RyaW5nO1xuICBzdGF0dXM6IHN0cmluZztcbiAgb3JkZXJfdHlwZTogc3RyaW5nO1xuICBzdG9yZV9pZDogbnVtYmVyO1xuICB3YXJlaG91c2VfaWQ6IG51bWJlcjtcbiAgd2FyZWhvdXNlX25hbWU6IHN0cmluZztcbiAgY3JlYXRlZF9hdDogc3RyaW5nO1xuICBxdWFudGl0eTogbnVtYmVyO1xuICBjdXJyZW50X29yZGVyX2NhcnRzOiBJUHJvZHVjdFtdO1xuICBjb21tZW50OiBzdHJpbmc7XG4gIHdhcmVob3VzZXM6IElXYXJlaG91c2VbXTtcbn1cblxuaW50ZXJmYWNlIElQcm9kdWN0IHtcbiAgaWQ6IG51bWJlcjtcbiAgbmFtZTogc3RyaW5nO1xuICBxdWFudGl0eTogc3RyaW5nO1xuICBwcmljZTogbnVtYmVyO1xuICBpbWFnZTogc3RyaW5nO1xuICBTS1U6IHN0cmluZztcbiAgY29tbWVudDogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgSVN0b3JlIHtcbiAgaWQ6IG51bWJlcjtcbiAgc3RvcmVfbmFtZTogc3RyaW5nO1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIHBob25lX251bWI6IHN0cmluZztcbiAgY291bnRyeTogc3RyaW5nO1xuICByZWdpb246IHN0cmluZztcbiAgY2l0eTogc3RyaW5nO1xuICB6aXA6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIElXYXJlaG91c2Uge1xuICBpZDogbnVtYmVyO1xuICBuYW1lOiBzdHJpbmc7XG59XG5cbi8vIHNlYXJjaCBmbG93XG5jb25zdCBzZWFyY2hPdXRnb2luZ0lucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgJyN0YWJsZS1zZWFyY2gtb3V0Z29pbmctc3RvY2tzJyxcbik7XG5jb25zdCBzZWFyY2hPdXRnb2luZ0lucHV0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgJyN0YWJsZS1zZWFyY2gtb3V0Z29pbmctc3RvY2stYnV0dG9uJyxcbik7XG5pZiAoc2VhcmNoT3V0Z29pbmdJbnB1dEJ1dHRvbiAmJiBzZWFyY2hPdXRnb2luZ0lucHV0KSB7XG4gIHNlYXJjaE91dGdvaW5nSW5wdXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoJ3EnLCBzZWFyY2hPdXRnb2luZ0lucHV0LnZhbHVlKTtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAke3VybC5ocmVmfWA7XG4gIH0pO1xufVxuY29uc3QgZGlzcGF0Y2hCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgJy5kaXNwYXRjaC1vdXRnb2luZy1zdG9jay1idG4nLFxuKTtcblxuZGlzcGF0Y2hCdXR0b25zLmZvckVhY2goZSA9PiB7XG4gIGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgaWYgKGNvbmZpcm0oJ0FyZSBzdXJlPycpKSB7XG4gICAgICBsZXQgaWQgPSBlLmdldEF0dHJpYnV0ZSgnZGF0YS1vdXRnb2luZy1zdG9jay1pZCcpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL291dGdvaW5nX3N0b2NrL2Rpc3BhdGNoLyR7aWR9YCwge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgfSk7XG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufSk7XG5cbmNvbnN0IGNhbmNlbEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FuY2VsLW91dGdvaW5nLXN0b2NrLWJ0bicpO1xuXG5jYW5jZWxCdXR0b25zLmZvckVhY2goZSA9PiB7XG4gIGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgaWYgKGNvbmZpcm0oJ0FyZSBzdXJlPycpKSB7XG4gICAgICBsZXQgaWQgPSBlLmdldEF0dHJpYnV0ZSgnZGF0YS1vdXRnb2luZy1zdG9jay1pZCcpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL291dGdvaW5nX3N0b2NrL2NhbmNlbC8ke2lkfWAsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIH0pO1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn0pO1xuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbl9fd2VicGFja19tb2R1bGVzX19bXCIuL3NyYy9vdXRnb2luZ19zdG9jay50c1wiXSgpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9