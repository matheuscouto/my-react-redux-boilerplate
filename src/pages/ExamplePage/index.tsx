import * as React from 'react';

import { ExampleComponent } from '../../components';

import logo from '../../logo.svg';

const ExamplePage = () => {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <ExampleComponent />
    </div>
  );
}

export default ExamplePage;
