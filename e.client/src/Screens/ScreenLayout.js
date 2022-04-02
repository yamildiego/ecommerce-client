import React from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import Header from "../Components/Header/Header";

const ScreenLayout = (props) => {
  const { size } = props;
  return (
    <Box id={"top"} sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <Header navigate={props.navigate} />
      {props.limitWidth && (
        <Stack
          direction={"column"}
          sx={size === "S" ? { ml: 0, mr: 0 } : { width: size === "L" ? "1000px" : "auto", ml: 2, mr: 2, margin: "auto" }}
        >
          {props.children}
        </Stack>
      )}
      {!props.limitWidth && props.children}
    </Box>
  );
};

function mapStateToProps(state, props) {
  return {
    size: state.configReducer.dimensions.size,
  };
}
export default connect(mapStateToProps)(ScreenLayout);
