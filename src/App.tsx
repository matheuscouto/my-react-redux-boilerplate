import * as React from 'react';
import { Switch, Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

// UI
import { Spin } from 'antd';

// Store
import { IRootState } from './store';
import { selectAuthStatus, AuthStatus } from './store/app/auth';

// Layouts
import { AppLayout } from './layouts';

// Pages
import {
  ExamplePage,
} from './pages';

import './App.less';

interface IReduxStateProps {
  authStatus: AuthStatus;
}

type IProps = IReduxStateProps & RouteComponentProps;

const stateMap = (state: IRootState): IReduxStateProps => ({
  authStatus: selectAuthStatus(state),
});

const App = (props: IProps) => {
  switch (props.authStatus) {
    case 'pristine': return (
      <div className="App">
        <Spin />
      </div>
    );

    case 'authenticated': return (
      <AppLayout>
        <Switch >
          <Route exact path="/" component={ExamplePage} />
          <Redirect to="/" />
        </Switch>
      </AppLayout>
    );

    default: return (
      <AppLayout>
        <Switch>
          <Route path="/auth" component={ExamplePage} />
          <Redirect to="/auth" />
        </Switch>
      </AppLayout>
    );
  }
}

export default connect<IReduxStateProps>(stateMap)(withRouter(App));
