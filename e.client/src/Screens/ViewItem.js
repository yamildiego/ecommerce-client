import React, { Component } from "react";
import { connect } from "react-redux";

import ScreenLayout from "./ScreenLayout";
import View from "../Components/View/View";

import withParamsAndNavigate from "../Functions/withParamsAndNavigate";

import * as ecommerceActions from "../Actions/ecommerceActions";

class ViewItem extends Component {
  componentDidMount() {
    this.props.dispatch(ecommerceActions.getProduct(this.props.params.cloudProductId));
  }

  render() {
    const { itemSelected } = this.props;
    return <ScreenLayout>{this.props.itemSelected != null && <View itemSelected={itemSelected} />}</ScreenLayout>;
  }
}

function mapStateToProps(state, props) {
  return {
    itemSelected: state.ecommerceReducer.itemSelected,
  };
}

export default withParamsAndNavigate(connect(mapStateToProps)(ViewItem));
