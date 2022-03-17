import React from "react";
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
        width: "25%",
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

export default LinkDiv;
