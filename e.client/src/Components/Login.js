import React, { Component } from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import validateEmail from "../Functions/validateEmail";

const initialState = {
  showPassword: false,
  view: "Login",
  loading: false,
  form: {
    username: { value: "", error: false, helperText: "" },
    password: { value: "", error: false, helperText: "" },
    email: { value: "", error: false, helperText: "" },
  },
};

class PersonalData extends Component {
  state = initialState;

  componentDidUpdate(oldProps) {
    if (oldProps.clear !== this.props.clear && this.props.clear) this.cleanStates();
  }

  handleOnChange = (e, key) => {
    let form = { ...this.state.form };
    form[key].value = e.target.value;
    form[key].error = false;
    form[key].helperText = "";
    this.setState({ form });
  };

  cleanStates = () => {
    this.setState({
      showPassword: false,
      view: "Login",
      loading: false,
      form: {
        username: { value: "", error: false, helperText: "" },
        password: { value: "", error: false, helperText: "" },
        email: { value: "", error: false, helperText: "" },
      },
    });
  };

  login = () => {
    let form = { ...this.state.form };
    form.username.error = false;
    form.username.helperText = "";
    form.password.error = false;
    form.password.helperText = "";

    if (!this.state.form.username.value) {
      form.username.error = true;
      form.username.helperText = "Please enter a username";
    }

    if (!this.state.form.password.value) {
      form.password.error = true;
      form.password.helperText = "Please enter a password";
    }

    if (form.username.error || form.password.error) {
      console.log(form);
      this.setState({ form });
    } else {
      this.setState({ loading: true });
      setTimeout(() => {
        form.password.value = "";
        form.password.error = true;
        form.password.helperText = "Incorrect username/password - please check and retry";
        this.setState({ loading: false, form });
      }, 1500);
    }
  };

  resetPassword = () => {
    let form = { ...this.state.form };
    form.email.error = false;
    form.email.helperText = "";

    if (!validateEmail(this.state.form.email.value)) {
      form.email.error = true;
      form.email.helperText = "The email address is invalid.";
    }

    if (!this.state.form.email.value) {
      form.email.error = true;
      form.email.helperText = "Please enter a email";
    }

    if (form.email.error) this.setState({ form });
    else {
      this.setState({ loading: true });
      setTimeout(() => {
        let newState = { ...initialState, view: "success" };
        this.setState({ ...newState });
      }, 1500);
    }
  };

  handleMouseDownPassword = (event) => event.preventDefault();

  render() {
    return (
      <Box sx={{ width: "350px", ml: 1, mt: 1, mb: 1 }}>
        <Box sx={{ border: "1px solid #ddd", p: 2, position: "relative" }}>
          {this.state.loading && (
            <Box sx={styles.loadingContainer}>
              <Box sx={styles.loading}>
                <CircularProgress />
              </Box>
            </Box>
          )}
          {this.state.view === "Login" && (
            <React.Fragment>
              <h1 style={{ margin: 0, fontFamily: "monospace", userSelect: "none" }}>{`LOG IN`}</h1>
              <TextField
                required={true}
                sx={{ mt: 2, userSelect: "none" }}
                fullWidth
                label={"Username"}
                type={"text"}
                id={"username"}
                disabled={this.state.loading}
                value={this.state.form.username.value}
                onChange={(e) => this.handleOnChange(e, "username")}
                error={this.state.form.username.error}
                helperText={this.state.form.username.error ? this.state.form.username.helperText : ""}
              />

              <FormControl sx={{ mt: 2, userSelect: "none" }} fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" error={this.state.form.password.error}>
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={this.state.showPassword ? "text" : "password"}
                  value={this.state.form.password.value}
                  onChange={(e) => this.handleOnChange(e, "password")}
                  error={this.state.form.password.error}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => this.setState({ showPassword: !this.state.showPassword })}
                        onMouseDown={this.handleMouseDownPassword}
                        edge="end"
                      >
                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                {this.state.form.password.error && (
                  <FormHelperText id="component-error-text" error>
                    {this.state.form.password.helperText}
                  </FormHelperText>
                )}
              </FormControl>

              <Link
                onClick={() => this.setState({ view: "ForgottenPassword" })}
                sx={{ cursor: "pointer", fontSize: "13px", userSelect: "none" }}
              >
                Forgotten Your Password?
              </Link>
              <Button onClick={() => this.login()} disabled={this.state.loading} sx={{ mt: 2 }} fullWidth variant={"contained"}>
                Log in
              </Button>
            </React.Fragment>
          )}
          {this.state.view === "ForgottenPassword" && (
            <React.Fragment>
              <h1 style={{ margin: 0, fontFamily: "monospace" }}>{`FORGOTTEN YOUR PASSWORD?`}</h1>
              <TextField
                required={true}
                sx={{ mt: 2, userSelect: "none" }}
                fullWidth
                label="Email"
                type="text"
                id="email"
                disabled={this.state.loading}
                value={this.state.form.email.value}
                onChange={(e) => this.handleOnChange(e, "email")}
                error={this.state.form.email.error}
                helperText={this.state.form.email.error ? this.state.form.email.helperText : ""}
              />
              <Button onClick={() => this.resetPassword()} disabled={this.state.loading} sx={{ mt: 2 }} fullWidth variant={"contained"}>
                Reset password
              </Button>
              <Button
                disabled={this.state.loading}
                onClick={() => this.setState({ ...initialState })}
                sx={{ mt: 2 }}
                fullWidth
                variant={"outlined"}
              >
                Back to login
              </Button>
            </React.Fragment>
          )}
          {this.state.view === "success" && (
            <React.Fragment>
              <h1 style={{ margin: 0, fontFamily: "monospace" }}>{`FORGOTTEN YOUR PASSWORD?`}</h1>
              <h4>RESET PASSWORD LINK SENT</h4>
              <Box sx={{ fontSize: "12px" }}>Please check your email for a link to reset your password.</Box>
              <Button disabled={this.state.loading} onClick={() => this.cleanStates()} sx={{ mt: 2 }} fullWidth variant={"outlined"}>
                Back to login
              </Button>
            </React.Fragment>
          )}
        </Box>
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
  return {};
}

export default connect(mapStateToProps)(PersonalData);
