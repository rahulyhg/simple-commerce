import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/integration/react'

import store ,{ persistor, history } from './store';
import AdminPanel from './Components/AdminPanel';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedRouter history={history}>
              <AdminPanel />
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
