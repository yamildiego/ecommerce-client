import React, { Component } from "react";
import { connect } from "react-redux";

import Stack from "@mui/material/Stack";

import RowSizes from "./RowSizes";

import "./Sizes.css";

class Sizes extends Component {
  render() {
    const { skuData } = this.props;
    return (
      <React.Fragment>
        {skuData &&
          skuData.length > 0 &&
          [...Array(skuData.length / 4, 0)].map((row, i) => (
            <React.Fragment key={i}>
              <Stack direction="column" sx={{ mt: 1 }}>
                <RowSizes key={i} row={i} skuData={skuData} />
              </Stack>
            </React.Fragment>
          ))}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps)(Sizes);
