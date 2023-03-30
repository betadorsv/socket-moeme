import { useContext, useState } from "react";
import useWebSocket from "react-use-websocket";
const SOCKET_URL = "wss://moeme-web-dev.aveapp.com";
export const useSocket = () => {
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
  return {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  };
};
