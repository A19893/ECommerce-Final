import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMyOrders } from "../../Services/getMyOrders.service";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
const Orders = () => {
  const userId = useSelector((state) => state.authentication.loggedinUserId);
  const [myOrders, setMyOrders] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      const response = await getMyOrders(userId);
      setMyOrders(response.data.myOrders);
    };
    getData();
  }, []);
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
      title: "Quantity",
      dataIndex: "Quantity",
      key: "Quantity",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Address",
      dataIndex: "shippingInfo",
      key: "shippingInfo",
      render: (text) => <span>{text.address}</span>,
    },
    {
      title: "Action",
      key: "order",
      render: (text) => (
        <span
          style={{ color: "skyblue", cursor: "pointer" }}
          onClick={() => navigate("/specificOrder", { state: text })}
        >
          View
        </span>
      ),
    },
  ];
  // console.log(myOrders);
  return (
    <div className="viewOrders">
      <Table columns={columns} dataSource={myOrders} />
    </div>
  );
};

export default Orders;
