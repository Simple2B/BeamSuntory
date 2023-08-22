/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/inventory.ts ***!
  \**************************/
// search flow
var searchInput = document.querySelector('#table-search-inventory');
var searchInputButton = document.querySelector('#table-search-inventory-button');
if (searchAssignInputButton && searchAssignInput) {
    searchAssignInputButton.addEventListener('click', function () {
        var url = new URL(window.location.href);
        url.searchParams.set('q', searchAssignInput.value);
        window.location.href = "".concat(url.href);
    });
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvaW52ZW50b3J5LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLElBQU0sV0FBVyxHQUFxQixRQUFRLENBQUMsYUFBYSxDQUFDLHlCQUF5QixDQUFDO0FBQ3ZGLElBQU0saUJBQWlCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQ0FBZ0MsQ0FBQztBQUNsRixJQUFJLHVCQUF1QixJQUFJLGlCQUFpQixFQUFFO0lBQzlDLHVCQUF1QixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtRQUM5QyxJQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztRQUN6QyxHQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUMsS0FBSyxDQUFDO1FBQ2xELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLFVBQUcsR0FBRyxDQUFDLElBQUksQ0FBRTtJQUN4QyxDQUFDLENBQUM7Q0FDTCIsInNvdXJjZXMiOlsid2VicGFjazovL3N0YXRpYy8uL3NyYy9pbnZlbnRvcnkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gc2VhcmNoIGZsb3dcbmNvbnN0IHNlYXJjaElucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RhYmxlLXNlYXJjaC1pbnZlbnRvcnknKVxuY29uc3Qgc2VhcmNoSW5wdXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFibGUtc2VhcmNoLWludmVudG9yeS1idXR0b24nKVxuaWYgKHNlYXJjaEFzc2lnbklucHV0QnV0dG9uICYmIHNlYXJjaEFzc2lnbklucHV0KSB7XG4gICAgc2VhcmNoQXNzaWduSW5wdXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpXG4gICAgICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KCdxJywgc2VhcmNoQXNzaWduSW5wdXQudmFsdWUpXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYCR7dXJsLmhyZWZ9YFxuICAgIH0pXG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=