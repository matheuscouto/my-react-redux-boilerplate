import * as React from 'react';
import { isEqual } from 'lodash';
import * as firebase from 'firebase';
import { database } from './firebase'

interface IProps {
    path: string;
    eventName?: 'value' | 'child_added';
    snapMap?: (snap: firebase.database.DataSnapshot) => any;
    errorMap?: (error: firebase.FirebaseError) => any;
    withRef?: (ref: firebase.database.Reference) => firebase.database.Reference | firebase.database.Query;
    children: (
        loading: boolean,
        error: any,
        data: any,
    ) => React.ReactNode;
}
interface IState {
    data: any;
    error: any;
    loading: boolean;
}
const defaultSnapMap = (dataSnapshot: firebase.database.DataSnapshot): any => dataSnapshot.val();
const defaultErrorMap = (error: firebase.FirebaseError): firebase.FirebaseError => error;
const defaultWithRef = (ref: firebase.database.Reference): firebase.database.Reference => ref;
export default class DatabaseObservable extends React.PureComponent<IProps, IState> {
    public state: IState = {
        data: null,
        error: null,
        loading: true,
    }
    private subscriptionCallback?: any;
    public componentDidMount() {
        this.subscribe(this.props)
    }
    public componentWillUnmount() {
        this.unsubscribe(this.props);
    }
    public componentDidUpdate(prevProps: IProps) {
        if (!isEqual(this.props.path, prevProps.path)) {
            this.unsubscribe(prevProps);
            this.setState({ data: null, error: null, loading: true })
            this.subscribe(this.props);
        }
    }
    public subscribe(props: IProps) {
        const { path, eventName } = props;
        this.subscriptionCallback = (dataSnapshot: firebase.database.DataSnapshot) => {
            const snapMap = this.props.snapMap || defaultSnapMap;
            const data = snapMap(dataSnapshot);
            this.setState({ data, error: null, loading: false })
        }
        
        const withRef = this.props.withRef || defaultWithRef;
        withRef(database().ref(path))
            .on(eventName || 'value', this.subscriptionCallback, (firebaseError: firebase.FirebaseError) => {
                const errorMap = this.props.errorMap || defaultErrorMap;
                const error = errorMap(firebaseError);
            this.setState({ data: null, error, loading: false })
        })
    }
    public unsubscribe(props: IProps) {
        const { path, eventName } = props;
        database().ref(path).off(eventName || 'value', this.subscriptionCallback);
    }
    public render() {
        return this.props.children(
					this.state.loading,
          this.state.error,
          this.state.data,
        );
    }
}