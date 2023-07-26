import React from "react";
import nocart from "../../Assets/no-cartItem.PNG";
import NavBar from "../NavBar";
const NoItem = () => {
  return (
    <>
      <NavBar />
      <div className="cart-container">
        <div className="no-cart">
          <img src={nocart} alt="Missing" />
        </div>
      </div>
    </>
  );
};

export default NoItem;
