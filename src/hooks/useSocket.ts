import { AppDispatch } from "app/store/rootStore";
import { getListChannel } from "./socketSlice";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useWebSocket from "react-use-websocket";
const SOCKET_URL = "wss://moeme-web-dev.aveapp.com";
export const useSocket = () => {
  const [socketUrl, setSocketUrl] = useState(SOCKET_URL);
  const dispatch = useDispatch<AppDispatch>();
  
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

  const handleGetListChannelSuccess = (data:any) =>{
    if(data.result==="success"){
      dispatch(getListChannel(data))
    }
  };

  useEffect(() => {
    if (lastJsonMessage) {
      console.log("hooook");

      console.log(lastJsonMessage);
      console.log("hooook");

      switch (lastJsonMessage?.ptCommand) {

        case 262145: // Get List Channel
           handleGetListChannelSuccess(lastJsonMessage);
          break;

          break;
      }
    }
  }, [lastJsonMessage]);
  return {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  };
};
