import React, { Component } from "react";
import { connect } from "react-redux";

import IconButton from "@mui/material/IconButton";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import * as configActions from "../../Actions/configActions";
import * as wishlistActions from "../../Actions/wishlistActions";

class Heart extends Component {
  isAdded = (cloudProductId) => this.props.wishlist.filter((x) => x.cloudProductId === cloudProductId).length > 0;

  handleAddWishlist = (item) => {
    let itemToAdded = {
      cloudProductId: item.cloudProductId,
      title: item.title,
      subtitle: item.subtitle,
      skuData: item.skuData,
      currentPrice: item.currentPrice,
      priceId: item.priceId,
      colorways: item.colorways,
    };

    if (this.isAdded(item.cloudProductId)) {
      this.props.dispatch(configActions.addError({ severity: "info", title: "Item removed ", description: null }));
      this.props.dispatch(wishlistActions.removeItem(item.cloudProductId));
    } else {
      this.props.dispatch(configActions.addError({ severity: "success", title: "Item added", description: null }));
      this.props.dispatch(wishlistActions.addItem(itemToAdded));
    }
  };

  render() {
    const { item } = this.props;
    return (
      <IconButton onClick={() => this.handleAddWishlist(item)} color="primary" aria-label="upload picture" component="span">
        {this.isAdded(item.cloudProductId) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    wishlist: state.wishlistReducer.items,
  };
}

export default connect(mapStateToProps)(Heart);
