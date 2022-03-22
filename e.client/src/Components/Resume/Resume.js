import React, { Component } from "react";
import { connect } from "react-redux";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import formatNumber from "../../Functions/formatNumber";

const deliveryFreeFrom = 150;

class Resume extends Component {
  render() {
    const { total, qty, delivery } = this.props;
    return (
      <Stack direction={"column"} sx={styles.container}>
        <h1 style={styles.title}>Your bag</h1>
        <Box>{`${qty} item${qty === 1 ? "" : "s"}`}</Box>
        <Stack direction={"row"} sx={styles.line}>
          <Box>Total product cost</Box>
          <Box>${formatNumber(total)}</Box>
        </Stack>
        <Stack direction={"row"} sx={styles.line}>
          <Box>Delivery cost</Box>
          <Box>{`$${total > deliveryFreeFrom ? "FREE" : formatNumber(delivery)}`}</Box>
        </Stack>
        <Divider />
        <Stack direction={"row"} sx={styles.lineTotal}>
          <Box>Total</Box>
          <Box>${formatNumber(total + (total > deliveryFreeFrom ? 0 : delivery))}</Box>
        </Stack>
        <Button onClick={() => this.handleOnClick()} sx={{ flex: 1, mt: 2 }} variant="contained">
          View bag
        </Button>
        <Button onClick={() => this.handleOnClick()} sx={{ flex: 1, mt: 2 }} variant="outlined">
          Check out
        </Button>
      </Stack>
    );
  }
}

const styles = {
  container: {
    borderLeft: "1px solid #111",
    pl: 2,
    flex: 1,
  },
  title: {
    marginTop: 0,
    lineHeight: "28px",
  },
  line: {
    justifyContent: "space-between",
  },
  lineTotal: {
    mt: 2,
    fontWeight: "bold",
    justifyContent: "space-between",
  },
};

function mapStateToProps(state, props) {
  return {
    total: state.bagReducer.total,
    qty: state.bagReducer.qty,
    delivery: state.bagReducer.delivery,
  };
}

export default connect(mapStateToProps)(Resume);
