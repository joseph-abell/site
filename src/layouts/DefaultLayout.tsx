import Footer from "../components/Footer";
import Menu from "../components/Menu";
import { useTheme } from "../Theme";

const DefaultTemplate = ( { children }: any ) => {
  const [props] = useTheme();

  return (
    <>
      <header class={`${props.theme} header`}>
        <div class="container">
          <div class="primary">
            <nav class="logo-small nav-left">
              <ul>
                <li>
                  <a href="/">JA</a>
                </li>
              </ul>
            </nav>
            <Menu />
          </div>
        </div>
      </header>

      <main class={`${props.theme} main`}>
        <div class="container">{children}</div>
      </main>

      <Footer theme={props.theme} />
    </>
  );
};

export default DefaultTemplate;
