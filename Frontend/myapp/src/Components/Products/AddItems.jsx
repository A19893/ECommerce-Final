import React, { useState } from "react";
import { addProducts } from "../../Services/createProduct.service";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, message } from "antd";
import CircularProgress from "@mui/material/CircularProgress";
import { addProduct } from "../../utils/addProduct";
import { draftProduct } from "../../utils/draftProduct";
const AddItems = (image) => {
  const CreatedBy = useSelector((state) => state.authentication.loggedinUserId);
  const { TextArea } = Input;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const warning = (message) => {
    messageApi.open({
      type: "warning",
      content: message,
      duration: 5,
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Please Upload minimum 4 images",
      duration: 5,
    });
  };
  const success = (message) => {
    messageApi.open({
      type: "success",
      content: message,
      duration: 5,
    });
  };
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };
  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelAlign: "left",
          labelCol: {
            span: 4,
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
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please Enter Product Name",
            },
          ]}
        >
          <Input
            placeholder="Product Name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please Enter Product Decstiption",
            },
          ]}
        >
          <TextArea
            placeholder="Product Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Select"
          name="select"
          rules={[
            {
              required: true,
              message: "Please Select Product Category",
            },
          ]}
        >
          <Select
            placeholder="Category"
            style={{ width: "350px", padding: "5px" }}
            onSelect={(value) => setCategory(value)}
          >
            <Select.Option value="Applications">Appliances</Select.Option>
            <Select.Option value="Beauty">Beauty</Select.Option>
            <Select.Option value="Fashion">Fashion</Select.Option>
            <Select.Option value="Electronics">Electronics</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label=" Stock"
          name="Stock"
          rules={[
            {
              required: true,
              message: "Please Enter Product Stock",
            },
            {
              max: 5,
              message: "Maximum length reached",
            },
          ]}
        >
          <Input
            placeholder="Stock"
            type="number"
            onChange={(e) => setStock(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label=" Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please Enter Product Price",
            },
            {
              max: 5,
              message: "Maximum Price limit reached",
            },
          ]}
        >
          <Input
            placeholder="Price"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Item>
        {loading ? (
          <div style={{display:'flex',justifyContent:'center',paddingBottom:'10px',marginRight:'100px'}}>
           <CircularProgress  color="inherit" backgroundColor="blue"/>
          </div>
        ) : (
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ textAlign: "center", margin: "auto", display: "table" }}
              onClick={() => addProduct({name,description,price,category,Stock,warning,image,CreatedBy,success,setLoading,navigate,error,addProducts})}
            >
              Add Product
            </Button>
          </Form.Item>
        )}
        {loading ? (
          <div style={{display:'flex',justifyContent:'center',paddingBottom:'10px',marginRight:'100px'}}>
           <CircularProgress  color="inherit"/>
          </div>
        ) :<Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              textAlign: "center",
              margin: "auto",
              display: "table",
              backgroundColor: "red",
            }}
            onClick={() => draftProduct({name,description,price,category,Stock,warning,image,CreatedBy,success,setLoading,navigate,error,addProducts})}
          >
            Draft Product
          </Button>
        </Form.Item>}
      </Form>
    </>
  );
};

export default AddItems;