import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

const LinkBox = (props) => {
  const navigate = useNavigate();

  const handleLink = () => {
    if ("onClick" in props) props.onClick();
    if ("to" in props) navigate(props.to);
  };

  return (
    <Box
      onMouseEnter={() => ("onMouseEnter" in props ? props.onMouseEnter() : "")}
      onMouseOut={() => ("onMouseOut" in props ? props.onMouseOut() : "")}
      onClick={() => handleLink()}
      sx={props.sx ? { ...props.sx } : {}}
    >
      {props.children}
    </Box>
  );
};

export default LinkBox;
