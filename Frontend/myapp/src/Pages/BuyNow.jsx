import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckOutSteps from "../Components/Orders/CheckOutSteps";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { removeOrder } from "../Features/OrderSlice";
import { removeCartItems } from "../Services/removeFromCart.service";
import { removeReduxCart } from "../Features/CartSlice";
import { removeSpecificOrder } from "../Services/removeSpecificOrder";
import { updateProduct } from "../Services/updateStock.service";
import { updatePurchaseCount } from "../Services/updatePurchaseCount.service";
const BuyNow = () => {
  const order = useSelector((state) => state.orders.CurrentOrderPlaced);
  // console.log("----placed order", order);
  const orderItems = useSelector((state) => state.cart.CartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log("-------orderItems----", orderItems);
  let subTotal = 0;
  const username = useSelector(
    (state) => state.authentication.loggedInUserName
  );
  const updateStock = async () => {
    if(order){
    orderItems?.map(async (item) => {
      await updateProduct(item.Order._id, item.Order.Stock - item.Quantity);
    });
  }
  else{
    navigate('/home')
  }
  };
  const PurchaseCount = () => {
    if(order){
    orderItems?.map(async (item) => {
      await updatePurchaseCount(item.Order._id, item.Order.PurchaseCount + 1);
    });
  }
  else{
    navigate('/home')
  }
  };
  const cancelHandler = async () => {
    if(order){
    order?.map(async (item) => {
      const res = await removeSpecificOrder(item._id);
      // console.log("----res---", res);
    });
    dispatch(removeOrder());
    navigate("/home");
  }
  else{
    navigate('/home')
  }
  };
  const proceedHandler = async () => {
    if(order){
    updateStock();
    PurchaseCount();
    await removeCartItems(orderItems);
    dispatch(removeReduxCart());
    dispatch(removeOrder());
    navigate("/confirm");
    }
    else{
      navigate('/home')
    }
  };
  const date = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <>
      <NavBar />
      <CheckOutSteps activeStep={1} />
      <div className="order-container">
        <div className="OrderPlaced">
          <div className="order-Confirm">
            <span
              style={{
                fontWeight: "800",
                fontFamily: "Times New Roman",
                display: "table",
                margin: "auto",
                marginTop: "20px",
              }}
            >
              ORDER CONFIRMATION
            </span>
            <div
              className="order-user"
              style={{
                fontWeight: "300",
                fontFamily: "Times New Roman",
                display: "table",
                margin: "auto",
                marginTop: "40px",
              }}
            >
              {username}, please confirm your order!
            </div>
            <span
              style={{
                fontWeight: "400",
                fontFamily: "Times New Roman",
                display: "table",
                margin: "auto",
                marginTop: "20px",
              }}
            >
              Order will be delivered at {order[0]?.shippingInfo?.address??"Dummy Address"}
            </span>
          </div>
          <div className="order-summary">
            <h4 style={{ display: "table", margin: "auto", marginTop: "50px" }}>
              Order Summary
            </h4>
            <span
              style={{ display: "table", margin: "auto", marginTop: "30px" }}
            >
              {monthNames[date.getMonth()]} {date.getUTCDate()},{" "}
              {date.getFullYear()}
            </span>
            <div className="order-items">
              <div className="order-desc">
                <hr />
                {order?.map((item, idx) => {
                  subTotal += item.Quantity * item.order.price;
                  return (
                    <>
                      <div className="order-specific">
                        <div className="order-img">
                          <img src={item.order.image[0]} alt="missing" />
                        </div>
                        <div className="order-detail">
                          <div className="order-price">
                            <div className="order-name">Product Name</div>
                            <div className="order-name">{item.order.name}</div>
                          </div>
                          <div className="order-price">
                            <div className="order-name">Category</div>
                            <div className="order-name">
                              {item.order.category}
                            </div>
                          </div>
                          <hr />
                          <div className="order-price">
                            <div className="order-name">Product ID</div>
                            <div className="order-name">#{item.order._id}</div>
                          </div>
                          <div className="order-price">
                            <div className="order-name">Price</div>
                            <div className="order-name">
                              ₹{item.order.price}
                            </div>
                          </div>
                          <div className="order-price">
                            <div className="order-name">Vendor ID</div>
                            <div className="order-name">
                              #{item.order.CreatedBy}
                            </div>
                          </div>
                          <div className="order-price">
                            <div className="order-name">Quantity</div>
                            <div className="order-name">{item.Quantity}</div>
                          </div>
                          <hr />
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            <div className="order-total">
              <span
                style={{
                  fontWeight: "800",
                  fontFamily: "Times New Roman",
                  display: "table",
                  margin: "auto",
                  marginTop: "20px",
                }}
              >
                Order Total
              </span>
              <hr />
              <div className="order-price">
                <div className="order-name">Subtotal Price</div>
                <div className="order-name">₹{subTotal}</div>
              </div>
              <hr />
            </div>
            <div>
              <Button
                style={{
                  backgroundColor: "red",
                  marginLeft: "10px",
                  width: "100px",
                }}
                onClick={cancelHandler}
              >
                Cancel
              </Button>
              <Button
                className="proceedBtn"
                type="primary"
                onClick={proceedHandler}
              >
                Proceed
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyNow;
