import React from 'react';
import { FaShoppingCart } from 'react-icons/fa'; 


function CartIcon() {
  return (
    <div className="cart-icon">
      <FaShoppingCart />
      <span className="cart-count">0</span> 
    </div>
  );
}

export default CartIcon;