(()=>{function e(){var e=new URL(window.location.href),t=document.querySelector("#table-search-event"),r=document.querySelector("#product-event-sort-start-from-datepicker"),o=document.querySelector("#product-event-sort-start-to-datepicker"),c=document.querySelector("#product-event-sort-end-from-datepicker"),n=document.querySelector("#product-event-sort-end-to-datepicker");e.searchParams.set("q",t.value),e.searchParams.set("start_from",r.value),e.searchParams.set("start_to",o.value),e.searchParams.set("end_from",c.value),e.searchParams.set("end_to",n.value),window.location.href="".concat(e.href),console.log(e.href)}document.querySelector("#product-event-clear-button").addEventListener("click",(function(){console.log("clear date search button clicked"),document.querySelectorAll(".product-event-sort-datepicker").forEach((function(t){t.value="",e()}))})),document.addEventListener("DOMContentLoaded",(function(){var t=document.querySelector("#table-search-event"),r=document.querySelector("#table-search-event-button");r&&t&&r.addEventListener("click",(function(){e()})),document.querySelectorAll(".product-event-sort-datepicker").forEach((function(t){t.addEventListener("changeDate",(function(t){e()}))}))}))})();