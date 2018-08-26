import * as React from 'react';

import { Route } from 'react-router-dom';

// Pages

import { ExamplePage } from './pages';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
				<Route exact path='/' component={ExamplePage} />
      </div>
    );
  }
}

export default App;
