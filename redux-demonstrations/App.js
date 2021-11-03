import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Main from './src/components/Main';

export default function App() {
  return (
    <Provider store={createStore(reducers, applyMiddleware(thunk))}>
      <Main />
    </Provider>
  )
}
