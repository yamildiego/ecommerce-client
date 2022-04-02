import React, { Component } from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";

import BoxLogin from "../Components/Login";

import ScreenLayout from "./ScreenLayout";

class Login extends Component {
  state = { clearForm: false };

  componentDidMount() {
    this.setState({ clearForm: true });
  }

  render() {
    return (
      <ScreenLayout limitWidth={true}>
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
