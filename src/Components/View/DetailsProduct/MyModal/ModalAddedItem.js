import React, { Component } from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";

import Resume from "./Resume";
import DetailProductModal from "./DetailProductModal";

class ModalAddedItem extends Component {
  render() {
    const { size } = this.props;
    return (
      <Modal open={this.props.open} onClose={this.props.handleClose}>
        <Box sx={{ ...styles.modal, width: size === "S" ? 350 : 700 }}>
          <Box onClick={this.props.handleClose} sx={styles.close}>
            X
          </Box>
          <h2 style={styles.title}>{"SUCCESSFULLY ADDED TO BAG!"}</h2>
          <Stack direction={size === "S" ? "column" : "row"} sx={styles.container}>
            <DetailProductModal close={this.props.handleClose} />
            <Resume close={this.props.handleClose} />
          </Stack>
        </Box>
      </Modal>
    );
  }
}

const styles = {
  container: {
    justifyContent: "space-between",
    mt: 3,
  },
  close: {
    cursor: "pointer",
    position: "absolute",
    top: 5,
    right: 10,
    fontSize: "20px",
    fontWeight: "bold",
  },
  modal: {
    position: "absolute",
    top: "2%",
    left: "50%",
    transform: "translateX(-50%)",

    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
  },
  title: {
    margin: 0,
    fontSize: "1.2rem",
  },
};

function mapStateToProps(state, props) {
  return {
    size: state.configReducer.dimensions.size,
  };
}
export default connect(mapStateToProps)(ModalAddedItem);
