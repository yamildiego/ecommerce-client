import React, { Component } from "react";
import { connect } from "react-redux";

import ScreenLayout from "./ScreenLayout";
import View from "../Components/View/View";

import withParamsAndNavigate from "../Functions/withParamsAndNavigate";

import * as viewProductActions from "../Actions/viewProductActions";

class ViewItem extends Component {
  componentDidMount() {
    this.props.dispatch(viewProductActions.getProduct(this.props.params.cloudProductId));
  }

  render() {
    return (
      <ScreenLayout limitWidth={true}>
        <View />
      </ScreenLayout>
    );
  }
}

function mapStateToProps(state, props) {
  return {};
}

export default withParamsAndNavigate(connect(mapStateToProps)(ViewItem));
