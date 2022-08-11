import styles from "./orders.module.css";
import React from "react";

const Orders = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className={styles.container}>
      orders
    </div>
  );
});

export default React.memo(Orders);
