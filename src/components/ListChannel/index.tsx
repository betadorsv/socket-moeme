import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Menu } from "semantic-ui-react";
import { RootState } from "../../app/store/rootSotre";
import ItemChannel from "../ItemChannel";
import "./listChannel.scss";

const colors = [
  "red",
  "orange",
  "yellow",
  "olive",
  "green",
  "teal",
  "blue",
  "violet",
  "purple",
  "pink",
  "brown",
  "grey",
  "black",
];
const key = "roomId";
export default function ListChannel() {
  const listChannel: any = useSelector((state: RootState) => state.channel);
  const [activeChannelType, setActiveChannelType] = useState<any>("All");
  const [activeRoomType, setActiveRoomType] = useState<any>(
    "Subscription channel"
  );
  const uniqueChannel = [
    ...new Map(listChannel?.data?.map((item) => [item[key], item])).values(),
  ];

  const userId = localStorage.getItem("userId");

  let filterChannel: any = uniqueChannel
    ?.filter((channel: any) => {
      if (activeRoomType === "My Channel") {
        return (
          ["2", "3"].includes(channel?.room_type) && channel?.ownerId === userId
        );
      } else {
        return (
          ["2", "3"].includes(channel?.room_type) &&
          channel?.ownerId !== userId &&
          channel?.change_name !== "0"
        );
      }
    })
    .filter((channel: any) => {
      if (activeChannelType === "Personal") {
        if (activeRoomType === "My Channel") {
          return channel?.chnl_type === "";
        } else {
          return channel?.chnl_type === "PER";
        }
      } else if (activeChannelType === "ograniztion") {
        return channel?.chnl_type === "ORG";
      } else if (activeChannelType === "Special") {
        return channel?.chnl_type === "SPL";
      } else if (activeChannelType === "Stock") {
        return channel?.chnl_type === "STO";
      } else {
        return uniqueChannel;
      }
    });

  // ( activeChannelType === "Personal" && activeRoomType === "My Channel" && activeChannelType === "")
  const handleClickRoomType = (e, { name }) => {
    setActiveRoomType(name);
    setActiveChannelType("All");
  };

  const handleChangeChannelType = (e, { name }) => {
    setActiveChannelType(name);
  };
  return (
    <div className="channel-list">
      <div className="channel-list--title">
        <Menu tabular widths={2}>
          <Menu.Item
            name="Subscription channel"
            active={activeRoomType === "Subscription channel"}
            onClick={handleClickRoomType}
          />

          <Menu.Item
            name="My Channel"
            active={activeRoomType === "My Channel"}
            onClick={handleClickRoomType}
          />
        </Menu>
        <Menu widths={activeRoomType === "My Channel" ? 4 : 5}>
          <Menu.Item
            name="All"
            active={activeChannelType === "All"}
            onClick={handleChangeChannelType}
          />
          <Menu.Item
            name="Personal"
            active={activeChannelType === "Personal"}
            onClick={handleChangeChannelType}
          />
          <Menu.Item
            name="ograniztion"
            active={activeChannelType === "ograniztion"}
            onClick={handleChangeChannelType}
          />
          <Menu.Item
            name="Special"
            active={activeChannelType === "Special"}
            onClick={handleChangeChannelType}
          />
          {activeRoomType !== "My Channel" && (
            <Menu.Item
              name="Stock"
              active={activeChannelType === "Stock"}
              onClick={handleChangeChannelType}
            />
          )}
        </Menu>
      </div>
      <div className="channel-list--box">
        {filterChannel?.length > 0 &&
          filterChannel?.map((item, index) => (
            <ItemChannel
              key={index}
              channel={item}
              activeRoomType={activeRoomType}
            />
          ))}
      </div>
    </div>
  );
}
