import React, { Component } from "react";
import { connect } from "react-redux";

import ScreenLayout from "./ScreenLayout";

import Backgrounds from "../Components/Home/Backgrounds";
import Categories from "../Components/Home/Categories";

import Test from "./Test";

class Home extends Component {
  render() {
    return (
      <ScreenLayout>
        ACAs
        <Test />
        {/* <Backgrounds /> */}
        {/* <Categories /> */}
      </ScreenLayout>
    );
  }
}

function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps)(Home);
