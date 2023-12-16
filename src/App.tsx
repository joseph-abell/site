import { ErrorBoundary, Suspense } from "solid-js";
import { Router, Route } from "@solidjs/router";

import './App.scss'

import Error from './components/Error';

import Home from './pages/Home';
import CV from './pages/CV';
import Doodles from './pages/Doodles';
import Themes from './pages/Themes';
import Sketches from './pages/Sketches';

import { ThemeProvider } from "./Theme";

const App = () => {
  return (
    <ErrorBoundary fallback={( error ) => <Error error={error} />}>
      <Suspense>
        <ThemeProvider theme="firefly">
          <Router>
            <Route path='/' component={Home} />
            <Route path='/cv' component={CV} />
            <Route path='/doodles' component={Doodles} />
            <Route path='/doodles/themes' component={Themes} />
            <Route path='/doodles/sketches' component={Sketches} />
          </Router>
        </ThemeProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
