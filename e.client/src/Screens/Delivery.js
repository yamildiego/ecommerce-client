import React, { Component } from "react";
import { connect } from "react-redux";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import ScreenLayout from "./ScreenLayout";
import MyStepper from "../Components/MyStepper/MyStepper";
import Login from "../Components/Login";
import DataDelivery from "../Components/DataDelivery/DataDelivery";

import * as bagActions from "../Actions/bagActions";

class Delivery extends Component {
  componentDidMount() {
    //chequear si hay algo en la bag si si esta bien aca sino 0
    this.props.dispatch(bagActions.setActiveStep(1));
  }

  render() {
    const { size } = this.props;
    return (
      <ScreenLayout limitWidth={true}>
        <Box sx={{ pl: 2, pr: 2, mb: 4 }}>
          <MyStepper />
          <Stack direction={size === "S" ? "column" : "row"} sx={{ justifyContent: "space-between" }}>
            <DataDelivery navigate={this.props.navigate} />
            <Login />
          </Stack>
        </Box>
      </ScreenLayout>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    size: state.configReducer.dimensions.size,
    items: state.bagReducer.items,
  };
}

export default connect(mapStateToProps)(Delivery);
