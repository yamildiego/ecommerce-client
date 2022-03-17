import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import * as ecommerceActions from "../Actions/ecommerceActions";

class CircleShop extends Component {
  shop = () => this.props.dispatch(ecommerceActions.resetFilter());

  render() {
    return (
      <Box
        sx={{
          textAlign: "center",
          padding: "52px 20px",
          position: "absolute",
          borderRadius: 150,
          backgroundColor: "white",
          width: 250,
          height: 250,
          ...this.props.style,
        }}
      >
        <h1 style={{ mt: 2, fontSize: "16px" }}>MID SEASON SALE UP TO 70% OFF OUTLET</h1>
        <p style={{ fontSize: "10px" }}>Prices as marked. Limited time only.</p>
        <Link variant="contained" to="/Shop" style={{ textDecoration: "none" }}>
          <Button onClick={this.shop} variant="contained">
            Shop
          </Button>
        </Link>
      </Box>
    );
  }
}

function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps)(CircleShop);
