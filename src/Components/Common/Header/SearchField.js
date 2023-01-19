import React, { Component } from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import CloseIcon from "@mui/icons-material/Close";

import * as ecommerceActions from "../../../Actions/ecommerceActions";
import * as configActions from "../../../Actions/configActions";

class SearchField extends Component {
  closeSearch = () => {
    this.props.dispatch(configActions.toggleSearch(false));
    this.props.dispatch(ecommerceActions.setSearch(""));
    this.search("");
  };

  handleSearch = (e) => {
    this.props.dispatch(ecommerceActions.setSearch(e.target.value));
    this.search(e.target.value);
  };

  search = (search) => {
    let paths = this.props.location.pathname.split("/");

    if (paths.length >= 2 && paths[1].toUpperCase() === "SHOP") {
      let sort = this.props.sort != null ? this.props.sortsStructures[this.props.sort].value : {};
      this.props.dispatch(ecommerceActions.loadProducts({ ...this.props.filters, page: 1 }, search, sort));
    }
  };

  handleOnKeyDown = (event) => {
    if (event.keyCode === 13) {
      let paths = this.props.location.pathname.split("/");
      if (paths.length < 2 || (paths.length >= 2 && paths[1].toUpperCase() !== "SHOP")) {
        // let sort = this.props.sort != null ? this.props.sortsStructures[this.props.sort].value : {};
        // this.props.dispatch(ecommerceActions.loadProducts({ ...this.props.filters, page: 1 }, search, sort));

        this.props.dispatch(ecommerceActions.setCurrentFilter("SEARCH"));

        this.props.navigate("/Shop/" + this.props.search);
      }
    }
  };

  render() {
    return (
      <Box sx={{ display: "flex" }}>
        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
          <OutlinedInput
            type="text"
            value={this.props.search}
            onChange={this.handleSearch}
            onKeyDown={this.handleOnKeyDown}
            endAdornment={
              this.props.search !== "" ? (
                <InputAdornment position="end">
                  <IconButton aria-label="search" onClick={this.closeSearch} edge="end">
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ) : (
                ""
              )
            }
            placeholder="Search..."
          />
        </FormControl>
      </Box>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    search: state.ecommerceReducer.search,
    sort: state.ecommerceReducer.sort,
    sortsStructures: state.ecommerceReducer.sortsStructures,
    filters: state.ecommerceReducer.filters,
  };
}
export default connect(mapStateToProps)(SearchField);
