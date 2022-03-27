import React, { Component } from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";

import ScreenLayout from "./ScreenLayout";

import MyStepper from "../Components/MyStepper/MyStepper";

import * as bagActions from "../Actions/bagActions";

class Payment extends Component {
  componentDidMount() {
    //chequear si hay algo en la bag  and if they have a address si si esta bien aca sino 0
    this.props.dispatch(bagActions.setActiveStep(2));
  }

  render() {
    return (
      <ScreenLayout limitWidth={true}>
        <Box sx={{ pl: 2, pr: 2, mb: 4 }}>
          <MyStepper />
          <Box>Here payment methods</Box>
        </Box>
      </ScreenLayout>
    );
  }
}

function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps)(Payment);
