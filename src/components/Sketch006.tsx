import * as p5 from "p5";
import { Vector } from '../helpers';



const Sketch005 = () => {
  let width = 200;
  let height = 200;

  let position = new Vector( 100, 100 );
  let velocity = new Vector( 1.1, 1.1 );
  let topspeed = 5;

  function keyPressed( p: { key?: string } ) {
    if ( p.key === 'w' ) velocity.add( { y: -1 } )
    if ( p.key === 's' ) velocity.add( { y: 1 } )
    if ( p.key === 'a' ) velocity.add( { x: -1 } )
    if ( p.key === 'd' ) velocity.add( { x: 1 } )
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
        keyPressed( p );
        velocity.limit( topspeed );
        position.add( velocity );

        position.x = Math.min( Math.max( 0, position.x ), 200 );
        position.y = Math.min( Math.max( 0, position.y ), 200 );

        p.ellipse( position.x, position.y, 10 );
      };
    };
    new p5( sketch, ref );
  };

  return <div ref={( el ) => createSketch( el )} />;
};

export default Sketch005;
