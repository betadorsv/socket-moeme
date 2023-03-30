import { AppDispatch, RootState } from "app/store/rootStore";

import { useSocket } from "../../hooks/useSocket";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import ItemChannel from "./components/ItemChannel";

import "./Homepage.scss";
import ListChannel from "./components/ListChannel";
import FormCreateChannel from "./components/FormCreateChannel";

interface ListChannelProp {
  lastJsonMessage: any;
  sendJsonMessage: (params: any) => void;
}

function index() {
  const [listItem, setListItem] = useState<any>([]);
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const userInfo = useSelector((state: RootState) => state.user);
  let history = useHistory();
  const { lastJsonMessage, sendJsonMessage } = useSocket();
  const dispatch = useDispatch<AppDispatch>();

 

  const handleGetListChannel = (data: any) => {
    if (data?.result === "success") {
      let userId = localStorage.getItem("userId");
      let param = {
        ptGroup: 262144,
        ptCommand: 262145,
        params: {
          userId: userId,
        },
      };
      sendJsonMessage(param);
    }
  };

  const handleCreateChannelSuccess = (data: any) => {
    if (data.result === "success") {
      let userId = localStorage.getItem("userId");
      let param = {
        ptGroup: 262144,
        ptCommand: 262145,
        params: {
          userId: userId,
        },
      };
      sendJsonMessage(param);
    }
  };

  return (
    <div className="channel">
      <ListChannel />
      <FormCreateChannel />
    </div>
  );
}

export default index;
