import React from "react";
import Box from "@mui/material/Box";

import Header from "../Components/Header/Header";

const ScreenLayout = (props) => {
  return (
    <Box id={"top"} sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <Header />
      {props.children}
    </Box>
  );
};

export default ScreenLayout;
