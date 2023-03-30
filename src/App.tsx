import React, { useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/Layout/Header";
import Login from "./features/Login/Login";
import Homepage from "./features/Homepage";
import "./styles/app.scss";
import { Provider } from "react-redux";
import store from "./app/store/rootStore";
import useWebSocket from "react-use-websocket";

const SOCKET_URL = "wss://moeme-web-dev.aveapp.com";
function App() {
  const [socketUrl, setSocketUrl] = useState(SOCKET_URL);

  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(socketUrl, {
    onOpen: () => console.log("opened"),
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
  });
  return (
    <Provider store={store}>
      <div className="moe-chat-app">
        <BrowserRouter>
          <Header />
          <Switch>
            <Redirect exact from="/" to="/login" />
            <Route path="/login">
              <Login sendJsonMessage={sendJsonMessage} lastJsonMessage={lastJsonMessage} />
            </Route>
            <Route path="/home">
              <Homepage sendJsonMessage={sendJsonMessage} lastJsonMessage={lastJsonMessage} />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
