import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import "./styles/main.scss";
import "jquery";
import "popper.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
