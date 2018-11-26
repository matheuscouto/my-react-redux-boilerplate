import { combineEpics } from 'redux-observable';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { filter, mergeMap, map } from 'rxjs/operators';

import { Epic, Selector } from '..';
import { authStateObservable } from '../../services/firebase';

import { init } from './state';

export type AuthStatus =
  | 'pristine'
  | 'guest'
  | 'authenticated';

// ACTIONS

const actionCreator = actionCreatorFactory('APP::AUTH');
export const fetchAuthState = actionCreator<{ uid: string | null }>('FETCH_AUTH_STATE');

// STATE

export interface IState {
  status: AuthStatus;
  uid?: string | null;
}

const INITIAL_STATE: IState = {
  status: 'pristine',
};

// REDUCER

export default reducerWithInitialState(INITIAL_STATE)
	.case(fetchAuthState, (state: IState, { uid }) => ({
    ...state,
    status: uid ? 'authenticated' : 'guest',
		uid,
	}))
  .build();
  
// SELECTORS

export const selectIsAuthenticated: Selector<boolean> = ({ appAuth }) => !!appAuth.uid;
export const selectAuthStatus: Selector<AuthStatus> = ({ appAuth }) => appAuth.status;

// EFFECTS

const observeFirebaseAuthStateEpic: Epic = (action$) => action$.pipe(
  filter(init.match),
  mergeMap(() => authStateObservable.pipe(
    map((user) => fetchAuthState({ uid: user ? user.uid : null }))
  )),
);

export const epics = combineEpics(
  observeFirebaseAuthStateEpic,
);
