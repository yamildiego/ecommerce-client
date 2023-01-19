import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import localforage from "localforage";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import ScrollToTop from "../Functions/ScrollToTop";
import HOCForRouteProps from "../Functions/HOCForRouteProps";
import Errors from "./Errors";

import Home from "../Screens/Home";
import Shop from "../Screens/Shop";
import ViewItem from "../Screens/ViewItem";
import Bag from "../Screens/Bag";
import Delivery from "../Screens/Delivery";
import Payment from "../Screens/Payment";
import Login from "../Screens/Login";
import Canceled from "../Screens/Canceled";
import Success from "../Screens/Success";
import Wishlist from "../Screens/Wishlist";

import withParamsAndNavigate from "../Functions/withParamsAndNavigate";

import * as configActions from "../Actions/configActions";
import * as bagActions from "../Actions/bagActions";
import * as deliveryActions from "../Actions/deliveryActions";
import * as wishlistActions from "../Actions/wishlistActions";

class App extends Component {
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    localforage.getItem("items", (err, items) => (items ? this.props.dispatch(bagActions.setItems(items)) : ""));
    localforage.getItem("address", (err, address) => (address ? this.props.dispatch(deliveryActions.setAddress(address)) : ""));
    localforage.getItem("personal", (err, personal) => (personal ? this.props.dispatch(deliveryActions.setPersonal(personal)) : ""));
    localforage.getItem("wishlist", (err, items) => (items ? this.props.dispatch(wishlistActions.setItems(items)) : ""));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  componentDidUpdate(oldProps) {
    if (oldProps.errors !== this.props.errors && this.props.errors.length > 0) {
      let lastOne = this.props.errors[this.props.errors.length - 1];
      setTimeout(() => this.props.dispatch(configActions.removeError(lastOne.key)), 2000);
    }
  }

  cleanError = (error) => {};

  updateWindowDimensions = () => this.props.dispatch(configActions.setDimensions({ width: window.innerWidth, height: window.innerHeight }));

  render() {
    let mdTheme = createTheme(this.props.theme);

    return (
      <ThemeProvider theme={mdTheme}>
        <CssBaseline />
        <ScrollToTop>
          <Routes>
            <Route exact path="/" element={<HOCForRouteProps Component={Home} />} />
            <Route path="/Shop" element={<HOCForRouteProps Component={Shop} />} />
            <Route path="/Shop/:filter" element={<HOCForRouteProps Component={Shop} />} />
            <Route path="/View/:cloudProductId" element={<HOCForRouteProps Component={ViewItem} />} />
            <Route path="/Bag" element={<HOCForRouteProps Component={Bag} />} />
            <Route path="/Delivery" element={<HOCForRouteProps Component={Delivery} />} />
            <Route path="/Payment" element={<HOCForRouteProps Component={Payment} />} />
            <Route path="/Login" element={<HOCForRouteProps Component={Login} />} />
            <Route path="/Canceled" element={<HOCForRouteProps Component={Canceled} />} />
            <Route path="/Success" element={<HOCForRouteProps Component={Success} />} />
            <Route path="/Wishlist" element={<HOCForRouteProps Component={Wishlist} />} />
          </Routes>
          <Errors errors={this.props.errors} />
        </ScrollToTop>
      </ThemeProvider>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    errors: state.configReducer.errors,
    theme: state.configReducer.theme,
    user: state.apiReducer.user,
  };
}

export default withParamsAndNavigate(connect(mapStateToProps)(App));
