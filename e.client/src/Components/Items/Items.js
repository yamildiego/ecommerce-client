import React, { Component } from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import Pagination from "../../Components/Pagination";
import trucateNumber from "../../Functions/trucateNumber";

import RowItems from "./RowItems";
import NoElements from "./NoElements";

class Items extends Component {
  render() {
    const { products, isLoading } = this.props;
    return (
      <Box sx={{ borderLeft: "1px solid #d6d6d6", borderTop: "1px solid #d6d6d6", mb: 1 }}>
        {!isLoading && products.length === 0 && <NoElements />}
        {[...Array(trucateNumber(products.length / 4, 0))].map((row, i) => (
          <React.Fragment key={i}>
            <RowItems key={i} row={i} products={products} />
          </React.Fragment>
        ))}
        {products.length % 4 > 0 && <RowItems row={trucateNumber(products.length / 4, 0)} products={products} />}
        {products.length > 0 && (
          <Stack direction="row" spacing={0} sx={{ justifyContent: "center" }}>
            <Pagination />
          </Stack>
        )}
      </Box>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    isLoading: state.ecommerceReducer.isLoading,
    filters: state.ecommerceReducer.filters,
    products: state.ecommerceReducer.products,
  };
}

export default connect(mapStateToProps)(Items);
