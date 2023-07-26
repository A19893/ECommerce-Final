import React, { useState } from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateAddress } from "../Services/updateUserAddress.service";
import { Country, State } from "country-state-city";
import { CloseOutlined } from "@ant-design/icons";
import { createOrder } from "../Services/createOrder.service";
import { placedOrder } from "../Features/OrderSlice";
import CheckOutSteps from "../Components/Orders/CheckOutSteps";
import { setReduxAddress } from "../Features/AuthSlice";
const Address = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderItems = useSelector((state) => state.cart.CartItems);
  const user = useSelector((state) => state.authentication.loggedinUserId);
  const savedAddress=useSelector((state) => state.authentication.loggedInUserAddress);
  const savedState=useSelector((state) => state.authentication.loggedInUserState);
  const savedCountry=useSelector((state) => state.authentication.loggedInUserCountry);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const loggedInUserId = useSelector((state) => state.authentication.loggedinUserId);
  const [address, setAddress] = useState();
  const [country, setCountry] = useState();
  const [states, setStates] = useState();
  const [pincode, setPincode] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");
  // console.log("----cart----", orderItems);
  const handleSubmit = async (e) => {
    // Handle form submission logic here
    e.preventDefault();
    dispatch(setReduxAddress({address:address??savedAddress,country:country??savedCountry,states:states??savedState}));
    await updateAddress(loggedInUserId, address,country,states);
    const shippingInfo = { address:address??savedAddress, country:country??savedCountry,states:states??savedState,pincode, phoneNumber };
    orderItems.map(async (item) => {
      let subTotal = item.Order.price * item.Quantity;
      const response = await createOrder(
        shippingInfo,
        item.Order,
        user,
        item.Quantity,
        subTotal
      );
      // console.log("-----order---", response);
      dispatch(placedOrder(response.data.orders));
    });
    setAddress("");
    setCountry("");
    setStates("");
    navigate("/buy");
  };
  const handleCancel = () => {
    navigate("/cart");
    setIsModalOpen(false);
  };
  // console.log(savedAddress)
  return (
    <>
      <CheckOutSteps activeStep={0} />
      <Modal
        title="Enter Your Address"
        closeIcon={<CloseOutlined onClick={handleCancel} />}
        open={isModalOpen}
        footer={null}
      >
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="address">Address:</label>
          <input
            style={{ padding: "15px" }}
            type="text"
            id="address"
            value={address??savedAddress}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <label htmlFor="countries">Country:</label>
          <select
             value={country??savedCountry}
            onChange={(e) => setCountry(e.target.value)}
            menuPlacement="top"
            required
            className="countries"
          >
            <option value="">Country</option>
            {(Country??savedCountry )&&
              Country.getAllCountries().map((item) => {
                return (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                );
              })}
          </select>
          <br />
          {/* select for state */}
          <label htmlFor="countries">State:</label>
          {(country??savedState) && (
            <select
              value={states??savedState}
              onChange={(e) => setStates(e.target.value)}
              menuPlacement="top"
              required
              className="countries"
            >
              <option value="">State</option>
              {State &&
                State.getStatesOfCountry(country??savedCountry).map((item) => {
                  return (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          )}
          <br/>
          <label htmlFor="pincode">Pincode:</label>
          <input
            style={{ padding: "15px" }}
            type="number"
            id="pincode"
            value={pincode}
            onChange={(e) =>e.target.value.length<=7 && setPincode(e.target.value)}
            required
          />

          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            style={{ padding: "15px" }}
            type="number"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => e.target.value.length<=10 && setPhoneNumber(e.target.value)}
            required
          />

          <button type="submit" style={{ padding: "15px", fontSize: "20px" }}>
            Buy Now
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Address;
