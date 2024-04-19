import DefaultLayout from "../layouts/DefaultLayout";
import { useTheme } from "../Theme";

const Themes = () => {
  const [_, { setTheme }] = useTheme();
  document.title = 'Themes - Joseph Abell'

  return (
    <DefaultLayout>
      <h1>Themes</h1>

      <p>
        I love themes. I love a bit of whimsy in website development. I wish
        there was less professional, sleek and frankly boring designs out there,
        and more fun.
      </p>

      <p>
        I'm not a designer. Most of these designs were based on colour suggestions
        by a{" "}
        <a href="https://botsin.space/@randomColorContrasts" target="_blank">
          mastodon bot
        </a>
        . Blue was suggestted by ChatGPT, when the hype was at it's peak.
      </p>

      <div class="flex">
        <button onclick={() => setTheme?.( "blue" )}>Blue</button>
        <button onclick={() => setTheme?.( "bluedark" )}>Blue, Dark Theme</button>
        <button onclick={() => setTheme?.( "magenta" )}>Magenta</button>
        <button onclick={() => setTheme?.( "magentadark" )}>
          Magenta, Dark Theme
        </button>
        <button onclick={() => setTheme?.( "firefly" )}>Firefly</button>
        <button onclick={() => setTheme?.( "cabaret" )}>Cabaret</button>
        <button onclick={() => setTheme?.( "eucalyptus" )}>Eucalyptus</button>
      </div>
    </DefaultLayout>
  );
};

export default Themes;
