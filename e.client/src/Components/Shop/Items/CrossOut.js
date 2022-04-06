import React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import formatNumber from "../../../Functions/formatNumber";

const CrossOut = (props) => {
  return (
    <div style={{ position: "relative" }}>
      {props.currentPrice !== props.fullPrice && (
        <React.Fragment>
          <div style={{ position: "absolute", transform: " rotate(-11deg)", bottom: "15px", left: "0", borderBottom: "1px solid red" }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <Stack direction="row" spacing={0}>
            <Box sx={{ textAlign: "left", color: "#aaa", pl: 1, fontSize: "12px" }}>${formatNumber(props.fullPrice)}</Box>
            <Box sx={{ textAlign: "left", color: "#222", pl: 1 }}>${formatNumber(props.currentPrice)}</Box>
          </Stack>
        </React.Fragment>
      )}
      {props.currentPrice === props.fullPrice && (
        <React.Fragment>
          <Stack direction="row" spacing={0}>
            <Box sx={{ textAlign: "left", color: "#222", pl: 1 }}>${formatNumber(props.fullPrice)}</Box>
          </Stack>
        </React.Fragment>
      )}
    </div>
  );
};

export default CrossOut;
