import { Point, Size } from "./geo";
import { JQElement   } from "./main";

const BLOCK_TEMPLATE = $("#block-template");

export class BlockParam {
  position: Point;
  size:     Size;
  color:    string;
}

export class Block {
  position: Point;
  size:     Size;
  element:  JQElement;

  constructor(data: BlockParam) {
    this.position = data.position;
    this.size     = data.size;
    this.element  = BLOCK_TEMPLATE.clone();
    this.element.removeAttr("id");
    this.element.css("background-color", data.color);
    this.set_pos(this.position.x, this.position.y);
    this.set_size(this.size.w, this.size.h);
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

  is_same(other: Block): boolean {
    return this.position.is_same(other.position) && this.size.is_same(other.size);
  }

  remove() {
    this.element.remove();
  }
}
