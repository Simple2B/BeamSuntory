(()=>{"use strict";var e={125:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,a){function u(e){try{c(n.next(e))}catch(e){a(e)}}function i(e){try{c(n.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(u,i)}c((n=n.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var r,n,o,a,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function i(i){return function(c){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a&&(a=0,i[0]&&(u=0)),u;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,n=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!((o=(o=u.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(e){i=[6,e],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}};Object.defineProperty(t,"__esModule",{value:!0});var a=r(593),u={events:["user-select","filter-start-date","filter-start-date-to","filter-end-date","filter-end-date-to"],request_share:["user-select","filter-start-date","filter-end-date","master-group","target-group","target-sub-group"],inventories:["user-select","filter-start-date","filter-end-date","master-group","target-group","target-sub-group","filter-group-brand","filter-group-language","filter-group-premises","filter-group-categories","filter-group-events"],adjustment:["user-select","filter-start-date","filter-end-date","master-group","target-group","target-sub-group","filter-group-brand","filter-group-language","filter-group-premises","filter-group-categories","filter-group-events"],assign:["user-select","group-from","group-to","filter-start-date","filter-end-date","filter-group-brand","filter-group-language","filter-group-premises","filter-group-categories"],inbound_order:["filter-start-date","filter-end-date","filter-group-brand","filter-group-premises","filter-group-categories","filter-product-group"],shipping:["division-select","target-group","target-sub-group","filter-start-date","filter-end-date","filter-group-brand","filter-group-language","filter-group-categories","filter-group-premises"],shelf_life:["filter-start-date","filter-end-date","master-group","target-group","target-sub-group","filter-group-brand","filter-group-language","filter-group-premises","filter-group-categories","shelf-life-filter-expire-in"]},i=document.getElementById("search-sku"),c=function(e,t){return n(void 0,void 0,void 0,(function(){var r,n,a,u,i,c,s,l;return o(this,(function(o){switch(o.label){case 0:r=1,n=location.origin+location.pathname,a=1,o.label=1;case 1:return a<=r?(u=["api?page=".concat(a),e.toString()].join("&"),[4,fetch("".concat(n).concat(u))]):[3,5];case 2:return i=o.sent(),l=(s=JSON).parse,[4,i.json()];case 3:c=l.apply(s,[o.sent()]),t(c),r=c.pagination.pages,o.label=4;case 4:return a++,[3,1];case 5:return[2]}}))}))},s={events:function(e){return n(void 0,void 0,void 0,(function(){var t;return o(this,(function(r){switch(r.label){case 0:return t=["SKU,Name,Quantity,Group,User,Store,Date delivered,Date picked up,Order №"],[4,c(e,(function(e){e.reports.forEach((function(e){i.value&&!e.cart.product.SKU.includes(i.value)||t.push([e.cart.product.SKU,e.cart.product.name,e.cart.quantity,e.cart.group.name,e.user.username,e.shipRequest.store.storeName,e.shipRequest.dateDelivered,e.shipRequest.datePickedUp,e.shipRequest.orderNumb].join(","))}))}))];case 1:return r.sent(),[2,t]}}))}))},inbound_order:function(e){return n(void 0,void 0,void 0,(function(){var t;return o(this,(function(r){switch(r.label){case 0:return t=["Name,SKU,Quantity,Group,Created At,Supplier,Arrived,Warehouse"],[4,c(e,(function(r){var n=e.get("product_group");r.reports.forEach((function(e){e.inboundOrder.productsAllocated.forEach((function(r){r.productQuantityGroups.forEach((function(o){i.value&&!r.product.SKU.includes(i.value)||n&&!o.group.name.includes(n)||t.push([r.product.name,r.product.SKU,o.quantity,o.group.name,(0,a.formatDate)(e.createdAt),e.inboundOrder.supplier.name,e.inboundOrder.finishedDate,e.inboundOrder.warehouse.name].join(","))})),r.productQuantityGroups.length||t.push([(0,a.formatDate)(e.createdAt),e.user.username,e.type,e.inboundOrder.title,r.product.name,r.product.SKU].join(","))}))}))}))];case 1:return r.sent(),[2,t]}}))}))},shipping:function(e){return n(void 0,void 0,void 0,(function(){var t;return o(this,(function(r){switch(r.label){case 0:return t=["SKU,Name,Quantity,Group,User,Store,Date delivered,Date picked up,Warehouse,Order №"],[4,c(e,(function(e){e.reports.forEach((function(e){e.carts.forEach((function(r){var n,o;i.value&&!r.product.SKU.includes(i.value)||t.push([r.product.SKU,r.product.name,r.quantity,r.group.name,(null===(n=e.user)||void 0===n?void 0:n.username)||"-",e.store.storeName,e.dateDelivered,e.datePickedUp,(null===(o=r.warehouse)||void 0===o?void 0:o.name)||"-",e.orderNumb].join(","))}))}))}))];case 1:return r.sent(),[2,t]}}))}))},shelf_life:function(e){return n(void 0,void 0,void 0,(function(){var t;return o(this,(function(r){switch(r.label){case 0:return t=["Numb Of Day Left, SKU, Name, Qty, Expire Date"],[4,c(e,(function(e){e.reportShelfLifeList.forEach((function(e){t.push([e.numbOfDayLeft,e.SKU,e.name,e.qty,e.expiry_date].join(","))}))}))];case 1:return r.sent(),[2,t]}}))}))}},l=["request-share-type","shipping-type","user-select","filter-start-date","filter-start-date-to","filter-end-date","filter-end-date-to","master-group","target-group","target-sub-group","filter-group-brand","filter-group-language","filter-group-premises","filter-group-categories","filter-group-events","filter-product-group","group-from","group-to","division-select","shelf-life-filter-expire-in"];document.addEventListener("DOMContentLoaded",(function(){var e=document.getElementById("report-type-select"),t=l.map((function(e){return document.getElementById(e)})),r=document.getElementById("table-report-loader"),a=document.getElementById("filter-clear-button"),i=document.getElementById("search-query"),c=document.getElementById("search-sku"),d=document.getElementById("button-csv-download");function p(){var e=l.map((function(e){return document.getElementById(e)}));console.log("allInputs",e),e.forEach((function(e){e&&e.querySelectorAll("input, select").forEach((function(e){e.value=""}))})),i.value="",c.value="",r.click()}for(var f=0,g=Object.entries(u);f<g.length;f++){var v=g[f],m=v[0],h=v[1];u[m]=h.map((function(e){return document.getElementById(e)}))}e.addEventListener("change",(function(e){p();var r=e.target;t.forEach((function(e){return e.classList.add("hidden")})),u[r.value].forEach((function(e){return e.classList.remove("hidden")}))})),r.click(),a.addEventListener("click",p);var b=document.getElementById("report-target-group-select"),y=document.getElementById("report-group-id-hidden");b.addEventListener("change",(function(e){var t=b.querySelector('option[value="'.concat(b.value,'"]'));t&&(y.value=t.getAttribute("data-target-group-id"),y.click())})),d.addEventListener("click",(function(){return n(void 0,void 0,void 0,(function(){var r,n,a,u,c;return o(this,(function(o){switch(o.label){case 0:return r=new URLSearchParams,t.forEach((function(e){var t=e.querySelector("input, select");"group_id"===t.getAttribute("name")&&b?r.append("target_group",b.value):r.append(t.getAttribute("name"),t.value)})),r.append("q",i.value),r.append("report_type",e.value),[4,s[e.value](r)];case 1:return n=o.sent(),a=new Blob([n.join("\n")],{type:"text/csv"}),u=window.URL.createObjectURL(a),(c=document.createElement("a")).setAttribute("href",u),c.setAttribute("download","report.csv"),c.click(),c.remove(),[2]}}))}))}))}))},593:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.formatDate=void 0,t.formatDate=function(e){if(!e)return"None";var t=new Date(e),r=t.getFullYear(),n=String(t.getMonth()+1).padStart(2,"0"),o=String(t.getDate()).padStart(2,"0"),a=String(t.getHours()).padStart(2,"0"),u=String(t.getMinutes()).padStart(2,"0");return"".concat(n,"/").concat(o,"/").concat(r," ").concat(a,":").concat(u)}}},t={};!function r(n){var o=t[n];if(void 0!==o)return o.exports;var a=t[n]={exports:{}};return e[n].call(a.exports,a,a.exports,r),a.exports}(125)})();