import React, { Component } from "react";
import { connect } from "react-redux";

import ScreenLayout from "./ScreenLayout";
import View from "../Components/View/View";

import * as viewProductActions from "../Actions/viewProductActions";

class ViewItem extends Component {
  componentDidMount() {
    this.props.dispatch(viewProductActions.getProduct(this.props.params.cloudProductId));
  }

  render() {
    return (
      <ScreenLayout limitWidth={true} navigate={this.props.navigate} location={this.props.location}>
        <View />
      </ScreenLayout>
    );
  }
}

function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps)(ViewItem);
