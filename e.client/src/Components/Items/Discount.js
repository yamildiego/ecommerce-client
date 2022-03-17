import React from "react";
import Box from "@mui/material/Box";

import formatNumber from "../../Functions/formatNumber";

import "./Discount.css";

const Discount = (props) => {
  const percentage = 100 - (props.currentPrice * 100) / props.fullPrice;

  return (
    <React.Fragment>
      {props.currentPrice !== props.fullPrice && <Box className={"Discount"}>{`${formatNumber(percentage)}% off`}</Box>}
    </React.Fragment>
  );
};

export default Discount;
