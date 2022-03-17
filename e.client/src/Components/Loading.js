import React, { Component } from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

class Loading extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.isLoading && (
          <Box
            sx={{
              display: "flex",
              flex: 1,
              position: "absolute",
              zIndex: 200,
              width: "100%",
              justifyContent: "center",
              backgroundColor: "#6e6e6e7a",
              pt: 5,
              height: "100%",
            }}
          >
            <CircularProgress size={45} />
          </Box>
        )}
      </React.Fragment>
    );
  }
}

export default Loading;
