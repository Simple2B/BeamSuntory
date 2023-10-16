/******/ (() => {
  // webpackBootstrap
  /******/ 'use strict';
  /******/ var __webpack_modules__ = {
    /***/ './node_modules/@easepick/bundle/dist/index.esm.js':
      /*!*********************************************************!*\
  !*** ./node_modules/@easepick/bundle/dist/index.esm.js ***!
  \*********************************************************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ AmpPlugin: () => /* binding */ d,
          /* harmony export */ DateTime: () => /* binding */ t,
          /* harmony export */ KbdPlugin: () => /* binding */ h,
          /* harmony export */ LockPlugin: () => /* binding */ a,
          /* harmony export */ PresetPlugin: () => /* binding */ r,
          /* harmony export */ RangePlugin: () => /* binding */ c,
          /* harmony export */ TimePlugin: () => /* binding */ l,
          /* harmony export */ create: () => /* binding */ n,
          /* harmony export */ easepick: () => /* binding */ s,
          /* harmony export */
        });
        class t extends Date {
          static parseDateTime(e, i = 'YYYY-MM-DD', n = 'en-US') {
            if (!e) return new Date(new Date().setHours(0, 0, 0, 0));
            if (e instanceof t) return e.toJSDate();
            if (e instanceof Date) return e;
            if (/^-?\d{10,}$/.test(String(e))) return new Date(Number(e));
            if ('string' == typeof e) {
              const s = [];
              let o = null;
              for (; null != (o = t.regex.exec(i)); ) '\\' !== o[1] && s.push(o);
              if (s.length) {
                const i = {
                  year: null,
                  month: null,
                  shortMonth: null,
                  longMonth: null,
                  day: null,
                  hour: 0,
                  minute: 0,
                  second: 0,
                  ampm: null,
                  value: '',
                };
                s[0].index > 0 && (i.value += '.*?');
                for (const [e, o] of Object.entries(s)) {
                  const s = Number(e),
                    { group: a, pattern: r } = t.formatPatterns(o[0], n);
                  (i[a] = s + 1), (i.value += r), (i.value += '.*?');
                }
                const o = new RegExp(`^${i.value}$`);
                if (o.test(e)) {
                  const s = o.exec(e),
                    a = Number(s[i.year]);
                  let r = null;
                  i.month
                    ? (r = Number(s[i.month]) - 1)
                    : i.shortMonth
                    ? (r = t.shortMonths(n).indexOf(s[i.shortMonth]))
                    : i.longMonth && (r = t.longMonths(n).indexOf(s[i.longMonth]));
                  const c = Number(s[i.day]) || 1,
                    l = Number(s[i.hour]);
                  let h = Number.isNaN(l) ? 0 : l;
                  const d = Number(s[i.minute]),
                    p = Number.isNaN(d) ? 0 : d,
                    u = Number(s[i.second]),
                    g = Number.isNaN(u) ? 0 : u,
                    m = s[i.ampm];
                  return m && 'PM' === m && ((h += 12), 24 === h && (h = 0)), new Date(a, r, c, h, p, g, 0);
                }
              }
            }
            return new Date(new Date().setHours(0, 0, 0, 0));
          }
          static regex = /(\\)?(Y{2,4}|M{1,4}|D{1,2}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|A|a)/g;
          static MONTH_JS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
          static shortMonths(e) {
            return t.MONTH_JS.map((t) => new Date(2019, t).toLocaleString(e, { month: 'short' }));
          }
          static longMonths(e) {
            return t.MONTH_JS.map((t) => new Date(2019, t).toLocaleString(e, { month: 'long' }));
          }
          static formatPatterns(e, i) {
            switch (e) {
              case 'YY':
              case 'YYYY':
                return { group: 'year', pattern: `(\\d{${e.length}})` };
              case 'M':
                return { group: 'month', pattern: '(\\d{1,2})' };
              case 'MM':
                return { group: 'month', pattern: '(\\d{2})' };
              case 'MMM':
                return { group: 'shortMonth', pattern: `(${t.shortMonths(i).join('|')})` };
              case 'MMMM':
                return { group: 'longMonth', pattern: `(${t.longMonths(i).join('|')})` };
              case 'D':
                return { group: 'day', pattern: '(\\d{1,2})' };
              case 'DD':
                return { group: 'day', pattern: '(\\d{2})' };
              case 'h':
              case 'H':
                return { group: 'hour', pattern: '(\\d{1,2})' };
              case 'hh':
              case 'HH':
                return { group: 'hour', pattern: '(\\d{2})' };
              case 'm':
                return { group: 'minute', pattern: '(\\d{1,2})' };
              case 'mm':
                return { group: 'minute', pattern: '(\\d{2})' };
              case 's':
                return { group: 'second', pattern: '(\\d{1,2})' };
              case 'ss':
                return { group: 'second', pattern: '(\\d{2})' };
              case 'a':
              case 'A':
                return { group: 'ampm', pattern: '(AM|PM|am|pm)' };
            }
          }
          lang;
          constructor(e = null, i = 'YYYY-MM-DD', n = 'en-US') {
            super(t.parseDateTime(e, i, n)), (this.lang = n);
          }
          getWeek(t) {
            const e = new Date(this.midnight_ts(this)),
              i = (this.getDay() + (7 - t)) % 7;
            e.setDate(e.getDate() - i);
            const n = e.getTime();
            return (
              e.setMonth(0, 1),
              e.getDay() !== t && e.setMonth(0, 1 + ((4 - e.getDay() + 7) % 7)),
              1 + Math.ceil((n - e.getTime()) / 6048e5)
            );
          }
          clone() {
            return new t(this);
          }
          toJSDate() {
            return new Date(this);
          }
          inArray(t, e = '[]') {
            return t.some((t) => (t instanceof Array ? this.isBetween(t[0], t[1], e) : this.isSame(t, 'day')));
          }
          isBetween(t, e, i = '()') {
            switch (i) {
              default:
              case '()':
                return this.midnight_ts(this) > this.midnight_ts(t) && this.midnight_ts(this) < this.midnight_ts(e);
              case '[)':
                return this.midnight_ts(this) >= this.midnight_ts(t) && this.midnight_ts(this) < this.midnight_ts(e);
              case '(]':
                return this.midnight_ts(this) > this.midnight_ts(t) && this.midnight_ts(this) <= this.midnight_ts(e);
              case '[]':
                return this.midnight_ts() >= this.midnight_ts(t) && this.midnight_ts() <= this.midnight_ts(e);
            }
          }
          isBefore(t, e = 'days') {
            switch (e) {
              case 'day':
              case 'days':
                return (
                  new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() >
                  new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime()
                );
              case 'month':
              case 'months':
                return (
                  new Date(t.getFullYear(), t.getMonth(), 1).getTime() >
                  new Date(this.getFullYear(), this.getMonth(), 1).getTime()
                );
              case 'year':
              case 'years':
                return t.getFullYear() > this.getFullYear();
            }
            throw new Error('isBefore: Invalid unit!');
          }
          isSameOrBefore(t, e = 'days') {
            switch (e) {
              case 'day':
              case 'days':
                return (
                  new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() >=
                  new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime()
                );
              case 'month':
              case 'months':
                return (
                  new Date(t.getFullYear(), t.getMonth(), 1).getTime() >=
                  new Date(this.getFullYear(), this.getMonth(), 1).getTime()
                );
            }
            throw new Error('isSameOrBefore: Invalid unit!');
          }
          isAfter(t, e = 'days') {
            switch (e) {
              case 'day':
              case 'days':
                return (
                  new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime() >
                  new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime()
                );
              case 'month':
              case 'months':
                return (
                  new Date(this.getFullYear(), this.getMonth(), 1).getTime() >
                  new Date(t.getFullYear(), t.getMonth(), 1).getTime()
                );
              case 'year':
              case 'years':
                return this.getFullYear() > t.getFullYear();
            }
            throw new Error('isAfter: Invalid unit!');
          }
          isSameOrAfter(t, e = 'days') {
            switch (e) {
              case 'day':
              case 'days':
                return (
                  new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime() >=
                  new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime()
                );
              case 'month':
              case 'months':
                return (
                  new Date(this.getFullYear(), this.getMonth(), 1).getTime() >=
                  new Date(t.getFullYear(), t.getMonth(), 1).getTime()
                );
            }
            throw new Error('isSameOrAfter: Invalid unit!');
          }
          isSame(t, e = 'days') {
            switch (e) {
              case 'day':
              case 'days':
                return (
                  new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime() ===
                  new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime()
                );
              case 'month':
              case 'months':
                return (
                  new Date(this.getFullYear(), this.getMonth(), 1).getTime() ===
                  new Date(t.getFullYear(), t.getMonth(), 1).getTime()
                );
            }
            throw new Error('isSame: Invalid unit!');
          }
          add(t, e = 'days') {
            switch (e) {
              case 'day':
              case 'days':
                this.setDate(this.getDate() + t);
                break;
              case 'month':
              case 'months':
                this.setMonth(this.getMonth() + t);
            }
            return this;
          }
          subtract(t, e = 'days') {
            switch (e) {
              case 'day':
              case 'days':
                this.setDate(this.getDate() - t);
                break;
              case 'month':
              case 'months':
                this.setMonth(this.getMonth() - t);
            }
            return this;
          }
          diff(t, e = 'days') {
            switch (e) {
              default:
              case 'day':
              case 'days':
                return Math.round((this.midnight_ts() - this.midnight_ts(t)) / 864e5);
              case 'month':
              case 'months':
                let e = 12 * (t.getFullYear() - this.getFullYear());
                return (e -= t.getMonth()), (e += this.getMonth()), e;
            }
          }
          format(e, i = 'en-US') {
            let n = '';
            const s = [];
            let o = null;
            for (; null != (o = t.regex.exec(e)); ) '\\' !== o[1] && s.push(o);
            if (s.length) {
              s[0].index > 0 && (n += e.substring(0, s[0].index));
              for (const [t, o] of Object.entries(s)) {
                const a = Number(t);
                (n += this.formatTokens(o[0], i)),
                  s[a + 1] && (n += e.substring(o.index + o[0].length, s[a + 1].index)),
                  a === s.length - 1 && (n += e.substring(o.index + o[0].length));
              }
            }
            return n.replace(/\\/g, '');
          }
          midnight_ts(t) {
            return t
              ? new Date(t.getFullYear(), t.getMonth(), t.getDate(), 0, 0, 0, 0).getTime()
              : new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0, 0).getTime();
          }
          formatTokens(e, i) {
            switch (e) {
              case 'YY':
                return String(this.getFullYear()).slice(-2);
              case 'YYYY':
                return String(this.getFullYear());
              case 'M':
                return String(this.getMonth() + 1);
              case 'MM':
                return `0${this.getMonth() + 1}`.slice(-2);
              case 'MMM':
                return t.shortMonths(i)[this.getMonth()];
              case 'MMMM':
                return t.longMonths(i)[this.getMonth()];
              case 'D':
                return String(this.getDate());
              case 'DD':
                return `0${this.getDate()}`.slice(-2);
              case 'H':
                return String(this.getHours());
              case 'HH':
                return `0${this.getHours()}`.slice(-2);
              case 'h':
                return String(this.getHours() % 12 || 12);
              case 'hh':
                return `0${this.getHours() % 12 || 12}`.slice(-2);
              case 'm':
                return String(this.getMinutes());
              case 'mm':
                return `0${this.getMinutes()}`.slice(-2);
              case 's':
                return String(this.getSeconds());
              case 'ss':
                return `0${this.getSeconds()}`.slice(-2);
              case 'a':
                return this.getHours() < 12 || 24 === this.getHours() ? 'am' : 'pm';
              case 'A':
                return this.getHours() < 12 || 24 === this.getHours() ? 'AM' : 'PM';
              default:
                return '';
            }
          }
        }
        class e {
          picker;
          constructor(t) {
            this.picker = t;
          }
          render(e, i) {
            e || (e = new t()),
              e.setDate(1),
              e.setHours(0, 0, 0, 0),
              'function' == typeof this[`get${i}View`] && this[`get${i}View`](e);
          }
          getContainerView(t) {
            (this.picker.ui.container.innerHTML = ''),
              this.picker.options.header && this.picker.trigger('render', { date: t.clone(), view: 'Header' }),
              this.picker.trigger('render', { date: t.clone(), view: 'Main' }),
              this.picker.options.autoApply || this.picker.trigger('render', { date: t.clone(), view: 'Footer' });
          }
          getHeaderView(t) {
            const e = document.createElement('header');
            this.picker.options.header instanceof HTMLElement && e.appendChild(this.picker.options.header),
              'string' == typeof this.picker.options.header && (e.innerHTML = this.picker.options.header),
              this.picker.ui.container.appendChild(e),
              this.picker.trigger('view', { target: e, date: t.clone(), view: 'Header' });
          }
          getMainView(t) {
            const e = document.createElement('main');
            this.picker.ui.container.appendChild(e);
            const i = document.createElement('div');
            i.className = `calendars grid-${this.picker.options.grid}`;
            for (let e = 0; e < this.picker.options.calendars; e++) {
              const n = document.createElement('div');
              (n.className = 'calendar'), i.appendChild(n);
              const s = this.getCalendarHeaderView(t.clone());
              n.appendChild(s),
                this.picker.trigger('view', { date: t.clone(), view: 'CalendarHeader', index: e, target: s });
              const o = this.getCalendarDayNamesView();
              n.appendChild(o),
                this.picker.trigger('view', { date: t.clone(), view: 'CalendarDayNames', index: e, target: o });
              const a = this.getCalendarDaysView(t.clone());
              n.appendChild(a),
                this.picker.trigger('view', { date: t.clone(), view: 'CalendarDays', index: e, target: a });
              const r = this.getCalendarFooterView(this.picker.options.lang, t.clone());
              n.appendChild(r),
                this.picker.trigger('view', { date: t.clone(), view: 'CalendarFooter', index: e, target: r }),
                this.picker.trigger('view', { date: t.clone(), view: 'CalendarItem', index: e, target: n }),
                t.add(1, 'month');
            }
            e.appendChild(i),
              this.picker.trigger('view', { date: t.clone(), view: 'Calendars', target: i }),
              this.picker.trigger('view', { date: t.clone(), view: 'Main', target: e });
          }
          getFooterView(t) {
            const e = document.createElement('footer'),
              i = document.createElement('div');
            i.className = 'footer-buttons';
            const n = document.createElement('button');
            (n.className = 'cancel-button unit'), (n.innerHTML = this.picker.options.locale.cancel), i.appendChild(n);
            const s = document.createElement('button');
            (s.className = 'apply-button unit'),
              (s.innerHTML = this.picker.options.locale.apply),
              (s.disabled = !0),
              i.appendChild(s),
              e.appendChild(i),
              this.picker.ui.container.appendChild(e),
              this.picker.trigger('view', { date: t, target: e, view: 'Footer' });
          }
          getCalendarHeaderView(t) {
            const e = document.createElement('div');
            e.className = 'header';
            const i = document.createElement('div');
            (i.className = 'month-name'),
              (i.innerHTML = `<span>${t.toLocaleString(this.picker.options.lang, { month: 'long' })}</span> ${t.format(
                'YYYY'
              )}`),
              e.appendChild(i);
            const n = document.createElement('button');
            (n.className = 'previous-button unit'),
              (n.innerHTML = this.picker.options.locale.previousMonth),
              e.appendChild(n);
            const s = document.createElement('button');
            return (
              (s.className = 'next-button unit'),
              (s.innerHTML = this.picker.options.locale.nextMonth),
              e.appendChild(s),
              e
            );
          }
          getCalendarDayNamesView() {
            const t = document.createElement('div');
            t.className = 'daynames-row';
            for (let e = 1; e <= 7; e++) {
              const i = 3 + this.picker.options.firstDay + e,
                n = document.createElement('div');
              (n.className = 'dayname'),
                (n.innerHTML = new Date(1970, 0, i, 12, 0, 0, 0).toLocaleString(this.picker.options.lang, {
                  weekday: 'short',
                })),
                (n.title = new Date(1970, 0, i, 12, 0, 0, 0).toLocaleString(this.picker.options.lang, {
                  weekday: 'long',
                })),
                t.appendChild(n),
                this.picker.trigger('view', { dayIdx: i, view: 'CalendarDayName', target: n });
            }
            return t;
          }
          getCalendarDaysView(t) {
            const e = document.createElement('div');
            e.className = 'days-grid';
            const i = this.calcOffsetDays(t, this.picker.options.firstDay),
              n = 32 - new Date(t.getFullYear(), t.getMonth(), 32).getDate();
            for (let t = 0; t < i; t++) {
              const t = document.createElement('div');
              (t.className = 'offset'), e.appendChild(t);
            }
            for (let i = 1; i <= n; i++) {
              t.setDate(i);
              const n = this.getCalendarDayView(t);
              e.appendChild(n), this.picker.trigger('view', { date: t, view: 'CalendarDay', target: n });
            }
            return e;
          }
          getCalendarDayView(e) {
            const i = this.picker.options.date ? new t(this.picker.options.date) : null,
              n = new t(),
              s = document.createElement('div');
            return (
              (s.className = 'day unit'),
              (s.innerHTML = e.format('D')),
              (s.dataset.time = String(e.getTime())),
              e.isSame(n, 'day') && s.classList.add('today'),
              [0, 6].includes(e.getDay()) && s.classList.add('weekend'),
              this.picker.datePicked.length
                ? this.picker.datePicked[0].isSame(e, 'day') && s.classList.add('selected')
                : i && e.isSame(i, 'day') && s.classList.add('selected'),
              this.picker.trigger('view', { date: e, view: 'CalendarDay', target: s }),
              s
            );
          }
          getCalendarFooterView(t, e) {
            const i = document.createElement('div');
            return (i.className = 'footer'), i;
          }
          calcOffsetDays(t, e) {
            let i = t.getDay() - e;
            return i < 0 && (i += 7), i;
          }
        }
        class i {
          picker;
          instances = {};
          constructor(t) {
            this.picker = t;
          }
          initialize() {
            const t = [];
            this.picker.options.plugins.forEach((e) => {
              'function' == typeof e
                ? t.push(new e())
                : 'string' == typeof e &&
                  'undefined' != typeof easepick &&
                  Object.prototype.hasOwnProperty.call(easepick, e)
                ? t.push(new easepick[e]())
                : console.warn(`easepick: ${e} not found.`);
            }),
              t.sort((t, e) =>
                t.priority > e.priority
                  ? -1
                  : t.priority < e.priority || t.dependencies.length > e.dependencies.length
                  ? 1
                  : t.dependencies.length < e.dependencies.length
                  ? -1
                  : 0
              ),
              t.forEach((t) => {
                t.attach(this.picker), (this.instances[t.getName()] = t);
              });
          }
          getInstance(t) {
            return this.instances[t];
          }
          addInstance(t) {
            if (Object.prototype.hasOwnProperty.call(this.instances, t)) console.warn(`easepick: ${t} already added.`);
            else {
              if ('undefined' != typeof easepick && Object.prototype.hasOwnProperty.call(easepick, t)) {
                const e = new easepick[t]();
                return e.attach(this.picker), (this.instances[e.getName()] = e), e;
              }
              if ('undefined' !== this.getPluginFn(t)) {
                const e = new (this.getPluginFn(t))();
                return e.attach(this.picker), (this.instances[e.getName()] = e), e;
              }
              console.warn(`easepick: ${t} not found.`);
            }
            return null;
          }
          removeInstance(t) {
            return t in this.instances && this.instances[t].detach(), delete this.instances[t];
          }
          reloadInstance(t) {
            return this.removeInstance(t), this.addInstance(t);
          }
          getPluginFn(t) {
            return [...this.picker.options.plugins]
              .filter((e) => 'function' == typeof e && new e().getName() === t)
              .shift();
          }
        }
        class n {
          Calendar = new e(this);
          PluginManager = new i(this);
          calendars = [];
          datePicked = [];
          cssLoaded = 0;
          binds = { hidePicker: this.hidePicker.bind(this), show: this.show.bind(this) };
          options = {
            doc: document,
            css: [],
            element: null,
            firstDay: 1,
            grid: 1,
            calendars: 1,
            lang: 'en-US',
            date: null,
            format: 'YYYY-MM-DD',
            readonly: !0,
            autoApply: !0,
            header: !1,
            inline: !1,
            scrollToDate: !0,
            locale: {
              nextMonth:
                '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2.748 16L0 13.333 5.333 8 0 2.667 2.748 0l7.919 8z" fill-rule="nonzero"/></svg>',
              previousMonth:
                '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M7.919 0l2.748 2.667L5.333 8l5.334 5.333L7.919 16 0 8z" fill-rule="nonzero"/></svg>',
              cancel: 'Cancel',
              apply: 'Apply',
            },
            documentClick: this.binds.hidePicker,
            plugins: [],
          };
          ui = { container: null, shadowRoot: null, wrapper: null };
          version = '1.2.1';
          constructor(t) {
            const e = { ...this.options.locale, ...t.locale };
            (this.options = { ...this.options, ...t }),
              (this.options.locale = e),
              this.handleOptions(),
              (this.ui.wrapper = document.createElement('span')),
              (this.ui.wrapper.style.display = 'none'),
              (this.ui.wrapper.style.position = 'absolute'),
              (this.ui.wrapper.style.pointerEvents = 'none'),
              (this.ui.wrapper.className = 'easepick-wrapper'),
              this.ui.wrapper.attachShadow({ mode: 'open' }),
              (this.ui.shadowRoot = this.ui.wrapper.shadowRoot),
              (this.ui.container = document.createElement('div')),
              (this.ui.container.className = 'container'),
              this.options.zIndex && (this.ui.container.style.zIndex = String(this.options.zIndex)),
              this.options.inline &&
                ((this.ui.wrapper.style.position = 'relative'), this.ui.container.classList.add('inline')),
              this.ui.shadowRoot.appendChild(this.ui.container),
              this.options.element.after(this.ui.wrapper),
              this.handleCSS(),
              this.options.element.addEventListener('click', this.binds.show),
              this.on('view', this.onView.bind(this)),
              this.on('render', this.onRender.bind(this)),
              this.PluginManager.initialize(),
              this.parseValues(),
              'function' == typeof this.options.setup && this.options.setup(this),
              this.on('click', this.onClick.bind(this));
            const i = this.options.scrollToDate ? this.getDate() : null;
            this.renderAll(i);
          }
          on(t, e, i = {}) {
            this.ui.container.addEventListener(t, e, i);
          }
          off(t, e, i = {}) {
            this.ui.container.removeEventListener(t, e, i);
          }
          trigger(t, e = {}) {
            return this.ui.container.dispatchEvent(new CustomEvent(t, { detail: e }));
          }
          destroy() {
            this.options.element.removeEventListener('click', this.binds.show),
              'function' == typeof this.options.documentClick &&
                document.removeEventListener('click', this.options.documentClick, !0),
              Object.keys(this.PluginManager.instances).forEach((t) => {
                this.PluginManager.removeInstance(t);
              }),
              this.ui.wrapper.remove();
          }
          onRender(t) {
            const { view: e, date: i } = t.detail;
            this.Calendar.render(i, e);
          }
          onView(t) {
            const { view: e, target: i } = t.detail;
            'Footer' === e && this.datePicked.length && (i.querySelector('.apply-button').disabled = !1);
          }
          onClickHeaderButton(t) {
            this.isCalendarHeaderButton(t) &&
              (t.classList.contains('next-button')
                ? this.calendars[0].add(1, 'month')
                : this.calendars[0].subtract(1, 'month'),
              this.renderAll(this.calendars[0]));
          }
          onClickCalendarDay(e) {
            if (this.isCalendarDay(e)) {
              const i = new t(e.dataset.time);
              this.options.autoApply
                ? (this.setDate(i), this.trigger('select', { date: this.getDate() }), this.hide())
                : ((this.datePicked[0] = i), this.trigger('preselect', { date: this.getDate() }), this.renderAll());
            }
          }
          onClickApplyButton(t) {
            if (this.isApplyButton(t)) {
              if (this.datePicked[0] instanceof Date) {
                const t = this.datePicked[0].clone();
                this.setDate(t);
              }
              this.hide(), this.trigger('select', { date: this.getDate() });
            }
          }
          onClickCancelButton(t) {
            this.isCancelButton(t) && this.hide();
          }
          onClick(t) {
            const e = t.target;
            if (e instanceof HTMLElement) {
              const t = e.closest('.unit');
              if (!(t instanceof HTMLElement)) return;
              this.onClickHeaderButton(t),
                this.onClickCalendarDay(t),
                this.onClickApplyButton(t),
                this.onClickCancelButton(t);
            }
          }
          isShown() {
            return this.ui.container.classList.contains('inline') || this.ui.container.classList.contains('show');
          }
          show(t) {
            if (this.isShown()) return;
            const e = t && 'target' in t ? t.target : this.options.element,
              { top: i, left: n } = this.adjustPosition(e);
            (this.ui.container.style.top = `${i}px`),
              (this.ui.container.style.left = `${n}px`),
              this.ui.container.classList.add('show'),
              this.trigger('show', { target: e });
          }
          hide() {
            this.ui.container.classList.remove('show'),
              (this.datePicked.length = 0),
              this.renderAll(),
              this.trigger('hide');
          }
          setDate(e) {
            const i = new t(e, this.options.format);
            (this.options.date = i.clone()), this.updateValues(), this.calendars.length && this.renderAll();
          }
          getDate() {
            return this.options.date instanceof t ? this.options.date.clone() : null;
          }
          parseValues() {
            this.options.date
              ? this.setDate(this.options.date)
              : this.options.element instanceof HTMLInputElement &&
                this.options.element.value.length &&
                this.setDate(this.options.element.value),
              this.options.date instanceof Date || (this.options.date = null);
          }
          updateValues() {
            const t = this.getDate(),
              e = t instanceof Date ? t.format(this.options.format, this.options.lang) : '',
              i = this.options.element;
            i instanceof HTMLInputElement ? (i.value = e) : i instanceof HTMLElement && (i.innerText = e);
          }
          hidePicker(t) {
            let e = t.target,
              i = null;
            e.shadowRoot && ((e = t.composedPath()[0]), (i = e.getRootNode().host)),
              this.isShown() && i !== this.ui.wrapper && e !== this.options.element && this.hide();
          }
          renderAll(t) {
            this.trigger('render', { view: 'Container', date: (t || this.calendars[0]).clone() });
          }
          isCalendarHeaderButton(t) {
            return ['previous-button', 'next-button'].some((e) => t.classList.contains(e));
          }
          isCalendarDay(t) {
            return t.classList.contains('day');
          }
          isApplyButton(t) {
            return t.classList.contains('apply-button');
          }
          isCancelButton(t) {
            return t.classList.contains('cancel-button');
          }
          gotoDate(e) {
            const i = new t(e, this.options.format);
            i.setDate(1), (this.calendars[0] = i.clone()), this.renderAll();
          }
          clear() {
            (this.options.date = null),
              (this.datePicked.length = 0),
              this.updateValues(),
              this.renderAll(),
              this.trigger('clear');
          }
          handleOptions() {
            this.options.element instanceof HTMLElement ||
              (this.options.element = this.options.doc.querySelector(this.options.element)),
              'function' == typeof this.options.documentClick &&
                document.addEventListener('click', this.options.documentClick, !0),
              this.options.element instanceof HTMLInputElement &&
                (this.options.element.readOnly = this.options.readonly),
              this.options.date
                ? (this.calendars[0] = new t(this.options.date, this.options.format))
                : (this.calendars[0] = new t());
          }
          handleCSS() {
            if (Array.isArray(this.options.css))
              this.options.css.forEach((t) => {
                const e = document.createElement('link');
                (e.href = t), (e.rel = 'stylesheet');
                const i = () => {
                  this.cssLoaded++, this.cssLoaded === this.options.css.length && (this.ui.wrapper.style.display = '');
                };
                e.addEventListener('load', i), e.addEventListener('error', i), this.ui.shadowRoot.append(e);
              });
            else if ('string' == typeof this.options.css) {
              const t = document.createElement('style'),
                e = document.createTextNode(this.options.css);
              t.appendChild(e), this.ui.shadowRoot.append(t), (this.ui.wrapper.style.display = '');
            } else
              'function' == typeof this.options.css &&
                (this.options.css.call(this, this), (this.ui.wrapper.style.display = ''));
          }
          adjustPosition(t) {
            const e = t.getBoundingClientRect(),
              i = this.ui.wrapper.getBoundingClientRect();
            this.ui.container.classList.add('calc');
            const n = this.ui.container.getBoundingClientRect();
            this.ui.container.classList.remove('calc');
            let s = e.bottom - i.bottom,
              o = e.left - i.left;
            return (
              'undefined' != typeof window &&
                (window.innerHeight < s + n.height && s - n.height >= 0 && (s = e.top - i.top - n.height),
                window.innerWidth < o + n.width && e.right - n.width >= 0 && (o = e.right - i.right - n.width)),
              { left: o, top: s }
            );
          }
        }
        var s = Object.freeze({ __proto__: null, Core: n, create: n });
        class o {
          picker;
          options;
          priority = 0;
          dependencies = [];
          attach(t) {
            const e = this.getName(),
              i = { ...this.options };
            this.options = { ...this.options, ...(t.options[e] || {}) };
            for (const n of Object.keys(i))
              if (
                null !== i[n] &&
                'object' == typeof i[n] &&
                Object.keys(i[n]).length &&
                e in t.options &&
                n in t.options[e]
              ) {
                const s = { ...t.options[e][n] };
                null !== s &&
                  'object' == typeof s &&
                  Object.keys(s).length &&
                  Object.keys(s).every((t) => Object.keys(i[n]).includes(t)) &&
                  (this.options[n] = { ...i[n], ...s });
              }
            if (((this.picker = t), this.dependenciesNotFound())) {
              const t = this.dependencies.filter((t) => !this.pluginsAsStringArray().includes(t));
              return void console.warn(`${this.getName()}: required dependencies (${t.join(', ')}).`);
            }
            const n = this.camelCaseToKebab(this.getName());
            this.picker.ui.container.classList.add(n), this.onAttach();
          }
          detach() {
            const t = this.camelCaseToKebab(this.getName());
            this.picker.ui.container.classList.remove(t), 'function' == typeof this.onDetach && this.onDetach();
          }
          dependenciesNotFound() {
            return this.dependencies.length && !this.dependencies.every((t) => this.pluginsAsStringArray().includes(t));
          }
          pluginsAsStringArray() {
            return this.picker.options.plugins.map((t) => ('function' == typeof t ? new t().getName() : t));
          }
          camelCaseToKebab(t) {
            return t.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
          }
        }
        class a extends o {
          priority = 1;
          binds = { onView: this.onView.bind(this) };
          options = {
            minDate: null,
            maxDate: null,
            minDays: null,
            maxDays: null,
            selectForward: null,
            selectBackward: null,
            presets: !0,
            inseparable: !1,
            filter: null,
          };
          getName() {
            return 'LockPlugin';
          }
          onAttach() {
            if (
              (this.options.minDate &&
                (this.options.minDate = new t(
                  this.options.minDate,
                  this.picker.options.format,
                  this.picker.options.lang
                )),
              this.options.maxDate &&
                ((this.options.maxDate = new t(
                  this.options.maxDate,
                  this.picker.options.format,
                  this.picker.options.lang
                )),
                this.options.maxDate instanceof t &&
                  this.picker.options.calendars > 1 &&
                  this.picker.calendars[0].isSame(this.options.maxDate, 'month')))
            ) {
              const t = this.picker.calendars[0].clone().subtract(1, 'month');
              this.picker.gotoDate(t);
            }
            if (
              (this.options.minDays ||
                this.options.maxDays ||
                this.options.selectForward ||
                this.options.selectBackward) &&
              !this.picker.options.plugins.includes('RangePlugin')
            ) {
              const t = ['minDays', 'maxDays', 'selectForward', 'selectBackward'];
              console.warn(`${this.getName()}: options ${t.join(', ')} required RangePlugin.`);
            }
            this.picker.on('view', this.binds.onView);
          }
          onDetach() {
            this.picker.off('view', this.binds.onView);
          }
          onView(e) {
            const { view: i, target: n, date: s } = e.detail;
            if (
              ('CalendarHeader' === i &&
                (this.options.minDate instanceof t &&
                  s.isSameOrBefore(this.options.minDate, 'month') &&
                  n.classList.add('no-previous-month'),
                this.options.maxDate instanceof t &&
                  s.isSameOrAfter(this.options.maxDate, 'month') &&
                  n.classList.add('no-next-month')),
              'CalendarDay' === i)
            ) {
              const t = this.picker.datePicked.length ? this.picker.datePicked[0] : null;
              if (this.testFilter(s)) return void n.classList.add('locked');
              if (this.options.inseparable) {
                if (this.options.minDays) {
                  const t = s.clone().subtract(this.options.minDays - 1, 'day'),
                    e = s.clone().add(this.options.minDays - 1, 'day');
                  let i = !1,
                    o = !1;
                  for (; t.isBefore(s, 'day'); ) {
                    if (this.testFilter(t)) {
                      i = !0;
                      break;
                    }
                    t.add(1, 'day');
                  }
                  for (; e.isAfter(s, 'day'); ) {
                    if (this.testFilter(e)) {
                      o = !0;
                      break;
                    }
                    e.subtract(1, 'day');
                  }
                  i && o && n.classList.add('not-available');
                }
                this.rangeIsNotAvailable(s, t) && n.classList.add('not-available');
              }
              this.dateIsNotAvailable(s, t) && n.classList.add('not-available');
            }
            if (this.options.presets && 'PresetPluginButton' === i) {
              const e = new t(Number(n.dataset.start)),
                i = new t(Number(n.dataset.end)),
                s = i.diff(e, 'day'),
                o = this.options.minDays && s < this.options.minDays,
                a = this.options.maxDays && s > this.options.maxDays;
              (o ||
                a ||
                this.lockMinDate(e) ||
                this.lockMaxDate(e) ||
                this.lockMinDate(i) ||
                this.lockMaxDate(i) ||
                this.rangeIsNotAvailable(e, i)) &&
                n.setAttribute('disabled', 'disabled');
            }
          }
          dateIsNotAvailable(t, e) {
            return (
              this.lockMinDate(t) ||
              this.lockMaxDate(t) ||
              this.lockMinDays(t, e) ||
              this.lockMaxDays(t, e) ||
              this.lockSelectForward(t) ||
              this.lockSelectBackward(t)
            );
          }
          rangeIsNotAvailable(t, e) {
            if (!t || !e) return !1;
            const i = (t.isSameOrBefore(e, 'day') ? t : e).clone(),
              n = (e.isSameOrAfter(t, 'day') ? e : t).clone();
            for (; i.isSameOrBefore(n, 'day'); ) {
              if (this.testFilter(i)) return !0;
              i.add(1, 'day');
            }
            return !1;
          }
          lockMinDate(e) {
            return this.options.minDate instanceof t && e.isBefore(this.options.minDate, 'day');
          }
          lockMaxDate(e) {
            return this.options.maxDate instanceof t && e.isAfter(this.options.maxDate, 'day');
          }
          lockMinDays(t, e) {
            if (this.options.minDays && e) {
              const i = e.clone().subtract(this.options.minDays - 1, 'day'),
                n = e.clone().add(this.options.minDays - 1, 'day');
              return t.isBetween(i, n);
            }
            return !1;
          }
          lockMaxDays(t, e) {
            if (this.options.maxDays && e) {
              const i = e.clone().subtract(this.options.maxDays, 'day'),
                n = e.clone().add(this.options.maxDays, 'day');
              return !t.isBetween(i, n);
            }
            return !1;
          }
          lockSelectForward(t) {
            if (1 === this.picker.datePicked.length && this.options.selectForward) {
              const e = this.picker.datePicked[0].clone();
              return t.isBefore(e, 'day');
            }
            return !1;
          }
          lockSelectBackward(t) {
            if (1 === this.picker.datePicked.length && this.options.selectBackward) {
              const e = this.picker.datePicked[0].clone();
              return t.isAfter(e, 'day');
            }
            return !1;
          }
          testFilter(t) {
            return 'function' == typeof this.options.filter && this.options.filter(t, this.picker.datePicked);
          }
        }
        class r extends o {
          dependencies = ['RangePlugin'];
          binds = { onView: this.onView.bind(this), onClick: this.onClick.bind(this) };
          options = {
            customLabels: ['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'This Month', 'Last Month'],
            customPreset: {},
            position: 'left',
          };
          getName() {
            return 'PresetPlugin';
          }
          onAttach() {
            if (!Object.keys(this.options.customPreset).length) {
              const e = new t(),
                i = () => {
                  const i = e.clone();
                  i.setDate(1);
                  const n = new Date(e.getFullYear(), e.getMonth() + 1, 0);
                  return [new t(i), new t(n)];
                },
                n = () => {
                  const i = e.clone();
                  i.setMonth(i.getMonth() - 1), i.setDate(1);
                  const n = new Date(e.getFullYear(), e.getMonth(), 0);
                  return [new t(i), new t(n)];
                },
                s = [
                  [e.clone(), e.clone()],
                  [e.clone().subtract(1, 'day'), e.clone().subtract(1, 'day')],
                  [e.clone().subtract(6, 'day'), e.clone()],
                  [e.clone().subtract(29, 'day'), e.clone()],
                  i(),
                  n(),
                ];
              Object.values(this.options.customLabels).forEach((t, e) => {
                this.options.customPreset[t] = s[e];
              });
            }
            this.picker.on('view', this.binds.onView), this.picker.on('click', this.binds.onClick);
          }
          onDetach() {
            this.picker.off('view', this.binds.onView), this.picker.off('click', this.binds.onClick);
          }
          onView(t) {
            const { view: e, target: i } = t.detail;
            if ('Main' === e) {
              const t = document.createElement('div');
              (t.className = 'preset-plugin-container'),
                Object.keys(this.options.customPreset).forEach((e) => {
                  if (Object.prototype.hasOwnProperty.call(this.options.customPreset, e)) {
                    const i = this.options.customPreset[e],
                      n = document.createElement('button');
                    (n.className = 'preset-button unit'),
                      (n.innerHTML = e),
                      (n.dataset.start = i[0].getTime()),
                      (n.dataset.end = i[1].getTime()),
                      t.appendChild(n),
                      this.picker.trigger('view', { view: 'PresetPluginButton', target: n });
                  }
                }),
                i.appendChild(t),
                i.classList.add(`preset-${this.options.position}`),
                this.picker.trigger('view', { view: 'PresetPluginContainer', target: t });
            }
          }
          onClick(e) {
            const i = e.target;
            if (i instanceof HTMLElement) {
              const e = i.closest('.unit');
              if (!(e instanceof HTMLElement)) return;
              if (this.isPresetButton(e)) {
                const i = new t(Number(e.dataset.start)),
                  n = new t(Number(e.dataset.end));
                this.picker.options.autoApply
                  ? (this.picker.setDateRange(i, n),
                    this.picker.trigger('select', { start: this.picker.getStartDate(), end: this.picker.getEndDate() }),
                    this.picker.hide())
                  : ((this.picker.datePicked = [i, n]), this.picker.renderAll());
              }
            }
          }
          isPresetButton(t) {
            return t.classList.contains('preset-button');
          }
        }
        class c extends o {
          tooltipElement;
          triggerElement;
          binds = {
            setStartDate: this.setStartDate.bind(this),
            setEndDate: this.setEndDate.bind(this),
            setDateRange: this.setDateRange.bind(this),
            getStartDate: this.getStartDate.bind(this),
            getEndDate: this.getEndDate.bind(this),
            onView: this.onView.bind(this),
            onShow: this.onShow.bind(this),
            onMouseEnter: this.onMouseEnter.bind(this),
            onMouseLeave: this.onMouseLeave.bind(this),
            onClickCalendarDay: this.onClickCalendarDay.bind(this),
            onClickApplyButton: this.onClickApplyButton.bind(this),
            parseValues: this.parseValues.bind(this),
            updateValues: this.updateValues.bind(this),
            clear: this.clear.bind(this),
          };
          options = {
            elementEnd: null,
            startDate: null,
            endDate: null,
            repick: !1,
            strict: !0,
            delimiter: ' - ',
            tooltip: !0,
            tooltipNumber: (t) => t,
            locale: { zero: '', one: 'day', two: '', few: '', many: '', other: 'days' },
            documentClick: this.hidePicker.bind(this),
          };
          getName() {
            return 'RangePlugin';
          }
          onAttach() {
            (this.binds._setStartDate = this.picker.setStartDate),
              (this.binds._setEndDate = this.picker.setEndDate),
              (this.binds._setDateRange = this.picker.setDateRange),
              (this.binds._getStartDate = this.picker.getStartDate),
              (this.binds._getEndDate = this.picker.getEndDate),
              (this.binds._parseValues = this.picker.parseValues),
              (this.binds._updateValues = this.picker.updateValues),
              (this.binds._clear = this.picker.clear),
              (this.binds._onClickCalendarDay = this.picker.onClickCalendarDay),
              (this.binds._onClickApplyButton = this.picker.onClickApplyButton),
              Object.defineProperties(this.picker, {
                setStartDate: { configurable: !0, value: this.binds.setStartDate },
                setEndDate: { configurable: !0, value: this.binds.setEndDate },
                setDateRange: { configurable: !0, value: this.binds.setDateRange },
                getStartDate: { configurable: !0, value: this.binds.getStartDate },
                getEndDate: { configurable: !0, value: this.binds.getEndDate },
                parseValues: { configurable: !0, value: this.binds.parseValues },
                updateValues: { configurable: !0, value: this.binds.updateValues },
                clear: { configurable: !0, value: this.binds.clear },
                onClickCalendarDay: { configurable: !0, value: this.binds.onClickCalendarDay },
                onClickApplyButton: { configurable: !0, value: this.binds.onClickApplyButton },
              }),
              this.options.elementEnd &&
                (this.options.elementEnd instanceof HTMLElement ||
                  (this.options.elementEnd = this.picker.options.doc.querySelector(this.options.elementEnd)),
                this.options.elementEnd instanceof HTMLInputElement &&
                  (this.options.elementEnd.readOnly = this.picker.options.readonly),
                'function' == typeof this.picker.options.documentClick &&
                  (document.removeEventListener('click', this.picker.options.documentClick, !0),
                  'function' == typeof this.options.documentClick &&
                    document.addEventListener('click', this.options.documentClick, !0)),
                this.options.elementEnd.addEventListener('click', this.picker.show.bind(this.picker))),
              (this.options.repick = this.options.repick && this.options.elementEnd instanceof HTMLElement),
              (this.picker.options.date = null),
              this.picker.on('view', this.binds.onView),
              this.picker.on('show', this.binds.onShow),
              this.picker.on('mouseenter', this.binds.onMouseEnter, !0),
              this.picker.on('mouseleave', this.binds.onMouseLeave, !0),
              this.checkIntlPluralLocales();
          }
          onDetach() {
            Object.defineProperties(this.picker, {
              setStartDate: { configurable: !0, value: this.binds._setStartDate },
              setEndDate: { configurable: !0, value: this.binds._setEndDate },
              setDateRange: { configurable: !0, value: this.binds._setDateRange },
              getStartDate: { configurable: !0, value: this.binds._getStartDate },
              getEndDate: { configurable: !0, value: this.binds._getEndDate },
              parseValues: { configurable: !0, value: this.binds._parseValues },
              updateValues: { configurable: !0, value: this.binds._updateValues },
              clear: { configurable: !0, value: this.binds._clear },
              onClickCalendarDay: { configurable: !0, value: this.binds._onClickCalendarDay },
              onClickApplyButton: { configurable: !0, value: this.binds._onClickApplyButton },
            }),
              this.picker.off('view', this.binds.onView),
              this.picker.off('show', this.binds.onShow),
              this.picker.off('mouseenter', this.binds.onMouseEnter, !0),
              this.picker.off('mouseleave', this.binds.onMouseLeave, !0);
          }
          parseValues() {
            if (this.options.startDate || this.options.endDate)
              this.options.strict
                ? this.options.startDate && this.options.endDate
                  ? this.setDateRange(this.options.startDate, this.options.endDate)
                  : ((this.options.startDate = null), (this.options.endDate = null))
                : (this.options.startDate && this.setStartDate(this.options.startDate),
                  this.options.endDate && this.setEndDate(this.options.endDate));
            else if (this.options.elementEnd)
              this.options.strict
                ? this.picker.options.element instanceof HTMLInputElement &&
                  this.picker.options.element.value.length &&
                  this.options.elementEnd instanceof HTMLInputElement &&
                  this.options.elementEnd.value.length &&
                  this.setDateRange(this.picker.options.element.value, this.options.elementEnd.value)
                : (this.picker.options.element instanceof HTMLInputElement &&
                    this.picker.options.element.value.length &&
                    this.setStartDate(this.picker.options.element.value),
                  this.options.elementEnd instanceof HTMLInputElement &&
                    this.options.elementEnd.value.length &&
                    this.setEndDate(this.options.elementEnd.value));
            else if (
              this.picker.options.element instanceof HTMLInputElement &&
              this.picker.options.element.value.length
            ) {
              const [t, e] = this.picker.options.element.value.split(this.options.delimiter);
              this.options.strict
                ? t && e && this.setDateRange(t, e)
                : (t && this.setStartDate(t), e && this.setEndDate(e));
            }
          }
          updateValues() {
            const t = this.picker.options.element,
              e = this.options.elementEnd,
              i = this.picker.getStartDate(),
              n = this.picker.getEndDate(),
              s = i instanceof Date ? i.format(this.picker.options.format, this.picker.options.lang) : '',
              o = n instanceof Date ? n.format(this.picker.options.format, this.picker.options.lang) : '';
            if (e)
              t instanceof HTMLInputElement ? (t.value = s) : t instanceof HTMLElement && (t.innerText = s),
                e instanceof HTMLInputElement ? (e.value = o) : e instanceof HTMLElement && (e.innerText = o);
            else {
              const e = `${s}${s || o ? this.options.delimiter : ''}${o}`;
              t instanceof HTMLInputElement ? (t.value = e) : t instanceof HTMLElement && (t.innerText = e);
            }
          }
          clear() {
            (this.options.startDate = null),
              (this.options.endDate = null),
              (this.picker.datePicked.length = 0),
              this.updateValues(),
              this.picker.renderAll(),
              this.picker.trigger('clear');
          }
          onShow(t) {
            const { target: e } = t.detail;
            (this.triggerElement = e),
              this.picker.options.scrollToDate &&
                this.getStartDate() instanceof Date &&
                this.picker.gotoDate(this.getStartDate()),
              this.initializeRepick();
          }
          onView(e) {
            const { view: i, target: n } = e.detail;
            if (
              ('Main' === i &&
                ((this.tooltipElement = document.createElement('span')),
                (this.tooltipElement.className = 'range-plugin-tooltip'),
                n.appendChild(this.tooltipElement)),
              'CalendarDay' === i)
            ) {
              const e = new t(n.dataset.time),
                i = this.picker.datePicked,
                s = i.length ? this.picker.datePicked[0] : this.getStartDate(),
                o = i.length ? this.picker.datePicked[1] : this.getEndDate();
              s && s.isSame(e, 'day') && n.classList.add('start'),
                s &&
                  o &&
                  (o.isSame(e, 'day') && n.classList.add('end'), e.isBetween(s, o) && n.classList.add('in-range'));
            }
            if ('Footer' === i) {
              const t =
                (1 === this.picker.datePicked.length && !this.options.strict) || 2 === this.picker.datePicked.length;
              n.querySelector('.apply-button').disabled = !t;
            }
          }
          hidePicker(t) {
            let e = t.target,
              i = null;
            e.shadowRoot && ((e = t.composedPath()[0]), (i = e.getRootNode().host)),
              this.picker.isShown() &&
                i !== this.picker.ui.wrapper &&
                e !== this.picker.options.element &&
                e !== this.options.elementEnd &&
                this.picker.hide();
          }
          setStartDate(e) {
            const i = new t(e, this.picker.options.format);
            (this.options.startDate = i ? i.clone() : null), this.updateValues(), this.picker.renderAll();
          }
          setEndDate(e) {
            const i = new t(e, this.picker.options.format);
            (this.options.endDate = i ? i.clone() : null), this.updateValues(), this.picker.renderAll();
          }
          setDateRange(e, i) {
            const n = new t(e, this.picker.options.format),
              s = new t(i, this.picker.options.format);
            (this.options.startDate = n ? n.clone() : null),
              (this.options.endDate = s ? s.clone() : null),
              this.updateValues(),
              this.picker.renderAll();
          }
          getStartDate() {
            return this.options.startDate instanceof Date ? this.options.startDate.clone() : null;
          }
          getEndDate() {
            return this.options.endDate instanceof Date ? this.options.endDate.clone() : null;
          }
          onMouseEnter(e) {
            const i = e.target;
            if (i instanceof HTMLElement) {
              this.isContainer(i) && this.initializeRepick();
              const e = i.closest('.unit');
              if (!(e instanceof HTMLElement)) return;
              if (this.picker.isCalendarDay(e)) {
                if (1 !== this.picker.datePicked.length) return;
                let i = this.picker.datePicked[0].clone(),
                  n = new t(e.dataset.time),
                  s = !1;
                if (i.isAfter(n, 'day')) {
                  const t = i.clone();
                  (i = n.clone()), (n = t.clone()), (s = !0);
                }
                if (
                  ([...this.picker.ui.container.querySelectorAll('.day')].forEach((o) => {
                    const a = new t(o.dataset.time),
                      r = this.picker.Calendar.getCalendarDayView(a);
                    a.isBetween(i, n) && r.classList.add('in-range'),
                      a.isSame(this.picker.datePicked[0], 'day') &&
                        (r.classList.add('start'), r.classList.toggle('flipped', s)),
                      o === e && (r.classList.add('end'), r.classList.toggle('flipped', s)),
                      (o.className = r.className);
                  }),
                  this.options.tooltip)
                ) {
                  const t = this.options.tooltipNumber(n.diff(i, 'day') + 1);
                  if (t > 0) {
                    const i = new Intl.PluralRules(this.picker.options.lang).select(t),
                      n = `${t} ${this.options.locale[i]}`;
                    this.showTooltip(e, n);
                  } else this.hideTooltip();
                }
              }
            }
          }
          onMouseLeave(t) {
            if (this.isContainer(t.target) && this.options.repick) {
              const t = this.getStartDate(),
                e = this.getEndDate();
              t && e && ((this.picker.datePicked.length = 0), this.picker.renderAll());
            }
          }
          onClickCalendarDay(e) {
            if (this.picker.isCalendarDay(e)) {
              2 === this.picker.datePicked.length && (this.picker.datePicked.length = 0);
              const i = new t(e.dataset.time);
              if (
                ((this.picker.datePicked[this.picker.datePicked.length] = i),
                2 === this.picker.datePicked.length && this.picker.datePicked[0].isAfter(this.picker.datePicked[1]))
              ) {
                const t = this.picker.datePicked[1].clone();
                (this.picker.datePicked[1] = this.picker.datePicked[0].clone()),
                  (this.picker.datePicked[0] = t.clone());
              }
              (1 !== this.picker.datePicked.length && this.picker.options.autoApply) ||
                this.picker.trigger('preselect', {
                  start: this.picker.datePicked[0] instanceof Date ? this.picker.datePicked[0].clone() : null,
                  end: this.picker.datePicked[1] instanceof Date ? this.picker.datePicked[1].clone() : null,
                }),
                1 === this.picker.datePicked.length &&
                  (!this.options.strict &&
                    this.picker.options.autoApply &&
                    (this.picker.options.element === this.triggerElement &&
                      this.setStartDate(this.picker.datePicked[0]),
                    this.options.elementEnd === this.triggerElement && this.setEndDate(this.picker.datePicked[0]),
                    this.picker.trigger('select', {
                      start: this.picker.getStartDate(),
                      end: this.picker.getEndDate(),
                    })),
                  this.picker.renderAll()),
                2 === this.picker.datePicked.length &&
                  (this.picker.options.autoApply
                    ? (this.setDateRange(this.picker.datePicked[0], this.picker.datePicked[1]),
                      this.picker.trigger('select', {
                        start: this.picker.getStartDate(),
                        end: this.picker.getEndDate(),
                      }),
                      this.picker.hide())
                    : (this.hideTooltip(), this.picker.renderAll()));
            }
          }
          onClickApplyButton(t) {
            this.picker.isApplyButton(t) &&
              (1 !== this.picker.datePicked.length ||
                this.options.strict ||
                (this.picker.options.element === this.triggerElement &&
                  ((this.options.endDate = null), this.setStartDate(this.picker.datePicked[0])),
                this.options.elementEnd === this.triggerElement &&
                  ((this.options.startDate = null), this.setEndDate(this.picker.datePicked[0]))),
              2 === this.picker.datePicked.length &&
                this.setDateRange(this.picker.datePicked[0], this.picker.datePicked[1]),
              this.picker.trigger('select', { start: this.picker.getStartDate(), end: this.picker.getEndDate() }),
              this.picker.hide());
          }
          showTooltip(t, e) {
            (this.tooltipElement.style.visibility = 'visible'), (this.tooltipElement.innerHTML = e);
            const i = this.picker.ui.container.getBoundingClientRect(),
              n = this.tooltipElement.getBoundingClientRect(),
              s = t.getBoundingClientRect();
            let o = s.top,
              a = s.left;
            (o -= i.top),
              (a -= i.left),
              (o -= n.height),
              (a -= n.width / 2),
              (a += s.width / 2),
              (this.tooltipElement.style.top = `${o}px`),
              (this.tooltipElement.style.left = `${a}px`);
          }
          hideTooltip() {
            this.tooltipElement.style.visibility = 'hidden';
          }
          checkIntlPluralLocales() {
            if (!this.options.tooltip) return;
            const t = [
                ...new Set([
                  new Intl.PluralRules(this.picker.options.lang).select(0),
                  new Intl.PluralRules(this.picker.options.lang).select(1),
                  new Intl.PluralRules(this.picker.options.lang).select(2),
                  new Intl.PluralRules(this.picker.options.lang).select(6),
                  new Intl.PluralRules(this.picker.options.lang).select(18),
                ]),
              ],
              e = Object.keys(this.options.locale);
            t.every((t) => e.includes(t)) ||
              console.warn(`${this.getName()}: provide locales (${t.join(', ')}) for correct tooltip text.`);
          }
          initializeRepick() {
            if (!this.options.repick) return;
            const t = this.getStartDate(),
              e = this.getEndDate();
            e && this.triggerElement === this.picker.options.element && (this.picker.datePicked[0] = e),
              t && this.triggerElement === this.options.elementEnd && (this.picker.datePicked[0] = t);
          }
          isContainer(t) {
            return t === this.picker.ui.container;
          }
        }
        class l extends o {
          options = { native: !1, seconds: !1, stepHours: 1, stepMinutes: 5, stepSeconds: 5, format12: !1 };
          rangePlugin;
          timePicked = { input: null, start: null, end: null };
          timePrePicked = { input: null, start: null, end: null };
          binds = {
            getDate: this.getDate.bind(this),
            getStartDate: this.getStartDate.bind(this),
            getEndDate: this.getEndDate.bind(this),
            onView: this.onView.bind(this),
            onInput: this.onInput.bind(this),
            onChange: this.onChange.bind(this),
            onClick: this.onClick.bind(this),
            setTime: this.setTime.bind(this),
            setStartTime: this.setStartTime.bind(this),
            setEndTime: this.setEndTime.bind(this),
          };
          getName() {
            return 'TimePlugin';
          }
          onAttach() {
            (this.binds._getDate = this.picker.getDate),
              (this.binds._getStartDate = this.picker.getStartDate),
              (this.binds._getEndDate = this.picker.getEndDate),
              Object.defineProperties(this.picker, {
                getDate: { configurable: !0, value: this.binds.getDate },
                getStartDate: { configurable: !0, value: this.binds.getStartDate },
                getEndDate: { configurable: !0, value: this.binds.getEndDate },
                setTime: { configurable: !0, value: this.binds.setTime },
                setStartTime: { configurable: !0, value: this.binds.setStartTime },
                setEndTime: { configurable: !0, value: this.binds.setEndTime },
              }),
              (this.rangePlugin = this.picker.PluginManager.getInstance('RangePlugin')),
              this.parseValues(),
              this.picker.on('view', this.binds.onView),
              this.picker.on('input', this.binds.onInput),
              this.picker.on('change', this.binds.onChange),
              this.picker.on('click', this.binds.onClick);
          }
          onDetach() {
            delete this.picker.setTime,
              delete this.picker.setStartTime,
              delete this.picker.setEndTime,
              Object.defineProperties(this.picker, {
                getDate: { configurable: !0, value: this.binds._getDate },
                getStartDate: { configurable: !0, value: this.binds._getStartDate },
                getEndDate: { configurable: !0, value: this.binds._getEndDate },
              }),
              this.picker.off('view', this.binds.onView),
              this.picker.off('input', this.binds.onInput),
              this.picker.off('change', this.binds.onChange),
              this.picker.off('click', this.binds.onClick);
          }
          onView(t) {
            const { view: e, target: i } = t.detail;
            if ('Main' === e) {
              this.rangePlugin = this.picker.PluginManager.getInstance('RangePlugin');
              const t = document.createElement('div');
              if (((t.className = 'time-plugin-container'), this.rangePlugin)) {
                const e = this.getStartInput();
                t.appendChild(e), this.picker.trigger('view', { view: 'TimePluginInput', target: e });
                const i = this.getEndInput();
                t.appendChild(i), this.picker.trigger('view', { view: 'TimePluginInput', target: i });
              } else {
                const e = this.getSingleInput();
                t.appendChild(e), this.picker.trigger('view', { view: 'TimePluginInput', target: e });
              }
              i.appendChild(t), this.picker.trigger('view', { view: 'TimePluginContainer', target: t });
            }
          }
          onInput(e) {
            const i = e.target;
            if (i instanceof HTMLInputElement && i.classList.contains('time-plugin-input')) {
              const e = this.timePicked[i.name] || new t(),
                [n, s] = i.value.split(':');
              e.setHours(Number(n) || 0, Number(s) || 0, 0, 0),
                this.picker.options.autoApply
                  ? ((this.timePicked[i.name] = e), this.picker.updateValues())
                  : (this.timePrePicked[i.name] = e);
            }
          }
          onChange(e) {
            const i = e.target;
            if (i instanceof HTMLSelectElement && i.classList.contains('time-plugin-custom-input')) {
              const e = /(\w+)\[(\w+)\]/,
                [, n, s] = i.name.match(e),
                o = Number(i.value);
              let a = new t();
              switch (
                (!this.picker.options.autoApply && this.timePrePicked[n] instanceof Date
                  ? (a = this.timePrePicked[n].clone())
                  : this.timePicked[n] instanceof Date && (a = this.timePicked[n].clone()),
                s)
              ) {
                case 'HH':
                  if (this.options.format12) {
                    const t = i.closest('.time-plugin-custom-block').querySelector(`select[name="${n}[period]"]`).value,
                      e = this.handleFormat12(t, a, o);
                    a.setHours(e.getHours(), e.getMinutes(), e.getSeconds(), 0);
                  } else a.setHours(o, a.getMinutes(), a.getSeconds(), 0);
                  break;
                case 'mm':
                  a.setHours(a.getHours(), o, a.getSeconds(), 0);
                  break;
                case 'ss':
                  a.setHours(a.getHours(), a.getMinutes(), o, 0);
                  break;
                case 'period':
                  if (this.options.format12) {
                    const t = i.closest('.time-plugin-custom-block').querySelector(`select[name="${n}[HH]"]`).value,
                      e = this.handleFormat12(i.value, a, Number(t));
                    a.setHours(e.getHours(), e.getMinutes(), e.getSeconds(), 0);
                  }
              }
              if (this.picker.options.autoApply) (this.timePicked[n] = a), this.picker.updateValues();
              else {
                this.timePrePicked[n] = a;
                const t = this.picker.ui.container.querySelector('.apply-button');
                if (this.rangePlugin) {
                  const e = this.rangePlugin.options,
                    i = this.picker.datePicked,
                    n =
                      (e.strict && 2 === i.length) ||
                      (!e.strict && i.length > 0) ||
                      (!i.length && e.strict && e.startDate instanceof Date && e.endDate instanceof Date) ||
                      (!i.length && !e.strict && (e.startDate instanceof Date || e.endDate instanceof Date));
                  t.disabled = !n;
                } else this.picker.datePicked.length && (t.disabled = !1);
              }
            }
          }
          onClick(t) {
            const e = t.target;
            if (e instanceof HTMLElement) {
              const t = e.closest('.unit');
              if (!(t instanceof HTMLElement)) return;
              this.picker.isApplyButton(t) &&
                (Object.keys(this.timePicked).forEach((t) => {
                  this.timePrePicked[t] instanceof Date && (this.timePicked[t] = this.timePrePicked[t].clone());
                }),
                this.picker.updateValues(),
                (this.timePrePicked = { input: null, start: null, end: null })),
                this.picker.isCancelButton(t) &&
                  ((this.timePrePicked = { input: null, start: null, end: null }), this.picker.renderAll());
            }
          }
          setTime(t) {
            const e = this.handleTimeString(t);
            (this.timePicked.input = e.clone()), this.picker.renderAll(), this.picker.updateValues();
          }
          setStartTime(t) {
            const e = this.handleTimeString(t);
            (this.timePicked.start = e.clone()), this.picker.renderAll(), this.picker.updateValues();
          }
          setEndTime(t) {
            const e = this.handleTimeString(t);
            (this.timePicked.end = e.clone()), this.picker.renderAll(), this.picker.updateValues();
          }
          handleTimeString(e) {
            const i = new t(),
              [n, s, o] = e.split(':').map((t) => Number(t)),
              a = n && !Number.isNaN(n) ? n : 0,
              r = s && !Number.isNaN(s) ? s : 0,
              c = o && !Number.isNaN(o) ? o : 0;
            return i.setHours(a, r, c, 0), i;
          }
          getDate() {
            if (this.picker.options.date instanceof Date) {
              const e = new t(this.picker.options.date, this.picker.options.format);
              if (this.timePicked.input instanceof Date) {
                const t = this.timePicked.input;
                e.setHours(t.getHours(), t.getMinutes(), t.getSeconds(), 0);
              }
              return e;
            }
            return null;
          }
          getStartDate() {
            if (this.rangePlugin.options.startDate instanceof Date) {
              const e = new t(this.rangePlugin.options.startDate, this.picker.options.format);
              if (this.timePicked.start instanceof Date) {
                const t = this.timePicked.start;
                e.setHours(t.getHours(), t.getMinutes(), t.getSeconds(), 0);
              }
              return e;
            }
            return null;
          }
          getEndDate() {
            if (this.rangePlugin.options.endDate instanceof Date) {
              const e = new t(this.rangePlugin.options.endDate, this.picker.options.format);
              if (this.timePicked.end instanceof Date) {
                const t = this.timePicked.end;
                e.setHours(t.getHours(), t.getMinutes(), t.getSeconds(), 0);
              }
              return e;
            }
            return null;
          }
          getSingleInput() {
            return this.options.native ? this.getNativeInput('input') : this.getCustomInput('input');
          }
          getStartInput() {
            return this.options.native ? this.getNativeInput('start') : this.getCustomInput('start');
          }
          getEndInput() {
            return this.options.native ? this.getNativeInput('end') : this.getCustomInput('end');
          }
          getNativeInput(t) {
            const e = document.createElement('input');
            (e.type = 'time'), (e.name = t), (e.className = 'time-plugin-input unit');
            const i = this.timePicked[t];
            if (i) {
              const t = `0${i.getHours()}`.slice(-2),
                n = `0${i.getMinutes()}`.slice(-2);
              e.value = `${t}:${n}`;
            }
            return e;
          }
          getCustomInput(t) {
            const e = document.createElement('div');
            e.className = 'time-plugin-custom-block';
            const i = document.createElement('select');
            (i.className = 'time-plugin-custom-input unit'), (i.name = `${t}[HH]`);
            const n = this.options.format12 ? 1 : 0,
              s = this.options.format12 ? 13 : 24;
            let o = null;
            !this.picker.options.autoApply && this.timePrePicked[t] instanceof Date
              ? (o = this.timePrePicked[t].clone())
              : this.timePicked[t] instanceof Date && (o = this.timePicked[t].clone());
            for (let t = n; t < s; t += this.options.stepHours) {
              const e = document.createElement('option');
              (e.value = String(t)),
                (e.text = String(t)),
                o &&
                  (this.options.format12
                    ? (o.getHours() % 12 ? o.getHours() % 12 : 12) === t && (e.selected = !0)
                    : o.getHours() === t && (e.selected = !0)),
                i.appendChild(e);
            }
            e.appendChild(i);
            const a = document.createElement('select');
            (a.className = 'time-plugin-custom-input unit'), (a.name = `${t}[mm]`);
            for (let t = 0; t < 60; t += this.options.stepMinutes) {
              const e = document.createElement('option');
              (e.value = `0${String(t)}`.slice(-2)),
                (e.text = `0${String(t)}`.slice(-2)),
                o && o.getMinutes() === t && (e.selected = !0),
                a.appendChild(e);
            }
            if ((e.appendChild(a), this.options.seconds)) {
              const i = document.createElement('select');
              (i.className = 'time-plugin-custom-input unit'), (i.name = `${t}[ss]`);
              const n = 60;
              for (let t = 0; t < n; t += this.options.stepSeconds) {
                const e = document.createElement('option');
                (e.value = `0${String(t)}`.slice(-2)),
                  (e.text = `0${String(t)}`.slice(-2)),
                  o && o.getSeconds() === t && (e.selected = !0),
                  i.appendChild(e);
              }
              e.appendChild(i);
            }
            if (this.options.format12) {
              const i = document.createElement('select');
              (i.className = 'time-plugin-custom-input unit'),
                (i.name = `${t}[period]`),
                ['AM', 'PM'].forEach((t) => {
                  const e = document.createElement('option');
                  (e.value = t),
                    (e.text = t),
                    o && 'PM' === t && o.getHours() >= 12 && (e.selected = !0),
                    i.appendChild(e);
                }),
                e.appendChild(i);
            }
            return e;
          }
          handleFormat12(t, e, i) {
            const n = e.clone();
            switch (t) {
              case 'AM':
                12 === i
                  ? n.setHours(0, n.getMinutes(), n.getSeconds(), 0)
                  : n.setHours(i, n.getMinutes(), n.getSeconds(), 0);
                break;
              case 'PM':
                12 !== i
                  ? n.setHours(i + 12, n.getMinutes(), n.getSeconds(), 0)
                  : n.setHours(i, n.getMinutes(), n.getSeconds(), 0);
            }
            return n;
          }
          parseValues() {
            if (this.rangePlugin) {
              if (this.rangePlugin.options.strict) {
                if (this.rangePlugin.options.startDate && this.rangePlugin.options.endDate) {
                  const e = new t(this.rangePlugin.options.startDate, this.picker.options.format),
                    i = new t(this.rangePlugin.options.endDate, this.picker.options.format);
                  (this.timePicked.start = e.clone()), (this.timePicked.end = i.clone());
                }
              } else {
                if (this.rangePlugin.options.startDate) {
                  const e = new t(this.rangePlugin.options.startDate, this.picker.options.format);
                  this.timePicked.start = e.clone();
                }
                if (this.rangePlugin.options.endDate) {
                  const e = new t(this.rangePlugin.options.endDate, this.picker.options.format);
                  this.timePicked.end = e.clone();
                }
              }
              if (this.rangePlugin.options.elementEnd)
                if (this.rangePlugin.options.strict) {
                  if (
                    this.picker.options.element instanceof HTMLInputElement &&
                    this.picker.options.element.value.length &&
                    this.rangePlugin.options.elementEnd instanceof HTMLInputElement &&
                    this.rangePlugin.options.elementEnd.value.length
                  ) {
                    const e = new t(this.picker.options.element.value, this.picker.options.format),
                      i = new t(this.rangePlugin.options.elementEnd.value, this.picker.options.format);
                    (this.timePicked.start = e.clone()), (this.timePicked.end = i.clone());
                  }
                } else {
                  if (
                    this.picker.options.element instanceof HTMLInputElement &&
                    this.picker.options.element.value.length
                  ) {
                    const e = new t(this.picker.options.element.value, this.picker.options.format);
                    this.timePicked.start = e.clone();
                  }
                  if (
                    this.rangePlugin.options.elementEnd instanceof HTMLInputElement &&
                    this.rangePlugin.options.elementEnd.value.length
                  ) {
                    const e = new t(this.rangePlugin.options.elementEnd.value, this.picker.options.format);
                    this.timePicked.start = e.clone();
                  }
                }
              else if (
                this.picker.options.element instanceof HTMLInputElement &&
                this.picker.options.element.value.length
              ) {
                const [e, i] = this.picker.options.element.value.split(this.rangePlugin.options.delimiter);
                if (this.rangePlugin.options.strict) {
                  if (e && i) {
                    const n = new t(e, this.picker.options.format),
                      s = new t(i, this.picker.options.format);
                    (this.timePicked.start = n.clone()), (this.timePicked.end = s.clone());
                  }
                } else {
                  if (e) {
                    const i = new t(e, this.picker.options.format);
                    this.timePicked.start = i.clone();
                  }
                  if (i) {
                    const e = new t(i, this.picker.options.format);
                    this.timePicked.start = e.clone();
                  }
                }
              }
            } else {
              if (this.picker.options.date) {
                const e = new t(this.picker.options.date, this.picker.options.format);
                this.timePicked.input = e.clone();
              }
              if (this.picker.options.element instanceof HTMLInputElement && this.picker.options.element.value.length) {
                const e = new t(this.picker.options.element.value, this.picker.options.format);
                this.timePicked.input = e.clone();
              }
            }
          }
        }
        class h extends o {
          docElement = null;
          rangePlugin;
          binds = { onView: this.onView.bind(this), onKeydown: this.onKeydown.bind(this) };
          options = { unitIndex: 1, dayIndex: 2 };
          getName() {
            return 'KbdPlugin';
          }
          onAttach() {
            const t = this.picker.options.element,
              e = t.getBoundingClientRect();
            if (
              ((this.docElement = document.createElement('span')),
              (this.docElement.style.position = 'absolute'),
              (this.docElement.style.top = `${t.offsetTop}px`),
              (this.docElement.style.left = t.offsetLeft + e.width - 25 + 'px'),
              this.docElement.attachShadow({ mode: 'open' }),
              this.options.html)
            )
              this.docElement.shadowRoot.innerHTML = this.options.html;
            else {
              const t = `\n      <style>\n      button {\n        border: none;\n        background: transparent;\n        font-size: ${
                window.getComputedStyle(this.picker.options.element).fontSize
              };\n      }\n      </style>\n\n      <button>&#128197;</button>\n      `;
              this.docElement.shadowRoot.innerHTML = t;
            }
            const i = this.docElement.shadowRoot.querySelector('button');
            i &&
              (i.addEventListener(
                'click',
                (t) => {
                  t.preventDefault(), this.picker.show({ target: this.picker.options.element });
                },
                { capture: !0 }
              ),
              i.addEventListener(
                'keydown',
                (t) => {
                  'Escape' === t.code && this.picker.hide();
                },
                { capture: !0 }
              )),
              this.picker.options.element.after(this.docElement),
              this.picker.on('view', this.binds.onView),
              this.picker.on('keydown', this.binds.onKeydown);
          }
          onDetach() {
            this.docElement && this.docElement.isConnected && this.docElement.remove(),
              this.picker.off('view', this.binds.onView),
              this.picker.off('keydown', this.binds.onKeydown);
          }
          onView(t) {
            const { view: e, target: i } = t.detail;
            i &&
              'querySelector' in i &&
              ('CalendarDay' !== e || ['locked', 'not-available'].some((t) => i.classList.contains(t))
                ? [...i.querySelectorAll('.unit:not(.day)')].forEach((t) => (t.tabIndex = this.options.unitIndex))
                : (i.tabIndex = this.options.dayIndex));
          }
          onKeydown(t) {
            switch ((this.onMouseEnter(t), t.code)) {
              case 'ArrowUp':
              case 'ArrowDown':
                this.verticalMove(t);
                break;
              case 'ArrowLeft':
              case 'ArrowRight':
                this.horizontalMove(t);
                break;
              case 'Enter':
              case 'Space':
                this.handleEnter(t);
                break;
              case 'Escape':
                this.picker.hide();
            }
          }
          findAllowableDaySibling(t, e, i) {
            const n = Array.from(t.querySelectorAll(`.day[tabindex="${this.options.dayIndex}"]`)),
              s = n.indexOf(e);
            return n.filter((t, e) => i(e, s) && t.tabIndex === this.options.dayIndex)[0];
          }
          changeMonth(t) {
            const e = { ArrowLeft: 'previous', ArrowRight: 'next' },
              i = this.picker.ui.container.querySelector(`.${e[t.code]}-button[tabindex="${this.options.unitIndex}"]`);
            i &&
              !i.parentElement.classList.contains(`no-${e[t.code]}-month`) &&
              (i.dispatchEvent(new Event('click', { bubbles: !0 })),
              setTimeout(() => {
                let e = null;
                switch (t.code) {
                  case 'ArrowLeft':
                    const t = this.picker.ui.container.querySelectorAll(`.day[tabindex="${this.options.dayIndex}"]`);
                    e = t[t.length - 1];
                    break;
                  case 'ArrowRight':
                    e = this.picker.ui.container.querySelector(`.day[tabindex="${this.options.dayIndex}"]`);
                }
                e && e.focus();
              }));
          }
          verticalMove(t) {
            const e = t.target;
            if (e.classList.contains('day')) {
              t.preventDefault();
              const i = this.findAllowableDaySibling(
                this.picker.ui.container,
                e,
                (e, i) => e === ('ArrowUp' === t.code ? i - 7 : i + 7)
              );
              i && i.focus();
            }
          }
          horizontalMove(t) {
            const e = t.target;
            if (e.classList.contains('day')) {
              t.preventDefault();
              const i = this.findAllowableDaySibling(
                this.picker.ui.container,
                e,
                (e, i) => e === ('ArrowLeft' === t.code ? i - 1 : i + 1)
              );
              i ? i.focus() : this.changeMonth(t);
            }
          }
          handleEnter(t) {
            const e = t.target;
            e.classList.contains('day') &&
              (t.preventDefault(),
              e.dispatchEvent(new Event('click', { bubbles: !0 })),
              setTimeout(() => {
                if (
                  ((this.rangePlugin = this.picker.PluginManager.getInstance('RangePlugin')),
                  this.rangePlugin || !this.picker.options.autoApply)
                ) {
                  const t = this.picker.ui.container.querySelector('.day.selected');
                  t &&
                    setTimeout(() => {
                      t.focus();
                    });
                }
              }));
          }
          onMouseEnter(t) {
            t.target.classList.contains('day') &&
              setTimeout(() => {
                const t = this.picker.ui.shadowRoot.activeElement;
                t && t.dispatchEvent(new Event('mouseenter', { bubbles: !0 }));
              });
          }
        }
        class d extends o {
          rangePlugin;
          lockPlugin;
          priority = 10;
          binds = { onView: this.onView.bind(this), onColorScheme: this.onColorScheme.bind(this) };
          options = {
            dropdown: { months: !1, years: !1, minYear: 1950, maxYear: null },
            darkMode: !0,
            locale: {
              resetButton:
                '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>',
            },
          };
          matchMedia;
          getName() {
            return 'AmpPlugin';
          }
          onAttach() {
            this.options.darkMode &&
              window &&
              'matchMedia' in window &&
              ((this.matchMedia = window.matchMedia('(prefers-color-scheme: dark)')),
              this.matchMedia.matches && (this.picker.ui.container.dataset.theme = 'dark'),
              this.matchMedia.addEventListener('change', this.binds.onColorScheme)),
              this.options.weekNumbers && this.picker.ui.container.classList.add('week-numbers'),
              this.picker.on('view', this.binds.onView);
          }
          onDetach() {
            this.options.darkMode &&
              window &&
              'matchMedia' in window &&
              this.matchMedia.removeEventListener('change', this.binds.onColorScheme),
              this.picker.ui.container.removeAttribute('data-theme'),
              this.picker.ui.container.classList.remove('week-numbers'),
              this.picker.off('view', this.binds.onView);
          }
          onView(t) {
            (this.lockPlugin = this.picker.PluginManager.getInstance('LockPlugin')),
              (this.rangePlugin = this.picker.PluginManager.getInstance('RangePlugin')),
              this.handleDropdown(t),
              this.handleResetButton(t),
              this.handleWeekNumbers(t);
          }
          onColorScheme(t) {
            const e = t.matches ? 'dark' : 'light';
            this.picker.ui.container.dataset.theme = e;
          }
          handleDropdown(e) {
            const { view: i, target: n, date: s, index: o } = e.detail;
            if ('CalendarHeader' === i) {
              const e = n.querySelector('.month-name');
              if (this.options.dropdown.months) {
                e.childNodes[0].remove();
                const i = document.createElement('select');
                i.className = 'month-name--select month-name--dropdown';
                for (let e = 0; e < 12; e += 1) {
                  const n = document.createElement('option'),
                    o = new t(new Date(s.getFullYear(), e, 2, 0, 0, 0)),
                    a = new t(new Date(s.getFullYear(), e, 1, 0, 0, 0));
                  (n.value = String(e)),
                    (n.text = o.toLocaleString(this.picker.options.lang, { month: 'long' })),
                    this.lockPlugin &&
                      (n.disabled =
                        (this.lockPlugin.options.minDate &&
                          a.isBefore(new t(this.lockPlugin.options.minDate), 'month')) ||
                        (this.lockPlugin.options.maxDate &&
                          a.isAfter(new t(this.lockPlugin.options.maxDate), 'month'))),
                    (n.selected = a.getMonth() === s.getMonth()),
                    i.appendChild(n);
                }
                i.addEventListener('change', (t) => {
                  const e = t.target;
                  this.picker.calendars[0].setDate(1),
                    this.picker.calendars[0].setMonth(Number(e.value)),
                    this.picker.renderAll();
                }),
                  e.prepend(i);
              }
              if (this.options.dropdown.years) {
                e.childNodes[1].remove();
                const i = document.createElement('select');
                i.className = 'month-name--select';
                const n = this.options.dropdown.minYear,
                  o = this.options.dropdown.maxYear ? this.options.dropdown.maxYear : new Date().getFullYear();
                if (s.getFullYear() > o) {
                  const t = document.createElement('option');
                  (t.value = String(s.getFullYear())),
                    (t.text = String(s.getFullYear())),
                    (t.selected = !0),
                    (t.disabled = !0),
                    i.appendChild(t);
                }
                for (let e = o; e >= n; e -= 1) {
                  const n = document.createElement('option'),
                    o = new t(new Date(e, 0, 1, 0, 0, 0));
                  (n.value = String(e)),
                    (n.text = String(e)),
                    this.lockPlugin &&
                      (n.disabled =
                        (this.lockPlugin.options.minDate &&
                          o.isBefore(new t(this.lockPlugin.options.minDate), 'year')) ||
                        (this.lockPlugin.options.maxDate && o.isAfter(new t(this.lockPlugin.options.maxDate), 'year'))),
                    (n.selected = s.getFullYear() === e),
                    i.appendChild(n);
                }
                if (s.getFullYear() < n) {
                  const t = document.createElement('option');
                  (t.value = String(s.getFullYear())),
                    (t.text = String(s.getFullYear())),
                    (t.selected = !0),
                    (t.disabled = !0),
                    i.appendChild(t);
                }
                if ('asc' === this.options.dropdown.years) {
                  const t = Array.prototype.slice.call(i.childNodes).reverse();
                  (i.innerHTML = ''),
                    t.forEach((t) => {
                      (t.innerHTML = t.value), i.appendChild(t);
                    });
                }
                i.addEventListener('change', (t) => {
                  const e = t.target;
                  this.picker.calendars[0].setFullYear(Number(e.value)), this.picker.renderAll();
                }),
                  e.appendChild(i);
              }
            }
          }
          handleResetButton(t) {
            const { view: e, target: i } = t.detail;
            if ('CalendarHeader' === e && this.options.resetButton) {
              const t = document.createElement('button');
              (t.className = 'reset-button unit'),
                (t.innerHTML = this.options.locale.resetButton),
                t.addEventListener('click', (t) => {
                  t.preventDefault();
                  let e = !0;
                  'function' == typeof this.options.resetButton && (e = this.options.resetButton.call(this)),
                    e && this.picker.clear();
                }),
                i.appendChild(t);
            }
          }
          handleWeekNumbers(e) {
            if (this.options.weekNumbers) {
              const { view: i, target: n } = e.detail;
              if ('CalendarDayNames' === i) {
                const t = document.createElement('div');
                (t.className = 'wnum-header'), (t.innerHTML = 'Wk'), n.prepend(t);
              }
              'CalendarDays' === i &&
                [...n.children].forEach((e, i) => {
                  if (0 === i || i % 7 == 0) {
                    let i;
                    if (e.classList.contains('day')) i = new t(e.dataset.time);
                    else {
                      const e = n.querySelector('.day');
                      i = new t(e.dataset.time);
                    }
                    let s = i.getWeek(this.picker.options.firstDay);
                    53 === s && 0 === i.getMonth() && (s = '53/1');
                    const o = document.createElement('div');
                    (o.className = 'wnum-item'), (o.innerHTML = String(s)), n.insertBefore(o, e);
                  }
                });
            }
          }
        }

        /***/
      },

    /***/ './src/cart.ts':
      /*!*********************!*\
  !*** ./src/cart.ts ***!
  \*********************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        var __awaiter =
          (this && this.__awaiter) ||
          function (thisArg, _arguments, P, generator) {
            function adopt(value) {
              return value instanceof P
                ? value
                : new P(function (resolve) {
                    resolve(value);
                  });
            }
            return new (P || (P = Promise))(function (resolve, reject) {
              function fulfilled(value) {
                try {
                  step(generator.next(value));
                } catch (e) {
                  reject(e);
                }
              }
              function rejected(value) {
                try {
                  step(generator['throw'](value));
                } catch (e) {
                  reject(e);
                }
              }
              function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
              }
              step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
          };
        var __generator =
          (this && this.__generator) ||
          function (thisArg, body) {
            var _ = {
                label: 0,
                sent: function () {
                  if (t[0] & 1) throw t[1];
                  return t[1];
                },
                trys: [],
                ops: [],
              },
              f,
              y,
              t,
              g;
            return (
              (g = { next: verb(0), throw: verb(1), return: verb(2) }),
              typeof Symbol === 'function' &&
                (g[Symbol.iterator] = function () {
                  return this;
                }),
              g
            );
            function verb(n) {
              return function (v) {
                return step([n, v]);
              };
            }
            function step(op) {
              if (f) throw new TypeError('Generator is already executing.');
              while ((g && ((g = 0), op[0] && (_ = 0)), _))
                try {
                  if (
                    ((f = 1),
                    y &&
                      (t =
                        op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) &&
                      !(t = t.call(y, op[1])).done)
                  )
                    return t;
                  if (((y = 0), t)) op = [op[0] & 2, t.value];
                  switch (op[0]) {
                    case 0:
                    case 1:
                      t = op;
                      break;
                    case 4:
                      _.label++;
                      return { value: op[1], done: false };
                    case 5:
                      _.label++;
                      y = op[1];
                      op = [0];
                      continue;
                    case 7:
                      op = _.ops.pop();
                      _.trys.pop();
                      continue;
                    default:
                      if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                      }
                      if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                        _.label = op[1];
                        break;
                      }
                      if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                      }
                      if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                      }
                      if (t[2]) _.ops.pop();
                      _.trys.pop();
                      continue;
                  }
                  op = body.call(thisArg, _);
                } catch (e) {
                  op = [6, e];
                  y = 0;
                } finally {
                  f = t = 0;
                }
              if (op[0] & 5) throw op[1];
              return { value: op[0] ? op[1] : void 0, done: true };
            }
          };
        Object.defineProperty(exports, '__esModule', { value: true });
        var bundle_1 = __webpack_require__(/*! @easepick/bundle */ './node_modules/@easepick/bundle/dist/index.esm.js');
        //global variables for datepicker
        var currentDate = new Date();
        var fiveDays = 5 * 24 * 60 * 60 * 1000;
        // --get cart items from hidden input for datepicker--
        var cartEventsHiddenInput = document.querySelector('#carts-events-hidden-input');
        var carts = JSON.parse(cartEventsHiddenInput.value);
        // variable to set default image to brand dynamically in modal window. Can we get link from the internet?
        var defaultImage =
          'https://raw.githubusercontent.com/Simple2B/BeamSuntory/develop/app/static/img/no_picture_default.png';
        // --count total quantity and price--
        var totalPriceElement = document.querySelector('#cart-total-price');
        var totalQuantityElement = document.querySelector('#cart-total-quantity');
        var tableCartItems = document.querySelectorAll('.table-cart-item');
        var submitBtn = document.querySelector('#cart-ship-request-submit-btn');
        var totalPrice = 0;
        var totalQuantity = 0;
        var hasEventGroup = false;
        // check if cart has event group
        tableCartItems.forEach(function (item) {
          console.log('item', item);
          var group = item.getAttribute('data-target-group');
          if (group === 'Events') {
            hasEventGroup = true;
          }
          var priceElement = item.querySelector('.cart-item-retail_price');
          var quantityElement = item.querySelector('.cart-item-quantity');
          var availableProductQuantity = quantityElement.getAttribute('data-target-available-quantity');
          var price = parseFloat(priceElement.textContent);
          var quantity = parseInt(quantityElement.value);
          var totalPriceOneElement = price * quantity;
          totalPrice += totalPriceOneElement;
          totalQuantity += quantity;
          quantityElement.max = availableProductQuantity;
        });
        totalPriceElement.textContent = '$'.concat(totalPrice.toFixed(2));
        totalQuantityElement.textContent = totalQuantity.toString();
        // add event date range, disable submit button if cart has event group
        if (hasEventGroup) {
          var eventContainer = document.querySelector('#cart-event-container');
          eventContainer.classList.remove('hidden');
          eventContainer.classList.add('flex');
        } else {
          submitBtn.removeAttribute('disabled');
        }
        // --add delivery form when create ship request--
        var deliverToStoreBtn = document.querySelector('#cart-deliver-to-store-btn');
        var createStoreRequestContainer = document.querySelector('#cart-create-store-request-container');
        deliverToStoreBtn.addEventListener('click', function () {
          createStoreRequestContainer.style.display = 'block';
        });
        // --delete cart item--
        var deleteButtons = document.querySelectorAll('.delete-cart-item-btn');
        deleteButtons.forEach(function (e) {
          e.addEventListener('click', function () {
            return __awaiter(void 0, void 0, void 0, function () {
              var id, response;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    if (!confirm('Are sure?')) return [3 /*break*/, 2];
                    id = e.getAttribute('data-cart-item-id');
                    return [
                      4 /*yield*/,
                      fetch('/cart/delete/'.concat(id), {
                        method: 'DELETE',
                      }),
                    ];
                  case 1:
                    response = _a.sent();
                    if (response.status == 200) {
                      location.reload();
                    }
                    _a.label = 2;
                  case 2:
                    return [2 /*return*/];
                }
              });
            });
          });
        });
        // --show/hide favorite store in dropdown--
        var favoriteCheckbox = document.querySelector('#cart-favorite-store-checkbox');
        var storeSelect = document.querySelector('#cart-store-select');
        var optionsStore = document.querySelectorAll('.cart-store-option');
        favoriteCheckbox.addEventListener('change', function () {
          var showFavoriteStore = favoriteCheckbox.checked;
          for (var i = 0; i < optionsStore.length; i++) {
            var isFavorite = optionsStore[i].getAttribute('data-target-favorite');
            if (showFavoriteStore && isFavorite !== 'True') {
              optionsStore[i].style.display = 'none';
            } else {
              optionsStore[i].style.display = 'block';
            }
          }
        });
        var storeCategorySelect = document.querySelector('#cart-store-request-category-select');
        var options = storeCategorySelect.querySelectorAll('option');
        storeCategorySelect.addEventListener('change', function () {
          options.forEach(function (e) {
            if (e.textContent === storeCategorySelect.options[storeCategorySelect.selectedIndex].text) {
              var storeSelect_1 = document.querySelector('#cart-store-select');
              var optionCategory = JSON.parse(e.getAttribute('data-target-store-category-store'));
              document.getElementById('cart-store-select').innerHTML = '';
              if (optionCategory) {
                optionCategory.store_category_store.forEach(function (e) {
                  var storeSelectOption = document.createElement('option');
                  console.log('e.id', e.store_id);
                  console.log('storeSelect', storeSelect_1);
                  storeSelectOption.setAttribute('value', e.store_id.toString());
                  storeSelectOption.textContent = e.store_name;
                  storeSelect_1.appendChild(storeSelectOption);
                });
              }
            }
          });
        });
        // --display only sales rep locker--
        var salesRepLockerCheckbox = document.querySelector('#cart-sales-rep-locker-checkbox');
        if (salesRepLockerCheckbox) {
          salesRepLockerCheckbox.addEventListener('change', function () {
            var favoriteStoreContainer = document.querySelector('#cart-store-container');
            var lockerStoreCategoryIds = JSON.parse(
              salesRepLockerCheckbox.getAttribute('data-target-locker-store-category-ids')
            );
            var oldStoreCategoryOptions = storeCategorySelect.querySelectorAll('option');
            var oldStoreOptions = storeSelect.querySelectorAll('option');
            if (salesRepLockerCheckbox.checked) {
              var newStoreCategoryOption = new Option('Locker', lockerStoreCategoryIds[1], true, true);
              var newStoreOption = new Option(' Locker Store', lockerStoreCategoryIds[0], true, true);
              favoriteStoreContainer.classList.add('invisible');
              oldStoreCategoryOptions.forEach(function (e) {
                e.disabled = true;
              });
              storeSelect.appendChild(newStoreOption);
              storeSelect.value = lockerStoreCategoryIds[0].toString();
              storeCategorySelect.appendChild(newStoreCategoryOption);
            } else {
              favoriteStoreContainer.classList.remove('invisible');
              storeSelect.removeChild(oldStoreOptions[oldStoreOptions.length - 1]);
              storeCategorySelect.removeChild(oldStoreCategoryOptions[oldStoreCategoryOptions.length - 1]);
              oldStoreCategoryOptions.forEach(function (e, i) {
                if (i !== 0) {
                  e.disabled = false;
                }
              });
              storeSelect.selectedIndex = 0;
              storeCategorySelect.selectedIndex = 0;
            }
          });
        }
        var eventButtons = document.querySelectorAll('.cart-item-event-button');
        eventButtons.forEach(function (btn) {
          btn.addEventListener('click', function () {
            var cart = JSON.parse(btn.getAttribute('data-target-cart'));
            console.log('cart', cart);
            var div = document.querySelector('#product-event-name');
            div.innerHTML = cart.product.name;
            div = document.querySelector('#product-event-SKU');
            div.innerHTML = cart.product.SKU;
            var img = document.querySelector('#product-event-image');
            cart.product.image.length > 100
              ? (img.src = 'data:image/png;base64, '.concat(cart.product.image))
              : (img.src = defaultImage);
            var input = document.querySelector('#product-event-quantity');
            input.value = cart.quantity.toString();
            input.min = '1';
            input = document.querySelector('#product-event-cart-id-hidden');
            input.value = cart.id.toString();
            input = document.querySelector('#product-event-product-id');
            input.value = cart.product.id.toString();
          });
        });
        var DateTime = bundle_1.easepick.DateTime;
        function formatDate(date) {
          var year = date.getFullYear();
          var month = (date.getMonth() + 1).toString();
          var day = date.getDate().toString();
          return ''.concat(year, '-').concat(month, '-').concat(day);
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
        var picker = new bundle_1.easepick.create({
          element: document.getElementById('datepicker'),
          css: [
            'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
            'https://easepick.com/css/demo_hotelcal.css',
          ],
          plugins: ['RangePlugin', 'LockPlugin'],
          RangePlugin: {
            tooltipNumber: function (num) {
              return num - 1;
            },
          },
          LockPlugin: {
            minDate: new Date(),
            minDays: 1,
            inseparable: true,
            filter: function (date) {
              if (date - +currentDate > fiveDays) {
                return false;
              } else {
                return true;
              }
            },
          },
          zIndex: 4,
          setup: function (picker) {
            var _this = this;
            picker.on('select', function (evt) {
              return __awaiter(_this, void 0, void 0, function () {
                var _a, view, date, target, startDate, endDate, availableEventQuantity, errorMessages;
                return __generator(this, function (_b) {
                  switch (_b.label) {
                    case 0:
                      (_a = evt.detail), (view = _a.view), (date = _a.date), (target = _a.target);
                      startDate =
                        evt.detail.start.getFullYear() +
                        '_' +
                        (evt.detail.start.getMonth() + 1) +
                        '_' +
                        evt.detail.start.getDate();
                      endDate =
                        evt.detail.end.getFullYear() +
                        '_' +
                        (evt.detail.end.getMonth() + 1) +
                        '_' +
                        evt.detail.end.getDate();
                      return [4 /*yield*/, getEventAvailableQuantityByDate(carts, startDate, endDate)];
                    case 1:
                      availableEventQuantity = _b.sent();
                      if (availableEventQuantity.length !== 0) {
                        errorMessages = availableEventQuantity.map(function (e) {
                          return e.error;
                        });
                        alert('Maximum quantity exceeded!' + '\n' + errorMessages.join('\n'));
                        return [2 /*return*/];
                      } else {
                        submitBtn.removeAttribute('disabled');
                      }
                      return [2 /*return*/];
                  }
                });
              });
            });
          },
        });
        function getEventAvailableQuantityByDate(carts, dateFrom, dateTo) {
          return __awaiter(this, void 0, void 0, function () {
            var uniqCarts, fetchPromises, resultAllPromises, results;
            var _this = this;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  uniqCarts = carts.reduce(function (accCartItem, cart) {
                    var foundedCart = accCartItem.find(function (cartItem) {
                      return cartItem.product_id === cart.product_id && cartItem.group === cart.group;
                    });
                    if (foundedCart) {
                      foundedCart.quantity += cart.quantity;
                    } else {
                      accCartItem.push(cart);
                    }
                    return accCartItem;
                  }, []);
                  fetchPromises = uniqCarts.map(function (cart) {
                    return __awaiter(_this, void 0, void 0, function () {
                      var response, message, data_1, data;
                      return __generator(this, function (_a) {
                        switch (_a.label) {
                          case 0:
                            return [
                              4 /*yield*/,
                              fetch(
                                '/event/get_available_quantity_by_date?date_from='
                                  .concat(dateFrom, '&date_to=')
                                  .concat(dateTo, '&group_name=')
                                  .concat(cart.group, '&product_id=')
                                  .concat(cart.product_id, '&quantity=')
                                  .concat(cart.quantity)
                              ),
                            ];
                          case 1:
                            response = _a.sent();
                            if (!(response.status !== 200)) return [3 /*break*/, 3];
                            return [4 /*yield*/, response.json()];
                          case 2:
                            message = _a.sent();
                            data_1 = {
                              cartId: cart.id,
                              error: message,
                              status: false,
                            };
                            return [2 /*return*/, data_1];
                          case 3:
                            data = {
                              cartId: cart.id,
                              status: true,
                            };
                            return [2 /*return*/, data];
                        }
                      });
                    });
                  });
                  resultAllPromises = [];
                  return [4 /*yield*/, Promise.all(fetchPromises)];
                case 1:
                  results = _a.sent();
                  results.forEach(function (result) {
                    if (result.status !== true) {
                      return resultAllPromises.push(result);
                    }
                  });
                  return [2 /*return*/, resultAllPromises];
              }
            });
          });
        }

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          /******/ Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
        /******/
      }
      /******/ Object.defineProperty(exports, '__esModule', { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  /******/
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ // This entry module is referenced by other modules so it can't be inlined
  /******/ var __webpack_exports__ = __webpack_require__('./src/cart.ts');
  /******/
  /******/
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RixzQkFBTyxJQUFJLEVBQUM7Ozt5QkFDYixDQUFDLENBQUM7b0JBQ0csaUJBQWlCLEdBQWlCLEVBQUUsQ0FBQztvQkFFM0IscUJBQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7O29CQUExQyxPQUFPLEdBQUcsU0FBZ0M7b0JBQ2hELE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNO3dCQUNyQixJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFOzRCQUMxQixPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzt5QkFDdkM7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7b0JBRUgsc0JBQU8saUJBQWlCLEVBQUM7Ozs7Q0FDMUI7Ozs7Ozs7VUMxVUQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQGVhc2VwaWNrL2J1bmRsZS9kaXN0L2luZGV4LmVzbS5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9zcmMvY2FydC50cyIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgdCBleHRlbmRzIERhdGV7c3RhdGljIHBhcnNlRGF0ZVRpbWUoZSxpPVwiWVlZWS1NTS1ERFwiLG49XCJlbi1VU1wiKXtpZighZSlyZXR1cm4gbmV3IERhdGUoKG5ldyBEYXRlKS5zZXRIb3VycygwLDAsMCwwKSk7aWYoZSBpbnN0YW5jZW9mIHQpcmV0dXJuIGUudG9KU0RhdGUoKTtpZihlIGluc3RhbmNlb2YgRGF0ZSlyZXR1cm4gZTtpZigvXi0/XFxkezEwLH0kLy50ZXN0KFN0cmluZyhlKSkpcmV0dXJuIG5ldyBEYXRlKE51bWJlcihlKSk7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGUpe2NvbnN0IHM9W107bGV0IG89bnVsbDtmb3IoO251bGwhPShvPXQucmVnZXguZXhlYyhpKSk7KVwiXFxcXFwiIT09b1sxXSYmcy5wdXNoKG8pO2lmKHMubGVuZ3RoKXtjb25zdCBpPXt5ZWFyOm51bGwsbW9udGg6bnVsbCxzaG9ydE1vbnRoOm51bGwsbG9uZ01vbnRoOm51bGwsZGF5Om51bGwsaG91cjowLG1pbnV0ZTowLHNlY29uZDowLGFtcG06bnVsbCx2YWx1ZTpcIlwifTtzWzBdLmluZGV4PjAmJihpLnZhbHVlKz1cIi4qP1wiKTtmb3IoY29uc3RbZSxvXW9mIE9iamVjdC5lbnRyaWVzKHMpKXtjb25zdCBzPU51bWJlcihlKSx7Z3JvdXA6YSxwYXR0ZXJuOnJ9PXQuZm9ybWF0UGF0dGVybnMob1swXSxuKTtpW2FdPXMrMSxpLnZhbHVlKz1yLGkudmFsdWUrPVwiLio/XCJ9Y29uc3Qgbz1uZXcgUmVnRXhwKGBeJHtpLnZhbHVlfSRgKTtpZihvLnRlc3QoZSkpe2NvbnN0IHM9by5leGVjKGUpLGE9TnVtYmVyKHNbaS55ZWFyXSk7bGV0IHI9bnVsbDtpLm1vbnRoP3I9TnVtYmVyKHNbaS5tb250aF0pLTE6aS5zaG9ydE1vbnRoP3I9dC5zaG9ydE1vbnRocyhuKS5pbmRleE9mKHNbaS5zaG9ydE1vbnRoXSk6aS5sb25nTW9udGgmJihyPXQubG9uZ01vbnRocyhuKS5pbmRleE9mKHNbaS5sb25nTW9udGhdKSk7Y29uc3QgYz1OdW1iZXIoc1tpLmRheV0pfHwxLGw9TnVtYmVyKHNbaS5ob3VyXSk7bGV0IGg9TnVtYmVyLmlzTmFOKGwpPzA6bDtjb25zdCBkPU51bWJlcihzW2kubWludXRlXSkscD1OdW1iZXIuaXNOYU4oZCk/MDpkLHU9TnVtYmVyKHNbaS5zZWNvbmRdKSxnPU51bWJlci5pc05hTih1KT8wOnUsbT1zW2kuYW1wbV07cmV0dXJuIG0mJlwiUE1cIj09PW0mJihoKz0xMiwyND09PWgmJihoPTApKSxuZXcgRGF0ZShhLHIsYyxoLHAsZywwKX19fXJldHVybiBuZXcgRGF0ZSgobmV3IERhdGUpLnNldEhvdXJzKDAsMCwwLDApKX1zdGF0aWMgcmVnZXg9LyhcXFxcKT8oWXsyLDR9fE17MSw0fXxEezEsMn18SHsxLDJ9fGh7MSwyfXxtezEsMn18c3sxLDJ9fEF8YSkvZztzdGF0aWMgTU9OVEhfSlM9WzAsMSwyLDMsNCw1LDYsNyw4LDksMTAsMTFdO3N0YXRpYyBzaG9ydE1vbnRocyhlKXtyZXR1cm4gdC5NT05USF9KUy5tYXAoKHQ9Pm5ldyBEYXRlKDIwMTksdCkudG9Mb2NhbGVTdHJpbmcoZSx7bW9udGg6XCJzaG9ydFwifSkpKX1zdGF0aWMgbG9uZ01vbnRocyhlKXtyZXR1cm4gdC5NT05USF9KUy5tYXAoKHQ9Pm5ldyBEYXRlKDIwMTksdCkudG9Mb2NhbGVTdHJpbmcoZSx7bW9udGg6XCJsb25nXCJ9KSkpfXN0YXRpYyBmb3JtYXRQYXR0ZXJucyhlLGkpe3N3aXRjaChlKXtjYXNlXCJZWVwiOmNhc2VcIllZWVlcIjpyZXR1cm57Z3JvdXA6XCJ5ZWFyXCIscGF0dGVybjpgKFxcXFxkeyR7ZS5sZW5ndGh9fSlgfTtjYXNlXCJNXCI6cmV0dXJue2dyb3VwOlwibW9udGhcIixwYXR0ZXJuOlwiKFxcXFxkezEsMn0pXCJ9O2Nhc2VcIk1NXCI6cmV0dXJue2dyb3VwOlwibW9udGhcIixwYXR0ZXJuOlwiKFxcXFxkezJ9KVwifTtjYXNlXCJNTU1cIjpyZXR1cm57Z3JvdXA6XCJzaG9ydE1vbnRoXCIscGF0dGVybjpgKCR7dC5zaG9ydE1vbnRocyhpKS5qb2luKFwifFwiKX0pYH07Y2FzZVwiTU1NTVwiOnJldHVybntncm91cDpcImxvbmdNb250aFwiLHBhdHRlcm46YCgke3QubG9uZ01vbnRocyhpKS5qb2luKFwifFwiKX0pYH07Y2FzZVwiRFwiOnJldHVybntncm91cDpcImRheVwiLHBhdHRlcm46XCIoXFxcXGR7MSwyfSlcIn07Y2FzZVwiRERcIjpyZXR1cm57Z3JvdXA6XCJkYXlcIixwYXR0ZXJuOlwiKFxcXFxkezJ9KVwifTtjYXNlXCJoXCI6Y2FzZVwiSFwiOnJldHVybntncm91cDpcImhvdXJcIixwYXR0ZXJuOlwiKFxcXFxkezEsMn0pXCJ9O2Nhc2VcImhoXCI6Y2FzZVwiSEhcIjpyZXR1cm57Z3JvdXA6XCJob3VyXCIscGF0dGVybjpcIihcXFxcZHsyfSlcIn07Y2FzZVwibVwiOnJldHVybntncm91cDpcIm1pbnV0ZVwiLHBhdHRlcm46XCIoXFxcXGR7MSwyfSlcIn07Y2FzZVwibW1cIjpyZXR1cm57Z3JvdXA6XCJtaW51dGVcIixwYXR0ZXJuOlwiKFxcXFxkezJ9KVwifTtjYXNlXCJzXCI6cmV0dXJue2dyb3VwOlwic2Vjb25kXCIscGF0dGVybjpcIihcXFxcZHsxLDJ9KVwifTtjYXNlXCJzc1wiOnJldHVybntncm91cDpcInNlY29uZFwiLHBhdHRlcm46XCIoXFxcXGR7Mn0pXCJ9O2Nhc2VcImFcIjpjYXNlXCJBXCI6cmV0dXJue2dyb3VwOlwiYW1wbVwiLHBhdHRlcm46XCIoQU18UE18YW18cG0pXCJ9fX1sYW5nO2NvbnN0cnVjdG9yKGU9bnVsbCxpPVwiWVlZWS1NTS1ERFwiLG49XCJlbi1VU1wiKXtzdXBlcih0LnBhcnNlRGF0ZVRpbWUoZSxpLG4pKSx0aGlzLmxhbmc9bn1nZXRXZWVrKHQpe2NvbnN0IGU9bmV3IERhdGUodGhpcy5taWRuaWdodF90cyh0aGlzKSksaT0odGhpcy5nZXREYXkoKSsoNy10KSklNztlLnNldERhdGUoZS5nZXREYXRlKCktaSk7Y29uc3Qgbj1lLmdldFRpbWUoKTtyZXR1cm4gZS5zZXRNb250aCgwLDEpLGUuZ2V0RGF5KCkhPT10JiZlLnNldE1vbnRoKDAsMSsoNC1lLmdldERheSgpKzcpJTcpLDErTWF0aC5jZWlsKChuLWUuZ2V0VGltZSgpKS82MDQ4ZTUpfWNsb25lKCl7cmV0dXJuIG5ldyB0KHRoaXMpfXRvSlNEYXRlKCl7cmV0dXJuIG5ldyBEYXRlKHRoaXMpfWluQXJyYXkodCxlPVwiW11cIil7cmV0dXJuIHQuc29tZSgodD0+dCBpbnN0YW5jZW9mIEFycmF5P3RoaXMuaXNCZXR3ZWVuKHRbMF0sdFsxXSxlKTp0aGlzLmlzU2FtZSh0LFwiZGF5XCIpKSl9aXNCZXR3ZWVuKHQsZSxpPVwiKClcIil7c3dpdGNoKGkpe2RlZmF1bHQ6Y2FzZVwiKClcIjpyZXR1cm4gdGhpcy5taWRuaWdodF90cyh0aGlzKT50aGlzLm1pZG5pZ2h0X3RzKHQpJiZ0aGlzLm1pZG5pZ2h0X3RzKHRoaXMpPHRoaXMubWlkbmlnaHRfdHMoZSk7Y2FzZVwiWylcIjpyZXR1cm4gdGhpcy5taWRuaWdodF90cyh0aGlzKT49dGhpcy5taWRuaWdodF90cyh0KSYmdGhpcy5taWRuaWdodF90cyh0aGlzKTx0aGlzLm1pZG5pZ2h0X3RzKGUpO2Nhc2VcIihdXCI6cmV0dXJuIHRoaXMubWlkbmlnaHRfdHModGhpcyk+dGhpcy5taWRuaWdodF90cyh0KSYmdGhpcy5taWRuaWdodF90cyh0aGlzKTw9dGhpcy5taWRuaWdodF90cyhlKTtjYXNlXCJbXVwiOnJldHVybiB0aGlzLm1pZG5pZ2h0X3RzKCk+PXRoaXMubWlkbmlnaHRfdHModCkmJnRoaXMubWlkbmlnaHRfdHMoKTw9dGhpcy5taWRuaWdodF90cyhlKX19aXNCZWZvcmUodCxlPVwiZGF5c1wiKXtzd2l0Y2goZSl7Y2FzZVwiZGF5XCI6Y2FzZVwiZGF5c1wiOnJldHVybiBuZXcgRGF0ZSh0LmdldEZ1bGxZZWFyKCksdC5nZXRNb250aCgpLHQuZ2V0RGF0ZSgpKS5nZXRUaW1lKCk+bmV3IERhdGUodGhpcy5nZXRGdWxsWWVhcigpLHRoaXMuZ2V0TW9udGgoKSx0aGlzLmdldERhdGUoKSkuZ2V0VGltZSgpO2Nhc2VcIm1vbnRoXCI6Y2FzZVwibW9udGhzXCI6cmV0dXJuIG5ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKSx0LmdldE1vbnRoKCksMSkuZ2V0VGltZSgpPm5ldyBEYXRlKHRoaXMuZ2V0RnVsbFllYXIoKSx0aGlzLmdldE1vbnRoKCksMSkuZ2V0VGltZSgpO2Nhc2VcInllYXJcIjpjYXNlXCJ5ZWFyc1wiOnJldHVybiB0LmdldEZ1bGxZZWFyKCk+dGhpcy5nZXRGdWxsWWVhcigpfXRocm93IG5ldyBFcnJvcihcImlzQmVmb3JlOiBJbnZhbGlkIHVuaXQhXCIpfWlzU2FtZU9yQmVmb3JlKHQsZT1cImRheXNcIil7c3dpdGNoKGUpe2Nhc2VcImRheVwiOmNhc2VcImRheXNcIjpyZXR1cm4gbmV3IERhdGUodC5nZXRGdWxsWWVhcigpLHQuZ2V0TW9udGgoKSx0LmdldERhdGUoKSkuZ2V0VGltZSgpPj1uZXcgRGF0ZSh0aGlzLmdldEZ1bGxZZWFyKCksdGhpcy5nZXRNb250aCgpLHRoaXMuZ2V0RGF0ZSgpKS5nZXRUaW1lKCk7Y2FzZVwibW9udGhcIjpjYXNlXCJtb250aHNcIjpyZXR1cm4gbmV3IERhdGUodC5nZXRGdWxsWWVhcigpLHQuZ2V0TW9udGgoKSwxKS5nZXRUaW1lKCk+PW5ldyBEYXRlKHRoaXMuZ2V0RnVsbFllYXIoKSx0aGlzLmdldE1vbnRoKCksMSkuZ2V0VGltZSgpfXRocm93IG5ldyBFcnJvcihcImlzU2FtZU9yQmVmb3JlOiBJbnZhbGlkIHVuaXQhXCIpfWlzQWZ0ZXIodCxlPVwiZGF5c1wiKXtzd2l0Y2goZSl7Y2FzZVwiZGF5XCI6Y2FzZVwiZGF5c1wiOnJldHVybiBuZXcgRGF0ZSh0aGlzLmdldEZ1bGxZZWFyKCksdGhpcy5nZXRNb250aCgpLHRoaXMuZ2V0RGF0ZSgpKS5nZXRUaW1lKCk+bmV3IERhdGUodC5nZXRGdWxsWWVhcigpLHQuZ2V0TW9udGgoKSx0LmdldERhdGUoKSkuZ2V0VGltZSgpO2Nhc2VcIm1vbnRoXCI6Y2FzZVwibW9udGhzXCI6cmV0dXJuIG5ldyBEYXRlKHRoaXMuZ2V0RnVsbFllYXIoKSx0aGlzLmdldE1vbnRoKCksMSkuZ2V0VGltZSgpPm5ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKSx0LmdldE1vbnRoKCksMSkuZ2V0VGltZSgpO2Nhc2VcInllYXJcIjpjYXNlXCJ5ZWFyc1wiOnJldHVybiB0aGlzLmdldEZ1bGxZZWFyKCk+dC5nZXRGdWxsWWVhcigpfXRocm93IG5ldyBFcnJvcihcImlzQWZ0ZXI6IEludmFsaWQgdW5pdCFcIil9aXNTYW1lT3JBZnRlcih0LGU9XCJkYXlzXCIpe3N3aXRjaChlKXtjYXNlXCJkYXlcIjpjYXNlXCJkYXlzXCI6cmV0dXJuIG5ldyBEYXRlKHRoaXMuZ2V0RnVsbFllYXIoKSx0aGlzLmdldE1vbnRoKCksdGhpcy5nZXREYXRlKCkpLmdldFRpbWUoKT49bmV3IERhdGUodC5nZXRGdWxsWWVhcigpLHQuZ2V0TW9udGgoKSx0LmdldERhdGUoKSkuZ2V0VGltZSgpO2Nhc2VcIm1vbnRoXCI6Y2FzZVwibW9udGhzXCI6cmV0dXJuIG5ldyBEYXRlKHRoaXMuZ2V0RnVsbFllYXIoKSx0aGlzLmdldE1vbnRoKCksMSkuZ2V0VGltZSgpPj1uZXcgRGF0ZSh0LmdldEZ1bGxZZWFyKCksdC5nZXRNb250aCgpLDEpLmdldFRpbWUoKX10aHJvdyBuZXcgRXJyb3IoXCJpc1NhbWVPckFmdGVyOiBJbnZhbGlkIHVuaXQhXCIpfWlzU2FtZSh0LGU9XCJkYXlzXCIpe3N3aXRjaChlKXtjYXNlXCJkYXlcIjpjYXNlXCJkYXlzXCI6cmV0dXJuIG5ldyBEYXRlKHRoaXMuZ2V0RnVsbFllYXIoKSx0aGlzLmdldE1vbnRoKCksdGhpcy5nZXREYXRlKCkpLmdldFRpbWUoKT09PW5ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKSx0LmdldE1vbnRoKCksdC5nZXREYXRlKCkpLmdldFRpbWUoKTtjYXNlXCJtb250aFwiOmNhc2VcIm1vbnRoc1wiOnJldHVybiBuZXcgRGF0ZSh0aGlzLmdldEZ1bGxZZWFyKCksdGhpcy5nZXRNb250aCgpLDEpLmdldFRpbWUoKT09PW5ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKSx0LmdldE1vbnRoKCksMSkuZ2V0VGltZSgpfXRocm93IG5ldyBFcnJvcihcImlzU2FtZTogSW52YWxpZCB1bml0IVwiKX1hZGQodCxlPVwiZGF5c1wiKXtzd2l0Y2goZSl7Y2FzZVwiZGF5XCI6Y2FzZVwiZGF5c1wiOnRoaXMuc2V0RGF0ZSh0aGlzLmdldERhdGUoKSt0KTticmVhaztjYXNlXCJtb250aFwiOmNhc2VcIm1vbnRoc1wiOnRoaXMuc2V0TW9udGgodGhpcy5nZXRNb250aCgpK3QpfXJldHVybiB0aGlzfXN1YnRyYWN0KHQsZT1cImRheXNcIil7c3dpdGNoKGUpe2Nhc2VcImRheVwiOmNhc2VcImRheXNcIjp0aGlzLnNldERhdGUodGhpcy5nZXREYXRlKCktdCk7YnJlYWs7Y2FzZVwibW9udGhcIjpjYXNlXCJtb250aHNcIjp0aGlzLnNldE1vbnRoKHRoaXMuZ2V0TW9udGgoKS10KX1yZXR1cm4gdGhpc31kaWZmKHQsZT1cImRheXNcIil7c3dpdGNoKGUpe2RlZmF1bHQ6Y2FzZVwiZGF5XCI6Y2FzZVwiZGF5c1wiOnJldHVybiBNYXRoLnJvdW5kKCh0aGlzLm1pZG5pZ2h0X3RzKCktdGhpcy5taWRuaWdodF90cyh0KSkvODY0ZTUpO2Nhc2VcIm1vbnRoXCI6Y2FzZVwibW9udGhzXCI6bGV0IGU9MTIqKHQuZ2V0RnVsbFllYXIoKS10aGlzLmdldEZ1bGxZZWFyKCkpO3JldHVybiBlLT10LmdldE1vbnRoKCksZSs9dGhpcy5nZXRNb250aCgpLGV9fWZvcm1hdChlLGk9XCJlbi1VU1wiKXtsZXQgbj1cIlwiO2NvbnN0IHM9W107bGV0IG89bnVsbDtmb3IoO251bGwhPShvPXQucmVnZXguZXhlYyhlKSk7KVwiXFxcXFwiIT09b1sxXSYmcy5wdXNoKG8pO2lmKHMubGVuZ3RoKXtzWzBdLmluZGV4PjAmJihuKz1lLnN1YnN0cmluZygwLHNbMF0uaW5kZXgpKTtmb3IoY29uc3RbdCxvXW9mIE9iamVjdC5lbnRyaWVzKHMpKXtjb25zdCBhPU51bWJlcih0KTtuKz10aGlzLmZvcm1hdFRva2VucyhvWzBdLGkpLHNbYSsxXSYmKG4rPWUuc3Vic3RyaW5nKG8uaW5kZXgrb1swXS5sZW5ndGgsc1thKzFdLmluZGV4KSksYT09PXMubGVuZ3RoLTEmJihuKz1lLnN1YnN0cmluZyhvLmluZGV4K29bMF0ubGVuZ3RoKSl9fXJldHVybiBuLnJlcGxhY2UoL1xcXFwvZyxcIlwiKX1taWRuaWdodF90cyh0KXtyZXR1cm4gdD9uZXcgRGF0ZSh0LmdldEZ1bGxZZWFyKCksdC5nZXRNb250aCgpLHQuZ2V0RGF0ZSgpLDAsMCwwLDApLmdldFRpbWUoKTpuZXcgRGF0ZSh0aGlzLmdldEZ1bGxZZWFyKCksdGhpcy5nZXRNb250aCgpLHRoaXMuZ2V0RGF0ZSgpLDAsMCwwLDApLmdldFRpbWUoKX1mb3JtYXRUb2tlbnMoZSxpKXtzd2l0Y2goZSl7Y2FzZVwiWVlcIjpyZXR1cm4gU3RyaW5nKHRoaXMuZ2V0RnVsbFllYXIoKSkuc2xpY2UoLTIpO2Nhc2VcIllZWVlcIjpyZXR1cm4gU3RyaW5nKHRoaXMuZ2V0RnVsbFllYXIoKSk7Y2FzZVwiTVwiOnJldHVybiBTdHJpbmcodGhpcy5nZXRNb250aCgpKzEpO2Nhc2VcIk1NXCI6cmV0dXJuYDAke3RoaXMuZ2V0TW9udGgoKSsxfWAuc2xpY2UoLTIpO2Nhc2VcIk1NTVwiOnJldHVybiB0LnNob3J0TW9udGhzKGkpW3RoaXMuZ2V0TW9udGgoKV07Y2FzZVwiTU1NTVwiOnJldHVybiB0LmxvbmdNb250aHMoaSlbdGhpcy5nZXRNb250aCgpXTtjYXNlXCJEXCI6cmV0dXJuIFN0cmluZyh0aGlzLmdldERhdGUoKSk7Y2FzZVwiRERcIjpyZXR1cm5gMCR7dGhpcy5nZXREYXRlKCl9YC5zbGljZSgtMik7Y2FzZVwiSFwiOnJldHVybiBTdHJpbmcodGhpcy5nZXRIb3VycygpKTtjYXNlXCJISFwiOnJldHVybmAwJHt0aGlzLmdldEhvdXJzKCl9YC5zbGljZSgtMik7Y2FzZVwiaFwiOnJldHVybiBTdHJpbmcodGhpcy5nZXRIb3VycygpJTEyfHwxMik7Y2FzZVwiaGhcIjpyZXR1cm5gMCR7dGhpcy5nZXRIb3VycygpJTEyfHwxMn1gLnNsaWNlKC0yKTtjYXNlXCJtXCI6cmV0dXJuIFN0cmluZyh0aGlzLmdldE1pbnV0ZXMoKSk7Y2FzZVwibW1cIjpyZXR1cm5gMCR7dGhpcy5nZXRNaW51dGVzKCl9YC5zbGljZSgtMik7Y2FzZVwic1wiOnJldHVybiBTdHJpbmcodGhpcy5nZXRTZWNvbmRzKCkpO2Nhc2VcInNzXCI6cmV0dXJuYDAke3RoaXMuZ2V0U2Vjb25kcygpfWAuc2xpY2UoLTIpO2Nhc2VcImFcIjpyZXR1cm4gdGhpcy5nZXRIb3VycygpPDEyfHwyND09PXRoaXMuZ2V0SG91cnMoKT9cImFtXCI6XCJwbVwiO2Nhc2VcIkFcIjpyZXR1cm4gdGhpcy5nZXRIb3VycygpPDEyfHwyND09PXRoaXMuZ2V0SG91cnMoKT9cIkFNXCI6XCJQTVwiO2RlZmF1bHQ6cmV0dXJuXCJcIn19fWNsYXNzIGV7cGlja2VyO2NvbnN0cnVjdG9yKHQpe3RoaXMucGlja2VyPXR9cmVuZGVyKGUsaSl7ZXx8KGU9bmV3IHQpLGUuc2V0RGF0ZSgxKSxlLnNldEhvdXJzKDAsMCwwLDApLFwiZnVuY3Rpb25cIj09dHlwZW9mIHRoaXNbYGdldCR7aX1WaWV3YF0mJnRoaXNbYGdldCR7aX1WaWV3YF0oZSl9Z2V0Q29udGFpbmVyVmlldyh0KXt0aGlzLnBpY2tlci51aS5jb250YWluZXIuaW5uZXJIVE1MPVwiXCIsdGhpcy5waWNrZXIub3B0aW9ucy5oZWFkZXImJnRoaXMucGlja2VyLnRyaWdnZXIoXCJyZW5kZXJcIix7ZGF0ZTp0LmNsb25lKCksdmlldzpcIkhlYWRlclwifSksdGhpcy5waWNrZXIudHJpZ2dlcihcInJlbmRlclwiLHtkYXRlOnQuY2xvbmUoKSx2aWV3OlwiTWFpblwifSksdGhpcy5waWNrZXIub3B0aW9ucy5hdXRvQXBwbHl8fHRoaXMucGlja2VyLnRyaWdnZXIoXCJyZW5kZXJcIix7ZGF0ZTp0LmNsb25lKCksdmlldzpcIkZvb3RlclwifSl9Z2V0SGVhZGVyVmlldyh0KXtjb25zdCBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIik7dGhpcy5waWNrZXIub3B0aW9ucy5oZWFkZXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCYmZS5hcHBlbmRDaGlsZCh0aGlzLnBpY2tlci5vcHRpb25zLmhlYWRlciksXCJzdHJpbmdcIj09dHlwZW9mIHRoaXMucGlja2VyLm9wdGlvbnMuaGVhZGVyJiYoZS5pbm5lckhUTUw9dGhpcy5waWNrZXIub3B0aW9ucy5oZWFkZXIpLHRoaXMucGlja2VyLnVpLmNvbnRhaW5lci5hcHBlbmRDaGlsZChlKSx0aGlzLnBpY2tlci50cmlnZ2VyKFwidmlld1wiLHt0YXJnZXQ6ZSxkYXRlOnQuY2xvbmUoKSx2aWV3OlwiSGVhZGVyXCJ9KX1nZXRNYWluVmlldyh0KXtjb25zdCBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJtYWluXCIpO3RoaXMucGlja2VyLnVpLmNvbnRhaW5lci5hcHBlbmRDaGlsZChlKTtjb25zdCBpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7aS5jbGFzc05hbWU9YGNhbGVuZGFycyBncmlkLSR7dGhpcy5waWNrZXIub3B0aW9ucy5ncmlkfWA7Zm9yKGxldCBlPTA7ZTx0aGlzLnBpY2tlci5vcHRpb25zLmNhbGVuZGFycztlKyspe2NvbnN0IG49ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtuLmNsYXNzTmFtZT1cImNhbGVuZGFyXCIsaS5hcHBlbmRDaGlsZChuKTtjb25zdCBzPXRoaXMuZ2V0Q2FsZW5kYXJIZWFkZXJWaWV3KHQuY2xvbmUoKSk7bi5hcHBlbmRDaGlsZChzKSx0aGlzLnBpY2tlci50cmlnZ2VyKFwidmlld1wiLHtkYXRlOnQuY2xvbmUoKSx2aWV3OlwiQ2FsZW5kYXJIZWFkZXJcIixpbmRleDplLHRhcmdldDpzfSk7Y29uc3Qgbz10aGlzLmdldENhbGVuZGFyRGF5TmFtZXNWaWV3KCk7bi5hcHBlbmRDaGlsZChvKSx0aGlzLnBpY2tlci50cmlnZ2VyKFwidmlld1wiLHtkYXRlOnQuY2xvbmUoKSx2aWV3OlwiQ2FsZW5kYXJEYXlOYW1lc1wiLGluZGV4OmUsdGFyZ2V0Om99KTtjb25zdCBhPXRoaXMuZ2V0Q2FsZW5kYXJEYXlzVmlldyh0LmNsb25lKCkpO24uYXBwZW5kQ2hpbGQoYSksdGhpcy5waWNrZXIudHJpZ2dlcihcInZpZXdcIix7ZGF0ZTp0LmNsb25lKCksdmlldzpcIkNhbGVuZGFyRGF5c1wiLGluZGV4OmUsdGFyZ2V0OmF9KTtjb25zdCByPXRoaXMuZ2V0Q2FsZW5kYXJGb290ZXJWaWV3KHRoaXMucGlja2VyLm9wdGlvbnMubGFuZyx0LmNsb25lKCkpO24uYXBwZW5kQ2hpbGQociksdGhpcy5waWNrZXIudHJpZ2dlcihcInZpZXdcIix7ZGF0ZTp0LmNsb25lKCksdmlldzpcIkNhbGVuZGFyRm9vdGVyXCIsaW5kZXg6ZSx0YXJnZXQ6cn0pLHRoaXMucGlja2VyLnRyaWdnZXIoXCJ2aWV3XCIse2RhdGU6dC5jbG9uZSgpLHZpZXc6XCJDYWxlbmRhckl0ZW1cIixpbmRleDplLHRhcmdldDpufSksdC5hZGQoMSxcIm1vbnRoXCIpfWUuYXBwZW5kQ2hpbGQoaSksdGhpcy5waWNrZXIudHJpZ2dlcihcInZpZXdcIix7ZGF0ZTp0LmNsb25lKCksdmlldzpcIkNhbGVuZGFyc1wiLHRhcmdldDppfSksdGhpcy5waWNrZXIudHJpZ2dlcihcInZpZXdcIix7ZGF0ZTp0LmNsb25lKCksdmlldzpcIk1haW5cIix0YXJnZXQ6ZX0pfWdldEZvb3RlclZpZXcodCl7Y29uc3QgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9vdGVyXCIpLGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtpLmNsYXNzTmFtZT1cImZvb3Rlci1idXR0b25zXCI7Y29uc3Qgbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO24uY2xhc3NOYW1lPVwiY2FuY2VsLWJ1dHRvbiB1bml0XCIsbi5pbm5lckhUTUw9dGhpcy5waWNrZXIub3B0aW9ucy5sb2NhbGUuY2FuY2VsLGkuYXBwZW5kQ2hpbGQobik7Y29uc3Qgcz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO3MuY2xhc3NOYW1lPVwiYXBwbHktYnV0dG9uIHVuaXRcIixzLmlubmVySFRNTD10aGlzLnBpY2tlci5vcHRpb25zLmxvY2FsZS5hcHBseSxzLmRpc2FibGVkPSEwLGkuYXBwZW5kQ2hpbGQocyksZS5hcHBlbmRDaGlsZChpKSx0aGlzLnBpY2tlci51aS5jb250YWluZXIuYXBwZW5kQ2hpbGQoZSksdGhpcy5waWNrZXIudHJpZ2dlcihcInZpZXdcIix7ZGF0ZTp0LHRhcmdldDplLHZpZXc6XCJGb290ZXJcIn0pfWdldENhbGVuZGFySGVhZGVyVmlldyh0KXtjb25zdCBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7ZS5jbGFzc05hbWU9XCJoZWFkZXJcIjtjb25zdCBpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7aS5jbGFzc05hbWU9XCJtb250aC1uYW1lXCIsaS5pbm5lckhUTUw9YDxzcGFuPiR7dC50b0xvY2FsZVN0cmluZyh0aGlzLnBpY2tlci5vcHRpb25zLmxhbmcse21vbnRoOlwibG9uZ1wifSl9PC9zcGFuPiAke3QuZm9ybWF0KFwiWVlZWVwiKX1gLGUuYXBwZW5kQ2hpbGQoaSk7Y29uc3Qgbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO24uY2xhc3NOYW1lPVwicHJldmlvdXMtYnV0dG9uIHVuaXRcIixuLmlubmVySFRNTD10aGlzLnBpY2tlci5vcHRpb25zLmxvY2FsZS5wcmV2aW91c01vbnRoLGUuYXBwZW5kQ2hpbGQobik7Y29uc3Qgcz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO3JldHVybiBzLmNsYXNzTmFtZT1cIm5leHQtYnV0dG9uIHVuaXRcIixzLmlubmVySFRNTD10aGlzLnBpY2tlci5vcHRpb25zLmxvY2FsZS5uZXh0TW9udGgsZS5hcHBlbmRDaGlsZChzKSxlfWdldENhbGVuZGFyRGF5TmFtZXNWaWV3KCl7Y29uc3QgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3QuY2xhc3NOYW1lPVwiZGF5bmFtZXMtcm93XCI7Zm9yKGxldCBlPTE7ZTw9NztlKyspe2NvbnN0IGk9Myt0aGlzLnBpY2tlci5vcHRpb25zLmZpcnN0RGF5K2Usbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO24uY2xhc3NOYW1lPVwiZGF5bmFtZVwiLG4uaW5uZXJIVE1MPW5ldyBEYXRlKDE5NzAsMCxpLDEyLDAsMCwwKS50b0xvY2FsZVN0cmluZyh0aGlzLnBpY2tlci5vcHRpb25zLmxhbmcse3dlZWtkYXk6XCJzaG9ydFwifSksbi50aXRsZT1uZXcgRGF0ZSgxOTcwLDAsaSwxMiwwLDAsMCkudG9Mb2NhbGVTdHJpbmcodGhpcy5waWNrZXIub3B0aW9ucy5sYW5nLHt3ZWVrZGF5OlwibG9uZ1wifSksdC5hcHBlbmRDaGlsZChuKSx0aGlzLnBpY2tlci50cmlnZ2VyKFwidmlld1wiLHtkYXlJZHg6aSx2aWV3OlwiQ2FsZW5kYXJEYXlOYW1lXCIsdGFyZ2V0Om59KX1yZXR1cm4gdH1nZXRDYWxlbmRhckRheXNWaWV3KHQpe2NvbnN0IGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtlLmNsYXNzTmFtZT1cImRheXMtZ3JpZFwiO2NvbnN0IGk9dGhpcy5jYWxjT2Zmc2V0RGF5cyh0LHRoaXMucGlja2VyLm9wdGlvbnMuZmlyc3REYXkpLG49MzItbmV3IERhdGUodC5nZXRGdWxsWWVhcigpLHQuZ2V0TW9udGgoKSwzMikuZ2V0RGF0ZSgpO2ZvcihsZXQgdD0wO3Q8aTt0Kyspe2NvbnN0IHQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTt0LmNsYXNzTmFtZT1cIm9mZnNldFwiLGUuYXBwZW5kQ2hpbGQodCl9Zm9yKGxldCBpPTE7aTw9bjtpKyspe3Quc2V0RGF0ZShpKTtjb25zdCBuPXRoaXMuZ2V0Q2FsZW5kYXJEYXlWaWV3KHQpO2UuYXBwZW5kQ2hpbGQobiksdGhpcy5waWNrZXIudHJpZ2dlcihcInZpZXdcIix7ZGF0ZTp0LHZpZXc6XCJDYWxlbmRhckRheVwiLHRhcmdldDpufSl9cmV0dXJuIGV9Z2V0Q2FsZW5kYXJEYXlWaWV3KGUpe2NvbnN0IGk9dGhpcy5waWNrZXIub3B0aW9ucy5kYXRlP25ldyB0KHRoaXMucGlja2VyLm9wdGlvbnMuZGF0ZSk6bnVsbCxuPW5ldyB0LHM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtyZXR1cm4gcy5jbGFzc05hbWU9XCJkYXkgdW5pdFwiLHMuaW5uZXJIVE1MPWUuZm9ybWF0KFwiRFwiKSxzLmRhdGFzZXQudGltZT1TdHJpbmcoZS5nZXRUaW1lKCkpLGUuaXNTYW1lKG4sXCJkYXlcIikmJnMuY2xhc3NMaXN0LmFkZChcInRvZGF5XCIpLFswLDZdLmluY2x1ZGVzKGUuZ2V0RGF5KCkpJiZzLmNsYXNzTGlzdC5hZGQoXCJ3ZWVrZW5kXCIpLHRoaXMucGlja2VyLmRhdGVQaWNrZWQubGVuZ3RoP3RoaXMucGlja2VyLmRhdGVQaWNrZWRbMF0uaXNTYW1lKGUsXCJkYXlcIikmJnMuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpOmkmJmUuaXNTYW1lKGksXCJkYXlcIikmJnMuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpLHRoaXMucGlja2VyLnRyaWdnZXIoXCJ2aWV3XCIse2RhdGU6ZSx2aWV3OlwiQ2FsZW5kYXJEYXlcIix0YXJnZXQ6c30pLHN9Z2V0Q2FsZW5kYXJGb290ZXJWaWV3KHQsZSl7Y29uc3QgaT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3JldHVybiBpLmNsYXNzTmFtZT1cImZvb3RlclwiLGl9Y2FsY09mZnNldERheXModCxlKXtsZXQgaT10LmdldERheSgpLWU7cmV0dXJuIGk8MCYmKGkrPTcpLGl9fWNsYXNzIGl7cGlja2VyO2luc3RhbmNlcz17fTtjb25zdHJ1Y3Rvcih0KXt0aGlzLnBpY2tlcj10fWluaXRpYWxpemUoKXtjb25zdCB0PVtdO3RoaXMucGlja2VyLm9wdGlvbnMucGx1Z2lucy5mb3JFYWNoKChlPT57XCJmdW5jdGlvblwiPT10eXBlb2YgZT90LnB1c2gobmV3IGUpOlwic3RyaW5nXCI9PXR5cGVvZiBlJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgZWFzZXBpY2smJk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlYXNlcGljayxlKT90LnB1c2gobmV3IGVhc2VwaWNrW2VdKTpjb25zb2xlLndhcm4oYGVhc2VwaWNrOiAke2V9IG5vdCBmb3VuZC5gKX0pKSx0LnNvcnQoKCh0LGUpPT50LnByaW9yaXR5PmUucHJpb3JpdHk/LTE6dC5wcmlvcml0eTxlLnByaW9yaXR5fHx0LmRlcGVuZGVuY2llcy5sZW5ndGg+ZS5kZXBlbmRlbmNpZXMubGVuZ3RoPzE6dC5kZXBlbmRlbmNpZXMubGVuZ3RoPGUuZGVwZW5kZW5jaWVzLmxlbmd0aD8tMTowKSksdC5mb3JFYWNoKCh0PT57dC5hdHRhY2godGhpcy5waWNrZXIpLHRoaXMuaW5zdGFuY2VzW3QuZ2V0TmFtZSgpXT10fSkpfWdldEluc3RhbmNlKHQpe3JldHVybiB0aGlzLmluc3RhbmNlc1t0XX1hZGRJbnN0YW5jZSh0KXtpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5pbnN0YW5jZXMsdCkpY29uc29sZS53YXJuKGBlYXNlcGljazogJHt0fSBhbHJlYWR5IGFkZGVkLmApO2Vsc2V7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGVhc2VwaWNrJiZPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZWFzZXBpY2ssdCkpe2NvbnN0IGU9bmV3IGVhc2VwaWNrW3RdO3JldHVybiBlLmF0dGFjaCh0aGlzLnBpY2tlciksdGhpcy5pbnN0YW5jZXNbZS5nZXROYW1lKCldPWUsZX1pZihcInVuZGVmaW5lZFwiIT09dGhpcy5nZXRQbHVnaW5Gbih0KSl7Y29uc3QgZT1uZXcodGhpcy5nZXRQbHVnaW5Gbih0KSk7cmV0dXJuIGUuYXR0YWNoKHRoaXMucGlja2VyKSx0aGlzLmluc3RhbmNlc1tlLmdldE5hbWUoKV09ZSxlfWNvbnNvbGUud2FybihgZWFzZXBpY2s6ICR7dH0gbm90IGZvdW5kLmApfXJldHVybiBudWxsfXJlbW92ZUluc3RhbmNlKHQpe3JldHVybiB0IGluIHRoaXMuaW5zdGFuY2VzJiZ0aGlzLmluc3RhbmNlc1t0XS5kZXRhY2goKSxkZWxldGUgdGhpcy5pbnN0YW5jZXNbdF19cmVsb2FkSW5zdGFuY2UodCl7cmV0dXJuIHRoaXMucmVtb3ZlSW5zdGFuY2UodCksdGhpcy5hZGRJbnN0YW5jZSh0KX1nZXRQbHVnaW5Gbih0KXtyZXR1cm5bLi4udGhpcy5waWNrZXIub3B0aW9ucy5wbHVnaW5zXS5maWx0ZXIoKGU9PlwiZnVuY3Rpb25cIj09dHlwZW9mIGUmJihuZXcgZSkuZ2V0TmFtZSgpPT09dCkpLnNoaWZ0KCl9fWNsYXNzIG57Q2FsZW5kYXI9bmV3IGUodGhpcyk7UGx1Z2luTWFuYWdlcj1uZXcgaSh0aGlzKTtjYWxlbmRhcnM9W107ZGF0ZVBpY2tlZD1bXTtjc3NMb2FkZWQ9MDtiaW5kcz17aGlkZVBpY2tlcjp0aGlzLmhpZGVQaWNrZXIuYmluZCh0aGlzKSxzaG93OnRoaXMuc2hvdy5iaW5kKHRoaXMpfTtvcHRpb25zPXtkb2M6ZG9jdW1lbnQsY3NzOltdLGVsZW1lbnQ6bnVsbCxmaXJzdERheToxLGdyaWQ6MSxjYWxlbmRhcnM6MSxsYW5nOlwiZW4tVVNcIixkYXRlOm51bGwsZm9ybWF0OlwiWVlZWS1NTS1ERFwiLHJlYWRvbmx5OiEwLGF1dG9BcHBseTohMCxoZWFkZXI6ITEsaW5saW5lOiExLHNjcm9sbFRvRGF0ZTohMCxsb2NhbGU6e25leHRNb250aDonPHN2ZyB3aWR0aD1cIjExXCIgaGVpZ2h0PVwiMTZcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZD1cIk0yLjc0OCAxNkwwIDEzLjMzMyA1LjMzMyA4IDAgMi42NjcgMi43NDggMGw3LjkxOSA4elwiIGZpbGwtcnVsZT1cIm5vbnplcm9cIi8+PC9zdmc+JyxwcmV2aW91c01vbnRoOic8c3ZnIHdpZHRoPVwiMTFcIiBoZWlnaHQ9XCIxNlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTTcuOTE5IDBsMi43NDggMi42NjdMNS4zMzMgOGw1LjMzNCA1LjMzM0w3LjkxOSAxNiAwIDh6XCIgZmlsbC1ydWxlPVwibm9uemVyb1wiLz48L3N2Zz4nLGNhbmNlbDpcIkNhbmNlbFwiLGFwcGx5OlwiQXBwbHlcIn0sZG9jdW1lbnRDbGljazp0aGlzLmJpbmRzLmhpZGVQaWNrZXIscGx1Z2luczpbXX07dWk9e2NvbnRhaW5lcjpudWxsLHNoYWRvd1Jvb3Q6bnVsbCx3cmFwcGVyOm51bGx9O3ZlcnNpb249XCIxLjIuMVwiO2NvbnN0cnVjdG9yKHQpe2NvbnN0IGU9ey4uLnRoaXMub3B0aW9ucy5sb2NhbGUsLi4udC5sb2NhbGV9O3RoaXMub3B0aW9ucz17Li4udGhpcy5vcHRpb25zLC4uLnR9LHRoaXMub3B0aW9ucy5sb2NhbGU9ZSx0aGlzLmhhbmRsZU9wdGlvbnMoKSx0aGlzLnVpLndyYXBwZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIiksdGhpcy51aS53cmFwcGVyLnN0eWxlLmRpc3BsYXk9XCJub25lXCIsdGhpcy51aS53cmFwcGVyLnN0eWxlLnBvc2l0aW9uPVwiYWJzb2x1dGVcIix0aGlzLnVpLndyYXBwZXIuc3R5bGUucG9pbnRlckV2ZW50cz1cIm5vbmVcIix0aGlzLnVpLndyYXBwZXIuY2xhc3NOYW1lPVwiZWFzZXBpY2std3JhcHBlclwiLHRoaXMudWkud3JhcHBlci5hdHRhY2hTaGFkb3coe21vZGU6XCJvcGVuXCJ9KSx0aGlzLnVpLnNoYWRvd1Jvb3Q9dGhpcy51aS53cmFwcGVyLnNoYWRvd1Jvb3QsdGhpcy51aS5jb250YWluZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSx0aGlzLnVpLmNvbnRhaW5lci5jbGFzc05hbWU9XCJjb250YWluZXJcIix0aGlzLm9wdGlvbnMuekluZGV4JiYodGhpcy51aS5jb250YWluZXIuc3R5bGUuekluZGV4PVN0cmluZyh0aGlzLm9wdGlvbnMuekluZGV4KSksdGhpcy5vcHRpb25zLmlubGluZSYmKHRoaXMudWkud3JhcHBlci5zdHlsZS5wb3NpdGlvbj1cInJlbGF0aXZlXCIsdGhpcy51aS5jb250YWluZXIuY2xhc3NMaXN0LmFkZChcImlubGluZVwiKSksdGhpcy51aS5zaGFkb3dSb290LmFwcGVuZENoaWxkKHRoaXMudWkuY29udGFpbmVyKSx0aGlzLm9wdGlvbnMuZWxlbWVudC5hZnRlcih0aGlzLnVpLndyYXBwZXIpLHRoaXMuaGFuZGxlQ1NTKCksdGhpcy5vcHRpb25zLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsdGhpcy5iaW5kcy5zaG93KSx0aGlzLm9uKFwidmlld1wiLHRoaXMub25WaWV3LmJpbmQodGhpcykpLHRoaXMub24oXCJyZW5kZXJcIix0aGlzLm9uUmVuZGVyLmJpbmQodGhpcykpLHRoaXMuUGx1Z2luTWFuYWdlci5pbml0aWFsaXplKCksdGhpcy5wYXJzZVZhbHVlcygpLFwiZnVuY3Rpb25cIj09dHlwZW9mIHRoaXMub3B0aW9ucy5zZXR1cCYmdGhpcy5vcHRpb25zLnNldHVwKHRoaXMpLHRoaXMub24oXCJjbGlja1wiLHRoaXMub25DbGljay5iaW5kKHRoaXMpKTtjb25zdCBpPXRoaXMub3B0aW9ucy5zY3JvbGxUb0RhdGU/dGhpcy5nZXREYXRlKCk6bnVsbDt0aGlzLnJlbmRlckFsbChpKX1vbih0LGUsaT17fSl7dGhpcy51aS5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcih0LGUsaSl9b2ZmKHQsZSxpPXt9KXt0aGlzLnVpLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKHQsZSxpKX10cmlnZ2VyKHQsZT17fSl7cmV0dXJuIHRoaXMudWkuY29udGFpbmVyLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KHQse2RldGFpbDplfSkpfWRlc3Ryb3koKXt0aGlzLm9wdGlvbnMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIix0aGlzLmJpbmRzLnNob3cpLFwiZnVuY3Rpb25cIj09dHlwZW9mIHRoaXMub3B0aW9ucy5kb2N1bWVudENsaWNrJiZkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIix0aGlzLm9wdGlvbnMuZG9jdW1lbnRDbGljaywhMCksT2JqZWN0LmtleXModGhpcy5QbHVnaW5NYW5hZ2VyLmluc3RhbmNlcykuZm9yRWFjaCgodD0+e3RoaXMuUGx1Z2luTWFuYWdlci5yZW1vdmVJbnN0YW5jZSh0KX0pKSx0aGlzLnVpLndyYXBwZXIucmVtb3ZlKCl9b25SZW5kZXIodCl7Y29uc3R7dmlldzplLGRhdGU6aX09dC5kZXRhaWw7dGhpcy5DYWxlbmRhci5yZW5kZXIoaSxlKX1vblZpZXcodCl7Y29uc3R7dmlldzplLHRhcmdldDppfT10LmRldGFpbDtcIkZvb3RlclwiPT09ZSYmdGhpcy5kYXRlUGlja2VkLmxlbmd0aCYmKGkucXVlcnlTZWxlY3RvcihcIi5hcHBseS1idXR0b25cIikuZGlzYWJsZWQ9ITEpfW9uQ2xpY2tIZWFkZXJCdXR0b24odCl7dGhpcy5pc0NhbGVuZGFySGVhZGVyQnV0dG9uKHQpJiYodC5jbGFzc0xpc3QuY29udGFpbnMoXCJuZXh0LWJ1dHRvblwiKT90aGlzLmNhbGVuZGFyc1swXS5hZGQoMSxcIm1vbnRoXCIpOnRoaXMuY2FsZW5kYXJzWzBdLnN1YnRyYWN0KDEsXCJtb250aFwiKSx0aGlzLnJlbmRlckFsbCh0aGlzLmNhbGVuZGFyc1swXSkpfW9uQ2xpY2tDYWxlbmRhckRheShlKXtpZih0aGlzLmlzQ2FsZW5kYXJEYXkoZSkpe2NvbnN0IGk9bmV3IHQoZS5kYXRhc2V0LnRpbWUpO3RoaXMub3B0aW9ucy5hdXRvQXBwbHk/KHRoaXMuc2V0RGF0ZShpKSx0aGlzLnRyaWdnZXIoXCJzZWxlY3RcIix7ZGF0ZTp0aGlzLmdldERhdGUoKX0pLHRoaXMuaGlkZSgpKToodGhpcy5kYXRlUGlja2VkWzBdPWksdGhpcy50cmlnZ2VyKFwicHJlc2VsZWN0XCIse2RhdGU6dGhpcy5nZXREYXRlKCl9KSx0aGlzLnJlbmRlckFsbCgpKX19b25DbGlja0FwcGx5QnV0dG9uKHQpe2lmKHRoaXMuaXNBcHBseUJ1dHRvbih0KSl7aWYodGhpcy5kYXRlUGlja2VkWzBdaW5zdGFuY2VvZiBEYXRlKXtjb25zdCB0PXRoaXMuZGF0ZVBpY2tlZFswXS5jbG9uZSgpO3RoaXMuc2V0RGF0ZSh0KX10aGlzLmhpZGUoKSx0aGlzLnRyaWdnZXIoXCJzZWxlY3RcIix7ZGF0ZTp0aGlzLmdldERhdGUoKX0pfX1vbkNsaWNrQ2FuY2VsQnV0dG9uKHQpe3RoaXMuaXNDYW5jZWxCdXR0b24odCkmJnRoaXMuaGlkZSgpfW9uQ2xpY2sodCl7Y29uc3QgZT10LnRhcmdldDtpZihlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpe2NvbnN0IHQ9ZS5jbG9zZXN0KFwiLnVuaXRcIik7aWYoISh0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKXJldHVybjt0aGlzLm9uQ2xpY2tIZWFkZXJCdXR0b24odCksdGhpcy5vbkNsaWNrQ2FsZW5kYXJEYXkodCksdGhpcy5vbkNsaWNrQXBwbHlCdXR0b24odCksdGhpcy5vbkNsaWNrQ2FuY2VsQnV0dG9uKHQpfX1pc1Nob3duKCl7cmV0dXJuIHRoaXMudWkuY29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhcImlubGluZVwiKXx8dGhpcy51aS5jb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hvd1wiKX1zaG93KHQpe2lmKHRoaXMuaXNTaG93bigpKXJldHVybjtjb25zdCBlPXQmJlwidGFyZ2V0XCJpbiB0P3QudGFyZ2V0OnRoaXMub3B0aW9ucy5lbGVtZW50LHt0b3A6aSxsZWZ0Om59PXRoaXMuYWRqdXN0UG9zaXRpb24oZSk7dGhpcy51aS5jb250YWluZXIuc3R5bGUudG9wPWAke2l9cHhgLHRoaXMudWkuY29udGFpbmVyLnN0eWxlLmxlZnQ9YCR7bn1weGAsdGhpcy51aS5jb250YWluZXIuY2xhc3NMaXN0LmFkZChcInNob3dcIiksdGhpcy50cmlnZ2VyKFwic2hvd1wiLHt0YXJnZXQ6ZX0pfWhpZGUoKXt0aGlzLnVpLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKSx0aGlzLmRhdGVQaWNrZWQubGVuZ3RoPTAsdGhpcy5yZW5kZXJBbGwoKSx0aGlzLnRyaWdnZXIoXCJoaWRlXCIpfXNldERhdGUoZSl7Y29uc3QgaT1uZXcgdChlLHRoaXMub3B0aW9ucy5mb3JtYXQpO3RoaXMub3B0aW9ucy5kYXRlPWkuY2xvbmUoKSx0aGlzLnVwZGF0ZVZhbHVlcygpLHRoaXMuY2FsZW5kYXJzLmxlbmd0aCYmdGhpcy5yZW5kZXJBbGwoKX1nZXREYXRlKCl7cmV0dXJuIHRoaXMub3B0aW9ucy5kYXRlIGluc3RhbmNlb2YgdD90aGlzLm9wdGlvbnMuZGF0ZS5jbG9uZSgpOm51bGx9cGFyc2VWYWx1ZXMoKXt0aGlzLm9wdGlvbnMuZGF0ZT90aGlzLnNldERhdGUodGhpcy5vcHRpb25zLmRhdGUpOnRoaXMub3B0aW9ucy5lbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCYmdGhpcy5vcHRpb25zLmVsZW1lbnQudmFsdWUubGVuZ3RoJiZ0aGlzLnNldERhdGUodGhpcy5vcHRpb25zLmVsZW1lbnQudmFsdWUpLHRoaXMub3B0aW9ucy5kYXRlIGluc3RhbmNlb2YgRGF0ZXx8KHRoaXMub3B0aW9ucy5kYXRlPW51bGwpfXVwZGF0ZVZhbHVlcygpe2NvbnN0IHQ9dGhpcy5nZXREYXRlKCksZT10IGluc3RhbmNlb2YgRGF0ZT90LmZvcm1hdCh0aGlzLm9wdGlvbnMuZm9ybWF0LHRoaXMub3B0aW9ucy5sYW5nKTpcIlwiLGk9dGhpcy5vcHRpb25zLmVsZW1lbnQ7aSBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQ/aS52YWx1ZT1lOmkgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCYmKGkuaW5uZXJUZXh0PWUpfWhpZGVQaWNrZXIodCl7bGV0IGU9dC50YXJnZXQsaT1udWxsO2Uuc2hhZG93Um9vdCYmKGU9dC5jb21wb3NlZFBhdGgoKVswXSxpPWUuZ2V0Um9vdE5vZGUoKS5ob3N0KSx0aGlzLmlzU2hvd24oKSYmaSE9PXRoaXMudWkud3JhcHBlciYmZSE9PXRoaXMub3B0aW9ucy5lbGVtZW50JiZ0aGlzLmhpZGUoKX1yZW5kZXJBbGwodCl7dGhpcy50cmlnZ2VyKFwicmVuZGVyXCIse3ZpZXc6XCJDb250YWluZXJcIixkYXRlOih0fHx0aGlzLmNhbGVuZGFyc1swXSkuY2xvbmUoKX0pfWlzQ2FsZW5kYXJIZWFkZXJCdXR0b24odCl7cmV0dXJuW1wicHJldmlvdXMtYnV0dG9uXCIsXCJuZXh0LWJ1dHRvblwiXS5zb21lKChlPT50LmNsYXNzTGlzdC5jb250YWlucyhlKSkpfWlzQ2FsZW5kYXJEYXkodCl7cmV0dXJuIHQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGF5XCIpfWlzQXBwbHlCdXR0b24odCl7cmV0dXJuIHQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYXBwbHktYnV0dG9uXCIpfWlzQ2FuY2VsQnV0dG9uKHQpe3JldHVybiB0LmNsYXNzTGlzdC5jb250YWlucyhcImNhbmNlbC1idXR0b25cIil9Z290b0RhdGUoZSl7Y29uc3QgaT1uZXcgdChlLHRoaXMub3B0aW9ucy5mb3JtYXQpO2kuc2V0RGF0ZSgxKSx0aGlzLmNhbGVuZGFyc1swXT1pLmNsb25lKCksdGhpcy5yZW5kZXJBbGwoKX1jbGVhcigpe3RoaXMub3B0aW9ucy5kYXRlPW51bGwsdGhpcy5kYXRlUGlja2VkLmxlbmd0aD0wLHRoaXMudXBkYXRlVmFsdWVzKCksdGhpcy5yZW5kZXJBbGwoKSx0aGlzLnRyaWdnZXIoXCJjbGVhclwiKX1oYW5kbGVPcHRpb25zKCl7dGhpcy5vcHRpb25zLmVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudHx8KHRoaXMub3B0aW9ucy5lbGVtZW50PXRoaXMub3B0aW9ucy5kb2MucXVlcnlTZWxlY3Rvcih0aGlzLm9wdGlvbnMuZWxlbWVudCkpLFwiZnVuY3Rpb25cIj09dHlwZW9mIHRoaXMub3B0aW9ucy5kb2N1bWVudENsaWNrJiZkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIix0aGlzLm9wdGlvbnMuZG9jdW1lbnRDbGljaywhMCksdGhpcy5vcHRpb25zLmVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50JiYodGhpcy5vcHRpb25zLmVsZW1lbnQucmVhZE9ubHk9dGhpcy5vcHRpb25zLnJlYWRvbmx5KSx0aGlzLm9wdGlvbnMuZGF0ZT90aGlzLmNhbGVuZGFyc1swXT1uZXcgdCh0aGlzLm9wdGlvbnMuZGF0ZSx0aGlzLm9wdGlvbnMuZm9ybWF0KTp0aGlzLmNhbGVuZGFyc1swXT1uZXcgdH1oYW5kbGVDU1MoKXtpZihBcnJheS5pc0FycmF5KHRoaXMub3B0aW9ucy5jc3MpKXRoaXMub3B0aW9ucy5jc3MuZm9yRWFjaCgodD0+e2NvbnN0IGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7ZS5ocmVmPXQsZS5yZWw9XCJzdHlsZXNoZWV0XCI7Y29uc3QgaT0oKT0+e3RoaXMuY3NzTG9hZGVkKyssdGhpcy5jc3NMb2FkZWQ9PT10aGlzLm9wdGlvbnMuY3NzLmxlbmd0aCYmKHRoaXMudWkud3JhcHBlci5zdHlsZS5kaXNwbGF5PVwiXCIpfTtlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsaSksZS5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIixpKSx0aGlzLnVpLnNoYWRvd1Jvb3QuYXBwZW5kKGUpfSkpO2Vsc2UgaWYoXCJzdHJpbmdcIj09dHlwZW9mIHRoaXMub3B0aW9ucy5jc3Mpe2NvbnN0IHQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpLGU9ZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5vcHRpb25zLmNzcyk7dC5hcHBlbmRDaGlsZChlKSx0aGlzLnVpLnNoYWRvd1Jvb3QuYXBwZW5kKHQpLHRoaXMudWkud3JhcHBlci5zdHlsZS5kaXNwbGF5PVwiXCJ9ZWxzZVwiZnVuY3Rpb25cIj09dHlwZW9mIHRoaXMub3B0aW9ucy5jc3MmJih0aGlzLm9wdGlvbnMuY3NzLmNhbGwodGhpcyx0aGlzKSx0aGlzLnVpLndyYXBwZXIuc3R5bGUuZGlzcGxheT1cIlwiKX1hZGp1c3RQb3NpdGlvbih0KXtjb25zdCBlPXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksaT10aGlzLnVpLndyYXBwZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7dGhpcy51aS5jb250YWluZXIuY2xhc3NMaXN0LmFkZChcImNhbGNcIik7Y29uc3Qgbj10aGlzLnVpLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTt0aGlzLnVpLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwiY2FsY1wiKTtsZXQgcz1lLmJvdHRvbS1pLmJvdHRvbSxvPWUubGVmdC1pLmxlZnQ7cmV0dXJuXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmKHdpbmRvdy5pbm5lckhlaWdodDxzK24uaGVpZ2h0JiZzLW4uaGVpZ2h0Pj0wJiYocz1lLnRvcC1pLnRvcC1uLmhlaWdodCksd2luZG93LmlubmVyV2lkdGg8bytuLndpZHRoJiZlLnJpZ2h0LW4ud2lkdGg+PTAmJihvPWUucmlnaHQtaS5yaWdodC1uLndpZHRoKSkse2xlZnQ6byx0b3A6c319fXZhciBzPU9iamVjdC5mcmVlemUoe19fcHJvdG9fXzpudWxsLENvcmU6bixjcmVhdGU6bn0pO2NsYXNzIG97cGlja2VyO29wdGlvbnM7cHJpb3JpdHk9MDtkZXBlbmRlbmNpZXM9W107YXR0YWNoKHQpe2NvbnN0IGU9dGhpcy5nZXROYW1lKCksaT17Li4udGhpcy5vcHRpb25zfTt0aGlzLm9wdGlvbnM9ey4uLnRoaXMub3B0aW9ucywuLi50Lm9wdGlvbnNbZV18fHt9fTtmb3IoY29uc3QgbiBvZiBPYmplY3Qua2V5cyhpKSlpZihudWxsIT09aVtuXSYmXCJvYmplY3RcIj09dHlwZW9mIGlbbl0mJk9iamVjdC5rZXlzKGlbbl0pLmxlbmd0aCYmZSBpbiB0Lm9wdGlvbnMmJm4gaW4gdC5vcHRpb25zW2VdKXtjb25zdCBzPXsuLi50Lm9wdGlvbnNbZV1bbl19O251bGwhPT1zJiZcIm9iamVjdFwiPT10eXBlb2YgcyYmT2JqZWN0LmtleXMocykubGVuZ3RoJiZPYmplY3Qua2V5cyhzKS5ldmVyeSgodD0+T2JqZWN0LmtleXMoaVtuXSkuaW5jbHVkZXModCkpKSYmKHRoaXMub3B0aW9uc1tuXT17Li4uaVtuXSwuLi5zfSl9aWYodGhpcy5waWNrZXI9dCx0aGlzLmRlcGVuZGVuY2llc05vdEZvdW5kKCkpe2NvbnN0IHQ9dGhpcy5kZXBlbmRlbmNpZXMuZmlsdGVyKCh0PT4hdGhpcy5wbHVnaW5zQXNTdHJpbmdBcnJheSgpLmluY2x1ZGVzKHQpKSk7cmV0dXJuIHZvaWQgY29uc29sZS53YXJuKGAke3RoaXMuZ2V0TmFtZSgpfTogcmVxdWlyZWQgZGVwZW5kZW5jaWVzICgke3Quam9pbihcIiwgXCIpfSkuYCl9Y29uc3Qgbj10aGlzLmNhbWVsQ2FzZVRvS2ViYWIodGhpcy5nZXROYW1lKCkpO3RoaXMucGlja2VyLnVpLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKG4pLHRoaXMub25BdHRhY2goKX1kZXRhY2goKXtjb25zdCB0PXRoaXMuY2FtZWxDYXNlVG9LZWJhYih0aGlzLmdldE5hbWUoKSk7dGhpcy5waWNrZXIudWkuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUodCksXCJmdW5jdGlvblwiPT10eXBlb2YgdGhpcy5vbkRldGFjaCYmdGhpcy5vbkRldGFjaCgpfWRlcGVuZGVuY2llc05vdEZvdW5kKCl7cmV0dXJuIHRoaXMuZGVwZW5kZW5jaWVzLmxlbmd0aCYmIXRoaXMuZGVwZW5kZW5jaWVzLmV2ZXJ5KCh0PT50aGlzLnBsdWdpbnNBc1N0cmluZ0FycmF5KCkuaW5jbHVkZXModCkpKX1wbHVnaW5zQXNTdHJpbmdBcnJheSgpe3JldHVybiB0aGlzLnBpY2tlci5vcHRpb25zLnBsdWdpbnMubWFwKCh0PT5cImZ1bmN0aW9uXCI9PXR5cGVvZiB0PyhuZXcgdCkuZ2V0TmFtZSgpOnQpKX1jYW1lbENhc2VUb0tlYmFiKHQpe3JldHVybiB0LnJlcGxhY2UoLyhbYS16QS1aXSkoPz1bQS1aXSkvZyxcIiQxLVwiKS50b0xvd2VyQ2FzZSgpfX1jbGFzcyBhIGV4dGVuZHMgb3twcmlvcml0eT0xO2JpbmRzPXtvblZpZXc6dGhpcy5vblZpZXcuYmluZCh0aGlzKX07b3B0aW9ucz17bWluRGF0ZTpudWxsLG1heERhdGU6bnVsbCxtaW5EYXlzOm51bGwsbWF4RGF5czpudWxsLHNlbGVjdEZvcndhcmQ6bnVsbCxzZWxlY3RCYWNrd2FyZDpudWxsLHByZXNldHM6ITAsaW5zZXBhcmFibGU6ITEsZmlsdGVyOm51bGx9O2dldE5hbWUoKXtyZXR1cm5cIkxvY2tQbHVnaW5cIn1vbkF0dGFjaCgpe2lmKHRoaXMub3B0aW9ucy5taW5EYXRlJiYodGhpcy5vcHRpb25zLm1pbkRhdGU9bmV3IHQodGhpcy5vcHRpb25zLm1pbkRhdGUsdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQsdGhpcy5waWNrZXIub3B0aW9ucy5sYW5nKSksdGhpcy5vcHRpb25zLm1heERhdGUmJih0aGlzLm9wdGlvbnMubWF4RGF0ZT1uZXcgdCh0aGlzLm9wdGlvbnMubWF4RGF0ZSx0aGlzLnBpY2tlci5vcHRpb25zLmZvcm1hdCx0aGlzLnBpY2tlci5vcHRpb25zLmxhbmcpLHRoaXMub3B0aW9ucy5tYXhEYXRlIGluc3RhbmNlb2YgdCYmdGhpcy5waWNrZXIub3B0aW9ucy5jYWxlbmRhcnM+MSYmdGhpcy5waWNrZXIuY2FsZW5kYXJzWzBdLmlzU2FtZSh0aGlzLm9wdGlvbnMubWF4RGF0ZSxcIm1vbnRoXCIpKSl7Y29uc3QgdD10aGlzLnBpY2tlci5jYWxlbmRhcnNbMF0uY2xvbmUoKS5zdWJ0cmFjdCgxLFwibW9udGhcIik7dGhpcy5waWNrZXIuZ290b0RhdGUodCl9aWYoKHRoaXMub3B0aW9ucy5taW5EYXlzfHx0aGlzLm9wdGlvbnMubWF4RGF5c3x8dGhpcy5vcHRpb25zLnNlbGVjdEZvcndhcmR8fHRoaXMub3B0aW9ucy5zZWxlY3RCYWNrd2FyZCkmJiF0aGlzLnBpY2tlci5vcHRpb25zLnBsdWdpbnMuaW5jbHVkZXMoXCJSYW5nZVBsdWdpblwiKSl7Y29uc3QgdD1bXCJtaW5EYXlzXCIsXCJtYXhEYXlzXCIsXCJzZWxlY3RGb3J3YXJkXCIsXCJzZWxlY3RCYWNrd2FyZFwiXTtjb25zb2xlLndhcm4oYCR7dGhpcy5nZXROYW1lKCl9OiBvcHRpb25zICR7dC5qb2luKFwiLCBcIil9IHJlcXVpcmVkIFJhbmdlUGx1Z2luLmApfXRoaXMucGlja2VyLm9uKFwidmlld1wiLHRoaXMuYmluZHMub25WaWV3KX1vbkRldGFjaCgpe3RoaXMucGlja2VyLm9mZihcInZpZXdcIix0aGlzLmJpbmRzLm9uVmlldyl9b25WaWV3KGUpe2NvbnN0e3ZpZXc6aSx0YXJnZXQ6bixkYXRlOnN9PWUuZGV0YWlsO2lmKFwiQ2FsZW5kYXJIZWFkZXJcIj09PWkmJih0aGlzLm9wdGlvbnMubWluRGF0ZSBpbnN0YW5jZW9mIHQmJnMuaXNTYW1lT3JCZWZvcmUodGhpcy5vcHRpb25zLm1pbkRhdGUsXCJtb250aFwiKSYmbi5jbGFzc0xpc3QuYWRkKFwibm8tcHJldmlvdXMtbW9udGhcIiksdGhpcy5vcHRpb25zLm1heERhdGUgaW5zdGFuY2VvZiB0JiZzLmlzU2FtZU9yQWZ0ZXIodGhpcy5vcHRpb25zLm1heERhdGUsXCJtb250aFwiKSYmbi5jbGFzc0xpc3QuYWRkKFwibm8tbmV4dC1tb250aFwiKSksXCJDYWxlbmRhckRheVwiPT09aSl7Y29uc3QgdD10aGlzLnBpY2tlci5kYXRlUGlja2VkLmxlbmd0aD90aGlzLnBpY2tlci5kYXRlUGlja2VkWzBdOm51bGw7aWYodGhpcy50ZXN0RmlsdGVyKHMpKXJldHVybiB2b2lkIG4uY2xhc3NMaXN0LmFkZChcImxvY2tlZFwiKTtpZih0aGlzLm9wdGlvbnMuaW5zZXBhcmFibGUpe2lmKHRoaXMub3B0aW9ucy5taW5EYXlzKXtjb25zdCB0PXMuY2xvbmUoKS5zdWJ0cmFjdCh0aGlzLm9wdGlvbnMubWluRGF5cy0xLFwiZGF5XCIpLGU9cy5jbG9uZSgpLmFkZCh0aGlzLm9wdGlvbnMubWluRGF5cy0xLFwiZGF5XCIpO2xldCBpPSExLG89ITE7Zm9yKDt0LmlzQmVmb3JlKHMsXCJkYXlcIik7KXtpZih0aGlzLnRlc3RGaWx0ZXIodCkpe2k9ITA7YnJlYWt9dC5hZGQoMSxcImRheVwiKX1mb3IoO2UuaXNBZnRlcihzLFwiZGF5XCIpOyl7aWYodGhpcy50ZXN0RmlsdGVyKGUpKXtvPSEwO2JyZWFrfWUuc3VidHJhY3QoMSxcImRheVwiKX1pJiZvJiZuLmNsYXNzTGlzdC5hZGQoXCJub3QtYXZhaWxhYmxlXCIpfXRoaXMucmFuZ2VJc05vdEF2YWlsYWJsZShzLHQpJiZuLmNsYXNzTGlzdC5hZGQoXCJub3QtYXZhaWxhYmxlXCIpfXRoaXMuZGF0ZUlzTm90QXZhaWxhYmxlKHMsdCkmJm4uY2xhc3NMaXN0LmFkZChcIm5vdC1hdmFpbGFibGVcIil9aWYodGhpcy5vcHRpb25zLnByZXNldHMmJlwiUHJlc2V0UGx1Z2luQnV0dG9uXCI9PT1pKXtjb25zdCBlPW5ldyB0KE51bWJlcihuLmRhdGFzZXQuc3RhcnQpKSxpPW5ldyB0KE51bWJlcihuLmRhdGFzZXQuZW5kKSkscz1pLmRpZmYoZSxcImRheVwiKSxvPXRoaXMub3B0aW9ucy5taW5EYXlzJiZzPHRoaXMub3B0aW9ucy5taW5EYXlzLGE9dGhpcy5vcHRpb25zLm1heERheXMmJnM+dGhpcy5vcHRpb25zLm1heERheXM7KG98fGF8fHRoaXMubG9ja01pbkRhdGUoZSl8fHRoaXMubG9ja01heERhdGUoZSl8fHRoaXMubG9ja01pbkRhdGUoaSl8fHRoaXMubG9ja01heERhdGUoaSl8fHRoaXMucmFuZ2VJc05vdEF2YWlsYWJsZShlLGkpKSYmbi5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLFwiZGlzYWJsZWRcIil9fWRhdGVJc05vdEF2YWlsYWJsZSh0LGUpe3JldHVybiB0aGlzLmxvY2tNaW5EYXRlKHQpfHx0aGlzLmxvY2tNYXhEYXRlKHQpfHx0aGlzLmxvY2tNaW5EYXlzKHQsZSl8fHRoaXMubG9ja01heERheXModCxlKXx8dGhpcy5sb2NrU2VsZWN0Rm9yd2FyZCh0KXx8dGhpcy5sb2NrU2VsZWN0QmFja3dhcmQodCl9cmFuZ2VJc05vdEF2YWlsYWJsZSh0LGUpe2lmKCF0fHwhZSlyZXR1cm4hMTtjb25zdCBpPSh0LmlzU2FtZU9yQmVmb3JlKGUsXCJkYXlcIik/dDplKS5jbG9uZSgpLG49KGUuaXNTYW1lT3JBZnRlcih0LFwiZGF5XCIpP2U6dCkuY2xvbmUoKTtmb3IoO2kuaXNTYW1lT3JCZWZvcmUobixcImRheVwiKTspe2lmKHRoaXMudGVzdEZpbHRlcihpKSlyZXR1cm4hMDtpLmFkZCgxLFwiZGF5XCIpfXJldHVybiExfWxvY2tNaW5EYXRlKGUpe3JldHVybiB0aGlzLm9wdGlvbnMubWluRGF0ZSBpbnN0YW5jZW9mIHQmJmUuaXNCZWZvcmUodGhpcy5vcHRpb25zLm1pbkRhdGUsXCJkYXlcIil9bG9ja01heERhdGUoZSl7cmV0dXJuIHRoaXMub3B0aW9ucy5tYXhEYXRlIGluc3RhbmNlb2YgdCYmZS5pc0FmdGVyKHRoaXMub3B0aW9ucy5tYXhEYXRlLFwiZGF5XCIpfWxvY2tNaW5EYXlzKHQsZSl7aWYodGhpcy5vcHRpb25zLm1pbkRheXMmJmUpe2NvbnN0IGk9ZS5jbG9uZSgpLnN1YnRyYWN0KHRoaXMub3B0aW9ucy5taW5EYXlzLTEsXCJkYXlcIiksbj1lLmNsb25lKCkuYWRkKHRoaXMub3B0aW9ucy5taW5EYXlzLTEsXCJkYXlcIik7cmV0dXJuIHQuaXNCZXR3ZWVuKGksbil9cmV0dXJuITF9bG9ja01heERheXModCxlKXtpZih0aGlzLm9wdGlvbnMubWF4RGF5cyYmZSl7Y29uc3QgaT1lLmNsb25lKCkuc3VidHJhY3QodGhpcy5vcHRpb25zLm1heERheXMsXCJkYXlcIiksbj1lLmNsb25lKCkuYWRkKHRoaXMub3B0aW9ucy5tYXhEYXlzLFwiZGF5XCIpO3JldHVybiF0LmlzQmV0d2VlbihpLG4pfXJldHVybiExfWxvY2tTZWxlY3RGb3J3YXJkKHQpe2lmKDE9PT10aGlzLnBpY2tlci5kYXRlUGlja2VkLmxlbmd0aCYmdGhpcy5vcHRpb25zLnNlbGVjdEZvcndhcmQpe2NvbnN0IGU9dGhpcy5waWNrZXIuZGF0ZVBpY2tlZFswXS5jbG9uZSgpO3JldHVybiB0LmlzQmVmb3JlKGUsXCJkYXlcIil9cmV0dXJuITF9bG9ja1NlbGVjdEJhY2t3YXJkKHQpe2lmKDE9PT10aGlzLnBpY2tlci5kYXRlUGlja2VkLmxlbmd0aCYmdGhpcy5vcHRpb25zLnNlbGVjdEJhY2t3YXJkKXtjb25zdCBlPXRoaXMucGlja2VyLmRhdGVQaWNrZWRbMF0uY2xvbmUoKTtyZXR1cm4gdC5pc0FmdGVyKGUsXCJkYXlcIil9cmV0dXJuITF9dGVzdEZpbHRlcih0KXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiB0aGlzLm9wdGlvbnMuZmlsdGVyJiZ0aGlzLm9wdGlvbnMuZmlsdGVyKHQsdGhpcy5waWNrZXIuZGF0ZVBpY2tlZCl9fWNsYXNzIHIgZXh0ZW5kcyBve2RlcGVuZGVuY2llcz1bXCJSYW5nZVBsdWdpblwiXTtiaW5kcz17b25WaWV3OnRoaXMub25WaWV3LmJpbmQodGhpcyksb25DbGljazp0aGlzLm9uQ2xpY2suYmluZCh0aGlzKX07b3B0aW9ucz17Y3VzdG9tTGFiZWxzOltcIlRvZGF5XCIsXCJZZXN0ZXJkYXlcIixcIkxhc3QgNyBEYXlzXCIsXCJMYXN0IDMwIERheXNcIixcIlRoaXMgTW9udGhcIixcIkxhc3QgTW9udGhcIl0sY3VzdG9tUHJlc2V0Ont9LHBvc2l0aW9uOlwibGVmdFwifTtnZXROYW1lKCl7cmV0dXJuXCJQcmVzZXRQbHVnaW5cIn1vbkF0dGFjaCgpe2lmKCFPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnMuY3VzdG9tUHJlc2V0KS5sZW5ndGgpe2NvbnN0IGU9bmV3IHQsaT0oKT0+e2NvbnN0IGk9ZS5jbG9uZSgpO2kuc2V0RGF0ZSgxKTtjb25zdCBuPW5ldyBEYXRlKGUuZ2V0RnVsbFllYXIoKSxlLmdldE1vbnRoKCkrMSwwKTtyZXR1cm5bbmV3IHQoaSksbmV3IHQobildfSxuPSgpPT57Y29uc3QgaT1lLmNsb25lKCk7aS5zZXRNb250aChpLmdldE1vbnRoKCktMSksaS5zZXREYXRlKDEpO2NvbnN0IG49bmV3IERhdGUoZS5nZXRGdWxsWWVhcigpLGUuZ2V0TW9udGgoKSwwKTtyZXR1cm5bbmV3IHQoaSksbmV3IHQobildfSxzPVtbZS5jbG9uZSgpLGUuY2xvbmUoKV0sW2UuY2xvbmUoKS5zdWJ0cmFjdCgxLFwiZGF5XCIpLGUuY2xvbmUoKS5zdWJ0cmFjdCgxLFwiZGF5XCIpXSxbZS5jbG9uZSgpLnN1YnRyYWN0KDYsXCJkYXlcIiksZS5jbG9uZSgpXSxbZS5jbG9uZSgpLnN1YnRyYWN0KDI5LFwiZGF5XCIpLGUuY2xvbmUoKV0saSgpLG4oKV07T2JqZWN0LnZhbHVlcyh0aGlzLm9wdGlvbnMuY3VzdG9tTGFiZWxzKS5mb3JFYWNoKCgodCxlKT0+e3RoaXMub3B0aW9ucy5jdXN0b21QcmVzZXRbdF09c1tlXX0pKX10aGlzLnBpY2tlci5vbihcInZpZXdcIix0aGlzLmJpbmRzLm9uVmlldyksdGhpcy5waWNrZXIub24oXCJjbGlja1wiLHRoaXMuYmluZHMub25DbGljayl9b25EZXRhY2goKXt0aGlzLnBpY2tlci5vZmYoXCJ2aWV3XCIsdGhpcy5iaW5kcy5vblZpZXcpLHRoaXMucGlja2VyLm9mZihcImNsaWNrXCIsdGhpcy5iaW5kcy5vbkNsaWNrKX1vblZpZXcodCl7Y29uc3R7dmlldzplLHRhcmdldDppfT10LmRldGFpbDtpZihcIk1haW5cIj09PWUpe2NvbnN0IHQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTt0LmNsYXNzTmFtZT1cInByZXNldC1wbHVnaW4tY29udGFpbmVyXCIsT2JqZWN0LmtleXModGhpcy5vcHRpb25zLmN1c3RvbVByZXNldCkuZm9yRWFjaCgoZT0+e2lmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLm9wdGlvbnMuY3VzdG9tUHJlc2V0LGUpKXtjb25zdCBpPXRoaXMub3B0aW9ucy5jdXN0b21QcmVzZXRbZV0sbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO24uY2xhc3NOYW1lPVwicHJlc2V0LWJ1dHRvbiB1bml0XCIsbi5pbm5lckhUTUw9ZSxuLmRhdGFzZXQuc3RhcnQ9aVswXS5nZXRUaW1lKCksbi5kYXRhc2V0LmVuZD1pWzFdLmdldFRpbWUoKSx0LmFwcGVuZENoaWxkKG4pLHRoaXMucGlja2VyLnRyaWdnZXIoXCJ2aWV3XCIse3ZpZXc6XCJQcmVzZXRQbHVnaW5CdXR0b25cIix0YXJnZXQ6bn0pfX0pKSxpLmFwcGVuZENoaWxkKHQpLGkuY2xhc3NMaXN0LmFkZChgcHJlc2V0LSR7dGhpcy5vcHRpb25zLnBvc2l0aW9ufWApLHRoaXMucGlja2VyLnRyaWdnZXIoXCJ2aWV3XCIse3ZpZXc6XCJQcmVzZXRQbHVnaW5Db250YWluZXJcIix0YXJnZXQ6dH0pfX1vbkNsaWNrKGUpe2NvbnN0IGk9ZS50YXJnZXQ7aWYoaSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KXtjb25zdCBlPWkuY2xvc2VzdChcIi51bml0XCIpO2lmKCEoZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSlyZXR1cm47aWYodGhpcy5pc1ByZXNldEJ1dHRvbihlKSl7Y29uc3QgaT1uZXcgdChOdW1iZXIoZS5kYXRhc2V0LnN0YXJ0KSksbj1uZXcgdChOdW1iZXIoZS5kYXRhc2V0LmVuZCkpO3RoaXMucGlja2VyLm9wdGlvbnMuYXV0b0FwcGx5Pyh0aGlzLnBpY2tlci5zZXREYXRlUmFuZ2UoaSxuKSx0aGlzLnBpY2tlci50cmlnZ2VyKFwic2VsZWN0XCIse3N0YXJ0OnRoaXMucGlja2VyLmdldFN0YXJ0RGF0ZSgpLGVuZDp0aGlzLnBpY2tlci5nZXRFbmREYXRlKCl9KSx0aGlzLnBpY2tlci5oaWRlKCkpOih0aGlzLnBpY2tlci5kYXRlUGlja2VkPVtpLG5dLHRoaXMucGlja2VyLnJlbmRlckFsbCgpKX19fWlzUHJlc2V0QnV0dG9uKHQpe3JldHVybiB0LmNsYXNzTGlzdC5jb250YWlucyhcInByZXNldC1idXR0b25cIil9fWNsYXNzIGMgZXh0ZW5kcyBve3Rvb2x0aXBFbGVtZW50O3RyaWdnZXJFbGVtZW50O2JpbmRzPXtzZXRTdGFydERhdGU6dGhpcy5zZXRTdGFydERhdGUuYmluZCh0aGlzKSxzZXRFbmREYXRlOnRoaXMuc2V0RW5kRGF0ZS5iaW5kKHRoaXMpLHNldERhdGVSYW5nZTp0aGlzLnNldERhdGVSYW5nZS5iaW5kKHRoaXMpLGdldFN0YXJ0RGF0ZTp0aGlzLmdldFN0YXJ0RGF0ZS5iaW5kKHRoaXMpLGdldEVuZERhdGU6dGhpcy5nZXRFbmREYXRlLmJpbmQodGhpcyksb25WaWV3OnRoaXMub25WaWV3LmJpbmQodGhpcyksb25TaG93OnRoaXMub25TaG93LmJpbmQodGhpcyksb25Nb3VzZUVudGVyOnRoaXMub25Nb3VzZUVudGVyLmJpbmQodGhpcyksb25Nb3VzZUxlYXZlOnRoaXMub25Nb3VzZUxlYXZlLmJpbmQodGhpcyksb25DbGlja0NhbGVuZGFyRGF5OnRoaXMub25DbGlja0NhbGVuZGFyRGF5LmJpbmQodGhpcyksb25DbGlja0FwcGx5QnV0dG9uOnRoaXMub25DbGlja0FwcGx5QnV0dG9uLmJpbmQodGhpcykscGFyc2VWYWx1ZXM6dGhpcy5wYXJzZVZhbHVlcy5iaW5kKHRoaXMpLHVwZGF0ZVZhbHVlczp0aGlzLnVwZGF0ZVZhbHVlcy5iaW5kKHRoaXMpLGNsZWFyOnRoaXMuY2xlYXIuYmluZCh0aGlzKX07b3B0aW9ucz17ZWxlbWVudEVuZDpudWxsLHN0YXJ0RGF0ZTpudWxsLGVuZERhdGU6bnVsbCxyZXBpY2s6ITEsc3RyaWN0OiEwLGRlbGltaXRlcjpcIiAtIFwiLHRvb2x0aXA6ITAsdG9vbHRpcE51bWJlcjp0PT50LGxvY2FsZTp7emVybzpcIlwiLG9uZTpcImRheVwiLHR3bzpcIlwiLGZldzpcIlwiLG1hbnk6XCJcIixvdGhlcjpcImRheXNcIn0sZG9jdW1lbnRDbGljazp0aGlzLmhpZGVQaWNrZXIuYmluZCh0aGlzKX07Z2V0TmFtZSgpe3JldHVyblwiUmFuZ2VQbHVnaW5cIn1vbkF0dGFjaCgpe3RoaXMuYmluZHMuX3NldFN0YXJ0RGF0ZT10aGlzLnBpY2tlci5zZXRTdGFydERhdGUsdGhpcy5iaW5kcy5fc2V0RW5kRGF0ZT10aGlzLnBpY2tlci5zZXRFbmREYXRlLHRoaXMuYmluZHMuX3NldERhdGVSYW5nZT10aGlzLnBpY2tlci5zZXREYXRlUmFuZ2UsdGhpcy5iaW5kcy5fZ2V0U3RhcnREYXRlPXRoaXMucGlja2VyLmdldFN0YXJ0RGF0ZSx0aGlzLmJpbmRzLl9nZXRFbmREYXRlPXRoaXMucGlja2VyLmdldEVuZERhdGUsdGhpcy5iaW5kcy5fcGFyc2VWYWx1ZXM9dGhpcy5waWNrZXIucGFyc2VWYWx1ZXMsdGhpcy5iaW5kcy5fdXBkYXRlVmFsdWVzPXRoaXMucGlja2VyLnVwZGF0ZVZhbHVlcyx0aGlzLmJpbmRzLl9jbGVhcj10aGlzLnBpY2tlci5jbGVhcix0aGlzLmJpbmRzLl9vbkNsaWNrQ2FsZW5kYXJEYXk9dGhpcy5waWNrZXIub25DbGlja0NhbGVuZGFyRGF5LHRoaXMuYmluZHMuX29uQ2xpY2tBcHBseUJ1dHRvbj10aGlzLnBpY2tlci5vbkNsaWNrQXBwbHlCdXR0b24sT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcy5waWNrZXIse3NldFN0YXJ0RGF0ZTp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuc2V0U3RhcnREYXRlfSxzZXRFbmREYXRlOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5zZXRFbmREYXRlfSxzZXREYXRlUmFuZ2U6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLnNldERhdGVSYW5nZX0sZ2V0U3RhcnREYXRlOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5nZXRTdGFydERhdGV9LGdldEVuZERhdGU6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLmdldEVuZERhdGV9LHBhcnNlVmFsdWVzOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5wYXJzZVZhbHVlc30sdXBkYXRlVmFsdWVzOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy51cGRhdGVWYWx1ZXN9LGNsZWFyOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5jbGVhcn0sb25DbGlja0NhbGVuZGFyRGF5Ontjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5vbkNsaWNrQ2FsZW5kYXJEYXl9LG9uQ2xpY2tBcHBseUJ1dHRvbjp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMub25DbGlja0FwcGx5QnV0dG9ufX0pLHRoaXMub3B0aW9ucy5lbGVtZW50RW5kJiYodGhpcy5vcHRpb25zLmVsZW1lbnRFbmQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudHx8KHRoaXMub3B0aW9ucy5lbGVtZW50RW5kPXRoaXMucGlja2VyLm9wdGlvbnMuZG9jLnF1ZXJ5U2VsZWN0b3IodGhpcy5vcHRpb25zLmVsZW1lbnRFbmQpKSx0aGlzLm9wdGlvbnMuZWxlbWVudEVuZCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQmJih0aGlzLm9wdGlvbnMuZWxlbWVudEVuZC5yZWFkT25seT10aGlzLnBpY2tlci5vcHRpb25zLnJlYWRvbmx5KSxcImZ1bmN0aW9uXCI9PXR5cGVvZiB0aGlzLnBpY2tlci5vcHRpb25zLmRvY3VtZW50Q2xpY2smJihkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIix0aGlzLnBpY2tlci5vcHRpb25zLmRvY3VtZW50Q2xpY2ssITApLFwiZnVuY3Rpb25cIj09dHlwZW9mIHRoaXMub3B0aW9ucy5kb2N1bWVudENsaWNrJiZkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIix0aGlzLm9wdGlvbnMuZG9jdW1lbnRDbGljaywhMCkpLHRoaXMub3B0aW9ucy5lbGVtZW50RW5kLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHRoaXMucGlja2VyLnNob3cuYmluZCh0aGlzLnBpY2tlcikpKSx0aGlzLm9wdGlvbnMucmVwaWNrPXRoaXMub3B0aW9ucy5yZXBpY2smJnRoaXMub3B0aW9ucy5lbGVtZW50RW5kIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQsdGhpcy5waWNrZXIub3B0aW9ucy5kYXRlPW51bGwsdGhpcy5waWNrZXIub24oXCJ2aWV3XCIsdGhpcy5iaW5kcy5vblZpZXcpLHRoaXMucGlja2VyLm9uKFwic2hvd1wiLHRoaXMuYmluZHMub25TaG93KSx0aGlzLnBpY2tlci5vbihcIm1vdXNlZW50ZXJcIix0aGlzLmJpbmRzLm9uTW91c2VFbnRlciwhMCksdGhpcy5waWNrZXIub24oXCJtb3VzZWxlYXZlXCIsdGhpcy5iaW5kcy5vbk1vdXNlTGVhdmUsITApLHRoaXMuY2hlY2tJbnRsUGx1cmFsTG9jYWxlcygpfW9uRGV0YWNoKCl7T2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcy5waWNrZXIse3NldFN0YXJ0RGF0ZTp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuX3NldFN0YXJ0RGF0ZX0sc2V0RW5kRGF0ZTp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuX3NldEVuZERhdGV9LHNldERhdGVSYW5nZTp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuX3NldERhdGVSYW5nZX0sZ2V0U3RhcnREYXRlOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5fZ2V0U3RhcnREYXRlfSxnZXRFbmREYXRlOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5fZ2V0RW5kRGF0ZX0scGFyc2VWYWx1ZXM6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLl9wYXJzZVZhbHVlc30sdXBkYXRlVmFsdWVzOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5fdXBkYXRlVmFsdWVzfSxjbGVhcjp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuX2NsZWFyfSxvbkNsaWNrQ2FsZW5kYXJEYXk6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLl9vbkNsaWNrQ2FsZW5kYXJEYXl9LG9uQ2xpY2tBcHBseUJ1dHRvbjp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuX29uQ2xpY2tBcHBseUJ1dHRvbn19KSx0aGlzLnBpY2tlci5vZmYoXCJ2aWV3XCIsdGhpcy5iaW5kcy5vblZpZXcpLHRoaXMucGlja2VyLm9mZihcInNob3dcIix0aGlzLmJpbmRzLm9uU2hvdyksdGhpcy5waWNrZXIub2ZmKFwibW91c2VlbnRlclwiLHRoaXMuYmluZHMub25Nb3VzZUVudGVyLCEwKSx0aGlzLnBpY2tlci5vZmYoXCJtb3VzZWxlYXZlXCIsdGhpcy5iaW5kcy5vbk1vdXNlTGVhdmUsITApfXBhcnNlVmFsdWVzKCl7aWYodGhpcy5vcHRpb25zLnN0YXJ0RGF0ZXx8dGhpcy5vcHRpb25zLmVuZERhdGUpdGhpcy5vcHRpb25zLnN0cmljdD90aGlzLm9wdGlvbnMuc3RhcnREYXRlJiZ0aGlzLm9wdGlvbnMuZW5kRGF0ZT90aGlzLnNldERhdGVSYW5nZSh0aGlzLm9wdGlvbnMuc3RhcnREYXRlLHRoaXMub3B0aW9ucy5lbmREYXRlKToodGhpcy5vcHRpb25zLnN0YXJ0RGF0ZT1udWxsLHRoaXMub3B0aW9ucy5lbmREYXRlPW51bGwpOih0aGlzLm9wdGlvbnMuc3RhcnREYXRlJiZ0aGlzLnNldFN0YXJ0RGF0ZSh0aGlzLm9wdGlvbnMuc3RhcnREYXRlKSx0aGlzLm9wdGlvbnMuZW5kRGF0ZSYmdGhpcy5zZXRFbmREYXRlKHRoaXMub3B0aW9ucy5lbmREYXRlKSk7ZWxzZSBpZih0aGlzLm9wdGlvbnMuZWxlbWVudEVuZCl0aGlzLm9wdGlvbnMuc3RyaWN0P3RoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQmJnRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudC52YWx1ZS5sZW5ndGgmJnRoaXMub3B0aW9ucy5lbGVtZW50RW5kIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCYmdGhpcy5vcHRpb25zLmVsZW1lbnRFbmQudmFsdWUubGVuZ3RoJiZ0aGlzLnNldERhdGVSYW5nZSh0aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQudmFsdWUsdGhpcy5vcHRpb25zLmVsZW1lbnRFbmQudmFsdWUpOih0aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50JiZ0aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQudmFsdWUubGVuZ3RoJiZ0aGlzLnNldFN0YXJ0RGF0ZSh0aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQudmFsdWUpLHRoaXMub3B0aW9ucy5lbGVtZW50RW5kIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCYmdGhpcy5vcHRpb25zLmVsZW1lbnRFbmQudmFsdWUubGVuZ3RoJiZ0aGlzLnNldEVuZERhdGUodGhpcy5vcHRpb25zLmVsZW1lbnRFbmQudmFsdWUpKTtlbHNlIGlmKHRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQmJnRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudC52YWx1ZS5sZW5ndGgpe2NvbnN0W3QsZV09dGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50LnZhbHVlLnNwbGl0KHRoaXMub3B0aW9ucy5kZWxpbWl0ZXIpO3RoaXMub3B0aW9ucy5zdHJpY3Q/dCYmZSYmdGhpcy5zZXREYXRlUmFuZ2UodCxlKToodCYmdGhpcy5zZXRTdGFydERhdGUodCksZSYmdGhpcy5zZXRFbmREYXRlKGUpKX19dXBkYXRlVmFsdWVzKCl7Y29uc3QgdD10aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQsZT10aGlzLm9wdGlvbnMuZWxlbWVudEVuZCxpPXRoaXMucGlja2VyLmdldFN0YXJ0RGF0ZSgpLG49dGhpcy5waWNrZXIuZ2V0RW5kRGF0ZSgpLHM9aSBpbnN0YW5jZW9mIERhdGU/aS5mb3JtYXQodGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQsdGhpcy5waWNrZXIub3B0aW9ucy5sYW5nKTpcIlwiLG89biBpbnN0YW5jZW9mIERhdGU/bi5mb3JtYXQodGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQsdGhpcy5waWNrZXIub3B0aW9ucy5sYW5nKTpcIlwiO2lmKGUpdCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQ/dC52YWx1ZT1zOnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCYmKHQuaW5uZXJUZXh0PXMpLGUgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50P2UudmFsdWU9bzplIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQmJihlLmlubmVyVGV4dD1vKTtlbHNle2NvbnN0IGU9YCR7c30ke3N8fG8/dGhpcy5vcHRpb25zLmRlbGltaXRlcjpcIlwifSR7b31gO3QgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50P3QudmFsdWU9ZTp0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQmJih0LmlubmVyVGV4dD1lKX19Y2xlYXIoKXt0aGlzLm9wdGlvbnMuc3RhcnREYXRlPW51bGwsdGhpcy5vcHRpb25zLmVuZERhdGU9bnVsbCx0aGlzLnBpY2tlci5kYXRlUGlja2VkLmxlbmd0aD0wLHRoaXMudXBkYXRlVmFsdWVzKCksdGhpcy5waWNrZXIucmVuZGVyQWxsKCksdGhpcy5waWNrZXIudHJpZ2dlcihcImNsZWFyXCIpfW9uU2hvdyh0KXtjb25zdHt0YXJnZXQ6ZX09dC5kZXRhaWw7dGhpcy50cmlnZ2VyRWxlbWVudD1lLHRoaXMucGlja2VyLm9wdGlvbnMuc2Nyb2xsVG9EYXRlJiZ0aGlzLmdldFN0YXJ0RGF0ZSgpaW5zdGFuY2VvZiBEYXRlJiZ0aGlzLnBpY2tlci5nb3RvRGF0ZSh0aGlzLmdldFN0YXJ0RGF0ZSgpKSx0aGlzLmluaXRpYWxpemVSZXBpY2soKX1vblZpZXcoZSl7Y29uc3R7dmlldzppLHRhcmdldDpufT1lLmRldGFpbDtpZihcIk1haW5cIj09PWkmJih0aGlzLnRvb2x0aXBFbGVtZW50PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpLHRoaXMudG9vbHRpcEVsZW1lbnQuY2xhc3NOYW1lPVwicmFuZ2UtcGx1Z2luLXRvb2x0aXBcIixuLmFwcGVuZENoaWxkKHRoaXMudG9vbHRpcEVsZW1lbnQpKSxcIkNhbGVuZGFyRGF5XCI9PT1pKXtjb25zdCBlPW5ldyB0KG4uZGF0YXNldC50aW1lKSxpPXRoaXMucGlja2VyLmRhdGVQaWNrZWQscz1pLmxlbmd0aD90aGlzLnBpY2tlci5kYXRlUGlja2VkWzBdOnRoaXMuZ2V0U3RhcnREYXRlKCksbz1pLmxlbmd0aD90aGlzLnBpY2tlci5kYXRlUGlja2VkWzFdOnRoaXMuZ2V0RW5kRGF0ZSgpO3MmJnMuaXNTYW1lKGUsXCJkYXlcIikmJm4uY2xhc3NMaXN0LmFkZChcInN0YXJ0XCIpLHMmJm8mJihvLmlzU2FtZShlLFwiZGF5XCIpJiZuLmNsYXNzTGlzdC5hZGQoXCJlbmRcIiksZS5pc0JldHdlZW4ocyxvKSYmbi5jbGFzc0xpc3QuYWRkKFwiaW4tcmFuZ2VcIikpfWlmKFwiRm9vdGVyXCI9PT1pKXtjb25zdCB0PTE9PT10aGlzLnBpY2tlci5kYXRlUGlja2VkLmxlbmd0aCYmIXRoaXMub3B0aW9ucy5zdHJpY3R8fDI9PT10aGlzLnBpY2tlci5kYXRlUGlja2VkLmxlbmd0aDtuLnF1ZXJ5U2VsZWN0b3IoXCIuYXBwbHktYnV0dG9uXCIpLmRpc2FibGVkPSF0fX1oaWRlUGlja2VyKHQpe2xldCBlPXQudGFyZ2V0LGk9bnVsbDtlLnNoYWRvd1Jvb3QmJihlPXQuY29tcG9zZWRQYXRoKClbMF0saT1lLmdldFJvb3ROb2RlKCkuaG9zdCksdGhpcy5waWNrZXIuaXNTaG93bigpJiZpIT09dGhpcy5waWNrZXIudWkud3JhcHBlciYmZSE9PXRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudCYmZSE9PXRoaXMub3B0aW9ucy5lbGVtZW50RW5kJiZ0aGlzLnBpY2tlci5oaWRlKCl9c2V0U3RhcnREYXRlKGUpe2NvbnN0IGk9bmV3IHQoZSx0aGlzLnBpY2tlci5vcHRpb25zLmZvcm1hdCk7dGhpcy5vcHRpb25zLnN0YXJ0RGF0ZT1pP2kuY2xvbmUoKTpudWxsLHRoaXMudXBkYXRlVmFsdWVzKCksdGhpcy5waWNrZXIucmVuZGVyQWxsKCl9c2V0RW5kRGF0ZShlKXtjb25zdCBpPW5ldyB0KGUsdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQpO3RoaXMub3B0aW9ucy5lbmREYXRlPWk/aS5jbG9uZSgpOm51bGwsdGhpcy51cGRhdGVWYWx1ZXMoKSx0aGlzLnBpY2tlci5yZW5kZXJBbGwoKX1zZXREYXRlUmFuZ2UoZSxpKXtjb25zdCBuPW5ldyB0KGUsdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQpLHM9bmV3IHQoaSx0aGlzLnBpY2tlci5vcHRpb25zLmZvcm1hdCk7dGhpcy5vcHRpb25zLnN0YXJ0RGF0ZT1uP24uY2xvbmUoKTpudWxsLHRoaXMub3B0aW9ucy5lbmREYXRlPXM/cy5jbG9uZSgpOm51bGwsdGhpcy51cGRhdGVWYWx1ZXMoKSx0aGlzLnBpY2tlci5yZW5kZXJBbGwoKX1nZXRTdGFydERhdGUoKXtyZXR1cm4gdGhpcy5vcHRpb25zLnN0YXJ0RGF0ZSBpbnN0YW5jZW9mIERhdGU/dGhpcy5vcHRpb25zLnN0YXJ0RGF0ZS5jbG9uZSgpOm51bGx9Z2V0RW5kRGF0ZSgpe3JldHVybiB0aGlzLm9wdGlvbnMuZW5kRGF0ZSBpbnN0YW5jZW9mIERhdGU/dGhpcy5vcHRpb25zLmVuZERhdGUuY2xvbmUoKTpudWxsfW9uTW91c2VFbnRlcihlKXtjb25zdCBpPWUudGFyZ2V0O2lmKGkgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCl7dGhpcy5pc0NvbnRhaW5lcihpKSYmdGhpcy5pbml0aWFsaXplUmVwaWNrKCk7Y29uc3QgZT1pLmNsb3Nlc3QoXCIudW5pdFwiKTtpZighKGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpcmV0dXJuO2lmKHRoaXMucGlja2VyLmlzQ2FsZW5kYXJEYXkoZSkpe2lmKDEhPT10aGlzLnBpY2tlci5kYXRlUGlja2VkLmxlbmd0aClyZXR1cm47bGV0IGk9dGhpcy5waWNrZXIuZGF0ZVBpY2tlZFswXS5jbG9uZSgpLG49bmV3IHQoZS5kYXRhc2V0LnRpbWUpLHM9ITE7aWYoaS5pc0FmdGVyKG4sXCJkYXlcIikpe2NvbnN0IHQ9aS5jbG9uZSgpO2k9bi5jbG9uZSgpLG49dC5jbG9uZSgpLHM9ITB9aWYoWy4uLnRoaXMucGlja2VyLnVpLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLmRheVwiKV0uZm9yRWFjaCgobz0+e2NvbnN0IGE9bmV3IHQoby5kYXRhc2V0LnRpbWUpLHI9dGhpcy5waWNrZXIuQ2FsZW5kYXIuZ2V0Q2FsZW5kYXJEYXlWaWV3KGEpO2EuaXNCZXR3ZWVuKGksbikmJnIuY2xhc3NMaXN0LmFkZChcImluLXJhbmdlXCIpLGEuaXNTYW1lKHRoaXMucGlja2VyLmRhdGVQaWNrZWRbMF0sXCJkYXlcIikmJihyLmNsYXNzTGlzdC5hZGQoXCJzdGFydFwiKSxyLmNsYXNzTGlzdC50b2dnbGUoXCJmbGlwcGVkXCIscykpLG89PT1lJiYoci5jbGFzc0xpc3QuYWRkKFwiZW5kXCIpLHIuY2xhc3NMaXN0LnRvZ2dsZShcImZsaXBwZWRcIixzKSksby5jbGFzc05hbWU9ci5jbGFzc05hbWV9KSksdGhpcy5vcHRpb25zLnRvb2x0aXApe2NvbnN0IHQ9dGhpcy5vcHRpb25zLnRvb2x0aXBOdW1iZXIobi5kaWZmKGksXCJkYXlcIikrMSk7aWYodD4wKXtjb25zdCBpPW5ldyBJbnRsLlBsdXJhbFJ1bGVzKHRoaXMucGlja2VyLm9wdGlvbnMubGFuZykuc2VsZWN0KHQpLG49YCR7dH0gJHt0aGlzLm9wdGlvbnMubG9jYWxlW2ldfWA7dGhpcy5zaG93VG9vbHRpcChlLG4pfWVsc2UgdGhpcy5oaWRlVG9vbHRpcCgpfX19fW9uTW91c2VMZWF2ZSh0KXtpZih0aGlzLmlzQ29udGFpbmVyKHQudGFyZ2V0KSYmdGhpcy5vcHRpb25zLnJlcGljayl7Y29uc3QgdD10aGlzLmdldFN0YXJ0RGF0ZSgpLGU9dGhpcy5nZXRFbmREYXRlKCk7dCYmZSYmKHRoaXMucGlja2VyLmRhdGVQaWNrZWQubGVuZ3RoPTAsdGhpcy5waWNrZXIucmVuZGVyQWxsKCkpfX1vbkNsaWNrQ2FsZW5kYXJEYXkoZSl7aWYodGhpcy5waWNrZXIuaXNDYWxlbmRhckRheShlKSl7Mj09PXRoaXMucGlja2VyLmRhdGVQaWNrZWQubGVuZ3RoJiYodGhpcy5waWNrZXIuZGF0ZVBpY2tlZC5sZW5ndGg9MCk7Y29uc3QgaT1uZXcgdChlLmRhdGFzZXQudGltZSk7aWYodGhpcy5waWNrZXIuZGF0ZVBpY2tlZFt0aGlzLnBpY2tlci5kYXRlUGlja2VkLmxlbmd0aF09aSwyPT09dGhpcy5waWNrZXIuZGF0ZVBpY2tlZC5sZW5ndGgmJnRoaXMucGlja2VyLmRhdGVQaWNrZWRbMF0uaXNBZnRlcih0aGlzLnBpY2tlci5kYXRlUGlja2VkWzFdKSl7Y29uc3QgdD10aGlzLnBpY2tlci5kYXRlUGlja2VkWzFdLmNsb25lKCk7dGhpcy5waWNrZXIuZGF0ZVBpY2tlZFsxXT10aGlzLnBpY2tlci5kYXRlUGlja2VkWzBdLmNsb25lKCksdGhpcy5waWNrZXIuZGF0ZVBpY2tlZFswXT10LmNsb25lKCl9MSE9PXRoaXMucGlja2VyLmRhdGVQaWNrZWQubGVuZ3RoJiZ0aGlzLnBpY2tlci5vcHRpb25zLmF1dG9BcHBseXx8dGhpcy5waWNrZXIudHJpZ2dlcihcInByZXNlbGVjdFwiLHtzdGFydDp0aGlzLnBpY2tlci5kYXRlUGlja2VkWzBdaW5zdGFuY2VvZiBEYXRlP3RoaXMucGlja2VyLmRhdGVQaWNrZWRbMF0uY2xvbmUoKTpudWxsLGVuZDp0aGlzLnBpY2tlci5kYXRlUGlja2VkWzFdaW5zdGFuY2VvZiBEYXRlP3RoaXMucGlja2VyLmRhdGVQaWNrZWRbMV0uY2xvbmUoKTpudWxsfSksMT09PXRoaXMucGlja2VyLmRhdGVQaWNrZWQubGVuZ3RoJiYoIXRoaXMub3B0aW9ucy5zdHJpY3QmJnRoaXMucGlja2VyLm9wdGlvbnMuYXV0b0FwcGx5JiYodGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50PT09dGhpcy50cmlnZ2VyRWxlbWVudCYmdGhpcy5zZXRTdGFydERhdGUodGhpcy5waWNrZXIuZGF0ZVBpY2tlZFswXSksdGhpcy5vcHRpb25zLmVsZW1lbnRFbmQ9PT10aGlzLnRyaWdnZXJFbGVtZW50JiZ0aGlzLnNldEVuZERhdGUodGhpcy5waWNrZXIuZGF0ZVBpY2tlZFswXSksdGhpcy5waWNrZXIudHJpZ2dlcihcInNlbGVjdFwiLHtzdGFydDp0aGlzLnBpY2tlci5nZXRTdGFydERhdGUoKSxlbmQ6dGhpcy5waWNrZXIuZ2V0RW5kRGF0ZSgpfSkpLHRoaXMucGlja2VyLnJlbmRlckFsbCgpKSwyPT09dGhpcy5waWNrZXIuZGF0ZVBpY2tlZC5sZW5ndGgmJih0aGlzLnBpY2tlci5vcHRpb25zLmF1dG9BcHBseT8odGhpcy5zZXREYXRlUmFuZ2UodGhpcy5waWNrZXIuZGF0ZVBpY2tlZFswXSx0aGlzLnBpY2tlci5kYXRlUGlja2VkWzFdKSx0aGlzLnBpY2tlci50cmlnZ2VyKFwic2VsZWN0XCIse3N0YXJ0OnRoaXMucGlja2VyLmdldFN0YXJ0RGF0ZSgpLGVuZDp0aGlzLnBpY2tlci5nZXRFbmREYXRlKCl9KSx0aGlzLnBpY2tlci5oaWRlKCkpOih0aGlzLmhpZGVUb29sdGlwKCksdGhpcy5waWNrZXIucmVuZGVyQWxsKCkpKX19b25DbGlja0FwcGx5QnV0dG9uKHQpe3RoaXMucGlja2VyLmlzQXBwbHlCdXR0b24odCkmJigxIT09dGhpcy5waWNrZXIuZGF0ZVBpY2tlZC5sZW5ndGh8fHRoaXMub3B0aW9ucy5zdHJpY3R8fCh0aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQ9PT10aGlzLnRyaWdnZXJFbGVtZW50JiYodGhpcy5vcHRpb25zLmVuZERhdGU9bnVsbCx0aGlzLnNldFN0YXJ0RGF0ZSh0aGlzLnBpY2tlci5kYXRlUGlja2VkWzBdKSksdGhpcy5vcHRpb25zLmVsZW1lbnRFbmQ9PT10aGlzLnRyaWdnZXJFbGVtZW50JiYodGhpcy5vcHRpb25zLnN0YXJ0RGF0ZT1udWxsLHRoaXMuc2V0RW5kRGF0ZSh0aGlzLnBpY2tlci5kYXRlUGlja2VkWzBdKSkpLDI9PT10aGlzLnBpY2tlci5kYXRlUGlja2VkLmxlbmd0aCYmdGhpcy5zZXREYXRlUmFuZ2UodGhpcy5waWNrZXIuZGF0ZVBpY2tlZFswXSx0aGlzLnBpY2tlci5kYXRlUGlja2VkWzFdKSx0aGlzLnBpY2tlci50cmlnZ2VyKFwic2VsZWN0XCIse3N0YXJ0OnRoaXMucGlja2VyLmdldFN0YXJ0RGF0ZSgpLGVuZDp0aGlzLnBpY2tlci5nZXRFbmREYXRlKCl9KSx0aGlzLnBpY2tlci5oaWRlKCkpfXNob3dUb29sdGlwKHQsZSl7dGhpcy50b29sdGlwRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5PVwidmlzaWJsZVwiLHRoaXMudG9vbHRpcEVsZW1lbnQuaW5uZXJIVE1MPWU7Y29uc3QgaT10aGlzLnBpY2tlci51aS5jb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksbj10aGlzLnRvb2x0aXBFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLHM9dC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtsZXQgbz1zLnRvcCxhPXMubGVmdDtvLT1pLnRvcCxhLT1pLmxlZnQsby09bi5oZWlnaHQsYS09bi53aWR0aC8yLGErPXMud2lkdGgvMix0aGlzLnRvb2x0aXBFbGVtZW50LnN0eWxlLnRvcD1gJHtvfXB4YCx0aGlzLnRvb2x0aXBFbGVtZW50LnN0eWxlLmxlZnQ9YCR7YX1weGB9aGlkZVRvb2x0aXAoKXt0aGlzLnRvb2x0aXBFbGVtZW50LnN0eWxlLnZpc2liaWxpdHk9XCJoaWRkZW5cIn1jaGVja0ludGxQbHVyYWxMb2NhbGVzKCl7aWYoIXRoaXMub3B0aW9ucy50b29sdGlwKXJldHVybjtjb25zdCB0PVsuLi5uZXcgU2V0KFtuZXcgSW50bC5QbHVyYWxSdWxlcyh0aGlzLnBpY2tlci5vcHRpb25zLmxhbmcpLnNlbGVjdCgwKSxuZXcgSW50bC5QbHVyYWxSdWxlcyh0aGlzLnBpY2tlci5vcHRpb25zLmxhbmcpLnNlbGVjdCgxKSxuZXcgSW50bC5QbHVyYWxSdWxlcyh0aGlzLnBpY2tlci5vcHRpb25zLmxhbmcpLnNlbGVjdCgyKSxuZXcgSW50bC5QbHVyYWxSdWxlcyh0aGlzLnBpY2tlci5vcHRpb25zLmxhbmcpLnNlbGVjdCg2KSxuZXcgSW50bC5QbHVyYWxSdWxlcyh0aGlzLnBpY2tlci5vcHRpb25zLmxhbmcpLnNlbGVjdCgxOCldKV0sZT1PYmplY3Qua2V5cyh0aGlzLm9wdGlvbnMubG9jYWxlKTt0LmV2ZXJ5KCh0PT5lLmluY2x1ZGVzKHQpKSl8fGNvbnNvbGUud2FybihgJHt0aGlzLmdldE5hbWUoKX06IHByb3ZpZGUgbG9jYWxlcyAoJHt0LmpvaW4oXCIsIFwiKX0pIGZvciBjb3JyZWN0IHRvb2x0aXAgdGV4dC5gKX1pbml0aWFsaXplUmVwaWNrKCl7aWYoIXRoaXMub3B0aW9ucy5yZXBpY2spcmV0dXJuO2NvbnN0IHQ9dGhpcy5nZXRTdGFydERhdGUoKSxlPXRoaXMuZ2V0RW5kRGF0ZSgpO2UmJnRoaXMudHJpZ2dlckVsZW1lbnQ9PT10aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQmJih0aGlzLnBpY2tlci5kYXRlUGlja2VkWzBdPWUpLHQmJnRoaXMudHJpZ2dlckVsZW1lbnQ9PT10aGlzLm9wdGlvbnMuZWxlbWVudEVuZCYmKHRoaXMucGlja2VyLmRhdGVQaWNrZWRbMF09dCl9aXNDb250YWluZXIodCl7cmV0dXJuIHQ9PT10aGlzLnBpY2tlci51aS5jb250YWluZXJ9fWNsYXNzIGwgZXh0ZW5kcyBve29wdGlvbnM9e25hdGl2ZTohMSxzZWNvbmRzOiExLHN0ZXBIb3VyczoxLHN0ZXBNaW51dGVzOjUsc3RlcFNlY29uZHM6NSxmb3JtYXQxMjohMX07cmFuZ2VQbHVnaW47dGltZVBpY2tlZD17aW5wdXQ6bnVsbCxzdGFydDpudWxsLGVuZDpudWxsfTt0aW1lUHJlUGlja2VkPXtpbnB1dDpudWxsLHN0YXJ0Om51bGwsZW5kOm51bGx9O2JpbmRzPXtnZXREYXRlOnRoaXMuZ2V0RGF0ZS5iaW5kKHRoaXMpLGdldFN0YXJ0RGF0ZTp0aGlzLmdldFN0YXJ0RGF0ZS5iaW5kKHRoaXMpLGdldEVuZERhdGU6dGhpcy5nZXRFbmREYXRlLmJpbmQodGhpcyksb25WaWV3OnRoaXMub25WaWV3LmJpbmQodGhpcyksb25JbnB1dDp0aGlzLm9uSW5wdXQuYmluZCh0aGlzKSxvbkNoYW5nZTp0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcyksb25DbGljazp0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSxzZXRUaW1lOnRoaXMuc2V0VGltZS5iaW5kKHRoaXMpLHNldFN0YXJ0VGltZTp0aGlzLnNldFN0YXJ0VGltZS5iaW5kKHRoaXMpLHNldEVuZFRpbWU6dGhpcy5zZXRFbmRUaW1lLmJpbmQodGhpcyl9O2dldE5hbWUoKXtyZXR1cm5cIlRpbWVQbHVnaW5cIn1vbkF0dGFjaCgpe3RoaXMuYmluZHMuX2dldERhdGU9dGhpcy5waWNrZXIuZ2V0RGF0ZSx0aGlzLmJpbmRzLl9nZXRTdGFydERhdGU9dGhpcy5waWNrZXIuZ2V0U3RhcnREYXRlLHRoaXMuYmluZHMuX2dldEVuZERhdGU9dGhpcy5waWNrZXIuZ2V0RW5kRGF0ZSxPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLnBpY2tlcix7Z2V0RGF0ZTp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuZ2V0RGF0ZX0sZ2V0U3RhcnREYXRlOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5nZXRTdGFydERhdGV9LGdldEVuZERhdGU6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLmdldEVuZERhdGV9LHNldFRpbWU6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLnNldFRpbWV9LHNldFN0YXJ0VGltZTp7Y29uZmlndXJhYmxlOiEwLHZhbHVlOnRoaXMuYmluZHMuc2V0U3RhcnRUaW1lfSxzZXRFbmRUaW1lOntjb25maWd1cmFibGU6ITAsdmFsdWU6dGhpcy5iaW5kcy5zZXRFbmRUaW1lfX0pLHRoaXMucmFuZ2VQbHVnaW49dGhpcy5waWNrZXIuUGx1Z2luTWFuYWdlci5nZXRJbnN0YW5jZShcIlJhbmdlUGx1Z2luXCIpLHRoaXMucGFyc2VWYWx1ZXMoKSx0aGlzLnBpY2tlci5vbihcInZpZXdcIix0aGlzLmJpbmRzLm9uVmlldyksdGhpcy5waWNrZXIub24oXCJpbnB1dFwiLHRoaXMuYmluZHMub25JbnB1dCksdGhpcy5waWNrZXIub24oXCJjaGFuZ2VcIix0aGlzLmJpbmRzLm9uQ2hhbmdlKSx0aGlzLnBpY2tlci5vbihcImNsaWNrXCIsdGhpcy5iaW5kcy5vbkNsaWNrKX1vbkRldGFjaCgpe2RlbGV0ZSB0aGlzLnBpY2tlci5zZXRUaW1lLGRlbGV0ZSB0aGlzLnBpY2tlci5zZXRTdGFydFRpbWUsZGVsZXRlIHRoaXMucGlja2VyLnNldEVuZFRpbWUsT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcy5waWNrZXIse2dldERhdGU6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLl9nZXREYXRlfSxnZXRTdGFydERhdGU6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLl9nZXRTdGFydERhdGV9LGdldEVuZERhdGU6e2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTp0aGlzLmJpbmRzLl9nZXRFbmREYXRlfX0pLHRoaXMucGlja2VyLm9mZihcInZpZXdcIix0aGlzLmJpbmRzLm9uVmlldyksdGhpcy5waWNrZXIub2ZmKFwiaW5wdXRcIix0aGlzLmJpbmRzLm9uSW5wdXQpLHRoaXMucGlja2VyLm9mZihcImNoYW5nZVwiLHRoaXMuYmluZHMub25DaGFuZ2UpLHRoaXMucGlja2VyLm9mZihcImNsaWNrXCIsdGhpcy5iaW5kcy5vbkNsaWNrKX1vblZpZXcodCl7Y29uc3R7dmlldzplLHRhcmdldDppfT10LmRldGFpbDtpZihcIk1haW5cIj09PWUpe3RoaXMucmFuZ2VQbHVnaW49dGhpcy5waWNrZXIuUGx1Z2luTWFuYWdlci5nZXRJbnN0YW5jZShcIlJhbmdlUGx1Z2luXCIpO2NvbnN0IHQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtpZih0LmNsYXNzTmFtZT1cInRpbWUtcGx1Z2luLWNvbnRhaW5lclwiLHRoaXMucmFuZ2VQbHVnaW4pe2NvbnN0IGU9dGhpcy5nZXRTdGFydElucHV0KCk7dC5hcHBlbmRDaGlsZChlKSx0aGlzLnBpY2tlci50cmlnZ2VyKFwidmlld1wiLHt2aWV3OlwiVGltZVBsdWdpbklucHV0XCIsdGFyZ2V0OmV9KTtjb25zdCBpPXRoaXMuZ2V0RW5kSW5wdXQoKTt0LmFwcGVuZENoaWxkKGkpLHRoaXMucGlja2VyLnRyaWdnZXIoXCJ2aWV3XCIse3ZpZXc6XCJUaW1lUGx1Z2luSW5wdXRcIix0YXJnZXQ6aX0pfWVsc2V7Y29uc3QgZT10aGlzLmdldFNpbmdsZUlucHV0KCk7dC5hcHBlbmRDaGlsZChlKSx0aGlzLnBpY2tlci50cmlnZ2VyKFwidmlld1wiLHt2aWV3OlwiVGltZVBsdWdpbklucHV0XCIsdGFyZ2V0OmV9KX1pLmFwcGVuZENoaWxkKHQpLHRoaXMucGlja2VyLnRyaWdnZXIoXCJ2aWV3XCIse3ZpZXc6XCJUaW1lUGx1Z2luQ29udGFpbmVyXCIsdGFyZ2V0OnR9KX19b25JbnB1dChlKXtjb25zdCBpPWUudGFyZ2V0O2lmKGkgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50JiZpLmNsYXNzTGlzdC5jb250YWlucyhcInRpbWUtcGx1Z2luLWlucHV0XCIpKXtjb25zdCBlPXRoaXMudGltZVBpY2tlZFtpLm5hbWVdfHxuZXcgdCxbbixzXT1pLnZhbHVlLnNwbGl0KFwiOlwiKTtlLnNldEhvdXJzKE51bWJlcihuKXx8MCxOdW1iZXIocyl8fDAsMCwwKSx0aGlzLnBpY2tlci5vcHRpb25zLmF1dG9BcHBseT8odGhpcy50aW1lUGlja2VkW2kubmFtZV09ZSx0aGlzLnBpY2tlci51cGRhdGVWYWx1ZXMoKSk6dGhpcy50aW1lUHJlUGlja2VkW2kubmFtZV09ZX19b25DaGFuZ2UoZSl7Y29uc3QgaT1lLnRhcmdldDtpZihpIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQmJmkuY2xhc3NMaXN0LmNvbnRhaW5zKFwidGltZS1wbHVnaW4tY3VzdG9tLWlucHV0XCIpKXtjb25zdCBlPS8oXFx3KylcXFsoXFx3KylcXF0vLFssbixzXT1pLm5hbWUubWF0Y2goZSksbz1OdW1iZXIoaS52YWx1ZSk7bGV0IGE9bmV3IHQ7c3dpdGNoKCF0aGlzLnBpY2tlci5vcHRpb25zLmF1dG9BcHBseSYmdGhpcy50aW1lUHJlUGlja2VkW25daW5zdGFuY2VvZiBEYXRlP2E9dGhpcy50aW1lUHJlUGlja2VkW25dLmNsb25lKCk6dGhpcy50aW1lUGlja2VkW25daW5zdGFuY2VvZiBEYXRlJiYoYT10aGlzLnRpbWVQaWNrZWRbbl0uY2xvbmUoKSkscyl7Y2FzZVwiSEhcIjppZih0aGlzLm9wdGlvbnMuZm9ybWF0MTIpe2NvbnN0IHQ9aS5jbG9zZXN0KFwiLnRpbWUtcGx1Z2luLWN1c3RvbS1ibG9ja1wiKS5xdWVyeVNlbGVjdG9yKGBzZWxlY3RbbmFtZT1cIiR7bn1bcGVyaW9kXVwiXWApLnZhbHVlLGU9dGhpcy5oYW5kbGVGb3JtYXQxMih0LGEsbyk7YS5zZXRIb3VycyhlLmdldEhvdXJzKCksZS5nZXRNaW51dGVzKCksZS5nZXRTZWNvbmRzKCksMCl9ZWxzZSBhLnNldEhvdXJzKG8sYS5nZXRNaW51dGVzKCksYS5nZXRTZWNvbmRzKCksMCk7YnJlYWs7Y2FzZVwibW1cIjphLnNldEhvdXJzKGEuZ2V0SG91cnMoKSxvLGEuZ2V0U2Vjb25kcygpLDApO2JyZWFrO2Nhc2VcInNzXCI6YS5zZXRIb3VycyhhLmdldEhvdXJzKCksYS5nZXRNaW51dGVzKCksbywwKTticmVhaztjYXNlXCJwZXJpb2RcIjppZih0aGlzLm9wdGlvbnMuZm9ybWF0MTIpe2NvbnN0IHQ9aS5jbG9zZXN0KFwiLnRpbWUtcGx1Z2luLWN1c3RvbS1ibG9ja1wiKS5xdWVyeVNlbGVjdG9yKGBzZWxlY3RbbmFtZT1cIiR7bn1bSEhdXCJdYCkudmFsdWUsZT10aGlzLmhhbmRsZUZvcm1hdDEyKGkudmFsdWUsYSxOdW1iZXIodCkpO2Euc2V0SG91cnMoZS5nZXRIb3VycygpLGUuZ2V0TWludXRlcygpLGUuZ2V0U2Vjb25kcygpLDApfX1pZih0aGlzLnBpY2tlci5vcHRpb25zLmF1dG9BcHBseSl0aGlzLnRpbWVQaWNrZWRbbl09YSx0aGlzLnBpY2tlci51cGRhdGVWYWx1ZXMoKTtlbHNle3RoaXMudGltZVByZVBpY2tlZFtuXT1hO2NvbnN0IHQ9dGhpcy5waWNrZXIudWkuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuYXBwbHktYnV0dG9uXCIpO2lmKHRoaXMucmFuZ2VQbHVnaW4pe2NvbnN0IGU9dGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLGk9dGhpcy5waWNrZXIuZGF0ZVBpY2tlZCxuPWUuc3RyaWN0JiYyPT09aS5sZW5ndGh8fCFlLnN0cmljdCYmaS5sZW5ndGg+MHx8IWkubGVuZ3RoJiZlLnN0cmljdCYmZS5zdGFydERhdGUgaW5zdGFuY2VvZiBEYXRlJiZlLmVuZERhdGUgaW5zdGFuY2VvZiBEYXRlfHwhaS5sZW5ndGgmJiFlLnN0cmljdCYmKGUuc3RhcnREYXRlIGluc3RhbmNlb2YgRGF0ZXx8ZS5lbmREYXRlIGluc3RhbmNlb2YgRGF0ZSk7dC5kaXNhYmxlZD0hbn1lbHNlIHRoaXMucGlja2VyLmRhdGVQaWNrZWQubGVuZ3RoJiYodC5kaXNhYmxlZD0hMSl9fX1vbkNsaWNrKHQpe2NvbnN0IGU9dC50YXJnZXQ7aWYoZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KXtjb25zdCB0PWUuY2xvc2VzdChcIi51bml0XCIpO2lmKCEodCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSlyZXR1cm47dGhpcy5waWNrZXIuaXNBcHBseUJ1dHRvbih0KSYmKE9iamVjdC5rZXlzKHRoaXMudGltZVBpY2tlZCkuZm9yRWFjaCgodD0+e3RoaXMudGltZVByZVBpY2tlZFt0XWluc3RhbmNlb2YgRGF0ZSYmKHRoaXMudGltZVBpY2tlZFt0XT10aGlzLnRpbWVQcmVQaWNrZWRbdF0uY2xvbmUoKSl9KSksdGhpcy5waWNrZXIudXBkYXRlVmFsdWVzKCksdGhpcy50aW1lUHJlUGlja2VkPXtpbnB1dDpudWxsLHN0YXJ0Om51bGwsZW5kOm51bGx9KSx0aGlzLnBpY2tlci5pc0NhbmNlbEJ1dHRvbih0KSYmKHRoaXMudGltZVByZVBpY2tlZD17aW5wdXQ6bnVsbCxzdGFydDpudWxsLGVuZDpudWxsfSx0aGlzLnBpY2tlci5yZW5kZXJBbGwoKSl9fXNldFRpbWUodCl7Y29uc3QgZT10aGlzLmhhbmRsZVRpbWVTdHJpbmcodCk7dGhpcy50aW1lUGlja2VkLmlucHV0PWUuY2xvbmUoKSx0aGlzLnBpY2tlci5yZW5kZXJBbGwoKSx0aGlzLnBpY2tlci51cGRhdGVWYWx1ZXMoKX1zZXRTdGFydFRpbWUodCl7Y29uc3QgZT10aGlzLmhhbmRsZVRpbWVTdHJpbmcodCk7dGhpcy50aW1lUGlja2VkLnN0YXJ0PWUuY2xvbmUoKSx0aGlzLnBpY2tlci5yZW5kZXJBbGwoKSx0aGlzLnBpY2tlci51cGRhdGVWYWx1ZXMoKX1zZXRFbmRUaW1lKHQpe2NvbnN0IGU9dGhpcy5oYW5kbGVUaW1lU3RyaW5nKHQpO3RoaXMudGltZVBpY2tlZC5lbmQ9ZS5jbG9uZSgpLHRoaXMucGlja2VyLnJlbmRlckFsbCgpLHRoaXMucGlja2VyLnVwZGF0ZVZhbHVlcygpfWhhbmRsZVRpbWVTdHJpbmcoZSl7Y29uc3QgaT1uZXcgdCxbbixzLG9dPWUuc3BsaXQoXCI6XCIpLm1hcCgodD0+TnVtYmVyKHQpKSksYT1uJiYhTnVtYmVyLmlzTmFOKG4pP246MCxyPXMmJiFOdW1iZXIuaXNOYU4ocyk/czowLGM9byYmIU51bWJlci5pc05hTihvKT9vOjA7cmV0dXJuIGkuc2V0SG91cnMoYSxyLGMsMCksaX1nZXREYXRlKCl7aWYodGhpcy5waWNrZXIub3B0aW9ucy5kYXRlIGluc3RhbmNlb2YgRGF0ZSl7Y29uc3QgZT1uZXcgdCh0aGlzLnBpY2tlci5vcHRpb25zLmRhdGUsdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQpO2lmKHRoaXMudGltZVBpY2tlZC5pbnB1dCBpbnN0YW5jZW9mIERhdGUpe2NvbnN0IHQ9dGhpcy50aW1lUGlja2VkLmlucHV0O2Uuc2V0SG91cnModC5nZXRIb3VycygpLHQuZ2V0TWludXRlcygpLHQuZ2V0U2Vjb25kcygpLDApfXJldHVybiBlfXJldHVybiBudWxsfWdldFN0YXJ0RGF0ZSgpe2lmKHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5zdGFydERhdGUgaW5zdGFuY2VvZiBEYXRlKXtjb25zdCBlPW5ldyB0KHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5zdGFydERhdGUsdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQpO2lmKHRoaXMudGltZVBpY2tlZC5zdGFydCBpbnN0YW5jZW9mIERhdGUpe2NvbnN0IHQ9dGhpcy50aW1lUGlja2VkLnN0YXJ0O2Uuc2V0SG91cnModC5nZXRIb3VycygpLHQuZ2V0TWludXRlcygpLHQuZ2V0U2Vjb25kcygpLDApfXJldHVybiBlfXJldHVybiBudWxsfWdldEVuZERhdGUoKXtpZih0aGlzLnJhbmdlUGx1Z2luLm9wdGlvbnMuZW5kRGF0ZSBpbnN0YW5jZW9mIERhdGUpe2NvbnN0IGU9bmV3IHQodGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLmVuZERhdGUsdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQpO2lmKHRoaXMudGltZVBpY2tlZC5lbmQgaW5zdGFuY2VvZiBEYXRlKXtjb25zdCB0PXRoaXMudGltZVBpY2tlZC5lbmQ7ZS5zZXRIb3Vycyh0LmdldEhvdXJzKCksdC5nZXRNaW51dGVzKCksdC5nZXRTZWNvbmRzKCksMCl9cmV0dXJuIGV9cmV0dXJuIG51bGx9Z2V0U2luZ2xlSW5wdXQoKXtyZXR1cm4gdGhpcy5vcHRpb25zLm5hdGl2ZT90aGlzLmdldE5hdGl2ZUlucHV0KFwiaW5wdXRcIik6dGhpcy5nZXRDdXN0b21JbnB1dChcImlucHV0XCIpfWdldFN0YXJ0SW5wdXQoKXtyZXR1cm4gdGhpcy5vcHRpb25zLm5hdGl2ZT90aGlzLmdldE5hdGl2ZUlucHV0KFwic3RhcnRcIik6dGhpcy5nZXRDdXN0b21JbnB1dChcInN0YXJ0XCIpfWdldEVuZElucHV0KCl7cmV0dXJuIHRoaXMub3B0aW9ucy5uYXRpdmU/dGhpcy5nZXROYXRpdmVJbnB1dChcImVuZFwiKTp0aGlzLmdldEN1c3RvbUlucHV0KFwiZW5kXCIpfWdldE5hdGl2ZUlucHV0KHQpe2NvbnN0IGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO2UudHlwZT1cInRpbWVcIixlLm5hbWU9dCxlLmNsYXNzTmFtZT1cInRpbWUtcGx1Z2luLWlucHV0IHVuaXRcIjtjb25zdCBpPXRoaXMudGltZVBpY2tlZFt0XTtpZihpKXtjb25zdCB0PWAwJHtpLmdldEhvdXJzKCl9YC5zbGljZSgtMiksbj1gMCR7aS5nZXRNaW51dGVzKCl9YC5zbGljZSgtMik7ZS52YWx1ZT1gJHt0fToke259YH1yZXR1cm4gZX1nZXRDdXN0b21JbnB1dCh0KXtjb25zdCBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7ZS5jbGFzc05hbWU9XCJ0aW1lLXBsdWdpbi1jdXN0b20tYmxvY2tcIjtjb25zdCBpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7aS5jbGFzc05hbWU9XCJ0aW1lLXBsdWdpbi1jdXN0b20taW5wdXQgdW5pdFwiLGkubmFtZT1gJHt0fVtISF1gO2NvbnN0IG49dGhpcy5vcHRpb25zLmZvcm1hdDEyPzE6MCxzPXRoaXMub3B0aW9ucy5mb3JtYXQxMj8xMzoyNDtsZXQgbz1udWxsOyF0aGlzLnBpY2tlci5vcHRpb25zLmF1dG9BcHBseSYmdGhpcy50aW1lUHJlUGlja2VkW3RdaW5zdGFuY2VvZiBEYXRlP289dGhpcy50aW1lUHJlUGlja2VkW3RdLmNsb25lKCk6dGhpcy50aW1lUGlja2VkW3RdaW5zdGFuY2VvZiBEYXRlJiYobz10aGlzLnRpbWVQaWNrZWRbdF0uY2xvbmUoKSk7Zm9yKGxldCB0PW47dDxzO3QrPXRoaXMub3B0aW9ucy5zdGVwSG91cnMpe2NvbnN0IGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtlLnZhbHVlPVN0cmluZyh0KSxlLnRleHQ9U3RyaW5nKHQpLG8mJih0aGlzLm9wdGlvbnMuZm9ybWF0MTI/KG8uZ2V0SG91cnMoKSUxMj9vLmdldEhvdXJzKCklMTI6MTIpPT09dCYmKGUuc2VsZWN0ZWQ9ITApOm8uZ2V0SG91cnMoKT09PXQmJihlLnNlbGVjdGVkPSEwKSksaS5hcHBlbmRDaGlsZChlKX1lLmFwcGVuZENoaWxkKGkpO2NvbnN0IGE9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTthLmNsYXNzTmFtZT1cInRpbWUtcGx1Z2luLWN1c3RvbS1pbnB1dCB1bml0XCIsYS5uYW1lPWAke3R9W21tXWA7Zm9yKGxldCB0PTA7dDw2MDt0Kz10aGlzLm9wdGlvbnMuc3RlcE1pbnV0ZXMpe2NvbnN0IGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtlLnZhbHVlPWAwJHtTdHJpbmcodCl9YC5zbGljZSgtMiksZS50ZXh0PWAwJHtTdHJpbmcodCl9YC5zbGljZSgtMiksbyYmby5nZXRNaW51dGVzKCk9PT10JiYoZS5zZWxlY3RlZD0hMCksYS5hcHBlbmRDaGlsZChlKX1pZihlLmFwcGVuZENoaWxkKGEpLHRoaXMub3B0aW9ucy5zZWNvbmRzKXtjb25zdCBpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7aS5jbGFzc05hbWU9XCJ0aW1lLXBsdWdpbi1jdXN0b20taW5wdXQgdW5pdFwiLGkubmFtZT1gJHt0fVtzc11gO2NvbnN0IG49NjA7Zm9yKGxldCB0PTA7dDxuO3QrPXRoaXMub3B0aW9ucy5zdGVwU2Vjb25kcyl7Y29uc3QgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO2UudmFsdWU9YDAke1N0cmluZyh0KX1gLnNsaWNlKC0yKSxlLnRleHQ9YDAke1N0cmluZyh0KX1gLnNsaWNlKC0yKSxvJiZvLmdldFNlY29uZHMoKT09PXQmJihlLnNlbGVjdGVkPSEwKSxpLmFwcGVuZENoaWxkKGUpfWUuYXBwZW5kQ2hpbGQoaSl9aWYodGhpcy5vcHRpb25zLmZvcm1hdDEyKXtjb25zdCBpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7aS5jbGFzc05hbWU9XCJ0aW1lLXBsdWdpbi1jdXN0b20taW5wdXQgdW5pdFwiLGkubmFtZT1gJHt0fVtwZXJpb2RdYCxbXCJBTVwiLFwiUE1cIl0uZm9yRWFjaCgodD0+e2NvbnN0IGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtlLnZhbHVlPXQsZS50ZXh0PXQsbyYmXCJQTVwiPT09dCYmby5nZXRIb3VycygpPj0xMiYmKGUuc2VsZWN0ZWQ9ITApLGkuYXBwZW5kQ2hpbGQoZSl9KSksZS5hcHBlbmRDaGlsZChpKX1yZXR1cm4gZX1oYW5kbGVGb3JtYXQxMih0LGUsaSl7Y29uc3Qgbj1lLmNsb25lKCk7c3dpdGNoKHQpe2Nhc2VcIkFNXCI6MTI9PT1pP24uc2V0SG91cnMoMCxuLmdldE1pbnV0ZXMoKSxuLmdldFNlY29uZHMoKSwwKTpuLnNldEhvdXJzKGksbi5nZXRNaW51dGVzKCksbi5nZXRTZWNvbmRzKCksMCk7YnJlYWs7Y2FzZVwiUE1cIjoxMiE9PWk/bi5zZXRIb3VycyhpKzEyLG4uZ2V0TWludXRlcygpLG4uZ2V0U2Vjb25kcygpLDApOm4uc2V0SG91cnMoaSxuLmdldE1pbnV0ZXMoKSxuLmdldFNlY29uZHMoKSwwKX1yZXR1cm4gbn1wYXJzZVZhbHVlcygpe2lmKHRoaXMucmFuZ2VQbHVnaW4pe2lmKHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5zdHJpY3Qpe2lmKHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5zdGFydERhdGUmJnRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5lbmREYXRlKXtjb25zdCBlPW5ldyB0KHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5zdGFydERhdGUsdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQpLGk9bmV3IHQodGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLmVuZERhdGUsdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQpO3RoaXMudGltZVBpY2tlZC5zdGFydD1lLmNsb25lKCksdGhpcy50aW1lUGlja2VkLmVuZD1pLmNsb25lKCl9fWVsc2V7aWYodGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLnN0YXJ0RGF0ZSl7Y29uc3QgZT1uZXcgdCh0aGlzLnJhbmdlUGx1Z2luLm9wdGlvbnMuc3RhcnREYXRlLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0KTt0aGlzLnRpbWVQaWNrZWQuc3RhcnQ9ZS5jbG9uZSgpfWlmKHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5lbmREYXRlKXtjb25zdCBlPW5ldyB0KHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5lbmREYXRlLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0KTt0aGlzLnRpbWVQaWNrZWQuZW5kPWUuY2xvbmUoKX19aWYodGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLmVsZW1lbnRFbmQpaWYodGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLnN0cmljdCl7aWYodGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCYmdGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50LnZhbHVlLmxlbmd0aCYmdGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLmVsZW1lbnRFbmQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50JiZ0aGlzLnJhbmdlUGx1Z2luLm9wdGlvbnMuZWxlbWVudEVuZC52YWx1ZS5sZW5ndGgpe2NvbnN0IGU9bmV3IHQodGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50LnZhbHVlLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0KSxpPW5ldyB0KHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5lbGVtZW50RW5kLnZhbHVlLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0KTt0aGlzLnRpbWVQaWNrZWQuc3RhcnQ9ZS5jbG9uZSgpLHRoaXMudGltZVBpY2tlZC5lbmQ9aS5jbG9uZSgpfX1lbHNle2lmKHRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQmJnRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudC52YWx1ZS5sZW5ndGgpe2NvbnN0IGU9bmV3IHQodGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50LnZhbHVlLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0KTt0aGlzLnRpbWVQaWNrZWQuc3RhcnQ9ZS5jbG9uZSgpfWlmKHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5lbGVtZW50RW5kIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCYmdGhpcy5yYW5nZVBsdWdpbi5vcHRpb25zLmVsZW1lbnRFbmQudmFsdWUubGVuZ3RoKXtjb25zdCBlPW5ldyB0KHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5lbGVtZW50RW5kLnZhbHVlLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0KTt0aGlzLnRpbWVQaWNrZWQuc3RhcnQ9ZS5jbG9uZSgpfX1lbHNlIGlmKHRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQmJnRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudC52YWx1ZS5sZW5ndGgpe2NvbnN0W2UsaV09dGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50LnZhbHVlLnNwbGl0KHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5kZWxpbWl0ZXIpO2lmKHRoaXMucmFuZ2VQbHVnaW4ub3B0aW9ucy5zdHJpY3Qpe2lmKGUmJmkpe2NvbnN0IG49bmV3IHQoZSx0aGlzLnBpY2tlci5vcHRpb25zLmZvcm1hdCkscz1uZXcgdChpLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0KTt0aGlzLnRpbWVQaWNrZWQuc3RhcnQ9bi5jbG9uZSgpLHRoaXMudGltZVBpY2tlZC5lbmQ9cy5jbG9uZSgpfX1lbHNle2lmKGUpe2NvbnN0IGk9bmV3IHQoZSx0aGlzLnBpY2tlci5vcHRpb25zLmZvcm1hdCk7dGhpcy50aW1lUGlja2VkLnN0YXJ0PWkuY2xvbmUoKX1pZihpKXtjb25zdCBlPW5ldyB0KGksdGhpcy5waWNrZXIub3B0aW9ucy5mb3JtYXQpO3RoaXMudGltZVBpY2tlZC5zdGFydD1lLmNsb25lKCl9fX19ZWxzZXtpZih0aGlzLnBpY2tlci5vcHRpb25zLmRhdGUpe2NvbnN0IGU9bmV3IHQodGhpcy5waWNrZXIub3B0aW9ucy5kYXRlLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0KTt0aGlzLnRpbWVQaWNrZWQuaW5wdXQ9ZS5jbG9uZSgpfWlmKHRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQmJnRoaXMucGlja2VyLm9wdGlvbnMuZWxlbWVudC52YWx1ZS5sZW5ndGgpe2NvbnN0IGU9bmV3IHQodGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50LnZhbHVlLHRoaXMucGlja2VyLm9wdGlvbnMuZm9ybWF0KTt0aGlzLnRpbWVQaWNrZWQuaW5wdXQ9ZS5jbG9uZSgpfX19fWNsYXNzIGggZXh0ZW5kcyBve2RvY0VsZW1lbnQ9bnVsbDtyYW5nZVBsdWdpbjtiaW5kcz17b25WaWV3OnRoaXMub25WaWV3LmJpbmQodGhpcyksb25LZXlkb3duOnRoaXMub25LZXlkb3duLmJpbmQodGhpcyl9O29wdGlvbnM9e3VuaXRJbmRleDoxLGRheUluZGV4OjJ9O2dldE5hbWUoKXtyZXR1cm5cIktiZFBsdWdpblwifW9uQXR0YWNoKCl7Y29uc3QgdD10aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQsZT10LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO2lmKHRoaXMuZG9jRWxlbWVudD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSx0aGlzLmRvY0VsZW1lbnQuc3R5bGUucG9zaXRpb249XCJhYnNvbHV0ZVwiLHRoaXMuZG9jRWxlbWVudC5zdHlsZS50b3A9YCR7dC5vZmZzZXRUb3B9cHhgLHRoaXMuZG9jRWxlbWVudC5zdHlsZS5sZWZ0PXQub2Zmc2V0TGVmdCtlLndpZHRoLTI1K1wicHhcIix0aGlzLmRvY0VsZW1lbnQuYXR0YWNoU2hhZG93KHttb2RlOlwib3BlblwifSksdGhpcy5vcHRpb25zLmh0bWwpdGhpcy5kb2NFbGVtZW50LnNoYWRvd1Jvb3QuaW5uZXJIVE1MPXRoaXMub3B0aW9ucy5odG1sO2Vsc2V7Y29uc3QgdD1gXFxuICAgICAgPHN0eWxlPlxcbiAgICAgIGJ1dHRvbiB7XFxuICAgICAgICBib3JkZXI6IG5vbmU7XFxuICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gICAgICAgIGZvbnQtc2l6ZTogJHt3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnQpLmZvbnRTaXplfTtcXG4gICAgICB9XFxuICAgICAgPC9zdHlsZT5cXG5cXG4gICAgICA8YnV0dG9uPiYjMTI4MTk3OzwvYnV0dG9uPlxcbiAgICAgIGA7dGhpcy5kb2NFbGVtZW50LnNoYWRvd1Jvb3QuaW5uZXJIVE1MPXR9Y29uc3QgaT10aGlzLmRvY0VsZW1lbnQuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uXCIpO2kmJihpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCh0PT57dC5wcmV2ZW50RGVmYXVsdCgpLHRoaXMucGlja2VyLnNob3coe3RhcmdldDp0aGlzLnBpY2tlci5vcHRpb25zLmVsZW1lbnR9KX0pLHtjYXB0dXJlOiEwfSksaS5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCh0PT57XCJFc2NhcGVcIj09PXQuY29kZSYmdGhpcy5waWNrZXIuaGlkZSgpfSkse2NhcHR1cmU6ITB9KSksdGhpcy5waWNrZXIub3B0aW9ucy5lbGVtZW50LmFmdGVyKHRoaXMuZG9jRWxlbWVudCksdGhpcy5waWNrZXIub24oXCJ2aWV3XCIsdGhpcy5iaW5kcy5vblZpZXcpLHRoaXMucGlja2VyLm9uKFwia2V5ZG93blwiLHRoaXMuYmluZHMub25LZXlkb3duKX1vbkRldGFjaCgpe3RoaXMuZG9jRWxlbWVudCYmdGhpcy5kb2NFbGVtZW50LmlzQ29ubmVjdGVkJiZ0aGlzLmRvY0VsZW1lbnQucmVtb3ZlKCksdGhpcy5waWNrZXIub2ZmKFwidmlld1wiLHRoaXMuYmluZHMub25WaWV3KSx0aGlzLnBpY2tlci5vZmYoXCJrZXlkb3duXCIsdGhpcy5iaW5kcy5vbktleWRvd24pfW9uVmlldyh0KXtjb25zdHt2aWV3OmUsdGFyZ2V0Oml9PXQuZGV0YWlsO2kmJlwicXVlcnlTZWxlY3RvclwiaW4gaSYmKFwiQ2FsZW5kYXJEYXlcIiE9PWV8fFtcImxvY2tlZFwiLFwibm90LWF2YWlsYWJsZVwiXS5zb21lKCh0PT5pLmNsYXNzTGlzdC5jb250YWlucyh0KSkpP1suLi5pLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudW5pdDpub3QoLmRheSlcIildLmZvckVhY2goKHQ9PnQudGFiSW5kZXg9dGhpcy5vcHRpb25zLnVuaXRJbmRleCkpOmkudGFiSW5kZXg9dGhpcy5vcHRpb25zLmRheUluZGV4KX1vbktleWRvd24odCl7c3dpdGNoKHRoaXMub25Nb3VzZUVudGVyKHQpLHQuY29kZSl7Y2FzZVwiQXJyb3dVcFwiOmNhc2VcIkFycm93RG93blwiOnRoaXMudmVydGljYWxNb3ZlKHQpO2JyZWFrO2Nhc2VcIkFycm93TGVmdFwiOmNhc2VcIkFycm93UmlnaHRcIjp0aGlzLmhvcml6b250YWxNb3ZlKHQpO2JyZWFrO2Nhc2VcIkVudGVyXCI6Y2FzZVwiU3BhY2VcIjp0aGlzLmhhbmRsZUVudGVyKHQpO2JyZWFrO2Nhc2VcIkVzY2FwZVwiOnRoaXMucGlja2VyLmhpZGUoKX19ZmluZEFsbG93YWJsZURheVNpYmxpbmcodCxlLGkpe2NvbnN0IG49QXJyYXkuZnJvbSh0LnF1ZXJ5U2VsZWN0b3JBbGwoYC5kYXlbdGFiaW5kZXg9XCIke3RoaXMub3B0aW9ucy5kYXlJbmRleH1cIl1gKSkscz1uLmluZGV4T2YoZSk7cmV0dXJuIG4uZmlsdGVyKCgodCxlKT0+aShlLHMpJiZ0LnRhYkluZGV4PT09dGhpcy5vcHRpb25zLmRheUluZGV4KSlbMF19Y2hhbmdlTW9udGgodCl7Y29uc3QgZT17QXJyb3dMZWZ0OlwicHJldmlvdXNcIixBcnJvd1JpZ2h0OlwibmV4dFwifSxpPXRoaXMucGlja2VyLnVpLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKGAuJHtlW3QuY29kZV19LWJ1dHRvblt0YWJpbmRleD1cIiR7dGhpcy5vcHRpb25zLnVuaXRJbmRleH1cIl1gKTtpJiYhaS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhgbm8tJHtlW3QuY29kZV19LW1vbnRoYCkmJihpLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiY2xpY2tcIix7YnViYmxlczohMH0pKSxzZXRUaW1lb3V0KCgoKT0+e2xldCBlPW51bGw7c3dpdGNoKHQuY29kZSl7Y2FzZVwiQXJyb3dMZWZ0XCI6Y29uc3QgdD10aGlzLnBpY2tlci51aS5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbChgLmRheVt0YWJpbmRleD1cIiR7dGhpcy5vcHRpb25zLmRheUluZGV4fVwiXWApO2U9dFt0Lmxlbmd0aC0xXTticmVhaztjYXNlXCJBcnJvd1JpZ2h0XCI6ZT10aGlzLnBpY2tlci51aS5jb250YWluZXIucXVlcnlTZWxlY3RvcihgLmRheVt0YWJpbmRleD1cIiR7dGhpcy5vcHRpb25zLmRheUluZGV4fVwiXWApfWUmJmUuZm9jdXMoKX0pKSl9dmVydGljYWxNb3ZlKHQpe2NvbnN0IGU9dC50YXJnZXQ7aWYoZS5jbGFzc0xpc3QuY29udGFpbnMoXCJkYXlcIikpe3QucHJldmVudERlZmF1bHQoKTtjb25zdCBpPXRoaXMuZmluZEFsbG93YWJsZURheVNpYmxpbmcodGhpcy5waWNrZXIudWkuY29udGFpbmVyLGUsKChlLGkpPT5lPT09KFwiQXJyb3dVcFwiPT09dC5jb2RlP2ktNzppKzcpKSk7aSYmaS5mb2N1cygpfX1ob3Jpem9udGFsTW92ZSh0KXtjb25zdCBlPXQudGFyZ2V0O2lmKGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGF5XCIpKXt0LnByZXZlbnREZWZhdWx0KCk7Y29uc3QgaT10aGlzLmZpbmRBbGxvd2FibGVEYXlTaWJsaW5nKHRoaXMucGlja2VyLnVpLmNvbnRhaW5lcixlLCgoZSxpKT0+ZT09PShcIkFycm93TGVmdFwiPT09dC5jb2RlP2ktMTppKzEpKSk7aT9pLmZvY3VzKCk6dGhpcy5jaGFuZ2VNb250aCh0KX19aGFuZGxlRW50ZXIodCl7Y29uc3QgZT10LnRhcmdldDtlLmNsYXNzTGlzdC5jb250YWlucyhcImRheVwiKSYmKHQucHJldmVudERlZmF1bHQoKSxlLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiY2xpY2tcIix7YnViYmxlczohMH0pKSxzZXRUaW1lb3V0KCgoKT0+e2lmKHRoaXMucmFuZ2VQbHVnaW49dGhpcy5waWNrZXIuUGx1Z2luTWFuYWdlci5nZXRJbnN0YW5jZShcIlJhbmdlUGx1Z2luXCIpLHRoaXMucmFuZ2VQbHVnaW58fCF0aGlzLnBpY2tlci5vcHRpb25zLmF1dG9BcHBseSl7Y29uc3QgdD10aGlzLnBpY2tlci51aS5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5kYXkuc2VsZWN0ZWRcIik7dCYmc2V0VGltZW91dCgoKCk9Pnt0LmZvY3VzKCl9KSl9fSkpKX1vbk1vdXNlRW50ZXIodCl7dC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGF5XCIpJiZzZXRUaW1lb3V0KCgoKT0+e2NvbnN0IHQ9dGhpcy5waWNrZXIudWkuc2hhZG93Um9vdC5hY3RpdmVFbGVtZW50O3QmJnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJtb3VzZWVudGVyXCIse2J1YmJsZXM6ITB9KSl9KSl9fWNsYXNzIGQgZXh0ZW5kcyBve3JhbmdlUGx1Z2luO2xvY2tQbHVnaW47cHJpb3JpdHk9MTA7YmluZHM9e29uVmlldzp0aGlzLm9uVmlldy5iaW5kKHRoaXMpLG9uQ29sb3JTY2hlbWU6dGhpcy5vbkNvbG9yU2NoZW1lLmJpbmQodGhpcyl9O29wdGlvbnM9e2Ryb3Bkb3duOnttb250aHM6ITEseWVhcnM6ITEsbWluWWVhcjoxOTUwLG1heFllYXI6bnVsbH0sZGFya01vZGU6ITAsbG9jYWxlOntyZXNldEJ1dHRvbjonPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgaGVpZ2h0PVwiMjRcIiB3aWR0aD1cIjI0XCI+PHBhdGggZD1cIk0xMyAzYy00Ljk3IDAtOSA0LjAzLTkgOUgxbDMuODkgMy44OS4wNy4xNEw5IDEySDZjMC0zLjg3IDMuMTMtNyA3LTdzNyAzLjEzIDcgNy0zLjEzIDctNyA3Yy0xLjkzIDAtMy42OC0uNzktNC45NC0yLjA2bC0xLjQyIDEuNDJDOC4yNyAxOS45OSAxMC41MSAyMSAxMyAyMWM0Ljk3IDAgOS00LjAzIDktOXMtNC4wMy05LTktOXptLTEgNXY1bDQuMjggMi41NC43Mi0xLjIxLTMuNS0yLjA4VjhIMTJ6XCIvPjwvc3ZnPid9fTttYXRjaE1lZGlhO2dldE5hbWUoKXtyZXR1cm5cIkFtcFBsdWdpblwifW9uQXR0YWNoKCl7dGhpcy5vcHRpb25zLmRhcmtNb2RlJiZ3aW5kb3cmJlwibWF0Y2hNZWRpYVwiaW4gd2luZG93JiYodGhpcy5tYXRjaE1lZGlhPXdpbmRvdy5tYXRjaE1lZGlhKFwiKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKVwiKSx0aGlzLm1hdGNoTWVkaWEubWF0Y2hlcyYmKHRoaXMucGlja2VyLnVpLmNvbnRhaW5lci5kYXRhc2V0LnRoZW1lPVwiZGFya1wiKSx0aGlzLm1hdGNoTWVkaWEuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLHRoaXMuYmluZHMub25Db2xvclNjaGVtZSkpLHRoaXMub3B0aW9ucy53ZWVrTnVtYmVycyYmdGhpcy5waWNrZXIudWkuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ3ZWVrLW51bWJlcnNcIiksdGhpcy5waWNrZXIub24oXCJ2aWV3XCIsdGhpcy5iaW5kcy5vblZpZXcpfW9uRGV0YWNoKCl7dGhpcy5vcHRpb25zLmRhcmtNb2RlJiZ3aW5kb3cmJlwibWF0Y2hNZWRpYVwiaW4gd2luZG93JiZ0aGlzLm1hdGNoTWVkaWEucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLHRoaXMuYmluZHMub25Db2xvclNjaGVtZSksdGhpcy5waWNrZXIudWkuY29udGFpbmVyLnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtdGhlbWVcIiksdGhpcy5waWNrZXIudWkuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJ3ZWVrLW51bWJlcnNcIiksdGhpcy5waWNrZXIub2ZmKFwidmlld1wiLHRoaXMuYmluZHMub25WaWV3KX1vblZpZXcodCl7dGhpcy5sb2NrUGx1Z2luPXRoaXMucGlja2VyLlBsdWdpbk1hbmFnZXIuZ2V0SW5zdGFuY2UoXCJMb2NrUGx1Z2luXCIpLHRoaXMucmFuZ2VQbHVnaW49dGhpcy5waWNrZXIuUGx1Z2luTWFuYWdlci5nZXRJbnN0YW5jZShcIlJhbmdlUGx1Z2luXCIpLHRoaXMuaGFuZGxlRHJvcGRvd24odCksdGhpcy5oYW5kbGVSZXNldEJ1dHRvbih0KSx0aGlzLmhhbmRsZVdlZWtOdW1iZXJzKHQpfW9uQ29sb3JTY2hlbWUodCl7Y29uc3QgZT10Lm1hdGNoZXM/XCJkYXJrXCI6XCJsaWdodFwiO3RoaXMucGlja2VyLnVpLmNvbnRhaW5lci5kYXRhc2V0LnRoZW1lPWV9aGFuZGxlRHJvcGRvd24oZSl7Y29uc3R7dmlldzppLHRhcmdldDpuLGRhdGU6cyxpbmRleDpvfT1lLmRldGFpbDtpZihcIkNhbGVuZGFySGVhZGVyXCI9PT1pKXtjb25zdCBlPW4ucXVlcnlTZWxlY3RvcihcIi5tb250aC1uYW1lXCIpO2lmKHRoaXMub3B0aW9ucy5kcm9wZG93bi5tb250aHMpe2UuY2hpbGROb2Rlc1swXS5yZW1vdmUoKTtjb25zdCBpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7aS5jbGFzc05hbWU9XCJtb250aC1uYW1lLS1zZWxlY3QgbW9udGgtbmFtZS0tZHJvcGRvd25cIjtmb3IobGV0IGU9MDtlPDEyO2UrPTEpe2NvbnN0IG49ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKSxvPW5ldyB0KG5ldyBEYXRlKHMuZ2V0RnVsbFllYXIoKSxlLDIsMCwwLDApKSxhPW5ldyB0KG5ldyBEYXRlKHMuZ2V0RnVsbFllYXIoKSxlLDEsMCwwLDApKTtuLnZhbHVlPVN0cmluZyhlKSxuLnRleHQ9by50b0xvY2FsZVN0cmluZyh0aGlzLnBpY2tlci5vcHRpb25zLmxhbmcse21vbnRoOlwibG9uZ1wifSksdGhpcy5sb2NrUGx1Z2luJiYobi5kaXNhYmxlZD10aGlzLmxvY2tQbHVnaW4ub3B0aW9ucy5taW5EYXRlJiZhLmlzQmVmb3JlKG5ldyB0KHRoaXMubG9ja1BsdWdpbi5vcHRpb25zLm1pbkRhdGUpLFwibW9udGhcIil8fHRoaXMubG9ja1BsdWdpbi5vcHRpb25zLm1heERhdGUmJmEuaXNBZnRlcihuZXcgdCh0aGlzLmxvY2tQbHVnaW4ub3B0aW9ucy5tYXhEYXRlKSxcIm1vbnRoXCIpKSxuLnNlbGVjdGVkPWEuZ2V0TW9udGgoKT09PXMuZ2V0TW9udGgoKSxpLmFwcGVuZENoaWxkKG4pfWkuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCh0PT57Y29uc3QgZT10LnRhcmdldDt0aGlzLnBpY2tlci5jYWxlbmRhcnNbMF0uc2V0RGF0ZSgxKSx0aGlzLnBpY2tlci5jYWxlbmRhcnNbMF0uc2V0TW9udGgoTnVtYmVyKGUudmFsdWUpKSx0aGlzLnBpY2tlci5yZW5kZXJBbGwoKX0pKSxlLnByZXBlbmQoaSl9aWYodGhpcy5vcHRpb25zLmRyb3Bkb3duLnllYXJzKXtlLmNoaWxkTm9kZXNbMV0ucmVtb3ZlKCk7Y29uc3QgaT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO2kuY2xhc3NOYW1lPVwibW9udGgtbmFtZS0tc2VsZWN0XCI7Y29uc3Qgbj10aGlzLm9wdGlvbnMuZHJvcGRvd24ubWluWWVhcixvPXRoaXMub3B0aW9ucy5kcm9wZG93bi5tYXhZZWFyP3RoaXMub3B0aW9ucy5kcm9wZG93bi5tYXhZZWFyOihuZXcgRGF0ZSkuZ2V0RnVsbFllYXIoKTtpZihzLmdldEZ1bGxZZWFyKCk+byl7Y29uc3QgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO3QudmFsdWU9U3RyaW5nKHMuZ2V0RnVsbFllYXIoKSksdC50ZXh0PVN0cmluZyhzLmdldEZ1bGxZZWFyKCkpLHQuc2VsZWN0ZWQ9ITAsdC5kaXNhYmxlZD0hMCxpLmFwcGVuZENoaWxkKHQpfWZvcihsZXQgZT1vO2U+PW47ZS09MSl7Y29uc3Qgbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpLG89bmV3IHQobmV3IERhdGUoZSwwLDEsMCwwLDApKTtuLnZhbHVlPVN0cmluZyhlKSxuLnRleHQ9U3RyaW5nKGUpLHRoaXMubG9ja1BsdWdpbiYmKG4uZGlzYWJsZWQ9dGhpcy5sb2NrUGx1Z2luLm9wdGlvbnMubWluRGF0ZSYmby5pc0JlZm9yZShuZXcgdCh0aGlzLmxvY2tQbHVnaW4ub3B0aW9ucy5taW5EYXRlKSxcInllYXJcIil8fHRoaXMubG9ja1BsdWdpbi5vcHRpb25zLm1heERhdGUmJm8uaXNBZnRlcihuZXcgdCh0aGlzLmxvY2tQbHVnaW4ub3B0aW9ucy5tYXhEYXRlKSxcInllYXJcIikpLG4uc2VsZWN0ZWQ9cy5nZXRGdWxsWWVhcigpPT09ZSxpLmFwcGVuZENoaWxkKG4pfWlmKHMuZ2V0RnVsbFllYXIoKTxuKXtjb25zdCB0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7dC52YWx1ZT1TdHJpbmcocy5nZXRGdWxsWWVhcigpKSx0LnRleHQ9U3RyaW5nKHMuZ2V0RnVsbFllYXIoKSksdC5zZWxlY3RlZD0hMCx0LmRpc2FibGVkPSEwLGkuYXBwZW5kQ2hpbGQodCl9aWYoXCJhc2NcIj09PXRoaXMub3B0aW9ucy5kcm9wZG93bi55ZWFycyl7Y29uc3QgdD1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChpLmNoaWxkTm9kZXMpLnJldmVyc2UoKTtpLmlubmVySFRNTD1cIlwiLHQuZm9yRWFjaCgodD0+e3QuaW5uZXJIVE1MPXQudmFsdWUsaS5hcHBlbmRDaGlsZCh0KX0pKX1pLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwodD0+e2NvbnN0IGU9dC50YXJnZXQ7dGhpcy5waWNrZXIuY2FsZW5kYXJzWzBdLnNldEZ1bGxZZWFyKE51bWJlcihlLnZhbHVlKSksdGhpcy5waWNrZXIucmVuZGVyQWxsKCl9KSksZS5hcHBlbmRDaGlsZChpKX19fWhhbmRsZVJlc2V0QnV0dG9uKHQpe2NvbnN0e3ZpZXc6ZSx0YXJnZXQ6aX09dC5kZXRhaWw7aWYoXCJDYWxlbmRhckhlYWRlclwiPT09ZSYmdGhpcy5vcHRpb25zLnJlc2V0QnV0dG9uKXtjb25zdCB0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7dC5jbGFzc05hbWU9XCJyZXNldC1idXR0b24gdW5pdFwiLHQuaW5uZXJIVE1MPXRoaXMub3B0aW9ucy5sb2NhbGUucmVzZXRCdXR0b24sdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwodD0+e3QucHJldmVudERlZmF1bHQoKTtsZXQgZT0hMDtcImZ1bmN0aW9uXCI9PXR5cGVvZiB0aGlzLm9wdGlvbnMucmVzZXRCdXR0b24mJihlPXRoaXMub3B0aW9ucy5yZXNldEJ1dHRvbi5jYWxsKHRoaXMpKSxlJiZ0aGlzLnBpY2tlci5jbGVhcigpfSkpLGkuYXBwZW5kQ2hpbGQodCl9fWhhbmRsZVdlZWtOdW1iZXJzKGUpe2lmKHRoaXMub3B0aW9ucy53ZWVrTnVtYmVycyl7Y29uc3R7dmlldzppLHRhcmdldDpufT1lLmRldGFpbDtpZihcIkNhbGVuZGFyRGF5TmFtZXNcIj09PWkpe2NvbnN0IHQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTt0LmNsYXNzTmFtZT1cIndudW0taGVhZGVyXCIsdC5pbm5lckhUTUw9XCJXa1wiLG4ucHJlcGVuZCh0KX1cIkNhbGVuZGFyRGF5c1wiPT09aSYmWy4uLm4uY2hpbGRyZW5dLmZvckVhY2goKChlLGkpPT57aWYoMD09PWl8fGklNz09MCl7bGV0IGk7aWYoZS5jbGFzc0xpc3QuY29udGFpbnMoXCJkYXlcIikpaT1uZXcgdChlLmRhdGFzZXQudGltZSk7ZWxzZXtjb25zdCBlPW4ucXVlcnlTZWxlY3RvcihcIi5kYXlcIik7aT1uZXcgdChlLmRhdGFzZXQudGltZSl9bGV0IHM9aS5nZXRXZWVrKHRoaXMucGlja2VyLm9wdGlvbnMuZmlyc3REYXkpOzUzPT09cyYmMD09PWkuZ2V0TW9udGgoKSYmKHM9XCI1My8xXCIpO2NvbnN0IG89ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtvLmNsYXNzTmFtZT1cIndudW0taXRlbVwiLG8uaW5uZXJIVE1MPVN0cmluZyhzKSxuLmluc2VydEJlZm9yZShvLGUpfX0pKX19fWV4cG9ydHtkIGFzIEFtcFBsdWdpbix0IGFzIERhdGVUaW1lLGggYXMgS2JkUGx1Z2luLGEgYXMgTG9ja1BsdWdpbixyIGFzIFByZXNldFBsdWdpbixjIGFzIFJhbmdlUGx1Z2luLGwgYXMgVGltZVBsdWdpbixuIGFzIGNyZWF0ZSxzIGFzIGVhc2VwaWNrfTtcbiIsImltcG9ydCB7IGVhc2VwaWNrIH0gZnJvbSAnQGVhc2VwaWNrL2J1bmRsZSc7XG5cbmludGVyZmFjZSBJQ2FydCB7XG4gIGlkOiBudW1iZXI7XG4gIHByb2R1Y3Q6IElQcm9kdWN0O1xuICBxdWFudGl0eTogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgSVByb2R1Y3Qge1xuICBpZDogbnVtYmVyO1xuICBTS1U6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICByZXRhaWxfcHJpY2U6IG51bWJlcjtcbiAgaW1hZ2U6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIElDYXJ0SXRlbSB7XG4gIGlkOiBudW1iZXI7XG4gIHByb2R1Y3RfaWQ6IG51bWJlcjtcbiAgcXVhbnRpdHk6IG51bWJlcjtcbiAgZ3JvdXA6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIElFdmVudENhcnQge1xuICBjYXJ0SWQ6IG51bWJlcjtcbiAgZXJyb3I/OiBzdHJpbmc7XG4gIHN0YXR1czogYm9vbGVhbjtcbn1cblxuLy9nbG9iYWwgdmFyaWFibGVzIGZvciBkYXRlcGlja2VyXG5jb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG5jb25zdCBmaXZlRGF5cyA9IDUgKiAyNCAqIDYwICogNjAgKiAxMDAwO1xuXG4vLyAtLWdldCBjYXJ0IGl0ZW1zIGZyb20gaGlkZGVuIGlucHV0IGZvciBkYXRlcGlja2VyLS1cbmNvbnN0IGNhcnRFdmVudHNIaWRkZW5JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJ0cy1ldmVudHMtaGlkZGVuLWlucHV0JykgYXMgSFRNTElucHV0RWxlbWVudDtcbmNvbnN0IGNhcnRzID0gSlNPTi5wYXJzZShjYXJ0RXZlbnRzSGlkZGVuSW5wdXQudmFsdWUpIGFzIElDYXJ0SXRlbVtdO1xuXG4vLyB2YXJpYWJsZSB0byBzZXQgZGVmYXVsdCBpbWFnZSB0byBicmFuZCBkeW5hbWljYWxseSBpbiBtb2RhbCB3aW5kb3cuIENhbiB3ZSBnZXQgbGluayBmcm9tIHRoZSBpbnRlcm5ldD9cbmNvbnN0IGRlZmF1bHRJbWFnZSA9XG4gICdodHRwczovL2Z1bmtvLmNvbS9vbi9kZW1hbmR3YXJlLnN0YXRpYy8tL1NpdGVzLWZ1bmtvLW1hc3Rlci1jYXRhbG9nL2RlZmF1bHQvZHdiYjM4YTExMS9pbWFnZXMvZnVua28vdXBsb2FkLzU1OTk4X0NvY2FDb2xhX1MyX1Nwcml0ZUJvdHRsZUNhcF9QT1BfR0xBTS1XRUIucG5nJztcblxuLy8gLS1jb3VudCB0b3RhbCBxdWFudGl0eSBhbmQgcHJpY2UtLVxuY29uc3QgdG90YWxQcmljZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FydC10b3RhbC1wcmljZScpO1xuY29uc3QgdG90YWxRdWFudGl0eUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FydC10b3RhbC1xdWFudGl0eScpO1xuY29uc3QgdGFibGVDYXJ0SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGUtY2FydC1pdGVtJyk7XG5jb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FydC1zaGlwLXJlcXVlc3Qtc3VibWl0LWJ0bicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuXG5sZXQgdG90YWxQcmljZSA9IDA7XG5sZXQgdG90YWxRdWFudGl0eSA9IDA7XG5sZXQgaGFzRXZlbnRHcm91cCA9IGZhbHNlO1xuXG4vLyBjaGVjayBpZiBjYXJ0IGhhcyBldmVudCBncm91cFxudGFibGVDYXJ0SXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICBjb25zb2xlLmxvZygnaXRlbScsIGl0ZW0pO1xuICBjb25zdCBncm91cCA9IGl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldC1ncm91cCcpO1xuICBpZiAoZ3JvdXAgPT09ICdFdmVudHMnKSB7XG4gICAgaGFzRXZlbnRHcm91cCA9IHRydWU7XG4gIH1cblxuICBjb25zdCBwcmljZUVsZW1lbnQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5jYXJ0LWl0ZW0tcmV0YWlsX3ByaWNlJyk7XG4gIGNvbnN0IHF1YW50aXR5RWxlbWVudDogSFRNTElucHV0RWxlbWVudCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmNhcnQtaXRlbS1xdWFudGl0eScpO1xuICBjb25zdCBhdmFpbGFibGVQcm9kdWN0UXVhbnRpdHkgPSBxdWFudGl0eUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldC1hdmFpbGFibGUtcXVhbnRpdHknKTtcblxuICBjb25zdCBwcmljZSA9IHBhcnNlRmxvYXQocHJpY2VFbGVtZW50LnRleHRDb250ZW50KTtcbiAgY29uc3QgcXVhbnRpdHkgPSBwYXJzZUludChxdWFudGl0eUVsZW1lbnQudmFsdWUpO1xuXG4gIGNvbnN0IHRvdGFsUHJpY2VPbmVFbGVtZW50ID0gcHJpY2UgKiBxdWFudGl0eTtcbiAgdG90YWxQcmljZSArPSB0b3RhbFByaWNlT25lRWxlbWVudDtcbiAgdG90YWxRdWFudGl0eSArPSBxdWFudGl0eTtcbiAgcXVhbnRpdHlFbGVtZW50Lm1heCA9IGF2YWlsYWJsZVByb2R1Y3RRdWFudGl0eTtcbn0pO1xuXG50b3RhbFByaWNlRWxlbWVudC50ZXh0Q29udGVudCA9IGAkJHt0b3RhbFByaWNlLnRvRml4ZWQoMil9YDtcbnRvdGFsUXVhbnRpdHlFbGVtZW50LnRleHRDb250ZW50ID0gdG90YWxRdWFudGl0eS50b1N0cmluZygpO1xuXG4vLyBhZGQgZXZlbnQgZGF0ZSByYW5nZSwgZGlzYWJsZSBzdWJtaXQgYnV0dG9uIGlmIGNhcnQgaGFzIGV2ZW50IGdyb3VwXG5pZiAoaGFzRXZlbnRHcm91cCkge1xuICBjb25zdCBldmVudENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJ0LWV2ZW50LWNvbnRhaW5lcicpIGFzIEhUTUxEaXZFbGVtZW50O1xuICBldmVudENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgZXZlbnRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZmxleCcpO1xufSBlbHNlIHtcbiAgc3VibWl0QnRuLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbn1cblxuLy8gLS1hZGQgZGVsaXZlcnkgZm9ybSB3aGVuIGNyZWF0ZSBzaGlwIHJlcXVlc3QtLVxuY29uc3QgZGVsaXZlclRvU3RvcmVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FydC1kZWxpdmVyLXRvLXN0b3JlLWJ0bicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuY29uc3QgY3JlYXRlU3RvcmVSZXF1ZXN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcnQtY3JlYXRlLXN0b3JlLXJlcXVlc3QtY29udGFpbmVyJykgYXMgSFRNTERpdkVsZW1lbnQ7XG5cbmRlbGl2ZXJUb1N0b3JlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBjcmVhdGVTdG9yZVJlcXVlc3RDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG59KTtcblxuLy8gLS1kZWxldGUgY2FydCBpdGVtLS1cbmNvbnN0IGRlbGV0ZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGVsZXRlLWNhcnQtaXRlbS1idG4nKTtcblxuZGVsZXRlQnV0dG9ucy5mb3JFYWNoKChlKSA9PiB7XG4gIGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgaWYgKGNvbmZpcm0oJ0FyZSBzdXJlPycpKSB7XG4gICAgICBsZXQgaWQgPSBlLmdldEF0dHJpYnV0ZSgnZGF0YS1jYXJ0LWl0ZW0taWQnKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9jYXJ0L2RlbGV0ZS8ke2lkfWAsIHtcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgIH0pO1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn0pO1xuXG4vLyAtLXNob3cvaGlkZSBmYXZvcml0ZSBzdG9yZSBpbiBkcm9wZG93bi0tXG5jb25zdCBmYXZvcml0ZUNoZWNrYm94OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcnQtZmF2b3JpdGUtc3RvcmUtY2hlY2tib3gnKTtcbmNvbnN0IHN0b3JlU2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJ0LXN0b3JlLXNlbGVjdCcpO1xuY29uc3Qgb3B0aW9uc1N0b3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcnQtc3RvcmUtb3B0aW9uJyk7XG5mYXZvcml0ZUNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgY29uc3Qgc2hvd0Zhdm9yaXRlU3RvcmUgPSBmYXZvcml0ZUNoZWNrYm94LmNoZWNrZWQ7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRpb25zU3RvcmUubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBpc0Zhdm9yaXRlID0gb3B0aW9uc1N0b3JlW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtZmF2b3JpdGUnKTtcblxuICAgIGlmIChzaG93RmF2b3JpdGVTdG9yZSAmJiBpc0Zhdm9yaXRlICE9PSAnVHJ1ZScpIHtcbiAgICAgIChvcHRpb25zU3RvcmVbaV0gYXMgSFRNTE9wdGlvbkVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIChvcHRpb25zU3RvcmVbaV0gYXMgSFRNTE9wdGlvbkVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH1cbiAgfVxufSk7XG5cbmNvbnN0IHN0b3JlQ2F0ZWdvcnlTZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcnQtc3RvcmUtcmVxdWVzdC1jYXRlZ29yeS1zZWxlY3QnKTtcbmNvbnN0IG9wdGlvbnMgPSBzdG9yZUNhdGVnb3J5U2VsZWN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ29wdGlvbicpO1xuXG5zdG9yZUNhdGVnb3J5U2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgb3B0aW9ucy5mb3JFYWNoKChlKSA9PiB7XG4gICAgaWYgKGUudGV4dENvbnRlbnQgPT09IHN0b3JlQ2F0ZWdvcnlTZWxlY3Qub3B0aW9uc1tzdG9yZUNhdGVnb3J5U2VsZWN0LnNlbGVjdGVkSW5kZXhdLnRleHQpIHtcbiAgICAgIGNvbnN0IHN0b3JlU2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcnQtc3RvcmUtc2VsZWN0Jyk7XG4gICAgICBjb25zdCBvcHRpb25DYXRlZ29yeSA9IEpTT04ucGFyc2UoZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0LXN0b3JlLWNhdGVnb3J5LXN0b3JlJykpO1xuXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FydC1zdG9yZS1zZWxlY3QnKS5pbm5lckhUTUwgPSAnJztcbiAgICAgIGlmIChvcHRpb25DYXRlZ29yeSkge1xuICAgICAgICBvcHRpb25DYXRlZ29yeS5zdG9yZV9jYXRlZ29yeV9zdG9yZS5mb3JFYWNoKChlOiB7IHN0b3JlX2lkOiBudW1iZXI7IHN0b3JlX25hbWU6IHN0cmluZyB9KSA9PiB7XG4gICAgICAgICAgY29uc3Qgc3RvcmVTZWxlY3RPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnZS5pZCcsIGUuc3RvcmVfaWQpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdzdG9yZVNlbGVjdCcsIHN0b3JlU2VsZWN0KTtcblxuICAgICAgICAgIHN0b3JlU2VsZWN0T3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBlLnN0b3JlX2lkLnRvU3RyaW5nKCkpO1xuICAgICAgICAgIHN0b3JlU2VsZWN0T3B0aW9uLnRleHRDb250ZW50ID0gZS5zdG9yZV9uYW1lO1xuICAgICAgICAgIHN0b3JlU2VsZWN0LmFwcGVuZENoaWxkKHN0b3JlU2VsZWN0T3B0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn0pO1xuXG4vLyAtLWRpc3BsYXkgb25seSBzYWxlcyByZXAgbG9ja2VyLS1cbmNvbnN0IHNhbGVzUmVwTG9ja2VyQ2hlY2tib3g6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FydC1zYWxlcy1yZXAtbG9ja2VyLWNoZWNrYm94Jyk7XG5pZiAoc2FsZXNSZXBMb2NrZXJDaGVja2JveCkge1xuICBzYWxlc1JlcExvY2tlckNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICBjb25zdCBmYXZvcml0ZVN0b3JlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcnQtc3RvcmUtY29udGFpbmVyJyk7XG4gICAgY29uc3QgbG9ja2VyU3RvcmVDYXRlZ29yeUlkcyA9IEpTT04ucGFyc2UoXG4gICAgICBzYWxlc1JlcExvY2tlckNoZWNrYm94LmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtbG9ja2VyLXN0b3JlLWNhdGVnb3J5LWlkcycpXG4gICAgKTtcblxuICAgIGNvbnN0IG9sZFN0b3JlQ2F0ZWdvcnlPcHRpb25zID0gc3RvcmVDYXRlZ29yeVNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKCdvcHRpb24nKTtcbiAgICBjb25zdCBvbGRTdG9yZU9wdGlvbnMgPSBzdG9yZVNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKCdvcHRpb24nKTtcblxuICAgIGlmIChzYWxlc1JlcExvY2tlckNoZWNrYm94LmNoZWNrZWQpIHtcbiAgICAgIGNvbnN0IG5ld1N0b3JlQ2F0ZWdvcnlPcHRpb24gPSBuZXcgT3B0aW9uKCdMb2NrZXInLCBsb2NrZXJTdG9yZUNhdGVnb3J5SWRzWzFdLCB0cnVlLCB0cnVlKTtcbiAgICAgIGNvbnN0IG5ld1N0b3JlT3B0aW9uID0gbmV3IE9wdGlvbignIExvY2tlciBTdG9yZScsIGxvY2tlclN0b3JlQ2F0ZWdvcnlJZHNbMF0sIHRydWUsIHRydWUpO1xuICAgICAgZmF2b3JpdGVTdG9yZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUnKTtcbiAgICAgIG9sZFN0b3JlQ2F0ZWdvcnlPcHRpb25zLmZvckVhY2goKGUpID0+IHtcbiAgICAgICAgZS5kaXNhYmxlZCA9IHRydWU7XG4gICAgICB9KTtcbiAgICAgIHN0b3JlU2VsZWN0LmFwcGVuZENoaWxkKG5ld1N0b3JlT3B0aW9uKTtcbiAgICAgIHN0b3JlU2VsZWN0LnZhbHVlID0gbG9ja2VyU3RvcmVDYXRlZ29yeUlkc1swXS50b1N0cmluZygpO1xuICAgICAgc3RvcmVDYXRlZ29yeVNlbGVjdC5hcHBlbmRDaGlsZChuZXdTdG9yZUNhdGVnb3J5T3B0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmF2b3JpdGVTdG9yZUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcbiAgICAgIHN0b3JlU2VsZWN0LnJlbW92ZUNoaWxkKG9sZFN0b3JlT3B0aW9uc1tvbGRTdG9yZU9wdGlvbnMubGVuZ3RoIC0gMV0pO1xuICAgICAgc3RvcmVDYXRlZ29yeVNlbGVjdC5yZW1vdmVDaGlsZChvbGRTdG9yZUNhdGVnb3J5T3B0aW9uc1tvbGRTdG9yZUNhdGVnb3J5T3B0aW9ucy5sZW5ndGggLSAxXSk7XG4gICAgICBvbGRTdG9yZUNhdGVnb3J5T3B0aW9ucy5mb3JFYWNoKChlLCBpKSA9PiB7XG4gICAgICAgIGlmIChpICE9PSAwKSB7XG4gICAgICAgICAgZS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHN0b3JlU2VsZWN0LnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgc3RvcmVDYXRlZ29yeVNlbGVjdC5zZWxlY3RlZEluZGV4ID0gMDtcbiAgICB9XG4gIH0pO1xufVxuXG5jb25zdCBldmVudEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FydC1pdGVtLWV2ZW50LWJ1dHRvbicpO1xuZXZlbnRCdXR0b25zLmZvckVhY2goKGJ0bikgPT4ge1xuICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3QgY2FydCA9IEpTT04ucGFyc2UoYnRuLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtY2FydCcpKSBhcyBJQ2FydDtcbiAgICBjb25zb2xlLmxvZygnY2FydCcsIGNhcnQpO1xuXG4gICAgbGV0IGRpdjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ldmVudC1uYW1lJyk7XG4gICAgZGl2LmlubmVySFRNTCA9IGNhcnQucHJvZHVjdC5uYW1lO1xuICAgIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWV2ZW50LVNLVScpO1xuICAgIGRpdi5pbm5lckhUTUwgPSBjYXJ0LnByb2R1Y3QuU0tVO1xuICAgIGNvbnN0IGltZzogSFRNTEltYWdlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWV2ZW50LWltYWdlJyk7XG4gICAgY2FydC5wcm9kdWN0LmltYWdlLmxlbmd0aCA+IDEwMFxuICAgICAgPyAoaW1nLnNyYyA9IGBkYXRhOmltYWdlL3BuZztiYXNlNjQsICR7Y2FydC5wcm9kdWN0LmltYWdlfWApXG4gICAgICA6IChpbWcuc3JjID0gZGVmYXVsdEltYWdlKTtcbiAgICBsZXQgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ldmVudC1xdWFudGl0eScpO1xuICAgIGlucHV0LnZhbHVlID0gY2FydC5xdWFudGl0eS50b1N0cmluZygpO1xuICAgIGlucHV0Lm1pbiA9ICcxJztcbiAgICBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWV2ZW50LWNhcnQtaWQtaGlkZGVuJyk7XG4gICAgaW5wdXQudmFsdWUgPSBjYXJ0LmlkLnRvU3RyaW5nKCk7XG4gICAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1ldmVudC1wcm9kdWN0LWlkJyk7XG4gICAgaW5wdXQudmFsdWUgPSBjYXJ0LnByb2R1Y3QuaWQudG9TdHJpbmcoKTtcbiAgfSk7XG59KTtcblxuY29uc3QgeyBEYXRlVGltZSB9ID0gZWFzZXBpY2s7XG5mdW5jdGlvbiBmb3JtYXREYXRlKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICBjb25zdCBtb250aCA9IChkYXRlLmdldE1vbnRoKCkgKyAxKS50b1N0cmluZygpO1xuICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKS50b1N0cmluZygpO1xuICByZXR1cm4gYCR7eWVhcn0tJHttb250aH0tJHtkYXl9YDtcbn1cblxuZnVuY3Rpb24gZ2V0Rmlyc3RBbmRMYXN0RGF0ZSgpIHtcbiAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCBmaWZ0aERheUJlZm9yZSA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgZmlmdGhEYXlCZWZvcmUuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSA1KTtcbiAgY29uc3QgZmlmdGhEYXlBZnRlciA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgZmlmdGhEYXlBZnRlci5zZXREYXRlKHRvZGF5LmdldERhdGUoKSArIDYpO1xuICByZXR1cm4gW2Zvcm1hdERhdGUoZmlmdGhEYXlCZWZvcmUpLCBmb3JtYXREYXRlKGZpZnRoRGF5QWZ0ZXIpXTtcbn1cblxuY29uc3QgYm9va2VkRGF0ZXMgPSBbZ2V0Rmlyc3RBbmRMYXN0RGF0ZSgpXS5tYXAoKGQpID0+IHtcbiAgaWYgKGQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUoZFswXSk7XG4gICAgY29uc3QgZW5kID0gbmV3IERhdGUoZFsxXSk7XG4gICAgcmV0dXJuIFtzdGFydCwgZW5kXTtcbiAgfVxuICByZXR1cm4gbmV3IERhdGVUaW1lKGQsICdZWVlZLU1NLUREJyk7XG59KTtcblxuY29uc3QgcGlja2VyID0gbmV3IGVhc2VwaWNrLmNyZWF0ZSh7XG4gIGVsZW1lbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRlcGlja2VyJyksXG4gIGNzczogW1xuICAgICdodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL0BlYXNlcGljay9idW5kbGVAMS4yLjEvZGlzdC9pbmRleC5jc3MnLFxuICAgICdodHRwczovL2Vhc2VwaWNrLmNvbS9jc3MvZGVtb19ob3RlbGNhbC5jc3MnLFxuICBdLFxuICBwbHVnaW5zOiBbJ1JhbmdlUGx1Z2luJywgJ0xvY2tQbHVnaW4nXSxcbiAgUmFuZ2VQbHVnaW46IHtcbiAgICB0b29sdGlwTnVtYmVyKG51bTogYW55KSB7XG4gICAgICByZXR1cm4gbnVtIC0gMTtcbiAgICB9LFxuICB9LFxuICBMb2NrUGx1Z2luOiB7XG4gICAgbWluRGF0ZTogbmV3IERhdGUoKSxcbiAgICBtaW5EYXlzOiAxLFxuICAgIGluc2VwYXJhYmxlOiB0cnVlLFxuICAgIGZpbHRlcihkYXRlOiBhbnkpIHtcbiAgICAgIGlmIChkYXRlIC0gK2N1cnJlbnREYXRlID4gZml2ZURheXMpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSxcbiAgfSxcbiAgekluZGV4OiA0LFxuICBzZXR1cChwaWNrZXI6IGFueSkge1xuICAgIHBpY2tlci5vbignc2VsZWN0JywgYXN5bmMgKGV2dDogYW55KSA9PiB7XG4gICAgICBjb25zdCB7IHZpZXcsIGRhdGUsIHRhcmdldCB9ID0gZXZ0LmRldGFpbDtcbiAgICAgIGNvbnN0IHN0YXJ0RGF0ZSA9XG4gICAgICAgIGV2dC5kZXRhaWwuc3RhcnQuZ2V0RnVsbFllYXIoKSArICdfJyArIChldnQuZGV0YWlsLnN0YXJ0LmdldE1vbnRoKCkgKyAxKSArICdfJyArIGV2dC5kZXRhaWwuc3RhcnQuZ2V0RGF0ZSgpO1xuICAgICAgY29uc3QgZW5kRGF0ZSA9XG4gICAgICAgIGV2dC5kZXRhaWwuZW5kLmdldEZ1bGxZZWFyKCkgKyAnXycgKyAoZXZ0LmRldGFpbC5lbmQuZ2V0TW9udGgoKSArIDEpICsgJ18nICsgZXZ0LmRldGFpbC5lbmQuZ2V0RGF0ZSgpO1xuXG4gICAgICBjb25zdCBhdmFpbGFibGVFdmVudFF1YW50aXR5ID0gYXdhaXQgZ2V0RXZlbnRBdmFpbGFibGVRdWFudGl0eUJ5RGF0ZShjYXJ0cywgc3RhcnREYXRlLCBlbmREYXRlKTtcblxuICAgICAgaWYgKGF2YWlsYWJsZUV2ZW50UXVhbnRpdHkubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZXMgPSBhdmFpbGFibGVFdmVudFF1YW50aXR5Lm1hcCgoZSkgPT4gZS5lcnJvcik7XG4gICAgICAgIGFsZXJ0KCdNYXhpbXVtIHF1YW50aXR5IGV4Y2VlZGVkIScgKyAnXFxuJyArIGVycm9yTWVzc2FnZXMuam9pbignXFxuJykpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdWJtaXRCdG4ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxufSk7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEV2ZW50QXZhaWxhYmxlUXVhbnRpdHlCeURhdGUoY2FydHM6IElDYXJ0SXRlbVtdLCBkYXRlRnJvbTogc3RyaW5nLCBkYXRlVG86IHN0cmluZykge1xuICBjb25zdCB1bmlxQ2FydHMgPSBjYXJ0cy5yZWR1Y2UoKGFjY0NhcnRJdGVtLCBjYXJ0KSA9PiB7XG4gICAgY29uc3QgZm91bmRlZENhcnQgPSBhY2NDYXJ0SXRlbS5maW5kKFxuICAgICAgKGNhcnRJdGVtKSA9PiBjYXJ0SXRlbS5wcm9kdWN0X2lkID09PSBjYXJ0LnByb2R1Y3RfaWQgJiYgY2FydEl0ZW0uZ3JvdXAgPT09IGNhcnQuZ3JvdXBcbiAgICApO1xuICAgIGlmIChmb3VuZGVkQ2FydCkge1xuICAgICAgZm91bmRlZENhcnQucXVhbnRpdHkgKz0gY2FydC5xdWFudGl0eTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWNjQ2FydEl0ZW0ucHVzaChjYXJ0KTtcbiAgICB9XG4gICAgcmV0dXJuIGFjY0NhcnRJdGVtO1xuICB9LCBbXSBhcyBJQ2FydEl0ZW1bXSk7XG5cbiAgY29uc3QgZmV0Y2hQcm9taXNlcyA9IHVuaXFDYXJ0cy5tYXAoYXN5bmMgKGNhcnQpID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgYC9ldmVudC9nZXRfYXZhaWxhYmxlX3F1YW50aXR5X2J5X2RhdGU/ZGF0ZV9mcm9tPSR7ZGF0ZUZyb219JmRhdGVfdG89JHtkYXRlVG99Jmdyb3VwX25hbWU9JHtjYXJ0Lmdyb3VwfSZwcm9kdWN0X2lkPSR7Y2FydC5wcm9kdWN0X2lkfSZxdWFudGl0eT0ke2NhcnQucXVhbnRpdHl9YFxuICAgICk7XG5cbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIGNhcnRJZDogY2FydC5pZCxcbiAgICAgICAgZXJyb3I6IG1lc3NhZ2UsXG4gICAgICAgIHN0YXR1czogZmFsc2UsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBjYXJ0SWQ6IGNhcnQuaWQsXG4gICAgICBzdGF0dXM6IHRydWUsXG4gICAgfTtcblxuICAgIHJldHVybiBkYXRhO1xuICB9KTtcbiAgY29uc3QgcmVzdWx0QWxsUHJvbWlzZXM6IElFdmVudENhcnRbXSA9IFtdO1xuXG4gIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBQcm9taXNlLmFsbChmZXRjaFByb21pc2VzKTtcbiAgcmVzdWx0cy5mb3JFYWNoKChyZXN1bHQpID0+IHtcbiAgICBpZiAocmVzdWx0LnN0YXR1cyAhPT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIHJlc3VsdEFsbFByb21pc2VzLnB1c2gocmVzdWx0KTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiByZXN1bHRBbGxQcm9taXNlcztcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvY2FydC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
