(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// LICENSE : MIT
"use strict";
/*
    Simple EventEmitter
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = function () {
    function EventEmitter() {
        _classCallCheck(this, EventEmitter);

        this._handlers = {};
    }

    _createClass(EventEmitter, [{
        key: "on",
        value: function on(type, handler) {
            if (typeof this._handlers[type] === 'undefined') {
                this._handlers[type] = [];
            }

            this._handlers[type].push(handler);
        }
    }, {
        key: "emit",
        value: function emit(type, data) {
            var handlers = this._handlers[type] || [];
            for (var i = 0; i < handlers.length; i++) {
                var handler = handlers[i];
                handler.call(this, data);
            }
        }
    }, {
        key: "off",
        value: function off(type, handler) {
            var handlers = this._handlers[type] || [];
            for (var i = 0; i < handlers.length; i++) {
                var ownHandler = handlers[i];
                if (ownHandler === handler) {
                    handlers.splice(i, 1);
                }
            }
        }
    }]);

    return EventEmitter;
}();

exports.default = EventEmitter;

},{}],2:[function(require,module,exports){
// LICENSE : MIT
"use strict";

var _TodoListModel = require("./models/TodoListModel");

var _TodoListRendering = require("./views/TodoListRendering");

var _TodoListRendering2 = _interopRequireDefault(_TodoListRendering);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Entry Point
function onLoad() {
    // add event to DOM elements
    var form = document.getElementById("js-form");
    var inputTextArea = document.getElementById("js-form-input");
    var TODOListArea = document.getElementById("js-todo-list");

    var rendering = new _TodoListRendering2.default(TODOListArea);
    var todoListModel = new _TodoListModel.TodoListModel();
    var toggleComplete = function toggleComplete(_ref) {
        var id = _ref.id;
        var isCompleted = _ref.isCompleted;

        todoListModel.changeComplete({ id: id, isCompleted: isCompleted });
    };
    var addTodo = function addTodo(title) {
        if (title.length > 0) {
            todoListModel.addTodo({ title: title });
        }
    };
    form.addEventListener("submit", function (event) {
        // prevent submit action
        event.preventDefault();
        // try to add
        var text = inputTextArea.value;
        addTodo(text);
        inputTextArea.value = "";
    });

    var unbindHandler = todoListModel.onChange(function () {
        var todoItemList = todoListModel.getAllTodoList();
        console.log("change", todoItemList);

        rendering.render(todoItemList, {
            toggleComplete: toggleComplete
        });
    });
}
window.addEventListener("load", onLoad);

},{"./models/TodoListModel":3,"./views/TodoListRendering":4}],3:[function(require,module,exports){
// LICENSE : MIT
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TodoListModel = exports.TodoItemModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventEmitter2 = require("./../EventEmitter");

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// unique id
var todoIdx = 0;

var TodoItemModel = exports.TodoItemModel = function () {
    function TodoItemModel() {
        var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var title = _ref.title;
        var _ref$completed = _ref.completed;
        var completed = _ref$completed === undefined ? false : _ref$completed;

        _classCallCheck(this, TodoItemModel);

        this.id = todoIdx++;
        this.title = title;
        this.completed = completed;
    }

    _createClass(TodoItemModel, [{
        key: "isCompleted",
        get: function get() {
            return this.completed;
        }
    }]);

    return TodoItemModel;
}();
// model


var TodoListModel = exports.TodoListModel = function (_EventEmitter) {
    _inherits(TodoListModel, _EventEmitter);

    function TodoListModel() {
        var todoList = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

        _classCallCheck(this, TodoListModel);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TodoListModel).call(this));

        _this.todoList = todoList.map(function (todoItem) {
            return new TodoItemModel(todoItem);
        });
        return _this;
    }

    _createClass(TodoListModel, [{
        key: "getAllTodoList",
        value: function getAllTodoList() {
            return this.todoList;
        }
    }, {
        key: "onChange",
        value: function onChange(handler) {
            var _this2 = this;

            this.on("change", handler);
            return function () {
                _this2.off("change", handler);
            };
        }
    }, {
        key: "changeComplete",
        value: function changeComplete(_ref2) {
            var id = _ref2.id;
            var isCompleted = _ref2.isCompleted;

            // state change
            var todoItem = this.todoList.find(function (todo) {
                return todo.id === id;
            });
            if (!todoItem) {
                return;
            }
            todoItem.completed = isCompleted;
            this.emit("change");
        }
    }, {
        key: "addTodo",
        value: function addTodo(todo) {
            this.todoList.push(new TodoItemModel(todo));
            // emit change
            this.emit("change");
        }
    }]);

    return TodoListModel;
}(_EventEmitter3.default);

},{"./../EventEmitter":1}],4:[function(require,module,exports){
// LICENSE : MIT
"use strict";
// rendering

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TodoListRendering = function () {
    function TodoListRendering(containerNode) {
        _classCallCheck(this, TodoListRendering);

        this.containerNode = containerNode;
    }

    _createClass(TodoListRendering, [{
        key: "_createTodoElement",
        value: function _createTodoElement(todo, toggleComplete) {
            var todoItemList = document.createElement("li");
            var text = document.createTextNode(todo.title);
            var todoItemCheckBox = document.createElement("input");
            todoItemCheckBox.type = "checkbox";
            todoItemCheckBox.checked = todo.isCompleted;
            todoItemCheckBox.addEventListener("change", function (event) {
                var isCompleted = event.target.checked;
                toggleComplete({
                    id: todo.id,
                    isCompleted: isCompleted
                });
            });
            todoItemList.appendChild(todoItemCheckBox);
            todoItemList.appendChild(text);
            return todoItemList;
        }
    }, {
        key: "render",
        value: function render(todoItemList, _ref) {
            var _this = this;

            var toggleComplete = _ref.toggleComplete;

            var listTags = todoItemList.map(function (todoItem) {
                return _this._createTodoElement(todoItem, toggleComplete);
            });
            var orderListTag = document.createElement("ul");
            listTags.forEach(function (listTag) {
                return orderListTag.appendChild(listTag);
            });
            // clean up
            var range = document.createRange();
            range.selectNodeContents(this.containerNode);
            range.deleteContents();
            // render
            this.containerNode.appendChild(orderListTag);
        }
    }]);

    return TodoListRendering;
}();

exports.default = TodoListRendering;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvRXZlbnRFbWl0dGVyLmpzIiwic3JjL2luZGV4LmpzIiwic3JjL21vZGVscy9Ub2RvTGlzdE1vZGVsLmpzIiwic3JjL3ZpZXdzL1RvZG9MaXN0UmVuZGVyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0NBOzs7Ozs7Ozs7Ozs7O0lBSXFCO0FBQ2pCLGFBRGlCLFlBQ2pCLEdBQWM7OEJBREcsY0FDSDs7QUFDVixhQUFLLFNBQUwsR0FBaUIsRUFBakIsQ0FEVTtLQUFkOztpQkFEaUI7OzJCQUtkLE1BQU0sU0FBUztBQUNkLGdCQUFJLE9BQU8sS0FBSyxTQUFMLENBQWUsSUFBZixDQUFQLEtBQWdDLFdBQWhDLEVBQTZDO0FBQzdDLHFCQUFLLFNBQUwsQ0FBZSxJQUFmLElBQXVCLEVBQXZCLENBRDZDO2FBQWpEOztBQUlBLGlCQUFLLFNBQUwsQ0FBZSxJQUFmLEVBQXFCLElBQXJCLENBQTBCLE9BQTFCLEVBTGM7Ozs7NkJBUWIsTUFBTSxNQUFNO0FBQ2IsZ0JBQUksV0FBVyxLQUFLLFNBQUwsQ0FBZSxJQUFmLEtBQXdCLEVBQXhCLENBREY7QUFFYixpQkFBSyxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksU0FBUyxNQUFULEVBQWlCLEdBQXJDLEVBQTBDO0FBQ3RDLG9CQUFJLFVBQVUsU0FBUyxDQUFULENBQVYsQ0FEa0M7QUFFdEMsd0JBQVEsSUFBUixDQUFhLElBQWIsRUFBbUIsSUFBbkIsRUFGc0M7YUFBMUM7Ozs7NEJBTUEsTUFBTSxTQUFTO0FBQ2YsZ0JBQUksV0FBVyxLQUFLLFNBQUwsQ0FBZSxJQUFmLEtBQXdCLEVBQXhCLENBREE7QUFFZixpQkFBSyxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksU0FBUyxNQUFULEVBQWlCLEdBQXJDLEVBQTBDO0FBQ3RDLG9CQUFJLGFBQWEsU0FBUyxDQUFULENBQWIsQ0FEa0M7QUFFdEMsb0JBQUksZUFBZSxPQUFm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VyxhQUFhLEdBQWIsQ0FBaUIsb0JBQVk7QUFDMUMsdUJBQU8sTUFBSyxrQkFBTCxDQUF3QixRQUF4QixFQUFrQyxjQUFsQyxDQUFQLENBRDBDO2FBQVosQ0FBNUIsQ0FENkI7QUFJbkMsZ0JBQU0sZUFBZSxTQUFTLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBZixDQUo2QjtBQUtuQyxxQkFBUyxPQUFULENBQWlCO3VCQUFXLGFBQWEsV0FBYixDQUF5QixPQUF6QjthQUFYLENBQWpCOztBQUxtQyxnQkFPL0IsUUFBUSxTQUFTLFdBQVQsRUFBUixDQVArQjtBQVFuQyxrQkFBTSxrQkFBTixDQUF5QixLQUFLLGFBQUwsQ0FBekIsQ0FSbUM7QUFTbkMsa0JBQU0sY0FBTjs7QUFUbUMsZ0JBV25DLENBQUssYUFBTCxDQUFtQixXQUFuQixDQUErQixZQUEvQixFQVhtQzs7OztXQXZCdEIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gTElDRU5TRSA6IE1JVFxuXCJ1c2Ugc3RyaWN0XCI7XG4vKlxuICAgIFNpbXBsZSBFdmVudEVtaXR0ZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5faGFuZGxlcnMgPSB7fTtcbiAgICB9XG5cbiAgICBvbih0eXBlLCBoYW5kbGVyKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5faGFuZGxlcnNbdHlwZV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVyc1t0eXBlXSA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faGFuZGxlcnNbdHlwZV0ucHVzaChoYW5kbGVyKTtcbiAgICB9XG5cbiAgICBlbWl0KHR5cGUsIGRhdGEpIHtcbiAgICAgICAgdmFyIGhhbmRsZXJzID0gdGhpcy5faGFuZGxlcnNbdHlwZV0gfHwgW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGFuZGxlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBoYW5kbGVyID0gaGFuZGxlcnNbaV07XG4gICAgICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvZmYodHlwZSwgaGFuZGxlcikge1xuICAgICAgICB2YXIgaGFuZGxlcnMgPSB0aGlzLl9oYW5kbGVyc1t0eXBlXSB8fCBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoYW5kbGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIG93bkhhbmRsZXIgPSBoYW5kbGVyc1tpXTtcbiAgICAgICAgICAgIGlmIChvd25IYW5kbGVyID09PSBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8gTElDRU5TRSA6IE1JVFxuXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQge1RvZG9MaXN0TW9kZWx9IGZyb20gXCIuL21vZGVscy9Ub2RvTGlzdE1vZGVsXCI7XG5pbXBvcnQgVG9kb0xpc3RSZW5kZXJpbmcgZnJvbSBcIi4vdmlld3MvVG9kb0xpc3RSZW5kZXJpbmdcIlxuLy8gRW50cnkgUG9pbnRcbmZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAvLyBhZGQgZXZlbnQgdG8gRE9NIGVsZW1lbnRzXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianMtZm9ybVwiKTtcbiAgICBjb25zdCBpbnB1dFRleHRBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqcy1mb3JtLWlucHV0XCIpO1xuICAgIGNvbnN0IFRPRE9MaXN0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianMtdG9kby1saXN0XCIpO1xuXG4gICAgY29uc3QgcmVuZGVyaW5nID0gbmV3IFRvZG9MaXN0UmVuZGVyaW5nKFRPRE9MaXN0QXJlYSk7XG4gICAgY29uc3QgdG9kb0xpc3RNb2RlbCA9IG5ldyBUb2RvTGlzdE1vZGVsKCk7XG4gICAgY29uc3QgdG9nZ2xlQ29tcGxldGUgPSAoe2lkLCBpc0NvbXBsZXRlZH0pID0+IHtcbiAgICAgICAgdG9kb0xpc3RNb2RlbC5jaGFuZ2VDb21wbGV0ZSh7aWQsIGlzQ29tcGxldGVkfSlcbiAgICB9O1xuICAgIGNvbnN0IGFkZFRvZG8gPSAodGl0bGUpID0+IHtcbiAgICAgICAgaWYgKHRpdGxlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRvZG9MaXN0TW9kZWwuYWRkVG9kbyh7dGl0bGV9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldmVudCkgPT4ge1xuICAgICAgICAvLyBwcmV2ZW50IHN1Ym1pdCBhY3Rpb25cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy8gdHJ5IHRvIGFkZFxuICAgICAgICBjb25zdCB0ZXh0ID0gaW5wdXRUZXh0QXJlYS52YWx1ZTtcbiAgICAgICAgYWRkVG9kbyh0ZXh0KTtcbiAgICAgICAgaW5wdXRUZXh0QXJlYS52YWx1ZSA9IFwiXCI7XG4gICAgfSk7XG5cbiAgICBjb25zdCB1bmJpbmRIYW5kbGVyID0gdG9kb0xpc3RNb2RlbC5vbkNoYW5nZSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRvZG9JdGVtTGlzdCA9IHRvZG9MaXN0TW9kZWwuZ2V0QWxsVG9kb0xpc3QoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJjaGFuZ2VcIiwgdG9kb0l0ZW1MaXN0KTtcblxuICAgICAgICByZW5kZXJpbmcucmVuZGVyKHRvZG9JdGVtTGlzdCwge1xuICAgICAgICAgICAgdG9nZ2xlQ29tcGxldGVcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgb25Mb2FkKTsiLCIvLyBMSUNFTlNFIDogTUlUXG5cInVzZSBzdHJpY3RcIjtcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcIi4vLi4vRXZlbnRFbWl0dGVyXCI7XG4vLyB1bmlxdWUgaWRcbmxldCB0b2RvSWR4ID0gMDtcbmV4cG9ydCBjbGFzcyBUb2RvSXRlbU1vZGVsIHtcbiAgICBjb25zdHJ1Y3Rvcih7dGl0bGUsIGNvbXBsZXRlZCA9IGZhbHNlfSA9IHt9KSB7XG4gICAgICAgIHRoaXMuaWQgPSB0b2RvSWR4Kys7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSBjb21wbGV0ZWQ7XG4gICAgfVxuXG4gICAgZ2V0IGlzQ29tcGxldGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZWQ7XG4gICAgfVxufVxuLy8gbW9kZWxcbmV4cG9ydCBjbGFzcyBUb2RvTGlzdE1vZGVsIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3Rvcih0b2RvTGlzdCA9IFtdKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudG9kb0xpc3QgPSB0b2RvTGlzdC5tYXAodG9kb0l0ZW0gPT4gbmV3IFRvZG9JdGVtTW9kZWwodG9kb0l0ZW0pKTtcbiAgICB9XG5cbiAgICBnZXRBbGxUb2RvTGlzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9kb0xpc3Q7XG4gICAgfVxuXG4gICAgb25DaGFuZ2UoaGFuZGxlcikge1xuICAgICAgICB0aGlzLm9uKFwiY2hhbmdlXCIsIGhhbmRsZXIpO1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vZmYoXCJjaGFuZ2VcIiwgaGFuZGxlcik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY2hhbmdlQ29tcGxldGUoe2lkLCBpc0NvbXBsZXRlZH0pIHtcbiAgICAgICAgLy8gc3RhdGUgY2hhbmdlXG4gICAgICAgIGNvbnN0IHRvZG9JdGVtID0gdGhpcy50b2RvTGlzdC5maW5kKHRvZG8gPT4gdG9kby5pZCA9PT0gaWQpO1xuICAgICAgICBpZiAoIXRvZG9JdGVtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdG9kb0l0ZW0uY29tcGxldGVkID0gaXNDb21wbGV0ZWQ7XG4gICAgICAgIHRoaXMuZW1pdChcImNoYW5nZVwiKTtcbiAgICB9XG5cbiAgICBhZGRUb2RvKHRvZG8pIHtcbiAgICAgICAgdGhpcy50b2RvTGlzdC5wdXNoKG5ldyBUb2RvSXRlbU1vZGVsKHRvZG8pKTtcbiAgICAgICAgLy8gZW1pdCBjaGFuZ2VcbiAgICAgICAgdGhpcy5lbWl0KFwiY2hhbmdlXCIpO1xuICAgIH1cbn0iLCIvLyBMSUNFTlNFIDogTUlUXG5cInVzZSBzdHJpY3RcIjtcbi8vIHJlbmRlcmluZ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9kb0xpc3RSZW5kZXJpbmcge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lck5vZGUpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXJOb2RlID0gY29udGFpbmVyTm9kZTtcbiAgICB9XG5cbiAgICBfY3JlYXRlVG9kb0VsZW1lbnQodG9kbywgdG9nZ2xlQ29tcGxldGUpIHtcbiAgICAgICAgY29uc3QgdG9kb0l0ZW1MaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodG9kby50aXRsZSk7XG4gICAgICAgIGNvbnN0IHRvZG9JdGVtQ2hlY2tCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIHRvZG9JdGVtQ2hlY2tCb3gudHlwZSA9IFwiY2hlY2tib3hcIjtcbiAgICAgICAgdG9kb0l0ZW1DaGVja0JveC5jaGVja2VkID0gdG9kby5pc0NvbXBsZXRlZDtcbiAgICAgICAgdG9kb0l0ZW1DaGVja0JveC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXNDb21wbGV0ZWQgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgICAgIHRvZ2dsZUNvbXBsZXRlKHtcbiAgICAgICAgICAgICAgICBpZDogdG9kby5pZCxcbiAgICAgICAgICAgICAgICBpc0NvbXBsZXRlZFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIHRvZG9JdGVtTGlzdC5hcHBlbmRDaGlsZCh0b2RvSXRlbUNoZWNrQm94KTtcbiAgICAgICAgdG9kb0l0ZW1MaXN0LmFwcGVuZENoaWxkKHRleHQpO1xuICAgICAgICByZXR1cm4gdG9kb0l0ZW1MaXN0O1xuICAgIH1cblxuICAgIHJlbmRlcih0b2RvSXRlbUxpc3QsIHt0b2dnbGVDb21wbGV0ZX0pIHtcbiAgICAgICAgY29uc3QgbGlzdFRhZ3MgPSB0b2RvSXRlbUxpc3QubWFwKHRvZG9JdGVtID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVUb2RvRWxlbWVudCh0b2RvSXRlbSwgdG9nZ2xlQ29tcGxldGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qgb3JkZXJMaXN0VGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xuICAgICAgICBsaXN0VGFncy5mb3JFYWNoKGxpc3RUYWcgPT4gb3JkZXJMaXN0VGFnLmFwcGVuZENoaWxkKGxpc3RUYWcpKTtcbiAgICAgICAgLy8gY2xlYW4gdXBcbiAgICAgICAgdmFyIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgcmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKHRoaXMuY29udGFpbmVyTm9kZSk7XG4gICAgICAgIHJhbmdlLmRlbGV0ZUNvbnRlbnRzKCk7XG4gICAgICAgIC8vIHJlbmRlclxuICAgICAgICB0aGlzLmNvbnRhaW5lck5vZGUuYXBwZW5kQ2hpbGQob3JkZXJMaXN0VGFnKTtcbiAgICB9XG59Il19
