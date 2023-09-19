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
var isEvent = eventCheckbox.checked;
var eventsWarehouse = 'Warehouse Events';
var eventMasterGroup = 'Events';
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
//function to display filter by master group on load page
var globalFilterMasterGroup = JSON.parse(sessionStorage.getItem('globalFilterMasterGroup'));
var productMgGGlobal = JSON.parse(sessionStorage.getItem('productMgG'));
if (globalFilterMasterGroup && globalFilterMasterGroup.length !== 0) {
    var filterProductMasterGroupCheckboxes = document.querySelectorAll('.products-filter-product-master-group-checkbox');
    filterProductMasterGroupCheckboxes.forEach(function (checkbox) {
        if (globalFilterMasterGroup.includes(checkbox.value)) {
            checkbox.checked = true;
        }
    });
    var _loop_1 = function (masterGroupName) {
        var referenceTh = document.querySelector('#product-table-th-product-type');
        var isGroupExist = document.querySelector("#product-table-filter-master-group-".concat(masterGroupName));
        if (!isGroupExist) {
            var productFilterTh = document.createElement('th');
            productFilterTh.setAttribute('id', "product-table-filter-master-group-".concat(masterGroupName));
            var productItemTrs = document.querySelectorAll('.table-product-item-tr');
            productFilterTh.classList.add('px-6', 'py-3', 'max-width-100');
            productFilterTh.setAttribute('scope', 'col');
            productFilterTh.innerHTML = masterGroupName.replace(/_/g, ' ');
            referenceTh.parentNode.insertBefore(productFilterTh, referenceTh.nextSibling);
            productItemTrs.forEach(function (productItem) {
                var referenceTd = productItem.cells[4];
                var productSKU = productItem.cells[3].innerText.replace("'", '');
                var productFilterName = productMgGGlobal[productSKU][masterGroupName] || '-';
                var productFilterTd = document.createElement('td');
                productFilterTd.setAttribute('id', "product-table-filter-".concat(masterGroupName, "-").concat(productFilterName.replace(/ /g, '_'), "-").concat(productSKU.replace(/ /g, '_')));
                productFilterTd.classList.add('text-base', 'font-normal', 'text-gray-900', 'whitespace-nowrap', 'dark:text-white');
                productFilterTd.innerHTML = "\n            <div class=\"pl-3\">\n              <div class=\"text-sm\">".concat(productFilterName, "</div>\n            </div>\n          ");
                referenceTd.parentNode.insertBefore(productFilterTd, referenceTd.nextSibling);
            });
        }
    };
    for (var _i = 0, globalFilterMasterGroup_1 = globalFilterMasterGroup; _i < globalFilterMasterGroup_1.length; _i++) {
        var masterGroupName = globalFilterMasterGroup_1[_i];
        _loop_1(masterGroupName);
    }
}
// function to display product master group in product table
var checkboxFilterProductMasterGroups = document.querySelectorAll('.products-filter-product-master-group-checkbox');
checkboxFilterProductMasterGroups.forEach(function (checkbox) {
    checkbox.addEventListener('change', function (e) {
        var masterGroupName = checkbox.getAttribute('data-target-group-name');
        var productMgG = JSON.parse(checkbox.getAttribute('data-target-product-mg-g'));
        var referenceTh = document.querySelector('#product-table-th-product-type');
        var productItemTrs = document.querySelectorAll('.table-product-item-tr');
        var isActive = e.target.checked;
        var globalFilterMasterGroup = JSON.parse(sessionStorage.getItem('globalFilterMasterGroup'));
        if (isActive) {
            var filterMasterGroup_1 = [];
            filterMasterGroup_1.push(masterGroupName);
            if (globalFilterMasterGroup) {
                globalFilterMasterGroup.forEach(function (element) {
                    if (!filterMasterGroup_1.includes(element)) {
                        filterMasterGroup_1.push(element);
                    }
                });
            }
            sessionStorage.setItem('globalFilterMasterGroup', JSON.stringify(filterMasterGroup_1));
            var isGroupExist = document.querySelector("#product-table-filter-master-group-".concat(masterGroupName));
            if (!isGroupExist) {
                var productFilterTh = document.createElement('th');
                productFilterTh.setAttribute('id', "product-table-filter-master-group-".concat(masterGroupName));
                productFilterTh.classList.add('px-6', 'py-3');
                productFilterTh.setAttribute('scope', 'col');
                productFilterTh.innerHTML = masterGroupName.replace(/_/g, ' ');
                referenceTh.parentNode.insertBefore(productFilterTh, referenceTh.nextSibling);
                productItemTrs.forEach(function (productItem) {
                    var referenceTd = productItem.cells[4];
                    var productSKU = productItem.cells[3].innerText;
                    var productFilterName = productMgG[productSKU][masterGroupName] || '-';
                    var productFilterTd = document.createElement('td');
                    productFilterTd.setAttribute('id', "product-table-filter-".concat(masterGroupName, "-").concat(productFilterName.replace(/ /g, '_'), "-").concat(productSKU.replace(/ /g, '_')));
                    productFilterTd.classList.add('text-base', 'font-normal', 'text-gray-900', 'whitespace-nowrap', 'dark:text-white');
                    productFilterTd.innerHTML = "\n            <div class=\"pl-3\">\n              <div class=\"text-sm\">".concat(productFilterName, "</div>\n            </div>\n          ");
                    referenceTd.parentNode.insertBefore(productFilterTd, referenceTd.nextSibling);
                });
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
                    var productSKU = productItem.cells[3].innerText;
                    var productFilterName = productMgG[productSKU][masterGroupName] || '-';
                    var isProductFilterExist = document.querySelector("#product-table-filter-".concat(masterGroupName, "-").concat(productFilterName.replace(/ /g, '_'), "-").concat(productSKU.replace(/ /g, '_')));
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
    messageParagraph.innerHTML = "You have no group! Please, define your group <a href='/user/' class='underlined'>here</a>";
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
function getEventAvailableQuantity(product_id, group, month, year) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/event/get_available_quantity?month_from=".concat(month + 1, "&year_from=").concat(year, "&group_name=").concat(group, "&product_id=").concat(product_id))];
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
        var _loop_2 = function (i) {
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
            _loop_2(i);
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
        product.numb_of_items_per_case ? (div.innerHTML = product.numb_of_items_per_case.toString()) : (div.innerHTML = '0');
        div = document.querySelector('#product-view-numb_of_cases_per_outer_case');
        product.numb_of_cases_per_outer_case
            ? (div.innerHTML = product.numb_of_cases_per_outer_case.toString())
            : (div.innerHTML = '0');
        div = document.querySelector('#product-view-comments');
        product.comments ? (div.innerHTML = product.comments.toString()) : (div.innerHTML = 'No comments');
        div = document.querySelector('#product-view-next_url');
        div.innerHTML = window.location.href;
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
function requestShare(product, group) {
    var img = document.querySelector('#product-request-share-image');
    var fullImageAnchor = img.closest('.product-full-image-anchor');
    fullImageAnchor.setAttribute('data-target-product-id', product.id.toString());
    product.image.length > 100 ? (img.src = "data:image/png;base64, ".concat(product.image)) : (img.src = defaultBrandImage);
    var div = document.querySelector('#product-request-share-name');
    div.innerHTML = product.name;
    div = document.querySelector('#product-request-share-sku');
    div.innerHTML = product.SKU;
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
    input = document.querySelector('#product-request-share-from-group');
    input.value = group.replace('_', ' ');
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
            var fetchedAmountByDate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getEventAvailableQuantity(product.id, group, currentDate.getMonth(), currentDate.getFullYear())];
                    case 1:
                        fetchedAmountByDate = (_a.sent());
                        picker = new bundle_1.easepick.create({
                            element: document.getElementById('datepicker'),
                            css: [
                                'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
                                'https://easepick.com/css/demo_prices.css',
                            ],
                            autoApply: true,
                            inline: true,
                            plugins: ['LockPlugin'],
                            LockPlugin: {
                                filter: function (date) {
                                    return date.inArray(bookedDates, '[)');
                                },
                            },
                            setup: function (picker) {
                                var _this = this;
                                var randomInt = function (min, max) {
                                    return Math.floor(Math.random() * (max - min + 1) + min);
                                };
                                var quantities = {};
                                fetchedAmountByDate.forEach(function (_a) {
                                    var date = _a.date, quantity = _a.quantity;
                                    quantities[date] = quantity.toString();
                                });
                                picker.on('view', function (evt) { return __awaiter(_this, void 0, void 0, function () {
                                    var _a, view, date, target, chosenMonth, chosenYear, fetchedAmountByDate;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                _a = evt.detail, view = _a.view, date = _a.date, target = _a.target;
                                                if (view.toLowerCase() !== 'main') {
                                                    return [2 /*return*/];
                                                }
                                                date.setMonth(date.getMonth() - 1);
                                                chosenMonth = date.getMonth();
                                                chosenYear = date.getFullYear();
                                                return [4 /*yield*/, getEventAvailableQuantity(product.id, group, chosenMonth, chosenYear)];
                                            case 1:
                                                fetchedAmountByDate = (_b.sent());
                                                fetchedAmountByDate.forEach(function (_a) {
                                                    var _b;
                                                    var date = _a.date, quantity = _a.quantity;
                                                    var splittedDate = date.split('-');
                                                    splittedDate[1] = (parseInt(splittedDate[1]) - 1).toString();
                                                    var jsDateString = splittedDate.join('-');
                                                    var jsDate = new Date(date);
                                                    jsDate.setHours(0, 0, 0);
                                                    var dayContainer = document.querySelector('.easepick-wrapper');
                                                    var dayContainerShadow = dayContainer.shadowRoot.querySelector("div[data-time='".concat(jsDate.getTime(), "']"));
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
                }
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
    var eventCheckbox = document.querySelector('#product-show-events-toggle-btn');
    var isEvent = eventCheckbox.checked && masterGroup === eventMasterGroup;
    var groupUnderScore = group.replace(/ /g, '_');
    var groupProductIds = productParam.groups_ids;
    var productTypeContainer = document.querySelector("#product-view-product-name-container");
    var shipAssignContainer = document.createElement('div');
    shipAssignContainer.classList.add('sm:col-span-3', 'flex', 'gap-4');
    shipAssignContainer.setAttribute('id', "product-ship-assign-share-container-".concat(masterGroup.replace(/ /g, '_')));
    var shipAssignContainerDiv = "\n    <div>\n      <label for=\"name\" class=\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\">Available</label>\n        <div id=\"ship-product-quantity\"\n          class=\"shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500\">\n      ".concat(productParam.available_quantity[group] || 0, "</div>\n    </div>\n    <div>\n      <label for=\"product_group\" class=\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\" >Action</label >\n      <button ship-group-data=").concat(groupUnderScore, " type=\"button\" id=\"ship-product-button-").concat(groupUnderScore, "\" class=\"ship-product-button inline-flex items-center mr-2 px-3 py-2.5 text-sm font-medium text-center text-white rounded-lg bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900\">\n        <svg class=\"w-4 h-4 mr-2\" fill=\"currentColor\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z\"></path><path fill-rule=\"evenodd\" d=\"M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z\" clip-rule=\"evenodd\"></path></svg>\n        Ship\n      </button>\n      <button assign-group-data=").concat(groupUnderScore, " type=\"button\" id=\"assign-product-button-").concat(groupUnderScore, "\" class=\"assign-product-button inline-flex items-center px-3 py-2.5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800\">\n        <svg class=\"w-4 h-4 mr-2\" fill=\"currentColor\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z\"></path><path fill-rule=\"evenodd\" d=\"M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z\" clip-rule=\"evenodd\"></path></svg>\n        Assign\n      </button>\n    </div>\n  ");
    var bookingContainerDiv = "\n        <div>\n        <label for=\"product_group\" class=\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\" >Action</label >\n        <button ship-group-data=".concat(groupUnderScore, " type=\"button\" id=\"booking-product-button-").concat(groupUnderScore, "\" class=\"booking-product-button inline-flex items-center mr-2 px-3 py-2.5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800\">\n            <svg class=\"w-4 h-4 mr-2\" fill=\"currentColor\" viewBox=\"0 0 448 512\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path\n                d=\"M128 0c13.3 0 24 10.7 24 24V64H296V24c0-13.3 10.7-24 24-24s24 10.7 24 24V64h40c35.3 0 64 28.7 64 64v16 48V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192 144 128C0 92.7 28.7 64 64 64h40V24c0-13.3 10.7-24 24-24zM400 192H48V448c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V192zM329 297L217 409c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47 95-95c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z\"\n                clip-rule=\"evenodd\"></path>\n            </svg>\n            Booking\n        </button>\n        </div>\n    ");
    isEvent
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
        shipProductBtn.classList.add('invisible');
        assignProductBtn.classList.add('invisible');
        shareProductBtn.classList.add('invisible');
    }
    if (isEqual) {
        productTypeContainer.parentNode.insertBefore(shipAssignContainer, productTypeContainer.nextSibling);
    }
    else {
        productTypeContainer.parentNode.insertBefore(shareContainer, productTypeContainer.nextSibling);
    }
    if (isEvent) {
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
    masterGroupWarehouseContainer.innerHTML = "\n  <div class=\"flex gap-4\">\n    <div class=\"w-1/2\">\n      <label for=\"for-group-".concat(groupUnderScore, "\"\n        class=\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\">").concat(masterGroup, "</label>\n      <select type=\"text\" name=\"group-").concat(groupUnderScore, "\" id=\"master-group-adjust-").concat(groupUnderScore, "\"\n        class=\"product-adjust-group shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500\"\n        placeholder=\"Some Group\" required\n      >\n        <option value=\"").concat(groupProductIds[group], "\">").concat(group, "</option>\n      </select>\n    </div>\n    <div class=\"w-1/2\">\n      <label for=\"for-warehouse-").concat(groupUnderScore, "\"\n        class=\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\">Warehouse</label>\n      <select type=\"text\" name=\"group-").concat(groupUnderScore, "\" id=\"warehouse-adjust-").concat(groupUnderScore, "\" data-target-group=\"").concat(group, "\"\n        class=\"product-adjust-warehouse-select shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500\"\n        placeholder=\"Some Group\" required\n      >\n      </select>\n    </div>\n  </div>\n    ");
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
                        })
                        // NOTE: If we do not notify user about adjust, delete if else statement
                    ];
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
        productGroupEditSelect.value = productParam.mstr_grps_grps_names_in_prod[masterGroup][itemIndex].group_id.toString();
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
// ----product show stocks own by me----
var showProductByUserGroupCheckbox = document.querySelector('#product-show-stocks-own-by-me-btn');
if (window.location.pathname + window.location.hash === '/product/stocks_owned_by_me') {
    window.onload = function (event) {
        showProductByUserGroupCheckbox.setAttribute('checked', 'checked');
    };
}
showProductByUserGroupCheckbox.addEventListener('change', function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1, response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!showProductByUserGroupCheckbox.checked) return [3 /*break*/, 5];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fetch('/product/stocks_owned_by_me', {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUN0RixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxVQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUU7QUFDdEMsQ0FBQztBQUVELElBQU0scUJBQXFCLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUNBQWlDLENBQUM7QUFDekcscUJBQXFCLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFO0lBQy9DLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUM7QUFDaEQsQ0FBQyxDQUFDOzs7Ozs7O1VDbHpERjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AZWFzZXBpY2svYnVuZGxlL2Rpc3QvaW5kZXguZXNtLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvY3JlYXRlUG9wcGVyLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2NvbnRhaW5zLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldEJvdW5kaW5nQ2xpZW50UmVjdC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRDbGlwcGluZ1JlY3QuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Q29tcG9zaXRlUmVjdC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRDb21wdXRlZFN0eWxlLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldERvY3VtZW50RWxlbWVudC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXREb2N1bWVudFJlY3QuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0SFRNTEVsZW1lbnRTY3JvbGwuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0TGF5b3V0UmVjdC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXROb2RlTmFtZS5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXROb2RlU2Nyb2xsLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldE9mZnNldFBhcmVudC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRQYXJlbnROb2RlLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldFNjcm9sbFBhcmVudC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRWaWV3cG9ydFJlY3QuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0V2luZG93LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldFdpbmRvd1Njcm9sbC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRXaW5kb3dTY3JvbGxCYXJYLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2luc3RhbmNlT2YuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvaXNMYXlvdXRWaWV3cG9ydC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9pc1Njcm9sbFBhcmVudC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9pc1RhYmxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9saXN0U2Nyb2xsUGFyZW50cy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2VudW1zLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2FwcGx5U3R5bGVzLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2Fycm93LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2NvbXB1dGVTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvZXZlbnRMaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvZmxpcC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9oaWRlLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2luZGV4LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL29mZnNldC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9wb3BwZXJPZmZzZXRzLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL3ByZXZlbnRPdmVyZmxvdy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3BvcHBlci1saXRlLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvcG9wcGVyLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvY29tcHV0ZUF1dG9QbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9jb21wdXRlT2Zmc2V0cy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2RlYm91bmNlLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZGV0ZWN0T3ZlcmZsb3cuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9leHBhbmRUb0hhc2hNYXAuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9mb3JtYXQuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9nZXRBbHRBeGlzLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZ2V0QmFzZVBsYWNlbWVudC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2dldEZyZXNoU2lkZU9iamVjdC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2dldE1haW5BeGlzRnJvbVBsYWNlbWVudC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2dldE9wcG9zaXRlUGxhY2VtZW50LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZ2V0T3Bwb3NpdGVWYXJpYXRpb25QbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9nZXRWYXJpYXRpb24uanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9tYXRoLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvbWVyZ2VCeU5hbWUuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9tZXJnZVBhZGRpbmdPYmplY3QuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9vcmRlck1vZGlmaWVycy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL3JlY3RUb0NsaWVudFJlY3QuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy91bmlxdWVCeS5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL3VzZXJBZ2VudC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL3ZhbGlkYXRlTW9kaWZpZXJzLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvd2l0aGluLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvYWNjb3JkaW9uL2luZGV4LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvYWNjb3JkaW9uL2ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL2FjY29yZGlvbi90eXBlcy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL2Nhcm91c2VsL2luZGV4LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvY2Fyb3VzZWwvaW50ZXJmYWNlLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvY2Fyb3VzZWwvdHlwZXMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9jb2xsYXBzZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL2NvbGxhcHNlL2ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL2NvbGxhcHNlL3R5cGVzLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvZGlhbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL2RpYWwvaW50ZXJmYWNlLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvZGlhbC90eXBlcy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL2Rpc21pc3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9kaXNtaXNzL2ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL2Rpc21pc3MvdHlwZXMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9kcmF3ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9kcmF3ZXIvaW50ZXJmYWNlLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvZHJhd2VyL3R5cGVzLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvZHJvcGRvd24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9kcm9wZG93bi9pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9kcm9wZG93bi90eXBlcy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL2luZGV4LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvbW9kYWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9tb2RhbC9pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9tb2RhbC90eXBlcy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL3BvcG92ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9wb3BvdmVyL2ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL3BvcG92ZXIvdHlwZXMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy90YWJzL2luZGV4LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvdGFicy9pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy90YWJzL3R5cGVzLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvdG9vbHRpcC9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL3Rvb2x0aXAvaW50ZXJmYWNlLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvdG9vbHRpcC90eXBlcy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9kb20vZXZlbnRzLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2luZGV4LmpzIiwid2VicGFjazovL3N0YXRpYy8uL3NyYy9wcm9kdWN0LnRzIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyB0IGV4dGVuZHMgRGF0ZXtzdGF0aWMgcGFyc2VEYXRlVGltZShlLGk9XCJZWVlZLU1NLUREXCIsbj1cImVuLVVTXCIpe2lmKCFlKXJldHVybiBuZXcgRGF0ZSgobmV3IERhdGUpLnNldEhvdXJzKDAsMCwwLDApKTtpZihlIGluc3RhbmNlb2YgdClyZXR1cm4gZS50b0pTRGF0ZSgpO2lmKGUgaW5zdGFuY2VvZiBEYXRlKXJldHVybiBlO2lmKC9eLT9cXGR7MTAsfSQvLnRlc3QoU3RyaW5nKGUpKSlyZXR1cm4gbmV3IERhdGUoTnVtYmVyKGUpKTtpZihcInN0cmluZ1wiPT10eXBlb2YgZSl7Y29uc3Qgcz1bXTtsZXQgbz1udWxsO2Zvcig7bnVsbCE9KG89dC5yZWdleC5leGVjKGkpKTspXCJcXFxcXCIhPT1vWzFdJiZzLnB1c2gobyk7aWYocy5sZW5ndGgpe2NvbnN0IGk9e3llYXI6bnVsbCxtb250aDpudWxsLHNob3J0TW9udGg6bnVsbCxsb25nTW9udGg6bnVsbCxkYXk6bnVsbCxob3VyOjAsbWludXRlOjAsc2Vjb25kOjAsYW1wbTpudWxsLHZhbHVlOlwiXCJ9O3NbMF0uaW5kZXg+MCYmKGkudmFsdWUrPVwiLio/XCIpO2Zvcihjb25zdFtlLG9db2YgT2JqZWN0LmVudHJpZXMocykpe2NvbnN0IHM9TnVtYmVyKGUpLHtncm91cDphLHBhdHRlcm46cn09dC5mb3JtYXRQYXR0ZXJucyhvWzBdLG4pO2lbYV09cysxLGkudmFsdWUrPXIsaS52YWx1ZSs9XCIuKj9cIn1jb25zdCBvPW5ldyBSZWdFeHAoYF4ke2kudmFsdWV9JGApO2lmKG8udGVzdChlKSl7Y29uc3Qgcz1vLmV4ZWMoZSksYT1OdW1iZXIoc1tpLnllYXJdKTtsZXQgcj1udWxsO2kubW9udGg/cj1OdW1iZXIoc1tpLm1vbnRoXSktMTppLnNob3J0TW9udGg/cj10LnNob3J0TW9udGhzKG4pLmluZGV4T2Yoc1tpLnNob3J0TW9udGhdKTppLmxvbmdNb250aCYmKHI9dC5sb25nTW9udGhzKG4pLmluZGV4T2Yoc1tpLmxvbmdNb250aF0pKTtjb25zdCBjPU51bWJlcihzW2kuZGF5XSl8fDEsbD1OdW1iZXIoc1tpLmhvdXJdKTtsZXQgaD1OdW1iZXIuaXNOYU4obCk/MDpsO2NvbnN0IGQ9TnVtYmVyKHNbaS5taW51dGVdKSxwPU51bWJlci5pc05hTihkKT8wOmQsdT1OdW1iZXIoc1tpLnNlY29uZF0pLGc9TnVtYmVyLmlzTmFOKHUpPzA6dSxtPXNbaS5hbXBtXTtyZXR1cm4gbSYmXCJQTVwiPT09bSYmKGgrPTEyLDI0PT09aCYmKGg9MCkpLG5ldyBEYXRlKGEscixjLGgscCxnLDApfX19cmV0dXJuIG5ldyBEYXRlKChuZXcgRGF0ZSkuc2V0SG91cnMoMCwwLDAsMCkpfXN0YXRpYyByZWdleD0vKFxcXFwpPyhZezIsNH18TXsxLDR9fER7MSwyfXxIezEsMn18aHsxLDJ9fG17MSwyfXxzezEsMn18QXxhKS9nO3N0YXRpYyBNT05USF9KUz1bMCwxLDIsMyw0LDUsNiw3LDgsOSwxMCwxMV07c3RhdGljIHNob3J0TW9udGhzKGUpe3JldHVybiB0Lk1PTlRIX0pTLm1hcCgodD0+bmV3IERhdGUoMjAxOSx0KS50b0xvY2FsZVN0cmluZyhlLHttb250aDpcInNob3J0XCJ9KSkpfXN0YXRpYyBsb25nTW9udGhzKGUpe3JldHVybiB0Lk1PTlRIX0pTLm1hcCgodD0+bmV3IERhdGUoMjAxOSx0KS50b0xvY2FsZVN0cmluZyhlLHttb250aDpcImxvbmdcIn0pKSl9c3RhdGljIGZvcm1hdFBhdHRlcm5zKGUsaSl7c3dpdGNoKGUpe2Nhc2VcIllZXCI6Y2FzZVwiWVlZWVwiOnJldHVybntncm91cDpcInllYXJcIixwYXR0ZXJuOmAoXFxcXGR7JHtlLmxlbmd0aH19KWB9O2Nhc2VcIk1cIjpyZXR1cm57Z3JvdXA6XCJtb250aFwiLHBhdHRlcm46XCIoXFxcXGR7MSwyfSlcIn07Y2FzZVwiTU1cIjpyZXR1cm57Z3JvdXA6XCJtb250aFwiLHBhdHRlcm46XCIoXFxcXGR7Mn0pXCJ9O2Nhc2VcIk1NTVwiOnJldHVybntncm91cDpcInNob3J0TW9udGhcIixwYXR0ZXJuOmAoJHt0LnNob3J0TW9udGhzKGkpLmpvaW4oXCJ8XCIpfSlgfTtjYXNlXCJNTU1NXCI6cmV0dXJue2dyb3VwOlwibG9uZ01vbnRoXCIscGF0dGVybjpgKCR7dC5sb25nTW9udGhzKGkpLmpvaW4oXCJ8XCIpfSlgfTtjYXNlXCJEXCI6cmV0dXJue2dyb3VwOlwiZGF5XCIscGF0dGVybjpcIihcXFxcZHsxLDJ9KVwifTtjYXNlXCJERFwiOnJldHVybntncm91cDpcImRheVwiLHBhdHRlcm46XCIoXFxcXGR7Mn0pXCJ9O2Nhc2VcImhcIjpjYXNlXCJIXCI6cmV0dXJue2dyb3VwOlwiaG91clwiLHBhdHRlcm46XCIoXFxcXGR7MSwyfSlcIn07Y2FzZVwiaGhcIjpjYXNlXCJISFwiOnJldHVybntncm91cDpcImhvdXJcIixwYXR0ZXJuOlwiKFxcXFxkezJ9KVwifTtjYXNlXCJtXCI6cmV0dXJue2dyb3VwOlwibWludXRlXCIscGF0dGVybjpcIihcXFxcZHsxLDJ9KVwifTtjYXNlXCJtbVwiOnJldHVybntncm91cDpcIm1pbnV0ZVwiLHBhdHRlcm46XCIoXFxcXGR7Mn0pXCJ9O2Nhc2VcInNcIjpyZXR1cm57Z3JvdXA6XCJzZWNvbmRcIixwYXR0ZXJuOlwiKFxcXFxkezEsMn0pXCJ9O2Nhc2VcInNzXCI6cmV0dXJue2dyb3VwOlwic2Vjb25kXCIscGF0dGVybjpcIihcXFxcZHsyfSlcIn07Y2FzZVwiYVwiOmNhc2VcIkFcIjpyZXR1cm57Z3JvdXA6XCJhbXBtXCIscGF0dGVybjpcIihBTXxQTXxhbXxwbSlcIn19fWxhbmc7Y29uc3RydWN0b3IoZT1udWxsLGk9XCJZWVlZLU1NLUREXCIsbj1cImVuLVVTXCIpe3N1cGVyKHQucGFyc2VEYXRlVGltZShlLGksbikpLHRoaXMubGFuZz1ufWdldFdlZWsodCl7Y29uc3QgZT1uZXcgRGF0ZSh0aGlzLm1pZG5pZ2h0X3RzKHRoaXMpKSxpPSh0aGlzLmdldERheSgpKyg3LXQpKSU3O2Uuc2V0RGF0ZShlLmdldERhdGUoKS1pKTtjb25zdCBuPWUuZ2V0VGltZSgpO3JldHVybiBlLnNldE1vbnRoKDAsMSksZS5nZXREYXkoKSE9PXQmJmUuc2V0TW9udGgoMCwxKyg0LWUuZ2V0RGF5KCkrNyklNyksMStNYXRoLmNlaWwoKG4tZS5nZXRUaW1lKCkpLzYwNDhlNSl9Y2xvbmUoKXtyZXR1cm4gbmV3IHQodGhpcyl9dG9KU0RhdGUoKXtyZXR1cm4gbmV3IERhdGUodGhpcyl9aW5BcnJheSh0LGU9XCJbXVwiKXtyZXR1cm4gdC5zb21lKCh0PT50IGluc3RhbmNlb2YgQXJyYXk/dGhpcy5pc0JldHdlZW4odFswXSx0WzFdLGUpOnRoaXMuaXNTYW1lKHQsXCJkYXlcIikpKX1pc0JldHdlZW4odCxlLGk9XCIoKVwiKXtzd2l0Y2goaSl7ZGVmYXVsdDpjYXNlXCIoKVwiOnJldHVybiB0aGlzLm1pZG5pZ2h0X3RzKHRoaXMpPnRoaXMubWlkbmlnaHRfdHModCkmJnRoaXMubWlkbmlnaHRfdHModGhpcyk8dGhpcy5taWRuaWdodF90cyhlKTtjYXNlXCJbKVwiOnJldHVybiB0aGlzLm1pZG5pZ2h0X3RzKHRoaXMpPj10aGlzLm1pZG5pZ2h0X3RzKHQpJiZ0aGlzLm1pZG5pZ2h0X3RzKHRoaXMpPHRoaXMubWlkbmlnaHRfdHMoZSk7Y2FzZVwiKF1cIjpyZXR1cm4gdGhpcy5taWRuaWdodF90cyh0aGlzKT50aGlzLm1pZG5pZ2h0X3RzKHQpJiZ0aGlzLm1pZG5pZ2h0X3RzKHRoaXMpPD10aGlzLm1pZG5pZ2h0X3RzKGUpO2Nhc2VcIltdXCI6cmV0dXJuIHRoaXMubWlkbmlnaHRfdHMoKT49dGhpcy5taWRuaWdodF90cyh0KSYmdGhpcy5taWRuaWdodF90cygpPD10aGlzLm1pZG5pZ2h0X3RzKGUpfX1pc0JlZm9yZSh0LGU9XCJkYXlzXCIpe3N3aXRjaChlKXtjYXNlXCJkYXlcIjpjYXNlXCJkYXlzXCI6cmV0dXJuIG5ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKSx0LmdldE1vbnRoKCksdC5nZXREYXRlKCkpLmdldFRpbWUoKT5uZXcgRGF0ZSh0aGlzLmdldEZ1bGxZZWFyKCksdGhpcy5nZXRNb250aCgpLHRoaXMuZ2V0RGF0ZSgpKS5nZXRUaW1lKCk7Y2FzZVwibW9udGhcIjpjYXNlXCJtb250aHNcIjpyZXR1cm4gbmV3IERhdGUodC5nZXRGdWxsWWVhcigpLHQuZ2V0TW9udGgoKSwxKS5nZXRUaW1lKCk+bmV3IERhdGUodGhpcy5nZXRGdWxsWWVhcigpLHRoaXMuZ2V0TW9udGgoKSwxKS5nZXRUaW1lKCk7Y2FzZVwieWVhclwiOmNhc2VcInllYXJzXCI6cmV0dXJuIHQuZ2V0RnVsbFllYXIoKT50aGlzLmdldEZ1bGxZZWFyKCl9dGhyb3cgbmV3IEVycm9yKFwiaXNCZWZvcmU6IEludmFsaWQgdW5pdCFcIil9aXNTYW1lT3JCZWZvcmUodCxlPVwiZGF5c1wiKXtzd2l0Y2goZSl7Y2FzZVwiZGF5XCI6Y2FzZVwiZGF5c1wiOnJldHVybiBuZXcgRGF0ZSh0LmdldEZ1bGxZZWFyKCksdC5nZXRNb250aCgpLHQuZ2V0RGF0ZSgpKS5nZXRUaW1lKCk+PW5ldyBEYXRlKHRoaXMuZ2V0RnVsbFllYXIoKSx0aGlzLmdldE1vbnRoKCksdGhpcy5nZXREYXRlKCkpLmdldFRpbWUoKTtjYXNlXCJtb250aFwiOmNhc2VcIm1vbnRoc1wiOnJldHVybiBuZXcgRGF0ZSh0LmdldEZ1bGxZZWFyKCksdC5nZXRNb250aCgpLDEpLmdldFRpbWUoKT49bmV3IERhdGUodGhpcy5nZXRGdWxsWWVhcigpLHRoaXMuZ2V0TW9udGgoKSwxKS5nZXRUaW1lKCl9dGhyb3cgbmV3IEVycm9yKFwiaXNTYW1lT3JCZWZvcmU6IEludmFsaWQgdW5pdCFcIil9aXNBZnRlcih0LGU9XCJkYXlzXCIpe3N3aXRjaChlKXtjYXNlXCJkYXlcIjpjYXNlXCJkYXlzXCI6cmV0dXJuIG5ldyBEYXRlKHRoaXMuZ2V0RnVsbFllYXIoKSx0aGlzLmdldE1vbnRoKCksdGhpcy5nZXREYXRlKCkpLmdldFRpbWUoKT5uZXcgRGF0ZSh0LmdldEZ1bGxZZWFyKCksdC5nZXRNb250aCgpLHQuZ2V0RGF0ZSgpKS5nZXRUaW1lKCk7Y2FzZVwibW9udGhcIjpjYXNlXCJtb250aHNcIjpyZXR1cm4gbmV3IERhdGUodGhpcy5nZXRGdWxsWWVhcigpLHRoaXMuZ2V0TW9udGgoKSwxKS5nZXRUaW1lKCk+bmV3IERhdGUodC5nZXRGdWxsWWVhcigpLHQuZ2V0TW9udGgoKSwxKS5nZXRUaW1lKCk7Y2FzZVwieWVhclwiOmNhc2VcInllYXJzXCI6cmV0dXJuIHRoaXMuZ2V0RnVsbFllYXIoKT50LmdldEZ1bGxZZWFyKCl9dGhyb3cgbmV3IEVycm9yKFwiaXNBZnRlcjogSW52YWxpZCB1bml0IVwiKX1pc1NhbWVPckFmdGVyKHQsZT1cImRheXNcIil7c3dpdGNoKGUpe2Nhc2VcImRheVwiOmNhc2VcImRheXNcIjpyZXR1cm4gbmV3IERhdGUodGhpcy5nZXRGdWxsWWVhcigpLHRoaXMuZ2V0TW9udGgoKSx0aGlzLmdldERhdGUoKSkuZ2V0VGltZSgpPj1uZXcgRGF0ZSh0LmdldEZ1bGxZZWFyKCksdC5nZXRNb250aCgpLHQuZ2V0RGF0ZSgpKS5nZXRUaW1lKCk7Y2FzZVwibW9udGhcIjpjYXNlXCJtb250aHNcIjpyZXR1cm4gbmV3IERhdGUodGhpcy5nZXRGdWxsWWVhcigpLHRoaXMuZ2V0TW9udGgoKSwxKS5nZXRUaW1lKCk+PW5ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKSx0LmdldE1vbnRoKCksMSkuZ2V0VGltZSgpfXRocm93IG5ldyBFcnJvcihcImlzU2FtZU9yQWZ0ZXI6IEludmFsaWQgdW5pdCFcIil9aXNTYW1lKHQsZT1cImRheXNcIil7c3dpdGNoKGUpe2Nhc2VcImRheVwiOmNhc2VcImRheXNcIjpyZXR1cm4gbmV3IERhdGUodGhpcy5nZXRGdWxsWWVhcigpLHRoaXMuZ2V0TW9udGgoKSx0aGlzLmdldERhdGUoKSkuZ2V0VGltZSgpPT09bmV3IERhdGUodC5nZXRGdWxsWWVhcigpLHQuZ2V0TW9udGgoKSx0LmdldERhdGUoKSkuZ2V0VGltZSgpO2Nhc2VcIm1vbnRoXCI6Y2FzZVwibW9udGhzXCI6cmV0dXJuIG5ldyBEYXRlKHRoaXMuZ2V0RnVsbFllYXIoKSx0aGlzLmdldE1vbnRoKCksMSkuZ2V0VGltZSgpPT09bmV3IERhdGUodC5nZXRGdWxsWWVhcigpLHQuZ2V0TW9udGgoKSwxKS5nZXRUaW1lKCl9dGhyb3cgbmV3IEVycm9yKFwiaXNTYW1lOiBJbnZhbGlkIHVuaXQhXCIpfWFkZCh0LGU9XCJkYXlzXCIpe3N3aXRjaChlKXtjYXNlXCJkYXlcIjpjYXNlXCJkYXlzXCI6dGhpcy5zZXREYXRlKHRoaXMuZ2V0RGF0ZSgpK3QpO2JyZWFrO2Nhc2VcIm1vbnRoXCI6Y2FzZVwibW9udGhzXCI6dGhpcy5zZXRNb250aCh0aGlzLmdldE1vbnRoKCkrdCl9cmV0dXJuIHRoaXN9c3VidHJhY3QodCxlPVwiZGF5c1wiKXtzd2l0Y2goZSl7Y2FzZVwiZGF5XCI6Y2FzZVwiZGF5c1wiOnRoaXMuc2V0RGF0ZSh0aGlzLmdldERhdGUoKS10KTticmVhaztjYXNlXCJtb250aFwiOmNhc2VcIm1vbnRoc1wiOnRoaXMuc2V0TW9udGgodGhpcy5nZXRNb250aCgpLXQpfXJldHVybiB0aGlzfWRpZmYodCxlPVwiZGF5c1wiKXtzd2l0Y2goZSl7ZGVmYXVsdDpjYXNlXCJkYXlcIjpjYXNlXCJkYXlzXCI6cmV0dXJuIE1hdGgucm91bmQoKHRoaXMubWlkbmlnaHRfdHMoKS10aGlzLm1pZG5pZ2h0X3RzKHQpKS84NjRlNSk7Y2FzZVwibW9udGhcIjpjYXNlXCJtb250aHNcIjpsZXQgZT0xMioodC5nZXRGdWxsWWVhcigpLXRoaXMuZ2V0RnVsbFllYXIoKSk7cmV0dXJuIGUtPXQuZ2V0TW9udGgoKSxlKz10aGlzLmdldE1vbnRoKCksZX19Zm9ybWF0KGUsaT1cImVuLVVTXCIpe2xldCBuPVwiXCI7Y29uc3Qgcz1bXTtsZXQgbz1udWxsO2Zvcig7bnVsbCE9KG89dC5yZWdleC5leGVjKGUpKTspXCJcXFxcXCIhPT1vWzFdJiZzLnB1c2gobyk7aWYocy5sZW5ndGgpe3NbMF0uaW5kZXg+MCYmKG4rPWUuc3Vic3RyaW5nKDAsc1swXS5pbmRleCkpO2Zvcihjb25zdFt0LG9db2YgT2JqZWN0LmVudHJpZXMocykpe2NvbnN0IGE9TnVtYmVyKHQpO24rPXRoaXMuZm9ybWF0VG9rZW5zKG9bMF0saSksc1thKzFdJiYobis9ZS5zdWJzdHJpbmcoby5pbmRleCtvWzBdLmxlbmd0aCxzW2ErMV0uaW5kZXgpKSxhPT09cy5sZW5ndGgtMSYmKG4rPWUuc3Vic3RyaW5nKG8uaW5kZXgrb1swXS5sZW5ndGgpKX19cmV0dXJuIG4ucmVwbGFjZSgvXFxcXC9nLFwiXCIpfW1pZG5pZ2h0X3RzKHQpe3JldHVybiB0P25ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKSx0LmdldE1vbnRoKCksdC5nZXREYXRlKCksMCwwLDAsMCkuZ2V0VGltZSgpOm5ldyBEYXRlKHRoaXMuZ2V0RnVsbFllYXIoKSx0aGlzLmdldE1vbnRoKCksdGhpcy5nZXREYXRlKCksMCwwLDAsMCkuZ2V0VGltZSgpfWZvcm1hdFRva2VucyhlLGkpe3N3aXRjaChlKXtjYXNlXCJZWVwiOnJldHVybiBTdHJpbmcodGhpcy5nZXRGdWxsWWVhcigpKS5zbGljZSgtMik7Y2FzZVwiWVlZWVwiOnJldHVybiBTdHJpbmcodGhpcy5nZXRGdWxsWWVhcigpKTtjYXNlXCJNXCI6cmV0dXJuIFN0cmluZyh0aGlzLmdldE1vbnRoKCkrMSk7Y2FzZVwiTU1cIjpyZXR1cm5gMCR7dGhpcy5nZXRNb250aCgpKzF9YC5zbGljZSgtMik7Y2FzZVwiTU1NXCI6cmV0dXJuIHQuc2hvcnRNb250aHMoaSlbdGhpcy5nZXRNb250aCgpXTtjYXNlXCJNTU1NXCI6cmV0dXJuIHQubG9uZ01vbnRocyhpKVt0aGlzLmdldE1vbnRoKCldO2Nhc2VcIkRcIjpyZXR1cm4gU3RyaW5nKHRoaXMuZ2V0RGF0ZSgpKTtjYXNlXCJERFwiOnJldHVybmAwJHt0aGlzLmdldERhdGUoKX1gLnNsaWNlKC0yKTtjYXNlXCJIXCI6cmV0dXJuIFN0cmluZyh0aGlzLmdldEhvdXJzKCkpO2Nhc2VcIkhIXCI6cmV0dXJuYDAke3RoaXMuZ2V0SG91cnMoKX1gLnNsaWNlKC0yKTtjYXNlXCJoXCI6cmV0dXJuIFN0cmluZyh0aGlzLmdldEhvdXJzKCklMTJ8fDEyKTtjYXNlXCJoaFwiOnJldHVybmAwJHt0aGlzLmdldEhvdXJzKCklMTJ8fDEyfWAuc2xpY2UoLTIpO2Nhc2VcIm1cIjpyZXR1cm4gU3RyaW5nKHRoaXMuZ2V0TWludXRlcygpKTtjYXNlXCJtbVwiOnJldHVybmAwJHt0aGlzLmdldE1pbnV0ZXMoKX1gLnNsaWNlKC0yKTtjYXNlXCJzXCI6cmV0dXJuIFN0cmluZyh0aGlzLmdldFNlY29uZHMoKSk7Y2FzZVwic3NcIjpyZXR1cm5gMCR7dGhpcy5nZXRTZWNvbmRzKCl9YC5zbGljZSgtMik7Y2FzZVwiYVwiOnJldHVybiB0aGlzLmdldEhvdXJzKCk8MTJ8fDI0PT09dGhpcy5nZXRIb3VycygpP1wiYW1cIjpcInBtXCI7Y2FzZVwiQVwiOnJldHVybiB0aGlzLmdldEhvdXJzKCk8MTJ8fDI0PT09dGhpcy5nZXRIb3VycygpP1wiQU1cIjpcIlBNXCI7ZGVmYXVsdDpyZXR1cm5cIlwifX19Y2xhc3MgZXtwaWNrZXI7Y29uc3RydWN0b3IodCl7dGhpcy5waWNrZXI9dH1yZW5kZXIoZSxpKXtlfHwoZT1uZXcgdCksZS5zZXREYXRlKDEpLGUuc2V0SG91cnMoMCwwLDAsMCksXCJmdW5jdGlvblwiPT10eXBlb2YgdGhpc1tgZ2V0JHtpfVZpZXdgXSYmdGhpc1tgZ2V0JHtpfVZpZXdgXShlKX1nZXRDb250YWluZXJWaWV3KHQpe3RoaXMucGlja2VyLnVpLmNvbnRhaW5lci5pbm5lckhUTUw9XCJcIix0aGlzLnBpY2tlci5vcHRpb25zLmhlYWRlciYmdGhpcy5waWNrZXIudHJpZ2dlcihcInJlbmRlclwiLHtkYXRlOnQuY2xvbmUoKSx2aWV3OlwiSGVhZGVyXCJ9KSx0aGlzLnBpY2tlci50cmlnZ2VyKFwicmVuZGVyXCIse2RhdGU6dC5jbG9uZSgpLHZpZXc6XCJNYWluXCJ9KSx0aGlzLnBpY2tlci5vcHRpb25zLmF1dG9BcHBseXx8dGhpcy5waWNrZXIudHJpZ2dlcihcInJlbmRlclwiLHtkYXRlOnQuY2xvbmUoKSx2aWV3OlwiRm9vdGVyXCJ9KX1nZXRIZWFkZXJWaWV3KHQpe2NvbnN0IGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTt0aGlzLnBpY2tlci5vcHRpb25zLmhlYWRlciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50JiZlLmFwcGVuZENoaWxkKHRoaXMucGlja2VyLm9wdGlvbnMuaGVhZGVyKSxcInN0cmluZ1wiPT10eXBlb2YgdGhpcy5waWNrZXIub3B0aW9ucy5oZWFkZXImJihlLmlubmVySFRNTD10aGlzLnBpY2tlci5vcHRpb25zLmhlYWRlciksdGhpcy5waWNrZXIudWkuY29udGFpbmVyLmFwcGVuZENoaWxkKGUpLHRoaXMucGlja2VyLnRyaWdnZXIoXCJ2aWV3XCIse3RhcmdldDplLGRhdGU6dC5jbG9uZSgpLHZpZXc6XCJIZWFkZXJcIn0pfWdldE1haW5WaWV3KHQpe2NvbnN0IGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm1haW5cIik7dGhpcy5waWNrZXIudWkuY29udGFpbmVyLmFwcGVuZENoaWxkKGUpO2NvbnN0IGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtpLmNsYXNzTmFtZT1gY2FsZW5kYXJzIGdyaWQtJHt0aGlzLnBpY2tlci5vcHRpb25zLmdyaWR9YDtmb3IobGV0IGU9MDtlPHRoaXMucGlja2VyLm9wdGlvbnMuY2FsZW5kYXJzO2UrKyl7Y29uc3Qgbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO24uY2xhc3NOYW1lPVwiY2FsZW5kYXJcIixpLmFwcGVuZENoaWxkKG4pO2NvbnN0IHM9dGhpcy5nZXRDYWxlbmRhckhlYWRlclZpZXcodC5jbG9uZSgpKTtuLmFwcGVuZENoaWxkKHMpLHRoaXMucGlja2VyLnRyaWdnZXIoXCJ2aWV3XCIse2RhdGU6dC5jbG9uZSgpLHZpZXc6XCJDYWxlbmRhckhlYWRlclwiLGluZGV4OmUsdGFyZ2V0OnN9KTtjb25zdCBvPXRoaXMuZ2V0Q2FsZW5kYXJEYXlOYW1lc1ZpZXcoKTtuLmFwcGVuZENoaWxkKG8pLHRoaXMucGlja2VyLnRyaWdnZXIoXCJ2aWV3XCIse2RhdGU6dC5jbG9uZSgpLHZpZXc6XCJDYWxlbmRhckRheU5hbWVzXCIsaW5kZXg6ZSx0YXJnZXQ6b30pO2NvbnN0IGE9dGhpcy5nZXRDYWxlbmRhckRheXNWaWV3KHQuY2xvbmUoKSk7bi5hcHBlbmRDaGlsZChhKSx0aGlzLnBpY2tlci50cmlnZ2VyKFwidmlld1wiLHtkYXRlOnQuY2xvbmUoKSx2aWV3OlwiQ2FsZW5kYXJEYXlzXCIsaW5kZXg6ZSx0YXJnZXQ6YX0pO2NvbnN0IHI9dGhpcy5nZXRDYWxlbmRhckZvb3RlclZpZXcodGhpcy5waWNrZXIub3B0aW9ucy5sYW5nLHQuY2xvbmUoKSk7bi5hcHBlbmRDaGlsZChyKSx0aGlzLnBpY2tlci50cmlnZ2VyKFwidmlld1wiLHtkYXRlOnQuY2xvbmUoKSx2aWV3OlwiQ2FsZW5kYXJGb290ZXJcIixpbmRleDplLHRhcmdldDpyfSksdGhpcy5waWNrZXIudHJpZ2dlcihcInZpZXdcIix7ZGF0ZTp0LmNsb25lKCksdmlldzpcIkNhbGVuZGFySXRlbVwiLGluZGV4OmUsdGFyZ2V0Om59KSx0LmFkZCgxLFwibW9udGhcIil9ZS5hcHBlbmRDaGlsZChpKSx0aGlzLnBpY2tlci50cmlnZ2VyKFwidmlld1wiLHtkYXRlOnQuY2xvbmUoKSx2aWV3OlwiQ2FsZW5kYXJzXCIsdGFyZ2V0Oml9KSx0aGlzLnBpY2tlci50cmlnZ2VyKFwidmlld1wiLHtkYXRlOnQuY2xvbmUoKSx2aWV3OlwiTWFpblwiLHRhcmdldDplfSl9Z2V0Rm9vdGVyVmlldyh0KXtjb25zdCBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb290ZXJcIiksaT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2kuY2xhc3NOYW1lPVwiZm9vdGVyLWJ1dHRvbnNcIjtjb25zdCBuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7bi5jbGFzc05hbWU9XCJjYW5jZWwtYnV0dG9uIHVuaXRcIixuLmlubmVySFRNTD10aGlzLnBpY2tlci5vcHRpb25zLmxvY2FsZS5jYW5jZWwsaS5hcHBlbmRDaGlsZChuKTtjb25zdCBzPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7cy5jbGFzc05hbWU9XCJhcHBseS1idXR0b24gdW5pdFwiLHMuaW5uZXJIVE1MPXRoaXMucGlja2VyLm9wdGlvbnMubG9jYWxlLmFwcGx5LHMuZGlzYWJsZWQ9ITAsaS5hcHBlbmRDaGlsZChzKSxlLmFwcGVuZENoaWxkKGkpLHRoaXMucGlja2VyLnVpLmNvbnRhaW5lci5hcHBlbmRDaGlsZChlKSx0aGlzLnBpY2tlci50cmlnZ2VyKFwidmlld1wiLHtkYXRlOnQsdGFyZ2V0OmUsdmlldzpcIkZvb3RlclwifSl9Z2V0Q2FsZW5kYXJIZWFkZXJWaWV3KHQpe2NvbnN0IGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtlLmNsYXNzTmFtZT1cImhlYWRlclwiO2NvbnN0IGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtpLmNsYXNzTmFtZT1cIm1vbnRoLW5hbWVcIixpLmlubmVySFRNTD1gPHNwYW4+JHt0LnRvTG9jYWxlU3RyaW5nKHRoaXMucGlja2VyLm9wdGlvbnMubGFuZyx7bW9udGg6XCJsb25nXCJ9KX08L3NwYW4+ICR7dC5mb3JtYXQoXCJZWVlZXCIpfWAsZS5hcHBlbmRDaGlsZChpKTtjb25zdCBuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7bi5jbGFzc05hbWU9XCJwcmV2aW91cy1idXR0b24gdW5pdFwiLG4uaW5uZXJIVE1MPXRoaXMucGlja2VyLm9wdGlvbnMubG9jYWxlLnByZXZpb3VzTW9udGgsZS5hcHBlbmRDaGlsZChuKTtjb25zdCBzPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7cmV0dXJuIHMuY2xhc3NOYW1lPVwibmV4dC1idXR0b24gdW5pdFwiLHMuaW5uZXJIVE1MPXRoaXMucGlja2VyLm9wdGlvbnMubG9jYWxlLm5leHRNb250aCxlLmFwcGVuZENoaWxkKHMpLGV9Z2V0Q2FsZW5kYXJEYXlOYW1lc1ZpZXcoKXtjb25zdCB0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7dC5jbGFzc05hbWU9XCJkYXluYW1lcy1yb3dcIjtmb3IobGV0IGU9MTtlPD03O2UrKyl7Y29uc3QgaT0zK3RoaXMucGlja2VyLm9wdGlvbnMuZmlyc3REYXkrZSxuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7bi5jbGFzc05hbWU9XCJkYXluYW1lXCIsbi5pbm5lckhUTUw9bmV3IERhdGUoMTk3MCwwLGksMTIsMCwwLDApLnRvTG9jYWxlU3RyaW5nKHRoaXMucGlja2VyLm9wdGlvbnMubGFuZyx7d2Vla2RheTpcInNob3J0XCJ9KSxuLnRpdGxlPW5ldyBEYXRlKDE5NzAsMCxpLDEyLDAsMCwwKS50b0xvY2FsZVN0cmluZyh0aGlzLnBpY2tlci5vcHRpb25zLmxhbmcse3dlZWtkYXk6XCJsb25nXCJ9KSx0LmFwcGVuZENoaWxkKG4pLHRoaXMucGlja2VyLnRyaWdnZXIoXCJ2aWV3XCIse2RheUlkeDppLHZpZXc6XCJDYWxlbmRhckRheU5hbWVcIix0YXJnZXQ6bn0pfXJldHVybiB0fWdldENhbGVuZGFyRGF5c1ZpZXcodCl7Y29uc3QgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2UuY2xhc3NOYW1lPVwiZGF5cy1ncmlkXCI7Y29uc3QgaT10aGlzLmNhbGNPZmZzZXREYXlzKHQsdGhpcy5waWNrZXIub3B0aW9ucy5maXJzdERheSksbj0zMi1uZXcgRGF0ZSh0LmdldEZ1bGxZZWFyKCksdC5nZXRNb250aCgpLDMyKS5nZXREYXRlKCk7Zm9yKGxldCB0PTA7dDxpO3QrKyl7Y29uc3QgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3QuY2xhc3NOYW1lPVwib2Zmc2V0XCIsZS5hcHBlbmRDaGlsZCh0KX1mb3IobGV0IGk9MTtpPD1uO2krKyl7dC5zZXREYXRlKGkpO2NvbnN0IG49dGhpcy5nZXRDYWxlbmRhckRheVZpZXcodCk7ZS5hcHBlbmRDaGlsZChuKSx0aGlzLnBpY2tlci50cmlnZ2VyKFwidmlld1wiLHtkYXRlOnQsdmlldzpcIkNhbGVuZGFyRGF5XCIsdGFyZ2V0Om59KX1yZXR1cm4gZX1nZXRDYWxlbmRhckRheVZpZXcoZSl7Y29uc3QgaT10aGlzLnBpY2tlci5vcHRpb25zLmRhdGU/bmV3IHQodGhpcy5waWNrZXIub3B0aW9ucy5kYXRlKTpudWxsLG49bmV3IHQscz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3JldHVybiBzLmNsYXNzTmFtZT1cImRheSB1bml0XCIscy5pbm5lckhUTUw9ZS5mb3JtYXQoXCJEXCIpLHMuZGF0YXNldC50aW1lPVN0cmluZyhlLmdldFRpbWUoKSksZS5pc1NhbWUobixcImRheVwiKSYmcy5jbGFzc0xpc3QuYWRkKFwidG9kYXlcIiksWzAsNl0uaW5jbHVkZXMoZS5nZXREYXkoKSkmJnMuY2xhc3NMaXN0LmFkZChcIndlZWtlbmRcIiksdGhpcy5waWNrZXIuZGF0ZVBpY2tlZC5sZW5ndGg/dGhpcy5waWNrZXIuZGF0ZVBpY2tlZFswXS5pc1NhbWUoZSxcImRheVwiKSYmcy5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik6aSYmZS5pc1NhbWUoaSxcImRheVwiKSYmcy5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIiksdGhpcy5waWNrZXIudHJpZ2dlcihcInZpZXdcIix7ZGF0ZTplLHZpZXc6XCJDYWxlbmRhckRheVwiLHRhcmdldDpzfSksc31nZXRDYWxlbmRhckZvb3RlclZpZXcodCxlKXtjb25zdCBpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7cmV0dXJuIGkuY2xhc3NOYW1lPVwiZm9vdGVyXCIsaX1jYWxjT2Zmc2V0RGF5cyh0LGUpe2xldCBpPXQuZ2V0RGF5KCktZTtyZXR1cm4gaTwwJiYoaSs9NyksaX19Y2xhc3MgaXtwaWNrZXI7aW5zdGFuY2VzPXt9O2NvbnN0cnVjdG9yKHQpe3RoaXMucGlja2VyPXR9aW5pdGlhbGl6ZSgpe2NvbnN0IHQ9W107dGhpcy5waWNrZXIub3B0aW9ucy5wbHVnaW5zLmZvckVhY2goKGU9PntcImZ1bmN0aW9uXCI9PXR5cGVvZiBlP3QucHVzaChuZXcgZSk6XCJzdHJpbmdcIj09dHlwZW9mIGUmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBlYXNlcGljayYmT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGVhc2VwaWNrLGUpP3QucHVzaChuZXcgZWFzZXBpY2tbZV0pOmNvbnNvbGUud2FybihgZWFzZXBpY2s6ICR7ZX0gbm90IGZvdW5kLmApfSkpLHQuc29ydCgoKHQsZSk9PnQucHJpb3JpdHk+ZS5wcmlvcml0eT8tMTp0LnByaW9yaXR5PGUucHJpb3JpdHl8fHQuZGVwZW5kZW5jaWVzLmxlbmd0aD5lLmRlcGVuZGVuY2llcy5sZW5ndGg/MTp0LmRlcGVuZGVuY2llcy5sZW5ndGg8ZS5kZXBlbmRlbmNpZXMubGVuZ3RoPy0xOjApKSx0LmZvckVhY2goKHQ9Pnt0LmF0dGFjaCh0aGlzLnBpY2tlciksdGhpcy5pbnN0YW5jZXNbdC5nZXROYW1lKCldPXR9KSl9Z2V0SW5zdGFuY2UodCl7cmV0dXJuIHRoaXMuaW5zdGFuY2VzW3RdfWFkZEluc3RhbmNlKHQpe2lmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLmluc3RhbmNlcyx0KSljb25zb2xlLndhcm4oYGVhc2VwaWNrOiAke3R9IGFscmVhZHkgYWRkZWQuYCk7ZWxzZXtpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgZWFzZXBpY2smJk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlYXNlcGljayx0KSl7Y29uc3QgZT1uZXcgZWFzZXBpY2tbdF07cmV0dXJuIGUuYXR0YWNoKHRoaXMucGlja2VyKSx0aGlzLmluc3RhbmNlc1tlLmdldE5hbWUoKV09ZSxlfWlmKFwidW5kZWZpbmVkXCIhPT10aGlzLmdldFBsdWdpbkZuKHQpKXtjb25zdCBlPW5ldyh0aGlzLmdldFBsdWdpbkZuKHQpKTtyZXR1cm4gZS5hdHRhY2godGhpcy5waWNrZXIpLHRoaXMuaW5zdGFuY2VzW2UuZ2V0TmFtZSgpXT1lLGV9Y29uc29sZS53YXJuKGBlYXNlcGljazogJHt0fSBub3QgZm91bmQuYCl9cmV0dXJuIG51bGx9cmVtb3ZlSW5zdGFuY2UodCl7cmV0dXJuIHQgaW4gdGhpcy5pbnN0YW5jZXMmJnRoaXMuaW5zdGFuY2VzW3RdLmRldGFjaCgpLGRlbGV0ZSB0aGlzLmluc3RhbmNlc1t0XX1yZWxvYWRJbnN0YW5jZSh0KXtyZXR1cm4gdGhpcy5yZW1vdmVJbnN0YW5jZSh0KSx0aGlzLmFkZEluc3RhbmNlKHQpfWdldFBsdWdpbkZuKHQpe3JldHVyblsuLi50aGlzLnBpY2tlci5vcHRpb25zLnBsdWdpbnNdLmZpbHRlcigoZT0+XCJmdW5jdGlvblwiPT10eXBlb2YgZSYmKG5ldyBlKS5nZXROYW1lKCk9PT10KSkuc2hpZnQoKX19Y2xhc3MgbntDYWxlbmRhcj1uZXcgZSh0aGlzKTtQbHVnaW5NYW5hZ2VyPW5ldyBpKHRoaXMpO2NhbGVuZGFycz1bXTtkYXRlUGlja2VkPVtdO2Nzc0xvYWRlZD0wO2JpbmRzPXtoaWRlUGlja2VyOnRoaXMuaGlkZVBpY2tlci5iaW5kKHRoaXMpLHNob3c6dGhpcy5zaG93LmJpbmQodGhpcyl9O29wdGlvbnM9e2RvYzpkb2N1bWVudCxjc3M6W10sZWxlbWVudDpudWxsLGZpcnN0RGF5OjEsZ3JpZDoxLGNhbGVuZGFyczoxLGxhbmc6XCJlbi1VU1wiLGRhdGU6bnVsbCxmb3JtYXQ6XCJZWVlZLU1NLUREXCIscmVhZG9ubHk6ITAsYXV0b0FwcGx5OiEwLGhlYWRlcjohMSxpbmxpbmU6ITEsc2Nyb2xsVG9EYXRlOiEwLGxvY2FsZTp7bmV4dE1vbnRoOic8c3ZnIHdpZHRoPVwiMTFcIiBoZWlnaHQ9XCIxNlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTTIuNzQ4IDE2TDAgMTMuMzMzIDUuMzMzIDggMCAyLjY2NyAyLjc0OCAwbDcuOTE5IDh6XCIgZmlsbC1ydWxlPVwibm9uemVyb1wiLz48L3N2Zz4nLHByZXZpb3VzTW9udGg6Jzxzdmcgd2lkdGg9XCIxMVwiIGhlaWdodD1cIjE2XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJNNy45MTkgMGwyLjc0OCAyLjY2N0w1LjMzMyA4bDUuMzM0IDUuMzMzTDcuOTE5IDE2IDAgOHpcIiBmaWxsLXJ1bGU9XCJub256ZXJvXCIvPjwvc3ZnPicsY2FuY2VsOlwiQ2FuY2VsXCIsYXBwbHk6XCJBcHBseVwifSxkb2N1bWVudENsaWNrOnRoaXMuYmluZHMuaGlkZVBpY2tlcixwbHVnaW5zOltdfTt1aT17Y29udGFpbmVyOm51bGwsc2hhZG93Um9vdDpudWxsLHdyYXBwZXI6bnVsbH07dmVyc2lvbj1cIjEuMi4xXCI7Y29uc3RydWN0b3IodCl7Y29uc3QgZT17Li4udGhpcy5vcHRpb25zLmxvY2FsZSwuLi50LmxvY2FsZX07dGhpcy5vcHRpb25zPXsuLi50aGlzLm9wdGlvbnMsLi4udH0sdGhpcy5vcHRpb25zLmxvY2FsZT1lLHRoaXMuaGFuZGxlT3B0aW9ucygpLHRoaXMudWkud3JhcHBlcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSx0aGlzLnVpLndyYXBwZXIuc3R5bGUuZGlzcGxheT1cIm5vbmVcIix0aGlzLnVpLndyYXBwZXIuc3R5bGUucG9zaXRpb249XCJhYnNvbHV0ZVwiLHRoaXMudWkud3JhcHBlci5zdHlsZS5wb2ludGVyRXZlbnRzPVwibm9uZVwiLHRoaXMudWkud3JhcHBlci5jbGFzc05hbWU9XCJlYXNlcGljay13cmFwcGVyXCIsdGhpcy51aS53cmFwcGVyLmF0dGFjaFNoYWRvdyh7bW9kZTpcIm9wZW5cIn0pLHRoaXMudWkuc2hhZG93Um9vdD10aGlzLnVpLndyYXBwZXIuc2hhZG93Um9vdCx0aGlzLnVpLmNvbnRhaW5lcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLHRoaXMudWkuY29udGFpbmVyLmNsYXNzTmFtZT1cImNvbnRhaW5lclwiLHRoaXMub3B0aW9ucy56SW5kZXgmJih0aGlzLnVpLmNvbnRhaW5lci5zdHlsZS56SW5kZXg9U3RyaW5nKHRoaXMub3B0aW9ucy56SW5kZXgpKSx0aGlzLm9wdGlvbnMuaW5saW5lJiYodGhpcy51aS53cmFwcGVyLnN0eWxlLnBvc2l0aW9uPVwicmVsYXRpdmVcIix0aGlzLnVpLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiaW5saW5lXCIpKSx0aGlzLnVpLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGhpcy51aS5jb250YWluZXIpLHRoaXMub3B0aW9ucy5lbGVtZW50LmFmdGVyKHRoaXMudWkud3JhcHBlciksdGhpcy5oYW5kbGVDU1MoKSx0aGlzLm9wdGlvbnMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIix0aGlzLmJpbmRzLnNob3cpLHRoaXMub24oXCJ2aWV3XCIsdGhpcy5vblZpZXcuYmluZCh0aGlzKSksdGhpcy5vbihcInJlbmRlclwiLHRoaXMub25SZW5kZXIuYmluZCh0aGlzKSksdGhpcy5QbHVnaW5NYW5hZ2VyLmluaXRpYWxpemUoKSx0aGlzLnBhcnNlVmFsdWVzKCksXCJmdW5jdGlvblwiPT10eXBlb2YgdGhpcy5vcHRpb25zLnNldHVwJiZ0aGlzLm9wdGlvbnMuc2V0dXAodGhpcyksdGhpcy5vbihcImNsaWNrXCIsdGhpcy5vbkNsaWNrLmJpbmQodGhpcykpO2NvbnN0IGk9dGhpcy5vcHRpb25zLnNjcm9sbFRvRGF0ZT90aGlzLmdldERhdGUoKTpudWxsO3RoaXMucmVuZGVyQWxsKGkpfW9uKHQsZSxpPXt9KXt0aGlzLnVpLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKHQsZSxpKX1vZmYodCxlLGk9e30pe3RoaXMudWkuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIodCxlLGkpfXRyaWdnZXIodCxlPXt9KXtyZXR1cm4gdGhpcy51aS5jb250YWluZXIuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQodCx7ZGV0YWlsOmV9KSl9ZGVzdHJveSgpe3RoaXMub3B0aW9ucy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHRoaXMuYmluZHMuc2hvdyksXCJmdW5jdGlvblwiPT10eXBlb2YgdGhpcy5vcHRpb25zLmRvY3VtZW50Q2xpY2smJmRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHRoaXMub3B0aW9ucy5kb2N1bWVudENsaWNrLCEwKSxPYmplY3Qua2V5cyh0aGlzLlBsdWdpbk1hbmFnZXIuaW5zdGFuY2VzKS5mb3JFYWNoKCh0PT57dGhpcy5QbHVnaW5NYW5hZ2VyLnJlbW92ZUluc3RhbmNlKHQpfSkpLHRoaXMudWkud3JhcHBlci5yZW1vdmUoKX1vblJlbmRlcih0KXtjb25zdHt2aWV3OmUsZGF0ZTppfT10LmRldGFpbDt0aGlzLkNhbGVuZGFyLnJlbmRlcihpLGUpfW9uVmlldyh0KXtjb25zdHt2aWV3OmUsdGFyZ2V0Oml9PXQuZGV0YWlsO1wiRm9vdGVyXCI9PT1lJiZ0aGlzLmRhdGVQaWNrZWQubGVuZ3RoJiYoaS5xdWVyeVNlbGVjdG9yKFwiLmFwcGx5LWJ1dHRvblwiKS5kaXNhYmxlZD0hMSl9b25DbGlja0hlYWRlckJ1dHRvbih0KXt0aGlzLmlzQ2FsZW5kYXJIZWFkZXJCdXR0b24odCkmJih0LmNsYXNzTGlzdC5jb250YWlucyhcIm5leHQtYnV0dG9uXCIpP3RoaXMuY2FsZW5kYXJzWzBdLmFkZCgxLFwibW9udGhcIik6dGhpcy5jYWxlbmRhcnNbMF0uc3VidHJhY3QoMSxcIm1vbnRoXCIpLHRoaXMucmVuZGVyQWxsKHRoaXMuY2FsZW5kYXJzWzBdKSl9b25DbGlja0NhbGVuZGFyRGF5KGUpe2lmKHRoaXMuaXNDYWxlbmRhckRheShlKSl7Y29uc3QgaT1uZXcgdChlLmRhdGFzZXQudGltZSk7dGhpcy5vcHRpb25zLmF1dG9BcHBseT8odGhpcy5zZXREYXRlKGkpLHRoaXMudHJpZ2dlcihcInNlbGVjdFwiLHtkYXRlOnRoaXMuZ2V0RGF0ZSgpfSksdGhpcy5oaWRlKCkpOih0aGlzLmRhdGVQaWNrZWRbMF09aSx0aGlzLnRyaWdnZXIoXCJwcmVzZWxlY3RcIix7ZGF0ZTp0aGlzLmdldERhdGUoKX0pLHRoaXMucmVuZGVyQWxsKCkpfX1vbkNsaWNrQXBwbHlCdXR0b24odCl7aWYodGhpcy5pc0FwcGx5QnV0dG9uKHQpKXtpZih0aGlzLmRhdGVQaWNrZWRbMF1pbnN0YW5jZW9mIERhdGUpe2NvbnN0IHQ9dGhpcy5kYXRlUGlja2VkWzBdLmNsb25lKCk7dGhpcy5zZXREYXRlKHQpfXRoaXMuaGlkZSgpLHRoaXMudHJpZ2dlcihcInNlbGVjdFwiLHtkYXRlOnRoaXMuZ2V0RGF0ZSgpfSl9fW9uQ2xpY2tDYW5jZWxCdXR0b24odCl7dGhpcy5pc0NhbmNlbEJ1dHRvbih0KSYmdGhpcy5oaWRlKCl9b25DbGljayh0KXtjb25zdCBlPXQudGFyZ2V0O2lmKGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCl7Y29uc3QgdD1lLmNsb3Nlc3QoXCIudW5pdFwiKTtpZighKHQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpcmV0dXJuO3RoaXMub25DbGlja0hlYWRlckJ1dHRvbih0KSx0aGlzLm9uQ2xpY2tDYWxlbmRhckRheSh0KSx0aGlzLm9uQ2xpY2tBcHBseUJ1dHRvbih0KSx0aGlzLm9uQ2xpY2tDYW5jZWxCdXR0b24odCl9fWlzU2hvd24oKXtyZXR1cm4gdGhpcy51aS5jb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW5saW5lXCIpfHx0aGlzLnVpLmNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoXCJzaG93XCIpfXNob3codCl7aWYodGhpcy5pc1Nob3duKCkpcmV0dXJuO2NvbnN0IGU9dCYmXCJ0YXJnZXRcImluIHQ/dC50YXJnZXQ6dGhpcy5vcHRpb25zLmVsZW1lbnQse3RvcDppLGxlZnQ6bn09dGhpcy5hZGp1c3RQb3NpdGlvbihlKTt0aGlzLnVpLmNvbnRhaW5lci5zdHlsZS50b3A9YCR7aX1weGAsdGhpcy51aS5jb250YWluZXIuc3R5bGUubGVmdD1gJHtufXB4YCx0aGlzLnVpLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKSx0aGlzLnRyaWdnZXIoXCJzaG93XCIse3RhcmdldDplfSl9aGlkZSgpe3RoaXMudWkuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpLHRoaXMuZGF0ZVBpY2tlZC5sZW5ndGg9MCx0aGlzLnJlbmRlckFsbCgpLHRoaXMudHJpZ2dlcihcImhpZGVcIil9c2V0RGF0ZShlKXtjb25zdCBpPW5ldyB0KGUsdGhpcy5vcHRpb25zLmZvcm1hdCk7dGhpcy5vcHRpb25zLmRhdGU9aS5jbG9uZSgpLHRoaXMudXBkYXRlVmFsdWVzKCksdGhpcy5jYWxlbmRhcnMubGVuZ3RoJiZ0aGlzLnJlbmRlckFsbCgpfWdldERhdGUoKXtyZXR1cm4gdGhpcy5vcHRpb25zLmRhdGUgaW5zdGFuY2VvZiB0P3RoaXMub3B0aW9ucy5kYXRlLmNsb25lKCk6bnVsbH1wYXJzZVZhbHVlcygpe3RoaXMub3B0aW9ucy5kYXRlP3RoaXMuc2V0RGF0ZSh0aGlzLm9wdGlvbnMuZGF0ZSk6dGhpcy5vcHRpb25zLmVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50JiZ0aGlzLm9wdGlvbnMuZWxlbWVudC52YWx1ZS5sZW5ndGgmJnRoaXMuc2V0RGF0ZSh0aGlzLm9wdGlvbnMuZWxlbWVudC52YWx1ZSksdGhpcy5vcHRpb25zLmRhdGUgaW5zdGFuY2VvZiBEYXRlfHwodGhpcy5vcHRpb25zLmRhdGU9bnVsbCl9dXBkYXRlVmFsdWVzKCl7Y29uc3QgdD10aGlzLmdldERhdGUoKSxlPXQgaW5zdGFuY2VvZiBEYXRlP3QuZm9ybWF0KHRoaXMub3B0aW9ucy5mb3JtYXQsdGhpcy5vcHRpb25zLmxhbmcpOlwiXCIsaT10aGlzLm9wdGlvbnMuZWxlbWVudDtpIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudD9pLnZhbHVlPWU6aSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50JiYoaS5pbm5lclRleHQ9ZSl9aGlkZVBpY2tlcih0KXtsZXQgZT10LnRhcmdldCxpPW51bGw7ZS5zaGFkb3dSb290JiYoZT10LmNvbXBvc2VkUGF0aCgpWzBdLGk9ZS5nZXRSb290Tm9kZSgpLmhvc3QpLHRoaXMuaXNTaG93bigpJiZpIT09dGhpcy51aS53cmFwcGVyJiZlIT09dGhpcy5vcHRpb25zLmVsZW1lbnQmJnRoaXMuaGlkZSgpfXJlbmRlckFsbCh0KXt0aGlzLnRyaWdnZXIoXCJyZW5kZXJcIix7dmlldzpcIkNvbnRhaW5lclwiLGRhdGU6KHR8fHRoaXMuY2FsZW5kYXJzWzBdKS5jbG9uZSgpfSl9aXNDYWxlbmRhckhlYWRlckJ1dHRvbih0KXtyZXR1cm5bXCJwcmV2aW91cy1idXR0b25cIixcIm5leHQtYnV0dG9uXCJdLnNvbWUoKGU9PnQuY2xhc3NMaXN0LmNvbnRhaW5zKGUpKSl9aXNDYWxlbmRhckRheSh0KXtyZXR1cm4gdC5jbGFzc0xpc3QuY29udGFpbnMoXCJkYXlcIil9aXNBcHBseUJ1dHRvbih0KXtyZXR1cm4gdC5jbGFzc0xpc3QuY29udGFpbnMoXCJhcHBseS1idXR0b25cIil9aXNDYW5jZWxCdXR0b24odCl7cmV0dXJuIHQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2FuY2VsLWJ1dHRvblwiKX1nb3RvRGF0ZShlKXtjb25zdCBpPW5ldyB0KGUsdGhpcy5vcHRpb25zLmZvcm1hdCk7aS5zZXREYXRlKDEpLHRoaXMuY2FsZW5kYXJzWzBdPWkuY2xvbmUoKSx0aGlzLnJlbmRlckFsbCgpfWNsZWFyKCl7dGhpcy5vcHRpb25zLmRhdGU9bnVsbCx0aGlzLmRhdGVQaWNrZWQubGVuZ3RoPTAsdGhpcy51cGRhdGVWYWx1ZXMoKSx0aGlzLnJlbmRlckFsbCgpLHRoaXMudHJpZ2dlcihcImNsZWFyXCIpfWhhbmRsZU9wdGlvbnMoKXt0aGlzLm9wdGlvbnMuZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50fHwodGhpcy5vcHRpb25zLmVsZW1lbnQ9dGhpcy5vcHRpb25zLmRvYy5xdWVyeVNlbGVjdG9yKHRoaXMub3B0aW9ucy5lbGVtZW50KSksXCJmdW5jdGlvblwiPT10eXBlb2YgdGhpcy5vcHRpb25zLmRvY3VtZW50Q2xpY2smJmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHRoaXMub3B0aW9ucy5kb2N1bWVudENsaWNrLCEwKSx0aGlzLm9wdGlvbnMuZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQmJih0aGlzLm9wdGlvbnMuZWxlbWVudC5yZWFkT25seT10aGlzLm9wdGlvbnMucmVhZG9ubHkpLHRoaXMub3B0aW9ucy5kYXRlP3RoaXMuY2FsZW5kYXJzWzBdPW5ldyB0KHRoaXMub3B0aW9ucy5kYXRlLHRoaXMub3B0aW9ucy5mb3JtYXQpOnRoaXMuY2FsZW5kYXJzWzBdPW5ldyB0fWhhbmRsZUNTUygpe2lmKEFycmF5LmlzQXJyYXkodGhpcy5vcHRpb25zLmNzcykpdGhpcy5vcHRpb25zLmNzcy5mb3JFYWNoKCh0PT57Y29uc3QgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtlLmhyZWY9dCxlLnJlbD1cInN0eWxlc2hlZXRcIjtjb25zdCBpPSgpPT57dGhpcy5jc3NMb2FkZWQrKyx0aGlzLmNzc0xvYWRlZD09PXRoaXMub3B0aW9ucy5jc3MubGVuZ3RoJiYodGhpcy51aS53cmFwcGVyLnN0eWxlLmRpc3BsYXk9XCJcIil9O2UuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIixpKSxlLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLGkpLHRoaXMudWkuc2hhZG93Um9vdC5hcHBlbmQoZSl9KSk7ZWxzZSBpZihcInN0cmluZ1wiPT10eXBlb2YgdGhpcy5vcHRpb25zLmNzcyl7Y29uc3QgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIiksZT1kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLm9wdGlvbnMuY3NzKTt0LmFwcGVuZENoaWxkKGUpLHRoaXMudWkuc2hhZG93Um9vdC5hcHBlbmQodCksdGhpcy51aS53cmFwcGVyLnN0eWxlLmRpc3BsYXk9XCJcIn1lbHNlXCJmdW5jdGlvblwiPT10eXBlb2YgdGhpcy5vcHRpb25zLmNzcyYmKHRoaXMub3B0aW9ucy5jc3MuY2FsbCh0aGlzLHRoaXMpLHRoaXMudWkud3JhcHBlci5zdHlsZS5kaXNwbGF5PVwiXCIpfWFkanVzdFBvc2l0aW9uKHQpe2NvbnN0IGU9dC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxpPXRoaXMudWkud3JhcHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTt0aGlzLnVpLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY2FsY1wiKTtjb25zdCBuPXRoaXMudWkuY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO3RoaXMudWkuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJjYWxjXCIpO2xldCBzPWUuYm90dG9tLWkuYm90dG9tLG89ZS5sZWZ0LWkubGVmdDtyZXR1cm5cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiYod2luZG93LmlubmVySGVpZ2h0PHMrbi5oZWlnaHQmJnMtbi5oZWlnaHQ+PTAmJihzPWUudG9wLWkudG9wLW4uaGVpZ2h0KSx3aW5kb3cuaW5uZXJXaWR0aDxvK24ud2lkdGgmJmUucmlnaHQtbi53aWR0aD49MCYmKG89ZS5yaWdodC1pLnJpZ2h0LW4ud2lkdGgpKSx7bGVmdDpvLHRvcDpzfX19dmFyIHM9T2JqZWN0LmZyZWV6ZSh7X19wcm90b19fOm51bGwsQ29yZTpuLGNyZWF0ZTpufSk7Y2xhc3Mgb3twaWNrZXI7b3B0aW9ucztwcmlvcml0eT0wO2RlcGVuZGVuY2llcz1bXTthdHRhY2godCl7Y29uc3QgZT10aGlzLmdldE5hbWUoKSxpPXsuLi50aGlzLm9wdGlvbnN9O3RoaXMub3B0aW9ucz17Li4udGhpcy5vcHRpb25zLC4uLnQub3B0aW9uc1tlXXx8e319O2Zvcihjb25zdCBuIG9mIE9iamVjdC5rZXlzKGkpKWlmKG51bGwhPT1pW25dJiZcIm9iamVjdFwiPT10eXBlb2YgaVtuXSYmT2JqZWN0LmtleXMoaVtuXSkubGVuZ3RoJiZlIGluIHQub3B0aW9ucyYmbiBpbiB0Lm9wdGlvbnNbZV0pe2NvbnN0IHM9ey4uLnQub3B0aW9uc1tlXVtuXX07bnVsbCE9PXMmJlwib2JqZWN0XCI9PXR5cGVvZiBzJiZPYmplY3Qua2V5cyhzKS5sZW5ndGgmJk9iamVjdC5rZXlzKHMpLmV2ZXJ5KCh0PT5PYmplY3Qua2V5cyhpW25dKS5pbmNsdWRlcyh0KSkpJiYodGhpcy5vcHRpb25zW25dPXsuLi5pW25dLC4uLnN9KX1pZih0aGlzLnBpY2tlcj10LHRoaXMuZGVwZW5kZW5jaWVzTm90Rm91bmQoKSl7Y29uc3QgdD10aGlzLmRlcGVuZGVuY2llcy5maWx0ZXIoKHQ9PiF0aGlzLnBsdWdpbnNBc1N0cmluZ0FycmF5KCkuaW5jbHVkZXModCkpKTtyZXR1cm4gdm9pZCBjb25zb2xlLndhcm4oYCR7dGhpcy5nZXROYW1lKCl9OiByZXF1aXJlZCBkZXBlbmRlbmNpZXMgKCR7dC5qb2luKFwiLCBcIil9KS5gKX1jb25zdCBuPXRoaXMuY2FtZWxDYXNlVG9LZWJhYih0aGlzLmdldE5hbWUoKSk7dGhpcy5waWNrZXIudWkuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQobiksdGhpcy5vbkF0dGFjaCgpfWRldGFjaCgpe2NvbnN0IHQ9dGhpcy5jYW1lbENhc2VUb0tlYmFiKHRoaXMuZ2V0TmFtZSgpKTt0aGlzLnBpY2tlci51aS5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSh0KSxcImZ1bmN0aW9uXCI9PXR5cGVvZiB0aGlzLm9uRGV0YWNoJiZ0aGlzLm9uRGV0YWNoKCl9ZGVwZW5kZW5jaWVzTm90Rm91bmQoKXtyZXR1cm4gdGhpcy5kZXBlbmRlbmNpZXMubGVuZ3RoJiYhdGhpcy5kZXBlbmRlbmNpZXMuZXZlcnkoKHQ9PnRoaXMucGx1Z2luc0FzU3RyaW5nQXJyYXkoKS5pbmNsdWRlcyh0KSkpfXBsdWdpbnNBc1N0cmluZ0FycmF5KCl7cmV0dXJuIHRoaXMucGlja2VyLm9wdGlvbnMucGx1Z2lucy5tYXAoKHQ9PlwiZnVuY3Rpb25cIj09dHlwZW9mIHQ/KG5ldyB0KS5nZXROYW1lKCk6dCkpfWNhbWVsQ2FzZVRvS2ViYWIodCl7cmV0dXJuIHQucmVwbGFjZSgvKFthLXpBLVpdKSg/PVtBLVpdKS9nLFwiJDEtXCIpLnRvTG93ZXJDYXNlKCl9fWNsYXNzIGEgZXh0ZW5kcyBve3ByaW9yaXR5PTE7YmluZHM9e29uVmlldzp0aGlzLm9uVmlldy5iaW5kKHRoaXMpfTtvcHRpb25zPXttaW5EYXRlOm51bGwsbWF4RGF0ZTpudWxsLG1pbkRheXM6bnVsbCxtYXhEYXlzOm51bGwsc2VsZWN0Rm9yd2FyZDpudWxsLHNlbGVjdEJhY2t3YXJkOm51bGwscHJlc2V0czohMCxpbnNlcGFyYWJsZTohMSxmaWx0ZXI6bnVsbH07Z2V0TmFtZSgpe3JldHVyblwiTG9ja1BsdWdpblwifW9uQXR0YWNoKCl7aWYodGhpcy5vcHRpb25zLm1pbkRhdGUmJih0aGlzLm9wdGlvbnMubWluRGF0ZT1uZXcgdCh0aGlzLm9wdGlvbnMubWluRGF0ZSx0aGlzLnBpY2tlci5vcHRpb25zLmZvcm1hdCx0aGlzLnBpY2tlci5vcHRpb25zLmxhbmcpKSx0aGlzLm9wdGlvbnMubWF4RGF0ZSYmKHRoaXMub3B0aW9ucy5tYXhEYXRlPW5ldyB0KHRoaXMub3B0aW9ucy5tYXhEYXRlLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0LHRoaXMucGlja2VyLm9wdGlvbnMubGFuZyksdGhpcy5vcHRpb25zLm1heERhdGUgaW5zdGFuY2VvZiB0JiZ0aGlzLnBpY2tlci5vcHRpb25zLmNhbGVuZGFycz4xJiZ0aGlzLnBpY2tlci5jYWxlbmRhcnNbMF0uaXNTYW1lKHRoaXMub3B0aW9ucy5tYXhEYXRlLFwibW9udGhcIikpKXtjb25zdCB0PXRoaXMucGlja2VyLmNhbGVuZGFyc1swXS5jbG9uZSgpLnN1YnRyYWN0KDEsXCJtb250aFwiKTt0aGlzLnBpY2tlci5nb3RvRGF0ZSh0KX1pZigodGhpcy5vcHRpb25zLm1pbkRheXN8fHRoaXMub3B0aW9ucy5tYXhEYXlzfHx0aGlzLm9wdGlvbnMuc2VsZWN0Rm9yd2FyZHx8dGhpcy5vcHRpb25zLnNlbGVjdEJhY2t3YXJkKSYmIXRoaXMucGlja2VyLm9wdGlvbnMucGx1Z2lucy5pbmNsdWRlcyhcIlJhbmdlUGx1Z2luXCIpKXtjb25zdCB0PVtcIm1pbkRheXNcIixcIm1heERheXNcIixcInNlbGVjdEZvcndhcmRcIixcInNlbGVjdEJhY2t3YXJkXCJdO2NvbnNvbGUud2FybihgJHt0aGlzLmdldE5hbWUoKX06IG9wdGlvbnMgJHt0LmpvaW4oXCIsIFwiKX0gcmVxdWlyZWQgUmFuZ2VQbHVnaW4uYCl9dGhpcy5waWNrZXIub24oXCJ2aWV3XCIsdGhpcy5iaW5kcy5vblZpZXcpfW9uRGV0YWNoKCl7dGhpcy5waWNrZXIub2ZmKFwidmlld1wiLHRoaXMuYmluZHMub25WaWV3KX1vblZpZXcoZSl7Y29uc3R7dmlldzppLHRhcmdldDpuLGRhdGU6c309ZS5kZXRhaWw7aWYoXCJDYWxlbmRhckhlYWRlclwiPT09aSYmKHRoaXMub3B0aW9ucy5taW5EYXRlIGluc3RhbmNlb2YgdCYmcy5pc1NhbWVPckJlZm9yZSh0aGlzLm9wdGlvbnMubWluRGF0ZSxcIm1vbnRoXCIpJiZuLmNsYXNzTGlzdC5hZGQoXCJuby1wcmV2aW91cy1tb250aFwiKSx0aGlzLm9wdGlvbnMubWF4RGF0ZSBpbnN0YW5jZW9mIHQmJnMuaXNTYW1lT3JBZnRlcih0aGlzLm9wdGlvbnMubWF4RGF0ZSxcIm1vbnRoXCIpJiZuLmNsYXNzTGlzdC5hZGQoXCJuby1uZXh0LW1vbnRoXCIpKSxcIkNhbGVuZGFyRGF5XCI9PT1pKXtjb25zdCB0PXRoaXMucGlja2VyLmRhdGVQaWNrZWQubGVuZ3RoP3RoaXMucGlja2VyLmRhdGVQaWNrZWRbMF06bnVsbDtpZih0aGlzLnRlc3RGaWx0ZXIocykpcmV0dXJuIHZvaWQgbi5jbGFzc0xpc3QuYWRkKFwibG9ja2VkXCIpO2lmKHRoaXMub3B0aW9ucy5pbnNlcGFyYWJsZSl7aWYodGhpcy5vcHRpb25zLm1pbkRheXMpe2NvbnN0IHQ9cy5jbG9uZSgpLnN1YnRyYWN0KHRoaXMub3B0aW9ucy5taW5EYXlzLTEsXCJkYXlcIiksZT1zLmNsb25lKCkuYWRkKHRoaXMub3B0aW9ucy5taW5EYXlzLTEsXCJkYXlcIik7bGV0IGk9ITEsbz0hMTtmb3IoO3QuaXNCZWZvcmUocyxcImRheVwiKTspe2lmKHRoaXMudGVzdEZpbHRlcih0KSl7aT0hMDticmVha310LmFkZCgxLFwiZGF5XCIpfWZvcig7ZS5pc0FmdGVyKHMsXCJkYXlcIik7KXtpZih0aGlzLnRlc3RGaWx0ZXIoZSkpe289ITA7YnJlYWt9ZS5zdWJ0cmFjdCgxLFwiZGF5XCIpfWkmJm8mJm4uY2xhc3NMaXN0LmFkZChcIm5vdC1hdmFpbGFibGVcIil9dGhpcy5yYW5nZUlzTm90QXZhaWxhYmxlKHMsdCkmJm4uY2xhc3NMaXN0LmFkZChcIm5vdC1hdmFpbGFibGVcIil9dGhpcy5kYXRlSXNOb3RBdmFpbGFibGUocyx0KSYmbi5jbGFzc0xpc3QuYWRkKFwibm90LWF2YWlsYWJsZVwiKX1pZih0aGlzLm9wdGlvbnMucHJlc2V0cyYmXCJQcmVzZXRQbHVnaW5CdXR0b25cIj09PWkpe2NvbnN0IGU9bmV3IHQoTnVtYmVyKG4uZGF0YXNldC5zdGFydCkpLGk9bmV3IHQoTnVtYmVyKG4uZGF0YXNldC5lbmQpKSxzPWkuZGlmZihlLFwiZGF5XCIpLG89dGhpcy5vcHRpb25zLm1pbkRheXMmJnM8dGhpcy5vcHRpb25zLm1pbkRheXMsYT10aGlzLm9wdGlvbnMubWF4RGF5cyYmcz50aGlzLm9wdGlvbnMubWF4RGF5czsob3x8YXx8dGhpcy5sb2NrTWluRGF0ZShlKXx8dGhpcy5sb2NrTWF4RGF0ZShlKXx8dGhpcy5sb2NrTWluRGF0ZShpKXx8dGhpcy5sb2NrTWF4RGF0ZShpKXx8dGhpcy5yYW5nZUlzTm90QXZhaWxhYmxlKGUsaSkpJiZuLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsXCJkaXNhYmxlZFwiKX19ZGF0ZUlzTm90QXZhaWxhYmxlKHQsZSl7cmV0dXJuIHRoaXMubG9ja01pbkRhdGUodCl8fHRoaXMubG9ja01heERhdGUodCl8fHRoaXMubG9ja01pbkRheXModCxlKXx8dGhpcy5sb2NrTWF4RGF5cyh0LGUpfHx0aGlzLmxvY2tTZWxlY3RGb3J3YXJkKHQpfHx0aGlzLmxvY2tTZWxlY3RCYWNrd2FyZCh0KX1yYW5nZUlzTm90QXZhaWxhYmxlKHQsZSl7aWYoIXR8fCFlKXJldHVybiExO2NvbnN0IGk9KHQuaXNTYW1lT3JCZWZvcmUoZSxcImRheVwiKT90OmUpLmNsb25lKCksbj0oZS5pc1NhbWVPckFmdGVyKHQsXCJkYXlcIik/ZTp0KS5jbG9uZSgpO2Zvcig7aS5pc1NhbWVPckJlZm9yZShuLFwiZGF5XCIpOyl7aWYodGhpcy50ZXN0RmlsdGVyKGkpKXJldHVybiEwO2kuYWRkKDEsXCJkYXlcIil9cmV0dXJuITF9bG9ja01pbkRhdGUoZSl7cmV0dXJuIHRoaXMub3B0aW9ucy5taW5EYXRlIGluc3RhbmNlb2YgdCYmZS5pc0JlZm9yZSh0aGlzLm9wdGlvbnMubWluRGF0ZSxcImRheVwiKX1sb2NrTWF4RGF0ZShlKXtyZXR1cm4gdGhpcy5vcHRpb25zLm1heERhdGUgaW5zdGFuY2VvZiB0JiZlLmlzQWZ0ZXIodGhpcy5vcHRpb25zLm1heERhdGUsXCJkYXlcIil9bG9ja01pbkRheXModCxlKXtpZih0aGlzLm9wdGlvbnMubWluRGF5cyYmZSl7Y29uc3QgaT1lLmNsb25lKCkuc3VidHJhY3QodGhpcy5vcHRpb25zLm1pbkRheXMtMSxcImRheVwiKSxuPWUuY2xvbmUoKS5hZGQodGhpcy5vcHRpb25zLm1pbkRheXMtMSxcImRheVwiKTtyZXR1cm4gdC5pc0JldHdlZW4oaSxuKX1yZXR1cm4hMX1sb2NrTWF4RGF5cyh0LGUpe2lmKHRoaXMub3B0aW9ucy5tYXhEYXlzJiZlKXtjb25zdCBpPWUuY2xvbmUoKS5zdWJ0cmFjdCh0aGlzLm9wdGlvbnMubWF4RGF5cyxcImRheVwiKSxuPWUuY2xvbmUoKS5hZGQodGhpcy5vcHRpb25zLm1heERheXMsXCJkYXlcIik7cmV0dXJuIXQuaXNCZXR3ZWVuKGksbil9cmV0dXJuITF9bG9ja1NlbGVjdEZvcndhcmQodCl7aWYoMT09PXRoaXMucGlja2VyLmRhdGVQaWNrZWQubGVuZ3RoJiZ0aGlzLm9wdGlvbnMuc2VsZWN0Rm9yd2FyZCl7Y29uc3QgZT10aGlzLnBpY2tlci5kYXRlUGlja2VkWzBdLmNsb25lKCk7cmV0dXJuIHQuaXNCZWZvcmUoZSxcImRheVwiKX1yZXR1cm4hMX1sb2NrU2VsZWN0QmFja3dhcmQodCl7aWYoMT09PXRoaXMucGlja2VyLmRhdGVQaWNrZWQubGVuZ3RoJiZ0aGlzLm9wdGlvbnMuc2VsZWN0QmFja3dhcmQpe2NvbnN0IGU9dGhpcy5waWNrZXIuZGF0ZVBpY2tlZFswXS5jbG9uZSgpO3JldHVybiB0LmlzQWZ0ZXIoZSxcImRheVwiKX1yZXR1cm4hMX10ZXN0RmlsdGVyKHQpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIHRoaXMub3B0aW9ucy5maWx0ZXImJnRoaXMub3B0aW9ucy5maWx0ZXIodCx0aGlzLnBpY2tlci5kYXRlUGlja2VkKX19Y2xhc3MgciBleHRlbmRzIG97ZGVwZW5kZW5jaWVzPVtcIlJhbmdlUGx1Z2luXCJdO2JpbmRzPXtvblZpZXc6dGhpcy5vblZpZXcuYmluZCh0aGlzKSxvbkNsaWNrOnRoaXMub25DbGljay5iaW5kKHRoaXMpfTtvcHRpb25zPXtjdXN0b21MYWJlbHM6W1wiVG9kYXlcIixcIlllc3RlcmRheVwiLFwiTGFzdCA3IERheXNcIixcIkxhc3QgMzAgRGF5c1wiLFwiVGhpcyBNb250aFwiLFwiTGFzdCBNb250aFwiXSxjdXN0b21QcmVzZXQ6e30scG9zaXRpb246XCJsZWZ0XCJ9O2dldE5hbWUoKXtyZXR1cm5cIlByZXNldFBsdWdpblwifW9uQXR0YWNoKCl7aWYoIU9iamVjdC5rZXlzKHRoaXMub3B0aW9ucy5jdXN0b21QcmVzZXQpLmxlbmd0aCl7Y29uc3QgZT1uZXcgdCxpPSgpPT57Y29uc3QgaT1lLmNsb25lKCk7aS5zZXREYXRlKDEpO2NvbnN0IG49bmV3IERhdGUoZS5nZXRGdWxsWWVhcigpLGUuZ2V0TW9udGgoKSsxLDApO3JldHVybltuZXcgdChpKSxuZXcgdChuKV19LG49KCk9Pntjb25zdCBpPWUuY2xvbmUoKTtpLnNldE1vbnRoKGkuZ2V0TW9udGgoKS0xKSxpLnNldERhdGUoMSk7Y29uc3Qgbj1uZXcgRGF0ZShlLmdldEZ1bGxZZWFyKCksZS5nZXRNb250aCgpLDApO3JldHVybltuZXcgdChpKSxuZXcgdChuKV19LHM9W1tlLmNsb25lKCksZS5jbG9uZSgpXSxbZS5jbG9uZSgpLnN1YnRyYWN0KDEsXCJkYXlcIiksZS5jbG9uZSgpLnN1YnRyYWN0KDEsXCJkYXlcIildLFtlLmNsb25lKCkuc3VidHJhY3QoNixcImRheVwiKSxlLmNsb25lKCldLFtlLmNsb25lKCkuc3VidHJhY3QoMjksXCJkYXlcIiksZS5jbG9uZSgpXSxpKCksbigpXTtPYmplY3QudmFsdWVzKHRoaXMub3B0aW9ucy5jdXN0b21MYWJlbHMpLmZvckVhY2goKCh0LGUpPT57dGhpcy5vcHRpb25zLmN1c3RvbVByZXNldFt0XT1zW2VdfSkpfXRoaXMucGlja2VyLm9uKFwidmlld1wiLHRoaXMuYmluZHMub25WaWV3KSx0aGlzLnBpY2tlci5vbihcImNsaWNrXCIsdGhpcy5iaW5kcy5vbkNsaWNrKX1vbkRldGFjaCgpe3RoaXMucGlja2VyLm9mZihcInZpZXdcIix0aGlzLmJpbmRzLm9uVmlldyksdGhpcy5waWNrZXIub2ZmKFwiY2xpY2tcIix0aGlzLmJpbmRzLm9uQ2xpY2spfW9uVmlldyh0KXtjb25zdHt2aWV3OmUsdGFyZ2V0Oml9PXQuZGV0YWlsO2lmKFwiTWFpblwiPT09ZSl7Y29uc3QgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3QuY2xhc3NOYW1lPVwicHJlc2V0LXBsdWdpbi1jb250YWluZXJcIixPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnMuY3VzdG9tUHJlc2V0KS5mb3JFYWNoKChlPT57aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMub3B0aW9ucy5jdXN0b21QcmVzZXQsZSkpe2NvbnN0IGk9dGhpcy5vcHRpb25zLmN1c3RvbVByZXNldFtlXSxuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7bi5jbGFzc05hbWU9XCJwcmVzZXQtYnV0dG9uIHVuaXRcIixuLmlubmVySFRNTD1lLG4uZGF0YXNldC5zdGFydD1pWzBdLmdldFRpbWUoKSxuLmRhdGFzZXQuZW5kPWlbMV0uZ2V0VGltZSgpLHQuYXBwZW5kQ2hpbGQobiksdGhpcy5waWNrZXIudHJpZ2dlcihcInZpZXdcIix7dmlldzpcIlByZXNldFBsdWdpbkJ1dHRvblwiLHRhcmdldDpufSl9fSkpLGkuYXBwZW5kQ2hpbGQodCksaS5jbGFzc0xpc3QuYWRkKGBwcmVzZXQtJHt0aGlzLm9wdGlvbnMucG9zaXRpb259YCksdGhpcy5waWNrZXIudHJpZ2dlcihcInZpZXdcIix7dmlldzpcIlByZXNldFBsdWdpbkNvbnRhaW5lclwiLHRhcmdldDp0fSl9fW9uQ2xpY2soZSl7Y29uc3QgaT1lLnRhcmdldDtpZihpIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpe2NvbnN0IGU9aS5jbG9zZXN0KFwiLnVuaXRcIik7aWYoIShlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKXJldHVybjtpZih0aGlzLmlzUHJlc2V0QnV0dG9uKGUpKXtjb25zdCBpPW5ldyB0KE51bWJlcihlLmRhdGFzZXQuc3RhcnQpKSxuPW5ldyB0KE51bWJlcihlLmRhdGFzZXQuZW5kKSk7dGhpcy5waWNrZXIub3B0aW9ucy5hdXRvQXBwbHk/KHRoaXMucGlja2VyLnNldERhdGVSYW5nZShpLG4pLHRoaXMucGlja2VyLnRyaWdnZXIoXCJzZWxlY3RcIix7c3RhcnQ6dGhpcy5waWNrZXIuZ2V0U3RhcnREYXRlKCksZW5kOnRoaXMucGlja2VyLmdldEVuZERhdGUoKX0pLHRoaXMucGlja2VyLmhpZGUoKSk6KHRoaXMucGlja2VyLmRhdGVQaWNrZWQ9W2ksbl0sdGhpcy5waWNrZXIucmVuZGVyQWxsKCkpfX19aXNQcmVzZXRCdXR0b24odCl7cmV0dXJuIHQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicHJlc2V0LWJ1dHRvblwiKX19Y2xhc3MgYyBleHRlbmRzIG97dG9vbHRpcEVsZW1lbnQ7dHJpZ2dlckVsZW1lbnQ7YmluZHM9e3NldFN0YXJ0RGF0ZTp0aGlzLnNldFN0YXJ0RGF0ZS5iaW5kKHRoaXMpLHNldEVuZERhdGU6dGhpcy5zZXRFbmREYXRlLmJpbmQodGhpcyksc2V0RGF0ZVJhbmdlOnRoaXMuc2V0RGF0ZVJhbmdlLmJpbmQodGhpcyksZ2V0U3RhcnREYXRlOnRoaXMuZ2V0U3RhcnREYXRlLmJpbmQodGhpcyksZ2V0RW5kRGF0ZTp0aGlzLmdldEVuZERhdGUuYmluZCh0aGlzKSxvblZpZXc6dGhpcy5vblZpZXcuYmluZCh0aGlzKSxvblNob3c6dGhpcy5vblNob3cuYmluZCh0aGlzKSxvbk1vdXNlRW50ZXI6dGhpcy5vbk1vdXNlRW50ZXIuYmluZCh0aGlzKSxvbk1vdXNlTGVhdmU6dGhpcy5vbk1vdXNlTGVhdmUuYmluZCh0aGlzKSxvbkNsaWNrQ2FsZW5kYXJEYXk6dGhpcy5vbkNsaWNrQ2FsZW5kYXJEYXkuYmluZCh0aGlzKSxvbkNsaWNrQXBwbHlCdXR0b246dGhpcy5vbkNsaWNrQXBwbHlCdXR0b24uYmluZCh0aGlzKSxwYXJzZVZhbHVlczp0aGlzLnBhcnNlVmFsdWVzLmJpbmQodGhpcyksdXBkYXRlVmFsdWVzOnRoaXMudXBkYXRlVmFsdWVzLmJpbmQodGhpcyksY2xlYXI6dGhpcy5jbGVhci5iaW5kKHRoaXMpfTtvcHRpb25zPXtlbGVtZW50RW5kOm51bGwsc3RhcnREYXRlOm51bGwsZW5kRGF0ZTpudWxsLHJlcGljazohMSxzdHJpY3Q6ITAsZGVsaW1pdGVyOlwiIC0gXCIsdG9vbHRpcDohMCx0b29sdGlwTnVtYmVyOnQ9PnQsbG9jYWxlOnt6ZXJvOlwiXCIsb25lOlwiZGF5XCIsdHdvOlwiXCIsZmV3OlwiXCIsbWFueTpcIlwiLG90aGVyOlwiZGF5c1wifSxkb2N1bWVudENsaWNrOnRoaXMuaGlkZVBpY2tlci5iaW5kKHRoaXMpfTtnZXROYW1lKCl7cmV0dXJuXCJSYW5nZVBsdWdpblwifW9uQXR0YWNoKCl7dGhpcy5iaW5kcy5fc2V0U3RhcnREYXRlPXRoaXMucGlja2VyLnNldFN0YXJ0RGF0ZSx0aGlzLmJpbmRzLl9zZXRFbmREYXRlPXRoaXMucGlja2VyLnNldEVuZERhdGUsdGhpcy5iaW5kcy5fc2V0RGF0ZVJhbmdlPXRoaXMucGlja2VyLnNldERhdGVSYW5nZSx0aGlzLmJpbmRzLl9nZXRTdGFydERhdGU9dGhpcy5waWNrZXIuZ2V0U3RhcnREYXRlLHRoaXMuYmluZHMuX2dldEVuZERhdGU9dGhpcy5waWNrZXIuZ2V0RW5kRGF0ZSx0aGlzLmJpbmRzLl9wYXJzZVZhbHVlcz10aGlzLnBpY2tlci5wYXJzZVZhbHVlcyx0aGlzLmJpbmRzLl91cGRhdGVWYWx1ZXM9dGhpcy5waWNrZXIudXBkYXRlVmFsdWVzLHRoaXMuYmluZHMuX2NsZWFyPXRoaXMucGlja2VyLmNsZWFyLHRoaXMuYmluZHMuX29uQ2xpY2tDYWxlbmRhckRheT10aGlzLnBpY2tlci5vbkNsaWNrQ2FsZW5kYXJEYXksdGhpcy5iaW5kcy5fb25DbGlja0FwcGx5QnV0dG9uPXRoaXMucGlja2VyLm9uQ2xpY2tBcHBseUJ1dHRvbixPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLnBpY2tlcix7c2V0U3RhcnREYXRlOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5zZXRTdGFydERhdGV9LHNldEVuZERhdGU6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLnNldEVuZERhdGV9LHNldERhdGVSYW5nZTp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuc2V0RGF0ZVJhbmdlfSxnZXRTdGFydERhdGU6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLmdldFN0YXJ0RGF0ZX0sZ2V0RW5kRGF0ZTp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuZ2V0RW5kRGF0ZX0scGFyc2VWYWx1ZXM6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLnBhcnNlVmFsdWVzfSx1cGRhdGVWYWx1ZXM6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLnVwZGF0ZVZhbHVlc30sY2xlYXI6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLmNsZWFyfSxvbkNsaWNrQ2FsZW5kYXJEYXk6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLm9uQ2xpY2tDYWxlbmRhckRheX0sb25DbGlja0FwcGx5QnV0dG9uOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5vbkNsaWNrQXBwbHlCdXR0b259fSksdGhpcy5vcHRpb25zLmVsZW1lbnRFbmQmJih0aGlzLm9wdGlvbnMuZWxlbWVudEVuZCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50fHwodGhpcy5vcHRpb25zLmVsZW1lbnRFbmQ9dGhpcy5waWNrZXIub3B0aW9ucy5kb2MucXVlcnlTZWxlY3Rvcih0aGlzLm9wdGlvbnMuZWxlbWVudEVuZCkpLHRoaXMub3B0aW9ucy5lbGVtZW50RW5kIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCYmKHRoaXMub3B0aW9ucy5lbGVtZW50RW5kLnJlYWRPbmx5PXRoaXMucGlja2VyLm9wdGlvbnMucmVhZG9ubHkpLFwiZnVuY3Rpb25cIj09dHlwZW9mIHRoaXMucGlja2VyLm9wdGlvbnMuZG9jdW1lbnRDbGljayYmKGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHRoaXMucGlja2VyLm9wdGlvbnMuZG9jdW1lbnRDbGljaywhMCksXCJmdW5jdGlvblwiPT10eXBlb2YgdGhpcy5vcHRpb25zLmRvY3VtZW50Q2xpY2smJmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHRoaXMub3B0aW9ucy5kb2N1bWVudENsaWNrLCEwKSksdGhpcy5vcHRpb25zLmVsZW1lbnRFbmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsdGhpcy5waWNrZXIuc2hvdy5iaW5kKHRoaXMucGlja2VyKSkpLHRoaXMub3B0aW9ucy5yZXBpY2s9dGhpcy5vcHRpb25zLnJlcGljayYmdGhpcy5vcHRpb25zLmVsZW1lbnRFbmQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCx0aGlzLnBpY2tlci5vcHRpb25zLmRhdGU9bnVsbCx0aGlzLnBpY2tlci5vbihcInZpZXdcIix0aGlzLmJpbmRzLm9uVmlldyksdGhpcy5waWNrZXIub24oXCJzaG93XCIsdGhpcy5iaW5kcy5vblNob3cpLHRoaXMucGlja2VyLm9uKFwibW91c2VlbnRlclwiLHRoaXMuYmluZHMub25Nb3VzZUVudGVyLCEwKSx0aGlzLnBpY2tlci5vbihcIm1vdXNlbGVhdmVcIix0aGlzLmJpbmRzLm9uTW91c2VMZWF2ZSwhMCksdGhpcy5jaGVja0ludGxQbHVyYWxMb2NhbGVzKCl9b25EZXRhY2goKXtPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLnBpY2tlcix7c2V0U3RhcnREYXRlOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5fc2V0U3RhcnREYXRlfSxzZXRFbmREYXRlOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5fc2V0RW5kRGF0ZX0sc2V0RGF0ZVJhbmdlOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5fc2V0RGF0ZVJhbmdlfSxnZXRTdGFydERhdGU6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLl9nZXRTdGFydERhdGV9LGdldEVuZERhdGU6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLl9nZXRFbmREYXRlfSxwYXJzZVZhbHVlczp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuX3BhcnNlVmFsdWVzfSx1cGRhdGVWYWx1ZXM6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLl91cGRhdGVWYWx1ZXN9LGNsZWFyOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5fY2xlYXJ9LG9uQ2xpY2tDYWxlbmRhckRheTp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuX29uQ2xpY2tDYWxlbmRhckRheX0sb25DbGlja0FwcGx5QnV0dG9uOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5fb25DbGlja0FwcGx5QnV0dG9ufX0pLHRoaXMucGlja2VyLm9mZihcInZpZXdcIix0aGlzLmJpbmRzLm9uVmlldyksdGhpcy5waWNrZXIub2ZmKFwic2hvd1wiLHRoaXMuYmluZHMub25TaG93KSx0aGlzLnBpY2tlci5vZmYoXCJtb3VzZWVudGVyXCIsdGhpcy5iaW5kcy5vbk1vdXNlRW50ZXIsITApLHRoaXMucGlja2VyLm9mZihcIm1vdXNlbGVhdmVcIix0aGlzLmJpbmRzLm9uTW91c2VMZWF2ZSwhMCl9cGFyc2VWYWx1ZXMoKXtpZih0aGlzLm9wdGlvbnMuc3RhcnREYXRlfHx0aGlzLm9wdGlvbnMuZW5kRGF0ZSl0aGlzLm9wdGlvbnMuc3RyaWN0P3RoaXMub3B0aW9ucy5zdGFydERhdGUmJnRoaXMub3B0aW9ucy5lbmREYXRlP3RoaXMuc2V0RGF0ZVJhbmdlKHRoaXMub3B0aW9ucy5zdGFydERhdGUsdGhpcy5vcHRpb25zLmVuZERhdGUpOih0aGlzLm9wdGlvbnMuc3RhcnREYXRlPW51bGwsdGhpcy5vcHRpb25zLmVuZERhdGU9bnVsbCk6KHRoaXMub3B0aW9ucy5zdGFydERhdGUmJnRoaXMuc2V0U3RhcnREYXRlKHRoaXMub3B0aW9ucy5zdGFydERhdGUpLHRoaXMub3B0aW9ucy5lbmREYXRlJiZ0aGlzLnNldEVuZERhdGUodGhpcy5vcHRpb25zLmVuZERhdGUpKTtlbHNlIGlmKHRoaXMub3B0aW9ucy5lbGVtZW50RW5kKXRoaXMub3B0aW9ucy5zdHJpY3Q/dGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCYmdGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50LnZhbHVlLmxlbmd0aCYmdGhpcy5vcHRpb25zLmVsZW1lbnRFbmQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50JiZ0aGlzLm9wdGlvbnMuZWxlbWVudEVuZC52YWx1ZS5sZW5ndGgmJnRoaXMuc2V0RGF0ZVJhbmdlKHRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudC52YWx1ZSx0aGlzLm9wdGlvbnMuZWxlbWVudEVuZC52YWx1ZSk6KHRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQmJnRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudC52YWx1ZS5sZW5ndGgmJnRoaXMuc2V0U3RhcnREYXRlKHRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudC52YWx1ZSksdGhpcy5vcHRpb25zLmVsZW1lbnRFbmQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50JiZ0aGlzLm9wdGlvbnMuZWxlbWVudEVuZC52YWx1ZS5sZW5ndGgmJnRoaXMuc2V0RW5kRGF0ZSh0aGlzLm9wdGlvbnMuZWxlbWVudEVuZC52YWx1ZSkpO2Vsc2UgaWYodGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCYmdGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50LnZhbHVlLmxlbmd0aCl7Y29uc3RbdCxlXT10aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQudmFsdWUuc3BsaXQodGhpcy5vcHRpb25zLmRlbGltaXRlcik7dGhpcy5vcHRpb25zLnN0cmljdD90JiZlJiZ0aGlzLnNldERhdGVSYW5nZSh0LGUpOih0JiZ0aGlzLnNldFN0YXJ0RGF0ZSh0KSxlJiZ0aGlzLnNldEVuZERhdGUoZSkpfX11cGRhdGVWYWx1ZXMoKXtjb25zdCB0PXRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudCxlPXRoaXMub3B0aW9ucy5lbGVtZW50RW5kLGk9dGhpcy5waWNrZXIuZ2V0U3RhcnREYXRlKCksbj10aGlzLnBpY2tlci5nZXRFbmREYXRlKCkscz1pIGluc3RhbmNlb2YgRGF0ZT9pLmZvcm1hdCh0aGlzLnBpY2tlci5vcHRpb25zLmZvcm1hdCx0aGlzLnBpY2tlci5vcHRpb25zLmxhbmcpOlwiXCIsbz1uIGluc3RhbmNlb2YgRGF0ZT9uLmZvcm1hdCh0aGlzLnBpY2tlci5vcHRpb25zLmZvcm1hdCx0aGlzLnBpY2tlci5vcHRpb25zLmxhbmcpOlwiXCI7aWYoZSl0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudD90LnZhbHVlPXM6dCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50JiYodC5pbm5lclRleHQ9cyksZSBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQ/ZS52YWx1ZT1vOmUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCYmKGUuaW5uZXJUZXh0PW8pO2Vsc2V7Y29uc3QgZT1gJHtzfSR7c3x8bz90aGlzLm9wdGlvbnMuZGVsaW1pdGVyOlwiXCJ9JHtvfWA7dCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQ/dC52YWx1ZT1lOnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCYmKHQuaW5uZXJUZXh0PWUpfX1jbGVhcigpe3RoaXMub3B0aW9ucy5zdGFydERhdGU9bnVsbCx0aGlzLm9wdGlvbnMuZW5kRGF0ZT1udWxsLHRoaXMucGlja2VyLmRhdGVQaWNrZWQubGVuZ3RoPTAsdGhpcy51cGRhdGVWYWx1ZXMoKSx0aGlzLnBpY2tlci5yZW5kZXJBbGwoKSx0aGlzLnBpY2tlci50cmlnZ2VyKFwiY2xlYXJcIil9b25TaG93KHQpe2NvbnN0e3RhcmdldDplfT10LmRldGFpbDt0aGlzLnRyaWdnZXJFbGVtZW50PWUsdGhpcy5waWNrZXIub3B0aW9ucy5zY3JvbGxUb0RhdGUmJnRoaXMuZ2V0U3RhcnREYXRlKClpbnN0YW5jZW9mIERhdGUmJnRoaXMucGlja2VyLmdvdG9EYXRlKHRoaXMuZ2V0U3RhcnREYXRlKCkpLHRoaXMuaW5pdGlhbGl6ZVJlcGljaygpfW9uVmlldyhlKXtjb25zdHt2aWV3OmksdGFyZ2V0Om59PWUuZGV0YWlsO2lmKFwiTWFpblwiPT09aSYmKHRoaXMudG9vbHRpcEVsZW1lbnQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIiksdGhpcy50b29sdGlwRWxlbWVudC5jbGFzc05hbWU9XCJyYW5nZS1wbHVnaW4tdG9vbHRpcFwiLG4uYXBwZW5kQ2hpbGQodGhpcy50b29sdGlwRWxlbWVudCkpLFwiQ2FsZW5kYXJEYXlcIj09PWkpe2NvbnN0IGU9bmV3IHQobi5kYXRhc2V0LnRpbWUpLGk9dGhpcy5waWNrZXIuZGF0ZVBpY2tlZCxzPWkubGVuZ3RoP3RoaXMucGlja2VyLmRhdGVQaWNrZWRbMF06dGhpcy5nZXRTdGFydERhdGUoKSxvPWkubGVuZ3RoP3RoaXMucGlja2VyLmRhdGVQaWNrZWRbMV06dGhpcy5nZXRFbmREYXRlKCk7cyYmcy5pc1NhbWUoZSxcImRheVwiKSYmbi5jbGFzc0xpc3QuYWRkKFwic3RhcnRcIikscyYmbyYmKG8uaXNTYW1lKGUsXCJkYXlcIikmJm4uY2xhc3NMaXN0LmFkZChcImVuZFwiKSxlLmlzQmV0d2VlbihzLG8pJiZuLmNsYXNzTGlzdC5hZGQoXCJpbi1yYW5nZVwiKSl9aWYoXCJGb290ZXJcIj09PWkpe2NvbnN0IHQ9MT09PXRoaXMucGlja2VyLmRhdGVQaWNrZWQubGVuZ3RoJiYhdGhpcy5vcHRpb25zLnN0cmljdHx8Mj09PXRoaXMucGlja2VyLmRhdGVQaWNrZWQubGVuZ3RoO24ucXVlcnlTZWxlY3RvcihcIi5hcHBseS1idXR0b25cIikuZGlzYWJsZWQ9IXR9fWhpZGVQaWNrZXIodCl7bGV0IGU9dC50YXJnZXQsaT1udWxsO2Uuc2hhZG93Um9vdCYmKGU9dC5jb21wb3NlZFBhdGgoKVswXSxpPWUuZ2V0Um9vdE5vZGUoKS5ob3N0KSx0aGlzLnBpY2tlci5pc1Nob3duKCkmJmkhPT10aGlzLnBpY2tlci51aS53cmFwcGVyJiZlIT09dGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50JiZlIT09dGhpcy5vcHRpb25zLmVsZW1lbnRFbmQmJnRoaXMucGlja2VyLmhpZGUoKX1zZXRTdGFydERhdGUoZSl7Y29uc3QgaT1uZXcgdChlLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0KTt0aGlzLm9wdGlvbnMuc3RhcnREYXRlPWk/aS5jbG9uZSgpOm51bGwsdGhpcy51cGRhdGVWYWx1ZXMoKSx0aGlzLnBpY2tlci5yZW5kZXJBbGwoKX1zZXRFbmREYXRlKGUpe2NvbnN0IGk9bmV3IHQoZSx0aGlzLnBpY2tlci5vcHRpb25zLmZvcm1hdCk7dGhpcy5vcHRpb25zLmVuZERhdGU9aT9pLmNsb25lKCk6bnVsbCx0aGlzLnVwZGF0ZVZhbHVlcygpLHRoaXMucGlja2VyLnJlbmRlckFsbCgpfXNldERhdGVSYW5nZShlLGkpe2NvbnN0IG49bmV3IHQoZSx0aGlzLnBpY2tlci5vcHRpb25zLmZvcm1hdCkscz1uZXcgdChpLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0KTt0aGlzLm9wdGlvbnMuc3RhcnREYXRlPW4/bi5jbG9uZSgpOm51bGwsdGhpcy5vcHRpb25zLmVuZERhdGU9cz9zLmNsb25lKCk6bnVsbCx0aGlzLnVwZGF0ZVZhbHVlcygpLHRoaXMucGlja2VyLnJlbmRlckFsbCgpfWdldFN0YXJ0RGF0ZSgpe3JldHVybiB0aGlzLm9wdGlvbnMuc3RhcnREYXRlIGluc3RhbmNlb2YgRGF0ZT90aGlzLm9wdGlvbnMuc3RhcnREYXRlLmNsb25lKCk6bnVsbH1nZXRFbmREYXRlKCl7cmV0dXJuIHRoaXMub3B0aW9ucy5lbmREYXRlIGluc3RhbmNlb2YgRGF0ZT90aGlzLm9wdGlvbnMuZW5kRGF0ZS5jbG9uZSgpOm51bGx9b25Nb3VzZUVudGVyKGUpe2NvbnN0IGk9ZS50YXJnZXQ7aWYoaSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KXt0aGlzLmlzQ29udGFpbmVyKGkpJiZ0aGlzLmluaXRpYWxpemVSZXBpY2soKTtjb25zdCBlPWkuY2xvc2VzdChcIi51bml0XCIpO2lmKCEoZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSlyZXR1cm47aWYodGhpcy5waWNrZXIuaXNDYWxlbmRhckRheShlKSl7aWYoMSE9PXRoaXMucGlja2VyLmRhdGVQaWNrZWQubGVuZ3RoKXJldHVybjtsZXQgaT10aGlzLnBpY2tlci5kYXRlUGlja2VkWzBdLmNsb25lKCksbj1uZXcgdChlLmRhdGFzZXQudGltZSkscz0hMTtpZihpLmlzQWZ0ZXIobixcImRheVwiKSl7Y29uc3QgdD1pLmNsb25lKCk7aT1uLmNsb25lKCksbj10LmNsb25lKCkscz0hMH1pZihbLi4udGhpcy5waWNrZXIudWkuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZGF5XCIpXS5mb3JFYWNoKChvPT57Y29uc3QgYT1uZXcgdChvLmRhdGFzZXQudGltZSkscj10aGlzLnBpY2tlci5DYWxlbmRhci5nZXRDYWxlbmRhckRheVZpZXcoYSk7YS5pc0JldHdlZW4oaSxuKSYmci5jbGFzc0xpc3QuYWRkKFwiaW4tcmFuZ2VcIiksYS5pc1NhbWUodGhpcy5waWNrZXIuZGF0ZVBpY2tlZFswXSxcImRheVwiKSYmKHIuY2xhc3NMaXN0LmFkZChcInN0YXJ0XCIpLHIuY2xhc3NMaXN0LnRvZ2dsZShcImZsaXBwZWRcIixzKSksbz09PWUmJihyLmNsYXNzTGlzdC5hZGQoXCJlbmRcIiksci5jbGFzc0xpc3QudG9nZ2xlKFwiZmxpcHBlZFwiLHMpKSxvLmNsYXNzTmFtZT1yLmNsYXNzTmFtZX0pKSx0aGlzLm9wdGlvbnMudG9vbHRpcCl7Y29uc3QgdD10aGlzLm9wdGlvbnMudG9vbHRpcE51bWJlcihuLmRpZmYoaSxcImRheVwiKSsxKTtpZih0PjApe2NvbnN0IGk9bmV3IEludGwuUGx1cmFsUnVsZXModGhpcy5waWNrZXIub3B0aW9ucy5sYW5nKS5zZWxlY3QodCksbj1gJHt0fSAke3RoaXMub3B0aW9ucy5sb2NhbGVbaV19YDt0aGlzLnNob3dUb29sdGlwKGUsbil9ZWxzZSB0aGlzLmhpZGVUb29sdGlwKCl9fX19b25Nb3VzZUxlYXZlKHQpe2lmKHRoaXMuaXNDb250YWluZXIodC50YXJnZXQpJiZ0aGlzLm9wdGlvbnMucmVwaWNrKXtjb25zdCB0PXRoaXMuZ2V0U3RhcnREYXRlKCksZT10aGlzLmdldEVuZERhdGUoKTt0JiZlJiYodGhpcy5waWNrZXIuZGF0ZVBpY2tlZC5sZW5ndGg9MCx0aGlzLnBpY2tlci5yZW5kZXJBbGwoKSl9fW9uQ2xpY2tDYWxlbmRhckRheShlKXtpZih0aGlzLnBpY2tlci5pc0NhbGVuZGFyRGF5KGUpKXsyPT09dGhpcy5waWNrZXIuZGF0ZVBpY2tlZC5sZW5ndGgmJih0aGlzLnBpY2tlci5kYXRlUGlja2VkLmxlbmd0aD0wKTtjb25zdCBpPW5ldyB0KGUuZGF0YXNldC50aW1lKTtpZih0aGlzLnBpY2tlci5kYXRlUGlja2VkW3RoaXMucGlja2VyLmRhdGVQaWNrZWQubGVuZ3RoXT1pLDI9PT10aGlzLnBpY2tlci5kYXRlUGlja2VkLmxlbmd0aCYmdGhpcy5waWNrZXIuZGF0ZVBpY2tlZFswXS5pc0FmdGVyKHRoaXMucGlja2VyLmRhdGVQaWNrZWRbMV0pKXtjb25zdCB0PXRoaXMucGlja2VyLmRhdGVQaWNrZWRbMV0uY2xvbmUoKTt0aGlzLnBpY2tlci5kYXRlUGlja2VkWzFdPXRoaXMucGlja2VyLmRhdGVQaWNrZWRbMF0uY2xvbmUoKSx0aGlzLnBpY2tlci5kYXRlUGlja2VkWzBdPXQuY2xvbmUoKX0xIT09dGhpcy5waWNrZXIuZGF0ZVBpY2tlZC5sZW5ndGgmJnRoaXMucGlja2VyLm9wdGlvbnMuYXV0b0FwcGx5fHx0aGlzLnBpY2tlci50cmlnZ2VyKFwicHJlc2VsZWN0XCIse3N0YXJ0OnRoaXMucGlja2VyLmRhdGVQaWNrZWRbMF1pbnN0YW5jZW9mIERhdGU/dGhpcy5waWNrZXIuZGF0ZVBpY2tlZFswXS5jbG9uZSgpOm51bGwsZW5kOnRoaXMucGlja2VyLmRhdGVQaWNrZWRbMV1pbnN0YW5jZW9mIERhdGU/dGhpcy5waWNrZXIuZGF0ZVBpY2tlZFsxXS5jbG9uZSgpOm51bGx9KSwxPT09dGhpcy5waWNrZXIuZGF0ZVBpY2tlZC5sZW5ndGgmJighdGhpcy5vcHRpb25zLnN0cmljdCYmdGhpcy5waWNrZXIub3B0aW9ucy5hdXRvQXBwbHkmJih0aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQ9PT10aGlzLnRyaWdnZXJFbGVtZW50JiZ0aGlzLnNldFN0YXJ0RGF0ZSh0aGlzLnBpY2tlci5kYXRlUGlja2VkWzBdKSx0aGlzLm9wdGlvbnMuZWxlbWVudEVuZD09PXRoaXMudHJpZ2dlckVsZW1lbnQmJnRoaXMuc2V0RW5kRGF0ZSh0aGlzLnBpY2tlci5kYXRlUGlja2VkWzBdKSx0aGlzLnBpY2tlci50cmlnZ2VyKFwic2VsZWN0XCIse3N0YXJ0OnRoaXMucGlja2VyLmdldFN0YXJ0RGF0ZSgpLGVuZDp0aGlzLnBpY2tlci5nZXRFbmREYXRlKCl9KSksdGhpcy5waWNrZXIucmVuZGVyQWxsKCkpLDI9PT10aGlzLnBpY2tlci5kYXRlUGlja2VkLmxlbmd0aCYmKHRoaXMucGlja2VyLm9wdGlvbnMuYXV0b0FwcGx5Pyh0aGlzLnNldERhdGVSYW5nZSh0aGlzLnBpY2tlci5kYXRlUGlja2VkWzBdLHRoaXMucGlja2VyLmRhdGVQaWNrZWRbMV0pLHRoaXMucGlja2VyLnRyaWdnZXIoXCJzZWxlY3RcIix7c3RhcnQ6dGhpcy5waWNrZXIuZ2V0U3RhcnREYXRlKCksZW5kOnRoaXMucGlja2VyLmdldEVuZERhdGUoKX0pLHRoaXMucGlja2VyLmhpZGUoKSk6KHRoaXMuaGlkZVRvb2x0aXAoKSx0aGlzLnBpY2tlci5yZW5kZXJBbGwoKSkpfX1vbkNsaWNrQXBwbHlCdXR0b24odCl7dGhpcy5waWNrZXIuaXNBcHBseUJ1dHRvbih0KSYmKDEhPT10aGlzLnBpY2tlci5kYXRlUGlja2VkLmxlbmd0aHx8dGhpcy5vcHRpb25zLnN0cmljdHx8KHRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudD09PXRoaXMudHJpZ2dlckVsZW1lbnQmJih0aGlzLm9wdGlvbnMuZW5kRGF0ZT1udWxsLHRoaXMuc2V0U3RhcnREYXRlKHRoaXMucGlja2VyLmRhdGVQaWNrZWRbMF0pKSx0aGlzLm9wdGlvbnMuZWxlbWVudEVuZD09PXRoaXMudHJpZ2dlckVsZW1lbnQmJih0aGlzLm9wdGlvbnMuc3RhcnREYXRlPW51bGwsdGhpcy5zZXRFbmREYXRlKHRoaXMucGlja2VyLmRhdGVQaWNrZWRbMF0pKSksMj09PXRoaXMucGlja2VyLmRhdGVQaWNrZWQubGVuZ3RoJiZ0aGlzLnNldERhdGVSYW5nZSh0aGlzLnBpY2tlci5kYXRlUGlja2VkWzBdLHRoaXMucGlja2VyLmRhdGVQaWNrZWRbMV0pLHRoaXMucGlja2VyLnRyaWdnZXIoXCJzZWxlY3RcIix7c3RhcnQ6dGhpcy5waWNrZXIuZ2V0U3RhcnREYXRlKCksZW5kOnRoaXMucGlja2VyLmdldEVuZERhdGUoKX0pLHRoaXMucGlja2VyLmhpZGUoKSl9c2hvd1Rvb2x0aXAodCxlKXt0aGlzLnRvb2x0aXBFbGVtZW50LnN0eWxlLnZpc2liaWxpdHk9XCJ2aXNpYmxlXCIsdGhpcy50b29sdGlwRWxlbWVudC5pbm5lckhUTUw9ZTtjb25zdCBpPXRoaXMucGlja2VyLnVpLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxuPXRoaXMudG9vbHRpcEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkscz10LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO2xldCBvPXMudG9wLGE9cy5sZWZ0O28tPWkudG9wLGEtPWkubGVmdCxvLT1uLmhlaWdodCxhLT1uLndpZHRoLzIsYSs9cy53aWR0aC8yLHRoaXMudG9vbHRpcEVsZW1lbnQuc3R5bGUudG9wPWAke299cHhgLHRoaXMudG9vbHRpcEVsZW1lbnQuc3R5bGUubGVmdD1gJHthfXB4YH1oaWRlVG9vbHRpcCgpe3RoaXMudG9vbHRpcEVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eT1cImhpZGRlblwifWNoZWNrSW50bFBsdXJhbExvY2FsZXMoKXtpZighdGhpcy5vcHRpb25zLnRvb2x0aXApcmV0dXJuO2NvbnN0IHQ9Wy4uLm5ldyBTZXQoW25ldyBJbnRsLlBsdXJhbFJ1bGVzKHRoaXMucGlja2VyLm9wdGlvbnMubGFuZykuc2VsZWN0KDApLG5ldyBJbnRsLlBsdXJhbFJ1bGVzKHRoaXMucGlja2VyLm9wdGlvbnMubGFuZykuc2VsZWN0KDEpLG5ldyBJbnRsLlBsdXJhbFJ1bGVzKHRoaXMucGlja2VyLm9wdGlvbnMubGFuZykuc2VsZWN0KDIpLG5ldyBJbnRsLlBsdXJhbFJ1bGVzKHRoaXMucGlja2VyLm9wdGlvbnMubGFuZykuc2VsZWN0KDYpLG5ldyBJbnRsLlBsdXJhbFJ1bGVzKHRoaXMucGlja2VyLm9wdGlvbnMubGFuZykuc2VsZWN0KDE4KV0pXSxlPU9iamVjdC5rZXlzKHRoaXMub3B0aW9ucy5sb2NhbGUpO3QuZXZlcnkoKHQ9PmUuaW5jbHVkZXModCkpKXx8Y29uc29sZS53YXJuKGAke3RoaXMuZ2V0TmFtZSgpfTogcHJvdmlkZSBsb2NhbGVzICgke3Quam9pbihcIiwgXCIpfSkgZm9yIGNvcnJlY3QgdG9vbHRpcCB0ZXh0LmApfWluaXRpYWxpemVSZXBpY2soKXtpZighdGhpcy5vcHRpb25zLnJlcGljaylyZXR1cm47Y29uc3QgdD10aGlzLmdldFN0YXJ0RGF0ZSgpLGU9dGhpcy5nZXRFbmREYXRlKCk7ZSYmdGhpcy50cmlnZ2VyRWxlbWVudD09PXRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudCYmKHRoaXMucGlja2VyLmRhdGVQaWNrZWRbMF09ZSksdCYmdGhpcy50cmlnZ2VyRWxlbWVudD09PXRoaXMub3B0aW9ucy5lbGVtZW50RW5kJiYodGhpcy5waWNrZXIuZGF0ZVBpY2tlZFswXT10KX1pc0NvbnRhaW5lcih0KXtyZXR1cm4gdD09PXRoaXMucGlja2VyLnVpLmNvbnRhaW5lcn19Y2xhc3MgbCBleHRlbmRzIG97b3B0aW9ucz17bmF0aXZlOiExLHNlY29uZHM6ITEsc3RlcEhvdXJzOjEsc3RlcE1pbnV0ZXM6NSxzdGVwU2Vjb25kczo1LGZvcm1hdDEyOiExfTtyYW5nZVBsdWdpbjt0aW1lUGlja2VkPXtpbnB1dDpudWxsLHN0YXJ0Om51bGwsZW5kOm51bGx9O3RpbWVQcmVQaWNrZWQ9e2lucHV0Om51bGwsc3RhcnQ6bnVsbCxlbmQ6bnVsbH07YmluZHM9e2dldERhdGU6dGhpcy5nZXREYXRlLmJpbmQodGhpcyksZ2V0U3RhcnREYXRlOnRoaXMuZ2V0U3RhcnREYXRlLmJpbmQodGhpcyksZ2V0RW5kRGF0ZTp0aGlzLmdldEVuZERhdGUuYmluZCh0aGlzKSxvblZpZXc6dGhpcy5vblZpZXcuYmluZCh0aGlzKSxvbklucHV0OnRoaXMub25JbnB1dC5iaW5kKHRoaXMpLG9uQ2hhbmdlOnRoaXMub25DaGFuZ2UuYmluZCh0aGlzKSxvbkNsaWNrOnRoaXMub25DbGljay5iaW5kKHRoaXMpLHNldFRpbWU6dGhpcy5zZXRUaW1lLmJpbmQodGhpcyksc2V0U3RhcnRUaW1lOnRoaXMuc2V0U3RhcnRUaW1lLmJpbmQodGhpcyksc2V0RW5kVGltZTp0aGlzLnNldEVuZFRpbWUuYmluZCh0aGlzKX07Z2V0TmFtZSgpe3JldHVyblwiVGltZVBsdWdpblwifW9uQXR0YWNoKCl7dGhpcy5iaW5kcy5fZ2V0RGF0ZT10aGlzLnBpY2tlci5nZXREYXRlLHRoaXMuYmluZHMuX2dldFN0YXJ0RGF0ZT10aGlzLnBpY2tlci5nZXRTdGFydERhdGUsdGhpcy5iaW5kcy5fZ2V0RW5kRGF0ZT10aGlzLnBpY2tlci5nZXRFbmREYXRlLE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMucGlja2VyLHtnZXREYXRlOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5nZXREYXRlfSxnZXRTdGFydERhdGU6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLmdldFN0YXJ0RGF0ZX0sZ2V0RW5kRGF0ZTp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuZ2V0RW5kRGF0ZX0sc2V0VGltZTp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuc2V0VGltZX0sc2V0U3RhcnRUaW1lOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5zZXRTdGFydFRpbWV9LHNldEVuZFRpbWU6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLnNldEVuZFRpbWV9fSksdGhpcy5yYW5nZVBsdWdpbj10aGlzLnBpY2tlci5QbHVnaW5NYW5hZ2VyLmdldEluc3RhbmNlKFwiUmFuZ2VQbHVnaW5cIiksdGhpcy5wYXJzZVZhbHVlcygpLHRoaXMucGlja2VyLm9uKFwidmlld1wiLHRoaXMuYmluZHMub25WaWV3KSx0aGlzLnBpY2tlci5vbihcImlucHV0XCIsdGhpcy5iaW5kcy5vbklucHV0KSx0aGlzLnBpY2tlci5vbihcImNoYW5nZVwiLHRoaXMuYmluZHMub25DaGFuZ2UpLHRoaXMucGlja2VyLm9uKFwiY2xpY2tcIix0aGlzLmJpbmRzLm9uQ2xpY2spfW9uRGV0YWNoKCl7ZGVsZXRlIHRoaXMucGlja2VyLnNldFRpbWUsZGVsZXRlIHRoaXMucGlja2VyLnNldFN0YXJ0VGltZSxkZWxldGUgdGhpcy5waWNrZXIuc2V0RW5kVGltZSxPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLnBpY2tlcix7Z2V0RGF0ZTp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuX2dldERhdGV9LGdldFN0YXJ0RGF0ZTp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuX2dldFN0YXJ0RGF0ZX0sZ2V0RW5kRGF0ZTp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuX2dldEVuZERhdGV9fSksdGhpcy5waWNrZXIub2ZmKFwidmlld1wiLHRoaXMuYmluZHMub25WaWV3KSx0aGlzLnBpY2tlci5vZmYoXCJpbnB1dFwiLHRoaXMuYmluZHMub25JbnB1dCksdGhpcy5waWNrZXIub2ZmKFwiY2hhbmdlXCIsdGhpcy5iaW5kcy5vbkNoYW5nZSksdGhpcy5waWNrZXIub2ZmKFwiY2xpY2tcIix0aGlzLmJpbmRzLm9uQ2xpY2spfW9uVmlldyh0KXtjb25zdHt2aWV3OmUsdGFyZ2V0Oml9PXQuZGV0YWlsO2lmKFwiTWFpblwiPT09ZSl7dGhpcy5yYW5nZVBsdWdpbj10aGlzLnBpY2tlci5QbHVnaW5NYW5hZ2VyLmdldEluc3RhbmNlKFwiUmFuZ2VQbHVnaW5cIik7Y29uc3QgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2lmKHQuY2xhc3NOYW1lPVwidGltZS1wbHVnaW4tY29udGFpbmVyXCIsdGhpcy5yYW5nZVBsdWdpbil7Y29uc3QgZT10aGlzLmdldFN0YXJ0SW5wdXQoKTt0LmFwcGVuZENoaWxkKGUpLHRoaXMucGlja2VyLnRyaWdnZXIoXCJ2aWV3XCIse3ZpZXc6XCJUaW1lUGx1Z2luSW5wdXRcIix0YXJnZXQ6ZX0pO2NvbnN0IGk9dGhpcy5nZXRFbmRJbnB1dCgpO3QuYXBwZW5kQ2hpbGQoaSksdGhpcy5waWNrZXIudHJpZ2dlcihcInZpZXdcIix7dmlldzpcIlRpbWVQbHVnaW5JbnB1dFwiLHRhcmdldDppfSl9ZWxzZXtjb25zdCBlPXRoaXMuZ2V0U2luZ2xlSW5wdXQoKTt0LmFwcGVuZENoaWxkKGUpLHRoaXMucGlja2VyLnRyaWdnZXIoXCJ2aWV3XCIse3ZpZXc6XCJUaW1lUGx1Z2luSW5wdXRcIix0YXJnZXQ6ZX0pfWkuYXBwZW5kQ2hpbGQodCksdGhpcy5waWNrZXIudHJpZ2dlcihcInZpZXdcIix7dmlldzpcIlRpbWVQbHVnaW5Db250YWluZXJcIix0YXJnZXQ6dH0pfX1vbklucHV0KGUpe2NvbnN0IGk9ZS50YXJnZXQ7aWYoaSBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQmJmkuY2xhc3NMaXN0LmNvbnRhaW5zKFwidGltZS1wbHVnaW4taW5wdXRcIikpe2NvbnN0IGU9dGhpcy50aW1lUGlja2VkW2kubmFtZV18fG5ldyB0LFtuLHNdPWkudmFsdWUuc3BsaXQoXCI6XCIpO2Uuc2V0SG91cnMoTnVtYmVyKG4pfHwwLE51bWJlcihzKXx8MCwwLDApLHRoaXMucGlja2VyLm9wdGlvbnMuYXV0b0FwcGx5Pyh0aGlzLnRpbWVQaWNrZWRbaS5uYW1lXT1lLHRoaXMucGlja2VyLnVwZGF0ZVZhbHVlcygpKTp0aGlzLnRpbWVQcmVQaWNrZWRbaS5uYW1lXT1lfX1vbkNoYW5nZShlKXtjb25zdCBpPWUudGFyZ2V0O2lmKGkgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCYmaS5jbGFzc0xpc3QuY29udGFpbnMoXCJ0aW1lLXBsdWdpbi1jdXN0b20taW5wdXRcIikpe2NvbnN0IGU9LyhcXHcrKVxcWyhcXHcrKVxcXS8sWyxuLHNdPWkubmFtZS5tYXRjaChlKSxvPU51bWJlcihpLnZhbHVlKTtsZXQgYT1uZXcgdDtzd2l0Y2goIXRoaXMucGlja2VyLm9wdGlvbnMuYXV0b0FwcGx5JiZ0aGlzLnRpbWVQcmVQaWNrZWRbbl1pbnN0YW5jZW9mIERhdGU/YT10aGlzLnRpbWVQcmVQaWNrZWRbbl0uY2xvbmUoKTp0aGlzLnRpbWVQaWNrZWRbbl1pbnN0YW5jZW9mIERhdGUmJihhPXRoaXMudGltZVBpY2tlZFtuXS5jbG9uZSgpKSxzKXtjYXNlXCJISFwiOmlmKHRoaXMub3B0aW9ucy5mb3JtYXQxMil7Y29uc3QgdD1pLmNsb3Nlc3QoXCIudGltZS1wbHVnaW4tY3VzdG9tLWJsb2NrXCIpLnF1ZXJ5U2VsZWN0b3IoYHNlbGVjdFtuYW1lPVwiJHtufVtwZXJpb2RdXCJdYCkudmFsdWUsZT10aGlzLmhhbmRsZUZvcm1hdDEyKHQsYSxvKTthLnNldEhvdXJzKGUuZ2V0SG91cnMoKSxlLmdldE1pbnV0ZXMoKSxlLmdldFNlY29uZHMoKSwwKX1lbHNlIGEuc2V0SG91cnMobyxhLmdldE1pbnV0ZXMoKSxhLmdldFNlY29uZHMoKSwwKTticmVhaztjYXNlXCJtbVwiOmEuc2V0SG91cnMoYS5nZXRIb3VycygpLG8sYS5nZXRTZWNvbmRzKCksMCk7YnJlYWs7Y2FzZVwic3NcIjphLnNldEhvdXJzKGEuZ2V0SG91cnMoKSxhLmdldE1pbnV0ZXMoKSxvLDApO2JyZWFrO2Nhc2VcInBlcmlvZFwiOmlmKHRoaXMub3B0aW9ucy5mb3JtYXQxMil7Y29uc3QgdD1pLmNsb3Nlc3QoXCIudGltZS1wbHVnaW4tY3VzdG9tLWJsb2NrXCIpLnF1ZXJ5U2VsZWN0b3IoYHNlbGVjdFtuYW1lPVwiJHtufVtISF1cIl1gKS52YWx1ZSxlPXRoaXMuaGFuZGxlRm9ybWF0MTIoaS52YWx1ZSxhLE51bWJlcih0KSk7YS5zZXRIb3VycyhlLmdldEhvdXJzKCksZS5nZXRNaW51dGVzKCksZS5nZXRTZWNvbmRzKCksMCl9fWlmKHRoaXMucGlja2VyLm9wdGlvbnMuYXV0b0FwcGx5KXRoaXMudGltZVBpY2tlZFtuXT1hLHRoaXMucGlja2VyLnVwZGF0ZVZhbHVlcygpO2Vsc2V7dGhpcy50aW1lUHJlUGlja2VkW25dPWE7Y29uc3QgdD10aGlzLnBpY2tlci51aS5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5hcHBseS1idXR0b25cIik7aWYodGhpcy5yYW5nZVBsdWdpbil7Y29uc3QgZT10aGlzLnJhbmdlUGx1Z2luLm9wdGlvbnMsaT10aGlzLnBpY2tlci5kYXRlUGlja2VkLG49ZS5zdHJpY3QmJjI9PT1pLmxlbmd0aHx8IWUuc3RyaWN0JiZpLmxlbmd0aD4wfHwhaS5sZW5ndGgmJmUuc3RyaWN0JiZlLnN0YXJ0RGF0ZSBpbnN0YW5jZW9mIERhdGUmJmUuZW5kRGF0ZSBpbnN0YW5jZW9mIERhdGV8fCFpLmxlbmd0aCYmIWUuc3RyaWN0JiYoZS5zdGFydERhdGUgaW5zdGFuY2VvZiBEYXRlfHxlLmVuZERhdGUgaW5zdGFuY2VvZiBEYXRlKTt0LmRpc2FibGVkPSFufWVsc2UgdGhpcy5waWNrZXIuZGF0ZVBpY2tlZC5sZW5ndGgmJih0LmRpc2FibGVkPSExKX19fW9uQ2xpY2sodCl7Y29uc3QgZT10LnRhcmdldDtpZihlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpe2NvbnN0IHQ9ZS5jbG9zZXN0KFwiLnVuaXRcIik7aWYoISh0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKXJldHVybjt0aGlzLnBpY2tlci5pc0FwcGx5QnV0dG9uKHQpJiYoT2JqZWN0LmtleXModGhpcy50aW1lUGlja2VkKS5mb3JFYWNoKCh0PT57dGhpcy50aW1lUHJlUGlja2VkW3RdaW5zdGFuY2VvZiBEYXRlJiYodGhpcy50aW1lUGlja2VkW3RdPXRoaXMudGltZVByZVBpY2tlZFt0XS5jbG9uZSgpKX0pKSx0aGlzLnBpY2tlci51cGRhdGVWYWx1ZXMoKSx0aGlzLnRpbWVQcmVQaWNrZWQ9e2lucHV0Om51bGwsc3RhcnQ6bnVsbCxlbmQ6bnVsbH0pLHRoaXMucGlja2VyLmlzQ2FuY2VsQnV0dG9uKHQpJiYodGhpcy50aW1lUHJlUGlja2VkPXtpbnB1dDpudWxsLHN0YXJ0Om51bGwsZW5kOm51bGx9LHRoaXMucGlja2VyLnJlbmRlckFsbCgpKX19c2V0VGltZSh0KXtjb25zdCBlPXRoaXMuaGFuZGxlVGltZVN0cmluZyh0KTt0aGlzLnRpbWVQaWNrZWQuaW5wdXQ9ZS5jbG9uZSgpLHRoaXMucGlja2VyLnJlbmRlckFsbCgpLHRoaXMucGlja2VyLnVwZGF0ZVZhbHVlcygpfXNldFN0YXJ0VGltZSh0KXtjb25zdCBlPXRoaXMuaGFuZGxlVGltZVN0cmluZyh0KTt0aGlzLnRpbWVQaWNrZWQuc3RhcnQ9ZS5jbG9uZSgpLHRoaXMucGlja2VyLnJlbmRlckFsbCgpLHRoaXMucGlja2VyLnVwZGF0ZVZhbHVlcygpfXNldEVuZFRpbWUodCl7Y29uc3QgZT10aGlzLmhhbmRsZVRpbWVTdHJpbmcodCk7dGhpcy50aW1lUGlja2VkLmVuZD1lLmNsb25lKCksdGhpcy5waWNrZXIucmVuZGVyQWxsKCksdGhpcy5waWNrZXIudXBkYXRlVmFsdWVzKCl9aGFuZGxlVGltZVN0cmluZyhlKXtjb25zdCBpPW5ldyB0LFtuLHMsb109ZS5zcGxpdChcIjpcIikubWFwKCh0PT5OdW1iZXIodCkpKSxhPW4mJiFOdW1iZXIuaXNOYU4obik/bjowLHI9cyYmIU51bWJlci5pc05hTihzKT9zOjAsYz1vJiYhTnVtYmVyLmlzTmFOKG8pP286MDtyZXR1cm4gaS5zZXRIb3VycyhhLHIsYywwKSxpfWdldERhdGUoKXtpZih0aGlzLnBpY2tlci5vcHRpb25zLmRhdGUgaW5zdGFuY2VvZiBEYXRlKXtjb25zdCBlPW5ldyB0KHRoaXMucGlja2VyLm9wdGlvbnMuZGF0ZSx0aGlzLnBpY2tlci5vcHRpb25zLmZvcm1hdCk7aWYodGhpcy50aW1lUGlja2VkLmlucHV0IGluc3RhbmNlb2YgRGF0ZSl7Y29uc3QgdD10aGlzLnRpbWVQaWNrZWQuaW5wdXQ7ZS5zZXRIb3Vycyh0LmdldEhvdXJzKCksdC5nZXRNaW51dGVzKCksdC5nZXRTZWNvbmRzKCksMCl9cmV0dXJuIGV9cmV0dXJuIG51bGx9Z2V0U3RhcnREYXRlKCl7aWYodGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLnN0YXJ0RGF0ZSBpbnN0YW5jZW9mIERhdGUpe2NvbnN0IGU9bmV3IHQodGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLnN0YXJ0RGF0ZSx0aGlzLnBpY2tlci5vcHRpb25zLmZvcm1hdCk7aWYodGhpcy50aW1lUGlja2VkLnN0YXJ0IGluc3RhbmNlb2YgRGF0ZSl7Y29uc3QgdD10aGlzLnRpbWVQaWNrZWQuc3RhcnQ7ZS5zZXRIb3Vycyh0LmdldEhvdXJzKCksdC5nZXRNaW51dGVzKCksdC5nZXRTZWNvbmRzKCksMCl9cmV0dXJuIGV9cmV0dXJuIG51bGx9Z2V0RW5kRGF0ZSgpe2lmKHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5lbmREYXRlIGluc3RhbmNlb2YgRGF0ZSl7Y29uc3QgZT1uZXcgdCh0aGlzLnJhbmdlUGx1Z2luLm9wdGlvbnMuZW5kRGF0ZSx0aGlzLnBpY2tlci5vcHRpb25zLmZvcm1hdCk7aWYodGhpcy50aW1lUGlja2VkLmVuZCBpbnN0YW5jZW9mIERhdGUpe2NvbnN0IHQ9dGhpcy50aW1lUGlja2VkLmVuZDtlLnNldEhvdXJzKHQuZ2V0SG91cnMoKSx0LmdldE1pbnV0ZXMoKSx0LmdldFNlY29uZHMoKSwwKX1yZXR1cm4gZX1yZXR1cm4gbnVsbH1nZXRTaW5nbGVJbnB1dCgpe3JldHVybiB0aGlzLm9wdGlvbnMubmF0aXZlP3RoaXMuZ2V0TmF0aXZlSW5wdXQoXCJpbnB1dFwiKTp0aGlzLmdldEN1c3RvbUlucHV0KFwiaW5wdXRcIil9Z2V0U3RhcnRJbnB1dCgpe3JldHVybiB0aGlzLm9wdGlvbnMubmF0aXZlP3RoaXMuZ2V0TmF0aXZlSW5wdXQoXCJzdGFydFwiKTp0aGlzLmdldEN1c3RvbUlucHV0KFwic3RhcnRcIil9Z2V0RW5kSW5wdXQoKXtyZXR1cm4gdGhpcy5vcHRpb25zLm5hdGl2ZT90aGlzLmdldE5hdGl2ZUlucHV0KFwiZW5kXCIpOnRoaXMuZ2V0Q3VzdG9tSW5wdXQoXCJlbmRcIil9Z2V0TmF0aXZlSW5wdXQodCl7Y29uc3QgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7ZS50eXBlPVwidGltZVwiLGUubmFtZT10LGUuY2xhc3NOYW1lPVwidGltZS1wbHVnaW4taW5wdXQgdW5pdFwiO2NvbnN0IGk9dGhpcy50aW1lUGlja2VkW3RdO2lmKGkpe2NvbnN0IHQ9YDAke2kuZ2V0SG91cnMoKX1gLnNsaWNlKC0yKSxuPWAwJHtpLmdldE1pbnV0ZXMoKX1gLnNsaWNlKC0yKTtlLnZhbHVlPWAke3R9OiR7bn1gfXJldHVybiBlfWdldEN1c3RvbUlucHV0KHQpe2NvbnN0IGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtlLmNsYXNzTmFtZT1cInRpbWUtcGx1Z2luLWN1c3RvbS1ibG9ja1wiO2NvbnN0IGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtpLmNsYXNzTmFtZT1cInRpbWUtcGx1Z2luLWN1c3RvbS1pbnB1dCB1bml0XCIsaS5uYW1lPWAke3R9W0hIXWA7Y29uc3Qgbj10aGlzLm9wdGlvbnMuZm9ybWF0MTI/MTowLHM9dGhpcy5vcHRpb25zLmZvcm1hdDEyPzEzOjI0O2xldCBvPW51bGw7IXRoaXMucGlja2VyLm9wdGlvbnMuYXV0b0FwcGx5JiZ0aGlzLnRpbWVQcmVQaWNrZWRbdF1pbnN0YW5jZW9mIERhdGU/bz10aGlzLnRpbWVQcmVQaWNrZWRbdF0uY2xvbmUoKTp0aGlzLnRpbWVQaWNrZWRbdF1pbnN0YW5jZW9mIERhdGUmJihvPXRoaXMudGltZVBpY2tlZFt0XS5jbG9uZSgpKTtmb3IobGV0IHQ9bjt0PHM7dCs9dGhpcy5vcHRpb25zLnN0ZXBIb3Vycyl7Y29uc3QgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO2UudmFsdWU9U3RyaW5nKHQpLGUudGV4dD1TdHJpbmcodCksbyYmKHRoaXMub3B0aW9ucy5mb3JtYXQxMj8oby5nZXRIb3VycygpJTEyP28uZ2V0SG91cnMoKSUxMjoxMik9PT10JiYoZS5zZWxlY3RlZD0hMCk6by5nZXRIb3VycygpPT09dCYmKGUuc2VsZWN0ZWQ9ITApKSxpLmFwcGVuZENoaWxkKGUpfWUuYXBwZW5kQ2hpbGQoaSk7Y29uc3QgYT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO2EuY2xhc3NOYW1lPVwidGltZS1wbHVnaW4tY3VzdG9tLWlucHV0IHVuaXRcIixhLm5hbWU9YCR7dH1bbW1dYDtmb3IobGV0IHQ9MDt0PDYwO3QrPXRoaXMub3B0aW9ucy5zdGVwTWludXRlcyl7Y29uc3QgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO2UudmFsdWU9YDAke1N0cmluZyh0KX1gLnNsaWNlKC0yKSxlLnRleHQ9YDAke1N0cmluZyh0KX1gLnNsaWNlKC0yKSxvJiZvLmdldE1pbnV0ZXMoKT09PXQmJihlLnNlbGVjdGVkPSEwKSxhLmFwcGVuZENoaWxkKGUpfWlmKGUuYXBwZW5kQ2hpbGQoYSksdGhpcy5vcHRpb25zLnNlY29uZHMpe2NvbnN0IGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtpLmNsYXNzTmFtZT1cInRpbWUtcGx1Z2luLWN1c3RvbS1pbnB1dCB1bml0XCIsaS5uYW1lPWAke3R9W3NzXWA7Y29uc3Qgbj02MDtmb3IobGV0IHQ9MDt0PG47dCs9dGhpcy5vcHRpb25zLnN0ZXBTZWNvbmRzKXtjb25zdCBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7ZS52YWx1ZT1gMCR7U3RyaW5nKHQpfWAuc2xpY2UoLTIpLGUudGV4dD1gMCR7U3RyaW5nKHQpfWAuc2xpY2UoLTIpLG8mJm8uZ2V0U2Vjb25kcygpPT09dCYmKGUuc2VsZWN0ZWQ9ITApLGkuYXBwZW5kQ2hpbGQoZSl9ZS5hcHBlbmRDaGlsZChpKX1pZih0aGlzLm9wdGlvbnMuZm9ybWF0MTIpe2NvbnN0IGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtpLmNsYXNzTmFtZT1cInRpbWUtcGx1Z2luLWN1c3RvbS1pbnB1dCB1bml0XCIsaS5uYW1lPWAke3R9W3BlcmlvZF1gLFtcIkFNXCIsXCJQTVwiXS5mb3JFYWNoKCh0PT57Y29uc3QgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO2UudmFsdWU9dCxlLnRleHQ9dCxvJiZcIlBNXCI9PT10JiZvLmdldEhvdXJzKCk+PTEyJiYoZS5zZWxlY3RlZD0hMCksaS5hcHBlbmRDaGlsZChlKX0pKSxlLmFwcGVuZENoaWxkKGkpfXJldHVybiBlfWhhbmRsZUZvcm1hdDEyKHQsZSxpKXtjb25zdCBuPWUuY2xvbmUoKTtzd2l0Y2godCl7Y2FzZVwiQU1cIjoxMj09PWk/bi5zZXRIb3VycygwLG4uZ2V0TWludXRlcygpLG4uZ2V0U2Vjb25kcygpLDApOm4uc2V0SG91cnMoaSxuLmdldE1pbnV0ZXMoKSxuLmdldFNlY29uZHMoKSwwKTticmVhaztjYXNlXCJQTVwiOjEyIT09aT9uLnNldEhvdXJzKGkrMTIsbi5nZXRNaW51dGVzKCksbi5nZXRTZWNvbmRzKCksMCk6bi5zZXRIb3VycyhpLG4uZ2V0TWludXRlcygpLG4uZ2V0U2Vjb25kcygpLDApfXJldHVybiBufXBhcnNlVmFsdWVzKCl7aWYodGhpcy5yYW5nZVBsdWdpbil7aWYodGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLnN0cmljdCl7aWYodGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLnN0YXJ0RGF0ZSYmdGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLmVuZERhdGUpe2NvbnN0IGU9bmV3IHQodGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLnN0YXJ0RGF0ZSx0aGlzLnBpY2tlci5vcHRpb25zLmZvcm1hdCksaT1uZXcgdCh0aGlzLnJhbmdlUGx1Z2luLm9wdGlvbnMuZW5kRGF0ZSx0aGlzLnBpY2tlci5vcHRpb25zLmZvcm1hdCk7dGhpcy50aW1lUGlja2VkLnN0YXJ0PWUuY2xvbmUoKSx0aGlzLnRpbWVQaWNrZWQuZW5kPWkuY2xvbmUoKX19ZWxzZXtpZih0aGlzLnJhbmdlUGx1Z2luLm9wdGlvbnMuc3RhcnREYXRlKXtjb25zdCBlPW5ldyB0KHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5zdGFydERhdGUsdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQpO3RoaXMudGltZVBpY2tlZC5zdGFydD1lLmNsb25lKCl9aWYodGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLmVuZERhdGUpe2NvbnN0IGU9bmV3IHQodGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLmVuZERhdGUsdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQpO3RoaXMudGltZVBpY2tlZC5lbmQ9ZS5jbG9uZSgpfX1pZih0aGlzLnJhbmdlUGx1Z2luLm9wdGlvbnMuZWxlbWVudEVuZClpZih0aGlzLnJhbmdlUGx1Z2luLm9wdGlvbnMuc3RyaWN0KXtpZih0aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50JiZ0aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQudmFsdWUubGVuZ3RoJiZ0aGlzLnJhbmdlUGx1Z2luLm9wdGlvbnMuZWxlbWVudEVuZCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQmJnRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5lbGVtZW50RW5kLnZhbHVlLmxlbmd0aCl7Y29uc3QgZT1uZXcgdCh0aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQudmFsdWUsdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQpLGk9bmV3IHQodGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLmVsZW1lbnRFbmQudmFsdWUsdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQpO3RoaXMudGltZVBpY2tlZC5zdGFydD1lLmNsb25lKCksdGhpcy50aW1lUGlja2VkLmVuZD1pLmNsb25lKCl9fWVsc2V7aWYodGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCYmdGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50LnZhbHVlLmxlbmd0aCl7Y29uc3QgZT1uZXcgdCh0aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQudmFsdWUsdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQpO3RoaXMudGltZVBpY2tlZC5zdGFydD1lLmNsb25lKCl9aWYodGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLmVsZW1lbnRFbmQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50JiZ0aGlzLnJhbmdlUGx1Z2luLm9wdGlvbnMuZWxlbWVudEVuZC52YWx1ZS5sZW5ndGgpe2NvbnN0IGU9bmV3IHQodGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLmVsZW1lbnRFbmQudmFsdWUsdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQpO3RoaXMudGltZVBpY2tlZC5zdGFydD1lLmNsb25lKCl9fWVsc2UgaWYodGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCYmdGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50LnZhbHVlLmxlbmd0aCl7Y29uc3RbZSxpXT10aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQudmFsdWUuc3BsaXQodGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLmRlbGltaXRlcik7aWYodGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLnN0cmljdCl7aWYoZSYmaSl7Y29uc3Qgbj1uZXcgdChlLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0KSxzPW5ldyB0KGksdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQpO3RoaXMudGltZVBpY2tlZC5zdGFydD1uLmNsb25lKCksdGhpcy50aW1lUGlja2VkLmVuZD1zLmNsb25lKCl9fWVsc2V7aWYoZSl7Y29uc3QgaT1uZXcgdChlLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0KTt0aGlzLnRpbWVQaWNrZWQuc3RhcnQ9aS5jbG9uZSgpfWlmKGkpe2NvbnN0IGU9bmV3IHQoaSx0aGlzLnBpY2tlci5vcHRpb25zLmZvcm1hdCk7dGhpcy50aW1lUGlja2VkLnN0YXJ0PWUuY2xvbmUoKX19fX1lbHNle2lmKHRoaXMucGlja2VyLm9wdGlvbnMuZGF0ZSl7Y29uc3QgZT1uZXcgdCh0aGlzLnBpY2tlci5vcHRpb25zLmRhdGUsdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQpO3RoaXMudGltZVBpY2tlZC5pbnB1dD1lLmNsb25lKCl9aWYodGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCYmdGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50LnZhbHVlLmxlbmd0aCl7Y29uc3QgZT1uZXcgdCh0aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQudmFsdWUsdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQpO3RoaXMudGltZVBpY2tlZC5pbnB1dD1lLmNsb25lKCl9fX19Y2xhc3MgaCBleHRlbmRzIG97ZG9jRWxlbWVudD1udWxsO3JhbmdlUGx1Z2luO2JpbmRzPXtvblZpZXc6dGhpcy5vblZpZXcuYmluZCh0aGlzKSxvbktleWRvd246dGhpcy5vbktleWRvd24uYmluZCh0aGlzKX07b3B0aW9ucz17dW5pdEluZGV4OjEsZGF5SW5kZXg6Mn07Z2V0TmFtZSgpe3JldHVyblwiS2JkUGx1Z2luXCJ9b25BdHRhY2goKXtjb25zdCB0PXRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudCxlPXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7aWYodGhpcy5kb2NFbGVtZW50PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpLHRoaXMuZG9jRWxlbWVudC5zdHlsZS5wb3NpdGlvbj1cImFic29sdXRlXCIsdGhpcy5kb2NFbGVtZW50LnN0eWxlLnRvcD1gJHt0Lm9mZnNldFRvcH1weGAsdGhpcy5kb2NFbGVtZW50LnN0eWxlLmxlZnQ9dC5vZmZzZXRMZWZ0K2Uud2lkdGgtMjUrXCJweFwiLHRoaXMuZG9jRWxlbWVudC5hdHRhY2hTaGFkb3coe21vZGU6XCJvcGVuXCJ9KSx0aGlzLm9wdGlvbnMuaHRtbCl0aGlzLmRvY0VsZW1lbnQuc2hhZG93Um9vdC5pbm5lckhUTUw9dGhpcy5vcHRpb25zLmh0bWw7ZWxzZXtjb25zdCB0PWBcXG4gICAgICA8c3R5bGU+XFxuICAgICAgYnV0dG9uIHtcXG4gICAgICAgIGJvcmRlcjogbm9uZTtcXG4gICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgICAgICAgZm9udC1zaXplOiAke3dpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudCkuZm9udFNpemV9O1xcbiAgICAgIH1cXG4gICAgICA8L3N0eWxlPlxcblxcbiAgICAgIDxidXR0b24+JiMxMjgxOTc7PC9idXR0b24+XFxuICAgICAgYDt0aGlzLmRvY0VsZW1lbnQuc2hhZG93Um9vdC5pbm5lckhUTUw9dH1jb25zdCBpPXRoaXMuZG9jRWxlbWVudC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIik7aSYmKGkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsKHQ9Pnt0LnByZXZlbnREZWZhdWx0KCksdGhpcy5waWNrZXIuc2hvdyh7dGFyZ2V0OnRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudH0pfSkse2NhcHR1cmU6ITB9KSxpLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsKHQ9PntcIkVzY2FwZVwiPT09dC5jb2RlJiZ0aGlzLnBpY2tlci5oaWRlKCl9KSx7Y2FwdHVyZTohMH0pKSx0aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQuYWZ0ZXIodGhpcy5kb2NFbGVtZW50KSx0aGlzLnBpY2tlci5vbihcInZpZXdcIix0aGlzLmJpbmRzLm9uVmlldyksdGhpcy5waWNrZXIub24oXCJrZXlkb3duXCIsdGhpcy5iaW5kcy5vbktleWRvd24pfW9uRGV0YWNoKCl7dGhpcy5kb2NFbGVtZW50JiZ0aGlzLmRvY0VsZW1lbnQuaXNDb25uZWN0ZWQmJnRoaXMuZG9jRWxlbWVudC5yZW1vdmUoKSx0aGlzLnBpY2tlci5vZmYoXCJ2aWV3XCIsdGhpcy5iaW5kcy5vblZpZXcpLHRoaXMucGlja2VyLm9mZihcImtleWRvd25cIix0aGlzLmJpbmRzLm9uS2V5ZG93bil9b25WaWV3KHQpe2NvbnN0e3ZpZXc6ZSx0YXJnZXQ6aX09dC5kZXRhaWw7aSYmXCJxdWVyeVNlbGVjdG9yXCJpbiBpJiYoXCJDYWxlbmRhckRheVwiIT09ZXx8W1wibG9ja2VkXCIsXCJub3QtYXZhaWxhYmxlXCJdLnNvbWUoKHQ9PmkuY2xhc3NMaXN0LmNvbnRhaW5zKHQpKSk/Wy4uLmkucXVlcnlTZWxlY3RvckFsbChcIi51bml0Om5vdCguZGF5KVwiKV0uZm9yRWFjaCgodD0+dC50YWJJbmRleD10aGlzLm9wdGlvbnMudW5pdEluZGV4KSk6aS50YWJJbmRleD10aGlzLm9wdGlvbnMuZGF5SW5kZXgpfW9uS2V5ZG93bih0KXtzd2l0Y2godGhpcy5vbk1vdXNlRW50ZXIodCksdC5jb2RlKXtjYXNlXCJBcnJvd1VwXCI6Y2FzZVwiQXJyb3dEb3duXCI6dGhpcy52ZXJ0aWNhbE1vdmUodCk7YnJlYWs7Y2FzZVwiQXJyb3dMZWZ0XCI6Y2FzZVwiQXJyb3dSaWdodFwiOnRoaXMuaG9yaXpvbnRhbE1vdmUodCk7YnJlYWs7Y2FzZVwiRW50ZXJcIjpjYXNlXCJTcGFjZVwiOnRoaXMuaGFuZGxlRW50ZXIodCk7YnJlYWs7Y2FzZVwiRXNjYXBlXCI6dGhpcy5waWNrZXIuaGlkZSgpfX1maW5kQWxsb3dhYmxlRGF5U2libGluZyh0LGUsaSl7Y29uc3Qgbj1BcnJheS5mcm9tKHQucXVlcnlTZWxlY3RvckFsbChgLmRheVt0YWJpbmRleD1cIiR7dGhpcy5vcHRpb25zLmRheUluZGV4fVwiXWApKSxzPW4uaW5kZXhPZihlKTtyZXR1cm4gbi5maWx0ZXIoKCh0LGUpPT5pKGUscykmJnQudGFiSW5kZXg9PT10aGlzLm9wdGlvbnMuZGF5SW5kZXgpKVswXX1jaGFuZ2VNb250aCh0KXtjb25zdCBlPXtBcnJvd0xlZnQ6XCJwcmV2aW91c1wiLEFycm93UmlnaHQ6XCJuZXh0XCJ9LGk9dGhpcy5waWNrZXIudWkuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoYC4ke2VbdC5jb2RlXX0tYnV0dG9uW3RhYmluZGV4PVwiJHt0aGlzLm9wdGlvbnMudW5pdEluZGV4fVwiXWApO2kmJiFpLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGBuby0ke2VbdC5jb2RlXX0tbW9udGhgKSYmKGkuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjbGlja1wiLHtidWJibGVzOiEwfSkpLHNldFRpbWVvdXQoKCgpPT57bGV0IGU9bnVsbDtzd2l0Y2godC5jb2RlKXtjYXNlXCJBcnJvd0xlZnRcIjpjb25zdCB0PXRoaXMucGlja2VyLnVpLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKGAuZGF5W3RhYmluZGV4PVwiJHt0aGlzLm9wdGlvbnMuZGF5SW5kZXh9XCJdYCk7ZT10W3QubGVuZ3RoLTFdO2JyZWFrO2Nhc2VcIkFycm93UmlnaHRcIjplPXRoaXMucGlja2VyLnVpLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKGAuZGF5W3RhYmluZGV4PVwiJHt0aGlzLm9wdGlvbnMuZGF5SW5kZXh9XCJdYCl9ZSYmZS5mb2N1cygpfSkpKX12ZXJ0aWNhbE1vdmUodCl7Y29uc3QgZT10LnRhcmdldDtpZihlLmNsYXNzTGlzdC5jb250YWlucyhcImRheVwiKSl7dC5wcmV2ZW50RGVmYXVsdCgpO2NvbnN0IGk9dGhpcy5maW5kQWxsb3dhYmxlRGF5U2libGluZyh0aGlzLnBpY2tlci51aS5jb250YWluZXIsZSwoKGUsaSk9PmU9PT0oXCJBcnJvd1VwXCI9PT10LmNvZGU/aS03OmkrNykpKTtpJiZpLmZvY3VzKCl9fWhvcml6b250YWxNb3ZlKHQpe2NvbnN0IGU9dC50YXJnZXQ7aWYoZS5jbGFzc0xpc3QuY29udGFpbnMoXCJkYXlcIikpe3QucHJldmVudERlZmF1bHQoKTtjb25zdCBpPXRoaXMuZmluZEFsbG93YWJsZURheVNpYmxpbmcodGhpcy5waWNrZXIudWkuY29udGFpbmVyLGUsKChlLGkpPT5lPT09KFwiQXJyb3dMZWZ0XCI9PT10LmNvZGU/aS0xOmkrMSkpKTtpP2kuZm9jdXMoKTp0aGlzLmNoYW5nZU1vbnRoKHQpfX1oYW5kbGVFbnRlcih0KXtjb25zdCBlPXQudGFyZ2V0O2UuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGF5XCIpJiYodC5wcmV2ZW50RGVmYXVsdCgpLGUuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjbGlja1wiLHtidWJibGVzOiEwfSkpLHNldFRpbWVvdXQoKCgpPT57aWYodGhpcy5yYW5nZVBsdWdpbj10aGlzLnBpY2tlci5QbHVnaW5NYW5hZ2VyLmdldEluc3RhbmNlKFwiUmFuZ2VQbHVnaW5cIiksdGhpcy5yYW5nZVBsdWdpbnx8IXRoaXMucGlja2VyLm9wdGlvbnMuYXV0b0FwcGx5KXtjb25zdCB0PXRoaXMucGlja2VyLnVpLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmRheS5zZWxlY3RlZFwiKTt0JiZzZXRUaW1lb3V0KCgoKT0+e3QuZm9jdXMoKX0pKX19KSkpfW9uTW91c2VFbnRlcih0KXt0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJkYXlcIikmJnNldFRpbWVvdXQoKCgpPT57Y29uc3QgdD10aGlzLnBpY2tlci51aS5zaGFkb3dSb290LmFjdGl2ZUVsZW1lbnQ7dCYmdC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcIm1vdXNlZW50ZXJcIix7YnViYmxlczohMH0pKX0pKX19Y2xhc3MgZCBleHRlbmRzIG97cmFuZ2VQbHVnaW47bG9ja1BsdWdpbjtwcmlvcml0eT0xMDtiaW5kcz17b25WaWV3OnRoaXMub25WaWV3LmJpbmQodGhpcyksb25Db2xvclNjaGVtZTp0aGlzLm9uQ29sb3JTY2hlbWUuYmluZCh0aGlzKX07b3B0aW9ucz17ZHJvcGRvd246e21vbnRoczohMSx5ZWFyczohMSxtaW5ZZWFyOjE5NTAsbWF4WWVhcjpudWxsfSxkYXJrTW9kZTohMCxsb2NhbGU6e3Jlc2V0QnV0dG9uOic8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBoZWlnaHQ9XCIyNFwiIHdpZHRoPVwiMjRcIj48cGF0aCBkPVwiTTEzIDNjLTQuOTcgMC05IDQuMDMtOSA5SDFsMy44OSAzLjg5LjA3LjE0TDkgMTJINmMwLTMuODcgMy4xMy03IDctN3M3IDMuMTMgNyA3LTMuMTMgNy03IDdjLTEuOTMgMC0zLjY4LS43OS00Ljk0LTIuMDZsLTEuNDIgMS40MkM4LjI3IDE5Ljk5IDEwLjUxIDIxIDEzIDIxYzQuOTcgMCA5LTQuMDMgOS05cy00LjAzLTktOS05em0tMSA1djVsNC4yOCAyLjU0LjcyLTEuMjEtMy41LTIuMDhWOEgxMnpcIi8+PC9zdmc+J319O21hdGNoTWVkaWE7Z2V0TmFtZSgpe3JldHVyblwiQW1wUGx1Z2luXCJ9b25BdHRhY2goKXt0aGlzLm9wdGlvbnMuZGFya01vZGUmJndpbmRvdyYmXCJtYXRjaE1lZGlhXCJpbiB3aW5kb3cmJih0aGlzLm1hdGNoTWVkaWE9d2luZG93Lm1hdGNoTWVkaWEoXCIocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspXCIpLHRoaXMubWF0Y2hNZWRpYS5tYXRjaGVzJiYodGhpcy5waWNrZXIudWkuY29udGFpbmVyLmRhdGFzZXQudGhlbWU9XCJkYXJrXCIpLHRoaXMubWF0Y2hNZWRpYS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsdGhpcy5iaW5kcy5vbkNvbG9yU2NoZW1lKSksdGhpcy5vcHRpb25zLndlZWtOdW1iZXJzJiZ0aGlzLnBpY2tlci51aS5jb250YWluZXIuY2xhc3NMaXN0LmFkZChcIndlZWstbnVtYmVyc1wiKSx0aGlzLnBpY2tlci5vbihcInZpZXdcIix0aGlzLmJpbmRzLm9uVmlldyl9b25EZXRhY2goKXt0aGlzLm9wdGlvbnMuZGFya01vZGUmJndpbmRvdyYmXCJtYXRjaE1lZGlhXCJpbiB3aW5kb3cmJnRoaXMubWF0Y2hNZWRpYS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsdGhpcy5iaW5kcy5vbkNvbG9yU2NoZW1lKSx0aGlzLnBpY2tlci51aS5jb250YWluZXIucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS10aGVtZVwiKSx0aGlzLnBpY2tlci51aS5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcIndlZWstbnVtYmVyc1wiKSx0aGlzLnBpY2tlci5vZmYoXCJ2aWV3XCIsdGhpcy5iaW5kcy5vblZpZXcpfW9uVmlldyh0KXt0aGlzLmxvY2tQbHVnaW49dGhpcy5waWNrZXIuUGx1Z2luTWFuYWdlci5nZXRJbnN0YW5jZShcIkxvY2tQbHVnaW5cIiksdGhpcy5yYW5nZVBsdWdpbj10aGlzLnBpY2tlci5QbHVnaW5NYW5hZ2VyLmdldEluc3RhbmNlKFwiUmFuZ2VQbHVnaW5cIiksdGhpcy5oYW5kbGVEcm9wZG93bih0KSx0aGlzLmhhbmRsZVJlc2V0QnV0dG9uKHQpLHRoaXMuaGFuZGxlV2Vla051bWJlcnModCl9b25Db2xvclNjaGVtZSh0KXtjb25zdCBlPXQubWF0Y2hlcz9cImRhcmtcIjpcImxpZ2h0XCI7dGhpcy5waWNrZXIudWkuY29udGFpbmVyLmRhdGFzZXQudGhlbWU9ZX1oYW5kbGVEcm9wZG93bihlKXtjb25zdHt2aWV3OmksdGFyZ2V0Om4sZGF0ZTpzLGluZGV4Om99PWUuZGV0YWlsO2lmKFwiQ2FsZW5kYXJIZWFkZXJcIj09PWkpe2NvbnN0IGU9bi5xdWVyeVNlbGVjdG9yKFwiLm1vbnRoLW5hbWVcIik7aWYodGhpcy5vcHRpb25zLmRyb3Bkb3duLm1vbnRocyl7ZS5jaGlsZE5vZGVzWzBdLnJlbW92ZSgpO2NvbnN0IGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtpLmNsYXNzTmFtZT1cIm1vbnRoLW5hbWUtLXNlbGVjdCBtb250aC1uYW1lLS1kcm9wZG93blwiO2ZvcihsZXQgZT0wO2U8MTI7ZSs9MSl7Y29uc3Qgbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpLG89bmV3IHQobmV3IERhdGUocy5nZXRGdWxsWWVhcigpLGUsMiwwLDAsMCkpLGE9bmV3IHQobmV3IERhdGUocy5nZXRGdWxsWWVhcigpLGUsMSwwLDAsMCkpO24udmFsdWU9U3RyaW5nKGUpLG4udGV4dD1vLnRvTG9jYWxlU3RyaW5nKHRoaXMucGlja2VyLm9wdGlvbnMubGFuZyx7bW9udGg6XCJsb25nXCJ9KSx0aGlzLmxvY2tQbHVnaW4mJihuLmRpc2FibGVkPXRoaXMubG9ja1BsdWdpbi5vcHRpb25zLm1pbkRhdGUmJmEuaXNCZWZvcmUobmV3IHQodGhpcy5sb2NrUGx1Z2luLm9wdGlvbnMubWluRGF0ZSksXCJtb250aFwiKXx8dGhpcy5sb2NrUGx1Z2luLm9wdGlvbnMubWF4RGF0ZSYmYS5pc0FmdGVyKG5ldyB0KHRoaXMubG9ja1BsdWdpbi5vcHRpb25zLm1heERhdGUpLFwibW9udGhcIikpLG4uc2VsZWN0ZWQ9YS5nZXRNb250aCgpPT09cy5nZXRNb250aCgpLGkuYXBwZW5kQ2hpbGQobil9aS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsKHQ9Pntjb25zdCBlPXQudGFyZ2V0O3RoaXMucGlja2VyLmNhbGVuZGFyc1swXS5zZXREYXRlKDEpLHRoaXMucGlja2VyLmNhbGVuZGFyc1swXS5zZXRNb250aChOdW1iZXIoZS52YWx1ZSkpLHRoaXMucGlja2VyLnJlbmRlckFsbCgpfSkpLGUucHJlcGVuZChpKX1pZih0aGlzLm9wdGlvbnMuZHJvcGRvd24ueWVhcnMpe2UuY2hpbGROb2Rlc1sxXS5yZW1vdmUoKTtjb25zdCBpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7aS5jbGFzc05hbWU9XCJtb250aC1uYW1lLS1zZWxlY3RcIjtjb25zdCBuPXRoaXMub3B0aW9ucy5kcm9wZG93bi5taW5ZZWFyLG89dGhpcy5vcHRpb25zLmRyb3Bkb3duLm1heFllYXI/dGhpcy5vcHRpb25zLmRyb3Bkb3duLm1heFllYXI6KG5ldyBEYXRlKS5nZXRGdWxsWWVhcigpO2lmKHMuZ2V0RnVsbFllYXIoKT5vKXtjb25zdCB0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7dC52YWx1ZT1TdHJpbmcocy5nZXRGdWxsWWVhcigpKSx0LnRleHQ9U3RyaW5nKHMuZ2V0RnVsbFllYXIoKSksdC5zZWxlY3RlZD0hMCx0LmRpc2FibGVkPSEwLGkuYXBwZW5kQ2hpbGQodCl9Zm9yKGxldCBlPW87ZT49bjtlLT0xKXtjb25zdCBuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiksbz1uZXcgdChuZXcgRGF0ZShlLDAsMSwwLDAsMCkpO24udmFsdWU9U3RyaW5nKGUpLG4udGV4dD1TdHJpbmcoZSksdGhpcy5sb2NrUGx1Z2luJiYobi5kaXNhYmxlZD10aGlzLmxvY2tQbHVnaW4ub3B0aW9ucy5taW5EYXRlJiZvLmlzQmVmb3JlKG5ldyB0KHRoaXMubG9ja1BsdWdpbi5vcHRpb25zLm1pbkRhdGUpLFwieWVhclwiKXx8dGhpcy5sb2NrUGx1Z2luLm9wdGlvbnMubWF4RGF0ZSYmby5pc0FmdGVyKG5ldyB0KHRoaXMubG9ja1BsdWdpbi5vcHRpb25zLm1heERhdGUpLFwieWVhclwiKSksbi5zZWxlY3RlZD1zLmdldEZ1bGxZZWFyKCk9PT1lLGkuYXBwZW5kQ2hpbGQobil9aWYocy5nZXRGdWxsWWVhcigpPG4pe2NvbnN0IHQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTt0LnZhbHVlPVN0cmluZyhzLmdldEZ1bGxZZWFyKCkpLHQudGV4dD1TdHJpbmcocy5nZXRGdWxsWWVhcigpKSx0LnNlbGVjdGVkPSEwLHQuZGlzYWJsZWQ9ITAsaS5hcHBlbmRDaGlsZCh0KX1pZihcImFzY1wiPT09dGhpcy5vcHRpb25zLmRyb3Bkb3duLnllYXJzKXtjb25zdCB0PUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGkuY2hpbGROb2RlcykucmV2ZXJzZSgpO2kuaW5uZXJIVE1MPVwiXCIsdC5mb3JFYWNoKCh0PT57dC5pbm5lckhUTUw9dC52YWx1ZSxpLmFwcGVuZENoaWxkKHQpfSkpfWkuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCh0PT57Y29uc3QgZT10LnRhcmdldDt0aGlzLnBpY2tlci5jYWxlbmRhcnNbMF0uc2V0RnVsbFllYXIoTnVtYmVyKGUudmFsdWUpKSx0aGlzLnBpY2tlci5yZW5kZXJBbGwoKX0pKSxlLmFwcGVuZENoaWxkKGkpfX19aGFuZGxlUmVzZXRCdXR0b24odCl7Y29uc3R7dmlldzplLHRhcmdldDppfT10LmRldGFpbDtpZihcIkNhbGVuZGFySGVhZGVyXCI9PT1lJiZ0aGlzLm9wdGlvbnMucmVzZXRCdXR0b24pe2NvbnN0IHQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTt0LmNsYXNzTmFtZT1cInJlc2V0LWJ1dHRvbiB1bml0XCIsdC5pbm5lckhUTUw9dGhpcy5vcHRpb25zLmxvY2FsZS5yZXNldEJ1dHRvbix0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCh0PT57dC5wcmV2ZW50RGVmYXVsdCgpO2xldCBlPSEwO1wiZnVuY3Rpb25cIj09dHlwZW9mIHRoaXMub3B0aW9ucy5yZXNldEJ1dHRvbiYmKGU9dGhpcy5vcHRpb25zLnJlc2V0QnV0dG9uLmNhbGwodGhpcykpLGUmJnRoaXMucGlja2VyLmNsZWFyKCl9KSksaS5hcHBlbmRDaGlsZCh0KX19aGFuZGxlV2Vla051bWJlcnMoZSl7aWYodGhpcy5vcHRpb25zLndlZWtOdW1iZXJzKXtjb25zdHt2aWV3OmksdGFyZ2V0Om59PWUuZGV0YWlsO2lmKFwiQ2FsZW5kYXJEYXlOYW1lc1wiPT09aSl7Y29uc3QgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3QuY2xhc3NOYW1lPVwid251bS1oZWFkZXJcIix0LmlubmVySFRNTD1cIldrXCIsbi5wcmVwZW5kKHQpfVwiQ2FsZW5kYXJEYXlzXCI9PT1pJiZbLi4ubi5jaGlsZHJlbl0uZm9yRWFjaCgoKGUsaSk9PntpZigwPT09aXx8aSU3PT0wKXtsZXQgaTtpZihlLmNsYXNzTGlzdC5jb250YWlucyhcImRheVwiKSlpPW5ldyB0KGUuZGF0YXNldC50aW1lKTtlbHNle2NvbnN0IGU9bi5xdWVyeVNlbGVjdG9yKFwiLmRheVwiKTtpPW5ldyB0KGUuZGF0YXNldC50aW1lKX1sZXQgcz1pLmdldFdlZWsodGhpcy5waWNrZXIub3B0aW9ucy5maXJzdERheSk7NTM9PT1zJiYwPT09aS5nZXRNb250aCgpJiYocz1cIjUzLzFcIik7Y29uc3Qgbz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO28uY2xhc3NOYW1lPVwid251bS1pdGVtXCIsby5pbm5lckhUTUw9U3RyaW5nKHMpLG4uaW5zZXJ0QmVmb3JlKG8sZSl9fSkpfX19ZXhwb3J0e2QgYXMgQW1wUGx1Z2luLHQgYXMgRGF0ZVRpbWUsaCBhcyBLYmRQbHVnaW4sYSBhcyBMb2NrUGx1Z2luLHIgYXMgUHJlc2V0UGx1Z2luLGMgYXMgUmFuZ2VQbHVnaW4sbCBhcyBUaW1lUGx1Z2luLG4gYXMgY3JlYXRlLHMgYXMgZWFzZXBpY2t9O1xuIiwiaW1wb3J0IGdldENvbXBvc2l0ZVJlY3QgZnJvbSBcIi4vZG9tLXV0aWxzL2dldENvbXBvc2l0ZVJlY3QuanNcIjtcbmltcG9ydCBnZXRMYXlvdXRSZWN0IGZyb20gXCIuL2RvbS11dGlscy9nZXRMYXlvdXRSZWN0LmpzXCI7XG5pbXBvcnQgbGlzdFNjcm9sbFBhcmVudHMgZnJvbSBcIi4vZG9tLXV0aWxzL2xpc3RTY3JvbGxQYXJlbnRzLmpzXCI7XG5pbXBvcnQgZ2V0T2Zmc2V0UGFyZW50IGZyb20gXCIuL2RvbS11dGlscy9nZXRPZmZzZXRQYXJlbnQuanNcIjtcbmltcG9ydCBnZXRDb21wdXRlZFN0eWxlIGZyb20gXCIuL2RvbS11dGlscy9nZXRDb21wdXRlZFN0eWxlLmpzXCI7XG5pbXBvcnQgb3JkZXJNb2RpZmllcnMgZnJvbSBcIi4vdXRpbHMvb3JkZXJNb2RpZmllcnMuanNcIjtcbmltcG9ydCBkZWJvdW5jZSBmcm9tIFwiLi91dGlscy9kZWJvdW5jZS5qc1wiO1xuaW1wb3J0IHZhbGlkYXRlTW9kaWZpZXJzIGZyb20gXCIuL3V0aWxzL3ZhbGlkYXRlTW9kaWZpZXJzLmpzXCI7XG5pbXBvcnQgdW5pcXVlQnkgZnJvbSBcIi4vdXRpbHMvdW5pcXVlQnkuanNcIjtcbmltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBtZXJnZUJ5TmFtZSBmcm9tIFwiLi91dGlscy9tZXJnZUJ5TmFtZS5qc1wiO1xuaW1wb3J0IGRldGVjdE92ZXJmbG93IGZyb20gXCIuL3V0aWxzL2RldGVjdE92ZXJmbG93LmpzXCI7XG5pbXBvcnQgeyBpc0VsZW1lbnQgfSBmcm9tIFwiLi9kb20tdXRpbHMvaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IHsgYXV0byB9IGZyb20gXCIuL2VudW1zLmpzXCI7XG52YXIgSU5WQUxJRF9FTEVNRU5UX0VSUk9SID0gJ1BvcHBlcjogSW52YWxpZCByZWZlcmVuY2Ugb3IgcG9wcGVyIGFyZ3VtZW50IHByb3ZpZGVkLiBUaGV5IG11c3QgYmUgZWl0aGVyIGEgRE9NIGVsZW1lbnQgb3IgdmlydHVhbCBlbGVtZW50Lic7XG52YXIgSU5GSU5JVEVfTE9PUF9FUlJPUiA9ICdQb3BwZXI6IEFuIGluZmluaXRlIGxvb3AgaW4gdGhlIG1vZGlmaWVycyBjeWNsZSBoYXMgYmVlbiBkZXRlY3RlZCEgVGhlIGN5Y2xlIGhhcyBiZWVuIGludGVycnVwdGVkIHRvIHByZXZlbnQgYSBicm93c2VyIGNyYXNoLic7XG52YXIgREVGQVVMVF9PUFRJT05TID0ge1xuICBwbGFjZW1lbnQ6ICdib3R0b20nLFxuICBtb2RpZmllcnM6IFtdLFxuICBzdHJhdGVneTogJ2Fic29sdXRlJ1xufTtcblxuZnVuY3Rpb24gYXJlVmFsaWRFbGVtZW50cygpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiAhYXJncy5zb21lKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgcmV0dXJuICEoZWxlbWVudCAmJiB0eXBlb2YgZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgPT09ICdmdW5jdGlvbicpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBvcHBlckdlbmVyYXRvcihnZW5lcmF0b3JPcHRpb25zKSB7XG4gIGlmIChnZW5lcmF0b3JPcHRpb25zID09PSB2b2lkIDApIHtcbiAgICBnZW5lcmF0b3JPcHRpb25zID0ge307XG4gIH1cblxuICB2YXIgX2dlbmVyYXRvck9wdGlvbnMgPSBnZW5lcmF0b3JPcHRpb25zLFxuICAgICAgX2dlbmVyYXRvck9wdGlvbnMkZGVmID0gX2dlbmVyYXRvck9wdGlvbnMuZGVmYXVsdE1vZGlmaWVycyxcbiAgICAgIGRlZmF1bHRNb2RpZmllcnMgPSBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYgPT09IHZvaWQgMCA/IFtdIDogX2dlbmVyYXRvck9wdGlvbnMkZGVmLFxuICAgICAgX2dlbmVyYXRvck9wdGlvbnMkZGVmMiA9IF9nZW5lcmF0b3JPcHRpb25zLmRlZmF1bHRPcHRpb25zLFxuICAgICAgZGVmYXVsdE9wdGlvbnMgPSBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYyID09PSB2b2lkIDAgPyBERUZBVUxUX09QVElPTlMgOiBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYyO1xuICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlUG9wcGVyKHJlZmVyZW5jZSwgcG9wcGVyLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgICAgb3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zO1xuICAgIH1cblxuICAgIHZhciBzdGF0ZSA9IHtcbiAgICAgIHBsYWNlbWVudDogJ2JvdHRvbScsXG4gICAgICBvcmRlcmVkTW9kaWZpZXJzOiBbXSxcbiAgICAgIG9wdGlvbnM6IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfT1BUSU9OUywgZGVmYXVsdE9wdGlvbnMpLFxuICAgICAgbW9kaWZpZXJzRGF0YToge30sXG4gICAgICBlbGVtZW50czoge1xuICAgICAgICByZWZlcmVuY2U6IHJlZmVyZW5jZSxcbiAgICAgICAgcG9wcGVyOiBwb3BwZXJcbiAgICAgIH0sXG4gICAgICBhdHRyaWJ1dGVzOiB7fSxcbiAgICAgIHN0eWxlczoge31cbiAgICB9O1xuICAgIHZhciBlZmZlY3RDbGVhbnVwRm5zID0gW107XG4gICAgdmFyIGlzRGVzdHJveWVkID0gZmFsc2U7XG4gICAgdmFyIGluc3RhbmNlID0ge1xuICAgICAgc3RhdGU6IHN0YXRlLFxuICAgICAgc2V0T3B0aW9uczogZnVuY3Rpb24gc2V0T3B0aW9ucyhzZXRPcHRpb25zQWN0aW9uKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gdHlwZW9mIHNldE9wdGlvbnNBY3Rpb24gPT09ICdmdW5jdGlvbicgPyBzZXRPcHRpb25zQWN0aW9uKHN0YXRlLm9wdGlvbnMpIDogc2V0T3B0aW9uc0FjdGlvbjtcbiAgICAgICAgY2xlYW51cE1vZGlmaWVyRWZmZWN0cygpO1xuICAgICAgICBzdGF0ZS5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIHN0YXRlLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICBzdGF0ZS5zY3JvbGxQYXJlbnRzID0ge1xuICAgICAgICAgIHJlZmVyZW5jZTogaXNFbGVtZW50KHJlZmVyZW5jZSkgPyBsaXN0U2Nyb2xsUGFyZW50cyhyZWZlcmVuY2UpIDogcmVmZXJlbmNlLmNvbnRleHRFbGVtZW50ID8gbGlzdFNjcm9sbFBhcmVudHMocmVmZXJlbmNlLmNvbnRleHRFbGVtZW50KSA6IFtdLFxuICAgICAgICAgIHBvcHBlcjogbGlzdFNjcm9sbFBhcmVudHMocG9wcGVyKVxuICAgICAgICB9OyAvLyBPcmRlcnMgdGhlIG1vZGlmaWVycyBiYXNlZCBvbiB0aGVpciBkZXBlbmRlbmNpZXMgYW5kIGBwaGFzZWBcbiAgICAgICAgLy8gcHJvcGVydGllc1xuXG4gICAgICAgIHZhciBvcmRlcmVkTW9kaWZpZXJzID0gb3JkZXJNb2RpZmllcnMobWVyZ2VCeU5hbWUoW10uY29uY2F0KGRlZmF1bHRNb2RpZmllcnMsIHN0YXRlLm9wdGlvbnMubW9kaWZpZXJzKSkpOyAvLyBTdHJpcCBvdXQgZGlzYWJsZWQgbW9kaWZpZXJzXG5cbiAgICAgICAgc3RhdGUub3JkZXJlZE1vZGlmaWVycyA9IG9yZGVyZWRNb2RpZmllcnMuZmlsdGVyKGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgcmV0dXJuIG0uZW5hYmxlZDtcbiAgICAgICAgfSk7IC8vIFZhbGlkYXRlIHRoZSBwcm92aWRlZCBtb2RpZmllcnMgc28gdGhhdCB0aGUgY29uc3VtZXIgd2lsbCBnZXQgd2FybmVkXG4gICAgICAgIC8vIGlmIG9uZSBvZiB0aGUgbW9kaWZpZXJzIGlzIGludmFsaWQgZm9yIGFueSByZWFzb25cblxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgdmFyIG1vZGlmaWVycyA9IHVuaXF1ZUJ5KFtdLmNvbmNhdChvcmRlcmVkTW9kaWZpZXJzLCBzdGF0ZS5vcHRpb25zLm1vZGlmaWVycyksIGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IF9yZWYubmFtZTtcbiAgICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkYXRlTW9kaWZpZXJzKG1vZGlmaWVycyk7XG5cbiAgICAgICAgICBpZiAoZ2V0QmFzZVBsYWNlbWVudChzdGF0ZS5vcHRpb25zLnBsYWNlbWVudCkgPT09IGF1dG8pIHtcbiAgICAgICAgICAgIHZhciBmbGlwTW9kaWZpZXIgPSBzdGF0ZS5vcmRlcmVkTW9kaWZpZXJzLmZpbmQoZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgICAgICAgICAgIHZhciBuYW1lID0gX3JlZjIubmFtZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5hbWUgPT09ICdmbGlwJztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoIWZsaXBNb2RpZmllcikge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFsnUG9wcGVyOiBcImF1dG9cIiBwbGFjZW1lbnRzIHJlcXVpcmUgdGhlIFwiZmxpcFwiIG1vZGlmaWVyIGJlJywgJ3ByZXNlbnQgYW5kIGVuYWJsZWQgdG8gd29yay4nXS5qb2luKCcgJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBfZ2V0Q29tcHV0ZWRTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUocG9wcGVyKSxcbiAgICAgICAgICAgICAgbWFyZ2luVG9wID0gX2dldENvbXB1dGVkU3R5bGUubWFyZ2luVG9wLFxuICAgICAgICAgICAgICBtYXJnaW5SaWdodCA9IF9nZXRDb21wdXRlZFN0eWxlLm1hcmdpblJpZ2h0LFxuICAgICAgICAgICAgICBtYXJnaW5Cb3R0b20gPSBfZ2V0Q29tcHV0ZWRTdHlsZS5tYXJnaW5Cb3R0b20sXG4gICAgICAgICAgICAgIG1hcmdpbkxlZnQgPSBfZ2V0Q29tcHV0ZWRTdHlsZS5tYXJnaW5MZWZ0OyAvLyBXZSBubyBsb25nZXIgdGFrZSBpbnRvIGFjY291bnQgYG1hcmdpbnNgIG9uIHRoZSBwb3BwZXIsIGFuZCBpdCBjYW5cbiAgICAgICAgICAvLyBjYXVzZSBidWdzIHdpdGggcG9zaXRpb25pbmcsIHNvIHdlJ2xsIHdhcm4gdGhlIGNvbnN1bWVyXG5cblxuICAgICAgICAgIGlmIChbbWFyZ2luVG9wLCBtYXJnaW5SaWdodCwgbWFyZ2luQm90dG9tLCBtYXJnaW5MZWZ0XS5zb21lKGZ1bmN0aW9uIChtYXJnaW4pIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KG1hcmdpbik7XG4gICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihbJ1BvcHBlcjogQ1NTIFwibWFyZ2luXCIgc3R5bGVzIGNhbm5vdCBiZSB1c2VkIHRvIGFwcGx5IHBhZGRpbmcnLCAnYmV0d2VlbiB0aGUgcG9wcGVyIGFuZCBpdHMgcmVmZXJlbmNlIGVsZW1lbnQgb3IgYm91bmRhcnkuJywgJ1RvIHJlcGxpY2F0ZSBtYXJnaW4sIHVzZSB0aGUgYG9mZnNldGAgbW9kaWZpZXIsIGFzIHdlbGwgYXMnLCAndGhlIGBwYWRkaW5nYCBvcHRpb24gaW4gdGhlIGBwcmV2ZW50T3ZlcmZsb3dgIGFuZCBgZmxpcGAnLCAnbW9kaWZpZXJzLiddLmpvaW4oJyAnKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcnVuTW9kaWZpZXJFZmZlY3RzKCk7XG4gICAgICAgIHJldHVybiBpbnN0YW5jZS51cGRhdGUoKTtcbiAgICAgIH0sXG4gICAgICAvLyBTeW5jIHVwZGF0ZSDigJMgaXQgd2lsbCBhbHdheXMgYmUgZXhlY3V0ZWQsIGV2ZW4gaWYgbm90IG5lY2Vzc2FyeS4gVGhpc1xuICAgICAgLy8gaXMgdXNlZnVsIGZvciBsb3cgZnJlcXVlbmN5IHVwZGF0ZXMgd2hlcmUgc3luYyBiZWhhdmlvciBzaW1wbGlmaWVzIHRoZVxuICAgICAgLy8gbG9naWMuXG4gICAgICAvLyBGb3IgaGlnaCBmcmVxdWVuY3kgdXBkYXRlcyAoZS5nLiBgcmVzaXplYCBhbmQgYHNjcm9sbGAgZXZlbnRzKSwgYWx3YXlzXG4gICAgICAvLyBwcmVmZXIgdGhlIGFzeW5jIFBvcHBlciN1cGRhdGUgbWV0aG9kXG4gICAgICBmb3JjZVVwZGF0ZTogZnVuY3Rpb24gZm9yY2VVcGRhdGUoKSB7XG4gICAgICAgIGlmIChpc0Rlc3Ryb3llZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBfc3RhdGUkZWxlbWVudHMgPSBzdGF0ZS5lbGVtZW50cyxcbiAgICAgICAgICAgIHJlZmVyZW5jZSA9IF9zdGF0ZSRlbGVtZW50cy5yZWZlcmVuY2UsXG4gICAgICAgICAgICBwb3BwZXIgPSBfc3RhdGUkZWxlbWVudHMucG9wcGVyOyAvLyBEb24ndCBwcm9jZWVkIGlmIGByZWZlcmVuY2VgIG9yIGBwb3BwZXJgIGFyZSBub3QgdmFsaWQgZWxlbWVudHNcbiAgICAgICAgLy8gYW55bW9yZVxuXG4gICAgICAgIGlmICghYXJlVmFsaWRFbGVtZW50cyhyZWZlcmVuY2UsIHBvcHBlcikpIHtcbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKElOVkFMSURfRUxFTUVOVF9FUlJPUik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IC8vIFN0b3JlIHRoZSByZWZlcmVuY2UgYW5kIHBvcHBlciByZWN0cyB0byBiZSByZWFkIGJ5IG1vZGlmaWVyc1xuXG5cbiAgICAgICAgc3RhdGUucmVjdHMgPSB7XG4gICAgICAgICAgcmVmZXJlbmNlOiBnZXRDb21wb3NpdGVSZWN0KHJlZmVyZW5jZSwgZ2V0T2Zmc2V0UGFyZW50KHBvcHBlciksIHN0YXRlLm9wdGlvbnMuc3RyYXRlZ3kgPT09ICdmaXhlZCcpLFxuICAgICAgICAgIHBvcHBlcjogZ2V0TGF5b3V0UmVjdChwb3BwZXIpXG4gICAgICAgIH07IC8vIE1vZGlmaWVycyBoYXZlIHRoZSBhYmlsaXR5IHRvIHJlc2V0IHRoZSBjdXJyZW50IHVwZGF0ZSBjeWNsZS4gVGhlXG4gICAgICAgIC8vIG1vc3QgY29tbW9uIHVzZSBjYXNlIGZvciB0aGlzIGlzIHRoZSBgZmxpcGAgbW9kaWZpZXIgY2hhbmdpbmcgdGhlXG4gICAgICAgIC8vIHBsYWNlbWVudCwgd2hpY2ggdGhlbiBuZWVkcyB0byByZS1ydW4gYWxsIHRoZSBtb2RpZmllcnMsIGJlY2F1c2UgdGhlXG4gICAgICAgIC8vIGxvZ2ljIHdhcyBwcmV2aW91c2x5IHJhbiBmb3IgdGhlIHByZXZpb3VzIHBsYWNlbWVudCBhbmQgaXMgdGhlcmVmb3JlXG4gICAgICAgIC8vIHN0YWxlL2luY29ycmVjdFxuXG4gICAgICAgIHN0YXRlLnJlc2V0ID0gZmFsc2U7XG4gICAgICAgIHN0YXRlLnBsYWNlbWVudCA9IHN0YXRlLm9wdGlvbnMucGxhY2VtZW50OyAvLyBPbiBlYWNoIHVwZGF0ZSBjeWNsZSwgdGhlIGBtb2RpZmllcnNEYXRhYCBwcm9wZXJ0eSBmb3IgZWFjaCBtb2RpZmllclxuICAgICAgICAvLyBpcyBmaWxsZWQgd2l0aCB0aGUgaW5pdGlhbCBkYXRhIHNwZWNpZmllZCBieSB0aGUgbW9kaWZpZXIuIFRoaXMgbWVhbnNcbiAgICAgICAgLy8gaXQgZG9lc24ndCBwZXJzaXN0IGFuZCBpcyBmcmVzaCBvbiBlYWNoIHVwZGF0ZS5cbiAgICAgICAgLy8gVG8gZW5zdXJlIHBlcnNpc3RlbnQgZGF0YSwgdXNlIGAke25hbWV9I3BlcnNpc3RlbnRgXG5cbiAgICAgICAgc3RhdGUub3JkZXJlZE1vZGlmaWVycy5mb3JFYWNoKGZ1bmN0aW9uIChtb2RpZmllcikge1xuICAgICAgICAgIHJldHVybiBzdGF0ZS5tb2RpZmllcnNEYXRhW21vZGlmaWVyLm5hbWVdID0gT2JqZWN0LmFzc2lnbih7fSwgbW9kaWZpZXIuZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgX19kZWJ1Z19sb29wc19fID0gMDtcblxuICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgc3RhdGUub3JkZXJlZE1vZGlmaWVycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgICBfX2RlYnVnX2xvb3BzX18gKz0gMTtcblxuICAgICAgICAgICAgaWYgKF9fZGVidWdfbG9vcHNfXyA+IDEwMCkge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKElORklOSVRFX0xPT1BfRVJST1IpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc3RhdGUucmVzZXQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHN0YXRlLnJlc2V0ID0gZmFsc2U7XG4gICAgICAgICAgICBpbmRleCA9IC0xO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIF9zdGF0ZSRvcmRlcmVkTW9kaWZpZSA9IHN0YXRlLm9yZGVyZWRNb2RpZmllcnNbaW5kZXhdLFxuICAgICAgICAgICAgICBmbiA9IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZS5mbixcbiAgICAgICAgICAgICAgX3N0YXRlJG9yZGVyZWRNb2RpZmllMiA9IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZS5vcHRpb25zLFxuICAgICAgICAgICAgICBfb3B0aW9ucyA9IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZTIgPT09IHZvaWQgMCA/IHt9IDogX3N0YXRlJG9yZGVyZWRNb2RpZmllMixcbiAgICAgICAgICAgICAgbmFtZSA9IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZS5uYW1lO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgc3RhdGUgPSBmbih7XG4gICAgICAgICAgICAgIHN0YXRlOiBzdGF0ZSxcbiAgICAgICAgICAgICAgb3B0aW9uczogX29wdGlvbnMsXG4gICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgIGluc3RhbmNlOiBpbnN0YW5jZVxuICAgICAgICAgICAgfSkgfHwgc3RhdGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLy8gQXN5bmMgYW5kIG9wdGltaXN0aWNhbGx5IG9wdGltaXplZCB1cGRhdGUg4oCTIGl0IHdpbGwgbm90IGJlIGV4ZWN1dGVkIGlmXG4gICAgICAvLyBub3QgbmVjZXNzYXJ5IChkZWJvdW5jZWQgdG8gcnVuIGF0IG1vc3Qgb25jZS1wZXItdGljaylcbiAgICAgIHVwZGF0ZTogZGVib3VuY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICBpbnN0YW5jZS5mb3JjZVVwZGF0ZSgpO1xuICAgICAgICAgIHJlc29sdmUoc3RhdGUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pLFxuICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgY2xlYW51cE1vZGlmaWVyRWZmZWN0cygpO1xuICAgICAgICBpc0Rlc3Ryb3llZCA9IHRydWU7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICghYXJlVmFsaWRFbGVtZW50cyhyZWZlcmVuY2UsIHBvcHBlcikpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihJTlZBTElEX0VMRU1FTlRfRVJST1IpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgaW5zdGFuY2Uuc2V0T3B0aW9ucyhvcHRpb25zKS50aGVuKGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgaWYgKCFpc0Rlc3Ryb3llZCAmJiBvcHRpb25zLm9uRmlyc3RVcGRhdGUpIHtcbiAgICAgICAgb3B0aW9ucy5vbkZpcnN0VXBkYXRlKHN0YXRlKTtcbiAgICAgIH1cbiAgICB9KTsgLy8gTW9kaWZpZXJzIGhhdmUgdGhlIGFiaWxpdHkgdG8gZXhlY3V0ZSBhcmJpdHJhcnkgY29kZSBiZWZvcmUgdGhlIGZpcnN0XG4gICAgLy8gdXBkYXRlIGN5Y2xlIHJ1bnMuIFRoZXkgd2lsbCBiZSBleGVjdXRlZCBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGUgdXBkYXRlXG4gICAgLy8gY3ljbGUuIFRoaXMgaXMgdXNlZnVsIHdoZW4gYSBtb2RpZmllciBhZGRzIHNvbWUgcGVyc2lzdGVudCBkYXRhIHRoYXRcbiAgICAvLyBvdGhlciBtb2RpZmllcnMgbmVlZCB0byB1c2UsIGJ1dCB0aGUgbW9kaWZpZXIgaXMgcnVuIGFmdGVyIHRoZSBkZXBlbmRlbnRcbiAgICAvLyBvbmUuXG5cbiAgICBmdW5jdGlvbiBydW5Nb2RpZmllckVmZmVjdHMoKSB7XG4gICAgICBzdGF0ZS5vcmRlcmVkTW9kaWZpZXJzLmZvckVhY2goZnVuY3Rpb24gKF9yZWYzKSB7XG4gICAgICAgIHZhciBuYW1lID0gX3JlZjMubmFtZSxcbiAgICAgICAgICAgIF9yZWYzJG9wdGlvbnMgPSBfcmVmMy5vcHRpb25zLFxuICAgICAgICAgICAgb3B0aW9ucyA9IF9yZWYzJG9wdGlvbnMgPT09IHZvaWQgMCA/IHt9IDogX3JlZjMkb3B0aW9ucyxcbiAgICAgICAgICAgIGVmZmVjdCA9IF9yZWYzLmVmZmVjdDtcblxuICAgICAgICBpZiAodHlwZW9mIGVmZmVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHZhciBjbGVhbnVwRm4gPSBlZmZlY3Qoe1xuICAgICAgICAgICAgc3RhdGU6IHN0YXRlLFxuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIGluc3RhbmNlOiBpbnN0YW5jZSxcbiAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHZhciBub29wRm4gPSBmdW5jdGlvbiBub29wRm4oKSB7fTtcblxuICAgICAgICAgIGVmZmVjdENsZWFudXBGbnMucHVzaChjbGVhbnVwRm4gfHwgbm9vcEZuKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYW51cE1vZGlmaWVyRWZmZWN0cygpIHtcbiAgICAgIGVmZmVjdENsZWFudXBGbnMuZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgICB9KTtcbiAgICAgIGVmZmVjdENsZWFudXBGbnMgPSBbXTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH07XG59XG5leHBvcnQgdmFyIGNyZWF0ZVBvcHBlciA9IC8qI19fUFVSRV9fKi9wb3BwZXJHZW5lcmF0b3IoKTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgeyBkZXRlY3RPdmVyZmxvdyB9OyIsImltcG9ydCB7IGlzU2hhZG93Um9vdCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnRhaW5zKHBhcmVudCwgY2hpbGQpIHtcbiAgdmFyIHJvb3ROb2RlID0gY2hpbGQuZ2V0Um9vdE5vZGUgJiYgY2hpbGQuZ2V0Um9vdE5vZGUoKTsgLy8gRmlyc3QsIGF0dGVtcHQgd2l0aCBmYXN0ZXIgbmF0aXZlIG1ldGhvZFxuXG4gIGlmIChwYXJlbnQuY29udGFpbnMoY2hpbGQpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gLy8gdGhlbiBmYWxsYmFjayB0byBjdXN0b20gaW1wbGVtZW50YXRpb24gd2l0aCBTaGFkb3cgRE9NIHN1cHBvcnRcbiAgZWxzZSBpZiAocm9vdE5vZGUgJiYgaXNTaGFkb3dSb290KHJvb3ROb2RlKSkge1xuICAgICAgdmFyIG5leHQgPSBjaGlsZDtcblxuICAgICAgZG8ge1xuICAgICAgICBpZiAobmV4dCAmJiBwYXJlbnQuaXNTYW1lTm9kZShuZXh0KSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IC8vICRGbG93Rml4TWVbcHJvcC1taXNzaW5nXTogbmVlZCBhIGJldHRlciB3YXkgdG8gaGFuZGxlIHRoaXMuLi5cblxuXG4gICAgICAgIG5leHQgPSBuZXh0LnBhcmVudE5vZGUgfHwgbmV4dC5ob3N0O1xuICAgICAgfSB3aGlsZSAobmV4dCk7XG4gICAgfSAvLyBHaXZlIHVwLCB0aGUgcmVzdWx0IGlzIGZhbHNlXG5cblxuICByZXR1cm4gZmFsc2U7XG59IiwiaW1wb3J0IHsgaXNFbGVtZW50LCBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IHsgcm91bmQgfSBmcm9tIFwiLi4vdXRpbHMvbWF0aC5qc1wiO1xuaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBpc0xheW91dFZpZXdwb3J0IGZyb20gXCIuL2lzTGF5b3V0Vmlld3BvcnQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEJvdW5kaW5nQ2xpZW50UmVjdChlbGVtZW50LCBpbmNsdWRlU2NhbGUsIGlzRml4ZWRTdHJhdGVneSkge1xuICBpZiAoaW5jbHVkZVNjYWxlID09PSB2b2lkIDApIHtcbiAgICBpbmNsdWRlU2NhbGUgPSBmYWxzZTtcbiAgfVxuXG4gIGlmIChpc0ZpeGVkU3RyYXRlZ3kgPT09IHZvaWQgMCkge1xuICAgIGlzRml4ZWRTdHJhdGVneSA9IGZhbHNlO1xuICB9XG5cbiAgdmFyIGNsaWVudFJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB2YXIgc2NhbGVYID0gMTtcbiAgdmFyIHNjYWxlWSA9IDE7XG5cbiAgaWYgKGluY2x1ZGVTY2FsZSAmJiBpc0hUTUxFbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgc2NhbGVYID0gZWxlbWVudC5vZmZzZXRXaWR0aCA+IDAgPyByb3VuZChjbGllbnRSZWN0LndpZHRoKSAvIGVsZW1lbnQub2Zmc2V0V2lkdGggfHwgMSA6IDE7XG4gICAgc2NhbGVZID0gZWxlbWVudC5vZmZzZXRIZWlnaHQgPiAwID8gcm91bmQoY2xpZW50UmVjdC5oZWlnaHQpIC8gZWxlbWVudC5vZmZzZXRIZWlnaHQgfHwgMSA6IDE7XG4gIH1cblxuICB2YXIgX3JlZiA9IGlzRWxlbWVudChlbGVtZW50KSA/IGdldFdpbmRvdyhlbGVtZW50KSA6IHdpbmRvdyxcbiAgICAgIHZpc3VhbFZpZXdwb3J0ID0gX3JlZi52aXN1YWxWaWV3cG9ydDtcblxuICB2YXIgYWRkVmlzdWFsT2Zmc2V0cyA9ICFpc0xheW91dFZpZXdwb3J0KCkgJiYgaXNGaXhlZFN0cmF0ZWd5O1xuICB2YXIgeCA9IChjbGllbnRSZWN0LmxlZnQgKyAoYWRkVmlzdWFsT2Zmc2V0cyAmJiB2aXN1YWxWaWV3cG9ydCA/IHZpc3VhbFZpZXdwb3J0Lm9mZnNldExlZnQgOiAwKSkgLyBzY2FsZVg7XG4gIHZhciB5ID0gKGNsaWVudFJlY3QudG9wICsgKGFkZFZpc3VhbE9mZnNldHMgJiYgdmlzdWFsVmlld3BvcnQgPyB2aXN1YWxWaWV3cG9ydC5vZmZzZXRUb3AgOiAwKSkgLyBzY2FsZVk7XG4gIHZhciB3aWR0aCA9IGNsaWVudFJlY3Qud2lkdGggLyBzY2FsZVg7XG4gIHZhciBoZWlnaHQgPSBjbGllbnRSZWN0LmhlaWdodCAvIHNjYWxlWTtcbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgdG9wOiB5LFxuICAgIHJpZ2h0OiB4ICsgd2lkdGgsXG4gICAgYm90dG9tOiB5ICsgaGVpZ2h0LFxuICAgIGxlZnQ6IHgsXG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH07XG59IiwiaW1wb3J0IHsgdmlld3BvcnQgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCBnZXRWaWV3cG9ydFJlY3QgZnJvbSBcIi4vZ2V0Vmlld3BvcnRSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0RG9jdW1lbnRSZWN0IGZyb20gXCIuL2dldERvY3VtZW50UmVjdC5qc1wiO1xuaW1wb3J0IGxpc3RTY3JvbGxQYXJlbnRzIGZyb20gXCIuL2xpc3RTY3JvbGxQYXJlbnRzLmpzXCI7XG5pbXBvcnQgZ2V0T2Zmc2V0UGFyZW50IGZyb20gXCIuL2dldE9mZnNldFBhcmVudC5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRDb21wdXRlZFN0eWxlIGZyb20gXCIuL2dldENvbXB1dGVkU3R5bGUuanNcIjtcbmltcG9ydCB7IGlzRWxlbWVudCwgaXNIVE1MRWxlbWVudCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmltcG9ydCBnZXRCb3VuZGluZ0NsaWVudFJlY3QgZnJvbSBcIi4vZ2V0Qm91bmRpbmdDbGllbnRSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0UGFyZW50Tm9kZSBmcm9tIFwiLi9nZXRQYXJlbnROb2RlLmpzXCI7XG5pbXBvcnQgY29udGFpbnMgZnJvbSBcIi4vY29udGFpbnMuanNcIjtcbmltcG9ydCBnZXROb2RlTmFtZSBmcm9tIFwiLi9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IHJlY3RUb0NsaWVudFJlY3QgZnJvbSBcIi4uL3V0aWxzL3JlY3RUb0NsaWVudFJlY3QuanNcIjtcbmltcG9ydCB7IG1heCwgbWluIH0gZnJvbSBcIi4uL3V0aWxzL21hdGguanNcIjtcblxuZnVuY3Rpb24gZ2V0SW5uZXJCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudCwgc3RyYXRlZ3kpIHtcbiAgdmFyIHJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudCwgZmFsc2UsIHN0cmF0ZWd5ID09PSAnZml4ZWQnKTtcbiAgcmVjdC50b3AgPSByZWN0LnRvcCArIGVsZW1lbnQuY2xpZW50VG9wO1xuICByZWN0LmxlZnQgPSByZWN0LmxlZnQgKyBlbGVtZW50LmNsaWVudExlZnQ7XG4gIHJlY3QuYm90dG9tID0gcmVjdC50b3AgKyBlbGVtZW50LmNsaWVudEhlaWdodDtcbiAgcmVjdC5yaWdodCA9IHJlY3QubGVmdCArIGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gIHJlY3Qud2lkdGggPSBlbGVtZW50LmNsaWVudFdpZHRoO1xuICByZWN0LmhlaWdodCA9IGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICByZWN0LnggPSByZWN0LmxlZnQ7XG4gIHJlY3QueSA9IHJlY3QudG9wO1xuICByZXR1cm4gcmVjdDtcbn1cblxuZnVuY3Rpb24gZ2V0Q2xpZW50UmVjdEZyb21NaXhlZFR5cGUoZWxlbWVudCwgY2xpcHBpbmdQYXJlbnQsIHN0cmF0ZWd5KSB7XG4gIHJldHVybiBjbGlwcGluZ1BhcmVudCA9PT0gdmlld3BvcnQgPyByZWN0VG9DbGllbnRSZWN0KGdldFZpZXdwb3J0UmVjdChlbGVtZW50LCBzdHJhdGVneSkpIDogaXNFbGVtZW50KGNsaXBwaW5nUGFyZW50KSA/IGdldElubmVyQm91bmRpbmdDbGllbnRSZWN0KGNsaXBwaW5nUGFyZW50LCBzdHJhdGVneSkgOiByZWN0VG9DbGllbnRSZWN0KGdldERvY3VtZW50UmVjdChnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCkpKTtcbn0gLy8gQSBcImNsaXBwaW5nIHBhcmVudFwiIGlzIGFuIG92ZXJmbG93YWJsZSBjb250YWluZXIgd2l0aCB0aGUgY2hhcmFjdGVyaXN0aWMgb2Zcbi8vIGNsaXBwaW5nIChvciBoaWRpbmcpIG92ZXJmbG93aW5nIGVsZW1lbnRzIHdpdGggYSBwb3NpdGlvbiBkaWZmZXJlbnQgZnJvbVxuLy8gYGluaXRpYWxgXG5cblxuZnVuY3Rpb24gZ2V0Q2xpcHBpbmdQYXJlbnRzKGVsZW1lbnQpIHtcbiAgdmFyIGNsaXBwaW5nUGFyZW50cyA9IGxpc3RTY3JvbGxQYXJlbnRzKGdldFBhcmVudE5vZGUoZWxlbWVudCkpO1xuICB2YXIgY2FuRXNjYXBlQ2xpcHBpbmcgPSBbJ2Fic29sdXRlJywgJ2ZpeGVkJ10uaW5kZXhPZihnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLnBvc2l0aW9uKSA+PSAwO1xuICB2YXIgY2xpcHBlckVsZW1lbnQgPSBjYW5Fc2NhcGVDbGlwcGluZyAmJiBpc0hUTUxFbGVtZW50KGVsZW1lbnQpID8gZ2V0T2Zmc2V0UGFyZW50KGVsZW1lbnQpIDogZWxlbWVudDtcblxuICBpZiAoIWlzRWxlbWVudChjbGlwcGVyRWxlbWVudCkpIHtcbiAgICByZXR1cm4gW107XG4gIH0gLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtcmV0dXJuXTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2Zsb3cvaXNzdWVzLzE0MTRcblxuXG4gIHJldHVybiBjbGlwcGluZ1BhcmVudHMuZmlsdGVyKGZ1bmN0aW9uIChjbGlwcGluZ1BhcmVudCkge1xuICAgIHJldHVybiBpc0VsZW1lbnQoY2xpcHBpbmdQYXJlbnQpICYmIGNvbnRhaW5zKGNsaXBwaW5nUGFyZW50LCBjbGlwcGVyRWxlbWVudCkgJiYgZ2V0Tm9kZU5hbWUoY2xpcHBpbmdQYXJlbnQpICE9PSAnYm9keSc7XG4gIH0pO1xufSAvLyBHZXRzIHRoZSBtYXhpbXVtIGFyZWEgdGhhdCB0aGUgZWxlbWVudCBpcyB2aXNpYmxlIGluIGR1ZSB0byBhbnkgbnVtYmVyIG9mXG4vLyBjbGlwcGluZyBwYXJlbnRzXG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Q2xpcHBpbmdSZWN0KGVsZW1lbnQsIGJvdW5kYXJ5LCByb290Qm91bmRhcnksIHN0cmF0ZWd5KSB7XG4gIHZhciBtYWluQ2xpcHBpbmdQYXJlbnRzID0gYm91bmRhcnkgPT09ICdjbGlwcGluZ1BhcmVudHMnID8gZ2V0Q2xpcHBpbmdQYXJlbnRzKGVsZW1lbnQpIDogW10uY29uY2F0KGJvdW5kYXJ5KTtcbiAgdmFyIGNsaXBwaW5nUGFyZW50cyA9IFtdLmNvbmNhdChtYWluQ2xpcHBpbmdQYXJlbnRzLCBbcm9vdEJvdW5kYXJ5XSk7XG4gIHZhciBmaXJzdENsaXBwaW5nUGFyZW50ID0gY2xpcHBpbmdQYXJlbnRzWzBdO1xuICB2YXIgY2xpcHBpbmdSZWN0ID0gY2xpcHBpbmdQYXJlbnRzLnJlZHVjZShmdW5jdGlvbiAoYWNjUmVjdCwgY2xpcHBpbmdQYXJlbnQpIHtcbiAgICB2YXIgcmVjdCA9IGdldENsaWVudFJlY3RGcm9tTWl4ZWRUeXBlKGVsZW1lbnQsIGNsaXBwaW5nUGFyZW50LCBzdHJhdGVneSk7XG4gICAgYWNjUmVjdC50b3AgPSBtYXgocmVjdC50b3AsIGFjY1JlY3QudG9wKTtcbiAgICBhY2NSZWN0LnJpZ2h0ID0gbWluKHJlY3QucmlnaHQsIGFjY1JlY3QucmlnaHQpO1xuICAgIGFjY1JlY3QuYm90dG9tID0gbWluKHJlY3QuYm90dG9tLCBhY2NSZWN0LmJvdHRvbSk7XG4gICAgYWNjUmVjdC5sZWZ0ID0gbWF4KHJlY3QubGVmdCwgYWNjUmVjdC5sZWZ0KTtcbiAgICByZXR1cm4gYWNjUmVjdDtcbiAgfSwgZ2V0Q2xpZW50UmVjdEZyb21NaXhlZFR5cGUoZWxlbWVudCwgZmlyc3RDbGlwcGluZ1BhcmVudCwgc3RyYXRlZ3kpKTtcbiAgY2xpcHBpbmdSZWN0LndpZHRoID0gY2xpcHBpbmdSZWN0LnJpZ2h0IC0gY2xpcHBpbmdSZWN0LmxlZnQ7XG4gIGNsaXBwaW5nUmVjdC5oZWlnaHQgPSBjbGlwcGluZ1JlY3QuYm90dG9tIC0gY2xpcHBpbmdSZWN0LnRvcDtcbiAgY2xpcHBpbmdSZWN0LnggPSBjbGlwcGluZ1JlY3QubGVmdDtcbiAgY2xpcHBpbmdSZWN0LnkgPSBjbGlwcGluZ1JlY3QudG9wO1xuICByZXR1cm4gY2xpcHBpbmdSZWN0O1xufSIsImltcG9ydCBnZXRCb3VuZGluZ0NsaWVudFJlY3QgZnJvbSBcIi4vZ2V0Qm91bmRpbmdDbGllbnRSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0Tm9kZVNjcm9sbCBmcm9tIFwiLi9nZXROb2RlU2Nyb2xsLmpzXCI7XG5pbXBvcnQgZ2V0Tm9kZU5hbWUgZnJvbSBcIi4vZ2V0Tm9kZU5hbWUuanNcIjtcbmltcG9ydCB7IGlzSFRNTEVsZW1lbnQgfSBmcm9tIFwiLi9pbnN0YW5jZU9mLmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsQmFyWCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGxCYXJYLmpzXCI7XG5pbXBvcnQgZ2V0RG9jdW1lbnRFbGVtZW50IGZyb20gXCIuL2dldERvY3VtZW50RWxlbWVudC5qc1wiO1xuaW1wb3J0IGlzU2Nyb2xsUGFyZW50IGZyb20gXCIuL2lzU2Nyb2xsUGFyZW50LmpzXCI7XG5pbXBvcnQgeyByb3VuZCB9IGZyb20gXCIuLi91dGlscy9tYXRoLmpzXCI7XG5cbmZ1bmN0aW9uIGlzRWxlbWVudFNjYWxlZChlbGVtZW50KSB7XG4gIHZhciByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdmFyIHNjYWxlWCA9IHJvdW5kKHJlY3Qud2lkdGgpIC8gZWxlbWVudC5vZmZzZXRXaWR0aCB8fCAxO1xuICB2YXIgc2NhbGVZID0gcm91bmQocmVjdC5oZWlnaHQpIC8gZWxlbWVudC5vZmZzZXRIZWlnaHQgfHwgMTtcbiAgcmV0dXJuIHNjYWxlWCAhPT0gMSB8fCBzY2FsZVkgIT09IDE7XG59IC8vIFJldHVybnMgdGhlIGNvbXBvc2l0ZSByZWN0IG9mIGFuIGVsZW1lbnQgcmVsYXRpdmUgdG8gaXRzIG9mZnNldFBhcmVudC5cbi8vIENvbXBvc2l0ZSBtZWFucyBpdCB0YWtlcyBpbnRvIGFjY291bnQgdHJhbnNmb3JtcyBhcyB3ZWxsIGFzIGxheW91dC5cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDb21wb3NpdGVSZWN0KGVsZW1lbnRPclZpcnR1YWxFbGVtZW50LCBvZmZzZXRQYXJlbnQsIGlzRml4ZWQpIHtcbiAgaWYgKGlzRml4ZWQgPT09IHZvaWQgMCkge1xuICAgIGlzRml4ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIHZhciBpc09mZnNldFBhcmVudEFuRWxlbWVudCA9IGlzSFRNTEVsZW1lbnQob2Zmc2V0UGFyZW50KTtcbiAgdmFyIG9mZnNldFBhcmVudElzU2NhbGVkID0gaXNIVE1MRWxlbWVudChvZmZzZXRQYXJlbnQpICYmIGlzRWxlbWVudFNjYWxlZChvZmZzZXRQYXJlbnQpO1xuICB2YXIgZG9jdW1lbnRFbGVtZW50ID0gZ2V0RG9jdW1lbnRFbGVtZW50KG9mZnNldFBhcmVudCk7XG4gIHZhciByZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnRPclZpcnR1YWxFbGVtZW50LCBvZmZzZXRQYXJlbnRJc1NjYWxlZCwgaXNGaXhlZCk7XG4gIHZhciBzY3JvbGwgPSB7XG4gICAgc2Nyb2xsTGVmdDogMCxcbiAgICBzY3JvbGxUb3A6IDBcbiAgfTtcbiAgdmFyIG9mZnNldHMgPSB7XG4gICAgeDogMCxcbiAgICB5OiAwXG4gIH07XG5cbiAgaWYgKGlzT2Zmc2V0UGFyZW50QW5FbGVtZW50IHx8ICFpc09mZnNldFBhcmVudEFuRWxlbWVudCAmJiAhaXNGaXhlZCkge1xuICAgIGlmIChnZXROb2RlTmFtZShvZmZzZXRQYXJlbnQpICE9PSAnYm9keScgfHwgLy8gaHR0cHM6Ly9naXRodWIuY29tL3BvcHBlcmpzL3BvcHBlci1jb3JlL2lzc3Vlcy8xMDc4XG4gICAgaXNTY3JvbGxQYXJlbnQoZG9jdW1lbnRFbGVtZW50KSkge1xuICAgICAgc2Nyb2xsID0gZ2V0Tm9kZVNjcm9sbChvZmZzZXRQYXJlbnQpO1xuICAgIH1cblxuICAgIGlmIChpc0hUTUxFbGVtZW50KG9mZnNldFBhcmVudCkpIHtcbiAgICAgIG9mZnNldHMgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3Qob2Zmc2V0UGFyZW50LCB0cnVlKTtcbiAgICAgIG9mZnNldHMueCArPSBvZmZzZXRQYXJlbnQuY2xpZW50TGVmdDtcbiAgICAgIG9mZnNldHMueSArPSBvZmZzZXRQYXJlbnQuY2xpZW50VG9wO1xuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICBvZmZzZXRzLnggPSBnZXRXaW5kb3dTY3JvbGxCYXJYKGRvY3VtZW50RWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB4OiByZWN0LmxlZnQgKyBzY3JvbGwuc2Nyb2xsTGVmdCAtIG9mZnNldHMueCxcbiAgICB5OiByZWN0LnRvcCArIHNjcm9sbC5zY3JvbGxUb3AgLSBvZmZzZXRzLnksXG4gICAgd2lkdGg6IHJlY3Qud2lkdGgsXG4gICAgaGVpZ2h0OiByZWN0LmhlaWdodFxuICB9O1xufSIsImltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGdldFdpbmRvdyhlbGVtZW50KS5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xufSIsImltcG9ydCB7IGlzRWxlbWVudCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldERvY3VtZW50RWxlbWVudChlbGVtZW50KSB7XG4gIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXJldHVybl06IGFzc3VtZSBib2R5IGlzIGFsd2F5cyBhdmFpbGFibGVcbiAgcmV0dXJuICgoaXNFbGVtZW50KGVsZW1lbnQpID8gZWxlbWVudC5vd25lckRvY3VtZW50IDogLy8gJEZsb3dGaXhNZVtwcm9wLW1pc3NpbmddXG4gIGVsZW1lbnQuZG9jdW1lbnQpIHx8IHdpbmRvdy5kb2N1bWVudCkuZG9jdW1lbnRFbGVtZW50O1xufSIsImltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4vZ2V0RG9jdW1lbnRFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0Q29tcHV0ZWRTdHlsZSBmcm9tIFwiLi9nZXRDb21wdXRlZFN0eWxlLmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsQmFyWCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGxCYXJYLmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsIGZyb20gXCIuL2dldFdpbmRvd1Njcm9sbC5qc1wiO1xuaW1wb3J0IHsgbWF4IH0gZnJvbSBcIi4uL3V0aWxzL21hdGguanNcIjsgLy8gR2V0cyB0aGUgZW50aXJlIHNpemUgb2YgdGhlIHNjcm9sbGFibGUgZG9jdW1lbnQgYXJlYSwgZXZlbiBleHRlbmRpbmcgb3V0c2lkZVxuLy8gb2YgdGhlIGA8aHRtbD5gIGFuZCBgPGJvZHk+YCByZWN0IGJvdW5kcyBpZiBob3Jpem9udGFsbHkgc2Nyb2xsYWJsZVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXREb2N1bWVudFJlY3QoZWxlbWVudCkge1xuICB2YXIgX2VsZW1lbnQkb3duZXJEb2N1bWVuO1xuXG4gIHZhciBodG1sID0gZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpO1xuICB2YXIgd2luU2Nyb2xsID0gZ2V0V2luZG93U2Nyb2xsKGVsZW1lbnQpO1xuICB2YXIgYm9keSA9IChfZWxlbWVudCRvd25lckRvY3VtZW4gPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQpID09IG51bGwgPyB2b2lkIDAgOiBfZWxlbWVudCRvd25lckRvY3VtZW4uYm9keTtcbiAgdmFyIHdpZHRoID0gbWF4KGh0bWwuc2Nyb2xsV2lkdGgsIGh0bWwuY2xpZW50V2lkdGgsIGJvZHkgPyBib2R5LnNjcm9sbFdpZHRoIDogMCwgYm9keSA/IGJvZHkuY2xpZW50V2lkdGggOiAwKTtcbiAgdmFyIGhlaWdodCA9IG1heChodG1sLnNjcm9sbEhlaWdodCwgaHRtbC5jbGllbnRIZWlnaHQsIGJvZHkgPyBib2R5LnNjcm9sbEhlaWdodCA6IDAsIGJvZHkgPyBib2R5LmNsaWVudEhlaWdodCA6IDApO1xuICB2YXIgeCA9IC13aW5TY3JvbGwuc2Nyb2xsTGVmdCArIGdldFdpbmRvd1Njcm9sbEJhclgoZWxlbWVudCk7XG4gIHZhciB5ID0gLXdpblNjcm9sbC5zY3JvbGxUb3A7XG5cbiAgaWYgKGdldENvbXB1dGVkU3R5bGUoYm9keSB8fCBodG1sKS5kaXJlY3Rpb24gPT09ICdydGwnKSB7XG4gICAgeCArPSBtYXgoaHRtbC5jbGllbnRXaWR0aCwgYm9keSA/IGJvZHkuY2xpZW50V2lkdGggOiAwKSAtIHdpZHRoO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH07XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0SFRNTEVsZW1lbnRTY3JvbGwoZWxlbWVudCkge1xuICByZXR1cm4ge1xuICAgIHNjcm9sbExlZnQ6IGVsZW1lbnQuc2Nyb2xsTGVmdCxcbiAgICBzY3JvbGxUb3A6IGVsZW1lbnQuc2Nyb2xsVG9wXG4gIH07XG59IiwiaW1wb3J0IGdldEJvdW5kaW5nQ2xpZW50UmVjdCBmcm9tIFwiLi9nZXRCb3VuZGluZ0NsaWVudFJlY3QuanNcIjsgLy8gUmV0dXJucyB0aGUgbGF5b3V0IHJlY3Qgb2YgYW4gZWxlbWVudCByZWxhdGl2ZSB0byBpdHMgb2Zmc2V0UGFyZW50LiBMYXlvdXRcbi8vIG1lYW5zIGl0IGRvZXNuJ3QgdGFrZSBpbnRvIGFjY291bnQgdHJhbnNmb3Jtcy5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0TGF5b3V0UmVjdChlbGVtZW50KSB7XG4gIHZhciBjbGllbnRSZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnQpOyAvLyBVc2UgdGhlIGNsaWVudFJlY3Qgc2l6ZXMgaWYgaXQncyBub3QgYmVlbiB0cmFuc2Zvcm1lZC5cbiAgLy8gRml4ZXMgaHR0cHM6Ly9naXRodWIuY29tL3BvcHBlcmpzL3BvcHBlci1jb3JlL2lzc3Vlcy8xMjIzXG5cbiAgdmFyIHdpZHRoID0gZWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgdmFyIGhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuXG4gIGlmIChNYXRoLmFicyhjbGllbnRSZWN0LndpZHRoIC0gd2lkdGgpIDw9IDEpIHtcbiAgICB3aWR0aCA9IGNsaWVudFJlY3Qud2lkdGg7XG4gIH1cblxuICBpZiAoTWF0aC5hYnMoY2xpZW50UmVjdC5oZWlnaHQgLSBoZWlnaHQpIDw9IDEpIHtcbiAgICBoZWlnaHQgPSBjbGllbnRSZWN0LmhlaWdodDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgeDogZWxlbWVudC5vZmZzZXRMZWZ0LFxuICAgIHk6IGVsZW1lbnQub2Zmc2V0VG9wLFxuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBoZWlnaHQ6IGhlaWdodFxuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE5vZGVOYW1lKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQgPyAoZWxlbWVudC5ub2RlTmFtZSB8fCAnJykudG9Mb3dlckNhc2UoKSA6IG51bGw7XG59IiwiaW1wb3J0IGdldFdpbmRvd1Njcm9sbCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGwuanNcIjtcbmltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5pbXBvcnQgeyBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IGdldEhUTUxFbGVtZW50U2Nyb2xsIGZyb20gXCIuL2dldEhUTUxFbGVtZW50U2Nyb2xsLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXROb2RlU2Nyb2xsKG5vZGUpIHtcbiAgaWYgKG5vZGUgPT09IGdldFdpbmRvdyhub2RlKSB8fCAhaXNIVE1MRWxlbWVudChub2RlKSkge1xuICAgIHJldHVybiBnZXRXaW5kb3dTY3JvbGwobm9kZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGdldEhUTUxFbGVtZW50U2Nyb2xsKG5vZGUpO1xuICB9XG59IiwiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBnZXROb2RlTmFtZSBmcm9tIFwiLi9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IGdldENvbXB1dGVkU3R5bGUgZnJvbSBcIi4vZ2V0Q29tcHV0ZWRTdHlsZS5qc1wiO1xuaW1wb3J0IHsgaXNIVE1MRWxlbWVudCwgaXNTaGFkb3dSb290IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IGlzVGFibGVFbGVtZW50IGZyb20gXCIuL2lzVGFibGVFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0UGFyZW50Tm9kZSBmcm9tIFwiLi9nZXRQYXJlbnROb2RlLmpzXCI7XG5pbXBvcnQgZ2V0VUFTdHJpbmcgZnJvbSBcIi4uL3V0aWxzL3VzZXJBZ2VudC5qc1wiO1xuXG5mdW5jdGlvbiBnZXRUcnVlT2Zmc2V0UGFyZW50KGVsZW1lbnQpIHtcbiAgaWYgKCFpc0hUTUxFbGVtZW50KGVsZW1lbnQpIHx8IC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9wb3BwZXJqcy9wb3BwZXItY29yZS9pc3N1ZXMvODM3XG4gIGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkucG9zaXRpb24gPT09ICdmaXhlZCcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50Lm9mZnNldFBhcmVudDtcbn0gLy8gYC5vZmZzZXRQYXJlbnRgIHJlcG9ydHMgYG51bGxgIGZvciBmaXhlZCBlbGVtZW50cywgd2hpbGUgYWJzb2x1dGUgZWxlbWVudHNcbi8vIHJldHVybiB0aGUgY29udGFpbmluZyBibG9ja1xuXG5cbmZ1bmN0aW9uIGdldENvbnRhaW5pbmdCbG9jayhlbGVtZW50KSB7XG4gIHZhciBpc0ZpcmVmb3ggPSAvZmlyZWZveC9pLnRlc3QoZ2V0VUFTdHJpbmcoKSk7XG4gIHZhciBpc0lFID0gL1RyaWRlbnQvaS50ZXN0KGdldFVBU3RyaW5nKCkpO1xuXG4gIGlmIChpc0lFICYmIGlzSFRNTEVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICAvLyBJbiBJRSA5LCAxMCBhbmQgMTEgZml4ZWQgZWxlbWVudHMgY29udGFpbmluZyBibG9jayBpcyBhbHdheXMgZXN0YWJsaXNoZWQgYnkgdGhlIHZpZXdwb3J0XG4gICAgdmFyIGVsZW1lbnRDc3MgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuXG4gICAgaWYgKGVsZW1lbnRDc3MucG9zaXRpb24gPT09ICdmaXhlZCcpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjdXJyZW50Tm9kZSA9IGdldFBhcmVudE5vZGUoZWxlbWVudCk7XG5cbiAgaWYgKGlzU2hhZG93Um9vdChjdXJyZW50Tm9kZSkpIHtcbiAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLmhvc3Q7XG4gIH1cblxuICB3aGlsZSAoaXNIVE1MRWxlbWVudChjdXJyZW50Tm9kZSkgJiYgWydodG1sJywgJ2JvZHknXS5pbmRleE9mKGdldE5vZGVOYW1lKGN1cnJlbnROb2RlKSkgPCAwKSB7XG4gICAgdmFyIGNzcyA9IGdldENvbXB1dGVkU3R5bGUoY3VycmVudE5vZGUpOyAvLyBUaGlzIGlzIG5vbi1leGhhdXN0aXZlIGJ1dCBjb3ZlcnMgdGhlIG1vc3QgY29tbW9uIENTUyBwcm9wZXJ0aWVzIHRoYXRcbiAgICAvLyBjcmVhdGUgYSBjb250YWluaW5nIGJsb2NrLlxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0NTUy9Db250YWluaW5nX2Jsb2NrI2lkZW50aWZ5aW5nX3RoZV9jb250YWluaW5nX2Jsb2NrXG5cbiAgICBpZiAoY3NzLnRyYW5zZm9ybSAhPT0gJ25vbmUnIHx8IGNzcy5wZXJzcGVjdGl2ZSAhPT0gJ25vbmUnIHx8IGNzcy5jb250YWluID09PSAncGFpbnQnIHx8IFsndHJhbnNmb3JtJywgJ3BlcnNwZWN0aXZlJ10uaW5kZXhPZihjc3Mud2lsbENoYW5nZSkgIT09IC0xIHx8IGlzRmlyZWZveCAmJiBjc3Mud2lsbENoYW5nZSA9PT0gJ2ZpbHRlcicgfHwgaXNGaXJlZm94ICYmIGNzcy5maWx0ZXIgJiYgY3NzLmZpbHRlciAhPT0gJ25vbmUnKSB7XG4gICAgICByZXR1cm4gY3VycmVudE5vZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn0gLy8gR2V0cyB0aGUgY2xvc2VzdCBhbmNlc3RvciBwb3NpdGlvbmVkIGVsZW1lbnQuIEhhbmRsZXMgc29tZSBlZGdlIGNhc2VzLFxuLy8gc3VjaCBhcyB0YWJsZSBhbmNlc3RvcnMgYW5kIGNyb3NzIGJyb3dzZXIgYnVncy5cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRPZmZzZXRQYXJlbnQoZWxlbWVudCkge1xuICB2YXIgd2luZG93ID0gZ2V0V2luZG93KGVsZW1lbnQpO1xuICB2YXIgb2Zmc2V0UGFyZW50ID0gZ2V0VHJ1ZU9mZnNldFBhcmVudChlbGVtZW50KTtcblxuICB3aGlsZSAob2Zmc2V0UGFyZW50ICYmIGlzVGFibGVFbGVtZW50KG9mZnNldFBhcmVudCkgJiYgZ2V0Q29tcHV0ZWRTdHlsZShvZmZzZXRQYXJlbnQpLnBvc2l0aW9uID09PSAnc3RhdGljJykge1xuICAgIG9mZnNldFBhcmVudCA9IGdldFRydWVPZmZzZXRQYXJlbnQob2Zmc2V0UGFyZW50KTtcbiAgfVxuXG4gIGlmIChvZmZzZXRQYXJlbnQgJiYgKGdldE5vZGVOYW1lKG9mZnNldFBhcmVudCkgPT09ICdodG1sJyB8fCBnZXROb2RlTmFtZShvZmZzZXRQYXJlbnQpID09PSAnYm9keScgJiYgZ2V0Q29tcHV0ZWRTdHlsZShvZmZzZXRQYXJlbnQpLnBvc2l0aW9uID09PSAnc3RhdGljJykpIHtcbiAgICByZXR1cm4gd2luZG93O1xuICB9XG5cbiAgcmV0dXJuIG9mZnNldFBhcmVudCB8fCBnZXRDb250YWluaW5nQmxvY2soZWxlbWVudCkgfHwgd2luZG93O1xufSIsImltcG9ydCBnZXROb2RlTmFtZSBmcm9tIFwiLi9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCB7IGlzU2hhZG93Um9vdCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFBhcmVudE5vZGUoZWxlbWVudCkge1xuICBpZiAoZ2V0Tm9kZU5hbWUoZWxlbWVudCkgPT09ICdodG1sJykge1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgcmV0dXJuICgvLyB0aGlzIGlzIGEgcXVpY2tlciAoYnV0IGxlc3MgdHlwZSBzYWZlKSB3YXkgdG8gc2F2ZSBxdWl0ZSBzb21lIGJ5dGVzIGZyb20gdGhlIGJ1bmRsZVxuICAgIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXJldHVybl1cbiAgICAvLyAkRmxvd0ZpeE1lW3Byb3AtbWlzc2luZ11cbiAgICBlbGVtZW50LmFzc2lnbmVkU2xvdCB8fCAvLyBzdGVwIGludG8gdGhlIHNoYWRvdyBET00gb2YgdGhlIHBhcmVudCBvZiBhIHNsb3R0ZWQgbm9kZVxuICAgIGVsZW1lbnQucGFyZW50Tm9kZSB8fCAoIC8vIERPTSBFbGVtZW50IGRldGVjdGVkXG4gICAgaXNTaGFkb3dSb290KGVsZW1lbnQpID8gZWxlbWVudC5ob3N0IDogbnVsbCkgfHwgLy8gU2hhZG93Um9vdCBkZXRlY3RlZFxuICAgIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLWNhbGxdOiBIVE1MRWxlbWVudCBpcyBhIE5vZGVcbiAgICBnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCkgLy8gZmFsbGJhY2tcblxuICApO1xufSIsImltcG9ydCBnZXRQYXJlbnROb2RlIGZyb20gXCIuL2dldFBhcmVudE5vZGUuanNcIjtcbmltcG9ydCBpc1Njcm9sbFBhcmVudCBmcm9tIFwiLi9pc1Njcm9sbFBhcmVudC5qc1wiO1xuaW1wb3J0IGdldE5vZGVOYW1lIGZyb20gXCIuL2dldE5vZGVOYW1lLmpzXCI7XG5pbXBvcnQgeyBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2Nyb2xsUGFyZW50KG5vZGUpIHtcbiAgaWYgKFsnaHRtbCcsICdib2R5JywgJyNkb2N1bWVudCddLmluZGV4T2YoZ2V0Tm9kZU5hbWUobm9kZSkpID49IDApIHtcbiAgICAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS1yZXR1cm5dOiBhc3N1bWUgYm9keSBpcyBhbHdheXMgYXZhaWxhYmxlXG4gICAgcmV0dXJuIG5vZGUub3duZXJEb2N1bWVudC5ib2R5O1xuICB9XG5cbiAgaWYgKGlzSFRNTEVsZW1lbnQobm9kZSkgJiYgaXNTY3JvbGxQYXJlbnQobm9kZSkpIHtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHJldHVybiBnZXRTY3JvbGxQYXJlbnQoZ2V0UGFyZW50Tm9kZShub2RlKSk7XG59IiwiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4vZ2V0RG9jdW1lbnRFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsQmFyWCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGxCYXJYLmpzXCI7XG5pbXBvcnQgaXNMYXlvdXRWaWV3cG9ydCBmcm9tIFwiLi9pc0xheW91dFZpZXdwb3J0LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRWaWV3cG9ydFJlY3QoZWxlbWVudCwgc3RyYXRlZ3kpIHtcbiAgdmFyIHdpbiA9IGdldFdpbmRvdyhlbGVtZW50KTtcbiAgdmFyIGh0bWwgPSBnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCk7XG4gIHZhciB2aXN1YWxWaWV3cG9ydCA9IHdpbi52aXN1YWxWaWV3cG9ydDtcbiAgdmFyIHdpZHRoID0gaHRtbC5jbGllbnRXaWR0aDtcbiAgdmFyIGhlaWdodCA9IGh0bWwuY2xpZW50SGVpZ2h0O1xuICB2YXIgeCA9IDA7XG4gIHZhciB5ID0gMDtcblxuICBpZiAodmlzdWFsVmlld3BvcnQpIHtcbiAgICB3aWR0aCA9IHZpc3VhbFZpZXdwb3J0LndpZHRoO1xuICAgIGhlaWdodCA9IHZpc3VhbFZpZXdwb3J0LmhlaWdodDtcbiAgICB2YXIgbGF5b3V0Vmlld3BvcnQgPSBpc0xheW91dFZpZXdwb3J0KCk7XG5cbiAgICBpZiAobGF5b3V0Vmlld3BvcnQgfHwgIWxheW91dFZpZXdwb3J0ICYmIHN0cmF0ZWd5ID09PSAnZml4ZWQnKSB7XG4gICAgICB4ID0gdmlzdWFsVmlld3BvcnQub2Zmc2V0TGVmdDtcbiAgICAgIHkgPSB2aXN1YWxWaWV3cG9ydC5vZmZzZXRUb3A7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgeDogeCArIGdldFdpbmRvd1Njcm9sbEJhclgoZWxlbWVudCksXG4gICAgeTogeVxuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFdpbmRvdyhub2RlKSB7XG4gIGlmIChub2RlID09IG51bGwpIHtcbiAgICByZXR1cm4gd2luZG93O1xuICB9XG5cbiAgaWYgKG5vZGUudG9TdHJpbmcoKSAhPT0gJ1tvYmplY3QgV2luZG93XScpIHtcbiAgICB2YXIgb3duZXJEb2N1bWVudCA9IG5vZGUub3duZXJEb2N1bWVudDtcbiAgICByZXR1cm4gb3duZXJEb2N1bWVudCA/IG93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcgfHwgd2luZG93IDogd2luZG93O1xuICB9XG5cbiAgcmV0dXJuIG5vZGU7XG59IiwiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFdpbmRvd1Njcm9sbChub2RlKSB7XG4gIHZhciB3aW4gPSBnZXRXaW5kb3cobm9kZSk7XG4gIHZhciBzY3JvbGxMZWZ0ID0gd2luLnBhZ2VYT2Zmc2V0O1xuICB2YXIgc2Nyb2xsVG9wID0gd2luLnBhZ2VZT2Zmc2V0O1xuICByZXR1cm4ge1xuICAgIHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsXG4gICAgc2Nyb2xsVG9wOiBzY3JvbGxUb3BcbiAgfTtcbn0iLCJpbXBvcnQgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGZyb20gXCIuL2dldEJvdW5kaW5nQ2xpZW50UmVjdC5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRXaW5kb3dTY3JvbGwgZnJvbSBcIi4vZ2V0V2luZG93U2Nyb2xsLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRXaW5kb3dTY3JvbGxCYXJYKGVsZW1lbnQpIHtcbiAgLy8gSWYgPGh0bWw+IGhhcyBhIENTUyB3aWR0aCBncmVhdGVyIHRoYW4gdGhlIHZpZXdwb3J0LCB0aGVuIHRoaXMgd2lsbCBiZVxuICAvLyBpbmNvcnJlY3QgZm9yIFJUTC5cbiAgLy8gUG9wcGVyIDEgaXMgYnJva2VuIGluIHRoaXMgY2FzZSBhbmQgbmV2ZXIgaGFkIGEgYnVnIHJlcG9ydCBzbyBsZXQncyBhc3N1bWVcbiAgLy8gaXQncyBub3QgYW4gaXNzdWUuIEkgZG9uJ3QgdGhpbmsgYW55b25lIGV2ZXIgc3BlY2lmaWVzIHdpZHRoIG9uIDxodG1sPlxuICAvLyBhbnl3YXkuXG4gIC8vIEJyb3dzZXJzIHdoZXJlIHRoZSBsZWZ0IHNjcm9sbGJhciBkb2Vzbid0IGNhdXNlIGFuIGlzc3VlIHJlcG9ydCBgMGAgZm9yXG4gIC8vIHRoaXMgKGUuZy4gRWRnZSAyMDE5LCBJRTExLCBTYWZhcmkpXG4gIHJldHVybiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpKS5sZWZ0ICsgZ2V0V2luZG93U2Nyb2xsKGVsZW1lbnQpLnNjcm9sbExlZnQ7XG59IiwiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcblxuZnVuY3Rpb24gaXNFbGVtZW50KG5vZGUpIHtcbiAgdmFyIE93bkVsZW1lbnQgPSBnZXRXaW5kb3cobm9kZSkuRWxlbWVudDtcbiAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBPd25FbGVtZW50IHx8IG5vZGUgaW5zdGFuY2VvZiBFbGVtZW50O1xufVxuXG5mdW5jdGlvbiBpc0hUTUxFbGVtZW50KG5vZGUpIHtcbiAgdmFyIE93bkVsZW1lbnQgPSBnZXRXaW5kb3cobm9kZSkuSFRNTEVsZW1lbnQ7XG4gIHJldHVybiBub2RlIGluc3RhbmNlb2YgT3duRWxlbWVudCB8fCBub2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGlzU2hhZG93Um9vdChub2RlKSB7XG4gIC8vIElFIDExIGhhcyBubyBTaGFkb3dSb290XG4gIGlmICh0eXBlb2YgU2hhZG93Um9vdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgT3duRWxlbWVudCA9IGdldFdpbmRvdyhub2RlKS5TaGFkb3dSb290O1xuICByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIE93bkVsZW1lbnQgfHwgbm9kZSBpbnN0YW5jZW9mIFNoYWRvd1Jvb3Q7XG59XG5cbmV4cG9ydCB7IGlzRWxlbWVudCwgaXNIVE1MRWxlbWVudCwgaXNTaGFkb3dSb290IH07IiwiaW1wb3J0IGdldFVBU3RyaW5nIGZyb20gXCIuLi91dGlscy91c2VyQWdlbnQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzTGF5b3V0Vmlld3BvcnQoKSB7XG4gIHJldHVybiAhL14oKD8hY2hyb21lfGFuZHJvaWQpLikqc2FmYXJpL2kudGVzdChnZXRVQVN0cmluZygpKTtcbn0iLCJpbXBvcnQgZ2V0Q29tcHV0ZWRTdHlsZSBmcm9tIFwiLi9nZXRDb21wdXRlZFN0eWxlLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1Njcm9sbFBhcmVudChlbGVtZW50KSB7XG4gIC8vIEZpcmVmb3ggd2FudHMgdXMgdG8gY2hlY2sgYC14YCBhbmQgYC15YCB2YXJpYXRpb25zIGFzIHdlbGxcbiAgdmFyIF9nZXRDb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KSxcbiAgICAgIG92ZXJmbG93ID0gX2dldENvbXB1dGVkU3R5bGUub3ZlcmZsb3csXG4gICAgICBvdmVyZmxvd1ggPSBfZ2V0Q29tcHV0ZWRTdHlsZS5vdmVyZmxvd1gsXG4gICAgICBvdmVyZmxvd1kgPSBfZ2V0Q29tcHV0ZWRTdHlsZS5vdmVyZmxvd1k7XG5cbiAgcmV0dXJuIC9hdXRvfHNjcm9sbHxvdmVybGF5fGhpZGRlbi8udGVzdChvdmVyZmxvdyArIG92ZXJmbG93WSArIG92ZXJmbG93WCk7XG59IiwiaW1wb3J0IGdldE5vZGVOYW1lIGZyb20gXCIuL2dldE5vZGVOYW1lLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1RhYmxlRWxlbWVudChlbGVtZW50KSB7XG4gIHJldHVybiBbJ3RhYmxlJywgJ3RkJywgJ3RoJ10uaW5kZXhPZihnZXROb2RlTmFtZShlbGVtZW50KSkgPj0gMDtcbn0iLCJpbXBvcnQgZ2V0U2Nyb2xsUGFyZW50IGZyb20gXCIuL2dldFNjcm9sbFBhcmVudC5qc1wiO1xuaW1wb3J0IGdldFBhcmVudE5vZGUgZnJvbSBcIi4vZ2V0UGFyZW50Tm9kZS5qc1wiO1xuaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBpc1Njcm9sbFBhcmVudCBmcm9tIFwiLi9pc1Njcm9sbFBhcmVudC5qc1wiO1xuLypcbmdpdmVuIGEgRE9NIGVsZW1lbnQsIHJldHVybiB0aGUgbGlzdCBvZiBhbGwgc2Nyb2xsIHBhcmVudHMsIHVwIHRoZSBsaXN0IG9mIGFuY2Vzb3JzXG51bnRpbCB3ZSBnZXQgdG8gdGhlIHRvcCB3aW5kb3cgb2JqZWN0LiBUaGlzIGxpc3QgaXMgd2hhdCB3ZSBhdHRhY2ggc2Nyb2xsIGxpc3RlbmVyc1xudG8sIGJlY2F1c2UgaWYgYW55IG9mIHRoZXNlIHBhcmVudCBlbGVtZW50cyBzY3JvbGwsIHdlJ2xsIG5lZWQgdG8gcmUtY2FsY3VsYXRlIHRoZVxucmVmZXJlbmNlIGVsZW1lbnQncyBwb3NpdGlvbi5cbiovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxpc3RTY3JvbGxQYXJlbnRzKGVsZW1lbnQsIGxpc3QpIHtcbiAgdmFyIF9lbGVtZW50JG93bmVyRG9jdW1lbjtcblxuICBpZiAobGlzdCA9PT0gdm9pZCAwKSB7XG4gICAgbGlzdCA9IFtdO1xuICB9XG5cbiAgdmFyIHNjcm9sbFBhcmVudCA9IGdldFNjcm9sbFBhcmVudChlbGVtZW50KTtcbiAgdmFyIGlzQm9keSA9IHNjcm9sbFBhcmVudCA9PT0gKChfZWxlbWVudCRvd25lckRvY3VtZW4gPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQpID09IG51bGwgPyB2b2lkIDAgOiBfZWxlbWVudCRvd25lckRvY3VtZW4uYm9keSk7XG4gIHZhciB3aW4gPSBnZXRXaW5kb3coc2Nyb2xsUGFyZW50KTtcbiAgdmFyIHRhcmdldCA9IGlzQm9keSA/IFt3aW5dLmNvbmNhdCh3aW4udmlzdWFsVmlld3BvcnQgfHwgW10sIGlzU2Nyb2xsUGFyZW50KHNjcm9sbFBhcmVudCkgPyBzY3JvbGxQYXJlbnQgOiBbXSkgOiBzY3JvbGxQYXJlbnQ7XG4gIHZhciB1cGRhdGVkTGlzdCA9IGxpc3QuY29uY2F0KHRhcmdldCk7XG4gIHJldHVybiBpc0JvZHkgPyB1cGRhdGVkTGlzdCA6IC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLWNhbGxdOiBpc0JvZHkgdGVsbHMgdXMgdGFyZ2V0IHdpbGwgYmUgYW4gSFRNTEVsZW1lbnQgaGVyZVxuICB1cGRhdGVkTGlzdC5jb25jYXQobGlzdFNjcm9sbFBhcmVudHMoZ2V0UGFyZW50Tm9kZSh0YXJnZXQpKSk7XG59IiwiZXhwb3J0IHZhciB0b3AgPSAndG9wJztcbmV4cG9ydCB2YXIgYm90dG9tID0gJ2JvdHRvbSc7XG5leHBvcnQgdmFyIHJpZ2h0ID0gJ3JpZ2h0JztcbmV4cG9ydCB2YXIgbGVmdCA9ICdsZWZ0JztcbmV4cG9ydCB2YXIgYXV0byA9ICdhdXRvJztcbmV4cG9ydCB2YXIgYmFzZVBsYWNlbWVudHMgPSBbdG9wLCBib3R0b20sIHJpZ2h0LCBsZWZ0XTtcbmV4cG9ydCB2YXIgc3RhcnQgPSAnc3RhcnQnO1xuZXhwb3J0IHZhciBlbmQgPSAnZW5kJztcbmV4cG9ydCB2YXIgY2xpcHBpbmdQYXJlbnRzID0gJ2NsaXBwaW5nUGFyZW50cyc7XG5leHBvcnQgdmFyIHZpZXdwb3J0ID0gJ3ZpZXdwb3J0JztcbmV4cG9ydCB2YXIgcG9wcGVyID0gJ3BvcHBlcic7XG5leHBvcnQgdmFyIHJlZmVyZW5jZSA9ICdyZWZlcmVuY2UnO1xuZXhwb3J0IHZhciB2YXJpYXRpb25QbGFjZW1lbnRzID0gLyojX19QVVJFX18qL2Jhc2VQbGFjZW1lbnRzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIGFjYy5jb25jYXQoW3BsYWNlbWVudCArIFwiLVwiICsgc3RhcnQsIHBsYWNlbWVudCArIFwiLVwiICsgZW5kXSk7XG59LCBbXSk7XG5leHBvcnQgdmFyIHBsYWNlbWVudHMgPSAvKiNfX1BVUkVfXyovW10uY29uY2F0KGJhc2VQbGFjZW1lbnRzLCBbYXV0b10pLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIGFjYy5jb25jYXQoW3BsYWNlbWVudCwgcGxhY2VtZW50ICsgXCItXCIgKyBzdGFydCwgcGxhY2VtZW50ICsgXCItXCIgKyBlbmRdKTtcbn0sIFtdKTsgLy8gbW9kaWZpZXJzIHRoYXQgbmVlZCB0byByZWFkIHRoZSBET01cblxuZXhwb3J0IHZhciBiZWZvcmVSZWFkID0gJ2JlZm9yZVJlYWQnO1xuZXhwb3J0IHZhciByZWFkID0gJ3JlYWQnO1xuZXhwb3J0IHZhciBhZnRlclJlYWQgPSAnYWZ0ZXJSZWFkJzsgLy8gcHVyZS1sb2dpYyBtb2RpZmllcnNcblxuZXhwb3J0IHZhciBiZWZvcmVNYWluID0gJ2JlZm9yZU1haW4nO1xuZXhwb3J0IHZhciBtYWluID0gJ21haW4nO1xuZXhwb3J0IHZhciBhZnRlck1haW4gPSAnYWZ0ZXJNYWluJzsgLy8gbW9kaWZpZXIgd2l0aCB0aGUgcHVycG9zZSB0byB3cml0ZSB0byB0aGUgRE9NIChvciB3cml0ZSBpbnRvIGEgZnJhbWV3b3JrIHN0YXRlKVxuXG5leHBvcnQgdmFyIGJlZm9yZVdyaXRlID0gJ2JlZm9yZVdyaXRlJztcbmV4cG9ydCB2YXIgd3JpdGUgPSAnd3JpdGUnO1xuZXhwb3J0IHZhciBhZnRlcldyaXRlID0gJ2FmdGVyV3JpdGUnO1xuZXhwb3J0IHZhciBtb2RpZmllclBoYXNlcyA9IFtiZWZvcmVSZWFkLCByZWFkLCBhZnRlclJlYWQsIGJlZm9yZU1haW4sIG1haW4sIGFmdGVyTWFpbiwgYmVmb3JlV3JpdGUsIHdyaXRlLCBhZnRlcldyaXRlXTsiLCJpbXBvcnQgZ2V0Tm9kZU5hbWUgZnJvbSBcIi4uL2RvbS11dGlscy9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IHsgaXNIVE1MRWxlbWVudCB9IGZyb20gXCIuLi9kb20tdXRpbHMvaW5zdGFuY2VPZi5qc1wiOyAvLyBUaGlzIG1vZGlmaWVyIHRha2VzIHRoZSBzdHlsZXMgcHJlcGFyZWQgYnkgdGhlIGBjb21wdXRlU3R5bGVzYCBtb2RpZmllclxuLy8gYW5kIGFwcGxpZXMgdGhlbSB0byB0aGUgSFRNTEVsZW1lbnRzIHN1Y2ggYXMgcG9wcGVyIGFuZCBhcnJvd1xuXG5mdW5jdGlvbiBhcHBseVN0eWxlcyhfcmVmKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYuc3RhdGU7XG4gIE9iamVjdC5rZXlzKHN0YXRlLmVsZW1lbnRzKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdmFyIHN0eWxlID0gc3RhdGUuc3R5bGVzW25hbWVdIHx8IHt9O1xuICAgIHZhciBhdHRyaWJ1dGVzID0gc3RhdGUuYXR0cmlidXRlc1tuYW1lXSB8fCB7fTtcbiAgICB2YXIgZWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzW25hbWVdOyAvLyBhcnJvdyBpcyBvcHRpb25hbCArIHZpcnR1YWwgZWxlbWVudHNcblxuICAgIGlmICghaXNIVE1MRWxlbWVudChlbGVtZW50KSB8fCAhZ2V0Tm9kZU5hbWUoZWxlbWVudCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IC8vIEZsb3cgZG9lc24ndCBzdXBwb3J0IHRvIGV4dGVuZCB0aGlzIHByb3BlcnR5LCBidXQgaXQncyB0aGUgbW9zdFxuICAgIC8vIGVmZmVjdGl2ZSB3YXkgdG8gYXBwbHkgc3R5bGVzIHRvIGFuIEhUTUxFbGVtZW50XG4gICAgLy8gJEZsb3dGaXhNZVtjYW5ub3Qtd3JpdGVdXG5cblxuICAgIE9iamVjdC5hc3NpZ24oZWxlbWVudC5zdHlsZSwgc3R5bGUpO1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGF0dHJpYnV0ZXNbbmFtZV07XG5cbiAgICAgIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSA9PT0gdHJ1ZSA/ICcnIDogdmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZWZmZWN0KF9yZWYyKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYyLnN0YXRlO1xuICB2YXIgaW5pdGlhbFN0eWxlcyA9IHtcbiAgICBwb3BwZXI6IHtcbiAgICAgIHBvc2l0aW9uOiBzdGF0ZS5vcHRpb25zLnN0cmF0ZWd5LFxuICAgICAgbGVmdDogJzAnLFxuICAgICAgdG9wOiAnMCcsXG4gICAgICBtYXJnaW46ICcwJ1xuICAgIH0sXG4gICAgYXJyb3c6IHtcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXG4gICAgfSxcbiAgICByZWZlcmVuY2U6IHt9XG4gIH07XG4gIE9iamVjdC5hc3NpZ24oc3RhdGUuZWxlbWVudHMucG9wcGVyLnN0eWxlLCBpbml0aWFsU3R5bGVzLnBvcHBlcik7XG4gIHN0YXRlLnN0eWxlcyA9IGluaXRpYWxTdHlsZXM7XG5cbiAgaWYgKHN0YXRlLmVsZW1lbnRzLmFycm93KSB7XG4gICAgT2JqZWN0LmFzc2lnbihzdGF0ZS5lbGVtZW50cy5hcnJvdy5zdHlsZSwgaW5pdGlhbFN0eWxlcy5hcnJvdyk7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIE9iamVjdC5rZXlzKHN0YXRlLmVsZW1lbnRzKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICB2YXIgZWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzW25hbWVdO1xuICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBzdGF0ZS5hdHRyaWJ1dGVzW25hbWVdIHx8IHt9O1xuICAgICAgdmFyIHN0eWxlUHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHN0YXRlLnN0eWxlcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSA/IHN0YXRlLnN0eWxlc1tuYW1lXSA6IGluaXRpYWxTdHlsZXNbbmFtZV0pOyAvLyBTZXQgYWxsIHZhbHVlcyB0byBhbiBlbXB0eSBzdHJpbmcgdG8gdW5zZXQgdGhlbVxuXG4gICAgICB2YXIgc3R5bGUgPSBzdHlsZVByb3BlcnRpZXMucmVkdWNlKGZ1bmN0aW9uIChzdHlsZSwgcHJvcGVydHkpIHtcbiAgICAgICAgc3R5bGVbcHJvcGVydHldID0gJyc7XG4gICAgICAgIHJldHVybiBzdHlsZTtcbiAgICAgIH0sIHt9KTsgLy8gYXJyb3cgaXMgb3B0aW9uYWwgKyB2aXJ0dWFsIGVsZW1lbnRzXG5cbiAgICAgIGlmICghaXNIVE1MRWxlbWVudChlbGVtZW50KSB8fCAhZ2V0Tm9kZU5hbWUoZWxlbWVudCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBPYmplY3QuYXNzaWduKGVsZW1lbnQuc3R5bGUsIHN0eWxlKTtcbiAgICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKGF0dHJpYnV0ZSkge1xuICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdhcHBseVN0eWxlcycsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnd3JpdGUnLFxuICBmbjogYXBwbHlTdHlsZXMsXG4gIGVmZmVjdDogZWZmZWN0LFxuICByZXF1aXJlczogWydjb21wdXRlU3R5bGVzJ11cbn07IiwiaW1wb3J0IGdldEJhc2VQbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRMYXlvdXRSZWN0IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0TGF5b3V0UmVjdC5qc1wiO1xuaW1wb3J0IGNvbnRhaW5zIGZyb20gXCIuLi9kb20tdXRpbHMvY29udGFpbnMuanNcIjtcbmltcG9ydCBnZXRPZmZzZXRQYXJlbnQgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRPZmZzZXRQYXJlbnQuanNcIjtcbmltcG9ydCBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldE1haW5BeGlzRnJvbVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IHsgd2l0aGluIH0gZnJvbSBcIi4uL3V0aWxzL3dpdGhpbi5qc1wiO1xuaW1wb3J0IG1lcmdlUGFkZGluZ09iamVjdCBmcm9tIFwiLi4vdXRpbHMvbWVyZ2VQYWRkaW5nT2JqZWN0LmpzXCI7XG5pbXBvcnQgZXhwYW5kVG9IYXNoTWFwIGZyb20gXCIuLi91dGlscy9leHBhbmRUb0hhc2hNYXAuanNcIjtcbmltcG9ydCB7IGxlZnQsIHJpZ2h0LCBiYXNlUGxhY2VtZW50cywgdG9wLCBib3R0b20gfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCB7IGlzSFRNTEVsZW1lbnQgfSBmcm9tIFwiLi4vZG9tLXV0aWxzL2luc3RhbmNlT2YuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG52YXIgdG9QYWRkaW5nT2JqZWN0ID0gZnVuY3Rpb24gdG9QYWRkaW5nT2JqZWN0KHBhZGRpbmcsIHN0YXRlKSB7XG4gIHBhZGRpbmcgPSB0eXBlb2YgcGFkZGluZyA9PT0gJ2Z1bmN0aW9uJyA/IHBhZGRpbmcoT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucmVjdHMsIHtcbiAgICBwbGFjZW1lbnQ6IHN0YXRlLnBsYWNlbWVudFxuICB9KSkgOiBwYWRkaW5nO1xuICByZXR1cm4gbWVyZ2VQYWRkaW5nT2JqZWN0KHR5cGVvZiBwYWRkaW5nICE9PSAnbnVtYmVyJyA/IHBhZGRpbmcgOiBleHBhbmRUb0hhc2hNYXAocGFkZGluZywgYmFzZVBsYWNlbWVudHMpKTtcbn07XG5cbmZ1bmN0aW9uIGFycm93KF9yZWYpIHtcbiAgdmFyIF9zdGF0ZSRtb2RpZmllcnNEYXRhJDtcblxuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlLFxuICAgICAgbmFtZSA9IF9yZWYubmFtZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmLm9wdGlvbnM7XG4gIHZhciBhcnJvd0VsZW1lbnQgPSBzdGF0ZS5lbGVtZW50cy5hcnJvdztcbiAgdmFyIHBvcHBlck9mZnNldHMgPSBzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHM7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gZ2V0QmFzZVBsYWNlbWVudChzdGF0ZS5wbGFjZW1lbnQpO1xuICB2YXIgYXhpcyA9IGdldE1haW5BeGlzRnJvbVBsYWNlbWVudChiYXNlUGxhY2VtZW50KTtcbiAgdmFyIGlzVmVydGljYWwgPSBbbGVmdCwgcmlnaHRdLmluZGV4T2YoYmFzZVBsYWNlbWVudCkgPj0gMDtcbiAgdmFyIGxlbiA9IGlzVmVydGljYWwgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG5cbiAgaWYgKCFhcnJvd0VsZW1lbnQgfHwgIXBvcHBlck9mZnNldHMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgcGFkZGluZ09iamVjdCA9IHRvUGFkZGluZ09iamVjdChvcHRpb25zLnBhZGRpbmcsIHN0YXRlKTtcbiAgdmFyIGFycm93UmVjdCA9IGdldExheW91dFJlY3QoYXJyb3dFbGVtZW50KTtcbiAgdmFyIG1pblByb3AgPSBheGlzID09PSAneScgPyB0b3AgOiBsZWZ0O1xuICB2YXIgbWF4UHJvcCA9IGF4aXMgPT09ICd5JyA/IGJvdHRvbSA6IHJpZ2h0O1xuICB2YXIgZW5kRGlmZiA9IHN0YXRlLnJlY3RzLnJlZmVyZW5jZVtsZW5dICsgc3RhdGUucmVjdHMucmVmZXJlbmNlW2F4aXNdIC0gcG9wcGVyT2Zmc2V0c1theGlzXSAtIHN0YXRlLnJlY3RzLnBvcHBlcltsZW5dO1xuICB2YXIgc3RhcnREaWZmID0gcG9wcGVyT2Zmc2V0c1theGlzXSAtIHN0YXRlLnJlY3RzLnJlZmVyZW5jZVtheGlzXTtcbiAgdmFyIGFycm93T2Zmc2V0UGFyZW50ID0gZ2V0T2Zmc2V0UGFyZW50KGFycm93RWxlbWVudCk7XG4gIHZhciBjbGllbnRTaXplID0gYXJyb3dPZmZzZXRQYXJlbnQgPyBheGlzID09PSAneScgPyBhcnJvd09mZnNldFBhcmVudC5jbGllbnRIZWlnaHQgfHwgMCA6IGFycm93T2Zmc2V0UGFyZW50LmNsaWVudFdpZHRoIHx8IDAgOiAwO1xuICB2YXIgY2VudGVyVG9SZWZlcmVuY2UgPSBlbmREaWZmIC8gMiAtIHN0YXJ0RGlmZiAvIDI7IC8vIE1ha2Ugc3VyZSB0aGUgYXJyb3cgZG9lc24ndCBvdmVyZmxvdyB0aGUgcG9wcGVyIGlmIHRoZSBjZW50ZXIgcG9pbnQgaXNcbiAgLy8gb3V0c2lkZSBvZiB0aGUgcG9wcGVyIGJvdW5kc1xuXG4gIHZhciBtaW4gPSBwYWRkaW5nT2JqZWN0W21pblByb3BdO1xuICB2YXIgbWF4ID0gY2xpZW50U2l6ZSAtIGFycm93UmVjdFtsZW5dIC0gcGFkZGluZ09iamVjdFttYXhQcm9wXTtcbiAgdmFyIGNlbnRlciA9IGNsaWVudFNpemUgLyAyIC0gYXJyb3dSZWN0W2xlbl0gLyAyICsgY2VudGVyVG9SZWZlcmVuY2U7XG4gIHZhciBvZmZzZXQgPSB3aXRoaW4obWluLCBjZW50ZXIsIG1heCk7IC8vIFByZXZlbnRzIGJyZWFraW5nIHN5bnRheCBoaWdobGlnaHRpbmcuLi5cblxuICB2YXIgYXhpc1Byb3AgPSBheGlzO1xuICBzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdID0gKF9zdGF0ZSRtb2RpZmllcnNEYXRhJCA9IHt9LCBfc3RhdGUkbW9kaWZpZXJzRGF0YSRbYXhpc1Byb3BdID0gb2Zmc2V0LCBfc3RhdGUkbW9kaWZpZXJzRGF0YSQuY2VudGVyT2Zmc2V0ID0gb2Zmc2V0IC0gY2VudGVyLCBfc3RhdGUkbW9kaWZpZXJzRGF0YSQpO1xufVxuXG5mdW5jdGlvbiBlZmZlY3QoX3JlZjIpIHtcbiAgdmFyIHN0YXRlID0gX3JlZjIuc3RhdGUsXG4gICAgICBvcHRpb25zID0gX3JlZjIub3B0aW9ucztcbiAgdmFyIF9vcHRpb25zJGVsZW1lbnQgPSBvcHRpb25zLmVsZW1lbnQsXG4gICAgICBhcnJvd0VsZW1lbnQgPSBfb3B0aW9ucyRlbGVtZW50ID09PSB2b2lkIDAgPyAnW2RhdGEtcG9wcGVyLWFycm93XScgOiBfb3B0aW9ucyRlbGVtZW50O1xuXG4gIGlmIChhcnJvd0VsZW1lbnQgPT0gbnVsbCkge1xuICAgIHJldHVybjtcbiAgfSAvLyBDU1Mgc2VsZWN0b3JcblxuXG4gIGlmICh0eXBlb2YgYXJyb3dFbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgIGFycm93RWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzLnBvcHBlci5xdWVyeVNlbGVjdG9yKGFycm93RWxlbWVudCk7XG5cbiAgICBpZiAoIWFycm93RWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICBpZiAoIWlzSFRNTEVsZW1lbnQoYXJyb3dFbGVtZW50KSkge1xuICAgICAgY29uc29sZS5lcnJvcihbJ1BvcHBlcjogXCJhcnJvd1wiIGVsZW1lbnQgbXVzdCBiZSBhbiBIVE1MRWxlbWVudCAobm90IGFuIFNWR0VsZW1lbnQpLicsICdUbyB1c2UgYW4gU1ZHIGFycm93LCB3cmFwIGl0IGluIGFuIEhUTUxFbGVtZW50IHRoYXQgd2lsbCBiZSB1c2VkIGFzJywgJ3RoZSBhcnJvdy4nXS5qb2luKCcgJykpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29udGFpbnMoc3RhdGUuZWxlbWVudHMucG9wcGVyLCBhcnJvd0VsZW1lbnQpKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgY29uc29sZS5lcnJvcihbJ1BvcHBlcjogXCJhcnJvd1wiIG1vZGlmaWVyXFwncyBgZWxlbWVudGAgbXVzdCBiZSBhIGNoaWxkIG9mIHRoZSBwb3BwZXInLCAnZWxlbWVudC4nXS5qb2luKCcgJykpO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxuXG4gIHN0YXRlLmVsZW1lbnRzLmFycm93ID0gYXJyb3dFbGVtZW50O1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnYXJyb3cnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ21haW4nLFxuICBmbjogYXJyb3csXG4gIGVmZmVjdDogZWZmZWN0LFxuICByZXF1aXJlczogWydwb3BwZXJPZmZzZXRzJ10sXG4gIHJlcXVpcmVzSWZFeGlzdHM6IFsncHJldmVudE92ZXJmbG93J11cbn07IiwiaW1wb3J0IHsgdG9wLCBsZWZ0LCByaWdodCwgYm90dG9tLCBlbmQgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCBnZXRPZmZzZXRQYXJlbnQgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRPZmZzZXRQYXJlbnQuanNcIjtcbmltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4uL2RvbS11dGlscy9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRDb21wdXRlZFN0eWxlIGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0Q29tcHV0ZWRTdHlsZS5qc1wiO1xuaW1wb3J0IGdldEJhc2VQbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRWYXJpYXRpb24gZnJvbSBcIi4uL3V0aWxzL2dldFZhcmlhdGlvbi5qc1wiO1xuaW1wb3J0IHsgcm91bmQgfSBmcm9tIFwiLi4vdXRpbHMvbWF0aC5qc1wiOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbnZhciB1bnNldFNpZGVzID0ge1xuICB0b3A6ICdhdXRvJyxcbiAgcmlnaHQ6ICdhdXRvJyxcbiAgYm90dG9tOiAnYXV0bycsXG4gIGxlZnQ6ICdhdXRvJ1xufTsgLy8gUm91bmQgdGhlIG9mZnNldHMgdG8gdGhlIG5lYXJlc3Qgc3VpdGFibGUgc3VicGl4ZWwgYmFzZWQgb24gdGhlIERQUi5cbi8vIFpvb21pbmcgY2FuIGNoYW5nZSB0aGUgRFBSLCBidXQgaXQgc2VlbXMgdG8gcmVwb3J0IGEgdmFsdWUgdGhhdCB3aWxsXG4vLyBjbGVhbmx5IGRpdmlkZSB0aGUgdmFsdWVzIGludG8gdGhlIGFwcHJvcHJpYXRlIHN1YnBpeGVscy5cblxuZnVuY3Rpb24gcm91bmRPZmZzZXRzQnlEUFIoX3JlZiwgd2luKSB7XG4gIHZhciB4ID0gX3JlZi54LFxuICAgICAgeSA9IF9yZWYueTtcbiAgdmFyIGRwciA9IHdpbi5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG4gIHJldHVybiB7XG4gICAgeDogcm91bmQoeCAqIGRwcikgLyBkcHIgfHwgMCxcbiAgICB5OiByb3VuZCh5ICogZHByKSAvIGRwciB8fCAwXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXBUb1N0eWxlcyhfcmVmMikge1xuICB2YXIgX09iamVjdCRhc3NpZ24yO1xuXG4gIHZhciBwb3BwZXIgPSBfcmVmMi5wb3BwZXIsXG4gICAgICBwb3BwZXJSZWN0ID0gX3JlZjIucG9wcGVyUmVjdCxcbiAgICAgIHBsYWNlbWVudCA9IF9yZWYyLnBsYWNlbWVudCxcbiAgICAgIHZhcmlhdGlvbiA9IF9yZWYyLnZhcmlhdGlvbixcbiAgICAgIG9mZnNldHMgPSBfcmVmMi5vZmZzZXRzLFxuICAgICAgcG9zaXRpb24gPSBfcmVmMi5wb3NpdGlvbixcbiAgICAgIGdwdUFjY2VsZXJhdGlvbiA9IF9yZWYyLmdwdUFjY2VsZXJhdGlvbixcbiAgICAgIGFkYXB0aXZlID0gX3JlZjIuYWRhcHRpdmUsXG4gICAgICByb3VuZE9mZnNldHMgPSBfcmVmMi5yb3VuZE9mZnNldHMsXG4gICAgICBpc0ZpeGVkID0gX3JlZjIuaXNGaXhlZDtcbiAgdmFyIF9vZmZzZXRzJHggPSBvZmZzZXRzLngsXG4gICAgICB4ID0gX29mZnNldHMkeCA9PT0gdm9pZCAwID8gMCA6IF9vZmZzZXRzJHgsXG4gICAgICBfb2Zmc2V0cyR5ID0gb2Zmc2V0cy55LFxuICAgICAgeSA9IF9vZmZzZXRzJHkgPT09IHZvaWQgMCA/IDAgOiBfb2Zmc2V0cyR5O1xuXG4gIHZhciBfcmVmMyA9IHR5cGVvZiByb3VuZE9mZnNldHMgPT09ICdmdW5jdGlvbicgPyByb3VuZE9mZnNldHMoe1xuICAgIHg6IHgsXG4gICAgeTogeVxuICB9KSA6IHtcbiAgICB4OiB4LFxuICAgIHk6IHlcbiAgfTtcblxuICB4ID0gX3JlZjMueDtcbiAgeSA9IF9yZWYzLnk7XG4gIHZhciBoYXNYID0gb2Zmc2V0cy5oYXNPd25Qcm9wZXJ0eSgneCcpO1xuICB2YXIgaGFzWSA9IG9mZnNldHMuaGFzT3duUHJvcGVydHkoJ3knKTtcbiAgdmFyIHNpZGVYID0gbGVmdDtcbiAgdmFyIHNpZGVZID0gdG9wO1xuICB2YXIgd2luID0gd2luZG93O1xuXG4gIGlmIChhZGFwdGl2ZSkge1xuICAgIHZhciBvZmZzZXRQYXJlbnQgPSBnZXRPZmZzZXRQYXJlbnQocG9wcGVyKTtcbiAgICB2YXIgaGVpZ2h0UHJvcCA9ICdjbGllbnRIZWlnaHQnO1xuICAgIHZhciB3aWR0aFByb3AgPSAnY2xpZW50V2lkdGgnO1xuXG4gICAgaWYgKG9mZnNldFBhcmVudCA9PT0gZ2V0V2luZG93KHBvcHBlcikpIHtcbiAgICAgIG9mZnNldFBhcmVudCA9IGdldERvY3VtZW50RWxlbWVudChwb3BwZXIpO1xuXG4gICAgICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZShvZmZzZXRQYXJlbnQpLnBvc2l0aW9uICE9PSAnc3RhdGljJyAmJiBwb3NpdGlvbiA9PT0gJ2Fic29sdXRlJykge1xuICAgICAgICBoZWlnaHRQcm9wID0gJ3Njcm9sbEhlaWdodCc7XG4gICAgICAgIHdpZHRoUHJvcCA9ICdzY3JvbGxXaWR0aCc7XG4gICAgICB9XG4gICAgfSAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS1jYXN0XTogZm9yY2UgdHlwZSByZWZpbmVtZW50LCB3ZSBjb21wYXJlIG9mZnNldFBhcmVudCB3aXRoIHdpbmRvdyBhYm92ZSwgYnV0IEZsb3cgZG9lc24ndCBkZXRlY3QgaXRcblxuXG4gICAgb2Zmc2V0UGFyZW50ID0gb2Zmc2V0UGFyZW50O1xuXG4gICAgaWYgKHBsYWNlbWVudCA9PT0gdG9wIHx8IChwbGFjZW1lbnQgPT09IGxlZnQgfHwgcGxhY2VtZW50ID09PSByaWdodCkgJiYgdmFyaWF0aW9uID09PSBlbmQpIHtcbiAgICAgIHNpZGVZID0gYm90dG9tO1xuICAgICAgdmFyIG9mZnNldFkgPSBpc0ZpeGVkICYmIG9mZnNldFBhcmVudCA9PT0gd2luICYmIHdpbi52aXN1YWxWaWV3cG9ydCA/IHdpbi52aXN1YWxWaWV3cG9ydC5oZWlnaHQgOiAvLyAkRmxvd0ZpeE1lW3Byb3AtbWlzc2luZ11cbiAgICAgIG9mZnNldFBhcmVudFtoZWlnaHRQcm9wXTtcbiAgICAgIHkgLT0gb2Zmc2V0WSAtIHBvcHBlclJlY3QuaGVpZ2h0O1xuICAgICAgeSAqPSBncHVBY2NlbGVyYXRpb24gPyAxIDogLTE7XG4gICAgfVxuXG4gICAgaWYgKHBsYWNlbWVudCA9PT0gbGVmdCB8fCAocGxhY2VtZW50ID09PSB0b3AgfHwgcGxhY2VtZW50ID09PSBib3R0b20pICYmIHZhcmlhdGlvbiA9PT0gZW5kKSB7XG4gICAgICBzaWRlWCA9IHJpZ2h0O1xuICAgICAgdmFyIG9mZnNldFggPSBpc0ZpeGVkICYmIG9mZnNldFBhcmVudCA9PT0gd2luICYmIHdpbi52aXN1YWxWaWV3cG9ydCA/IHdpbi52aXN1YWxWaWV3cG9ydC53aWR0aCA6IC8vICRGbG93Rml4TWVbcHJvcC1taXNzaW5nXVxuICAgICAgb2Zmc2V0UGFyZW50W3dpZHRoUHJvcF07XG4gICAgICB4IC09IG9mZnNldFggLSBwb3BwZXJSZWN0LndpZHRoO1xuICAgICAgeCAqPSBncHVBY2NlbGVyYXRpb24gPyAxIDogLTE7XG4gICAgfVxuICB9XG5cbiAgdmFyIGNvbW1vblN0eWxlcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgIHBvc2l0aW9uOiBwb3NpdGlvblxuICB9LCBhZGFwdGl2ZSAmJiB1bnNldFNpZGVzKTtcblxuICB2YXIgX3JlZjQgPSByb3VuZE9mZnNldHMgPT09IHRydWUgPyByb3VuZE9mZnNldHNCeURQUih7XG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH0sIGdldFdpbmRvdyhwb3BwZXIpKSA6IHtcbiAgICB4OiB4LFxuICAgIHk6IHlcbiAgfTtcblxuICB4ID0gX3JlZjQueDtcbiAgeSA9IF9yZWY0Lnk7XG5cbiAgaWYgKGdwdUFjY2VsZXJhdGlvbikge1xuICAgIHZhciBfT2JqZWN0JGFzc2lnbjtcblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25TdHlsZXMsIChfT2JqZWN0JGFzc2lnbiA9IHt9LCBfT2JqZWN0JGFzc2lnbltzaWRlWV0gPSBoYXNZID8gJzAnIDogJycsIF9PYmplY3QkYXNzaWduW3NpZGVYXSA9IGhhc1ggPyAnMCcgOiAnJywgX09iamVjdCRhc3NpZ24udHJhbnNmb3JtID0gKHdpbi5kZXZpY2VQaXhlbFJhdGlvIHx8IDEpIDw9IDEgPyBcInRyYW5zbGF0ZShcIiArIHggKyBcInB4LCBcIiArIHkgKyBcInB4KVwiIDogXCJ0cmFuc2xhdGUzZChcIiArIHggKyBcInB4LCBcIiArIHkgKyBcInB4LCAwKVwiLCBfT2JqZWN0JGFzc2lnbikpO1xuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblN0eWxlcywgKF9PYmplY3QkYXNzaWduMiA9IHt9LCBfT2JqZWN0JGFzc2lnbjJbc2lkZVldID0gaGFzWSA/IHkgKyBcInB4XCIgOiAnJywgX09iamVjdCRhc3NpZ24yW3NpZGVYXSA9IGhhc1ggPyB4ICsgXCJweFwiIDogJycsIF9PYmplY3QkYXNzaWduMi50cmFuc2Zvcm0gPSAnJywgX09iamVjdCRhc3NpZ24yKSk7XG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVTdHlsZXMoX3JlZjUpIHtcbiAgdmFyIHN0YXRlID0gX3JlZjUuc3RhdGUsXG4gICAgICBvcHRpb25zID0gX3JlZjUub3B0aW9ucztcbiAgdmFyIF9vcHRpb25zJGdwdUFjY2VsZXJhdCA9IG9wdGlvbnMuZ3B1QWNjZWxlcmF0aW9uLFxuICAgICAgZ3B1QWNjZWxlcmF0aW9uID0gX29wdGlvbnMkZ3B1QWNjZWxlcmF0ID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkZ3B1QWNjZWxlcmF0LFxuICAgICAgX29wdGlvbnMkYWRhcHRpdmUgPSBvcHRpb25zLmFkYXB0aXZlLFxuICAgICAgYWRhcHRpdmUgPSBfb3B0aW9ucyRhZGFwdGl2ZSA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJGFkYXB0aXZlLFxuICAgICAgX29wdGlvbnMkcm91bmRPZmZzZXRzID0gb3B0aW9ucy5yb3VuZE9mZnNldHMsXG4gICAgICByb3VuZE9mZnNldHMgPSBfb3B0aW9ucyRyb3VuZE9mZnNldHMgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRyb3VuZE9mZnNldHM7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgIHZhciB0cmFuc2l0aW9uUHJvcGVydHkgPSBnZXRDb21wdXRlZFN0eWxlKHN0YXRlLmVsZW1lbnRzLnBvcHBlcikudHJhbnNpdGlvblByb3BlcnR5IHx8ICcnO1xuXG4gICAgaWYgKGFkYXB0aXZlICYmIFsndHJhbnNmb3JtJywgJ3RvcCcsICdyaWdodCcsICdib3R0b20nLCAnbGVmdCddLnNvbWUoZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICByZXR1cm4gdHJhbnNpdGlvblByb3BlcnR5LmluZGV4T2YocHJvcGVydHkpID49IDA7XG4gICAgfSkpIHtcbiAgICAgIGNvbnNvbGUud2FybihbJ1BvcHBlcjogRGV0ZWN0ZWQgQ1NTIHRyYW5zaXRpb25zIG9uIGF0IGxlYXN0IG9uZSBvZiB0aGUgZm9sbG93aW5nJywgJ0NTUyBwcm9wZXJ0aWVzOiBcInRyYW5zZm9ybVwiLCBcInRvcFwiLCBcInJpZ2h0XCIsIFwiYm90dG9tXCIsIFwibGVmdFwiLicsICdcXG5cXG4nLCAnRGlzYWJsZSB0aGUgXCJjb21wdXRlU3R5bGVzXCIgbW9kaWZpZXJcXCdzIGBhZGFwdGl2ZWAgb3B0aW9uIHRvIGFsbG93JywgJ2ZvciBzbW9vdGggdHJhbnNpdGlvbnMsIG9yIHJlbW92ZSB0aGVzZSBwcm9wZXJ0aWVzIGZyb20gdGhlIENTUycsICd0cmFuc2l0aW9uIGRlY2xhcmF0aW9uIG9uIHRoZSBwb3BwZXIgZWxlbWVudCBpZiBvbmx5IHRyYW5zaXRpb25pbmcnLCAnb3BhY2l0eSBvciBiYWNrZ3JvdW5kLWNvbG9yIGZvciBleGFtcGxlLicsICdcXG5cXG4nLCAnV2UgcmVjb21tZW5kIHVzaW5nIHRoZSBwb3BwZXIgZWxlbWVudCBhcyBhIHdyYXBwZXIgYXJvdW5kIGFuIGlubmVyJywgJ2VsZW1lbnQgdGhhdCBjYW4gaGF2ZSBhbnkgQ1NTIHByb3BlcnR5IHRyYW5zaXRpb25lZCBmb3IgYW5pbWF0aW9ucy4nXS5qb2luKCcgJykpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjb21tb25TdHlsZXMgPSB7XG4gICAgcGxhY2VtZW50OiBnZXRCYXNlUGxhY2VtZW50KHN0YXRlLnBsYWNlbWVudCksXG4gICAgdmFyaWF0aW9uOiBnZXRWYXJpYXRpb24oc3RhdGUucGxhY2VtZW50KSxcbiAgICBwb3BwZXI6IHN0YXRlLmVsZW1lbnRzLnBvcHBlcixcbiAgICBwb3BwZXJSZWN0OiBzdGF0ZS5yZWN0cy5wb3BwZXIsXG4gICAgZ3B1QWNjZWxlcmF0aW9uOiBncHVBY2NlbGVyYXRpb24sXG4gICAgaXNGaXhlZDogc3RhdGUub3B0aW9ucy5zdHJhdGVneSA9PT0gJ2ZpeGVkJ1xuICB9O1xuXG4gIGlmIChzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHMgIT0gbnVsbCkge1xuICAgIHN0YXRlLnN0eWxlcy5wb3BwZXIgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5zdHlsZXMucG9wcGVyLCBtYXBUb1N0eWxlcyhPYmplY3QuYXNzaWduKHt9LCBjb21tb25TdHlsZXMsIHtcbiAgICAgIG9mZnNldHM6IHN0YXRlLm1vZGlmaWVyc0RhdGEucG9wcGVyT2Zmc2V0cyxcbiAgICAgIHBvc2l0aW9uOiBzdGF0ZS5vcHRpb25zLnN0cmF0ZWd5LFxuICAgICAgYWRhcHRpdmU6IGFkYXB0aXZlLFxuICAgICAgcm91bmRPZmZzZXRzOiByb3VuZE9mZnNldHNcbiAgICB9KSkpO1xuICB9XG5cbiAgaWYgKHN0YXRlLm1vZGlmaWVyc0RhdGEuYXJyb3cgIT0gbnVsbCkge1xuICAgIHN0YXRlLnN0eWxlcy5hcnJvdyA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnN0eWxlcy5hcnJvdywgbWFwVG9TdHlsZXMoT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uU3R5bGVzLCB7XG4gICAgICBvZmZzZXRzOiBzdGF0ZS5tb2RpZmllcnNEYXRhLmFycm93LFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBhZGFwdGl2ZTogZmFsc2UsXG4gICAgICByb3VuZE9mZnNldHM6IHJvdW5kT2Zmc2V0c1xuICAgIH0pKSk7XG4gIH1cblxuICBzdGF0ZS5hdHRyaWJ1dGVzLnBvcHBlciA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmF0dHJpYnV0ZXMucG9wcGVyLCB7XG4gICAgJ2RhdGEtcG9wcGVyLXBsYWNlbWVudCc6IHN0YXRlLnBsYWNlbWVudFxuICB9KTtcbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ2NvbXB1dGVTdHlsZXMnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ2JlZm9yZVdyaXRlJyxcbiAgZm46IGNvbXB1dGVTdHlsZXMsXG4gIGRhdGE6IHt9XG59OyIsImltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRXaW5kb3cuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG52YXIgcGFzc2l2ZSA9IHtcbiAgcGFzc2l2ZTogdHJ1ZVxufTtcblxuZnVuY3Rpb24gZWZmZWN0KF9yZWYpIHtcbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIGluc3RhbmNlID0gX3JlZi5pbnN0YW5jZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmLm9wdGlvbnM7XG4gIHZhciBfb3B0aW9ucyRzY3JvbGwgPSBvcHRpb25zLnNjcm9sbCxcbiAgICAgIHNjcm9sbCA9IF9vcHRpb25zJHNjcm9sbCA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJHNjcm9sbCxcbiAgICAgIF9vcHRpb25zJHJlc2l6ZSA9IG9wdGlvbnMucmVzaXplLFxuICAgICAgcmVzaXplID0gX29wdGlvbnMkcmVzaXplID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkcmVzaXplO1xuICB2YXIgd2luZG93ID0gZ2V0V2luZG93KHN0YXRlLmVsZW1lbnRzLnBvcHBlcik7XG4gIHZhciBzY3JvbGxQYXJlbnRzID0gW10uY29uY2F0KHN0YXRlLnNjcm9sbFBhcmVudHMucmVmZXJlbmNlLCBzdGF0ZS5zY3JvbGxQYXJlbnRzLnBvcHBlcik7XG5cbiAgaWYgKHNjcm9sbCkge1xuICAgIHNjcm9sbFBhcmVudHMuZm9yRWFjaChmdW5jdGlvbiAoc2Nyb2xsUGFyZW50KSB7XG4gICAgICBzY3JvbGxQYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgaW5zdGFuY2UudXBkYXRlLCBwYXNzaXZlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChyZXNpemUpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaW5zdGFuY2UudXBkYXRlLCBwYXNzaXZlKTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHNjcm9sbCkge1xuICAgICAgc2Nyb2xsUGFyZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChzY3JvbGxQYXJlbnQpIHtcbiAgICAgICAgc2Nyb2xsUGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGluc3RhbmNlLnVwZGF0ZSwgcGFzc2l2ZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVzaXplKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaW5zdGFuY2UudXBkYXRlLCBwYXNzaXZlKTtcbiAgICB9XG4gIH07XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdldmVudExpc3RlbmVycycsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnd3JpdGUnLFxuICBmbjogZnVuY3Rpb24gZm4oKSB7fSxcbiAgZWZmZWN0OiBlZmZlY3QsXG4gIGRhdGE6IHt9XG59OyIsImltcG9ydCBnZXRPcHBvc2l0ZVBsYWNlbWVudCBmcm9tIFwiLi4vdXRpbHMvZ2V0T3Bwb3NpdGVQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0T3Bwb3NpdGVWYXJpYXRpb25QbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldE9wcG9zaXRlVmFyaWF0aW9uUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZGV0ZWN0T3ZlcmZsb3cgZnJvbSBcIi4uL3V0aWxzL2RldGVjdE92ZXJmbG93LmpzXCI7XG5pbXBvcnQgY29tcHV0ZUF1dG9QbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2NvbXB1dGVBdXRvUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgeyBib3R0b20sIHRvcCwgc3RhcnQsIHJpZ2h0LCBsZWZ0LCBhdXRvIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG5pbXBvcnQgZ2V0VmFyaWF0aW9uIGZyb20gXCIuLi91dGlscy9nZXRWYXJpYXRpb24uanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5mdW5jdGlvbiBnZXRFeHBhbmRlZEZhbGxiYWNrUGxhY2VtZW50cyhwbGFjZW1lbnQpIHtcbiAgaWYgKGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KSA9PT0gYXV0bykge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHZhciBvcHBvc2l0ZVBsYWNlbWVudCA9IGdldE9wcG9zaXRlUGxhY2VtZW50KHBsYWNlbWVudCk7XG4gIHJldHVybiBbZ2V0T3Bwb3NpdGVWYXJpYXRpb25QbGFjZW1lbnQocGxhY2VtZW50KSwgb3Bwb3NpdGVQbGFjZW1lbnQsIGdldE9wcG9zaXRlVmFyaWF0aW9uUGxhY2VtZW50KG9wcG9zaXRlUGxhY2VtZW50KV07XG59XG5cbmZ1bmN0aW9uIGZsaXAoX3JlZikge1xuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlLFxuICAgICAgb3B0aW9ucyA9IF9yZWYub3B0aW9ucyxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWU7XG5cbiAgaWYgKHN0YXRlLm1vZGlmaWVyc0RhdGFbbmFtZV0uX3NraXApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgX29wdGlvbnMkbWFpbkF4aXMgPSBvcHRpb25zLm1haW5BeGlzLFxuICAgICAgY2hlY2tNYWluQXhpcyA9IF9vcHRpb25zJG1haW5BeGlzID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkbWFpbkF4aXMsXG4gICAgICBfb3B0aW9ucyRhbHRBeGlzID0gb3B0aW9ucy5hbHRBeGlzLFxuICAgICAgY2hlY2tBbHRBeGlzID0gX29wdGlvbnMkYWx0QXhpcyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJGFsdEF4aXMsXG4gICAgICBzcGVjaWZpZWRGYWxsYmFja1BsYWNlbWVudHMgPSBvcHRpb25zLmZhbGxiYWNrUGxhY2VtZW50cyxcbiAgICAgIHBhZGRpbmcgPSBvcHRpb25zLnBhZGRpbmcsXG4gICAgICBib3VuZGFyeSA9IG9wdGlvbnMuYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnkgPSBvcHRpb25zLnJvb3RCb3VuZGFyeSxcbiAgICAgIGFsdEJvdW5kYXJ5ID0gb3B0aW9ucy5hbHRCb3VuZGFyeSxcbiAgICAgIF9vcHRpb25zJGZsaXBWYXJpYXRpbyA9IG9wdGlvbnMuZmxpcFZhcmlhdGlvbnMsXG4gICAgICBmbGlwVmFyaWF0aW9ucyA9IF9vcHRpb25zJGZsaXBWYXJpYXRpbyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJGZsaXBWYXJpYXRpbyxcbiAgICAgIGFsbG93ZWRBdXRvUGxhY2VtZW50cyA9IG9wdGlvbnMuYWxsb3dlZEF1dG9QbGFjZW1lbnRzO1xuICB2YXIgcHJlZmVycmVkUGxhY2VtZW50ID0gc3RhdGUub3B0aW9ucy5wbGFjZW1lbnQ7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gZ2V0QmFzZVBsYWNlbWVudChwcmVmZXJyZWRQbGFjZW1lbnQpO1xuICB2YXIgaXNCYXNlUGxhY2VtZW50ID0gYmFzZVBsYWNlbWVudCA9PT0gcHJlZmVycmVkUGxhY2VtZW50O1xuICB2YXIgZmFsbGJhY2tQbGFjZW1lbnRzID0gc3BlY2lmaWVkRmFsbGJhY2tQbGFjZW1lbnRzIHx8IChpc0Jhc2VQbGFjZW1lbnQgfHwgIWZsaXBWYXJpYXRpb25zID8gW2dldE9wcG9zaXRlUGxhY2VtZW50KHByZWZlcnJlZFBsYWNlbWVudCldIDogZ2V0RXhwYW5kZWRGYWxsYmFja1BsYWNlbWVudHMocHJlZmVycmVkUGxhY2VtZW50KSk7XG4gIHZhciBwbGFjZW1lbnRzID0gW3ByZWZlcnJlZFBsYWNlbWVudF0uY29uY2F0KGZhbGxiYWNrUGxhY2VtZW50cykucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHBsYWNlbWVudCkge1xuICAgIHJldHVybiBhY2MuY29uY2F0KGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KSA9PT0gYXV0byA/IGNvbXB1dGVBdXRvUGxhY2VtZW50KHN0YXRlLCB7XG4gICAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudCxcbiAgICAgIGJvdW5kYXJ5OiBib3VuZGFyeSxcbiAgICAgIHJvb3RCb3VuZGFyeTogcm9vdEJvdW5kYXJ5LFxuICAgICAgcGFkZGluZzogcGFkZGluZyxcbiAgICAgIGZsaXBWYXJpYXRpb25zOiBmbGlwVmFyaWF0aW9ucyxcbiAgICAgIGFsbG93ZWRBdXRvUGxhY2VtZW50czogYWxsb3dlZEF1dG9QbGFjZW1lbnRzXG4gICAgfSkgOiBwbGFjZW1lbnQpO1xuICB9LCBbXSk7XG4gIHZhciByZWZlcmVuY2VSZWN0ID0gc3RhdGUucmVjdHMucmVmZXJlbmNlO1xuICB2YXIgcG9wcGVyUmVjdCA9IHN0YXRlLnJlY3RzLnBvcHBlcjtcbiAgdmFyIGNoZWNrc01hcCA9IG5ldyBNYXAoKTtcbiAgdmFyIG1ha2VGYWxsYmFja0NoZWNrcyA9IHRydWU7XG4gIHZhciBmaXJzdEZpdHRpbmdQbGFjZW1lbnQgPSBwbGFjZW1lbnRzWzBdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGxhY2VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBwbGFjZW1lbnQgPSBwbGFjZW1lbnRzW2ldO1xuXG4gICAgdmFyIF9iYXNlUGxhY2VtZW50ID0gZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpO1xuXG4gICAgdmFyIGlzU3RhcnRWYXJpYXRpb24gPSBnZXRWYXJpYXRpb24ocGxhY2VtZW50KSA9PT0gc3RhcnQ7XG4gICAgdmFyIGlzVmVydGljYWwgPSBbdG9wLCBib3R0b21dLmluZGV4T2YoX2Jhc2VQbGFjZW1lbnQpID49IDA7XG4gICAgdmFyIGxlbiA9IGlzVmVydGljYWwgPyAnd2lkdGgnIDogJ2hlaWdodCc7XG4gICAgdmFyIG92ZXJmbG93ID0gZGV0ZWN0T3ZlcmZsb3coc3RhdGUsIHtcbiAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50LFxuICAgICAgYm91bmRhcnk6IGJvdW5kYXJ5LFxuICAgICAgcm9vdEJvdW5kYXJ5OiByb290Qm91bmRhcnksXG4gICAgICBhbHRCb3VuZGFyeTogYWx0Qm91bmRhcnksXG4gICAgICBwYWRkaW5nOiBwYWRkaW5nXG4gICAgfSk7XG4gICAgdmFyIG1haW5WYXJpYXRpb25TaWRlID0gaXNWZXJ0aWNhbCA/IGlzU3RhcnRWYXJpYXRpb24gPyByaWdodCA6IGxlZnQgOiBpc1N0YXJ0VmFyaWF0aW9uID8gYm90dG9tIDogdG9wO1xuXG4gICAgaWYgKHJlZmVyZW5jZVJlY3RbbGVuXSA+IHBvcHBlclJlY3RbbGVuXSkge1xuICAgICAgbWFpblZhcmlhdGlvblNpZGUgPSBnZXRPcHBvc2l0ZVBsYWNlbWVudChtYWluVmFyaWF0aW9uU2lkZSk7XG4gICAgfVxuXG4gICAgdmFyIGFsdFZhcmlhdGlvblNpZGUgPSBnZXRPcHBvc2l0ZVBsYWNlbWVudChtYWluVmFyaWF0aW9uU2lkZSk7XG4gICAgdmFyIGNoZWNrcyA9IFtdO1xuXG4gICAgaWYgKGNoZWNrTWFpbkF4aXMpIHtcbiAgICAgIGNoZWNrcy5wdXNoKG92ZXJmbG93W19iYXNlUGxhY2VtZW50XSA8PSAwKTtcbiAgICB9XG5cbiAgICBpZiAoY2hlY2tBbHRBeGlzKSB7XG4gICAgICBjaGVja3MucHVzaChvdmVyZmxvd1ttYWluVmFyaWF0aW9uU2lkZV0gPD0gMCwgb3ZlcmZsb3dbYWx0VmFyaWF0aW9uU2lkZV0gPD0gMCk7XG4gICAgfVxuXG4gICAgaWYgKGNoZWNrcy5ldmVyeShmdW5jdGlvbiAoY2hlY2spIHtcbiAgICAgIHJldHVybiBjaGVjaztcbiAgICB9KSkge1xuICAgICAgZmlyc3RGaXR0aW5nUGxhY2VtZW50ID0gcGxhY2VtZW50O1xuICAgICAgbWFrZUZhbGxiYWNrQ2hlY2tzID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjaGVja3NNYXAuc2V0KHBsYWNlbWVudCwgY2hlY2tzKTtcbiAgfVxuXG4gIGlmIChtYWtlRmFsbGJhY2tDaGVja3MpIHtcbiAgICAvLyBgMmAgbWF5IGJlIGRlc2lyZWQgaW4gc29tZSBjYXNlcyDigJMgcmVzZWFyY2ggbGF0ZXJcbiAgICB2YXIgbnVtYmVyT2ZDaGVja3MgPSBmbGlwVmFyaWF0aW9ucyA/IDMgOiAxO1xuXG4gICAgdmFyIF9sb29wID0gZnVuY3Rpb24gX2xvb3AoX2kpIHtcbiAgICAgIHZhciBmaXR0aW5nUGxhY2VtZW50ID0gcGxhY2VtZW50cy5maW5kKGZ1bmN0aW9uIChwbGFjZW1lbnQpIHtcbiAgICAgICAgdmFyIGNoZWNrcyA9IGNoZWNrc01hcC5nZXQocGxhY2VtZW50KTtcblxuICAgICAgICBpZiAoY2hlY2tzKSB7XG4gICAgICAgICAgcmV0dXJuIGNoZWNrcy5zbGljZSgwLCBfaSkuZXZlcnkoZnVuY3Rpb24gKGNoZWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hlY2s7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoZml0dGluZ1BsYWNlbWVudCkge1xuICAgICAgICBmaXJzdEZpdHRpbmdQbGFjZW1lbnQgPSBmaXR0aW5nUGxhY2VtZW50O1xuICAgICAgICByZXR1cm4gXCJicmVha1wiO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmb3IgKHZhciBfaSA9IG51bWJlck9mQ2hlY2tzOyBfaSA+IDA7IF9pLS0pIHtcbiAgICAgIHZhciBfcmV0ID0gX2xvb3AoX2kpO1xuXG4gICAgICBpZiAoX3JldCA9PT0gXCJicmVha1wiKSBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoc3RhdGUucGxhY2VtZW50ICE9PSBmaXJzdEZpdHRpbmdQbGFjZW1lbnQpIHtcbiAgICBzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdLl9za2lwID0gdHJ1ZTtcbiAgICBzdGF0ZS5wbGFjZW1lbnQgPSBmaXJzdEZpdHRpbmdQbGFjZW1lbnQ7XG4gICAgc3RhdGUucmVzZXQgPSB0cnVlO1xuICB9XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdmbGlwJyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICdtYWluJyxcbiAgZm46IGZsaXAsXG4gIHJlcXVpcmVzSWZFeGlzdHM6IFsnb2Zmc2V0J10sXG4gIGRhdGE6IHtcbiAgICBfc2tpcDogZmFsc2VcbiAgfVxufTsiLCJpbXBvcnQgeyB0b3AsIGJvdHRvbSwgbGVmdCwgcmlnaHQgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCBkZXRlY3RPdmVyZmxvdyBmcm9tIFwiLi4vdXRpbHMvZGV0ZWN0T3ZlcmZsb3cuanNcIjtcblxuZnVuY3Rpb24gZ2V0U2lkZU9mZnNldHMob3ZlcmZsb3csIHJlY3QsIHByZXZlbnRlZE9mZnNldHMpIHtcbiAgaWYgKHByZXZlbnRlZE9mZnNldHMgPT09IHZvaWQgMCkge1xuICAgIHByZXZlbnRlZE9mZnNldHMgPSB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMFxuICAgIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvcDogb3ZlcmZsb3cudG9wIC0gcmVjdC5oZWlnaHQgLSBwcmV2ZW50ZWRPZmZzZXRzLnksXG4gICAgcmlnaHQ6IG92ZXJmbG93LnJpZ2h0IC0gcmVjdC53aWR0aCArIHByZXZlbnRlZE9mZnNldHMueCxcbiAgICBib3R0b206IG92ZXJmbG93LmJvdHRvbSAtIHJlY3QuaGVpZ2h0ICsgcHJldmVudGVkT2Zmc2V0cy55LFxuICAgIGxlZnQ6IG92ZXJmbG93LmxlZnQgLSByZWN0LndpZHRoIC0gcHJldmVudGVkT2Zmc2V0cy54XG4gIH07XG59XG5cbmZ1bmN0aW9uIGlzQW55U2lkZUZ1bGx5Q2xpcHBlZChvdmVyZmxvdykge1xuICByZXR1cm4gW3RvcCwgcmlnaHQsIGJvdHRvbSwgbGVmdF0uc29tZShmdW5jdGlvbiAoc2lkZSkge1xuICAgIHJldHVybiBvdmVyZmxvd1tzaWRlXSA+PSAwO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaGlkZShfcmVmKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYuc3RhdGUsXG4gICAgICBuYW1lID0gX3JlZi5uYW1lO1xuICB2YXIgcmVmZXJlbmNlUmVjdCA9IHN0YXRlLnJlY3RzLnJlZmVyZW5jZTtcbiAgdmFyIHBvcHBlclJlY3QgPSBzdGF0ZS5yZWN0cy5wb3BwZXI7XG4gIHZhciBwcmV2ZW50ZWRPZmZzZXRzID0gc3RhdGUubW9kaWZpZXJzRGF0YS5wcmV2ZW50T3ZlcmZsb3c7XG4gIHZhciByZWZlcmVuY2VPdmVyZmxvdyA9IGRldGVjdE92ZXJmbG93KHN0YXRlLCB7XG4gICAgZWxlbWVudENvbnRleHQ6ICdyZWZlcmVuY2UnXG4gIH0pO1xuICB2YXIgcG9wcGVyQWx0T3ZlcmZsb3cgPSBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwge1xuICAgIGFsdEJvdW5kYXJ5OiB0cnVlXG4gIH0pO1xuICB2YXIgcmVmZXJlbmNlQ2xpcHBpbmdPZmZzZXRzID0gZ2V0U2lkZU9mZnNldHMocmVmZXJlbmNlT3ZlcmZsb3csIHJlZmVyZW5jZVJlY3QpO1xuICB2YXIgcG9wcGVyRXNjYXBlT2Zmc2V0cyA9IGdldFNpZGVPZmZzZXRzKHBvcHBlckFsdE92ZXJmbG93LCBwb3BwZXJSZWN0LCBwcmV2ZW50ZWRPZmZzZXRzKTtcbiAgdmFyIGlzUmVmZXJlbmNlSGlkZGVuID0gaXNBbnlTaWRlRnVsbHlDbGlwcGVkKHJlZmVyZW5jZUNsaXBwaW5nT2Zmc2V0cyk7XG4gIHZhciBoYXNQb3BwZXJFc2NhcGVkID0gaXNBbnlTaWRlRnVsbHlDbGlwcGVkKHBvcHBlckVzY2FwZU9mZnNldHMpO1xuICBzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdID0ge1xuICAgIHJlZmVyZW5jZUNsaXBwaW5nT2Zmc2V0czogcmVmZXJlbmNlQ2xpcHBpbmdPZmZzZXRzLFxuICAgIHBvcHBlckVzY2FwZU9mZnNldHM6IHBvcHBlckVzY2FwZU9mZnNldHMsXG4gICAgaXNSZWZlcmVuY2VIaWRkZW46IGlzUmVmZXJlbmNlSGlkZGVuLFxuICAgIGhhc1BvcHBlckVzY2FwZWQ6IGhhc1BvcHBlckVzY2FwZWRcbiAgfTtcbiAgc3RhdGUuYXR0cmlidXRlcy5wb3BwZXIgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5hdHRyaWJ1dGVzLnBvcHBlciwge1xuICAgICdkYXRhLXBvcHBlci1yZWZlcmVuY2UtaGlkZGVuJzogaXNSZWZlcmVuY2VIaWRkZW4sXG4gICAgJ2RhdGEtcG9wcGVyLWVzY2FwZWQnOiBoYXNQb3BwZXJFc2NhcGVkXG4gIH0pO1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnaGlkZScsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnbWFpbicsXG4gIHJlcXVpcmVzSWZFeGlzdHM6IFsncHJldmVudE92ZXJmbG93J10sXG4gIGZuOiBoaWRlXG59OyIsImV4cG9ydCB7IGRlZmF1bHQgYXMgYXBwbHlTdHlsZXMgfSBmcm9tIFwiLi9hcHBseVN0eWxlcy5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBhcnJvdyB9IGZyb20gXCIuL2Fycm93LmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGNvbXB1dGVTdHlsZXMgfSBmcm9tIFwiLi9jb21wdXRlU3R5bGVzLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGV2ZW50TGlzdGVuZXJzIH0gZnJvbSBcIi4vZXZlbnRMaXN0ZW5lcnMuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgZmxpcCB9IGZyb20gXCIuL2ZsaXAuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgaGlkZSB9IGZyb20gXCIuL2hpZGUuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgb2Zmc2V0IH0gZnJvbSBcIi4vb2Zmc2V0LmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHBvcHBlck9mZnNldHMgfSBmcm9tIFwiLi9wb3BwZXJPZmZzZXRzLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHByZXZlbnRPdmVyZmxvdyB9IGZyb20gXCIuL3ByZXZlbnRPdmVyZmxvdy5qc1wiOyIsImltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgeyB0b3AsIGxlZnQsIHJpZ2h0LCBwbGFjZW1lbnRzIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3RhbmNlQW5kU2tpZGRpbmdUb1hZKHBsYWNlbWVudCwgcmVjdHMsIG9mZnNldCkge1xuICB2YXIgYmFzZVBsYWNlbWVudCA9IGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KTtcbiAgdmFyIGludmVydERpc3RhbmNlID0gW2xlZnQsIHRvcF0uaW5kZXhPZihiYXNlUGxhY2VtZW50KSA+PSAwID8gLTEgOiAxO1xuXG4gIHZhciBfcmVmID0gdHlwZW9mIG9mZnNldCA9PT0gJ2Z1bmN0aW9uJyA/IG9mZnNldChPYmplY3QuYXNzaWduKHt9LCByZWN0cywge1xuICAgIHBsYWNlbWVudDogcGxhY2VtZW50XG4gIH0pKSA6IG9mZnNldCxcbiAgICAgIHNraWRkaW5nID0gX3JlZlswXSxcbiAgICAgIGRpc3RhbmNlID0gX3JlZlsxXTtcblxuICBza2lkZGluZyA9IHNraWRkaW5nIHx8IDA7XG4gIGRpc3RhbmNlID0gKGRpc3RhbmNlIHx8IDApICogaW52ZXJ0RGlzdGFuY2U7XG4gIHJldHVybiBbbGVmdCwgcmlnaHRdLmluZGV4T2YoYmFzZVBsYWNlbWVudCkgPj0gMCA/IHtcbiAgICB4OiBkaXN0YW5jZSxcbiAgICB5OiBza2lkZGluZ1xuICB9IDoge1xuICAgIHg6IHNraWRkaW5nLFxuICAgIHk6IGRpc3RhbmNlXG4gIH07XG59XG5cbmZ1bmN0aW9uIG9mZnNldChfcmVmMikge1xuICB2YXIgc3RhdGUgPSBfcmVmMi5zdGF0ZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmMi5vcHRpb25zLFxuICAgICAgbmFtZSA9IF9yZWYyLm5hbWU7XG4gIHZhciBfb3B0aW9ucyRvZmZzZXQgPSBvcHRpb25zLm9mZnNldCxcbiAgICAgIG9mZnNldCA9IF9vcHRpb25zJG9mZnNldCA9PT0gdm9pZCAwID8gWzAsIDBdIDogX29wdGlvbnMkb2Zmc2V0O1xuICB2YXIgZGF0YSA9IHBsYWNlbWVudHMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHBsYWNlbWVudCkge1xuICAgIGFjY1twbGFjZW1lbnRdID0gZGlzdGFuY2VBbmRTa2lkZGluZ1RvWFkocGxhY2VtZW50LCBzdGF0ZS5yZWN0cywgb2Zmc2V0KTtcbiAgICByZXR1cm4gYWNjO1xuICB9LCB7fSk7XG4gIHZhciBfZGF0YSRzdGF0ZSRwbGFjZW1lbnQgPSBkYXRhW3N0YXRlLnBsYWNlbWVudF0sXG4gICAgICB4ID0gX2RhdGEkc3RhdGUkcGxhY2VtZW50LngsXG4gICAgICB5ID0gX2RhdGEkc3RhdGUkcGxhY2VtZW50Lnk7XG5cbiAgaWYgKHN0YXRlLm1vZGlmaWVyc0RhdGEucG9wcGVyT2Zmc2V0cyAhPSBudWxsKSB7XG4gICAgc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzLnggKz0geDtcbiAgICBzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHMueSArPSB5O1xuICB9XG5cbiAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IGRhdGE7XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdvZmZzZXQnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ21haW4nLFxuICByZXF1aXJlczogWydwb3BwZXJPZmZzZXRzJ10sXG4gIGZuOiBvZmZzZXRcbn07IiwiaW1wb3J0IGNvbXB1dGVPZmZzZXRzIGZyb20gXCIuLi91dGlscy9jb21wdXRlT2Zmc2V0cy5qc1wiO1xuXG5mdW5jdGlvbiBwb3BwZXJPZmZzZXRzKF9yZWYpIHtcbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWU7XG4gIC8vIE9mZnNldHMgYXJlIHRoZSBhY3R1YWwgcG9zaXRpb24gdGhlIHBvcHBlciBuZWVkcyB0byBoYXZlIHRvIGJlXG4gIC8vIHByb3Blcmx5IHBvc2l0aW9uZWQgbmVhciBpdHMgcmVmZXJlbmNlIGVsZW1lbnRcbiAgLy8gVGhpcyBpcyB0aGUgbW9zdCBiYXNpYyBwbGFjZW1lbnQsIGFuZCB3aWxsIGJlIGFkanVzdGVkIGJ5XG4gIC8vIHRoZSBtb2RpZmllcnMgaW4gdGhlIG5leHQgc3RlcFxuICBzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdID0gY29tcHV0ZU9mZnNldHMoe1xuICAgIHJlZmVyZW5jZTogc3RhdGUucmVjdHMucmVmZXJlbmNlLFxuICAgIGVsZW1lbnQ6IHN0YXRlLnJlY3RzLnBvcHBlcixcbiAgICBzdHJhdGVneTogJ2Fic29sdXRlJyxcbiAgICBwbGFjZW1lbnQ6IHN0YXRlLnBsYWNlbWVudFxuICB9KTtcbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3BvcHBlck9mZnNldHMnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ3JlYWQnLFxuICBmbjogcG9wcGVyT2Zmc2V0cyxcbiAgZGF0YToge31cbn07IiwiaW1wb3J0IHsgdG9wLCBsZWZ0LCByaWdodCwgYm90dG9tLCBzdGFydCB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IGdldEJhc2VQbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldE1haW5BeGlzRnJvbVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IGdldEFsdEF4aXMgZnJvbSBcIi4uL3V0aWxzL2dldEFsdEF4aXMuanNcIjtcbmltcG9ydCB7IHdpdGhpbiwgd2l0aGluTWF4Q2xhbXAgfSBmcm9tIFwiLi4vdXRpbHMvd2l0aGluLmpzXCI7XG5pbXBvcnQgZ2V0TGF5b3V0UmVjdCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldExheW91dFJlY3QuanNcIjtcbmltcG9ydCBnZXRPZmZzZXRQYXJlbnQgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRPZmZzZXRQYXJlbnQuanNcIjtcbmltcG9ydCBkZXRlY3RPdmVyZmxvdyBmcm9tIFwiLi4vdXRpbHMvZGV0ZWN0T3ZlcmZsb3cuanNcIjtcbmltcG9ydCBnZXRWYXJpYXRpb24gZnJvbSBcIi4uL3V0aWxzL2dldFZhcmlhdGlvbi5qc1wiO1xuaW1wb3J0IGdldEZyZXNoU2lkZU9iamVjdCBmcm9tIFwiLi4vdXRpbHMvZ2V0RnJlc2hTaWRlT2JqZWN0LmpzXCI7XG5pbXBvcnQgeyBtaW4gYXMgbWF0aE1pbiwgbWF4IGFzIG1hdGhNYXggfSBmcm9tIFwiLi4vdXRpbHMvbWF0aC5qc1wiO1xuXG5mdW5jdGlvbiBwcmV2ZW50T3ZlcmZsb3coX3JlZikge1xuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlLFxuICAgICAgb3B0aW9ucyA9IF9yZWYub3B0aW9ucyxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWU7XG4gIHZhciBfb3B0aW9ucyRtYWluQXhpcyA9IG9wdGlvbnMubWFpbkF4aXMsXG4gICAgICBjaGVja01haW5BeGlzID0gX29wdGlvbnMkbWFpbkF4aXMgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRtYWluQXhpcyxcbiAgICAgIF9vcHRpb25zJGFsdEF4aXMgPSBvcHRpb25zLmFsdEF4aXMsXG4gICAgICBjaGVja0FsdEF4aXMgPSBfb3B0aW9ucyRhbHRBeGlzID09PSB2b2lkIDAgPyBmYWxzZSA6IF9vcHRpb25zJGFsdEF4aXMsXG4gICAgICBib3VuZGFyeSA9IG9wdGlvbnMuYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnkgPSBvcHRpb25zLnJvb3RCb3VuZGFyeSxcbiAgICAgIGFsdEJvdW5kYXJ5ID0gb3B0aW9ucy5hbHRCb3VuZGFyeSxcbiAgICAgIHBhZGRpbmcgPSBvcHRpb25zLnBhZGRpbmcsXG4gICAgICBfb3B0aW9ucyR0ZXRoZXIgPSBvcHRpb25zLnRldGhlcixcbiAgICAgIHRldGhlciA9IF9vcHRpb25zJHRldGhlciA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJHRldGhlcixcbiAgICAgIF9vcHRpb25zJHRldGhlck9mZnNldCA9IG9wdGlvbnMudGV0aGVyT2Zmc2V0LFxuICAgICAgdGV0aGVyT2Zmc2V0ID0gX29wdGlvbnMkdGV0aGVyT2Zmc2V0ID09PSB2b2lkIDAgPyAwIDogX29wdGlvbnMkdGV0aGVyT2Zmc2V0O1xuICB2YXIgb3ZlcmZsb3cgPSBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwge1xuICAgIGJvdW5kYXJ5OiBib3VuZGFyeSxcbiAgICByb290Qm91bmRhcnk6IHJvb3RCb3VuZGFyeSxcbiAgICBwYWRkaW5nOiBwYWRkaW5nLFxuICAgIGFsdEJvdW5kYXJ5OiBhbHRCb3VuZGFyeVxuICB9KTtcbiAgdmFyIGJhc2VQbGFjZW1lbnQgPSBnZXRCYXNlUGxhY2VtZW50KHN0YXRlLnBsYWNlbWVudCk7XG4gIHZhciB2YXJpYXRpb24gPSBnZXRWYXJpYXRpb24oc3RhdGUucGxhY2VtZW50KTtcbiAgdmFyIGlzQmFzZVBsYWNlbWVudCA9ICF2YXJpYXRpb247XG4gIHZhciBtYWluQXhpcyA9IGdldE1haW5BeGlzRnJvbVBsYWNlbWVudChiYXNlUGxhY2VtZW50KTtcbiAgdmFyIGFsdEF4aXMgPSBnZXRBbHRBeGlzKG1haW5BeGlzKTtcbiAgdmFyIHBvcHBlck9mZnNldHMgPSBzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHM7XG4gIHZhciByZWZlcmVuY2VSZWN0ID0gc3RhdGUucmVjdHMucmVmZXJlbmNlO1xuICB2YXIgcG9wcGVyUmVjdCA9IHN0YXRlLnJlY3RzLnBvcHBlcjtcbiAgdmFyIHRldGhlck9mZnNldFZhbHVlID0gdHlwZW9mIHRldGhlck9mZnNldCA9PT0gJ2Z1bmN0aW9uJyA/IHRldGhlck9mZnNldChPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5yZWN0cywge1xuICAgIHBsYWNlbWVudDogc3RhdGUucGxhY2VtZW50XG4gIH0pKSA6IHRldGhlck9mZnNldDtcbiAgdmFyIG5vcm1hbGl6ZWRUZXRoZXJPZmZzZXRWYWx1ZSA9IHR5cGVvZiB0ZXRoZXJPZmZzZXRWYWx1ZSA9PT0gJ251bWJlcicgPyB7XG4gICAgbWFpbkF4aXM6IHRldGhlck9mZnNldFZhbHVlLFxuICAgIGFsdEF4aXM6IHRldGhlck9mZnNldFZhbHVlXG4gIH0gOiBPYmplY3QuYXNzaWduKHtcbiAgICBtYWluQXhpczogMCxcbiAgICBhbHRBeGlzOiAwXG4gIH0sIHRldGhlck9mZnNldFZhbHVlKTtcbiAgdmFyIG9mZnNldE1vZGlmaWVyU3RhdGUgPSBzdGF0ZS5tb2RpZmllcnNEYXRhLm9mZnNldCA/IHN0YXRlLm1vZGlmaWVyc0RhdGEub2Zmc2V0W3N0YXRlLnBsYWNlbWVudF0gOiBudWxsO1xuICB2YXIgZGF0YSA9IHtcbiAgICB4OiAwLFxuICAgIHk6IDBcbiAgfTtcblxuICBpZiAoIXBvcHBlck9mZnNldHMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoY2hlY2tNYWluQXhpcykge1xuICAgIHZhciBfb2Zmc2V0TW9kaWZpZXJTdGF0ZSQ7XG5cbiAgICB2YXIgbWFpblNpZGUgPSBtYWluQXhpcyA9PT0gJ3knID8gdG9wIDogbGVmdDtcbiAgICB2YXIgYWx0U2lkZSA9IG1haW5BeGlzID09PSAneScgPyBib3R0b20gOiByaWdodDtcbiAgICB2YXIgbGVuID0gbWFpbkF4aXMgPT09ICd5JyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcbiAgICB2YXIgb2Zmc2V0ID0gcG9wcGVyT2Zmc2V0c1ttYWluQXhpc107XG4gICAgdmFyIG1pbiA9IG9mZnNldCArIG92ZXJmbG93W21haW5TaWRlXTtcbiAgICB2YXIgbWF4ID0gb2Zmc2V0IC0gb3ZlcmZsb3dbYWx0U2lkZV07XG4gICAgdmFyIGFkZGl0aXZlID0gdGV0aGVyID8gLXBvcHBlclJlY3RbbGVuXSAvIDIgOiAwO1xuICAgIHZhciBtaW5MZW4gPSB2YXJpYXRpb24gPT09IHN0YXJ0ID8gcmVmZXJlbmNlUmVjdFtsZW5dIDogcG9wcGVyUmVjdFtsZW5dO1xuICAgIHZhciBtYXhMZW4gPSB2YXJpYXRpb24gPT09IHN0YXJ0ID8gLXBvcHBlclJlY3RbbGVuXSA6IC1yZWZlcmVuY2VSZWN0W2xlbl07IC8vIFdlIG5lZWQgdG8gaW5jbHVkZSB0aGUgYXJyb3cgaW4gdGhlIGNhbGN1bGF0aW9uIHNvIHRoZSBhcnJvdyBkb2Vzbid0IGdvXG4gICAgLy8gb3V0c2lkZSB0aGUgcmVmZXJlbmNlIGJvdW5kc1xuXG4gICAgdmFyIGFycm93RWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzLmFycm93O1xuICAgIHZhciBhcnJvd1JlY3QgPSB0ZXRoZXIgJiYgYXJyb3dFbGVtZW50ID8gZ2V0TGF5b3V0UmVjdChhcnJvd0VsZW1lbnQpIDoge1xuICAgICAgd2lkdGg6IDAsXG4gICAgICBoZWlnaHQ6IDBcbiAgICB9O1xuICAgIHZhciBhcnJvd1BhZGRpbmdPYmplY3QgPSBzdGF0ZS5tb2RpZmllcnNEYXRhWydhcnJvdyNwZXJzaXN0ZW50J10gPyBzdGF0ZS5tb2RpZmllcnNEYXRhWydhcnJvdyNwZXJzaXN0ZW50J10ucGFkZGluZyA6IGdldEZyZXNoU2lkZU9iamVjdCgpO1xuICAgIHZhciBhcnJvd1BhZGRpbmdNaW4gPSBhcnJvd1BhZGRpbmdPYmplY3RbbWFpblNpZGVdO1xuICAgIHZhciBhcnJvd1BhZGRpbmdNYXggPSBhcnJvd1BhZGRpbmdPYmplY3RbYWx0U2lkZV07IC8vIElmIHRoZSByZWZlcmVuY2UgbGVuZ3RoIGlzIHNtYWxsZXIgdGhhbiB0aGUgYXJyb3cgbGVuZ3RoLCB3ZSBkb24ndCB3YW50XG4gICAgLy8gdG8gaW5jbHVkZSBpdHMgZnVsbCBzaXplIGluIHRoZSBjYWxjdWxhdGlvbi4gSWYgdGhlIHJlZmVyZW5jZSBpcyBzbWFsbFxuICAgIC8vIGFuZCBuZWFyIHRoZSBlZGdlIG9mIGEgYm91bmRhcnksIHRoZSBwb3BwZXIgY2FuIG92ZXJmbG93IGV2ZW4gaWYgdGhlXG4gICAgLy8gcmVmZXJlbmNlIGlzIG5vdCBvdmVyZmxvd2luZyBhcyB3ZWxsIChlLmcuIHZpcnR1YWwgZWxlbWVudHMgd2l0aCBub1xuICAgIC8vIHdpZHRoIG9yIGhlaWdodClcblxuICAgIHZhciBhcnJvd0xlbiA9IHdpdGhpbigwLCByZWZlcmVuY2VSZWN0W2xlbl0sIGFycm93UmVjdFtsZW5dKTtcbiAgICB2YXIgbWluT2Zmc2V0ID0gaXNCYXNlUGxhY2VtZW50ID8gcmVmZXJlbmNlUmVjdFtsZW5dIC8gMiAtIGFkZGl0aXZlIC0gYXJyb3dMZW4gLSBhcnJvd1BhZGRpbmdNaW4gLSBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUubWFpbkF4aXMgOiBtaW5MZW4gLSBhcnJvd0xlbiAtIGFycm93UGFkZGluZ01pbiAtIG5vcm1hbGl6ZWRUZXRoZXJPZmZzZXRWYWx1ZS5tYWluQXhpcztcbiAgICB2YXIgbWF4T2Zmc2V0ID0gaXNCYXNlUGxhY2VtZW50ID8gLXJlZmVyZW5jZVJlY3RbbGVuXSAvIDIgKyBhZGRpdGl2ZSArIGFycm93TGVuICsgYXJyb3dQYWRkaW5nTWF4ICsgbm9ybWFsaXplZFRldGhlck9mZnNldFZhbHVlLm1haW5BeGlzIDogbWF4TGVuICsgYXJyb3dMZW4gKyBhcnJvd1BhZGRpbmdNYXggKyBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUubWFpbkF4aXM7XG4gICAgdmFyIGFycm93T2Zmc2V0UGFyZW50ID0gc3RhdGUuZWxlbWVudHMuYXJyb3cgJiYgZ2V0T2Zmc2V0UGFyZW50KHN0YXRlLmVsZW1lbnRzLmFycm93KTtcbiAgICB2YXIgY2xpZW50T2Zmc2V0ID0gYXJyb3dPZmZzZXRQYXJlbnQgPyBtYWluQXhpcyA9PT0gJ3knID8gYXJyb3dPZmZzZXRQYXJlbnQuY2xpZW50VG9wIHx8IDAgOiBhcnJvd09mZnNldFBhcmVudC5jbGllbnRMZWZ0IHx8IDAgOiAwO1xuICAgIHZhciBvZmZzZXRNb2RpZmllclZhbHVlID0gKF9vZmZzZXRNb2RpZmllclN0YXRlJCA9IG9mZnNldE1vZGlmaWVyU3RhdGUgPT0gbnVsbCA/IHZvaWQgMCA6IG9mZnNldE1vZGlmaWVyU3RhdGVbbWFpbkF4aXNdKSAhPSBudWxsID8gX29mZnNldE1vZGlmaWVyU3RhdGUkIDogMDtcbiAgICB2YXIgdGV0aGVyTWluID0gb2Zmc2V0ICsgbWluT2Zmc2V0IC0gb2Zmc2V0TW9kaWZpZXJWYWx1ZSAtIGNsaWVudE9mZnNldDtcbiAgICB2YXIgdGV0aGVyTWF4ID0gb2Zmc2V0ICsgbWF4T2Zmc2V0IC0gb2Zmc2V0TW9kaWZpZXJWYWx1ZTtcbiAgICB2YXIgcHJldmVudGVkT2Zmc2V0ID0gd2l0aGluKHRldGhlciA/IG1hdGhNaW4obWluLCB0ZXRoZXJNaW4pIDogbWluLCBvZmZzZXQsIHRldGhlciA/IG1hdGhNYXgobWF4LCB0ZXRoZXJNYXgpIDogbWF4KTtcbiAgICBwb3BwZXJPZmZzZXRzW21haW5BeGlzXSA9IHByZXZlbnRlZE9mZnNldDtcbiAgICBkYXRhW21haW5BeGlzXSA9IHByZXZlbnRlZE9mZnNldCAtIG9mZnNldDtcbiAgfVxuXG4gIGlmIChjaGVja0FsdEF4aXMpIHtcbiAgICB2YXIgX29mZnNldE1vZGlmaWVyU3RhdGUkMjtcblxuICAgIHZhciBfbWFpblNpZGUgPSBtYWluQXhpcyA9PT0gJ3gnID8gdG9wIDogbGVmdDtcblxuICAgIHZhciBfYWx0U2lkZSA9IG1haW5BeGlzID09PSAneCcgPyBib3R0b20gOiByaWdodDtcblxuICAgIHZhciBfb2Zmc2V0ID0gcG9wcGVyT2Zmc2V0c1thbHRBeGlzXTtcblxuICAgIHZhciBfbGVuID0gYWx0QXhpcyA9PT0gJ3knID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuXG4gICAgdmFyIF9taW4gPSBfb2Zmc2V0ICsgb3ZlcmZsb3dbX21haW5TaWRlXTtcblxuICAgIHZhciBfbWF4ID0gX29mZnNldCAtIG92ZXJmbG93W19hbHRTaWRlXTtcblxuICAgIHZhciBpc09yaWdpblNpZGUgPSBbdG9wLCBsZWZ0XS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpICE9PSAtMTtcblxuICAgIHZhciBfb2Zmc2V0TW9kaWZpZXJWYWx1ZSA9IChfb2Zmc2V0TW9kaWZpZXJTdGF0ZSQyID0gb2Zmc2V0TW9kaWZpZXJTdGF0ZSA9PSBudWxsID8gdm9pZCAwIDogb2Zmc2V0TW9kaWZpZXJTdGF0ZVthbHRBeGlzXSkgIT0gbnVsbCA/IF9vZmZzZXRNb2RpZmllclN0YXRlJDIgOiAwO1xuXG4gICAgdmFyIF90ZXRoZXJNaW4gPSBpc09yaWdpblNpZGUgPyBfbWluIDogX29mZnNldCAtIHJlZmVyZW5jZVJlY3RbX2xlbl0gLSBwb3BwZXJSZWN0W19sZW5dIC0gX29mZnNldE1vZGlmaWVyVmFsdWUgKyBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUuYWx0QXhpcztcblxuICAgIHZhciBfdGV0aGVyTWF4ID0gaXNPcmlnaW5TaWRlID8gX29mZnNldCArIHJlZmVyZW5jZVJlY3RbX2xlbl0gKyBwb3BwZXJSZWN0W19sZW5dIC0gX29mZnNldE1vZGlmaWVyVmFsdWUgLSBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUuYWx0QXhpcyA6IF9tYXg7XG5cbiAgICB2YXIgX3ByZXZlbnRlZE9mZnNldCA9IHRldGhlciAmJiBpc09yaWdpblNpZGUgPyB3aXRoaW5NYXhDbGFtcChfdGV0aGVyTWluLCBfb2Zmc2V0LCBfdGV0aGVyTWF4KSA6IHdpdGhpbih0ZXRoZXIgPyBfdGV0aGVyTWluIDogX21pbiwgX29mZnNldCwgdGV0aGVyID8gX3RldGhlck1heCA6IF9tYXgpO1xuXG4gICAgcG9wcGVyT2Zmc2V0c1thbHRBeGlzXSA9IF9wcmV2ZW50ZWRPZmZzZXQ7XG4gICAgZGF0YVthbHRBeGlzXSA9IF9wcmV2ZW50ZWRPZmZzZXQgLSBfb2Zmc2V0O1xuICB9XG5cbiAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IGRhdGE7XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdwcmV2ZW50T3ZlcmZsb3cnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ21haW4nLFxuICBmbjogcHJldmVudE92ZXJmbG93LFxuICByZXF1aXJlc0lmRXhpc3RzOiBbJ29mZnNldCddXG59OyIsImltcG9ydCB7IHBvcHBlckdlbmVyYXRvciwgZGV0ZWN0T3ZlcmZsb3cgfSBmcm9tIFwiLi9jcmVhdGVQb3BwZXIuanNcIjtcbmltcG9ydCBldmVudExpc3RlbmVycyBmcm9tIFwiLi9tb2RpZmllcnMvZXZlbnRMaXN0ZW5lcnMuanNcIjtcbmltcG9ydCBwb3BwZXJPZmZzZXRzIGZyb20gXCIuL21vZGlmaWVycy9wb3BwZXJPZmZzZXRzLmpzXCI7XG5pbXBvcnQgY29tcHV0ZVN0eWxlcyBmcm9tIFwiLi9tb2RpZmllcnMvY29tcHV0ZVN0eWxlcy5qc1wiO1xuaW1wb3J0IGFwcGx5U3R5bGVzIGZyb20gXCIuL21vZGlmaWVycy9hcHBseVN0eWxlcy5qc1wiO1xudmFyIGRlZmF1bHRNb2RpZmllcnMgPSBbZXZlbnRMaXN0ZW5lcnMsIHBvcHBlck9mZnNldHMsIGNvbXB1dGVTdHlsZXMsIGFwcGx5U3R5bGVzXTtcbnZhciBjcmVhdGVQb3BwZXIgPSAvKiNfX1BVUkVfXyovcG9wcGVyR2VuZXJhdG9yKHtcbiAgZGVmYXVsdE1vZGlmaWVyczogZGVmYXVsdE1vZGlmaWVyc1xufSk7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZXhwb3J0IHsgY3JlYXRlUG9wcGVyLCBwb3BwZXJHZW5lcmF0b3IsIGRlZmF1bHRNb2RpZmllcnMsIGRldGVjdE92ZXJmbG93IH07IiwiaW1wb3J0IHsgcG9wcGVyR2VuZXJhdG9yLCBkZXRlY3RPdmVyZmxvdyB9IGZyb20gXCIuL2NyZWF0ZVBvcHBlci5qc1wiO1xuaW1wb3J0IGV2ZW50TGlzdGVuZXJzIGZyb20gXCIuL21vZGlmaWVycy9ldmVudExpc3RlbmVycy5qc1wiO1xuaW1wb3J0IHBvcHBlck9mZnNldHMgZnJvbSBcIi4vbW9kaWZpZXJzL3BvcHBlck9mZnNldHMuanNcIjtcbmltcG9ydCBjb21wdXRlU3R5bGVzIGZyb20gXCIuL21vZGlmaWVycy9jb21wdXRlU3R5bGVzLmpzXCI7XG5pbXBvcnQgYXBwbHlTdHlsZXMgZnJvbSBcIi4vbW9kaWZpZXJzL2FwcGx5U3R5bGVzLmpzXCI7XG5pbXBvcnQgb2Zmc2V0IGZyb20gXCIuL21vZGlmaWVycy9vZmZzZXQuanNcIjtcbmltcG9ydCBmbGlwIGZyb20gXCIuL21vZGlmaWVycy9mbGlwLmpzXCI7XG5pbXBvcnQgcHJldmVudE92ZXJmbG93IGZyb20gXCIuL21vZGlmaWVycy9wcmV2ZW50T3ZlcmZsb3cuanNcIjtcbmltcG9ydCBhcnJvdyBmcm9tIFwiLi9tb2RpZmllcnMvYXJyb3cuanNcIjtcbmltcG9ydCBoaWRlIGZyb20gXCIuL21vZGlmaWVycy9oaWRlLmpzXCI7XG52YXIgZGVmYXVsdE1vZGlmaWVycyA9IFtldmVudExpc3RlbmVycywgcG9wcGVyT2Zmc2V0cywgY29tcHV0ZVN0eWxlcywgYXBwbHlTdHlsZXMsIG9mZnNldCwgZmxpcCwgcHJldmVudE92ZXJmbG93LCBhcnJvdywgaGlkZV07XG52YXIgY3JlYXRlUG9wcGVyID0gLyojX19QVVJFX18qL3BvcHBlckdlbmVyYXRvcih7XG4gIGRlZmF1bHRNb2RpZmllcnM6IGRlZmF1bHRNb2RpZmllcnNcbn0pOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbmV4cG9ydCB7IGNyZWF0ZVBvcHBlciwgcG9wcGVyR2VuZXJhdG9yLCBkZWZhdWx0TW9kaWZpZXJzLCBkZXRlY3RPdmVyZmxvdyB9OyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbmV4cG9ydCB7IGNyZWF0ZVBvcHBlciBhcyBjcmVhdGVQb3BwZXJMaXRlIH0gZnJvbSBcIi4vcG9wcGVyLWxpdGUuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgKiBmcm9tIFwiLi9tb2RpZmllcnMvaW5kZXguanNcIjsiLCJpbXBvcnQgZ2V0VmFyaWF0aW9uIGZyb20gXCIuL2dldFZhcmlhdGlvbi5qc1wiO1xuaW1wb3J0IHsgdmFyaWF0aW9uUGxhY2VtZW50cywgYmFzZVBsYWNlbWVudHMsIHBsYWNlbWVudHMgYXMgYWxsUGxhY2VtZW50cyB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IGRldGVjdE92ZXJmbG93IGZyb20gXCIuL2RldGVjdE92ZXJmbG93LmpzXCI7XG5pbXBvcnQgZ2V0QmFzZVBsYWNlbWVudCBmcm9tIFwiLi9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21wdXRlQXV0b1BsYWNlbWVudChzdGF0ZSwgb3B0aW9ucykge1xuICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgdmFyIF9vcHRpb25zID0gb3B0aW9ucyxcbiAgICAgIHBsYWNlbWVudCA9IF9vcHRpb25zLnBsYWNlbWVudCxcbiAgICAgIGJvdW5kYXJ5ID0gX29wdGlvbnMuYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnkgPSBfb3B0aW9ucy5yb290Qm91bmRhcnksXG4gICAgICBwYWRkaW5nID0gX29wdGlvbnMucGFkZGluZyxcbiAgICAgIGZsaXBWYXJpYXRpb25zID0gX29wdGlvbnMuZmxpcFZhcmlhdGlvbnMsXG4gICAgICBfb3B0aW9ucyRhbGxvd2VkQXV0b1AgPSBfb3B0aW9ucy5hbGxvd2VkQXV0b1BsYWNlbWVudHMsXG4gICAgICBhbGxvd2VkQXV0b1BsYWNlbWVudHMgPSBfb3B0aW9ucyRhbGxvd2VkQXV0b1AgPT09IHZvaWQgMCA/IGFsbFBsYWNlbWVudHMgOiBfb3B0aW9ucyRhbGxvd2VkQXV0b1A7XG4gIHZhciB2YXJpYXRpb24gPSBnZXRWYXJpYXRpb24ocGxhY2VtZW50KTtcbiAgdmFyIHBsYWNlbWVudHMgPSB2YXJpYXRpb24gPyBmbGlwVmFyaWF0aW9ucyA/IHZhcmlhdGlvblBsYWNlbWVudHMgOiB2YXJpYXRpb25QbGFjZW1lbnRzLmZpbHRlcihmdW5jdGlvbiAocGxhY2VtZW50KSB7XG4gICAgcmV0dXJuIGdldFZhcmlhdGlvbihwbGFjZW1lbnQpID09PSB2YXJpYXRpb247XG4gIH0pIDogYmFzZVBsYWNlbWVudHM7XG4gIHZhciBhbGxvd2VkUGxhY2VtZW50cyA9IHBsYWNlbWVudHMuZmlsdGVyKGZ1bmN0aW9uIChwbGFjZW1lbnQpIHtcbiAgICByZXR1cm4gYWxsb3dlZEF1dG9QbGFjZW1lbnRzLmluZGV4T2YocGxhY2VtZW50KSA+PSAwO1xuICB9KTtcblxuICBpZiAoYWxsb3dlZFBsYWNlbWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgYWxsb3dlZFBsYWNlbWVudHMgPSBwbGFjZW1lbnRzO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgY29uc29sZS5lcnJvcihbJ1BvcHBlcjogVGhlIGBhbGxvd2VkQXV0b1BsYWNlbWVudHNgIG9wdGlvbiBkaWQgbm90IGFsbG93IGFueScsICdwbGFjZW1lbnRzLiBFbnN1cmUgdGhlIGBwbGFjZW1lbnRgIG9wdGlvbiBtYXRjaGVzIHRoZSB2YXJpYXRpb24nLCAnb2YgdGhlIGFsbG93ZWQgcGxhY2VtZW50cy4nLCAnRm9yIGV4YW1wbGUsIFwiYXV0b1wiIGNhbm5vdCBiZSB1c2VkIHRvIGFsbG93IFwiYm90dG9tLXN0YXJ0XCIuJywgJ1VzZSBcImF1dG8tc3RhcnRcIiBpbnN0ZWFkLiddLmpvaW4oJyAnKSk7XG4gICAgfVxuICB9IC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXR5cGVdOiBGbG93IHNlZW1zIHRvIGhhdmUgcHJvYmxlbXMgd2l0aCB0d28gYXJyYXkgdW5pb25zLi4uXG5cblxuICB2YXIgb3ZlcmZsb3dzID0gYWxsb3dlZFBsYWNlbWVudHMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHBsYWNlbWVudCkge1xuICAgIGFjY1twbGFjZW1lbnRdID0gZGV0ZWN0T3ZlcmZsb3coc3RhdGUsIHtcbiAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50LFxuICAgICAgYm91bmRhcnk6IGJvdW5kYXJ5LFxuICAgICAgcm9vdEJvdW5kYXJ5OiByb290Qm91bmRhcnksXG4gICAgICBwYWRkaW5nOiBwYWRkaW5nXG4gICAgfSlbZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpXTtcbiAgICByZXR1cm4gYWNjO1xuICB9LCB7fSk7XG4gIHJldHVybiBPYmplY3Qua2V5cyhvdmVyZmxvd3MpLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gb3ZlcmZsb3dzW2FdIC0gb3ZlcmZsb3dzW2JdO1xuICB9KTtcbn0iLCJpbXBvcnQgZ2V0QmFzZVBsYWNlbWVudCBmcm9tIFwiLi9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0VmFyaWF0aW9uIGZyb20gXCIuL2dldFZhcmlhdGlvbi5qc1wiO1xuaW1wb3J0IGdldE1haW5BeGlzRnJvbVBsYWNlbWVudCBmcm9tIFwiLi9nZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQuanNcIjtcbmltcG9ydCB7IHRvcCwgcmlnaHQsIGJvdHRvbSwgbGVmdCwgc3RhcnQsIGVuZCB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tcHV0ZU9mZnNldHMoX3JlZikge1xuICB2YXIgcmVmZXJlbmNlID0gX3JlZi5yZWZlcmVuY2UsXG4gICAgICBlbGVtZW50ID0gX3JlZi5lbGVtZW50LFxuICAgICAgcGxhY2VtZW50ID0gX3JlZi5wbGFjZW1lbnQ7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gcGxhY2VtZW50ID8gZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpIDogbnVsbDtcbiAgdmFyIHZhcmlhdGlvbiA9IHBsYWNlbWVudCA/IGdldFZhcmlhdGlvbihwbGFjZW1lbnQpIDogbnVsbDtcbiAgdmFyIGNvbW1vblggPSByZWZlcmVuY2UueCArIHJlZmVyZW5jZS53aWR0aCAvIDIgLSBlbGVtZW50LndpZHRoIC8gMjtcbiAgdmFyIGNvbW1vblkgPSByZWZlcmVuY2UueSArIHJlZmVyZW5jZS5oZWlnaHQgLyAyIC0gZWxlbWVudC5oZWlnaHQgLyAyO1xuICB2YXIgb2Zmc2V0cztcblxuICBzd2l0Y2ggKGJhc2VQbGFjZW1lbnQpIHtcbiAgICBjYXNlIHRvcDpcbiAgICAgIG9mZnNldHMgPSB7XG4gICAgICAgIHg6IGNvbW1vblgsXG4gICAgICAgIHk6IHJlZmVyZW5jZS55IC0gZWxlbWVudC5oZWlnaHRcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgYm90dG9tOlxuICAgICAgb2Zmc2V0cyA9IHtcbiAgICAgICAgeDogY29tbW9uWCxcbiAgICAgICAgeTogcmVmZXJlbmNlLnkgKyByZWZlcmVuY2UuaGVpZ2h0XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIHJpZ2h0OlxuICAgICAgb2Zmc2V0cyA9IHtcbiAgICAgICAgeDogcmVmZXJlbmNlLnggKyByZWZlcmVuY2Uud2lkdGgsXG4gICAgICAgIHk6IGNvbW1vbllcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgbGVmdDpcbiAgICAgIG9mZnNldHMgPSB7XG4gICAgICAgIHg6IHJlZmVyZW5jZS54IC0gZWxlbWVudC53aWR0aCxcbiAgICAgICAgeTogY29tbW9uWVxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIG9mZnNldHMgPSB7XG4gICAgICAgIHg6IHJlZmVyZW5jZS54LFxuICAgICAgICB5OiByZWZlcmVuY2UueVxuICAgICAgfTtcbiAgfVxuXG4gIHZhciBtYWluQXhpcyA9IGJhc2VQbGFjZW1lbnQgPyBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQoYmFzZVBsYWNlbWVudCkgOiBudWxsO1xuXG4gIGlmIChtYWluQXhpcyAhPSBudWxsKSB7XG4gICAgdmFyIGxlbiA9IG1haW5BeGlzID09PSAneScgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG5cbiAgICBzd2l0Y2ggKHZhcmlhdGlvbikge1xuICAgICAgY2FzZSBzdGFydDpcbiAgICAgICAgb2Zmc2V0c1ttYWluQXhpc10gPSBvZmZzZXRzW21haW5BeGlzXSAtIChyZWZlcmVuY2VbbGVuXSAvIDIgLSBlbGVtZW50W2xlbl0gLyAyKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgZW5kOlxuICAgICAgICBvZmZzZXRzW21haW5BeGlzXSA9IG9mZnNldHNbbWFpbkF4aXNdICsgKHJlZmVyZW5jZVtsZW5dIC8gMiAtIGVsZW1lbnRbbGVuXSAvIDIpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2Zmc2V0cztcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWJvdW5jZShmbikge1xuICB2YXIgcGVuZGluZztcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXBlbmRpbmcpIHtcbiAgICAgIHBlbmRpbmcgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBwZW5kaW5nID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHJlc29sdmUoZm4oKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBlbmRpbmc7XG4gIH07XG59IiwiaW1wb3J0IGdldENsaXBwaW5nUmVjdCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldENsaXBwaW5nUmVjdC5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldERvY3VtZW50RWxlbWVudC5qc1wiO1xuaW1wb3J0IGdldEJvdW5kaW5nQ2xpZW50UmVjdCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldEJvdW5kaW5nQ2xpZW50UmVjdC5qc1wiO1xuaW1wb3J0IGNvbXB1dGVPZmZzZXRzIGZyb20gXCIuL2NvbXB1dGVPZmZzZXRzLmpzXCI7XG5pbXBvcnQgcmVjdFRvQ2xpZW50UmVjdCBmcm9tIFwiLi9yZWN0VG9DbGllbnRSZWN0LmpzXCI7XG5pbXBvcnQgeyBjbGlwcGluZ1BhcmVudHMsIHJlZmVyZW5jZSwgcG9wcGVyLCBib3R0b20sIHRvcCwgcmlnaHQsIGJhc2VQbGFjZW1lbnRzLCB2aWV3cG9ydCB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IHsgaXNFbGVtZW50IH0gZnJvbSBcIi4uL2RvbS11dGlscy9pbnN0YW5jZU9mLmpzXCI7XG5pbXBvcnQgbWVyZ2VQYWRkaW5nT2JqZWN0IGZyb20gXCIuL21lcmdlUGFkZGluZ09iamVjdC5qc1wiO1xuaW1wb3J0IGV4cGFuZFRvSGFzaE1hcCBmcm9tIFwiLi9leHBhbmRUb0hhc2hNYXAuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwgb3B0aW9ucykge1xuICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgdmFyIF9vcHRpb25zID0gb3B0aW9ucyxcbiAgICAgIF9vcHRpb25zJHBsYWNlbWVudCA9IF9vcHRpb25zLnBsYWNlbWVudCxcbiAgICAgIHBsYWNlbWVudCA9IF9vcHRpb25zJHBsYWNlbWVudCA9PT0gdm9pZCAwID8gc3RhdGUucGxhY2VtZW50IDogX29wdGlvbnMkcGxhY2VtZW50LFxuICAgICAgX29wdGlvbnMkc3RyYXRlZ3kgPSBfb3B0aW9ucy5zdHJhdGVneSxcbiAgICAgIHN0cmF0ZWd5ID0gX29wdGlvbnMkc3RyYXRlZ3kgPT09IHZvaWQgMCA/IHN0YXRlLnN0cmF0ZWd5IDogX29wdGlvbnMkc3RyYXRlZ3ksXG4gICAgICBfb3B0aW9ucyRib3VuZGFyeSA9IF9vcHRpb25zLmJvdW5kYXJ5LFxuICAgICAgYm91bmRhcnkgPSBfb3B0aW9ucyRib3VuZGFyeSA9PT0gdm9pZCAwID8gY2xpcHBpbmdQYXJlbnRzIDogX29wdGlvbnMkYm91bmRhcnksXG4gICAgICBfb3B0aW9ucyRyb290Qm91bmRhcnkgPSBfb3B0aW9ucy5yb290Qm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnkgPSBfb3B0aW9ucyRyb290Qm91bmRhcnkgPT09IHZvaWQgMCA/IHZpZXdwb3J0IDogX29wdGlvbnMkcm9vdEJvdW5kYXJ5LFxuICAgICAgX29wdGlvbnMkZWxlbWVudENvbnRlID0gX29wdGlvbnMuZWxlbWVudENvbnRleHQsXG4gICAgICBlbGVtZW50Q29udGV4dCA9IF9vcHRpb25zJGVsZW1lbnRDb250ZSA9PT0gdm9pZCAwID8gcG9wcGVyIDogX29wdGlvbnMkZWxlbWVudENvbnRlLFxuICAgICAgX29wdGlvbnMkYWx0Qm91bmRhcnkgPSBfb3B0aW9ucy5hbHRCb3VuZGFyeSxcbiAgICAgIGFsdEJvdW5kYXJ5ID0gX29wdGlvbnMkYWx0Qm91bmRhcnkgPT09IHZvaWQgMCA/IGZhbHNlIDogX29wdGlvbnMkYWx0Qm91bmRhcnksXG4gICAgICBfb3B0aW9ucyRwYWRkaW5nID0gX29wdGlvbnMucGFkZGluZyxcbiAgICAgIHBhZGRpbmcgPSBfb3B0aW9ucyRwYWRkaW5nID09PSB2b2lkIDAgPyAwIDogX29wdGlvbnMkcGFkZGluZztcbiAgdmFyIHBhZGRpbmdPYmplY3QgPSBtZXJnZVBhZGRpbmdPYmplY3QodHlwZW9mIHBhZGRpbmcgIT09ICdudW1iZXInID8gcGFkZGluZyA6IGV4cGFuZFRvSGFzaE1hcChwYWRkaW5nLCBiYXNlUGxhY2VtZW50cykpO1xuICB2YXIgYWx0Q29udGV4dCA9IGVsZW1lbnRDb250ZXh0ID09PSBwb3BwZXIgPyByZWZlcmVuY2UgOiBwb3BwZXI7XG4gIHZhciBwb3BwZXJSZWN0ID0gc3RhdGUucmVjdHMucG9wcGVyO1xuICB2YXIgZWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzW2FsdEJvdW5kYXJ5ID8gYWx0Q29udGV4dCA6IGVsZW1lbnRDb250ZXh0XTtcbiAgdmFyIGNsaXBwaW5nQ2xpZW50UmVjdCA9IGdldENsaXBwaW5nUmVjdChpc0VsZW1lbnQoZWxlbWVudCkgPyBlbGVtZW50IDogZWxlbWVudC5jb250ZXh0RWxlbWVudCB8fCBnZXREb2N1bWVudEVsZW1lbnQoc3RhdGUuZWxlbWVudHMucG9wcGVyKSwgYm91bmRhcnksIHJvb3RCb3VuZGFyeSwgc3RyYXRlZ3kpO1xuICB2YXIgcmVmZXJlbmNlQ2xpZW50UmVjdCA9IGdldEJvdW5kaW5nQ2xpZW50UmVjdChzdGF0ZS5lbGVtZW50cy5yZWZlcmVuY2UpO1xuICB2YXIgcG9wcGVyT2Zmc2V0cyA9IGNvbXB1dGVPZmZzZXRzKHtcbiAgICByZWZlcmVuY2U6IHJlZmVyZW5jZUNsaWVudFJlY3QsXG4gICAgZWxlbWVudDogcG9wcGVyUmVjdCxcbiAgICBzdHJhdGVneTogJ2Fic29sdXRlJyxcbiAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudFxuICB9KTtcbiAgdmFyIHBvcHBlckNsaWVudFJlY3QgPSByZWN0VG9DbGllbnRSZWN0KE9iamVjdC5hc3NpZ24oe30sIHBvcHBlclJlY3QsIHBvcHBlck9mZnNldHMpKTtcbiAgdmFyIGVsZW1lbnRDbGllbnRSZWN0ID0gZWxlbWVudENvbnRleHQgPT09IHBvcHBlciA/IHBvcHBlckNsaWVudFJlY3QgOiByZWZlcmVuY2VDbGllbnRSZWN0OyAvLyBwb3NpdGl2ZSA9IG92ZXJmbG93aW5nIHRoZSBjbGlwcGluZyByZWN0XG4gIC8vIDAgb3IgbmVnYXRpdmUgPSB3aXRoaW4gdGhlIGNsaXBwaW5nIHJlY3RcblxuICB2YXIgb3ZlcmZsb3dPZmZzZXRzID0ge1xuICAgIHRvcDogY2xpcHBpbmdDbGllbnRSZWN0LnRvcCAtIGVsZW1lbnRDbGllbnRSZWN0LnRvcCArIHBhZGRpbmdPYmplY3QudG9wLFxuICAgIGJvdHRvbTogZWxlbWVudENsaWVudFJlY3QuYm90dG9tIC0gY2xpcHBpbmdDbGllbnRSZWN0LmJvdHRvbSArIHBhZGRpbmdPYmplY3QuYm90dG9tLFxuICAgIGxlZnQ6IGNsaXBwaW5nQ2xpZW50UmVjdC5sZWZ0IC0gZWxlbWVudENsaWVudFJlY3QubGVmdCArIHBhZGRpbmdPYmplY3QubGVmdCxcbiAgICByaWdodDogZWxlbWVudENsaWVudFJlY3QucmlnaHQgLSBjbGlwcGluZ0NsaWVudFJlY3QucmlnaHQgKyBwYWRkaW5nT2JqZWN0LnJpZ2h0XG4gIH07XG4gIHZhciBvZmZzZXREYXRhID0gc3RhdGUubW9kaWZpZXJzRGF0YS5vZmZzZXQ7IC8vIE9mZnNldHMgY2FuIGJlIGFwcGxpZWQgb25seSB0byB0aGUgcG9wcGVyIGVsZW1lbnRcblxuICBpZiAoZWxlbWVudENvbnRleHQgPT09IHBvcHBlciAmJiBvZmZzZXREYXRhKSB7XG4gICAgdmFyIG9mZnNldCA9IG9mZnNldERhdGFbcGxhY2VtZW50XTtcbiAgICBPYmplY3Qua2V5cyhvdmVyZmxvd09mZnNldHMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgdmFyIG11bHRpcGx5ID0gW3JpZ2h0LCBib3R0b21dLmluZGV4T2Yoa2V5KSA+PSAwID8gMSA6IC0xO1xuICAgICAgdmFyIGF4aXMgPSBbdG9wLCBib3R0b21dLmluZGV4T2Yoa2V5KSA+PSAwID8gJ3knIDogJ3gnO1xuICAgICAgb3ZlcmZsb3dPZmZzZXRzW2tleV0gKz0gb2Zmc2V0W2F4aXNdICogbXVsdGlwbHk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gb3ZlcmZsb3dPZmZzZXRzO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4cGFuZFRvSGFzaE1hcCh2YWx1ZSwga2V5cykge1xuICByZXR1cm4ga2V5cy5yZWR1Y2UoZnVuY3Rpb24gKGhhc2hNYXAsIGtleSkge1xuICAgIGhhc2hNYXBba2V5XSA9IHZhbHVlO1xuICAgIHJldHVybiBoYXNoTWFwO1xuICB9LCB7fSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9ybWF0KHN0cikge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICByZXR1cm4gW10uY29uY2F0KGFyZ3MpLnJlZHVjZShmdW5jdGlvbiAocCwgYykge1xuICAgIHJldHVybiBwLnJlcGxhY2UoLyVzLywgYyk7XG4gIH0sIHN0cik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0QWx0QXhpcyhheGlzKSB7XG4gIHJldHVybiBheGlzID09PSAneCcgPyAneScgOiAneCc7XG59IiwiaW1wb3J0IHsgYXV0byB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIHBsYWNlbWVudC5zcGxpdCgnLScpWzBdO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEZyZXNoU2lkZU9iamVjdCgpIHtcbiAgcmV0dXJuIHtcbiAgICB0b3A6IDAsXG4gICAgcmlnaHQ6IDAsXG4gICAgYm90dG9tOiAwLFxuICAgIGxlZnQ6IDBcbiAgfTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQocGxhY2VtZW50KSB7XG4gIHJldHVybiBbJ3RvcCcsICdib3R0b20nXS5pbmRleE9mKHBsYWNlbWVudCkgPj0gMCA/ICd4JyA6ICd5Jztcbn0iLCJ2YXIgaGFzaCA9IHtcbiAgbGVmdDogJ3JpZ2h0JyxcbiAgcmlnaHQ6ICdsZWZ0JyxcbiAgYm90dG9tOiAndG9wJyxcbiAgdG9wOiAnYm90dG9tJ1xufTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE9wcG9zaXRlUGxhY2VtZW50KHBsYWNlbWVudCkge1xuICByZXR1cm4gcGxhY2VtZW50LnJlcGxhY2UoL2xlZnR8cmlnaHR8Ym90dG9tfHRvcC9nLCBmdW5jdGlvbiAobWF0Y2hlZCkge1xuICAgIHJldHVybiBoYXNoW21hdGNoZWRdO1xuICB9KTtcbn0iLCJ2YXIgaGFzaCA9IHtcbiAgc3RhcnQ6ICdlbmQnLFxuICBlbmQ6ICdzdGFydCdcbn07XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRPcHBvc2l0ZVZhcmlhdGlvblBsYWNlbWVudChwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIHBsYWNlbWVudC5yZXBsYWNlKC9zdGFydHxlbmQvZywgZnVuY3Rpb24gKG1hdGNoZWQpIHtcbiAgICByZXR1cm4gaGFzaFttYXRjaGVkXTtcbiAgfSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0VmFyaWF0aW9uKHBsYWNlbWVudCkge1xuICByZXR1cm4gcGxhY2VtZW50LnNwbGl0KCctJylbMV07XG59IiwiZXhwb3J0IHZhciBtYXggPSBNYXRoLm1heDtcbmV4cG9ydCB2YXIgbWluID0gTWF0aC5taW47XG5leHBvcnQgdmFyIHJvdW5kID0gTWF0aC5yb3VuZDsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtZXJnZUJ5TmFtZShtb2RpZmllcnMpIHtcbiAgdmFyIG1lcmdlZCA9IG1vZGlmaWVycy5yZWR1Y2UoZnVuY3Rpb24gKG1lcmdlZCwgY3VycmVudCkge1xuICAgIHZhciBleGlzdGluZyA9IG1lcmdlZFtjdXJyZW50Lm5hbWVdO1xuICAgIG1lcmdlZFtjdXJyZW50Lm5hbWVdID0gZXhpc3RpbmcgPyBPYmplY3QuYXNzaWduKHt9LCBleGlzdGluZywgY3VycmVudCwge1xuICAgICAgb3B0aW9uczogT2JqZWN0LmFzc2lnbih7fSwgZXhpc3Rpbmcub3B0aW9ucywgY3VycmVudC5vcHRpb25zKSxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGV4aXN0aW5nLmRhdGEsIGN1cnJlbnQuZGF0YSlcbiAgICB9KSA6IGN1cnJlbnQ7XG4gICAgcmV0dXJuIG1lcmdlZDtcbiAgfSwge30pOyAvLyBJRTExIGRvZXMgbm90IHN1cHBvcnQgT2JqZWN0LnZhbHVlc1xuXG4gIHJldHVybiBPYmplY3Qua2V5cyhtZXJnZWQpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIG1lcmdlZFtrZXldO1xuICB9KTtcbn0iLCJpbXBvcnQgZ2V0RnJlc2hTaWRlT2JqZWN0IGZyb20gXCIuL2dldEZyZXNoU2lkZU9iamVjdC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWVyZ2VQYWRkaW5nT2JqZWN0KHBhZGRpbmdPYmplY3QpIHtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGdldEZyZXNoU2lkZU9iamVjdCgpLCBwYWRkaW5nT2JqZWN0KTtcbn0iLCJpbXBvcnQgeyBtb2RpZmllclBoYXNlcyB9IGZyb20gXCIuLi9lbnVtcy5qc1wiOyAvLyBzb3VyY2U6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQ5ODc1MjU1XG5cbmZ1bmN0aW9uIG9yZGVyKG1vZGlmaWVycykge1xuICB2YXIgbWFwID0gbmV3IE1hcCgpO1xuICB2YXIgdmlzaXRlZCA9IG5ldyBTZXQoKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBtb2RpZmllcnMuZm9yRWFjaChmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICBtYXAuc2V0KG1vZGlmaWVyLm5hbWUsIG1vZGlmaWVyKTtcbiAgfSk7IC8vIE9uIHZpc2l0aW5nIG9iamVjdCwgY2hlY2sgZm9yIGl0cyBkZXBlbmRlbmNpZXMgYW5kIHZpc2l0IHRoZW0gcmVjdXJzaXZlbHlcblxuICBmdW5jdGlvbiBzb3J0KG1vZGlmaWVyKSB7XG4gICAgdmlzaXRlZC5hZGQobW9kaWZpZXIubmFtZSk7XG4gICAgdmFyIHJlcXVpcmVzID0gW10uY29uY2F0KG1vZGlmaWVyLnJlcXVpcmVzIHx8IFtdLCBtb2RpZmllci5yZXF1aXJlc0lmRXhpc3RzIHx8IFtdKTtcbiAgICByZXF1aXJlcy5mb3JFYWNoKGZ1bmN0aW9uIChkZXApIHtcbiAgICAgIGlmICghdmlzaXRlZC5oYXMoZGVwKSkge1xuICAgICAgICB2YXIgZGVwTW9kaWZpZXIgPSBtYXAuZ2V0KGRlcCk7XG5cbiAgICAgICAgaWYgKGRlcE1vZGlmaWVyKSB7XG4gICAgICAgICAgc29ydChkZXBNb2RpZmllcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXN1bHQucHVzaChtb2RpZmllcik7XG4gIH1cblxuICBtb2RpZmllcnMuZm9yRWFjaChmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICBpZiAoIXZpc2l0ZWQuaGFzKG1vZGlmaWVyLm5hbWUpKSB7XG4gICAgICAvLyBjaGVjayBmb3IgdmlzaXRlZCBvYmplY3RcbiAgICAgIHNvcnQobW9kaWZpZXIpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9yZGVyTW9kaWZpZXJzKG1vZGlmaWVycykge1xuICAvLyBvcmRlciBiYXNlZCBvbiBkZXBlbmRlbmNpZXNcbiAgdmFyIG9yZGVyZWRNb2RpZmllcnMgPSBvcmRlcihtb2RpZmllcnMpOyAvLyBvcmRlciBiYXNlZCBvbiBwaGFzZVxuXG4gIHJldHVybiBtb2RpZmllclBoYXNlcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcGhhc2UpIHtcbiAgICByZXR1cm4gYWNjLmNvbmNhdChvcmRlcmVkTW9kaWZpZXJzLmZpbHRlcihmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICAgIHJldHVybiBtb2RpZmllci5waGFzZSA9PT0gcGhhc2U7XG4gICAgfSkpO1xuICB9LCBbXSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVjdFRvQ2xpZW50UmVjdChyZWN0KSB7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCByZWN0LCB7XG4gICAgbGVmdDogcmVjdC54LFxuICAgIHRvcDogcmVjdC55LFxuICAgIHJpZ2h0OiByZWN0LnggKyByZWN0LndpZHRoLFxuICAgIGJvdHRvbTogcmVjdC55ICsgcmVjdC5oZWlnaHRcbiAgfSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdW5pcXVlQnkoYXJyLCBmbikge1xuICB2YXIgaWRlbnRpZmllcnMgPSBuZXcgU2V0KCk7XG4gIHJldHVybiBhcnIuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBmbihpdGVtKTtcblxuICAgIGlmICghaWRlbnRpZmllcnMuaGFzKGlkZW50aWZpZXIpKSB7XG4gICAgICBpZGVudGlmaWVycy5hZGQoaWRlbnRpZmllcik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0pO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFVBU3RyaW5nKCkge1xuICB2YXIgdWFEYXRhID0gbmF2aWdhdG9yLnVzZXJBZ2VudERhdGE7XG5cbiAgaWYgKHVhRGF0YSAhPSBudWxsICYmIHVhRGF0YS5icmFuZHMgJiYgQXJyYXkuaXNBcnJheSh1YURhdGEuYnJhbmRzKSkge1xuICAgIHJldHVybiB1YURhdGEuYnJhbmRzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuIGl0ZW0uYnJhbmQgKyBcIi9cIiArIGl0ZW0udmVyc2lvbjtcbiAgICB9KS5qb2luKCcgJyk7XG4gIH1cblxuICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbn0iLCJpbXBvcnQgZm9ybWF0IGZyb20gXCIuL2Zvcm1hdC5qc1wiO1xuaW1wb3J0IHsgbW9kaWZpZXJQaGFzZXMgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbnZhciBJTlZBTElEX01PRElGSUVSX0VSUk9SID0gJ1BvcHBlcjogbW9kaWZpZXIgXCIlc1wiIHByb3ZpZGVkIGFuIGludmFsaWQgJXMgcHJvcGVydHksIGV4cGVjdGVkICVzIGJ1dCBnb3QgJXMnO1xudmFyIE1JU1NJTkdfREVQRU5ERU5DWV9FUlJPUiA9ICdQb3BwZXI6IG1vZGlmaWVyIFwiJXNcIiByZXF1aXJlcyBcIiVzXCIsIGJ1dCBcIiVzXCIgbW9kaWZpZXIgaXMgbm90IGF2YWlsYWJsZSc7XG52YXIgVkFMSURfUFJPUEVSVElFUyA9IFsnbmFtZScsICdlbmFibGVkJywgJ3BoYXNlJywgJ2ZuJywgJ2VmZmVjdCcsICdyZXF1aXJlcycsICdvcHRpb25zJ107XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2YWxpZGF0ZU1vZGlmaWVycyhtb2RpZmllcnMpIHtcbiAgbW9kaWZpZXJzLmZvckVhY2goZnVuY3Rpb24gKG1vZGlmaWVyKSB7XG4gICAgW10uY29uY2F0KE9iamVjdC5rZXlzKG1vZGlmaWVyKSwgVkFMSURfUFJPUEVSVElFUykgLy8gSUUxMS1jb21wYXRpYmxlIHJlcGxhY2VtZW50IGZvciBgbmV3IFNldChpdGVyYWJsZSlgXG4gICAgLmZpbHRlcihmdW5jdGlvbiAodmFsdWUsIGluZGV4LCBzZWxmKSB7XG4gICAgICByZXR1cm4gc2VsZi5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXg7XG4gICAgfSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlICduYW1lJzpcbiAgICAgICAgICBpZiAodHlwZW9mIG1vZGlmaWVyLm5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1hdChJTlZBTElEX01PRElGSUVSX0VSUk9SLCBTdHJpbmcobW9kaWZpZXIubmFtZSksICdcIm5hbWVcIicsICdcInN0cmluZ1wiJywgXCJcXFwiXCIgKyBTdHJpbmcobW9kaWZpZXIubmFtZSkgKyBcIlxcXCJcIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2VuYWJsZWQnOlxuICAgICAgICAgIGlmICh0eXBlb2YgbW9kaWZpZXIuZW5hYmxlZCAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1hdChJTlZBTElEX01PRElGSUVSX0VSUk9SLCBtb2RpZmllci5uYW1lLCAnXCJlbmFibGVkXCInLCAnXCJib29sZWFuXCInLCBcIlxcXCJcIiArIFN0cmluZyhtb2RpZmllci5lbmFibGVkKSArIFwiXFxcIlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAncGhhc2UnOlxuICAgICAgICAgIGlmIChtb2RpZmllclBoYXNlcy5pbmRleE9mKG1vZGlmaWVyLnBoYXNlKSA8IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybWF0KElOVkFMSURfTU9ESUZJRVJfRVJST1IsIG1vZGlmaWVyLm5hbWUsICdcInBoYXNlXCInLCBcImVpdGhlciBcIiArIG1vZGlmaWVyUGhhc2VzLmpvaW4oJywgJyksIFwiXFxcIlwiICsgU3RyaW5nKG1vZGlmaWVyLnBoYXNlKSArIFwiXFxcIlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnZm4nOlxuICAgICAgICAgIGlmICh0eXBlb2YgbW9kaWZpZXIuZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybWF0KElOVkFMSURfTU9ESUZJRVJfRVJST1IsIG1vZGlmaWVyLm5hbWUsICdcImZuXCInLCAnXCJmdW5jdGlvblwiJywgXCJcXFwiXCIgKyBTdHJpbmcobW9kaWZpZXIuZm4pICsgXCJcXFwiXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdlZmZlY3QnOlxuICAgICAgICAgIGlmIChtb2RpZmllci5lZmZlY3QgIT0gbnVsbCAmJiB0eXBlb2YgbW9kaWZpZXIuZWZmZWN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1hdChJTlZBTElEX01PRElGSUVSX0VSUk9SLCBtb2RpZmllci5uYW1lLCAnXCJlZmZlY3RcIicsICdcImZ1bmN0aW9uXCInLCBcIlxcXCJcIiArIFN0cmluZyhtb2RpZmllci5mbikgKyBcIlxcXCJcIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3JlcXVpcmVzJzpcbiAgICAgICAgICBpZiAobW9kaWZpZXIucmVxdWlyZXMgIT0gbnVsbCAmJiAhQXJyYXkuaXNBcnJheShtb2RpZmllci5yZXF1aXJlcykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybWF0KElOVkFMSURfTU9ESUZJRVJfRVJST1IsIG1vZGlmaWVyLm5hbWUsICdcInJlcXVpcmVzXCInLCAnXCJhcnJheVwiJywgXCJcXFwiXCIgKyBTdHJpbmcobW9kaWZpZXIucmVxdWlyZXMpICsgXCJcXFwiXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdyZXF1aXJlc0lmRXhpc3RzJzpcbiAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkobW9kaWZpZXIucmVxdWlyZXNJZkV4aXN0cykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybWF0KElOVkFMSURfTU9ESUZJRVJfRVJST1IsIG1vZGlmaWVyLm5hbWUsICdcInJlcXVpcmVzSWZFeGlzdHNcIicsICdcImFycmF5XCInLCBcIlxcXCJcIiArIFN0cmluZyhtb2RpZmllci5yZXF1aXJlc0lmRXhpc3RzKSArIFwiXFxcIlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnb3B0aW9ucyc6XG4gICAgICAgIGNhc2UgJ2RhdGEnOlxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIlBvcHBlckpTOiBhbiBpbnZhbGlkIHByb3BlcnR5IGhhcyBiZWVuIHByb3ZpZGVkIHRvIHRoZSBcXFwiXCIgKyBtb2RpZmllci5uYW1lICsgXCJcXFwiIG1vZGlmaWVyLCB2YWxpZCBwcm9wZXJ0aWVzIGFyZSBcIiArIFZBTElEX1BST1BFUlRJRVMubWFwKGZ1bmN0aW9uIChzKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcXFwiXCIgKyBzICsgXCJcXFwiXCI7XG4gICAgICAgICAgfSkuam9pbignLCAnKSArIFwiOyBidXQgXFxcIlwiICsga2V5ICsgXCJcXFwiIHdhcyBwcm92aWRlZC5cIik7XG4gICAgICB9XG5cbiAgICAgIG1vZGlmaWVyLnJlcXVpcmVzICYmIG1vZGlmaWVyLnJlcXVpcmVzLmZvckVhY2goZnVuY3Rpb24gKHJlcXVpcmVtZW50KSB7XG4gICAgICAgIGlmIChtb2RpZmllcnMuZmluZChmdW5jdGlvbiAobW9kKSB7XG4gICAgICAgICAgcmV0dXJuIG1vZC5uYW1lID09PSByZXF1aXJlbWVudDtcbiAgICAgICAgfSkgPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybWF0KE1JU1NJTkdfREVQRU5ERU5DWV9FUlJPUiwgU3RyaW5nKG1vZGlmaWVyLm5hbWUpLCByZXF1aXJlbWVudCwgcmVxdWlyZW1lbnQpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufSIsImltcG9ydCB7IG1heCBhcyBtYXRoTWF4LCBtaW4gYXMgbWF0aE1pbiB9IGZyb20gXCIuL21hdGguanNcIjtcbmV4cG9ydCBmdW5jdGlvbiB3aXRoaW4obWluLCB2YWx1ZSwgbWF4KSB7XG4gIHJldHVybiBtYXRoTWF4KG1pbiwgbWF0aE1pbih2YWx1ZSwgbWF4KSk7XG59XG5leHBvcnQgZnVuY3Rpb24gd2l0aGluTWF4Q2xhbXAobWluLCB2YWx1ZSwgbWF4KSB7XG4gIHZhciB2ID0gd2l0aGluKG1pbiwgdmFsdWUsIG1heCk7XG4gIHJldHVybiB2ID4gbWF4ID8gbWF4IDogdjtcbn0iLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIERlZmF1bHQgPSB7XG4gICAgYWx3YXlzT3BlbjogZmFsc2UsXG4gICAgYWN0aXZlQ2xhc3NlczogJ2JnLWdyYXktMTAwIGRhcms6YmctZ3JheS04MDAgdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtd2hpdGUnLFxuICAgIGluYWN0aXZlQ2xhc3NlczogJ3RleHQtZ3JheS01MDAgZGFyazp0ZXh0LWdyYXktNDAwJyxcbiAgICBvbk9wZW46IGZ1bmN0aW9uICgpIHsgfSxcbiAgICBvbkNsb3NlOiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgb25Ub2dnbGU6IGZ1bmN0aW9uICgpIHsgfSxcbn07XG52YXIgQWNjb3JkaW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFjY29yZGlvbihpdGVtcywgb3B0aW9ucykge1xuICAgICAgICBpZiAoaXRlbXMgPT09IHZvaWQgMCkgeyBpdGVtcyA9IFtdOyB9XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IERlZmF1bHQ7IH1cbiAgICAgICAgdGhpcy5faXRlbXMgPSBpdGVtcztcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBEZWZhdWx0KSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9XG4gICAgQWNjb3JkaW9uLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gc2hvdyBhY2NvcmRpb24gaXRlbSBiYXNlZCBvbiBjbGlja1xuICAgICAgICAgICAgdGhpcy5faXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm9wZW4oaXRlbS5pZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGl0ZW0udHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy50b2dnbGUoaXRlbS5pZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQWNjb3JkaW9uLnByb3RvdHlwZS5nZXRJdGVtID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIGl0ZW0uaWQgPT09IGlkOyB9KVswXTtcbiAgICB9O1xuICAgIEFjY29yZGlvbi5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgaXRlbSA9IHRoaXMuZ2V0SXRlbShpZCk7XG4gICAgICAgIC8vIGRvbid0IGhpZGUgb3RoZXIgYWNjb3JkaW9ucyBpZiBhbHdheXMgb3BlblxuICAgICAgICBpZiAoIXRoaXMuX29wdGlvbnMuYWx3YXlzT3Blbikge1xuICAgICAgICAgICAgdGhpcy5faXRlbXMubWFwKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgICAgICBpZiAoaSAhPT0gaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAoX2EgPSBpLnRyaWdnZXJFbC5jbGFzc0xpc3QpLnJlbW92ZS5hcHBseShfYSwgX3RoaXMuX29wdGlvbnMuYWN0aXZlQ2xhc3Nlcy5zcGxpdCgnICcpKTtcbiAgICAgICAgICAgICAgICAgICAgKF9iID0gaS50cmlnZ2VyRWwuY2xhc3NMaXN0KS5hZGQuYXBwbHkoX2IsIF90aGlzLl9vcHRpb25zLmluYWN0aXZlQ2xhc3Nlcy5zcGxpdCgnICcpKTtcbiAgICAgICAgICAgICAgICAgICAgaS50YXJnZXRFbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgaS50cmlnZ2VyRWwuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgICAgICAgICAgICAgIGkuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJvdGF0ZSBpY29uIGlmIHNldFxuICAgICAgICAgICAgICAgICAgICBpZiAoaS5pY29uRWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkuaWNvbkVsLmNsYXNzTGlzdC5yZW1vdmUoJ3JvdGF0ZS0xODAnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNob3cgYWN0aXZlIGl0ZW1cbiAgICAgICAgKF9hID0gaXRlbS50cmlnZ2VyRWwuY2xhc3NMaXN0KS5hZGQuYXBwbHkoX2EsIHRoaXMuX29wdGlvbnMuYWN0aXZlQ2xhc3Nlcy5zcGxpdCgnICcpKTtcbiAgICAgICAgKF9iID0gaXRlbS50cmlnZ2VyRWwuY2xhc3NMaXN0KS5yZW1vdmUuYXBwbHkoX2IsIHRoaXMuX29wdGlvbnMuaW5hY3RpdmVDbGFzc2VzLnNwbGl0KCcgJykpO1xuICAgICAgICBpdGVtLnRyaWdnZXJFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgICAgICBpdGVtLnRhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICBpdGVtLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIC8vIHJvdGF0ZSBpY29uIGlmIHNldFxuICAgICAgICBpZiAoaXRlbS5pY29uRWwpIHtcbiAgICAgICAgICAgIGl0ZW0uaWNvbkVsLmNsYXNzTGlzdC5hZGQoJ3JvdGF0ZS0xODAnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uT3Blbih0aGlzLCBpdGVtKTtcbiAgICB9O1xuICAgIEFjY29yZGlvbi5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHZhciBpdGVtID0gdGhpcy5nZXRJdGVtKGlkKTtcbiAgICAgICAgaWYgKGl0ZW0uYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKGlkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3BlbihpZCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vblRvZ2dsZSh0aGlzLCBpdGVtKTtcbiAgICB9O1xuICAgIEFjY29yZGlvbi5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLmdldEl0ZW0oaWQpO1xuICAgICAgICAoX2EgPSBpdGVtLnRyaWdnZXJFbC5jbGFzc0xpc3QpLnJlbW92ZS5hcHBseShfYSwgdGhpcy5fb3B0aW9ucy5hY3RpdmVDbGFzc2VzLnNwbGl0KCcgJykpO1xuICAgICAgICAoX2IgPSBpdGVtLnRyaWdnZXJFbC5jbGFzc0xpc3QpLmFkZC5hcHBseShfYiwgdGhpcy5fb3B0aW9ucy5pbmFjdGl2ZUNsYXNzZXMuc3BsaXQoJyAnKSk7XG4gICAgICAgIGl0ZW0udGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgIGl0ZW0udHJpZ2dlckVsLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgICAgICBpdGVtLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAvLyByb3RhdGUgaWNvbiBpZiBzZXRcbiAgICAgICAgaWYgKGl0ZW0uaWNvbkVsKSB7XG4gICAgICAgICAgICBpdGVtLmljb25FbC5jbGFzc0xpc3QucmVtb3ZlKCdyb3RhdGUtMTgwJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vbkNsb3NlKHRoaXMsIGl0ZW0pO1xuICAgIH07XG4gICAgcmV0dXJuIEFjY29yZGlvbjtcbn0oKSk7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB3aW5kb3cuQWNjb3JkaW9uID0gQWNjb3JkaW9uO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGluaXRBY2NvcmRpb25zKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWFjY29yZGlvbl0nKS5mb3JFYWNoKGZ1bmN0aW9uICgkYWNjb3JkaW9uRWwpIHtcbiAgICAgICAgdmFyIGFsd2F5c09wZW4gPSAkYWNjb3JkaW9uRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWFjY29yZGlvbicpO1xuICAgICAgICB2YXIgYWN0aXZlQ2xhc3NlcyA9ICRhY2NvcmRpb25FbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aXZlLWNsYXNzZXMnKTtcbiAgICAgICAgdmFyIGluYWN0aXZlQ2xhc3NlcyA9ICRhY2NvcmRpb25FbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5hY3RpdmUtY2xhc3NlcycpO1xuICAgICAgICB2YXIgaXRlbXMgPSBbXTtcbiAgICAgICAgJGFjY29yZGlvbkVsXG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYWNjb3JkaW9uLXRhcmdldF0nKVxuICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKCR0cmlnZ2VyRWwpIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0ge1xuICAgICAgICAgICAgICAgIGlkOiAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1hY2NvcmRpb24tdGFyZ2V0JyksXG4gICAgICAgICAgICAgICAgdHJpZ2dlckVsOiAkdHJpZ2dlckVsLFxuICAgICAgICAgICAgICAgIHRhcmdldEVsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWFjY29yZGlvbi10YXJnZXQnKSksXG4gICAgICAgICAgICAgICAgaWNvbkVsOiAkdHJpZ2dlckVsLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWFjY29yZGlvbi1pY29uXScpLFxuICAgICAgICAgICAgICAgIGFjdGl2ZTogJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKSA9PT0gJ3RydWUnXG4gICAgICAgICAgICAgICAgICAgID8gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICA6IGZhbHNlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgIH0pO1xuICAgICAgICBuZXcgQWNjb3JkaW9uKGl0ZW1zLCB7XG4gICAgICAgICAgICBhbHdheXNPcGVuOiBhbHdheXNPcGVuID09PSAnb3BlbicgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICBhY3RpdmVDbGFzc2VzOiBhY3RpdmVDbGFzc2VzXG4gICAgICAgICAgICAgICAgPyBhY3RpdmVDbGFzc2VzXG4gICAgICAgICAgICAgICAgOiBEZWZhdWx0LmFjdGl2ZUNsYXNzZXMsXG4gICAgICAgICAgICBpbmFjdGl2ZUNsYXNzZXM6IGluYWN0aXZlQ2xhc3Nlc1xuICAgICAgICAgICAgICAgID8gaW5hY3RpdmVDbGFzc2VzXG4gICAgICAgICAgICAgICAgOiBEZWZhdWx0LmluYWN0aXZlQ2xhc3NlcyxcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnQgZGVmYXVsdCBBY2NvcmRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnRlcmZhY2UuanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwZXMuanMubWFwIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBEZWZhdWx0ID0ge1xuICAgIGRlZmF1bHRQb3NpdGlvbjogMCxcbiAgICBpbmRpY2F0b3JzOiB7XG4gICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgYWN0aXZlQ2xhc3NlczogJ2JnLXdoaXRlIGRhcms6YmctZ3JheS04MDAnLFxuICAgICAgICBpbmFjdGl2ZUNsYXNzZXM6ICdiZy13aGl0ZS81MCBkYXJrOmJnLWdyYXktODAwLzUwIGhvdmVyOmJnLXdoaXRlIGRhcms6aG92ZXI6YmctZ3JheS04MDAnLFxuICAgIH0sXG4gICAgaW50ZXJ2YWw6IDMwMDAsXG4gICAgb25OZXh0OiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgb25QcmV2OiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgb25DaGFuZ2U6IGZ1bmN0aW9uICgpIHsgfSxcbn07XG52YXIgQ2Fyb3VzZWwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2Fyb3VzZWwoaXRlbXMsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKGl0ZW1zID09PSB2b2lkIDApIHsgaXRlbXMgPSBbXTsgfVxuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSBEZWZhdWx0OyB9XG4gICAgICAgIHRoaXMuX2l0ZW1zID0gaXRlbXM7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBfX2Fzc2lnbihfX2Fzc2lnbihfX2Fzc2lnbih7fSwgRGVmYXVsdCksIG9wdGlvbnMpLCB7IGluZGljYXRvcnM6IF9fYXNzaWduKF9fYXNzaWduKHt9LCBEZWZhdWx0LmluZGljYXRvcnMpLCBvcHRpb25zLmluZGljYXRvcnMpIH0pO1xuICAgICAgICB0aGlzLl9hY3RpdmVJdGVtID0gdGhpcy5nZXRJdGVtKHRoaXMuX29wdGlvbnMuZGVmYXVsdFBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5faW5kaWNhdG9ycyA9IHRoaXMuX29wdGlvbnMuaW5kaWNhdG9ycy5pdGVtcztcbiAgICAgICAgdGhpcy5faW50ZXJ2YWxEdXJhdGlvbiA9IHRoaXMuX29wdGlvbnMuaW50ZXJ2YWw7XG4gICAgICAgIHRoaXMuX2ludGVydmFsSW5zdGFuY2UgPSBudWxsO1xuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGluaXRpYWxpemUgY2Fyb3VzZWwgYW5kIGl0ZW1zIGJhc2VkIG9uIGFjdGl2ZSBvbmVcbiAgICAgKi9cbiAgICBDYXJvdXNlbC5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2l0ZW1zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgaXRlbS5lbC5jbGFzc0xpc3QuYWRkKCdhYnNvbHV0ZScsICdpbnNldC0wJywgJ3RyYW5zaXRpb24tdHJhbnNmb3JtJywgJ3RyYW5zZm9ybScpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gaWYgbm8gYWN0aXZlIGl0ZW0gaXMgc2V0IHRoZW4gZmlyc3QgcG9zaXRpb24gaXMgZGVmYXVsdFxuICAgICAgICBpZiAodGhpcy5fZ2V0QWN0aXZlSXRlbSgpKSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlVG8odGhpcy5fZ2V0QWN0aXZlSXRlbSgpLnBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVUbygwKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pbmRpY2F0b3JzLm1hcChmdW5jdGlvbiAoaW5kaWNhdG9yLCBwb3NpdGlvbikge1xuICAgICAgICAgICAgaW5kaWNhdG9yLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnNsaWRlVG8ocG9zaXRpb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ2Fyb3VzZWwucHJvdG90eXBlLmdldEl0ZW0gPSBmdW5jdGlvbiAocG9zaXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zW3Bvc2l0aW9uXTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNsaWRlIHRvIHRoZSBlbGVtZW50IGJhc2VkIG9uIGlkXG4gICAgICogQHBhcmFtIHsqfSBwb3NpdGlvblxuICAgICAqL1xuICAgIENhcm91c2VsLnByb3RvdHlwZS5zbGlkZVRvID0gZnVuY3Rpb24gKHBvc2l0aW9uKSB7XG4gICAgICAgIHZhciBuZXh0SXRlbSA9IHRoaXMuX2l0ZW1zW3Bvc2l0aW9uXTtcbiAgICAgICAgdmFyIHJvdGF0aW9uSXRlbXMgPSB7XG4gICAgICAgICAgICBsZWZ0OiBuZXh0SXRlbS5wb3NpdGlvbiA9PT0gMFxuICAgICAgICAgICAgICAgID8gdGhpcy5faXRlbXNbdGhpcy5faXRlbXMubGVuZ3RoIC0gMV1cbiAgICAgICAgICAgICAgICA6IHRoaXMuX2l0ZW1zW25leHRJdGVtLnBvc2l0aW9uIC0gMV0sXG4gICAgICAgICAgICBtaWRkbGU6IG5leHRJdGVtLFxuICAgICAgICAgICAgcmlnaHQ6IG5leHRJdGVtLnBvc2l0aW9uID09PSB0aGlzLl9pdGVtcy5sZW5ndGggLSAxXG4gICAgICAgICAgICAgICAgPyB0aGlzLl9pdGVtc1swXVxuICAgICAgICAgICAgICAgIDogdGhpcy5faXRlbXNbbmV4dEl0ZW0ucG9zaXRpb24gKyAxXSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fcm90YXRlKHJvdGF0aW9uSXRlbXMpO1xuICAgICAgICB0aGlzLl9zZXRBY3RpdmVJdGVtKG5leHRJdGVtKTtcbiAgICAgICAgaWYgKHRoaXMuX2ludGVydmFsSW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgICAgIHRoaXMuY3ljbGUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uQ2hhbmdlKHRoaXMpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQmFzZWQgb24gdGhlIGN1cnJlbnRseSBhY3RpdmUgaXRlbSBpdCB3aWxsIGdvIHRvIHRoZSBuZXh0IHBvc2l0aW9uXG4gICAgICovXG4gICAgQ2Fyb3VzZWwucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhY3RpdmVJdGVtID0gdGhpcy5fZ2V0QWN0aXZlSXRlbSgpO1xuICAgICAgICB2YXIgbmV4dEl0ZW0gPSBudWxsO1xuICAgICAgICAvLyBjaGVjayBpZiBsYXN0IGl0ZW1cbiAgICAgICAgaWYgKGFjdGl2ZUl0ZW0ucG9zaXRpb24gPT09IHRoaXMuX2l0ZW1zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIG5leHRJdGVtID0gdGhpcy5faXRlbXNbMF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBuZXh0SXRlbSA9IHRoaXMuX2l0ZW1zW2FjdGl2ZUl0ZW0ucG9zaXRpb24gKyAxXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNsaWRlVG8obmV4dEl0ZW0ucG9zaXRpb24pO1xuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uTmV4dCh0aGlzKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEJhc2VkIG9uIHRoZSBjdXJyZW50bHkgYWN0aXZlIGl0ZW0gaXQgd2lsbCBnbyB0byB0aGUgcHJldmlvdXMgcG9zaXRpb25cbiAgICAgKi9cbiAgICBDYXJvdXNlbC5wcm90b3R5cGUucHJldiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFjdGl2ZUl0ZW0gPSB0aGlzLl9nZXRBY3RpdmVJdGVtKCk7XG4gICAgICAgIHZhciBwcmV2SXRlbSA9IG51bGw7XG4gICAgICAgIC8vIGNoZWNrIGlmIGZpcnN0IGl0ZW1cbiAgICAgICAgaWYgKGFjdGl2ZUl0ZW0ucG9zaXRpb24gPT09IDApIHtcbiAgICAgICAgICAgIHByZXZJdGVtID0gdGhpcy5faXRlbXNbdGhpcy5faXRlbXMubGVuZ3RoIC0gMV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwcmV2SXRlbSA9IHRoaXMuX2l0ZW1zW2FjdGl2ZUl0ZW0ucG9zaXRpb24gLSAxXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNsaWRlVG8ocHJldkl0ZW0ucG9zaXRpb24pO1xuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uUHJldih0aGlzKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIGFwcGxpZXMgdGhlIHRyYW5zZm9ybSBjbGFzc2VzIGJhc2VkIG9uIHRoZSBsZWZ0LCBtaWRkbGUsIGFuZCByaWdodCByb3RhdGlvbiBjYXJvdXNlbCBpdGVtc1xuICAgICAqIEBwYXJhbSB7Kn0gcm90YXRpb25JdGVtc1xuICAgICAqL1xuICAgIENhcm91c2VsLnByb3RvdHlwZS5fcm90YXRlID0gZnVuY3Rpb24gKHJvdGF0aW9uSXRlbXMpIHtcbiAgICAgICAgLy8gcmVzZXRcbiAgICAgICAgdGhpcy5faXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICBpdGVtLmVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gbGVmdCBpdGVtIChwcmV2aW91c2x5IGFjdGl2ZSlcbiAgICAgICAgcm90YXRpb25JdGVtcy5sZWZ0LmVsLmNsYXNzTGlzdC5yZW1vdmUoJy10cmFuc2xhdGUteC1mdWxsJywgJ3RyYW5zbGF0ZS14LWZ1bGwnLCAndHJhbnNsYXRlLXgtMCcsICdoaWRkZW4nLCAnei0yMCcpO1xuICAgICAgICByb3RhdGlvbkl0ZW1zLmxlZnQuZWwuY2xhc3NMaXN0LmFkZCgnLXRyYW5zbGF0ZS14LWZ1bGwnLCAnei0xMCcpO1xuICAgICAgICAvLyBjdXJyZW50bHkgYWN0aXZlIGl0ZW1cbiAgICAgICAgcm90YXRpb25JdGVtcy5taWRkbGUuZWwuY2xhc3NMaXN0LnJlbW92ZSgnLXRyYW5zbGF0ZS14LWZ1bGwnLCAndHJhbnNsYXRlLXgtZnVsbCcsICd0cmFuc2xhdGUteC0wJywgJ2hpZGRlbicsICd6LTEwJyk7XG4gICAgICAgIHJvdGF0aW9uSXRlbXMubWlkZGxlLmVsLmNsYXNzTGlzdC5hZGQoJ3RyYW5zbGF0ZS14LTAnLCAnei0yMCcpO1xuICAgICAgICAvLyByaWdodCBpdGVtICh1cGNvbWluZyBhY3RpdmUpXG4gICAgICAgIHJvdGF0aW9uSXRlbXMucmlnaHQuZWwuY2xhc3NMaXN0LnJlbW92ZSgnLXRyYW5zbGF0ZS14LWZ1bGwnLCAndHJhbnNsYXRlLXgtZnVsbCcsICd0cmFuc2xhdGUteC0wJywgJ2hpZGRlbicsICd6LTIwJyk7XG4gICAgICAgIHJvdGF0aW9uSXRlbXMucmlnaHQuZWwuY2xhc3NMaXN0LmFkZCgndHJhbnNsYXRlLXgtZnVsbCcsICd6LTEwJyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZXQgYW4gaW50ZXJ2YWwgdG8gY3ljbGUgdGhyb3VnaCB0aGUgY2Fyb3VzZWwgaXRlbXNcbiAgICAgKi9cbiAgICBDYXJvdXNlbC5wcm90b3R5cGUuY3ljbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpcy5faW50ZXJ2YWxJbnN0YW5jZSA9IHdpbmRvdy5zZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMubmV4dCgpO1xuICAgICAgICAgICAgfSwgdGhpcy5faW50ZXJ2YWxEdXJhdGlvbik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgY3ljbGluZyBpbnRlcnZhbFxuICAgICAqL1xuICAgIENhcm91c2VsLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbEluc3RhbmNlKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycmVudGx5IGFjdGl2ZSBpdGVtXG4gICAgICovXG4gICAgQ2Fyb3VzZWwucHJvdG90eXBlLl9nZXRBY3RpdmVJdGVtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aXZlSXRlbTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY3VycmVudGx5IGFjdGl2ZSBpdGVtIGFuZCBkYXRhIGF0dHJpYnV0ZVxuICAgICAqIEBwYXJhbSB7Kn0gcG9zaXRpb25cbiAgICAgKi9cbiAgICBDYXJvdXNlbC5wcm90b3R5cGUuX3NldEFjdGl2ZUl0ZW0gPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl9hY3RpdmVJdGVtID0gaXRlbTtcbiAgICAgICAgdmFyIHBvc2l0aW9uID0gaXRlbS5wb3NpdGlvbjtcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBpbmRpY2F0b3JzIGlmIGF2YWlsYWJsZVxuICAgICAgICBpZiAodGhpcy5faW5kaWNhdG9ycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuX2luZGljYXRvcnMubWFwKGZ1bmN0aW9uIChpbmRpY2F0b3IpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgICAgIGluZGljYXRvci5lbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtY3VycmVudCcsICdmYWxzZScpO1xuICAgICAgICAgICAgICAgIChfYSA9IGluZGljYXRvci5lbC5jbGFzc0xpc3QpLnJlbW92ZS5hcHBseShfYSwgX3RoaXMuX29wdGlvbnMuaW5kaWNhdG9ycy5hY3RpdmVDbGFzc2VzLnNwbGl0KCcgJykpO1xuICAgICAgICAgICAgICAgIChfYiA9IGluZGljYXRvci5lbC5jbGFzc0xpc3QpLmFkZC5hcHBseShfYiwgX3RoaXMuX29wdGlvbnMuaW5kaWNhdG9ycy5pbmFjdGl2ZUNsYXNzZXMuc3BsaXQoJyAnKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIChfYSA9IHRoaXMuX2luZGljYXRvcnNbcG9zaXRpb25dLmVsLmNsYXNzTGlzdCkuYWRkLmFwcGx5KF9hLCB0aGlzLl9vcHRpb25zLmluZGljYXRvcnMuYWN0aXZlQ2xhc3Nlcy5zcGxpdCgnICcpKTtcbiAgICAgICAgICAgIChfYiA9IHRoaXMuX2luZGljYXRvcnNbcG9zaXRpb25dLmVsLmNsYXNzTGlzdCkucmVtb3ZlLmFwcGx5KF9iLCB0aGlzLl9vcHRpb25zLmluZGljYXRvcnMuaW5hY3RpdmVDbGFzc2VzLnNwbGl0KCcgJykpO1xuICAgICAgICAgICAgdGhpcy5faW5kaWNhdG9yc1twb3NpdGlvbl0uZWwuc2V0QXR0cmlidXRlKCdhcmlhLWN1cnJlbnQnLCAndHJ1ZScpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQ2Fyb3VzZWw7XG59KCkpO1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgd2luZG93LkNhcm91c2VsID0gQ2Fyb3VzZWw7XG59XG5leHBvcnQgZnVuY3Rpb24gaW5pdENhcm91c2VscygpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jYXJvdXNlbF0nKS5mb3JFYWNoKGZ1bmN0aW9uICgkY2Fyb3VzZWxFbCkge1xuICAgICAgICB2YXIgaW50ZXJ2YWwgPSAkY2Fyb3VzZWxFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2Fyb3VzZWwtaW50ZXJ2YWwnKTtcbiAgICAgICAgdmFyIHNsaWRlID0gJGNhcm91c2VsRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWNhcm91c2VsJykgPT09ICdzbGlkZSdcbiAgICAgICAgICAgID8gdHJ1ZVxuICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgdmFyIGl0ZW1zID0gW107XG4gICAgICAgIHZhciBkZWZhdWx0UG9zaXRpb24gPSAwO1xuICAgICAgICBpZiAoJGNhcm91c2VsRWwucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY2Fyb3VzZWwtaXRlbV0nKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIEFycmF5LmZyb20oJGNhcm91c2VsRWwucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY2Fyb3VzZWwtaXRlbV0nKSkubWFwKGZ1bmN0aW9uICgkY2Fyb3VzZWxJdGVtRWwsIHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgaXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBwb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgZWw6ICRjYXJvdXNlbEl0ZW1FbCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoJGNhcm91c2VsSXRlbUVsLmdldEF0dHJpYnV0ZSgnZGF0YS1jYXJvdXNlbC1pdGVtJykgPT09XG4gICAgICAgICAgICAgICAgICAgICdhY3RpdmUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRpY2F0b3JzID0gW107XG4gICAgICAgIGlmICgkY2Fyb3VzZWxFbC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jYXJvdXNlbC1zbGlkZS10b10nKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIEFycmF5LmZyb20oJGNhcm91c2VsRWwucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY2Fyb3VzZWwtc2xpZGUtdG9dJykpLm1hcChmdW5jdGlvbiAoJGluZGljYXRvckVsKSB7XG4gICAgICAgICAgICAgICAgaW5kaWNhdG9ycy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IHBhcnNlSW50KCRpbmRpY2F0b3JFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2Fyb3VzZWwtc2xpZGUtdG8nKSksXG4gICAgICAgICAgICAgICAgICAgIGVsOiAkaW5kaWNhdG9yRWwsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2Fyb3VzZWwgPSBuZXcgQ2Fyb3VzZWwoaXRlbXMsIHtcbiAgICAgICAgICAgIGRlZmF1bHRQb3NpdGlvbjogZGVmYXVsdFBvc2l0aW9uLFxuICAgICAgICAgICAgaW5kaWNhdG9yczoge1xuICAgICAgICAgICAgICAgIGl0ZW1zOiBpbmRpY2F0b3JzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGludGVydmFsOiBpbnRlcnZhbCA/IGludGVydmFsIDogRGVmYXVsdC5pbnRlcnZhbCxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChzbGlkZSkge1xuICAgICAgICAgICAgY2Fyb3VzZWwuY3ljbGUoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjaGVjayBmb3IgY29udHJvbHNcbiAgICAgICAgdmFyIGNhcm91c2VsTmV4dEVsID0gJGNhcm91c2VsRWwucXVlcnlTZWxlY3RvcignW2RhdGEtY2Fyb3VzZWwtbmV4dF0nKTtcbiAgICAgICAgdmFyIGNhcm91c2VsUHJldkVsID0gJGNhcm91c2VsRWwucXVlcnlTZWxlY3RvcignW2RhdGEtY2Fyb3VzZWwtcHJldl0nKTtcbiAgICAgICAgaWYgKGNhcm91c2VsTmV4dEVsKSB7XG4gICAgICAgICAgICBjYXJvdXNlbE5leHRFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjYXJvdXNlbC5uZXh0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2Fyb3VzZWxQcmV2RWwpIHtcbiAgICAgICAgICAgIGNhcm91c2VsUHJldkVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNhcm91c2VsLnByZXYoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnQgZGVmYXVsdCBDYXJvdXNlbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWludGVyZmFjZS5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD10eXBlcy5qcy5tYXAiLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIERlZmF1bHQgPSB7XG4gICAgb25Db2xsYXBzZTogZnVuY3Rpb24gKCkgeyB9LFxuICAgIG9uRXhwYW5kOiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgb25Ub2dnbGU6IGZ1bmN0aW9uICgpIHsgfSxcbn07XG52YXIgQ29sbGFwc2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29sbGFwc2UodGFyZ2V0RWwsIHRyaWdnZXJFbCwgb3B0aW9ucykge1xuICAgICAgICBpZiAodGFyZ2V0RWwgPT09IHZvaWQgMCkgeyB0YXJnZXRFbCA9IG51bGw7IH1cbiAgICAgICAgaWYgKHRyaWdnZXJFbCA9PT0gdm9pZCAwKSB7IHRyaWdnZXJFbCA9IG51bGw7IH1cbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0gRGVmYXVsdDsgfVxuICAgICAgICB0aGlzLl90YXJnZXRFbCA9IHRhcmdldEVsO1xuICAgICAgICB0aGlzLl90cmlnZ2VyRWwgPSB0cmlnZ2VyRWw7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgRGVmYXVsdCksIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl92aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9XG4gICAgQ29sbGFwc2UucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5fdHJpZ2dlckVsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fdHJpZ2dlckVsLmhhc0F0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmlzaWJsZSA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKSA9PT0gJ3RydWUnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gZml4IHVudGlsIHYyIG5vdCB0byBicmVhayBwcmV2aW91cyBzaW5nbGUgY29sbGFwc2VzIHdoaWNoIGJlY2FtZSBkaXNtaXNzXG4gICAgICAgICAgICAgICAgdGhpcy5fdmlzaWJsZSA9ICF0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGRlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnRvZ2dsZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbGxhcHNlLnByb3RvdHlwZS5jb2xsYXBzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgIGlmICh0aGlzLl90cmlnZ2VyRWwpIHtcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl92aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25Db2xsYXBzZSh0aGlzKTtcbiAgICB9O1xuICAgIENvbGxhcHNlLnByb3RvdHlwZS5leHBhbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICBpZiAodGhpcy5fdHJpZ2dlckVsKSB7XG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyRWwuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl92aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vbkV4cGFuZCh0aGlzKTtcbiAgICB9O1xuICAgIENvbGxhcHNlLnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl92aXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmV4cGFuZCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25Ub2dnbGUodGhpcyk7XG4gICAgfTtcbiAgICByZXR1cm4gQ29sbGFwc2U7XG59KCkpO1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgd2luZG93LkNvbGxhcHNlID0gQ29sbGFwc2U7XG59XG5leHBvcnQgZnVuY3Rpb24gaW5pdENvbGxhcHNlcygpIHtcbiAgICBkb2N1bWVudFxuICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY29sbGFwc2UtdG9nZ2xlXScpXG4gICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uICgkdHJpZ2dlckVsKSB7XG4gICAgICAgIHZhciB0YXJnZXRJZCA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbGxhcHNlLXRvZ2dsZScpO1xuICAgICAgICB2YXIgJHRhcmdldEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0SWQpO1xuICAgICAgICAvLyBjaGVjayBpZiB0aGUgdGFyZ2V0IGVsZW1lbnQgZXhpc3RzXG4gICAgICAgIGlmICgkdGFyZ2V0RWwpIHtcbiAgICAgICAgICAgIG5ldyBDb2xsYXBzZSgkdGFyZ2V0RWwsICR0cmlnZ2VyRWwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlRoZSB0YXJnZXQgZWxlbWVudCB3aXRoIGlkIFxcXCJcIi5jb25jYXQodGFyZ2V0SWQsIFwiXFxcIiBkb2VzIG5vdCBleGlzdC4gUGxlYXNlIGNoZWNrIHRoZSBkYXRhLWNvbGxhcHNlLXRvZ2dsZSBhdHRyaWJ1dGUuXCIpKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0IGRlZmF1bHQgQ29sbGFwc2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnRlcmZhY2UuanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwZXMuanMubWFwIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBEZWZhdWx0ID0ge1xuICAgIHRyaWdnZXJUeXBlOiAnaG92ZXInLFxuICAgIG9uU2hvdzogZnVuY3Rpb24gKCkgeyB9LFxuICAgIG9uSGlkZTogZnVuY3Rpb24gKCkgeyB9LFxuICAgIG9uVG9nZ2xlOiBmdW5jdGlvbiAoKSB7IH0sXG59O1xudmFyIERpYWwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGlhbChwYXJlbnRFbCwgdHJpZ2dlckVsLCB0YXJnZXRFbCwgb3B0aW9ucykge1xuICAgICAgICBpZiAocGFyZW50RWwgPT09IHZvaWQgMCkgeyBwYXJlbnRFbCA9IG51bGw7IH1cbiAgICAgICAgaWYgKHRyaWdnZXJFbCA9PT0gdm9pZCAwKSB7IHRyaWdnZXJFbCA9IG51bGw7IH1cbiAgICAgICAgaWYgKHRhcmdldEVsID09PSB2b2lkIDApIHsgdGFyZ2V0RWwgPSBudWxsOyB9XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IERlZmF1bHQ7IH1cbiAgICAgICAgdGhpcy5fcGFyZW50RWwgPSBwYXJlbnRFbDtcbiAgICAgICAgdGhpcy5fdHJpZ2dlckVsID0gdHJpZ2dlckVsO1xuICAgICAgICB0aGlzLl90YXJnZXRFbCA9IHRhcmdldEVsO1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gX19hc3NpZ24oX19hc3NpZ24oe30sIERlZmF1bHQpLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgfVxuICAgIERpYWwucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5fdHJpZ2dlckVsKSB7XG4gICAgICAgICAgICB2YXIgdHJpZ2dlckV2ZW50VHlwZXMgPSB0aGlzLl9nZXRUcmlnZ2VyRXZlbnRUeXBlcyh0aGlzLl9vcHRpb25zLnRyaWdnZXJUeXBlKTtcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudFR5cGVzLnNob3dFdmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fdHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2hvdygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIF90aGlzLl90YXJnZXRFbC5hZGRFdmVudExpc3RlbmVyKGV2LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNob3coKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50VHlwZXMuaGlkZUV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgICAgIF90aGlzLl9wYXJlbnRFbC5hZGRFdmVudExpc3RlbmVyKGV2LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghX3RoaXMuX3BhcmVudEVsLm1hdGNoZXMoJzpob3ZlcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEaWFsLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgaWYgKHRoaXMuX3RyaWdnZXJFbCkge1xuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckVsLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vbkhpZGUodGhpcyk7XG4gICAgfTtcbiAgICBEaWFsLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgaWYgKHRoaXMuX3RyaWdnZXJFbCkge1xuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckVsLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IHRydWU7XG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25TaG93KHRoaXMpO1xuICAgIH07XG4gICAgRGlhbC5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fdmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRGlhbC5wcm90b3R5cGUuaXNIaWRkZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5fdmlzaWJsZTtcbiAgICB9O1xuICAgIERpYWwucHJvdG90eXBlLmlzVmlzaWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XG4gICAgfTtcbiAgICBEaWFsLnByb3RvdHlwZS5fZ2V0VHJpZ2dlckV2ZW50VHlwZXMgPSBmdW5jdGlvbiAodHJpZ2dlclR5cGUpIHtcbiAgICAgICAgc3dpdGNoICh0cmlnZ2VyVHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnaG92ZXInOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dFdmVudHM6IFsnbW91c2VlbnRlcicsICdmb2N1cyddLFxuICAgICAgICAgICAgICAgICAgICBoaWRlRXZlbnRzOiBbJ21vdXNlbGVhdmUnLCAnYmx1ciddLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlICdjbGljayc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0V2ZW50czogWydjbGljaycsICdmb2N1cyddLFxuICAgICAgICAgICAgICAgICAgICBoaWRlRXZlbnRzOiBbJ2ZvY3Vzb3V0JywgJ2JsdXInXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAnbm9uZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0V2ZW50czogW10sXG4gICAgICAgICAgICAgICAgICAgIGhpZGVFdmVudHM6IFtdLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dFdmVudHM6IFsnbW91c2VlbnRlcicsICdmb2N1cyddLFxuICAgICAgICAgICAgICAgICAgICBoaWRlRXZlbnRzOiBbJ21vdXNlbGVhdmUnLCAnYmx1ciddLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBEaWFsO1xufSgpKTtcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHdpbmRvdy5EaWFsID0gRGlhbDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpbml0RGlhbHMoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZGlhbC1pbml0XScpLmZvckVhY2goZnVuY3Rpb24gKCRwYXJlbnRFbCkge1xuICAgICAgICB2YXIgJHRyaWdnZXJFbCA9ICRwYXJlbnRFbC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1kaWFsLXRvZ2dsZV0nKTtcbiAgICAgICAgaWYgKCR0cmlnZ2VyRWwpIHtcbiAgICAgICAgICAgIHZhciBkaWFsSWQgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kaWFsLXRvZ2dsZScpO1xuICAgICAgICAgICAgdmFyICRkaWFsRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkaWFsSWQpO1xuICAgICAgICAgICAgaWYgKCRkaWFsRWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHJpZ2dlclR5cGUgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kaWFsLXRyaWdnZXInKTtcbiAgICAgICAgICAgICAgICBuZXcgRGlhbCgkcGFyZW50RWwsICR0cmlnZ2VyRWwsICRkaWFsRWwsIHtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlclR5cGU6IHRyaWdnZXJUeXBlXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHRyaWdnZXJUeXBlXG4gICAgICAgICAgICAgICAgICAgICAgICA6IERlZmF1bHQudHJpZ2dlclR5cGUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRGlhbCB3aXRoIGlkIFwiLmNvbmNhdChkaWFsSWQsIFwiIGRvZXMgbm90IGV4aXN0LiBBcmUgeW91IHN1cmUgdGhhdCB0aGUgZGF0YS1kaWFsLXRvZ2dsZSBhdHRyaWJ1dGUgcG9pbnRzIHRvIHRoZSBjb3JyZWN0IG1vZGFsIGlkP1wiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRGlhbCB3aXRoIGlkIFwiLmNvbmNhdCgkcGFyZW50RWwuaWQsIFwiIGRvZXMgbm90IGhhdmUgYSB0cmlnZ2VyIGVsZW1lbnQuIEFyZSB5b3Ugc3VyZSB0aGF0IHRoZSBkYXRhLWRpYWwtdG9nZ2xlIGF0dHJpYnV0ZSBleGlzdHM/XCIpKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0IGRlZmF1bHQgRGlhbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWludGVyZmFjZS5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD10eXBlcy5qcy5tYXAiLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIERlZmF1bHQgPSB7XG4gICAgdHJhbnNpdGlvbjogJ3RyYW5zaXRpb24tb3BhY2l0eScsXG4gICAgZHVyYXRpb246IDMwMCxcbiAgICB0aW1pbmc6ICdlYXNlLW91dCcsXG4gICAgb25IaWRlOiBmdW5jdGlvbiAoKSB7IH0sXG59O1xudmFyIERpc21pc3MgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGlzbWlzcyh0YXJnZXRFbCwgdHJpZ2dlckVsLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICh0YXJnZXRFbCA9PT0gdm9pZCAwKSB7IHRhcmdldEVsID0gbnVsbDsgfVxuICAgICAgICBpZiAodHJpZ2dlckVsID09PSB2b2lkIDApIHsgdHJpZ2dlckVsID0gbnVsbDsgfVxuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSBEZWZhdWx0OyB9XG4gICAgICAgIHRoaXMuX3RhcmdldEVsID0gdGFyZ2V0RWw7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJFbCA9IHRyaWdnZXJFbDtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBEZWZhdWx0KSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9XG4gICAgRGlzbWlzcy5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLl90cmlnZ2VyRWwpIHtcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRGlzbWlzcy5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9vcHRpb25zLnRyYW5zaXRpb24sIFwiZHVyYXRpb24tXCIuY29uY2F0KHRoaXMuX29wdGlvbnMuZHVyYXRpb24pLCB0aGlzLl9vcHRpb25zLnRpbWluZywgJ29wYWNpdHktMCcpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgfSwgdGhpcy5fb3B0aW9ucy5kdXJhdGlvbik7XG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25IaWRlKHRoaXMsIHRoaXMuX3RhcmdldEVsKTtcbiAgICB9O1xuICAgIHJldHVybiBEaXNtaXNzO1xufSgpKTtcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHdpbmRvdy5EaXNtaXNzID0gRGlzbWlzcztcbn1cbmV4cG9ydCBmdW5jdGlvbiBpbml0RGlzbWlzc2VzKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRpc21pc3MtdGFyZ2V0XScpLmZvckVhY2goZnVuY3Rpb24gKCR0cmlnZ2VyRWwpIHtcbiAgICAgICAgdmFyIHRhcmdldElkID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGlzbWlzcy10YXJnZXQnKTtcbiAgICAgICAgdmFyICRkaXNtaXNzRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldElkKTtcbiAgICAgICAgaWYgKCRkaXNtaXNzRWwpIHtcbiAgICAgICAgICAgIG5ldyBEaXNtaXNzKCRkaXNtaXNzRWwsICR0cmlnZ2VyRWwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlRoZSBkaXNtaXNzIGVsZW1lbnQgd2l0aCBpZCBcXFwiXCIuY29uY2F0KHRhcmdldElkLCBcIlxcXCIgZG9lcyBub3QgZXhpc3QuIFBsZWFzZSBjaGVjayB0aGUgZGF0YS1kaXNtaXNzLXRhcmdldCBhdHRyaWJ1dGUuXCIpKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0IGRlZmF1bHQgRGlzbWlzcztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWludGVyZmFjZS5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD10eXBlcy5qcy5tYXAiLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIERlZmF1bHQgPSB7XG4gICAgcGxhY2VtZW50OiAnbGVmdCcsXG4gICAgYm9keVNjcm9sbGluZzogZmFsc2UsXG4gICAgYmFja2Ryb3A6IHRydWUsXG4gICAgZWRnZTogZmFsc2UsXG4gICAgZWRnZU9mZnNldDogJ2JvdHRvbS1bNjBweF0nLFxuICAgIGJhY2tkcm9wQ2xhc3NlczogJ2JnLWdyYXktOTAwIGJnLW9wYWNpdHktNTAgZGFyazpiZy1vcGFjaXR5LTgwIGZpeGVkIGluc2V0LTAgei0zMCcsXG4gICAgb25TaG93OiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgb25IaWRlOiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgb25Ub2dnbGU6IGZ1bmN0aW9uICgpIHsgfSxcbn07XG52YXIgRHJhd2VyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERyYXdlcih0YXJnZXRFbCwgb3B0aW9ucykge1xuICAgICAgICBpZiAodGFyZ2V0RWwgPT09IHZvaWQgMCkgeyB0YXJnZXRFbCA9IG51bGw7IH1cbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0gRGVmYXVsdDsgfVxuICAgICAgICB0aGlzLl90YXJnZXRFbCA9IHRhcmdldEVsO1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gX19hc3NpZ24oX19hc3NpZ24oe30sIERlZmF1bHQpLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgfVxuICAgIERyYXdlci5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIC8vIHNldCBpbml0aWFsIGFjY2Vzc2liaWxpdHkgYXR0cmlidXRlc1xuICAgICAgICBpZiAodGhpcy5fdGFyZ2V0RWwpIHtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldEVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCgndHJhbnNpdGlvbi10cmFuc2Zvcm0nKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzZXQgYmFzZSBwbGFjZW1lbnQgY2xhc3Nlc1xuICAgICAgICB0aGlzLl9nZXRQbGFjZW1lbnRDbGFzc2VzKHRoaXMuX29wdGlvbnMucGxhY2VtZW50KS5iYXNlLm1hcChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgX3RoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoYyk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBhZGQga2V5Ym9hcmQgZXZlbnQgbGlzdGVuZXIgdG8gZG9jdW1lbnRcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiAnRXNjYXBlJyBrZXkgaXMgcHJlc3NlZFxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5pc1Zpc2libGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgRHJhd2VyIGlzIHZpc2libGVcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuaGlkZSgpOyAvLyBoaWRlIHRoZSBEcmF3ZXJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRHJhd2VyLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAvLyBiYXNlZCBvbiB0aGUgZWRnZSBvcHRpb24gc2hvdyBwbGFjZW1lbnQgY2xhc3Nlc1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5lZGdlKSB7XG4gICAgICAgICAgICB0aGlzLl9nZXRQbGFjZW1lbnRDbGFzc2VzKHRoaXMuX29wdGlvbnMucGxhY2VtZW50ICsgJy1lZGdlJykuYWN0aXZlLm1hcChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIF90aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKGMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9nZXRQbGFjZW1lbnRDbGFzc2VzKHRoaXMuX29wdGlvbnMucGxhY2VtZW50ICsgJy1lZGdlJykuaW5hY3RpdmUubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoYyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2dldFBsYWNlbWVudENsYXNzZXModGhpcy5fb3B0aW9ucy5wbGFjZW1lbnQpLmFjdGl2ZS5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZShjKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fZ2V0UGxhY2VtZW50Q2xhc3Nlcyh0aGlzLl9vcHRpb25zLnBsYWNlbWVudCkuaW5hY3RpdmUubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoYyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzZXQgYWNjZXNzaWJpbGl0eSBhdHRyaWJ1dGVzXG4gICAgICAgIHRoaXMuX3RhcmdldEVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtbW9kYWwnKTtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwucmVtb3ZlQXR0cmlidXRlKCdyb2xlJyk7XG4gICAgICAgIC8vIGVuYWJsZSBib2R5IHNjcm9sbFxuICAgICAgICBpZiAoIXRoaXMuX29wdGlvbnMuYm9keVNjcm9sbGluZykge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyZmxvdy1oaWRkZW4nKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBkZXN0cm95IGJhY2tkcm9wXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmJhY2tkcm9wKSB7XG4gICAgICAgICAgICB0aGlzLl9kZXN0cm95QmFja2Ryb3BFbCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vbkhpZGUodGhpcyk7XG4gICAgfTtcbiAgICBEcmF3ZXIucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmVkZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2dldFBsYWNlbWVudENsYXNzZXModGhpcy5fb3B0aW9ucy5wbGFjZW1lbnQgKyAnLWVkZ2UnKS5hY3RpdmUubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoYyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX2dldFBsYWNlbWVudENsYXNzZXModGhpcy5fb3B0aW9ucy5wbGFjZW1lbnQgKyAnLWVkZ2UnKS5pbmFjdGl2ZS5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZShjKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZ2V0UGxhY2VtZW50Q2xhc3Nlcyh0aGlzLl9vcHRpb25zLnBsYWNlbWVudCkuYWN0aXZlLm1hcChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIF90aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuYWRkKGMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9nZXRQbGFjZW1lbnRDbGFzc2VzKHRoaXMuX29wdGlvbnMucGxhY2VtZW50KS5pbmFjdGl2ZS5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZShjKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNldCBhY2Nlc3NpYmlsaXR5IGF0dHJpYnV0ZXNcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuc2V0QXR0cmlidXRlKCdhcmlhLW1vZGFsJywgJ3RydWUnKTtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2RpYWxvZycpO1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJyk7XG4gICAgICAgIC8vIGRpc2FibGUgYm9keSBzY3JvbGxcbiAgICAgICAgaWYgKCF0aGlzLl9vcHRpb25zLmJvZHlTY3JvbGxpbmcpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnb3ZlcmZsb3ctaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2hvdyBiYWNrZHJvcFxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5iYWNrZHJvcCkge1xuICAgICAgICAgICAgdGhpcy5fY3JlYXRlQmFja2Ryb3AoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl92aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vblNob3codGhpcyk7XG4gICAgfTtcbiAgICBEcmF3ZXIucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERyYXdlci5wcm90b3R5cGUuX2NyZWF0ZUJhY2tkcm9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5fdmlzaWJsZSkge1xuICAgICAgICAgICAgdmFyIGJhY2tkcm9wRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGJhY2tkcm9wRWwuc2V0QXR0cmlidXRlKCdkcmF3ZXItYmFja2Ryb3AnLCAnJyk7XG4gICAgICAgICAgICAoX2EgPSBiYWNrZHJvcEVsLmNsYXNzTGlzdCkuYWRkLmFwcGx5KF9hLCB0aGlzLl9vcHRpb25zLmJhY2tkcm9wQ2xhc3Nlcy5zcGxpdCgnICcpKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmQoYmFja2Ryb3BFbCk7XG4gICAgICAgICAgICBiYWNrZHJvcEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEcmF3ZXIucHJvdG90eXBlLl9kZXN0cm95QmFja2Ryb3BFbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3Zpc2libGUpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkcmF3ZXItYmFja2Ryb3BdJykucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERyYXdlci5wcm90b3R5cGUuX2dldFBsYWNlbWVudENsYXNzZXMgPSBmdW5jdGlvbiAocGxhY2VtZW50KSB7XG4gICAgICAgIHN3aXRjaCAocGxhY2VtZW50KSB7XG4gICAgICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGJhc2U6IFsndG9wLTAnLCAnbGVmdC0wJywgJ3JpZ2h0LTAnXSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlOiBbJ3RyYW5zZm9ybS1ub25lJ10sXG4gICAgICAgICAgICAgICAgICAgIGluYWN0aXZlOiBbJy10cmFuc2xhdGUteS1mdWxsJ10sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBiYXNlOiBbJ3JpZ2h0LTAnLCAndG9wLTAnXSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlOiBbJ3RyYW5zZm9ybS1ub25lJ10sXG4gICAgICAgICAgICAgICAgICAgIGluYWN0aXZlOiBbJ3RyYW5zbGF0ZS14LWZ1bGwnXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBiYXNlOiBbJ2JvdHRvbS0wJywgJ2xlZnQtMCcsICdyaWdodC0wJ10sXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZTogWyd0cmFuc2Zvcm0tbm9uZSddLFxuICAgICAgICAgICAgICAgICAgICBpbmFjdGl2ZTogWyd0cmFuc2xhdGUteS1mdWxsJ10sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGJhc2U6IFsnbGVmdC0wJywgJ3RvcC0wJ10sXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZTogWyd0cmFuc2Zvcm0tbm9uZSddLFxuICAgICAgICAgICAgICAgICAgICBpbmFjdGl2ZTogWyctdHJhbnNsYXRlLXgtZnVsbCddLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlICdib3R0b20tZWRnZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgYmFzZTogWydsZWZ0LTAnLCAndG9wLTAnXSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlOiBbJ3RyYW5zZm9ybS1ub25lJ10sXG4gICAgICAgICAgICAgICAgICAgIGluYWN0aXZlOiBbJ3RyYW5zbGF0ZS15LWZ1bGwnLCB0aGlzLl9vcHRpb25zLmVkZ2VPZmZzZXRdLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGJhc2U6IFsnbGVmdC0wJywgJ3RvcC0wJ10sXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZTogWyd0cmFuc2Zvcm0tbm9uZSddLFxuICAgICAgICAgICAgICAgICAgICBpbmFjdGl2ZTogWyctdHJhbnNsYXRlLXgtZnVsbCddLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERyYXdlci5wcm90b3R5cGUuaXNIaWRkZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5fdmlzaWJsZTtcbiAgICB9O1xuICAgIERyYXdlci5wcm90b3R5cGUuaXNWaXNpYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcbiAgICB9O1xuICAgIHJldHVybiBEcmF3ZXI7XG59KCkpO1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgd2luZG93LkRyYXdlciA9IERyYXdlcjtcbn1cbnZhciBnZXREcmF3ZXJJbnN0YW5jZSA9IGZ1bmN0aW9uIChpZCwgaW5zdGFuY2VzKSB7XG4gICAgaWYgKGluc3RhbmNlcy5zb21lKGZ1bmN0aW9uIChkcmF3ZXJJbnN0YW5jZSkgeyByZXR1cm4gZHJhd2VySW5zdGFuY2UuaWQgPT09IGlkOyB9KSkge1xuICAgICAgICByZXR1cm4gaW5zdGFuY2VzLmZpbmQoZnVuY3Rpb24gKGRyYXdlckluc3RhbmNlKSB7IHJldHVybiBkcmF3ZXJJbnN0YW5jZS5pZCA9PT0gaWQ7IH0pO1xuICAgIH1cbn07XG5leHBvcnQgZnVuY3Rpb24gaW5pdERyYXdlcnMoKSB7XG4gICAgdmFyIGRyYXdlckluc3RhbmNlcyA9IFtdO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRyYXdlci10YXJnZXRdJykuZm9yRWFjaChmdW5jdGlvbiAoJHRyaWdnZXJFbCkge1xuICAgICAgICAvLyBtYW5kYXRvcnlcbiAgICAgICAgdmFyIGRyYXdlcklkID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZHJhd2VyLXRhcmdldCcpO1xuICAgICAgICB2YXIgJGRyYXdlckVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZHJhd2VySWQpO1xuICAgICAgICBpZiAoJGRyYXdlckVsKSB7XG4gICAgICAgICAgICAvLyBvcHRpb25hbFxuICAgICAgICAgICAgdmFyIHBsYWNlbWVudCA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRyYXdlci1wbGFjZW1lbnQnKTtcbiAgICAgICAgICAgIHZhciBib2R5U2Nyb2xsaW5nID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZHJhd2VyLWJvZHktc2Nyb2xsaW5nJyk7XG4gICAgICAgICAgICB2YXIgYmFja2Ryb3AgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kcmF3ZXItYmFja2Ryb3AnKTtcbiAgICAgICAgICAgIHZhciBlZGdlID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZHJhd2VyLWVkZ2UnKTtcbiAgICAgICAgICAgIHZhciBlZGdlT2Zmc2V0ID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZHJhd2VyLWVkZ2Utb2Zmc2V0Jyk7XG4gICAgICAgICAgICBpZiAoIWdldERyYXdlckluc3RhbmNlKGRyYXdlcklkLCBkcmF3ZXJJbnN0YW5jZXMpKSB7XG4gICAgICAgICAgICAgICAgZHJhd2VySW5zdGFuY2VzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogZHJhd2VySWQsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdDogbmV3IERyYXdlcigkZHJhd2VyRWwsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50ID8gcGxhY2VtZW50IDogRGVmYXVsdC5wbGFjZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5U2Nyb2xsaW5nOiBib2R5U2Nyb2xsaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBib2R5U2Nyb2xsaW5nID09PSAndHJ1ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IERlZmF1bHQuYm9keVNjcm9sbGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tkcm9wOiBiYWNrZHJvcFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYmFja2Ryb3AgPT09ICd0cnVlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogRGVmYXVsdC5iYWNrZHJvcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkZ2U6IGVkZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGVkZ2UgPT09ICd0cnVlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogRGVmYXVsdC5lZGdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZWRnZU9mZnNldDogZWRnZU9mZnNldFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gZWRnZU9mZnNldFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogRGVmYXVsdC5lZGdlT2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEcmF3ZXIgd2l0aCBpZCBcIi5jb25jYXQoZHJhd2VySWQsIFwiIG5vdCBmb3VuZC4gQXJlIHlvdSBzdXJlIHRoYXQgdGhlIGRhdGEtZHJhd2VyLXRhcmdldCBhdHRyaWJ1dGUgcG9pbnRzIHRvIHRoZSBjb3JyZWN0IGRyYXdlciBpZD9cIikpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZHJhd2VyLXRvZ2dsZV0nKS5mb3JFYWNoKGZ1bmN0aW9uICgkdHJpZ2dlckVsKSB7XG4gICAgICAgIHZhciBkcmF3ZXJJZCA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRyYXdlci10b2dnbGUnKTtcbiAgICAgICAgdmFyICRkcmF3ZXJFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRyYXdlcklkKTtcbiAgICAgICAgaWYgKCRkcmF3ZXJFbCkge1xuICAgICAgICAgICAgdmFyIGRyYXdlcl8xID0gZ2V0RHJhd2VySW5zdGFuY2UoZHJhd2VySWQsIGRyYXdlckluc3RhbmNlcyk7XG4gICAgICAgICAgICBpZiAoZHJhd2VyXzEpIHtcbiAgICAgICAgICAgICAgICAkdHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBkcmF3ZXJfMS5vYmplY3QudG9nZ2xlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRHJhd2VyIHdpdGggaWQgXCIuY29uY2F0KGRyYXdlcklkLCBcIiBoYXMgbm90IGJlZW4gaW5pdGlhbGl6ZWQuIFBsZWFzZSBpbml0aWFsaXplIGl0IHVzaW5nIHRoZSBkYXRhLWRyYXdlci10YXJnZXQgYXR0cmlidXRlLlwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRHJhd2VyIHdpdGggaWQgXCIuY29uY2F0KGRyYXdlcklkLCBcIiBub3QgZm91bmQuIEFyZSB5b3Ugc3VyZSB0aGF0IHRoZSBkYXRhLWRyYXdlci10YXJnZXQgYXR0cmlidXRlIHBvaW50cyB0byB0aGUgY29ycmVjdCBkcmF3ZXIgaWQ/XCIpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGRvY3VtZW50XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kcmF3ZXItZGlzbWlzc10sIFtkYXRhLWRyYXdlci1oaWRlXScpXG4gICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uICgkdHJpZ2dlckVsKSB7XG4gICAgICAgIHZhciBkcmF3ZXJJZCA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRyYXdlci1kaXNtaXNzJylcbiAgICAgICAgICAgID8gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZHJhd2VyLWRpc21pc3MnKVxuICAgICAgICAgICAgOiAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kcmF3ZXItaGlkZScpO1xuICAgICAgICB2YXIgJGRyYXdlckVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZHJhd2VySWQpO1xuICAgICAgICBpZiAoJGRyYXdlckVsKSB7XG4gICAgICAgICAgICB2YXIgZHJhd2VyXzIgPSBnZXREcmF3ZXJJbnN0YW5jZShkcmF3ZXJJZCwgZHJhd2VySW5zdGFuY2VzKTtcbiAgICAgICAgICAgIGlmIChkcmF3ZXJfMikge1xuICAgICAgICAgICAgICAgICR0cmlnZ2VyRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRyYXdlcl8yLm9iamVjdC5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRHJhd2VyIHdpdGggaWQgXCIuY29uY2F0KGRyYXdlcklkLCBcIiBoYXMgbm90IGJlZW4gaW5pdGlhbGl6ZWQuIFBsZWFzZSBpbml0aWFsaXplIGl0IHVzaW5nIHRoZSBkYXRhLWRyYXdlci10YXJnZXQgYXR0cmlidXRlLlwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRHJhd2VyIHdpdGggaWQgXCIuY29uY2F0KGRyYXdlcklkLCBcIiBub3QgZm91bmQuIEFyZSB5b3Ugc3VyZSB0aGF0IHRoZSBkYXRhLWRyYXdlci10YXJnZXQgYXR0cmlidXRlIHBvaW50cyB0byB0aGUgY29ycmVjdCBkcmF3ZXIgaWRcIikpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZHJhd2VyLXNob3ddJykuZm9yRWFjaChmdW5jdGlvbiAoJHRyaWdnZXJFbCkge1xuICAgICAgICB2YXIgZHJhd2VySWQgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kcmF3ZXItc2hvdycpO1xuICAgICAgICB2YXIgJGRyYXdlckVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZHJhd2VySWQpO1xuICAgICAgICBpZiAoJGRyYXdlckVsKSB7XG4gICAgICAgICAgICB2YXIgZHJhd2VyXzMgPSBnZXREcmF3ZXJJbnN0YW5jZShkcmF3ZXJJZCwgZHJhd2VySW5zdGFuY2VzKTtcbiAgICAgICAgICAgIGlmIChkcmF3ZXJfMykge1xuICAgICAgICAgICAgICAgICR0cmlnZ2VyRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRyYXdlcl8zLm9iamVjdC5zaG93KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRHJhd2VyIHdpdGggaWQgXCIuY29uY2F0KGRyYXdlcklkLCBcIiBoYXMgbm90IGJlZW4gaW5pdGlhbGl6ZWQuIFBsZWFzZSBpbml0aWFsaXplIGl0IHVzaW5nIHRoZSBkYXRhLWRyYXdlci10YXJnZXQgYXR0cmlidXRlLlwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRHJhd2VyIHdpdGggaWQgXCIuY29uY2F0KGRyYXdlcklkLCBcIiBub3QgZm91bmQuIEFyZSB5b3Ugc3VyZSB0aGF0IHRoZSBkYXRhLWRyYXdlci10YXJnZXQgYXR0cmlidXRlIHBvaW50cyB0byB0aGUgY29ycmVjdCBkcmF3ZXIgaWQ/XCIpKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0IGRlZmF1bHQgRHJhd2VyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW50ZXJmYWNlLmpzLm1hcCIsImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXR5cGVzLmpzLm1hcCIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tLCBwYWNrKSB7XG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcbn07XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb24gKi9cbmltcG9ydCB7IGNyZWF0ZVBvcHBlciB9IGZyb20gJ0Bwb3BwZXJqcy9jb3JlJztcbnZhciBEZWZhdWx0ID0ge1xuICAgIHBsYWNlbWVudDogJ2JvdHRvbScsXG4gICAgdHJpZ2dlclR5cGU6ICdjbGljaycsXG4gICAgb2Zmc2V0U2tpZGRpbmc6IDAsXG4gICAgb2Zmc2V0RGlzdGFuY2U6IDEwLFxuICAgIGRlbGF5OiAzMDAsXG4gICAgb25TaG93OiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgb25IaWRlOiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgb25Ub2dnbGU6IGZ1bmN0aW9uICgpIHsgfSxcbn07XG52YXIgRHJvcGRvd24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRHJvcGRvd24odGFyZ2V0RWxlbWVudCwgdHJpZ2dlckVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRhcmdldEVsZW1lbnQgPT09IHZvaWQgMCkgeyB0YXJnZXRFbGVtZW50ID0gbnVsbDsgfVxuICAgICAgICBpZiAodHJpZ2dlckVsZW1lbnQgPT09IHZvaWQgMCkgeyB0cmlnZ2VyRWxlbWVudCA9IG51bGw7IH1cbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0gRGVmYXVsdDsgfVxuICAgICAgICB0aGlzLl90YXJnZXRFbCA9IHRhcmdldEVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJFbCA9IHRyaWdnZXJFbGVtZW50O1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gX19hc3NpZ24oX19hc3NpZ24oe30sIERlZmF1bHQpLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fcG9wcGVySW5zdGFuY2UgPSB0aGlzLl9jcmVhdGVQb3BwZXJJbnN0YW5jZSgpO1xuICAgICAgICB0aGlzLl92aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9XG4gICAgRHJvcGRvd24ucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fdHJpZ2dlckVsKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERyb3Bkb3duLnByb3RvdHlwZS5fc2V0dXBFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHRyaWdnZXJFdmVudHMgPSB0aGlzLl9nZXRUcmlnZ2VyRXZlbnRzKCk7XG4gICAgICAgIC8vIGNsaWNrIGV2ZW50IGhhbmRsaW5nIGZvciB0cmlnZ2VyIGVsZW1lbnRcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudHJpZ2dlclR5cGUgPT09ICdjbGljaycpIHtcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudHMuc2hvd0V2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgICAgIF90aGlzLl90cmlnZ2VyRWwuYWRkRXZlbnRMaXN0ZW5lcihldiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy50b2dnbGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGhvdmVyIGV2ZW50IGhhbmRsaW5nIGZvciB0cmlnZ2VyIGVsZW1lbnRcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudHJpZ2dlclR5cGUgPT09ICdob3ZlcicpIHtcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudHMuc2hvd0V2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgICAgIF90aGlzLl90cmlnZ2VyRWwuYWRkRXZlbnRMaXN0ZW5lcihldiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXYgPT09ICdjbGljaycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnRvZ2dsZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgX3RoaXMuX29wdGlvbnMuZGVsYXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3RhcmdldEVsLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2hvdygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnRzLmhpZGVFdmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fdHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIV90aGlzLl90YXJnZXRFbC5tYXRjaGVzKCc6aG92ZXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgX3RoaXMuX29wdGlvbnMuZGVsYXkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIF90aGlzLl90YXJnZXRFbC5hZGRFdmVudExpc3RlbmVyKGV2LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5fdHJpZ2dlckVsLm1hdGNoZXMoJzpob3ZlcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBfdGhpcy5fb3B0aW9ucy5kZWxheSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRHJvcGRvd24ucHJvdG90eXBlLl9jcmVhdGVQb3BwZXJJbnN0YW5jZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVBvcHBlcih0aGlzLl90cmlnZ2VyRWwsIHRoaXMuX3RhcmdldEVsLCB7XG4gICAgICAgICAgICBwbGFjZW1lbnQ6IHRoaXMuX29wdGlvbnMucGxhY2VtZW50LFxuICAgICAgICAgICAgbW9kaWZpZXJzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnb2Zmc2V0JyxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0OiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5vZmZzZXRTa2lkZGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLm9mZnNldERpc3RhbmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBEcm9wZG93bi5wcm90b3R5cGUuX3NldHVwQ2xpY2tPdXRzaWRlTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2NsaWNrT3V0c2lkZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIF90aGlzLl9oYW5kbGVDbGlja091dHNpZGUoZXYsIF90aGlzLl90YXJnZXRFbCk7XG4gICAgICAgIH07XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9jbGlja091dHNpZGVFdmVudExpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuICAgIERyb3Bkb3duLnByb3RvdHlwZS5fcmVtb3ZlQ2xpY2tPdXRzaWRlTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9jbGlja091dHNpZGVFdmVudExpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuICAgIERyb3Bkb3duLnByb3RvdHlwZS5faGFuZGxlQ2xpY2tPdXRzaWRlID0gZnVuY3Rpb24gKGV2LCB0YXJnZXRFbCkge1xuICAgICAgICB2YXIgY2xpY2tlZEVsID0gZXYudGFyZ2V0O1xuICAgICAgICBpZiAoY2xpY2tlZEVsICE9PSB0YXJnZXRFbCAmJlxuICAgICAgICAgICAgIXRhcmdldEVsLmNvbnRhaW5zKGNsaWNrZWRFbCkgJiZcbiAgICAgICAgICAgICF0aGlzLl90cmlnZ2VyRWwuY29udGFpbnMoY2xpY2tlZEVsKSAmJlxuICAgICAgICAgICAgdGhpcy5pc1Zpc2libGUoKSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERyb3Bkb3duLnByb3RvdHlwZS5fZ2V0VHJpZ2dlckV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLl9vcHRpb25zLnRyaWdnZXJUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdob3Zlcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0V2ZW50czogWydtb3VzZWVudGVyJywgJ2NsaWNrJ10sXG4gICAgICAgICAgICAgICAgICAgIGhpZGVFdmVudHM6IFsnbW91c2VsZWF2ZSddLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlICdjbGljayc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0V2ZW50czogWydjbGljayddLFxuICAgICAgICAgICAgICAgICAgICBoaWRlRXZlbnRzOiBbXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAnbm9uZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0V2ZW50czogW10sXG4gICAgICAgICAgICAgICAgICAgIGhpZGVFdmVudHM6IFtdLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dFdmVudHM6IFsnY2xpY2snXSxcbiAgICAgICAgICAgICAgICAgICAgaGlkZUV2ZW50czogW10sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRHJvcGRvd24ucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vblRvZ2dsZSh0aGlzKTtcbiAgICB9O1xuICAgIERyb3Bkb3duLnByb3RvdHlwZS5pc1Zpc2libGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xuICAgIH07XG4gICAgRHJvcGRvd24ucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuYWRkKCdibG9jaycpO1xuICAgICAgICAvLyBFbmFibGUgdGhlIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICB0aGlzLl9wb3BwZXJJbnN0YW5jZS5zZXRPcHRpb25zKGZ1bmN0aW9uIChvcHRpb25zKSB7IHJldHVybiAoX19hc3NpZ24oX19hc3NpZ24oe30sIG9wdGlvbnMpLCB7IG1vZGlmaWVyczogX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KFtdLCBvcHRpb25zLm1vZGlmaWVycywgdHJ1ZSksIFtcbiAgICAgICAgICAgICAgICB7IG5hbWU6ICdldmVudExpc3RlbmVycycsIGVuYWJsZWQ6IHRydWUgfSxcbiAgICAgICAgICAgIF0sIGZhbHNlKSB9KSk7IH0pO1xuICAgICAgICB0aGlzLl9zZXR1cENsaWNrT3V0c2lkZUxpc3RlbmVyKCk7XG4gICAgICAgIC8vIFVwZGF0ZSBpdHMgcG9zaXRpb25cbiAgICAgICAgdGhpcy5fcG9wcGVySW5zdGFuY2UudXBkYXRlKCk7XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSB0cnVlO1xuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uU2hvdyh0aGlzKTtcbiAgICB9O1xuICAgIERyb3Bkb3duLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKCdibG9jaycpO1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgLy8gRGlzYWJsZSB0aGUgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgIHRoaXMuX3BvcHBlckluc3RhbmNlLnNldE9wdGlvbnMoZnVuY3Rpb24gKG9wdGlvbnMpIHsgcmV0dXJuIChfX2Fzc2lnbihfX2Fzc2lnbih7fSwgb3B0aW9ucyksIHsgbW9kaWZpZXJzOiBfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoW10sIG9wdGlvbnMubW9kaWZpZXJzLCB0cnVlKSwgW1xuICAgICAgICAgICAgICAgIHsgbmFtZTogJ2V2ZW50TGlzdGVuZXJzJywgZW5hYmxlZDogZmFsc2UgfSxcbiAgICAgICAgICAgIF0sIGZhbHNlKSB9KSk7IH0pO1xuICAgICAgICB0aGlzLl92aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3JlbW92ZUNsaWNrT3V0c2lkZUxpc3RlbmVyKCk7XG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25IaWRlKHRoaXMpO1xuICAgIH07XG4gICAgcmV0dXJuIERyb3Bkb3duO1xufSgpKTtcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHdpbmRvdy5Ecm9wZG93biA9IERyb3Bkb3duO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGluaXREcm9wZG93bnMoKSB7XG4gICAgZG9jdW1lbnRcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRyb3Bkb3duLXRvZ2dsZV0nKVxuICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAoJHRyaWdnZXJFbCkge1xuICAgICAgICB2YXIgZHJvcGRvd25JZCA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRyb3Bkb3duLXRvZ2dsZScpO1xuICAgICAgICB2YXIgJGRyb3Bkb3duRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkcm9wZG93bklkKTtcbiAgICAgICAgaWYgKCRkcm9wZG93bkVsKSB7XG4gICAgICAgICAgICB2YXIgcGxhY2VtZW50ID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZHJvcGRvd24tcGxhY2VtZW50Jyk7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0U2tpZGRpbmcgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kcm9wZG93bi1vZmZzZXQtc2tpZGRpbmcnKTtcbiAgICAgICAgICAgIHZhciBvZmZzZXREaXN0YW5jZSA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRyb3Bkb3duLW9mZnNldC1kaXN0YW5jZScpO1xuICAgICAgICAgICAgdmFyIHRyaWdnZXJUeXBlID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZHJvcGRvd24tdHJpZ2dlcicpO1xuICAgICAgICAgICAgdmFyIGRlbGF5ID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZHJvcGRvd24tZGVsYXknKTtcbiAgICAgICAgICAgIG5ldyBEcm9wZG93bigkZHJvcGRvd25FbCwgJHRyaWdnZXJFbCwge1xuICAgICAgICAgICAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50ID8gcGxhY2VtZW50IDogRGVmYXVsdC5wbGFjZW1lbnQsXG4gICAgICAgICAgICAgICAgdHJpZ2dlclR5cGU6IHRyaWdnZXJUeXBlXG4gICAgICAgICAgICAgICAgICAgID8gdHJpZ2dlclR5cGVcbiAgICAgICAgICAgICAgICAgICAgOiBEZWZhdWx0LnRyaWdnZXJUeXBlLFxuICAgICAgICAgICAgICAgIG9mZnNldFNraWRkaW5nOiBvZmZzZXRTa2lkZGluZ1xuICAgICAgICAgICAgICAgICAgICA/IHBhcnNlSW50KG9mZnNldFNraWRkaW5nKVxuICAgICAgICAgICAgICAgICAgICA6IERlZmF1bHQub2Zmc2V0U2tpZGRpbmcsXG4gICAgICAgICAgICAgICAgb2Zmc2V0RGlzdGFuY2U6IG9mZnNldERpc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgID8gcGFyc2VJbnQob2Zmc2V0RGlzdGFuY2UpXG4gICAgICAgICAgICAgICAgICAgIDogRGVmYXVsdC5vZmZzZXREaXN0YW5jZSxcbiAgICAgICAgICAgICAgICBkZWxheTogZGVsYXkgPyBwYXJzZUludChkZWxheSkgOiBEZWZhdWx0LmRlbGF5LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVGhlIGRyb3Bkb3duIGVsZW1lbnQgd2l0aCBpZCBcXFwiXCIuY29uY2F0KGRyb3Bkb3duSWQsIFwiXFxcIiBkb2VzIG5vdCBleGlzdC4gUGxlYXNlIGNoZWNrIHRoZSBkYXRhLWRyb3Bkb3duLXRvZ2dsZSBhdHRyaWJ1dGUuXCIpKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0IGRlZmF1bHQgRHJvcGRvd247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnRlcmZhY2UuanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwZXMuanMubWFwIiwiaW1wb3J0IHsgaW5pdEFjY29yZGlvbnMgfSBmcm9tICcuL2FjY29yZGlvbic7XG5pbXBvcnQgeyBpbml0Q2Fyb3VzZWxzIH0gZnJvbSAnLi9jYXJvdXNlbCc7XG5pbXBvcnQgeyBpbml0Q29sbGFwc2VzIH0gZnJvbSAnLi9jb2xsYXBzZSc7XG5pbXBvcnQgeyBpbml0RGlhbHMgfSBmcm9tICcuL2RpYWwnO1xuaW1wb3J0IHsgaW5pdERpc21pc3NlcyB9IGZyb20gJy4vZGlzbWlzcyc7XG5pbXBvcnQgeyBpbml0RHJhd2VycyB9IGZyb20gJy4vZHJhd2VyJztcbmltcG9ydCB7IGluaXREcm9wZG93bnMgfSBmcm9tICcuL2Ryb3Bkb3duJztcbmltcG9ydCB7IGluaXRNb2RhbHMgfSBmcm9tICcuL21vZGFsJztcbmltcG9ydCB7IGluaXRQb3BvdmVycyB9IGZyb20gJy4vcG9wb3Zlcic7XG5pbXBvcnQgeyBpbml0VGFicyB9IGZyb20gJy4vdGFicyc7XG5pbXBvcnQgeyBpbml0VG9vbHRpcHMgfSBmcm9tICcuL3Rvb2x0aXAnO1xuZXhwb3J0IGZ1bmN0aW9uIGluaXRGbG93Yml0ZSgpIHtcbiAgICBpbml0QWNjb3JkaW9ucygpO1xuICAgIGluaXRDb2xsYXBzZXMoKTtcbiAgICBpbml0Q2Fyb3VzZWxzKCk7XG4gICAgaW5pdERpc21pc3NlcygpO1xuICAgIGluaXREcm9wZG93bnMoKTtcbiAgICBpbml0TW9kYWxzKCk7XG4gICAgaW5pdERyYXdlcnMoKTtcbiAgICBpbml0VGFicygpO1xuICAgIGluaXRUb29sdGlwcygpO1xuICAgIGluaXRQb3BvdmVycygpO1xuICAgIGluaXREaWFscygpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBEZWZhdWx0ID0ge1xuICAgIHBsYWNlbWVudDogJ2NlbnRlcicsXG4gICAgYmFja2Ryb3BDbGFzc2VzOiAnYmctZ3JheS05MDAgYmctb3BhY2l0eS01MCBkYXJrOmJnLW9wYWNpdHktODAgZml4ZWQgaW5zZXQtMCB6LTQwJyxcbiAgICBiYWNrZHJvcDogJ2R5bmFtaWMnLFxuICAgIGNsb3NhYmxlOiB0cnVlLFxuICAgIG9uSGlkZTogZnVuY3Rpb24gKCkgeyB9LFxuICAgIG9uU2hvdzogZnVuY3Rpb24gKCkgeyB9LFxuICAgIG9uVG9nZ2xlOiBmdW5jdGlvbiAoKSB7IH0sXG59O1xudmFyIE1vZGFsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1vZGFsKHRhcmdldEVsLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICh0YXJnZXRFbCA9PT0gdm9pZCAwKSB7IHRhcmdldEVsID0gbnVsbDsgfVxuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSBEZWZhdWx0OyB9XG4gICAgICAgIHRoaXMuX3RhcmdldEVsID0gdGFyZ2V0RWw7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgRGVmYXVsdCksIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9pc0hpZGRlbiA9IHRydWU7XG4gICAgICAgIHRoaXMuX2JhY2tkcm9wRWwgPSBudWxsO1xuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgfVxuICAgIE1vZGFsLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuX3RhcmdldEVsKSB7XG4gICAgICAgICAgICB0aGlzLl9nZXRQbGFjZW1lbnRDbGFzc2VzKCkubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoYyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTW9kYWwucHJvdG90eXBlLl9jcmVhdGVCYWNrZHJvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAodGhpcy5faXNIaWRkZW4pIHtcbiAgICAgICAgICAgIHZhciBiYWNrZHJvcEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBiYWNrZHJvcEVsLnNldEF0dHJpYnV0ZSgnbW9kYWwtYmFja2Ryb3AnLCAnJyk7XG4gICAgICAgICAgICAoX2EgPSBiYWNrZHJvcEVsLmNsYXNzTGlzdCkuYWRkLmFwcGx5KF9hLCB0aGlzLl9vcHRpb25zLmJhY2tkcm9wQ2xhc3Nlcy5zcGxpdCgnICcpKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmQoYmFja2Ryb3BFbCk7XG4gICAgICAgICAgICB0aGlzLl9iYWNrZHJvcEVsID0gYmFja2Ryb3BFbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTW9kYWwucHJvdG90eXBlLl9kZXN0cm95QmFja2Ryb3BFbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc0hpZGRlbikge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW21vZGFsLWJhY2tkcm9wXScpLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBNb2RhbC5wcm90b3R5cGUuX3NldHVwTW9kYWxDbG9zZUV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5iYWNrZHJvcCA9PT0gJ2R5bmFtaWMnKSB7XG4gICAgICAgICAgICB0aGlzLl9jbGlja091dHNpZGVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX2hhbmRsZU91dHNpZGVDbGljayhldi50YXJnZXQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fY2xpY2tPdXRzaWRlRXZlbnRMaXN0ZW5lciwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fa2V5ZG93bkV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIGlmIChldi5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9rZXlkb3duRXZlbnRMaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcbiAgICBNb2RhbC5wcm90b3R5cGUuX3JlbW92ZU1vZGFsQ2xvc2VFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuYmFja2Ryb3AgPT09ICdkeW5hbWljJykge1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0RWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9jbGlja091dHNpZGVFdmVudExpc3RlbmVyLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9rZXlkb3duRXZlbnRMaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcbiAgICBNb2RhbC5wcm90b3R5cGUuX2hhbmRsZU91dHNpZGVDbGljayA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgaWYgKHRhcmdldCA9PT0gdGhpcy5fdGFyZ2V0RWwgfHxcbiAgICAgICAgICAgICh0YXJnZXQgPT09IHRoaXMuX2JhY2tkcm9wRWwgJiYgdGhpcy5pc1Zpc2libGUoKSkpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBNb2RhbC5wcm90b3R5cGUuX2dldFBsYWNlbWVudENsYXNzZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5fb3B0aW9ucy5wbGFjZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIHRvcFxuICAgICAgICAgICAgY2FzZSAndG9wLWxlZnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBbJ2p1c3RpZnktc3RhcnQnLCAnaXRlbXMtc3RhcnQnXTtcbiAgICAgICAgICAgIGNhc2UgJ3RvcC1jZW50ZXInOlxuICAgICAgICAgICAgICAgIHJldHVybiBbJ2p1c3RpZnktY2VudGVyJywgJ2l0ZW1zLXN0YXJ0J107XG4gICAgICAgICAgICBjYXNlICd0b3AtcmlnaHQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBbJ2p1c3RpZnktZW5kJywgJ2l0ZW1zLXN0YXJ0J107XG4gICAgICAgICAgICAvLyBjZW50ZXJcbiAgICAgICAgICAgIGNhc2UgJ2NlbnRlci1sZWZ0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gWydqdXN0aWZ5LXN0YXJ0JywgJ2l0ZW1zLWNlbnRlciddO1xuICAgICAgICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gWydqdXN0aWZ5LWNlbnRlcicsICdpdGVtcy1jZW50ZXInXTtcbiAgICAgICAgICAgIGNhc2UgJ2NlbnRlci1yaWdodCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnanVzdGlmeS1lbmQnLCAnaXRlbXMtY2VudGVyJ107XG4gICAgICAgICAgICAvLyBib3R0b21cbiAgICAgICAgICAgIGNhc2UgJ2JvdHRvbS1sZWZ0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gWydqdXN0aWZ5LXN0YXJ0JywgJ2l0ZW1zLWVuZCddO1xuICAgICAgICAgICAgY2FzZSAnYm90dG9tLWNlbnRlcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnanVzdGlmeS1jZW50ZXInLCAnaXRlbXMtZW5kJ107XG4gICAgICAgICAgICBjYXNlICdib3R0b20tcmlnaHQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBbJ2p1c3RpZnktZW5kJywgJ2l0ZW1zLWVuZCddO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gWydqdXN0aWZ5LWNlbnRlcicsICdpdGVtcy1jZW50ZXInXTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTW9kYWwucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzSGlkZGVuKSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25Ub2dnbGUodGhpcyk7XG4gICAgfTtcbiAgICBNb2RhbC5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNIaWRkZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoJ2ZsZXgnKTtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0RWwuc2V0QXR0cmlidXRlKCdhcmlhLW1vZGFsJywgJ3RydWUnKTtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldEVsLnNldEF0dHJpYnV0ZSgncm9sZScsICdkaWFsb2cnKTtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldEVsLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKTtcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUJhY2tkcm9wKCk7XG4gICAgICAgICAgICB0aGlzLl9pc0hpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gcHJldmVudCBib2R5IHNjcm9sbFxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdvdmVyZmxvdy1oaWRkZW4nKTtcbiAgICAgICAgICAgIC8vIEFkZCBrZXlib2FyZCBldmVudCBsaXN0ZW5lciB0byB0aGUgZG9jdW1lbnRcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmNsb3NhYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0dXBNb2RhbENsb3NlRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLm9uU2hvdyh0aGlzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTW9kYWwucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKCdmbGV4Jyk7XG4gICAgICAgICAgICB0aGlzLl90YXJnZXRFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldEVsLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1tb2RhbCcpO1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0RWwucmVtb3ZlQXR0cmlidXRlKCdyb2xlJyk7XG4gICAgICAgICAgICB0aGlzLl9kZXN0cm95QmFja2Ryb3BFbCgpO1xuICAgICAgICAgICAgdGhpcy5faXNIaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgLy8gcmUtYXBwbHkgYm9keSBzY3JvbGxcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnb3ZlcmZsb3ctaGlkZGVuJyk7XG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5jbG9zYWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZU1vZGFsQ2xvc2VFdmVudExpc3RlbmVycygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMub25IaWRlKHRoaXMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBNb2RhbC5wcm90b3R5cGUuaXNWaXNpYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuX2lzSGlkZGVuO1xuICAgIH07XG4gICAgTW9kYWwucHJvdG90eXBlLmlzSGlkZGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNIaWRkZW47XG4gICAgfTtcbiAgICByZXR1cm4gTW9kYWw7XG59KCkpO1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgd2luZG93Lk1vZGFsID0gTW9kYWw7XG59XG52YXIgZ2V0TW9kYWxJbnN0YW5jZSA9IGZ1bmN0aW9uIChpZCwgaW5zdGFuY2VzKSB7XG4gICAgaWYgKGluc3RhbmNlcy5zb21lKGZ1bmN0aW9uIChtb2RhbEluc3RhbmNlKSB7IHJldHVybiBtb2RhbEluc3RhbmNlLmlkID09PSBpZDsgfSkpIHtcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlcy5maW5kKGZ1bmN0aW9uIChtb2RhbEluc3RhbmNlKSB7IHJldHVybiBtb2RhbEluc3RhbmNlLmlkID09PSBpZDsgfSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBpbml0TW9kYWxzKCkge1xuICAgIHZhciBtb2RhbEluc3RhbmNlcyA9IFtdO1xuICAgIC8vIGluaXRpYXRlIG1vZGFsIGJhc2VkIG9uIGRhdGEtbW9kYWwtdGFyZ2V0XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbW9kYWwtdGFyZ2V0XScpLmZvckVhY2goZnVuY3Rpb24gKCR0cmlnZ2VyRWwpIHtcbiAgICAgICAgdmFyIG1vZGFsSWQgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1tb2RhbC10YXJnZXQnKTtcbiAgICAgICAgdmFyICRtb2RhbEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobW9kYWxJZCk7XG4gICAgICAgIGlmICgkbW9kYWxFbCkge1xuICAgICAgICAgICAgdmFyIHBsYWNlbWVudCA9ICRtb2RhbEVsLmdldEF0dHJpYnV0ZSgnZGF0YS1tb2RhbC1wbGFjZW1lbnQnKTtcbiAgICAgICAgICAgIHZhciBiYWNrZHJvcCA9ICRtb2RhbEVsLmdldEF0dHJpYnV0ZSgnZGF0YS1tb2RhbC1iYWNrZHJvcCcpO1xuICAgICAgICAgICAgaWYgKCFnZXRNb2RhbEluc3RhbmNlKG1vZGFsSWQsIG1vZGFsSW5zdGFuY2VzKSkge1xuICAgICAgICAgICAgICAgIG1vZGFsSW5zdGFuY2VzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogbW9kYWxJZCxcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0OiBuZXcgTW9kYWwoJG1vZGFsRWwsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBwbGFjZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IERlZmF1bHQucGxhY2VtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2Ryb3A6IGJhY2tkcm9wID8gYmFja2Ryb3AgOiBEZWZhdWx0LmJhY2tkcm9wLFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNb2RhbCB3aXRoIGlkIFwiLmNvbmNhdChtb2RhbElkLCBcIiBkb2VzIG5vdCBleGlzdC4gQXJlIHlvdSBzdXJlIHRoYXQgdGhlIGRhdGEtbW9kYWwtdGFyZ2V0IGF0dHJpYnV0ZSBwb2ludHMgdG8gdGhlIGNvcnJlY3QgbW9kYWwgaWQ/LlwiKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBzdXBwb3J0IHByZSB2MS42LjAgZGF0YS1tb2RhbC10b2dnbGUgaW5pdGlhbGl6YXRpb25cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1tb2RhbC10b2dnbGVdJykuZm9yRWFjaChmdW5jdGlvbiAoJHRyaWdnZXJFbCkge1xuICAgICAgICB2YXIgbW9kYWxJZCA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLW1vZGFsLXRvZ2dsZScpO1xuICAgICAgICB2YXIgJG1vZGFsRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChtb2RhbElkKTtcbiAgICAgICAgaWYgKCRtb2RhbEVsKSB7XG4gICAgICAgICAgICB2YXIgcGxhY2VtZW50ID0gJG1vZGFsRWwuZ2V0QXR0cmlidXRlKCdkYXRhLW1vZGFsLXBsYWNlbWVudCcpO1xuICAgICAgICAgICAgdmFyIGJhY2tkcm9wID0gJG1vZGFsRWwuZ2V0QXR0cmlidXRlKCdkYXRhLW1vZGFsLWJhY2tkcm9wJyk7XG4gICAgICAgICAgICB2YXIgbW9kYWxfMSA9IGdldE1vZGFsSW5zdGFuY2UobW9kYWxJZCwgbW9kYWxJbnN0YW5jZXMpO1xuICAgICAgICAgICAgaWYgKCFtb2RhbF8xKSB7XG4gICAgICAgICAgICAgICAgbW9kYWxfMSA9IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IG1vZGFsSWQsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdDogbmV3IE1vZGFsKCRtb2RhbEVsLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gcGxhY2VtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBEZWZhdWx0LnBsYWNlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tkcm9wOiBiYWNrZHJvcCA/IGJhY2tkcm9wIDogRGVmYXVsdC5iYWNrZHJvcCxcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBtb2RhbEluc3RhbmNlcy5wdXNoKG1vZGFsXzEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJHRyaWdnZXJFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBtb2RhbF8xLm9iamVjdC50b2dnbGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1vZGFsIHdpdGggaWQgXCIuY29uY2F0KG1vZGFsSWQsIFwiIGRvZXMgbm90IGV4aXN0LiBBcmUgeW91IHN1cmUgdGhhdCB0aGUgZGF0YS1tb2RhbC10b2dnbGUgYXR0cmlidXRlIHBvaW50cyB0byB0aGUgY29ycmVjdCBtb2RhbCBpZD9cIikpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gc2hvdyBtb2RhbCBvbiBjbGljayBpZiBleGlzdHMgYmFzZWQgb24gaWRcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1tb2RhbC1zaG93XScpLmZvckVhY2goZnVuY3Rpb24gKCR0cmlnZ2VyRWwpIHtcbiAgICAgICAgdmFyIG1vZGFsSWQgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1tb2RhbC1zaG93Jyk7XG4gICAgICAgIHZhciAkbW9kYWxFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG1vZGFsSWQpO1xuICAgICAgICBpZiAoJG1vZGFsRWwpIHtcbiAgICAgICAgICAgIHZhciBtb2RhbF8yID0gZ2V0TW9kYWxJbnN0YW5jZShtb2RhbElkLCBtb2RhbEluc3RhbmNlcyk7XG4gICAgICAgICAgICBpZiAobW9kYWxfMikge1xuICAgICAgICAgICAgICAgICR0cmlnZ2VyRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2RhbF8yLm9iamVjdC5pc0hpZGRlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWxfMi5vYmplY3Quc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTW9kYWwgd2l0aCBpZCBcIi5jb25jYXQobW9kYWxJZCwgXCIgaGFzIG5vdCBiZWVuIGluaXRpYWxpemVkLiBQbGVhc2UgaW5pdGlhbGl6ZSBpdCB1c2luZyB0aGUgZGF0YS1tb2RhbC10YXJnZXQgYXR0cmlidXRlLlwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTW9kYWwgd2l0aCBpZCBcIi5jb25jYXQobW9kYWxJZCwgXCIgZG9lcyBub3QgZXhpc3QuIEFyZSB5b3Ugc3VyZSB0aGF0IHRoZSBkYXRhLW1vZGFsLXNob3cgYXR0cmlidXRlIHBvaW50cyB0byB0aGUgY29ycmVjdCBtb2RhbCBpZD9cIikpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gaGlkZSBtb2RhbCBvbiBjbGljayBpZiBleGlzdHMgYmFzZWQgb24gaWRcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1tb2RhbC1oaWRlXScpLmZvckVhY2goZnVuY3Rpb24gKCR0cmlnZ2VyRWwpIHtcbiAgICAgICAgdmFyIG1vZGFsSWQgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1tb2RhbC1oaWRlJyk7XG4gICAgICAgIHZhciAkbW9kYWxFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG1vZGFsSWQpO1xuICAgICAgICBpZiAoJG1vZGFsRWwpIHtcbiAgICAgICAgICAgIHZhciBtb2RhbF8zID0gZ2V0TW9kYWxJbnN0YW5jZShtb2RhbElkLCBtb2RhbEluc3RhbmNlcyk7XG4gICAgICAgICAgICBpZiAobW9kYWxfMykge1xuICAgICAgICAgICAgICAgICR0cmlnZ2VyRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2RhbF8zLm9iamVjdC5pc1Zpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsXzMub2JqZWN0LmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1vZGFsIHdpdGggaWQgXCIuY29uY2F0KG1vZGFsSWQsIFwiIGhhcyBub3QgYmVlbiBpbml0aWFsaXplZC4gUGxlYXNlIGluaXRpYWxpemUgaXQgdXNpbmcgdGhlIGRhdGEtbW9kYWwtdGFyZ2V0IGF0dHJpYnV0ZS5cIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1vZGFsIHdpdGggaWQgXCIuY29uY2F0KG1vZGFsSWQsIFwiIGRvZXMgbm90IGV4aXN0LiBBcmUgeW91IHN1cmUgdGhhdCB0aGUgZGF0YS1tb2RhbC1oaWRlIGF0dHJpYnV0ZSBwb2ludHMgdG8gdGhlIGNvcnJlY3QgbW9kYWwgaWQ/XCIpKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0IGRlZmF1bHQgTW9kYWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnRlcmZhY2UuanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwZXMuanMubWFwIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20sIHBhY2spIHtcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xufTtcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1mdW5jdGlvbiAqL1xuaW1wb3J0IHsgY3JlYXRlUG9wcGVyIH0gZnJvbSAnQHBvcHBlcmpzL2NvcmUnO1xudmFyIERlZmF1bHQgPSB7XG4gICAgcGxhY2VtZW50OiAndG9wJyxcbiAgICBvZmZzZXQ6IDEwLFxuICAgIHRyaWdnZXJUeXBlOiAnaG92ZXInLFxuICAgIG9uU2hvdzogZnVuY3Rpb24gKCkgeyB9LFxuICAgIG9uSGlkZTogZnVuY3Rpb24gKCkgeyB9LFxuICAgIG9uVG9nZ2xlOiBmdW5jdGlvbiAoKSB7IH0sXG59O1xudmFyIFBvcG92ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUG9wb3Zlcih0YXJnZXRFbCwgdHJpZ2dlckVsLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICh0YXJnZXRFbCA9PT0gdm9pZCAwKSB7IHRhcmdldEVsID0gbnVsbDsgfVxuICAgICAgICBpZiAodHJpZ2dlckVsID09PSB2b2lkIDApIHsgdHJpZ2dlckVsID0gbnVsbDsgfVxuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSBEZWZhdWx0OyB9XG4gICAgICAgIHRoaXMuX3RhcmdldEVsID0gdGFyZ2V0RWw7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJFbCA9IHRyaWdnZXJFbDtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBEZWZhdWx0KSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX3BvcHBlckluc3RhbmNlID0gdGhpcy5fY3JlYXRlUG9wcGVySW5zdGFuY2UoKTtcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgfVxuICAgIFBvcG92ZXIucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fdHJpZ2dlckVsKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFBvcG92ZXIucHJvdG90eXBlLl9zZXR1cEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgdHJpZ2dlckV2ZW50cyA9IHRoaXMuX2dldFRyaWdnZXJFdmVudHMoKTtcbiAgICAgICAgdHJpZ2dlckV2ZW50cy5zaG93RXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBfdGhpcy5fdHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zaG93KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIF90aGlzLl90YXJnZXRFbC5hZGRFdmVudExpc3RlbmVyKGV2LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2hvdygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0cmlnZ2VyRXZlbnRzLmhpZGVFdmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIF90aGlzLl90cmlnZ2VyRWwuYWRkRXZlbnRMaXN0ZW5lcihldiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIV90aGlzLl90YXJnZXRFbC5tYXRjaGVzKCc6aG92ZXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgX3RoaXMuX3RhcmdldEVsLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5fdHJpZ2dlckVsLm1hdGNoZXMoJzpob3ZlcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUG9wb3Zlci5wcm90b3R5cGUuX2NyZWF0ZVBvcHBlckluc3RhbmNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlUG9wcGVyKHRoaXMuX3RyaWdnZXJFbCwgdGhpcy5fdGFyZ2V0RWwsIHtcbiAgICAgICAgICAgIHBsYWNlbWVudDogdGhpcy5fb3B0aW9ucy5wbGFjZW1lbnQsXG4gICAgICAgICAgICBtb2RpZmllcnM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdvZmZzZXQnLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQ6IFswLCB0aGlzLl9vcHRpb25zLm9mZnNldF0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUG9wb3Zlci5wcm90b3R5cGUuX2dldFRyaWdnZXJFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5fb3B0aW9ucy50cmlnZ2VyVHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnaG92ZXInOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dFdmVudHM6IFsnbW91c2VlbnRlcicsICdmb2N1cyddLFxuICAgICAgICAgICAgICAgICAgICBoaWRlRXZlbnRzOiBbJ21vdXNlbGVhdmUnLCAnYmx1ciddLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlICdjbGljayc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0V2ZW50czogWydjbGljaycsICdmb2N1cyddLFxuICAgICAgICAgICAgICAgICAgICBoaWRlRXZlbnRzOiBbJ2ZvY3Vzb3V0JywgJ2JsdXInXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAnbm9uZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0V2ZW50czogW10sXG4gICAgICAgICAgICAgICAgICAgIGhpZGVFdmVudHM6IFtdLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dFdmVudHM6IFsnbW91c2VlbnRlcicsICdmb2N1cyddLFxuICAgICAgICAgICAgICAgICAgICBoaWRlRXZlbnRzOiBbJ21vdXNlbGVhdmUnLCAnYmx1ciddLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFBvcG92ZXIucHJvdG90eXBlLl9zZXR1cEtleWRvd25MaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fa2V5ZG93bkV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIGlmIChldi5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9rZXlkb3duRXZlbnRMaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcbiAgICBQb3BvdmVyLnByb3RvdHlwZS5fcmVtb3ZlS2V5ZG93bkxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9rZXlkb3duRXZlbnRMaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcbiAgICBQb3BvdmVyLnByb3RvdHlwZS5fc2V0dXBDbGlja091dHNpZGVMaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fY2xpY2tPdXRzaWRlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgX3RoaXMuX2hhbmRsZUNsaWNrT3V0c2lkZShldiwgX3RoaXMuX3RhcmdldEVsKTtcbiAgICAgICAgfTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2NsaWNrT3V0c2lkZUV2ZW50TGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG4gICAgUG9wb3Zlci5wcm90b3R5cGUuX3JlbW92ZUNsaWNrT3V0c2lkZUxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fY2xpY2tPdXRzaWRlRXZlbnRMaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcbiAgICBQb3BvdmVyLnByb3RvdHlwZS5faGFuZGxlQ2xpY2tPdXRzaWRlID0gZnVuY3Rpb24gKGV2LCB0YXJnZXRFbCkge1xuICAgICAgICB2YXIgY2xpY2tlZEVsID0gZXYudGFyZ2V0O1xuICAgICAgICBpZiAoY2xpY2tlZEVsICE9PSB0YXJnZXRFbCAmJlxuICAgICAgICAgICAgIXRhcmdldEVsLmNvbnRhaW5zKGNsaWNrZWRFbCkgJiZcbiAgICAgICAgICAgICF0aGlzLl90cmlnZ2VyRWwuY29udGFpbnMoY2xpY2tlZEVsKSAmJlxuICAgICAgICAgICAgdGhpcy5pc1Zpc2libGUoKSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFBvcG92ZXIucHJvdG90eXBlLmlzVmlzaWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XG4gICAgfTtcbiAgICBQb3BvdmVyLnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX29wdGlvbnMub25Ub2dnbGUodGhpcyk7XG4gICAgfTtcbiAgICBQb3BvdmVyLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKCdvcGFjaXR5LTAnLCAnaW52aXNpYmxlJyk7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoJ29wYWNpdHktMTAwJywgJ3Zpc2libGUnKTtcbiAgICAgICAgLy8gRW5hYmxlIHRoZSBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgdGhpcy5fcG9wcGVySW5zdGFuY2Uuc2V0T3B0aW9ucyhmdW5jdGlvbiAob3B0aW9ucykgeyByZXR1cm4gKF9fYXNzaWduKF9fYXNzaWduKHt9LCBvcHRpb25zKSwgeyBtb2RpZmllcnM6IF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShbXSwgb3B0aW9ucy5tb2RpZmllcnMsIHRydWUpLCBbXG4gICAgICAgICAgICAgICAgeyBuYW1lOiAnZXZlbnRMaXN0ZW5lcnMnLCBlbmFibGVkOiB0cnVlIH0sXG4gICAgICAgICAgICBdLCBmYWxzZSkgfSkpOyB9KTtcbiAgICAgICAgLy8gaGFuZGxlIGNsaWNrIG91dHNpZGVcbiAgICAgICAgdGhpcy5fc2V0dXBDbGlja091dHNpZGVMaXN0ZW5lcigpO1xuICAgICAgICAvLyBoYW5kbGUgZXNjIGtleWRvd25cbiAgICAgICAgdGhpcy5fc2V0dXBLZXlkb3duTGlzdGVuZXIoKTtcbiAgICAgICAgLy8gVXBkYXRlIGl0cyBwb3NpdGlvblxuICAgICAgICB0aGlzLl9wb3BwZXJJbnN0YW5jZS51cGRhdGUoKTtcbiAgICAgICAgLy8gc2V0IHZpc2liaWxpdHkgdG8gdHJ1ZVxuICAgICAgICB0aGlzLl92aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vblNob3codGhpcyk7XG4gICAgfTtcbiAgICBQb3BvdmVyLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKCdvcGFjaXR5LTEwMCcsICd2aXNpYmxlJyk7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoJ29wYWNpdHktMCcsICdpbnZpc2libGUnKTtcbiAgICAgICAgLy8gRGlzYWJsZSB0aGUgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgIHRoaXMuX3BvcHBlckluc3RhbmNlLnNldE9wdGlvbnMoZnVuY3Rpb24gKG9wdGlvbnMpIHsgcmV0dXJuIChfX2Fzc2lnbihfX2Fzc2lnbih7fSwgb3B0aW9ucyksIHsgbW9kaWZpZXJzOiBfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoW10sIG9wdGlvbnMubW9kaWZpZXJzLCB0cnVlKSwgW1xuICAgICAgICAgICAgICAgIHsgbmFtZTogJ2V2ZW50TGlzdGVuZXJzJywgZW5hYmxlZDogZmFsc2UgfSxcbiAgICAgICAgICAgIF0sIGZhbHNlKSB9KSk7IH0pO1xuICAgICAgICAvLyBoYW5kbGUgY2xpY2sgb3V0c2lkZVxuICAgICAgICB0aGlzLl9yZW1vdmVDbGlja091dHNpZGVMaXN0ZW5lcigpO1xuICAgICAgICAvLyBoYW5kbGUgZXNjIGtleWRvd25cbiAgICAgICAgdGhpcy5fcmVtb3ZlS2V5ZG93bkxpc3RlbmVyKCk7XG4gICAgICAgIC8vIHNldCB2aXNpYmlsaXR5IHRvIGZhbHNlXG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vbkhpZGUodGhpcyk7XG4gICAgfTtcbiAgICByZXR1cm4gUG9wb3Zlcjtcbn0oKSk7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB3aW5kb3cuUG9wb3ZlciA9IFBvcG92ZXI7XG59XG5leHBvcnQgZnVuY3Rpb24gaW5pdFBvcG92ZXJzKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBvcG92ZXItdGFyZ2V0XScpLmZvckVhY2goZnVuY3Rpb24gKCR0cmlnZ2VyRWwpIHtcbiAgICAgICAgdmFyIHBvcG92ZXJJRCA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLXBvcG92ZXItdGFyZ2V0Jyk7XG4gICAgICAgIHZhciAkcG9wb3ZlckVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocG9wb3ZlcklEKTtcbiAgICAgICAgaWYgKCRwb3BvdmVyRWwpIHtcbiAgICAgICAgICAgIHZhciB0cmlnZ2VyVHlwZSA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLXBvcG92ZXItdHJpZ2dlcicpO1xuICAgICAgICAgICAgdmFyIHBsYWNlbWVudCA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLXBvcG92ZXItcGxhY2VtZW50Jyk7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcG9wb3Zlci1vZmZzZXQnKTtcbiAgICAgICAgICAgIG5ldyBQb3BvdmVyKCRwb3BvdmVyRWwsICR0cmlnZ2VyRWwsIHtcbiAgICAgICAgICAgICAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudCA/IHBsYWNlbWVudCA6IERlZmF1bHQucGxhY2VtZW50LFxuICAgICAgICAgICAgICAgIG9mZnNldDogb2Zmc2V0ID8gcGFyc2VJbnQob2Zmc2V0KSA6IERlZmF1bHQub2Zmc2V0LFxuICAgICAgICAgICAgICAgIHRyaWdnZXJUeXBlOiB0cmlnZ2VyVHlwZVxuICAgICAgICAgICAgICAgICAgICA/IHRyaWdnZXJUeXBlXG4gICAgICAgICAgICAgICAgICAgIDogRGVmYXVsdC50cmlnZ2VyVHlwZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlRoZSBwb3BvdmVyIGVsZW1lbnQgd2l0aCBpZCBcXFwiXCIuY29uY2F0KHBvcG92ZXJJRCwgXCJcXFwiIGRvZXMgbm90IGV4aXN0LiBQbGVhc2UgY2hlY2sgdGhlIGRhdGEtcG9wb3Zlci10YXJnZXQgYXR0cmlidXRlLlwiKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydCBkZWZhdWx0IFBvcG92ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnRlcmZhY2UuanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwZXMuanMubWFwIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBEZWZhdWx0ID0ge1xuICAgIGRlZmF1bHRUYWJJZDogbnVsbCxcbiAgICBhY3RpdmVDbGFzc2VzOiAndGV4dC1ibHVlLTYwMCBob3Zlcjp0ZXh0LWJsdWUtNjAwIGRhcms6dGV4dC1ibHVlLTUwMCBkYXJrOmhvdmVyOnRleHQtYmx1ZS01MDAgYm9yZGVyLWJsdWUtNjAwIGRhcms6Ym9yZGVyLWJsdWUtNTAwJyxcbiAgICBpbmFjdGl2ZUNsYXNzZXM6ICdkYXJrOmJvcmRlci10cmFuc3BhcmVudCB0ZXh0LWdyYXktNTAwIGhvdmVyOnRleHQtZ3JheS02MDAgZGFyazp0ZXh0LWdyYXktNDAwIGJvcmRlci1ncmF5LTEwMCBob3Zlcjpib3JkZXItZ3JheS0zMDAgZGFyazpib3JkZXItZ3JheS03MDAgZGFyazpob3Zlcjp0ZXh0LWdyYXktMzAwJyxcbiAgICBvblNob3c6IGZ1bmN0aW9uICgpIHsgfSxcbn07XG52YXIgVGFicyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYWJzKGl0ZW1zLCBvcHRpb25zKSB7XG4gICAgICAgIGlmIChpdGVtcyA9PT0gdm9pZCAwKSB7IGl0ZW1zID0gW107IH1cbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0gRGVmYXVsdDsgfVxuICAgICAgICB0aGlzLl9pdGVtcyA9IGl0ZW1zO1xuICAgICAgICB0aGlzLl9hY3RpdmVUYWIgPSBvcHRpb25zID8gdGhpcy5nZXRUYWIob3B0aW9ucy5kZWZhdWx0VGFiSWQpIDogbnVsbDtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBEZWZhdWx0KSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9XG4gICAgVGFicy5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLl9pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIHNldCB0aGUgZmlyc3QgdGFiIGFzIGFjdGl2ZSBpZiBub3Qgc2V0IGJ5IGV4cGxpY2l0bHlcbiAgICAgICAgICAgIGlmICghdGhpcy5fYWN0aXZlVGFiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0QWN0aXZlVGFiKHRoaXMuX2l0ZW1zWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGZvcmNlIHNob3cgdGhlIGZpcnN0IGRlZmF1bHQgdGFiXG4gICAgICAgICAgICB0aGlzLnNob3codGhpcy5fYWN0aXZlVGFiLmlkLCB0cnVlKTtcbiAgICAgICAgICAgIC8vIHNob3cgdGFiIGNvbnRlbnQgYmFzZWQgb24gY2xpY2tcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zLm1hcChmdW5jdGlvbiAodGFiKSB7XG4gICAgICAgICAgICAgICAgdGFiLnRyaWdnZXJFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2hvdyh0YWIuaWQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFRhYnMucHJvdG90eXBlLmdldEFjdGl2ZVRhYiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVRhYjtcbiAgICB9O1xuICAgIFRhYnMucHJvdG90eXBlLl9zZXRBY3RpdmVUYWIgPSBmdW5jdGlvbiAodGFiKSB7XG4gICAgICAgIHRoaXMuX2FjdGl2ZVRhYiA9IHRhYjtcbiAgICB9O1xuICAgIFRhYnMucHJvdG90eXBlLmdldFRhYiA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMuZmlsdGVyKGZ1bmN0aW9uICh0KSB7IHJldHVybiB0LmlkID09PSBpZDsgfSlbMF07XG4gICAgfTtcbiAgICBUYWJzLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKGlkLCBmb3JjZVNob3cpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKGZvcmNlU2hvdyA9PT0gdm9pZCAwKSB7IGZvcmNlU2hvdyA9IGZhbHNlOyB9XG4gICAgICAgIHZhciB0YWIgPSB0aGlzLmdldFRhYihpZCk7XG4gICAgICAgIC8vIGRvbid0IGRvIGFueXRoaW5nIGlmIGFscmVhZHkgYWN0aXZlXG4gICAgICAgIGlmICh0YWIgPT09IHRoaXMuX2FjdGl2ZVRhYiAmJiAhZm9yY2VTaG93KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gaGlkZSBvdGhlciB0YWJzXG4gICAgICAgIHRoaXMuX2l0ZW1zLm1hcChmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgIGlmICh0ICE9PSB0YWIpIHtcbiAgICAgICAgICAgICAgICAoX2EgPSB0LnRyaWdnZXJFbC5jbGFzc0xpc3QpLnJlbW92ZS5hcHBseShfYSwgX3RoaXMuX29wdGlvbnMuYWN0aXZlQ2xhc3Nlcy5zcGxpdCgnICcpKTtcbiAgICAgICAgICAgICAgICAoX2IgPSB0LnRyaWdnZXJFbC5jbGFzc0xpc3QpLmFkZC5hcHBseShfYiwgX3RoaXMuX29wdGlvbnMuaW5hY3RpdmVDbGFzc2VzLnNwbGl0KCcgJykpO1xuICAgICAgICAgICAgICAgIHQudGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgdC50cmlnZ2VyRWwuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBzaG93IGFjdGl2ZSB0YWJcbiAgICAgICAgKF9hID0gdGFiLnRyaWdnZXJFbC5jbGFzc0xpc3QpLmFkZC5hcHBseShfYSwgdGhpcy5fb3B0aW9ucy5hY3RpdmVDbGFzc2VzLnNwbGl0KCcgJykpO1xuICAgICAgICAoX2IgPSB0YWIudHJpZ2dlckVsLmNsYXNzTGlzdCkucmVtb3ZlLmFwcGx5KF9iLCB0aGlzLl9vcHRpb25zLmluYWN0aXZlQ2xhc3Nlcy5zcGxpdCgnICcpKTtcbiAgICAgICAgdGFiLnRyaWdnZXJFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgICAgICB0YWIudGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgIHRoaXMuX3NldEFjdGl2ZVRhYih0YWIpO1xuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uU2hvdyh0aGlzLCB0YWIpO1xuICAgIH07XG4gICAgcmV0dXJuIFRhYnM7XG59KCkpO1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgd2luZG93LlRhYnMgPSBUYWJzO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGluaXRUYWJzKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYnMtdG9nZ2xlXScpLmZvckVhY2goZnVuY3Rpb24gKCR0cmlnZ2VyRWwpIHtcbiAgICAgICAgdmFyIHRhYkl0ZW1zID0gW107XG4gICAgICAgIHZhciBkZWZhdWx0VGFiSWQgPSBudWxsO1xuICAgICAgICAkdHJpZ2dlckVsXG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJ0YWJcIl0nKVxuICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKCR0cmlnZ2VyRWwpIHtcbiAgICAgICAgICAgIHZhciBpc0FjdGl2ZSA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJykgPT09ICd0cnVlJztcbiAgICAgICAgICAgIHZhciB0YWIgPSB7XG4gICAgICAgICAgICAgICAgaWQ6ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYnMtdGFyZ2V0JyksXG4gICAgICAgICAgICAgICAgdHJpZ2dlckVsOiAkdHJpZ2dlckVsLFxuICAgICAgICAgICAgICAgIHRhcmdldEVsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYnMtdGFyZ2V0JykpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRhYkl0ZW1zLnB1c2godGFiKTtcbiAgICAgICAgICAgIGlmIChpc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUYWJJZCA9IHRhYi5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIG5ldyBUYWJzKHRhYkl0ZW1zLCB7XG4gICAgICAgICAgICBkZWZhdWx0VGFiSWQ6IGRlZmF1bHRUYWJJZCxcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnQgZGVmYXVsdCBUYWJzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW50ZXJmYWNlLmpzLm1hcCIsImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXR5cGVzLmpzLm1hcCIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tLCBwYWNrKSB7XG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcbn07XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb24gKi9cbmltcG9ydCB7IGNyZWF0ZVBvcHBlciB9IGZyb20gJ0Bwb3BwZXJqcy9jb3JlJztcbnZhciBEZWZhdWx0ID0ge1xuICAgIHBsYWNlbWVudDogJ3RvcCcsXG4gICAgdHJpZ2dlclR5cGU6ICdob3ZlcicsXG4gICAgb25TaG93OiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgb25IaWRlOiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgb25Ub2dnbGU6IGZ1bmN0aW9uICgpIHsgfSxcbn07XG52YXIgVG9vbHRpcCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUb29sdGlwKHRhcmdldEVsLCB0cmlnZ2VyRWwsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRhcmdldEVsID09PSB2b2lkIDApIHsgdGFyZ2V0RWwgPSBudWxsOyB9XG4gICAgICAgIGlmICh0cmlnZ2VyRWwgPT09IHZvaWQgMCkgeyB0cmlnZ2VyRWwgPSBudWxsOyB9XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IERlZmF1bHQ7IH1cbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwgPSB0YXJnZXRFbDtcbiAgICAgICAgdGhpcy5fdHJpZ2dlckVsID0gdHJpZ2dlckVsO1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gX19hc3NpZ24oX19hc3NpZ24oe30sIERlZmF1bHQpLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fcG9wcGVySW5zdGFuY2UgPSB0aGlzLl9jcmVhdGVQb3BwZXJJbnN0YW5jZSgpO1xuICAgICAgICB0aGlzLl92aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9XG4gICAgVG9vbHRpcC5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl90cmlnZ2VyRWwpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHVwRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgVG9vbHRpcC5wcm90b3R5cGUuX3NldHVwRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciB0cmlnZ2VyRXZlbnRzID0gdGhpcy5fZ2V0VHJpZ2dlckV2ZW50cygpO1xuICAgICAgICB0cmlnZ2VyRXZlbnRzLnNob3dFdmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIF90aGlzLl90cmlnZ2VyRWwuYWRkRXZlbnRMaXN0ZW5lcihldiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnNob3coKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdHJpZ2dlckV2ZW50cy5oaWRlRXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBfdGhpcy5fdHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBUb29sdGlwLnByb3RvdHlwZS5fY3JlYXRlUG9wcGVySW5zdGFuY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVQb3BwZXIodGhpcy5fdHJpZ2dlckVsLCB0aGlzLl90YXJnZXRFbCwge1xuICAgICAgICAgICAgcGxhY2VtZW50OiB0aGlzLl9vcHRpb25zLnBsYWNlbWVudCxcbiAgICAgICAgICAgIG1vZGlmaWVyczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ29mZnNldCcsXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldDogWzAsIDhdLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFRvb2x0aXAucHJvdG90eXBlLl9nZXRUcmlnZ2VyRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuX29wdGlvbnMudHJpZ2dlclR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2hvdmVyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzaG93RXZlbnRzOiBbJ21vdXNlZW50ZXInLCAnZm9jdXMnXSxcbiAgICAgICAgICAgICAgICAgICAgaGlkZUV2ZW50czogWydtb3VzZWxlYXZlJywgJ2JsdXInXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAnY2xpY2snOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dFdmVudHM6IFsnY2xpY2snLCAnZm9jdXMnXSxcbiAgICAgICAgICAgICAgICAgICAgaGlkZUV2ZW50czogWydmb2N1c291dCcsICdibHVyJ10sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgJ25vbmUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dFdmVudHM6IFtdLFxuICAgICAgICAgICAgICAgICAgICBoaWRlRXZlbnRzOiBbXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzaG93RXZlbnRzOiBbJ21vdXNlZW50ZXInLCAnZm9jdXMnXSxcbiAgICAgICAgICAgICAgICAgICAgaGlkZUV2ZW50czogWydtb3VzZWxlYXZlJywgJ2JsdXInXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICBUb29sdGlwLnByb3RvdHlwZS5fc2V0dXBLZXlkb3duTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2tleWRvd25FdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBpZiAoZXYua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fa2V5ZG93bkV2ZW50TGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG4gICAgVG9vbHRpcC5wcm90b3R5cGUuX3JlbW92ZUtleWRvd25MaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fa2V5ZG93bkV2ZW50TGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG4gICAgVG9vbHRpcC5wcm90b3R5cGUuX3NldHVwQ2xpY2tPdXRzaWRlTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2NsaWNrT3V0c2lkZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIF90aGlzLl9oYW5kbGVDbGlja091dHNpZGUoZXYsIF90aGlzLl90YXJnZXRFbCk7XG4gICAgICAgIH07XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9jbGlja091dHNpZGVFdmVudExpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuICAgIFRvb2x0aXAucHJvdG90eXBlLl9yZW1vdmVDbGlja091dHNpZGVMaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2NsaWNrT3V0c2lkZUV2ZW50TGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG4gICAgVG9vbHRpcC5wcm90b3R5cGUuX2hhbmRsZUNsaWNrT3V0c2lkZSA9IGZ1bmN0aW9uIChldiwgdGFyZ2V0RWwpIHtcbiAgICAgICAgdmFyIGNsaWNrZWRFbCA9IGV2LnRhcmdldDtcbiAgICAgICAgaWYgKGNsaWNrZWRFbCAhPT0gdGFyZ2V0RWwgJiZcbiAgICAgICAgICAgICF0YXJnZXRFbC5jb250YWlucyhjbGlja2VkRWwpICYmXG4gICAgICAgICAgICAhdGhpcy5fdHJpZ2dlckVsLmNvbnRhaW5zKGNsaWNrZWRFbCkgJiZcbiAgICAgICAgICAgIHRoaXMuaXNWaXNpYmxlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBUb29sdGlwLnByb3RvdHlwZS5pc1Zpc2libGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xuICAgIH07XG4gICAgVG9vbHRpcC5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pc1Zpc2libGUoKSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgVG9vbHRpcC5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZSgnb3BhY2l0eS0wJywgJ2ludmlzaWJsZScpO1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuYWRkKCdvcGFjaXR5LTEwMCcsICd2aXNpYmxlJyk7XG4gICAgICAgIC8vIEVuYWJsZSB0aGUgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgIHRoaXMuX3BvcHBlckluc3RhbmNlLnNldE9wdGlvbnMoZnVuY3Rpb24gKG9wdGlvbnMpIHsgcmV0dXJuIChfX2Fzc2lnbihfX2Fzc2lnbih7fSwgb3B0aW9ucyksIHsgbW9kaWZpZXJzOiBfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoW10sIG9wdGlvbnMubW9kaWZpZXJzLCB0cnVlKSwgW1xuICAgICAgICAgICAgICAgIHsgbmFtZTogJ2V2ZW50TGlzdGVuZXJzJywgZW5hYmxlZDogdHJ1ZSB9LFxuICAgICAgICAgICAgXSwgZmFsc2UpIH0pKTsgfSk7XG4gICAgICAgIC8vIGhhbmRsZSBjbGljayBvdXRzaWRlXG4gICAgICAgIHRoaXMuX3NldHVwQ2xpY2tPdXRzaWRlTGlzdGVuZXIoKTtcbiAgICAgICAgLy8gaGFuZGxlIGVzYyBrZXlkb3duXG4gICAgICAgIHRoaXMuX3NldHVwS2V5ZG93bkxpc3RlbmVyKCk7XG4gICAgICAgIC8vIFVwZGF0ZSBpdHMgcG9zaXRpb25cbiAgICAgICAgdGhpcy5fcG9wcGVySW5zdGFuY2UudXBkYXRlKCk7XG4gICAgICAgIC8vIHNldCB2aXNpYmlsaXR5XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSB0cnVlO1xuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uU2hvdyh0aGlzKTtcbiAgICB9O1xuICAgIFRvb2x0aXAucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoJ29wYWNpdHktMTAwJywgJ3Zpc2libGUnKTtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCgnb3BhY2l0eS0wJywgJ2ludmlzaWJsZScpO1xuICAgICAgICAvLyBEaXNhYmxlIHRoZSBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgdGhpcy5fcG9wcGVySW5zdGFuY2Uuc2V0T3B0aW9ucyhmdW5jdGlvbiAob3B0aW9ucykgeyByZXR1cm4gKF9fYXNzaWduKF9fYXNzaWduKHt9LCBvcHRpb25zKSwgeyBtb2RpZmllcnM6IF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShbXSwgb3B0aW9ucy5tb2RpZmllcnMsIHRydWUpLCBbXG4gICAgICAgICAgICAgICAgeyBuYW1lOiAnZXZlbnRMaXN0ZW5lcnMnLCBlbmFibGVkOiBmYWxzZSB9LFxuICAgICAgICAgICAgXSwgZmFsc2UpIH0pKTsgfSk7XG4gICAgICAgIC8vIGhhbmRsZSBjbGljayBvdXRzaWRlXG4gICAgICAgIHRoaXMuX3JlbW92ZUNsaWNrT3V0c2lkZUxpc3RlbmVyKCk7XG4gICAgICAgIC8vIGhhbmRsZSBlc2Mga2V5ZG93blxuICAgICAgICB0aGlzLl9yZW1vdmVLZXlkb3duTGlzdGVuZXIoKTtcbiAgICAgICAgLy8gc2V0IHZpc2liaWxpdHlcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uSGlkZSh0aGlzKTtcbiAgICB9O1xuICAgIHJldHVybiBUb29sdGlwO1xufSgpKTtcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHdpbmRvdy5Ub29sdGlwID0gVG9vbHRpcDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpbml0VG9vbHRpcHMoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdG9vbHRpcC10YXJnZXRdJykuZm9yRWFjaChmdW5jdGlvbiAoJHRyaWdnZXJFbCkge1xuICAgICAgICB2YXIgdG9vbHRpcElkID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdG9vbHRpcC10YXJnZXQnKTtcbiAgICAgICAgdmFyICR0b29sdGlwRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0b29sdGlwSWQpO1xuICAgICAgICBpZiAoJHRvb2x0aXBFbCkge1xuICAgICAgICAgICAgdmFyIHRyaWdnZXJUeXBlID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdG9vbHRpcC10cmlnZ2VyJyk7XG4gICAgICAgICAgICB2YXIgcGxhY2VtZW50ID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdG9vbHRpcC1wbGFjZW1lbnQnKTtcbiAgICAgICAgICAgIG5ldyBUb29sdGlwKCR0b29sdGlwRWwsICR0cmlnZ2VyRWwsIHtcbiAgICAgICAgICAgICAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudCA/IHBsYWNlbWVudCA6IERlZmF1bHQucGxhY2VtZW50LFxuICAgICAgICAgICAgICAgIHRyaWdnZXJUeXBlOiB0cmlnZ2VyVHlwZVxuICAgICAgICAgICAgICAgICAgICA/IHRyaWdnZXJUeXBlXG4gICAgICAgICAgICAgICAgICAgIDogRGVmYXVsdC50cmlnZ2VyVHlwZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlRoZSB0b29sdGlwIGVsZW1lbnQgd2l0aCBpZCBcXFwiXCIuY29uY2F0KHRvb2x0aXBJZCwgXCJcXFwiIGRvZXMgbm90IGV4aXN0LiBQbGVhc2UgY2hlY2sgdGhlIGRhdGEtdG9vbHRpcC10YXJnZXQgYXR0cmlidXRlLlwiKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydCBkZWZhdWx0IFRvb2x0aXA7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnRlcmZhY2UuanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwZXMuanMubWFwIiwidmFyIEV2ZW50cyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBFdmVudHMoZXZlbnRUeXBlLCBldmVudEZ1bmN0aW9ucykge1xuICAgICAgICBpZiAoZXZlbnRGdW5jdGlvbnMgPT09IHZvaWQgMCkgeyBldmVudEZ1bmN0aW9ucyA9IFtdOyB9XG4gICAgICAgIHRoaXMuX2V2ZW50VHlwZSA9IGV2ZW50VHlwZTtcbiAgICAgICAgdGhpcy5fZXZlbnRGdW5jdGlvbnMgPSBldmVudEZ1bmN0aW9ucztcbiAgICB9XG4gICAgRXZlbnRzLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl9ldmVudEZ1bmN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChldmVudEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihfdGhpcy5fZXZlbnRUeXBlLCBldmVudEZ1bmN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gRXZlbnRzO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IEV2ZW50cztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV2ZW50cy5qcy5tYXAiLCJpbXBvcnQgRXZlbnRzIGZyb20gJy4vZG9tL2V2ZW50cyc7XG5pbXBvcnQgeyBpbml0QWNjb3JkaW9ucyB9IGZyb20gJy4vY29tcG9uZW50cy9hY2NvcmRpb24nO1xuaW1wb3J0IHsgaW5pdENvbGxhcHNlcyB9IGZyb20gJy4vY29tcG9uZW50cy9jb2xsYXBzZSc7XG5pbXBvcnQgeyBpbml0Q2Fyb3VzZWxzIH0gZnJvbSAnLi9jb21wb25lbnRzL2Nhcm91c2VsJztcbmltcG9ydCB7IGluaXREaXNtaXNzZXMgfSBmcm9tICcuL2NvbXBvbmVudHMvZGlzbWlzcyc7XG5pbXBvcnQgeyBpbml0RHJvcGRvd25zIH0gZnJvbSAnLi9jb21wb25lbnRzL2Ryb3Bkb3duJztcbmltcG9ydCB7IGluaXRNb2RhbHMgfSBmcm9tICcuL2NvbXBvbmVudHMvbW9kYWwnO1xuaW1wb3J0IHsgaW5pdERyYXdlcnMgfSBmcm9tICcuL2NvbXBvbmVudHMvZHJhd2VyJztcbmltcG9ydCB7IGluaXRUYWJzIH0gZnJvbSAnLi9jb21wb25lbnRzL3RhYnMnO1xuaW1wb3J0IHsgaW5pdFRvb2x0aXBzIH0gZnJvbSAnLi9jb21wb25lbnRzL3Rvb2x0aXAnO1xuaW1wb3J0IHsgaW5pdFBvcG92ZXJzIH0gZnJvbSAnLi9jb21wb25lbnRzL3BvcG92ZXInO1xuaW1wb3J0IHsgaW5pdERpYWxzIH0gZnJvbSAnLi9jb21wb25lbnRzL2RpYWwnO1xuLy8gc2V0dXAgZXZlbnRzIGZvciBkYXRhIGF0dHJpYnV0ZXNcbnZhciBldmVudHMgPSBuZXcgRXZlbnRzKCdsb2FkJywgW1xuICAgIGluaXRBY2NvcmRpb25zLFxuICAgIGluaXRDb2xsYXBzZXMsXG4gICAgaW5pdENhcm91c2VscyxcbiAgICBpbml0RGlzbWlzc2VzLFxuICAgIGluaXREcm9wZG93bnMsXG4gICAgaW5pdE1vZGFscyxcbiAgICBpbml0RHJhd2VycyxcbiAgICBpbml0VGFicyxcbiAgICBpbml0VG9vbHRpcHMsXG4gICAgaW5pdFBvcG92ZXJzLFxuICAgIGluaXREaWFscyxcbl0pO1xuZXZlbnRzLmluaXQoKTtcbi8vIGV4cG9ydCBhbGwgY29tcG9uZW50c1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBBY2NvcmRpb24gfSBmcm9tICcuL2NvbXBvbmVudHMvYWNjb3JkaW9uJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQ2Fyb3VzZWwgfSBmcm9tICcuL2NvbXBvbmVudHMvY2Fyb3VzZWwnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBDb2xsYXBzZSB9IGZyb20gJy4vY29tcG9uZW50cy9jb2xsYXBzZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIERpYWwgfSBmcm9tICcuL2NvbXBvbmVudHMvZGlhbCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIERpc21pc3MgfSBmcm9tICcuL2NvbXBvbmVudHMvZGlzbWlzcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIERyYXdlciB9IGZyb20gJy4vY29tcG9uZW50cy9kcmF3ZXInO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBEcm9wZG93biB9IGZyb20gJy4vY29tcG9uZW50cy9kcm9wZG93bic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE1vZGFsIH0gZnJvbSAnLi9jb21wb25lbnRzL21vZGFsJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUG9wb3ZlciB9IGZyb20gJy4vY29tcG9uZW50cy9wb3BvdmVyJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVGFicyB9IGZyb20gJy4vY29tcG9uZW50cy90YWJzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVG9vbHRpcCB9IGZyb20gJy4vY29tcG9uZW50cy90b29sdGlwJztcbi8vIGV4cG9ydCBhbGwgdHlwZXNcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9hY2NvcmRpb24vdHlwZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2Nhcm91c2VsL3R5cGVzJztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9jb2xsYXBzZS90eXBlcyc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvZGlhbC90eXBlcyc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvZGlzbWlzcy90eXBlcyc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvZHJhd2VyL3R5cGVzJztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9kcm9wZG93bi90eXBlcyc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvbW9kYWwvdHlwZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL3BvcG92ZXIvdHlwZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL3RhYnMvdHlwZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL3Rvb2x0aXAvdHlwZXMnO1xuLy8gZXhwb3J0IGFsbCBpbnRlcmZhY2VzXG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvYWNjb3JkaW9uL2ludGVyZmFjZSc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvY2Fyb3VzZWwvaW50ZXJmYWNlJztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9jb2xsYXBzZS9pbnRlcmZhY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2RpYWwvaW50ZXJmYWNlJztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9kaXNtaXNzL2ludGVyZmFjZSc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvZHJhd2VyL2ludGVyZmFjZSc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvZHJvcGRvd24vaW50ZXJmYWNlJztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9tb2RhbC9pbnRlcmZhY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL3BvcG92ZXIvaW50ZXJmYWNlJztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy90YWJzL2ludGVyZmFjZSc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvdG9vbHRpcC9pbnRlcmZhY2UnO1xuLy8gZXhwb3J0IGluaXQgZnVuY3Rpb25zXG5leHBvcnQgeyBpbml0QWNjb3JkaW9ucyB9IGZyb20gJy4vY29tcG9uZW50cy9hY2NvcmRpb24nO1xuZXhwb3J0IHsgaW5pdENhcm91c2VscyB9IGZyb20gJy4vY29tcG9uZW50cy9jYXJvdXNlbCc7XG5leHBvcnQgeyBpbml0Q29sbGFwc2VzIH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbGxhcHNlJztcbmV4cG9ydCB7IGluaXREaWFscyB9IGZyb20gJy4vY29tcG9uZW50cy9kaWFsJztcbmV4cG9ydCB7IGluaXREaXNtaXNzZXMgfSBmcm9tICcuL2NvbXBvbmVudHMvZGlzbWlzcyc7XG5leHBvcnQgeyBpbml0RHJhd2VycyB9IGZyb20gJy4vY29tcG9uZW50cy9kcmF3ZXInO1xuZXhwb3J0IHsgaW5pdERyb3Bkb3ducyB9IGZyb20gJy4vY29tcG9uZW50cy9kcm9wZG93bic7XG5leHBvcnQgeyBpbml0TW9kYWxzIH0gZnJvbSAnLi9jb21wb25lbnRzL21vZGFsJztcbmV4cG9ydCB7IGluaXRQb3BvdmVycyB9IGZyb20gJy4vY29tcG9uZW50cy9wb3BvdmVyJztcbmV4cG9ydCB7IGluaXRUYWJzIH0gZnJvbSAnLi9jb21wb25lbnRzL3RhYnMnO1xuZXhwb3J0IHsgaW5pdFRvb2x0aXBzIH0gZnJvbSAnLi9jb21wb25lbnRzL3Rvb2x0aXAnO1xuLy8gZXhwb3J0IGFsbCBpbml0IGZ1bmN0aW9uc1xuZXhwb3J0IHsgaW5pdEZsb3diaXRlIH0gZnJvbSAnLi9jb21wb25lbnRzL2luZGV4Jztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImltcG9ydCB7IE1vZGFsIH0gZnJvbSAnZmxvd2JpdGUnXG5pbXBvcnQgdHlwZSB7IE1vZGFsT3B0aW9ucywgTW9kYWxJbnRlcmZhY2UgfSBmcm9tICdmbG93Yml0ZSdcbmltcG9ydCBEYXRlcGlja2VyIGZyb20gJ2Zsb3diaXRlLWRhdGVwaWNrZXIvRGF0ZXBpY2tlcidcbmltcG9ydCB7IGVhc2VwaWNrIH0gZnJvbSAnQGVhc2VwaWNrL2J1bmRsZSdcblxuaW50ZXJmYWNlIElQcm9kdWN0IHtcbiAgaWQ6IG51bWJlclxuICBuYW1lOiBzdHJpbmdcbiAgc3VwcGxpZXJfaWQ6IG51bWJlclxuICBjdXJyZW5jeTogc3RyaW5nXG4gIHJlZ3VsYXJfcHJpY2U6IG51bWJlclxuICByZXRhaWxfcHJpY2U6IG51bWJlclxuICBpbWFnZTogc3RyaW5nXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmdcbiAgLy8gR2VuZXJhbCBJbmZvIC0+XG4gIFNLVTogc3RyaW5nXG4gIGxvd19zdG9ja19sZXZlbDogbnVtYmVyXG4gIHByb2dyYW1feWVhcjogbnVtYmVyXG4gIHBhY2thZ2VfcXR5OiBudW1iZXJcbiAgbnVtYl9vZl9pdGVtc19wZXJfY2FzZTogbnVtYmVyXG4gIG51bWJfb2ZfY2FzZXNfcGVyX291dGVyX2Nhc2U6IG51bWJlclxuICBjb21tZW50czogc3RyaW5nXG4gIC8vIHNoaXBwaW5nXG4gIHdlaWdodDogbnVtYmVyXG4gIGxlbmd0aDogbnVtYmVyXG4gIHdpZHRoOiBudW1iZXJcbiAgaGVpZ2h0OiBudW1iZXJcbiAgbXN0cl9ncm91cHNfZ3JvdXBzOiBvYmplY3RcbiAgY3VycmVudF91c2VyX2dyb3Vwczogb2JqZWN0XG4gIGdyb3Vwc19pZHM6IHtcbiAgICBbaW5kZXg6IHN0cmluZ106IG51bWJlclxuICB9XG4gIGF2YWlsYWJsZV9xdWFudGl0eToge1xuICAgIFtpbmRleDogc3RyaW5nXTogbnVtYmVyXG4gIH1cbiAgdG90YWxfYXZhaWxhYmxlX2l0ZW1zOiB7XG4gICAgW2luZGV4OiBzdHJpbmddOiBudW1iZXJcbiAgfVxuICBhbGxfd2FyZWhvdXNlczogW1xuICAgIHtcbiAgICAgIFtpbmRleDogc3RyaW5nXTogbnVtYmVyIHwgc3RyaW5nXG4gICAgfVxuICBdXG4gIG1zdHJfcHJvZF9ncnBzX3Byb2RfZ3Jwc19uYW1lczogeyBbaW5kZXg6IHN0cmluZ106IHsgZ3JvdXBfbmFtZTogc3RyaW5nOyBncm91cF9pZDogbnVtYmVyIH1bXSB9XG4gIG1zdHJfZ3Jwc19ncnBzX25hbWVzX2luX3Byb2Q6IHsgW2luZGV4OiBzdHJpbmddOiB7IGdyb3VwX25hbWU6IHN0cmluZzsgZ3JvdXBfaWQ6IG51bWJlciB9W10gfVxuICB3YXJlaG91c2VfcHJvZHVjdF9xdHk6IG51bWJlclxuICBwcm9kdWN0X2luX3dhcmVob3VzZXM6IHsgW2luZGV4OiBzdHJpbmddOiB7IFtpbmRleDogc3RyaW5nXTogbnVtYmVyIH0gfVxufVxuaW50ZXJmYWNlIEZpbHRlckpzb25EYXRhIHtcbiAgW2tleTogc3RyaW5nXTogc3RyaW5nXG59XG5cbmludGVyZmFjZSBJUHJvZHVjdE1hc3Rlckdyb3VwR3JvdXAge1xuICBbaW5kZXg6IHN0cmluZ106IHsgZ3JvdXBfbmFtZTogc3RyaW5nOyBncm91cF9pZDogbnVtYmVyIH1bXVxufVxuXG5pbnRlcmZhY2UgSU1hc3Rlckdyb3VwIHtcbiAgbmFtZTogc3RyaW5nXG4gIG1hc3Rlcl9ncm91cHNfbGlzdF9ncm91cHM6IHsgW2luZGV4OiBzdHJpbmddOiB7IGdyb3VwX25hbWU6IHN0cmluZzsgZ3JvdXBfaWQ6IG51bWJlciB9W10gfVxufVxuXG4vLyBnbG9iYWwgdmFyaWFibGUgZm9yIG1hbmRhdG9yeSBldmVudCBpbnN0YW5jZVxuY29uc3QgZXZlbnRDaGVja2JveDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXNob3ctZXZlbnRzLXRvZ2dsZS1idG4nKVxuY29uc3QgaXNFdmVudCA9IGV2ZW50Q2hlY2tib3guY2hlY2tlZFxuY29uc3QgZXZlbnRzV2FyZWhvdXNlID0gJ1dhcmVob3VzZSBFdmVudHMnXG5jb25zdCBldmVudE1hc3Rlckdyb3VwID0gJ0V2ZW50cydcblxuLy8gdmFyaWFibGUgdG8gc2V0IGRlZmF1bHQgaW1hZ2UgdG8gYnJhbmQgZHluYW1pY2FsbHkgaW4gbW9kYWwgd2luZG93LiBDYW4gd2UgZ2V0IGxpbmsgZnJvbSB0aGUgaW50ZXJuZXQ/XG5jb25zdCBkZWZhdWx0QnJhbmRJbWFnZSA9XG4gICdodHRwczovL2Z1bmtvLmNvbS9vbi9kZW1hbmR3YXJlLnN0YXRpYy8tL1NpdGVzLWZ1bmtvLW1hc3Rlci1jYXRhbG9nL2RlZmF1bHQvZHdiYjM4YTExMS9pbWFnZXMvZnVua28vdXBsb2FkLzU1OTk4X0NvY2FDb2xhX1MyX1Nwcml0ZUJvdHRsZUNhcF9QT1BfR0xBTS1XRUIucG5nJ1xuXG4vLyBjaGVjayBpZiBwcm9kdWN0IGhhcyBmaWx0ZXIgYW5kIGRpc3BsYXkgaXRcbmxldCBmaWx0ZXJKc29uRGF0YTogRmlsdGVySnNvbkRhdGEgPSB7fVxuY29uc3QgZmlsdGVySnNvbk9iamVjdCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2ZpbHRlckpzb25EYXRhJylcbmNvbnN0IGZpbHRlckRhdGEgPSBKU09OLnBhcnNlKGZpbHRlckpzb25PYmplY3QpXG5pZiAoZmlsdGVyRGF0YSAhPT0gbnVsbCB8fCBmaWx0ZXJEYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgY29uc3QgaXNWaXNpYmxlRmlsdGVySnNvbiA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2lzVmlzaWJsZUZpbHRlcicpXG4gIGxldCBpc1Zpc2libGVGaWx0ZXIgPSBKU09OLnBhcnNlKGlzVmlzaWJsZUZpbHRlckpzb24pXG4gIGlmIChpc1Zpc2libGVGaWx0ZXIpIHtcbiAgICBjb25zdCByZWZlcmVuY2VUaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXRhYmxlLXRoLXByb2R1Y3QtdHlwZScpXG4gICAgY29uc3QgcHJvZHVjdEl0ZW1UcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGUtcHJvZHVjdC1pdGVtLXRyJylcblxuICAgIGZvciAoY29uc3Qga2V5IGluIGZpbHRlckRhdGEpIHtcbiAgICAgIGNvbnN0IHByb2R1Y3RGaWx0ZXJUaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJylcbiAgICAgIHByb2R1Y3RGaWx0ZXJUaC5zZXRBdHRyaWJ1dGUoJ2lkJywgYHByb2R1Y3QtdGFibGUtZmlsdGVyLW1hc3Rlci1ncm91cC0ke2tleS5yZXBsYWNlKC8gL2csICdfJyl9YClcbiAgICAgIHByb2R1Y3RGaWx0ZXJUaC5jbGFzc0xpc3QuYWRkKCdweC02JywgJ3B5LTMnLCAnbWF4LXdpZHRoLTEwMCcpXG4gICAgICBwcm9kdWN0RmlsdGVyVGguc2V0QXR0cmlidXRlKCdzY29wZScsICdjb2wnKVxuICAgICAgcHJvZHVjdEZpbHRlclRoLmlubmVySFRNTCA9IGtleVxuICAgICAgcmVmZXJlbmNlVGgucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocHJvZHVjdEZpbHRlclRoLCByZWZlcmVuY2VUaC5uZXh0U2libGluZylcbiAgICB9XG5cbiAgICBwcm9kdWN0SXRlbVRycy5mb3JFYWNoKChwcm9kdWN0OiBIVE1MVGFibGVSb3dFbGVtZW50KSA9PiB7XG4gICAgICBjb25zdCByZWZlcmVuY2VUZCA9IHByb2R1Y3QuY2VsbHNbNF1cbiAgICAgIGNvbnN0IHByb2R1Y3RTS1UgPSBwcm9kdWN0LmNlbGxzWzNdLmlubmVyVGV4dFxuXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBmaWx0ZXJEYXRhKSB7XG4gICAgICAgIGNvbnN0IHByb2R1Y3RGaWx0ZXJOYW1lID0gZmlsdGVyRGF0YVtrZXldXG4gICAgICAgIGNvbnN0IHByb2R1Y3RGaWx0ZXJUZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJylcbiAgICAgICAgcHJvZHVjdEZpbHRlclRkLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAnaWQnLFxuICAgICAgICAgIGBwcm9kdWN0LXRhYmxlLWZpbHRlci0ke2tleX0tJHtwcm9kdWN0RmlsdGVyTmFtZS5yZXBsYWNlKC8gL2csICdfJyl9LSR7cHJvZHVjdFNLVS5yZXBsYWNlKC8gL2csICdfJyl9YFxuICAgICAgICApXG4gICAgICAgIHByb2R1Y3RGaWx0ZXJUZC5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgICd0ZXh0LWJhc2UnLFxuICAgICAgICAgICdmb250LW5vcm1hbCcsXG4gICAgICAgICAgJ3RleHQtZ3JheS05MDAnLFxuICAgICAgICAgICd3aGl0ZXNwYWNlLW5vd3JhcCcsXG4gICAgICAgICAgJ2Rhcms6dGV4dC13aGl0ZScsXG4gICAgICAgICAgJ21heC13aWR0aC0xMDAnXG4gICAgICAgIClcbiAgICAgICAgcHJvZHVjdEZpbHRlclRkLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInBsLTNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1zbVwiPiR7cHJvZHVjdEZpbHRlck5hbWV9PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgYFxuICAgICAgICByZWZlcmVuY2VUZC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShwcm9kdWN0RmlsdGVyVGQsIHJlZmVyZW5jZVRkLm5leHRTaWJsaW5nKVxuICAgICAgfVxuICAgIH0pXG4gICAgaXNWaXNpYmxlRmlsdGVyID0gZmFsc2VcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdpc1Zpc2libGVGaWx0ZXInLCBKU09OLnN0cmluZ2lmeShpc1Zpc2libGVGaWx0ZXIpKVxuICB9XG59XG5cbi8vZnVuY3Rpb24gdG8gZGlzcGxheSBmaWx0ZXIgYnkgbWFzdGVyIGdyb3VwIG9uIGxvYWQgcGFnZVxuY29uc3QgZ2xvYmFsRmlsdGVyTWFzdGVyR3JvdXAgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2dsb2JhbEZpbHRlck1hc3Rlckdyb3VwJykpXG5jb25zdCBwcm9kdWN0TWdHR2xvYmFsID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0TWdHJykpXG5cbmlmIChnbG9iYWxGaWx0ZXJNYXN0ZXJHcm91cCAmJiBnbG9iYWxGaWx0ZXJNYXN0ZXJHcm91cC5sZW5ndGggIT09IDApIHtcbiAgY29uc3QgZmlsdGVyUHJvZHVjdE1hc3Rlckdyb3VwQ2hlY2tib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0cy1maWx0ZXItcHJvZHVjdC1tYXN0ZXItZ3JvdXAtY2hlY2tib3gnKVxuICBmaWx0ZXJQcm9kdWN0TWFzdGVyR3JvdXBDaGVja2JveGVzLmZvckVhY2goKGNoZWNrYm94OiBIVE1MSW5wdXRFbGVtZW50KSA9PiB7XG4gICAgaWYgKGdsb2JhbEZpbHRlck1hc3Rlckdyb3VwLmluY2x1ZGVzKGNoZWNrYm94LnZhbHVlKSkge1xuICAgICAgY2hlY2tib3guY2hlY2tlZCA9IHRydWVcbiAgICB9XG4gIH0pXG4gIGZvciAoY29uc3QgbWFzdGVyR3JvdXBOYW1lIG9mIGdsb2JhbEZpbHRlck1hc3Rlckdyb3VwKSB7XG4gICAgY29uc3QgcmVmZXJlbmNlVGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC10YWJsZS10aC1wcm9kdWN0LXR5cGUnKVxuICAgIGNvbnN0IGlzR3JvdXBFeGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNwcm9kdWN0LXRhYmxlLWZpbHRlci1tYXN0ZXItZ3JvdXAtJHttYXN0ZXJHcm91cE5hbWV9YClcbiAgICBpZiAoIWlzR3JvdXBFeGlzdCkge1xuICAgICAgY29uc3QgcHJvZHVjdEZpbHRlclRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKVxuICAgICAgcHJvZHVjdEZpbHRlclRoLnNldEF0dHJpYnV0ZSgnaWQnLCBgcHJvZHVjdC10YWJsZS1maWx0ZXItbWFzdGVyLWdyb3VwLSR7bWFzdGVyR3JvdXBOYW1lfWApXG4gICAgICBjb25zdCBwcm9kdWN0SXRlbVRycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZS1wcm9kdWN0LWl0ZW0tdHInKVxuICAgICAgcHJvZHVjdEZpbHRlclRoLmNsYXNzTGlzdC5hZGQoJ3B4LTYnLCAncHktMycsICdtYXgtd2lkdGgtMTAwJylcbiAgICAgIHByb2R1Y3RGaWx0ZXJUaC5zZXRBdHRyaWJ1dGUoJ3Njb3BlJywgJ2NvbCcpXG4gICAgICBwcm9kdWN0RmlsdGVyVGguaW5uZXJIVE1MID0gbWFzdGVyR3JvdXBOYW1lLnJlcGxhY2UoL18vZywgJyAnKVxuICAgICAgcmVmZXJlbmNlVGgucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocHJvZHVjdEZpbHRlclRoLCByZWZlcmVuY2VUaC5uZXh0U2libGluZylcblxuICAgICAgcHJvZHVjdEl0ZW1UcnMuZm9yRWFjaCgocHJvZHVjdEl0ZW06IEhUTUxUYWJsZVJvd0VsZW1lbnQpID0+IHtcbiAgICAgICAgY29uc3QgcmVmZXJlbmNlVGQgPSBwcm9kdWN0SXRlbS5jZWxsc1s0XVxuICAgICAgICBjb25zdCBwcm9kdWN0U0tVID0gcHJvZHVjdEl0ZW0uY2VsbHNbM10uaW5uZXJUZXh0LnJlcGxhY2UoXCInXCIsICcnKVxuXG4gICAgICAgIGNvbnN0IHByb2R1Y3RGaWx0ZXJOYW1lID0gcHJvZHVjdE1nR0dsb2JhbFtwcm9kdWN0U0tVXVttYXN0ZXJHcm91cE5hbWVdIHx8ICctJ1xuICAgICAgICBjb25zdCBwcm9kdWN0RmlsdGVyVGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpXG4gICAgICAgIHByb2R1Y3RGaWx0ZXJUZC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgJ2lkJyxcbiAgICAgICAgICBgcHJvZHVjdC10YWJsZS1maWx0ZXItJHttYXN0ZXJHcm91cE5hbWV9LSR7cHJvZHVjdEZpbHRlck5hbWUucmVwbGFjZSgvIC9nLCAnXycpfS0ke3Byb2R1Y3RTS1UucmVwbGFjZShcbiAgICAgICAgICAgIC8gL2csXG4gICAgICAgICAgICAnXydcbiAgICAgICAgICApfWBcbiAgICAgICAgKVxuICAgICAgICBwcm9kdWN0RmlsdGVyVGQuY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAndGV4dC1iYXNlJyxcbiAgICAgICAgICAnZm9udC1ub3JtYWwnLFxuICAgICAgICAgICd0ZXh0LWdyYXktOTAwJyxcbiAgICAgICAgICAnd2hpdGVzcGFjZS1ub3dyYXAnLFxuICAgICAgICAgICdkYXJrOnRleHQtd2hpdGUnXG4gICAgICAgIClcbiAgICAgICAgcHJvZHVjdEZpbHRlclRkLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwbC0zXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXNtXCI+JHtwcm9kdWN0RmlsdGVyTmFtZX08L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIGBcbiAgICAgICAgcmVmZXJlbmNlVGQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocHJvZHVjdEZpbHRlclRkLCByZWZlcmVuY2VUZC5uZXh0U2libGluZylcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG5cbi8vIGZ1bmN0aW9uIHRvIGRpc3BsYXkgcHJvZHVjdCBtYXN0ZXIgZ3JvdXAgaW4gcHJvZHVjdCB0YWJsZVxuY29uc3QgY2hlY2tib3hGaWx0ZXJQcm9kdWN0TWFzdGVyR3JvdXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3RzLWZpbHRlci1wcm9kdWN0LW1hc3Rlci1ncm91cC1jaGVja2JveCcpXG5jaGVja2JveEZpbHRlclByb2R1Y3RNYXN0ZXJHcm91cHMuZm9yRWFjaCgoY2hlY2tib3gpID0+IHtcbiAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcbiAgICBjb25zdCBtYXN0ZXJHcm91cE5hbWUgPSBjaGVja2JveC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0LWdyb3VwLW5hbWUnKVxuICAgIGNvbnN0IHByb2R1Y3RNZ0cgPSBKU09OLnBhcnNlKGNoZWNrYm94LmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtcHJvZHVjdC1tZy1nJykpXG4gICAgY29uc3QgcmVmZXJlbmNlVGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC10YWJsZS10aC1wcm9kdWN0LXR5cGUnKVxuICAgIGNvbnN0IHByb2R1Y3RJdGVtVHJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlLXByb2R1Y3QtaXRlbS10cicpXG5cbiAgICBsZXQgaXNBY3RpdmUgPSAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkuY2hlY2tlZFxuICAgIGNvbnN0IGdsb2JhbEZpbHRlck1hc3Rlckdyb3VwID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdnbG9iYWxGaWx0ZXJNYXN0ZXJHcm91cCcpKVxuXG4gICAgaWYgKGlzQWN0aXZlKSB7XG4gICAgICBjb25zdCBmaWx0ZXJNYXN0ZXJHcm91cDogc3RyaW5nW10gPSBbXVxuICAgICAgZmlsdGVyTWFzdGVyR3JvdXAucHVzaChtYXN0ZXJHcm91cE5hbWUpXG4gICAgICBpZiAoZ2xvYmFsRmlsdGVyTWFzdGVyR3JvdXApIHtcbiAgICAgICAgZ2xvYmFsRmlsdGVyTWFzdGVyR3JvdXAuZm9yRWFjaCgoZWxlbWVudDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgaWYgKCFmaWx0ZXJNYXN0ZXJHcm91cC5pbmNsdWRlcyhlbGVtZW50KSkge1xuICAgICAgICAgICAgZmlsdGVyTWFzdGVyR3JvdXAucHVzaChlbGVtZW50KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2dsb2JhbEZpbHRlck1hc3Rlckdyb3VwJywgSlNPTi5zdHJpbmdpZnkoZmlsdGVyTWFzdGVyR3JvdXApKVxuICAgICAgY29uc3QgaXNHcm91cEV4aXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3Byb2R1Y3QtdGFibGUtZmlsdGVyLW1hc3Rlci1ncm91cC0ke21hc3Rlckdyb3VwTmFtZX1gKVxuICAgICAgaWYgKCFpc0dyb3VwRXhpc3QpIHtcbiAgICAgICAgY29uc3QgcHJvZHVjdEZpbHRlclRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKVxuICAgICAgICBwcm9kdWN0RmlsdGVyVGguc2V0QXR0cmlidXRlKCdpZCcsIGBwcm9kdWN0LXRhYmxlLWZpbHRlci1tYXN0ZXItZ3JvdXAtJHttYXN0ZXJHcm91cE5hbWV9YClcbiAgICAgICAgcHJvZHVjdEZpbHRlclRoLmNsYXNzTGlzdC5hZGQoJ3B4LTYnLCAncHktMycpXG4gICAgICAgIHByb2R1Y3RGaWx0ZXJUaC5zZXRBdHRyaWJ1dGUoJ3Njb3BlJywgJ2NvbCcpXG4gICAgICAgIHByb2R1Y3RGaWx0ZXJUaC5pbm5lckhUTUwgPSBtYXN0ZXJHcm91cE5hbWUucmVwbGFjZSgvXy9nLCAnICcpXG4gICAgICAgIHJlZmVyZW5jZVRoLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHByb2R1Y3RGaWx0ZXJUaCwgcmVmZXJlbmNlVGgubmV4dFNpYmxpbmcpXG4gICAgICAgIHByb2R1Y3RJdGVtVHJzLmZvckVhY2goKHByb2R1Y3RJdGVtOiBIVE1MVGFibGVSb3dFbGVtZW50KSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVmZXJlbmNlVGQgPSBwcm9kdWN0SXRlbS5jZWxsc1s0XVxuICAgICAgICAgIGNvbnN0IHByb2R1Y3RTS1UgPSBwcm9kdWN0SXRlbS5jZWxsc1szXS5pbm5lclRleHRcblxuICAgICAgICAgIGNvbnN0IHByb2R1Y3RGaWx0ZXJOYW1lID0gcHJvZHVjdE1nR1twcm9kdWN0U0tVXVttYXN0ZXJHcm91cE5hbWVdIHx8ICctJ1xuICAgICAgICAgIGNvbnN0IHByb2R1Y3RGaWx0ZXJUZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJylcbiAgICAgICAgICBwcm9kdWN0RmlsdGVyVGQuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgJ2lkJyxcbiAgICAgICAgICAgIGBwcm9kdWN0LXRhYmxlLWZpbHRlci0ke21hc3Rlckdyb3VwTmFtZX0tJHtwcm9kdWN0RmlsdGVyTmFtZS5yZXBsYWNlKC8gL2csICdfJyl9LSR7cHJvZHVjdFNLVS5yZXBsYWNlKFxuICAgICAgICAgICAgICAvIC9nLFxuICAgICAgICAgICAgICAnXydcbiAgICAgICAgICAgICl9YFxuICAgICAgICAgIClcbiAgICAgICAgICBwcm9kdWN0RmlsdGVyVGQuY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAgICd0ZXh0LWJhc2UnLFxuICAgICAgICAgICAgJ2ZvbnQtbm9ybWFsJyxcbiAgICAgICAgICAgICd0ZXh0LWdyYXktOTAwJyxcbiAgICAgICAgICAgICd3aGl0ZXNwYWNlLW5vd3JhcCcsXG4gICAgICAgICAgICAnZGFyazp0ZXh0LXdoaXRlJ1xuICAgICAgICAgIClcbiAgICAgICAgICBwcm9kdWN0RmlsdGVyVGQuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBsLTNcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtc21cIj4ke3Byb2R1Y3RGaWx0ZXJOYW1lfTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgYFxuICAgICAgICAgIHJlZmVyZW5jZVRkLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHByb2R1Y3RGaWx0ZXJUZCwgcmVmZXJlbmNlVGQubmV4dFNpYmxpbmcpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGlmICghaXNBY3RpdmUpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gZ2xvYmFsRmlsdGVyTWFzdGVyR3JvdXAuaW5kZXhPZihtYXN0ZXJHcm91cE5hbWUpXG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIGdsb2JhbEZpbHRlck1hc3Rlckdyb3VwLnNwbGljZShpbmRleCwgMSlcbiAgICAgIH1cbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2dsb2JhbEZpbHRlck1hc3Rlckdyb3VwJywgSlNPTi5zdHJpbmdpZnkoZ2xvYmFsRmlsdGVyTWFzdGVyR3JvdXApKVxuICAgICAgY29uc3QgaXNNYXN0ZXJHcm91cEV4aXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3Byb2R1Y3QtdGFibGUtZmlsdGVyLW1hc3Rlci1ncm91cC0ke21hc3Rlckdyb3VwTmFtZX1gKVxuICAgICAgaWYgKGlzTWFzdGVyR3JvdXBFeGlzdCkge1xuICAgICAgICBpc01hc3Rlckdyb3VwRXhpc3QucmVtb3ZlKClcbiAgICAgICAgcHJvZHVjdEl0ZW1UcnMuZm9yRWFjaCgocHJvZHVjdEl0ZW06IEhUTUxUYWJsZVJvd0VsZW1lbnQpID0+IHtcbiAgICAgICAgICBjb25zdCBwcm9kdWN0U0tVID0gcHJvZHVjdEl0ZW0uY2VsbHNbM10uaW5uZXJUZXh0XG4gICAgICAgICAgY29uc3QgcHJvZHVjdEZpbHRlck5hbWUgPSBwcm9kdWN0TWdHW3Byb2R1Y3RTS1VdW21hc3Rlckdyb3VwTmFtZV0gfHwgJy0nXG4gICAgICAgICAgY29uc3QgaXNQcm9kdWN0RmlsdGVyRXhpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgYCNwcm9kdWN0LXRhYmxlLWZpbHRlci0ke21hc3Rlckdyb3VwTmFtZX0tJHtwcm9kdWN0RmlsdGVyTmFtZS5yZXBsYWNlKC8gL2csICdfJyl9LSR7cHJvZHVjdFNLVS5yZXBsYWNlKFxuICAgICAgICAgICAgICAvIC9nLFxuICAgICAgICAgICAgICAnXydcbiAgICAgICAgICAgICl9YFxuICAgICAgICAgIClcbiAgICAgICAgICBpZiAoaXNQcm9kdWN0RmlsdGVyRXhpc3QpIHtcbiAgICAgICAgICAgIGlzUHJvZHVjdEZpbHRlckV4aXN0LnJlbW92ZSgpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfSlcbn0pXG5cbmNvbnN0IHByb2R1Y3RSZXF1ZXN0U2hhcmVCcmFuZFNlbGVjdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtcmVxdWVzdC1zaGFyZS1kZWZpbmUtYnJhbmQnKVxuY29uc3QgcHJvZHVjdFJlcXVlc3RTaGFyZUJyYW5kU2VsZWN0b3JPcHRpb25zID0gcHJvZHVjdFJlcXVlc3RTaGFyZUJyYW5kU2VsZWN0b3IucXVlcnlTZWxlY3RvckFsbCgnb3B0aW9uJylcbmNvbnN0IHByb2R1Y3RSZXF1ZXN0U2hhcmVCcmFuZFNlbGVjdG9yT3B0aW9uc0Ftb3VudCA9IHByb2R1Y3RSZXF1ZXN0U2hhcmVCcmFuZFNlbGVjdG9yT3B0aW9ucy5sZW5ndGhcbmlmICghcHJvZHVjdFJlcXVlc3RTaGFyZUJyYW5kU2VsZWN0b3JPcHRpb25zQW1vdW50KSB7XG4gIHByb2R1Y3RSZXF1ZXN0U2hhcmVCcmFuZFNlbGVjdG9yLmNsYXNzTGlzdC5hZGQoJ2JvcmRlci1lcnJvci1yZWQnKVxuICBcbiAgY29uc3QgbWVzc2FnZVBhcmFncmFwaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgbWVzc2FnZVBhcmFncmFwaC5jbGFzc0xpc3QuYWRkKCd0ZXh0LXNtJywgJ3RleHQtcmVkJylcbiAgbWVzc2FnZVBhcmFncmFwaC5pbm5lckhUTUwgPSBcIllvdSBoYXZlIG5vIGdyb3VwISBQbGVhc2UsIGRlZmluZSB5b3VyIGdyb3VwIDxhIGhyZWY9Jy91c2VyLycgY2xhc3M9J3VuZGVybGluZWQnPmhlcmU8L2E+XCI7XG4gIHByb2R1Y3RSZXF1ZXN0U2hhcmVCcmFuZFNlbGVjdG9yLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQobWVzc2FnZVBhcmFncmFwaCk7XG59XG5cblxuY29uc3QgJHJlcXVlc3RTaGFyZU1vZGFsRWxlbWVudDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVxdWVzdC1zaGFyZS1wcm9kdWN0LW1vZGFsJylcbmNvbnN0ICRzaGlwTW9kYWxFbGVtZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaGlwLXByb2R1Y3QtbW9kYWwnKVxuY29uc3QgJGFzc2lnbk1vZGFsRWxlbWVudDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXNzaWduLXByb2R1Y3QtbW9kYWwnKVxuY29uc3QgJGFkZFByb2R1Y3RNb2RhbEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1wcm9kdWN0LW1vZGFsJylcbmNvbnN0ICR2aWV3UHJvZHVjdE1vZGFsRWxlbWVudDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdmlldy1wcm9kdWN0LW1vZGFsJylcbmNvbnN0ICRhZGp1c3RQcm9kdWN0TW9kYWxFbGVtZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGp1c3QtcHJvZHVjdC1tb2RhbCcpXG5jb25zdCAkZWRpdFByb2R1Y3RNb2RhbEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXRQcm9kdWN0TW9kYWwnKVxuY29uc3QgJGV2ZW50UHJvZHVjdE1vZGFsRWxlbWVudDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZXZlbnQtcHJvZHVjdC1tb2RhbCcpXG5cbmNvbnN0IG1vZGFsT3B0aW9uczogTW9kYWxPcHRpb25zID0ge1xuICBwbGFjZW1lbnQ6ICdib3R0b20tcmlnaHQnLFxuICBiYWNrZHJvcDogJ2R5bmFtaWMnLFxuICBiYWNrZHJvcENsYXNzZXM6ICdiZy1ncmF5LTkwMCBiZy1vcGFjaXR5LTUwIGRhcms6Ymctb3BhY2l0eS04MCBmaXhlZCBpbnNldC0wIHotNDAnLFxuICBjbG9zYWJsZTogdHJ1ZSxcbiAgb25IaWRlOiAoKSA9PiB7XG4gICAgY29uc3QgcHJvZHVjdCA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UucHJvZHVjdClcbiAgICBjb25zdCBtc3RyR3JvdXBzRW50cmllcyA9IE9iamVjdC5lbnRyaWVzKHByb2R1Y3QubXN0cl9ncm91cHNfZ3JvdXBzKVxuXG4gICAgbXN0ckdyb3Vwc0VudHJpZXMuZm9yRWFjaCgoW2tleSwgdmFsdWVdOiBbc3RyaW5nLCBzdHJpbmddKSA9PiB7XG4gICAgICBkZWxldGVTaGlwQXNzaWduQnV0dG9uKHZhbHVlLnJlcGxhY2UoL1xccy9nLCAnXycpLCBrZXkpXG4gICAgfSlcbiAgICBjbGVhclByb2R1Y3RHcm91cENvbnRhaW5lcigpXG4gIH0sXG4gIG9uU2hvdzogKCkgPT4ge30sXG4gIG9uVG9nZ2xlOiAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ21vZGFsIGhhcyBiZWVuIHRvZ2dsZWQnKVxuICB9LFxufVxuXG5jb25zdCBhZGp1c3RNb2RhbE9wdGlvbnM6IE1vZGFsT3B0aW9ucyA9IHtcbiAgcGxhY2VtZW50OiAnYm90dG9tLXJpZ2h0JyxcbiAgYmFja2Ryb3A6ICdkeW5hbWljJyxcbiAgYmFja2Ryb3BDbGFzc2VzOiAnYmctZ3JheS05MDAgYmctb3BhY2l0eS01MCBkYXJrOmJnLW9wYWNpdHktODAgZml4ZWQgaW5zZXQtMCB6LTQwJyxcbiAgY2xvc2FibGU6IHRydWUsXG4gIG9uSGlkZTogKCkgPT4ge1xuICAgIGNvbnN0IHByb2R1Y3QgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLnByb2R1Y3QpXG4gICAgY29uc3QgbXN0ckdyb3Vwc0VudHJpZXMgPSBPYmplY3QuZW50cmllcyhwcm9kdWN0Lm1zdHJfZ3JvdXBzX2dyb3VwcylcblxuICAgIG1zdHJHcm91cHNFbnRyaWVzLmZvckVhY2goKFtrZXksIHZhbHVlXTogW3N0cmluZywgc3RyaW5nXSkgPT4ge1xuICAgICAgZGVsZXRlQWRqdXN0Q29udGFpbmVyKHZhbHVlLnJlcGxhY2UoL1xccy9nLCAnXycpLCBrZXkpXG4gICAgfSlcbiAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKCdwcm9kdWN0SW5XYXJlaG91c2VzJylcbiAgfSxcbiAgb25TaG93OiAoKSA9PiB7fSxcbiAgb25Ub2dnbGU6ICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnbW9kYWwgaGFzIGJlZW4gdG9nZ2xlZCcpXG4gIH0sXG59XG5cbmNvbnN0IG1vZGFsU2hpcEFzc2lnbk9wdGlvbnM6IE1vZGFsT3B0aW9ucyA9IHtcbiAgcGxhY2VtZW50OiAnYm90dG9tLXJpZ2h0JyxcbiAgYmFja2Ryb3A6ICdkeW5hbWljJyxcbiAgYmFja2Ryb3BDbGFzc2VzOiAnYmctZ3JheS05MDAgYmctb3BhY2l0eS01MCBkYXJrOmJnLW9wYWNpdHktODAgZml4ZWQgaW5zZXQtMCB6LTQwJyxcbiAgY2xvc2FibGU6IHRydWUsXG4gIG9uSGlkZTogKCkgPT4ge1xuICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ3Byb2R1Y3QnKVxuICB9LFxuICBvblNob3c6ICgpID0+IHt9LFxuICBvblRvZ2dsZTogKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdtb2RhbCBoYXMgYmVlbiB0b2dnbGVkJylcbiAgfSxcbn1cblxuY29uc3QgbW9kYWxFdmVudE9wdGlvbnM6IE1vZGFsT3B0aW9ucyA9IHtcbiAgcGxhY2VtZW50OiAnYm90dG9tLXJpZ2h0JyxcbiAgYmFja2Ryb3A6ICdkeW5hbWljJyxcbiAgYmFja2Ryb3BDbGFzc2VzOiAnYmctZ3JheS05MDAgYmctb3BhY2l0eS01MCBkYXJrOmJnLW9wYWNpdHktODAgZml4ZWQgaW5zZXQtMCB6LTUxJyxcbiAgY2xvc2FibGU6IHRydWUsXG4gIG9uSGlkZTogKCkgPT4ge1xuICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ3Byb2R1Y3QnKVxuICB9LFxuICBvblNob3c6ICgpID0+IHt9LFxuICBvblRvZ2dsZTogKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdtb2RhbCBoYXMgYmVlbiB0b2dnbGVkJylcbiAgfSxcbn1cblxuY29uc3QgZXZlbnRNb2RhbE9wdGlvbnM6IE1vZGFsT3B0aW9ucyA9IHtcbiAgcGxhY2VtZW50OiAnYm90dG9tLXJpZ2h0JyxcbiAgYmFja2Ryb3A6ICdkeW5hbWljJyxcbiAgYmFja2Ryb3BDbGFzc2VzOiAnYmctZ3JheS05MDAgYmctb3BhY2l0eS01MCBkYXJrOmJnLW9wYWNpdHktODAgZml4ZWQgaW5zZXQtMCB6LTUxJyxcbiAgY2xvc2FibGU6IHRydWUsXG4gIG9uSGlkZTogKCkgPT4ge1xuICAgIGNvbnN0IHByb2R1Y3QgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLnByb2R1Y3QpXG4gICAgY29uc3QgbXN0ckdyb3Vwc0VudHJpZXMgPSBPYmplY3QuZW50cmllcyhwcm9kdWN0Lm1zdHJfZ3JvdXBzX2dyb3VwcylcblxuICAgIG1zdHJHcm91cHNFbnRyaWVzLmZvckVhY2goKFtrZXksIHZhbHVlXTogW3N0cmluZywgc3RyaW5nXSkgPT4ge1xuICAgICAgZGVsZXRlU2hpcEFzc2lnbkJ1dHRvbih2YWx1ZS5yZXBsYWNlKC9cXHMvZywgJ18nKSwga2V5KVxuICAgIH0pXG4gICAgY2xlYXJQcm9kdWN0R3JvdXBDb250YWluZXIoKVxuICAgIHBpY2tlci5kZXN0cm95KClcbiAgfSxcbiAgb25TaG93OiAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ21vZGFsIGhhcyBiZWVuIHNob3duJylcbiAgfSxcbiAgb25Ub2dnbGU6ICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnbW9kYWwgaGFzIGJlZW4gdG9nZ2xlZCcpXG4gIH0sXG59XG5cbmNvbnN0IGFkZE1vZGFsOiBNb2RhbEludGVyZmFjZSA9IG5ldyBNb2RhbCgkYWRkUHJvZHVjdE1vZGFsRWxlbWVudCwgbW9kYWxPcHRpb25zKVxuY29uc3Qgdmlld01vZGFsOiBNb2RhbEludGVyZmFjZSA9IG5ldyBNb2RhbCgkdmlld1Byb2R1Y3RNb2RhbEVsZW1lbnQsIG1vZGFsT3B0aW9ucylcbmNvbnN0IGFkanVzdE1vZGFsOiBNb2RhbEludGVyZmFjZSA9IG5ldyBNb2RhbCgkYWRqdXN0UHJvZHVjdE1vZGFsRWxlbWVudCwgYWRqdXN0TW9kYWxPcHRpb25zKVxuY29uc3QgZWRpdE1vZGFsOiBNb2RhbEludGVyZmFjZSA9IG5ldyBNb2RhbCgkZWRpdFByb2R1Y3RNb2RhbEVsZW1lbnQsIG1vZGFsT3B0aW9ucylcbmNvbnN0IHJlcXVlc3RTaGFyZU1vZGFsOiBNb2RhbEludGVyZmFjZSA9IG5ldyBNb2RhbCgkcmVxdWVzdFNoYXJlTW9kYWxFbGVtZW50LCBtb2RhbFNoaXBBc3NpZ25PcHRpb25zKVxuY29uc3Qgc2hpcE1vZGFsOiBNb2RhbEludGVyZmFjZSA9IG5ldyBNb2RhbCgkc2hpcE1vZGFsRWxlbWVudCwgbW9kYWxTaGlwQXNzaWduT3B0aW9ucylcbmNvbnN0IGFzc2lnbk1vZGFsOiBNb2RhbEludGVyZmFjZSA9IG5ldyBNb2RhbCgkYXNzaWduTW9kYWxFbGVtZW50LCBtb2RhbFNoaXBBc3NpZ25PcHRpb25zKVxuY29uc3QgZXZlbnRNb2RhbDogTW9kYWxJbnRlcmZhY2UgPSBuZXcgTW9kYWwoJGV2ZW50UHJvZHVjdE1vZGFsRWxlbWVudCwgZXZlbnRNb2RhbE9wdGlvbnMpXG5cbmNvbnN0IGNsb3NpbmdBZGRNb2RhbEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtcHJvZHVjdC1tb2RhbC1jbG9zZS1idG4nKVxuY2xvc2luZ0FkZE1vZGFsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBhZGRNb2RhbC5oaWRlKClcbn0pXG5jb25zdCBjbG9zaW5nQWRqdXN0TW9kYWxCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRqdXN0LXByb2R1Y3QtbW9kYWwtY2xvc2UtYnRuJylcbmNsb3NpbmdBZGp1c3RNb2RhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgYWRqdXN0TW9kYWwuaGlkZSgpXG59KVxuY29uc3QgY2xvc2luZ0VkaXRNb2RhbEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0LXByb2R1Y3QtbW9kYWwtY2xvc2UtYnRuJylcbmNsb3NpbmdFZGl0TW9kYWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGVkaXRNb2RhbC5oaWRlKClcbn0pXG5jb25zdCBjbG9zaW5nVmlld01vZGFsQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXctcHJvZHVjdC1tb2RhbC1jbG9zZS1idG4nKVxuY2xvc2luZ1ZpZXdNb2RhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgdmlld01vZGFsLmhpZGUoKVxufSlcbmNvbnN0IGNsb3NpbmdFdmVudE1vZGFsQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V2ZW50LXByb2R1Y3QtbW9kYWwtY2xvc2UtYnRuJylcbmNsb3NpbmdFdmVudE1vZGFsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBldmVudE1vZGFsLmhpZGUoKVxufSlcblxuY29uc3QgJGJ1dHRvbkVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3QtZWRpdC1idXR0b24nKVxuJGJ1dHRvbkVsZW1lbnRzLmZvckVhY2goKGUpID0+XG4gIGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZWRpdFByb2R1Y3QoSlNPTi5wYXJzZShlLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKSkpXG4gIH0pXG4pXG5cbmNvbnN0ICRhZGRCdXR0b25FbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0LWFkZC1idXR0b24nKVxuJGFkZEJ1dHRvbkVsZW1lbnRzLmZvckVhY2goKGUpID0+XG4gIGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3QgZ3JvdXBzID0gSlNPTi5wYXJzZShlLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtZ3JvdXBzJykpXG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnZ3JvdXBzJywgSlNPTi5zdHJpbmdpZnkoZ3JvdXBzKSlcbiAgICBhZGRQcm9kdWN0KGdyb3VwcylcbiAgfSlcbilcblxuLy8gcGljayBkYXRlIHJhbmdlXG5jb25zdCB7IERhdGVUaW1lIH0gPSBlYXNlcGlja1xuZnVuY3Rpb24gZm9ybWF0RGF0ZShkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuICBjb25zdCBtb250aCA9IChkYXRlLmdldE1vbnRoKCkgKyAxKS50b1N0cmluZygpXG4gIGNvbnN0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpLnRvU3RyaW5nKClcbiAgcmV0dXJuIGAke3llYXJ9LSR7bW9udGh9LSR7ZGF5fWBcbn1cblxuZnVuY3Rpb24gZ2V0Rmlyc3RBbmRMYXN0RGF0ZSgpIHtcbiAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpXG4gIGNvbnN0IGZpZnRoRGF5QmVmb3JlID0gbmV3IERhdGUodG9kYXkpXG4gIGZpZnRoRGF5QmVmb3JlLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gNSlcbiAgY29uc3QgZmlmdGhEYXlBZnRlciA9IG5ldyBEYXRlKHRvZGF5KVxuICBmaWZ0aERheUFmdGVyLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpICsgNilcbiAgcmV0dXJuIFtmb3JtYXREYXRlKGZpZnRoRGF5QmVmb3JlKSwgZm9ybWF0RGF0ZShmaWZ0aERheUFmdGVyKV1cbn1cblxuY29uc3QgYm9va2VkRGF0ZXMgPSBbZ2V0Rmlyc3RBbmRMYXN0RGF0ZSgpXS5tYXAoKGQpID0+IHtcbiAgaWYgKGQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUoZFswXSlcbiAgICBjb25zdCBlbmQgPSBuZXcgRGF0ZShkWzFdKVxuICAgIHJldHVybiBbc3RhcnQsIGVuZF1cbiAgfVxuICByZXR1cm4gbmV3IERhdGVUaW1lKGQsICdZWVlZLU1NLUREJylcbn0pXG5cbmxldCBmZXRjaGVkQW1vdW50QnlEYXRlID0gW10gYXMgeyBkYXRlOiBzdHJpbmc7IHF1YW50aXR5OiBudW1iZXIgfVtdXG5cbmFzeW5jIGZ1bmN0aW9uIGdldEV2ZW50QXZhaWxhYmxlUXVhbnRpdHkocHJvZHVjdF9pZDogbnVtYmVyLCBncm91cDogc3RyaW5nLCBtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpIHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICBgL2V2ZW50L2dldF9hdmFpbGFibGVfcXVhbnRpdHk/bW9udGhfZnJvbT0ke1xuICAgICAgbW9udGggKyAxXG4gICAgfSZ5ZWFyX2Zyb209JHt5ZWFyfSZncm91cF9uYW1lPSR7Z3JvdXB9JnByb2R1Y3RfaWQ9JHtwcm9kdWN0X2lkfWBcbiAgKVxuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gIGZldGNoZWRBbW91bnRCeURhdGUgPSBkYXRhXG5cbiAgcmV0dXJuIGRhdGFcbn1cblxuLy8gc2VhcmNoIGZsb3dcbmNvbnN0IHNlYXJjaElucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RhYmxlLXNlYXJjaC1wcm9kdWN0cycpXG5jb25zdCBzZWFyY2hJbnB1dEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YWJsZS1zZWFyY2gtcHJvZHVjdC1idXR0b24nKVxuaWYgKHNlYXJjaElucHV0QnV0dG9uICYmIHNlYXJjaElucHV0KSB7XG4gIHNlYXJjaElucHV0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpXG4gICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoJ3EnLCBzZWFyY2hJbnB1dC52YWx1ZSlcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAke3VybC5ocmVmfWBcbiAgfSlcbn1cbmNvbnN0IGRlbGV0ZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGVsZXRlLXByb2R1Y3QtYnRuJylcblxuZGVsZXRlQnV0dG9ucy5mb3JFYWNoKChlKSA9PiB7XG4gIGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgaWYgKGNvbmZpcm0oJ0FyZSBzdXJlPycpKSB7XG4gICAgICBsZXQgaWQgPSBlLmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9kdWN0LWlkJylcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9wcm9kdWN0L2RlbGV0ZS8ke2lkfWAsIHtcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgIH0pXG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKVxuICAgICAgfVxuICAgIH1cbiAgfSlcbn0pXG5cbmZ1bmN0aW9uIGFkZFByb2R1Y3QoZ3JvdXBzOiBJUHJvZHVjdE1hc3Rlckdyb3VwR3JvdXApIHtcbiAgYWRkTW9kYWwuc2hvdygpXG4gIGNvbnN0IHByb2R1Y3RNYXN0ZXJHcm91cEFkZFNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICcjcHJvZHVjdC1tYXN0ZXItZ3JvdXAtYWRkLWFkZC1wcm9kdWN0LTEnXG4gIClcbiAgY29uc3Qgb3B0aW9ucyA9IHByb2R1Y3RNYXN0ZXJHcm91cEFkZFNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKCdvcHRpb24nKVxuXG4gIHByb2R1Y3RNYXN0ZXJHcm91cEFkZFNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgb3B0aW9ucy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICBpZiAoZS50ZXh0Q29udGVudCA9PT0gcHJvZHVjdE1hc3Rlckdyb3VwQWRkU2VsZWN0Lm9wdGlvbnNbcHJvZHVjdE1hc3Rlckdyb3VwQWRkU2VsZWN0LnNlbGVjdGVkSW5kZXhdLnRleHQpIHtcbiAgICAgICAgY29uc3QgZ3JvdXBTZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ncm91cC1hZGQtaXRlbS0xJylcbiAgICAgICAgY29uc3Qgb3B0aW9uQ2F0ZWdvcnkgPVxuICAgICAgICAgIGdyb3Vwc1twcm9kdWN0TWFzdGVyR3JvdXBBZGRTZWxlY3Qub3B0aW9uc1twcm9kdWN0TWFzdGVyR3JvdXBBZGRTZWxlY3Quc2VsZWN0ZWRJbmRleF0udGV4dF1cblxuICAgICAgICBncm91cFNlbGVjdC5pbm5lckhUTUwgPSAnJ1xuICAgICAgICBpZiAob3B0aW9uQ2F0ZWdvcnkpIHtcbiAgICAgICAgICBvcHRpb25DYXRlZ29yeS5mb3JFYWNoKChncm91cDogeyBncm91cF9uYW1lOiBzdHJpbmc7IGdyb3VwX2lkOiBudW1iZXIgfSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3RvcmVTZWxlY3RPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKVxuICAgICAgICAgICAgc3RvcmVTZWxlY3RPcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsIGdyb3VwLmdyb3VwX2lkLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICBzdG9yZVNlbGVjdE9wdGlvbi50ZXh0Q29udGVudCA9IGdyb3VwLmdyb3VwX25hbWVcbiAgICAgICAgICAgIGdyb3VwU2VsZWN0LmFwcGVuZENoaWxkKHN0b3JlU2VsZWN0T3B0aW9uKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9KVxufVxuXG5mdW5jdGlvbiBlZGl0UHJvZHVjdChwcm9kdWN0OiBJUHJvZHVjdCkge1xuICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdwcm9kdWN0JywgSlNPTi5zdHJpbmdpZnkocHJvZHVjdCkpXG5cbiAgY29uc3QgaW1nOiBIVE1MSW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC1zaG93LWltYWdlJylcbiAgY29uc3QgZnVsbEltYWdlQW5jaG9yID0gaW1nLmNsb3Nlc3QoJy5wcm9kdWN0LWZ1bGwtaW1hZ2UtYW5jaG9yJylcbiAgZnVsbEltYWdlQW5jaG9yLnNldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtcHJvZHVjdC1pZCcsIHByb2R1Y3QuaWQudG9TdHJpbmcoKSlcbiAgcHJvZHVjdC5pbWFnZS5sZW5ndGggPiAxMDAgPyAoaW1nLnNyYyA9IGBkYXRhOmltYWdlL3BuZztiYXNlNjQsICR7cHJvZHVjdC5pbWFnZX1gKSA6IChpbWcuc3JjID0gZGVmYXVsdEJyYW5kSW1hZ2UpXG4gIGxldCBpbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWVkaXQtbmFtZScpXG4gIGlucHV0LnZhbHVlID0gcHJvZHVjdC5uYW1lXG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC1pZCcpXG4gIGlucHV0LnZhbHVlID0gcHJvZHVjdC5pZC50b1N0cmluZygpXG4gIC8vIGEgbG9vcCB0aGF0IGFkZHMgYWRkaXRpb25hbCBmaWVsZHNcbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LWN1cnJlbmN5JylcbiAgcHJvZHVjdC5jdXJyZW5jeSA/IChpbnB1dC52YWx1ZSA9IHByb2R1Y3QuY3VycmVuY3kpIDogKGlucHV0LnZhbHVlID0gJ0Nob29zZSBDdXJyZW5jeScpXG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC1yZWd1bGFyX3ByaWNlJylcbiAgaW5wdXQudmFsdWUgPSBwcm9kdWN0LnJlZ3VsYXJfcHJpY2U/LnRvU3RyaW5nKCkgPz8gJzAnXG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC1yZXRhaWxfcHJpY2UnKVxuICBpbnB1dC52YWx1ZSA9IHByb2R1Y3QucmV0YWlsX3ByaWNlPy50b1N0cmluZygpID8/ICcwJ1xuICBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWVkaXQtZGVzY3JpcHRpb24nKVxuICBpbnB1dC52YWx1ZSA9IHByb2R1Y3QuZGVzY3JpcHRpb25cbiAgLy8gR2VuZXJhbCBJbmZvIC0+XG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC1TS1UnKVxuICBpbnB1dC52YWx1ZSA9IHByb2R1Y3QuU0tVXG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC1sb3dfc3RvY2tfbGV2ZWwnKVxuICBwcm9kdWN0Lmxvd19zdG9ja19sZXZlbCA/IChpbnB1dC52YWx1ZSA9IHByb2R1Y3QubG93X3N0b2NrX2xldmVsLnRvU3RyaW5nKCkpIDogKGlucHV0LnZhbHVlID0gJzAnKVxuXG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC1wcm9ncmFtX3llYXInKVxuICBwcm9kdWN0LnByb2dyYW1feWVhciA/IChpbnB1dC52YWx1ZSA9IHByb2R1Y3QucHJvZ3JhbV95ZWFyLnRvU3RyaW5nKCkpIDogKGlucHV0LnZhbHVlID0gJzAnKVxuICBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWVkaXQtcGFja2FnZV9xdHknKVxuICBwcm9kdWN0LnBhY2thZ2VfcXR5ID8gKGlucHV0LnZhbHVlID0gcHJvZHVjdC5wYWNrYWdlX3F0eS50b1N0cmluZygpKSA6IChpbnB1dC52YWx1ZSA9ICcwJylcbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LW51bWJfb2ZfaXRlbXNfcGVyX2Nhc2UnKVxuICBwcm9kdWN0Lm51bWJfb2ZfaXRlbXNfcGVyX2Nhc2UgPyAoaW5wdXQudmFsdWUgPSBwcm9kdWN0Lm51bWJfb2ZfaXRlbXNfcGVyX2Nhc2UudG9TdHJpbmcoKSkgOiAoaW5wdXQudmFsdWUgPSAnMCcpXG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC1udW1iX29mX2Nhc2VzX3Blcl9vdXRlcl9jYXNlJylcbiAgcHJvZHVjdC5udW1iX29mX2Nhc2VzX3Blcl9vdXRlcl9jYXNlXG4gICAgPyAoaW5wdXQudmFsdWUgPSBwcm9kdWN0Lm51bWJfb2ZfY2FzZXNfcGVyX291dGVyX2Nhc2UudG9TdHJpbmcoKSlcbiAgICA6IChpbnB1dC52YWx1ZSA9ICcwJylcbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LWNvbW1lbnRzJylcbiAgcHJvZHVjdC5jb21tZW50cyA/IChpbnB1dC52YWx1ZSA9IHByb2R1Y3QuY29tbWVudHMpIDogKGlucHV0LnZhbHVlID0gJ05vIGNvbW1lbnRzJylcbiAgLy8gc2hpcHBpbmdcbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LXdlaWdodCcpXG4gIHByb2R1Y3Qud2VpZ2h0ID8gKGlucHV0LnZhbHVlID0gcHJvZHVjdC53ZWlnaHQudG9TdHJpbmcoKSkgOiAoaW5wdXQudmFsdWUgPSAnMCcpXG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC1sZW5ndGgnKVxuICBwcm9kdWN0Lmxlbmd0aCA/IChpbnB1dC52YWx1ZSA9IHByb2R1Y3QubGVuZ3RoLnRvU3RyaW5nKCkpIDogKGlucHV0LnZhbHVlID0gJzAnKVxuICBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWVkaXQtd2lkdGgnKVxuICBwcm9kdWN0LndpZHRoID8gKGlucHV0LnZhbHVlID0gcHJvZHVjdC53aWR0aC50b1N0cmluZygpKSA6IChpbnB1dC52YWx1ZSA9ICcwJylcbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LWhlaWdodCcpXG4gIHByb2R1Y3QuaGVpZ2h0ID8gKGlucHV0LnZhbHVlID0gcHJvZHVjdC5oZWlnaHQudG9TdHJpbmcoKSkgOiAoaW5wdXQudmFsdWUgPSAnMCcpXG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC1uZXh0X3VybCcpXG4gIGlucHV0LnZhbHVlID0gd2luZG93LmxvY2F0aW9uLmhyZWZcblxuICBjb25zdCBwcm9kdWN0TWFzdGVyR3JvdXBFZGl0U2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgJyNwcm9kdWN0LW1hc3Rlci1ncm91cC1lZGl0LWFkZC1wcm9kdWN0LTEnXG4gIClcbiAgY29uc3Qgb3B0aW9ucyA9IHByb2R1Y3RNYXN0ZXJHcm91cEVkaXRTZWxlY3QucXVlcnlTZWxlY3RvckFsbCgnb3B0aW9uJylcbiAgY29uc3QgcHJvZHVjdE1hc3Rlckdyb3VwcyA9IE9iamVjdC5rZXlzKHByb2R1Y3QubXN0cl9ncnBzX2dycHNfbmFtZXNfaW5fcHJvZClcblxuICBpZiAocHJvZHVjdE1hc3Rlckdyb3Vwcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgcHJvZHVjdEdyb3Vwc0VkaXRTZWxlY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MU2VsZWN0RWxlbWVudD4oJy5wcm9kdWN0LWdyb3VwLWVkaXQtaXRlbScpXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2R1Y3RNYXN0ZXJHcm91cHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgIGNvbnN0IHByb2R1Y3RHcm91cHNFZGl0U2VsZWN0ID0gcHJvZHVjdEdyb3Vwc0VkaXRTZWxlY3RzW2ldXG5cbiAgICAgICAgcHJvZHVjdE1hc3Rlckdyb3VwRWRpdFNlbGVjdC52YWx1ZSA9IHByb2R1Y3RNYXN0ZXJHcm91cHNbaV1cblxuICAgICAgICBwcm9kdWN0Lm1zdHJfcHJvZF9ncnBzX3Byb2RfZ3Jwc19uYW1lc1twcm9kdWN0TWFzdGVyR3JvdXBzW2ldXS5mb3JFYWNoKFxuICAgICAgICAgIChncm91cDogeyBncm91cF9uYW1lOiBzdHJpbmc7IGdyb3VwX2lkOiBudW1iZXIgfSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3RvcmVTZWxlY3RPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKVxuICAgICAgICAgICAgc3RvcmVTZWxlY3RPcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsIGdyb3VwLmdyb3VwX2lkLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICBzdG9yZVNlbGVjdE9wdGlvbi50ZXh0Q29udGVudCA9IGdyb3VwLmdyb3VwX25hbWVcbiAgICAgICAgICAgIHByb2R1Y3RHcm91cHNFZGl0U2VsZWN0LmFwcGVuZENoaWxkKHN0b3JlU2VsZWN0T3B0aW9uKVxuICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgICAvLyBUT0RPOiBhbHdheXMgc2VsZWN0IGZpcnN0IG9wdGlvblxuICAgICAgICBwcm9kdWN0R3JvdXBzRWRpdFNlbGVjdC52YWx1ZSA9XG4gICAgICAgICAgcHJvZHVjdC5tc3RyX2dycHNfZ3Jwc19uYW1lc19pbl9wcm9kW3Byb2R1Y3RNYXN0ZXJHcm91cHNbaV1dWzBdLmdyb3VwX2lkLnRvU3RyaW5nKClcbiAgICAgICAgcHJvZHVjdE1hc3Rlckdyb3VwRWRpdFNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgb3B0aW9ucy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGUudGV4dENvbnRlbnQgPT09IHByb2R1Y3RNYXN0ZXJHcm91cEVkaXRTZWxlY3Qub3B0aW9uc1twcm9kdWN0TWFzdGVyR3JvdXBFZGl0U2VsZWN0LnNlbGVjdGVkSW5kZXhdLnRleHRcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjb25zdCBncm91cFNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWdyb3VwLWVkaXQtaXRlbS0xJylcbiAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uQ2F0ZWdvcnkgPVxuICAgICAgICAgICAgICAgIHByb2R1Y3QubXN0cl9wcm9kX2dycHNfcHJvZF9ncnBzX25hbWVzW1xuICAgICAgICAgICAgICAgICAgcHJvZHVjdE1hc3Rlckdyb3VwRWRpdFNlbGVjdC5vcHRpb25zW3Byb2R1Y3RNYXN0ZXJHcm91cEVkaXRTZWxlY3Quc2VsZWN0ZWRJbmRleF0udGV4dFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgZ3JvdXBTZWxlY3QuaW5uZXJIVE1MID0gJydcbiAgICAgICAgICAgICAgaWYgKG9wdGlvbkNhdGVnb3J5KSB7XG4gICAgICAgICAgICAgICAgb3B0aW9uQ2F0ZWdvcnkuZm9yRWFjaCgoZ3JvdXA6IHsgZ3JvdXBfbmFtZTogc3RyaW5nOyBncm91cF9pZDogbnVtYmVyIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHN0b3JlU2VsZWN0T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJylcbiAgICAgICAgICAgICAgICAgIHN0b3JlU2VsZWN0T3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBncm91cC5ncm91cF9pZC50b1N0cmluZygpKVxuICAgICAgICAgICAgICAgICAgc3RvcmVTZWxlY3RPcHRpb24udGV4dENvbnRlbnQgPSBncm91cC5ncm91cF9uYW1lXG4gICAgICAgICAgICAgICAgICBncm91cFNlbGVjdC5hcHBlbmRDaGlsZChzdG9yZVNlbGVjdE9wdGlvbilcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICBpZiAocHJvZHVjdC5tc3RyX2dycHNfZ3Jwc19uYW1lc19pbl9wcm9kW3Byb2R1Y3RNYXN0ZXJHcm91cHNbaV1dLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IHByb2R1Y3QubXN0cl9ncnBzX2dycHNfbmFtZXNfaW5fcHJvZFtwcm9kdWN0TWFzdGVyR3JvdXBzW2ldXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgY3JlYXRlUHJvZHVjdEdyb3VwRWRpdEl0ZW0obnVsbCwgcHJvZHVjdE1hc3Rlckdyb3Vwc1tpXSwgailcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9kdWN0Lm1zdHJfZ3Jwc19ncnBzX25hbWVzX2luX3Byb2RbcHJvZHVjdE1hc3Rlckdyb3Vwc1tpXV0ubGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHByb2R1Y3QubXN0cl9ncnBzX2dycHNfbmFtZXNfaW5fcHJvZFtwcm9kdWN0TWFzdGVyR3JvdXBzW2ldXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGNyZWF0ZVByb2R1Y3RHcm91cEVkaXRJdGVtKG51bGwsIHByb2R1Y3RNYXN0ZXJHcm91cHNbaV0sIGopXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNyZWF0ZVByb2R1Y3RHcm91cEVkaXRJdGVtKG51bGwsIHByb2R1Y3RNYXN0ZXJHcm91cHNbaV0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZWRpdE1vZGFsLnNob3coKVxuXG4gIHByb2R1Y3RNYXN0ZXJHcm91cEVkaXRTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgIG9wdGlvbnMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgaWYgKGUudGV4dENvbnRlbnQgPT09IHByb2R1Y3RNYXN0ZXJHcm91cEVkaXRTZWxlY3Qub3B0aW9uc1twcm9kdWN0TWFzdGVyR3JvdXBFZGl0U2VsZWN0LnNlbGVjdGVkSW5kZXhdLnRleHQpIHtcbiAgICAgICAgY29uc3QgZ3JvdXBTZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ncm91cC1lZGl0LWl0ZW0tMScpXG4gICAgICAgIGNvbnN0IG9wdGlvbkNhdGVnb3J5ID1cbiAgICAgICAgICBwcm9kdWN0Lm1zdHJfcHJvZF9ncnBzX3Byb2RfZ3Jwc19uYW1lc1tcbiAgICAgICAgICAgIHByb2R1Y3RNYXN0ZXJHcm91cEVkaXRTZWxlY3Qub3B0aW9uc1twcm9kdWN0TWFzdGVyR3JvdXBFZGl0U2VsZWN0LnNlbGVjdGVkSW5kZXhdLnRleHRcbiAgICAgICAgICBdXG5cbiAgICAgICAgZ3JvdXBTZWxlY3QuaW5uZXJIVE1MID0gJydcbiAgICAgICAgaWYgKG9wdGlvbkNhdGVnb3J5KSB7XG4gICAgICAgICAgb3B0aW9uQ2F0ZWdvcnkuZm9yRWFjaCgoZ3JvdXA6IHsgZ3JvdXBfbmFtZTogc3RyaW5nOyBncm91cF9pZDogbnVtYmVyIH0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN0b3JlU2VsZWN0T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJylcbiAgICAgICAgICAgIHN0b3JlU2VsZWN0T3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBncm91cC5ncm91cF9pZC50b1N0cmluZygpKVxuICAgICAgICAgICAgc3RvcmVTZWxlY3RPcHRpb24udGV4dENvbnRlbnQgPSBncm91cC5ncm91cF9uYW1lXG4gICAgICAgICAgICBncm91cFNlbGVjdC5hcHBlbmRDaGlsZChzdG9yZVNlbGVjdE9wdGlvbilcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSlcbn1cblxuY29uc3Qgdmlld1Byb2R1Y3RCdXR0b25FbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0LXZpZXctYnV0dG9uJylcbnZpZXdQcm9kdWN0QnV0dG9uRWxlbWVudHMuZm9yRWFjaCgoZSkgPT5cbiAgZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCBib29raW5nQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2R1Y3QtYm9va2luZy1idXR0b24nKVxuICAgIGlmIChib29raW5nQnV0dG9uKSB7XG4gICAgICBib29raW5nQnV0dG9uLnNldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnLCBlLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKSlcbiAgICB9XG4gICAgY29uc3QgcHJvZHVjdCA9IEpTT04ucGFyc2UoZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0JykpXG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgncHJvZHVjdCcsIEpTT04uc3RyaW5naWZ5KHByb2R1Y3QpKVxuICAgIGNvbnN0IHByb2RHcm91cHMgPSBPYmplY3Qua2V5cyhwcm9kdWN0Lm1zdHJfZ3JvdXBzX2dyb3VwcylcblxuICAgIHByb2RHcm91cHMuZm9yRWFjaCgoZ3JvdXBOYW1lKSA9PiB7XG4gICAgICBsZXQgaXNFcXVhbCA9IGZhbHNlXG5cbiAgICAgIGNvbnN0IG1zdHJHcm91cE5hbWUgPSBwcm9kdWN0Lm1zdHJfZ3JvdXBzX2dyb3Vwc1tncm91cE5hbWVdXG4gICAgICBpZiAocHJvZHVjdC5jdXJyZW50X3VzZXJfZ3JvdXBzLmhhc093blByb3BlcnR5KG1zdHJHcm91cE5hbWUpKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRVc2VyVmFsdWUgPSBwcm9kdWN0LmN1cnJlbnRfdXNlcl9ncm91cHNbbXN0ckdyb3VwTmFtZV1cbiAgICAgICAgaWYgKGN1cnJlbnRVc2VyVmFsdWUuaW5jbHVkZXMoZ3JvdXBOYW1lKSkge1xuICAgICAgICAgIGlzRXF1YWwgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtc3RyR3JvdXBOYW1lICE9PSBldmVudE1hc3Rlckdyb3VwIHx8IGlzRXZlbnQpIHtcbiAgICAgICAgYWRkU2hpcEFzc2lnblNoYXJlQnV0dG9uKGlzRXF1YWwsIG1zdHJHcm91cE5hbWUsIGdyb3VwTmFtZSwgcHJvZHVjdClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgbGV0IGRpdjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC12aWV3LW5hbWUnKVxuICAgIGRpdi5pbm5lckhUTUwgPSBwcm9kdWN0Lm5hbWVcbiAgICBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC12aWV3LWlkJylcbiAgICBkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5pZC50b1N0cmluZygpXG4gICAgY29uc3QgaW1nOiBIVE1MSW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtdmlldy1pbWFnZScpXG4gICAgY29uc3QgZnVsbEltYWdlQW5jaG9yID0gaW1nLmNsb3Nlc3QoJy5wcm9kdWN0LWZ1bGwtaW1hZ2UtYW5jaG9yJylcbiAgICBmdWxsSW1hZ2VBbmNob3Iuc2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldC1wcm9kdWN0LWlkJywgcHJvZHVjdC5pZC50b1N0cmluZygpKVxuICAgIHByb2R1Y3QuaW1hZ2UubGVuZ3RoID4gMTAwID8gKGltZy5zcmMgPSBgZGF0YTppbWFnZS9wbmc7YmFzZTY0LCAke3Byb2R1Y3QuaW1hZ2V9YCkgOiAoaW1nLnNyYyA9IGRlZmF1bHRCcmFuZEltYWdlKVxuICAgIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXZpZXctcmVndWxhcl9wcmljZScpXG4gICAgZGl2LmlubmVySFRNTCA9IHByb2R1Y3QucmVndWxhcl9wcmljZT8udG9TdHJpbmcoKSA/PyAnMCdcbiAgICBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC12aWV3LXJldGFpbF9wcmljZScpXG4gICAgZGl2LmlubmVySFRNTCA9IHByb2R1Y3QucmV0YWlsX3ByaWNlPy50b1N0cmluZygpID8/ICcwJ1xuICAgIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXZpZXctd2FyZWhvdXNlLXF0eScpXG4gICAgZGl2LmlubmVySFRNTCA9IHByb2R1Y3Qud2FyZWhvdXNlX3Byb2R1Y3RfcXR5LnRvU3RyaW5nKClcbiAgICAvLyBHZW5lcmFsIEluZm8gLT5cbiAgICBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC12aWV3LVNLVScpXG4gICAgZGl2LmlubmVySFRNTCA9IHByb2R1Y3QuU0tVXG4gICAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtdmlldy1wYWNrYWdlX3F0eScpXG4gICAgcHJvZHVjdC5wYWNrYWdlX3F0eSA/IChkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5wYWNrYWdlX3F0eS50b1N0cmluZygpKSA6IChkaXYuaW5uZXJIVE1MID0gJzAnKVxuICAgIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXZpZXctbnVtYl9vZl9pdGVtc19wZXJfY2FzZScpXG4gICAgcHJvZHVjdC5udW1iX29mX2l0ZW1zX3Blcl9jYXNlID8gKGRpdi5pbm5lckhUTUwgPSBwcm9kdWN0Lm51bWJfb2ZfaXRlbXNfcGVyX2Nhc2UudG9TdHJpbmcoKSkgOiAoZGl2LmlubmVySFRNTCA9ICcwJylcbiAgICBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC12aWV3LW51bWJfb2ZfY2FzZXNfcGVyX291dGVyX2Nhc2UnKVxuICAgIHByb2R1Y3QubnVtYl9vZl9jYXNlc19wZXJfb3V0ZXJfY2FzZVxuICAgICAgPyAoZGl2LmlubmVySFRNTCA9IHByb2R1Y3QubnVtYl9vZl9jYXNlc19wZXJfb3V0ZXJfY2FzZS50b1N0cmluZygpKVxuICAgICAgOiAoZGl2LmlubmVySFRNTCA9ICcwJylcbiAgICBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC12aWV3LWNvbW1lbnRzJylcbiAgICBwcm9kdWN0LmNvbW1lbnRzID8gKGRpdi5pbm5lckhUTUwgPSBwcm9kdWN0LmNvbW1lbnRzLnRvU3RyaW5nKCkpIDogKGRpdi5pbm5lckhUTUwgPSAnTm8gY29tbWVudHMnKVxuICAgIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXZpZXctbmV4dF91cmwnKVxuICAgIGRpdi5pbm5lckhUTUwgPSB3aW5kb3cubG9jYXRpb24uaHJlZlxuICAgIHZpZXdNb2RhbC5zaG93KClcbiAgfSlcbilcblxuY29uc3QgYWRqdXN0UHJvZHVjdEJ1dHRvbkVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3QtYWRqdXN0LWJ1dHRvbicpXG5hZGp1c3RQcm9kdWN0QnV0dG9uRWxlbWVudHMuZm9yRWFjaCgoZSkgPT5cbiAgZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCBwcm9kdWN0ID0gSlNPTi5wYXJzZShlLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKSlcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdwcm9kdWN0JywgSlNPTi5zdHJpbmdpZnkocHJvZHVjdCkpXG4gICAgY29uc3QgcHJvZEdyb3VwcyA9IE9iamVjdC5rZXlzKHByb2R1Y3QubXN0cl9ncm91cHNfZ3JvdXBzKVxuXG4gICAgcHJvZEdyb3Vwcy5mb3JFYWNoKChncm91cE5hbWUpID0+IHtcbiAgICAgIGxldCBpc0VxdWFsID0gZmFsc2VcblxuICAgICAgY29uc3QgbXN0ckdyb3VwTmFtZSA9IHByb2R1Y3QubXN0cl9ncm91cHNfZ3JvdXBzW2dyb3VwTmFtZV1cbiAgICAgIGlmIChwcm9kdWN0LmN1cnJlbnRfdXNlcl9ncm91cHMuaGFzT3duUHJvcGVydHkobXN0ckdyb3VwTmFtZSkpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFVzZXJWYWx1ZSA9IHByb2R1Y3QuY3VycmVudF91c2VyX2dyb3Vwc1ttc3RyR3JvdXBOYW1lXVxuICAgICAgICBpZiAoY3VycmVudFVzZXJWYWx1ZS5pbmNsdWRlcyhncm91cE5hbWUpKSB7XG4gICAgICAgICAgaXNFcXVhbCA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY3JlYXRlQWRqdXN0QWN0aW9uKGlzRXF1YWwsIG1zdHJHcm91cE5hbWUsIGdyb3VwTmFtZSwgcHJvZHVjdClcbiAgICB9KVxuXG4gICAgbGV0IGRpdjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1hZGp1c3QtbmFtZScpXG4gICAgZGl2LmlubmVySFRNTCA9IHByb2R1Y3QubmFtZVxuICAgIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWFkanVzdC1pZCcpXG4gICAgZGl2LmlubmVySFRNTCA9IHByb2R1Y3QuaWQudG9TdHJpbmcoKVxuICAgIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWFkanVzdC1TS1UnKVxuICAgIGRpdi5pbm5lckhUTUwgPSBwcm9kdWN0LlNLVVxuICAgIGNvbnN0IGltZzogSFRNTEltYWdlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWFkanVzdC1pbWFnZScpXG4gICAgY29uc3QgZnVsbEltYWdlQW5jaG9yID0gaW1nLmNsb3Nlc3QoJy5wcm9kdWN0LWZ1bGwtaW1hZ2UtYW5jaG9yJylcbiAgICBmdWxsSW1hZ2VBbmNob3Iuc2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldC1wcm9kdWN0LWlkJywgcHJvZHVjdC5pZC50b1N0cmluZygpKVxuICAgIHByb2R1Y3QuaW1hZ2UubGVuZ3RoID4gMTAwID8gKGltZy5zcmMgPSBgZGF0YTppbWFnZS9wbmc7YmFzZTY0LCAke3Byb2R1Y3QuaW1hZ2V9YCkgOiAoaW1nLnNyYyA9IGRlZmF1bHRCcmFuZEltYWdlKVxuICAgIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWFkanVzdC1uZXh0X3VybCcpXG4gICAgZGl2LmlubmVySFRNTCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmXG4gICAgYWRqdXN0TW9kYWwuc2hvdygpXG4gIH0pXG4pXG5cbi8vIGZ1bmN0aW9uIHRvIHJlcXVlc3Qgc2hhcmVcbmZ1bmN0aW9uIHJlcXVlc3RTaGFyZShwcm9kdWN0OiBJUHJvZHVjdCwgZ3JvdXA6IHN0cmluZykge1xuICBjb25zdCBpbWc6IEhUTUxJbWFnZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1yZXF1ZXN0LXNoYXJlLWltYWdlJylcbiAgY29uc3QgZnVsbEltYWdlQW5jaG9yID0gaW1nLmNsb3Nlc3QoJy5wcm9kdWN0LWZ1bGwtaW1hZ2UtYW5jaG9yJylcbiAgZnVsbEltYWdlQW5jaG9yLnNldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtcHJvZHVjdC1pZCcsIHByb2R1Y3QuaWQudG9TdHJpbmcoKSlcbiAgcHJvZHVjdC5pbWFnZS5sZW5ndGggPiAxMDAgPyAoaW1nLnNyYyA9IGBkYXRhOmltYWdlL3BuZztiYXNlNjQsICR7cHJvZHVjdC5pbWFnZX1gKSA6IChpbWcuc3JjID0gZGVmYXVsdEJyYW5kSW1hZ2UpXG4gIGxldCBkaXY6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtcmVxdWVzdC1zaGFyZS1uYW1lJylcbiAgZGl2LmlubmVySFRNTCA9IHByb2R1Y3QubmFtZVxuICBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1yZXF1ZXN0LXNoYXJlLXNrdScpXG4gIGRpdi5pbm5lckhUTUwgPSBwcm9kdWN0LlNLVVxuICBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1yZXF1ZXN0LXNoYXJlLWF2YWlsYWJsZS1xdWFudGl0eScpXG4gIGRpdi5pbm5lckhUTUwgPSBwcm9kdWN0LmF2YWlsYWJsZV9xdWFudGl0eVtncm91cC5yZXBsYWNlKCdfJywgJyAnKV0udG9TdHJpbmcoKVxuICBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1yZXF1ZXN0LXNoYXJlLW93bmVyJylcbiAgLy8gVE9ETyBjaGFuZ2UgdG8gc29tZXRoaW5nIG5vdCBoYXJkY29kZWQgaGVyZSBhbmQgaW4gcmVzdCBmdW5jc1xuICBkaXYuaW5uZXJIVE1MID0gJ01pa2UnXG4gIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXJlcXVlc3Qtc2hhcmUtcm9sZScpXG4gIGRpdi5pbm5lckhUTUwgPSAnQURNSU4nXG4gIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXJlcXVlc3Qtc2hhcmUtdG90YWwtYXZhaWxhYmxlLWl0ZW1zJylcbiAgZGl2LmlubmVySFRNTCA9IHByb2R1Y3QudG90YWxfYXZhaWxhYmxlX2l0ZW1zW2dyb3VwLnJlcGxhY2UoJ18nLCAnICcpXS50b1N0cmluZygpXG4gIGxldCBpbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXJlcXVlc3Qtc2hhcmUtcXVhbnRpdHknKVxuICBpbnB1dC5tYXggPSBwcm9kdWN0LmF2YWlsYWJsZV9xdWFudGl0eVtncm91cC5yZXBsYWNlKCdfJywgJyAnKV0udG9TdHJpbmcoKVxuICBpbnB1dC5taW4gPSAnMSdcbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1yZXF1ZXN0LXNoYXJlLW5hbWUtaGlkZGVuLWlucHV0JylcbiAgaW5wdXQudmFsdWUgPSBwcm9kdWN0Lm5hbWVcbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1yZXF1ZXN0LXNoYXJlLVNLVS1oaWRkZW4taW5wdXQnKVxuICBpbnB1dC52YWx1ZSA9IHByb2R1Y3QuU0tVXG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtcmVxdWVzdC1zaGFyZS1hdmFpbGFibGUtcXVhbnRpdHktaGlkZGVuLWlucHV0JylcbiAgaW5wdXQudmFsdWUgPSBwcm9kdWN0LmF2YWlsYWJsZV9xdWFudGl0eVtncm91cC5yZXBsYWNlKCdfJywgJyAnKV0udG9TdHJpbmcoKVxuICBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXJlcXVlc3Qtc2hhcmUtZnJvbS1ncm91cCcpXG4gIGlucHV0LnZhbHVlID0gZ3JvdXAucmVwbGFjZSgnXycsICcgJylcbiAgcmVxdWVzdFNoYXJlTW9kYWwuc2hvdygpXG59XG5cbi8vIGZ1bmN0aW9uIHRvIHNoaXBcbmZ1bmN0aW9uIHNoaXAocHJvZHVjdDogSVByb2R1Y3QsIGdyb3VwOiBzdHJpbmcpIHtcbiAgY29uc3QgaW1nOiBIVE1MSW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtc2hpcC1pbWFnZScpXG4gIGNvbnN0IGZ1bGxJbWFnZUFuY2hvciA9IGltZy5jbG9zZXN0KCcucHJvZHVjdC1mdWxsLWltYWdlLWFuY2hvcicpXG4gIGZ1bGxJbWFnZUFuY2hvci5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0LXByb2R1Y3QtaWQnLCBwcm9kdWN0LmlkLnRvU3RyaW5nKCkpXG4gIHByb2R1Y3QuaW1hZ2UubGVuZ3RoID4gMTAwID8gKGltZy5zcmMgPSBgZGF0YTppbWFnZS9wbmc7YmFzZTY0LCAke3Byb2R1Y3QuaW1hZ2V9YCkgOiAoaW1nLnNyYyA9IGRlZmF1bHRCcmFuZEltYWdlKVxuICBsZXQgZGl2OiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXNoaXAtbmFtZScpXG4gIGRpdi5pbm5lckhUTUwgPSBwcm9kdWN0Lm5hbWVcbiAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtc2hpcC1za3UnKVxuICBkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5TS1VcbiAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtc2hpcC1hdmFpbGFibGUtcXVhbnRpdHknKVxuICBkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5hdmFpbGFibGVfcXVhbnRpdHlbZ3JvdXAucmVwbGFjZSgnXycsICcgJyldLnRvU3RyaW5nKClcbiAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtc2hpcC10b3RhbC1hdmFpbGFibGUtaXRlbXMnKVxuICBkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC50b3RhbF9hdmFpbGFibGVfaXRlbXNbZ3JvdXAucmVwbGFjZSgnXycsICcgJyldLnRvU3RyaW5nKClcblxuICBsZXQgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1zaGlwLXByb2R1Y3QtaWQnKVxuICBpbnB1dC52YWx1ZSA9IHByb2R1Y3QuaWQudG9TdHJpbmcoKVxuICBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXNoaXAtZGVzaXJlLXF1YW50aXR5JylcbiAgaW5wdXQubWF4ID0gcHJvZHVjdC5hdmFpbGFibGVfcXVhbnRpdHlbZ3JvdXAucmVwbGFjZSgnXycsICcgJyldLnRvU3RyaW5nKClcbiAgaW5wdXQubWluID0gJzEnXG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtc2hpcC1ncm91cCcpXG4gIGlucHV0LnZhbHVlID0gZ3JvdXAucmVwbGFjZSgnXycsICcgJylcblxuICBzaGlwTW9kYWwuc2hvdygpXG5cbiAgLy8gLS0tLS1jb3VudCByZXN0IHF1YW50aXR5IGluIHNoaXAgcmVxdWVzdCBwcm9kdWN0IG1vZGFsLS0tLS0tXG4gIGNvbnN0IGRlc2lyZWRRdWFudGl0eUlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtc2hpcC1kZXNpcmUtcXVhbnRpdHknKVxuICBkZXNpcmVkUXVhbnRpdHlJbnB1dC5zZXRBdHRyaWJ1dGUoJ21heCcsIHByb2R1Y3QuYXZhaWxhYmxlX3F1YW50aXR5W2dyb3VwLnJlcGxhY2UoJ18nLCAnICcpXS50b1N0cmluZygpKVxuICBkZXNpcmVkUXVhbnRpdHlJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgY29uc3QgYXZhaWxhYmxlUXVhbnRpdHlEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1zaGlwLWF2YWlsYWJsZS1xdWFudGl0eScpXG4gICAgYXZhaWxhYmxlUXVhbnRpdHlEaXYudGV4dENvbnRlbnQgPSBwcm9kdWN0LmF2YWlsYWJsZV9xdWFudGl0eVtncm91cC5yZXBsYWNlKCdfJywgJyAnKV0udG9TdHJpbmcoKVxuICAgIGxldCBkZXNpcmVkUXVhbnRpdHkgPSBwYXJzZUludChkZXNpcmVkUXVhbnRpdHlJbnB1dC52YWx1ZSlcbiAgICBjb25zdCBhdmFpbGFibGVRdWFudGl0eSA9IHBhcnNlSW50KGF2YWlsYWJsZVF1YW50aXR5RGl2LnRleHRDb250ZW50KVxuICAgIGlmIChkZXNpcmVkUXVhbnRpdHkgPCAwKSB7XG4gICAgICBkZXNpcmVkUXVhbnRpdHlJbnB1dC52YWx1ZSA9ICcwJ1xuICAgIH0gZWxzZSBpZiAoZGVzaXJlZFF1YW50aXR5ID4gYXZhaWxhYmxlUXVhbnRpdHkpIHtcbiAgICAgIGRlc2lyZWRRdWFudGl0eUlucHV0LnZhbHVlID0gcHJvZHVjdC5hdmFpbGFibGVfcXVhbnRpdHlbZ3JvdXAucmVwbGFjZSgnXycsICcgJyldLnRvU3RyaW5nKClcbiAgICAgIGF2YWlsYWJsZVF1YW50aXR5RGl2LnRleHRDb250ZW50ID0gJzAnXG4gICAgfSBlbHNlIGlmIChkZXNpcmVkUXVhbnRpdHkpIHtcbiAgICAgIGF2YWlsYWJsZVF1YW50aXR5RGl2LnRleHRDb250ZW50ID0gKGF2YWlsYWJsZVF1YW50aXR5IC0gZGVzaXJlZFF1YW50aXR5KS50b1N0cmluZygpXG4gICAgfVxuICB9KVxufVxuXG5sZXQgcGlja2VyOiBEYXRlcGlja2VyXG5cbi8vIGZ1bmN0aW9uIHRvIGJvb2tpbmdcbmZ1bmN0aW9uIGJvb2tpbmcocHJvZHVjdDogSVByb2R1Y3QsIGdyb3VwOiBzdHJpbmcpIHtcbiAgY29uc3QgaW1nOiBIVE1MSW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZXZlbnQtaW1hZ2UnKVxuICBjb25zdCBmdWxsSW1hZ2VBbmNob3IgPSBpbWcuY2xvc2VzdCgnLnByb2R1Y3QtZnVsbC1pbWFnZS1hbmNob3InKVxuICBmdWxsSW1hZ2VBbmNob3Iuc2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldC1wcm9kdWN0LWlkJywgcHJvZHVjdC5pZC50b1N0cmluZygpKVxuICBwcm9kdWN0LmltYWdlLmxlbmd0aCA+IDEwMCA/IChpbWcuc3JjID0gYGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCwgJHtwcm9kdWN0LmltYWdlfWApIDogKGltZy5zcmMgPSBkZWZhdWx0QnJhbmRJbWFnZSlcbiAgbGV0IGRpdjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ldmVudC1uYW1lJylcbiAgZGl2LmlubmVySFRNTCA9IHByb2R1Y3QubmFtZVxuICBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ldmVudC1TS1UnKVxuICBkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5TS1VcblxuICBsZXQgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ldmVudC1ncm91cC1oaWRkZW4nKVxuICBpbnB1dC52YWx1ZSA9IGdyb3VwLnJlcGxhY2UoJ18nLCAnICcpXG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZXZlbnQtcHJvZHVjdC1pZCcpXG4gIGlucHV0LnZhbHVlID0gcHJvZHVjdC5pZC50b1N0cmluZygpXG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZXZlbnQtcXVhbnRpdHknKVxuICBpbnB1dC5taW4gPSAnMSdcbiAgaW5wdXQubWF4ID0gcHJvZHVjdC5hdmFpbGFibGVfcXVhbnRpdHlbZ3JvdXAucmVwbGFjZSgnXycsICcgJyldLnRvU3RyaW5nKClcblxuICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKClcblxuICBhc3luYyBmdW5jdGlvbiBjcmVhdGVEYXRlcGlja2VyKCkge1xuICAgIGNvbnN0IGZldGNoZWRBbW91bnRCeURhdGUgPSAoYXdhaXQgZ2V0RXZlbnRBdmFpbGFibGVRdWFudGl0eShcbiAgICAgIHByb2R1Y3QuaWQsXG4gICAgICBncm91cCxcbiAgICAgIGN1cnJlbnREYXRlLmdldE1vbnRoKCksXG4gICAgICBjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpXG4gICAgKSkgYXMge1xuICAgICAgZGF0ZTogc3RyaW5nXG4gICAgICBxdWFudGl0eTogbnVtYmVyXG4gICAgfVtdXG4gICAgcGlja2VyID0gbmV3IGVhc2VwaWNrLmNyZWF0ZSh7XG4gICAgICBlbGVtZW50OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0ZXBpY2tlcicpLFxuICAgICAgY3NzOiBbXG4gICAgICAgICdodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL0BlYXNlcGljay9idW5kbGVAMS4yLjEvZGlzdC9pbmRleC5jc3MnLFxuICAgICAgICAnaHR0cHM6Ly9lYXNlcGljay5jb20vY3NzL2RlbW9fcHJpY2VzLmNzcycsXG4gICAgICBdLFxuICAgICAgYXV0b0FwcGx5OiB0cnVlLFxuICAgICAgaW5saW5lOiB0cnVlLFxuICAgICAgcGx1Z2luczogWydMb2NrUGx1Z2luJ10sXG4gICAgICBMb2NrUGx1Z2luOiB7XG4gICAgICAgIGZpbHRlcihkYXRlOiBhbnkpIHtcbiAgICAgICAgICByZXR1cm4gZGF0ZS5pbkFycmF5KGJvb2tlZERhdGVzLCAnWyknKVxuICAgICAgICB9LFxuICAgICAgfSxcblxuICAgICAgc2V0dXAocGlja2VyOiBhbnkpIHtcbiAgICAgICAgY29uc3QgcmFuZG9tSW50ID0gKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcXVhbnRpdGllczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9XG5cbiAgICAgICAgZmV0Y2hlZEFtb3VudEJ5RGF0ZS5mb3JFYWNoKCh7IGRhdGUsIHF1YW50aXR5IH0pID0+IHtcbiAgICAgICAgICBxdWFudGl0aWVzW2RhdGVdID0gcXVhbnRpdHkudG9TdHJpbmcoKVxuICAgICAgICB9KVxuXG4gICAgICAgIHBpY2tlci5vbigndmlldycsIGFzeW5jIChldnQ6IGFueSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgdmlldywgZGF0ZSwgdGFyZ2V0IH0gPSBldnQuZGV0YWlsXG5cbiAgICAgICAgICBpZiAoKHZpZXcgYXMgc3RyaW5nKS50b0xvd2VyQ2FzZSgpICE9PSAnbWFpbicpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGRhdGUuc2V0TW9udGgoZGF0ZS5nZXRNb250aCgpIC0gMSlcblxuICAgICAgICAgIGNvbnN0IGNob3Nlbk1vbnRoID0gZGF0ZS5nZXRNb250aCgpXG4gICAgICAgICAgY29uc3QgY2hvc2VuWWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuXG4gICAgICAgICAgY29uc3QgZmV0Y2hlZEFtb3VudEJ5RGF0ZSA9IChhd2FpdCBnZXRFdmVudEF2YWlsYWJsZVF1YW50aXR5KHByb2R1Y3QuaWQsIGdyb3VwLCBjaG9zZW5Nb250aCwgY2hvc2VuWWVhcikpIGFzIHtcbiAgICAgICAgICAgIGRhdGU6IHN0cmluZ1xuICAgICAgICAgICAgcXVhbnRpdHk6IG51bWJlclxuICAgICAgICAgIH1bXVxuXG4gICAgICAgICAgZmV0Y2hlZEFtb3VudEJ5RGF0ZS5mb3JFYWNoKCh7IGRhdGUsIHF1YW50aXR5IH0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNwbGl0dGVkRGF0ZSA9IGRhdGUuc3BsaXQoJy0nKVxuICAgICAgICAgICAgc3BsaXR0ZWREYXRlWzFdID0gKHBhcnNlSW50KHNwbGl0dGVkRGF0ZVsxXSkgLSAxKS50b1N0cmluZygpXG5cbiAgICAgICAgICAgIGNvbnN0IGpzRGF0ZVN0cmluZyA9IHNwbGl0dGVkRGF0ZS5qb2luKCctJylcblxuICAgICAgICAgICAgY29uc3QganNEYXRlID0gbmV3IERhdGUoZGF0ZSlcblxuICAgICAgICAgICAganNEYXRlLnNldEhvdXJzKDAsIDAsIDApXG5cbiAgICAgICAgICAgIGNvbnN0IGRheUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lYXNlcGljay13cmFwcGVyJylcblxuICAgICAgICAgICAgY29uc3QgZGF5Q29udGFpbmVyU2hhZG93ID0gZGF5Q29udGFpbmVyLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihgZGl2W2RhdGEtdGltZT0nJHtqc0RhdGUuZ2V0VGltZSgpfSddYClcblxuICAgICAgICAgICAgaWYgKCFkYXlDb250YWluZXJTaGFkb3cpIHtcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHNwYW4gPSBkYXlDb250YWluZXJTaGFkb3cucXVlcnlTZWxlY3RvcignLmRheS1wcmljZScpID8/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICAgICAgc3Bhbi5jbGFzc05hbWUgPSAnZGF5LXByaWNlJ1xuICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSBxdWFudGl0eS50b1N0cmluZygpXG4gICAgICAgICAgICBkYXlDb250YWluZXJTaGFkb3cuYXBwZW5kKHNwYW4pXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgfSlcbiAgfVxuXG4gIGNyZWF0ZURhdGVwaWNrZXIoKVxuXG4gIHZpZXdNb2RhbC5oaWRlKClcbiAgZXZlbnRNb2RhbC5zaG93KClcbn1cblxuLy8gZnVuY3Rpb24gdG8gYXNzaWduXG5mdW5jdGlvbiBhc3NpZ24ocHJvZHVjdDogSVByb2R1Y3QsIGdyb3VwOiBzdHJpbmcpIHtcbiAgbGV0IGlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtYXNzaWduLW5hbWUnKVxuICBpbnB1dC52YWx1ZSA9IHByb2R1Y3QubmFtZVxuICBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWFzc2lnbi1hbW91bnQnKVxuICBpbnB1dC5tYXggPSBwcm9kdWN0LmF2YWlsYWJsZV9xdWFudGl0eVtncm91cC5yZXBsYWNlKCdfJywgJyAnKV0udG9TdHJpbmcoKVxuICBpbnB1dC5taW4gPSAnMSdcbiAgY29uc3QgZ3JvdXBOYW1lID0gZ3JvdXAucmVwbGFjZSgnXycsICcgJylcbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1hc3NpZ24tZnJvbS1ncm91cCcpXG4gIGlucHV0LnZhbHVlID0gZ3JvdXBOYW1lXG5cbiAgY29uc3QgZ3JvdXBfaWQgPSBwcm9kdWN0Lmdyb3Vwc19pZHNbZ3JvdXBOYW1lXVxuICBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWFzc2lnbi1mcm9tLWdyb3VwX2lkJylcbiAgaW5wdXQudmFsdWUgPSBncm91cF9pZC50b1N0cmluZygpXG4gIGFzc2lnbk1vZGFsLnNob3coKVxufVxuXG4vLyBmdW5jdGlvbiB0byBkZWxldGUgc2hpcCBhc3NpZ24gc2hhcmUgYnV0dG9uXG5mdW5jdGlvbiBkZWxldGVTaGlwQXNzaWduQnV0dG9uKG5hbWVHcm91cDogc3RyaW5nLCBuYW1lR3JvdXBWYWx1ZTogc3RyaW5nKSB7XG4gIGNvbnN0IHNoaXBBc3NpZ25TaGFyZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgYCNwcm9kdWN0LXNoaXAtYXNzaWduLXNoYXJlLWNvbnRhaW5lci0ke25hbWVHcm91cC5yZXBsYWNlKC8gL2csICdfJyl9YFxuICApXG4gIGNvbnN0IGdyb3VwQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBgI3Byb2R1Y3Qtdmlldy1wcm9kdWN0X2dyb3VwLWNvbnRhaW5lci0ke25hbWVHcm91cFZhbHVlLnJlcGxhY2UoLyAvZywgJ18nKX1gXG4gIClcbiAgaWYgKHNoaXBBc3NpZ25TaGFyZUNvbnRhaW5lcikge1xuICAgIHNoaXBBc3NpZ25TaGFyZUNvbnRhaW5lci5yZW1vdmUoKVxuICB9XG4gIGlmIChncm91cENvbnRhaW5lcikge1xuICAgIGdyb3VwQ29udGFpbmVyLnJlbW92ZSgpXG4gIH1cbn1cblxuLy8gZnVuY3Rpb24gdG8gYWRkIHNoaXAsIGFzc2lnbiwgYnV0dG9uIHRvIHZpZXcgcHJvZHVjdCBtb2RhbFxuZnVuY3Rpb24gYWRkU2hpcEFzc2lnblNoYXJlQnV0dG9uKGlzRXF1YWw6IGJvb2xlYW4sIG1hc3Rlckdyb3VwOiBzdHJpbmcsIGdyb3VwOiBzdHJpbmcsIHByb2R1Y3RQYXJhbTogSVByb2R1Y3QpIHtcbiAgY29uc3QgZXZlbnRDaGVja2JveDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXNob3ctZXZlbnRzLXRvZ2dsZS1idG4nKVxuICBjb25zdCBpc0V2ZW50ID0gZXZlbnRDaGVja2JveC5jaGVja2VkICYmIG1hc3Rlckdyb3VwID09PSBldmVudE1hc3Rlckdyb3VwXG4gIGNvbnN0IGdyb3VwVW5kZXJTY29yZSA9IGdyb3VwLnJlcGxhY2UoLyAvZywgJ18nKVxuICBjb25zdCBncm91cFByb2R1Y3RJZHMgPSBwcm9kdWN0UGFyYW0uZ3JvdXBzX2lkc1xuICBjb25zdCBwcm9kdWN0VHlwZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNwcm9kdWN0LXZpZXctcHJvZHVjdC1uYW1lLWNvbnRhaW5lcmApXG4gIGNvbnN0IHNoaXBBc3NpZ25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBzaGlwQXNzaWduQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3NtOmNvbC1zcGFuLTMnLCAnZmxleCcsICdnYXAtNCcpXG4gIHNoaXBBc3NpZ25Db250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsIGBwcm9kdWN0LXNoaXAtYXNzaWduLXNoYXJlLWNvbnRhaW5lci0ke21hc3Rlckdyb3VwLnJlcGxhY2UoLyAvZywgJ18nKX1gKVxuICBjb25zdCBzaGlwQXNzaWduQ29udGFpbmVyRGl2ID0gYFxuICAgIDxkaXY+XG4gICAgICA8bGFiZWwgZm9yPVwibmFtZVwiIGNsYXNzPVwiYmxvY2sgbWItMiB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDAgZGFyazp0ZXh0LXdoaXRlXCI+QXZhaWxhYmxlPC9sYWJlbD5cbiAgICAgICAgPGRpdiBpZD1cInNoaXAtcHJvZHVjdC1xdWFudGl0eVwiXG4gICAgICAgICAgY2xhc3M9XCJzaGFkb3ctc20gYmctZ3JheS01MCBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHRleHQtZ3JheS05MDAgdGV4dC1zbSByb3VuZGVkLWxnIGZvY3VzOnJpbmctYmx1ZS02MDAgZm9jdXM6Ym9yZGVyLWJsdWUtNjAwIGJsb2NrIHctZnVsbCBwLTIuNSBkYXJrOmJnLWdyYXktNjAwIGRhcms6Ym9yZGVyLWdyYXktNTAwIGRhcms6cGxhY2Vob2xkZXItZ3JheS00MDAgZGFyazp0ZXh0LXdoaXRlIGRhcms6Zm9jdXM6cmluZy1ibHVlLTUwMCBkYXJrOmZvY3VzOmJvcmRlci1ibHVlLTUwMFwiPlxuICAgICAgJHtwcm9kdWN0UGFyYW0uYXZhaWxhYmxlX3F1YW50aXR5W2dyb3VwXSB8fCAwfTwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXY+XG4gICAgICA8bGFiZWwgZm9yPVwicHJvZHVjdF9ncm91cFwiIGNsYXNzPVwiYmxvY2sgbWItMiB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDAgZGFyazp0ZXh0LXdoaXRlXCIgPkFjdGlvbjwvbGFiZWwgPlxuICAgICAgPGJ1dHRvbiBzaGlwLWdyb3VwLWRhdGE9JHtncm91cFVuZGVyU2NvcmV9IHR5cGU9XCJidXR0b25cIiBpZD1cInNoaXAtcHJvZHVjdC1idXR0b24tJHtncm91cFVuZGVyU2NvcmV9XCIgY2xhc3M9XCJzaGlwLXByb2R1Y3QtYnV0dG9uIGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBtci0yIHB4LTMgcHktMi41IHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1jZW50ZXIgdGV4dC13aGl0ZSByb3VuZGVkLWxnIGJnLXllbGxvdy00MDAgaG92ZXI6YmcteWVsbG93LTUwMCBmb2N1czpyaW5nLTQgZm9jdXM6cmluZy1yZWQtMzAwIGRhcms6Zm9jdXM6cmluZy1yZWQtOTAwXCI+XG4gICAgICAgIDxzdmcgY2xhc3M9XCJ3LTQgaC00IG1yLTJcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTTE3LjQxNCAyLjU4NmEyIDIgMCAwMC0yLjgyOCAwTDcgMTAuMTcyVjEzaDIuODI4bDcuNTg2LTcuNTg2YTIgMiAwIDAwMC0yLjgyOHpcIj48L3BhdGg+PHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMiA2YTIgMiAwIDAxMi0yaDRhMSAxIDAgMDEwIDJINHYxMGgxMHYtNGExIDEgMCAxMTIgMHY0YTIgMiAwIDAxLTIgMkg0YTIgMiAwIDAxLTItMlY2elwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIj48L3BhdGg+PC9zdmc+XG4gICAgICAgIFNoaXBcbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBhc3NpZ24tZ3JvdXAtZGF0YT0ke2dyb3VwVW5kZXJTY29yZX0gdHlwZT1cImJ1dHRvblwiIGlkPVwiYXNzaWduLXByb2R1Y3QtYnV0dG9uLSR7Z3JvdXBVbmRlclNjb3JlfVwiIGNsYXNzPVwiYXNzaWduLXByb2R1Y3QtYnV0dG9uIGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBweC0zIHB5LTIuNSB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtY2VudGVyIHRleHQtd2hpdGUgcm91bmRlZC1sZyBiZy1ibHVlLTcwMCBob3ZlcjpiZy1ibHVlLTgwMCBmb2N1czpyaW5nLTQgZm9jdXM6cmluZy1ibHVlLTMwMCBkYXJrOmJnLWJsdWUtNjAwIGRhcms6aG92ZXI6YmctYmx1ZS03MDAgZGFyazpmb2N1czpyaW5nLWJsdWUtODAwXCI+XG4gICAgICAgIDxzdmcgY2xhc3M9XCJ3LTQgaC00IG1yLTJcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTTE3LjQxNCAyLjU4NmEyIDIgMCAwMC0yLjgyOCAwTDcgMTAuMTcyVjEzaDIuODI4bDcuNTg2LTcuNTg2YTIgMiAwIDAwMC0yLjgyOHpcIj48L3BhdGg+PHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMiA2YTIgMiAwIDAxMi0yaDRhMSAxIDAgMDEwIDJINHYxMGgxMHYtNGExIDEgMCAxMTIgMHY0YTIgMiAwIDAxLTIgMkg0YTIgMiAwIDAxLTItMlY2elwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIj48L3BhdGg+PC9zdmc+XG4gICAgICAgIEFzc2lnblxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIGBcbiAgY29uc3QgYm9va2luZ0NvbnRhaW5lckRpdiA9IGBcbiAgICAgICAgPGRpdj5cbiAgICAgICAgPGxhYmVsIGZvcj1cInByb2R1Y3RfZ3JvdXBcIiBjbGFzcz1cImJsb2NrIG1iLTIgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktOTAwIGRhcms6dGV4dC13aGl0ZVwiID5BY3Rpb248L2xhYmVsID5cbiAgICAgICAgPGJ1dHRvbiBzaGlwLWdyb3VwLWRhdGE9JHtncm91cFVuZGVyU2NvcmV9IHR5cGU9XCJidXR0b25cIiBpZD1cImJvb2tpbmctcHJvZHVjdC1idXR0b24tJHtncm91cFVuZGVyU2NvcmV9XCIgY2xhc3M9XCJib29raW5nLXByb2R1Y3QtYnV0dG9uIGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBtci0yIHB4LTMgcHktMi41IHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1jZW50ZXIgdGV4dC13aGl0ZSByb3VuZGVkLWxnIGJnLWJsdWUtNzAwIGhvdmVyOmJnLWJsdWUtODAwIGZvY3VzOnJpbmctNCBmb2N1czpyaW5nLWJsdWUtMzAwIGRhcms6YmctYmx1ZS02MDAgZGFyazpob3ZlcjpiZy1ibHVlLTcwMCBkYXJrOmZvY3VzOnJpbmctYmx1ZS04MDBcIj5cbiAgICAgICAgICAgIDxzdmcgY2xhc3M9XCJ3LTQgaC00IG1yLTJcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCA0NDggNTEyXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgICBkPVwiTTEyOCAwYzEzLjMgMCAyNCAxMC43IDI0IDI0VjY0SDI5NlYyNGMwLTEzLjMgMTAuNy0yNCAyNC0yNHMyNCAxMC43IDI0IDI0VjY0aDQwYzM1LjMgMCA2NCAyOC43IDY0IDY0djE2IDQ4VjQ0OGMwIDM1LjMtMjguNyA2NC02NCA2NEg2NGMtMzUuMyAwLTY0LTI4LjctNjQtNjRWMTkyIDE0NCAxMjhDMCA5Mi43IDI4LjcgNjQgNjQgNjRoNDBWMjRjMC0xMy4zIDEwLjctMjQgMjQtMjR6TTQwMCAxOTJINDhWNDQ4YzAgOC44IDcuMiAxNiAxNiAxNkgzODRjOC44IDAgMTYtNy4yIDE2LTE2VjE5MnpNMzI5IDI5N0wyMTcgNDA5Yy05LjQgOS40LTI0LjYgOS40LTMzLjkgMGwtNjQtNjRjLTkuNC05LjQtOS40LTI0LjYgMC0zMy45czI0LjYtOS40IDMzLjkgMGw0NyA0NyA5NS05NWM5LjQtOS40IDI0LjYtOS40IDMzLjkgMHM5LjQgMjQuNiAwIDMzLjl6XCJcbiAgICAgICAgICAgICAgICBjbGlwLXJ1bGU9XCJldmVub2RkXCI+PC9wYXRoPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICBCb29raW5nXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICBgXG4gIGlzRXZlbnRcbiAgICA/IChzaGlwQXNzaWduQ29udGFpbmVyLmlubmVySFRNTCA9IGJvb2tpbmdDb250YWluZXJEaXYpXG4gICAgOiAoc2hpcEFzc2lnbkNvbnRhaW5lci5pbm5lckhUTUwgPSBzaGlwQXNzaWduQ29udGFpbmVyRGl2KVxuICBjb25zdCBzaGFyZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGNvbnN0IHNoaXBQcm9kdWN0QnRuID0gc2hpcEFzc2lnbkNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKGAjc2hpcC1wcm9kdWN0LWJ1dHRvbi0ke2dyb3VwVW5kZXJTY29yZX1gKVxuICBjb25zdCBhc3NpZ25Qcm9kdWN0QnRuID0gc2hpcEFzc2lnbkNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKGAjYXNzaWduLXByb2R1Y3QtYnV0dG9uLSR7Z3JvdXBVbmRlclNjb3JlfWApXG5cbiAgc2hhcmVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc206Y29sLXNwYW4tMycsICdmbGV4JywgJ2dhcC00JylcbiAgc2hhcmVDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsIGBwcm9kdWN0LXNoaXAtYXNzaWduLXNoYXJlLWNvbnRhaW5lci0ke21hc3Rlckdyb3VwLnJlcGxhY2UoLyAvZywgJ18nKX1gKVxuICBzaGFyZUNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgPGRpdj5cbiAgICAgIDxsYWJlbCBmb3I9XCJuYW1lXCIgY2xhc3M9XCJibG9jayBtYi0yIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtd2hpdGVcIj5BdmFpbGFibGU8L2xhYmVsPlxuICAgICAgICA8ZGl2IGlkPVwic2hpcC1wcm9kdWN0LXF1YW50aXR5XCJcbiAgICAgICAgICBjbGFzcz1cInNoYWRvdy1zbSBiZy1ncmF5LTUwIGJvcmRlciBib3JkZXItZ3JheS0zMDAgdGV4dC1ncmF5LTkwMCB0ZXh0LXNtIHJvdW5kZWQtbGcgZm9jdXM6cmluZy1ibHVlLTYwMCBmb2N1czpib3JkZXItYmx1ZS02MDAgYmxvY2sgdy1mdWxsIHAtMi41IGRhcms6YmctZ3JheS02MDAgZGFyazpib3JkZXItZ3JheS01MDAgZGFyazpwbGFjZWhvbGRlci1ncmF5LTQwMCBkYXJrOnRleHQtd2hpdGUgZGFyazpmb2N1czpyaW5nLWJsdWUtNTAwIGRhcms6Zm9jdXM6Ym9yZGVyLWJsdWUtNTAwXCI+XG4gICAgICAke3Byb2R1Y3RQYXJhbS5hdmFpbGFibGVfcXVhbnRpdHlbZ3JvdXBdIHx8IDB9PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdj5cbiAgICAgIDxsYWJlbCBmb3I9XCJwcm9kdWN0X2dyb3VwXCIgY2xhc3M9XCJibG9jayBtYi0yIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtd2hpdGVcIiA+QWN0aW9uPC9sYWJlbCA+XG4gICAgICA8YnV0dG9uIHNoYXJlLWdyb3VwLWRhdGE9JHtncm91cFVuZGVyU2NvcmV9IHR5cGU9XCJidXR0b25cIiBpZD1cInNoYXJlLXByb2R1Y3QtYnV0dG9uLSR7Z3JvdXBVbmRlclNjb3JlfVwiIGNsYXNzPVwicmVxdWVzdC1zaGFyZS1wcm9kdWN0LWJ1dHRvbiBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgcHgtMyBweS0yLjUgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWNlbnRlciB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgYmcteWVsbG93LTQwMCBob3ZlcjpiZy1ibHVlLTgwMCBmb2N1czpyaW5nLTQgZm9jdXM6cmluZy1ibHVlLTMwMCBkYXJrOmJnLWJsdWUtNjAwIGRhcms6aG92ZXI6YmctYmx1ZS03MDAgZGFyazpmb2N1czpyaW5nLWJsdWUtODAwXCI+XG4gICAgICAgIDxzdmcgY2xhc3M9XCJ3LTQgaC00IG1yLTJcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTTE3LjQxNCAyLjU4NmEyIDIgMCAwMC0yLjgyOCAwTDcgMTAuMTcyVjEzaDIuODI4bDcuNTg2LTcuNTg2YTIgMiAwIDAwMC0yLjgyOHpcIj48L3BhdGg+PHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMiA2YTIgMiAwIDAxMi0yaDRhMSAxIDAgMDEwIDJINHYxMGgxMHYtNGExIDEgMCAxMTIgMHY0YTIgMiAwIDAxLTIgMkg0YTIgMiAwIDAxLTItMlY2elwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIj48L3BhdGg+PC9zdmc+XG4gICAgICAgIFJlcXVlc3QgU2hhcmVcbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICBgXG5cbiAgY29uc3Qgc2hhcmVQcm9kdWN0QnRuID0gc2hhcmVDb250YWluZXIucXVlcnlTZWxlY3RvcihgI3NoYXJlLXByb2R1Y3QtYnV0dG9uLSR7Z3JvdXBVbmRlclNjb3JlfWApXG5cbiAgaWYgKHByb2R1Y3RQYXJhbS5hdmFpbGFibGVfcXVhbnRpdHlbZ3JvdXBdID09PSAwIHx8ICFwcm9kdWN0UGFyYW0uYXZhaWxhYmxlX3F1YW50aXR5W2dyb3VwXSkge1xuICAgIHNoaXBQcm9kdWN0QnRuLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZScpXG4gICAgYXNzaWduUHJvZHVjdEJ0bi5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUnKVxuICAgIHNoYXJlUHJvZHVjdEJ0bi5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUnKVxuICB9XG5cbiAgaWYgKGlzRXF1YWwpIHtcbiAgICBwcm9kdWN0VHlwZUNvbnRhaW5lci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzaGlwQXNzaWduQ29udGFpbmVyLCBwcm9kdWN0VHlwZUNvbnRhaW5lci5uZXh0U2libGluZylcbiAgfSBlbHNlIHtcbiAgICBwcm9kdWN0VHlwZUNvbnRhaW5lci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzaGFyZUNvbnRhaW5lciwgcHJvZHVjdFR5cGVDb250YWluZXIubmV4dFNpYmxpbmcpXG4gIH1cblxuICBpZiAoaXNFdmVudCkge1xuICAgIGNvbnN0IGJvb2tpbmdCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJvb2tpbmctcHJvZHVjdC1idXR0b24nKVxuICAgIGJvb2tpbmdCdXR0b25zLmZvckVhY2goKGUpID0+XG4gICAgICBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBsZXQgc2hpcEdyb3VwID0gZS5nZXRBdHRyaWJ1dGUoJ3NoaXAtZ3JvdXAtZGF0YScpXG4gICAgICAgIGNvbnN0IHByb2R1Y3QgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLnByb2R1Y3QpXG4gICAgICAgIGJvb2tpbmcocHJvZHVjdCwgc2hpcEdyb3VwKVxuICAgICAgfSlcbiAgICApXG4gIH1cblxuICBjb25zdCBzaGlwQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGlwLXByb2R1Y3QtYnV0dG9uJylcbiAgc2hpcEJ1dHRvbnMuZm9yRWFjaCgoZSkgPT5cbiAgICBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdmlld01vZGFsLmhpZGUoKVxuICAgICAgZWRpdE1vZGFsLmhpZGUoKVxuICAgICAgbGV0IHNoaXBHcm91cCA9IGUuZ2V0QXR0cmlidXRlKCdzaGlwLWdyb3VwLWRhdGEnKVxuICAgICAgY29uc3QgcHJvZHVjdCA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UucHJvZHVjdClcbiAgICAgIHNoaXAocHJvZHVjdCwgc2hpcEdyb3VwKVxuICAgIH0pXG4gIClcblxuICBjb25zdCBhc3NpZ25CdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFzc2lnbi1wcm9kdWN0LWJ1dHRvbicpXG4gIGFzc2lnbkJ1dHRvbnMuZm9yRWFjaCgoZSkgPT5cbiAgICBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdmlld01vZGFsLmhpZGUoKVxuICAgICAgZWRpdE1vZGFsLmhpZGUoKVxuICAgICAgbGV0IGFzc2lnbkdyb3VwID0gZS5nZXRBdHRyaWJ1dGUoJ2Fzc2lnbi1ncm91cC1kYXRhJylcbiAgICAgIGNvbnN0IHByb2R1Y3QgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLnByb2R1Y3QpXG4gICAgICBhc3NpZ24ocHJvZHVjdCwgYXNzaWduR3JvdXApXG4gICAgfSlcbiAgKVxuXG4gIGNvbnN0IHJlcXVlc3RTaGFyZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmVxdWVzdC1zaGFyZS1wcm9kdWN0LWJ1dHRvbicpXG4gIHJlcXVlc3RTaGFyZUJ1dHRvbnMuZm9yRWFjaCgoZSkgPT5cbiAgICBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdmlld01vZGFsLmhpZGUoKVxuICAgICAgZWRpdE1vZGFsLmhpZGUoKVxuICAgICAgbGV0IHNoYXJlR3JvdXAgPSBlLmdldEF0dHJpYnV0ZSgnc2hhcmUtZ3JvdXAtZGF0YScpXG4gICAgICBjb25zdCBwcm9kdWN0ID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5wcm9kdWN0KVxuICAgICAgcmVxdWVzdFNoYXJlKHByb2R1Y3QsIHNoYXJlR3JvdXApXG4gICAgfSlcbiAgKVxuICBjb25zdCBwcm9kdWN0Vmlld1R5cGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC12aWV3LXByb2R1Y3QtbmFtZS1jb250YWluZXInKVxuICBjb25zdCBwcm9kdWN0TWFzdGVyR3JvdXBDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBwcm9kdWN0TWFzdGVyR3JvdXBDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc206Y29sLXNwYW4tMycpXG4gIHByb2R1Y3RNYXN0ZXJHcm91cENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgYHByb2R1Y3Qtdmlldy1wcm9kdWN0X2dyb3VwLWNvbnRhaW5lci0ke2dyb3VwVW5kZXJTY29yZX1gKVxuXG4gIHByb2R1Y3RNYXN0ZXJHcm91cENvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgPGxhYmVsIGZvcj1cImZvci1ncm91cC0ke2dyb3VwVW5kZXJTY29yZX1cIlxuICAgICAgY2xhc3M9XCJibG9jayBtYi0yIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtd2hpdGVcIj4ke21hc3Rlckdyb3VwfTwvbGFiZWw+XG4gICAgPHNlbGVjdCB0eXBlPVwidGV4dFwiIG5hbWU9XCJncm91cC0ke2dyb3VwVW5kZXJTY29yZX1cIiBpZD1cInByb2R1Y3Qtdmlldy0ke2dyb3VwVW5kZXJTY29yZX1cIlxuICAgICAgY2xhc3M9XCJzaGFkb3ctc20gYmctZ3JheS01MCBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHRleHQtZ3JheS05MDAgdGV4dC1zbSByb3VuZGVkLWxnIGZvY3VzOnJpbmctYmx1ZS02MDAgZm9jdXM6Ym9yZGVyLWJsdWUtNjAwIGJsb2NrIHctZnVsbCBwLTIuNSBkYXJrOmJnLWdyYXktNjAwIGRhcms6Ym9yZGVyLWdyYXktNTAwIGRhcms6cGxhY2Vob2xkZXItZ3JheS00MDAgZGFyazp0ZXh0LXdoaXRlIGRhcms6Zm9jdXM6cmluZy1ibHVlLTUwMCBkYXJrOmZvY3VzOmJvcmRlci1ibHVlLTUwMFwiXG4gICAgICBwbGFjZWhvbGRlcj1cIlNvbWUgR3JvdXBcIiByZXF1aXJlZFxuICAgID5cbiAgICAgIDxvcHRpb24gdmFsdWU9XCIke2dyb3VwUHJvZHVjdElkc1tncm91cF19XCI+JHtncm91cH08L29wdGlvbj5cbiAgICA8L3NlbGVjdD5cbiAgICBgXG4gIHByb2R1Y3RWaWV3VHlwZUNvbnRhaW5lci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShwcm9kdWN0TWFzdGVyR3JvdXBDb250YWluZXIsIHByb2R1Y3RWaWV3VHlwZUNvbnRhaW5lci5uZXh0U2libGluZylcbn1cblxuLy8gZnVuY3Rpb24gdG8gZmlsdGVyIHByb2R1Y3RzIGJ5IGdyb3VwXG5jb25zdCBwcm9kdWN0RmlsdGVySW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3QtZmlsdGVyLWlucHV0JylcbmNvbnN0IGZpbHRlclByb2R1Y3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1maWx0ZXItYnV0dG9uJylcbmNvbnN0IGZpbHRlclJhZGlvQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0LWZpbHRlci1yYWRpby1idXR0b24nKVxuXG5maWx0ZXJSYWRpb0J1dHRvbnMuZm9yRWFjaCgoYnRuKSA9PiB7XG4gIGNvbnN0IGZpbHRlckJ1dHRvbklkID0gYnRuLmdldEF0dHJpYnV0ZSgnaWQnKVxuICBjb25zdCBmaWx0ZXJKc29uRGF0YVN0b3JhZ2UgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdmaWx0ZXJKc29uRGF0YScpXG4gIGNvbnN0IGZpbHRlckpzb25EYXRhT2JqZWN0ID0gSlNPTi5wYXJzZShmaWx0ZXJKc29uRGF0YVN0b3JhZ2UpXG5cbiAgZm9yIChjb25zdCBrZXkgaW4gZmlsdGVySnNvbkRhdGFPYmplY3QpIHtcbiAgICBpZiAoZmlsdGVyQnV0dG9uSWQuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgYnRuLmlubmVySFRNTCA9IGBcbiAgICAgICAgJHtmaWx0ZXJKc29uRGF0YU9iamVjdFtrZXldfVxuICAgICAgICA8c3ZnIGNsYXNzPVwidy0yLjUgaC0yLjUgbWwtMi41XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCJcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDEwIDZcIj5cbiAgICAgICAgICA8cGF0aCBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHJva2Utd2lkdGg9XCIyXCJcbiAgICAgICAgICAgIGQ9XCJtMSAxIDQgNCA0LTRcIiAvPlxuICAgICAgICA8L3N2Zz5gXG4gICAgfVxuICB9XG59KVxuXG5wcm9kdWN0RmlsdGVySW5wdXRzLmZvckVhY2goKGlucHV0OiBIVE1MSW5wdXRFbGVtZW50KSA9PiB7XG4gIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICBjb25zdCBmaWx0ZXJJbnB1dERhdGFUYXJnZXQgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0JylcbiAgICBjb25zdCBtYXN0ZXJHcm91cCA9IGZpbHRlcklucHV0RGF0YVRhcmdldFxuICAgICAgLnNwbGl0KCcsJylbMV1cbiAgICAgIC5yZXBsYWNlKC9bXmEtekEtWjAtOVxcc1xcX10vZywgJycpXG4gICAgICAudHJpbSgpXG4gICAgY29uc3QgZmlsdGVySW5wdXRJZCA9IGZpbHRlcklucHV0RGF0YVRhcmdldC5zcGxpdCgnLCcpWzBdLnJlcGxhY2UoL1teYS16QS1aMC05XFxzXFxfXS9nLCAnJylcbiAgICBjb25zdCBmaWx0ZXJJbnB1dElkU3RyaW5nID0gYCNwcm9kdWN0LWZpbHRlci1pbnB1dC0ke2ZpbHRlcklucHV0SWR9YFxuICAgIGNvbnN0IGZpbHRlckJ1dHRvbklkID0gZmlsdGVySW5wdXREYXRhVGFyZ2V0XG4gICAgICAuc3BsaXQoJywnKVsxXVxuICAgICAgLnRyaW0oKVxuICAgICAgLnJlcGxhY2UoL1teYS16QS1aMC05XFxzXFxfXS9nLCAnJylcbiAgICBjb25zdCBmaWx0ZXJJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZmlsdGVySW5wdXRJZFN0cmluZykgYXMgSFRNTElucHV0RWxlbWVudFxuICAgIGNvbnN0IGZpbHRlclJhZGlvQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2Ryb3Bkb3duUmFkaW9CdXR0b24tJHtmaWx0ZXJCdXR0b25JZH1gKVxuXG4gICAgaWYgKGZpbHRlcklucHV0SWRTdHJpbmcuaW5jbHVkZXMoZmlsdGVyQnV0dG9uSWQpICYmIGlucHV0LnZhbHVlID09PSBtYXN0ZXJHcm91cCkge1xuICAgICAgZmlsdGVyUmFkaW9CdG4uaW5uZXJIVE1MID0gYFxuICAgICAgICAke2ZpbHRlckJ1dHRvbklkLnNwbGl0KCdfJykuam9pbignICcpfVxuICAgICAgICA8c3ZnIGNsYXNzPVwidy0yLjUgaC0yLjUgbWwtMi41XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCJcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDEwIDZcIj5cbiAgICAgICAgICA8cGF0aCBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHJva2Utd2lkdGg9XCIyXCJcbiAgICAgICAgICAgIGQ9XCJtMSAxIDQgNCA0LTRcIiAvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgIGBcbiAgICAgIGdldFNlc3Npb25TdG9yYWdlT2JqZWN0KGZpbHRlckpzb25EYXRhLCAnZmlsdGVySnNvbkRhdGEnLCAncmVtb3ZlJywgZmlsdGVyQnV0dG9uSWQpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBmaWx0ZXJSYWRpb0J0bi5pbm5lckhUTUwgPSBgXG4gICAgICAke2ZpbHRlcklucHV0LnZhbHVlLnNwbGl0KCdfJykuam9pbignICcpfVxuICAgICAgPHN2ZyBjbGFzcz1cInctMi41IGgtMi41IG1sLTIuNVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiXG4gICAgICAgIHZpZXdCb3g9XCIwIDAgMTAgNlwiPlxuICAgICAgICA8cGF0aCBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHJva2Utd2lkdGg9XCIyXCJcbiAgICAgICAgICBkPVwibTEgMSA0IDQgNC00XCIgLz5cbiAgICAgIDwvc3ZnPlxuICAgICAgYFxuICAgIGZpbHRlckpzb25EYXRhW2ZpbHRlckJ1dHRvbklkXSA9IGZpbHRlcklucHV0LnZhbHVlLnNwbGl0KCdfJykuam9pbignICcpXG4gICAgZ2V0U2Vzc2lvblN0b3JhZ2VPYmplY3QoZmlsdGVySnNvbkRhdGEsICdmaWx0ZXJKc29uRGF0YScsICdhZGQnKVxuICB9KVxufSlcblxuZmlsdGVyUHJvZHVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gIGNvbnN0IGhpZGRlbklucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NvcnRfYnknKSBhcyBIVE1MSW5wdXRFbGVtZW50XG4gIGNvbnN0IGZpbHRlckpzb25EYXRhU3RvcmFnZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2ZpbHRlckpzb25EYXRhJylcbiAgY29uc3QgZmlsdGVyRGF0YU9iamVjdCA9IEpTT04ucGFyc2UoZmlsdGVySnNvbkRhdGFTdG9yYWdlKVxuICBmaWx0ZXJKc29uRGF0YSA9IGZpbHRlckRhdGFPYmplY3RcbiAgaGlkZGVuSW5wdXQudmFsdWUgPSBKU09OLnN0cmluZ2lmeShmaWx0ZXJKc29uRGF0YSlcbiAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnZmlsdGVySnNvbkRhdGEnLCBKU09OLnN0cmluZ2lmeShmaWx0ZXJKc29uRGF0YSkpXG4gIGNvbnN0IGlzVmlzaWJsZUZpbHRlciA9IHRydWVcbiAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnaXNWaXNpYmxlRmlsdGVyJywgSlNPTi5zdHJpbmdpZnkoaXNWaXNpYmxlRmlsdGVyKSlcbn0pXG5cbmZ1bmN0aW9uIGdldFNlc3Npb25TdG9yYWdlT2JqZWN0KFxuICBsb2NhbE9iamVjdDogRmlsdGVySnNvbkRhdGEsXG4gIHNlc3Npb25PYmplY3Q6IHN0cmluZyxcbiAgbWV0aG9kID0gJ25vbmUnLFxuICBvYmplY3RLZXkgPSAnbm9uZSdcbikge1xuICBjb25zdCBqc29uRGF0YU9iamVjdCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oc2Vzc2lvbk9iamVjdClcbiAgY29uc3QgZGF0YU9iamVjdCA9IEpTT04ucGFyc2UoanNvbkRhdGFPYmplY3QpXG4gIHN3aXRjaCAobWV0aG9kKSB7XG4gICAgY2FzZSAnYWRkJzpcbiAgICAgIGNvbnN0IG5ld0RhdGFPYmplY3QgPSB7IC4uLmRhdGFPYmplY3QsIC4uLmxvY2FsT2JqZWN0IH1cbiAgICAgIGNvbnN0IG5ld0pzb25EYXRhID0gSlNPTi5zdHJpbmdpZnkobmV3RGF0YU9iamVjdClcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oc2Vzc2lvbk9iamVjdCwgbmV3SnNvbkRhdGEpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3JlbW92ZSc6XG4gICAgICBkZWxldGUgZGF0YU9iamVjdFtvYmplY3RLZXldXG4gICAgICBjb25zdCBuZXdKc29uRGF0YU9iamVjdCA9IEpTT04uc3RyaW5naWZ5KGRhdGFPYmplY3QpXG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKHNlc3Npb25PYmplY3QsIG5ld0pzb25EYXRhT2JqZWN0KVxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVBZGp1c3RBY3Rpb24oaXNFcXVhbDogYm9vbGVhbiwgbWFzdGVyR3JvdXA6IHN0cmluZywgZ3JvdXA6IHN0cmluZywgcHJvZHVjdFBhcmFtOiBJUHJvZHVjdCkge1xuICBjb25zdCBwcm9kdWN0SW5XYXJlaG91c2VzID0gc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcbiAgICAncHJvZHVjdEluV2FyZWhvdXNlcycsXG4gICAgSlNPTi5zdHJpbmdpZnkocHJvZHVjdFBhcmFtLnByb2R1Y3RfaW5fd2FyZWhvdXNlcylcbiAgKVxuICBjb25zdCBncm91cFVuZGVyU2NvcmUgPSBncm91cC5yZXBsYWNlKC8gL2csICdfJylcbiAgY29uc3QgZ3JvdXBQcm9kdWN0SWRzID0gcHJvZHVjdFBhcmFtLmdyb3Vwc19pZHNcbiAgY29uc3QgcHJvZHVjdFR5cGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcHJvZHVjdC1hZGp1c3QtcHJvZHVjdC1uYW1lLWNvbnRhaW5lcmApXG4gIGNvbnN0IGFkanVzdENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGFkanVzdENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzbTpjb2wtc3Bhbi0yJywgJ2ZsZXgnLCAnZ2FwLTQnKVxuICBhZGp1c3RDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsIGBwcm9kdWN0LWFkanVzdC1jb250YWluZXItJHtncm91cFVuZGVyU2NvcmV9YClcbiAgYWRqdXN0Q29udGFpbmVyLmlubmVySFRNTCA9IGBcbiAgICA8ZGl2PlxuICAgICAgPGxhYmVsIGZvcj1cImFkanVzdC1wcm9kdWN0LXF1YW50aXR5LSR7Z3JvdXBVbmRlclNjb3JlfVwiIGNsYXNzPVwiYmxvY2sgbWItMiB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDAgZGFyazp0ZXh0LXdoaXRlXCI+QXZhaWxhYmxlPC9sYWJlbD5cbiAgICAgICAgPGlucHV0IGlkPVwiYWRqdXN0LXByb2R1Y3QtcXVhbnRpdHktJHtncm91cFVuZGVyU2NvcmV9XCJcbiAgICAgICAgICBjbGFzcz1cInByb2R1Y3QtYWRqdXN0LWdyb3VwLXF1YW50aXR5IHNoYWRvdy1zbSBiZy1ncmF5LTUwIGJvcmRlciBib3JkZXItZ3JheS0zMDAgdGV4dC1ncmF5LTkwMCB0ZXh0LXNtIHJvdW5kZWQtbGcgZm9jdXM6cmluZy1ibHVlLTYwMCBmb2N1czpib3JkZXItYmx1ZS02MDAgYmxvY2sgdy1mdWxsIHAtMi41IGRhcms6YmctZ3JheS02MDAgZGFyazpib3JkZXItZ3JheS01MDAgZGFyazpwbGFjZWhvbGRlci1ncmF5LTQwMCBkYXJrOnRleHQtd2hpdGUgZGFyazpmb2N1czpyaW5nLWJsdWUtNTAwIGRhcms6Zm9jdXM6Ym9yZGVyLWJsdWUtNTAwXCI+XG4gICAgPC9kaXY+XG5cbiAgYFxuXG4gIHByb2R1Y3RUeXBlQ29udGFpbmVyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGFkanVzdENvbnRhaW5lciwgcHJvZHVjdFR5cGVDb250YWluZXIubmV4dFNpYmxpbmcpXG5cbiAgY29uc3QgcHJvZHVjdFZpZXdUeXBlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtYWRqdXN0LXByb2R1Y3QtbmFtZS1jb250YWluZXInKVxuICBjb25zdCBtYXN0ZXJHcm91cFdhcmVob3VzZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIG1hc3Rlckdyb3VwV2FyZWhvdXNlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3NtOmNvbC1zcGFuLTQnKVxuICBtYXN0ZXJHcm91cFdhcmVob3VzZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgYHByb2R1Y3QtYWRqdXN0LXByb2R1Y3RfZ3JvdXAtY29udGFpbmVyLSR7Z3JvdXBVbmRlclNjb3JlfWApXG5cbiAgbWFzdGVyR3JvdXBXYXJlaG91c2VDb250YWluZXIuaW5uZXJIVE1MID0gYFxuICA8ZGl2IGNsYXNzPVwiZmxleCBnYXAtNFwiPlxuICAgIDxkaXYgY2xhc3M9XCJ3LTEvMlwiPlxuICAgICAgPGxhYmVsIGZvcj1cImZvci1ncm91cC0ke2dyb3VwVW5kZXJTY29yZX1cIlxuICAgICAgICBjbGFzcz1cImJsb2NrIG1iLTIgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktOTAwIGRhcms6dGV4dC13aGl0ZVwiPiR7bWFzdGVyR3JvdXB9PC9sYWJlbD5cbiAgICAgIDxzZWxlY3QgdHlwZT1cInRleHRcIiBuYW1lPVwiZ3JvdXAtJHtncm91cFVuZGVyU2NvcmV9XCIgaWQ9XCJtYXN0ZXItZ3JvdXAtYWRqdXN0LSR7Z3JvdXBVbmRlclNjb3JlfVwiXG4gICAgICAgIGNsYXNzPVwicHJvZHVjdC1hZGp1c3QtZ3JvdXAgc2hhZG93LXNtIGJnLWdyYXktNTAgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCB0ZXh0LWdyYXktOTAwIHRleHQtc20gcm91bmRlZC1sZyBmb2N1czpyaW5nLWJsdWUtNjAwIGZvY3VzOmJvcmRlci1ibHVlLTYwMCBibG9jayB3LWZ1bGwgcC0yLjUgZGFyazpiZy1ncmF5LTYwMCBkYXJrOmJvcmRlci1ncmF5LTUwMCBkYXJrOnBsYWNlaG9sZGVyLWdyYXktNDAwIGRhcms6dGV4dC13aGl0ZSBkYXJrOmZvY3VzOnJpbmctYmx1ZS01MDAgZGFyazpmb2N1czpib3JkZXItYmx1ZS01MDBcIlxuICAgICAgICBwbGFjZWhvbGRlcj1cIlNvbWUgR3JvdXBcIiByZXF1aXJlZFxuICAgICAgPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiJHtncm91cFByb2R1Y3RJZHNbZ3JvdXBdfVwiPiR7Z3JvdXB9PC9vcHRpb24+XG4gICAgICA8L3NlbGVjdD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwidy0xLzJcIj5cbiAgICAgIDxsYWJlbCBmb3I9XCJmb3Itd2FyZWhvdXNlLSR7Z3JvdXBVbmRlclNjb3JlfVwiXG4gICAgICAgIGNsYXNzPVwiYmxvY2sgbWItMiB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDAgZGFyazp0ZXh0LXdoaXRlXCI+V2FyZWhvdXNlPC9sYWJlbD5cbiAgICAgIDxzZWxlY3QgdHlwZT1cInRleHRcIiBuYW1lPVwiZ3JvdXAtJHtncm91cFVuZGVyU2NvcmV9XCIgaWQ9XCJ3YXJlaG91c2UtYWRqdXN0LSR7Z3JvdXBVbmRlclNjb3JlfVwiIGRhdGEtdGFyZ2V0LWdyb3VwPVwiJHtncm91cH1cIlxuICAgICAgICBjbGFzcz1cInByb2R1Y3QtYWRqdXN0LXdhcmVob3VzZS1zZWxlY3Qgc2hhZG93LXNtIGJnLWdyYXktNTAgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCB0ZXh0LWdyYXktOTAwIHRleHQtc20gcm91bmRlZC1sZyBmb2N1czpyaW5nLWJsdWUtNjAwIGZvY3VzOmJvcmRlci1ibHVlLTYwMCBibG9jayB3LWZ1bGwgcC0yLjUgZGFyazpiZy1ncmF5LTYwMCBkYXJrOmJvcmRlci1ncmF5LTUwMCBkYXJrOnBsYWNlaG9sZGVyLWdyYXktNDAwIGRhcms6dGV4dC13aGl0ZSBkYXJrOmZvY3VzOnJpbmctYmx1ZS01MDAgZGFyazpmb2N1czpib3JkZXItYmx1ZS01MDBcIlxuICAgICAgICBwbGFjZWhvbGRlcj1cIlNvbWUgR3JvdXBcIiByZXF1aXJlZFxuICAgICAgPlxuICAgICAgPC9zZWxlY3Q+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICAgIGBcbiAgY29uc3Qgc2VsZWN0V2FyZWhvdXNlOiBIVE1MSW5wdXRFbGVtZW50ID0gbWFzdGVyR3JvdXBXYXJlaG91c2VDb250YWluZXIucXVlcnlTZWxlY3RvcihcbiAgICBgI3dhcmVob3VzZS1hZGp1c3QtJHtncm91cFVuZGVyU2NvcmV9YFxuICApXG4gIGNvbnN0IHByb2R1Y3RRdWFudGl0eTogSFRNTElucHV0RWxlbWVudCA9IGFkanVzdENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKGAjYWRqdXN0LXByb2R1Y3QtcXVhbnRpdHktJHtncm91cFVuZGVyU2NvcmV9YClcblxuICBmb3IgKGNvbnN0IHdhcmVob3VzZSBvZiBwcm9kdWN0UGFyYW0uYWxsX3dhcmVob3VzZXMpIHtcbiAgICBpZiAoaXNFdmVudCAmJiB3YXJlaG91c2UubmFtZSAhPT0gZXZlbnRzV2FyZWhvdXNlKSB7XG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKVxuICAgIG9wdGlvbi52YWx1ZSA9IHdhcmVob3VzZS5pZC50b1N0cmluZygpXG4gICAgb3B0aW9uLnRleHQgPSB3YXJlaG91c2UubmFtZS50b1N0cmluZygpXG4gICAgc2VsZWN0V2FyZWhvdXNlLmFwcGVuZENoaWxkKG9wdGlvbilcbiAgfVxuXG4gIGNvbnN0IHByb2R1Y3RRdWFudGl0eVZhbHVlID0gcHJvZHVjdFBhcmFtLnByb2R1Y3RfaW5fd2FyZWhvdXNlc1tncm91cF1bc2VsZWN0V2FyZWhvdXNlLnZhbHVlXSB8fCAwXG5cbiAgcHJvZHVjdFF1YW50aXR5LnZhbHVlID0gU3RyaW5nKHByb2R1Y3RRdWFudGl0eVZhbHVlKVxuXG4gIHByb2R1Y3RWaWV3VHlwZUNvbnRhaW5lci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShtYXN0ZXJHcm91cFdhcmVob3VzZUNvbnRhaW5lciwgcHJvZHVjdFZpZXdUeXBlQ29udGFpbmVyLm5leHRTaWJsaW5nKVxuXG4gIHNlbGVjdFdhcmVob3VzZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgY29uc3QgcHJvZHVjdEluV2FyZWhvdXNlcyA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdEluV2FyZWhvdXNlcycpKVxuICAgIGNvbnN0IGF2YWlsYWJsZVF1YW50aXR5ID0gcHJvZHVjdEluV2FyZWhvdXNlc1tncm91cF1bc2VsZWN0V2FyZWhvdXNlLnZhbHVlXSB8fCAwXG4gICAgcHJvZHVjdFF1YW50aXR5LnZhbHVlID0gU3RyaW5nKGF2YWlsYWJsZVF1YW50aXR5KVxuICAgIHByb2R1Y3RJbldhcmVob3VzZXNbZ3JvdXBdW3NlbGVjdFdhcmVob3VzZS52YWx1ZV0gPSBOdW1iZXIocHJvZHVjdFF1YW50aXR5LnZhbHVlKVxuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3Byb2R1Y3RJbldhcmVob3VzZXMnLCBKU09OLnN0cmluZ2lmeShwcm9kdWN0SW5XYXJlaG91c2VzKSlcbiAgfSlcblxuICBwcm9kdWN0UXVhbnRpdHkuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgIGNvbnN0IHByb2R1Y3RJbldhcmVob3VzZXMgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RJbldhcmVob3VzZXMnKSlcbiAgICBwcm9kdWN0SW5XYXJlaG91c2VzW2dyb3VwXVtzZWxlY3RXYXJlaG91c2UudmFsdWVdID0gTnVtYmVyKHByb2R1Y3RRdWFudGl0eS52YWx1ZSlcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdwcm9kdWN0SW5XYXJlaG91c2VzJywgSlNPTi5zdHJpbmdpZnkocHJvZHVjdEluV2FyZWhvdXNlcykpXG4gIH0pXG59XG5cbmNvbnN0IGFkanVzdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNwcm9kdWN0LWFkanVzdC1zdWJtaXQtYnRuYClcbmFkanVzdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgY29uc3QgcHJvZHVjdCA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdCcpKVxuICBjb25zdCBjc3JmVG9rZW5JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oJyNjc3JmX3Rva2VuJylcbiAgY29uc3QgY3NyZlRva2VuID0gY3NyZlRva2VuSW5wdXQgPyBjc3JmVG9rZW5JbnB1dC52YWx1ZSA6ICcnXG4gIGFkanVzdFByb2R1Y3QocHJvZHVjdCwgY3NyZlRva2VuKVxufSlcblxuYXN5bmMgZnVuY3Rpb24gYWRqdXN0UHJvZHVjdChwcm9kdWN0UGFyYW06IElQcm9kdWN0LCBjc3JmVG9rZW46IHN0cmluZykge1xuICBjb25zdCBhZGp1c3ROb3RlOiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtYWRqdXN0LW5vdGUnKVxuICBjb25zdCBwcm9kdWN0SW5XYXJlaG91c2VzID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0SW5XYXJlaG91c2VzJykpXG5cbiAgY29uc3QgZGF0YSA9IHtcbiAgICBwcm9kdWN0X2lkOiBwcm9kdWN0UGFyYW0uaWQsXG4gICAgZ3JvdXBzX3F1YW50aXR5OiBKU09OLnN0cmluZ2lmeShwcm9kdWN0SW5XYXJlaG91c2VzKSxcbiAgICBub3RlOiBhZGp1c3ROb3RlLnZhbHVlLFxuICAgIGNzcmZfdG9rZW46IGNzcmZUb2tlbixcbiAgfVxuXG4gIGNvbnN0IGJhc2VfdXJsID0gd2luZG93LmxvY2F0aW9uLm9yaWdpblxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9wcm9kdWN0L2FkanVzdGAsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gIH0pXG5cbiAgLy8gTk9URTogSWYgd2UgZG8gbm90IG5vdGlmeSB1c2VyIGFib3V0IGFkanVzdCwgZGVsZXRlIGlmIGVsc2Ugc3RhdGVtZW50XG4gIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMSkge1xuICAgIGxvY2F0aW9uLnJlbG9hZCgpXG4gICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSgncHJvZHVjdEluV2FyZWhvdXNlcycpXG4gIH0gZWxzZSB7XG4gICAgbG9jYXRpb24ucmVsb2FkKClcbiAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKCdwcm9kdWN0SW5XYXJlaG91c2VzJylcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWxldGVBZGp1c3RDb250YWluZXIobmFtZUdyb3VwOiBzdHJpbmcsIG5hbWVHcm91cFZhbHVlOiBzdHJpbmcpIHtcbiAgY29uc3QgYWRqdXN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3Byb2R1Y3QtYWRqdXN0LWNvbnRhaW5lci0ke25hbWVHcm91cFZhbHVlLnJlcGxhY2UoLyAvZywgJ18nKX1gKVxuICBjb25zdCBtYXN0ZXJHcm91cFdhcmVob3VzZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgYCNwcm9kdWN0LWFkanVzdC1wcm9kdWN0X2dyb3VwLWNvbnRhaW5lci0ke25hbWVHcm91cFZhbHVlLnJlcGxhY2UoLyAvZywgJ18nKX1gXG4gIClcbiAgaWYgKGFkanVzdENvbnRhaW5lcikge1xuICAgIGFkanVzdENvbnRhaW5lci5yZW1vdmUoKVxuICB9XG4gIGlmIChtYXN0ZXJHcm91cFdhcmVob3VzZUNvbnRhaW5lcikge1xuICAgIG1hc3Rlckdyb3VwV2FyZWhvdXNlQ29udGFpbmVyLnJlbW92ZSgpXG4gIH1cbn1cblxuLy8gLS0tLWFkZCBpbmJvdW5kIG9yZGVyIGl0ZW0gZm9yIGVkaXQgbW9kYWwtLS0tXG5mdW5jdGlvbiBjcmVhdGVQcm9kdWN0R3JvdXBFZGl0SXRlbShcbiAgcHJvZHVjdFBhcmFtOiBJUHJvZHVjdCA9IG51bGwsXG4gIG1hc3Rlckdyb3VwOiBzdHJpbmcgPSBudWxsLFxuICBpdGVtSW5kZXg6IG51bWJlciA9IG51bGxcbikge1xuICBpZiAoIXByb2R1Y3RQYXJhbSkge1xuICAgIGNvbnN0IHByb2R1Y3Q6IElQcm9kdWN0ID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0JykpXG4gICAgcHJvZHVjdFBhcmFtID0gcHJvZHVjdFxuICB9XG5cbiAgY29uc3QgcHJvZHVjdEdyb3VwRWRpdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWdyb3VwLWVkaXQtYWRkLWNvbnRhaW5lcicpXG4gIGNvbnN0IHByb2R1Y3RHcm91cEVkaXRBbGxJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0LWdyb3VwLWVkaXQtYWRkLWl0ZW0nKVxuICBjb25zdCBpbmRleCA9IHByb2R1Y3RHcm91cEVkaXRBbGxJdGVtcy5sZW5ndGggKyAxXG4gIGNvbnN0IHByb2R1Y3RHcm91cEVkaXRJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcblxuICBwcm9kdWN0R3JvdXBFZGl0SXRlbS5jbGFzc0xpc3QuYWRkKFxuICAgICdwLTYnLFxuICAgICdzcGFjZS15LTYnLFxuICAgICdib3JkZXItdCcsXG4gICAgJ3Byb2R1Y3QtZ3JvdXAtZWRpdC1hZGQtaXRlbScsXG4gICAgYGRlbGV0ZS1pZC0ke2luZGV4fWBcbiAgKVxuICBwcm9kdWN0R3JvdXBFZGl0SXRlbS5pbm5lckhUTUwgPSBgXG4gIDxkaXYgY2xhc3M9XCJncmlkIGdyaWQtY29scy0xMiBnYXAtNVwiPlxuICAgIDxkaXYgY2xhc3M9XCJjb2wtc3Bhbi02IHNtOmNvbC1zcGFuLTRcIj5cbiAgICAgIDxsYWJlbCBmb3I9XCJzdGF0dXNcIiBjbGFzcz1cImJsb2NrIG1iLTIgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktOTAwIGRhcms6dGV4dC13aGl0ZVwiPk1hc3RlclxuICAgICAgICBHcm91cDwvbGFiZWw+XG4gICAgICA8c2VsZWN0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImFkZF9wcm9kdWN0XCIgaWQ9XCJwcm9kdWN0LW1hc3Rlci1ncm91cC1lZGl0LWl0ZW0tJHtpbmRleH1cIlxuICAgICAgICBjbGFzcz1cInByb2R1Y3QtbWFzdGVyLWdyb3VwLWVkaXQtaXRlbSBzaGFkb3ctc20gYmctZ3JheS01MCBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHRleHQtZ3JheS05MDAgdGV4dC1zbSByb3VuZGVkLWxnIGZvY3VzOnJpbmctYmx1ZS02MDAgZm9jdXM6Ym9yZGVyLWJsdWUtNjAwIGJsb2NrIHctZnVsbCBwLTIuNSBkYXJrOmJnLWdyYXktNjAwIGRhcms6Ym9yZGVyLWdyYXktNTAwIGRhcms6cGxhY2Vob2xkZXItZ3JheS00MDAgZGFyazp0ZXh0LXdoaXRlIGRhcms6Zm9jdXM6cmluZy1ibHVlLTUwMCBkYXJrOmZvY3VzOmJvcmRlci1ibHVlLTUwMFwiXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiTWFzdGVyXG4gICAgICAgIEdyb3VwXCIgcmVxdWlyZWQ+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIiBkaXNhYmxlZCBzZWxlY3RlZD5TZWxlY3QgbWFzdGVyIGdyb3VwPC9vcHRpb24+XG4gICAgICA8L3NlbGVjdD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sLXNwYW4tNiBzbTpjb2wtc3Bhbi00XCI+XG4gICAgICA8bGFiZWwgZm9yPVwic3RhdHVzXCIgY2xhc3M9XCJibG9jayBtYi0yIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtd2hpdGVcIj5Hcm91cDwvbGFiZWw+XG4gICAgICA8c2VsZWN0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImFkZF9ncm91cFwiIGlkPVwicHJvZHVjdC1ncm91cC1lZGl0LWl0ZW0tJHtpbmRleH1cIlxuICAgICAgICBjbGFzcz1cInByb2R1Y3QtZ3JvdXAtZWRpdC1pdGVtIHNoYWRvdy1zbSBiZy1ncmF5LTUwIGJvcmRlciBib3JkZXItZ3JheS0zMDAgdGV4dC1ncmF5LTkwMCB0ZXh0LXNtIHJvdW5kZWQtbGcgZm9jdXM6cmluZy1ibHVlLTYwMCBmb2N1czpib3JkZXItYmx1ZS02MDAgYmxvY2sgdy1mdWxsIHAtMi41IGRhcms6YmctZ3JheS02MDAgZGFyazpib3JkZXItZ3JheS01MDAgZGFyazpwbGFjZWhvbGRlci1ncmF5LTQwMCBkYXJrOnRleHQtd2hpdGUgZGFyazpmb2N1czpyaW5nLWJsdWUtNTAwIGRhcms6Zm9jdXM6Ym9yZGVyLWJsdWUtNTAwXCJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJHcm91cFwiIHJlcXVpcmVkPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCIgZGlzYWJsZWQgc2VsZWN0ZWQ+U2VsZWN0IGdyb3VwPC9vcHRpb24+XG4gICAgICA8L3NlbGVjdD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sLXNwYW4tNiBzbTpjb2wtc3Bhbi00XCI+XG4gICAgICA8bGFiZWwgZm9yPVwic3RhdHVzXCIgY2xhc3M9XCJibG9jayBtYi0yIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtd2hpdGVcIj5BY3Rpb248L2xhYmVsPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgZGF0YS10YXJnZXQ9XCJcIlxuICAgICAgICBjbGFzcz1cInByb2R1Y3QtZ3JvdXAtZWRpdC1kZWxldGUtaXRlbS1idG4gaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIHB4LTMgcHktMiBtci0zIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1jZW50ZXIgdGV4dC13aGl0ZSByb3VuZGVkLWxnIGJnLXJlZC02MDAgaG92ZXI6YmctcmVkLTgwMCBmb2N1czpyaW5nLTQgZm9jdXM6cmluZy1yZWQtMzAwIGRhcms6Zm9jdXM6cmluZy1yZWQtOTAwXCI+XG4gICAgICAgIDxzdmcgY2xhc3M9XCJ3LTYgaC02XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgNDQ4IDUxMlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgZD1cIk0xMzUuMiAxNy43QzE0MC42IDYuOCAxNTEuNyAwIDE2My44IDBIMjg0LjJjMTIuMSAwIDIzLjIgNi44IDI4LjYgMTcuN0wzMjAgMzJoOTZjMTcuNyAwIDMyIDE0LjMgMzIgMzJzLTE0LjMgMzItMzIgMzJIMzJDMTQuMyA5NiAwIDgxLjcgMCA2NFMxNC4zIDMyIDMyIDMyaDk2bDcuMi0xNC4zek0zMiAxMjhINDE2VjQ0OGMwIDM1LjMtMjguNyA2NC02NCA2NEg5NmMtMzUuMyAwLTY0LTI4LjctNjQtNjRWMTI4em05NiA2NGMtOC44IDAtMTYgNy4yLTE2IDE2VjQzMmMwIDguOCA3LjIgMTYgMTYgMTZzMTYtNy4yIDE2LTE2VjIwOGMwLTguOC03LjItMTYtMTYtMTZ6bTk2IDBjLTguOCAwLTE2IDcuMi0xNiAxNlY0MzJjMCA4LjggNy4yIDE2IDE2IDE2czE2LTcuMiAxNi0xNlYyMDhjMC04LjgtNy4yLTE2LTE2LTE2em05NiAwYy04LjggMC0xNiA3LjItMTYgMTZWNDMyYzAgOC44IDcuMiAxNiAxNiAxNnMxNi03LjIgMTYtMTZWMjA4YzAtOC44LTcuMi0xNi0xNi0xNnpcIj5cbiAgICAgICAgICA8L3BhdGg+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBpZD1cInByb2R1Y3QtZ3JvdXAtZWRpdC1hZGQtaXRlbS1idG4tJHtpbmRleH1cIlxuICAgICAgICBjbGFzcz1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBweC0zIHB5LTIgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWNlbnRlciB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgYmcteWVsbG93LTQwMCBob3ZlcjpiZy15ZWxsb3ctNTAwIGZvY3VzOnJpbmctNCBmb2N1czpyaW5nLXJlZC0zMDBcIj5cbiAgICAgICAgPHN2ZyBjbGFzcz1cInctNiBoLTZcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCA0NDggNTEyXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICBkPVwiTTY0IDgwYy04LjggMC0xNiA3LjItMTYgMTZWNDE2YzAgOC44IDcuMiAxNiAxNiAxNkgzODRjOC44IDAgMTYtNy4yIDE2LTE2Vjk2YzAtOC44LTcuMi0xNi0xNi0xNkg2NHpNMCA5NkMwIDYwLjcgMjguNyAzMiA2NCAzMkgzODRjMzUuMyAwIDY0IDI4LjcgNjQgNjRWNDE2YzAgMzUuMy0yOC43IDY0LTY0IDY0SDY0Yy0zNS4zIDAtNjQtMjguNy02NC02NFY5NnpNMjAwIDM0NFYyODBIMTM2Yy0xMy4zIDAtMjQtMTAuNy0yNC0yNHMxMC43LTI0IDI0LTI0aDY0VjE2OGMwLTEzLjMgMTAuNy0yNCAyNC0yNHMyNCAxMC43IDI0IDI0djY0aDY0YzEzLjMgMCAyNCAxMC43IDI0IDI0cy0xMC43IDI0LTI0IDI0SDI0OHY2NGMwIDEzLjMtMTAuNyAyNC0yNCAyNHMtMjQtMTAuNy0yNC0yNHpcIj5cbiAgICAgICAgICA8L3BhdGg+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICBgXG5cbiAgY29uc3QgcHJvZHVjdEdyb3VwRWRpdFNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQgPSBwcm9kdWN0R3JvdXBFZGl0SXRlbS5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdC1ncm91cC1lZGl0LWl0ZW0nKVxuICBjb25zdCBhdmFpbGFibGVNYXN0ZXJHcm91cHMgPSBPYmplY3Qua2V5cyhwcm9kdWN0UGFyYW0ubXN0cl9wcm9kX2dycHNfcHJvZF9ncnBzX25hbWVzKVxuICBjb25zdCBwcm9kdWN0TWFzdGVyR3JvdXBFZGl0U2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudCA9IHByb2R1Y3RHcm91cEVkaXRJdGVtLnF1ZXJ5U2VsZWN0b3IoXG4gICAgYCNwcm9kdWN0LW1hc3Rlci1ncm91cC1lZGl0LWl0ZW0tJHtpbmRleH1gXG4gIClcbiAgYXZhaWxhYmxlTWFzdGVyR3JvdXBzLmZvckVhY2goKG1hc3Rlckdyb3VwKSA9PiB7XG4gICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJylcbiAgICBvcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsIG1hc3Rlckdyb3VwKVxuICAgIG9wdGlvbi5pbm5lckhUTUwgPSBtYXN0ZXJHcm91cFxuICAgIHByb2R1Y3RNYXN0ZXJHcm91cEVkaXRTZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKVxuICB9KVxuICBpZiAobWFzdGVyR3JvdXApIHtcbiAgICBwcm9kdWN0TWFzdGVyR3JvdXBFZGl0U2VsZWN0LnZhbHVlID0gbWFzdGVyR3JvdXBcbiAgICBwcm9kdWN0UGFyYW0ubXN0cl9wcm9kX2dycHNfcHJvZF9ncnBzX25hbWVzW21hc3Rlckdyb3VwXS5mb3JFYWNoKFxuICAgICAgKGdyb3VwOiB7IGdyb3VwX25hbWU6IHN0cmluZzsgZ3JvdXBfaWQ6IG51bWJlciB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2R1Y3RHcm91cFNlbGVjdE9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpXG4gICAgICAgIHByb2R1Y3RHcm91cFNlbGVjdE9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgZ3JvdXAuZ3JvdXBfaWQudG9TdHJpbmcoKSlcbiAgICAgICAgcHJvZHVjdEdyb3VwU2VsZWN0T3B0aW9uLnRleHRDb250ZW50ID0gZ3JvdXAuZ3JvdXBfbmFtZVxuICAgICAgICBwcm9kdWN0R3JvdXBFZGl0U2VsZWN0LmFwcGVuZENoaWxkKHByb2R1Y3RHcm91cFNlbGVjdE9wdGlvbilcbiAgICAgIH1cbiAgICApXG4gICAgLy8gVE9ETzogYWx3YXlzIHNlbGVjdCBmaXJzdCBvcHRpb25cbiAgICBpZiAoIWl0ZW1JbmRleCkge1xuICAgICAgaXRlbUluZGV4ID0gMFxuICAgIH1cbiAgICBwcm9kdWN0R3JvdXBFZGl0U2VsZWN0LnZhbHVlID0gcHJvZHVjdFBhcmFtLm1zdHJfZ3Jwc19ncnBzX25hbWVzX2luX3Byb2RbbWFzdGVyR3JvdXBdW2l0ZW1JbmRleF0uZ3JvdXBfaWQudG9TdHJpbmcoKVxuICB9XG5cbiAgY29uc3Qgb3B0aW9ucyA9IHByb2R1Y3RNYXN0ZXJHcm91cEVkaXRTZWxlY3QucXVlcnlTZWxlY3RvckFsbCgnb3B0aW9uJylcbiAgcHJvZHVjdE1hc3Rlckdyb3VwRWRpdFNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgb3B0aW9ucy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICBpZiAoZS50ZXh0Q29udGVudCA9PT0gcHJvZHVjdE1hc3Rlckdyb3VwRWRpdFNlbGVjdC5vcHRpb25zW3Byb2R1Y3RNYXN0ZXJHcm91cEVkaXRTZWxlY3Quc2VsZWN0ZWRJbmRleF0udGV4dCkge1xuICAgICAgICBjb25zdCBvcHRpb25DYXRlZ29yeSA9XG4gICAgICAgICAgcHJvZHVjdFBhcmFtLm1zdHJfcHJvZF9ncnBzX3Byb2RfZ3Jwc19uYW1lc1tcbiAgICAgICAgICAgIHByb2R1Y3RNYXN0ZXJHcm91cEVkaXRTZWxlY3Qub3B0aW9uc1twcm9kdWN0TWFzdGVyR3JvdXBFZGl0U2VsZWN0LnNlbGVjdGVkSW5kZXhdLnRleHRcbiAgICAgICAgICBdXG5cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHByb2R1Y3QtZ3JvdXAtZWRpdC1pdGVtLSR7aW5kZXh9YCkuaW5uZXJIVE1MID0gJydcbiAgICAgICAgaWYgKG9wdGlvbkNhdGVnb3J5KSB7XG4gICAgICAgICAgb3B0aW9uQ2F0ZWdvcnkuZm9yRWFjaCgoZ3JvdXA6IHsgZ3JvdXBfbmFtZTogc3RyaW5nOyBncm91cF9pZDogbnVtYmVyIH0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN0b3JlU2VsZWN0T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJylcbiAgICAgICAgICAgIHN0b3JlU2VsZWN0T3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBncm91cC5ncm91cF9pZC50b1N0cmluZygpKVxuICAgICAgICAgICAgc3RvcmVTZWxlY3RPcHRpb24udGV4dENvbnRlbnQgPSBncm91cC5ncm91cF9uYW1lXG4gICAgICAgICAgICBwcm9kdWN0R3JvdXBFZGl0U2VsZWN0LmFwcGVuZENoaWxkKHN0b3JlU2VsZWN0T3B0aW9uKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9KVxuICBwcm9kdWN0R3JvdXBFZGl0Q29udGFpbmVyLmFwcGVuZENoaWxkKHByb2R1Y3RHcm91cEVkaXRJdGVtKVxuXG4gIGNvbnN0IGFkZEJ1dHRvbiA9IHByb2R1Y3RHcm91cEVkaXRJdGVtLnF1ZXJ5U2VsZWN0b3IoYCNwcm9kdWN0LWdyb3VwLWVkaXQtYWRkLWl0ZW0tYnRuLSR7aW5kZXh9YClcblxuICBhZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY3JlYXRlUHJvZHVjdEdyb3VwRWRpdEl0ZW0oKVxuICB9KVxuXG4gIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IHByb2R1Y3RHcm91cEVkaXRJdGVtLnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0LWdyb3VwLWVkaXQtZGVsZXRlLWl0ZW0tYnRuJylcbiAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IGluYm91bmRPcmRlckl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuZGVsZXRlLWlkLSR7aW5kZXh9YClcbiAgICBpZiAoaW5ib3VuZE9yZGVySXRlbSkge1xuICAgICAgaW5ib3VuZE9yZGVySXRlbS5yZW1vdmUoKVxuICAgIH1cbiAgfSlcbn1cblxuLy8gdGhpcyBidXR0b24gbmVlZCB0byBhZGQgZmlyc3QgaXRlbSBmcm9tIHRlbXBsYXRlXG5jb25zdCBwcm9kdWN0R3JvdXBFZGl0QnRuQnlJZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWdyb3VwLWVkaXQtYWRkLWl0ZW0tYnRuJylcbnByb2R1Y3RHcm91cEVkaXRCdG5CeUlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBjcmVhdGVQcm9kdWN0R3JvdXBFZGl0SXRlbSgpXG59KVxuXG4vLyAtLS0tc2V0IHByb2R1Y3QgdG8gSlNPTiBoaWRkZW4gaW5wdXQgaW4gaW5ib3VuZC1vcmRlci1lZGl0LWZvcm0tLS0tXG5mdW5jdGlvbiBzZXRQcm9kdWN0cyh0eXBlTW9kYWw6IHN0cmluZykge1xuICBjb25zdCBwcm9kdWN0R3JvdXBJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5wcm9kdWN0LWdyb3VwLSR7dHlwZU1vZGFsfS1hZGQtaXRlbWApXG5cbiAgY29uc3QgcHJvZHVjdHMgPSBbXVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvZHVjdEdyb3VwSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBwcm9kdWN0R3JvdXBJdGVtOiBIVE1MU2VsZWN0RWxlbWVudCA9IHByb2R1Y3RHcm91cEl0ZW1zW2ldLnF1ZXJ5U2VsZWN0b3IoYC5wcm9kdWN0LWdyb3VwLSR7dHlwZU1vZGFsfS1pdGVtYClcblxuICAgIGNvbnN0IHByb2R1Y3QgPSBOdW1iZXIocHJvZHVjdEdyb3VwSXRlbS52YWx1ZSlcbiAgICBwcm9kdWN0cy5wdXNoKHByb2R1Y3QpXG4gIH1cblxuICBjb25zdCBpbnB1dFByb2R1Y3RzOiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3Byb2R1Y3QtJHt0eXBlTW9kYWx9LXByb2R1Y3QtZ3JvdXBzYClcbiAgaW5wdXRQcm9kdWN0cy52YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHByb2R1Y3RzKVxuXG4gIHJldHVybiB0cnVlXG59XG5cbi8vIC0tLS1zdWJtaXQgZWRpdCBmb3JtIHRocm91Z2ggaGlkZGVuIHN1Ym1pdCBidXR0b24tLS0tXG5jb25zdCBwcm9kdWN0RWRpdFN1Ym1pdEJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LXN1Ym1pdC1idG4nKVxuY29uc3QgcHJvZHVjdEVkaXRTYXZlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC1zYXZlLXByb2R1Y3RzLWJ0bicpXG5cbnByb2R1Y3RFZGl0U2F2ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gc2V0UHJvZHVjdHMoJ2VkaXQnKVxuICBpZiAocmVzdWx0KSB7XG4gICAgcHJvZHVjdEVkaXRTdWJtaXRCdXR0b24uY2xpY2soKVxuICB9XG59KVxuXG4vLyAtLS0tYWRkIHByb2R1Y3QgZ3JvdXAgaXRlbSBmb3IgZWRpdCBtb2RhbC0tLS1cbmZ1bmN0aW9uIGNyZWF0ZVByb2R1Y3RHcm91cEFkZEl0ZW0oZ3JvdXBzOiBJUHJvZHVjdE1hc3Rlckdyb3VwR3JvdXAgPSBudWxsKSB7XG4gIGlmICghZ3JvdXBzKSB7XG4gICAgZ3JvdXBzID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdncm91cHMnKSlcbiAgfVxuICBjb25zdCBwcm9kdWN0R3JvdXBBZGRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ncm91cC1hZGQtYWRkLWNvbnRhaW5lcicpXG4gIGNvbnN0IHByb2R1Y3RHcm91cEVkaXRPcmlnaW5hbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWdyb3VwLWFkZC1pdGVtJylcbiAgY29uc3QgcHJvZHVjdEdyb3VwQWRkQWxsSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdC1ncm91cC1hZGQtYWRkLWl0ZW0nKVxuICBjb25zdCBpbmRleCA9IHByb2R1Y3RHcm91cEFkZEFsbEl0ZW1zLmxlbmd0aCArIDFcbiAgY29uc3QgcHJvZHVjdEdyb3VwQWRkSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbiAgcHJvZHVjdEdyb3VwQWRkSXRlbS5jbGFzc0xpc3QuYWRkKCdwLTYnLCAnc3BhY2UteS02JywgJ2JvcmRlci10JywgJ3Byb2R1Y3QtZ3JvdXAtYWRkLWFkZC1pdGVtJywgYGRlbGV0ZS1pZC0ke2luZGV4fWApXG4gIHByb2R1Y3RHcm91cEFkZEl0ZW0uaW5uZXJIVE1MID0gYFxuICA8ZGl2IGNsYXNzPVwiZ3JpZCBncmlkLWNvbHMtMTIgZ2FwLTVcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sLXNwYW4tNiBzbTpjb2wtc3Bhbi00XCI+XG4gICAgICA8bGFiZWwgZm9yPVwic3RhdHVzXCIgY2xhc3M9XCJibG9jayBtYi0yIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtd2hpdGVcIj5NYXN0ZXJcbiAgICAgICAgR3JvdXA8L2xhYmVsPlxuICAgICAgPHNlbGVjdCB0eXBlPVwidGV4dFwiIG5hbWU9XCJhZGRfcHJvZHVjdFwiIGlkPVwicHJvZHVjdC1tYXN0ZXItZ3JvdXAtYWRkLWl0ZW0tJHtpbmRleH1cIlxuICAgICAgICBjbGFzcz1cInByb2R1Y3QtbWFzdGVyLWdyb3VwLWFkZC1pdGVtIHNoYWRvdy1zbSBiZy1ncmF5LTUwIGJvcmRlciBib3JkZXItZ3JheS0zMDAgdGV4dC1ncmF5LTkwMCB0ZXh0LXNtIHJvdW5kZWQtbGcgZm9jdXM6cmluZy1ibHVlLTYwMCBmb2N1czpib3JkZXItYmx1ZS02MDAgYmxvY2sgdy1mdWxsIHAtMi41IGRhcms6YmctZ3JheS02MDAgZGFyazpib3JkZXItZ3JheS01MDAgZGFyazpwbGFjZWhvbGRlci1ncmF5LTQwMCBkYXJrOnRleHQtd2hpdGUgZGFyazpmb2N1czpyaW5nLWJsdWUtNTAwIGRhcms6Zm9jdXM6Ym9yZGVyLWJsdWUtNTAwXCJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJNYXN0ZXJcbiAgICAgICAgR3JvdXBcIiByZXF1aXJlZD5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiIGRpc2FibGVkIHNlbGVjdGVkPlNlbGVjdCBtYXN0ZXIgZ3JvdXA8L29wdGlvbj5cbiAgICAgIDwvc2VsZWN0PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjb2wtc3Bhbi02IHNtOmNvbC1zcGFuLTRcIj5cbiAgICAgIDxsYWJlbCBmb3I9XCJzdGF0dXNcIiBjbGFzcz1cImJsb2NrIG1iLTIgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktOTAwIGRhcms6dGV4dC13aGl0ZVwiPkdyb3VwPC9sYWJlbD5cbiAgICAgIDxzZWxlY3QgdHlwZT1cInRleHRcIiBuYW1lPVwiYWRkX2dyb3VwXCIgaWQ9XCJwcm9kdWN0LWdyb3VwLWFkZC1pdGVtLSR7aW5kZXh9XCJcbiAgICAgICAgY2xhc3M9XCJwcm9kdWN0LWdyb3VwLWFkZC1pdGVtIHNoYWRvdy1zbSBiZy1ncmF5LTUwIGJvcmRlciBib3JkZXItZ3JheS0zMDAgdGV4dC1ncmF5LTkwMCB0ZXh0LXNtIHJvdW5kZWQtbGcgZm9jdXM6cmluZy1ibHVlLTYwMCBmb2N1czpib3JkZXItYmx1ZS02MDAgYmxvY2sgdy1mdWxsIHAtMi41IGRhcms6YmctZ3JheS02MDAgZGFyazpib3JkZXItZ3JheS01MDAgZGFyazpwbGFjZWhvbGRlci1ncmF5LTQwMCBkYXJrOnRleHQtd2hpdGUgZGFyazpmb2N1czpyaW5nLWJsdWUtNTAwIGRhcms6Zm9jdXM6Ym9yZGVyLWJsdWUtNTAwXCJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJHcm91cFwiIHJlcXVpcmVkPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCIgZGlzYWJsZWQgc2VsZWN0ZWQ+U2VsZWN0IGdyb3VwPC9vcHRpb24+XG4gICAgICA8L3NlbGVjdD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sLXNwYW4tNiBzbTpjb2wtc3Bhbi00XCI+XG4gICAgICA8bGFiZWwgZm9yPVwic3RhdHVzXCIgY2xhc3M9XCJibG9jayBtYi0yIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtd2hpdGVcIj5BY3Rpb248L2xhYmVsPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgZGF0YS10YXJnZXQ9XCJcIlxuICAgICAgICBjbGFzcz1cInByb2R1Y3QtZ3JvdXAtYWRkLWRlbGV0ZS1pdGVtLWJ0biBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgcHgtMyBweS0yIG1yLTMgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWNlbnRlciB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgYmctcmVkLTYwMCBob3ZlcjpiZy1yZWQtODAwIGZvY3VzOnJpbmctNCBmb2N1czpyaW5nLXJlZC0zMDAgZGFyazpmb2N1czpyaW5nLXJlZC05MDBcIj5cbiAgICAgICAgPHN2ZyBjbGFzcz1cInctNiBoLTZcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCA0NDggNTEyXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICBkPVwiTTEzNS4yIDE3LjdDMTQwLjYgNi44IDE1MS43IDAgMTYzLjggMEgyODQuMmMxMi4xIDAgMjMuMiA2LjggMjguNiAxNy43TDMyMCAzMmg5NmMxNy43IDAgMzIgMTQuMyAzMiAzMnMtMTQuMyAzMi0zMiAzMkgzMkMxNC4zIDk2IDAgODEuNyAwIDY0UzE0LjMgMzIgMzIgMzJoOTZsNy4yLTE0LjN6TTMyIDEyOEg0MTZWNDQ4YzAgMzUuMy0yOC43IDY0LTY0IDY0SDk2Yy0zNS4zIDAtNjQtMjguNy02NC02NFYxMjh6bTk2IDY0Yy04LjggMC0xNiA3LjItMTYgMTZWNDMyYzAgOC44IDcuMiAxNiAxNiAxNnMxNi03LjIgMTYtMTZWMjA4YzAtOC44LTcuMi0xNi0xNi0xNnptOTYgMGMtOC44IDAtMTYgNy4yLTE2IDE2VjQzMmMwIDguOCA3LjIgMTYgMTYgMTZzMTYtNy4yIDE2LTE2VjIwOGMwLTguOC03LjItMTYtMTYtMTZ6bTk2IDBjLTguOCAwLTE2IDcuMi0xNiAxNlY0MzJjMCA4LjggNy4yIDE2IDE2IDE2czE2LTcuMiAxNi0xNlYyMDhjMC04LjgtNy4yLTE2LTE2LTE2elwiPlxuICAgICAgICAgIDwvcGF0aD5cbiAgICAgICAgPC9zdmc+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGlkPVwicHJvZHVjdC1ncm91cC1hZGQtYWRkLWl0ZW0tYnRuLSR7aW5kZXh9XCJcbiAgICAgICAgY2xhc3M9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgcHgtMyBweS0yIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1jZW50ZXIgdGV4dC13aGl0ZSByb3VuZGVkLWxnIGJnLXllbGxvdy00MDAgaG92ZXI6YmcteWVsbG93LTUwMCBmb2N1czpyaW5nLTQgZm9jdXM6cmluZy1yZWQtMzAwXCI+XG4gICAgICAgIDxzdmcgY2xhc3M9XCJ3LTYgaC02XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgNDQ4IDUxMlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgZD1cIk02NCA4MGMtOC44IDAtMTYgNy4yLTE2IDE2VjQxNmMwIDguOCA3LjIgMTYgMTYgMTZIMzg0YzguOCAwIDE2LTcuMiAxNi0xNlY5NmMwLTguOC03LjItMTYtMTYtMTZINjR6TTAgOTZDMCA2MC43IDI4LjcgMzIgNjQgMzJIMzg0YzM1LjMgMCA2NCAyOC43IDY0IDY0VjQxNmMwIDM1LjMtMjguNyA2NC02NCA2NEg2NGMtMzUuMyAwLTY0LTI4LjctNjQtNjRWOTZ6TTIwMCAzNDRWMjgwSDEzNmMtMTMuMyAwLTI0LTEwLjctMjQtMjRzMTAuNy0yNCAyNC0yNGg2NFYxNjhjMC0xMy4zIDEwLjctMjQgMjQtMjRzMjQgMTAuNyAyNCAyNHY2NGg2NGMxMy4zIDAgMjQgMTAuNyAyNCAyNHMtMTAuNyAyNC0yNCAyNEgyNDh2NjRjMCAxMy4zLTEwLjcgMjQtMjQgMjRzLTI0LTEwLjctMjQtMjR6XCI+XG4gICAgICAgICAgPC9wYXRoPlxuICAgICAgICA8L3N2Zz5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgYFxuXG4gIGNvbnN0IHByb2R1Y3RNYXN0ZXJHcm91cEFkZFNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQgPSBwcm9kdWN0R3JvdXBBZGRJdGVtLnF1ZXJ5U2VsZWN0b3IoXG4gICAgYCNwcm9kdWN0LW1hc3Rlci1ncm91cC1hZGQtaXRlbS0ke2luZGV4fWBcbiAgKVxuICBjb25zdCBwcm9kdWN0R3JvdXBBZGRTZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50ID0gcHJvZHVjdEdyb3VwQWRkSXRlbS5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdC1ncm91cC1hZGQtaXRlbScpXG4gIGNvbnN0IGF2YWlsYWJsZU1hc3Rlckdyb3VwcyA9IE9iamVjdC5rZXlzKGdyb3VwcylcblxuICBhdmFpbGFibGVNYXN0ZXJHcm91cHMuZm9yRWFjaCgobWFzdGVyR3JvdXApID0+IHtcbiAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKVxuICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgbWFzdGVyR3JvdXApXG4gICAgb3B0aW9uLmlubmVySFRNTCA9IG1hc3Rlckdyb3VwXG4gICAgcHJvZHVjdE1hc3Rlckdyb3VwQWRkU2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbilcbiAgfSlcbiAgY29uc3Qgb3B0aW9ucyA9IHByb2R1Y3RNYXN0ZXJHcm91cEFkZFNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKCdvcHRpb24nKVxuXG4gIHByb2R1Y3RNYXN0ZXJHcm91cEFkZFNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgb3B0aW9ucy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICBpZiAoZS50ZXh0Q29udGVudCA9PT0gcHJvZHVjdE1hc3Rlckdyb3VwQWRkU2VsZWN0Lm9wdGlvbnNbcHJvZHVjdE1hc3Rlckdyb3VwQWRkU2VsZWN0LnNlbGVjdGVkSW5kZXhdLnRleHQpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uQ2F0ZWdvcnkgPVxuICAgICAgICAgIGdyb3Vwc1twcm9kdWN0TWFzdGVyR3JvdXBBZGRTZWxlY3Qub3B0aW9uc1twcm9kdWN0TWFzdGVyR3JvdXBBZGRTZWxlY3Quc2VsZWN0ZWRJbmRleF0udGV4dF1cblxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcHJvZHVjdC1ncm91cC1hZGQtaXRlbS0ke2luZGV4fWApLmlubmVySFRNTCA9ICcnXG4gICAgICAgIGlmIChvcHRpb25DYXRlZ29yeSkge1xuICAgICAgICAgIG9wdGlvbkNhdGVnb3J5LmZvckVhY2goKGdyb3VwOiB7IGdyb3VwX25hbWU6IHN0cmluZzsgZ3JvdXBfaWQ6IG51bWJlciB9KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzdG9yZVNlbGVjdE9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpXG4gICAgICAgICAgICBzdG9yZVNlbGVjdE9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgZ3JvdXAuZ3JvdXBfaWQudG9TdHJpbmcoKSlcbiAgICAgICAgICAgIHN0b3JlU2VsZWN0T3B0aW9uLnRleHRDb250ZW50ID0gZ3JvdXAuZ3JvdXBfbmFtZVxuICAgICAgICAgICAgcHJvZHVjdEdyb3VwQWRkU2VsZWN0LmFwcGVuZENoaWxkKHN0b3JlU2VsZWN0T3B0aW9uKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9KVxuXG4gIHByb2R1Y3RHcm91cEFkZENvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9kdWN0R3JvdXBBZGRJdGVtKVxuXG4gIGNvbnN0IGFkZEJ1dHRvbiA9IHByb2R1Y3RHcm91cEFkZEl0ZW0ucXVlcnlTZWxlY3RvcihgI3Byb2R1Y3QtZ3JvdXAtYWRkLWFkZC1pdGVtLWJ0bi0ke2luZGV4fWApXG5cbiAgYWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNyZWF0ZVByb2R1Y3RHcm91cEFkZEl0ZW0oKVxuICB9KVxuXG4gIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IHByb2R1Y3RHcm91cEFkZEl0ZW0ucXVlcnlTZWxlY3RvcignLnByb2R1Y3QtZ3JvdXAtYWRkLWRlbGV0ZS1pdGVtLWJ0bicpXG4gIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCBpbmJvdW5kT3JkZXJJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmRlbGV0ZS1pZC0ke2luZGV4fWApXG4gICAgaWYgKGluYm91bmRPcmRlckl0ZW0pIHtcbiAgICAgIGluYm91bmRPcmRlckl0ZW0ucmVtb3ZlKClcbiAgICB9XG4gIH0pXG59XG5cbi8vIHRoaXMgYnV0dG9uIG5lZWQgdG8gYWRkIGZpcnN0IGl0ZW0gZnJvbSB0ZW1wbGF0ZVxuY29uc3QgcHJvZHVjdEdyb3VwQWRkQnRuQnlJZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWdyb3VwLWFkZC1hZGQtaXRlbS1idG4nKVxucHJvZHVjdEdyb3VwQWRkQnRuQnlJZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgY3JlYXRlUHJvZHVjdEdyb3VwQWRkSXRlbSgpXG59KVxuXG4vLyAtLS0tc3VibWl0IGFkZCBmb3JtIHRocm91Z2ggaGlkZGVuIHN1Ym1pdCBidXR0b24tLS0tXG5jb25zdCBwcm9kdWN0QWRkU3VibWl0QnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWFkZC1zdWJtaXQtYnRuJylcbmNvbnN0IHByb2R1Y3RBZGRTYXZlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtYWRkLXNhdmUtcHJvZHVjdHMtYnRuJylcblxucHJvZHVjdEFkZFNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IHNldFByb2R1Y3RzKCdhZGQnKVxuICBpZiAocmVzdWx0KSB7XG4gICAgcHJvZHVjdEFkZFN1Ym1pdEJ1dHRvbi5jbGljaygpXG4gIH1cbn0pXG5cbi8vIC0tLS1jbGVhciBwcm9kdWN0IGdyb3VwIGNvbnRhaW5lci0tLS1cbmZ1bmN0aW9uIGNsZWFyUHJvZHVjdEdyb3VwQ29udGFpbmVyKCkge1xuICBjb25zdCBwcm9kdWN0R3JvdXBFZGl0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZ3JvdXAtZWRpdC1hZGQtY29udGFpbmVyJylcbiAgY29uc3QgcHJvZHVjdEdyb3VwRWRpdEl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3QtZ3JvdXAtZWRpdC1hZGQtaXRlbScpXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgcHJvZHVjdEdyb3VwRWRpdEl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgcHJvZHVjdEdyb3VwRWRpdENvbnRhaW5lci5yZW1vdmVDaGlsZChwcm9kdWN0R3JvdXBFZGl0SXRlbXNbaV0pXG4gIH1cbiAgY29uc3QgcHJvZHVjdEdyb3VwRWRpdFNlbGVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdC1ncm91cC1lZGl0LWFkZC1pdGVtJylcbn1cblxuLy8gLS0tLXByb2R1Y3Qgc2hvdyBzdG9ja3Mgb3duIGJ5IG1lLS0tLVxuY29uc3Qgc2hvd1Byb2R1Y3RCeVVzZXJHcm91cENoZWNrYm94OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtc2hvdy1zdG9ja3Mtb3duLWJ5LW1lLWJ0bicpXG5pZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLmhhc2ggPT09ICcvcHJvZHVjdC9zdG9ja3Nfb3duZWRfYnlfbWUnKSB7XG4gIHdpbmRvdy5vbmxvYWQgPSAoZXZlbnQpID0+IHtcbiAgICBzaG93UHJvZHVjdEJ5VXNlckdyb3VwQ2hlY2tib3guc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ2NoZWNrZWQnKVxuICB9XG59XG5zaG93UHJvZHVjdEJ5VXNlckdyb3VwQ2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgYXN5bmMgKCkgPT4ge1xuICBpZiAoc2hvd1Byb2R1Y3RCeVVzZXJHcm91cENoZWNrYm94LmNoZWNrZWQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2R1Y3Qvc3RvY2tzX293bmVkX2J5X21lJywge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZXNwb25zZS51cmxcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvcHJvZHVjdC9gLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlc3BvbnNlLnVybFxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgICB9XG4gIH1cbn0pXG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWFzc2lnbi1tYXN0ZXItZ3JvdXAnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gIGNvbnN0IHByb2R1Y3RBc3NpZ25NYXN0ZXJHcm91cFNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1hc3NpZ24tbWFzdGVyLWdyb3VwJylcbiAgY29uc3QgcHJvZHVjdEFzc2lnbkdyb3VwU2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWFzc2lnbi1ncm91cCcpXG4gIGNvbnN0IGdyb3VwczogSU1hc3Rlckdyb3VwID0gSlNPTi5wYXJzZShcbiAgICBwcm9kdWN0QXNzaWduTWFzdGVyR3JvdXBTZWxlY3RbcHJvZHVjdEFzc2lnbk1hc3Rlckdyb3VwU2VsZWN0LnNlbGVjdGVkSW5kZXhdLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKVxuICApXG4gIGNvbnN0IGF2YWlsYWJsZU1hc3Rlckdyb3VwcyA9IE9iamVjdC5rZXlzKGdyb3Vwcy5tYXN0ZXJfZ3JvdXBzX2xpc3RfZ3JvdXBzKVxuXG4gIHByb2R1Y3RBc3NpZ25Hcm91cFNlbGVjdC5pbm5lckhUTUwgPSAnJ1xuXG4gIGF2YWlsYWJsZU1hc3Rlckdyb3Vwcy5mb3JFYWNoKChtYXN0ZXJHcm91cCkgPT4ge1xuICAgIGlmIChtYXN0ZXJHcm91cCA9PT0gcHJvZHVjdEFzc2lnbk1hc3Rlckdyb3VwU2VsZWN0Lm9wdGlvbnNbcHJvZHVjdEFzc2lnbk1hc3Rlckdyb3VwU2VsZWN0LnNlbGVjdGVkSW5kZXhdLnRleHQpIHtcbiAgICAgIGNvbnN0IG9wdGlvbkNhdGVnb3J5ID0gZ3JvdXBzLm1hc3Rlcl9ncm91cHNfbGlzdF9ncm91cHNbbWFzdGVyR3JvdXBdXG5cbiAgICAgIGlmIChvcHRpb25DYXRlZ29yeSkge1xuICAgICAgICBvcHRpb25DYXRlZ29yeS5mb3JFYWNoKChncm91cDogeyBncm91cF9uYW1lOiBzdHJpbmc7IGdyb3VwX2lkOiBudW1iZXIgfSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHN0b3JlU2VsZWN0T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJylcbiAgICAgICAgICBzdG9yZVNlbGVjdE9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgZ3JvdXAuZ3JvdXBfaWQudG9TdHJpbmcoKSlcbiAgICAgICAgICBzdG9yZVNlbGVjdE9wdGlvbi50ZXh0Q29udGVudCA9IGdyb3VwLmdyb3VwX25hbWVcbiAgICAgICAgICBwcm9kdWN0QXNzaWduR3JvdXBTZWxlY3QuYXBwZW5kQ2hpbGQoc3RvcmVTZWxlY3RPcHRpb24pXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9KVxufSlcblxuLy8gLS0taW1hZ2UgY29tcHJlc3Nvci0tLS1cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9kdWN0LWFkZC1pbWFnZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGFzeW5jIChlKSA9PiB7XG4gIGNvbnN0IGRlc2lyZWRJbWFnZVNpemUgPSAzMDAgKiAxMDI0XG4gIGNvbnN0IGxvd0ltYWdlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KCcjcHJvZHVjdC1hZGQtbG93LWltYWdlJylcbiAgY29uc3QgaW5pdGlhbEltYWdlID0gKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLmZpbGVzWzBdXG5cbiAgaWYgKGluaXRpYWxJbWFnZS5zaXplID4gZGVzaXJlZEltYWdlU2l6ZSkge1xuICAgIGNvbnN0IGNvbXByZXNzZWRJbWFnZSA9IGF3YWl0IGNvbXByZXNzSW1hZ2UoaW5pdGlhbEltYWdlKVxuICAgIGNvbnN0IGNvbXByZXNzZWRJbWFnZUZpbGUgPSBuZXcgRmlsZShbY29tcHJlc3NlZEltYWdlXSwgYGxvd18ke2luaXRpYWxJbWFnZS5uYW1lfWAsIHtcbiAgICAgIHR5cGU6IGluaXRpYWxJbWFnZS50eXBlLFxuICAgIH0pXG5cbiAgICBsb3dJbWFnZUlucHV0LmZpbGVzID0gc2V0RmlsZUlucHV0KGNvbXByZXNzZWRJbWFnZUZpbGUpXG4gIH0gZWxzZSB7XG4gICAgbG93SW1hZ2VJbnB1dC5maWxlcyA9IHNldEZpbGVJbnB1dChpbml0aWFsSW1hZ2UpXG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBjb21wcmVzc0ltYWdlKGZpbGU6IEZpbGUpIHtcbiAgICBjb25zdCBtYXhGaWxlU2l6ZSA9IGRlc2lyZWRJbWFnZVNpemVcbiAgICBsZXQgcXVhbGl0eSA9IDAuNlxuXG4gICAgd2hpbGUgKHF1YWxpdHkgPiAwKSB7XG4gICAgICBjb25zdCBjb21wcmVzc2VkRmlsZSA9IGF3YWl0IGNvbXByZXNzUXVhbGl0eUltYWdlKGZpbGUsIHF1YWxpdHkpXG4gICAgICBpZiAoKGNvbXByZXNzZWRGaWxlIGFzIEZpbGUpLnNpemUgPCBtYXhGaWxlU2l6ZSkge1xuICAgICAgICByZXR1cm4gY29tcHJlc3NlZEZpbGVcbiAgICAgIH1cbiAgICAgIHF1YWxpdHkgLT0gMC4xXG4gICAgICBpZiAocXVhbGl0eSA8IDAuMSkge1xuICAgICAgICByZXR1cm4gY29tcHJlc3NlZEZpbGVcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBjb21wcmVzc1F1YWxpdHlJbWFnZShmaWxlOiBGaWxlLCBxdWFsaXR5OiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8QmxvYj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKVxuICAgICAgaW1hZ2Uuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKVxuICAgICAgaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICAgICAgY2FudmFzLndpZHRoID0gMzAwXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSAzMDBcblxuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgMCwgMCwgMzAwLCAzMDApXG5cbiAgICAgICAgY2FudmFzLnRvQmxvYihcbiAgICAgICAgICAoYmxvYikgPT4ge1xuICAgICAgICAgICAgaWYgKGJsb2IpIHtcbiAgICAgICAgICAgICAgcmVzb2x2ZShibG9iKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignRmFpbGVkIHRvIGNvbnZlcnQnKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGZpbGUudHlwZSxcbiAgICAgICAgICBxdWFsaXR5XG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgaW1hZ2Uub25lcnJvciA9IChlcnIpID0+IHtcbiAgICAgICAgcmVqZWN0KGVycilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0RmlsZUlucHV0KGZpbGU6IEZpbGUpIHtcbiAgICBjb25zdCBmaWxlTGlzdCA9IG5ldyBEYXRhVHJhbnNmZXIoKVxuICAgIGZpbGVMaXN0Lml0ZW1zLmFkZChmaWxlKVxuICAgIHJldHVybiBmaWxlTGlzdC5maWxlc1xuICB9XG59KVxuXG4vLyBwcm9kdWN0Qm9va2luZ0J1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PlxuLy8gICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbi8vICAgICAgICAgY29uc3QgcHJvZHVjdCA9IEpTT04ucGFyc2UoYnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKSlcbi8vICAgICAgICAgY29uc29sZS5sb2cocHJvZHVjdClcblxuLy8gICAgICAgICBsZXQgZGl2OiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWV2ZW50LW5hbWUnKVxuLy8gICAgICAgICBkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5uYW1lXG4vLyAgICAgICAgIGNvbnN0IGltZzogSFRNTEltYWdlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWV2ZW50LWltYWdlJylcbi8vICAgICAgICAgY29uc3QgZnVsbEltYWdlQW5jaG9yID0gaW1nLmNsb3Nlc3QoJy5wcm9kdWN0LWZ1bGwtaW1hZ2UtYW5jaG9yJylcbi8vICAgICAgICAgZnVsbEltYWdlQW5jaG9yLnNldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtcHJvZHVjdC1pZCcsIHByb2R1Y3QuaWQudG9TdHJpbmcoKSlcbi8vICAgICAgICAgcHJvZHVjdC5pbWFnZS5sZW5ndGggPiAxMDBcbi8vICAgICAgICAgICAgID8gKGltZy5zcmMgPSBgZGF0YTppbWFnZS9wbmc7YmFzZTY0LCAke3Byb2R1Y3QuaW1hZ2V9YClcbi8vICAgICAgICAgICAgIDogKGltZy5zcmMgPSBkZWZhdWx0QnJhbmRJbWFnZSlcbi8vICAgICAgICAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZXZlbnQtU0tVJylcbi8vICAgICAgICAgZGl2LmlubmVySFRNTCA9IHByb2R1Y3QuU0tVXG4vLyAgICAgICAgIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWV2ZW50LW5leHRfdXJsJylcbi8vICAgICAgICAgZGl2LmlubmVySFRNTCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmXG5cbi8vICAgICAgICAgY29uc3QgcHJvZHVjdElkSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ldmVudC1wcm9kdWN0LWlkJylcbi8vICAgICAgICAgcHJvZHVjdElkSW5wdXQudmFsdWUgPSBwcm9kdWN0LmlkLnRvU3RyaW5nKClcblxuLy8gICAgICAgICAvLyBkYXRlcGlja2VyXG4vLyAgICAgICAgIGNvbnN0IGV2ZW50RGF0ZXBpY2tlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdC1ldmVudC1kYXRlcGlja2VyJylcbi8vICAgICAgICAgY29uc3QgZGF0ZUN1cnJlbnQgPSBuZXcgRGF0ZSgpXG4vLyAgICAgICAgIGNvbnN0IGRhdGVFdmVudCA9IG5ldyBEYXRlKGRhdGVDdXJyZW50LmdldEZ1bGxZZWFyKCksIGRhdGVDdXJyZW50LmdldE1vbnRoKCksIGRhdGVDdXJyZW50LmdldERhdGUoKSArIDUpXG5cbi8vICAgICAgICAgY29uc3Qgb3B0aW9uID0ge1xuLy8gICAgICAgICAgICAgdG9kYXlIaWdobGlnaHQ6IHRydWUsXG4vLyAgICAgICAgICAgICBtaW5EYXRlOiBkYXRlRXZlbnQsXG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICBldmVudERhdGVwaWNrZXJzLmZvckVhY2goKGRhdGVwaWNrZXI6IEhUTUxEaXZFbGVtZW50LCBpbmRleCkgPT4ge1xuLy8gICAgICAgICAgICAgY29uc3QgZXZlbnREYXRlUGlja2VyID0gbmV3IERhdGVwaWNrZXIoZGF0ZXBpY2tlcilcbi8vICAgICAgICAgICAgIGV2ZW50RGF0ZVBpY2tlci5zZXRPcHRpb25zKG9wdGlvbilcbi8vICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuLy8gICAgICAgICAgICAgICAgIGV2ZW50RGF0ZVBpY2tlci5zZXREYXRlKGRhdGVFdmVudClcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSlcbi8vICAgICB9KVxuLy8gKVxuXG5mdW5jdGlvbiBnZXRGaWx0ZXJWYWx1ZXMoaXNDaGVja2VkOiBib29sZWFuKSB7XG4gIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpXG4gIGNvbnN0IGV2ZW50U29ydFRvZ2dsZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXNob3ctZXZlbnRzLXRvZ2dsZS1idG4nKVxuXG4gIGlzQ2hlY2tlZCA/IHVybC5zZWFyY2hQYXJhbXMuc2V0KCdldmVudHMnLCAndHJ1ZScpIDogdXJsLnNlYXJjaFBhcmFtcy5kZWxldGUoJ2V2ZW50cycpXG4gIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYCR7dXJsLmhyZWZ9YFxufVxuXG5jb25zdCBldmVudFNvcnRUb2dnbGVCdXR0b246IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1zaG93LWV2ZW50cy10b2dnbGUtYnRuJylcbmV2ZW50U29ydFRvZ2dsZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gIGdldEZpbHRlclZhbHVlcyhldmVudFNvcnRUb2dnbGVCdXR0b24uY2hlY2tlZClcbn0pXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3Byb2R1Y3QudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=