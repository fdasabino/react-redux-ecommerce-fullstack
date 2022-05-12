import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.min.css";

import { BrowserRouter } from "react-router-dom";

// store
const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// COMMENTS SECTION

//Using BrowserRouter to wrap the entire application;
