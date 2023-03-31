import React, { useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/Layout/Header";
import Login from "./features/Login/Login";
import Homepage from "./features/Homepage";
import "./styles/app.scss";
import { Provider } from "react-redux";
import store from "./app/store/rootStore";
import useWebSocket from "react-use-websocket";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Provider store={store}>
      <div className="moe-chat-app">
        <BrowserRouter>
          <Header />
          <Switch>
            <Redirect exact from="/" to="/login" />
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/home">
              <Homepage />
            </Route>
          </Switch>
        </BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </Provider>
  );
}

export default App;
