(function () {
    var defines = {};
    var entry = [null];
    function define(name, dependencies, factory) {
        defines[name] = { dependencies: dependencies, factory: factory };
        entry[0] = name;
    }
    define("require", ["exports"], function (exports) {
        Object.defineProperty(exports, "__cjsModule", { value: true });
        Object.defineProperty(exports, "default", { value: function (name) { return resolve(name); } });
    });
    define("geo", ["require", "exports"], function (require, exports) {
        "use strict";
        exports.__esModule = true;
        var Point = /** @class */ (function () {
            function Point(x, y) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                this.x = x;
                this.y = y;
            }
            Point.prototype.set_pos = function (x, y) {
                this.set_x(x);
                this.set_y(y);
            };
            Point.prototype.set_x = function (val) {
                this.x = val;
            };
            Point.prototype.set_y = function (val) {
                this.y = val;
            };
            return Point;
        }());
        exports.Point = Point;
        var Size = /** @class */ (function () {
            function Size(w, h) {
                if (w === void 0) { w = 0; }
                if (h === void 0) { h = 0; }
                this.w = w;
                this.h = h;
            }
            Size.prototype.set_size = function (w, h) {
                this.set_w(w);
                this.set_h(h);
            };
            Size.prototype.set_w = function (w) {
                this.w = w;
            };
            Size.prototype.set_h = function (h) {
                this.h = h;
            };
            return Size;
        }());
        exports.Size = Size;
    });
    define("cursor", ["require", "exports", "geo"], function (require, exports, geo_1) {
        "use strict";
        exports.__esModule = true;
        var Cursor = /** @class */ (function () {
            function Cursor() {
                this.element = $("#cursor");
                this.position = new geo_1.Point();
                this.set_pos(0, 0);
                this.size = new geo_1.Size();
                this.set_size(32, 32);
            }
            Cursor.prototype.el = function () {
                return this.element;
            };
            Cursor.prototype.set_pos = function (x, y) {
                this.position.set_pos(x, y);
                this.element.css("left", x);
                this.element.css("top", y);
            };
            Cursor.prototype.set_size = function (w, h) {
                this.size.set_size(w, h);
                this.element.css("width", w + "px");
                this.element.css("height", h + "px");
            };
            Cursor.prototype.move_to = function (pos) {
                this.set_pos(pos.x, pos.y);
            };
            return Cursor;
        }());
        exports.Cursor = Cursor;
    });
    define("grid", ["require", "exports", "geo"], function (require, exports, geo_2) {
        "use strict";
        exports.__esModule = true;
        var Grid = /** @class */ (function () {
            function Grid(point, size) {
                this.position = point;
                this.size = size;
                this.cell_size = new geo_2.Size(32, 32);
            }
            Grid.prototype.snap_point_to_grid = function (point) {
                var snapped_point = new geo_2.Point(point.x - this.position.x, point.y - this.position.y);
                snapped_point.x = this.position.x + (snapped_point.x - (snapped_point.x % this.cell_size.w));
                snapped_point.y = this.position.y + (snapped_point.y - (snapped_point.y % this.cell_size.h));
                return snapped_point;
            };
            return Grid;
        }());
        exports.Grid = Grid;
    });
    define("canvas", ["require", "exports", "geo", "cursor", "grid"], function (require, exports, geo_3, cursor_1, grid_1) {
        "use strict";
        exports.__esModule = true;
        var Canvas = /** @class */ (function () {
            function Canvas() {
                var _this = this;
                this.element = $("#canvas");
                this.cursor = new cursor_1.Cursor();
                var sides = this.sides();
                this.grid = new grid_1.Grid(new geo_3.Point(sides.left, sides.top), new geo_3.Size(sides.width, sides.height));
                $(window).mousemove(function (event) {
                    var point = new geo_3.Point(event.pageX, event.pageY);
                    _this.move_cursor_to(point);
                });
            }
            Canvas.prototype.move_cursor_to = function (point) {
                if (this.valid_cursor_position(point)) {
                    var pos = this.grid.snap_point_to_grid(point);
                    this.cursor.move_to(pos);
                }
            };
            Canvas.prototype.valid_cursor_position = function (point) {
                var sides = this.sides();
                return (point.x >= sides.left && point.x <= sides.right &&
                    point.y >= sides.top && point.y <= sides.bottom);
            };
            Canvas.prototype.sides = function () {
                return this.element.get(0).getBoundingClientRect();
            };
            return Canvas;
        }());
        exports.Canvas = Canvas;
    });
    define("main", ["require", "exports", "canvas"], function (require, exports, canvas_1) {
        "use strict";
        exports.__esModule = true;
        var CANVAS = new canvas_1.Canvas();
    });
    
    'marker:entry';

    function get_define(name) {
        if (defines[name]) {
            return defines[name];
        }
        else if (defines[name + '/index']) {
            return defines[name + '/index'];
        }
        else {
            var dependencies = ['exports'];
            var factory = function (exports) {
                try {
                    Object.defineProperty(exports, "__cjsModule", { value: true });
                    Object.defineProperty(exports, "default", { value: require(name) });
                }
                catch (_a) {
                    throw Error(['module ', name, ' not found.'].join(''));
                }
            };
            return { dependencies: dependencies, factory: factory };
        }
    }
    var instances = {};
    function resolve(name) {
        if (instances[name]) {
            return instances[name];
        }
        if (name === 'exports') {
            return {};
        }
        var define = get_define(name);
        instances[name] = {};
        var dependencies = define.dependencies.map(function (name) { return resolve(name); });
        define.factory.apply(define, dependencies);
        var exports = dependencies[define.dependencies.indexOf('exports')];
        instances[name] = (exports['__cjsModule']) ? exports["default"] : exports;
        return instances[name];
    }
    if (entry[0] !== null) {
        return resolve(entry[0]);
    }
})();