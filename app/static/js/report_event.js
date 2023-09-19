/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
/*!*****************************!*\
  !*** ./src/report_event.ts ***!
  \*****************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
document.addEventListener('DOMContentLoaded', function () {
    // view buttons click
    var reportViewButtons = document.querySelectorAll('.report-event-view-btn');
    reportViewButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var reportEvent = JSON.parse(btn.getAttribute('data-target'));
            console.log({ reportEvent: reportEvent });
        });
    });
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcmVwb3J0X2V2ZW50LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBY0EsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFO0lBQzVDLHFCQUFxQjtJQUNyQixJQUFNLGlCQUFpQixHQUFrQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUM3RyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsYUFBRztRQUMzQixHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO1lBQzVCLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBQyxXQUFXLGVBQUMsQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RhdGljLy4vc3JjL3JlcG9ydF9ldmVudC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJUHJvZHVjdCB9IGZyb20gXCIuL2luYm91bmRfb3JkZXIvdHlwZXNcIlxuXG5pbnRlcmZhY2UgSVByb2R1Y3RFdmVudCB7XG4gIGRhdGVGcm9tOiBzdHJpbmcgXG4gIGRhdGVUbzogc3RyaW5nXG4gIHByb2R1Y3Q6IElQcm9kdWN0XG59XG5cbmludGVyZmFjZSBJUmVwb3J0RXZlbnQge1xuICBxdWFudGl0eTogbnVtYmVyXG4gIHR5cGU6IHN0cmluZ1xuICBldmVudDogSVByb2R1Y3RFdmVudFxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAvLyB2aWV3IGJ1dHRvbnMgY2xpY2tcbiAgY29uc3QgcmVwb3J0Vmlld0J1dHRvbnM6IE5vZGVMaXN0T2Y8SFRNTEJ1dHRvbkVsZW1lbnQ+ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlcG9ydC1ldmVudC12aWV3LWJ0bicpO1xuICByZXBvcnRWaWV3QnV0dG9ucy5mb3JFYWNoKGJ0biA9PiB7XG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29uc3QgcmVwb3J0RXZlbnQgPSBKU09OLnBhcnNlKGJ0bi5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0JykpO1xuICAgICAgY29uc29sZS5sb2coe3JlcG9ydEV2ZW50fSk7XG4gICAgfSlcbiAgfSlcbn0pOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==