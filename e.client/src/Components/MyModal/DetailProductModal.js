import React, { Component } from "react";
import { connect } from "react-redux";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import * as bagActions from "../../Actions/bagActions";

class DetailProductModal extends Component {
  handleOnChange = (e, item) => this.props.dispatch(bagActions.changeQty({ ...item, qty: e.target.value }));

  render() {
    const { item } = this.props;
    return (
      <Box sx={{ flex: 1 }}>
        <h3 style={styles.title}>{item.title}</h3>
        <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
          <div style={{ maxWidth: "130px" }}>
            <img src={item.color.src} alt={""} loading="lazy" style={{ width: "100%" }} />
          </div>
          <Box sx={{ flex: 1, pl: 1 }}>
            <h6 style={styles.subtitle}>{item.subtitle}</h6>
            <Box sx={styles.text}>Color: {item.color.label}</Box>
            <Box sx={styles.text}>Size : {item.size.size}</Box>
            {/* <Box sx={styles.text}>Quantity : {item.qty}</Box> */}
            <Stack direction={"row"}>
              <Box sx={styles.textQty}>Quantity :</Box>
              <TextField
                onChange={(e) => this.handleOnChange(e, item)}
                sx={styles.qty}
                value={item.qty}
                type="number"
                inputProps={{ min: "1" }}
              />
            </Stack>
          </Box>
        </Stack>
      </Box>
    );
  }
}

const styles = {
  title: {
    marginTop: 0,
    lineHeight: "15px",
  },
  subtitle: {
    marginTop: 0,
    lineHeight: "15px",
  },
  text: {
    fontSize: "14px",
    lineHeight: "35px",
  },
  textQty: {
    display: "flex",
    alignItems: "center",
  },
  qty: {
    width: "65px",
    border: 0,
    padding: 0,
    margin: 0,
    ml: 2,
  },
};

function mapStateToProps(state, props) {
  return {
    item: state.bagReducer.items.sort((a, b) => (a.dateTime > b.dateTime ? -1 : 1))[0],
  };
}

export default connect(mapStateToProps)(DetailProductModal);
