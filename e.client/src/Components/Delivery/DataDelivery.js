import React, { Component } from "react";
import { connect } from "react-redux";
import localforage from "localforage";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import AddressData from "./AddressData";
import PersonalData from "./PersonalData";

import * as deliveryActions from "../../Actions/deliveryActions";

import validateEmail from "../../Functions/validateEmail";

class DataDelivery extends Component {
  handleOnClick = () => {
    const { address, personal } = this.props;
    const errors = { email: false, phone: false, address: false };
    const helperText = { email: "", phone: "", address: "" };

    if (!address.address) {
      errors.address = true;
      helperText.address = "Please enter a address";
    }

    if (!personal.email) {
      errors.email = true;
      helperText.email = "Please enter a email";
    } else {
      if (!validateEmail(personal.email)) {
        errors.email = true;
        helperText.email = "The email address is invalid.";
      }
    }

    if (!personal.phone) {
      errors.phone = true;
      helperText.phone = "Please enter a phone";
    }

    this.props.dispatch(deliveryActions.setErrors(errors));
    this.props.dispatch(deliveryActions.setHelperText(helperText));

    if (errors.address === false && errors.email === false && errors.phone === false) {
      this.props.navigate("/payment");
    }
  };

  handleSetAddress = (address) => {
    this.props.dispatch(deliveryActions.setAddress(address));
    localforage.setItem("address", address);
  };

  handleSetPersonal = (personal) => {
    this.props.dispatch(deliveryActions.setPersonal(personal));
    localforage.setItem("personal", personal);
  };

  render() {
    return (
      <Box sx={{ backgroundColor: "white", flex: 1, mt: 1, mb: 1, p: 2, border: "1px solid #ddd", position: "relative" }}>
        {this.props.isLoading && (
          <Box sx={styles.loadingContainer}>
            <Box sx={styles.loading}>
              <CircularProgress />
            </Box>
          </Box>
        )}
        <h1 style={{ margin: 0, fontFamily: "monospace", userSelect: "none" }}>{`DELIVERY ADDRESS`}</h1>
        <AddressData
          {...this.props.address}
          handleSetAddress={this.handleSetAddress}
          error={this.props.errors.address}
          helperText={this.props.helperText.address}
          isLoading={this.props.isLoading}
        />
        <h1 style={{ marginBottom: 0, fontFamily: "monospace", userSelect: "none" }}>{`GUEST CHECKOUT`}</h1>
        <Box sx={{ fontSize: "12px" }}>We'll use these details to keep you informed on your delivery.</Box>
        <PersonalData handleSetPersonal={this.handleSetPersonal} />
        <Button disabled={this.props.isLoading} onClick={this.handleOnClick} fullWidth sx={{ flex: 1, mt: 2 }} variant="contained">
          Review and Pay
        </Button>
      </Box>
    );
  }
}

const styles = {
  loadingContainer: {
    m: -2,
    width: "100%",
    height: "100%",
    backgroundColor: "#dddddddd",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

function mapStateToProps(state, props) {
  return {
    items: state.bagReducer.items,
    address: state.deliveryReducer.address,
    personal: state.deliveryReducer.personal,
    errors: state.deliveryReducer.errors,
    helperText: state.deliveryReducer.helperText,
    urlPayment: state.deliveryReducer.urlPayment,
  };
}

export default connect(mapStateToProps)(DataDelivery);
