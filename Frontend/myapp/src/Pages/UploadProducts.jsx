import React, { useState } from "react";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload, Modal } from "antd";
import AddItems from "../Components/Products/AddItems";
import { useNavigate } from "react-router-dom";

const UploadProducts = () => {
  const [image, setImage] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();

  const handleChange = ({ file: newFile, fileList: newFileList }) => {
    setFileList(newFileList);
    newFile.status === "done" &&
      setImage([...image, `http://localhost:5000/${newFile.response}`]);
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
    navigate("/dashboard");
  };
  return (
    <>
      <Modal
        width={700}
        title="Upload Product"
        open={isModalOpen}
        onOk={handleOk}
        closeIcon={<CloseOutlined onClick={handleCancel} />}
        footer={null}
      >
        <Upload
          action="http://localhost:5000/uploads"
          listType="picture-circle"
          fileList={fileList}
          onChange={handleChange}
          name="image"
          showUploadList={{
            showPreviewIcon: false,
            showDownloadIcon: false,
            showRemoveIcon: false,
          }}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <AddItems image={image} />
      </Modal>
    </>
  );
};
export default UploadProducts;
