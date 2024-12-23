"use strict";

var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");
var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");
var _filterInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/filter");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _forEachInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");
var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");
var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");
var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
var _stringify = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/json/stringify"));
var _urlSearchParams = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/url-search-params"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/esm/defineProperty"));
require("regenerator-runtime/runtime");
var _utils = require("./utils.js");
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context, _context2; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(t), !0)).call(_context, function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context2 = ownKeys(Object(t))).call(_context2, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
function main() {
  return _main.apply(this, arguments);
}
function _main() {
  return (_main = _asyncToGenerator(_regeneratorRuntime().mark(function A() {
    var token, challengeToken, incidentId, finalData, challengeElement, incidentElement, challengeResponse, errorData, errorMessage, urlParams, isMobileMode, response;
    return _regeneratorRuntime().wrap(function (A) {
      var _document$getElementB, _document$getElementB2;
      for (;;) {
        switch (A.prev = A.next) {
          case 0:
            (0, _utils.postMessageWithContentHeight)();
            (0, _utils.delayShowChallengeData)();
            A.prev = 2;
            challengeToken = (_document$getElementB = document.getElementById('challenge')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.value;
            incidentId = (_document$getElementB2 = document.getElementById('incident')) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.value;
            (0, _utils.setRunStatus)('⧗');
            A.next = 8;
            return (0, _utils.runChallenge)();
          case 8:
            challengeResponse = A.sent;
            (0, _utils.setRunStatus)('✔');
            token = challengeResponse.token;
            finalData = _objectSpread(_objectSpread({}, challengeResponse), {}, {
              error: ''
            });
            A.next = 21;
            break;
          case 14:
            A.prev = 14;
            A.t0 = A.catch(2);
            console.error(A.t0);
            (0, _utils.setRunStatus)('✖');
            errorData = {
              level: 'critical',
              build_ts: '2024-10-15T09:22:43.174Z',
              lib_version: '0.3.2',
              challenge_id: (0, _utils.asString)(incidentId, 128),
              user_agent: (0, _utils.asString)(window.navigator.userAgent, 384),
              url: (0, _utils.asString)(window.location.href, 512),
              client_ts: new Date().toISOString()
            };
            if (A.t0 instanceof Error) {
              errorData.message = (0, _utils.asString)(A.t0.message, 256);
              errorMessage = A.t0.stack;
              errorData.stack_trace = (0, _utils.asString)(typeof errorMessage === 'string' ? errorMessage.split(window.location.href).join('') : errorMessage, 1024);
            } else {
              errorData.message = (0, _utils.asString)(A.t0, 1024);
            }
            finalData = {
              token: challengeToken,
              fp: '',
              error: (0, _stringify.default)(errorData)
            };
            break;
          case 21:
            urlParams = new _urlSearchParams.default(document.location.search);
            isMobileMode = urlParams.get(MODE_PARAM) === MOBILE_MODE;
            A.next = 25;
            return (0, _utils.sendCandidate)(finalData);
          case 25:
            response = A.sent;
            if (isMobileMode) {
              (0, _utils.handleMobile)(response);
            } else {
              (0, _utils.handleWeb)(response, token);
            }
          case 'end':
            return A.stop();
        }
      }
    }, A, null, [[2, 14]]);
  }))).apply(this, arguments);
}
window.addEventListener('load', main);

// Цель антибота - определить, является ли пользователь ботом или же человеком.

// после загрузки страницы вызывается функция main
// в бесконечном цикле оператор switch
// в кейсе 0 вызывается postMessageWithContentHeight для отправки сообщения с высотой контента
// затем вызывается функция delayShowChallengeData - вероятно, задержка данных

// в переменные challengeToken и incidentId (если они найдены по ID) попадают значения или undefined
// статус выполнения устанавливается в "ожидание" или "⧗"
// возвращается вызов функции runChallenge, которая запускает некое действие, челлендж
// благодаря бесконечному циклу switch срабатывает снова, хотя в предыдущей строке был осуществлен выход из него

// если runChallenge отрабатывает успешно, устанавливается статус "✔"
// переменной присваивается токен
// формируется объект с конечными данными челленджа
// формируется объект с url-параметрами
// определяется, мобильный ли режим
// sendCandidate отправляет данные о кандидате с конечными данными в качестве аргумента
// в переменную response записывается ответ и в зависимости от режима передается в функцию для мобильного или веб-режима
// после в кейсе "end" вызывается метод stop

// если же runChallenge отрабатывает с ошибкой, устанавливается статус "✖"
// формируется объект с данными об ошибке и объект с конечными данными со свойством error, в которое передается объект с данными о ней в строчном представлении
