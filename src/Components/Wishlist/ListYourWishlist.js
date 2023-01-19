import React, { Component } from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import ItemWishlist from "./ItemWishlist";

class ListYourWishlist extends Component {
  render() {
    const { items, qty } = this.props;
    return (
      <Box>
        <Stack direction={"row"}>
          <h1 style={{ marginBottom: "8px", textAlign: "center", fontFamily: "monospace", width: "100%" }}>{`YOUR WISHLIST ${
            qty === 0 ? "IS EMPTY" : ""
          }`}</h1>
        </Stack>
        <Stack direction="column">{items.length > 0 && items.map((item, i) => <ItemWishlist key={i} item={item} />)}</Stack>
      </Box>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    items: state.wishlistReducer.items,
    qty: state.wishlistReducer.items.length,
  };
}

export default connect(mapStateToProps)(ListYourWishlist);
