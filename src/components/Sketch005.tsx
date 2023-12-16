import * as p5 from "p5";
import { Vector } from '../helpers';

const Sketch005 = () => {
  let width = 200;
  let height = 200;

  let position = new Vector( 10, 10 );
  let mouse = new Vector();
  let velocity = new Vector( 0, 0 );

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
        p.background( 220 );
        mouse.x = p.mouseX;
        mouse.y = p.mouseY;

        mouse.subtract( position )
        mouse.normalize()
        mouse.multiply( 0.3 )
        velocity.add( mouse );
        velocity.limit( 5 );
        position.add( velocity );

        // velocity.add( { x: position.x - p.mouseX, y: position.y - p.mouseY } )
        // position.add( velocity );
        p.ellipse( position.x, position.y, 10 );
      };
    };
    new p5( sketch, ref );
  };

  return <div ref={( el ) => createSketch( el )} />;
};

export default Sketch005;
