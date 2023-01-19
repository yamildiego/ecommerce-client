import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import formatNumber from "../../../../Functions/formatNumber";

import * as Config from "../../../../Constants/Config";

class Resume extends Component {
  handleShopping = () => this.props.close();

  render() {
    const { total, qty, delivery, size } = this.props;
    return (
      <Stack direction={"column"} sx={{ ...styles.container, borderLeft: size === "S" ? 0 : "1px solid #0000001f" }}>
        <h2 style={styles.title}>YOUR BAG</h2>
        <Box>{`${qty} item${qty === 1 ? "" : "s"}`}</Box>
        <Stack direction={"row"} sx={styles.line}>
          <Box>Total product cost</Box>
          <Box>${formatNumber(total)}</Box>
        </Stack>
        <Stack direction={"row"} sx={styles.line}>
          <Box>Delivery cost</Box>
          <Box>{`$${total >= Config.DELIVERY_FREE_FROM ? "FREE" : formatNumber(qty === 0 ? 0 : delivery)}`}</Box>
        </Stack>
        <Divider />
        <Stack direction={"row"} sx={styles.lineTotal}>
          <Box>Total</Box>
          <Box>${formatNumber(total + (total >= Config.DELIVERY_FREE_FROM ? 0 : qty === 0 ? 0 : delivery))}</Box>
        </Stack>
        <Box>
          <Link to="/bag" style={{ textDecoration: "none" }}>
            <Button fullWidth sx={{ flex: 1, mt: 2 }} variant="contained">
              Check out
            </Button>
          </Link>
          <Button fullWidth onClick={() => this.handleShopping()} sx={{ flex: 1, mt: 2 }} variant="outlined">
            Continue shopping
          </Button>
        </Box>
      </Stack>
    );
  }
}

const styles = {
  container: {
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
    size: state.configReducer.dimensions.size,
  };
}

export default connect(mapStateToProps)(Resume);
