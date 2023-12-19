import Sketch001 from "../components/Sketch001";
import Sketch002 from "../components/Sketch002";
import Sketch003 from '../components/Sketch003';
import Sketch004 from "../components/Sketch004";
import Sketch005 from '../components/Sketch005';
import Sketch006 from '../components/Sketch006';
import DefaultLayout from "../layouts/DefaultLayout";

const Sketches = () => {
  document.title = 'P5 Sketches - Joseph Abell'
  return (
    <DefaultLayout>
      <h1>P5.js Sketches</h1>

      <p>
        I've been following along with Daniel Shiffman's Nature of Code, where you use basic
        code to replicate nature. It's a lovely little computer science book. Here are my
        P5.js sketches I've made while following along with the book.
      </p>


      <h2>Random Walks</h2>
      <div style={{ display: 'flex', 'gap': '10px' }}>
        <div style={{ width: '200px' }}>
          <Sketch001 />
          <p>Orthagonal Random Walk</p>
        </div>
        <div style={{ width: '200px' }}>
          <Sketch002 />
          <p>8 way random walk with vectors</p>
        </div>
        <div style={{ width: '200px' }}>
          <Sketch003 />
          <p>Perlin noise</p>
        </div>

      </div>

      <h2>Vectors</h2>
      <div style={{ display: 'flex', 'gap': '10px' }}>
        <div style={{ width: '200px' }}>
          <Sketch004 />
          <p>Gravity</p>
        </div>
        <div style={{ width: '200px' }}>
          <Sketch005 />
          <p>Ball follows mouse</p>
        </div>
        <div style={{ width: '200px' }}>
          <Sketch006 />
          <p>Click sketch, then use WASD to control ball</p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Sketches;
