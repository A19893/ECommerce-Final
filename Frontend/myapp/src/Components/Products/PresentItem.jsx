import React from "react";
import { Button,message } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Quantity from "../Cart/Cart.Quantity";
import { removeCart } from "../../Services/removeCart.service";
import NavBar from "../NavBar";
const PresentItem = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = (message) => {
    messageApi.open({
      type: 'success',
      content: message,
      duration:5
    });
  };
  const Address = useSelector(
    (state) => state.authentication.loggedInUserAddress
  );
  const navigate = useNavigate();
  // console.log(Address);
  let TotalSum = 0;
  // console.log("Products", props.products);
  const checkOut = () => {
    // console.log("clicked", Address);
    navigate("/address");
    return;
  };
  const removeHandler = async (id) => {
    const res = await removeCart(id);
    if (res.status === 200) {
      success("Item Removed Successfully");
      props.setReload(!props.reload);
    }
    // console.log(res);
  };
  return (
    <>
    {contextHolder}
      <NavBar />
      <div className="cart-Item">
        <h1 className="prodHeader">Your Cart Items</h1>
        {props.products?.map((item, idx) => {
          TotalSum += item.Quantity * item.Order.price;
          return (
            <div key={idx} className="specific-Cart">
              <div className="cart-Img">
                <img src={item.Order.image[0]} alt="Missing" />
              </div>
              <div className="cart-Description">
                <span>{item.Order.description}</span>
              </div>
              <Quantity Quants={item.Quantity} />
              <div className="cart-Price">
                <span>₹{item.Quantity * item.Order.price}</span>
              </div>
              <div className="cart-Button">
                <Button
                  style={{ backgroundColor: "red" }}
                  onClick={() => removeHandler(item._id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          );
        })}
        <div className="cart-TotalPrice">Total Price-₹{TotalSum}</div>
        <div className="checkOut-Btn">
          <Button type="primary" onClick={() => checkOut()}>
            CheckOut
          </Button>
        </div>
      </div>
    </>
  );
};

export default PresentItem;
