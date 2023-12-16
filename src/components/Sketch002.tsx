import * as p5 from "p5";
import { Vector } from '../helpers';

const Sketch002 = () => {
  let width = 200;
  let height = 200;
  let v = new Vector( 100, 100 );

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

        if ( num === 0 ) v.add( { x: 2 } )
        if ( num === 1 ) v.add( { x: 2, y: 2 } )
        if ( num === 2 ) v.add( { x: -2 } )
        if ( num === 3 ) v.add( { x: -2, y: 2 } )
        if ( num === 4 ) v.add( { y: 2 } )
        if ( num === 5 ) v.add( { y: -2 } )
        if ( num === 6 ) v.add( { x: 2, y: -2 } )
        if ( num === 7 ) v.add( { x: -2, y: -2 } )

        p.point( v.x, v.y )
      };
    };
    new p5( sketch, ref );
  };

  return <div ref={( el ) => createSketch( el )} />;
};

export default Sketch002;
