import * as React from 'react';

import logo from '../../logo.svg';

class ExamplePage extends React.PureComponent {
	public render() {
		return(
			<div>
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<p className="App-intro">
					To get started, edit <code>src/App.tsx</code> and save to reload.
				</p>
			</div>
		);
	}
}

export default ExamplePage;