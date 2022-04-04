import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CloseIcon from "@mui/icons-material/Close";

import Logo from "./Logo";
import Option from "./Option";
import Subheader from "./Subheader";

import * as ecommerceActions from "../../Actions/ecommerceActions";

const options = [
  {
    id: 1,
    icon: <PersonOutlineIcon />,
    title: "Login/Register",
    link: "/login",
  },
  {
    id: 2,
    icon: <FavoriteBorderIcon />,
    title: "Wishlist",
    link: "/login",
  },
  {
    id: 3,
    icon: <ShoppingBagOutlinedIcon />,
    title: "Bag",
    link: "/bag",
  },
];

class Header extends Component {
  handleSearch = (e) => {
    this.props.dispatch(ecommerceActions.setSearch(e.target.value));
    this.search(e.target.value);
  };

  search = (search) => {
    let sort = this.props.sort != null ? this.props.sortsStructures[this.props.sort].value : {};
    this.props.dispatch(ecommerceActions.loadProducts({ ...this.props.filters, page: 1 }, search, sort));
    this.props.navigate("/Shop");
  };

  closeSearch = () => {
    this.props.dispatch(ecommerceActions.setSearch(""));
    this.search("");
  };

  render() {
    return (
      <Box
        sx={{
          width: this.props.width > 1280 ? 0.8 : 1,
          margin: "auto",
          position: "relative",
          zIndex: 10,
          backgroundColor: "white",
          borderRadius: 1,
        }}
      >
        <Stack direction="row" sx={{ justifyContent: "space-between", position: "relative", zIndex: 12 }}>
          <Link to={"/"}>
            <Logo />
          </Link>
          <BrowserView style={{ flex: 1 }}>
            <Box sx={{ display: "flex" }}>
              <FormControl sx={{ m: 1, ml: 2, width: "100%" }} variant="outlined">
                <OutlinedInput
                  type="text"
                  value={this.props.search}
                  onChange={this.handleSearch}
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
          </BrowserView>
          <Box sx={{ backgroundColor: "white", display: "flex", justifyContent: "center", m: 1 }}>
            {options.map((op, index) => (
              <Option key={op.id} {...op} />
            ))}
          </Box>
        </Stack>
        <MobileView style={{ flex: 1 }}>
          <Box sx={{ display: "flex" }}>
            <FormControl sx={{ m: 1, ml: 2, width: "100%" }} variant="outlined">
              <OutlinedInput
                type="text"
                value={this.props.search}
                onChange={this.handleSearch}
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
        </MobileView>
        <Subheader />
      </Box>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    width: state.configReducer.dimensions.width,
    filters: state.ecommerceReducer.filters,
    search: state.ecommerceReducer.search,
    sort: state.ecommerceReducer.sort,
    sortsStructures: state.ecommerceReducer.sortsStructures,
  };
}

export default connect(mapStateToProps)(Header);
