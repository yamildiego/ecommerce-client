import React from "react";
import { connect } from "react-redux";

import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

function LinkDiv(props) {
  const navigate = useNavigate();
  const to = () => navigate(props.to);

  return (
    <Box
      sx={{
        backgroundColor: "#f6f6f6",
        borderRight: "1px solid #d6d6d6",
        width: props.width + "%",
        borderBottom: "1px solid #d6d6d6",
        userSelect: "none",
        cursor: "pointer",
      }}
      onClick={() => to()}
    >
      {props.children}
    </Box>
  );
}

function mapStateToProps(state, props) {
  let size = state.configReducer.dimensions.size;
  let width = size === "S" ? 50 : size === "M" ? 33 : 25;
  return {
    width,
  };
}

export default connect(mapStateToProps)(LinkDiv);
