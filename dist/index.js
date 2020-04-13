import React, { useState, useEffect } from 'react';
import EE from 'eventemitter3';

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var EventEmitter = new EE();

function I18n() {
  this.languages = [];
  this.currentLang = '';
  this.initialized = false;
}
/**
 * Initialize your i18n instance. Returns true if the initialization was successful.
 * @param {Object} config An object with your settings and language resources.
 * @param {Object} config.resources An object of {objects} with your language resources.
 * @param {string} [config.currentLang] The initial language your app wil be using.
 */


I18n.prototype.init = function (config) {
  var _this = this;

  if (!config.resources) {
    console.warn('You must specify your language resources/files, otherwise your i18n instance won\'t initialize.');
    return false;
  }

  Object.keys(config).map(function (key) {
    _this[key] = config[key];
  });
  this.languages = Object.keys(this.resources);

  if (this.currentLang === '') {
    var _this$languages = _slicedToArray(this.languages, 1);

    this.currentLang = _this$languages[0];
    console.warn("You didn't specify your initial language. We defined it as ".concat(this.currentLang));
  }

  this.initialized = true;
  return true;
};

I18n.prototype.getTranslatedKey = function (key) {
  var _this$resources, _this$resources$this$;

  if (this.resources === undefined) return key;
  var translatedKey = (_this$resources = this.resources) === null || _this$resources === void 0 ? void 0 : (_this$resources$this$ = _this$resources[this.currentLang]) === null || _this$resources$this$ === void 0 ? void 0 : _this$resources$this$[key];
  return translatedKey === undefined ? key : translatedKey;
};
/**
 * Returns a text node with the translated key.
 * @param {string} key - The key to be translated.
 */


I18n.prototype.t = function (key) {
  var self = this;

  var TextNode = function TextNode() {
    var _useState = useState(key),
        _useState2 = _slicedToArray(_useState, 2),
        translation = _useState2[0],
        setTranslation = _useState2[1];

    var updateTranslation = function updateTranslation() {
      setTranslation(self.getTranslatedKey(key));
    };

    useEffect(updateTranslation, []);
    EventEmitter.on('language-change', updateTranslation);
    return /*#__PURE__*/React.createElement(React.Fragment, null, translation);
  };

  return /*#__PURE__*/React.createElement(TextNode, null);
};
/**
 * Updates the current language.
 * @param {string} lang - The new language to be used.
 *                        It must be formatted as you defined it on your resources object.
 */


I18n.prototype.changeLang = function (lang) {
  if (!this.languages.includes(lang)) {
    console.warn("".concat(lang, " is not available!"));
    return;
  }

  this.currentLang = lang;
  EventEmitter.emit('language-change');
};

var Mintl = new I18n();

/**
 * Returns a function to get a translated key and another one to change
 * the app language.
 */

var useMintl = function useMintl() {
  return [function (key) {
    return Mintl.t(key);
  }, function (lang) {
    return Mintl.changeLang(lang);
  }];
};

export default Mintl;
export { useMintl };
