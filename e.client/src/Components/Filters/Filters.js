import React from "react";
import { connect } from "react-redux";

import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";

import FilterListCheckbox from "./FilterListCheckbox";
import FilterRange from "./FilterRange";
import "./Filter.css";

const drawerWidth = 300;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    border: 0,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      border: 0,
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(0),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(0),
      },
    }),
  },
}));

class Filters extends React.Component {
  render() {
    const { filtersStructures } = this.props;
    return (
      <Drawer variant="permanent" open={this.props.filterOpen}>
        <FilterListCheckbox id={"category"} {...filtersStructures.category} />
        <FilterListCheckbox id={"gender"} {...filtersStructures.gender} />
        <FilterListCheckbox id={"kids"} {...filtersStructures.kids} />
        <FilterListCheckbox id={"onSale"} {...filtersStructures.onSale} />
        <FilterRange id={"price"} {...filtersStructures.price} />
      </Drawer>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    filterOpen: state.appReducer.filterOpen,
    filtersStructures: state.ecommerceReducer.filtersStructures,
  };
}

export default connect(mapStateToProps)(Filters);
