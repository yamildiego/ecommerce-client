import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

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
        <Link to={this.props.link} style={{ textDecoration: "none" }}>
          <Box sx={{ textAlign: "center", height: "30px", color: "#f55e3f" }}>
            {this.props.id === 3 && this.props.qty !== 0 && (
              <Badge badgeContent={this.props.qty} color="primary">
                {this.props.icon}
              </Badge>
            )}
            {(this.props.id !== 3 || this.props.qty === 0) && this.props.icon}
          </Box>
          {this.props.width > 1024 && <Box sx={{ textAlign: "center", fontSize: "12px", color: "#222" }}>{this.props.title}</Box>}
        </Link>
      </Box>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    width: state.configReducer.dimensions.width,
    qty: state.bagReducer.qty,
  };
}

export default connect(mapStateToProps)(Option);
