import React, { Component } from "react";
import { connect } from "react-redux";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import ScreenLayout from "./ScreenLayout";
import ListYourWishlist from "../Components/Wishlist/ListYourWishlist";
import Login from "../Components/Common/Login";

import * as bagActions from "../Actions/bagActions";

class Wishlist extends Component {
  componentDidMount() {
    this.props.dispatch(bagActions.setActiveStep(0));
  }

  render() {
    const { size } = this.props;
    return (
      <ScreenLayout limitWidth={true} navigate={this.props.navigate} location={this.props.location}>
        <Box sx={{ pl: 2, pr: 2 }}>
          <Stack direction={size === "S" ? "column" : "row"} sx={{ justifyContent: "space-between" }}>
            <Box sx={{ backgroundColor: "white", flex: 1, pr: size === "S" ? 0 : 2 }}>
              <ListYourWishlist />
            </Box>
            <Box>
              <Box sx={{ marginTop: "35px", margin: "auto" }}>
                <h4 style={styles.label}>DON'T LOSE YOUR WISHLIST</h4>
                <h5 style={styles.label}>Create an account today or log in to save your Wish List.</h5>
              </Box>
              <Box sx={{ pt: 4, margin: "auto" }}>
                <Login />
              </Box>
            </Box>
          </Stack>
        </Box>
      </ScreenLayout>
    );
  }
}

const styles = {
  label: {
    margin: "0",
    textAlign: "center",
    color: "red",
  },
};

function mapStateToProps(state, props) {
  return {
    size: state.configReducer.dimensions.size,
    items: state.wishlistReducer.items,
  };
}

export default connect(mapStateToProps)(Wishlist);
