import React, { Component } from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import withParamsAndNavigate from "../Functions/withParamsAndNavigate";

import ScreenLayout from "./ScreenLayout";
import Filters from "./../Components/Filters/Filters";
import Items from "./../Components/Items/Items";
import Loading from "./../Components/Loading";
import OptionsBar from "./../Components/OptionsBar";

import * as ecommerceActions from "../Actions/ecommerceActions";
import * as viewProductActions from "../Actions/viewProductActions";

class Shop extends Component {
  componentDidMount() {
    this.props.dispatch(viewProductActions.cleanProductSelected());
    this.setFilter();
    let sort = this.props.sort != null ? this.props.sortsStructures[this.props.sort].value : {};
    setTimeout(() => {
      this.props.dispatch(ecommerceActions.loadProducts(this.props.filters, sort));
    }, 1000);
  }

  componentDidUpdate(oldProps) {
    let sort = this.props.sort != null ? this.props.sortsStructures[this.props.sort].value : {};

    if (this.props.filters !== oldProps.filters || this.props.sort !== oldProps.sort)
      this.props.dispatch(ecommerceActions.loadProducts(this.props.filters, sort));
  }

  setFilter = () => {
    const initFilters = { category: [], gender: [], kids: [], price: [30, 450], page: 1 };
    if (this.props.params !== undefined && "filter" in this.props.params) {
      switch (this.props.params.filter) {
        case "MEN":
          initFilters.gender.push("MEN");
          break;
        case "WOMEN":
          initFilters.gender.push("WOMEN");
          break;
        case "KIDS":
          initFilters.kids.push("BOYS");
          initFilters.kids.push("GIRLS");
          break;
        default:
          break;
      }
      this.props.dispatch(ecommerceActions.setFilters(initFilters));
    }
  };

  render() {
    return (
      <ScreenLayout>
        <Stack direction="column">
          <OptionsBar />
          <Box sx={{ display: "flex" }}>
            <Filters />
            <Box component="main" sx={{ flexGrow: 1, position: "relative" }}>
              <Loading isLoading={this.props.isLoading} />
              <Items />
            </Box>
          </Box>
        </Stack>
      </ScreenLayout>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    isLoading: state.ecommerceReducer.isLoading,
    filters: state.ecommerceReducer.filters,
    sort: state.ecommerceReducer.sort,
    sortsStructures: state.ecommerceReducer.sortsStructures,
  };
}

export default withParamsAndNavigate(connect(mapStateToProps)(Shop));
