import React, { useState } from "react";
import { Modal, Upload } from "antd";
import { Button, Form, Input, Select,message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { updateProduct } from "../Services/updateProduct.service";
const UpdateProduct = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  // console.log("---state", state);
  const { TextArea } = Input;
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [image, setImage] = useState([]);
  const [name, setName] = useState(state.name);
  const [description, setDescription] = useState(state.description);
  const [price, setPrice] = useState(state.price);
  const [category, setCategory] = useState(state.category);
  const [Status, setStatus] = useState(state.Status);
  const [Stock, setStock] = useState(state.Stock);
  const [messageApi, contextHolder] = message.useMessage();
  const handleChange = ({ file: newFile, fileList: newFileList }) => {
    setFileList(newFileList);
    newFile.status === "done" &&
      setImage([...image, `http://localhost:5000/${newFile.response}`]);
  };
  const success = (message) => {
    messageApi.open({
      type: "success",
      content: message,
      duration: 5,
    });
  };
  const error = (message) => {
    messageApi.open({
      type: "error",
      content: message,
      duration: 5,
    });
  };
  const handleUpdate = async () => {
    if (
      name === "" ||
      description === "" ||
      price === "" ||
      category === "" ||
      Stock === ""
    ) {
      return;
    } else if (image.length > 0) {
      // console.log(image.length);
      if (image.length < 4) {
        error();
      } else {
        const response = await updateProduct(
          state._id,
          name,
          description,
          price,
          category,
          image,
          Stock,
          Status
        );
        if (response.status === 200) {
          success();
          setTimeout(() => {
            navigate("/dashBoard");
          }, 500);
        }
      }
    } else {
      const response = await updateProduct(
        state._id,
        name,
        description,
        price,
        category,
        state.image,
        Stock,
        Status
      );
      // console.log(response);
      if (response.status === 200) {
        success();
        // setLoading(false);
        setTimeout(() => {
          navigate("/dashBoard");
        }, 500);
      }
    }
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    navigate("/viewProducts");
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
        width={1000}
        title="Update Product"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="updateContainer">
          <div className="update-leftPart">
            <div className="update-Img">
              <div className="upload-img">
                <Upload
                  action="http://localhost:5000/uploads"
                  listType="picture-circle"
                  fileList={fileList}
                  onChange={handleChange}
                  name="image"
                >
                  {fileList.length >= 4 ? null : uploadButton}
                </Upload>
              </div>
            </div>
            <div className="update-Links">
              {state?.image.map((item, idx) => {
                return (
                  <div className="uploaded-Img">
                    <img src={item} alt="Missing" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="update-rightPart">
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
                initialValue={name}
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
                  style={{ width: "220px" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="description"
                initialValue={description}
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
                  value={description}
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
                  style={{ width: "180px", padding: "5px" }}
                  value={category}
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
                initialValue={Stock}
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
                  style={{ width: "220px" }}
                  onChange={(e) =>
                    e.target.value > 0 && setStock(e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item
                label=" Price"
                name="price"
                initialValue={price}
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
                  style={{ width: "220px" }}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label="Status"
                name="select"
                initialValue={Status}
                rules={[
                  {
                    required: true,
                    message: "Please Select Product Category",
                  },
                ]}
              >
                <Select
                  placeholder="Status"
                  value={Status}
                  style={{ width: "200px", padding: "5px" }}
                  onSelect={(value) => setStatus(value)}
                >
                  <Select.Option value="Publish">Publish</Select.Option>
                  <Select.Option value="Draft">Draft</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  style={{
                    textAlign: "center",
                    margin: "auto",
                    display: "table",
                  }}
                  onClick={() => handleUpdate()}
                >
                  Update Product
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UpdateProduct;
