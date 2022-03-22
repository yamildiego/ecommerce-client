import React, { Component } from "react";
import { connect } from "react-redux";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Modal from "@mui/material/Modal";

import Sizes from "./Sizes/Sizes";
import Colors from "./Colors/Colors";
import MyModal from "../MyModal/MyModal";
import ModalAddedItem from "../MyModal/ModalAddedItem";

import * as bagActions from "../../Actions/bagActions";
import * as viewProductActions from "../../Actions/viewProductActions";

import "./DetailsProduct.css";

class DetailsProduct extends Component {
  state = { shake: false, open: false };

  handleOnClick = () => {
    if (this.props.size !== null && this.props.color !== null) {
      this.props.dispatch(viewProductActions.showErrors(false));
      let item = {
        id: this.props.cloudProductId,
        title: this.props.title,
        subtitle: this.props.subtitle,
        color: this.props.color,
        size: this.props.size,
        qty: 1,
        price: this.props.price.currentPrice,
        colors: this.props.colors,
        dateTime: Date.now(),
      };

      this.props.dispatch(bagActions.addItem(item));
      this.setState({ open: true });
    } else {
      this.props.dispatch(viewProductActions.showErrors(true));
      this.setState({ shake: true });
      setTimeout(() => {
        this.setState({ shake: false });
      }, 1000);
    }
  };

  render() {
    const { title, subtitle, price, skuData, colorways } = this.props.productSelected;

    return (
      <Box sx={{ flex: 1, mt: 3, userSelect: "none" }}>
        <Box sx={{ boxShadow: "0 0 2px transparent", pl: 1, pr: 1 }}>
          <Typography variant="h4" sx={{ color: "primary.main", mb: 0 }} gutterBottom component="div">
            {title}
          </Typography>
          <Typography variant="h8" sx={{ color: "#9a9a9a" }} gutterBottom component="div">
            {subtitle}
          </Typography>
          <Box sx={{ mt: 2, mb: 2 }}>${price.currentPrice}</Box>
        </Box>
        {colorways.length > 1 && (
          <Box sx={{ boxShadow: "0 0 2px transparent", pl: 1, pr: 1 }}>
            <h4 style={{ marginBottom: 0 }}>Select color</h4>
            <Colors colorways={colorways} />
          </Box>
        )}
        <Box
          className={this.state.shake ? "shake" : null}
          sx={{ boxShadow: "0 0 2px " + (this.props.showErrors ? "red" : "transparent"), pl: 1, pr: 1 }}
        >
          <h4 style={{ marginBottom: 0, color: this.props.showErrors ? "red" : "#000000de" }}>Available sizes</h4>
          <Sizes skuData={skuData} />
        </Box>
        <Stack direction={"row"} sx={{ mt: 1 }}>
          <Button onClick={() => this.handleOnClick()} sx={{ flex: 1 }} variant="contained">
            Add to bag
          </Button>
          <IconButton color="primary" aria-label="upload picture" component="span">
            <FavoriteBorderIcon />
          </IconButton>
        </Stack>
        <MyModal title="SUCCESSFULLY ADDED TO BAG!" open={this.state.open} handleClose={() => this.setState({ open: false })}>
          <ModalAddedItem />
        </MyModal>
      </Box>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    productSelected: state.viewProductReducer.productSelected,
    size: state.viewProductReducer.size,
    color: state.viewProductReducer.color,
    showErrors: state.viewProductReducer.showErrors,
    colors: state.viewProductReducer.colors,
  };
}

export default connect(mapStateToProps)(DetailsProduct);