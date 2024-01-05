import DefaultLayout from "../layouts/DefaultLayout";

const Doodles = () => {
  document.title = 'Doodles - Joseph Abell';

  return (
    <DefaultLayout>
      <h1>Doodles</h1>

      <p>
        One of the things I really loved about the internet I grew up with with the whimsy of it all. Nowadays, everything is polished, edges sanded off, and a little bit boring. So here's a few fun experiments.
      </p>

      <ul>
        <li>
          <a href="/doodles/themes">Themes</a>
        </li>
        <li>
          <a href='/doodles/sketches'>P5.js Sketches</a>
        </li>
        <li>
          <a href='doodles/meds'>Medicine Tracker</a>
        </li>
      </ul>

    </DefaultLayout>
  )
};

export default Doodles;
