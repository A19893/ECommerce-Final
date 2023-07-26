import React from "react";
import CheckOutSteps from "../Components/Orders/CheckOutSteps";
import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import NavBar from "../Components/NavBar";
const Confirm = () => {
  return (
    <div>
      <NavBar />
      <CheckOutSteps activeStep={2} />
      <div className="order-Confirm1">
        <span
          style={{
            fontWeight: "800",
            fontFamily: "Times New Roman",
            display: "table",
            margin: "auto",
            marginTop: "20px",
            paddingTop: "20px",
          }}
        >
          ORDER PLACED SUCCESSFULLY{" "}
          <LibraryAddCheckOutlinedIcon style={{ marginTop: "10px" }} />
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
          Your order is confirmed with us
        </div>
        <span
          style={{
            fontWeight: "400",
            fontFamily: "Times New Roman",
            display: "table",
            margin: "auto",
            marginTop: "20px",
          }}
          className="order-resp"
        >
          We've recieved your order and will contact you as soon as your package
        </span>
        <span
          style={{
            fontWeight: "400",
            fontFamily: "Times New Roman",
            display: "table",
            margin: "auto",
            marginTop: "20px",
          }}
        >
          is shipped. You can find your purchase information below.
        </span>
      </div>
    </div>
  );
};

export default Confirm;
