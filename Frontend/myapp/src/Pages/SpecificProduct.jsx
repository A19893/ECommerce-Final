import { useEffect, useState, Fragment } from "react";
import { useLocation } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { Rate, Button,message} from "antd";
import { addToCart } from "../Services/addToCart.service";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const SpecificProduct = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [ProductData, setProductData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [coupon, setCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [clicked, setClicked] = useState(false);
  const userId = useSelector((state) => state.authentication.loggedinUserId);
  const products=useSelector((state)=>(state.product.Products));
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    const getData = async () => {
      const FilteredData=products.filter((item)=>{
        return item._id===state;
      })
       setProductData(FilteredData[0]);
      // console.log(FilteredData)
    };
    getData();
  }, []);
  const warning = (message) => {
    messageApi.open({
      type: "warning",
      content: message,
      duration: 5,
    });
  };

  const success = (message) => {
    messageApi.open({
      type: "success",
      content: message,
      duration: 5,
    });
  };
  // console.log(ProductData)
  const increaseQuantity = () => {
    if (ProductData?.Stock <= quantity)
      warning("We don't have more quantity in stock");
    else {
      const qty = quantity + 1;
      setQuantity(qty);
    }
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const couponHandler = (e) => {
    console.log(e.target.value);
    if (couponCode === "BOGO500") {
      setCoupon(true);
      (setProductData(p=>({...p,price:(p?.price-500)})))
    } else {
      if(couponCode!==""){
      warning("Coupon Code not Valid!!");
      }
      else{
        warning("Please enter coupon code!!");
      }
    }
  };
  const addToCartHandler = async () => {
    setClicked(true);
    // console.log("----product---", ProductData);
    const response = await addToCart(ProductData, quantity, userId);
    // console.log("response", response);
    if (response.status === 200) {
      success();
      setTimeout(() => {
        setClicked(false);
        navigate("/cart");
      }, 1000);
    } 
    else if (response.status === 201) {
      success();
      setTimeout(() => {
        setClicked(false);
        navigate("/cart");
      }, 1000);
    }
  };
  return (
    <>
    {contextHolder}
      <Fragment>
        <div className="ProductDetails">
          <div>
            <Carousel sx={{ width: "450px" }}>
              {ProductData?.image &&
                ProductData?.image?.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={i}
                    src={item}
                    alt={`${i} Slide`}
                  />
                ))}
            </Carousel>
          </div>
          <div>
            <div className="detailsBlock-1">
              <h2>{ProductData?.name}</h2>
              <p>Product #{ProductData?._id}</p>
            </div>
            <div className="detailsBlock-2">
              <div>
                <Rate allowHalf disabled value={ProductData?.ratings} />
              </div>
              {/* <span>{`(${ProductData?.ReviewsCount}Reviews)`}</span> */}
            </div>
            <div className="detailsBlock-3">
              <h1>
              ₹{ProductData?.price}
              </h1>
              <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                  <button onClick={decreaseQuantity}>-</button>
                  <input readOnly type="number" value={quantity} />
                  <button onClick={increaseQuantity}>+</button>
                </div>
                <button
                  disabled={
                    ProductData?.Stock < 1
                      ? true
                      : false || clicked===true
                      ? true
                      : false
                  }
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </button>
              </div>
              <p>
                Status:&nbsp;&nbsp;
                <b
                  className={ProductData?.Stock < 1 ? "redColor" : "greenColor"}
                >
                  {ProductData?.Stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>
            </div>
            <div className="detailsBlock-4">
              Coupons:{" "}
              <input
                type="text"
                className="coupon"
                disabled={
                  coupon?true:false
                }
                onChange={(e) => setCouponCode(e.target.value)}
              />
              &nbsp;&nbsp;
              {coupon ? (
                <Button
                  type="primary"
                  style={{ backgroundColor: "black", color: "white" }}
                  onClick={(e) => couponHandler(e)}
                  disabled
                >
                  Apply Coupon
                </Button>
              ) : (
                <Button
                  type="primary"
                  style={{ backgroundColor: "black", color: "white" }}
                  onClick={(e) => couponHandler(e)}
                >
                  Apply Coupon
                </Button>
              )}
              <br />
              Description : <p>{ProductData?.description}</p>
            </div>
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default SpecificProduct;
