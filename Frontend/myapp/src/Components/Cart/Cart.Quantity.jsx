import React from "react";

const Quantity = (props) => {
  return (
    <>
      <div className="detailsBlock-3-1-1 cart-AddOn">
        {/* <button onClick={()=>decreaseQuantity()}>-</button> */}
        <label htmlFor="quntity">Quantity:</label>
        <input id="quantity" readOnly type="number" value={props.Quants} />
        {/* <button onClick={()=>increaseQuantity()}>+</button> */}
      </div>
    </>
  );
};

export default Quantity;
