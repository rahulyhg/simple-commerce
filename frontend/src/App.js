import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux';

import store, { history } from './store';

import Header from './Components/Header/index';

import routes from './routes';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="site">
            <Header />
            <div className="content">
              {routes}
            </div>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
