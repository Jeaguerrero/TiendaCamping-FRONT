import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from './CartManager';
import '../styles/Cart.css';

const Cart = ({ isOpen, toggleCart }) => {
  const { cartItems, removeFromCart, addToCart, setCartItems } = useContext(CartContext);
  const [quantitiesToUpdate, setQuantitiesToUpdate] = useState({});
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [userName, setUserName] = useState(''); // Para almacenar el nombre del usuario

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

  // **Aquí está la función handleCheckout con el nombre del usuario**
  const handleCheckout = async () => {
    if (!userName) {
      alert('Por favor, ingresa tu nombre para finalizar la compra');
      return;
    }

    const orderData = {
      count: cartItems.length,
      date: new Date().toISOString().slice(0, 10), 
      finalPrice: discountedPrice, 
      user: { name: userName } // Aquí enviamos el nombre del usuario
    };

    try {
      const response = await fetch('http://localhost:8080/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Error al crear la orden');
      }

      const createdOrder = await response.json();

      await Promise.all(
        cartItems.map((item) =>
          fetch('http://localhost:8080/order-items', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              product: { id: item.id },
              quantity: item.quantity,
              finalPrice: item.price * item.quantity,
              order: { id: createdOrder.id },
            }),
          })
        )
      );

      // Vaciar el carrito
      setCartItems([]);
      alert('Compra realizada con éxito');
    } catch (error) {
      console.error('Error en el proceso de compra:', error);
      alert('Hubo un error en el proceso de compra');
    }
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
                <button onClick={() => handleUpdateQuantity(item)}>Actualizar</button>
                <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
              </div>
            ))}

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

            {discount > 0 && (
              <>
                <p>Descuento aplicado: {discount}%</p>
                <p>Total descuento: -${discountAmount}</p>
              </>
            )}

            <div className="total">
              Total: ${discountedPrice}
            </div>

            {/* Ingresar el nombre del usuario antes de finalizar la compra */}
            <div className="user-name-section">
              <label htmlFor="userName">Nombre del comprador:</label>
              <input 
                type="text" 
                id="userName" 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} 
                placeholder="Ingresa tu nombre"
              />
            </div>

            <button onClick={handleCheckout} className="checkout-button">
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
