(()=>{var e={events:["user-select","filter-start-date","filter-start-date-to","filter-end-date","filter-end-date-to","filter-group-brand"],request_share:["user-select","filter-start-date","filter-end-date","master-group","target-group","target-sub-group","filter-group-brand"],inventories:["user-select","filter-start-date","filter-end-date","master-group","target-group","target-sub-group","filter-group-brand","filter-group-language","filter-group-premises","filter-group-categories","filter-group-events"],adjustment:["user-select","filter-start-date","filter-end-date","master-group","target-group","target-sub-group","filter-group-brand","filter-group-language","filter-group-premises","filter-group-categories","filter-group-events"],assign:["user-select","group-from","group-to","filter-start-date","filter-end-date","filter-group-brand","filter-group-language","filter-group-premises","filter-group-categories"],inbound_order:["master-group","target-group","target-sub-group","filter-start-date","filter-end-date","filter-group-brand","filter-group-premises","filter-group-categories"],shipping:["division-select","master-group","target-group","target-sub-group","filter-start-date","filter-end-date","filter-group-brand","filter-group-language","filter-group-categories","filter-group-premises"],shelf_life:["filter-start-date","filter-end-date","master-group","target-group","target-sub-group","filter-group-brand","filter-group-language","filter-group-premises","filter-group-categories","shelf-life-filter-expire-in"]},t=["request-share-type","shipping-type","user-select","filter-start-date","filter-start-date-to","filter-end-date","filter-end-date-to","master-group","target-group","target-sub-group","filter-group-brand","filter-group-language","filter-group-premises","filter-group-categories","filter-group-events","filter-product-group","group-from","group-to","division-select","shelf-life-filter-expire-in"];document.addEventListener("DOMContentLoaded",(function(){for(var r=document.getElementById("report-type-select"),a=t.map((function(e){return document.getElementById(e)})),i=document.getElementById("table-report-loader"),u=document.getElementById("filter-clear-button"),o=document.getElementById("report-target-group-select"),n=document.getElementById("report-group-id-hidden"),l=document.getElementById("search-query"),g=document.getElementById("search-sku"),s=0,d=Object.entries(e);s<d.length;s++){var p=d[s],f=p[0],c=p[1];e[f]=c.map((function(e){return document.getElementById(e)}))}r.addEventListener("change",(function(t){var r=t.target;a.forEach((function(e){return!e.classList.contains("hidden")&&e.classList.add("hidden")})),e[r.value].forEach((function(e){return e.classList.remove("hidden")}))})),a.forEach((function(e){return!e.classList.contains("hidden")&&e.classList.add("hidden")})),e[r.value].forEach((function(e){return e.classList.remove("hidden")})),o.addEventListener("change",(function(){var e=o.querySelector('option[value="'.concat(o.value,'"]'));e&&(n.value=e.getAttribute("data-target-group-id"),n.click())})),u.addEventListener("click",(function(){t.map((function(e){return document.getElementById(e)})).forEach((function(e){e&&e.querySelectorAll("input, select").forEach((function(e){e.value=""}))})),l.value="",g.value="",i.click()})),i.click()}))})();