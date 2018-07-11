import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/integration/react'

import store ,{ persistor, history } from './store';

import Header from './Components/Header';
import Footer from './Components/Footer';

import routes from './routes';
import FlashMessages from './Components/FlashMessages';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedRouter history={history}>
            <div className="site">
              <FlashMessages />
              <Header />
              <div className="content">
                {routes}
              </div>
              <Footer />
            </div>
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
