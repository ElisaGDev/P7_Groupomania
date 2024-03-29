import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Permet de partager des données entre les noeuds descendants de l'arborescence
import { Provider } from "react-redux";
import { applyMiddleware, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { getUsers } from "./actions/users.actions";
import { BrowserRouter } from "react-router-dom";
import { getPosts } from "./actions/post.actions";
import "./styles/index.scss";
import "./styles/assets/fonts/Lato-Regular.ttf";

// Création du store
const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

store.dispatch(getUsers());
store.dispatch(getPosts());

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
