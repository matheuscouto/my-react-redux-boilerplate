import * as firebase from 'firebase';
import { Observable, Observer } from 'rxjs';

import config from '../config';

firebase.initializeApp(config.firebase);

export default firebase;

export type FirebaseDatabaseRef = firebase.database.Reference;
export type FirebaseDatabaseQuery = firebase.database.Query;
export type FirebaseDatabaseDataSnapshot = firebase.database.DataSnapshot;
export type FirebaseDatabaseError = firebase.FirebaseError;

export type FirebaseError = firebase.FirebaseError;

export interface FirebaseDatabaseObservableOptions<V, E = any> {
  eventName: 'value' | 'child_added' | 'child_changed' | 'child_moved';
  snapMap: (snap: FirebaseDatabaseDataSnapshot) => V;
  errorMap: (error: FirebaseDatabaseError | undefined) => E;
  withRef: (ref: FirebaseDatabaseRef) => FirebaseDatabaseRef | FirebaseDatabaseQuery;
  keepSynced?: boolean;
}

export const authStateObservable: Observable<{ uid: string } | null> = new Observable((observer) => {
	return firebase.auth().onAuthStateChanged(
		(user) => {
			observer.next(user ? { uid: user.uid } : null);
		},
		observer.error,
		observer.complete,
	);
});


const defaultDatabaseObservableOptions: FirebaseDatabaseObservableOptions<any> = {
  eventName: 'value',
  snapMap(snap: FirebaseDatabaseDataSnapshot) {
    return snap.val();
  },
  errorMap(error: FirebaseDatabaseError) {
    return error ? { error } : { finish: true };
  },
  withRef(ref: FirebaseDatabaseRef | FirebaseDatabaseQuery) {
    return ref;
  },
};

export function generateId(): string {
  return firebase.database().ref().push().key as string;
}

export function createDatabaseObservable<T>(
  path: string,
  optionsOverride: Partial<FirebaseDatabaseObservableOptions<T>> = {},
): Observable<T> {
  const {
    eventName,
    snapMap,
    errorMap,
    withRef,
    // keepSynced,
  }: FirebaseDatabaseObservableOptions<T> = {
    ...defaultDatabaseObservableOptions,
    ...optionsOverride,
  };            

  return Observable.create((observer: Observer<T>) => {
    const dataRef = withRef(firebase.database().ref(path));
    // if (keepSynced) { (dataRef as any).keepSynced(true); }

    const callback = dataRef.on(eventName, (snap: any) => {
      observer.next(snapMap(snap));
    }, (err?: FirebaseDatabaseError) => {
      observer.error(errorMap(err));
      observer.complete();
    });

    return () => {
      dataRef.off(eventName, callback);
    };
  });
}

export function getServerFunction<D = undefined, R = undefined>(
  functionName: string,
): (data: D) => Promise<{ data: R }> {
  return firebase.functions().httpsCallable(functionName);
}
