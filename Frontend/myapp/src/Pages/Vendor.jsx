import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import Slider from "../Components/Slider";
import Prodcuts from "../Components/Products/Products";
import BestProducts from "../Components/Products/BestProducts";
const Vendor = () => {
  const [searchItem, setSearchItem] = useState("");
  const [category, setCategory] = useState("not selected");
  return (
    <div>
      <NavBar setSearchItem={setSearchItem} setCategory={setCategory} />
      <Slider />
      <BestProducts />
      <Prodcuts searchItem={searchItem} category={category} />
    </div>
  );
};

export default Vendor;
