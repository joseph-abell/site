import Footer from "../components/Footer";
import Menu from "../components/Menu";
import { useTheme } from "../Theme";

const DefaultTemplate = ( p: any ) => {
  const [props] = useTheme();

  const className = p.customBackground ? '' : 'container';
  const mainClassName = p.noMargin ? 'main-no-padding main' : 'main' 

  return (
    <>
      <header class={`${props.theme} header`}>
        <div class='container'>
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

      <main class={`${props.theme} ${mainClassName}`}>
        <div class={className}>{p.children}</div>
      </main>

      <Footer theme={props.theme} />
    </>
  );
};

export default DefaultTemplate;
