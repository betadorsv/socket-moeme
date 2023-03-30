import { useSocket } from "../../../hooks/useSocket";
import React, { useEffect, useState } from "react";
import ItemChannel from "./ItemChannel";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/store/rootStore";
import { useHistory } from "react-router-dom";

export default function ListChannel() {
  const [listItem, setListItem] = useState<any>([]);
  const { lastJsonMessage, sendJsonMessage } = useSocket();
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const userInfo = useSelector((state: RootState) => state.user);
  const listChannel = useSelector((state: RootState) => state.channel);
  let history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  const handleGetListChannelSuccess = (data: any) => {
    if (data?.result === "success") {
      setListItem(data?.params);
    }
  };
console.log('be')
  console.log(listChannel)

  const handleCreateChannel = (data: any) => {
    let param = {
      ptCommand: 262146,
      ptGroup: 262144,
      ptDevice: "",
      params: {
        ...data,
        userId: userInfo.userId,
      },
    };
    sendJsonMessage(param);
    setShowModalCreate(false);
  };

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

//   const handleCreateChannelSuccess = (data: any) => {
//     if (data.result === "success") {
//       let userId = localStorage.getItem("userId");
//       let param = {
//         ptGroup: 262144,
//         ptCommand: 262145,
//         params: {
//           userId: userId,
//         },
//       };
//       sendJsonMessage(param);
//     }
//   };

  const registerSocket = () => {
    let atk = localStorage.getItem("atk"); //accessToken
    let param = {
      ptCommand: 65543,
      ptGroup: 65536,
      ptDevice: "",
      params: {
        atk: atk,
      },
    };
    sendJsonMessage(param);
  };

  useEffect(() => {
    if (lastJsonMessage) {
      console.log(lastJsonMessage);
      switch (lastJsonMessage?.ptCommand) {
        case 65537: //Login
          break;
        case 262145: // Get List Channel
          // handleGetListChannelSuccess(lastJsonMessage);
          break;
        // case 262146: // Create Channel
        //   handleCreateChannelSuccess(lastJsonMessage);
        //   break;
        case 65543: // Regsiter Socket
          handleGetListChannel(lastJsonMessage);
        default:
          break;
      }
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    const isLoggedIn: boolean = localStorage.getItem("atk") ? true : false;
    if (!isLoggedIn) {
      history.push("/login");
    } else {
      registerSocket();
    }
  }, []);
  return (

      <div className="channel-list">
        <div className="channel-list--title">
          <div>List Channel</div>
        </div>
        <div className="channel-list--box">
          {listChannel?.data?.map((item, index) => (
            <ItemChannel
              avartar={item?.profile_image}
              name={item?.room_name}
              desc={item?.roomComment}
            />
          ))}
        </div>
    </div>
  );
}
