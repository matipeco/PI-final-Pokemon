import React from 'react';
import ReactDOM from 'react-dom';
//1-Importo BrowserRouter, y ahora mi app tiene la capacidad de definir rutas 
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store'

import App from './App';

ReactDOM.render(

  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>

  , document.getElementById('root')
);


