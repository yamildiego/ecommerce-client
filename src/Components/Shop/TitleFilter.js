import React, { Component } from "react";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";

import Box from "@mui/material/Box";

class TitleFilter extends Component {
  state = { title: "" };

  componentDidMount() {
    this.getTitle();
  }

  componentDidUpdate(oldProps) {
    if (oldProps.filters !== this.props.filters) this.getTitle();
  }

  getTitle() {
    const { filters } = this.props;
    let title = "";

    if (this.props.currentFilter === "FILTER") {
      if (filters.gender.length === 1) title = this.toUpperCaseFirstLetter(filters.gender[0]);
      else if (filters.kids.length === 2 && ["BOYS", "GIRLS"].includes(filters.kids[0]) && ["BOYS", "GIRLS"].includes(filters.kids[1]))
        title = "Kids";
      else if (filters.kids.length === 1) title = this.toUpperCaseFirstLetter(filters.kids[0]);

      if (filters.category.length === 1)
        switch (filters.category[0]) {
          case "APPAREL":
            title = this.formatTitle(title, "Clothing");
            break;
          case "FOOTWEAR":
            title = this.formatTitle(title, "Shoes");
            break;
          case "EQUIPMENT":
            title = this.formatTitle(title, "Accessories & Equipment");
            break;
          default:
            break;
        }
    } else title = "Search Results";

    this.setState({ title });
  }

  toUpperCaseFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

  formatTitle = (title, toAdd) => {
    let formatedTitle = toAdd;
    if (title !== "")
      switch (title) {
        case "Unisex":
          formatedTitle = `${title} ${toAdd}`;
          break;
        case "Kids":
          formatedTitle = `${title}' ${toAdd}`;
          break;
        case "Boys":
          formatedTitle = `${title}' ${toAdd}`;
          break;
        case "Girls":
          formatedTitle = `${title}' ${toAdd}`;
          break;
        default:
          formatedTitle = `${title}'s ${toAdd}`;
          break;
      }
    return formatedTitle;
  };

  render() {
    const { size } = this.props;
    return (
      <Box sx={{ fontSize: "30px", pl: isMobile || size === "S" ? 0 : 4, textAlign: isMobile || size === "S" ? "center" : "left" }}>
        {this.state.title}
      </Box>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    filters: state.ecommerceReducer.filters,
    search: state.ecommerceReducer.search,
    currentFilter: state.ecommerceReducer.currentFilter,
    size: state.configReducer.dimensions.size,
  };
}
export default connect(mapStateToProps)(TitleFilter);
