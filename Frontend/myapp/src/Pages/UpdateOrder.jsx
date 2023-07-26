import React, { useState } from "react";
import { Modal, Form, Input, Select, Button,message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { updateOrder } from "../Services/updateOrder.service";
const UpdateOrder = () => {
  const { state } = useLocation();
  const TotalPrice = state.subTotal + state.shippingPrice + state.taxPrice;
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [orderStatus, setorderStatus] = useState(state.orderStatus);
  const [formLayout, setFormLayout] = useState("horizontal");
  const [messageApi, contextHolder] = message.useMessage();
  const handleUpdate = async (id) => {
    const response = await updateOrder(id, orderStatus);
    if (response.status === 200) {
      success();
      setTimeout(() => {
        navigate("/viewOrders");
      }, 1000);
    }
  };
  const success = (message) => {
    messageApi.open({
      type: "success",
      content: message,
      duration: 5,
    });
  };
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    navigate("/viewOrders");
  };
  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelAlign: "left",
          labelCol: {
            span: 7,
            offset: 1,
          },
          wrapperCol: {
            span: 20,
          },
        }
      : null;
  return (
    <>
    {contextHolder}
      <Modal
        width={500}
        title="Update Order Status"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          style={{ marginTop: "40px" }}
          {...formItemLayout}
          layout={formLayout}
          form={form}
          initialValues={{
            layout: formLayout,
          }}
          onValuesChange={onFormLayoutChange}
        >
          <Form.Item label="Order Id">
            <Input
              placeholder="Order Id"
              style={{ width: "220px" }}
              defaultValue={state._id}
              disabled
            />
          </Form.Item>
          <Form.Item label="Product Name">
            <Input
              placeholder="Product Name"
              style={{ width: "220px" }}
              defaultValue={state.order.name}
              disabled
            />
          </Form.Item>
          <Form.Item label="Product Description">
            <TextArea
              placeholder="Product Description"
              defaultValue={state.order.description}
              disabled
            />
          </Form.Item>
          <Form.Item label="Product Category">
            <Select
              placeholder="Category"
              style={{ width: "180px", padding: "5px" }}
              defaultValue={state.order.category}
              disabled
            >
              <Select.Option value="Applications">Appliances</Select.Option>
              <Select.Option value="Beauty">Beauty</Select.Option>
              <Select.Option value="Fashion">Fashion</Select.Option>
              <Select.Option value="Electronics">Electronics</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Order Status">
            <Select
              placeholder="Status"
              style={{ width: "180px", padding: "5px" }}
              value={orderStatus}
              onSelect={(value) => setorderStatus(value)}
            >
              <Select.Option value="Processing">Processing</Select.Option>
              <Select.Option value="Shipped">Shipped</Select.Option>
              <Select.Option value="Delivered">Dispatched</Select.Option>
              <Select.Option value="Cancelled">Cancel Order</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Order Price">
            <Input
              placeholder="Price"
              style={{ width: "220px" }}
              defaultValue={TotalPrice}
              disabled
            />
          </Form.Item>
          <Form.Item label="Order Quantity">
            <Input
              placeholder="Price"
              style={{ width: "220px" }}
              defaultValue={state.Quantity}
              disabled
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              style={{ textAlign: "center", margin: "auto", display: "table" }}
              onClick={() => handleUpdate(state._id)}
            >
              Update Order Status
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateOrder;
