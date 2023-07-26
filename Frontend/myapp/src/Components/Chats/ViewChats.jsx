import React, { useState, useEffect } from "react";
import { Modal, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { getAllChats } from "../../Services/getAllChatRooms.service";
const ViewChats = () => {
//   const userId = useSelector((state) => state.authentication.loggedinUserId);
  const[chats,setChats]=useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      const response=await getAllChats();
      setChats(response.data.result)
    };
    getData();
  }, []);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    navigate("/dashBoard");
  };
  // console.log(chats);
  const columns = [
    {
      title: "ChatRoom Id",
      dataIndex: "chatRoomId",
      key: "chatRoomId",
      render: (text) => (
        <span style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>
          #{text}
        </span>
      ),
    },
    {
      title: "User Id",
      dataIndex: "senderId",
      key: "senderId",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Total Messages",
      dataIndex: "messages",
      key: "messages",
      render: (text) => <span>{text.length}</span>,
    },
    {
      title: "Action",
      key: "chatRoomId",
      render: (text) => (
        <>
          <span
            style={{
              color: "blue",
              cursor: "pointer",
              fontSize: "20px",
              marginRight: "15px",
            }}
            onClick={() => navigate("/chat", { state: text })}
          >
            Chat
          </span>
        </>
      ),
    },
  ];
  return (
    <Modal
    width={900}
    title="Chat Room"
    open={isModalOpen}
    onOk={handleOk}
    onCancel={handleCancel}
    footer={null}
  >
    <Table columns={columns} dataSource={chats} />
  </Modal>
  );
}

export default ViewChats;
