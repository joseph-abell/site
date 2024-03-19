import * as p5 from "p5";
import { Vector } from '../helpers';

const Sketch = () => {
  let width = 200;
  let height = 200;
  let v = new Vector( 100, 100 );
  let step = 5;

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
        let num = Math.floor( p.random() * 8 )

        if ( num === 0 ) v.add( { x: step } )
        if ( num === 1 ) v.add( { x: step, y: step } )
        if ( num === 2 ) v.add( { x: -step } )
        if ( num === 3 ) v.add( { x: -step, y: step } )
        if ( num === 4 ) v.add( { y: step } )
        if ( num === 5 ) v.add( { y: -step } )
        if ( num === 6 ) v.add( { x: step, y: -step } )
        if ( num === 7 ) v.add( { x: -step, y: -step } )

        v.x = Math.min( Math.max( 0, v.x ), 200 );
        v.y = Math.min( Math.max( 0, v.y ), 200 );

        p.point( v.x, v.y )
      };
    };
    new p5( sketch, ref );
  };

  return <div ref={( el ) => createSketch( el )} />;
};

export default Sketch;
