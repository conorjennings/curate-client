import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// Required to manage user sessions. Need to track if a user is authenticated.
import { combineReducers, createStore } from 'redux';
import { sessionService, sessionReducer } from 'redux-react-session';

import './index.css';
// Required to get Materiaui-UI working
import injectTapEventPlugin from 'react-tap-event-plugin';

// Add the sessionReducer
const reducer = combineReducers({
  session: sessionReducer
});

const store = createStore(reducer);
const options = { redirectPath: '/sign-in' };

// Init the session service
sessionService.initSessionService(store, options);

injectTapEventPlugin();


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

export default store;
