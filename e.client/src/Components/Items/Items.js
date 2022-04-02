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
    const { products, isLoading, limitPerRow } = this.props;
    return (
      <Box sx={{ borderLeft: "1px solid #d6d6d6", borderTop: "1px solid #d6d6d6", mb: 1 }}>
        {!isLoading && products.length === 0 && <NoElements search={this.props.search} />}
        {products.length > 0 && (
          <Stack direction="row" spacing={0} sx={{ justifyContent: "center" }}>
            <Pagination />
          </Stack>
        )}
        {[...Array(trucateNumber(products.length / limitPerRow, 0))].map((row, i) => (
          <React.Fragment key={i}>
            <RowItems key={i} row={i} products={products} />
          </React.Fragment>
        ))}
        {products.length % limitPerRow > 0 && <RowItems row={trucateNumber(products.length / limitPerRow, 0)} products={products} />}
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
  let size = state.configReducer.dimensions.size;
  let limitPerRow = size === "S" ? 2 : size === "L" ? 3 : 4;
  return {
    search: state.ecommerceReducer.search,
    isLoading: state.ecommerceReducer.isLoading,
    filters: state.ecommerceReducer.filters,
    products: state.ecommerceReducer.products,
    limitPerRow,
  };
}

export default connect(mapStateToProps)(Items);
