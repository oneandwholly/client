import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter, Router, Route, Link, Switch } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import reduxThunk from 'redux-thunk';

import reducers from './rootReducer';
// import history from './history';
import { Auth, AUTH_USER } from './modules/auth';
import { Create } from './modules/create';
import BottomNav from './components/bottomNav';

// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
// const store = createStoreWithMiddleware(reducers);

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(reduxThunk)
));

const token = localStorage.getItem('token');

if (token) {
    store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <BrowserRouter history={history}>
      <div>
        <Route path='/' exact component={Auth} />
        <Route path='/create' exact component={Create} />
        <BottomNav />
        </div>
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>
  , document.querySelector('.container'));
