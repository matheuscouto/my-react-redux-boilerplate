import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

// CSS IMPORTS
import './App.css';
import './index.css';

import store from './store'

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
