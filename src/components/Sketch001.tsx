import * as p5 from "p5";

const Sketch001 = () => {
  let x = 100;
  let y = 100;
  let width = 200;
  let height = 200;

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
        let num = Math.floor( p.random() * 4 )

        if ( num === 0 ) x = Math.min( x + 1, 200 );
        if ( num === 1 ) x = Math.max( x - 1, 0 );
        if ( num === 2 ) y = Math.min( y + 1, 200 );
        if ( num === 3 ) y = Math.max( y - 1, 0 );

        p.point( x, y )
      };
    };
    new p5( sketch, ref );
  };

  return <div ref={( el ) => createSketch( el )} />;
};

export default Sketch001;
