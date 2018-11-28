import { initializeApp, auth, database } from 'firebase';
import { Observable } from 'rxjs';
import config from './firebase.config';

initializeApp(config);

export { auth, database };

// OBSERVABLE EXAMPLE

export const authStateObservable: Observable<{ uid: string } | null> = new Observable((observer) => {
	return auth().onAuthStateChanged(
		(user) => {
			observer.next(user ? { uid: user.uid } : null);
		},
		observer.error,
		observer.complete,
	);
});

// UPDATE USER PASSWORD EXAMPLE

export const updateUserPassword = async (newPassword:string):Promise<void> => {
	const user = auth().currentUser
	if(user) { await user.updatePassword(newPassword) }
}