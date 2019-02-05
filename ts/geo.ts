export class Point {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  set_pos(x: number, y: number) {
    this.set_x(x);
    this.set_y(y);
  }
  set_x(val: number) {
    this.x = val;
  }
  set_y(val: number) {
    this.y = val;
  }
}

export class Size {
  w: number;
  h: number;

  constructor(w: number = 0, h: number = 0) {
    this.w = w;
    this.h = h;
  }

  set_size(w: number, h: number) {
    this.set_w(w);
    this.set_h(h);
  }
  set_w(w: number) {
    this.w = w;
  }
  set_h(h: number) {
    this.h = h;
  }
}
