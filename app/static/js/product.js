/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@easepick/bundle/dist/index.esm.js":
/*!*********************************************************!*\
  !*** ./node_modules/@easepick/bundle/dist/index.esm.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AmpPlugin": () => (/* binding */ d),
/* harmony export */   "DateTime": () => (/* binding */ t),
/* harmony export */   "KbdPlugin": () => (/* binding */ h),
/* harmony export */   "LockPlugin": () => (/* binding */ a),
/* harmony export */   "PresetPlugin": () => (/* binding */ r),
/* harmony export */   "RangePlugin": () => (/* binding */ c),
/* harmony export */   "TimePlugin": () => (/* binding */ l),
/* harmony export */   "create": () => (/* binding */ n),
/* harmony export */   "easepick": () => (/* binding */ s)
/* harmony export */ });
class t extends Date{static parseDateTime(e,i="YYYY-MM-DD",n="en-US"){if(!e)return new Date((new Date).setHours(0,0,0,0));if(e instanceof t)return e.toJSDate();if(e instanceof Date)return e;if(/^-?\d{10,}$/.test(String(e)))return new Date(Number(e));if("string"==typeof e){const s=[];let o=null;for(;null!=(o=t.regex.exec(i));)"\\"!==o[1]&&s.push(o);if(s.length){const i={year:null,month:null,shortMonth:null,longMonth:null,day:null,hour:0,minute:0,second:0,ampm:null,value:""};s[0].index>0&&(i.value+=".*?");for(const[e,o]of Object.entries(s)){const s=Number(e),{group:a,pattern:r}=t.formatPatterns(o[0],n);i[a]=s+1,i.value+=r,i.value+=".*?"}const o=new RegExp(`^${i.value}$`);if(o.test(e)){const s=o.exec(e),a=Number(s[i.year]);let r=null;i.month?r=Number(s[i.month])-1:i.shortMonth?r=t.shortMonths(n).indexOf(s[i.shortMonth]):i.longMonth&&(r=t.longMonths(n).indexOf(s[i.longMonth]));const c=Number(s[i.day])||1,l=Number(s[i.hour]);let h=Number.isNaN(l)?0:l;const d=Number(s[i.minute]),p=Number.isNaN(d)?0:d,u=Number(s[i.second]),g=Number.isNaN(u)?0:u,m=s[i.ampm];return m&&"PM"===m&&(h+=12,24===h&&(h=0)),new Date(a,r,c,h,p,g,0)}}}return new Date((new Date).setHours(0,0,0,0))}static regex=/(\\)?(Y{2,4}|M{1,4}|D{1,2}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|A|a)/g;static MONTH_JS=[0,1,2,3,4,5,6,7,8,9,10,11];static shortMonths(e){return t.MONTH_JS.map((t=>new Date(2019,t).toLocaleString(e,{month:"short"})))}static longMonths(e){return t.MONTH_JS.map((t=>new Date(2019,t).toLocaleString(e,{month:"long"})))}static formatPatterns(e,i){switch(e){case"YY":case"YYYY":return{group:"year",pattern:`(\\d{${e.length}})`};case"M":return{group:"month",pattern:"(\\d{1,2})"};case"MM":return{group:"month",pattern:"(\\d{2})"};case"MMM":return{group:"shortMonth",pattern:`(${t.shortMonths(i).join("|")})`};case"MMMM":return{group:"longMonth",pattern:`(${t.longMonths(i).join("|")})`};case"D":return{group:"day",pattern:"(\\d{1,2})"};case"DD":return{group:"day",pattern:"(\\d{2})"};case"h":case"H":return{group:"hour",pattern:"(\\d{1,2})"};case"hh":case"HH":return{group:"hour",pattern:"(\\d{2})"};case"m":return{group:"minute",pattern:"(\\d{1,2})"};case"mm":return{group:"minute",pattern:"(\\d{2})"};case"s":return{group:"second",pattern:"(\\d{1,2})"};case"ss":return{group:"second",pattern:"(\\d{2})"};case"a":case"A":return{group:"ampm",pattern:"(AM|PM|am|pm)"}}}lang;constructor(e=null,i="YYYY-MM-DD",n="en-US"){super(t.parseDateTime(e,i,n)),this.lang=n}getWeek(t){const e=new Date(this.midnight_ts(this)),i=(this.getDay()+(7-t))%7;e.setDate(e.getDate()-i);const n=e.getTime();return e.setMonth(0,1),e.getDay()!==t&&e.setMonth(0,1+(4-e.getDay()+7)%7),1+Math.ceil((n-e.getTime())/6048e5)}clone(){return new t(this)}toJSDate(){return new Date(this)}inArray(t,e="[]"){return t.some((t=>t instanceof Array?this.isBetween(t[0],t[1],e):this.isSame(t,"day")))}isBetween(t,e,i="()"){switch(i){default:case"()":return this.midnight_ts(this)>this.midnight_ts(t)&&this.midnight_ts(this)<this.midnight_ts(e);case"[)":return this.midnight_ts(this)>=this.midnight_ts(t)&&this.midnight_ts(this)<this.midnight_ts(e);case"(]":return this.midnight_ts(this)>this.midnight_ts(t)&&this.midnight_ts(this)<=this.midnight_ts(e);case"[]":return this.midnight_ts()>=this.midnight_ts(t)&&this.midnight_ts()<=this.midnight_ts(e)}}isBefore(t,e="days"){switch(e){case"day":case"days":return new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime()>new Date(this.getFullYear(),this.getMonth(),this.getDate()).getTime();case"month":case"months":return new Date(t.getFullYear(),t.getMonth(),1).getTime()>new Date(this.getFullYear(),this.getMonth(),1).getTime();case"year":case"years":return t.getFullYear()>this.getFullYear()}throw new Error("isBefore: Invalid unit!")}isSameOrBefore(t,e="days"){switch(e){case"day":case"days":return new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime()>=new Date(this.getFullYear(),this.getMonth(),this.getDate()).getTime();case"month":case"months":return new Date(t.getFullYear(),t.getMonth(),1).getTime()>=new Date(this.getFullYear(),this.getMonth(),1).getTime()}throw new Error("isSameOrBefore: Invalid unit!")}isAfter(t,e="days"){switch(e){case"day":case"days":return new Date(this.getFullYear(),this.getMonth(),this.getDate()).getTime()>new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime();case"month":case"months":return new Date(this.getFullYear(),this.getMonth(),1).getTime()>new Date(t.getFullYear(),t.getMonth(),1).getTime();case"year":case"years":return this.getFullYear()>t.getFullYear()}throw new Error("isAfter: Invalid unit!")}isSameOrAfter(t,e="days"){switch(e){case"day":case"days":return new Date(this.getFullYear(),this.getMonth(),this.getDate()).getTime()>=new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime();case"month":case"months":return new Date(this.getFullYear(),this.getMonth(),1).getTime()>=new Date(t.getFullYear(),t.getMonth(),1).getTime()}throw new Error("isSameOrAfter: Invalid unit!")}isSame(t,e="days"){switch(e){case"day":case"days":return new Date(this.getFullYear(),this.getMonth(),this.getDate()).getTime()===new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime();case"month":case"months":return new Date(this.getFullYear(),this.getMonth(),1).getTime()===new Date(t.getFullYear(),t.getMonth(),1).getTime()}throw new Error("isSame: Invalid unit!")}add(t,e="days"){switch(e){case"day":case"days":this.setDate(this.getDate()+t);break;case"month":case"months":this.setMonth(this.getMonth()+t)}return this}subtract(t,e="days"){switch(e){case"day":case"days":this.setDate(this.getDate()-t);break;case"month":case"months":this.setMonth(this.getMonth()-t)}return this}diff(t,e="days"){switch(e){default:case"day":case"days":return Math.round((this.midnight_ts()-this.midnight_ts(t))/864e5);case"month":case"months":let e=12*(t.getFullYear()-this.getFullYear());return e-=t.getMonth(),e+=this.getMonth(),e}}format(e,i="en-US"){let n="";const s=[];let o=null;for(;null!=(o=t.regex.exec(e));)"\\"!==o[1]&&s.push(o);if(s.length){s[0].index>0&&(n+=e.substring(0,s[0].index));for(const[t,o]of Object.entries(s)){const a=Number(t);n+=this.formatTokens(o[0],i),s[a+1]&&(n+=e.substring(o.index+o[0].length,s[a+1].index)),a===s.length-1&&(n+=e.substring(o.index+o[0].length))}}return n.replace(/\\/g,"")}midnight_ts(t){return t?new Date(t.getFullYear(),t.getMonth(),t.getDate(),0,0,0,0).getTime():new Date(this.getFullYear(),this.getMonth(),this.getDate(),0,0,0,0).getTime()}formatTokens(e,i){switch(e){case"YY":return String(this.getFullYear()).slice(-2);case"YYYY":return String(this.getFullYear());case"M":return String(this.getMonth()+1);case"MM":return`0${this.getMonth()+1}`.slice(-2);case"MMM":return t.shortMonths(i)[this.getMonth()];case"MMMM":return t.longMonths(i)[this.getMonth()];case"D":return String(this.getDate());case"DD":return`0${this.getDate()}`.slice(-2);case"H":return String(this.getHours());case"HH":return`0${this.getHours()}`.slice(-2);case"h":return String(this.getHours()%12||12);case"hh":return`0${this.getHours()%12||12}`.slice(-2);case"m":return String(this.getMinutes());case"mm":return`0${this.getMinutes()}`.slice(-2);case"s":return String(this.getSeconds());case"ss":return`0${this.getSeconds()}`.slice(-2);case"a":return this.getHours()<12||24===this.getHours()?"am":"pm";case"A":return this.getHours()<12||24===this.getHours()?"AM":"PM";default:return""}}}class e{picker;constructor(t){this.picker=t}render(e,i){e||(e=new t),e.setDate(1),e.setHours(0,0,0,0),"function"==typeof this[`get${i}View`]&&this[`get${i}View`](e)}getContainerView(t){this.picker.ui.container.innerHTML="",this.picker.options.header&&this.picker.trigger("render",{date:t.clone(),view:"Header"}),this.picker.trigger("render",{date:t.clone(),view:"Main"}),this.picker.options.autoApply||this.picker.trigger("render",{date:t.clone(),view:"Footer"})}getHeaderView(t){const e=document.createElement("header");this.picker.options.header instanceof HTMLElement&&e.appendChild(this.picker.options.header),"string"==typeof this.picker.options.header&&(e.innerHTML=this.picker.options.header),this.picker.ui.container.appendChild(e),this.picker.trigger("view",{target:e,date:t.clone(),view:"Header"})}getMainView(t){const e=document.createElement("main");this.picker.ui.container.appendChild(e);const i=document.createElement("div");i.className=`calendars grid-${this.picker.options.grid}`;for(let e=0;e<this.picker.options.calendars;e++){const n=document.createElement("div");n.className="calendar",i.appendChild(n);const s=this.getCalendarHeaderView(t.clone());n.appendChild(s),this.picker.trigger("view",{date:t.clone(),view:"CalendarHeader",index:e,target:s});const o=this.getCalendarDayNamesView();n.appendChild(o),this.picker.trigger("view",{date:t.clone(),view:"CalendarDayNames",index:e,target:o});const a=this.getCalendarDaysView(t.clone());n.appendChild(a),this.picker.trigger("view",{date:t.clone(),view:"CalendarDays",index:e,target:a});const r=this.getCalendarFooterView(this.picker.options.lang,t.clone());n.appendChild(r),this.picker.trigger("view",{date:t.clone(),view:"CalendarFooter",index:e,target:r}),this.picker.trigger("view",{date:t.clone(),view:"CalendarItem",index:e,target:n}),t.add(1,"month")}e.appendChild(i),this.picker.trigger("view",{date:t.clone(),view:"Calendars",target:i}),this.picker.trigger("view",{date:t.clone(),view:"Main",target:e})}getFooterView(t){const e=document.createElement("footer"),i=document.createElement("div");i.className="footer-buttons";const n=document.createElement("button");n.className="cancel-button unit",n.innerHTML=this.picker.options.locale.cancel,i.appendChild(n);const s=document.createElement("button");s.className="apply-button unit",s.innerHTML=this.picker.options.locale.apply,s.disabled=!0,i.appendChild(s),e.appendChild(i),this.picker.ui.container.appendChild(e),this.picker.trigger("view",{date:t,target:e,view:"Footer"})}getCalendarHeaderView(t){const e=document.createElement("div");e.className="header";const i=document.createElement("div");i.className="month-name",i.innerHTML=`<span>${t.toLocaleString(this.picker.options.lang,{month:"long"})}</span> ${t.format("YYYY")}`,e.appendChild(i);const n=document.createElement("button");n.className="previous-button unit",n.innerHTML=this.picker.options.locale.previousMonth,e.appendChild(n);const s=document.createElement("button");return s.className="next-button unit",s.innerHTML=this.picker.options.locale.nextMonth,e.appendChild(s),e}getCalendarDayNamesView(){const t=document.createElement("div");t.className="daynames-row";for(let e=1;e<=7;e++){const i=3+this.picker.options.firstDay+e,n=document.createElement("div");n.className="dayname",n.innerHTML=new Date(1970,0,i,12,0,0,0).toLocaleString(this.picker.options.lang,{weekday:"short"}),n.title=new Date(1970,0,i,12,0,0,0).toLocaleString(this.picker.options.lang,{weekday:"long"}),t.appendChild(n),this.picker.trigger("view",{dayIdx:i,view:"CalendarDayName",target:n})}return t}getCalendarDaysView(t){const e=document.createElement("div");e.className="days-grid";const i=this.calcOffsetDays(t,this.picker.options.firstDay),n=32-new Date(t.getFullYear(),t.getMonth(),32).getDate();for(let t=0;t<i;t++){const t=document.createElement("div");t.className="offset",e.appendChild(t)}for(let i=1;i<=n;i++){t.setDate(i);const n=this.getCalendarDayView(t);e.appendChild(n),this.picker.trigger("view",{date:t,view:"CalendarDay",target:n})}return e}getCalendarDayView(e){const i=this.picker.options.date?new t(this.picker.options.date):null,n=new t,s=document.createElement("div");return s.className="day unit",s.innerHTML=e.format("D"),s.dataset.time=String(e.getTime()),e.isSame(n,"day")&&s.classList.add("today"),[0,6].includes(e.getDay())&&s.classList.add("weekend"),this.picker.datePicked.length?this.picker.datePicked[0].isSame(e,"day")&&s.classList.add("selected"):i&&e.isSame(i,"day")&&s.classList.add("selected"),this.picker.trigger("view",{date:e,view:"CalendarDay",target:s}),s}getCalendarFooterView(t,e){const i=document.createElement("div");return i.className="footer",i}calcOffsetDays(t,e){let i=t.getDay()-e;return i<0&&(i+=7),i}}class i{picker;instances={};constructor(t){this.picker=t}initialize(){const t=[];this.picker.options.plugins.forEach((e=>{"function"==typeof e?t.push(new e):"string"==typeof e&&"undefined"!=typeof easepick&&Object.prototype.hasOwnProperty.call(easepick,e)?t.push(new easepick[e]):console.warn(`easepick: ${e} not found.`)})),t.sort(((t,e)=>t.priority>e.priority?-1:t.priority<e.priority||t.dependencies.length>e.dependencies.length?1:t.dependencies.length<e.dependencies.length?-1:0)),t.forEach((t=>{t.attach(this.picker),this.instances[t.getName()]=t}))}getInstance(t){return this.instances[t]}addInstance(t){if(Object.prototype.hasOwnProperty.call(this.instances,t))console.warn(`easepick: ${t} already added.`);else{if("undefined"!=typeof easepick&&Object.prototype.hasOwnProperty.call(easepick,t)){const e=new easepick[t];return e.attach(this.picker),this.instances[e.getName()]=e,e}if("undefined"!==this.getPluginFn(t)){const e=new(this.getPluginFn(t));return e.attach(this.picker),this.instances[e.getName()]=e,e}console.warn(`easepick: ${t} not found.`)}return null}removeInstance(t){return t in this.instances&&this.instances[t].detach(),delete this.instances[t]}reloadInstance(t){return this.removeInstance(t),this.addInstance(t)}getPluginFn(t){return[...this.picker.options.plugins].filter((e=>"function"==typeof e&&(new e).getName()===t)).shift()}}class n{Calendar=new e(this);PluginManager=new i(this);calendars=[];datePicked=[];cssLoaded=0;binds={hidePicker:this.hidePicker.bind(this),show:this.show.bind(this)};options={doc:document,css:[],element:null,firstDay:1,grid:1,calendars:1,lang:"en-US",date:null,format:"YYYY-MM-DD",readonly:!0,autoApply:!0,header:!1,inline:!1,scrollToDate:!0,locale:{nextMonth:'<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2.748 16L0 13.333 5.333 8 0 2.667 2.748 0l7.919 8z" fill-rule="nonzero"/></svg>',previousMonth:'<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M7.919 0l2.748 2.667L5.333 8l5.334 5.333L7.919 16 0 8z" fill-rule="nonzero"/></svg>',cancel:"Cancel",apply:"Apply"},documentClick:this.binds.hidePicker,plugins:[]};ui={container:null,shadowRoot:null,wrapper:null};version="1.2.1";constructor(t){const e={...this.options.locale,...t.locale};this.options={...this.options,...t},this.options.locale=e,this.handleOptions(),this.ui.wrapper=document.createElement("span"),this.ui.wrapper.style.display="none",this.ui.wrapper.style.position="absolute",this.ui.wrapper.style.pointerEvents="none",this.ui.wrapper.className="easepick-wrapper",this.ui.wrapper.attachShadow({mode:"open"}),this.ui.shadowRoot=this.ui.wrapper.shadowRoot,this.ui.container=document.createElement("div"),this.ui.container.className="container",this.options.zIndex&&(this.ui.container.style.zIndex=String(this.options.zIndex)),this.options.inline&&(this.ui.wrapper.style.position="relative",this.ui.container.classList.add("inline")),this.ui.shadowRoot.appendChild(this.ui.container),this.options.element.after(this.ui.wrapper),this.handleCSS(),this.options.element.addEventListener("click",this.binds.show),this.on("view",this.onView.bind(this)),this.on("render",this.onRender.bind(this)),this.PluginManager.initialize(),this.parseValues(),"function"==typeof this.options.setup&&this.options.setup(this),this.on("click",this.onClick.bind(this));const i=this.options.scrollToDate?this.getDate():null;this.renderAll(i)}on(t,e,i={}){this.ui.container.addEventListener(t,e,i)}off(t,e,i={}){this.ui.container.removeEventListener(t,e,i)}trigger(t,e={}){return this.ui.container.dispatchEvent(new CustomEvent(t,{detail:e}))}destroy(){this.options.element.removeEventListener("click",this.binds.show),"function"==typeof this.options.documentClick&&document.removeEventListener("click",this.options.documentClick,!0),Object.keys(this.PluginManager.instances).forEach((t=>{this.PluginManager.removeInstance(t)})),this.ui.wrapper.remove()}onRender(t){const{view:e,date:i}=t.detail;this.Calendar.render(i,e)}onView(t){const{view:e,target:i}=t.detail;"Footer"===e&&this.datePicked.length&&(i.querySelector(".apply-button").disabled=!1)}onClickHeaderButton(t){this.isCalendarHeaderButton(t)&&(t.classList.contains("next-button")?this.calendars[0].add(1,"month"):this.calendars[0].subtract(1,"month"),this.renderAll(this.calendars[0]))}onClickCalendarDay(e){if(this.isCalendarDay(e)){const i=new t(e.dataset.time);this.options.autoApply?(this.setDate(i),this.trigger("select",{date:this.getDate()}),this.hide()):(this.datePicked[0]=i,this.trigger("preselect",{date:this.getDate()}),this.renderAll())}}onClickApplyButton(t){if(this.isApplyButton(t)){if(this.datePicked[0]instanceof Date){const t=this.datePicked[0].clone();this.setDate(t)}this.hide(),this.trigger("select",{date:this.getDate()})}}onClickCancelButton(t){this.isCancelButton(t)&&this.hide()}onClick(t){const e=t.target;if(e instanceof HTMLElement){const t=e.closest(".unit");if(!(t instanceof HTMLElement))return;this.onClickHeaderButton(t),this.onClickCalendarDay(t),this.onClickApplyButton(t),this.onClickCancelButton(t)}}isShown(){return this.ui.container.classList.contains("inline")||this.ui.container.classList.contains("show")}show(t){if(this.isShown())return;const e=t&&"target"in t?t.target:this.options.element,{top:i,left:n}=this.adjustPosition(e);this.ui.container.style.top=`${i}px`,this.ui.container.style.left=`${n}px`,this.ui.container.classList.add("show"),this.trigger("show",{target:e})}hide(){this.ui.container.classList.remove("show"),this.datePicked.length=0,this.renderAll(),this.trigger("hide")}setDate(e){const i=new t(e,this.options.format);this.options.date=i.clone(),this.updateValues(),this.calendars.length&&this.renderAll()}getDate(){return this.options.date instanceof t?this.options.date.clone():null}parseValues(){this.options.date?this.setDate(this.options.date):this.options.element instanceof HTMLInputElement&&this.options.element.value.length&&this.setDate(this.options.element.value),this.options.date instanceof Date||(this.options.date=null)}updateValues(){const t=this.getDate(),e=t instanceof Date?t.format(this.options.format,this.options.lang):"",i=this.options.element;i instanceof HTMLInputElement?i.value=e:i instanceof HTMLElement&&(i.innerText=e)}hidePicker(t){let e=t.target,i=null;e.shadowRoot&&(e=t.composedPath()[0],i=e.getRootNode().host),this.isShown()&&i!==this.ui.wrapper&&e!==this.options.element&&this.hide()}renderAll(t){this.trigger("render",{view:"Container",date:(t||this.calendars[0]).clone()})}isCalendarHeaderButton(t){return["previous-button","next-button"].some((e=>t.classList.contains(e)))}isCalendarDay(t){return t.classList.contains("day")}isApplyButton(t){return t.classList.contains("apply-button")}isCancelButton(t){return t.classList.contains("cancel-button")}gotoDate(e){const i=new t(e,this.options.format);i.setDate(1),this.calendars[0]=i.clone(),this.renderAll()}clear(){this.options.date=null,this.datePicked.length=0,this.updateValues(),this.renderAll(),this.trigger("clear")}handleOptions(){this.options.element instanceof HTMLElement||(this.options.element=this.options.doc.querySelector(this.options.element)),"function"==typeof this.options.documentClick&&document.addEventListener("click",this.options.documentClick,!0),this.options.element instanceof HTMLInputElement&&(this.options.element.readOnly=this.options.readonly),this.options.date?this.calendars[0]=new t(this.options.date,this.options.format):this.calendars[0]=new t}handleCSS(){if(Array.isArray(this.options.css))this.options.css.forEach((t=>{const e=document.createElement("link");e.href=t,e.rel="stylesheet";const i=()=>{this.cssLoaded++,this.cssLoaded===this.options.css.length&&(this.ui.wrapper.style.display="")};e.addEventListener("load",i),e.addEventListener("error",i),this.ui.shadowRoot.append(e)}));else if("string"==typeof this.options.css){const t=document.createElement("style"),e=document.createTextNode(this.options.css);t.appendChild(e),this.ui.shadowRoot.append(t),this.ui.wrapper.style.display=""}else"function"==typeof this.options.css&&(this.options.css.call(this,this),this.ui.wrapper.style.display="")}adjustPosition(t){const e=t.getBoundingClientRect(),i=this.ui.wrapper.getBoundingClientRect();this.ui.container.classList.add("calc");const n=this.ui.container.getBoundingClientRect();this.ui.container.classList.remove("calc");let s=e.bottom-i.bottom,o=e.left-i.left;return"undefined"!=typeof window&&(window.innerHeight<s+n.height&&s-n.height>=0&&(s=e.top-i.top-n.height),window.innerWidth<o+n.width&&e.right-n.width>=0&&(o=e.right-i.right-n.width)),{left:o,top:s}}}var s=Object.freeze({__proto__:null,Core:n,create:n});class o{picker;options;priority=0;dependencies=[];attach(t){const e=this.getName(),i={...this.options};this.options={...this.options,...t.options[e]||{}};for(const n of Object.keys(i))if(null!==i[n]&&"object"==typeof i[n]&&Object.keys(i[n]).length&&e in t.options&&n in t.options[e]){const s={...t.options[e][n]};null!==s&&"object"==typeof s&&Object.keys(s).length&&Object.keys(s).every((t=>Object.keys(i[n]).includes(t)))&&(this.options[n]={...i[n],...s})}if(this.picker=t,this.dependenciesNotFound()){const t=this.dependencies.filter((t=>!this.pluginsAsStringArray().includes(t)));return void console.warn(`${this.getName()}: required dependencies (${t.join(", ")}).`)}const n=this.camelCaseToKebab(this.getName());this.picker.ui.container.classList.add(n),this.onAttach()}detach(){const t=this.camelCaseToKebab(this.getName());this.picker.ui.container.classList.remove(t),"function"==typeof this.onDetach&&this.onDetach()}dependenciesNotFound(){return this.dependencies.length&&!this.dependencies.every((t=>this.pluginsAsStringArray().includes(t)))}pluginsAsStringArray(){return this.picker.options.plugins.map((t=>"function"==typeof t?(new t).getName():t))}camelCaseToKebab(t){return t.replace(/([a-zA-Z])(?=[A-Z])/g,"$1-").toLowerCase()}}class a extends o{priority=1;binds={onView:this.onView.bind(this)};options={minDate:null,maxDate:null,minDays:null,maxDays:null,selectForward:null,selectBackward:null,presets:!0,inseparable:!1,filter:null};getName(){return"LockPlugin"}onAttach(){if(this.options.minDate&&(this.options.minDate=new t(this.options.minDate,this.picker.options.format,this.picker.options.lang)),this.options.maxDate&&(this.options.maxDate=new t(this.options.maxDate,this.picker.options.format,this.picker.options.lang),this.options.maxDate instanceof t&&this.picker.options.calendars>1&&this.picker.calendars[0].isSame(this.options.maxDate,"month"))){const t=this.picker.calendars[0].clone().subtract(1,"month");this.picker.gotoDate(t)}if((this.options.minDays||this.options.maxDays||this.options.selectForward||this.options.selectBackward)&&!this.picker.options.plugins.includes("RangePlugin")){const t=["minDays","maxDays","selectForward","selectBackward"];console.warn(`${this.getName()}: options ${t.join(", ")} required RangePlugin.`)}this.picker.on("view",this.binds.onView)}onDetach(){this.picker.off("view",this.binds.onView)}onView(e){const{view:i,target:n,date:s}=e.detail;if("CalendarHeader"===i&&(this.options.minDate instanceof t&&s.isSameOrBefore(this.options.minDate,"month")&&n.classList.add("no-previous-month"),this.options.maxDate instanceof t&&s.isSameOrAfter(this.options.maxDate,"month")&&n.classList.add("no-next-month")),"CalendarDay"===i){const t=this.picker.datePicked.length?this.picker.datePicked[0]:null;if(this.testFilter(s))return void n.classList.add("locked");if(this.options.inseparable){if(this.options.minDays){const t=s.clone().subtract(this.options.minDays-1,"day"),e=s.clone().add(this.options.minDays-1,"day");let i=!1,o=!1;for(;t.isBefore(s,"day");){if(this.testFilter(t)){i=!0;break}t.add(1,"day")}for(;e.isAfter(s,"day");){if(this.testFilter(e)){o=!0;break}e.subtract(1,"day")}i&&o&&n.classList.add("not-available")}this.rangeIsNotAvailable(s,t)&&n.classList.add("not-available")}this.dateIsNotAvailable(s,t)&&n.classList.add("not-available")}if(this.options.presets&&"PresetPluginButton"===i){const e=new t(Number(n.dataset.start)),i=new t(Number(n.dataset.end)),s=i.diff(e,"day"),o=this.options.minDays&&s<this.options.minDays,a=this.options.maxDays&&s>this.options.maxDays;(o||a||this.lockMinDate(e)||this.lockMaxDate(e)||this.lockMinDate(i)||this.lockMaxDate(i)||this.rangeIsNotAvailable(e,i))&&n.setAttribute("disabled","disabled")}}dateIsNotAvailable(t,e){return this.lockMinDate(t)||this.lockMaxDate(t)||this.lockMinDays(t,e)||this.lockMaxDays(t,e)||this.lockSelectForward(t)||this.lockSelectBackward(t)}rangeIsNotAvailable(t,e){if(!t||!e)return!1;const i=(t.isSameOrBefore(e,"day")?t:e).clone(),n=(e.isSameOrAfter(t,"day")?e:t).clone();for(;i.isSameOrBefore(n,"day");){if(this.testFilter(i))return!0;i.add(1,"day")}return!1}lockMinDate(e){return this.options.minDate instanceof t&&e.isBefore(this.options.minDate,"day")}lockMaxDate(e){return this.options.maxDate instanceof t&&e.isAfter(this.options.maxDate,"day")}lockMinDays(t,e){if(this.options.minDays&&e){const i=e.clone().subtract(this.options.minDays-1,"day"),n=e.clone().add(this.options.minDays-1,"day");return t.isBetween(i,n)}return!1}lockMaxDays(t,e){if(this.options.maxDays&&e){const i=e.clone().subtract(this.options.maxDays,"day"),n=e.clone().add(this.options.maxDays,"day");return!t.isBetween(i,n)}return!1}lockSelectForward(t){if(1===this.picker.datePicked.length&&this.options.selectForward){const e=this.picker.datePicked[0].clone();return t.isBefore(e,"day")}return!1}lockSelectBackward(t){if(1===this.picker.datePicked.length&&this.options.selectBackward){const e=this.picker.datePicked[0].clone();return t.isAfter(e,"day")}return!1}testFilter(t){return"function"==typeof this.options.filter&&this.options.filter(t,this.picker.datePicked)}}class r extends o{dependencies=["RangePlugin"];binds={onView:this.onView.bind(this),onClick:this.onClick.bind(this)};options={customLabels:["Today","Yesterday","Last 7 Days","Last 30 Days","This Month","Last Month"],customPreset:{},position:"left"};getName(){return"PresetPlugin"}onAttach(){if(!Object.keys(this.options.customPreset).length){const e=new t,i=()=>{const i=e.clone();i.setDate(1);const n=new Date(e.getFullYear(),e.getMonth()+1,0);return[new t(i),new t(n)]},n=()=>{const i=e.clone();i.setMonth(i.getMonth()-1),i.setDate(1);const n=new Date(e.getFullYear(),e.getMonth(),0);return[new t(i),new t(n)]},s=[[e.clone(),e.clone()],[e.clone().subtract(1,"day"),e.clone().subtract(1,"day")],[e.clone().subtract(6,"day"),e.clone()],[e.clone().subtract(29,"day"),e.clone()],i(),n()];Object.values(this.options.customLabels).forEach(((t,e)=>{this.options.customPreset[t]=s[e]}))}this.picker.on("view",this.binds.onView),this.picker.on("click",this.binds.onClick)}onDetach(){this.picker.off("view",this.binds.onView),this.picker.off("click",this.binds.onClick)}onView(t){const{view:e,target:i}=t.detail;if("Main"===e){const t=document.createElement("div");t.className="preset-plugin-container",Object.keys(this.options.customPreset).forEach((e=>{if(Object.prototype.hasOwnProperty.call(this.options.customPreset,e)){const i=this.options.customPreset[e],n=document.createElement("button");n.className="preset-button unit",n.innerHTML=e,n.dataset.start=i[0].getTime(),n.dataset.end=i[1].getTime(),t.appendChild(n),this.picker.trigger("view",{view:"PresetPluginButton",target:n})}})),i.appendChild(t),i.classList.add(`preset-${this.options.position}`),this.picker.trigger("view",{view:"PresetPluginContainer",target:t})}}onClick(e){const i=e.target;if(i instanceof HTMLElement){const e=i.closest(".unit");if(!(e instanceof HTMLElement))return;if(this.isPresetButton(e)){const i=new t(Number(e.dataset.start)),n=new t(Number(e.dataset.end));this.picker.options.autoApply?(this.picker.setDateRange(i,n),this.picker.trigger("select",{start:this.picker.getStartDate(),end:this.picker.getEndDate()}),this.picker.hide()):(this.picker.datePicked=[i,n],this.picker.renderAll())}}}isPresetButton(t){return t.classList.contains("preset-button")}}class c extends o{tooltipElement;triggerElement;binds={setStartDate:this.setStartDate.bind(this),setEndDate:this.setEndDate.bind(this),setDateRange:this.setDateRange.bind(this),getStartDate:this.getStartDate.bind(this),getEndDate:this.getEndDate.bind(this),onView:this.onView.bind(this),onShow:this.onShow.bind(this),onMouseEnter:this.onMouseEnter.bind(this),onMouseLeave:this.onMouseLeave.bind(this),onClickCalendarDay:this.onClickCalendarDay.bind(this),onClickApplyButton:this.onClickApplyButton.bind(this),parseValues:this.parseValues.bind(this),updateValues:this.updateValues.bind(this),clear:this.clear.bind(this)};options={elementEnd:null,startDate:null,endDate:null,repick:!1,strict:!0,delimiter:" - ",tooltip:!0,tooltipNumber:t=>t,locale:{zero:"",one:"day",two:"",few:"",many:"",other:"days"},documentClick:this.hidePicker.bind(this)};getName(){return"RangePlugin"}onAttach(){this.binds._setStartDate=this.picker.setStartDate,this.binds._setEndDate=this.picker.setEndDate,this.binds._setDateRange=this.picker.setDateRange,this.binds._getStartDate=this.picker.getStartDate,this.binds._getEndDate=this.picker.getEndDate,this.binds._parseValues=this.picker.parseValues,this.binds._updateValues=this.picker.updateValues,this.binds._clear=this.picker.clear,this.binds._onClickCalendarDay=this.picker.onClickCalendarDay,this.binds._onClickApplyButton=this.picker.onClickApplyButton,Object.defineProperties(this.picker,{setStartDate:{configurable:!0,value:this.binds.setStartDate},setEndDate:{configurable:!0,value:this.binds.setEndDate},setDateRange:{configurable:!0,value:this.binds.setDateRange},getStartDate:{configurable:!0,value:this.binds.getStartDate},getEndDate:{configurable:!0,value:this.binds.getEndDate},parseValues:{configurable:!0,value:this.binds.parseValues},updateValues:{configurable:!0,value:this.binds.updateValues},clear:{configurable:!0,value:this.binds.clear},onClickCalendarDay:{configurable:!0,value:this.binds.onClickCalendarDay},onClickApplyButton:{configurable:!0,value:this.binds.onClickApplyButton}}),this.options.elementEnd&&(this.options.elementEnd instanceof HTMLElement||(this.options.elementEnd=this.picker.options.doc.querySelector(this.options.elementEnd)),this.options.elementEnd instanceof HTMLInputElement&&(this.options.elementEnd.readOnly=this.picker.options.readonly),"function"==typeof this.picker.options.documentClick&&(document.removeEventListener("click",this.picker.options.documentClick,!0),"function"==typeof this.options.documentClick&&document.addEventListener("click",this.options.documentClick,!0)),this.options.elementEnd.addEventListener("click",this.picker.show.bind(this.picker))),this.options.repick=this.options.repick&&this.options.elementEnd instanceof HTMLElement,this.picker.options.date=null,this.picker.on("view",this.binds.onView),this.picker.on("show",this.binds.onShow),this.picker.on("mouseenter",this.binds.onMouseEnter,!0),this.picker.on("mouseleave",this.binds.onMouseLeave,!0),this.checkIntlPluralLocales()}onDetach(){Object.defineProperties(this.picker,{setStartDate:{configurable:!0,value:this.binds._setStartDate},setEndDate:{configurable:!0,value:this.binds._setEndDate},setDateRange:{configurable:!0,value:this.binds._setDateRange},getStartDate:{configurable:!0,value:this.binds._getStartDate},getEndDate:{configurable:!0,value:this.binds._getEndDate},parseValues:{configurable:!0,value:this.binds._parseValues},updateValues:{configurable:!0,value:this.binds._updateValues},clear:{configurable:!0,value:this.binds._clear},onClickCalendarDay:{configurable:!0,value:this.binds._onClickCalendarDay},onClickApplyButton:{configurable:!0,value:this.binds._onClickApplyButton}}),this.picker.off("view",this.binds.onView),this.picker.off("show",this.binds.onShow),this.picker.off("mouseenter",this.binds.onMouseEnter,!0),this.picker.off("mouseleave",this.binds.onMouseLeave,!0)}parseValues(){if(this.options.startDate||this.options.endDate)this.options.strict?this.options.startDate&&this.options.endDate?this.setDateRange(this.options.startDate,this.options.endDate):(this.options.startDate=null,this.options.endDate=null):(this.options.startDate&&this.setStartDate(this.options.startDate),this.options.endDate&&this.setEndDate(this.options.endDate));else if(this.options.elementEnd)this.options.strict?this.picker.options.element instanceof HTMLInputElement&&this.picker.options.element.value.length&&this.options.elementEnd instanceof HTMLInputElement&&this.options.elementEnd.value.length&&this.setDateRange(this.picker.options.element.value,this.options.elementEnd.value):(this.picker.options.element instanceof HTMLInputElement&&this.picker.options.element.value.length&&this.setStartDate(this.picker.options.element.value),this.options.elementEnd instanceof HTMLInputElement&&this.options.elementEnd.value.length&&this.setEndDate(this.options.elementEnd.value));else if(this.picker.options.element instanceof HTMLInputElement&&this.picker.options.element.value.length){const[t,e]=this.picker.options.element.value.split(this.options.delimiter);this.options.strict?t&&e&&this.setDateRange(t,e):(t&&this.setStartDate(t),e&&this.setEndDate(e))}}updateValues(){const t=this.picker.options.element,e=this.options.elementEnd,i=this.picker.getStartDate(),n=this.picker.getEndDate(),s=i instanceof Date?i.format(this.picker.options.format,this.picker.options.lang):"",o=n instanceof Date?n.format(this.picker.options.format,this.picker.options.lang):"";if(e)t instanceof HTMLInputElement?t.value=s:t instanceof HTMLElement&&(t.innerText=s),e instanceof HTMLInputElement?e.value=o:e instanceof HTMLElement&&(e.innerText=o);else{const e=`${s}${s||o?this.options.delimiter:""}${o}`;t instanceof HTMLInputElement?t.value=e:t instanceof HTMLElement&&(t.innerText=e)}}clear(){this.options.startDate=null,this.options.endDate=null,this.picker.datePicked.length=0,this.updateValues(),this.picker.renderAll(),this.picker.trigger("clear")}onShow(t){const{target:e}=t.detail;this.triggerElement=e,this.picker.options.scrollToDate&&this.getStartDate()instanceof Date&&this.picker.gotoDate(this.getStartDate()),this.initializeRepick()}onView(e){const{view:i,target:n}=e.detail;if("Main"===i&&(this.tooltipElement=document.createElement("span"),this.tooltipElement.className="range-plugin-tooltip",n.appendChild(this.tooltipElement)),"CalendarDay"===i){const e=new t(n.dataset.time),i=this.picker.datePicked,s=i.length?this.picker.datePicked[0]:this.getStartDate(),o=i.length?this.picker.datePicked[1]:this.getEndDate();s&&s.isSame(e,"day")&&n.classList.add("start"),s&&o&&(o.isSame(e,"day")&&n.classList.add("end"),e.isBetween(s,o)&&n.classList.add("in-range"))}if("Footer"===i){const t=1===this.picker.datePicked.length&&!this.options.strict||2===this.picker.datePicked.length;n.querySelector(".apply-button").disabled=!t}}hidePicker(t){let e=t.target,i=null;e.shadowRoot&&(e=t.composedPath()[0],i=e.getRootNode().host),this.picker.isShown()&&i!==this.picker.ui.wrapper&&e!==this.picker.options.element&&e!==this.options.elementEnd&&this.picker.hide()}setStartDate(e){const i=new t(e,this.picker.options.format);this.options.startDate=i?i.clone():null,this.updateValues(),this.picker.renderAll()}setEndDate(e){const i=new t(e,this.picker.options.format);this.options.endDate=i?i.clone():null,this.updateValues(),this.picker.renderAll()}setDateRange(e,i){const n=new t(e,this.picker.options.format),s=new t(i,this.picker.options.format);this.options.startDate=n?n.clone():null,this.options.endDate=s?s.clone():null,this.updateValues(),this.picker.renderAll()}getStartDate(){return this.options.startDate instanceof Date?this.options.startDate.clone():null}getEndDate(){return this.options.endDate instanceof Date?this.options.endDate.clone():null}onMouseEnter(e){const i=e.target;if(i instanceof HTMLElement){this.isContainer(i)&&this.initializeRepick();const e=i.closest(".unit");if(!(e instanceof HTMLElement))return;if(this.picker.isCalendarDay(e)){if(1!==this.picker.datePicked.length)return;let i=this.picker.datePicked[0].clone(),n=new t(e.dataset.time),s=!1;if(i.isAfter(n,"day")){const t=i.clone();i=n.clone(),n=t.clone(),s=!0}if([...this.picker.ui.container.querySelectorAll(".day")].forEach((o=>{const a=new t(o.dataset.time),r=this.picker.Calendar.getCalendarDayView(a);a.isBetween(i,n)&&r.classList.add("in-range"),a.isSame(this.picker.datePicked[0],"day")&&(r.classList.add("start"),r.classList.toggle("flipped",s)),o===e&&(r.classList.add("end"),r.classList.toggle("flipped",s)),o.className=r.className})),this.options.tooltip){const t=this.options.tooltipNumber(n.diff(i,"day")+1);if(t>0){const i=new Intl.PluralRules(this.picker.options.lang).select(t),n=`${t} ${this.options.locale[i]}`;this.showTooltip(e,n)}else this.hideTooltip()}}}}onMouseLeave(t){if(this.isContainer(t.target)&&this.options.repick){const t=this.getStartDate(),e=this.getEndDate();t&&e&&(this.picker.datePicked.length=0,this.picker.renderAll())}}onClickCalendarDay(e){if(this.picker.isCalendarDay(e)){2===this.picker.datePicked.length&&(this.picker.datePicked.length=0);const i=new t(e.dataset.time);if(this.picker.datePicked[this.picker.datePicked.length]=i,2===this.picker.datePicked.length&&this.picker.datePicked[0].isAfter(this.picker.datePicked[1])){const t=this.picker.datePicked[1].clone();this.picker.datePicked[1]=this.picker.datePicked[0].clone(),this.picker.datePicked[0]=t.clone()}1!==this.picker.datePicked.length&&this.picker.options.autoApply||this.picker.trigger("preselect",{start:this.picker.datePicked[0]instanceof Date?this.picker.datePicked[0].clone():null,end:this.picker.datePicked[1]instanceof Date?this.picker.datePicked[1].clone():null}),1===this.picker.datePicked.length&&(!this.options.strict&&this.picker.options.autoApply&&(this.picker.options.element===this.triggerElement&&this.setStartDate(this.picker.datePicked[0]),this.options.elementEnd===this.triggerElement&&this.setEndDate(this.picker.datePicked[0]),this.picker.trigger("select",{start:this.picker.getStartDate(),end:this.picker.getEndDate()})),this.picker.renderAll()),2===this.picker.datePicked.length&&(this.picker.options.autoApply?(this.setDateRange(this.picker.datePicked[0],this.picker.datePicked[1]),this.picker.trigger("select",{start:this.picker.getStartDate(),end:this.picker.getEndDate()}),this.picker.hide()):(this.hideTooltip(),this.picker.renderAll()))}}onClickApplyButton(t){this.picker.isApplyButton(t)&&(1!==this.picker.datePicked.length||this.options.strict||(this.picker.options.element===this.triggerElement&&(this.options.endDate=null,this.setStartDate(this.picker.datePicked[0])),this.options.elementEnd===this.triggerElement&&(this.options.startDate=null,this.setEndDate(this.picker.datePicked[0]))),2===this.picker.datePicked.length&&this.setDateRange(this.picker.datePicked[0],this.picker.datePicked[1]),this.picker.trigger("select",{start:this.picker.getStartDate(),end:this.picker.getEndDate()}),this.picker.hide())}showTooltip(t,e){this.tooltipElement.style.visibility="visible",this.tooltipElement.innerHTML=e;const i=this.picker.ui.container.getBoundingClientRect(),n=this.tooltipElement.getBoundingClientRect(),s=t.getBoundingClientRect();let o=s.top,a=s.left;o-=i.top,a-=i.left,o-=n.height,a-=n.width/2,a+=s.width/2,this.tooltipElement.style.top=`${o}px`,this.tooltipElement.style.left=`${a}px`}hideTooltip(){this.tooltipElement.style.visibility="hidden"}checkIntlPluralLocales(){if(!this.options.tooltip)return;const t=[...new Set([new Intl.PluralRules(this.picker.options.lang).select(0),new Intl.PluralRules(this.picker.options.lang).select(1),new Intl.PluralRules(this.picker.options.lang).select(2),new Intl.PluralRules(this.picker.options.lang).select(6),new Intl.PluralRules(this.picker.options.lang).select(18)])],e=Object.keys(this.options.locale);t.every((t=>e.includes(t)))||console.warn(`${this.getName()}: provide locales (${t.join(", ")}) for correct tooltip text.`)}initializeRepick(){if(!this.options.repick)return;const t=this.getStartDate(),e=this.getEndDate();e&&this.triggerElement===this.picker.options.element&&(this.picker.datePicked[0]=e),t&&this.triggerElement===this.options.elementEnd&&(this.picker.datePicked[0]=t)}isContainer(t){return t===this.picker.ui.container}}class l extends o{options={native:!1,seconds:!1,stepHours:1,stepMinutes:5,stepSeconds:5,format12:!1};rangePlugin;timePicked={input:null,start:null,end:null};timePrePicked={input:null,start:null,end:null};binds={getDate:this.getDate.bind(this),getStartDate:this.getStartDate.bind(this),getEndDate:this.getEndDate.bind(this),onView:this.onView.bind(this),onInput:this.onInput.bind(this),onChange:this.onChange.bind(this),onClick:this.onClick.bind(this),setTime:this.setTime.bind(this),setStartTime:this.setStartTime.bind(this),setEndTime:this.setEndTime.bind(this)};getName(){return"TimePlugin"}onAttach(){this.binds._getDate=this.picker.getDate,this.binds._getStartDate=this.picker.getStartDate,this.binds._getEndDate=this.picker.getEndDate,Object.defineProperties(this.picker,{getDate:{configurable:!0,value:this.binds.getDate},getStartDate:{configurable:!0,value:this.binds.getStartDate},getEndDate:{configurable:!0,value:this.binds.getEndDate},setTime:{configurable:!0,value:this.binds.setTime},setStartTime:{configurable:!0,value:this.binds.setStartTime},setEndTime:{configurable:!0,value:this.binds.setEndTime}}),this.rangePlugin=this.picker.PluginManager.getInstance("RangePlugin"),this.parseValues(),this.picker.on("view",this.binds.onView),this.picker.on("input",this.binds.onInput),this.picker.on("change",this.binds.onChange),this.picker.on("click",this.binds.onClick)}onDetach(){delete this.picker.setTime,delete this.picker.setStartTime,delete this.picker.setEndTime,Object.defineProperties(this.picker,{getDate:{configurable:!0,value:this.binds._getDate},getStartDate:{configurable:!0,value:this.binds._getStartDate},getEndDate:{configurable:!0,value:this.binds._getEndDate}}),this.picker.off("view",this.binds.onView),this.picker.off("input",this.binds.onInput),this.picker.off("change",this.binds.onChange),this.picker.off("click",this.binds.onClick)}onView(t){const{view:e,target:i}=t.detail;if("Main"===e){this.rangePlugin=this.picker.PluginManager.getInstance("RangePlugin");const t=document.createElement("div");if(t.className="time-plugin-container",this.rangePlugin){const e=this.getStartInput();t.appendChild(e),this.picker.trigger("view",{view:"TimePluginInput",target:e});const i=this.getEndInput();t.appendChild(i),this.picker.trigger("view",{view:"TimePluginInput",target:i})}else{const e=this.getSingleInput();t.appendChild(e),this.picker.trigger("view",{view:"TimePluginInput",target:e})}i.appendChild(t),this.picker.trigger("view",{view:"TimePluginContainer",target:t})}}onInput(e){const i=e.target;if(i instanceof HTMLInputElement&&i.classList.contains("time-plugin-input")){const e=this.timePicked[i.name]||new t,[n,s]=i.value.split(":");e.setHours(Number(n)||0,Number(s)||0,0,0),this.picker.options.autoApply?(this.timePicked[i.name]=e,this.picker.updateValues()):this.timePrePicked[i.name]=e}}onChange(e){const i=e.target;if(i instanceof HTMLSelectElement&&i.classList.contains("time-plugin-custom-input")){const e=/(\w+)\[(\w+)\]/,[,n,s]=i.name.match(e),o=Number(i.value);let a=new t;switch(!this.picker.options.autoApply&&this.timePrePicked[n]instanceof Date?a=this.timePrePicked[n].clone():this.timePicked[n]instanceof Date&&(a=this.timePicked[n].clone()),s){case"HH":if(this.options.format12){const t=i.closest(".time-plugin-custom-block").querySelector(`select[name="${n}[period]"]`).value,e=this.handleFormat12(t,a,o);a.setHours(e.getHours(),e.getMinutes(),e.getSeconds(),0)}else a.setHours(o,a.getMinutes(),a.getSeconds(),0);break;case"mm":a.setHours(a.getHours(),o,a.getSeconds(),0);break;case"ss":a.setHours(a.getHours(),a.getMinutes(),o,0);break;case"period":if(this.options.format12){const t=i.closest(".time-plugin-custom-block").querySelector(`select[name="${n}[HH]"]`).value,e=this.handleFormat12(i.value,a,Number(t));a.setHours(e.getHours(),e.getMinutes(),e.getSeconds(),0)}}if(this.picker.options.autoApply)this.timePicked[n]=a,this.picker.updateValues();else{this.timePrePicked[n]=a;const t=this.picker.ui.container.querySelector(".apply-button");if(this.rangePlugin){const e=this.rangePlugin.options,i=this.picker.datePicked,n=e.strict&&2===i.length||!e.strict&&i.length>0||!i.length&&e.strict&&e.startDate instanceof Date&&e.endDate instanceof Date||!i.length&&!e.strict&&(e.startDate instanceof Date||e.endDate instanceof Date);t.disabled=!n}else this.picker.datePicked.length&&(t.disabled=!1)}}}onClick(t){const e=t.target;if(e instanceof HTMLElement){const t=e.closest(".unit");if(!(t instanceof HTMLElement))return;this.picker.isApplyButton(t)&&(Object.keys(this.timePicked).forEach((t=>{this.timePrePicked[t]instanceof Date&&(this.timePicked[t]=this.timePrePicked[t].clone())})),this.picker.updateValues(),this.timePrePicked={input:null,start:null,end:null}),this.picker.isCancelButton(t)&&(this.timePrePicked={input:null,start:null,end:null},this.picker.renderAll())}}setTime(t){const e=this.handleTimeString(t);this.timePicked.input=e.clone(),this.picker.renderAll(),this.picker.updateValues()}setStartTime(t){const e=this.handleTimeString(t);this.timePicked.start=e.clone(),this.picker.renderAll(),this.picker.updateValues()}setEndTime(t){const e=this.handleTimeString(t);this.timePicked.end=e.clone(),this.picker.renderAll(),this.picker.updateValues()}handleTimeString(e){const i=new t,[n,s,o]=e.split(":").map((t=>Number(t))),a=n&&!Number.isNaN(n)?n:0,r=s&&!Number.isNaN(s)?s:0,c=o&&!Number.isNaN(o)?o:0;return i.setHours(a,r,c,0),i}getDate(){if(this.picker.options.date instanceof Date){const e=new t(this.picker.options.date,this.picker.options.format);if(this.timePicked.input instanceof Date){const t=this.timePicked.input;e.setHours(t.getHours(),t.getMinutes(),t.getSeconds(),0)}return e}return null}getStartDate(){if(this.rangePlugin.options.startDate instanceof Date){const e=new t(this.rangePlugin.options.startDate,this.picker.options.format);if(this.timePicked.start instanceof Date){const t=this.timePicked.start;e.setHours(t.getHours(),t.getMinutes(),t.getSeconds(),0)}return e}return null}getEndDate(){if(this.rangePlugin.options.endDate instanceof Date){const e=new t(this.rangePlugin.options.endDate,this.picker.options.format);if(this.timePicked.end instanceof Date){const t=this.timePicked.end;e.setHours(t.getHours(),t.getMinutes(),t.getSeconds(),0)}return e}return null}getSingleInput(){return this.options.native?this.getNativeInput("input"):this.getCustomInput("input")}getStartInput(){return this.options.native?this.getNativeInput("start"):this.getCustomInput("start")}getEndInput(){return this.options.native?this.getNativeInput("end"):this.getCustomInput("end")}getNativeInput(t){const e=document.createElement("input");e.type="time",e.name=t,e.className="time-plugin-input unit";const i=this.timePicked[t];if(i){const t=`0${i.getHours()}`.slice(-2),n=`0${i.getMinutes()}`.slice(-2);e.value=`${t}:${n}`}return e}getCustomInput(t){const e=document.createElement("div");e.className="time-plugin-custom-block";const i=document.createElement("select");i.className="time-plugin-custom-input unit",i.name=`${t}[HH]`;const n=this.options.format12?1:0,s=this.options.format12?13:24;let o=null;!this.picker.options.autoApply&&this.timePrePicked[t]instanceof Date?o=this.timePrePicked[t].clone():this.timePicked[t]instanceof Date&&(o=this.timePicked[t].clone());for(let t=n;t<s;t+=this.options.stepHours){const e=document.createElement("option");e.value=String(t),e.text=String(t),o&&(this.options.format12?(o.getHours()%12?o.getHours()%12:12)===t&&(e.selected=!0):o.getHours()===t&&(e.selected=!0)),i.appendChild(e)}e.appendChild(i);const a=document.createElement("select");a.className="time-plugin-custom-input unit",a.name=`${t}[mm]`;for(let t=0;t<60;t+=this.options.stepMinutes){const e=document.createElement("option");e.value=`0${String(t)}`.slice(-2),e.text=`0${String(t)}`.slice(-2),o&&o.getMinutes()===t&&(e.selected=!0),a.appendChild(e)}if(e.appendChild(a),this.options.seconds){const i=document.createElement("select");i.className="time-plugin-custom-input unit",i.name=`${t}[ss]`;const n=60;for(let t=0;t<n;t+=this.options.stepSeconds){const e=document.createElement("option");e.value=`0${String(t)}`.slice(-2),e.text=`0${String(t)}`.slice(-2),o&&o.getSeconds()===t&&(e.selected=!0),i.appendChild(e)}e.appendChild(i)}if(this.options.format12){const i=document.createElement("select");i.className="time-plugin-custom-input unit",i.name=`${t}[period]`,["AM","PM"].forEach((t=>{const e=document.createElement("option");e.value=t,e.text=t,o&&"PM"===t&&o.getHours()>=12&&(e.selected=!0),i.appendChild(e)})),e.appendChild(i)}return e}handleFormat12(t,e,i){const n=e.clone();switch(t){case"AM":12===i?n.setHours(0,n.getMinutes(),n.getSeconds(),0):n.setHours(i,n.getMinutes(),n.getSeconds(),0);break;case"PM":12!==i?n.setHours(i+12,n.getMinutes(),n.getSeconds(),0):n.setHours(i,n.getMinutes(),n.getSeconds(),0)}return n}parseValues(){if(this.rangePlugin){if(this.rangePlugin.options.strict){if(this.rangePlugin.options.startDate&&this.rangePlugin.options.endDate){const e=new t(this.rangePlugin.options.startDate,this.picker.options.format),i=new t(this.rangePlugin.options.endDate,this.picker.options.format);this.timePicked.start=e.clone(),this.timePicked.end=i.clone()}}else{if(this.rangePlugin.options.startDate){const e=new t(this.rangePlugin.options.startDate,this.picker.options.format);this.timePicked.start=e.clone()}if(this.rangePlugin.options.endDate){const e=new t(this.rangePlugin.options.endDate,this.picker.options.format);this.timePicked.end=e.clone()}}if(this.rangePlugin.options.elementEnd)if(this.rangePlugin.options.strict){if(this.picker.options.element instanceof HTMLInputElement&&this.picker.options.element.value.length&&this.rangePlugin.options.elementEnd instanceof HTMLInputElement&&this.rangePlugin.options.elementEnd.value.length){const e=new t(this.picker.options.element.value,this.picker.options.format),i=new t(this.rangePlugin.options.elementEnd.value,this.picker.options.format);this.timePicked.start=e.clone(),this.timePicked.end=i.clone()}}else{if(this.picker.options.element instanceof HTMLInputElement&&this.picker.options.element.value.length){const e=new t(this.picker.options.element.value,this.picker.options.format);this.timePicked.start=e.clone()}if(this.rangePlugin.options.elementEnd instanceof HTMLInputElement&&this.rangePlugin.options.elementEnd.value.length){const e=new t(this.rangePlugin.options.elementEnd.value,this.picker.options.format);this.timePicked.start=e.clone()}}else if(this.picker.options.element instanceof HTMLInputElement&&this.picker.options.element.value.length){const[e,i]=this.picker.options.element.value.split(this.rangePlugin.options.delimiter);if(this.rangePlugin.options.strict){if(e&&i){const n=new t(e,this.picker.options.format),s=new t(i,this.picker.options.format);this.timePicked.start=n.clone(),this.timePicked.end=s.clone()}}else{if(e){const i=new t(e,this.picker.options.format);this.timePicked.start=i.clone()}if(i){const e=new t(i,this.picker.options.format);this.timePicked.start=e.clone()}}}}else{if(this.picker.options.date){const e=new t(this.picker.options.date,this.picker.options.format);this.timePicked.input=e.clone()}if(this.picker.options.element instanceof HTMLInputElement&&this.picker.options.element.value.length){const e=new t(this.picker.options.element.value,this.picker.options.format);this.timePicked.input=e.clone()}}}}class h extends o{docElement=null;rangePlugin;binds={onView:this.onView.bind(this),onKeydown:this.onKeydown.bind(this)};options={unitIndex:1,dayIndex:2};getName(){return"KbdPlugin"}onAttach(){const t=this.picker.options.element,e=t.getBoundingClientRect();if(this.docElement=document.createElement("span"),this.docElement.style.position="absolute",this.docElement.style.top=`${t.offsetTop}px`,this.docElement.style.left=t.offsetLeft+e.width-25+"px",this.docElement.attachShadow({mode:"open"}),this.options.html)this.docElement.shadowRoot.innerHTML=this.options.html;else{const t=`\n      <style>\n      button {\n        border: none;\n        background: transparent;\n        font-size: ${window.getComputedStyle(this.picker.options.element).fontSize};\n      }\n      </style>\n\n      <button>&#128197;</button>\n      `;this.docElement.shadowRoot.innerHTML=t}const i=this.docElement.shadowRoot.querySelector("button");i&&(i.addEventListener("click",(t=>{t.preventDefault(),this.picker.show({target:this.picker.options.element})}),{capture:!0}),i.addEventListener("keydown",(t=>{"Escape"===t.code&&this.picker.hide()}),{capture:!0})),this.picker.options.element.after(this.docElement),this.picker.on("view",this.binds.onView),this.picker.on("keydown",this.binds.onKeydown)}onDetach(){this.docElement&&this.docElement.isConnected&&this.docElement.remove(),this.picker.off("view",this.binds.onView),this.picker.off("keydown",this.binds.onKeydown)}onView(t){const{view:e,target:i}=t.detail;i&&"querySelector"in i&&("CalendarDay"!==e||["locked","not-available"].some((t=>i.classList.contains(t)))?[...i.querySelectorAll(".unit:not(.day)")].forEach((t=>t.tabIndex=this.options.unitIndex)):i.tabIndex=this.options.dayIndex)}onKeydown(t){switch(this.onMouseEnter(t),t.code){case"ArrowUp":case"ArrowDown":this.verticalMove(t);break;case"ArrowLeft":case"ArrowRight":this.horizontalMove(t);break;case"Enter":case"Space":this.handleEnter(t);break;case"Escape":this.picker.hide()}}findAllowableDaySibling(t,e,i){const n=Array.from(t.querySelectorAll(`.day[tabindex="${this.options.dayIndex}"]`)),s=n.indexOf(e);return n.filter(((t,e)=>i(e,s)&&t.tabIndex===this.options.dayIndex))[0]}changeMonth(t){const e={ArrowLeft:"previous",ArrowRight:"next"},i=this.picker.ui.container.querySelector(`.${e[t.code]}-button[tabindex="${this.options.unitIndex}"]`);i&&!i.parentElement.classList.contains(`no-${e[t.code]}-month`)&&(i.dispatchEvent(new Event("click",{bubbles:!0})),setTimeout((()=>{let e=null;switch(t.code){case"ArrowLeft":const t=this.picker.ui.container.querySelectorAll(`.day[tabindex="${this.options.dayIndex}"]`);e=t[t.length-1];break;case"ArrowRight":e=this.picker.ui.container.querySelector(`.day[tabindex="${this.options.dayIndex}"]`)}e&&e.focus()})))}verticalMove(t){const e=t.target;if(e.classList.contains("day")){t.preventDefault();const i=this.findAllowableDaySibling(this.picker.ui.container,e,((e,i)=>e===("ArrowUp"===t.code?i-7:i+7)));i&&i.focus()}}horizontalMove(t){const e=t.target;if(e.classList.contains("day")){t.preventDefault();const i=this.findAllowableDaySibling(this.picker.ui.container,e,((e,i)=>e===("ArrowLeft"===t.code?i-1:i+1)));i?i.focus():this.changeMonth(t)}}handleEnter(t){const e=t.target;e.classList.contains("day")&&(t.preventDefault(),e.dispatchEvent(new Event("click",{bubbles:!0})),setTimeout((()=>{if(this.rangePlugin=this.picker.PluginManager.getInstance("RangePlugin"),this.rangePlugin||!this.picker.options.autoApply){const t=this.picker.ui.container.querySelector(".day.selected");t&&setTimeout((()=>{t.focus()}))}})))}onMouseEnter(t){t.target.classList.contains("day")&&setTimeout((()=>{const t=this.picker.ui.shadowRoot.activeElement;t&&t.dispatchEvent(new Event("mouseenter",{bubbles:!0}))}))}}class d extends o{rangePlugin;lockPlugin;priority=10;binds={onView:this.onView.bind(this),onColorScheme:this.onColorScheme.bind(this)};options={dropdown:{months:!1,years:!1,minYear:1950,maxYear:null},darkMode:!0,locale:{resetButton:'<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>'}};matchMedia;getName(){return"AmpPlugin"}onAttach(){this.options.darkMode&&window&&"matchMedia"in window&&(this.matchMedia=window.matchMedia("(prefers-color-scheme: dark)"),this.matchMedia.matches&&(this.picker.ui.container.dataset.theme="dark"),this.matchMedia.addEventListener("change",this.binds.onColorScheme)),this.options.weekNumbers&&this.picker.ui.container.classList.add("week-numbers"),this.picker.on("view",this.binds.onView)}onDetach(){this.options.darkMode&&window&&"matchMedia"in window&&this.matchMedia.removeEventListener("change",this.binds.onColorScheme),this.picker.ui.container.removeAttribute("data-theme"),this.picker.ui.container.classList.remove("week-numbers"),this.picker.off("view",this.binds.onView)}onView(t){this.lockPlugin=this.picker.PluginManager.getInstance("LockPlugin"),this.rangePlugin=this.picker.PluginManager.getInstance("RangePlugin"),this.handleDropdown(t),this.handleResetButton(t),this.handleWeekNumbers(t)}onColorScheme(t){const e=t.matches?"dark":"light";this.picker.ui.container.dataset.theme=e}handleDropdown(e){const{view:i,target:n,date:s,index:o}=e.detail;if("CalendarHeader"===i){const e=n.querySelector(".month-name");if(this.options.dropdown.months){e.childNodes[0].remove();const i=document.createElement("select");i.className="month-name--select month-name--dropdown";for(let e=0;e<12;e+=1){const n=document.createElement("option"),o=new t(new Date(s.getFullYear(),e,2,0,0,0)),a=new t(new Date(s.getFullYear(),e,1,0,0,0));n.value=String(e),n.text=o.toLocaleString(this.picker.options.lang,{month:"long"}),this.lockPlugin&&(n.disabled=this.lockPlugin.options.minDate&&a.isBefore(new t(this.lockPlugin.options.minDate),"month")||this.lockPlugin.options.maxDate&&a.isAfter(new t(this.lockPlugin.options.maxDate),"month")),n.selected=a.getMonth()===s.getMonth(),i.appendChild(n)}i.addEventListener("change",(t=>{const e=t.target;this.picker.calendars[0].setDate(1),this.picker.calendars[0].setMonth(Number(e.value)),this.picker.renderAll()})),e.prepend(i)}if(this.options.dropdown.years){e.childNodes[1].remove();const i=document.createElement("select");i.className="month-name--select";const n=this.options.dropdown.minYear,o=this.options.dropdown.maxYear?this.options.dropdown.maxYear:(new Date).getFullYear();if(s.getFullYear()>o){const t=document.createElement("option");t.value=String(s.getFullYear()),t.text=String(s.getFullYear()),t.selected=!0,t.disabled=!0,i.appendChild(t)}for(let e=o;e>=n;e-=1){const n=document.createElement("option"),o=new t(new Date(e,0,1,0,0,0));n.value=String(e),n.text=String(e),this.lockPlugin&&(n.disabled=this.lockPlugin.options.minDate&&o.isBefore(new t(this.lockPlugin.options.minDate),"year")||this.lockPlugin.options.maxDate&&o.isAfter(new t(this.lockPlugin.options.maxDate),"year")),n.selected=s.getFullYear()===e,i.appendChild(n)}if(s.getFullYear()<n){const t=document.createElement("option");t.value=String(s.getFullYear()),t.text=String(s.getFullYear()),t.selected=!0,t.disabled=!0,i.appendChild(t)}if("asc"===this.options.dropdown.years){const t=Array.prototype.slice.call(i.childNodes).reverse();i.innerHTML="",t.forEach((t=>{t.innerHTML=t.value,i.appendChild(t)}))}i.addEventListener("change",(t=>{const e=t.target;this.picker.calendars[0].setFullYear(Number(e.value)),this.picker.renderAll()})),e.appendChild(i)}}}handleResetButton(t){const{view:e,target:i}=t.detail;if("CalendarHeader"===e&&this.options.resetButton){const t=document.createElement("button");t.className="reset-button unit",t.innerHTML=this.options.locale.resetButton,t.addEventListener("click",(t=>{t.preventDefault();let e=!0;"function"==typeof this.options.resetButton&&(e=this.options.resetButton.call(this)),e&&this.picker.clear()})),i.appendChild(t)}}handleWeekNumbers(e){if(this.options.weekNumbers){const{view:i,target:n}=e.detail;if("CalendarDayNames"===i){const t=document.createElement("div");t.className="wnum-header",t.innerHTML="Wk",n.prepend(t)}"CalendarDays"===i&&[...n.children].forEach(((e,i)=>{if(0===i||i%7==0){let i;if(e.classList.contains("day"))i=new t(e.dataset.time);else{const e=n.querySelector(".day");i=new t(e.dataset.time)}let s=i.getWeek(this.picker.options.firstDay);53===s&&0===i.getMonth()&&(s="53/1");const o=document.createElement("div");o.className="wnum-item",o.innerHTML=String(s),n.insertBefore(o,e)}}))}}}


/***/ }),

/***/ "./node_modules/@popperjs/core/lib/createPopper.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/createPopper.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPopper": () => (/* binding */ createPopper),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_13__["default"]),
/* harmony export */   "popperGenerator": () => (/* binding */ popperGenerator)
/* harmony export */ });
/* harmony import */ var _dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dom-utils/getCompositeRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom-utils/listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dom-utils/getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/orderModifiers.js */ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js");
/* harmony import */ var _utils_debounce_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/debounce.js */ "./node_modules/@popperjs/core/lib/utils/debounce.js");
/* harmony import */ var _utils_validateModifiers_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/validateModifiers.js */ "./node_modules/@popperjs/core/lib/utils/validateModifiers.js");
/* harmony import */ var _utils_uniqueBy_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/uniqueBy.js */ "./node_modules/@popperjs/core/lib/utils/uniqueBy.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/mergeByName.js */ "./node_modules/@popperjs/core/lib/utils/mergeByName.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./enums.js */ "./node_modules/@popperjs/core/lib/enums.js");














var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(setOptionsAction) {
        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: (0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(reference) ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reference) : reference.contextElement ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reference.contextElement) : [],
          popper: (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = (0,_utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__["default"])([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if (true) {
          var modifiers = (0,_utils_uniqueBy_js__WEBPACK_IMPORTED_MODULE_4__["default"])([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
            var name = _ref.name;
            return name;
          });
          (0,_utils_validateModifiers_js__WEBPACK_IMPORTED_MODULE_5__["default"])(modifiers);

          if ((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.options.placement) === _enums_js__WEBPACK_IMPORTED_MODULE_7__.auto) {
            var flipModifier = state.orderedModifiers.find(function (_ref2) {
              var name = _ref2.name;
              return name === 'flip';
            });

            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
            }
          }

          var _getComputedStyle = (0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_8__["default"])(popper),
              marginTop = _getComputedStyle.marginTop,
              marginRight = _getComputedStyle.marginRight,
              marginBottom = _getComputedStyle.marginBottom,
              marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
          // cause bugs with positioning, so we'll warn the consumer


          if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
          }
        }

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          if (true) {
            console.error(INVALID_ELEMENT_ERROR);
          }

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: (0,_dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_9__["default"])(reference, (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__["default"])(popper), state.options.strategy === 'fixed'),
          popper: (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_11__["default"])(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (true) {
            __debug_loops__ += 1;

            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: (0,_utils_debounce_js__WEBPACK_IMPORTED_MODULE_12__["default"])(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      if (true) {
        console.error(INVALID_ELEMENT_ERROR);
      }

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}
var createPopper = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/contains.js":
/*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/contains.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ contains)
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isShadowRoot)(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getBoundingClientRect)
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isLayoutViewport.js */ "./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js");




function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }

  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }

  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;

  if (includeScale && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element)) {
    scaleX = element.offsetWidth > 0 ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_1__.round)(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_1__.round)(clientRect.height) / element.offsetHeight || 1 : 1;
  }

  var _ref = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(element) ? (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element) : window,
      visualViewport = _ref.visualViewport;

  var addVisualOffsets = !(0,_isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_3__["default"])() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x: x,
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getClippingRect)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _getViewportRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getViewportRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js");
/* harmony import */ var _getDocumentRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getDocumentRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js");
/* harmony import */ var _listScrollParents_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _contains_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");















function getInnerBoundingClientRect(element, strategy) {
  var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element, false, strategy === 'fixed');
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === _enums_js__WEBPACK_IMPORTED_MODULE_1__.viewport ? (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_getViewportRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element, strategy)) : (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_getDocumentRect_js__WEBPACK_IMPORTED_MODULE_5__["default"])((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = (0,_listScrollParents_js__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_8__["default"])(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_9__["default"])(element).position) >= 0;
  var clipperElement = canEscapeClipping && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isHTMLElement)(element) ? (0,_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__["default"])(element) : element;

  if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clippingParent) && (0,_contains_js__WEBPACK_IMPORTED_MODULE_11__["default"])(clippingParent, clipperElement) && (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_12__["default"])(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.max)(rect.top, accRect.top);
    accRect.right = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.min)(rect.right, accRect.right);
    accRect.bottom = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.min)(rect.bottom, accRect.bottom);
    accRect.left = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.max)(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCompositeRect)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getNodeScroll_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getNodeScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");









function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(rect.width) / element.offsetWidth || 1;
  var scaleY = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.


function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var isOffsetParentAnElement = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent);
  var offsetParentIsScaled = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent) && isElementScaled(offsetParent);
  var documentElement = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(offsetParent);
  var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_5__["default"])(documentElement)) {
      scroll = (0,_getNodeScroll_js__WEBPACK_IMPORTED_MODULE_6__["default"])(offsetParent);
    }

    if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent)) {
      offsets = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_7__["default"])(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getComputedStyle)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getComputedStyle(element) {
  return (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element).getComputedStyle(element);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDocumentElement)
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return (((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDocumentRect)
/* harmony export */ });
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");




 // Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var winScroll = (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element);
  var y = -winScroll.scrollTop;

  if ((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__["default"])(body || html).direction === 'rtl') {
    x += (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getHTMLElementScroll)
/* harmony export */ });
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getLayoutRect)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
 // Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getNodeName)
/* harmony export */ });
function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getNodeScroll)
/* harmony export */ });
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getHTMLElementScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js");




function getNodeScroll(node) {
  if (node === (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node) || !(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(node)) {
    return (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__["default"])(node);
  } else {
    return (0,_getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__["default"])(node);
  }
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getOffsetParent)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _isTableElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./isTableElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _utils_userAgent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/userAgent.js */ "./node_modules/@popperjs/core/lib/utils/userAgent.js");








function getTrueOffsetParent(element) {
  if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || // https://github.com/popperjs/popper-core/issues/837
  (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = /firefox/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_2__["default"])());
  var isIE = /Trident/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_2__["default"])());

  if (isIE && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = (0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element);

  if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isShadowRoot)(currentNode)) {
    currentNode = currentNode.host;
  }

  while ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(currentNode) && ['html', 'body'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(currentNode)) < 0) {
    var css = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_5__["default"])(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && (0,_isTableElement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(offsetParent) && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) === 'html' || (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) === 'body' && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getParentNode)
/* harmony export */ });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");



function getParentNode(element) {
  if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isShadowRoot)(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element) // fallback

  );
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getScrollParent)
/* harmony export */ });
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");




function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(node) && (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(node)) {
    return node;
  }

  return getScrollParent((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(node));
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getViewportRect)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isLayoutViewport.js */ "./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js");




function getViewportRect(element, strategy) {
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = (0,_isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_2__["default"])();

    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element),
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js":
/*!****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindow.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWindow)
/* harmony export */ });
function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWindowScroll)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getWindowScroll(node) {
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWindowScrollBarX)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");



function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)).left + (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element).scrollLeft;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isElement": () => (/* binding */ isElement),
/* harmony export */   "isHTMLElement": () => (/* binding */ isHTMLElement),
/* harmony export */   "isShadowRoot": () => (/* binding */ isShadowRoot)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");


function isElement(node) {
  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isLayoutViewport)
/* harmony export */ });
/* harmony import */ var _utils_userAgent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/userAgent.js */ "./node_modules/@popperjs/core/lib/utils/userAgent.js");

function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_0__["default"])());
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isScrollParent)
/* harmony export */ });
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isTableElement)
/* harmony export */ });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element)) >= 0;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js":
/*!************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ listScrollParents)
/* harmony export */ });
/* harmony import */ var _getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");




/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = (0,_getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(target)));
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/enums.js":
/*!**************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/enums.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "afterMain": () => (/* binding */ afterMain),
/* harmony export */   "afterRead": () => (/* binding */ afterRead),
/* harmony export */   "afterWrite": () => (/* binding */ afterWrite),
/* harmony export */   "auto": () => (/* binding */ auto),
/* harmony export */   "basePlacements": () => (/* binding */ basePlacements),
/* harmony export */   "beforeMain": () => (/* binding */ beforeMain),
/* harmony export */   "beforeRead": () => (/* binding */ beforeRead),
/* harmony export */   "beforeWrite": () => (/* binding */ beforeWrite),
/* harmony export */   "bottom": () => (/* binding */ bottom),
/* harmony export */   "clippingParents": () => (/* binding */ clippingParents),
/* harmony export */   "end": () => (/* binding */ end),
/* harmony export */   "left": () => (/* binding */ left),
/* harmony export */   "main": () => (/* binding */ main),
/* harmony export */   "modifierPhases": () => (/* binding */ modifierPhases),
/* harmony export */   "placements": () => (/* binding */ placements),
/* harmony export */   "popper": () => (/* binding */ popper),
/* harmony export */   "read": () => (/* binding */ read),
/* harmony export */   "reference": () => (/* binding */ reference),
/* harmony export */   "right": () => (/* binding */ right),
/* harmony export */   "start": () => (/* binding */ start),
/* harmony export */   "top": () => (/* binding */ top),
/* harmony export */   "variationPlacements": () => (/* binding */ variationPlacements),
/* harmony export */   "viewport": () => (/* binding */ viewport),
/* harmony export */   "write": () => (/* binding */ write)
/* harmony export */ });
var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/applyStyles.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom-utils/getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

 // This modifier takes the styles prepared by the `computeStyles` modifier
// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect,
  requires: ['computeStyles']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/arrow.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/arrow.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dom-utils/contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");









 // eslint-disable-next-line import/no-unused-modules

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return (0,_utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(typeof padding !== 'number' ? padding : (0,_utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_1__["default"])(padding, _enums_js__WEBPACK_IMPORTED_MODULE_2__.basePlacements));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(state.placement);
  var axis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(basePlacement);
  var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_2__.left, _enums_js__WEBPACK_IMPORTED_MODULE_2__.right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__["default"])(arrowElement);
  var minProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_2__.top : _enums_js__WEBPACK_IMPORTED_MODULE_2__.left;
  var maxProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_2__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_2__.right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__["default"])(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_7__.within)(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (true) {
    if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_8__.isHTMLElement)(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
    }
  }

  if (!(0,_dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_9__["default"])(state.elements.popper, arrowElement)) {
    if (true) {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
    }

    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/computeStyles.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "mapToStyles": () => (/* binding */ mapToStyles)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");







 // eslint-disable-next-line import/no-unused-modules

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref, win) {
  var x = _ref.x,
      y = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(x * dpr) / dpr || 0,
    y: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      variation = _ref2.variation,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets,
      isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x,
      x = _offsets$x === void 0 ? 0 : _offsets$x,
      _offsets$y = offsets.y,
      y = _offsets$y === void 0 ? 0 : _offsets$y;

  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = _enums_js__WEBPACK_IMPORTED_MODULE_1__.left;
  var sideY = _enums_js__WEBPACK_IMPORTED_MODULE_1__.top;
  var win = window;

  if (adaptive) {
    var offsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__["default"])(popper)) {
      offsetParent = (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(popper);

      if ((0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__["default"])(offsetParent).position !== 'static' && position === 'absolute') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.top || (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.left || placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.right) && variation === _enums_js__WEBPACK_IMPORTED_MODULE_1__.end) {
      sideY = _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
      offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.left || (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.top || placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom) && variation === _enums_js__WEBPACK_IMPORTED_MODULE_1__.end) {
      sideX = _enums_js__WEBPACK_IMPORTED_MODULE_1__.right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
      offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x,
    y: y
  }, (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__["default"])(popper)) : {
    x: x,
    y: y
  };

  x = _ref4.x;
  y = _ref4.y;

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref5) {
  var state = _ref5.state,
      options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

  if (true) {
    var transitionProperty = (0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__["default"])(state.elements.popper).transitionProperty || '';

    if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
    }
  }

  var commonStyles = {
    placement: (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.placement),
    variation: (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_7__["default"])(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration,
    isFixed: state.options.strategy === 'fixed'
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/eventListeners.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
 // eslint-disable-next-line import/no-unused-modules

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/flip.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/flip.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getOppositePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getOppositeVariationPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/computeAutoPlacement.js */ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");






 // eslint-disable-next-line import/no-unused-modules

function getExpandedFallbackPlacements(placement) {
  if ((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.auto) {
    return [];
  }

  var oppositePlacement = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(placement);
  return [(0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(placement), oppositePlacement, (0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [(0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.auto ? (0,_utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);

    var isStartVariation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_5__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.start;
    var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_1__.top, _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_1__.right : _enums_js__WEBPACK_IMPORTED_MODULE_1__.left : isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_1__.top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(mainVariationSide);
    }

    var altVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/hide.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/hide.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");



function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [_enums_js__WEBPACK_IMPORTED_MODULE_0__.top, _enums_js__WEBPACK_IMPORTED_MODULE_0__.right, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom, _enums_js__WEBPACK_IMPORTED_MODULE_0__.left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyStyles": () => (/* reexport safe */ _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "arrow": () => (/* reexport safe */ _arrow_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "computeStyles": () => (/* reexport safe */ _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "eventListeners": () => (/* reexport safe */ _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "flip": () => (/* reexport safe */ _flip_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "hide": () => (/* reexport safe */ _hide_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "offset": () => (/* reexport safe */ _offset_js__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   "popperOffsets": () => (/* reexport safe */ _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   "preventOverflow": () => (/* reexport safe */ _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__["default"])
/* harmony export */ });
/* harmony import */ var _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony import */ var _arrow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _flip_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _hide_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _offset_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");










/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/offset.js":
/*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/offset.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "distanceAndSkiddingToXY": () => (/* binding */ distanceAndSkiddingToXY)
/* harmony export */ });
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");

 // eslint-disable-next-line import/no-unused-modules

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);
  var invertDistance = [_enums_js__WEBPACK_IMPORTED_MODULE_1__.left, _enums_js__WEBPACK_IMPORTED_MODULE_1__.top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [_enums_js__WEBPACK_IMPORTED_MODULE_1__.left, _enums_js__WEBPACK_IMPORTED_MODULE_1__.right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = _enums_js__WEBPACK_IMPORTED_MODULE_1__.placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");


function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = (0,_utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getAltAxis.js */ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");












function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state.placement);
  var variation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(basePlacement);
  var altAxis = (0,_utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_4__["default"])(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis) {
    var _offsetModifierState$;

    var mainSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.top : _enums_js__WEBPACK_IMPORTED_MODULE_5__.left;
    var altSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_5__.right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = offset + overflow[mainSide];
    var max = offset - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_5__.start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_5__.start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__["default"])(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : (0,_utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_7__["default"])();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.within)(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_9__["default"])(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset + maxOffset - offsetModifierValue;
    var preventedOffset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.within)(tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.min)(min, tetherMin) : min, offset, tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.max)(max, tetherMax) : max);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _offsetModifierState$2;

    var _mainSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.top : _enums_js__WEBPACK_IMPORTED_MODULE_5__.left;

    var _altSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_5__.right;

    var _offset = popperOffsets[altAxis];

    var _len = altAxis === 'y' ? 'height' : 'width';

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var isOriginSide = [_enums_js__WEBPACK_IMPORTED_MODULE_5__.top, _enums_js__WEBPACK_IMPORTED_MODULE_5__.left].indexOf(basePlacement) !== -1;

    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

    var _preventedOffset = tether && isOriginSide ? (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.withinMaxClamp)(_tetherMin, _offset, _tetherMax) : (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.within)(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/popper-lite.js":
/*!********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper-lite.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPopper": () => (/* binding */ createPopper),
/* harmony export */   "defaultModifiers": () => (/* binding */ defaultModifiers),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "popperGenerator": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_4__.popperGenerator)
/* harmony export */ });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");





var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__["default"], _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__["default"], _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"], _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__["default"]];
var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_4__.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/popper.js":
/*!***************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyStyles": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.applyStyles),
/* harmony export */   "arrow": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.arrow),
/* harmony export */   "computeStyles": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.computeStyles),
/* harmony export */   "createPopper": () => (/* binding */ createPopper),
/* harmony export */   "createPopperLite": () => (/* reexport safe */ _popper_lite_js__WEBPACK_IMPORTED_MODULE_11__.createPopper),
/* harmony export */   "defaultModifiers": () => (/* binding */ defaultModifiers),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   "eventListeners": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.eventListeners),
/* harmony export */   "flip": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.flip),
/* harmony export */   "hide": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.hide),
/* harmony export */   "offset": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.offset),
/* harmony export */   "popperGenerator": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_9__.popperGenerator),
/* harmony export */   "popperOffsets": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.popperOffsets),
/* harmony export */   "preventOverflow": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.preventOverflow)
/* harmony export */ });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony import */ var _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modifiers/offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modifiers/flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modifiers/preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");
/* harmony import */ var _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modifiers/arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modifiers/hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _popper_lite_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./popper-lite.js */ "./node_modules/@popperjs/core/lib/popper-lite.js");
/* harmony import */ var _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modifiers/index.js */ "./node_modules/@popperjs/core/lib/modifiers/index.js");










var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__["default"], _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__["default"], _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"], _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__["default"], _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_4__["default"], _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_5__["default"], _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_6__["default"], _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_7__["default"], _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_8__["default"]];
var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_9__.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ computeAutoPlacement)
/* harmony export */ });
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");




function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.placements : _options$allowedAutoP;
  var variation = (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement);
  var placements = variation ? flipVariations ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements : _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements.filter(function (placement) {
    return (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) === variation;
  }) : _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements;
  var allowedPlacements = placements.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements;

    if (true) {
      console.error(['Popper: The `allowedAutoPlacements` option did not allow any', 'placements. Ensure the `placement` option matches the variation', 'of the allowed placements.', 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(' '));
    }
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = (0,_detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[(0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeOffsets.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ computeOffsets)
/* harmony export */ });
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");




function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? (0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) : null;
  var variation = placement ? (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? (0,_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case _enums_js__WEBPACK_IMPORTED_MODULE_2__.start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case _enums_js__WEBPACK_IMPORTED_MODULE_2__.end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;

      default:
    }
  }

  return offsets;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/debounce.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/debounce.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ debounce)
/* harmony export */ });
function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/detectOverflow.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ detectOverflow)
/* harmony export */ });
/* harmony import */ var _dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getClippingRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _computeOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");
/* harmony import */ var _rectToClientRect_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _expandToHashMap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");








 // eslint-disable-next-line import/no-unused-modules

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$strategy = _options.strategy,
      strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = (0,_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(typeof padding !== 'number' ? padding : (0,_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_2__["default"])(padding, _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements));
  var altContext = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.reference : _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = (0,_dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(element) ? element : element.contextElement || (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__["default"])(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = (0,_dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.elements.reference);
  var popperOffsets = (0,_computeOffsets_js__WEBPACK_IMPORTED_MODULE_7__["default"])({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = (0,_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_8__["default"])(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [_enums_js__WEBPACK_IMPORTED_MODULE_0__.right, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [_enums_js__WEBPACK_IMPORTED_MODULE_0__.top, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/expandToHashMap.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ expandToHashMap)
/* harmony export */ });
function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/format.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/format.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ format)
/* harmony export */ });
function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return [].concat(args).reduce(function (p, c) {
    return p.replace(/%s/, c);
  }, str);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js":
/*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getAltAxis.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getAltAxis)
/* harmony export */ });
function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getBasePlacement.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getBasePlacement)
/* harmony export */ });

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getFreshSideObject)
/* harmony export */ });
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getMainAxisFromPlacement)
/* harmony export */ });
function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getOppositePlacement)
/* harmony export */ });
var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getOppositeVariationPlacement)
/* harmony export */ });
var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getVariation.js":
/*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getVariation.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getVariation)
/* harmony export */ });
function getVariation(placement) {
  return placement.split('-')[1];
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/math.js":
/*!*******************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/math.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "round": () => (/* binding */ round)
/* harmony export */ });
var max = Math.max;
var min = Math.min;
var round = Math.round;

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/mergeByName.js":
/*!**************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergeByName.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mergeByName)
/* harmony export */ });
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mergePaddingObject)
/* harmony export */ });
/* harmony import */ var _getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");

function mergePaddingObject(paddingObject) {
  return Object.assign({}, (0,_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(), paddingObject);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/orderModifiers.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ orderModifiers)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
 // source: https://stackoverflow.com/questions/49875255

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return _enums_js__WEBPACK_IMPORTED_MODULE_0__.modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/rectToClientRect.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rectToClientRect)
/* harmony export */ });
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/uniqueBy.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/uniqueBy.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ uniqueBy)
/* harmony export */ });
function uniqueBy(arr, fn) {
  var identifiers = new Set();
  return arr.filter(function (item) {
    var identifier = fn(item);

    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/userAgent.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/userAgent.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getUAString)
/* harmony export */ });
function getUAString() {
  var uaData = navigator.userAgentData;

  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function (item) {
      return item.brand + "/" + item.version;
    }).join(' ');
  }

  return navigator.userAgent;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/validateModifiers.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/validateModifiers.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ validateModifiers)
/* harmony export */ });
/* harmony import */ var _format_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./format.js */ "./node_modules/@popperjs/core/lib/utils/format.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");


var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function validateModifiers(modifiers) {
  modifiers.forEach(function (modifier) {
    [].concat(Object.keys(modifier), VALID_PROPERTIES) // IE11-compatible replacement for `new Set(iterable)`
    .filter(function (value, index, self) {
      return self.indexOf(value) === index;
    }).forEach(function (key) {
      switch (key) {
        case 'name':
          if (typeof modifier.name !== 'string') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
          }

          break;

        case 'enabled':
          if (typeof modifier.enabled !== 'boolean') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
          }

          break;

        case 'phase':
          if (_enums_js__WEBPACK_IMPORTED_MODULE_1__.modifierPhases.indexOf(modifier.phase) < 0) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + _enums_js__WEBPACK_IMPORTED_MODULE_1__.modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
          }

          break;

        case 'fn':
          if (typeof modifier.fn !== 'function') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'effect':
          if (modifier.effect != null && typeof modifier.effect !== 'function') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'requires':
          if (modifier.requires != null && !Array.isArray(modifier.requires)) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
          }

          break;

        case 'requiresIfExists':
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
          }

          break;

        case 'options':
        case 'data':
          break;

        default:
          console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
            return "\"" + s + "\"";
          }).join(', ') + "; but \"" + key + "\" was provided.");
      }

      modifier.requires && modifier.requires.forEach(function (requirement) {
        if (modifiers.find(function (mod) {
          return mod.name === requirement;
        }) == null) {
          console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/within.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/within.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "within": () => (/* binding */ within),
/* harmony export */   "withinMaxClamp": () => (/* binding */ withinMaxClamp)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");

function within(min, value, max) {
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.max)(min, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.min)(value, max));
}
function withinMaxClamp(min, value, max) {
  var v = within(min, value, max);
  return v > max ? max : v;
}

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/accordion/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/accordion/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "initAccordions": () => (/* binding */ initAccordions)
/* harmony export */ });
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Default = {
    alwaysOpen: false,
    activeClasses: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white',
    inactiveClasses: 'text-gray-500 dark:text-gray-400',
    onOpen: function () { },
    onClose: function () { },
    onToggle: function () { },
};
var Accordion = /** @class */ (function () {
    function Accordion(items, options) {
        if (items === void 0) { items = []; }
        if (options === void 0) { options = Default; }
        this._items = items;
        this._options = __assign(__assign({}, Default), options);
        this._init();
    }
    Accordion.prototype._init = function () {
        var _this = this;
        if (this._items.length) {
            // show accordion item based on click
            this._items.map(function (item) {
                if (item.active) {
                    _this.open(item.id);
                }
                item.triggerEl.addEventListener('click', function () {
                    _this.toggle(item.id);
                });
            });
        }
    };
    Accordion.prototype.getItem = function (id) {
        return this._items.filter(function (item) { return item.id === id; })[0];
    };
    Accordion.prototype.open = function (id) {
        var _a, _b;
        var _this = this;
        var item = this.getItem(id);
        // don't hide other accordions if always open
        if (!this._options.alwaysOpen) {
            this._items.map(function (i) {
                var _a, _b;
                if (i !== item) {
                    (_a = i.triggerEl.classList).remove.apply(_a, _this._options.activeClasses.split(' '));
                    (_b = i.triggerEl.classList).add.apply(_b, _this._options.inactiveClasses.split(' '));
                    i.targetEl.classList.add('hidden');
                    i.triggerEl.setAttribute('aria-expanded', 'false');
                    i.active = false;
                    // rotate icon if set
                    if (i.iconEl) {
                        i.iconEl.classList.remove('rotate-180');
                    }
                }
            });
        }
        // show active item
        (_a = item.triggerEl.classList).add.apply(_a, this._options.activeClasses.split(' '));
        (_b = item.triggerEl.classList).remove.apply(_b, this._options.inactiveClasses.split(' '));
        item.triggerEl.setAttribute('aria-expanded', 'true');
        item.targetEl.classList.remove('hidden');
        item.active = true;
        // rotate icon if set
        if (item.iconEl) {
            item.iconEl.classList.add('rotate-180');
        }
        // callback function
        this._options.onOpen(this, item);
    };
    Accordion.prototype.toggle = function (id) {
        var item = this.getItem(id);
        if (item.active) {
            this.close(id);
        }
        else {
            this.open(id);
        }
        // callback function
        this._options.onToggle(this, item);
    };
    Accordion.prototype.close = function (id) {
        var _a, _b;
        var item = this.getItem(id);
        (_a = item.triggerEl.classList).remove.apply(_a, this._options.activeClasses.split(' '));
        (_b = item.triggerEl.classList).add.apply(_b, this._options.inactiveClasses.split(' '));
        item.targetEl.classList.add('hidden');
        item.triggerEl.setAttribute('aria-expanded', 'false');
        item.active = false;
        // rotate icon if set
        if (item.iconEl) {
            item.iconEl.classList.remove('rotate-180');
        }
        // callback function
        this._options.onClose(this, item);
    };
    return Accordion;
}());
if (typeof window !== 'undefined') {
    window.Accordion = Accordion;
}
function initAccordions() {
    document.querySelectorAll('[data-accordion]').forEach(function ($accordionEl) {
        var alwaysOpen = $accordionEl.getAttribute('data-accordion');
        var activeClasses = $accordionEl.getAttribute('data-active-classes');
        var inactiveClasses = $accordionEl.getAttribute('data-inactive-classes');
        var items = [];
        $accordionEl
            .querySelectorAll('[data-accordion-target]')
            .forEach(function ($triggerEl) {
            var item = {
                id: $triggerEl.getAttribute('data-accordion-target'),
                triggerEl: $triggerEl,
                targetEl: document.querySelector($triggerEl.getAttribute('data-accordion-target')),
                iconEl: $triggerEl.querySelector('[data-accordion-icon]'),
                active: $triggerEl.getAttribute('aria-expanded') === 'true'
                    ? true
                    : false,
            };
            items.push(item);
        });
        new Accordion(items, {
            alwaysOpen: alwaysOpen === 'open' ? true : false,
            activeClasses: activeClasses
                ? activeClasses
                : Default.activeClasses,
            inactiveClasses: inactiveClasses
                ? inactiveClasses
                : Default.inactiveClasses,
        });
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Accordion);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/accordion/interface.js":
/*!*************************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/accordion/interface.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=interface.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/accordion/types.js":
/*!*********************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/accordion/types.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=types.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/carousel/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/carousel/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "initCarousels": () => (/* binding */ initCarousels)
/* harmony export */ });
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Default = {
    defaultPosition: 0,
    indicators: {
        items: [],
        activeClasses: 'bg-white dark:bg-gray-800',
        inactiveClasses: 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
    },
    interval: 3000,
    onNext: function () { },
    onPrev: function () { },
    onChange: function () { },
};
var Carousel = /** @class */ (function () {
    function Carousel(items, options) {
        if (items === void 0) { items = []; }
        if (options === void 0) { options = Default; }
        this._items = items;
        this._options = __assign(__assign(__assign({}, Default), options), { indicators: __assign(__assign({}, Default.indicators), options.indicators) });
        this._activeItem = this.getItem(this._options.defaultPosition);
        this._indicators = this._options.indicators.items;
        this._intervalDuration = this._options.interval;
        this._intervalInstance = null;
        this._init();
    }
    /**
     * initialize carousel and items based on active one
     */
    Carousel.prototype._init = function () {
        var _this = this;
        this._items.map(function (item) {
            item.el.classList.add('absolute', 'inset-0', 'transition-transform', 'transform');
        });
        // if no active item is set then first position is default
        if (this._getActiveItem()) {
            this.slideTo(this._getActiveItem().position);
        }
        else {
            this.slideTo(0);
        }
        this._indicators.map(function (indicator, position) {
            indicator.el.addEventListener('click', function () {
                _this.slideTo(position);
            });
        });
    };
    Carousel.prototype.getItem = function (position) {
        return this._items[position];
    };
    /**
     * Slide to the element based on id
     * @param {*} position
     */
    Carousel.prototype.slideTo = function (position) {
        var nextItem = this._items[position];
        var rotationItems = {
            left: nextItem.position === 0
                ? this._items[this._items.length - 1]
                : this._items[nextItem.position - 1],
            middle: nextItem,
            right: nextItem.position === this._items.length - 1
                ? this._items[0]
                : this._items[nextItem.position + 1],
        };
        this._rotate(rotationItems);
        this._setActiveItem(nextItem);
        if (this._intervalInstance) {
            this.pause();
            this.cycle();
        }
        this._options.onChange(this);
    };
    /**
     * Based on the currently active item it will go to the next position
     */
    Carousel.prototype.next = function () {
        var activeItem = this._getActiveItem();
        var nextItem = null;
        // check if last item
        if (activeItem.position === this._items.length - 1) {
            nextItem = this._items[0];
        }
        else {
            nextItem = this._items[activeItem.position + 1];
        }
        this.slideTo(nextItem.position);
        // callback function
        this._options.onNext(this);
    };
    /**
     * Based on the currently active item it will go to the previous position
     */
    Carousel.prototype.prev = function () {
        var activeItem = this._getActiveItem();
        var prevItem = null;
        // check if first item
        if (activeItem.position === 0) {
            prevItem = this._items[this._items.length - 1];
        }
        else {
            prevItem = this._items[activeItem.position - 1];
        }
        this.slideTo(prevItem.position);
        // callback function
        this._options.onPrev(this);
    };
    /**
     * This method applies the transform classes based on the left, middle, and right rotation carousel items
     * @param {*} rotationItems
     */
    Carousel.prototype._rotate = function (rotationItems) {
        // reset
        this._items.map(function (item) {
            item.el.classList.add('hidden');
        });
        // left item (previously active)
        rotationItems.left.el.classList.remove('-translate-x-full', 'translate-x-full', 'translate-x-0', 'hidden', 'z-20');
        rotationItems.left.el.classList.add('-translate-x-full', 'z-10');
        // currently active item
        rotationItems.middle.el.classList.remove('-translate-x-full', 'translate-x-full', 'translate-x-0', 'hidden', 'z-10');
        rotationItems.middle.el.classList.add('translate-x-0', 'z-20');
        // right item (upcoming active)
        rotationItems.right.el.classList.remove('-translate-x-full', 'translate-x-full', 'translate-x-0', 'hidden', 'z-20');
        rotationItems.right.el.classList.add('translate-x-full', 'z-10');
    };
    /**
     * Set an interval to cycle through the carousel items
     */
    Carousel.prototype.cycle = function () {
        var _this = this;
        if (typeof window !== 'undefined') {
            this._intervalInstance = window.setInterval(function () {
                _this.next();
            }, this._intervalDuration);
        }
    };
    /**
     * Clears the cycling interval
     */
    Carousel.prototype.pause = function () {
        clearInterval(this._intervalInstance);
    };
    /**
     * Get the currently active item
     */
    Carousel.prototype._getActiveItem = function () {
        return this._activeItem;
    };
    /**
     * Set the currently active item and data attribute
     * @param {*} position
     */
    Carousel.prototype._setActiveItem = function (item) {
        var _a, _b;
        var _this = this;
        this._activeItem = item;
        var position = item.position;
        // update the indicators if available
        if (this._indicators.length) {
            this._indicators.map(function (indicator) {
                var _a, _b;
                indicator.el.setAttribute('aria-current', 'false');
                (_a = indicator.el.classList).remove.apply(_a, _this._options.indicators.activeClasses.split(' '));
                (_b = indicator.el.classList).add.apply(_b, _this._options.indicators.inactiveClasses.split(' '));
            });
            (_a = this._indicators[position].el.classList).add.apply(_a, this._options.indicators.activeClasses.split(' '));
            (_b = this._indicators[position].el.classList).remove.apply(_b, this._options.indicators.inactiveClasses.split(' '));
            this._indicators[position].el.setAttribute('aria-current', 'true');
        }
    };
    return Carousel;
}());
if (typeof window !== 'undefined') {
    window.Carousel = Carousel;
}
function initCarousels() {
    document.querySelectorAll('[data-carousel]').forEach(function ($carouselEl) {
        var interval = $carouselEl.getAttribute('data-carousel-interval');
        var slide = $carouselEl.getAttribute('data-carousel') === 'slide'
            ? true
            : false;
        var items = [];
        var defaultPosition = 0;
        if ($carouselEl.querySelectorAll('[data-carousel-item]').length) {
            Array.from($carouselEl.querySelectorAll('[data-carousel-item]')).map(function ($carouselItemEl, position) {
                items.push({
                    position: position,
                    el: $carouselItemEl,
                });
                if ($carouselItemEl.getAttribute('data-carousel-item') ===
                    'active') {
                    defaultPosition = position;
                }
            });
        }
        var indicators = [];
        if ($carouselEl.querySelectorAll('[data-carousel-slide-to]').length) {
            Array.from($carouselEl.querySelectorAll('[data-carousel-slide-to]')).map(function ($indicatorEl) {
                indicators.push({
                    position: parseInt($indicatorEl.getAttribute('data-carousel-slide-to')),
                    el: $indicatorEl,
                });
            });
        }
        var carousel = new Carousel(items, {
            defaultPosition: defaultPosition,
            indicators: {
                items: indicators,
            },
            interval: interval ? interval : Default.interval,
        });
        if (slide) {
            carousel.cycle();
        }
        // check for controls
        var carouselNextEl = $carouselEl.querySelector('[data-carousel-next]');
        var carouselPrevEl = $carouselEl.querySelector('[data-carousel-prev]');
        if (carouselNextEl) {
            carouselNextEl.addEventListener('click', function () {
                carousel.next();
            });
        }
        if (carouselPrevEl) {
            carouselPrevEl.addEventListener('click', function () {
                carousel.prev();
            });
        }
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Carousel);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/carousel/interface.js":
/*!************************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/carousel/interface.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=interface.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/carousel/types.js":
/*!********************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/carousel/types.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=types.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/collapse/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/collapse/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "initCollapses": () => (/* binding */ initCollapses)
/* harmony export */ });
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Default = {
    onCollapse: function () { },
    onExpand: function () { },
    onToggle: function () { },
};
var Collapse = /** @class */ (function () {
    function Collapse(targetEl, triggerEl, options) {
        if (targetEl === void 0) { targetEl = null; }
        if (triggerEl === void 0) { triggerEl = null; }
        if (options === void 0) { options = Default; }
        this._targetEl = targetEl;
        this._triggerEl = triggerEl;
        this._options = __assign(__assign({}, Default), options);
        this._visible = false;
        this._init();
    }
    Collapse.prototype._init = function () {
        var _this = this;
        if (this._triggerEl) {
            if (this._triggerEl.hasAttribute('aria-expanded')) {
                this._visible =
                    this._triggerEl.getAttribute('aria-expanded') === 'true';
            }
            else {
                // fix until v2 not to break previous single collapses which became dismiss
                this._visible = !this._targetEl.classList.contains('hidden');
            }
            this._triggerEl.addEventListener('click', function () {
                _this.toggle();
            });
        }
    };
    Collapse.prototype.collapse = function () {
        this._targetEl.classList.add('hidden');
        if (this._triggerEl) {
            this._triggerEl.setAttribute('aria-expanded', 'false');
        }
        this._visible = false;
        // callback function
        this._options.onCollapse(this);
    };
    Collapse.prototype.expand = function () {
        this._targetEl.classList.remove('hidden');
        if (this._triggerEl) {
            this._triggerEl.setAttribute('aria-expanded', 'true');
        }
        this._visible = true;
        // callback function
        this._options.onExpand(this);
    };
    Collapse.prototype.toggle = function () {
        if (this._visible) {
            this.collapse();
        }
        else {
            this.expand();
        }
        // callback function
        this._options.onToggle(this);
    };
    return Collapse;
}());
if (typeof window !== 'undefined') {
    window.Collapse = Collapse;
}
function initCollapses() {
    document
        .querySelectorAll('[data-collapse-toggle]')
        .forEach(function ($triggerEl) {
        var targetId = $triggerEl.getAttribute('data-collapse-toggle');
        var $targetEl = document.getElementById(targetId);
        // check if the target element exists
        if ($targetEl) {
            new Collapse($targetEl, $triggerEl);
        }
        else {
            console.error("The target element with id \"".concat(targetId, "\" does not exist. Please check the data-collapse-toggle attribute."));
        }
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Collapse);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/collapse/interface.js":
/*!************************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/collapse/interface.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=interface.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/collapse/types.js":
/*!********************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/collapse/types.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=types.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/dial/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/dial/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "initDials": () => (/* binding */ initDials)
/* harmony export */ });
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Default = {
    triggerType: 'hover',
    onShow: function () { },
    onHide: function () { },
    onToggle: function () { },
};
var Dial = /** @class */ (function () {
    function Dial(parentEl, triggerEl, targetEl, options) {
        if (parentEl === void 0) { parentEl = null; }
        if (triggerEl === void 0) { triggerEl = null; }
        if (targetEl === void 0) { targetEl = null; }
        if (options === void 0) { options = Default; }
        this._parentEl = parentEl;
        this._triggerEl = triggerEl;
        this._targetEl = targetEl;
        this._options = __assign(__assign({}, Default), options);
        this._visible = false;
        this._init();
    }
    Dial.prototype._init = function () {
        var _this = this;
        if (this._triggerEl) {
            var triggerEventTypes = this._getTriggerEventTypes(this._options.triggerType);
            triggerEventTypes.showEvents.forEach(function (ev) {
                _this._triggerEl.addEventListener(ev, function () {
                    _this.show();
                });
                _this._targetEl.addEventListener(ev, function () {
                    _this.show();
                });
            });
            triggerEventTypes.hideEvents.forEach(function (ev) {
                _this._parentEl.addEventListener(ev, function () {
                    if (!_this._parentEl.matches(':hover')) {
                        _this.hide();
                    }
                });
            });
        }
    };
    Dial.prototype.hide = function () {
        this._targetEl.classList.add('hidden');
        if (this._triggerEl) {
            this._triggerEl.setAttribute('aria-expanded', 'false');
        }
        this._visible = false;
        // callback function
        this._options.onHide(this);
    };
    Dial.prototype.show = function () {
        this._targetEl.classList.remove('hidden');
        if (this._triggerEl) {
            this._triggerEl.setAttribute('aria-expanded', 'true');
        }
        this._visible = true;
        // callback function
        this._options.onShow(this);
    };
    Dial.prototype.toggle = function () {
        if (this._visible) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    Dial.prototype.isHidden = function () {
        return !this._visible;
    };
    Dial.prototype.isVisible = function () {
        return this._visible;
    };
    Dial.prototype._getTriggerEventTypes = function (triggerType) {
        switch (triggerType) {
            case 'hover':
                return {
                    showEvents: ['mouseenter', 'focus'],
                    hideEvents: ['mouseleave', 'blur'],
                };
            case 'click':
                return {
                    showEvents: ['click', 'focus'],
                    hideEvents: ['focusout', 'blur'],
                };
            case 'none':
                return {
                    showEvents: [],
                    hideEvents: [],
                };
            default:
                return {
                    showEvents: ['mouseenter', 'focus'],
                    hideEvents: ['mouseleave', 'blur'],
                };
        }
    };
    return Dial;
}());
if (typeof window !== 'undefined') {
    window.Dial = Dial;
}
function initDials() {
    document.querySelectorAll('[data-dial-init]').forEach(function ($parentEl) {
        var $triggerEl = $parentEl.querySelector('[data-dial-toggle]');
        if ($triggerEl) {
            var dialId = $triggerEl.getAttribute('data-dial-toggle');
            var $dialEl = document.getElementById(dialId);
            if ($dialEl) {
                var triggerType = $triggerEl.getAttribute('data-dial-trigger');
                new Dial($parentEl, $triggerEl, $dialEl, {
                    triggerType: triggerType
                        ? triggerType
                        : Default.triggerType,
                });
            }
            else {
                console.error("Dial with id ".concat(dialId, " does not exist. Are you sure that the data-dial-toggle attribute points to the correct modal id?"));
            }
        }
        else {
            console.error("Dial with id ".concat($parentEl.id, " does not have a trigger element. Are you sure that the data-dial-toggle attribute exists?"));
        }
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dial);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/dial/interface.js":
/*!********************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/dial/interface.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=interface.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/dial/types.js":
/*!****************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/dial/types.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=types.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/dismiss/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/dismiss/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "initDismisses": () => (/* binding */ initDismisses)
/* harmony export */ });
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Default = {
    transition: 'transition-opacity',
    duration: 300,
    timing: 'ease-out',
    onHide: function () { },
};
var Dismiss = /** @class */ (function () {
    function Dismiss(targetEl, triggerEl, options) {
        if (targetEl === void 0) { targetEl = null; }
        if (triggerEl === void 0) { triggerEl = null; }
        if (options === void 0) { options = Default; }
        this._targetEl = targetEl;
        this._triggerEl = triggerEl;
        this._options = __assign(__assign({}, Default), options);
        this._init();
    }
    Dismiss.prototype._init = function () {
        var _this = this;
        if (this._triggerEl) {
            this._triggerEl.addEventListener('click', function () {
                _this.hide();
            });
        }
    };
    Dismiss.prototype.hide = function () {
        var _this = this;
        this._targetEl.classList.add(this._options.transition, "duration-".concat(this._options.duration), this._options.timing, 'opacity-0');
        setTimeout(function () {
            _this._targetEl.classList.add('hidden');
        }, this._options.duration);
        // callback function
        this._options.onHide(this, this._targetEl);
    };
    return Dismiss;
}());
if (typeof window !== 'undefined') {
    window.Dismiss = Dismiss;
}
function initDismisses() {
    document.querySelectorAll('[data-dismiss-target]').forEach(function ($triggerEl) {
        var targetId = $triggerEl.getAttribute('data-dismiss-target');
        var $dismissEl = document.querySelector(targetId);
        if ($dismissEl) {
            new Dismiss($dismissEl, $triggerEl);
        }
        else {
            console.error("The dismiss element with id \"".concat(targetId, "\" does not exist. Please check the data-dismiss-target attribute."));
        }
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dismiss);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/dismiss/interface.js":
/*!***********************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/dismiss/interface.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=interface.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/dismiss/types.js":
/*!*******************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/dismiss/types.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=types.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/drawer/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/drawer/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "initDrawers": () => (/* binding */ initDrawers)
/* harmony export */ });
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Default = {
    placement: 'left',
    bodyScrolling: false,
    backdrop: true,
    edge: false,
    edgeOffset: 'bottom-[60px]',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30',
    onShow: function () { },
    onHide: function () { },
    onToggle: function () { },
};
var Drawer = /** @class */ (function () {
    function Drawer(targetEl, options) {
        if (targetEl === void 0) { targetEl = null; }
        if (options === void 0) { options = Default; }
        this._targetEl = targetEl;
        this._options = __assign(__assign({}, Default), options);
        this._visible = false;
        this._init();
    }
    Drawer.prototype._init = function () {
        var _this = this;
        // set initial accessibility attributes
        if (this._targetEl) {
            this._targetEl.setAttribute('aria-hidden', 'true');
            this._targetEl.classList.add('transition-transform');
        }
        // set base placement classes
        this._getPlacementClasses(this._options.placement).base.map(function (c) {
            _this._targetEl.classList.add(c);
        });
        // add keyboard event listener to document
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                // if 'Escape' key is pressed
                if (_this.isVisible()) {
                    // if the Drawer is visible
                    _this.hide(); // hide the Drawer
                }
            }
        });
    };
    Drawer.prototype.hide = function () {
        var _this = this;
        // based on the edge option show placement classes
        if (this._options.edge) {
            this._getPlacementClasses(this._options.placement + '-edge').active.map(function (c) {
                _this._targetEl.classList.remove(c);
            });
            this._getPlacementClasses(this._options.placement + '-edge').inactive.map(function (c) {
                _this._targetEl.classList.add(c);
            });
        }
        else {
            this._getPlacementClasses(this._options.placement).active.map(function (c) {
                _this._targetEl.classList.remove(c);
            });
            this._getPlacementClasses(this._options.placement).inactive.map(function (c) {
                _this._targetEl.classList.add(c);
            });
        }
        // set accessibility attributes
        this._targetEl.setAttribute('aria-hidden', 'true');
        this._targetEl.removeAttribute('aria-modal');
        this._targetEl.removeAttribute('role');
        // enable body scroll
        if (!this._options.bodyScrolling) {
            document.body.classList.remove('overflow-hidden');
        }
        // destroy backdrop
        if (this._options.backdrop) {
            this._destroyBackdropEl();
        }
        this._visible = false;
        // callback function
        this._options.onHide(this);
    };
    Drawer.prototype.show = function () {
        var _this = this;
        if (this._options.edge) {
            this._getPlacementClasses(this._options.placement + '-edge').active.map(function (c) {
                _this._targetEl.classList.add(c);
            });
            this._getPlacementClasses(this._options.placement + '-edge').inactive.map(function (c) {
                _this._targetEl.classList.remove(c);
            });
        }
        else {
            this._getPlacementClasses(this._options.placement).active.map(function (c) {
                _this._targetEl.classList.add(c);
            });
            this._getPlacementClasses(this._options.placement).inactive.map(function (c) {
                _this._targetEl.classList.remove(c);
            });
        }
        // set accessibility attributes
        this._targetEl.setAttribute('aria-modal', 'true');
        this._targetEl.setAttribute('role', 'dialog');
        this._targetEl.removeAttribute('aria-hidden');
        // disable body scroll
        if (!this._options.bodyScrolling) {
            document.body.classList.add('overflow-hidden');
        }
        // show backdrop
        if (this._options.backdrop) {
            this._createBackdrop();
        }
        this._visible = true;
        // callback function
        this._options.onShow(this);
    };
    Drawer.prototype.toggle = function () {
        if (this.isVisible()) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    Drawer.prototype._createBackdrop = function () {
        var _a;
        var _this = this;
        if (!this._visible) {
            var backdropEl = document.createElement('div');
            backdropEl.setAttribute('drawer-backdrop', '');
            (_a = backdropEl.classList).add.apply(_a, this._options.backdropClasses.split(' '));
            document.querySelector('body').append(backdropEl);
            backdropEl.addEventListener('click', function () {
                _this.hide();
            });
        }
    };
    Drawer.prototype._destroyBackdropEl = function () {
        if (this._visible) {
            document.querySelector('[drawer-backdrop]').remove();
        }
    };
    Drawer.prototype._getPlacementClasses = function (placement) {
        switch (placement) {
            case 'top':
                return {
                    base: ['top-0', 'left-0', 'right-0'],
                    active: ['transform-none'],
                    inactive: ['-translate-y-full'],
                };
            case 'right':
                return {
                    base: ['right-0', 'top-0'],
                    active: ['transform-none'],
                    inactive: ['translate-x-full'],
                };
            case 'bottom':
                return {
                    base: ['bottom-0', 'left-0', 'right-0'],
                    active: ['transform-none'],
                    inactive: ['translate-y-full'],
                };
            case 'left':
                return {
                    base: ['left-0', 'top-0'],
                    active: ['transform-none'],
                    inactive: ['-translate-x-full'],
                };
            case 'bottom-edge':
                return {
                    base: ['left-0', 'top-0'],
                    active: ['transform-none'],
                    inactive: ['translate-y-full', this._options.edgeOffset],
                };
            default:
                return {
                    base: ['left-0', 'top-0'],
                    active: ['transform-none'],
                    inactive: ['-translate-x-full'],
                };
        }
    };
    Drawer.prototype.isHidden = function () {
        return !this._visible;
    };
    Drawer.prototype.isVisible = function () {
        return this._visible;
    };
    return Drawer;
}());
if (typeof window !== 'undefined') {
    window.Drawer = Drawer;
}
var getDrawerInstance = function (id, instances) {
    if (instances.some(function (drawerInstance) { return drawerInstance.id === id; })) {
        return instances.find(function (drawerInstance) { return drawerInstance.id === id; });
    }
};
function initDrawers() {
    var drawerInstances = [];
    document.querySelectorAll('[data-drawer-target]').forEach(function ($triggerEl) {
        // mandatory
        var drawerId = $triggerEl.getAttribute('data-drawer-target');
        var $drawerEl = document.getElementById(drawerId);
        if ($drawerEl) {
            // optional
            var placement = $triggerEl.getAttribute('data-drawer-placement');
            var bodyScrolling = $triggerEl.getAttribute('data-drawer-body-scrolling');
            var backdrop = $triggerEl.getAttribute('data-drawer-backdrop');
            var edge = $triggerEl.getAttribute('data-drawer-edge');
            var edgeOffset = $triggerEl.getAttribute('data-drawer-edge-offset');
            if (!getDrawerInstance(drawerId, drawerInstances)) {
                drawerInstances.push({
                    id: drawerId,
                    object: new Drawer($drawerEl, {
                        placement: placement ? placement : Default.placement,
                        bodyScrolling: bodyScrolling
                            ? bodyScrolling === 'true'
                                ? true
                                : false
                            : Default.bodyScrolling,
                        backdrop: backdrop
                            ? backdrop === 'true'
                                ? true
                                : false
                            : Default.backdrop,
                        edge: edge
                            ? edge === 'true'
                                ? true
                                : false
                            : Default.edge,
                        edgeOffset: edgeOffset
                            ? edgeOffset
                            : Default.edgeOffset,
                    }),
                });
            }
        }
        else {
            console.error("Drawer with id ".concat(drawerId, " not found. Are you sure that the data-drawer-target attribute points to the correct drawer id?"));
        }
    });
    document.querySelectorAll('[data-drawer-toggle]').forEach(function ($triggerEl) {
        var drawerId = $triggerEl.getAttribute('data-drawer-toggle');
        var $drawerEl = document.getElementById(drawerId);
        if ($drawerEl) {
            var drawer_1 = getDrawerInstance(drawerId, drawerInstances);
            if (drawer_1) {
                $triggerEl.addEventListener('click', function () {
                    drawer_1.object.toggle();
                });
            }
            else {
                console.error("Drawer with id ".concat(drawerId, " has not been initialized. Please initialize it using the data-drawer-target attribute."));
            }
        }
        else {
            console.error("Drawer with id ".concat(drawerId, " not found. Are you sure that the data-drawer-target attribute points to the correct drawer id?"));
        }
    });
    document
        .querySelectorAll('[data-drawer-dismiss], [data-drawer-hide]')
        .forEach(function ($triggerEl) {
        var drawerId = $triggerEl.getAttribute('data-drawer-dismiss')
            ? $triggerEl.getAttribute('data-drawer-dismiss')
            : $triggerEl.getAttribute('data-drawer-hide');
        var $drawerEl = document.getElementById(drawerId);
        if ($drawerEl) {
            var drawer_2 = getDrawerInstance(drawerId, drawerInstances);
            if (drawer_2) {
                $triggerEl.addEventListener('click', function () {
                    drawer_2.object.hide();
                });
            }
            else {
                console.error("Drawer with id ".concat(drawerId, " has not been initialized. Please initialize it using the data-drawer-target attribute."));
            }
        }
        else {
            console.error("Drawer with id ".concat(drawerId, " not found. Are you sure that the data-drawer-target attribute points to the correct drawer id"));
        }
    });
    document.querySelectorAll('[data-drawer-show]').forEach(function ($triggerEl) {
        var drawerId = $triggerEl.getAttribute('data-drawer-show');
        var $drawerEl = document.getElementById(drawerId);
        if ($drawerEl) {
            var drawer_3 = getDrawerInstance(drawerId, drawerInstances);
            if (drawer_3) {
                $triggerEl.addEventListener('click', function () {
                    drawer_3.object.show();
                });
            }
            else {
                console.error("Drawer with id ".concat(drawerId, " has not been initialized. Please initialize it using the data-drawer-target attribute."));
            }
        }
        else {
            console.error("Drawer with id ".concat(drawerId, " not found. Are you sure that the data-drawer-target attribute points to the correct drawer id?"));
        }
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Drawer);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/drawer/interface.js":
/*!**********************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/drawer/interface.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=interface.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/drawer/types.js":
/*!******************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/drawer/types.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=types.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/dropdown/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/dropdown/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "initDropdowns": () => (/* binding */ initDropdowns)
/* harmony export */ });
/* harmony import */ var _popperjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/popper.js");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/* eslint-disable @typescript-eslint/no-empty-function */

var Default = {
    placement: 'bottom',
    triggerType: 'click',
    offsetSkidding: 0,
    offsetDistance: 10,
    delay: 300,
    onShow: function () { },
    onHide: function () { },
    onToggle: function () { },
};
var Dropdown = /** @class */ (function () {
    function Dropdown(targetElement, triggerElement, options) {
        if (targetElement === void 0) { targetElement = null; }
        if (triggerElement === void 0) { triggerElement = null; }
        if (options === void 0) { options = Default; }
        this._targetEl = targetElement;
        this._triggerEl = triggerElement;
        this._options = __assign(__assign({}, Default), options);
        this._popperInstance = this._createPopperInstance();
        this._visible = false;
        this._init();
    }
    Dropdown.prototype._init = function () {
        if (this._triggerEl) {
            this._setupEventListeners();
        }
    };
    Dropdown.prototype._setupEventListeners = function () {
        var _this = this;
        var triggerEvents = this._getTriggerEvents();
        // click event handling for trigger element
        if (this._options.triggerType === 'click') {
            triggerEvents.showEvents.forEach(function (ev) {
                _this._triggerEl.addEventListener(ev, function () {
                    _this.toggle();
                });
            });
        }
        // hover event handling for trigger element
        if (this._options.triggerType === 'hover') {
            triggerEvents.showEvents.forEach(function (ev) {
                _this._triggerEl.addEventListener(ev, function () {
                    if (ev === 'click') {
                        _this.toggle();
                    }
                    else {
                        setTimeout(function () {
                            _this.show();
                        }, _this._options.delay);
                    }
                });
                _this._targetEl.addEventListener(ev, function () {
                    _this.show();
                });
            });
            triggerEvents.hideEvents.forEach(function (ev) {
                _this._triggerEl.addEventListener(ev, function () {
                    setTimeout(function () {
                        if (!_this._targetEl.matches(':hover')) {
                            _this.hide();
                        }
                    }, _this._options.delay);
                });
                _this._targetEl.addEventListener(ev, function () {
                    setTimeout(function () {
                        if (!_this._triggerEl.matches(':hover')) {
                            _this.hide();
                        }
                    }, _this._options.delay);
                });
            });
        }
    };
    Dropdown.prototype._createPopperInstance = function () {
        return (0,_popperjs_core__WEBPACK_IMPORTED_MODULE_0__.createPopper)(this._triggerEl, this._targetEl, {
            placement: this._options.placement,
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [
                            this._options.offsetSkidding,
                            this._options.offsetDistance,
                        ],
                    },
                },
            ],
        });
    };
    Dropdown.prototype._setupClickOutsideListener = function () {
        var _this = this;
        this._clickOutsideEventListener = function (ev) {
            _this._handleClickOutside(ev, _this._targetEl);
        };
        document.body.addEventListener('click', this._clickOutsideEventListener, true);
    };
    Dropdown.prototype._removeClickOutsideListener = function () {
        document.body.removeEventListener('click', this._clickOutsideEventListener, true);
    };
    Dropdown.prototype._handleClickOutside = function (ev, targetEl) {
        var clickedEl = ev.target;
        if (clickedEl !== targetEl &&
            !targetEl.contains(clickedEl) &&
            !this._triggerEl.contains(clickedEl) &&
            this.isVisible()) {
            this.hide();
        }
    };
    Dropdown.prototype._getTriggerEvents = function () {
        switch (this._options.triggerType) {
            case 'hover':
                return {
                    showEvents: ['mouseenter', 'click'],
                    hideEvents: ['mouseleave'],
                };
            case 'click':
                return {
                    showEvents: ['click'],
                    hideEvents: [],
                };
            case 'none':
                return {
                    showEvents: [],
                    hideEvents: [],
                };
            default:
                return {
                    showEvents: ['click'],
                    hideEvents: [],
                };
        }
    };
    Dropdown.prototype.toggle = function () {
        if (this.isVisible()) {
            this.hide();
        }
        else {
            this.show();
        }
        this._options.onToggle(this);
    };
    Dropdown.prototype.isVisible = function () {
        return this._visible;
    };
    Dropdown.prototype.show = function () {
        this._targetEl.classList.remove('hidden');
        this._targetEl.classList.add('block');
        // Enable the event listeners
        this._popperInstance.setOptions(function (options) { return (__assign(__assign({}, options), { modifiers: __spreadArray(__spreadArray([], options.modifiers, true), [
                { name: 'eventListeners', enabled: true },
            ], false) })); });
        this._setupClickOutsideListener();
        // Update its position
        this._popperInstance.update();
        this._visible = true;
        // callback function
        this._options.onShow(this);
    };
    Dropdown.prototype.hide = function () {
        this._targetEl.classList.remove('block');
        this._targetEl.classList.add('hidden');
        // Disable the event listeners
        this._popperInstance.setOptions(function (options) { return (__assign(__assign({}, options), { modifiers: __spreadArray(__spreadArray([], options.modifiers, true), [
                { name: 'eventListeners', enabled: false },
            ], false) })); });
        this._visible = false;
        this._removeClickOutsideListener();
        // callback function
        this._options.onHide(this);
    };
    return Dropdown;
}());
if (typeof window !== 'undefined') {
    window.Dropdown = Dropdown;
}
function initDropdowns() {
    document
        .querySelectorAll('[data-dropdown-toggle]')
        .forEach(function ($triggerEl) {
        var dropdownId = $triggerEl.getAttribute('data-dropdown-toggle');
        var $dropdownEl = document.getElementById(dropdownId);
        if ($dropdownEl) {
            var placement = $triggerEl.getAttribute('data-dropdown-placement');
            var offsetSkidding = $triggerEl.getAttribute('data-dropdown-offset-skidding');
            var offsetDistance = $triggerEl.getAttribute('data-dropdown-offset-distance');
            var triggerType = $triggerEl.getAttribute('data-dropdown-trigger');
            var delay = $triggerEl.getAttribute('data-dropdown-delay');
            new Dropdown($dropdownEl, $triggerEl, {
                placement: placement ? placement : Default.placement,
                triggerType: triggerType
                    ? triggerType
                    : Default.triggerType,
                offsetSkidding: offsetSkidding
                    ? parseInt(offsetSkidding)
                    : Default.offsetSkidding,
                offsetDistance: offsetDistance
                    ? parseInt(offsetDistance)
                    : Default.offsetDistance,
                delay: delay ? parseInt(delay) : Default.delay,
            });
        }
        else {
            console.error("The dropdown element with id \"".concat(dropdownId, "\" does not exist. Please check the data-dropdown-toggle attribute."));
        }
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dropdown);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/dropdown/interface.js":
/*!************************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/dropdown/interface.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=interface.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/dropdown/types.js":
/*!********************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/dropdown/types.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=types.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initFlowbite": () => (/* binding */ initFlowbite)
/* harmony export */ });
/* harmony import */ var _accordion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./accordion */ "./node_modules/flowbite/lib/esm/components/accordion/index.js");
/* harmony import */ var _carousel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./carousel */ "./node_modules/flowbite/lib/esm/components/carousel/index.js");
/* harmony import */ var _collapse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./collapse */ "./node_modules/flowbite/lib/esm/components/collapse/index.js");
/* harmony import */ var _dial__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dial */ "./node_modules/flowbite/lib/esm/components/dial/index.js");
/* harmony import */ var _dismiss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dismiss */ "./node_modules/flowbite/lib/esm/components/dismiss/index.js");
/* harmony import */ var _drawer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./drawer */ "./node_modules/flowbite/lib/esm/components/drawer/index.js");
/* harmony import */ var _dropdown__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dropdown */ "./node_modules/flowbite/lib/esm/components/dropdown/index.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modal */ "./node_modules/flowbite/lib/esm/components/modal/index.js");
/* harmony import */ var _popover__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./popover */ "./node_modules/flowbite/lib/esm/components/popover/index.js");
/* harmony import */ var _tabs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./tabs */ "./node_modules/flowbite/lib/esm/components/tabs/index.js");
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./tooltip */ "./node_modules/flowbite/lib/esm/components/tooltip/index.js");











function initFlowbite() {
    (0,_accordion__WEBPACK_IMPORTED_MODULE_0__.initAccordions)();
    (0,_collapse__WEBPACK_IMPORTED_MODULE_2__.initCollapses)();
    (0,_carousel__WEBPACK_IMPORTED_MODULE_1__.initCarousels)();
    (0,_dismiss__WEBPACK_IMPORTED_MODULE_4__.initDismisses)();
    (0,_dropdown__WEBPACK_IMPORTED_MODULE_6__.initDropdowns)();
    (0,_modal__WEBPACK_IMPORTED_MODULE_7__.initModals)();
    (0,_drawer__WEBPACK_IMPORTED_MODULE_5__.initDrawers)();
    (0,_tabs__WEBPACK_IMPORTED_MODULE_9__.initTabs)();
    (0,_tooltip__WEBPACK_IMPORTED_MODULE_10__.initTooltips)();
    (0,_popover__WEBPACK_IMPORTED_MODULE_8__.initPopovers)();
    (0,_dial__WEBPACK_IMPORTED_MODULE_3__.initDials)();
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/modal/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/modal/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "initModals": () => (/* binding */ initModals)
/* harmony export */ });
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Default = {
    placement: 'center',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    backdrop: 'dynamic',
    closable: true,
    onHide: function () { },
    onShow: function () { },
    onToggle: function () { },
};
var Modal = /** @class */ (function () {
    function Modal(targetEl, options) {
        if (targetEl === void 0) { targetEl = null; }
        if (options === void 0) { options = Default; }
        this._targetEl = targetEl;
        this._options = __assign(__assign({}, Default), options);
        this._isHidden = true;
        this._backdropEl = null;
        this._init();
    }
    Modal.prototype._init = function () {
        var _this = this;
        if (this._targetEl) {
            this._getPlacementClasses().map(function (c) {
                _this._targetEl.classList.add(c);
            });
        }
    };
    Modal.prototype._createBackdrop = function () {
        var _a;
        if (this._isHidden) {
            var backdropEl = document.createElement('div');
            backdropEl.setAttribute('modal-backdrop', '');
            (_a = backdropEl.classList).add.apply(_a, this._options.backdropClasses.split(' '));
            document.querySelector('body').append(backdropEl);
            this._backdropEl = backdropEl;
        }
    };
    Modal.prototype._destroyBackdropEl = function () {
        if (!this._isHidden) {
            document.querySelector('[modal-backdrop]').remove();
        }
    };
    Modal.prototype._setupModalCloseEventListeners = function () {
        var _this = this;
        if (this._options.backdrop === 'dynamic') {
            this._clickOutsideEventListener = function (ev) {
                _this._handleOutsideClick(ev.target);
            };
            this._targetEl.addEventListener('click', this._clickOutsideEventListener, true);
        }
        this._keydownEventListener = function (ev) {
            if (ev.key === 'Escape') {
                _this.hide();
            }
        };
        document.body.addEventListener('keydown', this._keydownEventListener, true);
    };
    Modal.prototype._removeModalCloseEventListeners = function () {
        if (this._options.backdrop === 'dynamic') {
            this._targetEl.removeEventListener('click', this._clickOutsideEventListener, true);
        }
        document.body.removeEventListener('keydown', this._keydownEventListener, true);
    };
    Modal.prototype._handleOutsideClick = function (target) {
        if (target === this._targetEl ||
            (target === this._backdropEl && this.isVisible())) {
            this.hide();
        }
    };
    Modal.prototype._getPlacementClasses = function () {
        switch (this._options.placement) {
            // top
            case 'top-left':
                return ['justify-start', 'items-start'];
            case 'top-center':
                return ['justify-center', 'items-start'];
            case 'top-right':
                return ['justify-end', 'items-start'];
            // center
            case 'center-left':
                return ['justify-start', 'items-center'];
            case 'center':
                return ['justify-center', 'items-center'];
            case 'center-right':
                return ['justify-end', 'items-center'];
            // bottom
            case 'bottom-left':
                return ['justify-start', 'items-end'];
            case 'bottom-center':
                return ['justify-center', 'items-end'];
            case 'bottom-right':
                return ['justify-end', 'items-end'];
            default:
                return ['justify-center', 'items-center'];
        }
    };
    Modal.prototype.toggle = function () {
        if (this._isHidden) {
            this.show();
        }
        else {
            this.hide();
        }
        // callback function
        this._options.onToggle(this);
    };
    Modal.prototype.show = function () {
        if (this.isHidden) {
            this._targetEl.classList.add('flex');
            this._targetEl.classList.remove('hidden');
            this._targetEl.setAttribute('aria-modal', 'true');
            this._targetEl.setAttribute('role', 'dialog');
            this._targetEl.removeAttribute('aria-hidden');
            this._createBackdrop();
            this._isHidden = false;
            // prevent body scroll
            document.body.classList.add('overflow-hidden');
            // Add keyboard event listener to the document
            if (this._options.closable) {
                this._setupModalCloseEventListeners();
            }
            // callback function
            this._options.onShow(this);
        }
    };
    Modal.prototype.hide = function () {
        if (this.isVisible) {
            this._targetEl.classList.add('hidden');
            this._targetEl.classList.remove('flex');
            this._targetEl.setAttribute('aria-hidden', 'true');
            this._targetEl.removeAttribute('aria-modal');
            this._targetEl.removeAttribute('role');
            this._destroyBackdropEl();
            this._isHidden = true;
            // re-apply body scroll
            document.body.classList.remove('overflow-hidden');
            if (this._options.closable) {
                this._removeModalCloseEventListeners();
            }
            // callback function
            this._options.onHide(this);
        }
    };
    Modal.prototype.isVisible = function () {
        return !this._isHidden;
    };
    Modal.prototype.isHidden = function () {
        return this._isHidden;
    };
    return Modal;
}());
if (typeof window !== 'undefined') {
    window.Modal = Modal;
}
var getModalInstance = function (id, instances) {
    if (instances.some(function (modalInstance) { return modalInstance.id === id; })) {
        return instances.find(function (modalInstance) { return modalInstance.id === id; });
    }
    return null;
};
function initModals() {
    var modalInstances = [];
    // initiate modal based on data-modal-target
    document.querySelectorAll('[data-modal-target]').forEach(function ($triggerEl) {
        var modalId = $triggerEl.getAttribute('data-modal-target');
        var $modalEl = document.getElementById(modalId);
        if ($modalEl) {
            var placement = $modalEl.getAttribute('data-modal-placement');
            var backdrop = $modalEl.getAttribute('data-modal-backdrop');
            if (!getModalInstance(modalId, modalInstances)) {
                modalInstances.push({
                    id: modalId,
                    object: new Modal($modalEl, {
                        placement: placement
                            ? placement
                            : Default.placement,
                        backdrop: backdrop ? backdrop : Default.backdrop,
                    }),
                });
            }
        }
        else {
            console.error("Modal with id ".concat(modalId, " does not exist. Are you sure that the data-modal-target attribute points to the correct modal id?."));
        }
    });
    // support pre v1.6.0 data-modal-toggle initialization
    document.querySelectorAll('[data-modal-toggle]').forEach(function ($triggerEl) {
        var modalId = $triggerEl.getAttribute('data-modal-toggle');
        var $modalEl = document.getElementById(modalId);
        if ($modalEl) {
            var placement = $modalEl.getAttribute('data-modal-placement');
            var backdrop = $modalEl.getAttribute('data-modal-backdrop');
            var modal_1 = getModalInstance(modalId, modalInstances);
            if (!modal_1) {
                modal_1 = {
                    id: modalId,
                    object: new Modal($modalEl, {
                        placement: placement
                            ? placement
                            : Default.placement,
                        backdrop: backdrop ? backdrop : Default.backdrop,
                    }),
                };
                modalInstances.push(modal_1);
            }
            $triggerEl.addEventListener('click', function () {
                modal_1.object.toggle();
            });
        }
        else {
            console.error("Modal with id ".concat(modalId, " does not exist. Are you sure that the data-modal-toggle attribute points to the correct modal id?"));
        }
    });
    // show modal on click if exists based on id
    document.querySelectorAll('[data-modal-show]').forEach(function ($triggerEl) {
        var modalId = $triggerEl.getAttribute('data-modal-show');
        var $modalEl = document.getElementById(modalId);
        if ($modalEl) {
            var modal_2 = getModalInstance(modalId, modalInstances);
            if (modal_2) {
                $triggerEl.addEventListener('click', function () {
                    if (modal_2.object.isHidden) {
                        modal_2.object.show();
                    }
                });
            }
            else {
                console.error("Modal with id ".concat(modalId, " has not been initialized. Please initialize it using the data-modal-target attribute."));
            }
        }
        else {
            console.error("Modal with id ".concat(modalId, " does not exist. Are you sure that the data-modal-show attribute points to the correct modal id?"));
        }
    });
    // hide modal on click if exists based on id
    document.querySelectorAll('[data-modal-hide]').forEach(function ($triggerEl) {
        var modalId = $triggerEl.getAttribute('data-modal-hide');
        var $modalEl = document.getElementById(modalId);
        if ($modalEl) {
            var modal_3 = getModalInstance(modalId, modalInstances);
            if (modal_3) {
                $triggerEl.addEventListener('click', function () {
                    if (modal_3.object.isVisible) {
                        modal_3.object.hide();
                    }
                });
            }
            else {
                console.error("Modal with id ".concat(modalId, " has not been initialized. Please initialize it using the data-modal-target attribute."));
            }
        }
        else {
            console.error("Modal with id ".concat(modalId, " does not exist. Are you sure that the data-modal-hide attribute points to the correct modal id?"));
        }
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Modal);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/modal/interface.js":
/*!*********************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/modal/interface.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=interface.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/modal/types.js":
/*!*****************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/modal/types.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=types.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/popover/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/popover/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "initPopovers": () => (/* binding */ initPopovers)
/* harmony export */ });
/* harmony import */ var _popperjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/popper.js");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/* eslint-disable @typescript-eslint/no-empty-function */

var Default = {
    placement: 'top',
    offset: 10,
    triggerType: 'hover',
    onShow: function () { },
    onHide: function () { },
    onToggle: function () { },
};
var Popover = /** @class */ (function () {
    function Popover(targetEl, triggerEl, options) {
        if (targetEl === void 0) { targetEl = null; }
        if (triggerEl === void 0) { triggerEl = null; }
        if (options === void 0) { options = Default; }
        this._targetEl = targetEl;
        this._triggerEl = triggerEl;
        this._options = __assign(__assign({}, Default), options);
        this._popperInstance = this._createPopperInstance();
        this._visible = false;
        this._init();
    }
    Popover.prototype._init = function () {
        if (this._triggerEl) {
            this._setupEventListeners();
        }
    };
    Popover.prototype._setupEventListeners = function () {
        var _this = this;
        var triggerEvents = this._getTriggerEvents();
        triggerEvents.showEvents.forEach(function (ev) {
            _this._triggerEl.addEventListener(ev, function () {
                _this.show();
            });
            _this._targetEl.addEventListener(ev, function () {
                _this.show();
            });
        });
        triggerEvents.hideEvents.forEach(function (ev) {
            _this._triggerEl.addEventListener(ev, function () {
                setTimeout(function () {
                    if (!_this._targetEl.matches(':hover')) {
                        _this.hide();
                    }
                }, 100);
            });
            _this._targetEl.addEventListener(ev, function () {
                setTimeout(function () {
                    if (!_this._triggerEl.matches(':hover')) {
                        _this.hide();
                    }
                }, 100);
            });
        });
    };
    Popover.prototype._createPopperInstance = function () {
        return (0,_popperjs_core__WEBPACK_IMPORTED_MODULE_0__.createPopper)(this._triggerEl, this._targetEl, {
            placement: this._options.placement,
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, this._options.offset],
                    },
                },
            ],
        });
    };
    Popover.prototype._getTriggerEvents = function () {
        switch (this._options.triggerType) {
            case 'hover':
                return {
                    showEvents: ['mouseenter', 'focus'],
                    hideEvents: ['mouseleave', 'blur'],
                };
            case 'click':
                return {
                    showEvents: ['click', 'focus'],
                    hideEvents: ['focusout', 'blur'],
                };
            case 'none':
                return {
                    showEvents: [],
                    hideEvents: [],
                };
            default:
                return {
                    showEvents: ['mouseenter', 'focus'],
                    hideEvents: ['mouseleave', 'blur'],
                };
        }
    };
    Popover.prototype._setupKeydownListener = function () {
        var _this = this;
        this._keydownEventListener = function (ev) {
            if (ev.key === 'Escape') {
                _this.hide();
            }
        };
        document.body.addEventListener('keydown', this._keydownEventListener, true);
    };
    Popover.prototype._removeKeydownListener = function () {
        document.body.removeEventListener('keydown', this._keydownEventListener, true);
    };
    Popover.prototype._setupClickOutsideListener = function () {
        var _this = this;
        this._clickOutsideEventListener = function (ev) {
            _this._handleClickOutside(ev, _this._targetEl);
        };
        document.body.addEventListener('click', this._clickOutsideEventListener, true);
    };
    Popover.prototype._removeClickOutsideListener = function () {
        document.body.removeEventListener('click', this._clickOutsideEventListener, true);
    };
    Popover.prototype._handleClickOutside = function (ev, targetEl) {
        var clickedEl = ev.target;
        if (clickedEl !== targetEl &&
            !targetEl.contains(clickedEl) &&
            !this._triggerEl.contains(clickedEl) &&
            this.isVisible()) {
            this.hide();
        }
    };
    Popover.prototype.isVisible = function () {
        return this._visible;
    };
    Popover.prototype.toggle = function () {
        if (this.isVisible()) {
            this.hide();
        }
        else {
            this.show();
        }
        this._options.onToggle(this);
    };
    Popover.prototype.show = function () {
        this._targetEl.classList.remove('opacity-0', 'invisible');
        this._targetEl.classList.add('opacity-100', 'visible');
        // Enable the event listeners
        this._popperInstance.setOptions(function (options) { return (__assign(__assign({}, options), { modifiers: __spreadArray(__spreadArray([], options.modifiers, true), [
                { name: 'eventListeners', enabled: true },
            ], false) })); });
        // handle click outside
        this._setupClickOutsideListener();
        // handle esc keydown
        this._setupKeydownListener();
        // Update its position
        this._popperInstance.update();
        // set visibility to true
        this._visible = true;
        // callback function
        this._options.onShow(this);
    };
    Popover.prototype.hide = function () {
        this._targetEl.classList.remove('opacity-100', 'visible');
        this._targetEl.classList.add('opacity-0', 'invisible');
        // Disable the event listeners
        this._popperInstance.setOptions(function (options) { return (__assign(__assign({}, options), { modifiers: __spreadArray(__spreadArray([], options.modifiers, true), [
                { name: 'eventListeners', enabled: false },
            ], false) })); });
        // handle click outside
        this._removeClickOutsideListener();
        // handle esc keydown
        this._removeKeydownListener();
        // set visibility to false
        this._visible = false;
        // callback function
        this._options.onHide(this);
    };
    return Popover;
}());
if (typeof window !== 'undefined') {
    window.Popover = Popover;
}
function initPopovers() {
    document.querySelectorAll('[data-popover-target]').forEach(function ($triggerEl) {
        var popoverID = $triggerEl.getAttribute('data-popover-target');
        var $popoverEl = document.getElementById(popoverID);
        if ($popoverEl) {
            var triggerType = $triggerEl.getAttribute('data-popover-trigger');
            var placement = $triggerEl.getAttribute('data-popover-placement');
            var offset = $triggerEl.getAttribute('data-popover-offset');
            new Popover($popoverEl, $triggerEl, {
                placement: placement ? placement : Default.placement,
                offset: offset ? parseInt(offset) : Default.offset,
                triggerType: triggerType
                    ? triggerType
                    : Default.triggerType,
            });
        }
        else {
            console.error("The popover element with id \"".concat(popoverID, "\" does not exist. Please check the data-popover-target attribute."));
        }
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Popover);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/popover/interface.js":
/*!***********************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/popover/interface.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=interface.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/popover/types.js":
/*!*******************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/popover/types.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=types.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/tabs/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/tabs/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "initTabs": () => (/* binding */ initTabs)
/* harmony export */ });
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Default = {
    defaultTabId: null,
    activeClasses: 'text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500',
    inactiveClasses: 'dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300',
    onShow: function () { },
};
var Tabs = /** @class */ (function () {
    function Tabs(items, options) {
        if (items === void 0) { items = []; }
        if (options === void 0) { options = Default; }
        this._items = items;
        this._activeTab = options ? this.getTab(options.defaultTabId) : null;
        this._options = __assign(__assign({}, Default), options);
        this._init();
    }
    Tabs.prototype._init = function () {
        var _this = this;
        if (this._items.length) {
            // set the first tab as active if not set by explicitly
            if (!this._activeTab) {
                this._setActiveTab(this._items[0]);
            }
            // force show the first default tab
            this.show(this._activeTab.id, true);
            // show tab content based on click
            this._items.map(function (tab) {
                tab.triggerEl.addEventListener('click', function () {
                    _this.show(tab.id);
                });
            });
        }
    };
    Tabs.prototype.getActiveTab = function () {
        return this._activeTab;
    };
    Tabs.prototype._setActiveTab = function (tab) {
        this._activeTab = tab;
    };
    Tabs.prototype.getTab = function (id) {
        return this._items.filter(function (t) { return t.id === id; })[0];
    };
    Tabs.prototype.show = function (id, forceShow) {
        var _a, _b;
        var _this = this;
        if (forceShow === void 0) { forceShow = false; }
        var tab = this.getTab(id);
        // don't do anything if already active
        if (tab === this._activeTab && !forceShow) {
            return;
        }
        // hide other tabs
        this._items.map(function (t) {
            var _a, _b;
            if (t !== tab) {
                (_a = t.triggerEl.classList).remove.apply(_a, _this._options.activeClasses.split(' '));
                (_b = t.triggerEl.classList).add.apply(_b, _this._options.inactiveClasses.split(' '));
                t.targetEl.classList.add('hidden');
                t.triggerEl.setAttribute('aria-selected', 'false');
            }
        });
        // show active tab
        (_a = tab.triggerEl.classList).add.apply(_a, this._options.activeClasses.split(' '));
        (_b = tab.triggerEl.classList).remove.apply(_b, this._options.inactiveClasses.split(' '));
        tab.triggerEl.setAttribute('aria-selected', 'true');
        tab.targetEl.classList.remove('hidden');
        this._setActiveTab(tab);
        // callback function
        this._options.onShow(this, tab);
    };
    return Tabs;
}());
if (typeof window !== 'undefined') {
    window.Tabs = Tabs;
}
function initTabs() {
    document.querySelectorAll('[data-tabs-toggle]').forEach(function ($triggerEl) {
        var tabItems = [];
        var defaultTabId = null;
        $triggerEl
            .querySelectorAll('[role="tab"]')
            .forEach(function ($triggerEl) {
            var isActive = $triggerEl.getAttribute('aria-selected') === 'true';
            var tab = {
                id: $triggerEl.getAttribute('data-tabs-target'),
                triggerEl: $triggerEl,
                targetEl: document.querySelector($triggerEl.getAttribute('data-tabs-target')),
            };
            tabItems.push(tab);
            if (isActive) {
                defaultTabId = tab.id;
            }
        });
        new Tabs(tabItems, {
            defaultTabId: defaultTabId,
        });
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tabs);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/tabs/interface.js":
/*!********************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/tabs/interface.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=interface.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/tabs/types.js":
/*!****************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/tabs/types.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=types.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/tooltip/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/tooltip/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "initTooltips": () => (/* binding */ initTooltips)
/* harmony export */ });
/* harmony import */ var _popperjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/popper.js");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/* eslint-disable @typescript-eslint/no-empty-function */

var Default = {
    placement: 'top',
    triggerType: 'hover',
    onShow: function () { },
    onHide: function () { },
    onToggle: function () { },
};
var Tooltip = /** @class */ (function () {
    function Tooltip(targetEl, triggerEl, options) {
        if (targetEl === void 0) { targetEl = null; }
        if (triggerEl === void 0) { triggerEl = null; }
        if (options === void 0) { options = Default; }
        this._targetEl = targetEl;
        this._triggerEl = triggerEl;
        this._options = __assign(__assign({}, Default), options);
        this._popperInstance = this._createPopperInstance();
        this._visible = false;
        this._init();
    }
    Tooltip.prototype._init = function () {
        if (this._triggerEl) {
            this._setupEventListeners();
        }
    };
    Tooltip.prototype._setupEventListeners = function () {
        var _this = this;
        var triggerEvents = this._getTriggerEvents();
        triggerEvents.showEvents.forEach(function (ev) {
            _this._triggerEl.addEventListener(ev, function () {
                _this.show();
            });
        });
        triggerEvents.hideEvents.forEach(function (ev) {
            _this._triggerEl.addEventListener(ev, function () {
                _this.hide();
            });
        });
    };
    Tooltip.prototype._createPopperInstance = function () {
        return (0,_popperjs_core__WEBPACK_IMPORTED_MODULE_0__.createPopper)(this._triggerEl, this._targetEl, {
            placement: this._options.placement,
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 8],
                    },
                },
            ],
        });
    };
    Tooltip.prototype._getTriggerEvents = function () {
        switch (this._options.triggerType) {
            case 'hover':
                return {
                    showEvents: ['mouseenter', 'focus'],
                    hideEvents: ['mouseleave', 'blur'],
                };
            case 'click':
                return {
                    showEvents: ['click', 'focus'],
                    hideEvents: ['focusout', 'blur'],
                };
            case 'none':
                return {
                    showEvents: [],
                    hideEvents: [],
                };
            default:
                return {
                    showEvents: ['mouseenter', 'focus'],
                    hideEvents: ['mouseleave', 'blur'],
                };
        }
    };
    Tooltip.prototype._setupKeydownListener = function () {
        var _this = this;
        this._keydownEventListener = function (ev) {
            if (ev.key === 'Escape') {
                _this.hide();
            }
        };
        document.body.addEventListener('keydown', this._keydownEventListener, true);
    };
    Tooltip.prototype._removeKeydownListener = function () {
        document.body.removeEventListener('keydown', this._keydownEventListener, true);
    };
    Tooltip.prototype._setupClickOutsideListener = function () {
        var _this = this;
        this._clickOutsideEventListener = function (ev) {
            _this._handleClickOutside(ev, _this._targetEl);
        };
        document.body.addEventListener('click', this._clickOutsideEventListener, true);
    };
    Tooltip.prototype._removeClickOutsideListener = function () {
        document.body.removeEventListener('click', this._clickOutsideEventListener, true);
    };
    Tooltip.prototype._handleClickOutside = function (ev, targetEl) {
        var clickedEl = ev.target;
        if (clickedEl !== targetEl &&
            !targetEl.contains(clickedEl) &&
            !this._triggerEl.contains(clickedEl) &&
            this.isVisible()) {
            this.hide();
        }
    };
    Tooltip.prototype.isVisible = function () {
        return this._visible;
    };
    Tooltip.prototype.toggle = function () {
        if (this.isVisible()) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    Tooltip.prototype.show = function () {
        this._targetEl.classList.remove('opacity-0', 'invisible');
        this._targetEl.classList.add('opacity-100', 'visible');
        // Enable the event listeners
        this._popperInstance.setOptions(function (options) { return (__assign(__assign({}, options), { modifiers: __spreadArray(__spreadArray([], options.modifiers, true), [
                { name: 'eventListeners', enabled: true },
            ], false) })); });
        // handle click outside
        this._setupClickOutsideListener();
        // handle esc keydown
        this._setupKeydownListener();
        // Update its position
        this._popperInstance.update();
        // set visibility
        this._visible = true;
        // callback function
        this._options.onShow(this);
    };
    Tooltip.prototype.hide = function () {
        this._targetEl.classList.remove('opacity-100', 'visible');
        this._targetEl.classList.add('opacity-0', 'invisible');
        // Disable the event listeners
        this._popperInstance.setOptions(function (options) { return (__assign(__assign({}, options), { modifiers: __spreadArray(__spreadArray([], options.modifiers, true), [
                { name: 'eventListeners', enabled: false },
            ], false) })); });
        // handle click outside
        this._removeClickOutsideListener();
        // handle esc keydown
        this._removeKeydownListener();
        // set visibility
        this._visible = false;
        // callback function
        this._options.onHide(this);
    };
    return Tooltip;
}());
if (typeof window !== 'undefined') {
    window.Tooltip = Tooltip;
}
function initTooltips() {
    document.querySelectorAll('[data-tooltip-target]').forEach(function ($triggerEl) {
        var tooltipId = $triggerEl.getAttribute('data-tooltip-target');
        var $tooltipEl = document.getElementById(tooltipId);
        if ($tooltipEl) {
            var triggerType = $triggerEl.getAttribute('data-tooltip-trigger');
            var placement = $triggerEl.getAttribute('data-tooltip-placement');
            new Tooltip($tooltipEl, $triggerEl, {
                placement: placement ? placement : Default.placement,
                triggerType: triggerType
                    ? triggerType
                    : Default.triggerType,
            });
        }
        else {
            console.error("The tooltip element with id \"".concat(tooltipId, "\" does not exist. Please check the data-tooltip-target attribute."));
        }
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tooltip);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/tooltip/interface.js":
/*!***********************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/tooltip/interface.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=interface.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/components/tooltip/types.js":
/*!*******************************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/components/tooltip/types.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=types.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/dom/events.js":
/*!*****************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/dom/events.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Events = /** @class */ (function () {
    function Events(eventType, eventFunctions) {
        if (eventFunctions === void 0) { eventFunctions = []; }
        this._eventType = eventType;
        this._eventFunctions = eventFunctions;
    }
    Events.prototype.init = function () {
        var _this = this;
        this._eventFunctions.forEach(function (eventFunction) {
            if (typeof window !== 'undefined') {
                window.addEventListener(_this._eventType, eventFunction);
            }
        });
    };
    return Events;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Events);
//# sourceMappingURL=events.js.map

/***/ }),

/***/ "./node_modules/flowbite/lib/esm/index.js":
/*!************************************************!*\
  !*** ./node_modules/flowbite/lib/esm/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Accordion": () => (/* reexport safe */ _components_accordion__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "Carousel": () => (/* reexport safe */ _components_carousel__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "Collapse": () => (/* reexport safe */ _components_collapse__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "Dial": () => (/* reexport safe */ _components_dial__WEBPACK_IMPORTED_MODULE_11__["default"]),
/* harmony export */   "Dismiss": () => (/* reexport safe */ _components_dismiss__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "Drawer": () => (/* reexport safe */ _components_drawer__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   "Dropdown": () => (/* reexport safe */ _components_dropdown__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "Modal": () => (/* reexport safe */ _components_modal__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   "Popover": () => (/* reexport safe */ _components_popover__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   "Tabs": () => (/* reexport safe */ _components_tabs__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   "Tooltip": () => (/* reexport safe */ _components_tooltip__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   "initAccordions": () => (/* reexport safe */ _components_accordion__WEBPACK_IMPORTED_MODULE_1__.initAccordions),
/* harmony export */   "initCarousels": () => (/* reexport safe */ _components_carousel__WEBPACK_IMPORTED_MODULE_3__.initCarousels),
/* harmony export */   "initCollapses": () => (/* reexport safe */ _components_collapse__WEBPACK_IMPORTED_MODULE_2__.initCollapses),
/* harmony export */   "initDials": () => (/* reexport safe */ _components_dial__WEBPACK_IMPORTED_MODULE_11__.initDials),
/* harmony export */   "initDismisses": () => (/* reexport safe */ _components_dismiss__WEBPACK_IMPORTED_MODULE_4__.initDismisses),
/* harmony export */   "initDrawers": () => (/* reexport safe */ _components_drawer__WEBPACK_IMPORTED_MODULE_7__.initDrawers),
/* harmony export */   "initDropdowns": () => (/* reexport safe */ _components_dropdown__WEBPACK_IMPORTED_MODULE_5__.initDropdowns),
/* harmony export */   "initFlowbite": () => (/* reexport safe */ _components_index__WEBPACK_IMPORTED_MODULE_34__.initFlowbite),
/* harmony export */   "initModals": () => (/* reexport safe */ _components_modal__WEBPACK_IMPORTED_MODULE_6__.initModals),
/* harmony export */   "initPopovers": () => (/* reexport safe */ _components_popover__WEBPACK_IMPORTED_MODULE_10__.initPopovers),
/* harmony export */   "initTabs": () => (/* reexport safe */ _components_tabs__WEBPACK_IMPORTED_MODULE_8__.initTabs),
/* harmony export */   "initTooltips": () => (/* reexport safe */ _components_tooltip__WEBPACK_IMPORTED_MODULE_9__.initTooltips)
/* harmony export */ });
/* harmony import */ var _dom_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom/events */ "./node_modules/flowbite/lib/esm/dom/events.js");
/* harmony import */ var _components_accordion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/accordion */ "./node_modules/flowbite/lib/esm/components/accordion/index.js");
/* harmony import */ var _components_collapse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/collapse */ "./node_modules/flowbite/lib/esm/components/collapse/index.js");
/* harmony import */ var _components_carousel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/carousel */ "./node_modules/flowbite/lib/esm/components/carousel/index.js");
/* harmony import */ var _components_dismiss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/dismiss */ "./node_modules/flowbite/lib/esm/components/dismiss/index.js");
/* harmony import */ var _components_dropdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/dropdown */ "./node_modules/flowbite/lib/esm/components/dropdown/index.js");
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/modal */ "./node_modules/flowbite/lib/esm/components/modal/index.js");
/* harmony import */ var _components_drawer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/drawer */ "./node_modules/flowbite/lib/esm/components/drawer/index.js");
/* harmony import */ var _components_tabs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/tabs */ "./node_modules/flowbite/lib/esm/components/tabs/index.js");
/* harmony import */ var _components_tooltip__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/tooltip */ "./node_modules/flowbite/lib/esm/components/tooltip/index.js");
/* harmony import */ var _components_popover__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/popover */ "./node_modules/flowbite/lib/esm/components/popover/index.js");
/* harmony import */ var _components_dial__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/dial */ "./node_modules/flowbite/lib/esm/components/dial/index.js");
/* harmony import */ var _components_accordion_types__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/accordion/types */ "./node_modules/flowbite/lib/esm/components/accordion/types.js");
/* harmony import */ var _components_carousel_types__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/carousel/types */ "./node_modules/flowbite/lib/esm/components/carousel/types.js");
/* harmony import */ var _components_collapse_types__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/collapse/types */ "./node_modules/flowbite/lib/esm/components/collapse/types.js");
/* harmony import */ var _components_dial_types__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/dial/types */ "./node_modules/flowbite/lib/esm/components/dial/types.js");
/* harmony import */ var _components_dismiss_types__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/dismiss/types */ "./node_modules/flowbite/lib/esm/components/dismiss/types.js");
/* harmony import */ var _components_drawer_types__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/drawer/types */ "./node_modules/flowbite/lib/esm/components/drawer/types.js");
/* harmony import */ var _components_dropdown_types__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/dropdown/types */ "./node_modules/flowbite/lib/esm/components/dropdown/types.js");
/* harmony import */ var _components_modal_types__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/modal/types */ "./node_modules/flowbite/lib/esm/components/modal/types.js");
/* harmony import */ var _components_popover_types__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components/popover/types */ "./node_modules/flowbite/lib/esm/components/popover/types.js");
/* harmony import */ var _components_tabs_types__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/tabs/types */ "./node_modules/flowbite/lib/esm/components/tabs/types.js");
/* harmony import */ var _components_tooltip_types__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./components/tooltip/types */ "./node_modules/flowbite/lib/esm/components/tooltip/types.js");
/* harmony import */ var _components_accordion_interface__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./components/accordion/interface */ "./node_modules/flowbite/lib/esm/components/accordion/interface.js");
/* harmony import */ var _components_carousel_interface__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./components/carousel/interface */ "./node_modules/flowbite/lib/esm/components/carousel/interface.js");
/* harmony import */ var _components_collapse_interface__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./components/collapse/interface */ "./node_modules/flowbite/lib/esm/components/collapse/interface.js");
/* harmony import */ var _components_dial_interface__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./components/dial/interface */ "./node_modules/flowbite/lib/esm/components/dial/interface.js");
/* harmony import */ var _components_dismiss_interface__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./components/dismiss/interface */ "./node_modules/flowbite/lib/esm/components/dismiss/interface.js");
/* harmony import */ var _components_drawer_interface__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./components/drawer/interface */ "./node_modules/flowbite/lib/esm/components/drawer/interface.js");
/* harmony import */ var _components_dropdown_interface__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./components/dropdown/interface */ "./node_modules/flowbite/lib/esm/components/dropdown/interface.js");
/* harmony import */ var _components_modal_interface__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./components/modal/interface */ "./node_modules/flowbite/lib/esm/components/modal/interface.js");
/* harmony import */ var _components_popover_interface__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./components/popover/interface */ "./node_modules/flowbite/lib/esm/components/popover/interface.js");
/* harmony import */ var _components_tabs_interface__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./components/tabs/interface */ "./node_modules/flowbite/lib/esm/components/tabs/interface.js");
/* harmony import */ var _components_tooltip_interface__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./components/tooltip/interface */ "./node_modules/flowbite/lib/esm/components/tooltip/interface.js");
/* harmony import */ var _components_index__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./components/index */ "./node_modules/flowbite/lib/esm/components/index.js");












// setup events for data attributes
var events = new _dom_events__WEBPACK_IMPORTED_MODULE_0__["default"]('load', [
    _components_accordion__WEBPACK_IMPORTED_MODULE_1__.initAccordions,
    _components_collapse__WEBPACK_IMPORTED_MODULE_2__.initCollapses,
    _components_carousel__WEBPACK_IMPORTED_MODULE_3__.initCarousels,
    _components_dismiss__WEBPACK_IMPORTED_MODULE_4__.initDismisses,
    _components_dropdown__WEBPACK_IMPORTED_MODULE_5__.initDropdowns,
    _components_modal__WEBPACK_IMPORTED_MODULE_6__.initModals,
    _components_drawer__WEBPACK_IMPORTED_MODULE_7__.initDrawers,
    _components_tabs__WEBPACK_IMPORTED_MODULE_8__.initTabs,
    _components_tooltip__WEBPACK_IMPORTED_MODULE_9__.initTooltips,
    _components_popover__WEBPACK_IMPORTED_MODULE_10__.initPopovers,
    _components_dial__WEBPACK_IMPORTED_MODULE_11__.initDials,
]);
events.init();
// export all components











// export all types











// export all interfaces











// export init functions











// export all init functions

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./src/product.ts":
/*!************************!*\
  !*** ./src/product.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
var flowbite_1 = __webpack_require__(/*! flowbite */ "./node_modules/flowbite/lib/esm/index.js");
var bundle_1 = __webpack_require__(/*! @easepick/bundle */ "./node_modules/@easepick/bundle/dist/index.esm.js");
// global variable for mandatory event instance
var eventCheckbox = document.querySelector('#product-show-events-toggle-btn');
var eventStockOwnByMeCheckbox = document.querySelector('#product-show-events-stocks-own-by-me-btn');
// mark checkbox as checked if we are on event stock own by me route
if (window.location.pathname + window.location.hash === '/product/events_stocks_owned_by_me') {
    eventStockOwnByMeCheckbox.checked = true;
}
var isEvent = eventCheckbox.checked || eventStockOwnByMeCheckbox.checked;
var eventsWarehouse = 'Warehouse Events';
var eventMasterGroup = 'Events';
var fiveDays = 5 * 24 * 60 * 60 * 1000;
// variable to set default image to brand dynamically in modal window. Can we get link from the internet?
var defaultBrandImage = 'https://funko.com/on/demandware.static/-/Sites-funko-master-catalog/default/dwbb38a111/images/funko/upload/55998_CocaCola_S2_SpriteBottleCap_POP_GLAM-WEB.png';
// check if product has filter and display it
var filterJsonData = {};
var filterJsonObject = sessionStorage.getItem('filterJsonData');
var filterData = JSON.parse(filterJsonObject);
if (filterData !== null || filterData !== undefined) {
    var isVisibleFilterJson = sessionStorage.getItem('isVisibleFilter');
    var isVisibleFilter = JSON.parse(isVisibleFilterJson);
    if (isVisibleFilter) {
        var referenceTh = document.querySelector('#product-table-th-product-type');
        var productItemTrs = document.querySelectorAll('.table-product-item-tr');
        for (var key in filterData) {
            var productFilterTh = document.createElement('th');
            productFilterTh.setAttribute('id', "product-table-filter-master-group-".concat(key.replace(/ /g, '_')));
            productFilterTh.classList.add('px-6', 'py-3', 'max-width-100');
            productFilterTh.setAttribute('scope', 'col');
            productFilterTh.innerHTML = key;
            referenceTh.parentNode.insertBefore(productFilterTh, referenceTh.nextSibling);
        }
        productItemTrs.forEach(function (product) {
            var referenceTd = product.cells[4];
            var productSKU = product.cells[3].innerText;
            for (var key in filterData) {
                var productFilterName = filterData[key];
                var productFilterTd = document.createElement('td');
                productFilterTd.setAttribute('id', "product-table-filter-".concat(key, "-").concat(productFilterName.replace(/ /g, '_'), "-").concat(productSKU.replace(/ /g, '_')));
                productFilterTd.classList.add('text-base', 'font-normal', 'text-gray-900', 'whitespace-nowrap', 'dark:text-white', 'max-width-100');
                productFilterTd.innerHTML = "\n        <div class=\"pl-3\">\n          <div class=\"text-sm\">".concat(productFilterName, "</div>\n        </div>\n      ");
                referenceTd.parentNode.insertBefore(productFilterTd, referenceTd.nextSibling);
            }
        });
        isVisibleFilter = false;
        sessionStorage.setItem('isVisibleFilter', JSON.stringify(isVisibleFilter));
    }
}
// function to add column by filter
function createCustomizeViewColumn(productsGroups, groupName) {
    //choose position in table
    var positionInTable = 4;
    var productTableHeader = document.querySelector('#product-table-header-tr');
    var productItemTrs = document.querySelectorAll('.table-product-item-tr');
    var productItemHeaderReference = productTableHeader.children[positionInTable];
    var productItemHeader = productItemHeaderReference.cloneNode(true);
    productItemHeader.setAttribute('id', "product-table-filter-master-group-".concat(groupName));
    productItemHeader.innerHTML = groupName.replace(/_/g, ' ');
    productTableHeader.insertBefore(productItemHeader, productItemHeaderReference.nextSibling);
    productItemTrs.forEach(function (productItem) {
        var productItemReference = productItem.children[positionInTable];
        var productSKU = productItem.getAttribute('data-target-product-sku');
        var productItemTd = productItemReference.cloneNode(true);
        productItemTd.classList.add("product-table-item-td-".concat(groupName));
        productItemTd.innerHTML = productsGroups[productSKU][groupName.replace(/_/g, ' ')] || '-';
        productItem.insertBefore(productItemTd, productItemReference.nextSibling);
    });
}
//function to display filter by master group on load page
var groupBrand = 'Brand';
var globalFilterMasterGroup = JSON.parse(sessionStorage.getItem('globalFilterMasterGroup'));
if (!globalFilterMasterGroup) {
    globalFilterMasterGroup = [groupBrand];
    sessionStorage.setItem('globalFilterMasterGroup', JSON.stringify(globalFilterMasterGroup));
}
var productMgGGlobal = JSON.parse(sessionStorage.getItem('productMgG'));
// add brand to default global filter
if (!globalFilterMasterGroup.includes(groupBrand)) {
    globalFilterMasterGroup.push(groupBrand);
}
if (globalFilterMasterGroup && globalFilterMasterGroup.length !== 0) {
    var filterProductMasterGroupCheckboxes = document.querySelectorAll('.products-filter-product-master-group-checkbox');
    filterProductMasterGroupCheckboxes.forEach(function (checkbox) {
        if (globalFilterMasterGroup.includes(checkbox.value)) {
            checkbox.checked = true;
        }
    });
    for (var _i = 0, globalFilterMasterGroup_1 = globalFilterMasterGroup; _i < globalFilterMasterGroup_1.length; _i++) {
        var masterGroupName = globalFilterMasterGroup_1[_i];
        var isGroupExist = document.querySelector("#product-table-filter-master-group-".concat(masterGroupName));
        if (!isGroupExist) {
            createCustomizeViewColumn(productMgGGlobal, masterGroupName);
        }
    }
}
// function to display product master group in product table
var checkboxFilterProductMasterGroups = document.querySelectorAll('.products-filter-product-master-group-checkbox');
checkboxFilterProductMasterGroups.forEach(function (checkbox) {
    checkbox.addEventListener('change', function (e) {
        var productMgG = JSON.parse(checkbox.getAttribute('data-target-product-mg-g'));
        var globalFilterMasterGroup = JSON.parse(sessionStorage.getItem('globalFilterMasterGroup'));
        var masterGroupName = checkbox.getAttribute('data-target-group-name');
        var productItemTrs = document.querySelectorAll('.table-product-item-tr');
        var isActive = e.target.checked;
        if (isActive) {
            if (!globalFilterMasterGroup.includes(masterGroupName)) {
                globalFilterMasterGroup.push(masterGroupName);
            }
            sessionStorage.setItem('globalFilterMasterGroup', JSON.stringify(globalFilterMasterGroup));
            var isGroupExist = document.querySelector("#product-table-filter-master-group-".concat(masterGroupName));
            if (!isGroupExist) {
                createCustomizeViewColumn(productMgG, masterGroupName);
            }
        }
        if (!isActive) {
            var index = globalFilterMasterGroup.indexOf(masterGroupName);
            if (index !== -1) {
                globalFilterMasterGroup.splice(index, 1);
            }
            sessionStorage.setItem('globalFilterMasterGroup', JSON.stringify(globalFilterMasterGroup));
            var isMasterGroupExist = document.querySelector("#product-table-filter-master-group-".concat(masterGroupName));
            if (isMasterGroupExist) {
                isMasterGroupExist.remove();
                productItemTrs.forEach(function (productItem) {
                    var isProductFilterExist = productItem.querySelector(".product-table-item-td-".concat(masterGroupName));
                    if (isProductFilterExist) {
                        isProductFilterExist.remove();
                    }
                });
            }
        }
    });
});
var productRequestShareBrandSelector = document.querySelector('#product-request-share-define-brand');
var productRequestShareBrandSelectorOptions = productRequestShareBrandSelector.querySelectorAll('option');
var productRequestShareBrandSelectorOptionsAmount = productRequestShareBrandSelectorOptions.length;
if (!productRequestShareBrandSelectorOptionsAmount) {
    productRequestShareBrandSelector.classList.add('border-error-red');
    var messageParagraph = document.createElement('p');
    messageParagraph.classList.add('text-sm', 'text-red');
    messageParagraph.innerHTML =
        "You have no group! Please, define your group <a href='/user/' class='underlined'>here</a>";
    productRequestShareBrandSelector.parentNode.appendChild(messageParagraph);
}
var $requestShareModalElement = document.querySelector('#request-share-product-modal');
var $shipModalElement = document.querySelector('#ship-product-modal');
var $assignModalElement = document.querySelector('#assign-product-modal');
var $addProductModalElement = document.querySelector('#add-product-modal');
var $viewProductModalElement = document.querySelector('#view-product-modal');
var $adjustProductModalElement = document.querySelector('#adjust-product-modal');
var $editProductModalElement = document.querySelector('#editProductModal');
var $eventProductModalElement = document.querySelector('#event-product-modal');
var modalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: true,
    onHide: function () {
        var product = JSON.parse(sessionStorage.product);
        var mstrGroupsEntries = Object.entries(product.mstr_groups_groups);
        mstrGroupsEntries.forEach(function (_a) {
            var key = _a[0], value = _a[1];
            deleteShipAssignButton(value.replace(/\s/g, '_'), key);
        });
        clearProductGroupContainer();
        var productViewContainer = document.querySelector('#product-view-grid-container');
        productViewContainer.innerHTML = '';
    },
    onShow: function () { },
    onToggle: function () {
        console.log('modal has been toggled');
    },
};
var adjustModalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: true,
    onHide: function () {
        var product = JSON.parse(sessionStorage.product);
        var mstrGroupsEntries = Object.entries(product.mstr_groups_groups);
        mstrGroupsEntries.forEach(function (_a) {
            var key = _a[0], value = _a[1];
            deleteAdjustContainer(value.replace(/\s/g, '_'), key);
        });
        sessionStorage.removeItem('productInWarehouses');
    },
    onShow: function () { },
    onToggle: function () {
        console.log('modal has been toggled');
    },
};
var modalShipAssignOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: true,
    onHide: function () {
        sessionStorage.removeItem('product');
    },
    onShow: function () { },
    onToggle: function () {
        console.log('modal has been toggled');
    },
};
var modalEventOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-51',
    closable: true,
    onHide: function () {
        sessionStorage.removeItem('product');
    },
    onShow: function () { },
    onToggle: function () {
        console.log('modal has been toggled');
    },
};
var eventModalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-51',
    closable: true,
    onHide: function () {
        var product = JSON.parse(sessionStorage.product);
        var mstrGroupsEntries = Object.entries(product.mstr_groups_groups);
        mstrGroupsEntries.forEach(function (_a) {
            var key = _a[0], value = _a[1];
            deleteShipAssignButton(value.replace(/\s/g, '_'), key);
        });
        clearProductGroupContainer();
        picker.destroy();
    },
    onShow: function () {
        console.log('modal has been shown');
    },
    onToggle: function () {
        console.log('modal has been toggled');
    },
};
var addModal = new flowbite_1.Modal($addProductModalElement, modalOptions);
var viewModal = new flowbite_1.Modal($viewProductModalElement, modalOptions);
var adjustModal = new flowbite_1.Modal($adjustProductModalElement, adjustModalOptions);
var editModal = new flowbite_1.Modal($editProductModalElement, modalOptions);
var requestShareModal = new flowbite_1.Modal($requestShareModalElement, modalShipAssignOptions);
var shipModal = new flowbite_1.Modal($shipModalElement, modalShipAssignOptions);
var assignModal = new flowbite_1.Modal($assignModalElement, modalShipAssignOptions);
var eventModal = new flowbite_1.Modal($eventProductModalElement, eventModalOptions);
var closingAddModalButton = document.getElementById('add-product-modal-close-btn');
closingAddModalButton.addEventListener('click', function () {
    addModal.hide();
});
var closingAdjustModalButton = document.getElementById('adjust-product-modal-close-btn');
closingAdjustModalButton.addEventListener('click', function () {
    adjustModal.hide();
});
var closingEditModalButton = document.getElementById('edit-product-modal-close-btn');
closingEditModalButton.addEventListener('click', function () {
    editModal.hide();
});
var closingViewModalButton = document.getElementById('view-product-modal-close-btn');
closingViewModalButton.addEventListener('click', function () {
    viewModal.hide();
});
var closingEventModalButton = document.getElementById('event-product-modal-close-btn');
closingEventModalButton.addEventListener('click', function () {
    eventModal.hide();
});
var $buttonElements = document.querySelectorAll('.product-edit-button');
$buttonElements.forEach(function (e) {
    return e.addEventListener('click', function () {
        editProduct(JSON.parse(e.getAttribute('data-target')));
    });
});
var $addButtonElements = document.querySelectorAll('.product-add-button');
$addButtonElements.forEach(function (e) {
    return e.addEventListener('click', function () {
        var groups = JSON.parse(e.getAttribute('data-target-groups'));
        sessionStorage.setItem('groups', JSON.stringify(groups));
        addProduct(groups);
    });
});
// pick date range
var DateTime = bundle_1.easepick.DateTime;
function formatDate(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString();
    var day = date.getDate().toString();
    return "".concat(year, "-").concat(month, "-").concat(day);
}
function getFirstAndLastDate() {
    var today = new Date();
    var fifthDayBefore = new Date(today);
    fifthDayBefore.setDate(today.getDate() - 5);
    var fifthDayAfter = new Date(today);
    fifthDayAfter.setDate(today.getDate() + 6);
    return [formatDate(fifthDayBefore), formatDate(fifthDayAfter)];
}
var bookedDates = [getFirstAndLastDate()].map(function (d) {
    if (d instanceof Array) {
        var start = new Date(d[0]);
        var end = new Date(d[1]);
        return [start, end];
    }
    return new DateTime(d, 'YYYY-MM-DD');
});
var fetchedAmountByDate = [];
function getEventAvailableQuantity(product_id, group, calendarFilter) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/event/get_available_quantity?group_name=".concat(group.replace('_', ' '), "&product_id=").concat(product_id, "&dates=").concat(JSON.stringify(calendarFilter)))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    fetchedAmountByDate = data;
                    return [2 /*return*/, data];
            }
        });
    });
}
// search flow
var searchInput = document.querySelector('#table-search-products');
var searchInputButton = document.querySelector('#table-search-product-button');
if (searchInputButton && searchInput) {
    searchInputButton.addEventListener('click', function () {
        var url = new URL(window.location.href);
        url.searchParams.set('q', searchInput.value);
        window.location.href = "".concat(url.href);
    });
}
var deleteButtons = document.querySelectorAll('.delete-product-btn');
deleteButtons.forEach(function (e) {
    e.addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
        var id, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm('Are sure?')) return [3 /*break*/, 2];
                    id = e.getAttribute('data-product-id');
                    return [4 /*yield*/, fetch("/product/delete/".concat(id), {
                            method: 'DELETE',
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
function addProduct(groups) {
    addModal.show();
    var productMasterGroupAddSelect = document.querySelector('#product-master-group-add-add-product-1');
    var options = productMasterGroupAddSelect.querySelectorAll('option');
    productMasterGroupAddSelect.addEventListener('change', function () {
        options.forEach(function (e) {
            if (e.textContent === productMasterGroupAddSelect.options[productMasterGroupAddSelect.selectedIndex].text) {
                var groupSelect_1 = document.querySelector('#product-group-add-item-1');
                var optionCategory = groups[productMasterGroupAddSelect.options[productMasterGroupAddSelect.selectedIndex].text];
                groupSelect_1.innerHTML = '';
                if (optionCategory) {
                    optionCategory.forEach(function (group) {
                        var storeSelectOption = document.createElement('option');
                        storeSelectOption.setAttribute('value', group.group_id.toString());
                        storeSelectOption.textContent = group.group_name;
                        groupSelect_1.appendChild(storeSelectOption);
                    });
                }
            }
        });
    });
}
function editProduct(product) {
    var _a, _b, _c, _d;
    sessionStorage.setItem('product', JSON.stringify(product));
    var img = document.querySelector('#product-edit-show-image');
    var fullImageAnchor = img.closest('.product-full-image-anchor');
    fullImageAnchor.setAttribute('data-target-product-id', product.id.toString());
    product.image.length > 100 ? (img.src = "data:image/png;base64, ".concat(product.image)) : (img.src = defaultBrandImage);
    var input = document.querySelector('#product-edit-name');
    input.value = product.name;
    input = document.querySelector('#product-edit-id');
    input.value = product.id.toString();
    // a loop that adds additional fields
    input = document.querySelector('#product-edit-currency');
    product.currency ? (input.value = product.currency) : (input.value = 'Choose Currency');
    input = document.querySelector('#product-edit-regular_price');
    input.value = (_b = (_a = product.regular_price) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '0';
    input = document.querySelector('#product-edit-retail_price');
    input.value = (_d = (_c = product.retail_price) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : '0';
    input = document.querySelector('#product-edit-description');
    input.value = product.description;
    // General Info ->
    input = document.querySelector('#product-edit-SKU');
    input.value = product.SKU;
    input = document.querySelector('#product-edit-low_stock_level');
    product.low_stock_level ? (input.value = product.low_stock_level.toString()) : (input.value = '0');
    input = document.querySelector('#product-edit-program_year');
    product.program_year ? (input.value = product.program_year.toString()) : (input.value = '0');
    input = document.querySelector('#product-edit-package_qty');
    product.package_qty ? (input.value = product.package_qty.toString()) : (input.value = '0');
    input = document.querySelector('#product-edit-numb_of_items_per_case');
    product.numb_of_items_per_case ? (input.value = product.numb_of_items_per_case.toString()) : (input.value = '0');
    input = document.querySelector('#product-edit-numb_of_cases_per_outer_case');
    product.numb_of_cases_per_outer_case
        ? (input.value = product.numb_of_cases_per_outer_case.toString())
        : (input.value = '0');
    input = document.querySelector('#product-edit-comments');
    product.comments ? (input.value = product.comments) : (input.value = 'No comments');
    input = document.querySelector('#product-edit-notes-location');
    input.value = product.notes_location;
    // shipping
    input = document.querySelector('#product-edit-weight');
    product.weight ? (input.value = product.weight.toString()) : (input.value = '0');
    input = document.querySelector('#product-edit-length');
    product.length ? (input.value = product.length.toString()) : (input.value = '0');
    input = document.querySelector('#product-edit-width');
    product.width ? (input.value = product.width.toString()) : (input.value = '0');
    input = document.querySelector('#product-edit-height');
    product.height ? (input.value = product.height.toString()) : (input.value = '0');
    input = document.querySelector('#product-edit-next_url');
    input.value = window.location.href;
    var productMasterGroupEditSelect = document.querySelector('#product-master-group-edit-add-product-1');
    var options = productMasterGroupEditSelect.querySelectorAll('option');
    var productMasterGroups = Object.keys(product.mstr_grps_grps_names_in_prod);
    if (productMasterGroups.length > 0) {
        var productGroupsEditSelects = document.querySelectorAll('.product-group-edit-item');
        var _loop_1 = function (i) {
            if (i === 0) {
                var productGroupsEditSelect_1 = productGroupsEditSelects[i];
                productMasterGroupEditSelect.value = productMasterGroups[i];
                product.mstr_prod_grps_prod_grps_names[productMasterGroups[i]].forEach(function (group) {
                    var storeSelectOption = document.createElement('option');
                    storeSelectOption.setAttribute('value', group.group_id.toString());
                    storeSelectOption.textContent = group.group_name;
                    productGroupsEditSelect_1.appendChild(storeSelectOption);
                });
                // TODO: always select first option
                productGroupsEditSelect_1.value =
                    product.mstr_grps_grps_names_in_prod[productMasterGroups[i]][0].group_id.toString();
                productMasterGroupEditSelect.addEventListener('change', function () {
                    options.forEach(function (e) {
                        if (e.textContent === productMasterGroupEditSelect.options[productMasterGroupEditSelect.selectedIndex].text) {
                            var groupSelect_2 = document.querySelector('#product-group-edit-item-1');
                            var optionCategory = product.mstr_prod_grps_prod_grps_names[productMasterGroupEditSelect.options[productMasterGroupEditSelect.selectedIndex].text];
                            groupSelect_2.innerHTML = '';
                            if (optionCategory) {
                                optionCategory.forEach(function (group) {
                                    var storeSelectOption = document.createElement('option');
                                    storeSelectOption.setAttribute('value', group.group_id.toString());
                                    storeSelectOption.textContent = group.group_name;
                                    groupSelect_2.appendChild(storeSelectOption);
                                });
                            }
                        }
                    });
                });
                if (product.mstr_grps_grps_names_in_prod[productMasterGroups[i]].length > 1) {
                    for (var j = 1; j < product.mstr_grps_grps_names_in_prod[productMasterGroups[i]].length; j++) {
                        createProductGroupEditItem(null, productMasterGroups[i], j);
                    }
                    return "continue";
                }
                else {
                    return "continue";
                }
            }
            if (product.mstr_grps_grps_names_in_prod[productMasterGroups[i]].length > 0) {
                for (var j = 0; j < product.mstr_grps_grps_names_in_prod[productMasterGroups[i]].length; j++) {
                    createProductGroupEditItem(null, productMasterGroups[i], j);
                }
            }
            else {
                createProductGroupEditItem(null, productMasterGroups[i]);
            }
        };
        for (var i = 0; i < productMasterGroups.length; i++) {
            _loop_1(i);
        }
    }
    editModal.show();
    productMasterGroupEditSelect.addEventListener('change', function () {
        options.forEach(function (e) {
            if (e.textContent === productMasterGroupEditSelect.options[productMasterGroupEditSelect.selectedIndex].text) {
                var groupSelect_3 = document.querySelector('#product-group-edit-item-1');
                var optionCategory = product.mstr_prod_grps_prod_grps_names[productMasterGroupEditSelect.options[productMasterGroupEditSelect.selectedIndex].text];
                groupSelect_3.innerHTML = '';
                if (optionCategory) {
                    optionCategory.forEach(function (group) {
                        var storeSelectOption = document.createElement('option');
                        storeSelectOption.setAttribute('value', group.group_id.toString());
                        storeSelectOption.textContent = group.group_name;
                        groupSelect_3.appendChild(storeSelectOption);
                    });
                }
            }
        });
    });
}
var viewProductButtonElements = document.querySelectorAll('.product-view-button');
viewProductButtonElements.forEach(function (e) {
    return e.addEventListener('click', function () {
        var _a, _b, _c, _d;
        var bookingButton = document.querySelector('.product-booking-button');
        if (bookingButton) {
            bookingButton.setAttribute('data-target', e.getAttribute('data-target'));
        }
        var product = JSON.parse(e.getAttribute('data-target'));
        sessionStorage.setItem('product', JSON.stringify(product));
        var prodGroups = Object.keys(product.mstr_groups_groups);
        prodGroups.forEach(function (groupName) {
            var isEqual = false;
            var mstrGroupName = product.mstr_groups_groups[groupName];
            if (product.current_user_groups.hasOwnProperty(mstrGroupName)) {
                var currentUserValue = product.current_user_groups[mstrGroupName];
                if (currentUserValue.includes(groupName)) {
                    isEqual = true;
                }
            }
            if (mstrGroupName !== eventMasterGroup || isEvent) {
                addShipAssignShareButton(isEqual, mstrGroupName, groupName, product);
            }
        });
        var div = document.querySelector('#product-view-name');
        div.innerHTML = product.name;
        div = document.querySelector('#product-view-id');
        div.innerHTML = product.id.toString();
        var img = document.querySelector('#product-view-image');
        var fullImageAnchor = img.closest('.product-full-image-anchor');
        fullImageAnchor.setAttribute('data-target-product-id', product.id.toString());
        product.image.length > 100 ? (img.src = "data:image/png;base64, ".concat(product.image)) : (img.src = defaultBrandImage);
        div = document.querySelector('#product-view-regular_price');
        div.innerHTML = (_b = (_a = product.regular_price) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '0';
        div = document.querySelector('#product-view-retail_price');
        div.innerHTML = (_d = (_c = product.retail_price) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : '0';
        div = document.querySelector('#product-view-warehouse-qty');
        div.innerHTML = product.warehouse_product_qty.toString();
        // General Info ->
        div = document.querySelector('#product-view-SKU');
        div.innerHTML = product.SKU;
        div = document.querySelector('#product-view-package_qty');
        product.package_qty ? (div.innerHTML = product.package_qty.toString()) : (div.innerHTML = '0');
        div = document.querySelector('#product-view-numb_of_items_per_case');
        product.numb_of_items_per_case
            ? (div.innerHTML = product.numb_of_items_per_case.toString())
            : (div.innerHTML = '0');
        div = document.querySelector('#product-view-numb_of_cases_per_outer_case');
        product.numb_of_cases_per_outer_case
            ? (div.innerHTML = product.numb_of_cases_per_outer_case.toString())
            : (div.innerHTML = '0');
        div = document.querySelector('#product-view-comments');
        product.comments ? (div.innerHTML = product.comments.toString()) : (div.innerHTML = 'No comments');
        div = document.querySelector('#product-view-notes-location');
        product.notes_location ? (div.innerHTML = product.notes_location) : (div.innerHTML = 'No notes');
        div = document.querySelector('#product-view-next_url');
        div.innerHTML = window.location.href;
        product.warehouse_products.forEach(function (warehouseProduct) {
            var productViewContainer = document.querySelector('#product-view-grid-container');
            var warehouseTemplate = document.querySelector('#product-view-warehouse-template');
            var availableQuantityTemplate = document.querySelector('#product-view-available-quantity-template');
            var warehouseDiv = warehouseTemplate.cloneNode(true);
            var availableQuantityDiv = availableQuantityTemplate.cloneNode(true);
            warehouseDiv.classList.remove('hidden');
            availableQuantityDiv.classList.remove('hidden');
            var warehouseName = warehouseDiv.querySelector('.product-view-warehouse-name');
            var warehouseAvailableQuantity = availableQuantityDiv.querySelector('.product-view-warehouse-available-quantity');
            warehouseName.innerHTML = warehouseProduct.warehouse.name;
            warehouseAvailableQuantity.innerHTML = warehouseProduct.product_quantity.toString();
            productViewContainer.appendChild(warehouseDiv);
            productViewContainer.appendChild(availableQuantityDiv);
        });
        viewModal.show();
    });
});
var adjustProductButtonElements = document.querySelectorAll('.product-adjust-button');
adjustProductButtonElements.forEach(function (e) {
    return e.addEventListener('click', function () {
        var product = JSON.parse(e.getAttribute('data-target'));
        sessionStorage.setItem('product', JSON.stringify(product));
        var prodGroups = Object.keys(product.mstr_groups_groups);
        prodGroups.forEach(function (groupName) {
            var isEqual = false;
            var mstrGroupName = product.mstr_groups_groups[groupName];
            if (product.current_user_groups.hasOwnProperty(mstrGroupName)) {
                var currentUserValue = product.current_user_groups[mstrGroupName];
                if (currentUserValue.includes(groupName)) {
                    isEqual = true;
                }
            }
            createAdjustAction(isEqual, mstrGroupName, groupName, product);
        });
        var div = document.querySelector('#product-adjust-name');
        div.innerHTML = product.name;
        div = document.querySelector('#product-adjust-id');
        div.innerHTML = product.id.toString();
        div = document.querySelector('#product-adjust-SKU');
        div.innerHTML = product.SKU;
        var img = document.querySelector('#product-adjust-image');
        var fullImageAnchor = img.closest('.product-full-image-anchor');
        fullImageAnchor.setAttribute('data-target-product-id', product.id.toString());
        product.image.length > 100 ? (img.src = "data:image/png;base64, ".concat(product.image)) : (img.src = defaultBrandImage);
        div = document.querySelector('#product-adjust-next_url');
        div.innerHTML = window.location.href;
        adjustModal.show();
    });
});
// function to request share
// TODO refactor !!!
function requestShare(product, group) {
    var img = document.querySelector('#product-request-share-image');
    var fullImageAnchor = img.closest('.product-full-image-anchor');
    fullImageAnchor.setAttribute('data-target-product-id', product.id.toString());
    product.image.length > 100 ? (img.src = "data:image/png;base64, ".concat(product.image)) : (img.src = defaultBrandImage);
    var div = document.querySelector('#product-request-share-name');
    div.innerHTML = product.name;
    div = document.querySelector('#product-request-share-sku');
    div.innerHTML = product.SKU;
    var productSKUInput = document.querySelector('#product-sku');
    productSKUInput.value = product.SKU;
    div = document.querySelector('#product-request-share-available-quantity');
    div.innerHTML = product.available_quantity[group.replace('_', ' ')].toString();
    div = document.querySelector('#product-request-share-owner');
    // TODO change to something not hardcoded here and in rest funcs
    div.innerHTML = 'Mike';
    div = document.querySelector('#product-request-share-role');
    div.innerHTML = 'ADMIN';
    div = document.querySelector('#product-request-share-total-available-items');
    div.innerHTML = product.total_available_items[group.replace('_', ' ')].toString();
    var input = document.querySelector('#product-request-share-quantity');
    input.max = product.available_quantity[group.replace('_', ' ')].toString();
    input.min = '1';
    input = document.querySelector('#product-request-share-name-hidden-input');
    input.value = product.name;
    input = document.querySelector('#product-request-share-SKU-hidden-input');
    input.value = product.SKU;
    input = document.querySelector('#product-request-share-available-quantity-hidden-input');
    input.value = product.available_quantity[group.replace('_', ' ')].toString();
    var groupNameView = document.querySelector('#product-request-share-from-group');
    groupNameView.innerHTML = group.replace('_', ' ');
    var fromGroupId = document.querySelector('#from-group-id');
    fromGroupId.value = product.groups_ids[group.replace('_', ' ')].toString();
    requestShareModal.show();
}
// function to ship
function ship(product, group) {
    var img = document.querySelector('#product-ship-image');
    var fullImageAnchor = img.closest('.product-full-image-anchor');
    fullImageAnchor.setAttribute('data-target-product-id', product.id.toString());
    product.image.length > 100 ? (img.src = "data:image/png;base64, ".concat(product.image)) : (img.src = defaultBrandImage);
    var div = document.querySelector('#product-ship-name');
    div.innerHTML = product.name;
    div = document.querySelector('#product-ship-sku');
    div.innerHTML = product.SKU;
    div = document.querySelector('#product-ship-available-quantity');
    div.innerHTML = product.available_quantity[group.replace('_', ' ')].toString();
    div = document.querySelector('#product-ship-total-available-items');
    div.innerHTML = product.total_available_items[group.replace('_', ' ')].toString();
    var input = document.querySelector('#product-ship-product-id');
    input.value = product.id.toString();
    input = document.querySelector('#product-ship-desire-quantity');
    input.max = product.available_quantity[group.replace('_', ' ')].toString();
    input.min = '1';
    input = document.querySelector('#product-ship-group');
    input.value = group.replace('_', ' ');
    shipModal.show();
    // -----count rest quantity in ship request product modal------
    var desiredQuantityInput = document.querySelector('#product-ship-desire-quantity');
    desiredQuantityInput.setAttribute('max', product.available_quantity[group.replace('_', ' ')].toString());
    desiredQuantityInput.addEventListener('change', function () {
        var availableQuantityDiv = document.querySelector('#product-ship-available-quantity');
        availableQuantityDiv.textContent = product.available_quantity[group.replace('_', ' ')].toString();
        var desiredQuantity = parseInt(desiredQuantityInput.value);
        var availableQuantity = parseInt(availableQuantityDiv.textContent);
        if (desiredQuantity < 0) {
            desiredQuantityInput.value = '0';
        }
        else if (desiredQuantity > availableQuantity) {
            desiredQuantityInput.value = product.available_quantity[group.replace('_', ' ')].toString();
            availableQuantityDiv.textContent = '0';
        }
        else if (desiredQuantity) {
            availableQuantityDiv.textContent = (availableQuantity - desiredQuantity).toString();
        }
    });
}
var picker;
var calendarFilter = [];
// function to booking
function booking(product, group) {
    var img = document.querySelector('#product-event-image');
    var fullImageAnchor = img.closest('.product-full-image-anchor');
    fullImageAnchor.setAttribute('data-target-product-id', product.id.toString());
    product.image.length > 100 ? (img.src = "data:image/png;base64, ".concat(product.image)) : (img.src = defaultBrandImage);
    var div = document.querySelector('#product-event-name');
    div.innerHTML = product.name;
    div = document.querySelector('#product-event-SKU');
    div.innerHTML = product.SKU;
    var input = document.querySelector('#product-event-group-hidden');
    input.value = group.replace('_', ' ');
    input = document.querySelector('#product-event-product-id');
    input.value = product.id.toString();
    input = document.querySelector('#product-event-quantity');
    input.min = '1';
    input.max = product.available_quantity[group.replace('_', ' ')].toString();
    var currentDate = new Date();
    function createDatepicker() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                picker = new bundle_1.easepick.create({
                    element: document.getElementById('datepicker'),
                    css: [
                        'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
                        'https://easepick.com/css/demo_prices.css',
                        'https://easepick.com/css/demo_hotelcal.css',
                    ],
                    autoApply: true,
                    inline: true,
                    plugins: ['LockPlugin'],
                    LockPlugin: {
                        filter: function (date) {
                            if (date - +currentDate > fiveDays) {
                                return false;
                            }
                            else {
                                return true;
                            }
                        },
                    },
                    setup: function (picker) {
                        var _this = this;
                        picker.on('view', function (evt) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, view, date, target, day, fetchedAmountByDate;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = evt.detail, view = _a.view, date = _a.date, target = _a.target;
                                        if (view === 'CalendarDay') {
                                            day = parseInt(target.innerHTML);
                                            if (day === 1) {
                                                calendarFilter = [target.getAttribute('data-time')];
                                                return [2 /*return*/];
                                            }
                                            if (!calendarFilter.includes(target.getAttribute('data-time'))) {
                                                calendarFilter.push(target.getAttribute('data-time'));
                                            }
                                        }
                                        if (view.toLowerCase() !== 'main') {
                                            return [2 /*return*/];
                                        }
                                        return [4 /*yield*/, getEventAvailableQuantity(product.id, group, calendarFilter)];
                                    case 1:
                                        fetchedAmountByDate = (_b.sent());
                                        fetchedAmountByDate.forEach(function (_a, i) {
                                            var _b;
                                            var date = _a.date, quantity = _a.quantity;
                                            var dayContainer = document.querySelector('.easepick-wrapper');
                                            var dayContainerShadow = dayContainer.shadowRoot.querySelector("div[data-time='".concat(date, "']"));
                                            if (!dayContainerShadow) {
                                                return;
                                            }
                                            var span = (_b = dayContainerShadow.querySelector('.day-price')) !== null && _b !== void 0 ? _b : document.createElement('span');
                                            span.className = 'day-price';
                                            span.innerHTML = quantity.toString();
                                            dayContainerShadow.append(span);
                                        });
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    },
                });
                return [2 /*return*/];
            });
        });
    }
    createDatepicker();
    viewModal.hide();
    eventModal.show();
}
// function to assign
function assign(product, group) {
    var input = document.querySelector('#product-assign-name');
    input.value = product.name;
    input = document.querySelector('#product-assign-amount');
    input.max = product.available_quantity[group.replace('_', ' ')].toString();
    input.min = '1';
    var groupName = group.replace('_', ' ');
    input = document.querySelector('#product-assign-from-group');
    input.value = groupName;
    var group_id = product.groups_ids[groupName];
    input = document.querySelector('#product-assign-from-group_id');
    input.value = group_id.toString();
    assignModal.show();
}
// function to delete ship assign share button
function deleteShipAssignButton(nameGroup, nameGroupValue) {
    var shipAssignShareContainer = document.querySelector("#product-ship-assign-share-container-".concat(nameGroup.replace(/ /g, '_')));
    var groupContainer = document.querySelector("#product-view-product_group-container-".concat(nameGroupValue.replace(/ /g, '_')));
    if (shipAssignShareContainer) {
        shipAssignShareContainer.remove();
    }
    if (groupContainer) {
        groupContainer.remove();
    }
}
// function to add ship, assign, button to view product modal
function addShipAssignShareButton(isEqual, masterGroup, group, productParam) {
    var isEventItem = isEvent && masterGroup === eventMasterGroup;
    var groupUnderScore = group.replace(/ /g, '_');
    var groupProductIds = productParam.groups_ids;
    var productTypeContainer = document.querySelector("#product-view-product-name-container");
    var shipAssignContainer = document.createElement('div');
    shipAssignContainer.classList.add('sm:col-span-3', 'flex', 'gap-4');
    shipAssignContainer.setAttribute('id', "product-ship-assign-share-container-".concat(masterGroup.replace(/ /g, '_')));
    var shipAssignContainerDiv = "\n    <div>\n      <label for=\"name\" class=\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\">Available</label>\n        <div id=\"ship-product-quantity\"\n          class=\"shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500\">\n      ".concat(productParam.available_quantity[group] || 0, "</div>\n    </div>\n    <div>\n      <label for=\"product_group\" class=\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\" >Action</label >\n      <button ship-group-data=").concat(groupUnderScore, " type=\"button\" id=\"ship-product-button-").concat(groupUnderScore, "\" class=\"ship-product-button inline-flex items-center mr-2 px-3 py-2.5 text-sm font-medium text-center text-white rounded-lg bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900\">\n        <svg class=\"w-4 h-4 mr-2\" fill=\"currentColor\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z\"></path><path fill-rule=\"evenodd\" d=\"M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z\" clip-rule=\"evenodd\"></path></svg>\n        Ship\n      </button>\n      <button assign-group-data=").concat(groupUnderScore, " type=\"button\" id=\"assign-product-button-").concat(groupUnderScore, "\" class=\"assign-product-button inline-flex items-center px-3 py-2.5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800\">\n        <svg class=\"w-4 h-4 mr-2\" fill=\"currentColor\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z\"></path><path fill-rule=\"evenodd\" d=\"M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z\" clip-rule=\"evenodd\"></path></svg>\n        Assign\n      </button>\n    </div>\n  ");
    var bookingContainerDiv = "\n        <div>\n        <label for=\"product_group\" class=\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\" >Action</label >\n        <button ship-group-data=".concat(groupUnderScore, " type=\"button\" id=\"booking-product-button-").concat(groupUnderScore, "\" class=\"booking-product-button inline-flex items-center mr-2 px-3 py-2.5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800\">\n            <svg class=\"w-4 h-4 mr-2\" fill=\"currentColor\" viewBox=\"0 0 448 512\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path\n                d=\"M128 0c13.3 0 24 10.7 24 24V64H296V24c0-13.3 10.7-24 24-24s24 10.7 24 24V64h40c35.3 0 64 28.7 64 64v16 48V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192 144 128C0 92.7 28.7 64 64 64h40V24c0-13.3 10.7-24 24-24zM400 192H48V448c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V192zM329 297L217 409c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47 95-95c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z\"\n                clip-rule=\"evenodd\"></path>\n            </svg>\n            Booking\n        </button>\n        </div>\n    ");
    isEventItem
        ? (shipAssignContainer.innerHTML = bookingContainerDiv)
        : (shipAssignContainer.innerHTML = shipAssignContainerDiv);
    var shareContainer = document.createElement('div');
    var shipProductBtn = shipAssignContainer.querySelector("#ship-product-button-".concat(groupUnderScore));
    var assignProductBtn = shipAssignContainer.querySelector("#assign-product-button-".concat(groupUnderScore));
    shareContainer.classList.add('sm:col-span-3', 'flex', 'gap-4');
    shareContainer.setAttribute('id', "product-ship-assign-share-container-".concat(masterGroup.replace(/ /g, '_')));
    shareContainer.innerHTML = "\n    <div>\n      <label for=\"name\" class=\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\">Available</label>\n        <div id=\"ship-product-quantity\"\n          class=\"shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500\">\n      ".concat(productParam.available_quantity[group] || 0, "</div>\n    </div>\n    <div>\n      <label for=\"product_group\" class=\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\" >Action</label >\n      <button share-group-data=").concat(groupUnderScore, " type=\"button\" id=\"share-product-button-").concat(groupUnderScore, "\" class=\"request-share-product-button inline-flex items-center px-3 py-2.5 text-sm font-medium text-center text-white rounded-lg bg-yellow-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800\">\n        <svg class=\"w-4 h-4 mr-2\" fill=\"currentColor\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z\"></path><path fill-rule=\"evenodd\" d=\"M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z\" clip-rule=\"evenodd\"></path></svg>\n        Request Share\n      </button>\n    </div>\n  ");
    var shareProductBtn = shareContainer.querySelector("#share-product-button-".concat(groupUnderScore));
    if (productParam.available_quantity[group] === 0 || !productParam.available_quantity[group]) {
        if (shipProductBtn && assignProductBtn) {
            shipProductBtn.classList.add('invisible');
            assignProductBtn.classList.add('invisible');
        }
        // TODO: Ask client about share request when === 0
        shareProductBtn.classList.add('invisible');
    }
    if (isEqual) {
        productTypeContainer.parentNode.insertBefore(shipAssignContainer, productTypeContainer.nextSibling);
    }
    else {
        productTypeContainer.parentNode.insertBefore(shareContainer, productTypeContainer.nextSibling);
    }
    if (isEventItem) {
        var bookingButtons = document.querySelectorAll('.booking-product-button');
        bookingButtons.forEach(function (e) {
            return e.addEventListener('click', function () {
                var shipGroup = e.getAttribute('ship-group-data');
                var product = JSON.parse(sessionStorage.product);
                booking(product, shipGroup);
            });
        });
    }
    var shipButtons = document.querySelectorAll('.ship-product-button');
    shipButtons.forEach(function (e) {
        return e.addEventListener('click', function () {
            viewModal.hide();
            editModal.hide();
            var shipGroup = e.getAttribute('ship-group-data');
            var product = JSON.parse(sessionStorage.product);
            ship(product, shipGroup);
        });
    });
    var assignButtons = document.querySelectorAll('.assign-product-button');
    assignButtons.forEach(function (e) {
        return e.addEventListener('click', function () {
            viewModal.hide();
            editModal.hide();
            var assignGroup = e.getAttribute('assign-group-data');
            var product = JSON.parse(sessionStorage.product);
            assign(product, assignGroup);
        });
    });
    var requestShareButtons = document.querySelectorAll('.request-share-product-button');
    requestShareButtons.forEach(function (e) {
        return e.addEventListener('click', function () {
            viewModal.hide();
            editModal.hide();
            var shareGroup = e.getAttribute('share-group-data');
            var product = JSON.parse(sessionStorage.product);
            requestShare(product, shareGroup);
        });
    });
    var productViewTypeContainer = document.querySelector('#product-view-product-name-container');
    var productMasterGroupContainer = document.createElement('div');
    productMasterGroupContainer.classList.add('sm:col-span-3');
    productMasterGroupContainer.setAttribute('id', "product-view-product_group-container-".concat(groupUnderScore));
    productMasterGroupContainer.innerHTML = "\n    <label for=\"for-group-".concat(groupUnderScore, "\"\n      class=\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\">").concat(masterGroup, "</label>\n    <select type=\"text\" name=\"group-").concat(groupUnderScore, "\" id=\"product-view-").concat(groupUnderScore, "\"\n      class=\"shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500\"\n      placeholder=\"Some Group\" required\n    >\n      <option value=\"").concat(groupProductIds[group], "\">").concat(group, "</option>\n    </select>\n    ");
    productViewTypeContainer.parentNode.insertBefore(productMasterGroupContainer, productViewTypeContainer.nextSibling);
}
// function to filter products by group
var productFilterInputs = document.querySelectorAll('.product-filter-input');
var filterProductButton = document.querySelector('#product-filter-button');
var filterRadioButtons = document.querySelectorAll('.product-filter-radio-button');
filterRadioButtons.forEach(function (btn) {
    var filterButtonId = btn.getAttribute('id');
    var filterJsonDataStorage = sessionStorage.getItem('filterJsonData');
    var filterJsonDataObject = JSON.parse(filterJsonDataStorage);
    for (var key in filterJsonDataObject) {
        if (filterButtonId.includes(key)) {
            btn.innerHTML = "\n        ".concat(filterJsonDataObject[key], "\n        <svg class=\"w-2.5 h-2.5 ml-2.5\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\"\n          viewBox=\"0 0 10 6\">\n          <path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"\n            d=\"m1 1 4 4 4-4\" />\n        </svg>");
        }
    }
});
productFilterInputs.forEach(function (input) {
    input.addEventListener('change', function () {
        var filterInputDataTarget = input.getAttribute('data-target');
        var masterGroup = filterInputDataTarget
            .split(',')[1]
            .replace(/[^a-zA-Z0-9\s\_]/g, '')
            .trim();
        var filterInputId = filterInputDataTarget.split(',')[0].replace(/[^a-zA-Z0-9\s\_]/g, '');
        var filterInputIdString = "#product-filter-input-".concat(filterInputId);
        var filterButtonId = filterInputDataTarget
            .split(',')[1]
            .trim()
            .replace(/[^a-zA-Z0-9\s\_]/g, '');
        var filterInput = document.querySelector(filterInputIdString);
        var filterRadioBtn = document.querySelector("#dropdownRadioButton-".concat(filterButtonId));
        if (filterInputIdString.includes(filterButtonId) && input.value === masterGroup) {
            filterRadioBtn.innerHTML = "\n        ".concat(filterButtonId.split('_').join(' '), "\n        <svg class=\"w-2.5 h-2.5 ml-2.5\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\"\n          viewBox=\"0 0 10 6\">\n          <path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"\n            d=\"m1 1 4 4 4-4\" />\n        </svg>\n      ");
            getSessionStorageObject(filterJsonData, 'filterJsonData', 'remove', filterButtonId);
            return;
        }
        filterRadioBtn.innerHTML = "\n      ".concat(filterInput.value.split('_').join(' '), "\n      <svg class=\"w-2.5 h-2.5 ml-2.5\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\"\n        viewBox=\"0 0 10 6\">\n        <path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"\n          d=\"m1 1 4 4 4-4\" />\n      </svg>\n      ");
        filterJsonData[filterButtonId] = filterInput.value.split('_').join(' ');
        getSessionStorageObject(filterJsonData, 'filterJsonData', 'add');
    });
});
filterProductButton.addEventListener('click', function (e) {
    var hiddenInput = document.querySelector('#sort_by');
    var filterJsonDataStorage = sessionStorage.getItem('filterJsonData');
    var filterDataObject = JSON.parse(filterJsonDataStorage);
    filterJsonData = filterDataObject;
    hiddenInput.value = JSON.stringify(filterJsonData);
    sessionStorage.setItem('filterJsonData', JSON.stringify(filterJsonData));
    var isVisibleFilter = true;
    sessionStorage.setItem('isVisibleFilter', JSON.stringify(isVisibleFilter));
});
function getSessionStorageObject(localObject, sessionObject, method, objectKey) {
    if (method === void 0) { method = 'none'; }
    if (objectKey === void 0) { objectKey = 'none'; }
    var jsonDataObject = sessionStorage.getItem(sessionObject);
    var dataObject = JSON.parse(jsonDataObject);
    switch (method) {
        case 'add':
            var newDataObject = __assign(__assign({}, dataObject), localObject);
            var newJsonData = JSON.stringify(newDataObject);
            sessionStorage.setItem(sessionObject, newJsonData);
            break;
        case 'remove':
            delete dataObject[objectKey];
            var newJsonDataObject = JSON.stringify(dataObject);
            sessionStorage.setItem(sessionObject, newJsonDataObject);
            break;
        default:
            break;
    }
}
function createAdjustAction(isEqual, masterGroup, group, productParam) {
    var productInWarehouses = sessionStorage.setItem('productInWarehouses', JSON.stringify(productParam.product_in_warehouses));
    var groupUnderScore = group.replace(/ /g, '_');
    var groupProductIds = productParam.groups_ids;
    var productTypeContainer = document.querySelector("#product-adjust-product-name-container");
    var adjustContainer = document.createElement('div');
    adjustContainer.classList.add('sm:col-span-2', 'flex', 'gap-4');
    adjustContainer.setAttribute('id', "product-adjust-container-".concat(groupUnderScore));
    adjustContainer.innerHTML = "\n    <div>\n      <label for=\"adjust-product-quantity-".concat(groupUnderScore, "\" class=\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\">Available</label>\n        <input id=\"adjust-product-quantity-").concat(groupUnderScore, "\"\n          class=\"product-adjust-group-quantity shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500\">\n    </div>\n\n  ");
    productTypeContainer.parentNode.insertBefore(adjustContainer, productTypeContainer.nextSibling);
    var productViewTypeContainer = document.querySelector('#product-adjust-product-name-container');
    var masterGroupWarehouseContainer = document.createElement('div');
    masterGroupWarehouseContainer.classList.add('sm:col-span-4');
    masterGroupWarehouseContainer.setAttribute('id', "product-adjust-product_group-container-".concat(groupUnderScore));
    masterGroupWarehouseContainer.innerHTML = "\n  <div class=\"flex gap-4\">\n    <div class=\"\">\n      <label for=\"for-group-".concat(groupUnderScore, "\"\n        class=\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\">").concat(masterGroup, "</label>\n      <select type=\"text\" name=\"group-").concat(groupUnderScore, "\" id=\"master-group-adjust-").concat(groupUnderScore, "\"\n        class=\"product-adjust-group shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500\"\n        placeholder=\"Some Group\" required\n      >\n        <option value=\"").concat(groupProductIds[group], "\">").concat(group, "</option>\n      </select>\n    </div>\n    <div class=\"\">\n      <label for=\"for-warehouse-").concat(groupUnderScore, "\"\n        class=\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\">Warehouse</label>\n      <select type=\"text\" name=\"group-").concat(groupUnderScore, "\" id=\"warehouse-adjust-").concat(groupUnderScore, "\" data-target-group=\"").concat(group, "\"\n        class=\"product-adjust-warehouse-select shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500\"\n        placeholder=\"Some Group\" required\n      >\n      </select>\n    </div>\n  </div>\n    ");
    var selectWarehouse = masterGroupWarehouseContainer.querySelector("#warehouse-adjust-".concat(groupUnderScore));
    var productQuantity = adjustContainer.querySelector("#adjust-product-quantity-".concat(groupUnderScore));
    for (var _i = 0, _a = productParam.all_warehouses; _i < _a.length; _i++) {
        var warehouse = _a[_i];
        if (isEvent && warehouse.name !== eventsWarehouse) {
            continue;
        }
        var option = document.createElement('option');
        option.value = warehouse.id.toString();
        option.text = warehouse.name.toString();
        selectWarehouse.appendChild(option);
    }
    var productQuantityValue = productParam.product_in_warehouses[group][selectWarehouse.value] || 0;
    productQuantity.value = String(productQuantityValue);
    productViewTypeContainer.parentNode.insertBefore(masterGroupWarehouseContainer, productViewTypeContainer.nextSibling);
    selectWarehouse.addEventListener('change', function () {
        var productInWarehouses = JSON.parse(sessionStorage.getItem('productInWarehouses'));
        var availableQuantity = productInWarehouses[group][selectWarehouse.value] || 0;
        productQuantity.value = String(availableQuantity);
        productInWarehouses[group][selectWarehouse.value] = Number(productQuantity.value);
        sessionStorage.setItem('productInWarehouses', JSON.stringify(productInWarehouses));
    });
    productQuantity.addEventListener('change', function () {
        var productInWarehouses = JSON.parse(sessionStorage.getItem('productInWarehouses'));
        productInWarehouses[group][selectWarehouse.value] = Number(productQuantity.value);
        sessionStorage.setItem('productInWarehouses', JSON.stringify(productInWarehouses));
    });
}
var adjustButton = document.querySelector("#product-adjust-submit-btn");
adjustButton.addEventListener('click', function () {
    var product = JSON.parse(sessionStorage.getItem('product'));
    var csrfTokenInput = document.querySelector('#csrf_token');
    var csrfToken = csrfTokenInput ? csrfTokenInput.value : '';
    adjustProduct(product, csrfToken);
});
function adjustProduct(productParam, csrfToken) {
    return __awaiter(this, void 0, void 0, function () {
        var adjustNote, productInWarehouses, data, base_url, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    adjustNote = document.querySelector('#product-adjust-note');
                    productInWarehouses = JSON.parse(sessionStorage.getItem('productInWarehouses'));
                    data = {
                        product_id: productParam.id,
                        groups_quantity: JSON.stringify(productInWarehouses),
                        note: adjustNote.value,
                        csrf_token: csrfToken,
                    };
                    base_url = window.location.origin;
                    return [4 /*yield*/, fetch("/product/adjust", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data),
                        })];
                case 1:
                    response = _a.sent();
                    // NOTE: If we do not notify user about adjust, delete if else statement
                    if (response.status === 201) {
                        location.reload();
                        sessionStorage.removeItem('productInWarehouses');
                    }
                    else {
                        location.reload();
                        sessionStorage.removeItem('productInWarehouses');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function deleteAdjustContainer(nameGroup, nameGroupValue) {
    var adjustContainer = document.querySelector("#product-adjust-container-".concat(nameGroupValue.replace(/ /g, '_')));
    var masterGroupWarehouseContainer = document.querySelector("#product-adjust-product_group-container-".concat(nameGroupValue.replace(/ /g, '_')));
    if (adjustContainer) {
        adjustContainer.remove();
    }
    if (masterGroupWarehouseContainer) {
        masterGroupWarehouseContainer.remove();
    }
}
// ----add inbound order item for edit modal----
function createProductGroupEditItem(productParam, masterGroup, itemIndex) {
    if (productParam === void 0) { productParam = null; }
    if (masterGroup === void 0) { masterGroup = null; }
    if (itemIndex === void 0) { itemIndex = null; }
    if (!productParam) {
        var product = JSON.parse(sessionStorage.getItem('product'));
        productParam = product;
    }
    var productGroupEditContainer = document.querySelector('#product-group-edit-add-container');
    var productGroupEditAllItems = document.querySelectorAll('.product-group-edit-add-item');
    var index = productGroupEditAllItems.length + 1;
    var productGroupEditItem = document.createElement('div');
    productGroupEditItem.classList.add('p-6', 'space-y-6', 'border-t', 'product-group-edit-add-item', "delete-id-".concat(index));
    productGroupEditItem.innerHTML = "\n  <div class=\"grid grid-cols-12 gap-5\">\n    <div class=\"col-span-6 sm:col-span-4\">\n      <label for=\"status\" class=\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\">Master\n        Group</label>\n      <select type=\"text\" name=\"add_product\" id=\"product-master-group-edit-item-".concat(index, "\"\n        class=\"product-master-group-edit-item shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500\"\n        placeholder=\"Master\n        Group\" required>\n        <option value=\"\" disabled selected>Select master group</option>\n      </select>\n    </div>\n    <div class=\"col-span-6 sm:col-span-4\">\n      <label for=\"status\" class=\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\">Group</label>\n      <select type=\"text\" name=\"add_group\" id=\"product-group-edit-item-").concat(index, "\"\n        class=\"product-group-edit-item shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500\"\n        placeholder=\"Group\" required>\n        <option value=\"\" disabled selected>Select group</option>\n      </select>\n    </div>\n    <div class=\"col-span-6 sm:col-span-4\">\n      <label for=\"status\" class=\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\">Action</label>\n      <button type=\"button\" data-target=\"\"\n        class=\"product-group-edit-delete-item-btn inline-flex items-center px-3 py-2 mr-3 text-sm font-medium text-center text-white rounded-lg bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900\">\n        <svg class=\"w-6 h-6\" fill=\"currentColor\" viewBox=\"0 0 448 512\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path\n            d=\"M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z\">\n          </path>\n        </svg>\n      </button>\n      <button type=\"button\" id=\"product-group-edit-add-item-btn-").concat(index, "\"\n        class=\"inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-red-300\">\n        <svg class=\"w-6 h-6\" fill=\"currentColor\" viewBox=\"0 0 448 512\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path\n            d=\"M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z\">\n          </path>\n        </svg>\n      </button>\n    </div>\n  </div>\n  ");
    var productGroupEditSelect = productGroupEditItem.querySelector('.product-group-edit-item');
    var availableMasterGroups = Object.keys(productParam.mstr_prod_grps_prod_grps_names);
    var productMasterGroupEditSelect = productGroupEditItem.querySelector("#product-master-group-edit-item-".concat(index));
    availableMasterGroups.forEach(function (masterGroup) {
        var option = document.createElement('option');
        option.setAttribute('value', masterGroup);
        option.innerHTML = masterGroup;
        productMasterGroupEditSelect.appendChild(option);
    });
    if (masterGroup) {
        productMasterGroupEditSelect.value = masterGroup;
        productParam.mstr_prod_grps_prod_grps_names[masterGroup].forEach(function (group) {
            var productGroupSelectOption = document.createElement('option');
            productGroupSelectOption.setAttribute('value', group.group_id.toString());
            productGroupSelectOption.textContent = group.group_name;
            productGroupEditSelect.appendChild(productGroupSelectOption);
        });
        // TODO: always select first option
        if (!itemIndex) {
            itemIndex = 0;
        }
        productGroupEditSelect.value =
            productParam.mstr_grps_grps_names_in_prod[masterGroup][itemIndex].group_id.toString();
    }
    var options = productMasterGroupEditSelect.querySelectorAll('option');
    productMasterGroupEditSelect.addEventListener('change', function () {
        options.forEach(function (e) {
            if (e.textContent === productMasterGroupEditSelect.options[productMasterGroupEditSelect.selectedIndex].text) {
                var optionCategory = productParam.mstr_prod_grps_prod_grps_names[productMasterGroupEditSelect.options[productMasterGroupEditSelect.selectedIndex].text];
                document.getElementById("product-group-edit-item-".concat(index)).innerHTML = '';
                if (optionCategory) {
                    optionCategory.forEach(function (group) {
                        var storeSelectOption = document.createElement('option');
                        storeSelectOption.setAttribute('value', group.group_id.toString());
                        storeSelectOption.textContent = group.group_name;
                        productGroupEditSelect.appendChild(storeSelectOption);
                    });
                }
            }
        });
    });
    productGroupEditContainer.appendChild(productGroupEditItem);
    var addButton = productGroupEditItem.querySelector("#product-group-edit-add-item-btn-".concat(index));
    addButton.addEventListener('click', function () {
        createProductGroupEditItem();
    });
    var deleteButton = productGroupEditItem.querySelector('.product-group-edit-delete-item-btn');
    deleteButton.addEventListener('click', function () {
        var inboundOrderItem = document.querySelector(".delete-id-".concat(index));
        if (inboundOrderItem) {
            inboundOrderItem.remove();
        }
    });
}
// this button need to add first item from template
var productGroupEditBtnById = document.querySelector('#product-group-edit-add-item-btn');
productGroupEditBtnById.addEventListener('click', function () {
    createProductGroupEditItem();
});
// ----set product to JSON hidden input in inbound-order-edit-form----
function setProducts(typeModal) {
    var productGroupItems = document.querySelectorAll(".product-group-".concat(typeModal, "-add-item"));
    var products = [];
    for (var i = 0; i < productGroupItems.length; i++) {
        var productGroupItem = productGroupItems[i].querySelector(".product-group-".concat(typeModal, "-item"));
        var product = Number(productGroupItem.value);
        products.push(product);
    }
    var inputProducts = document.querySelector("#product-".concat(typeModal, "-product-groups"));
    inputProducts.value = JSON.stringify(products);
    return true;
}
// ----submit edit form through hidden submit button----
var productEditSubmitButton = document.querySelector('#product-edit-submit-btn');
var productEditSaveButton = document.querySelector('#product-edit-save-products-btn');
productEditSaveButton.addEventListener('click', function () {
    var result = setProducts('edit');
    if (result) {
        productEditSubmitButton.click();
    }
});
// ----add product group item for edit modal----
function createProductGroupAddItem(groups) {
    if (groups === void 0) { groups = null; }
    if (!groups) {
        groups = JSON.parse(sessionStorage.getItem('groups'));
    }
    var productGroupAddContainer = document.querySelector('#product-group-add-add-container');
    var productGroupEditOriginal = document.querySelector('#product-group-add-item');
    var productGroupAddAllItems = document.querySelectorAll('.product-group-add-add-item');
    var index = productGroupAddAllItems.length + 1;
    var productGroupAddItem = document.createElement('div');
    productGroupAddItem.classList.add('p-6', 'space-y-6', 'border-t', 'product-group-add-add-item', "delete-id-".concat(index));
    productGroupAddItem.innerHTML = "\n  <div class=\"grid grid-cols-12 gap-5\">\n    <div class=\"col-span-6 sm:col-span-4\">\n      <label for=\"status\" class=\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\">Master\n        Group</label>\n      <select type=\"text\" name=\"add_product\" id=\"product-master-group-add-item-".concat(index, "\"\n        class=\"product-master-group-add-item shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500\"\n        placeholder=\"Master\n        Group\" required>\n        <option value=\"\" disabled selected>Select master group</option>\n      </select>\n    </div>\n    <div class=\"col-span-6 sm:col-span-4\">\n      <label for=\"status\" class=\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\">Group</label>\n      <select type=\"text\" name=\"add_group\" id=\"product-group-add-item-").concat(index, "\"\n        class=\"product-group-add-item shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500\"\n        placeholder=\"Group\" required>\n        <option value=\"\" disabled selected>Select group</option>\n      </select>\n    </div>\n    <div class=\"col-span-6 sm:col-span-4\">\n      <label for=\"status\" class=\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\">Action</label>\n      <button type=\"button\" data-target=\"\"\n        class=\"product-group-add-delete-item-btn inline-flex items-center px-3 py-2 mr-3 text-sm font-medium text-center text-white rounded-lg bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900\">\n        <svg class=\"w-6 h-6\" fill=\"currentColor\" viewBox=\"0 0 448 512\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path\n            d=\"M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z\">\n          </path>\n        </svg>\n      </button>\n      <button type=\"button\" id=\"product-group-add-add-item-btn-").concat(index, "\"\n        class=\"inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-red-300\">\n        <svg class=\"w-6 h-6\" fill=\"currentColor\" viewBox=\"0 0 448 512\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path\n            d=\"M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z\">\n          </path>\n        </svg>\n      </button>\n    </div>\n  </div>\n  ");
    var productMasterGroupAddSelect = productGroupAddItem.querySelector("#product-master-group-add-item-".concat(index));
    var productGroupAddSelect = productGroupAddItem.querySelector('.product-group-add-item');
    var availableMasterGroups = Object.keys(groups);
    availableMasterGroups.forEach(function (masterGroup) {
        var option = document.createElement('option');
        option.setAttribute('value', masterGroup);
        option.innerHTML = masterGroup;
        productMasterGroupAddSelect.appendChild(option);
    });
    var options = productMasterGroupAddSelect.querySelectorAll('option');
    productMasterGroupAddSelect.addEventListener('change', function () {
        options.forEach(function (e) {
            if (e.textContent === productMasterGroupAddSelect.options[productMasterGroupAddSelect.selectedIndex].text) {
                var optionCategory = groups[productMasterGroupAddSelect.options[productMasterGroupAddSelect.selectedIndex].text];
                document.getElementById("product-group-add-item-".concat(index)).innerHTML = '';
                if (optionCategory) {
                    optionCategory.forEach(function (group) {
                        var storeSelectOption = document.createElement('option');
                        storeSelectOption.setAttribute('value', group.group_id.toString());
                        storeSelectOption.textContent = group.group_name;
                        productGroupAddSelect.appendChild(storeSelectOption);
                    });
                }
            }
        });
    });
    productGroupAddContainer.appendChild(productGroupAddItem);
    var addButton = productGroupAddItem.querySelector("#product-group-add-add-item-btn-".concat(index));
    addButton.addEventListener('click', function () {
        createProductGroupAddItem();
    });
    var deleteButton = productGroupAddItem.querySelector('.product-group-add-delete-item-btn');
    deleteButton.addEventListener('click', function () {
        var inboundOrderItem = document.querySelector(".delete-id-".concat(index));
        if (inboundOrderItem) {
            inboundOrderItem.remove();
        }
    });
}
// this button need to add first item from template
var productGroupAddBtnById = document.querySelector('#product-group-add-add-item-btn');
productGroupAddBtnById.addEventListener('click', function () {
    createProductGroupAddItem();
});
// ----submit add form through hidden submit button----
var productAddSubmitButton = document.querySelector('#product-add-submit-btn');
var productAddSaveButton = document.querySelector('#product-add-save-products-btn');
productAddSaveButton.addEventListener('click', function () {
    var result = setProducts('add');
    if (result) {
        productAddSubmitButton.click();
    }
});
// ----clear product group container----
function clearProductGroupContainer() {
    var productGroupEditContainer = document.querySelector('#product-group-edit-add-container');
    var productGroupEditItems = document.querySelectorAll('.product-group-edit-add-item');
    for (var i = 1; i < productGroupEditItems.length; i++) {
        productGroupEditContainer.removeChild(productGroupEditItems[i]);
    }
    var productGroupEditSelects = document.querySelectorAll('.product-group-edit-add-item');
}
function getSortOwnByMe(checkbox, sortRoute) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!checkbox.checked) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch("/product/".concat(sortRoute), {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        })];
                case 2:
                    response = _a.sent();
                    if (response.status === 200) {
                        window.location.href = response.url;
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 8];
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, fetch("/product/", {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        })];
                case 6:
                    response = _a.sent();
                    if (response.status === 200) {
                        window.location.href = response.url;
                    }
                    return [3 /*break*/, 8];
                case 7:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
// ----product show stocks own by me----
var showProductByUserGroupCheckbox = document.querySelector('#product-show-stocks-own-by-me-btn');
if (window.location.pathname + window.location.hash === '/product/stocks_owned_by_me') {
    window.onload = function (event) {
        showProductByUserGroupCheckbox.setAttribute('checked', 'checked');
    };
}
showProductByUserGroupCheckbox.addEventListener('change', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        getSortOwnByMe(showProductByUserGroupCheckbox, 'stocks_owned_by_me');
        return [2 /*return*/];
    });
}); });
// ----product events show stocks own by me----
var showEventsProductByUserGroupCheckbox = document.querySelector('#product-show-events-stocks-own-by-me-btn');
if (window.location.pathname + window.location.hash === '/product/events_stocks_owned_by_me') {
    window.onload = function (event) {
        showEventsProductByUserGroupCheckbox.setAttribute('checked', 'checked');
    };
}
showEventsProductByUserGroupCheckbox.addEventListener('change', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        getSortOwnByMe(showEventsProductByUserGroupCheckbox, 'events_stocks_owned_by_me');
        return [2 /*return*/];
    });
}); });
document.querySelector('#product-assign-master-group').addEventListener('change', function () {
    var productAssignMasterGroupSelect = document.querySelector('#product-assign-master-group');
    var productAssignGroupSelect = document.querySelector('#product-assign-group');
    var groups = JSON.parse(productAssignMasterGroupSelect[productAssignMasterGroupSelect.selectedIndex].getAttribute('data-target'));
    var availableMasterGroups = Object.keys(groups.master_groups_list_groups);
    productAssignGroupSelect.innerHTML = '';
    availableMasterGroups.forEach(function (masterGroup) {
        if (masterGroup === productAssignMasterGroupSelect.options[productAssignMasterGroupSelect.selectedIndex].text) {
            var optionCategory = groups.master_groups_list_groups[masterGroup];
            if (optionCategory) {
                optionCategory.forEach(function (group) {
                    var storeSelectOption = document.createElement('option');
                    storeSelectOption.setAttribute('value', group.group_id.toString());
                    storeSelectOption.textContent = group.group_name;
                    productAssignGroupSelect.appendChild(storeSelectOption);
                });
            }
        }
    });
});
// ---image compressor----
document.getElementById('product-add-image').addEventListener('change', function (e) { return __awaiter(void 0, void 0, void 0, function () {
    function compressImage(file) {
        return __awaiter(this, void 0, void 0, function () {
            var maxFileSize, quality, compressedFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        maxFileSize = desiredImageSize;
                        quality = 0.6;
                        _a.label = 1;
                    case 1:
                        if (!(quality > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, compressQualityImage(file, quality)];
                    case 2:
                        compressedFile = _a.sent();
                        if (compressedFile.size < maxFileSize) {
                            return [2 /*return*/, compressedFile];
                        }
                        quality -= 0.1;
                        if (quality < 0.1) {
                            return [2 /*return*/, compressedFile];
                        }
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    function compressQualityImage(file, quality) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var image = new Image();
                        image.src = URL.createObjectURL(file);
                        image.onload = function () {
                            var canvas = document.createElement('canvas');
                            var context = canvas.getContext('2d');
                            canvas.width = 300;
                            canvas.height = 300;
                            context.drawImage(image, 0, 0, 300, 300);
                            canvas.toBlob(function (blob) {
                                if (blob) {
                                    resolve(blob);
                                }
                                else {
                                    reject(new Error('Failed to convert'));
                                }
                            }, file.type, quality);
                        };
                        image.onerror = function (err) {
                            reject(err);
                        };
                    })];
            });
        });
    }
    function setFileInput(file) {
        var fileList = new DataTransfer();
        fileList.items.add(file);
        return fileList.files;
    }
    var desiredImageSize, lowImageInput, initialImage, compressedImage, compressedImageFile;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                desiredImageSize = 300 * 1024;
                lowImageInput = document.querySelector('#product-add-low-image');
                initialImage = e.target.files[0];
                if (!(initialImage.size > desiredImageSize)) return [3 /*break*/, 2];
                return [4 /*yield*/, compressImage(initialImage)];
            case 1:
                compressedImage = _a.sent();
                compressedImageFile = new File([compressedImage], "low_".concat(initialImage.name), {
                    type: initialImage.type,
                });
                lowImageInput.files = setFileInput(compressedImageFile);
                return [3 /*break*/, 3];
            case 2:
                lowImageInput.files = setFileInput(initialImage);
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
// productBookingButtons.forEach((button) =>
//     button.addEventListener('click', () => {
//         const product = JSON.parse(button.getAttribute('data-target'))
//         console.log(product)
//         let div: HTMLDivElement = document.querySelector('#product-event-name')
//         div.innerHTML = product.name
//         const img: HTMLImageElement = document.querySelector('#product-event-image')
//         const fullImageAnchor = img.closest('.product-full-image-anchor')
//         fullImageAnchor.setAttribute('data-target-product-id', product.id.toString())
//         product.image.length > 100
//             ? (img.src = `data:image/png;base64, ${product.image}`)
//             : (img.src = defaultBrandImage)
//         div = document.querySelector('#product-event-SKU')
//         div.innerHTML = product.SKU
//         div = document.querySelector('#product-event-next_url')
//         div.innerHTML = window.location.href
//         const productIdInput: HTMLInputElement = document.querySelector('#product-event-product-id')
//         productIdInput.value = product.id.toString()
//         // datepicker
//         const eventDatepickers = document.querySelectorAll('.product-event-datepicker')
//         const dateCurrent = new Date()
//         const dateEvent = new Date(dateCurrent.getFullYear(), dateCurrent.getMonth(), dateCurrent.getDate() + 5)
//         const option = {
//             todayHighlight: true,
//             minDate: dateEvent,
//         }
//         eventDatepickers.forEach((datepicker: HTMLDivElement, index) => {
//             const eventDatePicker = new Datepicker(datepicker)
//             eventDatePicker.setOptions(option)
//             if (index === 0) {
//                 eventDatePicker.setDate(dateEvent)
//             }
//         })
//     })
// )
function getFilterValues(isChecked) {
    var url = new URL(window.location.href);
    var eventSortToggleButton = document.querySelector('#product-show-events-toggle-btn');
    isChecked ? url.searchParams.set('events', 'true') : url.searchParams.delete('events');
    window.location.href = "".concat(url.href);
}
var eventSortToggleButton = document.querySelector('#product-show-events-toggle-btn');
eventSortToggleButton.addEventListener('change', function () {
    getFilterValues(eventSortToggleButton.checked);
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/product.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQGVhc2VwaWNrL2J1bmRsZS9kaXN0L2luZGV4LmVzbS5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2NyZWF0ZVBvcHBlci5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9jb250YWlucy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRCb3VuZGluZ0NsaWVudFJlY3QuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Q2xpcHBpbmdSZWN0LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldENvbXBvc2l0ZVJlY3QuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Q29tcHV0ZWRTdHlsZS5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXREb2N1bWVudEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0RG9jdW1lbnRSZWN0LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldEhUTUxFbGVtZW50U2Nyb2xsLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldExheW91dFJlY3QuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Tm9kZU5hbWUuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Tm9kZVNjcm9sbC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRPZmZzZXRQYXJlbnQuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0UGFyZW50Tm9kZS5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRTY3JvbGxQYXJlbnQuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Vmlld3BvcnRSZWN0LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldFdpbmRvdy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRXaW5kb3dTY3JvbGwuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0V2luZG93U2Nyb2xsQmFyWC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9pbnN0YW5jZU9mLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2lzTGF5b3V0Vmlld3BvcnQuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvaXNTY3JvbGxQYXJlbnQuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvaXNUYWJsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvbGlzdFNjcm9sbFBhcmVudHMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9lbnVtcy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9hcHBseVN0eWxlcy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9hcnJvdy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9jb21wdXRlU3R5bGVzLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2V2ZW50TGlzdGVuZXJzLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2ZsaXAuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvaGlkZS5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9vZmZzZXQuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvcG9wcGVyT2Zmc2V0cy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9wcmV2ZW50T3ZlcmZsb3cuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9wb3BwZXItbGl0ZS5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3BvcHBlci5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2NvbXB1dGVBdXRvUGxhY2VtZW50LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvY29tcHV0ZU9mZnNldHMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9kZWJvdW5jZS5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2RldGVjdE92ZXJmbG93LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZXhwYW5kVG9IYXNoTWFwLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZm9ybWF0LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZ2V0QWx0QXhpcy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9nZXRGcmVzaFNpZGVPYmplY3QuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9nZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9nZXRPcHBvc2l0ZVBsYWNlbWVudC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2dldE9wcG9zaXRlVmFyaWF0aW9uUGxhY2VtZW50LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZ2V0VmFyaWF0aW9uLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvbWF0aC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL21lcmdlQnlOYW1lLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvbWVyZ2VQYWRkaW5nT2JqZWN0LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvb3JkZXJNb2RpZmllcnMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9yZWN0VG9DbGllbnRSZWN0LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvdW5pcXVlQnkuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy91c2VyQWdlbnQuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy92YWxpZGF0ZU1vZGlmaWVycy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL3dpdGhpbi5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL2FjY29yZGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL2FjY29yZGlvbi9pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9hY2NvcmRpb24vdHlwZXMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9jYXJvdXNlbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL2Nhcm91c2VsL2ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL2Nhcm91c2VsL3R5cGVzLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvY29sbGFwc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9jb2xsYXBzZS9pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9jb2xsYXBzZS90eXBlcy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL2RpYWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9kaWFsL2ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL2RpYWwvdHlwZXMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9kaXNtaXNzL2luZGV4LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvZGlzbWlzcy9pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9kaXNtaXNzL3R5cGVzLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvZHJhd2VyL2luZGV4LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvZHJhd2VyL2ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL2RyYXdlci90eXBlcy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL2Ryb3Bkb3duL2luZGV4LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvZHJvcGRvd24vaW50ZXJmYWNlLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvZHJvcGRvd24vdHlwZXMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL21vZGFsL2luZGV4LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvbW9kYWwvaW50ZXJmYWNlLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvbW9kYWwvdHlwZXMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9wb3BvdmVyL2luZGV4LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvcG9wb3Zlci9pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9wb3BvdmVyL3R5cGVzLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvdGFicy9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL3RhYnMvaW50ZXJmYWNlLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvdGFicy90eXBlcy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL3Rvb2x0aXAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy90b29sdGlwL2ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL3Rvb2x0aXAvdHlwZXMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vZG9tL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9zcmMvcHJvZHVjdC50cyIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgdCBleHRlbmRzIERhdGV7c3RhdGljIHBhcnNlRGF0ZVRpbWUoZSxpPVwiWVlZWS1NTS1ERFwiLG49XCJlbi1VU1wiKXtpZighZSlyZXR1cm4gbmV3IERhdGUoKG5ldyBEYXRlKS5zZXRIb3VycygwLDAsMCwwKSk7aWYoZSBpbnN0YW5jZW9mIHQpcmV0dXJuIGUudG9KU0RhdGUoKTtpZihlIGluc3RhbmNlb2YgRGF0ZSlyZXR1cm4gZTtpZigvXi0/XFxkezEwLH0kLy50ZXN0KFN0cmluZyhlKSkpcmV0dXJuIG5ldyBEYXRlKE51bWJlcihlKSk7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGUpe2NvbnN0IHM9W107bGV0IG89bnVsbDtmb3IoO251bGwhPShvPXQucmVnZXguZXhlYyhpKSk7KVwiXFxcXFwiIT09b1sxXSYmcy5wdXNoKG8pO2lmKHMubGVuZ3RoKXtjb25zdCBpPXt5ZWFyOm51bGwsbW9udGg6bnVsbCxzaG9ydE1vbnRoOm51bGwsbG9uZ01vbnRoOm51bGwsZGF5Om51bGwsaG91cjowLG1pbnV0ZTowLHNlY29uZDowLGFtcG06bnVsbCx2YWx1ZTpcIlwifTtzWzBdLmluZGV4PjAmJihpLnZhbHVlKz1cIi4qP1wiKTtmb3IoY29uc3RbZSxvXW9mIE9iamVjdC5lbnRyaWVzKHMpKXtjb25zdCBzPU51bWJlcihlKSx7Z3JvdXA6YSxwYXR0ZXJuOnJ9PXQuZm9ybWF0UGF0dGVybnMob1swXSxuKTtpW2FdPXMrMSxpLnZhbHVlKz1yLGkudmFsdWUrPVwiLio/XCJ9Y29uc3Qgbz1uZXcgUmVnRXhwKGBeJHtpLnZhbHVlfSRgKTtpZihvLnRlc3QoZSkpe2NvbnN0IHM9by5leGVjKGUpLGE9TnVtYmVyKHNbaS55ZWFyXSk7bGV0IHI9bnVsbDtpLm1vbnRoP3I9TnVtYmVyKHNbaS5tb250aF0pLTE6aS5zaG9ydE1vbnRoP3I9dC5zaG9ydE1vbnRocyhuKS5pbmRleE9mKHNbaS5zaG9ydE1vbnRoXSk6aS5sb25nTW9udGgmJihyPXQubG9uZ01vbnRocyhuKS5pbmRleE9mKHNbaS5sb25nTW9udGhdKSk7Y29uc3QgYz1OdW1iZXIoc1tpLmRheV0pfHwxLGw9TnVtYmVyKHNbaS5ob3VyXSk7bGV0IGg9TnVtYmVyLmlzTmFOKGwpPzA6bDtjb25zdCBkPU51bWJlcihzW2kubWludXRlXSkscD1OdW1iZXIuaXNOYU4oZCk/MDpkLHU9TnVtYmVyKHNbaS5zZWNvbmRdKSxnPU51bWJlci5pc05hTih1KT8wOnUsbT1zW2kuYW1wbV07cmV0dXJuIG0mJlwiUE1cIj09PW0mJihoKz0xMiwyND09PWgmJihoPTApKSxuZXcgRGF0ZShhLHIsYyxoLHAsZywwKX19fXJldHVybiBuZXcgRGF0ZSgobmV3IERhdGUpLnNldEhvdXJzKDAsMCwwLDApKX1zdGF0aWMgcmVnZXg9LyhcXFxcKT8oWXsyLDR9fE17MSw0fXxEezEsMn18SHsxLDJ9fGh7MSwyfXxtezEsMn18c3sxLDJ9fEF8YSkvZztzdGF0aWMgTU9OVEhfSlM9WzAsMSwyLDMsNCw1LDYsNyw4LDksMTAsMTFdO3N0YXRpYyBzaG9ydE1vbnRocyhlKXtyZXR1cm4gdC5NT05USF9KUy5tYXAoKHQ9Pm5ldyBEYXRlKDIwMTksdCkudG9Mb2NhbGVTdHJpbmcoZSx7bW9udGg6XCJzaG9ydFwifSkpKX1zdGF0aWMgbG9uZ01vbnRocyhlKXtyZXR1cm4gdC5NT05USF9KUy5tYXAoKHQ9Pm5ldyBEYXRlKDIwMTksdCkudG9Mb2NhbGVTdHJpbmcoZSx7bW9udGg6XCJsb25nXCJ9KSkpfXN0YXRpYyBmb3JtYXRQYXR0ZXJucyhlLGkpe3N3aXRjaChlKXtjYXNlXCJZWVwiOmNhc2VcIllZWVlcIjpyZXR1cm57Z3JvdXA6XCJ5ZWFyXCIscGF0dGVybjpgKFxcXFxkeyR7ZS5sZW5ndGh9fSlgfTtjYXNlXCJNXCI6cmV0dXJue2dyb3VwOlwibW9udGhcIixwYXR0ZXJuOlwiKFxcXFxkezEsMn0pXCJ9O2Nhc2VcIk1NXCI6cmV0dXJue2dyb3VwOlwibW9udGhcIixwYXR0ZXJuOlwiKFxcXFxkezJ9KVwifTtjYXNlXCJNTU1cIjpyZXR1cm57Z3JvdXA6XCJzaG9ydE1vbnRoXCIscGF0dGVybjpgKCR7dC5zaG9ydE1vbnRocyhpKS5qb2luKFwifFwiKX0pYH07Y2FzZVwiTU1NTVwiOnJldHVybntncm91cDpcImxvbmdNb250aFwiLHBhdHRlcm46YCgke3QubG9uZ01vbnRocyhpKS5qb2luKFwifFwiKX0pYH07Y2FzZVwiRFwiOnJldHVybntncm91cDpcImRheVwiLHBhdHRlcm46XCIoXFxcXGR7MSwyfSlcIn07Y2FzZVwiRERcIjpyZXR1cm57Z3JvdXA6XCJkYXlcIixwYXR0ZXJuOlwiKFxcXFxkezJ9KVwifTtjYXNlXCJoXCI6Y2FzZVwiSFwiOnJldHVybntncm91cDpcImhvdXJcIixwYXR0ZXJuOlwiKFxcXFxkezEsMn0pXCJ9O2Nhc2VcImhoXCI6Y2FzZVwiSEhcIjpyZXR1cm57Z3JvdXA6XCJob3VyXCIscGF0dGVybjpcIihcXFxcZHsyfSlcIn07Y2FzZVwibVwiOnJldHVybntncm91cDpcIm1pbnV0ZVwiLHBhdHRlcm46XCIoXFxcXGR7MSwyfSlcIn07Y2FzZVwibW1cIjpyZXR1cm57Z3JvdXA6XCJtaW51dGVcIixwYXR0ZXJuOlwiKFxcXFxkezJ9KVwifTtjYXNlXCJzXCI6cmV0dXJue2dyb3VwOlwic2Vjb25kXCIscGF0dGVybjpcIihcXFxcZHsxLDJ9KVwifTtjYXNlXCJzc1wiOnJldHVybntncm91cDpcInNlY29uZFwiLHBhdHRlcm46XCIoXFxcXGR7Mn0pXCJ9O2Nhc2VcImFcIjpjYXNlXCJBXCI6cmV0dXJue2dyb3VwOlwiYW1wbVwiLHBhdHRlcm46XCIoQU18UE18YW18cG0pXCJ9fX1sYW5nO2NvbnN0cnVjdG9yKGU9bnVsbCxpPVwiWVlZWS1NTS1ERFwiLG49XCJlbi1VU1wiKXtzdXBlcih0LnBhcnNlRGF0ZVRpbWUoZSxpLG4pKSx0aGlzLmxhbmc9bn1nZXRXZWVrKHQpe2NvbnN0IGU9bmV3IERhdGUodGhpcy5taWRuaWdodF90cyh0aGlzKSksaT0odGhpcy5nZXREYXkoKSsoNy10KSklNztlLnNldERhdGUoZS5nZXREYXRlKCktaSk7Y29uc3Qgbj1lLmdldFRpbWUoKTtyZXR1cm4gZS5zZXRNb250aCgwLDEpLGUuZ2V0RGF5KCkhPT10JiZlLnNldE1vbnRoKDAsMSsoNC1lLmdldERheSgpKzcpJTcpLDErTWF0aC5jZWlsKChuLWUuZ2V0VGltZSgpKS82MDQ4ZTUpfWNsb25lKCl7cmV0dXJuIG5ldyB0KHRoaXMpfXRvSlNEYXRlKCl7cmV0dXJuIG5ldyBEYXRlKHRoaXMpfWluQXJyYXkodCxlPVwiW11cIil7cmV0dXJuIHQuc29tZSgodD0+dCBpbnN0YW5jZW9mIEFycmF5P3RoaXMuaXNCZXR3ZWVuKHRbMF0sdFsxXSxlKTp0aGlzLmlzU2FtZSh0LFwiZGF5XCIpKSl9aXNCZXR3ZWVuKHQsZSxpPVwiKClcIil7c3dpdGNoKGkpe2RlZmF1bHQ6Y2FzZVwiKClcIjpyZXR1cm4gdGhpcy5taWRuaWdodF90cyh0aGlzKT50aGlzLm1pZG5pZ2h0X3RzKHQpJiZ0aGlzLm1pZG5pZ2h0X3RzKHRoaXMpPHRoaXMubWlkbmlnaHRfdHMoZSk7Y2FzZVwiWylcIjpyZXR1cm4gdGhpcy5taWRuaWdodF90cyh0aGlzKT49dGhpcy5taWRuaWdodF90cyh0KSYmdGhpcy5taWRuaWdodF90cyh0aGlzKTx0aGlzLm1pZG5pZ2h0X3RzKGUpO2Nhc2VcIihdXCI6cmV0dXJuIHRoaXMubWlkbmlnaHRfdHModGhpcyk+dGhpcy5taWRuaWdodF90cyh0KSYmdGhpcy5taWRuaWdodF90cyh0aGlzKTw9dGhpcy5taWRuaWdodF90cyhlKTtjYXNlXCJbXVwiOnJldHVybiB0aGlzLm1pZG5pZ2h0X3RzKCk+PXRoaXMubWlkbmlnaHRfdHModCkmJnRoaXMubWlkbmlnaHRfdHMoKTw9dGhpcy5taWRuaWdodF90cyhlKX19aXNCZWZvcmUodCxlPVwiZGF5c1wiKXtzd2l0Y2goZSl7Y2FzZVwiZGF5XCI6Y2FzZVwiZGF5c1wiOnJldHVybiBuZXcgRGF0ZSh0LmdldEZ1bGxZZWFyKCksdC5nZXRNb250aCgpLHQuZ2V0RGF0ZSgpKS5nZXRUaW1lKCk+bmV3IERhdGUodGhpcy5nZXRGdWxsWWVhcigpLHRoaXMuZ2V0TW9udGgoKSx0aGlzLmdldERhdGUoKSkuZ2V0VGltZSgpO2Nhc2VcIm1vbnRoXCI6Y2FzZVwibW9udGhzXCI6cmV0dXJuIG5ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKSx0LmdldE1vbnRoKCksMSkuZ2V0VGltZSgpPm5ldyBEYXRlKHRoaXMuZ2V0RnVsbFllYXIoKSx0aGlzLmdldE1vbnRoKCksMSkuZ2V0VGltZSgpO2Nhc2VcInllYXJcIjpjYXNlXCJ5ZWFyc1wiOnJldHVybiB0LmdldEZ1bGxZZWFyKCk+dGhpcy5nZXRGdWxsWWVhcigpfXRocm93IG5ldyBFcnJvcihcImlzQmVmb3JlOiBJbnZhbGlkIHVuaXQhXCIpfWlzU2FtZU9yQmVmb3JlKHQsZT1cImRheXNcIil7c3dpdGNoKGUpe2Nhc2VcImRheVwiOmNhc2VcImRheXNcIjpyZXR1cm4gbmV3IERhdGUodC5nZXRGdWxsWWVhcigpLHQuZ2V0TW9udGgoKSx0LmdldERhdGUoKSkuZ2V0VGltZSgpPj1uZXcgRGF0ZSh0aGlzLmdldEZ1bGxZZWFyKCksdGhpcy5nZXRNb250aCgpLHRoaXMuZ2V0RGF0ZSgpKS5nZXRUaW1lKCk7Y2FzZVwibW9udGhcIjpjYXNlXCJtb250aHNcIjpyZXR1cm4gbmV3IERhdGUodC5nZXRGdWxsWWVhcigpLHQuZ2V0TW9udGgoKSwxKS5nZXRUaW1lKCk+PW5ldyBEYXRlKHRoaXMuZ2V0RnVsbFllYXIoKSx0aGlzLmdldE1vbnRoKCksMSkuZ2V0VGltZSgpfXRocm93IG5ldyBFcnJvcihcImlzU2FtZU9yQmVmb3JlOiBJbnZhbGlkIHVuaXQhXCIpfWlzQWZ0ZXIodCxlPVwiZGF5c1wiKXtzd2l0Y2goZSl7Y2FzZVwiZGF5XCI6Y2FzZVwiZGF5c1wiOnJldHVybiBuZXcgRGF0ZSh0aGlzLmdldEZ1bGxZZWFyKCksdGhpcy5nZXRNb250aCgpLHRoaXMuZ2V0RGF0ZSgpKS5nZXRUaW1lKCk+bmV3IERhdGUodC5nZXRGdWxsWWVhcigpLHQuZ2V0TW9udGgoKSx0LmdldERhdGUoKSkuZ2V0VGltZSgpO2Nhc2VcIm1vbnRoXCI6Y2FzZVwibW9udGhzXCI6cmV0dXJuIG5ldyBEYXRlKHRoaXMuZ2V0RnVsbFllYXIoKSx0aGlzLmdldE1vbnRoKCksMSkuZ2V0VGltZSgpPm5ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKSx0LmdldE1vbnRoKCksMSkuZ2V0VGltZSgpO2Nhc2VcInllYXJcIjpjYXNlXCJ5ZWFyc1wiOnJldHVybiB0aGlzLmdldEZ1bGxZZWFyKCk+dC5nZXRGdWxsWWVhcigpfXRocm93IG5ldyBFcnJvcihcImlzQWZ0ZXI6IEludmFsaWQgdW5pdCFcIil9aXNTYW1lT3JBZnRlcih0LGU9XCJkYXlzXCIpe3N3aXRjaChlKXtjYXNlXCJkYXlcIjpjYXNlXCJkYXlzXCI6cmV0dXJuIG5ldyBEYXRlKHRoaXMuZ2V0RnVsbFllYXIoKSx0aGlzLmdldE1vbnRoKCksdGhpcy5nZXREYXRlKCkpLmdldFRpbWUoKT49bmV3IERhdGUodC5nZXRGdWxsWWVhcigpLHQuZ2V0TW9udGgoKSx0LmdldERhdGUoKSkuZ2V0VGltZSgpO2Nhc2VcIm1vbnRoXCI6Y2FzZVwibW9udGhzXCI6cmV0dXJuIG5ldyBEYXRlKHRoaXMuZ2V0RnVsbFllYXIoKSx0aGlzLmdldE1vbnRoKCksMSkuZ2V0VGltZSgpPj1uZXcgRGF0ZSh0LmdldEZ1bGxZZWFyKCksdC5nZXRNb250aCgpLDEpLmdldFRpbWUoKX10aHJvdyBuZXcgRXJyb3IoXCJpc1NhbWVPckFmdGVyOiBJbnZhbGlkIHVuaXQhXCIpfWlzU2FtZSh0LGU9XCJkYXlzXCIpe3N3aXRjaChlKXtjYXNlXCJkYXlcIjpjYXNlXCJkYXlzXCI6cmV0dXJuIG5ldyBEYXRlKHRoaXMuZ2V0RnVsbFllYXIoKSx0aGlzLmdldE1vbnRoKCksdGhpcy5nZXREYXRlKCkpLmdldFRpbWUoKT09PW5ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKSx0LmdldE1vbnRoKCksdC5nZXREYXRlKCkpLmdldFRpbWUoKTtjYXNlXCJtb250aFwiOmNhc2VcIm1vbnRoc1wiOnJldHVybiBuZXcgRGF0ZSh0aGlzLmdldEZ1bGxZZWFyKCksdGhpcy5nZXRNb250aCgpLDEpLmdldFRpbWUoKT09PW5ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKSx0LmdldE1vbnRoKCksMSkuZ2V0VGltZSgpfXRocm93IG5ldyBFcnJvcihcImlzU2FtZTogSW52YWxpZCB1bml0IVwiKX1hZGQodCxlPVwiZGF5c1wiKXtzd2l0Y2goZSl7Y2FzZVwiZGF5XCI6Y2FzZVwiZGF5c1wiOnRoaXMuc2V0RGF0ZSh0aGlzLmdldERhdGUoKSt0KTticmVhaztjYXNlXCJtb250aFwiOmNhc2VcIm1vbnRoc1wiOnRoaXMuc2V0TW9udGgodGhpcy5nZXRNb250aCgpK3QpfXJldHVybiB0aGlzfXN1YnRyYWN0KHQsZT1cImRheXNcIil7c3dpdGNoKGUpe2Nhc2VcImRheVwiOmNhc2VcImRheXNcIjp0aGlzLnNldERhdGUodGhpcy5nZXREYXRlKCktdCk7YnJlYWs7Y2FzZVwibW9udGhcIjpjYXNlXCJtb250aHNcIjp0aGlzLnNldE1vbnRoKHRoaXMuZ2V0TW9udGgoKS10KX1yZXR1cm4gdGhpc31kaWZmKHQsZT1cImRheXNcIil7c3dpdGNoKGUpe2RlZmF1bHQ6Y2FzZVwiZGF5XCI6Y2FzZVwiZGF5c1wiOnJldHVybiBNYXRoLnJvdW5kKCh0aGlzLm1pZG5pZ2h0X3RzKCktdGhpcy5taWRuaWdodF90cyh0KSkvODY0ZTUpO2Nhc2VcIm1vbnRoXCI6Y2FzZVwibW9udGhzXCI6bGV0IGU9MTIqKHQuZ2V0RnVsbFllYXIoKS10aGlzLmdldEZ1bGxZZWFyKCkpO3JldHVybiBlLT10LmdldE1vbnRoKCksZSs9dGhpcy5nZXRNb250aCgpLGV9fWZvcm1hdChlLGk9XCJlbi1VU1wiKXtsZXQgbj1cIlwiO2NvbnN0IHM9W107bGV0IG89bnVsbDtmb3IoO251bGwhPShvPXQucmVnZXguZXhlYyhlKSk7KVwiXFxcXFwiIT09b1sxXSYmcy5wdXNoKG8pO2lmKHMubGVuZ3RoKXtzWzBdLmluZGV4PjAmJihuKz1lLnN1YnN0cmluZygwLHNbMF0uaW5kZXgpKTtmb3IoY29uc3RbdCxvXW9mIE9iamVjdC5lbnRyaWVzKHMpKXtjb25zdCBhPU51bWJlcih0KTtuKz10aGlzLmZvcm1hdFRva2VucyhvWzBdLGkpLHNbYSsxXSYmKG4rPWUuc3Vic3RyaW5nKG8uaW5kZXgrb1swXS5sZW5ndGgsc1thKzFdLmluZGV4KSksYT09PXMubGVuZ3RoLTEmJihuKz1lLnN1YnN0cmluZyhvLmluZGV4K29bMF0ubGVuZ3RoKSl9fXJldHVybiBuLnJlcGxhY2UoL1xcXFwvZyxcIlwiKX1taWRuaWdodF90cyh0KXtyZXR1cm4gdD9uZXcgRGF0ZSh0LmdldEZ1bGxZZWFyKCksdC5nZXRNb250aCgpLHQuZ2V0RGF0ZSgpLDAsMCwwLDApLmdldFRpbWUoKTpuZXcgRGF0ZSh0aGlzLmdldEZ1bGxZZWFyKCksdGhpcy5nZXRNb250aCgpLHRoaXMuZ2V0RGF0ZSgpLDAsMCwwLDApLmdldFRpbWUoKX1mb3JtYXRUb2tlbnMoZSxpKXtzd2l0Y2goZSl7Y2FzZVwiWVlcIjpyZXR1cm4gU3RyaW5nKHRoaXMuZ2V0RnVsbFllYXIoKSkuc2xpY2UoLTIpO2Nhc2VcIllZWVlcIjpyZXR1cm4gU3RyaW5nKHRoaXMuZ2V0RnVsbFllYXIoKSk7Y2FzZVwiTVwiOnJldHVybiBTdHJpbmcodGhpcy5nZXRNb250aCgpKzEpO2Nhc2VcIk1NXCI6cmV0dXJuYDAke3RoaXMuZ2V0TW9udGgoKSsxfWAuc2xpY2UoLTIpO2Nhc2VcIk1NTVwiOnJldHVybiB0LnNob3J0TW9udGhzKGkpW3RoaXMuZ2V0TW9udGgoKV07Y2FzZVwiTU1NTVwiOnJldHVybiB0LmxvbmdNb250aHMoaSlbdGhpcy5nZXRNb250aCgpXTtjYXNlXCJEXCI6cmV0dXJuIFN0cmluZyh0aGlzLmdldERhdGUoKSk7Y2FzZVwiRERcIjpyZXR1cm5gMCR7dGhpcy5nZXREYXRlKCl9YC5zbGljZSgtMik7Y2FzZVwiSFwiOnJldHVybiBTdHJpbmcodGhpcy5nZXRIb3VycygpKTtjYXNlXCJISFwiOnJldHVybmAwJHt0aGlzLmdldEhvdXJzKCl9YC5zbGljZSgtMik7Y2FzZVwiaFwiOnJldHVybiBTdHJpbmcodGhpcy5nZXRIb3VycygpJTEyfHwxMik7Y2FzZVwiaGhcIjpyZXR1cm5gMCR7dGhpcy5nZXRIb3VycygpJTEyfHwxMn1gLnNsaWNlKC0yKTtjYXNlXCJtXCI6cmV0dXJuIFN0cmluZyh0aGlzLmdldE1pbnV0ZXMoKSk7Y2FzZVwibW1cIjpyZXR1cm5gMCR7dGhpcy5nZXRNaW51dGVzKCl9YC5zbGljZSgtMik7Y2FzZVwic1wiOnJldHVybiBTdHJpbmcodGhpcy5nZXRTZWNvbmRzKCkpO2Nhc2VcInNzXCI6cmV0dXJuYDAke3RoaXMuZ2V0U2Vjb25kcygpfWAuc2xpY2UoLTIpO2Nhc2VcImFcIjpyZXR1cm4gdGhpcy5nZXRIb3VycygpPDEyfHwyND09PXRoaXMuZ2V0SG91cnMoKT9cImFtXCI6XCJwbVwiO2Nhc2VcIkFcIjpyZXR1cm4gdGhpcy5nZXRIb3VycygpPDEyfHwyND09PXRoaXMuZ2V0SG91cnMoKT9cIkFNXCI6XCJQTVwiO2RlZmF1bHQ6cmV0dXJuXCJcIn19fWNsYXNzIGV7cGlja2VyO2NvbnN0cnVjdG9yKHQpe3RoaXMucGlja2VyPXR9cmVuZGVyKGUsaSl7ZXx8KGU9bmV3IHQpLGUuc2V0RGF0ZSgxKSxlLnNldEhvdXJzKDAsMCwwLDApLFwiZnVuY3Rpb25cIj09dHlwZW9mIHRoaXNbYGdldCR7aX1WaWV3YF0mJnRoaXNbYGdldCR7aX1WaWV3YF0oZSl9Z2V0Q29udGFpbmVyVmlldyh0KXt0aGlzLnBpY2tlci51aS5jb250YWluZXIuaW5uZXJIVE1MPVwiXCIsdGhpcy5waWNrZXIub3B0aW9ucy5oZWFkZXImJnRoaXMucGlja2VyLnRyaWdnZXIoXCJyZW5kZXJcIix7ZGF0ZTp0LmNsb25lKCksdmlldzpcIkhlYWRlclwifSksdGhpcy5waWNrZXIudHJpZ2dlcihcInJlbmRlclwiLHtkYXRlOnQuY2xvbmUoKSx2aWV3OlwiTWFpblwifSksdGhpcy5waWNrZXIub3B0aW9ucy5hdXRvQXBwbHl8fHRoaXMucGlja2VyLnRyaWdnZXIoXCJyZW5kZXJcIix7ZGF0ZTp0LmNsb25lKCksdmlldzpcIkZvb3RlclwifSl9Z2V0SGVhZGVyVmlldyh0KXtjb25zdCBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIik7dGhpcy5waWNrZXIub3B0aW9ucy5oZWFkZXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCYmZS5hcHBlbmRDaGlsZCh0aGlzLnBpY2tlci5vcHRpb25zLmhlYWRlciksXCJzdHJpbmdcIj09dHlwZW9mIHRoaXMucGlja2VyLm9wdGlvbnMuaGVhZGVyJiYoZS5pbm5lckhUTUw9dGhpcy5waWNrZXIub3B0aW9ucy5oZWFkZXIpLHRoaXMucGlja2VyLnVpLmNvbnRhaW5lci5hcHBlbmRDaGlsZChlKSx0aGlzLnBpY2tlci50cmlnZ2VyKFwidmlld1wiLHt0YXJnZXQ6ZSxkYXRlOnQuY2xvbmUoKSx2aWV3OlwiSGVhZGVyXCJ9KX1nZXRNYWluVmlldyh0KXtjb25zdCBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJtYWluXCIpO3RoaXMucGlja2VyLnVpLmNvbnRhaW5lci5hcHBlbmRDaGlsZChlKTtjb25zdCBpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7aS5jbGFzc05hbWU9YGNhbGVuZGFycyBncmlkLSR7dGhpcy5waWNrZXIub3B0aW9ucy5ncmlkfWA7Zm9yKGxldCBlPTA7ZTx0aGlzLnBpY2tlci5vcHRpb25zLmNhbGVuZGFycztlKyspe2NvbnN0IG49ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtuLmNsYXNzTmFtZT1cImNhbGVuZGFyXCIsaS5hcHBlbmRDaGlsZChuKTtjb25zdCBzPXRoaXMuZ2V0Q2FsZW5kYXJIZWFkZXJWaWV3KHQuY2xvbmUoKSk7bi5hcHBlbmRDaGlsZChzKSx0aGlzLnBpY2tlci50cmlnZ2VyKFwidmlld1wiLHtkYXRlOnQuY2xvbmUoKSx2aWV3OlwiQ2FsZW5kYXJIZWFkZXJcIixpbmRleDplLHRhcmdldDpzfSk7Y29uc3Qgbz10aGlzLmdldENhbGVuZGFyRGF5TmFtZXNWaWV3KCk7bi5hcHBlbmRDaGlsZChvKSx0aGlzLnBpY2tlci50cmlnZ2VyKFwidmlld1wiLHtkYXRlOnQuY2xvbmUoKSx2aWV3OlwiQ2FsZW5kYXJEYXlOYW1lc1wiLGluZGV4OmUsdGFyZ2V0Om99KTtjb25zdCBhPXRoaXMuZ2V0Q2FsZW5kYXJEYXlzVmlldyh0LmNsb25lKCkpO24uYXBwZW5kQ2hpbGQoYSksdGhpcy5waWNrZXIudHJpZ2dlcihcInZpZXdcIix7ZGF0ZTp0LmNsb25lKCksdmlldzpcIkNhbGVuZGFyRGF5c1wiLGluZGV4OmUsdGFyZ2V0OmF9KTtjb25zdCByPXRoaXMuZ2V0Q2FsZW5kYXJGb290ZXJWaWV3KHRoaXMucGlja2VyLm9wdGlvbnMubGFuZyx0LmNsb25lKCkpO24uYXBwZW5kQ2hpbGQociksdGhpcy5waWNrZXIudHJpZ2dlcihcInZpZXdcIix7ZGF0ZTp0LmNsb25lKCksdmlldzpcIkNhbGVuZGFyRm9vdGVyXCIsaW5kZXg6ZSx0YXJnZXQ6cn0pLHRoaXMucGlja2VyLnRyaWdnZXIoXCJ2aWV3XCIse2RhdGU6dC5jbG9uZSgpLHZpZXc6XCJDYWxlbmRhckl0ZW1cIixpbmRleDplLHRhcmdldDpufSksdC5hZGQoMSxcIm1vbnRoXCIpfWUuYXBwZW5kQ2hpbGQoaSksdGhpcy5waWNrZXIudHJpZ2dlcihcInZpZXdcIix7ZGF0ZTp0LmNsb25lKCksdmlldzpcIkNhbGVuZGFyc1wiLHRhcmdldDppfSksdGhpcy5waWNrZXIudHJpZ2dlcihcInZpZXdcIix7ZGF0ZTp0LmNsb25lKCksdmlldzpcIk1haW5cIix0YXJnZXQ6ZX0pfWdldEZvb3RlclZpZXcodCl7Y29uc3QgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9vdGVyXCIpLGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtpLmNsYXNzTmFtZT1cImZvb3Rlci1idXR0b25zXCI7Y29uc3Qgbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO24uY2xhc3NOYW1lPVwiY2FuY2VsLWJ1dHRvbiB1bml0XCIsbi5pbm5lckhUTUw9dGhpcy5waWNrZXIub3B0aW9ucy5sb2NhbGUuY2FuY2VsLGkuYXBwZW5kQ2hpbGQobik7Y29uc3Qgcz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO3MuY2xhc3NOYW1lPVwiYXBwbHktYnV0dG9uIHVuaXRcIixzLmlubmVySFRNTD10aGlzLnBpY2tlci5vcHRpb25zLmxvY2FsZS5hcHBseSxzLmRpc2FibGVkPSEwLGkuYXBwZW5kQ2hpbGQocyksZS5hcHBlbmRDaGlsZChpKSx0aGlzLnBpY2tlci51aS5jb250YWluZXIuYXBwZW5kQ2hpbGQoZSksdGhpcy5waWNrZXIudHJpZ2dlcihcInZpZXdcIix7ZGF0ZTp0LHRhcmdldDplLHZpZXc6XCJGb290ZXJcIn0pfWdldENhbGVuZGFySGVhZGVyVmlldyh0KXtjb25zdCBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7ZS5jbGFzc05hbWU9XCJoZWFkZXJcIjtjb25zdCBpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7aS5jbGFzc05hbWU9XCJtb250aC1uYW1lXCIsaS5pbm5lckhUTUw9YDxzcGFuPiR7dC50b0xvY2FsZVN0cmluZyh0aGlzLnBpY2tlci5vcHRpb25zLmxhbmcse21vbnRoOlwibG9uZ1wifSl9PC9zcGFuPiAke3QuZm9ybWF0KFwiWVlZWVwiKX1gLGUuYXBwZW5kQ2hpbGQoaSk7Y29uc3Qgbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO24uY2xhc3NOYW1lPVwicHJldmlvdXMtYnV0dG9uIHVuaXRcIixuLmlubmVySFRNTD10aGlzLnBpY2tlci5vcHRpb25zLmxvY2FsZS5wcmV2aW91c01vbnRoLGUuYXBwZW5kQ2hpbGQobik7Y29uc3Qgcz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO3JldHVybiBzLmNsYXNzTmFtZT1cIm5leHQtYnV0dG9uIHVuaXRcIixzLmlubmVySFRNTD10aGlzLnBpY2tlci5vcHRpb25zLmxvY2FsZS5uZXh0TW9udGgsZS5hcHBlbmRDaGlsZChzKSxlfWdldENhbGVuZGFyRGF5TmFtZXNWaWV3KCl7Y29uc3QgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3QuY2xhc3NOYW1lPVwiZGF5bmFtZXMtcm93XCI7Zm9yKGxldCBlPTE7ZTw9NztlKyspe2NvbnN0IGk9Myt0aGlzLnBpY2tlci5vcHRpb25zLmZpcnN0RGF5K2Usbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO24uY2xhc3NOYW1lPVwiZGF5bmFtZVwiLG4uaW5uZXJIVE1MPW5ldyBEYXRlKDE5NzAsMCxpLDEyLDAsMCwwKS50b0xvY2FsZVN0cmluZyh0aGlzLnBpY2tlci5vcHRpb25zLmxhbmcse3dlZWtkYXk6XCJzaG9ydFwifSksbi50aXRsZT1uZXcgRGF0ZSgxOTcwLDAsaSwxMiwwLDAsMCkudG9Mb2NhbGVTdHJpbmcodGhpcy5waWNrZXIub3B0aW9ucy5sYW5nLHt3ZWVrZGF5OlwibG9uZ1wifSksdC5hcHBlbmRDaGlsZChuKSx0aGlzLnBpY2tlci50cmlnZ2VyKFwidmlld1wiLHtkYXlJZHg6aSx2aWV3OlwiQ2FsZW5kYXJEYXlOYW1lXCIsdGFyZ2V0Om59KX1yZXR1cm4gdH1nZXRDYWxlbmRhckRheXNWaWV3KHQpe2NvbnN0IGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtlLmNsYXNzTmFtZT1cImRheXMtZ3JpZFwiO2NvbnN0IGk9dGhpcy5jYWxjT2Zmc2V0RGF5cyh0LHRoaXMucGlja2VyLm9wdGlvbnMuZmlyc3REYXkpLG49MzItbmV3IERhdGUodC5nZXRGdWxsWWVhcigpLHQuZ2V0TW9udGgoKSwzMikuZ2V0RGF0ZSgpO2ZvcihsZXQgdD0wO3Q8aTt0Kyspe2NvbnN0IHQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTt0LmNsYXNzTmFtZT1cIm9mZnNldFwiLGUuYXBwZW5kQ2hpbGQodCl9Zm9yKGxldCBpPTE7aTw9bjtpKyspe3Quc2V0RGF0ZShpKTtjb25zdCBuPXRoaXMuZ2V0Q2FsZW5kYXJEYXlWaWV3KHQpO2UuYXBwZW5kQ2hpbGQobiksdGhpcy5waWNrZXIudHJpZ2dlcihcInZpZXdcIix7ZGF0ZTp0LHZpZXc6XCJDYWxlbmRhckRheVwiLHRhcmdldDpufSl9cmV0dXJuIGV9Z2V0Q2FsZW5kYXJEYXlWaWV3KGUpe2NvbnN0IGk9dGhpcy5waWNrZXIub3B0aW9ucy5kYXRlP25ldyB0KHRoaXMucGlja2VyLm9wdGlvbnMuZGF0ZSk6bnVsbCxuPW5ldyB0LHM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtyZXR1cm4gcy5jbGFzc05hbWU9XCJkYXkgdW5pdFwiLHMuaW5uZXJIVE1MPWUuZm9ybWF0KFwiRFwiKSxzLmRhdGFzZXQudGltZT1TdHJpbmcoZS5nZXRUaW1lKCkpLGUuaXNTYW1lKG4sXCJkYXlcIikmJnMuY2xhc3NMaXN0LmFkZChcInRvZGF5XCIpLFswLDZdLmluY2x1ZGVzKGUuZ2V0RGF5KCkpJiZzLmNsYXNzTGlzdC5hZGQoXCJ3ZWVrZW5kXCIpLHRoaXMucGlja2VyLmRhdGVQaWNrZWQubGVuZ3RoP3RoaXMucGlja2VyLmRhdGVQaWNrZWRbMF0uaXNTYW1lKGUsXCJkYXlcIikmJnMuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpOmkmJmUuaXNTYW1lKGksXCJkYXlcIikmJnMuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpLHRoaXMucGlja2VyLnRyaWdnZXIoXCJ2aWV3XCIse2RhdGU6ZSx2aWV3OlwiQ2FsZW5kYXJEYXlcIix0YXJnZXQ6c30pLHN9Z2V0Q2FsZW5kYXJGb290ZXJWaWV3KHQsZSl7Y29uc3QgaT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3JldHVybiBpLmNsYXNzTmFtZT1cImZvb3RlclwiLGl9Y2FsY09mZnNldERheXModCxlKXtsZXQgaT10LmdldERheSgpLWU7cmV0dXJuIGk8MCYmKGkrPTcpLGl9fWNsYXNzIGl7cGlja2VyO2luc3RhbmNlcz17fTtjb25zdHJ1Y3Rvcih0KXt0aGlzLnBpY2tlcj10fWluaXRpYWxpemUoKXtjb25zdCB0PVtdO3RoaXMucGlja2VyLm9wdGlvbnMucGx1Z2lucy5mb3JFYWNoKChlPT57XCJmdW5jdGlvblwiPT10eXBlb2YgZT90LnB1c2gobmV3IGUpOlwic3RyaW5nXCI9PXR5cGVvZiBlJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgZWFzZXBpY2smJk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlYXNlcGljayxlKT90LnB1c2gobmV3IGVhc2VwaWNrW2VdKTpjb25zb2xlLndhcm4oYGVhc2VwaWNrOiAke2V9IG5vdCBmb3VuZC5gKX0pKSx0LnNvcnQoKCh0LGUpPT50LnByaW9yaXR5PmUucHJpb3JpdHk/LTE6dC5wcmlvcml0eTxlLnByaW9yaXR5fHx0LmRlcGVuZGVuY2llcy5sZW5ndGg+ZS5kZXBlbmRlbmNpZXMubGVuZ3RoPzE6dC5kZXBlbmRlbmNpZXMubGVuZ3RoPGUuZGVwZW5kZW5jaWVzLmxlbmd0aD8tMTowKSksdC5mb3JFYWNoKCh0PT57dC5hdHRhY2godGhpcy5waWNrZXIpLHRoaXMuaW5zdGFuY2VzW3QuZ2V0TmFtZSgpXT10fSkpfWdldEluc3RhbmNlKHQpe3JldHVybiB0aGlzLmluc3RhbmNlc1t0XX1hZGRJbnN0YW5jZSh0KXtpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5pbnN0YW5jZXMsdCkpY29uc29sZS53YXJuKGBlYXNlcGljazogJHt0fSBhbHJlYWR5IGFkZGVkLmApO2Vsc2V7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGVhc2VwaWNrJiZPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZWFzZXBpY2ssdCkpe2NvbnN0IGU9bmV3IGVhc2VwaWNrW3RdO3JldHVybiBlLmF0dGFjaCh0aGlzLnBpY2tlciksdGhpcy5pbnN0YW5jZXNbZS5nZXROYW1lKCldPWUsZX1pZihcInVuZGVmaW5lZFwiIT09dGhpcy5nZXRQbHVnaW5Gbih0KSl7Y29uc3QgZT1uZXcodGhpcy5nZXRQbHVnaW5Gbih0KSk7cmV0dXJuIGUuYXR0YWNoKHRoaXMucGlja2VyKSx0aGlzLmluc3RhbmNlc1tlLmdldE5hbWUoKV09ZSxlfWNvbnNvbGUud2FybihgZWFzZXBpY2s6ICR7dH0gbm90IGZvdW5kLmApfXJldHVybiBudWxsfXJlbW92ZUluc3RhbmNlKHQpe3JldHVybiB0IGluIHRoaXMuaW5zdGFuY2VzJiZ0aGlzLmluc3RhbmNlc1t0XS5kZXRhY2goKSxkZWxldGUgdGhpcy5pbnN0YW5jZXNbdF19cmVsb2FkSW5zdGFuY2UodCl7cmV0dXJuIHRoaXMucmVtb3ZlSW5zdGFuY2UodCksdGhpcy5hZGRJbnN0YW5jZSh0KX1nZXRQbHVnaW5Gbih0KXtyZXR1cm5bLi4udGhpcy5waWNrZXIub3B0aW9ucy5wbHVnaW5zXS5maWx0ZXIoKGU9PlwiZnVuY3Rpb25cIj09dHlwZW9mIGUmJihuZXcgZSkuZ2V0TmFtZSgpPT09dCkpLnNoaWZ0KCl9fWNsYXNzIG57Q2FsZW5kYXI9bmV3IGUodGhpcyk7UGx1Z2luTWFuYWdlcj1uZXcgaSh0aGlzKTtjYWxlbmRhcnM9W107ZGF0ZVBpY2tlZD1bXTtjc3NMb2FkZWQ9MDtiaW5kcz17aGlkZVBpY2tlcjp0aGlzLmhpZGVQaWNrZXIuYmluZCh0aGlzKSxzaG93OnRoaXMuc2hvdy5iaW5kKHRoaXMpfTtvcHRpb25zPXtkb2M6ZG9jdW1lbnQsY3NzOltdLGVsZW1lbnQ6bnVsbCxmaXJzdERheToxLGdyaWQ6MSxjYWxlbmRhcnM6MSxsYW5nOlwiZW4tVVNcIixkYXRlOm51bGwsZm9ybWF0OlwiWVlZWS1NTS1ERFwiLHJlYWRvbmx5OiEwLGF1dG9BcHBseTohMCxoZWFkZXI6ITEsaW5saW5lOiExLHNjcm9sbFRvRGF0ZTohMCxsb2NhbGU6e25leHRNb250aDonPHN2ZyB3aWR0aD1cIjExXCIgaGVpZ2h0PVwiMTZcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZD1cIk0yLjc0OCAxNkwwIDEzLjMzMyA1LjMzMyA4IDAgMi42NjcgMi43NDggMGw3LjkxOSA4elwiIGZpbGwtcnVsZT1cIm5vbnplcm9cIi8+PC9zdmc+JyxwcmV2aW91c01vbnRoOic8c3ZnIHdpZHRoPVwiMTFcIiBoZWlnaHQ9XCIxNlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTTcuOTE5IDBsMi43NDggMi42NjdMNS4zMzMgOGw1LjMzNCA1LjMzM0w3LjkxOSAxNiAwIDh6XCIgZmlsbC1ydWxlPVwibm9uemVyb1wiLz48L3N2Zz4nLGNhbmNlbDpcIkNhbmNlbFwiLGFwcGx5OlwiQXBwbHlcIn0sZG9jdW1lbnRDbGljazp0aGlzLmJpbmRzLmhpZGVQaWNrZXIscGx1Z2luczpbXX07dWk9e2NvbnRhaW5lcjpudWxsLHNoYWRvd1Jvb3Q6bnVsbCx3cmFwcGVyOm51bGx9O3ZlcnNpb249XCIxLjIuMVwiO2NvbnN0cnVjdG9yKHQpe2NvbnN0IGU9ey4uLnRoaXMub3B0aW9ucy5sb2NhbGUsLi4udC5sb2NhbGV9O3RoaXMub3B0aW9ucz17Li4udGhpcy5vcHRpb25zLC4uLnR9LHRoaXMub3B0aW9ucy5sb2NhbGU9ZSx0aGlzLmhhbmRsZU9wdGlvbnMoKSx0aGlzLnVpLndyYXBwZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIiksdGhpcy51aS53cmFwcGVyLnN0eWxlLmRpc3BsYXk9XCJub25lXCIsdGhpcy51aS53cmFwcGVyLnN0eWxlLnBvc2l0aW9uPVwiYWJzb2x1dGVcIix0aGlzLnVpLndyYXBwZXIuc3R5bGUucG9pbnRlckV2ZW50cz1cIm5vbmVcIix0aGlzLnVpLndyYXBwZXIuY2xhc3NOYW1lPVwiZWFzZXBpY2std3JhcHBlclwiLHRoaXMudWkud3JhcHBlci5hdHRhY2hTaGFkb3coe21vZGU6XCJvcGVuXCJ9KSx0aGlzLnVpLnNoYWRvd1Jvb3Q9dGhpcy51aS53cmFwcGVyLnNoYWRvd1Jvb3QsdGhpcy51aS5jb250YWluZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSx0aGlzLnVpLmNvbnRhaW5lci5jbGFzc05hbWU9XCJjb250YWluZXJcIix0aGlzLm9wdGlvbnMuekluZGV4JiYodGhpcy51aS5jb250YWluZXIuc3R5bGUuekluZGV4PVN0cmluZyh0aGlzLm9wdGlvbnMuekluZGV4KSksdGhpcy5vcHRpb25zLmlubGluZSYmKHRoaXMudWkud3JhcHBlci5zdHlsZS5wb3NpdGlvbj1cInJlbGF0aXZlXCIsdGhpcy51aS5jb250YWluZXIuY2xhc3NMaXN0LmFkZChcImlubGluZVwiKSksdGhpcy51aS5zaGFkb3dSb290LmFwcGVuZENoaWxkKHRoaXMudWkuY29udGFpbmVyKSx0aGlzLm9wdGlvbnMuZWxlbWVudC5hZnRlcih0aGlzLnVpLndyYXBwZXIpLHRoaXMuaGFuZGxlQ1NTKCksdGhpcy5vcHRpb25zLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsdGhpcy5iaW5kcy5zaG93KSx0aGlzLm9uKFwidmlld1wiLHRoaXMub25WaWV3LmJpbmQodGhpcykpLHRoaXMub24oXCJyZW5kZXJcIix0aGlzLm9uUmVuZGVyLmJpbmQodGhpcykpLHRoaXMuUGx1Z2luTWFuYWdlci5pbml0aWFsaXplKCksdGhpcy5wYXJzZVZhbHVlcygpLFwiZnVuY3Rpb25cIj09dHlwZW9mIHRoaXMub3B0aW9ucy5zZXR1cCYmdGhpcy5vcHRpb25zLnNldHVwKHRoaXMpLHRoaXMub24oXCJjbGlja1wiLHRoaXMub25DbGljay5iaW5kKHRoaXMpKTtjb25zdCBpPXRoaXMub3B0aW9ucy5zY3JvbGxUb0RhdGU/dGhpcy5nZXREYXRlKCk6bnVsbDt0aGlzLnJlbmRlckFsbChpKX1vbih0LGUsaT17fSl7dGhpcy51aS5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcih0LGUsaSl9b2ZmKHQsZSxpPXt9KXt0aGlzLnVpLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKHQsZSxpKX10cmlnZ2VyKHQsZT17fSl7cmV0dXJuIHRoaXMudWkuY29udGFpbmVyLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KHQse2RldGFpbDplfSkpfWRlc3Ryb3koKXt0aGlzLm9wdGlvbnMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIix0aGlzLmJpbmRzLnNob3cpLFwiZnVuY3Rpb25cIj09dHlwZW9mIHRoaXMub3B0aW9ucy5kb2N1bWVudENsaWNrJiZkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIix0aGlzLm9wdGlvbnMuZG9jdW1lbnRDbGljaywhMCksT2JqZWN0LmtleXModGhpcy5QbHVnaW5NYW5hZ2VyLmluc3RhbmNlcykuZm9yRWFjaCgodD0+e3RoaXMuUGx1Z2luTWFuYWdlci5yZW1vdmVJbnN0YW5jZSh0KX0pKSx0aGlzLnVpLndyYXBwZXIucmVtb3ZlKCl9b25SZW5kZXIodCl7Y29uc3R7dmlldzplLGRhdGU6aX09dC5kZXRhaWw7dGhpcy5DYWxlbmRhci5yZW5kZXIoaSxlKX1vblZpZXcodCl7Y29uc3R7dmlldzplLHRhcmdldDppfT10LmRldGFpbDtcIkZvb3RlclwiPT09ZSYmdGhpcy5kYXRlUGlja2VkLmxlbmd0aCYmKGkucXVlcnlTZWxlY3RvcihcIi5hcHBseS1idXR0b25cIikuZGlzYWJsZWQ9ITEpfW9uQ2xpY2tIZWFkZXJCdXR0b24odCl7dGhpcy5pc0NhbGVuZGFySGVhZGVyQnV0dG9uKHQpJiYodC5jbGFzc0xpc3QuY29udGFpbnMoXCJuZXh0LWJ1dHRvblwiKT90aGlzLmNhbGVuZGFyc1swXS5hZGQoMSxcIm1vbnRoXCIpOnRoaXMuY2FsZW5kYXJzWzBdLnN1YnRyYWN0KDEsXCJtb250aFwiKSx0aGlzLnJlbmRlckFsbCh0aGlzLmNhbGVuZGFyc1swXSkpfW9uQ2xpY2tDYWxlbmRhckRheShlKXtpZih0aGlzLmlzQ2FsZW5kYXJEYXkoZSkpe2NvbnN0IGk9bmV3IHQoZS5kYXRhc2V0LnRpbWUpO3RoaXMub3B0aW9ucy5hdXRvQXBwbHk/KHRoaXMuc2V0RGF0ZShpKSx0aGlzLnRyaWdnZXIoXCJzZWxlY3RcIix7ZGF0ZTp0aGlzLmdldERhdGUoKX0pLHRoaXMuaGlkZSgpKToodGhpcy5kYXRlUGlja2VkWzBdPWksdGhpcy50cmlnZ2VyKFwicHJlc2VsZWN0XCIse2RhdGU6dGhpcy5nZXREYXRlKCl9KSx0aGlzLnJlbmRlckFsbCgpKX19b25DbGlja0FwcGx5QnV0dG9uKHQpe2lmKHRoaXMuaXNBcHBseUJ1dHRvbih0KSl7aWYodGhpcy5kYXRlUGlja2VkWzBdaW5zdGFuY2VvZiBEYXRlKXtjb25zdCB0PXRoaXMuZGF0ZVBpY2tlZFswXS5jbG9uZSgpO3RoaXMuc2V0RGF0ZSh0KX10aGlzLmhpZGUoKSx0aGlzLnRyaWdnZXIoXCJzZWxlY3RcIix7ZGF0ZTp0aGlzLmdldERhdGUoKX0pfX1vbkNsaWNrQ2FuY2VsQnV0dG9uKHQpe3RoaXMuaXNDYW5jZWxCdXR0b24odCkmJnRoaXMuaGlkZSgpfW9uQ2xpY2sodCl7Y29uc3QgZT10LnRhcmdldDtpZihlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpe2NvbnN0IHQ9ZS5jbG9zZXN0KFwiLnVuaXRcIik7aWYoISh0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKXJldHVybjt0aGlzLm9uQ2xpY2tIZWFkZXJCdXR0b24odCksdGhpcy5vbkNsaWNrQ2FsZW5kYXJEYXkodCksdGhpcy5vbkNsaWNrQXBwbHlCdXR0b24odCksdGhpcy5vbkNsaWNrQ2FuY2VsQnV0dG9uKHQpfX1pc1Nob3duKCl7cmV0dXJuIHRoaXMudWkuY29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhcImlubGluZVwiKXx8dGhpcy51aS5jb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hvd1wiKX1zaG93KHQpe2lmKHRoaXMuaXNTaG93bigpKXJldHVybjtjb25zdCBlPXQmJlwidGFyZ2V0XCJpbiB0P3QudGFyZ2V0OnRoaXMub3B0aW9ucy5lbGVtZW50LHt0b3A6aSxsZWZ0Om59PXRoaXMuYWRqdXN0UG9zaXRpb24oZSk7dGhpcy51aS5jb250YWluZXIuc3R5bGUudG9wPWAke2l9cHhgLHRoaXMudWkuY29udGFpbmVyLnN0eWxlLmxlZnQ9YCR7bn1weGAsdGhpcy51aS5jb250YWluZXIuY2xhc3NMaXN0LmFkZChcInNob3dcIiksdGhpcy50cmlnZ2VyKFwic2hvd1wiLHt0YXJnZXQ6ZX0pfWhpZGUoKXt0aGlzLnVpLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKSx0aGlzLmRhdGVQaWNrZWQubGVuZ3RoPTAsdGhpcy5yZW5kZXJBbGwoKSx0aGlzLnRyaWdnZXIoXCJoaWRlXCIpfXNldERhdGUoZSl7Y29uc3QgaT1uZXcgdChlLHRoaXMub3B0aW9ucy5mb3JtYXQpO3RoaXMub3B0aW9ucy5kYXRlPWkuY2xvbmUoKSx0aGlzLnVwZGF0ZVZhbHVlcygpLHRoaXMuY2FsZW5kYXJzLmxlbmd0aCYmdGhpcy5yZW5kZXJBbGwoKX1nZXREYXRlKCl7cmV0dXJuIHRoaXMub3B0aW9ucy5kYXRlIGluc3RhbmNlb2YgdD90aGlzLm9wdGlvbnMuZGF0ZS5jbG9uZSgpOm51bGx9cGFyc2VWYWx1ZXMoKXt0aGlzLm9wdGlvbnMuZGF0ZT90aGlzLnNldERhdGUodGhpcy5vcHRpb25zLmRhdGUpOnRoaXMub3B0aW9ucy5lbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCYmdGhpcy5vcHRpb25zLmVsZW1lbnQudmFsdWUubGVuZ3RoJiZ0aGlzLnNldERhdGUodGhpcy5vcHRpb25zLmVsZW1lbnQudmFsdWUpLHRoaXMub3B0aW9ucy5kYXRlIGluc3RhbmNlb2YgRGF0ZXx8KHRoaXMub3B0aW9ucy5kYXRlPW51bGwpfXVwZGF0ZVZhbHVlcygpe2NvbnN0IHQ9dGhpcy5nZXREYXRlKCksZT10IGluc3RhbmNlb2YgRGF0ZT90LmZvcm1hdCh0aGlzLm9wdGlvbnMuZm9ybWF0LHRoaXMub3B0aW9ucy5sYW5nKTpcIlwiLGk9dGhpcy5vcHRpb25zLmVsZW1lbnQ7aSBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQ/aS52YWx1ZT1lOmkgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCYmKGkuaW5uZXJUZXh0PWUpfWhpZGVQaWNrZXIodCl7bGV0IGU9dC50YXJnZXQsaT1udWxsO2Uuc2hhZG93Um9vdCYmKGU9dC5jb21wb3NlZFBhdGgoKVswXSxpPWUuZ2V0Um9vdE5vZGUoKS5ob3N0KSx0aGlzLmlzU2hvd24oKSYmaSE9PXRoaXMudWkud3JhcHBlciYmZSE9PXRoaXMub3B0aW9ucy5lbGVtZW50JiZ0aGlzLmhpZGUoKX1yZW5kZXJBbGwodCl7dGhpcy50cmlnZ2VyKFwicmVuZGVyXCIse3ZpZXc6XCJDb250YWluZXJcIixkYXRlOih0fHx0aGlzLmNhbGVuZGFyc1swXSkuY2xvbmUoKX0pfWlzQ2FsZW5kYXJIZWFkZXJCdXR0b24odCl7cmV0dXJuW1wicHJldmlvdXMtYnV0dG9uXCIsXCJuZXh0LWJ1dHRvblwiXS5zb21lKChlPT50LmNsYXNzTGlzdC5jb250YWlucyhlKSkpfWlzQ2FsZW5kYXJEYXkodCl7cmV0dXJuIHQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGF5XCIpfWlzQXBwbHlCdXR0b24odCl7cmV0dXJuIHQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYXBwbHktYnV0dG9uXCIpfWlzQ2FuY2VsQnV0dG9uKHQpe3JldHVybiB0LmNsYXNzTGlzdC5jb250YWlucyhcImNhbmNlbC1idXR0b25cIil9Z290b0RhdGUoZSl7Y29uc3QgaT1uZXcgdChlLHRoaXMub3B0aW9ucy5mb3JtYXQpO2kuc2V0RGF0ZSgxKSx0aGlzLmNhbGVuZGFyc1swXT1pLmNsb25lKCksdGhpcy5yZW5kZXJBbGwoKX1jbGVhcigpe3RoaXMub3B0aW9ucy5kYXRlPW51bGwsdGhpcy5kYXRlUGlja2VkLmxlbmd0aD0wLHRoaXMudXBkYXRlVmFsdWVzKCksdGhpcy5yZW5kZXJBbGwoKSx0aGlzLnRyaWdnZXIoXCJjbGVhclwiKX1oYW5kbGVPcHRpb25zKCl7dGhpcy5vcHRpb25zLmVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudHx8KHRoaXMub3B0aW9ucy5lbGVtZW50PXRoaXMub3B0aW9ucy5kb2MucXVlcnlTZWxlY3Rvcih0aGlzLm9wdGlvbnMuZWxlbWVudCkpLFwiZnVuY3Rpb25cIj09dHlwZW9mIHRoaXMub3B0aW9ucy5kb2N1bWVudENsaWNrJiZkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIix0aGlzLm9wdGlvbnMuZG9jdW1lbnRDbGljaywhMCksdGhpcy5vcHRpb25zLmVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50JiYodGhpcy5vcHRpb25zLmVsZW1lbnQucmVhZE9ubHk9dGhpcy5vcHRpb25zLnJlYWRvbmx5KSx0aGlzLm9wdGlvbnMuZGF0ZT90aGlzLmNhbGVuZGFyc1swXT1uZXcgdCh0aGlzLm9wdGlvbnMuZGF0ZSx0aGlzLm9wdGlvbnMuZm9ybWF0KTp0aGlzLmNhbGVuZGFyc1swXT1uZXcgdH1oYW5kbGVDU1MoKXtpZihBcnJheS5pc0FycmF5KHRoaXMub3B0aW9ucy5jc3MpKXRoaXMub3B0aW9ucy5jc3MuZm9yRWFjaCgodD0+e2NvbnN0IGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7ZS5ocmVmPXQsZS5yZWw9XCJzdHlsZXNoZWV0XCI7Y29uc3QgaT0oKT0+e3RoaXMuY3NzTG9hZGVkKyssdGhpcy5jc3NMb2FkZWQ9PT10aGlzLm9wdGlvbnMuY3NzLmxlbmd0aCYmKHRoaXMudWkud3JhcHBlci5zdHlsZS5kaXNwbGF5PVwiXCIpfTtlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsaSksZS5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIixpKSx0aGlzLnVpLnNoYWRvd1Jvb3QuYXBwZW5kKGUpfSkpO2Vsc2UgaWYoXCJzdHJpbmdcIj09dHlwZW9mIHRoaXMub3B0aW9ucy5jc3Mpe2NvbnN0IHQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpLGU9ZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5vcHRpb25zLmNzcyk7dC5hcHBlbmRDaGlsZChlKSx0aGlzLnVpLnNoYWRvd1Jvb3QuYXBwZW5kKHQpLHRoaXMudWkud3JhcHBlci5zdHlsZS5kaXNwbGF5PVwiXCJ9ZWxzZVwiZnVuY3Rpb25cIj09dHlwZW9mIHRoaXMub3B0aW9ucy5jc3MmJih0aGlzLm9wdGlvbnMuY3NzLmNhbGwodGhpcyx0aGlzKSx0aGlzLnVpLndyYXBwZXIuc3R5bGUuZGlzcGxheT1cIlwiKX1hZGp1c3RQb3NpdGlvbih0KXtjb25zdCBlPXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksaT10aGlzLnVpLndyYXBwZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7dGhpcy51aS5jb250YWluZXIuY2xhc3NMaXN0LmFkZChcImNhbGNcIik7Y29uc3Qgbj10aGlzLnVpLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTt0aGlzLnVpLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwiY2FsY1wiKTtsZXQgcz1lLmJvdHRvbS1pLmJvdHRvbSxvPWUubGVmdC1pLmxlZnQ7cmV0dXJuXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmKHdpbmRvdy5pbm5lckhlaWdodDxzK24uaGVpZ2h0JiZzLW4uaGVpZ2h0Pj0wJiYocz1lLnRvcC1pLnRvcC1uLmhlaWdodCksd2luZG93LmlubmVyV2lkdGg8bytuLndpZHRoJiZlLnJpZ2h0LW4ud2lkdGg+PTAmJihvPWUucmlnaHQtaS5yaWdodC1uLndpZHRoKSkse2xlZnQ6byx0b3A6c319fXZhciBzPU9iamVjdC5mcmVlemUoe19fcHJvdG9fXzpudWxsLENvcmU6bixjcmVhdGU6bn0pO2NsYXNzIG97cGlja2VyO29wdGlvbnM7cHJpb3JpdHk9MDtkZXBlbmRlbmNpZXM9W107YXR0YWNoKHQpe2NvbnN0IGU9dGhpcy5nZXROYW1lKCksaT17Li4udGhpcy5vcHRpb25zfTt0aGlzLm9wdGlvbnM9ey4uLnRoaXMub3B0aW9ucywuLi50Lm9wdGlvbnNbZV18fHt9fTtmb3IoY29uc3QgbiBvZiBPYmplY3Qua2V5cyhpKSlpZihudWxsIT09aVtuXSYmXCJvYmplY3RcIj09dHlwZW9mIGlbbl0mJk9iamVjdC5rZXlzKGlbbl0pLmxlbmd0aCYmZSBpbiB0Lm9wdGlvbnMmJm4gaW4gdC5vcHRpb25zW2VdKXtjb25zdCBzPXsuLi50Lm9wdGlvbnNbZV1bbl19O251bGwhPT1zJiZcIm9iamVjdFwiPT10eXBlb2YgcyYmT2JqZWN0LmtleXMocykubGVuZ3RoJiZPYmplY3Qua2V5cyhzKS5ldmVyeSgodD0+T2JqZWN0LmtleXMoaVtuXSkuaW5jbHVkZXModCkpKSYmKHRoaXMub3B0aW9uc1tuXT17Li4uaVtuXSwuLi5zfSl9aWYodGhpcy5waWNrZXI9dCx0aGlzLmRlcGVuZGVuY2llc05vdEZvdW5kKCkpe2NvbnN0IHQ9dGhpcy5kZXBlbmRlbmNpZXMuZmlsdGVyKCh0PT4hdGhpcy5wbHVnaW5zQXNTdHJpbmdBcnJheSgpLmluY2x1ZGVzKHQpKSk7cmV0dXJuIHZvaWQgY29uc29sZS53YXJuKGAke3RoaXMuZ2V0TmFtZSgpfTogcmVxdWlyZWQgZGVwZW5kZW5jaWVzICgke3Quam9pbihcIiwgXCIpfSkuYCl9Y29uc3Qgbj10aGlzLmNhbWVsQ2FzZVRvS2ViYWIodGhpcy5nZXROYW1lKCkpO3RoaXMucGlja2VyLnVpLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKG4pLHRoaXMub25BdHRhY2goKX1kZXRhY2goKXtjb25zdCB0PXRoaXMuY2FtZWxDYXNlVG9LZWJhYih0aGlzLmdldE5hbWUoKSk7dGhpcy5waWNrZXIudWkuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUodCksXCJmdW5jdGlvblwiPT10eXBlb2YgdGhpcy5vbkRldGFjaCYmdGhpcy5vbkRldGFjaCgpfWRlcGVuZGVuY2llc05vdEZvdW5kKCl7cmV0dXJuIHRoaXMuZGVwZW5kZW5jaWVzLmxlbmd0aCYmIXRoaXMuZGVwZW5kZW5jaWVzLmV2ZXJ5KCh0PT50aGlzLnBsdWdpbnNBc1N0cmluZ0FycmF5KCkuaW5jbHVkZXModCkpKX1wbHVnaW5zQXNTdHJpbmdBcnJheSgpe3JldHVybiB0aGlzLnBpY2tlci5vcHRpb25zLnBsdWdpbnMubWFwKCh0PT5cImZ1bmN0aW9uXCI9PXR5cGVvZiB0PyhuZXcgdCkuZ2V0TmFtZSgpOnQpKX1jYW1lbENhc2VUb0tlYmFiKHQpe3JldHVybiB0LnJlcGxhY2UoLyhbYS16QS1aXSkoPz1bQS1aXSkvZyxcIiQxLVwiKS50b0xvd2VyQ2FzZSgpfX1jbGFzcyBhIGV4dGVuZHMgb3twcmlvcml0eT0xO2JpbmRzPXtvblZpZXc6dGhpcy5vblZpZXcuYmluZCh0aGlzKX07b3B0aW9ucz17bWluRGF0ZTpudWxsLG1heERhdGU6bnVsbCxtaW5EYXlzOm51bGwsbWF4RGF5czpudWxsLHNlbGVjdEZvcndhcmQ6bnVsbCxzZWxlY3RCYWNrd2FyZDpudWxsLHByZXNldHM6ITAsaW5zZXBhcmFibGU6ITEsZmlsdGVyOm51bGx9O2dldE5hbWUoKXtyZXR1cm5cIkxvY2tQbHVnaW5cIn1vbkF0dGFjaCgpe2lmKHRoaXMub3B0aW9ucy5taW5EYXRlJiYodGhpcy5vcHRpb25zLm1pbkRhdGU9bmV3IHQodGhpcy5vcHRpb25zLm1pbkRhdGUsdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQsdGhpcy5waWNrZXIub3B0aW9ucy5sYW5nKSksdGhpcy5vcHRpb25zLm1heERhdGUmJih0aGlzLm9wdGlvbnMubWF4RGF0ZT1uZXcgdCh0aGlzLm9wdGlvbnMubWF4RGF0ZSx0aGlzLnBpY2tlci5vcHRpb25zLmZvcm1hdCx0aGlzLnBpY2tlci5vcHRpb25zLmxhbmcpLHRoaXMub3B0aW9ucy5tYXhEYXRlIGluc3RhbmNlb2YgdCYmdGhpcy5waWNrZXIub3B0aW9ucy5jYWxlbmRhcnM+MSYmdGhpcy5waWNrZXIuY2FsZW5kYXJzWzBdLmlzU2FtZSh0aGlzLm9wdGlvbnMubWF4RGF0ZSxcIm1vbnRoXCIpKSl7Y29uc3QgdD10aGlzLnBpY2tlci5jYWxlbmRhcnNbMF0uY2xvbmUoKS5zdWJ0cmFjdCgxLFwibW9udGhcIik7dGhpcy5waWNrZXIuZ290b0RhdGUodCl9aWYoKHRoaXMub3B0aW9ucy5taW5EYXlzfHx0aGlzLm9wdGlvbnMubWF4RGF5c3x8dGhpcy5vcHRpb25zLnNlbGVjdEZvcndhcmR8fHRoaXMub3B0aW9ucy5zZWxlY3RCYWNrd2FyZCkmJiF0aGlzLnBpY2tlci5vcHRpb25zLnBsdWdpbnMuaW5jbHVkZXMoXCJSYW5nZVBsdWdpblwiKSl7Y29uc3QgdD1bXCJtaW5EYXlzXCIsXCJtYXhEYXlzXCIsXCJzZWxlY3RGb3J3YXJkXCIsXCJzZWxlY3RCYWNrd2FyZFwiXTtjb25zb2xlLndhcm4oYCR7dGhpcy5nZXROYW1lKCl9OiBvcHRpb25zICR7dC5qb2luKFwiLCBcIil9IHJlcXVpcmVkIFJhbmdlUGx1Z2luLmApfXRoaXMucGlja2VyLm9uKFwidmlld1wiLHRoaXMuYmluZHMub25WaWV3KX1vbkRldGFjaCgpe3RoaXMucGlja2VyLm9mZihcInZpZXdcIix0aGlzLmJpbmRzLm9uVmlldyl9b25WaWV3KGUpe2NvbnN0e3ZpZXc6aSx0YXJnZXQ6bixkYXRlOnN9PWUuZGV0YWlsO2lmKFwiQ2FsZW5kYXJIZWFkZXJcIj09PWkmJih0aGlzLm9wdGlvbnMubWluRGF0ZSBpbnN0YW5jZW9mIHQmJnMuaXNTYW1lT3JCZWZvcmUodGhpcy5vcHRpb25zLm1pbkRhdGUsXCJtb250aFwiKSYmbi5jbGFzc0xpc3QuYWRkKFwibm8tcHJldmlvdXMtbW9udGhcIiksdGhpcy5vcHRpb25zLm1heERhdGUgaW5zdGFuY2VvZiB0JiZzLmlzU2FtZU9yQWZ0ZXIodGhpcy5vcHRpb25zLm1heERhdGUsXCJtb250aFwiKSYmbi5jbGFzc0xpc3QuYWRkKFwibm8tbmV4dC1tb250aFwiKSksXCJDYWxlbmRhckRheVwiPT09aSl7Y29uc3QgdD10aGlzLnBpY2tlci5kYXRlUGlja2VkLmxlbmd0aD90aGlzLnBpY2tlci5kYXRlUGlja2VkWzBdOm51bGw7aWYodGhpcy50ZXN0RmlsdGVyKHMpKXJldHVybiB2b2lkIG4uY2xhc3NMaXN0LmFkZChcImxvY2tlZFwiKTtpZih0aGlzLm9wdGlvbnMuaW5zZXBhcmFibGUpe2lmKHRoaXMub3B0aW9ucy5taW5EYXlzKXtjb25zdCB0PXMuY2xvbmUoKS5zdWJ0cmFjdCh0aGlzLm9wdGlvbnMubWluRGF5cy0xLFwiZGF5XCIpLGU9cy5jbG9uZSgpLmFkZCh0aGlzLm9wdGlvbnMubWluRGF5cy0xLFwiZGF5XCIpO2xldCBpPSExLG89ITE7Zm9yKDt0LmlzQmVmb3JlKHMsXCJkYXlcIik7KXtpZih0aGlzLnRlc3RGaWx0ZXIodCkpe2k9ITA7YnJlYWt9dC5hZGQoMSxcImRheVwiKX1mb3IoO2UuaXNBZnRlcihzLFwiZGF5XCIpOyl7aWYodGhpcy50ZXN0RmlsdGVyKGUpKXtvPSEwO2JyZWFrfWUuc3VidHJhY3QoMSxcImRheVwiKX1pJiZvJiZuLmNsYXNzTGlzdC5hZGQoXCJub3QtYXZhaWxhYmxlXCIpfXRoaXMucmFuZ2VJc05vdEF2YWlsYWJsZShzLHQpJiZuLmNsYXNzTGlzdC5hZGQoXCJub3QtYXZhaWxhYmxlXCIpfXRoaXMuZGF0ZUlzTm90QXZhaWxhYmxlKHMsdCkmJm4uY2xhc3NMaXN0LmFkZChcIm5vdC1hdmFpbGFibGVcIil9aWYodGhpcy5vcHRpb25zLnByZXNldHMmJlwiUHJlc2V0UGx1Z2luQnV0dG9uXCI9PT1pKXtjb25zdCBlPW5ldyB0KE51bWJlcihuLmRhdGFzZXQuc3RhcnQpKSxpPW5ldyB0KE51bWJlcihuLmRhdGFzZXQuZW5kKSkscz1pLmRpZmYoZSxcImRheVwiKSxvPXRoaXMub3B0aW9ucy5taW5EYXlzJiZzPHRoaXMub3B0aW9ucy5taW5EYXlzLGE9dGhpcy5vcHRpb25zLm1heERheXMmJnM+dGhpcy5vcHRpb25zLm1heERheXM7KG98fGF8fHRoaXMubG9ja01pbkRhdGUoZSl8fHRoaXMubG9ja01heERhdGUoZSl8fHRoaXMubG9ja01pbkRhdGUoaSl8fHRoaXMubG9ja01heERhdGUoaSl8fHRoaXMucmFuZ2VJc05vdEF2YWlsYWJsZShlLGkpKSYmbi5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLFwiZGlzYWJsZWRcIil9fWRhdGVJc05vdEF2YWlsYWJsZSh0LGUpe3JldHVybiB0aGlzLmxvY2tNaW5EYXRlKHQpfHx0aGlzLmxvY2tNYXhEYXRlKHQpfHx0aGlzLmxvY2tNaW5EYXlzKHQsZSl8fHRoaXMubG9ja01heERheXModCxlKXx8dGhpcy5sb2NrU2VsZWN0Rm9yd2FyZCh0KXx8dGhpcy5sb2NrU2VsZWN0QmFja3dhcmQodCl9cmFuZ2VJc05vdEF2YWlsYWJsZSh0LGUpe2lmKCF0fHwhZSlyZXR1cm4hMTtjb25zdCBpPSh0LmlzU2FtZU9yQmVmb3JlKGUsXCJkYXlcIik/dDplKS5jbG9uZSgpLG49KGUuaXNTYW1lT3JBZnRlcih0LFwiZGF5XCIpP2U6dCkuY2xvbmUoKTtmb3IoO2kuaXNTYW1lT3JCZWZvcmUobixcImRheVwiKTspe2lmKHRoaXMudGVzdEZpbHRlcihpKSlyZXR1cm4hMDtpLmFkZCgxLFwiZGF5XCIpfXJldHVybiExfWxvY2tNaW5EYXRlKGUpe3JldHVybiB0aGlzLm9wdGlvbnMubWluRGF0ZSBpbnN0YW5jZW9mIHQmJmUuaXNCZWZvcmUodGhpcy5vcHRpb25zLm1pbkRhdGUsXCJkYXlcIil9bG9ja01heERhdGUoZSl7cmV0dXJuIHRoaXMub3B0aW9ucy5tYXhEYXRlIGluc3RhbmNlb2YgdCYmZS5pc0FmdGVyKHRoaXMub3B0aW9ucy5tYXhEYXRlLFwiZGF5XCIpfWxvY2tNaW5EYXlzKHQsZSl7aWYodGhpcy5vcHRpb25zLm1pbkRheXMmJmUpe2NvbnN0IGk9ZS5jbG9uZSgpLnN1YnRyYWN0KHRoaXMub3B0aW9ucy5taW5EYXlzLTEsXCJkYXlcIiksbj1lLmNsb25lKCkuYWRkKHRoaXMub3B0aW9ucy5taW5EYXlzLTEsXCJkYXlcIik7cmV0dXJuIHQuaXNCZXR3ZWVuKGksbil9cmV0dXJuITF9bG9ja01heERheXModCxlKXtpZih0aGlzLm9wdGlvbnMubWF4RGF5cyYmZSl7Y29uc3QgaT1lLmNsb25lKCkuc3VidHJhY3QodGhpcy5vcHRpb25zLm1heERheXMsXCJkYXlcIiksbj1lLmNsb25lKCkuYWRkKHRoaXMub3B0aW9ucy5tYXhEYXlzLFwiZGF5XCIpO3JldHVybiF0LmlzQmV0d2VlbihpLG4pfXJldHVybiExfWxvY2tTZWxlY3RGb3J3YXJkKHQpe2lmKDE9PT10aGlzLnBpY2tlci5kYXRlUGlja2VkLmxlbmd0aCYmdGhpcy5vcHRpb25zLnNlbGVjdEZvcndhcmQpe2NvbnN0IGU9dGhpcy5waWNrZXIuZGF0ZVBpY2tlZFswXS5jbG9uZSgpO3JldHVybiB0LmlzQmVmb3JlKGUsXCJkYXlcIil9cmV0dXJuITF9bG9ja1NlbGVjdEJhY2t3YXJkKHQpe2lmKDE9PT10aGlzLnBpY2tlci5kYXRlUGlja2VkLmxlbmd0aCYmdGhpcy5vcHRpb25zLnNlbGVjdEJhY2t3YXJkKXtjb25zdCBlPXRoaXMucGlja2VyLmRhdGVQaWNrZWRbMF0uY2xvbmUoKTtyZXR1cm4gdC5pc0FmdGVyKGUsXCJkYXlcIil9cmV0dXJuITF9dGVzdEZpbHRlcih0KXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiB0aGlzLm9wdGlvbnMuZmlsdGVyJiZ0aGlzLm9wdGlvbnMuZmlsdGVyKHQsdGhpcy5waWNrZXIuZGF0ZVBpY2tlZCl9fWNsYXNzIHIgZXh0ZW5kcyBve2RlcGVuZGVuY2llcz1bXCJSYW5nZVBsdWdpblwiXTtiaW5kcz17b25WaWV3OnRoaXMub25WaWV3LmJpbmQodGhpcyksb25DbGljazp0aGlzLm9uQ2xpY2suYmluZCh0aGlzKX07b3B0aW9ucz17Y3VzdG9tTGFiZWxzOltcIlRvZGF5XCIsXCJZZXN0ZXJkYXlcIixcIkxhc3QgNyBEYXlzXCIsXCJMYXN0IDMwIERheXNcIixcIlRoaXMgTW9udGhcIixcIkxhc3QgTW9udGhcIl0sY3VzdG9tUHJlc2V0Ont9LHBvc2l0aW9uOlwibGVmdFwifTtnZXROYW1lKCl7cmV0dXJuXCJQcmVzZXRQbHVnaW5cIn1vbkF0dGFjaCgpe2lmKCFPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnMuY3VzdG9tUHJlc2V0KS5sZW5ndGgpe2NvbnN0IGU9bmV3IHQsaT0oKT0+e2NvbnN0IGk9ZS5jbG9uZSgpO2kuc2V0RGF0ZSgxKTtjb25zdCBuPW5ldyBEYXRlKGUuZ2V0RnVsbFllYXIoKSxlLmdldE1vbnRoKCkrMSwwKTtyZXR1cm5bbmV3IHQoaSksbmV3IHQobildfSxuPSgpPT57Y29uc3QgaT1lLmNsb25lKCk7aS5zZXRNb250aChpLmdldE1vbnRoKCktMSksaS5zZXREYXRlKDEpO2NvbnN0IG49bmV3IERhdGUoZS5nZXRGdWxsWWVhcigpLGUuZ2V0TW9udGgoKSwwKTtyZXR1cm5bbmV3IHQoaSksbmV3IHQobildfSxzPVtbZS5jbG9uZSgpLGUuY2xvbmUoKV0sW2UuY2xvbmUoKS5zdWJ0cmFjdCgxLFwiZGF5XCIpLGUuY2xvbmUoKS5zdWJ0cmFjdCgxLFwiZGF5XCIpXSxbZS5jbG9uZSgpLnN1YnRyYWN0KDYsXCJkYXlcIiksZS5jbG9uZSgpXSxbZS5jbG9uZSgpLnN1YnRyYWN0KDI5LFwiZGF5XCIpLGUuY2xvbmUoKV0saSgpLG4oKV07T2JqZWN0LnZhbHVlcyh0aGlzLm9wdGlvbnMuY3VzdG9tTGFiZWxzKS5mb3JFYWNoKCgodCxlKT0+e3RoaXMub3B0aW9ucy5jdXN0b21QcmVzZXRbdF09c1tlXX0pKX10aGlzLnBpY2tlci5vbihcInZpZXdcIix0aGlzLmJpbmRzLm9uVmlldyksdGhpcy5waWNrZXIub24oXCJjbGlja1wiLHRoaXMuYmluZHMub25DbGljayl9b25EZXRhY2goKXt0aGlzLnBpY2tlci5vZmYoXCJ2aWV3XCIsdGhpcy5iaW5kcy5vblZpZXcpLHRoaXMucGlja2VyLm9mZihcImNsaWNrXCIsdGhpcy5iaW5kcy5vbkNsaWNrKX1vblZpZXcodCl7Y29uc3R7dmlldzplLHRhcmdldDppfT10LmRldGFpbDtpZihcIk1haW5cIj09PWUpe2NvbnN0IHQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTt0LmNsYXNzTmFtZT1cInByZXNldC1wbHVnaW4tY29udGFpbmVyXCIsT2JqZWN0LmtleXModGhpcy5vcHRpb25zLmN1c3RvbVByZXNldCkuZm9yRWFjaCgoZT0+e2lmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLm9wdGlvbnMuY3VzdG9tUHJlc2V0LGUpKXtjb25zdCBpPXRoaXMub3B0aW9ucy5jdXN0b21QcmVzZXRbZV0sbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO24uY2xhc3NOYW1lPVwicHJlc2V0LWJ1dHRvbiB1bml0XCIsbi5pbm5lckhUTUw9ZSxuLmRhdGFzZXQuc3RhcnQ9aVswXS5nZXRUaW1lKCksbi5kYXRhc2V0LmVuZD1pWzFdLmdldFRpbWUoKSx0LmFwcGVuZENoaWxkKG4pLHRoaXMucGlja2VyLnRyaWdnZXIoXCJ2aWV3XCIse3ZpZXc6XCJQcmVzZXRQbHVnaW5CdXR0b25cIix0YXJnZXQ6bn0pfX0pKSxpLmFwcGVuZENoaWxkKHQpLGkuY2xhc3NMaXN0LmFkZChgcHJlc2V0LSR7dGhpcy5vcHRpb25zLnBvc2l0aW9ufWApLHRoaXMucGlja2VyLnRyaWdnZXIoXCJ2aWV3XCIse3ZpZXc6XCJQcmVzZXRQbHVnaW5Db250YWluZXJcIix0YXJnZXQ6dH0pfX1vbkNsaWNrKGUpe2NvbnN0IGk9ZS50YXJnZXQ7aWYoaSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KXtjb25zdCBlPWkuY2xvc2VzdChcIi51bml0XCIpO2lmKCEoZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSlyZXR1cm47aWYodGhpcy5pc1ByZXNldEJ1dHRvbihlKSl7Y29uc3QgaT1uZXcgdChOdW1iZXIoZS5kYXRhc2V0LnN0YXJ0KSksbj1uZXcgdChOdW1iZXIoZS5kYXRhc2V0LmVuZCkpO3RoaXMucGlja2VyLm9wdGlvbnMuYXV0b0FwcGx5Pyh0aGlzLnBpY2tlci5zZXREYXRlUmFuZ2UoaSxuKSx0aGlzLnBpY2tlci50cmlnZ2VyKFwic2VsZWN0XCIse3N0YXJ0OnRoaXMucGlja2VyLmdldFN0YXJ0RGF0ZSgpLGVuZDp0aGlzLnBpY2tlci5nZXRFbmREYXRlKCl9KSx0aGlzLnBpY2tlci5oaWRlKCkpOih0aGlzLnBpY2tlci5kYXRlUGlja2VkPVtpLG5dLHRoaXMucGlja2VyLnJlbmRlckFsbCgpKX19fWlzUHJlc2V0QnV0dG9uKHQpe3JldHVybiB0LmNsYXNzTGlzdC5jb250YWlucyhcInByZXNldC1idXR0b25cIil9fWNsYXNzIGMgZXh0ZW5kcyBve3Rvb2x0aXBFbGVtZW50O3RyaWdnZXJFbGVtZW50O2JpbmRzPXtzZXRTdGFydERhdGU6dGhpcy5zZXRTdGFydERhdGUuYmluZCh0aGlzKSxzZXRFbmREYXRlOnRoaXMuc2V0RW5kRGF0ZS5iaW5kKHRoaXMpLHNldERhdGVSYW5nZTp0aGlzLnNldERhdGVSYW5nZS5iaW5kKHRoaXMpLGdldFN0YXJ0RGF0ZTp0aGlzLmdldFN0YXJ0RGF0ZS5iaW5kKHRoaXMpLGdldEVuZERhdGU6dGhpcy5nZXRFbmREYXRlLmJpbmQodGhpcyksb25WaWV3OnRoaXMub25WaWV3LmJpbmQodGhpcyksb25TaG93OnRoaXMub25TaG93LmJpbmQodGhpcyksb25Nb3VzZUVudGVyOnRoaXMub25Nb3VzZUVudGVyLmJpbmQodGhpcyksb25Nb3VzZUxlYXZlOnRoaXMub25Nb3VzZUxlYXZlLmJpbmQodGhpcyksb25DbGlja0NhbGVuZGFyRGF5OnRoaXMub25DbGlja0NhbGVuZGFyRGF5LmJpbmQodGhpcyksb25DbGlja0FwcGx5QnV0dG9uOnRoaXMub25DbGlja0FwcGx5QnV0dG9uLmJpbmQodGhpcykscGFyc2VWYWx1ZXM6dGhpcy5wYXJzZVZhbHVlcy5iaW5kKHRoaXMpLHVwZGF0ZVZhbHVlczp0aGlzLnVwZGF0ZVZhbHVlcy5iaW5kKHRoaXMpLGNsZWFyOnRoaXMuY2xlYXIuYmluZCh0aGlzKX07b3B0aW9ucz17ZWxlbWVudEVuZDpudWxsLHN0YXJ0RGF0ZTpudWxsLGVuZERhdGU6bnVsbCxyZXBpY2s6ITEsc3RyaWN0OiEwLGRlbGltaXRlcjpcIiAtIFwiLHRvb2x0aXA6ITAsdG9vbHRpcE51bWJlcjp0PT50LGxvY2FsZTp7emVybzpcIlwiLG9uZTpcImRheVwiLHR3bzpcIlwiLGZldzpcIlwiLG1hbnk6XCJcIixvdGhlcjpcImRheXNcIn0sZG9jdW1lbnRDbGljazp0aGlzLmhpZGVQaWNrZXIuYmluZCh0aGlzKX07Z2V0TmFtZSgpe3JldHVyblwiUmFuZ2VQbHVnaW5cIn1vbkF0dGFjaCgpe3RoaXMuYmluZHMuX3NldFN0YXJ0RGF0ZT10aGlzLnBpY2tlci5zZXRTdGFydERhdGUsdGhpcy5iaW5kcy5fc2V0RW5kRGF0ZT10aGlzLnBpY2tlci5zZXRFbmREYXRlLHRoaXMuYmluZHMuX3NldERhdGVSYW5nZT10aGlzLnBpY2tlci5zZXREYXRlUmFuZ2UsdGhpcy5iaW5kcy5fZ2V0U3RhcnREYXRlPXRoaXMucGlja2VyLmdldFN0YXJ0RGF0ZSx0aGlzLmJpbmRzLl9nZXRFbmREYXRlPXRoaXMucGlja2VyLmdldEVuZERhdGUsdGhpcy5iaW5kcy5fcGFyc2VWYWx1ZXM9dGhpcy5waWNrZXIucGFyc2VWYWx1ZXMsdGhpcy5iaW5kcy5fdXBkYXRlVmFsdWVzPXRoaXMucGlja2VyLnVwZGF0ZVZhbHVlcyx0aGlzLmJpbmRzLl9jbGVhcj10aGlzLnBpY2tlci5jbGVhcix0aGlzLmJpbmRzLl9vbkNsaWNrQ2FsZW5kYXJEYXk9dGhpcy5waWNrZXIub25DbGlja0NhbGVuZGFyRGF5LHRoaXMuYmluZHMuX29uQ2xpY2tBcHBseUJ1dHRvbj10aGlzLnBpY2tlci5vbkNsaWNrQXBwbHlCdXR0b24sT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcy5waWNrZXIse3NldFN0YXJ0RGF0ZTp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuc2V0U3RhcnREYXRlfSxzZXRFbmREYXRlOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5zZXRFbmREYXRlfSxzZXREYXRlUmFuZ2U6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLnNldERhdGVSYW5nZX0sZ2V0U3RhcnREYXRlOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5nZXRTdGFydERhdGV9LGdldEVuZERhdGU6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLmdldEVuZERhdGV9LHBhcnNlVmFsdWVzOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5wYXJzZVZhbHVlc30sdXBkYXRlVmFsdWVzOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy51cGRhdGVWYWx1ZXN9LGNsZWFyOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5jbGVhcn0sb25DbGlja0NhbGVuZGFyRGF5Ontjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5vbkNsaWNrQ2FsZW5kYXJEYXl9LG9uQ2xpY2tBcHBseUJ1dHRvbjp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMub25DbGlja0FwcGx5QnV0dG9ufX0pLHRoaXMub3B0aW9ucy5lbGVtZW50RW5kJiYodGhpcy5vcHRpb25zLmVsZW1lbnRFbmQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudHx8KHRoaXMub3B0aW9ucy5lbGVtZW50RW5kPXRoaXMucGlja2VyLm9wdGlvbnMuZG9jLnF1ZXJ5U2VsZWN0b3IodGhpcy5vcHRpb25zLmVsZW1lbnRFbmQpKSx0aGlzLm9wdGlvbnMuZWxlbWVudEVuZCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQmJih0aGlzLm9wdGlvbnMuZWxlbWVudEVuZC5yZWFkT25seT10aGlzLnBpY2tlci5vcHRpb25zLnJlYWRvbmx5KSxcImZ1bmN0aW9uXCI9PXR5cGVvZiB0aGlzLnBpY2tlci5vcHRpb25zLmRvY3VtZW50Q2xpY2smJihkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIix0aGlzLnBpY2tlci5vcHRpb25zLmRvY3VtZW50Q2xpY2ssITApLFwiZnVuY3Rpb25cIj09dHlwZW9mIHRoaXMub3B0aW9ucy5kb2N1bWVudENsaWNrJiZkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIix0aGlzLm9wdGlvbnMuZG9jdW1lbnRDbGljaywhMCkpLHRoaXMub3B0aW9ucy5lbGVtZW50RW5kLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHRoaXMucGlja2VyLnNob3cuYmluZCh0aGlzLnBpY2tlcikpKSx0aGlzLm9wdGlvbnMucmVwaWNrPXRoaXMub3B0aW9ucy5yZXBpY2smJnRoaXMub3B0aW9ucy5lbGVtZW50RW5kIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQsdGhpcy5waWNrZXIub3B0aW9ucy5kYXRlPW51bGwsdGhpcy5waWNrZXIub24oXCJ2aWV3XCIsdGhpcy5iaW5kcy5vblZpZXcpLHRoaXMucGlja2VyLm9uKFwic2hvd1wiLHRoaXMuYmluZHMub25TaG93KSx0aGlzLnBpY2tlci5vbihcIm1vdXNlZW50ZXJcIix0aGlzLmJpbmRzLm9uTW91c2VFbnRlciwhMCksdGhpcy5waWNrZXIub24oXCJtb3VzZWxlYXZlXCIsdGhpcy5iaW5kcy5vbk1vdXNlTGVhdmUsITApLHRoaXMuY2hlY2tJbnRsUGx1cmFsTG9jYWxlcygpfW9uRGV0YWNoKCl7T2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcy5waWNrZXIse3NldFN0YXJ0RGF0ZTp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuX3NldFN0YXJ0RGF0ZX0sc2V0RW5kRGF0ZTp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuX3NldEVuZERhdGV9LHNldERhdGVSYW5nZTp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuX3NldERhdGVSYW5nZX0sZ2V0U3RhcnREYXRlOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5fZ2V0U3RhcnREYXRlfSxnZXRFbmREYXRlOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5fZ2V0RW5kRGF0ZX0scGFyc2VWYWx1ZXM6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLl9wYXJzZVZhbHVlc30sdXBkYXRlVmFsdWVzOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5fdXBkYXRlVmFsdWVzfSxjbGVhcjp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuX2NsZWFyfSxvbkNsaWNrQ2FsZW5kYXJEYXk6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLl9vbkNsaWNrQ2FsZW5kYXJEYXl9LG9uQ2xpY2tBcHBseUJ1dHRvbjp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuX29uQ2xpY2tBcHBseUJ1dHRvbn19KSx0aGlzLnBpY2tlci5vZmYoXCJ2aWV3XCIsdGhpcy5iaW5kcy5vblZpZXcpLHRoaXMucGlja2VyLm9mZihcInNob3dcIix0aGlzLmJpbmRzLm9uU2hvdyksdGhpcy5waWNrZXIub2ZmKFwibW91c2VlbnRlclwiLHRoaXMuYmluZHMub25Nb3VzZUVudGVyLCEwKSx0aGlzLnBpY2tlci5vZmYoXCJtb3VzZWxlYXZlXCIsdGhpcy5iaW5kcy5vbk1vdXNlTGVhdmUsITApfXBhcnNlVmFsdWVzKCl7aWYodGhpcy5vcHRpb25zLnN0YXJ0RGF0ZXx8dGhpcy5vcHRpb25zLmVuZERhdGUpdGhpcy5vcHRpb25zLnN0cmljdD90aGlzLm9wdGlvbnMuc3RhcnREYXRlJiZ0aGlzLm9wdGlvbnMuZW5kRGF0ZT90aGlzLnNldERhdGVSYW5nZSh0aGlzLm9wdGlvbnMuc3RhcnREYXRlLHRoaXMub3B0aW9ucy5lbmREYXRlKToodGhpcy5vcHRpb25zLnN0YXJ0RGF0ZT1udWxsLHRoaXMub3B0aW9ucy5lbmREYXRlPW51bGwpOih0aGlzLm9wdGlvbnMuc3RhcnREYXRlJiZ0aGlzLnNldFN0YXJ0RGF0ZSh0aGlzLm9wdGlvbnMuc3RhcnREYXRlKSx0aGlzLm9wdGlvbnMuZW5kRGF0ZSYmdGhpcy5zZXRFbmREYXRlKHRoaXMub3B0aW9ucy5lbmREYXRlKSk7ZWxzZSBpZih0aGlzLm9wdGlvbnMuZWxlbWVudEVuZCl0aGlzLm9wdGlvbnMuc3RyaWN0P3RoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQmJnRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudC52YWx1ZS5sZW5ndGgmJnRoaXMub3B0aW9ucy5lbGVtZW50RW5kIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCYmdGhpcy5vcHRpb25zLmVsZW1lbnRFbmQudmFsdWUubGVuZ3RoJiZ0aGlzLnNldERhdGVSYW5nZSh0aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQudmFsdWUsdGhpcy5vcHRpb25zLmVsZW1lbnRFbmQudmFsdWUpOih0aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50JiZ0aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQudmFsdWUubGVuZ3RoJiZ0aGlzLnNldFN0YXJ0RGF0ZSh0aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQudmFsdWUpLHRoaXMub3B0aW9ucy5lbGVtZW50RW5kIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCYmdGhpcy5vcHRpb25zLmVsZW1lbnRFbmQudmFsdWUubGVuZ3RoJiZ0aGlzLnNldEVuZERhdGUodGhpcy5vcHRpb25zLmVsZW1lbnRFbmQudmFsdWUpKTtlbHNlIGlmKHRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQmJnRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudC52YWx1ZS5sZW5ndGgpe2NvbnN0W3QsZV09dGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50LnZhbHVlLnNwbGl0KHRoaXMub3B0aW9ucy5kZWxpbWl0ZXIpO3RoaXMub3B0aW9ucy5zdHJpY3Q/dCYmZSYmdGhpcy5zZXREYXRlUmFuZ2UodCxlKToodCYmdGhpcy5zZXRTdGFydERhdGUodCksZSYmdGhpcy5zZXRFbmREYXRlKGUpKX19dXBkYXRlVmFsdWVzKCl7Y29uc3QgdD10aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQsZT10aGlzLm9wdGlvbnMuZWxlbWVudEVuZCxpPXRoaXMucGlja2VyLmdldFN0YXJ0RGF0ZSgpLG49dGhpcy5waWNrZXIuZ2V0RW5kRGF0ZSgpLHM9aSBpbnN0YW5jZW9mIERhdGU/aS5mb3JtYXQodGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQsdGhpcy5waWNrZXIub3B0aW9ucy5sYW5nKTpcIlwiLG89biBpbnN0YW5jZW9mIERhdGU/bi5mb3JtYXQodGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQsdGhpcy5waWNrZXIub3B0aW9ucy5sYW5nKTpcIlwiO2lmKGUpdCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQ/dC52YWx1ZT1zOnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCYmKHQuaW5uZXJUZXh0PXMpLGUgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50P2UudmFsdWU9bzplIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQmJihlLmlubmVyVGV4dD1vKTtlbHNle2NvbnN0IGU9YCR7c30ke3N8fG8/dGhpcy5vcHRpb25zLmRlbGltaXRlcjpcIlwifSR7b31gO3QgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50P3QudmFsdWU9ZTp0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQmJih0LmlubmVyVGV4dD1lKX19Y2xlYXIoKXt0aGlzLm9wdGlvbnMuc3RhcnREYXRlPW51bGwsdGhpcy5vcHRpb25zLmVuZERhdGU9bnVsbCx0aGlzLnBpY2tlci5kYXRlUGlja2VkLmxlbmd0aD0wLHRoaXMudXBkYXRlVmFsdWVzKCksdGhpcy5waWNrZXIucmVuZGVyQWxsKCksdGhpcy5waWNrZXIudHJpZ2dlcihcImNsZWFyXCIpfW9uU2hvdyh0KXtjb25zdHt0YXJnZXQ6ZX09dC5kZXRhaWw7dGhpcy50cmlnZ2VyRWxlbWVudD1lLHRoaXMucGlja2VyLm9wdGlvbnMuc2Nyb2xsVG9EYXRlJiZ0aGlzLmdldFN0YXJ0RGF0ZSgpaW5zdGFuY2VvZiBEYXRlJiZ0aGlzLnBpY2tlci5nb3RvRGF0ZSh0aGlzLmdldFN0YXJ0RGF0ZSgpKSx0aGlzLmluaXRpYWxpemVSZXBpY2soKX1vblZpZXcoZSl7Y29uc3R7dmlldzppLHRhcmdldDpufT1lLmRldGFpbDtpZihcIk1haW5cIj09PWkmJih0aGlzLnRvb2x0aXBFbGVtZW50PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpLHRoaXMudG9vbHRpcEVsZW1lbnQuY2xhc3NOYW1lPVwicmFuZ2UtcGx1Z2luLXRvb2x0aXBcIixuLmFwcGVuZENoaWxkKHRoaXMudG9vbHRpcEVsZW1lbnQpKSxcIkNhbGVuZGFyRGF5XCI9PT1pKXtjb25zdCBlPW5ldyB0KG4uZGF0YXNldC50aW1lKSxpPXRoaXMucGlja2VyLmRhdGVQaWNrZWQscz1pLmxlbmd0aD90aGlzLnBpY2tlci5kYXRlUGlja2VkWzBdOnRoaXMuZ2V0U3RhcnREYXRlKCksbz1pLmxlbmd0aD90aGlzLnBpY2tlci5kYXRlUGlja2VkWzFdOnRoaXMuZ2V0RW5kRGF0ZSgpO3MmJnMuaXNTYW1lKGUsXCJkYXlcIikmJm4uY2xhc3NMaXN0LmFkZChcInN0YXJ0XCIpLHMmJm8mJihvLmlzU2FtZShlLFwiZGF5XCIpJiZuLmNsYXNzTGlzdC5hZGQoXCJlbmRcIiksZS5pc0JldHdlZW4ocyxvKSYmbi5jbGFzc0xpc3QuYWRkKFwiaW4tcmFuZ2VcIikpfWlmKFwiRm9vdGVyXCI9PT1pKXtjb25zdCB0PTE9PT10aGlzLnBpY2tlci5kYXRlUGlja2VkLmxlbmd0aCYmIXRoaXMub3B0aW9ucy5zdHJpY3R8fDI9PT10aGlzLnBpY2tlci5kYXRlUGlja2VkLmxlbmd0aDtuLnF1ZXJ5U2VsZWN0b3IoXCIuYXBwbHktYnV0dG9uXCIpLmRpc2FibGVkPSF0fX1oaWRlUGlja2VyKHQpe2xldCBlPXQudGFyZ2V0LGk9bnVsbDtlLnNoYWRvd1Jvb3QmJihlPXQuY29tcG9zZWRQYXRoKClbMF0saT1lLmdldFJvb3ROb2RlKCkuaG9zdCksdGhpcy5waWNrZXIuaXNTaG93bigpJiZpIT09dGhpcy5waWNrZXIudWkud3JhcHBlciYmZSE9PXRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudCYmZSE9PXRoaXMub3B0aW9ucy5lbGVtZW50RW5kJiZ0aGlzLnBpY2tlci5oaWRlKCl9c2V0U3RhcnREYXRlKGUpe2NvbnN0IGk9bmV3IHQoZSx0aGlzLnBpY2tlci5vcHRpb25zLmZvcm1hdCk7dGhpcy5vcHRpb25zLnN0YXJ0RGF0ZT1pP2kuY2xvbmUoKTpudWxsLHRoaXMudXBkYXRlVmFsdWVzKCksdGhpcy5waWNrZXIucmVuZGVyQWxsKCl9c2V0RW5kRGF0ZShlKXtjb25zdCBpPW5ldyB0KGUsdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQpO3RoaXMub3B0aW9ucy5lbmREYXRlPWk/aS5jbG9uZSgpOm51bGwsdGhpcy51cGRhdGVWYWx1ZXMoKSx0aGlzLnBpY2tlci5yZW5kZXJBbGwoKX1zZXREYXRlUmFuZ2UoZSxpKXtjb25zdCBuPW5ldyB0KGUsdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQpLHM9bmV3IHQoaSx0aGlzLnBpY2tlci5vcHRpb25zLmZvcm1hdCk7dGhpcy5vcHRpb25zLnN0YXJ0RGF0ZT1uP24uY2xvbmUoKTpudWxsLHRoaXMub3B0aW9ucy5lbmREYXRlPXM/cy5jbG9uZSgpOm51bGwsdGhpcy51cGRhdGVWYWx1ZXMoKSx0aGlzLnBpY2tlci5yZW5kZXJBbGwoKX1nZXRTdGFydERhdGUoKXtyZXR1cm4gdGhpcy5vcHRpb25zLnN0YXJ0RGF0ZSBpbnN0YW5jZW9mIERhdGU/dGhpcy5vcHRpb25zLnN0YXJ0RGF0ZS5jbG9uZSgpOm51bGx9Z2V0RW5kRGF0ZSgpe3JldHVybiB0aGlzLm9wdGlvbnMuZW5kRGF0ZSBpbnN0YW5jZW9mIERhdGU/dGhpcy5vcHRpb25zLmVuZERhdGUuY2xvbmUoKTpudWxsfW9uTW91c2VFbnRlcihlKXtjb25zdCBpPWUudGFyZ2V0O2lmKGkgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCl7dGhpcy5pc0NvbnRhaW5lcihpKSYmdGhpcy5pbml0aWFsaXplUmVwaWNrKCk7Y29uc3QgZT1pLmNsb3Nlc3QoXCIudW5pdFwiKTtpZighKGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpcmV0dXJuO2lmKHRoaXMucGlja2VyLmlzQ2FsZW5kYXJEYXkoZSkpe2lmKDEhPT10aGlzLnBpY2tlci5kYXRlUGlja2VkLmxlbmd0aClyZXR1cm47bGV0IGk9dGhpcy5waWNrZXIuZGF0ZVBpY2tlZFswXS5jbG9uZSgpLG49bmV3IHQoZS5kYXRhc2V0LnRpbWUpLHM9ITE7aWYoaS5pc0FmdGVyKG4sXCJkYXlcIikpe2NvbnN0IHQ9aS5jbG9uZSgpO2k9bi5jbG9uZSgpLG49dC5jbG9uZSgpLHM9ITB9aWYoWy4uLnRoaXMucGlja2VyLnVpLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLmRheVwiKV0uZm9yRWFjaCgobz0+e2NvbnN0IGE9bmV3IHQoby5kYXRhc2V0LnRpbWUpLHI9dGhpcy5waWNrZXIuQ2FsZW5kYXIuZ2V0Q2FsZW5kYXJEYXlWaWV3KGEpO2EuaXNCZXR3ZWVuKGksbikmJnIuY2xhc3NMaXN0LmFkZChcImluLXJhbmdlXCIpLGEuaXNTYW1lKHRoaXMucGlja2VyLmRhdGVQaWNrZWRbMF0sXCJkYXlcIikmJihyLmNsYXNzTGlzdC5hZGQoXCJzdGFydFwiKSxyLmNsYXNzTGlzdC50b2dnbGUoXCJmbGlwcGVkXCIscykpLG89PT1lJiYoci5jbGFzc0xpc3QuYWRkKFwiZW5kXCIpLHIuY2xhc3NMaXN0LnRvZ2dsZShcImZsaXBwZWRcIixzKSksby5jbGFzc05hbWU9ci5jbGFzc05hbWV9KSksdGhpcy5vcHRpb25zLnRvb2x0aXApe2NvbnN0IHQ9dGhpcy5vcHRpb25zLnRvb2x0aXBOdW1iZXIobi5kaWZmKGksXCJkYXlcIikrMSk7aWYodD4wKXtjb25zdCBpPW5ldyBJbnRsLlBsdXJhbFJ1bGVzKHRoaXMucGlja2VyLm9wdGlvbnMubGFuZykuc2VsZWN0KHQpLG49YCR7dH0gJHt0aGlzLm9wdGlvbnMubG9jYWxlW2ldfWA7dGhpcy5zaG93VG9vbHRpcChlLG4pfWVsc2UgdGhpcy5oaWRlVG9vbHRpcCgpfX19fW9uTW91c2VMZWF2ZSh0KXtpZih0aGlzLmlzQ29udGFpbmVyKHQudGFyZ2V0KSYmdGhpcy5vcHRpb25zLnJlcGljayl7Y29uc3QgdD10aGlzLmdldFN0YXJ0RGF0ZSgpLGU9dGhpcy5nZXRFbmREYXRlKCk7dCYmZSYmKHRoaXMucGlja2VyLmRhdGVQaWNrZWQubGVuZ3RoPTAsdGhpcy5waWNrZXIucmVuZGVyQWxsKCkpfX1vbkNsaWNrQ2FsZW5kYXJEYXkoZSl7aWYodGhpcy5waWNrZXIuaXNDYWxlbmRhckRheShlKSl7Mj09PXRoaXMucGlja2VyLmRhdGVQaWNrZWQubGVuZ3RoJiYodGhpcy5waWNrZXIuZGF0ZVBpY2tlZC5sZW5ndGg9MCk7Y29uc3QgaT1uZXcgdChlLmRhdGFzZXQudGltZSk7aWYodGhpcy5waWNrZXIuZGF0ZVBpY2tlZFt0aGlzLnBpY2tlci5kYXRlUGlja2VkLmxlbmd0aF09aSwyPT09dGhpcy5waWNrZXIuZGF0ZVBpY2tlZC5sZW5ndGgmJnRoaXMucGlja2VyLmRhdGVQaWNrZWRbMF0uaXNBZnRlcih0aGlzLnBpY2tlci5kYXRlUGlja2VkWzFdKSl7Y29uc3QgdD10aGlzLnBpY2tlci5kYXRlUGlja2VkWzFdLmNsb25lKCk7dGhpcy5waWNrZXIuZGF0ZVBpY2tlZFsxXT10aGlzLnBpY2tlci5kYXRlUGlja2VkWzBdLmNsb25lKCksdGhpcy5waWNrZXIuZGF0ZVBpY2tlZFswXT10LmNsb25lKCl9MSE9PXRoaXMucGlja2VyLmRhdGVQaWNrZWQubGVuZ3RoJiZ0aGlzLnBpY2tlci5vcHRpb25zLmF1dG9BcHBseXx8dGhpcy5waWNrZXIudHJpZ2dlcihcInByZXNlbGVjdFwiLHtzdGFydDp0aGlzLnBpY2tlci5kYXRlUGlja2VkWzBdaW5zdGFuY2VvZiBEYXRlP3RoaXMucGlja2VyLmRhdGVQaWNrZWRbMF0uY2xvbmUoKTpudWxsLGVuZDp0aGlzLnBpY2tlci5kYXRlUGlja2VkWzFdaW5zdGFuY2VvZiBEYXRlP3RoaXMucGlja2VyLmRhdGVQaWNrZWRbMV0uY2xvbmUoKTpudWxsfSksMT09PXRoaXMucGlja2VyLmRhdGVQaWNrZWQubGVuZ3RoJiYoIXRoaXMub3B0aW9ucy5zdHJpY3QmJnRoaXMucGlja2VyLm9wdGlvbnMuYXV0b0FwcGx5JiYodGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50PT09dGhpcy50cmlnZ2VyRWxlbWVudCYmdGhpcy5zZXRTdGFydERhdGUodGhpcy5waWNrZXIuZGF0ZVBpY2tlZFswXSksdGhpcy5vcHRpb25zLmVsZW1lbnRFbmQ9PT10aGlzLnRyaWdnZXJFbGVtZW50JiZ0aGlzLnNldEVuZERhdGUodGhpcy5waWNrZXIuZGF0ZVBpY2tlZFswXSksdGhpcy5waWNrZXIudHJpZ2dlcihcInNlbGVjdFwiLHtzdGFydDp0aGlzLnBpY2tlci5nZXRTdGFydERhdGUoKSxlbmQ6dGhpcy5waWNrZXIuZ2V0RW5kRGF0ZSgpfSkpLHRoaXMucGlja2VyLnJlbmRlckFsbCgpKSwyPT09dGhpcy5waWNrZXIuZGF0ZVBpY2tlZC5sZW5ndGgmJih0aGlzLnBpY2tlci5vcHRpb25zLmF1dG9BcHBseT8odGhpcy5zZXREYXRlUmFuZ2UodGhpcy5waWNrZXIuZGF0ZVBpY2tlZFswXSx0aGlzLnBpY2tlci5kYXRlUGlja2VkWzFdKSx0aGlzLnBpY2tlci50cmlnZ2VyKFwic2VsZWN0XCIse3N0YXJ0OnRoaXMucGlja2VyLmdldFN0YXJ0RGF0ZSgpLGVuZDp0aGlzLnBpY2tlci5nZXRFbmREYXRlKCl9KSx0aGlzLnBpY2tlci5oaWRlKCkpOih0aGlzLmhpZGVUb29sdGlwKCksdGhpcy5waWNrZXIucmVuZGVyQWxsKCkpKX19b25DbGlja0FwcGx5QnV0dG9uKHQpe3RoaXMucGlja2VyLmlzQXBwbHlCdXR0b24odCkmJigxIT09dGhpcy5waWNrZXIuZGF0ZVBpY2tlZC5sZW5ndGh8fHRoaXMub3B0aW9ucy5zdHJpY3R8fCh0aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQ9PT10aGlzLnRyaWdnZXJFbGVtZW50JiYodGhpcy5vcHRpb25zLmVuZERhdGU9bnVsbCx0aGlzLnNldFN0YXJ0RGF0ZSh0aGlzLnBpY2tlci5kYXRlUGlja2VkWzBdKSksdGhpcy5vcHRpb25zLmVsZW1lbnRFbmQ9PT10aGlzLnRyaWdnZXJFbGVtZW50JiYodGhpcy5vcHRpb25zLnN0YXJ0RGF0ZT1udWxsLHRoaXMuc2V0RW5kRGF0ZSh0aGlzLnBpY2tlci5kYXRlUGlja2VkWzBdKSkpLDI9PT10aGlzLnBpY2tlci5kYXRlUGlja2VkLmxlbmd0aCYmdGhpcy5zZXREYXRlUmFuZ2UodGhpcy5waWNrZXIuZGF0ZVBpY2tlZFswXSx0aGlzLnBpY2tlci5kYXRlUGlja2VkWzFdKSx0aGlzLnBpY2tlci50cmlnZ2VyKFwic2VsZWN0XCIse3N0YXJ0OnRoaXMucGlja2VyLmdldFN0YXJ0RGF0ZSgpLGVuZDp0aGlzLnBpY2tlci5nZXRFbmREYXRlKCl9KSx0aGlzLnBpY2tlci5oaWRlKCkpfXNob3dUb29sdGlwKHQsZSl7dGhpcy50b29sdGlwRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5PVwidmlzaWJsZVwiLHRoaXMudG9vbHRpcEVsZW1lbnQuaW5uZXJIVE1MPWU7Y29uc3QgaT10aGlzLnBpY2tlci51aS5jb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksbj10aGlzLnRvb2x0aXBFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLHM9dC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtsZXQgbz1zLnRvcCxhPXMubGVmdDtvLT1pLnRvcCxhLT1pLmxlZnQsby09bi5oZWlnaHQsYS09bi53aWR0aC8yLGErPXMud2lkdGgvMix0aGlzLnRvb2x0aXBFbGVtZW50LnN0eWxlLnRvcD1gJHtvfXB4YCx0aGlzLnRvb2x0aXBFbGVtZW50LnN0eWxlLmxlZnQ9YCR7YX1weGB9aGlkZVRvb2x0aXAoKXt0aGlzLnRvb2x0aXBFbGVtZW50LnN0eWxlLnZpc2liaWxpdHk9XCJoaWRkZW5cIn1jaGVja0ludGxQbHVyYWxMb2NhbGVzKCl7aWYoIXRoaXMub3B0aW9ucy50b29sdGlwKXJldHVybjtjb25zdCB0PVsuLi5uZXcgU2V0KFtuZXcgSW50bC5QbHVyYWxSdWxlcyh0aGlzLnBpY2tlci5vcHRpb25zLmxhbmcpLnNlbGVjdCgwKSxuZXcgSW50bC5QbHVyYWxSdWxlcyh0aGlzLnBpY2tlci5vcHRpb25zLmxhbmcpLnNlbGVjdCgxKSxuZXcgSW50bC5QbHVyYWxSdWxlcyh0aGlzLnBpY2tlci5vcHRpb25zLmxhbmcpLnNlbGVjdCgyKSxuZXcgSW50bC5QbHVyYWxSdWxlcyh0aGlzLnBpY2tlci5vcHRpb25zLmxhbmcpLnNlbGVjdCg2KSxuZXcgSW50bC5QbHVyYWxSdWxlcyh0aGlzLnBpY2tlci5vcHRpb25zLmxhbmcpLnNlbGVjdCgxOCldKV0sZT1PYmplY3Qua2V5cyh0aGlzLm9wdGlvbnMubG9jYWxlKTt0LmV2ZXJ5KCh0PT5lLmluY2x1ZGVzKHQpKSl8fGNvbnNvbGUud2FybihgJHt0aGlzLmdldE5hbWUoKX06IHByb3ZpZGUgbG9jYWxlcyAoJHt0LmpvaW4oXCIsIFwiKX0pIGZvciBjb3JyZWN0IHRvb2x0aXAgdGV4dC5gKX1pbml0aWFsaXplUmVwaWNrKCl7aWYoIXRoaXMub3B0aW9ucy5yZXBpY2spcmV0dXJuO2NvbnN0IHQ9dGhpcy5nZXRTdGFydERhdGUoKSxlPXRoaXMuZ2V0RW5kRGF0ZSgpO2UmJnRoaXMudHJpZ2dlckVsZW1lbnQ9PT10aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQmJih0aGlzLnBpY2tlci5kYXRlUGlja2VkWzBdPWUpLHQmJnRoaXMudHJpZ2dlckVsZW1lbnQ9PT10aGlzLm9wdGlvbnMuZWxlbWVudEVuZCYmKHRoaXMucGlja2VyLmRhdGVQaWNrZWRbMF09dCl9aXNDb250YWluZXIodCl7cmV0dXJuIHQ9PT10aGlzLnBpY2tlci51aS5jb250YWluZXJ9fWNsYXNzIGwgZXh0ZW5kcyBve29wdGlvbnM9e25hdGl2ZTohMSxzZWNvbmRzOiExLHN0ZXBIb3VyczoxLHN0ZXBNaW51dGVzOjUsc3RlcFNlY29uZHM6NSxmb3JtYXQxMjohMX07cmFuZ2VQbHVnaW47dGltZVBpY2tlZD17aW5wdXQ6bnVsbCxzdGFydDpudWxsLGVuZDpudWxsfTt0aW1lUHJlUGlja2VkPXtpbnB1dDpudWxsLHN0YXJ0Om51bGwsZW5kOm51bGx9O2JpbmRzPXtnZXREYXRlOnRoaXMuZ2V0RGF0ZS5iaW5kKHRoaXMpLGdldFN0YXJ0RGF0ZTp0aGlzLmdldFN0YXJ0RGF0ZS5iaW5kKHRoaXMpLGdldEVuZERhdGU6dGhpcy5nZXRFbmREYXRlLmJpbmQodGhpcyksb25WaWV3OnRoaXMub25WaWV3LmJpbmQodGhpcyksb25JbnB1dDp0aGlzLm9uSW5wdXQuYmluZCh0aGlzKSxvbkNoYW5nZTp0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcyksb25DbGljazp0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSxzZXRUaW1lOnRoaXMuc2V0VGltZS5iaW5kKHRoaXMpLHNldFN0YXJ0VGltZTp0aGlzLnNldFN0YXJ0VGltZS5iaW5kKHRoaXMpLHNldEVuZFRpbWU6dGhpcy5zZXRFbmRUaW1lLmJpbmQodGhpcyl9O2dldE5hbWUoKXtyZXR1cm5cIlRpbWVQbHVnaW5cIn1vbkF0dGFjaCgpe3RoaXMuYmluZHMuX2dldERhdGU9dGhpcy5waWNrZXIuZ2V0RGF0ZSx0aGlzLmJpbmRzLl9nZXRTdGFydERhdGU9dGhpcy5waWNrZXIuZ2V0U3RhcnREYXRlLHRoaXMuYmluZHMuX2dldEVuZERhdGU9dGhpcy5waWNrZXIuZ2V0RW5kRGF0ZSxPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLnBpY2tlcix7Z2V0RGF0ZTp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuZ2V0RGF0ZX0sZ2V0U3RhcnREYXRlOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5nZXRTdGFydERhdGV9LGdldEVuZERhdGU6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLmdldEVuZERhdGV9LHNldFRpbWU6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLnNldFRpbWV9LHNldFN0YXJ0VGltZTp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuc2V0U3RhcnRUaW1lfSxzZXRFbmRUaW1lOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5zZXRFbmRUaW1lfX0pLHRoaXMucmFuZ2VQbHVnaW49dGhpcy5waWNrZXIuUGx1Z2luTWFuYWdlci5nZXRJbnN0YW5jZShcIlJhbmdlUGx1Z2luXCIpLHRoaXMucGFyc2VWYWx1ZXMoKSx0aGlzLnBpY2tlci5vbihcInZpZXdcIix0aGlzLmJpbmRzLm9uVmlldyksdGhpcy5waWNrZXIub24oXCJpbnB1dFwiLHRoaXMuYmluZHMub25JbnB1dCksdGhpcy5waWNrZXIub24oXCJjaGFuZ2VcIix0aGlzLmJpbmRzLm9uQ2hhbmdlKSx0aGlzLnBpY2tlci5vbihcImNsaWNrXCIsdGhpcy5iaW5kcy5vbkNsaWNrKX1vbkRldGFjaCgpe2RlbGV0ZSB0aGlzLnBpY2tlci5zZXRUaW1lLGRlbGV0ZSB0aGlzLnBpY2tlci5zZXRTdGFydFRpbWUsZGVsZXRlIHRoaXMucGlja2VyLnNldEVuZFRpbWUsT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcy5waWNrZXIse2dldERhdGU6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLl9nZXREYXRlfSxnZXRTdGFydERhdGU6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLl9nZXRTdGFydERhdGV9LGdldEVuZERhdGU6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLl9nZXRFbmREYXRlfX0pLHRoaXMucGlja2VyLm9mZihcInZpZXdcIix0aGlzLmJpbmRzLm9uVmlldyksdGhpcy5waWNrZXIub2ZmKFwiaW5wdXRcIix0aGlzLmJpbmRzLm9uSW5wdXQpLHRoaXMucGlja2VyLm9mZihcImNoYW5nZVwiLHRoaXMuYmluZHMub25DaGFuZ2UpLHRoaXMucGlja2VyLm9mZihcImNsaWNrXCIsdGhpcy5iaW5kcy5vbkNsaWNrKX1vblZpZXcodCl7Y29uc3R7dmlldzplLHRhcmdldDppfT10LmRldGFpbDtpZihcIk1haW5cIj09PWUpe3RoaXMucmFuZ2VQbHVnaW49dGhpcy5waWNrZXIuUGx1Z2luTWFuYWdlci5nZXRJbnN0YW5jZShcIlJhbmdlUGx1Z2luXCIpO2NvbnN0IHQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtpZih0LmNsYXNzTmFtZT1cInRpbWUtcGx1Z2luLWNvbnRhaW5lclwiLHRoaXMucmFuZ2VQbHVnaW4pe2NvbnN0IGU9dGhpcy5nZXRTdGFydElucHV0KCk7dC5hcHBlbmRDaGlsZChlKSx0aGlzLnBpY2tlci50cmlnZ2VyKFwidmlld1wiLHt2aWV3OlwiVGltZVBsdWdpbklucHV0XCIsdGFyZ2V0OmV9KTtjb25zdCBpPXRoaXMuZ2V0RW5kSW5wdXQoKTt0LmFwcGVuZENoaWxkKGkpLHRoaXMucGlja2VyLnRyaWdnZXIoXCJ2aWV3XCIse3ZpZXc6XCJUaW1lUGx1Z2luSW5wdXRcIix0YXJnZXQ6aX0pfWVsc2V7Y29uc3QgZT10aGlzLmdldFNpbmdsZUlucHV0KCk7dC5hcHBlbmRDaGlsZChlKSx0aGlzLnBpY2tlci50cmlnZ2VyKFwidmlld1wiLHt2aWV3OlwiVGltZVBsdWdpbklucHV0XCIsdGFyZ2V0OmV9KX1pLmFwcGVuZENoaWxkKHQpLHRoaXMucGlja2VyLnRyaWdnZXIoXCJ2aWV3XCIse3ZpZXc6XCJUaW1lUGx1Z2luQ29udGFpbmVyXCIsdGFyZ2V0OnR9KX19b25JbnB1dChlKXtjb25zdCBpPWUudGFyZ2V0O2lmKGkgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50JiZpLmNsYXNzTGlzdC5jb250YWlucyhcInRpbWUtcGx1Z2luLWlucHV0XCIpKXtjb25zdCBlPXRoaXMudGltZVBpY2tlZFtpLm5hbWVdfHxuZXcgdCxbbixzXT1pLnZhbHVlLnNwbGl0KFwiOlwiKTtlLnNldEhvdXJzKE51bWJlcihuKXx8MCxOdW1iZXIocyl8fDAsMCwwKSx0aGlzLnBpY2tlci5vcHRpb25zLmF1dG9BcHBseT8odGhpcy50aW1lUGlja2VkW2kubmFtZV09ZSx0aGlzLnBpY2tlci51cGRhdGVWYWx1ZXMoKSk6dGhpcy50aW1lUHJlUGlja2VkW2kubmFtZV09ZX19b25DaGFuZ2UoZSl7Y29uc3QgaT1lLnRhcmdldDtpZihpIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQmJmkuY2xhc3NMaXN0LmNvbnRhaW5zKFwidGltZS1wbHVnaW4tY3VzdG9tLWlucHV0XCIpKXtjb25zdCBlPS8oXFx3KylcXFsoXFx3KylcXF0vLFssbixzXT1pLm5hbWUubWF0Y2goZSksbz1OdW1iZXIoaS52YWx1ZSk7bGV0IGE9bmV3IHQ7c3dpdGNoKCF0aGlzLnBpY2tlci5vcHRpb25zLmF1dG9BcHBseSYmdGhpcy50aW1lUHJlUGlja2VkW25daW5zdGFuY2VvZiBEYXRlP2E9dGhpcy50aW1lUHJlUGlja2VkW25dLmNsb25lKCk6dGhpcy50aW1lUGlja2VkW25daW5zdGFuY2VvZiBEYXRlJiYoYT10aGlzLnRpbWVQaWNrZWRbbl0uY2xvbmUoKSkscyl7Y2FzZVwiSEhcIjppZih0aGlzLm9wdGlvbnMuZm9ybWF0MTIpe2NvbnN0IHQ9aS5jbG9zZXN0KFwiLnRpbWUtcGx1Z2luLWN1c3RvbS1ibG9ja1wiKS5xdWVyeVNlbGVjdG9yKGBzZWxlY3RbbmFtZT1cIiR7bn1bcGVyaW9kXVwiXWApLnZhbHVlLGU9dGhpcy5oYW5kbGVGb3JtYXQxMih0LGEsbyk7YS5zZXRIb3VycyhlLmdldEhvdXJzKCksZS5nZXRNaW51dGVzKCksZS5nZXRTZWNvbmRzKCksMCl9ZWxzZSBhLnNldEhvdXJzKG8sYS5nZXRNaW51dGVzKCksYS5nZXRTZWNvbmRzKCksMCk7YnJlYWs7Y2FzZVwibW1cIjphLnNldEhvdXJzKGEuZ2V0SG91cnMoKSxvLGEuZ2V0U2Vjb25kcygpLDApO2JyZWFrO2Nhc2VcInNzXCI6YS5zZXRIb3VycyhhLmdldEhvdXJzKCksYS5nZXRNaW51dGVzKCksbywwKTticmVhaztjYXNlXCJwZXJpb2RcIjppZih0aGlzLm9wdGlvbnMuZm9ybWF0MTIpe2NvbnN0IHQ9aS5jbG9zZXN0KFwiLnRpbWUtcGx1Z2luLWN1c3RvbS1ibG9ja1wiKS5xdWVyeVNlbGVjdG9yKGBzZWxlY3RbbmFtZT1cIiR7bn1bSEhdXCJdYCkudmFsdWUsZT10aGlzLmhhbmRsZUZvcm1hdDEyKGkudmFsdWUsYSxOdW1iZXIodCkpO2Euc2V0SG91cnMoZS5nZXRIb3VycygpLGUuZ2V0TWludXRlcygpLGUuZ2V0U2Vjb25kcygpLDApfX1pZih0aGlzLnBpY2tlci5vcHRpb25zLmF1dG9BcHBseSl0aGlzLnRpbWVQaWNrZWRbbl09YSx0aGlzLnBpY2tlci51cGRhdGVWYWx1ZXMoKTtlbHNle3RoaXMudGltZVByZVBpY2tlZFtuXT1hO2NvbnN0IHQ9dGhpcy5waWNrZXIudWkuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuYXBwbHktYnV0dG9uXCIpO2lmKHRoaXMucmFuZ2VQbHVnaW4pe2NvbnN0IGU9dGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLGk9dGhpcy5waWNrZXIuZGF0ZVBpY2tlZCxuPWUuc3RyaWN0JiYyPT09aS5sZW5ndGh8fCFlLnN0cmljdCYmaS5sZW5ndGg+MHx8IWkubGVuZ3RoJiZlLnN0cmljdCYmZS5zdGFydERhdGUgaW5zdGFuY2VvZiBEYXRlJiZlLmVuZERhdGUgaW5zdGFuY2VvZiBEYXRlfHwhaS5sZW5ndGgmJiFlLnN0cmljdCYmKGUuc3RhcnREYXRlIGluc3RhbmNlb2YgRGF0ZXx8ZS5lbmREYXRlIGluc3RhbmNlb2YgRGF0ZSk7dC5kaXNhYmxlZD0hbn1lbHNlIHRoaXMucGlja2VyLmRhdGVQaWNrZWQubGVuZ3RoJiYodC5kaXNhYmxlZD0hMSl9fX1vbkNsaWNrKHQpe2NvbnN0IGU9dC50YXJnZXQ7aWYoZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KXtjb25zdCB0PWUuY2xvc2VzdChcIi51bml0XCIpO2lmKCEodCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSlyZXR1cm47dGhpcy5waWNrZXIuaXNBcHBseUJ1dHRvbih0KSYmKE9iamVjdC5rZXlzKHRoaXMudGltZVBpY2tlZCkuZm9yRWFjaCgodD0+e3RoaXMudGltZVByZVBpY2tlZFt0XWluc3RhbmNlb2YgRGF0ZSYmKHRoaXMudGltZVBpY2tlZFt0XT10aGlzLnRpbWVQcmVQaWNrZWRbdF0uY2xvbmUoKSl9KSksdGhpcy5waWNrZXIudXBkYXRlVmFsdWVzKCksdGhpcy50aW1lUHJlUGlja2VkPXtpbnB1dDpudWxsLHN0YXJ0Om51bGwsZW5kOm51bGx9KSx0aGlzLnBpY2tlci5pc0NhbmNlbEJ1dHRvbih0KSYmKHRoaXMudGltZVByZVBpY2tlZD17aW5wdXQ6bnVsbCxzdGFydDpudWxsLGVuZDpudWxsfSx0aGlzLnBpY2tlci5yZW5kZXJBbGwoKSl9fXNldFRpbWUodCl7Y29uc3QgZT10aGlzLmhhbmRsZVRpbWVTdHJpbmcodCk7dGhpcy50aW1lUGlja2VkLmlucHV0PWUuY2xvbmUoKSx0aGlzLnBpY2tlci5yZW5kZXJBbGwoKSx0aGlzLnBpY2tlci51cGRhdGVWYWx1ZXMoKX1zZXRTdGFydFRpbWUodCl7Y29uc3QgZT10aGlzLmhhbmRsZVRpbWVTdHJpbmcodCk7dGhpcy50aW1lUGlja2VkLnN0YXJ0PWUuY2xvbmUoKSx0aGlzLnBpY2tlci5yZW5kZXJBbGwoKSx0aGlzLnBpY2tlci51cGRhdGVWYWx1ZXMoKX1zZXRFbmRUaW1lKHQpe2NvbnN0IGU9dGhpcy5oYW5kbGVUaW1lU3RyaW5nKHQpO3RoaXMudGltZVBpY2tlZC5lbmQ9ZS5jbG9uZSgpLHRoaXMucGlja2VyLnJlbmRlckFsbCgpLHRoaXMucGlja2VyLnVwZGF0ZVZhbHVlcygpfWhhbmRsZVRpbWVTdHJpbmcoZSl7Y29uc3QgaT1uZXcgdCxbbixzLG9dPWUuc3BsaXQoXCI6XCIpLm1hcCgodD0+TnVtYmVyKHQpKSksYT1uJiYhTnVtYmVyLmlzTmFOKG4pP246MCxyPXMmJiFOdW1iZXIuaXNOYU4ocyk/czowLGM9byYmIU51bWJlci5pc05hTihvKT9vOjA7cmV0dXJuIGkuc2V0SG91cnMoYSxyLGMsMCksaX1nZXREYXRlKCl7aWYodGhpcy5waWNrZXIub3B0aW9ucy5kYXRlIGluc3RhbmNlb2YgRGF0ZSl7Y29uc3QgZT1uZXcgdCh0aGlzLnBpY2tlci5vcHRpb25zLmRhdGUsdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQpO2lmKHRoaXMudGltZVBpY2tlZC5pbnB1dCBpbnN0YW5jZW9mIERhdGUpe2NvbnN0IHQ9dGhpcy50aW1lUGlja2VkLmlucHV0O2Uuc2V0SG91cnModC5nZXRIb3VycygpLHQuZ2V0TWludXRlcygpLHQuZ2V0U2Vjb25kcygpLDApfXJldHVybiBlfXJldHVybiBudWxsfWdldFN0YXJ0RGF0ZSgpe2lmKHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5zdGFydERhdGUgaW5zdGFuY2VvZiBEYXRlKXtjb25zdCBlPW5ldyB0KHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5zdGFydERhdGUsdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQpO2lmKHRoaXMudGltZVBpY2tlZC5zdGFydCBpbnN0YW5jZW9mIERhdGUpe2NvbnN0IHQ9dGhpcy50aW1lUGlja2VkLnN0YXJ0O2Uuc2V0SG91cnModC5nZXRIb3VycygpLHQuZ2V0TWludXRlcygpLHQuZ2V0U2Vjb25kcygpLDApfXJldHVybiBlfXJldHVybiBudWxsfWdldEVuZERhdGUoKXtpZih0aGlzLnJhbmdlUGx1Z2luLm9wdGlvbnMuZW5kRGF0ZSBpbnN0YW5jZW9mIERhdGUpe2NvbnN0IGU9bmV3IHQodGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLmVuZERhdGUsdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQpO2lmKHRoaXMudGltZVBpY2tlZC5lbmQgaW5zdGFuY2VvZiBEYXRlKXtjb25zdCB0PXRoaXMudGltZVBpY2tlZC5lbmQ7ZS5zZXRIb3Vycyh0LmdldEhvdXJzKCksdC5nZXRNaW51dGVzKCksdC5nZXRTZWNvbmRzKCksMCl9cmV0dXJuIGV9cmV0dXJuIG51bGx9Z2V0U2luZ2xlSW5wdXQoKXtyZXR1cm4gdGhpcy5vcHRpb25zLm5hdGl2ZT90aGlzLmdldE5hdGl2ZUlucHV0KFwiaW5wdXRcIik6dGhpcy5nZXRDdXN0b21JbnB1dChcImlucHV0XCIpfWdldFN0YXJ0SW5wdXQoKXtyZXR1cm4gdGhpcy5vcHRpb25zLm5hdGl2ZT90aGlzLmdldE5hdGl2ZUlucHV0KFwic3RhcnRcIik6dGhpcy5nZXRDdXN0b21JbnB1dChcInN0YXJ0XCIpfWdldEVuZElucHV0KCl7cmV0dXJuIHRoaXMub3B0aW9ucy5uYXRpdmU/dGhpcy5nZXROYXRpdmVJbnB1dChcImVuZFwiKTp0aGlzLmdldEN1c3RvbUlucHV0KFwiZW5kXCIpfWdldE5hdGl2ZUlucHV0KHQpe2NvbnN0IGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO2UudHlwZT1cInRpbWVcIixlLm5hbWU9dCxlLmNsYXNzTmFtZT1cInRpbWUtcGx1Z2luLWlucHV0IHVuaXRcIjtjb25zdCBpPXRoaXMudGltZVBpY2tlZFt0XTtpZihpKXtjb25zdCB0PWAwJHtpLmdldEhvdXJzKCl9YC5zbGljZSgtMiksbj1gMCR7aS5nZXRNaW51dGVzKCl9YC5zbGljZSgtMik7ZS52YWx1ZT1gJHt0fToke259YH1yZXR1cm4gZX1nZXRDdXN0b21JbnB1dCh0KXtjb25zdCBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7ZS5jbGFzc05hbWU9XCJ0aW1lLXBsdWdpbi1jdXN0b20tYmxvY2tcIjtjb25zdCBpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7aS5jbGFzc05hbWU9XCJ0aW1lLXBsdWdpbi1jdXN0b20taW5wdXQgdW5pdFwiLGkubmFtZT1gJHt0fVtISF1gO2NvbnN0IG49dGhpcy5vcHRpb25zLmZvcm1hdDEyPzE6MCxzPXRoaXMub3B0aW9ucy5mb3JtYXQxMj8xMzoyNDtsZXQgbz1udWxsOyF0aGlzLnBpY2tlci5vcHRpb25zLmF1dG9BcHBseSYmdGhpcy50aW1lUHJlUGlja2VkW3RdaW5zdGFuY2VvZiBEYXRlP289dGhpcy50aW1lUHJlUGlja2VkW3RdLmNsb25lKCk6dGhpcy50aW1lUGlja2VkW3RdaW5zdGFuY2VvZiBEYXRlJiYobz10aGlzLnRpbWVQaWNrZWRbdF0uY2xvbmUoKSk7Zm9yKGxldCB0PW47dDxzO3QrPXRoaXMub3B0aW9ucy5zdGVwSG91cnMpe2NvbnN0IGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtlLnZhbHVlPVN0cmluZyh0KSxlLnRleHQ9U3RyaW5nKHQpLG8mJih0aGlzLm9wdGlvbnMuZm9ybWF0MTI/KG8uZ2V0SG91cnMoKSUxMj9vLmdldEhvdXJzKCklMTI6MTIpPT09dCYmKGUuc2VsZWN0ZWQ9ITApOm8uZ2V0SG91cnMoKT09PXQmJihlLnNlbGVjdGVkPSEwKSksaS5hcHBlbmRDaGlsZChlKX1lLmFwcGVuZENoaWxkKGkpO2NvbnN0IGE9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTthLmNsYXNzTmFtZT1cInRpbWUtcGx1Z2luLWN1c3RvbS1pbnB1dCB1bml0XCIsYS5uYW1lPWAke3R9W21tXWA7Zm9yKGxldCB0PTA7dDw2MDt0Kz10aGlzLm9wdGlvbnMuc3RlcE1pbnV0ZXMpe2NvbnN0IGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtlLnZhbHVlPWAwJHtTdHJpbmcodCl9YC5zbGljZSgtMiksZS50ZXh0PWAwJHtTdHJpbmcodCl9YC5zbGljZSgtMiksbyYmby5nZXRNaW51dGVzKCk9PT10JiYoZS5zZWxlY3RlZD0hMCksYS5hcHBlbmRDaGlsZChlKX1pZihlLmFwcGVuZENoaWxkKGEpLHRoaXMub3B0aW9ucy5zZWNvbmRzKXtjb25zdCBpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7aS5jbGFzc05hbWU9XCJ0aW1lLXBsdWdpbi1jdXN0b20taW5wdXQgdW5pdFwiLGkubmFtZT1gJHt0fVtzc11gO2NvbnN0IG49NjA7Zm9yKGxldCB0PTA7dDxuO3QrPXRoaXMub3B0aW9ucy5zdGVwU2Vjb25kcyl7Y29uc3QgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO2UudmFsdWU9YDAke1N0cmluZyh0KX1gLnNsaWNlKC0yKSxlLnRleHQ9YDAke1N0cmluZyh0KX1gLnNsaWNlKC0yKSxvJiZvLmdldFNlY29uZHMoKT09PXQmJihlLnNlbGVjdGVkPSEwKSxpLmFwcGVuZENoaWxkKGUpfWUuYXBwZW5kQ2hpbGQoaSl9aWYodGhpcy5vcHRpb25zLmZvcm1hdDEyKXtjb25zdCBpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7aS5jbGFzc05hbWU9XCJ0aW1lLXBsdWdpbi1jdXN0b20taW5wdXQgdW5pdFwiLGkubmFtZT1gJHt0fVtwZXJpb2RdYCxbXCJBTVwiLFwiUE1cIl0uZm9yRWFjaCgodD0+e2NvbnN0IGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtlLnZhbHVlPXQsZS50ZXh0PXQsbyYmXCJQTVwiPT09dCYmby5nZXRIb3VycygpPj0xMiYmKGUuc2VsZWN0ZWQ9ITApLGkuYXBwZW5kQ2hpbGQoZSl9KSksZS5hcHBlbmRDaGlsZChpKX1yZXR1cm4gZX1oYW5kbGVGb3JtYXQxMih0LGUsaSl7Y29uc3Qgbj1lLmNsb25lKCk7c3dpdGNoKHQpe2Nhc2VcIkFNXCI6MTI9PT1pP24uc2V0SG91cnMoMCxuLmdldE1pbnV0ZXMoKSxuLmdldFNlY29uZHMoKSwwKTpuLnNldEhvdXJzKGksbi5nZXRNaW51dGVzKCksbi5nZXRTZWNvbmRzKCksMCk7YnJlYWs7Y2FzZVwiUE1cIjoxMiE9PWk/bi5zZXRIb3VycyhpKzEyLG4uZ2V0TWludXRlcygpLG4uZ2V0U2Vjb25kcygpLDApOm4uc2V0SG91cnMoaSxuLmdldE1pbnV0ZXMoKSxuLmdldFNlY29uZHMoKSwwKX1yZXR1cm4gbn1wYXJzZVZhbHVlcygpe2lmKHRoaXMucmFuZ2VQbHVnaW4pe2lmKHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5zdHJpY3Qpe2lmKHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5zdGFydERhdGUmJnRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5lbmREYXRlKXtjb25zdCBlPW5ldyB0KHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5zdGFydERhdGUsdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQpLGk9bmV3IHQodGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLmVuZERhdGUsdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQpO3RoaXMudGltZVBpY2tlZC5zdGFydD1lLmNsb25lKCksdGhpcy50aW1lUGlja2VkLmVuZD1pLmNsb25lKCl9fWVsc2V7aWYodGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLnN0YXJ0RGF0ZSl7Y29uc3QgZT1uZXcgdCh0aGlzLnJhbmdlUGx1Z2luLm9wdGlvbnMuc3RhcnREYXRlLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0KTt0aGlzLnRpbWVQaWNrZWQuc3RhcnQ9ZS5jbG9uZSgpfWlmKHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5lbmREYXRlKXtjb25zdCBlPW5ldyB0KHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5lbmREYXRlLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0KTt0aGlzLnRpbWVQaWNrZWQuZW5kPWUuY2xvbmUoKX19aWYodGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLmVsZW1lbnRFbmQpaWYodGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLnN0cmljdCl7aWYodGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCYmdGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50LnZhbHVlLmxlbmd0aCYmdGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLmVsZW1lbnRFbmQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50JiZ0aGlzLnJhbmdlUGx1Z2luLm9wdGlvbnMuZWxlbWVudEVuZC52YWx1ZS5sZW5ndGgpe2NvbnN0IGU9bmV3IHQodGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50LnZhbHVlLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0KSxpPW5ldyB0KHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5lbGVtZW50RW5kLnZhbHVlLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0KTt0aGlzLnRpbWVQaWNrZWQuc3RhcnQ9ZS5jbG9uZSgpLHRoaXMudGltZVBpY2tlZC5lbmQ9aS5jbG9uZSgpfX1lbHNle2lmKHRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQmJnRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudC52YWx1ZS5sZW5ndGgpe2NvbnN0IGU9bmV3IHQodGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50LnZhbHVlLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0KTt0aGlzLnRpbWVQaWNrZWQuc3RhcnQ9ZS5jbG9uZSgpfWlmKHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5lbGVtZW50RW5kIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCYmdGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLmVsZW1lbnRFbmQudmFsdWUubGVuZ3RoKXtjb25zdCBlPW5ldyB0KHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5lbGVtZW50RW5kLnZhbHVlLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0KTt0aGlzLnRpbWVQaWNrZWQuc3RhcnQ9ZS5jbG9uZSgpfX1lbHNlIGlmKHRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQmJnRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudC52YWx1ZS5sZW5ndGgpe2NvbnN0W2UsaV09dGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50LnZhbHVlLnNwbGl0KHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5kZWxpbWl0ZXIpO2lmKHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5zdHJpY3Qpe2lmKGUmJmkpe2NvbnN0IG49bmV3IHQoZSx0aGlzLnBpY2tlci5vcHRpb25zLmZvcm1hdCkscz1uZXcgdChpLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0KTt0aGlzLnRpbWVQaWNrZWQuc3RhcnQ9bi5jbG9uZSgpLHRoaXMudGltZVBpY2tlZC5lbmQ9cy5jbG9uZSgpfX1lbHNle2lmKGUpe2NvbnN0IGk9bmV3IHQoZSx0aGlzLnBpY2tlci5vcHRpb25zLmZvcm1hdCk7dGhpcy50aW1lUGlja2VkLnN0YXJ0PWkuY2xvbmUoKX1pZihpKXtjb25zdCBlPW5ldyB0KGksdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQpO3RoaXMudGltZVBpY2tlZC5zdGFydD1lLmNsb25lKCl9fX19ZWxzZXtpZih0aGlzLnBpY2tlci5vcHRpb25zLmRhdGUpe2NvbnN0IGU9bmV3IHQodGhpcy5waWNrZXIub3B0aW9ucy5kYXRlLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0KTt0aGlzLnRpbWVQaWNrZWQuaW5wdXQ9ZS5jbG9uZSgpfWlmKHRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQmJnRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudC52YWx1ZS5sZW5ndGgpe2NvbnN0IGU9bmV3IHQodGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50LnZhbHVlLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0KTt0aGlzLnRpbWVQaWNrZWQuaW5wdXQ9ZS5jbG9uZSgpfX19fWNsYXNzIGggZXh0ZW5kcyBve2RvY0VsZW1lbnQ9bnVsbDtyYW5nZVBsdWdpbjtiaW5kcz17b25WaWV3OnRoaXMub25WaWV3LmJpbmQodGhpcyksb25LZXlkb3duOnRoaXMub25LZXlkb3duLmJpbmQodGhpcyl9O29wdGlvbnM9e3VuaXRJbmRleDoxLGRheUluZGV4OjJ9O2dldE5hbWUoKXtyZXR1cm5cIktiZFBsdWdpblwifW9uQXR0YWNoKCl7Y29uc3QgdD10aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQsZT10LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO2lmKHRoaXMuZG9jRWxlbWVudD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSx0aGlzLmRvY0VsZW1lbnQuc3R5bGUucG9zaXRpb249XCJhYnNvbHV0ZVwiLHRoaXMuZG9jRWxlbWVudC5zdHlsZS50b3A9YCR7dC5vZmZzZXRUb3B9cHhgLHRoaXMuZG9jRWxlbWVudC5zdHlsZS5sZWZ0PXQub2Zmc2V0TGVmdCtlLndpZHRoLTI1K1wicHhcIix0aGlzLmRvY0VsZW1lbnQuYXR0YWNoU2hhZG93KHttb2RlOlwib3BlblwifSksdGhpcy5vcHRpb25zLmh0bWwpdGhpcy5kb2NFbGVtZW50LnNoYWRvd1Jvb3QuaW5uZXJIVE1MPXRoaXMub3B0aW9ucy5odG1sO2Vsc2V7Y29uc3QgdD1gXFxuICAgICAgPHN0eWxlPlxcbiAgICAgIGJ1dHRvbiB7XFxuICAgICAgICBib3JkZXI6IG5vbmU7XFxuICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gICAgICAgIGZvbnQtc2l6ZTogJHt3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQpLmZvbnRTaXplfTtcXG4gICAgICB9XFxuICAgICAgPC9zdHlsZT5cXG5cXG4gICAgICA8YnV0dG9uPiYjMTI4MTk3OzwvYnV0dG9uPlxcbiAgICAgIGA7dGhpcy5kb2NFbGVtZW50LnNoYWRvd1Jvb3QuaW5uZXJIVE1MPXR9Y29uc3QgaT10aGlzLmRvY0VsZW1lbnQuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uXCIpO2kmJihpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCh0PT57dC5wcmV2ZW50RGVmYXVsdCgpLHRoaXMucGlja2VyLnNob3coe3RhcmdldDp0aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnR9KX0pLHtjYXB0dXJlOiEwfSksaS5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCh0PT57XCJFc2NhcGVcIj09PXQuY29kZSYmdGhpcy5waWNrZXIuaGlkZSgpfSkse2NhcHR1cmU6ITB9KSksdGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50LmFmdGVyKHRoaXMuZG9jRWxlbWVudCksdGhpcy5waWNrZXIub24oXCJ2aWV3XCIsdGhpcy5iaW5kcy5vblZpZXcpLHRoaXMucGlja2VyLm9uKFwia2V5ZG93blwiLHRoaXMuYmluZHMub25LZXlkb3duKX1vbkRldGFjaCgpe3RoaXMuZG9jRWxlbWVudCYmdGhpcy5kb2NFbGVtZW50LmlzQ29ubmVjdGVkJiZ0aGlzLmRvY0VsZW1lbnQucmVtb3ZlKCksdGhpcy5waWNrZXIub2ZmKFwidmlld1wiLHRoaXMuYmluZHMub25WaWV3KSx0aGlzLnBpY2tlci5vZmYoXCJrZXlkb3duXCIsdGhpcy5iaW5kcy5vbktleWRvd24pfW9uVmlldyh0KXtjb25zdHt2aWV3OmUsdGFyZ2V0Oml9PXQuZGV0YWlsO2kmJlwicXVlcnlTZWxlY3RvclwiaW4gaSYmKFwiQ2FsZW5kYXJEYXlcIiE9PWV8fFtcImxvY2tlZFwiLFwibm90LWF2YWlsYWJsZVwiXS5zb21lKCh0PT5pLmNsYXNzTGlzdC5jb250YWlucyh0KSkpP1suLi5pLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudW5pdDpub3QoLmRheSlcIildLmZvckVhY2goKHQ9PnQudGFiSW5kZXg9dGhpcy5vcHRpb25zLnVuaXRJbmRleCkpOmkudGFiSW5kZXg9dGhpcy5vcHRpb25zLmRheUluZGV4KX1vbktleWRvd24odCl7c3dpdGNoKHRoaXMub25Nb3VzZUVudGVyKHQpLHQuY29kZSl7Y2FzZVwiQXJyb3dVcFwiOmNhc2VcIkFycm93RG93blwiOnRoaXMudmVydGljYWxNb3ZlKHQpO2JyZWFrO2Nhc2VcIkFycm93TGVmdFwiOmNhc2VcIkFycm93UmlnaHRcIjp0aGlzLmhvcml6b250YWxNb3ZlKHQpO2JyZWFrO2Nhc2VcIkVudGVyXCI6Y2FzZVwiU3BhY2VcIjp0aGlzLmhhbmRsZUVudGVyKHQpO2JyZWFrO2Nhc2VcIkVzY2FwZVwiOnRoaXMucGlja2VyLmhpZGUoKX19ZmluZEFsbG93YWJsZURheVNpYmxpbmcodCxlLGkpe2NvbnN0IG49QXJyYXkuZnJvbSh0LnF1ZXJ5U2VsZWN0b3JBbGwoYC5kYXlbdGFiaW5kZXg9XCIke3RoaXMub3B0aW9ucy5kYXlJbmRleH1cIl1gKSkscz1uLmluZGV4T2YoZSk7cmV0dXJuIG4uZmlsdGVyKCgodCxlKT0+aShlLHMpJiZ0LnRhYkluZGV4PT09dGhpcy5vcHRpb25zLmRheUluZGV4KSlbMF19Y2hhbmdlTW9udGgodCl7Y29uc3QgZT17QXJyb3dMZWZ0OlwicHJldmlvdXNcIixBcnJvd1JpZ2h0OlwibmV4dFwifSxpPXRoaXMucGlja2VyLnVpLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKGAuJHtlW3QuY29kZV19LWJ1dHRvblt0YWJpbmRleD1cIiR7dGhpcy5vcHRpb25zLnVuaXRJbmRleH1cIl1gKTtpJiYhaS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhgbm8tJHtlW3QuY29kZV19LW1vbnRoYCkmJihpLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiY2xpY2tcIix7YnViYmxlczohMH0pKSxzZXRUaW1lb3V0KCgoKT0+e2xldCBlPW51bGw7c3dpdGNoKHQuY29kZSl7Y2FzZVwiQXJyb3dMZWZ0XCI6Y29uc3QgdD10aGlzLnBpY2tlci51aS5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbChgLmRheVt0YWJpbmRleD1cIiR7dGhpcy5vcHRpb25zLmRheUluZGV4fVwiXWApO2U9dFt0Lmxlbmd0aC0xXTticmVhaztjYXNlXCJBcnJvd1JpZ2h0XCI6ZT10aGlzLnBpY2tlci51aS5jb250YWluZXIucXVlcnlTZWxlY3RvcihgLmRheVt0YWJpbmRleD1cIiR7dGhpcy5vcHRpb25zLmRheUluZGV4fVwiXWApfWUmJmUuZm9jdXMoKX0pKSl9dmVydGljYWxNb3ZlKHQpe2NvbnN0IGU9dC50YXJnZXQ7aWYoZS5jbGFzc0xpc3QuY29udGFpbnMoXCJkYXlcIikpe3QucHJldmVudERlZmF1bHQoKTtjb25zdCBpPXRoaXMuZmluZEFsbG93YWJsZURheVNpYmxpbmcodGhpcy5waWNrZXIudWkuY29udGFpbmVyLGUsKChlLGkpPT5lPT09KFwiQXJyb3dVcFwiPT09dC5jb2RlP2ktNzppKzcpKSk7aSYmaS5mb2N1cygpfX1ob3Jpem9udGFsTW92ZSh0KXtjb25zdCBlPXQudGFyZ2V0O2lmKGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGF5XCIpKXt0LnByZXZlbnREZWZhdWx0KCk7Y29uc3QgaT10aGlzLmZpbmRBbGxvd2FibGVEYXlTaWJsaW5nKHRoaXMucGlja2VyLnVpLmNvbnRhaW5lcixlLCgoZSxpKT0+ZT09PShcIkFycm93TGVmdFwiPT09dC5jb2RlP2ktMTppKzEpKSk7aT9pLmZvY3VzKCk6dGhpcy5jaGFuZ2VNb250aCh0KX19aGFuZGxlRW50ZXIodCl7Y29uc3QgZT10LnRhcmdldDtlLmNsYXNzTGlzdC5jb250YWlucyhcImRheVwiKSYmKHQucHJldmVudERlZmF1bHQoKSxlLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiY2xpY2tcIix7YnViYmxlczohMH0pKSxzZXRUaW1lb3V0KCgoKT0+e2lmKHRoaXMucmFuZ2VQbHVnaW49dGhpcy5waWNrZXIuUGx1Z2luTWFuYWdlci5nZXRJbnN0YW5jZShcIlJhbmdlUGx1Z2luXCIpLHRoaXMucmFuZ2VQbHVnaW58fCF0aGlzLnBpY2tlci5vcHRpb25zLmF1dG9BcHBseSl7Y29uc3QgdD10aGlzLnBpY2tlci51aS5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5kYXkuc2VsZWN0ZWRcIik7dCYmc2V0VGltZW91dCgoKCk9Pnt0LmZvY3VzKCl9KSl9fSkpKX1vbk1vdXNlRW50ZXIodCl7dC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGF5XCIpJiZzZXRUaW1lb3V0KCgoKT0+e2NvbnN0IHQ9dGhpcy5waWNrZXIudWkuc2hhZG93Um9vdC5hY3RpdmVFbGVtZW50O3QmJnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJtb3VzZWVudGVyXCIse2J1YmJsZXM6ITB9KSl9KSl9fWNsYXNzIGQgZXh0ZW5kcyBve3JhbmdlUGx1Z2luO2xvY2tQbHVnaW47cHJpb3JpdHk9MTA7YmluZHM9e29uVmlldzp0aGlzLm9uVmlldy5iaW5kKHRoaXMpLG9uQ29sb3JTY2hlbWU6dGhpcy5vbkNvbG9yU2NoZW1lLmJpbmQodGhpcyl9O29wdGlvbnM9e2Ryb3Bkb3duOnttb250aHM6ITEseWVhcnM6ITEsbWluWWVhcjoxOTUwLG1heFllYXI6bnVsbH0sZGFya01vZGU6ITAsbG9jYWxlOntyZXNldEJ1dHRvbjonPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgaGVpZ2h0PVwiMjRcIiB3aWR0aD1cIjI0XCI+PHBhdGggZD1cIk0xMyAzYy00Ljk3IDAtOSA0LjAzLTkgOUgxbDMuODkgMy44OS4wNy4xNEw5IDEySDZjMC0zLjg3IDMuMTMtNyA3LTdzNyAzLjEzIDcgNy0zLjEzIDctNyA3Yy0xLjkzIDAtMy42OC0uNzktNC45NC0yLjA2bC0xLjQyIDEuNDJDOC4yNyAxOS45OSAxMC41MSAyMSAxMyAyMWM0Ljk3IDAgOS00LjAzIDktOXMtNC4wMy05LTktOXptLTEgNXY1bDQuMjggMi41NC43Mi0xLjIxLTMuNS0yLjA4VjhIMTJ6XCIvPjwvc3ZnPid9fTttYXRjaE1lZGlhO2dldE5hbWUoKXtyZXR1cm5cIkFtcFBsdWdpblwifW9uQXR0YWNoKCl7dGhpcy5vcHRpb25zLmRhcmtNb2RlJiZ3aW5kb3cmJlwibWF0Y2hNZWRpYVwiaW4gd2luZG93JiYodGhpcy5tYXRjaE1lZGlhPXdpbmRvdy5tYXRjaE1lZGlhKFwiKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKVwiKSx0aGlzLm1hdGNoTWVkaWEubWF0Y2hlcyYmKHRoaXMucGlja2VyLnVpLmNvbnRhaW5lci5kYXRhc2V0LnRoZW1lPVwiZGFya1wiKSx0aGlzLm1hdGNoTWVkaWEuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLHRoaXMuYmluZHMub25Db2xvclNjaGVtZSkpLHRoaXMub3B0aW9ucy53ZWVrTnVtYmVycyYmdGhpcy5waWNrZXIudWkuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ3ZWVrLW51bWJlcnNcIiksdGhpcy5waWNrZXIub24oXCJ2aWV3XCIsdGhpcy5iaW5kcy5vblZpZXcpfW9uRGV0YWNoKCl7dGhpcy5vcHRpb25zLmRhcmtNb2RlJiZ3aW5kb3cmJlwibWF0Y2hNZWRpYVwiaW4gd2luZG93JiZ0aGlzLm1hdGNoTWVkaWEucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLHRoaXMuYmluZHMub25Db2xvclNjaGVtZSksdGhpcy5waWNrZXIudWkuY29udGFpbmVyLnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtdGhlbWVcIiksdGhpcy5waWNrZXIudWkuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJ3ZWVrLW51bWJlcnNcIiksdGhpcy5waWNrZXIub2ZmKFwidmlld1wiLHRoaXMuYmluZHMub25WaWV3KX1vblZpZXcodCl7dGhpcy5sb2NrUGx1Z2luPXRoaXMucGlja2VyLlBsdWdpbk1hbmFnZXIuZ2V0SW5zdGFuY2UoXCJMb2NrUGx1Z2luXCIpLHRoaXMucmFuZ2VQbHVnaW49dGhpcy5waWNrZXIuUGx1Z2luTWFuYWdlci5nZXRJbnN0YW5jZShcIlJhbmdlUGx1Z2luXCIpLHRoaXMuaGFuZGxlRHJvcGRvd24odCksdGhpcy5oYW5kbGVSZXNldEJ1dHRvbih0KSx0aGlzLmhhbmRsZVdlZWtOdW1iZXJzKHQpfW9uQ29sb3JTY2hlbWUodCl7Y29uc3QgZT10Lm1hdGNoZXM/XCJkYXJrXCI6XCJsaWdodFwiO3RoaXMucGlja2VyLnVpLmNvbnRhaW5lci5kYXRhc2V0LnRoZW1lPWV9aGFuZGxlRHJvcGRvd24oZSl7Y29uc3R7dmlldzppLHRhcmdldDpuLGRhdGU6cyxpbmRleDpvfT1lLmRldGFpbDtpZihcIkNhbGVuZGFySGVhZGVyXCI9PT1pKXtjb25zdCBlPW4ucXVlcnlTZWxlY3RvcihcIi5tb250aC1uYW1lXCIpO2lmKHRoaXMub3B0aW9ucy5kcm9wZG93bi5tb250aHMpe2UuY2hpbGROb2Rlc1swXS5yZW1vdmUoKTtjb25zdCBpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7aS5jbGFzc05hbWU9XCJtb250aC1uYW1lLS1zZWxlY3QgbW9udGgtbmFtZS0tZHJvcGRvd25cIjtmb3IobGV0IGU9MDtlPDEyO2UrPTEpe2NvbnN0IG49ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKSxvPW5ldyB0KG5ldyBEYXRlKHMuZ2V0RnVsbFllYXIoKSxlLDIsMCwwLDApKSxhPW5ldyB0KG5ldyBEYXRlKHMuZ2V0RnVsbFllYXIoKSxlLDEsMCwwLDApKTtuLnZhbHVlPVN0cmluZyhlKSxuLnRleHQ9by50b0xvY2FsZVN0cmluZyh0aGlzLnBpY2tlci5vcHRpb25zLmxhbmcse21vbnRoOlwibG9uZ1wifSksdGhpcy5sb2NrUGx1Z2luJiYobi5kaXNhYmxlZD10aGlzLmxvY2tQbHVnaW4ub3B0aW9ucy5taW5EYXRlJiZhLmlzQmVmb3JlKG5ldyB0KHRoaXMubG9ja1BsdWdpbi5vcHRpb25zLm1pbkRhdGUpLFwibW9udGhcIil8fHRoaXMubG9ja1BsdWdpbi5vcHRpb25zLm1heERhdGUmJmEuaXNBZnRlcihuZXcgdCh0aGlzLmxvY2tQbHVnaW4ub3B0aW9ucy5tYXhEYXRlKSxcIm1vbnRoXCIpKSxuLnNlbGVjdGVkPWEuZ2V0TW9udGgoKT09PXMuZ2V0TW9udGgoKSxpLmFwcGVuZENoaWxkKG4pfWkuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCh0PT57Y29uc3QgZT10LnRhcmdldDt0aGlzLnBpY2tlci5jYWxlbmRhcnNbMF0uc2V0RGF0ZSgxKSx0aGlzLnBpY2tlci5jYWxlbmRhcnNbMF0uc2V0TW9udGgoTnVtYmVyKGUudmFsdWUpKSx0aGlzLnBpY2tlci5yZW5kZXJBbGwoKX0pKSxlLnByZXBlbmQoaSl9aWYodGhpcy5vcHRpb25zLmRyb3Bkb3duLnllYXJzKXtlLmNoaWxkTm9kZXNbMV0ucmVtb3ZlKCk7Y29uc3QgaT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO2kuY2xhc3NOYW1lPVwibW9udGgtbmFtZS0tc2VsZWN0XCI7Y29uc3Qgbj10aGlzLm9wdGlvbnMuZHJvcGRvd24ubWluWWVhcixvPXRoaXMub3B0aW9ucy5kcm9wZG93bi5tYXhZZWFyP3RoaXMub3B0aW9ucy5kcm9wZG93bi5tYXhZZWFyOihuZXcgRGF0ZSkuZ2V0RnVsbFllYXIoKTtpZihzLmdldEZ1bGxZZWFyKCk+byl7Y29uc3QgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO3QudmFsdWU9U3RyaW5nKHMuZ2V0RnVsbFllYXIoKSksdC50ZXh0PVN0cmluZyhzLmdldEZ1bGxZZWFyKCkpLHQuc2VsZWN0ZWQ9ITAsdC5kaXNhYmxlZD0hMCxpLmFwcGVuZENoaWxkKHQpfWZvcihsZXQgZT1vO2U+PW47ZS09MSl7Y29uc3Qgbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpLG89bmV3IHQobmV3IERhdGUoZSwwLDEsMCwwLDApKTtuLnZhbHVlPVN0cmluZyhlKSxuLnRleHQ9U3RyaW5nKGUpLHRoaXMubG9ja1BsdWdpbiYmKG4uZGlzYWJsZWQ9dGhpcy5sb2NrUGx1Z2luLm9wdGlvbnMubWluRGF0ZSYmby5pc0JlZm9yZShuZXcgdCh0aGlzLmxvY2tQbHVnaW4ub3B0aW9ucy5taW5EYXRlKSxcInllYXJcIil8fHRoaXMubG9ja1BsdWdpbi5vcHRpb25zLm1heERhdGUmJm8uaXNBZnRlcihuZXcgdCh0aGlzLmxvY2tQbHVnaW4ub3B0aW9ucy5tYXhEYXRlKSxcInllYXJcIikpLG4uc2VsZWN0ZWQ9cy5nZXRGdWxsWWVhcigpPT09ZSxpLmFwcGVuZENoaWxkKG4pfWlmKHMuZ2V0RnVsbFllYXIoKTxuKXtjb25zdCB0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7dC52YWx1ZT1TdHJpbmcocy5nZXRGdWxsWWVhcigpKSx0LnRleHQ9U3RyaW5nKHMuZ2V0RnVsbFllYXIoKSksdC5zZWxlY3RlZD0hMCx0LmRpc2FibGVkPSEwLGkuYXBwZW5kQ2hpbGQodCl9aWYoXCJhc2NcIj09PXRoaXMub3B0aW9ucy5kcm9wZG93bi55ZWFycyl7Y29uc3QgdD1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChpLmNoaWxkTm9kZXMpLnJldmVyc2UoKTtpLmlubmVySFRNTD1cIlwiLHQuZm9yRWFjaCgodD0+e3QuaW5uZXJIVE1MPXQudmFsdWUsaS5hcHBlbmRDaGlsZCh0KX0pKX1pLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwodD0+e2NvbnN0IGU9dC50YXJnZXQ7dGhpcy5waWNrZXIuY2FsZW5kYXJzWzBdLnNldEZ1bGxZZWFyKE51bWJlcihlLnZhbHVlKSksdGhpcy5waWNrZXIucmVuZGVyQWxsKCl9KSksZS5hcHBlbmRDaGlsZChpKX19fWhhbmRsZVJlc2V0QnV0dG9uKHQpe2NvbnN0e3ZpZXc6ZSx0YXJnZXQ6aX09dC5kZXRhaWw7aWYoXCJDYWxlbmRhckhlYWRlclwiPT09ZSYmdGhpcy5vcHRpb25zLnJlc2V0QnV0dG9uKXtjb25zdCB0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7dC5jbGFzc05hbWU9XCJyZXNldC1idXR0b24gdW5pdFwiLHQuaW5uZXJIVE1MPXRoaXMub3B0aW9ucy5sb2NhbGUucmVzZXRCdXR0b24sdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwodD0+e3QucHJldmVudERlZmF1bHQoKTtsZXQgZT0hMDtcImZ1bmN0aW9uXCI9PXR5cGVvZiB0aGlzLm9wdGlvbnMucmVzZXRCdXR0b24mJihlPXRoaXMub3B0aW9ucy5yZXNldEJ1dHRvbi5jYWxsKHRoaXMpKSxlJiZ0aGlzLnBpY2tlci5jbGVhcigpfSkpLGkuYXBwZW5kQ2hpbGQodCl9fWhhbmRsZVdlZWtOdW1iZXJzKGUpe2lmKHRoaXMub3B0aW9ucy53ZWVrTnVtYmVycyl7Y29uc3R7dmlldzppLHRhcmdldDpufT1lLmRldGFpbDtpZihcIkNhbGVuZGFyRGF5TmFtZXNcIj09PWkpe2NvbnN0IHQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTt0LmNsYXNzTmFtZT1cIndudW0taGVhZGVyXCIsdC5pbm5lckhUTUw9XCJXa1wiLG4ucHJlcGVuZCh0KX1cIkNhbGVuZGFyRGF5c1wiPT09aSYmWy4uLm4uY2hpbGRyZW5dLmZvckVhY2goKChlLGkpPT57aWYoMD09PWl8fGklNz09MCl7bGV0IGk7aWYoZS5jbGFzc0xpc3QuY29udGFpbnMoXCJkYXlcIikpaT1uZXcgdChlLmRhdGFzZXQudGltZSk7ZWxzZXtjb25zdCBlPW4ucXVlcnlTZWxlY3RvcihcIi5kYXlcIik7aT1uZXcgdChlLmRhdGFzZXQudGltZSl9bGV0IHM9aS5nZXRXZWVrKHRoaXMucGlja2VyLm9wdGlvbnMuZmlyc3REYXkpOzUzPT09cyYmMD09PWkuZ2V0TW9udGgoKSYmKHM9XCI1My8xXCIpO2NvbnN0IG89ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtvLmNsYXNzTmFtZT1cIndudW0taXRlbVwiLG8uaW5uZXJIVE1MPVN0cmluZyhzKSxuLmluc2VydEJlZm9yZShvLGUpfX0pKX19fWV4cG9ydHtkIGFzIEFtcFBsdWdpbix0IGFzIERhdGVUaW1lLGggYXMgS2JkUGx1Z2luLGEgYXMgTG9ja1BsdWdpbixyIGFzIFByZXNldFBsdWdpbixjIGFzIFJhbmdlUGx1Z2luLGwgYXMgVGltZVBsdWdpbixuIGFzIGNyZWF0ZSxzIGFzIGVhc2VwaWNrfTtcbiIsImltcG9ydCBnZXRDb21wb3NpdGVSZWN0IGZyb20gXCIuL2RvbS11dGlscy9nZXRDb21wb3NpdGVSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0TGF5b3V0UmVjdCBmcm9tIFwiLi9kb20tdXRpbHMvZ2V0TGF5b3V0UmVjdC5qc1wiO1xuaW1wb3J0IGxpc3RTY3JvbGxQYXJlbnRzIGZyb20gXCIuL2RvbS11dGlscy9saXN0U2Nyb2xsUGFyZW50cy5qc1wiO1xuaW1wb3J0IGdldE9mZnNldFBhcmVudCBmcm9tIFwiLi9kb20tdXRpbHMvZ2V0T2Zmc2V0UGFyZW50LmpzXCI7XG5pbXBvcnQgZ2V0Q29tcHV0ZWRTdHlsZSBmcm9tIFwiLi9kb20tdXRpbHMvZ2V0Q29tcHV0ZWRTdHlsZS5qc1wiO1xuaW1wb3J0IG9yZGVyTW9kaWZpZXJzIGZyb20gXCIuL3V0aWxzL29yZGVyTW9kaWZpZXJzLmpzXCI7XG5pbXBvcnQgZGVib3VuY2UgZnJvbSBcIi4vdXRpbHMvZGVib3VuY2UuanNcIjtcbmltcG9ydCB2YWxpZGF0ZU1vZGlmaWVycyBmcm9tIFwiLi91dGlscy92YWxpZGF0ZU1vZGlmaWVycy5qc1wiO1xuaW1wb3J0IHVuaXF1ZUJ5IGZyb20gXCIuL3V0aWxzL3VuaXF1ZUJ5LmpzXCI7XG5pbXBvcnQgZ2V0QmFzZVBsYWNlbWVudCBmcm9tIFwiLi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgbWVyZ2VCeU5hbWUgZnJvbSBcIi4vdXRpbHMvbWVyZ2VCeU5hbWUuanNcIjtcbmltcG9ydCBkZXRlY3RPdmVyZmxvdyBmcm9tIFwiLi91dGlscy9kZXRlY3RPdmVyZmxvdy5qc1wiO1xuaW1wb3J0IHsgaXNFbGVtZW50IH0gZnJvbSBcIi4vZG9tLXV0aWxzL2luc3RhbmNlT2YuanNcIjtcbmltcG9ydCB7IGF1dG8gfSBmcm9tIFwiLi9lbnVtcy5qc1wiO1xudmFyIElOVkFMSURfRUxFTUVOVF9FUlJPUiA9ICdQb3BwZXI6IEludmFsaWQgcmVmZXJlbmNlIG9yIHBvcHBlciBhcmd1bWVudCBwcm92aWRlZC4gVGhleSBtdXN0IGJlIGVpdGhlciBhIERPTSBlbGVtZW50IG9yIHZpcnR1YWwgZWxlbWVudC4nO1xudmFyIElORklOSVRFX0xPT1BfRVJST1IgPSAnUG9wcGVyOiBBbiBpbmZpbml0ZSBsb29wIGluIHRoZSBtb2RpZmllcnMgY3ljbGUgaGFzIGJlZW4gZGV0ZWN0ZWQhIFRoZSBjeWNsZSBoYXMgYmVlbiBpbnRlcnJ1cHRlZCB0byBwcmV2ZW50IGEgYnJvd3NlciBjcmFzaC4nO1xudmFyIERFRkFVTFRfT1BUSU9OUyA9IHtcbiAgcGxhY2VtZW50OiAnYm90dG9tJyxcbiAgbW9kaWZpZXJzOiBbXSxcbiAgc3RyYXRlZ3k6ICdhYnNvbHV0ZSdcbn07XG5cbmZ1bmN0aW9uIGFyZVZhbGlkRWxlbWVudHMoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICByZXR1cm4gIWFyZ3Muc29tZShmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIHJldHVybiAhKGVsZW1lbnQgJiYgdHlwZW9mIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0ID09PSAnZnVuY3Rpb24nKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwb3BwZXJHZW5lcmF0b3IoZ2VuZXJhdG9yT3B0aW9ucykge1xuICBpZiAoZ2VuZXJhdG9yT3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgZ2VuZXJhdG9yT3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgdmFyIF9nZW5lcmF0b3JPcHRpb25zID0gZ2VuZXJhdG9yT3B0aW9ucyxcbiAgICAgIF9nZW5lcmF0b3JPcHRpb25zJGRlZiA9IF9nZW5lcmF0b3JPcHRpb25zLmRlZmF1bHRNb2RpZmllcnMsXG4gICAgICBkZWZhdWx0TW9kaWZpZXJzID0gX2dlbmVyYXRvck9wdGlvbnMkZGVmID09PSB2b2lkIDAgPyBbXSA6IF9nZW5lcmF0b3JPcHRpb25zJGRlZixcbiAgICAgIF9nZW5lcmF0b3JPcHRpb25zJGRlZjIgPSBfZ2VuZXJhdG9yT3B0aW9ucy5kZWZhdWx0T3B0aW9ucyxcbiAgICAgIGRlZmF1bHRPcHRpb25zID0gX2dlbmVyYXRvck9wdGlvbnMkZGVmMiA9PT0gdm9pZCAwID8gREVGQVVMVF9PUFRJT05TIDogX2dlbmVyYXRvck9wdGlvbnMkZGVmMjtcbiAgcmV0dXJuIGZ1bmN0aW9uIGNyZWF0ZVBvcHBlcihyZWZlcmVuY2UsIHBvcHBlciwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICAgIG9wdGlvbnMgPSBkZWZhdWx0T3B0aW9ucztcbiAgICB9XG5cbiAgICB2YXIgc3RhdGUgPSB7XG4gICAgICBwbGFjZW1lbnQ6ICdib3R0b20nLFxuICAgICAgb3JkZXJlZE1vZGlmaWVyczogW10sXG4gICAgICBvcHRpb25zOiBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX09QVElPTlMsIGRlZmF1bHRPcHRpb25zKSxcbiAgICAgIG1vZGlmaWVyc0RhdGE6IHt9LFxuICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgcmVmZXJlbmNlOiByZWZlcmVuY2UsXG4gICAgICAgIHBvcHBlcjogcG9wcGVyXG4gICAgICB9LFxuICAgICAgYXR0cmlidXRlczoge30sXG4gICAgICBzdHlsZXM6IHt9XG4gICAgfTtcbiAgICB2YXIgZWZmZWN0Q2xlYW51cEZucyA9IFtdO1xuICAgIHZhciBpc0Rlc3Ryb3llZCA9IGZhbHNlO1xuICAgIHZhciBpbnN0YW5jZSA9IHtcbiAgICAgIHN0YXRlOiBzdGF0ZSxcbiAgICAgIHNldE9wdGlvbnM6IGZ1bmN0aW9uIHNldE9wdGlvbnMoc2V0T3B0aW9uc0FjdGlvbikge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBzZXRPcHRpb25zQWN0aW9uID09PSAnZnVuY3Rpb24nID8gc2V0T3B0aW9uc0FjdGlvbihzdGF0ZS5vcHRpb25zKSA6IHNldE9wdGlvbnNBY3Rpb247XG4gICAgICAgIGNsZWFudXBNb2RpZmllckVmZmVjdHMoKTtcbiAgICAgICAgc3RhdGUub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLCBzdGF0ZS5vcHRpb25zLCBvcHRpb25zKTtcbiAgICAgICAgc3RhdGUuc2Nyb2xsUGFyZW50cyA9IHtcbiAgICAgICAgICByZWZlcmVuY2U6IGlzRWxlbWVudChyZWZlcmVuY2UpID8gbGlzdFNjcm9sbFBhcmVudHMocmVmZXJlbmNlKSA6IHJlZmVyZW5jZS5jb250ZXh0RWxlbWVudCA/IGxpc3RTY3JvbGxQYXJlbnRzKHJlZmVyZW5jZS5jb250ZXh0RWxlbWVudCkgOiBbXSxcbiAgICAgICAgICBwb3BwZXI6IGxpc3RTY3JvbGxQYXJlbnRzKHBvcHBlcilcbiAgICAgICAgfTsgLy8gT3JkZXJzIHRoZSBtb2RpZmllcnMgYmFzZWQgb24gdGhlaXIgZGVwZW5kZW5jaWVzIGFuZCBgcGhhc2VgXG4gICAgICAgIC8vIHByb3BlcnRpZXNcblxuICAgICAgICB2YXIgb3JkZXJlZE1vZGlmaWVycyA9IG9yZGVyTW9kaWZpZXJzKG1lcmdlQnlOYW1lKFtdLmNvbmNhdChkZWZhdWx0TW9kaWZpZXJzLCBzdGF0ZS5vcHRpb25zLm1vZGlmaWVycykpKTsgLy8gU3RyaXAgb3V0IGRpc2FibGVkIG1vZGlmaWVyc1xuXG4gICAgICAgIHN0YXRlLm9yZGVyZWRNb2RpZmllcnMgPSBvcmRlcmVkTW9kaWZpZXJzLmZpbHRlcihmdW5jdGlvbiAobSkge1xuICAgICAgICAgIHJldHVybiBtLmVuYWJsZWQ7XG4gICAgICAgIH0pOyAvLyBWYWxpZGF0ZSB0aGUgcHJvdmlkZWQgbW9kaWZpZXJzIHNvIHRoYXQgdGhlIGNvbnN1bWVyIHdpbGwgZ2V0IHdhcm5lZFxuICAgICAgICAvLyBpZiBvbmUgb2YgdGhlIG1vZGlmaWVycyBpcyBpbnZhbGlkIGZvciBhbnkgcmVhc29uXG5cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICAgIHZhciBtb2RpZmllcnMgPSB1bmlxdWVCeShbXS5jb25jYXQob3JkZXJlZE1vZGlmaWVycywgc3RhdGUub3B0aW9ucy5tb2RpZmllcnMpLCBmdW5jdGlvbiAoX3JlZikge1xuICAgICAgICAgICAgdmFyIG5hbWUgPSBfcmVmLm5hbWU7XG4gICAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YWxpZGF0ZU1vZGlmaWVycyhtb2RpZmllcnMpO1xuXG4gICAgICAgICAgaWYgKGdldEJhc2VQbGFjZW1lbnQoc3RhdGUub3B0aW9ucy5wbGFjZW1lbnQpID09PSBhdXRvKSB7XG4gICAgICAgICAgICB2YXIgZmxpcE1vZGlmaWVyID0gc3RhdGUub3JkZXJlZE1vZGlmaWVycy5maW5kKGZ1bmN0aW9uIChfcmVmMikge1xuICAgICAgICAgICAgICB2YXIgbmFtZSA9IF9yZWYyLm5hbWU7XG4gICAgICAgICAgICAgIHJldHVybiBuYW1lID09PSAnZmxpcCc7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKCFmbGlwTW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihbJ1BvcHBlcjogXCJhdXRvXCIgcGxhY2VtZW50cyByZXF1aXJlIHRoZSBcImZsaXBcIiBtb2RpZmllciBiZScsICdwcmVzZW50IGFuZCBlbmFibGVkIHRvIHdvcmsuJ10uam9pbignICcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgX2dldENvbXB1dGVkU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHBvcHBlciksXG4gICAgICAgICAgICAgIG1hcmdpblRvcCA9IF9nZXRDb21wdXRlZFN0eWxlLm1hcmdpblRvcCxcbiAgICAgICAgICAgICAgbWFyZ2luUmlnaHQgPSBfZ2V0Q29tcHV0ZWRTdHlsZS5tYXJnaW5SaWdodCxcbiAgICAgICAgICAgICAgbWFyZ2luQm90dG9tID0gX2dldENvbXB1dGVkU3R5bGUubWFyZ2luQm90dG9tLFxuICAgICAgICAgICAgICBtYXJnaW5MZWZ0ID0gX2dldENvbXB1dGVkU3R5bGUubWFyZ2luTGVmdDsgLy8gV2Ugbm8gbG9uZ2VyIHRha2UgaW50byBhY2NvdW50IGBtYXJnaW5zYCBvbiB0aGUgcG9wcGVyLCBhbmQgaXQgY2FuXG4gICAgICAgICAgLy8gY2F1c2UgYnVncyB3aXRoIHBvc2l0aW9uaW5nLCBzbyB3ZSdsbCB3YXJuIHRoZSBjb25zdW1lclxuXG5cbiAgICAgICAgICBpZiAoW21hcmdpblRvcCwgbWFyZ2luUmlnaHQsIG1hcmdpbkJvdHRvbSwgbWFyZ2luTGVmdF0uc29tZShmdW5jdGlvbiAobWFyZ2luKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChtYXJnaW4pO1xuICAgICAgICAgIH0pKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oWydQb3BwZXI6IENTUyBcIm1hcmdpblwiIHN0eWxlcyBjYW5ub3QgYmUgdXNlZCB0byBhcHBseSBwYWRkaW5nJywgJ2JldHdlZW4gdGhlIHBvcHBlciBhbmQgaXRzIHJlZmVyZW5jZSBlbGVtZW50IG9yIGJvdW5kYXJ5LicsICdUbyByZXBsaWNhdGUgbWFyZ2luLCB1c2UgdGhlIGBvZmZzZXRgIG1vZGlmaWVyLCBhcyB3ZWxsIGFzJywgJ3RoZSBgcGFkZGluZ2Agb3B0aW9uIGluIHRoZSBgcHJldmVudE92ZXJmbG93YCBhbmQgYGZsaXBgJywgJ21vZGlmaWVycy4nXS5qb2luKCcgJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJ1bk1vZGlmaWVyRWZmZWN0cygpO1xuICAgICAgICByZXR1cm4gaW5zdGFuY2UudXBkYXRlKCk7XG4gICAgICB9LFxuICAgICAgLy8gU3luYyB1cGRhdGUg4oCTIGl0IHdpbGwgYWx3YXlzIGJlIGV4ZWN1dGVkLCBldmVuIGlmIG5vdCBuZWNlc3NhcnkuIFRoaXNcbiAgICAgIC8vIGlzIHVzZWZ1bCBmb3IgbG93IGZyZXF1ZW5jeSB1cGRhdGVzIHdoZXJlIHN5bmMgYmVoYXZpb3Igc2ltcGxpZmllcyB0aGVcbiAgICAgIC8vIGxvZ2ljLlxuICAgICAgLy8gRm9yIGhpZ2ggZnJlcXVlbmN5IHVwZGF0ZXMgKGUuZy4gYHJlc2l6ZWAgYW5kIGBzY3JvbGxgIGV2ZW50cyksIGFsd2F5c1xuICAgICAgLy8gcHJlZmVyIHRoZSBhc3luYyBQb3BwZXIjdXBkYXRlIG1ldGhvZFxuICAgICAgZm9yY2VVcGRhdGU6IGZ1bmN0aW9uIGZvcmNlVXBkYXRlKCkge1xuICAgICAgICBpZiAoaXNEZXN0cm95ZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgX3N0YXRlJGVsZW1lbnRzID0gc3RhdGUuZWxlbWVudHMsXG4gICAgICAgICAgICByZWZlcmVuY2UgPSBfc3RhdGUkZWxlbWVudHMucmVmZXJlbmNlLFxuICAgICAgICAgICAgcG9wcGVyID0gX3N0YXRlJGVsZW1lbnRzLnBvcHBlcjsgLy8gRG9uJ3QgcHJvY2VlZCBpZiBgcmVmZXJlbmNlYCBvciBgcG9wcGVyYCBhcmUgbm90IHZhbGlkIGVsZW1lbnRzXG4gICAgICAgIC8vIGFueW1vcmVcblxuICAgICAgICBpZiAoIWFyZVZhbGlkRWxlbWVudHMocmVmZXJlbmNlLCBwb3BwZXIpKSB7XG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihJTlZBTElEX0VMRU1FTlRfRVJST1IpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSAvLyBTdG9yZSB0aGUgcmVmZXJlbmNlIGFuZCBwb3BwZXIgcmVjdHMgdG8gYmUgcmVhZCBieSBtb2RpZmllcnNcblxuXG4gICAgICAgIHN0YXRlLnJlY3RzID0ge1xuICAgICAgICAgIHJlZmVyZW5jZTogZ2V0Q29tcG9zaXRlUmVjdChyZWZlcmVuY2UsIGdldE9mZnNldFBhcmVudChwb3BwZXIpLCBzdGF0ZS5vcHRpb25zLnN0cmF0ZWd5ID09PSAnZml4ZWQnKSxcbiAgICAgICAgICBwb3BwZXI6IGdldExheW91dFJlY3QocG9wcGVyKVxuICAgICAgICB9OyAvLyBNb2RpZmllcnMgaGF2ZSB0aGUgYWJpbGl0eSB0byByZXNldCB0aGUgY3VycmVudCB1cGRhdGUgY3ljbGUuIFRoZVxuICAgICAgICAvLyBtb3N0IGNvbW1vbiB1c2UgY2FzZSBmb3IgdGhpcyBpcyB0aGUgYGZsaXBgIG1vZGlmaWVyIGNoYW5naW5nIHRoZVxuICAgICAgICAvLyBwbGFjZW1lbnQsIHdoaWNoIHRoZW4gbmVlZHMgdG8gcmUtcnVuIGFsbCB0aGUgbW9kaWZpZXJzLCBiZWNhdXNlIHRoZVxuICAgICAgICAvLyBsb2dpYyB3YXMgcHJldmlvdXNseSByYW4gZm9yIHRoZSBwcmV2aW91cyBwbGFjZW1lbnQgYW5kIGlzIHRoZXJlZm9yZVxuICAgICAgICAvLyBzdGFsZS9pbmNvcnJlY3RcblxuICAgICAgICBzdGF0ZS5yZXNldCA9IGZhbHNlO1xuICAgICAgICBzdGF0ZS5wbGFjZW1lbnQgPSBzdGF0ZS5vcHRpb25zLnBsYWNlbWVudDsgLy8gT24gZWFjaCB1cGRhdGUgY3ljbGUsIHRoZSBgbW9kaWZpZXJzRGF0YWAgcHJvcGVydHkgZm9yIGVhY2ggbW9kaWZpZXJcbiAgICAgICAgLy8gaXMgZmlsbGVkIHdpdGggdGhlIGluaXRpYWwgZGF0YSBzcGVjaWZpZWQgYnkgdGhlIG1vZGlmaWVyLiBUaGlzIG1lYW5zXG4gICAgICAgIC8vIGl0IGRvZXNuJ3QgcGVyc2lzdCBhbmQgaXMgZnJlc2ggb24gZWFjaCB1cGRhdGUuXG4gICAgICAgIC8vIFRvIGVuc3VyZSBwZXJzaXN0ZW50IGRhdGEsIHVzZSBgJHtuYW1lfSNwZXJzaXN0ZW50YFxuXG4gICAgICAgIHN0YXRlLm9yZGVyZWRNb2RpZmllcnMuZm9yRWFjaChmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICAgICAgICByZXR1cm4gc3RhdGUubW9kaWZpZXJzRGF0YVttb2RpZmllci5uYW1lXSA9IE9iamVjdC5hc3NpZ24oe30sIG1vZGlmaWVyLmRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIF9fZGVidWdfbG9vcHNfXyA9IDA7XG5cbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IHN0YXRlLm9yZGVyZWRNb2RpZmllcnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICAgICAgX19kZWJ1Z19sb29wc19fICs9IDE7XG5cbiAgICAgICAgICAgIGlmIChfX2RlYnVnX2xvb3BzX18gPiAxMDApIHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihJTkZJTklURV9MT09QX0VSUk9SKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHN0YXRlLnJlc2V0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBzdGF0ZS5yZXNldCA9IGZhbHNlO1xuICAgICAgICAgICAgaW5kZXggPSAtMTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBfc3RhdGUkb3JkZXJlZE1vZGlmaWUgPSBzdGF0ZS5vcmRlcmVkTW9kaWZpZXJzW2luZGV4XSxcbiAgICAgICAgICAgICAgZm4gPSBfc3RhdGUkb3JkZXJlZE1vZGlmaWUuZm4sXG4gICAgICAgICAgICAgIF9zdGF0ZSRvcmRlcmVkTW9kaWZpZTIgPSBfc3RhdGUkb3JkZXJlZE1vZGlmaWUub3B0aW9ucyxcbiAgICAgICAgICAgICAgX29wdGlvbnMgPSBfc3RhdGUkb3JkZXJlZE1vZGlmaWUyID09PSB2b2lkIDAgPyB7fSA6IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZTIsXG4gICAgICAgICAgICAgIG5hbWUgPSBfc3RhdGUkb3JkZXJlZE1vZGlmaWUubmFtZTtcblxuICAgICAgICAgIGlmICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHN0YXRlID0gZm4oe1xuICAgICAgICAgICAgICBzdGF0ZTogc3RhdGUsXG4gICAgICAgICAgICAgIG9wdGlvbnM6IF9vcHRpb25zLFxuICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICBpbnN0YW5jZTogaW5zdGFuY2VcbiAgICAgICAgICAgIH0pIHx8IHN0YXRlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8vIEFzeW5jIGFuZCBvcHRpbWlzdGljYWxseSBvcHRpbWl6ZWQgdXBkYXRlIOKAkyBpdCB3aWxsIG5vdCBiZSBleGVjdXRlZCBpZlxuICAgICAgLy8gbm90IG5lY2Vzc2FyeSAoZGVib3VuY2VkIHRvIHJ1biBhdCBtb3N0IG9uY2UtcGVyLXRpY2spXG4gICAgICB1cGRhdGU6IGRlYm91bmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgaW5zdGFuY2UuZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgICByZXNvbHZlKHN0YXRlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KSxcbiAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgIGNsZWFudXBNb2RpZmllckVmZmVjdHMoKTtcbiAgICAgICAgaXNEZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoIWFyZVZhbGlkRWxlbWVudHMocmVmZXJlbmNlLCBwb3BwZXIpKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoSU5WQUxJRF9FTEVNRU5UX0VSUk9SKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH1cblxuICAgIGluc3RhbmNlLnNldE9wdGlvbnMob3B0aW9ucykudGhlbihmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgIGlmICghaXNEZXN0cm95ZWQgJiYgb3B0aW9ucy5vbkZpcnN0VXBkYXRlKSB7XG4gICAgICAgIG9wdGlvbnMub25GaXJzdFVwZGF0ZShzdGF0ZSk7XG4gICAgICB9XG4gICAgfSk7IC8vIE1vZGlmaWVycyBoYXZlIHRoZSBhYmlsaXR5IHRvIGV4ZWN1dGUgYXJiaXRyYXJ5IGNvZGUgYmVmb3JlIHRoZSBmaXJzdFxuICAgIC8vIHVwZGF0ZSBjeWNsZSBydW5zLiBUaGV5IHdpbGwgYmUgZXhlY3V0ZWQgaW4gdGhlIHNhbWUgb3JkZXIgYXMgdGhlIHVwZGF0ZVxuICAgIC8vIGN5Y2xlLiBUaGlzIGlzIHVzZWZ1bCB3aGVuIGEgbW9kaWZpZXIgYWRkcyBzb21lIHBlcnNpc3RlbnQgZGF0YSB0aGF0XG4gICAgLy8gb3RoZXIgbW9kaWZpZXJzIG5lZWQgdG8gdXNlLCBidXQgdGhlIG1vZGlmaWVyIGlzIHJ1biBhZnRlciB0aGUgZGVwZW5kZW50XG4gICAgLy8gb25lLlxuXG4gICAgZnVuY3Rpb24gcnVuTW9kaWZpZXJFZmZlY3RzKCkge1xuICAgICAgc3RhdGUub3JkZXJlZE1vZGlmaWVycy5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmMykge1xuICAgICAgICB2YXIgbmFtZSA9IF9yZWYzLm5hbWUsXG4gICAgICAgICAgICBfcmVmMyRvcHRpb25zID0gX3JlZjMub3B0aW9ucyxcbiAgICAgICAgICAgIG9wdGlvbnMgPSBfcmVmMyRvcHRpb25zID09PSB2b2lkIDAgPyB7fSA6IF9yZWYzJG9wdGlvbnMsXG4gICAgICAgICAgICBlZmZlY3QgPSBfcmVmMy5lZmZlY3Q7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBlZmZlY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB2YXIgY2xlYW51cEZuID0gZWZmZWN0KHtcbiAgICAgICAgICAgIHN0YXRlOiBzdGF0ZSxcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICBpbnN0YW5jZTogaW5zdGFuY2UsXG4gICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB2YXIgbm9vcEZuID0gZnVuY3Rpb24gbm9vcEZuKCkge307XG5cbiAgICAgICAgICBlZmZlY3RDbGVhbnVwRm5zLnB1c2goY2xlYW51cEZuIHx8IG5vb3BGbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFudXBNb2RpZmllckVmZmVjdHMoKSB7XG4gICAgICBlZmZlY3RDbGVhbnVwRm5zLmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgIHJldHVybiBmbigpO1xuICAgICAgfSk7XG4gICAgICBlZmZlY3RDbGVhbnVwRm5zID0gW107XG4gICAgfVxuXG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9O1xufVxuZXhwb3J0IHZhciBjcmVhdGVQb3BwZXIgPSAvKiNfX1BVUkVfXyovcG9wcGVyR2VuZXJhdG9yKCk7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZXhwb3J0IHsgZGV0ZWN0T3ZlcmZsb3cgfTsiLCJpbXBvcnQgeyBpc1NoYWRvd1Jvb3QgfSBmcm9tIFwiLi9pbnN0YW5jZU9mLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb250YWlucyhwYXJlbnQsIGNoaWxkKSB7XG4gIHZhciByb290Tm9kZSA9IGNoaWxkLmdldFJvb3ROb2RlICYmIGNoaWxkLmdldFJvb3ROb2RlKCk7IC8vIEZpcnN0LCBhdHRlbXB0IHdpdGggZmFzdGVyIG5hdGl2ZSBtZXRob2RcblxuICBpZiAocGFyZW50LmNvbnRhaW5zKGNoaWxkKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IC8vIHRoZW4gZmFsbGJhY2sgdG8gY3VzdG9tIGltcGxlbWVudGF0aW9uIHdpdGggU2hhZG93IERPTSBzdXBwb3J0XG4gIGVsc2UgaWYgKHJvb3ROb2RlICYmIGlzU2hhZG93Um9vdChyb290Tm9kZSkpIHtcbiAgICAgIHZhciBuZXh0ID0gY2hpbGQ7XG5cbiAgICAgIGRvIHtcbiAgICAgICAgaWYgKG5leHQgJiYgcGFyZW50LmlzU2FtZU5vZGUobmV4dCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSAvLyAkRmxvd0ZpeE1lW3Byb3AtbWlzc2luZ106IG5lZWQgYSBiZXR0ZXIgd2F5IHRvIGhhbmRsZSB0aGlzLi4uXG5cblxuICAgICAgICBuZXh0ID0gbmV4dC5wYXJlbnROb2RlIHx8IG5leHQuaG9zdDtcbiAgICAgIH0gd2hpbGUgKG5leHQpO1xuICAgIH0gLy8gR2l2ZSB1cCwgdGhlIHJlc3VsdCBpcyBmYWxzZVxuXG5cbiAgcmV0dXJuIGZhbHNlO1xufSIsImltcG9ydCB7IGlzRWxlbWVudCwgaXNIVE1MRWxlbWVudCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmltcG9ydCB7IHJvdW5kIH0gZnJvbSBcIi4uL3V0aWxzL21hdGguanNcIjtcbmltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5pbXBvcnQgaXNMYXlvdXRWaWV3cG9ydCBmcm9tIFwiLi9pc0xheW91dFZpZXdwb3J0LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudCwgaW5jbHVkZVNjYWxlLCBpc0ZpeGVkU3RyYXRlZ3kpIHtcbiAgaWYgKGluY2x1ZGVTY2FsZSA9PT0gdm9pZCAwKSB7XG4gICAgaW5jbHVkZVNjYWxlID0gZmFsc2U7XG4gIH1cblxuICBpZiAoaXNGaXhlZFN0cmF0ZWd5ID09PSB2b2lkIDApIHtcbiAgICBpc0ZpeGVkU3RyYXRlZ3kgPSBmYWxzZTtcbiAgfVxuXG4gIHZhciBjbGllbnRSZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdmFyIHNjYWxlWCA9IDE7XG4gIHZhciBzY2FsZVkgPSAxO1xuXG4gIGlmIChpbmNsdWRlU2NhbGUgJiYgaXNIVE1MRWxlbWVudChlbGVtZW50KSkge1xuICAgIHNjYWxlWCA9IGVsZW1lbnQub2Zmc2V0V2lkdGggPiAwID8gcm91bmQoY2xpZW50UmVjdC53aWR0aCkgLyBlbGVtZW50Lm9mZnNldFdpZHRoIHx8IDEgOiAxO1xuICAgIHNjYWxlWSA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0ID4gMCA/IHJvdW5kKGNsaWVudFJlY3QuaGVpZ2h0KSAvIGVsZW1lbnQub2Zmc2V0SGVpZ2h0IHx8IDEgOiAxO1xuICB9XG5cbiAgdmFyIF9yZWYgPSBpc0VsZW1lbnQoZWxlbWVudCkgPyBnZXRXaW5kb3coZWxlbWVudCkgOiB3aW5kb3csXG4gICAgICB2aXN1YWxWaWV3cG9ydCA9IF9yZWYudmlzdWFsVmlld3BvcnQ7XG5cbiAgdmFyIGFkZFZpc3VhbE9mZnNldHMgPSAhaXNMYXlvdXRWaWV3cG9ydCgpICYmIGlzRml4ZWRTdHJhdGVneTtcbiAgdmFyIHggPSAoY2xpZW50UmVjdC5sZWZ0ICsgKGFkZFZpc3VhbE9mZnNldHMgJiYgdmlzdWFsVmlld3BvcnQgPyB2aXN1YWxWaWV3cG9ydC5vZmZzZXRMZWZ0IDogMCkpIC8gc2NhbGVYO1xuICB2YXIgeSA9IChjbGllbnRSZWN0LnRvcCArIChhZGRWaXN1YWxPZmZzZXRzICYmIHZpc3VhbFZpZXdwb3J0ID8gdmlzdWFsVmlld3BvcnQub2Zmc2V0VG9wIDogMCkpIC8gc2NhbGVZO1xuICB2YXIgd2lkdGggPSBjbGllbnRSZWN0LndpZHRoIC8gc2NhbGVYO1xuICB2YXIgaGVpZ2h0ID0gY2xpZW50UmVjdC5oZWlnaHQgLyBzY2FsZVk7XG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHdpZHRoLFxuICAgIGhlaWdodDogaGVpZ2h0LFxuICAgIHRvcDogeSxcbiAgICByaWdodDogeCArIHdpZHRoLFxuICAgIGJvdHRvbTogeSArIGhlaWdodCxcbiAgICBsZWZ0OiB4LFxuICAgIHg6IHgsXG4gICAgeTogeVxuICB9O1xufSIsImltcG9ydCB7IHZpZXdwb3J0IH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG5pbXBvcnQgZ2V0Vmlld3BvcnRSZWN0IGZyb20gXCIuL2dldFZpZXdwb3J0UmVjdC5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50UmVjdCBmcm9tIFwiLi9nZXREb2N1bWVudFJlY3QuanNcIjtcbmltcG9ydCBsaXN0U2Nyb2xsUGFyZW50cyBmcm9tIFwiLi9saXN0U2Nyb2xsUGFyZW50cy5qc1wiO1xuaW1wb3J0IGdldE9mZnNldFBhcmVudCBmcm9tIFwiLi9nZXRPZmZzZXRQYXJlbnQuanNcIjtcbmltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4vZ2V0RG9jdW1lbnRFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0Q29tcHV0ZWRTdHlsZSBmcm9tIFwiLi9nZXRDb21wdXRlZFN0eWxlLmpzXCI7XG5pbXBvcnQgeyBpc0VsZW1lbnQsIGlzSFRNTEVsZW1lbnQgfSBmcm9tIFwiLi9pbnN0YW5jZU9mLmpzXCI7XG5pbXBvcnQgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGZyb20gXCIuL2dldEJvdW5kaW5nQ2xpZW50UmVjdC5qc1wiO1xuaW1wb3J0IGdldFBhcmVudE5vZGUgZnJvbSBcIi4vZ2V0UGFyZW50Tm9kZS5qc1wiO1xuaW1wb3J0IGNvbnRhaW5zIGZyb20gXCIuL2NvbnRhaW5zLmpzXCI7XG5pbXBvcnQgZ2V0Tm9kZU5hbWUgZnJvbSBcIi4vZ2V0Tm9kZU5hbWUuanNcIjtcbmltcG9ydCByZWN0VG9DbGllbnRSZWN0IGZyb20gXCIuLi91dGlscy9yZWN0VG9DbGllbnRSZWN0LmpzXCI7XG5pbXBvcnQgeyBtYXgsIG1pbiB9IGZyb20gXCIuLi91dGlscy9tYXRoLmpzXCI7XG5cbmZ1bmN0aW9uIGdldElubmVyQm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnQsIHN0cmF0ZWd5KSB7XG4gIHZhciByZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnQsIGZhbHNlLCBzdHJhdGVneSA9PT0gJ2ZpeGVkJyk7XG4gIHJlY3QudG9wID0gcmVjdC50b3AgKyBlbGVtZW50LmNsaWVudFRvcDtcbiAgcmVjdC5sZWZ0ID0gcmVjdC5sZWZ0ICsgZWxlbWVudC5jbGllbnRMZWZ0O1xuICByZWN0LmJvdHRvbSA9IHJlY3QudG9wICsgZWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gIHJlY3QucmlnaHQgPSByZWN0LmxlZnQgKyBlbGVtZW50LmNsaWVudFdpZHRoO1xuICByZWN0LndpZHRoID0gZWxlbWVudC5jbGllbnRXaWR0aDtcbiAgcmVjdC5oZWlnaHQgPSBlbGVtZW50LmNsaWVudEhlaWdodDtcbiAgcmVjdC54ID0gcmVjdC5sZWZ0O1xuICByZWN0LnkgPSByZWN0LnRvcDtcbiAgcmV0dXJuIHJlY3Q7XG59XG5cbmZ1bmN0aW9uIGdldENsaWVudFJlY3RGcm9tTWl4ZWRUeXBlKGVsZW1lbnQsIGNsaXBwaW5nUGFyZW50LCBzdHJhdGVneSkge1xuICByZXR1cm4gY2xpcHBpbmdQYXJlbnQgPT09IHZpZXdwb3J0ID8gcmVjdFRvQ2xpZW50UmVjdChnZXRWaWV3cG9ydFJlY3QoZWxlbWVudCwgc3RyYXRlZ3kpKSA6IGlzRWxlbWVudChjbGlwcGluZ1BhcmVudCkgPyBnZXRJbm5lckJvdW5kaW5nQ2xpZW50UmVjdChjbGlwcGluZ1BhcmVudCwgc3RyYXRlZ3kpIDogcmVjdFRvQ2xpZW50UmVjdChnZXREb2N1bWVudFJlY3QoZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpKSk7XG59IC8vIEEgXCJjbGlwcGluZyBwYXJlbnRcIiBpcyBhbiBvdmVyZmxvd2FibGUgY29udGFpbmVyIHdpdGggdGhlIGNoYXJhY3RlcmlzdGljIG9mXG4vLyBjbGlwcGluZyAob3IgaGlkaW5nKSBvdmVyZmxvd2luZyBlbGVtZW50cyB3aXRoIGEgcG9zaXRpb24gZGlmZmVyZW50IGZyb21cbi8vIGBpbml0aWFsYFxuXG5cbmZ1bmN0aW9uIGdldENsaXBwaW5nUGFyZW50cyhlbGVtZW50KSB7XG4gIHZhciBjbGlwcGluZ1BhcmVudHMgPSBsaXN0U2Nyb2xsUGFyZW50cyhnZXRQYXJlbnROb2RlKGVsZW1lbnQpKTtcbiAgdmFyIGNhbkVzY2FwZUNsaXBwaW5nID0gWydhYnNvbHV0ZScsICdmaXhlZCddLmluZGV4T2YoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5wb3NpdGlvbikgPj0gMDtcbiAgdmFyIGNsaXBwZXJFbGVtZW50ID0gY2FuRXNjYXBlQ2xpcHBpbmcgJiYgaXNIVE1MRWxlbWVudChlbGVtZW50KSA/IGdldE9mZnNldFBhcmVudChlbGVtZW50KSA6IGVsZW1lbnQ7XG5cbiAgaWYgKCFpc0VsZW1lbnQoY2xpcHBlckVsZW1lbnQpKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9IC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXJldHVybl06IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9mbG93L2lzc3Vlcy8xNDE0XG5cblxuICByZXR1cm4gY2xpcHBpbmdQYXJlbnRzLmZpbHRlcihmdW5jdGlvbiAoY2xpcHBpbmdQYXJlbnQpIHtcbiAgICByZXR1cm4gaXNFbGVtZW50KGNsaXBwaW5nUGFyZW50KSAmJiBjb250YWlucyhjbGlwcGluZ1BhcmVudCwgY2xpcHBlckVsZW1lbnQpICYmIGdldE5vZGVOYW1lKGNsaXBwaW5nUGFyZW50KSAhPT0gJ2JvZHknO1xuICB9KTtcbn0gLy8gR2V0cyB0aGUgbWF4aW11bSBhcmVhIHRoYXQgdGhlIGVsZW1lbnQgaXMgdmlzaWJsZSBpbiBkdWUgdG8gYW55IG51bWJlciBvZlxuLy8gY2xpcHBpbmcgcGFyZW50c1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldENsaXBwaW5nUmVjdChlbGVtZW50LCBib3VuZGFyeSwgcm9vdEJvdW5kYXJ5LCBzdHJhdGVneSkge1xuICB2YXIgbWFpbkNsaXBwaW5nUGFyZW50cyA9IGJvdW5kYXJ5ID09PSAnY2xpcHBpbmdQYXJlbnRzJyA/IGdldENsaXBwaW5nUGFyZW50cyhlbGVtZW50KSA6IFtdLmNvbmNhdChib3VuZGFyeSk7XG4gIHZhciBjbGlwcGluZ1BhcmVudHMgPSBbXS5jb25jYXQobWFpbkNsaXBwaW5nUGFyZW50cywgW3Jvb3RCb3VuZGFyeV0pO1xuICB2YXIgZmlyc3RDbGlwcGluZ1BhcmVudCA9IGNsaXBwaW5nUGFyZW50c1swXTtcbiAgdmFyIGNsaXBwaW5nUmVjdCA9IGNsaXBwaW5nUGFyZW50cy5yZWR1Y2UoZnVuY3Rpb24gKGFjY1JlY3QsIGNsaXBwaW5nUGFyZW50KSB7XG4gICAgdmFyIHJlY3QgPSBnZXRDbGllbnRSZWN0RnJvbU1peGVkVHlwZShlbGVtZW50LCBjbGlwcGluZ1BhcmVudCwgc3RyYXRlZ3kpO1xuICAgIGFjY1JlY3QudG9wID0gbWF4KHJlY3QudG9wLCBhY2NSZWN0LnRvcCk7XG4gICAgYWNjUmVjdC5yaWdodCA9IG1pbihyZWN0LnJpZ2h0LCBhY2NSZWN0LnJpZ2h0KTtcbiAgICBhY2NSZWN0LmJvdHRvbSA9IG1pbihyZWN0LmJvdHRvbSwgYWNjUmVjdC5ib3R0b20pO1xuICAgIGFjY1JlY3QubGVmdCA9IG1heChyZWN0LmxlZnQsIGFjY1JlY3QubGVmdCk7XG4gICAgcmV0dXJuIGFjY1JlY3Q7XG4gIH0sIGdldENsaWVudFJlY3RGcm9tTWl4ZWRUeXBlKGVsZW1lbnQsIGZpcnN0Q2xpcHBpbmdQYXJlbnQsIHN0cmF0ZWd5KSk7XG4gIGNsaXBwaW5nUmVjdC53aWR0aCA9IGNsaXBwaW5nUmVjdC5yaWdodCAtIGNsaXBwaW5nUmVjdC5sZWZ0O1xuICBjbGlwcGluZ1JlY3QuaGVpZ2h0ID0gY2xpcHBpbmdSZWN0LmJvdHRvbSAtIGNsaXBwaW5nUmVjdC50b3A7XG4gIGNsaXBwaW5nUmVjdC54ID0gY2xpcHBpbmdSZWN0LmxlZnQ7XG4gIGNsaXBwaW5nUmVjdC55ID0gY2xpcHBpbmdSZWN0LnRvcDtcbiAgcmV0dXJuIGNsaXBwaW5nUmVjdDtcbn0iLCJpbXBvcnQgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGZyb20gXCIuL2dldEJvdW5kaW5nQ2xpZW50UmVjdC5qc1wiO1xuaW1wb3J0IGdldE5vZGVTY3JvbGwgZnJvbSBcIi4vZ2V0Tm9kZVNjcm9sbC5qc1wiO1xuaW1wb3J0IGdldE5vZGVOYW1lIGZyb20gXCIuL2dldE5vZGVOYW1lLmpzXCI7XG5pbXBvcnQgeyBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IGdldFdpbmRvd1Njcm9sbEJhclggZnJvbSBcIi4vZ2V0V2luZG93U2Nyb2xsQmFyWC5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCBpc1Njcm9sbFBhcmVudCBmcm9tIFwiLi9pc1Njcm9sbFBhcmVudC5qc1wiO1xuaW1wb3J0IHsgcm91bmQgfSBmcm9tIFwiLi4vdXRpbHMvbWF0aC5qc1wiO1xuXG5mdW5jdGlvbiBpc0VsZW1lbnRTY2FsZWQoZWxlbWVudCkge1xuICB2YXIgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHZhciBzY2FsZVggPSByb3VuZChyZWN0LndpZHRoKSAvIGVsZW1lbnQub2Zmc2V0V2lkdGggfHwgMTtcbiAgdmFyIHNjYWxlWSA9IHJvdW5kKHJlY3QuaGVpZ2h0KSAvIGVsZW1lbnQub2Zmc2V0SGVpZ2h0IHx8IDE7XG4gIHJldHVybiBzY2FsZVggIT09IDEgfHwgc2NhbGVZICE9PSAxO1xufSAvLyBSZXR1cm5zIHRoZSBjb21wb3NpdGUgcmVjdCBvZiBhbiBlbGVtZW50IHJlbGF0aXZlIHRvIGl0cyBvZmZzZXRQYXJlbnQuXG4vLyBDb21wb3NpdGUgbWVhbnMgaXQgdGFrZXMgaW50byBhY2NvdW50IHRyYW5zZm9ybXMgYXMgd2VsbCBhcyBsYXlvdXQuXG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Q29tcG9zaXRlUmVjdChlbGVtZW50T3JWaXJ0dWFsRWxlbWVudCwgb2Zmc2V0UGFyZW50LCBpc0ZpeGVkKSB7XG4gIGlmIChpc0ZpeGVkID09PSB2b2lkIDApIHtcbiAgICBpc0ZpeGVkID0gZmFsc2U7XG4gIH1cblxuICB2YXIgaXNPZmZzZXRQYXJlbnRBbkVsZW1lbnQgPSBpc0hUTUxFbGVtZW50KG9mZnNldFBhcmVudCk7XG4gIHZhciBvZmZzZXRQYXJlbnRJc1NjYWxlZCA9IGlzSFRNTEVsZW1lbnQob2Zmc2V0UGFyZW50KSAmJiBpc0VsZW1lbnRTY2FsZWQob2Zmc2V0UGFyZW50KTtcbiAgdmFyIGRvY3VtZW50RWxlbWVudCA9IGdldERvY3VtZW50RWxlbWVudChvZmZzZXRQYXJlbnQpO1xuICB2YXIgcmVjdCA9IGdldEJvdW5kaW5nQ2xpZW50UmVjdChlbGVtZW50T3JWaXJ0dWFsRWxlbWVudCwgb2Zmc2V0UGFyZW50SXNTY2FsZWQsIGlzRml4ZWQpO1xuICB2YXIgc2Nyb2xsID0ge1xuICAgIHNjcm9sbExlZnQ6IDAsXG4gICAgc2Nyb2xsVG9wOiAwXG4gIH07XG4gIHZhciBvZmZzZXRzID0ge1xuICAgIHg6IDAsXG4gICAgeTogMFxuICB9O1xuXG4gIGlmIChpc09mZnNldFBhcmVudEFuRWxlbWVudCB8fCAhaXNPZmZzZXRQYXJlbnRBbkVsZW1lbnQgJiYgIWlzRml4ZWQpIHtcbiAgICBpZiAoZ2V0Tm9kZU5hbWUob2Zmc2V0UGFyZW50KSAhPT0gJ2JvZHknIHx8IC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9wb3BwZXJqcy9wb3BwZXItY29yZS9pc3N1ZXMvMTA3OFxuICAgIGlzU2Nyb2xsUGFyZW50KGRvY3VtZW50RWxlbWVudCkpIHtcbiAgICAgIHNjcm9sbCA9IGdldE5vZGVTY3JvbGwob2Zmc2V0UGFyZW50KTtcbiAgICB9XG5cbiAgICBpZiAoaXNIVE1MRWxlbWVudChvZmZzZXRQYXJlbnQpKSB7XG4gICAgICBvZmZzZXRzID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KG9mZnNldFBhcmVudCwgdHJ1ZSk7XG4gICAgICBvZmZzZXRzLnggKz0gb2Zmc2V0UGFyZW50LmNsaWVudExlZnQ7XG4gICAgICBvZmZzZXRzLnkgKz0gb2Zmc2V0UGFyZW50LmNsaWVudFRvcDtcbiAgICB9IGVsc2UgaWYgKGRvY3VtZW50RWxlbWVudCkge1xuICAgICAgb2Zmc2V0cy54ID0gZ2V0V2luZG93U2Nyb2xsQmFyWChkb2N1bWVudEVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgeDogcmVjdC5sZWZ0ICsgc2Nyb2xsLnNjcm9sbExlZnQgLSBvZmZzZXRzLngsXG4gICAgeTogcmVjdC50b3AgKyBzY3JvbGwuc2Nyb2xsVG9wIC0gb2Zmc2V0cy55LFxuICAgIHdpZHRoOiByZWN0LndpZHRoLFxuICAgIGhlaWdodDogcmVjdC5oZWlnaHRcbiAgfTtcbn0iLCJpbXBvcnQgZ2V0V2luZG93IGZyb20gXCIuL2dldFdpbmRvdy5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KSB7XG4gIHJldHVybiBnZXRXaW5kb3coZWxlbWVudCkuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcbn0iLCJpbXBvcnQgeyBpc0VsZW1lbnQgfSBmcm9tIFwiLi9pbnN0YW5jZU9mLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCkge1xuICAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS1yZXR1cm5dOiBhc3N1bWUgYm9keSBpcyBhbHdheXMgYXZhaWxhYmxlXG4gIHJldHVybiAoKGlzRWxlbWVudChlbGVtZW50KSA/IGVsZW1lbnQub3duZXJEb2N1bWVudCA6IC8vICRGbG93Rml4TWVbcHJvcC1taXNzaW5nXVxuICBlbGVtZW50LmRvY3VtZW50KSB8fCB3aW5kb3cuZG9jdW1lbnQpLmRvY3VtZW50RWxlbWVudDtcbn0iLCJpbXBvcnQgZ2V0RG9jdW1lbnRFbGVtZW50IGZyb20gXCIuL2dldERvY3VtZW50RWxlbWVudC5qc1wiO1xuaW1wb3J0IGdldENvbXB1dGVkU3R5bGUgZnJvbSBcIi4vZ2V0Q29tcHV0ZWRTdHlsZS5qc1wiO1xuaW1wb3J0IGdldFdpbmRvd1Njcm9sbEJhclggZnJvbSBcIi4vZ2V0V2luZG93U2Nyb2xsQmFyWC5qc1wiO1xuaW1wb3J0IGdldFdpbmRvd1Njcm9sbCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGwuanNcIjtcbmltcG9ydCB7IG1heCB9IGZyb20gXCIuLi91dGlscy9tYXRoLmpzXCI7IC8vIEdldHMgdGhlIGVudGlyZSBzaXplIG9mIHRoZSBzY3JvbGxhYmxlIGRvY3VtZW50IGFyZWEsIGV2ZW4gZXh0ZW5kaW5nIG91dHNpZGVcbi8vIG9mIHRoZSBgPGh0bWw+YCBhbmQgYDxib2R5PmAgcmVjdCBib3VuZHMgaWYgaG9yaXpvbnRhbGx5IHNjcm9sbGFibGVcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0RG9jdW1lbnRSZWN0KGVsZW1lbnQpIHtcbiAgdmFyIF9lbGVtZW50JG93bmVyRG9jdW1lbjtcblxuICB2YXIgaHRtbCA9IGdldERvY3VtZW50RWxlbWVudChlbGVtZW50KTtcbiAgdmFyIHdpblNjcm9sbCA9IGdldFdpbmRvd1Njcm9sbChlbGVtZW50KTtcbiAgdmFyIGJvZHkgPSAoX2VsZW1lbnQkb3duZXJEb2N1bWVuID0gZWxlbWVudC5vd25lckRvY3VtZW50KSA9PSBudWxsID8gdm9pZCAwIDogX2VsZW1lbnQkb3duZXJEb2N1bWVuLmJvZHk7XG4gIHZhciB3aWR0aCA9IG1heChodG1sLnNjcm9sbFdpZHRoLCBodG1sLmNsaWVudFdpZHRoLCBib2R5ID8gYm9keS5zY3JvbGxXaWR0aCA6IDAsIGJvZHkgPyBib2R5LmNsaWVudFdpZHRoIDogMCk7XG4gIHZhciBoZWlnaHQgPSBtYXgoaHRtbC5zY3JvbGxIZWlnaHQsIGh0bWwuY2xpZW50SGVpZ2h0LCBib2R5ID8gYm9keS5zY3JvbGxIZWlnaHQgOiAwLCBib2R5ID8gYm9keS5jbGllbnRIZWlnaHQgOiAwKTtcbiAgdmFyIHggPSAtd2luU2Nyb2xsLnNjcm9sbExlZnQgKyBnZXRXaW5kb3dTY3JvbGxCYXJYKGVsZW1lbnQpO1xuICB2YXIgeSA9IC13aW5TY3JvbGwuc2Nyb2xsVG9wO1xuXG4gIGlmIChnZXRDb21wdXRlZFN0eWxlKGJvZHkgfHwgaHRtbCkuZGlyZWN0aW9uID09PSAncnRsJykge1xuICAgIHggKz0gbWF4KGh0bWwuY2xpZW50V2lkdGgsIGJvZHkgPyBib2R5LmNsaWVudFdpZHRoIDogMCkgLSB3aWR0aDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHdpZHRoLFxuICAgIGhlaWdodDogaGVpZ2h0LFxuICAgIHg6IHgsXG4gICAgeTogeVxuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEhUTUxFbGVtZW50U2Nyb2xsKGVsZW1lbnQpIHtcbiAgcmV0dXJuIHtcbiAgICBzY3JvbGxMZWZ0OiBlbGVtZW50LnNjcm9sbExlZnQsXG4gICAgc2Nyb2xsVG9wOiBlbGVtZW50LnNjcm9sbFRvcFxuICB9O1xufSIsImltcG9ydCBnZXRCb3VuZGluZ0NsaWVudFJlY3QgZnJvbSBcIi4vZ2V0Qm91bmRpbmdDbGllbnRSZWN0LmpzXCI7IC8vIFJldHVybnMgdGhlIGxheW91dCByZWN0IG9mIGFuIGVsZW1lbnQgcmVsYXRpdmUgdG8gaXRzIG9mZnNldFBhcmVudC4gTGF5b3V0XG4vLyBtZWFucyBpdCBkb2Vzbid0IHRha2UgaW50byBhY2NvdW50IHRyYW5zZm9ybXMuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldExheW91dFJlY3QoZWxlbWVudCkge1xuICB2YXIgY2xpZW50UmVjdCA9IGdldEJvdW5kaW5nQ2xpZW50UmVjdChlbGVtZW50KTsgLy8gVXNlIHRoZSBjbGllbnRSZWN0IHNpemVzIGlmIGl0J3Mgbm90IGJlZW4gdHJhbnNmb3JtZWQuXG4gIC8vIEZpeGVzIGh0dHBzOi8vZ2l0aHViLmNvbS9wb3BwZXJqcy9wb3BwZXItY29yZS9pc3N1ZXMvMTIyM1xuXG4gIHZhciB3aWR0aCA9IGVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gIHZhciBoZWlnaHQgPSBlbGVtZW50Lm9mZnNldEhlaWdodDtcblxuICBpZiAoTWF0aC5hYnMoY2xpZW50UmVjdC53aWR0aCAtIHdpZHRoKSA8PSAxKSB7XG4gICAgd2lkdGggPSBjbGllbnRSZWN0LndpZHRoO1xuICB9XG5cbiAgaWYgKE1hdGguYWJzKGNsaWVudFJlY3QuaGVpZ2h0IC0gaGVpZ2h0KSA8PSAxKSB7XG4gICAgaGVpZ2h0ID0gY2xpZW50UmVjdC5oZWlnaHQ7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHg6IGVsZW1lbnQub2Zmc2V0TGVmdCxcbiAgICB5OiBlbGVtZW50Lm9mZnNldFRvcCxcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHRcbiAgfTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXROb2RlTmFtZShlbGVtZW50KSB7XG4gIHJldHVybiBlbGVtZW50ID8gKGVsZW1lbnQubm9kZU5hbWUgfHwgJycpLnRvTG93ZXJDYXNlKCkgOiBudWxsO1xufSIsImltcG9ydCBnZXRXaW5kb3dTY3JvbGwgZnJvbSBcIi4vZ2V0V2luZG93U2Nyb2xsLmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93IGZyb20gXCIuL2dldFdpbmRvdy5qc1wiO1xuaW1wb3J0IHsgaXNIVE1MRWxlbWVudCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmltcG9ydCBnZXRIVE1MRWxlbWVudFNjcm9sbCBmcm9tIFwiLi9nZXRIVE1MRWxlbWVudFNjcm9sbC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Tm9kZVNjcm9sbChub2RlKSB7XG4gIGlmIChub2RlID09PSBnZXRXaW5kb3cobm9kZSkgfHwgIWlzSFRNTEVsZW1lbnQobm9kZSkpIHtcbiAgICByZXR1cm4gZ2V0V2luZG93U2Nyb2xsKG5vZGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBnZXRIVE1MRWxlbWVudFNjcm9sbChub2RlKTtcbiAgfVxufSIsImltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5pbXBvcnQgZ2V0Tm9kZU5hbWUgZnJvbSBcIi4vZ2V0Tm9kZU5hbWUuanNcIjtcbmltcG9ydCBnZXRDb21wdXRlZFN0eWxlIGZyb20gXCIuL2dldENvbXB1dGVkU3R5bGUuanNcIjtcbmltcG9ydCB7IGlzSFRNTEVsZW1lbnQsIGlzU2hhZG93Um9vdCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmltcG9ydCBpc1RhYmxlRWxlbWVudCBmcm9tIFwiLi9pc1RhYmxlRWxlbWVudC5qc1wiO1xuaW1wb3J0IGdldFBhcmVudE5vZGUgZnJvbSBcIi4vZ2V0UGFyZW50Tm9kZS5qc1wiO1xuaW1wb3J0IGdldFVBU3RyaW5nIGZyb20gXCIuLi91dGlscy91c2VyQWdlbnQuanNcIjtcblxuZnVuY3Rpb24gZ2V0VHJ1ZU9mZnNldFBhcmVudChlbGVtZW50KSB7XG4gIGlmICghaXNIVE1MRWxlbWVudChlbGVtZW50KSB8fCAvLyBodHRwczovL2dpdGh1Yi5jb20vcG9wcGVyanMvcG9wcGVyLWNvcmUvaXNzdWVzLzgzN1xuICBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLnBvc2l0aW9uID09PSAnZml4ZWQnKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gZWxlbWVudC5vZmZzZXRQYXJlbnQ7XG59IC8vIGAub2Zmc2V0UGFyZW50YCByZXBvcnRzIGBudWxsYCBmb3IgZml4ZWQgZWxlbWVudHMsIHdoaWxlIGFic29sdXRlIGVsZW1lbnRzXG4vLyByZXR1cm4gdGhlIGNvbnRhaW5pbmcgYmxvY2tcblxuXG5mdW5jdGlvbiBnZXRDb250YWluaW5nQmxvY2soZWxlbWVudCkge1xuICB2YXIgaXNGaXJlZm94ID0gL2ZpcmVmb3gvaS50ZXN0KGdldFVBU3RyaW5nKCkpO1xuICB2YXIgaXNJRSA9IC9UcmlkZW50L2kudGVzdChnZXRVQVN0cmluZygpKTtcblxuICBpZiAoaXNJRSAmJiBpc0hUTUxFbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgLy8gSW4gSUUgOSwgMTAgYW5kIDExIGZpeGVkIGVsZW1lbnRzIGNvbnRhaW5pbmcgYmxvY2sgaXMgYWx3YXlzIGVzdGFibGlzaGVkIGJ5IHRoZSB2aWV3cG9ydFxuICAgIHZhciBlbGVtZW50Q3NzID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcblxuICAgIGlmIChlbGVtZW50Q3NzLnBvc2l0aW9uID09PSAnZml4ZWQnKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICB2YXIgY3VycmVudE5vZGUgPSBnZXRQYXJlbnROb2RlKGVsZW1lbnQpO1xuXG4gIGlmIChpc1NoYWRvd1Jvb3QoY3VycmVudE5vZGUpKSB7XG4gICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5ob3N0O1xuICB9XG5cbiAgd2hpbGUgKGlzSFRNTEVsZW1lbnQoY3VycmVudE5vZGUpICYmIFsnaHRtbCcsICdib2R5J10uaW5kZXhPZihnZXROb2RlTmFtZShjdXJyZW50Tm9kZSkpIDwgMCkge1xuICAgIHZhciBjc3MgPSBnZXRDb21wdXRlZFN0eWxlKGN1cnJlbnROb2RlKTsgLy8gVGhpcyBpcyBub24tZXhoYXVzdGl2ZSBidXQgY292ZXJzIHRoZSBtb3N0IGNvbW1vbiBDU1MgcHJvcGVydGllcyB0aGF0XG4gICAgLy8gY3JlYXRlIGEgY29udGFpbmluZyBibG9jay5cbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9DU1MvQ29udGFpbmluZ19ibG9jayNpZGVudGlmeWluZ190aGVfY29udGFpbmluZ19ibG9ja1xuXG4gICAgaWYgKGNzcy50cmFuc2Zvcm0gIT09ICdub25lJyB8fCBjc3MucGVyc3BlY3RpdmUgIT09ICdub25lJyB8fCBjc3MuY29udGFpbiA9PT0gJ3BhaW50JyB8fCBbJ3RyYW5zZm9ybScsICdwZXJzcGVjdGl2ZSddLmluZGV4T2YoY3NzLndpbGxDaGFuZ2UpICE9PSAtMSB8fCBpc0ZpcmVmb3ggJiYgY3NzLndpbGxDaGFuZ2UgPT09ICdmaWx0ZXInIHx8IGlzRmlyZWZveCAmJiBjc3MuZmlsdGVyICYmIGNzcy5maWx0ZXIgIT09ICdub25lJykge1xuICAgICAgcmV0dXJuIGN1cnJlbnROb2RlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59IC8vIEdldHMgdGhlIGNsb3Nlc3QgYW5jZXN0b3IgcG9zaXRpb25lZCBlbGVtZW50LiBIYW5kbGVzIHNvbWUgZWRnZSBjYXNlcyxcbi8vIHN1Y2ggYXMgdGFibGUgYW5jZXN0b3JzIGFuZCBjcm9zcyBicm93c2VyIGJ1Z3MuXG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0T2Zmc2V0UGFyZW50KGVsZW1lbnQpIHtcbiAgdmFyIHdpbmRvdyA9IGdldFdpbmRvdyhlbGVtZW50KTtcbiAgdmFyIG9mZnNldFBhcmVudCA9IGdldFRydWVPZmZzZXRQYXJlbnQoZWxlbWVudCk7XG5cbiAgd2hpbGUgKG9mZnNldFBhcmVudCAmJiBpc1RhYmxlRWxlbWVudChvZmZzZXRQYXJlbnQpICYmIGdldENvbXB1dGVkU3R5bGUob2Zmc2V0UGFyZW50KS5wb3NpdGlvbiA9PT0gJ3N0YXRpYycpIHtcbiAgICBvZmZzZXRQYXJlbnQgPSBnZXRUcnVlT2Zmc2V0UGFyZW50KG9mZnNldFBhcmVudCk7XG4gIH1cblxuICBpZiAob2Zmc2V0UGFyZW50ICYmIChnZXROb2RlTmFtZShvZmZzZXRQYXJlbnQpID09PSAnaHRtbCcgfHwgZ2V0Tm9kZU5hbWUob2Zmc2V0UGFyZW50KSA9PT0gJ2JvZHknICYmIGdldENvbXB1dGVkU3R5bGUob2Zmc2V0UGFyZW50KS5wb3NpdGlvbiA9PT0gJ3N0YXRpYycpKSB7XG4gICAgcmV0dXJuIHdpbmRvdztcbiAgfVxuXG4gIHJldHVybiBvZmZzZXRQYXJlbnQgfHwgZ2V0Q29udGFpbmluZ0Jsb2NrKGVsZW1lbnQpIHx8IHdpbmRvdztcbn0iLCJpbXBvcnQgZ2V0Tm9kZU5hbWUgZnJvbSBcIi4vZ2V0Tm9kZU5hbWUuanNcIjtcbmltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4vZ2V0RG9jdW1lbnRFbGVtZW50LmpzXCI7XG5pbXBvcnQgeyBpc1NoYWRvd1Jvb3QgfSBmcm9tIFwiLi9pbnN0YW5jZU9mLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRQYXJlbnROb2RlKGVsZW1lbnQpIHtcbiAgaWYgKGdldE5vZGVOYW1lKGVsZW1lbnQpID09PSAnaHRtbCcpIHtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIHJldHVybiAoLy8gdGhpcyBpcyBhIHF1aWNrZXIgKGJ1dCBsZXNzIHR5cGUgc2FmZSkgd2F5IHRvIHNhdmUgcXVpdGUgc29tZSBieXRlcyBmcm9tIHRoZSBidW5kbGVcbiAgICAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS1yZXR1cm5dXG4gICAgLy8gJEZsb3dGaXhNZVtwcm9wLW1pc3NpbmddXG4gICAgZWxlbWVudC5hc3NpZ25lZFNsb3QgfHwgLy8gc3RlcCBpbnRvIHRoZSBzaGFkb3cgRE9NIG9mIHRoZSBwYXJlbnQgb2YgYSBzbG90dGVkIG5vZGVcbiAgICBlbGVtZW50LnBhcmVudE5vZGUgfHwgKCAvLyBET00gRWxlbWVudCBkZXRlY3RlZFxuICAgIGlzU2hhZG93Um9vdChlbGVtZW50KSA/IGVsZW1lbnQuaG9zdCA6IG51bGwpIHx8IC8vIFNoYWRvd1Jvb3QgZGV0ZWN0ZWRcbiAgICAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS1jYWxsXTogSFRNTEVsZW1lbnQgaXMgYSBOb2RlXG4gICAgZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpIC8vIGZhbGxiYWNrXG5cbiAgKTtcbn0iLCJpbXBvcnQgZ2V0UGFyZW50Tm9kZSBmcm9tIFwiLi9nZXRQYXJlbnROb2RlLmpzXCI7XG5pbXBvcnQgaXNTY3JvbGxQYXJlbnQgZnJvbSBcIi4vaXNTY3JvbGxQYXJlbnQuanNcIjtcbmltcG9ydCBnZXROb2RlTmFtZSBmcm9tIFwiLi9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IHsgaXNIVE1MRWxlbWVudCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFNjcm9sbFBhcmVudChub2RlKSB7XG4gIGlmIChbJ2h0bWwnLCAnYm9keScsICcjZG9jdW1lbnQnXS5pbmRleE9mKGdldE5vZGVOYW1lKG5vZGUpKSA+PSAwKSB7XG4gICAgLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtcmV0dXJuXTogYXNzdW1lIGJvZHkgaXMgYWx3YXlzIGF2YWlsYWJsZVxuICAgIHJldHVybiBub2RlLm93bmVyRG9jdW1lbnQuYm9keTtcbiAgfVxuXG4gIGlmIChpc0hUTUxFbGVtZW50KG5vZGUpICYmIGlzU2Nyb2xsUGFyZW50KG5vZGUpKSB7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICByZXR1cm4gZ2V0U2Nyb2xsUGFyZW50KGdldFBhcmVudE5vZGUobm9kZSkpO1xufSIsImltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5pbXBvcnQgZ2V0RG9jdW1lbnRFbGVtZW50IGZyb20gXCIuL2dldERvY3VtZW50RWxlbWVudC5qc1wiO1xuaW1wb3J0IGdldFdpbmRvd1Njcm9sbEJhclggZnJvbSBcIi4vZ2V0V2luZG93U2Nyb2xsQmFyWC5qc1wiO1xuaW1wb3J0IGlzTGF5b3V0Vmlld3BvcnQgZnJvbSBcIi4vaXNMYXlvdXRWaWV3cG9ydC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Vmlld3BvcnRSZWN0KGVsZW1lbnQsIHN0cmF0ZWd5KSB7XG4gIHZhciB3aW4gPSBnZXRXaW5kb3coZWxlbWVudCk7XG4gIHZhciBodG1sID0gZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpO1xuICB2YXIgdmlzdWFsVmlld3BvcnQgPSB3aW4udmlzdWFsVmlld3BvcnQ7XG4gIHZhciB3aWR0aCA9IGh0bWwuY2xpZW50V2lkdGg7XG4gIHZhciBoZWlnaHQgPSBodG1sLmNsaWVudEhlaWdodDtcbiAgdmFyIHggPSAwO1xuICB2YXIgeSA9IDA7XG5cbiAgaWYgKHZpc3VhbFZpZXdwb3J0KSB7XG4gICAgd2lkdGggPSB2aXN1YWxWaWV3cG9ydC53aWR0aDtcbiAgICBoZWlnaHQgPSB2aXN1YWxWaWV3cG9ydC5oZWlnaHQ7XG4gICAgdmFyIGxheW91dFZpZXdwb3J0ID0gaXNMYXlvdXRWaWV3cG9ydCgpO1xuXG4gICAgaWYgKGxheW91dFZpZXdwb3J0IHx8ICFsYXlvdXRWaWV3cG9ydCAmJiBzdHJhdGVneSA9PT0gJ2ZpeGVkJykge1xuICAgICAgeCA9IHZpc3VhbFZpZXdwb3J0Lm9mZnNldExlZnQ7XG4gICAgICB5ID0gdmlzdWFsVmlld3BvcnQub2Zmc2V0VG9wO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHdpZHRoLFxuICAgIGhlaWdodDogaGVpZ2h0LFxuICAgIHg6IHggKyBnZXRXaW5kb3dTY3JvbGxCYXJYKGVsZW1lbnQpLFxuICAgIHk6IHlcbiAgfTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRXaW5kb3cobm9kZSkge1xuICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHdpbmRvdztcbiAgfVxuXG4gIGlmIChub2RlLnRvU3RyaW5nKCkgIT09ICdbb2JqZWN0IFdpbmRvd10nKSB7XG4gICAgdmFyIG93bmVyRG9jdW1lbnQgPSBub2RlLm93bmVyRG9jdW1lbnQ7XG4gICAgcmV0dXJuIG93bmVyRG9jdW1lbnQgPyBvd25lckRvY3VtZW50LmRlZmF1bHRWaWV3IHx8IHdpbmRvdyA6IHdpbmRvdztcbiAgfVxuXG4gIHJldHVybiBub2RlO1xufSIsImltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRXaW5kb3dTY3JvbGwobm9kZSkge1xuICB2YXIgd2luID0gZ2V0V2luZG93KG5vZGUpO1xuICB2YXIgc2Nyb2xsTGVmdCA9IHdpbi5wYWdlWE9mZnNldDtcbiAgdmFyIHNjcm9sbFRvcCA9IHdpbi5wYWdlWU9mZnNldDtcbiAgcmV0dXJuIHtcbiAgICBzY3JvbGxMZWZ0OiBzY3JvbGxMZWZ0LFxuICAgIHNjcm9sbFRvcDogc2Nyb2xsVG9wXG4gIH07XG59IiwiaW1wb3J0IGdldEJvdW5kaW5nQ2xpZW50UmVjdCBmcm9tIFwiLi9nZXRCb3VuZGluZ0NsaWVudFJlY3QuanNcIjtcbmltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4vZ2V0RG9jdW1lbnRFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsIGZyb20gXCIuL2dldFdpbmRvd1Njcm9sbC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0V2luZG93U2Nyb2xsQmFyWChlbGVtZW50KSB7XG4gIC8vIElmIDxodG1sPiBoYXMgYSBDU1Mgd2lkdGggZ3JlYXRlciB0aGFuIHRoZSB2aWV3cG9ydCwgdGhlbiB0aGlzIHdpbGwgYmVcbiAgLy8gaW5jb3JyZWN0IGZvciBSVEwuXG4gIC8vIFBvcHBlciAxIGlzIGJyb2tlbiBpbiB0aGlzIGNhc2UgYW5kIG5ldmVyIGhhZCBhIGJ1ZyByZXBvcnQgc28gbGV0J3MgYXNzdW1lXG4gIC8vIGl0J3Mgbm90IGFuIGlzc3VlLiBJIGRvbid0IHRoaW5rIGFueW9uZSBldmVyIHNwZWNpZmllcyB3aWR0aCBvbiA8aHRtbD5cbiAgLy8gYW55d2F5LlxuICAvLyBCcm93c2VycyB3aGVyZSB0aGUgbGVmdCBzY3JvbGxiYXIgZG9lc24ndCBjYXVzZSBhbiBpc3N1ZSByZXBvcnQgYDBgIGZvclxuICAvLyB0aGlzIChlLmcuIEVkZ2UgMjAxOSwgSUUxMSwgU2FmYXJpKVxuICByZXR1cm4gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGdldERvY3VtZW50RWxlbWVudChlbGVtZW50KSkubGVmdCArIGdldFdpbmRvd1Njcm9sbChlbGVtZW50KS5zY3JvbGxMZWZ0O1xufSIsImltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5cbmZ1bmN0aW9uIGlzRWxlbWVudChub2RlKSB7XG4gIHZhciBPd25FbGVtZW50ID0gZ2V0V2luZG93KG5vZGUpLkVsZW1lbnQ7XG4gIHJldHVybiBub2RlIGluc3RhbmNlb2YgT3duRWxlbWVudCB8fCBub2RlIGluc3RhbmNlb2YgRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gaXNIVE1MRWxlbWVudChub2RlKSB7XG4gIHZhciBPd25FbGVtZW50ID0gZ2V0V2luZG93KG5vZGUpLkhUTUxFbGVtZW50O1xuICByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIE93bkVsZW1lbnQgfHwgbm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50O1xufVxuXG5mdW5jdGlvbiBpc1NoYWRvd1Jvb3Qobm9kZSkge1xuICAvLyBJRSAxMSBoYXMgbm8gU2hhZG93Um9vdFxuICBpZiAodHlwZW9mIFNoYWRvd1Jvb3QgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIE93bkVsZW1lbnQgPSBnZXRXaW5kb3cobm9kZSkuU2hhZG93Um9vdDtcbiAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBPd25FbGVtZW50IHx8IG5vZGUgaW5zdGFuY2VvZiBTaGFkb3dSb290O1xufVxuXG5leHBvcnQgeyBpc0VsZW1lbnQsIGlzSFRNTEVsZW1lbnQsIGlzU2hhZG93Um9vdCB9OyIsImltcG9ydCBnZXRVQVN0cmluZyBmcm9tIFwiLi4vdXRpbHMvdXNlckFnZW50LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc0xheW91dFZpZXdwb3J0KCkge1xuICByZXR1cm4gIS9eKCg/IWNocm9tZXxhbmRyb2lkKS4pKnNhZmFyaS9pLnRlc3QoZ2V0VUFTdHJpbmcoKSk7XG59IiwiaW1wb3J0IGdldENvbXB1dGVkU3R5bGUgZnJvbSBcIi4vZ2V0Q29tcHV0ZWRTdHlsZS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNTY3JvbGxQYXJlbnQoZWxlbWVudCkge1xuICAvLyBGaXJlZm94IHdhbnRzIHVzIHRvIGNoZWNrIGAteGAgYW5kIGAteWAgdmFyaWF0aW9ucyBhcyB3ZWxsXG4gIHZhciBfZ2V0Q29tcHV0ZWRTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCksXG4gICAgICBvdmVyZmxvdyA9IF9nZXRDb21wdXRlZFN0eWxlLm92ZXJmbG93LFxuICAgICAgb3ZlcmZsb3dYID0gX2dldENvbXB1dGVkU3R5bGUub3ZlcmZsb3dYLFxuICAgICAgb3ZlcmZsb3dZID0gX2dldENvbXB1dGVkU3R5bGUub3ZlcmZsb3dZO1xuXG4gIHJldHVybiAvYXV0b3xzY3JvbGx8b3ZlcmxheXxoaWRkZW4vLnRlc3Qob3ZlcmZsb3cgKyBvdmVyZmxvd1kgKyBvdmVyZmxvd1gpO1xufSIsImltcG9ydCBnZXROb2RlTmFtZSBmcm9tIFwiLi9nZXROb2RlTmFtZS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNUYWJsZUVsZW1lbnQoZWxlbWVudCkge1xuICByZXR1cm4gWyd0YWJsZScsICd0ZCcsICd0aCddLmluZGV4T2YoZ2V0Tm9kZU5hbWUoZWxlbWVudCkpID49IDA7XG59IiwiaW1wb3J0IGdldFNjcm9sbFBhcmVudCBmcm9tIFwiLi9nZXRTY3JvbGxQYXJlbnQuanNcIjtcbmltcG9ydCBnZXRQYXJlbnROb2RlIGZyb20gXCIuL2dldFBhcmVudE5vZGUuanNcIjtcbmltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5pbXBvcnQgaXNTY3JvbGxQYXJlbnQgZnJvbSBcIi4vaXNTY3JvbGxQYXJlbnQuanNcIjtcbi8qXG5naXZlbiBhIERPTSBlbGVtZW50LCByZXR1cm4gdGhlIGxpc3Qgb2YgYWxsIHNjcm9sbCBwYXJlbnRzLCB1cCB0aGUgbGlzdCBvZiBhbmNlc29yc1xudW50aWwgd2UgZ2V0IHRvIHRoZSB0b3Agd2luZG93IG9iamVjdC4gVGhpcyBsaXN0IGlzIHdoYXQgd2UgYXR0YWNoIHNjcm9sbCBsaXN0ZW5lcnNcbnRvLCBiZWNhdXNlIGlmIGFueSBvZiB0aGVzZSBwYXJlbnQgZWxlbWVudHMgc2Nyb2xsLCB3ZSdsbCBuZWVkIHRvIHJlLWNhbGN1bGF0ZSB0aGVcbnJlZmVyZW5jZSBlbGVtZW50J3MgcG9zaXRpb24uXG4qL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsaXN0U2Nyb2xsUGFyZW50cyhlbGVtZW50LCBsaXN0KSB7XG4gIHZhciBfZWxlbWVudCRvd25lckRvY3VtZW47XG5cbiAgaWYgKGxpc3QgPT09IHZvaWQgMCkge1xuICAgIGxpc3QgPSBbXTtcbiAgfVxuXG4gIHZhciBzY3JvbGxQYXJlbnQgPSBnZXRTY3JvbGxQYXJlbnQoZWxlbWVudCk7XG4gIHZhciBpc0JvZHkgPSBzY3JvbGxQYXJlbnQgPT09ICgoX2VsZW1lbnQkb3duZXJEb2N1bWVuID0gZWxlbWVudC5vd25lckRvY3VtZW50KSA9PSBudWxsID8gdm9pZCAwIDogX2VsZW1lbnQkb3duZXJEb2N1bWVuLmJvZHkpO1xuICB2YXIgd2luID0gZ2V0V2luZG93KHNjcm9sbFBhcmVudCk7XG4gIHZhciB0YXJnZXQgPSBpc0JvZHkgPyBbd2luXS5jb25jYXQod2luLnZpc3VhbFZpZXdwb3J0IHx8IFtdLCBpc1Njcm9sbFBhcmVudChzY3JvbGxQYXJlbnQpID8gc2Nyb2xsUGFyZW50IDogW10pIDogc2Nyb2xsUGFyZW50O1xuICB2YXIgdXBkYXRlZExpc3QgPSBsaXN0LmNvbmNhdCh0YXJnZXQpO1xuICByZXR1cm4gaXNCb2R5ID8gdXBkYXRlZExpc3QgOiAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS1jYWxsXTogaXNCb2R5IHRlbGxzIHVzIHRhcmdldCB3aWxsIGJlIGFuIEhUTUxFbGVtZW50IGhlcmVcbiAgdXBkYXRlZExpc3QuY29uY2F0KGxpc3RTY3JvbGxQYXJlbnRzKGdldFBhcmVudE5vZGUodGFyZ2V0KSkpO1xufSIsImV4cG9ydCB2YXIgdG9wID0gJ3RvcCc7XG5leHBvcnQgdmFyIGJvdHRvbSA9ICdib3R0b20nO1xuZXhwb3J0IHZhciByaWdodCA9ICdyaWdodCc7XG5leHBvcnQgdmFyIGxlZnQgPSAnbGVmdCc7XG5leHBvcnQgdmFyIGF1dG8gPSAnYXV0byc7XG5leHBvcnQgdmFyIGJhc2VQbGFjZW1lbnRzID0gW3RvcCwgYm90dG9tLCByaWdodCwgbGVmdF07XG5leHBvcnQgdmFyIHN0YXJ0ID0gJ3N0YXJ0JztcbmV4cG9ydCB2YXIgZW5kID0gJ2VuZCc7XG5leHBvcnQgdmFyIGNsaXBwaW5nUGFyZW50cyA9ICdjbGlwcGluZ1BhcmVudHMnO1xuZXhwb3J0IHZhciB2aWV3cG9ydCA9ICd2aWV3cG9ydCc7XG5leHBvcnQgdmFyIHBvcHBlciA9ICdwb3BwZXInO1xuZXhwb3J0IHZhciByZWZlcmVuY2UgPSAncmVmZXJlbmNlJztcbmV4cG9ydCB2YXIgdmFyaWF0aW9uUGxhY2VtZW50cyA9IC8qI19fUFVSRV9fKi9iYXNlUGxhY2VtZW50cy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcGxhY2VtZW50KSB7XG4gIHJldHVybiBhY2MuY29uY2F0KFtwbGFjZW1lbnQgKyBcIi1cIiArIHN0YXJ0LCBwbGFjZW1lbnQgKyBcIi1cIiArIGVuZF0pO1xufSwgW10pO1xuZXhwb3J0IHZhciBwbGFjZW1lbnRzID0gLyojX19QVVJFX18qL1tdLmNvbmNhdChiYXNlUGxhY2VtZW50cywgW2F1dG9dKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcGxhY2VtZW50KSB7XG4gIHJldHVybiBhY2MuY29uY2F0KFtwbGFjZW1lbnQsIHBsYWNlbWVudCArIFwiLVwiICsgc3RhcnQsIHBsYWNlbWVudCArIFwiLVwiICsgZW5kXSk7XG59LCBbXSk7IC8vIG1vZGlmaWVycyB0aGF0IG5lZWQgdG8gcmVhZCB0aGUgRE9NXG5cbmV4cG9ydCB2YXIgYmVmb3JlUmVhZCA9ICdiZWZvcmVSZWFkJztcbmV4cG9ydCB2YXIgcmVhZCA9ICdyZWFkJztcbmV4cG9ydCB2YXIgYWZ0ZXJSZWFkID0gJ2FmdGVyUmVhZCc7IC8vIHB1cmUtbG9naWMgbW9kaWZpZXJzXG5cbmV4cG9ydCB2YXIgYmVmb3JlTWFpbiA9ICdiZWZvcmVNYWluJztcbmV4cG9ydCB2YXIgbWFpbiA9ICdtYWluJztcbmV4cG9ydCB2YXIgYWZ0ZXJNYWluID0gJ2FmdGVyTWFpbic7IC8vIG1vZGlmaWVyIHdpdGggdGhlIHB1cnBvc2UgdG8gd3JpdGUgdG8gdGhlIERPTSAob3Igd3JpdGUgaW50byBhIGZyYW1ld29yayBzdGF0ZSlcblxuZXhwb3J0IHZhciBiZWZvcmVXcml0ZSA9ICdiZWZvcmVXcml0ZSc7XG5leHBvcnQgdmFyIHdyaXRlID0gJ3dyaXRlJztcbmV4cG9ydCB2YXIgYWZ0ZXJXcml0ZSA9ICdhZnRlcldyaXRlJztcbmV4cG9ydCB2YXIgbW9kaWZpZXJQaGFzZXMgPSBbYmVmb3JlUmVhZCwgcmVhZCwgYWZ0ZXJSZWFkLCBiZWZvcmVNYWluLCBtYWluLCBhZnRlck1haW4sIGJlZm9yZVdyaXRlLCB3cml0ZSwgYWZ0ZXJXcml0ZV07IiwiaW1wb3J0IGdldE5vZGVOYW1lIGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0Tm9kZU5hbWUuanNcIjtcbmltcG9ydCB7IGlzSFRNTEVsZW1lbnQgfSBmcm9tIFwiLi4vZG9tLXV0aWxzL2luc3RhbmNlT2YuanNcIjsgLy8gVGhpcyBtb2RpZmllciB0YWtlcyB0aGUgc3R5bGVzIHByZXBhcmVkIGJ5IHRoZSBgY29tcHV0ZVN0eWxlc2AgbW9kaWZpZXJcbi8vIGFuZCBhcHBsaWVzIHRoZW0gdG8gdGhlIEhUTUxFbGVtZW50cyBzdWNoIGFzIHBvcHBlciBhbmQgYXJyb3dcblxuZnVuY3Rpb24gYXBwbHlTdHlsZXMoX3JlZikge1xuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlO1xuICBPYmplY3Qua2V5cyhzdGF0ZS5lbGVtZW50cykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhciBzdHlsZSA9IHN0YXRlLnN0eWxlc1tuYW1lXSB8fCB7fTtcbiAgICB2YXIgYXR0cmlidXRlcyA9IHN0YXRlLmF0dHJpYnV0ZXNbbmFtZV0gfHwge307XG4gICAgdmFyIGVsZW1lbnQgPSBzdGF0ZS5lbGVtZW50c1tuYW1lXTsgLy8gYXJyb3cgaXMgb3B0aW9uYWwgKyB2aXJ0dWFsIGVsZW1lbnRzXG5cbiAgICBpZiAoIWlzSFRNTEVsZW1lbnQoZWxlbWVudCkgfHwgIWdldE5vZGVOYW1lKGVsZW1lbnQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfSAvLyBGbG93IGRvZXNuJ3Qgc3VwcG9ydCB0byBleHRlbmQgdGhpcyBwcm9wZXJ0eSwgYnV0IGl0J3MgdGhlIG1vc3RcbiAgICAvLyBlZmZlY3RpdmUgd2F5IHRvIGFwcGx5IHN0eWxlcyB0byBhbiBIVE1MRWxlbWVudFxuICAgIC8vICRGbG93Rml4TWVbY2Fubm90LXdyaXRlXVxuXG5cbiAgICBPYmplY3QuYXNzaWduKGVsZW1lbnQuc3R5bGUsIHN0eWxlKTtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICB2YXIgdmFsdWUgPSBhdHRyaWJ1dGVzW25hbWVdO1xuXG4gICAgICBpZiAodmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUgPT09IHRydWUgPyAnJyA6IHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGVmZmVjdChfcmVmMikge1xuICB2YXIgc3RhdGUgPSBfcmVmMi5zdGF0ZTtcbiAgdmFyIGluaXRpYWxTdHlsZXMgPSB7XG4gICAgcG9wcGVyOiB7XG4gICAgICBwb3NpdGlvbjogc3RhdGUub3B0aW9ucy5zdHJhdGVneSxcbiAgICAgIGxlZnQ6ICcwJyxcbiAgICAgIHRvcDogJzAnLFxuICAgICAgbWFyZ2luOiAnMCdcbiAgICB9LFxuICAgIGFycm93OiB7XG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuICAgIH0sXG4gICAgcmVmZXJlbmNlOiB7fVxuICB9O1xuICBPYmplY3QuYXNzaWduKHN0YXRlLmVsZW1lbnRzLnBvcHBlci5zdHlsZSwgaW5pdGlhbFN0eWxlcy5wb3BwZXIpO1xuICBzdGF0ZS5zdHlsZXMgPSBpbml0aWFsU3R5bGVzO1xuXG4gIGlmIChzdGF0ZS5lbGVtZW50cy5hcnJvdykge1xuICAgIE9iamVjdC5hc3NpZ24oc3RhdGUuZWxlbWVudHMuYXJyb3cuc3R5bGUsIGluaXRpYWxTdHlsZXMuYXJyb3cpO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBPYmplY3Qua2V5cyhzdGF0ZS5lbGVtZW50cykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgdmFyIGVsZW1lbnQgPSBzdGF0ZS5lbGVtZW50c1tuYW1lXTtcbiAgICAgIHZhciBhdHRyaWJ1dGVzID0gc3RhdGUuYXR0cmlidXRlc1tuYW1lXSB8fCB7fTtcbiAgICAgIHZhciBzdHlsZVByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyhzdGF0ZS5zdHlsZXMuaGFzT3duUHJvcGVydHkobmFtZSkgPyBzdGF0ZS5zdHlsZXNbbmFtZV0gOiBpbml0aWFsU3R5bGVzW25hbWVdKTsgLy8gU2V0IGFsbCB2YWx1ZXMgdG8gYW4gZW1wdHkgc3RyaW5nIHRvIHVuc2V0IHRoZW1cblxuICAgICAgdmFyIHN0eWxlID0gc3R5bGVQcm9wZXJ0aWVzLnJlZHVjZShmdW5jdGlvbiAoc3R5bGUsIHByb3BlcnR5KSB7XG4gICAgICAgIHN0eWxlW3Byb3BlcnR5XSA9ICcnO1xuICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgICB9LCB7fSk7IC8vIGFycm93IGlzIG9wdGlvbmFsICsgdmlydHVhbCBlbGVtZW50c1xuXG4gICAgICBpZiAoIWlzSFRNTEVsZW1lbnQoZWxlbWVudCkgfHwgIWdldE5vZGVOYW1lKGVsZW1lbnQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgT2JqZWN0LmFzc2lnbihlbGVtZW50LnN0eWxlLCBzdHlsZSk7XG4gICAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChhdHRyaWJ1dGUpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnYXBwbHlTdHlsZXMnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ3dyaXRlJyxcbiAgZm46IGFwcGx5U3R5bGVzLFxuICBlZmZlY3Q6IGVmZmVjdCxcbiAgcmVxdWlyZXM6IFsnY29tcHV0ZVN0eWxlcyddXG59OyIsImltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0TGF5b3V0UmVjdCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldExheW91dFJlY3QuanNcIjtcbmltcG9ydCBjb250YWlucyBmcm9tIFwiLi4vZG9tLXV0aWxzL2NvbnRhaW5zLmpzXCI7XG5pbXBvcnQgZ2V0T2Zmc2V0UGFyZW50IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0T2Zmc2V0UGFyZW50LmpzXCI7XG5pbXBvcnQgZ2V0TWFpbkF4aXNGcm9tUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQuanNcIjtcbmltcG9ydCB7IHdpdGhpbiB9IGZyb20gXCIuLi91dGlscy93aXRoaW4uanNcIjtcbmltcG9ydCBtZXJnZVBhZGRpbmdPYmplY3QgZnJvbSBcIi4uL3V0aWxzL21lcmdlUGFkZGluZ09iamVjdC5qc1wiO1xuaW1wb3J0IGV4cGFuZFRvSGFzaE1hcCBmcm9tIFwiLi4vdXRpbHMvZXhwYW5kVG9IYXNoTWFwLmpzXCI7XG5pbXBvcnQgeyBsZWZ0LCByaWdodCwgYmFzZVBsYWNlbWVudHMsIHRvcCwgYm90dG9tIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG5pbXBvcnQgeyBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4uL2RvbS11dGlscy9pbnN0YW5jZU9mLmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxudmFyIHRvUGFkZGluZ09iamVjdCA9IGZ1bmN0aW9uIHRvUGFkZGluZ09iamVjdChwYWRkaW5nLCBzdGF0ZSkge1xuICBwYWRkaW5nID0gdHlwZW9mIHBhZGRpbmcgPT09ICdmdW5jdGlvbicgPyBwYWRkaW5nKE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnJlY3RzLCB7XG4gICAgcGxhY2VtZW50OiBzdGF0ZS5wbGFjZW1lbnRcbiAgfSkpIDogcGFkZGluZztcbiAgcmV0dXJuIG1lcmdlUGFkZGluZ09iamVjdCh0eXBlb2YgcGFkZGluZyAhPT0gJ251bWJlcicgPyBwYWRkaW5nIDogZXhwYW5kVG9IYXNoTWFwKHBhZGRpbmcsIGJhc2VQbGFjZW1lbnRzKSk7XG59O1xuXG5mdW5jdGlvbiBhcnJvdyhfcmVmKSB7XG4gIHZhciBfc3RhdGUkbW9kaWZpZXJzRGF0YSQ7XG5cbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWUsXG4gICAgICBvcHRpb25zID0gX3JlZi5vcHRpb25zO1xuICB2YXIgYXJyb3dFbGVtZW50ID0gc3RhdGUuZWxlbWVudHMuYXJyb3c7XG4gIHZhciBwb3BwZXJPZmZzZXRzID0gc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzO1xuICB2YXIgYmFzZVBsYWNlbWVudCA9IGdldEJhc2VQbGFjZW1lbnQoc3RhdGUucGxhY2VtZW50KTtcbiAgdmFyIGF4aXMgPSBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQoYmFzZVBsYWNlbWVudCk7XG4gIHZhciBpc1ZlcnRpY2FsID0gW2xlZnQsIHJpZ2h0XS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpID49IDA7XG4gIHZhciBsZW4gPSBpc1ZlcnRpY2FsID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuXG4gIGlmICghYXJyb3dFbGVtZW50IHx8ICFwb3BwZXJPZmZzZXRzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHBhZGRpbmdPYmplY3QgPSB0b1BhZGRpbmdPYmplY3Qob3B0aW9ucy5wYWRkaW5nLCBzdGF0ZSk7XG4gIHZhciBhcnJvd1JlY3QgPSBnZXRMYXlvdXRSZWN0KGFycm93RWxlbWVudCk7XG4gIHZhciBtaW5Qcm9wID0gYXhpcyA9PT0gJ3knID8gdG9wIDogbGVmdDtcbiAgdmFyIG1heFByb3AgPSBheGlzID09PSAneScgPyBib3R0b20gOiByaWdodDtcbiAgdmFyIGVuZERpZmYgPSBzdGF0ZS5yZWN0cy5yZWZlcmVuY2VbbGVuXSArIHN0YXRlLnJlY3RzLnJlZmVyZW5jZVtheGlzXSAtIHBvcHBlck9mZnNldHNbYXhpc10gLSBzdGF0ZS5yZWN0cy5wb3BwZXJbbGVuXTtcbiAgdmFyIHN0YXJ0RGlmZiA9IHBvcHBlck9mZnNldHNbYXhpc10gLSBzdGF0ZS5yZWN0cy5yZWZlcmVuY2VbYXhpc107XG4gIHZhciBhcnJvd09mZnNldFBhcmVudCA9IGdldE9mZnNldFBhcmVudChhcnJvd0VsZW1lbnQpO1xuICB2YXIgY2xpZW50U2l6ZSA9IGFycm93T2Zmc2V0UGFyZW50ID8gYXhpcyA9PT0gJ3knID8gYXJyb3dPZmZzZXRQYXJlbnQuY2xpZW50SGVpZ2h0IHx8IDAgOiBhcnJvd09mZnNldFBhcmVudC5jbGllbnRXaWR0aCB8fCAwIDogMDtcbiAgdmFyIGNlbnRlclRvUmVmZXJlbmNlID0gZW5kRGlmZiAvIDIgLSBzdGFydERpZmYgLyAyOyAvLyBNYWtlIHN1cmUgdGhlIGFycm93IGRvZXNuJ3Qgb3ZlcmZsb3cgdGhlIHBvcHBlciBpZiB0aGUgY2VudGVyIHBvaW50IGlzXG4gIC8vIG91dHNpZGUgb2YgdGhlIHBvcHBlciBib3VuZHNcblxuICB2YXIgbWluID0gcGFkZGluZ09iamVjdFttaW5Qcm9wXTtcbiAgdmFyIG1heCA9IGNsaWVudFNpemUgLSBhcnJvd1JlY3RbbGVuXSAtIHBhZGRpbmdPYmplY3RbbWF4UHJvcF07XG4gIHZhciBjZW50ZXIgPSBjbGllbnRTaXplIC8gMiAtIGFycm93UmVjdFtsZW5dIC8gMiArIGNlbnRlclRvUmVmZXJlbmNlO1xuICB2YXIgb2Zmc2V0ID0gd2l0aGluKG1pbiwgY2VudGVyLCBtYXgpOyAvLyBQcmV2ZW50cyBicmVha2luZyBzeW50YXggaGlnaGxpZ2h0aW5nLi4uXG5cbiAgdmFyIGF4aXNQcm9wID0gYXhpcztcbiAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IChfc3RhdGUkbW9kaWZpZXJzRGF0YSQgPSB7fSwgX3N0YXRlJG1vZGlmaWVyc0RhdGEkW2F4aXNQcm9wXSA9IG9mZnNldCwgX3N0YXRlJG1vZGlmaWVyc0RhdGEkLmNlbnRlck9mZnNldCA9IG9mZnNldCAtIGNlbnRlciwgX3N0YXRlJG1vZGlmaWVyc0RhdGEkKTtcbn1cblxuZnVuY3Rpb24gZWZmZWN0KF9yZWYyKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYyLnN0YXRlLFxuICAgICAgb3B0aW9ucyA9IF9yZWYyLm9wdGlvbnM7XG4gIHZhciBfb3B0aW9ucyRlbGVtZW50ID0gb3B0aW9ucy5lbGVtZW50LFxuICAgICAgYXJyb3dFbGVtZW50ID0gX29wdGlvbnMkZWxlbWVudCA9PT0gdm9pZCAwID8gJ1tkYXRhLXBvcHBlci1hcnJvd10nIDogX29wdGlvbnMkZWxlbWVudDtcblxuICBpZiAoYXJyb3dFbGVtZW50ID09IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH0gLy8gQ1NTIHNlbGVjdG9yXG5cblxuICBpZiAodHlwZW9mIGFycm93RWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICBhcnJvd0VsZW1lbnQgPSBzdGF0ZS5lbGVtZW50cy5wb3BwZXIucXVlcnlTZWxlY3RvcihhcnJvd0VsZW1lbnQpO1xuXG4gICAgaWYgKCFhcnJvd0VsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgaWYgKCFpc0hUTUxFbGVtZW50KGFycm93RWxlbWVudCkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoWydQb3BwZXI6IFwiYXJyb3dcIiBlbGVtZW50IG11c3QgYmUgYW4gSFRNTEVsZW1lbnQgKG5vdCBhbiBTVkdFbGVtZW50KS4nLCAnVG8gdXNlIGFuIFNWRyBhcnJvdywgd3JhcCBpdCBpbiBhbiBIVE1MRWxlbWVudCB0aGF0IHdpbGwgYmUgdXNlZCBhcycsICd0aGUgYXJyb3cuJ10uam9pbignICcpKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbnRhaW5zKHN0YXRlLmVsZW1lbnRzLnBvcHBlciwgYXJyb3dFbGVtZW50KSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoWydQb3BwZXI6IFwiYXJyb3dcIiBtb2RpZmllclxcJ3MgYGVsZW1lbnRgIG11c3QgYmUgYSBjaGlsZCBvZiB0aGUgcG9wcGVyJywgJ2VsZW1lbnQuJ10uam9pbignICcpKTtcbiAgICB9XG5cbiAgICByZXR1cm47XG4gIH1cblxuICBzdGF0ZS5lbGVtZW50cy5hcnJvdyA9IGFycm93RWxlbWVudDtcbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ2Fycm93JyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICdtYWluJyxcbiAgZm46IGFycm93LFxuICBlZmZlY3Q6IGVmZmVjdCxcbiAgcmVxdWlyZXM6IFsncG9wcGVyT2Zmc2V0cyddLFxuICByZXF1aXJlc0lmRXhpc3RzOiBbJ3ByZXZlbnRPdmVyZmxvdyddXG59OyIsImltcG9ydCB7IHRvcCwgbGVmdCwgcmlnaHQsIGJvdHRvbSwgZW5kIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG5pbXBvcnQgZ2V0T2Zmc2V0UGFyZW50IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0T2Zmc2V0UGFyZW50LmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0V2luZG93LmpzXCI7XG5pbXBvcnQgZ2V0RG9jdW1lbnRFbGVtZW50IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0RG9jdW1lbnRFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0Q29tcHV0ZWRTdHlsZSBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldENvbXB1dGVkU3R5bGUuanNcIjtcbmltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0VmFyaWF0aW9uIGZyb20gXCIuLi91dGlscy9nZXRWYXJpYXRpb24uanNcIjtcbmltcG9ydCB7IHJvdW5kIH0gZnJvbSBcIi4uL3V0aWxzL21hdGguanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG52YXIgdW5zZXRTaWRlcyA9IHtcbiAgdG9wOiAnYXV0bycsXG4gIHJpZ2h0OiAnYXV0bycsXG4gIGJvdHRvbTogJ2F1dG8nLFxuICBsZWZ0OiAnYXV0bydcbn07IC8vIFJvdW5kIHRoZSBvZmZzZXRzIHRvIHRoZSBuZWFyZXN0IHN1aXRhYmxlIHN1YnBpeGVsIGJhc2VkIG9uIHRoZSBEUFIuXG4vLyBab29taW5nIGNhbiBjaGFuZ2UgdGhlIERQUiwgYnV0IGl0IHNlZW1zIHRvIHJlcG9ydCBhIHZhbHVlIHRoYXQgd2lsbFxuLy8gY2xlYW5seSBkaXZpZGUgdGhlIHZhbHVlcyBpbnRvIHRoZSBhcHByb3ByaWF0ZSBzdWJwaXhlbHMuXG5cbmZ1bmN0aW9uIHJvdW5kT2Zmc2V0c0J5RFBSKF9yZWYsIHdpbikge1xuICB2YXIgeCA9IF9yZWYueCxcbiAgICAgIHkgPSBfcmVmLnk7XG4gIHZhciBkcHIgPSB3aW4uZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuICByZXR1cm4ge1xuICAgIHg6IHJvdW5kKHggKiBkcHIpIC8gZHByIHx8IDAsXG4gICAgeTogcm91bmQoeSAqIGRwcikgLyBkcHIgfHwgMFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFwVG9TdHlsZXMoX3JlZjIpIHtcbiAgdmFyIF9PYmplY3QkYXNzaWduMjtcblxuICB2YXIgcG9wcGVyID0gX3JlZjIucG9wcGVyLFxuICAgICAgcG9wcGVyUmVjdCA9IF9yZWYyLnBvcHBlclJlY3QsXG4gICAgICBwbGFjZW1lbnQgPSBfcmVmMi5wbGFjZW1lbnQsXG4gICAgICB2YXJpYXRpb24gPSBfcmVmMi52YXJpYXRpb24sXG4gICAgICBvZmZzZXRzID0gX3JlZjIub2Zmc2V0cyxcbiAgICAgIHBvc2l0aW9uID0gX3JlZjIucG9zaXRpb24sXG4gICAgICBncHVBY2NlbGVyYXRpb24gPSBfcmVmMi5ncHVBY2NlbGVyYXRpb24sXG4gICAgICBhZGFwdGl2ZSA9IF9yZWYyLmFkYXB0aXZlLFxuICAgICAgcm91bmRPZmZzZXRzID0gX3JlZjIucm91bmRPZmZzZXRzLFxuICAgICAgaXNGaXhlZCA9IF9yZWYyLmlzRml4ZWQ7XG4gIHZhciBfb2Zmc2V0cyR4ID0gb2Zmc2V0cy54LFxuICAgICAgeCA9IF9vZmZzZXRzJHggPT09IHZvaWQgMCA/IDAgOiBfb2Zmc2V0cyR4LFxuICAgICAgX29mZnNldHMkeSA9IG9mZnNldHMueSxcbiAgICAgIHkgPSBfb2Zmc2V0cyR5ID09PSB2b2lkIDAgPyAwIDogX29mZnNldHMkeTtcblxuICB2YXIgX3JlZjMgPSB0eXBlb2Ygcm91bmRPZmZzZXRzID09PSAnZnVuY3Rpb24nID8gcm91bmRPZmZzZXRzKHtcbiAgICB4OiB4LFxuICAgIHk6IHlcbiAgfSkgOiB7XG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH07XG5cbiAgeCA9IF9yZWYzLng7XG4gIHkgPSBfcmVmMy55O1xuICB2YXIgaGFzWCA9IG9mZnNldHMuaGFzT3duUHJvcGVydHkoJ3gnKTtcbiAgdmFyIGhhc1kgPSBvZmZzZXRzLmhhc093blByb3BlcnR5KCd5Jyk7XG4gIHZhciBzaWRlWCA9IGxlZnQ7XG4gIHZhciBzaWRlWSA9IHRvcDtcbiAgdmFyIHdpbiA9IHdpbmRvdztcblxuICBpZiAoYWRhcHRpdmUpIHtcbiAgICB2YXIgb2Zmc2V0UGFyZW50ID0gZ2V0T2Zmc2V0UGFyZW50KHBvcHBlcik7XG4gICAgdmFyIGhlaWdodFByb3AgPSAnY2xpZW50SGVpZ2h0JztcbiAgICB2YXIgd2lkdGhQcm9wID0gJ2NsaWVudFdpZHRoJztcblxuICAgIGlmIChvZmZzZXRQYXJlbnQgPT09IGdldFdpbmRvdyhwb3BwZXIpKSB7XG4gICAgICBvZmZzZXRQYXJlbnQgPSBnZXREb2N1bWVudEVsZW1lbnQocG9wcGVyKTtcblxuICAgICAgaWYgKGdldENvbXB1dGVkU3R5bGUob2Zmc2V0UGFyZW50KS5wb3NpdGlvbiAhPT0gJ3N0YXRpYycgJiYgcG9zaXRpb24gPT09ICdhYnNvbHV0ZScpIHtcbiAgICAgICAgaGVpZ2h0UHJvcCA9ICdzY3JvbGxIZWlnaHQnO1xuICAgICAgICB3aWR0aFByb3AgPSAnc2Nyb2xsV2lkdGgnO1xuICAgICAgfVxuICAgIH0gLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtY2FzdF06IGZvcmNlIHR5cGUgcmVmaW5lbWVudCwgd2UgY29tcGFyZSBvZmZzZXRQYXJlbnQgd2l0aCB3aW5kb3cgYWJvdmUsIGJ1dCBGbG93IGRvZXNuJ3QgZGV0ZWN0IGl0XG5cblxuICAgIG9mZnNldFBhcmVudCA9IG9mZnNldFBhcmVudDtcblxuICAgIGlmIChwbGFjZW1lbnQgPT09IHRvcCB8fCAocGxhY2VtZW50ID09PSBsZWZ0IHx8IHBsYWNlbWVudCA9PT0gcmlnaHQpICYmIHZhcmlhdGlvbiA9PT0gZW5kKSB7XG4gICAgICBzaWRlWSA9IGJvdHRvbTtcbiAgICAgIHZhciBvZmZzZXRZID0gaXNGaXhlZCAmJiBvZmZzZXRQYXJlbnQgPT09IHdpbiAmJiB3aW4udmlzdWFsVmlld3BvcnQgPyB3aW4udmlzdWFsVmlld3BvcnQuaGVpZ2h0IDogLy8gJEZsb3dGaXhNZVtwcm9wLW1pc3NpbmddXG4gICAgICBvZmZzZXRQYXJlbnRbaGVpZ2h0UHJvcF07XG4gICAgICB5IC09IG9mZnNldFkgLSBwb3BwZXJSZWN0LmhlaWdodDtcbiAgICAgIHkgKj0gZ3B1QWNjZWxlcmF0aW9uID8gMSA6IC0xO1xuICAgIH1cblxuICAgIGlmIChwbGFjZW1lbnQgPT09IGxlZnQgfHwgKHBsYWNlbWVudCA9PT0gdG9wIHx8IHBsYWNlbWVudCA9PT0gYm90dG9tKSAmJiB2YXJpYXRpb24gPT09IGVuZCkge1xuICAgICAgc2lkZVggPSByaWdodDtcbiAgICAgIHZhciBvZmZzZXRYID0gaXNGaXhlZCAmJiBvZmZzZXRQYXJlbnQgPT09IHdpbiAmJiB3aW4udmlzdWFsVmlld3BvcnQgPyB3aW4udmlzdWFsVmlld3BvcnQud2lkdGggOiAvLyAkRmxvd0ZpeE1lW3Byb3AtbWlzc2luZ11cbiAgICAgIG9mZnNldFBhcmVudFt3aWR0aFByb3BdO1xuICAgICAgeCAtPSBvZmZzZXRYIC0gcG9wcGVyUmVjdC53aWR0aDtcbiAgICAgIHggKj0gZ3B1QWNjZWxlcmF0aW9uID8gMSA6IC0xO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjb21tb25TdHlsZXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICBwb3NpdGlvbjogcG9zaXRpb25cbiAgfSwgYWRhcHRpdmUgJiYgdW5zZXRTaWRlcyk7XG5cbiAgdmFyIF9yZWY0ID0gcm91bmRPZmZzZXRzID09PSB0cnVlID8gcm91bmRPZmZzZXRzQnlEUFIoe1xuICAgIHg6IHgsXG4gICAgeTogeVxuICB9LCBnZXRXaW5kb3cocG9wcGVyKSkgOiB7XG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH07XG5cbiAgeCA9IF9yZWY0Lng7XG4gIHkgPSBfcmVmNC55O1xuXG4gIGlmIChncHVBY2NlbGVyYXRpb24pIHtcbiAgICB2YXIgX09iamVjdCRhc3NpZ247XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uU3R5bGVzLCAoX09iamVjdCRhc3NpZ24gPSB7fSwgX09iamVjdCRhc3NpZ25bc2lkZVldID0gaGFzWSA/ICcwJyA6ICcnLCBfT2JqZWN0JGFzc2lnbltzaWRlWF0gPSBoYXNYID8gJzAnIDogJycsIF9PYmplY3QkYXNzaWduLnRyYW5zZm9ybSA9ICh3aW4uZGV2aWNlUGl4ZWxSYXRpbyB8fCAxKSA8PSAxID8gXCJ0cmFuc2xhdGUoXCIgKyB4ICsgXCJweCwgXCIgKyB5ICsgXCJweClcIiA6IFwidHJhbnNsYXRlM2QoXCIgKyB4ICsgXCJweCwgXCIgKyB5ICsgXCJweCwgMClcIiwgX09iamVjdCRhc3NpZ24pKTtcbiAgfVxuXG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25TdHlsZXMsIChfT2JqZWN0JGFzc2lnbjIgPSB7fSwgX09iamVjdCRhc3NpZ24yW3NpZGVZXSA9IGhhc1kgPyB5ICsgXCJweFwiIDogJycsIF9PYmplY3QkYXNzaWduMltzaWRlWF0gPSBoYXNYID8geCArIFwicHhcIiA6ICcnLCBfT2JqZWN0JGFzc2lnbjIudHJhbnNmb3JtID0gJycsIF9PYmplY3QkYXNzaWduMikpO1xufVxuXG5mdW5jdGlvbiBjb21wdXRlU3R5bGVzKF9yZWY1KSB7XG4gIHZhciBzdGF0ZSA9IF9yZWY1LnN0YXRlLFxuICAgICAgb3B0aW9ucyA9IF9yZWY1Lm9wdGlvbnM7XG4gIHZhciBfb3B0aW9ucyRncHVBY2NlbGVyYXQgPSBvcHRpb25zLmdwdUFjY2VsZXJhdGlvbixcbiAgICAgIGdwdUFjY2VsZXJhdGlvbiA9IF9vcHRpb25zJGdwdUFjY2VsZXJhdCA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJGdwdUFjY2VsZXJhdCxcbiAgICAgIF9vcHRpb25zJGFkYXB0aXZlID0gb3B0aW9ucy5hZGFwdGl2ZSxcbiAgICAgIGFkYXB0aXZlID0gX29wdGlvbnMkYWRhcHRpdmUgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRhZGFwdGl2ZSxcbiAgICAgIF9vcHRpb25zJHJvdW5kT2Zmc2V0cyA9IG9wdGlvbnMucm91bmRPZmZzZXRzLFxuICAgICAgcm91bmRPZmZzZXRzID0gX29wdGlvbnMkcm91bmRPZmZzZXRzID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkcm91bmRPZmZzZXRzO1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICB2YXIgdHJhbnNpdGlvblByb3BlcnR5ID0gZ2V0Q29tcHV0ZWRTdHlsZShzdGF0ZS5lbGVtZW50cy5wb3BwZXIpLnRyYW5zaXRpb25Qcm9wZXJ0eSB8fCAnJztcblxuICAgIGlmIChhZGFwdGl2ZSAmJiBbJ3RyYW5zZm9ybScsICd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnXS5zb21lKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgcmV0dXJuIHRyYW5zaXRpb25Qcm9wZXJ0eS5pbmRleE9mKHByb3BlcnR5KSA+PSAwO1xuICAgIH0pKSB7XG4gICAgICBjb25zb2xlLndhcm4oWydQb3BwZXI6IERldGVjdGVkIENTUyB0cmFuc2l0aW9ucyBvbiBhdCBsZWFzdCBvbmUgb2YgdGhlIGZvbGxvd2luZycsICdDU1MgcHJvcGVydGllczogXCJ0cmFuc2Zvcm1cIiwgXCJ0b3BcIiwgXCJyaWdodFwiLCBcImJvdHRvbVwiLCBcImxlZnRcIi4nLCAnXFxuXFxuJywgJ0Rpc2FibGUgdGhlIFwiY29tcHV0ZVN0eWxlc1wiIG1vZGlmaWVyXFwncyBgYWRhcHRpdmVgIG9wdGlvbiB0byBhbGxvdycsICdmb3Igc21vb3RoIHRyYW5zaXRpb25zLCBvciByZW1vdmUgdGhlc2UgcHJvcGVydGllcyBmcm9tIHRoZSBDU1MnLCAndHJhbnNpdGlvbiBkZWNsYXJhdGlvbiBvbiB0aGUgcG9wcGVyIGVsZW1lbnQgaWYgb25seSB0cmFuc2l0aW9uaW5nJywgJ29wYWNpdHkgb3IgYmFja2dyb3VuZC1jb2xvciBmb3IgZXhhbXBsZS4nLCAnXFxuXFxuJywgJ1dlIHJlY29tbWVuZCB1c2luZyB0aGUgcG9wcGVyIGVsZW1lbnQgYXMgYSB3cmFwcGVyIGFyb3VuZCBhbiBpbm5lcicsICdlbGVtZW50IHRoYXQgY2FuIGhhdmUgYW55IENTUyBwcm9wZXJ0eSB0cmFuc2l0aW9uZWQgZm9yIGFuaW1hdGlvbnMuJ10uam9pbignICcpKTtcbiAgICB9XG4gIH1cblxuICB2YXIgY29tbW9uU3R5bGVzID0ge1xuICAgIHBsYWNlbWVudDogZ2V0QmFzZVBsYWNlbWVudChzdGF0ZS5wbGFjZW1lbnQpLFxuICAgIHZhcmlhdGlvbjogZ2V0VmFyaWF0aW9uKHN0YXRlLnBsYWNlbWVudCksXG4gICAgcG9wcGVyOiBzdGF0ZS5lbGVtZW50cy5wb3BwZXIsXG4gICAgcG9wcGVyUmVjdDogc3RhdGUucmVjdHMucG9wcGVyLFxuICAgIGdwdUFjY2VsZXJhdGlvbjogZ3B1QWNjZWxlcmF0aW9uLFxuICAgIGlzRml4ZWQ6IHN0YXRlLm9wdGlvbnMuc3RyYXRlZ3kgPT09ICdmaXhlZCdcbiAgfTtcblxuICBpZiAoc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzICE9IG51bGwpIHtcbiAgICBzdGF0ZS5zdHlsZXMucG9wcGVyID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuc3R5bGVzLnBvcHBlciwgbWFwVG9TdHlsZXMoT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uU3R5bGVzLCB7XG4gICAgICBvZmZzZXRzOiBzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHMsXG4gICAgICBwb3NpdGlvbjogc3RhdGUub3B0aW9ucy5zdHJhdGVneSxcbiAgICAgIGFkYXB0aXZlOiBhZGFwdGl2ZSxcbiAgICAgIHJvdW5kT2Zmc2V0czogcm91bmRPZmZzZXRzXG4gICAgfSkpKTtcbiAgfVxuXG4gIGlmIChzdGF0ZS5tb2RpZmllcnNEYXRhLmFycm93ICE9IG51bGwpIHtcbiAgICBzdGF0ZS5zdHlsZXMuYXJyb3cgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5zdHlsZXMuYXJyb3csIG1hcFRvU3R5bGVzKE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblN0eWxlcywge1xuICAgICAgb2Zmc2V0czogc3RhdGUubW9kaWZpZXJzRGF0YS5hcnJvdyxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgYWRhcHRpdmU6IGZhbHNlLFxuICAgICAgcm91bmRPZmZzZXRzOiByb3VuZE9mZnNldHNcbiAgICB9KSkpO1xuICB9XG5cbiAgc3RhdGUuYXR0cmlidXRlcy5wb3BwZXIgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5hdHRyaWJ1dGVzLnBvcHBlciwge1xuICAgICdkYXRhLXBvcHBlci1wbGFjZW1lbnQnOiBzdGF0ZS5wbGFjZW1lbnRcbiAgfSk7XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdjb21wdXRlU3R5bGVzJyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICdiZWZvcmVXcml0ZScsXG4gIGZuOiBjb21wdXRlU3R5bGVzLFxuICBkYXRhOiB7fVxufTsiLCJpbXBvcnQgZ2V0V2luZG93IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0V2luZG93LmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxudmFyIHBhc3NpdmUgPSB7XG4gIHBhc3NpdmU6IHRydWVcbn07XG5cbmZ1bmN0aW9uIGVmZmVjdChfcmVmKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYuc3RhdGUsXG4gICAgICBpbnN0YW5jZSA9IF9yZWYuaW5zdGFuY2UsXG4gICAgICBvcHRpb25zID0gX3JlZi5vcHRpb25zO1xuICB2YXIgX29wdGlvbnMkc2Nyb2xsID0gb3B0aW9ucy5zY3JvbGwsXG4gICAgICBzY3JvbGwgPSBfb3B0aW9ucyRzY3JvbGwgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRzY3JvbGwsXG4gICAgICBfb3B0aW9ucyRyZXNpemUgPSBvcHRpb25zLnJlc2l6ZSxcbiAgICAgIHJlc2l6ZSA9IF9vcHRpb25zJHJlc2l6ZSA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJHJlc2l6ZTtcbiAgdmFyIHdpbmRvdyA9IGdldFdpbmRvdyhzdGF0ZS5lbGVtZW50cy5wb3BwZXIpO1xuICB2YXIgc2Nyb2xsUGFyZW50cyA9IFtdLmNvbmNhdChzdGF0ZS5zY3JvbGxQYXJlbnRzLnJlZmVyZW5jZSwgc3RhdGUuc2Nyb2xsUGFyZW50cy5wb3BwZXIpO1xuXG4gIGlmIChzY3JvbGwpIHtcbiAgICBzY3JvbGxQYXJlbnRzLmZvckVhY2goZnVuY3Rpb24gKHNjcm9sbFBhcmVudCkge1xuICAgICAgc2Nyb2xsUGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGluc3RhbmNlLnVwZGF0ZSwgcGFzc2l2ZSk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAocmVzaXplKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGluc3RhbmNlLnVwZGF0ZSwgcGFzc2l2ZSk7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGlmIChzY3JvbGwpIHtcbiAgICAgIHNjcm9sbFBhcmVudHMuZm9yRWFjaChmdW5jdGlvbiAoc2Nyb2xsUGFyZW50KSB7XG4gICAgICAgIHNjcm9sbFBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBpbnN0YW5jZS51cGRhdGUsIHBhc3NpdmUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJlc2l6ZSkge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGluc3RhbmNlLnVwZGF0ZSwgcGFzc2l2ZSk7XG4gICAgfVxuICB9O1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnZXZlbnRMaXN0ZW5lcnMnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ3dyaXRlJyxcbiAgZm46IGZ1bmN0aW9uIGZuKCkge30sXG4gIGVmZmVjdDogZWZmZWN0LFxuICBkYXRhOiB7fVxufTsiLCJpbXBvcnQgZ2V0T3Bwb3NpdGVQbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldE9wcG9zaXRlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0QmFzZVBsYWNlbWVudCBmcm9tIFwiLi4vdXRpbHMvZ2V0QmFzZVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IGdldE9wcG9zaXRlVmFyaWF0aW9uUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRPcHBvc2l0ZVZhcmlhdGlvblBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IGRldGVjdE92ZXJmbG93IGZyb20gXCIuLi91dGlscy9kZXRlY3RPdmVyZmxvdy5qc1wiO1xuaW1wb3J0IGNvbXB1dGVBdXRvUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9jb21wdXRlQXV0b1BsYWNlbWVudC5qc1wiO1xuaW1wb3J0IHsgYm90dG9tLCB0b3AsIHN0YXJ0LCByaWdodCwgbGVmdCwgYXV0byB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IGdldFZhcmlhdGlvbiBmcm9tIFwiLi4vdXRpbHMvZ2V0VmFyaWF0aW9uLmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZnVuY3Rpb24gZ2V0RXhwYW5kZWRGYWxsYmFja1BsYWNlbWVudHMocGxhY2VtZW50KSB7XG4gIGlmIChnZXRCYXNlUGxhY2VtZW50KHBsYWNlbWVudCkgPT09IGF1dG8pIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICB2YXIgb3Bwb3NpdGVQbGFjZW1lbnQgPSBnZXRPcHBvc2l0ZVBsYWNlbWVudChwbGFjZW1lbnQpO1xuICByZXR1cm4gW2dldE9wcG9zaXRlVmFyaWF0aW9uUGxhY2VtZW50KHBsYWNlbWVudCksIG9wcG9zaXRlUGxhY2VtZW50LCBnZXRPcHBvc2l0ZVZhcmlhdGlvblBsYWNlbWVudChvcHBvc2l0ZVBsYWNlbWVudCldO1xufVxuXG5mdW5jdGlvbiBmbGlwKF9yZWYpIHtcbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmLm9wdGlvbnMsXG4gICAgICBuYW1lID0gX3JlZi5uYW1lO1xuXG4gIGlmIChzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdLl9za2lwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIF9vcHRpb25zJG1haW5BeGlzID0gb3B0aW9ucy5tYWluQXhpcyxcbiAgICAgIGNoZWNrTWFpbkF4aXMgPSBfb3B0aW9ucyRtYWluQXhpcyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJG1haW5BeGlzLFxuICAgICAgX29wdGlvbnMkYWx0QXhpcyA9IG9wdGlvbnMuYWx0QXhpcyxcbiAgICAgIGNoZWNrQWx0QXhpcyA9IF9vcHRpb25zJGFsdEF4aXMgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRhbHRBeGlzLFxuICAgICAgc3BlY2lmaWVkRmFsbGJhY2tQbGFjZW1lbnRzID0gb3B0aW9ucy5mYWxsYmFja1BsYWNlbWVudHMsXG4gICAgICBwYWRkaW5nID0gb3B0aW9ucy5wYWRkaW5nLFxuICAgICAgYm91bmRhcnkgPSBvcHRpb25zLmJvdW5kYXJ5LFxuICAgICAgcm9vdEJvdW5kYXJ5ID0gb3B0aW9ucy5yb290Qm91bmRhcnksXG4gICAgICBhbHRCb3VuZGFyeSA9IG9wdGlvbnMuYWx0Qm91bmRhcnksXG4gICAgICBfb3B0aW9ucyRmbGlwVmFyaWF0aW8gPSBvcHRpb25zLmZsaXBWYXJpYXRpb25zLFxuICAgICAgZmxpcFZhcmlhdGlvbnMgPSBfb3B0aW9ucyRmbGlwVmFyaWF0aW8gPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRmbGlwVmFyaWF0aW8sXG4gICAgICBhbGxvd2VkQXV0b1BsYWNlbWVudHMgPSBvcHRpb25zLmFsbG93ZWRBdXRvUGxhY2VtZW50cztcbiAgdmFyIHByZWZlcnJlZFBsYWNlbWVudCA9IHN0YXRlLm9wdGlvbnMucGxhY2VtZW50O1xuICB2YXIgYmFzZVBsYWNlbWVudCA9IGdldEJhc2VQbGFjZW1lbnQocHJlZmVycmVkUGxhY2VtZW50KTtcbiAgdmFyIGlzQmFzZVBsYWNlbWVudCA9IGJhc2VQbGFjZW1lbnQgPT09IHByZWZlcnJlZFBsYWNlbWVudDtcbiAgdmFyIGZhbGxiYWNrUGxhY2VtZW50cyA9IHNwZWNpZmllZEZhbGxiYWNrUGxhY2VtZW50cyB8fCAoaXNCYXNlUGxhY2VtZW50IHx8ICFmbGlwVmFyaWF0aW9ucyA/IFtnZXRPcHBvc2l0ZVBsYWNlbWVudChwcmVmZXJyZWRQbGFjZW1lbnQpXSA6IGdldEV4cGFuZGVkRmFsbGJhY2tQbGFjZW1lbnRzKHByZWZlcnJlZFBsYWNlbWVudCkpO1xuICB2YXIgcGxhY2VtZW50cyA9IFtwcmVmZXJyZWRQbGFjZW1lbnRdLmNvbmNhdChmYWxsYmFja1BsYWNlbWVudHMpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgICByZXR1cm4gYWNjLmNvbmNhdChnZXRCYXNlUGxhY2VtZW50KHBsYWNlbWVudCkgPT09IGF1dG8gPyBjb21wdXRlQXV0b1BsYWNlbWVudChzdGF0ZSwge1xuICAgICAgcGxhY2VtZW50OiBwbGFjZW1lbnQsXG4gICAgICBib3VuZGFyeTogYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnk6IHJvb3RCb3VuZGFyeSxcbiAgICAgIHBhZGRpbmc6IHBhZGRpbmcsXG4gICAgICBmbGlwVmFyaWF0aW9uczogZmxpcFZhcmlhdGlvbnMsXG4gICAgICBhbGxvd2VkQXV0b1BsYWNlbWVudHM6IGFsbG93ZWRBdXRvUGxhY2VtZW50c1xuICAgIH0pIDogcGxhY2VtZW50KTtcbiAgfSwgW10pO1xuICB2YXIgcmVmZXJlbmNlUmVjdCA9IHN0YXRlLnJlY3RzLnJlZmVyZW5jZTtcbiAgdmFyIHBvcHBlclJlY3QgPSBzdGF0ZS5yZWN0cy5wb3BwZXI7XG4gIHZhciBjaGVja3NNYXAgPSBuZXcgTWFwKCk7XG4gIHZhciBtYWtlRmFsbGJhY2tDaGVja3MgPSB0cnVlO1xuICB2YXIgZmlyc3RGaXR0aW5nUGxhY2VtZW50ID0gcGxhY2VtZW50c1swXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHBsYWNlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgcGxhY2VtZW50ID0gcGxhY2VtZW50c1tpXTtcblxuICAgIHZhciBfYmFzZVBsYWNlbWVudCA9IGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KTtcblxuICAgIHZhciBpc1N0YXJ0VmFyaWF0aW9uID0gZ2V0VmFyaWF0aW9uKHBsYWNlbWVudCkgPT09IHN0YXJ0O1xuICAgIHZhciBpc1ZlcnRpY2FsID0gW3RvcCwgYm90dG9tXS5pbmRleE9mKF9iYXNlUGxhY2VtZW50KSA+PSAwO1xuICAgIHZhciBsZW4gPSBpc1ZlcnRpY2FsID8gJ3dpZHRoJyA6ICdoZWlnaHQnO1xuICAgIHZhciBvdmVyZmxvdyA9IGRldGVjdE92ZXJmbG93KHN0YXRlLCB7XG4gICAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudCxcbiAgICAgIGJvdW5kYXJ5OiBib3VuZGFyeSxcbiAgICAgIHJvb3RCb3VuZGFyeTogcm9vdEJvdW5kYXJ5LFxuICAgICAgYWx0Qm91bmRhcnk6IGFsdEJvdW5kYXJ5LFxuICAgICAgcGFkZGluZzogcGFkZGluZ1xuICAgIH0pO1xuICAgIHZhciBtYWluVmFyaWF0aW9uU2lkZSA9IGlzVmVydGljYWwgPyBpc1N0YXJ0VmFyaWF0aW9uID8gcmlnaHQgOiBsZWZ0IDogaXNTdGFydFZhcmlhdGlvbiA/IGJvdHRvbSA6IHRvcDtcblxuICAgIGlmIChyZWZlcmVuY2VSZWN0W2xlbl0gPiBwb3BwZXJSZWN0W2xlbl0pIHtcbiAgICAgIG1haW5WYXJpYXRpb25TaWRlID0gZ2V0T3Bwb3NpdGVQbGFjZW1lbnQobWFpblZhcmlhdGlvblNpZGUpO1xuICAgIH1cblxuICAgIHZhciBhbHRWYXJpYXRpb25TaWRlID0gZ2V0T3Bwb3NpdGVQbGFjZW1lbnQobWFpblZhcmlhdGlvblNpZGUpO1xuICAgIHZhciBjaGVja3MgPSBbXTtcblxuICAgIGlmIChjaGVja01haW5BeGlzKSB7XG4gICAgICBjaGVja3MucHVzaChvdmVyZmxvd1tfYmFzZVBsYWNlbWVudF0gPD0gMCk7XG4gICAgfVxuXG4gICAgaWYgKGNoZWNrQWx0QXhpcykge1xuICAgICAgY2hlY2tzLnB1c2gob3ZlcmZsb3dbbWFpblZhcmlhdGlvblNpZGVdIDw9IDAsIG92ZXJmbG93W2FsdFZhcmlhdGlvblNpZGVdIDw9IDApO1xuICAgIH1cblxuICAgIGlmIChjaGVja3MuZXZlcnkoZnVuY3Rpb24gKGNoZWNrKSB7XG4gICAgICByZXR1cm4gY2hlY2s7XG4gICAgfSkpIHtcbiAgICAgIGZpcnN0Rml0dGluZ1BsYWNlbWVudCA9IHBsYWNlbWVudDtcbiAgICAgIG1ha2VGYWxsYmFja0NoZWNrcyA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY2hlY2tzTWFwLnNldChwbGFjZW1lbnQsIGNoZWNrcyk7XG4gIH1cblxuICBpZiAobWFrZUZhbGxiYWNrQ2hlY2tzKSB7XG4gICAgLy8gYDJgIG1heSBiZSBkZXNpcmVkIGluIHNvbWUgY2FzZXMg4oCTIHJlc2VhcmNoIGxhdGVyXG4gICAgdmFyIG51bWJlck9mQ2hlY2tzID0gZmxpcFZhcmlhdGlvbnMgPyAzIDogMTtcblxuICAgIHZhciBfbG9vcCA9IGZ1bmN0aW9uIF9sb29wKF9pKSB7XG4gICAgICB2YXIgZml0dGluZ1BsYWNlbWVudCA9IHBsYWNlbWVudHMuZmluZChmdW5jdGlvbiAocGxhY2VtZW50KSB7XG4gICAgICAgIHZhciBjaGVja3MgPSBjaGVja3NNYXAuZ2V0KHBsYWNlbWVudCk7XG5cbiAgICAgICAgaWYgKGNoZWNrcykge1xuICAgICAgICAgIHJldHVybiBjaGVja3Muc2xpY2UoMCwgX2kpLmV2ZXJ5KGZ1bmN0aW9uIChjaGVjaykge1xuICAgICAgICAgICAgcmV0dXJuIGNoZWNrO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKGZpdHRpbmdQbGFjZW1lbnQpIHtcbiAgICAgICAgZmlyc3RGaXR0aW5nUGxhY2VtZW50ID0gZml0dGluZ1BsYWNlbWVudDtcbiAgICAgICAgcmV0dXJuIFwiYnJlYWtcIjtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZm9yICh2YXIgX2kgPSBudW1iZXJPZkNoZWNrczsgX2kgPiAwOyBfaS0tKSB7XG4gICAgICB2YXIgX3JldCA9IF9sb29wKF9pKTtcblxuICAgICAgaWYgKF9yZXQgPT09IFwiYnJlYWtcIikgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXRlLnBsYWNlbWVudCAhPT0gZmlyc3RGaXR0aW5nUGxhY2VtZW50KSB7XG4gICAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXS5fc2tpcCA9IHRydWU7XG4gICAgc3RhdGUucGxhY2VtZW50ID0gZmlyc3RGaXR0aW5nUGxhY2VtZW50O1xuICAgIHN0YXRlLnJlc2V0ID0gdHJ1ZTtcbiAgfVxufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnZmxpcCcsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnbWFpbicsXG4gIGZuOiBmbGlwLFxuICByZXF1aXJlc0lmRXhpc3RzOiBbJ29mZnNldCddLFxuICBkYXRhOiB7XG4gICAgX3NraXA6IGZhbHNlXG4gIH1cbn07IiwiaW1wb3J0IHsgdG9wLCBib3R0b20sIGxlZnQsIHJpZ2h0IH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG5pbXBvcnQgZGV0ZWN0T3ZlcmZsb3cgZnJvbSBcIi4uL3V0aWxzL2RldGVjdE92ZXJmbG93LmpzXCI7XG5cbmZ1bmN0aW9uIGdldFNpZGVPZmZzZXRzKG92ZXJmbG93LCByZWN0LCBwcmV2ZW50ZWRPZmZzZXRzKSB7XG4gIGlmIChwcmV2ZW50ZWRPZmZzZXRzID09PSB2b2lkIDApIHtcbiAgICBwcmV2ZW50ZWRPZmZzZXRzID0ge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDBcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3A6IG92ZXJmbG93LnRvcCAtIHJlY3QuaGVpZ2h0IC0gcHJldmVudGVkT2Zmc2V0cy55LFxuICAgIHJpZ2h0OiBvdmVyZmxvdy5yaWdodCAtIHJlY3Qud2lkdGggKyBwcmV2ZW50ZWRPZmZzZXRzLngsXG4gICAgYm90dG9tOiBvdmVyZmxvdy5ib3R0b20gLSByZWN0LmhlaWdodCArIHByZXZlbnRlZE9mZnNldHMueSxcbiAgICBsZWZ0OiBvdmVyZmxvdy5sZWZ0IC0gcmVjdC53aWR0aCAtIHByZXZlbnRlZE9mZnNldHMueFxuICB9O1xufVxuXG5mdW5jdGlvbiBpc0FueVNpZGVGdWxseUNsaXBwZWQob3ZlcmZsb3cpIHtcbiAgcmV0dXJuIFt0b3AsIHJpZ2h0LCBib3R0b20sIGxlZnRdLnNvbWUoZnVuY3Rpb24gKHNpZGUpIHtcbiAgICByZXR1cm4gb3ZlcmZsb3dbc2lkZV0gPj0gMDtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGhpZGUoX3JlZikge1xuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlLFxuICAgICAgbmFtZSA9IF9yZWYubmFtZTtcbiAgdmFyIHJlZmVyZW5jZVJlY3QgPSBzdGF0ZS5yZWN0cy5yZWZlcmVuY2U7XG4gIHZhciBwb3BwZXJSZWN0ID0gc3RhdGUucmVjdHMucG9wcGVyO1xuICB2YXIgcHJldmVudGVkT2Zmc2V0cyA9IHN0YXRlLm1vZGlmaWVyc0RhdGEucHJldmVudE92ZXJmbG93O1xuICB2YXIgcmVmZXJlbmNlT3ZlcmZsb3cgPSBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwge1xuICAgIGVsZW1lbnRDb250ZXh0OiAncmVmZXJlbmNlJ1xuICB9KTtcbiAgdmFyIHBvcHBlckFsdE92ZXJmbG93ID0gZGV0ZWN0T3ZlcmZsb3coc3RhdGUsIHtcbiAgICBhbHRCb3VuZGFyeTogdHJ1ZVxuICB9KTtcbiAgdmFyIHJlZmVyZW5jZUNsaXBwaW5nT2Zmc2V0cyA9IGdldFNpZGVPZmZzZXRzKHJlZmVyZW5jZU92ZXJmbG93LCByZWZlcmVuY2VSZWN0KTtcbiAgdmFyIHBvcHBlckVzY2FwZU9mZnNldHMgPSBnZXRTaWRlT2Zmc2V0cyhwb3BwZXJBbHRPdmVyZmxvdywgcG9wcGVyUmVjdCwgcHJldmVudGVkT2Zmc2V0cyk7XG4gIHZhciBpc1JlZmVyZW5jZUhpZGRlbiA9IGlzQW55U2lkZUZ1bGx5Q2xpcHBlZChyZWZlcmVuY2VDbGlwcGluZ09mZnNldHMpO1xuICB2YXIgaGFzUG9wcGVyRXNjYXBlZCA9IGlzQW55U2lkZUZ1bGx5Q2xpcHBlZChwb3BwZXJFc2NhcGVPZmZzZXRzKTtcbiAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IHtcbiAgICByZWZlcmVuY2VDbGlwcGluZ09mZnNldHM6IHJlZmVyZW5jZUNsaXBwaW5nT2Zmc2V0cyxcbiAgICBwb3BwZXJFc2NhcGVPZmZzZXRzOiBwb3BwZXJFc2NhcGVPZmZzZXRzLFxuICAgIGlzUmVmZXJlbmNlSGlkZGVuOiBpc1JlZmVyZW5jZUhpZGRlbixcbiAgICBoYXNQb3BwZXJFc2NhcGVkOiBoYXNQb3BwZXJFc2NhcGVkXG4gIH07XG4gIHN0YXRlLmF0dHJpYnV0ZXMucG9wcGVyID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuYXR0cmlidXRlcy5wb3BwZXIsIHtcbiAgICAnZGF0YS1wb3BwZXItcmVmZXJlbmNlLWhpZGRlbic6IGlzUmVmZXJlbmNlSGlkZGVuLFxuICAgICdkYXRhLXBvcHBlci1lc2NhcGVkJzogaGFzUG9wcGVyRXNjYXBlZFxuICB9KTtcbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ2hpZGUnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ21haW4nLFxuICByZXF1aXJlc0lmRXhpc3RzOiBbJ3ByZXZlbnRPdmVyZmxvdyddLFxuICBmbjogaGlkZVxufTsiLCJleHBvcnQgeyBkZWZhdWx0IGFzIGFwcGx5U3R5bGVzIH0gZnJvbSBcIi4vYXBwbHlTdHlsZXMuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgYXJyb3cgfSBmcm9tIFwiLi9hcnJvdy5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBjb21wdXRlU3R5bGVzIH0gZnJvbSBcIi4vY29tcHV0ZVN0eWxlcy5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBldmVudExpc3RlbmVycyB9IGZyb20gXCIuL2V2ZW50TGlzdGVuZXJzLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGZsaXAgfSBmcm9tIFwiLi9mbGlwLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGhpZGUgfSBmcm9tIFwiLi9oaWRlLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIG9mZnNldCB9IGZyb20gXCIuL29mZnNldC5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBwb3BwZXJPZmZzZXRzIH0gZnJvbSBcIi4vcG9wcGVyT2Zmc2V0cy5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBwcmV2ZW50T3ZlcmZsb3cgfSBmcm9tIFwiLi9wcmV2ZW50T3ZlcmZsb3cuanNcIjsiLCJpbXBvcnQgZ2V0QmFzZVBsYWNlbWVudCBmcm9tIFwiLi4vdXRpbHMvZ2V0QmFzZVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IHsgdG9wLCBsZWZ0LCByaWdodCwgcGxhY2VtZW50cyB9IGZyb20gXCIuLi9lbnVtcy5qc1wiOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbmV4cG9ydCBmdW5jdGlvbiBkaXN0YW5jZUFuZFNraWRkaW5nVG9YWShwbGFjZW1lbnQsIHJlY3RzLCBvZmZzZXQpIHtcbiAgdmFyIGJhc2VQbGFjZW1lbnQgPSBnZXRCYXNlUGxhY2VtZW50KHBsYWNlbWVudCk7XG4gIHZhciBpbnZlcnREaXN0YW5jZSA9IFtsZWZ0LCB0b3BdLmluZGV4T2YoYmFzZVBsYWNlbWVudCkgPj0gMCA/IC0xIDogMTtcblxuICB2YXIgX3JlZiA9IHR5cGVvZiBvZmZzZXQgPT09ICdmdW5jdGlvbicgPyBvZmZzZXQoT2JqZWN0LmFzc2lnbih7fSwgcmVjdHMsIHtcbiAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudFxuICB9KSkgOiBvZmZzZXQsXG4gICAgICBza2lkZGluZyA9IF9yZWZbMF0sXG4gICAgICBkaXN0YW5jZSA9IF9yZWZbMV07XG5cbiAgc2tpZGRpbmcgPSBza2lkZGluZyB8fCAwO1xuICBkaXN0YW5jZSA9IChkaXN0YW5jZSB8fCAwKSAqIGludmVydERpc3RhbmNlO1xuICByZXR1cm4gW2xlZnQsIHJpZ2h0XS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpID49IDAgPyB7XG4gICAgeDogZGlzdGFuY2UsXG4gICAgeTogc2tpZGRpbmdcbiAgfSA6IHtcbiAgICB4OiBza2lkZGluZyxcbiAgICB5OiBkaXN0YW5jZVxuICB9O1xufVxuXG5mdW5jdGlvbiBvZmZzZXQoX3JlZjIpIHtcbiAgdmFyIHN0YXRlID0gX3JlZjIuc3RhdGUsXG4gICAgICBvcHRpb25zID0gX3JlZjIub3B0aW9ucyxcbiAgICAgIG5hbWUgPSBfcmVmMi5uYW1lO1xuICB2YXIgX29wdGlvbnMkb2Zmc2V0ID0gb3B0aW9ucy5vZmZzZXQsXG4gICAgICBvZmZzZXQgPSBfb3B0aW9ucyRvZmZzZXQgPT09IHZvaWQgMCA/IFswLCAwXSA6IF9vcHRpb25zJG9mZnNldDtcbiAgdmFyIGRhdGEgPSBwbGFjZW1lbnRzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgICBhY2NbcGxhY2VtZW50XSA9IGRpc3RhbmNlQW5kU2tpZGRpbmdUb1hZKHBsYWNlbWVudCwgc3RhdGUucmVjdHMsIG9mZnNldCk7XG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xuICB2YXIgX2RhdGEkc3RhdGUkcGxhY2VtZW50ID0gZGF0YVtzdGF0ZS5wbGFjZW1lbnRdLFxuICAgICAgeCA9IF9kYXRhJHN0YXRlJHBsYWNlbWVudC54LFxuICAgICAgeSA9IF9kYXRhJHN0YXRlJHBsYWNlbWVudC55O1xuXG4gIGlmIChzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHMgIT0gbnVsbCkge1xuICAgIHN0YXRlLm1vZGlmaWVyc0RhdGEucG9wcGVyT2Zmc2V0cy54ICs9IHg7XG4gICAgc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzLnkgKz0geTtcbiAgfVxuXG4gIHN0YXRlLm1vZGlmaWVyc0RhdGFbbmFtZV0gPSBkYXRhO1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnb2Zmc2V0JyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICdtYWluJyxcbiAgcmVxdWlyZXM6IFsncG9wcGVyT2Zmc2V0cyddLFxuICBmbjogb2Zmc2V0XG59OyIsImltcG9ydCBjb21wdXRlT2Zmc2V0cyBmcm9tIFwiLi4vdXRpbHMvY29tcHV0ZU9mZnNldHMuanNcIjtcblxuZnVuY3Rpb24gcG9wcGVyT2Zmc2V0cyhfcmVmKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYuc3RhdGUsXG4gICAgICBuYW1lID0gX3JlZi5uYW1lO1xuICAvLyBPZmZzZXRzIGFyZSB0aGUgYWN0dWFsIHBvc2l0aW9uIHRoZSBwb3BwZXIgbmVlZHMgdG8gaGF2ZSB0byBiZVxuICAvLyBwcm9wZXJseSBwb3NpdGlvbmVkIG5lYXIgaXRzIHJlZmVyZW5jZSBlbGVtZW50XG4gIC8vIFRoaXMgaXMgdGhlIG1vc3QgYmFzaWMgcGxhY2VtZW50LCBhbmQgd2lsbCBiZSBhZGp1c3RlZCBieVxuICAvLyB0aGUgbW9kaWZpZXJzIGluIHRoZSBuZXh0IHN0ZXBcbiAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IGNvbXB1dGVPZmZzZXRzKHtcbiAgICByZWZlcmVuY2U6IHN0YXRlLnJlY3RzLnJlZmVyZW5jZSxcbiAgICBlbGVtZW50OiBzdGF0ZS5yZWN0cy5wb3BwZXIsXG4gICAgc3RyYXRlZ3k6ICdhYnNvbHV0ZScsXG4gICAgcGxhY2VtZW50OiBzdGF0ZS5wbGFjZW1lbnRcbiAgfSk7XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdwb3BwZXJPZmZzZXRzJyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICdyZWFkJyxcbiAgZm46IHBvcHBlck9mZnNldHMsXG4gIGRhdGE6IHt9XG59OyIsImltcG9ydCB7IHRvcCwgbGVmdCwgcmlnaHQsIGJvdHRvbSwgc3RhcnQgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0TWFpbkF4aXNGcm9tUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRBbHRBeGlzIGZyb20gXCIuLi91dGlscy9nZXRBbHRBeGlzLmpzXCI7XG5pbXBvcnQgeyB3aXRoaW4sIHdpdGhpbk1heENsYW1wIH0gZnJvbSBcIi4uL3V0aWxzL3dpdGhpbi5qc1wiO1xuaW1wb3J0IGdldExheW91dFJlY3QgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRMYXlvdXRSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0T2Zmc2V0UGFyZW50IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0T2Zmc2V0UGFyZW50LmpzXCI7XG5pbXBvcnQgZGV0ZWN0T3ZlcmZsb3cgZnJvbSBcIi4uL3V0aWxzL2RldGVjdE92ZXJmbG93LmpzXCI7XG5pbXBvcnQgZ2V0VmFyaWF0aW9uIGZyb20gXCIuLi91dGlscy9nZXRWYXJpYXRpb24uanNcIjtcbmltcG9ydCBnZXRGcmVzaFNpZGVPYmplY3QgZnJvbSBcIi4uL3V0aWxzL2dldEZyZXNoU2lkZU9iamVjdC5qc1wiO1xuaW1wb3J0IHsgbWluIGFzIG1hdGhNaW4sIG1heCBhcyBtYXRoTWF4IH0gZnJvbSBcIi4uL3V0aWxzL21hdGguanNcIjtcblxuZnVuY3Rpb24gcHJldmVudE92ZXJmbG93KF9yZWYpIHtcbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmLm9wdGlvbnMsXG4gICAgICBuYW1lID0gX3JlZi5uYW1lO1xuICB2YXIgX29wdGlvbnMkbWFpbkF4aXMgPSBvcHRpb25zLm1haW5BeGlzLFxuICAgICAgY2hlY2tNYWluQXhpcyA9IF9vcHRpb25zJG1haW5BeGlzID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkbWFpbkF4aXMsXG4gICAgICBfb3B0aW9ucyRhbHRBeGlzID0gb3B0aW9ucy5hbHRBeGlzLFxuICAgICAgY2hlY2tBbHRBeGlzID0gX29wdGlvbnMkYWx0QXhpcyA9PT0gdm9pZCAwID8gZmFsc2UgOiBfb3B0aW9ucyRhbHRBeGlzLFxuICAgICAgYm91bmRhcnkgPSBvcHRpb25zLmJvdW5kYXJ5LFxuICAgICAgcm9vdEJvdW5kYXJ5ID0gb3B0aW9ucy5yb290Qm91bmRhcnksXG4gICAgICBhbHRCb3VuZGFyeSA9IG9wdGlvbnMuYWx0Qm91bmRhcnksXG4gICAgICBwYWRkaW5nID0gb3B0aW9ucy5wYWRkaW5nLFxuICAgICAgX29wdGlvbnMkdGV0aGVyID0gb3B0aW9ucy50ZXRoZXIsXG4gICAgICB0ZXRoZXIgPSBfb3B0aW9ucyR0ZXRoZXIgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyR0ZXRoZXIsXG4gICAgICBfb3B0aW9ucyR0ZXRoZXJPZmZzZXQgPSBvcHRpb25zLnRldGhlck9mZnNldCxcbiAgICAgIHRldGhlck9mZnNldCA9IF9vcHRpb25zJHRldGhlck9mZnNldCA9PT0gdm9pZCAwID8gMCA6IF9vcHRpb25zJHRldGhlck9mZnNldDtcbiAgdmFyIG92ZXJmbG93ID0gZGV0ZWN0T3ZlcmZsb3coc3RhdGUsIHtcbiAgICBib3VuZGFyeTogYm91bmRhcnksXG4gICAgcm9vdEJvdW5kYXJ5OiByb290Qm91bmRhcnksXG4gICAgcGFkZGluZzogcGFkZGluZyxcbiAgICBhbHRCb3VuZGFyeTogYWx0Qm91bmRhcnlcbiAgfSk7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gZ2V0QmFzZVBsYWNlbWVudChzdGF0ZS5wbGFjZW1lbnQpO1xuICB2YXIgdmFyaWF0aW9uID0gZ2V0VmFyaWF0aW9uKHN0YXRlLnBsYWNlbWVudCk7XG4gIHZhciBpc0Jhc2VQbGFjZW1lbnQgPSAhdmFyaWF0aW9uO1xuICB2YXIgbWFpbkF4aXMgPSBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQoYmFzZVBsYWNlbWVudCk7XG4gIHZhciBhbHRBeGlzID0gZ2V0QWx0QXhpcyhtYWluQXhpcyk7XG4gIHZhciBwb3BwZXJPZmZzZXRzID0gc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzO1xuICB2YXIgcmVmZXJlbmNlUmVjdCA9IHN0YXRlLnJlY3RzLnJlZmVyZW5jZTtcbiAgdmFyIHBvcHBlclJlY3QgPSBzdGF0ZS5yZWN0cy5wb3BwZXI7XG4gIHZhciB0ZXRoZXJPZmZzZXRWYWx1ZSA9IHR5cGVvZiB0ZXRoZXJPZmZzZXQgPT09ICdmdW5jdGlvbicgPyB0ZXRoZXJPZmZzZXQoT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucmVjdHMsIHtcbiAgICBwbGFjZW1lbnQ6IHN0YXRlLnBsYWNlbWVudFxuICB9KSkgOiB0ZXRoZXJPZmZzZXQ7XG4gIHZhciBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUgPSB0eXBlb2YgdGV0aGVyT2Zmc2V0VmFsdWUgPT09ICdudW1iZXInID8ge1xuICAgIG1haW5BeGlzOiB0ZXRoZXJPZmZzZXRWYWx1ZSxcbiAgICBhbHRBeGlzOiB0ZXRoZXJPZmZzZXRWYWx1ZVxuICB9IDogT2JqZWN0LmFzc2lnbih7XG4gICAgbWFpbkF4aXM6IDAsXG4gICAgYWx0QXhpczogMFxuICB9LCB0ZXRoZXJPZmZzZXRWYWx1ZSk7XG4gIHZhciBvZmZzZXRNb2RpZmllclN0YXRlID0gc3RhdGUubW9kaWZpZXJzRGF0YS5vZmZzZXQgPyBzdGF0ZS5tb2RpZmllcnNEYXRhLm9mZnNldFtzdGF0ZS5wbGFjZW1lbnRdIDogbnVsbDtcbiAgdmFyIGRhdGEgPSB7XG4gICAgeDogMCxcbiAgICB5OiAwXG4gIH07XG5cbiAgaWYgKCFwb3BwZXJPZmZzZXRzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGNoZWNrTWFpbkF4aXMpIHtcbiAgICB2YXIgX29mZnNldE1vZGlmaWVyU3RhdGUkO1xuXG4gICAgdmFyIG1haW5TaWRlID0gbWFpbkF4aXMgPT09ICd5JyA/IHRvcCA6IGxlZnQ7XG4gICAgdmFyIGFsdFNpZGUgPSBtYWluQXhpcyA9PT0gJ3knID8gYm90dG9tIDogcmlnaHQ7XG4gICAgdmFyIGxlbiA9IG1haW5BeGlzID09PSAneScgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG4gICAgdmFyIG9mZnNldCA9IHBvcHBlck9mZnNldHNbbWFpbkF4aXNdO1xuICAgIHZhciBtaW4gPSBvZmZzZXQgKyBvdmVyZmxvd1ttYWluU2lkZV07XG4gICAgdmFyIG1heCA9IG9mZnNldCAtIG92ZXJmbG93W2FsdFNpZGVdO1xuICAgIHZhciBhZGRpdGl2ZSA9IHRldGhlciA/IC1wb3BwZXJSZWN0W2xlbl0gLyAyIDogMDtcbiAgICB2YXIgbWluTGVuID0gdmFyaWF0aW9uID09PSBzdGFydCA/IHJlZmVyZW5jZVJlY3RbbGVuXSA6IHBvcHBlclJlY3RbbGVuXTtcbiAgICB2YXIgbWF4TGVuID0gdmFyaWF0aW9uID09PSBzdGFydCA/IC1wb3BwZXJSZWN0W2xlbl0gOiAtcmVmZXJlbmNlUmVjdFtsZW5dOyAvLyBXZSBuZWVkIHRvIGluY2x1ZGUgdGhlIGFycm93IGluIHRoZSBjYWxjdWxhdGlvbiBzbyB0aGUgYXJyb3cgZG9lc24ndCBnb1xuICAgIC8vIG91dHNpZGUgdGhlIHJlZmVyZW5jZSBib3VuZHNcblxuICAgIHZhciBhcnJvd0VsZW1lbnQgPSBzdGF0ZS5lbGVtZW50cy5hcnJvdztcbiAgICB2YXIgYXJyb3dSZWN0ID0gdGV0aGVyICYmIGFycm93RWxlbWVudCA/IGdldExheW91dFJlY3QoYXJyb3dFbGVtZW50KSA6IHtcbiAgICAgIHdpZHRoOiAwLFxuICAgICAgaGVpZ2h0OiAwXG4gICAgfTtcbiAgICB2YXIgYXJyb3dQYWRkaW5nT2JqZWN0ID0gc3RhdGUubW9kaWZpZXJzRGF0YVsnYXJyb3cjcGVyc2lzdGVudCddID8gc3RhdGUubW9kaWZpZXJzRGF0YVsnYXJyb3cjcGVyc2lzdGVudCddLnBhZGRpbmcgOiBnZXRGcmVzaFNpZGVPYmplY3QoKTtcbiAgICB2YXIgYXJyb3dQYWRkaW5nTWluID0gYXJyb3dQYWRkaW5nT2JqZWN0W21haW5TaWRlXTtcbiAgICB2YXIgYXJyb3dQYWRkaW5nTWF4ID0gYXJyb3dQYWRkaW5nT2JqZWN0W2FsdFNpZGVdOyAvLyBJZiB0aGUgcmVmZXJlbmNlIGxlbmd0aCBpcyBzbWFsbGVyIHRoYW4gdGhlIGFycm93IGxlbmd0aCwgd2UgZG9uJ3Qgd2FudFxuICAgIC8vIHRvIGluY2x1ZGUgaXRzIGZ1bGwgc2l6ZSBpbiB0aGUgY2FsY3VsYXRpb24uIElmIHRoZSByZWZlcmVuY2UgaXMgc21hbGxcbiAgICAvLyBhbmQgbmVhciB0aGUgZWRnZSBvZiBhIGJvdW5kYXJ5LCB0aGUgcG9wcGVyIGNhbiBvdmVyZmxvdyBldmVuIGlmIHRoZVxuICAgIC8vIHJlZmVyZW5jZSBpcyBub3Qgb3ZlcmZsb3dpbmcgYXMgd2VsbCAoZS5nLiB2aXJ0dWFsIGVsZW1lbnRzIHdpdGggbm9cbiAgICAvLyB3aWR0aCBvciBoZWlnaHQpXG5cbiAgICB2YXIgYXJyb3dMZW4gPSB3aXRoaW4oMCwgcmVmZXJlbmNlUmVjdFtsZW5dLCBhcnJvd1JlY3RbbGVuXSk7XG4gICAgdmFyIG1pbk9mZnNldCA9IGlzQmFzZVBsYWNlbWVudCA/IHJlZmVyZW5jZVJlY3RbbGVuXSAvIDIgLSBhZGRpdGl2ZSAtIGFycm93TGVuIC0gYXJyb3dQYWRkaW5nTWluIC0gbm9ybWFsaXplZFRldGhlck9mZnNldFZhbHVlLm1haW5BeGlzIDogbWluTGVuIC0gYXJyb3dMZW4gLSBhcnJvd1BhZGRpbmdNaW4gLSBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUubWFpbkF4aXM7XG4gICAgdmFyIG1heE9mZnNldCA9IGlzQmFzZVBsYWNlbWVudCA/IC1yZWZlcmVuY2VSZWN0W2xlbl0gLyAyICsgYWRkaXRpdmUgKyBhcnJvd0xlbiArIGFycm93UGFkZGluZ01heCArIG5vcm1hbGl6ZWRUZXRoZXJPZmZzZXRWYWx1ZS5tYWluQXhpcyA6IG1heExlbiArIGFycm93TGVuICsgYXJyb3dQYWRkaW5nTWF4ICsgbm9ybWFsaXplZFRldGhlck9mZnNldFZhbHVlLm1haW5BeGlzO1xuICAgIHZhciBhcnJvd09mZnNldFBhcmVudCA9IHN0YXRlLmVsZW1lbnRzLmFycm93ICYmIGdldE9mZnNldFBhcmVudChzdGF0ZS5lbGVtZW50cy5hcnJvdyk7XG4gICAgdmFyIGNsaWVudE9mZnNldCA9IGFycm93T2Zmc2V0UGFyZW50ID8gbWFpbkF4aXMgPT09ICd5JyA/IGFycm93T2Zmc2V0UGFyZW50LmNsaWVudFRvcCB8fCAwIDogYXJyb3dPZmZzZXRQYXJlbnQuY2xpZW50TGVmdCB8fCAwIDogMDtcbiAgICB2YXIgb2Zmc2V0TW9kaWZpZXJWYWx1ZSA9IChfb2Zmc2V0TW9kaWZpZXJTdGF0ZSQgPSBvZmZzZXRNb2RpZmllclN0YXRlID09IG51bGwgPyB2b2lkIDAgOiBvZmZzZXRNb2RpZmllclN0YXRlW21haW5BeGlzXSkgIT0gbnVsbCA/IF9vZmZzZXRNb2RpZmllclN0YXRlJCA6IDA7XG4gICAgdmFyIHRldGhlck1pbiA9IG9mZnNldCArIG1pbk9mZnNldCAtIG9mZnNldE1vZGlmaWVyVmFsdWUgLSBjbGllbnRPZmZzZXQ7XG4gICAgdmFyIHRldGhlck1heCA9IG9mZnNldCArIG1heE9mZnNldCAtIG9mZnNldE1vZGlmaWVyVmFsdWU7XG4gICAgdmFyIHByZXZlbnRlZE9mZnNldCA9IHdpdGhpbih0ZXRoZXIgPyBtYXRoTWluKG1pbiwgdGV0aGVyTWluKSA6IG1pbiwgb2Zmc2V0LCB0ZXRoZXIgPyBtYXRoTWF4KG1heCwgdGV0aGVyTWF4KSA6IG1heCk7XG4gICAgcG9wcGVyT2Zmc2V0c1ttYWluQXhpc10gPSBwcmV2ZW50ZWRPZmZzZXQ7XG4gICAgZGF0YVttYWluQXhpc10gPSBwcmV2ZW50ZWRPZmZzZXQgLSBvZmZzZXQ7XG4gIH1cblxuICBpZiAoY2hlY2tBbHRBeGlzKSB7XG4gICAgdmFyIF9vZmZzZXRNb2RpZmllclN0YXRlJDI7XG5cbiAgICB2YXIgX21haW5TaWRlID0gbWFpbkF4aXMgPT09ICd4JyA/IHRvcCA6IGxlZnQ7XG5cbiAgICB2YXIgX2FsdFNpZGUgPSBtYWluQXhpcyA9PT0gJ3gnID8gYm90dG9tIDogcmlnaHQ7XG5cbiAgICB2YXIgX29mZnNldCA9IHBvcHBlck9mZnNldHNbYWx0QXhpc107XG5cbiAgICB2YXIgX2xlbiA9IGFsdEF4aXMgPT09ICd5JyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcblxuICAgIHZhciBfbWluID0gX29mZnNldCArIG92ZXJmbG93W19tYWluU2lkZV07XG5cbiAgICB2YXIgX21heCA9IF9vZmZzZXQgLSBvdmVyZmxvd1tfYWx0U2lkZV07XG5cbiAgICB2YXIgaXNPcmlnaW5TaWRlID0gW3RvcCwgbGVmdF0uaW5kZXhPZihiYXNlUGxhY2VtZW50KSAhPT0gLTE7XG5cbiAgICB2YXIgX29mZnNldE1vZGlmaWVyVmFsdWUgPSAoX29mZnNldE1vZGlmaWVyU3RhdGUkMiA9IG9mZnNldE1vZGlmaWVyU3RhdGUgPT0gbnVsbCA/IHZvaWQgMCA6IG9mZnNldE1vZGlmaWVyU3RhdGVbYWx0QXhpc10pICE9IG51bGwgPyBfb2Zmc2V0TW9kaWZpZXJTdGF0ZSQyIDogMDtcblxuICAgIHZhciBfdGV0aGVyTWluID0gaXNPcmlnaW5TaWRlID8gX21pbiA6IF9vZmZzZXQgLSByZWZlcmVuY2VSZWN0W19sZW5dIC0gcG9wcGVyUmVjdFtfbGVuXSAtIF9vZmZzZXRNb2RpZmllclZhbHVlICsgbm9ybWFsaXplZFRldGhlck9mZnNldFZhbHVlLmFsdEF4aXM7XG5cbiAgICB2YXIgX3RldGhlck1heCA9IGlzT3JpZ2luU2lkZSA/IF9vZmZzZXQgKyByZWZlcmVuY2VSZWN0W19sZW5dICsgcG9wcGVyUmVjdFtfbGVuXSAtIF9vZmZzZXRNb2RpZmllclZhbHVlIC0gbm9ybWFsaXplZFRldGhlck9mZnNldFZhbHVlLmFsdEF4aXMgOiBfbWF4O1xuXG4gICAgdmFyIF9wcmV2ZW50ZWRPZmZzZXQgPSB0ZXRoZXIgJiYgaXNPcmlnaW5TaWRlID8gd2l0aGluTWF4Q2xhbXAoX3RldGhlck1pbiwgX29mZnNldCwgX3RldGhlck1heCkgOiB3aXRoaW4odGV0aGVyID8gX3RldGhlck1pbiA6IF9taW4sIF9vZmZzZXQsIHRldGhlciA/IF90ZXRoZXJNYXggOiBfbWF4KTtcblxuICAgIHBvcHBlck9mZnNldHNbYWx0QXhpc10gPSBfcHJldmVudGVkT2Zmc2V0O1xuICAgIGRhdGFbYWx0QXhpc10gPSBfcHJldmVudGVkT2Zmc2V0IC0gX29mZnNldDtcbiAgfVxuXG4gIHN0YXRlLm1vZGlmaWVyc0RhdGFbbmFtZV0gPSBkYXRhO1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAncHJldmVudE92ZXJmbG93JyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICdtYWluJyxcbiAgZm46IHByZXZlbnRPdmVyZmxvdyxcbiAgcmVxdWlyZXNJZkV4aXN0czogWydvZmZzZXQnXVxufTsiLCJpbXBvcnQgeyBwb3BwZXJHZW5lcmF0b3IsIGRldGVjdE92ZXJmbG93IH0gZnJvbSBcIi4vY3JlYXRlUG9wcGVyLmpzXCI7XG5pbXBvcnQgZXZlbnRMaXN0ZW5lcnMgZnJvbSBcIi4vbW9kaWZpZXJzL2V2ZW50TGlzdGVuZXJzLmpzXCI7XG5pbXBvcnQgcG9wcGVyT2Zmc2V0cyBmcm9tIFwiLi9tb2RpZmllcnMvcG9wcGVyT2Zmc2V0cy5qc1wiO1xuaW1wb3J0IGNvbXB1dGVTdHlsZXMgZnJvbSBcIi4vbW9kaWZpZXJzL2NvbXB1dGVTdHlsZXMuanNcIjtcbmltcG9ydCBhcHBseVN0eWxlcyBmcm9tIFwiLi9tb2RpZmllcnMvYXBwbHlTdHlsZXMuanNcIjtcbnZhciBkZWZhdWx0TW9kaWZpZXJzID0gW2V2ZW50TGlzdGVuZXJzLCBwb3BwZXJPZmZzZXRzLCBjb21wdXRlU3R5bGVzLCBhcHBseVN0eWxlc107XG52YXIgY3JlYXRlUG9wcGVyID0gLyojX19QVVJFX18qL3BvcHBlckdlbmVyYXRvcih7XG4gIGRlZmF1bHRNb2RpZmllcnM6IGRlZmF1bHRNb2RpZmllcnNcbn0pOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbmV4cG9ydCB7IGNyZWF0ZVBvcHBlciwgcG9wcGVyR2VuZXJhdG9yLCBkZWZhdWx0TW9kaWZpZXJzLCBkZXRlY3RPdmVyZmxvdyB9OyIsImltcG9ydCB7IHBvcHBlckdlbmVyYXRvciwgZGV0ZWN0T3ZlcmZsb3cgfSBmcm9tIFwiLi9jcmVhdGVQb3BwZXIuanNcIjtcbmltcG9ydCBldmVudExpc3RlbmVycyBmcm9tIFwiLi9tb2RpZmllcnMvZXZlbnRMaXN0ZW5lcnMuanNcIjtcbmltcG9ydCBwb3BwZXJPZmZzZXRzIGZyb20gXCIuL21vZGlmaWVycy9wb3BwZXJPZmZzZXRzLmpzXCI7XG5pbXBvcnQgY29tcHV0ZVN0eWxlcyBmcm9tIFwiLi9tb2RpZmllcnMvY29tcHV0ZVN0eWxlcy5qc1wiO1xuaW1wb3J0IGFwcGx5U3R5bGVzIGZyb20gXCIuL21vZGlmaWVycy9hcHBseVN0eWxlcy5qc1wiO1xuaW1wb3J0IG9mZnNldCBmcm9tIFwiLi9tb2RpZmllcnMvb2Zmc2V0LmpzXCI7XG5pbXBvcnQgZmxpcCBmcm9tIFwiLi9tb2RpZmllcnMvZmxpcC5qc1wiO1xuaW1wb3J0IHByZXZlbnRPdmVyZmxvdyBmcm9tIFwiLi9tb2RpZmllcnMvcHJldmVudE92ZXJmbG93LmpzXCI7XG5pbXBvcnQgYXJyb3cgZnJvbSBcIi4vbW9kaWZpZXJzL2Fycm93LmpzXCI7XG5pbXBvcnQgaGlkZSBmcm9tIFwiLi9tb2RpZmllcnMvaGlkZS5qc1wiO1xudmFyIGRlZmF1bHRNb2RpZmllcnMgPSBbZXZlbnRMaXN0ZW5lcnMsIHBvcHBlck9mZnNldHMsIGNvbXB1dGVTdHlsZXMsIGFwcGx5U3R5bGVzLCBvZmZzZXQsIGZsaXAsIHByZXZlbnRPdmVyZmxvdywgYXJyb3csIGhpZGVdO1xudmFyIGNyZWF0ZVBvcHBlciA9IC8qI19fUFVSRV9fKi9wb3BwZXJHZW5lcmF0b3Ioe1xuICBkZWZhdWx0TW9kaWZpZXJzOiBkZWZhdWx0TW9kaWZpZXJzXG59KTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgeyBjcmVhdGVQb3BwZXIsIHBvcHBlckdlbmVyYXRvciwgZGVmYXVsdE1vZGlmaWVycywgZGV0ZWN0T3ZlcmZsb3cgfTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgeyBjcmVhdGVQb3BwZXIgYXMgY3JlYXRlUG9wcGVyTGl0ZSB9IGZyb20gXCIuL3BvcHBlci1saXRlLmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZXhwb3J0ICogZnJvbSBcIi4vbW9kaWZpZXJzL2luZGV4LmpzXCI7IiwiaW1wb3J0IGdldFZhcmlhdGlvbiBmcm9tIFwiLi9nZXRWYXJpYXRpb24uanNcIjtcbmltcG9ydCB7IHZhcmlhdGlvblBsYWNlbWVudHMsIGJhc2VQbGFjZW1lbnRzLCBwbGFjZW1lbnRzIGFzIGFsbFBsYWNlbWVudHMgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCBkZXRlY3RPdmVyZmxvdyBmcm9tIFwiLi9kZXRlY3RPdmVyZmxvdy5qc1wiO1xuaW1wb3J0IGdldEJhc2VQbGFjZW1lbnQgZnJvbSBcIi4vZ2V0QmFzZVBsYWNlbWVudC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tcHV0ZUF1dG9QbGFjZW1lbnQoc3RhdGUsIG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIHZhciBfb3B0aW9ucyA9IG9wdGlvbnMsXG4gICAgICBwbGFjZW1lbnQgPSBfb3B0aW9ucy5wbGFjZW1lbnQsXG4gICAgICBib3VuZGFyeSA9IF9vcHRpb25zLmJvdW5kYXJ5LFxuICAgICAgcm9vdEJvdW5kYXJ5ID0gX29wdGlvbnMucm9vdEJvdW5kYXJ5LFxuICAgICAgcGFkZGluZyA9IF9vcHRpb25zLnBhZGRpbmcsXG4gICAgICBmbGlwVmFyaWF0aW9ucyA9IF9vcHRpb25zLmZsaXBWYXJpYXRpb25zLFxuICAgICAgX29wdGlvbnMkYWxsb3dlZEF1dG9QID0gX29wdGlvbnMuYWxsb3dlZEF1dG9QbGFjZW1lbnRzLFxuICAgICAgYWxsb3dlZEF1dG9QbGFjZW1lbnRzID0gX29wdGlvbnMkYWxsb3dlZEF1dG9QID09PSB2b2lkIDAgPyBhbGxQbGFjZW1lbnRzIDogX29wdGlvbnMkYWxsb3dlZEF1dG9QO1xuICB2YXIgdmFyaWF0aW9uID0gZ2V0VmFyaWF0aW9uKHBsYWNlbWVudCk7XG4gIHZhciBwbGFjZW1lbnRzID0gdmFyaWF0aW9uID8gZmxpcFZhcmlhdGlvbnMgPyB2YXJpYXRpb25QbGFjZW1lbnRzIDogdmFyaWF0aW9uUGxhY2VtZW50cy5maWx0ZXIoZnVuY3Rpb24gKHBsYWNlbWVudCkge1xuICAgIHJldHVybiBnZXRWYXJpYXRpb24ocGxhY2VtZW50KSA9PT0gdmFyaWF0aW9uO1xuICB9KSA6IGJhc2VQbGFjZW1lbnRzO1xuICB2YXIgYWxsb3dlZFBsYWNlbWVudHMgPSBwbGFjZW1lbnRzLmZpbHRlcihmdW5jdGlvbiAocGxhY2VtZW50KSB7XG4gICAgcmV0dXJuIGFsbG93ZWRBdXRvUGxhY2VtZW50cy5pbmRleE9mKHBsYWNlbWVudCkgPj0gMDtcbiAgfSk7XG5cbiAgaWYgKGFsbG93ZWRQbGFjZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGFsbG93ZWRQbGFjZW1lbnRzID0gcGxhY2VtZW50cztcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoWydQb3BwZXI6IFRoZSBgYWxsb3dlZEF1dG9QbGFjZW1lbnRzYCBvcHRpb24gZGlkIG5vdCBhbGxvdyBhbnknLCAncGxhY2VtZW50cy4gRW5zdXJlIHRoZSBgcGxhY2VtZW50YCBvcHRpb24gbWF0Y2hlcyB0aGUgdmFyaWF0aW9uJywgJ29mIHRoZSBhbGxvd2VkIHBsYWNlbWVudHMuJywgJ0ZvciBleGFtcGxlLCBcImF1dG9cIiBjYW5ub3QgYmUgdXNlZCB0byBhbGxvdyBcImJvdHRvbS1zdGFydFwiLicsICdVc2UgXCJhdXRvLXN0YXJ0XCIgaW5zdGVhZC4nXS5qb2luKCcgJykpO1xuICAgIH1cbiAgfSAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS10eXBlXTogRmxvdyBzZWVtcyB0byBoYXZlIHByb2JsZW1zIHdpdGggdHdvIGFycmF5IHVuaW9ucy4uLlxuXG5cbiAgdmFyIG92ZXJmbG93cyA9IGFsbG93ZWRQbGFjZW1lbnRzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgICBhY2NbcGxhY2VtZW50XSA9IGRldGVjdE92ZXJmbG93KHN0YXRlLCB7XG4gICAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudCxcbiAgICAgIGJvdW5kYXJ5OiBib3VuZGFyeSxcbiAgICAgIHJvb3RCb3VuZGFyeTogcm9vdEJvdW5kYXJ5LFxuICAgICAgcGFkZGluZzogcGFkZGluZ1xuICAgIH0pW2dldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KV07XG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xuICByZXR1cm4gT2JqZWN0LmtleXMob3ZlcmZsb3dzKS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIG92ZXJmbG93c1thXSAtIG92ZXJmbG93c1tiXTtcbiAgfSk7XG59IiwiaW1wb3J0IGdldEJhc2VQbGFjZW1lbnQgZnJvbSBcIi4vZ2V0QmFzZVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IGdldFZhcmlhdGlvbiBmcm9tIFwiLi9nZXRWYXJpYXRpb24uanNcIjtcbmltcG9ydCBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQgZnJvbSBcIi4vZ2V0TWFpbkF4aXNGcm9tUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgeyB0b3AsIHJpZ2h0LCBib3R0b20sIGxlZnQsIHN0YXJ0LCBlbmQgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbXB1dGVPZmZzZXRzKF9yZWYpIHtcbiAgdmFyIHJlZmVyZW5jZSA9IF9yZWYucmVmZXJlbmNlLFxuICAgICAgZWxlbWVudCA9IF9yZWYuZWxlbWVudCxcbiAgICAgIHBsYWNlbWVudCA9IF9yZWYucGxhY2VtZW50O1xuICB2YXIgYmFzZVBsYWNlbWVudCA9IHBsYWNlbWVudCA/IGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KSA6IG51bGw7XG4gIHZhciB2YXJpYXRpb24gPSBwbGFjZW1lbnQgPyBnZXRWYXJpYXRpb24ocGxhY2VtZW50KSA6IG51bGw7XG4gIHZhciBjb21tb25YID0gcmVmZXJlbmNlLnggKyByZWZlcmVuY2Uud2lkdGggLyAyIC0gZWxlbWVudC53aWR0aCAvIDI7XG4gIHZhciBjb21tb25ZID0gcmVmZXJlbmNlLnkgKyByZWZlcmVuY2UuaGVpZ2h0IC8gMiAtIGVsZW1lbnQuaGVpZ2h0IC8gMjtcbiAgdmFyIG9mZnNldHM7XG5cbiAgc3dpdGNoIChiYXNlUGxhY2VtZW50KSB7XG4gICAgY2FzZSB0b3A6XG4gICAgICBvZmZzZXRzID0ge1xuICAgICAgICB4OiBjb21tb25YLFxuICAgICAgICB5OiByZWZlcmVuY2UueSAtIGVsZW1lbnQuaGVpZ2h0XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIGJvdHRvbTpcbiAgICAgIG9mZnNldHMgPSB7XG4gICAgICAgIHg6IGNvbW1vblgsXG4gICAgICAgIHk6IHJlZmVyZW5jZS55ICsgcmVmZXJlbmNlLmhlaWdodFxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSByaWdodDpcbiAgICAgIG9mZnNldHMgPSB7XG4gICAgICAgIHg6IHJlZmVyZW5jZS54ICsgcmVmZXJlbmNlLndpZHRoLFxuICAgICAgICB5OiBjb21tb25ZXG4gICAgICB9O1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIGxlZnQ6XG4gICAgICBvZmZzZXRzID0ge1xuICAgICAgICB4OiByZWZlcmVuY2UueCAtIGVsZW1lbnQud2lkdGgsXG4gICAgICAgIHk6IGNvbW1vbllcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICBvZmZzZXRzID0ge1xuICAgICAgICB4OiByZWZlcmVuY2UueCxcbiAgICAgICAgeTogcmVmZXJlbmNlLnlcbiAgICAgIH07XG4gIH1cblxuICB2YXIgbWFpbkF4aXMgPSBiYXNlUGxhY2VtZW50ID8gZ2V0TWFpbkF4aXNGcm9tUGxhY2VtZW50KGJhc2VQbGFjZW1lbnQpIDogbnVsbDtcblxuICBpZiAobWFpbkF4aXMgIT0gbnVsbCkge1xuICAgIHZhciBsZW4gPSBtYWluQXhpcyA9PT0gJ3knID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuXG4gICAgc3dpdGNoICh2YXJpYXRpb24pIHtcbiAgICAgIGNhc2Ugc3RhcnQ6XG4gICAgICAgIG9mZnNldHNbbWFpbkF4aXNdID0gb2Zmc2V0c1ttYWluQXhpc10gLSAocmVmZXJlbmNlW2xlbl0gLyAyIC0gZWxlbWVudFtsZW5dIC8gMik7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIGVuZDpcbiAgICAgICAgb2Zmc2V0c1ttYWluQXhpc10gPSBvZmZzZXRzW21haW5BeGlzXSArIChyZWZlcmVuY2VbbGVuXSAvIDIgLSBlbGVtZW50W2xlbl0gLyAyKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9mZnNldHM7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVib3VuY2UoZm4pIHtcbiAgdmFyIHBlbmRpbmc7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFwZW5kaW5nKSB7XG4gICAgICBwZW5kaW5nID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcGVuZGluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICByZXNvbHZlKGZuKCkpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBwZW5kaW5nO1xuICB9O1xufSIsImltcG9ydCBnZXRDbGlwcGluZ1JlY3QgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRDbGlwcGluZ1JlY3QuanNcIjtcbmltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4uL2RvbS11dGlscy9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRCb3VuZGluZ0NsaWVudFJlY3QgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRCb3VuZGluZ0NsaWVudFJlY3QuanNcIjtcbmltcG9ydCBjb21wdXRlT2Zmc2V0cyBmcm9tIFwiLi9jb21wdXRlT2Zmc2V0cy5qc1wiO1xuaW1wb3J0IHJlY3RUb0NsaWVudFJlY3QgZnJvbSBcIi4vcmVjdFRvQ2xpZW50UmVjdC5qc1wiO1xuaW1wb3J0IHsgY2xpcHBpbmdQYXJlbnRzLCByZWZlcmVuY2UsIHBvcHBlciwgYm90dG9tLCB0b3AsIHJpZ2h0LCBiYXNlUGxhY2VtZW50cywgdmlld3BvcnQgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCB7IGlzRWxlbWVudCB9IGZyb20gXCIuLi9kb20tdXRpbHMvaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IG1lcmdlUGFkZGluZ09iamVjdCBmcm9tIFwiLi9tZXJnZVBhZGRpbmdPYmplY3QuanNcIjtcbmltcG9ydCBleHBhbmRUb0hhc2hNYXAgZnJvbSBcIi4vZXhwYW5kVG9IYXNoTWFwLmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGV0ZWN0T3ZlcmZsb3coc3RhdGUsIG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIHZhciBfb3B0aW9ucyA9IG9wdGlvbnMsXG4gICAgICBfb3B0aW9ucyRwbGFjZW1lbnQgPSBfb3B0aW9ucy5wbGFjZW1lbnQsXG4gICAgICBwbGFjZW1lbnQgPSBfb3B0aW9ucyRwbGFjZW1lbnQgPT09IHZvaWQgMCA/IHN0YXRlLnBsYWNlbWVudCA6IF9vcHRpb25zJHBsYWNlbWVudCxcbiAgICAgIF9vcHRpb25zJHN0cmF0ZWd5ID0gX29wdGlvbnMuc3RyYXRlZ3ksXG4gICAgICBzdHJhdGVneSA9IF9vcHRpb25zJHN0cmF0ZWd5ID09PSB2b2lkIDAgPyBzdGF0ZS5zdHJhdGVneSA6IF9vcHRpb25zJHN0cmF0ZWd5LFxuICAgICAgX29wdGlvbnMkYm91bmRhcnkgPSBfb3B0aW9ucy5ib3VuZGFyeSxcbiAgICAgIGJvdW5kYXJ5ID0gX29wdGlvbnMkYm91bmRhcnkgPT09IHZvaWQgMCA/IGNsaXBwaW5nUGFyZW50cyA6IF9vcHRpb25zJGJvdW5kYXJ5LFxuICAgICAgX29wdGlvbnMkcm9vdEJvdW5kYXJ5ID0gX29wdGlvbnMucm9vdEJvdW5kYXJ5LFxuICAgICAgcm9vdEJvdW5kYXJ5ID0gX29wdGlvbnMkcm9vdEJvdW5kYXJ5ID09PSB2b2lkIDAgPyB2aWV3cG9ydCA6IF9vcHRpb25zJHJvb3RCb3VuZGFyeSxcbiAgICAgIF9vcHRpb25zJGVsZW1lbnRDb250ZSA9IF9vcHRpb25zLmVsZW1lbnRDb250ZXh0LFxuICAgICAgZWxlbWVudENvbnRleHQgPSBfb3B0aW9ucyRlbGVtZW50Q29udGUgPT09IHZvaWQgMCA/IHBvcHBlciA6IF9vcHRpb25zJGVsZW1lbnRDb250ZSxcbiAgICAgIF9vcHRpb25zJGFsdEJvdW5kYXJ5ID0gX29wdGlvbnMuYWx0Qm91bmRhcnksXG4gICAgICBhbHRCb3VuZGFyeSA9IF9vcHRpb25zJGFsdEJvdW5kYXJ5ID09PSB2b2lkIDAgPyBmYWxzZSA6IF9vcHRpb25zJGFsdEJvdW5kYXJ5LFxuICAgICAgX29wdGlvbnMkcGFkZGluZyA9IF9vcHRpb25zLnBhZGRpbmcsXG4gICAgICBwYWRkaW5nID0gX29wdGlvbnMkcGFkZGluZyA9PT0gdm9pZCAwID8gMCA6IF9vcHRpb25zJHBhZGRpbmc7XG4gIHZhciBwYWRkaW5nT2JqZWN0ID0gbWVyZ2VQYWRkaW5nT2JqZWN0KHR5cGVvZiBwYWRkaW5nICE9PSAnbnVtYmVyJyA/IHBhZGRpbmcgOiBleHBhbmRUb0hhc2hNYXAocGFkZGluZywgYmFzZVBsYWNlbWVudHMpKTtcbiAgdmFyIGFsdENvbnRleHQgPSBlbGVtZW50Q29udGV4dCA9PT0gcG9wcGVyID8gcmVmZXJlbmNlIDogcG9wcGVyO1xuICB2YXIgcG9wcGVyUmVjdCA9IHN0YXRlLnJlY3RzLnBvcHBlcjtcbiAgdmFyIGVsZW1lbnQgPSBzdGF0ZS5lbGVtZW50c1thbHRCb3VuZGFyeSA/IGFsdENvbnRleHQgOiBlbGVtZW50Q29udGV4dF07XG4gIHZhciBjbGlwcGluZ0NsaWVudFJlY3QgPSBnZXRDbGlwcGluZ1JlY3QoaXNFbGVtZW50KGVsZW1lbnQpID8gZWxlbWVudCA6IGVsZW1lbnQuY29udGV4dEVsZW1lbnQgfHwgZ2V0RG9jdW1lbnRFbGVtZW50KHN0YXRlLmVsZW1lbnRzLnBvcHBlciksIGJvdW5kYXJ5LCByb290Qm91bmRhcnksIHN0cmF0ZWd5KTtcbiAgdmFyIHJlZmVyZW5jZUNsaWVudFJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3Qoc3RhdGUuZWxlbWVudHMucmVmZXJlbmNlKTtcbiAgdmFyIHBvcHBlck9mZnNldHMgPSBjb21wdXRlT2Zmc2V0cyh7XG4gICAgcmVmZXJlbmNlOiByZWZlcmVuY2VDbGllbnRSZWN0LFxuICAgIGVsZW1lbnQ6IHBvcHBlclJlY3QsXG4gICAgc3RyYXRlZ3k6ICdhYnNvbHV0ZScsXG4gICAgcGxhY2VtZW50OiBwbGFjZW1lbnRcbiAgfSk7XG4gIHZhciBwb3BwZXJDbGllbnRSZWN0ID0gcmVjdFRvQ2xpZW50UmVjdChPYmplY3QuYXNzaWduKHt9LCBwb3BwZXJSZWN0LCBwb3BwZXJPZmZzZXRzKSk7XG4gIHZhciBlbGVtZW50Q2xpZW50UmVjdCA9IGVsZW1lbnRDb250ZXh0ID09PSBwb3BwZXIgPyBwb3BwZXJDbGllbnRSZWN0IDogcmVmZXJlbmNlQ2xpZW50UmVjdDsgLy8gcG9zaXRpdmUgPSBvdmVyZmxvd2luZyB0aGUgY2xpcHBpbmcgcmVjdFxuICAvLyAwIG9yIG5lZ2F0aXZlID0gd2l0aGluIHRoZSBjbGlwcGluZyByZWN0XG5cbiAgdmFyIG92ZXJmbG93T2Zmc2V0cyA9IHtcbiAgICB0b3A6IGNsaXBwaW5nQ2xpZW50UmVjdC50b3AgLSBlbGVtZW50Q2xpZW50UmVjdC50b3AgKyBwYWRkaW5nT2JqZWN0LnRvcCxcbiAgICBib3R0b206IGVsZW1lbnRDbGllbnRSZWN0LmJvdHRvbSAtIGNsaXBwaW5nQ2xpZW50UmVjdC5ib3R0b20gKyBwYWRkaW5nT2JqZWN0LmJvdHRvbSxcbiAgICBsZWZ0OiBjbGlwcGluZ0NsaWVudFJlY3QubGVmdCAtIGVsZW1lbnRDbGllbnRSZWN0LmxlZnQgKyBwYWRkaW5nT2JqZWN0LmxlZnQsXG4gICAgcmlnaHQ6IGVsZW1lbnRDbGllbnRSZWN0LnJpZ2h0IC0gY2xpcHBpbmdDbGllbnRSZWN0LnJpZ2h0ICsgcGFkZGluZ09iamVjdC5yaWdodFxuICB9O1xuICB2YXIgb2Zmc2V0RGF0YSA9IHN0YXRlLm1vZGlmaWVyc0RhdGEub2Zmc2V0OyAvLyBPZmZzZXRzIGNhbiBiZSBhcHBsaWVkIG9ubHkgdG8gdGhlIHBvcHBlciBlbGVtZW50XG5cbiAgaWYgKGVsZW1lbnRDb250ZXh0ID09PSBwb3BwZXIgJiYgb2Zmc2V0RGF0YSkge1xuICAgIHZhciBvZmZzZXQgPSBvZmZzZXREYXRhW3BsYWNlbWVudF07XG4gICAgT2JqZWN0LmtleXMob3ZlcmZsb3dPZmZzZXRzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHZhciBtdWx0aXBseSA9IFtyaWdodCwgYm90dG9tXS5pbmRleE9mKGtleSkgPj0gMCA/IDEgOiAtMTtcbiAgICAgIHZhciBheGlzID0gW3RvcCwgYm90dG9tXS5pbmRleE9mKGtleSkgPj0gMCA/ICd5JyA6ICd4JztcbiAgICAgIG92ZXJmbG93T2Zmc2V0c1trZXldICs9IG9mZnNldFtheGlzXSAqIG11bHRpcGx5O1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIG92ZXJmbG93T2Zmc2V0cztcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleHBhbmRUb0hhc2hNYXAodmFsdWUsIGtleXMpIHtcbiAgcmV0dXJuIGtleXMucmVkdWNlKGZ1bmN0aW9uIChoYXNoTWFwLCBrZXkpIHtcbiAgICBoYXNoTWFwW2tleV0gPSB2YWx1ZTtcbiAgICByZXR1cm4gaGFzaE1hcDtcbiAgfSwge30pO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZvcm1hdChzdHIpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgcmV0dXJuIFtdLmNvbmNhdChhcmdzKS5yZWR1Y2UoZnVuY3Rpb24gKHAsIGMpIHtcbiAgICByZXR1cm4gcC5yZXBsYWNlKC8lcy8sIGMpO1xuICB9LCBzdHIpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEFsdEF4aXMoYXhpcykge1xuICByZXR1cm4gYXhpcyA9PT0gJ3gnID8gJ3knIDogJ3gnO1xufSIsImltcG9ydCB7IGF1dG8gfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KSB7XG4gIHJldHVybiBwbGFjZW1lbnQuc3BsaXQoJy0nKVswXTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRGcmVzaFNpZGVPYmplY3QoKSB7XG4gIHJldHVybiB7XG4gICAgdG9wOiAwLFxuICAgIHJpZ2h0OiAwLFxuICAgIGJvdHRvbTogMCxcbiAgICBsZWZ0OiAwXG4gIH07XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0TWFpbkF4aXNGcm9tUGxhY2VtZW50KHBsYWNlbWVudCkge1xuICByZXR1cm4gWyd0b3AnLCAnYm90dG9tJ10uaW5kZXhPZihwbGFjZW1lbnQpID49IDAgPyAneCcgOiAneSc7XG59IiwidmFyIGhhc2ggPSB7XG4gIGxlZnQ6ICdyaWdodCcsXG4gIHJpZ2h0OiAnbGVmdCcsXG4gIGJvdHRvbTogJ3RvcCcsXG4gIHRvcDogJ2JvdHRvbSdcbn07XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRPcHBvc2l0ZVBsYWNlbWVudChwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIHBsYWNlbWVudC5yZXBsYWNlKC9sZWZ0fHJpZ2h0fGJvdHRvbXx0b3AvZywgZnVuY3Rpb24gKG1hdGNoZWQpIHtcbiAgICByZXR1cm4gaGFzaFttYXRjaGVkXTtcbiAgfSk7XG59IiwidmFyIGhhc2ggPSB7XG4gIHN0YXJ0OiAnZW5kJyxcbiAgZW5kOiAnc3RhcnQnXG59O1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0T3Bwb3NpdGVWYXJpYXRpb25QbGFjZW1lbnQocGxhY2VtZW50KSB7XG4gIHJldHVybiBwbGFjZW1lbnQucmVwbGFjZSgvc3RhcnR8ZW5kL2csIGZ1bmN0aW9uIChtYXRjaGVkKSB7XG4gICAgcmV0dXJuIGhhc2hbbWF0Y2hlZF07XG4gIH0pO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFZhcmlhdGlvbihwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIHBsYWNlbWVudC5zcGxpdCgnLScpWzFdO1xufSIsImV4cG9ydCB2YXIgbWF4ID0gTWF0aC5tYXg7XG5leHBvcnQgdmFyIG1pbiA9IE1hdGgubWluO1xuZXhwb3J0IHZhciByb3VuZCA9IE1hdGgucm91bmQ7IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWVyZ2VCeU5hbWUobW9kaWZpZXJzKSB7XG4gIHZhciBtZXJnZWQgPSBtb2RpZmllcnMucmVkdWNlKGZ1bmN0aW9uIChtZXJnZWQsIGN1cnJlbnQpIHtcbiAgICB2YXIgZXhpc3RpbmcgPSBtZXJnZWRbY3VycmVudC5uYW1lXTtcbiAgICBtZXJnZWRbY3VycmVudC5uYW1lXSA9IGV4aXN0aW5nID8gT2JqZWN0LmFzc2lnbih7fSwgZXhpc3RpbmcsIGN1cnJlbnQsIHtcbiAgICAgIG9wdGlvbnM6IE9iamVjdC5hc3NpZ24oe30sIGV4aXN0aW5nLm9wdGlvbnMsIGN1cnJlbnQub3B0aW9ucyksXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBleGlzdGluZy5kYXRhLCBjdXJyZW50LmRhdGEpXG4gICAgfSkgOiBjdXJyZW50O1xuICAgIHJldHVybiBtZXJnZWQ7XG4gIH0sIHt9KTsgLy8gSUUxMSBkb2VzIG5vdCBzdXBwb3J0IE9iamVjdC52YWx1ZXNcblxuICByZXR1cm4gT2JqZWN0LmtleXMobWVyZ2VkKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiBtZXJnZWRba2V5XTtcbiAgfSk7XG59IiwiaW1wb3J0IGdldEZyZXNoU2lkZU9iamVjdCBmcm9tIFwiLi9nZXRGcmVzaFNpZGVPYmplY3QuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1lcmdlUGFkZGluZ09iamVjdChwYWRkaW5nT2JqZWN0KSB7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBnZXRGcmVzaFNpZGVPYmplY3QoKSwgcGFkZGluZ09iamVjdCk7XG59IiwiaW1wb3J0IHsgbW9kaWZpZXJQaGFzZXMgfSBmcm9tIFwiLi4vZW51bXMuanNcIjsgLy8gc291cmNlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80OTg3NTI1NVxuXG5mdW5jdGlvbiBvcmRlcihtb2RpZmllcnMpIHtcbiAgdmFyIG1hcCA9IG5ldyBNYXAoKTtcbiAgdmFyIHZpc2l0ZWQgPSBuZXcgU2V0KCk7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgbW9kaWZpZXJzLmZvckVhY2goZnVuY3Rpb24gKG1vZGlmaWVyKSB7XG4gICAgbWFwLnNldChtb2RpZmllci5uYW1lLCBtb2RpZmllcik7XG4gIH0pOyAvLyBPbiB2aXNpdGluZyBvYmplY3QsIGNoZWNrIGZvciBpdHMgZGVwZW5kZW5jaWVzIGFuZCB2aXNpdCB0aGVtIHJlY3Vyc2l2ZWx5XG5cbiAgZnVuY3Rpb24gc29ydChtb2RpZmllcikge1xuICAgIHZpc2l0ZWQuYWRkKG1vZGlmaWVyLm5hbWUpO1xuICAgIHZhciByZXF1aXJlcyA9IFtdLmNvbmNhdChtb2RpZmllci5yZXF1aXJlcyB8fCBbXSwgbW9kaWZpZXIucmVxdWlyZXNJZkV4aXN0cyB8fCBbXSk7XG4gICAgcmVxdWlyZXMuZm9yRWFjaChmdW5jdGlvbiAoZGVwKSB7XG4gICAgICBpZiAoIXZpc2l0ZWQuaGFzKGRlcCkpIHtcbiAgICAgICAgdmFyIGRlcE1vZGlmaWVyID0gbWFwLmdldChkZXApO1xuXG4gICAgICAgIGlmIChkZXBNb2RpZmllcikge1xuICAgICAgICAgIHNvcnQoZGVwTW9kaWZpZXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmVzdWx0LnB1c2gobW9kaWZpZXIpO1xuICB9XG5cbiAgbW9kaWZpZXJzLmZvckVhY2goZnVuY3Rpb24gKG1vZGlmaWVyKSB7XG4gICAgaWYgKCF2aXNpdGVkLmhhcyhtb2RpZmllci5uYW1lKSkge1xuICAgICAgLy8gY2hlY2sgZm9yIHZpc2l0ZWQgb2JqZWN0XG4gICAgICBzb3J0KG1vZGlmaWVyKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvcmRlck1vZGlmaWVycyhtb2RpZmllcnMpIHtcbiAgLy8gb3JkZXIgYmFzZWQgb24gZGVwZW5kZW5jaWVzXG4gIHZhciBvcmRlcmVkTW9kaWZpZXJzID0gb3JkZXIobW9kaWZpZXJzKTsgLy8gb3JkZXIgYmFzZWQgb24gcGhhc2VcblxuICByZXR1cm4gbW9kaWZpZXJQaGFzZXMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHBoYXNlKSB7XG4gICAgcmV0dXJuIGFjYy5jb25jYXQob3JkZXJlZE1vZGlmaWVycy5maWx0ZXIoZnVuY3Rpb24gKG1vZGlmaWVyKSB7XG4gICAgICByZXR1cm4gbW9kaWZpZXIucGhhc2UgPT09IHBoYXNlO1xuICAgIH0pKTtcbiAgfSwgW10pO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlY3RUb0NsaWVudFJlY3QocmVjdCkge1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcmVjdCwge1xuICAgIGxlZnQ6IHJlY3QueCxcbiAgICB0b3A6IHJlY3QueSxcbiAgICByaWdodDogcmVjdC54ICsgcmVjdC53aWR0aCxcbiAgICBib3R0b206IHJlY3QueSArIHJlY3QuaGVpZ2h0XG4gIH0pO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVuaXF1ZUJ5KGFyciwgZm4pIHtcbiAgdmFyIGlkZW50aWZpZXJzID0gbmV3IFNldCgpO1xuICByZXR1cm4gYXJyLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgIHZhciBpZGVudGlmaWVyID0gZm4oaXRlbSk7XG5cbiAgICBpZiAoIWlkZW50aWZpZXJzLmhhcyhpZGVudGlmaWVyKSkge1xuICAgICAgaWRlbnRpZmllcnMuYWRkKGlkZW50aWZpZXIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRVQVN0cmluZygpIHtcbiAgdmFyIHVhRGF0YSA9IG5hdmlnYXRvci51c2VyQWdlbnREYXRhO1xuXG4gIGlmICh1YURhdGEgIT0gbnVsbCAmJiB1YURhdGEuYnJhbmRzICYmIEFycmF5LmlzQXJyYXkodWFEYXRhLmJyYW5kcykpIHtcbiAgICByZXR1cm4gdWFEYXRhLmJyYW5kcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHJldHVybiBpdGVtLmJyYW5kICsgXCIvXCIgKyBpdGVtLnZlcnNpb247XG4gICAgfSkuam9pbignICcpO1xuICB9XG5cbiAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQ7XG59IiwiaW1wb3J0IGZvcm1hdCBmcm9tIFwiLi9mb3JtYXQuanNcIjtcbmltcG9ydCB7IG1vZGlmaWVyUGhhc2VzIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG52YXIgSU5WQUxJRF9NT0RJRklFUl9FUlJPUiA9ICdQb3BwZXI6IG1vZGlmaWVyIFwiJXNcIiBwcm92aWRlZCBhbiBpbnZhbGlkICVzIHByb3BlcnR5LCBleHBlY3RlZCAlcyBidXQgZ290ICVzJztcbnZhciBNSVNTSU5HX0RFUEVOREVOQ1lfRVJST1IgPSAnUG9wcGVyOiBtb2RpZmllciBcIiVzXCIgcmVxdWlyZXMgXCIlc1wiLCBidXQgXCIlc1wiIG1vZGlmaWVyIGlzIG5vdCBhdmFpbGFibGUnO1xudmFyIFZBTElEX1BST1BFUlRJRVMgPSBbJ25hbWUnLCAnZW5hYmxlZCcsICdwaGFzZScsICdmbicsICdlZmZlY3QnLCAncmVxdWlyZXMnLCAnb3B0aW9ucyddO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmFsaWRhdGVNb2RpZmllcnMobW9kaWZpZXJzKSB7XG4gIG1vZGlmaWVycy5mb3JFYWNoKGZ1bmN0aW9uIChtb2RpZmllcikge1xuICAgIFtdLmNvbmNhdChPYmplY3Qua2V5cyhtb2RpZmllciksIFZBTElEX1BST1BFUlRJRVMpIC8vIElFMTEtY29tcGF0aWJsZSByZXBsYWNlbWVudCBmb3IgYG5ldyBTZXQoaXRlcmFibGUpYFxuICAgIC5maWx0ZXIoZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgc2VsZikge1xuICAgICAgcmV0dXJuIHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4O1xuICAgIH0pLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSAnbmFtZSc6XG4gICAgICAgICAgaWYgKHR5cGVvZiBtb2RpZmllci5uYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoSU5WQUxJRF9NT0RJRklFUl9FUlJPUiwgU3RyaW5nKG1vZGlmaWVyLm5hbWUpLCAnXCJuYW1lXCInLCAnXCJzdHJpbmdcIicsIFwiXFxcIlwiICsgU3RyaW5nKG1vZGlmaWVyLm5hbWUpICsgXCJcXFwiXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdlbmFibGVkJzpcbiAgICAgICAgICBpZiAodHlwZW9mIG1vZGlmaWVyLmVuYWJsZWQgIT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoSU5WQUxJRF9NT0RJRklFUl9FUlJPUiwgbW9kaWZpZXIubmFtZSwgJ1wiZW5hYmxlZFwiJywgJ1wiYm9vbGVhblwiJywgXCJcXFwiXCIgKyBTdHJpbmcobW9kaWZpZXIuZW5hYmxlZCkgKyBcIlxcXCJcIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3BoYXNlJzpcbiAgICAgICAgICBpZiAobW9kaWZpZXJQaGFzZXMuaW5kZXhPZihtb2RpZmllci5waGFzZSkgPCAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1hdChJTlZBTElEX01PRElGSUVSX0VSUk9SLCBtb2RpZmllci5uYW1lLCAnXCJwaGFzZVwiJywgXCJlaXRoZXIgXCIgKyBtb2RpZmllclBoYXNlcy5qb2luKCcsICcpLCBcIlxcXCJcIiArIFN0cmluZyhtb2RpZmllci5waGFzZSkgKyBcIlxcXCJcIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2ZuJzpcbiAgICAgICAgICBpZiAodHlwZW9mIG1vZGlmaWVyLmZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1hdChJTlZBTElEX01PRElGSUVSX0VSUk9SLCBtb2RpZmllci5uYW1lLCAnXCJmblwiJywgJ1wiZnVuY3Rpb25cIicsIFwiXFxcIlwiICsgU3RyaW5nKG1vZGlmaWVyLmZuKSArIFwiXFxcIlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnZWZmZWN0JzpcbiAgICAgICAgICBpZiAobW9kaWZpZXIuZWZmZWN0ICE9IG51bGwgJiYgdHlwZW9mIG1vZGlmaWVyLmVmZmVjdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoSU5WQUxJRF9NT0RJRklFUl9FUlJPUiwgbW9kaWZpZXIubmFtZSwgJ1wiZWZmZWN0XCInLCAnXCJmdW5jdGlvblwiJywgXCJcXFwiXCIgKyBTdHJpbmcobW9kaWZpZXIuZm4pICsgXCJcXFwiXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdyZXF1aXJlcyc6XG4gICAgICAgICAgaWYgKG1vZGlmaWVyLnJlcXVpcmVzICE9IG51bGwgJiYgIUFycmF5LmlzQXJyYXkobW9kaWZpZXIucmVxdWlyZXMpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1hdChJTlZBTElEX01PRElGSUVSX0VSUk9SLCBtb2RpZmllci5uYW1lLCAnXCJyZXF1aXJlc1wiJywgJ1wiYXJyYXlcIicsIFwiXFxcIlwiICsgU3RyaW5nKG1vZGlmaWVyLnJlcXVpcmVzKSArIFwiXFxcIlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAncmVxdWlyZXNJZkV4aXN0cyc6XG4gICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG1vZGlmaWVyLnJlcXVpcmVzSWZFeGlzdHMpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1hdChJTlZBTElEX01PRElGSUVSX0VSUk9SLCBtb2RpZmllci5uYW1lLCAnXCJyZXF1aXJlc0lmRXhpc3RzXCInLCAnXCJhcnJheVwiJywgXCJcXFwiXCIgKyBTdHJpbmcobW9kaWZpZXIucmVxdWlyZXNJZkV4aXN0cykgKyBcIlxcXCJcIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ29wdGlvbnMnOlxuICAgICAgICBjYXNlICdkYXRhJzpcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJQb3BwZXJKUzogYW4gaW52YWxpZCBwcm9wZXJ0eSBoYXMgYmVlbiBwcm92aWRlZCB0byB0aGUgXFxcIlwiICsgbW9kaWZpZXIubmFtZSArIFwiXFxcIiBtb2RpZmllciwgdmFsaWQgcHJvcGVydGllcyBhcmUgXCIgKyBWQUxJRF9QUk9QRVJUSUVTLm1hcChmdW5jdGlvbiAocykge1xuICAgICAgICAgICAgcmV0dXJuIFwiXFxcIlwiICsgcyArIFwiXFxcIlwiO1xuICAgICAgICAgIH0pLmpvaW4oJywgJykgKyBcIjsgYnV0IFxcXCJcIiArIGtleSArIFwiXFxcIiB3YXMgcHJvdmlkZWQuXCIpO1xuICAgICAgfVxuXG4gICAgICBtb2RpZmllci5yZXF1aXJlcyAmJiBtb2RpZmllci5yZXF1aXJlcy5mb3JFYWNoKGZ1bmN0aW9uIChyZXF1aXJlbWVudCkge1xuICAgICAgICBpZiAobW9kaWZpZXJzLmZpbmQoZnVuY3Rpb24gKG1vZCkge1xuICAgICAgICAgIHJldHVybiBtb2QubmFtZSA9PT0gcmVxdWlyZW1lbnQ7XG4gICAgICAgIH0pID09IG51bGwpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1hdChNSVNTSU5HX0RFUEVOREVOQ1lfRVJST1IsIFN0cmluZyhtb2RpZmllci5uYW1lKSwgcmVxdWlyZW1lbnQsIHJlcXVpcmVtZW50KSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0iLCJpbXBvcnQgeyBtYXggYXMgbWF0aE1heCwgbWluIGFzIG1hdGhNaW4gfSBmcm9tIFwiLi9tYXRoLmpzXCI7XG5leHBvcnQgZnVuY3Rpb24gd2l0aGluKG1pbiwgdmFsdWUsIG1heCkge1xuICByZXR1cm4gbWF0aE1heChtaW4sIG1hdGhNaW4odmFsdWUsIG1heCkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHdpdGhpbk1heENsYW1wKG1pbiwgdmFsdWUsIG1heCkge1xuICB2YXIgdiA9IHdpdGhpbihtaW4sIHZhbHVlLCBtYXgpO1xuICByZXR1cm4gdiA+IG1heCA/IG1heCA6IHY7XG59IiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBEZWZhdWx0ID0ge1xuICAgIGFsd2F5c09wZW46IGZhbHNlLFxuICAgIGFjdGl2ZUNsYXNzZXM6ICdiZy1ncmF5LTEwMCBkYXJrOmJnLWdyYXktODAwIHRleHQtZ3JheS05MDAgZGFyazp0ZXh0LXdoaXRlJyxcbiAgICBpbmFjdGl2ZUNsYXNzZXM6ICd0ZXh0LWdyYXktNTAwIGRhcms6dGV4dC1ncmF5LTQwMCcsXG4gICAgb25PcGVuOiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgb25DbG9zZTogZnVuY3Rpb24gKCkgeyB9LFxuICAgIG9uVG9nZ2xlOiBmdW5jdGlvbiAoKSB7IH0sXG59O1xudmFyIEFjY29yZGlvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBY2NvcmRpb24oaXRlbXMsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKGl0ZW1zID09PSB2b2lkIDApIHsgaXRlbXMgPSBbXTsgfVxuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSBEZWZhdWx0OyB9XG4gICAgICAgIHRoaXMuX2l0ZW1zID0gaXRlbXM7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgRGVmYXVsdCksIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgfVxuICAgIEFjY29yZGlvbi5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLl9pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIHNob3cgYWNjb3JkaW9uIGl0ZW0gYmFzZWQgb24gY2xpY2tcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5vcGVuKGl0ZW0uaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpdGVtLnRyaWdnZXJFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudG9nZ2xlKGl0ZW0uaWQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFjY29yZGlvbi5wcm90b3R5cGUuZ2V0SXRlbSA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBpdGVtLmlkID09PSBpZDsgfSlbMF07XG4gICAgfTtcbiAgICBBY2NvcmRpb24ucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLmdldEl0ZW0oaWQpO1xuICAgICAgICAvLyBkb24ndCBoaWRlIG90aGVyIGFjY29yZGlvbnMgaWYgYWx3YXlzIG9wZW5cbiAgICAgICAgaWYgKCF0aGlzLl9vcHRpb25zLmFsd2F5c09wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zLm1hcChmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICAgICAgaWYgKGkgIT09IGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgKF9hID0gaS50cmlnZ2VyRWwuY2xhc3NMaXN0KS5yZW1vdmUuYXBwbHkoX2EsIF90aGlzLl9vcHRpb25zLmFjdGl2ZUNsYXNzZXMuc3BsaXQoJyAnKSk7XG4gICAgICAgICAgICAgICAgICAgIChfYiA9IGkudHJpZ2dlckVsLmNsYXNzTGlzdCkuYWRkLmFwcGx5KF9iLCBfdGhpcy5fb3B0aW9ucy5pbmFjdGl2ZUNsYXNzZXMuc3BsaXQoJyAnKSk7XG4gICAgICAgICAgICAgICAgICAgIGkudGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIGkudHJpZ2dlckVsLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgICAgICAgICAgICAgICAgICBpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAvLyByb3RhdGUgaWNvbiBpZiBzZXRcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkuaWNvbkVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpLmljb25FbC5jbGFzc0xpc3QucmVtb3ZlKCdyb3RhdGUtMTgwJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzaG93IGFjdGl2ZSBpdGVtXG4gICAgICAgIChfYSA9IGl0ZW0udHJpZ2dlckVsLmNsYXNzTGlzdCkuYWRkLmFwcGx5KF9hLCB0aGlzLl9vcHRpb25zLmFjdGl2ZUNsYXNzZXMuc3BsaXQoJyAnKSk7XG4gICAgICAgIChfYiA9IGl0ZW0udHJpZ2dlckVsLmNsYXNzTGlzdCkucmVtb3ZlLmFwcGx5KF9iLCB0aGlzLl9vcHRpb25zLmluYWN0aXZlQ2xhc3Nlcy5zcGxpdCgnICcpKTtcbiAgICAgICAgaXRlbS50cmlnZ2VyRWwuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcbiAgICAgICAgaXRlbS50YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAvLyByb3RhdGUgaWNvbiBpZiBzZXRcbiAgICAgICAgaWYgKGl0ZW0uaWNvbkVsKSB7XG4gICAgICAgICAgICBpdGVtLmljb25FbC5jbGFzc0xpc3QuYWRkKCdyb3RhdGUtMTgwJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vbk9wZW4odGhpcywgaXRlbSk7XG4gICAgfTtcbiAgICBBY2NvcmRpb24ucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICB2YXIgaXRlbSA9IHRoaXMuZ2V0SXRlbShpZCk7XG4gICAgICAgIGlmIChpdGVtLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZShpZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9wZW4oaWQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25Ub2dnbGUodGhpcywgaXRlbSk7XG4gICAgfTtcbiAgICBBY2NvcmRpb24ucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHZhciBpdGVtID0gdGhpcy5nZXRJdGVtKGlkKTtcbiAgICAgICAgKF9hID0gaXRlbS50cmlnZ2VyRWwuY2xhc3NMaXN0KS5yZW1vdmUuYXBwbHkoX2EsIHRoaXMuX29wdGlvbnMuYWN0aXZlQ2xhc3Nlcy5zcGxpdCgnICcpKTtcbiAgICAgICAgKF9iID0gaXRlbS50cmlnZ2VyRWwuY2xhc3NMaXN0KS5hZGQuYXBwbHkoX2IsIHRoaXMuX29wdGlvbnMuaW5hY3RpdmVDbGFzc2VzLnNwbGl0KCcgJykpO1xuICAgICAgICBpdGVtLnRhcmdldEVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICBpdGVtLnRyaWdnZXJFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcbiAgICAgICAgaXRlbS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgLy8gcm90YXRlIGljb24gaWYgc2V0XG4gICAgICAgIGlmIChpdGVtLmljb25FbCkge1xuICAgICAgICAgICAgaXRlbS5pY29uRWwuY2xhc3NMaXN0LnJlbW92ZSgncm90YXRlLTE4MCcpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25DbG9zZSh0aGlzLCBpdGVtKTtcbiAgICB9O1xuICAgIHJldHVybiBBY2NvcmRpb247XG59KCkpO1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgd2luZG93LkFjY29yZGlvbiA9IEFjY29yZGlvbjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpbml0QWNjb3JkaW9ucygpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1hY2NvcmRpb25dJykuZm9yRWFjaChmdW5jdGlvbiAoJGFjY29yZGlvbkVsKSB7XG4gICAgICAgIHZhciBhbHdheXNPcGVuID0gJGFjY29yZGlvbkVsLmdldEF0dHJpYnV0ZSgnZGF0YS1hY2NvcmRpb24nKTtcbiAgICAgICAgdmFyIGFjdGl2ZUNsYXNzZXMgPSAkYWNjb3JkaW9uRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWFjdGl2ZS1jbGFzc2VzJyk7XG4gICAgICAgIHZhciBpbmFjdGl2ZUNsYXNzZXMgPSAkYWNjb3JkaW9uRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWluYWN0aXZlLWNsYXNzZXMnKTtcbiAgICAgICAgdmFyIGl0ZW1zID0gW107XG4gICAgICAgICRhY2NvcmRpb25FbFxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWFjY29yZGlvbi10YXJnZXRdJylcbiAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uICgkdHJpZ2dlckVsKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IHtcbiAgICAgICAgICAgICAgICBpZDogJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYWNjb3JkaW9uLXRhcmdldCcpLFxuICAgICAgICAgICAgICAgIHRyaWdnZXJFbDogJHRyaWdnZXJFbCxcbiAgICAgICAgICAgICAgICB0YXJnZXRFbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcigkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1hY2NvcmRpb24tdGFyZ2V0JykpLFxuICAgICAgICAgICAgICAgIGljb25FbDogJHRyaWdnZXJFbC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1hY2NvcmRpb24taWNvbl0nKSxcbiAgICAgICAgICAgICAgICBhY3RpdmU6ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJykgPT09ICd0cnVlJ1xuICAgICAgICAgICAgICAgICAgICA/IHRydWVcbiAgICAgICAgICAgICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICAgICAgbmV3IEFjY29yZGlvbihpdGVtcywge1xuICAgICAgICAgICAgYWx3YXlzT3BlbjogYWx3YXlzT3BlbiA9PT0gJ29wZW4nID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgYWN0aXZlQ2xhc3NlczogYWN0aXZlQ2xhc3Nlc1xuICAgICAgICAgICAgICAgID8gYWN0aXZlQ2xhc3Nlc1xuICAgICAgICAgICAgICAgIDogRGVmYXVsdC5hY3RpdmVDbGFzc2VzLFxuICAgICAgICAgICAgaW5hY3RpdmVDbGFzc2VzOiBpbmFjdGl2ZUNsYXNzZXNcbiAgICAgICAgICAgICAgICA/IGluYWN0aXZlQ2xhc3Nlc1xuICAgICAgICAgICAgICAgIDogRGVmYXVsdC5pbmFjdGl2ZUNsYXNzZXMsXG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0IGRlZmF1bHQgQWNjb3JkaW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW50ZXJmYWNlLmpzLm1hcCIsImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXR5cGVzLmpzLm1hcCIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgRGVmYXVsdCA9IHtcbiAgICBkZWZhdWx0UG9zaXRpb246IDAsXG4gICAgaW5kaWNhdG9yczoge1xuICAgICAgICBpdGVtczogW10sXG4gICAgICAgIGFjdGl2ZUNsYXNzZXM6ICdiZy13aGl0ZSBkYXJrOmJnLWdyYXktODAwJyxcbiAgICAgICAgaW5hY3RpdmVDbGFzc2VzOiAnYmctd2hpdGUvNTAgZGFyazpiZy1ncmF5LTgwMC81MCBob3ZlcjpiZy13aGl0ZSBkYXJrOmhvdmVyOmJnLWdyYXktODAwJyxcbiAgICB9LFxuICAgIGludGVydmFsOiAzMDAwLFxuICAgIG9uTmV4dDogZnVuY3Rpb24gKCkgeyB9LFxuICAgIG9uUHJldjogZnVuY3Rpb24gKCkgeyB9LFxuICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAoKSB7IH0sXG59O1xudmFyIENhcm91c2VsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENhcm91c2VsKGl0ZW1zLCBvcHRpb25zKSB7XG4gICAgICAgIGlmIChpdGVtcyA9PT0gdm9pZCAwKSB7IGl0ZW1zID0gW107IH1cbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0gRGVmYXVsdDsgfVxuICAgICAgICB0aGlzLl9pdGVtcyA9IGl0ZW1zO1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gX19hc3NpZ24oX19hc3NpZ24oX19hc3NpZ24oe30sIERlZmF1bHQpLCBvcHRpb25zKSwgeyBpbmRpY2F0b3JzOiBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgRGVmYXVsdC5pbmRpY2F0b3JzKSwgb3B0aW9ucy5pbmRpY2F0b3JzKSB9KTtcbiAgICAgICAgdGhpcy5fYWN0aXZlSXRlbSA9IHRoaXMuZ2V0SXRlbSh0aGlzLl9vcHRpb25zLmRlZmF1bHRQb3NpdGlvbik7XG4gICAgICAgIHRoaXMuX2luZGljYXRvcnMgPSB0aGlzLl9vcHRpb25zLmluZGljYXRvcnMuaXRlbXM7XG4gICAgICAgIHRoaXMuX2ludGVydmFsRHVyYXRpb24gPSB0aGlzLl9vcHRpb25zLmludGVydmFsO1xuICAgICAgICB0aGlzLl9pbnRlcnZhbEluc3RhbmNlID0gbnVsbDtcbiAgICAgICAgdGhpcy5faW5pdCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBpbml0aWFsaXplIGNhcm91c2VsIGFuZCBpdGVtcyBiYXNlZCBvbiBhY3RpdmUgb25lXG4gICAgICovXG4gICAgQ2Fyb3VzZWwucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl9pdGVtcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIGl0ZW0uZWwuY2xhc3NMaXN0LmFkZCgnYWJzb2x1dGUnLCAnaW5zZXQtMCcsICd0cmFuc2l0aW9uLXRyYW5zZm9ybScsICd0cmFuc2Zvcm0nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGlmIG5vIGFjdGl2ZSBpdGVtIGlzIHNldCB0aGVuIGZpcnN0IHBvc2l0aW9uIGlzIGRlZmF1bHRcbiAgICAgICAgaWYgKHRoaXMuX2dldEFjdGl2ZUl0ZW0oKSkge1xuICAgICAgICAgICAgdGhpcy5zbGlkZVRvKHRoaXMuX2dldEFjdGl2ZUl0ZW0oKS5wb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlVG8oMCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faW5kaWNhdG9ycy5tYXAoZnVuY3Rpb24gKGluZGljYXRvciwgcG9zaXRpb24pIHtcbiAgICAgICAgICAgIGluZGljYXRvci5lbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zbGlkZVRvKHBvc2l0aW9uKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIENhcm91c2VsLnByb3RvdHlwZS5nZXRJdGVtID0gZnVuY3Rpb24gKHBvc2l0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtc1twb3NpdGlvbl07XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTbGlkZSB0byB0aGUgZWxlbWVudCBiYXNlZCBvbiBpZFxuICAgICAqIEBwYXJhbSB7Kn0gcG9zaXRpb25cbiAgICAgKi9cbiAgICBDYXJvdXNlbC5wcm90b3R5cGUuc2xpZGVUbyA9IGZ1bmN0aW9uIChwb3NpdGlvbikge1xuICAgICAgICB2YXIgbmV4dEl0ZW0gPSB0aGlzLl9pdGVtc1twb3NpdGlvbl07XG4gICAgICAgIHZhciByb3RhdGlvbkl0ZW1zID0ge1xuICAgICAgICAgICAgbGVmdDogbmV4dEl0ZW0ucG9zaXRpb24gPT09IDBcbiAgICAgICAgICAgICAgICA/IHRoaXMuX2l0ZW1zW3RoaXMuX2l0ZW1zLmxlbmd0aCAtIDFdXG4gICAgICAgICAgICAgICAgOiB0aGlzLl9pdGVtc1tuZXh0SXRlbS5wb3NpdGlvbiAtIDFdLFxuICAgICAgICAgICAgbWlkZGxlOiBuZXh0SXRlbSxcbiAgICAgICAgICAgIHJpZ2h0OiBuZXh0SXRlbS5wb3NpdGlvbiA9PT0gdGhpcy5faXRlbXMubGVuZ3RoIC0gMVxuICAgICAgICAgICAgICAgID8gdGhpcy5faXRlbXNbMF1cbiAgICAgICAgICAgICAgICA6IHRoaXMuX2l0ZW1zW25leHRJdGVtLnBvc2l0aW9uICsgMV0sXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX3JvdGF0ZShyb3RhdGlvbkl0ZW1zKTtcbiAgICAgICAgdGhpcy5fc2V0QWN0aXZlSXRlbShuZXh0SXRlbSk7XG4gICAgICAgIGlmICh0aGlzLl9pbnRlcnZhbEluc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgICAgICB0aGlzLmN5Y2xlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vbkNoYW5nZSh0aGlzKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEJhc2VkIG9uIHRoZSBjdXJyZW50bHkgYWN0aXZlIGl0ZW0gaXQgd2lsbCBnbyB0byB0aGUgbmV4dCBwb3NpdGlvblxuICAgICAqL1xuICAgIENhcm91c2VsLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYWN0aXZlSXRlbSA9IHRoaXMuX2dldEFjdGl2ZUl0ZW0oKTtcbiAgICAgICAgdmFyIG5leHRJdGVtID0gbnVsbDtcbiAgICAgICAgLy8gY2hlY2sgaWYgbGFzdCBpdGVtXG4gICAgICAgIGlmIChhY3RpdmVJdGVtLnBvc2l0aW9uID09PSB0aGlzLl9pdGVtcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBuZXh0SXRlbSA9IHRoaXMuX2l0ZW1zWzBdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbmV4dEl0ZW0gPSB0aGlzLl9pdGVtc1thY3RpdmVJdGVtLnBvc2l0aW9uICsgMV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zbGlkZVRvKG5leHRJdGVtLnBvc2l0aW9uKTtcbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vbk5leHQodGhpcyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBCYXNlZCBvbiB0aGUgY3VycmVudGx5IGFjdGl2ZSBpdGVtIGl0IHdpbGwgZ28gdG8gdGhlIHByZXZpb3VzIHBvc2l0aW9uXG4gICAgICovXG4gICAgQ2Fyb3VzZWwucHJvdG90eXBlLnByZXYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhY3RpdmVJdGVtID0gdGhpcy5fZ2V0QWN0aXZlSXRlbSgpO1xuICAgICAgICB2YXIgcHJldkl0ZW0gPSBudWxsO1xuICAgICAgICAvLyBjaGVjayBpZiBmaXJzdCBpdGVtXG4gICAgICAgIGlmIChhY3RpdmVJdGVtLnBvc2l0aW9uID09PSAwKSB7XG4gICAgICAgICAgICBwcmV2SXRlbSA9IHRoaXMuX2l0ZW1zW3RoaXMuX2l0ZW1zLmxlbmd0aCAtIDFdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcHJldkl0ZW0gPSB0aGlzLl9pdGVtc1thY3RpdmVJdGVtLnBvc2l0aW9uIC0gMV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zbGlkZVRvKHByZXZJdGVtLnBvc2l0aW9uKTtcbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vblByZXYodGhpcyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCBhcHBsaWVzIHRoZSB0cmFuc2Zvcm0gY2xhc3NlcyBiYXNlZCBvbiB0aGUgbGVmdCwgbWlkZGxlLCBhbmQgcmlnaHQgcm90YXRpb24gY2Fyb3VzZWwgaXRlbXNcbiAgICAgKiBAcGFyYW0geyp9IHJvdGF0aW9uSXRlbXNcbiAgICAgKi9cbiAgICBDYXJvdXNlbC5wcm90b3R5cGUuX3JvdGF0ZSA9IGZ1bmN0aW9uIChyb3RhdGlvbkl0ZW1zKSB7XG4gICAgICAgIC8vIHJlc2V0XG4gICAgICAgIHRoaXMuX2l0ZW1zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgaXRlbS5lbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGxlZnQgaXRlbSAocHJldmlvdXNseSBhY3RpdmUpXG4gICAgICAgIHJvdGF0aW9uSXRlbXMubGVmdC5lbC5jbGFzc0xpc3QucmVtb3ZlKCctdHJhbnNsYXRlLXgtZnVsbCcsICd0cmFuc2xhdGUteC1mdWxsJywgJ3RyYW5zbGF0ZS14LTAnLCAnaGlkZGVuJywgJ3otMjAnKTtcbiAgICAgICAgcm90YXRpb25JdGVtcy5sZWZ0LmVsLmNsYXNzTGlzdC5hZGQoJy10cmFuc2xhdGUteC1mdWxsJywgJ3otMTAnKTtcbiAgICAgICAgLy8gY3VycmVudGx5IGFjdGl2ZSBpdGVtXG4gICAgICAgIHJvdGF0aW9uSXRlbXMubWlkZGxlLmVsLmNsYXNzTGlzdC5yZW1vdmUoJy10cmFuc2xhdGUteC1mdWxsJywgJ3RyYW5zbGF0ZS14LWZ1bGwnLCAndHJhbnNsYXRlLXgtMCcsICdoaWRkZW4nLCAnei0xMCcpO1xuICAgICAgICByb3RhdGlvbkl0ZW1zLm1pZGRsZS5lbC5jbGFzc0xpc3QuYWRkKCd0cmFuc2xhdGUteC0wJywgJ3otMjAnKTtcbiAgICAgICAgLy8gcmlnaHQgaXRlbSAodXBjb21pbmcgYWN0aXZlKVxuICAgICAgICByb3RhdGlvbkl0ZW1zLnJpZ2h0LmVsLmNsYXNzTGlzdC5yZW1vdmUoJy10cmFuc2xhdGUteC1mdWxsJywgJ3RyYW5zbGF0ZS14LWZ1bGwnLCAndHJhbnNsYXRlLXgtMCcsICdoaWRkZW4nLCAnei0yMCcpO1xuICAgICAgICByb3RhdGlvbkl0ZW1zLnJpZ2h0LmVsLmNsYXNzTGlzdC5hZGQoJ3RyYW5zbGF0ZS14LWZ1bGwnLCAnei0xMCcpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0IGFuIGludGVydmFsIHRvIGN5Y2xlIHRocm91Z2ggdGhlIGNhcm91c2VsIGl0ZW1zXG4gICAgICovXG4gICAgQ2Fyb3VzZWwucHJvdG90eXBlLmN5Y2xlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMuX2ludGVydmFsSW5zdGFuY2UgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLm5leHQoKTtcbiAgICAgICAgICAgIH0sIHRoaXMuX2ludGVydmFsRHVyYXRpb24pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDbGVhcnMgdGhlIGN5Y2xpbmcgaW50ZXJ2YWxcbiAgICAgKi9cbiAgICBDYXJvdXNlbC5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWxJbnN0YW5jZSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGN1cnJlbnRseSBhY3RpdmUgaXRlbVxuICAgICAqL1xuICAgIENhcm91c2VsLnByb3RvdHlwZS5fZ2V0QWN0aXZlSXRlbSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZUl0ZW07XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGN1cnJlbnRseSBhY3RpdmUgaXRlbSBhbmQgZGF0YSBhdHRyaWJ1dGVcbiAgICAgKiBAcGFyYW0geyp9IHBvc2l0aW9uXG4gICAgICovXG4gICAgQ2Fyb3VzZWwucHJvdG90eXBlLl9zZXRBY3RpdmVJdGVtID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fYWN0aXZlSXRlbSA9IGl0ZW07XG4gICAgICAgIHZhciBwb3NpdGlvbiA9IGl0ZW0ucG9zaXRpb247XG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgaW5kaWNhdG9ycyBpZiBhdmFpbGFibGVcbiAgICAgICAgaWYgKHRoaXMuX2luZGljYXRvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLl9pbmRpY2F0b3JzLm1hcChmdW5jdGlvbiAoaW5kaWNhdG9yKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3IuZWwuc2V0QXR0cmlidXRlKCdhcmlhLWN1cnJlbnQnLCAnZmFsc2UnKTtcbiAgICAgICAgICAgICAgICAoX2EgPSBpbmRpY2F0b3IuZWwuY2xhc3NMaXN0KS5yZW1vdmUuYXBwbHkoX2EsIF90aGlzLl9vcHRpb25zLmluZGljYXRvcnMuYWN0aXZlQ2xhc3Nlcy5zcGxpdCgnICcpKTtcbiAgICAgICAgICAgICAgICAoX2IgPSBpbmRpY2F0b3IuZWwuY2xhc3NMaXN0KS5hZGQuYXBwbHkoX2IsIF90aGlzLl9vcHRpb25zLmluZGljYXRvcnMuaW5hY3RpdmVDbGFzc2VzLnNwbGl0KCcgJykpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAoX2EgPSB0aGlzLl9pbmRpY2F0b3JzW3Bvc2l0aW9uXS5lbC5jbGFzc0xpc3QpLmFkZC5hcHBseShfYSwgdGhpcy5fb3B0aW9ucy5pbmRpY2F0b3JzLmFjdGl2ZUNsYXNzZXMuc3BsaXQoJyAnKSk7XG4gICAgICAgICAgICAoX2IgPSB0aGlzLl9pbmRpY2F0b3JzW3Bvc2l0aW9uXS5lbC5jbGFzc0xpc3QpLnJlbW92ZS5hcHBseShfYiwgdGhpcy5fb3B0aW9ucy5pbmRpY2F0b3JzLmluYWN0aXZlQ2xhc3Nlcy5zcGxpdCgnICcpKTtcbiAgICAgICAgICAgIHRoaXMuX2luZGljYXRvcnNbcG9zaXRpb25dLmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1jdXJyZW50JywgJ3RydWUnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIENhcm91c2VsO1xufSgpKTtcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHdpbmRvdy5DYXJvdXNlbCA9IENhcm91c2VsO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGluaXRDYXJvdXNlbHMoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY2Fyb3VzZWxdJykuZm9yRWFjaChmdW5jdGlvbiAoJGNhcm91c2VsRWwpIHtcbiAgICAgICAgdmFyIGludGVydmFsID0gJGNhcm91c2VsRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWNhcm91c2VsLWludGVydmFsJyk7XG4gICAgICAgIHZhciBzbGlkZSA9ICRjYXJvdXNlbEVsLmdldEF0dHJpYnV0ZSgnZGF0YS1jYXJvdXNlbCcpID09PSAnc2xpZGUnXG4gICAgICAgICAgICA/IHRydWVcbiAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgIHZhciBpdGVtcyA9IFtdO1xuICAgICAgICB2YXIgZGVmYXVsdFBvc2l0aW9uID0gMDtcbiAgICAgICAgaWYgKCRjYXJvdXNlbEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNhcm91c2VsLWl0ZW1dJykubGVuZ3RoKSB7XG4gICAgICAgICAgICBBcnJheS5mcm9tKCRjYXJvdXNlbEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNhcm91c2VsLWl0ZW1dJykpLm1hcChmdW5jdGlvbiAoJGNhcm91c2VsSXRlbUVsLCBwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgIGVsOiAkY2Fyb3VzZWxJdGVtRWwsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKCRjYXJvdXNlbEl0ZW1FbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2Fyb3VzZWwtaXRlbScpID09PVxuICAgICAgICAgICAgICAgICAgICAnYWN0aXZlJykge1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kaWNhdG9ycyA9IFtdO1xuICAgICAgICBpZiAoJGNhcm91c2VsRWwucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY2Fyb3VzZWwtc2xpZGUtdG9dJykubGVuZ3RoKSB7XG4gICAgICAgICAgICBBcnJheS5mcm9tKCRjYXJvdXNlbEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNhcm91c2VsLXNsaWRlLXRvXScpKS5tYXAoZnVuY3Rpb24gKCRpbmRpY2F0b3JFbCkge1xuICAgICAgICAgICAgICAgIGluZGljYXRvcnMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBwYXJzZUludCgkaW5kaWNhdG9yRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWNhcm91c2VsLXNsaWRlLXRvJykpLFxuICAgICAgICAgICAgICAgICAgICBlbDogJGluZGljYXRvckVsLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNhcm91c2VsID0gbmV3IENhcm91c2VsKGl0ZW1zLCB7XG4gICAgICAgICAgICBkZWZhdWx0UG9zaXRpb246IGRlZmF1bHRQb3NpdGlvbixcbiAgICAgICAgICAgIGluZGljYXRvcnM6IHtcbiAgICAgICAgICAgICAgICBpdGVtczogaW5kaWNhdG9ycyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbnRlcnZhbDogaW50ZXJ2YWwgPyBpbnRlcnZhbCA6IERlZmF1bHQuaW50ZXJ2YWwsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoc2xpZGUpIHtcbiAgICAgICAgICAgIGNhcm91c2VsLmN5Y2xlKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2hlY2sgZm9yIGNvbnRyb2xzXG4gICAgICAgIHZhciBjYXJvdXNlbE5leHRFbCA9ICRjYXJvdXNlbEVsLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNhcm91c2VsLW5leHRdJyk7XG4gICAgICAgIHZhciBjYXJvdXNlbFByZXZFbCA9ICRjYXJvdXNlbEVsLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNhcm91c2VsLXByZXZdJyk7XG4gICAgICAgIGlmIChjYXJvdXNlbE5leHRFbCkge1xuICAgICAgICAgICAgY2Fyb3VzZWxOZXh0RWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY2Fyb3VzZWwubmV4dCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhcm91c2VsUHJldkVsKSB7XG4gICAgICAgICAgICBjYXJvdXNlbFByZXZFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjYXJvdXNlbC5wcmV2KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0IGRlZmF1bHQgQ2Fyb3VzZWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnRlcmZhY2UuanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwZXMuanMubWFwIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBEZWZhdWx0ID0ge1xuICAgIG9uQ29sbGFwc2U6IGZ1bmN0aW9uICgpIHsgfSxcbiAgICBvbkV4cGFuZDogZnVuY3Rpb24gKCkgeyB9LFxuICAgIG9uVG9nZ2xlOiBmdW5jdGlvbiAoKSB7IH0sXG59O1xudmFyIENvbGxhcHNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbGxhcHNlKHRhcmdldEVsLCB0cmlnZ2VyRWwsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRhcmdldEVsID09PSB2b2lkIDApIHsgdGFyZ2V0RWwgPSBudWxsOyB9XG4gICAgICAgIGlmICh0cmlnZ2VyRWwgPT09IHZvaWQgMCkgeyB0cmlnZ2VyRWwgPSBudWxsOyB9XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IERlZmF1bHQ7IH1cbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwgPSB0YXJnZXRFbDtcbiAgICAgICAgdGhpcy5fdHJpZ2dlckVsID0gdHJpZ2dlckVsO1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gX19hc3NpZ24oX19hc3NpZ24oe30sIERlZmF1bHQpLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgfVxuICAgIENvbGxhcHNlLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuX3RyaWdnZXJFbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3RyaWdnZXJFbC5oYXNBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Zpc2libGUgPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJykgPT09ICd0cnVlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGZpeCB1bnRpbCB2MiBub3QgdG8gYnJlYWsgcHJldmlvdXMgc2luZ2xlIGNvbGxhcHNlcyB3aGljaCBiZWNhbWUgZGlzbWlzc1xuICAgICAgICAgICAgICAgIHRoaXMuX3Zpc2libGUgPSAhdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy50b2dnbGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb2xsYXBzZS5wcm90b3R5cGUuY29sbGFwc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICBpZiAodGhpcy5fdHJpZ2dlckVsKSB7XG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyRWwuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uQ29sbGFwc2UodGhpcyk7XG4gICAgfTtcbiAgICBDb2xsYXBzZS5wcm90b3R5cGUuZXhwYW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgaWYgKHRoaXMuX3RyaWdnZXJFbCkge1xuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckVsLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IHRydWU7XG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25FeHBhbmQodGhpcyk7XG4gICAgfTtcbiAgICBDb2xsYXBzZS5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fdmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5jb2xsYXBzZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5leHBhbmQoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uVG9nZ2xlKHRoaXMpO1xuICAgIH07XG4gICAgcmV0dXJuIENvbGxhcHNlO1xufSgpKTtcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHdpbmRvdy5Db2xsYXBzZSA9IENvbGxhcHNlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGluaXRDb2xsYXBzZXMoKSB7XG4gICAgZG9jdW1lbnRcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNvbGxhcHNlLXRvZ2dsZV0nKVxuICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAoJHRyaWdnZXJFbCkge1xuICAgICAgICB2YXIgdGFyZ2V0SWQgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1jb2xsYXBzZS10b2dnbGUnKTtcbiAgICAgICAgdmFyICR0YXJnZXRFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldElkKTtcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHRhcmdldCBlbGVtZW50IGV4aXN0c1xuICAgICAgICBpZiAoJHRhcmdldEVsKSB7XG4gICAgICAgICAgICBuZXcgQ29sbGFwc2UoJHRhcmdldEVsLCAkdHJpZ2dlckVsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUaGUgdGFyZ2V0IGVsZW1lbnQgd2l0aCBpZCBcXFwiXCIuY29uY2F0KHRhcmdldElkLCBcIlxcXCIgZG9lcyBub3QgZXhpc3QuIFBsZWFzZSBjaGVjayB0aGUgZGF0YS1jb2xsYXBzZS10b2dnbGUgYXR0cmlidXRlLlwiKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydCBkZWZhdWx0IENvbGxhcHNlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW50ZXJmYWNlLmpzLm1hcCIsImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXR5cGVzLmpzLm1hcCIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgRGVmYXVsdCA9IHtcbiAgICB0cmlnZ2VyVHlwZTogJ2hvdmVyJyxcbiAgICBvblNob3c6IGZ1bmN0aW9uICgpIHsgfSxcbiAgICBvbkhpZGU6IGZ1bmN0aW9uICgpIHsgfSxcbiAgICBvblRvZ2dsZTogZnVuY3Rpb24gKCkgeyB9LFxufTtcbnZhciBEaWFsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERpYWwocGFyZW50RWwsIHRyaWdnZXJFbCwgdGFyZ2V0RWwsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHBhcmVudEVsID09PSB2b2lkIDApIHsgcGFyZW50RWwgPSBudWxsOyB9XG4gICAgICAgIGlmICh0cmlnZ2VyRWwgPT09IHZvaWQgMCkgeyB0cmlnZ2VyRWwgPSBudWxsOyB9XG4gICAgICAgIGlmICh0YXJnZXRFbCA9PT0gdm9pZCAwKSB7IHRhcmdldEVsID0gbnVsbDsgfVxuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSBEZWZhdWx0OyB9XG4gICAgICAgIHRoaXMuX3BhcmVudEVsID0gcGFyZW50RWw7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJFbCA9IHRyaWdnZXJFbDtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwgPSB0YXJnZXRFbDtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBEZWZhdWx0KSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faW5pdCgpO1xuICAgIH1cbiAgICBEaWFsLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuX3RyaWdnZXJFbCkge1xuICAgICAgICAgICAgdmFyIHRyaWdnZXJFdmVudFR5cGVzID0gdGhpcy5fZ2V0VHJpZ2dlckV2ZW50VHlwZXModGhpcy5fb3B0aW9ucy50cmlnZ2VyVHlwZSk7XG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnRUeXBlcy5zaG93RXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3RyaWdnZXJFbC5hZGRFdmVudExpc3RlbmVyKGV2LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNob3coKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBfdGhpcy5fdGFyZ2V0RWwuYWRkRXZlbnRMaXN0ZW5lcihldiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zaG93KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudFR5cGVzLmhpZGVFdmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fcGFyZW50RWwuYWRkRXZlbnRMaXN0ZW5lcihldiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIV90aGlzLl9wYXJlbnRFbC5tYXRjaGVzKCc6aG92ZXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRGlhbC5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgIGlmICh0aGlzLl90cmlnZ2VyRWwpIHtcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl92aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25IaWRlKHRoaXMpO1xuICAgIH07XG4gICAgRGlhbC5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgIGlmICh0aGlzLl90cmlnZ2VyRWwpIHtcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSB0cnVlO1xuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uU2hvdyh0aGlzKTtcbiAgICB9O1xuICAgIERpYWwucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3Zpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERpYWwucHJvdG90eXBlLmlzSGlkZGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuX3Zpc2libGU7XG4gICAgfTtcbiAgICBEaWFsLnByb3RvdHlwZS5pc1Zpc2libGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xuICAgIH07XG4gICAgRGlhbC5wcm90b3R5cGUuX2dldFRyaWdnZXJFdmVudFR5cGVzID0gZnVuY3Rpb24gKHRyaWdnZXJUeXBlKSB7XG4gICAgICAgIHN3aXRjaCAodHJpZ2dlclR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2hvdmVyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzaG93RXZlbnRzOiBbJ21vdXNlZW50ZXInLCAnZm9jdXMnXSxcbiAgICAgICAgICAgICAgICAgICAgaGlkZUV2ZW50czogWydtb3VzZWxlYXZlJywgJ2JsdXInXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAnY2xpY2snOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dFdmVudHM6IFsnY2xpY2snLCAnZm9jdXMnXSxcbiAgICAgICAgICAgICAgICAgICAgaGlkZUV2ZW50czogWydmb2N1c291dCcsICdibHVyJ10sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgJ25vbmUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dFdmVudHM6IFtdLFxuICAgICAgICAgICAgICAgICAgICBoaWRlRXZlbnRzOiBbXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzaG93RXZlbnRzOiBbJ21vdXNlZW50ZXInLCAnZm9jdXMnXSxcbiAgICAgICAgICAgICAgICAgICAgaGlkZUV2ZW50czogWydtb3VzZWxlYXZlJywgJ2JsdXInXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gRGlhbDtcbn0oKSk7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB3aW5kb3cuRGlhbCA9IERpYWw7XG59XG5leHBvcnQgZnVuY3Rpb24gaW5pdERpYWxzKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRpYWwtaW5pdF0nKS5mb3JFYWNoKGZ1bmN0aW9uICgkcGFyZW50RWwpIHtcbiAgICAgICAgdmFyICR0cmlnZ2VyRWwgPSAkcGFyZW50RWwucXVlcnlTZWxlY3RvcignW2RhdGEtZGlhbC10b2dnbGVdJyk7XG4gICAgICAgIGlmICgkdHJpZ2dlckVsKSB7XG4gICAgICAgICAgICB2YXIgZGlhbElkID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGlhbC10b2dnbGUnKTtcbiAgICAgICAgICAgIHZhciAkZGlhbEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGlhbElkKTtcbiAgICAgICAgICAgIGlmICgkZGlhbEVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRyaWdnZXJUeXBlID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGlhbC10cmlnZ2VyJyk7XG4gICAgICAgICAgICAgICAgbmV3IERpYWwoJHBhcmVudEVsLCAkdHJpZ2dlckVsLCAkZGlhbEVsLCB7XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXJUeXBlOiB0cmlnZ2VyVHlwZVxuICAgICAgICAgICAgICAgICAgICAgICAgPyB0cmlnZ2VyVHlwZVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBEZWZhdWx0LnRyaWdnZXJUeXBlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkRpYWwgd2l0aCBpZCBcIi5jb25jYXQoZGlhbElkLCBcIiBkb2VzIG5vdCBleGlzdC4gQXJlIHlvdSBzdXJlIHRoYXQgdGhlIGRhdGEtZGlhbC10b2dnbGUgYXR0cmlidXRlIHBvaW50cyB0byB0aGUgY29ycmVjdCBtb2RhbCBpZD9cIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkRpYWwgd2l0aCBpZCBcIi5jb25jYXQoJHBhcmVudEVsLmlkLCBcIiBkb2VzIG5vdCBoYXZlIGEgdHJpZ2dlciBlbGVtZW50LiBBcmUgeW91IHN1cmUgdGhhdCB0aGUgZGF0YS1kaWFsLXRvZ2dsZSBhdHRyaWJ1dGUgZXhpc3RzP1wiKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydCBkZWZhdWx0IERpYWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnRlcmZhY2UuanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwZXMuanMubWFwIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBEZWZhdWx0ID0ge1xuICAgIHRyYW5zaXRpb246ICd0cmFuc2l0aW9uLW9wYWNpdHknLFxuICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgdGltaW5nOiAnZWFzZS1vdXQnLFxuICAgIG9uSGlkZTogZnVuY3Rpb24gKCkgeyB9LFxufTtcbnZhciBEaXNtaXNzID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERpc21pc3ModGFyZ2V0RWwsIHRyaWdnZXJFbCwgb3B0aW9ucykge1xuICAgICAgICBpZiAodGFyZ2V0RWwgPT09IHZvaWQgMCkgeyB0YXJnZXRFbCA9IG51bGw7IH1cbiAgICAgICAgaWYgKHRyaWdnZXJFbCA9PT0gdm9pZCAwKSB7IHRyaWdnZXJFbCA9IG51bGw7IH1cbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0gRGVmYXVsdDsgfVxuICAgICAgICB0aGlzLl90YXJnZXRFbCA9IHRhcmdldEVsO1xuICAgICAgICB0aGlzLl90cmlnZ2VyRWwgPSB0cmlnZ2VyRWw7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgRGVmYXVsdCksIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgfVxuICAgIERpc21pc3MucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5fdHJpZ2dlckVsKSB7XG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERpc21pc3MucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQodGhpcy5fb3B0aW9ucy50cmFuc2l0aW9uLCBcImR1cmF0aW9uLVwiLmNvbmNhdCh0aGlzLl9vcHRpb25zLmR1cmF0aW9uKSwgdGhpcy5fb3B0aW9ucy50aW1pbmcsICdvcGFjaXR5LTAnKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgIH0sIHRoaXMuX29wdGlvbnMuZHVyYXRpb24pO1xuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uSGlkZSh0aGlzLCB0aGlzLl90YXJnZXRFbCk7XG4gICAgfTtcbiAgICByZXR1cm4gRGlzbWlzcztcbn0oKSk7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB3aW5kb3cuRGlzbWlzcyA9IERpc21pc3M7XG59XG5leHBvcnQgZnVuY3Rpb24gaW5pdERpc21pc3NlcygpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kaXNtaXNzLXRhcmdldF0nKS5mb3JFYWNoKGZ1bmN0aW9uICgkdHJpZ2dlckVsKSB7XG4gICAgICAgIHZhciB0YXJnZXRJZCA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRpc21pc3MtdGFyZ2V0Jyk7XG4gICAgICAgIHZhciAkZGlzbWlzc0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRJZCk7XG4gICAgICAgIGlmICgkZGlzbWlzc0VsKSB7XG4gICAgICAgICAgICBuZXcgRGlzbWlzcygkZGlzbWlzc0VsLCAkdHJpZ2dlckVsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUaGUgZGlzbWlzcyBlbGVtZW50IHdpdGggaWQgXFxcIlwiLmNvbmNhdCh0YXJnZXRJZCwgXCJcXFwiIGRvZXMgbm90IGV4aXN0LiBQbGVhc2UgY2hlY2sgdGhlIGRhdGEtZGlzbWlzcy10YXJnZXQgYXR0cmlidXRlLlwiKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydCBkZWZhdWx0IERpc21pc3M7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnRlcmZhY2UuanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwZXMuanMubWFwIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBEZWZhdWx0ID0ge1xuICAgIHBsYWNlbWVudDogJ2xlZnQnLFxuICAgIGJvZHlTY3JvbGxpbmc6IGZhbHNlLFxuICAgIGJhY2tkcm9wOiB0cnVlLFxuICAgIGVkZ2U6IGZhbHNlLFxuICAgIGVkZ2VPZmZzZXQ6ICdib3R0b20tWzYwcHhdJyxcbiAgICBiYWNrZHJvcENsYXNzZXM6ICdiZy1ncmF5LTkwMCBiZy1vcGFjaXR5LTUwIGRhcms6Ymctb3BhY2l0eS04MCBmaXhlZCBpbnNldC0wIHotMzAnLFxuICAgIG9uU2hvdzogZnVuY3Rpb24gKCkgeyB9LFxuICAgIG9uSGlkZTogZnVuY3Rpb24gKCkgeyB9LFxuICAgIG9uVG9nZ2xlOiBmdW5jdGlvbiAoKSB7IH0sXG59O1xudmFyIERyYXdlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEcmF3ZXIodGFyZ2V0RWwsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRhcmdldEVsID09PSB2b2lkIDApIHsgdGFyZ2V0RWwgPSBudWxsOyB9XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IERlZmF1bHQ7IH1cbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwgPSB0YXJnZXRFbDtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBEZWZhdWx0KSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faW5pdCgpO1xuICAgIH1cbiAgICBEcmF3ZXIucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAvLyBzZXQgaW5pdGlhbCBhY2Nlc3NpYmlsaXR5IGF0dHJpYnV0ZXNcbiAgICAgICAgaWYgKHRoaXMuX3RhcmdldEVsKSB7XG4gICAgICAgICAgICB0aGlzLl90YXJnZXRFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoJ3RyYW5zaXRpb24tdHJhbnNmb3JtJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2V0IGJhc2UgcGxhY2VtZW50IGNsYXNzZXNcbiAgICAgICAgdGhpcy5fZ2V0UGxhY2VtZW50Q2xhc3Nlcyh0aGlzLl9vcHRpb25zLnBsYWNlbWVudCkuYmFzZS5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgIF90aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuYWRkKGMpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gYWRkIGtleWJvYXJkIGV2ZW50IGxpc3RlbmVyIHRvIGRvY3VtZW50XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgJ0VzY2FwZScga2V5IGlzIHByZXNzZWRcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuaXNWaXNpYmxlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIERyYXdlciBpcyB2aXNpYmxlXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmhpZGUoKTsgLy8gaGlkZSB0aGUgRHJhd2VyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIERyYXdlci5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgLy8gYmFzZWQgb24gdGhlIGVkZ2Ugb3B0aW9uIHNob3cgcGxhY2VtZW50IGNsYXNzZXNcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuZWRnZSkge1xuICAgICAgICAgICAgdGhpcy5fZ2V0UGxhY2VtZW50Q2xhc3Nlcyh0aGlzLl9vcHRpb25zLnBsYWNlbWVudCArICctZWRnZScpLmFjdGl2ZS5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZShjKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fZ2V0UGxhY2VtZW50Q2xhc3Nlcyh0aGlzLl9vcHRpb25zLnBsYWNlbWVudCArICctZWRnZScpLmluYWN0aXZlLm1hcChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIF90aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuYWRkKGMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9nZXRQbGFjZW1lbnRDbGFzc2VzKHRoaXMuX29wdGlvbnMucGxhY2VtZW50KS5hY3RpdmUubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoYyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX2dldFBsYWNlbWVudENsYXNzZXModGhpcy5fb3B0aW9ucy5wbGFjZW1lbnQpLmluYWN0aXZlLm1hcChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIF90aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuYWRkKGMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2V0IGFjY2Vzc2liaWxpdHkgYXR0cmlidXRlc1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwucmVtb3ZlQXR0cmlidXRlKCdhcmlhLW1vZGFsJyk7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsLnJlbW92ZUF0dHJpYnV0ZSgncm9sZScpO1xuICAgICAgICAvLyBlbmFibGUgYm9keSBzY3JvbGxcbiAgICAgICAgaWYgKCF0aGlzLl9vcHRpb25zLmJvZHlTY3JvbGxpbmcpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnb3ZlcmZsb3ctaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZGVzdHJveSBiYWNrZHJvcFxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5iYWNrZHJvcCkge1xuICAgICAgICAgICAgdGhpcy5fZGVzdHJveUJhY2tkcm9wRWwoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl92aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25IaWRlKHRoaXMpO1xuICAgIH07XG4gICAgRHJhd2VyLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5lZGdlKSB7XG4gICAgICAgICAgICB0aGlzLl9nZXRQbGFjZW1lbnRDbGFzc2VzKHRoaXMuX29wdGlvbnMucGxhY2VtZW50ICsgJy1lZGdlJykuYWN0aXZlLm1hcChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIF90aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuYWRkKGMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9nZXRQbGFjZW1lbnRDbGFzc2VzKHRoaXMuX29wdGlvbnMucGxhY2VtZW50ICsgJy1lZGdlJykuaW5hY3RpdmUubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoYyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2dldFBsYWNlbWVudENsYXNzZXModGhpcy5fb3B0aW9ucy5wbGFjZW1lbnQpLmFjdGl2ZS5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZChjKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fZ2V0UGxhY2VtZW50Q2xhc3Nlcyh0aGlzLl9vcHRpb25zLnBsYWNlbWVudCkuaW5hY3RpdmUubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoYyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzZXQgYWNjZXNzaWJpbGl0eSBhdHRyaWJ1dGVzXG4gICAgICAgIHRoaXMuX3RhcmdldEVsLnNldEF0dHJpYnV0ZSgnYXJpYS1tb2RhbCcsICd0cnVlJyk7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsLnNldEF0dHJpYnV0ZSgncm9sZScsICdkaWFsb2cnKTtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpO1xuICAgICAgICAvLyBkaXNhYmxlIGJvZHkgc2Nyb2xsXG4gICAgICAgIGlmICghdGhpcy5fb3B0aW9ucy5ib2R5U2Nyb2xsaW5nKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ292ZXJmbG93LWhpZGRlbicpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNob3cgYmFja2Ryb3BcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuYmFja2Ryb3ApIHtcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUJhY2tkcm9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IHRydWU7XG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25TaG93KHRoaXMpO1xuICAgIH07XG4gICAgRHJhd2VyLnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEcmF3ZXIucHJvdG90eXBlLl9jcmVhdGVCYWNrZHJvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoIXRoaXMuX3Zpc2libGUpIHtcbiAgICAgICAgICAgIHZhciBiYWNrZHJvcEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBiYWNrZHJvcEVsLnNldEF0dHJpYnV0ZSgnZHJhd2VyLWJhY2tkcm9wJywgJycpO1xuICAgICAgICAgICAgKF9hID0gYmFja2Ryb3BFbC5jbGFzc0xpc3QpLmFkZC5hcHBseShfYSwgdGhpcy5fb3B0aW9ucy5iYWNrZHJvcENsYXNzZXMuc3BsaXQoJyAnKSk7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kKGJhY2tkcm9wRWwpO1xuICAgICAgICAgICAgYmFja2Ryb3BFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRHJhd2VyLnByb3RvdHlwZS5fZGVzdHJveUJhY2tkcm9wRWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl92aXNpYmxlKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZHJhd2VyLWJhY2tkcm9wXScpLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEcmF3ZXIucHJvdG90eXBlLl9nZXRQbGFjZW1lbnRDbGFzc2VzID0gZnVuY3Rpb24gKHBsYWNlbWVudCkge1xuICAgICAgICBzd2l0Y2ggKHBsYWNlbWVudCkge1xuICAgICAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBiYXNlOiBbJ3RvcC0wJywgJ2xlZnQtMCcsICdyaWdodC0wJ10sXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZTogWyd0cmFuc2Zvcm0tbm9uZSddLFxuICAgICAgICAgICAgICAgICAgICBpbmFjdGl2ZTogWyctdHJhbnNsYXRlLXktZnVsbCddLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgYmFzZTogWydyaWdodC0wJywgJ3RvcC0wJ10sXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZTogWyd0cmFuc2Zvcm0tbm9uZSddLFxuICAgICAgICAgICAgICAgICAgICBpbmFjdGl2ZTogWyd0cmFuc2xhdGUteC1mdWxsJ10sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgYmFzZTogWydib3R0b20tMCcsICdsZWZ0LTAnLCAncmlnaHQtMCddLFxuICAgICAgICAgICAgICAgICAgICBhY3RpdmU6IFsndHJhbnNmb3JtLW5vbmUnXSxcbiAgICAgICAgICAgICAgICAgICAgaW5hY3RpdmU6IFsndHJhbnNsYXRlLXktZnVsbCddLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBiYXNlOiBbJ2xlZnQtMCcsICd0b3AtMCddLFxuICAgICAgICAgICAgICAgICAgICBhY3RpdmU6IFsndHJhbnNmb3JtLW5vbmUnXSxcbiAgICAgICAgICAgICAgICAgICAgaW5hY3RpdmU6IFsnLXRyYW5zbGF0ZS14LWZ1bGwnXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAnYm90dG9tLWVkZ2UnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGJhc2U6IFsnbGVmdC0wJywgJ3RvcC0wJ10sXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZTogWyd0cmFuc2Zvcm0tbm9uZSddLFxuICAgICAgICAgICAgICAgICAgICBpbmFjdGl2ZTogWyd0cmFuc2xhdGUteS1mdWxsJywgdGhpcy5fb3B0aW9ucy5lZGdlT2Zmc2V0XSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBiYXNlOiBbJ2xlZnQtMCcsICd0b3AtMCddLFxuICAgICAgICAgICAgICAgICAgICBhY3RpdmU6IFsndHJhbnNmb3JtLW5vbmUnXSxcbiAgICAgICAgICAgICAgICAgICAgaW5hY3RpdmU6IFsnLXRyYW5zbGF0ZS14LWZ1bGwnXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEcmF3ZXIucHJvdG90eXBlLmlzSGlkZGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuX3Zpc2libGU7XG4gICAgfTtcbiAgICBEcmF3ZXIucHJvdG90eXBlLmlzVmlzaWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XG4gICAgfTtcbiAgICByZXR1cm4gRHJhd2VyO1xufSgpKTtcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHdpbmRvdy5EcmF3ZXIgPSBEcmF3ZXI7XG59XG52YXIgZ2V0RHJhd2VySW5zdGFuY2UgPSBmdW5jdGlvbiAoaWQsIGluc3RhbmNlcykge1xuICAgIGlmIChpbnN0YW5jZXMuc29tZShmdW5jdGlvbiAoZHJhd2VySW5zdGFuY2UpIHsgcmV0dXJuIGRyYXdlckluc3RhbmNlLmlkID09PSBpZDsgfSkpIHtcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlcy5maW5kKGZ1bmN0aW9uIChkcmF3ZXJJbnN0YW5jZSkgeyByZXR1cm4gZHJhd2VySW5zdGFuY2UuaWQgPT09IGlkOyB9KTtcbiAgICB9XG59O1xuZXhwb3J0IGZ1bmN0aW9uIGluaXREcmF3ZXJzKCkge1xuICAgIHZhciBkcmF3ZXJJbnN0YW5jZXMgPSBbXTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kcmF3ZXItdGFyZ2V0XScpLmZvckVhY2goZnVuY3Rpb24gKCR0cmlnZ2VyRWwpIHtcbiAgICAgICAgLy8gbWFuZGF0b3J5XG4gICAgICAgIHZhciBkcmF3ZXJJZCA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRyYXdlci10YXJnZXQnKTtcbiAgICAgICAgdmFyICRkcmF3ZXJFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRyYXdlcklkKTtcbiAgICAgICAgaWYgKCRkcmF3ZXJFbCkge1xuICAgICAgICAgICAgLy8gb3B0aW9uYWxcbiAgICAgICAgICAgIHZhciBwbGFjZW1lbnQgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kcmF3ZXItcGxhY2VtZW50Jyk7XG4gICAgICAgICAgICB2YXIgYm9keVNjcm9sbGluZyA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRyYXdlci1ib2R5LXNjcm9sbGluZycpO1xuICAgICAgICAgICAgdmFyIGJhY2tkcm9wID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZHJhd2VyLWJhY2tkcm9wJyk7XG4gICAgICAgICAgICB2YXIgZWRnZSA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRyYXdlci1lZGdlJyk7XG4gICAgICAgICAgICB2YXIgZWRnZU9mZnNldCA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRyYXdlci1lZGdlLW9mZnNldCcpO1xuICAgICAgICAgICAgaWYgKCFnZXREcmF3ZXJJbnN0YW5jZShkcmF3ZXJJZCwgZHJhd2VySW5zdGFuY2VzKSkge1xuICAgICAgICAgICAgICAgIGRyYXdlckluc3RhbmNlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGRyYXdlcklkLFxuICAgICAgICAgICAgICAgICAgICBvYmplY3Q6IG5ldyBEcmF3ZXIoJGRyYXdlckVsLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudCA/IHBsYWNlbWVudCA6IERlZmF1bHQucGxhY2VtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keVNjcm9sbGluZzogYm9keVNjcm9sbGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYm9keVNjcm9sbGluZyA9PT0gJ3RydWUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBEZWZhdWx0LmJvZHlTY3JvbGxpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZHJvcDogYmFja2Ryb3BcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGJhY2tkcm9wID09PSAndHJ1ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IERlZmF1bHQuYmFja2Ryb3AsXG4gICAgICAgICAgICAgICAgICAgICAgICBlZGdlOiBlZGdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBlZGdlID09PSAndHJ1ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IERlZmF1bHQuZWRnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkZ2VPZmZzZXQ6IGVkZ2VPZmZzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGVkZ2VPZmZzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IERlZmF1bHQuZWRnZU9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRHJhd2VyIHdpdGggaWQgXCIuY29uY2F0KGRyYXdlcklkLCBcIiBub3QgZm91bmQuIEFyZSB5b3Ugc3VyZSB0aGF0IHRoZSBkYXRhLWRyYXdlci10YXJnZXQgYXR0cmlidXRlIHBvaW50cyB0byB0aGUgY29ycmVjdCBkcmF3ZXIgaWQ/XCIpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRyYXdlci10b2dnbGVdJykuZm9yRWFjaChmdW5jdGlvbiAoJHRyaWdnZXJFbCkge1xuICAgICAgICB2YXIgZHJhd2VySWQgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kcmF3ZXItdG9nZ2xlJyk7XG4gICAgICAgIHZhciAkZHJhd2VyRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkcmF3ZXJJZCk7XG4gICAgICAgIGlmICgkZHJhd2VyRWwpIHtcbiAgICAgICAgICAgIHZhciBkcmF3ZXJfMSA9IGdldERyYXdlckluc3RhbmNlKGRyYXdlcklkLCBkcmF3ZXJJbnN0YW5jZXMpO1xuICAgICAgICAgICAgaWYgKGRyYXdlcl8xKSB7XG4gICAgICAgICAgICAgICAgJHRyaWdnZXJFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgZHJhd2VyXzEub2JqZWN0LnRvZ2dsZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkRyYXdlciB3aXRoIGlkIFwiLmNvbmNhdChkcmF3ZXJJZCwgXCIgaGFzIG5vdCBiZWVuIGluaXRpYWxpemVkLiBQbGVhc2UgaW5pdGlhbGl6ZSBpdCB1c2luZyB0aGUgZGF0YS1kcmF3ZXItdGFyZ2V0IGF0dHJpYnV0ZS5cIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkRyYXdlciB3aXRoIGlkIFwiLmNvbmNhdChkcmF3ZXJJZCwgXCIgbm90IGZvdW5kLiBBcmUgeW91IHN1cmUgdGhhdCB0aGUgZGF0YS1kcmF3ZXItdGFyZ2V0IGF0dHJpYnV0ZSBwb2ludHMgdG8gdGhlIGNvcnJlY3QgZHJhd2VyIGlkP1wiKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBkb2N1bWVudFxuICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZHJhd2VyLWRpc21pc3NdLCBbZGF0YS1kcmF3ZXItaGlkZV0nKVxuICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAoJHRyaWdnZXJFbCkge1xuICAgICAgICB2YXIgZHJhd2VySWQgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kcmF3ZXItZGlzbWlzcycpXG4gICAgICAgICAgICA/ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRyYXdlci1kaXNtaXNzJylcbiAgICAgICAgICAgIDogJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZHJhd2VyLWhpZGUnKTtcbiAgICAgICAgdmFyICRkcmF3ZXJFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRyYXdlcklkKTtcbiAgICAgICAgaWYgKCRkcmF3ZXJFbCkge1xuICAgICAgICAgICAgdmFyIGRyYXdlcl8yID0gZ2V0RHJhd2VySW5zdGFuY2UoZHJhd2VySWQsIGRyYXdlckluc3RhbmNlcyk7XG4gICAgICAgICAgICBpZiAoZHJhd2VyXzIpIHtcbiAgICAgICAgICAgICAgICAkdHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBkcmF3ZXJfMi5vYmplY3QuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkRyYXdlciB3aXRoIGlkIFwiLmNvbmNhdChkcmF3ZXJJZCwgXCIgaGFzIG5vdCBiZWVuIGluaXRpYWxpemVkLiBQbGVhc2UgaW5pdGlhbGl6ZSBpdCB1c2luZyB0aGUgZGF0YS1kcmF3ZXItdGFyZ2V0IGF0dHJpYnV0ZS5cIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkRyYXdlciB3aXRoIGlkIFwiLmNvbmNhdChkcmF3ZXJJZCwgXCIgbm90IGZvdW5kLiBBcmUgeW91IHN1cmUgdGhhdCB0aGUgZGF0YS1kcmF3ZXItdGFyZ2V0IGF0dHJpYnV0ZSBwb2ludHMgdG8gdGhlIGNvcnJlY3QgZHJhd2VyIGlkXCIpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRyYXdlci1zaG93XScpLmZvckVhY2goZnVuY3Rpb24gKCR0cmlnZ2VyRWwpIHtcbiAgICAgICAgdmFyIGRyYXdlcklkID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZHJhd2VyLXNob3cnKTtcbiAgICAgICAgdmFyICRkcmF3ZXJFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRyYXdlcklkKTtcbiAgICAgICAgaWYgKCRkcmF3ZXJFbCkge1xuICAgICAgICAgICAgdmFyIGRyYXdlcl8zID0gZ2V0RHJhd2VySW5zdGFuY2UoZHJhd2VySWQsIGRyYXdlckluc3RhbmNlcyk7XG4gICAgICAgICAgICBpZiAoZHJhd2VyXzMpIHtcbiAgICAgICAgICAgICAgICAkdHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBkcmF3ZXJfMy5vYmplY3Quc2hvdygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkRyYXdlciB3aXRoIGlkIFwiLmNvbmNhdChkcmF3ZXJJZCwgXCIgaGFzIG5vdCBiZWVuIGluaXRpYWxpemVkLiBQbGVhc2UgaW5pdGlhbGl6ZSBpdCB1c2luZyB0aGUgZGF0YS1kcmF3ZXItdGFyZ2V0IGF0dHJpYnV0ZS5cIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkRyYXdlciB3aXRoIGlkIFwiLmNvbmNhdChkcmF3ZXJJZCwgXCIgbm90IGZvdW5kLiBBcmUgeW91IHN1cmUgdGhhdCB0aGUgZGF0YS1kcmF3ZXItdGFyZ2V0IGF0dHJpYnV0ZSBwb2ludHMgdG8gdGhlIGNvcnJlY3QgZHJhd2VyIGlkP1wiKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydCBkZWZhdWx0IERyYXdlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWludGVyZmFjZS5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD10eXBlcy5qcy5tYXAiLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSwgcGFjaykge1xuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XG59O1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWVtcHR5LWZ1bmN0aW9uICovXG5pbXBvcnQgeyBjcmVhdGVQb3BwZXIgfSBmcm9tICdAcG9wcGVyanMvY29yZSc7XG52YXIgRGVmYXVsdCA9IHtcbiAgICBwbGFjZW1lbnQ6ICdib3R0b20nLFxuICAgIHRyaWdnZXJUeXBlOiAnY2xpY2snLFxuICAgIG9mZnNldFNraWRkaW5nOiAwLFxuICAgIG9mZnNldERpc3RhbmNlOiAxMCxcbiAgICBkZWxheTogMzAwLFxuICAgIG9uU2hvdzogZnVuY3Rpb24gKCkgeyB9LFxuICAgIG9uSGlkZTogZnVuY3Rpb24gKCkgeyB9LFxuICAgIG9uVG9nZ2xlOiBmdW5jdGlvbiAoKSB7IH0sXG59O1xudmFyIERyb3Bkb3duID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERyb3Bkb3duKHRhcmdldEVsZW1lbnQsIHRyaWdnZXJFbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAgIGlmICh0YXJnZXRFbGVtZW50ID09PSB2b2lkIDApIHsgdGFyZ2V0RWxlbWVudCA9IG51bGw7IH1cbiAgICAgICAgaWYgKHRyaWdnZXJFbGVtZW50ID09PSB2b2lkIDApIHsgdHJpZ2dlckVsZW1lbnQgPSBudWxsOyB9XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IERlZmF1bHQ7IH1cbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwgPSB0YXJnZXRFbGVtZW50O1xuICAgICAgICB0aGlzLl90cmlnZ2VyRWwgPSB0cmlnZ2VyRWxlbWVudDtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBEZWZhdWx0KSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX3BvcHBlckluc3RhbmNlID0gdGhpcy5fY3JlYXRlUG9wcGVySW5zdGFuY2UoKTtcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgfVxuICAgIERyb3Bkb3duLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3RyaWdnZXJFbCkge1xuICAgICAgICAgICAgdGhpcy5fc2V0dXBFdmVudExpc3RlbmVycygpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEcm9wZG93bi5wcm90b3R5cGUuX3NldHVwRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciB0cmlnZ2VyRXZlbnRzID0gdGhpcy5fZ2V0VHJpZ2dlckV2ZW50cygpO1xuICAgICAgICAvLyBjbGljayBldmVudCBoYW5kbGluZyBmb3IgdHJpZ2dlciBlbGVtZW50XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRyaWdnZXJUeXBlID09PSAnY2xpY2snKSB7XG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnRzLnNob3dFdmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fdHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudG9nZ2xlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBob3ZlciBldmVudCBoYW5kbGluZyBmb3IgdHJpZ2dlciBlbGVtZW50XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRyaWdnZXJUeXBlID09PSAnaG92ZXInKSB7XG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnRzLnNob3dFdmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fdHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ID09PSAnY2xpY2snKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy50b2dnbGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIF90aGlzLl9vcHRpb25zLmRlbGF5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIF90aGlzLl90YXJnZXRFbC5hZGRFdmVudExpc3RlbmVyKGV2LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNob3coKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50cy5oaWRlRXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3RyaWdnZXJFbC5hZGRFdmVudExpc3RlbmVyKGV2LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5fdGFyZ2V0RWwubWF0Y2hlcygnOmhvdmVyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIF90aGlzLl9vcHRpb25zLmRlbGF5KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBfdGhpcy5fdGFyZ2V0RWwuYWRkRXZlbnRMaXN0ZW5lcihldiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghX3RoaXMuX3RyaWdnZXJFbC5tYXRjaGVzKCc6aG92ZXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgX3RoaXMuX29wdGlvbnMuZGVsYXkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERyb3Bkb3duLnByb3RvdHlwZS5fY3JlYXRlUG9wcGVySW5zdGFuY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVQb3BwZXIodGhpcy5fdHJpZ2dlckVsLCB0aGlzLl90YXJnZXRFbCwge1xuICAgICAgICAgICAgcGxhY2VtZW50OiB0aGlzLl9vcHRpb25zLnBsYWNlbWVudCxcbiAgICAgICAgICAgIG1vZGlmaWVyczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ29mZnNldCcsXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldDogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMub2Zmc2V0U2tpZGRpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5vZmZzZXREaXN0YW5jZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRHJvcGRvd24ucHJvdG90eXBlLl9zZXR1cENsaWNrT3V0c2lkZUxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl9jbGlja091dHNpZGVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBfdGhpcy5faGFuZGxlQ2xpY2tPdXRzaWRlKGV2LCBfdGhpcy5fdGFyZ2V0RWwpO1xuICAgICAgICB9O1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fY2xpY2tPdXRzaWRlRXZlbnRMaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcbiAgICBEcm9wZG93bi5wcm90b3R5cGUuX3JlbW92ZUNsaWNrT3V0c2lkZUxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fY2xpY2tPdXRzaWRlRXZlbnRMaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcbiAgICBEcm9wZG93bi5wcm90b3R5cGUuX2hhbmRsZUNsaWNrT3V0c2lkZSA9IGZ1bmN0aW9uIChldiwgdGFyZ2V0RWwpIHtcbiAgICAgICAgdmFyIGNsaWNrZWRFbCA9IGV2LnRhcmdldDtcbiAgICAgICAgaWYgKGNsaWNrZWRFbCAhPT0gdGFyZ2V0RWwgJiZcbiAgICAgICAgICAgICF0YXJnZXRFbC5jb250YWlucyhjbGlja2VkRWwpICYmXG4gICAgICAgICAgICAhdGhpcy5fdHJpZ2dlckVsLmNvbnRhaW5zKGNsaWNrZWRFbCkgJiZcbiAgICAgICAgICAgIHRoaXMuaXNWaXNpYmxlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEcm9wZG93bi5wcm90b3R5cGUuX2dldFRyaWdnZXJFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5fb3B0aW9ucy50cmlnZ2VyVHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnaG92ZXInOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dFdmVudHM6IFsnbW91c2VlbnRlcicsICdjbGljayddLFxuICAgICAgICAgICAgICAgICAgICBoaWRlRXZlbnRzOiBbJ21vdXNlbGVhdmUnXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAnY2xpY2snOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dFdmVudHM6IFsnY2xpY2snXSxcbiAgICAgICAgICAgICAgICAgICAgaGlkZUV2ZW50czogW10sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgJ25vbmUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dFdmVudHM6IFtdLFxuICAgICAgICAgICAgICAgICAgICBoaWRlRXZlbnRzOiBbXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzaG93RXZlbnRzOiBbJ2NsaWNrJ10sXG4gICAgICAgICAgICAgICAgICAgIGhpZGVFdmVudHM6IFtdLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERyb3Bkb3duLnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX29wdGlvbnMub25Ub2dnbGUodGhpcyk7XG4gICAgfTtcbiAgICBEcm9wZG93bi5wcm90b3R5cGUuaXNWaXNpYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcbiAgICB9O1xuICAgIERyb3Bkb3duLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCgnYmxvY2snKTtcbiAgICAgICAgLy8gRW5hYmxlIHRoZSBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgdGhpcy5fcG9wcGVySW5zdGFuY2Uuc2V0T3B0aW9ucyhmdW5jdGlvbiAob3B0aW9ucykgeyByZXR1cm4gKF9fYXNzaWduKF9fYXNzaWduKHt9LCBvcHRpb25zKSwgeyBtb2RpZmllcnM6IF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShbXSwgb3B0aW9ucy5tb2RpZmllcnMsIHRydWUpLCBbXG4gICAgICAgICAgICAgICAgeyBuYW1lOiAnZXZlbnRMaXN0ZW5lcnMnLCBlbmFibGVkOiB0cnVlIH0sXG4gICAgICAgICAgICBdLCBmYWxzZSkgfSkpOyB9KTtcbiAgICAgICAgdGhpcy5fc2V0dXBDbGlja091dHNpZGVMaXN0ZW5lcigpO1xuICAgICAgICAvLyBVcGRhdGUgaXRzIHBvc2l0aW9uXG4gICAgICAgIHRoaXMuX3BvcHBlckluc3RhbmNlLnVwZGF0ZSgpO1xuICAgICAgICB0aGlzLl92aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vblNob3codGhpcyk7XG4gICAgfTtcbiAgICBEcm9wZG93bi5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZSgnYmxvY2snKTtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgIC8vIERpc2FibGUgdGhlIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICB0aGlzLl9wb3BwZXJJbnN0YW5jZS5zZXRPcHRpb25zKGZ1bmN0aW9uIChvcHRpb25zKSB7IHJldHVybiAoX19hc3NpZ24oX19hc3NpZ24oe30sIG9wdGlvbnMpLCB7IG1vZGlmaWVyczogX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KFtdLCBvcHRpb25zLm1vZGlmaWVycywgdHJ1ZSksIFtcbiAgICAgICAgICAgICAgICB7IG5hbWU6ICdldmVudExpc3RlbmVycycsIGVuYWJsZWQ6IGZhbHNlIH0sXG4gICAgICAgICAgICBdLCBmYWxzZSkgfSkpOyB9KTtcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9yZW1vdmVDbGlja091dHNpZGVMaXN0ZW5lcigpO1xuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uSGlkZSh0aGlzKTtcbiAgICB9O1xuICAgIHJldHVybiBEcm9wZG93bjtcbn0oKSk7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB3aW5kb3cuRHJvcGRvd24gPSBEcm9wZG93bjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpbml0RHJvcGRvd25zKCkge1xuICAgIGRvY3VtZW50XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kcm9wZG93bi10b2dnbGVdJylcbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKCR0cmlnZ2VyRWwpIHtcbiAgICAgICAgdmFyIGRyb3Bkb3duSWQgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kcm9wZG93bi10b2dnbGUnKTtcbiAgICAgICAgdmFyICRkcm9wZG93bkVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZHJvcGRvd25JZCk7XG4gICAgICAgIGlmICgkZHJvcGRvd25FbCkge1xuICAgICAgICAgICAgdmFyIHBsYWNlbWVudCA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRyb3Bkb3duLXBsYWNlbWVudCcpO1xuICAgICAgICAgICAgdmFyIG9mZnNldFNraWRkaW5nID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZHJvcGRvd24tb2Zmc2V0LXNraWRkaW5nJyk7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0RGlzdGFuY2UgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kcm9wZG93bi1vZmZzZXQtZGlzdGFuY2UnKTtcbiAgICAgICAgICAgIHZhciB0cmlnZ2VyVHlwZSA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRyb3Bkb3duLXRyaWdnZXInKTtcbiAgICAgICAgICAgIHZhciBkZWxheSA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRyb3Bkb3duLWRlbGF5Jyk7XG4gICAgICAgICAgICBuZXcgRHJvcGRvd24oJGRyb3Bkb3duRWwsICR0cmlnZ2VyRWwsIHtcbiAgICAgICAgICAgICAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudCA/IHBsYWNlbWVudCA6IERlZmF1bHQucGxhY2VtZW50LFxuICAgICAgICAgICAgICAgIHRyaWdnZXJUeXBlOiB0cmlnZ2VyVHlwZVxuICAgICAgICAgICAgICAgICAgICA/IHRyaWdnZXJUeXBlXG4gICAgICAgICAgICAgICAgICAgIDogRGVmYXVsdC50cmlnZ2VyVHlwZSxcbiAgICAgICAgICAgICAgICBvZmZzZXRTa2lkZGluZzogb2Zmc2V0U2tpZGRpbmdcbiAgICAgICAgICAgICAgICAgICAgPyBwYXJzZUludChvZmZzZXRTa2lkZGluZylcbiAgICAgICAgICAgICAgICAgICAgOiBEZWZhdWx0Lm9mZnNldFNraWRkaW5nLFxuICAgICAgICAgICAgICAgIG9mZnNldERpc3RhbmNlOiBvZmZzZXREaXN0YW5jZVxuICAgICAgICAgICAgICAgICAgICA/IHBhcnNlSW50KG9mZnNldERpc3RhbmNlKVxuICAgICAgICAgICAgICAgICAgICA6IERlZmF1bHQub2Zmc2V0RGlzdGFuY2UsXG4gICAgICAgICAgICAgICAgZGVsYXk6IGRlbGF5ID8gcGFyc2VJbnQoZGVsYXkpIDogRGVmYXVsdC5kZWxheSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlRoZSBkcm9wZG93biBlbGVtZW50IHdpdGggaWQgXFxcIlwiLmNvbmNhdChkcm9wZG93bklkLCBcIlxcXCIgZG9lcyBub3QgZXhpc3QuIFBsZWFzZSBjaGVjayB0aGUgZGF0YS1kcm9wZG93bi10b2dnbGUgYXR0cmlidXRlLlwiKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydCBkZWZhdWx0IERyb3Bkb3duO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW50ZXJmYWNlLmpzLm1hcCIsImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXR5cGVzLmpzLm1hcCIsImltcG9ydCB7IGluaXRBY2NvcmRpb25zIH0gZnJvbSAnLi9hY2NvcmRpb24nO1xuaW1wb3J0IHsgaW5pdENhcm91c2VscyB9IGZyb20gJy4vY2Fyb3VzZWwnO1xuaW1wb3J0IHsgaW5pdENvbGxhcHNlcyB9IGZyb20gJy4vY29sbGFwc2UnO1xuaW1wb3J0IHsgaW5pdERpYWxzIH0gZnJvbSAnLi9kaWFsJztcbmltcG9ydCB7IGluaXREaXNtaXNzZXMgfSBmcm9tICcuL2Rpc21pc3MnO1xuaW1wb3J0IHsgaW5pdERyYXdlcnMgfSBmcm9tICcuL2RyYXdlcic7XG5pbXBvcnQgeyBpbml0RHJvcGRvd25zIH0gZnJvbSAnLi9kcm9wZG93bic7XG5pbXBvcnQgeyBpbml0TW9kYWxzIH0gZnJvbSAnLi9tb2RhbCc7XG5pbXBvcnQgeyBpbml0UG9wb3ZlcnMgfSBmcm9tICcuL3BvcG92ZXInO1xuaW1wb3J0IHsgaW5pdFRhYnMgfSBmcm9tICcuL3RhYnMnO1xuaW1wb3J0IHsgaW5pdFRvb2x0aXBzIH0gZnJvbSAnLi90b29sdGlwJztcbmV4cG9ydCBmdW5jdGlvbiBpbml0Rmxvd2JpdGUoKSB7XG4gICAgaW5pdEFjY29yZGlvbnMoKTtcbiAgICBpbml0Q29sbGFwc2VzKCk7XG4gICAgaW5pdENhcm91c2VscygpO1xuICAgIGluaXREaXNtaXNzZXMoKTtcbiAgICBpbml0RHJvcGRvd25zKCk7XG4gICAgaW5pdE1vZGFscygpO1xuICAgIGluaXREcmF3ZXJzKCk7XG4gICAgaW5pdFRhYnMoKTtcbiAgICBpbml0VG9vbHRpcHMoKTtcbiAgICBpbml0UG9wb3ZlcnMoKTtcbiAgICBpbml0RGlhbHMoKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgRGVmYXVsdCA9IHtcbiAgICBwbGFjZW1lbnQ6ICdjZW50ZXInLFxuICAgIGJhY2tkcm9wQ2xhc3NlczogJ2JnLWdyYXktOTAwIGJnLW9wYWNpdHktNTAgZGFyazpiZy1vcGFjaXR5LTgwIGZpeGVkIGluc2V0LTAgei00MCcsXG4gICAgYmFja2Ryb3A6ICdkeW5hbWljJyxcbiAgICBjbG9zYWJsZTogdHJ1ZSxcbiAgICBvbkhpZGU6IGZ1bmN0aW9uICgpIHsgfSxcbiAgICBvblNob3c6IGZ1bmN0aW9uICgpIHsgfSxcbiAgICBvblRvZ2dsZTogZnVuY3Rpb24gKCkgeyB9LFxufTtcbnZhciBNb2RhbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNb2RhbCh0YXJnZXRFbCwgb3B0aW9ucykge1xuICAgICAgICBpZiAodGFyZ2V0RWwgPT09IHZvaWQgMCkgeyB0YXJnZXRFbCA9IG51bGw7IH1cbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0gRGVmYXVsdDsgfVxuICAgICAgICB0aGlzLl90YXJnZXRFbCA9IHRhcmdldEVsO1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gX19hc3NpZ24oX19hc3NpZ24oe30sIERlZmF1bHQpLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5faXNIaWRkZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLl9iYWNrZHJvcEVsID0gbnVsbDtcbiAgICAgICAgdGhpcy5faW5pdCgpO1xuICAgIH1cbiAgICBNb2RhbC5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLl90YXJnZXRFbCkge1xuICAgICAgICAgICAgdGhpcy5fZ2V0UGxhY2VtZW50Q2xhc3NlcygpLm1hcChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIF90aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuYWRkKGMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE1vZGFsLnByb3RvdHlwZS5fY3JlYXRlQmFja2Ryb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHRoaXMuX2lzSGlkZGVuKSB7XG4gICAgICAgICAgICB2YXIgYmFja2Ryb3BFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgYmFja2Ryb3BFbC5zZXRBdHRyaWJ1dGUoJ21vZGFsLWJhY2tkcm9wJywgJycpO1xuICAgICAgICAgICAgKF9hID0gYmFja2Ryb3BFbC5jbGFzc0xpc3QpLmFkZC5hcHBseShfYSwgdGhpcy5fb3B0aW9ucy5iYWNrZHJvcENsYXNzZXMuc3BsaXQoJyAnKSk7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kKGJhY2tkcm9wRWwpO1xuICAgICAgICAgICAgdGhpcy5fYmFja2Ryb3BFbCA9IGJhY2tkcm9wRWw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE1vZGFsLnByb3RvdHlwZS5fZGVzdHJveUJhY2tkcm9wRWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5faXNIaWRkZW4pIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1ttb2RhbC1iYWNrZHJvcF0nKS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTW9kYWwucHJvdG90eXBlLl9zZXR1cE1vZGFsQ2xvc2VFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuYmFja2Ryb3AgPT09ICdkeW5hbWljJykge1xuICAgICAgICAgICAgdGhpcy5fY2xpY2tPdXRzaWRlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgICAgIF90aGlzLl9oYW5kbGVPdXRzaWRlQ2xpY2soZXYudGFyZ2V0KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLl90YXJnZXRFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2NsaWNrT3V0c2lkZUV2ZW50TGlzdGVuZXIsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2tleWRvd25FdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBpZiAoZXYua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fa2V5ZG93bkV2ZW50TGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG4gICAgTW9kYWwucHJvdG90eXBlLl9yZW1vdmVNb2RhbENsb3NlRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmJhY2tkcm9wID09PSAnZHluYW1pYycpIHtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldEVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fY2xpY2tPdXRzaWRlRXZlbnRMaXN0ZW5lciwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fa2V5ZG93bkV2ZW50TGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG4gICAgTW9kYWwucHJvdG90eXBlLl9oYW5kbGVPdXRzaWRlQ2xpY2sgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIGlmICh0YXJnZXQgPT09IHRoaXMuX3RhcmdldEVsIHx8XG4gICAgICAgICAgICAodGFyZ2V0ID09PSB0aGlzLl9iYWNrZHJvcEVsICYmIHRoaXMuaXNWaXNpYmxlKCkpKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTW9kYWwucHJvdG90eXBlLl9nZXRQbGFjZW1lbnRDbGFzc2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuX29wdGlvbnMucGxhY2VtZW50KSB7XG4gICAgICAgICAgICAvLyB0b3BcbiAgICAgICAgICAgIGNhc2UgJ3RvcC1sZWZ0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gWydqdXN0aWZ5LXN0YXJ0JywgJ2l0ZW1zLXN0YXJ0J107XG4gICAgICAgICAgICBjYXNlICd0b3AtY2VudGVyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gWydqdXN0aWZ5LWNlbnRlcicsICdpdGVtcy1zdGFydCddO1xuICAgICAgICAgICAgY2FzZSAndG9wLXJpZ2h0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gWydqdXN0aWZ5LWVuZCcsICdpdGVtcy1zdGFydCddO1xuICAgICAgICAgICAgLy8gY2VudGVyXG4gICAgICAgICAgICBjYXNlICdjZW50ZXItbGVmdCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnanVzdGlmeS1zdGFydCcsICdpdGVtcy1jZW50ZXInXTtcbiAgICAgICAgICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnanVzdGlmeS1jZW50ZXInLCAnaXRlbXMtY2VudGVyJ107XG4gICAgICAgICAgICBjYXNlICdjZW50ZXItcmlnaHQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBbJ2p1c3RpZnktZW5kJywgJ2l0ZW1zLWNlbnRlciddO1xuICAgICAgICAgICAgLy8gYm90dG9tXG4gICAgICAgICAgICBjYXNlICdib3R0b20tbGVmdCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnanVzdGlmeS1zdGFydCcsICdpdGVtcy1lbmQnXTtcbiAgICAgICAgICAgIGNhc2UgJ2JvdHRvbS1jZW50ZXInOlxuICAgICAgICAgICAgICAgIHJldHVybiBbJ2p1c3RpZnktY2VudGVyJywgJ2l0ZW1zLWVuZCddO1xuICAgICAgICAgICAgY2FzZSAnYm90dG9tLXJpZ2h0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gWydqdXN0aWZ5LWVuZCcsICdpdGVtcy1lbmQnXTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnanVzdGlmeS1jZW50ZXInLCAnaXRlbXMtY2VudGVyJ107XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE1vZGFsLnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0hpZGRlbikge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uVG9nZ2xlKHRoaXMpO1xuICAgIH07XG4gICAgTW9kYWwucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzSGlkZGVuKSB7XG4gICAgICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuYWRkKCdmbGV4Jyk7XG4gICAgICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldEVsLnNldEF0dHJpYnV0ZSgnYXJpYS1tb2RhbCcsICd0cnVlJyk7XG4gICAgICAgICAgICB0aGlzLl90YXJnZXRFbC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnZGlhbG9nJyk7XG4gICAgICAgICAgICB0aGlzLl90YXJnZXRFbC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJyk7XG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVCYWNrZHJvcCgpO1xuICAgICAgICAgICAgdGhpcy5faXNIaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIHByZXZlbnQgYm9keSBzY3JvbGxcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnb3ZlcmZsb3ctaGlkZGVuJyk7XG4gICAgICAgICAgICAvLyBBZGQga2V5Ym9hcmQgZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGRvY3VtZW50XG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5jbG9zYWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NldHVwTW9kYWxDbG9zZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5vblNob3codGhpcyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE1vZGFsLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pc1Zpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZSgnZmxleCcpO1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0RWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICAgICAgICB0aGlzLl90YXJnZXRFbC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtbW9kYWwnKTtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldEVsLnJlbW92ZUF0dHJpYnV0ZSgncm9sZScpO1xuICAgICAgICAgICAgdGhpcy5fZGVzdHJveUJhY2tkcm9wRWwoKTtcbiAgICAgICAgICAgIHRoaXMuX2lzSGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vIHJlLWFwcGx5IGJvZHkgc2Nyb2xsXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ292ZXJmbG93LWhpZGRlbicpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuY2xvc2FibGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVNb2RhbENsb3NlRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLm9uSGlkZSh0aGlzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTW9kYWwucHJvdG90eXBlLmlzVmlzaWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLl9pc0hpZGRlbjtcbiAgICB9O1xuICAgIE1vZGFsLnByb3RvdHlwZS5pc0hpZGRlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzSGlkZGVuO1xuICAgIH07XG4gICAgcmV0dXJuIE1vZGFsO1xufSgpKTtcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHdpbmRvdy5Nb2RhbCA9IE1vZGFsO1xufVxudmFyIGdldE1vZGFsSW5zdGFuY2UgPSBmdW5jdGlvbiAoaWQsIGluc3RhbmNlcykge1xuICAgIGlmIChpbnN0YW5jZXMuc29tZShmdW5jdGlvbiAobW9kYWxJbnN0YW5jZSkgeyByZXR1cm4gbW9kYWxJbnN0YW5jZS5pZCA9PT0gaWQ7IH0pKSB7XG4gICAgICAgIHJldHVybiBpbnN0YW5jZXMuZmluZChmdW5jdGlvbiAobW9kYWxJbnN0YW5jZSkgeyByZXR1cm4gbW9kYWxJbnN0YW5jZS5pZCA9PT0gaWQ7IH0pO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5leHBvcnQgZnVuY3Rpb24gaW5pdE1vZGFscygpIHtcbiAgICB2YXIgbW9kYWxJbnN0YW5jZXMgPSBbXTtcbiAgICAvLyBpbml0aWF0ZSBtb2RhbCBiYXNlZCBvbiBkYXRhLW1vZGFsLXRhcmdldFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW1vZGFsLXRhcmdldF0nKS5mb3JFYWNoKGZ1bmN0aW9uICgkdHJpZ2dlckVsKSB7XG4gICAgICAgIHZhciBtb2RhbElkID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbW9kYWwtdGFyZ2V0Jyk7XG4gICAgICAgIHZhciAkbW9kYWxFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG1vZGFsSWQpO1xuICAgICAgICBpZiAoJG1vZGFsRWwpIHtcbiAgICAgICAgICAgIHZhciBwbGFjZW1lbnQgPSAkbW9kYWxFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbW9kYWwtcGxhY2VtZW50Jyk7XG4gICAgICAgICAgICB2YXIgYmFja2Ryb3AgPSAkbW9kYWxFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbW9kYWwtYmFja2Ryb3AnKTtcbiAgICAgICAgICAgIGlmICghZ2V0TW9kYWxJbnN0YW5jZShtb2RhbElkLCBtb2RhbEluc3RhbmNlcykpIHtcbiAgICAgICAgICAgICAgICBtb2RhbEluc3RhbmNlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IG1vZGFsSWQsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdDogbmV3IE1vZGFsKCRtb2RhbEVsLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gcGxhY2VtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBEZWZhdWx0LnBsYWNlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tkcm9wOiBiYWNrZHJvcCA/IGJhY2tkcm9wIDogRGVmYXVsdC5iYWNrZHJvcCxcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTW9kYWwgd2l0aCBpZCBcIi5jb25jYXQobW9kYWxJZCwgXCIgZG9lcyBub3QgZXhpc3QuIEFyZSB5b3Ugc3VyZSB0aGF0IHRoZSBkYXRhLW1vZGFsLXRhcmdldCBhdHRyaWJ1dGUgcG9pbnRzIHRvIHRoZSBjb3JyZWN0IG1vZGFsIGlkPy5cIikpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gc3VwcG9ydCBwcmUgdjEuNi4wIGRhdGEtbW9kYWwtdG9nZ2xlIGluaXRpYWxpemF0aW9uXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbW9kYWwtdG9nZ2xlXScpLmZvckVhY2goZnVuY3Rpb24gKCR0cmlnZ2VyRWwpIHtcbiAgICAgICAgdmFyIG1vZGFsSWQgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1tb2RhbC10b2dnbGUnKTtcbiAgICAgICAgdmFyICRtb2RhbEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobW9kYWxJZCk7XG4gICAgICAgIGlmICgkbW9kYWxFbCkge1xuICAgICAgICAgICAgdmFyIHBsYWNlbWVudCA9ICRtb2RhbEVsLmdldEF0dHJpYnV0ZSgnZGF0YS1tb2RhbC1wbGFjZW1lbnQnKTtcbiAgICAgICAgICAgIHZhciBiYWNrZHJvcCA9ICRtb2RhbEVsLmdldEF0dHJpYnV0ZSgnZGF0YS1tb2RhbC1iYWNrZHJvcCcpO1xuICAgICAgICAgICAgdmFyIG1vZGFsXzEgPSBnZXRNb2RhbEluc3RhbmNlKG1vZGFsSWQsIG1vZGFsSW5zdGFuY2VzKTtcbiAgICAgICAgICAgIGlmICghbW9kYWxfMSkge1xuICAgICAgICAgICAgICAgIG1vZGFsXzEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBtb2RhbElkLFxuICAgICAgICAgICAgICAgICAgICBvYmplY3Q6IG5ldyBNb2RhbCgkbW9kYWxFbCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50OiBwbGFjZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHBsYWNlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogRGVmYXVsdC5wbGFjZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZHJvcDogYmFja2Ryb3AgPyBiYWNrZHJvcCA6IERlZmF1bHQuYmFja2Ryb3AsXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbW9kYWxJbnN0YW5jZXMucHVzaChtb2RhbF8xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICR0cmlnZ2VyRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbW9kYWxfMS5vYmplY3QudG9nZ2xlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNb2RhbCB3aXRoIGlkIFwiLmNvbmNhdChtb2RhbElkLCBcIiBkb2VzIG5vdCBleGlzdC4gQXJlIHlvdSBzdXJlIHRoYXQgdGhlIGRhdGEtbW9kYWwtdG9nZ2xlIGF0dHJpYnV0ZSBwb2ludHMgdG8gdGhlIGNvcnJlY3QgbW9kYWwgaWQ/XCIpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIHNob3cgbW9kYWwgb24gY2xpY2sgaWYgZXhpc3RzIGJhc2VkIG9uIGlkXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbW9kYWwtc2hvd10nKS5mb3JFYWNoKGZ1bmN0aW9uICgkdHJpZ2dlckVsKSB7XG4gICAgICAgIHZhciBtb2RhbElkID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbW9kYWwtc2hvdycpO1xuICAgICAgICB2YXIgJG1vZGFsRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChtb2RhbElkKTtcbiAgICAgICAgaWYgKCRtb2RhbEVsKSB7XG4gICAgICAgICAgICB2YXIgbW9kYWxfMiA9IGdldE1vZGFsSW5zdGFuY2UobW9kYWxJZCwgbW9kYWxJbnN0YW5jZXMpO1xuICAgICAgICAgICAgaWYgKG1vZGFsXzIpIHtcbiAgICAgICAgICAgICAgICAkdHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobW9kYWxfMi5vYmplY3QuaXNIaWRkZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsXzIub2JqZWN0LnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1vZGFsIHdpdGggaWQgXCIuY29uY2F0KG1vZGFsSWQsIFwiIGhhcyBub3QgYmVlbiBpbml0aWFsaXplZC4gUGxlYXNlIGluaXRpYWxpemUgaXQgdXNpbmcgdGhlIGRhdGEtbW9kYWwtdGFyZ2V0IGF0dHJpYnV0ZS5cIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1vZGFsIHdpdGggaWQgXCIuY29uY2F0KG1vZGFsSWQsIFwiIGRvZXMgbm90IGV4aXN0LiBBcmUgeW91IHN1cmUgdGhhdCB0aGUgZGF0YS1tb2RhbC1zaG93IGF0dHJpYnV0ZSBwb2ludHMgdG8gdGhlIGNvcnJlY3QgbW9kYWwgaWQ/XCIpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIGhpZGUgbW9kYWwgb24gY2xpY2sgaWYgZXhpc3RzIGJhc2VkIG9uIGlkXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbW9kYWwtaGlkZV0nKS5mb3JFYWNoKGZ1bmN0aW9uICgkdHJpZ2dlckVsKSB7XG4gICAgICAgIHZhciBtb2RhbElkID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbW9kYWwtaGlkZScpO1xuICAgICAgICB2YXIgJG1vZGFsRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChtb2RhbElkKTtcbiAgICAgICAgaWYgKCRtb2RhbEVsKSB7XG4gICAgICAgICAgICB2YXIgbW9kYWxfMyA9IGdldE1vZGFsSW5zdGFuY2UobW9kYWxJZCwgbW9kYWxJbnN0YW5jZXMpO1xuICAgICAgICAgICAgaWYgKG1vZGFsXzMpIHtcbiAgICAgICAgICAgICAgICAkdHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobW9kYWxfMy5vYmplY3QuaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RhbF8zLm9iamVjdC5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNb2RhbCB3aXRoIGlkIFwiLmNvbmNhdChtb2RhbElkLCBcIiBoYXMgbm90IGJlZW4gaW5pdGlhbGl6ZWQuIFBsZWFzZSBpbml0aWFsaXplIGl0IHVzaW5nIHRoZSBkYXRhLW1vZGFsLXRhcmdldCBhdHRyaWJ1dGUuXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNb2RhbCB3aXRoIGlkIFwiLmNvbmNhdChtb2RhbElkLCBcIiBkb2VzIG5vdCBleGlzdC4gQXJlIHlvdSBzdXJlIHRoYXQgdGhlIGRhdGEtbW9kYWwtaGlkZSBhdHRyaWJ1dGUgcG9pbnRzIHRvIHRoZSBjb3JyZWN0IG1vZGFsIGlkP1wiKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydCBkZWZhdWx0IE1vZGFsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW50ZXJmYWNlLmpzLm1hcCIsImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXR5cGVzLmpzLm1hcCIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tLCBwYWNrKSB7XG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcbn07XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb24gKi9cbmltcG9ydCB7IGNyZWF0ZVBvcHBlciB9IGZyb20gJ0Bwb3BwZXJqcy9jb3JlJztcbnZhciBEZWZhdWx0ID0ge1xuICAgIHBsYWNlbWVudDogJ3RvcCcsXG4gICAgb2Zmc2V0OiAxMCxcbiAgICB0cmlnZ2VyVHlwZTogJ2hvdmVyJyxcbiAgICBvblNob3c6IGZ1bmN0aW9uICgpIHsgfSxcbiAgICBvbkhpZGU6IGZ1bmN0aW9uICgpIHsgfSxcbiAgICBvblRvZ2dsZTogZnVuY3Rpb24gKCkgeyB9LFxufTtcbnZhciBQb3BvdmVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBvcG92ZXIodGFyZ2V0RWwsIHRyaWdnZXJFbCwgb3B0aW9ucykge1xuICAgICAgICBpZiAodGFyZ2V0RWwgPT09IHZvaWQgMCkgeyB0YXJnZXRFbCA9IG51bGw7IH1cbiAgICAgICAgaWYgKHRyaWdnZXJFbCA9PT0gdm9pZCAwKSB7IHRyaWdnZXJFbCA9IG51bGw7IH1cbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0gRGVmYXVsdDsgfVxuICAgICAgICB0aGlzLl90YXJnZXRFbCA9IHRhcmdldEVsO1xuICAgICAgICB0aGlzLl90cmlnZ2VyRWwgPSB0cmlnZ2VyRWw7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgRGVmYXVsdCksIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9wb3BwZXJJbnN0YW5jZSA9IHRoaXMuX2NyZWF0ZVBvcHBlckluc3RhbmNlKCk7XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faW5pdCgpO1xuICAgIH1cbiAgICBQb3BvdmVyLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3RyaWdnZXJFbCkge1xuICAgICAgICAgICAgdGhpcy5fc2V0dXBFdmVudExpc3RlbmVycygpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBQb3BvdmVyLnByb3RvdHlwZS5fc2V0dXBFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHRyaWdnZXJFdmVudHMgPSB0aGlzLl9nZXRUcmlnZ2VyRXZlbnRzKCk7XG4gICAgICAgIHRyaWdnZXJFdmVudHMuc2hvd0V2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgX3RoaXMuX3RyaWdnZXJFbC5hZGRFdmVudExpc3RlbmVyKGV2LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2hvdygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBfdGhpcy5fdGFyZ2V0RWwuYWRkRXZlbnRMaXN0ZW5lcihldiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnNob3coKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdHJpZ2dlckV2ZW50cy5oaWRlRXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBfdGhpcy5fdHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5fdGFyZ2V0RWwubWF0Y2hlcygnOmhvdmVyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIF90aGlzLl90YXJnZXRFbC5hZGRFdmVudExpc3RlbmVyKGV2LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghX3RoaXMuX3RyaWdnZXJFbC5tYXRjaGVzKCc6aG92ZXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFBvcG92ZXIucHJvdG90eXBlLl9jcmVhdGVQb3BwZXJJbnN0YW5jZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVBvcHBlcih0aGlzLl90cmlnZ2VyRWwsIHRoaXMuX3RhcmdldEVsLCB7XG4gICAgICAgICAgICBwbGFjZW1lbnQ6IHRoaXMuX29wdGlvbnMucGxhY2VtZW50LFxuICAgICAgICAgICAgbW9kaWZpZXJzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnb2Zmc2V0JyxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0OiBbMCwgdGhpcy5fb3B0aW9ucy5vZmZzZXRdLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFBvcG92ZXIucHJvdG90eXBlLl9nZXRUcmlnZ2VyRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuX29wdGlvbnMudHJpZ2dlclR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2hvdmVyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzaG93RXZlbnRzOiBbJ21vdXNlZW50ZXInLCAnZm9jdXMnXSxcbiAgICAgICAgICAgICAgICAgICAgaGlkZUV2ZW50czogWydtb3VzZWxlYXZlJywgJ2JsdXInXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAnY2xpY2snOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dFdmVudHM6IFsnY2xpY2snLCAnZm9jdXMnXSxcbiAgICAgICAgICAgICAgICAgICAgaGlkZUV2ZW50czogWydmb2N1c291dCcsICdibHVyJ10sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgJ25vbmUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dFdmVudHM6IFtdLFxuICAgICAgICAgICAgICAgICAgICBoaWRlRXZlbnRzOiBbXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzaG93RXZlbnRzOiBbJ21vdXNlZW50ZXInLCAnZm9jdXMnXSxcbiAgICAgICAgICAgICAgICAgICAgaGlkZUV2ZW50czogWydtb3VzZWxlYXZlJywgJ2JsdXInXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICBQb3BvdmVyLnByb3RvdHlwZS5fc2V0dXBLZXlkb3duTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2tleWRvd25FdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBpZiAoZXYua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fa2V5ZG93bkV2ZW50TGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG4gICAgUG9wb3Zlci5wcm90b3R5cGUuX3JlbW92ZUtleWRvd25MaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fa2V5ZG93bkV2ZW50TGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG4gICAgUG9wb3Zlci5wcm90b3R5cGUuX3NldHVwQ2xpY2tPdXRzaWRlTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2NsaWNrT3V0c2lkZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIF90aGlzLl9oYW5kbGVDbGlja091dHNpZGUoZXYsIF90aGlzLl90YXJnZXRFbCk7XG4gICAgICAgIH07XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9jbGlja091dHNpZGVFdmVudExpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuICAgIFBvcG92ZXIucHJvdG90eXBlLl9yZW1vdmVDbGlja091dHNpZGVMaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2NsaWNrT3V0c2lkZUV2ZW50TGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG4gICAgUG9wb3Zlci5wcm90b3R5cGUuX2hhbmRsZUNsaWNrT3V0c2lkZSA9IGZ1bmN0aW9uIChldiwgdGFyZ2V0RWwpIHtcbiAgICAgICAgdmFyIGNsaWNrZWRFbCA9IGV2LnRhcmdldDtcbiAgICAgICAgaWYgKGNsaWNrZWRFbCAhPT0gdGFyZ2V0RWwgJiZcbiAgICAgICAgICAgICF0YXJnZXRFbC5jb250YWlucyhjbGlja2VkRWwpICYmXG4gICAgICAgICAgICAhdGhpcy5fdHJpZ2dlckVsLmNvbnRhaW5zKGNsaWNrZWRFbCkgJiZcbiAgICAgICAgICAgIHRoaXMuaXNWaXNpYmxlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBQb3BvdmVyLnByb3RvdHlwZS5pc1Zpc2libGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xuICAgIH07XG4gICAgUG9wb3Zlci5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pc1Zpc2libGUoKSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uVG9nZ2xlKHRoaXMpO1xuICAgIH07XG4gICAgUG9wb3Zlci5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZSgnb3BhY2l0eS0wJywgJ2ludmlzaWJsZScpO1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuYWRkKCdvcGFjaXR5LTEwMCcsICd2aXNpYmxlJyk7XG4gICAgICAgIC8vIEVuYWJsZSB0aGUgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgIHRoaXMuX3BvcHBlckluc3RhbmNlLnNldE9wdGlvbnMoZnVuY3Rpb24gKG9wdGlvbnMpIHsgcmV0dXJuIChfX2Fzc2lnbihfX2Fzc2lnbih7fSwgb3B0aW9ucyksIHsgbW9kaWZpZXJzOiBfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoW10sIG9wdGlvbnMubW9kaWZpZXJzLCB0cnVlKSwgW1xuICAgICAgICAgICAgICAgIHsgbmFtZTogJ2V2ZW50TGlzdGVuZXJzJywgZW5hYmxlZDogdHJ1ZSB9LFxuICAgICAgICAgICAgXSwgZmFsc2UpIH0pKTsgfSk7XG4gICAgICAgIC8vIGhhbmRsZSBjbGljayBvdXRzaWRlXG4gICAgICAgIHRoaXMuX3NldHVwQ2xpY2tPdXRzaWRlTGlzdGVuZXIoKTtcbiAgICAgICAgLy8gaGFuZGxlIGVzYyBrZXlkb3duXG4gICAgICAgIHRoaXMuX3NldHVwS2V5ZG93bkxpc3RlbmVyKCk7XG4gICAgICAgIC8vIFVwZGF0ZSBpdHMgcG9zaXRpb25cbiAgICAgICAgdGhpcy5fcG9wcGVySW5zdGFuY2UudXBkYXRlKCk7XG4gICAgICAgIC8vIHNldCB2aXNpYmlsaXR5IHRvIHRydWVcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IHRydWU7XG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25TaG93KHRoaXMpO1xuICAgIH07XG4gICAgUG9wb3Zlci5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZSgnb3BhY2l0eS0xMDAnLCAndmlzaWJsZScpO1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuYWRkKCdvcGFjaXR5LTAnLCAnaW52aXNpYmxlJyk7XG4gICAgICAgIC8vIERpc2FibGUgdGhlIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICB0aGlzLl9wb3BwZXJJbnN0YW5jZS5zZXRPcHRpb25zKGZ1bmN0aW9uIChvcHRpb25zKSB7IHJldHVybiAoX19hc3NpZ24oX19hc3NpZ24oe30sIG9wdGlvbnMpLCB7IG1vZGlmaWVyczogX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KFtdLCBvcHRpb25zLm1vZGlmaWVycywgdHJ1ZSksIFtcbiAgICAgICAgICAgICAgICB7IG5hbWU6ICdldmVudExpc3RlbmVycycsIGVuYWJsZWQ6IGZhbHNlIH0sXG4gICAgICAgICAgICBdLCBmYWxzZSkgfSkpOyB9KTtcbiAgICAgICAgLy8gaGFuZGxlIGNsaWNrIG91dHNpZGVcbiAgICAgICAgdGhpcy5fcmVtb3ZlQ2xpY2tPdXRzaWRlTGlzdGVuZXIoKTtcbiAgICAgICAgLy8gaGFuZGxlIGVzYyBrZXlkb3duXG4gICAgICAgIHRoaXMuX3JlbW92ZUtleWRvd25MaXN0ZW5lcigpO1xuICAgICAgICAvLyBzZXQgdmlzaWJpbGl0eSB0byBmYWxzZVxuICAgICAgICB0aGlzLl92aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25IaWRlKHRoaXMpO1xuICAgIH07XG4gICAgcmV0dXJuIFBvcG92ZXI7XG59KCkpO1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgd2luZG93LlBvcG92ZXIgPSBQb3BvdmVyO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGluaXRQb3BvdmVycygpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wb3BvdmVyLXRhcmdldF0nKS5mb3JFYWNoKGZ1bmN0aW9uICgkdHJpZ2dlckVsKSB7XG4gICAgICAgIHZhciBwb3BvdmVySUQgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1wb3BvdmVyLXRhcmdldCcpO1xuICAgICAgICB2YXIgJHBvcG92ZXJFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBvcG92ZXJJRCk7XG4gICAgICAgIGlmICgkcG9wb3ZlckVsKSB7XG4gICAgICAgICAgICB2YXIgdHJpZ2dlclR5cGUgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1wb3BvdmVyLXRyaWdnZXInKTtcbiAgICAgICAgICAgIHZhciBwbGFjZW1lbnQgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1wb3BvdmVyLXBsYWNlbWVudCcpO1xuICAgICAgICAgICAgdmFyIG9mZnNldCA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLXBvcG92ZXItb2Zmc2V0Jyk7XG4gICAgICAgICAgICBuZXcgUG9wb3ZlcigkcG9wb3ZlckVsLCAkdHJpZ2dlckVsLCB7XG4gICAgICAgICAgICAgICAgcGxhY2VtZW50OiBwbGFjZW1lbnQgPyBwbGFjZW1lbnQgOiBEZWZhdWx0LnBsYWNlbWVudCxcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IG9mZnNldCA/IHBhcnNlSW50KG9mZnNldCkgOiBEZWZhdWx0Lm9mZnNldCxcbiAgICAgICAgICAgICAgICB0cmlnZ2VyVHlwZTogdHJpZ2dlclR5cGVcbiAgICAgICAgICAgICAgICAgICAgPyB0cmlnZ2VyVHlwZVxuICAgICAgICAgICAgICAgICAgICA6IERlZmF1bHQudHJpZ2dlclR5cGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUaGUgcG9wb3ZlciBlbGVtZW50IHdpdGggaWQgXFxcIlwiLmNvbmNhdChwb3BvdmVySUQsIFwiXFxcIiBkb2VzIG5vdCBleGlzdC4gUGxlYXNlIGNoZWNrIHRoZSBkYXRhLXBvcG92ZXItdGFyZ2V0IGF0dHJpYnV0ZS5cIikpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnQgZGVmYXVsdCBQb3BvdmVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW50ZXJmYWNlLmpzLm1hcCIsImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXR5cGVzLmpzLm1hcCIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgRGVmYXVsdCA9IHtcbiAgICBkZWZhdWx0VGFiSWQ6IG51bGwsXG4gICAgYWN0aXZlQ2xhc3NlczogJ3RleHQtYmx1ZS02MDAgaG92ZXI6dGV4dC1ibHVlLTYwMCBkYXJrOnRleHQtYmx1ZS01MDAgZGFyazpob3Zlcjp0ZXh0LWJsdWUtNTAwIGJvcmRlci1ibHVlLTYwMCBkYXJrOmJvcmRlci1ibHVlLTUwMCcsXG4gICAgaW5hY3RpdmVDbGFzc2VzOiAnZGFyazpib3JkZXItdHJhbnNwYXJlbnQgdGV4dC1ncmF5LTUwMCBob3Zlcjp0ZXh0LWdyYXktNjAwIGRhcms6dGV4dC1ncmF5LTQwMCBib3JkZXItZ3JheS0xMDAgaG92ZXI6Ym9yZGVyLWdyYXktMzAwIGRhcms6Ym9yZGVyLWdyYXktNzAwIGRhcms6aG92ZXI6dGV4dC1ncmF5LTMwMCcsXG4gICAgb25TaG93OiBmdW5jdGlvbiAoKSB7IH0sXG59O1xudmFyIFRhYnMgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGFicyhpdGVtcywgb3B0aW9ucykge1xuICAgICAgICBpZiAoaXRlbXMgPT09IHZvaWQgMCkgeyBpdGVtcyA9IFtdOyB9XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IERlZmF1bHQ7IH1cbiAgICAgICAgdGhpcy5faXRlbXMgPSBpdGVtcztcbiAgICAgICAgdGhpcy5fYWN0aXZlVGFiID0gb3B0aW9ucyA/IHRoaXMuZ2V0VGFiKG9wdGlvbnMuZGVmYXVsdFRhYklkKSA6IG51bGw7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgRGVmYXVsdCksIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgfVxuICAgIFRhYnMucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5faXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBzZXQgdGhlIGZpcnN0IHRhYiBhcyBhY3RpdmUgaWYgbm90IHNldCBieSBleHBsaWNpdGx5XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2FjdGl2ZVRhYikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NldEFjdGl2ZVRhYih0aGlzLl9pdGVtc1swXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBmb3JjZSBzaG93IHRoZSBmaXJzdCBkZWZhdWx0IHRhYlxuICAgICAgICAgICAgdGhpcy5zaG93KHRoaXMuX2FjdGl2ZVRhYi5pZCwgdHJ1ZSk7XG4gICAgICAgICAgICAvLyBzaG93IHRhYiBjb250ZW50IGJhc2VkIG9uIGNsaWNrXG4gICAgICAgICAgICB0aGlzLl9pdGVtcy5tYXAoZnVuY3Rpb24gKHRhYikge1xuICAgICAgICAgICAgICAgIHRhYi50cmlnZ2VyRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNob3codGFiLmlkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBUYWJzLnByb3RvdHlwZS5nZXRBY3RpdmVUYWIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVUYWI7XG4gICAgfTtcbiAgICBUYWJzLnByb3RvdHlwZS5fc2V0QWN0aXZlVGFiID0gZnVuY3Rpb24gKHRhYikge1xuICAgICAgICB0aGlzLl9hY3RpdmVUYWIgPSB0YWI7XG4gICAgfTtcbiAgICBUYWJzLnByb3RvdHlwZS5nZXRUYWIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zLmZpbHRlcihmdW5jdGlvbiAodCkgeyByZXR1cm4gdC5pZCA9PT0gaWQ7IH0pWzBdO1xuICAgIH07XG4gICAgVGFicy5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uIChpZCwgZm9yY2VTaG93KSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChmb3JjZVNob3cgPT09IHZvaWQgMCkgeyBmb3JjZVNob3cgPSBmYWxzZTsgfVxuICAgICAgICB2YXIgdGFiID0gdGhpcy5nZXRUYWIoaWQpO1xuICAgICAgICAvLyBkb24ndCBkbyBhbnl0aGluZyBpZiBhbHJlYWR5IGFjdGl2ZVxuICAgICAgICBpZiAodGFiID09PSB0aGlzLl9hY3RpdmVUYWIgJiYgIWZvcmNlU2hvdykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGhpZGUgb3RoZXIgdGFic1xuICAgICAgICB0aGlzLl9pdGVtcy5tYXAoZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICBpZiAodCAhPT0gdGFiKSB7XG4gICAgICAgICAgICAgICAgKF9hID0gdC50cmlnZ2VyRWwuY2xhc3NMaXN0KS5yZW1vdmUuYXBwbHkoX2EsIF90aGlzLl9vcHRpb25zLmFjdGl2ZUNsYXNzZXMuc3BsaXQoJyAnKSk7XG4gICAgICAgICAgICAgICAgKF9iID0gdC50cmlnZ2VyRWwuY2xhc3NMaXN0KS5hZGQuYXBwbHkoX2IsIF90aGlzLl9vcHRpb25zLmluYWN0aXZlQ2xhc3Nlcy5zcGxpdCgnICcpKTtcbiAgICAgICAgICAgICAgICB0LnRhcmdldEVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICAgICAgICAgIHQudHJpZ2dlckVsLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICdmYWxzZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gc2hvdyBhY3RpdmUgdGFiXG4gICAgICAgIChfYSA9IHRhYi50cmlnZ2VyRWwuY2xhc3NMaXN0KS5hZGQuYXBwbHkoX2EsIHRoaXMuX29wdGlvbnMuYWN0aXZlQ2xhc3Nlcy5zcGxpdCgnICcpKTtcbiAgICAgICAgKF9iID0gdGFiLnRyaWdnZXJFbC5jbGFzc0xpc3QpLnJlbW92ZS5hcHBseShfYiwgdGhpcy5fb3B0aW9ucy5pbmFjdGl2ZUNsYXNzZXMuc3BsaXQoJyAnKSk7XG4gICAgICAgIHRhYi50cmlnZ2VyRWwuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcbiAgICAgICAgdGFiLnRhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICB0aGlzLl9zZXRBY3RpdmVUYWIodGFiKTtcbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vblNob3codGhpcywgdGFiKTtcbiAgICB9O1xuICAgIHJldHVybiBUYWJzO1xufSgpKTtcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHdpbmRvdy5UYWJzID0gVGFicztcbn1cbmV4cG9ydCBmdW5jdGlvbiBpbml0VGFicygpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWJzLXRvZ2dsZV0nKS5mb3JFYWNoKGZ1bmN0aW9uICgkdHJpZ2dlckVsKSB7XG4gICAgICAgIHZhciB0YWJJdGVtcyA9IFtdO1xuICAgICAgICB2YXIgZGVmYXVsdFRhYklkID0gbnVsbDtcbiAgICAgICAgJHRyaWdnZXJFbFxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwidGFiXCJdJylcbiAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uICgkdHJpZ2dlckVsKSB7XG4gICAgICAgICAgICB2YXIgaXNBY3RpdmUgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcpID09PSAndHJ1ZSc7XG4gICAgICAgICAgICB2YXIgdGFiID0ge1xuICAgICAgICAgICAgICAgIGlkOiAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS10YWJzLXRhcmdldCcpLFxuICAgICAgICAgICAgICAgIHRyaWdnZXJFbDogJHRyaWdnZXJFbCxcbiAgICAgICAgICAgICAgICB0YXJnZXRFbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcigkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS10YWJzLXRhcmdldCcpKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0YWJJdGVtcy5wdXNoKHRhYik7XG4gICAgICAgICAgICBpZiAoaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VGFiSWQgPSB0YWIuaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBuZXcgVGFicyh0YWJJdGVtcywge1xuICAgICAgICAgICAgZGVmYXVsdFRhYklkOiBkZWZhdWx0VGFiSWQsXG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0IGRlZmF1bHQgVGFicztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWludGVyZmFjZS5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD10eXBlcy5qcy5tYXAiLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSwgcGFjaykge1xuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XG59O1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWVtcHR5LWZ1bmN0aW9uICovXG5pbXBvcnQgeyBjcmVhdGVQb3BwZXIgfSBmcm9tICdAcG9wcGVyanMvY29yZSc7XG52YXIgRGVmYXVsdCA9IHtcbiAgICBwbGFjZW1lbnQ6ICd0b3AnLFxuICAgIHRyaWdnZXJUeXBlOiAnaG92ZXInLFxuICAgIG9uU2hvdzogZnVuY3Rpb24gKCkgeyB9LFxuICAgIG9uSGlkZTogZnVuY3Rpb24gKCkgeyB9LFxuICAgIG9uVG9nZ2xlOiBmdW5jdGlvbiAoKSB7IH0sXG59O1xudmFyIFRvb2x0aXAgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVG9vbHRpcCh0YXJnZXRFbCwgdHJpZ2dlckVsLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICh0YXJnZXRFbCA9PT0gdm9pZCAwKSB7IHRhcmdldEVsID0gbnVsbDsgfVxuICAgICAgICBpZiAodHJpZ2dlckVsID09PSB2b2lkIDApIHsgdHJpZ2dlckVsID0gbnVsbDsgfVxuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSBEZWZhdWx0OyB9XG4gICAgICAgIHRoaXMuX3RhcmdldEVsID0gdGFyZ2V0RWw7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJFbCA9IHRyaWdnZXJFbDtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBEZWZhdWx0KSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX3BvcHBlckluc3RhbmNlID0gdGhpcy5fY3JlYXRlUG9wcGVySW5zdGFuY2UoKTtcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgfVxuICAgIFRvb2x0aXAucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fdHJpZ2dlckVsKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFRvb2x0aXAucHJvdG90eXBlLl9zZXR1cEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgdHJpZ2dlckV2ZW50cyA9IHRoaXMuX2dldFRyaWdnZXJFdmVudHMoKTtcbiAgICAgICAgdHJpZ2dlckV2ZW50cy5zaG93RXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBfdGhpcy5fdHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zaG93KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRyaWdnZXJFdmVudHMuaGlkZUV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgX3RoaXMuX3RyaWdnZXJFbC5hZGRFdmVudExpc3RlbmVyKGV2LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgVG9vbHRpcC5wcm90b3R5cGUuX2NyZWF0ZVBvcHBlckluc3RhbmNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlUG9wcGVyKHRoaXMuX3RyaWdnZXJFbCwgdGhpcy5fdGFyZ2V0RWwsIHtcbiAgICAgICAgICAgIHBsYWNlbWVudDogdGhpcy5fb3B0aW9ucy5wbGFjZW1lbnQsXG4gICAgICAgICAgICBtb2RpZmllcnM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdvZmZzZXQnLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQ6IFswLCA4XSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBUb29sdGlwLnByb3RvdHlwZS5fZ2V0VHJpZ2dlckV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLl9vcHRpb25zLnRyaWdnZXJUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdob3Zlcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0V2ZW50czogWydtb3VzZWVudGVyJywgJ2ZvY3VzJ10sXG4gICAgICAgICAgICAgICAgICAgIGhpZGVFdmVudHM6IFsnbW91c2VsZWF2ZScsICdibHVyJ10sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgJ2NsaWNrJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzaG93RXZlbnRzOiBbJ2NsaWNrJywgJ2ZvY3VzJ10sXG4gICAgICAgICAgICAgICAgICAgIGhpZGVFdmVudHM6IFsnZm9jdXNvdXQnLCAnYmx1ciddLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlICdub25lJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzaG93RXZlbnRzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgaGlkZUV2ZW50czogW10sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0V2ZW50czogWydtb3VzZWVudGVyJywgJ2ZvY3VzJ10sXG4gICAgICAgICAgICAgICAgICAgIGhpZGVFdmVudHM6IFsnbW91c2VsZWF2ZScsICdibHVyJ10sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgVG9vbHRpcC5wcm90b3R5cGUuX3NldHVwS2V5ZG93bkxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl9rZXlkb3duRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgaWYgKGV2LmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX2tleWRvd25FdmVudExpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuICAgIFRvb2x0aXAucHJvdG90eXBlLl9yZW1vdmVLZXlkb3duTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX2tleWRvd25FdmVudExpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuICAgIFRvb2x0aXAucHJvdG90eXBlLl9zZXR1cENsaWNrT3V0c2lkZUxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl9jbGlja091dHNpZGVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBfdGhpcy5faGFuZGxlQ2xpY2tPdXRzaWRlKGV2LCBfdGhpcy5fdGFyZ2V0RWwpO1xuICAgICAgICB9O1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fY2xpY2tPdXRzaWRlRXZlbnRMaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcbiAgICBUb29sdGlwLnByb3RvdHlwZS5fcmVtb3ZlQ2xpY2tPdXRzaWRlTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9jbGlja091dHNpZGVFdmVudExpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuICAgIFRvb2x0aXAucHJvdG90eXBlLl9oYW5kbGVDbGlja091dHNpZGUgPSBmdW5jdGlvbiAoZXYsIHRhcmdldEVsKSB7XG4gICAgICAgIHZhciBjbGlja2VkRWwgPSBldi50YXJnZXQ7XG4gICAgICAgIGlmIChjbGlja2VkRWwgIT09IHRhcmdldEVsICYmXG4gICAgICAgICAgICAhdGFyZ2V0RWwuY29udGFpbnMoY2xpY2tlZEVsKSAmJlxuICAgICAgICAgICAgIXRoaXMuX3RyaWdnZXJFbC5jb250YWlucyhjbGlja2VkRWwpICYmXG4gICAgICAgICAgICB0aGlzLmlzVmlzaWJsZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgVG9vbHRpcC5wcm90b3R5cGUuaXNWaXNpYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcbiAgICB9O1xuICAgIFRvb2x0aXAucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFRvb2x0aXAucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoJ29wYWNpdHktMCcsICdpbnZpc2libGUnKTtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCgnb3BhY2l0eS0xMDAnLCAndmlzaWJsZScpO1xuICAgICAgICAvLyBFbmFibGUgdGhlIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICB0aGlzLl9wb3BwZXJJbnN0YW5jZS5zZXRPcHRpb25zKGZ1bmN0aW9uIChvcHRpb25zKSB7IHJldHVybiAoX19hc3NpZ24oX19hc3NpZ24oe30sIG9wdGlvbnMpLCB7IG1vZGlmaWVyczogX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KFtdLCBvcHRpb25zLm1vZGlmaWVycywgdHJ1ZSksIFtcbiAgICAgICAgICAgICAgICB7IG5hbWU6ICdldmVudExpc3RlbmVycycsIGVuYWJsZWQ6IHRydWUgfSxcbiAgICAgICAgICAgIF0sIGZhbHNlKSB9KSk7IH0pO1xuICAgICAgICAvLyBoYW5kbGUgY2xpY2sgb3V0c2lkZVxuICAgICAgICB0aGlzLl9zZXR1cENsaWNrT3V0c2lkZUxpc3RlbmVyKCk7XG4gICAgICAgIC8vIGhhbmRsZSBlc2Mga2V5ZG93blxuICAgICAgICB0aGlzLl9zZXR1cEtleWRvd25MaXN0ZW5lcigpO1xuICAgICAgICAvLyBVcGRhdGUgaXRzIHBvc2l0aW9uXG4gICAgICAgIHRoaXMuX3BvcHBlckluc3RhbmNlLnVwZGF0ZSgpO1xuICAgICAgICAvLyBzZXQgdmlzaWJpbGl0eVxuICAgICAgICB0aGlzLl92aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vblNob3codGhpcyk7XG4gICAgfTtcbiAgICBUb29sdGlwLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKCdvcGFjaXR5LTEwMCcsICd2aXNpYmxlJyk7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoJ29wYWNpdHktMCcsICdpbnZpc2libGUnKTtcbiAgICAgICAgLy8gRGlzYWJsZSB0aGUgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgIHRoaXMuX3BvcHBlckluc3RhbmNlLnNldE9wdGlvbnMoZnVuY3Rpb24gKG9wdGlvbnMpIHsgcmV0dXJuIChfX2Fzc2lnbihfX2Fzc2lnbih7fSwgb3B0aW9ucyksIHsgbW9kaWZpZXJzOiBfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoW10sIG9wdGlvbnMubW9kaWZpZXJzLCB0cnVlKSwgW1xuICAgICAgICAgICAgICAgIHsgbmFtZTogJ2V2ZW50TGlzdGVuZXJzJywgZW5hYmxlZDogZmFsc2UgfSxcbiAgICAgICAgICAgIF0sIGZhbHNlKSB9KSk7IH0pO1xuICAgICAgICAvLyBoYW5kbGUgY2xpY2sgb3V0c2lkZVxuICAgICAgICB0aGlzLl9yZW1vdmVDbGlja091dHNpZGVMaXN0ZW5lcigpO1xuICAgICAgICAvLyBoYW5kbGUgZXNjIGtleWRvd25cbiAgICAgICAgdGhpcy5fcmVtb3ZlS2V5ZG93bkxpc3RlbmVyKCk7XG4gICAgICAgIC8vIHNldCB2aXNpYmlsaXR5XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vbkhpZGUodGhpcyk7XG4gICAgfTtcbiAgICByZXR1cm4gVG9vbHRpcDtcbn0oKSk7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB3aW5kb3cuVG9vbHRpcCA9IFRvb2x0aXA7XG59XG5leHBvcnQgZnVuY3Rpb24gaW5pdFRvb2x0aXBzKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRvb2x0aXAtdGFyZ2V0XScpLmZvckVhY2goZnVuY3Rpb24gKCR0cmlnZ2VyRWwpIHtcbiAgICAgICAgdmFyIHRvb2x0aXBJZCA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLXRvb2x0aXAtdGFyZ2V0Jyk7XG4gICAgICAgIHZhciAkdG9vbHRpcEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodG9vbHRpcElkKTtcbiAgICAgICAgaWYgKCR0b29sdGlwRWwpIHtcbiAgICAgICAgICAgIHZhciB0cmlnZ2VyVHlwZSA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLXRvb2x0aXAtdHJpZ2dlcicpO1xuICAgICAgICAgICAgdmFyIHBsYWNlbWVudCA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLXRvb2x0aXAtcGxhY2VtZW50Jyk7XG4gICAgICAgICAgICBuZXcgVG9vbHRpcCgkdG9vbHRpcEVsLCAkdHJpZ2dlckVsLCB7XG4gICAgICAgICAgICAgICAgcGxhY2VtZW50OiBwbGFjZW1lbnQgPyBwbGFjZW1lbnQgOiBEZWZhdWx0LnBsYWNlbWVudCxcbiAgICAgICAgICAgICAgICB0cmlnZ2VyVHlwZTogdHJpZ2dlclR5cGVcbiAgICAgICAgICAgICAgICAgICAgPyB0cmlnZ2VyVHlwZVxuICAgICAgICAgICAgICAgICAgICA6IERlZmF1bHQudHJpZ2dlclR5cGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUaGUgdG9vbHRpcCBlbGVtZW50IHdpdGggaWQgXFxcIlwiLmNvbmNhdCh0b29sdGlwSWQsIFwiXFxcIiBkb2VzIG5vdCBleGlzdC4gUGxlYXNlIGNoZWNrIHRoZSBkYXRhLXRvb2x0aXAtdGFyZ2V0IGF0dHJpYnV0ZS5cIikpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnQgZGVmYXVsdCBUb29sdGlwO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW50ZXJmYWNlLmpzLm1hcCIsImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXR5cGVzLmpzLm1hcCIsInZhciBFdmVudHMgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRXZlbnRzKGV2ZW50VHlwZSwgZXZlbnRGdW5jdGlvbnMpIHtcbiAgICAgICAgaWYgKGV2ZW50RnVuY3Rpb25zID09PSB2b2lkIDApIHsgZXZlbnRGdW5jdGlvbnMgPSBbXTsgfVxuICAgICAgICB0aGlzLl9ldmVudFR5cGUgPSBldmVudFR5cGU7XG4gICAgICAgIHRoaXMuX2V2ZW50RnVuY3Rpb25zID0gZXZlbnRGdW5jdGlvbnM7XG4gICAgfVxuICAgIEV2ZW50cy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fZXZlbnRGdW5jdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnRGdW5jdGlvbikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoX3RoaXMuX2V2ZW50VHlwZSwgZXZlbnRGdW5jdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEV2ZW50cztcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBFdmVudHM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ldmVudHMuanMubWFwIiwiaW1wb3J0IEV2ZW50cyBmcm9tICcuL2RvbS9ldmVudHMnO1xuaW1wb3J0IHsgaW5pdEFjY29yZGlvbnMgfSBmcm9tICcuL2NvbXBvbmVudHMvYWNjb3JkaW9uJztcbmltcG9ydCB7IGluaXRDb2xsYXBzZXMgfSBmcm9tICcuL2NvbXBvbmVudHMvY29sbGFwc2UnO1xuaW1wb3J0IHsgaW5pdENhcm91c2VscyB9IGZyb20gJy4vY29tcG9uZW50cy9jYXJvdXNlbCc7XG5pbXBvcnQgeyBpbml0RGlzbWlzc2VzIH0gZnJvbSAnLi9jb21wb25lbnRzL2Rpc21pc3MnO1xuaW1wb3J0IHsgaW5pdERyb3Bkb3ducyB9IGZyb20gJy4vY29tcG9uZW50cy9kcm9wZG93bic7XG5pbXBvcnQgeyBpbml0TW9kYWxzIH0gZnJvbSAnLi9jb21wb25lbnRzL21vZGFsJztcbmltcG9ydCB7IGluaXREcmF3ZXJzIH0gZnJvbSAnLi9jb21wb25lbnRzL2RyYXdlcic7XG5pbXBvcnQgeyBpbml0VGFicyB9IGZyb20gJy4vY29tcG9uZW50cy90YWJzJztcbmltcG9ydCB7IGluaXRUb29sdGlwcyB9IGZyb20gJy4vY29tcG9uZW50cy90b29sdGlwJztcbmltcG9ydCB7IGluaXRQb3BvdmVycyB9IGZyb20gJy4vY29tcG9uZW50cy9wb3BvdmVyJztcbmltcG9ydCB7IGluaXREaWFscyB9IGZyb20gJy4vY29tcG9uZW50cy9kaWFsJztcbi8vIHNldHVwIGV2ZW50cyBmb3IgZGF0YSBhdHRyaWJ1dGVzXG52YXIgZXZlbnRzID0gbmV3IEV2ZW50cygnbG9hZCcsIFtcbiAgICBpbml0QWNjb3JkaW9ucyxcbiAgICBpbml0Q29sbGFwc2VzLFxuICAgIGluaXRDYXJvdXNlbHMsXG4gICAgaW5pdERpc21pc3NlcyxcbiAgICBpbml0RHJvcGRvd25zLFxuICAgIGluaXRNb2RhbHMsXG4gICAgaW5pdERyYXdlcnMsXG4gICAgaW5pdFRhYnMsXG4gICAgaW5pdFRvb2x0aXBzLFxuICAgIGluaXRQb3BvdmVycyxcbiAgICBpbml0RGlhbHMsXG5dKTtcbmV2ZW50cy5pbml0KCk7XG4vLyBleHBvcnQgYWxsIGNvbXBvbmVudHNcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQWNjb3JkaW9uIH0gZnJvbSAnLi9jb21wb25lbnRzL2FjY29yZGlvbic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIENhcm91c2VsIH0gZnJvbSAnLi9jb21wb25lbnRzL2Nhcm91c2VsJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQ29sbGFwc2UgfSBmcm9tICcuL2NvbXBvbmVudHMvY29sbGFwc2UnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBEaWFsIH0gZnJvbSAnLi9jb21wb25lbnRzL2RpYWwnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBEaXNtaXNzIH0gZnJvbSAnLi9jb21wb25lbnRzL2Rpc21pc3MnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBEcmF3ZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvZHJhd2VyJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRHJvcGRvd24gfSBmcm9tICcuL2NvbXBvbmVudHMvZHJvcGRvd24nO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBNb2RhbCB9IGZyb20gJy4vY29tcG9uZW50cy9tb2RhbCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFBvcG92ZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvcG9wb3Zlcic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFRhYnMgfSBmcm9tICcuL2NvbXBvbmVudHMvdGFicyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFRvb2x0aXAgfSBmcm9tICcuL2NvbXBvbmVudHMvdG9vbHRpcCc7XG4vLyBleHBvcnQgYWxsIHR5cGVzXG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvYWNjb3JkaW9uL3R5cGVzJztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9jYXJvdXNlbC90eXBlcyc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvY29sbGFwc2UvdHlwZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2RpYWwvdHlwZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2Rpc21pc3MvdHlwZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2RyYXdlci90eXBlcyc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvZHJvcGRvd24vdHlwZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL21vZGFsL3R5cGVzJztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9wb3BvdmVyL3R5cGVzJztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy90YWJzL3R5cGVzJztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy90b29sdGlwL3R5cGVzJztcbi8vIGV4cG9ydCBhbGwgaW50ZXJmYWNlc1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2FjY29yZGlvbi9pbnRlcmZhY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2Nhcm91c2VsL2ludGVyZmFjZSc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvY29sbGFwc2UvaW50ZXJmYWNlJztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9kaWFsL2ludGVyZmFjZSc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvZGlzbWlzcy9pbnRlcmZhY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2RyYXdlci9pbnRlcmZhY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2Ryb3Bkb3duL2ludGVyZmFjZSc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvbW9kYWwvaW50ZXJmYWNlJztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9wb3BvdmVyL2ludGVyZmFjZSc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvdGFicy9pbnRlcmZhY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL3Rvb2x0aXAvaW50ZXJmYWNlJztcbi8vIGV4cG9ydCBpbml0IGZ1bmN0aW9uc1xuZXhwb3J0IHsgaW5pdEFjY29yZGlvbnMgfSBmcm9tICcuL2NvbXBvbmVudHMvYWNjb3JkaW9uJztcbmV4cG9ydCB7IGluaXRDYXJvdXNlbHMgfSBmcm9tICcuL2NvbXBvbmVudHMvY2Fyb3VzZWwnO1xuZXhwb3J0IHsgaW5pdENvbGxhcHNlcyB9IGZyb20gJy4vY29tcG9uZW50cy9jb2xsYXBzZSc7XG5leHBvcnQgeyBpbml0RGlhbHMgfSBmcm9tICcuL2NvbXBvbmVudHMvZGlhbCc7XG5leHBvcnQgeyBpbml0RGlzbWlzc2VzIH0gZnJvbSAnLi9jb21wb25lbnRzL2Rpc21pc3MnO1xuZXhwb3J0IHsgaW5pdERyYXdlcnMgfSBmcm9tICcuL2NvbXBvbmVudHMvZHJhd2VyJztcbmV4cG9ydCB7IGluaXREcm9wZG93bnMgfSBmcm9tICcuL2NvbXBvbmVudHMvZHJvcGRvd24nO1xuZXhwb3J0IHsgaW5pdE1vZGFscyB9IGZyb20gJy4vY29tcG9uZW50cy9tb2RhbCc7XG5leHBvcnQgeyBpbml0UG9wb3ZlcnMgfSBmcm9tICcuL2NvbXBvbmVudHMvcG9wb3Zlcic7XG5leHBvcnQgeyBpbml0VGFicyB9IGZyb20gJy4vY29tcG9uZW50cy90YWJzJztcbmV4cG9ydCB7IGluaXRUb29sdGlwcyB9IGZyb20gJy4vY29tcG9uZW50cy90b29sdGlwJztcbi8vIGV4cG9ydCBhbGwgaW5pdCBmdW5jdGlvbnNcbmV4cG9ydCB7IGluaXRGbG93Yml0ZSB9IGZyb20gJy4vY29tcG9uZW50cy9pbmRleCc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJpbXBvcnQgeyBNb2RhbCB9IGZyb20gJ2Zsb3diaXRlJztcbmltcG9ydCB0eXBlIHsgTW9kYWxPcHRpb25zLCBNb2RhbEludGVyZmFjZSB9IGZyb20gJ2Zsb3diaXRlJztcbmltcG9ydCBEYXRlcGlja2VyIGZyb20gJ2Zsb3diaXRlLWRhdGVwaWNrZXIvRGF0ZXBpY2tlcic7XG5pbXBvcnQgeyBlYXNlcGljayB9IGZyb20gJ0BlYXNlcGljay9idW5kbGUnO1xuXG5pbnRlcmZhY2UgSVByb2R1Y3Qge1xuICBpZDogbnVtYmVyO1xuICBuYW1lOiBzdHJpbmc7XG4gIHN1cHBsaWVyX2lkOiBudW1iZXI7XG4gIGN1cnJlbmN5OiBzdHJpbmc7XG4gIHJlZ3VsYXJfcHJpY2U6IG51bWJlcjtcbiAgcmV0YWlsX3ByaWNlOiBudW1iZXI7XG4gIGltYWdlOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIC8vIEdlbmVyYWwgSW5mbyAtPlxuICBTS1U6IHN0cmluZztcbiAgbG93X3N0b2NrX2xldmVsOiBudW1iZXI7XG4gIHByb2dyYW1feWVhcjogbnVtYmVyO1xuICBwYWNrYWdlX3F0eTogbnVtYmVyO1xuICBudW1iX29mX2l0ZW1zX3Blcl9jYXNlOiBudW1iZXI7XG4gIG51bWJfb2ZfY2FzZXNfcGVyX291dGVyX2Nhc2U6IG51bWJlcjtcbiAgY29tbWVudHM6IHN0cmluZztcbiAgbm90ZXNfbG9jYXRpb246IHN0cmluZztcbiAgLy8gc2hpcHBpbmdcbiAgd2VpZ2h0OiBudW1iZXI7XG4gIGxlbmd0aDogbnVtYmVyO1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgbXN0cl9ncm91cHNfZ3JvdXBzOiBvYmplY3Q7XG4gIGN1cnJlbnRfdXNlcl9ncm91cHM6IG9iamVjdDtcbiAgZ3JvdXBzX2lkczoge1xuICAgIFtpbmRleDogc3RyaW5nXTogbnVtYmVyO1xuICB9O1xuICBhdmFpbGFibGVfcXVhbnRpdHk6IHtcbiAgICBbaW5kZXg6IHN0cmluZ106IG51bWJlcjtcbiAgfTtcbiAgdG90YWxfYXZhaWxhYmxlX2l0ZW1zOiB7XG4gICAgW2luZGV4OiBzdHJpbmddOiBudW1iZXI7XG4gIH07XG4gIGFsbF93YXJlaG91c2VzOiBbXG4gICAge1xuICAgICAgW2luZGV4OiBzdHJpbmddOiBudW1iZXIgfCBzdHJpbmc7XG4gICAgfVxuICBdO1xuICBtc3RyX3Byb2RfZ3Jwc19wcm9kX2dycHNfbmFtZXM6IHsgW2luZGV4OiBzdHJpbmddOiB7IGdyb3VwX25hbWU6IHN0cmluZzsgZ3JvdXBfaWQ6IG51bWJlciB9W10gfTtcbiAgbXN0cl9ncnBzX2dycHNfbmFtZXNfaW5fcHJvZDogeyBbaW5kZXg6IHN0cmluZ106IHsgZ3JvdXBfbmFtZTogc3RyaW5nOyBncm91cF9pZDogbnVtYmVyIH1bXSB9O1xuICB3YXJlaG91c2VfcHJvZHVjdF9xdHk6IG51bWJlcjtcbiAgcHJvZHVjdF9pbl93YXJlaG91c2VzOiB7IFtpbmRleDogc3RyaW5nXTogeyBbaW5kZXg6IHN0cmluZ106IG51bWJlciB9IH07XG4gIHdhcmVob3VzZV9wcm9kdWN0czogSVdhcmVob3VzZVByb2R1Y3RbXTtcbn1cbmludGVyZmFjZSBGaWx0ZXJKc29uRGF0YSB7XG4gIFtrZXk6IHN0cmluZ106IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIElQcm9kdWN0TWFzdGVyR3JvdXBHcm91cCB7XG4gIFtpbmRleDogc3RyaW5nXTogeyBncm91cF9uYW1lOiBzdHJpbmc7IGdyb3VwX2lkOiBudW1iZXIgfVtdO1xufVxuXG5pbnRlcmZhY2UgSU1hc3Rlckdyb3VwIHtcbiAgbmFtZTogc3RyaW5nO1xuICBtYXN0ZXJfZ3JvdXBzX2xpc3RfZ3JvdXBzOiB7IFtpbmRleDogc3RyaW5nXTogeyBncm91cF9uYW1lOiBzdHJpbmc7IGdyb3VwX2lkOiBudW1iZXIgfVtdIH07XG59XG5cbmludGVyZmFjZSBJV2FyZWhvdXNlUHJvZHVjdCB7XG4gIGlkOiBudW1iZXI7XG4gIHByb2R1Y3RfaWQ6IG51bWJlcjtcbiAgd2FyZWhvdXNlX2lkOiBudW1iZXI7XG4gIHByb2R1Y3RfcXVhbnRpdHk6IG51bWJlcjtcbiAgd2FyZWhvdXNlOiBJV2FyZWhvdXNlO1xufVxuXG5pbnRlcmZhY2UgSVdhcmVob3VzZSB7XG4gIGlkOiBudW1iZXI7XG4gIG5hbWU6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIElQcm9kdWN0R3JvdXBNYXN0ZXJHcm91cCB7XG4gIFtpbmRleDogc3RyaW5nXTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcbn1cblxuLy8gZ2xvYmFsIHZhcmlhYmxlIGZvciBtYW5kYXRvcnkgZXZlbnQgaW5zdGFuY2VcbmNvbnN0IGV2ZW50Q2hlY2tib3g6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1zaG93LWV2ZW50cy10b2dnbGUtYnRuJyk7XG5jb25zdCBldmVudFN0b2NrT3duQnlNZUNoZWNrYm94OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtc2hvdy1ldmVudHMtc3RvY2tzLW93bi1ieS1tZS1idG4nKTtcblxuLy8gbWFyayBjaGVja2JveCBhcyBjaGVja2VkIGlmIHdlIGFyZSBvbiBldmVudCBzdG9jayBvd24gYnkgbWUgcm91dGVcbmlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uaGFzaCA9PT0gJy9wcm9kdWN0L2V2ZW50c19zdG9ja3Nfb3duZWRfYnlfbWUnKSB7XG4gIGV2ZW50U3RvY2tPd25CeU1lQ2hlY2tib3guY2hlY2tlZCA9IHRydWU7XG59XG5cbmNvbnN0IGlzRXZlbnQgPSBldmVudENoZWNrYm94LmNoZWNrZWQgfHwgZXZlbnRTdG9ja093bkJ5TWVDaGVja2JveC5jaGVja2VkO1xuY29uc3QgZXZlbnRzV2FyZWhvdXNlID0gJ1dhcmVob3VzZSBFdmVudHMnO1xuY29uc3QgZXZlbnRNYXN0ZXJHcm91cCA9ICdFdmVudHMnO1xuY29uc3QgZml2ZURheXMgPSA1ICogMjQgKiA2MCAqIDYwICogMTAwMDtcblxuLy8gdmFyaWFibGUgdG8gc2V0IGRlZmF1bHQgaW1hZ2UgdG8gYnJhbmQgZHluYW1pY2FsbHkgaW4gbW9kYWwgd2luZG93LiBDYW4gd2UgZ2V0IGxpbmsgZnJvbSB0aGUgaW50ZXJuZXQ/XG5jb25zdCBkZWZhdWx0QnJhbmRJbWFnZSA9XG4gICdodHRwczovL2Z1bmtvLmNvbS9vbi9kZW1hbmR3YXJlLnN0YXRpYy8tL1NpdGVzLWZ1bmtvLW1hc3Rlci1jYXRhbG9nL2RlZmF1bHQvZHdiYjM4YTExMS9pbWFnZXMvZnVua28vdXBsb2FkLzU1OTk4X0NvY2FDb2xhX1MyX1Nwcml0ZUJvdHRsZUNhcF9QT1BfR0xBTS1XRUIucG5nJztcblxuLy8gY2hlY2sgaWYgcHJvZHVjdCBoYXMgZmlsdGVyIGFuZCBkaXNwbGF5IGl0XG5sZXQgZmlsdGVySnNvbkRhdGE6IEZpbHRlckpzb25EYXRhID0ge307XG5jb25zdCBmaWx0ZXJKc29uT2JqZWN0ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnZmlsdGVySnNvbkRhdGEnKTtcbmNvbnN0IGZpbHRlckRhdGEgPSBKU09OLnBhcnNlKGZpbHRlckpzb25PYmplY3QpO1xuaWYgKGZpbHRlckRhdGEgIT09IG51bGwgfHwgZmlsdGVyRGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gIGNvbnN0IGlzVmlzaWJsZUZpbHRlckpzb24gPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdpc1Zpc2libGVGaWx0ZXInKTtcbiAgbGV0IGlzVmlzaWJsZUZpbHRlciA9IEpTT04ucGFyc2UoaXNWaXNpYmxlRmlsdGVySnNvbik7XG4gIGlmIChpc1Zpc2libGVGaWx0ZXIpIHtcbiAgICBjb25zdCByZWZlcmVuY2VUaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXRhYmxlLXRoLXByb2R1Y3QtdHlwZScpO1xuICAgIGNvbnN0IHByb2R1Y3RJdGVtVHJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlLXByb2R1Y3QtaXRlbS10cicpO1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gZmlsdGVyRGF0YSkge1xuICAgICAgY29uc3QgcHJvZHVjdEZpbHRlclRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKTtcbiAgICAgIHByb2R1Y3RGaWx0ZXJUaC5zZXRBdHRyaWJ1dGUoJ2lkJywgYHByb2R1Y3QtdGFibGUtZmlsdGVyLW1hc3Rlci1ncm91cC0ke2tleS5yZXBsYWNlKC8gL2csICdfJyl9YCk7XG4gICAgICBwcm9kdWN0RmlsdGVyVGguY2xhc3NMaXN0LmFkZCgncHgtNicsICdweS0zJywgJ21heC13aWR0aC0xMDAnKTtcbiAgICAgIHByb2R1Y3RGaWx0ZXJUaC5zZXRBdHRyaWJ1dGUoJ3Njb3BlJywgJ2NvbCcpO1xuICAgICAgcHJvZHVjdEZpbHRlclRoLmlubmVySFRNTCA9IGtleTtcbiAgICAgIHJlZmVyZW5jZVRoLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHByb2R1Y3RGaWx0ZXJUaCwgcmVmZXJlbmNlVGgubmV4dFNpYmxpbmcpO1xuICAgIH1cblxuICAgIHByb2R1Y3RJdGVtVHJzLmZvckVhY2goKHByb2R1Y3Q6IEhUTUxUYWJsZVJvd0VsZW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHJlZmVyZW5jZVRkID0gcHJvZHVjdC5jZWxsc1s0XTtcbiAgICAgIGNvbnN0IHByb2R1Y3RTS1UgPSBwcm9kdWN0LmNlbGxzWzNdLmlubmVyVGV4dDtcblxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gZmlsdGVyRGF0YSkge1xuICAgICAgICBjb25zdCBwcm9kdWN0RmlsdGVyTmFtZSA9IGZpbHRlckRhdGFba2V5XTtcbiAgICAgICAgY29uc3QgcHJvZHVjdEZpbHRlclRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgcHJvZHVjdEZpbHRlclRkLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAnaWQnLFxuICAgICAgICAgIGBwcm9kdWN0LXRhYmxlLWZpbHRlci0ke2tleX0tJHtwcm9kdWN0RmlsdGVyTmFtZS5yZXBsYWNlKC8gL2csICdfJyl9LSR7cHJvZHVjdFNLVS5yZXBsYWNlKC8gL2csICdfJyl9YFxuICAgICAgICApO1xuICAgICAgICBwcm9kdWN0RmlsdGVyVGQuY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAndGV4dC1iYXNlJyxcbiAgICAgICAgICAnZm9udC1ub3JtYWwnLFxuICAgICAgICAgICd0ZXh0LWdyYXktOTAwJyxcbiAgICAgICAgICAnd2hpdGVzcGFjZS1ub3dyYXAnLFxuICAgICAgICAgICdkYXJrOnRleHQtd2hpdGUnLFxuICAgICAgICAgICdtYXgtd2lkdGgtMTAwJ1xuICAgICAgICApO1xuICAgICAgICBwcm9kdWN0RmlsdGVyVGQuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwicGwtM1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXNtXCI+JHtwcm9kdWN0RmlsdGVyTmFtZX08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICBgO1xuICAgICAgICByZWZlcmVuY2VUZC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShwcm9kdWN0RmlsdGVyVGQsIHJlZmVyZW5jZVRkLm5leHRTaWJsaW5nKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpc1Zpc2libGVGaWx0ZXIgPSBmYWxzZTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdpc1Zpc2libGVGaWx0ZXInLCBKU09OLnN0cmluZ2lmeShpc1Zpc2libGVGaWx0ZXIpKTtcbiAgfVxufVxuXG4vLyBmdW5jdGlvbiB0byBhZGQgY29sdW1uIGJ5IGZpbHRlclxuZnVuY3Rpb24gY3JlYXRlQ3VzdG9taXplVmlld0NvbHVtbihwcm9kdWN0c0dyb3VwczogSVByb2R1Y3RHcm91cE1hc3Rlckdyb3VwLCBncm91cE5hbWU6IHN0cmluZykge1xuICAvL2Nob29zZSBwb3NpdGlvbiBpbiB0YWJsZVxuICBjb25zdCBwb3NpdGlvbkluVGFibGUgPSA0O1xuICBjb25zdCBwcm9kdWN0VGFibGVIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC10YWJsZS1oZWFkZXItdHInKTtcbiAgY29uc3QgcHJvZHVjdEl0ZW1UcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGUtcHJvZHVjdC1pdGVtLXRyJyk7XG5cbiAgY29uc3QgcHJvZHVjdEl0ZW1IZWFkZXJSZWZlcmVuY2UgPSBwcm9kdWN0VGFibGVIZWFkZXIuY2hpbGRyZW5bcG9zaXRpb25JblRhYmxlXTtcbiAgY29uc3QgcHJvZHVjdEl0ZW1IZWFkZXIgPSBwcm9kdWN0SXRlbUhlYWRlclJlZmVyZW5jZS5jbG9uZU5vZGUodHJ1ZSkgYXMgSFRNTEVsZW1lbnQ7XG4gIHByb2R1Y3RJdGVtSGVhZGVyLnNldEF0dHJpYnV0ZSgnaWQnLCBgcHJvZHVjdC10YWJsZS1maWx0ZXItbWFzdGVyLWdyb3VwLSR7Z3JvdXBOYW1lfWApO1xuICBwcm9kdWN0SXRlbUhlYWRlci5pbm5lckhUTUwgPSBncm91cE5hbWUucmVwbGFjZSgvXy9nLCAnICcpO1xuICBwcm9kdWN0VGFibGVIZWFkZXIuaW5zZXJ0QmVmb3JlKHByb2R1Y3RJdGVtSGVhZGVyLCBwcm9kdWN0SXRlbUhlYWRlclJlZmVyZW5jZS5uZXh0U2libGluZyk7XG5cbiAgcHJvZHVjdEl0ZW1UcnMuZm9yRWFjaCgocHJvZHVjdEl0ZW06IEhUTUxUYWJsZVJvd0VsZW1lbnQpID0+IHtcbiAgICBjb25zdCBwcm9kdWN0SXRlbVJlZmVyZW5jZSA9IHByb2R1Y3RJdGVtLmNoaWxkcmVuW3Bvc2l0aW9uSW5UYWJsZV07XG4gICAgY29uc3QgcHJvZHVjdFNLVSA9IHByb2R1Y3RJdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtcHJvZHVjdC1za3UnKTtcblxuICAgIGNvbnN0IHByb2R1Y3RJdGVtVGQgPSBwcm9kdWN0SXRlbVJlZmVyZW5jZS5jbG9uZU5vZGUodHJ1ZSkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgcHJvZHVjdEl0ZW1UZC5jbGFzc0xpc3QuYWRkKGBwcm9kdWN0LXRhYmxlLWl0ZW0tdGQtJHtncm91cE5hbWV9YCk7XG4gICAgcHJvZHVjdEl0ZW1UZC5pbm5lckhUTUwgPSBwcm9kdWN0c0dyb3Vwc1twcm9kdWN0U0tVXVtncm91cE5hbWUucmVwbGFjZSgvXy9nLCAnICcpXSB8fCAnLSc7XG4gICAgcHJvZHVjdEl0ZW0uaW5zZXJ0QmVmb3JlKHByb2R1Y3RJdGVtVGQsIHByb2R1Y3RJdGVtUmVmZXJlbmNlLm5leHRTaWJsaW5nKTtcbiAgfSk7XG59XG5cbi8vZnVuY3Rpb24gdG8gZGlzcGxheSBmaWx0ZXIgYnkgbWFzdGVyIGdyb3VwIG9uIGxvYWQgcGFnZVxuY29uc3QgZ3JvdXBCcmFuZCA9ICdCcmFuZCc7XG5sZXQgZ2xvYmFsRmlsdGVyTWFzdGVyR3JvdXAgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2dsb2JhbEZpbHRlck1hc3Rlckdyb3VwJykpO1xuXG5pZiAoIWdsb2JhbEZpbHRlck1hc3Rlckdyb3VwKSB7XG4gIGdsb2JhbEZpbHRlck1hc3Rlckdyb3VwID0gW2dyb3VwQnJhbmRdO1xuICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdnbG9iYWxGaWx0ZXJNYXN0ZXJHcm91cCcsIEpTT04uc3RyaW5naWZ5KGdsb2JhbEZpbHRlck1hc3Rlckdyb3VwKSk7XG59XG5jb25zdCBwcm9kdWN0TWdHR2xvYmFsID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0TWdHJykpO1xuXG4vLyBhZGQgYnJhbmQgdG8gZGVmYXVsdCBnbG9iYWwgZmlsdGVyXG5pZiAoIWdsb2JhbEZpbHRlck1hc3Rlckdyb3VwLmluY2x1ZGVzKGdyb3VwQnJhbmQpKSB7XG4gIGdsb2JhbEZpbHRlck1hc3Rlckdyb3VwLnB1c2goZ3JvdXBCcmFuZCk7XG59XG5cbmlmIChnbG9iYWxGaWx0ZXJNYXN0ZXJHcm91cCAmJiBnbG9iYWxGaWx0ZXJNYXN0ZXJHcm91cC5sZW5ndGggIT09IDApIHtcbiAgY29uc3QgZmlsdGVyUHJvZHVjdE1hc3Rlckdyb3VwQ2hlY2tib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgJy5wcm9kdWN0cy1maWx0ZXItcHJvZHVjdC1tYXN0ZXItZ3JvdXAtY2hlY2tib3gnXG4gICk7XG4gIGZpbHRlclByb2R1Y3RNYXN0ZXJHcm91cENoZWNrYm94ZXMuZm9yRWFjaCgoY2hlY2tib3g6IEhUTUxJbnB1dEVsZW1lbnQpID0+IHtcbiAgICBpZiAoZ2xvYmFsRmlsdGVyTWFzdGVyR3JvdXAuaW5jbHVkZXMoY2hlY2tib3gudmFsdWUpKSB7XG4gICAgICBjaGVja2JveC5jaGVja2VkID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuICBmb3IgKGNvbnN0IG1hc3Rlckdyb3VwTmFtZSBvZiBnbG9iYWxGaWx0ZXJNYXN0ZXJHcm91cCkge1xuICAgIGNvbnN0IGlzR3JvdXBFeGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNwcm9kdWN0LXRhYmxlLWZpbHRlci1tYXN0ZXItZ3JvdXAtJHttYXN0ZXJHcm91cE5hbWV9YCk7XG5cbiAgICBpZiAoIWlzR3JvdXBFeGlzdCkge1xuICAgICAgY3JlYXRlQ3VzdG9taXplVmlld0NvbHVtbihwcm9kdWN0TWdHR2xvYmFsLCBtYXN0ZXJHcm91cE5hbWUpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBmdW5jdGlvbiB0byBkaXNwbGF5IHByb2R1Y3QgbWFzdGVyIGdyb3VwIGluIHByb2R1Y3QgdGFibGVcbmNvbnN0IGNoZWNrYm94RmlsdGVyUHJvZHVjdE1hc3Rlckdyb3VwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0cy1maWx0ZXItcHJvZHVjdC1tYXN0ZXItZ3JvdXAtY2hlY2tib3gnKTtcbmNoZWNrYm94RmlsdGVyUHJvZHVjdE1hc3Rlckdyb3Vwcy5mb3JFYWNoKChjaGVja2JveCkgPT4ge1xuICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xuICAgIGNvbnN0IHByb2R1Y3RNZ0cgPSBKU09OLnBhcnNlKGNoZWNrYm94LmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtcHJvZHVjdC1tZy1nJykpO1xuICAgIGNvbnN0IGdsb2JhbEZpbHRlck1hc3Rlckdyb3VwID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdnbG9iYWxGaWx0ZXJNYXN0ZXJHcm91cCcpKTtcblxuICAgIGNvbnN0IG1hc3Rlckdyb3VwTmFtZSA9IGNoZWNrYm94LmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtZ3JvdXAtbmFtZScpO1xuICAgIGNvbnN0IHByb2R1Y3RJdGVtVHJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlLXByb2R1Y3QtaXRlbS10cicpO1xuXG4gICAgbGV0IGlzQWN0aXZlID0gKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWQ7XG5cbiAgICBpZiAoaXNBY3RpdmUpIHtcbiAgICAgIGlmICghZ2xvYmFsRmlsdGVyTWFzdGVyR3JvdXAuaW5jbHVkZXMobWFzdGVyR3JvdXBOYW1lKSkge1xuICAgICAgICBnbG9iYWxGaWx0ZXJNYXN0ZXJHcm91cC5wdXNoKG1hc3Rlckdyb3VwTmFtZSk7XG4gICAgICB9XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdnbG9iYWxGaWx0ZXJNYXN0ZXJHcm91cCcsIEpTT04uc3RyaW5naWZ5KGdsb2JhbEZpbHRlck1hc3Rlckdyb3VwKSk7XG4gICAgICBjb25zdCBpc0dyb3VwRXhpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcHJvZHVjdC10YWJsZS1maWx0ZXItbWFzdGVyLWdyb3VwLSR7bWFzdGVyR3JvdXBOYW1lfWApO1xuXG4gICAgICBpZiAoIWlzR3JvdXBFeGlzdCkge1xuICAgICAgICBjcmVhdGVDdXN0b21pemVWaWV3Q29sdW1uKHByb2R1Y3RNZ0csIG1hc3Rlckdyb3VwTmFtZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghaXNBY3RpdmUpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gZ2xvYmFsRmlsdGVyTWFzdGVyR3JvdXAuaW5kZXhPZihtYXN0ZXJHcm91cE5hbWUpO1xuXG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIGdsb2JhbEZpbHRlck1hc3Rlckdyb3VwLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdnbG9iYWxGaWx0ZXJNYXN0ZXJHcm91cCcsIEpTT04uc3RyaW5naWZ5KGdsb2JhbEZpbHRlck1hc3Rlckdyb3VwKSk7XG4gICAgICBjb25zdCBpc01hc3Rlckdyb3VwRXhpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcHJvZHVjdC10YWJsZS1maWx0ZXItbWFzdGVyLWdyb3VwLSR7bWFzdGVyR3JvdXBOYW1lfWApO1xuICAgICAgaWYgKGlzTWFzdGVyR3JvdXBFeGlzdCkge1xuICAgICAgICBpc01hc3Rlckdyb3VwRXhpc3QucmVtb3ZlKCk7XG4gICAgICAgIHByb2R1Y3RJdGVtVHJzLmZvckVhY2goKHByb2R1Y3RJdGVtOiBIVE1MVGFibGVSb3dFbGVtZW50KSA9PiB7XG4gICAgICAgICAgY29uc3QgaXNQcm9kdWN0RmlsdGVyRXhpc3QgPSBwcm9kdWN0SXRlbS5xdWVyeVNlbGVjdG9yKGAucHJvZHVjdC10YWJsZS1pdGVtLXRkLSR7bWFzdGVyR3JvdXBOYW1lfWApO1xuICAgICAgICAgIGlmIChpc1Byb2R1Y3RGaWx0ZXJFeGlzdCkge1xuICAgICAgICAgICAgaXNQcm9kdWN0RmlsdGVyRXhpc3QucmVtb3ZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufSk7XG5cbmNvbnN0IHByb2R1Y3RSZXF1ZXN0U2hhcmVCcmFuZFNlbGVjdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtcmVxdWVzdC1zaGFyZS1kZWZpbmUtYnJhbmQnKTtcbmNvbnN0IHByb2R1Y3RSZXF1ZXN0U2hhcmVCcmFuZFNlbGVjdG9yT3B0aW9ucyA9IHByb2R1Y3RSZXF1ZXN0U2hhcmVCcmFuZFNlbGVjdG9yLnF1ZXJ5U2VsZWN0b3JBbGwoJ29wdGlvbicpO1xuY29uc3QgcHJvZHVjdFJlcXVlc3RTaGFyZUJyYW5kU2VsZWN0b3JPcHRpb25zQW1vdW50ID0gcHJvZHVjdFJlcXVlc3RTaGFyZUJyYW5kU2VsZWN0b3JPcHRpb25zLmxlbmd0aDtcbmlmICghcHJvZHVjdFJlcXVlc3RTaGFyZUJyYW5kU2VsZWN0b3JPcHRpb25zQW1vdW50KSB7XG4gIHByb2R1Y3RSZXF1ZXN0U2hhcmVCcmFuZFNlbGVjdG9yLmNsYXNzTGlzdC5hZGQoJ2JvcmRlci1lcnJvci1yZWQnKTtcblxuICBjb25zdCBtZXNzYWdlUGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICBtZXNzYWdlUGFyYWdyYXBoLmNsYXNzTGlzdC5hZGQoJ3RleHQtc20nLCAndGV4dC1yZWQnKTtcbiAgbWVzc2FnZVBhcmFncmFwaC5pbm5lckhUTUwgPVxuICAgIFwiWW91IGhhdmUgbm8gZ3JvdXAhIFBsZWFzZSwgZGVmaW5lIHlvdXIgZ3JvdXAgPGEgaHJlZj0nL3VzZXIvJyBjbGFzcz0ndW5kZXJsaW5lZCc+aGVyZTwvYT5cIjtcbiAgcHJvZHVjdFJlcXVlc3RTaGFyZUJyYW5kU2VsZWN0b3IucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChtZXNzYWdlUGFyYWdyYXBoKTtcbn1cblxuY29uc3QgJHJlcXVlc3RTaGFyZU1vZGFsRWxlbWVudDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVxdWVzdC1zaGFyZS1wcm9kdWN0LW1vZGFsJyk7XG5jb25zdCAkc2hpcE1vZGFsRWxlbWVudDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2hpcC1wcm9kdWN0LW1vZGFsJyk7XG5jb25zdCAkYXNzaWduTW9kYWxFbGVtZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhc3NpZ24tcHJvZHVjdC1tb2RhbCcpO1xuY29uc3QgJGFkZFByb2R1Y3RNb2RhbEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1wcm9kdWN0LW1vZGFsJyk7XG5jb25zdCAkdmlld1Byb2R1Y3RNb2RhbEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ZpZXctcHJvZHVjdC1tb2RhbCcpO1xuY29uc3QgJGFkanVzdFByb2R1Y3RNb2RhbEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkanVzdC1wcm9kdWN0LW1vZGFsJyk7XG5jb25zdCAkZWRpdFByb2R1Y3RNb2RhbEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXRQcm9kdWN0TW9kYWwnKTtcbmNvbnN0ICRldmVudFByb2R1Y3RNb2RhbEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2V2ZW50LXByb2R1Y3QtbW9kYWwnKTtcblxuY29uc3QgbW9kYWxPcHRpb25zOiBNb2RhbE9wdGlvbnMgPSB7XG4gIHBsYWNlbWVudDogJ2JvdHRvbS1yaWdodCcsXG4gIGJhY2tkcm9wOiAnZHluYW1pYycsXG4gIGJhY2tkcm9wQ2xhc3NlczogJ2JnLWdyYXktOTAwIGJnLW9wYWNpdHktNTAgZGFyazpiZy1vcGFjaXR5LTgwIGZpeGVkIGluc2V0LTAgei00MCcsXG4gIGNsb3NhYmxlOiB0cnVlLFxuICBvbkhpZGU6ICgpID0+IHtcbiAgICBjb25zdCBwcm9kdWN0ID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5wcm9kdWN0KTtcbiAgICBjb25zdCBtc3RyR3JvdXBzRW50cmllcyA9IE9iamVjdC5lbnRyaWVzKHByb2R1Y3QubXN0cl9ncm91cHNfZ3JvdXBzKTtcblxuICAgIG1zdHJHcm91cHNFbnRyaWVzLmZvckVhY2goKFtrZXksIHZhbHVlXTogW3N0cmluZywgc3RyaW5nXSkgPT4ge1xuICAgICAgZGVsZXRlU2hpcEFzc2lnbkJ1dHRvbih2YWx1ZS5yZXBsYWNlKC9cXHMvZywgJ18nKSwga2V5KTtcbiAgICB9KTtcbiAgICBjbGVhclByb2R1Y3RHcm91cENvbnRhaW5lcigpO1xuICAgIGNvbnN0IHByb2R1Y3RWaWV3Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtdmlldy1ncmlkLWNvbnRhaW5lcicpO1xuICAgIHByb2R1Y3RWaWV3Q29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICB9LFxuICBvblNob3c6ICgpID0+IHt9LFxuICBvblRvZ2dsZTogKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdtb2RhbCBoYXMgYmVlbiB0b2dnbGVkJyk7XG4gIH0sXG59O1xuXG5jb25zdCBhZGp1c3RNb2RhbE9wdGlvbnM6IE1vZGFsT3B0aW9ucyA9IHtcbiAgcGxhY2VtZW50OiAnYm90dG9tLXJpZ2h0JyxcbiAgYmFja2Ryb3A6ICdkeW5hbWljJyxcbiAgYmFja2Ryb3BDbGFzc2VzOiAnYmctZ3JheS05MDAgYmctb3BhY2l0eS01MCBkYXJrOmJnLW9wYWNpdHktODAgZml4ZWQgaW5zZXQtMCB6LTQwJyxcbiAgY2xvc2FibGU6IHRydWUsXG4gIG9uSGlkZTogKCkgPT4ge1xuICAgIGNvbnN0IHByb2R1Y3QgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLnByb2R1Y3QpO1xuICAgIGNvbnN0IG1zdHJHcm91cHNFbnRyaWVzID0gT2JqZWN0LmVudHJpZXMocHJvZHVjdC5tc3RyX2dyb3Vwc19ncm91cHMpO1xuXG4gICAgbXN0ckdyb3Vwc0VudHJpZXMuZm9yRWFjaCgoW2tleSwgdmFsdWVdOiBbc3RyaW5nLCBzdHJpbmddKSA9PiB7XG4gICAgICBkZWxldGVBZGp1c3RDb250YWluZXIodmFsdWUucmVwbGFjZSgvXFxzL2csICdfJyksIGtleSk7XG4gICAgfSk7XG4gICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSgncHJvZHVjdEluV2FyZWhvdXNlcycpO1xuICB9LFxuICBvblNob3c6ICgpID0+IHt9LFxuICBvblRvZ2dsZTogKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdtb2RhbCBoYXMgYmVlbiB0b2dnbGVkJyk7XG4gIH0sXG59O1xuXG5jb25zdCBtb2RhbFNoaXBBc3NpZ25PcHRpb25zOiBNb2RhbE9wdGlvbnMgPSB7XG4gIHBsYWNlbWVudDogJ2JvdHRvbS1yaWdodCcsXG4gIGJhY2tkcm9wOiAnZHluYW1pYycsXG4gIGJhY2tkcm9wQ2xhc3NlczogJ2JnLWdyYXktOTAwIGJnLW9wYWNpdHktNTAgZGFyazpiZy1vcGFjaXR5LTgwIGZpeGVkIGluc2V0LTAgei00MCcsXG4gIGNsb3NhYmxlOiB0cnVlLFxuICBvbkhpZGU6ICgpID0+IHtcbiAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKCdwcm9kdWN0Jyk7XG4gIH0sXG4gIG9uU2hvdzogKCkgPT4ge30sXG4gIG9uVG9nZ2xlOiAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ21vZGFsIGhhcyBiZWVuIHRvZ2dsZWQnKTtcbiAgfSxcbn07XG5cbmNvbnN0IG1vZGFsRXZlbnRPcHRpb25zOiBNb2RhbE9wdGlvbnMgPSB7XG4gIHBsYWNlbWVudDogJ2JvdHRvbS1yaWdodCcsXG4gIGJhY2tkcm9wOiAnZHluYW1pYycsXG4gIGJhY2tkcm9wQ2xhc3NlczogJ2JnLWdyYXktOTAwIGJnLW9wYWNpdHktNTAgZGFyazpiZy1vcGFjaXR5LTgwIGZpeGVkIGluc2V0LTAgei01MScsXG4gIGNsb3NhYmxlOiB0cnVlLFxuICBvbkhpZGU6ICgpID0+IHtcbiAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKCdwcm9kdWN0Jyk7XG4gIH0sXG4gIG9uU2hvdzogKCkgPT4ge30sXG4gIG9uVG9nZ2xlOiAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ21vZGFsIGhhcyBiZWVuIHRvZ2dsZWQnKTtcbiAgfSxcbn07XG5cbmNvbnN0IGV2ZW50TW9kYWxPcHRpb25zOiBNb2RhbE9wdGlvbnMgPSB7XG4gIHBsYWNlbWVudDogJ2JvdHRvbS1yaWdodCcsXG4gIGJhY2tkcm9wOiAnZHluYW1pYycsXG4gIGJhY2tkcm9wQ2xhc3NlczogJ2JnLWdyYXktOTAwIGJnLW9wYWNpdHktNTAgZGFyazpiZy1vcGFjaXR5LTgwIGZpeGVkIGluc2V0LTAgei01MScsXG4gIGNsb3NhYmxlOiB0cnVlLFxuICBvbkhpZGU6ICgpID0+IHtcbiAgICBjb25zdCBwcm9kdWN0ID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5wcm9kdWN0KTtcbiAgICBjb25zdCBtc3RyR3JvdXBzRW50cmllcyA9IE9iamVjdC5lbnRyaWVzKHByb2R1Y3QubXN0cl9ncm91cHNfZ3JvdXBzKTtcblxuICAgIG1zdHJHcm91cHNFbnRyaWVzLmZvckVhY2goKFtrZXksIHZhbHVlXTogW3N0cmluZywgc3RyaW5nXSkgPT4ge1xuICAgICAgZGVsZXRlU2hpcEFzc2lnbkJ1dHRvbih2YWx1ZS5yZXBsYWNlKC9cXHMvZywgJ18nKSwga2V5KTtcbiAgICB9KTtcbiAgICBjbGVhclByb2R1Y3RHcm91cENvbnRhaW5lcigpO1xuICAgIHBpY2tlci5kZXN0cm95KCk7XG4gIH0sXG4gIG9uU2hvdzogKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdtb2RhbCBoYXMgYmVlbiBzaG93bicpO1xuICB9LFxuICBvblRvZ2dsZTogKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdtb2RhbCBoYXMgYmVlbiB0b2dnbGVkJyk7XG4gIH0sXG59O1xuXG5jb25zdCBhZGRNb2RhbDogTW9kYWxJbnRlcmZhY2UgPSBuZXcgTW9kYWwoJGFkZFByb2R1Y3RNb2RhbEVsZW1lbnQsIG1vZGFsT3B0aW9ucyk7XG5jb25zdCB2aWV3TW9kYWw6IE1vZGFsSW50ZXJmYWNlID0gbmV3IE1vZGFsKCR2aWV3UHJvZHVjdE1vZGFsRWxlbWVudCwgbW9kYWxPcHRpb25zKTtcbmNvbnN0IGFkanVzdE1vZGFsOiBNb2RhbEludGVyZmFjZSA9IG5ldyBNb2RhbCgkYWRqdXN0UHJvZHVjdE1vZGFsRWxlbWVudCwgYWRqdXN0TW9kYWxPcHRpb25zKTtcbmNvbnN0IGVkaXRNb2RhbDogTW9kYWxJbnRlcmZhY2UgPSBuZXcgTW9kYWwoJGVkaXRQcm9kdWN0TW9kYWxFbGVtZW50LCBtb2RhbE9wdGlvbnMpO1xuY29uc3QgcmVxdWVzdFNoYXJlTW9kYWw6IE1vZGFsSW50ZXJmYWNlID0gbmV3IE1vZGFsKCRyZXF1ZXN0U2hhcmVNb2RhbEVsZW1lbnQsIG1vZGFsU2hpcEFzc2lnbk9wdGlvbnMpO1xuY29uc3Qgc2hpcE1vZGFsOiBNb2RhbEludGVyZmFjZSA9IG5ldyBNb2RhbCgkc2hpcE1vZGFsRWxlbWVudCwgbW9kYWxTaGlwQXNzaWduT3B0aW9ucyk7XG5jb25zdCBhc3NpZ25Nb2RhbDogTW9kYWxJbnRlcmZhY2UgPSBuZXcgTW9kYWwoJGFzc2lnbk1vZGFsRWxlbWVudCwgbW9kYWxTaGlwQXNzaWduT3B0aW9ucyk7XG5jb25zdCBldmVudE1vZGFsOiBNb2RhbEludGVyZmFjZSA9IG5ldyBNb2RhbCgkZXZlbnRQcm9kdWN0TW9kYWxFbGVtZW50LCBldmVudE1vZGFsT3B0aW9ucyk7XG5cbmNvbnN0IGNsb3NpbmdBZGRNb2RhbEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtcHJvZHVjdC1tb2RhbC1jbG9zZS1idG4nKTtcbmNsb3NpbmdBZGRNb2RhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgYWRkTW9kYWwuaGlkZSgpO1xufSk7XG5jb25zdCBjbG9zaW5nQWRqdXN0TW9kYWxCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRqdXN0LXByb2R1Y3QtbW9kYWwtY2xvc2UtYnRuJyk7XG5jbG9zaW5nQWRqdXN0TW9kYWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGFkanVzdE1vZGFsLmhpZGUoKTtcbn0pO1xuY29uc3QgY2xvc2luZ0VkaXRNb2RhbEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0LXByb2R1Y3QtbW9kYWwtY2xvc2UtYnRuJyk7XG5jbG9zaW5nRWRpdE1vZGFsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBlZGl0TW9kYWwuaGlkZSgpO1xufSk7XG5jb25zdCBjbG9zaW5nVmlld01vZGFsQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXctcHJvZHVjdC1tb2RhbC1jbG9zZS1idG4nKTtcbmNsb3NpbmdWaWV3TW9kYWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIHZpZXdNb2RhbC5oaWRlKCk7XG59KTtcbmNvbnN0IGNsb3NpbmdFdmVudE1vZGFsQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V2ZW50LXByb2R1Y3QtbW9kYWwtY2xvc2UtYnRuJyk7XG5jbG9zaW5nRXZlbnRNb2RhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgZXZlbnRNb2RhbC5oaWRlKCk7XG59KTtcblxuY29uc3QgJGJ1dHRvbkVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3QtZWRpdC1idXR0b24nKTtcbiRidXR0b25FbGVtZW50cy5mb3JFYWNoKChlKSA9PlxuICBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGVkaXRQcm9kdWN0KEpTT04ucGFyc2UoZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0JykpKTtcbiAgfSlcbik7XG5cbmNvbnN0ICRhZGRCdXR0b25FbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0LWFkZC1idXR0b24nKTtcbiRhZGRCdXR0b25FbGVtZW50cy5mb3JFYWNoKChlKSA9PlxuICBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IGdyb3VwcyA9IEpTT04ucGFyc2UoZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0LWdyb3VwcycpKTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdncm91cHMnLCBKU09OLnN0cmluZ2lmeShncm91cHMpKTtcbiAgICBhZGRQcm9kdWN0KGdyb3Vwcyk7XG4gIH0pXG4pO1xuXG4vLyBwaWNrIGRhdGUgcmFuZ2VcbmNvbnN0IHsgRGF0ZVRpbWUgfSA9IGVhc2VwaWNrO1xuZnVuY3Rpb24gZm9ybWF0RGF0ZShkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgbW9udGggPSAoZGF0ZS5nZXRNb250aCgpICsgMSkudG9TdHJpbmcoKTtcbiAgY29uc3QgZGF5ID0gZGF0ZS5nZXREYXRlKCkudG9TdHJpbmcoKTtcbiAgcmV0dXJuIGAke3llYXJ9LSR7bW9udGh9LSR7ZGF5fWA7XG59XG5cbmZ1bmN0aW9uIGdldEZpcnN0QW5kTGFzdERhdGUoKSB7XG4gIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgY29uc3QgZmlmdGhEYXlCZWZvcmUgPSBuZXcgRGF0ZSh0b2RheSk7XG4gIGZpZnRoRGF5QmVmb3JlLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gNSk7XG4gIGNvbnN0IGZpZnRoRGF5QWZ0ZXIgPSBuZXcgRGF0ZSh0b2RheSk7XG4gIGZpZnRoRGF5QWZ0ZXIuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgKyA2KTtcbiAgcmV0dXJuIFtmb3JtYXREYXRlKGZpZnRoRGF5QmVmb3JlKSwgZm9ybWF0RGF0ZShmaWZ0aERheUFmdGVyKV07XG59XG5cbmNvbnN0IGJvb2tlZERhdGVzID0gW2dldEZpcnN0QW5kTGFzdERhdGUoKV0ubWFwKChkKSA9PiB7XG4gIGlmIChkIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKGRbMF0pO1xuICAgIGNvbnN0IGVuZCA9IG5ldyBEYXRlKGRbMV0pO1xuICAgIHJldHVybiBbc3RhcnQsIGVuZF07XG4gIH1cbiAgcmV0dXJuIG5ldyBEYXRlVGltZShkLCAnWVlZWS1NTS1ERCcpO1xufSk7XG5cbmxldCBmZXRjaGVkQW1vdW50QnlEYXRlID0gW10gYXMgeyBkYXRlOiBzdHJpbmc7IHF1YW50aXR5OiBudW1iZXIgfVtdO1xuXG5hc3luYyBmdW5jdGlvbiBnZXRFdmVudEF2YWlsYWJsZVF1YW50aXR5KHByb2R1Y3RfaWQ6IG51bWJlciwgZ3JvdXA6IHN0cmluZywgY2FsZW5kYXJGaWx0ZXI6IHN0cmluZ1tdKSB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgYC9ldmVudC9nZXRfYXZhaWxhYmxlX3F1YW50aXR5P2dyb3VwX25hbWU9JHtncm91cC5yZXBsYWNlKFxuICAgICAgJ18nLFxuICAgICAgJyAnXG4gICAgKX0mcHJvZHVjdF9pZD0ke3Byb2R1Y3RfaWR9JmRhdGVzPSR7SlNPTi5zdHJpbmdpZnkoY2FsZW5kYXJGaWx0ZXIpfWBcbiAgKTtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgZmV0Y2hlZEFtb3VudEJ5RGF0ZSA9IGRhdGE7XG5cbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8vIHNlYXJjaCBmbG93XG5jb25zdCBzZWFyY2hJbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YWJsZS1zZWFyY2gtcHJvZHVjdHMnKTtcbmNvbnN0IHNlYXJjaElucHV0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RhYmxlLXNlYXJjaC1wcm9kdWN0LWJ1dHRvbicpO1xuaWYgKHNlYXJjaElucHV0QnV0dG9uICYmIHNlYXJjaElucHV0KSB7XG4gIHNlYXJjaElucHV0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KCdxJywgc2VhcmNoSW5wdXQudmFsdWUpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYCR7dXJsLmhyZWZ9YDtcbiAgfSk7XG59XG5jb25zdCBkZWxldGVCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRlbGV0ZS1wcm9kdWN0LWJ0bicpO1xuXG5kZWxldGVCdXR0b25zLmZvckVhY2goKGUpID0+IHtcbiAgZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICBpZiAoY29uZmlybSgnQXJlIHN1cmU/JykpIHtcbiAgICAgIGxldCBpZCA9IGUuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2R1Y3QtaWQnKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9wcm9kdWN0L2RlbGV0ZS8ke2lkfWAsIHtcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgIH0pO1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn0pO1xuXG5mdW5jdGlvbiBhZGRQcm9kdWN0KGdyb3VwczogSVByb2R1Y3RNYXN0ZXJHcm91cEdyb3VwKSB7XG4gIGFkZE1vZGFsLnNob3coKTtcbiAgY29uc3QgcHJvZHVjdE1hc3Rlckdyb3VwQWRkU2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgJyNwcm9kdWN0LW1hc3Rlci1ncm91cC1hZGQtYWRkLXByb2R1Y3QtMSdcbiAgKTtcbiAgY29uc3Qgb3B0aW9ucyA9IHByb2R1Y3RNYXN0ZXJHcm91cEFkZFNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKCdvcHRpb24nKTtcblxuICBwcm9kdWN0TWFzdGVyR3JvdXBBZGRTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgIG9wdGlvbnMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgaWYgKGUudGV4dENvbnRlbnQgPT09IHByb2R1Y3RNYXN0ZXJHcm91cEFkZFNlbGVjdC5vcHRpb25zW3Byb2R1Y3RNYXN0ZXJHcm91cEFkZFNlbGVjdC5zZWxlY3RlZEluZGV4XS50ZXh0KSB7XG4gICAgICAgIGNvbnN0IGdyb3VwU2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZ3JvdXAtYWRkLWl0ZW0tMScpO1xuICAgICAgICBjb25zdCBvcHRpb25DYXRlZ29yeSA9XG4gICAgICAgICAgZ3JvdXBzW3Byb2R1Y3RNYXN0ZXJHcm91cEFkZFNlbGVjdC5vcHRpb25zW3Byb2R1Y3RNYXN0ZXJHcm91cEFkZFNlbGVjdC5zZWxlY3RlZEluZGV4XS50ZXh0XTtcblxuICAgICAgICBncm91cFNlbGVjdC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgaWYgKG9wdGlvbkNhdGVnb3J5KSB7XG4gICAgICAgICAgb3B0aW9uQ2F0ZWdvcnkuZm9yRWFjaCgoZ3JvdXA6IHsgZ3JvdXBfbmFtZTogc3RyaW5nOyBncm91cF9pZDogbnVtYmVyIH0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN0b3JlU2VsZWN0T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgICAgICBzdG9yZVNlbGVjdE9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgZ3JvdXAuZ3JvdXBfaWQudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICBzdG9yZVNlbGVjdE9wdGlvbi50ZXh0Q29udGVudCA9IGdyb3VwLmdyb3VwX25hbWU7XG4gICAgICAgICAgICBncm91cFNlbGVjdC5hcHBlbmRDaGlsZChzdG9yZVNlbGVjdE9wdGlvbik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGVkaXRQcm9kdWN0KHByb2R1Y3Q6IElQcm9kdWN0KSB7XG4gIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3Byb2R1Y3QnLCBKU09OLnN0cmluZ2lmeShwcm9kdWN0KSk7XG5cbiAgY29uc3QgaW1nOiBIVE1MSW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC1zaG93LWltYWdlJyk7XG4gIGNvbnN0IGZ1bGxJbWFnZUFuY2hvciA9IGltZy5jbG9zZXN0KCcucHJvZHVjdC1mdWxsLWltYWdlLWFuY2hvcicpO1xuICBmdWxsSW1hZ2VBbmNob3Iuc2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldC1wcm9kdWN0LWlkJywgcHJvZHVjdC5pZC50b1N0cmluZygpKTtcbiAgcHJvZHVjdC5pbWFnZS5sZW5ndGggPiAxMDAgPyAoaW1nLnNyYyA9IGBkYXRhOmltYWdlL3BuZztiYXNlNjQsICR7cHJvZHVjdC5pbWFnZX1gKSA6IChpbWcuc3JjID0gZGVmYXVsdEJyYW5kSW1hZ2UpO1xuICBsZXQgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LW5hbWUnKTtcbiAgaW5wdXQudmFsdWUgPSBwcm9kdWN0Lm5hbWU7XG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC1pZCcpO1xuICBpbnB1dC52YWx1ZSA9IHByb2R1Y3QuaWQudG9TdHJpbmcoKTtcbiAgLy8gYSBsb29wIHRoYXQgYWRkcyBhZGRpdGlvbmFsIGZpZWxkc1xuICBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWVkaXQtY3VycmVuY3knKTtcbiAgcHJvZHVjdC5jdXJyZW5jeSA/IChpbnB1dC52YWx1ZSA9IHByb2R1Y3QuY3VycmVuY3kpIDogKGlucHV0LnZhbHVlID0gJ0Nob29zZSBDdXJyZW5jeScpO1xuICBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWVkaXQtcmVndWxhcl9wcmljZScpO1xuICBpbnB1dC52YWx1ZSA9IHByb2R1Y3QucmVndWxhcl9wcmljZT8udG9TdHJpbmcoKSA/PyAnMCc7XG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC1yZXRhaWxfcHJpY2UnKTtcbiAgaW5wdXQudmFsdWUgPSBwcm9kdWN0LnJldGFpbF9wcmljZT8udG9TdHJpbmcoKSA/PyAnMCc7XG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC1kZXNjcmlwdGlvbicpO1xuICBpbnB1dC52YWx1ZSA9IHByb2R1Y3QuZGVzY3JpcHRpb247XG4gIC8vIEdlbmVyYWwgSW5mbyAtPlxuICBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWVkaXQtU0tVJyk7XG4gIGlucHV0LnZhbHVlID0gcHJvZHVjdC5TS1U7XG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC1sb3dfc3RvY2tfbGV2ZWwnKTtcbiAgcHJvZHVjdC5sb3dfc3RvY2tfbGV2ZWwgPyAoaW5wdXQudmFsdWUgPSBwcm9kdWN0Lmxvd19zdG9ja19sZXZlbC50b1N0cmluZygpKSA6IChpbnB1dC52YWx1ZSA9ICcwJyk7XG5cbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LXByb2dyYW1feWVhcicpO1xuICBwcm9kdWN0LnByb2dyYW1feWVhciA/IChpbnB1dC52YWx1ZSA9IHByb2R1Y3QucHJvZ3JhbV95ZWFyLnRvU3RyaW5nKCkpIDogKGlucHV0LnZhbHVlID0gJzAnKTtcbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LXBhY2thZ2VfcXR5Jyk7XG4gIHByb2R1Y3QucGFja2FnZV9xdHkgPyAoaW5wdXQudmFsdWUgPSBwcm9kdWN0LnBhY2thZ2VfcXR5LnRvU3RyaW5nKCkpIDogKGlucHV0LnZhbHVlID0gJzAnKTtcbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LW51bWJfb2ZfaXRlbXNfcGVyX2Nhc2UnKTtcbiAgcHJvZHVjdC5udW1iX29mX2l0ZW1zX3Blcl9jYXNlID8gKGlucHV0LnZhbHVlID0gcHJvZHVjdC5udW1iX29mX2l0ZW1zX3Blcl9jYXNlLnRvU3RyaW5nKCkpIDogKGlucHV0LnZhbHVlID0gJzAnKTtcbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LW51bWJfb2ZfY2FzZXNfcGVyX291dGVyX2Nhc2UnKTtcbiAgcHJvZHVjdC5udW1iX29mX2Nhc2VzX3Blcl9vdXRlcl9jYXNlXG4gICAgPyAoaW5wdXQudmFsdWUgPSBwcm9kdWN0Lm51bWJfb2ZfY2FzZXNfcGVyX291dGVyX2Nhc2UudG9TdHJpbmcoKSlcbiAgICA6IChpbnB1dC52YWx1ZSA9ICcwJyk7XG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC1jb21tZW50cycpO1xuICBwcm9kdWN0LmNvbW1lbnRzID8gKGlucHV0LnZhbHVlID0gcHJvZHVjdC5jb21tZW50cykgOiAoaW5wdXQudmFsdWUgPSAnTm8gY29tbWVudHMnKTtcbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LW5vdGVzLWxvY2F0aW9uJyk7XG4gIGlucHV0LnZhbHVlID0gcHJvZHVjdC5ub3Rlc19sb2NhdGlvbjtcbiAgLy8gc2hpcHBpbmdcbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LXdlaWdodCcpO1xuICBwcm9kdWN0LndlaWdodCA/IChpbnB1dC52YWx1ZSA9IHByb2R1Y3Qud2VpZ2h0LnRvU3RyaW5nKCkpIDogKGlucHV0LnZhbHVlID0gJzAnKTtcbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LWxlbmd0aCcpO1xuICBwcm9kdWN0Lmxlbmd0aCA/IChpbnB1dC52YWx1ZSA9IHByb2R1Y3QubGVuZ3RoLnRvU3RyaW5nKCkpIDogKGlucHV0LnZhbHVlID0gJzAnKTtcbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LXdpZHRoJyk7XG4gIHByb2R1Y3Qud2lkdGggPyAoaW5wdXQudmFsdWUgPSBwcm9kdWN0LndpZHRoLnRvU3RyaW5nKCkpIDogKGlucHV0LnZhbHVlID0gJzAnKTtcbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LWhlaWdodCcpO1xuICBwcm9kdWN0LmhlaWdodCA/IChpbnB1dC52YWx1ZSA9IHByb2R1Y3QuaGVpZ2h0LnRvU3RyaW5nKCkpIDogKGlucHV0LnZhbHVlID0gJzAnKTtcbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LW5leHRfdXJsJyk7XG4gIGlucHV0LnZhbHVlID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG5cbiAgY29uc3QgcHJvZHVjdE1hc3Rlckdyb3VwRWRpdFNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICcjcHJvZHVjdC1tYXN0ZXItZ3JvdXAtZWRpdC1hZGQtcHJvZHVjdC0xJ1xuICApO1xuICBjb25zdCBvcHRpb25zID0gcHJvZHVjdE1hc3Rlckdyb3VwRWRpdFNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKCdvcHRpb24nKTtcbiAgY29uc3QgcHJvZHVjdE1hc3Rlckdyb3VwcyA9IE9iamVjdC5rZXlzKHByb2R1Y3QubXN0cl9ncnBzX2dycHNfbmFtZXNfaW5fcHJvZCk7XG5cbiAgaWYgKHByb2R1Y3RNYXN0ZXJHcm91cHMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHByb2R1Y3RHcm91cHNFZGl0U2VsZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTFNlbGVjdEVsZW1lbnQ+KCcucHJvZHVjdC1ncm91cC1lZGl0LWl0ZW0nKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvZHVjdE1hc3Rlckdyb3Vwcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgY29uc3QgcHJvZHVjdEdyb3Vwc0VkaXRTZWxlY3QgPSBwcm9kdWN0R3JvdXBzRWRpdFNlbGVjdHNbaV07XG5cbiAgICAgICAgcHJvZHVjdE1hc3Rlckdyb3VwRWRpdFNlbGVjdC52YWx1ZSA9IHByb2R1Y3RNYXN0ZXJHcm91cHNbaV07XG5cbiAgICAgICAgcHJvZHVjdC5tc3RyX3Byb2RfZ3Jwc19wcm9kX2dycHNfbmFtZXNbcHJvZHVjdE1hc3Rlckdyb3Vwc1tpXV0uZm9yRWFjaChcbiAgICAgICAgICAoZ3JvdXA6IHsgZ3JvdXBfbmFtZTogc3RyaW5nOyBncm91cF9pZDogbnVtYmVyIH0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN0b3JlU2VsZWN0T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgICAgICBzdG9yZVNlbGVjdE9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgZ3JvdXAuZ3JvdXBfaWQudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICBzdG9yZVNlbGVjdE9wdGlvbi50ZXh0Q29udGVudCA9IGdyb3VwLmdyb3VwX25hbWU7XG4gICAgICAgICAgICBwcm9kdWN0R3JvdXBzRWRpdFNlbGVjdC5hcHBlbmRDaGlsZChzdG9yZVNlbGVjdE9wdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICAvLyBUT0RPOiBhbHdheXMgc2VsZWN0IGZpcnN0IG9wdGlvblxuICAgICAgICBwcm9kdWN0R3JvdXBzRWRpdFNlbGVjdC52YWx1ZSA9XG4gICAgICAgICAgcHJvZHVjdC5tc3RyX2dycHNfZ3Jwc19uYW1lc19pbl9wcm9kW3Byb2R1Y3RNYXN0ZXJHcm91cHNbaV1dWzBdLmdyb3VwX2lkLnRvU3RyaW5nKCk7XG4gICAgICAgIHByb2R1Y3RNYXN0ZXJHcm91cEVkaXRTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAgIG9wdGlvbnMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBlLnRleHRDb250ZW50ID09PSBwcm9kdWN0TWFzdGVyR3JvdXBFZGl0U2VsZWN0Lm9wdGlvbnNbcHJvZHVjdE1hc3Rlckdyb3VwRWRpdFNlbGVjdC5zZWxlY3RlZEluZGV4XS50ZXh0XG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY29uc3QgZ3JvdXBTZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ncm91cC1lZGl0LWl0ZW0tMScpO1xuICAgICAgICAgICAgICBjb25zdCBvcHRpb25DYXRlZ29yeSA9XG4gICAgICAgICAgICAgICAgcHJvZHVjdC5tc3RyX3Byb2RfZ3Jwc19wcm9kX2dycHNfbmFtZXNbXG4gICAgICAgICAgICAgICAgICBwcm9kdWN0TWFzdGVyR3JvdXBFZGl0U2VsZWN0Lm9wdGlvbnNbcHJvZHVjdE1hc3Rlckdyb3VwRWRpdFNlbGVjdC5zZWxlY3RlZEluZGV4XS50ZXh0XG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgZ3JvdXBTZWxlY3QuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICAgIGlmIChvcHRpb25DYXRlZ29yeSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbkNhdGVnb3J5LmZvckVhY2goKGdyb3VwOiB7IGdyb3VwX25hbWU6IHN0cmluZzsgZ3JvdXBfaWQ6IG51bWJlciB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBzdG9yZVNlbGVjdE9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICAgICAgICAgICAgc3RvcmVTZWxlY3RPcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsIGdyb3VwLmdyb3VwX2lkLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgICAgc3RvcmVTZWxlY3RPcHRpb24udGV4dENvbnRlbnQgPSBncm91cC5ncm91cF9uYW1lO1xuICAgICAgICAgICAgICAgICAgZ3JvdXBTZWxlY3QuYXBwZW5kQ2hpbGQoc3RvcmVTZWxlY3RPcHRpb24pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChwcm9kdWN0Lm1zdHJfZ3Jwc19ncnBzX25hbWVzX2luX3Byb2RbcHJvZHVjdE1hc3Rlckdyb3Vwc1tpXV0ubGVuZ3RoID4gMSkge1xuICAgICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgcHJvZHVjdC5tc3RyX2dycHNfZ3Jwc19uYW1lc19pbl9wcm9kW3Byb2R1Y3RNYXN0ZXJHcm91cHNbaV1dLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBjcmVhdGVQcm9kdWN0R3JvdXBFZGl0SXRlbShudWxsLCBwcm9kdWN0TWFzdGVyR3JvdXBzW2ldLCBqKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHByb2R1Y3QubXN0cl9ncnBzX2dycHNfbmFtZXNfaW5fcHJvZFtwcm9kdWN0TWFzdGVyR3JvdXBzW2ldXS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcHJvZHVjdC5tc3RyX2dycHNfZ3Jwc19uYW1lc19pbl9wcm9kW3Byb2R1Y3RNYXN0ZXJHcm91cHNbaV1dLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgY3JlYXRlUHJvZHVjdEdyb3VwRWRpdEl0ZW0obnVsbCwgcHJvZHVjdE1hc3Rlckdyb3Vwc1tpXSwgaik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNyZWF0ZVByb2R1Y3RHcm91cEVkaXRJdGVtKG51bGwsIHByb2R1Y3RNYXN0ZXJHcm91cHNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGVkaXRNb2RhbC5zaG93KCk7XG5cbiAgcHJvZHVjdE1hc3Rlckdyb3VwRWRpdFNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgb3B0aW9ucy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICBpZiAoZS50ZXh0Q29udGVudCA9PT0gcHJvZHVjdE1hc3Rlckdyb3VwRWRpdFNlbGVjdC5vcHRpb25zW3Byb2R1Y3RNYXN0ZXJHcm91cEVkaXRTZWxlY3Quc2VsZWN0ZWRJbmRleF0udGV4dCkge1xuICAgICAgICBjb25zdCBncm91cFNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWdyb3VwLWVkaXQtaXRlbS0xJyk7XG4gICAgICAgIGNvbnN0IG9wdGlvbkNhdGVnb3J5ID1cbiAgICAgICAgICBwcm9kdWN0Lm1zdHJfcHJvZF9ncnBzX3Byb2RfZ3Jwc19uYW1lc1tcbiAgICAgICAgICAgIHByb2R1Y3RNYXN0ZXJHcm91cEVkaXRTZWxlY3Qub3B0aW9uc1twcm9kdWN0TWFzdGVyR3JvdXBFZGl0U2VsZWN0LnNlbGVjdGVkSW5kZXhdLnRleHRcbiAgICAgICAgICBdO1xuXG4gICAgICAgIGdyb3VwU2VsZWN0LmlubmVySFRNTCA9ICcnO1xuICAgICAgICBpZiAob3B0aW9uQ2F0ZWdvcnkpIHtcbiAgICAgICAgICBvcHRpb25DYXRlZ29yeS5mb3JFYWNoKChncm91cDogeyBncm91cF9uYW1lOiBzdHJpbmc7IGdyb3VwX2lkOiBudW1iZXIgfSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3RvcmVTZWxlY3RPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgICAgIHN0b3JlU2VsZWN0T3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBncm91cC5ncm91cF9pZC50b1N0cmluZygpKTtcbiAgICAgICAgICAgIHN0b3JlU2VsZWN0T3B0aW9uLnRleHRDb250ZW50ID0gZ3JvdXAuZ3JvdXBfbmFtZTtcbiAgICAgICAgICAgIGdyb3VwU2VsZWN0LmFwcGVuZENoaWxkKHN0b3JlU2VsZWN0T3B0aW9uKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuY29uc3Qgdmlld1Byb2R1Y3RCdXR0b25FbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0LXZpZXctYnV0dG9uJyk7XG52aWV3UHJvZHVjdEJ1dHRvbkVsZW1lbnRzLmZvckVhY2goKGUpID0+XG4gIGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3QgYm9va2luZ0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0LWJvb2tpbmctYnV0dG9uJyk7XG4gICAgaWYgKGJvb2tpbmdCdXR0b24pIHtcbiAgICAgIGJvb2tpbmdCdXR0b24uc2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcsIGUuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpKTtcbiAgICB9XG4gICAgY29uc3QgcHJvZHVjdCA9IEpTT04ucGFyc2UoZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0JykpO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3Byb2R1Y3QnLCBKU09OLnN0cmluZ2lmeShwcm9kdWN0KSk7XG4gICAgY29uc3QgcHJvZEdyb3VwcyA9IE9iamVjdC5rZXlzKHByb2R1Y3QubXN0cl9ncm91cHNfZ3JvdXBzKTtcblxuICAgIHByb2RHcm91cHMuZm9yRWFjaCgoZ3JvdXBOYW1lKSA9PiB7XG4gICAgICBsZXQgaXNFcXVhbCA9IGZhbHNlO1xuICAgICAgY29uc3QgbXN0ckdyb3VwTmFtZSA9IHByb2R1Y3QubXN0cl9ncm91cHNfZ3JvdXBzW2dyb3VwTmFtZV07XG5cbiAgICAgIGlmIChwcm9kdWN0LmN1cnJlbnRfdXNlcl9ncm91cHMuaGFzT3duUHJvcGVydHkobXN0ckdyb3VwTmFtZSkpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFVzZXJWYWx1ZSA9IHByb2R1Y3QuY3VycmVudF91c2VyX2dyb3Vwc1ttc3RyR3JvdXBOYW1lXTtcbiAgICAgICAgaWYgKGN1cnJlbnRVc2VyVmFsdWUuaW5jbHVkZXMoZ3JvdXBOYW1lKSkge1xuICAgICAgICAgIGlzRXF1YWwgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobXN0ckdyb3VwTmFtZSAhPT0gZXZlbnRNYXN0ZXJHcm91cCB8fCBpc0V2ZW50KSB7XG4gICAgICAgIGFkZFNoaXBBc3NpZ25TaGFyZUJ1dHRvbihpc0VxdWFsLCBtc3RyR3JvdXBOYW1lLCBncm91cE5hbWUsIHByb2R1Y3QpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgbGV0IGRpdjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC12aWV3LW5hbWUnKTtcbiAgICBkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5uYW1lO1xuICAgIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXZpZXctaWQnKTtcbiAgICBkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5pZC50b1N0cmluZygpO1xuICAgIGNvbnN0IGltZzogSFRNTEltYWdlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXZpZXctaW1hZ2UnKTtcbiAgICBjb25zdCBmdWxsSW1hZ2VBbmNob3IgPSBpbWcuY2xvc2VzdCgnLnByb2R1Y3QtZnVsbC1pbWFnZS1hbmNob3InKTtcbiAgICBmdWxsSW1hZ2VBbmNob3Iuc2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldC1wcm9kdWN0LWlkJywgcHJvZHVjdC5pZC50b1N0cmluZygpKTtcbiAgICBwcm9kdWN0LmltYWdlLmxlbmd0aCA+IDEwMCA/IChpbWcuc3JjID0gYGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCwgJHtwcm9kdWN0LmltYWdlfWApIDogKGltZy5zcmMgPSBkZWZhdWx0QnJhbmRJbWFnZSk7XG4gICAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtdmlldy1yZWd1bGFyX3ByaWNlJyk7XG4gICAgZGl2LmlubmVySFRNTCA9IHByb2R1Y3QucmVndWxhcl9wcmljZT8udG9TdHJpbmcoKSA/PyAnMCc7XG4gICAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtdmlldy1yZXRhaWxfcHJpY2UnKTtcbiAgICBkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5yZXRhaWxfcHJpY2U/LnRvU3RyaW5nKCkgPz8gJzAnO1xuICAgIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXZpZXctd2FyZWhvdXNlLXF0eScpO1xuICAgIGRpdi5pbm5lckhUTUwgPSBwcm9kdWN0LndhcmVob3VzZV9wcm9kdWN0X3F0eS50b1N0cmluZygpO1xuICAgIC8vIEdlbmVyYWwgSW5mbyAtPlxuICAgIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXZpZXctU0tVJyk7XG4gICAgZGl2LmlubmVySFRNTCA9IHByb2R1Y3QuU0tVO1xuICAgIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXZpZXctcGFja2FnZV9xdHknKTtcbiAgICBwcm9kdWN0LnBhY2thZ2VfcXR5ID8gKGRpdi5pbm5lckhUTUwgPSBwcm9kdWN0LnBhY2thZ2VfcXR5LnRvU3RyaW5nKCkpIDogKGRpdi5pbm5lckhUTUwgPSAnMCcpO1xuICAgIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXZpZXctbnVtYl9vZl9pdGVtc19wZXJfY2FzZScpO1xuICAgIHByb2R1Y3QubnVtYl9vZl9pdGVtc19wZXJfY2FzZVxuICAgICAgPyAoZGl2LmlubmVySFRNTCA9IHByb2R1Y3QubnVtYl9vZl9pdGVtc19wZXJfY2FzZS50b1N0cmluZygpKVxuICAgICAgOiAoZGl2LmlubmVySFRNTCA9ICcwJyk7XG4gICAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtdmlldy1udW1iX29mX2Nhc2VzX3Blcl9vdXRlcl9jYXNlJyk7XG4gICAgcHJvZHVjdC5udW1iX29mX2Nhc2VzX3Blcl9vdXRlcl9jYXNlXG4gICAgICA/IChkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5udW1iX29mX2Nhc2VzX3Blcl9vdXRlcl9jYXNlLnRvU3RyaW5nKCkpXG4gICAgICA6IChkaXYuaW5uZXJIVE1MID0gJzAnKTtcbiAgICBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC12aWV3LWNvbW1lbnRzJyk7XG4gICAgcHJvZHVjdC5jb21tZW50cyA/IChkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5jb21tZW50cy50b1N0cmluZygpKSA6IChkaXYuaW5uZXJIVE1MID0gJ05vIGNvbW1lbnRzJyk7XG4gICAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtdmlldy1ub3Rlcy1sb2NhdGlvbicpO1xuICAgIHByb2R1Y3Qubm90ZXNfbG9jYXRpb24gPyAoZGl2LmlubmVySFRNTCA9IHByb2R1Y3Qubm90ZXNfbG9jYXRpb24pIDogKGRpdi5pbm5lckhUTUwgPSAnTm8gbm90ZXMnKTtcbiAgICBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC12aWV3LW5leHRfdXJsJyk7XG4gICAgZGl2LmlubmVySFRNTCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuXG4gICAgcHJvZHVjdC53YXJlaG91c2VfcHJvZHVjdHMuZm9yRWFjaCgod2FyZWhvdXNlUHJvZHVjdDogSVdhcmVob3VzZVByb2R1Y3QpID0+IHtcbiAgICAgIGNvbnN0IHByb2R1Y3RWaWV3Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtdmlldy1ncmlkLWNvbnRhaW5lcicpO1xuICAgICAgY29uc3Qgd2FyZWhvdXNlVGVtcGxhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC12aWV3LXdhcmVob3VzZS10ZW1wbGF0ZScpO1xuICAgICAgY29uc3QgYXZhaWxhYmxlUXVhbnRpdHlUZW1wbGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXZpZXctYXZhaWxhYmxlLXF1YW50aXR5LXRlbXBsYXRlJyk7XG5cbiAgICAgIGNvbnN0IHdhcmVob3VzZURpdiA9IHdhcmVob3VzZVRlbXBsYXRlLmNsb25lTm9kZSh0cnVlKSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgIGNvbnN0IGF2YWlsYWJsZVF1YW50aXR5RGl2ID0gYXZhaWxhYmxlUXVhbnRpdHlUZW1wbGF0ZS5jbG9uZU5vZGUodHJ1ZSkgYXMgSFRNTERpdkVsZW1lbnQ7XG5cbiAgICAgIHdhcmVob3VzZURpdi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgIGF2YWlsYWJsZVF1YW50aXR5RGl2LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuXG4gICAgICBjb25zdCB3YXJlaG91c2VOYW1lID0gd2FyZWhvdXNlRGl2LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0LXZpZXctd2FyZWhvdXNlLW5hbWUnKTtcbiAgICAgIGNvbnN0IHdhcmVob3VzZUF2YWlsYWJsZVF1YW50aXR5ID0gYXZhaWxhYmxlUXVhbnRpdHlEaXYucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJy5wcm9kdWN0LXZpZXctd2FyZWhvdXNlLWF2YWlsYWJsZS1xdWFudGl0eSdcbiAgICAgICk7XG5cbiAgICAgIHdhcmVob3VzZU5hbWUuaW5uZXJIVE1MID0gd2FyZWhvdXNlUHJvZHVjdC53YXJlaG91c2UubmFtZTtcbiAgICAgIHdhcmVob3VzZUF2YWlsYWJsZVF1YW50aXR5LmlubmVySFRNTCA9IHdhcmVob3VzZVByb2R1Y3QucHJvZHVjdF9xdWFudGl0eS50b1N0cmluZygpO1xuXG4gICAgICBwcm9kdWN0Vmlld0NvbnRhaW5lci5hcHBlbmRDaGlsZCh3YXJlaG91c2VEaXYpO1xuICAgICAgcHJvZHVjdFZpZXdDb250YWluZXIuYXBwZW5kQ2hpbGQoYXZhaWxhYmxlUXVhbnRpdHlEaXYpO1xuICAgIH0pO1xuXG4gICAgdmlld01vZGFsLnNob3coKTtcbiAgfSlcbik7XG5cbmNvbnN0IGFkanVzdFByb2R1Y3RCdXR0b25FbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0LWFkanVzdC1idXR0b24nKTtcbmFkanVzdFByb2R1Y3RCdXR0b25FbGVtZW50cy5mb3JFYWNoKChlKSA9PlxuICBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IHByb2R1Y3QgPSBKU09OLnBhcnNlKGUuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpKTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdwcm9kdWN0JywgSlNPTi5zdHJpbmdpZnkocHJvZHVjdCkpO1xuICAgIGNvbnN0IHByb2RHcm91cHMgPSBPYmplY3Qua2V5cyhwcm9kdWN0Lm1zdHJfZ3JvdXBzX2dyb3Vwcyk7XG5cbiAgICBwcm9kR3JvdXBzLmZvckVhY2goKGdyb3VwTmFtZSkgPT4ge1xuICAgICAgbGV0IGlzRXF1YWwgPSBmYWxzZTtcblxuICAgICAgY29uc3QgbXN0ckdyb3VwTmFtZSA9IHByb2R1Y3QubXN0cl9ncm91cHNfZ3JvdXBzW2dyb3VwTmFtZV07XG4gICAgICBpZiAocHJvZHVjdC5jdXJyZW50X3VzZXJfZ3JvdXBzLmhhc093blByb3BlcnR5KG1zdHJHcm91cE5hbWUpKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRVc2VyVmFsdWUgPSBwcm9kdWN0LmN1cnJlbnRfdXNlcl9ncm91cHNbbXN0ckdyb3VwTmFtZV07XG4gICAgICAgIGlmIChjdXJyZW50VXNlclZhbHVlLmluY2x1ZGVzKGdyb3VwTmFtZSkpIHtcbiAgICAgICAgICBpc0VxdWFsID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY3JlYXRlQWRqdXN0QWN0aW9uKGlzRXF1YWwsIG1zdHJHcm91cE5hbWUsIGdyb3VwTmFtZSwgcHJvZHVjdCk7XG4gICAgfSk7XG5cbiAgICBsZXQgZGl2OiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWFkanVzdC1uYW1lJyk7XG4gICAgZGl2LmlubmVySFRNTCA9IHByb2R1Y3QubmFtZTtcbiAgICBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1hZGp1c3QtaWQnKTtcbiAgICBkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5pZC50b1N0cmluZygpO1xuICAgIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWFkanVzdC1TS1UnKTtcbiAgICBkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5TS1U7XG4gICAgY29uc3QgaW1nOiBIVE1MSW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtYWRqdXN0LWltYWdlJyk7XG4gICAgY29uc3QgZnVsbEltYWdlQW5jaG9yID0gaW1nLmNsb3Nlc3QoJy5wcm9kdWN0LWZ1bGwtaW1hZ2UtYW5jaG9yJyk7XG4gICAgZnVsbEltYWdlQW5jaG9yLnNldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtcHJvZHVjdC1pZCcsIHByb2R1Y3QuaWQudG9TdHJpbmcoKSk7XG4gICAgcHJvZHVjdC5pbWFnZS5sZW5ndGggPiAxMDAgPyAoaW1nLnNyYyA9IGBkYXRhOmltYWdlL3BuZztiYXNlNjQsICR7cHJvZHVjdC5pbWFnZX1gKSA6IChpbWcuc3JjID0gZGVmYXVsdEJyYW5kSW1hZ2UpO1xuICAgIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWFkanVzdC1uZXh0X3VybCcpO1xuICAgIGRpdi5pbm5lckhUTUwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICBhZGp1c3RNb2RhbC5zaG93KCk7XG4gIH0pXG4pO1xuXG4vLyBmdW5jdGlvbiB0byByZXF1ZXN0IHNoYXJlXG4vLyBUT0RPIHJlZmFjdG9yICEhIVxuZnVuY3Rpb24gcmVxdWVzdFNoYXJlKHByb2R1Y3Q6IElQcm9kdWN0LCBncm91cDogc3RyaW5nKSB7XG4gIGNvbnN0IGltZzogSFRNTEltYWdlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXJlcXVlc3Qtc2hhcmUtaW1hZ2UnKTtcbiAgY29uc3QgZnVsbEltYWdlQW5jaG9yID0gaW1nLmNsb3Nlc3QoJy5wcm9kdWN0LWZ1bGwtaW1hZ2UtYW5jaG9yJyk7XG4gIGZ1bGxJbWFnZUFuY2hvci5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0LXByb2R1Y3QtaWQnLCBwcm9kdWN0LmlkLnRvU3RyaW5nKCkpO1xuICBwcm9kdWN0LmltYWdlLmxlbmd0aCA+IDEwMCA/IChpbWcuc3JjID0gYGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCwgJHtwcm9kdWN0LmltYWdlfWApIDogKGltZy5zcmMgPSBkZWZhdWx0QnJhbmRJbWFnZSk7XG4gIGxldCBkaXY6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtcmVxdWVzdC1zaGFyZS1uYW1lJyk7XG4gIGRpdi5pbm5lckhUTUwgPSBwcm9kdWN0Lm5hbWU7XG4gIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXJlcXVlc3Qtc2hhcmUtc2t1Jyk7XG4gIGRpdi5pbm5lckhUTUwgPSBwcm9kdWN0LlNLVTtcblxuICBjb25zdCBwcm9kdWN0U0tVSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1za3UnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICBwcm9kdWN0U0tVSW5wdXQudmFsdWUgPSBwcm9kdWN0LlNLVTtcblxuICBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1yZXF1ZXN0LXNoYXJlLWF2YWlsYWJsZS1xdWFudGl0eScpO1xuICBkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5hdmFpbGFibGVfcXVhbnRpdHlbZ3JvdXAucmVwbGFjZSgnXycsICcgJyldLnRvU3RyaW5nKCk7XG4gIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXJlcXVlc3Qtc2hhcmUtb3duZXInKTtcbiAgLy8gVE9ETyBjaGFuZ2UgdG8gc29tZXRoaW5nIG5vdCBoYXJkY29kZWQgaGVyZSBhbmQgaW4gcmVzdCBmdW5jc1xuICBkaXYuaW5uZXJIVE1MID0gJ01pa2UnO1xuICBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1yZXF1ZXN0LXNoYXJlLXJvbGUnKTtcbiAgZGl2LmlubmVySFRNTCA9ICdBRE1JTic7XG4gIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXJlcXVlc3Qtc2hhcmUtdG90YWwtYXZhaWxhYmxlLWl0ZW1zJyk7XG4gIGRpdi5pbm5lckhUTUwgPSBwcm9kdWN0LnRvdGFsX2F2YWlsYWJsZV9pdGVtc1tncm91cC5yZXBsYWNlKCdfJywgJyAnKV0udG9TdHJpbmcoKTtcbiAgbGV0IGlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtcmVxdWVzdC1zaGFyZS1xdWFudGl0eScpO1xuICBpbnB1dC5tYXggPSBwcm9kdWN0LmF2YWlsYWJsZV9xdWFudGl0eVtncm91cC5yZXBsYWNlKCdfJywgJyAnKV0udG9TdHJpbmcoKTtcbiAgaW5wdXQubWluID0gJzEnO1xuICBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXJlcXVlc3Qtc2hhcmUtbmFtZS1oaWRkZW4taW5wdXQnKTtcbiAgaW5wdXQudmFsdWUgPSBwcm9kdWN0Lm5hbWU7XG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtcmVxdWVzdC1zaGFyZS1TS1UtaGlkZGVuLWlucHV0Jyk7XG4gIGlucHV0LnZhbHVlID0gcHJvZHVjdC5TS1U7XG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtcmVxdWVzdC1zaGFyZS1hdmFpbGFibGUtcXVhbnRpdHktaGlkZGVuLWlucHV0Jyk7XG4gIGlucHV0LnZhbHVlID0gcHJvZHVjdC5hdmFpbGFibGVfcXVhbnRpdHlbZ3JvdXAucmVwbGFjZSgnXycsICcgJyldLnRvU3RyaW5nKCk7XG5cbiAgY29uc3QgZ3JvdXBOYW1lVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXJlcXVlc3Qtc2hhcmUtZnJvbS1ncm91cCcpO1xuICBncm91cE5hbWVWaWV3LmlubmVySFRNTCA9IGdyb3VwLnJlcGxhY2UoJ18nLCAnICcpO1xuXG4gIGNvbnN0IGZyb21Hcm91cElkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Zyb20tZ3JvdXAtaWQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICBmcm9tR3JvdXBJZC52YWx1ZSA9IHByb2R1Y3QuZ3JvdXBzX2lkc1tncm91cC5yZXBsYWNlKCdfJywgJyAnKV0udG9TdHJpbmcoKTtcblxuICByZXF1ZXN0U2hhcmVNb2RhbC5zaG93KCk7XG59XG5cbi8vIGZ1bmN0aW9uIHRvIHNoaXBcbmZ1bmN0aW9uIHNoaXAocHJvZHVjdDogSVByb2R1Y3QsIGdyb3VwOiBzdHJpbmcpIHtcbiAgY29uc3QgaW1nOiBIVE1MSW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtc2hpcC1pbWFnZScpO1xuICBjb25zdCBmdWxsSW1hZ2VBbmNob3IgPSBpbWcuY2xvc2VzdCgnLnByb2R1Y3QtZnVsbC1pbWFnZS1hbmNob3InKTtcbiAgZnVsbEltYWdlQW5jaG9yLnNldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtcHJvZHVjdC1pZCcsIHByb2R1Y3QuaWQudG9TdHJpbmcoKSk7XG4gIHByb2R1Y3QuaW1hZ2UubGVuZ3RoID4gMTAwID8gKGltZy5zcmMgPSBgZGF0YTppbWFnZS9wbmc7YmFzZTY0LCAke3Byb2R1Y3QuaW1hZ2V9YCkgOiAoaW1nLnNyYyA9IGRlZmF1bHRCcmFuZEltYWdlKTtcbiAgbGV0IGRpdjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1zaGlwLW5hbWUnKTtcbiAgZGl2LmlubmVySFRNTCA9IHByb2R1Y3QubmFtZTtcbiAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtc2hpcC1za3UnKTtcbiAgZGl2LmlubmVySFRNTCA9IHByb2R1Y3QuU0tVO1xuICBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1zaGlwLWF2YWlsYWJsZS1xdWFudGl0eScpO1xuICBkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5hdmFpbGFibGVfcXVhbnRpdHlbZ3JvdXAucmVwbGFjZSgnXycsICcgJyldLnRvU3RyaW5nKCk7XG4gIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXNoaXAtdG90YWwtYXZhaWxhYmxlLWl0ZW1zJyk7XG4gIGRpdi5pbm5lckhUTUwgPSBwcm9kdWN0LnRvdGFsX2F2YWlsYWJsZV9pdGVtc1tncm91cC5yZXBsYWNlKCdfJywgJyAnKV0udG9TdHJpbmcoKTtcblxuICBsZXQgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1zaGlwLXByb2R1Y3QtaWQnKTtcbiAgaW5wdXQudmFsdWUgPSBwcm9kdWN0LmlkLnRvU3RyaW5nKCk7XG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtc2hpcC1kZXNpcmUtcXVhbnRpdHknKTtcbiAgaW5wdXQubWF4ID0gcHJvZHVjdC5hdmFpbGFibGVfcXVhbnRpdHlbZ3JvdXAucmVwbGFjZSgnXycsICcgJyldLnRvU3RyaW5nKCk7XG4gIGlucHV0Lm1pbiA9ICcxJztcbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1zaGlwLWdyb3VwJyk7XG4gIGlucHV0LnZhbHVlID0gZ3JvdXAucmVwbGFjZSgnXycsICcgJyk7XG5cbiAgc2hpcE1vZGFsLnNob3coKTtcblxuICAvLyAtLS0tLWNvdW50IHJlc3QgcXVhbnRpdHkgaW4gc2hpcCByZXF1ZXN0IHByb2R1Y3QgbW9kYWwtLS0tLS1cbiAgY29uc3QgZGVzaXJlZFF1YW50aXR5SW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1zaGlwLWRlc2lyZS1xdWFudGl0eScpO1xuICBkZXNpcmVkUXVhbnRpdHlJbnB1dC5zZXRBdHRyaWJ1dGUoJ21heCcsIHByb2R1Y3QuYXZhaWxhYmxlX3F1YW50aXR5W2dyb3VwLnJlcGxhY2UoJ18nLCAnICcpXS50b1N0cmluZygpKTtcbiAgZGVzaXJlZFF1YW50aXR5SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgIGNvbnN0IGF2YWlsYWJsZVF1YW50aXR5RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtc2hpcC1hdmFpbGFibGUtcXVhbnRpdHknKTtcbiAgICBhdmFpbGFibGVRdWFudGl0eURpdi50ZXh0Q29udGVudCA9IHByb2R1Y3QuYXZhaWxhYmxlX3F1YW50aXR5W2dyb3VwLnJlcGxhY2UoJ18nLCAnICcpXS50b1N0cmluZygpO1xuICAgIGxldCBkZXNpcmVkUXVhbnRpdHkgPSBwYXJzZUludChkZXNpcmVkUXVhbnRpdHlJbnB1dC52YWx1ZSk7XG4gICAgY29uc3QgYXZhaWxhYmxlUXVhbnRpdHkgPSBwYXJzZUludChhdmFpbGFibGVRdWFudGl0eURpdi50ZXh0Q29udGVudCk7XG4gICAgaWYgKGRlc2lyZWRRdWFudGl0eSA8IDApIHtcbiAgICAgIGRlc2lyZWRRdWFudGl0eUlucHV0LnZhbHVlID0gJzAnO1xuICAgIH0gZWxzZSBpZiAoZGVzaXJlZFF1YW50aXR5ID4gYXZhaWxhYmxlUXVhbnRpdHkpIHtcbiAgICAgIGRlc2lyZWRRdWFudGl0eUlucHV0LnZhbHVlID0gcHJvZHVjdC5hdmFpbGFibGVfcXVhbnRpdHlbZ3JvdXAucmVwbGFjZSgnXycsICcgJyldLnRvU3RyaW5nKCk7XG4gICAgICBhdmFpbGFibGVRdWFudGl0eURpdi50ZXh0Q29udGVudCA9ICcwJztcbiAgICB9IGVsc2UgaWYgKGRlc2lyZWRRdWFudGl0eSkge1xuICAgICAgYXZhaWxhYmxlUXVhbnRpdHlEaXYudGV4dENvbnRlbnQgPSAoYXZhaWxhYmxlUXVhbnRpdHkgLSBkZXNpcmVkUXVhbnRpdHkpLnRvU3RyaW5nKCk7XG4gICAgfVxuICB9KTtcbn1cblxubGV0IHBpY2tlcjogRGF0ZXBpY2tlcjtcblxubGV0IGNhbGVuZGFyRmlsdGVyOiBzdHJpbmdbXSA9IFtdO1xuXG4vLyBmdW5jdGlvbiB0byBib29raW5nXG5mdW5jdGlvbiBib29raW5nKHByb2R1Y3Q6IElQcm9kdWN0LCBncm91cDogc3RyaW5nKSB7XG4gIGNvbnN0IGltZzogSFRNTEltYWdlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWV2ZW50LWltYWdlJyk7XG4gIGNvbnN0IGZ1bGxJbWFnZUFuY2hvciA9IGltZy5jbG9zZXN0KCcucHJvZHVjdC1mdWxsLWltYWdlLWFuY2hvcicpO1xuICBmdWxsSW1hZ2VBbmNob3Iuc2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldC1wcm9kdWN0LWlkJywgcHJvZHVjdC5pZC50b1N0cmluZygpKTtcbiAgcHJvZHVjdC5pbWFnZS5sZW5ndGggPiAxMDAgPyAoaW1nLnNyYyA9IGBkYXRhOmltYWdlL3BuZztiYXNlNjQsICR7cHJvZHVjdC5pbWFnZX1gKSA6IChpbWcuc3JjID0gZGVmYXVsdEJyYW5kSW1hZ2UpO1xuICBsZXQgZGl2OiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWV2ZW50LW5hbWUnKTtcbiAgZGl2LmlubmVySFRNTCA9IHByb2R1Y3QubmFtZTtcbiAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZXZlbnQtU0tVJyk7XG4gIGRpdi5pbm5lckhUTUwgPSBwcm9kdWN0LlNLVTtcblxuICBsZXQgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ldmVudC1ncm91cC1oaWRkZW4nKTtcbiAgaW5wdXQudmFsdWUgPSBncm91cC5yZXBsYWNlKCdfJywgJyAnKTtcbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ldmVudC1wcm9kdWN0LWlkJyk7XG4gIGlucHV0LnZhbHVlID0gcHJvZHVjdC5pZC50b1N0cmluZygpO1xuICBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWV2ZW50LXF1YW50aXR5Jyk7XG4gIGlucHV0Lm1pbiA9ICcxJztcbiAgaW5wdXQubWF4ID0gcHJvZHVjdC5hdmFpbGFibGVfcXVhbnRpdHlbZ3JvdXAucmVwbGFjZSgnXycsICcgJyldLnRvU3RyaW5nKCk7XG5cbiAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gIGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZURhdGVwaWNrZXIoKSB7XG4gICAgcGlja2VyID0gbmV3IGVhc2VwaWNrLmNyZWF0ZSh7XG4gICAgICBlbGVtZW50OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0ZXBpY2tlcicpLFxuICAgICAgY3NzOiBbXG4gICAgICAgICdodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL0BlYXNlcGljay9idW5kbGVAMS4yLjEvZGlzdC9pbmRleC5jc3MnLFxuICAgICAgICAnaHR0cHM6Ly9lYXNlcGljay5jb20vY3NzL2RlbW9fcHJpY2VzLmNzcycsXG4gICAgICAgICdodHRwczovL2Vhc2VwaWNrLmNvbS9jc3MvZGVtb19ob3RlbGNhbC5jc3MnLFxuICAgICAgXSxcbiAgICAgIGF1dG9BcHBseTogdHJ1ZSxcbiAgICAgIGlubGluZTogdHJ1ZSxcbiAgICAgIHBsdWdpbnM6IFsnTG9ja1BsdWdpbiddLFxuICAgICAgTG9ja1BsdWdpbjoge1xuICAgICAgICBmaWx0ZXIoZGF0ZTogYW55KSB7XG4gICAgICAgICAgaWYgKGRhdGUgLSArY3VycmVudERhdGUgPiBmaXZlRGF5cykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9LFxuXG4gICAgICBzZXR1cChwaWNrZXI6IGFueSkge1xuICAgICAgICBwaWNrZXIub24oJ3ZpZXcnLCBhc3luYyAoZXZ0OiBhbnkpID0+IHtcbiAgICAgICAgICBjb25zdCB7IHZpZXcsIGRhdGUsIHRhcmdldCB9ID0gZXZ0LmRldGFpbDtcbiAgICAgICAgICBpZiAodmlldyA9PT0gJ0NhbGVuZGFyRGF5Jykge1xuICAgICAgICAgICAgY29uc3QgZGF5ID0gcGFyc2VJbnQodGFyZ2V0LmlubmVySFRNTCk7XG4gICAgICAgICAgICBpZiAoZGF5ID09PSAxKSB7XG4gICAgICAgICAgICAgIGNhbGVuZGFyRmlsdGVyID0gW3RhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGltZScpXTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWNhbGVuZGFyRmlsdGVyLmluY2x1ZGVzKHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGltZScpKSkge1xuICAgICAgICAgICAgICBjYWxlbmRhckZpbHRlci5wdXNoKHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGltZScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoKHZpZXcgYXMgc3RyaW5nKS50b0xvd2VyQ2FzZSgpICE9PSAnbWFpbicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBmZXRjaGVkQW1vdW50QnlEYXRlID0gKGF3YWl0IGdldEV2ZW50QXZhaWxhYmxlUXVhbnRpdHkocHJvZHVjdC5pZCwgZ3JvdXAsIGNhbGVuZGFyRmlsdGVyKSkgYXMge1xuICAgICAgICAgICAgZGF0ZTogbnVtYmVyO1xuICAgICAgICAgICAgcXVhbnRpdHk6IG51bWJlcjtcbiAgICAgICAgICB9W107XG5cbiAgICAgICAgICBmZXRjaGVkQW1vdW50QnlEYXRlLmZvckVhY2goKHsgZGF0ZSwgcXVhbnRpdHkgfSwgaSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGF5Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVhc2VwaWNrLXdyYXBwZXInKTtcblxuICAgICAgICAgICAgY29uc3QgZGF5Q29udGFpbmVyU2hhZG93ID0gZGF5Q29udGFpbmVyLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihgZGl2W2RhdGEtdGltZT0nJHtkYXRlfSddYCk7XG5cbiAgICAgICAgICAgIGlmICghZGF5Q29udGFpbmVyU2hhZG93KSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgc3BhbiA9IGRheUNvbnRhaW5lclNoYWRvdy5xdWVyeVNlbGVjdG9yKCcuZGF5LXByaWNlJykgPz8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgc3Bhbi5jbGFzc05hbWUgPSAnZGF5LXByaWNlJztcbiAgICAgICAgICAgIHNwYW4uaW5uZXJIVE1MID0gcXVhbnRpdHkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGRheUNvbnRhaW5lclNoYWRvdy5hcHBlbmQoc3Bhbik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZURhdGVwaWNrZXIoKTtcblxuICB2aWV3TW9kYWwuaGlkZSgpO1xuICBldmVudE1vZGFsLnNob3coKTtcbn1cblxuLy8gZnVuY3Rpb24gdG8gYXNzaWduXG5mdW5jdGlvbiBhc3NpZ24ocHJvZHVjdDogSVByb2R1Y3QsIGdyb3VwOiBzdHJpbmcpIHtcbiAgbGV0IGlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtYXNzaWduLW5hbWUnKTtcbiAgaW5wdXQudmFsdWUgPSBwcm9kdWN0Lm5hbWU7XG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtYXNzaWduLWFtb3VudCcpO1xuICBpbnB1dC5tYXggPSBwcm9kdWN0LmF2YWlsYWJsZV9xdWFudGl0eVtncm91cC5yZXBsYWNlKCdfJywgJyAnKV0udG9TdHJpbmcoKTtcbiAgaW5wdXQubWluID0gJzEnO1xuICBjb25zdCBncm91cE5hbWUgPSBncm91cC5yZXBsYWNlKCdfJywgJyAnKTtcbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1hc3NpZ24tZnJvbS1ncm91cCcpO1xuICBpbnB1dC52YWx1ZSA9IGdyb3VwTmFtZTtcblxuICBjb25zdCBncm91cF9pZCA9IHByb2R1Y3QuZ3JvdXBzX2lkc1tncm91cE5hbWVdO1xuICBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWFzc2lnbi1mcm9tLWdyb3VwX2lkJyk7XG4gIGlucHV0LnZhbHVlID0gZ3JvdXBfaWQudG9TdHJpbmcoKTtcbiAgYXNzaWduTW9kYWwuc2hvdygpO1xufVxuXG4vLyBmdW5jdGlvbiB0byBkZWxldGUgc2hpcCBhc3NpZ24gc2hhcmUgYnV0dG9uXG5mdW5jdGlvbiBkZWxldGVTaGlwQXNzaWduQnV0dG9uKG5hbWVHcm91cDogc3RyaW5nLCBuYW1lR3JvdXBWYWx1ZTogc3RyaW5nKSB7XG4gIGNvbnN0IHNoaXBBc3NpZ25TaGFyZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgYCNwcm9kdWN0LXNoaXAtYXNzaWduLXNoYXJlLWNvbnRhaW5lci0ke25hbWVHcm91cC5yZXBsYWNlKC8gL2csICdfJyl9YFxuICApO1xuICBjb25zdCBncm91cENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgYCNwcm9kdWN0LXZpZXctcHJvZHVjdF9ncm91cC1jb250YWluZXItJHtuYW1lR3JvdXBWYWx1ZS5yZXBsYWNlKC8gL2csICdfJyl9YFxuICApO1xuICBpZiAoc2hpcEFzc2lnblNoYXJlQ29udGFpbmVyKSB7XG4gICAgc2hpcEFzc2lnblNoYXJlQ29udGFpbmVyLnJlbW92ZSgpO1xuICB9XG4gIGlmIChncm91cENvbnRhaW5lcikge1xuICAgIGdyb3VwQ29udGFpbmVyLnJlbW92ZSgpO1xuICB9XG59XG5cbi8vIGZ1bmN0aW9uIHRvIGFkZCBzaGlwLCBhc3NpZ24sIGJ1dHRvbiB0byB2aWV3IHByb2R1Y3QgbW9kYWxcbmZ1bmN0aW9uIGFkZFNoaXBBc3NpZ25TaGFyZUJ1dHRvbihpc0VxdWFsOiBib29sZWFuLCBtYXN0ZXJHcm91cDogc3RyaW5nLCBncm91cDogc3RyaW5nLCBwcm9kdWN0UGFyYW06IElQcm9kdWN0KSB7XG4gIGNvbnN0IGlzRXZlbnRJdGVtID0gaXNFdmVudCAmJiBtYXN0ZXJHcm91cCA9PT0gZXZlbnRNYXN0ZXJHcm91cDtcbiAgY29uc3QgZ3JvdXBVbmRlclNjb3JlID0gZ3JvdXAucmVwbGFjZSgvIC9nLCAnXycpO1xuICBjb25zdCBncm91cFByb2R1Y3RJZHMgPSBwcm9kdWN0UGFyYW0uZ3JvdXBzX2lkcztcbiAgY29uc3QgcHJvZHVjdFR5cGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcHJvZHVjdC12aWV3LXByb2R1Y3QtbmFtZS1jb250YWluZXJgKTtcbiAgY29uc3Qgc2hpcEFzc2lnbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gIHNoaXBBc3NpZ25Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnc206Y29sLXNwYW4tMycsICdmbGV4JywgJ2dhcC00Jyk7XG4gIHNoaXBBc3NpZ25Db250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsIGBwcm9kdWN0LXNoaXAtYXNzaWduLXNoYXJlLWNvbnRhaW5lci0ke21hc3Rlckdyb3VwLnJlcGxhY2UoLyAvZywgJ18nKX1gKTtcbiAgY29uc3Qgc2hpcEFzc2lnbkNvbnRhaW5lckRpdiA9IGBcbiAgICA8ZGl2PlxuICAgICAgPGxhYmVsIGZvcj1cIm5hbWVcIiBjbGFzcz1cImJsb2NrIG1iLTIgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktOTAwIGRhcms6dGV4dC13aGl0ZVwiPkF2YWlsYWJsZTwvbGFiZWw+XG4gICAgICAgIDxkaXYgaWQ9XCJzaGlwLXByb2R1Y3QtcXVhbnRpdHlcIlxuICAgICAgICAgIGNsYXNzPVwic2hhZG93LXNtIGJnLWdyYXktNTAgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCB0ZXh0LWdyYXktOTAwIHRleHQtc20gcm91bmRlZC1sZyBmb2N1czpyaW5nLWJsdWUtNjAwIGZvY3VzOmJvcmRlci1ibHVlLTYwMCBibG9jayB3LWZ1bGwgcC0yLjUgZGFyazpiZy1ncmF5LTYwMCBkYXJrOmJvcmRlci1ncmF5LTUwMCBkYXJrOnBsYWNlaG9sZGVyLWdyYXktNDAwIGRhcms6dGV4dC13aGl0ZSBkYXJrOmZvY3VzOnJpbmctYmx1ZS01MDAgZGFyazpmb2N1czpib3JkZXItYmx1ZS01MDBcIj5cbiAgICAgICR7cHJvZHVjdFBhcmFtLmF2YWlsYWJsZV9xdWFudGl0eVtncm91cF0gfHwgMH08L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2PlxuICAgICAgPGxhYmVsIGZvcj1cInByb2R1Y3RfZ3JvdXBcIiBjbGFzcz1cImJsb2NrIG1iLTIgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktOTAwIGRhcms6dGV4dC13aGl0ZVwiID5BY3Rpb248L2xhYmVsID5cbiAgICAgIDxidXR0b24gc2hpcC1ncm91cC1kYXRhPSR7Z3JvdXBVbmRlclNjb3JlfSB0eXBlPVwiYnV0dG9uXCIgaWQ9XCJzaGlwLXByb2R1Y3QtYnV0dG9uLSR7Z3JvdXBVbmRlclNjb3JlfVwiIGNsYXNzPVwic2hpcC1wcm9kdWN0LWJ1dHRvbiBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgbXItMiBweC0zIHB5LTIuNSB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtY2VudGVyIHRleHQtd2hpdGUgcm91bmRlZC1sZyBiZy15ZWxsb3ctNDAwIGhvdmVyOmJnLXllbGxvdy01MDAgZm9jdXM6cmluZy00IGZvY3VzOnJpbmctcmVkLTMwMCBkYXJrOmZvY3VzOnJpbmctcmVkLTkwMFwiPlxuICAgICAgICA8c3ZnIGNsYXNzPVwidy00IGgtNCBtci0yXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZD1cIk0xNy40MTQgMi41ODZhMiAyIDAgMDAtMi44MjggMEw3IDEwLjE3MlYxM2gyLjgyOGw3LjU4Ni03LjU4NmEyIDIgMCAwMDAtMi44Mjh6XCI+PC9wYXRoPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTIgNmEyIDIgMCAwMTItMmg0YTEgMSAwIDAxMCAySDR2MTBoMTB2LTRhMSAxIDAgMTEyIDB2NGEyIDIgMCAwMS0yIDJINGEyIDIgMCAwMS0yLTJWNnpcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCI+PC9wYXRoPjwvc3ZnPlxuICAgICAgICBTaGlwXG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gYXNzaWduLWdyb3VwLWRhdGE9JHtncm91cFVuZGVyU2NvcmV9IHR5cGU9XCJidXR0b25cIiBpZD1cImFzc2lnbi1wcm9kdWN0LWJ1dHRvbi0ke2dyb3VwVW5kZXJTY29yZX1cIiBjbGFzcz1cImFzc2lnbi1wcm9kdWN0LWJ1dHRvbiBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgcHgtMyBweS0yLjUgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWNlbnRlciB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgYmctYmx1ZS03MDAgaG92ZXI6YmctYmx1ZS04MDAgZm9jdXM6cmluZy00IGZvY3VzOnJpbmctYmx1ZS0zMDAgZGFyazpiZy1ibHVlLTYwMCBkYXJrOmhvdmVyOmJnLWJsdWUtNzAwIGRhcms6Zm9jdXM6cmluZy1ibHVlLTgwMFwiPlxuICAgICAgICA8c3ZnIGNsYXNzPVwidy00IGgtNCBtci0yXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZD1cIk0xNy40MTQgMi41ODZhMiAyIDAgMDAtMi44MjggMEw3IDEwLjE3MlYxM2gyLjgyOGw3LjU4Ni03LjU4NmEyIDIgMCAwMDAtMi44Mjh6XCI+PC9wYXRoPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTIgNmEyIDIgMCAwMTItMmg0YTEgMSAwIDAxMCAySDR2MTBoMTB2LTRhMSAxIDAgMTEyIDB2NGEyIDIgMCAwMS0yIDJINGEyIDIgMCAwMS0yLTJWNnpcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCI+PC9wYXRoPjwvc3ZnPlxuICAgICAgICBBc3NpZ25cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICBgO1xuXG4gIGNvbnN0IGJvb2tpbmdDb250YWluZXJEaXYgPSBgXG4gICAgICAgIDxkaXY+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJwcm9kdWN0X2dyb3VwXCIgY2xhc3M9XCJibG9jayBtYi0yIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtd2hpdGVcIiA+QWN0aW9uPC9sYWJlbCA+XG4gICAgICAgIDxidXR0b24gc2hpcC1ncm91cC1kYXRhPSR7Z3JvdXBVbmRlclNjb3JlfSB0eXBlPVwiYnV0dG9uXCIgaWQ9XCJib29raW5nLXByb2R1Y3QtYnV0dG9uLSR7Z3JvdXBVbmRlclNjb3JlfVwiIGNsYXNzPVwiYm9va2luZy1wcm9kdWN0LWJ1dHRvbiBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgbXItMiBweC0zIHB5LTIuNSB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtY2VudGVyIHRleHQtd2hpdGUgcm91bmRlZC1sZyBiZy1ibHVlLTcwMCBob3ZlcjpiZy1ibHVlLTgwMCBmb2N1czpyaW5nLTQgZm9jdXM6cmluZy1ibHVlLTMwMCBkYXJrOmJnLWJsdWUtNjAwIGRhcms6aG92ZXI6YmctYmx1ZS03MDAgZGFyazpmb2N1czpyaW5nLWJsdWUtODAwXCI+XG4gICAgICAgICAgICA8c3ZnIGNsYXNzPVwidy00IGgtNCBtci0yXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgNDQ4IDUxMlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgICAgZD1cIk0xMjggMGMxMy4zIDAgMjQgMTAuNyAyNCAyNFY2NEgyOTZWMjRjMC0xMy4zIDEwLjctMjQgMjQtMjRzMjQgMTAuNyAyNCAyNFY2NGg0MGMzNS4zIDAgNjQgMjguNyA2NCA2NHYxNiA0OFY0NDhjMCAzNS4zLTI4LjcgNjQtNjQgNjRINjRjLTM1LjMgMC02NC0yOC43LTY0LTY0VjE5MiAxNDQgMTI4QzAgOTIuNyAyOC43IDY0IDY0IDY0aDQwVjI0YzAtMTMuMyAxMC43LTI0IDI0LTI0ek00MDAgMTkySDQ4VjQ0OGMwIDguOCA3LjIgMTYgMTYgMTZIMzg0YzguOCAwIDE2LTcuMiAxNi0xNlYxOTJ6TTMyOSAyOTdMMjE3IDQwOWMtOS40IDkuNC0yNC42IDkuNC0zMy45IDBsLTY0LTY0Yy05LjQtOS40LTkuNC0yNC42IDAtMzMuOXMyNC42LTkuNCAzMy45IDBsNDcgNDcgOTUtOTVjOS40LTkuNCAyNC42LTkuNCAzMy45IDBzOS40IDI0LjYgMCAzMy45elwiXG4gICAgICAgICAgICAgICAgY2xpcC1ydWxlPVwiZXZlbm9kZFwiPjwvcGF0aD5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgQm9va2luZ1xuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgYDtcbiAgaXNFdmVudEl0ZW1cbiAgICA/IChzaGlwQXNzaWduQ29udGFpbmVyLmlubmVySFRNTCA9IGJvb2tpbmdDb250YWluZXJEaXYpXG4gICAgOiAoc2hpcEFzc2lnbkNvbnRhaW5lci5pbm5lckhUTUwgPSBzaGlwQXNzaWduQ29udGFpbmVyRGl2KTtcblxuICBjb25zdCBzaGFyZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBzaGlwUHJvZHVjdEJ0biA9IHNoaXBBc3NpZ25Db250YWluZXIucXVlcnlTZWxlY3RvcihgI3NoaXAtcHJvZHVjdC1idXR0b24tJHtncm91cFVuZGVyU2NvcmV9YCk7XG4gIGNvbnN0IGFzc2lnblByb2R1Y3RCdG4gPSBzaGlwQXNzaWduQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoYCNhc3NpZ24tcHJvZHVjdC1idXR0b24tJHtncm91cFVuZGVyU2NvcmV9YCk7XG5cbiAgc2hhcmVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc206Y29sLXNwYW4tMycsICdmbGV4JywgJ2dhcC00Jyk7XG4gIHNoYXJlQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCBgcHJvZHVjdC1zaGlwLWFzc2lnbi1zaGFyZS1jb250YWluZXItJHttYXN0ZXJHcm91cC5yZXBsYWNlKC8gL2csICdfJyl9YCk7XG4gIHNoYXJlQ29udGFpbmVyLmlubmVySFRNTCA9IGBcbiAgICA8ZGl2PlxuICAgICAgPGxhYmVsIGZvcj1cIm5hbWVcIiBjbGFzcz1cImJsb2NrIG1iLTIgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktOTAwIGRhcms6dGV4dC13aGl0ZVwiPkF2YWlsYWJsZTwvbGFiZWw+XG4gICAgICAgIDxkaXYgaWQ9XCJzaGlwLXByb2R1Y3QtcXVhbnRpdHlcIlxuICAgICAgICAgIGNsYXNzPVwic2hhZG93LXNtIGJnLWdyYXktNTAgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCB0ZXh0LWdyYXktOTAwIHRleHQtc20gcm91bmRlZC1sZyBmb2N1czpyaW5nLWJsdWUtNjAwIGZvY3VzOmJvcmRlci1ibHVlLTYwMCBibG9jayB3LWZ1bGwgcC0yLjUgZGFyazpiZy1ncmF5LTYwMCBkYXJrOmJvcmRlci1ncmF5LTUwMCBkYXJrOnBsYWNlaG9sZGVyLWdyYXktNDAwIGRhcms6dGV4dC13aGl0ZSBkYXJrOmZvY3VzOnJpbmctYmx1ZS01MDAgZGFyazpmb2N1czpib3JkZXItYmx1ZS01MDBcIj5cbiAgICAgICR7cHJvZHVjdFBhcmFtLmF2YWlsYWJsZV9xdWFudGl0eVtncm91cF0gfHwgMH08L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2PlxuICAgICAgPGxhYmVsIGZvcj1cInByb2R1Y3RfZ3JvdXBcIiBjbGFzcz1cImJsb2NrIG1iLTIgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktOTAwIGRhcms6dGV4dC13aGl0ZVwiID5BY3Rpb248L2xhYmVsID5cbiAgICAgIDxidXR0b24gc2hhcmUtZ3JvdXAtZGF0YT0ke2dyb3VwVW5kZXJTY29yZX0gdHlwZT1cImJ1dHRvblwiIGlkPVwic2hhcmUtcHJvZHVjdC1idXR0b24tJHtncm91cFVuZGVyU2NvcmV9XCIgY2xhc3M9XCJyZXF1ZXN0LXNoYXJlLXByb2R1Y3QtYnV0dG9uIGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBweC0zIHB5LTIuNSB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtY2VudGVyIHRleHQtd2hpdGUgcm91bmRlZC1sZyBiZy15ZWxsb3ctNDAwIGhvdmVyOmJnLWJsdWUtODAwIGZvY3VzOnJpbmctNCBmb2N1czpyaW5nLWJsdWUtMzAwIGRhcms6YmctYmx1ZS02MDAgZGFyazpob3ZlcjpiZy1ibHVlLTcwMCBkYXJrOmZvY3VzOnJpbmctYmx1ZS04MDBcIj5cbiAgICAgICAgPHN2ZyBjbGFzcz1cInctNCBoLTQgbXItMlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJNMTcuNDE0IDIuNTg2YTIgMiAwIDAwLTIuODI4IDBMNyAxMC4xNzJWMTNoMi44MjhsNy41ODYtNy41ODZhMiAyIDAgMDAwLTIuODI4elwiPjwvcGF0aD48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0yIDZhMiAyIDAgMDEyLTJoNGExIDEgMCAwMTAgMkg0djEwaDEwdi00YTEgMSAwIDExMiAwdjRhMiAyIDAgMDEtMiAySDRhMiAyIDAgMDEtMi0yVjZ6XCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiPjwvcGF0aD48L3N2Zz5cbiAgICAgICAgUmVxdWVzdCBTaGFyZVxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIGA7XG5cbiAgY29uc3Qgc2hhcmVQcm9kdWN0QnRuID0gc2hhcmVDb250YWluZXIucXVlcnlTZWxlY3RvcihgI3NoYXJlLXByb2R1Y3QtYnV0dG9uLSR7Z3JvdXBVbmRlclNjb3JlfWApO1xuXG4gIGlmIChwcm9kdWN0UGFyYW0uYXZhaWxhYmxlX3F1YW50aXR5W2dyb3VwXSA9PT0gMCB8fCAhcHJvZHVjdFBhcmFtLmF2YWlsYWJsZV9xdWFudGl0eVtncm91cF0pIHtcbiAgICBpZiAoc2hpcFByb2R1Y3RCdG4gJiYgYXNzaWduUHJvZHVjdEJ0bikge1xuICAgICAgc2hpcFByb2R1Y3RCdG4uY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJyk7XG4gICAgICBhc3NpZ25Qcm9kdWN0QnRuLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZScpO1xuICAgIH1cbiAgICAvLyBUT0RPOiBBc2sgY2xpZW50IGFib3V0IHNoYXJlIHJlcXVlc3Qgd2hlbiA9PT0gMFxuICAgIHNoYXJlUHJvZHVjdEJ0bi5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUnKTtcbiAgfVxuXG4gIGlmIChpc0VxdWFsKSB7XG4gICAgcHJvZHVjdFR5cGVDb250YWluZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc2hpcEFzc2lnbkNvbnRhaW5lciwgcHJvZHVjdFR5cGVDb250YWluZXIubmV4dFNpYmxpbmcpO1xuICB9IGVsc2Uge1xuICAgIHByb2R1Y3RUeXBlQ29udGFpbmVyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNoYXJlQ29udGFpbmVyLCBwcm9kdWN0VHlwZUNvbnRhaW5lci5uZXh0U2libGluZyk7XG4gIH1cblxuICBpZiAoaXNFdmVudEl0ZW0pIHtcbiAgICBjb25zdCBib29raW5nQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib29raW5nLXByb2R1Y3QtYnV0dG9uJyk7XG4gICAgYm9va2luZ0J1dHRvbnMuZm9yRWFjaCgoZSkgPT5cbiAgICAgIGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGxldCBzaGlwR3JvdXAgPSBlLmdldEF0dHJpYnV0ZSgnc2hpcC1ncm91cC1kYXRhJyk7XG4gICAgICAgIGNvbnN0IHByb2R1Y3QgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLnByb2R1Y3QpO1xuICAgICAgICBib29raW5nKHByb2R1Y3QsIHNoaXBHcm91cCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBjb25zdCBzaGlwQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGlwLXByb2R1Y3QtYnV0dG9uJyk7XG4gIHNoaXBCdXR0b25zLmZvckVhY2goKGUpID0+XG4gICAgZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHZpZXdNb2RhbC5oaWRlKCk7XG4gICAgICBlZGl0TW9kYWwuaGlkZSgpO1xuICAgICAgbGV0IHNoaXBHcm91cCA9IGUuZ2V0QXR0cmlidXRlKCdzaGlwLWdyb3VwLWRhdGEnKTtcbiAgICAgIGNvbnN0IHByb2R1Y3QgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLnByb2R1Y3QpO1xuICAgICAgc2hpcChwcm9kdWN0LCBzaGlwR3JvdXApO1xuICAgIH0pXG4gICk7XG5cbiAgY29uc3QgYXNzaWduQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hc3NpZ24tcHJvZHVjdC1idXR0b24nKTtcbiAgYXNzaWduQnV0dG9ucy5mb3JFYWNoKChlKSA9PlxuICAgIGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB2aWV3TW9kYWwuaGlkZSgpO1xuICAgICAgZWRpdE1vZGFsLmhpZGUoKTtcbiAgICAgIGxldCBhc3NpZ25Hcm91cCA9IGUuZ2V0QXR0cmlidXRlKCdhc3NpZ24tZ3JvdXAtZGF0YScpO1xuICAgICAgY29uc3QgcHJvZHVjdCA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UucHJvZHVjdCk7XG4gICAgICBhc3NpZ24ocHJvZHVjdCwgYXNzaWduR3JvdXApO1xuICAgIH0pXG4gICk7XG5cbiAgY29uc3QgcmVxdWVzdFNoYXJlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZXF1ZXN0LXNoYXJlLXByb2R1Y3QtYnV0dG9uJyk7XG4gIHJlcXVlc3RTaGFyZUJ1dHRvbnMuZm9yRWFjaCgoZSkgPT5cbiAgICBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdmlld01vZGFsLmhpZGUoKTtcbiAgICAgIGVkaXRNb2RhbC5oaWRlKCk7XG4gICAgICBsZXQgc2hhcmVHcm91cCA9IGUuZ2V0QXR0cmlidXRlKCdzaGFyZS1ncm91cC1kYXRhJyk7XG4gICAgICBjb25zdCBwcm9kdWN0ID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5wcm9kdWN0KTtcblxuICAgICAgcmVxdWVzdFNoYXJlKHByb2R1Y3QsIHNoYXJlR3JvdXApO1xuICAgIH0pXG4gICk7XG4gIGNvbnN0IHByb2R1Y3RWaWV3VHlwZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXZpZXctcHJvZHVjdC1uYW1lLWNvbnRhaW5lcicpO1xuICBjb25zdCBwcm9kdWN0TWFzdGVyR3JvdXBDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgcHJvZHVjdE1hc3Rlckdyb3VwQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3NtOmNvbC1zcGFuLTMnKTtcbiAgcHJvZHVjdE1hc3Rlckdyb3VwQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCBgcHJvZHVjdC12aWV3LXByb2R1Y3RfZ3JvdXAtY29udGFpbmVyLSR7Z3JvdXBVbmRlclNjb3JlfWApO1xuXG4gIHByb2R1Y3RNYXN0ZXJHcm91cENvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgPGxhYmVsIGZvcj1cImZvci1ncm91cC0ke2dyb3VwVW5kZXJTY29yZX1cIlxuICAgICAgY2xhc3M9XCJibG9jayBtYi0yIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtd2hpdGVcIj4ke21hc3Rlckdyb3VwfTwvbGFiZWw+XG4gICAgPHNlbGVjdCB0eXBlPVwidGV4dFwiIG5hbWU9XCJncm91cC0ke2dyb3VwVW5kZXJTY29yZX1cIiBpZD1cInByb2R1Y3Qtdmlldy0ke2dyb3VwVW5kZXJTY29yZX1cIlxuICAgICAgY2xhc3M9XCJzaGFkb3ctc20gYmctZ3JheS01MCBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHRleHQtZ3JheS05MDAgdGV4dC1zbSByb3VuZGVkLWxnIGZvY3VzOnJpbmctYmx1ZS02MDAgZm9jdXM6Ym9yZGVyLWJsdWUtNjAwIGJsb2NrIHctZnVsbCBwLTIuNSBkYXJrOmJnLWdyYXktNjAwIGRhcms6Ym9yZGVyLWdyYXktNTAwIGRhcms6cGxhY2Vob2xkZXItZ3JheS00MDAgZGFyazp0ZXh0LXdoaXRlIGRhcms6Zm9jdXM6cmluZy1ibHVlLTUwMCBkYXJrOmZvY3VzOmJvcmRlci1ibHVlLTUwMFwiXG4gICAgICBwbGFjZWhvbGRlcj1cIlNvbWUgR3JvdXBcIiByZXF1aXJlZFxuICAgID5cbiAgICAgIDxvcHRpb24gdmFsdWU9XCIke2dyb3VwUHJvZHVjdElkc1tncm91cF19XCI+JHtncm91cH08L29wdGlvbj5cbiAgICA8L3NlbGVjdD5cbiAgICBgO1xuICBwcm9kdWN0Vmlld1R5cGVDb250YWluZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocHJvZHVjdE1hc3Rlckdyb3VwQ29udGFpbmVyLCBwcm9kdWN0Vmlld1R5cGVDb250YWluZXIubmV4dFNpYmxpbmcpO1xufVxuXG4vLyBmdW5jdGlvbiB0byBmaWx0ZXIgcHJvZHVjdHMgYnkgZ3JvdXBcbmNvbnN0IHByb2R1Y3RGaWx0ZXJJbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdC1maWx0ZXItaW5wdXQnKTtcbmNvbnN0IGZpbHRlclByb2R1Y3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1maWx0ZXItYnV0dG9uJyk7XG5jb25zdCBmaWx0ZXJSYWRpb0J1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdC1maWx0ZXItcmFkaW8tYnV0dG9uJyk7XG5cbmZpbHRlclJhZGlvQnV0dG9ucy5mb3JFYWNoKChidG4pID0+IHtcbiAgY29uc3QgZmlsdGVyQnV0dG9uSWQgPSBidG4uZ2V0QXR0cmlidXRlKCdpZCcpO1xuICBjb25zdCBmaWx0ZXJKc29uRGF0YVN0b3JhZ2UgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdmaWx0ZXJKc29uRGF0YScpO1xuICBjb25zdCBmaWx0ZXJKc29uRGF0YU9iamVjdCA9IEpTT04ucGFyc2UoZmlsdGVySnNvbkRhdGFTdG9yYWdlKTtcblxuICBmb3IgKGNvbnN0IGtleSBpbiBmaWx0ZXJKc29uRGF0YU9iamVjdCkge1xuICAgIGlmIChmaWx0ZXJCdXR0b25JZC5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICBidG4uaW5uZXJIVE1MID0gYFxuICAgICAgICAke2ZpbHRlckpzb25EYXRhT2JqZWN0W2tleV19XG4gICAgICAgIDxzdmcgY2xhc3M9XCJ3LTIuNSBoLTIuNSBtbC0yLjVcIiBhcmlhLWhpZGRlbj1cInRydWVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIlxuICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMTAgNlwiPlxuICAgICAgICAgIDxwYXRoIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZS13aWR0aD1cIjJcIlxuICAgICAgICAgICAgZD1cIm0xIDEgNCA0IDQtNFwiIC8+XG4gICAgICAgIDwvc3ZnPmA7XG4gICAgfVxuICB9XG59KTtcblxucHJvZHVjdEZpbHRlcklucHV0cy5mb3JFYWNoKChpbnB1dDogSFRNTElucHV0RWxlbWVudCkgPT4ge1xuICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgY29uc3QgZmlsdGVySW5wdXREYXRhVGFyZ2V0ID0gaW5wdXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpO1xuICAgIGNvbnN0IG1hc3Rlckdyb3VwID0gZmlsdGVySW5wdXREYXRhVGFyZ2V0XG4gICAgICAuc3BsaXQoJywnKVsxXVxuICAgICAgLnJlcGxhY2UoL1teYS16QS1aMC05XFxzXFxfXS9nLCAnJylcbiAgICAgIC50cmltKCk7XG4gICAgY29uc3QgZmlsdGVySW5wdXRJZCA9IGZpbHRlcklucHV0RGF0YVRhcmdldC5zcGxpdCgnLCcpWzBdLnJlcGxhY2UoL1teYS16QS1aMC05XFxzXFxfXS9nLCAnJyk7XG4gICAgY29uc3QgZmlsdGVySW5wdXRJZFN0cmluZyA9IGAjcHJvZHVjdC1maWx0ZXItaW5wdXQtJHtmaWx0ZXJJbnB1dElkfWA7XG4gICAgY29uc3QgZmlsdGVyQnV0dG9uSWQgPSBmaWx0ZXJJbnB1dERhdGFUYXJnZXRcbiAgICAgIC5zcGxpdCgnLCcpWzFdXG4gICAgICAudHJpbSgpXG4gICAgICAucmVwbGFjZSgvW15hLXpBLVowLTlcXHNcXF9dL2csICcnKTtcbiAgICBjb25zdCBmaWx0ZXJJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZmlsdGVySW5wdXRJZFN0cmluZykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICBjb25zdCBmaWx0ZXJSYWRpb0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNkcm9wZG93blJhZGlvQnV0dG9uLSR7ZmlsdGVyQnV0dG9uSWR9YCk7XG5cbiAgICBpZiAoZmlsdGVySW5wdXRJZFN0cmluZy5pbmNsdWRlcyhmaWx0ZXJCdXR0b25JZCkgJiYgaW5wdXQudmFsdWUgPT09IG1hc3Rlckdyb3VwKSB7XG4gICAgICBmaWx0ZXJSYWRpb0J0bi5pbm5lckhUTUwgPSBgXG4gICAgICAgICR7ZmlsdGVyQnV0dG9uSWQuc3BsaXQoJ18nKS5qb2luKCcgJyl9XG4gICAgICAgIDxzdmcgY2xhc3M9XCJ3LTIuNSBoLTIuNSBtbC0yLjVcIiBhcmlhLWhpZGRlbj1cInRydWVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIlxuICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMTAgNlwiPlxuICAgICAgICAgIDxwYXRoIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZS13aWR0aD1cIjJcIlxuICAgICAgICAgICAgZD1cIm0xIDEgNCA0IDQtNFwiIC8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgYDtcbiAgICAgIGdldFNlc3Npb25TdG9yYWdlT2JqZWN0KGZpbHRlckpzb25EYXRhLCAnZmlsdGVySnNvbkRhdGEnLCAncmVtb3ZlJywgZmlsdGVyQnV0dG9uSWQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZpbHRlclJhZGlvQnRuLmlubmVySFRNTCA9IGBcbiAgICAgICR7ZmlsdGVySW5wdXQudmFsdWUuc3BsaXQoJ18nKS5qb2luKCcgJyl9XG4gICAgICA8c3ZnIGNsYXNzPVwidy0yLjUgaC0yLjUgbWwtMi41XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCJcbiAgICAgICAgdmlld0JveD1cIjAgMCAxMCA2XCI+XG4gICAgICAgIDxwYXRoIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZS13aWR0aD1cIjJcIlxuICAgICAgICAgIGQ9XCJtMSAxIDQgNCA0LTRcIiAvPlxuICAgICAgPC9zdmc+XG4gICAgICBgO1xuICAgIGZpbHRlckpzb25EYXRhW2ZpbHRlckJ1dHRvbklkXSA9IGZpbHRlcklucHV0LnZhbHVlLnNwbGl0KCdfJykuam9pbignICcpO1xuICAgIGdldFNlc3Npb25TdG9yYWdlT2JqZWN0KGZpbHRlckpzb25EYXRhLCAnZmlsdGVySnNvbkRhdGEnLCAnYWRkJyk7XG4gIH0pO1xufSk7XG5cbmZpbHRlclByb2R1Y3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICBjb25zdCBoaWRkZW5JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzb3J0X2J5JykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgY29uc3QgZmlsdGVySnNvbkRhdGFTdG9yYWdlID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnZmlsdGVySnNvbkRhdGEnKTtcbiAgY29uc3QgZmlsdGVyRGF0YU9iamVjdCA9IEpTT04ucGFyc2UoZmlsdGVySnNvbkRhdGFTdG9yYWdlKTtcbiAgZmlsdGVySnNvbkRhdGEgPSBmaWx0ZXJEYXRhT2JqZWN0O1xuICBoaWRkZW5JbnB1dC52YWx1ZSA9IEpTT04uc3RyaW5naWZ5KGZpbHRlckpzb25EYXRhKTtcbiAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnZmlsdGVySnNvbkRhdGEnLCBKU09OLnN0cmluZ2lmeShmaWx0ZXJKc29uRGF0YSkpO1xuICBjb25zdCBpc1Zpc2libGVGaWx0ZXIgPSB0cnVlO1xuICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdpc1Zpc2libGVGaWx0ZXInLCBKU09OLnN0cmluZ2lmeShpc1Zpc2libGVGaWx0ZXIpKTtcbn0pO1xuXG5mdW5jdGlvbiBnZXRTZXNzaW9uU3RvcmFnZU9iamVjdChcbiAgbG9jYWxPYmplY3Q6IEZpbHRlckpzb25EYXRhLFxuICBzZXNzaW9uT2JqZWN0OiBzdHJpbmcsXG4gIG1ldGhvZCA9ICdub25lJyxcbiAgb2JqZWN0S2V5ID0gJ25vbmUnXG4pIHtcbiAgY29uc3QganNvbkRhdGFPYmplY3QgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKHNlc3Npb25PYmplY3QpO1xuICBjb25zdCBkYXRhT2JqZWN0ID0gSlNPTi5wYXJzZShqc29uRGF0YU9iamVjdCk7XG4gIHN3aXRjaCAobWV0aG9kKSB7XG4gICAgY2FzZSAnYWRkJzpcbiAgICAgIGNvbnN0IG5ld0RhdGFPYmplY3QgPSB7IC4uLmRhdGFPYmplY3QsIC4uLmxvY2FsT2JqZWN0IH07XG4gICAgICBjb25zdCBuZXdKc29uRGF0YSA9IEpTT04uc3RyaW5naWZ5KG5ld0RhdGFPYmplY3QpO1xuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShzZXNzaW9uT2JqZWN0LCBuZXdKc29uRGF0YSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdyZW1vdmUnOlxuICAgICAgZGVsZXRlIGRhdGFPYmplY3Rbb2JqZWN0S2V5XTtcbiAgICAgIGNvbnN0IG5ld0pzb25EYXRhT2JqZWN0ID0gSlNPTi5zdHJpbmdpZnkoZGF0YU9iamVjdCk7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKHNlc3Npb25PYmplY3QsIG5ld0pzb25EYXRhT2JqZWN0KTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVBZGp1c3RBY3Rpb24oaXNFcXVhbDogYm9vbGVhbiwgbWFzdGVyR3JvdXA6IHN0cmluZywgZ3JvdXA6IHN0cmluZywgcHJvZHVjdFBhcmFtOiBJUHJvZHVjdCkge1xuICBjb25zdCBwcm9kdWN0SW5XYXJlaG91c2VzID0gc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcbiAgICAncHJvZHVjdEluV2FyZWhvdXNlcycsXG4gICAgSlNPTi5zdHJpbmdpZnkocHJvZHVjdFBhcmFtLnByb2R1Y3RfaW5fd2FyZWhvdXNlcylcbiAgKTtcbiAgY29uc3QgZ3JvdXBVbmRlclNjb3JlID0gZ3JvdXAucmVwbGFjZSgvIC9nLCAnXycpO1xuICBjb25zdCBncm91cFByb2R1Y3RJZHMgPSBwcm9kdWN0UGFyYW0uZ3JvdXBzX2lkcztcbiAgY29uc3QgcHJvZHVjdFR5cGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcHJvZHVjdC1hZGp1c3QtcHJvZHVjdC1uYW1lLWNvbnRhaW5lcmApO1xuICBjb25zdCBhZGp1c3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgYWRqdXN0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3NtOmNvbC1zcGFuLTInLCAnZmxleCcsICdnYXAtNCcpO1xuICBhZGp1c3RDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsIGBwcm9kdWN0LWFkanVzdC1jb250YWluZXItJHtncm91cFVuZGVyU2NvcmV9YCk7XG4gIGFkanVzdENvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgPGRpdj5cbiAgICAgIDxsYWJlbCBmb3I9XCJhZGp1c3QtcHJvZHVjdC1xdWFudGl0eS0ke2dyb3VwVW5kZXJTY29yZX1cIiBjbGFzcz1cImJsb2NrIG1iLTIgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktOTAwIGRhcms6dGV4dC13aGl0ZVwiPkF2YWlsYWJsZTwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCBpZD1cImFkanVzdC1wcm9kdWN0LXF1YW50aXR5LSR7Z3JvdXBVbmRlclNjb3JlfVwiXG4gICAgICAgICAgY2xhc3M9XCJwcm9kdWN0LWFkanVzdC1ncm91cC1xdWFudGl0eSBzaGFkb3ctc20gYmctZ3JheS01MCBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHRleHQtZ3JheS05MDAgdGV4dC1zbSByb3VuZGVkLWxnIGZvY3VzOnJpbmctYmx1ZS02MDAgZm9jdXM6Ym9yZGVyLWJsdWUtNjAwIGJsb2NrIHctZnVsbCBwLTIuNSBkYXJrOmJnLWdyYXktNjAwIGRhcms6Ym9yZGVyLWdyYXktNTAwIGRhcms6cGxhY2Vob2xkZXItZ3JheS00MDAgZGFyazp0ZXh0LXdoaXRlIGRhcms6Zm9jdXM6cmluZy1ibHVlLTUwMCBkYXJrOmZvY3VzOmJvcmRlci1ibHVlLTUwMFwiPlxuICAgIDwvZGl2PlxuXG4gIGA7XG5cbiAgcHJvZHVjdFR5cGVDb250YWluZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYWRqdXN0Q29udGFpbmVyLCBwcm9kdWN0VHlwZUNvbnRhaW5lci5uZXh0U2libGluZyk7XG5cbiAgY29uc3QgcHJvZHVjdFZpZXdUeXBlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtYWRqdXN0LXByb2R1Y3QtbmFtZS1jb250YWluZXInKTtcbiAgY29uc3QgbWFzdGVyR3JvdXBXYXJlaG91c2VDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbWFzdGVyR3JvdXBXYXJlaG91c2VDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc206Y29sLXNwYW4tNCcpO1xuICBtYXN0ZXJHcm91cFdhcmVob3VzZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgYHByb2R1Y3QtYWRqdXN0LXByb2R1Y3RfZ3JvdXAtY29udGFpbmVyLSR7Z3JvdXBVbmRlclNjb3JlfWApO1xuXG4gIG1hc3Rlckdyb3VwV2FyZWhvdXNlQ29udGFpbmVyLmlubmVySFRNTCA9IGBcbiAgPGRpdiBjbGFzcz1cImZsZXggZ2FwLTRcIj5cbiAgICA8ZGl2IGNsYXNzPVwiXCI+XG4gICAgICA8bGFiZWwgZm9yPVwiZm9yLWdyb3VwLSR7Z3JvdXBVbmRlclNjb3JlfVwiXG4gICAgICAgIGNsYXNzPVwiYmxvY2sgbWItMiB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDAgZGFyazp0ZXh0LXdoaXRlXCI+JHttYXN0ZXJHcm91cH08L2xhYmVsPlxuICAgICAgPHNlbGVjdCB0eXBlPVwidGV4dFwiIG5hbWU9XCJncm91cC0ke2dyb3VwVW5kZXJTY29yZX1cIiBpZD1cIm1hc3Rlci1ncm91cC1hZGp1c3QtJHtncm91cFVuZGVyU2NvcmV9XCJcbiAgICAgICAgY2xhc3M9XCJwcm9kdWN0LWFkanVzdC1ncm91cCBzaGFkb3ctc20gYmctZ3JheS01MCBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHRleHQtZ3JheS05MDAgdGV4dC1zbSByb3VuZGVkLWxnIGZvY3VzOnJpbmctYmx1ZS02MDAgZm9jdXM6Ym9yZGVyLWJsdWUtNjAwIGJsb2NrIHctZnVsbCBwLTIuNSBkYXJrOmJnLWdyYXktNjAwIGRhcms6Ym9yZGVyLWdyYXktNTAwIGRhcms6cGxhY2Vob2xkZXItZ3JheS00MDAgZGFyazp0ZXh0LXdoaXRlIGRhcms6Zm9jdXM6cmluZy1ibHVlLTUwMCBkYXJrOmZvY3VzOmJvcmRlci1ibHVlLTUwMFwiXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiU29tZSBHcm91cFwiIHJlcXVpcmVkXG4gICAgICA+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCIke2dyb3VwUHJvZHVjdElkc1tncm91cF19XCI+JHtncm91cH08L29wdGlvbj5cbiAgICAgIDwvc2VsZWN0PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJcIj5cbiAgICAgIDxsYWJlbCBmb3I9XCJmb3Itd2FyZWhvdXNlLSR7Z3JvdXBVbmRlclNjb3JlfVwiXG4gICAgICAgIGNsYXNzPVwiYmxvY2sgbWItMiB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDAgZGFyazp0ZXh0LXdoaXRlXCI+V2FyZWhvdXNlPC9sYWJlbD5cbiAgICAgIDxzZWxlY3QgdHlwZT1cInRleHRcIiBuYW1lPVwiZ3JvdXAtJHtncm91cFVuZGVyU2NvcmV9XCIgaWQ9XCJ3YXJlaG91c2UtYWRqdXN0LSR7Z3JvdXBVbmRlclNjb3JlfVwiIGRhdGEtdGFyZ2V0LWdyb3VwPVwiJHtncm91cH1cIlxuICAgICAgICBjbGFzcz1cInByb2R1Y3QtYWRqdXN0LXdhcmVob3VzZS1zZWxlY3Qgc2hhZG93LXNtIGJnLWdyYXktNTAgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCB0ZXh0LWdyYXktOTAwIHRleHQtc20gcm91bmRlZC1sZyBmb2N1czpyaW5nLWJsdWUtNjAwIGZvY3VzOmJvcmRlci1ibHVlLTYwMCBibG9jayB3LWZ1bGwgcC0yLjUgZGFyazpiZy1ncmF5LTYwMCBkYXJrOmJvcmRlci1ncmF5LTUwMCBkYXJrOnBsYWNlaG9sZGVyLWdyYXktNDAwIGRhcms6dGV4dC13aGl0ZSBkYXJrOmZvY3VzOnJpbmctYmx1ZS01MDAgZGFyazpmb2N1czpib3JkZXItYmx1ZS01MDBcIlxuICAgICAgICBwbGFjZWhvbGRlcj1cIlNvbWUgR3JvdXBcIiByZXF1aXJlZFxuICAgICAgPlxuICAgICAgPC9zZWxlY3Q+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICAgIGA7XG4gIGNvbnN0IHNlbGVjdFdhcmVob3VzZTogSFRNTElucHV0RWxlbWVudCA9IG1hc3Rlckdyb3VwV2FyZWhvdXNlQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXG4gICAgYCN3YXJlaG91c2UtYWRqdXN0LSR7Z3JvdXBVbmRlclNjb3JlfWBcbiAgKTtcbiAgY29uc3QgcHJvZHVjdFF1YW50aXR5OiBIVE1MSW5wdXRFbGVtZW50ID0gYWRqdXN0Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXG4gICAgYCNhZGp1c3QtcHJvZHVjdC1xdWFudGl0eS0ke2dyb3VwVW5kZXJTY29yZX1gXG4gICk7XG5cbiAgZm9yIChjb25zdCB3YXJlaG91c2Ugb2YgcHJvZHVjdFBhcmFtLmFsbF93YXJlaG91c2VzKSB7XG4gICAgaWYgKGlzRXZlbnQgJiYgd2FyZWhvdXNlLm5hbWUgIT09IGV2ZW50c1dhcmVob3VzZSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgIG9wdGlvbi52YWx1ZSA9IHdhcmVob3VzZS5pZC50b1N0cmluZygpO1xuICAgIG9wdGlvbi50ZXh0ID0gd2FyZWhvdXNlLm5hbWUudG9TdHJpbmcoKTtcbiAgICBzZWxlY3RXYXJlaG91c2UuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgfVxuXG4gIGNvbnN0IHByb2R1Y3RRdWFudGl0eVZhbHVlID0gcHJvZHVjdFBhcmFtLnByb2R1Y3RfaW5fd2FyZWhvdXNlc1tncm91cF1bc2VsZWN0V2FyZWhvdXNlLnZhbHVlXSB8fCAwO1xuXG4gIHByb2R1Y3RRdWFudGl0eS52YWx1ZSA9IFN0cmluZyhwcm9kdWN0UXVhbnRpdHlWYWx1ZSk7XG5cbiAgcHJvZHVjdFZpZXdUeXBlQ29udGFpbmVyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG1hc3Rlckdyb3VwV2FyZWhvdXNlQ29udGFpbmVyLCBwcm9kdWN0Vmlld1R5cGVDb250YWluZXIubmV4dFNpYmxpbmcpO1xuXG4gIHNlbGVjdFdhcmVob3VzZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgY29uc3QgcHJvZHVjdEluV2FyZWhvdXNlcyA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdEluV2FyZWhvdXNlcycpKTtcbiAgICBjb25zdCBhdmFpbGFibGVRdWFudGl0eSA9IHByb2R1Y3RJbldhcmVob3VzZXNbZ3JvdXBdW3NlbGVjdFdhcmVob3VzZS52YWx1ZV0gfHwgMDtcbiAgICBwcm9kdWN0UXVhbnRpdHkudmFsdWUgPSBTdHJpbmcoYXZhaWxhYmxlUXVhbnRpdHkpO1xuICAgIHByb2R1Y3RJbldhcmVob3VzZXNbZ3JvdXBdW3NlbGVjdFdhcmVob3VzZS52YWx1ZV0gPSBOdW1iZXIocHJvZHVjdFF1YW50aXR5LnZhbHVlKTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdwcm9kdWN0SW5XYXJlaG91c2VzJywgSlNPTi5zdHJpbmdpZnkocHJvZHVjdEluV2FyZWhvdXNlcykpO1xuICB9KTtcblxuICBwcm9kdWN0UXVhbnRpdHkuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgIGNvbnN0IHByb2R1Y3RJbldhcmVob3VzZXMgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RJbldhcmVob3VzZXMnKSk7XG4gICAgcHJvZHVjdEluV2FyZWhvdXNlc1tncm91cF1bc2VsZWN0V2FyZWhvdXNlLnZhbHVlXSA9IE51bWJlcihwcm9kdWN0UXVhbnRpdHkudmFsdWUpO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3Byb2R1Y3RJbldhcmVob3VzZXMnLCBKU09OLnN0cmluZ2lmeShwcm9kdWN0SW5XYXJlaG91c2VzKSk7XG4gIH0pO1xufVxuXG5jb25zdCBhZGp1c3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcHJvZHVjdC1hZGp1c3Qtc3VibWl0LWJ0bmApO1xuYWRqdXN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBjb25zdCBwcm9kdWN0ID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0JykpO1xuICBjb25zdCBjc3JmVG9rZW5JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oJyNjc3JmX3Rva2VuJyk7XG4gIGNvbnN0IGNzcmZUb2tlbiA9IGNzcmZUb2tlbklucHV0ID8gY3NyZlRva2VuSW5wdXQudmFsdWUgOiAnJztcbiAgYWRqdXN0UHJvZHVjdChwcm9kdWN0LCBjc3JmVG9rZW4pO1xufSk7XG5cbmFzeW5jIGZ1bmN0aW9uIGFkanVzdFByb2R1Y3QocHJvZHVjdFBhcmFtOiBJUHJvZHVjdCwgY3NyZlRva2VuOiBzdHJpbmcpIHtcbiAgY29uc3QgYWRqdXN0Tm90ZTogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWFkanVzdC1ub3RlJyk7XG4gIGNvbnN0IHByb2R1Y3RJbldhcmVob3VzZXMgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RJbldhcmVob3VzZXMnKSk7XG5cbiAgY29uc3QgZGF0YSA9IHtcbiAgICBwcm9kdWN0X2lkOiBwcm9kdWN0UGFyYW0uaWQsXG4gICAgZ3JvdXBzX3F1YW50aXR5OiBKU09OLnN0cmluZ2lmeShwcm9kdWN0SW5XYXJlaG91c2VzKSxcbiAgICBub3RlOiBhZGp1c3ROb3RlLnZhbHVlLFxuICAgIGNzcmZfdG9rZW46IGNzcmZUb2tlbixcbiAgfTtcblxuICBjb25zdCBiYXNlX3VybCA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW47XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL3Byb2R1Y3QvYWRqdXN0YCwge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgfSk7XG5cbiAgLy8gTk9URTogSWYgd2UgZG8gbm90IG5vdGlmeSB1c2VyIGFib3V0IGFkanVzdCwgZGVsZXRlIGlmIGVsc2Ugc3RhdGVtZW50XG4gIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMSkge1xuICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ3Byb2R1Y3RJbldhcmVob3VzZXMnKTtcbiAgfSBlbHNlIHtcbiAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKCdwcm9kdWN0SW5XYXJlaG91c2VzJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVsZXRlQWRqdXN0Q29udGFpbmVyKG5hbWVHcm91cDogc3RyaW5nLCBuYW1lR3JvdXBWYWx1ZTogc3RyaW5nKSB7XG4gIGNvbnN0IGFkanVzdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNwcm9kdWN0LWFkanVzdC1jb250YWluZXItJHtuYW1lR3JvdXBWYWx1ZS5yZXBsYWNlKC8gL2csICdfJyl9YCk7XG4gIGNvbnN0IG1hc3Rlckdyb3VwV2FyZWhvdXNlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBgI3Byb2R1Y3QtYWRqdXN0LXByb2R1Y3RfZ3JvdXAtY29udGFpbmVyLSR7bmFtZUdyb3VwVmFsdWUucmVwbGFjZSgvIC9nLCAnXycpfWBcbiAgKTtcbiAgaWYgKGFkanVzdENvbnRhaW5lcikge1xuICAgIGFkanVzdENvbnRhaW5lci5yZW1vdmUoKTtcbiAgfVxuICBpZiAobWFzdGVyR3JvdXBXYXJlaG91c2VDb250YWluZXIpIHtcbiAgICBtYXN0ZXJHcm91cFdhcmVob3VzZUNvbnRhaW5lci5yZW1vdmUoKTtcbiAgfVxufVxuXG4vLyAtLS0tYWRkIGluYm91bmQgb3JkZXIgaXRlbSBmb3IgZWRpdCBtb2RhbC0tLS1cbmZ1bmN0aW9uIGNyZWF0ZVByb2R1Y3RHcm91cEVkaXRJdGVtKFxuICBwcm9kdWN0UGFyYW06IElQcm9kdWN0ID0gbnVsbCxcbiAgbWFzdGVyR3JvdXA6IHN0cmluZyA9IG51bGwsXG4gIGl0ZW1JbmRleDogbnVtYmVyID0gbnVsbFxuKSB7XG4gIGlmICghcHJvZHVjdFBhcmFtKSB7XG4gICAgY29uc3QgcHJvZHVjdDogSVByb2R1Y3QgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3QnKSk7XG4gICAgcHJvZHVjdFBhcmFtID0gcHJvZHVjdDtcbiAgfVxuXG4gIGNvbnN0IHByb2R1Y3RHcm91cEVkaXRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ncm91cC1lZGl0LWFkZC1jb250YWluZXInKTtcbiAgY29uc3QgcHJvZHVjdEdyb3VwRWRpdEFsbEl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3QtZ3JvdXAtZWRpdC1hZGQtaXRlbScpO1xuICBjb25zdCBpbmRleCA9IHByb2R1Y3RHcm91cEVkaXRBbGxJdGVtcy5sZW5ndGggKyAxO1xuICBjb25zdCBwcm9kdWN0R3JvdXBFZGl0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gIHByb2R1Y3RHcm91cEVkaXRJdGVtLmNsYXNzTGlzdC5hZGQoXG4gICAgJ3AtNicsXG4gICAgJ3NwYWNlLXktNicsXG4gICAgJ2JvcmRlci10JyxcbiAgICAncHJvZHVjdC1ncm91cC1lZGl0LWFkZC1pdGVtJyxcbiAgICBgZGVsZXRlLWlkLSR7aW5kZXh9YFxuICApO1xuICBwcm9kdWN0R3JvdXBFZGl0SXRlbS5pbm5lckhUTUwgPSBgXG4gIDxkaXYgY2xhc3M9XCJncmlkIGdyaWQtY29scy0xMiBnYXAtNVwiPlxuICAgIDxkaXYgY2xhc3M9XCJjb2wtc3Bhbi02IHNtOmNvbC1zcGFuLTRcIj5cbiAgICAgIDxsYWJlbCBmb3I9XCJzdGF0dXNcIiBjbGFzcz1cImJsb2NrIG1iLTIgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktOTAwIGRhcms6dGV4dC13aGl0ZVwiPk1hc3RlclxuICAgICAgICBHcm91cDwvbGFiZWw+XG4gICAgICA8c2VsZWN0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImFkZF9wcm9kdWN0XCIgaWQ9XCJwcm9kdWN0LW1hc3Rlci1ncm91cC1lZGl0LWl0ZW0tJHtpbmRleH1cIlxuICAgICAgICBjbGFzcz1cInByb2R1Y3QtbWFzdGVyLWdyb3VwLWVkaXQtaXRlbSBzaGFkb3ctc20gYmctZ3JheS01MCBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHRleHQtZ3JheS05MDAgdGV4dC1zbSByb3VuZGVkLWxnIGZvY3VzOnJpbmctYmx1ZS02MDAgZm9jdXM6Ym9yZGVyLWJsdWUtNjAwIGJsb2NrIHctZnVsbCBwLTIuNSBkYXJrOmJnLWdyYXktNjAwIGRhcms6Ym9yZGVyLWdyYXktNTAwIGRhcms6cGxhY2Vob2xkZXItZ3JheS00MDAgZGFyazp0ZXh0LXdoaXRlIGRhcms6Zm9jdXM6cmluZy1ibHVlLTUwMCBkYXJrOmZvY3VzOmJvcmRlci1ibHVlLTUwMFwiXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiTWFzdGVyXG4gICAgICAgIEdyb3VwXCIgcmVxdWlyZWQ+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIiBkaXNhYmxlZCBzZWxlY3RlZD5TZWxlY3QgbWFzdGVyIGdyb3VwPC9vcHRpb24+XG4gICAgICA8L3NlbGVjdD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sLXNwYW4tNiBzbTpjb2wtc3Bhbi00XCI+XG4gICAgICA8bGFiZWwgZm9yPVwic3RhdHVzXCIgY2xhc3M9XCJibG9jayBtYi0yIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtd2hpdGVcIj5Hcm91cDwvbGFiZWw+XG4gICAgICA8c2VsZWN0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImFkZF9ncm91cFwiIGlkPVwicHJvZHVjdC1ncm91cC1lZGl0LWl0ZW0tJHtpbmRleH1cIlxuICAgICAgICBjbGFzcz1cInByb2R1Y3QtZ3JvdXAtZWRpdC1pdGVtIHNoYWRvdy1zbSBiZy1ncmF5LTUwIGJvcmRlciBib3JkZXItZ3JheS0zMDAgdGV4dC1ncmF5LTkwMCB0ZXh0LXNtIHJvdW5kZWQtbGcgZm9jdXM6cmluZy1ibHVlLTYwMCBmb2N1czpib3JkZXItYmx1ZS02MDAgYmxvY2sgdy1mdWxsIHAtMi41IGRhcms6YmctZ3JheS02MDAgZGFyazpib3JkZXItZ3JheS01MDAgZGFyazpwbGFjZWhvbGRlci1ncmF5LTQwMCBkYXJrOnRleHQtd2hpdGUgZGFyazpmb2N1czpyaW5nLWJsdWUtNTAwIGRhcms6Zm9jdXM6Ym9yZGVyLWJsdWUtNTAwXCJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJHcm91cFwiIHJlcXVpcmVkPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCIgZGlzYWJsZWQgc2VsZWN0ZWQ+U2VsZWN0IGdyb3VwPC9vcHRpb24+XG4gICAgICA8L3NlbGVjdD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sLXNwYW4tNiBzbTpjb2wtc3Bhbi00XCI+XG4gICAgICA8bGFiZWwgZm9yPVwic3RhdHVzXCIgY2xhc3M9XCJibG9jayBtYi0yIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtd2hpdGVcIj5BY3Rpb248L2xhYmVsPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgZGF0YS10YXJnZXQ9XCJcIlxuICAgICAgICBjbGFzcz1cInByb2R1Y3QtZ3JvdXAtZWRpdC1kZWxldGUtaXRlbS1idG4gaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIHB4LTMgcHktMiBtci0zIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1jZW50ZXIgdGV4dC13aGl0ZSByb3VuZGVkLWxnIGJnLXJlZC02MDAgaG92ZXI6YmctcmVkLTgwMCBmb2N1czpyaW5nLTQgZm9jdXM6cmluZy1yZWQtMzAwIGRhcms6Zm9jdXM6cmluZy1yZWQtOTAwXCI+XG4gICAgICAgIDxzdmcgY2xhc3M9XCJ3LTYgaC02XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgNDQ4IDUxMlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgZD1cIk0xMzUuMiAxNy43QzE0MC42IDYuOCAxNTEuNyAwIDE2My44IDBIMjg0LjJjMTIuMSAwIDIzLjIgNi44IDI4LjYgMTcuN0wzMjAgMzJoOTZjMTcuNyAwIDMyIDE0LjMgMzIgMzJzLTE0LjMgMzItMzIgMzJIMzJDMTQuMyA5NiAwIDgxLjcgMCA2NFMxNC4zIDMyIDMyIDMyaDk2bDcuMi0xNC4zek0zMiAxMjhINDE2VjQ0OGMwIDM1LjMtMjguNyA2NC02NCA2NEg5NmMtMzUuMyAwLTY0LTI4LjctNjQtNjRWMTI4em05NiA2NGMtOC44IDAtMTYgNy4yLTE2IDE2VjQzMmMwIDguOCA3LjIgMTYgMTYgMTZzMTYtNy4yIDE2LTE2VjIwOGMwLTguOC03LjItMTYtMTYtMTZ6bTk2IDBjLTguOCAwLTE2IDcuMi0xNiAxNlY0MzJjMCA4LjggNy4yIDE2IDE2IDE2czE2LTcuMiAxNi0xNlYyMDhjMC04LjgtNy4yLTE2LTE2LTE2em05NiAwYy04LjggMC0xNiA3LjItMTYgMTZWNDMyYzAgOC44IDcuMiAxNiAxNiAxNnMxNi03LjIgMTYtMTZWMjA4YzAtOC44LTcuMi0xNi0xNi0xNnpcIj5cbiAgICAgICAgICA8L3BhdGg+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBpZD1cInByb2R1Y3QtZ3JvdXAtZWRpdC1hZGQtaXRlbS1idG4tJHtpbmRleH1cIlxuICAgICAgICBjbGFzcz1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBweC0zIHB5LTIgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWNlbnRlciB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgYmcteWVsbG93LTQwMCBob3ZlcjpiZy15ZWxsb3ctNTAwIGZvY3VzOnJpbmctNCBmb2N1czpyaW5nLXJlZC0zMDBcIj5cbiAgICAgICAgPHN2ZyBjbGFzcz1cInctNiBoLTZcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCA0NDggNTEyXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICBkPVwiTTY0IDgwYy04LjggMC0xNiA3LjItMTYgMTZWNDE2YzAgOC44IDcuMiAxNiAxNiAxNkgzODRjOC44IDAgMTYtNy4yIDE2LTE2Vjk2YzAtOC44LTcuMi0xNi0xNi0xNkg2NHpNMCA5NkMwIDYwLjcgMjguNyAzMiA2NCAzMkgzODRjMzUuMyAwIDY0IDI4LjcgNjQgNjRWNDE2YzAgMzUuMy0yOC43IDY0LTY0IDY0SDY0Yy0zNS4zIDAtNjQtMjguNy02NC02NFY5NnpNMjAwIDM0NFYyODBIMTM2Yy0xMy4zIDAtMjQtMTAuNy0yNC0yNHMxMC43LTI0IDI0LTI0aDY0VjE2OGMwLTEzLjMgMTAuNy0yNCAyNC0yNHMyNCAxMC43IDI0IDI0djY0aDY0YzEzLjMgMCAyNCAxMC43IDI0IDI0cy0xMC43IDI0LTI0IDI0SDI0OHY2NGMwIDEzLjMtMTAuNyAyNC0yNCAyNHMtMjQtMTAuNy0yNC0yNHpcIj5cbiAgICAgICAgICA8L3BhdGg+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICBgO1xuXG4gIGNvbnN0IHByb2R1Y3RHcm91cEVkaXRTZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50ID0gcHJvZHVjdEdyb3VwRWRpdEl0ZW0ucXVlcnlTZWxlY3RvcignLnByb2R1Y3QtZ3JvdXAtZWRpdC1pdGVtJyk7XG4gIGNvbnN0IGF2YWlsYWJsZU1hc3Rlckdyb3VwcyA9IE9iamVjdC5rZXlzKHByb2R1Y3RQYXJhbS5tc3RyX3Byb2RfZ3Jwc19wcm9kX2dycHNfbmFtZXMpO1xuICBjb25zdCBwcm9kdWN0TWFzdGVyR3JvdXBFZGl0U2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudCA9IHByb2R1Y3RHcm91cEVkaXRJdGVtLnF1ZXJ5U2VsZWN0b3IoXG4gICAgYCNwcm9kdWN0LW1hc3Rlci1ncm91cC1lZGl0LWl0ZW0tJHtpbmRleH1gXG4gICk7XG4gIGF2YWlsYWJsZU1hc3Rlckdyb3Vwcy5mb3JFYWNoKChtYXN0ZXJHcm91cCkgPT4ge1xuICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgbWFzdGVyR3JvdXApO1xuICAgIG9wdGlvbi5pbm5lckhUTUwgPSBtYXN0ZXJHcm91cDtcbiAgICBwcm9kdWN0TWFzdGVyR3JvdXBFZGl0U2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gIH0pO1xuICBpZiAobWFzdGVyR3JvdXApIHtcbiAgICBwcm9kdWN0TWFzdGVyR3JvdXBFZGl0U2VsZWN0LnZhbHVlID0gbWFzdGVyR3JvdXA7XG4gICAgcHJvZHVjdFBhcmFtLm1zdHJfcHJvZF9ncnBzX3Byb2RfZ3Jwc19uYW1lc1ttYXN0ZXJHcm91cF0uZm9yRWFjaChcbiAgICAgIChncm91cDogeyBncm91cF9uYW1lOiBzdHJpbmc7IGdyb3VwX2lkOiBudW1iZXIgfSkgPT4ge1xuICAgICAgICBjb25zdCBwcm9kdWN0R3JvdXBTZWxlY3RPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgcHJvZHVjdEdyb3VwU2VsZWN0T3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBncm91cC5ncm91cF9pZC50b1N0cmluZygpKTtcbiAgICAgICAgcHJvZHVjdEdyb3VwU2VsZWN0T3B0aW9uLnRleHRDb250ZW50ID0gZ3JvdXAuZ3JvdXBfbmFtZTtcbiAgICAgICAgcHJvZHVjdEdyb3VwRWRpdFNlbGVjdC5hcHBlbmRDaGlsZChwcm9kdWN0R3JvdXBTZWxlY3RPcHRpb24pO1xuICAgICAgfVxuICAgICk7XG4gICAgLy8gVE9ETzogYWx3YXlzIHNlbGVjdCBmaXJzdCBvcHRpb25cbiAgICBpZiAoIWl0ZW1JbmRleCkge1xuICAgICAgaXRlbUluZGV4ID0gMDtcbiAgICB9XG4gICAgcHJvZHVjdEdyb3VwRWRpdFNlbGVjdC52YWx1ZSA9XG4gICAgICBwcm9kdWN0UGFyYW0ubXN0cl9ncnBzX2dycHNfbmFtZXNfaW5fcHJvZFttYXN0ZXJHcm91cF1baXRlbUluZGV4XS5ncm91cF9pZC50b1N0cmluZygpO1xuICB9XG5cbiAgY29uc3Qgb3B0aW9ucyA9IHByb2R1Y3RNYXN0ZXJHcm91cEVkaXRTZWxlY3QucXVlcnlTZWxlY3RvckFsbCgnb3B0aW9uJyk7XG4gIHByb2R1Y3RNYXN0ZXJHcm91cEVkaXRTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgIG9wdGlvbnMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgaWYgKGUudGV4dENvbnRlbnQgPT09IHByb2R1Y3RNYXN0ZXJHcm91cEVkaXRTZWxlY3Qub3B0aW9uc1twcm9kdWN0TWFzdGVyR3JvdXBFZGl0U2VsZWN0LnNlbGVjdGVkSW5kZXhdLnRleHQpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uQ2F0ZWdvcnkgPVxuICAgICAgICAgIHByb2R1Y3RQYXJhbS5tc3RyX3Byb2RfZ3Jwc19wcm9kX2dycHNfbmFtZXNbXG4gICAgICAgICAgICBwcm9kdWN0TWFzdGVyR3JvdXBFZGl0U2VsZWN0Lm9wdGlvbnNbcHJvZHVjdE1hc3Rlckdyb3VwRWRpdFNlbGVjdC5zZWxlY3RlZEluZGV4XS50ZXh0XG4gICAgICAgICAgXTtcblxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcHJvZHVjdC1ncm91cC1lZGl0LWl0ZW0tJHtpbmRleH1gKS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgaWYgKG9wdGlvbkNhdGVnb3J5KSB7XG4gICAgICAgICAgb3B0aW9uQ2F0ZWdvcnkuZm9yRWFjaCgoZ3JvdXA6IHsgZ3JvdXBfbmFtZTogc3RyaW5nOyBncm91cF9pZDogbnVtYmVyIH0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN0b3JlU2VsZWN0T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgICAgICBzdG9yZVNlbGVjdE9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgZ3JvdXAuZ3JvdXBfaWQudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICBzdG9yZVNlbGVjdE9wdGlvbi50ZXh0Q29udGVudCA9IGdyb3VwLmdyb3VwX25hbWU7XG4gICAgICAgICAgICBwcm9kdWN0R3JvdXBFZGl0U2VsZWN0LmFwcGVuZENoaWxkKHN0b3JlU2VsZWN0T3B0aW9uKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcHJvZHVjdEdyb3VwRWRpdENvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9kdWN0R3JvdXBFZGl0SXRlbSk7XG5cbiAgY29uc3QgYWRkQnV0dG9uID0gcHJvZHVjdEdyb3VwRWRpdEl0ZW0ucXVlcnlTZWxlY3RvcihgI3Byb2R1Y3QtZ3JvdXAtZWRpdC1hZGQtaXRlbS1idG4tJHtpbmRleH1gKTtcblxuICBhZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY3JlYXRlUHJvZHVjdEdyb3VwRWRpdEl0ZW0oKTtcbiAgfSk7XG5cbiAgY29uc3QgZGVsZXRlQnV0dG9uID0gcHJvZHVjdEdyb3VwRWRpdEl0ZW0ucXVlcnlTZWxlY3RvcignLnByb2R1Y3QtZ3JvdXAtZWRpdC1kZWxldGUtaXRlbS1idG4nKTtcbiAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IGluYm91bmRPcmRlckl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuZGVsZXRlLWlkLSR7aW5kZXh9YCk7XG4gICAgaWYgKGluYm91bmRPcmRlckl0ZW0pIHtcbiAgICAgIGluYm91bmRPcmRlckl0ZW0ucmVtb3ZlKCk7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gdGhpcyBidXR0b24gbmVlZCB0byBhZGQgZmlyc3QgaXRlbSBmcm9tIHRlbXBsYXRlXG5jb25zdCBwcm9kdWN0R3JvdXBFZGl0QnRuQnlJZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWdyb3VwLWVkaXQtYWRkLWl0ZW0tYnRuJyk7XG5wcm9kdWN0R3JvdXBFZGl0QnRuQnlJZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgY3JlYXRlUHJvZHVjdEdyb3VwRWRpdEl0ZW0oKTtcbn0pO1xuXG4vLyAtLS0tc2V0IHByb2R1Y3QgdG8gSlNPTiBoaWRkZW4gaW5wdXQgaW4gaW5ib3VuZC1vcmRlci1lZGl0LWZvcm0tLS0tXG5mdW5jdGlvbiBzZXRQcm9kdWN0cyh0eXBlTW9kYWw6IHN0cmluZykge1xuICBjb25zdCBwcm9kdWN0R3JvdXBJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5wcm9kdWN0LWdyb3VwLSR7dHlwZU1vZGFsfS1hZGQtaXRlbWApO1xuXG4gIGNvbnN0IHByb2R1Y3RzID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9kdWN0R3JvdXBJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHByb2R1Y3RHcm91cEl0ZW06IEhUTUxTZWxlY3RFbGVtZW50ID0gcHJvZHVjdEdyb3VwSXRlbXNbaV0ucXVlcnlTZWxlY3RvcihgLnByb2R1Y3QtZ3JvdXAtJHt0eXBlTW9kYWx9LWl0ZW1gKTtcblxuICAgIGNvbnN0IHByb2R1Y3QgPSBOdW1iZXIocHJvZHVjdEdyb3VwSXRlbS52YWx1ZSk7XG4gICAgcHJvZHVjdHMucHVzaChwcm9kdWN0KTtcbiAgfVxuXG4gIGNvbnN0IGlucHV0UHJvZHVjdHM6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcHJvZHVjdC0ke3R5cGVNb2RhbH0tcHJvZHVjdC1ncm91cHNgKTtcbiAgaW5wdXRQcm9kdWN0cy52YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHByb2R1Y3RzKTtcblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8gLS0tLXN1Ym1pdCBlZGl0IGZvcm0gdGhyb3VnaCBoaWRkZW4gc3VibWl0IGJ1dHRvbi0tLS1cbmNvbnN0IHByb2R1Y3RFZGl0U3VibWl0QnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWVkaXQtc3VibWl0LWJ0bicpO1xuY29uc3QgcHJvZHVjdEVkaXRTYXZlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC1zYXZlLXByb2R1Y3RzLWJ0bicpO1xuXG5wcm9kdWN0RWRpdFNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IHNldFByb2R1Y3RzKCdlZGl0Jyk7XG4gIGlmIChyZXN1bHQpIHtcbiAgICBwcm9kdWN0RWRpdFN1Ym1pdEJ1dHRvbi5jbGljaygpO1xuICB9XG59KTtcblxuLy8gLS0tLWFkZCBwcm9kdWN0IGdyb3VwIGl0ZW0gZm9yIGVkaXQgbW9kYWwtLS0tXG5mdW5jdGlvbiBjcmVhdGVQcm9kdWN0R3JvdXBBZGRJdGVtKGdyb3VwczogSVByb2R1Y3RNYXN0ZXJHcm91cEdyb3VwID0gbnVsbCkge1xuICBpZiAoIWdyb3Vwcykge1xuICAgIGdyb3VwcyA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnZ3JvdXBzJykpO1xuICB9XG4gIGNvbnN0IHByb2R1Y3RHcm91cEFkZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWdyb3VwLWFkZC1hZGQtY29udGFpbmVyJyk7XG4gIGNvbnN0IHByb2R1Y3RHcm91cEVkaXRPcmlnaW5hbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWdyb3VwLWFkZC1pdGVtJyk7XG4gIGNvbnN0IHByb2R1Y3RHcm91cEFkZEFsbEl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3QtZ3JvdXAtYWRkLWFkZC1pdGVtJyk7XG4gIGNvbnN0IGluZGV4ID0gcHJvZHVjdEdyb3VwQWRkQWxsSXRlbXMubGVuZ3RoICsgMTtcbiAgY29uc3QgcHJvZHVjdEdyb3VwQWRkSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gIHByb2R1Y3RHcm91cEFkZEl0ZW0uY2xhc3NMaXN0LmFkZCgncC02JywgJ3NwYWNlLXktNicsICdib3JkZXItdCcsICdwcm9kdWN0LWdyb3VwLWFkZC1hZGQtaXRlbScsIGBkZWxldGUtaWQtJHtpbmRleH1gKTtcbiAgcHJvZHVjdEdyb3VwQWRkSXRlbS5pbm5lckhUTUwgPSBgXG4gIDxkaXYgY2xhc3M9XCJncmlkIGdyaWQtY29scy0xMiBnYXAtNVwiPlxuICAgIDxkaXYgY2xhc3M9XCJjb2wtc3Bhbi02IHNtOmNvbC1zcGFuLTRcIj5cbiAgICAgIDxsYWJlbCBmb3I9XCJzdGF0dXNcIiBjbGFzcz1cImJsb2NrIG1iLTIgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktOTAwIGRhcms6dGV4dC13aGl0ZVwiPk1hc3RlclxuICAgICAgICBHcm91cDwvbGFiZWw+XG4gICAgICA8c2VsZWN0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImFkZF9wcm9kdWN0XCIgaWQ9XCJwcm9kdWN0LW1hc3Rlci1ncm91cC1hZGQtaXRlbS0ke2luZGV4fVwiXG4gICAgICAgIGNsYXNzPVwicHJvZHVjdC1tYXN0ZXItZ3JvdXAtYWRkLWl0ZW0gc2hhZG93LXNtIGJnLWdyYXktNTAgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCB0ZXh0LWdyYXktOTAwIHRleHQtc20gcm91bmRlZC1sZyBmb2N1czpyaW5nLWJsdWUtNjAwIGZvY3VzOmJvcmRlci1ibHVlLTYwMCBibG9jayB3LWZ1bGwgcC0yLjUgZGFyazpiZy1ncmF5LTYwMCBkYXJrOmJvcmRlci1ncmF5LTUwMCBkYXJrOnBsYWNlaG9sZGVyLWdyYXktNDAwIGRhcms6dGV4dC13aGl0ZSBkYXJrOmZvY3VzOnJpbmctYmx1ZS01MDAgZGFyazpmb2N1czpib3JkZXItYmx1ZS01MDBcIlxuICAgICAgICBwbGFjZWhvbGRlcj1cIk1hc3RlclxuICAgICAgICBHcm91cFwiIHJlcXVpcmVkPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCIgZGlzYWJsZWQgc2VsZWN0ZWQ+U2VsZWN0IG1hc3RlciBncm91cDwvb3B0aW9uPlxuICAgICAgPC9zZWxlY3Q+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbC1zcGFuLTYgc206Y29sLXNwYW4tNFwiPlxuICAgICAgPGxhYmVsIGZvcj1cInN0YXR1c1wiIGNsYXNzPVwiYmxvY2sgbWItMiB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDAgZGFyazp0ZXh0LXdoaXRlXCI+R3JvdXA8L2xhYmVsPlxuICAgICAgPHNlbGVjdCB0eXBlPVwidGV4dFwiIG5hbWU9XCJhZGRfZ3JvdXBcIiBpZD1cInByb2R1Y3QtZ3JvdXAtYWRkLWl0ZW0tJHtpbmRleH1cIlxuICAgICAgICBjbGFzcz1cInByb2R1Y3QtZ3JvdXAtYWRkLWl0ZW0gc2hhZG93LXNtIGJnLWdyYXktNTAgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCB0ZXh0LWdyYXktOTAwIHRleHQtc20gcm91bmRlZC1sZyBmb2N1czpyaW5nLWJsdWUtNjAwIGZvY3VzOmJvcmRlci1ibHVlLTYwMCBibG9jayB3LWZ1bGwgcC0yLjUgZGFyazpiZy1ncmF5LTYwMCBkYXJrOmJvcmRlci1ncmF5LTUwMCBkYXJrOnBsYWNlaG9sZGVyLWdyYXktNDAwIGRhcms6dGV4dC13aGl0ZSBkYXJrOmZvY3VzOnJpbmctYmx1ZS01MDAgZGFyazpmb2N1czpib3JkZXItYmx1ZS01MDBcIlxuICAgICAgICBwbGFjZWhvbGRlcj1cIkdyb3VwXCIgcmVxdWlyZWQ+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIiBkaXNhYmxlZCBzZWxlY3RlZD5TZWxlY3QgZ3JvdXA8L29wdGlvbj5cbiAgICAgIDwvc2VsZWN0PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjb2wtc3Bhbi02IHNtOmNvbC1zcGFuLTRcIj5cbiAgICAgIDxsYWJlbCBmb3I9XCJzdGF0dXNcIiBjbGFzcz1cImJsb2NrIG1iLTIgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktOTAwIGRhcms6dGV4dC13aGl0ZVwiPkFjdGlvbjwvbGFiZWw+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkYXRhLXRhcmdldD1cIlwiXG4gICAgICAgIGNsYXNzPVwicHJvZHVjdC1ncm91cC1hZGQtZGVsZXRlLWl0ZW0tYnRuIGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBweC0zIHB5LTIgbXItMyB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtY2VudGVyIHRleHQtd2hpdGUgcm91bmRlZC1sZyBiZy1yZWQtNjAwIGhvdmVyOmJnLXJlZC04MDAgZm9jdXM6cmluZy00IGZvY3VzOnJpbmctcmVkLTMwMCBkYXJrOmZvY3VzOnJpbmctcmVkLTkwMFwiPlxuICAgICAgICA8c3ZnIGNsYXNzPVwidy02IGgtNlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiB2aWV3Qm94PVwiMCAwIDQ0OCA1MTJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgIGQ9XCJNMTM1LjIgMTcuN0MxNDAuNiA2LjggMTUxLjcgMCAxNjMuOCAwSDI4NC4yYzEyLjEgMCAyMy4yIDYuOCAyOC42IDE3LjdMMzIwIDMyaDk2YzE3LjcgMCAzMiAxNC4zIDMyIDMycy0xNC4zIDMyLTMyIDMySDMyQzE0LjMgOTYgMCA4MS43IDAgNjRTMTQuMyAzMiAzMiAzMmg5Nmw3LjItMTQuM3pNMzIgMTI4SDQxNlY0NDhjMCAzNS4zLTI4LjcgNjQtNjQgNjRIOTZjLTM1LjMgMC02NC0yOC43LTY0LTY0VjEyOHptOTYgNjRjLTguOCAwLTE2IDcuMi0xNiAxNlY0MzJjMCA4LjggNy4yIDE2IDE2IDE2czE2LTcuMiAxNi0xNlYyMDhjMC04LjgtNy4yLTE2LTE2LTE2em05NiAwYy04LjggMC0xNiA3LjItMTYgMTZWNDMyYzAgOC44IDcuMiAxNiAxNiAxNnMxNi03LjIgMTYtMTZWMjA4YzAtOC44LTcuMi0xNi0xNi0xNnptOTYgMGMtOC44IDAtMTYgNy4yLTE2IDE2VjQzMmMwIDguOCA3LjIgMTYgMTYgMTZzMTYtNy4yIDE2LTE2VjIwOGMwLTguOC03LjItMTYtMTYtMTZ6XCI+XG4gICAgICAgICAgPC9wYXRoPlxuICAgICAgICA8L3N2Zz5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgaWQ9XCJwcm9kdWN0LWdyb3VwLWFkZC1hZGQtaXRlbS1idG4tJHtpbmRleH1cIlxuICAgICAgICBjbGFzcz1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBweC0zIHB5LTIgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWNlbnRlciB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgYmcteWVsbG93LTQwMCBob3ZlcjpiZy15ZWxsb3ctNTAwIGZvY3VzOnJpbmctNCBmb2N1czpyaW5nLXJlZC0zMDBcIj5cbiAgICAgICAgPHN2ZyBjbGFzcz1cInctNiBoLTZcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCA0NDggNTEyXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICBkPVwiTTY0IDgwYy04LjggMC0xNiA3LjItMTYgMTZWNDE2YzAgOC44IDcuMiAxNiAxNiAxNkgzODRjOC44IDAgMTYtNy4yIDE2LTE2Vjk2YzAtOC44LTcuMi0xNi0xNi0xNkg2NHpNMCA5NkMwIDYwLjcgMjguNyAzMiA2NCAzMkgzODRjMzUuMyAwIDY0IDI4LjcgNjQgNjRWNDE2YzAgMzUuMy0yOC43IDY0LTY0IDY0SDY0Yy0zNS4zIDAtNjQtMjguNy02NC02NFY5NnpNMjAwIDM0NFYyODBIMTM2Yy0xMy4zIDAtMjQtMTAuNy0yNC0yNHMxMC43LTI0IDI0LTI0aDY0VjE2OGMwLTEzLjMgMTAuNy0yNCAyNC0yNHMyNCAxMC43IDI0IDI0djY0aDY0YzEzLjMgMCAyNCAxMC43IDI0IDI0cy0xMC43IDI0LTI0IDI0SDI0OHY2NGMwIDEzLjMtMTAuNyAyNC0yNCAyNHMtMjQtMTAuNy0yNC0yNHpcIj5cbiAgICAgICAgICA8L3BhdGg+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICBgO1xuXG4gIGNvbnN0IHByb2R1Y3RNYXN0ZXJHcm91cEFkZFNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQgPSBwcm9kdWN0R3JvdXBBZGRJdGVtLnF1ZXJ5U2VsZWN0b3IoXG4gICAgYCNwcm9kdWN0LW1hc3Rlci1ncm91cC1hZGQtaXRlbS0ke2luZGV4fWBcbiAgKTtcbiAgY29uc3QgcHJvZHVjdEdyb3VwQWRkU2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudCA9IHByb2R1Y3RHcm91cEFkZEl0ZW0ucXVlcnlTZWxlY3RvcignLnByb2R1Y3QtZ3JvdXAtYWRkLWl0ZW0nKTtcbiAgY29uc3QgYXZhaWxhYmxlTWFzdGVyR3JvdXBzID0gT2JqZWN0LmtleXMoZ3JvdXBzKTtcblxuICBhdmFpbGFibGVNYXN0ZXJHcm91cHMuZm9yRWFjaCgobWFzdGVyR3JvdXApID0+IHtcbiAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICBvcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsIG1hc3Rlckdyb3VwKTtcbiAgICBvcHRpb24uaW5uZXJIVE1MID0gbWFzdGVyR3JvdXA7XG4gICAgcHJvZHVjdE1hc3Rlckdyb3VwQWRkU2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gIH0pO1xuICBjb25zdCBvcHRpb25zID0gcHJvZHVjdE1hc3Rlckdyb3VwQWRkU2VsZWN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ29wdGlvbicpO1xuXG4gIHByb2R1Y3RNYXN0ZXJHcm91cEFkZFNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgb3B0aW9ucy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICBpZiAoZS50ZXh0Q29udGVudCA9PT0gcHJvZHVjdE1hc3Rlckdyb3VwQWRkU2VsZWN0Lm9wdGlvbnNbcHJvZHVjdE1hc3Rlckdyb3VwQWRkU2VsZWN0LnNlbGVjdGVkSW5kZXhdLnRleHQpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uQ2F0ZWdvcnkgPVxuICAgICAgICAgIGdyb3Vwc1twcm9kdWN0TWFzdGVyR3JvdXBBZGRTZWxlY3Qub3B0aW9uc1twcm9kdWN0TWFzdGVyR3JvdXBBZGRTZWxlY3Quc2VsZWN0ZWRJbmRleF0udGV4dF07XG5cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHByb2R1Y3QtZ3JvdXAtYWRkLWl0ZW0tJHtpbmRleH1gKS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgaWYgKG9wdGlvbkNhdGVnb3J5KSB7XG4gICAgICAgICAgb3B0aW9uQ2F0ZWdvcnkuZm9yRWFjaCgoZ3JvdXA6IHsgZ3JvdXBfbmFtZTogc3RyaW5nOyBncm91cF9pZDogbnVtYmVyIH0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN0b3JlU2VsZWN0T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgICAgICBzdG9yZVNlbGVjdE9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgZ3JvdXAuZ3JvdXBfaWQudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICBzdG9yZVNlbGVjdE9wdGlvbi50ZXh0Q29udGVudCA9IGdyb3VwLmdyb3VwX25hbWU7XG4gICAgICAgICAgICBwcm9kdWN0R3JvdXBBZGRTZWxlY3QuYXBwZW5kQ2hpbGQoc3RvcmVTZWxlY3RPcHRpb24pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIHByb2R1Y3RHcm91cEFkZENvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9kdWN0R3JvdXBBZGRJdGVtKTtcblxuICBjb25zdCBhZGRCdXR0b24gPSBwcm9kdWN0R3JvdXBBZGRJdGVtLnF1ZXJ5U2VsZWN0b3IoYCNwcm9kdWN0LWdyb3VwLWFkZC1hZGQtaXRlbS1idG4tJHtpbmRleH1gKTtcblxuICBhZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY3JlYXRlUHJvZHVjdEdyb3VwQWRkSXRlbSgpO1xuICB9KTtcblxuICBjb25zdCBkZWxldGVCdXR0b24gPSBwcm9kdWN0R3JvdXBBZGRJdGVtLnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0LWdyb3VwLWFkZC1kZWxldGUtaXRlbS1idG4nKTtcbiAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IGluYm91bmRPcmRlckl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuZGVsZXRlLWlkLSR7aW5kZXh9YCk7XG4gICAgaWYgKGluYm91bmRPcmRlckl0ZW0pIHtcbiAgICAgIGluYm91bmRPcmRlckl0ZW0ucmVtb3ZlKCk7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gdGhpcyBidXR0b24gbmVlZCB0byBhZGQgZmlyc3QgaXRlbSBmcm9tIHRlbXBsYXRlXG5jb25zdCBwcm9kdWN0R3JvdXBBZGRCdG5CeUlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZ3JvdXAtYWRkLWFkZC1pdGVtLWJ0bicpO1xucHJvZHVjdEdyb3VwQWRkQnRuQnlJZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgY3JlYXRlUHJvZHVjdEdyb3VwQWRkSXRlbSgpO1xufSk7XG5cbi8vIC0tLS1zdWJtaXQgYWRkIGZvcm0gdGhyb3VnaCBoaWRkZW4gc3VibWl0IGJ1dHRvbi0tLS1cbmNvbnN0IHByb2R1Y3RBZGRTdWJtaXRCdXR0b246IEhUTUxCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtYWRkLXN1Ym1pdC1idG4nKTtcbmNvbnN0IHByb2R1Y3RBZGRTYXZlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtYWRkLXNhdmUtcHJvZHVjdHMtYnRuJyk7XG5cbnByb2R1Y3RBZGRTYXZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBjb25zdCByZXN1bHQgPSBzZXRQcm9kdWN0cygnYWRkJyk7XG4gIGlmIChyZXN1bHQpIHtcbiAgICBwcm9kdWN0QWRkU3VibWl0QnV0dG9uLmNsaWNrKCk7XG4gIH1cbn0pO1xuXG4vLyAtLS0tY2xlYXIgcHJvZHVjdCBncm91cCBjb250YWluZXItLS0tXG5mdW5jdGlvbiBjbGVhclByb2R1Y3RHcm91cENvbnRhaW5lcigpIHtcbiAgY29uc3QgcHJvZHVjdEdyb3VwRWRpdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWdyb3VwLWVkaXQtYWRkLWNvbnRhaW5lcicpO1xuICBjb25zdCBwcm9kdWN0R3JvdXBFZGl0SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdC1ncm91cC1lZGl0LWFkZC1pdGVtJyk7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgcHJvZHVjdEdyb3VwRWRpdEl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgcHJvZHVjdEdyb3VwRWRpdENvbnRhaW5lci5yZW1vdmVDaGlsZChwcm9kdWN0R3JvdXBFZGl0SXRlbXNbaV0pO1xuICB9XG4gIGNvbnN0IHByb2R1Y3RHcm91cEVkaXRTZWxlY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3QtZ3JvdXAtZWRpdC1hZGQtaXRlbScpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRTb3J0T3duQnlNZShjaGVja2JveDogSFRNTElucHV0RWxlbWVudCwgc29ydFJvdXRlOiBzdHJpbmcpIHtcbiAgaWYgKGNoZWNrYm94LmNoZWNrZWQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL3Byb2R1Y3QvJHtzb3J0Um91dGV9YCwge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcmVzcG9uc2UudXJsO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvcHJvZHVjdC9gLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZXNwb25zZS51cmw7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gLS0tLXByb2R1Y3Qgc2hvdyBzdG9ja3Mgb3duIGJ5IG1lLS0tLVxuY29uc3Qgc2hvd1Byb2R1Y3RCeVVzZXJHcm91cENoZWNrYm94OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtc2hvdy1zdG9ja3Mtb3duLWJ5LW1lLWJ0bicpO1xuaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIHdpbmRvdy5sb2NhdGlvbi5oYXNoID09PSAnL3Byb2R1Y3Qvc3RvY2tzX293bmVkX2J5X21lJykge1xuICB3aW5kb3cub25sb2FkID0gKGV2ZW50KSA9PiB7XG4gICAgc2hvd1Byb2R1Y3RCeVVzZXJHcm91cENoZWNrYm94LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICdjaGVja2VkJyk7XG4gIH07XG59XG5zaG93UHJvZHVjdEJ5VXNlckdyb3VwQ2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgYXN5bmMgKCkgPT4ge1xuICBnZXRTb3J0T3duQnlNZShzaG93UHJvZHVjdEJ5VXNlckdyb3VwQ2hlY2tib3gsICdzdG9ja3Nfb3duZWRfYnlfbWUnKTtcbn0pO1xuXG4vLyAtLS0tcHJvZHVjdCBldmVudHMgc2hvdyBzdG9ja3Mgb3duIGJ5IG1lLS0tLVxuY29uc3Qgc2hvd0V2ZW50c1Byb2R1Y3RCeVVzZXJHcm91cENoZWNrYm94OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgJyNwcm9kdWN0LXNob3ctZXZlbnRzLXN0b2Nrcy1vd24tYnktbWUtYnRuJ1xuKTtcbmlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uaGFzaCA9PT0gJy9wcm9kdWN0L2V2ZW50c19zdG9ja3Nfb3duZWRfYnlfbWUnKSB7XG4gIHdpbmRvdy5vbmxvYWQgPSAoZXZlbnQpID0+IHtcbiAgICBzaG93RXZlbnRzUHJvZHVjdEJ5VXNlckdyb3VwQ2hlY2tib3guc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ2NoZWNrZWQnKTtcbiAgfTtcbn1cbnNob3dFdmVudHNQcm9kdWN0QnlVc2VyR3JvdXBDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBhc3luYyAoKSA9PiB7XG4gIGdldFNvcnRPd25CeU1lKHNob3dFdmVudHNQcm9kdWN0QnlVc2VyR3JvdXBDaGVja2JveCwgJ2V2ZW50c19zdG9ja3Nfb3duZWRfYnlfbWUnKTtcbn0pO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1hc3NpZ24tbWFzdGVyLWdyb3VwJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICBjb25zdCBwcm9kdWN0QXNzaWduTWFzdGVyR3JvdXBTZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtYXNzaWduLW1hc3Rlci1ncm91cCcpO1xuICBjb25zdCBwcm9kdWN0QXNzaWduR3JvdXBTZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtYXNzaWduLWdyb3VwJyk7XG4gIGNvbnN0IGdyb3VwczogSU1hc3Rlckdyb3VwID0gSlNPTi5wYXJzZShcbiAgICBwcm9kdWN0QXNzaWduTWFzdGVyR3JvdXBTZWxlY3RbcHJvZHVjdEFzc2lnbk1hc3Rlckdyb3VwU2VsZWN0LnNlbGVjdGVkSW5kZXhdLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKVxuICApO1xuICBjb25zdCBhdmFpbGFibGVNYXN0ZXJHcm91cHMgPSBPYmplY3Qua2V5cyhncm91cHMubWFzdGVyX2dyb3Vwc19saXN0X2dyb3Vwcyk7XG5cbiAgcHJvZHVjdEFzc2lnbkdyb3VwU2VsZWN0LmlubmVySFRNTCA9ICcnO1xuXG4gIGF2YWlsYWJsZU1hc3Rlckdyb3Vwcy5mb3JFYWNoKChtYXN0ZXJHcm91cCkgPT4ge1xuICAgIGlmIChtYXN0ZXJHcm91cCA9PT0gcHJvZHVjdEFzc2lnbk1hc3Rlckdyb3VwU2VsZWN0Lm9wdGlvbnNbcHJvZHVjdEFzc2lnbk1hc3Rlckdyb3VwU2VsZWN0LnNlbGVjdGVkSW5kZXhdLnRleHQpIHtcbiAgICAgIGNvbnN0IG9wdGlvbkNhdGVnb3J5ID0gZ3JvdXBzLm1hc3Rlcl9ncm91cHNfbGlzdF9ncm91cHNbbWFzdGVyR3JvdXBdO1xuXG4gICAgICBpZiAob3B0aW9uQ2F0ZWdvcnkpIHtcbiAgICAgICAgb3B0aW9uQ2F0ZWdvcnkuZm9yRWFjaCgoZ3JvdXA6IHsgZ3JvdXBfbmFtZTogc3RyaW5nOyBncm91cF9pZDogbnVtYmVyIH0pID0+IHtcbiAgICAgICAgICBjb25zdCBzdG9yZVNlbGVjdE9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICAgIHN0b3JlU2VsZWN0T3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBncm91cC5ncm91cF9pZC50b1N0cmluZygpKTtcbiAgICAgICAgICBzdG9yZVNlbGVjdE9wdGlvbi50ZXh0Q29udGVudCA9IGdyb3VwLmdyb3VwX25hbWU7XG4gICAgICAgICAgcHJvZHVjdEFzc2lnbkdyb3VwU2VsZWN0LmFwcGVuZENoaWxkKHN0b3JlU2VsZWN0T3B0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn0pO1xuXG4vLyAtLS1pbWFnZSBjb21wcmVzc29yLS0tLVxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2R1Y3QtYWRkLWltYWdlJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgYXN5bmMgKGUpID0+IHtcbiAgY29uc3QgZGVzaXJlZEltYWdlU2l6ZSA9IDMwMCAqIDEwMjQ7XG4gIGNvbnN0IGxvd0ltYWdlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KCcjcHJvZHVjdC1hZGQtbG93LWltYWdlJyk7XG4gIGNvbnN0IGluaXRpYWxJbWFnZSA9IChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS5maWxlc1swXTtcblxuICBpZiAoaW5pdGlhbEltYWdlLnNpemUgPiBkZXNpcmVkSW1hZ2VTaXplKSB7XG4gICAgY29uc3QgY29tcHJlc3NlZEltYWdlID0gYXdhaXQgY29tcHJlc3NJbWFnZShpbml0aWFsSW1hZ2UpO1xuICAgIGNvbnN0IGNvbXByZXNzZWRJbWFnZUZpbGUgPSBuZXcgRmlsZShbY29tcHJlc3NlZEltYWdlXSwgYGxvd18ke2luaXRpYWxJbWFnZS5uYW1lfWAsIHtcbiAgICAgIHR5cGU6IGluaXRpYWxJbWFnZS50eXBlLFxuICAgIH0pO1xuXG4gICAgbG93SW1hZ2VJbnB1dC5maWxlcyA9IHNldEZpbGVJbnB1dChjb21wcmVzc2VkSW1hZ2VGaWxlKTtcbiAgfSBlbHNlIHtcbiAgICBsb3dJbWFnZUlucHV0LmZpbGVzID0gc2V0RmlsZUlucHV0KGluaXRpYWxJbWFnZSk7XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBjb21wcmVzc0ltYWdlKGZpbGU6IEZpbGUpIHtcbiAgICBjb25zdCBtYXhGaWxlU2l6ZSA9IGRlc2lyZWRJbWFnZVNpemU7XG4gICAgbGV0IHF1YWxpdHkgPSAwLjY7XG5cbiAgICB3aGlsZSAocXVhbGl0eSA+IDApIHtcbiAgICAgIGNvbnN0IGNvbXByZXNzZWRGaWxlID0gYXdhaXQgY29tcHJlc3NRdWFsaXR5SW1hZ2UoZmlsZSwgcXVhbGl0eSk7XG4gICAgICBpZiAoKGNvbXByZXNzZWRGaWxlIGFzIEZpbGUpLnNpemUgPCBtYXhGaWxlU2l6ZSkge1xuICAgICAgICByZXR1cm4gY29tcHJlc3NlZEZpbGU7XG4gICAgICB9XG4gICAgICBxdWFsaXR5IC09IDAuMTtcbiAgICAgIGlmIChxdWFsaXR5IDwgMC4xKSB7XG4gICAgICAgIHJldHVybiBjb21wcmVzc2VkRmlsZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBjb21wcmVzc1F1YWxpdHlJbWFnZShmaWxlOiBGaWxlLCBxdWFsaXR5OiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8QmxvYj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltYWdlLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSk7XG4gICAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IDMwMDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IDMwMDtcblxuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgMCwgMCwgMzAwLCAzMDApO1xuXG4gICAgICAgIGNhbnZhcy50b0Jsb2IoXG4gICAgICAgICAgKGJsb2IpID0+IHtcbiAgICAgICAgICAgIGlmIChibG9iKSB7XG4gICAgICAgICAgICAgIHJlc29sdmUoYmxvYik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdGYWlsZWQgdG8gY29udmVydCcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGZpbGUudHlwZSxcbiAgICAgICAgICBxdWFsaXR5XG4gICAgICAgICk7XG4gICAgICB9O1xuXG4gICAgICBpbWFnZS5vbmVycm9yID0gKGVycikgPT4ge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRGaWxlSW5wdXQoZmlsZTogRmlsZSkge1xuICAgIGNvbnN0IGZpbGVMaXN0ID0gbmV3IERhdGFUcmFuc2ZlcigpO1xuICAgIGZpbGVMaXN0Lml0ZW1zLmFkZChmaWxlKTtcbiAgICByZXR1cm4gZmlsZUxpc3QuZmlsZXM7XG4gIH1cbn0pO1xuXG4vLyBwcm9kdWN0Qm9va2luZ0J1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PlxuLy8gICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbi8vICAgICAgICAgY29uc3QgcHJvZHVjdCA9IEpTT04ucGFyc2UoYnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKSlcbi8vICAgICAgICAgY29uc29sZS5sb2cocHJvZHVjdClcblxuLy8gICAgICAgICBsZXQgZGl2OiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWV2ZW50LW5hbWUnKVxuLy8gICAgICAgICBkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5uYW1lXG4vLyAgICAgICAgIGNvbnN0IGltZzogSFRNTEltYWdlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWV2ZW50LWltYWdlJylcbi8vICAgICAgICAgY29uc3QgZnVsbEltYWdlQW5jaG9yID0gaW1nLmNsb3Nlc3QoJy5wcm9kdWN0LWZ1bGwtaW1hZ2UtYW5jaG9yJylcbi8vICAgICAgICAgZnVsbEltYWdlQW5jaG9yLnNldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtcHJvZHVjdC1pZCcsIHByb2R1Y3QuaWQudG9TdHJpbmcoKSlcbi8vICAgICAgICAgcHJvZHVjdC5pbWFnZS5sZW5ndGggPiAxMDBcbi8vICAgICAgICAgICAgID8gKGltZy5zcmMgPSBgZGF0YTppbWFnZS9wbmc7YmFzZTY0LCAke3Byb2R1Y3QuaW1hZ2V9YClcbi8vICAgICAgICAgICAgIDogKGltZy5zcmMgPSBkZWZhdWx0QnJhbmRJbWFnZSlcbi8vICAgICAgICAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZXZlbnQtU0tVJylcbi8vICAgICAgICAgZGl2LmlubmVySFRNTCA9IHByb2R1Y3QuU0tVXG4vLyAgICAgICAgIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWV2ZW50LW5leHRfdXJsJylcbi8vICAgICAgICAgZGl2LmlubmVySFRNTCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmXG5cbi8vICAgICAgICAgY29uc3QgcHJvZHVjdElkSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ldmVudC1wcm9kdWN0LWlkJylcbi8vICAgICAgICAgcHJvZHVjdElkSW5wdXQudmFsdWUgPSBwcm9kdWN0LmlkLnRvU3RyaW5nKClcblxuLy8gICAgICAgICAvLyBkYXRlcGlja2VyXG4vLyAgICAgICAgIGNvbnN0IGV2ZW50RGF0ZXBpY2tlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdC1ldmVudC1kYXRlcGlja2VyJylcbi8vICAgICAgICAgY29uc3QgZGF0ZUN1cnJlbnQgPSBuZXcgRGF0ZSgpXG4vLyAgICAgICAgIGNvbnN0IGRhdGVFdmVudCA9IG5ldyBEYXRlKGRhdGVDdXJyZW50LmdldEZ1bGxZZWFyKCksIGRhdGVDdXJyZW50LmdldE1vbnRoKCksIGRhdGVDdXJyZW50LmdldERhdGUoKSArIDUpXG5cbi8vICAgICAgICAgY29uc3Qgb3B0aW9uID0ge1xuLy8gICAgICAgICAgICAgdG9kYXlIaWdobGlnaHQ6IHRydWUsXG4vLyAgICAgICAgICAgICBtaW5EYXRlOiBkYXRlRXZlbnQsXG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICBldmVudERhdGVwaWNrZXJzLmZvckVhY2goKGRhdGVwaWNrZXI6IEhUTUxEaXZFbGVtZW50LCBpbmRleCkgPT4ge1xuLy8gICAgICAgICAgICAgY29uc3QgZXZlbnREYXRlUGlja2VyID0gbmV3IERhdGVwaWNrZXIoZGF0ZXBpY2tlcilcbi8vICAgICAgICAgICAgIGV2ZW50RGF0ZVBpY2tlci5zZXRPcHRpb25zKG9wdGlvbilcbi8vICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuLy8gICAgICAgICAgICAgICAgIGV2ZW50RGF0ZVBpY2tlci5zZXREYXRlKGRhdGVFdmVudClcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSlcbi8vICAgICB9KVxuLy8gKVxuXG5mdW5jdGlvbiBnZXRGaWx0ZXJWYWx1ZXMoaXNDaGVja2VkOiBib29sZWFuKSB7XG4gIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICBjb25zdCBldmVudFNvcnRUb2dnbGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1zaG93LWV2ZW50cy10b2dnbGUtYnRuJyk7XG5cbiAgaXNDaGVja2VkID8gdXJsLnNlYXJjaFBhcmFtcy5zZXQoJ2V2ZW50cycsICd0cnVlJykgOiB1cmwuc2VhcmNoUGFyYW1zLmRlbGV0ZSgnZXZlbnRzJyk7XG4gIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYCR7dXJsLmhyZWZ9YDtcbn1cblxuY29uc3QgZXZlbnRTb3J0VG9nZ2xlQnV0dG9uOiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtc2hvdy1ldmVudHMtdG9nZ2xlLWJ0bicpO1xuZXZlbnRTb3J0VG9nZ2xlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgZ2V0RmlsdGVyVmFsdWVzKGV2ZW50U29ydFRvZ2dsZUJ1dHRvbi5jaGVja2VkKTtcbn0pO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9wcm9kdWN0LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9