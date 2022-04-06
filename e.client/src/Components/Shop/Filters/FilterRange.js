import React, { Component } from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import Slider from "@mui/material/Slider";

import * as ecommerceActions from "../../../Actions/ecommerceActions";

class FilterRange extends Component {
  state = { isMoving: false, value: this.props.filters[this.props.id] };

  handleOnClick = () => {
    let filter = {};
    filter[this.props.id] = { ...this.props.filtersStructures[this.props.id], expanded: !this.props.expanded };
    this.props.dispatch(ecommerceActions.setFiltersStructures({ ...this.props.filtersStructures, ...filter }));
  };

  handleOnchange = (event, value, option) => {
    this.setState({ ...this.state, value });
  };

  handleOnMouseUp = () => {
    const { id } = this.props;
    let filter = {};
    filter[id] = this.state.value;
    this.props.dispatch(ecommerceActions.setFilters({ ...this.props.filters, ...filter }));
  };

  componentDidUpdate(oldProps) {
    if (oldProps.filters[this.props.id] !== this.props.filters[this.props.id])
      this.setState({ isMoving: false, value: this.props.filters[this.props.id] });
  }

  render() {
    const { title, expanded, limits } = this.props;
    return (
      <Box sx={{ pl: 4, pr: 4, borderTop: "1px solid #d6d6d6", borderBottom: "1px solid #d6d6d6" }}>
        <Stack direction="row" sx={{ padding: "10px 0", userSelect: "none", justifyContent: "space-between" }} onClick={this.handleOnClick}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <span className={`IconFilter ${expanded ? "" : "IconFilterOpen"}`}>
            <ArrowCircleUpIcon />
          </span>
        </Stack>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Slider
            value={this.state.value}
            onChange={this.handleOnchange}
            onMouseUp={this.handleOnMouseUp}
            valueLabelDisplay="auto"
            valueLabelFormat={(val) => (val > limits[1] ? limits[1] : val)}
            step={10}
            min={limits[0]}
            max={limits[1] + 25}
          />
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Box>${this.state.value[0]}.00</Box>
            <Box>{this.state.value[1] > limits[1] ? `Over ${limits[1]}.00` : `${this.state.value[1]}.00`}</Box>
          </Stack>
        </Collapse>
      </Box>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    filtersStructures: state.ecommerceReducer.filtersStructures,
    filters: state.ecommerceReducer.filters,
  };
}

export default connect(mapStateToProps)(FilterRange);
