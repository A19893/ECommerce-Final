import React, { useState } from "react";
import { Button, Modal, Select,message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateRole } from "../Services/updateRole.service";
import { selectRole } from "../Features/AuthSlice";
import { useNavigate } from "react-router-dom";
const Role = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const loggedInUserId = useSelector(
    (state) => state.authentication.loggedinUserId
  );
  const warning = (message) => {
    messageApi.open({
      type: "warning",
      content: message,
      duration: 5,
    });
  };
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [role, setRole] = useState("");
  const handleOk = async () => {
    if (role === "") {
      warning("Please Select Role");
    } else {
      setIsModalOpen(false);
      const res = await updateRole(role, loggedInUserId);
      dispatch(selectRole(res.data.result.role));
      setRole("");
      navigate("/home");
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChange = (value) => {
    setRole(value);
  };
  return (
    <>
    {contextHolder}
      <Modal
        title="Please select a purpose you want to be with us!!!"
        open={isModalOpen}
        footer={null}
      >
        <Select
          style={{ width: "180px", padding: "5px" }}
          showSearch
          placeholder="Please Select a Role"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={[
            {
              value: "Vendor",
              label: "Vendor",
            },
            {
              value: "User",
              label: "User",
            },
          ]}
        />
        <Button type="primary" onClick={handleOk}>
          Submit
        </Button>
      </Modal>
    </>
  );
};

export default Role;
