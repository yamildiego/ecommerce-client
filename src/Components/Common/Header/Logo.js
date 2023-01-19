import React, { Component } from "react";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";

import Box from "@mui/material/Box";

import * as Config from "../../../Constants/Config";

class Logo extends Component {
  render() {
    return (
      <Box sx={{ m: 1, cursor: "pointer" }}>
        <img
          src={this.props.width > 1024 || isMobile ? Config.LOGO : Config.SMALL_LOGO}
          alt={Config.NAME}
          loading="lazy"
          style={{
            maxWidth: "145px",
            maxHeight: "48px",
            width: this.props.width > 1024 || isMobile ? "auto" : "40px",
          }}
        />
      </Box>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    width: state.configReducer.dimensions.width,
  };
}

export default connect(mapStateToProps)(Logo);
