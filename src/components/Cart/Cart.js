import React, { useContext } from "react";
import cartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
export default function Cart(props) {
  const cartCtx = useContext(cartContext);

  const { items } = cartCtx;
  const hasItems = items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    const copyItem = { ...item };
    copyItem.amount = 1;
    cartCtx.addItem(copyItem);
  };
  const cartItems = (
    <ul className={styles["cart-items"]}>
      {items.map((item) => {
        return (
          <CartItem
            price={item.price}
            amount={item.amount}
            key={item.id}
            name={item.name}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
}
