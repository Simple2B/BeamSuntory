/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************!*\
  !*** ./src/assign.ts ***!
  \***********************/
// search flow
var searchAssignInput = document.querySelector('#table-search-assign');
var searchAssignInputButton = document.querySelector('#table-search-assign-button');
if (searchAssignInputButton && searchAssignInput) {
    searchAssignInputButton.addEventListener('click', function () {
        var url = new URL(window.location.href);
        url.searchParams.set('q', searchAssignInput.value);
        window.location.href = "".concat(url.href);
    });
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvYXNzaWduLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLElBQU0saUJBQWlCLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUM7QUFDMUYsSUFBTSx1QkFBdUIsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLDZCQUE2QixDQUFDO0FBQ3JGLElBQUksdUJBQXVCLElBQUksaUJBQWlCLEVBQUU7SUFDOUMsdUJBQXVCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO1FBQzlDLElBQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ3pDLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7UUFDbEQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsVUFBRyxHQUFHLENBQUMsSUFBSSxDQUFFO0lBQ3hDLENBQUMsQ0FBQztDQUNMIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RhdGljLy4vc3JjL2Fzc2lnbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzZWFyY2ggZmxvd1xuY29uc3Qgc2VhcmNoQXNzaWduSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFibGUtc2VhcmNoLWFzc2lnbicpXG5jb25zdCBzZWFyY2hBc3NpZ25JbnB1dEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YWJsZS1zZWFyY2gtYXNzaWduLWJ1dHRvbicpXG5pZiAoc2VhcmNoQXNzaWduSW5wdXRCdXR0b24gJiYgc2VhcmNoQXNzaWduSW5wdXQpIHtcbiAgICBzZWFyY2hBc3NpZ25JbnB1dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZilcbiAgICAgICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoJ3EnLCBzZWFyY2hBc3NpZ25JbnB1dC52YWx1ZSlcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgJHt1cmwuaHJlZn1gXG4gICAgfSlcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==