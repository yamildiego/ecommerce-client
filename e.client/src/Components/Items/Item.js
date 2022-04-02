import React, { Component } from "react";
import { connect } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { isMobile } from "react-device-detect";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import CrossOut from "./CrossOut";
import LinkBox from "../LinkBox";
import Discount from "./Discount";

class Item extends Component {
  state = { currentImage: this.props.product.images.squarishURL, currentImageIndex: 0, startX: null, endX: null };

  componentDidUpdate(oldProps) {
    if (oldProps.product !== this.props.product) this.setState({ currentImage: this.props.product.images.squarishURL });
  }

  handleOnMouseEnter = (currentImageIndex) => this.setState({ currentImageIndex });
  handleOnMouseOut = () => this.setState({ currentImageIndex: 0 });

  render() {
    const { product, size } = this.props;
    let width = size === "S" || isMobile ? 50 : size === "M" ? 33 : 25;
    return (
      <Box
        sx={{
          backgroundColor: "#f6f6f6",
          borderRight: "1px solid #d6d6d6",
          width: width + "%",
          borderBottom: "1px solid #d6d6d6",
          userSelect: "none",
          cursor: "pointer",
        }}
      >
        <Box style={{ position: "relative" }}>
          <LinkBox to={`/View/${this.props.product.cloudProductId}`}>
            <Discount {...this.props.product.price} />
            <Carousel
              style={{
                width: "100%",
              }}
              thumbWidth={38}
              infiniteLoop={true}
              renderArrowNext={() => {}}
              renderArrowPrev={() => {}}
              renderIndicator={() => {}}
              renderThumbs={() => {}}
              showStatus={false}
              selectedItem={this.state.currentImageIndex}
            >
              {product.colorways.map((color, i) => {
                return <img key={i} alt={product.title} src={color.images.squarishURL} />;
              })}
            </Carousel>
            <Box>
              <Box sx={{ textAlign: "left", color: "#222", pl: 1 }}>{product.title}</Box>
              <Box sx={{ textAlign: "left", color: "#8d8d8d", pl: 1, fontSize: "14px" }}>{product.subtitle}</Box>
              <CrossOut {...product} />
            </Box>
          </LinkBox>
          {product.colorways.length > 1 && (
            <Stack direction="row" spacing={1} sx={{ width: "100%", backgroundColor: "#f6f6f6" }}>
              {product.colorways.map((color, i) => {
                return (
                  <LinkBox
                    key={i}
                    onClick={() => this.handleOnMouseEnter(i)}
                    onMouseEnter={() => this.handleOnMouseEnter(i)}
                    onMouseOut={this.handleOnMouseOut}
                  >
                    <img src={color.images.squarishURL} alt={product.title} loading="lazy" style={{ width: "100%", maxWidth: "35px" }} />
                  </LinkBox>
                );
              })}
            </Stack>
          )}
        </Box>
      </Box>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    size: state.configReducer.dimensions.size,
  };
}

export default connect(mapStateToProps)(Item);
