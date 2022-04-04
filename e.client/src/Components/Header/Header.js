import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Collapse from "@mui/material/Collapse";

import Logo from "./Logo";
import Option from "./Option";
import Subheader from "./Subheader";
import SearchField from "./SearchField";

import * as configActions from "../../Actions/configActions";

const options = [
  {
    id: 0,
    icon: <SearchIcon />,
    title: "Search",
  },
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
  toggleSearch = () => this.props.dispatch(configActions.toggleSearch());

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
            <SearchField location={this.props.location} navigate={this.props.navigate} />
          </BrowserView>
          <Box sx={{ backgroundColor: "white", display: "flex", justifyContent: "center", m: 1 }}>
            {options.map((op, index) => (
              <Option key={op.id} {...op} toggleSearch={this.toggleSearch} />
            ))}
          </Box>
        </Stack>
        <MobileView style={{ flex: 1 }}>
          <Collapse in={this.props.searchMobile} timeout="auto" unmountOnExit>
            <SearchField location={this.props.location} navigate={this.props.navigate} />
          </Collapse>
        </MobileView>
        <Subheader />
      </Box>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    width: state.configReducer.dimensions.width,
    searchMobile: state.configReducer.searchMobile,
  };
}

export default connect(mapStateToProps)(Header);
