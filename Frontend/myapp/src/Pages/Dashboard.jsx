import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { useSelector } from "react-redux";
const Dashboard = () => {
  const navigate = useNavigate();
  const userRole = useSelector(
    (state) => state.authentication.loggedInUserRole
  );
  const uploadProd = () => {
    navigate("/upload");
  };
  return (
    <div>
      <NavBar />
      <div className="dashBoard">
        <div className="cards">
          <div className="addProduct item" onClick={() => uploadProd("add")}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/10608/10608872.png"
              alt="add product"
            />
            <h2>Add Products</h2>
          </div>
          <div
            className="ViewProduct item"
            onClick={() => navigate("/viewProducts")}
          >
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/product-5806313-4863042.png"
              alt="add product"
            />
            <h2>View Products</h2>
          </div>
          <div className="Orders item" onClick={() => navigate("/viewOrders")}>
            <img
              src="https://icon-library.com/images/orders-icon/orders-icon-12.jpg"
              alt="add product"
            />
            <h2>View Orders</h2>
          </div>
          {userRole === "Admin" ? (
            <>
              <div
                className="Orders item"
                onClick={() => navigate("/viewUsers")}
              >
                <img
                  src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/users5.png"
                  alt="add product"
                />
                <h2>View Users</h2>
              </div>
              <div
                className="Orders item"
                onClick={() => navigate("/viewVendors")}
              >
                <img
                  src="https://icon-library.com/images/vendor-icon/vendor-icon-16.jpg"
                  alt="add product"
                />
                <h2>View Vendors</h2>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
