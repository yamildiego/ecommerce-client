import React, { Component } from "react";
import { connect } from "react-redux";

import TextField from "@mui/material/TextField";

const PersonalData = (props) => {
  const setEmail = (email) => props.handleSetPersonal({ phone: props.phone, email });
  const setPhone = (phone) => props.handleSetPersonal({ email: props.email, phone });

  return (
    <React.Fragment>
      <TextField
        required={true}
        sx={{ mt: 2 }}
        fullWidth
        label="Email"
        type="text"
        id="email"
        value={props.email}
        onChange={(e) => setEmail(e.target.value)}
        error={props.errors.email}
        helperText={props.errors.email ? props.helperText.email : ""}
      />

      <TextField
        required={true}
        sx={{ mt: 2 }}
        fullWidth
        label="Phone"
        type="text"
        id="phone"
        value={props.phone}
        onChange={(e) => setPhone(e.target.value)}
        error={props.errors.phone}
        helperText={props.errors.phone ? props.helperText.phone : ""}
      />
    </React.Fragment>
  );
};

function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps)(PersonalData);
