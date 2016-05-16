/*
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 *
 *
 *
 */

"use strict";

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _slicedToArray = require("babel-runtime/helpers/sliced-to-array")["default"];

var _Map = require("babel-runtime/core-js/map")["default"];

var _Set = require("babel-runtime/core-js/set")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

var Documentation = (function () {
  function Documentation() {
    _classCallCheck(this, Documentation);

    this._props = new _Map();
    this._composes = new _Set();
    this._data = new _Map();
  }

  _createClass(Documentation, [{
    key: "addComposes",
    value: function addComposes(moduleName) {
      this._composes.add(moduleName);
    }
  }, {
    key: "set",
    value: function set(key, value) {
      this._data.set(key, value);
    }
  }, {
    key: "get",
    value: function get(key) {
      return this._data.get(key);
    }
  }, {
    key: "getPropDescriptor",
    value: function getPropDescriptor(propName) {
      var propDescriptor = this._props.get(propName);
      if (!propDescriptor) {
        this._props.set(propName, propDescriptor = {});
      }
      return propDescriptor;
    }
  }, {
    key: "toObject",
    value: function toObject() {
      var obj = {};

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _getIterator(this._data), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2);

          var key = _step$value[0];
          var value = _step$value[1];

          obj[key] = value;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (this._props.size > 0) {
        obj.props = {};
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = _getIterator(this._props), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _step2$value = _slicedToArray(_step2.value, 2);

            var name = _step2$value[0];
            var descriptor = _step2$value[1];

            obj.props[name] = descriptor;
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }

      if (this._composes.size > 0) {
        obj.composes = _Array$from(this._composes);
      }
      return obj;
    }
  }]);

  return Documentation;
})();

module.exports = Documentation;
