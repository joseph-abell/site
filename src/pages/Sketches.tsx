import Sketch001 from "../components/Sketch001";
import Sketch002 from "../components/Sketch002";
import Sketch003 from '../components/Sketch003';
import Sketch004 from "../components/Sketch004";
import Sketch005 from '../components/Sketch005';
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
      <p style={{ display: 'flex', 'gap': '10px' }}>
        <Sketch001 />
        <Sketch002 />
        <Sketch003 />
      </p>

      <h2>Vectors</h2>
      <p style={{ display: 'flex', 'gap': '10px' }}>
        <Sketch004 />
        <Sketch005 />
      </p>
    </DefaultLayout>
  );
};

export default Sketches;
