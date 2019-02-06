import { Point, Size       } from "./geo";
import { Block, BlockParam } from "./block";
import { JQElement         } from "./main";

const SETTINGS = {
  size: new Size(32, 32)
};

export class Cursor {
  position: Point;
  size:     Size;
  element:  JQElement;

  constructor(x: number, y: number) {
    this.element = $("#cursor");
    this.position = new Point();
    this.set_pos(x, y);
    this.size = new Size();
    this.set_size(
      SETTINGS.size.w,
      SETTINGS.size.h,
    );
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

  block(): Block {
    let param = new BlockParam();
    param.position = this.position.clone();
    param.size     = this.size.clone();
    param.color    = this.element.css("background-color");
    return new Block(param);
  }
}
