import React, { Component } from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import ScreenLayout from "./ScreenLayout";

import MyStepper from "../Components/Common/MyStepper/MyStepper";

import * as bagActions from "../Actions/bagActions";
import * as deliveryActions from "../Actions/deliveryActions";

class Payment extends Component {
  state = { timer: 5, showModal: true };

  componentDidMount() {
    this.props.dispatch(bagActions.setActiveStep(2));
  }

  runTimer = () => {
    if (this.state.timer > 0)
      setTimeout(() => {
        this.setState({ timer: this.state.timer - 1 });
        this.runTimer();
      }, 1000);
  };

  handleAccept = () => {
    this.setState({ showModal: false });
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
      <ScreenLayout limitWidth={true} navigate={this.props.navigate} location={this.props.location}>
        <Modal open={this.state.showModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={styles.modal}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: "green", mb: 2 }}>
              Test mode, do not enter real data.
            </Typography>
            <h3 style={{ margin: 0 }}>Testing data</h3>
            <Box sx={{ pr: 2, pt: 2, pb: 2 }}>
              <Box>
                <Box sx={{ fontWeight: "bold", display: "inline-block" }}>Card number:</Box> 4242 4242 4242 4242
              </Box>
              <Box>
                <Box sx={{ fontWeight: "bold", display: "inline-block" }}>Name:</Box> Any
              </Box>
              <Box>
                <Box sx={{ fontWeight: "bold", display: "inline-block" }}>CVC:</Box> Any 3 digits
              </Box>
              <Box>
                <Box sx={{ fontWeight: "bold", display: "inline-block" }}>DATE:</Box> Any future date{" "}
              </Box>
            </Box>
            <Button onClick={this.handleAccept} fullWidth variant={"contained"} sx={{ mt: 1 }}>
              Accept
            </Button>
          </Box>
        </Modal>
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

const styles = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "#b9e9b9",
    border: "2px solid #3f8e3f",
    boxShadow: 24,
    p: 4,
  },
};

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
