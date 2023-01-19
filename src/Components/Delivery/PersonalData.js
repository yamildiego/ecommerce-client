import React from "react";
import { connect } from "react-redux";

import TextField from "@mui/material/TextField";

const PersonalData = (props) => {
  const setEmail = (email) => props.handleSetPersonal({ phone: props.personal.phone, email });
  const setPhone = (phone) => props.handleSetPersonal({ email: props.personal.email, phone });
  const { personal, errors, helperText, isLoading } = props;
  return (
    <React.Fragment>
      <TextField
        required={true}
        sx={{ mt: 2 }}
        fullWidth
        label="Email"
        type="text"
        id="email"
        value={personal.email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        helperText={errors.email ? helperText.email : ""}
        disabled={isLoading}
      />

      <TextField
        required={true}
        sx={{ mt: 2 }}
        fullWidth
        label="Phone"
        type="text"
        id="phone"
        value={personal.phone}
        onChange={(e) => setPhone(e.target.value)}
        error={errors.phone}
        helperText={errors.phone ? helperText.phone : ""}
        disabled={isLoading}
      />
    </React.Fragment>
  );
};

function mapStateToProps(state, props) {
  return {
    personal: state.deliveryReducer.personal,
    errors: state.deliveryReducer.errors,
    helperText: state.deliveryReducer.helperText,
    isLoading: state.configReducer.isLoading,
  };
}

export default connect(mapStateToProps)(PersonalData);
