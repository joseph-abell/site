export class Vector {
  x: number = 0;
  y: number = 0;

  constructor( x = 0, y = 0 ) {
    this.x = x;
    this.y = y;
  }

  add( v: { x?: number, y?: number, max?: number } ) {
    this.x = this.x + ( v.x || 0 );
    this.y = this.y + ( v.y || 0 );
  }

  subtract( v: { x?: number, y?: number } ) {
    this.x -= v.x;
    this.y -= v.y;
  }

  multiply( n: number ) {
    this.x *= n;
    this.y *= n;
  }

  divide( n: number ) {
    this.x = this.x / n;
    this.y = this.y / n;
  }

  mag() {
    return Math.sqrt( ( this.x * this.x ) + ( this.y * this.y ) )
  }

  normalize() {
    const m = this.mag();

    if ( m != 0 ) {
      this.divide( m );
    }
  }

  limit( max: number ) {
    const mag = this.mag();
    if ( mag > max ) {
      this.normalize()
      this.multiply( max );
    }
  }
}

