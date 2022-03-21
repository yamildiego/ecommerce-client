import React, { Component } from "react";
import { connect } from "react-redux";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import Sizes from "./Sizes/Sizes";
import Colors from "./Colors/Colors";

class DetailsProduct extends Component {
  handleOnClick = () => {
    if (this.props.size !== null && this.props.size !== null) {
    }
  };

  render() {
    const { title, subtitle, price, skuData, colorways } = this.props.productSelected;

    return (
      <Box sx={{ flex: 1, mt: 3, userSelect: "none" }}>
        <Typography variant="h4" sx={{ color: "primary.main", mb: 0 }} gutterBottom component="div">
          {title}
        </Typography>
        <Typography variant="h8" sx={{ color: "#9a9a9a" }} gutterBottom component="div">
          {subtitle}
        </Typography>
        <Box sx={{ mt: 2, mb: 2 }}>${price.currentPrice}</Box>
        {colorways.length > 1 && (
          <React.Fragment>
            <h4 style={{ marginBottom: 0 }}>Select color</h4>
            <Colors colorways={colorways} />
          </React.Fragment>
        )}
        <h4 style={{ marginBottom: 0 }}>Available sizes</h4>
        <Sizes skuData={skuData} />
        <Stack direction={"row"} sx={{ mt: 1 }}>
          <Button onClick={() => this.handleOnClick()} sx={{ flex: 1 }} variant="contained">
            Add to bag
          </Button>
          <IconButton color="primary" aria-label="upload picture" component="span">
            <FavoriteBorderIcon />
          </IconButton>
        </Stack>
      </Box>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    productSelected: state.viewProductReducer.productSelected,
    size: state.viewProductReducer.size,
    color: state.viewProductReducer.color,
  };
}

export default connect(mapStateToProps)(DetailsProduct);
