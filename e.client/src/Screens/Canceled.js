import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";

import ScreenLayout from "./ScreenLayout";

import MyStepper from "../Components/MyStepper/MyStepper";

import * as bagActions from "../Actions/bagActions";

class Payment extends Component {
  componentDidMount() {
    this.props.dispatch(bagActions.setActiveStep(2));
  }

  render() {
    return (
      <ScreenLayout limitWidth={true} navigate={this.props.navigate} location={this.props.location}>
        <Box sx={{ pl: 2, pr: 2, mb: 4 }}>
          <MyStepper />
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Box sx={{ mt: 4 }}>
              Sorry we weren't able to complete your payment at this time. please try again{` `}
              <Link to={"/payment"}>here.</Link>
            </Box>
          </Box>
        </Box>
      </ScreenLayout>
    );
  }
}

function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps)(Payment);
