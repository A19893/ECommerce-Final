import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Table,message } from "antd";
import { updateStatus } from "../../Services/updateUserStatus.service";
import { getAllUsers } from "../../Services/getAllUser.service";
const ViewUsers = () => {
  const [myUsers, setMyUsers] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const[reload,setReload]=useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      const response = await getAllUsers();
      // console.log("----users", response);
      setMyUsers(response.data.result);
    };
    getData();
  }, [reload]);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    navigate("/dashBoard");
  };
  const success = (message) => {
    messageApi.open({
      type: "success",
      content: message,
      duration: 5,
    });
  };
  const handleUpdate = async (item, status) => {
    const response = await updateStatus(item._id, status);
    if (response.status === 200) {
      success("User Status Updated Successfully");
      setReload(!reload);
      setTimeout(()=>{
        navigate("/viewUsers");
      },500);
    }
  };
  const columns = [
    {
      title: "User Id",
      dataIndex: "_id",
      key: "_id",
      render: (text) => (
        <span style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>
          #{text}
        </span>
      ),
    },
    {
      title: "UserName",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "UserEmail",
      dataIndex: "email",
      key: "email",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Joining Date",
      dataIndex: "joiningDate",
      key: "joiningDate",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Action",
      key: "status",
      render: (text) => (
        <>
          {text.status === "Active" ? (
            <span
              style={{
                color: "blue",
                cursor: "pointer",
                fontSize: "20px",
                marginRight: "15px",
              }}
              onClick={() => handleUpdate(text, "Deactivate")}
            >
              Disable
            </span>
          ) : (
            <span
              style={{
                color: "blue",
                cursor: "pointer",
                fontSize: "20px",
                marginRight: "15px",
              }}
              onClick={() => handleUpdate(text, "Active")}
            >
              Enable
            </span>
          )}
        </>
      ),
    },
  ];
  return (
    <>
    {contextHolder}
        <Modal
      width={900}
      title="Users List"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Table columns={columns} dataSource={myUsers} />
    </Modal>
    </>
  );
};

export default ViewUsers;
