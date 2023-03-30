import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch } from "../../../app/store/rootStore";
import useWebSocket, { ReadyState } from "react-use-websocket";

import "./login.scss";
import { setLoginLocalStorage } from "../../../utils";
import { login } from "./loginSlice";

const SOCKET_URL = "wss://moeme-web-dev.aveapp.com";
interface be{
  sendJsonMessage: (json:any)=> void;
  lastJsonMessage:any
}

export default function Login({sendJsonMessage,lastJsonMessage}:be ) {
  const [socketUrl, setSocketUrl] = useState(SOCKET_URL);
  let history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(e.target[1].value);
    if (e.target[1].value.length <= 0 || e.target[0].value.length <= 0) {
      alert("khong duoc de trong");
    } else {
      let param = {
        ptGroup: 65536,
        ptCommand: 65537,
        params: {
          userId: e.target[0].value,
          userPassword: e.target[1].value,
          deviceType: "web",
        },
      };
      sendJsonMessage(param);
    }
  };

  const loginSuccess = (data: any) => {
    if (data?.result === "success") {
      dispatch(login(data?.params))
      loginSuccess(data?.params);
      setLoginLocalStorage(data?.params);
      history.push("/home");
    } else {
      // alert(data?.result);
    }
  };

  useEffect(() => {
    if (lastJsonMessage) {
      console.log(lastJsonMessage)
      switch (lastJsonMessage?.ptCommand) {
        case 65537:
          loginSuccess(lastJsonMessage);
          break;

        default:
          break;
      }
    }
  }, [lastJsonMessage]);


  useEffect(() => {
    const isLoggedIn: boolean = localStorage.getItem("userId") ? true : false;
    if (!isLoggedIn) {
      history.push("/login");
    }
  }, []);

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleLogin}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="text"
              name="userId"
              className="form-control mt-1"
              placeholder="Enter User Id"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
