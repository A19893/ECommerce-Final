import React, { useState, useEffect } from "react";
import { getBestProducts } from "../../Services/getBestProducts.service";
import { useNavigate } from "react-router-dom";
const BestProducts = () => {
  const [Products, setProducts] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      const response = await getBestProducts();
      // console.log("--response", response);
      if (response.status === 200) {
        setProducts(response.data.result);
      }
    };
    getData();
  }, []);
  const selectProduct = (id) => {
    navigate("/specific", { state: id });
  };
  return (
    <div className="bestProd">
      <div className="addProduct-item">
        <img
          src="https://img.freepik.com/premium-vector/best-seller-banner-thumbs-up_97458-366.jpg"
          alt="best seller"
        />
      </div>
      <div className="bestProduct-container">
        {Products?.map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              <div
                className="bestProduct"
                onClick={() => selectProduct(item._id)}
                key={idx}
              >
                <div className="bestImg">
                  <img src={item.image[0]} alt="Missing" />
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default BestProducts;
