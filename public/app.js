webpackJsonp([0],{

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _inferno = __webpack_require__(0);

var _inferno2 = _interopRequireDefault(_inferno);

var _infernoMobx = __webpack_require__(3);

var _mobx = __webpack_require__(4);

var _mycomponent = __webpack_require__(5);

var _mycomponent2 = _interopRequireDefault(_mycomponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var englishStore = (0, _mobx.observable)({
  title: 'Hello World!!!!'
});

var frenchStore = (0, _mobx.observable)({
  title: 'Bonjour tout le monde'
});

var createVNode = _inferno2.default.createVNode;
_inferno2.default.render(createVNode(16, _infernoMobx.Provider, {
  'englishStore': englishStore,
  'frenchStore': frenchStore,
  children: createVNode(16, _mycomponent2.default)
}), document.getElementById('root'));

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _inferno = __webpack_require__(0);

var _inferno2 = _interopRequireDefault(_inferno);

var _infernoComponent = __webpack_require__(1);

var _infernoComponent2 = _interopRequireDefault(_infernoComponent);

var _infernoMobx = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var createVNode = _inferno2.default.createVNode;
var Main = (_dec = (0, _infernoMobx.connect)(['englishStore', 'frenchStore']), _dec(_class = function (_Component) {
  _inherits(Main, _Component);

  function Main() {
    _classCallCheck(this, Main);

    return _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).apply(this, arguments));
  }

  _createClass(Main, [{
    key: 'render',
    value: function render(_ref) {
      var englishStore = _ref.englishStore,
          frenchStore = _ref.frenchStore;

      return createVNode(2, 'div', null, [createVNode(2, 'p', null, englishStore.title), createVNode(2, 'p', null, frenchStore.title)]);
    }
  }]);

  return Main;
}(_infernoComponent2.default)) || _class);
exports.default = Main;

/***/ })

},[14]);