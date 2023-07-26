import React from "react";
import { useSelector } from "react-redux";
import User from "./User";
import Admin from "./Admin";
import Vendor from "./Vendor";
const Home = () => {
  const role = useSelector((state) => state.authentication.loggedInUserRole);
  return (
    <>
      {(() => {
        if (role === "Admin") {
          return <Admin />;
        } else if (role === "User") {
          return <User />;
        } else {
          return <Vendor />;
        }
      })()}
    </>
  );
};

export default Home;
