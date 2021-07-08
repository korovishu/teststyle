import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer';
import firebase from './firebase';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument({ getFirebase })),
);

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

export function RrfProvider(props) {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        {props.children}
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}
