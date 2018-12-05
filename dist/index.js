(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("passport"), require("passport-saml"));
	else if(typeof define === 'function' && define.amd)
		define(["passport", "passport-saml"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("passport"), require("passport-saml")) : factory(root["passport"], root["passport-saml"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function(__WEBPACK_EXTERNAL_MODULE__3__, __WEBPACK_EXTERNAL_MODULE__4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var passport_saml__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var passport_saml__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(passport_saml__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }






/* harmony default export */ __webpack_exports__["default"] = (function (options) {
  if (typeof options.privateKeyPath === "string" && !fs__WEBPACK_IMPORTED_MODULE_0___default.a.existsSync(options.privateKeyPath)) {
    throw new Error("Private key file does not exist: " + options.privateKeyPath);
  } // Merge attributeMap with defaults


  const {
    attributeMap
  } = options,
        conf = _objectWithoutProperties(options, ["attributeMap"]);

  const attrMap = _objectSpread({
    "urn:oid:1.3.6.1.4.1.6537.1.19": "uuid",
    "urn:oid:2.16.840.1.113730.3.1.241": "displayName",
    "urn:oid:2.5.4.42": "firstName",
    "urn:oid:2.5.4.4": "lastName",
    "urn:oid:1.3.6.1.4.1.6537.1.15": "authId",
    "urn:oid:1.3.6.1.4.1.6537.1.14": "netId",
    "urn:oid:1.3.6.1.4.1.5923.1.1.1.6": "eppn",
    "urn:oid:1.3.6.1.4.1.6537.1.13": "brownId",
    "urn:oid:1.3.6.1.4.1.6537.1.16": "bannerId",
    "urn:oid:1.3.6.1.4.1.6537.1.68": "advanceId",
    "urn:oid:2.5.4.12": "title",
    "urn:oid:2.5.4.11": "department",
    "urn:oid:1.3.6.1.4.1.6537.1.28": "brownType",
    "urn:oid:1.3.6.1.4.1.5923.1.1.1.5": "primaryAffiliation",
    "urn:oid:1.3.6.1.4.1.5923.1.1.1.1": "affiliations",
    "urn:oid:1.3.6.1.4.1.6537.1.25": "status",
    "urn:oid:1.3.6.1.4.1.5923.1.5.1.1": "isMemberOf"
  }, attributeMap || {}); // Basically no-ops


  passport__WEBPACK_IMPORTED_MODULE_2___default.a.serializeUser(function (user, done) {
    done(null, user);
  });
  passport__WEBPACK_IMPORTED_MODULE_2___default.a.deserializeUser(function (user, done) {
    done(null, user);
  }); // Handles mapping attributes

  const strategy = new passport_saml__WEBPACK_IMPORTED_MODULE_3__["Strategy"](Object(_config__WEBPACK_IMPORTED_MODULE_4__["default"])(conf), function (profile, done) {
    const prof = {};

    for (const a in attrMap) {
      if (a in profile) {
        prof[attrMap[a]] = profile[a];
      }
    }

    return done(null, prof);
  });
  passport__WEBPACK_IMPORTED_MODULE_2___default.a.use(strategy);

  passport__WEBPACK_IMPORTED_MODULE_2___default.a.logout = function (logoutOptions) {
    logoutOptions = logoutOptions || {};
    return function (req, res) {
      const parsed = url__WEBPACK_IMPORTED_MODULE_1___default.a.parse(logoutOptions.successRedirect || "/");
      const protocol = parsed.protocol || "https";
      const path = parsed.path || "/";
      const host = parsed.host ? protocol + "//" + parsed.host : options.host;
      const redirect = host + path; // Kill local session

      req.logout(); // Redirect to IdP to kill its session and provide it with a return url

      return res.redirect("https://sso.brown.edu/idp/shib_logout.jsp?return=" + encodeURIComponent(redirect));
    };
  };

  return {
    passport: passport__WEBPACK_IMPORTED_MODULE_2___default.a,
    strategy: "saml",
    generateServiceProviderMetadata: strategy.generateServiceProviderMetadata.bind(strategy),
    authenticate: passport__WEBPACK_IMPORTED_MODULE_2___default.a.authenticate.bind(passport__WEBPACK_IMPORTED_MODULE_2___default.a, "saml"),
    logout: passport__WEBPACK_IMPORTED_MODULE_2___default.a.logout.bind(passport__WEBPACK_IMPORTED_MODULE_2___default.a)
  };
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__4__;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = (function (options) {
  const parsed = url__WEBPACK_IMPORTED_MODULE_1___default.a.parse(options.host);
  const protocol = parsed.protocol || "https";
  const host = parsed.host || "localhost:8443";
  const hostname = parsed.hostname || "localhost";
  const cbURL = protocol + "//" + host + (options.cbPath || "/login/callback").replace(/^\/*/, "/");
  const issuer = options.issuer || protocol + "//" + hostname + "/shibboleth-sp";
  const privateKey = options.privateKeyPath ? fs__WEBPACK_IMPORTED_MODULE_0___default.a.readFileSync(options.privateKeyPath) : null;
  return {
    callbackUrl: cbURL,
    issuer: issuer,
    decryptionPvk: privateKey,
    entryPoint: "https://sso.brown.edu/idp/profile/SAML2/Redirect/SSO",
    cert: "MIIDHzCCAgegAwIBAgIUHPSdb4ae0QA3fyeEIe7wKXi2oT0wDQYJKoZIhvcNAQEFBQAwGDEWMBQGA1UEAxMNc3NvLmJyb3duLmVkdTAeFw0xMDA1MjEyMTAyMzFaFw0zMDA1MjEyMTAyMzFaMBgxFjAUBgNVBAMTDXNzby5icm93bi5lZHUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCxabgPhLgyIOyoG87T41EXwUOyXKNJ4XvFa5moC3y8J9JzWBeVRQ8L7zxEiLcsZ4qHYdOCVZNSD5SYeI8rtjwz/lHlJsF7dfLXpeQSm5HggcgWEEbvgp+qHRsbu6ZLKUmD0qLnWLZ5pG+ihm0n10G6h9op9NKJqJOgkyk3PQbe1biAjjpnkVL5CxL4h1E0XADZogZBh3pY04kNzbMvaWsB9ToDI8i6JqTfyEZZcQr4ShgIdstAHzbHcGoRqSOuI3BDeYDj0lp7/X/v/lvQMWWnKFJD6E7xKypoVO2czCswZ9i390YkI9+eoBbIMunuE/JjPZwwknnWqaI5LBDkGbnJAgMBAAGjYTBfMD4GA1UdEQQ3MDWCDXNzby5icm93bi5lZHWGJGh0dHBzOi8vc3NvLmJyb3duLmVkdS9pZHAvc2hpYmJvbGV0aDAdBgNVHQ4EFgQU1EgYrxblcWF0RP8BxGEPTM4SkIowDQYJKoZIhvcNAQEFBQADggEBAG1o9TLKHLDMlW+fRtyWXeGI1Dpnvw505nmWOQEPzXnT3oMRsmFYUrynl6amaay0IlEZ86g8KALM0AsKA9x2hYz/Kvs99ZLJJ+3mcHDswWWC9NYme6HEzs+mXRXD2wxOWUYNKc2xAs3QPOpYmX2g6sZiDPkyQ4KOZT/Vh9BZ970k7vtJ0lIOUFSDTQnlfGOtdEBE6QehIzHF6SpFakYYFyAK1MO4G/vdYYoe4lF5FTUg9UjnEWqwcmCX02ay5ma5YMkNkyXeetU6HmLRBnpwPcuCgIkzuXP64h+6nVWpbLEJHeHIom+fbTMoCnUDbZ0FcmiGxk9Cg6RPORcGztgLcVw=",
    identifierFormat: "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified",
    disableRequestedAuthnContext: true,
    acceptedClockSkewMs: 180000
  };
});

/***/ })
/******/ ]);
});