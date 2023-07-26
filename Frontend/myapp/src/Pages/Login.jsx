import React, { useState } from "react";
import LoginDisplay from "../Components/Users/LoginDisplay"
import { addAuthentication, selectRole } from "../Features/AuthSlice";
import { useDispatch } from "react-redux";
import { manualLogin } from "../Services/manualLogin.service";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../Config/Firebase";
import { checkUser } from "../Services/checkBeforeLogin.service";
import { manualSignup } from "../Services/manualSignup.service";
import { message } from "antd";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const warning = (message) => {
    messageApi.open({
      type: "warning",
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
  //This Function will help to login user with email and password
  const onManualLogin = async (e) => {
    e.preventDefault();
    if (password.length <= 6) {
      warning("Please Fill Password Properly");
    } else {
      const res = await manualLogin(password, email);
      // console.log(res);
      if (res.status === 201) {
        if (res.data.result.status === "Deactivate") {
          warning(
            "You dont have access to our website. Please Contact our Support Team"
          );
        } else {
          dispatch(
            addAuthentication({
              id: res.data.result._id,
              email: res.data.result.email,
              address: res.data.result.address,
              name: res.data.result.name,
              country:res.data.result.country,
              state:res.data.result.state
            })
          );
          dispatch(selectRole(res.data.result.role));
          setPassword("");
          setEmail("");
          navigate("/home");
        }
      } else if (res.status === 200) {
        error("You are Not a Registered User");
      } else if (res.status === 203) {
        error("Credentials are InValid");
      }
    }
  };
  //This function will help to sign in user with google
  const signInGoogle = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const data = res._tokenResponse;
      console.log(data);
      const result = await checkUser(data.email, "password");
      console.log(result);
      if (result.status === 200) {
        const res = await manualSignup(
          data.displayName,
          "password",
          data.email
        );
        console.log(res);
        if (res.status === 201) {
          dispatch(
            addAuthentication({
              id: res.data.creation._id,
              email: res.data.creation.email,
              address: res.data.creation.address,
              name: res.data.creation.name,
              country:res.data.creation.country,
              state:res.data.creation.state,
            })
          );
          navigate("/role");
        }
      } else if (result.status === 201) {
        const data = result.data;
        if (data.result.status === "Deactivate") {
          warning(
            "You dont have access to our website. Please Contact our Support Team"
          );
        } else {
          dispatch(
            addAuthentication({
              id: data.result._id,
              email: data.result.email,
              address: data.result.address,
              name: data.result.name,
            })
          );
          dispatch(selectRole(data.result.role));
          navigate("/home");
        }
      }
    } catch (err) {
      const msg="Error (auth/cancelled-popup-request)/(auth/pop close by user)"
      warning(msg);
    }
  };
  return (
    <>
    {contextHolder}
    <LoginDisplay
      signInGoogle={signInGoogle}
      onManualLogin={onManualLogin}
      password={password}
      email={email}
      setPassword={setPassword}
      setEmail={setEmail}
    />
    </>
  );
};

export default Login;