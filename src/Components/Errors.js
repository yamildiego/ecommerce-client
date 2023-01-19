import * as React from "react";
import { connect } from "react-redux";
import { TransitionGroup } from "react-transition-group";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";

import * as configActions from "../Actions/configActions";

const Errors = (props) => {
  const close = (key) => props.dispatch(configActions.removeError(key));

  return (
    <Box sx={styles.container}>
      <List>
        <TransitionGroup>
          {props.errors.map((error, index) => (
            <Collapse key={index}>
              <Alert sx={{ ...styles.error, width: props.size === "S" ? "368px" : "450px" }} severity={error.severity}>
                <AlertTitle>{error.title}</AlertTitle>
                {error.description}
                <Box onClick={() => close(error.key)} sx={styles.close}>
                  X
                </Box>
              </Alert>
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
    </Box>
  );
};

const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    margin: "auto",
    height: "100vh",
    zIndex: 220,
    mt: 1,
  },
  error: {
    position: "relative",
    mt: "10px",
  },
  close: {
    position: "absolute",
    right: "6px",
    top: "4px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

function mapStateToProps(state, props) {
  return {
    size: state.configReducer.dimensions.size,
  };
}

export default connect(mapStateToProps)(Errors);
