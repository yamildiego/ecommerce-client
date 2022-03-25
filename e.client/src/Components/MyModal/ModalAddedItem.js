import React, { Component } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";

import Resume from "../Resume/Resume";
import DetailProductModal from "./DetailProductModal";

class ModalAddedItem extends Component {
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
          <h2 style={styles.title}>{"SUCCESSFULLY ADDED TO BAG!"}</h2>
          <Stack direction={"row"} sx={styles.container}>
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

export default ModalAddedItem;
