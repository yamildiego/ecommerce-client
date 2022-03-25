import React, { Component } from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import * as bagActions from "../../Actions/bagActions";

class ItemBag extends Component {
  handleOnChange = (e, item) => {
    if (!Number.isNaN(parseInt(e.target.value)) && parseInt(e.target.value) > 0) {
      let items = [];

      this.props.items.forEach((item) => {
        if (item.id === this.props.item.id && item.size.size === this.props.item.size.size && item.color.id === this.props.item.color.id) {
          items.push({ ...item, qty: parseInt(e.target.value) });
        } else items.push(item);
      });

      this.props.dispatch(bagActions.setItems(items));
    }
  };

  handleOnClick = (item) => {
    let items = [];

    this.props.items.forEach((item) => {
      if (!(item.id === this.props.item.id && item.size.size === this.props.item.size.size && item.color.id === this.props.item.color.id))
        items.push(item);
    });
    this.props.dispatch(bagActions.setItems(items));
  };

  render() {
    const { item } = this.props;
    return (
      <Box sx={styles.container}>
        <Stack direction={"row"}>
          <Box sx={{ maxWidth: "200px" }}>
            <img src={item.color.src} alt="" style={{ width: "100%", height: "100%" }} />
          </Box>
          <Box sx={{ p: 2, flex: 1, position: "relative" }}>
            <div style={styles.close} onClick={this.handleOnClick}>
              X
            </div>
            <h2 style={styles.title}>{item.title}</h2>
            <h4 style={styles.subtitle}>{item.subtitle}</h4>
            <Box sx={styles.line}>Size: {item.size.size}</Box>
            <Box sx={styles.line}>Color: {item.color.label}</Box>
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
  container: {
    border: "1px solid #0000001f",
    mb: 1,
    borderRadius: "1px",
  },
  title: { margin: 0 },
  subtitle: {
    margin: 0,
    fontWeight: "normal",
  },
  line: {
    lineHeight: "38px",
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
  close: {
    cursor: "pointer",
    position: "absolute",
    right: 10,
    top: 4,
    fontWeight: "bold",
  },
};

function mapStateToProps(state, props) {
  return {
    items: state.bagReducer.items,
  };
}

export default connect(mapStateToProps)(ItemBag);
