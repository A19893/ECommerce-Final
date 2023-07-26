import React, { useState } from "react";
import Slider from "../Components/Slider";
import NavBar from "../Components/NavBar";
import Prodcuts from "../Components/Products/Products";
import BestProducts from "../Components/Products/BestProducts";
const User = () => {
  const [searchItem, setSearchItem] = useState("");
  const [category, setCategory] = useState("not selected");
  // console.log(category);
  return (
    <>
      <div className="home">
        <NavBar setSearchItem={setSearchItem} setCategory={setCategory} />
        <Slider />
        <BestProducts />
        <Prodcuts searchItem={searchItem} category={category} />
      </div>
    </>
  );
};
export default User;
