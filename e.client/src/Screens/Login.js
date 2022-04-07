import React, { Component } from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";

import BoxLogin from "../Components/Common/Login";

import ScreenLayout from "./ScreenLayout";

import * as ecommerceActions from "../Actions/ecommerceActions";

class Login extends Component {
  state = { clearForm: false };

  componentDidMount() {
    this.setState({ clearForm: true });
    this.props.dispatch(ecommerceActions.setSearch(""));
  }

  render() {
    return (
      <ScreenLayout limitWidth={true} navigate={this.props.navigate} location={this.props.location}>
        <Box sx={{ pt: 4, margin: "auto" }}>
          <BoxLogin clear={this.state.clearForm} />
        </Box>
      </ScreenLayout>
    );
  }
}

function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps)(Login);
