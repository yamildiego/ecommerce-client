import React, { Component } from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import Zoom from "./Zoom";

import * as ecommerceActions from "../../Actions/ecommerceActions";

class View extends Component {
  state = { currentImage: "" };

  componentDidUpdate(oldProps) {
    console.log("casda");
    if (oldProps.itemSelected !== this.props.itemSelected) {
      let currentImage = this.props.itemSelected.colorways[0].images.portraitURL.replace("w_400", "w_800");
      console.log("casda");
      this.props.dispatch(ecommerceActions.loadImages(this.props.itemSelected.colorways[0].images));
      // this.setState({ currentImage });
    }
  }

  handleOnMouseEnter = (image) => this.setState({ currentImage: image.replace("w_400", "w_800") });

  render() {
    const { itemSelected } = this.props;
    return (
      <Stack direction="row" sx={{ mt: 4 }}>
        <Box sx={{ flex: 0.8, pl: 5, pr: 2, justifyContent: "end", display: "flex" }}>
          <Stack direction="column">
            <Box>
              {/* <Zoom img={this.state.currentImage} zoomScale={2} height={400} width={400} transitionTime={0.5} /> */}
              {/* <Zoom img={this.state.currentImage} zoomScale={3} width={600} height={600} /> */}
              {/* <img src={this.state.currentImage} alt={itemSelected.title} style={{ width: "100%", maxWidth: "400px" }} /> */}
            </Box>
            {itemSelected.colorways.length > 1 && (
              <Stack direction="row" spacing={1} sx={{ width: "100%", backgroundColor: "#f6f6f6" }}>
                {itemSelected.colorways.map((color, i) => {
                  return (
                    <Box key={i} onMouseEnter={() => this.handleOnMouseEnter(color.images.squarishURL)} onMouseOut={this.handleOnMouseOut}>
                      <img src={color.images.squarishURL} alt={"Config.NAME"} loading="lazy" style={{ width: "100%", maxWidth: "35px" }} />
                    </Box>
                  );
                })}
              </Stack>
            )}
          </Stack>
        </Box>
        <Box sx={{ flex: 1 }}>
          {this.state.currentImage}
          <h1 style={{ textAlign: "left" }}>{itemSelected.title}</h1>
          <Box>$s{itemSelected.price.currentPrice}</Box>
          {/* {JSON.stringify(itemSelected.colorways)} */}
        </Box>
        {/* <div>{JSON.stringify(this.props.itemSelected.title)}</div> */}
        {/* <div>{JSON.stringify(this.props.itemSelected.colorways)}</div> */}
      </Stack>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    width: state.configReducer.dimensions.width,
    length: state.ecommerceReducer.length,
  };
}

export default connect(mapStateToProps)(View);
