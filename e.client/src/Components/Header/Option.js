import React, { Component } from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";

class Option extends Component {
  render() {
    return (
      <Box
        sx={{
          flexDirection: "column",
          width: `${this.props.width <= 1024 ? 50 : 90}px`,
          cursor: "pointer",
          pt: this.props.width <= 1024 ? 2 : 0,
        }}
      >
        <Box sx={{ textAlign: "center", height: "30px" }}>
          {this.props.id === 3 && this.props.length !== 0 && (
            <Badge badgeContent={this.props.length} color="primary">
              {this.props.icon}
            </Badge>
          )}
          {(this.props.id !== 3 || this.props.length === 0) && this.props.icon}
        </Box>
        {this.props.width > 1024 && <Box sx={{ textAlign: "center", fontSize: "12px" }}>{this.props.title}</Box>}
      </Box>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    width: state.configReducer.dimensions.width,
    length: state.ecommerceReducer.length,
  };
}

export default connect(mapStateToProps)(Option);
