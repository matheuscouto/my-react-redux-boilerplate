import React from 'react';
import { Route } from 'react-router-dom';
import { ExamplePage } from './pages';

const App: React.FunctionComponent = () => {
  
  return (
    <div>
      <Route exact path='/' component={ExamplePage} />
    </div>
  );
}

export default App;
