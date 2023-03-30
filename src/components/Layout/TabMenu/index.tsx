import { useGoogleLogout } from "react-google-login";

import { AppDispatch } from "app/store/rootStore";
import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import AvatarDefault from "../../../assets/imgs/icons/avatar-gian-dau.png";
import { persistedUser, signOutLocalStorage } from "../../../utils/LoginUtils";
import { logout } from "../../../features/Login/Login/loginSlice";
import "./tabMenu.scss"
const clientId =
  "230174178853-9uq13et64lgcraa76572jhmj0o4ji16g.apps.googleusercontent.com";
export interface MenuProps {
  userInfo: any;
}
/**
 * Fix windown not type(FB)
 */
declare global {
  interface Window {
    FB: any;
  }
}
export interface GoogleLogoutProps {
  readonly clientId: string;
  readonly onLogoutSuccess?: () => void;
  readonly onFailure?: () => void;
}

export default function LeftSide({ userInfo }: MenuProps) {
  const userData = userInfo?.isLoggedIn ? userInfo : persistedUser;
  let history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  /**
   * on Logout google success
   */
  const onLogoutSuccess = () => {
    history.push("/");
  };
  /**
   * on Logout facebook success
   */
  const onFailure = () => {
    console.log("logout fail");
  };

  /**
   * init logout google hook
   */
  const { signOut } = useGoogleLogout({
    clientId: clientId,
    onLogoutSuccess: onLogoutSuccess,
    onFailure: onFailure,
  });

  /**
   * handle logout
   */
  const handleLogout = () => {
    if (window?.FB) {
      window.FB.logout();
    }
    signOut();
    dispatch(logout());
    signOutLocalStorage(); // remove access data from local storage
    history.push("/"); // back to login
  };

  /**
   * get url avatar user
   */
  const avatarUser = userInfo?.isLoggedIn
    ? userData?.avatar
    : persistedUser?.picture?.data?.url;

  return (
    <div className="left-side">
      <div className="left-side--common">
        <img
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = AvatarDefault;
          }}
          src={avatarUser}
        />
        <h1>{userData?.name}</h1>
        <p>{userData?.email}</p>
        <Button onClick={handleLogout} variant="secondary">
          Logout
        </Button>
      </div>
      <div className="left-side--menu"></div>
    </div>
  );
}
