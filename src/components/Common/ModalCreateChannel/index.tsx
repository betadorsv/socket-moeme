import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { v1 as uuidv1 } from "uuid";

interface ModalCreateProps {
  show: boolean;
  handleClose: () => void;
  handleSubmit: (data: any) => void;
}

export default function ModalCreateChannel({
  show,
  handleClose,
  handleSubmit,
}: ModalCreateProps) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [roomType, setRoomType] = useState("");

  const handleCreateRoom = () => {
    let param = {
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
    handleSubmit(param);
  };
  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Modal Form Title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" onClick={handleCreateRoom}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
