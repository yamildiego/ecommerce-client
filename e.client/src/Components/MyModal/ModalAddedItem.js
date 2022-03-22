import React, { Component } from "react";
import { connect } from "react-redux";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import DetailProductModal from "./DetailProductModal";
import Resume from "../Resume/Resume";

class ModalAddedItem extends Component {
  render() {
    return (
      <Stack direction={"row"} sx={styles.container}>
        <DetailProductModal />
        <Resume />
      </Stack>
    );
  }
}

const styles = {
  container: {
    justifyContent: "space-between",
    mt: 3,
  },
};

function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps)(ModalAddedItem);
