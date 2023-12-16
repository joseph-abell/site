import Footer from "../components/Footer";
import Menu from "../components/Menu";
import { useTheme } from "../Theme";

const HomepageLayout = ( { children }: any ) => {
  const [props] = useTheme();
  return (
    <>
      <header class={`${props.theme} header`}>
        <div class="container">
          <div class="primary">
            <nav class="logo nav-left"></nav>
            <Menu />
          </div>
          <div class="secondary">
            <div class="logo">Joseph Abell</div>
            <div class="tagline">Notes from Web Development</div>
          </div>
        </div>
      </header>
      <main class={`${props.theme} home main`}>
        <div class="container">{children}</div>
      </main>
      <Footer theme={props.theme} />
    </>
  );
};

export default HomepageLayout;
