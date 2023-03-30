import { useSocket } from '../../../hooks/useSocket';
import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { v1 as uuidv1 } from "uuid";
export default function FormCreateChannel() {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [roomType, setRoomType] = useState("");
  
    const { lastJsonMessage, sendJsonMessage } = useSocket();
  
  
  
  
    const handleCreateChannel = (data: any) => {
      let userId = localStorage.getItem("userId");
      let param = {
        ptCommand: 262146,
        ptGroup: 262144,
        ptDevice: "",
        params: {
          ...data,
          userId: userId,
        },
      };
      // sendJsonMessage(param);
  
    };
    const handleCreateRoom = () => {
      let params = {
        enableWriteMsg: "0",
        roomProfileImage: "",
        roomId: uuidv1(),
        roomName: name,
        roomComment: desc,
        enableSearch: "1",
        roomType: Number(roomType),
        chnl_open_type: "1",
        maxUser: "2000",
      };
  
      let userId = localStorage.getItem("userId");
      let param = {
        ptCommand: 262146,
        ptGroup: 262144,
        ptDevice: "",
        params: {
          ...params,
          userId: userId,
        },
      };
      sendJsonMessage(param);
    };
  
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
  
    useEffect(() => {
      if (lastJsonMessage) {
        console.log('model');
  
        console.log(lastJsonMessage);
        switch (lastJsonMessage?.ptCommand) {
  
          case 262146: // Create Channel
            handleCreateChannelSuccess(lastJsonMessage);
            break;
          // case 65543: // Regsiter Socket
          //   handleGetListChannel(lastJsonMessage);
          // default:
            break;
        }
      }
    }, [lastJsonMessage]);
  
    useEffect(() => {
  
  
        registerSocket();
      
    }, []);
    return (
      <div className="channel-contend">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Room Name</Form.Label>
          <Form.Control
            name="name"
            onChange={(e) => setName(e?.target?.value)}
            type="text"
            placeholder="Enter Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Room Comment</Form.Label>
          <Form.Control
            type="text"
            name="comment"
            placeholder="Enter Comment"
            onChange={(e) => setDesc(e?.target?.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Room Type</Form.Label>
          <Form.Select
            name="type"
            onChange={(e) => setRoomType(e?.target?.value)}
          >
            <option value="0">1:1 chat room</option>
            <option value="1">Multi user chat room</option>
            <option value="2">Open chat room</option>
            <option value="3">Public open chat room</option>
            <option value="4">Myself chat room</option>
            <option value="5">Notice chat room</option>
            <option value="6">Group chat room</option>
          </Form.Select>
        </Form.Group>
  
        <Button variant="primary" type="submit" onClick={handleCreateRoom}>
          Submit
        </Button>
      </div>
    );
}
