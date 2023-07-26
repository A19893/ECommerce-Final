import React from "react";
import { useLocation } from "react-router-dom";
import { Button,message } from "antd";
import { useNavigate } from "react-router-dom";
import OrderTrack from "../Components/Orders/OrderTrack";
import { getDateDifference } from "../Components/UserInterface/DateDifference";
import { updateOrder } from "../Services/updateOrder.service";
const SpecificOrder = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  // console.log("-----state----", state);
  const [messageApi, contextHolder] = message.useMessage();
  const TotalPrice = state.shippingPrice + state.subTotal + state.taxPrice;
  const success = (message) => {
    messageApi.open({
      type: "success",
      content: message,
      duration: 5,
    });
  };
  const warning = (message) => {
    messageApi.open({
      type: "success",
      content: message,
      duration: 5,
    });
  };
  const handleCancel = async () => {
    const Time = getDateDifference(state.createdAt);
    if (Time < 24) {
      const response = await updateOrder(state._id, "Cancelled");
      if (response.status === 200) {
        success("You order has been cancelled");
      }
    } else {
      warning("You cannot cancel order as it has been more than 24 hours!!");
    }
  };
  return (
    <>
    {contextHolder}
    <div className="order-container">
      <div className="OrderPlaced">
        <div className="order-display">
          <span
            style={{
              fontWeight: "800",
              fontFamily: "Times New Roman",
              display: "table",
              margin: "auto",
              marginTop: "20px",
            }}
          >
            Your Order
          </span>
        </div>
        <div>
          {state.orderStatus === "Cancelled" ? (
            <span
              style={{
                display: "table",
                margin: "auto",
                fontSize: "25px",
                fontWeight: "600",
                color: "red",
              }}
            >
              Your Order has been cancelled!!
            </span>
          ) : (
            <OrderTrack status={state.orderStatus} />
          )}
        </div>
        <div className="order-summary">
          <h4 style={{ display: "table", margin: "auto", marginTop: "50px" }}>
            Order Summary
          </h4>
          <div className="order-items">
            <div className="order-desc">
              <hr />
              <div className="order-specific">
                <div className="order-img">
                  <img src={state.order.image[0]} alt="missing" />
                </div>
                <div className="order-detail">
                  <div className="order-price">
                    <div className="order-name">Product Name</div>
                    <div className="order-name">{state.order.name}</div>
                  </div>
                  <div className="order-price">
                    <div className="order-name">Category</div>
                    <div className="order-name">{state.order.category}</div>
                  </div>
                  <hr />
                  <div className="order-price">
                    <div className="order-name">Product ID</div>
                    <div className="order-name">#{state._id}</div>
                  </div>
                  <div className="order-price">
                    <div className="order-name">Price</div>
                    <div className="order-name">₹{state.order.price}</div>
                  </div>
                  <div className="order-price">
                    <div className="order-name">Vendor ID</div>
                    <div className="order-name">#{state.order.CreatedBy}</div>
                  </div>
                  <div className="order-price">
                    <div className="order-name">Quantity</div>
                    <div className="order-name">{state.Quantity}</div>
                  </div>
                  <hr />
                  <div className="order-price">
                  <div className="order-name">ShippingPrice</div>
                  <div className="order-name">₹{state.shippingPrice}</div>
                  </div>
                  <div className="order-price">
                  <div className="order-name">TaxPrice</div>
                  <div className="order-name">₹{state.taxPrice}</div>
                  </div>
                  <hr/>
                  <div className="order-price">
                    <div className="order-name">Subtotal Price</div>
                    <div className="order-name">₹{TotalPrice}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            {state.orderStatus !== "Cancelled" && state.orderStatus!=='Delivered'? (
              <Button
                style={{
                  backgroundColor: "red",
                  marginLeft: "10px",
                  width: "100px",
                }}
                onClick={() => {
                  handleCancel();
                }}
              >
                Cancel
              </Button>
            ) : (
              ""
            )}
            <Button
              className="proceedBtn"
              type="primary"
              onClick={() => navigate("/home")}
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SpecificOrder;
