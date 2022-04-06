import React, { Component } from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";

import ScreenLayout from "./ScreenLayout";
import View from "../Components/View/View";
import Recommendations from "../Components/View/Recommendations";

import Loading from "../Components/Common/Loading";

import * as viewProductActions from "../Actions/viewProductActions";

class ViewItem extends Component {
  componentDidMount() {
    this.props.dispatch(
      viewProductActions.getProduct(this.props.params.cloudProductId, this.props.filters, this.props.search, this.props.sort)
    );
  }

  componentDidUpdate(oldProps) {
    if (this.props.params.cloudProductId !== oldProps.params.cloudProductId) {
      this.props.dispatch(
        viewProductActions.getProduct(this.props.params.cloudProductId, this.props.filters, this.props.search, this.props.sort)
      );
    }
  }

  render() {
    return (
      <ScreenLayout limitWidth={true} navigate={this.props.navigate} location={this.props.location}>
        <Box sx={{ position: "relative" }}>
          <Loading isLoading={this.props.isLoading} />
          <View />
          <Recommendations />
        </Box>
      </ScreenLayout>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    search: state.ecommerceReducer.search,
    sort: state.ecommerceReducer.sort != null ? state.ecommerceReducer.sortsStructures[state.ecommerceReducer.sort].value : {},
    filters: state.ecommerceReducer.filters,
    isLoading: state.viewProductReducer.isLoading,
  };
}

export default connect(mapStateToProps)(ViewItem);
