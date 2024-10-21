import React from 'react';
import { FaShoppingCart } from 'react-icons/fa'; 


function CartIcon() {
  return (
    <div className="cart-icon">
      <FaShoppingCart />
      <span className="cart-count">0</span> {/* Número de artículos en el carrito */}
    </div>
  );
}

export default CartIcon;