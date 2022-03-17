import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";

import Logo from "./Logo";
import Option from "./Option";
import Subheader from "./Subheader";

import * as ecommerceActions from "../../Actions/ecommerceActions";

const options = [
  {
    id: 1,
    icon: <PersonOutlineIcon />,
    title: "Login/Register",
  },
  {
    id: 2,
    icon: <FavoriteBorderIcon />,
    title: "Wishlist",
  },
  {
    id: 3,
    icon: <ShoppingCartIcon />,
    title: "Cart",
  },
];

class Header extends Component {
  handleSearch = (e) => this.props.dispatch(ecommerceActions.setSearch(e.target.value));

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
        <Stack direction="row" sx={{ justifyContent: "space-around", position: "relative", zIndex: 12 }}>
          <Link to={"/"}>
            <Logo />
          </Link>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex" }}>
              <FormControl sx={{ m: 1, ml: 2, width: "100%" }} variant="outlined">
                <OutlinedInput
                  type="text"
                  value={this.props.search}
                  onChange={this.handleSearch}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="search"
                        // onClick={handleClickShowPassword}
                        edge="end"
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Search..."
                />
              </FormControl>
            </Box>
          </Box>
          <Box sx={{ backgroundColor: "white", display: "flex", justifyContent: "center", m: 1 }}>
            {options.map((op, index) => (
              <Option key={op.id} {...op} />
            ))}
          </Box>
        </Stack>
        <Subheader />
      </Box>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    width: state.configReducer.dimensions.width,
    search: state.ecommerceReducer.search,
  };
}

export default connect(mapStateToProps)(Header);
