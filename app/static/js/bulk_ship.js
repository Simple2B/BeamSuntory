({83:function(){var e=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function l(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,l)}c((r=r.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var n,r,o,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]},a=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return a.next=l(0),a.throw=l(1),a.return=l(2),"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function l(l){return function(c){return function(l){if(n)throw new TypeError("Generator is already executing.");for(;a&&(a=0,l[0]&&(i=0)),i;)try{if(n=1,r&&(o=2&l[0]?r.return:l[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,l[1])).done)return o;switch(r=0,o&&(l=[2&l[0],o.value]),l[0]){case 0:case 1:o=l;break;case 4:return i.label++,{value:l[1],done:!1};case 5:i.label++,r=l[1],l=[0];continue;case 7:l=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==l[0]&&2!==l[0])){i=0;continue}if(3===l[0]&&(!o||l[1]>o[0]&&l[1]<o[3])){i.label=l[1];break}if(6===l[0]&&i.label<o[1]){i.label=o[1],o=l;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(l);break}o[2]&&i.ops.pop(),i.trys.pop();continue}l=t.call(e,i)}catch(e){l=[6,e],r=0}finally{n=o=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([l,c])}}};function n(n){return e(this,void 0,void 0,(function(){var e,r,o,i,a,l,c,u;return t(this,(function(t){switch(t.label){case 0:return e=n.target,r=e.innerHTML,e.innerHTML='<svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">\n            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>\n            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>\n            </svg> \n '+r,e.disabled=!0,o="/bulk-ship/download-template",(i=e.getAttribute("bulk-ship-uuid"))&&(o="/bulk-ship/".concat(i,"/download-template")),[4,fetch(o)];case 1:return(a=t.sent()).ok?[4,a.blob()]:[3,3];case 2:return l=t.sent(),c=window.URL.createObjectURL(l),(u=document.createElement("a")).href=c,u.download="bulk_ship_template.xlsx",document.body.appendChild(u),u.click(),window.URL.revokeObjectURL(c),[3,4];case 3:location.reload(),t.label=4;case 4:return e.innerHTML=r,e.disabled=!1,[2]}}))}))}function r(n){return e(this,void 0,void 0,(function(){var e,r,o,i;return t(this,(function(t){switch(t.label){case 0:return e=n.target,(r=e.getAttribute("bulk-ship-uuid"))&&confirm("Are you sure you want to delete this bulk ship?")?(o="/bulk-ship/".concat(r,"/delete"),[4,fetch(o,{method:"DELETE"})]):[2];case 1:return i=t.sent(),[204,404].includes(i.status)&&location.reload(),[2]}}))}))}window.addEventListener("DOMContentLoaded",(function(){document.querySelectorAll(".download-bulk-ship-template").forEach((function(e){e.addEventListener("click",n)})),document.querySelectorAll(".delete-bulk-ship-btn").forEach((function(e){e.addEventListener("click",r)}))}))}})[83]();