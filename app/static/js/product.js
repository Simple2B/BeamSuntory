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
            productFilterTh.classList.add('px-6', 'py-3');
            productFilterTh.setAttribute('scope', 'col');
            productFilterTh.innerHTML = key;
            referenceTh.parentNode.insertBefore(productFilterTh, referenceTh.nextSibling);
        }
        productItemTrs.forEach(function (product) {
            var referenceTd = product.cells[4];
            var productName = product.cells[2].innerText;
            for (var key in filterData) {
                var productFilterName = filterData[key];
                var productFilterTd = document.createElement('td');
                productFilterTd.setAttribute('id', "product-table-filter-".concat(key, "-").concat(productFilterName.replace(/ /g, '_'), "-").concat(productName.replace(/ /g, '_')));
                productFilterTd.classList.add('p-4', 'text-base', 'font-normal', 'text-gray-900', 'whitespace-nowrap', 'dark:text-white');
                productFilterTd.innerHTML = "\n        <div class=\"pl-3\">\n          <div class=\"text-base font-semibold\">".concat(productFilterName, "</div>\n        </div>\n      ");
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
            productFilterTh.classList.add('px-6', 'py-3');
            productFilterTh.setAttribute('scope', 'col');
            productFilterTh.innerHTML = masterGroupName.replace(/_/g, ' ');
            referenceTh.parentNode.insertBefore(productFilterTh, referenceTh.nextSibling);
            productItemTrs.forEach(function (productItem) {
                var referenceTd = productItem.cells[4];
                var productName = productItem.cells[2].innerText;
                var productFilterName = productMgGGlobal[productName][masterGroupName] || '-';
                var productFilterTd = document.createElement('td');
                productFilterTd.setAttribute('id', "product-table-filter-".concat(masterGroupName, "-").concat(productFilterName.replace(/ /g, '_'), "-").concat(productName.replace(/ /g, '_')));
                productFilterTd.classList.add('p-4', 'text-base', 'font-normal', 'text-gray-900', 'whitespace-nowrap', 'dark:text-white');
                productFilterTd.innerHTML = "\n            <div class=\"pl-3\">\n              <div class=\"text-base font-semibold\">".concat(productFilterName, "</div>\n            </div>\n          ");
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
                    var productName = productItem.cells[2].innerText;
                    var productFilterName = productMgG[productName][masterGroupName] || '-';
                    var productFilterTd = document.createElement('td');
                    productFilterTd.setAttribute('id', "product-table-filter-".concat(masterGroupName, "-").concat(productFilterName.replace(/ /g, '_'), "-").concat(productName.replace(/ /g, '_')));
                    productFilterTd.classList.add('p-4', 'text-base', 'font-normal', 'text-gray-900', 'whitespace-nowrap', 'dark:text-white');
                    productFilterTd.innerHTML = "\n            <div class=\"pl-3\">\n              <div class=\"text-base font-semibold\">".concat(productFilterName, "</div>\n            </div>\n          ");
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
                    var productName = productItem.cells[2].innerText;
                    var productFilterName = productMgG[productName][masterGroupName] || '-';
                    var isProductFilterExist = document.querySelector("#product-table-filter-".concat(masterGroupName, "-").concat(productFilterName.replace(/ /g, '_'), "-").concat(productName.replace(/ /g, '_')));
                    if (isProductFilterExist) {
                        isProductFilterExist.remove();
                    }
                });
            }
        }
    });
});
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
var eventModal = new flowbite_1.Modal($eventProductModalElement, modalShipAssignOptions);
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
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
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
var DATA_FROM_BE = {
    '2023-09-03': '25',
    '2023-09-04': '26',
    '2023-09-05': '27',
    '2023-09-06': '28',
    '2023-09-07': '29',
    '2023-09-11': '28',
};
var picker = new bundle_1.easepick.create({
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
        }
    },
    setup: function (picker) {
        var randomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };
        var prices = {};
        Object.entries(DATA_FROM_BE).forEach(function (_a) {
            var date = _a[0], price = _a[1];
            prices[date] = price;
        });
        picker.on('view', function (evt) {
            var _a = evt.detail, view = _a.view, date = _a.date, target = _a.target;
            var d = date ? date.format('YYYY-MM-DD') : null;
            var month = date ? date.format('MM') : null;
            if (view === 'CalendarDay' && prices[d]) {
                var span = target.querySelector('.day-price') || document.createElement('span');
                span.className = 'day-price';
                span.innerHTML = prices[d];
                target.append(span);
            }
            //GET DATA AND AMOUNT FORM BE
        });
    }
});
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
function convertDate(date) {
    var inputDate = date.split('T')[0];
    var dateParts = inputDate.split('-');
    var year = dateParts[0];
    var month = dateParts[1];
    var day = dateParts[2];
    return "".concat(month, "/").concat(day, "/").concat(year);
}
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
    console.log(' product', product);
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
    input.value = product.regular_price.toString();
    input = document.querySelector('#product-edit-retail_price');
    input.value = product.retail_price.toString();
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
                        if (e.textContent ===
                            productMasterGroupEditSelect.options[productMasterGroupEditSelect.selectedIndex].text) {
                            var groupSelect_2 = document.querySelector('#product-group-edit-item-1');
                            var optionCategory = product.mstr_prod_grps_prod_grps_names[productMasterGroupEditSelect.options[productMasterGroupEditSelect.selectedIndex]
                                .text];
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
                        console.log('if product');
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
        var bookingButton = document.querySelector('.product-booking-button');
        if (bookingButton) {
            bookingButton.setAttribute('data-target', e.getAttribute('data-target'));
        }
        var product = JSON.parse(e.getAttribute('data-target'));
        sessionStorage.setItem('product', JSON.stringify(product));
        var prodGroups = Object.keys(product.mstr_groups_groups);
        var eventCheckbox = document.querySelector('#product-show-events-toggle-btn');
        var isEvent = eventCheckbox.checked;
        prodGroups.forEach(function (groupName) {
            var isEqual = false;
            var mstrGroupName = product.mstr_groups_groups[groupName];
            console.log('mstrGroupName', mstrGroupName);
            if (product.current_user_groups.hasOwnProperty(mstrGroupName)) {
                var currentUserValue = product.current_user_groups[mstrGroupName];
                if (currentUserValue.includes(groupName)) {
                    isEqual = true;
                }
            }
            if (mstrGroupName !== 'Events' || isEvent) {
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
        product.image.length > 100
            ? (img.src = "data:image/png;base64, ".concat(product.image))
            : (img.src = defaultBrandImage);
        div = document.querySelector('#product-view-regular_price');
        div.innerHTML = product.regular_price.toString();
        div = document.querySelector('#product-view-retail_price');
        div.innerHTML = product.retail_price.toString();
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
        product.image.length > 100
            ? (img.src = "data:image/png;base64, ".concat(product.image))
            : (img.src = defaultBrandImage);
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
    desiredQuantityInput.addEventListener('change', function () {
        var availableQuantityDiv = document.querySelector('#product-ship-available-quantity');
        availableQuantityDiv.textContent = product.available_quantity[group.replace('_', ' ')].toString();
        var desiredQuantity = Number(desiredQuantityInput.value);
        var availableQuantity = Number(availableQuantityDiv.textContent);
        if (desiredQuantity > availableQuantity) {
            desiredQuantityInput.value = availableQuantity.toString();
        }
        availableQuantityDiv.textContent = (availableQuantity - desiredQuantity).toString();
    });
}
// function to booking
function booking(product, group) {
    console.log('product', product);
    var img = document.querySelector('#product-event-image');
    var fullImageAnchor = img.closest('.product-full-image-anchor');
    fullImageAnchor.setAttribute('data-target-product-id', product.id.toString());
    product.image.length > 100 ? (img.src = "data:image/png;base64, ".concat(product.image)) : (img.src = defaultBrandImage);
    var div = document.querySelector('#product-event-name');
    div.innerHTML = product.name;
    div = document.querySelector('#product-event-SKU');
    console.log(product.SKU);
    div.innerHTML = product.SKU;
    var input = document.querySelector('#product-event-group-hidden');
    input.value = group.replace('_', ' ');
    input = document.querySelector('#product-event-product-id');
    input.value = product.id.toString();
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
    input = document.querySelector('#product-assign-from-group');
    input.value = group.replace('_', ' ');
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
    var isEvent = eventCheckbox.checked;
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
    var bookingProductBtn = shipAssignContainer.querySelector("#booking-product-button-".concat(groupUnderScore));
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
    var bookingButtons = document.querySelectorAll('.booking-product-button');
    bookingButtons.forEach(function (e) {
        return e.addEventListener('click', function () {
            var shipGroup = e.getAttribute('ship-group-data');
            var product = JSON.parse(sessionStorage.product);
            booking(product, shipGroup);
        });
    });
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
    console.log(productParam);
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
    console.log(eventSortToggleButton.checked);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxpQ0FBaUMsQ0FBQztBQUN6RyxxQkFBcUIsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUU7SUFDN0MsZUFBZSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQztJQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQztBQUM5QyxDQUFDLENBQUM7Ozs7Ozs7VUNud0RGO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0BlYXNlcGljay9idW5kbGUvZGlzdC9pbmRleC5lc20uanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9jcmVhdGVQb3BwZXIuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvY29udGFpbnMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Qm91bmRpbmdDbGllbnRSZWN0LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldENsaXBwaW5nUmVjdC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRDb21wb3NpdGVSZWN0LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldENvbXB1dGVkU3R5bGUuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0RG9jdW1lbnRFbGVtZW50LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldERvY3VtZW50UmVjdC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRIVE1MRWxlbWVudFNjcm9sbC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRMYXlvdXRSZWN0LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldE5vZGVOYW1lLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldE5vZGVTY3JvbGwuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0T2Zmc2V0UGFyZW50LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldFBhcmVudE5vZGUuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0U2Nyb2xsUGFyZW50LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldFZpZXdwb3J0UmVjdC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRXaW5kb3cuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0V2luZG93U2Nyb2xsLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldFdpbmRvd1Njcm9sbEJhclguanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvaW5zdGFuY2VPZi5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9pc0xheW91dFZpZXdwb3J0LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2lzU2Nyb2xsUGFyZW50LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2lzVGFibGVFbGVtZW50LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2xpc3RTY3JvbGxQYXJlbnRzLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZW51bXMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvYXBwbHlTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvYXJyb3cuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvY29tcHV0ZVN0eWxlcy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9ldmVudExpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9mbGlwLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2hpZGUuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvb2Zmc2V0LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL3BvcHBlck9mZnNldHMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvcHJldmVudE92ZXJmbG93LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvcG9wcGVyLWxpdGUuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9wb3BwZXIuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9jb21wdXRlQXV0b1BsYWNlbWVudC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2NvbXB1dGVPZmZzZXRzLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZGVib3VuY2UuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9kZXRlY3RPdmVyZmxvdy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2V4cGFuZFRvSGFzaE1hcC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2Zvcm1hdC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2dldEFsdEF4aXMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZ2V0RnJlc2hTaWRlT2JqZWN0LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZ2V0TWFpbkF4aXNGcm9tUGxhY2VtZW50LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZ2V0T3Bwb3NpdGVQbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9nZXRPcHBvc2l0ZVZhcmlhdGlvblBsYWNlbWVudC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2dldFZhcmlhdGlvbi5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL21hdGguanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9tZXJnZUJ5TmFtZS5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL21lcmdlUGFkZGluZ09iamVjdC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL29yZGVyTW9kaWZpZXJzLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvcmVjdFRvQ2xpZW50UmVjdC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL3VuaXF1ZUJ5LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvdXNlckFnZW50LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvdmFsaWRhdGVNb2RpZmllcnMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy93aXRoaW4uanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9hY2NvcmRpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9hY2NvcmRpb24vaW50ZXJmYWNlLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvYWNjb3JkaW9uL3R5cGVzLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvY2Fyb3VzZWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9jYXJvdXNlbC9pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9jYXJvdXNlbC90eXBlcy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL2NvbGxhcHNlL2luZGV4LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvY29sbGFwc2UvaW50ZXJmYWNlLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvY29sbGFwc2UvdHlwZXMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9kaWFsL2luZGV4LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvZGlhbC9pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9kaWFsL3R5cGVzLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvZGlzbWlzcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL2Rpc21pc3MvaW50ZXJmYWNlLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvZGlzbWlzcy90eXBlcy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL2RyYXdlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL2RyYXdlci9pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9kcmF3ZXIvdHlwZXMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9kcm9wZG93bi9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL2Ryb3Bkb3duL2ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL2Ryb3Bkb3duL3R5cGVzLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9tb2RhbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL21vZGFsL2ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL21vZGFsL3R5cGVzLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvcG9wb3Zlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL3BvcG92ZXIvaW50ZXJmYWNlLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvcG9wb3Zlci90eXBlcy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL3RhYnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy90YWJzL2ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL3RhYnMvdHlwZXMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy90b29sdGlwL2luZGV4LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvdG9vbHRpcC9pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy90b29sdGlwL3R5cGVzLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2RvbS9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vc3JjL3Byb2R1Y3QudHMiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIHQgZXh0ZW5kcyBEYXRle3N0YXRpYyBwYXJzZURhdGVUaW1lKGUsaT1cIllZWVktTU0tRERcIixuPVwiZW4tVVNcIil7aWYoIWUpcmV0dXJuIG5ldyBEYXRlKChuZXcgRGF0ZSkuc2V0SG91cnMoMCwwLDAsMCkpO2lmKGUgaW5zdGFuY2VvZiB0KXJldHVybiBlLnRvSlNEYXRlKCk7aWYoZSBpbnN0YW5jZW9mIERhdGUpcmV0dXJuIGU7aWYoL14tP1xcZHsxMCx9JC8udGVzdChTdHJpbmcoZSkpKXJldHVybiBuZXcgRGF0ZShOdW1iZXIoZSkpO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBlKXtjb25zdCBzPVtdO2xldCBvPW51bGw7Zm9yKDtudWxsIT0obz10LnJlZ2V4LmV4ZWMoaSkpOylcIlxcXFxcIiE9PW9bMV0mJnMucHVzaChvKTtpZihzLmxlbmd0aCl7Y29uc3QgaT17eWVhcjpudWxsLG1vbnRoOm51bGwsc2hvcnRNb250aDpudWxsLGxvbmdNb250aDpudWxsLGRheTpudWxsLGhvdXI6MCxtaW51dGU6MCxzZWNvbmQ6MCxhbXBtOm51bGwsdmFsdWU6XCJcIn07c1swXS5pbmRleD4wJiYoaS52YWx1ZSs9XCIuKj9cIik7Zm9yKGNvbnN0W2Usb11vZiBPYmplY3QuZW50cmllcyhzKSl7Y29uc3Qgcz1OdW1iZXIoZSkse2dyb3VwOmEscGF0dGVybjpyfT10LmZvcm1hdFBhdHRlcm5zKG9bMF0sbik7aVthXT1zKzEsaS52YWx1ZSs9cixpLnZhbHVlKz1cIi4qP1wifWNvbnN0IG89bmV3IFJlZ0V4cChgXiR7aS52YWx1ZX0kYCk7aWYoby50ZXN0KGUpKXtjb25zdCBzPW8uZXhlYyhlKSxhPU51bWJlcihzW2kueWVhcl0pO2xldCByPW51bGw7aS5tb250aD9yPU51bWJlcihzW2kubW9udGhdKS0xOmkuc2hvcnRNb250aD9yPXQuc2hvcnRNb250aHMobikuaW5kZXhPZihzW2kuc2hvcnRNb250aF0pOmkubG9uZ01vbnRoJiYocj10LmxvbmdNb250aHMobikuaW5kZXhPZihzW2kubG9uZ01vbnRoXSkpO2NvbnN0IGM9TnVtYmVyKHNbaS5kYXldKXx8MSxsPU51bWJlcihzW2kuaG91cl0pO2xldCBoPU51bWJlci5pc05hTihsKT8wOmw7Y29uc3QgZD1OdW1iZXIoc1tpLm1pbnV0ZV0pLHA9TnVtYmVyLmlzTmFOKGQpPzA6ZCx1PU51bWJlcihzW2kuc2Vjb25kXSksZz1OdW1iZXIuaXNOYU4odSk/MDp1LG09c1tpLmFtcG1dO3JldHVybiBtJiZcIlBNXCI9PT1tJiYoaCs9MTIsMjQ9PT1oJiYoaD0wKSksbmV3IERhdGUoYSxyLGMsaCxwLGcsMCl9fX1yZXR1cm4gbmV3IERhdGUoKG5ldyBEYXRlKS5zZXRIb3VycygwLDAsMCwwKSl9c3RhdGljIHJlZ2V4PS8oXFxcXCk/KFl7Miw0fXxNezEsNH18RHsxLDJ9fEh7MSwyfXxoezEsMn18bXsxLDJ9fHN7MSwyfXxBfGEpL2c7c3RhdGljIE1PTlRIX0pTPVswLDEsMiwzLDQsNSw2LDcsOCw5LDEwLDExXTtzdGF0aWMgc2hvcnRNb250aHMoZSl7cmV0dXJuIHQuTU9OVEhfSlMubWFwKCh0PT5uZXcgRGF0ZSgyMDE5LHQpLnRvTG9jYWxlU3RyaW5nKGUse21vbnRoOlwic2hvcnRcIn0pKSl9c3RhdGljIGxvbmdNb250aHMoZSl7cmV0dXJuIHQuTU9OVEhfSlMubWFwKCh0PT5uZXcgRGF0ZSgyMDE5LHQpLnRvTG9jYWxlU3RyaW5nKGUse21vbnRoOlwibG9uZ1wifSkpKX1zdGF0aWMgZm9ybWF0UGF0dGVybnMoZSxpKXtzd2l0Y2goZSl7Y2FzZVwiWVlcIjpjYXNlXCJZWVlZXCI6cmV0dXJue2dyb3VwOlwieWVhclwiLHBhdHRlcm46YChcXFxcZHske2UubGVuZ3RofX0pYH07Y2FzZVwiTVwiOnJldHVybntncm91cDpcIm1vbnRoXCIscGF0dGVybjpcIihcXFxcZHsxLDJ9KVwifTtjYXNlXCJNTVwiOnJldHVybntncm91cDpcIm1vbnRoXCIscGF0dGVybjpcIihcXFxcZHsyfSlcIn07Y2FzZVwiTU1NXCI6cmV0dXJue2dyb3VwOlwic2hvcnRNb250aFwiLHBhdHRlcm46YCgke3Quc2hvcnRNb250aHMoaSkuam9pbihcInxcIil9KWB9O2Nhc2VcIk1NTU1cIjpyZXR1cm57Z3JvdXA6XCJsb25nTW9udGhcIixwYXR0ZXJuOmAoJHt0LmxvbmdNb250aHMoaSkuam9pbihcInxcIil9KWB9O2Nhc2VcIkRcIjpyZXR1cm57Z3JvdXA6XCJkYXlcIixwYXR0ZXJuOlwiKFxcXFxkezEsMn0pXCJ9O2Nhc2VcIkREXCI6cmV0dXJue2dyb3VwOlwiZGF5XCIscGF0dGVybjpcIihcXFxcZHsyfSlcIn07Y2FzZVwiaFwiOmNhc2VcIkhcIjpyZXR1cm57Z3JvdXA6XCJob3VyXCIscGF0dGVybjpcIihcXFxcZHsxLDJ9KVwifTtjYXNlXCJoaFwiOmNhc2VcIkhIXCI6cmV0dXJue2dyb3VwOlwiaG91clwiLHBhdHRlcm46XCIoXFxcXGR7Mn0pXCJ9O2Nhc2VcIm1cIjpyZXR1cm57Z3JvdXA6XCJtaW51dGVcIixwYXR0ZXJuOlwiKFxcXFxkezEsMn0pXCJ9O2Nhc2VcIm1tXCI6cmV0dXJue2dyb3VwOlwibWludXRlXCIscGF0dGVybjpcIihcXFxcZHsyfSlcIn07Y2FzZVwic1wiOnJldHVybntncm91cDpcInNlY29uZFwiLHBhdHRlcm46XCIoXFxcXGR7MSwyfSlcIn07Y2FzZVwic3NcIjpyZXR1cm57Z3JvdXA6XCJzZWNvbmRcIixwYXR0ZXJuOlwiKFxcXFxkezJ9KVwifTtjYXNlXCJhXCI6Y2FzZVwiQVwiOnJldHVybntncm91cDpcImFtcG1cIixwYXR0ZXJuOlwiKEFNfFBNfGFtfHBtKVwifX19bGFuZztjb25zdHJ1Y3RvcihlPW51bGwsaT1cIllZWVktTU0tRERcIixuPVwiZW4tVVNcIil7c3VwZXIodC5wYXJzZURhdGVUaW1lKGUsaSxuKSksdGhpcy5sYW5nPW59Z2V0V2Vlayh0KXtjb25zdCBlPW5ldyBEYXRlKHRoaXMubWlkbmlnaHRfdHModGhpcykpLGk9KHRoaXMuZ2V0RGF5KCkrKDctdCkpJTc7ZS5zZXREYXRlKGUuZ2V0RGF0ZSgpLWkpO2NvbnN0IG49ZS5nZXRUaW1lKCk7cmV0dXJuIGUuc2V0TW9udGgoMCwxKSxlLmdldERheSgpIT09dCYmZS5zZXRNb250aCgwLDErKDQtZS5nZXREYXkoKSs3KSU3KSwxK01hdGguY2VpbCgobi1lLmdldFRpbWUoKSkvNjA0OGU1KX1jbG9uZSgpe3JldHVybiBuZXcgdCh0aGlzKX10b0pTRGF0ZSgpe3JldHVybiBuZXcgRGF0ZSh0aGlzKX1pbkFycmF5KHQsZT1cIltdXCIpe3JldHVybiB0LnNvbWUoKHQ9PnQgaW5zdGFuY2VvZiBBcnJheT90aGlzLmlzQmV0d2Vlbih0WzBdLHRbMV0sZSk6dGhpcy5pc1NhbWUodCxcImRheVwiKSkpfWlzQmV0d2Vlbih0LGUsaT1cIigpXCIpe3N3aXRjaChpKXtkZWZhdWx0OmNhc2VcIigpXCI6cmV0dXJuIHRoaXMubWlkbmlnaHRfdHModGhpcyk+dGhpcy5taWRuaWdodF90cyh0KSYmdGhpcy5taWRuaWdodF90cyh0aGlzKTx0aGlzLm1pZG5pZ2h0X3RzKGUpO2Nhc2VcIlspXCI6cmV0dXJuIHRoaXMubWlkbmlnaHRfdHModGhpcyk+PXRoaXMubWlkbmlnaHRfdHModCkmJnRoaXMubWlkbmlnaHRfdHModGhpcyk8dGhpcy5taWRuaWdodF90cyhlKTtjYXNlXCIoXVwiOnJldHVybiB0aGlzLm1pZG5pZ2h0X3RzKHRoaXMpPnRoaXMubWlkbmlnaHRfdHModCkmJnRoaXMubWlkbmlnaHRfdHModGhpcyk8PXRoaXMubWlkbmlnaHRfdHMoZSk7Y2FzZVwiW11cIjpyZXR1cm4gdGhpcy5taWRuaWdodF90cygpPj10aGlzLm1pZG5pZ2h0X3RzKHQpJiZ0aGlzLm1pZG5pZ2h0X3RzKCk8PXRoaXMubWlkbmlnaHRfdHMoZSl9fWlzQmVmb3JlKHQsZT1cImRheXNcIil7c3dpdGNoKGUpe2Nhc2VcImRheVwiOmNhc2VcImRheXNcIjpyZXR1cm4gbmV3IERhdGUodC5nZXRGdWxsWWVhcigpLHQuZ2V0TW9udGgoKSx0LmdldERhdGUoKSkuZ2V0VGltZSgpPm5ldyBEYXRlKHRoaXMuZ2V0RnVsbFllYXIoKSx0aGlzLmdldE1vbnRoKCksdGhpcy5nZXREYXRlKCkpLmdldFRpbWUoKTtjYXNlXCJtb250aFwiOmNhc2VcIm1vbnRoc1wiOnJldHVybiBuZXcgRGF0ZSh0LmdldEZ1bGxZZWFyKCksdC5nZXRNb250aCgpLDEpLmdldFRpbWUoKT5uZXcgRGF0ZSh0aGlzLmdldEZ1bGxZZWFyKCksdGhpcy5nZXRNb250aCgpLDEpLmdldFRpbWUoKTtjYXNlXCJ5ZWFyXCI6Y2FzZVwieWVhcnNcIjpyZXR1cm4gdC5nZXRGdWxsWWVhcigpPnRoaXMuZ2V0RnVsbFllYXIoKX10aHJvdyBuZXcgRXJyb3IoXCJpc0JlZm9yZTogSW52YWxpZCB1bml0IVwiKX1pc1NhbWVPckJlZm9yZSh0LGU9XCJkYXlzXCIpe3N3aXRjaChlKXtjYXNlXCJkYXlcIjpjYXNlXCJkYXlzXCI6cmV0dXJuIG5ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKSx0LmdldE1vbnRoKCksdC5nZXREYXRlKCkpLmdldFRpbWUoKT49bmV3IERhdGUodGhpcy5nZXRGdWxsWWVhcigpLHRoaXMuZ2V0TW9udGgoKSx0aGlzLmdldERhdGUoKSkuZ2V0VGltZSgpO2Nhc2VcIm1vbnRoXCI6Y2FzZVwibW9udGhzXCI6cmV0dXJuIG5ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKSx0LmdldE1vbnRoKCksMSkuZ2V0VGltZSgpPj1uZXcgRGF0ZSh0aGlzLmdldEZ1bGxZZWFyKCksdGhpcy5nZXRNb250aCgpLDEpLmdldFRpbWUoKX10aHJvdyBuZXcgRXJyb3IoXCJpc1NhbWVPckJlZm9yZTogSW52YWxpZCB1bml0IVwiKX1pc0FmdGVyKHQsZT1cImRheXNcIil7c3dpdGNoKGUpe2Nhc2VcImRheVwiOmNhc2VcImRheXNcIjpyZXR1cm4gbmV3IERhdGUodGhpcy5nZXRGdWxsWWVhcigpLHRoaXMuZ2V0TW9udGgoKSx0aGlzLmdldERhdGUoKSkuZ2V0VGltZSgpPm5ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKSx0LmdldE1vbnRoKCksdC5nZXREYXRlKCkpLmdldFRpbWUoKTtjYXNlXCJtb250aFwiOmNhc2VcIm1vbnRoc1wiOnJldHVybiBuZXcgRGF0ZSh0aGlzLmdldEZ1bGxZZWFyKCksdGhpcy5nZXRNb250aCgpLDEpLmdldFRpbWUoKT5uZXcgRGF0ZSh0LmdldEZ1bGxZZWFyKCksdC5nZXRNb250aCgpLDEpLmdldFRpbWUoKTtjYXNlXCJ5ZWFyXCI6Y2FzZVwieWVhcnNcIjpyZXR1cm4gdGhpcy5nZXRGdWxsWWVhcigpPnQuZ2V0RnVsbFllYXIoKX10aHJvdyBuZXcgRXJyb3IoXCJpc0FmdGVyOiBJbnZhbGlkIHVuaXQhXCIpfWlzU2FtZU9yQWZ0ZXIodCxlPVwiZGF5c1wiKXtzd2l0Y2goZSl7Y2FzZVwiZGF5XCI6Y2FzZVwiZGF5c1wiOnJldHVybiBuZXcgRGF0ZSh0aGlzLmdldEZ1bGxZZWFyKCksdGhpcy5nZXRNb250aCgpLHRoaXMuZ2V0RGF0ZSgpKS5nZXRUaW1lKCk+PW5ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKSx0LmdldE1vbnRoKCksdC5nZXREYXRlKCkpLmdldFRpbWUoKTtjYXNlXCJtb250aFwiOmNhc2VcIm1vbnRoc1wiOnJldHVybiBuZXcgRGF0ZSh0aGlzLmdldEZ1bGxZZWFyKCksdGhpcy5nZXRNb250aCgpLDEpLmdldFRpbWUoKT49bmV3IERhdGUodC5nZXRGdWxsWWVhcigpLHQuZ2V0TW9udGgoKSwxKS5nZXRUaW1lKCl9dGhyb3cgbmV3IEVycm9yKFwiaXNTYW1lT3JBZnRlcjogSW52YWxpZCB1bml0IVwiKX1pc1NhbWUodCxlPVwiZGF5c1wiKXtzd2l0Y2goZSl7Y2FzZVwiZGF5XCI6Y2FzZVwiZGF5c1wiOnJldHVybiBuZXcgRGF0ZSh0aGlzLmdldEZ1bGxZZWFyKCksdGhpcy5nZXRNb250aCgpLHRoaXMuZ2V0RGF0ZSgpKS5nZXRUaW1lKCk9PT1uZXcgRGF0ZSh0LmdldEZ1bGxZZWFyKCksdC5nZXRNb250aCgpLHQuZ2V0RGF0ZSgpKS5nZXRUaW1lKCk7Y2FzZVwibW9udGhcIjpjYXNlXCJtb250aHNcIjpyZXR1cm4gbmV3IERhdGUodGhpcy5nZXRGdWxsWWVhcigpLHRoaXMuZ2V0TW9udGgoKSwxKS5nZXRUaW1lKCk9PT1uZXcgRGF0ZSh0LmdldEZ1bGxZZWFyKCksdC5nZXRNb250aCgpLDEpLmdldFRpbWUoKX10aHJvdyBuZXcgRXJyb3IoXCJpc1NhbWU6IEludmFsaWQgdW5pdCFcIil9YWRkKHQsZT1cImRheXNcIil7c3dpdGNoKGUpe2Nhc2VcImRheVwiOmNhc2VcImRheXNcIjp0aGlzLnNldERhdGUodGhpcy5nZXREYXRlKCkrdCk7YnJlYWs7Y2FzZVwibW9udGhcIjpjYXNlXCJtb250aHNcIjp0aGlzLnNldE1vbnRoKHRoaXMuZ2V0TW9udGgoKSt0KX1yZXR1cm4gdGhpc31zdWJ0cmFjdCh0LGU9XCJkYXlzXCIpe3N3aXRjaChlKXtjYXNlXCJkYXlcIjpjYXNlXCJkYXlzXCI6dGhpcy5zZXREYXRlKHRoaXMuZ2V0RGF0ZSgpLXQpO2JyZWFrO2Nhc2VcIm1vbnRoXCI6Y2FzZVwibW9udGhzXCI6dGhpcy5zZXRNb250aCh0aGlzLmdldE1vbnRoKCktdCl9cmV0dXJuIHRoaXN9ZGlmZih0LGU9XCJkYXlzXCIpe3N3aXRjaChlKXtkZWZhdWx0OmNhc2VcImRheVwiOmNhc2VcImRheXNcIjpyZXR1cm4gTWF0aC5yb3VuZCgodGhpcy5taWRuaWdodF90cygpLXRoaXMubWlkbmlnaHRfdHModCkpLzg2NGU1KTtjYXNlXCJtb250aFwiOmNhc2VcIm1vbnRoc1wiOmxldCBlPTEyKih0LmdldEZ1bGxZZWFyKCktdGhpcy5nZXRGdWxsWWVhcigpKTtyZXR1cm4gZS09dC5nZXRNb250aCgpLGUrPXRoaXMuZ2V0TW9udGgoKSxlfX1mb3JtYXQoZSxpPVwiZW4tVVNcIil7bGV0IG49XCJcIjtjb25zdCBzPVtdO2xldCBvPW51bGw7Zm9yKDtudWxsIT0obz10LnJlZ2V4LmV4ZWMoZSkpOylcIlxcXFxcIiE9PW9bMV0mJnMucHVzaChvKTtpZihzLmxlbmd0aCl7c1swXS5pbmRleD4wJiYobis9ZS5zdWJzdHJpbmcoMCxzWzBdLmluZGV4KSk7Zm9yKGNvbnN0W3Qsb11vZiBPYmplY3QuZW50cmllcyhzKSl7Y29uc3QgYT1OdW1iZXIodCk7bis9dGhpcy5mb3JtYXRUb2tlbnMob1swXSxpKSxzW2ErMV0mJihuKz1lLnN1YnN0cmluZyhvLmluZGV4K29bMF0ubGVuZ3RoLHNbYSsxXS5pbmRleCkpLGE9PT1zLmxlbmd0aC0xJiYobis9ZS5zdWJzdHJpbmcoby5pbmRleCtvWzBdLmxlbmd0aCkpfX1yZXR1cm4gbi5yZXBsYWNlKC9cXFxcL2csXCJcIil9bWlkbmlnaHRfdHModCl7cmV0dXJuIHQ/bmV3IERhdGUodC5nZXRGdWxsWWVhcigpLHQuZ2V0TW9udGgoKSx0LmdldERhdGUoKSwwLDAsMCwwKS5nZXRUaW1lKCk6bmV3IERhdGUodGhpcy5nZXRGdWxsWWVhcigpLHRoaXMuZ2V0TW9udGgoKSx0aGlzLmdldERhdGUoKSwwLDAsMCwwKS5nZXRUaW1lKCl9Zm9ybWF0VG9rZW5zKGUsaSl7c3dpdGNoKGUpe2Nhc2VcIllZXCI6cmV0dXJuIFN0cmluZyh0aGlzLmdldEZ1bGxZZWFyKCkpLnNsaWNlKC0yKTtjYXNlXCJZWVlZXCI6cmV0dXJuIFN0cmluZyh0aGlzLmdldEZ1bGxZZWFyKCkpO2Nhc2VcIk1cIjpyZXR1cm4gU3RyaW5nKHRoaXMuZ2V0TW9udGgoKSsxKTtjYXNlXCJNTVwiOnJldHVybmAwJHt0aGlzLmdldE1vbnRoKCkrMX1gLnNsaWNlKC0yKTtjYXNlXCJNTU1cIjpyZXR1cm4gdC5zaG9ydE1vbnRocyhpKVt0aGlzLmdldE1vbnRoKCldO2Nhc2VcIk1NTU1cIjpyZXR1cm4gdC5sb25nTW9udGhzKGkpW3RoaXMuZ2V0TW9udGgoKV07Y2FzZVwiRFwiOnJldHVybiBTdHJpbmcodGhpcy5nZXREYXRlKCkpO2Nhc2VcIkREXCI6cmV0dXJuYDAke3RoaXMuZ2V0RGF0ZSgpfWAuc2xpY2UoLTIpO2Nhc2VcIkhcIjpyZXR1cm4gU3RyaW5nKHRoaXMuZ2V0SG91cnMoKSk7Y2FzZVwiSEhcIjpyZXR1cm5gMCR7dGhpcy5nZXRIb3VycygpfWAuc2xpY2UoLTIpO2Nhc2VcImhcIjpyZXR1cm4gU3RyaW5nKHRoaXMuZ2V0SG91cnMoKSUxMnx8MTIpO2Nhc2VcImhoXCI6cmV0dXJuYDAke3RoaXMuZ2V0SG91cnMoKSUxMnx8MTJ9YC5zbGljZSgtMik7Y2FzZVwibVwiOnJldHVybiBTdHJpbmcodGhpcy5nZXRNaW51dGVzKCkpO2Nhc2VcIm1tXCI6cmV0dXJuYDAke3RoaXMuZ2V0TWludXRlcygpfWAuc2xpY2UoLTIpO2Nhc2VcInNcIjpyZXR1cm4gU3RyaW5nKHRoaXMuZ2V0U2Vjb25kcygpKTtjYXNlXCJzc1wiOnJldHVybmAwJHt0aGlzLmdldFNlY29uZHMoKX1gLnNsaWNlKC0yKTtjYXNlXCJhXCI6cmV0dXJuIHRoaXMuZ2V0SG91cnMoKTwxMnx8MjQ9PT10aGlzLmdldEhvdXJzKCk/XCJhbVwiOlwicG1cIjtjYXNlXCJBXCI6cmV0dXJuIHRoaXMuZ2V0SG91cnMoKTwxMnx8MjQ9PT10aGlzLmdldEhvdXJzKCk/XCJBTVwiOlwiUE1cIjtkZWZhdWx0OnJldHVyblwiXCJ9fX1jbGFzcyBle3BpY2tlcjtjb25zdHJ1Y3Rvcih0KXt0aGlzLnBpY2tlcj10fXJlbmRlcihlLGkpe2V8fChlPW5ldyB0KSxlLnNldERhdGUoMSksZS5zZXRIb3VycygwLDAsMCwwKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiB0aGlzW2BnZXQke2l9Vmlld2BdJiZ0aGlzW2BnZXQke2l9Vmlld2BdKGUpfWdldENvbnRhaW5lclZpZXcodCl7dGhpcy5waWNrZXIudWkuY29udGFpbmVyLmlubmVySFRNTD1cIlwiLHRoaXMucGlja2VyLm9wdGlvbnMuaGVhZGVyJiZ0aGlzLnBpY2tlci50cmlnZ2VyKFwicmVuZGVyXCIse2RhdGU6dC5jbG9uZSgpLHZpZXc6XCJIZWFkZXJcIn0pLHRoaXMucGlja2VyLnRyaWdnZXIoXCJyZW5kZXJcIix7ZGF0ZTp0LmNsb25lKCksdmlldzpcIk1haW5cIn0pLHRoaXMucGlja2VyLm9wdGlvbnMuYXV0b0FwcGx5fHx0aGlzLnBpY2tlci50cmlnZ2VyKFwicmVuZGVyXCIse2RhdGU6dC5jbG9uZSgpLHZpZXc6XCJGb290ZXJcIn0pfWdldEhlYWRlclZpZXcodCl7Y29uc3QgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO3RoaXMucGlja2VyLm9wdGlvbnMuaGVhZGVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQmJmUuYXBwZW5kQ2hpbGQodGhpcy5waWNrZXIub3B0aW9ucy5oZWFkZXIpLFwic3RyaW5nXCI9PXR5cGVvZiB0aGlzLnBpY2tlci5vcHRpb25zLmhlYWRlciYmKGUuaW5uZXJIVE1MPXRoaXMucGlja2VyLm9wdGlvbnMuaGVhZGVyKSx0aGlzLnBpY2tlci51aS5jb250YWluZXIuYXBwZW5kQ2hpbGQoZSksdGhpcy5waWNrZXIudHJpZ2dlcihcInZpZXdcIix7dGFyZ2V0OmUsZGF0ZTp0LmNsb25lKCksdmlldzpcIkhlYWRlclwifSl9Z2V0TWFpblZpZXcodCl7Y29uc3QgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibWFpblwiKTt0aGlzLnBpY2tlci51aS5jb250YWluZXIuYXBwZW5kQ2hpbGQoZSk7Y29uc3QgaT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2kuY2xhc3NOYW1lPWBjYWxlbmRhcnMgZ3JpZC0ke3RoaXMucGlja2VyLm9wdGlvbnMuZ3JpZH1gO2ZvcihsZXQgZT0wO2U8dGhpcy5waWNrZXIub3B0aW9ucy5jYWxlbmRhcnM7ZSsrKXtjb25zdCBuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7bi5jbGFzc05hbWU9XCJjYWxlbmRhclwiLGkuYXBwZW5kQ2hpbGQobik7Y29uc3Qgcz10aGlzLmdldENhbGVuZGFySGVhZGVyVmlldyh0LmNsb25lKCkpO24uYXBwZW5kQ2hpbGQocyksdGhpcy5waWNrZXIudHJpZ2dlcihcInZpZXdcIix7ZGF0ZTp0LmNsb25lKCksdmlldzpcIkNhbGVuZGFySGVhZGVyXCIsaW5kZXg6ZSx0YXJnZXQ6c30pO2NvbnN0IG89dGhpcy5nZXRDYWxlbmRhckRheU5hbWVzVmlldygpO24uYXBwZW5kQ2hpbGQobyksdGhpcy5waWNrZXIudHJpZ2dlcihcInZpZXdcIix7ZGF0ZTp0LmNsb25lKCksdmlldzpcIkNhbGVuZGFyRGF5TmFtZXNcIixpbmRleDplLHRhcmdldDpvfSk7Y29uc3QgYT10aGlzLmdldENhbGVuZGFyRGF5c1ZpZXcodC5jbG9uZSgpKTtuLmFwcGVuZENoaWxkKGEpLHRoaXMucGlja2VyLnRyaWdnZXIoXCJ2aWV3XCIse2RhdGU6dC5jbG9uZSgpLHZpZXc6XCJDYWxlbmRhckRheXNcIixpbmRleDplLHRhcmdldDphfSk7Y29uc3Qgcj10aGlzLmdldENhbGVuZGFyRm9vdGVyVmlldyh0aGlzLnBpY2tlci5vcHRpb25zLmxhbmcsdC5jbG9uZSgpKTtuLmFwcGVuZENoaWxkKHIpLHRoaXMucGlja2VyLnRyaWdnZXIoXCJ2aWV3XCIse2RhdGU6dC5jbG9uZSgpLHZpZXc6XCJDYWxlbmRhckZvb3RlclwiLGluZGV4OmUsdGFyZ2V0OnJ9KSx0aGlzLnBpY2tlci50cmlnZ2VyKFwidmlld1wiLHtkYXRlOnQuY2xvbmUoKSx2aWV3OlwiQ2FsZW5kYXJJdGVtXCIsaW5kZXg6ZSx0YXJnZXQ6bn0pLHQuYWRkKDEsXCJtb250aFwiKX1lLmFwcGVuZENoaWxkKGkpLHRoaXMucGlja2VyLnRyaWdnZXIoXCJ2aWV3XCIse2RhdGU6dC5jbG9uZSgpLHZpZXc6XCJDYWxlbmRhcnNcIix0YXJnZXQ6aX0pLHRoaXMucGlja2VyLnRyaWdnZXIoXCJ2aWV3XCIse2RhdGU6dC5jbG9uZSgpLHZpZXc6XCJNYWluXCIsdGFyZ2V0OmV9KX1nZXRGb290ZXJWaWV3KHQpe2NvbnN0IGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvb3RlclwiKSxpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7aS5jbGFzc05hbWU9XCJmb290ZXItYnV0dG9uc1wiO2NvbnN0IG49ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtuLmNsYXNzTmFtZT1cImNhbmNlbC1idXR0b24gdW5pdFwiLG4uaW5uZXJIVE1MPXRoaXMucGlja2VyLm9wdGlvbnMubG9jYWxlLmNhbmNlbCxpLmFwcGVuZENoaWxkKG4pO2NvbnN0IHM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtzLmNsYXNzTmFtZT1cImFwcGx5LWJ1dHRvbiB1bml0XCIscy5pbm5lckhUTUw9dGhpcy5waWNrZXIub3B0aW9ucy5sb2NhbGUuYXBwbHkscy5kaXNhYmxlZD0hMCxpLmFwcGVuZENoaWxkKHMpLGUuYXBwZW5kQ2hpbGQoaSksdGhpcy5waWNrZXIudWkuY29udGFpbmVyLmFwcGVuZENoaWxkKGUpLHRoaXMucGlja2VyLnRyaWdnZXIoXCJ2aWV3XCIse2RhdGU6dCx0YXJnZXQ6ZSx2aWV3OlwiRm9vdGVyXCJ9KX1nZXRDYWxlbmRhckhlYWRlclZpZXcodCl7Y29uc3QgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2UuY2xhc3NOYW1lPVwiaGVhZGVyXCI7Y29uc3QgaT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2kuY2xhc3NOYW1lPVwibW9udGgtbmFtZVwiLGkuaW5uZXJIVE1MPWA8c3Bhbj4ke3QudG9Mb2NhbGVTdHJpbmcodGhpcy5waWNrZXIub3B0aW9ucy5sYW5nLHttb250aDpcImxvbmdcIn0pfTwvc3Bhbj4gJHt0LmZvcm1hdChcIllZWVlcIil9YCxlLmFwcGVuZENoaWxkKGkpO2NvbnN0IG49ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtuLmNsYXNzTmFtZT1cInByZXZpb3VzLWJ1dHRvbiB1bml0XCIsbi5pbm5lckhUTUw9dGhpcy5waWNrZXIub3B0aW9ucy5sb2NhbGUucHJldmlvdXNNb250aCxlLmFwcGVuZENoaWxkKG4pO2NvbnN0IHM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtyZXR1cm4gcy5jbGFzc05hbWU9XCJuZXh0LWJ1dHRvbiB1bml0XCIscy5pbm5lckhUTUw9dGhpcy5waWNrZXIub3B0aW9ucy5sb2NhbGUubmV4dE1vbnRoLGUuYXBwZW5kQ2hpbGQocyksZX1nZXRDYWxlbmRhckRheU5hbWVzVmlldygpe2NvbnN0IHQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTt0LmNsYXNzTmFtZT1cImRheW5hbWVzLXJvd1wiO2ZvcihsZXQgZT0xO2U8PTc7ZSsrKXtjb25zdCBpPTMrdGhpcy5waWNrZXIub3B0aW9ucy5maXJzdERheStlLG49ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtuLmNsYXNzTmFtZT1cImRheW5hbWVcIixuLmlubmVySFRNTD1uZXcgRGF0ZSgxOTcwLDAsaSwxMiwwLDAsMCkudG9Mb2NhbGVTdHJpbmcodGhpcy5waWNrZXIub3B0aW9ucy5sYW5nLHt3ZWVrZGF5Olwic2hvcnRcIn0pLG4udGl0bGU9bmV3IERhdGUoMTk3MCwwLGksMTIsMCwwLDApLnRvTG9jYWxlU3RyaW5nKHRoaXMucGlja2VyLm9wdGlvbnMubGFuZyx7d2Vla2RheTpcImxvbmdcIn0pLHQuYXBwZW5kQ2hpbGQobiksdGhpcy5waWNrZXIudHJpZ2dlcihcInZpZXdcIix7ZGF5SWR4OmksdmlldzpcIkNhbGVuZGFyRGF5TmFtZVwiLHRhcmdldDpufSl9cmV0dXJuIHR9Z2V0Q2FsZW5kYXJEYXlzVmlldyh0KXtjb25zdCBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7ZS5jbGFzc05hbWU9XCJkYXlzLWdyaWRcIjtjb25zdCBpPXRoaXMuY2FsY09mZnNldERheXModCx0aGlzLnBpY2tlci5vcHRpb25zLmZpcnN0RGF5KSxuPTMyLW5ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKSx0LmdldE1vbnRoKCksMzIpLmdldERhdGUoKTtmb3IobGV0IHQ9MDt0PGk7dCsrKXtjb25zdCB0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7dC5jbGFzc05hbWU9XCJvZmZzZXRcIixlLmFwcGVuZENoaWxkKHQpfWZvcihsZXQgaT0xO2k8PW47aSsrKXt0LnNldERhdGUoaSk7Y29uc3Qgbj10aGlzLmdldENhbGVuZGFyRGF5Vmlldyh0KTtlLmFwcGVuZENoaWxkKG4pLHRoaXMucGlja2VyLnRyaWdnZXIoXCJ2aWV3XCIse2RhdGU6dCx2aWV3OlwiQ2FsZW5kYXJEYXlcIix0YXJnZXQ6bn0pfXJldHVybiBlfWdldENhbGVuZGFyRGF5VmlldyhlKXtjb25zdCBpPXRoaXMucGlja2VyLm9wdGlvbnMuZGF0ZT9uZXcgdCh0aGlzLnBpY2tlci5vcHRpb25zLmRhdGUpOm51bGwsbj1uZXcgdCxzPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7cmV0dXJuIHMuY2xhc3NOYW1lPVwiZGF5IHVuaXRcIixzLmlubmVySFRNTD1lLmZvcm1hdChcIkRcIikscy5kYXRhc2V0LnRpbWU9U3RyaW5nKGUuZ2V0VGltZSgpKSxlLmlzU2FtZShuLFwiZGF5XCIpJiZzLmNsYXNzTGlzdC5hZGQoXCJ0b2RheVwiKSxbMCw2XS5pbmNsdWRlcyhlLmdldERheSgpKSYmcy5jbGFzc0xpc3QuYWRkKFwid2Vla2VuZFwiKSx0aGlzLnBpY2tlci5kYXRlUGlja2VkLmxlbmd0aD90aGlzLnBpY2tlci5kYXRlUGlja2VkWzBdLmlzU2FtZShlLFwiZGF5XCIpJiZzLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTppJiZlLmlzU2FtZShpLFwiZGF5XCIpJiZzLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKSx0aGlzLnBpY2tlci50cmlnZ2VyKFwidmlld1wiLHtkYXRlOmUsdmlldzpcIkNhbGVuZGFyRGF5XCIsdGFyZ2V0OnN9KSxzfWdldENhbGVuZGFyRm9vdGVyVmlldyh0LGUpe2NvbnN0IGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtyZXR1cm4gaS5jbGFzc05hbWU9XCJmb290ZXJcIixpfWNhbGNPZmZzZXREYXlzKHQsZSl7bGV0IGk9dC5nZXREYXkoKS1lO3JldHVybiBpPDAmJihpKz03KSxpfX1jbGFzcyBpe3BpY2tlcjtpbnN0YW5jZXM9e307Y29uc3RydWN0b3IodCl7dGhpcy5waWNrZXI9dH1pbml0aWFsaXplKCl7Y29uc3QgdD1bXTt0aGlzLnBpY2tlci5vcHRpb25zLnBsdWdpbnMuZm9yRWFjaCgoZT0+e1wiZnVuY3Rpb25cIj09dHlwZW9mIGU/dC5wdXNoKG5ldyBlKTpcInN0cmluZ1wiPT10eXBlb2YgZSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGVhc2VwaWNrJiZPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZWFzZXBpY2ssZSk/dC5wdXNoKG5ldyBlYXNlcGlja1tlXSk6Y29uc29sZS53YXJuKGBlYXNlcGljazogJHtlfSBub3QgZm91bmQuYCl9KSksdC5zb3J0KCgodCxlKT0+dC5wcmlvcml0eT5lLnByaW9yaXR5Py0xOnQucHJpb3JpdHk8ZS5wcmlvcml0eXx8dC5kZXBlbmRlbmNpZXMubGVuZ3RoPmUuZGVwZW5kZW5jaWVzLmxlbmd0aD8xOnQuZGVwZW5kZW5jaWVzLmxlbmd0aDxlLmRlcGVuZGVuY2llcy5sZW5ndGg/LTE6MCkpLHQuZm9yRWFjaCgodD0+e3QuYXR0YWNoKHRoaXMucGlja2VyKSx0aGlzLmluc3RhbmNlc1t0LmdldE5hbWUoKV09dH0pKX1nZXRJbnN0YW5jZSh0KXtyZXR1cm4gdGhpcy5pbnN0YW5jZXNbdF19YWRkSW5zdGFuY2UodCl7aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuaW5zdGFuY2VzLHQpKWNvbnNvbGUud2FybihgZWFzZXBpY2s6ICR7dH0gYWxyZWFkeSBhZGRlZC5gKTtlbHNle2lmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBlYXNlcGljayYmT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGVhc2VwaWNrLHQpKXtjb25zdCBlPW5ldyBlYXNlcGlja1t0XTtyZXR1cm4gZS5hdHRhY2godGhpcy5waWNrZXIpLHRoaXMuaW5zdGFuY2VzW2UuZ2V0TmFtZSgpXT1lLGV9aWYoXCJ1bmRlZmluZWRcIiE9PXRoaXMuZ2V0UGx1Z2luRm4odCkpe2NvbnN0IGU9bmV3KHRoaXMuZ2V0UGx1Z2luRm4odCkpO3JldHVybiBlLmF0dGFjaCh0aGlzLnBpY2tlciksdGhpcy5pbnN0YW5jZXNbZS5nZXROYW1lKCldPWUsZX1jb25zb2xlLndhcm4oYGVhc2VwaWNrOiAke3R9IG5vdCBmb3VuZC5gKX1yZXR1cm4gbnVsbH1yZW1vdmVJbnN0YW5jZSh0KXtyZXR1cm4gdCBpbiB0aGlzLmluc3RhbmNlcyYmdGhpcy5pbnN0YW5jZXNbdF0uZGV0YWNoKCksZGVsZXRlIHRoaXMuaW5zdGFuY2VzW3RdfXJlbG9hZEluc3RhbmNlKHQpe3JldHVybiB0aGlzLnJlbW92ZUluc3RhbmNlKHQpLHRoaXMuYWRkSW5zdGFuY2UodCl9Z2V0UGx1Z2luRm4odCl7cmV0dXJuWy4uLnRoaXMucGlja2VyLm9wdGlvbnMucGx1Z2luc10uZmlsdGVyKChlPT5cImZ1bmN0aW9uXCI9PXR5cGVvZiBlJiYobmV3IGUpLmdldE5hbWUoKT09PXQpKS5zaGlmdCgpfX1jbGFzcyBue0NhbGVuZGFyPW5ldyBlKHRoaXMpO1BsdWdpbk1hbmFnZXI9bmV3IGkodGhpcyk7Y2FsZW5kYXJzPVtdO2RhdGVQaWNrZWQ9W107Y3NzTG9hZGVkPTA7YmluZHM9e2hpZGVQaWNrZXI6dGhpcy5oaWRlUGlja2VyLmJpbmQodGhpcyksc2hvdzp0aGlzLnNob3cuYmluZCh0aGlzKX07b3B0aW9ucz17ZG9jOmRvY3VtZW50LGNzczpbXSxlbGVtZW50Om51bGwsZmlyc3REYXk6MSxncmlkOjEsY2FsZW5kYXJzOjEsbGFuZzpcImVuLVVTXCIsZGF0ZTpudWxsLGZvcm1hdDpcIllZWVktTU0tRERcIixyZWFkb25seTohMCxhdXRvQXBwbHk6ITAsaGVhZGVyOiExLGlubGluZTohMSxzY3JvbGxUb0RhdGU6ITAsbG9jYWxlOntuZXh0TW9udGg6Jzxzdmcgd2lkdGg9XCIxMVwiIGhlaWdodD1cIjE2XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJNMi43NDggMTZMMCAxMy4zMzMgNS4zMzMgOCAwIDIuNjY3IDIuNzQ4IDBsNy45MTkgOHpcIiBmaWxsLXJ1bGU9XCJub256ZXJvXCIvPjwvc3ZnPicscHJldmlvdXNNb250aDonPHN2ZyB3aWR0aD1cIjExXCIgaGVpZ2h0PVwiMTZcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZD1cIk03LjkxOSAwbDIuNzQ4IDIuNjY3TDUuMzMzIDhsNS4zMzQgNS4zMzNMNy45MTkgMTYgMCA4elwiIGZpbGwtcnVsZT1cIm5vbnplcm9cIi8+PC9zdmc+JyxjYW5jZWw6XCJDYW5jZWxcIixhcHBseTpcIkFwcGx5XCJ9LGRvY3VtZW50Q2xpY2s6dGhpcy5iaW5kcy5oaWRlUGlja2VyLHBsdWdpbnM6W119O3VpPXtjb250YWluZXI6bnVsbCxzaGFkb3dSb290Om51bGwsd3JhcHBlcjpudWxsfTt2ZXJzaW9uPVwiMS4yLjFcIjtjb25zdHJ1Y3Rvcih0KXtjb25zdCBlPXsuLi50aGlzLm9wdGlvbnMubG9jYWxlLC4uLnQubG9jYWxlfTt0aGlzLm9wdGlvbnM9ey4uLnRoaXMub3B0aW9ucywuLi50fSx0aGlzLm9wdGlvbnMubG9jYWxlPWUsdGhpcy5oYW5kbGVPcHRpb25zKCksdGhpcy51aS53cmFwcGVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpLHRoaXMudWkud3JhcHBlci5zdHlsZS5kaXNwbGF5PVwibm9uZVwiLHRoaXMudWkud3JhcHBlci5zdHlsZS5wb3NpdGlvbj1cImFic29sdXRlXCIsdGhpcy51aS53cmFwcGVyLnN0eWxlLnBvaW50ZXJFdmVudHM9XCJub25lXCIsdGhpcy51aS53cmFwcGVyLmNsYXNzTmFtZT1cImVhc2VwaWNrLXdyYXBwZXJcIix0aGlzLnVpLndyYXBwZXIuYXR0YWNoU2hhZG93KHttb2RlOlwib3BlblwifSksdGhpcy51aS5zaGFkb3dSb290PXRoaXMudWkud3JhcHBlci5zaGFkb3dSb290LHRoaXMudWkuY29udGFpbmVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksdGhpcy51aS5jb250YWluZXIuY2xhc3NOYW1lPVwiY29udGFpbmVyXCIsdGhpcy5vcHRpb25zLnpJbmRleCYmKHRoaXMudWkuY29udGFpbmVyLnN0eWxlLnpJbmRleD1TdHJpbmcodGhpcy5vcHRpb25zLnpJbmRleCkpLHRoaXMub3B0aW9ucy5pbmxpbmUmJih0aGlzLnVpLndyYXBwZXIuc3R5bGUucG9zaXRpb249XCJyZWxhdGl2ZVwiLHRoaXMudWkuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJpbmxpbmVcIikpLHRoaXMudWkuc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0aGlzLnVpLmNvbnRhaW5lciksdGhpcy5vcHRpb25zLmVsZW1lbnQuYWZ0ZXIodGhpcy51aS53cmFwcGVyKSx0aGlzLmhhbmRsZUNTUygpLHRoaXMub3B0aW9ucy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHRoaXMuYmluZHMuc2hvdyksdGhpcy5vbihcInZpZXdcIix0aGlzLm9uVmlldy5iaW5kKHRoaXMpKSx0aGlzLm9uKFwicmVuZGVyXCIsdGhpcy5vblJlbmRlci5iaW5kKHRoaXMpKSx0aGlzLlBsdWdpbk1hbmFnZXIuaW5pdGlhbGl6ZSgpLHRoaXMucGFyc2VWYWx1ZXMoKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiB0aGlzLm9wdGlvbnMuc2V0dXAmJnRoaXMub3B0aW9ucy5zZXR1cCh0aGlzKSx0aGlzLm9uKFwiY2xpY2tcIix0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSk7Y29uc3QgaT10aGlzLm9wdGlvbnMuc2Nyb2xsVG9EYXRlP3RoaXMuZ2V0RGF0ZSgpOm51bGw7dGhpcy5yZW5kZXJBbGwoaSl9b24odCxlLGk9e30pe3RoaXMudWkuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIodCxlLGkpfW9mZih0LGUsaT17fSl7dGhpcy51aS5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcih0LGUsaSl9dHJpZ2dlcih0LGU9e30pe3JldHVybiB0aGlzLnVpLmNvbnRhaW5lci5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCh0LHtkZXRhaWw6ZX0pKX1kZXN0cm95KCl7dGhpcy5vcHRpb25zLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsdGhpcy5iaW5kcy5zaG93KSxcImZ1bmN0aW9uXCI9PXR5cGVvZiB0aGlzLm9wdGlvbnMuZG9jdW1lbnRDbGljayYmZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsdGhpcy5vcHRpb25zLmRvY3VtZW50Q2xpY2ssITApLE9iamVjdC5rZXlzKHRoaXMuUGx1Z2luTWFuYWdlci5pbnN0YW5jZXMpLmZvckVhY2goKHQ9Pnt0aGlzLlBsdWdpbk1hbmFnZXIucmVtb3ZlSW5zdGFuY2UodCl9KSksdGhpcy51aS53cmFwcGVyLnJlbW92ZSgpfW9uUmVuZGVyKHQpe2NvbnN0e3ZpZXc6ZSxkYXRlOml9PXQuZGV0YWlsO3RoaXMuQ2FsZW5kYXIucmVuZGVyKGksZSl9b25WaWV3KHQpe2NvbnN0e3ZpZXc6ZSx0YXJnZXQ6aX09dC5kZXRhaWw7XCJGb290ZXJcIj09PWUmJnRoaXMuZGF0ZVBpY2tlZC5sZW5ndGgmJihpLnF1ZXJ5U2VsZWN0b3IoXCIuYXBwbHktYnV0dG9uXCIpLmRpc2FibGVkPSExKX1vbkNsaWNrSGVhZGVyQnV0dG9uKHQpe3RoaXMuaXNDYWxlbmRhckhlYWRlckJ1dHRvbih0KSYmKHQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibmV4dC1idXR0b25cIik/dGhpcy5jYWxlbmRhcnNbMF0uYWRkKDEsXCJtb250aFwiKTp0aGlzLmNhbGVuZGFyc1swXS5zdWJ0cmFjdCgxLFwibW9udGhcIiksdGhpcy5yZW5kZXJBbGwodGhpcy5jYWxlbmRhcnNbMF0pKX1vbkNsaWNrQ2FsZW5kYXJEYXkoZSl7aWYodGhpcy5pc0NhbGVuZGFyRGF5KGUpKXtjb25zdCBpPW5ldyB0KGUuZGF0YXNldC50aW1lKTt0aGlzLm9wdGlvbnMuYXV0b0FwcGx5Pyh0aGlzLnNldERhdGUoaSksdGhpcy50cmlnZ2VyKFwic2VsZWN0XCIse2RhdGU6dGhpcy5nZXREYXRlKCl9KSx0aGlzLmhpZGUoKSk6KHRoaXMuZGF0ZVBpY2tlZFswXT1pLHRoaXMudHJpZ2dlcihcInByZXNlbGVjdFwiLHtkYXRlOnRoaXMuZ2V0RGF0ZSgpfSksdGhpcy5yZW5kZXJBbGwoKSl9fW9uQ2xpY2tBcHBseUJ1dHRvbih0KXtpZih0aGlzLmlzQXBwbHlCdXR0b24odCkpe2lmKHRoaXMuZGF0ZVBpY2tlZFswXWluc3RhbmNlb2YgRGF0ZSl7Y29uc3QgdD10aGlzLmRhdGVQaWNrZWRbMF0uY2xvbmUoKTt0aGlzLnNldERhdGUodCl9dGhpcy5oaWRlKCksdGhpcy50cmlnZ2VyKFwic2VsZWN0XCIse2RhdGU6dGhpcy5nZXREYXRlKCl9KX19b25DbGlja0NhbmNlbEJ1dHRvbih0KXt0aGlzLmlzQ2FuY2VsQnV0dG9uKHQpJiZ0aGlzLmhpZGUoKX1vbkNsaWNrKHQpe2NvbnN0IGU9dC50YXJnZXQ7aWYoZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KXtjb25zdCB0PWUuY2xvc2VzdChcIi51bml0XCIpO2lmKCEodCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSlyZXR1cm47dGhpcy5vbkNsaWNrSGVhZGVyQnV0dG9uKHQpLHRoaXMub25DbGlja0NhbGVuZGFyRGF5KHQpLHRoaXMub25DbGlja0FwcGx5QnV0dG9uKHQpLHRoaXMub25DbGlja0NhbmNlbEJ1dHRvbih0KX19aXNTaG93bigpe3JldHVybiB0aGlzLnVpLmNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoXCJpbmxpbmVcIil8fHRoaXMudWkuY29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhcInNob3dcIil9c2hvdyh0KXtpZih0aGlzLmlzU2hvd24oKSlyZXR1cm47Y29uc3QgZT10JiZcInRhcmdldFwiaW4gdD90LnRhcmdldDp0aGlzLm9wdGlvbnMuZWxlbWVudCx7dG9wOmksbGVmdDpufT10aGlzLmFkanVzdFBvc2l0aW9uKGUpO3RoaXMudWkuY29udGFpbmVyLnN0eWxlLnRvcD1gJHtpfXB4YCx0aGlzLnVpLmNvbnRhaW5lci5zdHlsZS5sZWZ0PWAke259cHhgLHRoaXMudWkuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpLHRoaXMudHJpZ2dlcihcInNob3dcIix7dGFyZ2V0OmV9KX1oaWRlKCl7dGhpcy51aS5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIiksdGhpcy5kYXRlUGlja2VkLmxlbmd0aD0wLHRoaXMucmVuZGVyQWxsKCksdGhpcy50cmlnZ2VyKFwiaGlkZVwiKX1zZXREYXRlKGUpe2NvbnN0IGk9bmV3IHQoZSx0aGlzLm9wdGlvbnMuZm9ybWF0KTt0aGlzLm9wdGlvbnMuZGF0ZT1pLmNsb25lKCksdGhpcy51cGRhdGVWYWx1ZXMoKSx0aGlzLmNhbGVuZGFycy5sZW5ndGgmJnRoaXMucmVuZGVyQWxsKCl9Z2V0RGF0ZSgpe3JldHVybiB0aGlzLm9wdGlvbnMuZGF0ZSBpbnN0YW5jZW9mIHQ/dGhpcy5vcHRpb25zLmRhdGUuY2xvbmUoKTpudWxsfXBhcnNlVmFsdWVzKCl7dGhpcy5vcHRpb25zLmRhdGU/dGhpcy5zZXREYXRlKHRoaXMub3B0aW9ucy5kYXRlKTp0aGlzLm9wdGlvbnMuZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQmJnRoaXMub3B0aW9ucy5lbGVtZW50LnZhbHVlLmxlbmd0aCYmdGhpcy5zZXREYXRlKHRoaXMub3B0aW9ucy5lbGVtZW50LnZhbHVlKSx0aGlzLm9wdGlvbnMuZGF0ZSBpbnN0YW5jZW9mIERhdGV8fCh0aGlzLm9wdGlvbnMuZGF0ZT1udWxsKX11cGRhdGVWYWx1ZXMoKXtjb25zdCB0PXRoaXMuZ2V0RGF0ZSgpLGU9dCBpbnN0YW5jZW9mIERhdGU/dC5mb3JtYXQodGhpcy5vcHRpb25zLmZvcm1hdCx0aGlzLm9wdGlvbnMubGFuZyk6XCJcIixpPXRoaXMub3B0aW9ucy5lbGVtZW50O2kgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50P2kudmFsdWU9ZTppIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQmJihpLmlubmVyVGV4dD1lKX1oaWRlUGlja2VyKHQpe2xldCBlPXQudGFyZ2V0LGk9bnVsbDtlLnNoYWRvd1Jvb3QmJihlPXQuY29tcG9zZWRQYXRoKClbMF0saT1lLmdldFJvb3ROb2RlKCkuaG9zdCksdGhpcy5pc1Nob3duKCkmJmkhPT10aGlzLnVpLndyYXBwZXImJmUhPT10aGlzLm9wdGlvbnMuZWxlbWVudCYmdGhpcy5oaWRlKCl9cmVuZGVyQWxsKHQpe3RoaXMudHJpZ2dlcihcInJlbmRlclwiLHt2aWV3OlwiQ29udGFpbmVyXCIsZGF0ZToodHx8dGhpcy5jYWxlbmRhcnNbMF0pLmNsb25lKCl9KX1pc0NhbGVuZGFySGVhZGVyQnV0dG9uKHQpe3JldHVybltcInByZXZpb3VzLWJ1dHRvblwiLFwibmV4dC1idXR0b25cIl0uc29tZSgoZT0+dC5jbGFzc0xpc3QuY29udGFpbnMoZSkpKX1pc0NhbGVuZGFyRGF5KHQpe3JldHVybiB0LmNsYXNzTGlzdC5jb250YWlucyhcImRheVwiKX1pc0FwcGx5QnV0dG9uKHQpe3JldHVybiB0LmNsYXNzTGlzdC5jb250YWlucyhcImFwcGx5LWJ1dHRvblwiKX1pc0NhbmNlbEJ1dHRvbih0KXtyZXR1cm4gdC5jbGFzc0xpc3QuY29udGFpbnMoXCJjYW5jZWwtYnV0dG9uXCIpfWdvdG9EYXRlKGUpe2NvbnN0IGk9bmV3IHQoZSx0aGlzLm9wdGlvbnMuZm9ybWF0KTtpLnNldERhdGUoMSksdGhpcy5jYWxlbmRhcnNbMF09aS5jbG9uZSgpLHRoaXMucmVuZGVyQWxsKCl9Y2xlYXIoKXt0aGlzLm9wdGlvbnMuZGF0ZT1udWxsLHRoaXMuZGF0ZVBpY2tlZC5sZW5ndGg9MCx0aGlzLnVwZGF0ZVZhbHVlcygpLHRoaXMucmVuZGVyQWxsKCksdGhpcy50cmlnZ2VyKFwiY2xlYXJcIil9aGFuZGxlT3B0aW9ucygpe3RoaXMub3B0aW9ucy5lbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnR8fCh0aGlzLm9wdGlvbnMuZWxlbWVudD10aGlzLm9wdGlvbnMuZG9jLnF1ZXJ5U2VsZWN0b3IodGhpcy5vcHRpb25zLmVsZW1lbnQpKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiB0aGlzLm9wdGlvbnMuZG9jdW1lbnRDbGljayYmZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsdGhpcy5vcHRpb25zLmRvY3VtZW50Q2xpY2ssITApLHRoaXMub3B0aW9ucy5lbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCYmKHRoaXMub3B0aW9ucy5lbGVtZW50LnJlYWRPbmx5PXRoaXMub3B0aW9ucy5yZWFkb25seSksdGhpcy5vcHRpb25zLmRhdGU/dGhpcy5jYWxlbmRhcnNbMF09bmV3IHQodGhpcy5vcHRpb25zLmRhdGUsdGhpcy5vcHRpb25zLmZvcm1hdCk6dGhpcy5jYWxlbmRhcnNbMF09bmV3IHR9aGFuZGxlQ1NTKCl7aWYoQXJyYXkuaXNBcnJheSh0aGlzLm9wdGlvbnMuY3NzKSl0aGlzLm9wdGlvbnMuY3NzLmZvckVhY2goKHQ9Pntjb25zdCBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO2UuaHJlZj10LGUucmVsPVwic3R5bGVzaGVldFwiO2NvbnN0IGk9KCk9Pnt0aGlzLmNzc0xvYWRlZCsrLHRoaXMuY3NzTG9hZGVkPT09dGhpcy5vcHRpb25zLmNzcy5sZW5ndGgmJih0aGlzLnVpLndyYXBwZXIuc3R5bGUuZGlzcGxheT1cIlwiKX07ZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLGkpLGUuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsaSksdGhpcy51aS5zaGFkb3dSb290LmFwcGVuZChlKX0pKTtlbHNlIGlmKFwic3RyaW5nXCI9PXR5cGVvZiB0aGlzLm9wdGlvbnMuY3NzKXtjb25zdCB0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKSxlPWRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMub3B0aW9ucy5jc3MpO3QuYXBwZW5kQ2hpbGQoZSksdGhpcy51aS5zaGFkb3dSb290LmFwcGVuZCh0KSx0aGlzLnVpLndyYXBwZXIuc3R5bGUuZGlzcGxheT1cIlwifWVsc2VcImZ1bmN0aW9uXCI9PXR5cGVvZiB0aGlzLm9wdGlvbnMuY3NzJiYodGhpcy5vcHRpb25zLmNzcy5jYWxsKHRoaXMsdGhpcyksdGhpcy51aS53cmFwcGVyLnN0eWxlLmRpc3BsYXk9XCJcIil9YWRqdXN0UG9zaXRpb24odCl7Y29uc3QgZT10LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLGk9dGhpcy51aS53cmFwcGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO3RoaXMudWkuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjYWxjXCIpO2NvbnN0IG49dGhpcy51aS5jb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7dGhpcy51aS5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImNhbGNcIik7bGV0IHM9ZS5ib3R0b20taS5ib3R0b20sbz1lLmxlZnQtaS5sZWZ0O3JldHVyblwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJih3aW5kb3cuaW5uZXJIZWlnaHQ8cytuLmhlaWdodCYmcy1uLmhlaWdodD49MCYmKHM9ZS50b3AtaS50b3Atbi5oZWlnaHQpLHdpbmRvdy5pbm5lcldpZHRoPG8rbi53aWR0aCYmZS5yaWdodC1uLndpZHRoPj0wJiYobz1lLnJpZ2h0LWkucmlnaHQtbi53aWR0aCkpLHtsZWZ0Om8sdG9wOnN9fX12YXIgcz1PYmplY3QuZnJlZXplKHtfX3Byb3RvX186bnVsbCxDb3JlOm4sY3JlYXRlOm59KTtjbGFzcyBve3BpY2tlcjtvcHRpb25zO3ByaW9yaXR5PTA7ZGVwZW5kZW5jaWVzPVtdO2F0dGFjaCh0KXtjb25zdCBlPXRoaXMuZ2V0TmFtZSgpLGk9ey4uLnRoaXMub3B0aW9uc307dGhpcy5vcHRpb25zPXsuLi50aGlzLm9wdGlvbnMsLi4udC5vcHRpb25zW2VdfHx7fX07Zm9yKGNvbnN0IG4gb2YgT2JqZWN0LmtleXMoaSkpaWYobnVsbCE9PWlbbl0mJlwib2JqZWN0XCI9PXR5cGVvZiBpW25dJiZPYmplY3Qua2V5cyhpW25dKS5sZW5ndGgmJmUgaW4gdC5vcHRpb25zJiZuIGluIHQub3B0aW9uc1tlXSl7Y29uc3Qgcz17Li4udC5vcHRpb25zW2VdW25dfTtudWxsIT09cyYmXCJvYmplY3RcIj09dHlwZW9mIHMmJk9iamVjdC5rZXlzKHMpLmxlbmd0aCYmT2JqZWN0LmtleXMocykuZXZlcnkoKHQ9Pk9iamVjdC5rZXlzKGlbbl0pLmluY2x1ZGVzKHQpKSkmJih0aGlzLm9wdGlvbnNbbl09ey4uLmlbbl0sLi4uc30pfWlmKHRoaXMucGlja2VyPXQsdGhpcy5kZXBlbmRlbmNpZXNOb3RGb3VuZCgpKXtjb25zdCB0PXRoaXMuZGVwZW5kZW5jaWVzLmZpbHRlcigodD0+IXRoaXMucGx1Z2luc0FzU3RyaW5nQXJyYXkoKS5pbmNsdWRlcyh0KSkpO3JldHVybiB2b2lkIGNvbnNvbGUud2FybihgJHt0aGlzLmdldE5hbWUoKX06IHJlcXVpcmVkIGRlcGVuZGVuY2llcyAoJHt0LmpvaW4oXCIsIFwiKX0pLmApfWNvbnN0IG49dGhpcy5jYW1lbENhc2VUb0tlYmFiKHRoaXMuZ2V0TmFtZSgpKTt0aGlzLnBpY2tlci51aS5jb250YWluZXIuY2xhc3NMaXN0LmFkZChuKSx0aGlzLm9uQXR0YWNoKCl9ZGV0YWNoKCl7Y29uc3QgdD10aGlzLmNhbWVsQ2FzZVRvS2ViYWIodGhpcy5nZXROYW1lKCkpO3RoaXMucGlja2VyLnVpLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKHQpLFwiZnVuY3Rpb25cIj09dHlwZW9mIHRoaXMub25EZXRhY2gmJnRoaXMub25EZXRhY2goKX1kZXBlbmRlbmNpZXNOb3RGb3VuZCgpe3JldHVybiB0aGlzLmRlcGVuZGVuY2llcy5sZW5ndGgmJiF0aGlzLmRlcGVuZGVuY2llcy5ldmVyeSgodD0+dGhpcy5wbHVnaW5zQXNTdHJpbmdBcnJheSgpLmluY2x1ZGVzKHQpKSl9cGx1Z2luc0FzU3RyaW5nQXJyYXkoKXtyZXR1cm4gdGhpcy5waWNrZXIub3B0aW9ucy5wbHVnaW5zLm1hcCgodD0+XCJmdW5jdGlvblwiPT10eXBlb2YgdD8obmV3IHQpLmdldE5hbWUoKTp0KSl9Y2FtZWxDYXNlVG9LZWJhYih0KXtyZXR1cm4gdC5yZXBsYWNlKC8oW2EtekEtWl0pKD89W0EtWl0pL2csXCIkMS1cIikudG9Mb3dlckNhc2UoKX19Y2xhc3MgYSBleHRlbmRzIG97cHJpb3JpdHk9MTtiaW5kcz17b25WaWV3OnRoaXMub25WaWV3LmJpbmQodGhpcyl9O29wdGlvbnM9e21pbkRhdGU6bnVsbCxtYXhEYXRlOm51bGwsbWluRGF5czpudWxsLG1heERheXM6bnVsbCxzZWxlY3RGb3J3YXJkOm51bGwsc2VsZWN0QmFja3dhcmQ6bnVsbCxwcmVzZXRzOiEwLGluc2VwYXJhYmxlOiExLGZpbHRlcjpudWxsfTtnZXROYW1lKCl7cmV0dXJuXCJMb2NrUGx1Z2luXCJ9b25BdHRhY2goKXtpZih0aGlzLm9wdGlvbnMubWluRGF0ZSYmKHRoaXMub3B0aW9ucy5taW5EYXRlPW5ldyB0KHRoaXMub3B0aW9ucy5taW5EYXRlLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0LHRoaXMucGlja2VyLm9wdGlvbnMubGFuZykpLHRoaXMub3B0aW9ucy5tYXhEYXRlJiYodGhpcy5vcHRpb25zLm1heERhdGU9bmV3IHQodGhpcy5vcHRpb25zLm1heERhdGUsdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQsdGhpcy5waWNrZXIub3B0aW9ucy5sYW5nKSx0aGlzLm9wdGlvbnMubWF4RGF0ZSBpbnN0YW5jZW9mIHQmJnRoaXMucGlja2VyLm9wdGlvbnMuY2FsZW5kYXJzPjEmJnRoaXMucGlja2VyLmNhbGVuZGFyc1swXS5pc1NhbWUodGhpcy5vcHRpb25zLm1heERhdGUsXCJtb250aFwiKSkpe2NvbnN0IHQ9dGhpcy5waWNrZXIuY2FsZW5kYXJzWzBdLmNsb25lKCkuc3VidHJhY3QoMSxcIm1vbnRoXCIpO3RoaXMucGlja2VyLmdvdG9EYXRlKHQpfWlmKCh0aGlzLm9wdGlvbnMubWluRGF5c3x8dGhpcy5vcHRpb25zLm1heERheXN8fHRoaXMub3B0aW9ucy5zZWxlY3RGb3J3YXJkfHx0aGlzLm9wdGlvbnMuc2VsZWN0QmFja3dhcmQpJiYhdGhpcy5waWNrZXIub3B0aW9ucy5wbHVnaW5zLmluY2x1ZGVzKFwiUmFuZ2VQbHVnaW5cIikpe2NvbnN0IHQ9W1wibWluRGF5c1wiLFwibWF4RGF5c1wiLFwic2VsZWN0Rm9yd2FyZFwiLFwic2VsZWN0QmFja3dhcmRcIl07Y29uc29sZS53YXJuKGAke3RoaXMuZ2V0TmFtZSgpfTogb3B0aW9ucyAke3Quam9pbihcIiwgXCIpfSByZXF1aXJlZCBSYW5nZVBsdWdpbi5gKX10aGlzLnBpY2tlci5vbihcInZpZXdcIix0aGlzLmJpbmRzLm9uVmlldyl9b25EZXRhY2goKXt0aGlzLnBpY2tlci5vZmYoXCJ2aWV3XCIsdGhpcy5iaW5kcy5vblZpZXcpfW9uVmlldyhlKXtjb25zdHt2aWV3OmksdGFyZ2V0Om4sZGF0ZTpzfT1lLmRldGFpbDtpZihcIkNhbGVuZGFySGVhZGVyXCI9PT1pJiYodGhpcy5vcHRpb25zLm1pbkRhdGUgaW5zdGFuY2VvZiB0JiZzLmlzU2FtZU9yQmVmb3JlKHRoaXMub3B0aW9ucy5taW5EYXRlLFwibW9udGhcIikmJm4uY2xhc3NMaXN0LmFkZChcIm5vLXByZXZpb3VzLW1vbnRoXCIpLHRoaXMub3B0aW9ucy5tYXhEYXRlIGluc3RhbmNlb2YgdCYmcy5pc1NhbWVPckFmdGVyKHRoaXMub3B0aW9ucy5tYXhEYXRlLFwibW9udGhcIikmJm4uY2xhc3NMaXN0LmFkZChcIm5vLW5leHQtbW9udGhcIikpLFwiQ2FsZW5kYXJEYXlcIj09PWkpe2NvbnN0IHQ9dGhpcy5waWNrZXIuZGF0ZVBpY2tlZC5sZW5ndGg/dGhpcy5waWNrZXIuZGF0ZVBpY2tlZFswXTpudWxsO2lmKHRoaXMudGVzdEZpbHRlcihzKSlyZXR1cm4gdm9pZCBuLmNsYXNzTGlzdC5hZGQoXCJsb2NrZWRcIik7aWYodGhpcy5vcHRpb25zLmluc2VwYXJhYmxlKXtpZih0aGlzLm9wdGlvbnMubWluRGF5cyl7Y29uc3QgdD1zLmNsb25lKCkuc3VidHJhY3QodGhpcy5vcHRpb25zLm1pbkRheXMtMSxcImRheVwiKSxlPXMuY2xvbmUoKS5hZGQodGhpcy5vcHRpb25zLm1pbkRheXMtMSxcImRheVwiKTtsZXQgaT0hMSxvPSExO2Zvcig7dC5pc0JlZm9yZShzLFwiZGF5XCIpOyl7aWYodGhpcy50ZXN0RmlsdGVyKHQpKXtpPSEwO2JyZWFrfXQuYWRkKDEsXCJkYXlcIil9Zm9yKDtlLmlzQWZ0ZXIocyxcImRheVwiKTspe2lmKHRoaXMudGVzdEZpbHRlcihlKSl7bz0hMDticmVha31lLnN1YnRyYWN0KDEsXCJkYXlcIil9aSYmbyYmbi5jbGFzc0xpc3QuYWRkKFwibm90LWF2YWlsYWJsZVwiKX10aGlzLnJhbmdlSXNOb3RBdmFpbGFibGUocyx0KSYmbi5jbGFzc0xpc3QuYWRkKFwibm90LWF2YWlsYWJsZVwiKX10aGlzLmRhdGVJc05vdEF2YWlsYWJsZShzLHQpJiZuLmNsYXNzTGlzdC5hZGQoXCJub3QtYXZhaWxhYmxlXCIpfWlmKHRoaXMub3B0aW9ucy5wcmVzZXRzJiZcIlByZXNldFBsdWdpbkJ1dHRvblwiPT09aSl7Y29uc3QgZT1uZXcgdChOdW1iZXIobi5kYXRhc2V0LnN0YXJ0KSksaT1uZXcgdChOdW1iZXIobi5kYXRhc2V0LmVuZCkpLHM9aS5kaWZmKGUsXCJkYXlcIiksbz10aGlzLm9wdGlvbnMubWluRGF5cyYmczx0aGlzLm9wdGlvbnMubWluRGF5cyxhPXRoaXMub3B0aW9ucy5tYXhEYXlzJiZzPnRoaXMub3B0aW9ucy5tYXhEYXlzOyhvfHxhfHx0aGlzLmxvY2tNaW5EYXRlKGUpfHx0aGlzLmxvY2tNYXhEYXRlKGUpfHx0aGlzLmxvY2tNaW5EYXRlKGkpfHx0aGlzLmxvY2tNYXhEYXRlKGkpfHx0aGlzLnJhbmdlSXNOb3RBdmFpbGFibGUoZSxpKSkmJm4uc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIixcImRpc2FibGVkXCIpfX1kYXRlSXNOb3RBdmFpbGFibGUodCxlKXtyZXR1cm4gdGhpcy5sb2NrTWluRGF0ZSh0KXx8dGhpcy5sb2NrTWF4RGF0ZSh0KXx8dGhpcy5sb2NrTWluRGF5cyh0LGUpfHx0aGlzLmxvY2tNYXhEYXlzKHQsZSl8fHRoaXMubG9ja1NlbGVjdEZvcndhcmQodCl8fHRoaXMubG9ja1NlbGVjdEJhY2t3YXJkKHQpfXJhbmdlSXNOb3RBdmFpbGFibGUodCxlKXtpZighdHx8IWUpcmV0dXJuITE7Y29uc3QgaT0odC5pc1NhbWVPckJlZm9yZShlLFwiZGF5XCIpP3Q6ZSkuY2xvbmUoKSxuPShlLmlzU2FtZU9yQWZ0ZXIodCxcImRheVwiKT9lOnQpLmNsb25lKCk7Zm9yKDtpLmlzU2FtZU9yQmVmb3JlKG4sXCJkYXlcIik7KXtpZih0aGlzLnRlc3RGaWx0ZXIoaSkpcmV0dXJuITA7aS5hZGQoMSxcImRheVwiKX1yZXR1cm4hMX1sb2NrTWluRGF0ZShlKXtyZXR1cm4gdGhpcy5vcHRpb25zLm1pbkRhdGUgaW5zdGFuY2VvZiB0JiZlLmlzQmVmb3JlKHRoaXMub3B0aW9ucy5taW5EYXRlLFwiZGF5XCIpfWxvY2tNYXhEYXRlKGUpe3JldHVybiB0aGlzLm9wdGlvbnMubWF4RGF0ZSBpbnN0YW5jZW9mIHQmJmUuaXNBZnRlcih0aGlzLm9wdGlvbnMubWF4RGF0ZSxcImRheVwiKX1sb2NrTWluRGF5cyh0LGUpe2lmKHRoaXMub3B0aW9ucy5taW5EYXlzJiZlKXtjb25zdCBpPWUuY2xvbmUoKS5zdWJ0cmFjdCh0aGlzLm9wdGlvbnMubWluRGF5cy0xLFwiZGF5XCIpLG49ZS5jbG9uZSgpLmFkZCh0aGlzLm9wdGlvbnMubWluRGF5cy0xLFwiZGF5XCIpO3JldHVybiB0LmlzQmV0d2VlbihpLG4pfXJldHVybiExfWxvY2tNYXhEYXlzKHQsZSl7aWYodGhpcy5vcHRpb25zLm1heERheXMmJmUpe2NvbnN0IGk9ZS5jbG9uZSgpLnN1YnRyYWN0KHRoaXMub3B0aW9ucy5tYXhEYXlzLFwiZGF5XCIpLG49ZS5jbG9uZSgpLmFkZCh0aGlzLm9wdGlvbnMubWF4RGF5cyxcImRheVwiKTtyZXR1cm4hdC5pc0JldHdlZW4oaSxuKX1yZXR1cm4hMX1sb2NrU2VsZWN0Rm9yd2FyZCh0KXtpZigxPT09dGhpcy5waWNrZXIuZGF0ZVBpY2tlZC5sZW5ndGgmJnRoaXMub3B0aW9ucy5zZWxlY3RGb3J3YXJkKXtjb25zdCBlPXRoaXMucGlja2VyLmRhdGVQaWNrZWRbMF0uY2xvbmUoKTtyZXR1cm4gdC5pc0JlZm9yZShlLFwiZGF5XCIpfXJldHVybiExfWxvY2tTZWxlY3RCYWNrd2FyZCh0KXtpZigxPT09dGhpcy5waWNrZXIuZGF0ZVBpY2tlZC5sZW5ndGgmJnRoaXMub3B0aW9ucy5zZWxlY3RCYWNrd2FyZCl7Y29uc3QgZT10aGlzLnBpY2tlci5kYXRlUGlja2VkWzBdLmNsb25lKCk7cmV0dXJuIHQuaXNBZnRlcihlLFwiZGF5XCIpfXJldHVybiExfXRlc3RGaWx0ZXIodCl7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgdGhpcy5vcHRpb25zLmZpbHRlciYmdGhpcy5vcHRpb25zLmZpbHRlcih0LHRoaXMucGlja2VyLmRhdGVQaWNrZWQpfX1jbGFzcyByIGV4dGVuZHMgb3tkZXBlbmRlbmNpZXM9W1wiUmFuZ2VQbHVnaW5cIl07YmluZHM9e29uVmlldzp0aGlzLm9uVmlldy5iaW5kKHRoaXMpLG9uQ2xpY2s6dGhpcy5vbkNsaWNrLmJpbmQodGhpcyl9O29wdGlvbnM9e2N1c3RvbUxhYmVsczpbXCJUb2RheVwiLFwiWWVzdGVyZGF5XCIsXCJMYXN0IDcgRGF5c1wiLFwiTGFzdCAzMCBEYXlzXCIsXCJUaGlzIE1vbnRoXCIsXCJMYXN0IE1vbnRoXCJdLGN1c3RvbVByZXNldDp7fSxwb3NpdGlvbjpcImxlZnRcIn07Z2V0TmFtZSgpe3JldHVyblwiUHJlc2V0UGx1Z2luXCJ9b25BdHRhY2goKXtpZighT2JqZWN0LmtleXModGhpcy5vcHRpb25zLmN1c3RvbVByZXNldCkubGVuZ3RoKXtjb25zdCBlPW5ldyB0LGk9KCk9Pntjb25zdCBpPWUuY2xvbmUoKTtpLnNldERhdGUoMSk7Y29uc3Qgbj1uZXcgRGF0ZShlLmdldEZ1bGxZZWFyKCksZS5nZXRNb250aCgpKzEsMCk7cmV0dXJuW25ldyB0KGkpLG5ldyB0KG4pXX0sbj0oKT0+e2NvbnN0IGk9ZS5jbG9uZSgpO2kuc2V0TW9udGgoaS5nZXRNb250aCgpLTEpLGkuc2V0RGF0ZSgxKTtjb25zdCBuPW5ldyBEYXRlKGUuZ2V0RnVsbFllYXIoKSxlLmdldE1vbnRoKCksMCk7cmV0dXJuW25ldyB0KGkpLG5ldyB0KG4pXX0scz1bW2UuY2xvbmUoKSxlLmNsb25lKCldLFtlLmNsb25lKCkuc3VidHJhY3QoMSxcImRheVwiKSxlLmNsb25lKCkuc3VidHJhY3QoMSxcImRheVwiKV0sW2UuY2xvbmUoKS5zdWJ0cmFjdCg2LFwiZGF5XCIpLGUuY2xvbmUoKV0sW2UuY2xvbmUoKS5zdWJ0cmFjdCgyOSxcImRheVwiKSxlLmNsb25lKCldLGkoKSxuKCldO09iamVjdC52YWx1ZXModGhpcy5vcHRpb25zLmN1c3RvbUxhYmVscykuZm9yRWFjaCgoKHQsZSk9Pnt0aGlzLm9wdGlvbnMuY3VzdG9tUHJlc2V0W3RdPXNbZV19KSl9dGhpcy5waWNrZXIub24oXCJ2aWV3XCIsdGhpcy5iaW5kcy5vblZpZXcpLHRoaXMucGlja2VyLm9uKFwiY2xpY2tcIix0aGlzLmJpbmRzLm9uQ2xpY2spfW9uRGV0YWNoKCl7dGhpcy5waWNrZXIub2ZmKFwidmlld1wiLHRoaXMuYmluZHMub25WaWV3KSx0aGlzLnBpY2tlci5vZmYoXCJjbGlja1wiLHRoaXMuYmluZHMub25DbGljayl9b25WaWV3KHQpe2NvbnN0e3ZpZXc6ZSx0YXJnZXQ6aX09dC5kZXRhaWw7aWYoXCJNYWluXCI9PT1lKXtjb25zdCB0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7dC5jbGFzc05hbWU9XCJwcmVzZXQtcGx1Z2luLWNvbnRhaW5lclwiLE9iamVjdC5rZXlzKHRoaXMub3B0aW9ucy5jdXN0b21QcmVzZXQpLmZvckVhY2goKGU9PntpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5vcHRpb25zLmN1c3RvbVByZXNldCxlKSl7Y29uc3QgaT10aGlzLm9wdGlvbnMuY3VzdG9tUHJlc2V0W2VdLG49ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtuLmNsYXNzTmFtZT1cInByZXNldC1idXR0b24gdW5pdFwiLG4uaW5uZXJIVE1MPWUsbi5kYXRhc2V0LnN0YXJ0PWlbMF0uZ2V0VGltZSgpLG4uZGF0YXNldC5lbmQ9aVsxXS5nZXRUaW1lKCksdC5hcHBlbmRDaGlsZChuKSx0aGlzLnBpY2tlci50cmlnZ2VyKFwidmlld1wiLHt2aWV3OlwiUHJlc2V0UGx1Z2luQnV0dG9uXCIsdGFyZ2V0Om59KX19KSksaS5hcHBlbmRDaGlsZCh0KSxpLmNsYXNzTGlzdC5hZGQoYHByZXNldC0ke3RoaXMub3B0aW9ucy5wb3NpdGlvbn1gKSx0aGlzLnBpY2tlci50cmlnZ2VyKFwidmlld1wiLHt2aWV3OlwiUHJlc2V0UGx1Z2luQ29udGFpbmVyXCIsdGFyZ2V0OnR9KX19b25DbGljayhlKXtjb25zdCBpPWUudGFyZ2V0O2lmKGkgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCl7Y29uc3QgZT1pLmNsb3Nlc3QoXCIudW5pdFwiKTtpZighKGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpcmV0dXJuO2lmKHRoaXMuaXNQcmVzZXRCdXR0b24oZSkpe2NvbnN0IGk9bmV3IHQoTnVtYmVyKGUuZGF0YXNldC5zdGFydCkpLG49bmV3IHQoTnVtYmVyKGUuZGF0YXNldC5lbmQpKTt0aGlzLnBpY2tlci5vcHRpb25zLmF1dG9BcHBseT8odGhpcy5waWNrZXIuc2V0RGF0ZVJhbmdlKGksbiksdGhpcy5waWNrZXIudHJpZ2dlcihcInNlbGVjdFwiLHtzdGFydDp0aGlzLnBpY2tlci5nZXRTdGFydERhdGUoKSxlbmQ6dGhpcy5waWNrZXIuZ2V0RW5kRGF0ZSgpfSksdGhpcy5waWNrZXIuaGlkZSgpKToodGhpcy5waWNrZXIuZGF0ZVBpY2tlZD1baSxuXSx0aGlzLnBpY2tlci5yZW5kZXJBbGwoKSl9fX1pc1ByZXNldEJ1dHRvbih0KXtyZXR1cm4gdC5jbGFzc0xpc3QuY29udGFpbnMoXCJwcmVzZXQtYnV0dG9uXCIpfX1jbGFzcyBjIGV4dGVuZHMgb3t0b29sdGlwRWxlbWVudDt0cmlnZ2VyRWxlbWVudDtiaW5kcz17c2V0U3RhcnREYXRlOnRoaXMuc2V0U3RhcnREYXRlLmJpbmQodGhpcyksc2V0RW5kRGF0ZTp0aGlzLnNldEVuZERhdGUuYmluZCh0aGlzKSxzZXREYXRlUmFuZ2U6dGhpcy5zZXREYXRlUmFuZ2UuYmluZCh0aGlzKSxnZXRTdGFydERhdGU6dGhpcy5nZXRTdGFydERhdGUuYmluZCh0aGlzKSxnZXRFbmREYXRlOnRoaXMuZ2V0RW5kRGF0ZS5iaW5kKHRoaXMpLG9uVmlldzp0aGlzLm9uVmlldy5iaW5kKHRoaXMpLG9uU2hvdzp0aGlzLm9uU2hvdy5iaW5kKHRoaXMpLG9uTW91c2VFbnRlcjp0aGlzLm9uTW91c2VFbnRlci5iaW5kKHRoaXMpLG9uTW91c2VMZWF2ZTp0aGlzLm9uTW91c2VMZWF2ZS5iaW5kKHRoaXMpLG9uQ2xpY2tDYWxlbmRhckRheTp0aGlzLm9uQ2xpY2tDYWxlbmRhckRheS5iaW5kKHRoaXMpLG9uQ2xpY2tBcHBseUJ1dHRvbjp0aGlzLm9uQ2xpY2tBcHBseUJ1dHRvbi5iaW5kKHRoaXMpLHBhcnNlVmFsdWVzOnRoaXMucGFyc2VWYWx1ZXMuYmluZCh0aGlzKSx1cGRhdGVWYWx1ZXM6dGhpcy51cGRhdGVWYWx1ZXMuYmluZCh0aGlzKSxjbGVhcjp0aGlzLmNsZWFyLmJpbmQodGhpcyl9O29wdGlvbnM9e2VsZW1lbnRFbmQ6bnVsbCxzdGFydERhdGU6bnVsbCxlbmREYXRlOm51bGwscmVwaWNrOiExLHN0cmljdDohMCxkZWxpbWl0ZXI6XCIgLSBcIix0b29sdGlwOiEwLHRvb2x0aXBOdW1iZXI6dD0+dCxsb2NhbGU6e3plcm86XCJcIixvbmU6XCJkYXlcIix0d286XCJcIixmZXc6XCJcIixtYW55OlwiXCIsb3RoZXI6XCJkYXlzXCJ9LGRvY3VtZW50Q2xpY2s6dGhpcy5oaWRlUGlja2VyLmJpbmQodGhpcyl9O2dldE5hbWUoKXtyZXR1cm5cIlJhbmdlUGx1Z2luXCJ9b25BdHRhY2goKXt0aGlzLmJpbmRzLl9zZXRTdGFydERhdGU9dGhpcy5waWNrZXIuc2V0U3RhcnREYXRlLHRoaXMuYmluZHMuX3NldEVuZERhdGU9dGhpcy5waWNrZXIuc2V0RW5kRGF0ZSx0aGlzLmJpbmRzLl9zZXREYXRlUmFuZ2U9dGhpcy5waWNrZXIuc2V0RGF0ZVJhbmdlLHRoaXMuYmluZHMuX2dldFN0YXJ0RGF0ZT10aGlzLnBpY2tlci5nZXRTdGFydERhdGUsdGhpcy5iaW5kcy5fZ2V0RW5kRGF0ZT10aGlzLnBpY2tlci5nZXRFbmREYXRlLHRoaXMuYmluZHMuX3BhcnNlVmFsdWVzPXRoaXMucGlja2VyLnBhcnNlVmFsdWVzLHRoaXMuYmluZHMuX3VwZGF0ZVZhbHVlcz10aGlzLnBpY2tlci51cGRhdGVWYWx1ZXMsdGhpcy5iaW5kcy5fY2xlYXI9dGhpcy5waWNrZXIuY2xlYXIsdGhpcy5iaW5kcy5fb25DbGlja0NhbGVuZGFyRGF5PXRoaXMucGlja2VyLm9uQ2xpY2tDYWxlbmRhckRheSx0aGlzLmJpbmRzLl9vbkNsaWNrQXBwbHlCdXR0b249dGhpcy5waWNrZXIub25DbGlja0FwcGx5QnV0dG9uLE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMucGlja2VyLHtzZXRTdGFydERhdGU6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLnNldFN0YXJ0RGF0ZX0sc2V0RW5kRGF0ZTp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuc2V0RW5kRGF0ZX0sc2V0RGF0ZVJhbmdlOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5zZXREYXRlUmFuZ2V9LGdldFN0YXJ0RGF0ZTp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuZ2V0U3RhcnREYXRlfSxnZXRFbmREYXRlOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5nZXRFbmREYXRlfSxwYXJzZVZhbHVlczp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMucGFyc2VWYWx1ZXN9LHVwZGF0ZVZhbHVlczp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMudXBkYXRlVmFsdWVzfSxjbGVhcjp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuY2xlYXJ9LG9uQ2xpY2tDYWxlbmRhckRheTp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMub25DbGlja0NhbGVuZGFyRGF5fSxvbkNsaWNrQXBwbHlCdXR0b246e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLm9uQ2xpY2tBcHBseUJ1dHRvbn19KSx0aGlzLm9wdGlvbnMuZWxlbWVudEVuZCYmKHRoaXMub3B0aW9ucy5lbGVtZW50RW5kIGluc3RhbmNlb2YgSFRNTEVsZW1lbnR8fCh0aGlzLm9wdGlvbnMuZWxlbWVudEVuZD10aGlzLnBpY2tlci5vcHRpb25zLmRvYy5xdWVyeVNlbGVjdG9yKHRoaXMub3B0aW9ucy5lbGVtZW50RW5kKSksdGhpcy5vcHRpb25zLmVsZW1lbnRFbmQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50JiYodGhpcy5vcHRpb25zLmVsZW1lbnRFbmQucmVhZE9ubHk9dGhpcy5waWNrZXIub3B0aW9ucy5yZWFkb25seSksXCJmdW5jdGlvblwiPT10eXBlb2YgdGhpcy5waWNrZXIub3B0aW9ucy5kb2N1bWVudENsaWNrJiYoZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsdGhpcy5waWNrZXIub3B0aW9ucy5kb2N1bWVudENsaWNrLCEwKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiB0aGlzLm9wdGlvbnMuZG9jdW1lbnRDbGljayYmZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsdGhpcy5vcHRpb25zLmRvY3VtZW50Q2xpY2ssITApKSx0aGlzLm9wdGlvbnMuZWxlbWVudEVuZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIix0aGlzLnBpY2tlci5zaG93LmJpbmQodGhpcy5waWNrZXIpKSksdGhpcy5vcHRpb25zLnJlcGljaz10aGlzLm9wdGlvbnMucmVwaWNrJiZ0aGlzLm9wdGlvbnMuZWxlbWVudEVuZCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50LHRoaXMucGlja2VyLm9wdGlvbnMuZGF0ZT1udWxsLHRoaXMucGlja2VyLm9uKFwidmlld1wiLHRoaXMuYmluZHMub25WaWV3KSx0aGlzLnBpY2tlci5vbihcInNob3dcIix0aGlzLmJpbmRzLm9uU2hvdyksdGhpcy5waWNrZXIub24oXCJtb3VzZWVudGVyXCIsdGhpcy5iaW5kcy5vbk1vdXNlRW50ZXIsITApLHRoaXMucGlja2VyLm9uKFwibW91c2VsZWF2ZVwiLHRoaXMuYmluZHMub25Nb3VzZUxlYXZlLCEwKSx0aGlzLmNoZWNrSW50bFBsdXJhbExvY2FsZXMoKX1vbkRldGFjaCgpe09iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMucGlja2VyLHtzZXRTdGFydERhdGU6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLl9zZXRTdGFydERhdGV9LHNldEVuZERhdGU6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLl9zZXRFbmREYXRlfSxzZXREYXRlUmFuZ2U6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLl9zZXREYXRlUmFuZ2V9LGdldFN0YXJ0RGF0ZTp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuX2dldFN0YXJ0RGF0ZX0sZ2V0RW5kRGF0ZTp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuX2dldEVuZERhdGV9LHBhcnNlVmFsdWVzOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5fcGFyc2VWYWx1ZXN9LHVwZGF0ZVZhbHVlczp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuX3VwZGF0ZVZhbHVlc30sY2xlYXI6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLl9jbGVhcn0sb25DbGlja0NhbGVuZGFyRGF5Ontjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5fb25DbGlja0NhbGVuZGFyRGF5fSxvbkNsaWNrQXBwbHlCdXR0b246e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLl9vbkNsaWNrQXBwbHlCdXR0b259fSksdGhpcy5waWNrZXIub2ZmKFwidmlld1wiLHRoaXMuYmluZHMub25WaWV3KSx0aGlzLnBpY2tlci5vZmYoXCJzaG93XCIsdGhpcy5iaW5kcy5vblNob3cpLHRoaXMucGlja2VyLm9mZihcIm1vdXNlZW50ZXJcIix0aGlzLmJpbmRzLm9uTW91c2VFbnRlciwhMCksdGhpcy5waWNrZXIub2ZmKFwibW91c2VsZWF2ZVwiLHRoaXMuYmluZHMub25Nb3VzZUxlYXZlLCEwKX1wYXJzZVZhbHVlcygpe2lmKHRoaXMub3B0aW9ucy5zdGFydERhdGV8fHRoaXMub3B0aW9ucy5lbmREYXRlKXRoaXMub3B0aW9ucy5zdHJpY3Q/dGhpcy5vcHRpb25zLnN0YXJ0RGF0ZSYmdGhpcy5vcHRpb25zLmVuZERhdGU/dGhpcy5zZXREYXRlUmFuZ2UodGhpcy5vcHRpb25zLnN0YXJ0RGF0ZSx0aGlzLm9wdGlvbnMuZW5kRGF0ZSk6KHRoaXMub3B0aW9ucy5zdGFydERhdGU9bnVsbCx0aGlzLm9wdGlvbnMuZW5kRGF0ZT1udWxsKToodGhpcy5vcHRpb25zLnN0YXJ0RGF0ZSYmdGhpcy5zZXRTdGFydERhdGUodGhpcy5vcHRpb25zLnN0YXJ0RGF0ZSksdGhpcy5vcHRpb25zLmVuZERhdGUmJnRoaXMuc2V0RW5kRGF0ZSh0aGlzLm9wdGlvbnMuZW5kRGF0ZSkpO2Vsc2UgaWYodGhpcy5vcHRpb25zLmVsZW1lbnRFbmQpdGhpcy5vcHRpb25zLnN0cmljdD90aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50JiZ0aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQudmFsdWUubGVuZ3RoJiZ0aGlzLm9wdGlvbnMuZWxlbWVudEVuZCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQmJnRoaXMub3B0aW9ucy5lbGVtZW50RW5kLnZhbHVlLmxlbmd0aCYmdGhpcy5zZXREYXRlUmFuZ2UodGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50LnZhbHVlLHRoaXMub3B0aW9ucy5lbGVtZW50RW5kLnZhbHVlKToodGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCYmdGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50LnZhbHVlLmxlbmd0aCYmdGhpcy5zZXRTdGFydERhdGUodGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50LnZhbHVlKSx0aGlzLm9wdGlvbnMuZWxlbWVudEVuZCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQmJnRoaXMub3B0aW9ucy5lbGVtZW50RW5kLnZhbHVlLmxlbmd0aCYmdGhpcy5zZXRFbmREYXRlKHRoaXMub3B0aW9ucy5lbGVtZW50RW5kLnZhbHVlKSk7ZWxzZSBpZih0aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50JiZ0aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQudmFsdWUubGVuZ3RoKXtjb25zdFt0LGVdPXRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudC52YWx1ZS5zcGxpdCh0aGlzLm9wdGlvbnMuZGVsaW1pdGVyKTt0aGlzLm9wdGlvbnMuc3RyaWN0P3QmJmUmJnRoaXMuc2V0RGF0ZVJhbmdlKHQsZSk6KHQmJnRoaXMuc2V0U3RhcnREYXRlKHQpLGUmJnRoaXMuc2V0RW5kRGF0ZShlKSl9fXVwZGF0ZVZhbHVlcygpe2NvbnN0IHQ9dGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50LGU9dGhpcy5vcHRpb25zLmVsZW1lbnRFbmQsaT10aGlzLnBpY2tlci5nZXRTdGFydERhdGUoKSxuPXRoaXMucGlja2VyLmdldEVuZERhdGUoKSxzPWkgaW5zdGFuY2VvZiBEYXRlP2kuZm9ybWF0KHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0LHRoaXMucGlja2VyLm9wdGlvbnMubGFuZyk6XCJcIixvPW4gaW5zdGFuY2VvZiBEYXRlP24uZm9ybWF0KHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0LHRoaXMucGlja2VyLm9wdGlvbnMubGFuZyk6XCJcIjtpZihlKXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50P3QudmFsdWU9czp0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQmJih0LmlubmVyVGV4dD1zKSxlIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudD9lLnZhbHVlPW86ZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50JiYoZS5pbm5lclRleHQ9byk7ZWxzZXtjb25zdCBlPWAke3N9JHtzfHxvP3RoaXMub3B0aW9ucy5kZWxpbWl0ZXI6XCJcIn0ke299YDt0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudD90LnZhbHVlPWU6dCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50JiYodC5pbm5lclRleHQ9ZSl9fWNsZWFyKCl7dGhpcy5vcHRpb25zLnN0YXJ0RGF0ZT1udWxsLHRoaXMub3B0aW9ucy5lbmREYXRlPW51bGwsdGhpcy5waWNrZXIuZGF0ZVBpY2tlZC5sZW5ndGg9MCx0aGlzLnVwZGF0ZVZhbHVlcygpLHRoaXMucGlja2VyLnJlbmRlckFsbCgpLHRoaXMucGlja2VyLnRyaWdnZXIoXCJjbGVhclwiKX1vblNob3codCl7Y29uc3R7dGFyZ2V0OmV9PXQuZGV0YWlsO3RoaXMudHJpZ2dlckVsZW1lbnQ9ZSx0aGlzLnBpY2tlci5vcHRpb25zLnNjcm9sbFRvRGF0ZSYmdGhpcy5nZXRTdGFydERhdGUoKWluc3RhbmNlb2YgRGF0ZSYmdGhpcy5waWNrZXIuZ290b0RhdGUodGhpcy5nZXRTdGFydERhdGUoKSksdGhpcy5pbml0aWFsaXplUmVwaWNrKCl9b25WaWV3KGUpe2NvbnN0e3ZpZXc6aSx0YXJnZXQ6bn09ZS5kZXRhaWw7aWYoXCJNYWluXCI9PT1pJiYodGhpcy50b29sdGlwRWxlbWVudD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSx0aGlzLnRvb2x0aXBFbGVtZW50LmNsYXNzTmFtZT1cInJhbmdlLXBsdWdpbi10b29sdGlwXCIsbi5hcHBlbmRDaGlsZCh0aGlzLnRvb2x0aXBFbGVtZW50KSksXCJDYWxlbmRhckRheVwiPT09aSl7Y29uc3QgZT1uZXcgdChuLmRhdGFzZXQudGltZSksaT10aGlzLnBpY2tlci5kYXRlUGlja2VkLHM9aS5sZW5ndGg/dGhpcy5waWNrZXIuZGF0ZVBpY2tlZFswXTp0aGlzLmdldFN0YXJ0RGF0ZSgpLG89aS5sZW5ndGg/dGhpcy5waWNrZXIuZGF0ZVBpY2tlZFsxXTp0aGlzLmdldEVuZERhdGUoKTtzJiZzLmlzU2FtZShlLFwiZGF5XCIpJiZuLmNsYXNzTGlzdC5hZGQoXCJzdGFydFwiKSxzJiZvJiYoby5pc1NhbWUoZSxcImRheVwiKSYmbi5jbGFzc0xpc3QuYWRkKFwiZW5kXCIpLGUuaXNCZXR3ZWVuKHMsbykmJm4uY2xhc3NMaXN0LmFkZChcImluLXJhbmdlXCIpKX1pZihcIkZvb3RlclwiPT09aSl7Y29uc3QgdD0xPT09dGhpcy5waWNrZXIuZGF0ZVBpY2tlZC5sZW5ndGgmJiF0aGlzLm9wdGlvbnMuc3RyaWN0fHwyPT09dGhpcy5waWNrZXIuZGF0ZVBpY2tlZC5sZW5ndGg7bi5xdWVyeVNlbGVjdG9yKFwiLmFwcGx5LWJ1dHRvblwiKS5kaXNhYmxlZD0hdH19aGlkZVBpY2tlcih0KXtsZXQgZT10LnRhcmdldCxpPW51bGw7ZS5zaGFkb3dSb290JiYoZT10LmNvbXBvc2VkUGF0aCgpWzBdLGk9ZS5nZXRSb290Tm9kZSgpLmhvc3QpLHRoaXMucGlja2VyLmlzU2hvd24oKSYmaSE9PXRoaXMucGlja2VyLnVpLndyYXBwZXImJmUhPT10aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQmJmUhPT10aGlzLm9wdGlvbnMuZWxlbWVudEVuZCYmdGhpcy5waWNrZXIuaGlkZSgpfXNldFN0YXJ0RGF0ZShlKXtjb25zdCBpPW5ldyB0KGUsdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQpO3RoaXMub3B0aW9ucy5zdGFydERhdGU9aT9pLmNsb25lKCk6bnVsbCx0aGlzLnVwZGF0ZVZhbHVlcygpLHRoaXMucGlja2VyLnJlbmRlckFsbCgpfXNldEVuZERhdGUoZSl7Y29uc3QgaT1uZXcgdChlLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0KTt0aGlzLm9wdGlvbnMuZW5kRGF0ZT1pP2kuY2xvbmUoKTpudWxsLHRoaXMudXBkYXRlVmFsdWVzKCksdGhpcy5waWNrZXIucmVuZGVyQWxsKCl9c2V0RGF0ZVJhbmdlKGUsaSl7Y29uc3Qgbj1uZXcgdChlLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0KSxzPW5ldyB0KGksdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQpO3RoaXMub3B0aW9ucy5zdGFydERhdGU9bj9uLmNsb25lKCk6bnVsbCx0aGlzLm9wdGlvbnMuZW5kRGF0ZT1zP3MuY2xvbmUoKTpudWxsLHRoaXMudXBkYXRlVmFsdWVzKCksdGhpcy5waWNrZXIucmVuZGVyQWxsKCl9Z2V0U3RhcnREYXRlKCl7cmV0dXJuIHRoaXMub3B0aW9ucy5zdGFydERhdGUgaW5zdGFuY2VvZiBEYXRlP3RoaXMub3B0aW9ucy5zdGFydERhdGUuY2xvbmUoKTpudWxsfWdldEVuZERhdGUoKXtyZXR1cm4gdGhpcy5vcHRpb25zLmVuZERhdGUgaW5zdGFuY2VvZiBEYXRlP3RoaXMub3B0aW9ucy5lbmREYXRlLmNsb25lKCk6bnVsbH1vbk1vdXNlRW50ZXIoZSl7Y29uc3QgaT1lLnRhcmdldDtpZihpIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpe3RoaXMuaXNDb250YWluZXIoaSkmJnRoaXMuaW5pdGlhbGl6ZVJlcGljaygpO2NvbnN0IGU9aS5jbG9zZXN0KFwiLnVuaXRcIik7aWYoIShlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKXJldHVybjtpZih0aGlzLnBpY2tlci5pc0NhbGVuZGFyRGF5KGUpKXtpZigxIT09dGhpcy5waWNrZXIuZGF0ZVBpY2tlZC5sZW5ndGgpcmV0dXJuO2xldCBpPXRoaXMucGlja2VyLmRhdGVQaWNrZWRbMF0uY2xvbmUoKSxuPW5ldyB0KGUuZGF0YXNldC50aW1lKSxzPSExO2lmKGkuaXNBZnRlcihuLFwiZGF5XCIpKXtjb25zdCB0PWkuY2xvbmUoKTtpPW4uY2xvbmUoKSxuPXQuY2xvbmUoKSxzPSEwfWlmKFsuLi50aGlzLnBpY2tlci51aS5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcIi5kYXlcIildLmZvckVhY2goKG89Pntjb25zdCBhPW5ldyB0KG8uZGF0YXNldC50aW1lKSxyPXRoaXMucGlja2VyLkNhbGVuZGFyLmdldENhbGVuZGFyRGF5VmlldyhhKTthLmlzQmV0d2VlbihpLG4pJiZyLmNsYXNzTGlzdC5hZGQoXCJpbi1yYW5nZVwiKSxhLmlzU2FtZSh0aGlzLnBpY2tlci5kYXRlUGlja2VkWzBdLFwiZGF5XCIpJiYoci5jbGFzc0xpc3QuYWRkKFwic3RhcnRcIiksci5jbGFzc0xpc3QudG9nZ2xlKFwiZmxpcHBlZFwiLHMpKSxvPT09ZSYmKHIuY2xhc3NMaXN0LmFkZChcImVuZFwiKSxyLmNsYXNzTGlzdC50b2dnbGUoXCJmbGlwcGVkXCIscykpLG8uY2xhc3NOYW1lPXIuY2xhc3NOYW1lfSkpLHRoaXMub3B0aW9ucy50b29sdGlwKXtjb25zdCB0PXRoaXMub3B0aW9ucy50b29sdGlwTnVtYmVyKG4uZGlmZihpLFwiZGF5XCIpKzEpO2lmKHQ+MCl7Y29uc3QgaT1uZXcgSW50bC5QbHVyYWxSdWxlcyh0aGlzLnBpY2tlci5vcHRpb25zLmxhbmcpLnNlbGVjdCh0KSxuPWAke3R9ICR7dGhpcy5vcHRpb25zLmxvY2FsZVtpXX1gO3RoaXMuc2hvd1Rvb2x0aXAoZSxuKX1lbHNlIHRoaXMuaGlkZVRvb2x0aXAoKX19fX1vbk1vdXNlTGVhdmUodCl7aWYodGhpcy5pc0NvbnRhaW5lcih0LnRhcmdldCkmJnRoaXMub3B0aW9ucy5yZXBpY2spe2NvbnN0IHQ9dGhpcy5nZXRTdGFydERhdGUoKSxlPXRoaXMuZ2V0RW5kRGF0ZSgpO3QmJmUmJih0aGlzLnBpY2tlci5kYXRlUGlja2VkLmxlbmd0aD0wLHRoaXMucGlja2VyLnJlbmRlckFsbCgpKX19b25DbGlja0NhbGVuZGFyRGF5KGUpe2lmKHRoaXMucGlja2VyLmlzQ2FsZW5kYXJEYXkoZSkpezI9PT10aGlzLnBpY2tlci5kYXRlUGlja2VkLmxlbmd0aCYmKHRoaXMucGlja2VyLmRhdGVQaWNrZWQubGVuZ3RoPTApO2NvbnN0IGk9bmV3IHQoZS5kYXRhc2V0LnRpbWUpO2lmKHRoaXMucGlja2VyLmRhdGVQaWNrZWRbdGhpcy5waWNrZXIuZGF0ZVBpY2tlZC5sZW5ndGhdPWksMj09PXRoaXMucGlja2VyLmRhdGVQaWNrZWQubGVuZ3RoJiZ0aGlzLnBpY2tlci5kYXRlUGlja2VkWzBdLmlzQWZ0ZXIodGhpcy5waWNrZXIuZGF0ZVBpY2tlZFsxXSkpe2NvbnN0IHQ9dGhpcy5waWNrZXIuZGF0ZVBpY2tlZFsxXS5jbG9uZSgpO3RoaXMucGlja2VyLmRhdGVQaWNrZWRbMV09dGhpcy5waWNrZXIuZGF0ZVBpY2tlZFswXS5jbG9uZSgpLHRoaXMucGlja2VyLmRhdGVQaWNrZWRbMF09dC5jbG9uZSgpfTEhPT10aGlzLnBpY2tlci5kYXRlUGlja2VkLmxlbmd0aCYmdGhpcy5waWNrZXIub3B0aW9ucy5hdXRvQXBwbHl8fHRoaXMucGlja2VyLnRyaWdnZXIoXCJwcmVzZWxlY3RcIix7c3RhcnQ6dGhpcy5waWNrZXIuZGF0ZVBpY2tlZFswXWluc3RhbmNlb2YgRGF0ZT90aGlzLnBpY2tlci5kYXRlUGlja2VkWzBdLmNsb25lKCk6bnVsbCxlbmQ6dGhpcy5waWNrZXIuZGF0ZVBpY2tlZFsxXWluc3RhbmNlb2YgRGF0ZT90aGlzLnBpY2tlci5kYXRlUGlja2VkWzFdLmNsb25lKCk6bnVsbH0pLDE9PT10aGlzLnBpY2tlci5kYXRlUGlja2VkLmxlbmd0aCYmKCF0aGlzLm9wdGlvbnMuc3RyaWN0JiZ0aGlzLnBpY2tlci5vcHRpb25zLmF1dG9BcHBseSYmKHRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudD09PXRoaXMudHJpZ2dlckVsZW1lbnQmJnRoaXMuc2V0U3RhcnREYXRlKHRoaXMucGlja2VyLmRhdGVQaWNrZWRbMF0pLHRoaXMub3B0aW9ucy5lbGVtZW50RW5kPT09dGhpcy50cmlnZ2VyRWxlbWVudCYmdGhpcy5zZXRFbmREYXRlKHRoaXMucGlja2VyLmRhdGVQaWNrZWRbMF0pLHRoaXMucGlja2VyLnRyaWdnZXIoXCJzZWxlY3RcIix7c3RhcnQ6dGhpcy5waWNrZXIuZ2V0U3RhcnREYXRlKCksZW5kOnRoaXMucGlja2VyLmdldEVuZERhdGUoKX0pKSx0aGlzLnBpY2tlci5yZW5kZXJBbGwoKSksMj09PXRoaXMucGlja2VyLmRhdGVQaWNrZWQubGVuZ3RoJiYodGhpcy5waWNrZXIub3B0aW9ucy5hdXRvQXBwbHk/KHRoaXMuc2V0RGF0ZVJhbmdlKHRoaXMucGlja2VyLmRhdGVQaWNrZWRbMF0sdGhpcy5waWNrZXIuZGF0ZVBpY2tlZFsxXSksdGhpcy5waWNrZXIudHJpZ2dlcihcInNlbGVjdFwiLHtzdGFydDp0aGlzLnBpY2tlci5nZXRTdGFydERhdGUoKSxlbmQ6dGhpcy5waWNrZXIuZ2V0RW5kRGF0ZSgpfSksdGhpcy5waWNrZXIuaGlkZSgpKToodGhpcy5oaWRlVG9vbHRpcCgpLHRoaXMucGlja2VyLnJlbmRlckFsbCgpKSl9fW9uQ2xpY2tBcHBseUJ1dHRvbih0KXt0aGlzLnBpY2tlci5pc0FwcGx5QnV0dG9uKHQpJiYoMSE9PXRoaXMucGlja2VyLmRhdGVQaWNrZWQubGVuZ3RofHx0aGlzLm9wdGlvbnMuc3RyaWN0fHwodGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50PT09dGhpcy50cmlnZ2VyRWxlbWVudCYmKHRoaXMub3B0aW9ucy5lbmREYXRlPW51bGwsdGhpcy5zZXRTdGFydERhdGUodGhpcy5waWNrZXIuZGF0ZVBpY2tlZFswXSkpLHRoaXMub3B0aW9ucy5lbGVtZW50RW5kPT09dGhpcy50cmlnZ2VyRWxlbWVudCYmKHRoaXMub3B0aW9ucy5zdGFydERhdGU9bnVsbCx0aGlzLnNldEVuZERhdGUodGhpcy5waWNrZXIuZGF0ZVBpY2tlZFswXSkpKSwyPT09dGhpcy5waWNrZXIuZGF0ZVBpY2tlZC5sZW5ndGgmJnRoaXMuc2V0RGF0ZVJhbmdlKHRoaXMucGlja2VyLmRhdGVQaWNrZWRbMF0sdGhpcy5waWNrZXIuZGF0ZVBpY2tlZFsxXSksdGhpcy5waWNrZXIudHJpZ2dlcihcInNlbGVjdFwiLHtzdGFydDp0aGlzLnBpY2tlci5nZXRTdGFydERhdGUoKSxlbmQ6dGhpcy5waWNrZXIuZ2V0RW5kRGF0ZSgpfSksdGhpcy5waWNrZXIuaGlkZSgpKX1zaG93VG9vbHRpcCh0LGUpe3RoaXMudG9vbHRpcEVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eT1cInZpc2libGVcIix0aGlzLnRvb2x0aXBFbGVtZW50LmlubmVySFRNTD1lO2NvbnN0IGk9dGhpcy5waWNrZXIudWkuY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLG49dGhpcy50b29sdGlwRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxzPXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7bGV0IG89cy50b3AsYT1zLmxlZnQ7by09aS50b3AsYS09aS5sZWZ0LG8tPW4uaGVpZ2h0LGEtPW4ud2lkdGgvMixhKz1zLndpZHRoLzIsdGhpcy50b29sdGlwRWxlbWVudC5zdHlsZS50b3A9YCR7b31weGAsdGhpcy50b29sdGlwRWxlbWVudC5zdHlsZS5sZWZ0PWAke2F9cHhgfWhpZGVUb29sdGlwKCl7dGhpcy50b29sdGlwRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5PVwiaGlkZGVuXCJ9Y2hlY2tJbnRsUGx1cmFsTG9jYWxlcygpe2lmKCF0aGlzLm9wdGlvbnMudG9vbHRpcClyZXR1cm47Y29uc3QgdD1bLi4ubmV3IFNldChbbmV3IEludGwuUGx1cmFsUnVsZXModGhpcy5waWNrZXIub3B0aW9ucy5sYW5nKS5zZWxlY3QoMCksbmV3IEludGwuUGx1cmFsUnVsZXModGhpcy5waWNrZXIub3B0aW9ucy5sYW5nKS5zZWxlY3QoMSksbmV3IEludGwuUGx1cmFsUnVsZXModGhpcy5waWNrZXIub3B0aW9ucy5sYW5nKS5zZWxlY3QoMiksbmV3IEludGwuUGx1cmFsUnVsZXModGhpcy5waWNrZXIub3B0aW9ucy5sYW5nKS5zZWxlY3QoNiksbmV3IEludGwuUGx1cmFsUnVsZXModGhpcy5waWNrZXIub3B0aW9ucy5sYW5nKS5zZWxlY3QoMTgpXSldLGU9T2JqZWN0LmtleXModGhpcy5vcHRpb25zLmxvY2FsZSk7dC5ldmVyeSgodD0+ZS5pbmNsdWRlcyh0KSkpfHxjb25zb2xlLndhcm4oYCR7dGhpcy5nZXROYW1lKCl9OiBwcm92aWRlIGxvY2FsZXMgKCR7dC5qb2luKFwiLCBcIil9KSBmb3IgY29ycmVjdCB0b29sdGlwIHRleHQuYCl9aW5pdGlhbGl6ZVJlcGljaygpe2lmKCF0aGlzLm9wdGlvbnMucmVwaWNrKXJldHVybjtjb25zdCB0PXRoaXMuZ2V0U3RhcnREYXRlKCksZT10aGlzLmdldEVuZERhdGUoKTtlJiZ0aGlzLnRyaWdnZXJFbGVtZW50PT09dGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50JiYodGhpcy5waWNrZXIuZGF0ZVBpY2tlZFswXT1lKSx0JiZ0aGlzLnRyaWdnZXJFbGVtZW50PT09dGhpcy5vcHRpb25zLmVsZW1lbnRFbmQmJih0aGlzLnBpY2tlci5kYXRlUGlja2VkWzBdPXQpfWlzQ29udGFpbmVyKHQpe3JldHVybiB0PT09dGhpcy5waWNrZXIudWkuY29udGFpbmVyfX1jbGFzcyBsIGV4dGVuZHMgb3tvcHRpb25zPXtuYXRpdmU6ITEsc2Vjb25kczohMSxzdGVwSG91cnM6MSxzdGVwTWludXRlczo1LHN0ZXBTZWNvbmRzOjUsZm9ybWF0MTI6ITF9O3JhbmdlUGx1Z2luO3RpbWVQaWNrZWQ9e2lucHV0Om51bGwsc3RhcnQ6bnVsbCxlbmQ6bnVsbH07dGltZVByZVBpY2tlZD17aW5wdXQ6bnVsbCxzdGFydDpudWxsLGVuZDpudWxsfTtiaW5kcz17Z2V0RGF0ZTp0aGlzLmdldERhdGUuYmluZCh0aGlzKSxnZXRTdGFydERhdGU6dGhpcy5nZXRTdGFydERhdGUuYmluZCh0aGlzKSxnZXRFbmREYXRlOnRoaXMuZ2V0RW5kRGF0ZS5iaW5kKHRoaXMpLG9uVmlldzp0aGlzLm9uVmlldy5iaW5kKHRoaXMpLG9uSW5wdXQ6dGhpcy5vbklucHV0LmJpbmQodGhpcyksb25DaGFuZ2U6dGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpLG9uQ2xpY2s6dGhpcy5vbkNsaWNrLmJpbmQodGhpcyksc2V0VGltZTp0aGlzLnNldFRpbWUuYmluZCh0aGlzKSxzZXRTdGFydFRpbWU6dGhpcy5zZXRTdGFydFRpbWUuYmluZCh0aGlzKSxzZXRFbmRUaW1lOnRoaXMuc2V0RW5kVGltZS5iaW5kKHRoaXMpfTtnZXROYW1lKCl7cmV0dXJuXCJUaW1lUGx1Z2luXCJ9b25BdHRhY2goKXt0aGlzLmJpbmRzLl9nZXREYXRlPXRoaXMucGlja2VyLmdldERhdGUsdGhpcy5iaW5kcy5fZ2V0U3RhcnREYXRlPXRoaXMucGlja2VyLmdldFN0YXJ0RGF0ZSx0aGlzLmJpbmRzLl9nZXRFbmREYXRlPXRoaXMucGlja2VyLmdldEVuZERhdGUsT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcy5waWNrZXIse2dldERhdGU6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLmdldERhdGV9LGdldFN0YXJ0RGF0ZTp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuZ2V0U3RhcnREYXRlfSxnZXRFbmREYXRlOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5nZXRFbmREYXRlfSxzZXRUaW1lOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5zZXRUaW1lfSxzZXRTdGFydFRpbWU6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLnNldFN0YXJ0VGltZX0sc2V0RW5kVGltZTp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuc2V0RW5kVGltZX19KSx0aGlzLnJhbmdlUGx1Z2luPXRoaXMucGlja2VyLlBsdWdpbk1hbmFnZXIuZ2V0SW5zdGFuY2UoXCJSYW5nZVBsdWdpblwiKSx0aGlzLnBhcnNlVmFsdWVzKCksdGhpcy5waWNrZXIub24oXCJ2aWV3XCIsdGhpcy5iaW5kcy5vblZpZXcpLHRoaXMucGlja2VyLm9uKFwiaW5wdXRcIix0aGlzLmJpbmRzLm9uSW5wdXQpLHRoaXMucGlja2VyLm9uKFwiY2hhbmdlXCIsdGhpcy5iaW5kcy5vbkNoYW5nZSksdGhpcy5waWNrZXIub24oXCJjbGlja1wiLHRoaXMuYmluZHMub25DbGljayl9b25EZXRhY2goKXtkZWxldGUgdGhpcy5waWNrZXIuc2V0VGltZSxkZWxldGUgdGhpcy5waWNrZXIuc2V0U3RhcnRUaW1lLGRlbGV0ZSB0aGlzLnBpY2tlci5zZXRFbmRUaW1lLE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMucGlja2VyLHtnZXREYXRlOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5fZ2V0RGF0ZX0sZ2V0U3RhcnREYXRlOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5fZ2V0U3RhcnREYXRlfSxnZXRFbmREYXRlOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5fZ2V0RW5kRGF0ZX19KSx0aGlzLnBpY2tlci5vZmYoXCJ2aWV3XCIsdGhpcy5iaW5kcy5vblZpZXcpLHRoaXMucGlja2VyLm9mZihcImlucHV0XCIsdGhpcy5iaW5kcy5vbklucHV0KSx0aGlzLnBpY2tlci5vZmYoXCJjaGFuZ2VcIix0aGlzLmJpbmRzLm9uQ2hhbmdlKSx0aGlzLnBpY2tlci5vZmYoXCJjbGlja1wiLHRoaXMuYmluZHMub25DbGljayl9b25WaWV3KHQpe2NvbnN0e3ZpZXc6ZSx0YXJnZXQ6aX09dC5kZXRhaWw7aWYoXCJNYWluXCI9PT1lKXt0aGlzLnJhbmdlUGx1Z2luPXRoaXMucGlja2VyLlBsdWdpbk1hbmFnZXIuZ2V0SW5zdGFuY2UoXCJSYW5nZVBsdWdpblwiKTtjb25zdCB0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7aWYodC5jbGFzc05hbWU9XCJ0aW1lLXBsdWdpbi1jb250YWluZXJcIix0aGlzLnJhbmdlUGx1Z2luKXtjb25zdCBlPXRoaXMuZ2V0U3RhcnRJbnB1dCgpO3QuYXBwZW5kQ2hpbGQoZSksdGhpcy5waWNrZXIudHJpZ2dlcihcInZpZXdcIix7dmlldzpcIlRpbWVQbHVnaW5JbnB1dFwiLHRhcmdldDplfSk7Y29uc3QgaT10aGlzLmdldEVuZElucHV0KCk7dC5hcHBlbmRDaGlsZChpKSx0aGlzLnBpY2tlci50cmlnZ2VyKFwidmlld1wiLHt2aWV3OlwiVGltZVBsdWdpbklucHV0XCIsdGFyZ2V0Oml9KX1lbHNle2NvbnN0IGU9dGhpcy5nZXRTaW5nbGVJbnB1dCgpO3QuYXBwZW5kQ2hpbGQoZSksdGhpcy5waWNrZXIudHJpZ2dlcihcInZpZXdcIix7dmlldzpcIlRpbWVQbHVnaW5JbnB1dFwiLHRhcmdldDplfSl9aS5hcHBlbmRDaGlsZCh0KSx0aGlzLnBpY2tlci50cmlnZ2VyKFwidmlld1wiLHt2aWV3OlwiVGltZVBsdWdpbkNvbnRhaW5lclwiLHRhcmdldDp0fSl9fW9uSW5wdXQoZSl7Y29uc3QgaT1lLnRhcmdldDtpZihpIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCYmaS5jbGFzc0xpc3QuY29udGFpbnMoXCJ0aW1lLXBsdWdpbi1pbnB1dFwiKSl7Y29uc3QgZT10aGlzLnRpbWVQaWNrZWRbaS5uYW1lXXx8bmV3IHQsW24sc109aS52YWx1ZS5zcGxpdChcIjpcIik7ZS5zZXRIb3VycyhOdW1iZXIobil8fDAsTnVtYmVyKHMpfHwwLDAsMCksdGhpcy5waWNrZXIub3B0aW9ucy5hdXRvQXBwbHk/KHRoaXMudGltZVBpY2tlZFtpLm5hbWVdPWUsdGhpcy5waWNrZXIudXBkYXRlVmFsdWVzKCkpOnRoaXMudGltZVByZVBpY2tlZFtpLm5hbWVdPWV9fW9uQ2hhbmdlKGUpe2NvbnN0IGk9ZS50YXJnZXQ7aWYoaSBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50JiZpLmNsYXNzTGlzdC5jb250YWlucyhcInRpbWUtcGx1Z2luLWN1c3RvbS1pbnB1dFwiKSl7Y29uc3QgZT0vKFxcdyspXFxbKFxcdyspXFxdLyxbLG4sc109aS5uYW1lLm1hdGNoKGUpLG89TnVtYmVyKGkudmFsdWUpO2xldCBhPW5ldyB0O3N3aXRjaCghdGhpcy5waWNrZXIub3B0aW9ucy5hdXRvQXBwbHkmJnRoaXMudGltZVByZVBpY2tlZFtuXWluc3RhbmNlb2YgRGF0ZT9hPXRoaXMudGltZVByZVBpY2tlZFtuXS5jbG9uZSgpOnRoaXMudGltZVBpY2tlZFtuXWluc3RhbmNlb2YgRGF0ZSYmKGE9dGhpcy50aW1lUGlja2VkW25dLmNsb25lKCkpLHMpe2Nhc2VcIkhIXCI6aWYodGhpcy5vcHRpb25zLmZvcm1hdDEyKXtjb25zdCB0PWkuY2xvc2VzdChcIi50aW1lLXBsdWdpbi1jdXN0b20tYmxvY2tcIikucXVlcnlTZWxlY3Rvcihgc2VsZWN0W25hbWU9XCIke259W3BlcmlvZF1cIl1gKS52YWx1ZSxlPXRoaXMuaGFuZGxlRm9ybWF0MTIodCxhLG8pO2Euc2V0SG91cnMoZS5nZXRIb3VycygpLGUuZ2V0TWludXRlcygpLGUuZ2V0U2Vjb25kcygpLDApfWVsc2UgYS5zZXRIb3VycyhvLGEuZ2V0TWludXRlcygpLGEuZ2V0U2Vjb25kcygpLDApO2JyZWFrO2Nhc2VcIm1tXCI6YS5zZXRIb3VycyhhLmdldEhvdXJzKCksbyxhLmdldFNlY29uZHMoKSwwKTticmVhaztjYXNlXCJzc1wiOmEuc2V0SG91cnMoYS5nZXRIb3VycygpLGEuZ2V0TWludXRlcygpLG8sMCk7YnJlYWs7Y2FzZVwicGVyaW9kXCI6aWYodGhpcy5vcHRpb25zLmZvcm1hdDEyKXtjb25zdCB0PWkuY2xvc2VzdChcIi50aW1lLXBsdWdpbi1jdXN0b20tYmxvY2tcIikucXVlcnlTZWxlY3Rvcihgc2VsZWN0W25hbWU9XCIke259W0hIXVwiXWApLnZhbHVlLGU9dGhpcy5oYW5kbGVGb3JtYXQxMihpLnZhbHVlLGEsTnVtYmVyKHQpKTthLnNldEhvdXJzKGUuZ2V0SG91cnMoKSxlLmdldE1pbnV0ZXMoKSxlLmdldFNlY29uZHMoKSwwKX19aWYodGhpcy5waWNrZXIub3B0aW9ucy5hdXRvQXBwbHkpdGhpcy50aW1lUGlja2VkW25dPWEsdGhpcy5waWNrZXIudXBkYXRlVmFsdWVzKCk7ZWxzZXt0aGlzLnRpbWVQcmVQaWNrZWRbbl09YTtjb25zdCB0PXRoaXMucGlja2VyLnVpLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmFwcGx5LWJ1dHRvblwiKTtpZih0aGlzLnJhbmdlUGx1Z2luKXtjb25zdCBlPXRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucyxpPXRoaXMucGlja2VyLmRhdGVQaWNrZWQsbj1lLnN0cmljdCYmMj09PWkubGVuZ3RofHwhZS5zdHJpY3QmJmkubGVuZ3RoPjB8fCFpLmxlbmd0aCYmZS5zdHJpY3QmJmUuc3RhcnREYXRlIGluc3RhbmNlb2YgRGF0ZSYmZS5lbmREYXRlIGluc3RhbmNlb2YgRGF0ZXx8IWkubGVuZ3RoJiYhZS5zdHJpY3QmJihlLnN0YXJ0RGF0ZSBpbnN0YW5jZW9mIERhdGV8fGUuZW5kRGF0ZSBpbnN0YW5jZW9mIERhdGUpO3QuZGlzYWJsZWQ9IW59ZWxzZSB0aGlzLnBpY2tlci5kYXRlUGlja2VkLmxlbmd0aCYmKHQuZGlzYWJsZWQ9ITEpfX19b25DbGljayh0KXtjb25zdCBlPXQudGFyZ2V0O2lmKGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCl7Y29uc3QgdD1lLmNsb3Nlc3QoXCIudW5pdFwiKTtpZighKHQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpcmV0dXJuO3RoaXMucGlja2VyLmlzQXBwbHlCdXR0b24odCkmJihPYmplY3Qua2V5cyh0aGlzLnRpbWVQaWNrZWQpLmZvckVhY2goKHQ9Pnt0aGlzLnRpbWVQcmVQaWNrZWRbdF1pbnN0YW5jZW9mIERhdGUmJih0aGlzLnRpbWVQaWNrZWRbdF09dGhpcy50aW1lUHJlUGlja2VkW3RdLmNsb25lKCkpfSkpLHRoaXMucGlja2VyLnVwZGF0ZVZhbHVlcygpLHRoaXMudGltZVByZVBpY2tlZD17aW5wdXQ6bnVsbCxzdGFydDpudWxsLGVuZDpudWxsfSksdGhpcy5waWNrZXIuaXNDYW5jZWxCdXR0b24odCkmJih0aGlzLnRpbWVQcmVQaWNrZWQ9e2lucHV0Om51bGwsc3RhcnQ6bnVsbCxlbmQ6bnVsbH0sdGhpcy5waWNrZXIucmVuZGVyQWxsKCkpfX1zZXRUaW1lKHQpe2NvbnN0IGU9dGhpcy5oYW5kbGVUaW1lU3RyaW5nKHQpO3RoaXMudGltZVBpY2tlZC5pbnB1dD1lLmNsb25lKCksdGhpcy5waWNrZXIucmVuZGVyQWxsKCksdGhpcy5waWNrZXIudXBkYXRlVmFsdWVzKCl9c2V0U3RhcnRUaW1lKHQpe2NvbnN0IGU9dGhpcy5oYW5kbGVUaW1lU3RyaW5nKHQpO3RoaXMudGltZVBpY2tlZC5zdGFydD1lLmNsb25lKCksdGhpcy5waWNrZXIucmVuZGVyQWxsKCksdGhpcy5waWNrZXIudXBkYXRlVmFsdWVzKCl9c2V0RW5kVGltZSh0KXtjb25zdCBlPXRoaXMuaGFuZGxlVGltZVN0cmluZyh0KTt0aGlzLnRpbWVQaWNrZWQuZW5kPWUuY2xvbmUoKSx0aGlzLnBpY2tlci5yZW5kZXJBbGwoKSx0aGlzLnBpY2tlci51cGRhdGVWYWx1ZXMoKX1oYW5kbGVUaW1lU3RyaW5nKGUpe2NvbnN0IGk9bmV3IHQsW24scyxvXT1lLnNwbGl0KFwiOlwiKS5tYXAoKHQ9Pk51bWJlcih0KSkpLGE9biYmIU51bWJlci5pc05hTihuKT9uOjAscj1zJiYhTnVtYmVyLmlzTmFOKHMpP3M6MCxjPW8mJiFOdW1iZXIuaXNOYU4obyk/bzowO3JldHVybiBpLnNldEhvdXJzKGEscixjLDApLGl9Z2V0RGF0ZSgpe2lmKHRoaXMucGlja2VyLm9wdGlvbnMuZGF0ZSBpbnN0YW5jZW9mIERhdGUpe2NvbnN0IGU9bmV3IHQodGhpcy5waWNrZXIub3B0aW9ucy5kYXRlLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0KTtpZih0aGlzLnRpbWVQaWNrZWQuaW5wdXQgaW5zdGFuY2VvZiBEYXRlKXtjb25zdCB0PXRoaXMudGltZVBpY2tlZC5pbnB1dDtlLnNldEhvdXJzKHQuZ2V0SG91cnMoKSx0LmdldE1pbnV0ZXMoKSx0LmdldFNlY29uZHMoKSwwKX1yZXR1cm4gZX1yZXR1cm4gbnVsbH1nZXRTdGFydERhdGUoKXtpZih0aGlzLnJhbmdlUGx1Z2luLm9wdGlvbnMuc3RhcnREYXRlIGluc3RhbmNlb2YgRGF0ZSl7Y29uc3QgZT1uZXcgdCh0aGlzLnJhbmdlUGx1Z2luLm9wdGlvbnMuc3RhcnREYXRlLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0KTtpZih0aGlzLnRpbWVQaWNrZWQuc3RhcnQgaW5zdGFuY2VvZiBEYXRlKXtjb25zdCB0PXRoaXMudGltZVBpY2tlZC5zdGFydDtlLnNldEhvdXJzKHQuZ2V0SG91cnMoKSx0LmdldE1pbnV0ZXMoKSx0LmdldFNlY29uZHMoKSwwKX1yZXR1cm4gZX1yZXR1cm4gbnVsbH1nZXRFbmREYXRlKCl7aWYodGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLmVuZERhdGUgaW5zdGFuY2VvZiBEYXRlKXtjb25zdCBlPW5ldyB0KHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5lbmREYXRlLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0KTtpZih0aGlzLnRpbWVQaWNrZWQuZW5kIGluc3RhbmNlb2YgRGF0ZSl7Y29uc3QgdD10aGlzLnRpbWVQaWNrZWQuZW5kO2Uuc2V0SG91cnModC5nZXRIb3VycygpLHQuZ2V0TWludXRlcygpLHQuZ2V0U2Vjb25kcygpLDApfXJldHVybiBlfXJldHVybiBudWxsfWdldFNpbmdsZUlucHV0KCl7cmV0dXJuIHRoaXMub3B0aW9ucy5uYXRpdmU/dGhpcy5nZXROYXRpdmVJbnB1dChcImlucHV0XCIpOnRoaXMuZ2V0Q3VzdG9tSW5wdXQoXCJpbnB1dFwiKX1nZXRTdGFydElucHV0KCl7cmV0dXJuIHRoaXMub3B0aW9ucy5uYXRpdmU/dGhpcy5nZXROYXRpdmVJbnB1dChcInN0YXJ0XCIpOnRoaXMuZ2V0Q3VzdG9tSW5wdXQoXCJzdGFydFwiKX1nZXRFbmRJbnB1dCgpe3JldHVybiB0aGlzLm9wdGlvbnMubmF0aXZlP3RoaXMuZ2V0TmF0aXZlSW5wdXQoXCJlbmRcIik6dGhpcy5nZXRDdXN0b21JbnB1dChcImVuZFwiKX1nZXROYXRpdmVJbnB1dCh0KXtjb25zdCBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtlLnR5cGU9XCJ0aW1lXCIsZS5uYW1lPXQsZS5jbGFzc05hbWU9XCJ0aW1lLXBsdWdpbi1pbnB1dCB1bml0XCI7Y29uc3QgaT10aGlzLnRpbWVQaWNrZWRbdF07aWYoaSl7Y29uc3QgdD1gMCR7aS5nZXRIb3VycygpfWAuc2xpY2UoLTIpLG49YDAke2kuZ2V0TWludXRlcygpfWAuc2xpY2UoLTIpO2UudmFsdWU9YCR7dH06JHtufWB9cmV0dXJuIGV9Z2V0Q3VzdG9tSW5wdXQodCl7Y29uc3QgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2UuY2xhc3NOYW1lPVwidGltZS1wbHVnaW4tY3VzdG9tLWJsb2NrXCI7Y29uc3QgaT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO2kuY2xhc3NOYW1lPVwidGltZS1wbHVnaW4tY3VzdG9tLWlucHV0IHVuaXRcIixpLm5hbWU9YCR7dH1bSEhdYDtjb25zdCBuPXRoaXMub3B0aW9ucy5mb3JtYXQxMj8xOjAscz10aGlzLm9wdGlvbnMuZm9ybWF0MTI/MTM6MjQ7bGV0IG89bnVsbDshdGhpcy5waWNrZXIub3B0aW9ucy5hdXRvQXBwbHkmJnRoaXMudGltZVByZVBpY2tlZFt0XWluc3RhbmNlb2YgRGF0ZT9vPXRoaXMudGltZVByZVBpY2tlZFt0XS5jbG9uZSgpOnRoaXMudGltZVBpY2tlZFt0XWluc3RhbmNlb2YgRGF0ZSYmKG89dGhpcy50aW1lUGlja2VkW3RdLmNsb25lKCkpO2ZvcihsZXQgdD1uO3Q8czt0Kz10aGlzLm9wdGlvbnMuc3RlcEhvdXJzKXtjb25zdCBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7ZS52YWx1ZT1TdHJpbmcodCksZS50ZXh0PVN0cmluZyh0KSxvJiYodGhpcy5vcHRpb25zLmZvcm1hdDEyPyhvLmdldEhvdXJzKCklMTI/by5nZXRIb3VycygpJTEyOjEyKT09PXQmJihlLnNlbGVjdGVkPSEwKTpvLmdldEhvdXJzKCk9PT10JiYoZS5zZWxlY3RlZD0hMCkpLGkuYXBwZW5kQ2hpbGQoZSl9ZS5hcHBlbmRDaGlsZChpKTtjb25zdCBhPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7YS5jbGFzc05hbWU9XCJ0aW1lLXBsdWdpbi1jdXN0b20taW5wdXQgdW5pdFwiLGEubmFtZT1gJHt0fVttbV1gO2ZvcihsZXQgdD0wO3Q8NjA7dCs9dGhpcy5vcHRpb25zLnN0ZXBNaW51dGVzKXtjb25zdCBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7ZS52YWx1ZT1gMCR7U3RyaW5nKHQpfWAuc2xpY2UoLTIpLGUudGV4dD1gMCR7U3RyaW5nKHQpfWAuc2xpY2UoLTIpLG8mJm8uZ2V0TWludXRlcygpPT09dCYmKGUuc2VsZWN0ZWQ9ITApLGEuYXBwZW5kQ2hpbGQoZSl9aWYoZS5hcHBlbmRDaGlsZChhKSx0aGlzLm9wdGlvbnMuc2Vjb25kcyl7Y29uc3QgaT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO2kuY2xhc3NOYW1lPVwidGltZS1wbHVnaW4tY3VzdG9tLWlucHV0IHVuaXRcIixpLm5hbWU9YCR7dH1bc3NdYDtjb25zdCBuPTYwO2ZvcihsZXQgdD0wO3Q8bjt0Kz10aGlzLm9wdGlvbnMuc3RlcFNlY29uZHMpe2NvbnN0IGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtlLnZhbHVlPWAwJHtTdHJpbmcodCl9YC5zbGljZSgtMiksZS50ZXh0PWAwJHtTdHJpbmcodCl9YC5zbGljZSgtMiksbyYmby5nZXRTZWNvbmRzKCk9PT10JiYoZS5zZWxlY3RlZD0hMCksaS5hcHBlbmRDaGlsZChlKX1lLmFwcGVuZENoaWxkKGkpfWlmKHRoaXMub3B0aW9ucy5mb3JtYXQxMil7Y29uc3QgaT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO2kuY2xhc3NOYW1lPVwidGltZS1wbHVnaW4tY3VzdG9tLWlucHV0IHVuaXRcIixpLm5hbWU9YCR7dH1bcGVyaW9kXWAsW1wiQU1cIixcIlBNXCJdLmZvckVhY2goKHQ9Pntjb25zdCBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7ZS52YWx1ZT10LGUudGV4dD10LG8mJlwiUE1cIj09PXQmJm8uZ2V0SG91cnMoKT49MTImJihlLnNlbGVjdGVkPSEwKSxpLmFwcGVuZENoaWxkKGUpfSkpLGUuYXBwZW5kQ2hpbGQoaSl9cmV0dXJuIGV9aGFuZGxlRm9ybWF0MTIodCxlLGkpe2NvbnN0IG49ZS5jbG9uZSgpO3N3aXRjaCh0KXtjYXNlXCJBTVwiOjEyPT09aT9uLnNldEhvdXJzKDAsbi5nZXRNaW51dGVzKCksbi5nZXRTZWNvbmRzKCksMCk6bi5zZXRIb3VycyhpLG4uZ2V0TWludXRlcygpLG4uZ2V0U2Vjb25kcygpLDApO2JyZWFrO2Nhc2VcIlBNXCI6MTIhPT1pP24uc2V0SG91cnMoaSsxMixuLmdldE1pbnV0ZXMoKSxuLmdldFNlY29uZHMoKSwwKTpuLnNldEhvdXJzKGksbi5nZXRNaW51dGVzKCksbi5nZXRTZWNvbmRzKCksMCl9cmV0dXJuIG59cGFyc2VWYWx1ZXMoKXtpZih0aGlzLnJhbmdlUGx1Z2luKXtpZih0aGlzLnJhbmdlUGx1Z2luLm9wdGlvbnMuc3RyaWN0KXtpZih0aGlzLnJhbmdlUGx1Z2luLm9wdGlvbnMuc3RhcnREYXRlJiZ0aGlzLnJhbmdlUGx1Z2luLm9wdGlvbnMuZW5kRGF0ZSl7Y29uc3QgZT1uZXcgdCh0aGlzLnJhbmdlUGx1Z2luLm9wdGlvbnMuc3RhcnREYXRlLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0KSxpPW5ldyB0KHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5lbmREYXRlLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0KTt0aGlzLnRpbWVQaWNrZWQuc3RhcnQ9ZS5jbG9uZSgpLHRoaXMudGltZVBpY2tlZC5lbmQ9aS5jbG9uZSgpfX1lbHNle2lmKHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5zdGFydERhdGUpe2NvbnN0IGU9bmV3IHQodGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLnN0YXJ0RGF0ZSx0aGlzLnBpY2tlci5vcHRpb25zLmZvcm1hdCk7dGhpcy50aW1lUGlja2VkLnN0YXJ0PWUuY2xvbmUoKX1pZih0aGlzLnJhbmdlUGx1Z2luLm9wdGlvbnMuZW5kRGF0ZSl7Y29uc3QgZT1uZXcgdCh0aGlzLnJhbmdlUGx1Z2luLm9wdGlvbnMuZW5kRGF0ZSx0aGlzLnBpY2tlci5vcHRpb25zLmZvcm1hdCk7dGhpcy50aW1lUGlja2VkLmVuZD1lLmNsb25lKCl9fWlmKHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5lbGVtZW50RW5kKWlmKHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5zdHJpY3Qpe2lmKHRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQmJnRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudC52YWx1ZS5sZW5ndGgmJnRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5lbGVtZW50RW5kIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCYmdGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLmVsZW1lbnRFbmQudmFsdWUubGVuZ3RoKXtjb25zdCBlPW5ldyB0KHRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudC52YWx1ZSx0aGlzLnBpY2tlci5vcHRpb25zLmZvcm1hdCksaT1uZXcgdCh0aGlzLnJhbmdlUGx1Z2luLm9wdGlvbnMuZWxlbWVudEVuZC52YWx1ZSx0aGlzLnBpY2tlci5vcHRpb25zLmZvcm1hdCk7dGhpcy50aW1lUGlja2VkLnN0YXJ0PWUuY2xvbmUoKSx0aGlzLnRpbWVQaWNrZWQuZW5kPWkuY2xvbmUoKX19ZWxzZXtpZih0aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50JiZ0aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQudmFsdWUubGVuZ3RoKXtjb25zdCBlPW5ldyB0KHRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudC52YWx1ZSx0aGlzLnBpY2tlci5vcHRpb25zLmZvcm1hdCk7dGhpcy50aW1lUGlja2VkLnN0YXJ0PWUuY2xvbmUoKX1pZih0aGlzLnJhbmdlUGx1Z2luLm9wdGlvbnMuZWxlbWVudEVuZCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQmJnRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5lbGVtZW50RW5kLnZhbHVlLmxlbmd0aCl7Y29uc3QgZT1uZXcgdCh0aGlzLnJhbmdlUGx1Z2luLm9wdGlvbnMuZWxlbWVudEVuZC52YWx1ZSx0aGlzLnBpY2tlci5vcHRpb25zLmZvcm1hdCk7dGhpcy50aW1lUGlja2VkLnN0YXJ0PWUuY2xvbmUoKX19ZWxzZSBpZih0aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50JiZ0aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQudmFsdWUubGVuZ3RoKXtjb25zdFtlLGldPXRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudC52YWx1ZS5zcGxpdCh0aGlzLnJhbmdlUGx1Z2luLm9wdGlvbnMuZGVsaW1pdGVyKTtpZih0aGlzLnJhbmdlUGx1Z2luLm9wdGlvbnMuc3RyaWN0KXtpZihlJiZpKXtjb25zdCBuPW5ldyB0KGUsdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQpLHM9bmV3IHQoaSx0aGlzLnBpY2tlci5vcHRpb25zLmZvcm1hdCk7dGhpcy50aW1lUGlja2VkLnN0YXJ0PW4uY2xvbmUoKSx0aGlzLnRpbWVQaWNrZWQuZW5kPXMuY2xvbmUoKX19ZWxzZXtpZihlKXtjb25zdCBpPW5ldyB0KGUsdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQpO3RoaXMudGltZVBpY2tlZC5zdGFydD1pLmNsb25lKCl9aWYoaSl7Y29uc3QgZT1uZXcgdChpLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0KTt0aGlzLnRpbWVQaWNrZWQuc3RhcnQ9ZS5jbG9uZSgpfX19fWVsc2V7aWYodGhpcy5waWNrZXIub3B0aW9ucy5kYXRlKXtjb25zdCBlPW5ldyB0KHRoaXMucGlja2VyLm9wdGlvbnMuZGF0ZSx0aGlzLnBpY2tlci5vcHRpb25zLmZvcm1hdCk7dGhpcy50aW1lUGlja2VkLmlucHV0PWUuY2xvbmUoKX1pZih0aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50JiZ0aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQudmFsdWUubGVuZ3RoKXtjb25zdCBlPW5ldyB0KHRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudC52YWx1ZSx0aGlzLnBpY2tlci5vcHRpb25zLmZvcm1hdCk7dGhpcy50aW1lUGlja2VkLmlucHV0PWUuY2xvbmUoKX19fX1jbGFzcyBoIGV4dGVuZHMgb3tkb2NFbGVtZW50PW51bGw7cmFuZ2VQbHVnaW47YmluZHM9e29uVmlldzp0aGlzLm9uVmlldy5iaW5kKHRoaXMpLG9uS2V5ZG93bjp0aGlzLm9uS2V5ZG93bi5iaW5kKHRoaXMpfTtvcHRpb25zPXt1bml0SW5kZXg6MSxkYXlJbmRleDoyfTtnZXROYW1lKCl7cmV0dXJuXCJLYmRQbHVnaW5cIn1vbkF0dGFjaCgpe2NvbnN0IHQ9dGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50LGU9dC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtpZih0aGlzLmRvY0VsZW1lbnQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIiksdGhpcy5kb2NFbGVtZW50LnN0eWxlLnBvc2l0aW9uPVwiYWJzb2x1dGVcIix0aGlzLmRvY0VsZW1lbnQuc3R5bGUudG9wPWAke3Qub2Zmc2V0VG9wfXB4YCx0aGlzLmRvY0VsZW1lbnQuc3R5bGUubGVmdD10Lm9mZnNldExlZnQrZS53aWR0aC0yNStcInB4XCIsdGhpcy5kb2NFbGVtZW50LmF0dGFjaFNoYWRvdyh7bW9kZTpcIm9wZW5cIn0pLHRoaXMub3B0aW9ucy5odG1sKXRoaXMuZG9jRWxlbWVudC5zaGFkb3dSb290LmlubmVySFRNTD10aGlzLm9wdGlvbnMuaHRtbDtlbHNle2NvbnN0IHQ9YFxcbiAgICAgIDxzdHlsZT5cXG4gICAgICBidXR0b24ge1xcbiAgICAgICAgYm9yZGVyOiBub25lO1xcbiAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICAgICAgICBmb250LXNpemU6ICR7d2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50KS5mb250U2l6ZX07XFxuICAgICAgfVxcbiAgICAgIDwvc3R5bGU+XFxuXFxuICAgICAgPGJ1dHRvbj4mIzEyODE5Nzs8L2J1dHRvbj5cXG4gICAgICBgO3RoaXMuZG9jRWxlbWVudC5zaGFkb3dSb290LmlubmVySFRNTD10fWNvbnN0IGk9dGhpcy5kb2NFbGVtZW50LnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcImJ1dHRvblwiKTtpJiYoaS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwodD0+e3QucHJldmVudERlZmF1bHQoKSx0aGlzLnBpY2tlci5zaG93KHt0YXJnZXQ6dGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50fSl9KSx7Y2FwdHVyZTohMH0pLGkuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwodD0+e1wiRXNjYXBlXCI9PT10LmNvZGUmJnRoaXMucGlja2VyLmhpZGUoKX0pLHtjYXB0dXJlOiEwfSkpLHRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudC5hZnRlcih0aGlzLmRvY0VsZW1lbnQpLHRoaXMucGlja2VyLm9uKFwidmlld1wiLHRoaXMuYmluZHMub25WaWV3KSx0aGlzLnBpY2tlci5vbihcImtleWRvd25cIix0aGlzLmJpbmRzLm9uS2V5ZG93bil9b25EZXRhY2goKXt0aGlzLmRvY0VsZW1lbnQmJnRoaXMuZG9jRWxlbWVudC5pc0Nvbm5lY3RlZCYmdGhpcy5kb2NFbGVtZW50LnJlbW92ZSgpLHRoaXMucGlja2VyLm9mZihcInZpZXdcIix0aGlzLmJpbmRzLm9uVmlldyksdGhpcy5waWNrZXIub2ZmKFwia2V5ZG93blwiLHRoaXMuYmluZHMub25LZXlkb3duKX1vblZpZXcodCl7Y29uc3R7dmlldzplLHRhcmdldDppfT10LmRldGFpbDtpJiZcInF1ZXJ5U2VsZWN0b3JcImluIGkmJihcIkNhbGVuZGFyRGF5XCIhPT1lfHxbXCJsb2NrZWRcIixcIm5vdC1hdmFpbGFibGVcIl0uc29tZSgodD0+aS5jbGFzc0xpc3QuY29udGFpbnModCkpKT9bLi4uaS5xdWVyeVNlbGVjdG9yQWxsKFwiLnVuaXQ6bm90KC5kYXkpXCIpXS5mb3JFYWNoKCh0PT50LnRhYkluZGV4PXRoaXMub3B0aW9ucy51bml0SW5kZXgpKTppLnRhYkluZGV4PXRoaXMub3B0aW9ucy5kYXlJbmRleCl9b25LZXlkb3duKHQpe3N3aXRjaCh0aGlzLm9uTW91c2VFbnRlcih0KSx0LmNvZGUpe2Nhc2VcIkFycm93VXBcIjpjYXNlXCJBcnJvd0Rvd25cIjp0aGlzLnZlcnRpY2FsTW92ZSh0KTticmVhaztjYXNlXCJBcnJvd0xlZnRcIjpjYXNlXCJBcnJvd1JpZ2h0XCI6dGhpcy5ob3Jpem9udGFsTW92ZSh0KTticmVhaztjYXNlXCJFbnRlclwiOmNhc2VcIlNwYWNlXCI6dGhpcy5oYW5kbGVFbnRlcih0KTticmVhaztjYXNlXCJFc2NhcGVcIjp0aGlzLnBpY2tlci5oaWRlKCl9fWZpbmRBbGxvd2FibGVEYXlTaWJsaW5nKHQsZSxpKXtjb25zdCBuPUFycmF5LmZyb20odC5xdWVyeVNlbGVjdG9yQWxsKGAuZGF5W3RhYmluZGV4PVwiJHt0aGlzLm9wdGlvbnMuZGF5SW5kZXh9XCJdYCkpLHM9bi5pbmRleE9mKGUpO3JldHVybiBuLmZpbHRlcigoKHQsZSk9PmkoZSxzKSYmdC50YWJJbmRleD09PXRoaXMub3B0aW9ucy5kYXlJbmRleCkpWzBdfWNoYW5nZU1vbnRoKHQpe2NvbnN0IGU9e0Fycm93TGVmdDpcInByZXZpb3VzXCIsQXJyb3dSaWdodDpcIm5leHRcIn0saT10aGlzLnBpY2tlci51aS5jb250YWluZXIucXVlcnlTZWxlY3RvcihgLiR7ZVt0LmNvZGVdfS1idXR0b25bdGFiaW5kZXg9XCIke3RoaXMub3B0aW9ucy51bml0SW5kZXh9XCJdYCk7aSYmIWkucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoYG5vLSR7ZVt0LmNvZGVdfS1tb250aGApJiYoaS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImNsaWNrXCIse2J1YmJsZXM6ITB9KSksc2V0VGltZW91dCgoKCk9PntsZXQgZT1udWxsO3N3aXRjaCh0LmNvZGUpe2Nhc2VcIkFycm93TGVmdFwiOmNvbnN0IHQ9dGhpcy5waWNrZXIudWkuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoYC5kYXlbdGFiaW5kZXg9XCIke3RoaXMub3B0aW9ucy5kYXlJbmRleH1cIl1gKTtlPXRbdC5sZW5ndGgtMV07YnJlYWs7Y2FzZVwiQXJyb3dSaWdodFwiOmU9dGhpcy5waWNrZXIudWkuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoYC5kYXlbdGFiaW5kZXg9XCIke3RoaXMub3B0aW9ucy5kYXlJbmRleH1cIl1gKX1lJiZlLmZvY3VzKCl9KSkpfXZlcnRpY2FsTW92ZSh0KXtjb25zdCBlPXQudGFyZ2V0O2lmKGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGF5XCIpKXt0LnByZXZlbnREZWZhdWx0KCk7Y29uc3QgaT10aGlzLmZpbmRBbGxvd2FibGVEYXlTaWJsaW5nKHRoaXMucGlja2VyLnVpLmNvbnRhaW5lcixlLCgoZSxpKT0+ZT09PShcIkFycm93VXBcIj09PXQuY29kZT9pLTc6aSs3KSkpO2kmJmkuZm9jdXMoKX19aG9yaXpvbnRhbE1vdmUodCl7Y29uc3QgZT10LnRhcmdldDtpZihlLmNsYXNzTGlzdC5jb250YWlucyhcImRheVwiKSl7dC5wcmV2ZW50RGVmYXVsdCgpO2NvbnN0IGk9dGhpcy5maW5kQWxsb3dhYmxlRGF5U2libGluZyh0aGlzLnBpY2tlci51aS5jb250YWluZXIsZSwoKGUsaSk9PmU9PT0oXCJBcnJvd0xlZnRcIj09PXQuY29kZT9pLTE6aSsxKSkpO2k/aS5mb2N1cygpOnRoaXMuY2hhbmdlTW9udGgodCl9fWhhbmRsZUVudGVyKHQpe2NvbnN0IGU9dC50YXJnZXQ7ZS5jbGFzc0xpc3QuY29udGFpbnMoXCJkYXlcIikmJih0LnByZXZlbnREZWZhdWx0KCksZS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImNsaWNrXCIse2J1YmJsZXM6ITB9KSksc2V0VGltZW91dCgoKCk9PntpZih0aGlzLnJhbmdlUGx1Z2luPXRoaXMucGlja2VyLlBsdWdpbk1hbmFnZXIuZ2V0SW5zdGFuY2UoXCJSYW5nZVBsdWdpblwiKSx0aGlzLnJhbmdlUGx1Z2lufHwhdGhpcy5waWNrZXIub3B0aW9ucy5hdXRvQXBwbHkpe2NvbnN0IHQ9dGhpcy5waWNrZXIudWkuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuZGF5LnNlbGVjdGVkXCIpO3QmJnNldFRpbWVvdXQoKCgpPT57dC5mb2N1cygpfSkpfX0pKSl9b25Nb3VzZUVudGVyKHQpe3QudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImRheVwiKSYmc2V0VGltZW91dCgoKCk9Pntjb25zdCB0PXRoaXMucGlja2VyLnVpLnNoYWRvd1Jvb3QuYWN0aXZlRWxlbWVudDt0JiZ0LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwibW91c2VlbnRlclwiLHtidWJibGVzOiEwfSkpfSkpfX1jbGFzcyBkIGV4dGVuZHMgb3tyYW5nZVBsdWdpbjtsb2NrUGx1Z2luO3ByaW9yaXR5PTEwO2JpbmRzPXtvblZpZXc6dGhpcy5vblZpZXcuYmluZCh0aGlzKSxvbkNvbG9yU2NoZW1lOnRoaXMub25Db2xvclNjaGVtZS5iaW5kKHRoaXMpfTtvcHRpb25zPXtkcm9wZG93bjp7bW9udGhzOiExLHllYXJzOiExLG1pblllYXI6MTk1MCxtYXhZZWFyOm51bGx9LGRhcmtNb2RlOiEwLGxvY2FsZTp7cmVzZXRCdXR0b246JzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGhlaWdodD1cIjI0XCIgd2lkdGg9XCIyNFwiPjxwYXRoIGQ9XCJNMTMgM2MtNC45NyAwLTkgNC4wMy05IDlIMWwzLjg5IDMuODkuMDcuMTRMOSAxMkg2YzAtMy44NyAzLjEzLTcgNy03czcgMy4xMyA3IDctMy4xMyA3LTcgN2MtMS45MyAwLTMuNjgtLjc5LTQuOTQtMi4wNmwtMS40MiAxLjQyQzguMjcgMTkuOTkgMTAuNTEgMjEgMTMgMjFjNC45NyAwIDktNC4wMyA5LTlzLTQuMDMtOS05LTl6bS0xIDV2NWw0LjI4IDIuNTQuNzItMS4yMS0zLjUtMi4wOFY4SDEyelwiLz48L3N2Zz4nfX07bWF0Y2hNZWRpYTtnZXROYW1lKCl7cmV0dXJuXCJBbXBQbHVnaW5cIn1vbkF0dGFjaCgpe3RoaXMub3B0aW9ucy5kYXJrTW9kZSYmd2luZG93JiZcIm1hdGNoTWVkaWFcImluIHdpbmRvdyYmKHRoaXMubWF0Y2hNZWRpYT13aW5kb3cubWF0Y2hNZWRpYShcIihwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaylcIiksdGhpcy5tYXRjaE1lZGlhLm1hdGNoZXMmJih0aGlzLnBpY2tlci51aS5jb250YWluZXIuZGF0YXNldC50aGVtZT1cImRhcmtcIiksdGhpcy5tYXRjaE1lZGlhLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIix0aGlzLmJpbmRzLm9uQ29sb3JTY2hlbWUpKSx0aGlzLm9wdGlvbnMud2Vla051bWJlcnMmJnRoaXMucGlja2VyLnVpLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwid2Vlay1udW1iZXJzXCIpLHRoaXMucGlja2VyLm9uKFwidmlld1wiLHRoaXMuYmluZHMub25WaWV3KX1vbkRldGFjaCgpe3RoaXMub3B0aW9ucy5kYXJrTW9kZSYmd2luZG93JiZcIm1hdGNoTWVkaWFcImluIHdpbmRvdyYmdGhpcy5tYXRjaE1lZGlhLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIix0aGlzLmJpbmRzLm9uQ29sb3JTY2hlbWUpLHRoaXMucGlja2VyLnVpLmNvbnRhaW5lci5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLXRoZW1lXCIpLHRoaXMucGlja2VyLnVpLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwid2Vlay1udW1iZXJzXCIpLHRoaXMucGlja2VyLm9mZihcInZpZXdcIix0aGlzLmJpbmRzLm9uVmlldyl9b25WaWV3KHQpe3RoaXMubG9ja1BsdWdpbj10aGlzLnBpY2tlci5QbHVnaW5NYW5hZ2VyLmdldEluc3RhbmNlKFwiTG9ja1BsdWdpblwiKSx0aGlzLnJhbmdlUGx1Z2luPXRoaXMucGlja2VyLlBsdWdpbk1hbmFnZXIuZ2V0SW5zdGFuY2UoXCJSYW5nZVBsdWdpblwiKSx0aGlzLmhhbmRsZURyb3Bkb3duKHQpLHRoaXMuaGFuZGxlUmVzZXRCdXR0b24odCksdGhpcy5oYW5kbGVXZWVrTnVtYmVycyh0KX1vbkNvbG9yU2NoZW1lKHQpe2NvbnN0IGU9dC5tYXRjaGVzP1wiZGFya1wiOlwibGlnaHRcIjt0aGlzLnBpY2tlci51aS5jb250YWluZXIuZGF0YXNldC50aGVtZT1lfWhhbmRsZURyb3Bkb3duKGUpe2NvbnN0e3ZpZXc6aSx0YXJnZXQ6bixkYXRlOnMsaW5kZXg6b309ZS5kZXRhaWw7aWYoXCJDYWxlbmRhckhlYWRlclwiPT09aSl7Y29uc3QgZT1uLnF1ZXJ5U2VsZWN0b3IoXCIubW9udGgtbmFtZVwiKTtpZih0aGlzLm9wdGlvbnMuZHJvcGRvd24ubW9udGhzKXtlLmNoaWxkTm9kZXNbMF0ucmVtb3ZlKCk7Y29uc3QgaT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO2kuY2xhc3NOYW1lPVwibW9udGgtbmFtZS0tc2VsZWN0IG1vbnRoLW5hbWUtLWRyb3Bkb3duXCI7Zm9yKGxldCBlPTA7ZTwxMjtlKz0xKXtjb25zdCBuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiksbz1uZXcgdChuZXcgRGF0ZShzLmdldEZ1bGxZZWFyKCksZSwyLDAsMCwwKSksYT1uZXcgdChuZXcgRGF0ZShzLmdldEZ1bGxZZWFyKCksZSwxLDAsMCwwKSk7bi52YWx1ZT1TdHJpbmcoZSksbi50ZXh0PW8udG9Mb2NhbGVTdHJpbmcodGhpcy5waWNrZXIub3B0aW9ucy5sYW5nLHttb250aDpcImxvbmdcIn0pLHRoaXMubG9ja1BsdWdpbiYmKG4uZGlzYWJsZWQ9dGhpcy5sb2NrUGx1Z2luLm9wdGlvbnMubWluRGF0ZSYmYS5pc0JlZm9yZShuZXcgdCh0aGlzLmxvY2tQbHVnaW4ub3B0aW9ucy5taW5EYXRlKSxcIm1vbnRoXCIpfHx0aGlzLmxvY2tQbHVnaW4ub3B0aW9ucy5tYXhEYXRlJiZhLmlzQWZ0ZXIobmV3IHQodGhpcy5sb2NrUGx1Z2luLm9wdGlvbnMubWF4RGF0ZSksXCJtb250aFwiKSksbi5zZWxlY3RlZD1hLmdldE1vbnRoKCk9PT1zLmdldE1vbnRoKCksaS5hcHBlbmRDaGlsZChuKX1pLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwodD0+e2NvbnN0IGU9dC50YXJnZXQ7dGhpcy5waWNrZXIuY2FsZW5kYXJzWzBdLnNldERhdGUoMSksdGhpcy5waWNrZXIuY2FsZW5kYXJzWzBdLnNldE1vbnRoKE51bWJlcihlLnZhbHVlKSksdGhpcy5waWNrZXIucmVuZGVyQWxsKCl9KSksZS5wcmVwZW5kKGkpfWlmKHRoaXMub3B0aW9ucy5kcm9wZG93bi55ZWFycyl7ZS5jaGlsZE5vZGVzWzFdLnJlbW92ZSgpO2NvbnN0IGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtpLmNsYXNzTmFtZT1cIm1vbnRoLW5hbWUtLXNlbGVjdFwiO2NvbnN0IG49dGhpcy5vcHRpb25zLmRyb3Bkb3duLm1pblllYXIsbz10aGlzLm9wdGlvbnMuZHJvcGRvd24ubWF4WWVhcj90aGlzLm9wdGlvbnMuZHJvcGRvd24ubWF4WWVhcjoobmV3IERhdGUpLmdldEZ1bGxZZWFyKCk7aWYocy5nZXRGdWxsWWVhcigpPm8pe2NvbnN0IHQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTt0LnZhbHVlPVN0cmluZyhzLmdldEZ1bGxZZWFyKCkpLHQudGV4dD1TdHJpbmcocy5nZXRGdWxsWWVhcigpKSx0LnNlbGVjdGVkPSEwLHQuZGlzYWJsZWQ9ITAsaS5hcHBlbmRDaGlsZCh0KX1mb3IobGV0IGU9bztlPj1uO2UtPTEpe2NvbnN0IG49ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKSxvPW5ldyB0KG5ldyBEYXRlKGUsMCwxLDAsMCwwKSk7bi52YWx1ZT1TdHJpbmcoZSksbi50ZXh0PVN0cmluZyhlKSx0aGlzLmxvY2tQbHVnaW4mJihuLmRpc2FibGVkPXRoaXMubG9ja1BsdWdpbi5vcHRpb25zLm1pbkRhdGUmJm8uaXNCZWZvcmUobmV3IHQodGhpcy5sb2NrUGx1Z2luLm9wdGlvbnMubWluRGF0ZSksXCJ5ZWFyXCIpfHx0aGlzLmxvY2tQbHVnaW4ub3B0aW9ucy5tYXhEYXRlJiZvLmlzQWZ0ZXIobmV3IHQodGhpcy5sb2NrUGx1Z2luLm9wdGlvbnMubWF4RGF0ZSksXCJ5ZWFyXCIpKSxuLnNlbGVjdGVkPXMuZ2V0RnVsbFllYXIoKT09PWUsaS5hcHBlbmRDaGlsZChuKX1pZihzLmdldEZ1bGxZZWFyKCk8bil7Y29uc3QgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO3QudmFsdWU9U3RyaW5nKHMuZ2V0RnVsbFllYXIoKSksdC50ZXh0PVN0cmluZyhzLmdldEZ1bGxZZWFyKCkpLHQuc2VsZWN0ZWQ9ITAsdC5kaXNhYmxlZD0hMCxpLmFwcGVuZENoaWxkKHQpfWlmKFwiYXNjXCI9PT10aGlzLm9wdGlvbnMuZHJvcGRvd24ueWVhcnMpe2NvbnN0IHQ9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoaS5jaGlsZE5vZGVzKS5yZXZlcnNlKCk7aS5pbm5lckhUTUw9XCJcIix0LmZvckVhY2goKHQ9Pnt0LmlubmVySFRNTD10LnZhbHVlLGkuYXBwZW5kQ2hpbGQodCl9KSl9aS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsKHQ9Pntjb25zdCBlPXQudGFyZ2V0O3RoaXMucGlja2VyLmNhbGVuZGFyc1swXS5zZXRGdWxsWWVhcihOdW1iZXIoZS52YWx1ZSkpLHRoaXMucGlja2VyLnJlbmRlckFsbCgpfSkpLGUuYXBwZW5kQ2hpbGQoaSl9fX1oYW5kbGVSZXNldEJ1dHRvbih0KXtjb25zdHt2aWV3OmUsdGFyZ2V0Oml9PXQuZGV0YWlsO2lmKFwiQ2FsZW5kYXJIZWFkZXJcIj09PWUmJnRoaXMub3B0aW9ucy5yZXNldEJ1dHRvbil7Y29uc3QgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO3QuY2xhc3NOYW1lPVwicmVzZXQtYnV0dG9uIHVuaXRcIix0LmlubmVySFRNTD10aGlzLm9wdGlvbnMubG9jYWxlLnJlc2V0QnV0dG9uLHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsKHQ9Pnt0LnByZXZlbnREZWZhdWx0KCk7bGV0IGU9ITA7XCJmdW5jdGlvblwiPT10eXBlb2YgdGhpcy5vcHRpb25zLnJlc2V0QnV0dG9uJiYoZT10aGlzLm9wdGlvbnMucmVzZXRCdXR0b24uY2FsbCh0aGlzKSksZSYmdGhpcy5waWNrZXIuY2xlYXIoKX0pKSxpLmFwcGVuZENoaWxkKHQpfX1oYW5kbGVXZWVrTnVtYmVycyhlKXtpZih0aGlzLm9wdGlvbnMud2Vla051bWJlcnMpe2NvbnN0e3ZpZXc6aSx0YXJnZXQ6bn09ZS5kZXRhaWw7aWYoXCJDYWxlbmRhckRheU5hbWVzXCI9PT1pKXtjb25zdCB0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7dC5jbGFzc05hbWU9XCJ3bnVtLWhlYWRlclwiLHQuaW5uZXJIVE1MPVwiV2tcIixuLnByZXBlbmQodCl9XCJDYWxlbmRhckRheXNcIj09PWkmJlsuLi5uLmNoaWxkcmVuXS5mb3JFYWNoKCgoZSxpKT0+e2lmKDA9PT1pfHxpJTc9PTApe2xldCBpO2lmKGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGF5XCIpKWk9bmV3IHQoZS5kYXRhc2V0LnRpbWUpO2Vsc2V7Y29uc3QgZT1uLnF1ZXJ5U2VsZWN0b3IoXCIuZGF5XCIpO2k9bmV3IHQoZS5kYXRhc2V0LnRpbWUpfWxldCBzPWkuZ2V0V2Vlayh0aGlzLnBpY2tlci5vcHRpb25zLmZpcnN0RGF5KTs1Mz09PXMmJjA9PT1pLmdldE1vbnRoKCkmJihzPVwiNTMvMVwiKTtjb25zdCBvPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7by5jbGFzc05hbWU9XCJ3bnVtLWl0ZW1cIixvLmlubmVySFRNTD1TdHJpbmcocyksbi5pbnNlcnRCZWZvcmUobyxlKX19KSl9fX1leHBvcnR7ZCBhcyBBbXBQbHVnaW4sdCBhcyBEYXRlVGltZSxoIGFzIEtiZFBsdWdpbixhIGFzIExvY2tQbHVnaW4sciBhcyBQcmVzZXRQbHVnaW4sYyBhcyBSYW5nZVBsdWdpbixsIGFzIFRpbWVQbHVnaW4sbiBhcyBjcmVhdGUscyBhcyBlYXNlcGlja307XG4iLCJpbXBvcnQgZ2V0Q29tcG9zaXRlUmVjdCBmcm9tIFwiLi9kb20tdXRpbHMvZ2V0Q29tcG9zaXRlUmVjdC5qc1wiO1xuaW1wb3J0IGdldExheW91dFJlY3QgZnJvbSBcIi4vZG9tLXV0aWxzL2dldExheW91dFJlY3QuanNcIjtcbmltcG9ydCBsaXN0U2Nyb2xsUGFyZW50cyBmcm9tIFwiLi9kb20tdXRpbHMvbGlzdFNjcm9sbFBhcmVudHMuanNcIjtcbmltcG9ydCBnZXRPZmZzZXRQYXJlbnQgZnJvbSBcIi4vZG9tLXV0aWxzL2dldE9mZnNldFBhcmVudC5qc1wiO1xuaW1wb3J0IGdldENvbXB1dGVkU3R5bGUgZnJvbSBcIi4vZG9tLXV0aWxzL2dldENvbXB1dGVkU3R5bGUuanNcIjtcbmltcG9ydCBvcmRlck1vZGlmaWVycyBmcm9tIFwiLi91dGlscy9vcmRlck1vZGlmaWVycy5qc1wiO1xuaW1wb3J0IGRlYm91bmNlIGZyb20gXCIuL3V0aWxzL2RlYm91bmNlLmpzXCI7XG5pbXBvcnQgdmFsaWRhdGVNb2RpZmllcnMgZnJvbSBcIi4vdXRpbHMvdmFsaWRhdGVNb2RpZmllcnMuanNcIjtcbmltcG9ydCB1bmlxdWVCeSBmcm9tIFwiLi91dGlscy91bmlxdWVCeS5qc1wiO1xuaW1wb3J0IGdldEJhc2VQbGFjZW1lbnQgZnJvbSBcIi4vdXRpbHMvZ2V0QmFzZVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IG1lcmdlQnlOYW1lIGZyb20gXCIuL3V0aWxzL21lcmdlQnlOYW1lLmpzXCI7XG5pbXBvcnQgZGV0ZWN0T3ZlcmZsb3cgZnJvbSBcIi4vdXRpbHMvZGV0ZWN0T3ZlcmZsb3cuanNcIjtcbmltcG9ydCB7IGlzRWxlbWVudCB9IGZyb20gXCIuL2RvbS11dGlscy9pbnN0YW5jZU9mLmpzXCI7XG5pbXBvcnQgeyBhdXRvIH0gZnJvbSBcIi4vZW51bXMuanNcIjtcbnZhciBJTlZBTElEX0VMRU1FTlRfRVJST1IgPSAnUG9wcGVyOiBJbnZhbGlkIHJlZmVyZW5jZSBvciBwb3BwZXIgYXJndW1lbnQgcHJvdmlkZWQuIFRoZXkgbXVzdCBiZSBlaXRoZXIgYSBET00gZWxlbWVudCBvciB2aXJ0dWFsIGVsZW1lbnQuJztcbnZhciBJTkZJTklURV9MT09QX0VSUk9SID0gJ1BvcHBlcjogQW4gaW5maW5pdGUgbG9vcCBpbiB0aGUgbW9kaWZpZXJzIGN5Y2xlIGhhcyBiZWVuIGRldGVjdGVkISBUaGUgY3ljbGUgaGFzIGJlZW4gaW50ZXJydXB0ZWQgdG8gcHJldmVudCBhIGJyb3dzZXIgY3Jhc2guJztcbnZhciBERUZBVUxUX09QVElPTlMgPSB7XG4gIHBsYWNlbWVudDogJ2JvdHRvbScsXG4gIG1vZGlmaWVyczogW10sXG4gIHN0cmF0ZWd5OiAnYWJzb2x1dGUnXG59O1xuXG5mdW5jdGlvbiBhcmVWYWxpZEVsZW1lbnRzKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgcmV0dXJuICFhcmdzLnNvbWUoZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gIShlbGVtZW50ICYmIHR5cGVvZiBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCA9PT0gJ2Z1bmN0aW9uJyk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcG9wcGVyR2VuZXJhdG9yKGdlbmVyYXRvck9wdGlvbnMpIHtcbiAgaWYgKGdlbmVyYXRvck9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgIGdlbmVyYXRvck9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIHZhciBfZ2VuZXJhdG9yT3B0aW9ucyA9IGdlbmVyYXRvck9wdGlvbnMsXG4gICAgICBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYgPSBfZ2VuZXJhdG9yT3B0aW9ucy5kZWZhdWx0TW9kaWZpZXJzLFxuICAgICAgZGVmYXVsdE1vZGlmaWVycyA9IF9nZW5lcmF0b3JPcHRpb25zJGRlZiA9PT0gdm9pZCAwID8gW10gOiBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYsXG4gICAgICBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYyID0gX2dlbmVyYXRvck9wdGlvbnMuZGVmYXVsdE9wdGlvbnMsXG4gICAgICBkZWZhdWx0T3B0aW9ucyA9IF9nZW5lcmF0b3JPcHRpb25zJGRlZjIgPT09IHZvaWQgMCA/IERFRkFVTFRfT1BUSU9OUyA6IF9nZW5lcmF0b3JPcHRpb25zJGRlZjI7XG4gIHJldHVybiBmdW5jdGlvbiBjcmVhdGVQb3BwZXIocmVmZXJlbmNlLCBwb3BwZXIsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgICBvcHRpb25zID0gZGVmYXVsdE9wdGlvbnM7XG4gICAgfVxuXG4gICAgdmFyIHN0YXRlID0ge1xuICAgICAgcGxhY2VtZW50OiAnYm90dG9tJyxcbiAgICAgIG9yZGVyZWRNb2RpZmllcnM6IFtdLFxuICAgICAgb3B0aW9uczogT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9PUFRJT05TLCBkZWZhdWx0T3B0aW9ucyksXG4gICAgICBtb2RpZmllcnNEYXRhOiB7fSxcbiAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgIHJlZmVyZW5jZTogcmVmZXJlbmNlLFxuICAgICAgICBwb3BwZXI6IHBvcHBlclxuICAgICAgfSxcbiAgICAgIGF0dHJpYnV0ZXM6IHt9LFxuICAgICAgc3R5bGVzOiB7fVxuICAgIH07XG4gICAgdmFyIGVmZmVjdENsZWFudXBGbnMgPSBbXTtcbiAgICB2YXIgaXNEZXN0cm95ZWQgPSBmYWxzZTtcbiAgICB2YXIgaW5zdGFuY2UgPSB7XG4gICAgICBzdGF0ZTogc3RhdGUsXG4gICAgICBzZXRPcHRpb25zOiBmdW5jdGlvbiBzZXRPcHRpb25zKHNldE9wdGlvbnNBY3Rpb24pIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygc2V0T3B0aW9uc0FjdGlvbiA9PT0gJ2Z1bmN0aW9uJyA/IHNldE9wdGlvbnNBY3Rpb24oc3RhdGUub3B0aW9ucykgOiBzZXRPcHRpb25zQWN0aW9uO1xuICAgICAgICBjbGVhbnVwTW9kaWZpZXJFZmZlY3RzKCk7XG4gICAgICAgIHN0YXRlLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucywgc3RhdGUub3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgIHN0YXRlLnNjcm9sbFBhcmVudHMgPSB7XG4gICAgICAgICAgcmVmZXJlbmNlOiBpc0VsZW1lbnQocmVmZXJlbmNlKSA/IGxpc3RTY3JvbGxQYXJlbnRzKHJlZmVyZW5jZSkgOiByZWZlcmVuY2UuY29udGV4dEVsZW1lbnQgPyBsaXN0U2Nyb2xsUGFyZW50cyhyZWZlcmVuY2UuY29udGV4dEVsZW1lbnQpIDogW10sXG4gICAgICAgICAgcG9wcGVyOiBsaXN0U2Nyb2xsUGFyZW50cyhwb3BwZXIpXG4gICAgICAgIH07IC8vIE9yZGVycyB0aGUgbW9kaWZpZXJzIGJhc2VkIG9uIHRoZWlyIGRlcGVuZGVuY2llcyBhbmQgYHBoYXNlYFxuICAgICAgICAvLyBwcm9wZXJ0aWVzXG5cbiAgICAgICAgdmFyIG9yZGVyZWRNb2RpZmllcnMgPSBvcmRlck1vZGlmaWVycyhtZXJnZUJ5TmFtZShbXS5jb25jYXQoZGVmYXVsdE1vZGlmaWVycywgc3RhdGUub3B0aW9ucy5tb2RpZmllcnMpKSk7IC8vIFN0cmlwIG91dCBkaXNhYmxlZCBtb2RpZmllcnNcblxuICAgICAgICBzdGF0ZS5vcmRlcmVkTW9kaWZpZXJzID0gb3JkZXJlZE1vZGlmaWVycy5maWx0ZXIoZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgICByZXR1cm4gbS5lbmFibGVkO1xuICAgICAgICB9KTsgLy8gVmFsaWRhdGUgdGhlIHByb3ZpZGVkIG1vZGlmaWVycyBzbyB0aGF0IHRoZSBjb25zdW1lciB3aWxsIGdldCB3YXJuZWRcbiAgICAgICAgLy8gaWYgb25lIG9mIHRoZSBtb2RpZmllcnMgaXMgaW52YWxpZCBmb3IgYW55IHJlYXNvblxuXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgICB2YXIgbW9kaWZpZXJzID0gdW5pcXVlQnkoW10uY29uY2F0KG9yZGVyZWRNb2RpZmllcnMsIHN0YXRlLm9wdGlvbnMubW9kaWZpZXJzKSwgZnVuY3Rpb24gKF9yZWYpIHtcbiAgICAgICAgICAgIHZhciBuYW1lID0gX3JlZi5uYW1lO1xuICAgICAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsaWRhdGVNb2RpZmllcnMobW9kaWZpZXJzKTtcblxuICAgICAgICAgIGlmIChnZXRCYXNlUGxhY2VtZW50KHN0YXRlLm9wdGlvbnMucGxhY2VtZW50KSA9PT0gYXV0bykge1xuICAgICAgICAgICAgdmFyIGZsaXBNb2RpZmllciA9IHN0YXRlLm9yZGVyZWRNb2RpZmllcnMuZmluZChmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICAgICAgICAgICAgdmFyIG5hbWUgPSBfcmVmMi5uYW1lO1xuICAgICAgICAgICAgICByZXR1cm4gbmFtZSA9PT0gJ2ZsaXAnO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICghZmxpcE1vZGlmaWVyKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoWydQb3BwZXI6IFwiYXV0b1wiIHBsYWNlbWVudHMgcmVxdWlyZSB0aGUgXCJmbGlwXCIgbW9kaWZpZXIgYmUnLCAncHJlc2VudCBhbmQgZW5hYmxlZCB0byB3b3JrLiddLmpvaW4oJyAnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIF9nZXRDb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShwb3BwZXIpLFxuICAgICAgICAgICAgICBtYXJnaW5Ub3AgPSBfZ2V0Q29tcHV0ZWRTdHlsZS5tYXJnaW5Ub3AsXG4gICAgICAgICAgICAgIG1hcmdpblJpZ2h0ID0gX2dldENvbXB1dGVkU3R5bGUubWFyZ2luUmlnaHQsXG4gICAgICAgICAgICAgIG1hcmdpbkJvdHRvbSA9IF9nZXRDb21wdXRlZFN0eWxlLm1hcmdpbkJvdHRvbSxcbiAgICAgICAgICAgICAgbWFyZ2luTGVmdCA9IF9nZXRDb21wdXRlZFN0eWxlLm1hcmdpbkxlZnQ7IC8vIFdlIG5vIGxvbmdlciB0YWtlIGludG8gYWNjb3VudCBgbWFyZ2luc2Agb24gdGhlIHBvcHBlciwgYW5kIGl0IGNhblxuICAgICAgICAgIC8vIGNhdXNlIGJ1Z3Mgd2l0aCBwb3NpdGlvbmluZywgc28gd2UnbGwgd2FybiB0aGUgY29uc3VtZXJcblxuXG4gICAgICAgICAgaWYgKFttYXJnaW5Ub3AsIG1hcmdpblJpZ2h0LCBtYXJnaW5Cb3R0b20sIG1hcmdpbkxlZnRdLnNvbWUoZnVuY3Rpb24gKG1hcmdpbikge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQobWFyZ2luKTtcbiAgICAgICAgICB9KSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFsnUG9wcGVyOiBDU1MgXCJtYXJnaW5cIiBzdHlsZXMgY2Fubm90IGJlIHVzZWQgdG8gYXBwbHkgcGFkZGluZycsICdiZXR3ZWVuIHRoZSBwb3BwZXIgYW5kIGl0cyByZWZlcmVuY2UgZWxlbWVudCBvciBib3VuZGFyeS4nLCAnVG8gcmVwbGljYXRlIG1hcmdpbiwgdXNlIHRoZSBgb2Zmc2V0YCBtb2RpZmllciwgYXMgd2VsbCBhcycsICd0aGUgYHBhZGRpbmdgIG9wdGlvbiBpbiB0aGUgYHByZXZlbnRPdmVyZmxvd2AgYW5kIGBmbGlwYCcsICdtb2RpZmllcnMuJ10uam9pbignICcpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBydW5Nb2RpZmllckVmZmVjdHMoKTtcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlLnVwZGF0ZSgpO1xuICAgICAgfSxcbiAgICAgIC8vIFN5bmMgdXBkYXRlIOKAkyBpdCB3aWxsIGFsd2F5cyBiZSBleGVjdXRlZCwgZXZlbiBpZiBub3QgbmVjZXNzYXJ5LiBUaGlzXG4gICAgICAvLyBpcyB1c2VmdWwgZm9yIGxvdyBmcmVxdWVuY3kgdXBkYXRlcyB3aGVyZSBzeW5jIGJlaGF2aW9yIHNpbXBsaWZpZXMgdGhlXG4gICAgICAvLyBsb2dpYy5cbiAgICAgIC8vIEZvciBoaWdoIGZyZXF1ZW5jeSB1cGRhdGVzIChlLmcuIGByZXNpemVgIGFuZCBgc2Nyb2xsYCBldmVudHMpLCBhbHdheXNcbiAgICAgIC8vIHByZWZlciB0aGUgYXN5bmMgUG9wcGVyI3VwZGF0ZSBtZXRob2RcbiAgICAgIGZvcmNlVXBkYXRlOiBmdW5jdGlvbiBmb3JjZVVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKGlzRGVzdHJveWVkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIF9zdGF0ZSRlbGVtZW50cyA9IHN0YXRlLmVsZW1lbnRzLFxuICAgICAgICAgICAgcmVmZXJlbmNlID0gX3N0YXRlJGVsZW1lbnRzLnJlZmVyZW5jZSxcbiAgICAgICAgICAgIHBvcHBlciA9IF9zdGF0ZSRlbGVtZW50cy5wb3BwZXI7IC8vIERvbid0IHByb2NlZWQgaWYgYHJlZmVyZW5jZWAgb3IgYHBvcHBlcmAgYXJlIG5vdCB2YWxpZCBlbGVtZW50c1xuICAgICAgICAvLyBhbnltb3JlXG5cbiAgICAgICAgaWYgKCFhcmVWYWxpZEVsZW1lbnRzKHJlZmVyZW5jZSwgcG9wcGVyKSkge1xuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoSU5WQUxJRF9FTEVNRU5UX0VSUk9SKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gLy8gU3RvcmUgdGhlIHJlZmVyZW5jZSBhbmQgcG9wcGVyIHJlY3RzIHRvIGJlIHJlYWQgYnkgbW9kaWZpZXJzXG5cblxuICAgICAgICBzdGF0ZS5yZWN0cyA9IHtcbiAgICAgICAgICByZWZlcmVuY2U6IGdldENvbXBvc2l0ZVJlY3QocmVmZXJlbmNlLCBnZXRPZmZzZXRQYXJlbnQocG9wcGVyKSwgc3RhdGUub3B0aW9ucy5zdHJhdGVneSA9PT0gJ2ZpeGVkJyksXG4gICAgICAgICAgcG9wcGVyOiBnZXRMYXlvdXRSZWN0KHBvcHBlcilcbiAgICAgICAgfTsgLy8gTW9kaWZpZXJzIGhhdmUgdGhlIGFiaWxpdHkgdG8gcmVzZXQgdGhlIGN1cnJlbnQgdXBkYXRlIGN5Y2xlLiBUaGVcbiAgICAgICAgLy8gbW9zdCBjb21tb24gdXNlIGNhc2UgZm9yIHRoaXMgaXMgdGhlIGBmbGlwYCBtb2RpZmllciBjaGFuZ2luZyB0aGVcbiAgICAgICAgLy8gcGxhY2VtZW50LCB3aGljaCB0aGVuIG5lZWRzIHRvIHJlLXJ1biBhbGwgdGhlIG1vZGlmaWVycywgYmVjYXVzZSB0aGVcbiAgICAgICAgLy8gbG9naWMgd2FzIHByZXZpb3VzbHkgcmFuIGZvciB0aGUgcHJldmlvdXMgcGxhY2VtZW50IGFuZCBpcyB0aGVyZWZvcmVcbiAgICAgICAgLy8gc3RhbGUvaW5jb3JyZWN0XG5cbiAgICAgICAgc3RhdGUucmVzZXQgPSBmYWxzZTtcbiAgICAgICAgc3RhdGUucGxhY2VtZW50ID0gc3RhdGUub3B0aW9ucy5wbGFjZW1lbnQ7IC8vIE9uIGVhY2ggdXBkYXRlIGN5Y2xlLCB0aGUgYG1vZGlmaWVyc0RhdGFgIHByb3BlcnR5IGZvciBlYWNoIG1vZGlmaWVyXG4gICAgICAgIC8vIGlzIGZpbGxlZCB3aXRoIHRoZSBpbml0aWFsIGRhdGEgc3BlY2lmaWVkIGJ5IHRoZSBtb2RpZmllci4gVGhpcyBtZWFuc1xuICAgICAgICAvLyBpdCBkb2Vzbid0IHBlcnNpc3QgYW5kIGlzIGZyZXNoIG9uIGVhY2ggdXBkYXRlLlxuICAgICAgICAvLyBUbyBlbnN1cmUgcGVyc2lzdGVudCBkYXRhLCB1c2UgYCR7bmFtZX0jcGVyc2lzdGVudGBcblxuICAgICAgICBzdGF0ZS5vcmRlcmVkTW9kaWZpZXJzLmZvckVhY2goZnVuY3Rpb24gKG1vZGlmaWVyKSB7XG4gICAgICAgICAgcmV0dXJuIHN0YXRlLm1vZGlmaWVyc0RhdGFbbW9kaWZpZXIubmFtZV0gPSBPYmplY3QuYXNzaWduKHt9LCBtb2RpZmllci5kYXRhKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBfX2RlYnVnX2xvb3BzX18gPSAwO1xuXG4gICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBzdGF0ZS5vcmRlcmVkTW9kaWZpZXJzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgICAgIF9fZGVidWdfbG9vcHNfXyArPSAxO1xuXG4gICAgICAgICAgICBpZiAoX19kZWJ1Z19sb29wc19fID4gMTAwKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoSU5GSU5JVEVfTE9PUF9FUlJPUik7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzdGF0ZS5yZXNldCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgc3RhdGUucmVzZXQgPSBmYWxzZTtcbiAgICAgICAgICAgIGluZGV4ID0gLTE7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgX3N0YXRlJG9yZGVyZWRNb2RpZmllID0gc3RhdGUub3JkZXJlZE1vZGlmaWVyc1tpbmRleF0sXG4gICAgICAgICAgICAgIGZuID0gX3N0YXRlJG9yZGVyZWRNb2RpZmllLmZuLFxuICAgICAgICAgICAgICBfc3RhdGUkb3JkZXJlZE1vZGlmaWUyID0gX3N0YXRlJG9yZGVyZWRNb2RpZmllLm9wdGlvbnMsXG4gICAgICAgICAgICAgIF9vcHRpb25zID0gX3N0YXRlJG9yZGVyZWRNb2RpZmllMiA9PT0gdm9pZCAwID8ge30gOiBfc3RhdGUkb3JkZXJlZE1vZGlmaWUyLFxuICAgICAgICAgICAgICBuYW1lID0gX3N0YXRlJG9yZGVyZWRNb2RpZmllLm5hbWU7XG5cbiAgICAgICAgICBpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBzdGF0ZSA9IGZuKHtcbiAgICAgICAgICAgICAgc3RhdGU6IHN0YXRlLFxuICAgICAgICAgICAgICBvcHRpb25zOiBfb3B0aW9ucyxcbiAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgaW5zdGFuY2U6IGluc3RhbmNlXG4gICAgICAgICAgICB9KSB8fCBzdGF0ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAvLyBBc3luYyBhbmQgb3B0aW1pc3RpY2FsbHkgb3B0aW1pemVkIHVwZGF0ZSDigJMgaXQgd2lsbCBub3QgYmUgZXhlY3V0ZWQgaWZcbiAgICAgIC8vIG5vdCBuZWNlc3NhcnkgKGRlYm91bmNlZCB0byBydW4gYXQgbW9zdCBvbmNlLXBlci10aWNrKVxuICAgICAgdXBkYXRlOiBkZWJvdW5jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgIGluc3RhbmNlLmZvcmNlVXBkYXRlKCk7XG4gICAgICAgICAgcmVzb2x2ZShzdGF0ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSksXG4gICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICBjbGVhbnVwTW9kaWZpZXJFZmZlY3RzKCk7XG4gICAgICAgIGlzRGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKCFhcmVWYWxpZEVsZW1lbnRzKHJlZmVyZW5jZSwgcG9wcGVyKSkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICBjb25zb2xlLmVycm9yKElOVkFMSURfRUxFTUVOVF9FUlJPUik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9XG5cbiAgICBpbnN0YW5jZS5zZXRPcHRpb25zKG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICBpZiAoIWlzRGVzdHJveWVkICYmIG9wdGlvbnMub25GaXJzdFVwZGF0ZSkge1xuICAgICAgICBvcHRpb25zLm9uRmlyc3RVcGRhdGUoc3RhdGUpO1xuICAgICAgfVxuICAgIH0pOyAvLyBNb2RpZmllcnMgaGF2ZSB0aGUgYWJpbGl0eSB0byBleGVjdXRlIGFyYml0cmFyeSBjb2RlIGJlZm9yZSB0aGUgZmlyc3RcbiAgICAvLyB1cGRhdGUgY3ljbGUgcnVucy4gVGhleSB3aWxsIGJlIGV4ZWN1dGVkIGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZSB1cGRhdGVcbiAgICAvLyBjeWNsZS4gVGhpcyBpcyB1c2VmdWwgd2hlbiBhIG1vZGlmaWVyIGFkZHMgc29tZSBwZXJzaXN0ZW50IGRhdGEgdGhhdFxuICAgIC8vIG90aGVyIG1vZGlmaWVycyBuZWVkIHRvIHVzZSwgYnV0IHRoZSBtb2RpZmllciBpcyBydW4gYWZ0ZXIgdGhlIGRlcGVuZGVudFxuICAgIC8vIG9uZS5cblxuICAgIGZ1bmN0aW9uIHJ1bk1vZGlmaWVyRWZmZWN0cygpIHtcbiAgICAgIHN0YXRlLm9yZGVyZWRNb2RpZmllcnMuZm9yRWFjaChmdW5jdGlvbiAoX3JlZjMpIHtcbiAgICAgICAgdmFyIG5hbWUgPSBfcmVmMy5uYW1lLFxuICAgICAgICAgICAgX3JlZjMkb3B0aW9ucyA9IF9yZWYzLm9wdGlvbnMsXG4gICAgICAgICAgICBvcHRpb25zID0gX3JlZjMkb3B0aW9ucyA9PT0gdm9pZCAwID8ge30gOiBfcmVmMyRvcHRpb25zLFxuICAgICAgICAgICAgZWZmZWN0ID0gX3JlZjMuZWZmZWN0O1xuXG4gICAgICAgIGlmICh0eXBlb2YgZWZmZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdmFyIGNsZWFudXBGbiA9IGVmZmVjdCh7XG4gICAgICAgICAgICBzdGF0ZTogc3RhdGUsXG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgaW5zdGFuY2U6IGluc3RhbmNlLFxuICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdmFyIG5vb3BGbiA9IGZ1bmN0aW9uIG5vb3BGbigpIHt9O1xuXG4gICAgICAgICAgZWZmZWN0Q2xlYW51cEZucy5wdXNoKGNsZWFudXBGbiB8fCBub29wRm4pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhbnVwTW9kaWZpZXJFZmZlY3RzKCkge1xuICAgICAgZWZmZWN0Q2xlYW51cEZucy5mb3JFYWNoKGZ1bmN0aW9uIChmbikge1xuICAgICAgICByZXR1cm4gZm4oKTtcbiAgICAgIH0pO1xuICAgICAgZWZmZWN0Q2xlYW51cEZucyA9IFtdO1xuICAgIH1cblxuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfTtcbn1cbmV4cG9ydCB2YXIgY3JlYXRlUG9wcGVyID0gLyojX19QVVJFX18qL3BvcHBlckdlbmVyYXRvcigpOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbmV4cG9ydCB7IGRldGVjdE92ZXJmbG93IH07IiwiaW1wb3J0IHsgaXNTaGFkb3dSb290IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udGFpbnMocGFyZW50LCBjaGlsZCkge1xuICB2YXIgcm9vdE5vZGUgPSBjaGlsZC5nZXRSb290Tm9kZSAmJiBjaGlsZC5nZXRSb290Tm9kZSgpOyAvLyBGaXJzdCwgYXR0ZW1wdCB3aXRoIGZhc3RlciBuYXRpdmUgbWV0aG9kXG5cbiAgaWYgKHBhcmVudC5jb250YWlucyhjaGlsZCkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSAvLyB0aGVuIGZhbGxiYWNrIHRvIGN1c3RvbSBpbXBsZW1lbnRhdGlvbiB3aXRoIFNoYWRvdyBET00gc3VwcG9ydFxuICBlbHNlIGlmIChyb290Tm9kZSAmJiBpc1NoYWRvd1Jvb3Qocm9vdE5vZGUpKSB7XG4gICAgICB2YXIgbmV4dCA9IGNoaWxkO1xuXG4gICAgICBkbyB7XG4gICAgICAgIGlmIChuZXh0ICYmIHBhcmVudC5pc1NhbWVOb2RlKG5leHQpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gLy8gJEZsb3dGaXhNZVtwcm9wLW1pc3NpbmddOiBuZWVkIGEgYmV0dGVyIHdheSB0byBoYW5kbGUgdGhpcy4uLlxuXG5cbiAgICAgICAgbmV4dCA9IG5leHQucGFyZW50Tm9kZSB8fCBuZXh0Lmhvc3Q7XG4gICAgICB9IHdoaWxlIChuZXh0KTtcbiAgICB9IC8vIEdpdmUgdXAsIHRoZSByZXN1bHQgaXMgZmFsc2VcblxuXG4gIHJldHVybiBmYWxzZTtcbn0iLCJpbXBvcnQgeyBpc0VsZW1lbnQsIGlzSFRNTEVsZW1lbnQgfSBmcm9tIFwiLi9pbnN0YW5jZU9mLmpzXCI7XG5pbXBvcnQgeyByb3VuZCB9IGZyb20gXCIuLi91dGlscy9tYXRoLmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93IGZyb20gXCIuL2dldFdpbmRvdy5qc1wiO1xuaW1wb3J0IGlzTGF5b3V0Vmlld3BvcnQgZnJvbSBcIi4vaXNMYXlvdXRWaWV3cG9ydC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnQsIGluY2x1ZGVTY2FsZSwgaXNGaXhlZFN0cmF0ZWd5KSB7XG4gIGlmIChpbmNsdWRlU2NhbGUgPT09IHZvaWQgMCkge1xuICAgIGluY2x1ZGVTY2FsZSA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKGlzRml4ZWRTdHJhdGVneSA9PT0gdm9pZCAwKSB7XG4gICAgaXNGaXhlZFN0cmF0ZWd5ID0gZmFsc2U7XG4gIH1cblxuICB2YXIgY2xpZW50UmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHZhciBzY2FsZVggPSAxO1xuICB2YXIgc2NhbGVZID0gMTtcblxuICBpZiAoaW5jbHVkZVNjYWxlICYmIGlzSFRNTEVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICBzY2FsZVggPSBlbGVtZW50Lm9mZnNldFdpZHRoID4gMCA/IHJvdW5kKGNsaWVudFJlY3Qud2lkdGgpIC8gZWxlbWVudC5vZmZzZXRXaWR0aCB8fCAxIDogMTtcbiAgICBzY2FsZVkgPSBlbGVtZW50Lm9mZnNldEhlaWdodCA+IDAgPyByb3VuZChjbGllbnRSZWN0LmhlaWdodCkgLyBlbGVtZW50Lm9mZnNldEhlaWdodCB8fCAxIDogMTtcbiAgfVxuXG4gIHZhciBfcmVmID0gaXNFbGVtZW50KGVsZW1lbnQpID8gZ2V0V2luZG93KGVsZW1lbnQpIDogd2luZG93LFxuICAgICAgdmlzdWFsVmlld3BvcnQgPSBfcmVmLnZpc3VhbFZpZXdwb3J0O1xuXG4gIHZhciBhZGRWaXN1YWxPZmZzZXRzID0gIWlzTGF5b3V0Vmlld3BvcnQoKSAmJiBpc0ZpeGVkU3RyYXRlZ3k7XG4gIHZhciB4ID0gKGNsaWVudFJlY3QubGVmdCArIChhZGRWaXN1YWxPZmZzZXRzICYmIHZpc3VhbFZpZXdwb3J0ID8gdmlzdWFsVmlld3BvcnQub2Zmc2V0TGVmdCA6IDApKSAvIHNjYWxlWDtcbiAgdmFyIHkgPSAoY2xpZW50UmVjdC50b3AgKyAoYWRkVmlzdWFsT2Zmc2V0cyAmJiB2aXN1YWxWaWV3cG9ydCA/IHZpc3VhbFZpZXdwb3J0Lm9mZnNldFRvcCA6IDApKSAvIHNjYWxlWTtcbiAgdmFyIHdpZHRoID0gY2xpZW50UmVjdC53aWR0aCAvIHNjYWxlWDtcbiAgdmFyIGhlaWdodCA9IGNsaWVudFJlY3QuaGVpZ2h0IC8gc2NhbGVZO1xuICByZXR1cm4ge1xuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICB0b3A6IHksXG4gICAgcmlnaHQ6IHggKyB3aWR0aCxcbiAgICBib3R0b206IHkgKyBoZWlnaHQsXG4gICAgbGVmdDogeCxcbiAgICB4OiB4LFxuICAgIHk6IHlcbiAgfTtcbn0iLCJpbXBvcnQgeyB2aWV3cG9ydCB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IGdldFZpZXdwb3J0UmVjdCBmcm9tIFwiLi9nZXRWaWV3cG9ydFJlY3QuanNcIjtcbmltcG9ydCBnZXREb2N1bWVudFJlY3QgZnJvbSBcIi4vZ2V0RG9jdW1lbnRSZWN0LmpzXCI7XG5pbXBvcnQgbGlzdFNjcm9sbFBhcmVudHMgZnJvbSBcIi4vbGlzdFNjcm9sbFBhcmVudHMuanNcIjtcbmltcG9ydCBnZXRPZmZzZXRQYXJlbnQgZnJvbSBcIi4vZ2V0T2Zmc2V0UGFyZW50LmpzXCI7XG5pbXBvcnQgZ2V0RG9jdW1lbnRFbGVtZW50IGZyb20gXCIuL2dldERvY3VtZW50RWxlbWVudC5qc1wiO1xuaW1wb3J0IGdldENvbXB1dGVkU3R5bGUgZnJvbSBcIi4vZ2V0Q29tcHV0ZWRTdHlsZS5qc1wiO1xuaW1wb3J0IHsgaXNFbGVtZW50LCBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IGdldEJvdW5kaW5nQ2xpZW50UmVjdCBmcm9tIFwiLi9nZXRCb3VuZGluZ0NsaWVudFJlY3QuanNcIjtcbmltcG9ydCBnZXRQYXJlbnROb2RlIGZyb20gXCIuL2dldFBhcmVudE5vZGUuanNcIjtcbmltcG9ydCBjb250YWlucyBmcm9tIFwiLi9jb250YWlucy5qc1wiO1xuaW1wb3J0IGdldE5vZGVOYW1lIGZyb20gXCIuL2dldE5vZGVOYW1lLmpzXCI7XG5pbXBvcnQgcmVjdFRvQ2xpZW50UmVjdCBmcm9tIFwiLi4vdXRpbHMvcmVjdFRvQ2xpZW50UmVjdC5qc1wiO1xuaW1wb3J0IHsgbWF4LCBtaW4gfSBmcm9tIFwiLi4vdXRpbHMvbWF0aC5qc1wiO1xuXG5mdW5jdGlvbiBnZXRJbm5lckJvdW5kaW5nQ2xpZW50UmVjdChlbGVtZW50LCBzdHJhdGVneSkge1xuICB2YXIgcmVjdCA9IGdldEJvdW5kaW5nQ2xpZW50UmVjdChlbGVtZW50LCBmYWxzZSwgc3RyYXRlZ3kgPT09ICdmaXhlZCcpO1xuICByZWN0LnRvcCA9IHJlY3QudG9wICsgZWxlbWVudC5jbGllbnRUb3A7XG4gIHJlY3QubGVmdCA9IHJlY3QubGVmdCArIGVsZW1lbnQuY2xpZW50TGVmdDtcbiAgcmVjdC5ib3R0b20gPSByZWN0LnRvcCArIGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICByZWN0LnJpZ2h0ID0gcmVjdC5sZWZ0ICsgZWxlbWVudC5jbGllbnRXaWR0aDtcbiAgcmVjdC53aWR0aCA9IGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gIHJlY3QuaGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gIHJlY3QueCA9IHJlY3QubGVmdDtcbiAgcmVjdC55ID0gcmVjdC50b3A7XG4gIHJldHVybiByZWN0O1xufVxuXG5mdW5jdGlvbiBnZXRDbGllbnRSZWN0RnJvbU1peGVkVHlwZShlbGVtZW50LCBjbGlwcGluZ1BhcmVudCwgc3RyYXRlZ3kpIHtcbiAgcmV0dXJuIGNsaXBwaW5nUGFyZW50ID09PSB2aWV3cG9ydCA/IHJlY3RUb0NsaWVudFJlY3QoZ2V0Vmlld3BvcnRSZWN0KGVsZW1lbnQsIHN0cmF0ZWd5KSkgOiBpc0VsZW1lbnQoY2xpcHBpbmdQYXJlbnQpID8gZ2V0SW5uZXJCb3VuZGluZ0NsaWVudFJlY3QoY2xpcHBpbmdQYXJlbnQsIHN0cmF0ZWd5KSA6IHJlY3RUb0NsaWVudFJlY3QoZ2V0RG9jdW1lbnRSZWN0KGdldERvY3VtZW50RWxlbWVudChlbGVtZW50KSkpO1xufSAvLyBBIFwiY2xpcHBpbmcgcGFyZW50XCIgaXMgYW4gb3ZlcmZsb3dhYmxlIGNvbnRhaW5lciB3aXRoIHRoZSBjaGFyYWN0ZXJpc3RpYyBvZlxuLy8gY2xpcHBpbmcgKG9yIGhpZGluZykgb3ZlcmZsb3dpbmcgZWxlbWVudHMgd2l0aCBhIHBvc2l0aW9uIGRpZmZlcmVudCBmcm9tXG4vLyBgaW5pdGlhbGBcblxuXG5mdW5jdGlvbiBnZXRDbGlwcGluZ1BhcmVudHMoZWxlbWVudCkge1xuICB2YXIgY2xpcHBpbmdQYXJlbnRzID0gbGlzdFNjcm9sbFBhcmVudHMoZ2V0UGFyZW50Tm9kZShlbGVtZW50KSk7XG4gIHZhciBjYW5Fc2NhcGVDbGlwcGluZyA9IFsnYWJzb2x1dGUnLCAnZml4ZWQnXS5pbmRleE9mKGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkucG9zaXRpb24pID49IDA7XG4gIHZhciBjbGlwcGVyRWxlbWVudCA9IGNhbkVzY2FwZUNsaXBwaW5nICYmIGlzSFRNTEVsZW1lbnQoZWxlbWVudCkgPyBnZXRPZmZzZXRQYXJlbnQoZWxlbWVudCkgOiBlbGVtZW50O1xuXG4gIGlmICghaXNFbGVtZW50KGNsaXBwZXJFbGVtZW50KSkge1xuICAgIHJldHVybiBbXTtcbiAgfSAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS1yZXR1cm5dOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svZmxvdy9pc3N1ZXMvMTQxNFxuXG5cbiAgcmV0dXJuIGNsaXBwaW5nUGFyZW50cy5maWx0ZXIoZnVuY3Rpb24gKGNsaXBwaW5nUGFyZW50KSB7XG4gICAgcmV0dXJuIGlzRWxlbWVudChjbGlwcGluZ1BhcmVudCkgJiYgY29udGFpbnMoY2xpcHBpbmdQYXJlbnQsIGNsaXBwZXJFbGVtZW50KSAmJiBnZXROb2RlTmFtZShjbGlwcGluZ1BhcmVudCkgIT09ICdib2R5JztcbiAgfSk7XG59IC8vIEdldHMgdGhlIG1heGltdW0gYXJlYSB0aGF0IHRoZSBlbGVtZW50IGlzIHZpc2libGUgaW4gZHVlIHRvIGFueSBudW1iZXIgb2Zcbi8vIGNsaXBwaW5nIHBhcmVudHNcblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDbGlwcGluZ1JlY3QoZWxlbWVudCwgYm91bmRhcnksIHJvb3RCb3VuZGFyeSwgc3RyYXRlZ3kpIHtcbiAgdmFyIG1haW5DbGlwcGluZ1BhcmVudHMgPSBib3VuZGFyeSA9PT0gJ2NsaXBwaW5nUGFyZW50cycgPyBnZXRDbGlwcGluZ1BhcmVudHMoZWxlbWVudCkgOiBbXS5jb25jYXQoYm91bmRhcnkpO1xuICB2YXIgY2xpcHBpbmdQYXJlbnRzID0gW10uY29uY2F0KG1haW5DbGlwcGluZ1BhcmVudHMsIFtyb290Qm91bmRhcnldKTtcbiAgdmFyIGZpcnN0Q2xpcHBpbmdQYXJlbnQgPSBjbGlwcGluZ1BhcmVudHNbMF07XG4gIHZhciBjbGlwcGluZ1JlY3QgPSBjbGlwcGluZ1BhcmVudHMucmVkdWNlKGZ1bmN0aW9uIChhY2NSZWN0LCBjbGlwcGluZ1BhcmVudCkge1xuICAgIHZhciByZWN0ID0gZ2V0Q2xpZW50UmVjdEZyb21NaXhlZFR5cGUoZWxlbWVudCwgY2xpcHBpbmdQYXJlbnQsIHN0cmF0ZWd5KTtcbiAgICBhY2NSZWN0LnRvcCA9IG1heChyZWN0LnRvcCwgYWNjUmVjdC50b3ApO1xuICAgIGFjY1JlY3QucmlnaHQgPSBtaW4ocmVjdC5yaWdodCwgYWNjUmVjdC5yaWdodCk7XG4gICAgYWNjUmVjdC5ib3R0b20gPSBtaW4ocmVjdC5ib3R0b20sIGFjY1JlY3QuYm90dG9tKTtcbiAgICBhY2NSZWN0LmxlZnQgPSBtYXgocmVjdC5sZWZ0LCBhY2NSZWN0LmxlZnQpO1xuICAgIHJldHVybiBhY2NSZWN0O1xuICB9LCBnZXRDbGllbnRSZWN0RnJvbU1peGVkVHlwZShlbGVtZW50LCBmaXJzdENsaXBwaW5nUGFyZW50LCBzdHJhdGVneSkpO1xuICBjbGlwcGluZ1JlY3Qud2lkdGggPSBjbGlwcGluZ1JlY3QucmlnaHQgLSBjbGlwcGluZ1JlY3QubGVmdDtcbiAgY2xpcHBpbmdSZWN0LmhlaWdodCA9IGNsaXBwaW5nUmVjdC5ib3R0b20gLSBjbGlwcGluZ1JlY3QudG9wO1xuICBjbGlwcGluZ1JlY3QueCA9IGNsaXBwaW5nUmVjdC5sZWZ0O1xuICBjbGlwcGluZ1JlY3QueSA9IGNsaXBwaW5nUmVjdC50b3A7XG4gIHJldHVybiBjbGlwcGluZ1JlY3Q7XG59IiwiaW1wb3J0IGdldEJvdW5kaW5nQ2xpZW50UmVjdCBmcm9tIFwiLi9nZXRCb3VuZGluZ0NsaWVudFJlY3QuanNcIjtcbmltcG9ydCBnZXROb2RlU2Nyb2xsIGZyb20gXCIuL2dldE5vZGVTY3JvbGwuanNcIjtcbmltcG9ydCBnZXROb2RlTmFtZSBmcm9tIFwiLi9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IHsgaXNIVE1MRWxlbWVudCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmltcG9ydCBnZXRXaW5kb3dTY3JvbGxCYXJYIGZyb20gXCIuL2dldFdpbmRvd1Njcm9sbEJhclguanNcIjtcbmltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4vZ2V0RG9jdW1lbnRFbGVtZW50LmpzXCI7XG5pbXBvcnQgaXNTY3JvbGxQYXJlbnQgZnJvbSBcIi4vaXNTY3JvbGxQYXJlbnQuanNcIjtcbmltcG9ydCB7IHJvdW5kIH0gZnJvbSBcIi4uL3V0aWxzL21hdGguanNcIjtcblxuZnVuY3Rpb24gaXNFbGVtZW50U2NhbGVkKGVsZW1lbnQpIHtcbiAgdmFyIHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB2YXIgc2NhbGVYID0gcm91bmQocmVjdC53aWR0aCkgLyBlbGVtZW50Lm9mZnNldFdpZHRoIHx8IDE7XG4gIHZhciBzY2FsZVkgPSByb3VuZChyZWN0LmhlaWdodCkgLyBlbGVtZW50Lm9mZnNldEhlaWdodCB8fCAxO1xuICByZXR1cm4gc2NhbGVYICE9PSAxIHx8IHNjYWxlWSAhPT0gMTtcbn0gLy8gUmV0dXJucyB0aGUgY29tcG9zaXRlIHJlY3Qgb2YgYW4gZWxlbWVudCByZWxhdGl2ZSB0byBpdHMgb2Zmc2V0UGFyZW50LlxuLy8gQ29tcG9zaXRlIG1lYW5zIGl0IHRha2VzIGludG8gYWNjb3VudCB0cmFuc2Zvcm1zIGFzIHdlbGwgYXMgbGF5b3V0LlxuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldENvbXBvc2l0ZVJlY3QoZWxlbWVudE9yVmlydHVhbEVsZW1lbnQsIG9mZnNldFBhcmVudCwgaXNGaXhlZCkge1xuICBpZiAoaXNGaXhlZCA9PT0gdm9pZCAwKSB7XG4gICAgaXNGaXhlZCA9IGZhbHNlO1xuICB9XG5cbiAgdmFyIGlzT2Zmc2V0UGFyZW50QW5FbGVtZW50ID0gaXNIVE1MRWxlbWVudChvZmZzZXRQYXJlbnQpO1xuICB2YXIgb2Zmc2V0UGFyZW50SXNTY2FsZWQgPSBpc0hUTUxFbGVtZW50KG9mZnNldFBhcmVudCkgJiYgaXNFbGVtZW50U2NhbGVkKG9mZnNldFBhcmVudCk7XG4gIHZhciBkb2N1bWVudEVsZW1lbnQgPSBnZXREb2N1bWVudEVsZW1lbnQob2Zmc2V0UGFyZW50KTtcbiAgdmFyIHJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudE9yVmlydHVhbEVsZW1lbnQsIG9mZnNldFBhcmVudElzU2NhbGVkLCBpc0ZpeGVkKTtcbiAgdmFyIHNjcm9sbCA9IHtcbiAgICBzY3JvbGxMZWZ0OiAwLFxuICAgIHNjcm9sbFRvcDogMFxuICB9O1xuICB2YXIgb2Zmc2V0cyA9IHtcbiAgICB4OiAwLFxuICAgIHk6IDBcbiAgfTtcblxuICBpZiAoaXNPZmZzZXRQYXJlbnRBbkVsZW1lbnQgfHwgIWlzT2Zmc2V0UGFyZW50QW5FbGVtZW50ICYmICFpc0ZpeGVkKSB7XG4gICAgaWYgKGdldE5vZGVOYW1lKG9mZnNldFBhcmVudCkgIT09ICdib2R5JyB8fCAvLyBodHRwczovL2dpdGh1Yi5jb20vcG9wcGVyanMvcG9wcGVyLWNvcmUvaXNzdWVzLzEwNzhcbiAgICBpc1Njcm9sbFBhcmVudChkb2N1bWVudEVsZW1lbnQpKSB7XG4gICAgICBzY3JvbGwgPSBnZXROb2RlU2Nyb2xsKG9mZnNldFBhcmVudCk7XG4gICAgfVxuXG4gICAgaWYgKGlzSFRNTEVsZW1lbnQob2Zmc2V0UGFyZW50KSkge1xuICAgICAgb2Zmc2V0cyA9IGdldEJvdW5kaW5nQ2xpZW50UmVjdChvZmZzZXRQYXJlbnQsIHRydWUpO1xuICAgICAgb2Zmc2V0cy54ICs9IG9mZnNldFBhcmVudC5jbGllbnRMZWZ0O1xuICAgICAgb2Zmc2V0cy55ICs9IG9mZnNldFBhcmVudC5jbGllbnRUb3A7XG4gICAgfSBlbHNlIGlmIChkb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgIG9mZnNldHMueCA9IGdldFdpbmRvd1Njcm9sbEJhclgoZG9jdW1lbnRFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHg6IHJlY3QubGVmdCArIHNjcm9sbC5zY3JvbGxMZWZ0IC0gb2Zmc2V0cy54LFxuICAgIHk6IHJlY3QudG9wICsgc2Nyb2xsLnNjcm9sbFRvcCAtIG9mZnNldHMueSxcbiAgICB3aWR0aDogcmVjdC53aWR0aCxcbiAgICBoZWlnaHQ6IHJlY3QuaGVpZ2h0XG4gIH07XG59IiwiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkge1xuICByZXR1cm4gZ2V0V2luZG93KGVsZW1lbnQpLmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG59IiwiaW1wb3J0IHsgaXNFbGVtZW50IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpIHtcbiAgLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtcmV0dXJuXTogYXNzdW1lIGJvZHkgaXMgYWx3YXlzIGF2YWlsYWJsZVxuICByZXR1cm4gKChpc0VsZW1lbnQoZWxlbWVudCkgPyBlbGVtZW50Lm93bmVyRG9jdW1lbnQgOiAvLyAkRmxvd0ZpeE1lW3Byb3AtbWlzc2luZ11cbiAgZWxlbWVudC5kb2N1bWVudCkgfHwgd2luZG93LmRvY3VtZW50KS5kb2N1bWVudEVsZW1lbnQ7XG59IiwiaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRDb21wdXRlZFN0eWxlIGZyb20gXCIuL2dldENvbXB1dGVkU3R5bGUuanNcIjtcbmltcG9ydCBnZXRXaW5kb3dTY3JvbGxCYXJYIGZyb20gXCIuL2dldFdpbmRvd1Njcm9sbEJhclguanNcIjtcbmltcG9ydCBnZXRXaW5kb3dTY3JvbGwgZnJvbSBcIi4vZ2V0V2luZG93U2Nyb2xsLmpzXCI7XG5pbXBvcnQgeyBtYXggfSBmcm9tIFwiLi4vdXRpbHMvbWF0aC5qc1wiOyAvLyBHZXRzIHRoZSBlbnRpcmUgc2l6ZSBvZiB0aGUgc2Nyb2xsYWJsZSBkb2N1bWVudCBhcmVhLCBldmVuIGV4dGVuZGluZyBvdXRzaWRlXG4vLyBvZiB0aGUgYDxodG1sPmAgYW5kIGA8Ym9keT5gIHJlY3QgYm91bmRzIGlmIGhvcml6b250YWxseSBzY3JvbGxhYmxlXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldERvY3VtZW50UmVjdChlbGVtZW50KSB7XG4gIHZhciBfZWxlbWVudCRvd25lckRvY3VtZW47XG5cbiAgdmFyIGh0bWwgPSBnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCk7XG4gIHZhciB3aW5TY3JvbGwgPSBnZXRXaW5kb3dTY3JvbGwoZWxlbWVudCk7XG4gIHZhciBib2R5ID0gKF9lbGVtZW50JG93bmVyRG9jdW1lbiA9IGVsZW1lbnQub3duZXJEb2N1bWVudCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9lbGVtZW50JG93bmVyRG9jdW1lbi5ib2R5O1xuICB2YXIgd2lkdGggPSBtYXgoaHRtbC5zY3JvbGxXaWR0aCwgaHRtbC5jbGllbnRXaWR0aCwgYm9keSA/IGJvZHkuc2Nyb2xsV2lkdGggOiAwLCBib2R5ID8gYm9keS5jbGllbnRXaWR0aCA6IDApO1xuICB2YXIgaGVpZ2h0ID0gbWF4KGh0bWwuc2Nyb2xsSGVpZ2h0LCBodG1sLmNsaWVudEhlaWdodCwgYm9keSA/IGJvZHkuc2Nyb2xsSGVpZ2h0IDogMCwgYm9keSA/IGJvZHkuY2xpZW50SGVpZ2h0IDogMCk7XG4gIHZhciB4ID0gLXdpblNjcm9sbC5zY3JvbGxMZWZ0ICsgZ2V0V2luZG93U2Nyb2xsQmFyWChlbGVtZW50KTtcbiAgdmFyIHkgPSAtd2luU2Nyb2xsLnNjcm9sbFRvcDtcblxuICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZShib2R5IHx8IGh0bWwpLmRpcmVjdGlvbiA9PT0gJ3J0bCcpIHtcbiAgICB4ICs9IG1heChodG1sLmNsaWVudFdpZHRoLCBib2R5ID8gYm9keS5jbGllbnRXaWR0aCA6IDApIC0gd2lkdGg7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICB4OiB4LFxuICAgIHk6IHlcbiAgfTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRIVE1MRWxlbWVudFNjcm9sbChlbGVtZW50KSB7XG4gIHJldHVybiB7XG4gICAgc2Nyb2xsTGVmdDogZWxlbWVudC5zY3JvbGxMZWZ0LFxuICAgIHNjcm9sbFRvcDogZWxlbWVudC5zY3JvbGxUb3BcbiAgfTtcbn0iLCJpbXBvcnQgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGZyb20gXCIuL2dldEJvdW5kaW5nQ2xpZW50UmVjdC5qc1wiOyAvLyBSZXR1cm5zIHRoZSBsYXlvdXQgcmVjdCBvZiBhbiBlbGVtZW50IHJlbGF0aXZlIHRvIGl0cyBvZmZzZXRQYXJlbnQuIExheW91dFxuLy8gbWVhbnMgaXQgZG9lc24ndCB0YWtlIGludG8gYWNjb3VudCB0cmFuc2Zvcm1zLlxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRMYXlvdXRSZWN0KGVsZW1lbnQpIHtcbiAgdmFyIGNsaWVudFJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudCk7IC8vIFVzZSB0aGUgY2xpZW50UmVjdCBzaXplcyBpZiBpdCdzIG5vdCBiZWVuIHRyYW5zZm9ybWVkLlxuICAvLyBGaXhlcyBodHRwczovL2dpdGh1Yi5jb20vcG9wcGVyanMvcG9wcGVyLWNvcmUvaXNzdWVzLzEyMjNcblxuICB2YXIgd2lkdGggPSBlbGVtZW50Lm9mZnNldFdpZHRoO1xuICB2YXIgaGVpZ2h0ID0gZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG5cbiAgaWYgKE1hdGguYWJzKGNsaWVudFJlY3Qud2lkdGggLSB3aWR0aCkgPD0gMSkge1xuICAgIHdpZHRoID0gY2xpZW50UmVjdC53aWR0aDtcbiAgfVxuXG4gIGlmIChNYXRoLmFicyhjbGllbnRSZWN0LmhlaWdodCAtIGhlaWdodCkgPD0gMSkge1xuICAgIGhlaWdodCA9IGNsaWVudFJlY3QuaGVpZ2h0O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB4OiBlbGVtZW50Lm9mZnNldExlZnQsXG4gICAgeTogZWxlbWVudC5vZmZzZXRUb3AsXG4gICAgd2lkdGg6IHdpZHRoLFxuICAgIGhlaWdodDogaGVpZ2h0XG4gIH07XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Tm9kZU5hbWUoZWxlbWVudCkge1xuICByZXR1cm4gZWxlbWVudCA/IChlbGVtZW50Lm5vZGVOYW1lIHx8ICcnKS50b0xvd2VyQ2FzZSgpIDogbnVsbDtcbn0iLCJpbXBvcnQgZ2V0V2luZG93U2Nyb2xsIGZyb20gXCIuL2dldFdpbmRvd1Njcm9sbC5qc1wiO1xuaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCB7IGlzSFRNTEVsZW1lbnQgfSBmcm9tIFwiLi9pbnN0YW5jZU9mLmpzXCI7XG5pbXBvcnQgZ2V0SFRNTEVsZW1lbnRTY3JvbGwgZnJvbSBcIi4vZ2V0SFRNTEVsZW1lbnRTY3JvbGwuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE5vZGVTY3JvbGwobm9kZSkge1xuICBpZiAobm9kZSA9PT0gZ2V0V2luZG93KG5vZGUpIHx8ICFpc0hUTUxFbGVtZW50KG5vZGUpKSB7XG4gICAgcmV0dXJuIGdldFdpbmRvd1Njcm9sbChub2RlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZ2V0SFRNTEVsZW1lbnRTY3JvbGwobm9kZSk7XG4gIH1cbn0iLCJpbXBvcnQgZ2V0V2luZG93IGZyb20gXCIuL2dldFdpbmRvdy5qc1wiO1xuaW1wb3J0IGdldE5vZGVOYW1lIGZyb20gXCIuL2dldE5vZGVOYW1lLmpzXCI7XG5pbXBvcnQgZ2V0Q29tcHV0ZWRTdHlsZSBmcm9tIFwiLi9nZXRDb21wdXRlZFN0eWxlLmpzXCI7XG5pbXBvcnQgeyBpc0hUTUxFbGVtZW50LCBpc1NoYWRvd1Jvb3QgfSBmcm9tIFwiLi9pbnN0YW5jZU9mLmpzXCI7XG5pbXBvcnQgaXNUYWJsZUVsZW1lbnQgZnJvbSBcIi4vaXNUYWJsZUVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRQYXJlbnROb2RlIGZyb20gXCIuL2dldFBhcmVudE5vZGUuanNcIjtcbmltcG9ydCBnZXRVQVN0cmluZyBmcm9tIFwiLi4vdXRpbHMvdXNlckFnZW50LmpzXCI7XG5cbmZ1bmN0aW9uIGdldFRydWVPZmZzZXRQYXJlbnQoZWxlbWVudCkge1xuICBpZiAoIWlzSFRNTEVsZW1lbnQoZWxlbWVudCkgfHwgLy8gaHR0cHM6Ly9naXRodWIuY29tL3BvcHBlcmpzL3BvcHBlci1jb3JlL2lzc3Vlcy84MzdcbiAgZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5wb3NpdGlvbiA9PT0gJ2ZpeGVkJykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQub2Zmc2V0UGFyZW50O1xufSAvLyBgLm9mZnNldFBhcmVudGAgcmVwb3J0cyBgbnVsbGAgZm9yIGZpeGVkIGVsZW1lbnRzLCB3aGlsZSBhYnNvbHV0ZSBlbGVtZW50c1xuLy8gcmV0dXJuIHRoZSBjb250YWluaW5nIGJsb2NrXG5cblxuZnVuY3Rpb24gZ2V0Q29udGFpbmluZ0Jsb2NrKGVsZW1lbnQpIHtcbiAgdmFyIGlzRmlyZWZveCA9IC9maXJlZm94L2kudGVzdChnZXRVQVN0cmluZygpKTtcbiAgdmFyIGlzSUUgPSAvVHJpZGVudC9pLnRlc3QoZ2V0VUFTdHJpbmcoKSk7XG5cbiAgaWYgKGlzSUUgJiYgaXNIVE1MRWxlbWVudChlbGVtZW50KSkge1xuICAgIC8vIEluIElFIDksIDEwIGFuZCAxMSBmaXhlZCBlbGVtZW50cyBjb250YWluaW5nIGJsb2NrIGlzIGFsd2F5cyBlc3RhYmxpc2hlZCBieSB0aGUgdmlld3BvcnRcbiAgICB2YXIgZWxlbWVudENzcyA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG5cbiAgICBpZiAoZWxlbWVudENzcy5wb3NpdGlvbiA9PT0gJ2ZpeGVkJykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgdmFyIGN1cnJlbnROb2RlID0gZ2V0UGFyZW50Tm9kZShlbGVtZW50KTtcblxuICBpZiAoaXNTaGFkb3dSb290KGN1cnJlbnROb2RlKSkge1xuICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUuaG9zdDtcbiAgfVxuXG4gIHdoaWxlIChpc0hUTUxFbGVtZW50KGN1cnJlbnROb2RlKSAmJiBbJ2h0bWwnLCAnYm9keSddLmluZGV4T2YoZ2V0Tm9kZU5hbWUoY3VycmVudE5vZGUpKSA8IDApIHtcbiAgICB2YXIgY3NzID0gZ2V0Q29tcHV0ZWRTdHlsZShjdXJyZW50Tm9kZSk7IC8vIFRoaXMgaXMgbm9uLWV4aGF1c3RpdmUgYnV0IGNvdmVycyB0aGUgbW9zdCBjb21tb24gQ1NTIHByb3BlcnRpZXMgdGhhdFxuICAgIC8vIGNyZWF0ZSBhIGNvbnRhaW5pbmcgYmxvY2suXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQ1NTL0NvbnRhaW5pbmdfYmxvY2sjaWRlbnRpZnlpbmdfdGhlX2NvbnRhaW5pbmdfYmxvY2tcblxuICAgIGlmIChjc3MudHJhbnNmb3JtICE9PSAnbm9uZScgfHwgY3NzLnBlcnNwZWN0aXZlICE9PSAnbm9uZScgfHwgY3NzLmNvbnRhaW4gPT09ICdwYWludCcgfHwgWyd0cmFuc2Zvcm0nLCAncGVyc3BlY3RpdmUnXS5pbmRleE9mKGNzcy53aWxsQ2hhbmdlKSAhPT0gLTEgfHwgaXNGaXJlZm94ICYmIGNzcy53aWxsQ2hhbmdlID09PSAnZmlsdGVyJyB8fCBpc0ZpcmVmb3ggJiYgY3NzLmZpbHRlciAmJiBjc3MuZmlsdGVyICE9PSAnbm9uZScpIHtcbiAgICAgIHJldHVybiBjdXJyZW50Tm9kZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsO1xufSAvLyBHZXRzIHRoZSBjbG9zZXN0IGFuY2VzdG9yIHBvc2l0aW9uZWQgZWxlbWVudC4gSGFuZGxlcyBzb21lIGVkZ2UgY2FzZXMsXG4vLyBzdWNoIGFzIHRhYmxlIGFuY2VzdG9ycyBhbmQgY3Jvc3MgYnJvd3NlciBidWdzLlxuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE9mZnNldFBhcmVudChlbGVtZW50KSB7XG4gIHZhciB3aW5kb3cgPSBnZXRXaW5kb3coZWxlbWVudCk7XG4gIHZhciBvZmZzZXRQYXJlbnQgPSBnZXRUcnVlT2Zmc2V0UGFyZW50KGVsZW1lbnQpO1xuXG4gIHdoaWxlIChvZmZzZXRQYXJlbnQgJiYgaXNUYWJsZUVsZW1lbnQob2Zmc2V0UGFyZW50KSAmJiBnZXRDb21wdXRlZFN0eWxlKG9mZnNldFBhcmVudCkucG9zaXRpb24gPT09ICdzdGF0aWMnKSB7XG4gICAgb2Zmc2V0UGFyZW50ID0gZ2V0VHJ1ZU9mZnNldFBhcmVudChvZmZzZXRQYXJlbnQpO1xuICB9XG5cbiAgaWYgKG9mZnNldFBhcmVudCAmJiAoZ2V0Tm9kZU5hbWUob2Zmc2V0UGFyZW50KSA9PT0gJ2h0bWwnIHx8IGdldE5vZGVOYW1lKG9mZnNldFBhcmVudCkgPT09ICdib2R5JyAmJiBnZXRDb21wdXRlZFN0eWxlKG9mZnNldFBhcmVudCkucG9zaXRpb24gPT09ICdzdGF0aWMnKSkge1xuICAgIHJldHVybiB3aW5kb3c7XG4gIH1cblxuICByZXR1cm4gb2Zmc2V0UGFyZW50IHx8IGdldENvbnRhaW5pbmdCbG9jayhlbGVtZW50KSB8fCB3aW5kb3c7XG59IiwiaW1wb3J0IGdldE5vZGVOYW1lIGZyb20gXCIuL2dldE5vZGVOYW1lLmpzXCI7XG5pbXBvcnQgZ2V0RG9jdW1lbnRFbGVtZW50IGZyb20gXCIuL2dldERvY3VtZW50RWxlbWVudC5qc1wiO1xuaW1wb3J0IHsgaXNTaGFkb3dSb290IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0UGFyZW50Tm9kZShlbGVtZW50KSB7XG4gIGlmIChnZXROb2RlTmFtZShlbGVtZW50KSA9PT0gJ2h0bWwnKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICByZXR1cm4gKC8vIHRoaXMgaXMgYSBxdWlja2VyIChidXQgbGVzcyB0eXBlIHNhZmUpIHdheSB0byBzYXZlIHF1aXRlIHNvbWUgYnl0ZXMgZnJvbSB0aGUgYnVuZGxlXG4gICAgLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtcmV0dXJuXVxuICAgIC8vICRGbG93Rml4TWVbcHJvcC1taXNzaW5nXVxuICAgIGVsZW1lbnQuYXNzaWduZWRTbG90IHx8IC8vIHN0ZXAgaW50byB0aGUgc2hhZG93IERPTSBvZiB0aGUgcGFyZW50IG9mIGEgc2xvdHRlZCBub2RlXG4gICAgZWxlbWVudC5wYXJlbnROb2RlIHx8ICggLy8gRE9NIEVsZW1lbnQgZGV0ZWN0ZWRcbiAgICBpc1NoYWRvd1Jvb3QoZWxlbWVudCkgPyBlbGVtZW50Lmhvc3QgOiBudWxsKSB8fCAvLyBTaGFkb3dSb290IGRldGVjdGVkXG4gICAgLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtY2FsbF06IEhUTUxFbGVtZW50IGlzIGEgTm9kZVxuICAgIGdldERvY3VtZW50RWxlbWVudChlbGVtZW50KSAvLyBmYWxsYmFja1xuXG4gICk7XG59IiwiaW1wb3J0IGdldFBhcmVudE5vZGUgZnJvbSBcIi4vZ2V0UGFyZW50Tm9kZS5qc1wiO1xuaW1wb3J0IGlzU2Nyb2xsUGFyZW50IGZyb20gXCIuL2lzU2Nyb2xsUGFyZW50LmpzXCI7XG5pbXBvcnQgZ2V0Tm9kZU5hbWUgZnJvbSBcIi4vZ2V0Tm9kZU5hbWUuanNcIjtcbmltcG9ydCB7IGlzSFRNTEVsZW1lbnQgfSBmcm9tIFwiLi9pbnN0YW5jZU9mLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRTY3JvbGxQYXJlbnQobm9kZSkge1xuICBpZiAoWydodG1sJywgJ2JvZHknLCAnI2RvY3VtZW50J10uaW5kZXhPZihnZXROb2RlTmFtZShub2RlKSkgPj0gMCkge1xuICAgIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXJldHVybl06IGFzc3VtZSBib2R5IGlzIGFsd2F5cyBhdmFpbGFibGVcbiAgICByZXR1cm4gbm9kZS5vd25lckRvY3VtZW50LmJvZHk7XG4gIH1cblxuICBpZiAoaXNIVE1MRWxlbWVudChub2RlKSAmJiBpc1Njcm9sbFBhcmVudChub2RlKSkge1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgcmV0dXJuIGdldFNjcm9sbFBhcmVudChnZXRQYXJlbnROb2RlKG5vZGUpKTtcbn0iLCJpbXBvcnQgZ2V0V2luZG93IGZyb20gXCIuL2dldFdpbmRvdy5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRXaW5kb3dTY3JvbGxCYXJYIGZyb20gXCIuL2dldFdpbmRvd1Njcm9sbEJhclguanNcIjtcbmltcG9ydCBpc0xheW91dFZpZXdwb3J0IGZyb20gXCIuL2lzTGF5b3V0Vmlld3BvcnQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFZpZXdwb3J0UmVjdChlbGVtZW50LCBzdHJhdGVneSkge1xuICB2YXIgd2luID0gZ2V0V2luZG93KGVsZW1lbnQpO1xuICB2YXIgaHRtbCA9IGdldERvY3VtZW50RWxlbWVudChlbGVtZW50KTtcbiAgdmFyIHZpc3VhbFZpZXdwb3J0ID0gd2luLnZpc3VhbFZpZXdwb3J0O1xuICB2YXIgd2lkdGggPSBodG1sLmNsaWVudFdpZHRoO1xuICB2YXIgaGVpZ2h0ID0gaHRtbC5jbGllbnRIZWlnaHQ7XG4gIHZhciB4ID0gMDtcbiAgdmFyIHkgPSAwO1xuXG4gIGlmICh2aXN1YWxWaWV3cG9ydCkge1xuICAgIHdpZHRoID0gdmlzdWFsVmlld3BvcnQud2lkdGg7XG4gICAgaGVpZ2h0ID0gdmlzdWFsVmlld3BvcnQuaGVpZ2h0O1xuICAgIHZhciBsYXlvdXRWaWV3cG9ydCA9IGlzTGF5b3V0Vmlld3BvcnQoKTtcblxuICAgIGlmIChsYXlvdXRWaWV3cG9ydCB8fCAhbGF5b3V0Vmlld3BvcnQgJiYgc3RyYXRlZ3kgPT09ICdmaXhlZCcpIHtcbiAgICAgIHggPSB2aXN1YWxWaWV3cG9ydC5vZmZzZXRMZWZ0O1xuICAgICAgeSA9IHZpc3VhbFZpZXdwb3J0Lm9mZnNldFRvcDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICB4OiB4ICsgZ2V0V2luZG93U2Nyb2xsQmFyWChlbGVtZW50KSxcbiAgICB5OiB5XG4gIH07XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0V2luZG93KG5vZGUpIHtcbiAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgIHJldHVybiB3aW5kb3c7XG4gIH1cblxuICBpZiAobm9kZS50b1N0cmluZygpICE9PSAnW29iamVjdCBXaW5kb3ddJykge1xuICAgIHZhciBvd25lckRvY3VtZW50ID0gbm9kZS5vd25lckRvY3VtZW50O1xuICAgIHJldHVybiBvd25lckRvY3VtZW50ID8gb3duZXJEb2N1bWVudC5kZWZhdWx0VmlldyB8fCB3aW5kb3cgOiB3aW5kb3c7XG4gIH1cblxuICByZXR1cm4gbm9kZTtcbn0iLCJpbXBvcnQgZ2V0V2luZG93IGZyb20gXCIuL2dldFdpbmRvdy5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0V2luZG93U2Nyb2xsKG5vZGUpIHtcbiAgdmFyIHdpbiA9IGdldFdpbmRvdyhub2RlKTtcbiAgdmFyIHNjcm9sbExlZnQgPSB3aW4ucGFnZVhPZmZzZXQ7XG4gIHZhciBzY3JvbGxUb3AgPSB3aW4ucGFnZVlPZmZzZXQ7XG4gIHJldHVybiB7XG4gICAgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCxcbiAgICBzY3JvbGxUb3A6IHNjcm9sbFRvcFxuICB9O1xufSIsImltcG9ydCBnZXRCb3VuZGluZ0NsaWVudFJlY3QgZnJvbSBcIi4vZ2V0Qm91bmRpbmdDbGllbnRSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0RG9jdW1lbnRFbGVtZW50IGZyb20gXCIuL2dldERvY3VtZW50RWxlbWVudC5qc1wiO1xuaW1wb3J0IGdldFdpbmRvd1Njcm9sbCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGwuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFdpbmRvd1Njcm9sbEJhclgoZWxlbWVudCkge1xuICAvLyBJZiA8aHRtbD4gaGFzIGEgQ1NTIHdpZHRoIGdyZWF0ZXIgdGhhbiB0aGUgdmlld3BvcnQsIHRoZW4gdGhpcyB3aWxsIGJlXG4gIC8vIGluY29ycmVjdCBmb3IgUlRMLlxuICAvLyBQb3BwZXIgMSBpcyBicm9rZW4gaW4gdGhpcyBjYXNlIGFuZCBuZXZlciBoYWQgYSBidWcgcmVwb3J0IHNvIGxldCdzIGFzc3VtZVxuICAvLyBpdCdzIG5vdCBhbiBpc3N1ZS4gSSBkb24ndCB0aGluayBhbnlvbmUgZXZlciBzcGVjaWZpZXMgd2lkdGggb24gPGh0bWw+XG4gIC8vIGFueXdheS5cbiAgLy8gQnJvd3NlcnMgd2hlcmUgdGhlIGxlZnQgc2Nyb2xsYmFyIGRvZXNuJ3QgY2F1c2UgYW4gaXNzdWUgcmVwb3J0IGAwYCBmb3JcbiAgLy8gdGhpcyAoZS5nLiBFZGdlIDIwMTksIElFMTEsIFNhZmFyaSlcbiAgcmV0dXJuIGdldEJvdW5kaW5nQ2xpZW50UmVjdChnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCkpLmxlZnQgKyBnZXRXaW5kb3dTY3JvbGwoZWxlbWVudCkuc2Nyb2xsTGVmdDtcbn0iLCJpbXBvcnQgZ2V0V2luZG93IGZyb20gXCIuL2dldFdpbmRvdy5qc1wiO1xuXG5mdW5jdGlvbiBpc0VsZW1lbnQobm9kZSkge1xuICB2YXIgT3duRWxlbWVudCA9IGdldFdpbmRvdyhub2RlKS5FbGVtZW50O1xuICByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIE93bkVsZW1lbnQgfHwgbm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGlzSFRNTEVsZW1lbnQobm9kZSkge1xuICB2YXIgT3duRWxlbWVudCA9IGdldFdpbmRvdyhub2RlKS5IVE1MRWxlbWVudDtcbiAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBPd25FbGVtZW50IHx8IG5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gaXNTaGFkb3dSb290KG5vZGUpIHtcbiAgLy8gSUUgMTEgaGFzIG5vIFNoYWRvd1Jvb3RcbiAgaWYgKHR5cGVvZiBTaGFkb3dSb290ID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBPd25FbGVtZW50ID0gZ2V0V2luZG93KG5vZGUpLlNoYWRvd1Jvb3Q7XG4gIHJldHVybiBub2RlIGluc3RhbmNlb2YgT3duRWxlbWVudCB8fCBub2RlIGluc3RhbmNlb2YgU2hhZG93Um9vdDtcbn1cblxuZXhwb3J0IHsgaXNFbGVtZW50LCBpc0hUTUxFbGVtZW50LCBpc1NoYWRvd1Jvb3QgfTsiLCJpbXBvcnQgZ2V0VUFTdHJpbmcgZnJvbSBcIi4uL3V0aWxzL3VzZXJBZ2VudC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNMYXlvdXRWaWV3cG9ydCgpIHtcbiAgcmV0dXJuICEvXigoPyFjaHJvbWV8YW5kcm9pZCkuKSpzYWZhcmkvaS50ZXN0KGdldFVBU3RyaW5nKCkpO1xufSIsImltcG9ydCBnZXRDb21wdXRlZFN0eWxlIGZyb20gXCIuL2dldENvbXB1dGVkU3R5bGUuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzU2Nyb2xsUGFyZW50KGVsZW1lbnQpIHtcbiAgLy8gRmlyZWZveCB3YW50cyB1cyB0byBjaGVjayBgLXhgIGFuZCBgLXlgIHZhcmlhdGlvbnMgYXMgd2VsbFxuICB2YXIgX2dldENvbXB1dGVkU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLFxuICAgICAgb3ZlcmZsb3cgPSBfZ2V0Q29tcHV0ZWRTdHlsZS5vdmVyZmxvdyxcbiAgICAgIG92ZXJmbG93WCA9IF9nZXRDb21wdXRlZFN0eWxlLm92ZXJmbG93WCxcbiAgICAgIG92ZXJmbG93WSA9IF9nZXRDb21wdXRlZFN0eWxlLm92ZXJmbG93WTtcblxuICByZXR1cm4gL2F1dG98c2Nyb2xsfG92ZXJsYXl8aGlkZGVuLy50ZXN0KG92ZXJmbG93ICsgb3ZlcmZsb3dZICsgb3ZlcmZsb3dYKTtcbn0iLCJpbXBvcnQgZ2V0Tm9kZU5hbWUgZnJvbSBcIi4vZ2V0Tm9kZU5hbWUuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzVGFibGVFbGVtZW50KGVsZW1lbnQpIHtcbiAgcmV0dXJuIFsndGFibGUnLCAndGQnLCAndGgnXS5pbmRleE9mKGdldE5vZGVOYW1lKGVsZW1lbnQpKSA+PSAwO1xufSIsImltcG9ydCBnZXRTY3JvbGxQYXJlbnQgZnJvbSBcIi4vZ2V0U2Nyb2xsUGFyZW50LmpzXCI7XG5pbXBvcnQgZ2V0UGFyZW50Tm9kZSBmcm9tIFwiLi9nZXRQYXJlbnROb2RlLmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93IGZyb20gXCIuL2dldFdpbmRvdy5qc1wiO1xuaW1wb3J0IGlzU2Nyb2xsUGFyZW50IGZyb20gXCIuL2lzU2Nyb2xsUGFyZW50LmpzXCI7XG4vKlxuZ2l2ZW4gYSBET00gZWxlbWVudCwgcmV0dXJuIHRoZSBsaXN0IG9mIGFsbCBzY3JvbGwgcGFyZW50cywgdXAgdGhlIGxpc3Qgb2YgYW5jZXNvcnNcbnVudGlsIHdlIGdldCB0byB0aGUgdG9wIHdpbmRvdyBvYmplY3QuIFRoaXMgbGlzdCBpcyB3aGF0IHdlIGF0dGFjaCBzY3JvbGwgbGlzdGVuZXJzXG50bywgYmVjYXVzZSBpZiBhbnkgb2YgdGhlc2UgcGFyZW50IGVsZW1lbnRzIHNjcm9sbCwgd2UnbGwgbmVlZCB0byByZS1jYWxjdWxhdGUgdGhlXG5yZWZlcmVuY2UgZWxlbWVudCdzIHBvc2l0aW9uLlxuKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGlzdFNjcm9sbFBhcmVudHMoZWxlbWVudCwgbGlzdCkge1xuICB2YXIgX2VsZW1lbnQkb3duZXJEb2N1bWVuO1xuXG4gIGlmIChsaXN0ID09PSB2b2lkIDApIHtcbiAgICBsaXN0ID0gW107XG4gIH1cblxuICB2YXIgc2Nyb2xsUGFyZW50ID0gZ2V0U2Nyb2xsUGFyZW50KGVsZW1lbnQpO1xuICB2YXIgaXNCb2R5ID0gc2Nyb2xsUGFyZW50ID09PSAoKF9lbGVtZW50JG93bmVyRG9jdW1lbiA9IGVsZW1lbnQub3duZXJEb2N1bWVudCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9lbGVtZW50JG93bmVyRG9jdW1lbi5ib2R5KTtcbiAgdmFyIHdpbiA9IGdldFdpbmRvdyhzY3JvbGxQYXJlbnQpO1xuICB2YXIgdGFyZ2V0ID0gaXNCb2R5ID8gW3dpbl0uY29uY2F0KHdpbi52aXN1YWxWaWV3cG9ydCB8fCBbXSwgaXNTY3JvbGxQYXJlbnQoc2Nyb2xsUGFyZW50KSA/IHNjcm9sbFBhcmVudCA6IFtdKSA6IHNjcm9sbFBhcmVudDtcbiAgdmFyIHVwZGF0ZWRMaXN0ID0gbGlzdC5jb25jYXQodGFyZ2V0KTtcbiAgcmV0dXJuIGlzQm9keSA/IHVwZGF0ZWRMaXN0IDogLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtY2FsbF06IGlzQm9keSB0ZWxscyB1cyB0YXJnZXQgd2lsbCBiZSBhbiBIVE1MRWxlbWVudCBoZXJlXG4gIHVwZGF0ZWRMaXN0LmNvbmNhdChsaXN0U2Nyb2xsUGFyZW50cyhnZXRQYXJlbnROb2RlKHRhcmdldCkpKTtcbn0iLCJleHBvcnQgdmFyIHRvcCA9ICd0b3AnO1xuZXhwb3J0IHZhciBib3R0b20gPSAnYm90dG9tJztcbmV4cG9ydCB2YXIgcmlnaHQgPSAncmlnaHQnO1xuZXhwb3J0IHZhciBsZWZ0ID0gJ2xlZnQnO1xuZXhwb3J0IHZhciBhdXRvID0gJ2F1dG8nO1xuZXhwb3J0IHZhciBiYXNlUGxhY2VtZW50cyA9IFt0b3AsIGJvdHRvbSwgcmlnaHQsIGxlZnRdO1xuZXhwb3J0IHZhciBzdGFydCA9ICdzdGFydCc7XG5leHBvcnQgdmFyIGVuZCA9ICdlbmQnO1xuZXhwb3J0IHZhciBjbGlwcGluZ1BhcmVudHMgPSAnY2xpcHBpbmdQYXJlbnRzJztcbmV4cG9ydCB2YXIgdmlld3BvcnQgPSAndmlld3BvcnQnO1xuZXhwb3J0IHZhciBwb3BwZXIgPSAncG9wcGVyJztcbmV4cG9ydCB2YXIgcmVmZXJlbmNlID0gJ3JlZmVyZW5jZSc7XG5leHBvcnQgdmFyIHZhcmlhdGlvblBsYWNlbWVudHMgPSAvKiNfX1BVUkVfXyovYmFzZVBsYWNlbWVudHMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHBsYWNlbWVudCkge1xuICByZXR1cm4gYWNjLmNvbmNhdChbcGxhY2VtZW50ICsgXCItXCIgKyBzdGFydCwgcGxhY2VtZW50ICsgXCItXCIgKyBlbmRdKTtcbn0sIFtdKTtcbmV4cG9ydCB2YXIgcGxhY2VtZW50cyA9IC8qI19fUFVSRV9fKi9bXS5jb25jYXQoYmFzZVBsYWNlbWVudHMsIFthdXRvXSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHBsYWNlbWVudCkge1xuICByZXR1cm4gYWNjLmNvbmNhdChbcGxhY2VtZW50LCBwbGFjZW1lbnQgKyBcIi1cIiArIHN0YXJ0LCBwbGFjZW1lbnQgKyBcIi1cIiArIGVuZF0pO1xufSwgW10pOyAvLyBtb2RpZmllcnMgdGhhdCBuZWVkIHRvIHJlYWQgdGhlIERPTVxuXG5leHBvcnQgdmFyIGJlZm9yZVJlYWQgPSAnYmVmb3JlUmVhZCc7XG5leHBvcnQgdmFyIHJlYWQgPSAncmVhZCc7XG5leHBvcnQgdmFyIGFmdGVyUmVhZCA9ICdhZnRlclJlYWQnOyAvLyBwdXJlLWxvZ2ljIG1vZGlmaWVyc1xuXG5leHBvcnQgdmFyIGJlZm9yZU1haW4gPSAnYmVmb3JlTWFpbic7XG5leHBvcnQgdmFyIG1haW4gPSAnbWFpbic7XG5leHBvcnQgdmFyIGFmdGVyTWFpbiA9ICdhZnRlck1haW4nOyAvLyBtb2RpZmllciB3aXRoIHRoZSBwdXJwb3NlIHRvIHdyaXRlIHRvIHRoZSBET00gKG9yIHdyaXRlIGludG8gYSBmcmFtZXdvcmsgc3RhdGUpXG5cbmV4cG9ydCB2YXIgYmVmb3JlV3JpdGUgPSAnYmVmb3JlV3JpdGUnO1xuZXhwb3J0IHZhciB3cml0ZSA9ICd3cml0ZSc7XG5leHBvcnQgdmFyIGFmdGVyV3JpdGUgPSAnYWZ0ZXJXcml0ZSc7XG5leHBvcnQgdmFyIG1vZGlmaWVyUGhhc2VzID0gW2JlZm9yZVJlYWQsIHJlYWQsIGFmdGVyUmVhZCwgYmVmb3JlTWFpbiwgbWFpbiwgYWZ0ZXJNYWluLCBiZWZvcmVXcml0ZSwgd3JpdGUsIGFmdGVyV3JpdGVdOyIsImltcG9ydCBnZXROb2RlTmFtZSBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldE5vZGVOYW1lLmpzXCI7XG5pbXBvcnQgeyBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4uL2RvbS11dGlscy9pbnN0YW5jZU9mLmpzXCI7IC8vIFRoaXMgbW9kaWZpZXIgdGFrZXMgdGhlIHN0eWxlcyBwcmVwYXJlZCBieSB0aGUgYGNvbXB1dGVTdHlsZXNgIG1vZGlmaWVyXG4vLyBhbmQgYXBwbGllcyB0aGVtIHRvIHRoZSBIVE1MRWxlbWVudHMgc3VjaCBhcyBwb3BwZXIgYW5kIGFycm93XG5cbmZ1bmN0aW9uIGFwcGx5U3R5bGVzKF9yZWYpIHtcbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZTtcbiAgT2JqZWN0LmtleXMoc3RhdGUuZWxlbWVudHMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgc3R5bGUgPSBzdGF0ZS5zdHlsZXNbbmFtZV0gfHwge307XG4gICAgdmFyIGF0dHJpYnV0ZXMgPSBzdGF0ZS5hdHRyaWJ1dGVzW25hbWVdIHx8IHt9O1xuICAgIHZhciBlbGVtZW50ID0gc3RhdGUuZWxlbWVudHNbbmFtZV07IC8vIGFycm93IGlzIG9wdGlvbmFsICsgdmlydHVhbCBlbGVtZW50c1xuXG4gICAgaWYgKCFpc0hUTUxFbGVtZW50KGVsZW1lbnQpIHx8ICFnZXROb2RlTmFtZShlbGVtZW50KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gLy8gRmxvdyBkb2Vzbid0IHN1cHBvcnQgdG8gZXh0ZW5kIHRoaXMgcHJvcGVydHksIGJ1dCBpdCdzIHRoZSBtb3N0XG4gICAgLy8gZWZmZWN0aXZlIHdheSB0byBhcHBseSBzdHlsZXMgdG8gYW4gSFRNTEVsZW1lbnRcbiAgICAvLyAkRmxvd0ZpeE1lW2Nhbm5vdC13cml0ZV1cblxuXG4gICAgT2JqZWN0LmFzc2lnbihlbGVtZW50LnN0eWxlLCBzdHlsZSk7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgdmFyIHZhbHVlID0gYXR0cmlidXRlc1tuYW1lXTtcblxuICAgICAgaWYgKHZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlID09PSB0cnVlID8gJycgOiB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBlZmZlY3QoX3JlZjIpIHtcbiAgdmFyIHN0YXRlID0gX3JlZjIuc3RhdGU7XG4gIHZhciBpbml0aWFsU3R5bGVzID0ge1xuICAgIHBvcHBlcjoge1xuICAgICAgcG9zaXRpb246IHN0YXRlLm9wdGlvbnMuc3RyYXRlZ3ksXG4gICAgICBsZWZ0OiAnMCcsXG4gICAgICB0b3A6ICcwJyxcbiAgICAgIG1hcmdpbjogJzAnXG4gICAgfSxcbiAgICBhcnJvdzoge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcbiAgICB9LFxuICAgIHJlZmVyZW5jZToge31cbiAgfTtcbiAgT2JqZWN0LmFzc2lnbihzdGF0ZS5lbGVtZW50cy5wb3BwZXIuc3R5bGUsIGluaXRpYWxTdHlsZXMucG9wcGVyKTtcbiAgc3RhdGUuc3R5bGVzID0gaW5pdGlhbFN0eWxlcztcblxuICBpZiAoc3RhdGUuZWxlbWVudHMuYXJyb3cpIHtcbiAgICBPYmplY3QuYXNzaWduKHN0YXRlLmVsZW1lbnRzLmFycm93LnN0eWxlLCBpbml0aWFsU3R5bGVzLmFycm93KTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgT2JqZWN0LmtleXMoc3RhdGUuZWxlbWVudHMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIHZhciBlbGVtZW50ID0gc3RhdGUuZWxlbWVudHNbbmFtZV07XG4gICAgICB2YXIgYXR0cmlidXRlcyA9IHN0YXRlLmF0dHJpYnV0ZXNbbmFtZV0gfHwge307XG4gICAgICB2YXIgc3R5bGVQcm9wZXJ0aWVzID0gT2JqZWN0LmtleXMoc3RhdGUuc3R5bGVzLmhhc093blByb3BlcnR5KG5hbWUpID8gc3RhdGUuc3R5bGVzW25hbWVdIDogaW5pdGlhbFN0eWxlc1tuYW1lXSk7IC8vIFNldCBhbGwgdmFsdWVzIHRvIGFuIGVtcHR5IHN0cmluZyB0byB1bnNldCB0aGVtXG5cbiAgICAgIHZhciBzdHlsZSA9IHN0eWxlUHJvcGVydGllcy5yZWR1Y2UoZnVuY3Rpb24gKHN0eWxlLCBwcm9wZXJ0eSkge1xuICAgICAgICBzdHlsZVtwcm9wZXJ0eV0gPSAnJztcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgICAgfSwge30pOyAvLyBhcnJvdyBpcyBvcHRpb25hbCArIHZpcnR1YWwgZWxlbWVudHNcblxuICAgICAgaWYgKCFpc0hUTUxFbGVtZW50KGVsZW1lbnQpIHx8ICFnZXROb2RlTmFtZShlbGVtZW50KSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIE9iamVjdC5hc3NpZ24oZWxlbWVudC5zdHlsZSwgc3R5bGUpO1xuICAgICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChmdW5jdGlvbiAoYXR0cmlidXRlKSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ2FwcGx5U3R5bGVzJyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICd3cml0ZScsXG4gIGZuOiBhcHBseVN0eWxlcyxcbiAgZWZmZWN0OiBlZmZlY3QsXG4gIHJlcXVpcmVzOiBbJ2NvbXB1dGVTdHlsZXMnXVxufTsiLCJpbXBvcnQgZ2V0QmFzZVBsYWNlbWVudCBmcm9tIFwiLi4vdXRpbHMvZ2V0QmFzZVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IGdldExheW91dFJlY3QgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRMYXlvdXRSZWN0LmpzXCI7XG5pbXBvcnQgY29udGFpbnMgZnJvbSBcIi4uL2RvbS11dGlscy9jb250YWlucy5qc1wiO1xuaW1wb3J0IGdldE9mZnNldFBhcmVudCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldE9mZnNldFBhcmVudC5qc1wiO1xuaW1wb3J0IGdldE1haW5BeGlzRnJvbVBsYWNlbWVudCBmcm9tIFwiLi4vdXRpbHMvZ2V0TWFpbkF4aXNGcm9tUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgeyB3aXRoaW4gfSBmcm9tIFwiLi4vdXRpbHMvd2l0aGluLmpzXCI7XG5pbXBvcnQgbWVyZ2VQYWRkaW5nT2JqZWN0IGZyb20gXCIuLi91dGlscy9tZXJnZVBhZGRpbmdPYmplY3QuanNcIjtcbmltcG9ydCBleHBhbmRUb0hhc2hNYXAgZnJvbSBcIi4uL3V0aWxzL2V4cGFuZFRvSGFzaE1hcC5qc1wiO1xuaW1wb3J0IHsgbGVmdCwgcmlnaHQsIGJhc2VQbGFjZW1lbnRzLCB0b3AsIGJvdHRvbSB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IHsgaXNIVE1MRWxlbWVudCB9IGZyb20gXCIuLi9kb20tdXRpbHMvaW5zdGFuY2VPZi5qc1wiOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbnZhciB0b1BhZGRpbmdPYmplY3QgPSBmdW5jdGlvbiB0b1BhZGRpbmdPYmplY3QocGFkZGluZywgc3RhdGUpIHtcbiAgcGFkZGluZyA9IHR5cGVvZiBwYWRkaW5nID09PSAnZnVuY3Rpb24nID8gcGFkZGluZyhPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5yZWN0cywge1xuICAgIHBsYWNlbWVudDogc3RhdGUucGxhY2VtZW50XG4gIH0pKSA6IHBhZGRpbmc7XG4gIHJldHVybiBtZXJnZVBhZGRpbmdPYmplY3QodHlwZW9mIHBhZGRpbmcgIT09ICdudW1iZXInID8gcGFkZGluZyA6IGV4cGFuZFRvSGFzaE1hcChwYWRkaW5nLCBiYXNlUGxhY2VtZW50cykpO1xufTtcblxuZnVuY3Rpb24gYXJyb3coX3JlZikge1xuICB2YXIgX3N0YXRlJG1vZGlmaWVyc0RhdGEkO1xuXG4gIHZhciBzdGF0ZSA9IF9yZWYuc3RhdGUsXG4gICAgICBuYW1lID0gX3JlZi5uYW1lLFxuICAgICAgb3B0aW9ucyA9IF9yZWYub3B0aW9ucztcbiAgdmFyIGFycm93RWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzLmFycm93O1xuICB2YXIgcG9wcGVyT2Zmc2V0cyA9IHN0YXRlLm1vZGlmaWVyc0RhdGEucG9wcGVyT2Zmc2V0cztcbiAgdmFyIGJhc2VQbGFjZW1lbnQgPSBnZXRCYXNlUGxhY2VtZW50KHN0YXRlLnBsYWNlbWVudCk7XG4gIHZhciBheGlzID0gZ2V0TWFpbkF4aXNGcm9tUGxhY2VtZW50KGJhc2VQbGFjZW1lbnQpO1xuICB2YXIgaXNWZXJ0aWNhbCA9IFtsZWZ0LCByaWdodF0uaW5kZXhPZihiYXNlUGxhY2VtZW50KSA+PSAwO1xuICB2YXIgbGVuID0gaXNWZXJ0aWNhbCA/ICdoZWlnaHQnIDogJ3dpZHRoJztcblxuICBpZiAoIWFycm93RWxlbWVudCB8fCAhcG9wcGVyT2Zmc2V0cykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBwYWRkaW5nT2JqZWN0ID0gdG9QYWRkaW5nT2JqZWN0KG9wdGlvbnMucGFkZGluZywgc3RhdGUpO1xuICB2YXIgYXJyb3dSZWN0ID0gZ2V0TGF5b3V0UmVjdChhcnJvd0VsZW1lbnQpO1xuICB2YXIgbWluUHJvcCA9IGF4aXMgPT09ICd5JyA/IHRvcCA6IGxlZnQ7XG4gIHZhciBtYXhQcm9wID0gYXhpcyA9PT0gJ3knID8gYm90dG9tIDogcmlnaHQ7XG4gIHZhciBlbmREaWZmID0gc3RhdGUucmVjdHMucmVmZXJlbmNlW2xlbl0gKyBzdGF0ZS5yZWN0cy5yZWZlcmVuY2VbYXhpc10gLSBwb3BwZXJPZmZzZXRzW2F4aXNdIC0gc3RhdGUucmVjdHMucG9wcGVyW2xlbl07XG4gIHZhciBzdGFydERpZmYgPSBwb3BwZXJPZmZzZXRzW2F4aXNdIC0gc3RhdGUucmVjdHMucmVmZXJlbmNlW2F4aXNdO1xuICB2YXIgYXJyb3dPZmZzZXRQYXJlbnQgPSBnZXRPZmZzZXRQYXJlbnQoYXJyb3dFbGVtZW50KTtcbiAgdmFyIGNsaWVudFNpemUgPSBhcnJvd09mZnNldFBhcmVudCA/IGF4aXMgPT09ICd5JyA/IGFycm93T2Zmc2V0UGFyZW50LmNsaWVudEhlaWdodCB8fCAwIDogYXJyb3dPZmZzZXRQYXJlbnQuY2xpZW50V2lkdGggfHwgMCA6IDA7XG4gIHZhciBjZW50ZXJUb1JlZmVyZW5jZSA9IGVuZERpZmYgLyAyIC0gc3RhcnREaWZmIC8gMjsgLy8gTWFrZSBzdXJlIHRoZSBhcnJvdyBkb2Vzbid0IG92ZXJmbG93IHRoZSBwb3BwZXIgaWYgdGhlIGNlbnRlciBwb2ludCBpc1xuICAvLyBvdXRzaWRlIG9mIHRoZSBwb3BwZXIgYm91bmRzXG5cbiAgdmFyIG1pbiA9IHBhZGRpbmdPYmplY3RbbWluUHJvcF07XG4gIHZhciBtYXggPSBjbGllbnRTaXplIC0gYXJyb3dSZWN0W2xlbl0gLSBwYWRkaW5nT2JqZWN0W21heFByb3BdO1xuICB2YXIgY2VudGVyID0gY2xpZW50U2l6ZSAvIDIgLSBhcnJvd1JlY3RbbGVuXSAvIDIgKyBjZW50ZXJUb1JlZmVyZW5jZTtcbiAgdmFyIG9mZnNldCA9IHdpdGhpbihtaW4sIGNlbnRlciwgbWF4KTsgLy8gUHJldmVudHMgYnJlYWtpbmcgc3ludGF4IGhpZ2hsaWdodGluZy4uLlxuXG4gIHZhciBheGlzUHJvcCA9IGF4aXM7XG4gIHN0YXRlLm1vZGlmaWVyc0RhdGFbbmFtZV0gPSAoX3N0YXRlJG1vZGlmaWVyc0RhdGEkID0ge30sIF9zdGF0ZSRtb2RpZmllcnNEYXRhJFtheGlzUHJvcF0gPSBvZmZzZXQsIF9zdGF0ZSRtb2RpZmllcnNEYXRhJC5jZW50ZXJPZmZzZXQgPSBvZmZzZXQgLSBjZW50ZXIsIF9zdGF0ZSRtb2RpZmllcnNEYXRhJCk7XG59XG5cbmZ1bmN0aW9uIGVmZmVjdChfcmVmMikge1xuICB2YXIgc3RhdGUgPSBfcmVmMi5zdGF0ZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmMi5vcHRpb25zO1xuICB2YXIgX29wdGlvbnMkZWxlbWVudCA9IG9wdGlvbnMuZWxlbWVudCxcbiAgICAgIGFycm93RWxlbWVudCA9IF9vcHRpb25zJGVsZW1lbnQgPT09IHZvaWQgMCA/ICdbZGF0YS1wb3BwZXItYXJyb3ddJyA6IF9vcHRpb25zJGVsZW1lbnQ7XG5cbiAgaWYgKGFycm93RWxlbWVudCA9PSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9IC8vIENTUyBzZWxlY3RvclxuXG5cbiAgaWYgKHR5cGVvZiBhcnJvd0VsZW1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgYXJyb3dFbGVtZW50ID0gc3RhdGUuZWxlbWVudHMucG9wcGVyLnF1ZXJ5U2VsZWN0b3IoYXJyb3dFbGVtZW50KTtcblxuICAgIGlmICghYXJyb3dFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgIGlmICghaXNIVE1MRWxlbWVudChhcnJvd0VsZW1lbnQpKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFsnUG9wcGVyOiBcImFycm93XCIgZWxlbWVudCBtdXN0IGJlIGFuIEhUTUxFbGVtZW50IChub3QgYW4gU1ZHRWxlbWVudCkuJywgJ1RvIHVzZSBhbiBTVkcgYXJyb3csIHdyYXAgaXQgaW4gYW4gSFRNTEVsZW1lbnQgdGhhdCB3aWxsIGJlIHVzZWQgYXMnLCAndGhlIGFycm93LiddLmpvaW4oJyAnKSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb250YWlucyhzdGF0ZS5lbGVtZW50cy5wb3BwZXIsIGFycm93RWxlbWVudCkpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFsnUG9wcGVyOiBcImFycm93XCIgbW9kaWZpZXJcXCdzIGBlbGVtZW50YCBtdXN0IGJlIGEgY2hpbGQgb2YgdGhlIHBvcHBlcicsICdlbGVtZW50LiddLmpvaW4oJyAnKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgc3RhdGUuZWxlbWVudHMuYXJyb3cgPSBhcnJvd0VsZW1lbnQ7XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdhcnJvdycsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnbWFpbicsXG4gIGZuOiBhcnJvdyxcbiAgZWZmZWN0OiBlZmZlY3QsXG4gIHJlcXVpcmVzOiBbJ3BvcHBlck9mZnNldHMnXSxcbiAgcmVxdWlyZXNJZkV4aXN0czogWydwcmV2ZW50T3ZlcmZsb3cnXVxufTsiLCJpbXBvcnQgeyB0b3AsIGxlZnQsIHJpZ2h0LCBib3R0b20sIGVuZCB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IGdldE9mZnNldFBhcmVudCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldE9mZnNldFBhcmVudC5qc1wiO1xuaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldFdpbmRvdy5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldERvY3VtZW50RWxlbWVudC5qc1wiO1xuaW1wb3J0IGdldENvbXB1dGVkU3R5bGUgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRDb21wdXRlZFN0eWxlLmpzXCI7XG5pbXBvcnQgZ2V0QmFzZVBsYWNlbWVudCBmcm9tIFwiLi4vdXRpbHMvZ2V0QmFzZVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IGdldFZhcmlhdGlvbiBmcm9tIFwiLi4vdXRpbHMvZ2V0VmFyaWF0aW9uLmpzXCI7XG5pbXBvcnQgeyByb3VuZCB9IGZyb20gXCIuLi91dGlscy9tYXRoLmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxudmFyIHVuc2V0U2lkZXMgPSB7XG4gIHRvcDogJ2F1dG8nLFxuICByaWdodDogJ2F1dG8nLFxuICBib3R0b206ICdhdXRvJyxcbiAgbGVmdDogJ2F1dG8nXG59OyAvLyBSb3VuZCB0aGUgb2Zmc2V0cyB0byB0aGUgbmVhcmVzdCBzdWl0YWJsZSBzdWJwaXhlbCBiYXNlZCBvbiB0aGUgRFBSLlxuLy8gWm9vbWluZyBjYW4gY2hhbmdlIHRoZSBEUFIsIGJ1dCBpdCBzZWVtcyB0byByZXBvcnQgYSB2YWx1ZSB0aGF0IHdpbGxcbi8vIGNsZWFubHkgZGl2aWRlIHRoZSB2YWx1ZXMgaW50byB0aGUgYXBwcm9wcmlhdGUgc3VicGl4ZWxzLlxuXG5mdW5jdGlvbiByb3VuZE9mZnNldHNCeURQUihfcmVmLCB3aW4pIHtcbiAgdmFyIHggPSBfcmVmLngsXG4gICAgICB5ID0gX3JlZi55O1xuICB2YXIgZHByID0gd2luLmRldmljZVBpeGVsUmF0aW8gfHwgMTtcbiAgcmV0dXJuIHtcbiAgICB4OiByb3VuZCh4ICogZHByKSAvIGRwciB8fCAwLFxuICAgIHk6IHJvdW5kKHkgKiBkcHIpIC8gZHByIHx8IDBcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcFRvU3R5bGVzKF9yZWYyKSB7XG4gIHZhciBfT2JqZWN0JGFzc2lnbjI7XG5cbiAgdmFyIHBvcHBlciA9IF9yZWYyLnBvcHBlcixcbiAgICAgIHBvcHBlclJlY3QgPSBfcmVmMi5wb3BwZXJSZWN0LFxuICAgICAgcGxhY2VtZW50ID0gX3JlZjIucGxhY2VtZW50LFxuICAgICAgdmFyaWF0aW9uID0gX3JlZjIudmFyaWF0aW9uLFxuICAgICAgb2Zmc2V0cyA9IF9yZWYyLm9mZnNldHMsXG4gICAgICBwb3NpdGlvbiA9IF9yZWYyLnBvc2l0aW9uLFxuICAgICAgZ3B1QWNjZWxlcmF0aW9uID0gX3JlZjIuZ3B1QWNjZWxlcmF0aW9uLFxuICAgICAgYWRhcHRpdmUgPSBfcmVmMi5hZGFwdGl2ZSxcbiAgICAgIHJvdW5kT2Zmc2V0cyA9IF9yZWYyLnJvdW5kT2Zmc2V0cyxcbiAgICAgIGlzRml4ZWQgPSBfcmVmMi5pc0ZpeGVkO1xuICB2YXIgX29mZnNldHMkeCA9IG9mZnNldHMueCxcbiAgICAgIHggPSBfb2Zmc2V0cyR4ID09PSB2b2lkIDAgPyAwIDogX29mZnNldHMkeCxcbiAgICAgIF9vZmZzZXRzJHkgPSBvZmZzZXRzLnksXG4gICAgICB5ID0gX29mZnNldHMkeSA9PT0gdm9pZCAwID8gMCA6IF9vZmZzZXRzJHk7XG5cbiAgdmFyIF9yZWYzID0gdHlwZW9mIHJvdW5kT2Zmc2V0cyA9PT0gJ2Z1bmN0aW9uJyA/IHJvdW5kT2Zmc2V0cyh7XG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH0pIDoge1xuICAgIHg6IHgsXG4gICAgeTogeVxuICB9O1xuXG4gIHggPSBfcmVmMy54O1xuICB5ID0gX3JlZjMueTtcbiAgdmFyIGhhc1ggPSBvZmZzZXRzLmhhc093blByb3BlcnR5KCd4Jyk7XG4gIHZhciBoYXNZID0gb2Zmc2V0cy5oYXNPd25Qcm9wZXJ0eSgneScpO1xuICB2YXIgc2lkZVggPSBsZWZ0O1xuICB2YXIgc2lkZVkgPSB0b3A7XG4gIHZhciB3aW4gPSB3aW5kb3c7XG5cbiAgaWYgKGFkYXB0aXZlKSB7XG4gICAgdmFyIG9mZnNldFBhcmVudCA9IGdldE9mZnNldFBhcmVudChwb3BwZXIpO1xuICAgIHZhciBoZWlnaHRQcm9wID0gJ2NsaWVudEhlaWdodCc7XG4gICAgdmFyIHdpZHRoUHJvcCA9ICdjbGllbnRXaWR0aCc7XG5cbiAgICBpZiAob2Zmc2V0UGFyZW50ID09PSBnZXRXaW5kb3cocG9wcGVyKSkge1xuICAgICAgb2Zmc2V0UGFyZW50ID0gZ2V0RG9jdW1lbnRFbGVtZW50KHBvcHBlcik7XG5cbiAgICAgIGlmIChnZXRDb21wdXRlZFN0eWxlKG9mZnNldFBhcmVudCkucG9zaXRpb24gIT09ICdzdGF0aWMnICYmIHBvc2l0aW9uID09PSAnYWJzb2x1dGUnKSB7XG4gICAgICAgIGhlaWdodFByb3AgPSAnc2Nyb2xsSGVpZ2h0JztcbiAgICAgICAgd2lkdGhQcm9wID0gJ3Njcm9sbFdpZHRoJztcbiAgICAgIH1cbiAgICB9IC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLWNhc3RdOiBmb3JjZSB0eXBlIHJlZmluZW1lbnQsIHdlIGNvbXBhcmUgb2Zmc2V0UGFyZW50IHdpdGggd2luZG93IGFib3ZlLCBidXQgRmxvdyBkb2Vzbid0IGRldGVjdCBpdFxuXG5cbiAgICBvZmZzZXRQYXJlbnQgPSBvZmZzZXRQYXJlbnQ7XG5cbiAgICBpZiAocGxhY2VtZW50ID09PSB0b3AgfHwgKHBsYWNlbWVudCA9PT0gbGVmdCB8fCBwbGFjZW1lbnQgPT09IHJpZ2h0KSAmJiB2YXJpYXRpb24gPT09IGVuZCkge1xuICAgICAgc2lkZVkgPSBib3R0b207XG4gICAgICB2YXIgb2Zmc2V0WSA9IGlzRml4ZWQgJiYgb2Zmc2V0UGFyZW50ID09PSB3aW4gJiYgd2luLnZpc3VhbFZpZXdwb3J0ID8gd2luLnZpc3VhbFZpZXdwb3J0LmhlaWdodCA6IC8vICRGbG93Rml4TWVbcHJvcC1taXNzaW5nXVxuICAgICAgb2Zmc2V0UGFyZW50W2hlaWdodFByb3BdO1xuICAgICAgeSAtPSBvZmZzZXRZIC0gcG9wcGVyUmVjdC5oZWlnaHQ7XG4gICAgICB5ICo9IGdwdUFjY2VsZXJhdGlvbiA/IDEgOiAtMTtcbiAgICB9XG5cbiAgICBpZiAocGxhY2VtZW50ID09PSBsZWZ0IHx8IChwbGFjZW1lbnQgPT09IHRvcCB8fCBwbGFjZW1lbnQgPT09IGJvdHRvbSkgJiYgdmFyaWF0aW9uID09PSBlbmQpIHtcbiAgICAgIHNpZGVYID0gcmlnaHQ7XG4gICAgICB2YXIgb2Zmc2V0WCA9IGlzRml4ZWQgJiYgb2Zmc2V0UGFyZW50ID09PSB3aW4gJiYgd2luLnZpc3VhbFZpZXdwb3J0ID8gd2luLnZpc3VhbFZpZXdwb3J0LndpZHRoIDogLy8gJEZsb3dGaXhNZVtwcm9wLW1pc3NpbmddXG4gICAgICBvZmZzZXRQYXJlbnRbd2lkdGhQcm9wXTtcbiAgICAgIHggLT0gb2Zmc2V0WCAtIHBvcHBlclJlY3Qud2lkdGg7XG4gICAgICB4ICo9IGdwdUFjY2VsZXJhdGlvbiA/IDEgOiAtMTtcbiAgICB9XG4gIH1cblxuICB2YXIgY29tbW9uU3R5bGVzID0gT2JqZWN0LmFzc2lnbih7XG4gICAgcG9zaXRpb246IHBvc2l0aW9uXG4gIH0sIGFkYXB0aXZlICYmIHVuc2V0U2lkZXMpO1xuXG4gIHZhciBfcmVmNCA9IHJvdW5kT2Zmc2V0cyA9PT0gdHJ1ZSA/IHJvdW5kT2Zmc2V0c0J5RFBSKHtcbiAgICB4OiB4LFxuICAgIHk6IHlcbiAgfSwgZ2V0V2luZG93KHBvcHBlcikpIDoge1xuICAgIHg6IHgsXG4gICAgeTogeVxuICB9O1xuXG4gIHggPSBfcmVmNC54O1xuICB5ID0gX3JlZjQueTtcblxuICBpZiAoZ3B1QWNjZWxlcmF0aW9uKSB7XG4gICAgdmFyIF9PYmplY3QkYXNzaWduO1xuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblN0eWxlcywgKF9PYmplY3QkYXNzaWduID0ge30sIF9PYmplY3QkYXNzaWduW3NpZGVZXSA9IGhhc1kgPyAnMCcgOiAnJywgX09iamVjdCRhc3NpZ25bc2lkZVhdID0gaGFzWCA/ICcwJyA6ICcnLCBfT2JqZWN0JGFzc2lnbi50cmFuc2Zvcm0gPSAod2luLmRldmljZVBpeGVsUmF0aW8gfHwgMSkgPD0gMSA/IFwidHJhbnNsYXRlKFwiICsgeCArIFwicHgsIFwiICsgeSArIFwicHgpXCIgOiBcInRyYW5zbGF0ZTNkKFwiICsgeCArIFwicHgsIFwiICsgeSArIFwicHgsIDApXCIsIF9PYmplY3QkYXNzaWduKSk7XG4gIH1cblxuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uU3R5bGVzLCAoX09iamVjdCRhc3NpZ24yID0ge30sIF9PYmplY3QkYXNzaWduMltzaWRlWV0gPSBoYXNZID8geSArIFwicHhcIiA6ICcnLCBfT2JqZWN0JGFzc2lnbjJbc2lkZVhdID0gaGFzWCA/IHggKyBcInB4XCIgOiAnJywgX09iamVjdCRhc3NpZ24yLnRyYW5zZm9ybSA9ICcnLCBfT2JqZWN0JGFzc2lnbjIpKTtcbn1cblxuZnVuY3Rpb24gY29tcHV0ZVN0eWxlcyhfcmVmNSkge1xuICB2YXIgc3RhdGUgPSBfcmVmNS5zdGF0ZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmNS5vcHRpb25zO1xuICB2YXIgX29wdGlvbnMkZ3B1QWNjZWxlcmF0ID0gb3B0aW9ucy5ncHVBY2NlbGVyYXRpb24sXG4gICAgICBncHVBY2NlbGVyYXRpb24gPSBfb3B0aW9ucyRncHVBY2NlbGVyYXQgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRncHVBY2NlbGVyYXQsXG4gICAgICBfb3B0aW9ucyRhZGFwdGl2ZSA9IG9wdGlvbnMuYWRhcHRpdmUsXG4gICAgICBhZGFwdGl2ZSA9IF9vcHRpb25zJGFkYXB0aXZlID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkYWRhcHRpdmUsXG4gICAgICBfb3B0aW9ucyRyb3VuZE9mZnNldHMgPSBvcHRpb25zLnJvdW5kT2Zmc2V0cyxcbiAgICAgIHJvdW5kT2Zmc2V0cyA9IF9vcHRpb25zJHJvdW5kT2Zmc2V0cyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJHJvdW5kT2Zmc2V0cztcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgdmFyIHRyYW5zaXRpb25Qcm9wZXJ0eSA9IGdldENvbXB1dGVkU3R5bGUoc3RhdGUuZWxlbWVudHMucG9wcGVyKS50cmFuc2l0aW9uUHJvcGVydHkgfHwgJyc7XG5cbiAgICBpZiAoYWRhcHRpdmUgJiYgWyd0cmFuc2Zvcm0nLCAndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0J10uc29tZShmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgIHJldHVybiB0cmFuc2l0aW9uUHJvcGVydHkuaW5kZXhPZihwcm9wZXJ0eSkgPj0gMDtcbiAgICB9KSkge1xuICAgICAgY29uc29sZS53YXJuKFsnUG9wcGVyOiBEZXRlY3RlZCBDU1MgdHJhbnNpdGlvbnMgb24gYXQgbGVhc3Qgb25lIG9mIHRoZSBmb2xsb3dpbmcnLCAnQ1NTIHByb3BlcnRpZXM6IFwidHJhbnNmb3JtXCIsIFwidG9wXCIsIFwicmlnaHRcIiwgXCJib3R0b21cIiwgXCJsZWZ0XCIuJywgJ1xcblxcbicsICdEaXNhYmxlIHRoZSBcImNvbXB1dGVTdHlsZXNcIiBtb2RpZmllclxcJ3MgYGFkYXB0aXZlYCBvcHRpb24gdG8gYWxsb3cnLCAnZm9yIHNtb290aCB0cmFuc2l0aW9ucywgb3IgcmVtb3ZlIHRoZXNlIHByb3BlcnRpZXMgZnJvbSB0aGUgQ1NTJywgJ3RyYW5zaXRpb24gZGVjbGFyYXRpb24gb24gdGhlIHBvcHBlciBlbGVtZW50IGlmIG9ubHkgdHJhbnNpdGlvbmluZycsICdvcGFjaXR5IG9yIGJhY2tncm91bmQtY29sb3IgZm9yIGV4YW1wbGUuJywgJ1xcblxcbicsICdXZSByZWNvbW1lbmQgdXNpbmcgdGhlIHBvcHBlciBlbGVtZW50IGFzIGEgd3JhcHBlciBhcm91bmQgYW4gaW5uZXInLCAnZWxlbWVudCB0aGF0IGNhbiBoYXZlIGFueSBDU1MgcHJvcGVydHkgdHJhbnNpdGlvbmVkIGZvciBhbmltYXRpb25zLiddLmpvaW4oJyAnKSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGNvbW1vblN0eWxlcyA9IHtcbiAgICBwbGFjZW1lbnQ6IGdldEJhc2VQbGFjZW1lbnQoc3RhdGUucGxhY2VtZW50KSxcbiAgICB2YXJpYXRpb246IGdldFZhcmlhdGlvbihzdGF0ZS5wbGFjZW1lbnQpLFxuICAgIHBvcHBlcjogc3RhdGUuZWxlbWVudHMucG9wcGVyLFxuICAgIHBvcHBlclJlY3Q6IHN0YXRlLnJlY3RzLnBvcHBlcixcbiAgICBncHVBY2NlbGVyYXRpb246IGdwdUFjY2VsZXJhdGlvbixcbiAgICBpc0ZpeGVkOiBzdGF0ZS5vcHRpb25zLnN0cmF0ZWd5ID09PSAnZml4ZWQnXG4gIH07XG5cbiAgaWYgKHN0YXRlLm1vZGlmaWVyc0RhdGEucG9wcGVyT2Zmc2V0cyAhPSBudWxsKSB7XG4gICAgc3RhdGUuc3R5bGVzLnBvcHBlciA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnN0eWxlcy5wb3BwZXIsIG1hcFRvU3R5bGVzKE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblN0eWxlcywge1xuICAgICAgb2Zmc2V0czogc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzLFxuICAgICAgcG9zaXRpb246IHN0YXRlLm9wdGlvbnMuc3RyYXRlZ3ksXG4gICAgICBhZGFwdGl2ZTogYWRhcHRpdmUsXG4gICAgICByb3VuZE9mZnNldHM6IHJvdW5kT2Zmc2V0c1xuICAgIH0pKSk7XG4gIH1cblxuICBpZiAoc3RhdGUubW9kaWZpZXJzRGF0YS5hcnJvdyAhPSBudWxsKSB7XG4gICAgc3RhdGUuc3R5bGVzLmFycm93ID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuc3R5bGVzLmFycm93LCBtYXBUb1N0eWxlcyhPYmplY3QuYXNzaWduKHt9LCBjb21tb25TdHlsZXMsIHtcbiAgICAgIG9mZnNldHM6IHN0YXRlLm1vZGlmaWVyc0RhdGEuYXJyb3csXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIGFkYXB0aXZlOiBmYWxzZSxcbiAgICAgIHJvdW5kT2Zmc2V0czogcm91bmRPZmZzZXRzXG4gICAgfSkpKTtcbiAgfVxuXG4gIHN0YXRlLmF0dHJpYnV0ZXMucG9wcGVyID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuYXR0cmlidXRlcy5wb3BwZXIsIHtcbiAgICAnZGF0YS1wb3BwZXItcGxhY2VtZW50Jzogc3RhdGUucGxhY2VtZW50XG4gIH0pO1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnY29tcHV0ZVN0eWxlcycsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnYmVmb3JlV3JpdGUnLFxuICBmbjogY29tcHV0ZVN0eWxlcyxcbiAgZGF0YToge31cbn07IiwiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldFdpbmRvdy5qc1wiOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbnZhciBwYXNzaXZlID0ge1xuICBwYXNzaXZlOiB0cnVlXG59O1xuXG5mdW5jdGlvbiBlZmZlY3QoX3JlZikge1xuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlLFxuICAgICAgaW5zdGFuY2UgPSBfcmVmLmluc3RhbmNlLFxuICAgICAgb3B0aW9ucyA9IF9yZWYub3B0aW9ucztcbiAgdmFyIF9vcHRpb25zJHNjcm9sbCA9IG9wdGlvbnMuc2Nyb2xsLFxuICAgICAgc2Nyb2xsID0gX29wdGlvbnMkc2Nyb2xsID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkc2Nyb2xsLFxuICAgICAgX29wdGlvbnMkcmVzaXplID0gb3B0aW9ucy5yZXNpemUsXG4gICAgICByZXNpemUgPSBfb3B0aW9ucyRyZXNpemUgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRyZXNpemU7XG4gIHZhciB3aW5kb3cgPSBnZXRXaW5kb3coc3RhdGUuZWxlbWVudHMucG9wcGVyKTtcbiAgdmFyIHNjcm9sbFBhcmVudHMgPSBbXS5jb25jYXQoc3RhdGUuc2Nyb2xsUGFyZW50cy5yZWZlcmVuY2UsIHN0YXRlLnNjcm9sbFBhcmVudHMucG9wcGVyKTtcblxuICBpZiAoc2Nyb2xsKSB7XG4gICAgc2Nyb2xsUGFyZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChzY3JvbGxQYXJlbnQpIHtcbiAgICAgIHNjcm9sbFBhcmVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBpbnN0YW5jZS51cGRhdGUsIHBhc3NpdmUpO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKHJlc2l6ZSkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBpbnN0YW5jZS51cGRhdGUsIHBhc3NpdmUpO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoc2Nyb2xsKSB7XG4gICAgICBzY3JvbGxQYXJlbnRzLmZvckVhY2goZnVuY3Rpb24gKHNjcm9sbFBhcmVudCkge1xuICAgICAgICBzY3JvbGxQYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgaW5zdGFuY2UudXBkYXRlLCBwYXNzaXZlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChyZXNpemUpIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBpbnN0YW5jZS51cGRhdGUsIHBhc3NpdmUpO1xuICAgIH1cbiAgfTtcbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ2V2ZW50TGlzdGVuZXJzJyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICd3cml0ZScsXG4gIGZuOiBmdW5jdGlvbiBmbigpIHt9LFxuICBlZmZlY3Q6IGVmZmVjdCxcbiAgZGF0YToge31cbn07IiwiaW1wb3J0IGdldE9wcG9zaXRlUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRPcHBvc2l0ZVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IGdldEJhc2VQbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRPcHBvc2l0ZVZhcmlhdGlvblBsYWNlbWVudCBmcm9tIFwiLi4vdXRpbHMvZ2V0T3Bwb3NpdGVWYXJpYXRpb25QbGFjZW1lbnQuanNcIjtcbmltcG9ydCBkZXRlY3RPdmVyZmxvdyBmcm9tIFwiLi4vdXRpbHMvZGV0ZWN0T3ZlcmZsb3cuanNcIjtcbmltcG9ydCBjb21wdXRlQXV0b1BsYWNlbWVudCBmcm9tIFwiLi4vdXRpbHMvY29tcHV0ZUF1dG9QbGFjZW1lbnQuanNcIjtcbmltcG9ydCB7IGJvdHRvbSwgdG9wLCBzdGFydCwgcmlnaHQsIGxlZnQsIGF1dG8gfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCBnZXRWYXJpYXRpb24gZnJvbSBcIi4uL3V0aWxzL2dldFZhcmlhdGlvbi5qc1wiOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbmZ1bmN0aW9uIGdldEV4cGFuZGVkRmFsbGJhY2tQbGFjZW1lbnRzKHBsYWNlbWVudCkge1xuICBpZiAoZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpID09PSBhdXRvKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgdmFyIG9wcG9zaXRlUGxhY2VtZW50ID0gZ2V0T3Bwb3NpdGVQbGFjZW1lbnQocGxhY2VtZW50KTtcbiAgcmV0dXJuIFtnZXRPcHBvc2l0ZVZhcmlhdGlvblBsYWNlbWVudChwbGFjZW1lbnQpLCBvcHBvc2l0ZVBsYWNlbWVudCwgZ2V0T3Bwb3NpdGVWYXJpYXRpb25QbGFjZW1lbnQob3Bwb3NpdGVQbGFjZW1lbnQpXTtcbn1cblxuZnVuY3Rpb24gZmxpcChfcmVmKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYuc3RhdGUsXG4gICAgICBvcHRpb25zID0gX3JlZi5vcHRpb25zLFxuICAgICAgbmFtZSA9IF9yZWYubmFtZTtcblxuICBpZiAoc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXS5fc2tpcCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBfb3B0aW9ucyRtYWluQXhpcyA9IG9wdGlvbnMubWFpbkF4aXMsXG4gICAgICBjaGVja01haW5BeGlzID0gX29wdGlvbnMkbWFpbkF4aXMgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRtYWluQXhpcyxcbiAgICAgIF9vcHRpb25zJGFsdEF4aXMgPSBvcHRpb25zLmFsdEF4aXMsXG4gICAgICBjaGVja0FsdEF4aXMgPSBfb3B0aW9ucyRhbHRBeGlzID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkYWx0QXhpcyxcbiAgICAgIHNwZWNpZmllZEZhbGxiYWNrUGxhY2VtZW50cyA9IG9wdGlvbnMuZmFsbGJhY2tQbGFjZW1lbnRzLFxuICAgICAgcGFkZGluZyA9IG9wdGlvbnMucGFkZGluZyxcbiAgICAgIGJvdW5kYXJ5ID0gb3B0aW9ucy5ib3VuZGFyeSxcbiAgICAgIHJvb3RCb3VuZGFyeSA9IG9wdGlvbnMucm9vdEJvdW5kYXJ5LFxuICAgICAgYWx0Qm91bmRhcnkgPSBvcHRpb25zLmFsdEJvdW5kYXJ5LFxuICAgICAgX29wdGlvbnMkZmxpcFZhcmlhdGlvID0gb3B0aW9ucy5mbGlwVmFyaWF0aW9ucyxcbiAgICAgIGZsaXBWYXJpYXRpb25zID0gX29wdGlvbnMkZmxpcFZhcmlhdGlvID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkZmxpcFZhcmlhdGlvLFxuICAgICAgYWxsb3dlZEF1dG9QbGFjZW1lbnRzID0gb3B0aW9ucy5hbGxvd2VkQXV0b1BsYWNlbWVudHM7XG4gIHZhciBwcmVmZXJyZWRQbGFjZW1lbnQgPSBzdGF0ZS5vcHRpb25zLnBsYWNlbWVudDtcbiAgdmFyIGJhc2VQbGFjZW1lbnQgPSBnZXRCYXNlUGxhY2VtZW50KHByZWZlcnJlZFBsYWNlbWVudCk7XG4gIHZhciBpc0Jhc2VQbGFjZW1lbnQgPSBiYXNlUGxhY2VtZW50ID09PSBwcmVmZXJyZWRQbGFjZW1lbnQ7XG4gIHZhciBmYWxsYmFja1BsYWNlbWVudHMgPSBzcGVjaWZpZWRGYWxsYmFja1BsYWNlbWVudHMgfHwgKGlzQmFzZVBsYWNlbWVudCB8fCAhZmxpcFZhcmlhdGlvbnMgPyBbZ2V0T3Bwb3NpdGVQbGFjZW1lbnQocHJlZmVycmVkUGxhY2VtZW50KV0gOiBnZXRFeHBhbmRlZEZhbGxiYWNrUGxhY2VtZW50cyhwcmVmZXJyZWRQbGFjZW1lbnQpKTtcbiAgdmFyIHBsYWNlbWVudHMgPSBbcHJlZmVycmVkUGxhY2VtZW50XS5jb25jYXQoZmFsbGJhY2tQbGFjZW1lbnRzKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcGxhY2VtZW50KSB7XG4gICAgcmV0dXJuIGFjYy5jb25jYXQoZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpID09PSBhdXRvID8gY29tcHV0ZUF1dG9QbGFjZW1lbnQoc3RhdGUsIHtcbiAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50LFxuICAgICAgYm91bmRhcnk6IGJvdW5kYXJ5LFxuICAgICAgcm9vdEJvdW5kYXJ5OiByb290Qm91bmRhcnksXG4gICAgICBwYWRkaW5nOiBwYWRkaW5nLFxuICAgICAgZmxpcFZhcmlhdGlvbnM6IGZsaXBWYXJpYXRpb25zLFxuICAgICAgYWxsb3dlZEF1dG9QbGFjZW1lbnRzOiBhbGxvd2VkQXV0b1BsYWNlbWVudHNcbiAgICB9KSA6IHBsYWNlbWVudCk7XG4gIH0sIFtdKTtcbiAgdmFyIHJlZmVyZW5jZVJlY3QgPSBzdGF0ZS5yZWN0cy5yZWZlcmVuY2U7XG4gIHZhciBwb3BwZXJSZWN0ID0gc3RhdGUucmVjdHMucG9wcGVyO1xuICB2YXIgY2hlY2tzTWFwID0gbmV3IE1hcCgpO1xuICB2YXIgbWFrZUZhbGxiYWNrQ2hlY2tzID0gdHJ1ZTtcbiAgdmFyIGZpcnN0Rml0dGluZ1BsYWNlbWVudCA9IHBsYWNlbWVudHNbMF07XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwbGFjZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHBsYWNlbWVudCA9IHBsYWNlbWVudHNbaV07XG5cbiAgICB2YXIgX2Jhc2VQbGFjZW1lbnQgPSBnZXRCYXNlUGxhY2VtZW50KHBsYWNlbWVudCk7XG5cbiAgICB2YXIgaXNTdGFydFZhcmlhdGlvbiA9IGdldFZhcmlhdGlvbihwbGFjZW1lbnQpID09PSBzdGFydDtcbiAgICB2YXIgaXNWZXJ0aWNhbCA9IFt0b3AsIGJvdHRvbV0uaW5kZXhPZihfYmFzZVBsYWNlbWVudCkgPj0gMDtcbiAgICB2YXIgbGVuID0gaXNWZXJ0aWNhbCA/ICd3aWR0aCcgOiAnaGVpZ2h0JztcbiAgICB2YXIgb3ZlcmZsb3cgPSBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwge1xuICAgICAgcGxhY2VtZW50OiBwbGFjZW1lbnQsXG4gICAgICBib3VuZGFyeTogYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnk6IHJvb3RCb3VuZGFyeSxcbiAgICAgIGFsdEJvdW5kYXJ5OiBhbHRCb3VuZGFyeSxcbiAgICAgIHBhZGRpbmc6IHBhZGRpbmdcbiAgICB9KTtcbiAgICB2YXIgbWFpblZhcmlhdGlvblNpZGUgPSBpc1ZlcnRpY2FsID8gaXNTdGFydFZhcmlhdGlvbiA/IHJpZ2h0IDogbGVmdCA6IGlzU3RhcnRWYXJpYXRpb24gPyBib3R0b20gOiB0b3A7XG5cbiAgICBpZiAocmVmZXJlbmNlUmVjdFtsZW5dID4gcG9wcGVyUmVjdFtsZW5dKSB7XG4gICAgICBtYWluVmFyaWF0aW9uU2lkZSA9IGdldE9wcG9zaXRlUGxhY2VtZW50KG1haW5WYXJpYXRpb25TaWRlKTtcbiAgICB9XG5cbiAgICB2YXIgYWx0VmFyaWF0aW9uU2lkZSA9IGdldE9wcG9zaXRlUGxhY2VtZW50KG1haW5WYXJpYXRpb25TaWRlKTtcbiAgICB2YXIgY2hlY2tzID0gW107XG5cbiAgICBpZiAoY2hlY2tNYWluQXhpcykge1xuICAgICAgY2hlY2tzLnB1c2gob3ZlcmZsb3dbX2Jhc2VQbGFjZW1lbnRdIDw9IDApO1xuICAgIH1cblxuICAgIGlmIChjaGVja0FsdEF4aXMpIHtcbiAgICAgIGNoZWNrcy5wdXNoKG92ZXJmbG93W21haW5WYXJpYXRpb25TaWRlXSA8PSAwLCBvdmVyZmxvd1thbHRWYXJpYXRpb25TaWRlXSA8PSAwKTtcbiAgICB9XG5cbiAgICBpZiAoY2hlY2tzLmV2ZXJ5KGZ1bmN0aW9uIChjaGVjaykge1xuICAgICAgcmV0dXJuIGNoZWNrO1xuICAgIH0pKSB7XG4gICAgICBmaXJzdEZpdHRpbmdQbGFjZW1lbnQgPSBwbGFjZW1lbnQ7XG4gICAgICBtYWtlRmFsbGJhY2tDaGVja3MgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNoZWNrc01hcC5zZXQocGxhY2VtZW50LCBjaGVja3MpO1xuICB9XG5cbiAgaWYgKG1ha2VGYWxsYmFja0NoZWNrcykge1xuICAgIC8vIGAyYCBtYXkgYmUgZGVzaXJlZCBpbiBzb21lIGNhc2VzIOKAkyByZXNlYXJjaCBsYXRlclxuICAgIHZhciBudW1iZXJPZkNoZWNrcyA9IGZsaXBWYXJpYXRpb25zID8gMyA6IDE7XG5cbiAgICB2YXIgX2xvb3AgPSBmdW5jdGlvbiBfbG9vcChfaSkge1xuICAgICAgdmFyIGZpdHRpbmdQbGFjZW1lbnQgPSBwbGFjZW1lbnRzLmZpbmQoZnVuY3Rpb24gKHBsYWNlbWVudCkge1xuICAgICAgICB2YXIgY2hlY2tzID0gY2hlY2tzTWFwLmdldChwbGFjZW1lbnQpO1xuXG4gICAgICAgIGlmIChjaGVja3MpIHtcbiAgICAgICAgICByZXR1cm4gY2hlY2tzLnNsaWNlKDAsIF9pKS5ldmVyeShmdW5jdGlvbiAoY2hlY2spIHtcbiAgICAgICAgICAgIHJldHVybiBjaGVjaztcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmIChmaXR0aW5nUGxhY2VtZW50KSB7XG4gICAgICAgIGZpcnN0Rml0dGluZ1BsYWNlbWVudCA9IGZpdHRpbmdQbGFjZW1lbnQ7XG4gICAgICAgIHJldHVybiBcImJyZWFrXCI7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZvciAodmFyIF9pID0gbnVtYmVyT2ZDaGVja3M7IF9pID4gMDsgX2ktLSkge1xuICAgICAgdmFyIF9yZXQgPSBfbG9vcChfaSk7XG5cbiAgICAgIGlmIChfcmV0ID09PSBcImJyZWFrXCIpIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmIChzdGF0ZS5wbGFjZW1lbnQgIT09IGZpcnN0Rml0dGluZ1BsYWNlbWVudCkge1xuICAgIHN0YXRlLm1vZGlmaWVyc0RhdGFbbmFtZV0uX3NraXAgPSB0cnVlO1xuICAgIHN0YXRlLnBsYWNlbWVudCA9IGZpcnN0Rml0dGluZ1BsYWNlbWVudDtcbiAgICBzdGF0ZS5yZXNldCA9IHRydWU7XG4gIH1cbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ2ZsaXAnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ21haW4nLFxuICBmbjogZmxpcCxcbiAgcmVxdWlyZXNJZkV4aXN0czogWydvZmZzZXQnXSxcbiAgZGF0YToge1xuICAgIF9za2lwOiBmYWxzZVxuICB9XG59OyIsImltcG9ydCB7IHRvcCwgYm90dG9tLCBsZWZ0LCByaWdodCB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IGRldGVjdE92ZXJmbG93IGZyb20gXCIuLi91dGlscy9kZXRlY3RPdmVyZmxvdy5qc1wiO1xuXG5mdW5jdGlvbiBnZXRTaWRlT2Zmc2V0cyhvdmVyZmxvdywgcmVjdCwgcHJldmVudGVkT2Zmc2V0cykge1xuICBpZiAocHJldmVudGVkT2Zmc2V0cyA9PT0gdm9pZCAwKSB7XG4gICAgcHJldmVudGVkT2Zmc2V0cyA9IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdG9wOiBvdmVyZmxvdy50b3AgLSByZWN0LmhlaWdodCAtIHByZXZlbnRlZE9mZnNldHMueSxcbiAgICByaWdodDogb3ZlcmZsb3cucmlnaHQgLSByZWN0LndpZHRoICsgcHJldmVudGVkT2Zmc2V0cy54LFxuICAgIGJvdHRvbTogb3ZlcmZsb3cuYm90dG9tIC0gcmVjdC5oZWlnaHQgKyBwcmV2ZW50ZWRPZmZzZXRzLnksXG4gICAgbGVmdDogb3ZlcmZsb3cubGVmdCAtIHJlY3Qud2lkdGggLSBwcmV2ZW50ZWRPZmZzZXRzLnhcbiAgfTtcbn1cblxuZnVuY3Rpb24gaXNBbnlTaWRlRnVsbHlDbGlwcGVkKG92ZXJmbG93KSB7XG4gIHJldHVybiBbdG9wLCByaWdodCwgYm90dG9tLCBsZWZ0XS5zb21lKGZ1bmN0aW9uIChzaWRlKSB7XG4gICAgcmV0dXJuIG92ZXJmbG93W3NpZGVdID49IDA7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBoaWRlKF9yZWYpIHtcbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWU7XG4gIHZhciByZWZlcmVuY2VSZWN0ID0gc3RhdGUucmVjdHMucmVmZXJlbmNlO1xuICB2YXIgcG9wcGVyUmVjdCA9IHN0YXRlLnJlY3RzLnBvcHBlcjtcbiAgdmFyIHByZXZlbnRlZE9mZnNldHMgPSBzdGF0ZS5tb2RpZmllcnNEYXRhLnByZXZlbnRPdmVyZmxvdztcbiAgdmFyIHJlZmVyZW5jZU92ZXJmbG93ID0gZGV0ZWN0T3ZlcmZsb3coc3RhdGUsIHtcbiAgICBlbGVtZW50Q29udGV4dDogJ3JlZmVyZW5jZSdcbiAgfSk7XG4gIHZhciBwb3BwZXJBbHRPdmVyZmxvdyA9IGRldGVjdE92ZXJmbG93KHN0YXRlLCB7XG4gICAgYWx0Qm91bmRhcnk6IHRydWVcbiAgfSk7XG4gIHZhciByZWZlcmVuY2VDbGlwcGluZ09mZnNldHMgPSBnZXRTaWRlT2Zmc2V0cyhyZWZlcmVuY2VPdmVyZmxvdywgcmVmZXJlbmNlUmVjdCk7XG4gIHZhciBwb3BwZXJFc2NhcGVPZmZzZXRzID0gZ2V0U2lkZU9mZnNldHMocG9wcGVyQWx0T3ZlcmZsb3csIHBvcHBlclJlY3QsIHByZXZlbnRlZE9mZnNldHMpO1xuICB2YXIgaXNSZWZlcmVuY2VIaWRkZW4gPSBpc0FueVNpZGVGdWxseUNsaXBwZWQocmVmZXJlbmNlQ2xpcHBpbmdPZmZzZXRzKTtcbiAgdmFyIGhhc1BvcHBlckVzY2FwZWQgPSBpc0FueVNpZGVGdWxseUNsaXBwZWQocG9wcGVyRXNjYXBlT2Zmc2V0cyk7XG4gIHN0YXRlLm1vZGlmaWVyc0RhdGFbbmFtZV0gPSB7XG4gICAgcmVmZXJlbmNlQ2xpcHBpbmdPZmZzZXRzOiByZWZlcmVuY2VDbGlwcGluZ09mZnNldHMsXG4gICAgcG9wcGVyRXNjYXBlT2Zmc2V0czogcG9wcGVyRXNjYXBlT2Zmc2V0cyxcbiAgICBpc1JlZmVyZW5jZUhpZGRlbjogaXNSZWZlcmVuY2VIaWRkZW4sXG4gICAgaGFzUG9wcGVyRXNjYXBlZDogaGFzUG9wcGVyRXNjYXBlZFxuICB9O1xuICBzdGF0ZS5hdHRyaWJ1dGVzLnBvcHBlciA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmF0dHJpYnV0ZXMucG9wcGVyLCB7XG4gICAgJ2RhdGEtcG9wcGVyLXJlZmVyZW5jZS1oaWRkZW4nOiBpc1JlZmVyZW5jZUhpZGRlbixcbiAgICAnZGF0YS1wb3BwZXItZXNjYXBlZCc6IGhhc1BvcHBlckVzY2FwZWRcbiAgfSk7XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdoaWRlJyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICdtYWluJyxcbiAgcmVxdWlyZXNJZkV4aXN0czogWydwcmV2ZW50T3ZlcmZsb3cnXSxcbiAgZm46IGhpZGVcbn07IiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBhcHBseVN0eWxlcyB9IGZyb20gXCIuL2FwcGx5U3R5bGVzLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGFycm93IH0gZnJvbSBcIi4vYXJyb3cuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgY29tcHV0ZVN0eWxlcyB9IGZyb20gXCIuL2NvbXB1dGVTdHlsZXMuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgZXZlbnRMaXN0ZW5lcnMgfSBmcm9tIFwiLi9ldmVudExpc3RlbmVycy5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBmbGlwIH0gZnJvbSBcIi4vZmxpcC5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBoaWRlIH0gZnJvbSBcIi4vaGlkZS5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBvZmZzZXQgfSBmcm9tIFwiLi9vZmZzZXQuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgcG9wcGVyT2Zmc2V0cyB9IGZyb20gXCIuL3BvcHBlck9mZnNldHMuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgcHJldmVudE92ZXJmbG93IH0gZnJvbSBcIi4vcHJldmVudE92ZXJmbG93LmpzXCI7IiwiaW1wb3J0IGdldEJhc2VQbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmltcG9ydCB7IHRvcCwgbGVmdCwgcmlnaHQsIHBsYWNlbWVudHMgfSBmcm9tIFwiLi4vZW51bXMuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgZnVuY3Rpb24gZGlzdGFuY2VBbmRTa2lkZGluZ1RvWFkocGxhY2VtZW50LCByZWN0cywgb2Zmc2V0KSB7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpO1xuICB2YXIgaW52ZXJ0RGlzdGFuY2UgPSBbbGVmdCwgdG9wXS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpID49IDAgPyAtMSA6IDE7XG5cbiAgdmFyIF9yZWYgPSB0eXBlb2Ygb2Zmc2V0ID09PSAnZnVuY3Rpb24nID8gb2Zmc2V0KE9iamVjdC5hc3NpZ24oe30sIHJlY3RzLCB7XG4gICAgcGxhY2VtZW50OiBwbGFjZW1lbnRcbiAgfSkpIDogb2Zmc2V0LFxuICAgICAgc2tpZGRpbmcgPSBfcmVmWzBdLFxuICAgICAgZGlzdGFuY2UgPSBfcmVmWzFdO1xuXG4gIHNraWRkaW5nID0gc2tpZGRpbmcgfHwgMDtcbiAgZGlzdGFuY2UgPSAoZGlzdGFuY2UgfHwgMCkgKiBpbnZlcnREaXN0YW5jZTtcbiAgcmV0dXJuIFtsZWZ0LCByaWdodF0uaW5kZXhPZihiYXNlUGxhY2VtZW50KSA+PSAwID8ge1xuICAgIHg6IGRpc3RhbmNlLFxuICAgIHk6IHNraWRkaW5nXG4gIH0gOiB7XG4gICAgeDogc2tpZGRpbmcsXG4gICAgeTogZGlzdGFuY2VcbiAgfTtcbn1cblxuZnVuY3Rpb24gb2Zmc2V0KF9yZWYyKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYyLnN0YXRlLFxuICAgICAgb3B0aW9ucyA9IF9yZWYyLm9wdGlvbnMsXG4gICAgICBuYW1lID0gX3JlZjIubmFtZTtcbiAgdmFyIF9vcHRpb25zJG9mZnNldCA9IG9wdGlvbnMub2Zmc2V0LFxuICAgICAgb2Zmc2V0ID0gX29wdGlvbnMkb2Zmc2V0ID09PSB2b2lkIDAgPyBbMCwgMF0gOiBfb3B0aW9ucyRvZmZzZXQ7XG4gIHZhciBkYXRhID0gcGxhY2VtZW50cy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcGxhY2VtZW50KSB7XG4gICAgYWNjW3BsYWNlbWVudF0gPSBkaXN0YW5jZUFuZFNraWRkaW5nVG9YWShwbGFjZW1lbnQsIHN0YXRlLnJlY3RzLCBvZmZzZXQpO1xuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9KTtcbiAgdmFyIF9kYXRhJHN0YXRlJHBsYWNlbWVudCA9IGRhdGFbc3RhdGUucGxhY2VtZW50XSxcbiAgICAgIHggPSBfZGF0YSRzdGF0ZSRwbGFjZW1lbnQueCxcbiAgICAgIHkgPSBfZGF0YSRzdGF0ZSRwbGFjZW1lbnQueTtcblxuICBpZiAoc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzICE9IG51bGwpIHtcbiAgICBzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHMueCArPSB4O1xuICAgIHN0YXRlLm1vZGlmaWVyc0RhdGEucG9wcGVyT2Zmc2V0cy55ICs9IHk7XG4gIH1cblxuICBzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdID0gZGF0YTtcbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ29mZnNldCcsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnbWFpbicsXG4gIHJlcXVpcmVzOiBbJ3BvcHBlck9mZnNldHMnXSxcbiAgZm46IG9mZnNldFxufTsiLCJpbXBvcnQgY29tcHV0ZU9mZnNldHMgZnJvbSBcIi4uL3V0aWxzL2NvbXB1dGVPZmZzZXRzLmpzXCI7XG5cbmZ1bmN0aW9uIHBvcHBlck9mZnNldHMoX3JlZikge1xuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlLFxuICAgICAgbmFtZSA9IF9yZWYubmFtZTtcbiAgLy8gT2Zmc2V0cyBhcmUgdGhlIGFjdHVhbCBwb3NpdGlvbiB0aGUgcG9wcGVyIG5lZWRzIHRvIGhhdmUgdG8gYmVcbiAgLy8gcHJvcGVybHkgcG9zaXRpb25lZCBuZWFyIGl0cyByZWZlcmVuY2UgZWxlbWVudFxuICAvLyBUaGlzIGlzIHRoZSBtb3N0IGJhc2ljIHBsYWNlbWVudCwgYW5kIHdpbGwgYmUgYWRqdXN0ZWQgYnlcbiAgLy8gdGhlIG1vZGlmaWVycyBpbiB0aGUgbmV4dCBzdGVwXG4gIHN0YXRlLm1vZGlmaWVyc0RhdGFbbmFtZV0gPSBjb21wdXRlT2Zmc2V0cyh7XG4gICAgcmVmZXJlbmNlOiBzdGF0ZS5yZWN0cy5yZWZlcmVuY2UsXG4gICAgZWxlbWVudDogc3RhdGUucmVjdHMucG9wcGVyLFxuICAgIHN0cmF0ZWd5OiAnYWJzb2x1dGUnLFxuICAgIHBsYWNlbWVudDogc3RhdGUucGxhY2VtZW50XG4gIH0pO1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAncG9wcGVyT2Zmc2V0cycsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAncmVhZCcsXG4gIGZuOiBwb3BwZXJPZmZzZXRzLFxuICBkYXRhOiB7fVxufTsiLCJpbXBvcnQgeyB0b3AsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHN0YXJ0IH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG5pbXBvcnQgZ2V0QmFzZVBsYWNlbWVudCBmcm9tIFwiLi4vdXRpbHMvZ2V0QmFzZVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IGdldE1haW5BeGlzRnJvbVBsYWNlbWVudCBmcm9tIFwiLi4vdXRpbHMvZ2V0TWFpbkF4aXNGcm9tUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0QWx0QXhpcyBmcm9tIFwiLi4vdXRpbHMvZ2V0QWx0QXhpcy5qc1wiO1xuaW1wb3J0IHsgd2l0aGluLCB3aXRoaW5NYXhDbGFtcCB9IGZyb20gXCIuLi91dGlscy93aXRoaW4uanNcIjtcbmltcG9ydCBnZXRMYXlvdXRSZWN0IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0TGF5b3V0UmVjdC5qc1wiO1xuaW1wb3J0IGdldE9mZnNldFBhcmVudCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldE9mZnNldFBhcmVudC5qc1wiO1xuaW1wb3J0IGRldGVjdE92ZXJmbG93IGZyb20gXCIuLi91dGlscy9kZXRlY3RPdmVyZmxvdy5qc1wiO1xuaW1wb3J0IGdldFZhcmlhdGlvbiBmcm9tIFwiLi4vdXRpbHMvZ2V0VmFyaWF0aW9uLmpzXCI7XG5pbXBvcnQgZ2V0RnJlc2hTaWRlT2JqZWN0IGZyb20gXCIuLi91dGlscy9nZXRGcmVzaFNpZGVPYmplY3QuanNcIjtcbmltcG9ydCB7IG1pbiBhcyBtYXRoTWluLCBtYXggYXMgbWF0aE1heCB9IGZyb20gXCIuLi91dGlscy9tYXRoLmpzXCI7XG5cbmZ1bmN0aW9uIHByZXZlbnRPdmVyZmxvdyhfcmVmKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYuc3RhdGUsXG4gICAgICBvcHRpb25zID0gX3JlZi5vcHRpb25zLFxuICAgICAgbmFtZSA9IF9yZWYubmFtZTtcbiAgdmFyIF9vcHRpb25zJG1haW5BeGlzID0gb3B0aW9ucy5tYWluQXhpcyxcbiAgICAgIGNoZWNrTWFpbkF4aXMgPSBfb3B0aW9ucyRtYWluQXhpcyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJG1haW5BeGlzLFxuICAgICAgX29wdGlvbnMkYWx0QXhpcyA9IG9wdGlvbnMuYWx0QXhpcyxcbiAgICAgIGNoZWNrQWx0QXhpcyA9IF9vcHRpb25zJGFsdEF4aXMgPT09IHZvaWQgMCA/IGZhbHNlIDogX29wdGlvbnMkYWx0QXhpcyxcbiAgICAgIGJvdW5kYXJ5ID0gb3B0aW9ucy5ib3VuZGFyeSxcbiAgICAgIHJvb3RCb3VuZGFyeSA9IG9wdGlvbnMucm9vdEJvdW5kYXJ5LFxuICAgICAgYWx0Qm91bmRhcnkgPSBvcHRpb25zLmFsdEJvdW5kYXJ5LFxuICAgICAgcGFkZGluZyA9IG9wdGlvbnMucGFkZGluZyxcbiAgICAgIF9vcHRpb25zJHRldGhlciA9IG9wdGlvbnMudGV0aGVyLFxuICAgICAgdGV0aGVyID0gX29wdGlvbnMkdGV0aGVyID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkdGV0aGVyLFxuICAgICAgX29wdGlvbnMkdGV0aGVyT2Zmc2V0ID0gb3B0aW9ucy50ZXRoZXJPZmZzZXQsXG4gICAgICB0ZXRoZXJPZmZzZXQgPSBfb3B0aW9ucyR0ZXRoZXJPZmZzZXQgPT09IHZvaWQgMCA/IDAgOiBfb3B0aW9ucyR0ZXRoZXJPZmZzZXQ7XG4gIHZhciBvdmVyZmxvdyA9IGRldGVjdE92ZXJmbG93KHN0YXRlLCB7XG4gICAgYm91bmRhcnk6IGJvdW5kYXJ5LFxuICAgIHJvb3RCb3VuZGFyeTogcm9vdEJvdW5kYXJ5LFxuICAgIHBhZGRpbmc6IHBhZGRpbmcsXG4gICAgYWx0Qm91bmRhcnk6IGFsdEJvdW5kYXJ5XG4gIH0pO1xuICB2YXIgYmFzZVBsYWNlbWVudCA9IGdldEJhc2VQbGFjZW1lbnQoc3RhdGUucGxhY2VtZW50KTtcbiAgdmFyIHZhcmlhdGlvbiA9IGdldFZhcmlhdGlvbihzdGF0ZS5wbGFjZW1lbnQpO1xuICB2YXIgaXNCYXNlUGxhY2VtZW50ID0gIXZhcmlhdGlvbjtcbiAgdmFyIG1haW5BeGlzID0gZ2V0TWFpbkF4aXNGcm9tUGxhY2VtZW50KGJhc2VQbGFjZW1lbnQpO1xuICB2YXIgYWx0QXhpcyA9IGdldEFsdEF4aXMobWFpbkF4aXMpO1xuICB2YXIgcG9wcGVyT2Zmc2V0cyA9IHN0YXRlLm1vZGlmaWVyc0RhdGEucG9wcGVyT2Zmc2V0cztcbiAgdmFyIHJlZmVyZW5jZVJlY3QgPSBzdGF0ZS5yZWN0cy5yZWZlcmVuY2U7XG4gIHZhciBwb3BwZXJSZWN0ID0gc3RhdGUucmVjdHMucG9wcGVyO1xuICB2YXIgdGV0aGVyT2Zmc2V0VmFsdWUgPSB0eXBlb2YgdGV0aGVyT2Zmc2V0ID09PSAnZnVuY3Rpb24nID8gdGV0aGVyT2Zmc2V0KE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnJlY3RzLCB7XG4gICAgcGxhY2VtZW50OiBzdGF0ZS5wbGFjZW1lbnRcbiAgfSkpIDogdGV0aGVyT2Zmc2V0O1xuICB2YXIgbm9ybWFsaXplZFRldGhlck9mZnNldFZhbHVlID0gdHlwZW9mIHRldGhlck9mZnNldFZhbHVlID09PSAnbnVtYmVyJyA/IHtcbiAgICBtYWluQXhpczogdGV0aGVyT2Zmc2V0VmFsdWUsXG4gICAgYWx0QXhpczogdGV0aGVyT2Zmc2V0VmFsdWVcbiAgfSA6IE9iamVjdC5hc3NpZ24oe1xuICAgIG1haW5BeGlzOiAwLFxuICAgIGFsdEF4aXM6IDBcbiAgfSwgdGV0aGVyT2Zmc2V0VmFsdWUpO1xuICB2YXIgb2Zmc2V0TW9kaWZpZXJTdGF0ZSA9IHN0YXRlLm1vZGlmaWVyc0RhdGEub2Zmc2V0ID8gc3RhdGUubW9kaWZpZXJzRGF0YS5vZmZzZXRbc3RhdGUucGxhY2VtZW50XSA6IG51bGw7XG4gIHZhciBkYXRhID0ge1xuICAgIHg6IDAsXG4gICAgeTogMFxuICB9O1xuXG4gIGlmICghcG9wcGVyT2Zmc2V0cykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChjaGVja01haW5BeGlzKSB7XG4gICAgdmFyIF9vZmZzZXRNb2RpZmllclN0YXRlJDtcblxuICAgIHZhciBtYWluU2lkZSA9IG1haW5BeGlzID09PSAneScgPyB0b3AgOiBsZWZ0O1xuICAgIHZhciBhbHRTaWRlID0gbWFpbkF4aXMgPT09ICd5JyA/IGJvdHRvbSA6IHJpZ2h0O1xuICAgIHZhciBsZW4gPSBtYWluQXhpcyA9PT0gJ3knID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuICAgIHZhciBvZmZzZXQgPSBwb3BwZXJPZmZzZXRzW21haW5BeGlzXTtcbiAgICB2YXIgbWluID0gb2Zmc2V0ICsgb3ZlcmZsb3dbbWFpblNpZGVdO1xuICAgIHZhciBtYXggPSBvZmZzZXQgLSBvdmVyZmxvd1thbHRTaWRlXTtcbiAgICB2YXIgYWRkaXRpdmUgPSB0ZXRoZXIgPyAtcG9wcGVyUmVjdFtsZW5dIC8gMiA6IDA7XG4gICAgdmFyIG1pbkxlbiA9IHZhcmlhdGlvbiA9PT0gc3RhcnQgPyByZWZlcmVuY2VSZWN0W2xlbl0gOiBwb3BwZXJSZWN0W2xlbl07XG4gICAgdmFyIG1heExlbiA9IHZhcmlhdGlvbiA9PT0gc3RhcnQgPyAtcG9wcGVyUmVjdFtsZW5dIDogLXJlZmVyZW5jZVJlY3RbbGVuXTsgLy8gV2UgbmVlZCB0byBpbmNsdWRlIHRoZSBhcnJvdyBpbiB0aGUgY2FsY3VsYXRpb24gc28gdGhlIGFycm93IGRvZXNuJ3QgZ29cbiAgICAvLyBvdXRzaWRlIHRoZSByZWZlcmVuY2UgYm91bmRzXG5cbiAgICB2YXIgYXJyb3dFbGVtZW50ID0gc3RhdGUuZWxlbWVudHMuYXJyb3c7XG4gICAgdmFyIGFycm93UmVjdCA9IHRldGhlciAmJiBhcnJvd0VsZW1lbnQgPyBnZXRMYXlvdXRSZWN0KGFycm93RWxlbWVudCkgOiB7XG4gICAgICB3aWR0aDogMCxcbiAgICAgIGhlaWdodDogMFxuICAgIH07XG4gICAgdmFyIGFycm93UGFkZGluZ09iamVjdCA9IHN0YXRlLm1vZGlmaWVyc0RhdGFbJ2Fycm93I3BlcnNpc3RlbnQnXSA/IHN0YXRlLm1vZGlmaWVyc0RhdGFbJ2Fycm93I3BlcnNpc3RlbnQnXS5wYWRkaW5nIDogZ2V0RnJlc2hTaWRlT2JqZWN0KCk7XG4gICAgdmFyIGFycm93UGFkZGluZ01pbiA9IGFycm93UGFkZGluZ09iamVjdFttYWluU2lkZV07XG4gICAgdmFyIGFycm93UGFkZGluZ01heCA9IGFycm93UGFkZGluZ09iamVjdFthbHRTaWRlXTsgLy8gSWYgdGhlIHJlZmVyZW5jZSBsZW5ndGggaXMgc21hbGxlciB0aGFuIHRoZSBhcnJvdyBsZW5ndGgsIHdlIGRvbid0IHdhbnRcbiAgICAvLyB0byBpbmNsdWRlIGl0cyBmdWxsIHNpemUgaW4gdGhlIGNhbGN1bGF0aW9uLiBJZiB0aGUgcmVmZXJlbmNlIGlzIHNtYWxsXG4gICAgLy8gYW5kIG5lYXIgdGhlIGVkZ2Ugb2YgYSBib3VuZGFyeSwgdGhlIHBvcHBlciBjYW4gb3ZlcmZsb3cgZXZlbiBpZiB0aGVcbiAgICAvLyByZWZlcmVuY2UgaXMgbm90IG92ZXJmbG93aW5nIGFzIHdlbGwgKGUuZy4gdmlydHVhbCBlbGVtZW50cyB3aXRoIG5vXG4gICAgLy8gd2lkdGggb3IgaGVpZ2h0KVxuXG4gICAgdmFyIGFycm93TGVuID0gd2l0aGluKDAsIHJlZmVyZW5jZVJlY3RbbGVuXSwgYXJyb3dSZWN0W2xlbl0pO1xuICAgIHZhciBtaW5PZmZzZXQgPSBpc0Jhc2VQbGFjZW1lbnQgPyByZWZlcmVuY2VSZWN0W2xlbl0gLyAyIC0gYWRkaXRpdmUgLSBhcnJvd0xlbiAtIGFycm93UGFkZGluZ01pbiAtIG5vcm1hbGl6ZWRUZXRoZXJPZmZzZXRWYWx1ZS5tYWluQXhpcyA6IG1pbkxlbiAtIGFycm93TGVuIC0gYXJyb3dQYWRkaW5nTWluIC0gbm9ybWFsaXplZFRldGhlck9mZnNldFZhbHVlLm1haW5BeGlzO1xuICAgIHZhciBtYXhPZmZzZXQgPSBpc0Jhc2VQbGFjZW1lbnQgPyAtcmVmZXJlbmNlUmVjdFtsZW5dIC8gMiArIGFkZGl0aXZlICsgYXJyb3dMZW4gKyBhcnJvd1BhZGRpbmdNYXggKyBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUubWFpbkF4aXMgOiBtYXhMZW4gKyBhcnJvd0xlbiArIGFycm93UGFkZGluZ01heCArIG5vcm1hbGl6ZWRUZXRoZXJPZmZzZXRWYWx1ZS5tYWluQXhpcztcbiAgICB2YXIgYXJyb3dPZmZzZXRQYXJlbnQgPSBzdGF0ZS5lbGVtZW50cy5hcnJvdyAmJiBnZXRPZmZzZXRQYXJlbnQoc3RhdGUuZWxlbWVudHMuYXJyb3cpO1xuICAgIHZhciBjbGllbnRPZmZzZXQgPSBhcnJvd09mZnNldFBhcmVudCA/IG1haW5BeGlzID09PSAneScgPyBhcnJvd09mZnNldFBhcmVudC5jbGllbnRUb3AgfHwgMCA6IGFycm93T2Zmc2V0UGFyZW50LmNsaWVudExlZnQgfHwgMCA6IDA7XG4gICAgdmFyIG9mZnNldE1vZGlmaWVyVmFsdWUgPSAoX29mZnNldE1vZGlmaWVyU3RhdGUkID0gb2Zmc2V0TW9kaWZpZXJTdGF0ZSA9PSBudWxsID8gdm9pZCAwIDogb2Zmc2V0TW9kaWZpZXJTdGF0ZVttYWluQXhpc10pICE9IG51bGwgPyBfb2Zmc2V0TW9kaWZpZXJTdGF0ZSQgOiAwO1xuICAgIHZhciB0ZXRoZXJNaW4gPSBvZmZzZXQgKyBtaW5PZmZzZXQgLSBvZmZzZXRNb2RpZmllclZhbHVlIC0gY2xpZW50T2Zmc2V0O1xuICAgIHZhciB0ZXRoZXJNYXggPSBvZmZzZXQgKyBtYXhPZmZzZXQgLSBvZmZzZXRNb2RpZmllclZhbHVlO1xuICAgIHZhciBwcmV2ZW50ZWRPZmZzZXQgPSB3aXRoaW4odGV0aGVyID8gbWF0aE1pbihtaW4sIHRldGhlck1pbikgOiBtaW4sIG9mZnNldCwgdGV0aGVyID8gbWF0aE1heChtYXgsIHRldGhlck1heCkgOiBtYXgpO1xuICAgIHBvcHBlck9mZnNldHNbbWFpbkF4aXNdID0gcHJldmVudGVkT2Zmc2V0O1xuICAgIGRhdGFbbWFpbkF4aXNdID0gcHJldmVudGVkT2Zmc2V0IC0gb2Zmc2V0O1xuICB9XG5cbiAgaWYgKGNoZWNrQWx0QXhpcykge1xuICAgIHZhciBfb2Zmc2V0TW9kaWZpZXJTdGF0ZSQyO1xuXG4gICAgdmFyIF9tYWluU2lkZSA9IG1haW5BeGlzID09PSAneCcgPyB0b3AgOiBsZWZ0O1xuXG4gICAgdmFyIF9hbHRTaWRlID0gbWFpbkF4aXMgPT09ICd4JyA/IGJvdHRvbSA6IHJpZ2h0O1xuXG4gICAgdmFyIF9vZmZzZXQgPSBwb3BwZXJPZmZzZXRzW2FsdEF4aXNdO1xuXG4gICAgdmFyIF9sZW4gPSBhbHRBeGlzID09PSAneScgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG5cbiAgICB2YXIgX21pbiA9IF9vZmZzZXQgKyBvdmVyZmxvd1tfbWFpblNpZGVdO1xuXG4gICAgdmFyIF9tYXggPSBfb2Zmc2V0IC0gb3ZlcmZsb3dbX2FsdFNpZGVdO1xuXG4gICAgdmFyIGlzT3JpZ2luU2lkZSA9IFt0b3AsIGxlZnRdLmluZGV4T2YoYmFzZVBsYWNlbWVudCkgIT09IC0xO1xuXG4gICAgdmFyIF9vZmZzZXRNb2RpZmllclZhbHVlID0gKF9vZmZzZXRNb2RpZmllclN0YXRlJDIgPSBvZmZzZXRNb2RpZmllclN0YXRlID09IG51bGwgPyB2b2lkIDAgOiBvZmZzZXRNb2RpZmllclN0YXRlW2FsdEF4aXNdKSAhPSBudWxsID8gX29mZnNldE1vZGlmaWVyU3RhdGUkMiA6IDA7XG5cbiAgICB2YXIgX3RldGhlck1pbiA9IGlzT3JpZ2luU2lkZSA/IF9taW4gOiBfb2Zmc2V0IC0gcmVmZXJlbmNlUmVjdFtfbGVuXSAtIHBvcHBlclJlY3RbX2xlbl0gLSBfb2Zmc2V0TW9kaWZpZXJWYWx1ZSArIG5vcm1hbGl6ZWRUZXRoZXJPZmZzZXRWYWx1ZS5hbHRBeGlzO1xuXG4gICAgdmFyIF90ZXRoZXJNYXggPSBpc09yaWdpblNpZGUgPyBfb2Zmc2V0ICsgcmVmZXJlbmNlUmVjdFtfbGVuXSArIHBvcHBlclJlY3RbX2xlbl0gLSBfb2Zmc2V0TW9kaWZpZXJWYWx1ZSAtIG5vcm1hbGl6ZWRUZXRoZXJPZmZzZXRWYWx1ZS5hbHRBeGlzIDogX21heDtcblxuICAgIHZhciBfcHJldmVudGVkT2Zmc2V0ID0gdGV0aGVyICYmIGlzT3JpZ2luU2lkZSA/IHdpdGhpbk1heENsYW1wKF90ZXRoZXJNaW4sIF9vZmZzZXQsIF90ZXRoZXJNYXgpIDogd2l0aGluKHRldGhlciA/IF90ZXRoZXJNaW4gOiBfbWluLCBfb2Zmc2V0LCB0ZXRoZXIgPyBfdGV0aGVyTWF4IDogX21heCk7XG5cbiAgICBwb3BwZXJPZmZzZXRzW2FsdEF4aXNdID0gX3ByZXZlbnRlZE9mZnNldDtcbiAgICBkYXRhW2FsdEF4aXNdID0gX3ByZXZlbnRlZE9mZnNldCAtIF9vZmZzZXQ7XG4gIH1cblxuICBzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdID0gZGF0YTtcbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3ByZXZlbnRPdmVyZmxvdycsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnbWFpbicsXG4gIGZuOiBwcmV2ZW50T3ZlcmZsb3csXG4gIHJlcXVpcmVzSWZFeGlzdHM6IFsnb2Zmc2V0J11cbn07IiwiaW1wb3J0IHsgcG9wcGVyR2VuZXJhdG9yLCBkZXRlY3RPdmVyZmxvdyB9IGZyb20gXCIuL2NyZWF0ZVBvcHBlci5qc1wiO1xuaW1wb3J0IGV2ZW50TGlzdGVuZXJzIGZyb20gXCIuL21vZGlmaWVycy9ldmVudExpc3RlbmVycy5qc1wiO1xuaW1wb3J0IHBvcHBlck9mZnNldHMgZnJvbSBcIi4vbW9kaWZpZXJzL3BvcHBlck9mZnNldHMuanNcIjtcbmltcG9ydCBjb21wdXRlU3R5bGVzIGZyb20gXCIuL21vZGlmaWVycy9jb21wdXRlU3R5bGVzLmpzXCI7XG5pbXBvcnQgYXBwbHlTdHlsZXMgZnJvbSBcIi4vbW9kaWZpZXJzL2FwcGx5U3R5bGVzLmpzXCI7XG52YXIgZGVmYXVsdE1vZGlmaWVycyA9IFtldmVudExpc3RlbmVycywgcG9wcGVyT2Zmc2V0cywgY29tcHV0ZVN0eWxlcywgYXBwbHlTdHlsZXNdO1xudmFyIGNyZWF0ZVBvcHBlciA9IC8qI19fUFVSRV9fKi9wb3BwZXJHZW5lcmF0b3Ioe1xuICBkZWZhdWx0TW9kaWZpZXJzOiBkZWZhdWx0TW9kaWZpZXJzXG59KTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgeyBjcmVhdGVQb3BwZXIsIHBvcHBlckdlbmVyYXRvciwgZGVmYXVsdE1vZGlmaWVycywgZGV0ZWN0T3ZlcmZsb3cgfTsiLCJpbXBvcnQgeyBwb3BwZXJHZW5lcmF0b3IsIGRldGVjdE92ZXJmbG93IH0gZnJvbSBcIi4vY3JlYXRlUG9wcGVyLmpzXCI7XG5pbXBvcnQgZXZlbnRMaXN0ZW5lcnMgZnJvbSBcIi4vbW9kaWZpZXJzL2V2ZW50TGlzdGVuZXJzLmpzXCI7XG5pbXBvcnQgcG9wcGVyT2Zmc2V0cyBmcm9tIFwiLi9tb2RpZmllcnMvcG9wcGVyT2Zmc2V0cy5qc1wiO1xuaW1wb3J0IGNvbXB1dGVTdHlsZXMgZnJvbSBcIi4vbW9kaWZpZXJzL2NvbXB1dGVTdHlsZXMuanNcIjtcbmltcG9ydCBhcHBseVN0eWxlcyBmcm9tIFwiLi9tb2RpZmllcnMvYXBwbHlTdHlsZXMuanNcIjtcbmltcG9ydCBvZmZzZXQgZnJvbSBcIi4vbW9kaWZpZXJzL29mZnNldC5qc1wiO1xuaW1wb3J0IGZsaXAgZnJvbSBcIi4vbW9kaWZpZXJzL2ZsaXAuanNcIjtcbmltcG9ydCBwcmV2ZW50T3ZlcmZsb3cgZnJvbSBcIi4vbW9kaWZpZXJzL3ByZXZlbnRPdmVyZmxvdy5qc1wiO1xuaW1wb3J0IGFycm93IGZyb20gXCIuL21vZGlmaWVycy9hcnJvdy5qc1wiO1xuaW1wb3J0IGhpZGUgZnJvbSBcIi4vbW9kaWZpZXJzL2hpZGUuanNcIjtcbnZhciBkZWZhdWx0TW9kaWZpZXJzID0gW2V2ZW50TGlzdGVuZXJzLCBwb3BwZXJPZmZzZXRzLCBjb21wdXRlU3R5bGVzLCBhcHBseVN0eWxlcywgb2Zmc2V0LCBmbGlwLCBwcmV2ZW50T3ZlcmZsb3csIGFycm93LCBoaWRlXTtcbnZhciBjcmVhdGVQb3BwZXIgPSAvKiNfX1BVUkVfXyovcG9wcGVyR2VuZXJhdG9yKHtcbiAgZGVmYXVsdE1vZGlmaWVyczogZGVmYXVsdE1vZGlmaWVyc1xufSk7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZXhwb3J0IHsgY3JlYXRlUG9wcGVyLCBwb3BwZXJHZW5lcmF0b3IsIGRlZmF1bHRNb2RpZmllcnMsIGRldGVjdE92ZXJmbG93IH07IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZXhwb3J0IHsgY3JlYXRlUG9wcGVyIGFzIGNyZWF0ZVBvcHBlckxpdGUgfSBmcm9tIFwiLi9wb3BwZXItbGl0ZS5qc1wiOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbmV4cG9ydCAqIGZyb20gXCIuL21vZGlmaWVycy9pbmRleC5qc1wiOyIsImltcG9ydCBnZXRWYXJpYXRpb24gZnJvbSBcIi4vZ2V0VmFyaWF0aW9uLmpzXCI7XG5pbXBvcnQgeyB2YXJpYXRpb25QbGFjZW1lbnRzLCBiYXNlUGxhY2VtZW50cywgcGxhY2VtZW50cyBhcyBhbGxQbGFjZW1lbnRzIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG5pbXBvcnQgZGV0ZWN0T3ZlcmZsb3cgZnJvbSBcIi4vZGV0ZWN0T3ZlcmZsb3cuanNcIjtcbmltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbXB1dGVBdXRvUGxhY2VtZW50KHN0YXRlLCBvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICB2YXIgX29wdGlvbnMgPSBvcHRpb25zLFxuICAgICAgcGxhY2VtZW50ID0gX29wdGlvbnMucGxhY2VtZW50LFxuICAgICAgYm91bmRhcnkgPSBfb3B0aW9ucy5ib3VuZGFyeSxcbiAgICAgIHJvb3RCb3VuZGFyeSA9IF9vcHRpb25zLnJvb3RCb3VuZGFyeSxcbiAgICAgIHBhZGRpbmcgPSBfb3B0aW9ucy5wYWRkaW5nLFxuICAgICAgZmxpcFZhcmlhdGlvbnMgPSBfb3B0aW9ucy5mbGlwVmFyaWF0aW9ucyxcbiAgICAgIF9vcHRpb25zJGFsbG93ZWRBdXRvUCA9IF9vcHRpb25zLmFsbG93ZWRBdXRvUGxhY2VtZW50cyxcbiAgICAgIGFsbG93ZWRBdXRvUGxhY2VtZW50cyA9IF9vcHRpb25zJGFsbG93ZWRBdXRvUCA9PT0gdm9pZCAwID8gYWxsUGxhY2VtZW50cyA6IF9vcHRpb25zJGFsbG93ZWRBdXRvUDtcbiAgdmFyIHZhcmlhdGlvbiA9IGdldFZhcmlhdGlvbihwbGFjZW1lbnQpO1xuICB2YXIgcGxhY2VtZW50cyA9IHZhcmlhdGlvbiA/IGZsaXBWYXJpYXRpb25zID8gdmFyaWF0aW9uUGxhY2VtZW50cyA6IHZhcmlhdGlvblBsYWNlbWVudHMuZmlsdGVyKGZ1bmN0aW9uIChwbGFjZW1lbnQpIHtcbiAgICByZXR1cm4gZ2V0VmFyaWF0aW9uKHBsYWNlbWVudCkgPT09IHZhcmlhdGlvbjtcbiAgfSkgOiBiYXNlUGxhY2VtZW50cztcbiAgdmFyIGFsbG93ZWRQbGFjZW1lbnRzID0gcGxhY2VtZW50cy5maWx0ZXIoZnVuY3Rpb24gKHBsYWNlbWVudCkge1xuICAgIHJldHVybiBhbGxvd2VkQXV0b1BsYWNlbWVudHMuaW5kZXhPZihwbGFjZW1lbnQpID49IDA7XG4gIH0pO1xuXG4gIGlmIChhbGxvd2VkUGxhY2VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBhbGxvd2VkUGxhY2VtZW50cyA9IHBsYWNlbWVudHM7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFsnUG9wcGVyOiBUaGUgYGFsbG93ZWRBdXRvUGxhY2VtZW50c2Agb3B0aW9uIGRpZCBub3QgYWxsb3cgYW55JywgJ3BsYWNlbWVudHMuIEVuc3VyZSB0aGUgYHBsYWNlbWVudGAgb3B0aW9uIG1hdGNoZXMgdGhlIHZhcmlhdGlvbicsICdvZiB0aGUgYWxsb3dlZCBwbGFjZW1lbnRzLicsICdGb3IgZXhhbXBsZSwgXCJhdXRvXCIgY2Fubm90IGJlIHVzZWQgdG8gYWxsb3cgXCJib3R0b20tc3RhcnRcIi4nLCAnVXNlIFwiYXV0by1zdGFydFwiIGluc3RlYWQuJ10uam9pbignICcpKTtcbiAgICB9XG4gIH0gLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtdHlwZV06IEZsb3cgc2VlbXMgdG8gaGF2ZSBwcm9ibGVtcyB3aXRoIHR3byBhcnJheSB1bmlvbnMuLi5cblxuXG4gIHZhciBvdmVyZmxvd3MgPSBhbGxvd2VkUGxhY2VtZW50cy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcGxhY2VtZW50KSB7XG4gICAgYWNjW3BsYWNlbWVudF0gPSBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwge1xuICAgICAgcGxhY2VtZW50OiBwbGFjZW1lbnQsXG4gICAgICBib3VuZGFyeTogYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnk6IHJvb3RCb3VuZGFyeSxcbiAgICAgIHBhZGRpbmc6IHBhZGRpbmdcbiAgICB9KVtnZXRCYXNlUGxhY2VtZW50KHBsYWNlbWVudCldO1xuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9KTtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG92ZXJmbG93cykuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBvdmVyZmxvd3NbYV0gLSBvdmVyZmxvd3NbYl07XG4gIH0pO1xufSIsImltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRWYXJpYXRpb24gZnJvbSBcIi4vZ2V0VmFyaWF0aW9uLmpzXCI7XG5pbXBvcnQgZ2V0TWFpbkF4aXNGcm9tUGxhY2VtZW50IGZyb20gXCIuL2dldE1haW5BeGlzRnJvbVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IHsgdG9wLCByaWdodCwgYm90dG9tLCBsZWZ0LCBzdGFydCwgZW5kIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21wdXRlT2Zmc2V0cyhfcmVmKSB7XG4gIHZhciByZWZlcmVuY2UgPSBfcmVmLnJlZmVyZW5jZSxcbiAgICAgIGVsZW1lbnQgPSBfcmVmLmVsZW1lbnQsXG4gICAgICBwbGFjZW1lbnQgPSBfcmVmLnBsYWNlbWVudDtcbiAgdmFyIGJhc2VQbGFjZW1lbnQgPSBwbGFjZW1lbnQgPyBnZXRCYXNlUGxhY2VtZW50KHBsYWNlbWVudCkgOiBudWxsO1xuICB2YXIgdmFyaWF0aW9uID0gcGxhY2VtZW50ID8gZ2V0VmFyaWF0aW9uKHBsYWNlbWVudCkgOiBudWxsO1xuICB2YXIgY29tbW9uWCA9IHJlZmVyZW5jZS54ICsgcmVmZXJlbmNlLndpZHRoIC8gMiAtIGVsZW1lbnQud2lkdGggLyAyO1xuICB2YXIgY29tbW9uWSA9IHJlZmVyZW5jZS55ICsgcmVmZXJlbmNlLmhlaWdodCAvIDIgLSBlbGVtZW50LmhlaWdodCAvIDI7XG4gIHZhciBvZmZzZXRzO1xuXG4gIHN3aXRjaCAoYmFzZVBsYWNlbWVudCkge1xuICAgIGNhc2UgdG9wOlxuICAgICAgb2Zmc2V0cyA9IHtcbiAgICAgICAgeDogY29tbW9uWCxcbiAgICAgICAgeTogcmVmZXJlbmNlLnkgLSBlbGVtZW50LmhlaWdodFxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBib3R0b206XG4gICAgICBvZmZzZXRzID0ge1xuICAgICAgICB4OiBjb21tb25YLFxuICAgICAgICB5OiByZWZlcmVuY2UueSArIHJlZmVyZW5jZS5oZWlnaHRcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgcmlnaHQ6XG4gICAgICBvZmZzZXRzID0ge1xuICAgICAgICB4OiByZWZlcmVuY2UueCArIHJlZmVyZW5jZS53aWR0aCxcbiAgICAgICAgeTogY29tbW9uWVxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBsZWZ0OlxuICAgICAgb2Zmc2V0cyA9IHtcbiAgICAgICAgeDogcmVmZXJlbmNlLnggLSBlbGVtZW50LndpZHRoLFxuICAgICAgICB5OiBjb21tb25ZXG4gICAgICB9O1xuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgb2Zmc2V0cyA9IHtcbiAgICAgICAgeDogcmVmZXJlbmNlLngsXG4gICAgICAgIHk6IHJlZmVyZW5jZS55XG4gICAgICB9O1xuICB9XG5cbiAgdmFyIG1haW5BeGlzID0gYmFzZVBsYWNlbWVudCA/IGdldE1haW5BeGlzRnJvbVBsYWNlbWVudChiYXNlUGxhY2VtZW50KSA6IG51bGw7XG5cbiAgaWYgKG1haW5BeGlzICE9IG51bGwpIHtcbiAgICB2YXIgbGVuID0gbWFpbkF4aXMgPT09ICd5JyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcblxuICAgIHN3aXRjaCAodmFyaWF0aW9uKSB7XG4gICAgICBjYXNlIHN0YXJ0OlxuICAgICAgICBvZmZzZXRzW21haW5BeGlzXSA9IG9mZnNldHNbbWFpbkF4aXNdIC0gKHJlZmVyZW5jZVtsZW5dIC8gMiAtIGVsZW1lbnRbbGVuXSAvIDIpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBlbmQ6XG4gICAgICAgIG9mZnNldHNbbWFpbkF4aXNdID0gb2Zmc2V0c1ttYWluQXhpc10gKyAocmVmZXJlbmNlW2xlbl0gLyAyIC0gZWxlbWVudFtsZW5dIC8gMik7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvZmZzZXRzO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlYm91bmNlKGZuKSB7XG4gIHZhciBwZW5kaW5nO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGlmICghcGVuZGluZykge1xuICAgICAgcGVuZGluZyA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHBlbmRpbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgcmVzb2x2ZShmbigpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGVuZGluZztcbiAgfTtcbn0iLCJpbXBvcnQgZ2V0Q2xpcHBpbmdSZWN0IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0Q2xpcHBpbmdSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0RG9jdW1lbnRFbGVtZW50IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0RG9jdW1lbnRFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0Qm91bmRpbmdDbGllbnRSZWN0LmpzXCI7XG5pbXBvcnQgY29tcHV0ZU9mZnNldHMgZnJvbSBcIi4vY29tcHV0ZU9mZnNldHMuanNcIjtcbmltcG9ydCByZWN0VG9DbGllbnRSZWN0IGZyb20gXCIuL3JlY3RUb0NsaWVudFJlY3QuanNcIjtcbmltcG9ydCB7IGNsaXBwaW5nUGFyZW50cywgcmVmZXJlbmNlLCBwb3BwZXIsIGJvdHRvbSwgdG9wLCByaWdodCwgYmFzZVBsYWNlbWVudHMsIHZpZXdwb3J0IH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG5pbXBvcnQgeyBpc0VsZW1lbnQgfSBmcm9tIFwiLi4vZG9tLXV0aWxzL2luc3RhbmNlT2YuanNcIjtcbmltcG9ydCBtZXJnZVBhZGRpbmdPYmplY3QgZnJvbSBcIi4vbWVyZ2VQYWRkaW5nT2JqZWN0LmpzXCI7XG5pbXBvcnQgZXhwYW5kVG9IYXNoTWFwIGZyb20gXCIuL2V4cGFuZFRvSGFzaE1hcC5qc1wiOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRldGVjdE92ZXJmbG93KHN0YXRlLCBvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICB2YXIgX29wdGlvbnMgPSBvcHRpb25zLFxuICAgICAgX29wdGlvbnMkcGxhY2VtZW50ID0gX29wdGlvbnMucGxhY2VtZW50LFxuICAgICAgcGxhY2VtZW50ID0gX29wdGlvbnMkcGxhY2VtZW50ID09PSB2b2lkIDAgPyBzdGF0ZS5wbGFjZW1lbnQgOiBfb3B0aW9ucyRwbGFjZW1lbnQsXG4gICAgICBfb3B0aW9ucyRzdHJhdGVneSA9IF9vcHRpb25zLnN0cmF0ZWd5LFxuICAgICAgc3RyYXRlZ3kgPSBfb3B0aW9ucyRzdHJhdGVneSA9PT0gdm9pZCAwID8gc3RhdGUuc3RyYXRlZ3kgOiBfb3B0aW9ucyRzdHJhdGVneSxcbiAgICAgIF9vcHRpb25zJGJvdW5kYXJ5ID0gX29wdGlvbnMuYm91bmRhcnksXG4gICAgICBib3VuZGFyeSA9IF9vcHRpb25zJGJvdW5kYXJ5ID09PSB2b2lkIDAgPyBjbGlwcGluZ1BhcmVudHMgOiBfb3B0aW9ucyRib3VuZGFyeSxcbiAgICAgIF9vcHRpb25zJHJvb3RCb3VuZGFyeSA9IF9vcHRpb25zLnJvb3RCb3VuZGFyeSxcbiAgICAgIHJvb3RCb3VuZGFyeSA9IF9vcHRpb25zJHJvb3RCb3VuZGFyeSA9PT0gdm9pZCAwID8gdmlld3BvcnQgOiBfb3B0aW9ucyRyb290Qm91bmRhcnksXG4gICAgICBfb3B0aW9ucyRlbGVtZW50Q29udGUgPSBfb3B0aW9ucy5lbGVtZW50Q29udGV4dCxcbiAgICAgIGVsZW1lbnRDb250ZXh0ID0gX29wdGlvbnMkZWxlbWVudENvbnRlID09PSB2b2lkIDAgPyBwb3BwZXIgOiBfb3B0aW9ucyRlbGVtZW50Q29udGUsXG4gICAgICBfb3B0aW9ucyRhbHRCb3VuZGFyeSA9IF9vcHRpb25zLmFsdEJvdW5kYXJ5LFxuICAgICAgYWx0Qm91bmRhcnkgPSBfb3B0aW9ucyRhbHRCb3VuZGFyeSA9PT0gdm9pZCAwID8gZmFsc2UgOiBfb3B0aW9ucyRhbHRCb3VuZGFyeSxcbiAgICAgIF9vcHRpb25zJHBhZGRpbmcgPSBfb3B0aW9ucy5wYWRkaW5nLFxuICAgICAgcGFkZGluZyA9IF9vcHRpb25zJHBhZGRpbmcgPT09IHZvaWQgMCA/IDAgOiBfb3B0aW9ucyRwYWRkaW5nO1xuICB2YXIgcGFkZGluZ09iamVjdCA9IG1lcmdlUGFkZGluZ09iamVjdCh0eXBlb2YgcGFkZGluZyAhPT0gJ251bWJlcicgPyBwYWRkaW5nIDogZXhwYW5kVG9IYXNoTWFwKHBhZGRpbmcsIGJhc2VQbGFjZW1lbnRzKSk7XG4gIHZhciBhbHRDb250ZXh0ID0gZWxlbWVudENvbnRleHQgPT09IHBvcHBlciA/IHJlZmVyZW5jZSA6IHBvcHBlcjtcbiAgdmFyIHBvcHBlclJlY3QgPSBzdGF0ZS5yZWN0cy5wb3BwZXI7XG4gIHZhciBlbGVtZW50ID0gc3RhdGUuZWxlbWVudHNbYWx0Qm91bmRhcnkgPyBhbHRDb250ZXh0IDogZWxlbWVudENvbnRleHRdO1xuICB2YXIgY2xpcHBpbmdDbGllbnRSZWN0ID0gZ2V0Q2xpcHBpbmdSZWN0KGlzRWxlbWVudChlbGVtZW50KSA/IGVsZW1lbnQgOiBlbGVtZW50LmNvbnRleHRFbGVtZW50IHx8IGdldERvY3VtZW50RWxlbWVudChzdGF0ZS5lbGVtZW50cy5wb3BwZXIpLCBib3VuZGFyeSwgcm9vdEJvdW5kYXJ5LCBzdHJhdGVneSk7XG4gIHZhciByZWZlcmVuY2VDbGllbnRSZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KHN0YXRlLmVsZW1lbnRzLnJlZmVyZW5jZSk7XG4gIHZhciBwb3BwZXJPZmZzZXRzID0gY29tcHV0ZU9mZnNldHMoe1xuICAgIHJlZmVyZW5jZTogcmVmZXJlbmNlQ2xpZW50UmVjdCxcbiAgICBlbGVtZW50OiBwb3BwZXJSZWN0LFxuICAgIHN0cmF0ZWd5OiAnYWJzb2x1dGUnLFxuICAgIHBsYWNlbWVudDogcGxhY2VtZW50XG4gIH0pO1xuICB2YXIgcG9wcGVyQ2xpZW50UmVjdCA9IHJlY3RUb0NsaWVudFJlY3QoT2JqZWN0LmFzc2lnbih7fSwgcG9wcGVyUmVjdCwgcG9wcGVyT2Zmc2V0cykpO1xuICB2YXIgZWxlbWVudENsaWVudFJlY3QgPSBlbGVtZW50Q29udGV4dCA9PT0gcG9wcGVyID8gcG9wcGVyQ2xpZW50UmVjdCA6IHJlZmVyZW5jZUNsaWVudFJlY3Q7IC8vIHBvc2l0aXZlID0gb3ZlcmZsb3dpbmcgdGhlIGNsaXBwaW5nIHJlY3RcbiAgLy8gMCBvciBuZWdhdGl2ZSA9IHdpdGhpbiB0aGUgY2xpcHBpbmcgcmVjdFxuXG4gIHZhciBvdmVyZmxvd09mZnNldHMgPSB7XG4gICAgdG9wOiBjbGlwcGluZ0NsaWVudFJlY3QudG9wIC0gZWxlbWVudENsaWVudFJlY3QudG9wICsgcGFkZGluZ09iamVjdC50b3AsXG4gICAgYm90dG9tOiBlbGVtZW50Q2xpZW50UmVjdC5ib3R0b20gLSBjbGlwcGluZ0NsaWVudFJlY3QuYm90dG9tICsgcGFkZGluZ09iamVjdC5ib3R0b20sXG4gICAgbGVmdDogY2xpcHBpbmdDbGllbnRSZWN0LmxlZnQgLSBlbGVtZW50Q2xpZW50UmVjdC5sZWZ0ICsgcGFkZGluZ09iamVjdC5sZWZ0LFxuICAgIHJpZ2h0OiBlbGVtZW50Q2xpZW50UmVjdC5yaWdodCAtIGNsaXBwaW5nQ2xpZW50UmVjdC5yaWdodCArIHBhZGRpbmdPYmplY3QucmlnaHRcbiAgfTtcbiAgdmFyIG9mZnNldERhdGEgPSBzdGF0ZS5tb2RpZmllcnNEYXRhLm9mZnNldDsgLy8gT2Zmc2V0cyBjYW4gYmUgYXBwbGllZCBvbmx5IHRvIHRoZSBwb3BwZXIgZWxlbWVudFxuXG4gIGlmIChlbGVtZW50Q29udGV4dCA9PT0gcG9wcGVyICYmIG9mZnNldERhdGEpIHtcbiAgICB2YXIgb2Zmc2V0ID0gb2Zmc2V0RGF0YVtwbGFjZW1lbnRdO1xuICAgIE9iamVjdC5rZXlzKG92ZXJmbG93T2Zmc2V0cykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICB2YXIgbXVsdGlwbHkgPSBbcmlnaHQsIGJvdHRvbV0uaW5kZXhPZihrZXkpID49IDAgPyAxIDogLTE7XG4gICAgICB2YXIgYXhpcyA9IFt0b3AsIGJvdHRvbV0uaW5kZXhPZihrZXkpID49IDAgPyAneScgOiAneCc7XG4gICAgICBvdmVyZmxvd09mZnNldHNba2V5XSArPSBvZmZzZXRbYXhpc10gKiBtdWx0aXBseTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBvdmVyZmxvd09mZnNldHM7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXhwYW5kVG9IYXNoTWFwKHZhbHVlLCBrZXlzKSB7XG4gIHJldHVybiBrZXlzLnJlZHVjZShmdW5jdGlvbiAoaGFzaE1hcCwga2V5KSB7XG4gICAgaGFzaE1hcFtrZXldID0gdmFsdWU7XG4gICAgcmV0dXJuIGhhc2hNYXA7XG4gIH0sIHt9KTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmb3JtYXQoc3RyKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiBbXS5jb25jYXQoYXJncykucmVkdWNlKGZ1bmN0aW9uIChwLCBjKSB7XG4gICAgcmV0dXJuIHAucmVwbGFjZSgvJXMvLCBjKTtcbiAgfSwgc3RyKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRBbHRBeGlzKGF4aXMpIHtcbiAgcmV0dXJuIGF4aXMgPT09ICd4JyA/ICd5JyA6ICd4Jztcbn0iLCJpbXBvcnQgeyBhdXRvIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRCYXNlUGxhY2VtZW50KHBsYWNlbWVudCkge1xuICByZXR1cm4gcGxhY2VtZW50LnNwbGl0KCctJylbMF07XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0RnJlc2hTaWRlT2JqZWN0KCkge1xuICByZXR1cm4ge1xuICAgIHRvcDogMCxcbiAgICByaWdodDogMCxcbiAgICBib3R0b206IDAsXG4gICAgbGVmdDogMFxuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE1haW5BeGlzRnJvbVBsYWNlbWVudChwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIFsndG9wJywgJ2JvdHRvbSddLmluZGV4T2YocGxhY2VtZW50KSA+PSAwID8gJ3gnIDogJ3knO1xufSIsInZhciBoYXNoID0ge1xuICBsZWZ0OiAncmlnaHQnLFxuICByaWdodDogJ2xlZnQnLFxuICBib3R0b206ICd0b3AnLFxuICB0b3A6ICdib3R0b20nXG59O1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0T3Bwb3NpdGVQbGFjZW1lbnQocGxhY2VtZW50KSB7XG4gIHJldHVybiBwbGFjZW1lbnQucmVwbGFjZSgvbGVmdHxyaWdodHxib3R0b218dG9wL2csIGZ1bmN0aW9uIChtYXRjaGVkKSB7XG4gICAgcmV0dXJuIGhhc2hbbWF0Y2hlZF07XG4gIH0pO1xufSIsInZhciBoYXNoID0ge1xuICBzdGFydDogJ2VuZCcsXG4gIGVuZDogJ3N0YXJ0J1xufTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE9wcG9zaXRlVmFyaWF0aW9uUGxhY2VtZW50KHBsYWNlbWVudCkge1xuICByZXR1cm4gcGxhY2VtZW50LnJlcGxhY2UoL3N0YXJ0fGVuZC9nLCBmdW5jdGlvbiAobWF0Y2hlZCkge1xuICAgIHJldHVybiBoYXNoW21hdGNoZWRdO1xuICB9KTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRWYXJpYXRpb24ocGxhY2VtZW50KSB7XG4gIHJldHVybiBwbGFjZW1lbnQuc3BsaXQoJy0nKVsxXTtcbn0iLCJleHBvcnQgdmFyIG1heCA9IE1hdGgubWF4O1xuZXhwb3J0IHZhciBtaW4gPSBNYXRoLm1pbjtcbmV4cG9ydCB2YXIgcm91bmQgPSBNYXRoLnJvdW5kOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1lcmdlQnlOYW1lKG1vZGlmaWVycykge1xuICB2YXIgbWVyZ2VkID0gbW9kaWZpZXJzLnJlZHVjZShmdW5jdGlvbiAobWVyZ2VkLCBjdXJyZW50KSB7XG4gICAgdmFyIGV4aXN0aW5nID0gbWVyZ2VkW2N1cnJlbnQubmFtZV07XG4gICAgbWVyZ2VkW2N1cnJlbnQubmFtZV0gPSBleGlzdGluZyA/IE9iamVjdC5hc3NpZ24oe30sIGV4aXN0aW5nLCBjdXJyZW50LCB7XG4gICAgICBvcHRpb25zOiBPYmplY3QuYXNzaWduKHt9LCBleGlzdGluZy5vcHRpb25zLCBjdXJyZW50Lm9wdGlvbnMpLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgZXhpc3RpbmcuZGF0YSwgY3VycmVudC5kYXRhKVxuICAgIH0pIDogY3VycmVudDtcbiAgICByZXR1cm4gbWVyZ2VkO1xuICB9LCB7fSk7IC8vIElFMTEgZG9lcyBub3Qgc3VwcG9ydCBPYmplY3QudmFsdWVzXG5cbiAgcmV0dXJuIE9iamVjdC5rZXlzKG1lcmdlZCkubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gbWVyZ2VkW2tleV07XG4gIH0pO1xufSIsImltcG9ydCBnZXRGcmVzaFNpZGVPYmplY3QgZnJvbSBcIi4vZ2V0RnJlc2hTaWRlT2JqZWN0LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtZXJnZVBhZGRpbmdPYmplY3QocGFkZGluZ09iamVjdCkge1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZ2V0RnJlc2hTaWRlT2JqZWN0KCksIHBhZGRpbmdPYmplY3QpO1xufSIsImltcG9ydCB7IG1vZGlmaWVyUGhhc2VzIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7IC8vIHNvdXJjZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDk4NzUyNTVcblxuZnVuY3Rpb24gb3JkZXIobW9kaWZpZXJzKSB7XG4gIHZhciBtYXAgPSBuZXcgTWFwKCk7XG4gIHZhciB2aXNpdGVkID0gbmV3IFNldCgpO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIG1vZGlmaWVycy5mb3JFYWNoKGZ1bmN0aW9uIChtb2RpZmllcikge1xuICAgIG1hcC5zZXQobW9kaWZpZXIubmFtZSwgbW9kaWZpZXIpO1xuICB9KTsgLy8gT24gdmlzaXRpbmcgb2JqZWN0LCBjaGVjayBmb3IgaXRzIGRlcGVuZGVuY2llcyBhbmQgdmlzaXQgdGhlbSByZWN1cnNpdmVseVxuXG4gIGZ1bmN0aW9uIHNvcnQobW9kaWZpZXIpIHtcbiAgICB2aXNpdGVkLmFkZChtb2RpZmllci5uYW1lKTtcbiAgICB2YXIgcmVxdWlyZXMgPSBbXS5jb25jYXQobW9kaWZpZXIucmVxdWlyZXMgfHwgW10sIG1vZGlmaWVyLnJlcXVpcmVzSWZFeGlzdHMgfHwgW10pO1xuICAgIHJlcXVpcmVzLmZvckVhY2goZnVuY3Rpb24gKGRlcCkge1xuICAgICAgaWYgKCF2aXNpdGVkLmhhcyhkZXApKSB7XG4gICAgICAgIHZhciBkZXBNb2RpZmllciA9IG1hcC5nZXQoZGVwKTtcblxuICAgICAgICBpZiAoZGVwTW9kaWZpZXIpIHtcbiAgICAgICAgICBzb3J0KGRlcE1vZGlmaWVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJlc3VsdC5wdXNoKG1vZGlmaWVyKTtcbiAgfVxuXG4gIG1vZGlmaWVycy5mb3JFYWNoKGZ1bmN0aW9uIChtb2RpZmllcikge1xuICAgIGlmICghdmlzaXRlZC5oYXMobW9kaWZpZXIubmFtZSkpIHtcbiAgICAgIC8vIGNoZWNrIGZvciB2aXNpdGVkIG9iamVjdFxuICAgICAgc29ydChtb2RpZmllcik7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3JkZXJNb2RpZmllcnMobW9kaWZpZXJzKSB7XG4gIC8vIG9yZGVyIGJhc2VkIG9uIGRlcGVuZGVuY2llc1xuICB2YXIgb3JkZXJlZE1vZGlmaWVycyA9IG9yZGVyKG1vZGlmaWVycyk7IC8vIG9yZGVyIGJhc2VkIG9uIHBoYXNlXG5cbiAgcmV0dXJuIG1vZGlmaWVyUGhhc2VzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwaGFzZSkge1xuICAgIHJldHVybiBhY2MuY29uY2F0KG9yZGVyZWRNb2RpZmllcnMuZmlsdGVyKGZ1bmN0aW9uIChtb2RpZmllcikge1xuICAgICAgcmV0dXJuIG1vZGlmaWVyLnBoYXNlID09PSBwaGFzZTtcbiAgICB9KSk7XG4gIH0sIFtdKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZWN0VG9DbGllbnRSZWN0KHJlY3QpIHtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHJlY3QsIHtcbiAgICBsZWZ0OiByZWN0LngsXG4gICAgdG9wOiByZWN0LnksXG4gICAgcmlnaHQ6IHJlY3QueCArIHJlY3Qud2lkdGgsXG4gICAgYm90dG9tOiByZWN0LnkgKyByZWN0LmhlaWdodFxuICB9KTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1bmlxdWVCeShhcnIsIGZuKSB7XG4gIHZhciBpZGVudGlmaWVycyA9IG5ldyBTZXQoKTtcbiAgcmV0dXJuIGFyci5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICB2YXIgaWRlbnRpZmllciA9IGZuKGl0ZW0pO1xuXG4gICAgaWYgKCFpZGVudGlmaWVycy5oYXMoaWRlbnRpZmllcikpIHtcbiAgICAgIGlkZW50aWZpZXJzLmFkZChpZGVudGlmaWVyKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0VUFTdHJpbmcoKSB7XG4gIHZhciB1YURhdGEgPSBuYXZpZ2F0b3IudXNlckFnZW50RGF0YTtcblxuICBpZiAodWFEYXRhICE9IG51bGwgJiYgdWFEYXRhLmJyYW5kcyAmJiBBcnJheS5pc0FycmF5KHVhRGF0YS5icmFuZHMpKSB7XG4gICAgcmV0dXJuIHVhRGF0YS5icmFuZHMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICByZXR1cm4gaXRlbS5icmFuZCArIFwiL1wiICsgaXRlbS52ZXJzaW9uO1xuICAgIH0pLmpvaW4oJyAnKTtcbiAgfVxuXG4gIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50O1xufSIsImltcG9ydCBmb3JtYXQgZnJvbSBcIi4vZm9ybWF0LmpzXCI7XG5pbXBvcnQgeyBtb2RpZmllclBoYXNlcyB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xudmFyIElOVkFMSURfTU9ESUZJRVJfRVJST1IgPSAnUG9wcGVyOiBtb2RpZmllciBcIiVzXCIgcHJvdmlkZWQgYW4gaW52YWxpZCAlcyBwcm9wZXJ0eSwgZXhwZWN0ZWQgJXMgYnV0IGdvdCAlcyc7XG52YXIgTUlTU0lOR19ERVBFTkRFTkNZX0VSUk9SID0gJ1BvcHBlcjogbW9kaWZpZXIgXCIlc1wiIHJlcXVpcmVzIFwiJXNcIiwgYnV0IFwiJXNcIiBtb2RpZmllciBpcyBub3QgYXZhaWxhYmxlJztcbnZhciBWQUxJRF9QUk9QRVJUSUVTID0gWyduYW1lJywgJ2VuYWJsZWQnLCAncGhhc2UnLCAnZm4nLCAnZWZmZWN0JywgJ3JlcXVpcmVzJywgJ29wdGlvbnMnXTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZhbGlkYXRlTW9kaWZpZXJzKG1vZGlmaWVycykge1xuICBtb2RpZmllcnMuZm9yRWFjaChmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICBbXS5jb25jYXQoT2JqZWN0LmtleXMobW9kaWZpZXIpLCBWQUxJRF9QUk9QRVJUSUVTKSAvLyBJRTExLWNvbXBhdGlibGUgcmVwbGFjZW1lbnQgZm9yIGBuZXcgU2V0KGl0ZXJhYmxlKWBcbiAgICAuZmlsdGVyKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIHNlbGYpIHtcbiAgICAgIHJldHVybiBzZWxmLmluZGV4T2YodmFsdWUpID09PSBpbmRleDtcbiAgICB9KS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgIGNhc2UgJ25hbWUnOlxuICAgICAgICAgIGlmICh0eXBlb2YgbW9kaWZpZXIubmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybWF0KElOVkFMSURfTU9ESUZJRVJfRVJST1IsIFN0cmluZyhtb2RpZmllci5uYW1lKSwgJ1wibmFtZVwiJywgJ1wic3RyaW5nXCInLCBcIlxcXCJcIiArIFN0cmluZyhtb2RpZmllci5uYW1lKSArIFwiXFxcIlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnZW5hYmxlZCc6XG4gICAgICAgICAgaWYgKHR5cGVvZiBtb2RpZmllci5lbmFibGVkICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybWF0KElOVkFMSURfTU9ESUZJRVJfRVJST1IsIG1vZGlmaWVyLm5hbWUsICdcImVuYWJsZWRcIicsICdcImJvb2xlYW5cIicsIFwiXFxcIlwiICsgU3RyaW5nKG1vZGlmaWVyLmVuYWJsZWQpICsgXCJcXFwiXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdwaGFzZSc6XG4gICAgICAgICAgaWYgKG1vZGlmaWVyUGhhc2VzLmluZGV4T2YobW9kaWZpZXIucGhhc2UpIDwgMCkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoSU5WQUxJRF9NT0RJRklFUl9FUlJPUiwgbW9kaWZpZXIubmFtZSwgJ1wicGhhc2VcIicsIFwiZWl0aGVyIFwiICsgbW9kaWZpZXJQaGFzZXMuam9pbignLCAnKSwgXCJcXFwiXCIgKyBTdHJpbmcobW9kaWZpZXIucGhhc2UpICsgXCJcXFwiXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdmbic6XG4gICAgICAgICAgaWYgKHR5cGVvZiBtb2RpZmllci5mbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoSU5WQUxJRF9NT0RJRklFUl9FUlJPUiwgbW9kaWZpZXIubmFtZSwgJ1wiZm5cIicsICdcImZ1bmN0aW9uXCInLCBcIlxcXCJcIiArIFN0cmluZyhtb2RpZmllci5mbikgKyBcIlxcXCJcIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2VmZmVjdCc6XG4gICAgICAgICAgaWYgKG1vZGlmaWVyLmVmZmVjdCAhPSBudWxsICYmIHR5cGVvZiBtb2RpZmllci5lZmZlY3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybWF0KElOVkFMSURfTU9ESUZJRVJfRVJST1IsIG1vZGlmaWVyLm5hbWUsICdcImVmZmVjdFwiJywgJ1wiZnVuY3Rpb25cIicsIFwiXFxcIlwiICsgU3RyaW5nKG1vZGlmaWVyLmZuKSArIFwiXFxcIlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAncmVxdWlyZXMnOlxuICAgICAgICAgIGlmIChtb2RpZmllci5yZXF1aXJlcyAhPSBudWxsICYmICFBcnJheS5pc0FycmF5KG1vZGlmaWVyLnJlcXVpcmVzKSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoSU5WQUxJRF9NT0RJRklFUl9FUlJPUiwgbW9kaWZpZXIubmFtZSwgJ1wicmVxdWlyZXNcIicsICdcImFycmF5XCInLCBcIlxcXCJcIiArIFN0cmluZyhtb2RpZmllci5yZXF1aXJlcykgKyBcIlxcXCJcIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3JlcXVpcmVzSWZFeGlzdHMnOlxuICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShtb2RpZmllci5yZXF1aXJlc0lmRXhpc3RzKSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoSU5WQUxJRF9NT0RJRklFUl9FUlJPUiwgbW9kaWZpZXIubmFtZSwgJ1wicmVxdWlyZXNJZkV4aXN0c1wiJywgJ1wiYXJyYXlcIicsIFwiXFxcIlwiICsgU3RyaW5nKG1vZGlmaWVyLnJlcXVpcmVzSWZFeGlzdHMpICsgXCJcXFwiXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdvcHRpb25zJzpcbiAgICAgICAgY2FzZSAnZGF0YSc6XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUG9wcGVySlM6IGFuIGludmFsaWQgcHJvcGVydHkgaGFzIGJlZW4gcHJvdmlkZWQgdG8gdGhlIFxcXCJcIiArIG1vZGlmaWVyLm5hbWUgKyBcIlxcXCIgbW9kaWZpZXIsIHZhbGlkIHByb3BlcnRpZXMgYXJlIFwiICsgVkFMSURfUFJPUEVSVElFUy5tYXAoZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlxcXCJcIiArIHMgKyBcIlxcXCJcIjtcbiAgICAgICAgICB9KS5qb2luKCcsICcpICsgXCI7IGJ1dCBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgd2FzIHByb3ZpZGVkLlwiKTtcbiAgICAgIH1cblxuICAgICAgbW9kaWZpZXIucmVxdWlyZXMgJiYgbW9kaWZpZXIucmVxdWlyZXMuZm9yRWFjaChmdW5jdGlvbiAocmVxdWlyZW1lbnQpIHtcbiAgICAgICAgaWYgKG1vZGlmaWVycy5maW5kKGZ1bmN0aW9uIChtb2QpIHtcbiAgICAgICAgICByZXR1cm4gbW9kLm5hbWUgPT09IHJlcXVpcmVtZW50O1xuICAgICAgICB9KSA9PSBudWxsKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoTUlTU0lOR19ERVBFTkRFTkNZX0VSUk9SLCBTdHJpbmcobW9kaWZpZXIubmFtZSksIHJlcXVpcmVtZW50LCByZXF1aXJlbWVudCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59IiwiaW1wb3J0IHsgbWF4IGFzIG1hdGhNYXgsIG1pbiBhcyBtYXRoTWluIH0gZnJvbSBcIi4vbWF0aC5qc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIHdpdGhpbihtaW4sIHZhbHVlLCBtYXgpIHtcbiAgcmV0dXJuIG1hdGhNYXgobWluLCBtYXRoTWluKHZhbHVlLCBtYXgpKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB3aXRoaW5NYXhDbGFtcChtaW4sIHZhbHVlLCBtYXgpIHtcbiAgdmFyIHYgPSB3aXRoaW4obWluLCB2YWx1ZSwgbWF4KTtcbiAgcmV0dXJuIHYgPiBtYXggPyBtYXggOiB2O1xufSIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgRGVmYXVsdCA9IHtcbiAgICBhbHdheXNPcGVuOiBmYWxzZSxcbiAgICBhY3RpdmVDbGFzc2VzOiAnYmctZ3JheS0xMDAgZGFyazpiZy1ncmF5LTgwMCB0ZXh0LWdyYXktOTAwIGRhcms6dGV4dC13aGl0ZScsXG4gICAgaW5hY3RpdmVDbGFzc2VzOiAndGV4dC1ncmF5LTUwMCBkYXJrOnRleHQtZ3JheS00MDAnLFxuICAgIG9uT3BlbjogZnVuY3Rpb24gKCkgeyB9LFxuICAgIG9uQ2xvc2U6IGZ1bmN0aW9uICgpIHsgfSxcbiAgICBvblRvZ2dsZTogZnVuY3Rpb24gKCkgeyB9LFxufTtcbnZhciBBY2NvcmRpb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQWNjb3JkaW9uKGl0ZW1zLCBvcHRpb25zKSB7XG4gICAgICAgIGlmIChpdGVtcyA9PT0gdm9pZCAwKSB7IGl0ZW1zID0gW107IH1cbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0gRGVmYXVsdDsgfVxuICAgICAgICB0aGlzLl9pdGVtcyA9IGl0ZW1zO1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gX19hc3NpZ24oX19hc3NpZ24oe30sIERlZmF1bHQpLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5faW5pdCgpO1xuICAgIH1cbiAgICBBY2NvcmRpb24ucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5faXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBzaG93IGFjY29yZGlvbiBpdGVtIGJhc2VkIG9uIGNsaWNrXG4gICAgICAgICAgICB0aGlzLl9pdGVtcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMub3BlbihpdGVtLmlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaXRlbS50cmlnZ2VyRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnRvZ2dsZShpdGVtLmlkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBY2NvcmRpb24ucHJvdG90eXBlLmdldEl0ZW0gPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gaXRlbS5pZCA9PT0gaWQ7IH0pWzBdO1xuICAgIH07XG4gICAgQWNjb3JkaW9uLnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBpdGVtID0gdGhpcy5nZXRJdGVtKGlkKTtcbiAgICAgICAgLy8gZG9uJ3QgaGlkZSBvdGhlciBhY2NvcmRpb25zIGlmIGFsd2F5cyBvcGVuXG4gICAgICAgIGlmICghdGhpcy5fb3B0aW9ucy5hbHdheXNPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLl9pdGVtcy5tYXAoZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgICAgIGlmIChpICE9PSBpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIChfYSA9IGkudHJpZ2dlckVsLmNsYXNzTGlzdCkucmVtb3ZlLmFwcGx5KF9hLCBfdGhpcy5fb3B0aW9ucy5hY3RpdmVDbGFzc2VzLnNwbGl0KCcgJykpO1xuICAgICAgICAgICAgICAgICAgICAoX2IgPSBpLnRyaWdnZXJFbC5jbGFzc0xpc3QpLmFkZC5hcHBseShfYiwgX3RoaXMuX29wdGlvbnMuaW5hY3RpdmVDbGFzc2VzLnNwbGl0KCcgJykpO1xuICAgICAgICAgICAgICAgICAgICBpLnRhcmdldEVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICBpLnRyaWdnZXJFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcbiAgICAgICAgICAgICAgICAgICAgaS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgLy8gcm90YXRlIGljb24gaWYgc2V0XG4gICAgICAgICAgICAgICAgICAgIGlmIChpLmljb25FbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaS5pY29uRWwuY2xhc3NMaXN0LnJlbW92ZSgncm90YXRlLTE4MCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2hvdyBhY3RpdmUgaXRlbVxuICAgICAgICAoX2EgPSBpdGVtLnRyaWdnZXJFbC5jbGFzc0xpc3QpLmFkZC5hcHBseShfYSwgdGhpcy5fb3B0aW9ucy5hY3RpdmVDbGFzc2VzLnNwbGl0KCcgJykpO1xuICAgICAgICAoX2IgPSBpdGVtLnRyaWdnZXJFbC5jbGFzc0xpc3QpLnJlbW92ZS5hcHBseShfYiwgdGhpcy5fb3B0aW9ucy5pbmFjdGl2ZUNsYXNzZXMuc3BsaXQoJyAnKSk7XG4gICAgICAgIGl0ZW0udHJpZ2dlckVsLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG4gICAgICAgIGl0ZW0udGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgLy8gcm90YXRlIGljb24gaWYgc2V0XG4gICAgICAgIGlmIChpdGVtLmljb25FbCkge1xuICAgICAgICAgICAgaXRlbS5pY29uRWwuY2xhc3NMaXN0LmFkZCgncm90YXRlLTE4MCcpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25PcGVuKHRoaXMsIGl0ZW0pO1xuICAgIH07XG4gICAgQWNjb3JkaW9uLnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLmdldEl0ZW0oaWQpO1xuICAgICAgICBpZiAoaXRlbS5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoaWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vcGVuKGlkKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uVG9nZ2xlKHRoaXMsIGl0ZW0pO1xuICAgIH07XG4gICAgQWNjb3JkaW9uLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICB2YXIgaXRlbSA9IHRoaXMuZ2V0SXRlbShpZCk7XG4gICAgICAgIChfYSA9IGl0ZW0udHJpZ2dlckVsLmNsYXNzTGlzdCkucmVtb3ZlLmFwcGx5KF9hLCB0aGlzLl9vcHRpb25zLmFjdGl2ZUNsYXNzZXMuc3BsaXQoJyAnKSk7XG4gICAgICAgIChfYiA9IGl0ZW0udHJpZ2dlckVsLmNsYXNzTGlzdCkuYWRkLmFwcGx5KF9iLCB0aGlzLl9vcHRpb25zLmluYWN0aXZlQ2xhc3Nlcy5zcGxpdCgnICcpKTtcbiAgICAgICAgaXRlbS50YXJnZXRFbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgaXRlbS50cmlnZ2VyRWwuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgIGl0ZW0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIC8vIHJvdGF0ZSBpY29uIGlmIHNldFxuICAgICAgICBpZiAoaXRlbS5pY29uRWwpIHtcbiAgICAgICAgICAgIGl0ZW0uaWNvbkVsLmNsYXNzTGlzdC5yZW1vdmUoJ3JvdGF0ZS0xODAnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uQ2xvc2UodGhpcywgaXRlbSk7XG4gICAgfTtcbiAgICByZXR1cm4gQWNjb3JkaW9uO1xufSgpKTtcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHdpbmRvdy5BY2NvcmRpb24gPSBBY2NvcmRpb247XG59XG5leHBvcnQgZnVuY3Rpb24gaW5pdEFjY29yZGlvbnMoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYWNjb3JkaW9uXScpLmZvckVhY2goZnVuY3Rpb24gKCRhY2NvcmRpb25FbCkge1xuICAgICAgICB2YXIgYWx3YXlzT3BlbiA9ICRhY2NvcmRpb25FbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYWNjb3JkaW9uJyk7XG4gICAgICAgIHZhciBhY3RpdmVDbGFzc2VzID0gJGFjY29yZGlvbkVsLmdldEF0dHJpYnV0ZSgnZGF0YS1hY3RpdmUtY2xhc3NlcycpO1xuICAgICAgICB2YXIgaW5hY3RpdmVDbGFzc2VzID0gJGFjY29yZGlvbkVsLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmFjdGl2ZS1jbGFzc2VzJyk7XG4gICAgICAgIHZhciBpdGVtcyA9IFtdO1xuICAgICAgICAkYWNjb3JkaW9uRWxcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1hY2NvcmRpb24tdGFyZ2V0XScpXG4gICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAoJHRyaWdnZXJFbCkge1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgaWQ6ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWFjY29yZGlvbi10YXJnZXQnKSxcbiAgICAgICAgICAgICAgICB0cmlnZ2VyRWw6ICR0cmlnZ2VyRWwsXG4gICAgICAgICAgICAgICAgdGFyZ2V0RWw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYWNjb3JkaW9uLXRhcmdldCcpKSxcbiAgICAgICAgICAgICAgICBpY29uRWw6ICR0cmlnZ2VyRWwucXVlcnlTZWxlY3RvcignW2RhdGEtYWNjb3JkaW9uLWljb25dJyksXG4gICAgICAgICAgICAgICAgYWN0aXZlOiAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcpID09PSAndHJ1ZSdcbiAgICAgICAgICAgICAgICAgICAgPyB0cnVlXG4gICAgICAgICAgICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgICAgIG5ldyBBY2NvcmRpb24oaXRlbXMsIHtcbiAgICAgICAgICAgIGFsd2F5c09wZW46IGFsd2F5c09wZW4gPT09ICdvcGVuJyA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgIGFjdGl2ZUNsYXNzZXM6IGFjdGl2ZUNsYXNzZXNcbiAgICAgICAgICAgICAgICA/IGFjdGl2ZUNsYXNzZXNcbiAgICAgICAgICAgICAgICA6IERlZmF1bHQuYWN0aXZlQ2xhc3NlcyxcbiAgICAgICAgICAgIGluYWN0aXZlQ2xhc3NlczogaW5hY3RpdmVDbGFzc2VzXG4gICAgICAgICAgICAgICAgPyBpbmFjdGl2ZUNsYXNzZXNcbiAgICAgICAgICAgICAgICA6IERlZmF1bHQuaW5hY3RpdmVDbGFzc2VzLFxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydCBkZWZhdWx0IEFjY29yZGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWludGVyZmFjZS5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD10eXBlcy5qcy5tYXAiLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIERlZmF1bHQgPSB7XG4gICAgZGVmYXVsdFBvc2l0aW9uOiAwLFxuICAgIGluZGljYXRvcnM6IHtcbiAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICBhY3RpdmVDbGFzc2VzOiAnYmctd2hpdGUgZGFyazpiZy1ncmF5LTgwMCcsXG4gICAgICAgIGluYWN0aXZlQ2xhc3NlczogJ2JnLXdoaXRlLzUwIGRhcms6YmctZ3JheS04MDAvNTAgaG92ZXI6Ymctd2hpdGUgZGFyazpob3ZlcjpiZy1ncmF5LTgwMCcsXG4gICAgfSxcbiAgICBpbnRlcnZhbDogMzAwMCxcbiAgICBvbk5leHQ6IGZ1bmN0aW9uICgpIHsgfSxcbiAgICBvblByZXY6IGZ1bmN0aW9uICgpIHsgfSxcbiAgICBvbkNoYW5nZTogZnVuY3Rpb24gKCkgeyB9LFxufTtcbnZhciBDYXJvdXNlbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDYXJvdXNlbChpdGVtcywgb3B0aW9ucykge1xuICAgICAgICBpZiAoaXRlbXMgPT09IHZvaWQgMCkgeyBpdGVtcyA9IFtdOyB9XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IERlZmF1bHQ7IH1cbiAgICAgICAgdGhpcy5faXRlbXMgPSBpdGVtcztcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKF9fYXNzaWduKHt9LCBEZWZhdWx0KSwgb3B0aW9ucyksIHsgaW5kaWNhdG9yczogX19hc3NpZ24oX19hc3NpZ24oe30sIERlZmF1bHQuaW5kaWNhdG9ycyksIG9wdGlvbnMuaW5kaWNhdG9ycykgfSk7XG4gICAgICAgIHRoaXMuX2FjdGl2ZUl0ZW0gPSB0aGlzLmdldEl0ZW0odGhpcy5fb3B0aW9ucy5kZWZhdWx0UG9zaXRpb24pO1xuICAgICAgICB0aGlzLl9pbmRpY2F0b3JzID0gdGhpcy5fb3B0aW9ucy5pbmRpY2F0b3JzLml0ZW1zO1xuICAgICAgICB0aGlzLl9pbnRlcnZhbER1cmF0aW9uID0gdGhpcy5fb3B0aW9ucy5pbnRlcnZhbDtcbiAgICAgICAgdGhpcy5faW50ZXJ2YWxJbnN0YW5jZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogaW5pdGlhbGl6ZSBjYXJvdXNlbCBhbmQgaXRlbXMgYmFzZWQgb24gYWN0aXZlIG9uZVxuICAgICAqL1xuICAgIENhcm91c2VsLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5faXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICBpdGVtLmVsLmNsYXNzTGlzdC5hZGQoJ2Fic29sdXRlJywgJ2luc2V0LTAnLCAndHJhbnNpdGlvbi10cmFuc2Zvcm0nLCAndHJhbnNmb3JtJyk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBpZiBubyBhY3RpdmUgaXRlbSBpcyBzZXQgdGhlbiBmaXJzdCBwb3NpdGlvbiBpcyBkZWZhdWx0XG4gICAgICAgIGlmICh0aGlzLl9nZXRBY3RpdmVJdGVtKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVUbyh0aGlzLl9nZXRBY3RpdmVJdGVtKCkucG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zbGlkZVRvKDApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2luZGljYXRvcnMubWFwKGZ1bmN0aW9uIChpbmRpY2F0b3IsIHBvc2l0aW9uKSB7XG4gICAgICAgICAgICBpbmRpY2F0b3IuZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2xpZGVUbyhwb3NpdGlvbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDYXJvdXNlbC5wcm90b3R5cGUuZ2V0SXRlbSA9IGZ1bmN0aW9uIChwb3NpdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXNbcG9zaXRpb25dO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2xpZGUgdG8gdGhlIGVsZW1lbnQgYmFzZWQgb24gaWRcbiAgICAgKiBAcGFyYW0geyp9IHBvc2l0aW9uXG4gICAgICovXG4gICAgQ2Fyb3VzZWwucHJvdG90eXBlLnNsaWRlVG8gPSBmdW5jdGlvbiAocG9zaXRpb24pIHtcbiAgICAgICAgdmFyIG5leHRJdGVtID0gdGhpcy5faXRlbXNbcG9zaXRpb25dO1xuICAgICAgICB2YXIgcm90YXRpb25JdGVtcyA9IHtcbiAgICAgICAgICAgIGxlZnQ6IG5leHRJdGVtLnBvc2l0aW9uID09PSAwXG4gICAgICAgICAgICAgICAgPyB0aGlzLl9pdGVtc1t0aGlzLl9pdGVtcy5sZW5ndGggLSAxXVxuICAgICAgICAgICAgICAgIDogdGhpcy5faXRlbXNbbmV4dEl0ZW0ucG9zaXRpb24gLSAxXSxcbiAgICAgICAgICAgIG1pZGRsZTogbmV4dEl0ZW0sXG4gICAgICAgICAgICByaWdodDogbmV4dEl0ZW0ucG9zaXRpb24gPT09IHRoaXMuX2l0ZW1zLmxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgICA/IHRoaXMuX2l0ZW1zWzBdXG4gICAgICAgICAgICAgICAgOiB0aGlzLl9pdGVtc1tuZXh0SXRlbS5wb3NpdGlvbiArIDFdLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9yb3RhdGUocm90YXRpb25JdGVtcyk7XG4gICAgICAgIHRoaXMuX3NldEFjdGl2ZUl0ZW0obmV4dEl0ZW0pO1xuICAgICAgICBpZiAodGhpcy5faW50ZXJ2YWxJbnN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICAgICAgdGhpcy5jeWNsZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX29wdGlvbnMub25DaGFuZ2UodGhpcyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBCYXNlZCBvbiB0aGUgY3VycmVudGx5IGFjdGl2ZSBpdGVtIGl0IHdpbGwgZ28gdG8gdGhlIG5leHQgcG9zaXRpb25cbiAgICAgKi9cbiAgICBDYXJvdXNlbC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFjdGl2ZUl0ZW0gPSB0aGlzLl9nZXRBY3RpdmVJdGVtKCk7XG4gICAgICAgIHZhciBuZXh0SXRlbSA9IG51bGw7XG4gICAgICAgIC8vIGNoZWNrIGlmIGxhc3QgaXRlbVxuICAgICAgICBpZiAoYWN0aXZlSXRlbS5wb3NpdGlvbiA9PT0gdGhpcy5faXRlbXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgbmV4dEl0ZW0gPSB0aGlzLl9pdGVtc1swXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5leHRJdGVtID0gdGhpcy5faXRlbXNbYWN0aXZlSXRlbS5wb3NpdGlvbiArIDFdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2xpZGVUbyhuZXh0SXRlbS5wb3NpdGlvbik7XG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25OZXh0KHRoaXMpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQmFzZWQgb24gdGhlIGN1cnJlbnRseSBhY3RpdmUgaXRlbSBpdCB3aWxsIGdvIHRvIHRoZSBwcmV2aW91cyBwb3NpdGlvblxuICAgICAqL1xuICAgIENhcm91c2VsLnByb3RvdHlwZS5wcmV2ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYWN0aXZlSXRlbSA9IHRoaXMuX2dldEFjdGl2ZUl0ZW0oKTtcbiAgICAgICAgdmFyIHByZXZJdGVtID0gbnVsbDtcbiAgICAgICAgLy8gY2hlY2sgaWYgZmlyc3QgaXRlbVxuICAgICAgICBpZiAoYWN0aXZlSXRlbS5wb3NpdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgcHJldkl0ZW0gPSB0aGlzLl9pdGVtc1t0aGlzLl9pdGVtcy5sZW5ndGggLSAxXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHByZXZJdGVtID0gdGhpcy5faXRlbXNbYWN0aXZlSXRlbS5wb3NpdGlvbiAtIDFdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2xpZGVUbyhwcmV2SXRlbS5wb3NpdGlvbik7XG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25QcmV2KHRoaXMpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgYXBwbGllcyB0aGUgdHJhbnNmb3JtIGNsYXNzZXMgYmFzZWQgb24gdGhlIGxlZnQsIG1pZGRsZSwgYW5kIHJpZ2h0IHJvdGF0aW9uIGNhcm91c2VsIGl0ZW1zXG4gICAgICogQHBhcmFtIHsqfSByb3RhdGlvbkl0ZW1zXG4gICAgICovXG4gICAgQ2Fyb3VzZWwucHJvdG90eXBlLl9yb3RhdGUgPSBmdW5jdGlvbiAocm90YXRpb25JdGVtcykge1xuICAgICAgICAvLyByZXNldFxuICAgICAgICB0aGlzLl9pdGVtcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIGl0ZW0uZWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBsZWZ0IGl0ZW0gKHByZXZpb3VzbHkgYWN0aXZlKVxuICAgICAgICByb3RhdGlvbkl0ZW1zLmxlZnQuZWwuY2xhc3NMaXN0LnJlbW92ZSgnLXRyYW5zbGF0ZS14LWZ1bGwnLCAndHJhbnNsYXRlLXgtZnVsbCcsICd0cmFuc2xhdGUteC0wJywgJ2hpZGRlbicsICd6LTIwJyk7XG4gICAgICAgIHJvdGF0aW9uSXRlbXMubGVmdC5lbC5jbGFzc0xpc3QuYWRkKCctdHJhbnNsYXRlLXgtZnVsbCcsICd6LTEwJyk7XG4gICAgICAgIC8vIGN1cnJlbnRseSBhY3RpdmUgaXRlbVxuICAgICAgICByb3RhdGlvbkl0ZW1zLm1pZGRsZS5lbC5jbGFzc0xpc3QucmVtb3ZlKCctdHJhbnNsYXRlLXgtZnVsbCcsICd0cmFuc2xhdGUteC1mdWxsJywgJ3RyYW5zbGF0ZS14LTAnLCAnaGlkZGVuJywgJ3otMTAnKTtcbiAgICAgICAgcm90YXRpb25JdGVtcy5taWRkbGUuZWwuY2xhc3NMaXN0LmFkZCgndHJhbnNsYXRlLXgtMCcsICd6LTIwJyk7XG4gICAgICAgIC8vIHJpZ2h0IGl0ZW0gKHVwY29taW5nIGFjdGl2ZSlcbiAgICAgICAgcm90YXRpb25JdGVtcy5yaWdodC5lbC5jbGFzc0xpc3QucmVtb3ZlKCctdHJhbnNsYXRlLXgtZnVsbCcsICd0cmFuc2xhdGUteC1mdWxsJywgJ3RyYW5zbGF0ZS14LTAnLCAnaGlkZGVuJywgJ3otMjAnKTtcbiAgICAgICAgcm90YXRpb25JdGVtcy5yaWdodC5lbC5jbGFzc0xpc3QuYWRkKCd0cmFuc2xhdGUteC1mdWxsJywgJ3otMTAnKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldCBhbiBpbnRlcnZhbCB0byBjeWNsZSB0aHJvdWdoIHRoZSBjYXJvdXNlbCBpdGVtc1xuICAgICAqL1xuICAgIENhcm91c2VsLnByb3RvdHlwZS5jeWNsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aGlzLl9pbnRlcnZhbEluc3RhbmNlID0gd2luZG93LnNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5uZXh0KCk7XG4gICAgICAgICAgICB9LCB0aGlzLl9pbnRlcnZhbER1cmF0aW9uKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2xlYXJzIHRoZSBjeWNsaW5nIGludGVydmFsXG4gICAgICovXG4gICAgQ2Fyb3VzZWwucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX2ludGVydmFsSW5zdGFuY2UpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjdXJyZW50bHkgYWN0aXZlIGl0ZW1cbiAgICAgKi9cbiAgICBDYXJvdXNlbC5wcm90b3R5cGUuX2dldEFjdGl2ZUl0ZW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVJdGVtO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjdXJyZW50bHkgYWN0aXZlIGl0ZW0gYW5kIGRhdGEgYXR0cmlidXRlXG4gICAgICogQHBhcmFtIHsqfSBwb3NpdGlvblxuICAgICAqL1xuICAgIENhcm91c2VsLnByb3RvdHlwZS5fc2V0QWN0aXZlSXRlbSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2FjdGl2ZUl0ZW0gPSBpdGVtO1xuICAgICAgICB2YXIgcG9zaXRpb24gPSBpdGVtLnBvc2l0aW9uO1xuICAgICAgICAvLyB1cGRhdGUgdGhlIGluZGljYXRvcnMgaWYgYXZhaWxhYmxlXG4gICAgICAgIGlmICh0aGlzLl9pbmRpY2F0b3JzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5faW5kaWNhdG9ycy5tYXAoZnVuY3Rpb24gKGluZGljYXRvcikge1xuICAgICAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICAgICAgaW5kaWNhdG9yLmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1jdXJyZW50JywgJ2ZhbHNlJyk7XG4gICAgICAgICAgICAgICAgKF9hID0gaW5kaWNhdG9yLmVsLmNsYXNzTGlzdCkucmVtb3ZlLmFwcGx5KF9hLCBfdGhpcy5fb3B0aW9ucy5pbmRpY2F0b3JzLmFjdGl2ZUNsYXNzZXMuc3BsaXQoJyAnKSk7XG4gICAgICAgICAgICAgICAgKF9iID0gaW5kaWNhdG9yLmVsLmNsYXNzTGlzdCkuYWRkLmFwcGx5KF9iLCBfdGhpcy5fb3B0aW9ucy5pbmRpY2F0b3JzLmluYWN0aXZlQ2xhc3Nlcy5zcGxpdCgnICcpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgKF9hID0gdGhpcy5faW5kaWNhdG9yc1twb3NpdGlvbl0uZWwuY2xhc3NMaXN0KS5hZGQuYXBwbHkoX2EsIHRoaXMuX29wdGlvbnMuaW5kaWNhdG9ycy5hY3RpdmVDbGFzc2VzLnNwbGl0KCcgJykpO1xuICAgICAgICAgICAgKF9iID0gdGhpcy5faW5kaWNhdG9yc1twb3NpdGlvbl0uZWwuY2xhc3NMaXN0KS5yZW1vdmUuYXBwbHkoX2IsIHRoaXMuX29wdGlvbnMuaW5kaWNhdG9ycy5pbmFjdGl2ZUNsYXNzZXMuc3BsaXQoJyAnKSk7XG4gICAgICAgICAgICB0aGlzLl9pbmRpY2F0b3JzW3Bvc2l0aW9uXS5lbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtY3VycmVudCcsICd0cnVlJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBDYXJvdXNlbDtcbn0oKSk7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB3aW5kb3cuQ2Fyb3VzZWwgPSBDYXJvdXNlbDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpbml0Q2Fyb3VzZWxzKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNhcm91c2VsXScpLmZvckVhY2goZnVuY3Rpb24gKCRjYXJvdXNlbEVsKSB7XG4gICAgICAgIHZhciBpbnRlcnZhbCA9ICRjYXJvdXNlbEVsLmdldEF0dHJpYnV0ZSgnZGF0YS1jYXJvdXNlbC1pbnRlcnZhbCcpO1xuICAgICAgICB2YXIgc2xpZGUgPSAkY2Fyb3VzZWxFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2Fyb3VzZWwnKSA9PT0gJ3NsaWRlJ1xuICAgICAgICAgICAgPyB0cnVlXG4gICAgICAgICAgICA6IGZhbHNlO1xuICAgICAgICB2YXIgaXRlbXMgPSBbXTtcbiAgICAgICAgdmFyIGRlZmF1bHRQb3NpdGlvbiA9IDA7XG4gICAgICAgIGlmICgkY2Fyb3VzZWxFbC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jYXJvdXNlbC1pdGVtXScpLmxlbmd0aCkge1xuICAgICAgICAgICAgQXJyYXkuZnJvbSgkY2Fyb3VzZWxFbC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jYXJvdXNlbC1pdGVtXScpKS5tYXAoZnVuY3Rpb24gKCRjYXJvdXNlbEl0ZW1FbCwgcG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICBlbDogJGNhcm91c2VsSXRlbUVsLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmICgkY2Fyb3VzZWxJdGVtRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWNhcm91c2VsLWl0ZW0nKSA9PT1cbiAgICAgICAgICAgICAgICAgICAgJ2FjdGl2ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGljYXRvcnMgPSBbXTtcbiAgICAgICAgaWYgKCRjYXJvdXNlbEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNhcm91c2VsLXNsaWRlLXRvXScpLmxlbmd0aCkge1xuICAgICAgICAgICAgQXJyYXkuZnJvbSgkY2Fyb3VzZWxFbC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jYXJvdXNlbC1zbGlkZS10b10nKSkubWFwKGZ1bmN0aW9uICgkaW5kaWNhdG9yRWwpIHtcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3JzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogcGFyc2VJbnQoJGluZGljYXRvckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1jYXJvdXNlbC1zbGlkZS10bycpKSxcbiAgICAgICAgICAgICAgICAgICAgZWw6ICRpbmRpY2F0b3JFbCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjYXJvdXNlbCA9IG5ldyBDYXJvdXNlbChpdGVtcywge1xuICAgICAgICAgICAgZGVmYXVsdFBvc2l0aW9uOiBkZWZhdWx0UG9zaXRpb24sXG4gICAgICAgICAgICBpbmRpY2F0b3JzOiB7XG4gICAgICAgICAgICAgICAgaXRlbXM6IGluZGljYXRvcnMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW50ZXJ2YWw6IGludGVydmFsID8gaW50ZXJ2YWwgOiBEZWZhdWx0LmludGVydmFsLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHNsaWRlKSB7XG4gICAgICAgICAgICBjYXJvdXNlbC5jeWNsZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNoZWNrIGZvciBjb250cm9sc1xuICAgICAgICB2YXIgY2Fyb3VzZWxOZXh0RWwgPSAkY2Fyb3VzZWxFbC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jYXJvdXNlbC1uZXh0XScpO1xuICAgICAgICB2YXIgY2Fyb3VzZWxQcmV2RWwgPSAkY2Fyb3VzZWxFbC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jYXJvdXNlbC1wcmV2XScpO1xuICAgICAgICBpZiAoY2Fyb3VzZWxOZXh0RWwpIHtcbiAgICAgICAgICAgIGNhcm91c2VsTmV4dEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNhcm91c2VsLm5leHQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYXJvdXNlbFByZXZFbCkge1xuICAgICAgICAgICAgY2Fyb3VzZWxQcmV2RWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY2Fyb3VzZWwucHJldigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydCBkZWZhdWx0IENhcm91c2VsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW50ZXJmYWNlLmpzLm1hcCIsImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXR5cGVzLmpzLm1hcCIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgRGVmYXVsdCA9IHtcbiAgICBvbkNvbGxhcHNlOiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgb25FeHBhbmQ6IGZ1bmN0aW9uICgpIHsgfSxcbiAgICBvblRvZ2dsZTogZnVuY3Rpb24gKCkgeyB9LFxufTtcbnZhciBDb2xsYXBzZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb2xsYXBzZSh0YXJnZXRFbCwgdHJpZ2dlckVsLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICh0YXJnZXRFbCA9PT0gdm9pZCAwKSB7IHRhcmdldEVsID0gbnVsbDsgfVxuICAgICAgICBpZiAodHJpZ2dlckVsID09PSB2b2lkIDApIHsgdHJpZ2dlckVsID0gbnVsbDsgfVxuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSBEZWZhdWx0OyB9XG4gICAgICAgIHRoaXMuX3RhcmdldEVsID0gdGFyZ2V0RWw7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJFbCA9IHRyaWdnZXJFbDtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBEZWZhdWx0KSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faW5pdCgpO1xuICAgIH1cbiAgICBDb2xsYXBzZS5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLl90cmlnZ2VyRWwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl90cmlnZ2VyRWwuaGFzQXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl92aXNpYmxlID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcpID09PSAndHJ1ZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBmaXggdW50aWwgdjIgbm90IHRvIGJyZWFrIHByZXZpb3VzIHNpbmdsZSBjb2xsYXBzZXMgd2hpY2ggYmVjYW1lIGRpc21pc3NcbiAgICAgICAgICAgICAgICB0aGlzLl92aXNpYmxlID0gIXRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5jb250YWlucygnaGlkZGVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMudG9nZ2xlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29sbGFwc2UucHJvdG90eXBlLmNvbGxhcHNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgaWYgKHRoaXMuX3RyaWdnZXJFbCkge1xuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckVsLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vbkNvbGxhcHNlKHRoaXMpO1xuICAgIH07XG4gICAgQ29sbGFwc2UucHJvdG90eXBlLmV4cGFuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgIGlmICh0aGlzLl90cmlnZ2VyRWwpIHtcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSB0cnVlO1xuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uRXhwYW5kKHRoaXMpO1xuICAgIH07XG4gICAgQ29sbGFwc2UucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3Zpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXhwYW5kKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vblRvZ2dsZSh0aGlzKTtcbiAgICB9O1xuICAgIHJldHVybiBDb2xsYXBzZTtcbn0oKSk7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB3aW5kb3cuQ29sbGFwc2UgPSBDb2xsYXBzZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpbml0Q29sbGFwc2VzKCkge1xuICAgIGRvY3VtZW50XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jb2xsYXBzZS10b2dnbGVdJylcbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKCR0cmlnZ2VyRWwpIHtcbiAgICAgICAgdmFyIHRhcmdldElkID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sbGFwc2UtdG9nZ2xlJyk7XG4gICAgICAgIHZhciAkdGFyZ2V0RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRJZCk7XG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSB0YXJnZXQgZWxlbWVudCBleGlzdHNcbiAgICAgICAgaWYgKCR0YXJnZXRFbCkge1xuICAgICAgICAgICAgbmV3IENvbGxhcHNlKCR0YXJnZXRFbCwgJHRyaWdnZXJFbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVGhlIHRhcmdldCBlbGVtZW50IHdpdGggaWQgXFxcIlwiLmNvbmNhdCh0YXJnZXRJZCwgXCJcXFwiIGRvZXMgbm90IGV4aXN0LiBQbGVhc2UgY2hlY2sgdGhlIGRhdGEtY29sbGFwc2UtdG9nZ2xlIGF0dHJpYnV0ZS5cIikpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnQgZGVmYXVsdCBDb2xsYXBzZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWludGVyZmFjZS5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD10eXBlcy5qcy5tYXAiLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIERlZmF1bHQgPSB7XG4gICAgdHJpZ2dlclR5cGU6ICdob3ZlcicsXG4gICAgb25TaG93OiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgb25IaWRlOiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgb25Ub2dnbGU6IGZ1bmN0aW9uICgpIHsgfSxcbn07XG52YXIgRGlhbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaWFsKHBhcmVudEVsLCB0cmlnZ2VyRWwsIHRhcmdldEVsLCBvcHRpb25zKSB7XG4gICAgICAgIGlmIChwYXJlbnRFbCA9PT0gdm9pZCAwKSB7IHBhcmVudEVsID0gbnVsbDsgfVxuICAgICAgICBpZiAodHJpZ2dlckVsID09PSB2b2lkIDApIHsgdHJpZ2dlckVsID0gbnVsbDsgfVxuICAgICAgICBpZiAodGFyZ2V0RWwgPT09IHZvaWQgMCkgeyB0YXJnZXRFbCA9IG51bGw7IH1cbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0gRGVmYXVsdDsgfVxuICAgICAgICB0aGlzLl9wYXJlbnRFbCA9IHBhcmVudEVsO1xuICAgICAgICB0aGlzLl90cmlnZ2VyRWwgPSB0cmlnZ2VyRWw7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsID0gdGFyZ2V0RWw7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgRGVmYXVsdCksIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl92aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9XG4gICAgRGlhbC5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLl90cmlnZ2VyRWwpIHtcbiAgICAgICAgICAgIHZhciB0cmlnZ2VyRXZlbnRUeXBlcyA9IHRoaXMuX2dldFRyaWdnZXJFdmVudFR5cGVzKHRoaXMuX29wdGlvbnMudHJpZ2dlclR5cGUpO1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50VHlwZXMuc2hvd0V2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgICAgIF90aGlzLl90cmlnZ2VyRWwuYWRkRXZlbnRMaXN0ZW5lcihldiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zaG93KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3RhcmdldEVsLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2hvdygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnRUeXBlcy5oaWRlRXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3BhcmVudEVsLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5fcGFyZW50RWwubWF0Y2hlcygnOmhvdmVyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERpYWwucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICBpZiAodGhpcy5fdHJpZ2dlckVsKSB7XG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyRWwuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uSGlkZSh0aGlzKTtcbiAgICB9O1xuICAgIERpYWwucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICBpZiAodGhpcy5fdHJpZ2dlckVsKSB7XG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyRWwuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl92aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vblNob3codGhpcyk7XG4gICAgfTtcbiAgICBEaWFsLnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl92aXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEaWFsLnByb3RvdHlwZS5pc0hpZGRlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLl92aXNpYmxlO1xuICAgIH07XG4gICAgRGlhbC5wcm90b3R5cGUuaXNWaXNpYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcbiAgICB9O1xuICAgIERpYWwucHJvdG90eXBlLl9nZXRUcmlnZ2VyRXZlbnRUeXBlcyA9IGZ1bmN0aW9uICh0cmlnZ2VyVHlwZSkge1xuICAgICAgICBzd2l0Y2ggKHRyaWdnZXJUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdob3Zlcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0V2ZW50czogWydtb3VzZWVudGVyJywgJ2ZvY3VzJ10sXG4gICAgICAgICAgICAgICAgICAgIGhpZGVFdmVudHM6IFsnbW91c2VsZWF2ZScsICdibHVyJ10sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgJ2NsaWNrJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzaG93RXZlbnRzOiBbJ2NsaWNrJywgJ2ZvY3VzJ10sXG4gICAgICAgICAgICAgICAgICAgIGhpZGVFdmVudHM6IFsnZm9jdXNvdXQnLCAnYmx1ciddLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlICdub25lJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzaG93RXZlbnRzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgaGlkZUV2ZW50czogW10sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0V2ZW50czogWydtb3VzZWVudGVyJywgJ2ZvY3VzJ10sXG4gICAgICAgICAgICAgICAgICAgIGhpZGVFdmVudHM6IFsnbW91c2VsZWF2ZScsICdibHVyJ10sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIERpYWw7XG59KCkpO1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgd2luZG93LkRpYWwgPSBEaWFsO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGluaXREaWFscygpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kaWFsLWluaXRdJykuZm9yRWFjaChmdW5jdGlvbiAoJHBhcmVudEVsKSB7XG4gICAgICAgIHZhciAkdHJpZ2dlckVsID0gJHBhcmVudEVsLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRpYWwtdG9nZ2xlXScpO1xuICAgICAgICBpZiAoJHRyaWdnZXJFbCkge1xuICAgICAgICAgICAgdmFyIGRpYWxJZCA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRpYWwtdG9nZ2xlJyk7XG4gICAgICAgICAgICB2YXIgJGRpYWxFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRpYWxJZCk7XG4gICAgICAgICAgICBpZiAoJGRpYWxFbCkge1xuICAgICAgICAgICAgICAgIHZhciB0cmlnZ2VyVHlwZSA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRpYWwtdHJpZ2dlcicpO1xuICAgICAgICAgICAgICAgIG5ldyBEaWFsKCRwYXJlbnRFbCwgJHRyaWdnZXJFbCwgJGRpYWxFbCwge1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyVHlwZTogdHJpZ2dlclR5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgID8gdHJpZ2dlclR5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgIDogRGVmYXVsdC50cmlnZ2VyVHlwZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEaWFsIHdpdGggaWQgXCIuY29uY2F0KGRpYWxJZCwgXCIgZG9lcyBub3QgZXhpc3QuIEFyZSB5b3Ugc3VyZSB0aGF0IHRoZSBkYXRhLWRpYWwtdG9nZ2xlIGF0dHJpYnV0ZSBwb2ludHMgdG8gdGhlIGNvcnJlY3QgbW9kYWwgaWQ/XCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEaWFsIHdpdGggaWQgXCIuY29uY2F0KCRwYXJlbnRFbC5pZCwgXCIgZG9lcyBub3QgaGF2ZSBhIHRyaWdnZXIgZWxlbWVudC4gQXJlIHlvdSBzdXJlIHRoYXQgdGhlIGRhdGEtZGlhbC10b2dnbGUgYXR0cmlidXRlIGV4aXN0cz9cIikpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnQgZGVmYXVsdCBEaWFsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW50ZXJmYWNlLmpzLm1hcCIsImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXR5cGVzLmpzLm1hcCIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgRGVmYXVsdCA9IHtcbiAgICB0cmFuc2l0aW9uOiAndHJhbnNpdGlvbi1vcGFjaXR5JyxcbiAgICBkdXJhdGlvbjogMzAwLFxuICAgIHRpbWluZzogJ2Vhc2Utb3V0JyxcbiAgICBvbkhpZGU6IGZ1bmN0aW9uICgpIHsgfSxcbn07XG52YXIgRGlzbWlzcyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaXNtaXNzKHRhcmdldEVsLCB0cmlnZ2VyRWwsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRhcmdldEVsID09PSB2b2lkIDApIHsgdGFyZ2V0RWwgPSBudWxsOyB9XG4gICAgICAgIGlmICh0cmlnZ2VyRWwgPT09IHZvaWQgMCkgeyB0cmlnZ2VyRWwgPSBudWxsOyB9XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IERlZmF1bHQ7IH1cbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwgPSB0YXJnZXRFbDtcbiAgICAgICAgdGhpcy5fdHJpZ2dlckVsID0gdHJpZ2dlckVsO1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gX19hc3NpZ24oX19hc3NpZ24oe30sIERlZmF1bHQpLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5faW5pdCgpO1xuICAgIH1cbiAgICBEaXNtaXNzLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuX3RyaWdnZXJFbCkge1xuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEaXNtaXNzLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuYWRkKHRoaXMuX29wdGlvbnMudHJhbnNpdGlvbiwgXCJkdXJhdGlvbi1cIi5jb25jYXQodGhpcy5fb3B0aW9ucy5kdXJhdGlvbiksIHRoaXMuX29wdGlvbnMudGltaW5nLCAnb3BhY2l0eS0wJyk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICB9LCB0aGlzLl9vcHRpb25zLmR1cmF0aW9uKTtcbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vbkhpZGUodGhpcywgdGhpcy5fdGFyZ2V0RWwpO1xuICAgIH07XG4gICAgcmV0dXJuIERpc21pc3M7XG59KCkpO1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgd2luZG93LkRpc21pc3MgPSBEaXNtaXNzO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGluaXREaXNtaXNzZXMoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZGlzbWlzcy10YXJnZXRdJykuZm9yRWFjaChmdW5jdGlvbiAoJHRyaWdnZXJFbCkge1xuICAgICAgICB2YXIgdGFyZ2V0SWQgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kaXNtaXNzLXRhcmdldCcpO1xuICAgICAgICB2YXIgJGRpc21pc3NFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0SWQpO1xuICAgICAgICBpZiAoJGRpc21pc3NFbCkge1xuICAgICAgICAgICAgbmV3IERpc21pc3MoJGRpc21pc3NFbCwgJHRyaWdnZXJFbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVGhlIGRpc21pc3MgZWxlbWVudCB3aXRoIGlkIFxcXCJcIi5jb25jYXQodGFyZ2V0SWQsIFwiXFxcIiBkb2VzIG5vdCBleGlzdC4gUGxlYXNlIGNoZWNrIHRoZSBkYXRhLWRpc21pc3MtdGFyZ2V0IGF0dHJpYnV0ZS5cIikpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnQgZGVmYXVsdCBEaXNtaXNzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW50ZXJmYWNlLmpzLm1hcCIsImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXR5cGVzLmpzLm1hcCIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgRGVmYXVsdCA9IHtcbiAgICBwbGFjZW1lbnQ6ICdsZWZ0JyxcbiAgICBib2R5U2Nyb2xsaW5nOiBmYWxzZSxcbiAgICBiYWNrZHJvcDogdHJ1ZSxcbiAgICBlZGdlOiBmYWxzZSxcbiAgICBlZGdlT2Zmc2V0OiAnYm90dG9tLVs2MHB4XScsXG4gICAgYmFja2Ryb3BDbGFzc2VzOiAnYmctZ3JheS05MDAgYmctb3BhY2l0eS01MCBkYXJrOmJnLW9wYWNpdHktODAgZml4ZWQgaW5zZXQtMCB6LTMwJyxcbiAgICBvblNob3c6IGZ1bmN0aW9uICgpIHsgfSxcbiAgICBvbkhpZGU6IGZ1bmN0aW9uICgpIHsgfSxcbiAgICBvblRvZ2dsZTogZnVuY3Rpb24gKCkgeyB9LFxufTtcbnZhciBEcmF3ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRHJhd2VyKHRhcmdldEVsLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICh0YXJnZXRFbCA9PT0gdm9pZCAwKSB7IHRhcmdldEVsID0gbnVsbDsgfVxuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSBEZWZhdWx0OyB9XG4gICAgICAgIHRoaXMuX3RhcmdldEVsID0gdGFyZ2V0RWw7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgRGVmYXVsdCksIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl92aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9XG4gICAgRHJhd2VyLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgLy8gc2V0IGluaXRpYWwgYWNjZXNzaWJpbGl0eSBhdHRyaWJ1dGVzXG4gICAgICAgIGlmICh0aGlzLl90YXJnZXRFbCkge1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0RWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuYWRkKCd0cmFuc2l0aW9uLXRyYW5zZm9ybScpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNldCBiYXNlIHBsYWNlbWVudCBjbGFzc2VzXG4gICAgICAgIHRoaXMuX2dldFBsYWNlbWVudENsYXNzZXModGhpcy5fb3B0aW9ucy5wbGFjZW1lbnQpLmJhc2UubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICBfdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZChjKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGFkZCBrZXlib2FyZCBldmVudCBsaXN0ZW5lciB0byBkb2N1bWVudFxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICAgICAgICAgIC8vIGlmICdFc2NhcGUnIGtleSBpcyBwcmVzc2VkXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmlzVmlzaWJsZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBEcmF3ZXIgaXMgdmlzaWJsZVxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5oaWRlKCk7IC8vIGhpZGUgdGhlIERyYXdlclxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBEcmF3ZXIucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIC8vIGJhc2VkIG9uIHRoZSBlZGdlIG9wdGlvbiBzaG93IHBsYWNlbWVudCBjbGFzc2VzXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmVkZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2dldFBsYWNlbWVudENsYXNzZXModGhpcy5fb3B0aW9ucy5wbGFjZW1lbnQgKyAnLWVkZ2UnKS5hY3RpdmUubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoYyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX2dldFBsYWNlbWVudENsYXNzZXModGhpcy5fb3B0aW9ucy5wbGFjZW1lbnQgKyAnLWVkZ2UnKS5pbmFjdGl2ZS5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZChjKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZ2V0UGxhY2VtZW50Q2xhc3Nlcyh0aGlzLl9vcHRpb25zLnBsYWNlbWVudCkuYWN0aXZlLm1hcChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIF90aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKGMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9nZXRQbGFjZW1lbnRDbGFzc2VzKHRoaXMuX29wdGlvbnMucGxhY2VtZW50KS5pbmFjdGl2ZS5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZChjKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNldCBhY2Nlc3NpYmlsaXR5IGF0dHJpYnV0ZXNcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1tb2RhbCcpO1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5yZW1vdmVBdHRyaWJ1dGUoJ3JvbGUnKTtcbiAgICAgICAgLy8gZW5hYmxlIGJvZHkgc2Nyb2xsXG4gICAgICAgIGlmICghdGhpcy5fb3B0aW9ucy5ib2R5U2Nyb2xsaW5nKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ292ZXJmbG93LWhpZGRlbicpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGRlc3Ryb3kgYmFja2Ryb3BcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuYmFja2Ryb3ApIHtcbiAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lCYWNrZHJvcEVsKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uSGlkZSh0aGlzKTtcbiAgICB9O1xuICAgIERyYXdlci5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuZWRnZSkge1xuICAgICAgICAgICAgdGhpcy5fZ2V0UGxhY2VtZW50Q2xhc3Nlcyh0aGlzLl9vcHRpb25zLnBsYWNlbWVudCArICctZWRnZScpLmFjdGl2ZS5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZChjKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fZ2V0UGxhY2VtZW50Q2xhc3Nlcyh0aGlzLl9vcHRpb25zLnBsYWNlbWVudCArICctZWRnZScpLmluYWN0aXZlLm1hcChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIF90aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKGMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9nZXRQbGFjZW1lbnRDbGFzc2VzKHRoaXMuX29wdGlvbnMucGxhY2VtZW50KS5hY3RpdmUubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoYyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX2dldFBsYWNlbWVudENsYXNzZXModGhpcy5fb3B0aW9ucy5wbGFjZW1lbnQpLmluYWN0aXZlLm1hcChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIF90aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKGMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2V0IGFjY2Vzc2liaWxpdHkgYXR0cmlidXRlc1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbW9kYWwnLCAndHJ1ZScpO1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnZGlhbG9nJyk7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKTtcbiAgICAgICAgLy8gZGlzYWJsZSBib2R5IHNjcm9sbFxuICAgICAgICBpZiAoIXRoaXMuX29wdGlvbnMuYm9keVNjcm9sbGluZykge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdvdmVyZmxvdy1oaWRkZW4nKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzaG93IGJhY2tkcm9wXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmJhY2tkcm9wKSB7XG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVCYWNrZHJvcCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSB0cnVlO1xuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uU2hvdyh0aGlzKTtcbiAgICB9O1xuICAgIERyYXdlci5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pc1Zpc2libGUoKSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRHJhd2VyLnByb3RvdHlwZS5fY3JlYXRlQmFja2Ryb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLl92aXNpYmxlKSB7XG4gICAgICAgICAgICB2YXIgYmFja2Ryb3BFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgYmFja2Ryb3BFbC5zZXRBdHRyaWJ1dGUoJ2RyYXdlci1iYWNrZHJvcCcsICcnKTtcbiAgICAgICAgICAgIChfYSA9IGJhY2tkcm9wRWwuY2xhc3NMaXN0KS5hZGQuYXBwbHkoX2EsIHRoaXMuX29wdGlvbnMuYmFja2Ryb3BDbGFzc2VzLnNwbGl0KCcgJykpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZChiYWNrZHJvcEVsKTtcbiAgICAgICAgICAgIGJhY2tkcm9wRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERyYXdlci5wcm90b3R5cGUuX2Rlc3Ryb3lCYWNrZHJvcEVsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fdmlzaWJsZSkge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RyYXdlci1iYWNrZHJvcF0nKS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRHJhd2VyLnByb3RvdHlwZS5fZ2V0UGxhY2VtZW50Q2xhc3NlcyA9IGZ1bmN0aW9uIChwbGFjZW1lbnQpIHtcbiAgICAgICAgc3dpdGNoIChwbGFjZW1lbnQpIHtcbiAgICAgICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgYmFzZTogWyd0b3AtMCcsICdsZWZ0LTAnLCAncmlnaHQtMCddLFxuICAgICAgICAgICAgICAgICAgICBhY3RpdmU6IFsndHJhbnNmb3JtLW5vbmUnXSxcbiAgICAgICAgICAgICAgICAgICAgaW5hY3RpdmU6IFsnLXRyYW5zbGF0ZS15LWZ1bGwnXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGJhc2U6IFsncmlnaHQtMCcsICd0b3AtMCddLFxuICAgICAgICAgICAgICAgICAgICBhY3RpdmU6IFsndHJhbnNmb3JtLW5vbmUnXSxcbiAgICAgICAgICAgICAgICAgICAgaW5hY3RpdmU6IFsndHJhbnNsYXRlLXgtZnVsbCddLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGJhc2U6IFsnYm90dG9tLTAnLCAnbGVmdC0wJywgJ3JpZ2h0LTAnXSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlOiBbJ3RyYW5zZm9ybS1ub25lJ10sXG4gICAgICAgICAgICAgICAgICAgIGluYWN0aXZlOiBbJ3RyYW5zbGF0ZS15LWZ1bGwnXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgYmFzZTogWydsZWZ0LTAnLCAndG9wLTAnXSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlOiBbJ3RyYW5zZm9ybS1ub25lJ10sXG4gICAgICAgICAgICAgICAgICAgIGluYWN0aXZlOiBbJy10cmFuc2xhdGUteC1mdWxsJ10sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgJ2JvdHRvbS1lZGdlJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBiYXNlOiBbJ2xlZnQtMCcsICd0b3AtMCddLFxuICAgICAgICAgICAgICAgICAgICBhY3RpdmU6IFsndHJhbnNmb3JtLW5vbmUnXSxcbiAgICAgICAgICAgICAgICAgICAgaW5hY3RpdmU6IFsndHJhbnNsYXRlLXktZnVsbCcsIHRoaXMuX29wdGlvbnMuZWRnZU9mZnNldF0sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgYmFzZTogWydsZWZ0LTAnLCAndG9wLTAnXSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlOiBbJ3RyYW5zZm9ybS1ub25lJ10sXG4gICAgICAgICAgICAgICAgICAgIGluYWN0aXZlOiBbJy10cmFuc2xhdGUteC1mdWxsJ10sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRHJhd2VyLnByb3RvdHlwZS5pc0hpZGRlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLl92aXNpYmxlO1xuICAgIH07XG4gICAgRHJhd2VyLnByb3RvdHlwZS5pc1Zpc2libGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xuICAgIH07XG4gICAgcmV0dXJuIERyYXdlcjtcbn0oKSk7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB3aW5kb3cuRHJhd2VyID0gRHJhd2VyO1xufVxudmFyIGdldERyYXdlckluc3RhbmNlID0gZnVuY3Rpb24gKGlkLCBpbnN0YW5jZXMpIHtcbiAgICBpZiAoaW5zdGFuY2VzLnNvbWUoZnVuY3Rpb24gKGRyYXdlckluc3RhbmNlKSB7IHJldHVybiBkcmF3ZXJJbnN0YW5jZS5pZCA9PT0gaWQ7IH0pKSB7XG4gICAgICAgIHJldHVybiBpbnN0YW5jZXMuZmluZChmdW5jdGlvbiAoZHJhd2VySW5zdGFuY2UpIHsgcmV0dXJuIGRyYXdlckluc3RhbmNlLmlkID09PSBpZDsgfSk7XG4gICAgfVxufTtcbmV4cG9ydCBmdW5jdGlvbiBpbml0RHJhd2VycygpIHtcbiAgICB2YXIgZHJhd2VySW5zdGFuY2VzID0gW107XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZHJhd2VyLXRhcmdldF0nKS5mb3JFYWNoKGZ1bmN0aW9uICgkdHJpZ2dlckVsKSB7XG4gICAgICAgIC8vIG1hbmRhdG9yeVxuICAgICAgICB2YXIgZHJhd2VySWQgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kcmF3ZXItdGFyZ2V0Jyk7XG4gICAgICAgIHZhciAkZHJhd2VyRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkcmF3ZXJJZCk7XG4gICAgICAgIGlmICgkZHJhd2VyRWwpIHtcbiAgICAgICAgICAgIC8vIG9wdGlvbmFsXG4gICAgICAgICAgICB2YXIgcGxhY2VtZW50ID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZHJhd2VyLXBsYWNlbWVudCcpO1xuICAgICAgICAgICAgdmFyIGJvZHlTY3JvbGxpbmcgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kcmF3ZXItYm9keS1zY3JvbGxpbmcnKTtcbiAgICAgICAgICAgIHZhciBiYWNrZHJvcCA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRyYXdlci1iYWNrZHJvcCcpO1xuICAgICAgICAgICAgdmFyIGVkZ2UgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kcmF3ZXItZWRnZScpO1xuICAgICAgICAgICAgdmFyIGVkZ2VPZmZzZXQgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kcmF3ZXItZWRnZS1vZmZzZXQnKTtcbiAgICAgICAgICAgIGlmICghZ2V0RHJhd2VySW5zdGFuY2UoZHJhd2VySWQsIGRyYXdlckluc3RhbmNlcykpIHtcbiAgICAgICAgICAgICAgICBkcmF3ZXJJbnN0YW5jZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBkcmF3ZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0OiBuZXcgRHJhd2VyKCRkcmF3ZXJFbCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50OiBwbGFjZW1lbnQgPyBwbGFjZW1lbnQgOiBEZWZhdWx0LnBsYWNlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHlTY3JvbGxpbmc6IGJvZHlTY3JvbGxpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGJvZHlTY3JvbGxpbmcgPT09ICd0cnVlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogRGVmYXVsdC5ib2R5U2Nyb2xsaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2Ryb3A6IGJhY2tkcm9wXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBiYWNrZHJvcCA9PT0gJ3RydWUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBEZWZhdWx0LmJhY2tkcm9wLFxuICAgICAgICAgICAgICAgICAgICAgICAgZWRnZTogZWRnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gZWRnZSA9PT0gJ3RydWUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBEZWZhdWx0LmVkZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBlZGdlT2Zmc2V0OiBlZGdlT2Zmc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBlZGdlT2Zmc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBEZWZhdWx0LmVkZ2VPZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkRyYXdlciB3aXRoIGlkIFwiLmNvbmNhdChkcmF3ZXJJZCwgXCIgbm90IGZvdW5kLiBBcmUgeW91IHN1cmUgdGhhdCB0aGUgZGF0YS1kcmF3ZXItdGFyZ2V0IGF0dHJpYnV0ZSBwb2ludHMgdG8gdGhlIGNvcnJlY3QgZHJhd2VyIGlkP1wiKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kcmF3ZXItdG9nZ2xlXScpLmZvckVhY2goZnVuY3Rpb24gKCR0cmlnZ2VyRWwpIHtcbiAgICAgICAgdmFyIGRyYXdlcklkID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZHJhd2VyLXRvZ2dsZScpO1xuICAgICAgICB2YXIgJGRyYXdlckVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZHJhd2VySWQpO1xuICAgICAgICBpZiAoJGRyYXdlckVsKSB7XG4gICAgICAgICAgICB2YXIgZHJhd2VyXzEgPSBnZXREcmF3ZXJJbnN0YW5jZShkcmF3ZXJJZCwgZHJhd2VySW5zdGFuY2VzKTtcbiAgICAgICAgICAgIGlmIChkcmF3ZXJfMSkge1xuICAgICAgICAgICAgICAgICR0cmlnZ2VyRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRyYXdlcl8xLm9iamVjdC50b2dnbGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEcmF3ZXIgd2l0aCBpZCBcIi5jb25jYXQoZHJhd2VySWQsIFwiIGhhcyBub3QgYmVlbiBpbml0aWFsaXplZC4gUGxlYXNlIGluaXRpYWxpemUgaXQgdXNpbmcgdGhlIGRhdGEtZHJhd2VyLXRhcmdldCBhdHRyaWJ1dGUuXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEcmF3ZXIgd2l0aCBpZCBcIi5jb25jYXQoZHJhd2VySWQsIFwiIG5vdCBmb3VuZC4gQXJlIHlvdSBzdXJlIHRoYXQgdGhlIGRhdGEtZHJhd2VyLXRhcmdldCBhdHRyaWJ1dGUgcG9pbnRzIHRvIHRoZSBjb3JyZWN0IGRyYXdlciBpZD9cIikpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgZG9jdW1lbnRcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRyYXdlci1kaXNtaXNzXSwgW2RhdGEtZHJhd2VyLWhpZGVdJylcbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKCR0cmlnZ2VyRWwpIHtcbiAgICAgICAgdmFyIGRyYXdlcklkID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZHJhd2VyLWRpc21pc3MnKVxuICAgICAgICAgICAgPyAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kcmF3ZXItZGlzbWlzcycpXG4gICAgICAgICAgICA6ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRyYXdlci1oaWRlJyk7XG4gICAgICAgIHZhciAkZHJhd2VyRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkcmF3ZXJJZCk7XG4gICAgICAgIGlmICgkZHJhd2VyRWwpIHtcbiAgICAgICAgICAgIHZhciBkcmF3ZXJfMiA9IGdldERyYXdlckluc3RhbmNlKGRyYXdlcklkLCBkcmF3ZXJJbnN0YW5jZXMpO1xuICAgICAgICAgICAgaWYgKGRyYXdlcl8yKSB7XG4gICAgICAgICAgICAgICAgJHRyaWdnZXJFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgZHJhd2VyXzIub2JqZWN0LmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEcmF3ZXIgd2l0aCBpZCBcIi5jb25jYXQoZHJhd2VySWQsIFwiIGhhcyBub3QgYmVlbiBpbml0aWFsaXplZC4gUGxlYXNlIGluaXRpYWxpemUgaXQgdXNpbmcgdGhlIGRhdGEtZHJhd2VyLXRhcmdldCBhdHRyaWJ1dGUuXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEcmF3ZXIgd2l0aCBpZCBcIi5jb25jYXQoZHJhd2VySWQsIFwiIG5vdCBmb3VuZC4gQXJlIHlvdSBzdXJlIHRoYXQgdGhlIGRhdGEtZHJhd2VyLXRhcmdldCBhdHRyaWJ1dGUgcG9pbnRzIHRvIHRoZSBjb3JyZWN0IGRyYXdlciBpZFwiKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kcmF3ZXItc2hvd10nKS5mb3JFYWNoKGZ1bmN0aW9uICgkdHJpZ2dlckVsKSB7XG4gICAgICAgIHZhciBkcmF3ZXJJZCA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRyYXdlci1zaG93Jyk7XG4gICAgICAgIHZhciAkZHJhd2VyRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkcmF3ZXJJZCk7XG4gICAgICAgIGlmICgkZHJhd2VyRWwpIHtcbiAgICAgICAgICAgIHZhciBkcmF3ZXJfMyA9IGdldERyYXdlckluc3RhbmNlKGRyYXdlcklkLCBkcmF3ZXJJbnN0YW5jZXMpO1xuICAgICAgICAgICAgaWYgKGRyYXdlcl8zKSB7XG4gICAgICAgICAgICAgICAgJHRyaWdnZXJFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgZHJhd2VyXzMub2JqZWN0LnNob3coKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEcmF3ZXIgd2l0aCBpZCBcIi5jb25jYXQoZHJhd2VySWQsIFwiIGhhcyBub3QgYmVlbiBpbml0aWFsaXplZC4gUGxlYXNlIGluaXRpYWxpemUgaXQgdXNpbmcgdGhlIGRhdGEtZHJhd2VyLXRhcmdldCBhdHRyaWJ1dGUuXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEcmF3ZXIgd2l0aCBpZCBcIi5jb25jYXQoZHJhd2VySWQsIFwiIG5vdCBmb3VuZC4gQXJlIHlvdSBzdXJlIHRoYXQgdGhlIGRhdGEtZHJhd2VyLXRhcmdldCBhdHRyaWJ1dGUgcG9pbnRzIHRvIHRoZSBjb3JyZWN0IGRyYXdlciBpZD9cIikpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnQgZGVmYXVsdCBEcmF3ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnRlcmZhY2UuanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwZXMuanMubWFwIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20sIHBhY2spIHtcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xufTtcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1mdW5jdGlvbiAqL1xuaW1wb3J0IHsgY3JlYXRlUG9wcGVyIH0gZnJvbSAnQHBvcHBlcmpzL2NvcmUnO1xudmFyIERlZmF1bHQgPSB7XG4gICAgcGxhY2VtZW50OiAnYm90dG9tJyxcbiAgICB0cmlnZ2VyVHlwZTogJ2NsaWNrJyxcbiAgICBvZmZzZXRTa2lkZGluZzogMCxcbiAgICBvZmZzZXREaXN0YW5jZTogMTAsXG4gICAgZGVsYXk6IDMwMCxcbiAgICBvblNob3c6IGZ1bmN0aW9uICgpIHsgfSxcbiAgICBvbkhpZGU6IGZ1bmN0aW9uICgpIHsgfSxcbiAgICBvblRvZ2dsZTogZnVuY3Rpb24gKCkgeyB9LFxufTtcbnZhciBEcm9wZG93biA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEcm9wZG93bih0YXJnZXRFbGVtZW50LCB0cmlnZ2VyRWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgICBpZiAodGFyZ2V0RWxlbWVudCA9PT0gdm9pZCAwKSB7IHRhcmdldEVsZW1lbnQgPSBudWxsOyB9XG4gICAgICAgIGlmICh0cmlnZ2VyRWxlbWVudCA9PT0gdm9pZCAwKSB7IHRyaWdnZXJFbGVtZW50ID0gbnVsbDsgfVxuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSBEZWZhdWx0OyB9XG4gICAgICAgIHRoaXMuX3RhcmdldEVsID0gdGFyZ2V0RWxlbWVudDtcbiAgICAgICAgdGhpcy5fdHJpZ2dlckVsID0gdHJpZ2dlckVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgRGVmYXVsdCksIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9wb3BwZXJJbnN0YW5jZSA9IHRoaXMuX2NyZWF0ZVBvcHBlckluc3RhbmNlKCk7XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faW5pdCgpO1xuICAgIH1cbiAgICBEcm9wZG93bi5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl90cmlnZ2VyRWwpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHVwRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRHJvcGRvd24ucHJvdG90eXBlLl9zZXR1cEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgdHJpZ2dlckV2ZW50cyA9IHRoaXMuX2dldFRyaWdnZXJFdmVudHMoKTtcbiAgICAgICAgLy8gY2xpY2sgZXZlbnQgaGFuZGxpbmcgZm9yIHRyaWdnZXIgZWxlbWVudFxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy50cmlnZ2VyVHlwZSA9PT0gJ2NsaWNrJykge1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50cy5zaG93RXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3RyaWdnZXJFbC5hZGRFdmVudExpc3RlbmVyKGV2LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnRvZ2dsZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaG92ZXIgZXZlbnQgaGFuZGxpbmcgZm9yIHRyaWdnZXIgZWxlbWVudFxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy50cmlnZ2VyVHlwZSA9PT0gJ2hvdmVyJykge1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50cy5zaG93RXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3RyaWdnZXJFbC5hZGRFdmVudExpc3RlbmVyKGV2LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChldiA9PT0gJ2NsaWNrJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMudG9nZ2xlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBfdGhpcy5fb3B0aW9ucy5kZWxheSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBfdGhpcy5fdGFyZ2V0RWwuYWRkRXZlbnRMaXN0ZW5lcihldiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zaG93KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudHMuaGlkZUV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgICAgIF90aGlzLl90cmlnZ2VyRWwuYWRkRXZlbnRMaXN0ZW5lcihldiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghX3RoaXMuX3RhcmdldEVsLm1hdGNoZXMoJzpob3ZlcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBfdGhpcy5fb3B0aW9ucy5kZWxheSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3RhcmdldEVsLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIV90aGlzLl90cmlnZ2VyRWwubWF0Y2hlcygnOmhvdmVyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIF90aGlzLl9vcHRpb25zLmRlbGF5KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEcm9wZG93bi5wcm90b3R5cGUuX2NyZWF0ZVBvcHBlckluc3RhbmNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlUG9wcGVyKHRoaXMuX3RyaWdnZXJFbCwgdGhpcy5fdGFyZ2V0RWwsIHtcbiAgICAgICAgICAgIHBsYWNlbWVudDogdGhpcy5fb3B0aW9ucy5wbGFjZW1lbnQsXG4gICAgICAgICAgICBtb2RpZmllcnM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdvZmZzZXQnLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQ6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLm9mZnNldFNraWRkaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMub2Zmc2V0RGlzdGFuY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIERyb3Bkb3duLnByb3RvdHlwZS5fc2V0dXBDbGlja091dHNpZGVMaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fY2xpY2tPdXRzaWRlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgX3RoaXMuX2hhbmRsZUNsaWNrT3V0c2lkZShldiwgX3RoaXMuX3RhcmdldEVsKTtcbiAgICAgICAgfTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2NsaWNrT3V0c2lkZUV2ZW50TGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG4gICAgRHJvcGRvd24ucHJvdG90eXBlLl9yZW1vdmVDbGlja091dHNpZGVMaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2NsaWNrT3V0c2lkZUV2ZW50TGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG4gICAgRHJvcGRvd24ucHJvdG90eXBlLl9oYW5kbGVDbGlja091dHNpZGUgPSBmdW5jdGlvbiAoZXYsIHRhcmdldEVsKSB7XG4gICAgICAgIHZhciBjbGlja2VkRWwgPSBldi50YXJnZXQ7XG4gICAgICAgIGlmIChjbGlja2VkRWwgIT09IHRhcmdldEVsICYmXG4gICAgICAgICAgICAhdGFyZ2V0RWwuY29udGFpbnMoY2xpY2tlZEVsKSAmJlxuICAgICAgICAgICAgIXRoaXMuX3RyaWdnZXJFbC5jb250YWlucyhjbGlja2VkRWwpICYmXG4gICAgICAgICAgICB0aGlzLmlzVmlzaWJsZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRHJvcGRvd24ucHJvdG90eXBlLl9nZXRUcmlnZ2VyRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuX29wdGlvbnMudHJpZ2dlclR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2hvdmVyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzaG93RXZlbnRzOiBbJ21vdXNlZW50ZXInLCAnY2xpY2snXSxcbiAgICAgICAgICAgICAgICAgICAgaGlkZUV2ZW50czogWydtb3VzZWxlYXZlJ10sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgJ2NsaWNrJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzaG93RXZlbnRzOiBbJ2NsaWNrJ10sXG4gICAgICAgICAgICAgICAgICAgIGhpZGVFdmVudHM6IFtdLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlICdub25lJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzaG93RXZlbnRzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgaGlkZUV2ZW50czogW10sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0V2ZW50czogWydjbGljayddLFxuICAgICAgICAgICAgICAgICAgICBoaWRlRXZlbnRzOiBbXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEcm9wZG93bi5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pc1Zpc2libGUoKSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uVG9nZ2xlKHRoaXMpO1xuICAgIH07XG4gICAgRHJvcGRvd24ucHJvdG90eXBlLmlzVmlzaWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XG4gICAgfTtcbiAgICBEcm9wZG93bi5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoJ2Jsb2NrJyk7XG4gICAgICAgIC8vIEVuYWJsZSB0aGUgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgIHRoaXMuX3BvcHBlckluc3RhbmNlLnNldE9wdGlvbnMoZnVuY3Rpb24gKG9wdGlvbnMpIHsgcmV0dXJuIChfX2Fzc2lnbihfX2Fzc2lnbih7fSwgb3B0aW9ucyksIHsgbW9kaWZpZXJzOiBfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoW10sIG9wdGlvbnMubW9kaWZpZXJzLCB0cnVlKSwgW1xuICAgICAgICAgICAgICAgIHsgbmFtZTogJ2V2ZW50TGlzdGVuZXJzJywgZW5hYmxlZDogdHJ1ZSB9LFxuICAgICAgICAgICAgXSwgZmFsc2UpIH0pKTsgfSk7XG4gICAgICAgIHRoaXMuX3NldHVwQ2xpY2tPdXRzaWRlTGlzdGVuZXIoKTtcbiAgICAgICAgLy8gVXBkYXRlIGl0cyBwb3NpdGlvblxuICAgICAgICB0aGlzLl9wb3BwZXJJbnN0YW5jZS51cGRhdGUoKTtcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IHRydWU7XG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25TaG93KHRoaXMpO1xuICAgIH07XG4gICAgRHJvcGRvd24ucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Jsb2NrJyk7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICAvLyBEaXNhYmxlIHRoZSBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgdGhpcy5fcG9wcGVySW5zdGFuY2Uuc2V0T3B0aW9ucyhmdW5jdGlvbiAob3B0aW9ucykgeyByZXR1cm4gKF9fYXNzaWduKF9fYXNzaWduKHt9LCBvcHRpb25zKSwgeyBtb2RpZmllcnM6IF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShbXSwgb3B0aW9ucy5tb2RpZmllcnMsIHRydWUpLCBbXG4gICAgICAgICAgICAgICAgeyBuYW1lOiAnZXZlbnRMaXN0ZW5lcnMnLCBlbmFibGVkOiBmYWxzZSB9LFxuICAgICAgICAgICAgXSwgZmFsc2UpIH0pKTsgfSk7XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcmVtb3ZlQ2xpY2tPdXRzaWRlTGlzdGVuZXIoKTtcbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vbkhpZGUodGhpcyk7XG4gICAgfTtcbiAgICByZXR1cm4gRHJvcGRvd247XG59KCkpO1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgd2luZG93LkRyb3Bkb3duID0gRHJvcGRvd247XG59XG5leHBvcnQgZnVuY3Rpb24gaW5pdERyb3Bkb3ducygpIHtcbiAgICBkb2N1bWVudFxuICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZHJvcGRvd24tdG9nZ2xlXScpXG4gICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uICgkdHJpZ2dlckVsKSB7XG4gICAgICAgIHZhciBkcm9wZG93bklkID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZHJvcGRvd24tdG9nZ2xlJyk7XG4gICAgICAgIHZhciAkZHJvcGRvd25FbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRyb3Bkb3duSWQpO1xuICAgICAgICBpZiAoJGRyb3Bkb3duRWwpIHtcbiAgICAgICAgICAgIHZhciBwbGFjZW1lbnQgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kcm9wZG93bi1wbGFjZW1lbnQnKTtcbiAgICAgICAgICAgIHZhciBvZmZzZXRTa2lkZGluZyA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRyb3Bkb3duLW9mZnNldC1za2lkZGluZycpO1xuICAgICAgICAgICAgdmFyIG9mZnNldERpc3RhbmNlID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZHJvcGRvd24tb2Zmc2V0LWRpc3RhbmNlJyk7XG4gICAgICAgICAgICB2YXIgdHJpZ2dlclR5cGUgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kcm9wZG93bi10cmlnZ2VyJyk7XG4gICAgICAgICAgICB2YXIgZGVsYXkgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kcm9wZG93bi1kZWxheScpO1xuICAgICAgICAgICAgbmV3IERyb3Bkb3duKCRkcm9wZG93bkVsLCAkdHJpZ2dlckVsLCB7XG4gICAgICAgICAgICAgICAgcGxhY2VtZW50OiBwbGFjZW1lbnQgPyBwbGFjZW1lbnQgOiBEZWZhdWx0LnBsYWNlbWVudCxcbiAgICAgICAgICAgICAgICB0cmlnZ2VyVHlwZTogdHJpZ2dlclR5cGVcbiAgICAgICAgICAgICAgICAgICAgPyB0cmlnZ2VyVHlwZVxuICAgICAgICAgICAgICAgICAgICA6IERlZmF1bHQudHJpZ2dlclR5cGUsXG4gICAgICAgICAgICAgICAgb2Zmc2V0U2tpZGRpbmc6IG9mZnNldFNraWRkaW5nXG4gICAgICAgICAgICAgICAgICAgID8gcGFyc2VJbnQob2Zmc2V0U2tpZGRpbmcpXG4gICAgICAgICAgICAgICAgICAgIDogRGVmYXVsdC5vZmZzZXRTa2lkZGluZyxcbiAgICAgICAgICAgICAgICBvZmZzZXREaXN0YW5jZTogb2Zmc2V0RGlzdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgPyBwYXJzZUludChvZmZzZXREaXN0YW5jZSlcbiAgICAgICAgICAgICAgICAgICAgOiBEZWZhdWx0Lm9mZnNldERpc3RhbmNlLFxuICAgICAgICAgICAgICAgIGRlbGF5OiBkZWxheSA/IHBhcnNlSW50KGRlbGF5KSA6IERlZmF1bHQuZGVsYXksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUaGUgZHJvcGRvd24gZWxlbWVudCB3aXRoIGlkIFxcXCJcIi5jb25jYXQoZHJvcGRvd25JZCwgXCJcXFwiIGRvZXMgbm90IGV4aXN0LiBQbGVhc2UgY2hlY2sgdGhlIGRhdGEtZHJvcGRvd24tdG9nZ2xlIGF0dHJpYnV0ZS5cIikpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnQgZGVmYXVsdCBEcm9wZG93bjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWludGVyZmFjZS5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD10eXBlcy5qcy5tYXAiLCJpbXBvcnQgeyBpbml0QWNjb3JkaW9ucyB9IGZyb20gJy4vYWNjb3JkaW9uJztcbmltcG9ydCB7IGluaXRDYXJvdXNlbHMgfSBmcm9tICcuL2Nhcm91c2VsJztcbmltcG9ydCB7IGluaXRDb2xsYXBzZXMgfSBmcm9tICcuL2NvbGxhcHNlJztcbmltcG9ydCB7IGluaXREaWFscyB9IGZyb20gJy4vZGlhbCc7XG5pbXBvcnQgeyBpbml0RGlzbWlzc2VzIH0gZnJvbSAnLi9kaXNtaXNzJztcbmltcG9ydCB7IGluaXREcmF3ZXJzIH0gZnJvbSAnLi9kcmF3ZXInO1xuaW1wb3J0IHsgaW5pdERyb3Bkb3ducyB9IGZyb20gJy4vZHJvcGRvd24nO1xuaW1wb3J0IHsgaW5pdE1vZGFscyB9IGZyb20gJy4vbW9kYWwnO1xuaW1wb3J0IHsgaW5pdFBvcG92ZXJzIH0gZnJvbSAnLi9wb3BvdmVyJztcbmltcG9ydCB7IGluaXRUYWJzIH0gZnJvbSAnLi90YWJzJztcbmltcG9ydCB7IGluaXRUb29sdGlwcyB9IGZyb20gJy4vdG9vbHRpcCc7XG5leHBvcnQgZnVuY3Rpb24gaW5pdEZsb3diaXRlKCkge1xuICAgIGluaXRBY2NvcmRpb25zKCk7XG4gICAgaW5pdENvbGxhcHNlcygpO1xuICAgIGluaXRDYXJvdXNlbHMoKTtcbiAgICBpbml0RGlzbWlzc2VzKCk7XG4gICAgaW5pdERyb3Bkb3ducygpO1xuICAgIGluaXRNb2RhbHMoKTtcbiAgICBpbml0RHJhd2VycygpO1xuICAgIGluaXRUYWJzKCk7XG4gICAgaW5pdFRvb2x0aXBzKCk7XG4gICAgaW5pdFBvcG92ZXJzKCk7XG4gICAgaW5pdERpYWxzKCk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIERlZmF1bHQgPSB7XG4gICAgcGxhY2VtZW50OiAnY2VudGVyJyxcbiAgICBiYWNrZHJvcENsYXNzZXM6ICdiZy1ncmF5LTkwMCBiZy1vcGFjaXR5LTUwIGRhcms6Ymctb3BhY2l0eS04MCBmaXhlZCBpbnNldC0wIHotNDAnLFxuICAgIGJhY2tkcm9wOiAnZHluYW1pYycsXG4gICAgY2xvc2FibGU6IHRydWUsXG4gICAgb25IaWRlOiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgb25TaG93OiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgb25Ub2dnbGU6IGZ1bmN0aW9uICgpIHsgfSxcbn07XG52YXIgTW9kYWwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTW9kYWwodGFyZ2V0RWwsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRhcmdldEVsID09PSB2b2lkIDApIHsgdGFyZ2V0RWwgPSBudWxsOyB9XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IERlZmF1bHQ7IH1cbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwgPSB0YXJnZXRFbDtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBEZWZhdWx0KSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2lzSGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fYmFja2Ryb3BFbCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9XG4gICAgTW9kYWwucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5fdGFyZ2V0RWwpIHtcbiAgICAgICAgICAgIHRoaXMuX2dldFBsYWNlbWVudENsYXNzZXMoKS5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZChjKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBNb2RhbC5wcm90b3R5cGUuX2NyZWF0ZUJhY2tkcm9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh0aGlzLl9pc0hpZGRlbikge1xuICAgICAgICAgICAgdmFyIGJhY2tkcm9wRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGJhY2tkcm9wRWwuc2V0QXR0cmlidXRlKCdtb2RhbC1iYWNrZHJvcCcsICcnKTtcbiAgICAgICAgICAgIChfYSA9IGJhY2tkcm9wRWwuY2xhc3NMaXN0KS5hZGQuYXBwbHkoX2EsIHRoaXMuX29wdGlvbnMuYmFja2Ryb3BDbGFzc2VzLnNwbGl0KCcgJykpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZChiYWNrZHJvcEVsKTtcbiAgICAgICAgICAgIHRoaXMuX2JhY2tkcm9wRWwgPSBiYWNrZHJvcEVsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBNb2RhbC5wcm90b3R5cGUuX2Rlc3Ryb3lCYWNrZHJvcEVsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2lzSGlkZGVuKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbbW9kYWwtYmFja2Ryb3BdJykucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE1vZGFsLnByb3RvdHlwZS5fc2V0dXBNb2RhbENsb3NlRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmJhY2tkcm9wID09PSAnZHluYW1pYycpIHtcbiAgICAgICAgICAgIHRoaXMuX2NsaWNrT3V0c2lkZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5faGFuZGxlT3V0c2lkZUNsaWNrKGV2LnRhcmdldCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0RWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9jbGlja091dHNpZGVFdmVudExpc3RlbmVyLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9rZXlkb3duRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgaWYgKGV2LmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX2tleWRvd25FdmVudExpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuICAgIE1vZGFsLnByb3RvdHlwZS5fcmVtb3ZlTW9kYWxDbG9zZUV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5iYWNrZHJvcCA9PT0gJ2R5bmFtaWMnKSB7XG4gICAgICAgICAgICB0aGlzLl90YXJnZXRFbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2NsaWNrT3V0c2lkZUV2ZW50TGlzdGVuZXIsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX2tleWRvd25FdmVudExpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuICAgIE1vZGFsLnByb3RvdHlwZS5faGFuZGxlT3V0c2lkZUNsaWNrID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICBpZiAodGFyZ2V0ID09PSB0aGlzLl90YXJnZXRFbCB8fFxuICAgICAgICAgICAgKHRhcmdldCA9PT0gdGhpcy5fYmFja2Ryb3BFbCAmJiB0aGlzLmlzVmlzaWJsZSgpKSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE1vZGFsLnByb3RvdHlwZS5fZ2V0UGxhY2VtZW50Q2xhc3NlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLl9vcHRpb25zLnBsYWNlbWVudCkge1xuICAgICAgICAgICAgLy8gdG9wXG4gICAgICAgICAgICBjYXNlICd0b3AtbGVmdCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnanVzdGlmeS1zdGFydCcsICdpdGVtcy1zdGFydCddO1xuICAgICAgICAgICAgY2FzZSAndG9wLWNlbnRlcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnanVzdGlmeS1jZW50ZXInLCAnaXRlbXMtc3RhcnQnXTtcbiAgICAgICAgICAgIGNhc2UgJ3RvcC1yaWdodCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnanVzdGlmeS1lbmQnLCAnaXRlbXMtc3RhcnQnXTtcbiAgICAgICAgICAgIC8vIGNlbnRlclxuICAgICAgICAgICAgY2FzZSAnY2VudGVyLWxlZnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBbJ2p1c3RpZnktc3RhcnQnLCAnaXRlbXMtY2VudGVyJ107XG4gICAgICAgICAgICBjYXNlICdjZW50ZXInOlxuICAgICAgICAgICAgICAgIHJldHVybiBbJ2p1c3RpZnktY2VudGVyJywgJ2l0ZW1zLWNlbnRlciddO1xuICAgICAgICAgICAgY2FzZSAnY2VudGVyLXJpZ2h0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gWydqdXN0aWZ5LWVuZCcsICdpdGVtcy1jZW50ZXInXTtcbiAgICAgICAgICAgIC8vIGJvdHRvbVxuICAgICAgICAgICAgY2FzZSAnYm90dG9tLWxlZnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBbJ2p1c3RpZnktc3RhcnQnLCAnaXRlbXMtZW5kJ107XG4gICAgICAgICAgICBjYXNlICdib3R0b20tY2VudGVyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gWydqdXN0aWZ5LWNlbnRlcicsICdpdGVtcy1lbmQnXTtcbiAgICAgICAgICAgIGNhc2UgJ2JvdHRvbS1yaWdodCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnanVzdGlmeS1lbmQnLCAnaXRlbXMtZW5kJ107XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBbJ2p1c3RpZnktY2VudGVyJywgJ2l0ZW1zLWNlbnRlciddO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBNb2RhbC5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5faXNIaWRkZW4pIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vblRvZ2dsZSh0aGlzKTtcbiAgICB9O1xuICAgIE1vZGFsLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pc0hpZGRlbikge1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCgnZmxleCcpO1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgICAgICB0aGlzLl90YXJnZXRFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbW9kYWwnLCAndHJ1ZScpO1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0RWwuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2RpYWxvZycpO1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0RWwucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpO1xuICAgICAgICAgICAgdGhpcy5fY3JlYXRlQmFja2Ryb3AoKTtcbiAgICAgICAgICAgIHRoaXMuX2lzSGlkZGVuID0gZmFsc2U7XG4gICAgICAgICAgICAvLyBwcmV2ZW50IGJvZHkgc2Nyb2xsXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ292ZXJmbG93LWhpZGRlbicpO1xuICAgICAgICAgICAgLy8gQWRkIGtleWJvYXJkIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBkb2N1bWVudFxuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuY2xvc2FibGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXR1cE1vZGFsQ2xvc2VFdmVudExpc3RlbmVycygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMub25TaG93KHRoaXMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBNb2RhbC5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2ZsZXgnKTtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldEVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0RWwucmVtb3ZlQXR0cmlidXRlKCdhcmlhLW1vZGFsJyk7XG4gICAgICAgICAgICB0aGlzLl90YXJnZXRFbC5yZW1vdmVBdHRyaWJ1dGUoJ3JvbGUnKTtcbiAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lCYWNrZHJvcEVsKCk7XG4gICAgICAgICAgICB0aGlzLl9pc0hpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICAvLyByZS1hcHBseSBib2R5IHNjcm9sbFxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyZmxvdy1oaWRkZW4nKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmNsb3NhYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlTW9kYWxDbG9zZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5vbkhpZGUodGhpcyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE1vZGFsLnByb3RvdHlwZS5pc1Zpc2libGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5faXNIaWRkZW47XG4gICAgfTtcbiAgICBNb2RhbC5wcm90b3R5cGUuaXNIaWRkZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0hpZGRlbjtcbiAgICB9O1xuICAgIHJldHVybiBNb2RhbDtcbn0oKSk7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB3aW5kb3cuTW9kYWwgPSBNb2RhbDtcbn1cbnZhciBnZXRNb2RhbEluc3RhbmNlID0gZnVuY3Rpb24gKGlkLCBpbnN0YW5jZXMpIHtcbiAgICBpZiAoaW5zdGFuY2VzLnNvbWUoZnVuY3Rpb24gKG1vZGFsSW5zdGFuY2UpIHsgcmV0dXJuIG1vZGFsSW5zdGFuY2UuaWQgPT09IGlkOyB9KSkge1xuICAgICAgICByZXR1cm4gaW5zdGFuY2VzLmZpbmQoZnVuY3Rpb24gKG1vZGFsSW5zdGFuY2UpIHsgcmV0dXJuIG1vZGFsSW5zdGFuY2UuaWQgPT09IGlkOyB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIGluaXRNb2RhbHMoKSB7XG4gICAgdmFyIG1vZGFsSW5zdGFuY2VzID0gW107XG4gICAgLy8gaW5pdGlhdGUgbW9kYWwgYmFzZWQgb24gZGF0YS1tb2RhbC10YXJnZXRcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1tb2RhbC10YXJnZXRdJykuZm9yRWFjaChmdW5jdGlvbiAoJHRyaWdnZXJFbCkge1xuICAgICAgICB2YXIgbW9kYWxJZCA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLW1vZGFsLXRhcmdldCcpO1xuICAgICAgICB2YXIgJG1vZGFsRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChtb2RhbElkKTtcbiAgICAgICAgaWYgKCRtb2RhbEVsKSB7XG4gICAgICAgICAgICB2YXIgcGxhY2VtZW50ID0gJG1vZGFsRWwuZ2V0QXR0cmlidXRlKCdkYXRhLW1vZGFsLXBsYWNlbWVudCcpO1xuICAgICAgICAgICAgdmFyIGJhY2tkcm9wID0gJG1vZGFsRWwuZ2V0QXR0cmlidXRlKCdkYXRhLW1vZGFsLWJhY2tkcm9wJyk7XG4gICAgICAgICAgICBpZiAoIWdldE1vZGFsSW5zdGFuY2UobW9kYWxJZCwgbW9kYWxJbnN0YW5jZXMpKSB7XG4gICAgICAgICAgICAgICAgbW9kYWxJbnN0YW5jZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBtb2RhbElkLFxuICAgICAgICAgICAgICAgICAgICBvYmplY3Q6IG5ldyBNb2RhbCgkbW9kYWxFbCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50OiBwbGFjZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHBsYWNlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogRGVmYXVsdC5wbGFjZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZHJvcDogYmFja2Ryb3AgPyBiYWNrZHJvcCA6IERlZmF1bHQuYmFja2Ryb3AsXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1vZGFsIHdpdGggaWQgXCIuY29uY2F0KG1vZGFsSWQsIFwiIGRvZXMgbm90IGV4aXN0LiBBcmUgeW91IHN1cmUgdGhhdCB0aGUgZGF0YS1tb2RhbC10YXJnZXQgYXR0cmlidXRlIHBvaW50cyB0byB0aGUgY29ycmVjdCBtb2RhbCBpZD8uXCIpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIHN1cHBvcnQgcHJlIHYxLjYuMCBkYXRhLW1vZGFsLXRvZ2dsZSBpbml0aWFsaXphdGlvblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW1vZGFsLXRvZ2dsZV0nKS5mb3JFYWNoKGZ1bmN0aW9uICgkdHJpZ2dlckVsKSB7XG4gICAgICAgIHZhciBtb2RhbElkID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbW9kYWwtdG9nZ2xlJyk7XG4gICAgICAgIHZhciAkbW9kYWxFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG1vZGFsSWQpO1xuICAgICAgICBpZiAoJG1vZGFsRWwpIHtcbiAgICAgICAgICAgIHZhciBwbGFjZW1lbnQgPSAkbW9kYWxFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbW9kYWwtcGxhY2VtZW50Jyk7XG4gICAgICAgICAgICB2YXIgYmFja2Ryb3AgPSAkbW9kYWxFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbW9kYWwtYmFja2Ryb3AnKTtcbiAgICAgICAgICAgIHZhciBtb2RhbF8xID0gZ2V0TW9kYWxJbnN0YW5jZShtb2RhbElkLCBtb2RhbEluc3RhbmNlcyk7XG4gICAgICAgICAgICBpZiAoIW1vZGFsXzEpIHtcbiAgICAgICAgICAgICAgICBtb2RhbF8xID0ge1xuICAgICAgICAgICAgICAgICAgICBpZDogbW9kYWxJZCxcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0OiBuZXcgTW9kYWwoJG1vZGFsRWwsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBwbGFjZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IERlZmF1bHQucGxhY2VtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2Ryb3A6IGJhY2tkcm9wID8gYmFja2Ryb3AgOiBEZWZhdWx0LmJhY2tkcm9wLFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIG1vZGFsSW5zdGFuY2VzLnB1c2gobW9kYWxfMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkdHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG1vZGFsXzEub2JqZWN0LnRvZ2dsZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTW9kYWwgd2l0aCBpZCBcIi5jb25jYXQobW9kYWxJZCwgXCIgZG9lcyBub3QgZXhpc3QuIEFyZSB5b3Ugc3VyZSB0aGF0IHRoZSBkYXRhLW1vZGFsLXRvZ2dsZSBhdHRyaWJ1dGUgcG9pbnRzIHRvIHRoZSBjb3JyZWN0IG1vZGFsIGlkP1wiKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBzaG93IG1vZGFsIG9uIGNsaWNrIGlmIGV4aXN0cyBiYXNlZCBvbiBpZFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW1vZGFsLXNob3ddJykuZm9yRWFjaChmdW5jdGlvbiAoJHRyaWdnZXJFbCkge1xuICAgICAgICB2YXIgbW9kYWxJZCA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLW1vZGFsLXNob3cnKTtcbiAgICAgICAgdmFyICRtb2RhbEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobW9kYWxJZCk7XG4gICAgICAgIGlmICgkbW9kYWxFbCkge1xuICAgICAgICAgICAgdmFyIG1vZGFsXzIgPSBnZXRNb2RhbEluc3RhbmNlKG1vZGFsSWQsIG1vZGFsSW5zdGFuY2VzKTtcbiAgICAgICAgICAgIGlmIChtb2RhbF8yKSB7XG4gICAgICAgICAgICAgICAgJHRyaWdnZXJFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGFsXzIub2JqZWN0LmlzSGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RhbF8yLm9iamVjdC5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNb2RhbCB3aXRoIGlkIFwiLmNvbmNhdChtb2RhbElkLCBcIiBoYXMgbm90IGJlZW4gaW5pdGlhbGl6ZWQuIFBsZWFzZSBpbml0aWFsaXplIGl0IHVzaW5nIHRoZSBkYXRhLW1vZGFsLXRhcmdldCBhdHRyaWJ1dGUuXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNb2RhbCB3aXRoIGlkIFwiLmNvbmNhdChtb2RhbElkLCBcIiBkb2VzIG5vdCBleGlzdC4gQXJlIHlvdSBzdXJlIHRoYXQgdGhlIGRhdGEtbW9kYWwtc2hvdyBhdHRyaWJ1dGUgcG9pbnRzIHRvIHRoZSBjb3JyZWN0IG1vZGFsIGlkP1wiKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBoaWRlIG1vZGFsIG9uIGNsaWNrIGlmIGV4aXN0cyBiYXNlZCBvbiBpZFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW1vZGFsLWhpZGVdJykuZm9yRWFjaChmdW5jdGlvbiAoJHRyaWdnZXJFbCkge1xuICAgICAgICB2YXIgbW9kYWxJZCA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLW1vZGFsLWhpZGUnKTtcbiAgICAgICAgdmFyICRtb2RhbEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobW9kYWxJZCk7XG4gICAgICAgIGlmICgkbW9kYWxFbCkge1xuICAgICAgICAgICAgdmFyIG1vZGFsXzMgPSBnZXRNb2RhbEluc3RhbmNlKG1vZGFsSWQsIG1vZGFsSW5zdGFuY2VzKTtcbiAgICAgICAgICAgIGlmIChtb2RhbF8zKSB7XG4gICAgICAgICAgICAgICAgJHRyaWdnZXJFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGFsXzMub2JqZWN0LmlzVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWxfMy5vYmplY3QuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTW9kYWwgd2l0aCBpZCBcIi5jb25jYXQobW9kYWxJZCwgXCIgaGFzIG5vdCBiZWVuIGluaXRpYWxpemVkLiBQbGVhc2UgaW5pdGlhbGl6ZSBpdCB1c2luZyB0aGUgZGF0YS1tb2RhbC10YXJnZXQgYXR0cmlidXRlLlwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTW9kYWwgd2l0aCBpZCBcIi5jb25jYXQobW9kYWxJZCwgXCIgZG9lcyBub3QgZXhpc3QuIEFyZSB5b3Ugc3VyZSB0aGF0IHRoZSBkYXRhLW1vZGFsLWhpZGUgYXR0cmlidXRlIHBvaW50cyB0byB0aGUgY29ycmVjdCBtb2RhbCBpZD9cIikpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnQgZGVmYXVsdCBNb2RhbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWludGVyZmFjZS5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD10eXBlcy5qcy5tYXAiLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSwgcGFjaykge1xuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XG59O1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWVtcHR5LWZ1bmN0aW9uICovXG5pbXBvcnQgeyBjcmVhdGVQb3BwZXIgfSBmcm9tICdAcG9wcGVyanMvY29yZSc7XG52YXIgRGVmYXVsdCA9IHtcbiAgICBwbGFjZW1lbnQ6ICd0b3AnLFxuICAgIG9mZnNldDogMTAsXG4gICAgdHJpZ2dlclR5cGU6ICdob3ZlcicsXG4gICAgb25TaG93OiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgb25IaWRlOiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgb25Ub2dnbGU6IGZ1bmN0aW9uICgpIHsgfSxcbn07XG52YXIgUG9wb3ZlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQb3BvdmVyKHRhcmdldEVsLCB0cmlnZ2VyRWwsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRhcmdldEVsID09PSB2b2lkIDApIHsgdGFyZ2V0RWwgPSBudWxsOyB9XG4gICAgICAgIGlmICh0cmlnZ2VyRWwgPT09IHZvaWQgMCkgeyB0cmlnZ2VyRWwgPSBudWxsOyB9XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IERlZmF1bHQ7IH1cbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwgPSB0YXJnZXRFbDtcbiAgICAgICAgdGhpcy5fdHJpZ2dlckVsID0gdHJpZ2dlckVsO1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gX19hc3NpZ24oX19hc3NpZ24oe30sIERlZmF1bHQpLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fcG9wcGVySW5zdGFuY2UgPSB0aGlzLl9jcmVhdGVQb3BwZXJJbnN0YW5jZSgpO1xuICAgICAgICB0aGlzLl92aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9XG4gICAgUG9wb3Zlci5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl90cmlnZ2VyRWwpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHVwRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUG9wb3Zlci5wcm90b3R5cGUuX3NldHVwRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciB0cmlnZ2VyRXZlbnRzID0gdGhpcy5fZ2V0VHJpZ2dlckV2ZW50cygpO1xuICAgICAgICB0cmlnZ2VyRXZlbnRzLnNob3dFdmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIF90aGlzLl90cmlnZ2VyRWwuYWRkRXZlbnRMaXN0ZW5lcihldiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnNob3coKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgX3RoaXMuX3RhcmdldEVsLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zaG93KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRyaWdnZXJFdmVudHMuaGlkZUV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgX3RoaXMuX3RyaWdnZXJFbC5hZGRFdmVudExpc3RlbmVyKGV2LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghX3RoaXMuX3RhcmdldEVsLm1hdGNoZXMoJzpob3ZlcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBfdGhpcy5fdGFyZ2V0RWwuYWRkRXZlbnRMaXN0ZW5lcihldiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIV90aGlzLl90cmlnZ2VyRWwubWF0Y2hlcygnOmhvdmVyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBQb3BvdmVyLnByb3RvdHlwZS5fY3JlYXRlUG9wcGVySW5zdGFuY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVQb3BwZXIodGhpcy5fdHJpZ2dlckVsLCB0aGlzLl90YXJnZXRFbCwge1xuICAgICAgICAgICAgcGxhY2VtZW50OiB0aGlzLl9vcHRpb25zLnBsYWNlbWVudCxcbiAgICAgICAgICAgIG1vZGlmaWVyczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ29mZnNldCcsXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldDogWzAsIHRoaXMuX29wdGlvbnMub2Zmc2V0XSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBQb3BvdmVyLnByb3RvdHlwZS5fZ2V0VHJpZ2dlckV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLl9vcHRpb25zLnRyaWdnZXJUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdob3Zlcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0V2ZW50czogWydtb3VzZWVudGVyJywgJ2ZvY3VzJ10sXG4gICAgICAgICAgICAgICAgICAgIGhpZGVFdmVudHM6IFsnbW91c2VsZWF2ZScsICdibHVyJ10sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgJ2NsaWNrJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzaG93RXZlbnRzOiBbJ2NsaWNrJywgJ2ZvY3VzJ10sXG4gICAgICAgICAgICAgICAgICAgIGhpZGVFdmVudHM6IFsnZm9jdXNvdXQnLCAnYmx1ciddLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlICdub25lJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzaG93RXZlbnRzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgaGlkZUV2ZW50czogW10sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0V2ZW50czogWydtb3VzZWVudGVyJywgJ2ZvY3VzJ10sXG4gICAgICAgICAgICAgICAgICAgIGhpZGVFdmVudHM6IFsnbW91c2VsZWF2ZScsICdibHVyJ10sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUG9wb3Zlci5wcm90b3R5cGUuX3NldHVwS2V5ZG93bkxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl9rZXlkb3duRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgaWYgKGV2LmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX2tleWRvd25FdmVudExpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuICAgIFBvcG92ZXIucHJvdG90eXBlLl9yZW1vdmVLZXlkb3duTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX2tleWRvd25FdmVudExpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuICAgIFBvcG92ZXIucHJvdG90eXBlLl9zZXR1cENsaWNrT3V0c2lkZUxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl9jbGlja091dHNpZGVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBfdGhpcy5faGFuZGxlQ2xpY2tPdXRzaWRlKGV2LCBfdGhpcy5fdGFyZ2V0RWwpO1xuICAgICAgICB9O1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fY2xpY2tPdXRzaWRlRXZlbnRMaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcbiAgICBQb3BvdmVyLnByb3RvdHlwZS5fcmVtb3ZlQ2xpY2tPdXRzaWRlTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9jbGlja091dHNpZGVFdmVudExpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuICAgIFBvcG92ZXIucHJvdG90eXBlLl9oYW5kbGVDbGlja091dHNpZGUgPSBmdW5jdGlvbiAoZXYsIHRhcmdldEVsKSB7XG4gICAgICAgIHZhciBjbGlja2VkRWwgPSBldi50YXJnZXQ7XG4gICAgICAgIGlmIChjbGlja2VkRWwgIT09IHRhcmdldEVsICYmXG4gICAgICAgICAgICAhdGFyZ2V0RWwuY29udGFpbnMoY2xpY2tlZEVsKSAmJlxuICAgICAgICAgICAgIXRoaXMuX3RyaWdnZXJFbC5jb250YWlucyhjbGlja2VkRWwpICYmXG4gICAgICAgICAgICB0aGlzLmlzVmlzaWJsZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUG9wb3Zlci5wcm90b3R5cGUuaXNWaXNpYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcbiAgICB9O1xuICAgIFBvcG92ZXIucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vblRvZ2dsZSh0aGlzKTtcbiAgICB9O1xuICAgIFBvcG92ZXIucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoJ29wYWNpdHktMCcsICdpbnZpc2libGUnKTtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCgnb3BhY2l0eS0xMDAnLCAndmlzaWJsZScpO1xuICAgICAgICAvLyBFbmFibGUgdGhlIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICB0aGlzLl9wb3BwZXJJbnN0YW5jZS5zZXRPcHRpb25zKGZ1bmN0aW9uIChvcHRpb25zKSB7IHJldHVybiAoX19hc3NpZ24oX19hc3NpZ24oe30sIG9wdGlvbnMpLCB7IG1vZGlmaWVyczogX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KFtdLCBvcHRpb25zLm1vZGlmaWVycywgdHJ1ZSksIFtcbiAgICAgICAgICAgICAgICB7IG5hbWU6ICdldmVudExpc3RlbmVycycsIGVuYWJsZWQ6IHRydWUgfSxcbiAgICAgICAgICAgIF0sIGZhbHNlKSB9KSk7IH0pO1xuICAgICAgICAvLyBoYW5kbGUgY2xpY2sgb3V0c2lkZVxuICAgICAgICB0aGlzLl9zZXR1cENsaWNrT3V0c2lkZUxpc3RlbmVyKCk7XG4gICAgICAgIC8vIGhhbmRsZSBlc2Mga2V5ZG93blxuICAgICAgICB0aGlzLl9zZXR1cEtleWRvd25MaXN0ZW5lcigpO1xuICAgICAgICAvLyBVcGRhdGUgaXRzIHBvc2l0aW9uXG4gICAgICAgIHRoaXMuX3BvcHBlckluc3RhbmNlLnVwZGF0ZSgpO1xuICAgICAgICAvLyBzZXQgdmlzaWJpbGl0eSB0byB0cnVlXG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSB0cnVlO1xuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uU2hvdyh0aGlzKTtcbiAgICB9O1xuICAgIFBvcG92ZXIucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoJ29wYWNpdHktMTAwJywgJ3Zpc2libGUnKTtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCgnb3BhY2l0eS0wJywgJ2ludmlzaWJsZScpO1xuICAgICAgICAvLyBEaXNhYmxlIHRoZSBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgdGhpcy5fcG9wcGVySW5zdGFuY2Uuc2V0T3B0aW9ucyhmdW5jdGlvbiAob3B0aW9ucykgeyByZXR1cm4gKF9fYXNzaWduKF9fYXNzaWduKHt9LCBvcHRpb25zKSwgeyBtb2RpZmllcnM6IF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShbXSwgb3B0aW9ucy5tb2RpZmllcnMsIHRydWUpLCBbXG4gICAgICAgICAgICAgICAgeyBuYW1lOiAnZXZlbnRMaXN0ZW5lcnMnLCBlbmFibGVkOiBmYWxzZSB9LFxuICAgICAgICAgICAgXSwgZmFsc2UpIH0pKTsgfSk7XG4gICAgICAgIC8vIGhhbmRsZSBjbGljayBvdXRzaWRlXG4gICAgICAgIHRoaXMuX3JlbW92ZUNsaWNrT3V0c2lkZUxpc3RlbmVyKCk7XG4gICAgICAgIC8vIGhhbmRsZSBlc2Mga2V5ZG93blxuICAgICAgICB0aGlzLl9yZW1vdmVLZXlkb3duTGlzdGVuZXIoKTtcbiAgICAgICAgLy8gc2V0IHZpc2liaWxpdHkgdG8gZmFsc2VcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uSGlkZSh0aGlzKTtcbiAgICB9O1xuICAgIHJldHVybiBQb3BvdmVyO1xufSgpKTtcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHdpbmRvdy5Qb3BvdmVyID0gUG9wb3Zlcjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpbml0UG9wb3ZlcnMoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcG9wb3Zlci10YXJnZXRdJykuZm9yRWFjaChmdW5jdGlvbiAoJHRyaWdnZXJFbCkge1xuICAgICAgICB2YXIgcG9wb3ZlcklEID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcG9wb3Zlci10YXJnZXQnKTtcbiAgICAgICAgdmFyICRwb3BvdmVyRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwb3BvdmVySUQpO1xuICAgICAgICBpZiAoJHBvcG92ZXJFbCkge1xuICAgICAgICAgICAgdmFyIHRyaWdnZXJUeXBlID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcG9wb3Zlci10cmlnZ2VyJyk7XG4gICAgICAgICAgICB2YXIgcGxhY2VtZW50ID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcG9wb3Zlci1wbGFjZW1lbnQnKTtcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1wb3BvdmVyLW9mZnNldCcpO1xuICAgICAgICAgICAgbmV3IFBvcG92ZXIoJHBvcG92ZXJFbCwgJHRyaWdnZXJFbCwge1xuICAgICAgICAgICAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50ID8gcGxhY2VtZW50IDogRGVmYXVsdC5wbGFjZW1lbnQsXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiBvZmZzZXQgPyBwYXJzZUludChvZmZzZXQpIDogRGVmYXVsdC5vZmZzZXQsXG4gICAgICAgICAgICAgICAgdHJpZ2dlclR5cGU6IHRyaWdnZXJUeXBlXG4gICAgICAgICAgICAgICAgICAgID8gdHJpZ2dlclR5cGVcbiAgICAgICAgICAgICAgICAgICAgOiBEZWZhdWx0LnRyaWdnZXJUeXBlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVGhlIHBvcG92ZXIgZWxlbWVudCB3aXRoIGlkIFxcXCJcIi5jb25jYXQocG9wb3ZlcklELCBcIlxcXCIgZG9lcyBub3QgZXhpc3QuIFBsZWFzZSBjaGVjayB0aGUgZGF0YS1wb3BvdmVyLXRhcmdldCBhdHRyaWJ1dGUuXCIpKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0IGRlZmF1bHQgUG9wb3Zlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWludGVyZmFjZS5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD10eXBlcy5qcy5tYXAiLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIERlZmF1bHQgPSB7XG4gICAgZGVmYXVsdFRhYklkOiBudWxsLFxuICAgIGFjdGl2ZUNsYXNzZXM6ICd0ZXh0LWJsdWUtNjAwIGhvdmVyOnRleHQtYmx1ZS02MDAgZGFyazp0ZXh0LWJsdWUtNTAwIGRhcms6aG92ZXI6dGV4dC1ibHVlLTUwMCBib3JkZXItYmx1ZS02MDAgZGFyazpib3JkZXItYmx1ZS01MDAnLFxuICAgIGluYWN0aXZlQ2xhc3NlczogJ2Rhcms6Ym9yZGVyLXRyYW5zcGFyZW50IHRleHQtZ3JheS01MDAgaG92ZXI6dGV4dC1ncmF5LTYwMCBkYXJrOnRleHQtZ3JheS00MDAgYm9yZGVyLWdyYXktMTAwIGhvdmVyOmJvcmRlci1ncmF5LTMwMCBkYXJrOmJvcmRlci1ncmF5LTcwMCBkYXJrOmhvdmVyOnRleHQtZ3JheS0zMDAnLFxuICAgIG9uU2hvdzogZnVuY3Rpb24gKCkgeyB9LFxufTtcbnZhciBUYWJzID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRhYnMoaXRlbXMsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKGl0ZW1zID09PSB2b2lkIDApIHsgaXRlbXMgPSBbXTsgfVxuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSBEZWZhdWx0OyB9XG4gICAgICAgIHRoaXMuX2l0ZW1zID0gaXRlbXM7XG4gICAgICAgIHRoaXMuX2FjdGl2ZVRhYiA9IG9wdGlvbnMgPyB0aGlzLmdldFRhYihvcHRpb25zLmRlZmF1bHRUYWJJZCkgOiBudWxsO1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gX19hc3NpZ24oX19hc3NpZ24oe30sIERlZmF1bHQpLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5faW5pdCgpO1xuICAgIH1cbiAgICBUYWJzLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gc2V0IHRoZSBmaXJzdCB0YWIgYXMgYWN0aXZlIGlmIG5vdCBzZXQgYnkgZXhwbGljaXRseVxuICAgICAgICAgICAgaWYgKCF0aGlzLl9hY3RpdmVUYWIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRBY3RpdmVUYWIodGhpcy5faXRlbXNbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZm9yY2Ugc2hvdyB0aGUgZmlyc3QgZGVmYXVsdCB0YWJcbiAgICAgICAgICAgIHRoaXMuc2hvdyh0aGlzLl9hY3RpdmVUYWIuaWQsIHRydWUpO1xuICAgICAgICAgICAgLy8gc2hvdyB0YWIgY29udGVudCBiYXNlZCBvbiBjbGlja1xuICAgICAgICAgICAgdGhpcy5faXRlbXMubWFwKGZ1bmN0aW9uICh0YWIpIHtcbiAgICAgICAgICAgICAgICB0YWIudHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zaG93KHRhYi5pZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgVGFicy5wcm90b3R5cGUuZ2V0QWN0aXZlVGFiID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aXZlVGFiO1xuICAgIH07XG4gICAgVGFicy5wcm90b3R5cGUuX3NldEFjdGl2ZVRhYiA9IGZ1bmN0aW9uICh0YWIpIHtcbiAgICAgICAgdGhpcy5fYWN0aXZlVGFiID0gdGFiO1xuICAgIH07XG4gICAgVGFicy5wcm90b3R5cGUuZ2V0VGFiID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcy5maWx0ZXIoZnVuY3Rpb24gKHQpIHsgcmV0dXJuIHQuaWQgPT09IGlkOyB9KVswXTtcbiAgICB9O1xuICAgIFRhYnMucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoaWQsIGZvcmNlU2hvdykge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoZm9yY2VTaG93ID09PSB2b2lkIDApIHsgZm9yY2VTaG93ID0gZmFsc2U7IH1cbiAgICAgICAgdmFyIHRhYiA9IHRoaXMuZ2V0VGFiKGlkKTtcbiAgICAgICAgLy8gZG9uJ3QgZG8gYW55dGhpbmcgaWYgYWxyZWFkeSBhY3RpdmVcbiAgICAgICAgaWYgKHRhYiA9PT0gdGhpcy5fYWN0aXZlVGFiICYmICFmb3JjZVNob3cpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBoaWRlIG90aGVyIHRhYnNcbiAgICAgICAgdGhpcy5faXRlbXMubWFwKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgaWYgKHQgIT09IHRhYikge1xuICAgICAgICAgICAgICAgIChfYSA9IHQudHJpZ2dlckVsLmNsYXNzTGlzdCkucmVtb3ZlLmFwcGx5KF9hLCBfdGhpcy5fb3B0aW9ucy5hY3RpdmVDbGFzc2VzLnNwbGl0KCcgJykpO1xuICAgICAgICAgICAgICAgIChfYiA9IHQudHJpZ2dlckVsLmNsYXNzTGlzdCkuYWRkLmFwcGx5KF9iLCBfdGhpcy5fb3B0aW9ucy5pbmFjdGl2ZUNsYXNzZXMuc3BsaXQoJyAnKSk7XG4gICAgICAgICAgICAgICAgdC50YXJnZXRFbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICB0LnRyaWdnZXJFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAnZmFsc2UnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIHNob3cgYWN0aXZlIHRhYlxuICAgICAgICAoX2EgPSB0YWIudHJpZ2dlckVsLmNsYXNzTGlzdCkuYWRkLmFwcGx5KF9hLCB0aGlzLl9vcHRpb25zLmFjdGl2ZUNsYXNzZXMuc3BsaXQoJyAnKSk7XG4gICAgICAgIChfYiA9IHRhYi50cmlnZ2VyRWwuY2xhc3NMaXN0KS5yZW1vdmUuYXBwbHkoX2IsIHRoaXMuX29wdGlvbnMuaW5hY3RpdmVDbGFzc2VzLnNwbGl0KCcgJykpO1xuICAgICAgICB0YWIudHJpZ2dlckVsLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG4gICAgICAgIHRhYi50YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgdGhpcy5fc2V0QWN0aXZlVGFiKHRhYik7XG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25TaG93KHRoaXMsIHRhYik7XG4gICAgfTtcbiAgICByZXR1cm4gVGFicztcbn0oKSk7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB3aW5kb3cuVGFicyA9IFRhYnM7XG59XG5leHBvcnQgZnVuY3Rpb24gaW5pdFRhYnMoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFicy10b2dnbGVdJykuZm9yRWFjaChmdW5jdGlvbiAoJHRyaWdnZXJFbCkge1xuICAgICAgICB2YXIgdGFiSXRlbXMgPSBbXTtcbiAgICAgICAgdmFyIGRlZmF1bHRUYWJJZCA9IG51bGw7XG4gICAgICAgICR0cmlnZ2VyRWxcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cInRhYlwiXScpXG4gICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAoJHRyaWdnZXJFbCkge1xuICAgICAgICAgICAgdmFyIGlzQWN0aXZlID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnKSA9PT0gJ3RydWUnO1xuICAgICAgICAgICAgdmFyIHRhYiA9IHtcbiAgICAgICAgICAgICAgICBpZDogJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFicy10YXJnZXQnKSxcbiAgICAgICAgICAgICAgICB0cmlnZ2VyRWw6ICR0cmlnZ2VyRWwsXG4gICAgICAgICAgICAgICAgdGFyZ2V0RWw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFicy10YXJnZXQnKSksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGFiSXRlbXMucHVzaCh0YWIpO1xuICAgICAgICAgICAgaWYgKGlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRhYklkID0gdGFiLmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgbmV3IFRhYnModGFiSXRlbXMsIHtcbiAgICAgICAgICAgIGRlZmF1bHRUYWJJZDogZGVmYXVsdFRhYklkLFxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydCBkZWZhdWx0IFRhYnM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnRlcmZhY2UuanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwZXMuanMubWFwIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20sIHBhY2spIHtcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xufTtcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1mdW5jdGlvbiAqL1xuaW1wb3J0IHsgY3JlYXRlUG9wcGVyIH0gZnJvbSAnQHBvcHBlcmpzL2NvcmUnO1xudmFyIERlZmF1bHQgPSB7XG4gICAgcGxhY2VtZW50OiAndG9wJyxcbiAgICB0cmlnZ2VyVHlwZTogJ2hvdmVyJyxcbiAgICBvblNob3c6IGZ1bmN0aW9uICgpIHsgfSxcbiAgICBvbkhpZGU6IGZ1bmN0aW9uICgpIHsgfSxcbiAgICBvblRvZ2dsZTogZnVuY3Rpb24gKCkgeyB9LFxufTtcbnZhciBUb29sdGlwID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRvb2x0aXAodGFyZ2V0RWwsIHRyaWdnZXJFbCwgb3B0aW9ucykge1xuICAgICAgICBpZiAodGFyZ2V0RWwgPT09IHZvaWQgMCkgeyB0YXJnZXRFbCA9IG51bGw7IH1cbiAgICAgICAgaWYgKHRyaWdnZXJFbCA9PT0gdm9pZCAwKSB7IHRyaWdnZXJFbCA9IG51bGw7IH1cbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0gRGVmYXVsdDsgfVxuICAgICAgICB0aGlzLl90YXJnZXRFbCA9IHRhcmdldEVsO1xuICAgICAgICB0aGlzLl90cmlnZ2VyRWwgPSB0cmlnZ2VyRWw7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgRGVmYXVsdCksIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9wb3BwZXJJbnN0YW5jZSA9IHRoaXMuX2NyZWF0ZVBvcHBlckluc3RhbmNlKCk7XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faW5pdCgpO1xuICAgIH1cbiAgICBUb29sdGlwLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3RyaWdnZXJFbCkge1xuICAgICAgICAgICAgdGhpcy5fc2V0dXBFdmVudExpc3RlbmVycygpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBUb29sdGlwLnByb3RvdHlwZS5fc2V0dXBFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHRyaWdnZXJFdmVudHMgPSB0aGlzLl9nZXRUcmlnZ2VyRXZlbnRzKCk7XG4gICAgICAgIHRyaWdnZXJFdmVudHMuc2hvd0V2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgX3RoaXMuX3RyaWdnZXJFbC5hZGRFdmVudExpc3RlbmVyKGV2LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2hvdygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0cmlnZ2VyRXZlbnRzLmhpZGVFdmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIF90aGlzLl90cmlnZ2VyRWwuYWRkRXZlbnRMaXN0ZW5lcihldiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFRvb2x0aXAucHJvdG90eXBlLl9jcmVhdGVQb3BwZXJJbnN0YW5jZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVBvcHBlcih0aGlzLl90cmlnZ2VyRWwsIHRoaXMuX3RhcmdldEVsLCB7XG4gICAgICAgICAgICBwbGFjZW1lbnQ6IHRoaXMuX29wdGlvbnMucGxhY2VtZW50LFxuICAgICAgICAgICAgbW9kaWZpZXJzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnb2Zmc2V0JyxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0OiBbMCwgOF0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgVG9vbHRpcC5wcm90b3R5cGUuX2dldFRyaWdnZXJFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5fb3B0aW9ucy50cmlnZ2VyVHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnaG92ZXInOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dFdmVudHM6IFsnbW91c2VlbnRlcicsICdmb2N1cyddLFxuICAgICAgICAgICAgICAgICAgICBoaWRlRXZlbnRzOiBbJ21vdXNlbGVhdmUnLCAnYmx1ciddLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlICdjbGljayc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0V2ZW50czogWydjbGljaycsICdmb2N1cyddLFxuICAgICAgICAgICAgICAgICAgICBoaWRlRXZlbnRzOiBbJ2ZvY3Vzb3V0JywgJ2JsdXInXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAnbm9uZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0V2ZW50czogW10sXG4gICAgICAgICAgICAgICAgICAgIGhpZGVFdmVudHM6IFtdLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dFdmVudHM6IFsnbW91c2VlbnRlcicsICdmb2N1cyddLFxuICAgICAgICAgICAgICAgICAgICBoaWRlRXZlbnRzOiBbJ21vdXNlbGVhdmUnLCAnYmx1ciddLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFRvb2x0aXAucHJvdG90eXBlLl9zZXR1cEtleWRvd25MaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fa2V5ZG93bkV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIGlmIChldi5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9rZXlkb3duRXZlbnRMaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcbiAgICBUb29sdGlwLnByb3RvdHlwZS5fcmVtb3ZlS2V5ZG93bkxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9rZXlkb3duRXZlbnRMaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcbiAgICBUb29sdGlwLnByb3RvdHlwZS5fc2V0dXBDbGlja091dHNpZGVMaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fY2xpY2tPdXRzaWRlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgX3RoaXMuX2hhbmRsZUNsaWNrT3V0c2lkZShldiwgX3RoaXMuX3RhcmdldEVsKTtcbiAgICAgICAgfTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2NsaWNrT3V0c2lkZUV2ZW50TGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG4gICAgVG9vbHRpcC5wcm90b3R5cGUuX3JlbW92ZUNsaWNrT3V0c2lkZUxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fY2xpY2tPdXRzaWRlRXZlbnRMaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcbiAgICBUb29sdGlwLnByb3RvdHlwZS5faGFuZGxlQ2xpY2tPdXRzaWRlID0gZnVuY3Rpb24gKGV2LCB0YXJnZXRFbCkge1xuICAgICAgICB2YXIgY2xpY2tlZEVsID0gZXYudGFyZ2V0O1xuICAgICAgICBpZiAoY2xpY2tlZEVsICE9PSB0YXJnZXRFbCAmJlxuICAgICAgICAgICAgIXRhcmdldEVsLmNvbnRhaW5zKGNsaWNrZWRFbCkgJiZcbiAgICAgICAgICAgICF0aGlzLl90cmlnZ2VyRWwuY29udGFpbnMoY2xpY2tlZEVsKSAmJlxuICAgICAgICAgICAgdGhpcy5pc1Zpc2libGUoKSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFRvb2x0aXAucHJvdG90eXBlLmlzVmlzaWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XG4gICAgfTtcbiAgICBUb29sdGlwLnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBUb29sdGlwLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKCdvcGFjaXR5LTAnLCAnaW52aXNpYmxlJyk7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoJ29wYWNpdHktMTAwJywgJ3Zpc2libGUnKTtcbiAgICAgICAgLy8gRW5hYmxlIHRoZSBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgdGhpcy5fcG9wcGVySW5zdGFuY2Uuc2V0T3B0aW9ucyhmdW5jdGlvbiAob3B0aW9ucykgeyByZXR1cm4gKF9fYXNzaWduKF9fYXNzaWduKHt9LCBvcHRpb25zKSwgeyBtb2RpZmllcnM6IF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShbXSwgb3B0aW9ucy5tb2RpZmllcnMsIHRydWUpLCBbXG4gICAgICAgICAgICAgICAgeyBuYW1lOiAnZXZlbnRMaXN0ZW5lcnMnLCBlbmFibGVkOiB0cnVlIH0sXG4gICAgICAgICAgICBdLCBmYWxzZSkgfSkpOyB9KTtcbiAgICAgICAgLy8gaGFuZGxlIGNsaWNrIG91dHNpZGVcbiAgICAgICAgdGhpcy5fc2V0dXBDbGlja091dHNpZGVMaXN0ZW5lcigpO1xuICAgICAgICAvLyBoYW5kbGUgZXNjIGtleWRvd25cbiAgICAgICAgdGhpcy5fc2V0dXBLZXlkb3duTGlzdGVuZXIoKTtcbiAgICAgICAgLy8gVXBkYXRlIGl0cyBwb3NpdGlvblxuICAgICAgICB0aGlzLl9wb3BwZXJJbnN0YW5jZS51cGRhdGUoKTtcbiAgICAgICAgLy8gc2V0IHZpc2liaWxpdHlcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IHRydWU7XG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25TaG93KHRoaXMpO1xuICAgIH07XG4gICAgVG9vbHRpcC5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZSgnb3BhY2l0eS0xMDAnLCAndmlzaWJsZScpO1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuYWRkKCdvcGFjaXR5LTAnLCAnaW52aXNpYmxlJyk7XG4gICAgICAgIC8vIERpc2FibGUgdGhlIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICB0aGlzLl9wb3BwZXJJbnN0YW5jZS5zZXRPcHRpb25zKGZ1bmN0aW9uIChvcHRpb25zKSB7IHJldHVybiAoX19hc3NpZ24oX19hc3NpZ24oe30sIG9wdGlvbnMpLCB7IG1vZGlmaWVyczogX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KFtdLCBvcHRpb25zLm1vZGlmaWVycywgdHJ1ZSksIFtcbiAgICAgICAgICAgICAgICB7IG5hbWU6ICdldmVudExpc3RlbmVycycsIGVuYWJsZWQ6IGZhbHNlIH0sXG4gICAgICAgICAgICBdLCBmYWxzZSkgfSkpOyB9KTtcbiAgICAgICAgLy8gaGFuZGxlIGNsaWNrIG91dHNpZGVcbiAgICAgICAgdGhpcy5fcmVtb3ZlQ2xpY2tPdXRzaWRlTGlzdGVuZXIoKTtcbiAgICAgICAgLy8gaGFuZGxlIGVzYyBrZXlkb3duXG4gICAgICAgIHRoaXMuX3JlbW92ZUtleWRvd25MaXN0ZW5lcigpO1xuICAgICAgICAvLyBzZXQgdmlzaWJpbGl0eVxuICAgICAgICB0aGlzLl92aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25IaWRlKHRoaXMpO1xuICAgIH07XG4gICAgcmV0dXJuIFRvb2x0aXA7XG59KCkpO1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgd2luZG93LlRvb2x0aXAgPSBUb29sdGlwO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGluaXRUb29sdGlwcygpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10b29sdGlwLXRhcmdldF0nKS5mb3JFYWNoKGZ1bmN0aW9uICgkdHJpZ2dlckVsKSB7XG4gICAgICAgIHZhciB0b29sdGlwSWQgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS10b29sdGlwLXRhcmdldCcpO1xuICAgICAgICB2YXIgJHRvb2x0aXBFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRvb2x0aXBJZCk7XG4gICAgICAgIGlmICgkdG9vbHRpcEVsKSB7XG4gICAgICAgICAgICB2YXIgdHJpZ2dlclR5cGUgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS10b29sdGlwLXRyaWdnZXInKTtcbiAgICAgICAgICAgIHZhciBwbGFjZW1lbnQgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS10b29sdGlwLXBsYWNlbWVudCcpO1xuICAgICAgICAgICAgbmV3IFRvb2x0aXAoJHRvb2x0aXBFbCwgJHRyaWdnZXJFbCwge1xuICAgICAgICAgICAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50ID8gcGxhY2VtZW50IDogRGVmYXVsdC5wbGFjZW1lbnQsXG4gICAgICAgICAgICAgICAgdHJpZ2dlclR5cGU6IHRyaWdnZXJUeXBlXG4gICAgICAgICAgICAgICAgICAgID8gdHJpZ2dlclR5cGVcbiAgICAgICAgICAgICAgICAgICAgOiBEZWZhdWx0LnRyaWdnZXJUeXBlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVGhlIHRvb2x0aXAgZWxlbWVudCB3aXRoIGlkIFxcXCJcIi5jb25jYXQodG9vbHRpcElkLCBcIlxcXCIgZG9lcyBub3QgZXhpc3QuIFBsZWFzZSBjaGVjayB0aGUgZGF0YS10b29sdGlwLXRhcmdldCBhdHRyaWJ1dGUuXCIpKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0IGRlZmF1bHQgVG9vbHRpcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWludGVyZmFjZS5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD10eXBlcy5qcy5tYXAiLCJ2YXIgRXZlbnRzID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEV2ZW50cyhldmVudFR5cGUsIGV2ZW50RnVuY3Rpb25zKSB7XG4gICAgICAgIGlmIChldmVudEZ1bmN0aW9ucyA9PT0gdm9pZCAwKSB7IGV2ZW50RnVuY3Rpb25zID0gW107IH1cbiAgICAgICAgdGhpcy5fZXZlbnRUeXBlID0gZXZlbnRUeXBlO1xuICAgICAgICB0aGlzLl9ldmVudEZ1bmN0aW9ucyA9IGV2ZW50RnVuY3Rpb25zO1xuICAgIH1cbiAgICBFdmVudHMucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2V2ZW50RnVuY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50RnVuY3Rpb24pIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKF90aGlzLl9ldmVudFR5cGUsIGV2ZW50RnVuY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBFdmVudHM7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgRXZlbnRzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXZlbnRzLmpzLm1hcCIsImltcG9ydCBFdmVudHMgZnJvbSAnLi9kb20vZXZlbnRzJztcbmltcG9ydCB7IGluaXRBY2NvcmRpb25zIH0gZnJvbSAnLi9jb21wb25lbnRzL2FjY29yZGlvbic7XG5pbXBvcnQgeyBpbml0Q29sbGFwc2VzIH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbGxhcHNlJztcbmltcG9ydCB7IGluaXRDYXJvdXNlbHMgfSBmcm9tICcuL2NvbXBvbmVudHMvY2Fyb3VzZWwnO1xuaW1wb3J0IHsgaW5pdERpc21pc3NlcyB9IGZyb20gJy4vY29tcG9uZW50cy9kaXNtaXNzJztcbmltcG9ydCB7IGluaXREcm9wZG93bnMgfSBmcm9tICcuL2NvbXBvbmVudHMvZHJvcGRvd24nO1xuaW1wb3J0IHsgaW5pdE1vZGFscyB9IGZyb20gJy4vY29tcG9uZW50cy9tb2RhbCc7XG5pbXBvcnQgeyBpbml0RHJhd2VycyB9IGZyb20gJy4vY29tcG9uZW50cy9kcmF3ZXInO1xuaW1wb3J0IHsgaW5pdFRhYnMgfSBmcm9tICcuL2NvbXBvbmVudHMvdGFicyc7XG5pbXBvcnQgeyBpbml0VG9vbHRpcHMgfSBmcm9tICcuL2NvbXBvbmVudHMvdG9vbHRpcCc7XG5pbXBvcnQgeyBpbml0UG9wb3ZlcnMgfSBmcm9tICcuL2NvbXBvbmVudHMvcG9wb3Zlcic7XG5pbXBvcnQgeyBpbml0RGlhbHMgfSBmcm9tICcuL2NvbXBvbmVudHMvZGlhbCc7XG4vLyBzZXR1cCBldmVudHMgZm9yIGRhdGEgYXR0cmlidXRlc1xudmFyIGV2ZW50cyA9IG5ldyBFdmVudHMoJ2xvYWQnLCBbXG4gICAgaW5pdEFjY29yZGlvbnMsXG4gICAgaW5pdENvbGxhcHNlcyxcbiAgICBpbml0Q2Fyb3VzZWxzLFxuICAgIGluaXREaXNtaXNzZXMsXG4gICAgaW5pdERyb3Bkb3ducyxcbiAgICBpbml0TW9kYWxzLFxuICAgIGluaXREcmF3ZXJzLFxuICAgIGluaXRUYWJzLFxuICAgIGluaXRUb29sdGlwcyxcbiAgICBpbml0UG9wb3ZlcnMsXG4gICAgaW5pdERpYWxzLFxuXSk7XG5ldmVudHMuaW5pdCgpO1xuLy8gZXhwb3J0IGFsbCBjb21wb25lbnRzXG5leHBvcnQgeyBkZWZhdWx0IGFzIEFjY29yZGlvbiB9IGZyb20gJy4vY29tcG9uZW50cy9hY2NvcmRpb24nO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBDYXJvdXNlbCB9IGZyb20gJy4vY29tcG9uZW50cy9jYXJvdXNlbCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIENvbGxhcHNlIH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbGxhcHNlJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRGlhbCB9IGZyb20gJy4vY29tcG9uZW50cy9kaWFsJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRGlzbWlzcyB9IGZyb20gJy4vY29tcG9uZW50cy9kaXNtaXNzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRHJhd2VyIH0gZnJvbSAnLi9jb21wb25lbnRzL2RyYXdlcic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIERyb3Bkb3duIH0gZnJvbSAnLi9jb21wb25lbnRzL2Ryb3Bkb3duJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTW9kYWwgfSBmcm9tICcuL2NvbXBvbmVudHMvbW9kYWwnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBQb3BvdmVyIH0gZnJvbSAnLi9jb21wb25lbnRzL3BvcG92ZXInO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBUYWJzIH0gZnJvbSAnLi9jb21wb25lbnRzL3RhYnMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBUb29sdGlwIH0gZnJvbSAnLi9jb21wb25lbnRzL3Rvb2x0aXAnO1xuLy8gZXhwb3J0IGFsbCB0eXBlc1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2FjY29yZGlvbi90eXBlcyc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvY2Fyb3VzZWwvdHlwZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2NvbGxhcHNlL3R5cGVzJztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9kaWFsL3R5cGVzJztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9kaXNtaXNzL3R5cGVzJztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9kcmF3ZXIvdHlwZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2Ryb3Bkb3duL3R5cGVzJztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9tb2RhbC90eXBlcyc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvcG9wb3Zlci90eXBlcyc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvdGFicy90eXBlcyc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvdG9vbHRpcC90eXBlcyc7XG4vLyBleHBvcnQgYWxsIGludGVyZmFjZXNcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9hY2NvcmRpb24vaW50ZXJmYWNlJztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9jYXJvdXNlbC9pbnRlcmZhY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2NvbGxhcHNlL2ludGVyZmFjZSc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvZGlhbC9pbnRlcmZhY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2Rpc21pc3MvaW50ZXJmYWNlJztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9kcmF3ZXIvaW50ZXJmYWNlJztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9kcm9wZG93bi9pbnRlcmZhY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL21vZGFsL2ludGVyZmFjZSc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvcG9wb3Zlci9pbnRlcmZhY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL3RhYnMvaW50ZXJmYWNlJztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy90b29sdGlwL2ludGVyZmFjZSc7XG4vLyBleHBvcnQgaW5pdCBmdW5jdGlvbnNcbmV4cG9ydCB7IGluaXRBY2NvcmRpb25zIH0gZnJvbSAnLi9jb21wb25lbnRzL2FjY29yZGlvbic7XG5leHBvcnQgeyBpbml0Q2Fyb3VzZWxzIH0gZnJvbSAnLi9jb21wb25lbnRzL2Nhcm91c2VsJztcbmV4cG9ydCB7IGluaXRDb2xsYXBzZXMgfSBmcm9tICcuL2NvbXBvbmVudHMvY29sbGFwc2UnO1xuZXhwb3J0IHsgaW5pdERpYWxzIH0gZnJvbSAnLi9jb21wb25lbnRzL2RpYWwnO1xuZXhwb3J0IHsgaW5pdERpc21pc3NlcyB9IGZyb20gJy4vY29tcG9uZW50cy9kaXNtaXNzJztcbmV4cG9ydCB7IGluaXREcmF3ZXJzIH0gZnJvbSAnLi9jb21wb25lbnRzL2RyYXdlcic7XG5leHBvcnQgeyBpbml0RHJvcGRvd25zIH0gZnJvbSAnLi9jb21wb25lbnRzL2Ryb3Bkb3duJztcbmV4cG9ydCB7IGluaXRNb2RhbHMgfSBmcm9tICcuL2NvbXBvbmVudHMvbW9kYWwnO1xuZXhwb3J0IHsgaW5pdFBvcG92ZXJzIH0gZnJvbSAnLi9jb21wb25lbnRzL3BvcG92ZXInO1xuZXhwb3J0IHsgaW5pdFRhYnMgfSBmcm9tICcuL2NvbXBvbmVudHMvdGFicyc7XG5leHBvcnQgeyBpbml0VG9vbHRpcHMgfSBmcm9tICcuL2NvbXBvbmVudHMvdG9vbHRpcCc7XG4vLyBleHBvcnQgYWxsIGluaXQgZnVuY3Rpb25zXG5leHBvcnQgeyBpbml0Rmxvd2JpdGUgfSBmcm9tICcuL2NvbXBvbmVudHMvaW5kZXgnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiaW1wb3J0IHsgTW9kYWwgfSBmcm9tICdmbG93Yml0ZSdcbmltcG9ydCB0eXBlIHsgTW9kYWxPcHRpb25zLCBNb2RhbEludGVyZmFjZSB9IGZyb20gJ2Zsb3diaXRlJ1xuaW1wb3J0IERhdGVwaWNrZXIgZnJvbSAnZmxvd2JpdGUtZGF0ZXBpY2tlci9EYXRlcGlja2VyJ1xuaW1wb3J0IHsgZWFzZXBpY2sgfSBmcm9tICdAZWFzZXBpY2svYnVuZGxlJ1xuXG5pbnRlcmZhY2UgSVByb2R1Y3Qge1xuICAgIGlkOiBudW1iZXJcbiAgICBuYW1lOiBzdHJpbmdcbiAgICBzdXBwbGllcl9pZDogbnVtYmVyXG4gICAgY3VycmVuY3k6IHN0cmluZ1xuICAgIHJlZ3VsYXJfcHJpY2U6IG51bWJlclxuICAgIHJldGFpbF9wcmljZTogbnVtYmVyXG4gICAgaW1hZ2U6IHN0cmluZ1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmdcbiAgICAvLyBHZW5lcmFsIEluZm8gLT5cbiAgICBTS1U6IHN0cmluZ1xuICAgIGxvd19zdG9ja19sZXZlbDogbnVtYmVyXG4gICAgcHJvZ3JhbV95ZWFyOiBudW1iZXJcbiAgICBwYWNrYWdlX3F0eTogbnVtYmVyXG4gICAgbnVtYl9vZl9pdGVtc19wZXJfY2FzZTogbnVtYmVyXG4gICAgbnVtYl9vZl9jYXNlc19wZXJfb3V0ZXJfY2FzZTogbnVtYmVyXG4gICAgY29tbWVudHM6IHN0cmluZ1xuICAgIC8vIHNoaXBwaW5nXG4gICAgd2VpZ2h0OiBudW1iZXJcbiAgICBsZW5ndGg6IG51bWJlclxuICAgIHdpZHRoOiBudW1iZXJcbiAgICBoZWlnaHQ6IG51bWJlclxuICAgIG1zdHJfZ3JvdXBzX2dyb3Vwczogb2JqZWN0XG4gICAgY3VycmVudF91c2VyX2dyb3Vwczogb2JqZWN0XG4gICAgZ3JvdXBzX2lkczoge1xuICAgICAgICBbaW5kZXg6IHN0cmluZ106IG51bWJlclxuICAgIH1cbiAgICBhdmFpbGFibGVfcXVhbnRpdHk6IHtcbiAgICAgICAgW2luZGV4OiBzdHJpbmddOiBudW1iZXJcbiAgICB9XG4gICAgdG90YWxfYXZhaWxhYmxlX2l0ZW1zOiB7XG4gICAgICAgIFtpbmRleDogc3RyaW5nXTogbnVtYmVyXG4gICAgfVxuICAgIGFsbF93YXJlaG91c2VzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIFtpbmRleDogc3RyaW5nXTogbnVtYmVyIHwgc3RyaW5nXG4gICAgICAgIH1cbiAgICBdXG4gICAgbXN0cl9wcm9kX2dycHNfcHJvZF9ncnBzX25hbWVzOiB7IFtpbmRleDogc3RyaW5nXTogeyBncm91cF9uYW1lOiBzdHJpbmc7IGdyb3VwX2lkOiBudW1iZXIgfVtdIH1cbiAgICBtc3RyX2dycHNfZ3Jwc19uYW1lc19pbl9wcm9kOiB7IFtpbmRleDogc3RyaW5nXTogeyBncm91cF9uYW1lOiBzdHJpbmc7IGdyb3VwX2lkOiBudW1iZXIgfVtdIH1cbiAgICB3YXJlaG91c2VfcHJvZHVjdF9xdHk6IG51bWJlclxuICAgIHByb2R1Y3RfaW5fd2FyZWhvdXNlczogeyBbaW5kZXg6IHN0cmluZ106IHsgW2luZGV4OiBzdHJpbmddOiBudW1iZXIgfSB9XG59XG5pbnRlcmZhY2UgRmlsdGVySnNvbkRhdGEge1xuICAgIFtrZXk6IHN0cmluZ106IHN0cmluZ1xufVxuXG5pbnRlcmZhY2UgSVByb2R1Y3RNYXN0ZXJHcm91cEdyb3VwIHtcbiAgICBbaW5kZXg6IHN0cmluZ106IHsgZ3JvdXBfbmFtZTogc3RyaW5nOyBncm91cF9pZDogbnVtYmVyIH1bXVxufVxuXG5pbnRlcmZhY2UgSU1hc3Rlckdyb3VwIHtcbiAgICBuYW1lOiBzdHJpbmdcbiAgICBtYXN0ZXJfZ3JvdXBzX2xpc3RfZ3JvdXBzOiB7IFtpbmRleDogc3RyaW5nXTogeyBncm91cF9uYW1lOiBzdHJpbmc7IGdyb3VwX2lkOiBudW1iZXIgfVtdIH1cbn1cblxuLy8gdmFyaWFibGUgdG8gc2V0IGRlZmF1bHQgaW1hZ2UgdG8gYnJhbmQgZHluYW1pY2FsbHkgaW4gbW9kYWwgd2luZG93LiBDYW4gd2UgZ2V0IGxpbmsgZnJvbSB0aGUgaW50ZXJuZXQ/XG5jb25zdCBkZWZhdWx0QnJhbmRJbWFnZSA9XG4gICAgJ2h0dHBzOi8vZnVua28uY29tL29uL2RlbWFuZHdhcmUuc3RhdGljLy0vU2l0ZXMtZnVua28tbWFzdGVyLWNhdGFsb2cvZGVmYXVsdC9kd2JiMzhhMTExL2ltYWdlcy9mdW5rby91cGxvYWQvNTU5OThfQ29jYUNvbGFfUzJfU3ByaXRlQm90dGxlQ2FwX1BPUF9HTEFNLVdFQi5wbmcnXG5cbi8vIGNoZWNrIGlmIHByb2R1Y3QgaGFzIGZpbHRlciBhbmQgZGlzcGxheSBpdFxubGV0IGZpbHRlckpzb25EYXRhOiBGaWx0ZXJKc29uRGF0YSA9IHt9XG5jb25zdCBmaWx0ZXJKc29uT2JqZWN0ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnZmlsdGVySnNvbkRhdGEnKVxuY29uc3QgZmlsdGVyRGF0YSA9IEpTT04ucGFyc2UoZmlsdGVySnNvbk9iamVjdClcbmlmIChmaWx0ZXJEYXRhICE9PSBudWxsIHx8IGZpbHRlckRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IGlzVmlzaWJsZUZpbHRlckpzb24gPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdpc1Zpc2libGVGaWx0ZXInKVxuICAgIGxldCBpc1Zpc2libGVGaWx0ZXIgPSBKU09OLnBhcnNlKGlzVmlzaWJsZUZpbHRlckpzb24pXG4gICAgaWYgKGlzVmlzaWJsZUZpbHRlcikge1xuICAgICAgICBjb25zdCByZWZlcmVuY2VUaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXRhYmxlLXRoLXByb2R1Y3QtdHlwZScpXG4gICAgICAgIGNvbnN0IHByb2R1Y3RJdGVtVHJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlLXByb2R1Y3QtaXRlbS10cicpXG5cbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZmlsdGVyRGF0YSkge1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdEZpbHRlclRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKVxuICAgICAgICAgICAgcHJvZHVjdEZpbHRlclRoLnNldEF0dHJpYnV0ZSgnaWQnLCBgcHJvZHVjdC10YWJsZS1maWx0ZXItbWFzdGVyLWdyb3VwLSR7a2V5LnJlcGxhY2UoLyAvZywgJ18nKX1gKVxuICAgICAgICAgICAgcHJvZHVjdEZpbHRlclRoLmNsYXNzTGlzdC5hZGQoJ3B4LTYnLCAncHktMycpXG4gICAgICAgICAgICBwcm9kdWN0RmlsdGVyVGguc2V0QXR0cmlidXRlKCdzY29wZScsICdjb2wnKVxuICAgICAgICAgICAgcHJvZHVjdEZpbHRlclRoLmlubmVySFRNTCA9IGtleVxuICAgICAgICAgICAgcmVmZXJlbmNlVGgucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocHJvZHVjdEZpbHRlclRoLCByZWZlcmVuY2VUaC5uZXh0U2libGluZylcbiAgICAgICAgfVxuXG4gICAgICAgIHByb2R1Y3RJdGVtVHJzLmZvckVhY2goKHByb2R1Y3Q6IEhUTUxUYWJsZVJvd0VsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlZmVyZW5jZVRkID0gcHJvZHVjdC5jZWxsc1s0XVxuICAgICAgICAgICAgY29uc3QgcHJvZHVjdE5hbWUgPSBwcm9kdWN0LmNlbGxzWzJdLmlubmVyVGV4dFxuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBmaWx0ZXJEYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZHVjdEZpbHRlck5hbWUgPSBmaWx0ZXJEYXRhW2tleV1cbiAgICAgICAgICAgICAgICBjb25zdCBwcm9kdWN0RmlsdGVyVGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpXG4gICAgICAgICAgICAgICAgcHJvZHVjdEZpbHRlclRkLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgICAgICAgJ2lkJyxcbiAgICAgICAgICAgICAgICAgICAgYHByb2R1Y3QtdGFibGUtZmlsdGVyLSR7a2V5fS0ke3Byb2R1Y3RGaWx0ZXJOYW1lLnJlcGxhY2UoLyAvZywgJ18nKX0tJHtwcm9kdWN0TmFtZS5yZXBsYWNlKFxuICAgICAgICAgICAgICAgICAgICAgICAgLyAvZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdfJ1xuICAgICAgICAgICAgICAgICAgICApfWBcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgcHJvZHVjdEZpbHRlclRkLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgICAgICAgICAgICdwLTQnLFxuICAgICAgICAgICAgICAgICAgICAndGV4dC1iYXNlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtbm9ybWFsJyxcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQtZ3JheS05MDAnLFxuICAgICAgICAgICAgICAgICAgICAnd2hpdGVzcGFjZS1ub3dyYXAnLFxuICAgICAgICAgICAgICAgICAgICAnZGFyazp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBwcm9kdWN0RmlsdGVyVGQuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwicGwtM1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWJhc2UgZm9udC1zZW1pYm9sZFwiPiR7cHJvZHVjdEZpbHRlck5hbWV9PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgYFxuICAgICAgICAgICAgICAgIHJlZmVyZW5jZVRkLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHByb2R1Y3RGaWx0ZXJUZCwgcmVmZXJlbmNlVGQubmV4dFNpYmxpbmcpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGlzVmlzaWJsZUZpbHRlciA9IGZhbHNlXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2lzVmlzaWJsZUZpbHRlcicsIEpTT04uc3RyaW5naWZ5KGlzVmlzaWJsZUZpbHRlcikpXG4gICAgfVxufVxuXG4vL2Z1bmN0aW9uIHRvIGRpc3BsYXkgZmlsdGVyIGJ5IG1hc3RlciBncm91cCBvbiBsb2FkIHBhZ2VcbmNvbnN0IGdsb2JhbEZpbHRlck1hc3Rlckdyb3VwID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdnbG9iYWxGaWx0ZXJNYXN0ZXJHcm91cCcpKVxuY29uc3QgcHJvZHVjdE1nR0dsb2JhbCA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdE1nRycpKVxuXG5pZiAoZ2xvYmFsRmlsdGVyTWFzdGVyR3JvdXAgJiYgZ2xvYmFsRmlsdGVyTWFzdGVyR3JvdXAubGVuZ3RoICE9PSAwKSB7XG4gICAgY29uc3QgZmlsdGVyUHJvZHVjdE1hc3Rlckdyb3VwQ2hlY2tib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICcucHJvZHVjdHMtZmlsdGVyLXByb2R1Y3QtbWFzdGVyLWdyb3VwLWNoZWNrYm94J1xuICAgIClcbiAgICBmaWx0ZXJQcm9kdWN0TWFzdGVyR3JvdXBDaGVja2JveGVzLmZvckVhY2goKGNoZWNrYm94OiBIVE1MSW5wdXRFbGVtZW50KSA9PiB7XG4gICAgICAgIGlmIChnbG9iYWxGaWx0ZXJNYXN0ZXJHcm91cC5pbmNsdWRlcyhjaGVja2JveC52YWx1ZSkpIHtcbiAgICAgICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0cnVlXG4gICAgICAgIH1cbiAgICB9KVxuICAgIGZvciAoY29uc3QgbWFzdGVyR3JvdXBOYW1lIG9mIGdsb2JhbEZpbHRlck1hc3Rlckdyb3VwKSB7XG4gICAgICAgIGNvbnN0IHJlZmVyZW5jZVRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtdGFibGUtdGgtcHJvZHVjdC10eXBlJylcbiAgICAgICAgY29uc3QgaXNHcm91cEV4aXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3Byb2R1Y3QtdGFibGUtZmlsdGVyLW1hc3Rlci1ncm91cC0ke21hc3Rlckdyb3VwTmFtZX1gKVxuICAgICAgICBpZiAoIWlzR3JvdXBFeGlzdCkge1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdEZpbHRlclRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKVxuICAgICAgICAgICAgcHJvZHVjdEZpbHRlclRoLnNldEF0dHJpYnV0ZSgnaWQnLCBgcHJvZHVjdC10YWJsZS1maWx0ZXItbWFzdGVyLWdyb3VwLSR7bWFzdGVyR3JvdXBOYW1lfWApXG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0SXRlbVRycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZS1wcm9kdWN0LWl0ZW0tdHInKVxuICAgICAgICAgICAgcHJvZHVjdEZpbHRlclRoLmNsYXNzTGlzdC5hZGQoJ3B4LTYnLCAncHktMycpXG4gICAgICAgICAgICBwcm9kdWN0RmlsdGVyVGguc2V0QXR0cmlidXRlKCdzY29wZScsICdjb2wnKVxuICAgICAgICAgICAgcHJvZHVjdEZpbHRlclRoLmlubmVySFRNTCA9IG1hc3Rlckdyb3VwTmFtZS5yZXBsYWNlKC9fL2csICcgJylcbiAgICAgICAgICAgIHJlZmVyZW5jZVRoLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHByb2R1Y3RGaWx0ZXJUaCwgcmVmZXJlbmNlVGgubmV4dFNpYmxpbmcpXG5cbiAgICAgICAgICAgIHByb2R1Y3RJdGVtVHJzLmZvckVhY2goKHByb2R1Y3RJdGVtOiBIVE1MVGFibGVSb3dFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVmZXJlbmNlVGQgPSBwcm9kdWN0SXRlbS5jZWxsc1s0XVxuICAgICAgICAgICAgICAgIGNvbnN0IHByb2R1Y3ROYW1lID0gcHJvZHVjdEl0ZW0uY2VsbHNbMl0uaW5uZXJUZXh0XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZHVjdEZpbHRlck5hbWUgPSBwcm9kdWN0TWdHR2xvYmFsW3Byb2R1Y3ROYW1lXVttYXN0ZXJHcm91cE5hbWVdIHx8ICctJ1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RGaWx0ZXJUZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJylcbiAgICAgICAgICAgICAgICBwcm9kdWN0RmlsdGVyVGQuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICAgICAgICAnaWQnLFxuICAgICAgICAgICAgICAgICAgICBgcHJvZHVjdC10YWJsZS1maWx0ZXItJHttYXN0ZXJHcm91cE5hbWV9LSR7cHJvZHVjdEZpbHRlck5hbWUucmVwbGFjZShcbiAgICAgICAgICAgICAgICAgICAgICAgIC8gL2csXG4gICAgICAgICAgICAgICAgICAgICAgICAnXydcbiAgICAgICAgICAgICAgICAgICAgKX0tJHtwcm9kdWN0TmFtZS5yZXBsYWNlKC8gL2csICdfJyl9YFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBwcm9kdWN0RmlsdGVyVGQuY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAgICAgICAgICAgJ3AtNCcsXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0LWJhc2UnLFxuICAgICAgICAgICAgICAgICAgICAnZm9udC1ub3JtYWwnLFxuICAgICAgICAgICAgICAgICAgICAndGV4dC1ncmF5LTkwMCcsXG4gICAgICAgICAgICAgICAgICAgICd3aGl0ZXNwYWNlLW5vd3JhcCcsXG4gICAgICAgICAgICAgICAgICAgICdkYXJrOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIHByb2R1Y3RGaWx0ZXJUZC5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGwtM1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1iYXNlIGZvbnQtc2VtaWJvbGRcIj4ke3Byb2R1Y3RGaWx0ZXJOYW1lfTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgYFxuICAgICAgICAgICAgICAgIHJlZmVyZW5jZVRkLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHByb2R1Y3RGaWx0ZXJUZCwgcmVmZXJlbmNlVGQubmV4dFNpYmxpbmcpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyBmdW5jdGlvbiB0byBkaXNwbGF5IHByb2R1Y3QgbWFzdGVyIGdyb3VwIGluIHByb2R1Y3QgdGFibGVcbmNvbnN0IGNoZWNrYm94RmlsdGVyUHJvZHVjdE1hc3Rlckdyb3VwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0cy1maWx0ZXItcHJvZHVjdC1tYXN0ZXItZ3JvdXAtY2hlY2tib3gnKVxuY2hlY2tib3hGaWx0ZXJQcm9kdWN0TWFzdGVyR3JvdXBzLmZvckVhY2goKGNoZWNrYm94KSA9PiB7XG4gICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcbiAgICAgICAgY29uc3QgbWFzdGVyR3JvdXBOYW1lID0gY2hlY2tib3guZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldC1ncm91cC1uYW1lJylcbiAgICAgICAgY29uc3QgcHJvZHVjdE1nRyA9IEpTT04ucGFyc2UoY2hlY2tib3guZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldC1wcm9kdWN0LW1nLWcnKSlcbiAgICAgICAgY29uc3QgcmVmZXJlbmNlVGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC10YWJsZS10aC1wcm9kdWN0LXR5cGUnKVxuICAgICAgICBjb25zdCBwcm9kdWN0SXRlbVRycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZS1wcm9kdWN0LWl0ZW0tdHInKVxuXG4gICAgICAgIGxldCBpc0FjdGl2ZSA9IChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS5jaGVja2VkXG4gICAgICAgIGNvbnN0IGdsb2JhbEZpbHRlck1hc3Rlckdyb3VwID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdnbG9iYWxGaWx0ZXJNYXN0ZXJHcm91cCcpKVxuXG4gICAgICAgIGlmIChpc0FjdGl2ZSkge1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyTWFzdGVyR3JvdXA6IHN0cmluZ1tdID0gW11cbiAgICAgICAgICAgIGZpbHRlck1hc3Rlckdyb3VwLnB1c2gobWFzdGVyR3JvdXBOYW1lKVxuICAgICAgICAgICAgaWYgKGdsb2JhbEZpbHRlck1hc3Rlckdyb3VwKSB7XG4gICAgICAgICAgICAgICAgZ2xvYmFsRmlsdGVyTWFzdGVyR3JvdXAuZm9yRWFjaCgoZWxlbWVudDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZmlsdGVyTWFzdGVyR3JvdXAuaW5jbHVkZXMoZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlck1hc3Rlckdyb3VwLnB1c2goZWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdnbG9iYWxGaWx0ZXJNYXN0ZXJHcm91cCcsIEpTT04uc3RyaW5naWZ5KGZpbHRlck1hc3Rlckdyb3VwKSlcbiAgICAgICAgICAgIGNvbnN0IGlzR3JvdXBFeGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNwcm9kdWN0LXRhYmxlLWZpbHRlci1tYXN0ZXItZ3JvdXAtJHttYXN0ZXJHcm91cE5hbWV9YClcbiAgICAgICAgICAgIGlmICghaXNHcm91cEV4aXN0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZHVjdEZpbHRlclRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKVxuICAgICAgICAgICAgICAgIHByb2R1Y3RGaWx0ZXJUaC5zZXRBdHRyaWJ1dGUoJ2lkJywgYHByb2R1Y3QtdGFibGUtZmlsdGVyLW1hc3Rlci1ncm91cC0ke21hc3Rlckdyb3VwTmFtZX1gKVxuICAgICAgICAgICAgICAgIHByb2R1Y3RGaWx0ZXJUaC5jbGFzc0xpc3QuYWRkKCdweC02JywgJ3B5LTMnKVxuICAgICAgICAgICAgICAgIHByb2R1Y3RGaWx0ZXJUaC5zZXRBdHRyaWJ1dGUoJ3Njb3BlJywgJ2NvbCcpXG4gICAgICAgICAgICAgICAgcHJvZHVjdEZpbHRlclRoLmlubmVySFRNTCA9IG1hc3Rlckdyb3VwTmFtZS5yZXBsYWNlKC9fL2csICcgJylcbiAgICAgICAgICAgICAgICByZWZlcmVuY2VUaC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShwcm9kdWN0RmlsdGVyVGgsIHJlZmVyZW5jZVRoLm5leHRTaWJsaW5nKVxuICAgICAgICAgICAgICAgIHByb2R1Y3RJdGVtVHJzLmZvckVhY2goKHByb2R1Y3RJdGVtOiBIVE1MVGFibGVSb3dFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVyZW5jZVRkID0gcHJvZHVjdEl0ZW0uY2VsbHNbNF1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvZHVjdE5hbWUgPSBwcm9kdWN0SXRlbS5jZWxsc1syXS5pbm5lclRleHRcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9kdWN0RmlsdGVyTmFtZSA9IHByb2R1Y3RNZ0dbcHJvZHVjdE5hbWVdW21hc3Rlckdyb3VwTmFtZV0gfHwgJy0nXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RGaWx0ZXJUZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJylcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdEZpbHRlclRkLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICdpZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBgcHJvZHVjdC10YWJsZS1maWx0ZXItJHttYXN0ZXJHcm91cE5hbWV9LSR7cHJvZHVjdEZpbHRlck5hbWUucmVwbGFjZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvIC9nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdfJ1xuICAgICAgICAgICAgICAgICAgICAgICAgKX0tJHtwcm9kdWN0TmFtZS5yZXBsYWNlKC8gL2csICdfJyl9YFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RGaWx0ZXJUZC5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3AtNCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAndGV4dC1iYXNlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdmb250LW5vcm1hbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAndGV4dC1ncmF5LTkwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnd2hpdGVzcGFjZS1ub3dyYXAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2Rhcms6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0RmlsdGVyVGQuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBsLTNcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtYmFzZSBmb250LXNlbWlib2xkXCI+JHtwcm9kdWN0RmlsdGVyTmFtZX08L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICAgICAgcmVmZXJlbmNlVGQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocHJvZHVjdEZpbHRlclRkLCByZWZlcmVuY2VUZC5uZXh0U2libGluZylcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghaXNBY3RpdmUpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gZ2xvYmFsRmlsdGVyTWFzdGVyR3JvdXAuaW5kZXhPZihtYXN0ZXJHcm91cE5hbWUpXG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgZ2xvYmFsRmlsdGVyTWFzdGVyR3JvdXAuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnZ2xvYmFsRmlsdGVyTWFzdGVyR3JvdXAnLCBKU09OLnN0cmluZ2lmeShnbG9iYWxGaWx0ZXJNYXN0ZXJHcm91cCkpXG4gICAgICAgICAgICBjb25zdCBpc01hc3Rlckdyb3VwRXhpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcHJvZHVjdC10YWJsZS1maWx0ZXItbWFzdGVyLWdyb3VwLSR7bWFzdGVyR3JvdXBOYW1lfWApXG4gICAgICAgICAgICBpZiAoaXNNYXN0ZXJHcm91cEV4aXN0KSB7XG4gICAgICAgICAgICAgICAgaXNNYXN0ZXJHcm91cEV4aXN0LnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgcHJvZHVjdEl0ZW1UcnMuZm9yRWFjaCgocHJvZHVjdEl0ZW06IEhUTUxUYWJsZVJvd0VsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvZHVjdE5hbWUgPSBwcm9kdWN0SXRlbS5jZWxsc1syXS5pbm5lclRleHRcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvZHVjdEZpbHRlck5hbWUgPSBwcm9kdWN0TWdHW3Byb2R1Y3ROYW1lXVttYXN0ZXJHcm91cE5hbWVdIHx8ICctJ1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpc1Byb2R1Y3RGaWx0ZXJFeGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgICAgICAgICBgI3Byb2R1Y3QtdGFibGUtZmlsdGVyLSR7bWFzdGVyR3JvdXBOYW1lfS0ke3Byb2R1Y3RGaWx0ZXJOYW1lLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyAvZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXydcbiAgICAgICAgICAgICAgICAgICAgICAgICl9LSR7cHJvZHVjdE5hbWUucmVwbGFjZSgvIC9nLCAnXycpfWBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNQcm9kdWN0RmlsdGVyRXhpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUHJvZHVjdEZpbHRlckV4aXN0LnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbn0pXG5cbmNvbnN0ICRyZXF1ZXN0U2hhcmVNb2RhbEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JlcXVlc3Qtc2hhcmUtcHJvZHVjdC1tb2RhbCcpXG5jb25zdCAkc2hpcE1vZGFsRWxlbWVudDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2hpcC1wcm9kdWN0LW1vZGFsJylcbmNvbnN0ICRhc3NpZ25Nb2RhbEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Fzc2lnbi1wcm9kdWN0LW1vZGFsJylcbmNvbnN0ICRhZGRQcm9kdWN0TW9kYWxFbGVtZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtcHJvZHVjdC1tb2RhbCcpXG5jb25zdCAkdmlld1Byb2R1Y3RNb2RhbEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ZpZXctcHJvZHVjdC1tb2RhbCcpXG5jb25zdCAkYWRqdXN0UHJvZHVjdE1vZGFsRWxlbWVudDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRqdXN0LXByb2R1Y3QtbW9kYWwnKVxuY29uc3QgJGVkaXRQcm9kdWN0TW9kYWxFbGVtZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0UHJvZHVjdE1vZGFsJylcbmNvbnN0ICRldmVudFByb2R1Y3RNb2RhbEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2V2ZW50LXByb2R1Y3QtbW9kYWwnKVxuXG5jb25zdCBtb2RhbE9wdGlvbnM6IE1vZGFsT3B0aW9ucyA9IHtcbiAgICBwbGFjZW1lbnQ6ICdib3R0b20tcmlnaHQnLFxuICAgIGJhY2tkcm9wOiAnZHluYW1pYycsXG4gICAgYmFja2Ryb3BDbGFzc2VzOiAnYmctZ3JheS05MDAgYmctb3BhY2l0eS01MCBkYXJrOmJnLW9wYWNpdHktODAgZml4ZWQgaW5zZXQtMCB6LTQwJyxcbiAgICBjbG9zYWJsZTogdHJ1ZSxcbiAgICBvbkhpZGU6ICgpID0+IHtcbiAgICAgICAgY29uc3QgcHJvZHVjdCA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UucHJvZHVjdClcbiAgICAgICAgY29uc3QgbXN0ckdyb3Vwc0VudHJpZXMgPSBPYmplY3QuZW50cmllcyhwcm9kdWN0Lm1zdHJfZ3JvdXBzX2dyb3VwcylcblxuICAgICAgICBtc3RyR3JvdXBzRW50cmllcy5mb3JFYWNoKChba2V5LCB2YWx1ZV06IFtzdHJpbmcsIHN0cmluZ10pID0+IHtcbiAgICAgICAgICAgIGRlbGV0ZVNoaXBBc3NpZ25CdXR0b24odmFsdWUucmVwbGFjZSgvXFxzL2csICdfJyksIGtleSlcbiAgICAgICAgfSlcbiAgICAgICAgY2xlYXJQcm9kdWN0R3JvdXBDb250YWluZXIoKVxuICAgIH0sXG4gICAgb25TaG93OiAoKSA9PiB7fSxcbiAgICBvblRvZ2dsZTogKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnbW9kYWwgaGFzIGJlZW4gdG9nZ2xlZCcpXG4gICAgfSxcbn1cblxuY29uc3QgYWRqdXN0TW9kYWxPcHRpb25zOiBNb2RhbE9wdGlvbnMgPSB7XG4gICAgcGxhY2VtZW50OiAnYm90dG9tLXJpZ2h0JyxcbiAgICBiYWNrZHJvcDogJ2R5bmFtaWMnLFxuICAgIGJhY2tkcm9wQ2xhc3NlczogJ2JnLWdyYXktOTAwIGJnLW9wYWNpdHktNTAgZGFyazpiZy1vcGFjaXR5LTgwIGZpeGVkIGluc2V0LTAgei00MCcsXG4gICAgY2xvc2FibGU6IHRydWUsXG4gICAgb25IaWRlOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2R1Y3QgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLnByb2R1Y3QpXG4gICAgICAgIGNvbnN0IG1zdHJHcm91cHNFbnRyaWVzID0gT2JqZWN0LmVudHJpZXMocHJvZHVjdC5tc3RyX2dyb3Vwc19ncm91cHMpXG5cbiAgICAgICAgbXN0ckdyb3Vwc0VudHJpZXMuZm9yRWFjaCgoW2tleSwgdmFsdWVdOiBbc3RyaW5nLCBzdHJpbmddKSA9PiB7XG4gICAgICAgICAgICBkZWxldGVBZGp1c3RDb250YWluZXIodmFsdWUucmVwbGFjZSgvXFxzL2csICdfJyksIGtleSlcbiAgICAgICAgfSlcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSgncHJvZHVjdEluV2FyZWhvdXNlcycpXG4gICAgfSxcbiAgICBvblNob3c6ICgpID0+IHt9LFxuICAgIG9uVG9nZ2xlOiAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdtb2RhbCBoYXMgYmVlbiB0b2dnbGVkJylcbiAgICB9LFxufVxuXG5jb25zdCBtb2RhbFNoaXBBc3NpZ25PcHRpb25zOiBNb2RhbE9wdGlvbnMgPSB7XG4gICAgcGxhY2VtZW50OiAnYm90dG9tLXJpZ2h0JyxcbiAgICBiYWNrZHJvcDogJ2R5bmFtaWMnLFxuICAgIGJhY2tkcm9wQ2xhc3NlczogJ2JnLWdyYXktOTAwIGJnLW9wYWNpdHktNTAgZGFyazpiZy1vcGFjaXR5LTgwIGZpeGVkIGluc2V0LTAgei01MScsXG4gICAgY2xvc2FibGU6IHRydWUsXG4gICAgb25IaWRlOiAoKSA9PiB7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ3Byb2R1Y3QnKVxuICAgIH0sXG4gICAgb25TaG93OiAoKSA9PiB7fSxcbiAgICBvblRvZ2dsZTogKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnbW9kYWwgaGFzIGJlZW4gdG9nZ2xlZCcpXG4gICAgfSxcbn1cblxuY29uc3QgZXZlbnRNb2RhbE9wdGlvbnM6IE1vZGFsT3B0aW9ucyA9IHtcbiAgICBwbGFjZW1lbnQ6ICdib3R0b20tcmlnaHQnLFxuICAgIGJhY2tkcm9wOiAnZHluYW1pYycsXG4gICAgYmFja2Ryb3BDbGFzc2VzOiAnYmctZ3JheS05MDAgYmctb3BhY2l0eS01MCBkYXJrOmJnLW9wYWNpdHktODAgZml4ZWQgaW5zZXQtMCB6LTUxJyxcbiAgICBjbG9zYWJsZTogdHJ1ZSxcbiAgICBvbkhpZGU6ICgpID0+IHtcbiAgICAgICAgY29uc3QgcHJvZHVjdCA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UucHJvZHVjdClcbiAgICAgICAgY29uc3QgbXN0ckdyb3Vwc0VudHJpZXMgPSBPYmplY3QuZW50cmllcyhwcm9kdWN0Lm1zdHJfZ3JvdXBzX2dyb3VwcylcblxuICAgICAgICBtc3RyR3JvdXBzRW50cmllcy5mb3JFYWNoKChba2V5LCB2YWx1ZV06IFtzdHJpbmcsIHN0cmluZ10pID0+IHtcbiAgICAgICAgICAgIGRlbGV0ZVNoaXBBc3NpZ25CdXR0b24odmFsdWUucmVwbGFjZSgvXFxzL2csICdfJyksIGtleSlcbiAgICAgICAgfSlcbiAgICAgICAgY2xlYXJQcm9kdWN0R3JvdXBDb250YWluZXIoKVxuICAgIH0sXG4gICAgb25TaG93OiAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdtb2RhbCBoYXMgYmVlbiBzaG93bicpXG4gICAgfSxcbiAgICBvblRvZ2dsZTogKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnbW9kYWwgaGFzIGJlZW4gdG9nZ2xlZCcpXG4gICAgfSxcbn1cblxuY29uc3QgYWRkTW9kYWw6IE1vZGFsSW50ZXJmYWNlID0gbmV3IE1vZGFsKCRhZGRQcm9kdWN0TW9kYWxFbGVtZW50LCBtb2RhbE9wdGlvbnMpXG5jb25zdCB2aWV3TW9kYWw6IE1vZGFsSW50ZXJmYWNlID0gbmV3IE1vZGFsKCR2aWV3UHJvZHVjdE1vZGFsRWxlbWVudCwgbW9kYWxPcHRpb25zKVxuY29uc3QgYWRqdXN0TW9kYWw6IE1vZGFsSW50ZXJmYWNlID0gbmV3IE1vZGFsKCRhZGp1c3RQcm9kdWN0TW9kYWxFbGVtZW50LCBhZGp1c3RNb2RhbE9wdGlvbnMpXG5jb25zdCBlZGl0TW9kYWw6IE1vZGFsSW50ZXJmYWNlID0gbmV3IE1vZGFsKCRlZGl0UHJvZHVjdE1vZGFsRWxlbWVudCwgbW9kYWxPcHRpb25zKVxuY29uc3QgcmVxdWVzdFNoYXJlTW9kYWw6IE1vZGFsSW50ZXJmYWNlID0gbmV3IE1vZGFsKCRyZXF1ZXN0U2hhcmVNb2RhbEVsZW1lbnQsIG1vZGFsU2hpcEFzc2lnbk9wdGlvbnMpXG5jb25zdCBzaGlwTW9kYWw6IE1vZGFsSW50ZXJmYWNlID0gbmV3IE1vZGFsKCRzaGlwTW9kYWxFbGVtZW50LCBtb2RhbFNoaXBBc3NpZ25PcHRpb25zKVxuY29uc3QgYXNzaWduTW9kYWw6IE1vZGFsSW50ZXJmYWNlID0gbmV3IE1vZGFsKCRhc3NpZ25Nb2RhbEVsZW1lbnQsIG1vZGFsU2hpcEFzc2lnbk9wdGlvbnMpXG5jb25zdCBldmVudE1vZGFsOiBNb2RhbEludGVyZmFjZSA9IG5ldyBNb2RhbCgkZXZlbnRQcm9kdWN0TW9kYWxFbGVtZW50LCBtb2RhbFNoaXBBc3NpZ25PcHRpb25zKVxuXG5jb25zdCBjbG9zaW5nQWRkTW9kYWxCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXByb2R1Y3QtbW9kYWwtY2xvc2UtYnRuJylcbmNsb3NpbmdBZGRNb2RhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBhZGRNb2RhbC5oaWRlKClcbn0pXG5jb25zdCBjbG9zaW5nQWRqdXN0TW9kYWxCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRqdXN0LXByb2R1Y3QtbW9kYWwtY2xvc2UtYnRuJylcbmNsb3NpbmdBZGp1c3RNb2RhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBhZGp1c3RNb2RhbC5oaWRlKClcbn0pXG5jb25zdCBjbG9zaW5nRWRpdE1vZGFsQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXQtcHJvZHVjdC1tb2RhbC1jbG9zZS1idG4nKVxuY2xvc2luZ0VkaXRNb2RhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBlZGl0TW9kYWwuaGlkZSgpXG59KVxuY29uc3QgY2xvc2luZ1ZpZXdNb2RhbEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3LXByb2R1Y3QtbW9kYWwtY2xvc2UtYnRuJylcbmNsb3NpbmdWaWV3TW9kYWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgdmlld01vZGFsLmhpZGUoKVxufSlcbmNvbnN0IGNsb3NpbmdFdmVudE1vZGFsQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V2ZW50LXByb2R1Y3QtbW9kYWwtY2xvc2UtYnRuJylcbmNsb3NpbmdFdmVudE1vZGFsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGV2ZW50TW9kYWwuaGlkZSgpXG59KVxuXG5jb25zdCAkYnV0dG9uRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdC1lZGl0LWJ1dHRvbicpXG4kYnV0dG9uRWxlbWVudHMuZm9yRWFjaCgoZSkgPT5cbiAgICBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBlZGl0UHJvZHVjdChKU09OLnBhcnNlKGUuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpKSlcbiAgICB9KVxuKVxuXG5jb25zdCAkYWRkQnV0dG9uRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdC1hZGQtYnV0dG9uJylcbiRhZGRCdXR0b25FbGVtZW50cy5mb3JFYWNoKChlKSA9PlxuICAgIGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGdyb3VwcyA9IEpTT04ucGFyc2UoZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0LWdyb3VwcycpKVxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdncm91cHMnLCBKU09OLnN0cmluZ2lmeShncm91cHMpKVxuICAgICAgICBhZGRQcm9kdWN0KGdyb3VwcylcbiAgICB9KVxuKVxuXG4vLyBwaWNrIGRhdGUgcmFuZ2VcbmNvbnN0IHsgRGF0ZVRpbWUgfSA9IGVhc2VwaWNrXG5mdW5jdGlvbiBmb3JtYXREYXRlKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKClcbiAgICBjb25zdCBtb250aCA9IChkYXRlLmdldE1vbnRoKCkgKyAxKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJylcbiAgICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJylcbiAgICByZXR1cm4gYCR7eWVhcn0tJHttb250aH0tJHtkYXl9YFxufVxuXG5mdW5jdGlvbiBnZXRGaXJzdEFuZExhc3REYXRlKCkge1xuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKVxuICAgIGNvbnN0IGZpZnRoRGF5QmVmb3JlID0gbmV3IERhdGUodG9kYXkpXG4gICAgZmlmdGhEYXlCZWZvcmUuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSA1KVxuICAgIGNvbnN0IGZpZnRoRGF5QWZ0ZXIgPSBuZXcgRGF0ZSh0b2RheSlcbiAgICBmaWZ0aERheUFmdGVyLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpICsgNilcbiAgICByZXR1cm4gW2Zvcm1hdERhdGUoZmlmdGhEYXlCZWZvcmUpLCBmb3JtYXREYXRlKGZpZnRoRGF5QWZ0ZXIpXVxufVxuXG5jb25zdCBib29rZWREYXRlcyA9IFtnZXRGaXJzdEFuZExhc3REYXRlKCldLm1hcCgoZCkgPT4ge1xuICAgIGlmIChkIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZShkWzBdKVxuICAgICAgICBjb25zdCBlbmQgPSBuZXcgRGF0ZShkWzFdKVxuICAgICAgICByZXR1cm4gW3N0YXJ0LCBlbmRdXG4gICAgfVxuICAgIHJldHVybiBuZXcgRGF0ZVRpbWUoZCwgJ1lZWVktTU0tREQnKVxufSlcblxuXG5jb25zdCBEQVRBX0ZST01fQkUgPSB7XG4gICAgJzIwMjMtMDktMDMnOiAnMjUnLFxuICAgICcyMDIzLTA5LTA0JzogJzI2JyxcbiAgICAnMjAyMy0wOS0wNSc6ICcyNycsXG4gICAgJzIwMjMtMDktMDYnOiAnMjgnLFxuICAgICcyMDIzLTA5LTA3JzogJzI5JyxcbiAgICAnMjAyMy0wOS0xMSc6ICcyOCcsXG59XG5cbmNvbnN0IHBpY2tlciA9IG5ldyBlYXNlcGljay5jcmVhdGUoe1xuICAgIGVsZW1lbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRlcGlja2VyJyksXG4gICAgY3NzOiBbXG4gICAgICAgICdodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL0BlYXNlcGljay9idW5kbGVAMS4yLjEvZGlzdC9pbmRleC5jc3MnLFxuICAgICAgICAnaHR0cHM6Ly9lYXNlcGljay5jb20vY3NzL2RlbW9fcHJpY2VzLmNzcycsXG4gICAgXSxcbiAgICBhdXRvQXBwbHk6IHRydWUsXG4gICAgaW5saW5lOiB0cnVlLFxuICAgIHBsdWdpbnM6IFsnTG9ja1BsdWdpbiddLFxuICAgIExvY2tQbHVnaW46IHsgICAgICAgIFxuICAgICAgICBmaWx0ZXIoZGF0ZTogYW55KSB7ICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGRhdGUuaW5BcnJheShib29rZWREYXRlcywgJ1spJyk7XG4gICAgICAgIH1cbiAgICB9LCAgICBcblxuICAgIHNldHVwKHBpY2tlcjogYW55KSB7XG4gICAgICAgIGNvbnN0IHJhbmRvbUludCA9IChtaW46IG51bWJlciwgbWF4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcHJpY2VzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG5cbiAgICAgICAgT2JqZWN0LmVudHJpZXMoREFUQV9GUk9NX0JFKS5mb3JFYWNoKChbZGF0ZSwgcHJpY2VdKSA9PiB7XG4gICAgICAgICAgICBwcmljZXNbZGF0ZV0gPSBwcmljZTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBwaWNrZXIub24oJ3ZpZXcnLCAoZXZ0OiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgdmlldywgZGF0ZSwgdGFyZ2V0IH0gPSBldnQuZGV0YWlsOyAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgZCA9IGRhdGUgPyBkYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpIDogbnVsbDtcbiAgICAgICAgICAgIGNvbnN0IG1vbnRoID0gZGF0ZSA/IGRhdGUuZm9ybWF0KCdNTScpIDogbnVsbDtcblxuICAgICAgICAgICAgaWYgKHZpZXcgPT09ICdDYWxlbmRhckRheScgJiYgcHJpY2VzW2RdKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3BhbiA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKCcuZGF5LXByaWNlJykgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgIHNwYW4uY2xhc3NOYW1lID0gJ2RheS1wcmljZSc7XG4gICAgICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSBwcmljZXNbZF07XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmFwcGVuZChzcGFuKTtcbiAgICAgICAgICAgIH0gICAgICBcbiAgICAgICAgICAgIC8vR0VUIERBVEEgQU5EIEFNT1VOVCBGT1JNIEJFXG4gICAgICAgIH0pOyAgICAgICAgXG4gICAgfVxufSk7XG5cblxuLy8gc2VhcmNoIGZsb3dcbmNvbnN0IHNlYXJjaElucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RhYmxlLXNlYXJjaC1wcm9kdWN0cycpXG5jb25zdCBzZWFyY2hJbnB1dEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YWJsZS1zZWFyY2gtcHJvZHVjdC1idXR0b24nKVxuaWYgKHNlYXJjaElucHV0QnV0dG9uICYmIHNlYXJjaElucHV0KSB7XG4gICAgc2VhcmNoSW5wdXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpXG4gICAgICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KCdxJywgc2VhcmNoSW5wdXQudmFsdWUpXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYCR7dXJsLmhyZWZ9YFxuICAgIH0pXG59XG5jb25zdCBkZWxldGVCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRlbGV0ZS1wcm9kdWN0LWJ0bicpXG5cbmRlbGV0ZUJ1dHRvbnMuZm9yRWFjaCgoZSkgPT4ge1xuICAgIGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmIChjb25maXJtKCdBcmUgc3VyZT8nKSkge1xuICAgICAgICAgICAgbGV0IGlkID0gZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZHVjdC1pZCcpXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvcHJvZHVjdC9kZWxldGUvJHtpZH1gLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxufSlcblxuZnVuY3Rpb24gY29udmVydERhdGUoZGF0ZTogc3RyaW5nKSB7XG4gICAgY29uc3QgaW5wdXREYXRlID0gZGF0ZS5zcGxpdCgnVCcpWzBdXG4gICAgY29uc3QgZGF0ZVBhcnRzID0gaW5wdXREYXRlLnNwbGl0KCctJylcbiAgICBjb25zdCB5ZWFyID0gZGF0ZVBhcnRzWzBdXG4gICAgY29uc3QgbW9udGggPSBkYXRlUGFydHNbMV1cbiAgICBjb25zdCBkYXkgPSBkYXRlUGFydHNbMl1cbiAgICByZXR1cm4gYCR7bW9udGh9LyR7ZGF5fS8ke3llYXJ9YFxufVxuXG5mdW5jdGlvbiBhZGRQcm9kdWN0KGdyb3VwczogSVByb2R1Y3RNYXN0ZXJHcm91cEdyb3VwKSB7XG4gICAgYWRkTW9kYWwuc2hvdygpXG4gICAgY29uc3QgcHJvZHVjdE1hc3Rlckdyb3VwQWRkU2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICcjcHJvZHVjdC1tYXN0ZXItZ3JvdXAtYWRkLWFkZC1wcm9kdWN0LTEnXG4gICAgKVxuICAgIGNvbnN0IG9wdGlvbnMgPSBwcm9kdWN0TWFzdGVyR3JvdXBBZGRTZWxlY3QucXVlcnlTZWxlY3RvckFsbCgnb3B0aW9uJylcblxuICAgIHByb2R1Y3RNYXN0ZXJHcm91cEFkZFNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgIG9wdGlvbnMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUudGV4dENvbnRlbnQgPT09IHByb2R1Y3RNYXN0ZXJHcm91cEFkZFNlbGVjdC5vcHRpb25zW3Byb2R1Y3RNYXN0ZXJHcm91cEFkZFNlbGVjdC5zZWxlY3RlZEluZGV4XS50ZXh0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBTZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ncm91cC1hZGQtaXRlbS0xJylcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25DYXRlZ29yeSA9XG4gICAgICAgICAgICAgICAgICAgIGdyb3Vwc1twcm9kdWN0TWFzdGVyR3JvdXBBZGRTZWxlY3Qub3B0aW9uc1twcm9kdWN0TWFzdGVyR3JvdXBBZGRTZWxlY3Quc2VsZWN0ZWRJbmRleF0udGV4dF1cblxuICAgICAgICAgICAgICAgIGdyb3VwU2VsZWN0LmlubmVySFRNTCA9ICcnXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbkNhdGVnb3J5KSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbkNhdGVnb3J5LmZvckVhY2goKGdyb3VwOiB7IGdyb3VwX25hbWU6IHN0cmluZzsgZ3JvdXBfaWQ6IG51bWJlciB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdG9yZVNlbGVjdE9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9yZVNlbGVjdE9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgZ3JvdXAuZ3JvdXBfaWQudG9TdHJpbmcoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlU2VsZWN0T3B0aW9uLnRleHRDb250ZW50ID0gZ3JvdXAuZ3JvdXBfbmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBTZWxlY3QuYXBwZW5kQ2hpbGQoc3RvcmVTZWxlY3RPcHRpb24pXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGVkaXRQcm9kdWN0KHByb2R1Y3Q6IElQcm9kdWN0KSB7XG4gICAgY29uc29sZS5sb2coJyBwcm9kdWN0JywgcHJvZHVjdClcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdwcm9kdWN0JywgSlNPTi5zdHJpbmdpZnkocHJvZHVjdCkpXG5cbiAgICBjb25zdCBpbWc6IEhUTUxJbWFnZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LXNob3ctaW1hZ2UnKVxuICAgIGNvbnN0IGZ1bGxJbWFnZUFuY2hvciA9IGltZy5jbG9zZXN0KCcucHJvZHVjdC1mdWxsLWltYWdlLWFuY2hvcicpXG4gICAgZnVsbEltYWdlQW5jaG9yLnNldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtcHJvZHVjdC1pZCcsIHByb2R1Y3QuaWQudG9TdHJpbmcoKSlcbiAgICBwcm9kdWN0LmltYWdlLmxlbmd0aCA+IDEwMCA/IChpbWcuc3JjID0gYGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCwgJHtwcm9kdWN0LmltYWdlfWApIDogKGltZy5zcmMgPSBkZWZhdWx0QnJhbmRJbWFnZSlcbiAgICBsZXQgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LW5hbWUnKVxuICAgIGlucHV0LnZhbHVlID0gcHJvZHVjdC5uYW1lXG4gICAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LWlkJylcbiAgICBpbnB1dC52YWx1ZSA9IHByb2R1Y3QuaWQudG9TdHJpbmcoKVxuICAgIC8vIGEgbG9vcCB0aGF0IGFkZHMgYWRkaXRpb25hbCBmaWVsZHNcbiAgICBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWVkaXQtY3VycmVuY3knKVxuICAgIHByb2R1Y3QuY3VycmVuY3kgPyAoaW5wdXQudmFsdWUgPSBwcm9kdWN0LmN1cnJlbmN5KSA6IChpbnB1dC52YWx1ZSA9ICdDaG9vc2UgQ3VycmVuY3knKVxuICAgIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC1yZWd1bGFyX3ByaWNlJylcbiAgICBpbnB1dC52YWx1ZSA9IHByb2R1Y3QucmVndWxhcl9wcmljZS50b1N0cmluZygpXG4gICAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LXJldGFpbF9wcmljZScpXG4gICAgaW5wdXQudmFsdWUgPSBwcm9kdWN0LnJldGFpbF9wcmljZS50b1N0cmluZygpXG4gICAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LWRlc2NyaXB0aW9uJylcbiAgICBpbnB1dC52YWx1ZSA9IHByb2R1Y3QuZGVzY3JpcHRpb25cbiAgICAvLyBHZW5lcmFsIEluZm8gLT5cbiAgICBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWVkaXQtU0tVJylcbiAgICBpbnB1dC52YWx1ZSA9IHByb2R1Y3QuU0tVXG4gICAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LWxvd19zdG9ja19sZXZlbCcpXG4gICAgcHJvZHVjdC5sb3dfc3RvY2tfbGV2ZWwgPyAoaW5wdXQudmFsdWUgPSBwcm9kdWN0Lmxvd19zdG9ja19sZXZlbC50b1N0cmluZygpKSA6IChpbnB1dC52YWx1ZSA9ICcwJylcblxuICAgIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC1wcm9ncmFtX3llYXInKVxuICAgIHByb2R1Y3QucHJvZ3JhbV95ZWFyID8gKGlucHV0LnZhbHVlID0gcHJvZHVjdC5wcm9ncmFtX3llYXIudG9TdHJpbmcoKSkgOiAoaW5wdXQudmFsdWUgPSAnMCcpXG4gICAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LXBhY2thZ2VfcXR5JylcbiAgICBwcm9kdWN0LnBhY2thZ2VfcXR5ID8gKGlucHV0LnZhbHVlID0gcHJvZHVjdC5wYWNrYWdlX3F0eS50b1N0cmluZygpKSA6IChpbnB1dC52YWx1ZSA9ICcwJylcbiAgICBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWVkaXQtbnVtYl9vZl9pdGVtc19wZXJfY2FzZScpXG4gICAgcHJvZHVjdC5udW1iX29mX2l0ZW1zX3Blcl9jYXNlID8gKGlucHV0LnZhbHVlID0gcHJvZHVjdC5udW1iX29mX2l0ZW1zX3Blcl9jYXNlLnRvU3RyaW5nKCkpIDogKGlucHV0LnZhbHVlID0gJzAnKVxuICAgIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC1udW1iX29mX2Nhc2VzX3Blcl9vdXRlcl9jYXNlJylcbiAgICBwcm9kdWN0Lm51bWJfb2ZfY2FzZXNfcGVyX291dGVyX2Nhc2VcbiAgICAgICAgPyAoaW5wdXQudmFsdWUgPSBwcm9kdWN0Lm51bWJfb2ZfY2FzZXNfcGVyX291dGVyX2Nhc2UudG9TdHJpbmcoKSlcbiAgICAgICAgOiAoaW5wdXQudmFsdWUgPSAnMCcpXG4gICAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LWNvbW1lbnRzJylcbiAgICBwcm9kdWN0LmNvbW1lbnRzID8gKGlucHV0LnZhbHVlID0gcHJvZHVjdC5jb21tZW50cykgOiAoaW5wdXQudmFsdWUgPSAnTm8gY29tbWVudHMnKVxuICAgIC8vIHNoaXBwaW5nXG4gICAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LXdlaWdodCcpXG4gICAgcHJvZHVjdC53ZWlnaHQgPyAoaW5wdXQudmFsdWUgPSBwcm9kdWN0LndlaWdodC50b1N0cmluZygpKSA6IChpbnB1dC52YWx1ZSA9ICcwJylcbiAgICBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWVkaXQtbGVuZ3RoJylcbiAgICBwcm9kdWN0Lmxlbmd0aCA/IChpbnB1dC52YWx1ZSA9IHByb2R1Y3QubGVuZ3RoLnRvU3RyaW5nKCkpIDogKGlucHV0LnZhbHVlID0gJzAnKVxuICAgIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC13aWR0aCcpXG4gICAgcHJvZHVjdC53aWR0aCA/IChpbnB1dC52YWx1ZSA9IHByb2R1Y3Qud2lkdGgudG9TdHJpbmcoKSkgOiAoaW5wdXQudmFsdWUgPSAnMCcpXG4gICAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LWhlaWdodCcpXG4gICAgcHJvZHVjdC5oZWlnaHQgPyAoaW5wdXQudmFsdWUgPSBwcm9kdWN0LmhlaWdodC50b1N0cmluZygpKSA6IChpbnB1dC52YWx1ZSA9ICcwJylcbiAgICBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWVkaXQtbmV4dF91cmwnKVxuICAgIGlucHV0LnZhbHVlID0gd2luZG93LmxvY2F0aW9uLmhyZWZcblxuICAgIGNvbnN0IHByb2R1Y3RNYXN0ZXJHcm91cEVkaXRTZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJyNwcm9kdWN0LW1hc3Rlci1ncm91cC1lZGl0LWFkZC1wcm9kdWN0LTEnXG4gICAgKVxuICAgIGNvbnN0IG9wdGlvbnMgPSBwcm9kdWN0TWFzdGVyR3JvdXBFZGl0U2VsZWN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ29wdGlvbicpXG4gICAgY29uc3QgcHJvZHVjdE1hc3Rlckdyb3VwcyA9IE9iamVjdC5rZXlzKHByb2R1Y3QubXN0cl9ncnBzX2dycHNfbmFtZXNfaW5fcHJvZClcblxuICAgIGlmIChwcm9kdWN0TWFzdGVyR3JvdXBzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgcHJvZHVjdEdyb3Vwc0VkaXRTZWxlY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MU2VsZWN0RWxlbWVudD4oJy5wcm9kdWN0LWdyb3VwLWVkaXQtaXRlbScpXG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9kdWN0TWFzdGVyR3JvdXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RHcm91cHNFZGl0U2VsZWN0ID0gcHJvZHVjdEdyb3Vwc0VkaXRTZWxlY3RzW2ldXG5cbiAgICAgICAgICAgICAgICBwcm9kdWN0TWFzdGVyR3JvdXBFZGl0U2VsZWN0LnZhbHVlID0gcHJvZHVjdE1hc3Rlckdyb3Vwc1tpXVxuXG4gICAgICAgICAgICAgICAgcHJvZHVjdC5tc3RyX3Byb2RfZ3Jwc19wcm9kX2dycHNfbmFtZXNbcHJvZHVjdE1hc3Rlckdyb3Vwc1tpXV0uZm9yRWFjaChcbiAgICAgICAgICAgICAgICAgICAgKGdyb3VwOiB7IGdyb3VwX25hbWU6IHN0cmluZzsgZ3JvdXBfaWQ6IG51bWJlciB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdG9yZVNlbGVjdE9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9yZVNlbGVjdE9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgZ3JvdXAuZ3JvdXBfaWQudG9TdHJpbmcoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlU2VsZWN0T3B0aW9uLnRleHRDb250ZW50ID0gZ3JvdXAuZ3JvdXBfbmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdEdyb3Vwc0VkaXRTZWxlY3QuYXBwZW5kQ2hpbGQoc3RvcmVTZWxlY3RPcHRpb24pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogYWx3YXlzIHNlbGVjdCBmaXJzdCBvcHRpb25cbiAgICAgICAgICAgICAgICBwcm9kdWN0R3JvdXBzRWRpdFNlbGVjdC52YWx1ZSA9XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3QubXN0cl9ncnBzX2dycHNfbmFtZXNfaW5fcHJvZFtwcm9kdWN0TWFzdGVyR3JvdXBzW2ldXVswXS5ncm91cF9pZC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgcHJvZHVjdE1hc3Rlckdyb3VwRWRpdFNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUudGV4dENvbnRlbnQgPT09XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdE1hc3Rlckdyb3VwRWRpdFNlbGVjdC5vcHRpb25zW3Byb2R1Y3RNYXN0ZXJHcm91cEVkaXRTZWxlY3Quc2VsZWN0ZWRJbmRleF0udGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBTZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ncm91cC1lZGl0LWl0ZW0tMScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uQ2F0ZWdvcnkgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0Lm1zdHJfcHJvZF9ncnBzX3Byb2RfZ3Jwc19uYW1lc1tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RNYXN0ZXJHcm91cEVkaXRTZWxlY3Qub3B0aW9uc1twcm9kdWN0TWFzdGVyR3JvdXBFZGl0U2VsZWN0LnNlbGVjdGVkSW5kZXhdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwU2VsZWN0LmlubmVySFRNTCA9ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbkNhdGVnb3J5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbkNhdGVnb3J5LmZvckVhY2goKGdyb3VwOiB7IGdyb3VwX25hbWU6IHN0cmluZzsgZ3JvdXBfaWQ6IG51bWJlciB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdG9yZVNlbGVjdE9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9yZVNlbGVjdE9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgZ3JvdXAuZ3JvdXBfaWQudG9TdHJpbmcoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlU2VsZWN0T3B0aW9uLnRleHRDb250ZW50ID0gZ3JvdXAuZ3JvdXBfbmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBTZWxlY3QuYXBwZW5kQ2hpbGQoc3RvcmVTZWxlY3RPcHRpb24pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBpZiAocHJvZHVjdC5tc3RyX2dycHNfZ3Jwc19uYW1lc19pbl9wcm9kW3Byb2R1Y3RNYXN0ZXJHcm91cHNbaV1dLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCBwcm9kdWN0Lm1zdHJfZ3Jwc19ncnBzX25hbWVzX2luX3Byb2RbcHJvZHVjdE1hc3Rlckdyb3Vwc1tpXV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpZiBwcm9kdWN0JylcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZVByb2R1Y3RHcm91cEVkaXRJdGVtKG51bGwsIHByb2R1Y3RNYXN0ZXJHcm91cHNbaV0sIGopXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHByb2R1Y3QubXN0cl9ncnBzX2dycHNfbmFtZXNfaW5fcHJvZFtwcm9kdWN0TWFzdGVyR3JvdXBzW2ldXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBwcm9kdWN0Lm1zdHJfZ3Jwc19ncnBzX25hbWVzX2luX3Byb2RbcHJvZHVjdE1hc3Rlckdyb3Vwc1tpXV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlUHJvZHVjdEdyb3VwRWRpdEl0ZW0obnVsbCwgcHJvZHVjdE1hc3Rlckdyb3Vwc1tpXSwgailcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNyZWF0ZVByb2R1Y3RHcm91cEVkaXRJdGVtKG51bGwsIHByb2R1Y3RNYXN0ZXJHcm91cHNbaV0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlZGl0TW9kYWwuc2hvdygpXG5cbiAgICBwcm9kdWN0TWFzdGVyR3JvdXBFZGl0U2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgb3B0aW9ucy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgZS50ZXh0Q29udGVudCA9PT0gcHJvZHVjdE1hc3Rlckdyb3VwRWRpdFNlbGVjdC5vcHRpb25zW3Byb2R1Y3RNYXN0ZXJHcm91cEVkaXRTZWxlY3Quc2VsZWN0ZWRJbmRleF0udGV4dFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBTZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ncm91cC1lZGl0LWl0ZW0tMScpXG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uQ2F0ZWdvcnkgPVxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0Lm1zdHJfcHJvZF9ncnBzX3Byb2RfZ3Jwc19uYW1lc1tcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RNYXN0ZXJHcm91cEVkaXRTZWxlY3Qub3B0aW9uc1twcm9kdWN0TWFzdGVyR3JvdXBFZGl0U2VsZWN0LnNlbGVjdGVkSW5kZXhdLnRleHRcbiAgICAgICAgICAgICAgICAgICAgXVxuXG4gICAgICAgICAgICAgICAgZ3JvdXBTZWxlY3QuaW5uZXJIVE1MID0gJydcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9uQ2F0ZWdvcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uQ2F0ZWdvcnkuZm9yRWFjaCgoZ3JvdXA6IHsgZ3JvdXBfbmFtZTogc3RyaW5nOyBncm91cF9pZDogbnVtYmVyIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0b3JlU2VsZWN0T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJylcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlU2VsZWN0T3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBncm91cC5ncm91cF9pZC50b1N0cmluZygpKVxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmVTZWxlY3RPcHRpb24udGV4dENvbnRlbnQgPSBncm91cC5ncm91cF9uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cFNlbGVjdC5hcHBlbmRDaGlsZChzdG9yZVNlbGVjdE9wdGlvbilcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuY29uc3Qgdmlld1Byb2R1Y3RCdXR0b25FbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0LXZpZXctYnV0dG9uJylcbnZpZXdQcm9kdWN0QnV0dG9uRWxlbWVudHMuZm9yRWFjaCgoZSkgPT5cbiAgICBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBib29raW5nQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2R1Y3QtYm9va2luZy1idXR0b24nKVxuICAgICAgICBpZiAoYm9va2luZ0J1dHRvbikge1xuICAgICAgICAgICAgYm9va2luZ0J1dHRvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0JywgZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0JykpXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcHJvZHVjdCA9IEpTT04ucGFyc2UoZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0JykpXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3Byb2R1Y3QnLCBKU09OLnN0cmluZ2lmeShwcm9kdWN0KSlcbiAgICAgICAgY29uc3QgcHJvZEdyb3VwcyA9IE9iamVjdC5rZXlzKHByb2R1Y3QubXN0cl9ncm91cHNfZ3JvdXBzKVxuICAgICAgICBjb25zdCBldmVudENoZWNrYm94OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtc2hvdy1ldmVudHMtdG9nZ2xlLWJ0bicpXG4gICAgICAgIGNvbnN0IGlzRXZlbnQgPSBldmVudENoZWNrYm94LmNoZWNrZWRcblxuICAgICAgICBwcm9kR3JvdXBzLmZvckVhY2goKGdyb3VwTmFtZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGlzRXF1YWwgPSBmYWxzZVxuXG4gICAgICAgICAgICBjb25zdCBtc3RyR3JvdXBOYW1lID0gcHJvZHVjdC5tc3RyX2dyb3Vwc19ncm91cHNbZ3JvdXBOYW1lXVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ21zdHJHcm91cE5hbWUnLCBtc3RyR3JvdXBOYW1lKVxuXG4gICAgICAgICAgICBpZiAocHJvZHVjdC5jdXJyZW50X3VzZXJfZ3JvdXBzLmhhc093blByb3BlcnR5KG1zdHJHcm91cE5hbWUpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFVzZXJWYWx1ZSA9IHByb2R1Y3QuY3VycmVudF91c2VyX2dyb3Vwc1ttc3RyR3JvdXBOYW1lXVxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VXNlclZhbHVlLmluY2x1ZGVzKGdyb3VwTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNFcXVhbCA9IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobXN0ckdyb3VwTmFtZSAhPT0gJ0V2ZW50cycgfHwgaXNFdmVudCkge1xuICAgICAgICAgICAgICAgIGFkZFNoaXBBc3NpZ25TaGFyZUJ1dHRvbihpc0VxdWFsLCBtc3RyR3JvdXBOYW1lLCBncm91cE5hbWUsIHByb2R1Y3QpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgbGV0IGRpdjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC12aWV3LW5hbWUnKVxuICAgICAgICBkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5uYW1lXG4gICAgICAgIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXZpZXctaWQnKVxuICAgICAgICBkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5pZC50b1N0cmluZygpXG4gICAgICAgIGNvbnN0IGltZzogSFRNTEltYWdlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXZpZXctaW1hZ2UnKVxuICAgICAgICBjb25zdCBmdWxsSW1hZ2VBbmNob3IgPSBpbWcuY2xvc2VzdCgnLnByb2R1Y3QtZnVsbC1pbWFnZS1hbmNob3InKVxuICAgICAgICBmdWxsSW1hZ2VBbmNob3Iuc2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldC1wcm9kdWN0LWlkJywgcHJvZHVjdC5pZC50b1N0cmluZygpKVxuICAgICAgICBwcm9kdWN0LmltYWdlLmxlbmd0aCA+IDEwMFxuICAgICAgICAgICAgPyAoaW1nLnNyYyA9IGBkYXRhOmltYWdlL3BuZztiYXNlNjQsICR7cHJvZHVjdC5pbWFnZX1gKVxuICAgICAgICAgICAgOiAoaW1nLnNyYyA9IGRlZmF1bHRCcmFuZEltYWdlKVxuICAgICAgICBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC12aWV3LXJlZ3VsYXJfcHJpY2UnKVxuICAgICAgICBkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5yZWd1bGFyX3ByaWNlLnRvU3RyaW5nKClcbiAgICAgICAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtdmlldy1yZXRhaWxfcHJpY2UnKVxuICAgICAgICBkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5yZXRhaWxfcHJpY2UudG9TdHJpbmcoKVxuICAgICAgICBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC12aWV3LXdhcmVob3VzZS1xdHknKVxuICAgICAgICBkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC53YXJlaG91c2VfcHJvZHVjdF9xdHkudG9TdHJpbmcoKVxuICAgICAgICAvLyBHZW5lcmFsIEluZm8gLT5cbiAgICAgICAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtdmlldy1TS1UnKVxuICAgICAgICBkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5TS1VcbiAgICAgICAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtdmlldy1wYWNrYWdlX3F0eScpXG4gICAgICAgIHByb2R1Y3QucGFja2FnZV9xdHkgPyAoZGl2LmlubmVySFRNTCA9IHByb2R1Y3QucGFja2FnZV9xdHkudG9TdHJpbmcoKSkgOiAoZGl2LmlubmVySFRNTCA9ICcwJylcbiAgICAgICAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtdmlldy1udW1iX29mX2l0ZW1zX3Blcl9jYXNlJylcbiAgICAgICAgcHJvZHVjdC5udW1iX29mX2l0ZW1zX3Blcl9jYXNlXG4gICAgICAgICAgICA/IChkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5udW1iX29mX2l0ZW1zX3Blcl9jYXNlLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICA6IChkaXYuaW5uZXJIVE1MID0gJzAnKVxuICAgICAgICBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC12aWV3LW51bWJfb2ZfY2FzZXNfcGVyX291dGVyX2Nhc2UnKVxuICAgICAgICBwcm9kdWN0Lm51bWJfb2ZfY2FzZXNfcGVyX291dGVyX2Nhc2VcbiAgICAgICAgICAgID8gKGRpdi5pbm5lckhUTUwgPSBwcm9kdWN0Lm51bWJfb2ZfY2FzZXNfcGVyX291dGVyX2Nhc2UudG9TdHJpbmcoKSlcbiAgICAgICAgICAgIDogKGRpdi5pbm5lckhUTUwgPSAnMCcpXG4gICAgICAgIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXZpZXctY29tbWVudHMnKVxuICAgICAgICBwcm9kdWN0LmNvbW1lbnRzID8gKGRpdi5pbm5lckhUTUwgPSBwcm9kdWN0LmNvbW1lbnRzLnRvU3RyaW5nKCkpIDogKGRpdi5pbm5lckhUTUwgPSAnTm8gY29tbWVudHMnKVxuICAgICAgICBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC12aWV3LW5leHRfdXJsJylcbiAgICAgICAgZGl2LmlubmVySFRNTCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmXG4gICAgICAgIHZpZXdNb2RhbC5zaG93KClcbiAgICB9KVxuKVxuXG5jb25zdCBhZGp1c3RQcm9kdWN0QnV0dG9uRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdC1hZGp1c3QtYnV0dG9uJylcbmFkanVzdFByb2R1Y3RCdXR0b25FbGVtZW50cy5mb3JFYWNoKChlKSA9PlxuICAgIGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2R1Y3QgPSBKU09OLnBhcnNlKGUuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpKVxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdwcm9kdWN0JywgSlNPTi5zdHJpbmdpZnkocHJvZHVjdCkpXG4gICAgICAgIGNvbnN0IHByb2RHcm91cHMgPSBPYmplY3Qua2V5cyhwcm9kdWN0Lm1zdHJfZ3JvdXBzX2dyb3VwcylcblxuICAgICAgICBwcm9kR3JvdXBzLmZvckVhY2goKGdyb3VwTmFtZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGlzRXF1YWwgPSBmYWxzZVxuXG4gICAgICAgICAgICBjb25zdCBtc3RyR3JvdXBOYW1lID0gcHJvZHVjdC5tc3RyX2dyb3Vwc19ncm91cHNbZ3JvdXBOYW1lXVxuICAgICAgICAgICAgaWYgKHByb2R1Y3QuY3VycmVudF91c2VyX2dyb3Vwcy5oYXNPd25Qcm9wZXJ0eShtc3RyR3JvdXBOYW1lKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRVc2VyVmFsdWUgPSBwcm9kdWN0LmN1cnJlbnRfdXNlcl9ncm91cHNbbXN0ckdyb3VwTmFtZV1cbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFVzZXJWYWx1ZS5pbmNsdWRlcyhncm91cE5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzRXF1YWwgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3JlYXRlQWRqdXN0QWN0aW9uKGlzRXF1YWwsIG1zdHJHcm91cE5hbWUsIGdyb3VwTmFtZSwgcHJvZHVjdClcbiAgICAgICAgfSlcblxuICAgICAgICBsZXQgZGl2OiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWFkanVzdC1uYW1lJylcbiAgICAgICAgZGl2LmlubmVySFRNTCA9IHByb2R1Y3QubmFtZVxuICAgICAgICBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1hZGp1c3QtaWQnKVxuICAgICAgICBkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5pZC50b1N0cmluZygpXG4gICAgICAgIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWFkanVzdC1TS1UnKVxuICAgICAgICBkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5TS1VcbiAgICAgICAgY29uc3QgaW1nOiBIVE1MSW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtYWRqdXN0LWltYWdlJylcbiAgICAgICAgY29uc3QgZnVsbEltYWdlQW5jaG9yID0gaW1nLmNsb3Nlc3QoJy5wcm9kdWN0LWZ1bGwtaW1hZ2UtYW5jaG9yJylcbiAgICAgICAgZnVsbEltYWdlQW5jaG9yLnNldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtcHJvZHVjdC1pZCcsIHByb2R1Y3QuaWQudG9TdHJpbmcoKSlcbiAgICAgICAgcHJvZHVjdC5pbWFnZS5sZW5ndGggPiAxMDBcbiAgICAgICAgICAgID8gKGltZy5zcmMgPSBgZGF0YTppbWFnZS9wbmc7YmFzZTY0LCAke3Byb2R1Y3QuaW1hZ2V9YClcbiAgICAgICAgICAgIDogKGltZy5zcmMgPSBkZWZhdWx0QnJhbmRJbWFnZSlcbiAgICAgICAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtYWRqdXN0LW5leHRfdXJsJylcbiAgICAgICAgZGl2LmlubmVySFRNTCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmXG4gICAgICAgIGFkanVzdE1vZGFsLnNob3coKVxuICAgIH0pXG4pXG5cbi8vIGZ1bmN0aW9uIHRvIHJlcXVlc3Qgc2hhcmVcbmZ1bmN0aW9uIHJlcXVlc3RTaGFyZShwcm9kdWN0OiBJUHJvZHVjdCwgZ3JvdXA6IHN0cmluZykge1xuICAgIGNvbnN0IGltZzogSFRNTEltYWdlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXJlcXVlc3Qtc2hhcmUtaW1hZ2UnKVxuICAgIGNvbnN0IGZ1bGxJbWFnZUFuY2hvciA9IGltZy5jbG9zZXN0KCcucHJvZHVjdC1mdWxsLWltYWdlLWFuY2hvcicpXG4gICAgZnVsbEltYWdlQW5jaG9yLnNldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtcHJvZHVjdC1pZCcsIHByb2R1Y3QuaWQudG9TdHJpbmcoKSlcbiAgICBwcm9kdWN0LmltYWdlLmxlbmd0aCA+IDEwMCA/IChpbWcuc3JjID0gYGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCwgJHtwcm9kdWN0LmltYWdlfWApIDogKGltZy5zcmMgPSBkZWZhdWx0QnJhbmRJbWFnZSlcbiAgICBsZXQgZGl2OiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXJlcXVlc3Qtc2hhcmUtbmFtZScpXG4gICAgZGl2LmlubmVySFRNTCA9IHByb2R1Y3QubmFtZVxuICAgIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXJlcXVlc3Qtc2hhcmUtc2t1JylcbiAgICBkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5TS1VcbiAgICBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1yZXF1ZXN0LXNoYXJlLWF2YWlsYWJsZS1xdWFudGl0eScpXG4gICAgZGl2LmlubmVySFRNTCA9IHByb2R1Y3QuYXZhaWxhYmxlX3F1YW50aXR5W2dyb3VwLnJlcGxhY2UoJ18nLCAnICcpXS50b1N0cmluZygpXG4gICAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtcmVxdWVzdC1zaGFyZS1vd25lcicpXG4gICAgLy8gVE9ETyBjaGFuZ2UgdG8gc29tZXRoaW5nIG5vdCBoYXJkY29kZWQgaGVyZSBhbmQgaW4gcmVzdCBmdW5jc1xuICAgIGRpdi5pbm5lckhUTUwgPSAnTWlrZSdcbiAgICBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1yZXF1ZXN0LXNoYXJlLXJvbGUnKVxuICAgIGRpdi5pbm5lckhUTUwgPSAnQURNSU4nXG4gICAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtcmVxdWVzdC1zaGFyZS10b3RhbC1hdmFpbGFibGUtaXRlbXMnKVxuICAgIGRpdi5pbm5lckhUTUwgPSBwcm9kdWN0LnRvdGFsX2F2YWlsYWJsZV9pdGVtc1tncm91cC5yZXBsYWNlKCdfJywgJyAnKV0udG9TdHJpbmcoKVxuICAgIGxldCBpbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXJlcXVlc3Qtc2hhcmUtcXVhbnRpdHknKVxuICAgIGlucHV0Lm1heCA9IHByb2R1Y3QuYXZhaWxhYmxlX3F1YW50aXR5W2dyb3VwLnJlcGxhY2UoJ18nLCAnICcpXS50b1N0cmluZygpXG4gICAgaW5wdXQubWluID0gJzEnXG4gICAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1yZXF1ZXN0LXNoYXJlLW5hbWUtaGlkZGVuLWlucHV0JylcbiAgICBpbnB1dC52YWx1ZSA9IHByb2R1Y3QubmFtZVxuICAgIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtcmVxdWVzdC1zaGFyZS1TS1UtaGlkZGVuLWlucHV0JylcbiAgICBpbnB1dC52YWx1ZSA9IHByb2R1Y3QuU0tVXG4gICAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1yZXF1ZXN0LXNoYXJlLWF2YWlsYWJsZS1xdWFudGl0eS1oaWRkZW4taW5wdXQnKVxuICAgIGlucHV0LnZhbHVlID0gcHJvZHVjdC5hdmFpbGFibGVfcXVhbnRpdHlbZ3JvdXAucmVwbGFjZSgnXycsICcgJyldLnRvU3RyaW5nKClcbiAgICBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXJlcXVlc3Qtc2hhcmUtZnJvbS1ncm91cCcpXG4gICAgaW5wdXQudmFsdWUgPSBncm91cC5yZXBsYWNlKCdfJywgJyAnKVxuICAgIHJlcXVlc3RTaGFyZU1vZGFsLnNob3coKVxufVxuXG4vLyBmdW5jdGlvbiB0byBzaGlwXG5mdW5jdGlvbiBzaGlwKHByb2R1Y3Q6IElQcm9kdWN0LCBncm91cDogc3RyaW5nKSB7XG4gICAgY29uc3QgaW1nOiBIVE1MSW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtc2hpcC1pbWFnZScpXG4gICAgY29uc3QgZnVsbEltYWdlQW5jaG9yID0gaW1nLmNsb3Nlc3QoJy5wcm9kdWN0LWZ1bGwtaW1hZ2UtYW5jaG9yJylcbiAgICBmdWxsSW1hZ2VBbmNob3Iuc2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldC1wcm9kdWN0LWlkJywgcHJvZHVjdC5pZC50b1N0cmluZygpKVxuICAgIHByb2R1Y3QuaW1hZ2UubGVuZ3RoID4gMTAwID8gKGltZy5zcmMgPSBgZGF0YTppbWFnZS9wbmc7YmFzZTY0LCAke3Byb2R1Y3QuaW1hZ2V9YCkgOiAoaW1nLnNyYyA9IGRlZmF1bHRCcmFuZEltYWdlKVxuICAgIGxldCBkaXY6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtc2hpcC1uYW1lJylcbiAgICBkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5uYW1lXG4gICAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtc2hpcC1za3UnKVxuICAgIGRpdi5pbm5lckhUTUwgPSBwcm9kdWN0LlNLVVxuICAgIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXNoaXAtYXZhaWxhYmxlLXF1YW50aXR5JylcbiAgICBkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5hdmFpbGFibGVfcXVhbnRpdHlbZ3JvdXAucmVwbGFjZSgnXycsICcgJyldLnRvU3RyaW5nKClcbiAgICBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1zaGlwLXRvdGFsLWF2YWlsYWJsZS1pdGVtcycpXG4gICAgZGl2LmlubmVySFRNTCA9IHByb2R1Y3QudG90YWxfYXZhaWxhYmxlX2l0ZW1zW2dyb3VwLnJlcGxhY2UoJ18nLCAnICcpXS50b1N0cmluZygpXG5cbiAgICBsZXQgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1zaGlwLXByb2R1Y3QtaWQnKVxuICAgIGlucHV0LnZhbHVlID0gcHJvZHVjdC5pZC50b1N0cmluZygpXG4gICAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1zaGlwLWRlc2lyZS1xdWFudGl0eScpXG4gICAgaW5wdXQubWF4ID0gcHJvZHVjdC5hdmFpbGFibGVfcXVhbnRpdHlbZ3JvdXAucmVwbGFjZSgnXycsICcgJyldLnRvU3RyaW5nKClcbiAgICBpbnB1dC5taW4gPSAnMSdcbiAgICBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXNoaXAtZ3JvdXAnKVxuICAgIGlucHV0LnZhbHVlID0gZ3JvdXAucmVwbGFjZSgnXycsICcgJylcblxuICAgIHNoaXBNb2RhbC5zaG93KClcblxuICAgIC8vIC0tLS0tY291bnQgcmVzdCBxdWFudGl0eSBpbiBzaGlwIHJlcXVlc3QgcHJvZHVjdCBtb2RhbC0tLS0tLVxuICAgIGNvbnN0IGRlc2lyZWRRdWFudGl0eUlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtc2hpcC1kZXNpcmUtcXVhbnRpdHknKVxuICAgIGRlc2lyZWRRdWFudGl0eUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgY29uc3QgYXZhaWxhYmxlUXVhbnRpdHlEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1zaGlwLWF2YWlsYWJsZS1xdWFudGl0eScpXG4gICAgICAgIGF2YWlsYWJsZVF1YW50aXR5RGl2LnRleHRDb250ZW50ID0gcHJvZHVjdC5hdmFpbGFibGVfcXVhbnRpdHlbZ3JvdXAucmVwbGFjZSgnXycsICcgJyldLnRvU3RyaW5nKClcbiAgICAgICAgbGV0IGRlc2lyZWRRdWFudGl0eSA9IE51bWJlcihkZXNpcmVkUXVhbnRpdHlJbnB1dC52YWx1ZSlcbiAgICAgICAgY29uc3QgYXZhaWxhYmxlUXVhbnRpdHkgPSBOdW1iZXIoYXZhaWxhYmxlUXVhbnRpdHlEaXYudGV4dENvbnRlbnQpXG4gICAgICAgIGlmIChkZXNpcmVkUXVhbnRpdHkgPiBhdmFpbGFibGVRdWFudGl0eSkge1xuICAgICAgICAgICAgZGVzaXJlZFF1YW50aXR5SW5wdXQudmFsdWUgPSBhdmFpbGFibGVRdWFudGl0eS50b1N0cmluZygpXG4gICAgICAgIH1cbiAgICAgICAgYXZhaWxhYmxlUXVhbnRpdHlEaXYudGV4dENvbnRlbnQgPSAoYXZhaWxhYmxlUXVhbnRpdHkgLSBkZXNpcmVkUXVhbnRpdHkpLnRvU3RyaW5nKClcbiAgICB9KVxufVxuLy8gZnVuY3Rpb24gdG8gYm9va2luZ1xuZnVuY3Rpb24gYm9va2luZyhwcm9kdWN0OiBJUHJvZHVjdCwgZ3JvdXA6IHN0cmluZykge1xuICAgIGNvbnNvbGUubG9nKCdwcm9kdWN0JywgcHJvZHVjdClcbiAgICBjb25zdCBpbWc6IEhUTUxJbWFnZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ldmVudC1pbWFnZScpXG4gICAgY29uc3QgZnVsbEltYWdlQW5jaG9yID0gaW1nLmNsb3Nlc3QoJy5wcm9kdWN0LWZ1bGwtaW1hZ2UtYW5jaG9yJylcbiAgICBmdWxsSW1hZ2VBbmNob3Iuc2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldC1wcm9kdWN0LWlkJywgcHJvZHVjdC5pZC50b1N0cmluZygpKVxuICAgIHByb2R1Y3QuaW1hZ2UubGVuZ3RoID4gMTAwID8gKGltZy5zcmMgPSBgZGF0YTppbWFnZS9wbmc7YmFzZTY0LCAke3Byb2R1Y3QuaW1hZ2V9YCkgOiAoaW1nLnNyYyA9IGRlZmF1bHRCcmFuZEltYWdlKVxuICAgIGxldCBkaXY6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZXZlbnQtbmFtZScpXG4gICAgZGl2LmlubmVySFRNTCA9IHByb2R1Y3QubmFtZVxuICAgIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWV2ZW50LVNLVScpXG4gICAgY29uc29sZS5sb2cocHJvZHVjdC5TS1UpXG4gICAgZGl2LmlubmVySFRNTCA9IHByb2R1Y3QuU0tVXG5cbiAgICBsZXQgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ldmVudC1ncm91cC1oaWRkZW4nKVxuICAgIGlucHV0LnZhbHVlID0gZ3JvdXAucmVwbGFjZSgnXycsICcgJylcbiAgICBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWV2ZW50LXByb2R1Y3QtaWQnKVxuICAgIGlucHV0LnZhbHVlID0gcHJvZHVjdC5pZC50b1N0cmluZygpXG5cbiAgICB2aWV3TW9kYWwuaGlkZSgpXG4gICAgZXZlbnRNb2RhbC5zaG93KClcbn1cblxuLy8gZnVuY3Rpb24gdG8gYXNzaWduXG5mdW5jdGlvbiBhc3NpZ24ocHJvZHVjdDogSVByb2R1Y3QsIGdyb3VwOiBzdHJpbmcpIHtcbiAgICBsZXQgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1hc3NpZ24tbmFtZScpXG4gICAgaW5wdXQudmFsdWUgPSBwcm9kdWN0Lm5hbWVcbiAgICBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWFzc2lnbi1hbW91bnQnKVxuICAgIGlucHV0Lm1heCA9IHByb2R1Y3QuYXZhaWxhYmxlX3F1YW50aXR5W2dyb3VwLnJlcGxhY2UoJ18nLCAnICcpXS50b1N0cmluZygpXG4gICAgaW5wdXQubWluID0gJzEnXG4gICAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1hc3NpZ24tZnJvbS1ncm91cCcpXG4gICAgaW5wdXQudmFsdWUgPSBncm91cC5yZXBsYWNlKCdfJywgJyAnKVxuICAgIGFzc2lnbk1vZGFsLnNob3coKVxufVxuXG4vLyBmdW5jdGlvbiB0byBkZWxldGUgc2hpcCBhc3NpZ24gc2hhcmUgYnV0dG9uXG5mdW5jdGlvbiBkZWxldGVTaGlwQXNzaWduQnV0dG9uKG5hbWVHcm91cDogc3RyaW5nLCBuYW1lR3JvdXBWYWx1ZTogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2hpcEFzc2lnblNoYXJlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYCNwcm9kdWN0LXNoaXAtYXNzaWduLXNoYXJlLWNvbnRhaW5lci0ke25hbWVHcm91cC5yZXBsYWNlKC8gL2csICdfJyl9YFxuICAgIClcbiAgICBjb25zdCBncm91cENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGAjcHJvZHVjdC12aWV3LXByb2R1Y3RfZ3JvdXAtY29udGFpbmVyLSR7bmFtZUdyb3VwVmFsdWUucmVwbGFjZSgvIC9nLCAnXycpfWBcbiAgICApXG4gICAgaWYgKHNoaXBBc3NpZ25TaGFyZUNvbnRhaW5lcikge1xuICAgICAgICBzaGlwQXNzaWduU2hhcmVDb250YWluZXIucmVtb3ZlKClcbiAgICB9XG4gICAgaWYgKGdyb3VwQ29udGFpbmVyKSB7XG4gICAgICAgIGdyb3VwQ29udGFpbmVyLnJlbW92ZSgpXG4gICAgfVxufVxuXG4vLyBmdW5jdGlvbiB0byBhZGQgc2hpcCwgYXNzaWduLCBidXR0b24gdG8gdmlldyBwcm9kdWN0IG1vZGFsXG5mdW5jdGlvbiBhZGRTaGlwQXNzaWduU2hhcmVCdXR0b24oaXNFcXVhbDogYm9vbGVhbiwgbWFzdGVyR3JvdXA6IHN0cmluZywgZ3JvdXA6IHN0cmluZywgcHJvZHVjdFBhcmFtOiBJUHJvZHVjdCkge1xuICAgIGNvbnN0IGV2ZW50Q2hlY2tib3g6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1zaG93LWV2ZW50cy10b2dnbGUtYnRuJylcbiAgICBjb25zdCBpc0V2ZW50ID0gZXZlbnRDaGVja2JveC5jaGVja2VkXG4gICAgY29uc3QgZ3JvdXBVbmRlclNjb3JlID0gZ3JvdXAucmVwbGFjZSgvIC9nLCAnXycpXG4gICAgY29uc3QgZ3JvdXBQcm9kdWN0SWRzID0gcHJvZHVjdFBhcmFtLmdyb3Vwc19pZHNcbiAgICBjb25zdCBwcm9kdWN0VHlwZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNwcm9kdWN0LXZpZXctcHJvZHVjdC1uYW1lLWNvbnRhaW5lcmApXG4gICAgY29uc3Qgc2hpcEFzc2lnbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgc2hpcEFzc2lnbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzbTpjb2wtc3Bhbi0zJywgJ2ZsZXgnLCAnZ2FwLTQnKVxuICAgIHNoaXBBc3NpZ25Db250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsIGBwcm9kdWN0LXNoaXAtYXNzaWduLXNoYXJlLWNvbnRhaW5lci0ke21hc3Rlckdyb3VwLnJlcGxhY2UoLyAvZywgJ18nKX1gKVxuICAgIGNvbnN0IHNoaXBBc3NpZ25Db250YWluZXJEaXYgPSBgXG4gICAgPGRpdj5cbiAgICAgIDxsYWJlbCBmb3I9XCJuYW1lXCIgY2xhc3M9XCJibG9jayBtYi0yIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtd2hpdGVcIj5BdmFpbGFibGU8L2xhYmVsPlxuICAgICAgICA8ZGl2IGlkPVwic2hpcC1wcm9kdWN0LXF1YW50aXR5XCJcbiAgICAgICAgICBjbGFzcz1cInNoYWRvdy1zbSBiZy1ncmF5LTUwIGJvcmRlciBib3JkZXItZ3JheS0zMDAgdGV4dC1ncmF5LTkwMCB0ZXh0LXNtIHJvdW5kZWQtbGcgZm9jdXM6cmluZy1ibHVlLTYwMCBmb2N1czpib3JkZXItYmx1ZS02MDAgYmxvY2sgdy1mdWxsIHAtMi41IGRhcms6YmctZ3JheS02MDAgZGFyazpib3JkZXItZ3JheS01MDAgZGFyazpwbGFjZWhvbGRlci1ncmF5LTQwMCBkYXJrOnRleHQtd2hpdGUgZGFyazpmb2N1czpyaW5nLWJsdWUtNTAwIGRhcms6Zm9jdXM6Ym9yZGVyLWJsdWUtNTAwXCI+XG4gICAgICAke3Byb2R1Y3RQYXJhbS5hdmFpbGFibGVfcXVhbnRpdHlbZ3JvdXBdIHx8IDB9PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdj5cbiAgICAgIDxsYWJlbCBmb3I9XCJwcm9kdWN0X2dyb3VwXCIgY2xhc3M9XCJibG9jayBtYi0yIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtd2hpdGVcIiA+QWN0aW9uPC9sYWJlbCA+XG4gICAgICA8YnV0dG9uIHNoaXAtZ3JvdXAtZGF0YT0ke2dyb3VwVW5kZXJTY29yZX0gdHlwZT1cImJ1dHRvblwiIGlkPVwic2hpcC1wcm9kdWN0LWJ1dHRvbi0ke2dyb3VwVW5kZXJTY29yZX1cIiBjbGFzcz1cInNoaXAtcHJvZHVjdC1idXR0b24gaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIG1yLTIgcHgtMyBweS0yLjUgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWNlbnRlciB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgYmcteWVsbG93LTQwMCBob3ZlcjpiZy15ZWxsb3ctNTAwIGZvY3VzOnJpbmctNCBmb2N1czpyaW5nLXJlZC0zMDAgZGFyazpmb2N1czpyaW5nLXJlZC05MDBcIj5cbiAgICAgICAgPHN2ZyBjbGFzcz1cInctNCBoLTQgbXItMlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJNMTcuNDE0IDIuNTg2YTIgMiAwIDAwLTIuODI4IDBMNyAxMC4xNzJWMTNoMi44MjhsNy41ODYtNy41ODZhMiAyIDAgMDAwLTIuODI4elwiPjwvcGF0aD48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0yIDZhMiAyIDAgMDEyLTJoNGExIDEgMCAwMTAgMkg0djEwaDEwdi00YTEgMSAwIDExMiAwdjRhMiAyIDAgMDEtMiAySDRhMiAyIDAgMDEtMi0yVjZ6XCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiPjwvcGF0aD48L3N2Zz5cbiAgICAgICAgU2hpcFxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uIGFzc2lnbi1ncm91cC1kYXRhPSR7Z3JvdXBVbmRlclNjb3JlfSB0eXBlPVwiYnV0dG9uXCIgaWQ9XCJhc3NpZ24tcHJvZHVjdC1idXR0b24tJHtncm91cFVuZGVyU2NvcmV9XCIgY2xhc3M9XCJhc3NpZ24tcHJvZHVjdC1idXR0b24gaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIHB4LTMgcHktMi41IHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1jZW50ZXIgdGV4dC13aGl0ZSByb3VuZGVkLWxnIGJnLWJsdWUtNzAwIGhvdmVyOmJnLWJsdWUtODAwIGZvY3VzOnJpbmctNCBmb2N1czpyaW5nLWJsdWUtMzAwIGRhcms6YmctYmx1ZS02MDAgZGFyazpob3ZlcjpiZy1ibHVlLTcwMCBkYXJrOmZvY3VzOnJpbmctYmx1ZS04MDBcIj5cbiAgICAgICAgPHN2ZyBjbGFzcz1cInctNCBoLTQgbXItMlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJNMTcuNDE0IDIuNTg2YTIgMiAwIDAwLTIuODI4IDBMNyAxMC4xNzJWMTNoMi44MjhsNy41ODYtNy41ODZhMiAyIDAgMDAwLTIuODI4elwiPjwvcGF0aD48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0yIDZhMiAyIDAgMDEyLTJoNGExIDEgMCAwMTAgMkg0djEwaDEwdi00YTEgMSAwIDExMiAwdjRhMiAyIDAgMDEtMiAySDRhMiAyIDAgMDEtMi0yVjZ6XCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiPjwvcGF0aD48L3N2Zz5cbiAgICAgICAgQXNzaWduXG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgYFxuICAgIGNvbnN0IGJvb2tpbmdDb250YWluZXJEaXYgPSBgXG4gICAgICAgIDxkaXY+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJwcm9kdWN0X2dyb3VwXCIgY2xhc3M9XCJibG9jayBtYi0yIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtd2hpdGVcIiA+QWN0aW9uPC9sYWJlbCA+XG4gICAgICAgIDxidXR0b24gc2hpcC1ncm91cC1kYXRhPSR7Z3JvdXBVbmRlclNjb3JlfSB0eXBlPVwiYnV0dG9uXCIgaWQ9XCJib29raW5nLXByb2R1Y3QtYnV0dG9uLSR7Z3JvdXBVbmRlclNjb3JlfVwiIGNsYXNzPVwiYm9va2luZy1wcm9kdWN0LWJ1dHRvbiBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgbXItMiBweC0zIHB5LTIuNSB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtY2VudGVyIHRleHQtd2hpdGUgcm91bmRlZC1sZyBiZy1ibHVlLTcwMCBob3ZlcjpiZy1ibHVlLTgwMCBmb2N1czpyaW5nLTQgZm9jdXM6cmluZy1ibHVlLTMwMCBkYXJrOmJnLWJsdWUtNjAwIGRhcms6aG92ZXI6YmctYmx1ZS03MDAgZGFyazpmb2N1czpyaW5nLWJsdWUtODAwXCI+XG4gICAgICAgICAgICA8c3ZnIGNsYXNzPVwidy00IGgtNCBtci0yXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgNDQ4IDUxMlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgICAgZD1cIk0xMjggMGMxMy4zIDAgMjQgMTAuNyAyNCAyNFY2NEgyOTZWMjRjMC0xMy4zIDEwLjctMjQgMjQtMjRzMjQgMTAuNyAyNCAyNFY2NGg0MGMzNS4zIDAgNjQgMjguNyA2NCA2NHYxNiA0OFY0NDhjMCAzNS4zLTI4LjcgNjQtNjQgNjRINjRjLTM1LjMgMC02NC0yOC43LTY0LTY0VjE5MiAxNDQgMTI4QzAgOTIuNyAyOC43IDY0IDY0IDY0aDQwVjI0YzAtMTMuMyAxMC43LTI0IDI0LTI0ek00MDAgMTkySDQ4VjQ0OGMwIDguOCA3LjIgMTYgMTYgMTZIMzg0YzguOCAwIDE2LTcuMiAxNi0xNlYxOTJ6TTMyOSAyOTdMMjE3IDQwOWMtOS40IDkuNC0yNC42IDkuNC0zMy45IDBsLTY0LTY0Yy05LjQtOS40LTkuNC0yNC42IDAtMzMuOXMyNC42LTkuNCAzMy45IDBsNDcgNDcgOTUtOTVjOS40LTkuNCAyNC42LTkuNCAzMy45IDBzOS40IDI0LjYgMCAzMy45elwiXG4gICAgICAgICAgICAgICAgY2xpcC1ydWxlPVwiZXZlbm9kZFwiPjwvcGF0aD5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgQm9va2luZ1xuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgYFxuICAgIGlzRXZlbnRcbiAgICAgICAgPyAoc2hpcEFzc2lnbkNvbnRhaW5lci5pbm5lckhUTUwgPSBib29raW5nQ29udGFpbmVyRGl2KVxuICAgICAgICA6IChzaGlwQXNzaWduQ29udGFpbmVyLmlubmVySFRNTCA9IHNoaXBBc3NpZ25Db250YWluZXJEaXYpXG4gICAgY29uc3Qgc2hhcmVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGNvbnN0IHNoaXBQcm9kdWN0QnRuID0gc2hpcEFzc2lnbkNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKGAjc2hpcC1wcm9kdWN0LWJ1dHRvbi0ke2dyb3VwVW5kZXJTY29yZX1gKVxuICAgIGNvbnN0IGFzc2lnblByb2R1Y3RCdG4gPSBzaGlwQXNzaWduQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoYCNhc3NpZ24tcHJvZHVjdC1idXR0b24tJHtncm91cFVuZGVyU2NvcmV9YClcbiAgICBjb25zdCBib29raW5nUHJvZHVjdEJ0biA9IHNoaXBBc3NpZ25Db250YWluZXIucXVlcnlTZWxlY3RvcihgI2Jvb2tpbmctcHJvZHVjdC1idXR0b24tJHtncm91cFVuZGVyU2NvcmV9YClcblxuICAgIHNoYXJlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3NtOmNvbC1zcGFuLTMnLCAnZmxleCcsICdnYXAtNCcpXG4gICAgc2hhcmVDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsIGBwcm9kdWN0LXNoaXAtYXNzaWduLXNoYXJlLWNvbnRhaW5lci0ke21hc3Rlckdyb3VwLnJlcGxhY2UoLyAvZywgJ18nKX1gKVxuICAgIHNoYXJlQ29udGFpbmVyLmlubmVySFRNTCA9IGBcbiAgICA8ZGl2PlxuICAgICAgPGxhYmVsIGZvcj1cIm5hbWVcIiBjbGFzcz1cImJsb2NrIG1iLTIgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktOTAwIGRhcms6dGV4dC13aGl0ZVwiPkF2YWlsYWJsZTwvbGFiZWw+XG4gICAgICAgIDxkaXYgaWQ9XCJzaGlwLXByb2R1Y3QtcXVhbnRpdHlcIlxuICAgICAgICAgIGNsYXNzPVwic2hhZG93LXNtIGJnLWdyYXktNTAgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCB0ZXh0LWdyYXktOTAwIHRleHQtc20gcm91bmRlZC1sZyBmb2N1czpyaW5nLWJsdWUtNjAwIGZvY3VzOmJvcmRlci1ibHVlLTYwMCBibG9jayB3LWZ1bGwgcC0yLjUgZGFyazpiZy1ncmF5LTYwMCBkYXJrOmJvcmRlci1ncmF5LTUwMCBkYXJrOnBsYWNlaG9sZGVyLWdyYXktNDAwIGRhcms6dGV4dC13aGl0ZSBkYXJrOmZvY3VzOnJpbmctYmx1ZS01MDAgZGFyazpmb2N1czpib3JkZXItYmx1ZS01MDBcIj5cbiAgICAgICR7cHJvZHVjdFBhcmFtLmF2YWlsYWJsZV9xdWFudGl0eVtncm91cF0gfHwgMH08L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2PlxuICAgICAgPGxhYmVsIGZvcj1cInByb2R1Y3RfZ3JvdXBcIiBjbGFzcz1cImJsb2NrIG1iLTIgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktOTAwIGRhcms6dGV4dC13aGl0ZVwiID5BY3Rpb248L2xhYmVsID5cbiAgICAgIDxidXR0b24gc2hhcmUtZ3JvdXAtZGF0YT0ke2dyb3VwVW5kZXJTY29yZX0gdHlwZT1cImJ1dHRvblwiIGlkPVwic2hhcmUtcHJvZHVjdC1idXR0b24tJHtncm91cFVuZGVyU2NvcmV9XCIgY2xhc3M9XCJyZXF1ZXN0LXNoYXJlLXByb2R1Y3QtYnV0dG9uIGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBweC0zIHB5LTIuNSB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtY2VudGVyIHRleHQtd2hpdGUgcm91bmRlZC1sZyBiZy15ZWxsb3ctNDAwIGhvdmVyOmJnLWJsdWUtODAwIGZvY3VzOnJpbmctNCBmb2N1czpyaW5nLWJsdWUtMzAwIGRhcms6YmctYmx1ZS02MDAgZGFyazpob3ZlcjpiZy1ibHVlLTcwMCBkYXJrOmZvY3VzOnJpbmctYmx1ZS04MDBcIj5cbiAgICAgICAgPHN2ZyBjbGFzcz1cInctNCBoLTQgbXItMlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJNMTcuNDE0IDIuNTg2YTIgMiAwIDAwLTIuODI4IDBMNyAxMC4xNzJWMTNoMi44MjhsNy41ODYtNy41ODZhMiAyIDAgMDAwLTIuODI4elwiPjwvcGF0aD48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0yIDZhMiAyIDAgMDEyLTJoNGExIDEgMCAwMTAgMkg0djEwaDEwdi00YTEgMSAwIDExMiAwdjRhMiAyIDAgMDEtMiAySDRhMiAyIDAgMDEtMi0yVjZ6XCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiPjwvcGF0aD48L3N2Zz5cbiAgICAgICAgUmVxdWVzdCBTaGFyZVxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIGBcblxuICAgIGNvbnN0IHNoYXJlUHJvZHVjdEJ0biA9IHNoYXJlQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoYCNzaGFyZS1wcm9kdWN0LWJ1dHRvbi0ke2dyb3VwVW5kZXJTY29yZX1gKVxuXG4gICAgaWYgKHByb2R1Y3RQYXJhbS5hdmFpbGFibGVfcXVhbnRpdHlbZ3JvdXBdID09PSAwIHx8ICFwcm9kdWN0UGFyYW0uYXZhaWxhYmxlX3F1YW50aXR5W2dyb3VwXSkge1xuICAgICAgICBzaGlwUHJvZHVjdEJ0bi5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUnKVxuICAgICAgICBhc3NpZ25Qcm9kdWN0QnRuLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZScpXG4gICAgICAgIHNoYXJlUHJvZHVjdEJ0bi5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUnKVxuICAgIH1cblxuICAgIGlmIChpc0VxdWFsKSB7XG4gICAgICAgIHByb2R1Y3RUeXBlQ29udGFpbmVyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNoaXBBc3NpZ25Db250YWluZXIsIHByb2R1Y3RUeXBlQ29udGFpbmVyLm5leHRTaWJsaW5nKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2R1Y3RUeXBlQ29udGFpbmVyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNoYXJlQ29udGFpbmVyLCBwcm9kdWN0VHlwZUNvbnRhaW5lci5uZXh0U2libGluZylcbiAgICB9XG5cbiAgICBjb25zdCBib29raW5nQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib29raW5nLXByb2R1Y3QtYnV0dG9uJylcbiAgICBib29raW5nQnV0dG9ucy5mb3JFYWNoKChlKSA9PlxuICAgICAgICBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNoaXBHcm91cCA9IGUuZ2V0QXR0cmlidXRlKCdzaGlwLWdyb3VwLWRhdGEnKVxuICAgICAgICAgICAgY29uc3QgcHJvZHVjdCA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UucHJvZHVjdClcbiAgICAgICAgICAgIGJvb2tpbmcocHJvZHVjdCwgc2hpcEdyb3VwKVxuICAgICAgICB9KVxuICAgIClcblxuICAgIGNvbnN0IHNoaXBCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXAtcHJvZHVjdC1idXR0b24nKVxuICAgIHNoaXBCdXR0b25zLmZvckVhY2goKGUpID0+XG4gICAgICAgIGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB2aWV3TW9kYWwuaGlkZSgpXG4gICAgICAgICAgICBlZGl0TW9kYWwuaGlkZSgpXG4gICAgICAgICAgICBsZXQgc2hpcEdyb3VwID0gZS5nZXRBdHRyaWJ1dGUoJ3NoaXAtZ3JvdXAtZGF0YScpXG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0ID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5wcm9kdWN0KVxuICAgICAgICAgICAgc2hpcChwcm9kdWN0LCBzaGlwR3JvdXApXG4gICAgICAgIH0pXG4gICAgKVxuXG4gICAgY29uc3QgYXNzaWduQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hc3NpZ24tcHJvZHVjdC1idXR0b24nKVxuICAgIGFzc2lnbkJ1dHRvbnMuZm9yRWFjaCgoZSkgPT5cbiAgICAgICAgZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHZpZXdNb2RhbC5oaWRlKClcbiAgICAgICAgICAgIGVkaXRNb2RhbC5oaWRlKClcbiAgICAgICAgICAgIGxldCBhc3NpZ25Hcm91cCA9IGUuZ2V0QXR0cmlidXRlKCdhc3NpZ24tZ3JvdXAtZGF0YScpXG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0ID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5wcm9kdWN0KVxuICAgICAgICAgICAgYXNzaWduKHByb2R1Y3QsIGFzc2lnbkdyb3VwKVxuICAgICAgICB9KVxuICAgIClcblxuICAgIGNvbnN0IHJlcXVlc3RTaGFyZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmVxdWVzdC1zaGFyZS1wcm9kdWN0LWJ1dHRvbicpXG4gICAgcmVxdWVzdFNoYXJlQnV0dG9ucy5mb3JFYWNoKChlKSA9PlxuICAgICAgICBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdmlld01vZGFsLmhpZGUoKVxuICAgICAgICAgICAgZWRpdE1vZGFsLmhpZGUoKVxuICAgICAgICAgICAgbGV0IHNoYXJlR3JvdXAgPSBlLmdldEF0dHJpYnV0ZSgnc2hhcmUtZ3JvdXAtZGF0YScpXG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0ID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5wcm9kdWN0KVxuICAgICAgICAgICAgcmVxdWVzdFNoYXJlKHByb2R1Y3QsIHNoYXJlR3JvdXApXG4gICAgICAgIH0pXG4gICAgKVxuICAgIGNvbnN0IHByb2R1Y3RWaWV3VHlwZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXZpZXctcHJvZHVjdC1uYW1lLWNvbnRhaW5lcicpXG4gICAgY29uc3QgcHJvZHVjdE1hc3Rlckdyb3VwQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBwcm9kdWN0TWFzdGVyR3JvdXBDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc206Y29sLXNwYW4tMycpXG4gICAgcHJvZHVjdE1hc3Rlckdyb3VwQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCBgcHJvZHVjdC12aWV3LXByb2R1Y3RfZ3JvdXAtY29udGFpbmVyLSR7Z3JvdXBVbmRlclNjb3JlfWApXG5cbiAgICBwcm9kdWN0TWFzdGVyR3JvdXBDb250YWluZXIuaW5uZXJIVE1MID0gYFxuICAgIDxsYWJlbCBmb3I9XCJmb3ItZ3JvdXAtJHtncm91cFVuZGVyU2NvcmV9XCJcbiAgICAgIGNsYXNzPVwiYmxvY2sgbWItMiB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDAgZGFyazp0ZXh0LXdoaXRlXCI+JHttYXN0ZXJHcm91cH08L2xhYmVsPlxuICAgIDxzZWxlY3QgdHlwZT1cInRleHRcIiBuYW1lPVwiZ3JvdXAtJHtncm91cFVuZGVyU2NvcmV9XCIgaWQ9XCJwcm9kdWN0LXZpZXctJHtncm91cFVuZGVyU2NvcmV9XCJcbiAgICAgIGNsYXNzPVwic2hhZG93LXNtIGJnLWdyYXktNTAgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCB0ZXh0LWdyYXktOTAwIHRleHQtc20gcm91bmRlZC1sZyBmb2N1czpyaW5nLWJsdWUtNjAwIGZvY3VzOmJvcmRlci1ibHVlLTYwMCBibG9jayB3LWZ1bGwgcC0yLjUgZGFyazpiZy1ncmF5LTYwMCBkYXJrOmJvcmRlci1ncmF5LTUwMCBkYXJrOnBsYWNlaG9sZGVyLWdyYXktNDAwIGRhcms6dGV4dC13aGl0ZSBkYXJrOmZvY3VzOnJpbmctYmx1ZS01MDAgZGFyazpmb2N1czpib3JkZXItYmx1ZS01MDBcIlxuICAgICAgcGxhY2Vob2xkZXI9XCJTb21lIEdyb3VwXCIgcmVxdWlyZWRcbiAgICA+XG4gICAgICA8b3B0aW9uIHZhbHVlPVwiJHtncm91cFByb2R1Y3RJZHNbZ3JvdXBdfVwiPiR7Z3JvdXB9PC9vcHRpb24+XG4gICAgPC9zZWxlY3Q+XG4gICAgYFxuICAgIHByb2R1Y3RWaWV3VHlwZUNvbnRhaW5lci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShwcm9kdWN0TWFzdGVyR3JvdXBDb250YWluZXIsIHByb2R1Y3RWaWV3VHlwZUNvbnRhaW5lci5uZXh0U2libGluZylcbn1cblxuLy8gZnVuY3Rpb24gdG8gZmlsdGVyIHByb2R1Y3RzIGJ5IGdyb3VwXG5jb25zdCBwcm9kdWN0RmlsdGVySW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3QtZmlsdGVyLWlucHV0JylcbmNvbnN0IGZpbHRlclByb2R1Y3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1maWx0ZXItYnV0dG9uJylcbmNvbnN0IGZpbHRlclJhZGlvQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0LWZpbHRlci1yYWRpby1idXR0b24nKVxuXG5maWx0ZXJSYWRpb0J1dHRvbnMuZm9yRWFjaCgoYnRuKSA9PiB7XG4gICAgY29uc3QgZmlsdGVyQnV0dG9uSWQgPSBidG4uZ2V0QXR0cmlidXRlKCdpZCcpXG4gICAgY29uc3QgZmlsdGVySnNvbkRhdGFTdG9yYWdlID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnZmlsdGVySnNvbkRhdGEnKVxuICAgIGNvbnN0IGZpbHRlckpzb25EYXRhT2JqZWN0ID0gSlNPTi5wYXJzZShmaWx0ZXJKc29uRGF0YVN0b3JhZ2UpXG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBmaWx0ZXJKc29uRGF0YU9iamVjdCkge1xuICAgICAgICBpZiAoZmlsdGVyQnV0dG9uSWQuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICAgICAgYnRuLmlubmVySFRNTCA9IGBcbiAgICAgICAgJHtmaWx0ZXJKc29uRGF0YU9iamVjdFtrZXldfVxuICAgICAgICA8c3ZnIGNsYXNzPVwidy0yLjUgaC0yLjUgbWwtMi41XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCJcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDEwIDZcIj5cbiAgICAgICAgICA8cGF0aCBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHJva2Utd2lkdGg9XCIyXCJcbiAgICAgICAgICAgIGQ9XCJtMSAxIDQgNCA0LTRcIiAvPlxuICAgICAgICA8L3N2Zz5gXG4gICAgICAgIH1cbiAgICB9XG59KVxuXG5wcm9kdWN0RmlsdGVySW5wdXRzLmZvckVhY2goKGlucHV0OiBIVE1MSW5wdXRFbGVtZW50KSA9PiB7XG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBmaWx0ZXJJbnB1dERhdGFUYXJnZXQgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0JylcbiAgICAgICAgY29uc3QgbWFzdGVyR3JvdXAgPSBmaWx0ZXJJbnB1dERhdGFUYXJnZXRcbiAgICAgICAgICAgIC5zcGxpdCgnLCcpWzFdXG4gICAgICAgICAgICAucmVwbGFjZSgvW15hLXpBLVowLTlcXHNcXF9dL2csICcnKVxuICAgICAgICAgICAgLnRyaW0oKVxuICAgICAgICBjb25zdCBmaWx0ZXJJbnB1dElkID0gZmlsdGVySW5wdXREYXRhVGFyZ2V0LnNwbGl0KCcsJylbMF0ucmVwbGFjZSgvW15hLXpBLVowLTlcXHNcXF9dL2csICcnKVxuICAgICAgICBjb25zdCBmaWx0ZXJJbnB1dElkU3RyaW5nID0gYCNwcm9kdWN0LWZpbHRlci1pbnB1dC0ke2ZpbHRlcklucHV0SWR9YFxuICAgICAgICBjb25zdCBmaWx0ZXJCdXR0b25JZCA9IGZpbHRlcklucHV0RGF0YVRhcmdldFxuICAgICAgICAgICAgLnNwbGl0KCcsJylbMV1cbiAgICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAgIC5yZXBsYWNlKC9bXmEtekEtWjAtOVxcc1xcX10vZywgJycpXG4gICAgICAgIGNvbnN0IGZpbHRlcklucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihmaWx0ZXJJbnB1dElkU3RyaW5nKSBhcyBIVE1MSW5wdXRFbGVtZW50XG4gICAgICAgIGNvbnN0IGZpbHRlclJhZGlvQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2Ryb3Bkb3duUmFkaW9CdXR0b24tJHtmaWx0ZXJCdXR0b25JZH1gKVxuXG4gICAgICAgIGlmIChmaWx0ZXJJbnB1dElkU3RyaW5nLmluY2x1ZGVzKGZpbHRlckJ1dHRvbklkKSAmJiBpbnB1dC52YWx1ZSA9PT0gbWFzdGVyR3JvdXApIHtcbiAgICAgICAgICAgIGZpbHRlclJhZGlvQnRuLmlubmVySFRNTCA9IGBcbiAgICAgICAgJHtmaWx0ZXJCdXR0b25JZC5zcGxpdCgnXycpLmpvaW4oJyAnKX1cbiAgICAgICAgPHN2ZyBjbGFzcz1cInctMi41IGgtMi41IG1sLTIuNVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiXG4gICAgICAgICAgdmlld0JveD1cIjAgMCAxMCA2XCI+XG4gICAgICAgICAgPHBhdGggc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlLXdpZHRoPVwiMlwiXG4gICAgICAgICAgICBkPVwibTEgMSA0IDQgNC00XCIgLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICBgXG4gICAgICAgICAgICBnZXRTZXNzaW9uU3RvcmFnZU9iamVjdChmaWx0ZXJKc29uRGF0YSwgJ2ZpbHRlckpzb25EYXRhJywgJ3JlbW92ZScsIGZpbHRlckJ1dHRvbklkKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBmaWx0ZXJSYWRpb0J0bi5pbm5lckhUTUwgPSBgXG4gICAgICAke2ZpbHRlcklucHV0LnZhbHVlLnNwbGl0KCdfJykuam9pbignICcpfVxuICAgICAgPHN2ZyBjbGFzcz1cInctMi41IGgtMi41IG1sLTIuNVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiXG4gICAgICAgIHZpZXdCb3g9XCIwIDAgMTAgNlwiPlxuICAgICAgICA8cGF0aCBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHJva2Utd2lkdGg9XCIyXCJcbiAgICAgICAgICBkPVwibTEgMSA0IDQgNC00XCIgLz5cbiAgICAgIDwvc3ZnPlxuICAgICAgYFxuICAgICAgICBmaWx0ZXJKc29uRGF0YVtmaWx0ZXJCdXR0b25JZF0gPSBmaWx0ZXJJbnB1dC52YWx1ZS5zcGxpdCgnXycpLmpvaW4oJyAnKVxuICAgICAgICBnZXRTZXNzaW9uU3RvcmFnZU9iamVjdChmaWx0ZXJKc29uRGF0YSwgJ2ZpbHRlckpzb25EYXRhJywgJ2FkZCcpXG4gICAgfSlcbn0pXG5cbmZpbHRlclByb2R1Y3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGNvbnN0IGhpZGRlbklucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NvcnRfYnknKSBhcyBIVE1MSW5wdXRFbGVtZW50XG4gICAgY29uc3QgZmlsdGVySnNvbkRhdGFTdG9yYWdlID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnZmlsdGVySnNvbkRhdGEnKVxuICAgIGNvbnN0IGZpbHRlckRhdGFPYmplY3QgPSBKU09OLnBhcnNlKGZpbHRlckpzb25EYXRhU3RvcmFnZSlcbiAgICBmaWx0ZXJKc29uRGF0YSA9IGZpbHRlckRhdGFPYmplY3RcbiAgICBoaWRkZW5JbnB1dC52YWx1ZSA9IEpTT04uc3RyaW5naWZ5KGZpbHRlckpzb25EYXRhKVxuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2ZpbHRlckpzb25EYXRhJywgSlNPTi5zdHJpbmdpZnkoZmlsdGVySnNvbkRhdGEpKVxuICAgIGNvbnN0IGlzVmlzaWJsZUZpbHRlciA9IHRydWVcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdpc1Zpc2libGVGaWx0ZXInLCBKU09OLnN0cmluZ2lmeShpc1Zpc2libGVGaWx0ZXIpKVxufSlcblxuZnVuY3Rpb24gZ2V0U2Vzc2lvblN0b3JhZ2VPYmplY3QoXG4gICAgbG9jYWxPYmplY3Q6IEZpbHRlckpzb25EYXRhLFxuICAgIHNlc3Npb25PYmplY3Q6IHN0cmluZyxcbiAgICBtZXRob2QgPSAnbm9uZScsXG4gICAgb2JqZWN0S2V5ID0gJ25vbmUnXG4pIHtcbiAgICBjb25zdCBqc29uRGF0YU9iamVjdCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oc2Vzc2lvbk9iamVjdClcbiAgICBjb25zdCBkYXRhT2JqZWN0ID0gSlNPTi5wYXJzZShqc29uRGF0YU9iamVjdClcbiAgICBzd2l0Y2ggKG1ldGhvZCkge1xuICAgICAgICBjYXNlICdhZGQnOlxuICAgICAgICAgICAgY29uc3QgbmV3RGF0YU9iamVjdCA9IHsgLi4uZGF0YU9iamVjdCwgLi4ubG9jYWxPYmplY3QgfVxuICAgICAgICAgICAgY29uc3QgbmV3SnNvbkRhdGEgPSBKU09OLnN0cmluZ2lmeShuZXdEYXRhT2JqZWN0KVxuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShzZXNzaW9uT2JqZWN0LCBuZXdKc29uRGF0YSlcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ3JlbW92ZSc6XG4gICAgICAgICAgICBkZWxldGUgZGF0YU9iamVjdFtvYmplY3RLZXldXG4gICAgICAgICAgICBjb25zdCBuZXdKc29uRGF0YU9iamVjdCA9IEpTT04uc3RyaW5naWZ5KGRhdGFPYmplY3QpXG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKHNlc3Npb25PYmplY3QsIG5ld0pzb25EYXRhT2JqZWN0KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrXG4gICAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVBZGp1c3RBY3Rpb24oaXNFcXVhbDogYm9vbGVhbiwgbWFzdGVyR3JvdXA6IHN0cmluZywgZ3JvdXA6IHN0cmluZywgcHJvZHVjdFBhcmFtOiBJUHJvZHVjdCkge1xuICAgIGNvbnN0IHByb2R1Y3RJbldhcmVob3VzZXMgPSBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICAncHJvZHVjdEluV2FyZWhvdXNlcycsXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHByb2R1Y3RQYXJhbS5wcm9kdWN0X2luX3dhcmVob3VzZXMpXG4gICAgKVxuICAgIGNvbnNvbGUubG9nKHByb2R1Y3RQYXJhbSlcblxuICAgIGNvbnN0IGdyb3VwVW5kZXJTY29yZSA9IGdyb3VwLnJlcGxhY2UoLyAvZywgJ18nKVxuICAgIGNvbnN0IGdyb3VwUHJvZHVjdElkcyA9IHByb2R1Y3RQYXJhbS5ncm91cHNfaWRzXG4gICAgY29uc3QgcHJvZHVjdFR5cGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcHJvZHVjdC1hZGp1c3QtcHJvZHVjdC1uYW1lLWNvbnRhaW5lcmApXG4gICAgY29uc3QgYWRqdXN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBhZGp1c3RDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc206Y29sLXNwYW4tMicsICdmbGV4JywgJ2dhcC00JylcbiAgICBhZGp1c3RDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsIGBwcm9kdWN0LWFkanVzdC1jb250YWluZXItJHtncm91cFVuZGVyU2NvcmV9YClcbiAgICBhZGp1c3RDb250YWluZXIuaW5uZXJIVE1MID0gYFxuICAgIDxkaXY+XG4gICAgICA8bGFiZWwgZm9yPVwiYWRqdXN0LXByb2R1Y3QtcXVhbnRpdHktJHtncm91cFVuZGVyU2NvcmV9XCIgY2xhc3M9XCJibG9jayBtYi0yIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtd2hpdGVcIj5BdmFpbGFibGU8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgaWQ9XCJhZGp1c3QtcHJvZHVjdC1xdWFudGl0eS0ke2dyb3VwVW5kZXJTY29yZX1cIlxuICAgICAgICAgIGNsYXNzPVwicHJvZHVjdC1hZGp1c3QtZ3JvdXAtcXVhbnRpdHkgc2hhZG93LXNtIGJnLWdyYXktNTAgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCB0ZXh0LWdyYXktOTAwIHRleHQtc20gcm91bmRlZC1sZyBmb2N1czpyaW5nLWJsdWUtNjAwIGZvY3VzOmJvcmRlci1ibHVlLTYwMCBibG9jayB3LWZ1bGwgcC0yLjUgZGFyazpiZy1ncmF5LTYwMCBkYXJrOmJvcmRlci1ncmF5LTUwMCBkYXJrOnBsYWNlaG9sZGVyLWdyYXktNDAwIGRhcms6dGV4dC13aGl0ZSBkYXJrOmZvY3VzOnJpbmctYmx1ZS01MDAgZGFyazpmb2N1czpib3JkZXItYmx1ZS01MDBcIj5cbiAgICA8L2Rpdj5cblxuICBgXG5cbiAgICBwcm9kdWN0VHlwZUNvbnRhaW5lci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShhZGp1c3RDb250YWluZXIsIHByb2R1Y3RUeXBlQ29udGFpbmVyLm5leHRTaWJsaW5nKVxuXG4gICAgY29uc3QgcHJvZHVjdFZpZXdUeXBlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtYWRqdXN0LXByb2R1Y3QtbmFtZS1jb250YWluZXInKVxuICAgIGNvbnN0IG1hc3Rlckdyb3VwV2FyZWhvdXNlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBtYXN0ZXJHcm91cFdhcmVob3VzZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzbTpjb2wtc3Bhbi00JylcbiAgICBtYXN0ZXJHcm91cFdhcmVob3VzZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgYHByb2R1Y3QtYWRqdXN0LXByb2R1Y3RfZ3JvdXAtY29udGFpbmVyLSR7Z3JvdXBVbmRlclNjb3JlfWApXG5cbiAgICBtYXN0ZXJHcm91cFdhcmVob3VzZUNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gIDxkaXYgY2xhc3M9XCJmbGV4IGdhcC00XCI+XG4gICAgPGRpdiBjbGFzcz1cInctMS8yXCI+XG4gICAgICA8bGFiZWwgZm9yPVwiZm9yLWdyb3VwLSR7Z3JvdXBVbmRlclNjb3JlfVwiXG4gICAgICAgIGNsYXNzPVwiYmxvY2sgbWItMiB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDAgZGFyazp0ZXh0LXdoaXRlXCI+JHttYXN0ZXJHcm91cH08L2xhYmVsPlxuICAgICAgPHNlbGVjdCB0eXBlPVwidGV4dFwiIG5hbWU9XCJncm91cC0ke2dyb3VwVW5kZXJTY29yZX1cIiBpZD1cIm1hc3Rlci1ncm91cC1hZGp1c3QtJHtncm91cFVuZGVyU2NvcmV9XCJcbiAgICAgICAgY2xhc3M9XCJwcm9kdWN0LWFkanVzdC1ncm91cCBzaGFkb3ctc20gYmctZ3JheS01MCBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHRleHQtZ3JheS05MDAgdGV4dC1zbSByb3VuZGVkLWxnIGZvY3VzOnJpbmctYmx1ZS02MDAgZm9jdXM6Ym9yZGVyLWJsdWUtNjAwIGJsb2NrIHctZnVsbCBwLTIuNSBkYXJrOmJnLWdyYXktNjAwIGRhcms6Ym9yZGVyLWdyYXktNTAwIGRhcms6cGxhY2Vob2xkZXItZ3JheS00MDAgZGFyazp0ZXh0LXdoaXRlIGRhcms6Zm9jdXM6cmluZy1ibHVlLTUwMCBkYXJrOmZvY3VzOmJvcmRlci1ibHVlLTUwMFwiXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiU29tZSBHcm91cFwiIHJlcXVpcmVkXG4gICAgICA+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCIke2dyb3VwUHJvZHVjdElkc1tncm91cF19XCI+JHtncm91cH08L29wdGlvbj5cbiAgICAgIDwvc2VsZWN0PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ3LTEvMlwiPlxuICAgICAgPGxhYmVsIGZvcj1cImZvci13YXJlaG91c2UtJHtncm91cFVuZGVyU2NvcmV9XCJcbiAgICAgICAgY2xhc3M9XCJibG9jayBtYi0yIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtd2hpdGVcIj5XYXJlaG91c2U8L2xhYmVsPlxuICAgICAgPHNlbGVjdCB0eXBlPVwidGV4dFwiIG5hbWU9XCJncm91cC0ke2dyb3VwVW5kZXJTY29yZX1cIiBpZD1cIndhcmVob3VzZS1hZGp1c3QtJHtncm91cFVuZGVyU2NvcmV9XCIgZGF0YS10YXJnZXQtZ3JvdXA9XCIke2dyb3VwfVwiXG4gICAgICAgIGNsYXNzPVwicHJvZHVjdC1hZGp1c3Qtd2FyZWhvdXNlLXNlbGVjdCBzaGFkb3ctc20gYmctZ3JheS01MCBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHRleHQtZ3JheS05MDAgdGV4dC1zbSByb3VuZGVkLWxnIGZvY3VzOnJpbmctYmx1ZS02MDAgZm9jdXM6Ym9yZGVyLWJsdWUtNjAwIGJsb2NrIHctZnVsbCBwLTIuNSBkYXJrOmJnLWdyYXktNjAwIGRhcms6Ym9yZGVyLWdyYXktNTAwIGRhcms6cGxhY2Vob2xkZXItZ3JheS00MDAgZGFyazp0ZXh0LXdoaXRlIGRhcms6Zm9jdXM6cmluZy1ibHVlLTUwMCBkYXJrOmZvY3VzOmJvcmRlci1ibHVlLTUwMFwiXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiU29tZSBHcm91cFwiIHJlcXVpcmVkXG4gICAgICA+XG4gICAgICA8L3NlbGVjdD5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gICAgYFxuICAgIGNvbnN0IHNlbGVjdFdhcmVob3VzZTogSFRNTElucHV0RWxlbWVudCA9IG1hc3Rlckdyb3VwV2FyZWhvdXNlQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGAjd2FyZWhvdXNlLWFkanVzdC0ke2dyb3VwVW5kZXJTY29yZX1gXG4gICAgKVxuICAgIGNvbnN0IHByb2R1Y3RRdWFudGl0eTogSFRNTElucHV0RWxlbWVudCA9IGFkanVzdENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgI2FkanVzdC1wcm9kdWN0LXF1YW50aXR5LSR7Z3JvdXBVbmRlclNjb3JlfWBcbiAgICApXG5cbiAgICBmb3IgKGNvbnN0IHdhcmVob3VzZSBvZiBwcm9kdWN0UGFyYW0uYWxsX3dhcmVob3VzZXMpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJylcblxuICAgICAgICBvcHRpb24udmFsdWUgPSB3YXJlaG91c2UuaWQudG9TdHJpbmcoKVxuICAgICAgICBvcHRpb24udGV4dCA9IHdhcmVob3VzZS5uYW1lLnRvU3RyaW5nKClcbiAgICAgICAgc2VsZWN0V2FyZWhvdXNlLmFwcGVuZENoaWxkKG9wdGlvbilcbiAgICB9XG5cbiAgICBjb25zdCBwcm9kdWN0UXVhbnRpdHlWYWx1ZSA9IHByb2R1Y3RQYXJhbS5wcm9kdWN0X2luX3dhcmVob3VzZXNbZ3JvdXBdW3NlbGVjdFdhcmVob3VzZS52YWx1ZV0gfHwgMFxuXG4gICAgcHJvZHVjdFF1YW50aXR5LnZhbHVlID0gU3RyaW5nKHByb2R1Y3RRdWFudGl0eVZhbHVlKVxuXG4gICAgcHJvZHVjdFZpZXdUeXBlQ29udGFpbmVyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKFxuICAgICAgICBtYXN0ZXJHcm91cFdhcmVob3VzZUNvbnRhaW5lcixcbiAgICAgICAgcHJvZHVjdFZpZXdUeXBlQ29udGFpbmVyLm5leHRTaWJsaW5nXG4gICAgKVxuXG4gICAgc2VsZWN0V2FyZWhvdXNlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgY29uc3QgcHJvZHVjdEluV2FyZWhvdXNlcyA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdEluV2FyZWhvdXNlcycpKVxuICAgICAgICBjb25zdCBhdmFpbGFibGVRdWFudGl0eSA9IHByb2R1Y3RJbldhcmVob3VzZXNbZ3JvdXBdW3NlbGVjdFdhcmVob3VzZS52YWx1ZV0gfHwgMFxuICAgICAgICBwcm9kdWN0UXVhbnRpdHkudmFsdWUgPSBTdHJpbmcoYXZhaWxhYmxlUXVhbnRpdHkpXG4gICAgICAgIHByb2R1Y3RJbldhcmVob3VzZXNbZ3JvdXBdW3NlbGVjdFdhcmVob3VzZS52YWx1ZV0gPSBOdW1iZXIocHJvZHVjdFF1YW50aXR5LnZhbHVlKVxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdwcm9kdWN0SW5XYXJlaG91c2VzJywgSlNPTi5zdHJpbmdpZnkocHJvZHVjdEluV2FyZWhvdXNlcykpXG4gICAgfSlcblxuICAgIHByb2R1Y3RRdWFudGl0eS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2R1Y3RJbldhcmVob3VzZXMgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RJbldhcmVob3VzZXMnKSlcbiAgICAgICAgcHJvZHVjdEluV2FyZWhvdXNlc1tncm91cF1bc2VsZWN0V2FyZWhvdXNlLnZhbHVlXSA9IE51bWJlcihwcm9kdWN0UXVhbnRpdHkudmFsdWUpXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3Byb2R1Y3RJbldhcmVob3VzZXMnLCBKU09OLnN0cmluZ2lmeShwcm9kdWN0SW5XYXJlaG91c2VzKSlcbiAgICB9KVxufVxuXG5jb25zdCBhZGp1c3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcHJvZHVjdC1hZGp1c3Qtc3VibWl0LWJ0bmApXG5hZGp1c3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3QgcHJvZHVjdCA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdCcpKVxuICAgIGNvbnN0IGNzcmZUb2tlbklucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PignI2NzcmZfdG9rZW4nKVxuICAgIGNvbnN0IGNzcmZUb2tlbiA9IGNzcmZUb2tlbklucHV0ID8gY3NyZlRva2VuSW5wdXQudmFsdWUgOiAnJ1xuICAgIGFkanVzdFByb2R1Y3QocHJvZHVjdCwgY3NyZlRva2VuKVxufSlcblxuYXN5bmMgZnVuY3Rpb24gYWRqdXN0UHJvZHVjdChwcm9kdWN0UGFyYW06IElQcm9kdWN0LCBjc3JmVG9rZW46IHN0cmluZykge1xuICAgIGNvbnN0IGFkanVzdE5vdGU6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1hZGp1c3Qtbm90ZScpXG4gICAgY29uc3QgcHJvZHVjdEluV2FyZWhvdXNlcyA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdEluV2FyZWhvdXNlcycpKVxuXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgcHJvZHVjdF9pZDogcHJvZHVjdFBhcmFtLmlkLFxuICAgICAgICBncm91cHNfcXVhbnRpdHk6IEpTT04uc3RyaW5naWZ5KHByb2R1Y3RJbldhcmVob3VzZXMpLFxuICAgICAgICBub3RlOiBhZGp1c3ROb3RlLnZhbHVlLFxuICAgICAgICBjc3JmX3Rva2VuOiBjc3JmVG9rZW4sXG4gICAgfVxuXG4gICAgY29uc3QgYmFzZV91cmwgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luXG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvcHJvZHVjdC9hZGp1c3RgLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICB9KVxuXG4gICAgLy8gTk9URTogSWYgd2UgZG8gbm90IG5vdGlmeSB1c2VyIGFib3V0IGFkanVzdCwgZGVsZXRlIGlmIGVsc2Ugc3RhdGVtZW50XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAxKSB7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ3Byb2R1Y3RJbldhcmVob3VzZXMnKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ3Byb2R1Y3RJbldhcmVob3VzZXMnKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZGVsZXRlQWRqdXN0Q29udGFpbmVyKG5hbWVHcm91cDogc3RyaW5nLCBuYW1lR3JvdXBWYWx1ZTogc3RyaW5nKSB7XG4gICAgY29uc3QgYWRqdXN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3Byb2R1Y3QtYWRqdXN0LWNvbnRhaW5lci0ke25hbWVHcm91cFZhbHVlLnJlcGxhY2UoLyAvZywgJ18nKX1gKVxuICAgIGNvbnN0IG1hc3Rlckdyb3VwV2FyZWhvdXNlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYCNwcm9kdWN0LWFkanVzdC1wcm9kdWN0X2dyb3VwLWNvbnRhaW5lci0ke25hbWVHcm91cFZhbHVlLnJlcGxhY2UoLyAvZywgJ18nKX1gXG4gICAgKVxuICAgIGlmIChhZGp1c3RDb250YWluZXIpIHtcbiAgICAgICAgYWRqdXN0Q29udGFpbmVyLnJlbW92ZSgpXG4gICAgfVxuICAgIGlmIChtYXN0ZXJHcm91cFdhcmVob3VzZUNvbnRhaW5lcikge1xuICAgICAgICBtYXN0ZXJHcm91cFdhcmVob3VzZUNvbnRhaW5lci5yZW1vdmUoKVxuICAgIH1cbn1cblxuLy8gLS0tLWFkZCBpbmJvdW5kIG9yZGVyIGl0ZW0gZm9yIGVkaXQgbW9kYWwtLS0tXG5mdW5jdGlvbiBjcmVhdGVQcm9kdWN0R3JvdXBFZGl0SXRlbShcbiAgICBwcm9kdWN0UGFyYW06IElQcm9kdWN0ID0gbnVsbCxcbiAgICBtYXN0ZXJHcm91cDogc3RyaW5nID0gbnVsbCxcbiAgICBpdGVtSW5kZXg6IG51bWJlciA9IG51bGxcbikge1xuICAgIGlmICghcHJvZHVjdFBhcmFtKSB7XG4gICAgICAgIGNvbnN0IHByb2R1Y3Q6IElQcm9kdWN0ID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0JykpXG4gICAgICAgIHByb2R1Y3RQYXJhbSA9IHByb2R1Y3RcbiAgICB9XG5cbiAgICBjb25zdCBwcm9kdWN0R3JvdXBFZGl0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZ3JvdXAtZWRpdC1hZGQtY29udGFpbmVyJylcbiAgICBjb25zdCBwcm9kdWN0R3JvdXBFZGl0QWxsSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdC1ncm91cC1lZGl0LWFkZC1pdGVtJylcbiAgICBjb25zdCBpbmRleCA9IHByb2R1Y3RHcm91cEVkaXRBbGxJdGVtcy5sZW5ndGggKyAxXG4gICAgY29uc3QgcHJvZHVjdEdyb3VwRWRpdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG4gICAgcHJvZHVjdEdyb3VwRWRpdEl0ZW0uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgJ3AtNicsXG4gICAgICAgICdzcGFjZS15LTYnLFxuICAgICAgICAnYm9yZGVyLXQnLFxuICAgICAgICAncHJvZHVjdC1ncm91cC1lZGl0LWFkZC1pdGVtJyxcbiAgICAgICAgYGRlbGV0ZS1pZC0ke2luZGV4fWBcbiAgICApXG4gICAgcHJvZHVjdEdyb3VwRWRpdEl0ZW0uaW5uZXJIVE1MID0gYFxuICA8ZGl2IGNsYXNzPVwiZ3JpZCBncmlkLWNvbHMtMTIgZ2FwLTVcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sLXNwYW4tNiBzbTpjb2wtc3Bhbi00XCI+XG4gICAgICA8bGFiZWwgZm9yPVwic3RhdHVzXCIgY2xhc3M9XCJibG9jayBtYi0yIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtd2hpdGVcIj5NYXN0ZXJcbiAgICAgICAgR3JvdXA8L2xhYmVsPlxuICAgICAgPHNlbGVjdCB0eXBlPVwidGV4dFwiIG5hbWU9XCJhZGRfcHJvZHVjdFwiIGlkPVwicHJvZHVjdC1tYXN0ZXItZ3JvdXAtZWRpdC1pdGVtLSR7aW5kZXh9XCJcbiAgICAgICAgY2xhc3M9XCJwcm9kdWN0LW1hc3Rlci1ncm91cC1lZGl0LWl0ZW0gc2hhZG93LXNtIGJnLWdyYXktNTAgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCB0ZXh0LWdyYXktOTAwIHRleHQtc20gcm91bmRlZC1sZyBmb2N1czpyaW5nLWJsdWUtNjAwIGZvY3VzOmJvcmRlci1ibHVlLTYwMCBibG9jayB3LWZ1bGwgcC0yLjUgZGFyazpiZy1ncmF5LTYwMCBkYXJrOmJvcmRlci1ncmF5LTUwMCBkYXJrOnBsYWNlaG9sZGVyLWdyYXktNDAwIGRhcms6dGV4dC13aGl0ZSBkYXJrOmZvY3VzOnJpbmctYmx1ZS01MDAgZGFyazpmb2N1czpib3JkZXItYmx1ZS01MDBcIlxuICAgICAgICBwbGFjZWhvbGRlcj1cIk1hc3RlclxuICAgICAgICBHcm91cFwiIHJlcXVpcmVkPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCIgZGlzYWJsZWQgc2VsZWN0ZWQ+U2VsZWN0IG1hc3RlciBncm91cDwvb3B0aW9uPlxuICAgICAgPC9zZWxlY3Q+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbC1zcGFuLTYgc206Y29sLXNwYW4tNFwiPlxuICAgICAgPGxhYmVsIGZvcj1cInN0YXR1c1wiIGNsYXNzPVwiYmxvY2sgbWItMiB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDAgZGFyazp0ZXh0LXdoaXRlXCI+R3JvdXA8L2xhYmVsPlxuICAgICAgPHNlbGVjdCB0eXBlPVwidGV4dFwiIG5hbWU9XCJhZGRfZ3JvdXBcIiBpZD1cInByb2R1Y3QtZ3JvdXAtZWRpdC1pdGVtLSR7aW5kZXh9XCJcbiAgICAgICAgY2xhc3M9XCJwcm9kdWN0LWdyb3VwLWVkaXQtaXRlbSBzaGFkb3ctc20gYmctZ3JheS01MCBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHRleHQtZ3JheS05MDAgdGV4dC1zbSByb3VuZGVkLWxnIGZvY3VzOnJpbmctYmx1ZS02MDAgZm9jdXM6Ym9yZGVyLWJsdWUtNjAwIGJsb2NrIHctZnVsbCBwLTIuNSBkYXJrOmJnLWdyYXktNjAwIGRhcms6Ym9yZGVyLWdyYXktNTAwIGRhcms6cGxhY2Vob2xkZXItZ3JheS00MDAgZGFyazp0ZXh0LXdoaXRlIGRhcms6Zm9jdXM6cmluZy1ibHVlLTUwMCBkYXJrOmZvY3VzOmJvcmRlci1ibHVlLTUwMFwiXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiR3JvdXBcIiByZXF1aXJlZD5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiIGRpc2FibGVkIHNlbGVjdGVkPlNlbGVjdCBncm91cDwvb3B0aW9uPlxuICAgICAgPC9zZWxlY3Q+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbC1zcGFuLTYgc206Y29sLXNwYW4tNFwiPlxuICAgICAgPGxhYmVsIGZvcj1cInN0YXR1c1wiIGNsYXNzPVwiYmxvY2sgbWItMiB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDAgZGFyazp0ZXh0LXdoaXRlXCI+QWN0aW9uPC9sYWJlbD5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRhdGEtdGFyZ2V0PVwiXCJcbiAgICAgICAgY2xhc3M9XCJwcm9kdWN0LWdyb3VwLWVkaXQtZGVsZXRlLWl0ZW0tYnRuIGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBweC0zIHB5LTIgbXItMyB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtY2VudGVyIHRleHQtd2hpdGUgcm91bmRlZC1sZyBiZy1yZWQtNjAwIGhvdmVyOmJnLXJlZC04MDAgZm9jdXM6cmluZy00IGZvY3VzOnJpbmctcmVkLTMwMCBkYXJrOmZvY3VzOnJpbmctcmVkLTkwMFwiPlxuICAgICAgICA8c3ZnIGNsYXNzPVwidy02IGgtNlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiB2aWV3Qm94PVwiMCAwIDQ0OCA1MTJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgIGQ9XCJNMTM1LjIgMTcuN0MxNDAuNiA2LjggMTUxLjcgMCAxNjMuOCAwSDI4NC4yYzEyLjEgMCAyMy4yIDYuOCAyOC42IDE3LjdMMzIwIDMyaDk2YzE3LjcgMCAzMiAxNC4zIDMyIDMycy0xNC4zIDMyLTMyIDMySDMyQzE0LjMgOTYgMCA4MS43IDAgNjRTMTQuMyAzMiAzMiAzMmg5Nmw3LjItMTQuM3pNMzIgMTI4SDQxNlY0NDhjMCAzNS4zLTI4LjcgNjQtNjQgNjRIOTZjLTM1LjMgMC02NC0yOC43LTY0LTY0VjEyOHptOTYgNjRjLTguOCAwLTE2IDcuMi0xNiAxNlY0MzJjMCA4LjggNy4yIDE2IDE2IDE2czE2LTcuMiAxNi0xNlYyMDhjMC04LjgtNy4yLTE2LTE2LTE2em05NiAwYy04LjggMC0xNiA3LjItMTYgMTZWNDMyYzAgOC44IDcuMiAxNiAxNiAxNnMxNi03LjIgMTYtMTZWMjA4YzAtOC44LTcuMi0xNi0xNi0xNnptOTYgMGMtOC44IDAtMTYgNy4yLTE2IDE2VjQzMmMwIDguOCA3LjIgMTYgMTYgMTZzMTYtNy4yIDE2LTE2VjIwOGMwLTguOC03LjItMTYtMTYtMTZ6XCI+XG4gICAgICAgICAgPC9wYXRoPlxuICAgICAgICA8L3N2Zz5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgaWQ9XCJwcm9kdWN0LWdyb3VwLWVkaXQtYWRkLWl0ZW0tYnRuLSR7aW5kZXh9XCJcbiAgICAgICAgY2xhc3M9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgcHgtMyBweS0yIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1jZW50ZXIgdGV4dC13aGl0ZSByb3VuZGVkLWxnIGJnLXllbGxvdy00MDAgaG92ZXI6YmcteWVsbG93LTUwMCBmb2N1czpyaW5nLTQgZm9jdXM6cmluZy1yZWQtMzAwXCI+XG4gICAgICAgIDxzdmcgY2xhc3M9XCJ3LTYgaC02XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgNDQ4IDUxMlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgZD1cIk02NCA4MGMtOC44IDAtMTYgNy4yLTE2IDE2VjQxNmMwIDguOCA3LjIgMTYgMTYgMTZIMzg0YzguOCAwIDE2LTcuMiAxNi0xNlY5NmMwLTguOC03LjItMTYtMTYtMTZINjR6TTAgOTZDMCA2MC43IDI4LjcgMzIgNjQgMzJIMzg0YzM1LjMgMCA2NCAyOC43IDY0IDY0VjQxNmMwIDM1LjMtMjguNyA2NC02NCA2NEg2NGMtMzUuMyAwLTY0LTI4LjctNjQtNjRWOTZ6TTIwMCAzNDRWMjgwSDEzNmMtMTMuMyAwLTI0LTEwLjctMjQtMjRzMTAuNy0yNCAyNC0yNGg2NFYxNjhjMC0xMy4zIDEwLjctMjQgMjQtMjRzMjQgMTAuNyAyNCAyNHY2NGg2NGMxMy4zIDAgMjQgMTAuNyAyNCAyNHMtMTAuNyAyNC0yNCAyNEgyNDh2NjRjMCAxMy4zLTEwLjcgMjQtMjQgMjRzLTI0LTEwLjctMjQtMjR6XCI+XG4gICAgICAgICAgPC9wYXRoPlxuICAgICAgICA8L3N2Zz5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgYFxuXG4gICAgY29uc3QgcHJvZHVjdEdyb3VwRWRpdFNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQgPSBwcm9kdWN0R3JvdXBFZGl0SXRlbS5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdC1ncm91cC1lZGl0LWl0ZW0nKVxuICAgIGNvbnN0IGF2YWlsYWJsZU1hc3Rlckdyb3VwcyA9IE9iamVjdC5rZXlzKHByb2R1Y3RQYXJhbS5tc3RyX3Byb2RfZ3Jwc19wcm9kX2dycHNfbmFtZXMpXG4gICAgY29uc3QgcHJvZHVjdE1hc3Rlckdyb3VwRWRpdFNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQgPSBwcm9kdWN0R3JvdXBFZGl0SXRlbS5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgI3Byb2R1Y3QtbWFzdGVyLWdyb3VwLWVkaXQtaXRlbS0ke2luZGV4fWBcbiAgICApXG4gICAgYXZhaWxhYmxlTWFzdGVyR3JvdXBzLmZvckVhY2goKG1hc3Rlckdyb3VwKSA9PiB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpXG4gICAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgbWFzdGVyR3JvdXApXG4gICAgICAgIG9wdGlvbi5pbm5lckhUTUwgPSBtYXN0ZXJHcm91cFxuICAgICAgICBwcm9kdWN0TWFzdGVyR3JvdXBFZGl0U2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbilcbiAgICB9KVxuICAgIGlmIChtYXN0ZXJHcm91cCkge1xuICAgICAgICBwcm9kdWN0TWFzdGVyR3JvdXBFZGl0U2VsZWN0LnZhbHVlID0gbWFzdGVyR3JvdXBcbiAgICAgICAgcHJvZHVjdFBhcmFtLm1zdHJfcHJvZF9ncnBzX3Byb2RfZ3Jwc19uYW1lc1ttYXN0ZXJHcm91cF0uZm9yRWFjaChcbiAgICAgICAgICAgIChncm91cDogeyBncm91cF9uYW1lOiBzdHJpbmc7IGdyb3VwX2lkOiBudW1iZXIgfSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RHcm91cFNlbGVjdE9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpXG4gICAgICAgICAgICAgICAgcHJvZHVjdEdyb3VwU2VsZWN0T3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBncm91cC5ncm91cF9pZC50b1N0cmluZygpKVxuICAgICAgICAgICAgICAgIHByb2R1Y3RHcm91cFNlbGVjdE9wdGlvbi50ZXh0Q29udGVudCA9IGdyb3VwLmdyb3VwX25hbWVcbiAgICAgICAgICAgICAgICBwcm9kdWN0R3JvdXBFZGl0U2VsZWN0LmFwcGVuZENoaWxkKHByb2R1Y3RHcm91cFNlbGVjdE9wdGlvbilcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgICAvLyBUT0RPOiBhbHdheXMgc2VsZWN0IGZpcnN0IG9wdGlvblxuICAgICAgICBpZiAoIWl0ZW1JbmRleCkge1xuICAgICAgICAgICAgaXRlbUluZGV4ID0gMFxuICAgICAgICB9XG4gICAgICAgIHByb2R1Y3RHcm91cEVkaXRTZWxlY3QudmFsdWUgPVxuICAgICAgICAgICAgcHJvZHVjdFBhcmFtLm1zdHJfZ3Jwc19ncnBzX25hbWVzX2luX3Byb2RbbWFzdGVyR3JvdXBdW2l0ZW1JbmRleF0uZ3JvdXBfaWQudG9TdHJpbmcoKVxuICAgIH1cblxuICAgIGNvbnN0IG9wdGlvbnMgPSBwcm9kdWN0TWFzdGVyR3JvdXBFZGl0U2VsZWN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ29wdGlvbicpXG4gICAgcHJvZHVjdE1hc3Rlckdyb3VwRWRpdFNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgIG9wdGlvbnMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGUudGV4dENvbnRlbnQgPT09IHByb2R1Y3RNYXN0ZXJHcm91cEVkaXRTZWxlY3Qub3B0aW9uc1twcm9kdWN0TWFzdGVyR3JvdXBFZGl0U2VsZWN0LnNlbGVjdGVkSW5kZXhdLnRleHRcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbkNhdGVnb3J5ID1cbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdFBhcmFtLm1zdHJfcHJvZF9ncnBzX3Byb2RfZ3Jwc19uYW1lc1tcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RNYXN0ZXJHcm91cEVkaXRTZWxlY3Qub3B0aW9uc1twcm9kdWN0TWFzdGVyR3JvdXBFZGl0U2VsZWN0LnNlbGVjdGVkSW5kZXhdLnRleHRcbiAgICAgICAgICAgICAgICAgICAgXVxuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHByb2R1Y3QtZ3JvdXAtZWRpdC1pdGVtLSR7aW5kZXh9YCkuaW5uZXJIVE1MID0gJydcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9uQ2F0ZWdvcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uQ2F0ZWdvcnkuZm9yRWFjaCgoZ3JvdXA6IHsgZ3JvdXBfbmFtZTogc3RyaW5nOyBncm91cF9pZDogbnVtYmVyIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0b3JlU2VsZWN0T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJylcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlU2VsZWN0T3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBncm91cC5ncm91cF9pZC50b1N0cmluZygpKVxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmVTZWxlY3RPcHRpb24udGV4dENvbnRlbnQgPSBncm91cC5ncm91cF9uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0R3JvdXBFZGl0U2VsZWN0LmFwcGVuZENoaWxkKHN0b3JlU2VsZWN0T3B0aW9uKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxuICAgIHByb2R1Y3RHcm91cEVkaXRDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvZHVjdEdyb3VwRWRpdEl0ZW0pXG5cbiAgICBjb25zdCBhZGRCdXR0b24gPSBwcm9kdWN0R3JvdXBFZGl0SXRlbS5xdWVyeVNlbGVjdG9yKGAjcHJvZHVjdC1ncm91cC1lZGl0LWFkZC1pdGVtLWJ0bi0ke2luZGV4fWApXG5cbiAgICBhZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNyZWF0ZVByb2R1Y3RHcm91cEVkaXRJdGVtKClcbiAgICB9KVxuXG4gICAgY29uc3QgZGVsZXRlQnV0dG9uID0gcHJvZHVjdEdyb3VwRWRpdEl0ZW0ucXVlcnlTZWxlY3RvcignLnByb2R1Y3QtZ3JvdXAtZWRpdC1kZWxldGUtaXRlbS1idG4nKVxuICAgIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgaW5ib3VuZE9yZGVySXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5kZWxldGUtaWQtJHtpbmRleH1gKVxuICAgICAgICBpZiAoaW5ib3VuZE9yZGVySXRlbSkge1xuICAgICAgICAgICAgaW5ib3VuZE9yZGVySXRlbS5yZW1vdmUoKVxuICAgICAgICB9XG4gICAgfSlcbn1cblxuLy8gdGhpcyBidXR0b24gbmVlZCB0byBhZGQgZmlyc3QgaXRlbSBmcm9tIHRlbXBsYXRlXG5jb25zdCBwcm9kdWN0R3JvdXBFZGl0QnRuQnlJZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWdyb3VwLWVkaXQtYWRkLWl0ZW0tYnRuJylcbnByb2R1Y3RHcm91cEVkaXRCdG5CeUlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNyZWF0ZVByb2R1Y3RHcm91cEVkaXRJdGVtKClcbn0pXG5cbi8vIC0tLS1zZXQgcHJvZHVjdCB0byBKU09OIGhpZGRlbiBpbnB1dCBpbiBpbmJvdW5kLW9yZGVyLWVkaXQtZm9ybS0tLS1cbmZ1bmN0aW9uIHNldFByb2R1Y3RzKHR5cGVNb2RhbDogc3RyaW5nKSB7XG4gICAgY29uc3QgcHJvZHVjdEdyb3VwSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAucHJvZHVjdC1ncm91cC0ke3R5cGVNb2RhbH0tYWRkLWl0ZW1gKVxuXG4gICAgY29uc3QgcHJvZHVjdHMgPSBbXVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9kdWN0R3JvdXBJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBwcm9kdWN0R3JvdXBJdGVtOiBIVE1MU2VsZWN0RWxlbWVudCA9IHByb2R1Y3RHcm91cEl0ZW1zW2ldLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICBgLnByb2R1Y3QtZ3JvdXAtJHt0eXBlTW9kYWx9LWl0ZW1gXG4gICAgICAgIClcblxuICAgICAgICBjb25zdCBwcm9kdWN0ID0gTnVtYmVyKHByb2R1Y3RHcm91cEl0ZW0udmFsdWUpXG4gICAgICAgIHByb2R1Y3RzLnB1c2gocHJvZHVjdClcbiAgICB9XG5cbiAgICBjb25zdCBpbnB1dFByb2R1Y3RzOiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3Byb2R1Y3QtJHt0eXBlTW9kYWx9LXByb2R1Y3QtZ3JvdXBzYClcbiAgICBpbnB1dFByb2R1Y3RzLnZhbHVlID0gSlNPTi5zdHJpbmdpZnkocHJvZHVjdHMpXG5cbiAgICByZXR1cm4gdHJ1ZVxufVxuXG4vLyAtLS0tc3VibWl0IGVkaXQgZm9ybSB0aHJvdWdoIGhpZGRlbiBzdWJtaXQgYnV0dG9uLS0tLVxuY29uc3QgcHJvZHVjdEVkaXRTdWJtaXRCdXR0b246IEhUTUxCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC1zdWJtaXQtYnRuJylcbmNvbnN0IHByb2R1Y3RFZGl0U2F2ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWVkaXQtc2F2ZS1wcm9kdWN0cy1idG4nKVxuXG5wcm9kdWN0RWRpdFNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gc2V0UHJvZHVjdHMoJ2VkaXQnKVxuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgcHJvZHVjdEVkaXRTdWJtaXRCdXR0b24uY2xpY2soKVxuICAgIH1cbn0pXG5cbi8vIC0tLS1hZGQgcHJvZHVjdCBncm91cCBpdGVtIGZvciBlZGl0IG1vZGFsLS0tLVxuZnVuY3Rpb24gY3JlYXRlUHJvZHVjdEdyb3VwQWRkSXRlbShncm91cHM6IElQcm9kdWN0TWFzdGVyR3JvdXBHcm91cCA9IG51bGwpIHtcbiAgICBpZiAoIWdyb3Vwcykge1xuICAgICAgICBncm91cHMgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2dyb3VwcycpKVxuICAgIH1cbiAgICBjb25zdCBwcm9kdWN0R3JvdXBBZGRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ncm91cC1hZGQtYWRkLWNvbnRhaW5lcicpXG4gICAgY29uc3QgcHJvZHVjdEdyb3VwRWRpdE9yaWdpbmFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZ3JvdXAtYWRkLWl0ZW0nKVxuICAgIGNvbnN0IHByb2R1Y3RHcm91cEFkZEFsbEl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3QtZ3JvdXAtYWRkLWFkZC1pdGVtJylcbiAgICBjb25zdCBpbmRleCA9IHByb2R1Y3RHcm91cEFkZEFsbEl0ZW1zLmxlbmd0aCArIDFcbiAgICBjb25zdCBwcm9kdWN0R3JvdXBBZGRJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcblxuICAgIHByb2R1Y3RHcm91cEFkZEl0ZW0uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgJ3AtNicsXG4gICAgICAgICdzcGFjZS15LTYnLFxuICAgICAgICAnYm9yZGVyLXQnLFxuICAgICAgICAncHJvZHVjdC1ncm91cC1hZGQtYWRkLWl0ZW0nLFxuICAgICAgICBgZGVsZXRlLWlkLSR7aW5kZXh9YFxuICAgIClcbiAgICBwcm9kdWN0R3JvdXBBZGRJdGVtLmlubmVySFRNTCA9IGBcbiAgPGRpdiBjbGFzcz1cImdyaWQgZ3JpZC1jb2xzLTEyIGdhcC01XCI+XG4gICAgPGRpdiBjbGFzcz1cImNvbC1zcGFuLTYgc206Y29sLXNwYW4tNFwiPlxuICAgICAgPGxhYmVsIGZvcj1cInN0YXR1c1wiIGNsYXNzPVwiYmxvY2sgbWItMiB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDAgZGFyazp0ZXh0LXdoaXRlXCI+TWFzdGVyXG4gICAgICAgIEdyb3VwPC9sYWJlbD5cbiAgICAgIDxzZWxlY3QgdHlwZT1cInRleHRcIiBuYW1lPVwiYWRkX3Byb2R1Y3RcIiBpZD1cInByb2R1Y3QtbWFzdGVyLWdyb3VwLWFkZC1pdGVtLSR7aW5kZXh9XCJcbiAgICAgICAgY2xhc3M9XCJwcm9kdWN0LW1hc3Rlci1ncm91cC1hZGQtaXRlbSBzaGFkb3ctc20gYmctZ3JheS01MCBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHRleHQtZ3JheS05MDAgdGV4dC1zbSByb3VuZGVkLWxnIGZvY3VzOnJpbmctYmx1ZS02MDAgZm9jdXM6Ym9yZGVyLWJsdWUtNjAwIGJsb2NrIHctZnVsbCBwLTIuNSBkYXJrOmJnLWdyYXktNjAwIGRhcms6Ym9yZGVyLWdyYXktNTAwIGRhcms6cGxhY2Vob2xkZXItZ3JheS00MDAgZGFyazp0ZXh0LXdoaXRlIGRhcms6Zm9jdXM6cmluZy1ibHVlLTUwMCBkYXJrOmZvY3VzOmJvcmRlci1ibHVlLTUwMFwiXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiTWFzdGVyXG4gICAgICAgIEdyb3VwXCIgcmVxdWlyZWQ+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIiBkaXNhYmxlZCBzZWxlY3RlZD5TZWxlY3QgbWFzdGVyIGdyb3VwPC9vcHRpb24+XG4gICAgICA8L3NlbGVjdD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sLXNwYW4tNiBzbTpjb2wtc3Bhbi00XCI+XG4gICAgICA8bGFiZWwgZm9yPVwic3RhdHVzXCIgY2xhc3M9XCJibG9jayBtYi0yIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtd2hpdGVcIj5Hcm91cDwvbGFiZWw+XG4gICAgICA8c2VsZWN0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImFkZF9ncm91cFwiIGlkPVwicHJvZHVjdC1ncm91cC1hZGQtaXRlbS0ke2luZGV4fVwiXG4gICAgICAgIGNsYXNzPVwicHJvZHVjdC1ncm91cC1hZGQtaXRlbSBzaGFkb3ctc20gYmctZ3JheS01MCBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHRleHQtZ3JheS05MDAgdGV4dC1zbSByb3VuZGVkLWxnIGZvY3VzOnJpbmctYmx1ZS02MDAgZm9jdXM6Ym9yZGVyLWJsdWUtNjAwIGJsb2NrIHctZnVsbCBwLTIuNSBkYXJrOmJnLWdyYXktNjAwIGRhcms6Ym9yZGVyLWdyYXktNTAwIGRhcms6cGxhY2Vob2xkZXItZ3JheS00MDAgZGFyazp0ZXh0LXdoaXRlIGRhcms6Zm9jdXM6cmluZy1ibHVlLTUwMCBkYXJrOmZvY3VzOmJvcmRlci1ibHVlLTUwMFwiXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiR3JvdXBcIiByZXF1aXJlZD5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiIGRpc2FibGVkIHNlbGVjdGVkPlNlbGVjdCBncm91cDwvb3B0aW9uPlxuICAgICAgPC9zZWxlY3Q+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbC1zcGFuLTYgc206Y29sLXNwYW4tNFwiPlxuICAgICAgPGxhYmVsIGZvcj1cInN0YXR1c1wiIGNsYXNzPVwiYmxvY2sgbWItMiB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDAgZGFyazp0ZXh0LXdoaXRlXCI+QWN0aW9uPC9sYWJlbD5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRhdGEtdGFyZ2V0PVwiXCJcbiAgICAgICAgY2xhc3M9XCJwcm9kdWN0LWdyb3VwLWFkZC1kZWxldGUtaXRlbS1idG4gaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIHB4LTMgcHktMiBtci0zIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1jZW50ZXIgdGV4dC13aGl0ZSByb3VuZGVkLWxnIGJnLXJlZC02MDAgaG92ZXI6YmctcmVkLTgwMCBmb2N1czpyaW5nLTQgZm9jdXM6cmluZy1yZWQtMzAwIGRhcms6Zm9jdXM6cmluZy1yZWQtOTAwXCI+XG4gICAgICAgIDxzdmcgY2xhc3M9XCJ3LTYgaC02XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgNDQ4IDUxMlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgZD1cIk0xMzUuMiAxNy43QzE0MC42IDYuOCAxNTEuNyAwIDE2My44IDBIMjg0LjJjMTIuMSAwIDIzLjIgNi44IDI4LjYgMTcuN0wzMjAgMzJoOTZjMTcuNyAwIDMyIDE0LjMgMzIgMzJzLTE0LjMgMzItMzIgMzJIMzJDMTQuMyA5NiAwIDgxLjcgMCA2NFMxNC4zIDMyIDMyIDMyaDk2bDcuMi0xNC4zek0zMiAxMjhINDE2VjQ0OGMwIDM1LjMtMjguNyA2NC02NCA2NEg5NmMtMzUuMyAwLTY0LTI4LjctNjQtNjRWMTI4em05NiA2NGMtOC44IDAtMTYgNy4yLTE2IDE2VjQzMmMwIDguOCA3LjIgMTYgMTYgMTZzMTYtNy4yIDE2LTE2VjIwOGMwLTguOC03LjItMTYtMTYtMTZ6bTk2IDBjLTguOCAwLTE2IDcuMi0xNiAxNlY0MzJjMCA4LjggNy4yIDE2IDE2IDE2czE2LTcuMiAxNi0xNlYyMDhjMC04LjgtNy4yLTE2LTE2LTE2em05NiAwYy04LjggMC0xNiA3LjItMTYgMTZWNDMyYzAgOC44IDcuMiAxNiAxNiAxNnMxNi03LjIgMTYtMTZWMjA4YzAtOC44LTcuMi0xNi0xNi0xNnpcIj5cbiAgICAgICAgICA8L3BhdGg+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBpZD1cInByb2R1Y3QtZ3JvdXAtYWRkLWFkZC1pdGVtLWJ0bi0ke2luZGV4fVwiXG4gICAgICAgIGNsYXNzPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIHB4LTMgcHktMiB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtY2VudGVyIHRleHQtd2hpdGUgcm91bmRlZC1sZyBiZy15ZWxsb3ctNDAwIGhvdmVyOmJnLXllbGxvdy01MDAgZm9jdXM6cmluZy00IGZvY3VzOnJpbmctcmVkLTMwMFwiPlxuICAgICAgICA8c3ZnIGNsYXNzPVwidy02IGgtNlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiB2aWV3Qm94PVwiMCAwIDQ0OCA1MTJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgIGQ9XCJNNjQgODBjLTguOCAwLTE2IDcuMi0xNiAxNlY0MTZjMCA4LjggNy4yIDE2IDE2IDE2SDM4NGM4LjggMCAxNi03LjIgMTYtMTZWOTZjMC04LjgtNy4yLTE2LTE2LTE2SDY0ek0wIDk2QzAgNjAuNyAyOC43IDMyIDY0IDMySDM4NGMzNS4zIDAgNjQgMjguNyA2NCA2NFY0MTZjMCAzNS4zLTI4LjcgNjQtNjQgNjRINjRjLTM1LjMgMC02NC0yOC43LTY0LTY0Vjk2ek0yMDAgMzQ0VjI4MEgxMzZjLTEzLjMgMC0yNC0xMC43LTI0LTI0czEwLjctMjQgMjQtMjRoNjRWMTY4YzAtMTMuMyAxMC43LTI0IDI0LTI0czI0IDEwLjcgMjQgMjR2NjRoNjRjMTMuMyAwIDI0IDEwLjcgMjQgMjRzLTEwLjcgMjQtMjQgMjRIMjQ4djY0YzAgMTMuMy0xMC43IDI0LTI0IDI0cy0yNC0xMC43LTI0LTI0elwiPlxuICAgICAgICAgIDwvcGF0aD5cbiAgICAgICAgPC9zdmc+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIGBcblxuICAgIGNvbnN0IHByb2R1Y3RNYXN0ZXJHcm91cEFkZFNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQgPSBwcm9kdWN0R3JvdXBBZGRJdGVtLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGAjcHJvZHVjdC1tYXN0ZXItZ3JvdXAtYWRkLWl0ZW0tJHtpbmRleH1gXG4gICAgKVxuICAgIGNvbnN0IHByb2R1Y3RHcm91cEFkZFNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQgPSBwcm9kdWN0R3JvdXBBZGRJdGVtLnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0LWdyb3VwLWFkZC1pdGVtJylcbiAgICBjb25zdCBhdmFpbGFibGVNYXN0ZXJHcm91cHMgPSBPYmplY3Qua2V5cyhncm91cHMpXG5cbiAgICBhdmFpbGFibGVNYXN0ZXJHcm91cHMuZm9yRWFjaCgobWFzdGVyR3JvdXApID0+IHtcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJylcbiAgICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBtYXN0ZXJHcm91cClcbiAgICAgICAgb3B0aW9uLmlubmVySFRNTCA9IG1hc3Rlckdyb3VwXG4gICAgICAgIHByb2R1Y3RNYXN0ZXJHcm91cEFkZFNlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pXG4gICAgfSlcbiAgICBjb25zdCBvcHRpb25zID0gcHJvZHVjdE1hc3Rlckdyb3VwQWRkU2VsZWN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ29wdGlvbicpXG5cbiAgICBwcm9kdWN0TWFzdGVyR3JvdXBBZGRTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICBvcHRpb25zLmZvckVhY2goKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLnRleHRDb250ZW50ID09PSBwcm9kdWN0TWFzdGVyR3JvdXBBZGRTZWxlY3Qub3B0aW9uc1twcm9kdWN0TWFzdGVyR3JvdXBBZGRTZWxlY3Quc2VsZWN0ZWRJbmRleF0udGV4dCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbkNhdGVnb3J5ID1cbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBzW3Byb2R1Y3RNYXN0ZXJHcm91cEFkZFNlbGVjdC5vcHRpb25zW3Byb2R1Y3RNYXN0ZXJHcm91cEFkZFNlbGVjdC5zZWxlY3RlZEluZGV4XS50ZXh0XVxuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHByb2R1Y3QtZ3JvdXAtYWRkLWl0ZW0tJHtpbmRleH1gKS5pbm5lckhUTUwgPSAnJ1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25DYXRlZ29yeSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25DYXRlZ29yeS5mb3JFYWNoKChncm91cDogeyBncm91cF9uYW1lOiBzdHJpbmc7IGdyb3VwX2lkOiBudW1iZXIgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RvcmVTZWxlY3RPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKVxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmVTZWxlY3RPcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsIGdyb3VwLmdyb3VwX2lkLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9yZVNlbGVjdE9wdGlvbi50ZXh0Q29udGVudCA9IGdyb3VwLmdyb3VwX25hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RHcm91cEFkZFNlbGVjdC5hcHBlbmRDaGlsZChzdG9yZVNlbGVjdE9wdGlvbilcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIHByb2R1Y3RHcm91cEFkZENvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9kdWN0R3JvdXBBZGRJdGVtKVxuXG4gICAgY29uc3QgYWRkQnV0dG9uID0gcHJvZHVjdEdyb3VwQWRkSXRlbS5xdWVyeVNlbGVjdG9yKGAjcHJvZHVjdC1ncm91cC1hZGQtYWRkLWl0ZW0tYnRuLSR7aW5kZXh9YClcblxuICAgIGFkZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY3JlYXRlUHJvZHVjdEdyb3VwQWRkSXRlbSgpXG4gICAgfSlcblxuICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IHByb2R1Y3RHcm91cEFkZEl0ZW0ucXVlcnlTZWxlY3RvcignLnByb2R1Y3QtZ3JvdXAtYWRkLWRlbGV0ZS1pdGVtLWJ0bicpXG4gICAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBpbmJvdW5kT3JkZXJJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmRlbGV0ZS1pZC0ke2luZGV4fWApXG4gICAgICAgIGlmIChpbmJvdW5kT3JkZXJJdGVtKSB7XG4gICAgICAgICAgICBpbmJvdW5kT3JkZXJJdGVtLnJlbW92ZSgpXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG4vLyB0aGlzIGJ1dHRvbiBuZWVkIHRvIGFkZCBmaXJzdCBpdGVtIGZyb20gdGVtcGxhdGVcbmNvbnN0IHByb2R1Y3RHcm91cEFkZEJ0bkJ5SWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ncm91cC1hZGQtYWRkLWl0ZW0tYnRuJylcbnByb2R1Y3RHcm91cEFkZEJ0bkJ5SWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY3JlYXRlUHJvZHVjdEdyb3VwQWRkSXRlbSgpXG59KVxuXG4vLyAtLS0tc3VibWl0IGFkZCBmb3JtIHRocm91Z2ggaGlkZGVuIHN1Ym1pdCBidXR0b24tLS0tXG5jb25zdCBwcm9kdWN0QWRkU3VibWl0QnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWFkZC1zdWJtaXQtYnRuJylcbmNvbnN0IHByb2R1Y3RBZGRTYXZlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtYWRkLXNhdmUtcHJvZHVjdHMtYnRuJylcblxucHJvZHVjdEFkZFNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gc2V0UHJvZHVjdHMoJ2FkZCcpXG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgICBwcm9kdWN0QWRkU3VibWl0QnV0dG9uLmNsaWNrKClcbiAgICB9XG59KVxuXG4vLyAtLS0tY2xlYXIgcHJvZHVjdCBncm91cCBjb250YWluZXItLS0tXG5mdW5jdGlvbiBjbGVhclByb2R1Y3RHcm91cENvbnRhaW5lcigpIHtcbiAgICBjb25zdCBwcm9kdWN0R3JvdXBFZGl0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZ3JvdXAtZWRpdC1hZGQtY29udGFpbmVyJylcbiAgICBjb25zdCBwcm9kdWN0R3JvdXBFZGl0SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdC1ncm91cC1lZGl0LWFkZC1pdGVtJylcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHByb2R1Y3RHcm91cEVkaXRJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwcm9kdWN0R3JvdXBFZGl0Q29udGFpbmVyLnJlbW92ZUNoaWxkKHByb2R1Y3RHcm91cEVkaXRJdGVtc1tpXSlcbiAgICB9XG4gICAgY29uc3QgcHJvZHVjdEdyb3VwRWRpdFNlbGVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdC1ncm91cC1lZGl0LWFkZC1pdGVtJylcbn1cblxuLy8gLS0tLXByb2R1Y3Qgc2hvdyBzdG9ja3Mgb3duIGJ5IG1lLS0tLVxuY29uc3Qgc2hvd1Byb2R1Y3RCeVVzZXJHcm91cENoZWNrYm94OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtc2hvdy1zdG9ja3Mtb3duLWJ5LW1lLWJ0bicpXG5pZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLmhhc2ggPT09ICcvcHJvZHVjdC9zdG9ja3Nfb3duZWRfYnlfbWUnKSB7XG4gICAgd2luZG93Lm9ubG9hZCA9IChldmVudCkgPT4ge1xuICAgICAgICBzaG93UHJvZHVjdEJ5VXNlckdyb3VwQ2hlY2tib3guc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ2NoZWNrZWQnKVxuICAgIH1cbn1cbnNob3dQcm9kdWN0QnlVc2VyR3JvdXBDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBhc3luYyAoKSA9PiB7XG4gICAgaWYgKHNob3dQcm9kdWN0QnlVc2VyR3JvdXBDaGVja2JveC5jaGVja2VkKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvZHVjdC9zdG9ja3Nfb3duZWRfYnlfbWUnLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlc3BvbnNlLnVybFxuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL3Byb2R1Y3QvYCwge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZXNwb25zZS51cmxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxuICAgICAgICB9XG4gICAgfVxufSlcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtYXNzaWduLW1hc3Rlci1ncm91cCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICBjb25zdCBwcm9kdWN0QXNzaWduTWFzdGVyR3JvdXBTZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtYXNzaWduLW1hc3Rlci1ncm91cCcpXG4gICAgY29uc3QgcHJvZHVjdEFzc2lnbkdyb3VwU2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWFzc2lnbi1ncm91cCcpXG4gICAgY29uc3QgZ3JvdXBzOiBJTWFzdGVyR3JvdXAgPSBKU09OLnBhcnNlKFxuICAgICAgICBwcm9kdWN0QXNzaWduTWFzdGVyR3JvdXBTZWxlY3RbcHJvZHVjdEFzc2lnbk1hc3Rlckdyb3VwU2VsZWN0LnNlbGVjdGVkSW5kZXhdLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKVxuICAgIClcbiAgICBjb25zdCBhdmFpbGFibGVNYXN0ZXJHcm91cHMgPSBPYmplY3Qua2V5cyhncm91cHMubWFzdGVyX2dyb3Vwc19saXN0X2dyb3VwcylcblxuICAgIHByb2R1Y3RBc3NpZ25Hcm91cFNlbGVjdC5pbm5lckhUTUwgPSAnJ1xuXG4gICAgYXZhaWxhYmxlTWFzdGVyR3JvdXBzLmZvckVhY2goKG1hc3Rlckdyb3VwKSA9PiB7XG4gICAgICAgIGlmIChtYXN0ZXJHcm91cCA9PT0gcHJvZHVjdEFzc2lnbk1hc3Rlckdyb3VwU2VsZWN0Lm9wdGlvbnNbcHJvZHVjdEFzc2lnbk1hc3Rlckdyb3VwU2VsZWN0LnNlbGVjdGVkSW5kZXhdLnRleHQpIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbkNhdGVnb3J5ID0gZ3JvdXBzLm1hc3Rlcl9ncm91cHNfbGlzdF9ncm91cHNbbWFzdGVyR3JvdXBdXG5cbiAgICAgICAgICAgIGlmIChvcHRpb25DYXRlZ29yeSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbkNhdGVnb3J5LmZvckVhY2goKGdyb3VwOiB7IGdyb3VwX25hbWU6IHN0cmluZzsgZ3JvdXBfaWQ6IG51bWJlciB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0b3JlU2VsZWN0T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJylcbiAgICAgICAgICAgICAgICAgICAgc3RvcmVTZWxlY3RPcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsIGdyb3VwLmdyb3VwX2lkLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICAgICAgICAgIHN0b3JlU2VsZWN0T3B0aW9uLnRleHRDb250ZW50ID0gZ3JvdXAuZ3JvdXBfbmFtZVxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0QXNzaWduR3JvdXBTZWxlY3QuYXBwZW5kQ2hpbGQoc3RvcmVTZWxlY3RPcHRpb24pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG59KVxuXG4vLyAtLS1pbWFnZSBjb21wcmVzc29yLS0tLVxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2R1Y3QtYWRkLWltYWdlJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgYXN5bmMgKGUpID0+IHtcbiAgICBjb25zdCBkZXNpcmVkSW1hZ2VTaXplID0gMzAwICogMTAyNFxuICAgIGNvbnN0IGxvd0ltYWdlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KCcjcHJvZHVjdC1hZGQtbG93LWltYWdlJylcbiAgICBjb25zdCBpbml0aWFsSW1hZ2UgPSAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkuZmlsZXNbMF1cblxuICAgIGlmIChpbml0aWFsSW1hZ2Uuc2l6ZSA+IGRlc2lyZWRJbWFnZVNpemUpIHtcbiAgICAgICAgY29uc3QgY29tcHJlc3NlZEltYWdlID0gYXdhaXQgY29tcHJlc3NJbWFnZShpbml0aWFsSW1hZ2UpXG4gICAgICAgIGNvbnN0IGNvbXByZXNzZWRJbWFnZUZpbGUgPSBuZXcgRmlsZShbY29tcHJlc3NlZEltYWdlXSwgYGxvd18ke2luaXRpYWxJbWFnZS5uYW1lfWAsIHtcbiAgICAgICAgICAgIHR5cGU6IGluaXRpYWxJbWFnZS50eXBlLFxuICAgICAgICB9KVxuXG4gICAgICAgIGxvd0ltYWdlSW5wdXQuZmlsZXMgPSBzZXRGaWxlSW5wdXQoY29tcHJlc3NlZEltYWdlRmlsZSlcbiAgICB9IGVsc2Uge1xuICAgICAgICBsb3dJbWFnZUlucHV0LmZpbGVzID0gc2V0RmlsZUlucHV0KGluaXRpYWxJbWFnZSlcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBjb21wcmVzc0ltYWdlKGZpbGU6IEZpbGUpIHtcbiAgICAgICAgY29uc3QgbWF4RmlsZVNpemUgPSBkZXNpcmVkSW1hZ2VTaXplXG4gICAgICAgIGxldCBxdWFsaXR5ID0gMC42XG5cbiAgICAgICAgd2hpbGUgKHF1YWxpdHkgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBjb21wcmVzc2VkRmlsZSA9IGF3YWl0IGNvbXByZXNzUXVhbGl0eUltYWdlKGZpbGUsIHF1YWxpdHkpXG4gICAgICAgICAgICBpZiAoKGNvbXByZXNzZWRGaWxlIGFzIEZpbGUpLnNpemUgPCBtYXhGaWxlU2l6ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wcmVzc2VkRmlsZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcXVhbGl0eSAtPSAwLjFcbiAgICAgICAgICAgIGlmIChxdWFsaXR5IDwgMC4xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXByZXNzZWRGaWxlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBjb21wcmVzc1F1YWxpdHlJbWFnZShmaWxlOiBGaWxlLCBxdWFsaXR5OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPEJsb2I+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKClcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSlcbiAgICAgICAgICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuICAgICAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IDMwMFxuICAgICAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSAzMDBcblxuICAgICAgICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCAwLCAwLCAzMDAsIDMwMClcblxuICAgICAgICAgICAgICAgIGNhbnZhcy50b0Jsb2IoXG4gICAgICAgICAgICAgICAgICAgIChibG9iKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmxvYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoYmxvYilcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignRmFpbGVkIHRvIGNvbnZlcnQnKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZmlsZS50eXBlLFxuICAgICAgICAgICAgICAgICAgICBxdWFsaXR5XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpbWFnZS5vbmVycm9yID0gKGVycikgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0RmlsZUlucHV0KGZpbGU6IEZpbGUpIHtcbiAgICAgICAgY29uc3QgZmlsZUxpc3QgPSBuZXcgRGF0YVRyYW5zZmVyKClcbiAgICAgICAgZmlsZUxpc3QuaXRlbXMuYWRkKGZpbGUpXG4gICAgICAgIHJldHVybiBmaWxlTGlzdC5maWxlc1xuICAgIH1cbn0pXG5cbi8vIHByb2R1Y3RCb29raW5nQnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+XG4vLyAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuLy8gICAgICAgICBjb25zdCBwcm9kdWN0ID0gSlNPTi5wYXJzZShidXR0b24uZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpKVxuLy8gICAgICAgICBjb25zb2xlLmxvZyhwcm9kdWN0KVxuXG4vLyAgICAgICAgIGxldCBkaXY6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZXZlbnQtbmFtZScpXG4vLyAgICAgICAgIGRpdi5pbm5lckhUTUwgPSBwcm9kdWN0Lm5hbWVcbi8vICAgICAgICAgY29uc3QgaW1nOiBIVE1MSW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZXZlbnQtaW1hZ2UnKVxuLy8gICAgICAgICBjb25zdCBmdWxsSW1hZ2VBbmNob3IgPSBpbWcuY2xvc2VzdCgnLnByb2R1Y3QtZnVsbC1pbWFnZS1hbmNob3InKVxuLy8gICAgICAgICBmdWxsSW1hZ2VBbmNob3Iuc2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldC1wcm9kdWN0LWlkJywgcHJvZHVjdC5pZC50b1N0cmluZygpKVxuLy8gICAgICAgICBwcm9kdWN0LmltYWdlLmxlbmd0aCA+IDEwMFxuLy8gICAgICAgICAgICAgPyAoaW1nLnNyYyA9IGBkYXRhOmltYWdlL3BuZztiYXNlNjQsICR7cHJvZHVjdC5pbWFnZX1gKVxuLy8gICAgICAgICAgICAgOiAoaW1nLnNyYyA9IGRlZmF1bHRCcmFuZEltYWdlKVxuLy8gICAgICAgICBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ldmVudC1TS1UnKVxuLy8gICAgICAgICBkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5TS1Vcbi8vICAgICAgICAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZXZlbnQtbmV4dF91cmwnKVxuLy8gICAgICAgICBkaXYuaW5uZXJIVE1MID0gd2luZG93LmxvY2F0aW9uLmhyZWZcblxuLy8gICAgICAgICBjb25zdCBwcm9kdWN0SWRJbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWV2ZW50LXByb2R1Y3QtaWQnKVxuLy8gICAgICAgICBwcm9kdWN0SWRJbnB1dC52YWx1ZSA9IHByb2R1Y3QuaWQudG9TdHJpbmcoKVxuXG4vLyAgICAgICAgIC8vIGRhdGVwaWNrZXJcbi8vICAgICAgICAgY29uc3QgZXZlbnREYXRlcGlja2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0LWV2ZW50LWRhdGVwaWNrZXInKVxuLy8gICAgICAgICBjb25zdCBkYXRlQ3VycmVudCA9IG5ldyBEYXRlKClcbi8vICAgICAgICAgY29uc3QgZGF0ZUV2ZW50ID0gbmV3IERhdGUoZGF0ZUN1cnJlbnQuZ2V0RnVsbFllYXIoKSwgZGF0ZUN1cnJlbnQuZ2V0TW9udGgoKSwgZGF0ZUN1cnJlbnQuZ2V0RGF0ZSgpICsgNSlcblxuLy8gICAgICAgICBjb25zdCBvcHRpb24gPSB7XG4vLyAgICAgICAgICAgICB0b2RheUhpZ2hsaWdodDogdHJ1ZSxcbi8vICAgICAgICAgICAgIG1pbkRhdGU6IGRhdGVFdmVudCxcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIGV2ZW50RGF0ZXBpY2tlcnMuZm9yRWFjaCgoZGF0ZXBpY2tlcjogSFRNTERpdkVsZW1lbnQsIGluZGV4KSA9PiB7XG4vLyAgICAgICAgICAgICBjb25zdCBldmVudERhdGVQaWNrZXIgPSBuZXcgRGF0ZXBpY2tlcihkYXRlcGlja2VyKVxuLy8gICAgICAgICAgICAgZXZlbnREYXRlUGlja2VyLnNldE9wdGlvbnMob3B0aW9uKVxuLy8gICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4vLyAgICAgICAgICAgICAgICAgZXZlbnREYXRlUGlja2VyLnNldERhdGUoZGF0ZUV2ZW50KVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9KVxuLy8gICAgIH0pXG4vLyApXG5cbmZ1bmN0aW9uIGdldEZpbHRlclZhbHVlcyhpc0NoZWNrZWQ6IGJvb2xlYW4pIHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxuICAgIGNvbnN0IGV2ZW50U29ydFRvZ2dsZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXNob3ctZXZlbnRzLXRvZ2dsZS1idG4nKVxuXG4gICAgaXNDaGVja2VkID8gdXJsLnNlYXJjaFBhcmFtcy5zZXQoJ2V2ZW50cycsICd0cnVlJykgOiB1cmwuc2VhcmNoUGFyYW1zLmRlbGV0ZSgnZXZlbnRzJylcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAke3VybC5ocmVmfWBcbn1cblxuY29uc3QgZXZlbnRTb3J0VG9nZ2xlQnV0dG9uOiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtc2hvdy1ldmVudHMtdG9nZ2xlLWJ0bicpXG5ldmVudFNvcnRUb2dnbGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgIGdldEZpbHRlclZhbHVlcyhldmVudFNvcnRUb2dnbGVCdXR0b24uY2hlY2tlZClcbiAgICBjb25zb2xlLmxvZyhldmVudFNvcnRUb2dnbGVCdXR0b24uY2hlY2tlZClcbn0pIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9wcm9kdWN0LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9