import { Point, Size } from "./geo";
import { Cursor      } from "./cursor";
import { Grid        } from "./grid";

type JQElement = JQuery<HTMLElement>;

export class Canvas {
  element: JQElement;
  cursor:  Cursor;
  grid:    Grid;

  constructor() {
    this.element = $("#canvas");
    this.cursor  = new Cursor();
    let sides    = this.sides();
    this.grid    = new Grid(
      new Point(sides.left, sides.top),
      new Size(sides.width, sides.height),
    );
    $(window).mousemove((event) => {
      let point = new Point(event.pageX, event.pageY)
      this.move_cursor_to(point);
    });
  }

  move_cursor_to(point: Point) {
    if (this.valid_cursor_position(point)) {
      let pos = this.grid.snap_point_to_grid(point);
      this.cursor.move_to(pos);
    }
  }

  valid_cursor_position(point: Point): boolean {
    let sides = this.sides();
    return (
      point.x >= sides.left && point.x <= sides.right &&
      point.y >= sides.top  && point.y <= sides.bottom
    );
  }

  sides(): ClientRect {
    return this.element.get(0).getBoundingClientRect();
  }
}
