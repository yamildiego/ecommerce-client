import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = [
  { label: "1. Bag", to: "/bag" },
  { label: "2. Delivery", to: "/delivery" },
  { label: "3. Payment", to: "/payment" },
  { label: "4. Order complete", to: "/finished" },
];

class MyStepper extends Component {
  render() {
    return (
      <Box sx={{ width: "100%", backgroundColor: "#e0e0e0", p: 2, borderRadius: 2 }}>
        <Stepper activeStep={this.props.activeStep}>
          {steps.map((step, index) => {
            return (
              <Step key={index}>
                <StepLabel sx={{ cursor: "default", userSelect: "none" }}>
                  {this.props.activeStep > index && (
                    <Link style={styles.link} to={step.to}>
                      {step.label}
                    </Link>
                  )}
                  {this.props.activeStep <= index && step.label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
    );
  }
}

const styles = {
  link: {
    textDecoration: "none",
    color: "#00000099",
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: "0.875rem",
    lineHeight: "1.43",
    letterSpacing: "0.01071em",
    display: "block",
  },
};

function mapStateToProps(state, props) {
  return {
    activeStep: state.bagReducer.activeStep,
  };
}

export default connect(mapStateToProps)(MyStepper);
