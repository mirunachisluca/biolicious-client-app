import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { ContextWrapper } from './context/ContextWrapper';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextWrapper>
        <App />
      </ContextWrapper>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
