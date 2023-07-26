import React, { useState } from "react";
import SignupDisplay from "../Components/Users/SignupDisplay";
import { addAuthentication, selectRole } from "../Features/AuthSlice";
import { useDispatch } from "react-redux";
import { manualSignup } from "../Services/manualSignup.service";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../Config/Firebase";
import { checkUser } from "../Services/checkBeforeLogin.service";
import { message } from "antd";
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const error = (message) => {
    messageApi.open({
      type: "error",
      content: message,
      duration: 5,
    });
  };
  const warning = (message) => {
    messageApi.open({
      type: "warning",
      content: message,
      duration: 5,
    });
  };
  const handleInputChange = (e) => {
    // console.log(number.length);
    setNumberError("");
    if (e.target.value.length > 10) {
      setNumberError("Max Length 10 are allowed");
    } else if (!isNaN(e.target.value)) {
      setNumber("");
      setNumber(e.target.value.trim());
    } else {
    }
  };
  //This function is used to register a user manually
  const onManualSignup = async (e) => {
    e.preventDefault();
    if (name === "") {
      warning("Please Fill Name!!");
    } else if (password.length <= 6 || password.length > 10) {
      warning(
        "Password should be greater than 6 characters and less than 9 characters!!"
      );
    } else if (emailError !== "Valid Email :)"||email==="") {
      warning("Please fill email properly!!");
    } else {
      const res = await manualSignup(name, password, email, number===''?Date.now():number);
      // console.log(res);
      if (res.status === 201) {
        dispatch(
          addAuthentication({
            id: res.data.creation._id,
            email: res.data.creation.email,
            address: res.data.creation.address,
            name: res.data.creation.name,
            country: res.data.creation.country,
            state: res.data.creation.state,
          })
        );
        // success("You are registered successfully!!");
        setName("");
      setPassword("");
      setEmail("");
        navigate("/role");
      } else if (res.status === 203) {
        error("Email already exists");
        // navigate("/login");
      }
      else if(res.status===202){
        error("Phone Number already exists!!");
      }
    }
  };

  //This function will help to sign in user with google
  const signInGoogle = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const data = res._tokenResponse;
      // console.log(data);
      const result = await checkUser(data.email, "password");
      // console.log(result);
      if (result.status === 200) {
        const res = await manualSignup(
          data.displayName,
          "password",
          data.email
        );
        // console.log(res);
        if (res.status === 201) {
          dispatch(
            addAuthentication({
              id: res.data.creation._id,
              email: res.data.creation.email,
              address: res.data.creation.address,
              name: res.data.creation.name,
              country: res.data.creation.country,
              state: res.data.creation.state,
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
          // console.log(data);
          dispatch(
            addAuthentication({
              id: data.result._id,
              email: data.result.email,
              address: data.result.address,
              name: data.result.name,
              country: data.result.country,
              state: data.result.state,
            })
          );
          dispatch(selectRole(data.result.role));
          navigate("/home");
        }
      }
    } catch (err) {
      // console.log(err);
      const msg="Error (auth/cancelled-popup-request)/(auth/pop close by user)"
      warning(msg);
    }
  };
  return (
    <>
      {contextHolder}
      <SignupDisplay
        name={name}
        password={password}
        email={email}
        setName={setName}
        setPassword={setPassword}
        setEmail={setEmail}
        onManualSignup={onManualSignup}
        signInGoogle={signInGoogle}
        handleInputChange={handleInputChange}
        numberError={numberError}
        number={number}
        emailError={emailError}
        setEmailError={setEmailError}
      />
    </>
  );
};

export default Signup;
