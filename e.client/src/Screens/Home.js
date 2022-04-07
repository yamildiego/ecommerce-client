import React, { Component } from "react";
import { connect } from "react-redux";

import ScreenLayout from "./ScreenLayout";

import Backgrounds from "../Components/Home/Backgrounds";
import Categories from "../Components/Home/Categories";

import * as ecommerceActions from "../Actions/ecommerceActions";

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(ecommerceActions.setSearch(""));
  }

  render() {
    return (
      <ScreenLayout navigate={this.props.navigate} location={this.props.location}>
        <Backgrounds />
        <Categories />
      </ScreenLayout>
    );
  }
}

function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps)(Home);
