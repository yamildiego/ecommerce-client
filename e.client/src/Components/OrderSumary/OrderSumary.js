import React, { Component } from "react";
import { connect } from "react-redux";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import formatNumber from "../../Functions/formatNumber";

import * as Config from "../../Constants/Config";

import imagePayment from "../../Assets/Images/payment-methods.webp";

class OrderSumary extends Component {
  state = { code: "", helperText: "", loading: false, sent: false };

  handleOnchange = (e) => this.setState({ code: e.target.value, loading: false, sent: false });

  handleOnClick = () => {
    this.setState({ ...this.state, loading: true });
    setTimeout(
      () => this.setState({ code: "", helperText: `Coupon code "${this.state.code}" is unknown.`, loading: false, sent: true }),
      2000
    );
  };

  render() {
    const { total, qty, delivery } = this.props;
    return (
      <React.Fragment>
        <Stack direction={"column"} sx={styles.container}>
          <h2 style={styles.title}>Summary</h2>
          <Stack direction={"row"} sx={styles.line}>
            <Box>Subtotal</Box>
            <Box>${formatNumber(total)}</Box>
          </Stack>
          <Stack direction={"row"} sx={styles.line}>
            <Box>Delivery</Box>
            <Box>{`$${total >= Config.DELIVERY_FREE_FROM ? "FREE" : formatNumber(qty === 0 ? 0 : delivery)}`}</Box>
          </Stack>
          <Divider sx={{ mt: 2 }} />
          <Stack direction={"row"} sx={styles.lineTotal}>
            <Box>Total</Box>
            <Box>${formatNumber(total + (total >= Config.DELIVERY_FREE_FROM ? 0 : qty === 0 ? 0 : delivery))}</Box>
          </Stack>
        </Stack>
        <Box sx={{ pl: 1, pr: 1, mt: 1 }}>
          <TextField
            id="code"
            fullWidth
            label="Enter your prome code"
            variant="standard"
            color="success"
            disabled={this.state.loading}
            value={this.state.code}
            onChange={this.handleOnchange}
            error={this.state.sent}
            helperText={this.state.sent ? this.state.helperText : ""}
          />
          {this.state.code !== "" && (
            <Button disabled={this.state.loading} onClick={this.handleOnClick} sx={{ mt: 1 }} fullWidth variant="contained">
              {this.state.loading ? <CircularProgress size={25} /> : "Apply"}
            </Button>
          )}
        </Box>
        <h5>Accepted payment methods</h5>
        <img src={imagePayment} alt="Payment methods" />
      </React.Fragment>
    );
  }
}

const styles = {
  container: {
    border: "1px solid #0000001f",
    p: 4,
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

export default connect(mapStateToProps)(OrderSumary);
