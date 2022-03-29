import React, { Component } from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress";

import ScreenLayout from "./ScreenLayout";

import MyStepper from "../Components/MyStepper/MyStepper";

import * as bagActions from "../Actions/bagActions";
import * as deliveryActions from "../Actions/deliveryActions";

class Payment extends Component {
  state = { timer: 5 };

  componentDidMount() {
    this.props.dispatch(bagActions.setActiveStep(2));
    if (this.props.items.length > 0 && this.props.personal.email && this.props.address.address) {
      let line_items = [];
      let total = 0;

      this.props.items.forEach((item) => {
        line_items.push({ price: item.priceId, quantity: item.qty });
        total += item.price * item.qty;
      });

      this.props.dispatch(deliveryActions.reviewAndPay(this.props.personal, this.props.address, line_items, total));
      this.runTimer();
    }
  }

  runTimer = () => {
    if (this.state.timer > 0)
      setTimeout(() => {
        this.setState({ timer: this.state.timer - 1 });
        this.runTimer();
      }, 1000);
  };

  componentDidUpdate(oldProps) {
    if (oldProps.urlPayment !== this.props.urlPayment && this.props.urlPayment !== null) {
      const newWindow = window.open(this.props.urlPayment, "_blank", "noopener,noreferrer");
      if (newWindow) newWindow.opener = null;
    }
    if (oldProps.errors !== this.props.errors && this.props.errors.length > 0) this.props.navigate("/delivery");

    if ((this.props.items.length === 0) | !this.props.personal.email | this.props.address.address) this.props.navigate("/delivery");
  }

  render() {
    return (
      <ScreenLayout limitWidth={true}>
        <Box sx={{ pl: 2, pr: 2, mb: 4 }}>
          <MyStepper />
          {(this.state.timer > 0 || this.props.urlPayment === null) && (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <CircularProgress size={80} />
              <Box sx={{ mt: 4 }}>Please wait while we redirect you.</Box>
            </Box>
          )}
          {this.state.timer <= 0 && this.props.urlPayment !== null && (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Box sx={{ mt: 4 }}>
                If you're not redirected soon please{" "}
                <Link href={this.props.urlPayment} target="_blank">
                  use this link.
                </Link>
              </Box>
            </Box>
          )}
        </Box>
      </ScreenLayout>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    items: state.bagReducer.items,
    personal: state.deliveryReducer.personal,
    address: state.deliveryReducer.address,
    urlPayment: state.deliveryReducer.urlPayment,
    errors: state.configReducer.errors,
    activeStep: state.bagReducer.activeStep,
  };
}

export default connect(mapStateToProps)(Payment);
