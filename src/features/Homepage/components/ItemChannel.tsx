import React from "react";

interface ItemChannelProps {
  avartar?: String;
  name?: String;
  desc?: String;
}

function ItemChannel({ avartar, name, desc }: ItemChannelProps) {
  return (
    <div className="channel-item">
      <div className="channel-item--thumnail">
        <img
          height={100}
          src="https://media.wired.com/photos/6423826d7f6ce88e606d7b55/master/pass/Lamborghini-Revuelto-Featured-Gear.jpg"
        />
      </div>
      <div className="channel-item--info">
        <h5>{name?.length > 0 ? name : "No Name"}</h5>
        <p>{desc?.length > 0 ? desc : "No Desciption"}</p>
      </div>
    </div>
  );
}

export default ItemChannel;
