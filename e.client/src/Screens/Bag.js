import React, { Component } from "react";
import { connect } from "react-redux";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import ScreenLayout from "./ScreenLayout";
import OrderSumary from "../Components/OrderSumary/OrderSumary";
import MyStepper from "../Components/MyStepper/MyStepper";
import ListYourBag from "../Components/ListYourBag/ListYourBag";

import * as bagActions from "../Actions/bagActions";

class Bag extends Component {
  componentDidMount() {
    this.props.dispatch(bagActions.setActiveStep(0));
  }

  render() {
    return (
      <ScreenLayout>
        <Box sx={{ pl: 2, pr: 2 }}>
          <MyStepper />

          <h1 style={{ textTransform: "uppercase" }}>Your bag</h1>
          <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
            <Box sx={{ backgroundColor: "white", flex: 1 }}>
              <ListYourBag />
            </Box>
            <Box sx={{ width: "350px" }}>
              <OrderSumary />
            </Box>
          </Stack>
        </Box>
      </ScreenLayout>
    );
  }
}

function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps)(Bag);
