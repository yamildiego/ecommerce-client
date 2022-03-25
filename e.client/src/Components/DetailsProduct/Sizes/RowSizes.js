import React, { Component } from "react";
import { connect } from "react-redux";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import * as viewProductActions from "../../../Actions/viewProductActions";

class RowSizes extends Component {
  handleOnClick = (size) => (size !== undefined ? this.props.dispatch(viewProductActions.setSize(size)) : "");

  render() {
    const { skuData, row, size } = this.props;
    return (
      <div>
        <Stack direction="row" spacing={0} sx={{ width: "100%" }}>
          {<Size size={size} itemSize={skuData[row + 0 + row * 3]} onClick={() => this.handleOnClick(skuData[row + 0 + row * 3])} />}
          {<Size size={size} itemSize={skuData[row + 1 + row * 3]} onClick={() => this.handleOnClick(skuData[row + 1 + row * 3])} />}
          {<Size size={size} itemSize={skuData[row + 2 + row * 3]} onClick={() => this.handleOnClick(skuData[row + 2 + row * 3])} />}
          {<Size size={size} itemSize={skuData[row + 3 + row * 3]} onClick={() => this.handleOnClick(skuData[row + 3 + row * 3])} />}
        </Stack>
      </div>
    );
  }
}

const Size = (props) => {
  return (
    <React.Fragment>
      {props.itemSize === undefined && <Box className="EmptySize" onClick={props.onClick} sx={{ flex: 1 }}></Box>}
      {props.itemSize !== undefined && (
        <Box
          sx={{ borderColor: props.size && props.itemSize.size === props.size.size ? "primary.main" : "#d6d6d6" }}
          className="Size"
          onClick={props.onClick}
        >
          {props.itemSize.size}
        </Box>
      )}
    </React.Fragment>
  );
};

function mapStateToProps(state, props) {
  return {
    size: state.viewProductReducer.size,
  };
}

export default connect(mapStateToProps)(RowSizes);
