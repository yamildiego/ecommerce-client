import React, { Component } from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

import * as ecommerceActions from "../../Actions/ecommerceActions";

class FilterListCheckbox extends Component {
  state = { onChangeDisabled: false };

  handleOnClick = () => {
    let filter = {};
    filter[this.props.id] = { ...this.props.filtersStructures[this.props.id], expanded: !this.props.expanded };
    this.props.dispatch(ecommerceActions.setFiltersStructures({ ...this.props.filtersStructures, ...filter }));
  };

  handleOnchange = (event, option) => {
    if (!this.state.onChangeDisabled) {
      this.setState({ onChangeDisabled: true });

      const { id, filters } = this.props;
      let filter = {};
      filter[id] = [];

      filters[id].forEach((element) => {
        if (element !== option.key) filter[id].push(element);
      });

      if (!filters[id].includes(option.key)) filter[id].push(option.key);

      this.props.dispatch(ecommerceActions.setFilters({ ...filters, ...filter }));

      setTimeout(() => {
        this.setState({ onChangeDisabled: false });
      }, 100);
    }
  };

  render() {
    const { id, title, expanded, options, filters } = this.props;
    return (
      <Box sx={{ pl: 4, pr: 4, borderTop: "1px solid #d6d6d6" }}>
        <Stack direction="row" sx={{ padding: "10px 0", userSelect: "none", justifyContent: "space-between" }} onClick={this.handleOnClick}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <span className={`IconFilter ${expanded ? "" : "IconFilterOpen"}`}>
            <ArrowCircleUpIcon />
          </span>
        </Stack>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <FormGroup>
            {options.map((option) => {
              return (
                <FormControlLabel
                  key={option.key}
                  control={
                    <Checkbox
                      onChange={(event) => this.handleOnchange(event, option)}
                      checked={filters[id] && filters[id].includes(option.key)}
                    />
                  }
                  sx={{ userSelect: "none" }}
                  label={option.label}
                />
              );
            })}
          </FormGroup>
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

export default connect(mapStateToProps)(FilterListCheckbox);
