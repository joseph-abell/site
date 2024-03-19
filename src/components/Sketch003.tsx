import * as p5 from "p5";
import { Vector } from '../helpers';

const Sketch = () => {
  let width = 200;
  let height = 200;
  let v = new Vector( 100, 100 );
  let xOff = 0;
  let yOff = 100;

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
        let num = p.noise( xOff ) - 0.5;
        let num2 = p.noise( yOff ) - 0.5;

        xOff = xOff + 0.01;
        yOff = yOff + 0.01;
        v.add( { x: num, y: num2 } )
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
