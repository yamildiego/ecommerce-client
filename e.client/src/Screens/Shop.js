import React, { Component } from "react";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import ScreenLayout from "./ScreenLayout";
import Filters from "../Components/Shop/Filters/Filters";
import Items from "../Components/Shop/Items/Items";
import OptionsBar from "../Components/Shop/OptionsBar";
import Loading from "../Components/Common/Loading";

import * as ecommerceActions from "../Actions/ecommerceActions";
import * as viewProductActions from "../Actions/viewProductActions";
import * as appActions from "../Actions/appActions";

class Shop extends Component {
  componentDidMount() {
    this.props.dispatch(viewProductActions.cleanProductSelected());
    let sort = this.props.sort != null ? this.props.sortsStructures[this.props.sort].value : {};
    this.setFilter(sort);
    setTimeout(() => {
      this.props.dispatch(ecommerceActions.loadProducts(this.props.filters, this.props.search, sort));
    }, 1000);
  }

  componentDidUpdate(oldProps) {
    let sort = this.props.sort != null ? this.props.sortsStructures[this.props.sort].value : {};

    if (this.props.filters !== oldProps.filters || this.props.sort !== oldProps.sort)
      this.props.dispatch(ecommerceActions.loadProducts(this.props.filters, this.props.search, sort));
  }

  setFilter = (sort) => {
    const initFilters = { category: [], gender: [], kids: [], onSale: [], price: [0, 610], page: 1 };
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
          this.props.dispatch(ecommerceActions.setSearch(this.props.params.filter));
          this.props.dispatch(ecommerceActions.loadProducts(this.props.filters, this.props.params.filter, sort));
          break;
      }
      this.props.dispatch(ecommerceActions.setFilters(initFilters));
    }
  };

  handleCloseFilter = (e) => {
    e.stopPropagation();
    if (this.props.filterOpen === true && (isMobile || this.props.size === "S")) this.props.dispatch(appActions.toggleFilter());
  };

  render() {
    const { size } = this.props;
    return (
      <ScreenLayout navigate={this.props.navigate} location={this.props.location}>
        <Stack direction="column">
          <OptionsBar />
          <Box sx={{ display: "flex" }}>
            <Filters />
            {this.props.filterOpen && (isMobile || this.props.size === "S") && (
              <Box onClick={this.handleCloseFilter} sx={{ position: "absolute", width: "100%", height: "150vh", zIndex: 500 }}></Box>
            )}
            <Box component="main" sx={{ flexGrow: 1, position: isMobile || size === "S" ? "absolute" : "relative" }}>
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
    search: state.ecommerceReducer.search,
    filterOpen: state.appReducer.filterOpen,
    size: state.configReducer.dimensions.size,
  };
}

export default connect(mapStateToProps)(Shop);
