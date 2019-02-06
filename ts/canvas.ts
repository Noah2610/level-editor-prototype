import { Point, Size } from "./geo";
import { Cursor      } from "./cursor";
import { Grid        } from "./grid";
import { Block       } from "./block";

type JQElement = JQuery<HTMLElement>;

export class Canvas {
  element: JQElement;
  cursor:  Cursor;
  grid:    Grid;
  blocks:  Block[];

  constructor() {
    this.element = $("#canvas");
    let sides    = this.sides();
    let point    = new Point(sides.left, sides.top);
    this.cursor  = new Cursor(point.x, point.y);
    this.grid    = new Grid(
      point,
      new Size(sides.width, sides.height),
    );
    this.blocks = [];

    this.setup_event_listeners();
  }

  setup_event_listeners() {
    // Mouse move - move cursor
    $(window).mousemove((event) => {
      let point = new Point(event.pageX, event.pageY)
      this.move_cursor_to(point);
    });
    $(window).click((event) => {
      switch (event.which) {
        case 1:  // Mouse left-click - place block
          this.place_block();
          break;
        case 3:  // Mouse right-click - remove block
          this.remove_block();
          break;
      }
    });
    // Disable context menu
    $(window).contextmenu((event) => {
      event.preventDefault();
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

  place_block() {
    let block = this.cursor.block();
    if (!this.has_identical_block(block)) {
      this.element.append(block.element);
      this.blocks.push(block);
    }
  }

  remove_block() {
    let block   = this.cursor.block();
    this.blocks = this.blocks.filter((b) => {
      if (block.is_same(b)) {
        b.remove();
        return false;
      } else {
        return true;
      }
    });
  }

  sides(): ClientRect {
    return this.element.get(0).getBoundingClientRect();
  }

  has_identical_block(block: Block): boolean {
    return this.get_identical_blocks(block).length > 0;
  }

  get_identical_blocks(block: Block): Block[] {
    return this.blocks.filter((other) => {
      return block.is_same(other);
    });
  }
}
