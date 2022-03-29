import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import ScreenLayout from "./ScreenLayout";
import OrderSumary from "../Components/OrderSumary/OrderSumary";
import MyStepper from "../Components/MyStepper/MyStepper";
import ListYourBag from "../Components/ListYourBag/ListYourBag";

import * as bagActions from "../Actions/bagActions";

class Bag extends Component {
  componentDidMount() {
    this.props.dispatch(bagActions.setActiveStep(0));
  }

  render() {
    const { size } = this.props;
    return (
      <ScreenLayout limitWidth={true}>
        <Box sx={{ pl: 2, pr: 2 }}>
          <MyStepper />
          <Stack direction={size === "S" ? "column" : "row"} sx={{ justifyContent: "space-between" }}>
            <Box sx={{ backgroundColor: "white", flex: 1, pr: 2 }}>
              <ListYourBag />
              {this.props.items.length > 0 && (
                <Link to="/delivery" style={{ textDecoration: "none" }}>
                  <Button fullWidth sx={{ flex: 1, mt: 2 }} variant="contained">
                    Continue
                  </Button>
                </Link>
              )}
            </Box>
            <Box sx={{ width: "350px" }}>
              {this.props.items.length > 0 && (
                <Box sx={{ height: "77px" }}>
                  <Link to="/delivery" style={{ textDecoration: "none" }}>
                    <Button fullWidth sx={{ flex: 1, mt: 2 }} variant="contained">
                      Continue
                    </Button>
                  </Link>
                </Box>
              )}
              {this.props.items.length === 0 && (this.props.size === "L" || this.props.size === "M") && <Box sx={{ height: "77px" }}></Box>}
              <OrderSumary />
            </Box>
          </Stack>
        </Box>
      </ScreenLayout>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    size: state.configReducer.dimensions.size,
    items: state.bagReducer.items,
  };
}

export default connect(mapStateToProps)(Bag);
