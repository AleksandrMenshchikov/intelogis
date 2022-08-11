import styles from "./iconScreenDivider.module.css";
import React from "react";
import { CaretLeftOutlined } from "@ant-design/icons";
import { CaretRightOutlined } from "@ant-design/icons";

const IconScreenDivider = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className={styles.container}>
      <CaretLeftOutlined className={styles.arrowLeft} />
      <CaretRightOutlined className={styles.arrowRight} />
    </div>
  );
});

export default React.memo(IconScreenDivider);
