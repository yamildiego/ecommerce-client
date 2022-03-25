import React, { Component } from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = ["1. Bag", "2. Delivery", "3. Payment", "4. Order complete"];

class MyStepper extends Component {
  render() {
    return (
      <Box sx={{ width: "100%", backgroundColor: "#e0e0e0", p: 2, borderRadius: 2 }}>
        <Stepper activeStep={this.props.activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    activeStep: state.bagReducer.activeStep,
  };
}

export default connect(mapStateToProps)(MyStepper);
