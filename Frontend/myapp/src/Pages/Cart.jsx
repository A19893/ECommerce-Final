import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCartItems } from "../Services/getCartItems.service";
import NoItem from "../Components/Products/NoItem";
import PresentItem from "../Components/Products/PresentItem";
import { addCartItems } from "../Features/CartSlice";
import { useDispatch } from "react-redux";
const Cart = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.authentication.loggedinUserId);
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  
  useEffect(() => {
    const getData = async () => {
      const response = await getCartItems();
      // console.log("------response", response);
      const FilteredData = response.data.OrdersInCart.filter(
        (item) => item.PurchasedBy === userId
      );
      dispatch(addCartItems(FilteredData));
      setProducts(FilteredData);
    };
    getData();
  }, [reload]);

  return (
    <>
      {/* {console.log(products)} */}
      {products?.length > 0 ? (
        <PresentItem
          products={products}
          setReload={setReload}
          reload={reload}
        />
      ) : (
        <NoItem />
      )}
    </>
  );
};

export default Cart;
