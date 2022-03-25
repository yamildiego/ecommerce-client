import React, { Component } from "react";
import { connect } from "react-redux";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";

import * as bagActions from "../../Actions/bagActions";

class DetailProductModal extends Component {
  handleOnChange = (e, item) => {
    if (!Number.isNaN(parseInt(e.target.value)) && parseInt(e.target.value) > 0)
      this.props.dispatch(bagActions.changeQty({ ...item, qty: e.target.value }));
  };

  handleOnClick = (item) => {
    this.props.close();
    this.props.dispatch(bagActions.removeItem(item));
  };

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
            <h5 style={styles.subtitle}>{item.subtitle}</h5>
            <Box sx={styles.text}>Color: {item.color.label}</Box>
            <Box sx={styles.text}>Size : {item.size.size}</Box>
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
        <Divider sx={{ mt: 1, mb: 1 }} />
        <Box sx={styles.btnRemove} onClick={() => this.handleOnClick(item)}>
          Remove item
        </Box>
      </Box>
    );
  }
}

const styles = {
  title: {
    userSelect: "none",
    cursor: "default",
    marginTop: 0,
    lineHeight: "15px",
  },
  subtitle: {
    userSelect: "none",
    cursor: "default",
    marginTop: 0,
    lineHeight: "15px",
  },
  text: {
    userSelect: "none",
    cursor: "default",
    fontSize: "14px",
    lineHeight: "35px",
  },
  textQty: {
    userSelect: "none",
    cursor: "default",
    fontSize: "14px",
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
  btnRemove: {
    textAlign: "center",
    color: "red",
    cursor: "pointer",
    fontSize: "10px",
  },
};

function mapStateToProps(state, props) {
  console.log(state.bagReducer);
  return {
    item: state.bagReducer.items.sort((a, b) => (a.dateTime > b.dateTime ? -1 : 1))[0],
  };
}

export default connect(mapStateToProps)(DetailProductModal);
