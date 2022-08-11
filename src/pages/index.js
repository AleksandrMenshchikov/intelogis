import React from "react";
import Orders from "../components/orders/orders";

const IndexPage = React.forwardRef((props, ref) => {
  return (
    <div>
      <Orders ref={ref} />
    </div>
  );
});

export default IndexPage;
