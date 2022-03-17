import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import ScrollToTop from "../Components/ScrollToTop";

import Home from "../Screens/Home";
import Shop from "../Screens/Shop";
import ViewItem from "../Screens/ViewItem";

import withParamsAndNavigate from "../Functions/withParamsAndNavigate";

import * as configActions from "../Actions/configActions";

class App extends Component {
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => this.props.dispatch(configActions.setDimensions({ width: window.innerWidth, height: window.innerHeight }));

  render() {
    let mdTheme = createTheme(this.props.theme);

    return (
      <ThemeProvider theme={mdTheme}>
        <CssBaseline />
        <ScrollToTop>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/Shop" element={<Shop />} />
            <Route path="/Shop/:filter" element={<Shop />} />
            <Route path="/View/:cloudProductId" element={<ViewItem />} />
          </Routes>
        </ScrollToTop>
      </ThemeProvider>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    theme: state.configReducer.theme,
    user: state.apiReducer.user,
  };
}

export default withParamsAndNavigate(connect(mapStateToProps)(App));
