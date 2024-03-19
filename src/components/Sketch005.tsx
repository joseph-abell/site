import * as p5 from "p5";
import { Vector } from '../helpers';

const Sketch = () => {
  let width = 200;
  let height = 200;

  let position = new Vector( 100, 100 );
  let mouse = new Vector();
  let velocity = new Vector( 0, 0 );
  let mass = 3;
  let topspeed = 5;

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
        mouse.x = p.mouseX;
        mouse.y = p.mouseY;

        mouse.subtract( position )
        mouse.normalize()
        mouse.divide( mass )
        velocity.add( mouse );
        velocity.limit( topspeed );
        position.add( velocity );

        p.ellipse( position.x, position.y, 10 );
        velocity.multiply( 0 )
      };
    };
    new p5( sketch, ref );
  };

  return <div ref={( el ) => createSketch( el )} />;
};

export default Sketch;
