import React, { Component } from "react";
import { connect } from "react-redux";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import ScreenLayout from "./ScreenLayout";

import MyStepper from "../Components/Common/MyStepper/MyStepper";
import Login from "../Components/Common/Login";

import DataDelivery from "../Components/Delivery/DataDelivery";

import * as bagActions from "../Actions/bagActions";

class Delivery extends Component {
  componentDidMount() {
    this.props.dispatch(bagActions.setActiveStep(1));
  }

  componentDidUpdate(oldProps) {
    if (this.props.items.length === 0) this.props.navigate("/bag");
  }

  render() {
    const { size } = this.props;
    return (
      <ScreenLayout limitWidth={true} navigate={this.props.navigate} location={this.props.location}>
        <Box sx={{ pl: 2, pr: 2, mb: 4 }}>
          <MyStepper />
          {this.props.items.length > 0 && (
            <Stack direction={size === "S" ? "column" : "row"} sx={{ justifyContent: "space-between" }}>
              <DataDelivery navigate={this.props.navigate} />
              <Login />
            </Stack>
          )}
        </Box>
      </ScreenLayout>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    size: state.configReducer.dimensions.size,
    items: state.bagReducer.items,
    activeStep: state.bagReducer.activeStep,
  };
}

export default connect(mapStateToProps)(Delivery);
