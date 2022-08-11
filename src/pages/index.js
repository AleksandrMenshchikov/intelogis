import styles from './index.module.css'
import React from "react";
import Orders from "../components/orders/orders";
import Map from "../components/map/map";

const IndexPage = React.forwardRef((props, ref) => {
  return (
    <div className={styles.container}>
      <Orders ref={ref} />
      <Map />
    </div>
  );
});

export default IndexPage;
