import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from './CartManager';
import '../styles/Cart.css';

const Cart = ({ isOpen, toggleCart }) => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext); // Agregamos clearCart para vaciar el carrito
  const [quantitiesToUpdate, setQuantitiesToUpdate] = useState({});
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const validCoupons = {
    'OFERTA10': 10,
    'OFERTA20': 20
  };

  useEffect(() => {
    const initialQuantities = {};
    cartItems.forEach(item => {
      initialQuantities[item.id] = item.quantity;
    });
    setQuantitiesToUpdate(initialQuantities);
  }, [cartItems]);

  const handleQuantityChange = (productId, value) => {
    const newQuantity = parseInt(value, 10) || 1;
    setQuantitiesToUpdate({ ...quantitiesToUpdate, [productId]: newQuantity });
  };

  const handleUpdateQuantity = (product) => {
    const newQuantity = quantitiesToUpdate[product.id] || product.quantity;

    if (newQuantity > product.stock) {
      alert(`No hay suficiente stock para ${product.name}.`);
    } else if (newQuantity < 1) {
      alert('La cantidad debe ser al menos 1.');
    } else {
      addToCart(product, newQuantity - product.quantity);
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountAmount = ((totalPrice * discount) / 100).toFixed(2); 
  const discountedPrice = (totalPrice - discountAmount).toFixed(2);

  const applyCoupon = () => {
    if (validCoupons[coupon]) {
      setDiscount(validCoupons[coupon]);
      alert(`Cupón aplicado: ${validCoupons[coupon]}% de descuento`);
    } else {
      alert('Cupón no válido');
      setDiscount(0);
    }
  };

  // Función para manejar la compra
  const handlePurchase = () => {
    alert(`¡Gracias por tu compra! El total de tu pedido es de $${discountedPrice}. \nRecibirás un correo con el detalle de tu compra.`);

    // Lógica para vaciar el carrito
    clearCart();

    // Aquí puedes agregar lógica adicional como redirigir al usuario o mostrar un mensaje de confirmación
  };

  return (
    <div className={`cart-container ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h2>Carrito de Compras</h2>
        <button onClick={toggleCart} className="close-button">X</button>
      </div>
      <div className="cart-content">
        {cartItems.length === 0 ? (
          <p>Tu carrito está vacío</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <p>{item.name} - ${item.price} x {item.quantity}</p>
                <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                
                <label>Cantidad:</label>
                <input
                  type="number"
                  min="1"
                  max={item.stock}
                  value={quantitiesToUpdate[item.id] !== undefined ? quantitiesToUpdate[item.id] : item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                />
                <button onClick={() => handleUpdateQuantity(item)}>
                  Actualizar
                </button>
                <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
              </div>
            ))}

            {/* Campo de entrada del cupón */}
            <div className="coupon-section">
              <label htmlFor="coupon">Cupón de descuento:</label>
              <input 
                type="text" 
                id="coupon" 
                value={coupon} 
                onChange={(e) => setCoupon(e.target.value.toUpperCase())} 
                placeholder="Ingresa tu cupón"
              />
              <button onClick={applyCoupon}>Aplicar Cupón</button>
            </div>

            {/* Mostrar el descuento si se ha aplicado */}
            {discount > 0 && (
              <>
                <p>Descuento aplicado: {discount}%</p>
                <p>Total descuento: -${discountAmount}</p>
              </>
            )}

            <div className="total">
              Total con descuento: ${discountedPrice}
            </div>

            {/* Botón para comprar */}
            <button className="checkout-button" onClick={handlePurchase}>
              Comprar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;