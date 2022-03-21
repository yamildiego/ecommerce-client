import React, { Component } from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

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
      <Stack
        direction={"column"}
        sx={size === "S" ? { ml: 2, mr: 2 } : { width: size === "L" ? "1000px" : "600px", ml: 2, mr: 2, margin: "auto" }}
      >
        <Stack direction={size === "L" ? "row" : "column"}>
          {productSelected && (
            <React.Fragment>
              <Box sx={{ flex: 1, pl: 5, pr: 2, justifyContent: "center", display: "flex", mt: 3 }}>
                <Stack direction="column">
                  <Box>
                    <Zoom
                      isLoading={isLoadingImages}
                      img={this.props.color && "src" in this.props.color ? this.props.color.src : null}
                      zoomScale={2}
                      height={400}
                      width={400}
                      transitionTime={0.5}
                    />
                  </Box>
                </Stack>
              </Box>
              <DetailsProduct {...productSelected} />
            </React.Fragment>
          )}
        </Stack>
        <Typography variant="h4" sx={{ color: "primary.main", mt: 4 }} gutterBottom component="div">
          YOU MAY ALSO LIKE
        </Typography>
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
