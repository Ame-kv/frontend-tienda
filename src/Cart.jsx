import React from "react";
import styles from "./Cart.module.css";

const Cart = ({ cartItems, onRemoveItem, onCheckout }) => {
  const total = cartItems.reduce((sum, item) => sum + item.precio, 0);

  return (
    <div className={styles.cartContainer}>
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className={styles.cartList}>
            {cartItems.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <img src={item.imagen} alt={item.nombre} className={styles.cartItemImage} />
                <div className={styles.cartItemDetails}>
                  <h3>{item.nombre}</h3>
                  <p>${item.precio}</p>
                  <button onClick={() => onRemoveItem(item.id)} className={styles.removeButton}>
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.cartTotal}>
            <h3>Total: ${total.toFixed(2)}</h3>
          </div>
          <button onClick={onCheckout} className={styles.checkoutButton}>
            Proceder al Pago
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
