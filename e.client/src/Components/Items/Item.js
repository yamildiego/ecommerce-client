import React, { Component } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import CrossOut from "./CrossOut";
import LinkDiv from "../LinkDiv";
import Discount from "./Discount";

class Item extends Component {
  state = { currentImage: this.props.product.images.squarishURL };

  componentDidUpdate(oldProps) {
    if (oldProps.product !== this.props.product) this.setState({ currentImage: this.props.product.images.squarishURL });
  }

  handleOnMouseEnter = (image) => this.setState({ currentImage: image });
  handleOnMouseOut = () => this.setState({ currentImage: this.props.product.images.squarishURL });

  render() {
    const { product } = this.props;
    return (
      <LinkDiv to={"/View/" + this.props.product.cloudProductId}>
        <Box style={{ position: "relative" }}>
          <Discount {...this.props.product.price} />
          <img src={this.state.currentImage} alt={product.title} loading="lazy" style={{ width: "100%" }} />
          <Stack direction="column" spacing={0} sx={{ width: "100%", backgroundColor: "#f6f6f6" }}>
            <Box>
              <Box sx={{ textAlign: "left", color: "#222", pl: 1 }}>{product.title}</Box>
              <Box sx={{ textAlign: "left", color: "#8d8d8d", pl: 1, fontSize: "14px" }}>{product.subtitle}</Box>
              <CrossOut price={product.price} />
            </Box>
            {product.colorways.length > 1 && (
              <Stack direction="row" spacing={1} sx={{ width: "100%", backgroundColor: "#f6f6f6" }}>
                {product.colorways.map((color, i) => {
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
      </LinkDiv>
    );
  }
}

export default Item;
