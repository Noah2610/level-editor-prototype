import { Point, Size } from "./geo";

export class Grid {
  position:  Point;
  size:      Size;
  cell_size: Size;

  constructor(point: Point, size: Size) {
    this.position  = point;
    this.size      = size;
    this.cell_size = new Size(32, 32);
  }

  snap_point_to_grid(point: Point): Point {
    let snapped_point = new Point(point.x - this.position.x, point.y - this.position.y);
    snapped_point.x = this.position.x + (
      snapped_point.x - (snapped_point.x % this.cell_size.w)
    );
    snapped_point.y = this.position.y + (
      snapped_point.y - (snapped_point.y % this.cell_size.h)
    );
    return snapped_point;
  }
}
