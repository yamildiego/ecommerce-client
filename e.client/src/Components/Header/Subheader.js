import React, { Component } from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";

import LinkOption from "./LinkOption";

import * as ecommerceActions from "../../Actions/ecommerceActions";

const subFilter = [
  { key: 1, label: "Newest" },
  { key: 2, label: "On Sale" },
  { key: 3, label: "Best seller" },
];

const biggestCategories = [
  { key: "MEN", title: "Men" },
  { key: "WOMEN", title: "Women" },
  { key: "KIDS", title: "Kids" },
];

class Subheader extends Component {
  state = { open: false };

  handleOnClickCategory = (key) => {
    let filter = { category: [key] };
    if (this.state.open === "MEN" || this.state.open === "WOMEN") filter.gender = [this.state.open];
    if (this.state.open === "KIDS") filter.kids = ["BOYS", "GIRLS"];

    this.props.dispatch(ecommerceActions.resetFilter(filter));
    this.setState({ open: false });
  };

  handleOnClick = (key) => {
    let filter = {};

    if (this.state.open === "MEN" || this.state.open === "WOMEN") filter.gender = [this.state.open];
    if (this.state.open === "KIDS") filter.kids = ["BOYS", "GIRLS"];

    switch (key) {
      case 1: {
        this.props.dispatch(ecommerceActions.setSort(0));
        break;
      }
      case 2: {
        filter.onSale = ["ON_SALE"];
        break;
      }

      default:
        break;
    }

    this.props.dispatch(ecommerceActions.resetFilter(filter));
    this.setState({ open: false });
  };

  render() {
    return (
      <React.Fragment>
        <Box sx={{ borderTop: "1px solid #ddd", zIndex: 12, position: "relative" }}>
          <Box sx={{ maxWidth: "480px", margin: "auto", lineHeight: "40px" }}>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
              {biggestCategories.map((category, index) => {
                return (
                  <Box
                    key={index}
                    sx={{ borderBottom: this.state.open === category.key ? "2px solid #222" : "2px solid #fff", cursor: "default" }}
                    onMouseEnter={() => this.setState({ open: category.key })}
                  >
                    {category.title}
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
        <Collapse in={this.state.open !== false} onMouseLeave={() => this.setState({ open: false })}>
          <Box sx={{ height: "130px", backgroundColor: "white", zIndex: 15, position: "absolute", marginLeft: "20%", width: "60%" }}>
            <Stack direction="row" sx={{ justifyContent: "space-around", position: "relative" }}>
              <ul style={{ listStyle: "none" }}>
                {subFilter.map((option) => {
                  return <LinkOption label={option.label} key={option.key} onClick={() => this.handleOnClick(option.key)} />;
                })}
              </ul>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {this.props.categoryFilters.map((option) => {
                  return <LinkOption label={option.label} key={option.key} onClick={() => this.handleOnClickCategory(option.key)} />;
                })}
              </ul>
            </Stack>
          </Box>
        </Collapse>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    categoryFilters: state.ecommerceReducer.filtersStructures.category.options,
  };
}

export default connect(mapStateToProps)(Subheader);
