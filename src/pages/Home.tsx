import HomepageLayout from "../layouts/HomepageLayout";

const Home = () => {
  document.title = 'CV and Code Doodles, by Joseph Abell';

  return (
    <HomepageLayout>
      <p>I'm Joseph Abell, an Engineering Lead for Tesco Bank. I'm originally from York, England, but I'm now living in Newcastle. I spend my time learning the pipe organ, singing, and playing with my three kids. Life is full, just how I like it.</p>

      <div class="ctas">
        <ul>
          <li>
            <a class="button button-large" href="/cv">CV</a>
          </li>
          <li>
            <a class="button button-large" href="/doodles/themes">Themes</a>
          </li>
          <li>
            <a class="button button-large" href="/doodles">Doodles</a>
          </li>
        </ul>
      </div>
    </HomepageLayout>
  )
}

export default Home;
