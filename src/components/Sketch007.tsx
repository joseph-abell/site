import * as p5 from "p5";
import { Vector } from '../helpers';

const Sketch = () => {
  let width = 200;
  let height = 200;

  let ball1 = {
    location: new Vector(10, 10),
    velocity: new Vector(1, 0),
    gravity: new Vector(0, 0.6),
  }
  let ball2 = {
    location: new Vector(5, 5),
    velocity: new Vector(1, 0),
    gravity: new Vector(0, 0.6)
  }
  let drag = 0.03;

  function reset(ball: any, location: Vector) {
    ball.location = location;
    ball.velocity = new Vector(1, 0);
    ball.gravity = new Vector(0, 0.6);
  }

  function clamp( p: any, v: any, drag: number, minX: number, maxX: number, maxY: number ) {
    if ( p.y >= maxY ) {
      p.y = maxY;
      v.y = ( -v.y ) + drag

      if ( v.x < 0 ) {
        v.x = Math.min( v.x + drag, 0 )
      }

      if ( v.x > 0 ) {
        v.x = Math.max( v.x - drag, 0 )
      }
    }

    if ( p.x > maxX ) {
      p.x = maxX;
      v.x = -v.x + drag;
    }

    if ( p.x < minX ) {
      p.x = minX;
      v.x = -v.x + drag;
    }
  }

  const createSketch = ( ref: HTMLDivElement ) => {
    const sketch = ( p: p5 ) => {

      p.setup = () => {
        const canvas = p.createCanvas( width, height );
        canvas.parent( ref );
        canvas.style( 'visibility', 'visible' );
        canvas.attribute( 'data-hidden', 'false' );

        p.background( 220 );
        p.stroke( 0 );
      };
      p.draw = () => {
        p.background( p.color( 'rgba(220, 220, 220, 0.1)' ) );
        ball1.velocity.add( ball1.gravity );
        ball1.location.add( ball1.velocity );
        ball2.velocity.add( ball2.gravity )
        ball2.location.add( ball2.velocity )

        clamp( ball1.location, ball1.velocity, drag, 10, 190, 190 );
        clamp( ball2.location, ball2.velocity, drag, 5, 195, 195 );

        if ( ball1.velocity.x === 0 ) reset(ball1, new Vector(10, 10));
        if ( ball2.velocity.x === 0 ) reset(ball2, new Vector(5, 5));

        p.ellipse( ball1.location.x, ball1.location.y, 20, 20, 0 )
        p.ellipse( ball2.location.x, ball2.location.y, 10, 10, 0 )
      };
    };
    new p5( sketch, ref );
  };

  return <div ref={( el ) => createSketch( el )} />;
};

export default Sketch;
