import React, { Component } from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import LinkBox from "../Common/LinkBox";

import * as ecommerceActions from "../../Actions/ecommerceActions";

class CircleShop extends Component {
  shop = () => this.props.dispatch(ecommerceActions.resetFilter());

  handleOnClick = (category) => this.props.dispatch(ecommerceActions.resetFilter({ gender: [category] }, "FILTER"));

  render() {
    return (
      <Box
        sx={{
          textAlign: "center",
          padding: "20px",
          position: "absolute",
          borderRadius: 4,
          backgroundColor: "#ffffff9c",
          width: 250,
          height: 250,
          ...this.props.style,
        }}
      >
        <h1 style={{ mt: 2, fontSize: "16px" }}>MID SEASON SALE UP TO 70% OFF OUTLET</h1>
        <p style={{ fontSize: "10px" }}>Prices as marked. Limited time only.</p>
        <LinkBox onClick={() => this.handleOnClick("WOMEN")} to={"/Shop"} variant="contained">
          <Button fullWidth variant="contained">
            Shop Women
          </Button>
        </LinkBox>
        <LinkBox onClick={() => this.handleOnClick("MEN")} to={"/Shop"} sx={{ mt: 1 }} variant="contained">
          <Button fullWidth variant="contained">
            Shop Men
          </Button>
        </LinkBox>
      </Box>
    );
  }
}

function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps)(CircleShop);
