import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

const ThemeContext = createContext<[{ theme: string }, { setTheme: Function }]>(
  [
    { theme: "firefly" },
    {
      setTheme: ( t: string ): void => undefined,
    },
  ]
);

export const ThemeProvider = ( props: { theme?: string; children: any } ) => {
  const defaultTheme = sessionStorage.getItem( "theme" ) || props.theme;

  const [state, setState] = createStore( { theme: defaultTheme } );

  return (
    <ThemeContext.Provider
      value={[
        state,
        {
          setTheme( t: string ) {
            sessionStorage.setItem( "theme", t );
            setState( "theme", t );
          },
        },
      ]}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext( ThemeContext );
