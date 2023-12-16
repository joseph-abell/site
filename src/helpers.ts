export class Vector {
  x: number = 0;
  y: number = 0;

  constructor( x = 0, y = 0 ) {
    this.x = x;
    this.y = y;
  }

  add( v: { x?: number, y?: number, max?: number } ) {
    const x = v.x || 0;
    const y = v.y || 0;
    const max = v.max || 200;
    this.x = this.x + ( x || 0 );
    this.y = this.y + ( y || 0 );
    this.x = this.x + ( x || 0 );
    if ( this.x < 0 ) this.x = 0;
    if ( this.x > max ) this.x = max;
    this.y = this.y + ( y || 0 );
    if ( this.y < 0 ) this.y = 0;
    if ( this.y > max ) this.y = max;
  }
}

