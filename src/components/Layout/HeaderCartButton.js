import React, { useContext, useEffect, useState } from "react";
import cartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";

import styles from "./HeaderCartButton.module.css";

export default function HeaderCartButton(props) {
  const [btnIsHighlighted, setbtnIsHighlited] = useState(false);
  const ctxCart = useContext(cartContext);

  const { items } = ctxCart;

  const numberOfCartItems = items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setbtnIsHighlited(true);
    const timer = setTimeout(() => {
      setbtnIsHighlited(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
}
