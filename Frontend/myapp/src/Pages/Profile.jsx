import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSpecificUser } from "../Services/getSpecificUser.service";
import { PlusOutlined } from "@ant-design/icons";
import { updateUser } from "../Services/updateUserDetails.service";
import { useNavigate } from "react-router-dom";
import ProfileModal from "../Components/Views/ProfileModal";
import { message } from "antd";
const Profile = () => {
  const userId = useSelector((state) => state.authentication.loggedinUserId);
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const[logo,setLogo]=useState(null);
  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const[companyName,setCompanyName]=useState(null);
  const[companyDetails,setcompanyDetails]=useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const warning = (message) => {
    messageApi.open({
      type: "warning",
      content: message,
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
  useEffect(() => {
    const getData = async () => {
      const response = await getSpecificUser(userId);
      setName(response.data.result.name);
      setAddress(response.data.result.address);
      setEmail(response.data.result.email);
      setPassword(response.data.result.password);
      setUser(response.data.result);
      setImage(response.data.result.avatar);
      setLogo(response.data.result.companyLogo);
      setCompanyName(response.data.result.companyName);
      setcompanyDetails(response.data.result.companyDetails);
    };
    getData();
  }, []);
  // console.log('--logo---',logo);
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
  const handleUpdate = async () => {
    // console.log("----data---", name, address, password, email);
    // console.log('--details',companyDetails?.trim());
    if(name?.trim()===""){
      warning("Please fill name properly!!");
      return;
    }
    else if(address?.trim()===""){
      warning("Please fill address properly!!");
      return;
    }
   else if(password?.trim()===""){
      warning("Please fill password properly!!");
      return;
    }
    else if(email?.trim()===""){
      warning("Please fill email properly!!");
      return;
    }
    else if(companyName?.trim()===""){
      warning("Please fill compny Name properly!!");
      return;
    }
    else if(companyDetails?.trim()===""){
      warning("Please fill company Details properly!!");
      return;
    }
    else{
    const res = await updateUser(userId, name, address, password, email, image,logo,companyName,companyDetails);
    if (res.status === 200) {
      success("Updated Successfully");
      setTimeout(()=>{
        navigate("/home");
      },500);
    }
  } 
  };
  // console.log("-image---", image);
  return (
    <>
    {contextHolder}
    <ProfileModal
      uploadButton={uploadButton}
      name={name}
      setName={setName}
      setAddress={setAddress}
      address={address}
      image={image}
      setImage={setImage}
      handleUpdate={handleUpdate}
      user={user}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      logo={logo}
      setLogo={setLogo}
      companyName={companyName}
      setCompanyName={setCompanyName}
      setcompanyDetails={setcompanyDetails}
      companyDetails={companyDetails}
    />
    </>
  );
};

export default Profile;
