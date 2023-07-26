import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; 
import { getVendorOrders } from "../../Services/getVendorOrders.service";
import { Modal, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { getAllOrders } from "../../Services/getAllOrders.service";
const ViewOrders = () => {
  const userId = useSelector((state) => state.authentication.loggedinUserId);
  const userRole = useSelector(
    (state) => state.authentication.loggedInUserRole
  );
  const [myOrders, setMyOrders] = useState(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);
  let TotalEarnings = 0;
  useEffect(() => {
    const getData = async () => {
      const response =
        userRole === "Admin"
          ? await getAllOrders()
          : await getVendorOrders(userId);
      // console.log("----vendor", response);
      setMyOrders(response.data.Orders);
    };
    getData();
  }, []);
  // console.log(myOrders);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    navigate("/dashBoard");
  };
  // console.log(myOrders);
  const columns = [
    {
      title: "Order Id",
      dataIndex: "_id",
      key: "_id",
      render: (text) => (
        <span style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>
          #{text}
        </span>
      ),
    },
    {
      title: "Product Name",
      dataIndex: "order",
      key: "order",
      render: (text) => <span>{text.name}</span>,
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      key: "Quantity",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Price",
      dataIndex: "subTotal",
      key: "subTotal",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Address",
      dataIndex: "shippingInfo",
      key: "shippingInfo",
      render: (text) => <span>{text.address}</span>,
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Action",
      key: "_id",
      render: (text) => (
        <>
         {text.orderStatus!=='Cancelled'&&<span
            style={{
              color: "blue",
              cursor: "pointer",
              fontSize: "20px",
              marginRight: "15px",
            }}
            onClick={() => navigate("/updateOrder", { state: text })}
          >
            Update
          </span>}
        </>
      ),
    },
  ];
  return (
    <Modal
      width={900}
      title="Your Orders"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Table columns={columns} dataSource={myOrders} />
      <h4>Total Orders-{myOrders?.length}</h4>
      {myOrders?.map((item) => {
        if(item.orderStatus!=='Cancelled')
        TotalEarnings += item.subTotal + item.shippingPrice + item.taxPrice;
      })}
      <h4>Total Earnings- ₹{TotalEarnings}</h4>
    </Modal>
  );
};

export default ViewOrders;
