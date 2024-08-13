(()=>{"use strict";var e={125:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(u,o){function a(e){try{c(n.next(e))}catch(e){o(e)}}function i(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?u(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,i)}c((n=n.apply(e,t||[])).next())}))},u=this&&this.__generator||function(e,t){var r,n,u,o,a={label:0,sent:function(){if(1&u[0])throw u[1];return u[1]},trys:[],ops:[]};return o={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function i(i){return function(c){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;o&&(o=0,i[0]&&(a=0)),a;)try{if(r=1,n&&(u=2&i[0]?n.return:i[0]?n.throw||((u=n.return)&&u.call(n),0):n.next)&&!(u=u.call(n,i[1])).done)return u;switch(n=0,u&&(i=[2&i[0],u.value]),i[0]){case 0:case 1:u=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((u=(u=a.trys).length>0&&u[u.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!u||i[1]>u[0]&&i[1]<u[3])){a.label=i[1];break}if(6===i[0]&&a.label<u[1]){a.label=u[1],u=i;break}if(u&&a.label<u[2]){a.label=u[2],a.ops.push(i);break}u[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],n=0}finally{r=u=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}};Object.defineProperty(t,"__esModule",{value:!0});var o=r(593),a={events:["user-select","filter-start-date","filter-start-date-to","filter-end-date","filter-end-date-to"],request_share:["user-select","filter-start-date","filter-end-date"],inventories:["user-select","filter-start-date","filter-end-date","master-group","target-group","target-sub-group","filter-group-brand","filter-group-language","filter-group-premises","filter-group-categories","filter-group-events"],adjustment:["user-select","filter-start-date","filter-end-date","master-group","target-group","target-sub-group","filter-group-brand","filter-group-language","filter-group-premises","filter-group-categories","filter-group-events"],assign:["user-select","group-from","group-to","filter-start-date","filter-end-date","filter-group-brand","filter-group-language","filter-group-premises","filter-group-categories"],inbound_order:["filter-start-date","filter-end-date","filter-group-brand","filter-group-premises","filter-group-categories","filter-product-group"],shipping:["division-select","target-group","target-sub-group","filter-start-date","filter-end-date","filter-group-brand","filter-group-language","filter-group-categories","filter-group-premises"],shelf_life:["filter-start-date","filter-end-date","master-group","target-group","target-sub-group","filter-group-brand","filter-group-language","filter-group-premises","filter-group-categories","shelf-life-filter-expire-in"]},i=document.getElementById("search-sku"),c=function(e,t){return n(void 0,void 0,void 0,(function(){var r,n,o,a,i,c,s,d;return u(this,(function(u){switch(u.label){case 0:r=1,n=location.origin+location.pathname,o=1,u.label=1;case 1:return o<=r?(a=["api?page=".concat(o),e.toString()].join("&"),[4,fetch("".concat(n).concat(a))]):[3,5];case 2:return i=u.sent(),d=(s=JSON).parse,[4,i.json()];case 3:c=d.apply(s,[u.sent()]),t(c),r=c.pagination.pages,u.label=4;case 4:return o++,[3,1];case 5:return[2]}}))}))},s={events:function(e){return n(void 0,void 0,void 0,(function(){var t;return u(this,(function(r){switch(r.label){case 0:return t=["SKU,Name,Quantity,Group,User,Store,Date delivered,Date picked up,Order №"],[4,c(e,(function(e){e.reports.forEach((function(e){i.value&&!e.cart.product.SKU.includes(i.value)||t.push([e.cart.product.SKU,e.cart.product.name,e.cart.quantity,e.cart.group.name,e.user.username,e.shipRequest.store.storeName,e.shipRequest.dateDelivered,e.shipRequest.datePickedUp,e.shipRequest.orderNumb].join(","))}))}))];case 1:return r.sent(),[2,t]}}))}))},request_share:function(e){return n(void 0,void 0,void 0,(function(){var t;return u(this,(function(r){switch(r.label){case 0:return t=["Name,SKU,Quantity,From,To,Status,Created At,Approved At,User Approved,Declined At, User Declined"],[4,c(e,(function(e){e.reports.forEach((function(e){var r,n,u,o;i.value&&!e.requestShare.product.SKU.includes(i.value)||t.push([e.requestShare.product.name,e.requestShare.product.SKU,e.requestShare.desireQuantity,e.requestShare.fromGroup.name,e.requestShare.group.name,e.requestShare.status,e.createdAt,(null===(r=e.requestShare.reports.find((function(e){return"shared"===e.type})))||void 0===r?void 0:r.createdAtFormated)||"-",(null===(n=e.requestShare.reports.find((function(e){return"shared"===e.type})))||void 0===n?void 0:n.username)||"-",(null===(u=e.requestShare.reports.find((function(e){return"declined"===e.type})))||void 0===u?void 0:u.createdAtFormated)||"-",(null===(o=e.requestShare.reports.find((function(e){return"declined"===e.type})))||void 0===o?void 0:o.username)||"-"].join(","))}))}))];case 1:return r.sent(),[2,t]}}))}))},inventories:function(e){return n(void 0,void 0,void 0,(function(){var t;return u(this,(function(r){switch(r.label){case 0:return t=["product_name,sku,quantity,group,warehouse"],[4,c(e,(function(e){e.reports.forEach((function(e){e.warehouseProducts.forEach((function(r){t.push([e.name,e.SKU,r.productQuantity,r.groupName,r.warehouseName].join(","))}))}))}))];case 1:return r.sent(),[2,t]}}))}))},adjustment:function(e){return n(void 0,void 0,void 0,(function(){var t;return u(this,(function(r){switch(r.label){case 0:return t=["created_at,product_name,sku,username,master_group,group,warehouse,quantity_before,quantity_after,quantity_delta,note"],[4,c(e,(function(e){e.reports.forEach((function(e){e.adjustGroupQty.forEach((function(r){i.value&&!e.product.SKU.includes(i.value)||t.push([(0,o.formatDate)(e.createdAt),e.product.name,e.product.SKU,e.user.username,r.group.masterGroup.name,r.group.name,r.warehouse.name,r.quantityBefore,r.quantityAfter,r.delta,e.note].join(","))}))}))}))];case 1:return r.sent(),[2,t]}}))}))},assign:function(e){return n(void 0,void 0,void 0,(function(){var t;return u(this,(function(r){switch(r.label){case 0:return t=["created_at,username,type,from_group,to_group,sku,product_name,quantity"],[4,c(e,(function(e){e.reports.forEach((function(e){i.value&&!e.product.SKU.includes(i.value)||t.push([(0,o.formatDate)(e.createdAt),e.user.username,e.type,e.fromGroup.name,e.group.name,e.product.SKU,e.product.name,e.quantity].join(","))}))}))];case 1:return r.sent(),[2,t]}}))}))},inbound_order:function(e){return n(void 0,void 0,void 0,(function(){var t;return u(this,(function(r){switch(r.label){case 0:return t=["Name,SKU,Quantity,Group,Created At,Supplier,Arrived,Warehouse"],[4,c(e,(function(r){var n=e.get("product_group");r.reports.forEach((function(e){e.inboundOrder.productsAllocated.forEach((function(r){r.productQuantityGroups.forEach((function(u){i.value&&!r.product.SKU.includes(i.value)||n&&!u.group.name.includes(n)||t.push([r.product.name,r.product.SKU,u.quantity,u.group.name,(0,o.formatDate)(e.createdAt),e.inboundOrder.supplier.name,e.inboundOrder.finishedDate,e.inboundOrder.warehouse.name].join(","))})),r.productQuantityGroups.length||t.push([(0,o.formatDate)(e.createdAt),e.user.username,e.type,e.inboundOrder.title,r.product.name,r.product.SKU].join(","))}))}))}))];case 1:return r.sent(),[2,t]}}))}))},shipping:function(e){return n(void 0,void 0,void 0,(function(){var t;return u(this,(function(r){switch(r.label){case 0:return t=["SKU,Name,Quantity,Group,User,Store,Date delivered,Date picked up,Warehouse,Order №"],[4,c(e,(function(e){e.reports.forEach((function(e){e.carts.forEach((function(r){var n,u;i.value&&!r.product.SKU.includes(i.value)||t.push([r.product.SKU,r.product.name,r.quantity,r.group.name,(null===(n=e.user)||void 0===n?void 0:n.username)||"-",e.store.storeName,e.dateDelivered,e.datePickedUp,(null===(u=r.warehouse)||void 0===u?void 0:u.name)||"-",e.orderNumb].join(","))}))}))}))];case 1:return r.sent(),[2,t]}}))}))},shelf_life:function(e){return n(void 0,void 0,void 0,(function(){var t;return u(this,(function(r){switch(r.label){case 0:return t=["Numb Of Day Left, SKU, Name, Qty, Expire Date"],[4,c(e,(function(e){e.reportShelfLifeList.forEach((function(e){t.push([e.numbOfDayLeft,e.SKU,e.name,e.qty,e.expiry_date].join(","))}))}))];case 1:return r.sent(),[2,t]}}))}))}},d=["request-share-type","shipping-type","user-select","filter-start-date","filter-start-date-to","filter-end-date","filter-end-date-to","master-group","target-group","sub-group-select-container","filter-group-brand","filter-group-language","filter-group-premises","filter-group-categories","filter-group-events","filter-product-group","group-from","group-to","division-select","shelf-life-filter-expire-in"];document.addEventListener("DOMContentLoaded",(function(){var e=document.getElementById("report-type-select"),t=d.map((function(e){return document.getElementById(e)})),r=document.getElementById("table-report-loader"),o=document.getElementById("filter-clear-button"),i=document.getElementById("search-query"),c=document.getElementById("search-sku"),l=document.getElementById("button-csv-download");function p(){var e=d.map((function(e){return document.getElementById(e)}));console.log("allInputs",e),e.forEach((function(e){e&&e.querySelectorAll("input, select").forEach((function(e){e.value=""}))})),i.value="",c.value="",r.click()}for(var f=0,g=Object.entries(a);f<g.length;f++){var v=g[f],h=v[0],m=v[1];a[h]=m.map((function(e){return document.getElementById(e)}))}e.addEventListener("change",(function(e){p();var r=e.target;t.forEach((function(e){return e.classList.add("hidden")})),a[r.value].forEach((function(e){return e.classList.remove("hidden")}))})),r.click(),o.addEventListener("click",p);var y=document.getElementById("report-target-group-select"),b=document.getElementById("report-group-id-hidden");y.addEventListener("change",(function(e){var t=y.querySelector('option[value="'.concat(y.value,'"]'));t&&(b.value=t.getAttribute("data-target-group-id"),b.click())})),l.addEventListener("click",(function(){return n(void 0,void 0,void 0,(function(){var r,n,o,a,c;return u(this,(function(u){switch(u.label){case 0:return r=new URLSearchParams,t.forEach((function(e){var t=e.querySelector("input, select");"group_id"===t.getAttribute("name")&&y?r.append("target_group",y.value):r.append(t.getAttribute("name"),t.value)})),r.append("q",i.value),r.append("report_type",e.value),[4,s[e.value](r)];case 1:return n=u.sent(),o=new Blob([n.join("\n")],{type:"text/csv"}),a=window.URL.createObjectURL(o),(c=document.createElement("a")).setAttribute("href",a),c.setAttribute("download","report.csv"),c.click(),c.remove(),[2]}}))}))}))}))},593:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.formatDate=void 0,t.formatDate=function(e){if(!e)return"None";var t=new Date(e),r=t.getFullYear(),n=String(t.getMonth()+1).padStart(2,"0"),u=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),a=String(t.getMinutes()).padStart(2,"0");return"".concat(n,"/").concat(u,"/").concat(r," ").concat(o,":").concat(a)}}},t={};!function r(n){var u=t[n];if(void 0!==u)return u.exports;var o=t[n]={exports:{}};return e[n].call(o.exports,o,o.exports,r),o.exports}(125)})();