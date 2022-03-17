import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { BrowserRouter as Router } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import App from "./Components/App";
import rootReducers from "./Reducers/rootReducers";

import "./index.css";

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename="/">
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
