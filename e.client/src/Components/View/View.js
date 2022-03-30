import React, { Component } from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import Zoom from "./Zoom";
import DetailsProduct from "../DetailsProduct/DetailsProduct";

import * as viewProductActions from "../../Actions/viewProductActions";

class View extends Component {
  componentDidMount() {
    if (this.props.productSelected !== null) this.props.dispatch(viewProductActions.loadColors(this.props.productSelected.colorways));
  }

  componentDidUpdate(oldProps) {
    if (oldProps.productSelected !== this.props.productSelected)
      this.props.dispatch(viewProductActions.loadColors(this.props.productSelected.colorways));

    if (oldProps.colors !== this.props.colors && this.props.colors.length > 0 && this.props.color == null) {
      let index = 0;
      let colorDefault = null;

      while (index < this.props.colors.length && colorDefault === null) {
        let item = this.props.colors[index];
        if (item.src !== null) colorDefault = item;
        index++;
      }

      if (colorDefault !== null) this.props.dispatch(viewProductActions.setColor(colorDefault));
    }
  }

  render() {
    const { productSelected, isLoadingImages, size } = this.props;
    return (
      <Stack direction={size === "L" ? "row" : "column"} sx={{ mb: 2}}>
        {productSelected && (
          <React.Fragment>
            <Box sx={{ flex: 1, pl: 2, pr: 2, justifyContent: "center", display: "flex", mt: 3 }}>
              <Stack direction="column">
                <Box>
                  <Zoom
                    isLoading={isLoadingImages}
                    img={this.props.color && "src" in this.props.color ? this.props.color.src : null}
                    zoomScale={2}
                    height={350}
                    width={350}
                    transitionTime={0.5}
                  />
                </Box>
              </Stack>
            </Box>
            <DetailsProduct {...productSelected} />
          </React.Fragment>
        )}
      </Stack>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    productSelected: state.viewProductReducer.productSelected,
    colors: state.viewProductReducer.colors,
    isLoading: state.viewProductReducer.isLoading,
    isLoadingImages: state.viewProductReducer.isLoadingImages,
    color: state.viewProductReducer.color,
    size: state.configReducer.dimensions.size,
  };
}

export default connect(mapStateToProps)(View);
