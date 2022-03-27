import React, { Component } from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import ItemBag from "./ItemBag";

class ListYourBag extends Component {
  render() {
    const { items, qty } = this.props;
    return (
      <Box>
        <Stack direction={"row"}>
          <h1 style={{ marginBottom: 0, fontFamily: "monospace" }}>{`YOUR BAG ${qty === 0 ? "IS EMPTY" : ""}`}</h1>
          {qty > 0 && <Box sx={{ fontSize: "14px", mt: 4.5, ml: 1 }}>{`TOTAL ${qty} item${qty === 1 ? "" : "s"}`}</Box>}
        </Stack>
        {items.length > 0 &&
          items.map((item, index) => {
            return <ItemBag key={index} item={item} />;
          })}
      </Box>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    items: state.bagReducer.items,
    qty: state.bagReducer.qty,
  };
}

export default connect(mapStateToProps)(ListYourBag);
