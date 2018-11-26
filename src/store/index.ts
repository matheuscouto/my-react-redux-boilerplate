import { Action, applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { ActionsObservable, combineEpics, createEpicMiddleware, StateObservable } from 'redux-observable';
import { Observable } from 'rxjs';

// REDUCERS AND EPICS EXPORTS

import appStateReducer, { epics as appStateEpics, init, IState as IAppStateState } from './app/state';
import appAuthReducer, { epics as appAuthEpics, IState as IAppAuthState } from './app/auth';

// STORE INTERFACE

export interface IRootState {
	appState: IAppStateState,
	appAuth: IAppAuthState,
}

// COMBINED REDUCERS

const rootReducer = combineReducers<IRootState>({
	appState: appStateReducer,
	appAuth: appAuthReducer,
});

// COMBINED EPICS

const rootEpic = combineEpics(
	appStateEpics,
	appAuthEpics,
);

export type Epic = (action$: ActionsObservable<Action<any>>, state$: StateObservable<IRootState>) => Observable<Action<any>>;
export type Selector<Value, Props = any> = (state: IRootState, props?: Props) => Value;

const epicMiddleware = createEpicMiddleware<any>();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(epicMiddleware)),
)

export default store;

epicMiddleware.run(rootEpic);

store.dispatch(init());
