import * as p5 from "p5";
import { Vector } from '../helpers';

const Sketch004 = () => {
  let width = 200;
  let height = 200;

  let position = new Vector( 10, 10 );
  let velocity = new Vector( 1, 0 );
  let gravity = new Vector( 0, 0.6 );
  let drag = 0.03;

  function reset() {
    position = new Vector( 10, 10 );
    velocity = new Vector( 1, 0 );
    gravity = new Vector( 0, 0.6 );
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
      v.x = -velocity.x + drag;
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
        velocity.add( gravity );
        position.add( velocity );

        clamp( position, velocity, drag, 10, 190, 190 );

        p.rect( 0, 0, velocity.mag() * 10, 2 )

        if ( velocity.x === 0 ) reset();

        p.ellipse( position.x, position.y, 20, 20, 0 )
      };
    };
    new p5( sketch, ref );
  };

  return <div ref={( el ) => createSketch( el )} />;
};

export default Sketch004;
