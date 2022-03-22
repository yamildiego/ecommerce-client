import React, { Component } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

class MyModal extends Component {
  render() {
    return (
      <Modal
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.modal}>
          <Box onClick={this.props.handleClose} sx={styles.close}>
            X
          </Box>
          <h2 style={styles.title}>{this.props.title}</h2>
          {this.props.children}
        </Box>
      </Modal>
    );
  }
}

const styles = {
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
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
  },
  title: {
    margin: 0,
  },
};

export default MyModal;
