/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/inventory.ts ***!
  \**************************/
// search flow
var searchInput = document.querySelector('#table-search-inventory');
var searchInputButton = document.querySelector('#table-search-inventory-button');
if (searchInputButton && searchInput) {
    searchInputButton.addEventListener('click', function () {
        var url = new URL(window.location.href);
        url.searchParams.set('q', searchInput.value);
        window.location.href = "".concat(url.href);
    });
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvaW52ZW50b3J5LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLElBQU0sV0FBVyxHQUFxQixRQUFRLENBQUMsYUFBYSxDQUFDLHlCQUF5QixDQUFDO0FBQ3ZGLElBQU0saUJBQWlCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQ0FBZ0MsQ0FBQztBQUNsRixJQUFJLGlCQUFpQixJQUFJLFdBQVcsRUFBRTtJQUNsQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDeEMsSUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDekMsR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUM7UUFDNUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsVUFBRyxHQUFHLENBQUMsSUFBSSxDQUFFO0lBQ3hDLENBQUMsQ0FBQztDQUNMIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RhdGljLy4vc3JjL2ludmVudG9yeS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzZWFyY2ggZmxvd1xuY29uc3Qgc2VhcmNoSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFibGUtc2VhcmNoLWludmVudG9yeScpXG5jb25zdCBzZWFyY2hJbnB1dEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YWJsZS1zZWFyY2gtaW52ZW50b3J5LWJ1dHRvbicpXG5pZiAoc2VhcmNoSW5wdXRCdXR0b24gJiYgc2VhcmNoSW5wdXQpIHtcbiAgICBzZWFyY2hJbnB1dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZilcbiAgICAgICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoJ3EnLCBzZWFyY2hJbnB1dC52YWx1ZSlcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgJHt1cmwuaHJlZn1gXG4gICAgfSlcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==