/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
            var referenceTd = product.cells[3];
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
                var referenceTd = productItem.cells[3];
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
                    var referenceTd = productItem.cells[3];
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
            deleteShipAssignButton(key.replace(/\s/g, '_'), value);
        });
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
            deleteAdjustContainer(key.replace(/\s/g, '_'), value);
        });
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
var viewModal = new flowbite_1.Modal($viewProductModalElement, modalOptions);
var adjustModal = new flowbite_1.Modal($adjustProductModalElement, adjustModalOptions);
var editModal = new flowbite_1.Modal($editProductModalElement, modalOptions);
var requestShareModal = new flowbite_1.Modal($requestShareModalElement, modalShipAssignOptions);
var shipModal = new flowbite_1.Modal($shipModalElement, modalShipAssignOptions);
var assignModal = new flowbite_1.Modal($assignModalElement, modalShipAssignOptions);
var $buttonElements = document.querySelectorAll('.product-edit-button');
$buttonElements.forEach(function (e) {
    return e.addEventListener('click', function () {
        editProduct(JSON.parse(e.getAttribute('data-target')));
    });
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
function editProduct(product) {
    var img = document.querySelector('#product-edit-show-image');
    product.image.length > 100
        ? (img.src = "data:image/png;base64, ".concat(product.image))
        : (img.src = defaultBrandImage);
    var input = document.querySelector('#product-edit-name');
    input.value = product.name;
    input = document.querySelector('#product-edit-id');
    input.value = product.id.toString();
    input = document.querySelector('#product-edit-product_type');
    input.value = product.product_type.toUpperCase().split(' ').join('_');
    // a loop that adds additional fields
    input = document.querySelector('#product-edit-currency');
    input.value = product.currency;
    input = document.querySelector('#product-edit-price');
    input.value = product.price.toString();
    input = document.querySelector('#product-edit-description');
    input.value = product.description;
    // General Info ->
    input = document.querySelector('#product-edit-SKU');
    input.value = product.SKU;
    input = document.querySelector('#product-edit-low_stock_level');
    input.value = product.low_stock_level.toString();
    input = document.querySelector('#product-edit-program_year');
    input.value = product.program_year.toString();
    input = document.querySelector('#product-edit-package_qty');
    input.value = product.package_qty.toString();
    input = document.querySelector('#product-edit-numb_of_items_per_case');
    input.value = product.numb_of_items_per_case.toString();
    input = document.querySelector('#product-edit-numb_of_cases_per_outer_case');
    input.value = product.numb_of_cases_per_outer_case.toString();
    input = document.querySelector('#product-edit-comments');
    input.value = product.comments;
    // shipping
    input = document.querySelector('#product-edit-weight');
    input.value = product.weight.toString();
    input = document.querySelector('#product-edit-length');
    input.value = product.length.toString();
    input = document.querySelector('#product-edit-width');
    input.value = product.width.toString();
    input = document.querySelector('#product-edit-height');
    input.value = product.height.toString();
    input = document.querySelector('#product-edit-next_url');
    input.value = window.location.href;
    editModal.show();
}
var viewProductButtonElements = document.querySelectorAll('.product-view-button');
viewProductButtonElements.forEach(function (e) {
    return e.addEventListener('click', function () {
        var product = JSON.parse(e.getAttribute('data-target'));
        sessionStorage.setItem('product', JSON.stringify(product));
        var mstrGroups = Object.keys(product.mstr_groups_groups);
        mstrGroups.forEach(function (groupName) {
            var isEqual = false;
            if (product.current_user_groups.hasOwnProperty(groupName)) {
                var currentUserValue = product.current_user_groups[groupName];
                var mstrGroupsValue = product.mstr_groups_groups[groupName];
                if (currentUserValue.includes(mstrGroupsValue)) {
                    isEqual = true;
                }
            }
            addShipAssignShareButton(isEqual, groupName, product.mstr_groups_groups[groupName], product);
        });
        var div = document.querySelector('#product-view-name');
        div.innerHTML = product.name;
        div = document.querySelector('#product-view-id');
        div.innerHTML = product.id.toString();
        var img = document.querySelector('#product-view-image');
        product.image.length > 100
            ? (img.src = "data:image/png;base64, ".concat(product.image))
            : (img.src = defaultBrandImage);
        div = document.querySelector('#product-view-product_type');
        div.innerHTML = product.product_type.toUpperCase().split(' ').join('_');
        div = document.querySelector('#product-view-price');
        div.innerHTML = product.price.toString();
        // General Info ->
        div = document.querySelector('#product-view-SKU');
        div.innerHTML = product.SKU;
        div = document.querySelector('#product-view-package_qty');
        div.innerHTML = product.package_qty.toString();
        div = document.querySelector('#product-view-numb_of_items_per_case');
        div.innerHTML = product.numb_of_items_per_case.toString();
        div = document.querySelector('#product-view-numb_of_cases_per_outer_case');
        div.innerHTML = product.numb_of_cases_per_outer_case.toString();
        div = document.querySelector('#product-view-comments');
        div.innerHTML = product.comments;
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
        var mstrGroups = Object.keys(product.mstr_groups_groups);
        mstrGroups.forEach(function (groupName) {
            var isEqual = false;
            if (product.current_user_groups.hasOwnProperty(groupName)) {
                var currentUserValue = product.current_user_groups[groupName];
                var mstrGroupsValue = product.mstr_groups_groups[groupName];
                if (currentUserValue.includes(mstrGroupsValue)) {
                    isEqual = true;
                }
            }
            createAdjustAction(isEqual, groupName, product.mstr_groups_groups[groupName], product);
        });
        var div = document.querySelector('#product-adjust-name');
        div.innerHTML = product.name;
        div = document.querySelector('#product-adjust-id');
        div.innerHTML = product.id.toString();
        var img = document.querySelector('#product-adjust-image');
        product.image.length > 100
            ? (img.src = "data:image/png;base64, ".concat(product.image))
            : (img.src = defaultBrandImage);
        div = document.querySelector('#product-adjust-product_type');
        div.innerHTML = product.product_type.toUpperCase().split(' ').join('_');
        div = document.querySelector('#product-adjust-next_url');
        div.innerHTML = window.location.href;
        adjustModal.show();
    });
});
// function to request share
function requestShare(product, group) {
    var img = document.querySelector('#product-request-share-image');
    product.image.length > 100
        ? (img.src = "data:image/png;base64, ".concat(product.image))
        : (img.src = defaultBrandImage);
    var div = document.querySelector('#product-request-share-name');
    div.innerHTML = product.name;
    div = document.querySelector('#product-request-share-sku');
    div.innerHTML = product.SKU;
    div = document.querySelector('#product-request-share-available-quantity');
    div.innerHTML = product.available_quantity[group].toString();
    div = document.querySelector('#product-request-share-owner');
    // TODO change to something not hardcoded here and in rest funcs
    div.innerHTML = 'Mike';
    div = document.querySelector('#product-request-share-role');
    div.innerHTML = 'ADMIN';
    div = document.querySelector('#product-request-share-total-available-items');
    div.innerHTML = product.total_available_items[group].toString();
    var input = document.querySelector('#product-request-share-quantity');
    input.max = product.available_quantity[group].toString();
    input.min = '1';
    input = document.querySelector('#product-request-share-name-hidden-input');
    input.value = product.name;
    input = document.querySelector('#product-request-share-SKU-hidden-input');
    input.value = product.SKU;
    input = document.querySelector('#product-request-share-available-quantity-hidden-input');
    input.value = product.available_quantity[group].toString();
    input = document.querySelector('#product-request-share-from-group');
    input.value = group;
    requestShareModal.show();
}
// function to ship
function ship(product, group) {
    var img = document.querySelector('#product-ship-image');
    product.image.length > 100
        ? (img.src = "data:image/png;base64, ".concat(product.image))
        : (img.src = defaultBrandImage);
    var div = document.querySelector('#product-ship-name');
    div.innerHTML = product.name;
    div = document.querySelector('#product-ship-sku');
    div.innerHTML = product.SKU;
    div = document.querySelector('#product-ship-available-quantity');
    div.innerHTML = product.available_quantity[group].toString();
    div = document.querySelector('#product-ship-total-available-items');
    div.innerHTML = product.total_available_items[group].toString();
    var input = document.querySelector('#product-ship-product-id');
    input.value = product.id.toString();
    input = document.querySelector('#product-ship-desire-quantity');
    input.max = product.available_quantity[group].toString();
    input.min = '1';
    input = document.querySelector('#product-ship-group');
    input.value = group;
    shipModal.show();
}
// function to assign
function assign(product, group) {
    var input = document.querySelector('#product-assign-name');
    input.value = product.name;
    input = document.querySelector('#product-assign-amount');
    input.max = product.available_quantity[group].toString();
    input.min = '1';
    input = document.querySelector('#product-assign-from-group');
    input.value = group;
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
    var groupProductIds = productParam.groups_ids;
    var productTypeContainer = document.querySelector("#product-view-product_type-container");
    var shipAssignContainer = document.createElement('div');
    shipAssignContainer.classList.add('sm:col-span-3', 'flex', 'gap-4');
    shipAssignContainer.setAttribute('id', "product-ship-assign-share-container-".concat(masterGroup.replace(/ /g, '_')));
    shipAssignContainer.innerHTML = "\n    <div>\n      <label for=\"name\" class=\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\">Quantity</label>\n        <div id=\"ship-product-quantity\"\n          class=\"shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500\">\n      ".concat(productParam.available_quantity[group] || 0, "</div>\n    </div>\n    <div>\n      <label for=\"product_group\" class=\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\" >Action</label >\n      <button ship-group-data=").concat(group.replace(/ /g, '_'), " type=\"button\" id=\"ship-product-button-").concat(group.replace(/ /g, '_'), "\" class=\"ship-product-button inline-flex items-center mr-2 px-3 py-2.5 text-sm font-medium text-center text-white rounded-lg bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900\">\n        <svg class=\"w-4 h-4 mr-2\" fill=\"currentColor\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z\"></path><path fill-rule=\"evenodd\" d=\"M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z\" clip-rule=\"evenodd\"></path></svg>\n        Ship\n      </button>\n      <button assign-group-data=").concat(group.replace(/ /g, '_'), " type=\"button\" id=\"assign-product-button-").concat(group.replace(/ /g, '_'), "\" class=\"assign-product-button inline-flex items-center px-3 py-2.5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800\">\n        <svg class=\"w-4 h-4 mr-2\" fill=\"currentColor\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z\"></path><path fill-rule=\"evenodd\" d=\"M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z\" clip-rule=\"evenodd\"></path></svg>\n        Assign\n      </button>\n    </div>\n  ");
    var shareContainer = document.createElement('div');
    var shipProductBtn = shipAssignContainer.querySelector("#ship-product-button-".concat(group.replace(/ /g, '_')));
    var assignProductBtn = shipAssignContainer.querySelector("#assign-product-button-".concat(group.replace(/ /g, '_')));
    shareContainer.classList.add('sm:col-span-3', 'flex', 'gap-4');
    shareContainer.setAttribute('id', "product-ship-assign-share-container-".concat(masterGroup.replace(/ /g, '_')));
    shareContainer.innerHTML = "\n    <div>\n      <label for=\"name\" class=\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\">Quantity</label>\n        <div id=\"ship-product-quantity\"\n          class=\"shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500\">\n      ".concat(productParam.available_quantity[group] || 0, "</div>\n    </div>\n    <div>\n      <label for=\"product_group\" class=\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\" >Action</label >\n      <button share-group-data=").concat(group.replace(/ /g, '_'), " type=\"button\" id=\"share-product-button-").concat(group.replace(/ /g, '_'), "\" class=\"request-share-product-button inline-flex items-center px-3 py-2.5 text-sm font-medium text-center text-white rounded-lg bg-yellow-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800\">\n        <svg class=\"w-4 h-4 mr-2\" fill=\"currentColor\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z\"></path><path fill-rule=\"evenodd\" d=\"M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z\" clip-rule=\"evenodd\"></path></svg>\n        Request Share\n      </button>\n    </div>\n  ");
    var shareProductBtn = shareContainer.querySelector("#share-product-button-".concat(group.replace(/ /g, '_')));
    if (productParam.available_quantity[group] === 0 ||
        !productParam.available_quantity[group]) {
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
    var productViewTypeContainer = document.querySelector('#product-view-product_type-container');
    var productMasterGroupContainer = document.createElement('div');
    productMasterGroupContainer.classList.add('sm:col-span-3');
    productMasterGroupContainer.setAttribute('id', "product-view-product_group-container-".concat(group.replace(/ /g, '_')));
    productMasterGroupContainer.innerHTML = "\n    <label for=\"for-group-".concat(group, "\"\n      class=\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\">").concat(group, "</label>\n    <select type=\"text\" name=\"group-").concat(group, "\" id=\"product-view-").concat(group, "\"\n      class=\"shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500\"\n      placeholder=\"Some Group\" required\n    >\n      <option value=\"").concat(groupProductIds[group], "\">").concat(group, "</option>\n    </select>\n    ");
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
        var filterInputId = filterInputDataTarget
            .split(',')[0]
            .replace(/[^a-zA-Z0-9\s\_]/g, '');
        var filterInputIdString = "#product-filter-input-".concat(filterInputId);
        var filterButtonId = filterInputDataTarget
            .split(',')[1]
            .trim()
            .replace(/[^a-zA-Z0-9\s\_]/g, '');
        var filterInput = document.querySelector(filterInputIdString);
        var filterRadioBtn = document.querySelector("#dropdownRadioButton-".concat(filterButtonId));
        if (filterInputIdString.includes(filterButtonId)) {
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
    var groupProductIds = productParam.groups_ids;
    var productTypeContainer = document.querySelector("#product-adjust-product_type-container");
    var adjustContainer = document.createElement('div');
    adjustContainer.classList.add('sm:col-span-2', 'flex', 'gap-4');
    adjustContainer.setAttribute('id', "product-adjust-container-".concat(group.replace(/ /g, '_')));
    adjustContainer.innerHTML = "\n    <div>\n      <label for=\"adjust-product-quantity-".concat(group.replace(/ /g, '_'), "\" class=\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\">Quantity</label>\n        <input id=\"adjust-product-quantity-").concat(group.replace(/ /g, '_'), "\"\n          class=\"shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500\">\n    </div>\n    <div>\n      <label for=\"product_group\" class=\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\" >Action</label >\n      <button adjust-group-data=").concat(group.replace(/ /g, '_'), " type=\"button\" id=\"adjust-product-button-").concat(group.replace(/ /g, '_'), "\" class=\"adjust-product-button inline-flex items-center mr-2 px-3 py-2.5 text-sm font-medium text-center text-white rounded-lg bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900\">\n        <svg class=\"w-4 h-4 mr-2\" fill=\"currentColor\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z\"></path><path fill-rule=\"evenodd\" d=\"M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z\" clip-rule=\"evenodd\"></path></svg>\n        Adjust\n      </button>\n    </div>\n  ");
    var adjustProductBtn = adjustContainer.querySelector("#adjust-product-button-".concat(group.replace(/ /g, '_')));
    productTypeContainer.parentNode.insertBefore(adjustContainer, productTypeContainer.nextSibling);
    var productViewTypeContainer = document.querySelector('#product-adjust-product_type-container');
    var masterGroupWarehouseContainer = document.createElement('div');
    masterGroupWarehouseContainer.classList.add('sm:col-span-4');
    masterGroupWarehouseContainer.setAttribute('id', "product-adjust-product_group-container-".concat(group.replace(/ /g, '_')));
    masterGroupWarehouseContainer.innerHTML = "\n  <div class=\"flex gap-4\">\n  <div class=\"w-2/4\">\n    <label for=\"for-group-".concat(group, "\"\n      class=\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\">").concat(masterGroup, "</label>\n    <select type=\"text\" name=\"group-").concat(group, "\" id=\"master-group-adjust-").concat(group, "\"\n      class=\"shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500\"\n      placeholder=\"Some Group\" required\n    >\n      <option value=\"").concat(groupProductIds[group], "\">").concat(group, "</option>\n    </select>\n  </div>\n  <div class=\"w-2/4\">\n    <label for=\"for-warehouse-").concat(group, "\"\n      class=\"block mb-2 text-sm font-medium text-gray-900 dark:text-white\">Warehouse</label>\n    <select type=\"text\" name=\"group-").concat(group, "\" id=\"warehouse-adjust-").concat(group, "\"\n      class=\"shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500\"\n      placeholder=\"Some Group\" required\n    >\n    </select>\n  </div>\n  </div>\n    ");
    var selectWarehouse = masterGroupWarehouseContainer.querySelector("#warehouse-adjust-".concat(group));
    var productQuantity = adjustContainer.querySelector("#adjust-product-quantity-".concat(group.replace(/ /g, '_')));
    var productQuantityValue = productParam.available_quantity[group] || 0;
    productQuantity.value = String(productQuantityValue);
    for (var _i = 0, _a = productParam.all_warehouses; _i < _a.length; _i++) {
        var warehouse = _a[_i];
        var option = document.createElement('option');
        option.value = warehouse.id.toString();
        option.text = warehouse.name.toString();
        selectWarehouse.appendChild(option);
    }
    productViewTypeContainer.parentNode.insertBefore(masterGroupWarehouseContainer, productViewTypeContainer.nextSibling);
    var adjustButton = document.querySelector("#adjust-product-button-".concat(group.replace(/ /g, '_')));
    adjustButton.addEventListener('click', function () {
        var csrfTokenInput = document.querySelector('#csrf_token');
        var csrfToken = csrfTokenInput ? csrfTokenInput.value : '';
        var groupId = groupProductIds[group];
        var productId = productParam.id;
        var warehouseId = selectWarehouse.value;
        var currentQuantity = Number(productQuantity.value);
        adjustProduct(warehouseId, productId, currentQuantity, groupId, group, csrfToken);
    });
}
function adjustProduct(warehouseId, productId, quantity, groupId, group, csrfToken) {
    return __awaiter(this, void 0, void 0, function () {
        var data, response, message, groupContainer, productQuantity, successMessage_1, errorMessage_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = {
                        warehouse_id: warehouseId,
                        product_id: productId,
                        quantity: String(quantity),
                        group_id: groupId,
                        csrf_token: csrfToken,
                    };
                    return [4 /*yield*/, fetch('/product/adjust', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data),
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    message = _a.sent();
                    groupContainer = document.querySelector("#product-adjust-product_group-container-".concat(group.replace(/ /g, '_')));
                    if (response.status === 201) {
                        productQuantity = document.querySelector("#adjust-product-quantity-".concat(group.replace(/ /g, '_')));
                        productQuantity.value = quantity.toString();
                        successMessage_1 = document.createElement('div');
                        successMessage_1.classList.add('text-green-500', 'text-sm');
                        successMessage_1.innerText = message.message;
                        groupContainer.appendChild(successMessage_1);
                        setTimeout(function () {
                            successMessage_1.remove();
                        }, 10000);
                    }
                    else {
                        errorMessage_1 = document.createElement('div');
                        errorMessage_1.classList.add('text-red-500', 'text-sm');
                        errorMessage_1.innerText = message.message;
                        groupContainer.appendChild(errorMessage_1);
                        setTimeout(function () {
                            errorMessage_1.remove();
                        }, 20000);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxHQUFHO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxHQUFHO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELGlDQUFpQztBQUNuRix5REFBeUQsaUNBQWlDO0FBQzFGO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtB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QUFPLENBQy9ELElBQUksRUFDSixHQUFHLENBQ0osQ0FBRSxDQUNKLENBQUM7SUFDRixJQUFJLGVBQWUsRUFBRTtRQUNuQixlQUFlLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDMUI7SUFDRCxJQUFJLDZCQUE2QixFQUFFO1FBQ2pDLDZCQUE2QixDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ3hDO0FBQ0gsQ0FBQzs7Ozs7OztVQ2hwQ0Q7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2NyZWF0ZVBvcHBlci5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9jb250YWlucy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRCb3VuZGluZ0NsaWVudFJlY3QuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Q2xpcHBpbmdSZWN0LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldENvbXBvc2l0ZVJlY3QuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Q29tcHV0ZWRTdHlsZS5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXREb2N1bWVudEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0RG9jdW1lbnRSZWN0LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldEhUTUxFbGVtZW50U2Nyb2xsLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldExheW91dFJlY3QuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Tm9kZU5hbWUuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Tm9kZVNjcm9sbC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRPZmZzZXRQYXJlbnQuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0UGFyZW50Tm9kZS5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRTY3JvbGxQYXJlbnQuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Vmlld3BvcnRSZWN0LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldFdpbmRvdy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRXaW5kb3dTY3JvbGwuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0V2luZG93U2Nyb2xsQmFyWC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9pbnN0YW5jZU9mLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2lzTGF5b3V0Vmlld3BvcnQuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvaXNTY3JvbGxQYXJlbnQuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvaXNUYWJsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvbGlzdFNjcm9sbFBhcmVudHMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9lbnVtcy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9hcHBseVN0eWxlcy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9hcnJvdy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9jb21wdXRlU3R5bGVzLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2V2ZW50TGlzdGVuZXJzLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2ZsaXAuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvaGlkZS5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9vZmZzZXQuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvcG9wcGVyT2Zmc2V0cy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9wcmV2ZW50T3ZlcmZsb3cuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9wb3BwZXItbGl0ZS5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3BvcHBlci5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2NvbXB1dGVBdXRvUGxhY2VtZW50LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvY29tcHV0ZU9mZnNldHMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9kZWJvdW5jZS5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2RldGVjdE92ZXJmbG93LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZXhwYW5kVG9IYXNoTWFwLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZm9ybWF0LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZ2V0QWx0QXhpcy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9nZXRGcmVzaFNpZGVPYmplY3QuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9nZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9nZXRPcHBvc2l0ZVBsYWNlbWVudC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2dldE9wcG9zaXRlVmFyaWF0aW9uUGxhY2VtZW50LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZ2V0VmFyaWF0aW9uLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvbWF0aC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL21lcmdlQnlOYW1lLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvbWVyZ2VQYWRkaW5nT2JqZWN0LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvb3JkZXJNb2RpZmllcnMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9yZWN0VG9DbGllbnRSZWN0LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvdW5pcXVlQnkuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy91c2VyQWdlbnQuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy92YWxpZGF0ZU1vZGlmaWVycy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL3dpdGhpbi5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL2FjY29yZGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL2FjY29yZGlvbi9pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9hY2NvcmRpb24vdHlwZXMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9jYXJvdXNlbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL2Nhcm91c2VsL2ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL2Nhcm91c2VsL3R5cGVzLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvY29sbGFwc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9jb2xsYXBzZS9pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9jb2xsYXBzZS90eXBlcy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL2RpYWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9kaWFsL2ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL2RpYWwvdHlwZXMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9kaXNtaXNzL2luZGV4LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvZGlzbWlzcy9pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9kaXNtaXNzL3R5cGVzLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvZHJhd2VyL2luZGV4LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvZHJhd2VyL2ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL2RyYXdlci90eXBlcy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL2Ryb3Bkb3duL2luZGV4LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvZHJvcGRvd24vaW50ZXJmYWNlLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvZHJvcGRvd24vdHlwZXMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL21vZGFsL2luZGV4LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvbW9kYWwvaW50ZXJmYWNlLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvbW9kYWwvdHlwZXMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9wb3BvdmVyL2luZGV4LmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvcG9wb3Zlci9pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy9wb3BvdmVyL3R5cGVzLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvdGFicy9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL3RhYnMvaW50ZXJmYWNlLmpzIiwid2VicGFjazovL3N0YXRpYy8uL25vZGVfbW9kdWxlcy9mbG93Yml0ZS9saWIvZXNtL2NvbXBvbmVudHMvdGFicy90eXBlcy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL3Rvb2x0aXAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vY29tcG9uZW50cy90b29sdGlwL2ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9jb21wb25lbnRzL3Rvb2x0aXAvdHlwZXMuanMiLCJ3ZWJwYWNrOi8vc3RhdGljLy4vbm9kZV9tb2R1bGVzL2Zsb3diaXRlL2xpYi9lc20vZG9tL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9ub2RlX21vZHVsZXMvZmxvd2JpdGUvbGliL2VzbS9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdGF0aWMvLi9zcmMvcHJvZHVjdC50cyIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3RhdGljL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9zdGF0aWMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3N0YXRpYy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdldENvbXBvc2l0ZVJlY3QgZnJvbSBcIi4vZG9tLXV0aWxzL2dldENvbXBvc2l0ZVJlY3QuanNcIjtcbmltcG9ydCBnZXRMYXlvdXRSZWN0IGZyb20gXCIuL2RvbS11dGlscy9nZXRMYXlvdXRSZWN0LmpzXCI7XG5pbXBvcnQgbGlzdFNjcm9sbFBhcmVudHMgZnJvbSBcIi4vZG9tLXV0aWxzL2xpc3RTY3JvbGxQYXJlbnRzLmpzXCI7XG5pbXBvcnQgZ2V0T2Zmc2V0UGFyZW50IGZyb20gXCIuL2RvbS11dGlscy9nZXRPZmZzZXRQYXJlbnQuanNcIjtcbmltcG9ydCBnZXRDb21wdXRlZFN0eWxlIGZyb20gXCIuL2RvbS11dGlscy9nZXRDb21wdXRlZFN0eWxlLmpzXCI7XG5pbXBvcnQgb3JkZXJNb2RpZmllcnMgZnJvbSBcIi4vdXRpbHMvb3JkZXJNb2RpZmllcnMuanNcIjtcbmltcG9ydCBkZWJvdW5jZSBmcm9tIFwiLi91dGlscy9kZWJvdW5jZS5qc1wiO1xuaW1wb3J0IHZhbGlkYXRlTW9kaWZpZXJzIGZyb20gXCIuL3V0aWxzL3ZhbGlkYXRlTW9kaWZpZXJzLmpzXCI7XG5pbXBvcnQgdW5pcXVlQnkgZnJvbSBcIi4vdXRpbHMvdW5pcXVlQnkuanNcIjtcbmltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBtZXJnZUJ5TmFtZSBmcm9tIFwiLi91dGlscy9tZXJnZUJ5TmFtZS5qc1wiO1xuaW1wb3J0IGRldGVjdE92ZXJmbG93IGZyb20gXCIuL3V0aWxzL2RldGVjdE92ZXJmbG93LmpzXCI7XG5pbXBvcnQgeyBpc0VsZW1lbnQgfSBmcm9tIFwiLi9kb20tdXRpbHMvaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IHsgYXV0byB9IGZyb20gXCIuL2VudW1zLmpzXCI7XG52YXIgSU5WQUxJRF9FTEVNRU5UX0VSUk9SID0gJ1BvcHBlcjogSW52YWxpZCByZWZlcmVuY2Ugb3IgcG9wcGVyIGFyZ3VtZW50IHByb3ZpZGVkLiBUaGV5IG11c3QgYmUgZWl0aGVyIGEgRE9NIGVsZW1lbnQgb3IgdmlydHVhbCBlbGVtZW50Lic7XG52YXIgSU5GSU5JVEVfTE9PUF9FUlJPUiA9ICdQb3BwZXI6IEFuIGluZmluaXRlIGxvb3AgaW4gdGhlIG1vZGlmaWVycyBjeWNsZSBoYXMgYmVlbiBkZXRlY3RlZCEgVGhlIGN5Y2xlIGhhcyBiZWVuIGludGVycnVwdGVkIHRvIHByZXZlbnQgYSBicm93c2VyIGNyYXNoLic7XG52YXIgREVGQVVMVF9PUFRJT05TID0ge1xuICBwbGFjZW1lbnQ6ICdib3R0b20nLFxuICBtb2RpZmllcnM6IFtdLFxuICBzdHJhdGVneTogJ2Fic29sdXRlJ1xufTtcblxuZnVuY3Rpb24gYXJlVmFsaWRFbGVtZW50cygpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiAhYXJncy5zb21lKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgcmV0dXJuICEoZWxlbWVudCAmJiB0eXBlb2YgZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgPT09ICdmdW5jdGlvbicpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBvcHBlckdlbmVyYXRvcihnZW5lcmF0b3JPcHRpb25zKSB7XG4gIGlmIChnZW5lcmF0b3JPcHRpb25zID09PSB2b2lkIDApIHtcbiAgICBnZW5lcmF0b3JPcHRpb25zID0ge307XG4gIH1cblxuICB2YXIgX2dlbmVyYXRvck9wdGlvbnMgPSBnZW5lcmF0b3JPcHRpb25zLFxuICAgICAgX2dlbmVyYXRvck9wdGlvbnMkZGVmID0gX2dlbmVyYXRvck9wdGlvbnMuZGVmYXVsdE1vZGlmaWVycyxcbiAgICAgIGRlZmF1bHRNb2RpZmllcnMgPSBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYgPT09IHZvaWQgMCA/IFtdIDogX2dlbmVyYXRvck9wdGlvbnMkZGVmLFxuICAgICAgX2dlbmVyYXRvck9wdGlvbnMkZGVmMiA9IF9nZW5lcmF0b3JPcHRpb25zLmRlZmF1bHRPcHRpb25zLFxuICAgICAgZGVmYXVsdE9wdGlvbnMgPSBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYyID09PSB2b2lkIDAgPyBERUZBVUxUX09QVElPTlMgOiBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYyO1xuICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlUG9wcGVyKHJlZmVyZW5jZSwgcG9wcGVyLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgICAgb3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zO1xuICAgIH1cblxuICAgIHZhciBzdGF0ZSA9IHtcbiAgICAgIHBsYWNlbWVudDogJ2JvdHRvbScsXG4gICAgICBvcmRlcmVkTW9kaWZpZXJzOiBbXSxcbiAgICAgIG9wdGlvbnM6IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfT1BUSU9OUywgZGVmYXVsdE9wdGlvbnMpLFxuICAgICAgbW9kaWZpZXJzRGF0YToge30sXG4gICAgICBlbGVtZW50czoge1xuICAgICAgICByZWZlcmVuY2U6IHJlZmVyZW5jZSxcbiAgICAgICAgcG9wcGVyOiBwb3BwZXJcbiAgICAgIH0sXG4gICAgICBhdHRyaWJ1dGVzOiB7fSxcbiAgICAgIHN0eWxlczoge31cbiAgICB9O1xuICAgIHZhciBlZmZlY3RDbGVhbnVwRm5zID0gW107XG4gICAgdmFyIGlzRGVzdHJveWVkID0gZmFsc2U7XG4gICAgdmFyIGluc3RhbmNlID0ge1xuICAgICAgc3RhdGU6IHN0YXRlLFxuICAgICAgc2V0T3B0aW9uczogZnVuY3Rpb24gc2V0T3B0aW9ucyhzZXRPcHRpb25zQWN0aW9uKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gdHlwZW9mIHNldE9wdGlvbnNBY3Rpb24gPT09ICdmdW5jdGlvbicgPyBzZXRPcHRpb25zQWN0aW9uKHN0YXRlLm9wdGlvbnMpIDogc2V0T3B0aW9uc0FjdGlvbjtcbiAgICAgICAgY2xlYW51cE1vZGlmaWVyRWZmZWN0cygpO1xuICAgICAgICBzdGF0ZS5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIHN0YXRlLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICBzdGF0ZS5zY3JvbGxQYXJlbnRzID0ge1xuICAgICAgICAgIHJlZmVyZW5jZTogaXNFbGVtZW50KHJlZmVyZW5jZSkgPyBsaXN0U2Nyb2xsUGFyZW50cyhyZWZlcmVuY2UpIDogcmVmZXJlbmNlLmNvbnRleHRFbGVtZW50ID8gbGlzdFNjcm9sbFBhcmVudHMocmVmZXJlbmNlLmNvbnRleHRFbGVtZW50KSA6IFtdLFxuICAgICAgICAgIHBvcHBlcjogbGlzdFNjcm9sbFBhcmVudHMocG9wcGVyKVxuICAgICAgICB9OyAvLyBPcmRlcnMgdGhlIG1vZGlmaWVycyBiYXNlZCBvbiB0aGVpciBkZXBlbmRlbmNpZXMgYW5kIGBwaGFzZWBcbiAgICAgICAgLy8gcHJvcGVydGllc1xuXG4gICAgICAgIHZhciBvcmRlcmVkTW9kaWZpZXJzID0gb3JkZXJNb2RpZmllcnMobWVyZ2VCeU5hbWUoW10uY29uY2F0KGRlZmF1bHRNb2RpZmllcnMsIHN0YXRlLm9wdGlvbnMubW9kaWZpZXJzKSkpOyAvLyBTdHJpcCBvdXQgZGlzYWJsZWQgbW9kaWZpZXJzXG5cbiAgICAgICAgc3RhdGUub3JkZXJlZE1vZGlmaWVycyA9IG9yZGVyZWRNb2RpZmllcnMuZmlsdGVyKGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgcmV0dXJuIG0uZW5hYmxlZDtcbiAgICAgICAgfSk7IC8vIFZhbGlkYXRlIHRoZSBwcm92aWRlZCBtb2RpZmllcnMgc28gdGhhdCB0aGUgY29uc3VtZXIgd2lsbCBnZXQgd2FybmVkXG4gICAgICAgIC8vIGlmIG9uZSBvZiB0aGUgbW9kaWZpZXJzIGlzIGludmFsaWQgZm9yIGFueSByZWFzb25cblxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgdmFyIG1vZGlmaWVycyA9IHVuaXF1ZUJ5KFtdLmNvbmNhdChvcmRlcmVkTW9kaWZpZXJzLCBzdGF0ZS5vcHRpb25zLm1vZGlmaWVycyksIGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IF9yZWYubmFtZTtcbiAgICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkYXRlTW9kaWZpZXJzKG1vZGlmaWVycyk7XG5cbiAgICAgICAgICBpZiAoZ2V0QmFzZVBsYWNlbWVudChzdGF0ZS5vcHRpb25zLnBsYWNlbWVudCkgPT09IGF1dG8pIHtcbiAgICAgICAgICAgIHZhciBmbGlwTW9kaWZpZXIgPSBzdGF0ZS5vcmRlcmVkTW9kaWZpZXJzLmZpbmQoZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgICAgICAgICAgIHZhciBuYW1lID0gX3JlZjIubmFtZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5hbWUgPT09ICdmbGlwJztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoIWZsaXBNb2RpZmllcikge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFsnUG9wcGVyOiBcImF1dG9cIiBwbGFjZW1lbnRzIHJlcXVpcmUgdGhlIFwiZmxpcFwiIG1vZGlmaWVyIGJlJywgJ3ByZXNlbnQgYW5kIGVuYWJsZWQgdG8gd29yay4nXS5qb2luKCcgJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBfZ2V0Q29tcHV0ZWRTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUocG9wcGVyKSxcbiAgICAgICAgICAgICAgbWFyZ2luVG9wID0gX2dldENvbXB1dGVkU3R5bGUubWFyZ2luVG9wLFxuICAgICAgICAgICAgICBtYXJnaW5SaWdodCA9IF9nZXRDb21wdXRlZFN0eWxlLm1hcmdpblJpZ2h0LFxuICAgICAgICAgICAgICBtYXJnaW5Cb3R0b20gPSBfZ2V0Q29tcHV0ZWRTdHlsZS5tYXJnaW5Cb3R0b20sXG4gICAgICAgICAgICAgIG1hcmdpbkxlZnQgPSBfZ2V0Q29tcHV0ZWRTdHlsZS5tYXJnaW5MZWZ0OyAvLyBXZSBubyBsb25nZXIgdGFrZSBpbnRvIGFjY291bnQgYG1hcmdpbnNgIG9uIHRoZSBwb3BwZXIsIGFuZCBpdCBjYW5cbiAgICAgICAgICAvLyBjYXVzZSBidWdzIHdpdGggcG9zaXRpb25pbmcsIHNvIHdlJ2xsIHdhcm4gdGhlIGNvbnN1bWVyXG5cblxuICAgICAgICAgIGlmIChbbWFyZ2luVG9wLCBtYXJnaW5SaWdodCwgbWFyZ2luQm90dG9tLCBtYXJnaW5MZWZ0XS5zb21lKGZ1bmN0aW9uIChtYXJnaW4pIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KG1hcmdpbik7XG4gICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihbJ1BvcHBlcjogQ1NTIFwibWFyZ2luXCIgc3R5bGVzIGNhbm5vdCBiZSB1c2VkIHRvIGFwcGx5IHBhZGRpbmcnLCAnYmV0d2VlbiB0aGUgcG9wcGVyIGFuZCBpdHMgcmVmZXJlbmNlIGVsZW1lbnQgb3IgYm91bmRhcnkuJywgJ1RvIHJlcGxpY2F0ZSBtYXJnaW4sIHVzZSB0aGUgYG9mZnNldGAgbW9kaWZpZXIsIGFzIHdlbGwgYXMnLCAndGhlIGBwYWRkaW5nYCBvcHRpb24gaW4gdGhlIGBwcmV2ZW50T3ZlcmZsb3dgIGFuZCBgZmxpcGAnLCAnbW9kaWZpZXJzLiddLmpvaW4oJyAnKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcnVuTW9kaWZpZXJFZmZlY3RzKCk7XG4gICAgICAgIHJldHVybiBpbnN0YW5jZS51cGRhdGUoKTtcbiAgICAgIH0sXG4gICAgICAvLyBTeW5jIHVwZGF0ZSDigJMgaXQgd2lsbCBhbHdheXMgYmUgZXhlY3V0ZWQsIGV2ZW4gaWYgbm90IG5lY2Vzc2FyeS4gVGhpc1xuICAgICAgLy8gaXMgdXNlZnVsIGZvciBsb3cgZnJlcXVlbmN5IHVwZGF0ZXMgd2hlcmUgc3luYyBiZWhhdmlvciBzaW1wbGlmaWVzIHRoZVxuICAgICAgLy8gbG9naWMuXG4gICAgICAvLyBGb3IgaGlnaCBmcmVxdWVuY3kgdXBkYXRlcyAoZS5nLiBgcmVzaXplYCBhbmQgYHNjcm9sbGAgZXZlbnRzKSwgYWx3YXlzXG4gICAgICAvLyBwcmVmZXIgdGhlIGFzeW5jIFBvcHBlciN1cGRhdGUgbWV0aG9kXG4gICAgICBmb3JjZVVwZGF0ZTogZnVuY3Rpb24gZm9yY2VVcGRhdGUoKSB7XG4gICAgICAgIGlmIChpc0Rlc3Ryb3llZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBfc3RhdGUkZWxlbWVudHMgPSBzdGF0ZS5lbGVtZW50cyxcbiAgICAgICAgICAgIHJlZmVyZW5jZSA9IF9zdGF0ZSRlbGVtZW50cy5yZWZlcmVuY2UsXG4gICAgICAgICAgICBwb3BwZXIgPSBfc3RhdGUkZWxlbWVudHMucG9wcGVyOyAvLyBEb24ndCBwcm9jZWVkIGlmIGByZWZlcmVuY2VgIG9yIGBwb3BwZXJgIGFyZSBub3QgdmFsaWQgZWxlbWVudHNcbiAgICAgICAgLy8gYW55bW9yZVxuXG4gICAgICAgIGlmICghYXJlVmFsaWRFbGVtZW50cyhyZWZlcmVuY2UsIHBvcHBlcikpIHtcbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKElOVkFMSURfRUxFTUVOVF9FUlJPUik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IC8vIFN0b3JlIHRoZSByZWZlcmVuY2UgYW5kIHBvcHBlciByZWN0cyB0byBiZSByZWFkIGJ5IG1vZGlmaWVyc1xuXG5cbiAgICAgICAgc3RhdGUucmVjdHMgPSB7XG4gICAgICAgICAgcmVmZXJlbmNlOiBnZXRDb21wb3NpdGVSZWN0KHJlZmVyZW5jZSwgZ2V0T2Zmc2V0UGFyZW50KHBvcHBlciksIHN0YXRlLm9wdGlvbnMuc3RyYXRlZ3kgPT09ICdmaXhlZCcpLFxuICAgICAgICAgIHBvcHBlcjogZ2V0TGF5b3V0UmVjdChwb3BwZXIpXG4gICAgICAgIH07IC8vIE1vZGlmaWVycyBoYXZlIHRoZSBhYmlsaXR5IHRvIHJlc2V0IHRoZSBjdXJyZW50IHVwZGF0ZSBjeWNsZS4gVGhlXG4gICAgICAgIC8vIG1vc3QgY29tbW9uIHVzZSBjYXNlIGZvciB0aGlzIGlzIHRoZSBgZmxpcGAgbW9kaWZpZXIgY2hhbmdpbmcgdGhlXG4gICAgICAgIC8vIHBsYWNlbWVudCwgd2hpY2ggdGhlbiBuZWVkcyB0byByZS1ydW4gYWxsIHRoZSBtb2RpZmllcnMsIGJlY2F1c2UgdGhlXG4gICAgICAgIC8vIGxvZ2ljIHdhcyBwcmV2aW91c2x5IHJhbiBmb3IgdGhlIHByZXZpb3VzIHBsYWNlbWVudCBhbmQgaXMgdGhlcmVmb3JlXG4gICAgICAgIC8vIHN0YWxlL2luY29ycmVjdFxuXG4gICAgICAgIHN0YXRlLnJlc2V0ID0gZmFsc2U7XG4gICAgICAgIHN0YXRlLnBsYWNlbWVudCA9IHN0YXRlLm9wdGlvbnMucGxhY2VtZW50OyAvLyBPbiBlYWNoIHVwZGF0ZSBjeWNsZSwgdGhlIGBtb2RpZmllcnNEYXRhYCBwcm9wZXJ0eSBmb3IgZWFjaCBtb2RpZmllclxuICAgICAgICAvLyBpcyBmaWxsZWQgd2l0aCB0aGUgaW5pdGlhbCBkYXRhIHNwZWNpZmllZCBieSB0aGUgbW9kaWZpZXIuIFRoaXMgbWVhbnNcbiAgICAgICAgLy8gaXQgZG9lc24ndCBwZXJzaXN0IGFuZCBpcyBmcmVzaCBvbiBlYWNoIHVwZGF0ZS5cbiAgICAgICAgLy8gVG8gZW5zdXJlIHBlcnNpc3RlbnQgZGF0YSwgdXNlIGAke25hbWV9I3BlcnNpc3RlbnRgXG5cbiAgICAgICAgc3RhdGUub3JkZXJlZE1vZGlmaWVycy5mb3JFYWNoKGZ1bmN0aW9uIChtb2RpZmllcikge1xuICAgICAgICAgIHJldHVybiBzdGF0ZS5tb2RpZmllcnNEYXRhW21vZGlmaWVyLm5hbWVdID0gT2JqZWN0LmFzc2lnbih7fSwgbW9kaWZpZXIuZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgX19kZWJ1Z19sb29wc19fID0gMDtcblxuICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgc3RhdGUub3JkZXJlZE1vZGlmaWVycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgICBfX2RlYnVnX2xvb3BzX18gKz0gMTtcblxuICAgICAgICAgICAgaWYgKF9fZGVidWdfbG9vcHNfXyA+IDEwMCkge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKElORklOSVRFX0xPT1BfRVJST1IpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc3RhdGUucmVzZXQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHN0YXRlLnJlc2V0ID0gZmFsc2U7XG4gICAgICAgICAgICBpbmRleCA9IC0xO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIF9zdGF0ZSRvcmRlcmVkTW9kaWZpZSA9IHN0YXRlLm9yZGVyZWRNb2RpZmllcnNbaW5kZXhdLFxuICAgICAgICAgICAgICBmbiA9IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZS5mbixcbiAgICAgICAgICAgICAgX3N0YXRlJG9yZGVyZWRNb2RpZmllMiA9IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZS5vcHRpb25zLFxuICAgICAgICAgICAgICBfb3B0aW9ucyA9IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZTIgPT09IHZvaWQgMCA/IHt9IDogX3N0YXRlJG9yZGVyZWRNb2RpZmllMixcbiAgICAgICAgICAgICAgbmFtZSA9IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZS5uYW1lO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgc3RhdGUgPSBmbih7XG4gICAgICAgICAgICAgIHN0YXRlOiBzdGF0ZSxcbiAgICAgICAgICAgICAgb3B0aW9uczogX29wdGlvbnMsXG4gICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgIGluc3RhbmNlOiBpbnN0YW5jZVxuICAgICAgICAgICAgfSkgfHwgc3RhdGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLy8gQXN5bmMgYW5kIG9wdGltaXN0aWNhbGx5IG9wdGltaXplZCB1cGRhdGUg4oCTIGl0IHdpbGwgbm90IGJlIGV4ZWN1dGVkIGlmXG4gICAgICAvLyBub3QgbmVjZXNzYXJ5IChkZWJvdW5jZWQgdG8gcnVuIGF0IG1vc3Qgb25jZS1wZXItdGljaylcbiAgICAgIHVwZGF0ZTogZGVib3VuY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICBpbnN0YW5jZS5mb3JjZVVwZGF0ZSgpO1xuICAgICAgICAgIHJlc29sdmUoc3RhdGUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pLFxuICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgY2xlYW51cE1vZGlmaWVyRWZmZWN0cygpO1xuICAgICAgICBpc0Rlc3Ryb3llZCA9IHRydWU7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICghYXJlVmFsaWRFbGVtZW50cyhyZWZlcmVuY2UsIHBvcHBlcikpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihJTlZBTElEX0VMRU1FTlRfRVJST1IpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgaW5zdGFuY2Uuc2V0T3B0aW9ucyhvcHRpb25zKS50aGVuKGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgaWYgKCFpc0Rlc3Ryb3llZCAmJiBvcHRpb25zLm9uRmlyc3RVcGRhdGUpIHtcbiAgICAgICAgb3B0aW9ucy5vbkZpcnN0VXBkYXRlKHN0YXRlKTtcbiAgICAgIH1cbiAgICB9KTsgLy8gTW9kaWZpZXJzIGhhdmUgdGhlIGFiaWxpdHkgdG8gZXhlY3V0ZSBhcmJpdHJhcnkgY29kZSBiZWZvcmUgdGhlIGZpcnN0XG4gICAgLy8gdXBkYXRlIGN5Y2xlIHJ1bnMuIFRoZXkgd2lsbCBiZSBleGVjdXRlZCBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGUgdXBkYXRlXG4gICAgLy8gY3ljbGUuIFRoaXMgaXMgdXNlZnVsIHdoZW4gYSBtb2RpZmllciBhZGRzIHNvbWUgcGVyc2lzdGVudCBkYXRhIHRoYXRcbiAgICAvLyBvdGhlciBtb2RpZmllcnMgbmVlZCB0byB1c2UsIGJ1dCB0aGUgbW9kaWZpZXIgaXMgcnVuIGFmdGVyIHRoZSBkZXBlbmRlbnRcbiAgICAvLyBvbmUuXG5cbiAgICBmdW5jdGlvbiBydW5Nb2RpZmllckVmZmVjdHMoKSB7XG4gICAgICBzdGF0ZS5vcmRlcmVkTW9kaWZpZXJzLmZvckVhY2goZnVuY3Rpb24gKF9yZWYzKSB7XG4gICAgICAgIHZhciBuYW1lID0gX3JlZjMubmFtZSxcbiAgICAgICAgICAgIF9yZWYzJG9wdGlvbnMgPSBfcmVmMy5vcHRpb25zLFxuICAgICAgICAgICAgb3B0aW9ucyA9IF9yZWYzJG9wdGlvbnMgPT09IHZvaWQgMCA/IHt9IDogX3JlZjMkb3B0aW9ucyxcbiAgICAgICAgICAgIGVmZmVjdCA9IF9yZWYzLmVmZmVjdDtcblxuICAgICAgICBpZiAodHlwZW9mIGVmZmVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHZhciBjbGVhbnVwRm4gPSBlZmZlY3Qoe1xuICAgICAgICAgICAgc3RhdGU6IHN0YXRlLFxuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIGluc3RhbmNlOiBpbnN0YW5jZSxcbiAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHZhciBub29wRm4gPSBmdW5jdGlvbiBub29wRm4oKSB7fTtcblxuICAgICAgICAgIGVmZmVjdENsZWFudXBGbnMucHVzaChjbGVhbnVwRm4gfHwgbm9vcEZuKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYW51cE1vZGlmaWVyRWZmZWN0cygpIHtcbiAgICAgIGVmZmVjdENsZWFudXBGbnMuZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgICB9KTtcbiAgICAgIGVmZmVjdENsZWFudXBGbnMgPSBbXTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH07XG59XG5leHBvcnQgdmFyIGNyZWF0ZVBvcHBlciA9IC8qI19fUFVSRV9fKi9wb3BwZXJHZW5lcmF0b3IoKTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgeyBkZXRlY3RPdmVyZmxvdyB9OyIsImltcG9ydCB7IGlzU2hhZG93Um9vdCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnRhaW5zKHBhcmVudCwgY2hpbGQpIHtcbiAgdmFyIHJvb3ROb2RlID0gY2hpbGQuZ2V0Um9vdE5vZGUgJiYgY2hpbGQuZ2V0Um9vdE5vZGUoKTsgLy8gRmlyc3QsIGF0dGVtcHQgd2l0aCBmYXN0ZXIgbmF0aXZlIG1ldGhvZFxuXG4gIGlmIChwYXJlbnQuY29udGFpbnMoY2hpbGQpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gLy8gdGhlbiBmYWxsYmFjayB0byBjdXN0b20gaW1wbGVtZW50YXRpb24gd2l0aCBTaGFkb3cgRE9NIHN1cHBvcnRcbiAgZWxzZSBpZiAocm9vdE5vZGUgJiYgaXNTaGFkb3dSb290KHJvb3ROb2RlKSkge1xuICAgICAgdmFyIG5leHQgPSBjaGlsZDtcblxuICAgICAgZG8ge1xuICAgICAgICBpZiAobmV4dCAmJiBwYXJlbnQuaXNTYW1lTm9kZShuZXh0KSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IC8vICRGbG93Rml4TWVbcHJvcC1taXNzaW5nXTogbmVlZCBhIGJldHRlciB3YXkgdG8gaGFuZGxlIHRoaXMuLi5cblxuXG4gICAgICAgIG5leHQgPSBuZXh0LnBhcmVudE5vZGUgfHwgbmV4dC5ob3N0O1xuICAgICAgfSB3aGlsZSAobmV4dCk7XG4gICAgfSAvLyBHaXZlIHVwLCB0aGUgcmVzdWx0IGlzIGZhbHNlXG5cblxuICByZXR1cm4gZmFsc2U7XG59IiwiaW1wb3J0IHsgaXNFbGVtZW50LCBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IHsgcm91bmQgfSBmcm9tIFwiLi4vdXRpbHMvbWF0aC5qc1wiO1xuaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBpc0xheW91dFZpZXdwb3J0IGZyb20gXCIuL2lzTGF5b3V0Vmlld3BvcnQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEJvdW5kaW5nQ2xpZW50UmVjdChlbGVtZW50LCBpbmNsdWRlU2NhbGUsIGlzRml4ZWRTdHJhdGVneSkge1xuICBpZiAoaW5jbHVkZVNjYWxlID09PSB2b2lkIDApIHtcbiAgICBpbmNsdWRlU2NhbGUgPSBmYWxzZTtcbiAgfVxuXG4gIGlmIChpc0ZpeGVkU3RyYXRlZ3kgPT09IHZvaWQgMCkge1xuICAgIGlzRml4ZWRTdHJhdGVneSA9IGZhbHNlO1xuICB9XG5cbiAgdmFyIGNsaWVudFJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB2YXIgc2NhbGVYID0gMTtcbiAgdmFyIHNjYWxlWSA9IDE7XG5cbiAgaWYgKGluY2x1ZGVTY2FsZSAmJiBpc0hUTUxFbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgc2NhbGVYID0gZWxlbWVudC5vZmZzZXRXaWR0aCA+IDAgPyByb3VuZChjbGllbnRSZWN0LndpZHRoKSAvIGVsZW1lbnQub2Zmc2V0V2lkdGggfHwgMSA6IDE7XG4gICAgc2NhbGVZID0gZWxlbWVudC5vZmZzZXRIZWlnaHQgPiAwID8gcm91bmQoY2xpZW50UmVjdC5oZWlnaHQpIC8gZWxlbWVudC5vZmZzZXRIZWlnaHQgfHwgMSA6IDE7XG4gIH1cblxuICB2YXIgX3JlZiA9IGlzRWxlbWVudChlbGVtZW50KSA/IGdldFdpbmRvdyhlbGVtZW50KSA6IHdpbmRvdyxcbiAgICAgIHZpc3VhbFZpZXdwb3J0ID0gX3JlZi52aXN1YWxWaWV3cG9ydDtcblxuICB2YXIgYWRkVmlzdWFsT2Zmc2V0cyA9ICFpc0xheW91dFZpZXdwb3J0KCkgJiYgaXNGaXhlZFN0cmF0ZWd5O1xuICB2YXIgeCA9IChjbGllbnRSZWN0LmxlZnQgKyAoYWRkVmlzdWFsT2Zmc2V0cyAmJiB2aXN1YWxWaWV3cG9ydCA/IHZpc3VhbFZpZXdwb3J0Lm9mZnNldExlZnQgOiAwKSkgLyBzY2FsZVg7XG4gIHZhciB5ID0gKGNsaWVudFJlY3QudG9wICsgKGFkZFZpc3VhbE9mZnNldHMgJiYgdmlzdWFsVmlld3BvcnQgPyB2aXN1YWxWaWV3cG9ydC5vZmZzZXRUb3AgOiAwKSkgLyBzY2FsZVk7XG4gIHZhciB3aWR0aCA9IGNsaWVudFJlY3Qud2lkdGggLyBzY2FsZVg7XG4gIHZhciBoZWlnaHQgPSBjbGllbnRSZWN0LmhlaWdodCAvIHNjYWxlWTtcbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgdG9wOiB5LFxuICAgIHJpZ2h0OiB4ICsgd2lkdGgsXG4gICAgYm90dG9tOiB5ICsgaGVpZ2h0LFxuICAgIGxlZnQ6IHgsXG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH07XG59IiwiaW1wb3J0IHsgdmlld3BvcnQgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCBnZXRWaWV3cG9ydFJlY3QgZnJvbSBcIi4vZ2V0Vmlld3BvcnRSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0RG9jdW1lbnRSZWN0IGZyb20gXCIuL2dldERvY3VtZW50UmVjdC5qc1wiO1xuaW1wb3J0IGxpc3RTY3JvbGxQYXJlbnRzIGZyb20gXCIuL2xpc3RTY3JvbGxQYXJlbnRzLmpzXCI7XG5pbXBvcnQgZ2V0T2Zmc2V0UGFyZW50IGZyb20gXCIuL2dldE9mZnNldFBhcmVudC5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRDb21wdXRlZFN0eWxlIGZyb20gXCIuL2dldENvbXB1dGVkU3R5bGUuanNcIjtcbmltcG9ydCB7IGlzRWxlbWVudCwgaXNIVE1MRWxlbWVudCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmltcG9ydCBnZXRCb3VuZGluZ0NsaWVudFJlY3QgZnJvbSBcIi4vZ2V0Qm91bmRpbmdDbGllbnRSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0UGFyZW50Tm9kZSBmcm9tIFwiLi9nZXRQYXJlbnROb2RlLmpzXCI7XG5pbXBvcnQgY29udGFpbnMgZnJvbSBcIi4vY29udGFpbnMuanNcIjtcbmltcG9ydCBnZXROb2RlTmFtZSBmcm9tIFwiLi9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IHJlY3RUb0NsaWVudFJlY3QgZnJvbSBcIi4uL3V0aWxzL3JlY3RUb0NsaWVudFJlY3QuanNcIjtcbmltcG9ydCB7IG1heCwgbWluIH0gZnJvbSBcIi4uL3V0aWxzL21hdGguanNcIjtcblxuZnVuY3Rpb24gZ2V0SW5uZXJCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudCwgc3RyYXRlZ3kpIHtcbiAgdmFyIHJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudCwgZmFsc2UsIHN0cmF0ZWd5ID09PSAnZml4ZWQnKTtcbiAgcmVjdC50b3AgPSByZWN0LnRvcCArIGVsZW1lbnQuY2xpZW50VG9wO1xuICByZWN0LmxlZnQgPSByZWN0LmxlZnQgKyBlbGVtZW50LmNsaWVudExlZnQ7XG4gIHJlY3QuYm90dG9tID0gcmVjdC50b3AgKyBlbGVtZW50LmNsaWVudEhlaWdodDtcbiAgcmVjdC5yaWdodCA9IHJlY3QubGVmdCArIGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gIHJlY3Qud2lkdGggPSBlbGVtZW50LmNsaWVudFdpZHRoO1xuICByZWN0LmhlaWdodCA9IGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICByZWN0LnggPSByZWN0LmxlZnQ7XG4gIHJlY3QueSA9IHJlY3QudG9wO1xuICByZXR1cm4gcmVjdDtcbn1cblxuZnVuY3Rpb24gZ2V0Q2xpZW50UmVjdEZyb21NaXhlZFR5cGUoZWxlbWVudCwgY2xpcHBpbmdQYXJlbnQsIHN0cmF0ZWd5KSB7XG4gIHJldHVybiBjbGlwcGluZ1BhcmVudCA9PT0gdmlld3BvcnQgPyByZWN0VG9DbGllbnRSZWN0KGdldFZpZXdwb3J0UmVjdChlbGVtZW50LCBzdHJhdGVneSkpIDogaXNFbGVtZW50KGNsaXBwaW5nUGFyZW50KSA/IGdldElubmVyQm91bmRpbmdDbGllbnRSZWN0KGNsaXBwaW5nUGFyZW50LCBzdHJhdGVneSkgOiByZWN0VG9DbGllbnRSZWN0KGdldERvY3VtZW50UmVjdChnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCkpKTtcbn0gLy8gQSBcImNsaXBwaW5nIHBhcmVudFwiIGlzIGFuIG92ZXJmbG93YWJsZSBjb250YWluZXIgd2l0aCB0aGUgY2hhcmFjdGVyaXN0aWMgb2Zcbi8vIGNsaXBwaW5nIChvciBoaWRpbmcpIG92ZXJmbG93aW5nIGVsZW1lbnRzIHdpdGggYSBwb3NpdGlvbiBkaWZmZXJlbnQgZnJvbVxuLy8gYGluaXRpYWxgXG5cblxuZnVuY3Rpb24gZ2V0Q2xpcHBpbmdQYXJlbnRzKGVsZW1lbnQpIHtcbiAgdmFyIGNsaXBwaW5nUGFyZW50cyA9IGxpc3RTY3JvbGxQYXJlbnRzKGdldFBhcmVudE5vZGUoZWxlbWVudCkpO1xuICB2YXIgY2FuRXNjYXBlQ2xpcHBpbmcgPSBbJ2Fic29sdXRlJywgJ2ZpeGVkJ10uaW5kZXhPZihnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLnBvc2l0aW9uKSA+PSAwO1xuICB2YXIgY2xpcHBlckVsZW1lbnQgPSBjYW5Fc2NhcGVDbGlwcGluZyAmJiBpc0hUTUxFbGVtZW50KGVsZW1lbnQpID8gZ2V0T2Zmc2V0UGFyZW50KGVsZW1lbnQpIDogZWxlbWVudDtcblxuICBpZiAoIWlzRWxlbWVudChjbGlwcGVyRWxlbWVudCkpIHtcbiAgICByZXR1cm4gW107XG4gIH0gLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtcmV0dXJuXTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2Zsb3cvaXNzdWVzLzE0MTRcblxuXG4gIHJldHVybiBjbGlwcGluZ1BhcmVudHMuZmlsdGVyKGZ1bmN0aW9uIChjbGlwcGluZ1BhcmVudCkge1xuICAgIHJldHVybiBpc0VsZW1lbnQoY2xpcHBpbmdQYXJlbnQpICYmIGNvbnRhaW5zKGNsaXBwaW5nUGFyZW50LCBjbGlwcGVyRWxlbWVudCkgJiYgZ2V0Tm9kZU5hbWUoY2xpcHBpbmdQYXJlbnQpICE9PSAnYm9keSc7XG4gIH0pO1xufSAvLyBHZXRzIHRoZSBtYXhpbXVtIGFyZWEgdGhhdCB0aGUgZWxlbWVudCBpcyB2aXNpYmxlIGluIGR1ZSB0byBhbnkgbnVtYmVyIG9mXG4vLyBjbGlwcGluZyBwYXJlbnRzXG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Q2xpcHBpbmdSZWN0KGVsZW1lbnQsIGJvdW5kYXJ5LCByb290Qm91bmRhcnksIHN0cmF0ZWd5KSB7XG4gIHZhciBtYWluQ2xpcHBpbmdQYXJlbnRzID0gYm91bmRhcnkgPT09ICdjbGlwcGluZ1BhcmVudHMnID8gZ2V0Q2xpcHBpbmdQYXJlbnRzKGVsZW1lbnQpIDogW10uY29uY2F0KGJvdW5kYXJ5KTtcbiAgdmFyIGNsaXBwaW5nUGFyZW50cyA9IFtdLmNvbmNhdChtYWluQ2xpcHBpbmdQYXJlbnRzLCBbcm9vdEJvdW5kYXJ5XSk7XG4gIHZhciBmaXJzdENsaXBwaW5nUGFyZW50ID0gY2xpcHBpbmdQYXJlbnRzWzBdO1xuICB2YXIgY2xpcHBpbmdSZWN0ID0gY2xpcHBpbmdQYXJlbnRzLnJlZHVjZShmdW5jdGlvbiAoYWNjUmVjdCwgY2xpcHBpbmdQYXJlbnQpIHtcbiAgICB2YXIgcmVjdCA9IGdldENsaWVudFJlY3RGcm9tTWl4ZWRUeXBlKGVsZW1lbnQsIGNsaXBwaW5nUGFyZW50LCBzdHJhdGVneSk7XG4gICAgYWNjUmVjdC50b3AgPSBtYXgocmVjdC50b3AsIGFjY1JlY3QudG9wKTtcbiAgICBhY2NSZWN0LnJpZ2h0ID0gbWluKHJlY3QucmlnaHQsIGFjY1JlY3QucmlnaHQpO1xuICAgIGFjY1JlY3QuYm90dG9tID0gbWluKHJlY3QuYm90dG9tLCBhY2NSZWN0LmJvdHRvbSk7XG4gICAgYWNjUmVjdC5sZWZ0ID0gbWF4KHJlY3QubGVmdCwgYWNjUmVjdC5sZWZ0KTtcbiAgICByZXR1cm4gYWNjUmVjdDtcbiAgfSwgZ2V0Q2xpZW50UmVjdEZyb21NaXhlZFR5cGUoZWxlbWVudCwgZmlyc3RDbGlwcGluZ1BhcmVudCwgc3RyYXRlZ3kpKTtcbiAgY2xpcHBpbmdSZWN0LndpZHRoID0gY2xpcHBpbmdSZWN0LnJpZ2h0IC0gY2xpcHBpbmdSZWN0LmxlZnQ7XG4gIGNsaXBwaW5nUmVjdC5oZWlnaHQgPSBjbGlwcGluZ1JlY3QuYm90dG9tIC0gY2xpcHBpbmdSZWN0LnRvcDtcbiAgY2xpcHBpbmdSZWN0LnggPSBjbGlwcGluZ1JlY3QubGVmdDtcbiAgY2xpcHBpbmdSZWN0LnkgPSBjbGlwcGluZ1JlY3QudG9wO1xuICByZXR1cm4gY2xpcHBpbmdSZWN0O1xufSIsImltcG9ydCBnZXRCb3VuZGluZ0NsaWVudFJlY3QgZnJvbSBcIi4vZ2V0Qm91bmRpbmdDbGllbnRSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0Tm9kZVNjcm9sbCBmcm9tIFwiLi9nZXROb2RlU2Nyb2xsLmpzXCI7XG5pbXBvcnQgZ2V0Tm9kZU5hbWUgZnJvbSBcIi4vZ2V0Tm9kZU5hbWUuanNcIjtcbmltcG9ydCB7IGlzSFRNTEVsZW1lbnQgfSBmcm9tIFwiLi9pbnN0YW5jZU9mLmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsQmFyWCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGxCYXJYLmpzXCI7XG5pbXBvcnQgZ2V0RG9jdW1lbnRFbGVtZW50IGZyb20gXCIuL2dldERvY3VtZW50RWxlbWVudC5qc1wiO1xuaW1wb3J0IGlzU2Nyb2xsUGFyZW50IGZyb20gXCIuL2lzU2Nyb2xsUGFyZW50LmpzXCI7XG5pbXBvcnQgeyByb3VuZCB9IGZyb20gXCIuLi91dGlscy9tYXRoLmpzXCI7XG5cbmZ1bmN0aW9uIGlzRWxlbWVudFNjYWxlZChlbGVtZW50KSB7XG4gIHZhciByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdmFyIHNjYWxlWCA9IHJvdW5kKHJlY3Qud2lkdGgpIC8gZWxlbWVudC5vZmZzZXRXaWR0aCB8fCAxO1xuICB2YXIgc2NhbGVZID0gcm91bmQocmVjdC5oZWlnaHQpIC8gZWxlbWVudC5vZmZzZXRIZWlnaHQgfHwgMTtcbiAgcmV0dXJuIHNjYWxlWCAhPT0gMSB8fCBzY2FsZVkgIT09IDE7XG59IC8vIFJldHVybnMgdGhlIGNvbXBvc2l0ZSByZWN0IG9mIGFuIGVsZW1lbnQgcmVsYXRpdmUgdG8gaXRzIG9mZnNldFBhcmVudC5cbi8vIENvbXBvc2l0ZSBtZWFucyBpdCB0YWtlcyBpbnRvIGFjY291bnQgdHJhbnNmb3JtcyBhcyB3ZWxsIGFzIGxheW91dC5cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDb21wb3NpdGVSZWN0KGVsZW1lbnRPclZpcnR1YWxFbGVtZW50LCBvZmZzZXRQYXJlbnQsIGlzRml4ZWQpIHtcbiAgaWYgKGlzRml4ZWQgPT09IHZvaWQgMCkge1xuICAgIGlzRml4ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIHZhciBpc09mZnNldFBhcmVudEFuRWxlbWVudCA9IGlzSFRNTEVsZW1lbnQob2Zmc2V0UGFyZW50KTtcbiAgdmFyIG9mZnNldFBhcmVudElzU2NhbGVkID0gaXNIVE1MRWxlbWVudChvZmZzZXRQYXJlbnQpICYmIGlzRWxlbWVudFNjYWxlZChvZmZzZXRQYXJlbnQpO1xuICB2YXIgZG9jdW1lbnRFbGVtZW50ID0gZ2V0RG9jdW1lbnRFbGVtZW50KG9mZnNldFBhcmVudCk7XG4gIHZhciByZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnRPclZpcnR1YWxFbGVtZW50LCBvZmZzZXRQYXJlbnRJc1NjYWxlZCwgaXNGaXhlZCk7XG4gIHZhciBzY3JvbGwgPSB7XG4gICAgc2Nyb2xsTGVmdDogMCxcbiAgICBzY3JvbGxUb3A6IDBcbiAgfTtcbiAgdmFyIG9mZnNldHMgPSB7XG4gICAgeDogMCxcbiAgICB5OiAwXG4gIH07XG5cbiAgaWYgKGlzT2Zmc2V0UGFyZW50QW5FbGVtZW50IHx8ICFpc09mZnNldFBhcmVudEFuRWxlbWVudCAmJiAhaXNGaXhlZCkge1xuICAgIGlmIChnZXROb2RlTmFtZShvZmZzZXRQYXJlbnQpICE9PSAnYm9keScgfHwgLy8gaHR0cHM6Ly9naXRodWIuY29tL3BvcHBlcmpzL3BvcHBlci1jb3JlL2lzc3Vlcy8xMDc4XG4gICAgaXNTY3JvbGxQYXJlbnQoZG9jdW1lbnRFbGVtZW50KSkge1xuICAgICAgc2Nyb2xsID0gZ2V0Tm9kZVNjcm9sbChvZmZzZXRQYXJlbnQpO1xuICAgIH1cblxuICAgIGlmIChpc0hUTUxFbGVtZW50KG9mZnNldFBhcmVudCkpIHtcbiAgICAgIG9mZnNldHMgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3Qob2Zmc2V0UGFyZW50LCB0cnVlKTtcbiAgICAgIG9mZnNldHMueCArPSBvZmZzZXRQYXJlbnQuY2xpZW50TGVmdDtcbiAgICAgIG9mZnNldHMueSArPSBvZmZzZXRQYXJlbnQuY2xpZW50VG9wO1xuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICBvZmZzZXRzLnggPSBnZXRXaW5kb3dTY3JvbGxCYXJYKGRvY3VtZW50RWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB4OiByZWN0LmxlZnQgKyBzY3JvbGwuc2Nyb2xsTGVmdCAtIG9mZnNldHMueCxcbiAgICB5OiByZWN0LnRvcCArIHNjcm9sbC5zY3JvbGxUb3AgLSBvZmZzZXRzLnksXG4gICAgd2lkdGg6IHJlY3Qud2lkdGgsXG4gICAgaGVpZ2h0OiByZWN0LmhlaWdodFxuICB9O1xufSIsImltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGdldFdpbmRvdyhlbGVtZW50KS5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xufSIsImltcG9ydCB7IGlzRWxlbWVudCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldERvY3VtZW50RWxlbWVudChlbGVtZW50KSB7XG4gIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXJldHVybl06IGFzc3VtZSBib2R5IGlzIGFsd2F5cyBhdmFpbGFibGVcbiAgcmV0dXJuICgoaXNFbGVtZW50KGVsZW1lbnQpID8gZWxlbWVudC5vd25lckRvY3VtZW50IDogLy8gJEZsb3dGaXhNZVtwcm9wLW1pc3NpbmddXG4gIGVsZW1lbnQuZG9jdW1lbnQpIHx8IHdpbmRvdy5kb2N1bWVudCkuZG9jdW1lbnRFbGVtZW50O1xufSIsImltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4vZ2V0RG9jdW1lbnRFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0Q29tcHV0ZWRTdHlsZSBmcm9tIFwiLi9nZXRDb21wdXRlZFN0eWxlLmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsQmFyWCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGxCYXJYLmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsIGZyb20gXCIuL2dldFdpbmRvd1Njcm9sbC5qc1wiO1xuaW1wb3J0IHsgbWF4IH0gZnJvbSBcIi4uL3V0aWxzL21hdGguanNcIjsgLy8gR2V0cyB0aGUgZW50aXJlIHNpemUgb2YgdGhlIHNjcm9sbGFibGUgZG9jdW1lbnQgYXJlYSwgZXZlbiBleHRlbmRpbmcgb3V0c2lkZVxuLy8gb2YgdGhlIGA8aHRtbD5gIGFuZCBgPGJvZHk+YCByZWN0IGJvdW5kcyBpZiBob3Jpem9udGFsbHkgc2Nyb2xsYWJsZVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXREb2N1bWVudFJlY3QoZWxlbWVudCkge1xuICB2YXIgX2VsZW1lbnQkb3duZXJEb2N1bWVuO1xuXG4gIHZhciBodG1sID0gZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpO1xuICB2YXIgd2luU2Nyb2xsID0gZ2V0V2luZG93U2Nyb2xsKGVsZW1lbnQpO1xuICB2YXIgYm9keSA9IChfZWxlbWVudCRvd25lckRvY3VtZW4gPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQpID09IG51bGwgPyB2b2lkIDAgOiBfZWxlbWVudCRvd25lckRvY3VtZW4uYm9keTtcbiAgdmFyIHdpZHRoID0gbWF4KGh0bWwuc2Nyb2xsV2lkdGgsIGh0bWwuY2xpZW50V2lkdGgsIGJvZHkgPyBib2R5LnNjcm9sbFdpZHRoIDogMCwgYm9keSA/IGJvZHkuY2xpZW50V2lkdGggOiAwKTtcbiAgdmFyIGhlaWdodCA9IG1heChodG1sLnNjcm9sbEhlaWdodCwgaHRtbC5jbGllbnRIZWlnaHQsIGJvZHkgPyBib2R5LnNjcm9sbEhlaWdodCA6IDAsIGJvZHkgPyBib2R5LmNsaWVudEhlaWdodCA6IDApO1xuICB2YXIgeCA9IC13aW5TY3JvbGwuc2Nyb2xsTGVmdCArIGdldFdpbmRvd1Njcm9sbEJhclgoZWxlbWVudCk7XG4gIHZhciB5ID0gLXdpblNjcm9sbC5zY3JvbGxUb3A7XG5cbiAgaWYgKGdldENvbXB1dGVkU3R5bGUoYm9keSB8fCBodG1sKS5kaXJlY3Rpb24gPT09ICdydGwnKSB7XG4gICAgeCArPSBtYXgoaHRtbC5jbGllbnRXaWR0aCwgYm9keSA/IGJvZHkuY2xpZW50V2lkdGggOiAwKSAtIHdpZHRoO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH07XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0SFRNTEVsZW1lbnRTY3JvbGwoZWxlbWVudCkge1xuICByZXR1cm4ge1xuICAgIHNjcm9sbExlZnQ6IGVsZW1lbnQuc2Nyb2xsTGVmdCxcbiAgICBzY3JvbGxUb3A6IGVsZW1lbnQuc2Nyb2xsVG9wXG4gIH07XG59IiwiaW1wb3J0IGdldEJvdW5kaW5nQ2xpZW50UmVjdCBmcm9tIFwiLi9nZXRCb3VuZGluZ0NsaWVudFJlY3QuanNcIjsgLy8gUmV0dXJucyB0aGUgbGF5b3V0IHJlY3Qgb2YgYW4gZWxlbWVudCByZWxhdGl2ZSB0byBpdHMgb2Zmc2V0UGFyZW50LiBMYXlvdXRcbi8vIG1lYW5zIGl0IGRvZXNuJ3QgdGFrZSBpbnRvIGFjY291bnQgdHJhbnNmb3Jtcy5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0TGF5b3V0UmVjdChlbGVtZW50KSB7XG4gIHZhciBjbGllbnRSZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnQpOyAvLyBVc2UgdGhlIGNsaWVudFJlY3Qgc2l6ZXMgaWYgaXQncyBub3QgYmVlbiB0cmFuc2Zvcm1lZC5cbiAgLy8gRml4ZXMgaHR0cHM6Ly9naXRodWIuY29tL3BvcHBlcmpzL3BvcHBlci1jb3JlL2lzc3Vlcy8xMjIzXG5cbiAgdmFyIHdpZHRoID0gZWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgdmFyIGhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuXG4gIGlmIChNYXRoLmFicyhjbGllbnRSZWN0LndpZHRoIC0gd2lkdGgpIDw9IDEpIHtcbiAgICB3aWR0aCA9IGNsaWVudFJlY3Qud2lkdGg7XG4gIH1cblxuICBpZiAoTWF0aC5hYnMoY2xpZW50UmVjdC5oZWlnaHQgLSBoZWlnaHQpIDw9IDEpIHtcbiAgICBoZWlnaHQgPSBjbGllbnRSZWN0LmhlaWdodDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgeDogZWxlbWVudC5vZmZzZXRMZWZ0LFxuICAgIHk6IGVsZW1lbnQub2Zmc2V0VG9wLFxuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBoZWlnaHQ6IGhlaWdodFxuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE5vZGVOYW1lKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQgPyAoZWxlbWVudC5ub2RlTmFtZSB8fCAnJykudG9Mb3dlckNhc2UoKSA6IG51bGw7XG59IiwiaW1wb3J0IGdldFdpbmRvd1Njcm9sbCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGwuanNcIjtcbmltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5pbXBvcnQgeyBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IGdldEhUTUxFbGVtZW50U2Nyb2xsIGZyb20gXCIuL2dldEhUTUxFbGVtZW50U2Nyb2xsLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXROb2RlU2Nyb2xsKG5vZGUpIHtcbiAgaWYgKG5vZGUgPT09IGdldFdpbmRvdyhub2RlKSB8fCAhaXNIVE1MRWxlbWVudChub2RlKSkge1xuICAgIHJldHVybiBnZXRXaW5kb3dTY3JvbGwobm9kZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGdldEhUTUxFbGVtZW50U2Nyb2xsKG5vZGUpO1xuICB9XG59IiwiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBnZXROb2RlTmFtZSBmcm9tIFwiLi9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IGdldENvbXB1dGVkU3R5bGUgZnJvbSBcIi4vZ2V0Q29tcHV0ZWRTdHlsZS5qc1wiO1xuaW1wb3J0IHsgaXNIVE1MRWxlbWVudCwgaXNTaGFkb3dSb290IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IGlzVGFibGVFbGVtZW50IGZyb20gXCIuL2lzVGFibGVFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0UGFyZW50Tm9kZSBmcm9tIFwiLi9nZXRQYXJlbnROb2RlLmpzXCI7XG5pbXBvcnQgZ2V0VUFTdHJpbmcgZnJvbSBcIi4uL3V0aWxzL3VzZXJBZ2VudC5qc1wiO1xuXG5mdW5jdGlvbiBnZXRUcnVlT2Zmc2V0UGFyZW50KGVsZW1lbnQpIHtcbiAgaWYgKCFpc0hUTUxFbGVtZW50KGVsZW1lbnQpIHx8IC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9wb3BwZXJqcy9wb3BwZXItY29yZS9pc3N1ZXMvODM3XG4gIGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkucG9zaXRpb24gPT09ICdmaXhlZCcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50Lm9mZnNldFBhcmVudDtcbn0gLy8gYC5vZmZzZXRQYXJlbnRgIHJlcG9ydHMgYG51bGxgIGZvciBmaXhlZCBlbGVtZW50cywgd2hpbGUgYWJzb2x1dGUgZWxlbWVudHNcbi8vIHJldHVybiB0aGUgY29udGFpbmluZyBibG9ja1xuXG5cbmZ1bmN0aW9uIGdldENvbnRhaW5pbmdCbG9jayhlbGVtZW50KSB7XG4gIHZhciBpc0ZpcmVmb3ggPSAvZmlyZWZveC9pLnRlc3QoZ2V0VUFTdHJpbmcoKSk7XG4gIHZhciBpc0lFID0gL1RyaWRlbnQvaS50ZXN0KGdldFVBU3RyaW5nKCkpO1xuXG4gIGlmIChpc0lFICYmIGlzSFRNTEVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICAvLyBJbiBJRSA5LCAxMCBhbmQgMTEgZml4ZWQgZWxlbWVudHMgY29udGFpbmluZyBibG9jayBpcyBhbHdheXMgZXN0YWJsaXNoZWQgYnkgdGhlIHZpZXdwb3J0XG4gICAgdmFyIGVsZW1lbnRDc3MgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuXG4gICAgaWYgKGVsZW1lbnRDc3MucG9zaXRpb24gPT09ICdmaXhlZCcpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjdXJyZW50Tm9kZSA9IGdldFBhcmVudE5vZGUoZWxlbWVudCk7XG5cbiAgaWYgKGlzU2hhZG93Um9vdChjdXJyZW50Tm9kZSkpIHtcbiAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLmhvc3Q7XG4gIH1cblxuICB3aGlsZSAoaXNIVE1MRWxlbWVudChjdXJyZW50Tm9kZSkgJiYgWydodG1sJywgJ2JvZHknXS5pbmRleE9mKGdldE5vZGVOYW1lKGN1cnJlbnROb2RlKSkgPCAwKSB7XG4gICAgdmFyIGNzcyA9IGdldENvbXB1dGVkU3R5bGUoY3VycmVudE5vZGUpOyAvLyBUaGlzIGlzIG5vbi1leGhhdXN0aXZlIGJ1dCBjb3ZlcnMgdGhlIG1vc3QgY29tbW9uIENTUyBwcm9wZXJ0aWVzIHRoYXRcbiAgICAvLyBjcmVhdGUgYSBjb250YWluaW5nIGJsb2NrLlxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0NTUy9Db250YWluaW5nX2Jsb2NrI2lkZW50aWZ5aW5nX3RoZV9jb250YWluaW5nX2Jsb2NrXG5cbiAgICBpZiAoY3NzLnRyYW5zZm9ybSAhPT0gJ25vbmUnIHx8IGNzcy5wZXJzcGVjdGl2ZSAhPT0gJ25vbmUnIHx8IGNzcy5jb250YWluID09PSAncGFpbnQnIHx8IFsndHJhbnNmb3JtJywgJ3BlcnNwZWN0aXZlJ10uaW5kZXhPZihjc3Mud2lsbENoYW5nZSkgIT09IC0xIHx8IGlzRmlyZWZveCAmJiBjc3Mud2lsbENoYW5nZSA9PT0gJ2ZpbHRlcicgfHwgaXNGaXJlZm94ICYmIGNzcy5maWx0ZXIgJiYgY3NzLmZpbHRlciAhPT0gJ25vbmUnKSB7XG4gICAgICByZXR1cm4gY3VycmVudE5vZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn0gLy8gR2V0cyB0aGUgY2xvc2VzdCBhbmNlc3RvciBwb3NpdGlvbmVkIGVsZW1lbnQuIEhhbmRsZXMgc29tZSBlZGdlIGNhc2VzLFxuLy8gc3VjaCBhcyB0YWJsZSBhbmNlc3RvcnMgYW5kIGNyb3NzIGJyb3dzZXIgYnVncy5cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRPZmZzZXRQYXJlbnQoZWxlbWVudCkge1xuICB2YXIgd2luZG93ID0gZ2V0V2luZG93KGVsZW1lbnQpO1xuICB2YXIgb2Zmc2V0UGFyZW50ID0gZ2V0VHJ1ZU9mZnNldFBhcmVudChlbGVtZW50KTtcblxuICB3aGlsZSAob2Zmc2V0UGFyZW50ICYmIGlzVGFibGVFbGVtZW50KG9mZnNldFBhcmVudCkgJiYgZ2V0Q29tcHV0ZWRTdHlsZShvZmZzZXRQYXJlbnQpLnBvc2l0aW9uID09PSAnc3RhdGljJykge1xuICAgIG9mZnNldFBhcmVudCA9IGdldFRydWVPZmZzZXRQYXJlbnQob2Zmc2V0UGFyZW50KTtcbiAgfVxuXG4gIGlmIChvZmZzZXRQYXJlbnQgJiYgKGdldE5vZGVOYW1lKG9mZnNldFBhcmVudCkgPT09ICdodG1sJyB8fCBnZXROb2RlTmFtZShvZmZzZXRQYXJlbnQpID09PSAnYm9keScgJiYgZ2V0Q29tcHV0ZWRTdHlsZShvZmZzZXRQYXJlbnQpLnBvc2l0aW9uID09PSAnc3RhdGljJykpIHtcbiAgICByZXR1cm4gd2luZG93O1xuICB9XG5cbiAgcmV0dXJuIG9mZnNldFBhcmVudCB8fCBnZXRDb250YWluaW5nQmxvY2soZWxlbWVudCkgfHwgd2luZG93O1xufSIsImltcG9ydCBnZXROb2RlTmFtZSBmcm9tIFwiLi9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCB7IGlzU2hhZG93Um9vdCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFBhcmVudE5vZGUoZWxlbWVudCkge1xuICBpZiAoZ2V0Tm9kZU5hbWUoZWxlbWVudCkgPT09ICdodG1sJykge1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgcmV0dXJuICgvLyB0aGlzIGlzIGEgcXVpY2tlciAoYnV0IGxlc3MgdHlwZSBzYWZlKSB3YXkgdG8gc2F2ZSBxdWl0ZSBzb21lIGJ5dGVzIGZyb20gdGhlIGJ1bmRsZVxuICAgIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXJldHVybl1cbiAgICAvLyAkRmxvd0ZpeE1lW3Byb3AtbWlzc2luZ11cbiAgICBlbGVtZW50LmFzc2lnbmVkU2xvdCB8fCAvLyBzdGVwIGludG8gdGhlIHNoYWRvdyBET00gb2YgdGhlIHBhcmVudCBvZiBhIHNsb3R0ZWQgbm9kZVxuICAgIGVsZW1lbnQucGFyZW50Tm9kZSB8fCAoIC8vIERPTSBFbGVtZW50IGRldGVjdGVkXG4gICAgaXNTaGFkb3dSb290KGVsZW1lbnQpID8gZWxlbWVudC5ob3N0IDogbnVsbCkgfHwgLy8gU2hhZG93Um9vdCBkZXRlY3RlZFxuICAgIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLWNhbGxdOiBIVE1MRWxlbWVudCBpcyBhIE5vZGVcbiAgICBnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCkgLy8gZmFsbGJhY2tcblxuICApO1xufSIsImltcG9ydCBnZXRQYXJlbnROb2RlIGZyb20gXCIuL2dldFBhcmVudE5vZGUuanNcIjtcbmltcG9ydCBpc1Njcm9sbFBhcmVudCBmcm9tIFwiLi9pc1Njcm9sbFBhcmVudC5qc1wiO1xuaW1wb3J0IGdldE5vZGVOYW1lIGZyb20gXCIuL2dldE5vZGVOYW1lLmpzXCI7XG5pbXBvcnQgeyBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2Nyb2xsUGFyZW50KG5vZGUpIHtcbiAgaWYgKFsnaHRtbCcsICdib2R5JywgJyNkb2N1bWVudCddLmluZGV4T2YoZ2V0Tm9kZU5hbWUobm9kZSkpID49IDApIHtcbiAgICAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS1yZXR1cm5dOiBhc3N1bWUgYm9keSBpcyBhbHdheXMgYXZhaWxhYmxlXG4gICAgcmV0dXJuIG5vZGUub3duZXJEb2N1bWVudC5ib2R5O1xuICB9XG5cbiAgaWYgKGlzSFRNTEVsZW1lbnQobm9kZSkgJiYgaXNTY3JvbGxQYXJlbnQobm9kZSkpIHtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHJldHVybiBnZXRTY3JvbGxQYXJlbnQoZ2V0UGFyZW50Tm9kZShub2RlKSk7XG59IiwiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4vZ2V0RG9jdW1lbnRFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsQmFyWCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGxCYXJYLmpzXCI7XG5pbXBvcnQgaXNMYXlvdXRWaWV3cG9ydCBmcm9tIFwiLi9pc0xheW91dFZpZXdwb3J0LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRWaWV3cG9ydFJlY3QoZWxlbWVudCwgc3RyYXRlZ3kpIHtcbiAgdmFyIHdpbiA9IGdldFdpbmRvdyhlbGVtZW50KTtcbiAgdmFyIGh0bWwgPSBnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCk7XG4gIHZhciB2aXN1YWxWaWV3cG9ydCA9IHdpbi52aXN1YWxWaWV3cG9ydDtcbiAgdmFyIHdpZHRoID0gaHRtbC5jbGllbnRXaWR0aDtcbiAgdmFyIGhlaWdodCA9IGh0bWwuY2xpZW50SGVpZ2h0O1xuICB2YXIgeCA9IDA7XG4gIHZhciB5ID0gMDtcblxuICBpZiAodmlzdWFsVmlld3BvcnQpIHtcbiAgICB3aWR0aCA9IHZpc3VhbFZpZXdwb3J0LndpZHRoO1xuICAgIGhlaWdodCA9IHZpc3VhbFZpZXdwb3J0LmhlaWdodDtcbiAgICB2YXIgbGF5b3V0Vmlld3BvcnQgPSBpc0xheW91dFZpZXdwb3J0KCk7XG5cbiAgICBpZiAobGF5b3V0Vmlld3BvcnQgfHwgIWxheW91dFZpZXdwb3J0ICYmIHN0cmF0ZWd5ID09PSAnZml4ZWQnKSB7XG4gICAgICB4ID0gdmlzdWFsVmlld3BvcnQub2Zmc2V0TGVmdDtcbiAgICAgIHkgPSB2aXN1YWxWaWV3cG9ydC5vZmZzZXRUb3A7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgeDogeCArIGdldFdpbmRvd1Njcm9sbEJhclgoZWxlbWVudCksXG4gICAgeTogeVxuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFdpbmRvdyhub2RlKSB7XG4gIGlmIChub2RlID09IG51bGwpIHtcbiAgICByZXR1cm4gd2luZG93O1xuICB9XG5cbiAgaWYgKG5vZGUudG9TdHJpbmcoKSAhPT0gJ1tvYmplY3QgV2luZG93XScpIHtcbiAgICB2YXIgb3duZXJEb2N1bWVudCA9IG5vZGUub3duZXJEb2N1bWVudDtcbiAgICByZXR1cm4gb3duZXJEb2N1bWVudCA/IG93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcgfHwgd2luZG93IDogd2luZG93O1xuICB9XG5cbiAgcmV0dXJuIG5vZGU7XG59IiwiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFdpbmRvd1Njcm9sbChub2RlKSB7XG4gIHZhciB3aW4gPSBnZXRXaW5kb3cobm9kZSk7XG4gIHZhciBzY3JvbGxMZWZ0ID0gd2luLnBhZ2VYT2Zmc2V0O1xuICB2YXIgc2Nyb2xsVG9wID0gd2luLnBhZ2VZT2Zmc2V0O1xuICByZXR1cm4ge1xuICAgIHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsXG4gICAgc2Nyb2xsVG9wOiBzY3JvbGxUb3BcbiAgfTtcbn0iLCJpbXBvcnQgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGZyb20gXCIuL2dldEJvdW5kaW5nQ2xpZW50UmVjdC5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRXaW5kb3dTY3JvbGwgZnJvbSBcIi4vZ2V0V2luZG93U2Nyb2xsLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRXaW5kb3dTY3JvbGxCYXJYKGVsZW1lbnQpIHtcbiAgLy8gSWYgPGh0bWw+IGhhcyBhIENTUyB3aWR0aCBncmVhdGVyIHRoYW4gdGhlIHZpZXdwb3J0LCB0aGVuIHRoaXMgd2lsbCBiZVxuICAvLyBpbmNvcnJlY3QgZm9yIFJUTC5cbiAgLy8gUG9wcGVyIDEgaXMgYnJva2VuIGluIHRoaXMgY2FzZSBhbmQgbmV2ZXIgaGFkIGEgYnVnIHJlcG9ydCBzbyBsZXQncyBhc3N1bWVcbiAgLy8gaXQncyBub3QgYW4gaXNzdWUuIEkgZG9uJ3QgdGhpbmsgYW55b25lIGV2ZXIgc3BlY2lmaWVzIHdpZHRoIG9uIDxodG1sPlxuICAvLyBhbnl3YXkuXG4gIC8vIEJyb3dzZXJzIHdoZXJlIHRoZSBsZWZ0IHNjcm9sbGJhciBkb2Vzbid0IGNhdXNlIGFuIGlzc3VlIHJlcG9ydCBgMGAgZm9yXG4gIC8vIHRoaXMgKGUuZy4gRWRnZSAyMDE5LCBJRTExLCBTYWZhcmkpXG4gIHJldHVybiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpKS5sZWZ0ICsgZ2V0V2luZG93U2Nyb2xsKGVsZW1lbnQpLnNjcm9sbExlZnQ7XG59IiwiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcblxuZnVuY3Rpb24gaXNFbGVtZW50KG5vZGUpIHtcbiAgdmFyIE93bkVsZW1lbnQgPSBnZXRXaW5kb3cobm9kZSkuRWxlbWVudDtcbiAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBPd25FbGVtZW50IHx8IG5vZGUgaW5zdGFuY2VvZiBFbGVtZW50O1xufVxuXG5mdW5jdGlvbiBpc0hUTUxFbGVtZW50KG5vZGUpIHtcbiAgdmFyIE93bkVsZW1lbnQgPSBnZXRXaW5kb3cobm9kZSkuSFRNTEVsZW1lbnQ7XG4gIHJldHVybiBub2RlIGluc3RhbmNlb2YgT3duRWxlbWVudCB8fCBub2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGlzU2hhZG93Um9vdChub2RlKSB7XG4gIC8vIElFIDExIGhhcyBubyBTaGFkb3dSb290XG4gIGlmICh0eXBlb2YgU2hhZG93Um9vdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgT3duRWxlbWVudCA9IGdldFdpbmRvdyhub2RlKS5TaGFkb3dSb290O1xuICByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIE93bkVsZW1lbnQgfHwgbm9kZSBpbnN0YW5jZW9mIFNoYWRvd1Jvb3Q7XG59XG5cbmV4cG9ydCB7IGlzRWxlbWVudCwgaXNIVE1MRWxlbWVudCwgaXNTaGFkb3dSb290IH07IiwiaW1wb3J0IGdldFVBU3RyaW5nIGZyb20gXCIuLi91dGlscy91c2VyQWdlbnQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzTGF5b3V0Vmlld3BvcnQoKSB7XG4gIHJldHVybiAhL14oKD8hY2hyb21lfGFuZHJvaWQpLikqc2FmYXJpL2kudGVzdChnZXRVQVN0cmluZygpKTtcbn0iLCJpbXBvcnQgZ2V0Q29tcHV0ZWRTdHlsZSBmcm9tIFwiLi9nZXRDb21wdXRlZFN0eWxlLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1Njcm9sbFBhcmVudChlbGVtZW50KSB7XG4gIC8vIEZpcmVmb3ggd2FudHMgdXMgdG8gY2hlY2sgYC14YCBhbmQgYC15YCB2YXJpYXRpb25zIGFzIHdlbGxcbiAgdmFyIF9nZXRDb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KSxcbiAgICAgIG92ZXJmbG93ID0gX2dldENvbXB1dGVkU3R5bGUub3ZlcmZsb3csXG4gICAgICBvdmVyZmxvd1ggPSBfZ2V0Q29tcHV0ZWRTdHlsZS5vdmVyZmxvd1gsXG4gICAgICBvdmVyZmxvd1kgPSBfZ2V0Q29tcHV0ZWRTdHlsZS5vdmVyZmxvd1k7XG5cbiAgcmV0dXJuIC9hdXRvfHNjcm9sbHxvdmVybGF5fGhpZGRlbi8udGVzdChvdmVyZmxvdyArIG92ZXJmbG93WSArIG92ZXJmbG93WCk7XG59IiwiaW1wb3J0IGdldE5vZGVOYW1lIGZyb20gXCIuL2dldE5vZGVOYW1lLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1RhYmxlRWxlbWVudChlbGVtZW50KSB7XG4gIHJldHVybiBbJ3RhYmxlJywgJ3RkJywgJ3RoJ10uaW5kZXhPZihnZXROb2RlTmFtZShlbGVtZW50KSkgPj0gMDtcbn0iLCJpbXBvcnQgZ2V0U2Nyb2xsUGFyZW50IGZyb20gXCIuL2dldFNjcm9sbFBhcmVudC5qc1wiO1xuaW1wb3J0IGdldFBhcmVudE5vZGUgZnJvbSBcIi4vZ2V0UGFyZW50Tm9kZS5qc1wiO1xuaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBpc1Njcm9sbFBhcmVudCBmcm9tIFwiLi9pc1Njcm9sbFBhcmVudC5qc1wiO1xuLypcbmdpdmVuIGEgRE9NIGVsZW1lbnQsIHJldHVybiB0aGUgbGlzdCBvZiBhbGwgc2Nyb2xsIHBhcmVudHMsIHVwIHRoZSBsaXN0IG9mIGFuY2Vzb3JzXG51bnRpbCB3ZSBnZXQgdG8gdGhlIHRvcCB3aW5kb3cgb2JqZWN0LiBUaGlzIGxpc3QgaXMgd2hhdCB3ZSBhdHRhY2ggc2Nyb2xsIGxpc3RlbmVyc1xudG8sIGJlY2F1c2UgaWYgYW55IG9mIHRoZXNlIHBhcmVudCBlbGVtZW50cyBzY3JvbGwsIHdlJ2xsIG5lZWQgdG8gcmUtY2FsY3VsYXRlIHRoZVxucmVmZXJlbmNlIGVsZW1lbnQncyBwb3NpdGlvbi5cbiovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxpc3RTY3JvbGxQYXJlbnRzKGVsZW1lbnQsIGxpc3QpIHtcbiAgdmFyIF9lbGVtZW50JG93bmVyRG9jdW1lbjtcblxuICBpZiAobGlzdCA9PT0gdm9pZCAwKSB7XG4gICAgbGlzdCA9IFtdO1xuICB9XG5cbiAgdmFyIHNjcm9sbFBhcmVudCA9IGdldFNjcm9sbFBhcmVudChlbGVtZW50KTtcbiAgdmFyIGlzQm9keSA9IHNjcm9sbFBhcmVudCA9PT0gKChfZWxlbWVudCRvd25lckRvY3VtZW4gPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQpID09IG51bGwgPyB2b2lkIDAgOiBfZWxlbWVudCRvd25lckRvY3VtZW4uYm9keSk7XG4gIHZhciB3aW4gPSBnZXRXaW5kb3coc2Nyb2xsUGFyZW50KTtcbiAgdmFyIHRhcmdldCA9IGlzQm9keSA/IFt3aW5dLmNvbmNhdCh3aW4udmlzdWFsVmlld3BvcnQgfHwgW10sIGlzU2Nyb2xsUGFyZW50KHNjcm9sbFBhcmVudCkgPyBzY3JvbGxQYXJlbnQgOiBbXSkgOiBzY3JvbGxQYXJlbnQ7XG4gIHZhciB1cGRhdGVkTGlzdCA9IGxpc3QuY29uY2F0KHRhcmdldCk7XG4gIHJldHVybiBpc0JvZHkgPyB1cGRhdGVkTGlzdCA6IC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLWNhbGxdOiBpc0JvZHkgdGVsbHMgdXMgdGFyZ2V0IHdpbGwgYmUgYW4gSFRNTEVsZW1lbnQgaGVyZVxuICB1cGRhdGVkTGlzdC5jb25jYXQobGlzdFNjcm9sbFBhcmVudHMoZ2V0UGFyZW50Tm9kZSh0YXJnZXQpKSk7XG59IiwiZXhwb3J0IHZhciB0b3AgPSAndG9wJztcbmV4cG9ydCB2YXIgYm90dG9tID0gJ2JvdHRvbSc7XG5leHBvcnQgdmFyIHJpZ2h0ID0gJ3JpZ2h0JztcbmV4cG9ydCB2YXIgbGVmdCA9ICdsZWZ0JztcbmV4cG9ydCB2YXIgYXV0byA9ICdhdXRvJztcbmV4cG9ydCB2YXIgYmFzZVBsYWNlbWVudHMgPSBbdG9wLCBib3R0b20sIHJpZ2h0LCBsZWZ0XTtcbmV4cG9ydCB2YXIgc3RhcnQgPSAnc3RhcnQnO1xuZXhwb3J0IHZhciBlbmQgPSAnZW5kJztcbmV4cG9ydCB2YXIgY2xpcHBpbmdQYXJlbnRzID0gJ2NsaXBwaW5nUGFyZW50cyc7XG5leHBvcnQgdmFyIHZpZXdwb3J0ID0gJ3ZpZXdwb3J0JztcbmV4cG9ydCB2YXIgcG9wcGVyID0gJ3BvcHBlcic7XG5leHBvcnQgdmFyIHJlZmVyZW5jZSA9ICdyZWZlcmVuY2UnO1xuZXhwb3J0IHZhciB2YXJpYXRpb25QbGFjZW1lbnRzID0gLyojX19QVVJFX18qL2Jhc2VQbGFjZW1lbnRzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIGFjYy5jb25jYXQoW3BsYWNlbWVudCArIFwiLVwiICsgc3RhcnQsIHBsYWNlbWVudCArIFwiLVwiICsgZW5kXSk7XG59LCBbXSk7XG5leHBvcnQgdmFyIHBsYWNlbWVudHMgPSAvKiNfX1BVUkVfXyovW10uY29uY2F0KGJhc2VQbGFjZW1lbnRzLCBbYXV0b10pLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIGFjYy5jb25jYXQoW3BsYWNlbWVudCwgcGxhY2VtZW50ICsgXCItXCIgKyBzdGFydCwgcGxhY2VtZW50ICsgXCItXCIgKyBlbmRdKTtcbn0sIFtdKTsgLy8gbW9kaWZpZXJzIHRoYXQgbmVlZCB0byByZWFkIHRoZSBET01cblxuZXhwb3J0IHZhciBiZWZvcmVSZWFkID0gJ2JlZm9yZVJlYWQnO1xuZXhwb3J0IHZhciByZWFkID0gJ3JlYWQnO1xuZXhwb3J0IHZhciBhZnRlclJlYWQgPSAnYWZ0ZXJSZWFkJzsgLy8gcHVyZS1sb2dpYyBtb2RpZmllcnNcblxuZXhwb3J0IHZhciBiZWZvcmVNYWluID0gJ2JlZm9yZU1haW4nO1xuZXhwb3J0IHZhciBtYWluID0gJ21haW4nO1xuZXhwb3J0IHZhciBhZnRlck1haW4gPSAnYWZ0ZXJNYWluJzsgLy8gbW9kaWZpZXIgd2l0aCB0aGUgcHVycG9zZSB0byB3cml0ZSB0byB0aGUgRE9NIChvciB3cml0ZSBpbnRvIGEgZnJhbWV3b3JrIHN0YXRlKVxuXG5leHBvcnQgdmFyIGJlZm9yZVdyaXRlID0gJ2JlZm9yZVdyaXRlJztcbmV4cG9ydCB2YXIgd3JpdGUgPSAnd3JpdGUnO1xuZXhwb3J0IHZhciBhZnRlcldyaXRlID0gJ2FmdGVyV3JpdGUnO1xuZXhwb3J0IHZhciBtb2RpZmllclBoYXNlcyA9IFtiZWZvcmVSZWFkLCByZWFkLCBhZnRlclJlYWQsIGJlZm9yZU1haW4sIG1haW4sIGFmdGVyTWFpbiwgYmVmb3JlV3JpdGUsIHdyaXRlLCBhZnRlcldyaXRlXTsiLCJpbXBvcnQgZ2V0Tm9kZU5hbWUgZnJvbSBcIi4uL2RvbS11dGlscy9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IHsgaXNIVE1MRWxlbWVudCB9IGZyb20gXCIuLi9kb20tdXRpbHMvaW5zdGFuY2VPZi5qc1wiOyAvLyBUaGlzIG1vZGlmaWVyIHRha2VzIHRoZSBzdHlsZXMgcHJlcGFyZWQgYnkgdGhlIGBjb21wdXRlU3R5bGVzYCBtb2RpZmllclxuLy8gYW5kIGFwcGxpZXMgdGhlbSB0byB0aGUgSFRNTEVsZW1lbnRzIHN1Y2ggYXMgcG9wcGVyIGFuZCBhcnJvd1xuXG5mdW5jdGlvbiBhcHBseVN0eWxlcyhfcmVmKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYuc3RhdGU7XG4gIE9iamVjdC5rZXlzKHN0YXRlLmVsZW1lbnRzKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdmFyIHN0eWxlID0gc3RhdGUuc3R5bGVzW25hbWVdIHx8IHt9O1xuICAgIHZhciBhdHRyaWJ1dGVzID0gc3RhdGUuYXR0cmlidXRlc1tuYW1lXSB8fCB7fTtcbiAgICB2YXIgZWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzW25hbWVdOyAvLyBhcnJvdyBpcyBvcHRpb25hbCArIHZpcnR1YWwgZWxlbWVudHNcblxuICAgIGlmICghaXNIVE1MRWxlbWVudChlbGVtZW50KSB8fCAhZ2V0Tm9kZU5hbWUoZWxlbWVudCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IC8vIEZsb3cgZG9lc24ndCBzdXBwb3J0IHRvIGV4dGVuZCB0aGlzIHByb3BlcnR5LCBidXQgaXQncyB0aGUgbW9zdFxuICAgIC8vIGVmZmVjdGl2ZSB3YXkgdG8gYXBwbHkgc3R5bGVzIHRvIGFuIEhUTUxFbGVtZW50XG4gICAgLy8gJEZsb3dGaXhNZVtjYW5ub3Qtd3JpdGVdXG5cblxuICAgIE9iamVjdC5hc3NpZ24oZWxlbWVudC5zdHlsZSwgc3R5bGUpO1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGF0dHJpYnV0ZXNbbmFtZV07XG5cbiAgICAgIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSA9PT0gdHJ1ZSA/ICcnIDogdmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZWZmZWN0KF9yZWYyKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYyLnN0YXRlO1xuICB2YXIgaW5pdGlhbFN0eWxlcyA9IHtcbiAgICBwb3BwZXI6IHtcbiAgICAgIHBvc2l0aW9uOiBzdGF0ZS5vcHRpb25zLnN0cmF0ZWd5LFxuICAgICAgbGVmdDogJzAnLFxuICAgICAgdG9wOiAnMCcsXG4gICAgICBtYXJnaW46ICcwJ1xuICAgIH0sXG4gICAgYXJyb3c6IHtcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXG4gICAgfSxcbiAgICByZWZlcmVuY2U6IHt9XG4gIH07XG4gIE9iamVjdC5hc3NpZ24oc3RhdGUuZWxlbWVudHMucG9wcGVyLnN0eWxlLCBpbml0aWFsU3R5bGVzLnBvcHBlcik7XG4gIHN0YXRlLnN0eWxlcyA9IGluaXRpYWxTdHlsZXM7XG5cbiAgaWYgKHN0YXRlLmVsZW1lbnRzLmFycm93KSB7XG4gICAgT2JqZWN0LmFzc2lnbihzdGF0ZS5lbGVtZW50cy5hcnJvdy5zdHlsZSwgaW5pdGlhbFN0eWxlcy5hcnJvdyk7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIE9iamVjdC5rZXlzKHN0YXRlLmVsZW1lbnRzKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICB2YXIgZWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzW25hbWVdO1xuICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBzdGF0ZS5hdHRyaWJ1dGVzW25hbWVdIHx8IHt9O1xuICAgICAgdmFyIHN0eWxlUHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHN0YXRlLnN0eWxlcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSA/IHN0YXRlLnN0eWxlc1tuYW1lXSA6IGluaXRpYWxTdHlsZXNbbmFtZV0pOyAvLyBTZXQgYWxsIHZhbHVlcyB0byBhbiBlbXB0eSBzdHJpbmcgdG8gdW5zZXQgdGhlbVxuXG4gICAgICB2YXIgc3R5bGUgPSBzdHlsZVByb3BlcnRpZXMucmVkdWNlKGZ1bmN0aW9uIChzdHlsZSwgcHJvcGVydHkpIHtcbiAgICAgICAgc3R5bGVbcHJvcGVydHldID0gJyc7XG4gICAgICAgIHJldHVybiBzdHlsZTtcbiAgICAgIH0sIHt9KTsgLy8gYXJyb3cgaXMgb3B0aW9uYWwgKyB2aXJ0dWFsIGVsZW1lbnRzXG5cbiAgICAgIGlmICghaXNIVE1MRWxlbWVudChlbGVtZW50KSB8fCAhZ2V0Tm9kZU5hbWUoZWxlbWVudCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBPYmplY3QuYXNzaWduKGVsZW1lbnQuc3R5bGUsIHN0eWxlKTtcbiAgICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKGF0dHJpYnV0ZSkge1xuICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdhcHBseVN0eWxlcycsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnd3JpdGUnLFxuICBmbjogYXBwbHlTdHlsZXMsXG4gIGVmZmVjdDogZWZmZWN0LFxuICByZXF1aXJlczogWydjb21wdXRlU3R5bGVzJ11cbn07IiwiaW1wb3J0IGdldEJhc2VQbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRMYXlvdXRSZWN0IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0TGF5b3V0UmVjdC5qc1wiO1xuaW1wb3J0IGNvbnRhaW5zIGZyb20gXCIuLi9kb20tdXRpbHMvY29udGFpbnMuanNcIjtcbmltcG9ydCBnZXRPZmZzZXRQYXJlbnQgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRPZmZzZXRQYXJlbnQuanNcIjtcbmltcG9ydCBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldE1haW5BeGlzRnJvbVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IHsgd2l0aGluIH0gZnJvbSBcIi4uL3V0aWxzL3dpdGhpbi5qc1wiO1xuaW1wb3J0IG1lcmdlUGFkZGluZ09iamVjdCBmcm9tIFwiLi4vdXRpbHMvbWVyZ2VQYWRkaW5nT2JqZWN0LmpzXCI7XG5pbXBvcnQgZXhwYW5kVG9IYXNoTWFwIGZyb20gXCIuLi91dGlscy9leHBhbmRUb0hhc2hNYXAuanNcIjtcbmltcG9ydCB7IGxlZnQsIHJpZ2h0LCBiYXNlUGxhY2VtZW50cywgdG9wLCBib3R0b20gfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCB7IGlzSFRNTEVsZW1lbnQgfSBmcm9tIFwiLi4vZG9tLXV0aWxzL2luc3RhbmNlT2YuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG52YXIgdG9QYWRkaW5nT2JqZWN0ID0gZnVuY3Rpb24gdG9QYWRkaW5nT2JqZWN0KHBhZGRpbmcsIHN0YXRlKSB7XG4gIHBhZGRpbmcgPSB0eXBlb2YgcGFkZGluZyA9PT0gJ2Z1bmN0aW9uJyA/IHBhZGRpbmcoT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucmVjdHMsIHtcbiAgICBwbGFjZW1lbnQ6IHN0YXRlLnBsYWNlbWVudFxuICB9KSkgOiBwYWRkaW5nO1xuICByZXR1cm4gbWVyZ2VQYWRkaW5nT2JqZWN0KHR5cGVvZiBwYWRkaW5nICE9PSAnbnVtYmVyJyA/IHBhZGRpbmcgOiBleHBhbmRUb0hhc2hNYXAocGFkZGluZywgYmFzZVBsYWNlbWVudHMpKTtcbn07XG5cbmZ1bmN0aW9uIGFycm93KF9yZWYpIHtcbiAgdmFyIF9zdGF0ZSRtb2RpZmllcnNEYXRhJDtcblxuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlLFxuICAgICAgbmFtZSA9IF9yZWYubmFtZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmLm9wdGlvbnM7XG4gIHZhciBhcnJvd0VsZW1lbnQgPSBzdGF0ZS5lbGVtZW50cy5hcnJvdztcbiAgdmFyIHBvcHBlck9mZnNldHMgPSBzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHM7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gZ2V0QmFzZVBsYWNlbWVudChzdGF0ZS5wbGFjZW1lbnQpO1xuICB2YXIgYXhpcyA9IGdldE1haW5BeGlzRnJvbVBsYWNlbWVudChiYXNlUGxhY2VtZW50KTtcbiAgdmFyIGlzVmVydGljYWwgPSBbbGVmdCwgcmlnaHRdLmluZGV4T2YoYmFzZVBsYWNlbWVudCkgPj0gMDtcbiAgdmFyIGxlbiA9IGlzVmVydGljYWwgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG5cbiAgaWYgKCFhcnJvd0VsZW1lbnQgfHwgIXBvcHBlck9mZnNldHMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgcGFkZGluZ09iamVjdCA9IHRvUGFkZGluZ09iamVjdChvcHRpb25zLnBhZGRpbmcsIHN0YXRlKTtcbiAgdmFyIGFycm93UmVjdCA9IGdldExheW91dFJlY3QoYXJyb3dFbGVtZW50KTtcbiAgdmFyIG1pblByb3AgPSBheGlzID09PSAneScgPyB0b3AgOiBsZWZ0O1xuICB2YXIgbWF4UHJvcCA9IGF4aXMgPT09ICd5JyA/IGJvdHRvbSA6IHJpZ2h0O1xuICB2YXIgZW5kRGlmZiA9IHN0YXRlLnJlY3RzLnJlZmVyZW5jZVtsZW5dICsgc3RhdGUucmVjdHMucmVmZXJlbmNlW2F4aXNdIC0gcG9wcGVyT2Zmc2V0c1theGlzXSAtIHN0YXRlLnJlY3RzLnBvcHBlcltsZW5dO1xuICB2YXIgc3RhcnREaWZmID0gcG9wcGVyT2Zmc2V0c1theGlzXSAtIHN0YXRlLnJlY3RzLnJlZmVyZW5jZVtheGlzXTtcbiAgdmFyIGFycm93T2Zmc2V0UGFyZW50ID0gZ2V0T2Zmc2V0UGFyZW50KGFycm93RWxlbWVudCk7XG4gIHZhciBjbGllbnRTaXplID0gYXJyb3dPZmZzZXRQYXJlbnQgPyBheGlzID09PSAneScgPyBhcnJvd09mZnNldFBhcmVudC5jbGllbnRIZWlnaHQgfHwgMCA6IGFycm93T2Zmc2V0UGFyZW50LmNsaWVudFdpZHRoIHx8IDAgOiAwO1xuICB2YXIgY2VudGVyVG9SZWZlcmVuY2UgPSBlbmREaWZmIC8gMiAtIHN0YXJ0RGlmZiAvIDI7IC8vIE1ha2Ugc3VyZSB0aGUgYXJyb3cgZG9lc24ndCBvdmVyZmxvdyB0aGUgcG9wcGVyIGlmIHRoZSBjZW50ZXIgcG9pbnQgaXNcbiAgLy8gb3V0c2lkZSBvZiB0aGUgcG9wcGVyIGJvdW5kc1xuXG4gIHZhciBtaW4gPSBwYWRkaW5nT2JqZWN0W21pblByb3BdO1xuICB2YXIgbWF4ID0gY2xpZW50U2l6ZSAtIGFycm93UmVjdFtsZW5dIC0gcGFkZGluZ09iamVjdFttYXhQcm9wXTtcbiAgdmFyIGNlbnRlciA9IGNsaWVudFNpemUgLyAyIC0gYXJyb3dSZWN0W2xlbl0gLyAyICsgY2VudGVyVG9SZWZlcmVuY2U7XG4gIHZhciBvZmZzZXQgPSB3aXRoaW4obWluLCBjZW50ZXIsIG1heCk7IC8vIFByZXZlbnRzIGJyZWFraW5nIHN5bnRheCBoaWdobGlnaHRpbmcuLi5cblxuICB2YXIgYXhpc1Byb3AgPSBheGlzO1xuICBzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdID0gKF9zdGF0ZSRtb2RpZmllcnNEYXRhJCA9IHt9LCBfc3RhdGUkbW9kaWZpZXJzRGF0YSRbYXhpc1Byb3BdID0gb2Zmc2V0LCBfc3RhdGUkbW9kaWZpZXJzRGF0YSQuY2VudGVyT2Zmc2V0ID0gb2Zmc2V0IC0gY2VudGVyLCBfc3RhdGUkbW9kaWZpZXJzRGF0YSQpO1xufVxuXG5mdW5jdGlvbiBlZmZlY3QoX3JlZjIpIHtcbiAgdmFyIHN0YXRlID0gX3JlZjIuc3RhdGUsXG4gICAgICBvcHRpb25zID0gX3JlZjIub3B0aW9ucztcbiAgdmFyIF9vcHRpb25zJGVsZW1lbnQgPSBvcHRpb25zLmVsZW1lbnQsXG4gICAgICBhcnJvd0VsZW1lbnQgPSBfb3B0aW9ucyRlbGVtZW50ID09PSB2b2lkIDAgPyAnW2RhdGEtcG9wcGVyLWFycm93XScgOiBfb3B0aW9ucyRlbGVtZW50O1xuXG4gIGlmIChhcnJvd0VsZW1lbnQgPT0gbnVsbCkge1xuICAgIHJldHVybjtcbiAgfSAvLyBDU1Mgc2VsZWN0b3JcblxuXG4gIGlmICh0eXBlb2YgYXJyb3dFbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgIGFycm93RWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzLnBvcHBlci5xdWVyeVNlbGVjdG9yKGFycm93RWxlbWVudCk7XG5cbiAgICBpZiAoIWFycm93RWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICBpZiAoIWlzSFRNTEVsZW1lbnQoYXJyb3dFbGVtZW50KSkge1xuICAgICAgY29uc29sZS5lcnJvcihbJ1BvcHBlcjogXCJhcnJvd1wiIGVsZW1lbnQgbXVzdCBiZSBhbiBIVE1MRWxlbWVudCAobm90IGFuIFNWR0VsZW1lbnQpLicsICdUbyB1c2UgYW4gU1ZHIGFycm93LCB3cmFwIGl0IGluIGFuIEhUTUxFbGVtZW50IHRoYXQgd2lsbCBiZSB1c2VkIGFzJywgJ3RoZSBhcnJvdy4nXS5qb2luKCcgJykpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29udGFpbnMoc3RhdGUuZWxlbWVudHMucG9wcGVyLCBhcnJvd0VsZW1lbnQpKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgY29uc29sZS5lcnJvcihbJ1BvcHBlcjogXCJhcnJvd1wiIG1vZGlmaWVyXFwncyBgZWxlbWVudGAgbXVzdCBiZSBhIGNoaWxkIG9mIHRoZSBwb3BwZXInLCAnZWxlbWVudC4nXS5qb2luKCcgJykpO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxuXG4gIHN0YXRlLmVsZW1lbnRzLmFycm93ID0gYXJyb3dFbGVtZW50O1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnYXJyb3cnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ21haW4nLFxuICBmbjogYXJyb3csXG4gIGVmZmVjdDogZWZmZWN0LFxuICByZXF1aXJlczogWydwb3BwZXJPZmZzZXRzJ10sXG4gIHJlcXVpcmVzSWZFeGlzdHM6IFsncHJldmVudE92ZXJmbG93J11cbn07IiwiaW1wb3J0IHsgdG9wLCBsZWZ0LCByaWdodCwgYm90dG9tLCBlbmQgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCBnZXRPZmZzZXRQYXJlbnQgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRPZmZzZXRQYXJlbnQuanNcIjtcbmltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4uL2RvbS11dGlscy9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRDb21wdXRlZFN0eWxlIGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0Q29tcHV0ZWRTdHlsZS5qc1wiO1xuaW1wb3J0IGdldEJhc2VQbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRWYXJpYXRpb24gZnJvbSBcIi4uL3V0aWxzL2dldFZhcmlhdGlvbi5qc1wiO1xuaW1wb3J0IHsgcm91bmQgfSBmcm9tIFwiLi4vdXRpbHMvbWF0aC5qc1wiOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbnZhciB1bnNldFNpZGVzID0ge1xuICB0b3A6ICdhdXRvJyxcbiAgcmlnaHQ6ICdhdXRvJyxcbiAgYm90dG9tOiAnYXV0bycsXG4gIGxlZnQ6ICdhdXRvJ1xufTsgLy8gUm91bmQgdGhlIG9mZnNldHMgdG8gdGhlIG5lYXJlc3Qgc3VpdGFibGUgc3VicGl4ZWwgYmFzZWQgb24gdGhlIERQUi5cbi8vIFpvb21pbmcgY2FuIGNoYW5nZSB0aGUgRFBSLCBidXQgaXQgc2VlbXMgdG8gcmVwb3J0IGEgdmFsdWUgdGhhdCB3aWxsXG4vLyBjbGVhbmx5IGRpdmlkZSB0aGUgdmFsdWVzIGludG8gdGhlIGFwcHJvcHJpYXRlIHN1YnBpeGVscy5cblxuZnVuY3Rpb24gcm91bmRPZmZzZXRzQnlEUFIoX3JlZiwgd2luKSB7XG4gIHZhciB4ID0gX3JlZi54LFxuICAgICAgeSA9IF9yZWYueTtcbiAgdmFyIGRwciA9IHdpbi5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG4gIHJldHVybiB7XG4gICAgeDogcm91bmQoeCAqIGRwcikgLyBkcHIgfHwgMCxcbiAgICB5OiByb3VuZCh5ICogZHByKSAvIGRwciB8fCAwXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXBUb1N0eWxlcyhfcmVmMikge1xuICB2YXIgX09iamVjdCRhc3NpZ24yO1xuXG4gIHZhciBwb3BwZXIgPSBfcmVmMi5wb3BwZXIsXG4gICAgICBwb3BwZXJSZWN0ID0gX3JlZjIucG9wcGVyUmVjdCxcbiAgICAgIHBsYWNlbWVudCA9IF9yZWYyLnBsYWNlbWVudCxcbiAgICAgIHZhcmlhdGlvbiA9IF9yZWYyLnZhcmlhdGlvbixcbiAgICAgIG9mZnNldHMgPSBfcmVmMi5vZmZzZXRzLFxuICAgICAgcG9zaXRpb24gPSBfcmVmMi5wb3NpdGlvbixcbiAgICAgIGdwdUFjY2VsZXJhdGlvbiA9IF9yZWYyLmdwdUFjY2VsZXJhdGlvbixcbiAgICAgIGFkYXB0aXZlID0gX3JlZjIuYWRhcHRpdmUsXG4gICAgICByb3VuZE9mZnNldHMgPSBfcmVmMi5yb3VuZE9mZnNldHMsXG4gICAgICBpc0ZpeGVkID0gX3JlZjIuaXNGaXhlZDtcbiAgdmFyIF9vZmZzZXRzJHggPSBvZmZzZXRzLngsXG4gICAgICB4ID0gX29mZnNldHMkeCA9PT0gdm9pZCAwID8gMCA6IF9vZmZzZXRzJHgsXG4gICAgICBfb2Zmc2V0cyR5ID0gb2Zmc2V0cy55LFxuICAgICAgeSA9IF9vZmZzZXRzJHkgPT09IHZvaWQgMCA/IDAgOiBfb2Zmc2V0cyR5O1xuXG4gIHZhciBfcmVmMyA9IHR5cGVvZiByb3VuZE9mZnNldHMgPT09ICdmdW5jdGlvbicgPyByb3VuZE9mZnNldHMoe1xuICAgIHg6IHgsXG4gICAgeTogeVxuICB9KSA6IHtcbiAgICB4OiB4LFxuICAgIHk6IHlcbiAgfTtcblxuICB4ID0gX3JlZjMueDtcbiAgeSA9IF9yZWYzLnk7XG4gIHZhciBoYXNYID0gb2Zmc2V0cy5oYXNPd25Qcm9wZXJ0eSgneCcpO1xuICB2YXIgaGFzWSA9IG9mZnNldHMuaGFzT3duUHJvcGVydHkoJ3knKTtcbiAgdmFyIHNpZGVYID0gbGVmdDtcbiAgdmFyIHNpZGVZID0gdG9wO1xuICB2YXIgd2luID0gd2luZG93O1xuXG4gIGlmIChhZGFwdGl2ZSkge1xuICAgIHZhciBvZmZzZXRQYXJlbnQgPSBnZXRPZmZzZXRQYXJlbnQocG9wcGVyKTtcbiAgICB2YXIgaGVpZ2h0UHJvcCA9ICdjbGllbnRIZWlnaHQnO1xuICAgIHZhciB3aWR0aFByb3AgPSAnY2xpZW50V2lkdGgnO1xuXG4gICAgaWYgKG9mZnNldFBhcmVudCA9PT0gZ2V0V2luZG93KHBvcHBlcikpIHtcbiAgICAgIG9mZnNldFBhcmVudCA9IGdldERvY3VtZW50RWxlbWVudChwb3BwZXIpO1xuXG4gICAgICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZShvZmZzZXRQYXJlbnQpLnBvc2l0aW9uICE9PSAnc3RhdGljJyAmJiBwb3NpdGlvbiA9PT0gJ2Fic29sdXRlJykge1xuICAgICAgICBoZWlnaHRQcm9wID0gJ3Njcm9sbEhlaWdodCc7XG4gICAgICAgIHdpZHRoUHJvcCA9ICdzY3JvbGxXaWR0aCc7XG4gICAgICB9XG4gICAgfSAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS1jYXN0XTogZm9yY2UgdHlwZSByZWZpbmVtZW50LCB3ZSBjb21wYXJlIG9mZnNldFBhcmVudCB3aXRoIHdpbmRvdyBhYm92ZSwgYnV0IEZsb3cgZG9lc24ndCBkZXRlY3QgaXRcblxuXG4gICAgb2Zmc2V0UGFyZW50ID0gb2Zmc2V0UGFyZW50O1xuXG4gICAgaWYgKHBsYWNlbWVudCA9PT0gdG9wIHx8IChwbGFjZW1lbnQgPT09IGxlZnQgfHwgcGxhY2VtZW50ID09PSByaWdodCkgJiYgdmFyaWF0aW9uID09PSBlbmQpIHtcbiAgICAgIHNpZGVZID0gYm90dG9tO1xuICAgICAgdmFyIG9mZnNldFkgPSBpc0ZpeGVkICYmIG9mZnNldFBhcmVudCA9PT0gd2luICYmIHdpbi52aXN1YWxWaWV3cG9ydCA/IHdpbi52aXN1YWxWaWV3cG9ydC5oZWlnaHQgOiAvLyAkRmxvd0ZpeE1lW3Byb3AtbWlzc2luZ11cbiAgICAgIG9mZnNldFBhcmVudFtoZWlnaHRQcm9wXTtcbiAgICAgIHkgLT0gb2Zmc2V0WSAtIHBvcHBlclJlY3QuaGVpZ2h0O1xuICAgICAgeSAqPSBncHVBY2NlbGVyYXRpb24gPyAxIDogLTE7XG4gICAgfVxuXG4gICAgaWYgKHBsYWNlbWVudCA9PT0gbGVmdCB8fCAocGxhY2VtZW50ID09PSB0b3AgfHwgcGxhY2VtZW50ID09PSBib3R0b20pICYmIHZhcmlhdGlvbiA9PT0gZW5kKSB7XG4gICAgICBzaWRlWCA9IHJpZ2h0O1xuICAgICAgdmFyIG9mZnNldFggPSBpc0ZpeGVkICYmIG9mZnNldFBhcmVudCA9PT0gd2luICYmIHdpbi52aXN1YWxWaWV3cG9ydCA/IHdpbi52aXN1YWxWaWV3cG9ydC53aWR0aCA6IC8vICRGbG93Rml4TWVbcHJvcC1taXNzaW5nXVxuICAgICAgb2Zmc2V0UGFyZW50W3dpZHRoUHJvcF07XG4gICAgICB4IC09IG9mZnNldFggLSBwb3BwZXJSZWN0LndpZHRoO1xuICAgICAgeCAqPSBncHVBY2NlbGVyYXRpb24gPyAxIDogLTE7XG4gICAgfVxuICB9XG5cbiAgdmFyIGNvbW1vblN0eWxlcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgIHBvc2l0aW9uOiBwb3NpdGlvblxuICB9LCBhZGFwdGl2ZSAmJiB1bnNldFNpZGVzKTtcblxuICB2YXIgX3JlZjQgPSByb3VuZE9mZnNldHMgPT09IHRydWUgPyByb3VuZE9mZnNldHNCeURQUih7XG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH0sIGdldFdpbmRvdyhwb3BwZXIpKSA6IHtcbiAgICB4OiB4LFxuICAgIHk6IHlcbiAgfTtcblxuICB4ID0gX3JlZjQueDtcbiAgeSA9IF9yZWY0Lnk7XG5cbiAgaWYgKGdwdUFjY2VsZXJhdGlvbikge1xuICAgIHZhciBfT2JqZWN0JGFzc2lnbjtcblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25TdHlsZXMsIChfT2JqZWN0JGFzc2lnbiA9IHt9LCBfT2JqZWN0JGFzc2lnbltzaWRlWV0gPSBoYXNZID8gJzAnIDogJycsIF9PYmplY3QkYXNzaWduW3NpZGVYXSA9IGhhc1ggPyAnMCcgOiAnJywgX09iamVjdCRhc3NpZ24udHJhbnNmb3JtID0gKHdpbi5kZXZpY2VQaXhlbFJhdGlvIHx8IDEpIDw9IDEgPyBcInRyYW5zbGF0ZShcIiArIHggKyBcInB4LCBcIiArIHkgKyBcInB4KVwiIDogXCJ0cmFuc2xhdGUzZChcIiArIHggKyBcInB4LCBcIiArIHkgKyBcInB4LCAwKVwiLCBfT2JqZWN0JGFzc2lnbikpO1xuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblN0eWxlcywgKF9PYmplY3QkYXNzaWduMiA9IHt9LCBfT2JqZWN0JGFzc2lnbjJbc2lkZVldID0gaGFzWSA/IHkgKyBcInB4XCIgOiAnJywgX09iamVjdCRhc3NpZ24yW3NpZGVYXSA9IGhhc1ggPyB4ICsgXCJweFwiIDogJycsIF9PYmplY3QkYXNzaWduMi50cmFuc2Zvcm0gPSAnJywgX09iamVjdCRhc3NpZ24yKSk7XG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVTdHlsZXMoX3JlZjUpIHtcbiAgdmFyIHN0YXRlID0gX3JlZjUuc3RhdGUsXG4gICAgICBvcHRpb25zID0gX3JlZjUub3B0aW9ucztcbiAgdmFyIF9vcHRpb25zJGdwdUFjY2VsZXJhdCA9IG9wdGlvbnMuZ3B1QWNjZWxlcmF0aW9uLFxuICAgICAgZ3B1QWNjZWxlcmF0aW9uID0gX29wdGlvbnMkZ3B1QWNjZWxlcmF0ID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkZ3B1QWNjZWxlcmF0LFxuICAgICAgX29wdGlvbnMkYWRhcHRpdmUgPSBvcHRpb25zLmFkYXB0aXZlLFxuICAgICAgYWRhcHRpdmUgPSBfb3B0aW9ucyRhZGFwdGl2ZSA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJGFkYXB0aXZlLFxuICAgICAgX29wdGlvbnMkcm91bmRPZmZzZXRzID0gb3B0aW9ucy5yb3VuZE9mZnNldHMsXG4gICAgICByb3VuZE9mZnNldHMgPSBfb3B0aW9ucyRyb3VuZE9mZnNldHMgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRyb3VuZE9mZnNldHM7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgIHZhciB0cmFuc2l0aW9uUHJvcGVydHkgPSBnZXRDb21wdXRlZFN0eWxlKHN0YXRlLmVsZW1lbnRzLnBvcHBlcikudHJhbnNpdGlvblByb3BlcnR5IHx8ICcnO1xuXG4gICAgaWYgKGFkYXB0aXZlICYmIFsndHJhbnNmb3JtJywgJ3RvcCcsICdyaWdodCcsICdib3R0b20nLCAnbGVmdCddLnNvbWUoZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICByZXR1cm4gdHJhbnNpdGlvblByb3BlcnR5LmluZGV4T2YocHJvcGVydHkpID49IDA7XG4gICAgfSkpIHtcbiAgICAgIGNvbnNvbGUud2FybihbJ1BvcHBlcjogRGV0ZWN0ZWQgQ1NTIHRyYW5zaXRpb25zIG9uIGF0IGxlYXN0IG9uZSBvZiB0aGUgZm9sbG93aW5nJywgJ0NTUyBwcm9wZXJ0aWVzOiBcInRyYW5zZm9ybVwiLCBcInRvcFwiLCBcInJpZ2h0XCIsIFwiYm90dG9tXCIsIFwibGVmdFwiLicsICdcXG5cXG4nLCAnRGlzYWJsZSB0aGUgXCJjb21wdXRlU3R5bGVzXCIgbW9kaWZpZXJcXCdzIGBhZGFwdGl2ZWAgb3B0aW9uIHRvIGFsbG93JywgJ2ZvciBzbW9vdGggdHJhbnNpdGlvbnMsIG9yIHJlbW92ZSB0aGVzZSBwcm9wZXJ0aWVzIGZyb20gdGhlIENTUycsICd0cmFuc2l0aW9uIGRlY2xhcmF0aW9uIG9uIHRoZSBwb3BwZXIgZWxlbWVudCBpZiBvbmx5IHRyYW5zaXRpb25pbmcnLCAnb3BhY2l0eSBvciBiYWNrZ3JvdW5kLWNvbG9yIGZvciBleGFtcGxlLicsICdcXG5cXG4nLCAnV2UgcmVjb21tZW5kIHVzaW5nIHRoZSBwb3BwZXIgZWxlbWVudCBhcyBhIHdyYXBwZXIgYXJvdW5kIGFuIGlubmVyJywgJ2VsZW1lbnQgdGhhdCBjYW4gaGF2ZSBhbnkgQ1NTIHByb3BlcnR5IHRyYW5zaXRpb25lZCBmb3IgYW5pbWF0aW9ucy4nXS5qb2luKCcgJykpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjb21tb25TdHlsZXMgPSB7XG4gICAgcGxhY2VtZW50OiBnZXRCYXNlUGxhY2VtZW50KHN0YXRlLnBsYWNlbWVudCksXG4gICAgdmFyaWF0aW9uOiBnZXRWYXJpYXRpb24oc3RhdGUucGxhY2VtZW50KSxcbiAgICBwb3BwZXI6IHN0YXRlLmVsZW1lbnRzLnBvcHBlcixcbiAgICBwb3BwZXJSZWN0OiBzdGF0ZS5yZWN0cy5wb3BwZXIsXG4gICAgZ3B1QWNjZWxlcmF0aW9uOiBncHVBY2NlbGVyYXRpb24sXG4gICAgaXNGaXhlZDogc3RhdGUub3B0aW9ucy5zdHJhdGVneSA9PT0gJ2ZpeGVkJ1xuICB9O1xuXG4gIGlmIChzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHMgIT0gbnVsbCkge1xuICAgIHN0YXRlLnN0eWxlcy5wb3BwZXIgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5zdHlsZXMucG9wcGVyLCBtYXBUb1N0eWxlcyhPYmplY3QuYXNzaWduKHt9LCBjb21tb25TdHlsZXMsIHtcbiAgICAgIG9mZnNldHM6IHN0YXRlLm1vZGlmaWVyc0RhdGEucG9wcGVyT2Zmc2V0cyxcbiAgICAgIHBvc2l0aW9uOiBzdGF0ZS5vcHRpb25zLnN0cmF0ZWd5LFxuICAgICAgYWRhcHRpdmU6IGFkYXB0aXZlLFxuICAgICAgcm91bmRPZmZzZXRzOiByb3VuZE9mZnNldHNcbiAgICB9KSkpO1xuICB9XG5cbiAgaWYgKHN0YXRlLm1vZGlmaWVyc0RhdGEuYXJyb3cgIT0gbnVsbCkge1xuICAgIHN0YXRlLnN0eWxlcy5hcnJvdyA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnN0eWxlcy5hcnJvdywgbWFwVG9TdHlsZXMoT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uU3R5bGVzLCB7XG4gICAgICBvZmZzZXRzOiBzdGF0ZS5tb2RpZmllcnNEYXRhLmFycm93LFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBhZGFwdGl2ZTogZmFsc2UsXG4gICAgICByb3VuZE9mZnNldHM6IHJvdW5kT2Zmc2V0c1xuICAgIH0pKSk7XG4gIH1cblxuICBzdGF0ZS5hdHRyaWJ1dGVzLnBvcHBlciA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmF0dHJpYnV0ZXMucG9wcGVyLCB7XG4gICAgJ2RhdGEtcG9wcGVyLXBsYWNlbWVudCc6IHN0YXRlLnBsYWNlbWVudFxuICB9KTtcbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ2NvbXB1dGVTdHlsZXMnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ2JlZm9yZVdyaXRlJyxcbiAgZm46IGNvbXB1dGVTdHlsZXMsXG4gIGRhdGE6IHt9XG59OyIsImltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRXaW5kb3cuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG52YXIgcGFzc2l2ZSA9IHtcbiAgcGFzc2l2ZTogdHJ1ZVxufTtcblxuZnVuY3Rpb24gZWZmZWN0KF9yZWYpIHtcbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIGluc3RhbmNlID0gX3JlZi5pbnN0YW5jZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmLm9wdGlvbnM7XG4gIHZhciBfb3B0aW9ucyRzY3JvbGwgPSBvcHRpb25zLnNjcm9sbCxcbiAgICAgIHNjcm9sbCA9IF9vcHRpb25zJHNjcm9sbCA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJHNjcm9sbCxcbiAgICAgIF9vcHRpb25zJHJlc2l6ZSA9IG9wdGlvbnMucmVzaXplLFxuICAgICAgcmVzaXplID0gX29wdGlvbnMkcmVzaXplID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkcmVzaXplO1xuICB2YXIgd2luZG93ID0gZ2V0V2luZG93KHN0YXRlLmVsZW1lbnRzLnBvcHBlcik7XG4gIHZhciBzY3JvbGxQYXJlbnRzID0gW10uY29uY2F0KHN0YXRlLnNjcm9sbFBhcmVudHMucmVmZXJlbmNlLCBzdGF0ZS5zY3JvbGxQYXJlbnRzLnBvcHBlcik7XG5cbiAgaWYgKHNjcm9sbCkge1xuICAgIHNjcm9sbFBhcmVudHMuZm9yRWFjaChmdW5jdGlvbiAoc2Nyb2xsUGFyZW50KSB7XG4gICAgICBzY3JvbGxQYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgaW5zdGFuY2UudXBkYXRlLCBwYXNzaXZlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChyZXNpemUpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaW5zdGFuY2UudXBkYXRlLCBwYXNzaXZlKTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHNjcm9sbCkge1xuICAgICAgc2Nyb2xsUGFyZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChzY3JvbGxQYXJlbnQpIHtcbiAgICAgICAgc2Nyb2xsUGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGluc3RhbmNlLnVwZGF0ZSwgcGFzc2l2ZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVzaXplKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaW5zdGFuY2UudXBkYXRlLCBwYXNzaXZlKTtcbiAgICB9XG4gIH07XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdldmVudExpc3RlbmVycycsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnd3JpdGUnLFxuICBmbjogZnVuY3Rpb24gZm4oKSB7fSxcbiAgZWZmZWN0OiBlZmZlY3QsXG4gIGRhdGE6IHt9XG59OyIsImltcG9ydCBnZXRPcHBvc2l0ZVBsYWNlbWVudCBmcm9tIFwiLi4vdXRpbHMvZ2V0T3Bwb3NpdGVQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0T3Bwb3NpdGVWYXJpYXRpb25QbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldE9wcG9zaXRlVmFyaWF0aW9uUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZGV0ZWN0T3ZlcmZsb3cgZnJvbSBcIi4uL3V0aWxzL2RldGVjdE92ZXJmbG93LmpzXCI7XG5pbXBvcnQgY29tcHV0ZUF1dG9QbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2NvbXB1dGVBdXRvUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgeyBib3R0b20sIHRvcCwgc3RhcnQsIHJpZ2h0LCBsZWZ0LCBhdXRvIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG5pbXBvcnQgZ2V0VmFyaWF0aW9uIGZyb20gXCIuLi91dGlscy9nZXRWYXJpYXRpb24uanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5mdW5jdGlvbiBnZXRFeHBhbmRlZEZhbGxiYWNrUGxhY2VtZW50cyhwbGFjZW1lbnQpIHtcbiAgaWYgKGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KSA9PT0gYXV0bykge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHZhciBvcHBvc2l0ZVBsYWNlbWVudCA9IGdldE9wcG9zaXRlUGxhY2VtZW50KHBsYWNlbWVudCk7XG4gIHJldHVybiBbZ2V0T3Bwb3NpdGVWYXJpYXRpb25QbGFjZW1lbnQocGxhY2VtZW50KSwgb3Bwb3NpdGVQbGFjZW1lbnQsIGdldE9wcG9zaXRlVmFyaWF0aW9uUGxhY2VtZW50KG9wcG9zaXRlUGxhY2VtZW50KV07XG59XG5cbmZ1bmN0aW9uIGZsaXAoX3JlZikge1xuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlLFxuICAgICAgb3B0aW9ucyA9IF9yZWYub3B0aW9ucyxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWU7XG5cbiAgaWYgKHN0YXRlLm1vZGlmaWVyc0RhdGFbbmFtZV0uX3NraXApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgX29wdGlvbnMkbWFpbkF4aXMgPSBvcHRpb25zLm1haW5BeGlzLFxuICAgICAgY2hlY2tNYWluQXhpcyA9IF9vcHRpb25zJG1haW5BeGlzID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkbWFpbkF4aXMsXG4gICAgICBfb3B0aW9ucyRhbHRBeGlzID0gb3B0aW9ucy5hbHRBeGlzLFxuICAgICAgY2hlY2tBbHRBeGlzID0gX29wdGlvbnMkYWx0QXhpcyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJGFsdEF4aXMsXG4gICAgICBzcGVjaWZpZWRGYWxsYmFja1BsYWNlbWVudHMgPSBvcHRpb25zLmZhbGxiYWNrUGxhY2VtZW50cyxcbiAgICAgIHBhZGRpbmcgPSBvcHRpb25zLnBhZGRpbmcsXG4gICAgICBib3VuZGFyeSA9IG9wdGlvbnMuYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnkgPSBvcHRpb25zLnJvb3RCb3VuZGFyeSxcbiAgICAgIGFsdEJvdW5kYXJ5ID0gb3B0aW9ucy5hbHRCb3VuZGFyeSxcbiAgICAgIF9vcHRpb25zJGZsaXBWYXJpYXRpbyA9IG9wdGlvbnMuZmxpcFZhcmlhdGlvbnMsXG4gICAgICBmbGlwVmFyaWF0aW9ucyA9IF9vcHRpb25zJGZsaXBWYXJpYXRpbyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJGZsaXBWYXJpYXRpbyxcbiAgICAgIGFsbG93ZWRBdXRvUGxhY2VtZW50cyA9IG9wdGlvbnMuYWxsb3dlZEF1dG9QbGFjZW1lbnRzO1xuICB2YXIgcHJlZmVycmVkUGxhY2VtZW50ID0gc3RhdGUub3B0aW9ucy5wbGFjZW1lbnQ7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gZ2V0QmFzZVBsYWNlbWVudChwcmVmZXJyZWRQbGFjZW1lbnQpO1xuICB2YXIgaXNCYXNlUGxhY2VtZW50ID0gYmFzZVBsYWNlbWVudCA9PT0gcHJlZmVycmVkUGxhY2VtZW50O1xuICB2YXIgZmFsbGJhY2tQbGFjZW1lbnRzID0gc3BlY2lmaWVkRmFsbGJhY2tQbGFjZW1lbnRzIHx8IChpc0Jhc2VQbGFjZW1lbnQgfHwgIWZsaXBWYXJpYXRpb25zID8gW2dldE9wcG9zaXRlUGxhY2VtZW50KHByZWZlcnJlZFBsYWNlbWVudCldIDogZ2V0RXhwYW5kZWRGYWxsYmFja1BsYWNlbWVudHMocHJlZmVycmVkUGxhY2VtZW50KSk7XG4gIHZhciBwbGFjZW1lbnRzID0gW3ByZWZlcnJlZFBsYWNlbWVudF0uY29uY2F0KGZhbGxiYWNrUGxhY2VtZW50cykucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHBsYWNlbWVudCkge1xuICAgIHJldHVybiBhY2MuY29uY2F0KGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KSA9PT0gYXV0byA/IGNvbXB1dGVBdXRvUGxhY2VtZW50KHN0YXRlLCB7XG4gICAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudCxcbiAgICAgIGJvdW5kYXJ5OiBib3VuZGFyeSxcbiAgICAgIHJvb3RCb3VuZGFyeTogcm9vdEJvdW5kYXJ5LFxuICAgICAgcGFkZGluZzogcGFkZGluZyxcbiAgICAgIGZsaXBWYXJpYXRpb25zOiBmbGlwVmFyaWF0aW9ucyxcbiAgICAgIGFsbG93ZWRBdXRvUGxhY2VtZW50czogYWxsb3dlZEF1dG9QbGFjZW1lbnRzXG4gICAgfSkgOiBwbGFjZW1lbnQpO1xuICB9LCBbXSk7XG4gIHZhciByZWZlcmVuY2VSZWN0ID0gc3RhdGUucmVjdHMucmVmZXJlbmNlO1xuICB2YXIgcG9wcGVyUmVjdCA9IHN0YXRlLnJlY3RzLnBvcHBlcjtcbiAgdmFyIGNoZWNrc01hcCA9IG5ldyBNYXAoKTtcbiAgdmFyIG1ha2VGYWxsYmFja0NoZWNrcyA9IHRydWU7XG4gIHZhciBmaXJzdEZpdHRpbmdQbGFjZW1lbnQgPSBwbGFjZW1lbnRzWzBdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGxhY2VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBwbGFjZW1lbnQgPSBwbGFjZW1lbnRzW2ldO1xuXG4gICAgdmFyIF9iYXNlUGxhY2VtZW50ID0gZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpO1xuXG4gICAgdmFyIGlzU3RhcnRWYXJpYXRpb24gPSBnZXRWYXJpYXRpb24ocGxhY2VtZW50KSA9PT0gc3RhcnQ7XG4gICAgdmFyIGlzVmVydGljYWwgPSBbdG9wLCBib3R0b21dLmluZGV4T2YoX2Jhc2VQbGFjZW1lbnQpID49IDA7XG4gICAgdmFyIGxlbiA9IGlzVmVydGljYWwgPyAnd2lkdGgnIDogJ2hlaWdodCc7XG4gICAgdmFyIG92ZXJmbG93ID0gZGV0ZWN0T3ZlcmZsb3coc3RhdGUsIHtcbiAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50LFxuICAgICAgYm91bmRhcnk6IGJvdW5kYXJ5LFxuICAgICAgcm9vdEJvdW5kYXJ5OiByb290Qm91bmRhcnksXG4gICAgICBhbHRCb3VuZGFyeTogYWx0Qm91bmRhcnksXG4gICAgICBwYWRkaW5nOiBwYWRkaW5nXG4gICAgfSk7XG4gICAgdmFyIG1haW5WYXJpYXRpb25TaWRlID0gaXNWZXJ0aWNhbCA/IGlzU3RhcnRWYXJpYXRpb24gPyByaWdodCA6IGxlZnQgOiBpc1N0YXJ0VmFyaWF0aW9uID8gYm90dG9tIDogdG9wO1xuXG4gICAgaWYgKHJlZmVyZW5jZVJlY3RbbGVuXSA+IHBvcHBlclJlY3RbbGVuXSkge1xuICAgICAgbWFpblZhcmlhdGlvblNpZGUgPSBnZXRPcHBvc2l0ZVBsYWNlbWVudChtYWluVmFyaWF0aW9uU2lkZSk7XG4gICAgfVxuXG4gICAgdmFyIGFsdFZhcmlhdGlvblNpZGUgPSBnZXRPcHBvc2l0ZVBsYWNlbWVudChtYWluVmFyaWF0aW9uU2lkZSk7XG4gICAgdmFyIGNoZWNrcyA9IFtdO1xuXG4gICAgaWYgKGNoZWNrTWFpbkF4aXMpIHtcbiAgICAgIGNoZWNrcy5wdXNoKG92ZXJmbG93W19iYXNlUGxhY2VtZW50XSA8PSAwKTtcbiAgICB9XG5cbiAgICBpZiAoY2hlY2tBbHRBeGlzKSB7XG4gICAgICBjaGVja3MucHVzaChvdmVyZmxvd1ttYWluVmFyaWF0aW9uU2lkZV0gPD0gMCwgb3ZlcmZsb3dbYWx0VmFyaWF0aW9uU2lkZV0gPD0gMCk7XG4gICAgfVxuXG4gICAgaWYgKGNoZWNrcy5ldmVyeShmdW5jdGlvbiAoY2hlY2spIHtcbiAgICAgIHJldHVybiBjaGVjaztcbiAgICB9KSkge1xuICAgICAgZmlyc3RGaXR0aW5nUGxhY2VtZW50ID0gcGxhY2VtZW50O1xuICAgICAgbWFrZUZhbGxiYWNrQ2hlY2tzID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjaGVja3NNYXAuc2V0KHBsYWNlbWVudCwgY2hlY2tzKTtcbiAgfVxuXG4gIGlmIChtYWtlRmFsbGJhY2tDaGVja3MpIHtcbiAgICAvLyBgMmAgbWF5IGJlIGRlc2lyZWQgaW4gc29tZSBjYXNlcyDigJMgcmVzZWFyY2ggbGF0ZXJcbiAgICB2YXIgbnVtYmVyT2ZDaGVja3MgPSBmbGlwVmFyaWF0aW9ucyA/IDMgOiAxO1xuXG4gICAgdmFyIF9sb29wID0gZnVuY3Rpb24gX2xvb3AoX2kpIHtcbiAgICAgIHZhciBmaXR0aW5nUGxhY2VtZW50ID0gcGxhY2VtZW50cy5maW5kKGZ1bmN0aW9uIChwbGFjZW1lbnQpIHtcbiAgICAgICAgdmFyIGNoZWNrcyA9IGNoZWNrc01hcC5nZXQocGxhY2VtZW50KTtcblxuICAgICAgICBpZiAoY2hlY2tzKSB7XG4gICAgICAgICAgcmV0dXJuIGNoZWNrcy5zbGljZSgwLCBfaSkuZXZlcnkoZnVuY3Rpb24gKGNoZWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hlY2s7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoZml0dGluZ1BsYWNlbWVudCkge1xuICAgICAgICBmaXJzdEZpdHRpbmdQbGFjZW1lbnQgPSBmaXR0aW5nUGxhY2VtZW50O1xuICAgICAgICByZXR1cm4gXCJicmVha1wiO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmb3IgKHZhciBfaSA9IG51bWJlck9mQ2hlY2tzOyBfaSA+IDA7IF9pLS0pIHtcbiAgICAgIHZhciBfcmV0ID0gX2xvb3AoX2kpO1xuXG4gICAgICBpZiAoX3JldCA9PT0gXCJicmVha1wiKSBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoc3RhdGUucGxhY2VtZW50ICE9PSBmaXJzdEZpdHRpbmdQbGFjZW1lbnQpIHtcbiAgICBzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdLl9za2lwID0gdHJ1ZTtcbiAgICBzdGF0ZS5wbGFjZW1lbnQgPSBmaXJzdEZpdHRpbmdQbGFjZW1lbnQ7XG4gICAgc3RhdGUucmVzZXQgPSB0cnVlO1xuICB9XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdmbGlwJyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICdtYWluJyxcbiAgZm46IGZsaXAsXG4gIHJlcXVpcmVzSWZFeGlzdHM6IFsnb2Zmc2V0J10sXG4gIGRhdGE6IHtcbiAgICBfc2tpcDogZmFsc2VcbiAgfVxufTsiLCJpbXBvcnQgeyB0b3AsIGJvdHRvbSwgbGVmdCwgcmlnaHQgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCBkZXRlY3RPdmVyZmxvdyBmcm9tIFwiLi4vdXRpbHMvZGV0ZWN0T3ZlcmZsb3cuanNcIjtcblxuZnVuY3Rpb24gZ2V0U2lkZU9mZnNldHMob3ZlcmZsb3csIHJlY3QsIHByZXZlbnRlZE9mZnNldHMpIHtcbiAgaWYgKHByZXZlbnRlZE9mZnNldHMgPT09IHZvaWQgMCkge1xuICAgIHByZXZlbnRlZE9mZnNldHMgPSB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMFxuICAgIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvcDogb3ZlcmZsb3cudG9wIC0gcmVjdC5oZWlnaHQgLSBwcmV2ZW50ZWRPZmZzZXRzLnksXG4gICAgcmlnaHQ6IG92ZXJmbG93LnJpZ2h0IC0gcmVjdC53aWR0aCArIHByZXZlbnRlZE9mZnNldHMueCxcbiAgICBib3R0b206IG92ZXJmbG93LmJvdHRvbSAtIHJlY3QuaGVpZ2h0ICsgcHJldmVudGVkT2Zmc2V0cy55LFxuICAgIGxlZnQ6IG92ZXJmbG93LmxlZnQgLSByZWN0LndpZHRoIC0gcHJldmVudGVkT2Zmc2V0cy54XG4gIH07XG59XG5cbmZ1bmN0aW9uIGlzQW55U2lkZUZ1bGx5Q2xpcHBlZChvdmVyZmxvdykge1xuICByZXR1cm4gW3RvcCwgcmlnaHQsIGJvdHRvbSwgbGVmdF0uc29tZShmdW5jdGlvbiAoc2lkZSkge1xuICAgIHJldHVybiBvdmVyZmxvd1tzaWRlXSA+PSAwO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaGlkZShfcmVmKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYuc3RhdGUsXG4gICAgICBuYW1lID0gX3JlZi5uYW1lO1xuICB2YXIgcmVmZXJlbmNlUmVjdCA9IHN0YXRlLnJlY3RzLnJlZmVyZW5jZTtcbiAgdmFyIHBvcHBlclJlY3QgPSBzdGF0ZS5yZWN0cy5wb3BwZXI7XG4gIHZhciBwcmV2ZW50ZWRPZmZzZXRzID0gc3RhdGUubW9kaWZpZXJzRGF0YS5wcmV2ZW50T3ZlcmZsb3c7XG4gIHZhciByZWZlcmVuY2VPdmVyZmxvdyA9IGRldGVjdE92ZXJmbG93KHN0YXRlLCB7XG4gICAgZWxlbWVudENvbnRleHQ6ICdyZWZlcmVuY2UnXG4gIH0pO1xuICB2YXIgcG9wcGVyQWx0T3ZlcmZsb3cgPSBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwge1xuICAgIGFsdEJvdW5kYXJ5OiB0cnVlXG4gIH0pO1xuICB2YXIgcmVmZXJlbmNlQ2xpcHBpbmdPZmZzZXRzID0gZ2V0U2lkZU9mZnNldHMocmVmZXJlbmNlT3ZlcmZsb3csIHJlZmVyZW5jZVJlY3QpO1xuICB2YXIgcG9wcGVyRXNjYXBlT2Zmc2V0cyA9IGdldFNpZGVPZmZzZXRzKHBvcHBlckFsdE92ZXJmbG93LCBwb3BwZXJSZWN0LCBwcmV2ZW50ZWRPZmZzZXRzKTtcbiAgdmFyIGlzUmVmZXJlbmNlSGlkZGVuID0gaXNBbnlTaWRlRnVsbHlDbGlwcGVkKHJlZmVyZW5jZUNsaXBwaW5nT2Zmc2V0cyk7XG4gIHZhciBoYXNQb3BwZXJFc2NhcGVkID0gaXNBbnlTaWRlRnVsbHlDbGlwcGVkKHBvcHBlckVzY2FwZU9mZnNldHMpO1xuICBzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdID0ge1xuICAgIHJlZmVyZW5jZUNsaXBwaW5nT2Zmc2V0czogcmVmZXJlbmNlQ2xpcHBpbmdPZmZzZXRzLFxuICAgIHBvcHBlckVzY2FwZU9mZnNldHM6IHBvcHBlckVzY2FwZU9mZnNldHMsXG4gICAgaXNSZWZlcmVuY2VIaWRkZW46IGlzUmVmZXJlbmNlSGlkZGVuLFxuICAgIGhhc1BvcHBlckVzY2FwZWQ6IGhhc1BvcHBlckVzY2FwZWRcbiAgfTtcbiAgc3RhdGUuYXR0cmlidXRlcy5wb3BwZXIgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5hdHRyaWJ1dGVzLnBvcHBlciwge1xuICAgICdkYXRhLXBvcHBlci1yZWZlcmVuY2UtaGlkZGVuJzogaXNSZWZlcmVuY2VIaWRkZW4sXG4gICAgJ2RhdGEtcG9wcGVyLWVzY2FwZWQnOiBoYXNQb3BwZXJFc2NhcGVkXG4gIH0pO1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnaGlkZScsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnbWFpbicsXG4gIHJlcXVpcmVzSWZFeGlzdHM6IFsncHJldmVudE92ZXJmbG93J10sXG4gIGZuOiBoaWRlXG59OyIsImV4cG9ydCB7IGRlZmF1bHQgYXMgYXBwbHlTdHlsZXMgfSBmcm9tIFwiLi9hcHBseVN0eWxlcy5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBhcnJvdyB9IGZyb20gXCIuL2Fycm93LmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGNvbXB1dGVTdHlsZXMgfSBmcm9tIFwiLi9jb21wdXRlU3R5bGVzLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGV2ZW50TGlzdGVuZXJzIH0gZnJvbSBcIi4vZXZlbnRMaXN0ZW5lcnMuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgZmxpcCB9IGZyb20gXCIuL2ZsaXAuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgaGlkZSB9IGZyb20gXCIuL2hpZGUuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgb2Zmc2V0IH0gZnJvbSBcIi4vb2Zmc2V0LmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHBvcHBlck9mZnNldHMgfSBmcm9tIFwiLi9wb3BwZXJPZmZzZXRzLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHByZXZlbnRPdmVyZmxvdyB9IGZyb20gXCIuL3ByZXZlbnRPdmVyZmxvdy5qc1wiOyIsImltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgeyB0b3AsIGxlZnQsIHJpZ2h0LCBwbGFjZW1lbnRzIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3RhbmNlQW5kU2tpZGRpbmdUb1hZKHBsYWNlbWVudCwgcmVjdHMsIG9mZnNldCkge1xuICB2YXIgYmFzZVBsYWNlbWVudCA9IGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KTtcbiAgdmFyIGludmVydERpc3RhbmNlID0gW2xlZnQsIHRvcF0uaW5kZXhPZihiYXNlUGxhY2VtZW50KSA+PSAwID8gLTEgOiAxO1xuXG4gIHZhciBfcmVmID0gdHlwZW9mIG9mZnNldCA9PT0gJ2Z1bmN0aW9uJyA/IG9mZnNldChPYmplY3QuYXNzaWduKHt9LCByZWN0cywge1xuICAgIHBsYWNlbWVudDogcGxhY2VtZW50XG4gIH0pKSA6IG9mZnNldCxcbiAgICAgIHNraWRkaW5nID0gX3JlZlswXSxcbiAgICAgIGRpc3RhbmNlID0gX3JlZlsxXTtcblxuICBza2lkZGluZyA9IHNraWRkaW5nIHx8IDA7XG4gIGRpc3RhbmNlID0gKGRpc3RhbmNlIHx8IDApICogaW52ZXJ0RGlzdGFuY2U7XG4gIHJldHVybiBbbGVmdCwgcmlnaHRdLmluZGV4T2YoYmFzZVBsYWNlbWVudCkgPj0gMCA/IHtcbiAgICB4OiBkaXN0YW5jZSxcbiAgICB5OiBza2lkZGluZ1xuICB9IDoge1xuICAgIHg6IHNraWRkaW5nLFxuICAgIHk6IGRpc3RhbmNlXG4gIH07XG59XG5cbmZ1bmN0aW9uIG9mZnNldChfcmVmMikge1xuICB2YXIgc3RhdGUgPSBfcmVmMi5zdGF0ZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmMi5vcHRpb25zLFxuICAgICAgbmFtZSA9IF9yZWYyLm5hbWU7XG4gIHZhciBfb3B0aW9ucyRvZmZzZXQgPSBvcHRpb25zLm9mZnNldCxcbiAgICAgIG9mZnNldCA9IF9vcHRpb25zJG9mZnNldCA9PT0gdm9pZCAwID8gWzAsIDBdIDogX29wdGlvbnMkb2Zmc2V0O1xuICB2YXIgZGF0YSA9IHBsYWNlbWVudHMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHBsYWNlbWVudCkge1xuICAgIGFjY1twbGFjZW1lbnRdID0gZGlzdGFuY2VBbmRTa2lkZGluZ1RvWFkocGxhY2VtZW50LCBzdGF0ZS5yZWN0cywgb2Zmc2V0KTtcbiAgICByZXR1cm4gYWNjO1xuICB9LCB7fSk7XG4gIHZhciBfZGF0YSRzdGF0ZSRwbGFjZW1lbnQgPSBkYXRhW3N0YXRlLnBsYWNlbWVudF0sXG4gICAgICB4ID0gX2RhdGEkc3RhdGUkcGxhY2VtZW50LngsXG4gICAgICB5ID0gX2RhdGEkc3RhdGUkcGxhY2VtZW50Lnk7XG5cbiAgaWYgKHN0YXRlLm1vZGlmaWVyc0RhdGEucG9wcGVyT2Zmc2V0cyAhPSBudWxsKSB7XG4gICAgc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzLnggKz0geDtcbiAgICBzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHMueSArPSB5O1xuICB9XG5cbiAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IGRhdGE7XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdvZmZzZXQnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ21haW4nLFxuICByZXF1aXJlczogWydwb3BwZXJPZmZzZXRzJ10sXG4gIGZuOiBvZmZzZXRcbn07IiwiaW1wb3J0IGNvbXB1dGVPZmZzZXRzIGZyb20gXCIuLi91dGlscy9jb21wdXRlT2Zmc2V0cy5qc1wiO1xuXG5mdW5jdGlvbiBwb3BwZXJPZmZzZXRzKF9yZWYpIHtcbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWU7XG4gIC8vIE9mZnNldHMgYXJlIHRoZSBhY3R1YWwgcG9zaXRpb24gdGhlIHBvcHBlciBuZWVkcyB0byBoYXZlIHRvIGJlXG4gIC8vIHByb3Blcmx5IHBvc2l0aW9uZWQgbmVhciBpdHMgcmVmZXJlbmNlIGVsZW1lbnRcbiAgLy8gVGhpcyBpcyB0aGUgbW9zdCBiYXNpYyBwbGFjZW1lbnQsIGFuZCB3aWxsIGJlIGFkanVzdGVkIGJ5XG4gIC8vIHRoZSBtb2RpZmllcnMgaW4gdGhlIG5leHQgc3RlcFxuICBzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdID0gY29tcHV0ZU9mZnNldHMoe1xuICAgIHJlZmVyZW5jZTogc3RhdGUucmVjdHMucmVmZXJlbmNlLFxuICAgIGVsZW1lbnQ6IHN0YXRlLnJlY3RzLnBvcHBlcixcbiAgICBzdHJhdGVneTogJ2Fic29sdXRlJyxcbiAgICBwbGFjZW1lbnQ6IHN0YXRlLnBsYWNlbWVudFxuICB9KTtcbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3BvcHBlck9mZnNldHMnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ3JlYWQnLFxuICBmbjogcG9wcGVyT2Zmc2V0cyxcbiAgZGF0YToge31cbn07IiwiaW1wb3J0IHsgdG9wLCBsZWZ0LCByaWdodCwgYm90dG9tLCBzdGFydCB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IGdldEJhc2VQbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldE1haW5BeGlzRnJvbVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IGdldEFsdEF4aXMgZnJvbSBcIi4uL3V0aWxzL2dldEFsdEF4aXMuanNcIjtcbmltcG9ydCB7IHdpdGhpbiwgd2l0aGluTWF4Q2xhbXAgfSBmcm9tIFwiLi4vdXRpbHMvd2l0aGluLmpzXCI7XG5pbXBvcnQgZ2V0TGF5b3V0UmVjdCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldExheW91dFJlY3QuanNcIjtcbmltcG9ydCBnZXRPZmZzZXRQYXJlbnQgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRPZmZzZXRQYXJlbnQuanNcIjtcbmltcG9ydCBkZXRlY3RPdmVyZmxvdyBmcm9tIFwiLi4vdXRpbHMvZGV0ZWN0T3ZlcmZsb3cuanNcIjtcbmltcG9ydCBnZXRWYXJpYXRpb24gZnJvbSBcIi4uL3V0aWxzL2dldFZhcmlhdGlvbi5qc1wiO1xuaW1wb3J0IGdldEZyZXNoU2lkZU9iamVjdCBmcm9tIFwiLi4vdXRpbHMvZ2V0RnJlc2hTaWRlT2JqZWN0LmpzXCI7XG5pbXBvcnQgeyBtaW4gYXMgbWF0aE1pbiwgbWF4IGFzIG1hdGhNYXggfSBmcm9tIFwiLi4vdXRpbHMvbWF0aC5qc1wiO1xuXG5mdW5jdGlvbiBwcmV2ZW50T3ZlcmZsb3coX3JlZikge1xuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlLFxuICAgICAgb3B0aW9ucyA9IF9yZWYub3B0aW9ucyxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWU7XG4gIHZhciBfb3B0aW9ucyRtYWluQXhpcyA9IG9wdGlvbnMubWFpbkF4aXMsXG4gICAgICBjaGVja01haW5BeGlzID0gX29wdGlvbnMkbWFpbkF4aXMgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRtYWluQXhpcyxcbiAgICAgIF9vcHRpb25zJGFsdEF4aXMgPSBvcHRpb25zLmFsdEF4aXMsXG4gICAgICBjaGVja0FsdEF4aXMgPSBfb3B0aW9ucyRhbHRBeGlzID09PSB2b2lkIDAgPyBmYWxzZSA6IF9vcHRpb25zJGFsdEF4aXMsXG4gICAgICBib3VuZGFyeSA9IG9wdGlvbnMuYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnkgPSBvcHRpb25zLnJvb3RCb3VuZGFyeSxcbiAgICAgIGFsdEJvdW5kYXJ5ID0gb3B0aW9ucy5hbHRCb3VuZGFyeSxcbiAgICAgIHBhZGRpbmcgPSBvcHRpb25zLnBhZGRpbmcsXG4gICAgICBfb3B0aW9ucyR0ZXRoZXIgPSBvcHRpb25zLnRldGhlcixcbiAgICAgIHRldGhlciA9IF9vcHRpb25zJHRldGhlciA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJHRldGhlcixcbiAgICAgIF9vcHRpb25zJHRldGhlck9mZnNldCA9IG9wdGlvbnMudGV0aGVyT2Zmc2V0LFxuICAgICAgdGV0aGVyT2Zmc2V0ID0gX29wdGlvbnMkdGV0aGVyT2Zmc2V0ID09PSB2b2lkIDAgPyAwIDogX29wdGlvbnMkdGV0aGVyT2Zmc2V0O1xuICB2YXIgb3ZlcmZsb3cgPSBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwge1xuICAgIGJvdW5kYXJ5OiBib3VuZGFyeSxcbiAgICByb290Qm91bmRhcnk6IHJvb3RCb3VuZGFyeSxcbiAgICBwYWRkaW5nOiBwYWRkaW5nLFxuICAgIGFsdEJvdW5kYXJ5OiBhbHRCb3VuZGFyeVxuICB9KTtcbiAgdmFyIGJhc2VQbGFjZW1lbnQgPSBnZXRCYXNlUGxhY2VtZW50KHN0YXRlLnBsYWNlbWVudCk7XG4gIHZhciB2YXJpYXRpb24gPSBnZXRWYXJpYXRpb24oc3RhdGUucGxhY2VtZW50KTtcbiAgdmFyIGlzQmFzZVBsYWNlbWVudCA9ICF2YXJpYXRpb247XG4gIHZhciBtYWluQXhpcyA9IGdldE1haW5BeGlzRnJvbVBsYWNlbWVudChiYXNlUGxhY2VtZW50KTtcbiAgdmFyIGFsdEF4aXMgPSBnZXRBbHRBeGlzKG1haW5BeGlzKTtcbiAgdmFyIHBvcHBlck9mZnNldHMgPSBzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHM7XG4gIHZhciByZWZlcmVuY2VSZWN0ID0gc3RhdGUucmVjdHMucmVmZXJlbmNlO1xuICB2YXIgcG9wcGVyUmVjdCA9IHN0YXRlLnJlY3RzLnBvcHBlcjtcbiAgdmFyIHRldGhlck9mZnNldFZhbHVlID0gdHlwZW9mIHRldGhlck9mZnNldCA9PT0gJ2Z1bmN0aW9uJyA/IHRldGhlck9mZnNldChPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5yZWN0cywge1xuICAgIHBsYWNlbWVudDogc3RhdGUucGxhY2VtZW50XG4gIH0pKSA6IHRldGhlck9mZnNldDtcbiAgdmFyIG5vcm1hbGl6ZWRUZXRoZXJPZmZzZXRWYWx1ZSA9IHR5cGVvZiB0ZXRoZXJPZmZzZXRWYWx1ZSA9PT0gJ251bWJlcicgPyB7XG4gICAgbWFpbkF4aXM6IHRldGhlck9mZnNldFZhbHVlLFxuICAgIGFsdEF4aXM6IHRldGhlck9mZnNldFZhbHVlXG4gIH0gOiBPYmplY3QuYXNzaWduKHtcbiAgICBtYWluQXhpczogMCxcbiAgICBhbHRBeGlzOiAwXG4gIH0sIHRldGhlck9mZnNldFZhbHVlKTtcbiAgdmFyIG9mZnNldE1vZGlmaWVyU3RhdGUgPSBzdGF0ZS5tb2RpZmllcnNEYXRhLm9mZnNldCA/IHN0YXRlLm1vZGlmaWVyc0RhdGEub2Zmc2V0W3N0YXRlLnBsYWNlbWVudF0gOiBudWxsO1xuICB2YXIgZGF0YSA9IHtcbiAgICB4OiAwLFxuICAgIHk6IDBcbiAgfTtcblxuICBpZiAoIXBvcHBlck9mZnNldHMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoY2hlY2tNYWluQXhpcykge1xuICAgIHZhciBfb2Zmc2V0TW9kaWZpZXJTdGF0ZSQ7XG5cbiAgICB2YXIgbWFpblNpZGUgPSBtYWluQXhpcyA9PT0gJ3knID8gdG9wIDogbGVmdDtcbiAgICB2YXIgYWx0U2lkZSA9IG1haW5BeGlzID09PSAneScgPyBib3R0b20gOiByaWdodDtcbiAgICB2YXIgbGVuID0gbWFpbkF4aXMgPT09ICd5JyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcbiAgICB2YXIgb2Zmc2V0ID0gcG9wcGVyT2Zmc2V0c1ttYWluQXhpc107XG4gICAgdmFyIG1pbiA9IG9mZnNldCArIG92ZXJmbG93W21haW5TaWRlXTtcbiAgICB2YXIgbWF4ID0gb2Zmc2V0IC0gb3ZlcmZsb3dbYWx0U2lkZV07XG4gICAgdmFyIGFkZGl0aXZlID0gdGV0aGVyID8gLXBvcHBlclJlY3RbbGVuXSAvIDIgOiAwO1xuICAgIHZhciBtaW5MZW4gPSB2YXJpYXRpb24gPT09IHN0YXJ0ID8gcmVmZXJlbmNlUmVjdFtsZW5dIDogcG9wcGVyUmVjdFtsZW5dO1xuICAgIHZhciBtYXhMZW4gPSB2YXJpYXRpb24gPT09IHN0YXJ0ID8gLXBvcHBlclJlY3RbbGVuXSA6IC1yZWZlcmVuY2VSZWN0W2xlbl07IC8vIFdlIG5lZWQgdG8gaW5jbHVkZSB0aGUgYXJyb3cgaW4gdGhlIGNhbGN1bGF0aW9uIHNvIHRoZSBhcnJvdyBkb2Vzbid0IGdvXG4gICAgLy8gb3V0c2lkZSB0aGUgcmVmZXJlbmNlIGJvdW5kc1xuXG4gICAgdmFyIGFycm93RWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzLmFycm93O1xuICAgIHZhciBhcnJvd1JlY3QgPSB0ZXRoZXIgJiYgYXJyb3dFbGVtZW50ID8gZ2V0TGF5b3V0UmVjdChhcnJvd0VsZW1lbnQpIDoge1xuICAgICAgd2lkdGg6IDAsXG4gICAgICBoZWlnaHQ6IDBcbiAgICB9O1xuICAgIHZhciBhcnJvd1BhZGRpbmdPYmplY3QgPSBzdGF0ZS5tb2RpZmllcnNEYXRhWydhcnJvdyNwZXJzaXN0ZW50J10gPyBzdGF0ZS5tb2RpZmllcnNEYXRhWydhcnJvdyNwZXJzaXN0ZW50J10ucGFkZGluZyA6IGdldEZyZXNoU2lkZU9iamVjdCgpO1xuICAgIHZhciBhcnJvd1BhZGRpbmdNaW4gPSBhcnJvd1BhZGRpbmdPYmplY3RbbWFpblNpZGVdO1xuICAgIHZhciBhcnJvd1BhZGRpbmdNYXggPSBhcnJvd1BhZGRpbmdPYmplY3RbYWx0U2lkZV07IC8vIElmIHRoZSByZWZlcmVuY2UgbGVuZ3RoIGlzIHNtYWxsZXIgdGhhbiB0aGUgYXJyb3cgbGVuZ3RoLCB3ZSBkb24ndCB3YW50XG4gICAgLy8gdG8gaW5jbHVkZSBpdHMgZnVsbCBzaXplIGluIHRoZSBjYWxjdWxhdGlvbi4gSWYgdGhlIHJlZmVyZW5jZSBpcyBzbWFsbFxuICAgIC8vIGFuZCBuZWFyIHRoZSBlZGdlIG9mIGEgYm91bmRhcnksIHRoZSBwb3BwZXIgY2FuIG92ZXJmbG93IGV2ZW4gaWYgdGhlXG4gICAgLy8gcmVmZXJlbmNlIGlzIG5vdCBvdmVyZmxvd2luZyBhcyB3ZWxsIChlLmcuIHZpcnR1YWwgZWxlbWVudHMgd2l0aCBub1xuICAgIC8vIHdpZHRoIG9yIGhlaWdodClcblxuICAgIHZhciBhcnJvd0xlbiA9IHdpdGhpbigwLCByZWZlcmVuY2VSZWN0W2xlbl0sIGFycm93UmVjdFtsZW5dKTtcbiAgICB2YXIgbWluT2Zmc2V0ID0gaXNCYXNlUGxhY2VtZW50ID8gcmVmZXJlbmNlUmVjdFtsZW5dIC8gMiAtIGFkZGl0aXZlIC0gYXJyb3dMZW4gLSBhcnJvd1BhZGRpbmdNaW4gLSBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUubWFpbkF4aXMgOiBtaW5MZW4gLSBhcnJvd0xlbiAtIGFycm93UGFkZGluZ01pbiAtIG5vcm1hbGl6ZWRUZXRoZXJPZmZzZXRWYWx1ZS5tYWluQXhpcztcbiAgICB2YXIgbWF4T2Zmc2V0ID0gaXNCYXNlUGxhY2VtZW50ID8gLXJlZmVyZW5jZVJlY3RbbGVuXSAvIDIgKyBhZGRpdGl2ZSArIGFycm93TGVuICsgYXJyb3dQYWRkaW5nTWF4ICsgbm9ybWFsaXplZFRldGhlck9mZnNldFZhbHVlLm1haW5BeGlzIDogbWF4TGVuICsgYXJyb3dMZW4gKyBhcnJvd1BhZGRpbmdNYXggKyBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUubWFpbkF4aXM7XG4gICAgdmFyIGFycm93T2Zmc2V0UGFyZW50ID0gc3RhdGUuZWxlbWVudHMuYXJyb3cgJiYgZ2V0T2Zmc2V0UGFyZW50KHN0YXRlLmVsZW1lbnRzLmFycm93KTtcbiAgICB2YXIgY2xpZW50T2Zmc2V0ID0gYXJyb3dPZmZzZXRQYXJlbnQgPyBtYWluQXhpcyA9PT0gJ3knID8gYXJyb3dPZmZzZXRQYXJlbnQuY2xpZW50VG9wIHx8IDAgOiBhcnJvd09mZnNldFBhcmVudC5jbGllbnRMZWZ0IHx8IDAgOiAwO1xuICAgIHZhciBvZmZzZXRNb2RpZmllclZhbHVlID0gKF9vZmZzZXRNb2RpZmllclN0YXRlJCA9IG9mZnNldE1vZGlmaWVyU3RhdGUgPT0gbnVsbCA/IHZvaWQgMCA6IG9mZnNldE1vZGlmaWVyU3RhdGVbbWFpbkF4aXNdKSAhPSBudWxsID8gX29mZnNldE1vZGlmaWVyU3RhdGUkIDogMDtcbiAgICB2YXIgdGV0aGVyTWluID0gb2Zmc2V0ICsgbWluT2Zmc2V0IC0gb2Zmc2V0TW9kaWZpZXJWYWx1ZSAtIGNsaWVudE9mZnNldDtcbiAgICB2YXIgdGV0aGVyTWF4ID0gb2Zmc2V0ICsgbWF4T2Zmc2V0IC0gb2Zmc2V0TW9kaWZpZXJWYWx1ZTtcbiAgICB2YXIgcHJldmVudGVkT2Zmc2V0ID0gd2l0aGluKHRldGhlciA/IG1hdGhNaW4obWluLCB0ZXRoZXJNaW4pIDogbWluLCBvZmZzZXQsIHRldGhlciA/IG1hdGhNYXgobWF4LCB0ZXRoZXJNYXgpIDogbWF4KTtcbiAgICBwb3BwZXJPZmZzZXRzW21haW5BeGlzXSA9IHByZXZlbnRlZE9mZnNldDtcbiAgICBkYXRhW21haW5BeGlzXSA9IHByZXZlbnRlZE9mZnNldCAtIG9mZnNldDtcbiAgfVxuXG4gIGlmIChjaGVja0FsdEF4aXMpIHtcbiAgICB2YXIgX29mZnNldE1vZGlmaWVyU3RhdGUkMjtcblxuICAgIHZhciBfbWFpblNpZGUgPSBtYWluQXhpcyA9PT0gJ3gnID8gdG9wIDogbGVmdDtcblxuICAgIHZhciBfYWx0U2lkZSA9IG1haW5BeGlzID09PSAneCcgPyBib3R0b20gOiByaWdodDtcblxuICAgIHZhciBfb2Zmc2V0ID0gcG9wcGVyT2Zmc2V0c1thbHRBeGlzXTtcblxuICAgIHZhciBfbGVuID0gYWx0QXhpcyA9PT0gJ3knID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuXG4gICAgdmFyIF9taW4gPSBfb2Zmc2V0ICsgb3ZlcmZsb3dbX21haW5TaWRlXTtcblxuICAgIHZhciBfbWF4ID0gX29mZnNldCAtIG92ZXJmbG93W19hbHRTaWRlXTtcblxuICAgIHZhciBpc09yaWdpblNpZGUgPSBbdG9wLCBsZWZ0XS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpICE9PSAtMTtcblxuICAgIHZhciBfb2Zmc2V0TW9kaWZpZXJWYWx1ZSA9IChfb2Zmc2V0TW9kaWZpZXJTdGF0ZSQyID0gb2Zmc2V0TW9kaWZpZXJTdGF0ZSA9PSBudWxsID8gdm9pZCAwIDogb2Zmc2V0TW9kaWZpZXJTdGF0ZVthbHRBeGlzXSkgIT0gbnVsbCA/IF9vZmZzZXRNb2RpZmllclN0YXRlJDIgOiAwO1xuXG4gICAgdmFyIF90ZXRoZXJNaW4gPSBpc09yaWdpblNpZGUgPyBfbWluIDogX29mZnNldCAtIHJlZmVyZW5jZVJlY3RbX2xlbl0gLSBwb3BwZXJSZWN0W19sZW5dIC0gX29mZnNldE1vZGlmaWVyVmFsdWUgKyBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUuYWx0QXhpcztcblxuICAgIHZhciBfdGV0aGVyTWF4ID0gaXNPcmlnaW5TaWRlID8gX29mZnNldCArIHJlZmVyZW5jZVJlY3RbX2xlbl0gKyBwb3BwZXJSZWN0W19sZW5dIC0gX29mZnNldE1vZGlmaWVyVmFsdWUgLSBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUuYWx0QXhpcyA6IF9tYXg7XG5cbiAgICB2YXIgX3ByZXZlbnRlZE9mZnNldCA9IHRldGhlciAmJiBpc09yaWdpblNpZGUgPyB3aXRoaW5NYXhDbGFtcChfdGV0aGVyTWluLCBfb2Zmc2V0LCBfdGV0aGVyTWF4KSA6IHdpdGhpbih0ZXRoZXIgPyBfdGV0aGVyTWluIDogX21pbiwgX29mZnNldCwgdGV0aGVyID8gX3RldGhlck1heCA6IF9tYXgpO1xuXG4gICAgcG9wcGVyT2Zmc2V0c1thbHRBeGlzXSA9IF9wcmV2ZW50ZWRPZmZzZXQ7XG4gICAgZGF0YVthbHRBeGlzXSA9IF9wcmV2ZW50ZWRPZmZzZXQgLSBfb2Zmc2V0O1xuICB9XG5cbiAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IGRhdGE7XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdwcmV2ZW50T3ZlcmZsb3cnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ21haW4nLFxuICBmbjogcHJldmVudE92ZXJmbG93LFxuICByZXF1aXJlc0lmRXhpc3RzOiBbJ29mZnNldCddXG59OyIsImltcG9ydCB7IHBvcHBlckdlbmVyYXRvciwgZGV0ZWN0T3ZlcmZsb3cgfSBmcm9tIFwiLi9jcmVhdGVQb3BwZXIuanNcIjtcbmltcG9ydCBldmVudExpc3RlbmVycyBmcm9tIFwiLi9tb2RpZmllcnMvZXZlbnRMaXN0ZW5lcnMuanNcIjtcbmltcG9ydCBwb3BwZXJPZmZzZXRzIGZyb20gXCIuL21vZGlmaWVycy9wb3BwZXJPZmZzZXRzLmpzXCI7XG5pbXBvcnQgY29tcHV0ZVN0eWxlcyBmcm9tIFwiLi9tb2RpZmllcnMvY29tcHV0ZVN0eWxlcy5qc1wiO1xuaW1wb3J0IGFwcGx5U3R5bGVzIGZyb20gXCIuL21vZGlmaWVycy9hcHBseVN0eWxlcy5qc1wiO1xudmFyIGRlZmF1bHRNb2RpZmllcnMgPSBbZXZlbnRMaXN0ZW5lcnMsIHBvcHBlck9mZnNldHMsIGNvbXB1dGVTdHlsZXMsIGFwcGx5U3R5bGVzXTtcbnZhciBjcmVhdGVQb3BwZXIgPSAvKiNfX1BVUkVfXyovcG9wcGVyR2VuZXJhdG9yKHtcbiAgZGVmYXVsdE1vZGlmaWVyczogZGVmYXVsdE1vZGlmaWVyc1xufSk7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZXhwb3J0IHsgY3JlYXRlUG9wcGVyLCBwb3BwZXJHZW5lcmF0b3IsIGRlZmF1bHRNb2RpZmllcnMsIGRldGVjdE92ZXJmbG93IH07IiwiaW1wb3J0IHsgcG9wcGVyR2VuZXJhdG9yLCBkZXRlY3RPdmVyZmxvdyB9IGZyb20gXCIuL2NyZWF0ZVBvcHBlci5qc1wiO1xuaW1wb3J0IGV2ZW50TGlzdGVuZXJzIGZyb20gXCIuL21vZGlmaWVycy9ldmVudExpc3RlbmVycy5qc1wiO1xuaW1wb3J0IHBvcHBlck9mZnNldHMgZnJvbSBcIi4vbW9kaWZpZXJzL3BvcHBlck9mZnNldHMuanNcIjtcbmltcG9ydCBjb21wdXRlU3R5bGVzIGZyb20gXCIuL21vZGlmaWVycy9jb21wdXRlU3R5bGVzLmpzXCI7XG5pbXBvcnQgYXBwbHlTdHlsZXMgZnJvbSBcIi4vbW9kaWZpZXJzL2FwcGx5U3R5bGVzLmpzXCI7XG5pbXBvcnQgb2Zmc2V0IGZyb20gXCIuL21vZGlmaWVycy9vZmZzZXQuanNcIjtcbmltcG9ydCBmbGlwIGZyb20gXCIuL21vZGlmaWVycy9mbGlwLmpzXCI7XG5pbXBvcnQgcHJldmVudE92ZXJmbG93IGZyb20gXCIuL21vZGlmaWVycy9wcmV2ZW50T3ZlcmZsb3cuanNcIjtcbmltcG9ydCBhcnJvdyBmcm9tIFwiLi9tb2RpZmllcnMvYXJyb3cuanNcIjtcbmltcG9ydCBoaWRlIGZyb20gXCIuL21vZGlmaWVycy9oaWRlLmpzXCI7XG52YXIgZGVmYXVsdE1vZGlmaWVycyA9IFtldmVudExpc3RlbmVycywgcG9wcGVyT2Zmc2V0cywgY29tcHV0ZVN0eWxlcywgYXBwbHlTdHlsZXMsIG9mZnNldCwgZmxpcCwgcHJldmVudE92ZXJmbG93LCBhcnJvdywgaGlkZV07XG52YXIgY3JlYXRlUG9wcGVyID0gLyojX19QVVJFX18qL3BvcHBlckdlbmVyYXRvcih7XG4gIGRlZmF1bHRNb2RpZmllcnM6IGRlZmF1bHRNb2RpZmllcnNcbn0pOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbmV4cG9ydCB7IGNyZWF0ZVBvcHBlciwgcG9wcGVyR2VuZXJhdG9yLCBkZWZhdWx0TW9kaWZpZXJzLCBkZXRlY3RPdmVyZmxvdyB9OyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbmV4cG9ydCB7IGNyZWF0ZVBvcHBlciBhcyBjcmVhdGVQb3BwZXJMaXRlIH0gZnJvbSBcIi4vcG9wcGVyLWxpdGUuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgKiBmcm9tIFwiLi9tb2RpZmllcnMvaW5kZXguanNcIjsiLCJpbXBvcnQgZ2V0VmFyaWF0aW9uIGZyb20gXCIuL2dldFZhcmlhdGlvbi5qc1wiO1xuaW1wb3J0IHsgdmFyaWF0aW9uUGxhY2VtZW50cywgYmFzZVBsYWNlbWVudHMsIHBsYWNlbWVudHMgYXMgYWxsUGxhY2VtZW50cyB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IGRldGVjdE92ZXJmbG93IGZyb20gXCIuL2RldGVjdE92ZXJmbG93LmpzXCI7XG5pbXBvcnQgZ2V0QmFzZVBsYWNlbWVudCBmcm9tIFwiLi9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21wdXRlQXV0b1BsYWNlbWVudChzdGF0ZSwgb3B0aW9ucykge1xuICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgdmFyIF9vcHRpb25zID0gb3B0aW9ucyxcbiAgICAgIHBsYWNlbWVudCA9IF9vcHRpb25zLnBsYWNlbWVudCxcbiAgICAgIGJvdW5kYXJ5ID0gX29wdGlvbnMuYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnkgPSBfb3B0aW9ucy5yb290Qm91bmRhcnksXG4gICAgICBwYWRkaW5nID0gX29wdGlvbnMucGFkZGluZyxcbiAgICAgIGZsaXBWYXJpYXRpb25zID0gX29wdGlvbnMuZmxpcFZhcmlhdGlvbnMsXG4gICAgICBfb3B0aW9ucyRhbGxvd2VkQXV0b1AgPSBfb3B0aW9ucy5hbGxvd2VkQXV0b1BsYWNlbWVudHMsXG4gICAgICBhbGxvd2VkQXV0b1BsYWNlbWVudHMgPSBfb3B0aW9ucyRhbGxvd2VkQXV0b1AgPT09IHZvaWQgMCA/IGFsbFBsYWNlbWVudHMgOiBfb3B0aW9ucyRhbGxvd2VkQXV0b1A7XG4gIHZhciB2YXJpYXRpb24gPSBnZXRWYXJpYXRpb24ocGxhY2VtZW50KTtcbiAgdmFyIHBsYWNlbWVudHMgPSB2YXJpYXRpb24gPyBmbGlwVmFyaWF0aW9ucyA/IHZhcmlhdGlvblBsYWNlbWVudHMgOiB2YXJpYXRpb25QbGFjZW1lbnRzLmZpbHRlcihmdW5jdGlvbiAocGxhY2VtZW50KSB7XG4gICAgcmV0dXJuIGdldFZhcmlhdGlvbihwbGFjZW1lbnQpID09PSB2YXJpYXRpb247XG4gIH0pIDogYmFzZVBsYWNlbWVudHM7XG4gIHZhciBhbGxvd2VkUGxhY2VtZW50cyA9IHBsYWNlbWVudHMuZmlsdGVyKGZ1bmN0aW9uIChwbGFjZW1lbnQpIHtcbiAgICByZXR1cm4gYWxsb3dlZEF1dG9QbGFjZW1lbnRzLmluZGV4T2YocGxhY2VtZW50KSA+PSAwO1xuICB9KTtcblxuICBpZiAoYWxsb3dlZFBsYWNlbWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgYWxsb3dlZFBsYWNlbWVudHMgPSBwbGFjZW1lbnRzO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgY29uc29sZS5lcnJvcihbJ1BvcHBlcjogVGhlIGBhbGxvd2VkQXV0b1BsYWNlbWVudHNgIG9wdGlvbiBkaWQgbm90IGFsbG93IGFueScsICdwbGFjZW1lbnRzLiBFbnN1cmUgdGhlIGBwbGFjZW1lbnRgIG9wdGlvbiBtYXRjaGVzIHRoZSB2YXJpYXRpb24nLCAnb2YgdGhlIGFsbG93ZWQgcGxhY2VtZW50cy4nLCAnRm9yIGV4YW1wbGUsIFwiYXV0b1wiIGNhbm5vdCBiZSB1c2VkIHRvIGFsbG93IFwiYm90dG9tLXN0YXJ0XCIuJywgJ1VzZSBcImF1dG8tc3RhcnRcIiBpbnN0ZWFkLiddLmpvaW4oJyAnKSk7XG4gICAgfVxuICB9IC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXR5cGVdOiBGbG93IHNlZW1zIHRvIGhhdmUgcHJvYmxlbXMgd2l0aCB0d28gYXJyYXkgdW5pb25zLi4uXG5cblxuICB2YXIgb3ZlcmZsb3dzID0gYWxsb3dlZFBsYWNlbWVudHMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHBsYWNlbWVudCkge1xuICAgIGFjY1twbGFjZW1lbnRdID0gZGV0ZWN0T3ZlcmZsb3coc3RhdGUsIHtcbiAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50LFxuICAgICAgYm91bmRhcnk6IGJvdW5kYXJ5LFxuICAgICAgcm9vdEJvdW5kYXJ5OiByb290Qm91bmRhcnksXG4gICAgICBwYWRkaW5nOiBwYWRkaW5nXG4gICAgfSlbZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpXTtcbiAgICByZXR1cm4gYWNjO1xuICB9LCB7fSk7XG4gIHJldHVybiBPYmplY3Qua2V5cyhvdmVyZmxvd3MpLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gb3ZlcmZsb3dzW2FdIC0gb3ZlcmZsb3dzW2JdO1xuICB9KTtcbn0iLCJpbXBvcnQgZ2V0QmFzZVBsYWNlbWVudCBmcm9tIFwiLi9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0VmFyaWF0aW9uIGZyb20gXCIuL2dldFZhcmlhdGlvbi5qc1wiO1xuaW1wb3J0IGdldE1haW5BeGlzRnJvbVBsYWNlbWVudCBmcm9tIFwiLi9nZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQuanNcIjtcbmltcG9ydCB7IHRvcCwgcmlnaHQsIGJvdHRvbSwgbGVmdCwgc3RhcnQsIGVuZCB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tcHV0ZU9mZnNldHMoX3JlZikge1xuICB2YXIgcmVmZXJlbmNlID0gX3JlZi5yZWZlcmVuY2UsXG4gICAgICBlbGVtZW50ID0gX3JlZi5lbGVtZW50LFxuICAgICAgcGxhY2VtZW50ID0gX3JlZi5wbGFjZW1lbnQ7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gcGxhY2VtZW50ID8gZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpIDogbnVsbDtcbiAgdmFyIHZhcmlhdGlvbiA9IHBsYWNlbWVudCA/IGdldFZhcmlhdGlvbihwbGFjZW1lbnQpIDogbnVsbDtcbiAgdmFyIGNvbW1vblggPSByZWZlcmVuY2UueCArIHJlZmVyZW5jZS53aWR0aCAvIDIgLSBlbGVtZW50LndpZHRoIC8gMjtcbiAgdmFyIGNvbW1vblkgPSByZWZlcmVuY2UueSArIHJlZmVyZW5jZS5oZWlnaHQgLyAyIC0gZWxlbWVudC5oZWlnaHQgLyAyO1xuICB2YXIgb2Zmc2V0cztcblxuICBzd2l0Y2ggKGJhc2VQbGFjZW1lbnQpIHtcbiAgICBjYXNlIHRvcDpcbiAgICAgIG9mZnNldHMgPSB7XG4gICAgICAgIHg6IGNvbW1vblgsXG4gICAgICAgIHk6IHJlZmVyZW5jZS55IC0gZWxlbWVudC5oZWlnaHRcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgYm90dG9tOlxuICAgICAgb2Zmc2V0cyA9IHtcbiAgICAgICAgeDogY29tbW9uWCxcbiAgICAgICAgeTogcmVmZXJlbmNlLnkgKyByZWZlcmVuY2UuaGVpZ2h0XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIHJpZ2h0OlxuICAgICAgb2Zmc2V0cyA9IHtcbiAgICAgICAgeDogcmVmZXJlbmNlLnggKyByZWZlcmVuY2Uud2lkdGgsXG4gICAgICAgIHk6IGNvbW1vbllcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgbGVmdDpcbiAgICAgIG9mZnNldHMgPSB7XG4gICAgICAgIHg6IHJlZmVyZW5jZS54IC0gZWxlbWVudC53aWR0aCxcbiAgICAgICAgeTogY29tbW9uWVxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIG9mZnNldHMgPSB7XG4gICAgICAgIHg6IHJlZmVyZW5jZS54LFxuICAgICAgICB5OiByZWZlcmVuY2UueVxuICAgICAgfTtcbiAgfVxuXG4gIHZhciBtYWluQXhpcyA9IGJhc2VQbGFjZW1lbnQgPyBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQoYmFzZVBsYWNlbWVudCkgOiBudWxsO1xuXG4gIGlmIChtYWluQXhpcyAhPSBudWxsKSB7XG4gICAgdmFyIGxlbiA9IG1haW5BeGlzID09PSAneScgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG5cbiAgICBzd2l0Y2ggKHZhcmlhdGlvbikge1xuICAgICAgY2FzZSBzdGFydDpcbiAgICAgICAgb2Zmc2V0c1ttYWluQXhpc10gPSBvZmZzZXRzW21haW5BeGlzXSAtIChyZWZlcmVuY2VbbGVuXSAvIDIgLSBlbGVtZW50W2xlbl0gLyAyKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgZW5kOlxuICAgICAgICBvZmZzZXRzW21haW5BeGlzXSA9IG9mZnNldHNbbWFpbkF4aXNdICsgKHJlZmVyZW5jZVtsZW5dIC8gMiAtIGVsZW1lbnRbbGVuXSAvIDIpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2Zmc2V0cztcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWJvdW5jZShmbikge1xuICB2YXIgcGVuZGluZztcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXBlbmRpbmcpIHtcbiAgICAgIHBlbmRpbmcgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBwZW5kaW5nID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHJlc29sdmUoZm4oKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBlbmRpbmc7XG4gIH07XG59IiwiaW1wb3J0IGdldENsaXBwaW5nUmVjdCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldENsaXBwaW5nUmVjdC5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldERvY3VtZW50RWxlbWVudC5qc1wiO1xuaW1wb3J0IGdldEJvdW5kaW5nQ2xpZW50UmVjdCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldEJvdW5kaW5nQ2xpZW50UmVjdC5qc1wiO1xuaW1wb3J0IGNvbXB1dGVPZmZzZXRzIGZyb20gXCIuL2NvbXB1dGVPZmZzZXRzLmpzXCI7XG5pbXBvcnQgcmVjdFRvQ2xpZW50UmVjdCBmcm9tIFwiLi9yZWN0VG9DbGllbnRSZWN0LmpzXCI7XG5pbXBvcnQgeyBjbGlwcGluZ1BhcmVudHMsIHJlZmVyZW5jZSwgcG9wcGVyLCBib3R0b20sIHRvcCwgcmlnaHQsIGJhc2VQbGFjZW1lbnRzLCB2aWV3cG9ydCB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IHsgaXNFbGVtZW50IH0gZnJvbSBcIi4uL2RvbS11dGlscy9pbnN0YW5jZU9mLmpzXCI7XG5pbXBvcnQgbWVyZ2VQYWRkaW5nT2JqZWN0IGZyb20gXCIuL21lcmdlUGFkZGluZ09iamVjdC5qc1wiO1xuaW1wb3J0IGV4cGFuZFRvSGFzaE1hcCBmcm9tIFwiLi9leHBhbmRUb0hhc2hNYXAuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwgb3B0aW9ucykge1xuICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgdmFyIF9vcHRpb25zID0gb3B0aW9ucyxcbiAgICAgIF9vcHRpb25zJHBsYWNlbWVudCA9IF9vcHRpb25zLnBsYWNlbWVudCxcbiAgICAgIHBsYWNlbWVudCA9IF9vcHRpb25zJHBsYWNlbWVudCA9PT0gdm9pZCAwID8gc3RhdGUucGxhY2VtZW50IDogX29wdGlvbnMkcGxhY2VtZW50LFxuICAgICAgX29wdGlvbnMkc3RyYXRlZ3kgPSBfb3B0aW9ucy5zdHJhdGVneSxcbiAgICAgIHN0cmF0ZWd5ID0gX29wdGlvbnMkc3RyYXRlZ3kgPT09IHZvaWQgMCA/IHN0YXRlLnN0cmF0ZWd5IDogX29wdGlvbnMkc3RyYXRlZ3ksXG4gICAgICBfb3B0aW9ucyRib3VuZGFyeSA9IF9vcHRpb25zLmJvdW5kYXJ5LFxuICAgICAgYm91bmRhcnkgPSBfb3B0aW9ucyRib3VuZGFyeSA9PT0gdm9pZCAwID8gY2xpcHBpbmdQYXJlbnRzIDogX29wdGlvbnMkYm91bmRhcnksXG4gICAgICBfb3B0aW9ucyRyb290Qm91bmRhcnkgPSBfb3B0aW9ucy5yb290Qm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnkgPSBfb3B0aW9ucyRyb290Qm91bmRhcnkgPT09IHZvaWQgMCA/IHZpZXdwb3J0IDogX29wdGlvbnMkcm9vdEJvdW5kYXJ5LFxuICAgICAgX29wdGlvbnMkZWxlbWVudENvbnRlID0gX29wdGlvbnMuZWxlbWVudENvbnRleHQsXG4gICAgICBlbGVtZW50Q29udGV4dCA9IF9vcHRpb25zJGVsZW1lbnRDb250ZSA9PT0gdm9pZCAwID8gcG9wcGVyIDogX29wdGlvbnMkZWxlbWVudENvbnRlLFxuICAgICAgX29wdGlvbnMkYWx0Qm91bmRhcnkgPSBfb3B0aW9ucy5hbHRCb3VuZGFyeSxcbiAgICAgIGFsdEJvdW5kYXJ5ID0gX29wdGlvbnMkYWx0Qm91bmRhcnkgPT09IHZvaWQgMCA/IGZhbHNlIDogX29wdGlvbnMkYWx0Qm91bmRhcnksXG4gICAgICBfb3B0aW9ucyRwYWRkaW5nID0gX29wdGlvbnMucGFkZGluZyxcbiAgICAgIHBhZGRpbmcgPSBfb3B0aW9ucyRwYWRkaW5nID09PSB2b2lkIDAgPyAwIDogX29wdGlvbnMkcGFkZGluZztcbiAgdmFyIHBhZGRpbmdPYmplY3QgPSBtZXJnZVBhZGRpbmdPYmplY3QodHlwZW9mIHBhZGRpbmcgIT09ICdudW1iZXInID8gcGFkZGluZyA6IGV4cGFuZFRvSGFzaE1hcChwYWRkaW5nLCBiYXNlUGxhY2VtZW50cykpO1xuICB2YXIgYWx0Q29udGV4dCA9IGVsZW1lbnRDb250ZXh0ID09PSBwb3BwZXIgPyByZWZlcmVuY2UgOiBwb3BwZXI7XG4gIHZhciBwb3BwZXJSZWN0ID0gc3RhdGUucmVjdHMucG9wcGVyO1xuICB2YXIgZWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzW2FsdEJvdW5kYXJ5ID8gYWx0Q29udGV4dCA6IGVsZW1lbnRDb250ZXh0XTtcbiAgdmFyIGNsaXBwaW5nQ2xpZW50UmVjdCA9IGdldENsaXBwaW5nUmVjdChpc0VsZW1lbnQoZWxlbWVudCkgPyBlbGVtZW50IDogZWxlbWVudC5jb250ZXh0RWxlbWVudCB8fCBnZXREb2N1bWVudEVsZW1lbnQoc3RhdGUuZWxlbWVudHMucG9wcGVyKSwgYm91bmRhcnksIHJvb3RCb3VuZGFyeSwgc3RyYXRlZ3kpO1xuICB2YXIgcmVmZXJlbmNlQ2xpZW50UmVjdCA9IGdldEJvdW5kaW5nQ2xpZW50UmVjdChzdGF0ZS5lbGVtZW50cy5yZWZlcmVuY2UpO1xuICB2YXIgcG9wcGVyT2Zmc2V0cyA9IGNvbXB1dGVPZmZzZXRzKHtcbiAgICByZWZlcmVuY2U6IHJlZmVyZW5jZUNsaWVudFJlY3QsXG4gICAgZWxlbWVudDogcG9wcGVyUmVjdCxcbiAgICBzdHJhdGVneTogJ2Fic29sdXRlJyxcbiAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudFxuICB9KTtcbiAgdmFyIHBvcHBlckNsaWVudFJlY3QgPSByZWN0VG9DbGllbnRSZWN0KE9iamVjdC5hc3NpZ24oe30sIHBvcHBlclJlY3QsIHBvcHBlck9mZnNldHMpKTtcbiAgdmFyIGVsZW1lbnRDbGllbnRSZWN0ID0gZWxlbWVudENvbnRleHQgPT09IHBvcHBlciA/IHBvcHBlckNsaWVudFJlY3QgOiByZWZlcmVuY2VDbGllbnRSZWN0OyAvLyBwb3NpdGl2ZSA9IG92ZXJmbG93aW5nIHRoZSBjbGlwcGluZyByZWN0XG4gIC8vIDAgb3IgbmVnYXRpdmUgPSB3aXRoaW4gdGhlIGNsaXBwaW5nIHJlY3RcblxuICB2YXIgb3ZlcmZsb3dPZmZzZXRzID0ge1xuICAgIHRvcDogY2xpcHBpbmdDbGllbnRSZWN0LnRvcCAtIGVsZW1lbnRDbGllbnRSZWN0LnRvcCArIHBhZGRpbmdPYmplY3QudG9wLFxuICAgIGJvdHRvbTogZWxlbWVudENsaWVudFJlY3QuYm90dG9tIC0gY2xpcHBpbmdDbGllbnRSZWN0LmJvdHRvbSArIHBhZGRpbmdPYmplY3QuYm90dG9tLFxuICAgIGxlZnQ6IGNsaXBwaW5nQ2xpZW50UmVjdC5sZWZ0IC0gZWxlbWVudENsaWVudFJlY3QubGVmdCArIHBhZGRpbmdPYmplY3QubGVmdCxcbiAgICByaWdodDogZWxlbWVudENsaWVudFJlY3QucmlnaHQgLSBjbGlwcGluZ0NsaWVudFJlY3QucmlnaHQgKyBwYWRkaW5nT2JqZWN0LnJpZ2h0XG4gIH07XG4gIHZhciBvZmZzZXREYXRhID0gc3RhdGUubW9kaWZpZXJzRGF0YS5vZmZzZXQ7IC8vIE9mZnNldHMgY2FuIGJlIGFwcGxpZWQgb25seSB0byB0aGUgcG9wcGVyIGVsZW1lbnRcblxuICBpZiAoZWxlbWVudENvbnRleHQgPT09IHBvcHBlciAmJiBvZmZzZXREYXRhKSB7XG4gICAgdmFyIG9mZnNldCA9IG9mZnNldERhdGFbcGxhY2VtZW50XTtcbiAgICBPYmplY3Qua2V5cyhvdmVyZmxvd09mZnNldHMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgdmFyIG11bHRpcGx5ID0gW3JpZ2h0LCBib3R0b21dLmluZGV4T2Yoa2V5KSA+PSAwID8gMSA6IC0xO1xuICAgICAgdmFyIGF4aXMgPSBbdG9wLCBib3R0b21dLmluZGV4T2Yoa2V5KSA+PSAwID8gJ3knIDogJ3gnO1xuICAgICAgb3ZlcmZsb3dPZmZzZXRzW2tleV0gKz0gb2Zmc2V0W2F4aXNdICogbXVsdGlwbHk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gb3ZlcmZsb3dPZmZzZXRzO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4cGFuZFRvSGFzaE1hcCh2YWx1ZSwga2V5cykge1xuICByZXR1cm4ga2V5cy5yZWR1Y2UoZnVuY3Rpb24gKGhhc2hNYXAsIGtleSkge1xuICAgIGhhc2hNYXBba2V5XSA9IHZhbHVlO1xuICAgIHJldHVybiBoYXNoTWFwO1xuICB9LCB7fSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9ybWF0KHN0cikge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICByZXR1cm4gW10uY29uY2F0KGFyZ3MpLnJlZHVjZShmdW5jdGlvbiAocCwgYykge1xuICAgIHJldHVybiBwLnJlcGxhY2UoLyVzLywgYyk7XG4gIH0sIHN0cik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0QWx0QXhpcyhheGlzKSB7XG4gIHJldHVybiBheGlzID09PSAneCcgPyAneScgOiAneCc7XG59IiwiaW1wb3J0IHsgYXV0byB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIHBsYWNlbWVudC5zcGxpdCgnLScpWzBdO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEZyZXNoU2lkZU9iamVjdCgpIHtcbiAgcmV0dXJuIHtcbiAgICB0b3A6IDAsXG4gICAgcmlnaHQ6IDAsXG4gICAgYm90dG9tOiAwLFxuICAgIGxlZnQ6IDBcbiAgfTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQocGxhY2VtZW50KSB7XG4gIHJldHVybiBbJ3RvcCcsICdib3R0b20nXS5pbmRleE9mKHBsYWNlbWVudCkgPj0gMCA/ICd4JyA6ICd5Jztcbn0iLCJ2YXIgaGFzaCA9IHtcbiAgbGVmdDogJ3JpZ2h0JyxcbiAgcmlnaHQ6ICdsZWZ0JyxcbiAgYm90dG9tOiAndG9wJyxcbiAgdG9wOiAnYm90dG9tJ1xufTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE9wcG9zaXRlUGxhY2VtZW50KHBsYWNlbWVudCkge1xuICByZXR1cm4gcGxhY2VtZW50LnJlcGxhY2UoL2xlZnR8cmlnaHR8Ym90dG9tfHRvcC9nLCBmdW5jdGlvbiAobWF0Y2hlZCkge1xuICAgIHJldHVybiBoYXNoW21hdGNoZWRdO1xuICB9KTtcbn0iLCJ2YXIgaGFzaCA9IHtcbiAgc3RhcnQ6ICdlbmQnLFxuICBlbmQ6ICdzdGFydCdcbn07XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRPcHBvc2l0ZVZhcmlhdGlvblBsYWNlbWVudChwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIHBsYWNlbWVudC5yZXBsYWNlKC9zdGFydHxlbmQvZywgZnVuY3Rpb24gKG1hdGNoZWQpIHtcbiAgICByZXR1cm4gaGFzaFttYXRjaGVkXTtcbiAgfSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0VmFyaWF0aW9uKHBsYWNlbWVudCkge1xuICByZXR1cm4gcGxhY2VtZW50LnNwbGl0KCctJylbMV07XG59IiwiZXhwb3J0IHZhciBtYXggPSBNYXRoLm1heDtcbmV4cG9ydCB2YXIgbWluID0gTWF0aC5taW47XG5leHBvcnQgdmFyIHJvdW5kID0gTWF0aC5yb3VuZDsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtZXJnZUJ5TmFtZShtb2RpZmllcnMpIHtcbiAgdmFyIG1lcmdlZCA9IG1vZGlmaWVycy5yZWR1Y2UoZnVuY3Rpb24gKG1lcmdlZCwgY3VycmVudCkge1xuICAgIHZhciBleGlzdGluZyA9IG1lcmdlZFtjdXJyZW50Lm5hbWVdO1xuICAgIG1lcmdlZFtjdXJyZW50Lm5hbWVdID0gZXhpc3RpbmcgPyBPYmplY3QuYXNzaWduKHt9LCBleGlzdGluZywgY3VycmVudCwge1xuICAgICAgb3B0aW9uczogT2JqZWN0LmFzc2lnbih7fSwgZXhpc3Rpbmcub3B0aW9ucywgY3VycmVudC5vcHRpb25zKSxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGV4aXN0aW5nLmRhdGEsIGN1cnJlbnQuZGF0YSlcbiAgICB9KSA6IGN1cnJlbnQ7XG4gICAgcmV0dXJuIG1lcmdlZDtcbiAgfSwge30pOyAvLyBJRTExIGRvZXMgbm90IHN1cHBvcnQgT2JqZWN0LnZhbHVlc1xuXG4gIHJldHVybiBPYmplY3Qua2V5cyhtZXJnZWQpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIG1lcmdlZFtrZXldO1xuICB9KTtcbn0iLCJpbXBvcnQgZ2V0RnJlc2hTaWRlT2JqZWN0IGZyb20gXCIuL2dldEZyZXNoU2lkZU9iamVjdC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWVyZ2VQYWRkaW5nT2JqZWN0KHBhZGRpbmdPYmplY3QpIHtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGdldEZyZXNoU2lkZU9iamVjdCgpLCBwYWRkaW5nT2JqZWN0KTtcbn0iLCJpbXBvcnQgeyBtb2RpZmllclBoYXNlcyB9IGZyb20gXCIuLi9lbnVtcy5qc1wiOyAvLyBzb3VyY2U6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQ5ODc1MjU1XG5cbmZ1bmN0aW9uIG9yZGVyKG1vZGlmaWVycykge1xuICB2YXIgbWFwID0gbmV3IE1hcCgpO1xuICB2YXIgdmlzaXRlZCA9IG5ldyBTZXQoKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBtb2RpZmllcnMuZm9yRWFjaChmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICBtYXAuc2V0KG1vZGlmaWVyLm5hbWUsIG1vZGlmaWVyKTtcbiAgfSk7IC8vIE9uIHZpc2l0aW5nIG9iamVjdCwgY2hlY2sgZm9yIGl0cyBkZXBlbmRlbmNpZXMgYW5kIHZpc2l0IHRoZW0gcmVjdXJzaXZlbHlcblxuICBmdW5jdGlvbiBzb3J0KG1vZGlmaWVyKSB7XG4gICAgdmlzaXRlZC5hZGQobW9kaWZpZXIubmFtZSk7XG4gICAgdmFyIHJlcXVpcmVzID0gW10uY29uY2F0KG1vZGlmaWVyLnJlcXVpcmVzIHx8IFtdLCBtb2RpZmllci5yZXF1aXJlc0lmRXhpc3RzIHx8IFtdKTtcbiAgICByZXF1aXJlcy5mb3JFYWNoKGZ1bmN0aW9uIChkZXApIHtcbiAgICAgIGlmICghdmlzaXRlZC5oYXMoZGVwKSkge1xuICAgICAgICB2YXIgZGVwTW9kaWZpZXIgPSBtYXAuZ2V0KGRlcCk7XG5cbiAgICAgICAgaWYgKGRlcE1vZGlmaWVyKSB7XG4gICAgICAgICAgc29ydChkZXBNb2RpZmllcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXN1bHQucHVzaChtb2RpZmllcik7XG4gIH1cblxuICBtb2RpZmllcnMuZm9yRWFjaChmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICBpZiAoIXZpc2l0ZWQuaGFzKG1vZGlmaWVyLm5hbWUpKSB7XG4gICAgICAvLyBjaGVjayBmb3IgdmlzaXRlZCBvYmplY3RcbiAgICAgIHNvcnQobW9kaWZpZXIpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9yZGVyTW9kaWZpZXJzKG1vZGlmaWVycykge1xuICAvLyBvcmRlciBiYXNlZCBvbiBkZXBlbmRlbmNpZXNcbiAgdmFyIG9yZGVyZWRNb2RpZmllcnMgPSBvcmRlcihtb2RpZmllcnMpOyAvLyBvcmRlciBiYXNlZCBvbiBwaGFzZVxuXG4gIHJldHVybiBtb2RpZmllclBoYXNlcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcGhhc2UpIHtcbiAgICByZXR1cm4gYWNjLmNvbmNhdChvcmRlcmVkTW9kaWZpZXJzLmZpbHRlcihmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICAgIHJldHVybiBtb2RpZmllci5waGFzZSA9PT0gcGhhc2U7XG4gICAgfSkpO1xuICB9LCBbXSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVjdFRvQ2xpZW50UmVjdChyZWN0KSB7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCByZWN0LCB7XG4gICAgbGVmdDogcmVjdC54LFxuICAgIHRvcDogcmVjdC55LFxuICAgIHJpZ2h0OiByZWN0LnggKyByZWN0LndpZHRoLFxuICAgIGJvdHRvbTogcmVjdC55ICsgcmVjdC5oZWlnaHRcbiAgfSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdW5pcXVlQnkoYXJyLCBmbikge1xuICB2YXIgaWRlbnRpZmllcnMgPSBuZXcgU2V0KCk7XG4gIHJldHVybiBhcnIuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBmbihpdGVtKTtcblxuICAgIGlmICghaWRlbnRpZmllcnMuaGFzKGlkZW50aWZpZXIpKSB7XG4gICAgICBpZGVudGlmaWVycy5hZGQoaWRlbnRpZmllcik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0pO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFVBU3RyaW5nKCkge1xuICB2YXIgdWFEYXRhID0gbmF2aWdhdG9yLnVzZXJBZ2VudERhdGE7XG5cbiAgaWYgKHVhRGF0YSAhPSBudWxsICYmIHVhRGF0YS5icmFuZHMgJiYgQXJyYXkuaXNBcnJheSh1YURhdGEuYnJhbmRzKSkge1xuICAgIHJldHVybiB1YURhdGEuYnJhbmRzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuIGl0ZW0uYnJhbmQgKyBcIi9cIiArIGl0ZW0udmVyc2lvbjtcbiAgICB9KS5qb2luKCcgJyk7XG4gIH1cblxuICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbn0iLCJpbXBvcnQgZm9ybWF0IGZyb20gXCIuL2Zvcm1hdC5qc1wiO1xuaW1wb3J0IHsgbW9kaWZpZXJQaGFzZXMgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbnZhciBJTlZBTElEX01PRElGSUVSX0VSUk9SID0gJ1BvcHBlcjogbW9kaWZpZXIgXCIlc1wiIHByb3ZpZGVkIGFuIGludmFsaWQgJXMgcHJvcGVydHksIGV4cGVjdGVkICVzIGJ1dCBnb3QgJXMnO1xudmFyIE1JU1NJTkdfREVQRU5ERU5DWV9FUlJPUiA9ICdQb3BwZXI6IG1vZGlmaWVyIFwiJXNcIiByZXF1aXJlcyBcIiVzXCIsIGJ1dCBcIiVzXCIgbW9kaWZpZXIgaXMgbm90IGF2YWlsYWJsZSc7XG52YXIgVkFMSURfUFJPUEVSVElFUyA9IFsnbmFtZScsICdlbmFibGVkJywgJ3BoYXNlJywgJ2ZuJywgJ2VmZmVjdCcsICdyZXF1aXJlcycsICdvcHRpb25zJ107XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2YWxpZGF0ZU1vZGlmaWVycyhtb2RpZmllcnMpIHtcbiAgbW9kaWZpZXJzLmZvckVhY2goZnVuY3Rpb24gKG1vZGlmaWVyKSB7XG4gICAgW10uY29uY2F0KE9iamVjdC5rZXlzKG1vZGlmaWVyKSwgVkFMSURfUFJPUEVSVElFUykgLy8gSUUxMS1jb21wYXRpYmxlIHJlcGxhY2VtZW50IGZvciBgbmV3IFNldChpdGVyYWJsZSlgXG4gICAgLmZpbHRlcihmdW5jdGlvbiAodmFsdWUsIGluZGV4LCBzZWxmKSB7XG4gICAgICByZXR1cm4gc2VsZi5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXg7XG4gICAgfSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlICduYW1lJzpcbiAgICAgICAgICBpZiAodHlwZW9mIG1vZGlmaWVyLm5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1hdChJTlZBTElEX01PRElGSUVSX0VSUk9SLCBTdHJpbmcobW9kaWZpZXIubmFtZSksICdcIm5hbWVcIicsICdcInN0cmluZ1wiJywgXCJcXFwiXCIgKyBTdHJpbmcobW9kaWZpZXIubmFtZSkgKyBcIlxcXCJcIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2VuYWJsZWQnOlxuICAgICAgICAgIGlmICh0eXBlb2YgbW9kaWZpZXIuZW5hYmxlZCAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1hdChJTlZBTElEX01PRElGSUVSX0VSUk9SLCBtb2RpZmllci5uYW1lLCAnXCJlbmFibGVkXCInLCAnXCJib29sZWFuXCInLCBcIlxcXCJcIiArIFN0cmluZyhtb2RpZmllci5lbmFibGVkKSArIFwiXFxcIlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAncGhhc2UnOlxuICAgICAgICAgIGlmIChtb2RpZmllclBoYXNlcy5pbmRleE9mKG1vZGlmaWVyLnBoYXNlKSA8IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybWF0KElOVkFMSURfTU9ESUZJRVJfRVJST1IsIG1vZGlmaWVyLm5hbWUsICdcInBoYXNlXCInLCBcImVpdGhlciBcIiArIG1vZGlmaWVyUGhhc2VzLmpvaW4oJywgJyksIFwiXFxcIlwiICsgU3RyaW5nKG1vZGlmaWVyLnBoYXNlKSArIFwiXFxcIlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnZm4nOlxuICAgICAgICAgIGlmICh0eXBlb2YgbW9kaWZpZXIuZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybWF0KElOVkFMSURfTU9ESUZJRVJfRVJST1IsIG1vZGlmaWVyLm5hbWUsICdcImZuXCInLCAnXCJmdW5jdGlvblwiJywgXCJcXFwiXCIgKyBTdHJpbmcobW9kaWZpZXIuZm4pICsgXCJcXFwiXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdlZmZlY3QnOlxuICAgICAgICAgIGlmIChtb2RpZmllci5lZmZlY3QgIT0gbnVsbCAmJiB0eXBlb2YgbW9kaWZpZXIuZWZmZWN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1hdChJTlZBTElEX01PRElGSUVSX0VSUk9SLCBtb2RpZmllci5uYW1lLCAnXCJlZmZlY3RcIicsICdcImZ1bmN0aW9uXCInLCBcIlxcXCJcIiArIFN0cmluZyhtb2RpZmllci5mbikgKyBcIlxcXCJcIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3JlcXVpcmVzJzpcbiAgICAgICAgICBpZiAobW9kaWZpZXIucmVxdWlyZXMgIT0gbnVsbCAmJiAhQXJyYXkuaXNBcnJheShtb2RpZmllci5yZXF1aXJlcykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybWF0KElOVkFMSURfTU9ESUZJRVJfRVJST1IsIG1vZGlmaWVyLm5hbWUsICdcInJlcXVpcmVzXCInLCAnXCJhcnJheVwiJywgXCJcXFwiXCIgKyBTdHJpbmcobW9kaWZpZXIucmVxdWlyZXMpICsgXCJcXFwiXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdyZXF1aXJlc0lmRXhpc3RzJzpcbiAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkobW9kaWZpZXIucmVxdWlyZXNJZkV4aXN0cykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybWF0KElOVkFMSURfTU9ESUZJRVJfRVJST1IsIG1vZGlmaWVyLm5hbWUsICdcInJlcXVpcmVzSWZFeGlzdHNcIicsICdcImFycmF5XCInLCBcIlxcXCJcIiArIFN0cmluZyhtb2RpZmllci5yZXF1aXJlc0lmRXhpc3RzKSArIFwiXFxcIlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnb3B0aW9ucyc6XG4gICAgICAgIGNhc2UgJ2RhdGEnOlxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIlBvcHBlckpTOiBhbiBpbnZhbGlkIHByb3BlcnR5IGhhcyBiZWVuIHByb3ZpZGVkIHRvIHRoZSBcXFwiXCIgKyBtb2RpZmllci5uYW1lICsgXCJcXFwiIG1vZGlmaWVyLCB2YWxpZCBwcm9wZXJ0aWVzIGFyZSBcIiArIFZBTElEX1BST1BFUlRJRVMubWFwKGZ1bmN0aW9uIChzKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcXFwiXCIgKyBzICsgXCJcXFwiXCI7XG4gICAgICAgICAgfSkuam9pbignLCAnKSArIFwiOyBidXQgXFxcIlwiICsga2V5ICsgXCJcXFwiIHdhcyBwcm92aWRlZC5cIik7XG4gICAgICB9XG5cbiAgICAgIG1vZGlmaWVyLnJlcXVpcmVzICYmIG1vZGlmaWVyLnJlcXVpcmVzLmZvckVhY2goZnVuY3Rpb24gKHJlcXVpcmVtZW50KSB7XG4gICAgICAgIGlmIChtb2RpZmllcnMuZmluZChmdW5jdGlvbiAobW9kKSB7XG4gICAgICAgICAgcmV0dXJuIG1vZC5uYW1lID09PSByZXF1aXJlbWVudDtcbiAgICAgICAgfSkgPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybWF0KE1JU1NJTkdfREVQRU5ERU5DWV9FUlJPUiwgU3RyaW5nKG1vZGlmaWVyLm5hbWUpLCByZXF1aXJlbWVudCwgcmVxdWlyZW1lbnQpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufSIsImltcG9ydCB7IG1heCBhcyBtYXRoTWF4LCBtaW4gYXMgbWF0aE1pbiB9IGZyb20gXCIuL21hdGguanNcIjtcbmV4cG9ydCBmdW5jdGlvbiB3aXRoaW4obWluLCB2YWx1ZSwgbWF4KSB7XG4gIHJldHVybiBtYXRoTWF4KG1pbiwgbWF0aE1pbih2YWx1ZSwgbWF4KSk7XG59XG5leHBvcnQgZnVuY3Rpb24gd2l0aGluTWF4Q2xhbXAobWluLCB2YWx1ZSwgbWF4KSB7XG4gIHZhciB2ID0gd2l0aGluKG1pbiwgdmFsdWUsIG1heCk7XG4gIHJldHVybiB2ID4gbWF4ID8gbWF4IDogdjtcbn0iLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIERlZmF1bHQgPSB7XG4gICAgYWx3YXlzT3BlbjogZmFsc2UsXG4gICAgYWN0aXZlQ2xhc3NlczogJ2JnLWdyYXktMTAwIGRhcms6YmctZ3JheS04MDAgdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtd2hpdGUnLFxuICAgIGluYWN0aXZlQ2xhc3NlczogJ3RleHQtZ3JheS01MDAgZGFyazp0ZXh0LWdyYXktNDAwJyxcbiAgICBvbk9wZW46IGZ1bmN0aW9uICgpIHsgfSxcbiAgICBvbkNsb3NlOiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgb25Ub2dnbGU6IGZ1bmN0aW9uICgpIHsgfSxcbn07XG52YXIgQWNjb3JkaW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFjY29yZGlvbihpdGVtcywgb3B0aW9ucykge1xuICAgICAgICBpZiAoaXRlbXMgPT09IHZvaWQgMCkgeyBpdGVtcyA9IFtdOyB9XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IERlZmF1bHQ7IH1cbiAgICAgICAgdGhpcy5faXRlbXMgPSBpdGVtcztcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBEZWZhdWx0KSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9XG4gICAgQWNjb3JkaW9uLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gc2hvdyBhY2NvcmRpb24gaXRlbSBiYXNlZCBvbiBjbGlja1xuICAgICAgICAgICAgdGhpcy5faXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm9wZW4oaXRlbS5pZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGl0ZW0udHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy50b2dnbGUoaXRlbS5pZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQWNjb3JkaW9uLnByb3RvdHlwZS5nZXRJdGVtID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIGl0ZW0uaWQgPT09IGlkOyB9KVswXTtcbiAgICB9O1xuICAgIEFjY29yZGlvbi5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgaXRlbSA9IHRoaXMuZ2V0SXRlbShpZCk7XG4gICAgICAgIC8vIGRvbid0IGhpZGUgb3RoZXIgYWNjb3JkaW9ucyBpZiBhbHdheXMgb3BlblxuICAgICAgICBpZiAoIXRoaXMuX29wdGlvbnMuYWx3YXlzT3Blbikge1xuICAgICAgICAgICAgdGhpcy5faXRlbXMubWFwKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgICAgICBpZiAoaSAhPT0gaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAoX2EgPSBpLnRyaWdnZXJFbC5jbGFzc0xpc3QpLnJlbW92ZS5hcHBseShfYSwgX3RoaXMuX29wdGlvbnMuYWN0aXZlQ2xhc3Nlcy5zcGxpdCgnICcpKTtcbiAgICAgICAgICAgICAgICAgICAgKF9iID0gaS50cmlnZ2VyRWwuY2xhc3NMaXN0KS5hZGQuYXBwbHkoX2IsIF90aGlzLl9vcHRpb25zLmluYWN0aXZlQ2xhc3Nlcy5zcGxpdCgnICcpKTtcbiAgICAgICAgICAgICAgICAgICAgaS50YXJnZXRFbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgaS50cmlnZ2VyRWwuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgICAgICAgICAgICAgIGkuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJvdGF0ZSBpY29uIGlmIHNldFxuICAgICAgICAgICAgICAgICAgICBpZiAoaS5pY29uRWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkuaWNvbkVsLmNsYXNzTGlzdC5yZW1vdmUoJ3JvdGF0ZS0xODAnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNob3cgYWN0aXZlIGl0ZW1cbiAgICAgICAgKF9hID0gaXRlbS50cmlnZ2VyRWwuY2xhc3NMaXN0KS5hZGQuYXBwbHkoX2EsIHRoaXMuX29wdGlvbnMuYWN0aXZlQ2xhc3Nlcy5zcGxpdCgnICcpKTtcbiAgICAgICAgKF9iID0gaXRlbS50cmlnZ2VyRWwuY2xhc3NMaXN0KS5yZW1vdmUuYXBwbHkoX2IsIHRoaXMuX29wdGlvbnMuaW5hY3RpdmVDbGFzc2VzLnNwbGl0KCcgJykpO1xuICAgICAgICBpdGVtLnRyaWdnZXJFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgICAgICBpdGVtLnRhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICBpdGVtLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIC8vIHJvdGF0ZSBpY29uIGlmIHNldFxuICAgICAgICBpZiAoaXRlbS5pY29uRWwpIHtcbiAgICAgICAgICAgIGl0ZW0uaWNvbkVsLmNsYXNzTGlzdC5hZGQoJ3JvdGF0ZS0xODAnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uT3Blbih0aGlzLCBpdGVtKTtcbiAgICB9O1xuICAgIEFjY29yZGlvbi5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHZhciBpdGVtID0gdGhpcy5nZXRJdGVtKGlkKTtcbiAgICAgICAgaWYgKGl0ZW0uYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKGlkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3BlbihpZCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vblRvZ2dsZSh0aGlzLCBpdGVtKTtcbiAgICB9O1xuICAgIEFjY29yZGlvbi5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLmdldEl0ZW0oaWQpO1xuICAgICAgICAoX2EgPSBpdGVtLnRyaWdnZXJFbC5jbGFzc0xpc3QpLnJlbW92ZS5hcHBseShfYSwgdGhpcy5fb3B0aW9ucy5hY3RpdmVDbGFzc2VzLnNwbGl0KCcgJykpO1xuICAgICAgICAoX2IgPSBpdGVtLnRyaWdnZXJFbC5jbGFzc0xpc3QpLmFkZC5hcHBseShfYiwgdGhpcy5fb3B0aW9ucy5pbmFjdGl2ZUNsYXNzZXMuc3BsaXQoJyAnKSk7XG4gICAgICAgIGl0ZW0udGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgIGl0ZW0udHJpZ2dlckVsLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgICAgICBpdGVtLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAvLyByb3RhdGUgaWNvbiBpZiBzZXRcbiAgICAgICAgaWYgKGl0ZW0uaWNvbkVsKSB7XG4gICAgICAgICAgICBpdGVtLmljb25FbC5jbGFzc0xpc3QucmVtb3ZlKCdyb3RhdGUtMTgwJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vbkNsb3NlKHRoaXMsIGl0ZW0pO1xuICAgIH07XG4gICAgcmV0dXJuIEFjY29yZGlvbjtcbn0oKSk7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB3aW5kb3cuQWNjb3JkaW9uID0gQWNjb3JkaW9uO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGluaXRBY2NvcmRpb25zKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWFjY29yZGlvbl0nKS5mb3JFYWNoKGZ1bmN0aW9uICgkYWNjb3JkaW9uRWwpIHtcbiAgICAgICAgdmFyIGFsd2F5c09wZW4gPSAkYWNjb3JkaW9uRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWFjY29yZGlvbicpO1xuICAgICAgICB2YXIgYWN0aXZlQ2xhc3NlcyA9ICRhY2NvcmRpb25FbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aXZlLWNsYXNzZXMnKTtcbiAgICAgICAgdmFyIGluYWN0aXZlQ2xhc3NlcyA9ICRhY2NvcmRpb25FbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5hY3RpdmUtY2xhc3NlcycpO1xuICAgICAgICB2YXIgaXRlbXMgPSBbXTtcbiAgICAgICAgJGFjY29yZGlvbkVsXG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYWNjb3JkaW9uLXRhcmdldF0nKVxuICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKCR0cmlnZ2VyRWwpIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0ge1xuICAgICAgICAgICAgICAgIGlkOiAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1hY2NvcmRpb24tdGFyZ2V0JyksXG4gICAgICAgICAgICAgICAgdHJpZ2dlckVsOiAkdHJpZ2dlckVsLFxuICAgICAgICAgICAgICAgIHRhcmdldEVsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWFjY29yZGlvbi10YXJnZXQnKSksXG4gICAgICAgICAgICAgICAgaWNvbkVsOiAkdHJpZ2dlckVsLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWFjY29yZGlvbi1pY29uXScpLFxuICAgICAgICAgICAgICAgIGFjdGl2ZTogJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKSA9PT0gJ3RydWUnXG4gICAgICAgICAgICAgICAgICAgID8gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICA6IGZhbHNlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgIH0pO1xuICAgICAgICBuZXcgQWNjb3JkaW9uKGl0ZW1zLCB7XG4gICAgICAgICAgICBhbHdheXNPcGVuOiBhbHdheXNPcGVuID09PSAnb3BlbicgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICBhY3RpdmVDbGFzc2VzOiBhY3RpdmVDbGFzc2VzXG4gICAgICAgICAgICAgICAgPyBhY3RpdmVDbGFzc2VzXG4gICAgICAgICAgICAgICAgOiBEZWZhdWx0LmFjdGl2ZUNsYXNzZXMsXG4gICAgICAgICAgICBpbmFjdGl2ZUNsYXNzZXM6IGluYWN0aXZlQ2xhc3Nlc1xuICAgICAgICAgICAgICAgID8gaW5hY3RpdmVDbGFzc2VzXG4gICAgICAgICAgICAgICAgOiBEZWZhdWx0LmluYWN0aXZlQ2xhc3NlcyxcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnQgZGVmYXVsdCBBY2NvcmRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnRlcmZhY2UuanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwZXMuanMubWFwIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBEZWZhdWx0ID0ge1xuICAgIGRlZmF1bHRQb3NpdGlvbjogMCxcbiAgICBpbmRpY2F0b3JzOiB7XG4gICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgYWN0aXZlQ2xhc3NlczogJ2JnLXdoaXRlIGRhcms6YmctZ3JheS04MDAnLFxuICAgICAgICBpbmFjdGl2ZUNsYXNzZXM6ICdiZy13aGl0ZS81MCBkYXJrOmJnLWdyYXktODAwLzUwIGhvdmVyOmJnLXdoaXRlIGRhcms6aG92ZXI6YmctZ3JheS04MDAnLFxuICAgIH0sXG4gICAgaW50ZXJ2YWw6IDMwMDAsXG4gICAgb25OZXh0OiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgb25QcmV2OiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgb25DaGFuZ2U6IGZ1bmN0aW9uICgpIHsgfSxcbn07XG52YXIgQ2Fyb3VzZWwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2Fyb3VzZWwoaXRlbXMsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKGl0ZW1zID09PSB2b2lkIDApIHsgaXRlbXMgPSBbXTsgfVxuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSBEZWZhdWx0OyB9XG4gICAgICAgIHRoaXMuX2l0ZW1zID0gaXRlbXM7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBfX2Fzc2lnbihfX2Fzc2lnbihfX2Fzc2lnbih7fSwgRGVmYXVsdCksIG9wdGlvbnMpLCB7IGluZGljYXRvcnM6IF9fYXNzaWduKF9fYXNzaWduKHt9LCBEZWZhdWx0LmluZGljYXRvcnMpLCBvcHRpb25zLmluZGljYXRvcnMpIH0pO1xuICAgICAgICB0aGlzLl9hY3RpdmVJdGVtID0gdGhpcy5nZXRJdGVtKHRoaXMuX29wdGlvbnMuZGVmYXVsdFBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5faW5kaWNhdG9ycyA9IHRoaXMuX29wdGlvbnMuaW5kaWNhdG9ycy5pdGVtcztcbiAgICAgICAgdGhpcy5faW50ZXJ2YWxEdXJhdGlvbiA9IHRoaXMuX29wdGlvbnMuaW50ZXJ2YWw7XG4gICAgICAgIHRoaXMuX2ludGVydmFsSW5zdGFuY2UgPSBudWxsO1xuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGluaXRpYWxpemUgY2Fyb3VzZWwgYW5kIGl0ZW1zIGJhc2VkIG9uIGFjdGl2ZSBvbmVcbiAgICAgKi9cbiAgICBDYXJvdXNlbC5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2l0ZW1zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgaXRlbS5lbC5jbGFzc0xpc3QuYWRkKCdhYnNvbHV0ZScsICdpbnNldC0wJywgJ3RyYW5zaXRpb24tdHJhbnNmb3JtJywgJ3RyYW5zZm9ybScpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gaWYgbm8gYWN0aXZlIGl0ZW0gaXMgc2V0IHRoZW4gZmlyc3QgcG9zaXRpb24gaXMgZGVmYXVsdFxuICAgICAgICBpZiAodGhpcy5fZ2V0QWN0aXZlSXRlbSgpKSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlVG8odGhpcy5fZ2V0QWN0aXZlSXRlbSgpLnBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVUbygwKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pbmRpY2F0b3JzLm1hcChmdW5jdGlvbiAoaW5kaWNhdG9yLCBwb3NpdGlvbikge1xuICAgICAgICAgICAgaW5kaWNhdG9yLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnNsaWRlVG8ocG9zaXRpb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ2Fyb3VzZWwucHJvdG90eXBlLmdldEl0ZW0gPSBmdW5jdGlvbiAocG9zaXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zW3Bvc2l0aW9uXTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNsaWRlIHRvIHRoZSBlbGVtZW50IGJhc2VkIG9uIGlkXG4gICAgICogQHBhcmFtIHsqfSBwb3NpdGlvblxuICAgICAqL1xuICAgIENhcm91c2VsLnByb3RvdHlwZS5zbGlkZVRvID0gZnVuY3Rpb24gKHBvc2l0aW9uKSB7XG4gICAgICAgIHZhciBuZXh0SXRlbSA9IHRoaXMuX2l0ZW1zW3Bvc2l0aW9uXTtcbiAgICAgICAgdmFyIHJvdGF0aW9uSXRlbXMgPSB7XG4gICAgICAgICAgICBsZWZ0OiBuZXh0SXRlbS5wb3NpdGlvbiA9PT0gMFxuICAgICAgICAgICAgICAgID8gdGhpcy5faXRlbXNbdGhpcy5faXRlbXMubGVuZ3RoIC0gMV1cbiAgICAgICAgICAgICAgICA6IHRoaXMuX2l0ZW1zW25leHRJdGVtLnBvc2l0aW9uIC0gMV0sXG4gICAgICAgICAgICBtaWRkbGU6IG5leHRJdGVtLFxuICAgICAgICAgICAgcmlnaHQ6IG5leHRJdGVtLnBvc2l0aW9uID09PSB0aGlzLl9pdGVtcy5sZW5ndGggLSAxXG4gICAgICAgICAgICAgICAgPyB0aGlzLl9pdGVtc1swXVxuICAgICAgICAgICAgICAgIDogdGhpcy5faXRlbXNbbmV4dEl0ZW0ucG9zaXRpb24gKyAxXSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fcm90YXRlKHJvdGF0aW9uSXRlbXMpO1xuICAgICAgICB0aGlzLl9zZXRBY3RpdmVJdGVtKG5leHRJdGVtKTtcbiAgICAgICAgaWYgKHRoaXMuX2ludGVydmFsSW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgICAgIHRoaXMuY3ljbGUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uQ2hhbmdlKHRoaXMpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQmFzZWQgb24gdGhlIGN1cnJlbnRseSBhY3RpdmUgaXRlbSBpdCB3aWxsIGdvIHRvIHRoZSBuZXh0IHBvc2l0aW9uXG4gICAgICovXG4gICAgQ2Fyb3VzZWwucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhY3RpdmVJdGVtID0gdGhpcy5fZ2V0QWN0aXZlSXRlbSgpO1xuICAgICAgICB2YXIgbmV4dEl0ZW0gPSBudWxsO1xuICAgICAgICAvLyBjaGVjayBpZiBsYXN0IGl0ZW1cbiAgICAgICAgaWYgKGFjdGl2ZUl0ZW0ucG9zaXRpb24gPT09IHRoaXMuX2l0ZW1zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIG5leHRJdGVtID0gdGhpcy5faXRlbXNbMF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBuZXh0SXRlbSA9IHRoaXMuX2l0ZW1zW2FjdGl2ZUl0ZW0ucG9zaXRpb24gKyAxXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNsaWRlVG8obmV4dEl0ZW0ucG9zaXRpb24pO1xuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uTmV4dCh0aGlzKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEJhc2VkIG9uIHRoZSBjdXJyZW50bHkgYWN0aXZlIGl0ZW0gaXQgd2lsbCBnbyB0byB0aGUgcHJldmlvdXMgcG9zaXRpb25cbiAgICAgKi9cbiAgICBDYXJvdXNlbC5wcm90b3R5cGUucHJldiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFjdGl2ZUl0ZW0gPSB0aGlzLl9nZXRBY3RpdmVJdGVtKCk7XG4gICAgICAgIHZhciBwcmV2SXRlbSA9IG51bGw7XG4gICAgICAgIC8vIGNoZWNrIGlmIGZpcnN0IGl0ZW1cbiAgICAgICAgaWYgKGFjdGl2ZUl0ZW0ucG9zaXRpb24gPT09IDApIHtcbiAgICAgICAgICAgIHByZXZJdGVtID0gdGhpcy5faXRlbXNbdGhpcy5faXRlbXMubGVuZ3RoIC0gMV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwcmV2SXRlbSA9IHRoaXMuX2l0ZW1zW2FjdGl2ZUl0ZW0ucG9zaXRpb24gLSAxXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNsaWRlVG8ocHJldkl0ZW0ucG9zaXRpb24pO1xuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uUHJldih0aGlzKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIGFwcGxpZXMgdGhlIHRyYW5zZm9ybSBjbGFzc2VzIGJhc2VkIG9uIHRoZSBsZWZ0LCBtaWRkbGUsIGFuZCByaWdodCByb3RhdGlvbiBjYXJvdXNlbCBpdGVtc1xuICAgICAqIEBwYXJhbSB7Kn0gcm90YXRpb25JdGVtc1xuICAgICAqL1xuICAgIENhcm91c2VsLnByb3RvdHlwZS5fcm90YXRlID0gZnVuY3Rpb24gKHJvdGF0aW9uSXRlbXMpIHtcbiAgICAgICAgLy8gcmVzZXRcbiAgICAgICAgdGhpcy5faXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICBpdGVtLmVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gbGVmdCBpdGVtIChwcmV2aW91c2x5IGFjdGl2ZSlcbiAgICAgICAgcm90YXRpb25JdGVtcy5sZWZ0LmVsLmNsYXNzTGlzdC5yZW1vdmUoJy10cmFuc2xhdGUteC1mdWxsJywgJ3RyYW5zbGF0ZS14LWZ1bGwnLCAndHJhbnNsYXRlLXgtMCcsICdoaWRkZW4nLCAnei0yMCcpO1xuICAgICAgICByb3RhdGlvbkl0ZW1zLmxlZnQuZWwuY2xhc3NMaXN0LmFkZCgnLXRyYW5zbGF0ZS14LWZ1bGwnLCAnei0xMCcpO1xuICAgICAgICAvLyBjdXJyZW50bHkgYWN0aXZlIGl0ZW1cbiAgICAgICAgcm90YXRpb25JdGVtcy5taWRkbGUuZWwuY2xhc3NMaXN0LnJlbW92ZSgnLXRyYW5zbGF0ZS14LWZ1bGwnLCAndHJhbnNsYXRlLXgtZnVsbCcsICd0cmFuc2xhdGUteC0wJywgJ2hpZGRlbicsICd6LTEwJyk7XG4gICAgICAgIHJvdGF0aW9uSXRlbXMubWlkZGxlLmVsLmNsYXNzTGlzdC5hZGQoJ3RyYW5zbGF0ZS14LTAnLCAnei0yMCcpO1xuICAgICAgICAvLyByaWdodCBpdGVtICh1cGNvbWluZyBhY3RpdmUpXG4gICAgICAgIHJvdGF0aW9uSXRlbXMucmlnaHQuZWwuY2xhc3NMaXN0LnJlbW92ZSgnLXRyYW5zbGF0ZS14LWZ1bGwnLCAndHJhbnNsYXRlLXgtZnVsbCcsICd0cmFuc2xhdGUteC0wJywgJ2hpZGRlbicsICd6LTIwJyk7XG4gICAgICAgIHJvdGF0aW9uSXRlbXMucmlnaHQuZWwuY2xhc3NMaXN0LmFkZCgndHJhbnNsYXRlLXgtZnVsbCcsICd6LTEwJyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZXQgYW4gaW50ZXJ2YWwgdG8gY3ljbGUgdGhyb3VnaCB0aGUgY2Fyb3VzZWwgaXRlbXNcbiAgICAgKi9cbiAgICBDYXJvdXNlbC5wcm90b3R5cGUuY3ljbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpcy5faW50ZXJ2YWxJbnN0YW5jZSA9IHdpbmRvdy5zZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMubmV4dCgpO1xuICAgICAgICAgICAgfSwgdGhpcy5faW50ZXJ2YWxEdXJhdGlvbik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgY3ljbGluZyBpbnRlcnZhbFxuICAgICAqL1xuICAgIENhcm91c2VsLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbEluc3RhbmNlKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycmVudGx5IGFjdGl2ZSBpdGVtXG4gICAgICovXG4gICAgQ2Fyb3VzZWwucHJvdG90eXBlLl9nZXRBY3RpdmVJdGVtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aXZlSXRlbTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY3VycmVudGx5IGFjdGl2ZSBpdGVtIGFuZCBkYXRhIGF0dHJpYnV0ZVxuICAgICAqIEBwYXJhbSB7Kn0gcG9zaXRpb25cbiAgICAgKi9cbiAgICBDYXJvdXNlbC5wcm90b3R5cGUuX3NldEFjdGl2ZUl0ZW0gPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl9hY3RpdmVJdGVtID0gaXRlbTtcbiAgICAgICAgdmFyIHBvc2l0aW9uID0gaXRlbS5wb3NpdGlvbjtcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBpbmRpY2F0b3JzIGlmIGF2YWlsYWJsZVxuICAgICAgICBpZiAodGhpcy5faW5kaWNhdG9ycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuX2luZGljYXRvcnMubWFwKGZ1bmN0aW9uIChpbmRpY2F0b3IpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgICAgIGluZGljYXRvci5lbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtY3VycmVudCcsICdmYWxzZScpO1xuICAgICAgICAgICAgICAgIChfYSA9IGluZGljYXRvci5lbC5jbGFzc0xpc3QpLnJlbW92ZS5hcHBseShfYSwgX3RoaXMuX29wdGlvbnMuaW5kaWNhdG9ycy5hY3RpdmVDbGFzc2VzLnNwbGl0KCcgJykpO1xuICAgICAgICAgICAgICAgIChfYiA9IGluZGljYXRvci5lbC5jbGFzc0xpc3QpLmFkZC5hcHBseShfYiwgX3RoaXMuX29wdGlvbnMuaW5kaWNhdG9ycy5pbmFjdGl2ZUNsYXNzZXMuc3BsaXQoJyAnKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIChfYSA9IHRoaXMuX2luZGljYXRvcnNbcG9zaXRpb25dLmVsLmNsYXNzTGlzdCkuYWRkLmFwcGx5KF9hLCB0aGlzLl9vcHRpb25zLmluZGljYXRvcnMuYWN0aXZlQ2xhc3Nlcy5zcGxpdCgnICcpKTtcbiAgICAgICAgICAgIChfYiA9IHRoaXMuX2luZGljYXRvcnNbcG9zaXRpb25dLmVsLmNsYXNzTGlzdCkucmVtb3ZlLmFwcGx5KF9iLCB0aGlzLl9vcHRpb25zLmluZGljYXRvcnMuaW5hY3RpdmVDbGFzc2VzLnNwbGl0KCcgJykpO1xuICAgICAgICAgICAgdGhpcy5faW5kaWNhdG9yc1twb3NpdGlvbl0uZWwuc2V0QXR0cmlidXRlKCdhcmlhLWN1cnJlbnQnLCAndHJ1ZScpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQ2Fyb3VzZWw7XG59KCkpO1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgd2luZG93LkNhcm91c2VsID0gQ2Fyb3VzZWw7XG59XG5leHBvcnQgZnVuY3Rpb24gaW5pdENhcm91c2VscygpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jYXJvdXNlbF0nKS5mb3JFYWNoKGZ1bmN0aW9uICgkY2Fyb3VzZWxFbCkge1xuICAgICAgICB2YXIgaW50ZXJ2YWwgPSAkY2Fyb3VzZWxFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2Fyb3VzZWwtaW50ZXJ2YWwnKTtcbiAgICAgICAgdmFyIHNsaWRlID0gJGNhcm91c2VsRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWNhcm91c2VsJykgPT09ICdzbGlkZSdcbiAgICAgICAgICAgID8gdHJ1ZVxuICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgdmFyIGl0ZW1zID0gW107XG4gICAgICAgIHZhciBkZWZhdWx0UG9zaXRpb24gPSAwO1xuICAgICAgICBpZiAoJGNhcm91c2VsRWwucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY2Fyb3VzZWwtaXRlbV0nKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIEFycmF5LmZyb20oJGNhcm91c2VsRWwucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY2Fyb3VzZWwtaXRlbV0nKSkubWFwKGZ1bmN0aW9uICgkY2Fyb3VzZWxJdGVtRWwsIHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgaXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBwb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgZWw6ICRjYXJvdXNlbEl0ZW1FbCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoJGNhcm91c2VsSXRlbUVsLmdldEF0dHJpYnV0ZSgnZGF0YS1jYXJvdXNlbC1pdGVtJykgPT09XG4gICAgICAgICAgICAgICAgICAgICdhY3RpdmUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRpY2F0b3JzID0gW107XG4gICAgICAgIGlmICgkY2Fyb3VzZWxFbC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jYXJvdXNlbC1zbGlkZS10b10nKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIEFycmF5LmZyb20oJGNhcm91c2VsRWwucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY2Fyb3VzZWwtc2xpZGUtdG9dJykpLm1hcChmdW5jdGlvbiAoJGluZGljYXRvckVsKSB7XG4gICAgICAgICAgICAgICAgaW5kaWNhdG9ycy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IHBhcnNlSW50KCRpbmRpY2F0b3JFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2Fyb3VzZWwtc2xpZGUtdG8nKSksXG4gICAgICAgICAgICAgICAgICAgIGVsOiAkaW5kaWNhdG9yRWwsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2Fyb3VzZWwgPSBuZXcgQ2Fyb3VzZWwoaXRlbXMsIHtcbiAgICAgICAgICAgIGRlZmF1bHRQb3NpdGlvbjogZGVmYXVsdFBvc2l0aW9uLFxuICAgICAgICAgICAgaW5kaWNhdG9yczoge1xuICAgICAgICAgICAgICAgIGl0ZW1zOiBpbmRpY2F0b3JzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGludGVydmFsOiBpbnRlcnZhbCA/IGludGVydmFsIDogRGVmYXVsdC5pbnRlcnZhbCxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChzbGlkZSkge1xuICAgICAgICAgICAgY2Fyb3VzZWwuY3ljbGUoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjaGVjayBmb3IgY29udHJvbHNcbiAgICAgICAgdmFyIGNhcm91c2VsTmV4dEVsID0gJGNhcm91c2VsRWwucXVlcnlTZWxlY3RvcignW2RhdGEtY2Fyb3VzZWwtbmV4dF0nKTtcbiAgICAgICAgdmFyIGNhcm91c2VsUHJldkVsID0gJGNhcm91c2VsRWwucXVlcnlTZWxlY3RvcignW2RhdGEtY2Fyb3VzZWwtcHJldl0nKTtcbiAgICAgICAgaWYgKGNhcm91c2VsTmV4dEVsKSB7XG4gICAgICAgICAgICBjYXJvdXNlbE5leHRFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjYXJvdXNlbC5uZXh0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2Fyb3VzZWxQcmV2RWwpIHtcbiAgICAgICAgICAgIGNhcm91c2VsUHJldkVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNhcm91c2VsLnByZXYoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnQgZGVmYXVsdCBDYXJvdXNlbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWludGVyZmFjZS5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD10eXBlcy5qcy5tYXAiLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIERlZmF1bHQgPSB7XG4gICAgb25Db2xsYXBzZTogZnVuY3Rpb24gKCkgeyB9LFxuICAgIG9uRXhwYW5kOiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgb25Ub2dnbGU6IGZ1bmN0aW9uICgpIHsgfSxcbn07XG52YXIgQ29sbGFwc2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29sbGFwc2UodGFyZ2V0RWwsIHRyaWdnZXJFbCwgb3B0aW9ucykge1xuICAgICAgICBpZiAodGFyZ2V0RWwgPT09IHZvaWQgMCkgeyB0YXJnZXRFbCA9IG51bGw7IH1cbiAgICAgICAgaWYgKHRyaWdnZXJFbCA9PT0gdm9pZCAwKSB7IHRyaWdnZXJFbCA9IG51bGw7IH1cbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0gRGVmYXVsdDsgfVxuICAgICAgICB0aGlzLl90YXJnZXRFbCA9IHRhcmdldEVsO1xuICAgICAgICB0aGlzLl90cmlnZ2VyRWwgPSB0cmlnZ2VyRWw7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgRGVmYXVsdCksIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl92aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9XG4gICAgQ29sbGFwc2UucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5fdHJpZ2dlckVsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fdHJpZ2dlckVsLmhhc0F0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmlzaWJsZSA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKSA9PT0gJ3RydWUnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gZml4IHVudGlsIHYyIG5vdCB0byBicmVhayBwcmV2aW91cyBzaW5nbGUgY29sbGFwc2VzIHdoaWNoIGJlY2FtZSBkaXNtaXNzXG4gICAgICAgICAgICAgICAgdGhpcy5fdmlzaWJsZSA9ICF0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGRlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnRvZ2dsZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbGxhcHNlLnByb3RvdHlwZS5jb2xsYXBzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgIGlmICh0aGlzLl90cmlnZ2VyRWwpIHtcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl92aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25Db2xsYXBzZSh0aGlzKTtcbiAgICB9O1xuICAgIENvbGxhcHNlLnByb3RvdHlwZS5leHBhbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICBpZiAodGhpcy5fdHJpZ2dlckVsKSB7XG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyRWwuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl92aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vbkV4cGFuZCh0aGlzKTtcbiAgICB9O1xuICAgIENvbGxhcHNlLnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl92aXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmV4cGFuZCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25Ub2dnbGUodGhpcyk7XG4gICAgfTtcbiAgICByZXR1cm4gQ29sbGFwc2U7XG59KCkpO1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgd2luZG93LkNvbGxhcHNlID0gQ29sbGFwc2U7XG59XG5leHBvcnQgZnVuY3Rpb24gaW5pdENvbGxhcHNlcygpIHtcbiAgICBkb2N1bWVudFxuICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY29sbGFwc2UtdG9nZ2xlXScpXG4gICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uICgkdHJpZ2dlckVsKSB7XG4gICAgICAgIHZhciB0YXJnZXRJZCA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbGxhcHNlLXRvZ2dsZScpO1xuICAgICAgICB2YXIgJHRhcmdldEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0SWQpO1xuICAgICAgICAvLyBjaGVjayBpZiB0aGUgdGFyZ2V0IGVsZW1lbnQgZXhpc3RzXG4gICAgICAgIGlmICgkdGFyZ2V0RWwpIHtcbiAgICAgICAgICAgIG5ldyBDb2xsYXBzZSgkdGFyZ2V0RWwsICR0cmlnZ2VyRWwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlRoZSB0YXJnZXQgZWxlbWVudCB3aXRoIGlkIFxcXCJcIi5jb25jYXQodGFyZ2V0SWQsIFwiXFxcIiBkb2VzIG5vdCBleGlzdC4gUGxlYXNlIGNoZWNrIHRoZSBkYXRhLWNvbGxhcHNlLXRvZ2dsZSBhdHRyaWJ1dGUuXCIpKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0IGRlZmF1bHQgQ29sbGFwc2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnRlcmZhY2UuanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwZXMuanMubWFwIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBEZWZhdWx0ID0ge1xuICAgIHRyaWdnZXJUeXBlOiAnaG92ZXInLFxuICAgIG9uU2hvdzogZnVuY3Rpb24gKCkgeyB9LFxuICAgIG9uSGlkZTogZnVuY3Rpb24gKCkgeyB9LFxuICAgIG9uVG9nZ2xlOiBmdW5jdGlvbiAoKSB7IH0sXG59O1xudmFyIERpYWwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGlhbChwYXJlbnRFbCwgdHJpZ2dlckVsLCB0YXJnZXRFbCwgb3B0aW9ucykge1xuICAgICAgICBpZiAocGFyZW50RWwgPT09IHZvaWQgMCkgeyBwYXJlbnRFbCA9IG51bGw7IH1cbiAgICAgICAgaWYgKHRyaWdnZXJFbCA9PT0gdm9pZCAwKSB7IHRyaWdnZXJFbCA9IG51bGw7IH1cbiAgICAgICAgaWYgKHRhcmdldEVsID09PSB2b2lkIDApIHsgdGFyZ2V0RWwgPSBudWxsOyB9XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IERlZmF1bHQ7IH1cbiAgICAgICAgdGhpcy5fcGFyZW50RWwgPSBwYXJlbnRFbDtcbiAgICAgICAgdGhpcy5fdHJpZ2dlckVsID0gdHJpZ2dlckVsO1xuICAgICAgICB0aGlzLl90YXJnZXRFbCA9IHRhcmdldEVsO1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gX19hc3NpZ24oX19hc3NpZ24oe30sIERlZmF1bHQpLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgfVxuICAgIERpYWwucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5fdHJpZ2dlckVsKSB7XG4gICAgICAgICAgICB2YXIgdHJpZ2dlckV2ZW50VHlwZXMgPSB0aGlzLl9nZXRUcmlnZ2VyRXZlbnRUeXBlcyh0aGlzLl9vcHRpb25zLnRyaWdnZXJUeXBlKTtcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudFR5cGVzLnNob3dFdmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fdHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2hvdygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIF90aGlzLl90YXJnZXRFbC5hZGRFdmVudExpc3RlbmVyKGV2LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNob3coKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50VHlwZXMuaGlkZUV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgICAgIF90aGlzLl9wYXJlbnRFbC5hZGRFdmVudExpc3RlbmVyKGV2LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghX3RoaXMuX3BhcmVudEVsLm1hdGNoZXMoJzpob3ZlcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEaWFsLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgaWYgKHRoaXMuX3RyaWdnZXJFbCkge1xuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckVsLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vbkhpZGUodGhpcyk7XG4gICAgfTtcbiAgICBEaWFsLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgaWYgKHRoaXMuX3RyaWdnZXJFbCkge1xuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckVsLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IHRydWU7XG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25TaG93KHRoaXMpO1xuICAgIH07XG4gICAgRGlhbC5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fdmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRGlhbC5wcm90b3R5cGUuaXNIaWRkZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5fdmlzaWJsZTtcbiAgICB9O1xuICAgIERpYWwucHJvdG90eXBlLmlzVmlzaWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XG4gICAgfTtcbiAgICBEaWFsLnByb3RvdHlwZS5fZ2V0VHJpZ2dlckV2ZW50VHlwZXMgPSBmdW5jdGlvbiAodHJpZ2dlclR5cGUpIHtcbiAgICAgICAgc3dpdGNoICh0cmlnZ2VyVHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnaG92ZXInOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dFdmVudHM6IFsnbW91c2VlbnRlcicsICdmb2N1cyddLFxuICAgICAgICAgICAgICAgICAgICBoaWRlRXZlbnRzOiBbJ21vdXNlbGVhdmUnLCAnYmx1ciddLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlICdjbGljayc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0V2ZW50czogWydjbGljaycsICdmb2N1cyddLFxuICAgICAgICAgICAgICAgICAgICBoaWRlRXZlbnRzOiBbJ2ZvY3Vzb3V0JywgJ2JsdXInXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAnbm9uZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0V2ZW50czogW10sXG4gICAgICAgICAgICAgICAgICAgIGhpZGVFdmVudHM6IFtdLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dFdmVudHM6IFsnbW91c2VlbnRlcicsICdmb2N1cyddLFxuICAgICAgICAgICAgICAgICAgICBoaWRlRXZlbnRzOiBbJ21vdXNlbGVhdmUnLCAnYmx1ciddLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBEaWFsO1xufSgpKTtcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHdpbmRvdy5EaWFsID0gRGlhbDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpbml0RGlhbHMoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZGlhbC1pbml0XScpLmZvckVhY2goZnVuY3Rpb24gKCRwYXJlbnRFbCkge1xuICAgICAgICB2YXIgJHRyaWdnZXJFbCA9ICRwYXJlbnRFbC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1kaWFsLXRvZ2dsZV0nKTtcbiAgICAgICAgaWYgKCR0cmlnZ2VyRWwpIHtcbiAgICAgICAgICAgIHZhciBkaWFsSWQgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kaWFsLXRvZ2dsZScpO1xuICAgICAgICAgICAgdmFyICRkaWFsRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkaWFsSWQpO1xuICAgICAgICAgICAgaWYgKCRkaWFsRWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHJpZ2dlclR5cGUgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kaWFsLXRyaWdnZXInKTtcbiAgICAgICAgICAgICAgICBuZXcgRGlhbCgkcGFyZW50RWwsICR0cmlnZ2VyRWwsICRkaWFsRWwsIHtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlclR5cGU6IHRyaWdnZXJUeXBlXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHRyaWdnZXJUeXBlXG4gICAgICAgICAgICAgICAgICAgICAgICA6IERlZmF1bHQudHJpZ2dlclR5cGUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRGlhbCB3aXRoIGlkIFwiLmNvbmNhdChkaWFsSWQsIFwiIGRvZXMgbm90IGV4aXN0LiBBcmUgeW91IHN1cmUgdGhhdCB0aGUgZGF0YS1kaWFsLXRvZ2dsZSBhdHRyaWJ1dGUgcG9pbnRzIHRvIHRoZSBjb3JyZWN0IG1vZGFsIGlkP1wiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRGlhbCB3aXRoIGlkIFwiLmNvbmNhdCgkcGFyZW50RWwuaWQsIFwiIGRvZXMgbm90IGhhdmUgYSB0cmlnZ2VyIGVsZW1lbnQuIEFyZSB5b3Ugc3VyZSB0aGF0IHRoZSBkYXRhLWRpYWwtdG9nZ2xlIGF0dHJpYnV0ZSBleGlzdHM/XCIpKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0IGRlZmF1bHQgRGlhbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWludGVyZmFjZS5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD10eXBlcy5qcy5tYXAiLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIERlZmF1bHQgPSB7XG4gICAgdHJhbnNpdGlvbjogJ3RyYW5zaXRpb24tb3BhY2l0eScsXG4gICAgZHVyYXRpb246IDMwMCxcbiAgICB0aW1pbmc6ICdlYXNlLW91dCcsXG4gICAgb25IaWRlOiBmdW5jdGlvbiAoKSB7IH0sXG59O1xudmFyIERpc21pc3MgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGlzbWlzcyh0YXJnZXRFbCwgdHJpZ2dlckVsLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICh0YXJnZXRFbCA9PT0gdm9pZCAwKSB7IHRhcmdldEVsID0gbnVsbDsgfVxuICAgICAgICBpZiAodHJpZ2dlckVsID09PSB2b2lkIDApIHsgdHJpZ2dlckVsID0gbnVsbDsgfVxuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSBEZWZhdWx0OyB9XG4gICAgICAgIHRoaXMuX3RhcmdldEVsID0gdGFyZ2V0RWw7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJFbCA9IHRyaWdnZXJFbDtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBEZWZhdWx0KSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9XG4gICAgRGlzbWlzcy5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLl90cmlnZ2VyRWwpIHtcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRGlzbWlzcy5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9vcHRpb25zLnRyYW5zaXRpb24sIFwiZHVyYXRpb24tXCIuY29uY2F0KHRoaXMuX29wdGlvbnMuZHVyYXRpb24pLCB0aGlzLl9vcHRpb25zLnRpbWluZywgJ29wYWNpdHktMCcpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgfSwgdGhpcy5fb3B0aW9ucy5kdXJhdGlvbik7XG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25IaWRlKHRoaXMsIHRoaXMuX3RhcmdldEVsKTtcbiAgICB9O1xuICAgIHJldHVybiBEaXNtaXNzO1xufSgpKTtcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHdpbmRvdy5EaXNtaXNzID0gRGlzbWlzcztcbn1cbmV4cG9ydCBmdW5jdGlvbiBpbml0RGlzbWlzc2VzKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRpc21pc3MtdGFyZ2V0XScpLmZvckVhY2goZnVuY3Rpb24gKCR0cmlnZ2VyRWwpIHtcbiAgICAgICAgdmFyIHRhcmdldElkID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGlzbWlzcy10YXJnZXQnKTtcbiAgICAgICAgdmFyICRkaXNtaXNzRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldElkKTtcbiAgICAgICAgaWYgKCRkaXNtaXNzRWwpIHtcbiAgICAgICAgICAgIG5ldyBEaXNtaXNzKCRkaXNtaXNzRWwsICR0cmlnZ2VyRWwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlRoZSBkaXNtaXNzIGVsZW1lbnQgd2l0aCBpZCBcXFwiXCIuY29uY2F0KHRhcmdldElkLCBcIlxcXCIgZG9lcyBub3QgZXhpc3QuIFBsZWFzZSBjaGVjayB0aGUgZGF0YS1kaXNtaXNzLXRhcmdldCBhdHRyaWJ1dGUuXCIpKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0IGRlZmF1bHQgRGlzbWlzcztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWludGVyZmFjZS5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD10eXBlcy5qcy5tYXAiLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIERlZmF1bHQgPSB7XG4gICAgcGxhY2VtZW50OiAnbGVmdCcsXG4gICAgYm9keVNjcm9sbGluZzogZmFsc2UsXG4gICAgYmFja2Ryb3A6IHRydWUsXG4gICAgZWRnZTogZmFsc2UsXG4gICAgZWRnZU9mZnNldDogJ2JvdHRvbS1bNjBweF0nLFxuICAgIGJhY2tkcm9wQ2xhc3NlczogJ2JnLWdyYXktOTAwIGJnLW9wYWNpdHktNTAgZGFyazpiZy1vcGFjaXR5LTgwIGZpeGVkIGluc2V0LTAgei0zMCcsXG4gICAgb25TaG93OiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgb25IaWRlOiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgb25Ub2dnbGU6IGZ1bmN0aW9uICgpIHsgfSxcbn07XG52YXIgRHJhd2VyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERyYXdlcih0YXJnZXRFbCwgb3B0aW9ucykge1xuICAgICAgICBpZiAodGFyZ2V0RWwgPT09IHZvaWQgMCkgeyB0YXJnZXRFbCA9IG51bGw7IH1cbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0gRGVmYXVsdDsgfVxuICAgICAgICB0aGlzLl90YXJnZXRFbCA9IHRhcmdldEVsO1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gX19hc3NpZ24oX19hc3NpZ24oe30sIERlZmF1bHQpLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgfVxuICAgIERyYXdlci5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIC8vIHNldCBpbml0aWFsIGFjY2Vzc2liaWxpdHkgYXR0cmlidXRlc1xuICAgICAgICBpZiAodGhpcy5fdGFyZ2V0RWwpIHtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldEVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCgndHJhbnNpdGlvbi10cmFuc2Zvcm0nKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzZXQgYmFzZSBwbGFjZW1lbnQgY2xhc3Nlc1xuICAgICAgICB0aGlzLl9nZXRQbGFjZW1lbnRDbGFzc2VzKHRoaXMuX29wdGlvbnMucGxhY2VtZW50KS5iYXNlLm1hcChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgX3RoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoYyk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBhZGQga2V5Ym9hcmQgZXZlbnQgbGlzdGVuZXIgdG8gZG9jdW1lbnRcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiAnRXNjYXBlJyBrZXkgaXMgcHJlc3NlZFxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5pc1Zpc2libGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgRHJhd2VyIGlzIHZpc2libGVcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuaGlkZSgpOyAvLyBoaWRlIHRoZSBEcmF3ZXJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRHJhd2VyLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAvLyBiYXNlZCBvbiB0aGUgZWRnZSBvcHRpb24gc2hvdyBwbGFjZW1lbnQgY2xhc3Nlc1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5lZGdlKSB7XG4gICAgICAgICAgICB0aGlzLl9nZXRQbGFjZW1lbnRDbGFzc2VzKHRoaXMuX29wdGlvbnMucGxhY2VtZW50ICsgJy1lZGdlJykuYWN0aXZlLm1hcChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIF90aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKGMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9nZXRQbGFjZW1lbnRDbGFzc2VzKHRoaXMuX29wdGlvbnMucGxhY2VtZW50ICsgJy1lZGdlJykuaW5hY3RpdmUubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoYyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2dldFBsYWNlbWVudENsYXNzZXModGhpcy5fb3B0aW9ucy5wbGFjZW1lbnQpLmFjdGl2ZS5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZShjKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fZ2V0UGxhY2VtZW50Q2xhc3Nlcyh0aGlzLl9vcHRpb25zLnBsYWNlbWVudCkuaW5hY3RpdmUubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoYyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzZXQgYWNjZXNzaWJpbGl0eSBhdHRyaWJ1dGVzXG4gICAgICAgIHRoaXMuX3RhcmdldEVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtbW9kYWwnKTtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwucmVtb3ZlQXR0cmlidXRlKCdyb2xlJyk7XG4gICAgICAgIC8vIGVuYWJsZSBib2R5IHNjcm9sbFxuICAgICAgICBpZiAoIXRoaXMuX29wdGlvbnMuYm9keVNjcm9sbGluZykge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyZmxvdy1oaWRkZW4nKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBkZXN0cm95IGJhY2tkcm9wXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmJhY2tkcm9wKSB7XG4gICAgICAgICAgICB0aGlzLl9kZXN0cm95QmFja2Ryb3BFbCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vbkhpZGUodGhpcyk7XG4gICAgfTtcbiAgICBEcmF3ZXIucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmVkZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2dldFBsYWNlbWVudENsYXNzZXModGhpcy5fb3B0aW9ucy5wbGFjZW1lbnQgKyAnLWVkZ2UnKS5hY3RpdmUubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoYyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX2dldFBsYWNlbWVudENsYXNzZXModGhpcy5fb3B0aW9ucy5wbGFjZW1lbnQgKyAnLWVkZ2UnKS5pbmFjdGl2ZS5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZShjKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZ2V0UGxhY2VtZW50Q2xhc3Nlcyh0aGlzLl9vcHRpb25zLnBsYWNlbWVudCkuYWN0aXZlLm1hcChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIF90aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuYWRkKGMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9nZXRQbGFjZW1lbnRDbGFzc2VzKHRoaXMuX29wdGlvbnMucGxhY2VtZW50KS5pbmFjdGl2ZS5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZShjKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNldCBhY2Nlc3NpYmlsaXR5IGF0dHJpYnV0ZXNcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuc2V0QXR0cmlidXRlKCdhcmlhLW1vZGFsJywgJ3RydWUnKTtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2RpYWxvZycpO1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJyk7XG4gICAgICAgIC8vIGRpc2FibGUgYm9keSBzY3JvbGxcbiAgICAgICAgaWYgKCF0aGlzLl9vcHRpb25zLmJvZHlTY3JvbGxpbmcpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnb3ZlcmZsb3ctaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2hvdyBiYWNrZHJvcFxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5iYWNrZHJvcCkge1xuICAgICAgICAgICAgdGhpcy5fY3JlYXRlQmFja2Ryb3AoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl92aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vblNob3codGhpcyk7XG4gICAgfTtcbiAgICBEcmF3ZXIucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERyYXdlci5wcm90b3R5cGUuX2NyZWF0ZUJhY2tkcm9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5fdmlzaWJsZSkge1xuICAgICAgICAgICAgdmFyIGJhY2tkcm9wRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGJhY2tkcm9wRWwuc2V0QXR0cmlidXRlKCdkcmF3ZXItYmFja2Ryb3AnLCAnJyk7XG4gICAgICAgICAgICAoX2EgPSBiYWNrZHJvcEVsLmNsYXNzTGlzdCkuYWRkLmFwcGx5KF9hLCB0aGlzLl9vcHRpb25zLmJhY2tkcm9wQ2xhc3Nlcy5zcGxpdCgnICcpKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmQoYmFja2Ryb3BFbCk7XG4gICAgICAgICAgICBiYWNrZHJvcEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEcmF3ZXIucHJvdG90eXBlLl9kZXN0cm95QmFja2Ryb3BFbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3Zpc2libGUpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkcmF3ZXItYmFja2Ryb3BdJykucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERyYXdlci5wcm90b3R5cGUuX2dldFBsYWNlbWVudENsYXNzZXMgPSBmdW5jdGlvbiAocGxhY2VtZW50KSB7XG4gICAgICAgIHN3aXRjaCAocGxhY2VtZW50KSB7XG4gICAgICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGJhc2U6IFsndG9wLTAnLCAnbGVmdC0wJywgJ3JpZ2h0LTAnXSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlOiBbJ3RyYW5zZm9ybS1ub25lJ10sXG4gICAgICAgICAgICAgICAgICAgIGluYWN0aXZlOiBbJy10cmFuc2xhdGUteS1mdWxsJ10sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBiYXNlOiBbJ3JpZ2h0LTAnLCAndG9wLTAnXSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlOiBbJ3RyYW5zZm9ybS1ub25lJ10sXG4gICAgICAgICAgICAgICAgICAgIGluYWN0aXZlOiBbJ3RyYW5zbGF0ZS14LWZ1bGwnXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBiYXNlOiBbJ2JvdHRvbS0wJywgJ2xlZnQtMCcsICdyaWdodC0wJ10sXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZTogWyd0cmFuc2Zvcm0tbm9uZSddLFxuICAgICAgICAgICAgICAgICAgICBpbmFjdGl2ZTogWyd0cmFuc2xhdGUteS1mdWxsJ10sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGJhc2U6IFsnbGVmdC0wJywgJ3RvcC0wJ10sXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZTogWyd0cmFuc2Zvcm0tbm9uZSddLFxuICAgICAgICAgICAgICAgICAgICBpbmFjdGl2ZTogWyctdHJhbnNsYXRlLXgtZnVsbCddLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlICdib3R0b20tZWRnZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgYmFzZTogWydsZWZ0LTAnLCAndG9wLTAnXSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlOiBbJ3RyYW5zZm9ybS1ub25lJ10sXG4gICAgICAgICAgICAgICAgICAgIGluYWN0aXZlOiBbJ3RyYW5zbGF0ZS15LWZ1bGwnLCB0aGlzLl9vcHRpb25zLmVkZ2VPZmZzZXRdLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGJhc2U6IFsnbGVmdC0wJywgJ3RvcC0wJ10sXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZTogWyd0cmFuc2Zvcm0tbm9uZSddLFxuICAgICAgICAgICAgICAgICAgICBpbmFjdGl2ZTogWyctdHJhbnNsYXRlLXgtZnVsbCddLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERyYXdlci5wcm90b3R5cGUuaXNIaWRkZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5fdmlzaWJsZTtcbiAgICB9O1xuICAgIERyYXdlci5wcm90b3R5cGUuaXNWaXNpYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcbiAgICB9O1xuICAgIHJldHVybiBEcmF3ZXI7XG59KCkpO1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgd2luZG93LkRyYXdlciA9IERyYXdlcjtcbn1cbnZhciBnZXREcmF3ZXJJbnN0YW5jZSA9IGZ1bmN0aW9uIChpZCwgaW5zdGFuY2VzKSB7XG4gICAgaWYgKGluc3RhbmNlcy5zb21lKGZ1bmN0aW9uIChkcmF3ZXJJbnN0YW5jZSkgeyByZXR1cm4gZHJhd2VySW5zdGFuY2UuaWQgPT09IGlkOyB9KSkge1xuICAgICAgICByZXR1cm4gaW5zdGFuY2VzLmZpbmQoZnVuY3Rpb24gKGRyYXdlckluc3RhbmNlKSB7IHJldHVybiBkcmF3ZXJJbnN0YW5jZS5pZCA9PT0gaWQ7IH0pO1xuICAgIH1cbn07XG5leHBvcnQgZnVuY3Rpb24gaW5pdERyYXdlcnMoKSB7XG4gICAgdmFyIGRyYXdlckluc3RhbmNlcyA9IFtdO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRyYXdlci10YXJnZXRdJykuZm9yRWFjaChmdW5jdGlvbiAoJHRyaWdnZXJFbCkge1xuICAgICAgICAvLyBtYW5kYXRvcnlcbiAgICAgICAgdmFyIGRyYXdlcklkID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZHJhd2VyLXRhcmdldCcpO1xuICAgICAgICB2YXIgJGRyYXdlckVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZHJhd2VySWQpO1xuICAgICAgICBpZiAoJGRyYXdlckVsKSB7XG4gICAgICAgICAgICAvLyBvcHRpb25hbFxuICAgICAgICAgICAgdmFyIHBsYWNlbWVudCA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRyYXdlci1wbGFjZW1lbnQnKTtcbiAgICAgICAgICAgIHZhciBib2R5U2Nyb2xsaW5nID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZHJhd2VyLWJvZHktc2Nyb2xsaW5nJyk7XG4gICAgICAgICAgICB2YXIgYmFja2Ryb3AgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kcmF3ZXItYmFja2Ryb3AnKTtcbiAgICAgICAgICAgIHZhciBlZGdlID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZHJhd2VyLWVkZ2UnKTtcbiAgICAgICAgICAgIHZhciBlZGdlT2Zmc2V0ID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZHJhd2VyLWVkZ2Utb2Zmc2V0Jyk7XG4gICAgICAgICAgICBpZiAoIWdldERyYXdlckluc3RhbmNlKGRyYXdlcklkLCBkcmF3ZXJJbnN0YW5jZXMpKSB7XG4gICAgICAgICAgICAgICAgZHJhd2VySW5zdGFuY2VzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogZHJhd2VySWQsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdDogbmV3IERyYXdlcigkZHJhd2VyRWwsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50ID8gcGxhY2VtZW50IDogRGVmYXVsdC5wbGFjZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5U2Nyb2xsaW5nOiBib2R5U2Nyb2xsaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBib2R5U2Nyb2xsaW5nID09PSAndHJ1ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IERlZmF1bHQuYm9keVNjcm9sbGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tkcm9wOiBiYWNrZHJvcFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYmFja2Ryb3AgPT09ICd0cnVlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogRGVmYXVsdC5iYWNrZHJvcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkZ2U6IGVkZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGVkZ2UgPT09ICd0cnVlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogRGVmYXVsdC5lZGdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZWRnZU9mZnNldDogZWRnZU9mZnNldFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gZWRnZU9mZnNldFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogRGVmYXVsdC5lZGdlT2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEcmF3ZXIgd2l0aCBpZCBcIi5jb25jYXQoZHJhd2VySWQsIFwiIG5vdCBmb3VuZC4gQXJlIHlvdSBzdXJlIHRoYXQgdGhlIGRhdGEtZHJhd2VyLXRhcmdldCBhdHRyaWJ1dGUgcG9pbnRzIHRvIHRoZSBjb3JyZWN0IGRyYXdlciBpZD9cIikpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZHJhd2VyLXRvZ2dsZV0nKS5mb3JFYWNoKGZ1bmN0aW9uICgkdHJpZ2dlckVsKSB7XG4gICAgICAgIHZhciBkcmF3ZXJJZCA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRyYXdlci10b2dnbGUnKTtcbiAgICAgICAgdmFyICRkcmF3ZXJFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRyYXdlcklkKTtcbiAgICAgICAgaWYgKCRkcmF3ZXJFbCkge1xuICAgICAgICAgICAgdmFyIGRyYXdlcl8xID0gZ2V0RHJhd2VySW5zdGFuY2UoZHJhd2VySWQsIGRyYXdlckluc3RhbmNlcyk7XG4gICAgICAgICAgICBpZiAoZHJhd2VyXzEpIHtcbiAgICAgICAgICAgICAgICAkdHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBkcmF3ZXJfMS5vYmplY3QudG9nZ2xlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRHJhd2VyIHdpdGggaWQgXCIuY29uY2F0KGRyYXdlcklkLCBcIiBoYXMgbm90IGJlZW4gaW5pdGlhbGl6ZWQuIFBsZWFzZSBpbml0aWFsaXplIGl0IHVzaW5nIHRoZSBkYXRhLWRyYXdlci10YXJnZXQgYXR0cmlidXRlLlwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRHJhd2VyIHdpdGggaWQgXCIuY29uY2F0KGRyYXdlcklkLCBcIiBub3QgZm91bmQuIEFyZSB5b3Ugc3VyZSB0aGF0IHRoZSBkYXRhLWRyYXdlci10YXJnZXQgYXR0cmlidXRlIHBvaW50cyB0byB0aGUgY29ycmVjdCBkcmF3ZXIgaWQ/XCIpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGRvY3VtZW50XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kcmF3ZXItZGlzbWlzc10sIFtkYXRhLWRyYXdlci1oaWRlXScpXG4gICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uICgkdHJpZ2dlckVsKSB7XG4gICAgICAgIHZhciBkcmF3ZXJJZCA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRyYXdlci1kaXNtaXNzJylcbiAgICAgICAgICAgID8gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZHJhd2VyLWRpc21pc3MnKVxuICAgICAgICAgICAgOiAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kcmF3ZXItaGlkZScpO1xuICAgICAgICB2YXIgJGRyYXdlckVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZHJhd2VySWQpO1xuICAgICAgICBpZiAoJGRyYXdlckVsKSB7XG4gICAgICAgICAgICB2YXIgZHJhd2VyXzIgPSBnZXREcmF3ZXJJbnN0YW5jZShkcmF3ZXJJZCwgZHJhd2VySW5zdGFuY2VzKTtcbiAgICAgICAgICAgIGlmIChkcmF3ZXJfMikge1xuICAgICAgICAgICAgICAgICR0cmlnZ2VyRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRyYXdlcl8yLm9iamVjdC5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRHJhd2VyIHdpdGggaWQgXCIuY29uY2F0KGRyYXdlcklkLCBcIiBoYXMgbm90IGJlZW4gaW5pdGlhbGl6ZWQuIFBsZWFzZSBpbml0aWFsaXplIGl0IHVzaW5nIHRoZSBkYXRhLWRyYXdlci10YXJnZXQgYXR0cmlidXRlLlwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRHJhd2VyIHdpdGggaWQgXCIuY29uY2F0KGRyYXdlcklkLCBcIiBub3QgZm91bmQuIEFyZSB5b3Ugc3VyZSB0aGF0IHRoZSBkYXRhLWRyYXdlci10YXJnZXQgYXR0cmlidXRlIHBvaW50cyB0byB0aGUgY29ycmVjdCBkcmF3ZXIgaWRcIikpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZHJhd2VyLXNob3ddJykuZm9yRWFjaChmdW5jdGlvbiAoJHRyaWdnZXJFbCkge1xuICAgICAgICB2YXIgZHJhd2VySWQgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kcmF3ZXItc2hvdycpO1xuICAgICAgICB2YXIgJGRyYXdlckVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZHJhd2VySWQpO1xuICAgICAgICBpZiAoJGRyYXdlckVsKSB7XG4gICAgICAgICAgICB2YXIgZHJhd2VyXzMgPSBnZXREcmF3ZXJJbnN0YW5jZShkcmF3ZXJJZCwgZHJhd2VySW5zdGFuY2VzKTtcbiAgICAgICAgICAgIGlmIChkcmF3ZXJfMykge1xuICAgICAgICAgICAgICAgICR0cmlnZ2VyRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRyYXdlcl8zLm9iamVjdC5zaG93KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRHJhd2VyIHdpdGggaWQgXCIuY29uY2F0KGRyYXdlcklkLCBcIiBoYXMgbm90IGJlZW4gaW5pdGlhbGl6ZWQuIFBsZWFzZSBpbml0aWFsaXplIGl0IHVzaW5nIHRoZSBkYXRhLWRyYXdlci10YXJnZXQgYXR0cmlidXRlLlwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRHJhd2VyIHdpdGggaWQgXCIuY29uY2F0KGRyYXdlcklkLCBcIiBub3QgZm91bmQuIEFyZSB5b3Ugc3VyZSB0aGF0IHRoZSBkYXRhLWRyYXdlci10YXJnZXQgYXR0cmlidXRlIHBvaW50cyB0byB0aGUgY29ycmVjdCBkcmF3ZXIgaWQ/XCIpKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0IGRlZmF1bHQgRHJhd2VyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW50ZXJmYWNlLmpzLm1hcCIsImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXR5cGVzLmpzLm1hcCIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tLCBwYWNrKSB7XG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcbn07XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb24gKi9cbmltcG9ydCB7IGNyZWF0ZVBvcHBlciB9IGZyb20gJ0Bwb3BwZXJqcy9jb3JlJztcbnZhciBEZWZhdWx0ID0ge1xuICAgIHBsYWNlbWVudDogJ2JvdHRvbScsXG4gICAgdHJpZ2dlclR5cGU6ICdjbGljaycsXG4gICAgb2Zmc2V0U2tpZGRpbmc6IDAsXG4gICAgb2Zmc2V0RGlzdGFuY2U6IDEwLFxuICAgIGRlbGF5OiAzMDAsXG4gICAgb25TaG93OiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgb25IaWRlOiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgb25Ub2dnbGU6IGZ1bmN0aW9uICgpIHsgfSxcbn07XG52YXIgRHJvcGRvd24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRHJvcGRvd24odGFyZ2V0RWxlbWVudCwgdHJpZ2dlckVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRhcmdldEVsZW1lbnQgPT09IHZvaWQgMCkgeyB0YXJnZXRFbGVtZW50ID0gbnVsbDsgfVxuICAgICAgICBpZiAodHJpZ2dlckVsZW1lbnQgPT09IHZvaWQgMCkgeyB0cmlnZ2VyRWxlbWVudCA9IG51bGw7IH1cbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0gRGVmYXVsdDsgfVxuICAgICAgICB0aGlzLl90YXJnZXRFbCA9IHRhcmdldEVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJFbCA9IHRyaWdnZXJFbGVtZW50O1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gX19hc3NpZ24oX19hc3NpZ24oe30sIERlZmF1bHQpLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fcG9wcGVySW5zdGFuY2UgPSB0aGlzLl9jcmVhdGVQb3BwZXJJbnN0YW5jZSgpO1xuICAgICAgICB0aGlzLl92aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9XG4gICAgRHJvcGRvd24ucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fdHJpZ2dlckVsKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERyb3Bkb3duLnByb3RvdHlwZS5fc2V0dXBFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHRyaWdnZXJFdmVudHMgPSB0aGlzLl9nZXRUcmlnZ2VyRXZlbnRzKCk7XG4gICAgICAgIC8vIGNsaWNrIGV2ZW50IGhhbmRsaW5nIGZvciB0cmlnZ2VyIGVsZW1lbnRcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudHJpZ2dlclR5cGUgPT09ICdjbGljaycpIHtcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudHMuc2hvd0V2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgICAgIF90aGlzLl90cmlnZ2VyRWwuYWRkRXZlbnRMaXN0ZW5lcihldiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy50b2dnbGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGhvdmVyIGV2ZW50IGhhbmRsaW5nIGZvciB0cmlnZ2VyIGVsZW1lbnRcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudHJpZ2dlclR5cGUgPT09ICdob3ZlcicpIHtcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudHMuc2hvd0V2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgICAgIF90aGlzLl90cmlnZ2VyRWwuYWRkRXZlbnRMaXN0ZW5lcihldiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXYgPT09ICdjbGljaycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnRvZ2dsZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgX3RoaXMuX29wdGlvbnMuZGVsYXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3RhcmdldEVsLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2hvdygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnRzLmhpZGVFdmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fdHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIV90aGlzLl90YXJnZXRFbC5tYXRjaGVzKCc6aG92ZXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgX3RoaXMuX29wdGlvbnMuZGVsYXkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIF90aGlzLl90YXJnZXRFbC5hZGRFdmVudExpc3RlbmVyKGV2LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5fdHJpZ2dlckVsLm1hdGNoZXMoJzpob3ZlcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBfdGhpcy5fb3B0aW9ucy5kZWxheSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRHJvcGRvd24ucHJvdG90eXBlLl9jcmVhdGVQb3BwZXJJbnN0YW5jZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVBvcHBlcih0aGlzLl90cmlnZ2VyRWwsIHRoaXMuX3RhcmdldEVsLCB7XG4gICAgICAgICAgICBwbGFjZW1lbnQ6IHRoaXMuX29wdGlvbnMucGxhY2VtZW50LFxuICAgICAgICAgICAgbW9kaWZpZXJzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnb2Zmc2V0JyxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0OiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5vZmZzZXRTa2lkZGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLm9mZnNldERpc3RhbmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBEcm9wZG93bi5wcm90b3R5cGUuX3NldHVwQ2xpY2tPdXRzaWRlTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2NsaWNrT3V0c2lkZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIF90aGlzLl9oYW5kbGVDbGlja091dHNpZGUoZXYsIF90aGlzLl90YXJnZXRFbCk7XG4gICAgICAgIH07XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9jbGlja091dHNpZGVFdmVudExpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuICAgIERyb3Bkb3duLnByb3RvdHlwZS5fcmVtb3ZlQ2xpY2tPdXRzaWRlTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9jbGlja091dHNpZGVFdmVudExpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuICAgIERyb3Bkb3duLnByb3RvdHlwZS5faGFuZGxlQ2xpY2tPdXRzaWRlID0gZnVuY3Rpb24gKGV2LCB0YXJnZXRFbCkge1xuICAgICAgICB2YXIgY2xpY2tlZEVsID0gZXYudGFyZ2V0O1xuICAgICAgICBpZiAoY2xpY2tlZEVsICE9PSB0YXJnZXRFbCAmJlxuICAgICAgICAgICAgIXRhcmdldEVsLmNvbnRhaW5zKGNsaWNrZWRFbCkgJiZcbiAgICAgICAgICAgICF0aGlzLl90cmlnZ2VyRWwuY29udGFpbnMoY2xpY2tlZEVsKSAmJlxuICAgICAgICAgICAgdGhpcy5pc1Zpc2libGUoKSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERyb3Bkb3duLnByb3RvdHlwZS5fZ2V0VHJpZ2dlckV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLl9vcHRpb25zLnRyaWdnZXJUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdob3Zlcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0V2ZW50czogWydtb3VzZWVudGVyJywgJ2NsaWNrJ10sXG4gICAgICAgICAgICAgICAgICAgIGhpZGVFdmVudHM6IFsnbW91c2VsZWF2ZSddLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlICdjbGljayc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0V2ZW50czogWydjbGljayddLFxuICAgICAgICAgICAgICAgICAgICBoaWRlRXZlbnRzOiBbXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAnbm9uZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0V2ZW50czogW10sXG4gICAgICAgICAgICAgICAgICAgIGhpZGVFdmVudHM6IFtdLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dFdmVudHM6IFsnY2xpY2snXSxcbiAgICAgICAgICAgICAgICAgICAgaGlkZUV2ZW50czogW10sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRHJvcGRvd24ucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vblRvZ2dsZSh0aGlzKTtcbiAgICB9O1xuICAgIERyb3Bkb3duLnByb3RvdHlwZS5pc1Zpc2libGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xuICAgIH07XG4gICAgRHJvcGRvd24ucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuYWRkKCdibG9jaycpO1xuICAgICAgICAvLyBFbmFibGUgdGhlIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICB0aGlzLl9wb3BwZXJJbnN0YW5jZS5zZXRPcHRpb25zKGZ1bmN0aW9uIChvcHRpb25zKSB7IHJldHVybiAoX19hc3NpZ24oX19hc3NpZ24oe30sIG9wdGlvbnMpLCB7IG1vZGlmaWVyczogX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KFtdLCBvcHRpb25zLm1vZGlmaWVycywgdHJ1ZSksIFtcbiAgICAgICAgICAgICAgICB7IG5hbWU6ICdldmVudExpc3RlbmVycycsIGVuYWJsZWQ6IHRydWUgfSxcbiAgICAgICAgICAgIF0sIGZhbHNlKSB9KSk7IH0pO1xuICAgICAgICB0aGlzLl9zZXR1cENsaWNrT3V0c2lkZUxpc3RlbmVyKCk7XG4gICAgICAgIC8vIFVwZGF0ZSBpdHMgcG9zaXRpb25cbiAgICAgICAgdGhpcy5fcG9wcGVySW5zdGFuY2UudXBkYXRlKCk7XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSB0cnVlO1xuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uU2hvdyh0aGlzKTtcbiAgICB9O1xuICAgIERyb3Bkb3duLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKCdibG9jaycpO1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgLy8gRGlzYWJsZSB0aGUgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgIHRoaXMuX3BvcHBlckluc3RhbmNlLnNldE9wdGlvbnMoZnVuY3Rpb24gKG9wdGlvbnMpIHsgcmV0dXJuIChfX2Fzc2lnbihfX2Fzc2lnbih7fSwgb3B0aW9ucyksIHsgbW9kaWZpZXJzOiBfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoW10sIG9wdGlvbnMubW9kaWZpZXJzLCB0cnVlKSwgW1xuICAgICAgICAgICAgICAgIHsgbmFtZTogJ2V2ZW50TGlzdGVuZXJzJywgZW5hYmxlZDogZmFsc2UgfSxcbiAgICAgICAgICAgIF0sIGZhbHNlKSB9KSk7IH0pO1xuICAgICAgICB0aGlzLl92aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3JlbW92ZUNsaWNrT3V0c2lkZUxpc3RlbmVyKCk7XG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25IaWRlKHRoaXMpO1xuICAgIH07XG4gICAgcmV0dXJuIERyb3Bkb3duO1xufSgpKTtcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHdpbmRvdy5Ecm9wZG93biA9IERyb3Bkb3duO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGluaXREcm9wZG93bnMoKSB7XG4gICAgZG9jdW1lbnRcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRyb3Bkb3duLXRvZ2dsZV0nKVxuICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAoJHRyaWdnZXJFbCkge1xuICAgICAgICB2YXIgZHJvcGRvd25JZCA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRyb3Bkb3duLXRvZ2dsZScpO1xuICAgICAgICB2YXIgJGRyb3Bkb3duRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkcm9wZG93bklkKTtcbiAgICAgICAgaWYgKCRkcm9wZG93bkVsKSB7XG4gICAgICAgICAgICB2YXIgcGxhY2VtZW50ID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZHJvcGRvd24tcGxhY2VtZW50Jyk7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0U2tpZGRpbmcgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kcm9wZG93bi1vZmZzZXQtc2tpZGRpbmcnKTtcbiAgICAgICAgICAgIHZhciBvZmZzZXREaXN0YW5jZSA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRyb3Bkb3duLW9mZnNldC1kaXN0YW5jZScpO1xuICAgICAgICAgICAgdmFyIHRyaWdnZXJUeXBlID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZHJvcGRvd24tdHJpZ2dlcicpO1xuICAgICAgICAgICAgdmFyIGRlbGF5ID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZHJvcGRvd24tZGVsYXknKTtcbiAgICAgICAgICAgIG5ldyBEcm9wZG93bigkZHJvcGRvd25FbCwgJHRyaWdnZXJFbCwge1xuICAgICAgICAgICAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50ID8gcGxhY2VtZW50IDogRGVmYXVsdC5wbGFjZW1lbnQsXG4gICAgICAgICAgICAgICAgdHJpZ2dlclR5cGU6IHRyaWdnZXJUeXBlXG4gICAgICAgICAgICAgICAgICAgID8gdHJpZ2dlclR5cGVcbiAgICAgICAgICAgICAgICAgICAgOiBEZWZhdWx0LnRyaWdnZXJUeXBlLFxuICAgICAgICAgICAgICAgIG9mZnNldFNraWRkaW5nOiBvZmZzZXRTa2lkZGluZ1xuICAgICAgICAgICAgICAgICAgICA/IHBhcnNlSW50KG9mZnNldFNraWRkaW5nKVxuICAgICAgICAgICAgICAgICAgICA6IERlZmF1bHQub2Zmc2V0U2tpZGRpbmcsXG4gICAgICAgICAgICAgICAgb2Zmc2V0RGlzdGFuY2U6IG9mZnNldERpc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgID8gcGFyc2VJbnQob2Zmc2V0RGlzdGFuY2UpXG4gICAgICAgICAgICAgICAgICAgIDogRGVmYXVsdC5vZmZzZXREaXN0YW5jZSxcbiAgICAgICAgICAgICAgICBkZWxheTogZGVsYXkgPyBwYXJzZUludChkZWxheSkgOiBEZWZhdWx0LmRlbGF5LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVGhlIGRyb3Bkb3duIGVsZW1lbnQgd2l0aCBpZCBcXFwiXCIuY29uY2F0KGRyb3Bkb3duSWQsIFwiXFxcIiBkb2VzIG5vdCBleGlzdC4gUGxlYXNlIGNoZWNrIHRoZSBkYXRhLWRyb3Bkb3duLXRvZ2dsZSBhdHRyaWJ1dGUuXCIpKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0IGRlZmF1bHQgRHJvcGRvd247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnRlcmZhY2UuanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwZXMuanMubWFwIiwiaW1wb3J0IHsgaW5pdEFjY29yZGlvbnMgfSBmcm9tICcuL2FjY29yZGlvbic7XG5pbXBvcnQgeyBpbml0Q2Fyb3VzZWxzIH0gZnJvbSAnLi9jYXJvdXNlbCc7XG5pbXBvcnQgeyBpbml0Q29sbGFwc2VzIH0gZnJvbSAnLi9jb2xsYXBzZSc7XG5pbXBvcnQgeyBpbml0RGlhbHMgfSBmcm9tICcuL2RpYWwnO1xuaW1wb3J0IHsgaW5pdERpc21pc3NlcyB9IGZyb20gJy4vZGlzbWlzcyc7XG5pbXBvcnQgeyBpbml0RHJhd2VycyB9IGZyb20gJy4vZHJhd2VyJztcbmltcG9ydCB7IGluaXREcm9wZG93bnMgfSBmcm9tICcuL2Ryb3Bkb3duJztcbmltcG9ydCB7IGluaXRNb2RhbHMgfSBmcm9tICcuL21vZGFsJztcbmltcG9ydCB7IGluaXRQb3BvdmVycyB9IGZyb20gJy4vcG9wb3Zlcic7XG5pbXBvcnQgeyBpbml0VGFicyB9IGZyb20gJy4vdGFicyc7XG5pbXBvcnQgeyBpbml0VG9vbHRpcHMgfSBmcm9tICcuL3Rvb2x0aXAnO1xuZXhwb3J0IGZ1bmN0aW9uIGluaXRGbG93Yml0ZSgpIHtcbiAgICBpbml0QWNjb3JkaW9ucygpO1xuICAgIGluaXRDb2xsYXBzZXMoKTtcbiAgICBpbml0Q2Fyb3VzZWxzKCk7XG4gICAgaW5pdERpc21pc3NlcygpO1xuICAgIGluaXREcm9wZG93bnMoKTtcbiAgICBpbml0TW9kYWxzKCk7XG4gICAgaW5pdERyYXdlcnMoKTtcbiAgICBpbml0VGFicygpO1xuICAgIGluaXRUb29sdGlwcygpO1xuICAgIGluaXRQb3BvdmVycygpO1xuICAgIGluaXREaWFscygpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBEZWZhdWx0ID0ge1xuICAgIHBsYWNlbWVudDogJ2NlbnRlcicsXG4gICAgYmFja2Ryb3BDbGFzc2VzOiAnYmctZ3JheS05MDAgYmctb3BhY2l0eS01MCBkYXJrOmJnLW9wYWNpdHktODAgZml4ZWQgaW5zZXQtMCB6LTQwJyxcbiAgICBiYWNrZHJvcDogJ2R5bmFtaWMnLFxuICAgIGNsb3NhYmxlOiB0cnVlLFxuICAgIG9uSGlkZTogZnVuY3Rpb24gKCkgeyB9LFxuICAgIG9uU2hvdzogZnVuY3Rpb24gKCkgeyB9LFxuICAgIG9uVG9nZ2xlOiBmdW5jdGlvbiAoKSB7IH0sXG59O1xudmFyIE1vZGFsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1vZGFsKHRhcmdldEVsLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICh0YXJnZXRFbCA9PT0gdm9pZCAwKSB7IHRhcmdldEVsID0gbnVsbDsgfVxuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSBEZWZhdWx0OyB9XG4gICAgICAgIHRoaXMuX3RhcmdldEVsID0gdGFyZ2V0RWw7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgRGVmYXVsdCksIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9pc0hpZGRlbiA9IHRydWU7XG4gICAgICAgIHRoaXMuX2JhY2tkcm9wRWwgPSBudWxsO1xuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgfVxuICAgIE1vZGFsLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuX3RhcmdldEVsKSB7XG4gICAgICAgICAgICB0aGlzLl9nZXRQbGFjZW1lbnRDbGFzc2VzKCkubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoYyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTW9kYWwucHJvdG90eXBlLl9jcmVhdGVCYWNrZHJvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAodGhpcy5faXNIaWRkZW4pIHtcbiAgICAgICAgICAgIHZhciBiYWNrZHJvcEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBiYWNrZHJvcEVsLnNldEF0dHJpYnV0ZSgnbW9kYWwtYmFja2Ryb3AnLCAnJyk7XG4gICAgICAgICAgICAoX2EgPSBiYWNrZHJvcEVsLmNsYXNzTGlzdCkuYWRkLmFwcGx5KF9hLCB0aGlzLl9vcHRpb25zLmJhY2tkcm9wQ2xhc3Nlcy5zcGxpdCgnICcpKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmQoYmFja2Ryb3BFbCk7XG4gICAgICAgICAgICB0aGlzLl9iYWNrZHJvcEVsID0gYmFja2Ryb3BFbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTW9kYWwucHJvdG90eXBlLl9kZXN0cm95QmFja2Ryb3BFbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc0hpZGRlbikge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW21vZGFsLWJhY2tkcm9wXScpLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBNb2RhbC5wcm90b3R5cGUuX3NldHVwTW9kYWxDbG9zZUV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5iYWNrZHJvcCA9PT0gJ2R5bmFtaWMnKSB7XG4gICAgICAgICAgICB0aGlzLl9jbGlja091dHNpZGVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX2hhbmRsZU91dHNpZGVDbGljayhldi50YXJnZXQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fY2xpY2tPdXRzaWRlRXZlbnRMaXN0ZW5lciwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fa2V5ZG93bkV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIGlmIChldi5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9rZXlkb3duRXZlbnRMaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcbiAgICBNb2RhbC5wcm90b3R5cGUuX3JlbW92ZU1vZGFsQ2xvc2VFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuYmFja2Ryb3AgPT09ICdkeW5hbWljJykge1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0RWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9jbGlja091dHNpZGVFdmVudExpc3RlbmVyLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9rZXlkb3duRXZlbnRMaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcbiAgICBNb2RhbC5wcm90b3R5cGUuX2hhbmRsZU91dHNpZGVDbGljayA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgaWYgKHRhcmdldCA9PT0gdGhpcy5fdGFyZ2V0RWwgfHxcbiAgICAgICAgICAgICh0YXJnZXQgPT09IHRoaXMuX2JhY2tkcm9wRWwgJiYgdGhpcy5pc1Zpc2libGUoKSkpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBNb2RhbC5wcm90b3R5cGUuX2dldFBsYWNlbWVudENsYXNzZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5fb3B0aW9ucy5wbGFjZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIHRvcFxuICAgICAgICAgICAgY2FzZSAndG9wLWxlZnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBbJ2p1c3RpZnktc3RhcnQnLCAnaXRlbXMtc3RhcnQnXTtcbiAgICAgICAgICAgIGNhc2UgJ3RvcC1jZW50ZXInOlxuICAgICAgICAgICAgICAgIHJldHVybiBbJ2p1c3RpZnktY2VudGVyJywgJ2l0ZW1zLXN0YXJ0J107XG4gICAgICAgICAgICBjYXNlICd0b3AtcmlnaHQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBbJ2p1c3RpZnktZW5kJywgJ2l0ZW1zLXN0YXJ0J107XG4gICAgICAgICAgICAvLyBjZW50ZXJcbiAgICAgICAgICAgIGNhc2UgJ2NlbnRlci1sZWZ0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gWydqdXN0aWZ5LXN0YXJ0JywgJ2l0ZW1zLWNlbnRlciddO1xuICAgICAgICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gWydqdXN0aWZ5LWNlbnRlcicsICdpdGVtcy1jZW50ZXInXTtcbiAgICAgICAgICAgIGNhc2UgJ2NlbnRlci1yaWdodCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnanVzdGlmeS1lbmQnLCAnaXRlbXMtY2VudGVyJ107XG4gICAgICAgICAgICAvLyBib3R0b21cbiAgICAgICAgICAgIGNhc2UgJ2JvdHRvbS1sZWZ0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gWydqdXN0aWZ5LXN0YXJ0JywgJ2l0ZW1zLWVuZCddO1xuICAgICAgICAgICAgY2FzZSAnYm90dG9tLWNlbnRlcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnanVzdGlmeS1jZW50ZXInLCAnaXRlbXMtZW5kJ107XG4gICAgICAgICAgICBjYXNlICdib3R0b20tcmlnaHQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBbJ2p1c3RpZnktZW5kJywgJ2l0ZW1zLWVuZCddO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gWydqdXN0aWZ5LWNlbnRlcicsICdpdGVtcy1jZW50ZXInXTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTW9kYWwucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzSGlkZGVuKSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX29wdGlvbnMub25Ub2dnbGUodGhpcyk7XG4gICAgfTtcbiAgICBNb2RhbC5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNIaWRkZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoJ2ZsZXgnKTtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0RWwuc2V0QXR0cmlidXRlKCdhcmlhLW1vZGFsJywgJ3RydWUnKTtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldEVsLnNldEF0dHJpYnV0ZSgncm9sZScsICdkaWFsb2cnKTtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldEVsLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKTtcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUJhY2tkcm9wKCk7XG4gICAgICAgICAgICB0aGlzLl9pc0hpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gcHJldmVudCBib2R5IHNjcm9sbFxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdvdmVyZmxvdy1oaWRkZW4nKTtcbiAgICAgICAgICAgIC8vIEFkZCBrZXlib2FyZCBldmVudCBsaXN0ZW5lciB0byB0aGUgZG9jdW1lbnRcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmNsb3NhYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0dXBNb2RhbENsb3NlRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLm9uU2hvdyh0aGlzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTW9kYWwucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKCdmbGV4Jyk7XG4gICAgICAgICAgICB0aGlzLl90YXJnZXRFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldEVsLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1tb2RhbCcpO1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0RWwucmVtb3ZlQXR0cmlidXRlKCdyb2xlJyk7XG4gICAgICAgICAgICB0aGlzLl9kZXN0cm95QmFja2Ryb3BFbCgpO1xuICAgICAgICAgICAgdGhpcy5faXNIaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgLy8gcmUtYXBwbHkgYm9keSBzY3JvbGxcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnb3ZlcmZsb3ctaGlkZGVuJyk7XG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5jbG9zYWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZU1vZGFsQ2xvc2VFdmVudExpc3RlbmVycygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMub25IaWRlKHRoaXMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBNb2RhbC5wcm90b3R5cGUuaXNWaXNpYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuX2lzSGlkZGVuO1xuICAgIH07XG4gICAgTW9kYWwucHJvdG90eXBlLmlzSGlkZGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNIaWRkZW47XG4gICAgfTtcbiAgICByZXR1cm4gTW9kYWw7XG59KCkpO1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgd2luZG93Lk1vZGFsID0gTW9kYWw7XG59XG52YXIgZ2V0TW9kYWxJbnN0YW5jZSA9IGZ1bmN0aW9uIChpZCwgaW5zdGFuY2VzKSB7XG4gICAgaWYgKGluc3RhbmNlcy5zb21lKGZ1bmN0aW9uIChtb2RhbEluc3RhbmNlKSB7IHJldHVybiBtb2RhbEluc3RhbmNlLmlkID09PSBpZDsgfSkpIHtcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlcy5maW5kKGZ1bmN0aW9uIChtb2RhbEluc3RhbmNlKSB7IHJldHVybiBtb2RhbEluc3RhbmNlLmlkID09PSBpZDsgfSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBpbml0TW9kYWxzKCkge1xuICAgIHZhciBtb2RhbEluc3RhbmNlcyA9IFtdO1xuICAgIC8vIGluaXRpYXRlIG1vZGFsIGJhc2VkIG9uIGRhdGEtbW9kYWwtdGFyZ2V0XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbW9kYWwtdGFyZ2V0XScpLmZvckVhY2goZnVuY3Rpb24gKCR0cmlnZ2VyRWwpIHtcbiAgICAgICAgdmFyIG1vZGFsSWQgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1tb2RhbC10YXJnZXQnKTtcbiAgICAgICAgdmFyICRtb2RhbEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobW9kYWxJZCk7XG4gICAgICAgIGlmICgkbW9kYWxFbCkge1xuICAgICAgICAgICAgdmFyIHBsYWNlbWVudCA9ICRtb2RhbEVsLmdldEF0dHJpYnV0ZSgnZGF0YS1tb2RhbC1wbGFjZW1lbnQnKTtcbiAgICAgICAgICAgIHZhciBiYWNrZHJvcCA9ICRtb2RhbEVsLmdldEF0dHJpYnV0ZSgnZGF0YS1tb2RhbC1iYWNrZHJvcCcpO1xuICAgICAgICAgICAgaWYgKCFnZXRNb2RhbEluc3RhbmNlKG1vZGFsSWQsIG1vZGFsSW5zdGFuY2VzKSkge1xuICAgICAgICAgICAgICAgIG1vZGFsSW5zdGFuY2VzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogbW9kYWxJZCxcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0OiBuZXcgTW9kYWwoJG1vZGFsRWwsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBwbGFjZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IERlZmF1bHQucGxhY2VtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2Ryb3A6IGJhY2tkcm9wID8gYmFja2Ryb3AgOiBEZWZhdWx0LmJhY2tkcm9wLFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNb2RhbCB3aXRoIGlkIFwiLmNvbmNhdChtb2RhbElkLCBcIiBkb2VzIG5vdCBleGlzdC4gQXJlIHlvdSBzdXJlIHRoYXQgdGhlIGRhdGEtbW9kYWwtdGFyZ2V0IGF0dHJpYnV0ZSBwb2ludHMgdG8gdGhlIGNvcnJlY3QgbW9kYWwgaWQ/LlwiKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBzdXBwb3J0IHByZSB2MS42LjAgZGF0YS1tb2RhbC10b2dnbGUgaW5pdGlhbGl6YXRpb25cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1tb2RhbC10b2dnbGVdJykuZm9yRWFjaChmdW5jdGlvbiAoJHRyaWdnZXJFbCkge1xuICAgICAgICB2YXIgbW9kYWxJZCA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLW1vZGFsLXRvZ2dsZScpO1xuICAgICAgICB2YXIgJG1vZGFsRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChtb2RhbElkKTtcbiAgICAgICAgaWYgKCRtb2RhbEVsKSB7XG4gICAgICAgICAgICB2YXIgcGxhY2VtZW50ID0gJG1vZGFsRWwuZ2V0QXR0cmlidXRlKCdkYXRhLW1vZGFsLXBsYWNlbWVudCcpO1xuICAgICAgICAgICAgdmFyIGJhY2tkcm9wID0gJG1vZGFsRWwuZ2V0QXR0cmlidXRlKCdkYXRhLW1vZGFsLWJhY2tkcm9wJyk7XG4gICAgICAgICAgICB2YXIgbW9kYWxfMSA9IGdldE1vZGFsSW5zdGFuY2UobW9kYWxJZCwgbW9kYWxJbnN0YW5jZXMpO1xuICAgICAgICAgICAgaWYgKCFtb2RhbF8xKSB7XG4gICAgICAgICAgICAgICAgbW9kYWxfMSA9IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IG1vZGFsSWQsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdDogbmV3IE1vZGFsKCRtb2RhbEVsLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gcGxhY2VtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBEZWZhdWx0LnBsYWNlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tkcm9wOiBiYWNrZHJvcCA/IGJhY2tkcm9wIDogRGVmYXVsdC5iYWNrZHJvcCxcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBtb2RhbEluc3RhbmNlcy5wdXNoKG1vZGFsXzEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJHRyaWdnZXJFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBtb2RhbF8xLm9iamVjdC50b2dnbGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1vZGFsIHdpdGggaWQgXCIuY29uY2F0KG1vZGFsSWQsIFwiIGRvZXMgbm90IGV4aXN0LiBBcmUgeW91IHN1cmUgdGhhdCB0aGUgZGF0YS1tb2RhbC10b2dnbGUgYXR0cmlidXRlIHBvaW50cyB0byB0aGUgY29ycmVjdCBtb2RhbCBpZD9cIikpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gc2hvdyBtb2RhbCBvbiBjbGljayBpZiBleGlzdHMgYmFzZWQgb24gaWRcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1tb2RhbC1zaG93XScpLmZvckVhY2goZnVuY3Rpb24gKCR0cmlnZ2VyRWwpIHtcbiAgICAgICAgdmFyIG1vZGFsSWQgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1tb2RhbC1zaG93Jyk7XG4gICAgICAgIHZhciAkbW9kYWxFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG1vZGFsSWQpO1xuICAgICAgICBpZiAoJG1vZGFsRWwpIHtcbiAgICAgICAgICAgIHZhciBtb2RhbF8yID0gZ2V0TW9kYWxJbnN0YW5jZShtb2RhbElkLCBtb2RhbEluc3RhbmNlcyk7XG4gICAgICAgICAgICBpZiAobW9kYWxfMikge1xuICAgICAgICAgICAgICAgICR0cmlnZ2VyRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2RhbF8yLm9iamVjdC5pc0hpZGRlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWxfMi5vYmplY3Quc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTW9kYWwgd2l0aCBpZCBcIi5jb25jYXQobW9kYWxJZCwgXCIgaGFzIG5vdCBiZWVuIGluaXRpYWxpemVkLiBQbGVhc2UgaW5pdGlhbGl6ZSBpdCB1c2luZyB0aGUgZGF0YS1tb2RhbC10YXJnZXQgYXR0cmlidXRlLlwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTW9kYWwgd2l0aCBpZCBcIi5jb25jYXQobW9kYWxJZCwgXCIgZG9lcyBub3QgZXhpc3QuIEFyZSB5b3Ugc3VyZSB0aGF0IHRoZSBkYXRhLW1vZGFsLXNob3cgYXR0cmlidXRlIHBvaW50cyB0byB0aGUgY29ycmVjdCBtb2RhbCBpZD9cIikpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gaGlkZSBtb2RhbCBvbiBjbGljayBpZiBleGlzdHMgYmFzZWQgb24gaWRcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1tb2RhbC1oaWRlXScpLmZvckVhY2goZnVuY3Rpb24gKCR0cmlnZ2VyRWwpIHtcbiAgICAgICAgdmFyIG1vZGFsSWQgPSAkdHJpZ2dlckVsLmdldEF0dHJpYnV0ZSgnZGF0YS1tb2RhbC1oaWRlJyk7XG4gICAgICAgIHZhciAkbW9kYWxFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG1vZGFsSWQpO1xuICAgICAgICBpZiAoJG1vZGFsRWwpIHtcbiAgICAgICAgICAgIHZhciBtb2RhbF8zID0gZ2V0TW9kYWxJbnN0YW5jZShtb2RhbElkLCBtb2RhbEluc3RhbmNlcyk7XG4gICAgICAgICAgICBpZiAobW9kYWxfMykge1xuICAgICAgICAgICAgICAgICR0cmlnZ2VyRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2RhbF8zLm9iamVjdC5pc1Zpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsXzMub2JqZWN0LmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1vZGFsIHdpdGggaWQgXCIuY29uY2F0KG1vZGFsSWQsIFwiIGhhcyBub3QgYmVlbiBpbml0aWFsaXplZC4gUGxlYXNlIGluaXRpYWxpemUgaXQgdXNpbmcgdGhlIGRhdGEtbW9kYWwtdGFyZ2V0IGF0dHJpYnV0ZS5cIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1vZGFsIHdpdGggaWQgXCIuY29uY2F0KG1vZGFsSWQsIFwiIGRvZXMgbm90IGV4aXN0LiBBcmUgeW91IHN1cmUgdGhhdCB0aGUgZGF0YS1tb2RhbC1oaWRlIGF0dHJpYnV0ZSBwb2ludHMgdG8gdGhlIGNvcnJlY3QgbW9kYWwgaWQ/XCIpKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0IGRlZmF1bHQgTW9kYWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnRlcmZhY2UuanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwZXMuanMubWFwIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20sIHBhY2spIHtcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xufTtcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1mdW5jdGlvbiAqL1xuaW1wb3J0IHsgY3JlYXRlUG9wcGVyIH0gZnJvbSAnQHBvcHBlcmpzL2NvcmUnO1xudmFyIERlZmF1bHQgPSB7XG4gICAgcGxhY2VtZW50OiAndG9wJyxcbiAgICBvZmZzZXQ6IDEwLFxuICAgIHRyaWdnZXJUeXBlOiAnaG92ZXInLFxuICAgIG9uU2hvdzogZnVuY3Rpb24gKCkgeyB9LFxuICAgIG9uSGlkZTogZnVuY3Rpb24gKCkgeyB9LFxuICAgIG9uVG9nZ2xlOiBmdW5jdGlvbiAoKSB7IH0sXG59O1xudmFyIFBvcG92ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUG9wb3Zlcih0YXJnZXRFbCwgdHJpZ2dlckVsLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICh0YXJnZXRFbCA9PT0gdm9pZCAwKSB7IHRhcmdldEVsID0gbnVsbDsgfVxuICAgICAgICBpZiAodHJpZ2dlckVsID09PSB2b2lkIDApIHsgdHJpZ2dlckVsID0gbnVsbDsgfVxuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSBEZWZhdWx0OyB9XG4gICAgICAgIHRoaXMuX3RhcmdldEVsID0gdGFyZ2V0RWw7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJFbCA9IHRyaWdnZXJFbDtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBEZWZhdWx0KSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX3BvcHBlckluc3RhbmNlID0gdGhpcy5fY3JlYXRlUG9wcGVySW5zdGFuY2UoKTtcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgfVxuICAgIFBvcG92ZXIucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fdHJpZ2dlckVsKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFBvcG92ZXIucHJvdG90eXBlLl9zZXR1cEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgdHJpZ2dlckV2ZW50cyA9IHRoaXMuX2dldFRyaWdnZXJFdmVudHMoKTtcbiAgICAgICAgdHJpZ2dlckV2ZW50cy5zaG93RXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBfdGhpcy5fdHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zaG93KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIF90aGlzLl90YXJnZXRFbC5hZGRFdmVudExpc3RlbmVyKGV2LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2hvdygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0cmlnZ2VyRXZlbnRzLmhpZGVFdmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIF90aGlzLl90cmlnZ2VyRWwuYWRkRXZlbnRMaXN0ZW5lcihldiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIV90aGlzLl90YXJnZXRFbC5tYXRjaGVzKCc6aG92ZXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgX3RoaXMuX3RhcmdldEVsLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5fdHJpZ2dlckVsLm1hdGNoZXMoJzpob3ZlcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUG9wb3Zlci5wcm90b3R5cGUuX2NyZWF0ZVBvcHBlckluc3RhbmNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlUG9wcGVyKHRoaXMuX3RyaWdnZXJFbCwgdGhpcy5fdGFyZ2V0RWwsIHtcbiAgICAgICAgICAgIHBsYWNlbWVudDogdGhpcy5fb3B0aW9ucy5wbGFjZW1lbnQsXG4gICAgICAgICAgICBtb2RpZmllcnM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdvZmZzZXQnLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQ6IFswLCB0aGlzLl9vcHRpb25zLm9mZnNldF0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUG9wb3Zlci5wcm90b3R5cGUuX2dldFRyaWdnZXJFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5fb3B0aW9ucy50cmlnZ2VyVHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnaG92ZXInOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dFdmVudHM6IFsnbW91c2VlbnRlcicsICdmb2N1cyddLFxuICAgICAgICAgICAgICAgICAgICBoaWRlRXZlbnRzOiBbJ21vdXNlbGVhdmUnLCAnYmx1ciddLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlICdjbGljayc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0V2ZW50czogWydjbGljaycsICdmb2N1cyddLFxuICAgICAgICAgICAgICAgICAgICBoaWRlRXZlbnRzOiBbJ2ZvY3Vzb3V0JywgJ2JsdXInXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAnbm9uZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0V2ZW50czogW10sXG4gICAgICAgICAgICAgICAgICAgIGhpZGVFdmVudHM6IFtdLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dFdmVudHM6IFsnbW91c2VlbnRlcicsICdmb2N1cyddLFxuICAgICAgICAgICAgICAgICAgICBoaWRlRXZlbnRzOiBbJ21vdXNlbGVhdmUnLCAnYmx1ciddLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFBvcG92ZXIucHJvdG90eXBlLl9zZXR1cEtleWRvd25MaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fa2V5ZG93bkV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIGlmIChldi5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9rZXlkb3duRXZlbnRMaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcbiAgICBQb3BvdmVyLnByb3RvdHlwZS5fcmVtb3ZlS2V5ZG93bkxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9rZXlkb3duRXZlbnRMaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcbiAgICBQb3BvdmVyLnByb3RvdHlwZS5fc2V0dXBDbGlja091dHNpZGVMaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fY2xpY2tPdXRzaWRlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgX3RoaXMuX2hhbmRsZUNsaWNrT3V0c2lkZShldiwgX3RoaXMuX3RhcmdldEVsKTtcbiAgICAgICAgfTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2NsaWNrT3V0c2lkZUV2ZW50TGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG4gICAgUG9wb3Zlci5wcm90b3R5cGUuX3JlbW92ZUNsaWNrT3V0c2lkZUxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fY2xpY2tPdXRzaWRlRXZlbnRMaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcbiAgICBQb3BvdmVyLnByb3RvdHlwZS5faGFuZGxlQ2xpY2tPdXRzaWRlID0gZnVuY3Rpb24gKGV2LCB0YXJnZXRFbCkge1xuICAgICAgICB2YXIgY2xpY2tlZEVsID0gZXYudGFyZ2V0O1xuICAgICAgICBpZiAoY2xpY2tlZEVsICE9PSB0YXJnZXRFbCAmJlxuICAgICAgICAgICAgIXRhcmdldEVsLmNvbnRhaW5zKGNsaWNrZWRFbCkgJiZcbiAgICAgICAgICAgICF0aGlzLl90cmlnZ2VyRWwuY29udGFpbnMoY2xpY2tlZEVsKSAmJlxuICAgICAgICAgICAgdGhpcy5pc1Zpc2libGUoKSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFBvcG92ZXIucHJvdG90eXBlLmlzVmlzaWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XG4gICAgfTtcbiAgICBQb3BvdmVyLnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX29wdGlvbnMub25Ub2dnbGUodGhpcyk7XG4gICAgfTtcbiAgICBQb3BvdmVyLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKCdvcGFjaXR5LTAnLCAnaW52aXNpYmxlJyk7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoJ29wYWNpdHktMTAwJywgJ3Zpc2libGUnKTtcbiAgICAgICAgLy8gRW5hYmxlIHRoZSBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgdGhpcy5fcG9wcGVySW5zdGFuY2Uuc2V0T3B0aW9ucyhmdW5jdGlvbiAob3B0aW9ucykgeyByZXR1cm4gKF9fYXNzaWduKF9fYXNzaWduKHt9LCBvcHRpb25zKSwgeyBtb2RpZmllcnM6IF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShbXSwgb3B0aW9ucy5tb2RpZmllcnMsIHRydWUpLCBbXG4gICAgICAgICAgICAgICAgeyBuYW1lOiAnZXZlbnRMaXN0ZW5lcnMnLCBlbmFibGVkOiB0cnVlIH0sXG4gICAgICAgICAgICBdLCBmYWxzZSkgfSkpOyB9KTtcbiAgICAgICAgLy8gaGFuZGxlIGNsaWNrIG91dHNpZGVcbiAgICAgICAgdGhpcy5fc2V0dXBDbGlja091dHNpZGVMaXN0ZW5lcigpO1xuICAgICAgICAvLyBoYW5kbGUgZXNjIGtleWRvd25cbiAgICAgICAgdGhpcy5fc2V0dXBLZXlkb3duTGlzdGVuZXIoKTtcbiAgICAgICAgLy8gVXBkYXRlIGl0cyBwb3NpdGlvblxuICAgICAgICB0aGlzLl9wb3BwZXJJbnN0YW5jZS51cGRhdGUoKTtcbiAgICAgICAgLy8gc2V0IHZpc2liaWxpdHkgdG8gdHJ1ZVxuICAgICAgICB0aGlzLl92aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vblNob3codGhpcyk7XG4gICAgfTtcbiAgICBQb3BvdmVyLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKCdvcGFjaXR5LTEwMCcsICd2aXNpYmxlJyk7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5hZGQoJ29wYWNpdHktMCcsICdpbnZpc2libGUnKTtcbiAgICAgICAgLy8gRGlzYWJsZSB0aGUgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgIHRoaXMuX3BvcHBlckluc3RhbmNlLnNldE9wdGlvbnMoZnVuY3Rpb24gKG9wdGlvbnMpIHsgcmV0dXJuIChfX2Fzc2lnbihfX2Fzc2lnbih7fSwgb3B0aW9ucyksIHsgbW9kaWZpZXJzOiBfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoW10sIG9wdGlvbnMubW9kaWZpZXJzLCB0cnVlKSwgW1xuICAgICAgICAgICAgICAgIHsgbmFtZTogJ2V2ZW50TGlzdGVuZXJzJywgZW5hYmxlZDogZmFsc2UgfSxcbiAgICAgICAgICAgIF0sIGZhbHNlKSB9KSk7IH0pO1xuICAgICAgICAvLyBoYW5kbGUgY2xpY2sgb3V0c2lkZVxuICAgICAgICB0aGlzLl9yZW1vdmVDbGlja091dHNpZGVMaXN0ZW5lcigpO1xuICAgICAgICAvLyBoYW5kbGUgZXNjIGtleWRvd25cbiAgICAgICAgdGhpcy5fcmVtb3ZlS2V5ZG93bkxpc3RlbmVyKCk7XG4gICAgICAgIC8vIHNldCB2aXNpYmlsaXR5IHRvIGZhbHNlXG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgLy8gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5vbkhpZGUodGhpcyk7XG4gICAgfTtcbiAgICByZXR1cm4gUG9wb3Zlcjtcbn0oKSk7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB3aW5kb3cuUG9wb3ZlciA9IFBvcG92ZXI7XG59XG5leHBvcnQgZnVuY3Rpb24gaW5pdFBvcG92ZXJzKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBvcG92ZXItdGFyZ2V0XScpLmZvckVhY2goZnVuY3Rpb24gKCR0cmlnZ2VyRWwpIHtcbiAgICAgICAgdmFyIHBvcG92ZXJJRCA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLXBvcG92ZXItdGFyZ2V0Jyk7XG4gICAgICAgIHZhciAkcG9wb3ZlckVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocG9wb3ZlcklEKTtcbiAgICAgICAgaWYgKCRwb3BvdmVyRWwpIHtcbiAgICAgICAgICAgIHZhciB0cmlnZ2VyVHlwZSA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLXBvcG92ZXItdHJpZ2dlcicpO1xuICAgICAgICAgICAgdmFyIHBsYWNlbWVudCA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLXBvcG92ZXItcGxhY2VtZW50Jyk7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcG9wb3Zlci1vZmZzZXQnKTtcbiAgICAgICAgICAgIG5ldyBQb3BvdmVyKCRwb3BvdmVyRWwsICR0cmlnZ2VyRWwsIHtcbiAgICAgICAgICAgICAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudCA/IHBsYWNlbWVudCA6IERlZmF1bHQucGxhY2VtZW50LFxuICAgICAgICAgICAgICAgIG9mZnNldDogb2Zmc2V0ID8gcGFyc2VJbnQob2Zmc2V0KSA6IERlZmF1bHQub2Zmc2V0LFxuICAgICAgICAgICAgICAgIHRyaWdnZXJUeXBlOiB0cmlnZ2VyVHlwZVxuICAgICAgICAgICAgICAgICAgICA/IHRyaWdnZXJUeXBlXG4gICAgICAgICAgICAgICAgICAgIDogRGVmYXVsdC50cmlnZ2VyVHlwZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlRoZSBwb3BvdmVyIGVsZW1lbnQgd2l0aCBpZCBcXFwiXCIuY29uY2F0KHBvcG92ZXJJRCwgXCJcXFwiIGRvZXMgbm90IGV4aXN0LiBQbGVhc2UgY2hlY2sgdGhlIGRhdGEtcG9wb3Zlci10YXJnZXQgYXR0cmlidXRlLlwiKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydCBkZWZhdWx0IFBvcG92ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnRlcmZhY2UuanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwZXMuanMubWFwIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBEZWZhdWx0ID0ge1xuICAgIGRlZmF1bHRUYWJJZDogbnVsbCxcbiAgICBhY3RpdmVDbGFzc2VzOiAndGV4dC1ibHVlLTYwMCBob3Zlcjp0ZXh0LWJsdWUtNjAwIGRhcms6dGV4dC1ibHVlLTUwMCBkYXJrOmhvdmVyOnRleHQtYmx1ZS01MDAgYm9yZGVyLWJsdWUtNjAwIGRhcms6Ym9yZGVyLWJsdWUtNTAwJyxcbiAgICBpbmFjdGl2ZUNsYXNzZXM6ICdkYXJrOmJvcmRlci10cmFuc3BhcmVudCB0ZXh0LWdyYXktNTAwIGhvdmVyOnRleHQtZ3JheS02MDAgZGFyazp0ZXh0LWdyYXktNDAwIGJvcmRlci1ncmF5LTEwMCBob3Zlcjpib3JkZXItZ3JheS0zMDAgZGFyazpib3JkZXItZ3JheS03MDAgZGFyazpob3Zlcjp0ZXh0LWdyYXktMzAwJyxcbiAgICBvblNob3c6IGZ1bmN0aW9uICgpIHsgfSxcbn07XG52YXIgVGFicyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYWJzKGl0ZW1zLCBvcHRpb25zKSB7XG4gICAgICAgIGlmIChpdGVtcyA9PT0gdm9pZCAwKSB7IGl0ZW1zID0gW107IH1cbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0gRGVmYXVsdDsgfVxuICAgICAgICB0aGlzLl9pdGVtcyA9IGl0ZW1zO1xuICAgICAgICB0aGlzLl9hY3RpdmVUYWIgPSBvcHRpb25zID8gdGhpcy5nZXRUYWIob3B0aW9ucy5kZWZhdWx0VGFiSWQpIDogbnVsbDtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBEZWZhdWx0KSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9XG4gICAgVGFicy5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLl9pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIHNldCB0aGUgZmlyc3QgdGFiIGFzIGFjdGl2ZSBpZiBub3Qgc2V0IGJ5IGV4cGxpY2l0bHlcbiAgICAgICAgICAgIGlmICghdGhpcy5fYWN0aXZlVGFiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0QWN0aXZlVGFiKHRoaXMuX2l0ZW1zWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGZvcmNlIHNob3cgdGhlIGZpcnN0IGRlZmF1bHQgdGFiXG4gICAgICAgICAgICB0aGlzLnNob3codGhpcy5fYWN0aXZlVGFiLmlkLCB0cnVlKTtcbiAgICAgICAgICAgIC8vIHNob3cgdGFiIGNvbnRlbnQgYmFzZWQgb24gY2xpY2tcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zLm1hcChmdW5jdGlvbiAodGFiKSB7XG4gICAgICAgICAgICAgICAgdGFiLnRyaWdnZXJFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2hvdyh0YWIuaWQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFRhYnMucHJvdG90eXBlLmdldEFjdGl2ZVRhYiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVRhYjtcbiAgICB9O1xuICAgIFRhYnMucHJvdG90eXBlLl9zZXRBY3RpdmVUYWIgPSBmdW5jdGlvbiAodGFiKSB7XG4gICAgICAgIHRoaXMuX2FjdGl2ZVRhYiA9IHRhYjtcbiAgICB9O1xuICAgIFRhYnMucHJvdG90eXBlLmdldFRhYiA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMuZmlsdGVyKGZ1bmN0aW9uICh0KSB7IHJldHVybiB0LmlkID09PSBpZDsgfSlbMF07XG4gICAgfTtcbiAgICBUYWJzLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKGlkLCBmb3JjZVNob3cpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKGZvcmNlU2hvdyA9PT0gdm9pZCAwKSB7IGZvcmNlU2hvdyA9IGZhbHNlOyB9XG4gICAgICAgIHZhciB0YWIgPSB0aGlzLmdldFRhYihpZCk7XG4gICAgICAgIC8vIGRvbid0IGRvIGFueXRoaW5nIGlmIGFscmVhZHkgYWN0aXZlXG4gICAgICAgIGlmICh0YWIgPT09IHRoaXMuX2FjdGl2ZVRhYiAmJiAhZm9yY2VTaG93KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gaGlkZSBvdGhlciB0YWJzXG4gICAgICAgIHRoaXMuX2l0ZW1zLm1hcChmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgIGlmICh0ICE9PSB0YWIpIHtcbiAgICAgICAgICAgICAgICAoX2EgPSB0LnRyaWdnZXJFbC5jbGFzc0xpc3QpLnJlbW92ZS5hcHBseShfYSwgX3RoaXMuX29wdGlvbnMuYWN0aXZlQ2xhc3Nlcy5zcGxpdCgnICcpKTtcbiAgICAgICAgICAgICAgICAoX2IgPSB0LnRyaWdnZXJFbC5jbGFzc0xpc3QpLmFkZC5hcHBseShfYiwgX3RoaXMuX29wdGlvbnMuaW5hY3RpdmVDbGFzc2VzLnNwbGl0KCcgJykpO1xuICAgICAgICAgICAgICAgIHQudGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgdC50cmlnZ2VyRWwuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBzaG93IGFjdGl2ZSB0YWJcbiAgICAgICAgKF9hID0gdGFiLnRyaWdnZXJFbC5jbGFzc0xpc3QpLmFkZC5hcHBseShfYSwgdGhpcy5fb3B0aW9ucy5hY3RpdmVDbGFzc2VzLnNwbGl0KCcgJykpO1xuICAgICAgICAoX2IgPSB0YWIudHJpZ2dlckVsLmNsYXNzTGlzdCkucmVtb3ZlLmFwcGx5KF9iLCB0aGlzLl9vcHRpb25zLmluYWN0aXZlQ2xhc3Nlcy5zcGxpdCgnICcpKTtcbiAgICAgICAgdGFiLnRyaWdnZXJFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgICAgICB0YWIudGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgIHRoaXMuX3NldEFjdGl2ZVRhYih0YWIpO1xuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uU2hvdyh0aGlzLCB0YWIpO1xuICAgIH07XG4gICAgcmV0dXJuIFRhYnM7XG59KCkpO1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgd2luZG93LlRhYnMgPSBUYWJzO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGluaXRUYWJzKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYnMtdG9nZ2xlXScpLmZvckVhY2goZnVuY3Rpb24gKCR0cmlnZ2VyRWwpIHtcbiAgICAgICAgdmFyIHRhYkl0ZW1zID0gW107XG4gICAgICAgIHZhciBkZWZhdWx0VGFiSWQgPSBudWxsO1xuICAgICAgICAkdHJpZ2dlckVsXG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJ0YWJcIl0nKVxuICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKCR0cmlnZ2VyRWwpIHtcbiAgICAgICAgICAgIHZhciBpc0FjdGl2ZSA9ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJykgPT09ICd0cnVlJztcbiAgICAgICAgICAgIHZhciB0YWIgPSB7XG4gICAgICAgICAgICAgICAgaWQ6ICR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYnMtdGFyZ2V0JyksXG4gICAgICAgICAgICAgICAgdHJpZ2dlckVsOiAkdHJpZ2dlckVsLFxuICAgICAgICAgICAgICAgIHRhcmdldEVsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCR0cmlnZ2VyRWwuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYnMtdGFyZ2V0JykpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRhYkl0ZW1zLnB1c2godGFiKTtcbiAgICAgICAgICAgIGlmIChpc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUYWJJZCA9IHRhYi5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIG5ldyBUYWJzKHRhYkl0ZW1zLCB7XG4gICAgICAgICAgICBkZWZhdWx0VGFiSWQ6IGRlZmF1bHRUYWJJZCxcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnQgZGVmYXVsdCBUYWJzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW50ZXJmYWNlLmpzLm1hcCIsImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXR5cGVzLmpzLm1hcCIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tLCBwYWNrKSB7XG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcbn07XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb24gKi9cbmltcG9ydCB7IGNyZWF0ZVBvcHBlciB9IGZyb20gJ0Bwb3BwZXJqcy9jb3JlJztcbnZhciBEZWZhdWx0ID0ge1xuICAgIHBsYWNlbWVudDogJ3RvcCcsXG4gICAgdHJpZ2dlclR5cGU6ICdob3ZlcicsXG4gICAgb25TaG93OiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgb25IaWRlOiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgb25Ub2dnbGU6IGZ1bmN0aW9uICgpIHsgfSxcbn07XG52YXIgVG9vbHRpcCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUb29sdGlwKHRhcmdldEVsLCB0cmlnZ2VyRWwsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRhcmdldEVsID09PSB2b2lkIDApIHsgdGFyZ2V0RWwgPSBudWxsOyB9XG4gICAgICAgIGlmICh0cmlnZ2VyRWwgPT09IHZvaWQgMCkgeyB0cmlnZ2VyRWwgPSBudWxsOyB9XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IERlZmF1bHQ7IH1cbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwgPSB0YXJnZXRFbDtcbiAgICAgICAgdGhpcy5fdHJpZ2dlckVsID0gdHJpZ2dlckVsO1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gX19hc3NpZ24oX19hc3NpZ24oe30sIERlZmF1bHQpLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fcG9wcGVySW5zdGFuY2UgPSB0aGlzLl9jcmVhdGVQb3BwZXJJbnN0YW5jZSgpO1xuICAgICAgICB0aGlzLl92aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9XG4gICAgVG9vbHRpcC5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl90cmlnZ2VyRWwpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHVwRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgVG9vbHRpcC5wcm90b3R5cGUuX3NldHVwRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciB0cmlnZ2VyRXZlbnRzID0gdGhpcy5fZ2V0VHJpZ2dlckV2ZW50cygpO1xuICAgICAgICB0cmlnZ2VyRXZlbnRzLnNob3dFdmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIF90aGlzLl90cmlnZ2VyRWwuYWRkRXZlbnRMaXN0ZW5lcihldiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnNob3coKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdHJpZ2dlckV2ZW50cy5oaWRlRXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBfdGhpcy5fdHJpZ2dlckVsLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBUb29sdGlwLnByb3RvdHlwZS5fY3JlYXRlUG9wcGVySW5zdGFuY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVQb3BwZXIodGhpcy5fdHJpZ2dlckVsLCB0aGlzLl90YXJnZXRFbCwge1xuICAgICAgICAgICAgcGxhY2VtZW50OiB0aGlzLl9vcHRpb25zLnBsYWNlbWVudCxcbiAgICAgICAgICAgIG1vZGlmaWVyczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ29mZnNldCcsXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldDogWzAsIDhdLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFRvb2x0aXAucHJvdG90eXBlLl9nZXRUcmlnZ2VyRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuX29wdGlvbnMudHJpZ2dlclR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2hvdmVyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzaG93RXZlbnRzOiBbJ21vdXNlZW50ZXInLCAnZm9jdXMnXSxcbiAgICAgICAgICAgICAgICAgICAgaGlkZUV2ZW50czogWydtb3VzZWxlYXZlJywgJ2JsdXInXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAnY2xpY2snOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dFdmVudHM6IFsnY2xpY2snLCAnZm9jdXMnXSxcbiAgICAgICAgICAgICAgICAgICAgaGlkZUV2ZW50czogWydmb2N1c291dCcsICdibHVyJ10sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgJ25vbmUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dFdmVudHM6IFtdLFxuICAgICAgICAgICAgICAgICAgICBoaWRlRXZlbnRzOiBbXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzaG93RXZlbnRzOiBbJ21vdXNlZW50ZXInLCAnZm9jdXMnXSxcbiAgICAgICAgICAgICAgICAgICAgaGlkZUV2ZW50czogWydtb3VzZWxlYXZlJywgJ2JsdXInXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICBUb29sdGlwLnByb3RvdHlwZS5fc2V0dXBLZXlkb3duTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2tleWRvd25FdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBpZiAoZXYua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fa2V5ZG93bkV2ZW50TGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG4gICAgVG9vbHRpcC5wcm90b3R5cGUuX3JlbW92ZUtleWRvd25MaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fa2V5ZG93bkV2ZW50TGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG4gICAgVG9vbHRpcC5wcm90b3R5cGUuX3NldHVwQ2xpY2tPdXRzaWRlTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2NsaWNrT3V0c2lkZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIF90aGlzLl9oYW5kbGVDbGlja091dHNpZGUoZXYsIF90aGlzLl90YXJnZXRFbCk7XG4gICAgICAgIH07XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9jbGlja091dHNpZGVFdmVudExpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuICAgIFRvb2x0aXAucHJvdG90eXBlLl9yZW1vdmVDbGlja091dHNpZGVMaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2NsaWNrT3V0c2lkZUV2ZW50TGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG4gICAgVG9vbHRpcC5wcm90b3R5cGUuX2hhbmRsZUNsaWNrT3V0c2lkZSA9IGZ1bmN0aW9uIChldiwgdGFyZ2V0RWwpIHtcbiAgICAgICAgdmFyIGNsaWNrZWRFbCA9IGV2LnRhcmdldDtcbiAgICAgICAgaWYgKGNsaWNrZWRFbCAhPT0gdGFyZ2V0RWwgJiZcbiAgICAgICAgICAgICF0YXJnZXRFbC5jb250YWlucyhjbGlja2VkRWwpICYmXG4gICAgICAgICAgICAhdGhpcy5fdHJpZ2dlckVsLmNvbnRhaW5zKGNsaWNrZWRFbCkgJiZcbiAgICAgICAgICAgIHRoaXMuaXNWaXNpYmxlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBUb29sdGlwLnByb3RvdHlwZS5pc1Zpc2libGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xuICAgIH07XG4gICAgVG9vbHRpcC5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pc1Zpc2libGUoKSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgVG9vbHRpcC5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZSgnb3BhY2l0eS0wJywgJ2ludmlzaWJsZScpO1xuICAgICAgICB0aGlzLl90YXJnZXRFbC5jbGFzc0xpc3QuYWRkKCdvcGFjaXR5LTEwMCcsICd2aXNpYmxlJyk7XG4gICAgICAgIC8vIEVuYWJsZSB0aGUgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgIHRoaXMuX3BvcHBlckluc3RhbmNlLnNldE9wdGlvbnMoZnVuY3Rpb24gKG9wdGlvbnMpIHsgcmV0dXJuIChfX2Fzc2lnbihfX2Fzc2lnbih7fSwgb3B0aW9ucyksIHsgbW9kaWZpZXJzOiBfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoW10sIG9wdGlvbnMubW9kaWZpZXJzLCB0cnVlKSwgW1xuICAgICAgICAgICAgICAgIHsgbmFtZTogJ2V2ZW50TGlzdGVuZXJzJywgZW5hYmxlZDogdHJ1ZSB9LFxuICAgICAgICAgICAgXSwgZmFsc2UpIH0pKTsgfSk7XG4gICAgICAgIC8vIGhhbmRsZSBjbGljayBvdXRzaWRlXG4gICAgICAgIHRoaXMuX3NldHVwQ2xpY2tPdXRzaWRlTGlzdGVuZXIoKTtcbiAgICAgICAgLy8gaGFuZGxlIGVzYyBrZXlkb3duXG4gICAgICAgIHRoaXMuX3NldHVwS2V5ZG93bkxpc3RlbmVyKCk7XG4gICAgICAgIC8vIFVwZGF0ZSBpdHMgcG9zaXRpb25cbiAgICAgICAgdGhpcy5fcG9wcGVySW5zdGFuY2UudXBkYXRlKCk7XG4gICAgICAgIC8vIHNldCB2aXNpYmlsaXR5XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSB0cnVlO1xuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uU2hvdyh0aGlzKTtcbiAgICB9O1xuICAgIFRvb2x0aXAucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoJ29wYWNpdHktMTAwJywgJ3Zpc2libGUnKTtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCgnb3BhY2l0eS0wJywgJ2ludmlzaWJsZScpO1xuICAgICAgICAvLyBEaXNhYmxlIHRoZSBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgdGhpcy5fcG9wcGVySW5zdGFuY2Uuc2V0T3B0aW9ucyhmdW5jdGlvbiAob3B0aW9ucykgeyByZXR1cm4gKF9fYXNzaWduKF9fYXNzaWduKHt9LCBvcHRpb25zKSwgeyBtb2RpZmllcnM6IF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShbXSwgb3B0aW9ucy5tb2RpZmllcnMsIHRydWUpLCBbXG4gICAgICAgICAgICAgICAgeyBuYW1lOiAnZXZlbnRMaXN0ZW5lcnMnLCBlbmFibGVkOiBmYWxzZSB9LFxuICAgICAgICAgICAgXSwgZmFsc2UpIH0pKTsgfSk7XG4gICAgICAgIC8vIGhhbmRsZSBjbGljayBvdXRzaWRlXG4gICAgICAgIHRoaXMuX3JlbW92ZUNsaWNrT3V0c2lkZUxpc3RlbmVyKCk7XG4gICAgICAgIC8vIGhhbmRsZSBlc2Mga2V5ZG93blxuICAgICAgICB0aGlzLl9yZW1vdmVLZXlkb3duTGlzdGVuZXIoKTtcbiAgICAgICAgLy8gc2V0IHZpc2liaWxpdHlcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAvLyBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICB0aGlzLl9vcHRpb25zLm9uSGlkZSh0aGlzKTtcbiAgICB9O1xuICAgIHJldHVybiBUb29sdGlwO1xufSgpKTtcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHdpbmRvdy5Ub29sdGlwID0gVG9vbHRpcDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpbml0VG9vbHRpcHMoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdG9vbHRpcC10YXJnZXRdJykuZm9yRWFjaChmdW5jdGlvbiAoJHRyaWdnZXJFbCkge1xuICAgICAgICB2YXIgdG9vbHRpcElkID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdG9vbHRpcC10YXJnZXQnKTtcbiAgICAgICAgdmFyICR0b29sdGlwRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0b29sdGlwSWQpO1xuICAgICAgICBpZiAoJHRvb2x0aXBFbCkge1xuICAgICAgICAgICAgdmFyIHRyaWdnZXJUeXBlID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdG9vbHRpcC10cmlnZ2VyJyk7XG4gICAgICAgICAgICB2YXIgcGxhY2VtZW50ID0gJHRyaWdnZXJFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdG9vbHRpcC1wbGFjZW1lbnQnKTtcbiAgICAgICAgICAgIG5ldyBUb29sdGlwKCR0b29sdGlwRWwsICR0cmlnZ2VyRWwsIHtcbiAgICAgICAgICAgICAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudCA/IHBsYWNlbWVudCA6IERlZmF1bHQucGxhY2VtZW50LFxuICAgICAgICAgICAgICAgIHRyaWdnZXJUeXBlOiB0cmlnZ2VyVHlwZVxuICAgICAgICAgICAgICAgICAgICA/IHRyaWdnZXJUeXBlXG4gICAgICAgICAgICAgICAgICAgIDogRGVmYXVsdC50cmlnZ2VyVHlwZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlRoZSB0b29sdGlwIGVsZW1lbnQgd2l0aCBpZCBcXFwiXCIuY29uY2F0KHRvb2x0aXBJZCwgXCJcXFwiIGRvZXMgbm90IGV4aXN0LiBQbGVhc2UgY2hlY2sgdGhlIGRhdGEtdG9vbHRpcC10YXJnZXQgYXR0cmlidXRlLlwiKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydCBkZWZhdWx0IFRvb2x0aXA7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnRlcmZhY2UuanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwZXMuanMubWFwIiwidmFyIEV2ZW50cyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBFdmVudHMoZXZlbnRUeXBlLCBldmVudEZ1bmN0aW9ucykge1xuICAgICAgICBpZiAoZXZlbnRGdW5jdGlvbnMgPT09IHZvaWQgMCkgeyBldmVudEZ1bmN0aW9ucyA9IFtdOyB9XG4gICAgICAgIHRoaXMuX2V2ZW50VHlwZSA9IGV2ZW50VHlwZTtcbiAgICAgICAgdGhpcy5fZXZlbnRGdW5jdGlvbnMgPSBldmVudEZ1bmN0aW9ucztcbiAgICB9XG4gICAgRXZlbnRzLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl9ldmVudEZ1bmN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChldmVudEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihfdGhpcy5fZXZlbnRUeXBlLCBldmVudEZ1bmN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gRXZlbnRzO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IEV2ZW50cztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV2ZW50cy5qcy5tYXAiLCJpbXBvcnQgRXZlbnRzIGZyb20gJy4vZG9tL2V2ZW50cyc7XG5pbXBvcnQgeyBpbml0QWNjb3JkaW9ucyB9IGZyb20gJy4vY29tcG9uZW50cy9hY2NvcmRpb24nO1xuaW1wb3J0IHsgaW5pdENvbGxhcHNlcyB9IGZyb20gJy4vY29tcG9uZW50cy9jb2xsYXBzZSc7XG5pbXBvcnQgeyBpbml0Q2Fyb3VzZWxzIH0gZnJvbSAnLi9jb21wb25lbnRzL2Nhcm91c2VsJztcbmltcG9ydCB7IGluaXREaXNtaXNzZXMgfSBmcm9tICcuL2NvbXBvbmVudHMvZGlzbWlzcyc7XG5pbXBvcnQgeyBpbml0RHJvcGRvd25zIH0gZnJvbSAnLi9jb21wb25lbnRzL2Ryb3Bkb3duJztcbmltcG9ydCB7IGluaXRNb2RhbHMgfSBmcm9tICcuL2NvbXBvbmVudHMvbW9kYWwnO1xuaW1wb3J0IHsgaW5pdERyYXdlcnMgfSBmcm9tICcuL2NvbXBvbmVudHMvZHJhd2VyJztcbmltcG9ydCB7IGluaXRUYWJzIH0gZnJvbSAnLi9jb21wb25lbnRzL3RhYnMnO1xuaW1wb3J0IHsgaW5pdFRvb2x0aXBzIH0gZnJvbSAnLi9jb21wb25lbnRzL3Rvb2x0aXAnO1xuaW1wb3J0IHsgaW5pdFBvcG92ZXJzIH0gZnJvbSAnLi9jb21wb25lbnRzL3BvcG92ZXInO1xuaW1wb3J0IHsgaW5pdERpYWxzIH0gZnJvbSAnLi9jb21wb25lbnRzL2RpYWwnO1xuLy8gc2V0dXAgZXZlbnRzIGZvciBkYXRhIGF0dHJpYnV0ZXNcbnZhciBldmVudHMgPSBuZXcgRXZlbnRzKCdsb2FkJywgW1xuICAgIGluaXRBY2NvcmRpb25zLFxuICAgIGluaXRDb2xsYXBzZXMsXG4gICAgaW5pdENhcm91c2VscyxcbiAgICBpbml0RGlzbWlzc2VzLFxuICAgIGluaXREcm9wZG93bnMsXG4gICAgaW5pdE1vZGFscyxcbiAgICBpbml0RHJhd2VycyxcbiAgICBpbml0VGFicyxcbiAgICBpbml0VG9vbHRpcHMsXG4gICAgaW5pdFBvcG92ZXJzLFxuICAgIGluaXREaWFscyxcbl0pO1xuZXZlbnRzLmluaXQoKTtcbi8vIGV4cG9ydCBhbGwgY29tcG9uZW50c1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBBY2NvcmRpb24gfSBmcm9tICcuL2NvbXBvbmVudHMvYWNjb3JkaW9uJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQ2Fyb3VzZWwgfSBmcm9tICcuL2NvbXBvbmVudHMvY2Fyb3VzZWwnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBDb2xsYXBzZSB9IGZyb20gJy4vY29tcG9uZW50cy9jb2xsYXBzZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIERpYWwgfSBmcm9tICcuL2NvbXBvbmVudHMvZGlhbCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIERpc21pc3MgfSBmcm9tICcuL2NvbXBvbmVudHMvZGlzbWlzcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIERyYXdlciB9IGZyb20gJy4vY29tcG9uZW50cy9kcmF3ZXInO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBEcm9wZG93biB9IGZyb20gJy4vY29tcG9uZW50cy9kcm9wZG93bic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE1vZGFsIH0gZnJvbSAnLi9jb21wb25lbnRzL21vZGFsJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUG9wb3ZlciB9IGZyb20gJy4vY29tcG9uZW50cy9wb3BvdmVyJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVGFicyB9IGZyb20gJy4vY29tcG9uZW50cy90YWJzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVG9vbHRpcCB9IGZyb20gJy4vY29tcG9uZW50cy90b29sdGlwJztcbi8vIGV4cG9ydCBhbGwgdHlwZXNcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9hY2NvcmRpb24vdHlwZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2Nhcm91c2VsL3R5cGVzJztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9jb2xsYXBzZS90eXBlcyc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvZGlhbC90eXBlcyc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvZGlzbWlzcy90eXBlcyc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvZHJhd2VyL3R5cGVzJztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9kcm9wZG93bi90eXBlcyc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvbW9kYWwvdHlwZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL3BvcG92ZXIvdHlwZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL3RhYnMvdHlwZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL3Rvb2x0aXAvdHlwZXMnO1xuLy8gZXhwb3J0IGFsbCBpbnRlcmZhY2VzXG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvYWNjb3JkaW9uL2ludGVyZmFjZSc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvY2Fyb3VzZWwvaW50ZXJmYWNlJztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9jb2xsYXBzZS9pbnRlcmZhY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2RpYWwvaW50ZXJmYWNlJztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9kaXNtaXNzL2ludGVyZmFjZSc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvZHJhd2VyL2ludGVyZmFjZSc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvZHJvcGRvd24vaW50ZXJmYWNlJztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9tb2RhbC9pbnRlcmZhY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL3BvcG92ZXIvaW50ZXJmYWNlJztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy90YWJzL2ludGVyZmFjZSc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvdG9vbHRpcC9pbnRlcmZhY2UnO1xuLy8gZXhwb3J0IGluaXQgZnVuY3Rpb25zXG5leHBvcnQgeyBpbml0QWNjb3JkaW9ucyB9IGZyb20gJy4vY29tcG9uZW50cy9hY2NvcmRpb24nO1xuZXhwb3J0IHsgaW5pdENhcm91c2VscyB9IGZyb20gJy4vY29tcG9uZW50cy9jYXJvdXNlbCc7XG5leHBvcnQgeyBpbml0Q29sbGFwc2VzIH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbGxhcHNlJztcbmV4cG9ydCB7IGluaXREaWFscyB9IGZyb20gJy4vY29tcG9uZW50cy9kaWFsJztcbmV4cG9ydCB7IGluaXREaXNtaXNzZXMgfSBmcm9tICcuL2NvbXBvbmVudHMvZGlzbWlzcyc7XG5leHBvcnQgeyBpbml0RHJhd2VycyB9IGZyb20gJy4vY29tcG9uZW50cy9kcmF3ZXInO1xuZXhwb3J0IHsgaW5pdERyb3Bkb3ducyB9IGZyb20gJy4vY29tcG9uZW50cy9kcm9wZG93bic7XG5leHBvcnQgeyBpbml0TW9kYWxzIH0gZnJvbSAnLi9jb21wb25lbnRzL21vZGFsJztcbmV4cG9ydCB7IGluaXRQb3BvdmVycyB9IGZyb20gJy4vY29tcG9uZW50cy9wb3BvdmVyJztcbmV4cG9ydCB7IGluaXRUYWJzIH0gZnJvbSAnLi9jb21wb25lbnRzL3RhYnMnO1xuZXhwb3J0IHsgaW5pdFRvb2x0aXBzIH0gZnJvbSAnLi9jb21wb25lbnRzL3Rvb2x0aXAnO1xuLy8gZXhwb3J0IGFsbCBpbml0IGZ1bmN0aW9uc1xuZXhwb3J0IHsgaW5pdEZsb3diaXRlIH0gZnJvbSAnLi9jb21wb25lbnRzL2luZGV4Jztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImltcG9ydCB7TW9kYWx9IGZyb20gJ2Zsb3diaXRlJztcbmltcG9ydCB0eXBlIHtNb2RhbE9wdGlvbnMsIE1vZGFsSW50ZXJmYWNlfSBmcm9tICdmbG93Yml0ZSc7XG5cbmludGVyZmFjZSBJUHJvZHVjdCB7XG4gIGlkOiBudW1iZXI7XG4gIG5hbWU6IHN0cmluZztcbiAgcHJvZHVjdF90eXBlOiBzdHJpbmc7XG4gIHN1cHBsaWVyX2lkOiBudW1iZXI7XG4gIGN1cnJlbmN5OiBzdHJpbmc7XG4gIHByaWNlOiBudW1iZXI7XG4gIGltYWdlOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIC8vIEdlbmVyYWwgSW5mbyAtPlxuICBTS1U6IHN0cmluZztcbiAgbG93X3N0b2NrX2xldmVsOiBudW1iZXI7XG4gIHByb2dyYW1feWVhcjogbnVtYmVyO1xuICBwYWNrYWdlX3F0eTogbnVtYmVyO1xuICBudW1iX29mX2l0ZW1zX3Blcl9jYXNlOiBudW1iZXI7XG4gIG51bWJfb2ZfY2FzZXNfcGVyX291dGVyX2Nhc2U6IG51bWJlcjtcbiAgY29tbWVudHM6IHN0cmluZztcbiAgLy8gc2hpcHBpbmdcbiAgd2VpZ2h0OiBudW1iZXI7XG4gIGxlbmd0aDogbnVtYmVyO1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgbXN0cl9ncm91cHNfZ3JvdXBzOiBvYmplY3Q7XG4gIGN1cnJlbnRfdXNlcl9ncm91cHM6IG9iamVjdDtcbiAgZ3JvdXBzX2lkczoge1xuICAgIFtpbmRleDogc3RyaW5nXTogbnVtYmVyO1xuICB9O1xuICBhdmFpbGFibGVfcXVhbnRpdHk6IHtcbiAgICBbaW5kZXg6IHN0cmluZ106IG51bWJlcjtcbiAgfTtcbiAgdG90YWxfYXZhaWxhYmxlX2l0ZW1zOiB7XG4gICAgW2luZGV4OiBzdHJpbmddOiBudW1iZXI7XG4gIH07XG4gIGFsbF93YXJlaG91c2VzOiBbXG4gICAge1xuICAgICAgW2luZGV4OiBzdHJpbmddOiBudW1iZXIgfCBzdHJpbmc7XG4gICAgfSxcbiAgXTtcbn1cbmludGVyZmFjZSBGaWx0ZXJKc29uRGF0YSB7XG4gIFtrZXk6IHN0cmluZ106IHN0cmluZztcbn1cblxuLy8gdmFyaWFibGUgdG8gc2V0IGRlZmF1bHQgaW1hZ2UgdG8gYnJhbmQgZHluYW1pY2FsbHkgaW4gbW9kYWwgd2luZG93LiBDYW4gd2UgZ2V0IGxpbmsgZnJvbSB0aGUgaW50ZXJuZXQ/XG5jb25zdCBkZWZhdWx0QnJhbmRJbWFnZSA9XG4gICdodHRwczovL2Z1bmtvLmNvbS9vbi9kZW1hbmR3YXJlLnN0YXRpYy8tL1NpdGVzLWZ1bmtvLW1hc3Rlci1jYXRhbG9nL2RlZmF1bHQvZHdiYjM4YTExMS9pbWFnZXMvZnVua28vdXBsb2FkLzU1OTk4X0NvY2FDb2xhX1MyX1Nwcml0ZUJvdHRsZUNhcF9QT1BfR0xBTS1XRUIucG5nJztcblxuLy8gY2hlY2sgaWYgcHJvZHVjdCBoYXMgZmlsdGVyIGFuZCBkaXNwbGF5IGl0XG5sZXQgZmlsdGVySnNvbkRhdGE6IEZpbHRlckpzb25EYXRhID0ge307XG5jb25zdCBmaWx0ZXJKc29uT2JqZWN0ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnZmlsdGVySnNvbkRhdGEnKTtcbmNvbnN0IGZpbHRlckRhdGEgPSBKU09OLnBhcnNlKGZpbHRlckpzb25PYmplY3QpO1xuaWYgKGZpbHRlckRhdGEgIT09IG51bGwgfHwgZmlsdGVyRGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gIGNvbnN0IGlzVmlzaWJsZUZpbHRlckpzb24gPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdpc1Zpc2libGVGaWx0ZXInKTtcbiAgbGV0IGlzVmlzaWJsZUZpbHRlciA9IEpTT04ucGFyc2UoaXNWaXNpYmxlRmlsdGVySnNvbik7XG4gIGlmIChpc1Zpc2libGVGaWx0ZXIpIHtcbiAgICBjb25zdCByZWZlcmVuY2VUaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnI3Byb2R1Y3QtdGFibGUtdGgtcHJvZHVjdC10eXBlJyxcbiAgICApO1xuICAgIGNvbnN0IHByb2R1Y3RJdGVtVHJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlLXByb2R1Y3QtaXRlbS10cicpO1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gZmlsdGVyRGF0YSkge1xuICAgICAgY29uc3QgcHJvZHVjdEZpbHRlclRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKTtcbiAgICAgIHByb2R1Y3RGaWx0ZXJUaC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICdpZCcsXG4gICAgICAgIGBwcm9kdWN0LXRhYmxlLWZpbHRlci1tYXN0ZXItZ3JvdXAtJHtrZXkucmVwbGFjZSgvIC9nLCAnXycpfWAsXG4gICAgICApO1xuICAgICAgcHJvZHVjdEZpbHRlclRoLmNsYXNzTGlzdC5hZGQoJ3B4LTYnLCAncHktMycpO1xuICAgICAgcHJvZHVjdEZpbHRlclRoLnNldEF0dHJpYnV0ZSgnc2NvcGUnLCAnY29sJyk7XG4gICAgICBwcm9kdWN0RmlsdGVyVGguaW5uZXJIVE1MID0ga2V5O1xuICAgICAgcmVmZXJlbmNlVGgucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoXG4gICAgICAgIHByb2R1Y3RGaWx0ZXJUaCxcbiAgICAgICAgcmVmZXJlbmNlVGgubmV4dFNpYmxpbmcsXG4gICAgICApO1xuICAgIH1cblxuICAgIHByb2R1Y3RJdGVtVHJzLmZvckVhY2goKHByb2R1Y3Q6IEhUTUxUYWJsZVJvd0VsZW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHJlZmVyZW5jZVRkID0gcHJvZHVjdC5jZWxsc1szXTtcbiAgICAgIGNvbnN0IHByb2R1Y3ROYW1lID0gcHJvZHVjdC5jZWxsc1syXS5pbm5lclRleHQ7XG5cbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGZpbHRlckRhdGEpIHtcbiAgICAgICAgY29uc3QgcHJvZHVjdEZpbHRlck5hbWUgPSBmaWx0ZXJEYXRhW2tleV07XG4gICAgICAgIGNvbnN0IHByb2R1Y3RGaWx0ZXJUZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgIHByb2R1Y3RGaWx0ZXJUZC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgJ2lkJyxcbiAgICAgICAgICBgcHJvZHVjdC10YWJsZS1maWx0ZXItJHtrZXl9LSR7cHJvZHVjdEZpbHRlck5hbWUucmVwbGFjZShcbiAgICAgICAgICAgIC8gL2csXG4gICAgICAgICAgICAnXycsXG4gICAgICAgICAgKX0tJHtwcm9kdWN0TmFtZS5yZXBsYWNlKC8gL2csICdfJyl9YCxcbiAgICAgICAgKTtcbiAgICAgICAgcHJvZHVjdEZpbHRlclRkLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgJ3AtNCcsXG4gICAgICAgICAgJ3RleHQtYmFzZScsXG4gICAgICAgICAgJ2ZvbnQtbm9ybWFsJyxcbiAgICAgICAgICAndGV4dC1ncmF5LTkwMCcsXG4gICAgICAgICAgJ3doaXRlc3BhY2Utbm93cmFwJyxcbiAgICAgICAgICAnZGFyazp0ZXh0LXdoaXRlJyxcbiAgICAgICAgKTtcbiAgICAgICAgcHJvZHVjdEZpbHRlclRkLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInBsLTNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1iYXNlIGZvbnQtc2VtaWJvbGRcIj4ke3Byb2R1Y3RGaWx0ZXJOYW1lfTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIGA7XG4gICAgICAgIHJlZmVyZW5jZVRkLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKFxuICAgICAgICAgIHByb2R1Y3RGaWx0ZXJUZCxcbiAgICAgICAgICByZWZlcmVuY2VUZC5uZXh0U2libGluZyxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpc1Zpc2libGVGaWx0ZXIgPSBmYWxzZTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdpc1Zpc2libGVGaWx0ZXInLCBKU09OLnN0cmluZ2lmeShpc1Zpc2libGVGaWx0ZXIpKTtcbiAgfVxufVxuXG4vL2Z1bmN0aW9uIHRvIGRpc3BsYXkgZmlsdGVyIGJ5IG1hc3RlciBncm91cCBvbiBsb2FkIHBhZ2VcbmNvbnN0IGdsb2JhbEZpbHRlck1hc3Rlckdyb3VwID0gSlNPTi5wYXJzZShcbiAgc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnZ2xvYmFsRmlsdGVyTWFzdGVyR3JvdXAnKSxcbik7XG5jb25zdCBwcm9kdWN0TWdHR2xvYmFsID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0TWdHJykpO1xuXG5pZiAoZ2xvYmFsRmlsdGVyTWFzdGVyR3JvdXAgJiYgZ2xvYmFsRmlsdGVyTWFzdGVyR3JvdXAubGVuZ3RoICE9PSAwKSB7XG4gIGNvbnN0IGZpbHRlclByb2R1Y3RNYXN0ZXJHcm91cENoZWNrYm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICcucHJvZHVjdHMtZmlsdGVyLXByb2R1Y3QtbWFzdGVyLWdyb3VwLWNoZWNrYm94JyxcbiAgKTtcbiAgZmlsdGVyUHJvZHVjdE1hc3Rlckdyb3VwQ2hlY2tib3hlcy5mb3JFYWNoKChjaGVja2JveDogSFRNTElucHV0RWxlbWVudCkgPT4ge1xuICAgIGlmIChnbG9iYWxGaWx0ZXJNYXN0ZXJHcm91cC5pbmNsdWRlcyhjaGVja2JveC52YWx1ZSkpIHtcbiAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG4gIGZvciAoY29uc3QgbWFzdGVyR3JvdXBOYW1lIG9mIGdsb2JhbEZpbHRlck1hc3Rlckdyb3VwKSB7XG4gICAgY29uc3QgcmVmZXJlbmNlVGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgJyNwcm9kdWN0LXRhYmxlLXRoLXByb2R1Y3QtdHlwZScsXG4gICAgKTtcbiAgICBjb25zdCBpc0dyb3VwRXhpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYCNwcm9kdWN0LXRhYmxlLWZpbHRlci1tYXN0ZXItZ3JvdXAtJHttYXN0ZXJHcm91cE5hbWV9YCxcbiAgICApO1xuICAgIGlmICghaXNHcm91cEV4aXN0KSB7XG4gICAgICBjb25zdCBwcm9kdWN0RmlsdGVyVGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpO1xuICAgICAgcHJvZHVjdEZpbHRlclRoLnNldEF0dHJpYnV0ZShcbiAgICAgICAgJ2lkJyxcbiAgICAgICAgYHByb2R1Y3QtdGFibGUtZmlsdGVyLW1hc3Rlci1ncm91cC0ke21hc3Rlckdyb3VwTmFtZX1gLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHByb2R1Y3RJdGVtVHJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgJy50YWJsZS1wcm9kdWN0LWl0ZW0tdHInLFxuICAgICAgKTtcbiAgICAgIHByb2R1Y3RGaWx0ZXJUaC5jbGFzc0xpc3QuYWRkKCdweC02JywgJ3B5LTMnKTtcbiAgICAgIHByb2R1Y3RGaWx0ZXJUaC5zZXRBdHRyaWJ1dGUoJ3Njb3BlJywgJ2NvbCcpO1xuICAgICAgcHJvZHVjdEZpbHRlclRoLmlubmVySFRNTCA9IG1hc3Rlckdyb3VwTmFtZS5yZXBsYWNlKC9fL2csICcgJyk7XG4gICAgICByZWZlcmVuY2VUaC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShcbiAgICAgICAgcHJvZHVjdEZpbHRlclRoLFxuICAgICAgICByZWZlcmVuY2VUaC5uZXh0U2libGluZyxcbiAgICAgICk7XG5cbiAgICAgIHByb2R1Y3RJdGVtVHJzLmZvckVhY2goKHByb2R1Y3RJdGVtOiBIVE1MVGFibGVSb3dFbGVtZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHJlZmVyZW5jZVRkID0gcHJvZHVjdEl0ZW0uY2VsbHNbM107XG4gICAgICAgIGNvbnN0IHByb2R1Y3ROYW1lID0gcHJvZHVjdEl0ZW0uY2VsbHNbMl0uaW5uZXJUZXh0O1xuICAgICAgICBjb25zdCBwcm9kdWN0RmlsdGVyTmFtZSA9XG4gICAgICAgICAgcHJvZHVjdE1nR0dsb2JhbFtwcm9kdWN0TmFtZV1bbWFzdGVyR3JvdXBOYW1lXSB8fCAnLSc7XG4gICAgICAgIGNvbnN0IHByb2R1Y3RGaWx0ZXJUZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgIHByb2R1Y3RGaWx0ZXJUZC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgJ2lkJyxcbiAgICAgICAgICBgcHJvZHVjdC10YWJsZS1maWx0ZXItJHttYXN0ZXJHcm91cE5hbWV9LSR7cHJvZHVjdEZpbHRlck5hbWUucmVwbGFjZShcbiAgICAgICAgICAgIC8gL2csXG4gICAgICAgICAgICAnXycsXG4gICAgICAgICAgKX0tJHtwcm9kdWN0TmFtZS5yZXBsYWNlKC8gL2csICdfJyl9YCxcbiAgICAgICAgKTtcbiAgICAgICAgcHJvZHVjdEZpbHRlclRkLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgJ3AtNCcsXG4gICAgICAgICAgJ3RleHQtYmFzZScsXG4gICAgICAgICAgJ2ZvbnQtbm9ybWFsJyxcbiAgICAgICAgICAndGV4dC1ncmF5LTkwMCcsXG4gICAgICAgICAgJ3doaXRlc3BhY2Utbm93cmFwJyxcbiAgICAgICAgICAnZGFyazp0ZXh0LXdoaXRlJyxcbiAgICAgICAgKTtcbiAgICAgICAgcHJvZHVjdEZpbHRlclRkLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwbC0zXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWJhc2UgZm9udC1zZW1pYm9sZFwiPiR7cHJvZHVjdEZpbHRlck5hbWV9PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICBgO1xuICAgICAgICByZWZlcmVuY2VUZC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShcbiAgICAgICAgICBwcm9kdWN0RmlsdGVyVGQsXG4gICAgICAgICAgcmVmZXJlbmNlVGQubmV4dFNpYmxpbmcsXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuLy8gZnVuY3Rpb24gdG8gZGlzcGxheSBwcm9kdWN0IG1hc3RlciBncm91cCBpbiBwcm9kdWN0IHRhYmxlXG5jb25zdCBjaGVja2JveEZpbHRlclByb2R1Y3RNYXN0ZXJHcm91cHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAnLnByb2R1Y3RzLWZpbHRlci1wcm9kdWN0LW1hc3Rlci1ncm91cC1jaGVja2JveCcsXG4pO1xuY2hlY2tib3hGaWx0ZXJQcm9kdWN0TWFzdGVyR3JvdXBzLmZvckVhY2goY2hlY2tib3ggPT4ge1xuICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICBjb25zdCBtYXN0ZXJHcm91cE5hbWUgPSBjaGVja2JveC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0LWdyb3VwLW5hbWUnKTtcbiAgICBjb25zdCBwcm9kdWN0TWdHID0gSlNPTi5wYXJzZShcbiAgICAgIGNoZWNrYm94LmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtcHJvZHVjdC1tZy1nJyksXG4gICAgKTtcbiAgICBjb25zdCByZWZlcmVuY2VUaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnI3Byb2R1Y3QtdGFibGUtdGgtcHJvZHVjdC10eXBlJyxcbiAgICApO1xuICAgIGNvbnN0IHByb2R1Y3RJdGVtVHJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlLXByb2R1Y3QtaXRlbS10cicpO1xuXG4gICAgbGV0IGlzQWN0aXZlID0gKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWQ7XG4gICAgY29uc3QgZ2xvYmFsRmlsdGVyTWFzdGVyR3JvdXAgPSBKU09OLnBhcnNlKFxuICAgICAgc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnZ2xvYmFsRmlsdGVyTWFzdGVyR3JvdXAnKSxcbiAgICApO1xuXG4gICAgaWYgKGlzQWN0aXZlKSB7XG4gICAgICBjb25zdCBmaWx0ZXJNYXN0ZXJHcm91cDogc3RyaW5nW10gPSBbXTtcbiAgICAgIGZpbHRlck1hc3Rlckdyb3VwLnB1c2gobWFzdGVyR3JvdXBOYW1lKTtcbiAgICAgIGlmIChnbG9iYWxGaWx0ZXJNYXN0ZXJHcm91cCkge1xuICAgICAgICBnbG9iYWxGaWx0ZXJNYXN0ZXJHcm91cC5mb3JFYWNoKChlbGVtZW50OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBpZiAoIWZpbHRlck1hc3Rlckdyb3VwLmluY2x1ZGVzKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICBmaWx0ZXJNYXN0ZXJHcm91cC5wdXNoKGVsZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICAnZ2xvYmFsRmlsdGVyTWFzdGVyR3JvdXAnLFxuICAgICAgICBKU09OLnN0cmluZ2lmeShmaWx0ZXJNYXN0ZXJHcm91cCksXG4gICAgICApO1xuICAgICAgY29uc3QgaXNHcm91cEV4aXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYCNwcm9kdWN0LXRhYmxlLWZpbHRlci1tYXN0ZXItZ3JvdXAtJHttYXN0ZXJHcm91cE5hbWV9YCxcbiAgICAgICk7XG4gICAgICBpZiAoIWlzR3JvdXBFeGlzdCkge1xuICAgICAgICBjb25zdCBwcm9kdWN0RmlsdGVyVGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpO1xuICAgICAgICBwcm9kdWN0RmlsdGVyVGguc2V0QXR0cmlidXRlKFxuICAgICAgICAgICdpZCcsXG4gICAgICAgICAgYHByb2R1Y3QtdGFibGUtZmlsdGVyLW1hc3Rlci1ncm91cC0ke21hc3Rlckdyb3VwTmFtZX1gLFxuICAgICAgICApO1xuICAgICAgICBwcm9kdWN0RmlsdGVyVGguY2xhc3NMaXN0LmFkZCgncHgtNicsICdweS0zJyk7XG4gICAgICAgIHByb2R1Y3RGaWx0ZXJUaC5zZXRBdHRyaWJ1dGUoJ3Njb3BlJywgJ2NvbCcpO1xuICAgICAgICBwcm9kdWN0RmlsdGVyVGguaW5uZXJIVE1MID0gbWFzdGVyR3JvdXBOYW1lLnJlcGxhY2UoL18vZywgJyAnKTtcbiAgICAgICAgcmVmZXJlbmNlVGgucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoXG4gICAgICAgICAgcHJvZHVjdEZpbHRlclRoLFxuICAgICAgICAgIHJlZmVyZW5jZVRoLm5leHRTaWJsaW5nLFxuICAgICAgICApO1xuICAgICAgICBwcm9kdWN0SXRlbVRycy5mb3JFYWNoKChwcm9kdWN0SXRlbTogSFRNTFRhYmxlUm93RWxlbWVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlZmVyZW5jZVRkID0gcHJvZHVjdEl0ZW0uY2VsbHNbM107XG4gICAgICAgICAgY29uc3QgcHJvZHVjdE5hbWUgPSBwcm9kdWN0SXRlbS5jZWxsc1syXS5pbm5lclRleHQ7XG4gICAgICAgICAgY29uc3QgcHJvZHVjdEZpbHRlck5hbWUgPVxuICAgICAgICAgICAgcHJvZHVjdE1nR1twcm9kdWN0TmFtZV1bbWFzdGVyR3JvdXBOYW1lXSB8fCAnLSc7XG4gICAgICAgICAgY29uc3QgcHJvZHVjdEZpbHRlclRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgICBwcm9kdWN0RmlsdGVyVGQuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgJ2lkJyxcbiAgICAgICAgICAgIGBwcm9kdWN0LXRhYmxlLWZpbHRlci0ke21hc3Rlckdyb3VwTmFtZX0tJHtwcm9kdWN0RmlsdGVyTmFtZS5yZXBsYWNlKFxuICAgICAgICAgICAgICAvIC9nLFxuICAgICAgICAgICAgICAnXycsXG4gICAgICAgICAgICApfS0ke3Byb2R1Y3ROYW1lLnJlcGxhY2UoLyAvZywgJ18nKX1gLFxuICAgICAgICAgICk7XG4gICAgICAgICAgcHJvZHVjdEZpbHRlclRkLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgICAncC00JyxcbiAgICAgICAgICAgICd0ZXh0LWJhc2UnLFxuICAgICAgICAgICAgJ2ZvbnQtbm9ybWFsJyxcbiAgICAgICAgICAgICd0ZXh0LWdyYXktOTAwJyxcbiAgICAgICAgICAgICd3aGl0ZXNwYWNlLW5vd3JhcCcsXG4gICAgICAgICAgICAnZGFyazp0ZXh0LXdoaXRlJyxcbiAgICAgICAgICApO1xuICAgICAgICAgIHByb2R1Y3RGaWx0ZXJUZC5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGwtM1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1iYXNlIGZvbnQtc2VtaWJvbGRcIj4ke3Byb2R1Y3RGaWx0ZXJOYW1lfTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgYDtcbiAgICAgICAgICByZWZlcmVuY2VUZC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShcbiAgICAgICAgICAgIHByb2R1Y3RGaWx0ZXJUZCxcbiAgICAgICAgICAgIHJlZmVyZW5jZVRkLm5leHRTaWJsaW5nLFxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWlzQWN0aXZlKSB7XG4gICAgICBjb25zdCBpbmRleCA9IGdsb2JhbEZpbHRlck1hc3Rlckdyb3VwLmluZGV4T2YobWFzdGVyR3JvdXBOYW1lKTtcbiAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgZ2xvYmFsRmlsdGVyTWFzdGVyR3JvdXAuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgICdnbG9iYWxGaWx0ZXJNYXN0ZXJHcm91cCcsXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KGdsb2JhbEZpbHRlck1hc3Rlckdyb3VwKSxcbiAgICAgICk7XG4gICAgICBjb25zdCBpc01hc3Rlckdyb3VwRXhpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgI3Byb2R1Y3QtdGFibGUtZmlsdGVyLW1hc3Rlci1ncm91cC0ke21hc3Rlckdyb3VwTmFtZX1gLFxuICAgICAgKTtcbiAgICAgIGlmIChpc01hc3Rlckdyb3VwRXhpc3QpIHtcbiAgICAgICAgaXNNYXN0ZXJHcm91cEV4aXN0LnJlbW92ZSgpO1xuICAgICAgICBwcm9kdWN0SXRlbVRycy5mb3JFYWNoKChwcm9kdWN0SXRlbTogSFRNTFRhYmxlUm93RWxlbWVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHByb2R1Y3ROYW1lID0gcHJvZHVjdEl0ZW0uY2VsbHNbMl0uaW5uZXJUZXh0O1xuICAgICAgICAgIGNvbnN0IHByb2R1Y3RGaWx0ZXJOYW1lID1cbiAgICAgICAgICAgIHByb2R1Y3RNZ0dbcHJvZHVjdE5hbWVdW21hc3Rlckdyb3VwTmFtZV0gfHwgJy0nO1xuICAgICAgICAgIGNvbnN0IGlzUHJvZHVjdEZpbHRlckV4aXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIGAjcHJvZHVjdC10YWJsZS1maWx0ZXItJHttYXN0ZXJHcm91cE5hbWV9LSR7cHJvZHVjdEZpbHRlck5hbWUucmVwbGFjZShcbiAgICAgICAgICAgICAgLyAvZyxcbiAgICAgICAgICAgICAgJ18nLFxuICAgICAgICAgICAgKX0tJHtwcm9kdWN0TmFtZS5yZXBsYWNlKC8gL2csICdfJyl9YCxcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChpc1Byb2R1Y3RGaWx0ZXJFeGlzdCkge1xuICAgICAgICAgICAgaXNQcm9kdWN0RmlsdGVyRXhpc3QucmVtb3ZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufSk7XG5cbmNvbnN0ICRyZXF1ZXN0U2hhcmVNb2RhbEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgJyNyZXF1ZXN0LXNoYXJlLXByb2R1Y3QtbW9kYWwnLFxuKTtcbmNvbnN0ICRzaGlwTW9kYWxFbGVtZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICcjc2hpcC1wcm9kdWN0LW1vZGFsJyxcbik7XG5jb25zdCAkYXNzaWduTW9kYWxFbGVtZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICcjYXNzaWduLXByb2R1Y3QtbW9kYWwnLFxuKTtcbmNvbnN0ICRhZGRQcm9kdWN0TW9kYWxFbGVtZW50OiBIVE1MRWxlbWVudCA9XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtcHJvZHVjdC1tb2RhbCcpO1xuY29uc3QgJHZpZXdQcm9kdWN0TW9kYWxFbGVtZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICcjdmlldy1wcm9kdWN0LW1vZGFsJyxcbik7XG5jb25zdCAkYWRqdXN0UHJvZHVjdE1vZGFsRWxlbWVudDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAnI2FkanVzdC1wcm9kdWN0LW1vZGFsJyxcbik7XG5jb25zdCAkZWRpdFByb2R1Y3RNb2RhbEVsZW1lbnQ6IEhUTUxFbGVtZW50ID1cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXRQcm9kdWN0TW9kYWwnKTtcblxuY29uc3QgbW9kYWxPcHRpb25zOiBNb2RhbE9wdGlvbnMgPSB7XG4gIHBsYWNlbWVudDogJ2JvdHRvbS1yaWdodCcsXG4gIGJhY2tkcm9wOiAnZHluYW1pYycsXG4gIGJhY2tkcm9wQ2xhc3NlczpcbiAgICAnYmctZ3JheS05MDAgYmctb3BhY2l0eS01MCBkYXJrOmJnLW9wYWNpdHktODAgZml4ZWQgaW5zZXQtMCB6LTQwJyxcbiAgY2xvc2FibGU6IHRydWUsXG4gIG9uSGlkZTogKCkgPT4ge1xuICAgIGNvbnN0IHByb2R1Y3QgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLnByb2R1Y3QpO1xuICAgIGNvbnN0IG1zdHJHcm91cHNFbnRyaWVzID0gT2JqZWN0LmVudHJpZXMocHJvZHVjdC5tc3RyX2dyb3Vwc19ncm91cHMpO1xuXG4gICAgbXN0ckdyb3Vwc0VudHJpZXMuZm9yRWFjaCgoW2tleSwgdmFsdWVdOiBbc3RyaW5nLCBzdHJpbmddKSA9PiB7XG4gICAgICBkZWxldGVTaGlwQXNzaWduQnV0dG9uKGtleS5yZXBsYWNlKC9cXHMvZywgJ18nKSwgdmFsdWUpO1xuICAgIH0pO1xuICB9LFxuICBvblNob3c6ICgpID0+IHt9LFxuICBvblRvZ2dsZTogKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdtb2RhbCBoYXMgYmVlbiB0b2dnbGVkJyk7XG4gIH0sXG59O1xuXG5jb25zdCBhZGp1c3RNb2RhbE9wdGlvbnM6IE1vZGFsT3B0aW9ucyA9IHtcbiAgcGxhY2VtZW50OiAnYm90dG9tLXJpZ2h0JyxcbiAgYmFja2Ryb3A6ICdkeW5hbWljJyxcbiAgYmFja2Ryb3BDbGFzc2VzOlxuICAgICdiZy1ncmF5LTkwMCBiZy1vcGFjaXR5LTUwIGRhcms6Ymctb3BhY2l0eS04MCBmaXhlZCBpbnNldC0wIHotNDAnLFxuICBjbG9zYWJsZTogdHJ1ZSxcbiAgb25IaWRlOiAoKSA9PiB7XG4gICAgY29uc3QgcHJvZHVjdCA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UucHJvZHVjdCk7XG4gICAgY29uc3QgbXN0ckdyb3Vwc0VudHJpZXMgPSBPYmplY3QuZW50cmllcyhwcm9kdWN0Lm1zdHJfZ3JvdXBzX2dyb3Vwcyk7XG5cbiAgICBtc3RyR3JvdXBzRW50cmllcy5mb3JFYWNoKChba2V5LCB2YWx1ZV06IFtzdHJpbmcsIHN0cmluZ10pID0+IHtcbiAgICAgIGRlbGV0ZUFkanVzdENvbnRhaW5lcihrZXkucmVwbGFjZSgvXFxzL2csICdfJyksIHZhbHVlKTtcbiAgICB9KTtcbiAgfSxcbiAgb25TaG93OiAoKSA9PiB7fSxcbiAgb25Ub2dnbGU6ICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnbW9kYWwgaGFzIGJlZW4gdG9nZ2xlZCcpO1xuICB9LFxufTtcblxuY29uc3QgbW9kYWxTaGlwQXNzaWduT3B0aW9uczogTW9kYWxPcHRpb25zID0ge1xuICBwbGFjZW1lbnQ6ICdib3R0b20tcmlnaHQnLFxuICBiYWNrZHJvcDogJ2R5bmFtaWMnLFxuICBiYWNrZHJvcENsYXNzZXM6XG4gICAgJ2JnLWdyYXktOTAwIGJnLW9wYWNpdHktNTAgZGFyazpiZy1vcGFjaXR5LTgwIGZpeGVkIGluc2V0LTAgei00MCcsXG4gIGNsb3NhYmxlOiB0cnVlLFxuICBvbkhpZGU6ICgpID0+IHtcbiAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKCdwcm9kdWN0Jyk7XG4gIH0sXG4gIG9uU2hvdzogKCkgPT4ge30sXG4gIG9uVG9nZ2xlOiAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ21vZGFsIGhhcyBiZWVuIHRvZ2dsZWQnKTtcbiAgfSxcbn07XG5cbmNvbnN0IHZpZXdNb2RhbDogTW9kYWxJbnRlcmZhY2UgPSBuZXcgTW9kYWwoXG4gICR2aWV3UHJvZHVjdE1vZGFsRWxlbWVudCxcbiAgbW9kYWxPcHRpb25zLFxuKTtcbmNvbnN0IGFkanVzdE1vZGFsOiBNb2RhbEludGVyZmFjZSA9IG5ldyBNb2RhbChcbiAgJGFkanVzdFByb2R1Y3RNb2RhbEVsZW1lbnQsXG4gIGFkanVzdE1vZGFsT3B0aW9ucyxcbik7XG5jb25zdCBlZGl0TW9kYWw6IE1vZGFsSW50ZXJmYWNlID0gbmV3IE1vZGFsKFxuICAkZWRpdFByb2R1Y3RNb2RhbEVsZW1lbnQsXG4gIG1vZGFsT3B0aW9ucyxcbik7XG5jb25zdCByZXF1ZXN0U2hhcmVNb2RhbDogTW9kYWxJbnRlcmZhY2UgPSBuZXcgTW9kYWwoXG4gICRyZXF1ZXN0U2hhcmVNb2RhbEVsZW1lbnQsXG4gIG1vZGFsU2hpcEFzc2lnbk9wdGlvbnMsXG4pO1xuY29uc3Qgc2hpcE1vZGFsOiBNb2RhbEludGVyZmFjZSA9IG5ldyBNb2RhbChcbiAgJHNoaXBNb2RhbEVsZW1lbnQsXG4gIG1vZGFsU2hpcEFzc2lnbk9wdGlvbnMsXG4pO1xuY29uc3QgYXNzaWduTW9kYWw6IE1vZGFsSW50ZXJmYWNlID0gbmV3IE1vZGFsKFxuICAkYXNzaWduTW9kYWxFbGVtZW50LFxuICBtb2RhbFNoaXBBc3NpZ25PcHRpb25zLFxuKTtcblxuY29uc3QgJGJ1dHRvbkVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3QtZWRpdC1idXR0b24nKTtcbiRidXR0b25FbGVtZW50cy5mb3JFYWNoKGUgPT5cbiAgZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBlZGl0UHJvZHVjdChKU09OLnBhcnNlKGUuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpKSk7XG4gIH0pLFxuKTtcblxuLy8gc2VhcmNoIGZsb3dcbmNvbnN0IHNlYXJjaElucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgJyN0YWJsZS1zZWFyY2gtcHJvZHVjdHMnLFxuKTtcbmNvbnN0IHNlYXJjaElucHV0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgJyN0YWJsZS1zZWFyY2gtcHJvZHVjdC1idXR0b24nLFxuKTtcbmlmIChzZWFyY2hJbnB1dEJ1dHRvbiAmJiBzZWFyY2hJbnB1dCkge1xuICBzZWFyY2hJbnB1dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLnNldCgncScsIHNlYXJjaElucHV0LnZhbHVlKTtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAke3VybC5ocmVmfWA7XG4gIH0pO1xufVxuY29uc3QgZGVsZXRlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZWxldGUtcHJvZHVjdC1idG4nKTtcblxuZGVsZXRlQnV0dG9ucy5mb3JFYWNoKGUgPT4ge1xuICBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgIGlmIChjb25maXJtKCdBcmUgc3VyZT8nKSkge1xuICAgICAgbGV0IGlkID0gZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZHVjdC1pZCcpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL3Byb2R1Y3QvZGVsZXRlLyR7aWR9YCwge1xuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgfSk7XG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufSk7XG5cbmZ1bmN0aW9uIGNvbnZlcnREYXRlKGRhdGU6IHN0cmluZykge1xuICBjb25zdCBpbnB1dERhdGUgPSBkYXRlLnNwbGl0KCdUJylbMF07XG4gIGNvbnN0IGRhdGVQYXJ0cyA9IGlucHV0RGF0ZS5zcGxpdCgnLScpO1xuICBjb25zdCB5ZWFyID0gZGF0ZVBhcnRzWzBdO1xuICBjb25zdCBtb250aCA9IGRhdGVQYXJ0c1sxXTtcbiAgY29uc3QgZGF5ID0gZGF0ZVBhcnRzWzJdO1xuICByZXR1cm4gYCR7bW9udGh9LyR7ZGF5fS8ke3llYXJ9YDtcbn1cblxuZnVuY3Rpb24gZWRpdFByb2R1Y3QocHJvZHVjdDogSVByb2R1Y3QpIHtcbiAgY29uc3QgaW1nOiBIVE1MSW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAnI3Byb2R1Y3QtZWRpdC1zaG93LWltYWdlJyxcbiAgKTtcbiAgcHJvZHVjdC5pbWFnZS5sZW5ndGggPiAxMDBcbiAgICA/IChpbWcuc3JjID0gYGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCwgJHtwcm9kdWN0LmltYWdlfWApXG4gICAgOiAoaW1nLnNyYyA9IGRlZmF1bHRCcmFuZEltYWdlKTtcbiAgbGV0IGlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC1uYW1lJyk7XG4gIGlucHV0LnZhbHVlID0gcHJvZHVjdC5uYW1lO1xuICBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWVkaXQtaWQnKTtcbiAgaW5wdXQudmFsdWUgPSBwcm9kdWN0LmlkLnRvU3RyaW5nKCk7XG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC1wcm9kdWN0X3R5cGUnKTtcbiAgaW5wdXQudmFsdWUgPSBwcm9kdWN0LnByb2R1Y3RfdHlwZS50b1VwcGVyQ2FzZSgpLnNwbGl0KCcgJykuam9pbignXycpO1xuICAvLyBhIGxvb3AgdGhhdCBhZGRzIGFkZGl0aW9uYWwgZmllbGRzXG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC1jdXJyZW5jeScpO1xuICBpbnB1dC52YWx1ZSA9IHByb2R1Y3QuY3VycmVuY3k7XG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC1wcmljZScpO1xuICBpbnB1dC52YWx1ZSA9IHByb2R1Y3QucHJpY2UudG9TdHJpbmcoKTtcbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LWRlc2NyaXB0aW9uJyk7XG4gIGlucHV0LnZhbHVlID0gcHJvZHVjdC5kZXNjcmlwdGlvbjtcbiAgLy8gR2VuZXJhbCBJbmZvIC0+XG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC1TS1UnKTtcbiAgaW5wdXQudmFsdWUgPSBwcm9kdWN0LlNLVTtcbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LWxvd19zdG9ja19sZXZlbCcpO1xuICBpbnB1dC52YWx1ZSA9IHByb2R1Y3QubG93X3N0b2NrX2xldmVsLnRvU3RyaW5nKCk7XG5cbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LXByb2dyYW1feWVhcicpO1xuICBpbnB1dC52YWx1ZSA9IHByb2R1Y3QucHJvZ3JhbV95ZWFyLnRvU3RyaW5nKCk7XG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC1wYWNrYWdlX3F0eScpO1xuICBpbnB1dC52YWx1ZSA9IHByb2R1Y3QucGFja2FnZV9xdHkudG9TdHJpbmcoKTtcbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LW51bWJfb2ZfaXRlbXNfcGVyX2Nhc2UnKTtcbiAgaW5wdXQudmFsdWUgPSBwcm9kdWN0Lm51bWJfb2ZfaXRlbXNfcGVyX2Nhc2UudG9TdHJpbmcoKTtcbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LW51bWJfb2ZfY2FzZXNfcGVyX291dGVyX2Nhc2UnKTtcbiAgaW5wdXQudmFsdWUgPSBwcm9kdWN0Lm51bWJfb2ZfY2FzZXNfcGVyX291dGVyX2Nhc2UudG9TdHJpbmcoKTtcbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LWNvbW1lbnRzJyk7XG4gIGlucHV0LnZhbHVlID0gcHJvZHVjdC5jb21tZW50cztcbiAgLy8gc2hpcHBpbmdcbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1lZGl0LXdlaWdodCcpO1xuICBpbnB1dC52YWx1ZSA9IHByb2R1Y3Qud2VpZ2h0LnRvU3RyaW5nKCk7XG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC1sZW5ndGgnKTtcbiAgaW5wdXQudmFsdWUgPSBwcm9kdWN0Lmxlbmd0aC50b1N0cmluZygpO1xuICBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWVkaXQtd2lkdGgnKTtcbiAgaW5wdXQudmFsdWUgPSBwcm9kdWN0LndpZHRoLnRvU3RyaW5nKCk7XG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtZWRpdC1oZWlnaHQnKTtcbiAgaW5wdXQudmFsdWUgPSBwcm9kdWN0LmhlaWdodC50b1N0cmluZygpO1xuICBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWVkaXQtbmV4dF91cmwnKTtcbiAgaW5wdXQudmFsdWUgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgZWRpdE1vZGFsLnNob3coKTtcbn1cblxuY29uc3Qgdmlld1Byb2R1Y3RCdXR0b25FbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICcucHJvZHVjdC12aWV3LWJ1dHRvbicsXG4pO1xudmlld1Byb2R1Y3RCdXR0b25FbGVtZW50cy5mb3JFYWNoKGUgPT5cbiAgZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCBwcm9kdWN0ID0gSlNPTi5wYXJzZShlLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKSk7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgncHJvZHVjdCcsIEpTT04uc3RyaW5naWZ5KHByb2R1Y3QpKTtcbiAgICBjb25zdCBtc3RyR3JvdXBzID0gT2JqZWN0LmtleXMocHJvZHVjdC5tc3RyX2dyb3Vwc19ncm91cHMpO1xuXG4gICAgbXN0ckdyb3Vwcy5mb3JFYWNoKGdyb3VwTmFtZSA9PiB7XG4gICAgICBsZXQgaXNFcXVhbCA9IGZhbHNlO1xuICAgICAgaWYgKHByb2R1Y3QuY3VycmVudF91c2VyX2dyb3Vwcy5oYXNPd25Qcm9wZXJ0eShncm91cE5hbWUpKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRVc2VyVmFsdWUgPSBwcm9kdWN0LmN1cnJlbnRfdXNlcl9ncm91cHNbZ3JvdXBOYW1lXTtcbiAgICAgICAgY29uc3QgbXN0ckdyb3Vwc1ZhbHVlID0gcHJvZHVjdC5tc3RyX2dyb3Vwc19ncm91cHNbZ3JvdXBOYW1lXTtcbiAgICAgICAgaWYgKGN1cnJlbnRVc2VyVmFsdWUuaW5jbHVkZXMobXN0ckdyb3Vwc1ZhbHVlKSkge1xuICAgICAgICAgIGlzRXF1YWwgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhZGRTaGlwQXNzaWduU2hhcmVCdXR0b24oXG4gICAgICAgIGlzRXF1YWwsXG4gICAgICAgIGdyb3VwTmFtZSxcbiAgICAgICAgcHJvZHVjdC5tc3RyX2dyb3Vwc19ncm91cHNbZ3JvdXBOYW1lXSxcbiAgICAgICAgcHJvZHVjdCxcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBsZXQgZGl2OiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXZpZXctbmFtZScpO1xuICAgIGRpdi5pbm5lckhUTUwgPSBwcm9kdWN0Lm5hbWU7XG4gICAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtdmlldy1pZCcpO1xuICAgIGRpdi5pbm5lckhUTUwgPSBwcm9kdWN0LmlkLnRvU3RyaW5nKCk7XG4gICAgY29uc3QgaW1nOiBIVE1MSW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtdmlldy1pbWFnZScpO1xuICAgIHByb2R1Y3QuaW1hZ2UubGVuZ3RoID4gMTAwXG4gICAgICA/IChpbWcuc3JjID0gYGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCwgJHtwcm9kdWN0LmltYWdlfWApXG4gICAgICA6IChpbWcuc3JjID0gZGVmYXVsdEJyYW5kSW1hZ2UpO1xuICAgIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXZpZXctcHJvZHVjdF90eXBlJyk7XG4gICAgZGl2LmlubmVySFRNTCA9IHByb2R1Y3QucHJvZHVjdF90eXBlLnRvVXBwZXJDYXNlKCkuc3BsaXQoJyAnKS5qb2luKCdfJyk7XG4gICAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtdmlldy1wcmljZScpO1xuICAgIGRpdi5pbm5lckhUTUwgPSBwcm9kdWN0LnByaWNlLnRvU3RyaW5nKCk7XG4gICAgLy8gR2VuZXJhbCBJbmZvIC0+XG4gICAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtdmlldy1TS1UnKTtcbiAgICBkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5TS1U7XG4gICAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtdmlldy1wYWNrYWdlX3F0eScpO1xuICAgIGRpdi5pbm5lckhUTUwgPSBwcm9kdWN0LnBhY2thZ2VfcXR5LnRvU3RyaW5nKCk7XG4gICAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtdmlldy1udW1iX29mX2l0ZW1zX3Blcl9jYXNlJyk7XG4gICAgZGl2LmlubmVySFRNTCA9IHByb2R1Y3QubnVtYl9vZl9pdGVtc19wZXJfY2FzZS50b1N0cmluZygpO1xuICAgIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXZpZXctbnVtYl9vZl9jYXNlc19wZXJfb3V0ZXJfY2FzZScpO1xuICAgIGRpdi5pbm5lckhUTUwgPSBwcm9kdWN0Lm51bWJfb2ZfY2FzZXNfcGVyX291dGVyX2Nhc2UudG9TdHJpbmcoKTtcbiAgICBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC12aWV3LWNvbW1lbnRzJyk7XG4gICAgZGl2LmlubmVySFRNTCA9IHByb2R1Y3QuY29tbWVudHM7XG4gICAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtdmlldy1uZXh0X3VybCcpO1xuICAgIGRpdi5pbm5lckhUTUwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICB2aWV3TW9kYWwuc2hvdygpO1xuICB9KSxcbik7XG5cbmNvbnN0IGFkanVzdFByb2R1Y3RCdXR0b25FbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICcucHJvZHVjdC1hZGp1c3QtYnV0dG9uJyxcbik7XG5hZGp1c3RQcm9kdWN0QnV0dG9uRWxlbWVudHMuZm9yRWFjaChlID0+XG4gIGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3QgcHJvZHVjdCA9IEpTT04ucGFyc2UoZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0JykpO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3Byb2R1Y3QnLCBKU09OLnN0cmluZ2lmeShwcm9kdWN0KSk7XG4gICAgY29uc3QgbXN0ckdyb3VwcyA9IE9iamVjdC5rZXlzKHByb2R1Y3QubXN0cl9ncm91cHNfZ3JvdXBzKTtcbiAgICBtc3RyR3JvdXBzLmZvckVhY2goZ3JvdXBOYW1lID0+IHtcbiAgICAgIGxldCBpc0VxdWFsID0gZmFsc2U7XG4gICAgICBpZiAocHJvZHVjdC5jdXJyZW50X3VzZXJfZ3JvdXBzLmhhc093blByb3BlcnR5KGdyb3VwTmFtZSkpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFVzZXJWYWx1ZSA9IHByb2R1Y3QuY3VycmVudF91c2VyX2dyb3Vwc1tncm91cE5hbWVdO1xuICAgICAgICBjb25zdCBtc3RyR3JvdXBzVmFsdWUgPSBwcm9kdWN0Lm1zdHJfZ3JvdXBzX2dyb3Vwc1tncm91cE5hbWVdO1xuICAgICAgICBpZiAoY3VycmVudFVzZXJWYWx1ZS5pbmNsdWRlcyhtc3RyR3JvdXBzVmFsdWUpKSB7XG4gICAgICAgICAgaXNFcXVhbCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNyZWF0ZUFkanVzdEFjdGlvbihcbiAgICAgICAgaXNFcXVhbCxcbiAgICAgICAgZ3JvdXBOYW1lLFxuICAgICAgICBwcm9kdWN0Lm1zdHJfZ3JvdXBzX2dyb3Vwc1tncm91cE5hbWVdLFxuICAgICAgICBwcm9kdWN0LFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGxldCBkaXY6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtYWRqdXN0LW5hbWUnKTtcbiAgICBkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5uYW1lO1xuICAgIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWFkanVzdC1pZCcpO1xuICAgIGRpdi5pbm5lckhUTUwgPSBwcm9kdWN0LmlkLnRvU3RyaW5nKCk7XG4gICAgY29uc3QgaW1nOiBIVE1MSW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICcjcHJvZHVjdC1hZGp1c3QtaW1hZ2UnLFxuICAgICk7XG4gICAgcHJvZHVjdC5pbWFnZS5sZW5ndGggPiAxMDBcbiAgICAgID8gKGltZy5zcmMgPSBgZGF0YTppbWFnZS9wbmc7YmFzZTY0LCAke3Byb2R1Y3QuaW1hZ2V9YClcbiAgICAgIDogKGltZy5zcmMgPSBkZWZhdWx0QnJhbmRJbWFnZSk7XG4gICAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtYWRqdXN0LXByb2R1Y3RfdHlwZScpO1xuICAgIGRpdi5pbm5lckhUTUwgPSBwcm9kdWN0LnByb2R1Y3RfdHlwZS50b1VwcGVyQ2FzZSgpLnNwbGl0KCcgJykuam9pbignXycpO1xuICAgIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWFkanVzdC1uZXh0X3VybCcpO1xuICAgIGRpdi5pbm5lckhUTUwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICBhZGp1c3RNb2RhbC5zaG93KCk7XG4gIH0pLFxuKTtcblxuLy8gZnVuY3Rpb24gdG8gcmVxdWVzdCBzaGFyZVxuZnVuY3Rpb24gcmVxdWVzdFNoYXJlKHByb2R1Y3Q6IElQcm9kdWN0LCBncm91cDogc3RyaW5nKSB7XG4gIGNvbnN0IGltZzogSFRNTEltYWdlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgJyNwcm9kdWN0LXJlcXVlc3Qtc2hhcmUtaW1hZ2UnLFxuICApO1xuICBwcm9kdWN0LmltYWdlLmxlbmd0aCA+IDEwMFxuICAgID8gKGltZy5zcmMgPSBgZGF0YTppbWFnZS9wbmc7YmFzZTY0LCAke3Byb2R1Y3QuaW1hZ2V9YClcbiAgICA6IChpbWcuc3JjID0gZGVmYXVsdEJyYW5kSW1hZ2UpO1xuICBsZXQgZGl2OiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgJyNwcm9kdWN0LXJlcXVlc3Qtc2hhcmUtbmFtZScsXG4gICk7XG4gIGRpdi5pbm5lckhUTUwgPSBwcm9kdWN0Lm5hbWU7XG4gIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXJlcXVlc3Qtc2hhcmUtc2t1Jyk7XG4gIGRpdi5pbm5lckhUTUwgPSBwcm9kdWN0LlNLVTtcbiAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtcmVxdWVzdC1zaGFyZS1hdmFpbGFibGUtcXVhbnRpdHknKTtcbiAgZGl2LmlubmVySFRNTCA9IHByb2R1Y3QuYXZhaWxhYmxlX3F1YW50aXR5W2dyb3VwXS50b1N0cmluZygpO1xuICBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1yZXF1ZXN0LXNoYXJlLW93bmVyJyk7XG4gIC8vIFRPRE8gY2hhbmdlIHRvIHNvbWV0aGluZyBub3QgaGFyZGNvZGVkIGhlcmUgYW5kIGluIHJlc3QgZnVuY3NcbiAgZGl2LmlubmVySFRNTCA9ICdNaWtlJztcbiAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtcmVxdWVzdC1zaGFyZS1yb2xlJyk7XG4gIGRpdi5pbm5lckhUTUwgPSAnQURNSU4nO1xuICBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1yZXF1ZXN0LXNoYXJlLXRvdGFsLWF2YWlsYWJsZS1pdGVtcycpO1xuICBkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC50b3RhbF9hdmFpbGFibGVfaXRlbXNbZ3JvdXBdLnRvU3RyaW5nKCk7XG4gIGxldCBpbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgJyNwcm9kdWN0LXJlcXVlc3Qtc2hhcmUtcXVhbnRpdHknLFxuICApO1xuICBpbnB1dC5tYXggPSBwcm9kdWN0LmF2YWlsYWJsZV9xdWFudGl0eVtncm91cF0udG9TdHJpbmcoKTtcbiAgaW5wdXQubWluID0gJzEnO1xuICBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXJlcXVlc3Qtc2hhcmUtbmFtZS1oaWRkZW4taW5wdXQnKTtcbiAgaW5wdXQudmFsdWUgPSBwcm9kdWN0Lm5hbWU7XG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtcmVxdWVzdC1zaGFyZS1TS1UtaGlkZGVuLWlucHV0Jyk7XG4gIGlucHV0LnZhbHVlID0gcHJvZHVjdC5TS1U7XG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAnI3Byb2R1Y3QtcmVxdWVzdC1zaGFyZS1hdmFpbGFibGUtcXVhbnRpdHktaGlkZGVuLWlucHV0JyxcbiAgKTtcbiAgaW5wdXQudmFsdWUgPSBwcm9kdWN0LmF2YWlsYWJsZV9xdWFudGl0eVtncm91cF0udG9TdHJpbmcoKTtcbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1yZXF1ZXN0LXNoYXJlLWZyb20tZ3JvdXAnKTtcbiAgaW5wdXQudmFsdWUgPSBncm91cDtcbiAgcmVxdWVzdFNoYXJlTW9kYWwuc2hvdygpO1xufVxuXG4vLyBmdW5jdGlvbiB0byBzaGlwXG5mdW5jdGlvbiBzaGlwKHByb2R1Y3Q6IElQcm9kdWN0LCBncm91cDogc3RyaW5nKSB7XG4gIGNvbnN0IGltZzogSFRNTEltYWdlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXNoaXAtaW1hZ2UnKTtcbiAgcHJvZHVjdC5pbWFnZS5sZW5ndGggPiAxMDBcbiAgICA/IChpbWcuc3JjID0gYGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCwgJHtwcm9kdWN0LmltYWdlfWApXG4gICAgOiAoaW1nLnNyYyA9IGRlZmF1bHRCcmFuZEltYWdlKTtcbiAgbGV0IGRpdjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1zaGlwLW5hbWUnKTtcbiAgZGl2LmlubmVySFRNTCA9IHByb2R1Y3QubmFtZTtcbiAgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtc2hpcC1za3UnKTtcbiAgZGl2LmlubmVySFRNTCA9IHByb2R1Y3QuU0tVO1xuICBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1zaGlwLWF2YWlsYWJsZS1xdWFudGl0eScpO1xuICBkaXYuaW5uZXJIVE1MID0gcHJvZHVjdC5hdmFpbGFibGVfcXVhbnRpdHlbZ3JvdXBdLnRvU3RyaW5nKCk7XG4gIGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXNoaXAtdG90YWwtYXZhaWxhYmxlLWl0ZW1zJyk7XG4gIGRpdi5pbm5lckhUTUwgPSBwcm9kdWN0LnRvdGFsX2F2YWlsYWJsZV9pdGVtc1tncm91cF0udG9TdHJpbmcoKTtcblxuICBsZXQgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICcjcHJvZHVjdC1zaGlwLXByb2R1Y3QtaWQnLFxuICApO1xuICBpbnB1dC52YWx1ZSA9IHByb2R1Y3QuaWQudG9TdHJpbmcoKTtcbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdC1zaGlwLWRlc2lyZS1xdWFudGl0eScpO1xuICBpbnB1dC5tYXggPSBwcm9kdWN0LmF2YWlsYWJsZV9xdWFudGl0eVtncm91cF0udG9TdHJpbmcoKTtcbiAgaW5wdXQubWluID0gJzEnO1xuICBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXNoaXAtZ3JvdXAnKTtcbiAgaW5wdXQudmFsdWUgPSBncm91cDtcbiAgc2hpcE1vZGFsLnNob3coKTtcbn1cblxuLy8gZnVuY3Rpb24gdG8gYXNzaWduXG5mdW5jdGlvbiBhc3NpZ24ocHJvZHVjdDogSVByb2R1Y3QsIGdyb3VwOiBzdHJpbmcpIHtcbiAgbGV0IGlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtYXNzaWduLW5hbWUnKTtcbiAgaW5wdXQudmFsdWUgPSBwcm9kdWN0Lm5hbWU7XG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3QtYXNzaWduLWFtb3VudCcpO1xuICBpbnB1dC5tYXggPSBwcm9kdWN0LmF2YWlsYWJsZV9xdWFudGl0eVtncm91cF0udG9TdHJpbmcoKTtcbiAgaW5wdXQubWluID0gJzEnO1xuICBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWFzc2lnbi1mcm9tLWdyb3VwJyk7XG4gIGlucHV0LnZhbHVlID0gZ3JvdXA7XG4gIGFzc2lnbk1vZGFsLnNob3coKTtcbn1cblxuLy8gZnVuY3Rpb24gdG8gZGVsZXRlIHNoaXAgYXNzaWduIHNoYXJlIGJ1dHRvblxuZnVuY3Rpb24gZGVsZXRlU2hpcEFzc2lnbkJ1dHRvbihuYW1lR3JvdXA6IHN0cmluZywgbmFtZUdyb3VwVmFsdWU6IHN0cmluZykge1xuICBjb25zdCBzaGlwQXNzaWduU2hhcmVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIGAjcHJvZHVjdC1zaGlwLWFzc2lnbi1zaGFyZS1jb250YWluZXItJHtuYW1lR3JvdXAucmVwbGFjZSgvIC9nLCAnXycpfWAsXG4gICk7XG4gIGNvbnN0IGdyb3VwQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBgI3Byb2R1Y3Qtdmlldy1wcm9kdWN0X2dyb3VwLWNvbnRhaW5lci0ke25hbWVHcm91cFZhbHVlLnJlcGxhY2UoXG4gICAgICAvIC9nLFxuICAgICAgJ18nLFxuICAgICl9YCxcbiAgKTtcbiAgaWYgKHNoaXBBc3NpZ25TaGFyZUNvbnRhaW5lcikge1xuICAgIHNoaXBBc3NpZ25TaGFyZUNvbnRhaW5lci5yZW1vdmUoKTtcbiAgfVxuICBpZiAoZ3JvdXBDb250YWluZXIpIHtcbiAgICBncm91cENvbnRhaW5lci5yZW1vdmUoKTtcbiAgfVxufVxuXG4vLyBmdW5jdGlvbiB0byBhZGQgc2hpcCwgYXNzaWduLCBidXR0b24gdG8gdmlldyBwcm9kdWN0IG1vZGFsXG5mdW5jdGlvbiBhZGRTaGlwQXNzaWduU2hhcmVCdXR0b24oXG4gIGlzRXF1YWw6IGJvb2xlYW4sXG4gIG1hc3Rlckdyb3VwOiBzdHJpbmcsXG4gIGdyb3VwOiBzdHJpbmcsXG4gIHByb2R1Y3RQYXJhbTogSVByb2R1Y3QsXG4pIHtcbiAgY29uc3QgZ3JvdXBQcm9kdWN0SWRzID0gcHJvZHVjdFBhcmFtLmdyb3Vwc19pZHM7XG4gIGNvbnN0IHByb2R1Y3RUeXBlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBgI3Byb2R1Y3Qtdmlldy1wcm9kdWN0X3R5cGUtY29udGFpbmVyYCxcbiAgKTtcbiAgY29uc3Qgc2hpcEFzc2lnbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBzaGlwQXNzaWduQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3NtOmNvbC1zcGFuLTMnLCAnZmxleCcsICdnYXAtNCcpO1xuICBzaGlwQXNzaWduQ29udGFpbmVyLnNldEF0dHJpYnV0ZShcbiAgICAnaWQnLFxuICAgIGBwcm9kdWN0LXNoaXAtYXNzaWduLXNoYXJlLWNvbnRhaW5lci0ke21hc3Rlckdyb3VwLnJlcGxhY2UoLyAvZywgJ18nKX1gLFxuICApO1xuICBzaGlwQXNzaWduQ29udGFpbmVyLmlubmVySFRNTCA9IGBcbiAgICA8ZGl2PlxuICAgICAgPGxhYmVsIGZvcj1cIm5hbWVcIiBjbGFzcz1cImJsb2NrIG1iLTIgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktOTAwIGRhcms6dGV4dC13aGl0ZVwiPlF1YW50aXR5PC9sYWJlbD5cbiAgICAgICAgPGRpdiBpZD1cInNoaXAtcHJvZHVjdC1xdWFudGl0eVwiXG4gICAgICAgICAgY2xhc3M9XCJzaGFkb3ctc20gYmctZ3JheS01MCBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHRleHQtZ3JheS05MDAgdGV4dC1zbSByb3VuZGVkLWxnIGZvY3VzOnJpbmctYmx1ZS02MDAgZm9jdXM6Ym9yZGVyLWJsdWUtNjAwIGJsb2NrIHctZnVsbCBwLTIuNSBkYXJrOmJnLWdyYXktNjAwIGRhcms6Ym9yZGVyLWdyYXktNTAwIGRhcms6cGxhY2Vob2xkZXItZ3JheS00MDAgZGFyazp0ZXh0LXdoaXRlIGRhcms6Zm9jdXM6cmluZy1ibHVlLTUwMCBkYXJrOmZvY3VzOmJvcmRlci1ibHVlLTUwMFwiPlxuICAgICAgJHtwcm9kdWN0UGFyYW0uYXZhaWxhYmxlX3F1YW50aXR5W2dyb3VwXSB8fCAwfTwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXY+XG4gICAgICA8bGFiZWwgZm9yPVwicHJvZHVjdF9ncm91cFwiIGNsYXNzPVwiYmxvY2sgbWItMiB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDAgZGFyazp0ZXh0LXdoaXRlXCIgPkFjdGlvbjwvbGFiZWwgPlxuICAgICAgPGJ1dHRvbiBzaGlwLWdyb3VwLWRhdGE9JHtncm91cC5yZXBsYWNlKFxuICAgICAgICAvIC9nLFxuICAgICAgICAnXycsXG4gICAgICApfSB0eXBlPVwiYnV0dG9uXCIgaWQ9XCJzaGlwLXByb2R1Y3QtYnV0dG9uLSR7Z3JvdXAucmVwbGFjZShcbiAgICAvIC9nLFxuICAgICdfJyxcbiAgKX1cIiBjbGFzcz1cInNoaXAtcHJvZHVjdC1idXR0b24gaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIG1yLTIgcHgtMyBweS0yLjUgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWNlbnRlciB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgYmcteWVsbG93LTQwMCBob3ZlcjpiZy15ZWxsb3ctNTAwIGZvY3VzOnJpbmctNCBmb2N1czpyaW5nLXJlZC0zMDAgZGFyazpmb2N1czpyaW5nLXJlZC05MDBcIj5cbiAgICAgICAgPHN2ZyBjbGFzcz1cInctNCBoLTQgbXItMlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJNMTcuNDE0IDIuNTg2YTIgMiAwIDAwLTIuODI4IDBMNyAxMC4xNzJWMTNoMi44MjhsNy41ODYtNy41ODZhMiAyIDAgMDAwLTIuODI4elwiPjwvcGF0aD48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0yIDZhMiAyIDAgMDEyLTJoNGExIDEgMCAwMTAgMkg0djEwaDEwdi00YTEgMSAwIDExMiAwdjRhMiAyIDAgMDEtMiAySDRhMiAyIDAgMDEtMi0yVjZ6XCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiPjwvcGF0aD48L3N2Zz5cbiAgICAgICAgU2hpcFxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uIGFzc2lnbi1ncm91cC1kYXRhPSR7Z3JvdXAucmVwbGFjZShcbiAgICAgICAgLyAvZyxcbiAgICAgICAgJ18nLFxuICAgICAgKX0gdHlwZT1cImJ1dHRvblwiIGlkPVwiYXNzaWduLXByb2R1Y3QtYnV0dG9uLSR7Z3JvdXAucmVwbGFjZShcbiAgICAvIC9nLFxuICAgICdfJyxcbiAgKX1cIiBjbGFzcz1cImFzc2lnbi1wcm9kdWN0LWJ1dHRvbiBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgcHgtMyBweS0yLjUgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWNlbnRlciB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgYmctYmx1ZS03MDAgaG92ZXI6YmctYmx1ZS04MDAgZm9jdXM6cmluZy00IGZvY3VzOnJpbmctYmx1ZS0zMDAgZGFyazpiZy1ibHVlLTYwMCBkYXJrOmhvdmVyOmJnLWJsdWUtNzAwIGRhcms6Zm9jdXM6cmluZy1ibHVlLTgwMFwiPlxuICAgICAgICA8c3ZnIGNsYXNzPVwidy00IGgtNCBtci0yXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZD1cIk0xNy40MTQgMi41ODZhMiAyIDAgMDAtMi44MjggMEw3IDEwLjE3MlYxM2gyLjgyOGw3LjU4Ni03LjU4NmEyIDIgMCAwMDAtMi44Mjh6XCI+PC9wYXRoPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTIgNmEyIDIgMCAwMTItMmg0YTEgMSAwIDAxMCAySDR2MTBoMTB2LTRhMSAxIDAgMTEyIDB2NGEyIDIgMCAwMS0yIDJINGEyIDIgMCAwMS0yLTJWNnpcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCI+PC9wYXRoPjwvc3ZnPlxuICAgICAgICBBc3NpZ25cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICBgO1xuICBjb25zdCBzaGFyZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBzaGlwUHJvZHVjdEJ0biA9IHNoaXBBc3NpZ25Db250YWluZXIucXVlcnlTZWxlY3RvcihcbiAgICBgI3NoaXAtcHJvZHVjdC1idXR0b24tJHtncm91cC5yZXBsYWNlKC8gL2csICdfJyl9YCxcbiAgKTtcbiAgY29uc3QgYXNzaWduUHJvZHVjdEJ0biA9IHNoaXBBc3NpZ25Db250YWluZXIucXVlcnlTZWxlY3RvcihcbiAgICBgI2Fzc2lnbi1wcm9kdWN0LWJ1dHRvbi0ke2dyb3VwLnJlcGxhY2UoLyAvZywgJ18nKX1gLFxuICApO1xuXG4gIHNoYXJlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3NtOmNvbC1zcGFuLTMnLCAnZmxleCcsICdnYXAtNCcpO1xuICBzaGFyZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXG4gICAgJ2lkJyxcbiAgICBgcHJvZHVjdC1zaGlwLWFzc2lnbi1zaGFyZS1jb250YWluZXItJHttYXN0ZXJHcm91cC5yZXBsYWNlKC8gL2csICdfJyl9YCxcbiAgKTtcbiAgc2hhcmVDb250YWluZXIuaW5uZXJIVE1MID0gYFxuICAgIDxkaXY+XG4gICAgICA8bGFiZWwgZm9yPVwibmFtZVwiIGNsYXNzPVwiYmxvY2sgbWItMiB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDAgZGFyazp0ZXh0LXdoaXRlXCI+UXVhbnRpdHk8L2xhYmVsPlxuICAgICAgICA8ZGl2IGlkPVwic2hpcC1wcm9kdWN0LXF1YW50aXR5XCJcbiAgICAgICAgICBjbGFzcz1cInNoYWRvdy1zbSBiZy1ncmF5LTUwIGJvcmRlciBib3JkZXItZ3JheS0zMDAgdGV4dC1ncmF5LTkwMCB0ZXh0LXNtIHJvdW5kZWQtbGcgZm9jdXM6cmluZy1ibHVlLTYwMCBmb2N1czpib3JkZXItYmx1ZS02MDAgYmxvY2sgdy1mdWxsIHAtMi41IGRhcms6YmctZ3JheS02MDAgZGFyazpib3JkZXItZ3JheS01MDAgZGFyazpwbGFjZWhvbGRlci1ncmF5LTQwMCBkYXJrOnRleHQtd2hpdGUgZGFyazpmb2N1czpyaW5nLWJsdWUtNTAwIGRhcms6Zm9jdXM6Ym9yZGVyLWJsdWUtNTAwXCI+XG4gICAgICAke3Byb2R1Y3RQYXJhbS5hdmFpbGFibGVfcXVhbnRpdHlbZ3JvdXBdIHx8IDB9PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdj5cbiAgICAgIDxsYWJlbCBmb3I9XCJwcm9kdWN0X2dyb3VwXCIgY2xhc3M9XCJibG9jayBtYi0yIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtd2hpdGVcIiA+QWN0aW9uPC9sYWJlbCA+XG4gICAgICA8YnV0dG9uIHNoYXJlLWdyb3VwLWRhdGE9JHtncm91cC5yZXBsYWNlKFxuICAgICAgICAvIC9nLFxuICAgICAgICAnXycsXG4gICAgICApfSB0eXBlPVwiYnV0dG9uXCIgaWQ9XCJzaGFyZS1wcm9kdWN0LWJ1dHRvbi0ke2dyb3VwLnJlcGxhY2UoXG4gICAgLyAvZyxcbiAgICAnXycsXG4gICl9XCIgY2xhc3M9XCJyZXF1ZXN0LXNoYXJlLXByb2R1Y3QtYnV0dG9uIGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBweC0zIHB5LTIuNSB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtY2VudGVyIHRleHQtd2hpdGUgcm91bmRlZC1sZyBiZy15ZWxsb3ctNDAwIGhvdmVyOmJnLWJsdWUtODAwIGZvY3VzOnJpbmctNCBmb2N1czpyaW5nLWJsdWUtMzAwIGRhcms6YmctYmx1ZS02MDAgZGFyazpob3ZlcjpiZy1ibHVlLTcwMCBkYXJrOmZvY3VzOnJpbmctYmx1ZS04MDBcIj5cbiAgICAgICAgPHN2ZyBjbGFzcz1cInctNCBoLTQgbXItMlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJNMTcuNDE0IDIuNTg2YTIgMiAwIDAwLTIuODI4IDBMNyAxMC4xNzJWMTNoMi44MjhsNy41ODYtNy41ODZhMiAyIDAgMDAwLTIuODI4elwiPjwvcGF0aD48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0yIDZhMiAyIDAgMDEyLTJoNGExIDEgMCAwMTAgMkg0djEwaDEwdi00YTEgMSAwIDExMiAwdjRhMiAyIDAgMDEtMiAySDRhMiAyIDAgMDEtMi0yVjZ6XCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiPjwvcGF0aD48L3N2Zz5cbiAgICAgICAgUmVxdWVzdCBTaGFyZVxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIGA7XG5cbiAgY29uc3Qgc2hhcmVQcm9kdWN0QnRuID0gc2hhcmVDb250YWluZXIucXVlcnlTZWxlY3RvcihcbiAgICBgI3NoYXJlLXByb2R1Y3QtYnV0dG9uLSR7Z3JvdXAucmVwbGFjZSgvIC9nLCAnXycpfWAsXG4gICk7XG5cbiAgaWYgKFxuICAgIHByb2R1Y3RQYXJhbS5hdmFpbGFibGVfcXVhbnRpdHlbZ3JvdXBdID09PSAwIHx8XG4gICAgIXByb2R1Y3RQYXJhbS5hdmFpbGFibGVfcXVhbnRpdHlbZ3JvdXBdXG4gICkge1xuICAgIHNoaXBQcm9kdWN0QnRuLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZScpO1xuICAgIGFzc2lnblByb2R1Y3RCdG4uY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJyk7XG4gICAgc2hhcmVQcm9kdWN0QnRuLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZScpO1xuICB9XG5cbiAgaWYgKGlzRXF1YWwpIHtcbiAgICBwcm9kdWN0VHlwZUNvbnRhaW5lci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShcbiAgICAgIHNoaXBBc3NpZ25Db250YWluZXIsXG4gICAgICBwcm9kdWN0VHlwZUNvbnRhaW5lci5uZXh0U2libGluZyxcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIHByb2R1Y3RUeXBlQ29udGFpbmVyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKFxuICAgICAgc2hhcmVDb250YWluZXIsXG4gICAgICBwcm9kdWN0VHlwZUNvbnRhaW5lci5uZXh0U2libGluZyxcbiAgICApO1xuICB9XG5cbiAgY29uc3Qgc2hpcEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hpcC1wcm9kdWN0LWJ1dHRvbicpO1xuICBzaGlwQnV0dG9ucy5mb3JFYWNoKGUgPT5cbiAgICBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdmlld01vZGFsLmhpZGUoKTtcbiAgICAgIGVkaXRNb2RhbC5oaWRlKCk7XG4gICAgICBsZXQgc2hpcEdyb3VwID0gZS5nZXRBdHRyaWJ1dGUoJ3NoaXAtZ3JvdXAtZGF0YScpO1xuICAgICAgY29uc3QgcHJvZHVjdCA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UucHJvZHVjdCk7XG4gICAgICBzaGlwKHByb2R1Y3QsIHNoaXBHcm91cCk7XG4gICAgfSksXG4gICk7XG5cbiAgY29uc3QgYXNzaWduQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hc3NpZ24tcHJvZHVjdC1idXR0b24nKTtcbiAgYXNzaWduQnV0dG9ucy5mb3JFYWNoKGUgPT5cbiAgICBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdmlld01vZGFsLmhpZGUoKTtcbiAgICAgIGVkaXRNb2RhbC5oaWRlKCk7XG4gICAgICBsZXQgYXNzaWduR3JvdXAgPSBlLmdldEF0dHJpYnV0ZSgnYXNzaWduLWdyb3VwLWRhdGEnKTtcbiAgICAgIGNvbnN0IHByb2R1Y3QgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLnByb2R1Y3QpO1xuICAgICAgYXNzaWduKHByb2R1Y3QsIGFzc2lnbkdyb3VwKTtcbiAgICB9KSxcbiAgKTtcblxuICBjb25zdCByZXF1ZXN0U2hhcmVCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAnLnJlcXVlc3Qtc2hhcmUtcHJvZHVjdC1idXR0b24nLFxuICApO1xuICByZXF1ZXN0U2hhcmVCdXR0b25zLmZvckVhY2goZSA9PlxuICAgIGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB2aWV3TW9kYWwuaGlkZSgpO1xuICAgICAgZWRpdE1vZGFsLmhpZGUoKTtcbiAgICAgIGxldCBzaGFyZUdyb3VwID0gZS5nZXRBdHRyaWJ1dGUoJ3NoYXJlLWdyb3VwLWRhdGEnKTtcbiAgICAgIGNvbnN0IHByb2R1Y3QgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLnByb2R1Y3QpO1xuICAgICAgcmVxdWVzdFNoYXJlKHByb2R1Y3QsIHNoYXJlR3JvdXApO1xuICAgIH0pLFxuICApO1xuICBjb25zdCBwcm9kdWN0Vmlld1R5cGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICcjcHJvZHVjdC12aWV3LXByb2R1Y3RfdHlwZS1jb250YWluZXInLFxuICApO1xuICBjb25zdCBwcm9kdWN0TWFzdGVyR3JvdXBDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgcHJvZHVjdE1hc3Rlckdyb3VwQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3NtOmNvbC1zcGFuLTMnKTtcbiAgcHJvZHVjdE1hc3Rlckdyb3VwQ29udGFpbmVyLnNldEF0dHJpYnV0ZShcbiAgICAnaWQnLFxuICAgIGBwcm9kdWN0LXZpZXctcHJvZHVjdF9ncm91cC1jb250YWluZXItJHtncm91cC5yZXBsYWNlKC8gL2csICdfJyl9YCxcbiAgKTtcblxuICBwcm9kdWN0TWFzdGVyR3JvdXBDb250YWluZXIuaW5uZXJIVE1MID0gYFxuICAgIDxsYWJlbCBmb3I9XCJmb3ItZ3JvdXAtJHtncm91cH1cIlxuICAgICAgY2xhc3M9XCJibG9jayBtYi0yIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtd2hpdGVcIj4ke2dyb3VwfTwvbGFiZWw+XG4gICAgPHNlbGVjdCB0eXBlPVwidGV4dFwiIG5hbWU9XCJncm91cC0ke2dyb3VwfVwiIGlkPVwicHJvZHVjdC12aWV3LSR7Z3JvdXB9XCJcbiAgICAgIGNsYXNzPVwic2hhZG93LXNtIGJnLWdyYXktNTAgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCB0ZXh0LWdyYXktOTAwIHRleHQtc20gcm91bmRlZC1sZyBmb2N1czpyaW5nLWJsdWUtNjAwIGZvY3VzOmJvcmRlci1ibHVlLTYwMCBibG9jayB3LWZ1bGwgcC0yLjUgZGFyazpiZy1ncmF5LTYwMCBkYXJrOmJvcmRlci1ncmF5LTUwMCBkYXJrOnBsYWNlaG9sZGVyLWdyYXktNDAwIGRhcms6dGV4dC13aGl0ZSBkYXJrOmZvY3VzOnJpbmctYmx1ZS01MDAgZGFyazpmb2N1czpib3JkZXItYmx1ZS01MDBcIlxuICAgICAgcGxhY2Vob2xkZXI9XCJTb21lIEdyb3VwXCIgcmVxdWlyZWRcbiAgICA+XG4gICAgICA8b3B0aW9uIHZhbHVlPVwiJHtncm91cFByb2R1Y3RJZHNbZ3JvdXBdfVwiPiR7Z3JvdXB9PC9vcHRpb24+XG4gICAgPC9zZWxlY3Q+XG4gICAgYDtcbiAgcHJvZHVjdFZpZXdUeXBlQ29udGFpbmVyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKFxuICAgIHByb2R1Y3RNYXN0ZXJHcm91cENvbnRhaW5lcixcbiAgICBwcm9kdWN0Vmlld1R5cGVDb250YWluZXIubmV4dFNpYmxpbmcsXG4gICk7XG59XG5cbi8vIGZ1bmN0aW9uIHRvIGZpbHRlciBwcm9kdWN0cyBieSBncm91cFxuY29uc3QgcHJvZHVjdEZpbHRlcklucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0LWZpbHRlci1pbnB1dCcpO1xuY29uc3QgZmlsdGVyUHJvZHVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LWZpbHRlci1idXR0b24nKTtcbmNvbnN0IGZpbHRlclJhZGlvQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICcucHJvZHVjdC1maWx0ZXItcmFkaW8tYnV0dG9uJyxcbik7XG5cbmZpbHRlclJhZGlvQnV0dG9ucy5mb3JFYWNoKGJ0biA9PiB7XG4gIGNvbnN0IGZpbHRlckJ1dHRvbklkID0gYnRuLmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgY29uc3QgZmlsdGVySnNvbkRhdGFTdG9yYWdlID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnZmlsdGVySnNvbkRhdGEnKTtcbiAgY29uc3QgZmlsdGVySnNvbkRhdGFPYmplY3QgPSBKU09OLnBhcnNlKGZpbHRlckpzb25EYXRhU3RvcmFnZSk7XG5cbiAgZm9yIChjb25zdCBrZXkgaW4gZmlsdGVySnNvbkRhdGFPYmplY3QpIHtcbiAgICBpZiAoZmlsdGVyQnV0dG9uSWQuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgYnRuLmlubmVySFRNTCA9IGBcbiAgICAgICAgJHtmaWx0ZXJKc29uRGF0YU9iamVjdFtrZXldfVxuICAgICAgICA8c3ZnIGNsYXNzPVwidy0yLjUgaC0yLjUgbWwtMi41XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCJcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDEwIDZcIj5cbiAgICAgICAgICA8cGF0aCBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHJva2Utd2lkdGg9XCIyXCJcbiAgICAgICAgICAgIGQ9XCJtMSAxIDQgNCA0LTRcIiAvPlxuICAgICAgICA8L3N2Zz5gO1xuICAgIH1cbiAgfVxufSk7XG5cbnByb2R1Y3RGaWx0ZXJJbnB1dHMuZm9yRWFjaChpbnB1dCA9PiB7XG4gIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICBjb25zdCBmaWx0ZXJJbnB1dERhdGFUYXJnZXQgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0Jyk7XG4gICAgY29uc3QgZmlsdGVySW5wdXRJZCA9IGZpbHRlcklucHV0RGF0YVRhcmdldFxuICAgICAgLnNwbGl0KCcsJylbMF1cbiAgICAgIC5yZXBsYWNlKC9bXmEtekEtWjAtOVxcc1xcX10vZywgJycpO1xuICAgIGNvbnN0IGZpbHRlcklucHV0SWRTdHJpbmcgPSBgI3Byb2R1Y3QtZmlsdGVyLWlucHV0LSR7ZmlsdGVySW5wdXRJZH1gO1xuICAgIGNvbnN0IGZpbHRlckJ1dHRvbklkID0gZmlsdGVySW5wdXREYXRhVGFyZ2V0XG4gICAgICAuc3BsaXQoJywnKVsxXVxuICAgICAgLnRyaW0oKVxuICAgICAgLnJlcGxhY2UoL1teYS16QS1aMC05XFxzXFxfXS9nLCAnJyk7XG4gICAgY29uc3QgZmlsdGVySW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgZmlsdGVySW5wdXRJZFN0cmluZyxcbiAgICApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgY29uc3QgZmlsdGVyUmFkaW9CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYCNkcm9wZG93blJhZGlvQnV0dG9uLSR7ZmlsdGVyQnV0dG9uSWR9YCxcbiAgICApO1xuICAgIGlmIChmaWx0ZXJJbnB1dElkU3RyaW5nLmluY2x1ZGVzKGZpbHRlckJ1dHRvbklkKSkge1xuICAgICAgZmlsdGVyUmFkaW9CdG4uaW5uZXJIVE1MID0gYFxuICAgICAgICAke2ZpbHRlckJ1dHRvbklkLnNwbGl0KCdfJykuam9pbignICcpfVxuICAgICAgICA8c3ZnIGNsYXNzPVwidy0yLjUgaC0yLjUgbWwtMi41XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCJcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDEwIDZcIj5cbiAgICAgICAgICA8cGF0aCBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHJva2Utd2lkdGg9XCIyXCJcbiAgICAgICAgICAgIGQ9XCJtMSAxIDQgNCA0LTRcIiAvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgIGA7XG4gICAgICBnZXRTZXNzaW9uU3RvcmFnZU9iamVjdChcbiAgICAgICAgZmlsdGVySnNvbkRhdGEsXG4gICAgICAgICdmaWx0ZXJKc29uRGF0YScsXG4gICAgICAgICdyZW1vdmUnLFxuICAgICAgICBmaWx0ZXJCdXR0b25JZCxcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGZpbHRlclJhZGlvQnRuLmlubmVySFRNTCA9IGBcbiAgICAgICR7ZmlsdGVySW5wdXQudmFsdWUuc3BsaXQoJ18nKS5qb2luKCcgJyl9XG4gICAgICA8c3ZnIGNsYXNzPVwidy0yLjUgaC0yLjUgbWwtMi41XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCJcbiAgICAgICAgdmlld0JveD1cIjAgMCAxMCA2XCI+XG4gICAgICAgIDxwYXRoIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZS13aWR0aD1cIjJcIlxuICAgICAgICAgIGQ9XCJtMSAxIDQgNCA0LTRcIiAvPlxuICAgICAgPC9zdmc+XG4gICAgICBgO1xuICAgIGZpbHRlckpzb25EYXRhW2ZpbHRlckJ1dHRvbklkXSA9IGZpbHRlcklucHV0LnZhbHVlLnNwbGl0KCdfJykuam9pbignICcpO1xuICAgIGdldFNlc3Npb25TdG9yYWdlT2JqZWN0KGZpbHRlckpzb25EYXRhLCAnZmlsdGVySnNvbkRhdGEnLCAnYWRkJyk7XG4gIH0pO1xufSk7XG5cbmZpbHRlclByb2R1Y3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgY29uc3QgaGlkZGVuSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc29ydF9ieScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIGNvbnN0IGZpbHRlckpzb25EYXRhU3RvcmFnZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2ZpbHRlckpzb25EYXRhJyk7XG4gIGNvbnN0IGZpbHRlckRhdGFPYmplY3QgPSBKU09OLnBhcnNlKGZpbHRlckpzb25EYXRhU3RvcmFnZSk7XG4gIGZpbHRlckpzb25EYXRhID0gZmlsdGVyRGF0YU9iamVjdDtcbiAgaGlkZGVuSW5wdXQudmFsdWUgPSBKU09OLnN0cmluZ2lmeShmaWx0ZXJKc29uRGF0YSk7XG4gIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2ZpbHRlckpzb25EYXRhJywgSlNPTi5zdHJpbmdpZnkoZmlsdGVySnNvbkRhdGEpKTtcbiAgY29uc3QgaXNWaXNpYmxlRmlsdGVyID0gdHJ1ZTtcbiAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnaXNWaXNpYmxlRmlsdGVyJywgSlNPTi5zdHJpbmdpZnkoaXNWaXNpYmxlRmlsdGVyKSk7XG59KTtcblxuZnVuY3Rpb24gZ2V0U2Vzc2lvblN0b3JhZ2VPYmplY3QoXG4gIGxvY2FsT2JqZWN0OiBGaWx0ZXJKc29uRGF0YSxcbiAgc2Vzc2lvbk9iamVjdDogc3RyaW5nLFxuICBtZXRob2QgPSAnbm9uZScsXG4gIG9iamVjdEtleSA9ICdub25lJyxcbikge1xuICBjb25zdCBqc29uRGF0YU9iamVjdCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oc2Vzc2lvbk9iamVjdCk7XG4gIGNvbnN0IGRhdGFPYmplY3QgPSBKU09OLnBhcnNlKGpzb25EYXRhT2JqZWN0KTtcbiAgc3dpdGNoIChtZXRob2QpIHtcbiAgICBjYXNlICdhZGQnOlxuICAgICAgY29uc3QgbmV3RGF0YU9iamVjdCA9IHsuLi5kYXRhT2JqZWN0LCAuLi5sb2NhbE9iamVjdH07XG4gICAgICBjb25zdCBuZXdKc29uRGF0YSA9IEpTT04uc3RyaW5naWZ5KG5ld0RhdGFPYmplY3QpO1xuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShzZXNzaW9uT2JqZWN0LCBuZXdKc29uRGF0YSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdyZW1vdmUnOlxuICAgICAgZGVsZXRlIGRhdGFPYmplY3Rbb2JqZWN0S2V5XTtcbiAgICAgIGNvbnN0IG5ld0pzb25EYXRhT2JqZWN0ID0gSlNPTi5zdHJpbmdpZnkoZGF0YU9iamVjdCk7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKHNlc3Npb25PYmplY3QsIG5ld0pzb25EYXRhT2JqZWN0KTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVBZGp1c3RBY3Rpb24oXG4gIGlzRXF1YWw6IGJvb2xlYW4sXG4gIG1hc3Rlckdyb3VwOiBzdHJpbmcsXG4gIGdyb3VwOiBzdHJpbmcsXG4gIHByb2R1Y3RQYXJhbTogSVByb2R1Y3QsXG4pIHtcbiAgY29uc3QgZ3JvdXBQcm9kdWN0SWRzID0gcHJvZHVjdFBhcmFtLmdyb3Vwc19pZHM7XG4gIGNvbnN0IHByb2R1Y3RUeXBlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBgI3Byb2R1Y3QtYWRqdXN0LXByb2R1Y3RfdHlwZS1jb250YWluZXJgLFxuICApO1xuICBjb25zdCBhZGp1c3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgYWRqdXN0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3NtOmNvbC1zcGFuLTInLCAnZmxleCcsICdnYXAtNCcpO1xuICBhZGp1c3RDb250YWluZXIuc2V0QXR0cmlidXRlKFxuICAgICdpZCcsXG4gICAgYHByb2R1Y3QtYWRqdXN0LWNvbnRhaW5lci0ke2dyb3VwLnJlcGxhY2UoLyAvZywgJ18nKX1gLFxuICApO1xuICBhZGp1c3RDb250YWluZXIuaW5uZXJIVE1MID0gYFxuICAgIDxkaXY+XG4gICAgICA8bGFiZWwgZm9yPVwiYWRqdXN0LXByb2R1Y3QtcXVhbnRpdHktJHtncm91cC5yZXBsYWNlKFxuICAgICAgICAvIC9nLFxuICAgICAgICAnXycsXG4gICAgICApfVwiIGNsYXNzPVwiYmxvY2sgbWItMiB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDAgZGFyazp0ZXh0LXdoaXRlXCI+UXVhbnRpdHk8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgaWQ9XCJhZGp1c3QtcHJvZHVjdC1xdWFudGl0eS0ke2dyb3VwLnJlcGxhY2UoLyAvZywgJ18nKX1cIlxuICAgICAgICAgIGNsYXNzPVwic2hhZG93LXNtIGJnLWdyYXktNTAgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCB0ZXh0LWdyYXktOTAwIHRleHQtc20gcm91bmRlZC1sZyBmb2N1czpyaW5nLWJsdWUtNjAwIGZvY3VzOmJvcmRlci1ibHVlLTYwMCBibG9jayB3LWZ1bGwgcC0yLjUgZGFyazpiZy1ncmF5LTYwMCBkYXJrOmJvcmRlci1ncmF5LTUwMCBkYXJrOnBsYWNlaG9sZGVyLWdyYXktNDAwIGRhcms6dGV4dC13aGl0ZSBkYXJrOmZvY3VzOnJpbmctYmx1ZS01MDAgZGFyazpmb2N1czpib3JkZXItYmx1ZS01MDBcIj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2PlxuICAgICAgPGxhYmVsIGZvcj1cInByb2R1Y3RfZ3JvdXBcIiBjbGFzcz1cImJsb2NrIG1iLTIgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktOTAwIGRhcms6dGV4dC13aGl0ZVwiID5BY3Rpb248L2xhYmVsID5cbiAgICAgIDxidXR0b24gYWRqdXN0LWdyb3VwLWRhdGE9JHtncm91cC5yZXBsYWNlKFxuICAgICAgICAvIC9nLFxuICAgICAgICAnXycsXG4gICAgICApfSB0eXBlPVwiYnV0dG9uXCIgaWQ9XCJhZGp1c3QtcHJvZHVjdC1idXR0b24tJHtncm91cC5yZXBsYWNlKFxuICAgIC8gL2csXG4gICAgJ18nLFxuICApfVwiIGNsYXNzPVwiYWRqdXN0LXByb2R1Y3QtYnV0dG9uIGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBtci0yIHB4LTMgcHktMi41IHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1jZW50ZXIgdGV4dC13aGl0ZSByb3VuZGVkLWxnIGJnLXllbGxvdy00MDAgaG92ZXI6YmcteWVsbG93LTUwMCBmb2N1czpyaW5nLTQgZm9jdXM6cmluZy1yZWQtMzAwIGRhcms6Zm9jdXM6cmluZy1yZWQtOTAwXCI+XG4gICAgICAgIDxzdmcgY2xhc3M9XCJ3LTQgaC00IG1yLTJcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTTE3LjQxNCAyLjU4NmEyIDIgMCAwMC0yLjgyOCAwTDcgMTAuMTcyVjEzaDIuODI4bDcuNTg2LTcuNTg2YTIgMiAwIDAwMC0yLjgyOHpcIj48L3BhdGg+PHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMiA2YTIgMiAwIDAxMi0yaDRhMSAxIDAgMDEwIDJINHYxMGgxMHYtNGExIDEgMCAxMTIgMHY0YTIgMiAwIDAxLTIgMkg0YTIgMiAwIDAxLTItMlY2elwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIj48L3BhdGg+PC9zdmc+XG4gICAgICAgIEFkanVzdFxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIGA7XG4gIGNvbnN0IGFkanVzdFByb2R1Y3RCdG4gPSBhZGp1c3RDb250YWluZXIucXVlcnlTZWxlY3RvcihcbiAgICBgI2FkanVzdC1wcm9kdWN0LWJ1dHRvbi0ke2dyb3VwLnJlcGxhY2UoLyAvZywgJ18nKX1gLFxuICApO1xuXG4gIHByb2R1Y3RUeXBlQ29udGFpbmVyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKFxuICAgIGFkanVzdENvbnRhaW5lcixcbiAgICBwcm9kdWN0VHlwZUNvbnRhaW5lci5uZXh0U2libGluZyxcbiAgKTtcblxuICBjb25zdCBwcm9kdWN0Vmlld1R5cGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICcjcHJvZHVjdC1hZGp1c3QtcHJvZHVjdF90eXBlLWNvbnRhaW5lcicsXG4gICk7XG4gIGNvbnN0IG1hc3Rlckdyb3VwV2FyZWhvdXNlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1hc3Rlckdyb3VwV2FyZWhvdXNlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3NtOmNvbC1zcGFuLTQnKTtcbiAgbWFzdGVyR3JvdXBXYXJlaG91c2VDb250YWluZXIuc2V0QXR0cmlidXRlKFxuICAgICdpZCcsXG4gICAgYHByb2R1Y3QtYWRqdXN0LXByb2R1Y3RfZ3JvdXAtY29udGFpbmVyLSR7Z3JvdXAucmVwbGFjZSgvIC9nLCAnXycpfWAsXG4gICk7XG5cbiAgbWFzdGVyR3JvdXBXYXJlaG91c2VDb250YWluZXIuaW5uZXJIVE1MID0gYFxuICA8ZGl2IGNsYXNzPVwiZmxleCBnYXAtNFwiPlxuICA8ZGl2IGNsYXNzPVwidy0yLzRcIj5cbiAgICA8bGFiZWwgZm9yPVwiZm9yLWdyb3VwLSR7Z3JvdXB9XCJcbiAgICAgIGNsYXNzPVwiYmxvY2sgbWItMiB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDAgZGFyazp0ZXh0LXdoaXRlXCI+JHttYXN0ZXJHcm91cH08L2xhYmVsPlxuICAgIDxzZWxlY3QgdHlwZT1cInRleHRcIiBuYW1lPVwiZ3JvdXAtJHtncm91cH1cIiBpZD1cIm1hc3Rlci1ncm91cC1hZGp1c3QtJHtncm91cH1cIlxuICAgICAgY2xhc3M9XCJzaGFkb3ctc20gYmctZ3JheS01MCBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHRleHQtZ3JheS05MDAgdGV4dC1zbSByb3VuZGVkLWxnIGZvY3VzOnJpbmctYmx1ZS02MDAgZm9jdXM6Ym9yZGVyLWJsdWUtNjAwIGJsb2NrIHctZnVsbCBwLTIuNSBkYXJrOmJnLWdyYXktNjAwIGRhcms6Ym9yZGVyLWdyYXktNTAwIGRhcms6cGxhY2Vob2xkZXItZ3JheS00MDAgZGFyazp0ZXh0LXdoaXRlIGRhcms6Zm9jdXM6cmluZy1ibHVlLTUwMCBkYXJrOmZvY3VzOmJvcmRlci1ibHVlLTUwMFwiXG4gICAgICBwbGFjZWhvbGRlcj1cIlNvbWUgR3JvdXBcIiByZXF1aXJlZFxuICAgID5cbiAgICAgIDxvcHRpb24gdmFsdWU9XCIke2dyb3VwUHJvZHVjdElkc1tncm91cF19XCI+JHtncm91cH08L29wdGlvbj5cbiAgICA8L3NlbGVjdD5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJ3LTIvNFwiPlxuICAgIDxsYWJlbCBmb3I9XCJmb3Itd2FyZWhvdXNlLSR7Z3JvdXB9XCJcbiAgICAgIGNsYXNzPVwiYmxvY2sgbWItMiB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDAgZGFyazp0ZXh0LXdoaXRlXCI+V2FyZWhvdXNlPC9sYWJlbD5cbiAgICA8c2VsZWN0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImdyb3VwLSR7Z3JvdXB9XCIgaWQ9XCJ3YXJlaG91c2UtYWRqdXN0LSR7Z3JvdXB9XCJcbiAgICAgIGNsYXNzPVwic2hhZG93LXNtIGJnLWdyYXktNTAgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCB0ZXh0LWdyYXktOTAwIHRleHQtc20gcm91bmRlZC1sZyBmb2N1czpyaW5nLWJsdWUtNjAwIGZvY3VzOmJvcmRlci1ibHVlLTYwMCBibG9jayB3LWZ1bGwgcC0yLjUgZGFyazpiZy1ncmF5LTYwMCBkYXJrOmJvcmRlci1ncmF5LTUwMCBkYXJrOnBsYWNlaG9sZGVyLWdyYXktNDAwIGRhcms6dGV4dC13aGl0ZSBkYXJrOmZvY3VzOnJpbmctYmx1ZS01MDAgZGFyazpmb2N1czpib3JkZXItYmx1ZS01MDBcIlxuICAgICAgcGxhY2Vob2xkZXI9XCJTb21lIEdyb3VwXCIgcmVxdWlyZWRcbiAgICA+XG4gICAgPC9zZWxlY3Q+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgICBgO1xuXG4gIGNvbnN0IHNlbGVjdFdhcmVob3VzZTogSFRNTElucHV0RWxlbWVudCA9XG4gICAgbWFzdGVyR3JvdXBXYXJlaG91c2VDb250YWluZXIucXVlcnlTZWxlY3RvcihgI3dhcmVob3VzZS1hZGp1c3QtJHtncm91cH1gKTtcbiAgY29uc3QgcHJvZHVjdFF1YW50aXR5OiBIVE1MSW5wdXRFbGVtZW50ID0gYWRqdXN0Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXG4gICAgYCNhZGp1c3QtcHJvZHVjdC1xdWFudGl0eS0ke2dyb3VwLnJlcGxhY2UoLyAvZywgJ18nKX1gLFxuICApO1xuXG4gIGNvbnN0IHByb2R1Y3RRdWFudGl0eVZhbHVlID0gcHJvZHVjdFBhcmFtLmF2YWlsYWJsZV9xdWFudGl0eVtncm91cF0gfHwgMDtcbiAgcHJvZHVjdFF1YW50aXR5LnZhbHVlID0gU3RyaW5nKHByb2R1Y3RRdWFudGl0eVZhbHVlKTtcblxuICBmb3IgKGNvbnN0IHdhcmVob3VzZSBvZiBwcm9kdWN0UGFyYW0uYWxsX3dhcmVob3VzZXMpIHtcbiAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcblxuICAgIG9wdGlvbi52YWx1ZSA9IHdhcmVob3VzZS5pZC50b1N0cmluZygpO1xuICAgIG9wdGlvbi50ZXh0ID0gd2FyZWhvdXNlLm5hbWUudG9TdHJpbmcoKTtcbiAgICBzZWxlY3RXYXJlaG91c2UuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgfVxuXG4gIHByb2R1Y3RWaWV3VHlwZUNvbnRhaW5lci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShcbiAgICBtYXN0ZXJHcm91cFdhcmVob3VzZUNvbnRhaW5lcixcbiAgICBwcm9kdWN0Vmlld1R5cGVDb250YWluZXIubmV4dFNpYmxpbmcsXG4gICk7XG5cbiAgY29uc3QgYWRqdXN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBgI2FkanVzdC1wcm9kdWN0LWJ1dHRvbi0ke2dyb3VwLnJlcGxhY2UoLyAvZywgJ18nKX1gLFxuICApO1xuICBhZGp1c3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3QgY3NyZlRva2VuSW5wdXQgPVxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PignI2NzcmZfdG9rZW4nKTtcbiAgICBjb25zdCBjc3JmVG9rZW4gPSBjc3JmVG9rZW5JbnB1dCA/IGNzcmZUb2tlbklucHV0LnZhbHVlIDogJyc7XG4gICAgY29uc3QgZ3JvdXBJZCA9IGdyb3VwUHJvZHVjdElkc1tncm91cF07XG4gICAgY29uc3QgcHJvZHVjdElkID0gcHJvZHVjdFBhcmFtLmlkO1xuICAgIGNvbnN0IHdhcmVob3VzZUlkID0gc2VsZWN0V2FyZWhvdXNlLnZhbHVlO1xuICAgIGNvbnN0IGN1cnJlbnRRdWFudGl0eSA9IE51bWJlcihwcm9kdWN0UXVhbnRpdHkudmFsdWUpO1xuICAgIGFkanVzdFByb2R1Y3QoXG4gICAgICB3YXJlaG91c2VJZCxcbiAgICAgIHByb2R1Y3RJZCxcbiAgICAgIGN1cnJlbnRRdWFudGl0eSxcbiAgICAgIGdyb3VwSWQsXG4gICAgICBncm91cCxcbiAgICAgIGNzcmZUb2tlbixcbiAgICApO1xuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gYWRqdXN0UHJvZHVjdChcbiAgd2FyZWhvdXNlSWQ6IHN0cmluZyxcbiAgcHJvZHVjdElkOiBudW1iZXIsXG4gIHF1YW50aXR5OiBudW1iZXIsXG4gIGdyb3VwSWQ6IG51bWJlcixcbiAgZ3JvdXA6IHN0cmluZyxcbiAgY3NyZlRva2VuOiBzdHJpbmcsXG4pIHtcbiAgY29uc3QgZGF0YSA9IHtcbiAgICB3YXJlaG91c2VfaWQ6IHdhcmVob3VzZUlkLFxuICAgIHByb2R1Y3RfaWQ6IHByb2R1Y3RJZCxcbiAgICBxdWFudGl0eTogU3RyaW5nKHF1YW50aXR5KSxcbiAgICBncm91cF9pZDogZ3JvdXBJZCxcbiAgICBjc3JmX3Rva2VuOiBjc3JmVG9rZW4sXG4gIH07XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2R1Y3QvYWRqdXN0Jywge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgfSk7XG5cbiAgY29uc3QgbWVzc2FnZSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgY29uc3QgZ3JvdXBDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIGAjcHJvZHVjdC1hZGp1c3QtcHJvZHVjdF9ncm91cC1jb250YWluZXItJHtncm91cC5yZXBsYWNlKC8gL2csICdfJyl9YCxcbiAgKTtcblxuICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDEpIHtcbiAgICBjb25zdCBwcm9kdWN0UXVhbnRpdHk6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYCNhZGp1c3QtcHJvZHVjdC1xdWFudGl0eS0ke2dyb3VwLnJlcGxhY2UoLyAvZywgJ18nKX1gLFxuICAgICk7XG4gICAgcHJvZHVjdFF1YW50aXR5LnZhbHVlID0gcXVhbnRpdHkudG9TdHJpbmcoKTtcbiAgICBjb25zdCBzdWNjZXNzTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHN1Y2Nlc3NNZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ3RleHQtZ3JlZW4tNTAwJywgJ3RleHQtc20nKTtcbiAgICBzdWNjZXNzTWVzc2FnZS5pbm5lclRleHQgPSBtZXNzYWdlLm1lc3NhZ2U7XG4gICAgZ3JvdXBDb250YWluZXIuYXBwZW5kQ2hpbGQoc3VjY2Vzc01lc3NhZ2UpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc3VjY2Vzc01lc3NhZ2UucmVtb3ZlKCk7XG4gICAgfSwgMTAwMDApO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVycm9yTWVzc2FnZS5jbGFzc0xpc3QuYWRkKCd0ZXh0LXJlZC01MDAnLCAndGV4dC1zbScpO1xuICAgIGVycm9yTWVzc2FnZS5pbm5lclRleHQgPSBtZXNzYWdlLm1lc3NhZ2U7XG4gICAgZ3JvdXBDb250YWluZXIuYXBwZW5kQ2hpbGQoZXJyb3JNZXNzYWdlKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGVycm9yTWVzc2FnZS5yZW1vdmUoKTtcbiAgICB9LCAyMDAwMCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVsZXRlQWRqdXN0Q29udGFpbmVyKG5hbWVHcm91cDogc3RyaW5nLCBuYW1lR3JvdXBWYWx1ZTogc3RyaW5nKSB7XG4gIGNvbnN0IGFkanVzdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgYCNwcm9kdWN0LWFkanVzdC1jb250YWluZXItJHtuYW1lR3JvdXBWYWx1ZS5yZXBsYWNlKC8gL2csICdfJyl9YCxcbiAgKTtcbiAgY29uc3QgbWFzdGVyR3JvdXBXYXJlaG91c2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIGAjcHJvZHVjdC1hZGp1c3QtcHJvZHVjdF9ncm91cC1jb250YWluZXItJHtuYW1lR3JvdXBWYWx1ZS5yZXBsYWNlKFxuICAgICAgLyAvZyxcbiAgICAgICdfJyxcbiAgICApfWAsXG4gICk7XG4gIGlmIChhZGp1c3RDb250YWluZXIpIHtcbiAgICBhZGp1c3RDb250YWluZXIucmVtb3ZlKCk7XG4gIH1cbiAgaWYgKG1hc3Rlckdyb3VwV2FyZWhvdXNlQ29udGFpbmVyKSB7XG4gICAgbWFzdGVyR3JvdXBXYXJlaG91c2VDb250YWluZXIucmVtb3ZlKCk7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvcHJvZHVjdC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==