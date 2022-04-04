import React, { Component } from "react";
import { connect } from "react-redux";

import localforage from "localforage";

import Box from "@mui/material/Box";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

import ScreenLayout from "./ScreenLayout";
import MyStepper from "../Components/MyStepper/MyStepper";

import * as bagActions from "../Actions/bagActions";
import * as deliveryActions from "../Actions/deliveryActions";

class Success extends Component {
  state = { orderNumber: null };

  componentDidMount() {
    this.props.dispatch(bagActions.setActiveStep(3));
    localforage.getItem("orderNumber", (err, orderNumber) => (orderNumber ? this.setState({ orderNumber }) : ""));
    setTimeout(() => {
      this.props.dispatch(bagActions.setItems([]));
      this.props.dispatch(deliveryActions.initDelivery());
    }, 500);
  }

  render() {
    return (
      <ScreenLayout limitWidth={true} navigate={this.props.navigate} location={this.props.location}>
        <Box sx={{ pl: 2, pr: 2 }}>
          <MyStepper allDisabled={true} />
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <CheckCircleOutlineOutlinedIcon sx={{ fontSize: "80px", color: "green" }} />
            <h1 style={{ color: "green" }}>Thank you for your purchase</h1>
            <Box sx={{ fontSize: "18px" }}>
              Please allow up to 2 business days(exclusive weekends ,holidays and sale days) to process and ship your order.
            </Box>
            <Box sx={{ fontSize: "18px" }}>You will receive an email with your order details.</Box>
            {this.state.orderNumber && (
              <Box sx={{ fontSize: "18px", mt: 2 }}>
                Order Number:{" "}
                <Box sx={{ display: "inline-block", fontWeight: "bold", textTransform: "uppercase" }}>
                  {this.state.orderNumber.slice(0, 12)}
                </Box>
                .
              </Box>
            )}
          </Box>
        </Box>
      </ScreenLayout>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    items: state.bagReducer.items,
  };
}

export default connect(mapStateToProps)(Success);
