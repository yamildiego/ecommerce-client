import React, { Component } from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Zoom from "./Zoom";

import * as viewProductActions from "../../Actions/viewProductActions";

class View extends Component {
  state = { currentImage: "" };

  componentDidMount() {
    if (this.props.productSelected !== null) this.props.dispatch(viewProductActions.loadImages(this.props.productSelected.colorways));
  }

  componentDidUpdate(oldProps) {
    if (oldProps.productSelected !== this.props.productSelected)
      this.props.dispatch(viewProductActions.loadImages(this.props.productSelected.colorways));

    if (oldProps.picturesProductSelected !== this.props.picturesProductSelected && this.props.picturesProductSelected.length > 0)
      this.setState({ currentImage: this.props.picturesProductSelected[0] });
  }

  handleOnMouseEnter = (currentImage) => this.setState({ currentImage });

  render() {
    const { productSelected, picturesProductSelected, isLoadingImages } = this.props;
    return (
      <Stack direction="row" sx={{ mt: 4 }}>
        {productSelected && (
          <React.Fragment>
            <Box sx={{ flex: 0.8, pl: 5, pr: 2, justifyContent: "end", display: "flex" }}>
              <Stack direction="column">
                <Box>
                  <Zoom
                    isLoading={isLoadingImages}
                    img={this.state.currentImage}
                    zoomScale={2}
                    height={400}
                    width={400}
                    transitionTime={0.5}
                  />
                </Box>
                {picturesProductSelected.length > 1 && (
                  <Stack direction="row" spacing={1} sx={{ width: "100%", backgroundColor: "#f6f6f6" }}>
                    {picturesProductSelected.map((image, i) => {
                      return (
                        <Box key={i} onMouseEnter={() => this.handleOnMouseEnter(image)} onMouseOut={this.handleOnMouseOut}>
                          <img src={image} alt={""} style={{ width: "100%", maxWidth: "35px" }} />
                        </Box>
                      );
                    })}
                  </Stack>
                )}
              </Stack>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ color: "primary.main", mb: 0 }} gutterBottom component="div">
                {productSelected.title}
              </Typography>
              <Typography variant="h8" sx={{ color: "#9a9a9a" }} gutterBottom component="div">
                {productSelected.subtitle}
              </Typography>
              <Box>${productSelected.price.currentPrice}</Box>

              <Stack direction="row">
                {productSelected.skuData.map((sku) => {
                  return <Box sx={{ flex: 1 }}>{sku.size}</Box>;
                })}
              </Stack>
              {/* <Box>{JSON.stringify(productSelected.skuData)}</Box> */}
            </Box>
          </React.Fragment>
        )}
      </Stack>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    productSelected: state.viewProductReducer.productSelected,
    picturesProductSelected: state.viewProductReducer.picturesProductSelected,
    isLoading: state.viewProductReducer.isLoading,
    isLoadingImages: state.viewProductReducer.isLoadingImages,
  };
}

export default connect(mapStateToProps)(View);
