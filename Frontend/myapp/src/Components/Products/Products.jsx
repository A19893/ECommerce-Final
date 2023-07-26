import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../Services/getAllProducts.service";
import { Rate } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveProducts } from "../../Features/ProductSlice";
const Products = (props) => {
  const dispatch=useDispatch();
  const [products, setProducts] = useState(null);
  const userId = useSelector((state) => state.authentication.loggedinUserId);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      const products = await getAllProducts();
      // console.log(products);
      dispatch(saveProducts(products?.data.result))
      setProducts(products?.data.result);
    };
    getData();
  }, []);
  const selectProduct = (id) => {
    navigate("/specific", { state: id });
  };
  // console.log("category", props.category);
  return (
    <>
      <div className="prodHeader">Featured Products</div>
      <div className="productContainer">
        {products?.map((item, idx) => {
          if (item.CreatedBy !== userId && item.Status === "Publish")
            if (
              item.name.toLowerCase().includes(props.searchItem.toLowerCase())
            ) {
              if (props.category !== "not selected") {
                if (
                  item.category.toLowerCase() === props.category.toLowerCase()
                )
                  return (
                    <React.Fragment key={idx}>
                      <div
                        className="specificProd"
                        onClick={() => selectProduct(item._id)}
                      >
                        <div className="prodImg">
                          <img src={item.image[0]} alt="Missing" />
                        </div>
                        <div>{item.name}</div>
                        <div>&#x20B9;{item.price}</div>
                        <div>
                          <Rate
                            allowHalf
                            disabled
                            defaultValue={item.ratings}
                          />
                        </div>
                      </div>
                    </React.Fragment>
                  );
              } else {
                return (
                  <React.Fragment key={idx}>
                    <div
                      className="specificProd"
                      onClick={() => selectProduct(item._id)}
                    >
                      <div className="prodImg">
                        <img src={item.image[0]} alt="Missing" />
                      </div>
                      <div>{item.name}</div>
                      <div>&#x20B9;{item.price}</div>
                      <div>
                        <Rate allowHalf disabled defaultValue={item.ratings} />
                      </div>
                    </div>
                  </React.Fragment>
                );
              }
            } 
        })}
      </div>
    </>
  );
};

export default Products;
