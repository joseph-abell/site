const Footer = ( props: { theme?: string } ) => {
  return (
    <footer class={`${props.theme || 'firefly'} footer`}>
      <div class="container footer-container">
        <div>Made with SolidJS by Joseph Abell</div>
      </div>
    </footer>
  );
};

export default Footer;
