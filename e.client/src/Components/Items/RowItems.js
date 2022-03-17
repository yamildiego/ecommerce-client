import React, { Component } from "react";
import { connect } from "react-redux";

import Stack from "@mui/material/Stack";

import Item from "./Item";

class RowItems extends Component {
  render() {
    const { products, row } = this.props;
    return (
      <Stack direction="row" spacing={0} sx={{ width: "100%", backgroundColor: "#f6f6f6" }}>
        {products[row + 0 + row * 3] !== undefined && <Item product={products[row + 0 + row * 3]} />}
        {products[row + 1 + row * 3] !== undefined && <Item product={products[row + 1 + row * 3]} />}
        {products[row + 2 + row * 3] !== undefined && <Item product={products[row + 2 + row * 3]} />}
        {products[row + 3 + row * 3] !== undefined && <Item product={products[row + 3 + row * 3]} />}
      </Stack>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    products: state.ecommerceReducer.products,
  };
}

export default connect(mapStateToProps)(RowItems);
