import { Point, Size } from "./geo";

type JQElement = JQuery<HTMLElement>;

export class Cursor {
  position: Point;
  element:  JQElement;
  size:     Size;

  constructor() {
    this.element = $("#cursor");
    this.position = new Point();
    this.set_pos(0, 0);
    this.size = new Size();
    this.set_size(32, 32);
  }

  el(): JQElement {
    return this.element;
  }

  set_pos(x: number, y: number) {
    this.position.set_pos(x, y);
    this.element.css("left", x);
    this.element.css("top",  y);
  }

  set_size(w: number, h: number) {
    this.size.set_size(w, h);
    this.element.css("width",  w + "px");
    this.element.css("height", h + "px");
  }

  move_to(pos: Point) {
    this.set_pos(pos.x, pos.y);
  }
}
