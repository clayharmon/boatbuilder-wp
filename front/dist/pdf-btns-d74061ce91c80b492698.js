(self["webpackChunk"] = self["webpackChunk"] || []).push([["pdf-btns"],{

/***/ "./src/containers/FormDealer.js":
/*!**************************************!*\
  !*** ./src/containers/FormDealer.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var FormDealer = function FormDealer(_ref) {
  var blob = _ref.blob;

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
      _useState2 = _slicedToArray(_useState, 2),
      fname = _useState2[0],
      setFname = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
      _useState4 = _slicedToArray(_useState3, 2),
      lname = _useState4[0],
      setLname = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
      _useState6 = _slicedToArray(_useState5, 2),
      email = _useState6[0],
      setEmail = _useState6[1];

  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
      _useState8 = _slicedToArray(_useState7, 2),
      phone = _useState8[0],
      setPhone = _useState8[1];

  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
      _useState10 = _slicedToArray(_useState9, 2),
      address = _useState10[0],
      setAddress = _useState10[1];

  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
      _useState12 = _slicedToArray(_useState11, 2),
      city = _useState12[0],
      setCity = _useState12[1];

  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
      _useState14 = _slicedToArray(_useState13, 2),
      state = _useState14[0],
      setState = _useState14[1];

  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
      _useState16 = _slicedToArray(_useState15, 2),
      zip = _useState16[0],
      setZip = _useState16[1];

  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
      _useState18 = _slicedToArray(_useState17, 2),
      errMessage = _useState18[0],
      setErrMessage = _useState18[1];

  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState20 = _slicedToArray(_useState19, 2),
      loading = _useState20[0],
      setLoading = _useState20[1];

  var _useState21 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState22 = _slicedToArray(_useState21, 2),
      success = _useState22[0],
      setSuccess = _useState22[1];

  var submitForm = function submitForm(e) {
    e.preventDefault();
    setLoading(true);
    var bodyFormData = new FormData();
    bodyFormData.append("contact_fname", fname);
    bodyFormData.append("contact_lname", lname);
    bodyFormData.append("contact_email", email);
    bodyFormData.append("contact_phone", phone);
    bodyFormData.append("contact_address", address);
    bodyFormData.append("contact_city", city);
    bodyFormData.append("contact_state", state);
    bodyFormData.append("contact_zip", zip);
    bodyFormData.append("the_file", blob, "myboat.pdf");
    axios__WEBPACK_IMPORTED_MODULE_1___default()({
      method: "post",
      url: "http://localhost/wp-json/boat-builder/v1/dealer",
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(function (response) {
      setLoading(false);
      var data = response.data;

      if (data.status !== 200) {
        setErrMessage(data.message);
      } else {
        setErrMessage("");
        setSuccess(true);
      }
    }).catch(function (response) {
      setLoading(false);
      setErrMessage("There was some unknown Error, Please try again.");
    });
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: success ? "form-success active" : "form-success",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          className: "icon-container",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__.FaCheckCircle, {})
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h2", {
          className: "message",
          children: "Success! Email Sent."
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: loading ? "loader active" : "loader"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("form", {
      className: "formDealer",
      onSubmit: submitForm,
      children: [errMessage ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "form-error",
        children: errMessage
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "form-container",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "form-input-container",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
            htmlFor: "fname",
            children: "First Name:"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
            name: "fname",
            type: "text",
            onChange: function onChange(e) {
              return setFname(e.target.value);
            },
            value: fname
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "form-input-container",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
            htmlFor: "lname",
            children: "Last Name:"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
            name: "lname",
            type: "text",
            onChange: function onChange(e) {
              return setLname(e.target.value);
            },
            value: lname
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "form-input-container",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
            htmlFor: "email",
            children: "Email:"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
            name: "email",
            type: "email",
            onChange: function onChange(e) {
              return setEmail(e.target.value);
            },
            value: email
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "form-input-container",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
            htmlFor: "phone",
            children: "Phone:"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
            name: "phone",
            type: "tel",
            onChange: function onChange(e) {
              return setPhone(e.target.value);
            },
            value: phone
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "form-input-container",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
            htmlFor: "address",
            children: "Address:"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
            name: "address",
            type: "text",
            onChange: function onChange(e) {
              return setAddress(e.target.value);
            },
            value: address
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "form-input-container",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
            htmlFor: "city",
            children: "City:"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
            name: "city",
            type: "text",
            onChange: function onChange(e) {
              return setCity(e.target.value);
            },
            value: city
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "form-input-container",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
            htmlFor: "state",
            children: "State:"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("select", {
            name: "state",
            onChange: function onChange(e) {
              return setState(e.target.value);
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "",
              disabled: true,
              selected: true,
              children: "Select a State"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "AL",
              children: "Alabama"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "AK",
              children: "Alaska"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "AZ",
              children: "Arizona"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "AR",
              children: "Arkansas"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "CA",
              children: "California"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "CO",
              children: "Colorado"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "CT",
              children: "Connecticut"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "DE",
              children: "Delaware"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "DC",
              children: "District Of Columbia"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "FL",
              children: "Florida"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "GA",
              children: "Georgia"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "HI",
              children: "Hawaii"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "ID",
              children: "Idaho"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "IL",
              children: "Illinois"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "IN",
              children: "Indiana"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "IA",
              children: "Iowa"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "KS",
              children: "Kansas"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "KY",
              children: "Kentucky"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "LA",
              children: "Louisiana"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "ME",
              children: "Maine"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "MD",
              children: "Maryland"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "MA",
              children: "Massachusetts"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "MI",
              children: "Michigan"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "MN",
              children: "Minnesota"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "MS",
              children: "Mississippi"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "MO",
              children: "Missouri"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "MT",
              children: "Montana"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "NE",
              children: "Nebraska"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "NV",
              children: "Nevada"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "NH",
              children: "New Hampshire"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "NJ",
              children: "New Jersey"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "NM",
              children: "New Mexico"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "NY",
              children: "New York"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "NC",
              children: "North Carolina"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "ND",
              children: "North Dakota"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "OH",
              children: "Ohio"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "OK",
              children: "Oklahoma"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "OR",
              children: "Oregon"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "PA",
              children: "Pennsylvania"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "RI",
              children: "Rhode Island"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "SC",
              children: "South Carolina"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "SD",
              children: "South Dakota"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "TN",
              children: "Tennessee"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "TX",
              children: "Texas"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "UT",
              children: "Utah"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "VT",
              children: "Vermont"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "VA",
              children: "Virginia"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "WA",
              children: "Washington"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "WV",
              children: "West Virginia"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "WI",
              children: "Wisconsin"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: "WY",
              children: "Wyoming"
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "form-input-container",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
            htmlFor: "zip",
            children: "Zip:"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
            name: "zip",
            type: "text",
            onChange: function onChange(e) {
              return setZip(e.target.value);
            },
            value: zip
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
        type: "submit",
        value: "Send"
      })]
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormDealer);

/***/ }),

/***/ "./src/containers/FormEmail.js":
/*!*************************************!*\
  !*** ./src/containers/FormEmail.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var FormEmail = function FormEmail(_ref) {
  var blob = _ref.blob;

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
      _useState2 = _slicedToArray(_useState, 2),
      email = _useState2[0],
      setEmail = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
      _useState4 = _slicedToArray(_useState3, 2),
      errMessage = _useState4[0],
      setErrMessage = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      loading = _useState6[0],
      setLoading = _useState6[1];

  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      success = _useState8[0],
      setSuccess = _useState8[1];

  var submitForm = function submitForm(e) {
    e.preventDefault();
    setLoading(true);
    var bodyFormData = new FormData();
    bodyFormData.append("contact_email", email);
    bodyFormData.append("the_file", blob, "myboat.pdf");
    axios__WEBPACK_IMPORTED_MODULE_1___default()({
      method: "post",
      url: "http://localhost/wp-json/boat-builder/v1/email",
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(function (response) {
      setLoading(false);
      var data = response.data;

      if (data.status !== 200) {
        setErrMessage(data.message);
      } else {
        setErrMessage("");
        setSuccess(true);
      }
    }).catch(function (response) {
      setLoading(false);
      setErrMessage("There was some unknown Error, Please try again.");
    });
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: success ? "form-success active" : "form-success",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          className: "icon-container",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__.FaCheckCircle, {})
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h2", {
          className: "message",
          children: "Success! Email Sent."
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: loading ? "loader active" : "loader"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("form", {
      className: "formEmail",
      onSubmit: submitForm,
      children: [errMessage ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "form-error",
        children: errMessage
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "form-container",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "form-input-container",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
            htmlFor: "email",
            children: "Email:"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
            name: "email",
            type: "email",
            onChange: function onChange(e) {
              return setEmail(e.target.value);
            },
            value: email
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
        type: "submit",
        value: "Send"
      })]
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormEmail);

/***/ }),

/***/ "./src/containers/FormPopup.js":
/*!*************************************!*\
  !*** ./src/containers/FormPopup.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




var FormPopup = function FormPopup(_ref) {
  var isOpen = _ref.isOpen,
      onClose = _ref.onClose,
      children = _ref.children;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "form-popup ".concat(isOpen ? "active" : ""),
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "form-popup-center",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "form-popup-container",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
          className: "form-popup-close-btn",
          onClick: onClose,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__.FaTimes, {
            size: "20"
          })
        }), children]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "form-popup-bg",
      onClick: onClose
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormPopup);

/***/ }),

/***/ "./src/containers/SummaryButtons.js":
/*!******************************************!*\
  !*** ./src/containers/SummaryButtons.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _FormDealer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormDealer */ "./src/containers/FormDealer.js");
/* harmony import */ var _FormEmail__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FormEmail */ "./src/containers/FormEmail.js");
/* harmony import */ var _FormPopup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FormPopup */ "./src/containers/FormPopup.js");
/* harmony import */ var _react_pdf_renderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @react-pdf/renderer */ "./node_modules/@react-pdf/renderer/dist/react-pdf.browser.es.js");
/* harmony import */ var _pdf_PdfDocument__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../pdf/PdfDocument */ "./src/pdf/PdfDocument.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }











var SummaryButtons = function SummaryButtons() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      formPopup = _useState2[0],
      setFormPopup = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
      _useState4 = _slicedToArray(_useState3, 2),
      form = _useState4[0],
      setForm = _useState4[1];

  var closePopup = function closePopup(e) {
    e.preventDefault();
    setFormPopup(false);
    setForm(null);
  };

  var EmailPopup = function EmailPopup(e) {
    e.preventDefault();
    setFormPopup(true);
    setForm("email");
  };

  var DealerPopup = function DealerPopup(e) {
    e.preventDefault();
    setFormPopup(true);
    setForm("dealer");
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_4__.BlobProvider, {
    document: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_pdf_PdfDocument__WEBPACK_IMPORTED_MODULE_5__.default, {}),
    children: function children(_ref) {
      var blob = _ref.blob,
          url = _ref.url,
          loading = _ref.loading,
          error = _ref.error;
      return loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        children: "loading pdf..."
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "summary-btns",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
            className: "summary-btn-left",
            onClick: EmailPopup,
            children: "Send to My Email"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
            className: "summary-btn-center",
            onClick: DealerPopup,
            children: "Send to Dealer"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
            className: "summary-btn-right",
            href: url,
            download: "myboat",
            children: "Download"
          })]
        }), formPopup ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_FormPopup__WEBPACK_IMPORTED_MODULE_3__.default, {
          isOpen: formPopup,
          onClose: closePopup,
          children: form === "email" ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_FormEmail__WEBPACK_IMPORTED_MODULE_2__.default, {
            blob: blob
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_FormDealer__WEBPACK_IMPORTED_MODULE_1__.default, {
            blob: blob
          })
        }) : ""]
      });
    }
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SummaryButtons);

/***/ }),

/***/ "./src/pdf/PdfDocument.js":
/*!********************************!*\
  !*** ./src/pdf/PdfDocument.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @react-pdf/renderer */ "./node_modules/@react-pdf/renderer/dist/react-pdf.browser.es.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _helpers_formatMoney__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/formatMoney */ "./src/helpers/formatMoney.js");
/* harmony import */ var _state_reducers_choiceReducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/reducers/choiceReducer */ "./src/state/reducers/choiceReducer.ts");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../state */ "./src/state/index.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v36/TK3_WkUHHAIjg75cFRf3bXL8LICs1xZogUE.ttf"
});
_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.Font.register({
  family: "Montserrat",
  fonts: [{
    src: "https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_cJD7g4.ttf"
  }, {
    src: "https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_dJE7g4.ttf",
    fontWeight: 700
  }]
});
var styles = _react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 120,
    paddingHorizontal: 35
  },
  heading: {
    fontSize: 14,
    textAlign: "left",
    fontFamily: "Montserrat",
    fontWeight: 700,
    textTransform: "uppercase"
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Oswald",
    textTransform: "uppercase"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    padding: 4
  },
  bordered: {
    borderBottomColor: "#c7c7c7",
    borderBottomWidth: "2",
    borderBottomStyle: "solid"
  },
  column: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: 4
  },
  doubleColumn: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    flex: 3,
    padding: 4
  },
  text: {
    fontSize: 10,
    textAlign: "left",
    fontFamily: "Montserrat"
  },
  price: {
    fontSize: 13,
    fontFamily: "Montserrat",
    fontWeight: "bold",
    color: "#008af4",
    textAlign: "right"
  }
});

var PdfDoc = function PdfDoc(_ref) {
  var choices = _ref.choices,
      packaged = _ref.packaged,
      total = _ref.total,
      formData = _ref.formData;
  var grouped = {};
  choices.allIds.forEach(function (id) {
    var item = choices.byId[id];
    var pageId = item.pageId;

    if (!grouped[pageId]) {
      grouped[pageId] = [item];
    } else {
      grouped[pageId].push(item);
    }
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.Document, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.Page, {
      size: "LETTER",
      style: styles.body,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.Text, {
        style: styles.title,
        children: [formData.post.post_title, " Summary"]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.View, {
        style: _objectSpread(_objectSpread(_objectSpread({}, styles.row), styles.bordered), {}, {
          padding: 20
        }),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.View, {
          style: styles.column,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.Image, {
            src: formData.image
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.View, {
          style: styles.column,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.Text, {
            style: _objectSpread(_objectSpread({}, styles.text), {}, {
              textTransform: "uppercase"
            }),
            children: "Total"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.Text, {
            style: _objectSpread(_objectSpread({}, styles.price), {}, {
              textAlign: "left",
              fontSize: "30"
            }),
            children: ["$", (0,_helpers_formatMoney__WEBPACK_IMPORTED_MODULE_2__.default)(total(true))]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.Text, {
            style: _objectSpread(_objectSpread({}, styles.price), {}, {
              color: "#000000",
              textAlign: "left",
              fontSize: "16"
            }),
            children: "AVID ADVANTAGE PRICE"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.Text, {
            style: _objectSpread(_objectSpread({}, styles.price), {}, {
              fontWeight: "normal",
              color: "#5d5d5d",
              textAlign: "left",
              fontSize: "17"
            }),
            children: ["$", (0,_helpers_formatMoney__WEBPACK_IMPORTED_MODULE_2__.default)(total(false)), " MSRP"]
          })]
        })]
      }), formData.entities.pages.allIds.map(function (id, index) {
        var pageItem = formData.entities.pages.byId[id];

        if (grouped.hasOwnProperty(id)) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.View, {
            style: _objectSpread(_objectSpread({}, styles.row), styles.bordered),
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.View, {
              style: styles.column,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.Text, {
                style: styles.heading,
                children: pageItem.short
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.View, {
              style: styles.doubleColumn,
              children: grouped[id].map(function (item, index) {
                var isPackaged = packaged.allIds.includes(item.id);

                var choiceLabel = function choiceLabel(choice) {
                  if (!choice) return "";
                  return choice.label;
                };

                var section = formData.entities.sections.byId[item.sectionId];
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.View, {
                  style: styles.row,
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.View, {
                    style: styles.column,
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.View, {
                      style: {
                        display: "flex"
                      },
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.Text, {
                        style: styles.text,
                        children: pageItem.short === "colors" ? "".concat(section.label, " - ").concat(item.label) : item.label
                      }), item.quantity > 1 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.Text, {
                        style: _objectSpread(_objectSpread({}, styles.text), {}, {
                          fontWeight: "bold"
                        }),
                        children: " x ".concat(item.quantity)
                      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {})]
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.View, {
                    style: styles.column,
                    children: isPackaged ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.Text, {
                      style: _objectSpread(_objectSpread({}, styles.price), {}, {
                        fontSize: 8,
                        color: "#000000"
                      }),
                      children: ["Included in", " ", choiceLabel(choices.byId[packaged.byId[item.id].fromId])]
                    }) : item.discount ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.View, {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.Text, {
                        style: styles.price,
                        children: ["$", (0,_helpers_formatMoney__WEBPACK_IMPORTED_MODULE_2__.default)(item.discount)]
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.Text, {
                        style: _objectSpread(_objectSpread({}, styles.price), {}, {
                          fontSize: 8,
                          fontWeight: "normal",
                          color: "#5d5d5d"
                        }),
                        children: ["$", (0,_helpers_formatMoney__WEBPACK_IMPORTED_MODULE_2__.default)(item.price)]
                      })]
                    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.Text, {
                      style: styles.price,
                      children: ["$", (0,_helpers_formatMoney__WEBPACK_IMPORTED_MODULE_2__.default)(item.price)]
                    })
                  })]
                });
              })
            })]
          });
        }
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.View, {
        fixed: true,
        style: {
          position: "absolute",
          bottom: 35,
          left: 35,
          right: 35,
          textAlign: "center"
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.View, {
          style: _objectSpread(_objectSpread({}, styles.row), {}, {
            marginTop: 6
          }),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.Text, {
            style: _objectSpread(_objectSpread({}, styles.text), {}, {
              textAlign: "center"
            }),
            children: "Please note: prices do not include freight, prep, title, or other fees and incentives."
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.View, {
          style: styles.row,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.View, {
            style: styles.column,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.Image, {
              src: "https://avid-boats.com/wp-content/uploads/2021/09/avid-boat-logo-black.jpg"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.View, {
            style: styles.doubleColumn,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.Text, {
              style: _objectSpread(_objectSpread({}, styles.heading), {}, {
                fontFamily: "Oswald"
              }),
              children: "For Your Local Dealer Visit"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_0__.Text, {
              style: _objectSpread(_objectSpread({}, styles.heading), {}, {
                fontSize: 12
              }),
              children: "avid-boats.com/find-a-dealer/"
            })]
          })]
        })]
      })]
    })
  });
};

var PdfDocConnect = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.connect)(function (state) {
  return {
    choices: state.choices,
    packaged: state.packaged,
    total: (0,_state_reducers_choiceReducer__WEBPACK_IMPORTED_MODULE_3__.getTotalPrice)(state),
    formData: state.formData
  };
}, {})(PdfDoc);

var PdfDocWrap = function PdfDocWrap() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_redux__WEBPACK_IMPORTED_MODULE_1__.Provider, {
    store: _state__WEBPACK_IMPORTED_MODULE_4__.default,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(PdfDocConnect, {})
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PdfDocWrap);

/***/ }),

/***/ "?2e00":
/*!*******************************!*\
  !*** ./extend-node (ignored) ***!
  \*******************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?ec5d":
/*!***************************!*\
  !*** ./streams (ignored) ***!
  \***************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?0bed":
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=pdf-btns-d74061ce91c80b492698.js.map