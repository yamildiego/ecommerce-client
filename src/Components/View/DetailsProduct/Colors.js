import React, { Component } from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CheckIcon from "@mui/icons-material/Check";

import * as viewProductActions from "../../../Actions/viewProductActions";

class Colors extends Component {
  handleOnClick = (color) => this.props.dispatch(viewProductActions.setColor(color));

  render() {
    const { colors } = this.props;
    return (
      <Stack>
        {colors &&
          colors.length > 0 &&
          colors.map((color, ind) => {
            return (
              <Stack
                key={ind}
                direction="row"
                onClick={() => this.handleOnClick(color)}
                sx={{
                  justifyContent: "space-between",
                  border: "1px solid",
                  borderColor: this.props.color && color.id === this.props.color.id ? "primary.main" : "#d6d6d6",
                  mt: 1,
                  mb: 1,
                  p: 1,
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <Box>{color.label}</Box>
                {this.props.color && color.id === this.props.color.id ? (
                  <CheckIcon sx={{ backgroundColor: "white", position: "absolute", right: 8, color: "primary.main" }} />
                ) : (
                  ""
                )}
              </Stack>
            );
          })}
      </Stack>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    colors: state.viewProductReducer.colors,
    color: state.viewProductReducer.color,
  };
}

export default connect(mapStateToProps)(Colors);
